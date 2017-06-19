import React, { Component } from "react";
import { TextInput, ScrollView } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Header,
  Title,
  View,
  H2,
  Item,
  Input,
  Badge,
  ListItem,
  List,
  Fab
} from "native-base";
import axios from "axios";
import Global from "../components/Global";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      post: "",
      active: true
    };
  }
  componentDidMount() {
    this.fetchAllData();
  }

  componentWillReceiveProps() {}

  fetchAllData = () => {
    axios.get(`http://localhost:5000/api/request/getall`).then(res => {
      this.setState({ userData: res.data });
    });
  };

  clearText = () => {
    this._textInput.setNativeProps({ text: "" });
  };

  submitToDb = () => {
    console.log(this.state.post);
    var newArray = this.state.userData;
    var newPost = {
      posts: this.state.post,
      dbid: Math.random(),
      username: Global.USERNAME,
      likes: 0
    };

    newArray.unshift(newPost);
    this.setState({ userDate: newArray });
    // var newArray = this.state.userData;
    // this.state.userData.push(newPost);
    // this.setState({ userData: newArray });
    axios.post("http://localhost:5000/api/request", {
      Username: Global.USERNAME,
      Posts: this.state.post
    });
    this.clearText();
  };

  plusOne = post => {
    var newArray = this.state.userData;
    for (var i = 0; i < this.state.userData.length; i++) {
      if (newArray[i].dbid === post.dbid) {
        newArray[i].likes++;
      }
    }
    this.setState({ userData: newArray });
    axios.put("http://localhost:5000/api/request", post);
  };

  render() {
    if (this.state.userData === null) return null;
    return (
      <ScrollView style={{ flex: 1, paddingVertical: 20 }}>
        <Card>
          <View>
            <Body>
              <Title>Community Activity</Title>
            </Body>
            <Input
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              ref={component => (this._textInput = component)}
              placeholder="New Post....."
              onChangeText={post => this.setState({ post })}
            />
            <View
              style={{
                flex: 1,
                paddingTop: 4,
                paddingBottom: 4,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                small
                bordered
                borderedtextStyle={{ textAlign: "center" }}
                onPress={() => this.submitToDb()}
              >
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
          <View>
            <List>
              {this.state.userData.map((post, key) =>
                <ListItem avatar key={post.dbid}>
                  <Left>
                    <Thumbnail source={require("../img/zoey.jpg")} />
                  </Left>
                  <Body>
                    <Text>{post.username}</Text>
                    <Text note>
                      {post.posts}
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => this.plusOne(post)}>
                      <Icon active name="thumbs-up" />
                      <Text>{post.likes} Likes</Text>
                    </Button>
                  </Right>
                </ListItem>
              )}
            </List>
          </View>
        </Card>
      </ScrollView>
    );
  }
}
