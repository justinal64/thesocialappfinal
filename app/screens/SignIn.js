import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  View
} from "native-base";
import { onSignIn, auth, registerUser } from "../auth";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  // syntax sugar if time permits
  // password.toString() === cpassword.toString() ? true : false;
  cPassword = (password, username, navigation) => {
    console.log(password);
    if (password.toString() != "") {
      var user = {
        Username: username,
        Password: password
      };
      registerUser(user, navigation);
    } else return false;
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={username => this.setState({ username })} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={password => this.setState({ password })} />
            </Item>
          </Form>
          <View
            style={{
              flex: 1,
              paddingTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              large
              rounded
              onPress={() => {
                this.cPassword(
                  this.state.password,
                  this.state.username,
                  navigation
                );
              }}
            >
              <Text>Sign In</Text>
            </Button>
          </View>
          <View
            style={{
              flex: 1,
              paddingTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button large rounded onPress={() => navigation.navigate("SignUp")}>
              <Text>Sign up</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
// <View style={{ paddingVertical: 20 }}>
//   <Card>
//     <FormLabel>Email</FormLabel>
//     <FormInput placeholder="Email address..." />
//     <FormLabel>Password</FormLabel>
//     <FormInput secureTextEntry placeholder="Password..." />

//     <Button
//       buttonStyle={{ marginTop: 20 }}
//       backgroundColor="#03A9F4"
//       title="SIGN IN"
//       onPress={() => {
//         onSignIn().then(() => navigation.navigate("SignedIn"));
//       }}
//     />
//   </Card>
// </View>;

// <View>
//   <Tile
//     imageSrc={{ require: zoey }}
//     title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
//     featured
//     caption="Some Caption Text"
//   />
// </View>
