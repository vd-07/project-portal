import React, { Component } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";

export default class ProjectDescription extends Component {
  state = {
    errorMessage: null
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
        if(projectName === "") {
          this.setState({ errorMessage: "Please enter project name"});
        } else if(description === "") {
          this.setState({ errorMessage: "Please enter project description"});
        }
      } else {
        if (this.props.handleNewProjectSave) {
          this.props.handleNewProjectSave({
            projectName,
            description,
            phoneNum,
            emailId,
          });
        } else if (this.props.handleExistingProjectEdit) {
          this.props.handleExistingProjectEdit({
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
              disabled
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
              disabled
              type="email"
              value={this.props.projectData && this.props.projectData.emailId}
              placeholder="Email ID"
              onChange={(e) =>
                this.props.handleChange("emailId", e.target.value)
              }
            />
          </Form.Field>
        </Form>
        <p className="error-message-custom">{this.props.errorMessage}</p>
        <div className="action-buttons">
          <div className="inner-action-buttons-container">
            <div style={{ marginRight: 10 }}>
              <Button onClick={this.saveClicked}>
                {this.props.handleNewProjectSave ? "Create" : "Save"}
              </Button>
            </div>
            {this.props.handleNewProjectSave ? null : (
              <Button onClick={this.props.deleteCurrentProject}>Delete</Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
