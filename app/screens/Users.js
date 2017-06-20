import React, { Component } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Card,
  Title,
  Body,
  Left,
  Right,
  Thumbnail,
  Button,
  Icon,
  View,
  Toast,
  Header
} from "native-base";
import PageHeader from "../components/Header";
import axios from "axios";

const users = [
  {
    image: require("../images/thumbnails/0.jpg"),
    username: "Emily36"
  },
  {
    image: require("../images/thumbnails/1.jpg"),
    username: "BretTheAwesome"
  },
  {
    image: require("../images/thumbnails/2.jpg"),
    username: "Emily36"
  },
  {
    image: require("../images/thumbnails/3.jpg"),
    username: "Emily36"
  },
  {
    image: require("../images/thumbnails/4.jpg"),
    username: "Emily36"
  },
  {
    image: require("../images/thumbnails/5.jpg"),
    username: "Emily36"
  },
  {
    image: require("../images/thumbnails/6.jpg"),
    username: "Emily36"
  },
  {
    image: require("../images/thumbnails/7.jpg"),
    username: "Emily36"
  },
  {
    image: require("../images/thumbnails/8.jpg"),
    username: "Emily36"
  },
  {
    image: require("../images/thumbnails/9.jpg"),
    username: "Emily36"
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: [] };
  }

  friendRequest = () => {
    console.log("Friend Request Sent!!");
  };
  render() {
    if (this.state.userData === null) return null;
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Users</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <View>
              <List style={{ borderBottomWidth: 0 }}>
                {/*username not displaying correctly*/}
                {users.map((user, key) =>
                  <ListItem key={key} avatar style={{ borderBottomWidth: 0 }}>
                    <Left>
                      <Thumbnail source={user.image} />
                    </Left>
                    <Body style={{ borderBottomWidth: 0 }}>
                      <Text>{user.username}</Text>
                    </Body>
                    <Right style={{ borderBottomWidth: 0 }}>
                      {/*<Text note>Friend Request</Text>*/}
                      <Button
                        transparent
                        onPress={() =>
                          Toast.show({
                            supportedOrientations: ["portrait", "landscape"],
                            text: "Friend Request Sent",
                            position: "bottom",
                            buttonText: "Okay"
                          })}
                      >
                        <Text>Friend Request</Text>
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

// <Container style={{ flex: 1, paddingVertical: 20 }}>
//   <Content>
//     <Card>
//       <Body>
//         <Title>Users</Title>
//       </Body>
//       <View>
//         <List style={{ borderBottomWidth: 0 }}>
//           {this.state.userData.map((user, key) =>
//             <ListItem key={key} avatar style={{ borderBottomWidth: 0 }}>
//               <Left>
//                 <Thumbnail source={images[key].image} />
//               </Left>
//               <Body style={{ borderBottomWidth: 0 }}>
//                 <Text>{user.username}</Text>
//                 {/*<Text note>
//               Company: World Outreach Church
//             </Text>*/}
//               </Body>
//               <Right style={{ borderBottomWidth: 0 }}>
//                 {/*<Text note>Friend Request</Text>*/}
//                 <Button
//                   transparent
//                   onPress={() =>
//                     Toast.show({
//                       supportedOrientations: ["portrait", "landscape"],
//                       text: "Friend Request Sent",
//                       position: "bottom",
//                       buttonText: "Okay"
//                     })}
//                 >
//                   <Text>Friend Request</Text>
//                 </Button>
//               </Right>
//             </ListItem>
//           )}
//         </List>
//       </View>
//     </Card>
//   </Content>
// </Container>
