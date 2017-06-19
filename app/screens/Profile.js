import React, { Component } from "react";
import { Image } from "react-native";
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
  List,
  ListView
} from "native-base";
import { onSignIn, auth, registerUser } from "../auth";
import axios from "axios";
import GLOBAL from "../components/Global";
import { onSignOut } from "../auth";

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

  componentDidReceiveProps() {
    console.log("componentDidReceiveProps Triggered!!");
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/request/${GLOBAL.USERNAME}`)
      .then(res => {
        console.log("res = ", res);
        this.setState({ userData: res.data });
      });
  }

  removeFromDb = post => {
    console.log(post);
    axios.delete(`http://localhost:5000/api/request/${post.dbid}`);
  };

  render() {
    if (this.state.userData === null) return null;
    const navigation = this.props.navigation;
    return (
      <Container>
        <ListView>
          <Header>
            <Body>
              <Title>Profile</Title>
            </Body>
          </Header>
          <Content>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={require("../img/zoey.jpg")} size={50} />
                  <Body>
                    <Text>{GLOBAL.USERNAME}</Text>
                    <Text note>April 15, 2016</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    style={{ height: 150, width: 150 }}
                    resizeMode="contain"
                    source={require("../img/zoey.jpg")}
                  />
                  <View>
                    <Text>
                      Company:
                    </Text>
                  </View>
                  <Button transparent textStyle={{ color: "#87838B" }}>
                    {/*<Icon name="logo-github" />*/}
                    {/*<Text>1,926 stars</Text>*/}
                  </Button>
                </Body>
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

              <View>
                <H2>Activity</H2>
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
        </ListView>
      </Container>
    );
  }
}
