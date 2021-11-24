import React, { Component } from "react";
import { Grid, Icon, Button, Divider, Header } from "semantic-ui-react";
import { Navigate } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import axios from "axios";

export default class StudentDashboard extends Component {
  state = {
    professorName: null,
    projectName: null,
    description: null,
    mobileNum: null,
    emailId: null,
    selectedProjectIndex: -1,
    projectData: [],
    professorData: {},
    redirectToHome: false,
  };

  goToHome = () => {
    this.setState({ redirectToHome: true });
  };

  processProjectData = (data) => {
    // console.log(data);
    let temp = [];
    for (let i in data) {
      for (let j in data[i].projectList) {
        let currProject = {
          professorName: data[i].professorName,
          mobileNum: data[i].mobileNum,
          emailId: data[i].emailId,
          projectName: data[i].projectList[j].projectName,
          description: data[i].projectList[j].description,
        };
        temp.push(currProject);
      }
    }
    this.setState({ projectData: temp });
  };

  async componentDidMount() {
    try {
      let res = await axios.get("dashboard/allprojects");
      this.processProjectData(res.data);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  render() {
    return (
      <div>
        {this.state.redirectToHome && <Navigate to="/" />}
        <center>
          <h1 className="dashboard-title">
            <Icon className="dashboard-title-icon" name="student" />
            PROJECT DASHBOARD
          </h1>
          <Button
            negative
            icon="home"
            content="Back to Home"
            onClick={this.goToHome}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
        <Divider horizontal>
          <Header as="h2">
            <Icon name="book" />
            Project List
          </Header>
        </Divider>
        {/* FIXME: Center alignment */}
          <Grid columns={3}>
            {this.state.projectData.map((data, i) => (
              <ProjectDetails
                professorName={data.professorName}
                emailId={data.emailId}
                mobileNum={data.mobileNum}
                projectName={data.projectName}
                key={i}
                description={data.description}
              />
            ))}
          </Grid>
        </center>
      </div>
    );
  }
}
