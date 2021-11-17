import React, { Component } from "react";
import { Button, Divider, Grid, Segment, Icon, Card } from "semantic-ui-react";
import "./Dashboard.css";
import ProjectDescription from "./ProjectDescription";
import ProjectName from "./ProjectName";

export default class DashBoard extends Component {
  state = {
    projectList: ["project 1", "Project 2", "Project 3", "Project 4"],
    projectName: "None",
    description: "None",
    phoneNum: "11111",
    emailId: "abc@xyz",
    selectedProjectIndex: 0,
    addingNewProject: false,
    prData: {},
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
    // TODO: login
    this.setState(this.state.projectData[0]);
  }

  handleChange = (type, value) => {
    // console.log("HERE");
    // console.log({ type: value });
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

  addNewProject = () => {
    this.setState({ addingNewProject: true });
    this.setState({
      projectName: "",
      description: "",
      phoneNum: "",
      emailId: "",
    });
    this.setState({ selectedProjectIndex: -1 });
  };

  handleNewProjectSave = (data) => {
    var temp = this.state.projectList;
    temp.push(data.projectName);
    this.setState({ projectList: temp });

    temp = this.state.projectData;
    temp.push(data);
    this.setState({ projectData: temp });
    this.setState({ selectedProjectIndex: temp.length - 1 });
    this.setState({ addingNewProject: false });
  };

  deleteCurrentProject = () => {
    if (
      this.state.projectData.length > this.state.selectedProjectIndex &&
      this.state.selectedProjectIndex >= 0
    ) {
      var temp = this.state.projectList;
      temp.splice(this.state.selectedProjectIndex, 1);
      this.setState({ projectList: temp });

      temp = this.state.projectData;
      temp.splice(this.state.selectedProjectIndex, 1);
      this.setState({ projectData: temp });

      if (this.state.selectedProjectIndex >= temp.length) {
        this.setState({ selectedProjectIndex: temp.length - 1 });
      }

      if (temp.length === 0) {
        this.addNewProject();
      }
    }
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
                <Button
                  icon="plus"
                  content="Add New Project"
                  onClick={this.addNewProject}
                />
              </div>
            </center>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            {this.state.addingNewProject ? (
              <ProjectDescription
                projectData={{
                  projectName: this.state.projectName,
                  description: this.state.description,
                  phoneNum: this.state.phoneNum,
                  emailId: this.state.emailId,
                }}
                handleChange={this.handleChange}
                handleNewProjectSave={this.handleNewProjectSave}
              />
            ) : (
              <ProjectDescription
                projectData={
                  this.state.projectData[this.state.selectedProjectIndex]
                }
                handleChange={this.handleChange}
                deleteCurrentProject={this.deleteCurrentProject}
              />
            )}
          </Grid.Column>
        </Grid>

        <Divider className="divider" vertical>
          <Icon disabled name="arrow alternate circle right" />{" "}
        </Divider>
      </Segment>
    );
  }
}
