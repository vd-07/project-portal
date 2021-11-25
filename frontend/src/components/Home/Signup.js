import axios from "axios";
import React, { Component } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import "./Style.css";

export default class Signup extends Component {
  state = {
    emailId: null,
    professorName: null,
    mobileNum: null,
    password: null,
    password2: null,
  };

  handleChange = (type, value) => {
    // console.log("HERE");
    // console.log({ type: value });
    switch (type) {
      case "professorName":
        this.setState({ professorName: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
      case "mobileNum":
        this.setState({ mobileNum: value });
        break;
      case "password2":
        this.setState({ password2: value });
        break;
      case "emailId":
        this.setState({ emailId: value });
        break;
      default:
        console.log("err");
    }
  };

  signup = async () => {
    try {
      await axios.get("users/logout");
      let res = await axios.post("users/register", {
        emailId: this.state.emailId,
        professorName: this.state.professorName,
        mobileNum: this.state.mobileNum,
        password: this.state.password,
        password2: this.state.password2,
      });

      if (res.status === 200) {
        alert(res.data.msg);
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert(err.response.data[0].msg);
        // this.props.setSignUpState(false);
      } else {
        alert("Something went wrong");
      }
    }
  };

  render() {
    return (
      <div>
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form>
                <Form.Input
                  icon="mail"
                  iconPosition="left"
                  label="Email ID"
                  placeholder="Email ID"
                  value={this.state.emailId}
                  onChange={(e) => this.handleChange("emailId", e.target.value)}
                />
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Name"
                  placeholder="Name"
                  value={this.state.professorName}
                  onChange={(e) =>
                    this.handleChange("professorName", e.target.value)
                  }
                />
                <Form.Input
                  icon="mobile alternate"
                  iconPosition="left"
                  label="Mobile Number"
                  placeholder="Mobile Number"
                  value={this.state.mobileNum}
                  onChange={(e) =>
                    this.handleChange("mobileNum", e.target.value)
                  }
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
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  label="Confirm Password"
                  type="password"
                  placeholder="********"
                  value={this.state.password2}
                  onChange={(e) =>
                    this.handleChange("password2", e.target.value)
                  }
                />

                <Button onClick={this.signup} content="Sign up" primary />
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <p className="user-account-info-text">Already have an account?</p>
              <Button
                content="Login"
                onClick={(e) => this.props.setSignUpState(false)}
                icon="sign-in"
                size="medium"
              />
              <br />
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </div>
    );
  }
}
