import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
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
  ListItem,
  List
} from "native-base";
import { onSignIn, auth, registerUser } from "../auth";
import axios from "axios";
import GLOBAL from "../components/Global";
import { onSignOut } from "../auth";
import FitImage from "react-native-fit-image";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      username: "",
      company: "",
      posts: ""
    };
  }

  componentDidMount() {
    axios
      .get(`https://a85a0d38.ngrok.io/api/request/${GLOBAL.USERNAME}`)
      .then(res => {
        console.log("res = ", res);
        this.setState({ userData: res.data });
      });
  }

  removeFromDb = removePost => {
    // console.log(removePost);
    var newArray = [];
    this.state.userData.map((post, key) => {
      if (post.dbid !== removePost.dbid) {
        newArray.push(post);
      }
    });
    this.setState({ userData: newArray });

    axios.delete(`https://a85a0d38.ngrok.io/api/request/${removePost.dbid}`);
  };

  render() {
    if (this.state.userData === null) return null;
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <Content>
          <Card style={{ flex: 1 }}>
            <CardItem>
              <View style={{ flex: 1, alignItems: "stretch" }}>
                <FitImage
                  source={{
                    uri:
                      "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/18424252_10212092773210138_4371118282508991436_n.jpg?oh=628cf44962e98018b725a92da2468a41&oe=59C63DC7"
                  }}
                  style={styles.fitImage}
                />
                <View
                  style={{
                    flex: 1,
                    paddingTop: 2,
                    paddingBottom: 2,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text h3>
                    Company: World Outreach Church
                  </Text>
                </View>
              </View>
            </CardItem>
            <View
              style={{
                flex: 1,
                paddingTop: 2,
                paddingBottom: 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                rounded
                danger
                onPress={() =>
                  onSignOut().then(() => navigation.navigate("SignedOut"))}
              >
                <Text>Log Out</Text>
              </Button>
            </View>

            <View
              style={{
                flex: 1,
                paddingTop: 2,
                paddingBottom: 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <H2>Activity</H2>
            </View>
            <View>
              <List>
                {this.state.userData.map((post, key) =>
                  <ListItem avatar key={post.dbid}>
                    <Left>
                      <Thumbnail
                        source={{
                          uri:
                            "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/18424252_10212092773210138_4371118282508991436_n.jpg?oh=628cf44962e98018b725a92da2468a41&oe=59C63DC7"
                        }}
                      />
                    </Left>
                    <Body>
                      <Text>{post.username}</Text>
                      <Text note>
                        {post.posts}
                      </Text>
                    </Body>
                    <Right>
                      <Button
                        transparent
                        danger
                        iconLeft
                        onPress={() => this.removeFromDb(post)}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Right>
                  </ListItem>
                )}
              </List>
            </View>
          </Card>
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
  fitImage: {
    borderRadius: 20
  },
  fitImageWithSize: {
    height: 100,
    width: 30
  }
});
