import React from "react";
import { Text, View } from "react-native";
import { Title, Body, Header } from "native-base";
export default class PageTitle extends React.Component {
  render() {
    return (
      <Header>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
      </Header>
    );
  }
}
