import React, { Component } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";

export default class ProjectDescription extends Component {
  state = {
    errorSave: false,
  };

  saveClicked = () => {
    if (this.props.projectData) {
      var { projectName, description, phoneNum, emailId } =
        this.props.projectData;

      if (
        projectName === "" ||
        description === "" ||
        phoneNum === "" ||
        emailId === ""
      ) {
        this.setState({ errorSave: true });
      } else {
        if (this.props.handleNewProjectSave) {
          this.props.handleNewProjectSave({
            projectName,
            description,
            phoneNum,
            emailId,
          });
        }
      }
    }
  };

  render() {
    // TODO: disabled for unauthorized access and all student
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Project Name</label>
            <input
              value={
                this.props.projectData && this.props.projectData.projectName
              }
              placeholder="Project Name"
              onChange={(e) =>
                this.props.handleChange("projectName", e.target.value)
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea
              value={
                this.props.projectData && this.props.projectData.description
              }
              placeholder="Enter Project Description"
              onChange={(e) =>
                this.props.handleChange("description", e.target.value)
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Phone Number</label>
            <input
              // #TODO: type = phone number
              value={this.props.projectData && this.props.projectData.phoneNum}
              placeholder="Enter 10 digits number"
              onChange={(e) =>
                this.props.handleChange("phoneNum", e.target.value)
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Email ID</label>
            <input
              type="email"
              value={this.props.projectData && this.props.projectData.emailId}
              placeholder="Email ID"
              onChange={(e) =>
                this.props.handleChange("emailId", e.target.value)
              }
            />
          </Form.Field>
        </Form>
        <div className="action-buttons">
          <div className="inner-action-buttons-container">
            <Button onClick={this.saveClicked}>Save</Button>
            <Button onClick={this.props.deleteCurrentProject}>Delete</Button>
          </div>
        </div>
      </div>
    );
  }
}
