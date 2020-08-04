import React, { Component } from "react";
import GridContainer from "../../Components/Grid/GridContainer";
import GridItem from "../../Components/Grid/GridItem";
import AxiosInstance from "../../Utils/AxiosInstance";
import Loader from "../../Components/Loader/Loader";

export default class UnSubPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_ID: new URLSearchParams(this.props.location.search).get("proxy"),
      sourcee: "sms",
      package_ID: new URLSearchParams(this.props.location.search).get("pg"),
      alreadySubscribed: false,
      loading: true,
      messageText: "",
    };
  }

  componentDidMount() {
    let unsubData = {
      user_id: this.state.user_ID,
      source: this.state.sourcee,
      package_id: this.state.package_ID,
    };

    AxiosInstance.post("payment/status", unsubData)
      .then((res) => {
        let result = res.data;
        if (result.code == -1 && result.message) {
          this.setState({ messageText: "UserID is incorrect" });
        }else if (result.data.auto_renewal==true) {
          AxiosInstance.post("payment/unsubscribe", unsubData).then((res) => {
            this.setState({ messageText: "You have been Unsubscribed" });
          });
        }else if (result.data.auto_renewal==false){
            this.setState({ messageText: "You have already been unsubscribed" });
        }
         else if (result.code == -1 && !result.data.auto_renewal) {
          this.setState({ messageText: "You do not have this package" });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  render() {
    return (
      <div>
        {console.log(
          this.state.user_idd + "   Hello  " + this.state.package_idd
        )}
        <GridContainer className="containerPP">
          <GridItem xs={12} sm={12} md={12}>
            {this.state.loading === false ? (
              <p className="d-flex justify-content-center">
                {this.state.messageText}
              </p>
            ) : (
              <Loader />
            )}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
