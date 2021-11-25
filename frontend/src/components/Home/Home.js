import React, { Component } from "react";
import { Icon, Segment, Button } from "semantic-ui-react";
import Signup from "./Signup";
import Login from "./Login";
import "./Style.css";
import { Navigate } from "react-router-dom";

export default class Home extends Component {
  state = {
    isSignUp: false,
    isStudent: false,
    displayChoice: true,
  };

  setSignUpState = (value) => {
    this.setState({ isSignUp: value });
  };

  redirectToStudentDashboard = () => {
    this.setState({ isStudent: true });
  };

  redirectToSignIn = () => {
    this.setState({ displayChoice: false });
  };

  render() {
    let loginOrSignup = this.state.isSignUp ? (
      <Signup
        setSignUpState={this.setSignUpState}
        redirectToStudentDashboard={this.redirectToStudentDashboard}
      />
    ) : (
      <Login
        setSignUpState={this.setSignUpState}
        redirectToStudentDashboard={this.redirectToStudentDashboard}
      />
    );

    let studentProfessorChoice = (
      <Segment placeholder style={{ height: 250 }}>
        <Button
          onClick={this.redirectToSignIn}
          content="Proceed as Professor"
          icon="user"
          size="medium"
        />
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={this.redirectToStudentDashboard}
            content="Proceed as Student"
            icon="users"
            size="medium"
          />
        </div>
      </Segment>
    );

    return (
      <div>
        {this.state.isStudent && <Navigate to="/dashboard/allprojects" />}
        <center>
          <h1 className="dashboard-title">
            <Icon className="dashboard-title-icon" name="student" />
            PROJECT PORTAL
          </h1>
        </center>
        {this.state.displayChoice ? studentProfessorChoice : loginOrSignup}
      </div>
    );
  }
}
