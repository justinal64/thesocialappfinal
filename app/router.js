import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Notes from "./screens/Notes";
import Users from "./screens/Users";

export const SignedOut = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  }
});

export const SignedIn = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="home" size={30} color={tintColor} />
      }
    },
    Users: {
      screen: Users,
      navigationOptions: {
        tabBarLabel: "Users",
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="users" size={30} color={tintColor} />
      }
    },
    Notes: {
      screen: Notes,
      navigationOptions: {
        tabBarLabel: "Notes",
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="sticky-note-o" size={30} color={tintColor} />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="user" size={30} color={tintColor} />
      }
    }
  }
  // {
  //   lazy: true
  // }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
