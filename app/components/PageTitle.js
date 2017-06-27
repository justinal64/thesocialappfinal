import React from "react";
import { Text, Header, View } from "react-native";
import { Title } from "native-base";
export default class PageTitle extends React.Component {
  render() {
    return <Title>{this.props.title}</Title>;
  }
}
