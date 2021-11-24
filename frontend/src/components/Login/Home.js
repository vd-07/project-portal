import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import Signup from "./Signup";
import Login from "./Login";
import "./Style.css";
import { Navigate } from "react-router-dom";

export default class Home extends Component {
  state = {
    isSignUp: false,
    isStudent: false,
  };

  setSignUpState = (value) => {
    this.setState({ isSignUp: value });
  };

  redirectToStudentDashboard = () => {
    this.setState({ isStudent: true });
  };

  render() {
    return (
      <div>
        {this.state.isStudent && <Navigate to="/dashboard/allprojects" />}
        <center>
          <h1 className="dashboard-title">
            <Icon className="dashboard-title-icon" name="student" />
            PROJECT PORTAL
          </h1>
        </center>
        {this.state.isSignUp ? (
          <Signup
            setSignUpState={this.setSignUpState}
            redirectToStudentDashboard={this.redirectToStudentDashboard}
          />
        ) : (
          <Login
            setSignUpState={this.setSignUpState}
            redirectToStudentDashboard={this.redirectToStudentDashboard}
          />
        )}
      </div>
    );
  }
}
