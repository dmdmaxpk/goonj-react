import React from 'react';
import AxiosInstance from '../../Utils/AxiosInstance';
import  config  from '../../Utils/config';
import { withRouter } from 'react-router-dom';
import "./paywall.scss";
// import { Event } from '../Tracking';
// import Loader from 'react-loader-spinner';

class Box extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      step: 0, // 0 => Landed permission, 1 => verify otp, 2 => graced permission 
      msisdn: '',
      source: localStorage.getItem('source'),
      otp: '',
      packageId: '',
      doubleConsent: false,
      radio: this.props.packageID1,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendOtp = this.sendOtp.bind(this);
    this.verifyOtp = this.verifyOtp.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  componentDidMount(){
    console.log(this.props);
  }
  handleChange(e){
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendOtp(e){
    e.preventDefault();
    const {msisdn, source} = this.state;
    const msisdnData = {
      msisdn,
      source
    }
    if(msisdn.length === 11){
      AxiosInstance.post('/payment/otp/send', msisdnData)
      .then(res =>{
        const result = res.data;
        if(result.code === 0){
          this.setState({step: 1});
        }
        else if(result.code === -1){
          alert(result.message);
          console.log(result);
        }
      })
      .catch(err =>{
        console.log(err)
        alert(err)
      })
    }
    else{
      alert("Please Enter a valid Telenor Number");
    }
  }

  verifyOtp(e){
    e.preventDefault();
    const {msisdn, source, otp} = this.state;
    const {packageID2, url, slug, permission, pkgIdKey, msisdnKey} = this.props;
    let otpData = {
      msisdn,
      source,
      otp,
      package_id: packageID2
    }
    AxiosInstance.post('/payment/otp/verify', otpData)
    .then(res =>{
      const result = res.data;
      if(result.is_allowed_to_stream === true){
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
          step: 2
        })
      }
      else if(result.code == 7){
        var token = result.access_token;
        if(result.subscription_status == undefined){
          localStorage.setItem('status', "trialActivated");
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
    const {msisdn, source} = this.state;
    const {packageID2, permission, url, slug, msisdnKey, pkgIdKey} = this.props;

    const permissionData = {
      msisdn,
      package_id: packageID2,
      source,
    }
    AxiosInstance.post(`/payment/subscribe`, permissionData)
    .then(res =>{
      const result = res.data;
      if(result.code === -1){
        this.setState({loading: false});
        alert(res.data.message);
      }
      else if(result.code === 10 || result.code === 11 || result.code === 0){
        localStorage.setItem(permission, true);
        localStorage.setItem(pkgIdKey, packageID2);
        localStorage.setItem(msisdnKey, msisdn);
        this.props.history.push(`${url}`);
      }
      // if(res.data.code === 11 && res.data.message === "Trial period activated!"){
        
      // }
      // else if(res.data.code === 10 && res.data.message === "In queue for billing!"){
      // }
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
            this.state.step === 0 ?
              <div>
                <input className="msisdnInput" type="number" name="msisdn" value={this.state.msisdn} placeholder="03xxxxxxxxx" onChange={this.handleChange}/>
                <br />
                <button className="btnSub" onClick={this.sendOtp}>
                    <img className="btnSubImg" src={require("../../Assets/subBtn.png")} />
                </button>
              </div>
            :
            this.state.step === 1 ?
              <div>
                <label className="otpLabel"> Enter OTP </label>
                <br />
                <input className="msisdnInput" type="number" name="otp" value={this.state.otp} placeholder="xxxxx" onChange={this.handleChange}/>
                <br />
                <button className="btnSub" onClick={this.verifyOtp}>
                    <div>
                      <img className="btnNext" src={require("../../Assets/Shape-2.png")} />
                      <p className="btnNextText">NEXT</p>
                    </div>
                </button>
              </div>
            :
              <div className="">
                  <p className="text1">Are you sure<br />you want to subscribe?</p>
                  <button className="btnSubConfirm" onClick={this.subscribe}>
                      <img className="confirmBtnImg" src={require("../../Assets/Shape-2.png")} />
                      <p className="btnConfirmText">Confirm</p>
                  </button>
              </div>
            }
        </div>
    );
  }
}

export default withRouter(Box);