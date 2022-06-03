import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { Component, useEffect, useState } from "react";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import backgroundImage from "../assets/bglogin.png";
import user from "../assets/login-icons/ic_username.png";
import password from "../assets/login-icons/ic_password.png";
import banner from "../assets/banner.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const axios = require("axios").default;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      shouldShow: false,
    };
  }

  updateValue(text, field) {
    if (field == "email") {
      this.setState({ email: text });
    } else if (field == "password") {
      this.setState({ password: text });
    }
  }

  componentDidMount() {
    this.autoLogin();
  }

  //Viktor kod
  login = () => {
    // DEV MODE:
    //this.props.navigation.replace("Pocetna");
    // SERVER MODE
    const baseURL = "http://89.216.56.107/auth";
    axios
      .post(
        baseURL,
        { email: this.state.email, password: this.state.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //console.log(response.data);
        if (response.data.success) {
          this.storeData(this.state.email, this.state.password);
          this.props.navigation.navigate("Pocetna");
        } else {
          alert(response.data.message);
        }
      });
  };

  storeData = async (email, password) => {
    try {
      await AsyncStorage.setItem("email", this.state.email);
      await AsyncStorage.setItem("password", this.state.password);
    } catch (e) {
      console.log(e);
    }
  };

  //UBACUJE SACUVANE PODATKE U STATE
  getData = async () => {
    try {
      e = await AsyncStorage.getItem("email");
      p = await AsyncStorage.getItem("password");
      this.setState({ email: e });
      this.setState({ password: p });

      // console.log(this.state.email);
    } catch (e) {
      console.log(e);
    }
  };

  // POZVATI OVU FUNKCIJU JEDNOM KAD SE POKRENE APP
  autoLogin = async () => {
    await this.getData();
    // console.log("E '" + this.state.email + "'");
    // console.log("P '" + this.state.password + "'");

    if (this.state.email != "" && this.state.password != "") {
      console.log("tried");
      this.login();
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="light" />
        <ImageBackground source={backgroundImage} style={styles.bgimage}>
          <View style={styles.loginForm}>
            <Text style={styles.heading}>DOBRO DOŠLI</Text>

            <View style={styles.section}>
              <Image source={user} style={styles.inputImage} />
              <TextInput
                style={styles.textInput}
                placeholder="Korisničko ime"
                numberOfLines={1}
                underlineColorAndroid={"transparent"}
                placeholderTextColor="white"
                value={this.state.email}
                onChangeText={(text) => this.updateValue(text, "email")}
              />
            </View>
            <View style={styles.section}>
              <Image source={password} style={styles.inputImage} />
              <TextInput
                style={styles.textInput}
                placeholder="Lozinka"
                underlineColorAndroid={"transparent"}
                placeholderTextColor="white"
                secureTextEntry
                value={this.state.password}
                onChangeText={(text) => this.updateValue(text, "password")}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={this.login}>
              <Text style={{ color: "#c9093d" }}>PRIJAVITE SE</Text>
            </TouchableOpacity>
            {this.state.shouldShow && (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.autoLogin}
              >
                <Text style={{ color: "#c9093d" }}>AUTO LOGIN</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bgimage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  loginForm: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    marginTop: 200,
  },
  section: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    color: "white",
    borderColor: "white",
    height: 50,
    width: "80%",
    borderRadius: 5,
    margin: 10,
  },
  inputImage: {
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
    resizeMode: "stretch",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: "white",
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "white",
    borderRadius: 100,
    paddingTop: 18,
    paddingBottom: 18,
    paddingStart: 90,
    paddingEnd: 90,
    marginTop: 30,
  },
  banner: {
    position: "absolute",
    top: 0,
  },
});
