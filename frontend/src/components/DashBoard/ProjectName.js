import React, { Component } from "react";
import { Card } from "semantic-ui-react";

export default class ProjectName extends Component {
  render() {
    return <Card style={{cursor: 'pointer', background: this.props.bgColor }} onClick={ (e) => this.props.cardClicked(this.props.index)} fluid color='red' header={this.props.projectName}/>;
  }
}
