// ------- unsub Page ---------- //
import React, { Component } from "react";
import GridContainer from "../../Components/Grid/GridContainer";
import "./unsub.css";
import Modal from "../../Components/Modal/Modal";
import { withRouter } from "react-router-dom";
import config from "../../Utils/config";


class unsub extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      modalOpen: false ,
    };
  }

  setOpenModal (){
    this.setState({modalOpen: true});
  }

  render() {
  return (
    <GridContainer className="containerUnSub">
    <div className="unsub">
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <h2>Please enter your mobile number to unsubscribe</h2>
      <br></br><br></br><br></br>
      <div className="container">
        <label for="Mobile">Number</label>
        <input type="tel" id="Mobile" mobile="Mobile" placeholder="03xx-xxxxxxx"></input>
      </div>
      <br></br><br></br>
      <button
        className="openModalBtn"
        onClick={() => {
          this.setState({modalOpen: true})}}
      >
        Submit
      </button>
      {this.state.modalOpen && <Modal setOpenModal />}
    </div>
    </GridContainer>
  );
  }
}

export default withRouter(unsub);