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
  Button,
  Right,
  Icon
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
      .get(`https://a85a0d38.ngrok.io/api/notes/${Global.USERNAME}`)
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
    axios.post("https://a85a0d38.ngrok.io/api/notes", {
      Username: Global.USERNAME,
      note: this.state.note
    });
    this.clearText();
  };

  removeFromDb = removeNote => {
    console.log(removeNote);
    var newArray = [];
    this.state.userNotes.map((note, key) => {
      if (note.dbid !== removeNote.dbid) {
        newArray.push(note);
      }
    });
    this.setState({ userNotes: newArray });

    axios.delete(`https://a85a0d38.ngrok.io/api/notes/${removeNote.dbid}`);
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

            </View>
          </Card>
          {this.state.userNotes.map((note, key) =>
            <Card key={note.dbid}>
              <CardItem>
                <Text>
                  {note.note}
                </Text>
                <Right>
                  <Button
                    transparent
                    danger
                    iconLeft
                    onPress={() => this.removeFromDb(note)}
                  >
                    <Icon name="trash" />
                  </Button>
                </Right>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}
