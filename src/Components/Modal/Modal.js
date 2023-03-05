import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Modal.css";

class Modal extends Component {
  constructor(props){
    super(props);
    this.state ={
      isDisabled: false,
      time: 0,
    }
  }

  handleClick = () => {
    setTimeout(() => {
      alert("You have been unsubscribed successfully!");
      this.setState({isDisabled: true});
    },3000)
    /*this.setState({isDisabled: true});*/

    //confirm = true;
    //this.props.history.push('/');
  }

  cancel = () => {
    window.location.replace('/');
  }

  render(){
  const { isDisabled } = this.state;

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <div className="consent">
          <p>Are you sure you want to unsubscribe ? </p>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={this.cancel}
            id="cancelBtn"
          >
            CANCEL
          </button>
          
          <button 
            disabled={isDisabled}
            onClick={this.handleClick}
            style={isDisabled ? styles.buttonDisabled : styles.button}
            id="confirmBtn"
          >
            CONFIRM
          </button>
          </div>
        </div>
      </div>
  );
  }
}

export default withRouter(Modal);

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: '1px 10px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    padding: '1px 10px',
    cursor: 'not-allowed',
  },
};