import React, { Component } from "react";
import { Button, Divider, Grid, Segment, Icon, Card } from "semantic-ui-react";
import "./Dashboard.css";
import ProjectDescription from "./ProjectDescription";
import ProjectName from "./ProjectName";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default class DashBoard extends Component {
  state = {
    professorName: null,
    projectName: null,
    description: null,
    phoneNum: null,
    emailId: null,
    selectedProjectIndex: -1,
    addingNewProject: false,
    projectData: [],
    professorData: {},
    redirectToHome: false,
    selectAProject: true,
  };

  logout = () => {
    axios.get("users/logout");
    this.setState({ redirectToHome: true });
  };

  getProfessorDetails = async () => {
    // document.cookie=`sid=${Cookies.get('connect.sid')}`;
    const res = await axios.get("dashboard/", { withCredentials: true });
    if (res.status === 200) {
      return res.data;
    }
  };

  processProjectData = (data) => {
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
    this.setState({ professorData: data });
    this.setState({ professorName: data.professorName });
    this.setState({ projectData: temp });
  };

  async componentDidMount() {
    // console.log(res.headers);
    // const res = {status: 200};

    // FIXME: either as student or as professor
    try {
      const data = await this.getProfessorDetails();
      // console.log(data);
      this.processProjectData(data);
    } catch (err) {
      alert(err.response.data.message);
    }
    // this.setState(this.state.projectData[0]);
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
    this.setState({ selectAProject: false });
  };

  addNewProject = () => {
    this.setState({ addingNewProject: true });
    this.setState({ selectAProject: false });
    this.setState({
      projectName: "",
      description: "",
      emailId: this.state.professorData.emailId,
      phoneNum: this.state.professorData.mobileNum,
    });
    this.setState({ selectedProjectIndex: -1 });
  };

  updateAfterSaving = () => {
    this.setState({ selectedProjectIndex: this.state.projectData - 1 });
    this.setState({ addingNewProject: false });
  };

  handleNewProjectSave = async (data) => {
    try {
      let res = await axios.post("dashboard/create", data);
      if (res.status === 200) {
        this.processProjectData(res.data);
        this.updateAfterSaving();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  updateAfterDeletion = () => {
    if (
      this.state.projectData.length > this.state.selectedProjectIndex &&
      this.state.selectedProjectIndex >= 0
    ) {
      let temp = this.state.projectData;
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
    const body = {
      projectId: this.state.projectData[this.state.selectedProjectIndex].id,
    };
    // console.log(this.state.projectData);
    console.log(body);
    axios
      .delete("dashboard/delete", { data: body })
      .then((res) => {
        if (res.status === 200) {
          this.updateAfterDeletion();
        } else {
          // TODO: warn for login
        }
      })
      .catch((err) => {
        // TODO: handle this also
        alert(err.response.data.message);
      });
  };

  handleExistingProjectEdit = async (data) => {
    // console.log("Edited.....");
    data.projectId = this.state.projectData[this.state.selectedProjectIndex].id;
    // console.log(data);
    try {
      let res = await axios.patch("/dashboard/edit", data);
      // console.log(res);
      if (res.status === 200) {
        let temp = this.state.projectData;
        temp[this.state.selectedProjectIndex].projectName = data.projectName;
        temp[this.state.selectedProjectIndex].description = data.description;
        this.setState({ projectData: temp });
        alert("Saved Successfully!");
      }
    } catch (err) {
      // console.log(err);
      alert(err.response.data.message);
    }
  };

  render() {
    let list = this.state.projectData;

    return (
      <div>
        {this.state.redirectToHome && <Navigate to="/" />}
        <center>
          <h1 className="dashboard-title">
            <Icon className="dashboard-title-icon" name="student" />
            PROJECT DASHBOARD
          </h1>
          <p className="user-account-info-text">
            Welcome! {this.state.professorName}
          </p>
        </center>
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <div className="project-list-title">
                <center>
                  <h3 className="user-account-info-text">Projects List</h3>
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
              {this.state.selectAProject ? (
                <p className="user-account-info-text">
                  {" "}
                  Please select a project
                  <br />
                  OR
                  <br />
                  Add a new one!{" "}
                </p>
              ) : this.state.addingNewProject ? (
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
                  handleExistingProjectEdit={this.handleExistingProjectEdit}
                  deleteCurrentProject={this.deleteCurrentProject}
                />
              )}
            </Grid.Column>
          </Grid>

          <Divider className="divider" vertical>
            <Icon disabled name="arrow alternate circle right" />{" "}
          </Divider>
        </Segment>
        <center>
          <Button
            negative
            icon="sign-out"
            content="Logout"
            onClick={this.logout}
          />
        </center>
      </div>
    );
  }
}
