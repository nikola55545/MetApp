import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import React, { Component, useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import Modal from "react-native-modal";

import StudentBg from "../assets/studentbg.png";
import backgroundImage from "../assets/bg-login.jpg";
import LogoIcon from "../assets/icons/menu/logo.png";
import MenuIcon from "../assets/icons/menu/menu.png";
import BackIcon from "../assets/icons/menu/back.png";
import SettingsIcon from "../assets/icons/menu/settings.png";
import CloseIcon from "../assets/icons/menu/close.png";

import ISUMIcon from "../assets/icons/isum.png";
import LAMSIcon from "../assets/icons/lams.png";
import ZIMBRAIcon from "../assets/icons/zimbra.png";
import OBAVESTENJAIcon from "../assets/icons/obavestenja.png";
import POPUSTIIcon from "../assets/icons/popusti.png";
import KONTAKTIcon from "../assets/icons/kontakt.png";

export default class Pocetna extends Component {
  state = {
    visibleModal: null,
  };

  teraj = ({ navigation }) => {
    this.props.navigation.navigate("OAplikaciji");
    this.setState({ visibleModal: null });
  };

  _renderOptionButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <StatusBar style="light" />
      <ImageBackground
        source={backgroundImage}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.topIconsContainer}>
          <View>
            <Image source={LogoIcon} style={styles.logoIcon} />
          </View>
          <View style={styles.menuButtons}>
            <TouchableOpacity>
              <Image source={SettingsIcon} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ visibleModal: null })}
            >
              <Image
                source={CloseIcon}
                style={{ width: 40, height: 40, marginLeft: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.gridWrap}>
          <TouchableOpacity onPress={this.teraj}>
            <View style={styles.button}>
              <Image source={ISUMIcon} style={styles.optionButtons} />
              <Text>ISUM</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.teraj}>
            <View style={styles.button}>
              <Image source={LAMSIcon} style={styles.optionButtons} />
              <Text>LAMS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.teraj}>
            <View style={styles.button}>
              <Image source={ZIMBRAIcon} style={styles.optionButtons} />
              <Text>ZIMBRA</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.teraj}>
            <View style={styles.button}>
              <Image source={OBAVESTENJAIcon} style={styles.optionButtons} />
              <Text>OBAVEŠTENJA</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.teraj}>
            <View style={styles.button}>
              <Image source={POPUSTIIcon} style={styles.optionButtons} />
              <Text>POPUSTI</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.teraj}>
            <View style={styles.button}>
              <Image source={KONTAKTIcon} style={styles.optionButtons} />
              <Text>KONTAKT</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.metStudentsText}>Powered by MET Studenti</Text>
      </ImageBackground>
    </View>
  );
  //-----------------------------------------------------------------------
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar style="auto" />
        <Text>Pozdrav sa Pocetna.js!</Text>

        {this._renderOptionButton("Meni", () =>
          this.setState({ visibleModal: 1 })
        )}
        <Modal
          isVisible={this.state.visibleModal === 1}
          animationIn={"slideInRight"}
          animationOut={"slideOutRight"}
          style={styles.bottomModal}
        >
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  modalContent: {
    backgroundColor: "#c9093d",
    padding: 0,
    width: "100%",
    height: "100%",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    flexDirection: "column",
  },
  bottomModal: {
    justifyContent: "center",
    margin: 0,
  },
  topIconsContainer: {
    flexDirection: "row",
    marginTop: 70,
    marginBottom: 20,
  },
  logoIcon: {
    width: 200,
    resizeMode: "contain",
    flex: 1,
    marginLeft: 20,
  },
  menuButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
    flex: 1,
  },
  optionButtons: {
    resizeMode: "contain",
    width: 75,
    height: 75,
  },
  gridWrap: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
  },
  metStudentsText: {
    color: "white",
    width: "100%",
    textAlign: "center",
    marginTop: 30,
  },
});
