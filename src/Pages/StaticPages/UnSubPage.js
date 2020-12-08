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
      user_ID: new URLSearchParams(this.props.location.search).get("proxy") ? new URLSearchParams(this.props.location.search).get("proxy") : undefined,
      sourcee: "sms",
      package_ID: new URLSearchParams(this.props.location.search).get("pg") ? new URLSearchParams(this.props.location.search).get("pg") : undefined,
      msisdn:  new URLSearchParams(this.props.location.search).get("msisdn") ? new URLSearchParams(this.props.location.search).get("msisdn") : undefined,
      unsubConfirmed: false,
      messageText: "",
    };
  }

  componentDidMount() {

  }
  cancel = () => {
    this.props.history.push('/');
  }
  handleSubmit = () => {
    let unsubData = {
      msisdn: this.state.msisdn,
      user_id: this.state.user_ID,
      source: this.state.sourcee,
      package_id: this.state.package_ID,
    };
    if(this.state.user_ID != null || this.state.msisdn != null){
    Axios.post(`${config.apiBaseUrl}/payment/status`, unsubData)
      .then((res) => {
        let result = res.data;
        if (result.code == -1 && result.message) {
          this.setState({ messageText: "User does not exist" });
        } else if (result.data.auto_renewal == true) {
          Axios.post(`${config.apiBaseUrl}/payment/sms-unsub`, unsubData).then((res) => {
            let result = res.data;
          });
          this.setState({ messageText: "You have been Unsubscribed" });
        } else if (result.data.auto_renewal == false) {
          this.setState({ messageText: "You are already Unsubscribed" });
        } else if (result.code == -1 && !result.data.auto_renewal) {
          this.setState({ messageText: "You do not have this package" });
        }
        this.setState({ unsubConfirmed: true });
        setTimeout(() => {
          this.props.history.push('/');
        }, 3000);
      })
      .catch((err) => {
      });
    }else{
      this.setState({ messageText: "Sorry! Nothing to display" });
      this.setState({ unsubConfirmed: true });
    }
  }

  render() {
    return (
      <div>
        <GridContainer className="containerUnSub">
          <GridItem xs={12} sm={12} md={12}>
            {this.state.unsubConfirmed === false ?
              <div className="unsubDiv">
                <h3>Are you sure you want to unsubscribe?</h3>
                <Button variant="contained" color="primary" className="btnSubmitUnsub" onClick={this.handleSubmit}>Confirm</Button>
                <Button variant="contained" color="secondary" className="btnCancelUnsub" onClick={this.cancel}>Cancel</Button>
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