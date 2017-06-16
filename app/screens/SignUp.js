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
      password: "",
      cpassword: ""
    };
  }
  // syntax sugar if time permits
  // password.toString() === cpassword.toString() ? true : false;
  cPassword = (password, cpassword, navigation, username) => {
    if (
      password.toString() === cpassword.toString() &&
      password.toString() != ""
    ) {
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
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input />
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
            <Button large rounded>
              <Text>Signup</Text>
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
            <Button large rounded onPress={() => navigation.navigate("SignIn")}>
              <Text>SignIn</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

// <View style={{ paddingVertical: 20 }}>
//   <Card>
//     <FormLabel>Username</FormLabel>
//     <FormInput
//       placeholder="Username...."
//       onChangeText={username => this.setState({ username })}
//     />
//     <FormLabel>Password</FormLabel>
//     <FormInput
//       secureTextEntry
//       placeholder="Password..."
//       onChangeText={password => this.setState({ password })}
//     />
//     <FormLabel>Confirm Password</FormLabel>
//     <FormInput
//       secureTextEntry
//       placeholder="Confirm Password..."
//       onChangeText={cpassword => this.setState({ cpassword })}
//     />
//     {/*<UselessTextInputMultiline />*/}
//     <Button
//       buttonStyle={{ marginTop: 20 }}
//       backgroundColor="#03A9F4"
//       title="SIGN UP"
//       onPress={() => {
//         this.cPassword(
//           this.state.cpassword,
//           this.state.password,
//           navigation,
//           this.state.username
//         );
//       }}
//     />
//     <Button
//       buttonStyle={{ marginTop: 20 }}
//       backgroundColor="transparent"
//       textStyle={{ color: "#bcbec1" }}
//       title="Sign In"
//       onPress={() => navigation.navigate("SignIn")}
//     />
//   </Card>
// </View>
// TO DO
// 1. OnLoseFocus to validate password.cpassword

// <View>
//   <Tile
//     imageSrc={{ require: zoey }}
//     title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
//     featured
//     caption="Some Caption Text"
//   />
// </View>
