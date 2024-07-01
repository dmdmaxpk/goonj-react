import React from 'react';
import PaywallInstance from '../../Utils/PaywallInstance';
import { withRouter } from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import "./paywall.scss";
import { CircularProgress, Link } from '@material-ui/core';
import { subscribeEasypaisa, subscribeTelenor } from '../../Services/apiCalls';
import ConsentButton from '../../Components/ConsentSubscriptionForm';
import Axios from 'axios';



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
            loading: true,
            showConsentForm:false,
            open: false,
            showConsent: false,
            token: undefined,
            consentBoxDetails: undefined
        }
        // this.handleConfirmAction = this.handleConfirmAction.bind(this);
        // this.submitConsent= this.submitConsent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectPayment = this.selectPayment.bind(this);
        this.sendOtp = this.sendOtp.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
        this.subscribe = this.subscribe.bind(this);
        // this.giveConsent=this.giveConsent.bind(this);
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
        console.log("########MSISDN: ", urlMsisdn);

        if(urlMsisdn){
            localStorage.setItem('livePermission', false);
            localStorage.setItem(msisdnKey, msisdn ? msisdn : urlMsisdn);
            this.state.msisdn = msisdn ? msisdn : urlMsisdn;

            PaywallInstance.post('/payment/status', statusData)
            .then(res =>{
                localStorage.setItem(pkgIdKey, res.data.subscribed_package_id);

                if(res.data.code === -1){
                    console.log('HERE 1'); //error
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
                    console.log('HERE 2')
                    localStorage.setItem(permission, true);
                    localStorage.setItem(pkgIdKey, res.data.subscribed_package_id);
                    localStorage.setItem(msisdnKey, msisdn ? msisdn : urlMsisdn);
                    localStorage.setItem('userID', res.data.data.user_id);
                    this.props.history.push(`${url}`);
                }else{
                    console.log('HERE 3 - ', this.state.msisdn);
                    if(this.state.msisdn === undefined || this.state.msisdn === 'null' || this.state.msisdn === null){
                        this.setState({
                            loading: false
                        })
                    }else{
                        this.subscribe();
                    }
                }
            })
            .catch(err =>{
                console.log('HERE 4')
                this.setState({
                    loading: false
                })
            })
        }
        else {this.setState({loading: false})};
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
                // step: 'mta',
                open: true,
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

    verifyOtp(e){
        e.preventDefault();
        const {msisdn, otp} = this.state;
        const {packageID2, url, slug, permission, pkgIdKey, msisdnKey, source, serviceId2} = this.props;
        let otpData = {
            msisdn,
            source,
            otp,
            package_id: packageID2
        }
        PaywallInstance.post('/payment/otp/verify', otpData)
            .then(async (res) =>{
                const result = res.data;
                //alert(JSON.stringify(result));
                if(result.code === 7) {
                    localStorage.setItem(pkgIdKey, result.subscribed_package_id);
                    localStorage.setItem(msisdnKey, msisdn);
                    localStorage.setItem('userID', result.user_id);

                    if(result.is_allowed_to_stream === true && (result.subscription_status === "billed" || result.subscription_status === "trial" || result.subscription_status === "graced")){
                        var accessToken = result.access_token;
                        var refreshToken = result.refresh_token;
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', refreshToken);
                        
                        localStorage.setItem(permission, true);
                        localStorage.setItem(pkgIdKey, result.subscribed_package_id);
                        localStorage.setItem(msisdnKey, msisdn);
                        localStorage.setItem('userID', result.user_id);
                        //alert(`{permission: true, ${pkgIdKey}: ${result.subscribed_package_id}, ${msisdnKey}: ${msisdn}}`);

                        this.props.history.push(`${url}`);
                    }else if(result.subscription_status === "expired" || result.subscription_status === undefined) {
                        localStorage.setItem(permission, false);
                        await this.fetchTokenAndModal();
                    }else{
                        localStorage.setItem(permission, false);
                        alert('You are not allowed to watch stream. Possible cause: ' + result.message);
                    }
                }else{
                    localStorage.setItem(permission, false);
                    alert('Invalid OTP');
                }
            })
            .catch(err =>{
                alert(err);
            })
    }
    
    fetchTokenAndModal = async () => {
        const {msisdn, paymentType, otp} = this.state;
        // generate cms link
        let payload = {msisdn, serviceId: this.props.serviceId2};
        console.log('Payload', payload);

        PaywallInstance.post('/payment/v2/cms-token', payload)
        .then(res => {
            const result = res.data;
            console.log('cms token v2 result', result);
            this.setState({consentBoxDetails: result?.response, open: true});
        }).catch(err => {
            console.error('error', err);
        })
    }

    subscribe(){
        const {msisdn, paymentType, otp} = this.state;

        // generate cms link
        let payload = {msisdn, serviceId: this.props.serviceId2};
        console.log('Payload', payload);

        PaywallInstance.post('/payment/cms-token', payload)
        .then(res => {
            console.log('CMS token generated: ', res.data);
            // console.log('CMS token: ', res.data.response.token);
            this.handleClose();
            let token = res.data.response.token;
            window.location.href = `https://apis.telenor.com.pk/cms/v1/redirect?token=${token}`;
        }).catch(err => {
            console.error('error', err);
        })



        // const queryString = window.location.search;
        // const urlParams = new URLSearchParams(queryString);
        // this.setState({loading: true});
        // const {packageID2, permission, url, slug, msisdnKey, pkgIdKey, source} = this.props;
        // let mid = localStorage.getItem('mid');
        // const marketingSrc = urlParams.get('marketingSrc') ? urlParams.get('marketingSrc') : localStorage.getItem('marketingSrc') ? localStorage.getItem('marketingSrc') : 'na';
        // let tid = localStorage.getItem('tid');
        // const permissionData = (source !== "web") ?
        //     {
        //         msisdn: msisdn ? msisdn : localStorage.getItem('urlMsisdn'),
        //         package_id: packageID2,
        //         source,
        //         otp: paymentType === 'telenor' ? undefined : otp,
        //         payment_source: paymentType !== '' ? paymentType : 'telenor',
        //         marketing_source: marketingSrc,
        //         affiliate_unique_transaction_id: tid,
        //         affiliate_mid: mid
        //     }
        //     :
        //     {
        //         msisdn: msisdn ? msisdn : localStorage.getItem('urlMsisdn'),
        //         package_id: packageID2,
        //         source,
        //         otp: paymentType === 'telenor' ? undefined : otp,
        //         payment_source: paymentType !== '' ? paymentType : 'telenor'
        //     };

        // if(mid === 'tiktok'){
        //   window.ttq.track('ClickButton');
        // }

        // PaywallInstance.post(`/payment/subscribe`, permissionData)
        //     .then(res =>{
        //         const result = res.data;

        //         if(result.code === -1){
        //             this.setState({loading: false});
        //             alert(res.data.message);
        //         }
        //         else if(result.code === 9 || result.code === 10 || result.code === 11 || result.code === 0){
        //             localStorage.setItem(permission, true);
        //             localStorage.setItem(pkgIdKey, packageID2);
        //             let urlMsisdn = localStorage.getItem('urlMsisdn'); 
        //             if(urlMsisdn){
        //                 localStorage.setItem(msisdnKey, urlMsisdn)
        //             }
        //             else{
        //                 localStorage.setItem(msisdnKey, msisdn);
        //             }

        //             if(result.code === 0){
        //                 // google tag for tracking
        //                 window.gtag('event', 'conversion', { 'send_to': 'AW-828051162/xpLgCPWNicADENqd7IoD', 'transaction_id': '' });

        //                 // Pixel event on subscribe
        //                 window.fbq('track', 'Subscribe');
                        
        //                 // useInsider
        //                 window.insider_object = {
        //                     "page": {
        //                         "type": "Confirmation"
        //                     }
        //                 };

        //                 if(mid === 'tiktok'){
        //                     window.ttq.track('Subscribe');
        //                 }
        //             }
                    
        //             // redirecting
        //             this.props.history.push(`${url}`);
        //         }
        //     })
        //     .catch(err =>{
        //         this.setState({loading: false});
        //         alert("Something went wrong! :(");
        //     })
    }
    cancel(){
        this.setState({doubleConsent: false});
    };

    setToken = (tokenValue) => {
        this.setState({token: tokenValue})
    }

    
    handleOpen = () => {
        console.log('triggered')
        this.setState({open:true});
    }

    handleClose=()=>this.setState({open:false});

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
                            <button className="btnConfirm" onClick={this.handleOpen}>
                                Confirm
                            </button>
                        </div>
                    :
                        <div className="">
                            <p className="text1">Are you sure<br />you want to subscribe?</p>
                            <button className="btnSubConfirm" onClick={this.handleOpen}>
                                <img className="confirmBtnImg" src={require("../../Assets/Shape-2.png")} alt="Confirm" />
                                <p className="btnConfirmText">Confirm</p>
                            </button>
                        </div>
                }
                <ConsentButton
                    open={this.state.open}
                    onClose={()=> {this.setState({step: 0}); this.handleClose(); }}
                    setToken={this.setToken}
                    msisdn={this.state.msisdn}
                    serviceId={this.props.serviceId2}
                    data={this.state.consentBoxDetails}
                />
 
            </div>
        );
    }
}

export default withRouter(Box);