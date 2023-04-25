import React, { Component } from "react";
import GridContainer from "../../Components/Grid/GridContainer";
import GridItem from "../../Components/Grid/GridItem";
import PaywallInstance from "../../Utils/PaywallInstance";
import Loader from "../../Components/Loader/Loader";
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import { Button, Snackbar } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import Axios from "axios";
import config from "../../Utils/config";

class UnSubPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_he: false,
      user_ID: new URLSearchParams(this.props.location.search).get("proxy") ? new URLSearchParams(this.props.location.search).get("proxy") : undefined,
      sourcee: "sms",
      package_ID: new URLSearchParams(this.props.location.search).get("pg") ? new URLSearchParams(this.props.location.search).get("pg") : undefined,
      msisdn:  '',//new URLSearchParams(this.props.location.search).get("msisdn") ? new URLSearchParams(this.props.location.search).get("msisdn") : undefined,
      otp: '',
      unsubConfirmed: false,
      messageText: undefined,
      otp_verified: false,
      is_otp_triggered: false
    };
  }

  cancel = () => {
    this.props.history.push('/');
  }

  handleSubmit = (packageId) => {

    if(!this.state.is_he) {

      if(this.state.is_otp_triggered === true && this.state.otp_verified === false) {
        let otpData = {
          msisdn: this.state.msisdn,
          source: this.state.sourcee,
          otp: this.state.otp
      }
      Axios.post(`${config.apiBaseUrl}/payment/otp/verify`, otpData)
      .then((response) => {
        let result = response.data;
        if(result.code === 7){
          alert('OTP Validated');
          this.setState({otp_verified: true});
          this.triggerUnsubscribed(packageId);
        }else{
          alert(result.message);
        }
      });
      }else{
        const msisdnData = {
          msisdn: this.state.msisdn,
          source: this.state.sourcee,
          payment_source: 'telenor'
        }
  
        Axios.post(`${config.apiBaseUrl}/payment/otp/send`, msisdnData)
        .then((res) => {
          const result = res.data;
          if(result.code === 0){
            this.setState({is_otp_triggered: true});
            this.setState({ messageText: '' });
          }else if(result.code === -1){
              alert(result.message);
          }
        }).catch((error) => {
          console.log(error);
          alert(error.message);
        })
      }
    }else{
      this.triggerUnsubscribed(packageId);
    }
  }

  triggerUnsubscribed(packageId) {
    let unsubData = {
      msisdn: this.state.msisdn,
      user_id: this.state.user_ID,
      source: this.state.sourcee,
      package_id: packageId ? packageId : 'QDfG',
    };

    if(this.state.user_ID != null || this.state.msisdn != null){
    Axios.post(`${config.apiBaseUrl}/payment/status`, unsubData)
      .then(async(res) => {
        let result = res.data;
        if (result.code == -1 && result.message) {
          this.setState({ messageText: "User does not exist" });
        } else if (result.data.auto_renewal == true && result.data.subscription_status !== 'expired') {
          delete unsubData.package_id;
          
          await Axios.post(`${config.apiBaseUrl}/payment/sms-unsub`, unsubData).then((res) => {
            let result = res.data;
          });
          
          this.setState({ messageText: "You have been Unsubscribed", unsubConfirmed: true });
          setTimeout(() => {
            this.props.history.push('/');
          }, 10000);

        } else if (result.data.auto_renewal === false) {
          if(!packageId){
            this.handleSubmit('QDfC');
          } else {
            this.setState({ messageText: "You are already Unsubscribed" });
          }
        } else if (result.code == -1 && !result.data.auto_renewal) {
          if(!packageId){
            this.handleSubmit('QDfC');
          } else {
            this.setState({ messageText: "You do not have this package" });
          }
        }else if(result.code === 0 && result.data.subscription_status === 'expired') {
          this.setState({ messageText: "You are already unsubscribed" });
        }

        if(packageId){
          this.setState({ unsubConfirmed: true });
          setTimeout(() => {
            this.props.history.push('/');
          }, 10000);
        }
      })
      .catch((err) => {
      });
    }else{
      this.setState({ messageText: "Sorry! Nothing to display" });
      this.setState({ unsubConfirmed: true });
    }
  }

  handleChange = (e) => {
    if(this.state.is_otp_triggered) {
      this.setState({otp: e.target.value});
    }else{
      this.setState({msisdn: e.target.value});
    }
  }

  render() {
    return (
      <div>
        <GridContainer className="containerUnSub">
          <GridItem xs={12} sm={12} md={12}>

            {this.state.is_otp_triggered === true && this.state.otp_verified === false ? 
            
            <div className="unsubDiv">
                <h3>Please enter the OTP received</h3>
                <input type="number" className="mobileNumber" placeholder="xxxx" onChange={(e)=>this.handleChange(e)}/>
                <Button variant="contained" color="secondary" className="btnSubmitUnsub" onClick={() => this.handleSubmit()}>Verify</Button>
                {/* <Button variant="contained" color="secondary" className="btnCancelUnsub" onClick={this.cancel}>Cancel</Button> */}
            </div>
            :
            <p></p>
            }

            {this.state.messageText === undefined ?
              <div className="unsubDiv">
                <h3>Please enter your mobile number</h3>
                <input type="number" className="mobileNumber" placeholder="03xx-xxxxxxx" onChange={(e)=>this.handleChange(e)}/>
                <Button variant="contained" color="primary" className="btnSubmitUnsub" onClick={() => this.handleSubmit()}>Confirm</Button>
                {/* <Button variant="contained" color="secondary" className="btnCancelUnsub" onClick={this.cancel}>Cancel</Button> */}
              </div>
            :
              <div className="d-flex flex-column">
                <UnsubscribeIcon style={{height:"100px", width:"100px"}}  className="d-flex m-auto" />
                <p className="d-flex justify-content-center font_size">
                  {this.state.messageText}
                </p>
              </div>
            }
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withRouter(UnSubPage)