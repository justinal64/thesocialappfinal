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
  View,
  Input,
  Button,
  Right,
  Icon
} from "native-base";
import axios from "axios";
import Global from "../components/Global";
import PageTitle from "../components/PageTitle";

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

  removeFromDb = removeNote => {
    var newArray = [];
    this.state.userNotes.map((note, key) => {
      if (note.dbid !== removeNote.dbid) {
        newArray.push(note);
      }
    });
    this.setState({ userNotes: newArray });

    axios.delete(`http://localhost:5000/api/notes/${removeNote.dbid}`);
  };

  render() {
    if (this.state.userData === null) return null;
    return (
      <Container>
        <PageTitle title="Notes" />
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
