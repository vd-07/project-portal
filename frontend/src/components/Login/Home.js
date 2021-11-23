import React, { Component } from "react";
import { Button, Divider, Form, Grid, Segment, Icon } from "semantic-ui-react";
import Signup from "./Signup";
import Login from "./Login";
import "./Style.css";

export default class Home extends Component {
  state = {
    isSignUp: false,
  };

  setSignUpState = (value) => {
    this.setState({ isSignUp: value });
  };

  render() {
    return (
      <div>
        <center>
          <h1 className="dashboard-title">
            <Icon className="dashboard-title-icon" name="student" />
            PROJECT DASHBOARD
          </h1>
        </center>
        {this.state.isSignUp ? (
          <Signup setSignUpState={this.setSignUpState} />
        ) : (
          <Login setSignUpState={this.setSignUpState} />
        )}
      </div>
    );
  }
}
