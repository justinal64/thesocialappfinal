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
  Form,
  Label
} from "native-base";
import axios from "axios";
import Global from "../components/Global";

var randomImg = [
  require("../images/thumbnails/0.jpg"),
  require("../images/thumbnails/1.jpg"),
  require("../images/thumbnails/2.jpg"),
  require("../images/thumbnails/3.jpg"),
  require("../images/thumbnails/4.jpg"),
  require("../images/thumbnails/5.jpg"),
  require("../images/thumbnails/6.jpg"),
  require("../images/thumbnails/7.jpg"),
  require("../images/thumbnails/8.jpg"),
  require("../images/thumbnails/9.jpg")
];

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
    axios.get(`https://a85a0d38.ngrok.io/api/request/getall`).then(res => {
      this.setState({ userData: res.data });
    });
  };

  clearText = () => {
    this._textInput.setNativeProps({ text: "" });
  };

  submitToDb = () => {
    var newArray = this.state.userData;
    var newPost = {
      posts: this.state.post,
      dbid: Math.random(),
      username: Global.USERNAME,
      likes: 0
    };

    newArray.unshift(newPost);
    this.setState({ userDate: newArray });
    axios.post("https://a85a0d38.ngrok.io/api/request", {
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
    axios.put("https://a85a0d38.ngrok.io/api/request", post);
  };

  render() {
    if (this.state.userData === null) return null;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Community Activity</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <View>
              <Input
                style={{
                  flex: 1,
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1
                }}
                ref={component => (this._textInput = component)}
                placeholder="New Post....."
                onChangeText={post => this.setState({ post })}
              />
              <Button
                full
                borderedtextStyle={{ textAlign: "center" }}
                onPress={() => this.submitToDb()}
              >
                <Text>Submit</Text>
              </Button>
              {/*</View>*/}
            </View>
          </Card>
          <Body />
          <Card style={{ borderBottomWidth: 0 }}>
            {this.state.userData.map((post, key) =>
              <ListItem avatar key={post.dbid}>
                <Left>
                  <Thumbnail
                    source={
                      randomImg[Math.floor(Math.random() * randomImg.length)]
                    }
                  />
                </Left>
                <Body style={{ borderBottomWidth: 0 }}>
                  <Text>{post.username}</Text>
                  <Text note>
                    {post.posts}
                  </Text>
                </Body>
                <Right style={{ borderBottomWidth: 0 }}>
                  <Button transparent onPress={() => this.plusOne(post)}>
                    <Icon active name="thumbs-up" />
                    <Text style={{ borderBottomWidth: 0 }}>
                      {post.likes} Likes
                    </Text>
                  </Button>
                </Right>
              </ListItem>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}
