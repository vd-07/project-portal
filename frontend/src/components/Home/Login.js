import React, { Component } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import "./Style.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default class Login extends Component {
  state = {
    emailId: null,
    password: null,
  };

  handleChange = (type, value) => {
    // console.log("HERE");
    // console.log({ type: value });
    switch (type) {
      case "password":
        this.setState({ password: value });
        break;
      case "emailId":
        this.setState({ emailId: value });
        break;
      default:
        console.log("err");
    }
  };

  login = async () => {
    // FIXME: clear cookie does not working, using this temporarily
    // HINT: if we are accessing any authorized route and gettingn 401 error, call logout

    try {
      await axios.get("users/logout");
      const res = await axios.post("users/login", {
        emailId: this.state.emailId,
        password: this.state.password,
      });

      if (res.status === 200) {
        this.setState({ redirectToDash: true });
      }
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
    }
  };

  render() {
    return (
      <div>
        {this.state.redirectToDash && <Navigate to="/dashboard" />}
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Email ID"
                  placeholder="Email ID"
                  value={this.state.emailId}
                  onChange={(e) => this.handleChange("emailId", e.target.value)}
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  type="password"
                  placeholder="********"
                  value={this.state.password}
                  onChange={(e) =>
                    this.handleChange("password", e.target.value)
                  }
                />

                <Button onClick={this.login} content="Login" primary />
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <p className="user-account-info-text">Don't have an account?</p>
              <Button
                onClick={(e) => this.props.setSignUpState(true)}
                content="Sign up"
                icon="signup"
                size="medium"
              />
              <br />
              {/* <Button onClick={this.props.redirectToStudentDashboard} content="Proceed as student" icon="play" size="medium" /> */}
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </div>
    );
  }
}
