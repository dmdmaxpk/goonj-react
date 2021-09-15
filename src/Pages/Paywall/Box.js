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
            packageId: '',
            doubleConsent: false,
            radio: this.props.packageID1,
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.selectPayment = this.selectPayment.bind(this);
        this.sendOtp = this.sendOtp.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    componentDidMount(){
        // console.log(this.props);
        let {packageID1, packageID2, permission, pkgIdKey, msisdnKey, msisdn, url} = this.props;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let urlMsisdn = localStorage.getItem('urlMsisdn') ? localStorage.getItem('urlMsisdn') : urlParams.get("msisdn");
        let statusData = {
            source: localStorage.getItem('source'),
            msisdn: urlMsisdn,
            package_id: packageID1
        }
        PaywallInstance.post('/payment/status', statusData)
        .then(res =>{
            // console.log("status1", res.data);
            if(res.data.code === -1){
                statusData.package_id = packageID2;
                PaywallInstance.post('/payment/status', statusData)
                .then(response =>{
                    // console.log("status2", response.data);
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
            // alert(err.message);
            this.setState({
                loading: false
            })
        })
    }
    handleChange(e){
        if(e.target.value.length < 12){
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    selectPayment(paymentType){
        // console.log("payment", paymentType);
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

        // console.log('sendOtp - msisdnData: ', msisdnData);

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
                        // console.log('result.message: ', result.message);
                        // console.log('result: ', result);
                        alert(result.message);
                    }
                })
                .catch(err =>{
                    // console.log('err: ', err);
                    alert(err)
                })
        }
        else{
            let paymentSource = payment_source.charAt(0).toUpperCase() + payment_source.slice(1);
            let message = 'Please Enter a Valid '+(payment_source == 'telenor' ? paymentSource+' Number' : paymentSource+' Account Number');
            alert(message);
        }
    }

    verifyOtp(e){
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
                // console.log(result);
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
                else if(result.subscription_status === "graced" && result.is_allowed_to_stream === false){
                    this.setState({
                        step: 3
                    })
                }
                if(result.code === 7){
                    var accessToken = result.access_token;
                    var refreshToken = result.refresh_token;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    if(result.subscription_status == undefined){
                    }
                    this.subscribe();
                }
                else{
                    alert(result.message);
                }
            })
            .catch(err =>{
                alert(err);
            })
    }

    subscribe(){
        this.setState({loading: true});
        const {msisdn, paymentType, otp} = this.state;
        const {packageID2, permission, url, slug, msisdnKey, pkgIdKey, source} = this.props;
        let mid = localStorage.getItem('mid');
        let tid = localStorage.getItem('tid');
        const permissionData = (source !== "web") ?
            {
                msisdn: msisdn ? msisdn : localStorage.getItem('urlMsisdn'),
                package_id: packageID2,
                source,
                otp: paymentType === 'telenor' ? undefined : otp,
                payment_source: paymentType !== '' ? paymentType : 'telenor',
                marketing_source: mid,
                affiliate_unique_transaction_id: tid,
                affiliate_mid: mid
            }
            :
            {
                msisdn: msisdn ? msisdn : localStorage.getItem('urlMsisdn'),
                package_id: packageID2,
                source,
                otp: paymentType === 'telenor' ? undefined : otp,
                payment_source: paymentType !== '' ? paymentType : 'telenor'
            };

        // console.log('permissionData: ', permissionData);
        PaywallInstance.post(`/payment/subscribe`, permissionData)
            .then(res =>{
                const result = res.data;
                if(result.code === -1){
                    this.setState({loading: false});
                    alert(res.data.message);
                }
                else if(result.code === 9 || result.code === 10 || result.code === 11 || result.code === 0){
                    localStorage.setItem(permission, true);
                    localStorage.setItem(pkgIdKey, packageID2);
                    let urlMsisdn = localStorage.getItem('urlMsisdn'); 
                    if(urlMsisdn){
                        localStorage.setItem(msisdnKey, urlMsisdn)
                    }
                    else{
                        localStorage.setItem(msisdnKey, msisdn);
                    }

                    // google tag for tracking
                    window.gtag('event', 'conversion', {'send_to': 'AW-828051162/GsQrCLaf6_MCENqd7IoD'});

                    // Pixel event on subscribe
                    window.fbq('track', 'Subscribe');
                    
                    // redirecting
                    this.props.history.push(`${url}`);
                }
            })
            .catch(err =>{
                this.setState({loading: false});
                alert("Something went wrong! :(");
            })
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
                            <button className="arrowBtnForward" onClick={(this.state.paymentType === 'telenor' && localStorage.getItem('urlMsisdn')) ? this.subscribe : this.sendOtp}>
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
                            <button className="arrowBtnForward" onClick={this.state.paymentType === 'telenor' ? this.verifyOtp : this.subscribe}>
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