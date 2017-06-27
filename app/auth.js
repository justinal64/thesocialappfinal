import { AsyncStorage } from "react-native";
import axios from "axios";
import Global from "./components/Global";
export let USER_KEY = "auth-demo-key";
export let USERNAME = Global.USERNAME;

export const auth = (email, password) => {
  console.log("email = ", email);
  console.log("password = ", password);
};

export const registerUser = (user, navigation) => {
  axios
    .post("http://localhost:5000/api/account", {
      Username: user.Username,
      Password: user.Password
    })
    .then(function(response) {
      console.log(response);
      AsyncStorage.setItem(USER_KEY, "true");
      Global.USERNAME = user.Username;
      Global.DBID = response.data.dbid;
      onSignIn().then(() => navigation.navigate("SignedIn"));
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(false); // set to true to autologin user
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
