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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  cPassword = (password, username, navigation) => {
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
              <Input
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
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
