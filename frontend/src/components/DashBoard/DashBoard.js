import React, { Component } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Icon,
  Card,
  TextArea,
} from "semantic-ui-react";
import "./Dashboard.css";
import ProjectName from "./ProjectName";

export default class DashBoard extends Component {
  state = {
    projectList: ["project 1", "Project 2", "Project 3", "Project 4"],
    projectName: "None",
    description: "None",
    phoneNum: "11111",
    emailId: "abc@xyz",
    selectedProjectIndex: 0,
    projectData: [
      {
        projectName: "1",
        description: "sfsf",
        phoneNum: "1546651",
        emailId: "asd@gmail.com",
      },
      {
        projectName: "2",
        description: "sfddf",
        phoneNum: "645664",
        emailId: "dfasfs@gmail.com",
      },
      {
        projectName: "3",
        description: "sgbsdfg",
        phoneNum: "76865875",
        emailId: "edgbesrg@gmail.com",
      },
      {
        projectName: "4",
        description: "sgdfgv",
        phoneNum: "289646963463",
        emailId: "cnrusrujynfs@gmail.com",
      },
    ],
  };

  componentDidMount() {
    // TODO: show select a project at start
    // TODO: break this component
    this.setState(this.state.projectData[0]);
  }

  handleChange = (type, value) => {
    console.log("HERE");
    console.log({ type: value });
    switch (type) {
      case "projectName":
        this.setState({ projectName: value });
        break;
      case "description":
        this.setState({ description: value });
        break;
      case "phoneNum":
        this.setState({ phoneNum: value });
        break;
      case "emailId":
        this.setState({ emailId: value });
        break;
      default:
        console.log("err");
    }
  };

  projectCardClicked = (index) => {
    this.setState(this.state.projectData[index]);
    this.setState({ selectedProjectIndex: index });
  };

  render() {
    var list = this.state.projectList;

    return (
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <div className="project-list-title">
              <center>
                <h3>Projects List</h3>
              </center>

              <Card.Group
                style={{ marginTop: 20, maxHeight: 500, overflowY: "scroll" }}
              >
                {list.map((name, i) => (
                  <ProjectName
                    projectName={name}
                    index={i}
                    cardClicked={this.projectCardClicked}
                    bgColor={
                      i === this.state.selectedProjectIndex ? "#767676" : "#fff"
                    }
                  />
                ))}
              </Card.Group>
            </div>
            <center>
              <div style={{ marginTop: 20 }}>
                <Button icon="plus" content="Add New Project" />
              </div>
            </center>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            {/* <Button content="Sign up" icon="signup" size="big" /> */}
            <Form>
              <Form.Field>
                <label>Project Name</label>
                <input
                  value={this.state.projectName}
                  placeholder="Project Name"
                  onChange={(e) =>
                    this.handleChange("projectName", e.target.value)
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <TextArea
                  value={this.state.description}
                  placeholder="Enter Project Description"
                  onChange={(e) =>
                    this.handleChange("description", e.target.value)
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <input
                  value={this.state.phoneNum}
                  placeholder="Enter 10 digits number"
                  onChange={(e) =>
                    this.handleChange("phoneNum", e.target.value)
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Email ID</label>
                <input
                  value={this.state.emailId}
                  placeholder="Email ID"
                  onChange={(e) => this.handleChange("emailId", e.target.value)}
                />
              </Form.Field>
            </Form>
            <div className="action-buttons">
              <div className="inner-action-buttons-container">
                <Button>Save</Button>
                <Button>Delete</Button>
              </div>
            </div>
          </Grid.Column>
        </Grid>

        <Divider className="divider" vertical>
          <Icon disabled name="arrow alternate circle right" />{" "}
        </Divider>
      </Segment>
    );
  }
}
