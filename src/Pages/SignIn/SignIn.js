import React from "react";
import "./SignIn.scss";
import Background from "../../Assets/Background.jpg";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="signin">
        <div
          className="signin__bg"
          style={{ backgroundImage: `url(${Background})` }}
        />
        <div className="signin__container">
          <div className="signin__shadow">
            <h1 className="signin__title">Sign In</h1>

            <form
              action="POST"
              autoComplete="new-password"
              onSubmit={this.handleSubmit}
            >

              <div className="signin__btn-container">
                <div className="signin__btn">
                </div>
              </div>
            </form>
            <div className="signin__option">
              <span className="signin__option--newuser">New to Netflix?</span>
              <Link to="/signup" className="signin__option--link">
                Sign up now.
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
