import React, { Component } from "react";
import { TextInput, ScrollView } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Header,
  Title,
  View,
  Input,
  Button
} from "native-base";
import axios from "axios";
import Global from "../components/Global";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNotes: [],
      note: "",
      active: true
    };
  }
  componentDidMount() {
    this.fetchAllData();
  }

  componentWillReceiveProps() {}

  fetchAllData = () => {
    axios
      .get(`http://localhost:5000/api/notes/${Global.USERNAME}`)
      .then(res => {
        this.setState({ userNotes: res.data });
      });
  };

  clearText = () => {
    this._textInput.setNativeProps({ text: "" });
  };

  submitToDb = () => {
    console.log(this.state.note);
    var newArray = this.state.userNotes;
    var newNote = {
      note: this.state.note,
      dbid: Math.random(),
      username: Global.USERNAME
    };

    newArray.unshift(newNote);
    this.setState({ userNotes: newArray });
    axios.post("http://localhost:5000/api/notes", {
      Username: Global.USERNAME,
      note: this.state.note
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
      <Container>
        <Header>
          <Body>
            <Title>Notes</Title>
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
                placeholder="Add A Note..."
                onChangeText={note => this.setState({ note })}
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
          {this.state.userNotes.map((note, key) =>
            <Card key={note.dbid}>
              <CardItem>
                <Text>
                  {note.note}
                </Text>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}
