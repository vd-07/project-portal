import React, { Component } from "react";
import { Icon, Grid, Card } from "semantic-ui-react";

export default class ProjectDetails extends Component {
  render() {
    return (
      <Grid.Column mobile={16} tablet={8} computer={5}>
        <Card>
          <Card.Content header={this.props.projectName} />
          <Card.Content style={{ marginTop: 20, maxHeight: 200, minHeight: 200, overflowY: "scroll" }} description={this.props.description} />
          <Card.Content extra>
            <Icon name="user" />
            {this.props.professorName}
          </Card.Content>
          <Card.Content extra>
            <Icon name="mail" />
            {this.props.emailId}
          </Card.Content>
          <Card.Content extra>
            <Icon name="mobile alternate" />
            {this.props.mobileNum}
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}
