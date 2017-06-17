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
  List
} from "native-base";
import axios from "axios";
import Global from "../components/Global";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      post: ""
    };
  }
  componentDidMount() {
    this.fetchAllData();
  }

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
    axios.post("http://localhost:5000/api/request", {
      Username: Global.USERNAME,
      Posts: this.state.post
    });
    this.clearText();
  };

  plusOne = post => {
    post.likes++;
    console.log(post);
    axios
      .put("http://localhost:5000/api/request", post)
      .then(this.fetchAllData());
  };

  render() {
    if (this.state.userData === null) return null;
    // const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ flex: 1, paddingVertical: 20 }}>
        <Card>
          <View>
            <Body>
              <Title>Community Activity</Title>
            </Body>
            <Input
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

// <List>
//   {this.state.userData.map((post, key) =>
//     <ListItem avatar key={post.dbid}>
//       <Left>
//         <Thumbnail source={require("../img/zoey.jpg")} />
//       </Left>
//       <Body>
//         <Text>{post.username}</Text>
//         <Text note>
//           {post.posts}
//         </Text>
//       </Body>
//       <Right>
//         <Button
//           transparent
//           danger
//           iconLeft
//           onPress={() => this.removeFromDb(post)}
//         >
//           <Icon name="trash" />
//         </Button>
//       </Right>
//     </ListItem>
//   )}
// </List>

// Fix username not persisting after reopening the app
// <ScrollView style={{ flex: 1, paddingVertical: 20 }}>
//   <View>
//     <Text h4>Welcome {Global.USERNAME}</Text>
//     <TextInput
//       style={{ height: 40 }}
//       placeholder="New Post...."
//       onChangeText={post => this.setState({ post })}
//     />
//     <Button
//       raised
//       buttonStyle={{ backgroundColor: "red", borderRadius: 10 }}
//       textStyle={{ textAlign: "center" }}
//       title={`Submit`}
//       onPress={() => this.submitToDb()}
//     />
//   </View>
//   {this.state.userData.map((user, key) =>
//     <Card key={user.dbid} title={user.username}>
//       <Text style={{ marginBottom: 10 }}>
//         {user.posts}
//       </Text>
//       <Badge
//         onPress={() => {
//           this.plusOne(user);
//         }}
//         value={user.likes}
//       />
//     </Card>
//   )}
// </ScrollView>
