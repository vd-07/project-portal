import React, { Component } from "react";
import { Button, Divider, Grid, Segment, Icon, Card } from "semantic-ui-react";
import "./Dashboard.css";
import ProjectDescription from "./ProjectDescription";
import ProjectName from "./ProjectName";
import axios from "axios";
// import Cookies from "js-cookie";

export default class DashBoard extends Component {
  state = {
    projectName: null,
    description: null,
    phoneNum: null,
    emailId: null,
    selectedProjectIndex: -1,
    addingNewProject: false,
    projectData: [],
  };

  getProfessorDetails = async () => {
    // document.cookie=`sid=${Cookies.get('connect.sid')}`;
    const res = await axios.get("dashboard/", { withCredentials: true });
    if (res.status === 200) {
      return res.data;
    } else {
      // TODO: get all project from the backend
    }
  };

  async componentDidMount() {
    // TODO: show select a project at start
    const res = await axios.post("users/login", {
      emailId: "dubey.vivek@gmail.com",
      password: "abcdef",
    }, {
      withCredentials: true
    });
    
    // console.log(res.headers);
    // const res = {status: 200};
    if (res.status === 200) {
      const data = await this.getProfessorDetails();
      console.log(data);
      let temp = [];
      for (let i = 0; i < data.projectList.length; ++i) {
        temp.push({
          id: data.projectList[i]._id,
          professorName: data.professorName,
          emailId: data.emailId,
          phoneNum: data.mobileNum,
          projectName: data.projectList[i].projectName,
          description: data.projectList[i].description,
        });
      }
      
      this.setState({ projectData: temp });
    }
    // this.setState(this.state.projectData[0]);
  }

  handleChange = (type, value) => {
    // console.log("HERE");
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

  updateAfterDeletion = () => {
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

  deleteCurrentProject = () => {
    axios.delete("dashboard/delete", { withCredentials: true }, {
      projectId: this.state.projectData[this.state.selectedProjectIndex]._id
    }).then((res) => {
      if(res.status === 200) {
        this.updateAfterDeletion();
      } else {
        // TODO: warn for login
      }
    }).catch(err => {
      // TODO: handle this also
      console.log(err.message);

    });
  };

  render() {
    var list = this.state.projectData;

    return (
      <div>
        <center>
          <h1 className="dashboard-title">
            <Icon className="dashboard-title-icon" name="student" />
            PROJECT DASHBOARD
          </h1>
        </center>
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
                      projectName={name.projectName}
                      index={i}
                      key={i}
                      cardClicked={this.projectCardClicked}
                      bgColor={
                        i === this.state.selectedProjectIndex
                          ? "#767676"
                          : "#fff"
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
                  projectData={{
                    projectName: this.state.projectName,
                    description: this.state.description,
                    phoneNum: this.state.phoneNum,
                    emailId: this.state.emailId,
                  }}
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
      </div>
    );
  }
}
