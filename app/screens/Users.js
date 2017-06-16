import React, { Component } from "react";
import { ScrollView, Linking, Header } from "react-native";
import { Container, Content, Text, View } from "native-base";
import PageHeader from "../components/Header";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: [] };
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/request/getall`).then(res => {
      this.setState({ userData: res.data });
      console.log("this.state.userData = ", this.state.userData);
    });
  }
  render() {
    if (this.state.userData === null) return null;
    const { navigate } = this.props.navigation;
    return (
      <View><Text>Users Page</Text></View>
      // <List>
      //   {this.state.userData.map((user, key) =>
      //     <ListItem
      //       roundAvatar
      //       avatar={{
      //         uri:
      //           "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
      //       }}
      //       key={user.dbid}
      //       title={user.username}
      //       subtitle={user.company}
      //     />
      //   )}
      // </List>
    );
  }
}
