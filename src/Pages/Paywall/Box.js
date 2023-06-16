import React from 'react';
import PaywallInstance from '../../Utils/PaywallInstance';
import { withRouter } from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import "./paywall.scss";
import { CircularProgress } from '@material-ui/core';
import { subscribeEasypaisa, subscribeTelenor } from '../../Services/apiCalls';

class Box extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            paymentType: '',
            step: 0, 
            msisdn: '',
            source: localStorage.getItem('source'),
            otp: '',
            token: '',
            //serviceId: '99144',
            packageId: '',
            doubleConsent: false,
            radio: this.props.packageID1,
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.selectPayment = this.selectPayment.bind(this);
        this.sendOtp = this.sendOtp.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
        this.redirectOtp = this.redirectOtp.bind(this);
        //this.subscribe = this.subscribe.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    
      
    componentDidMount(){
        let {packageID1, packageID2, permission, pkgIdKey, msisdnKey, msisdn, url} = this.props;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let urlMsisdn = localStorage.getItem('urlMsisdn') ? localStorage.getItem('urlMsisdn') : urlParams.get("msisdn");
        let marketingSrc = urlParams.get('marketingSrc') ? urlParams.get('marketingSrc') : localStorage.getItem('marketingSrc') ? localStorage.getItem('marketingSrc') : 'na';
        let statusData = {
            source: localStorage.getItem('source'),
            msisdn: urlMsisdn,
            package_id: packageID1,
            marketing_source: marketingSrc
        }
        if(urlMsisdn){
            PaywallInstance.post('/payment/status', statusData)
            .then(res =>{
                if(res.data.code === -1){
                    statusData.package_id = packageID2;
                    PaywallInstance.post('/payment/status', statusData)
                    .then(response =>{
                        if(response.data.code === 0 && response.data.data.is_allowed_to_stream === true){
                            localStorage.setItem(permission, true);
                            localStorage.setItem(pkgIdKey, response.data.subscribed_package_id);
                            localStorage.setItem(msisdnKey, msisdn ? msisdn : urlMsisdn);
                            localStorage.setItem('userID', response.data.data.user_id);
                            this.props.history.push(`${url}`);
                        }
                    })
                }
                else if(res.data.code === 0 && res.data.data.is_allowed_to_stream === true){
                    localStorage.setItem(permission, true);
                    localStorage.setItem(pkgIdKey, res.data.subscribed_package_id);
                    localStorage.setItem(msisdnKey, msisdn ? msisdn : urlMsisdn);
                    localStorage.setItem('userID', res.data.data.user_id);
                    this.props.history.push(`${url}`);
                }
                this.setState({
                    loading: false
                })
            })
            .catch(err =>{
                this.setState({
                    loading: false
                })
            })
        }
        else this.setState({loading: false})
    }
    handleChange(e){
        if(e.target.value.length < 12){
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    selectPayment(paymentType){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if((localStorage.getItem('urlMsisdn') || urlParams.get('msisdn')) && paymentType == 'telenor' && urlParams.get('access_token')){
            this.setState({
                paymentType,
                step: 'mta',
                msisdn: urlParams.get('msisdn') ? urlParams.get('msisdn') : localStorage.getItem('urlMsisdn') 
            }) 
        }
        else{
            this.setState({
                paymentType,
                step: 1,
                msisdn: urlParams.get('msisdn') ? urlParams.get('msisdn') : localStorage.getItem('urlMsisdn')
            })
        }
        if(paymentType == 'telenor'){
            subscribeTelenor();
        }
        if(paymentType == 'easypaisa'){
            subscribeEasypaisa();
        }
        
    }
    sendOtp(){
        const {msisdn, paymentType} = this.state;
        const {source, packageID2} = this.props;
        const payment_source = paymentType;

        const msisdnData = {
            msisdn,
            source,
            payment_source,
            package_id: packageID2
        };

        if(msisdn.length === 11){
            PaywallInstance.post('/payment/otp/send', msisdnData)
                .then(res =>{
                    const result = res.data;
                    if(result.code === 0){
                        this.setState({step: 2});
                        if(paymentType === 'easypaisa'){
                            var accessToken = result.access_token;
                            var refreshToken = result.refresh_token;
                            localStorage.setItem('accessToken', accessToken);
                            localStorage.setItem('refreshToken', refreshToken);
                        }
                    }
                    else if(result.code === -1){
                        alert(result.message);
                    }
                })
                .catch(err =>{
                    alert(err)
                })
        }
        else{
            let paymentSource = payment_source.charAt(0).toUpperCase() + payment_source.slice(1);
            let message = 'Please Enter a Valid '+(payment_source == 'telenor' ? paymentSource+' Number' : paymentSource+' Account Number');
            alert(message);
        }
    }

    //old if-else conditions
    /*verifyOtp(e){
        e.preventDefault();
        const {msisdn, otp} = this.state;
        const {packageID2, url, slug, permission, pkgIdKey, msisdnKey, source} = this.props;
        let otpData = {
            msisdn,
            source,
            otp,
            package_id: packageID2
        }
        PaywallInstance.post('/payment/otp/verify', otpData)
            .then(res =>{
                const result = res.data;
                if(result.is_allowed_to_stream === true){
                    var accessToken = result.access_token;
                    var refreshToken = result.refresh_token;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    if(result.subscription_status === "billed" || result.subscription_status === "trial"){
                        localStorage.setItem(permission, true);
                        localStorage.setItem(pkgIdKey, packageID2);
                        localStorage.setItem(msisdnKey, msisdn);
                        localStorage.setItem('userID', result.user_id);
                        this.props.history.push(`${url}`);
                    }
                }
                if(result.code === 7){
                    var accessToken = result.access_token;
                    var refreshToken = result.refresh_token;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    if(result.subscription_status == undefined){
                    }
                    this.redirectOtp();
                }
                else{
                    alert(result.message);
                }
            })
            .catch(err =>{
                alert(err);
            })
    }*/

    //new if-else conditions
    verifyOtp(e) {
        e.preventDefault();
        const { msisdn, otp } = this.state;
        const { packageID2, url, slug, permission, pkgIdKey, msisdnKey, source } = this.props;
        let otpData = {
          msisdn,
          source,
          otp,
          package_id: packageID2
        };
    
        PaywallInstance.post('/payment/otp/verify', otpData)
          .then(res =>{
            const result = res.data;
            if(result.code === 7)
            {
                if(result.subscription_status === "billed")
                {
                    //bypass all steps and display live channel
                    localStorage.setItem(permission, true);
                    localStorage.setItem(pkgIdKey, packageID2);
                    localStorage.setItem(msisdnKey, msisdn);
                    localStorage.setItem('userID', result.user_id);
                    this.props.history.push(`${url}`);
                }
                else{
                    // fetch token using dynamic service id and follow all steps developed earlier
                    var accessToken = result.access_token;
                    var refreshToken = result.refresh_token;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    this.redirectOtp();
                }
            }
            else{
                // show popup
                // display message.
                console.log(result.message);
            }
              
          })
          .catch(err => {
            // Handle error here
            // For example, display a message or perform some action
            console.log(err);
          });
     }

     async redirectOtp() {
        const {msisdn,  token} = this.state;
        let serviceId = '';

        //GET API code
        try {
            const response = await fetch('https://api.goonj.pk/v2/package?id=QDfG');
            const data = await response.json();
            serviceId = data[0].pid;
            this.setState({ serviceId });
            console.log(serviceId); // Output: 99146
          } catch (error) {
            console.error('Error:', error);
          }

       
        //POST API code
        const redirData = {
            msisdn,
            serviceId
          };
        console.log(redirData);

          //PaywallInstance.post('/payment/cms-token',redirData)
          PaywallInstance.post('https://api.goonj.pk/v2/payment/cms-token', redirData)
            .then((response) => {
              this.token = response.data.response.token;
              this.setState({ token });
              // Display token in an alert
              //alert("Token: " + this.token);
              
          
              var redirectURL = 'https://apis.telenor.com.pk/cms/v1/redirect?token=' + this.token;
              // Perform the redirect
              window.location.href = redirectURL;
            })
            .catch((error) => {
              console.error("Error making API request:", error);
            });
     }
      
    cancel(){
        this.setState({doubleConsent: false});
    }

    render() {
        return (
            <div className="box">
                {
                    this.state.loading === true ?
                        <div>
                            <CircularProgress />
                        </div>
                    :
                    this.state.step === 0 ?
                        <div>
                            <p>Subscribe Now</p>
                            <button className="btnSub" onClick={()=> this.selectPayment('telenor')}>
                                <img className="btnSubImg" src={require("../../Assets/telenorBtn.png")} alt="Telenor Subscribe Button" />
                            </button>
                            <p className="orText">- OR -</p>
                            <button className="btnSub" onClick={()=> this.selectPayment('easypaisa')}>
                                <img className="btnSubImg" src={require("../../Assets/easypaisaBtn.png")} alt="Easypaisa Subscribe Button" />
                            </button>
                        </div>
                    :
                    this.state.step === 1 ?
                        <div>
                            <p>Enter {this.state.paymentType == "easypaisa" ? `${this.state.paymentType} account` : this.state.paymentType} number</p>
                            <input className="msisdnInput" type="number" name="msisdn" maxLength="11" value={this.state.msisdn} placeholder="03xxxxxxxxx" pattern="\d*" onChange={this.handleChange}/>
                            <br />
                            <button className="arrowBtnBack" onClick={()=> this.setState({step: 0})}>
                                <ArrowBackRoundedIcon />
                            </button>
                            <button className="arrowBtnForward" onClick={(this.state.paymentType === 'telenor' && localStorage.getItem('urlMsisdn')) ? this.verifyOtp : this.sendOtp}>
                                <ArrowForwardRoundedIcon />
                            </button>
                        </div>
                    :
                    this.state.step === 2 ?
                        <div>
                            <label className="otpLabel"> Enter your OTP received through sms </label>
                            <p className="otpText">Enter OTP*</p>
                            <input className="msisdnInput" type="number" name="otp" value={this.state.otp} placeholder="xxxx" pattern="\d*" onChange={this.handleChange}/>
                            <br />
                            <button className="arrowBtnBack" onClick={()=> this.setState({step: 1})}>
                                <ArrowBackRoundedIcon />
                            </button>
                            <button className="arrowBtnForward" onClick={this.state.paymentType === 'telenor' ? this.verifyOtp : this.redirectOtp}>
                                <ArrowForwardRoundedIcon />
                            </button>
                        </div>
                        :
                    this.state.step == 'mta' ?
                        <div>
                            <p>Are you sure you sure you want to subscribe?</p>
                            <button className="btnConfirm" onClick={this.subscribe}>
                                Confirm
                            </button>
                        </div>
                    :
                        <div className="">
                            <p className="text1">Are you sure<br />you want to subscribe?</p>
                            <button className="btnSubConfirm" onClick={this.subscribe}>
                                <img className="confirmBtnImg" src={require("../../Assets/Shape-2.png")} alt="Confirm" />
                                <p className="btnConfirmText">Confirm</p>
                            </button>
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(Box);