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
  ScrollView,
  RefreshControl,
  Dimensions,
  Linking,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AnimatedPullToRefresh from "react-native-animated-pull-to-refresh";
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';

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
import PlaceholderImage from "../assets/placeholder.png";
import FacebookIcon from "../assets/icons/fb.png";
import ViberIcon from "../assets/icons/viber.png";
import WhatsappIcon from "../assets/icons/whatsapp.png";
import LinkedinIcon from "../assets/icons/linkedin.png";
import InstagramIcon from "../assets/icons/instagram.png";
import YoutubeIcon from "../assets/icons/yt.png";
import TikTokIcon from "../assets/icons/tiktok.png";
import METIGIF from '../assets/popup.gif';

const axios = require("axios").default;

const vw = Dimensions.get("window").width * 0.01;
const vh = Dimensions.get("window").height * 0.01;

//https://isum.metropolitan.ac.rs/rest/metapp/user/jovana.jovic

// //UBACUJE SACUVANE PODATKE U STATE
// getData = async () => {
//   try {
//     e = await AsyncStorage.getItem("email");
//     this.setState({ email: e });

//     console.log(this.state.email);
//   } catch (e) {
//     console.log(e);
//   }
// };

export default class Pocetna extends Component {
  constructor(props) {
    super(props);
    this.neprocitana1 = React.createRef();
    this.neprocitana2 = React.createRef();
    this.neprocitana3 = React.createRef();
    this.brojNeprocitanihPoruka = React.createRef();
  }

  state = {
    username: "",
    email: "",
    password: "",
    visibleModal: null,
    visiblePopup: null,
    refreshing: false,
    ime: "Ime", //Default vrednost
    prezime: "",
    poruka: "Poruka",
    brojMejlova: 0,
    brojMejlovaText: "Ucitavanje...",
    naslovEmail1: "naslovEmail",
    descEmail1: "descEmail",
    dateEmail1: "dateEmail",
    naslovEmail2: "naslovEmail",
    descEmail2: "descEmail",
    dateEmail2: "dateEmail",
    naslovEmail3: "naslovEmail",
    descEmail3: "descEmail",
    dateEmail3: "dateEmail",
    naslovObavestenje1: "naslovObavestenje",
    tekstObavestenje1: "tekstObavestenje",
    naslovObavestenje2: "naslovObavestenje",
    tekstObavestenje2: "tekstObavestenje",
    naslovObavestenje3: "naslovObavestenje",
    tekstObavestenje3: "tekstObavestenje",
    dateEvent1: "dateEvent",
    tekstEvent1: "tekstEvent",
    dateEvent2: "dateEvent",
    tekstEvent2: "tekstEvent",
    dateEvent3: "dateEvent",
    tekstEvent3: "tekstEvent",
    dateEvent4: "dateEvent",
    tekstEvent4: "tekstEvent",
    dateEvent5: "dateEvent",
    tekstEvent5: "tekstEvent",
    dateEvent6: "dateEvent",
    tekstEvent6: "tekstEvent",
    uri1: "../assets/placeholder.png",
    uri2: "../assets/placeholder.png",
    uri3: "../assets/placeholder.png",
    uri4: "../assets/placeholder.png",
    uri5: "../assets/placeholder.png",
    uri6: "../assets/placeholder.png",
    uriIg1: "../assets/placeholder.png",
    uriIg2: "../assets/placeholder.png",
    uriIg3: "../assets/placeholder.png",
    uriIg4: "../assets/placeholder.png",
  };

  async componentDidMount() {
    await this.getEmailAndPassword();
    await this.getUsername();
    this.getIme();
    this.getPoruka();
    this.getNeprocitanePoruke();
    this.getObavestanja();
    this.getDogadjaji();
    this.getInstagramSlike();
  }

  getEmailAndPassword = async () => {
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

  getUsername = async () => {
    try {
      e = await AsyncStorage.getItem("email");
      // console.log("Saved data: " + e);
      let username = "";
      if (e.includes("@")) {
        username = e.substring(0, e.indexOf("@"));
      } else {
        username = e;
      }

      //console.log("username: '" + username + "'");
      this.setState({ username: username.toLowerCase() });

      //  console.log(this.state.username);
    } catch (e) {
      console.log(e);
    }
  };

  getIme = () => {
    axios
      .get(
        "https://isum.metropolitan.ac.rs/rest/metapp/user/" +
        this.state.username
      )
      .then((response) => {
        //   console.log(response.data.body);
        this.setState({ ime: response.data.ime });
        //   console.log("ime= " + this.state.ime);
      });
  };

  getPoruka = () => {
    axios.get("http://89.216.56.107/getPoruka").then((response) => {
      this.setState({ poruka: response.data.parsedData.naslovList[0] });
    });
  };

  getNeprocitanePoruke = () => {
    const baseURL = "http://89.216.56.107/returnMessages"; // Viktor lokalni server
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
        //  console.log(response.data);
        let brojNeprocitanihMejlova = response.data.length;
        this.setState({ brojMejlova: brojNeprocitanihMejlova });

        // console.log(response.data.length);
        if (brojNeprocitanihMejlova == 0) {
          this.setState({ brojMejlovaText: "Nemate nepročitanih poruka" });
        } else if (brojNeprocitanihMejlova == 1) {
          this.setState({ brojMejlovaText: "1 Nepročitana poruka" });
        } else if (brojNeprocitanihMejlova == 2) {
          this.setState({ brojMejlovaText: "2 Nepročitane poruke" });
        } else if (brojNeprocitanihMejlova == 3) {
          this.setState({ brojMejlovaText: "3 Nepročitane poruke" });
        } else if (brojNeprocitanihMejlova > 3) {
          this.setState({
            brojMejlovaText: brojNeprocitanihMejlova + " Nepročitanih poruka",
          });
        }

        if (brojNeprocitanihMejlova > 0) {
          this.setState({ naslovEmail1: response.data[0].subject });
          this.setState({ descEmail1: response.data[0].from });
          this.setState({ dateEmail1: response.data[0].date });

          this.neprocitana1.current.setNativeProps({
            style: { display: "flex" },
          });
        }
        if (brojNeprocitanihMejlova > 1) {
          this.setState({ naslovEmail2: response.data[1].subject });
          this.setState({ descEmail2: response.data[1].from });
          this.setState({ dateEmail2: response.data[1].date });
          this.neprocitana2.current.setNativeProps({
            style: { display: "flex" },
          });
        }
        if (brojNeprocitanihMejlova > 2) {
          this.setState({ naslovEmail3: response.data[2].subject });
          this.setState({ descEmail3: response.data[2].from });
          this.setState({ dateEmail3: response.data[2].date });
          this.neprocitana3.current.setNativeProps({
            style: { display: "flex" },
          });
        }
      });
  };

  getObavestanja = () => {
    axios.get("http://89.216.56.107/getObavestenja").then((response) => {
      // console.log(response.data.parsedData);

      let naslovi = response.data.parsedData.naslovList;
      let tekstovi = response.data.parsedData.tekstList;

      this.setState({ naslovObavestenje1: naslovi[0] });
      this.setState({ naslovObavestenje2: naslovi[1] });
      this.setState({ naslovObavestenje3: naslovi[2] });

      this.setState({ tekstObavestenje1: tekstovi[0] });
      this.setState({ tekstObavestenje2: tekstovi[1] });
      this.setState({ tekstObavestenje3: tekstovi[2] });
    });
  };

  getDogadjaji = () => {
    axios.get("http://89.216.56.107/getDogadjaji").then((response) => {
      //console.log(response.data.parsedData);

      let naslovi = response.data.parsedData.naslovList;
      let datumi = response.data.parsedData.datumList;
      let slike = response.data.parsedData.fotkeList;

      this.setState({ tekstEvent1: naslovi[0] });
      this.setState({ tekstEvent2: naslovi[1] });
      this.setState({ tekstEvent3: naslovi[2] });
      this.setState({ tekstEvent4: naslovi[3] });
      this.setState({ tekstEvent5: naslovi[4] });
      this.setState({ tekstEvent6: naslovi[5] });

      this.setState({ dateEvent1: datumi[0] });
      this.setState({ dateEvent2: datumi[1] });
      this.setState({ dateEvent3: datumi[2] });
      this.setState({ dateEvent4: datumi[3] });
      this.setState({ dateEvent5: datumi[4] });
      this.setState({ dateEvent6: datumi[5] });

      this.setState({ uri1: slike[0] });
      this.setState({ uri2: slike[1] });
      this.setState({ uri3: slike[2] });
      this.setState({ uri4: slike[3] });
      this.setState({ uri5: slike[4] });
      this.setState({ uri6: slike[5] });
    });
  };

  getInstagramSlike = () => {
    axios.get("http://89.216.56.107/getIgSlike").then((response) => {
      //  console.log(response.data.parsedData);

      this.state.uriIg1 = response.data.parsedData.slikeList[0];
      this.state.uriIg2 = response.data.parsedData.slikeList[1];
      this.state.uriIg3 = response.data.parsedData.slikeList[2];
      this.state.uriIg4 = response.data.parsedData.slikeList[3];

      //  console.log(this.state.uriIg1);
    });
  };

  _renderOptionButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderPopup = () => (
    <View style={styles.bday}>
      <View style={styles.contentBD}>
        <TouchableOpacity style={{ position: 'absolute', padding: 5, top: 10, right: 10, zIndex: 50, elevation: 50, backgroundColor: '#c9093d', borderRadius: 100 }} onPress={() => { this.setState({ visiblePopup: null }) }}>
          <Image source={CloseIcon} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        <Image
          style={{ width: 300, height: 500 }}
          source={METIGIF} />
      </View>
    </View>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <StatusBar style="light" animated={true} backgroundColor="#c9093d" />
      <ImageBackground
        source={backgroundImage}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.topIconsContainer}>
          <View>
            <Image source={LogoIcon} style={styles.logoIcon} />
          </View>
          <View style={styles.menuButtons}>
            {/* -----------------------------------------------------------Podesavanja */}
            <TouchableOpacity
              onPress={({ navigation }) => {
                this.props.navigation.navigate("Podesavanja");
                this.setState({ visibleModal: null });
              }}
            >
              <Image source={SettingsIcon} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            {/* -----------------------------------------------------------Close */}
            <TouchableOpacity
              onPress={() => this.setState({ visibleModal: null })}
            >
              <Image
                source={CloseIcon}
                style={{ width: 40, height: 40, marginLeft: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.gridWrap}>
          {/* -----------------------------------------------------------ISUM */}
          <TouchableOpacity
            onPress={({ navigation }) => {
              this.props.navigation.navigate("Isum");
              this.setState({ visibleModal: null });
            }}
          >
            <View style={styles.button}>
              <Image source={ISUMIcon} style={styles.optionButtons} />
              <Text>ISUM</Text>
            </View>
          </TouchableOpacity>
          {/* -----------------------------------------------------------LAMS */}
          <TouchableOpacity
            onPress={({ navigation }) => {
              this.props.navigation.navigate("Lams");
              this.setState({ visibleModal: null });
            }}
          >
            <View style={styles.button}>
              <Image source={LAMSIcon} style={styles.optionButtons} />
              <Text>LAMS</Text>
            </View>
          </TouchableOpacity>
          {/* -----------------------------------------------------------ZIMBRA */}
          <TouchableOpacity
            onPress={({ navigation }) => {
              this.props.navigation.navigate("Zimbra");
              this.setState({ visibleModal: null });
            }}
          >
            <View style={styles.button}>
              <Image source={ZIMBRAIcon} style={styles.optionButtons} />
              <Text>ZIMBRA</Text>
            </View>
          </TouchableOpacity>
          {/* -----------------------------------------------------------Obavestenja */}
          <TouchableOpacity
            onPress={({ navigation }) => {
              this.props.navigation.navigate("Obavestenja");
              this.setState({ visibleModal: null });
            }}
          >
            <View style={styles.button}>
              <Image source={OBAVESTENJAIcon} style={styles.optionButtons} />
              <Text>OBAVEŠTENJA</Text>
            </View>
          </TouchableOpacity>
          {/* -----------------------------------------------------------Popusti */}
          <TouchableOpacity
            onPress={({ navigation }) => {
              this.props.navigation.navigate("Popusti");
              this.setState({ visibleModal: null });
            }}
          >
            <View style={styles.button}>
              <Image source={POPUSTIIcon} style={styles.optionButtons} />
              <Text>POPUSTI</Text>
            </View>
          </TouchableOpacity>
          {/* -----------------------------------------------------------Kontakt */}
          <TouchableOpacity
            onPress={({ navigation }) => {
              this.props.navigation.navigate("Kontakt");
              this.setState({ visibleModal: null });
            }}
          >
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

  _onRefresh() {
    this.setState({ refreshing: true });

    this.props.navigation.replace("Pocetna", null, null); //Refresh screen

    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Modal isVisible={this.state.visiblePopup === 1}>
          {this._renderPopup()}
        </Modal>

        <StatusBar style="light" animated={true} />

        <View style={{ width: "100%", height: "100%" }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >
            <ImageBackground source={StudentBg} style={styles.bgimage}>
              <View
                style={{
                  paddingTop: 50,
                  paddingBottom: 20,
                }}
              >
                <View style={styles.menuButtonsMainPage}>
                  <TouchableOpacity
                    onPress={({ navigation }) => {
                      // this.props.navigation.navigate("Podesavanja");
                      // this.setState({ visibleModal: null });
                      this.setState({ visiblePopup: 1 });
                    }}
                  >
                    <Image
                      source={SettingsIcon}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ visibleModal: 1 });
                    }}
                  >
                    <Image
                      source={MenuIcon}
                      style={{ width: 40, height: 45, marginLeft: 30 }}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{ color: "white", fontSize: 20, marginLeft: 20 }}>
                  DOBRO DOŠLI
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginLeft: 20,
                  }}
                >
                  {this.state.ime} {this.state.prezime}
                </Text>
              </View>

              <View style={styles.messageContainer}>
                <Text style={{ fontSize: 15 }}>{this.state.poruka}</Text>
              </View>
            </ImageBackground>

            <View style={styles.unreadMailContainer}>
              <Text
                style={styles.categoryTitle}
                ref={this.brojNeprocitanihPoruka}
              >
                {this.state.brojMejlovaText}
              </Text>
              <View style={styles.buttonMail} ref={this.neprocitana1}>
                <Text style={styles.unreadTitle}>
                  {this.state.naslovEmail1}
                </Text>
                <Text style={styles.unreadDesc}>{this.state.descEmail1}</Text>
                <Text style={styles.unreadDate}>{this.state.dateEmail1}</Text>
              </View>
              <View style={styles.buttonMail} ref={this.neprocitana2}>
                <Text style={styles.unreadTitle}>
                  {this.state.naslovEmail2}
                </Text>
                <Text style={styles.unreadDesc}>{this.state.descEmail2}</Text>
                <Text style={styles.unreadDate}>{this.state.dateEmail2}</Text>
              </View>
              <View style={styles.buttonMail} ref={this.neprocitana3}>
                <Text style={styles.unreadTitle}>
                  {this.state.naslovEmail3}
                </Text>
                <Text style={styles.unreadDesc}>{this.state.descEmail3}</Text>
                <Text style={styles.unreadDate}>{this.state.dateEmail3}</Text>
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  width: "90%",
                }}
              >
                <TouchableOpacity
                  style={styles.checkMailButton}
                  onPress={({ navigation }) => {
                    this.props.navigation.navigate("Zimbra");
                  }}
                >
                  <Text style={{ color: "white" }}>PROVERI POSTU</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.unreadMailContainer}>
              <Text style={styles.categoryTitle}>Nepročitana obaveštenja</Text>
              
              <View style={styles.buttonObavestenja}>
                <Text style={styles.unreadTitle}>
                  {this.state.naslovObavestenje1}
                </Text>
                <Text style={styles.unreadDesc}>
                  {this.state.tekstObavestenje1}
                </Text>
              </View>
              <View style={styles.buttonObavestenja}>
                <Text style={styles.unreadTitle}>
                  {this.state.naslovObavestenje2}
                </Text>
                <Text style={styles.unreadDesc}>
                  {this.state.tekstObavestenje2}
                </Text>
              </View>
              <View style={styles.buttonObavestenja}>
                <Text style={styles.unreadTitle}>
                  {this.state.naslovObavestenje3}
                </Text>
                <Text style={styles.unreadDesc}>
                  {this.state.tekstObavestenje3}
                </Text>
              </View>
            </View>

            <View style={styles.unreadMailContainer}>
              <Text style={styles.categoryTitle}>Događaji</Text>
              <ScrollView
                horizontal={true}
                style={styles.horizontalContentView}
              >
                <TouchableOpacity style={styles.eventContainer}>
                  <Image
                    source={{ uri: this.state.uri1 }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventDate}>{this.state.dateEvent1}</Text>
                  <Text style={styles.eventText}>{this.state.tekstEvent1}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eventContainer}>
                  <Image
                    source={{ uri: this.state.uri2 }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventDate}>{this.state.dateEvent2}</Text>
                  <Text style={styles.eventText}>{this.state.tekstEvent2}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eventContainer}>
                  <Image
                    source={{ uri: this.state.uri3 }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventDate}>{this.state.dateEvent3}</Text>
                  <Text style={styles.eventText}>{this.state.tekstEvent3}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eventContainer}>
                  <Image
                    source={{ uri: this.state.uri4 }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventDate}>{this.state.dateEvent4}</Text>
                  <Text style={styles.eventText}>{this.state.tekstEvent4}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eventContainer}>
                  <Image
                    source={{ uri: this.state.uri5 }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventDate}>{this.state.dateEvent5}</Text>
                  <Text style={styles.eventText}>{this.state.tekstEvent5}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eventContainer}>
                  <Image
                    source={{ uri: this.state.uri6 }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventDate}>{this.state.dateEvent6}</Text>
                  <Text style={styles.eventText}>{this.state.tekstEvent6}</Text>
                </TouchableOpacity>
              </ScrollView>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  width: "90%",
                }}
              >
                <TouchableOpacity style={styles.checkMailButton}>
                  <Text style={{ color: "white" }}>SVI DOGAĐAJI</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.socialContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ marginLeft: "5%", color: "#262626", fontSize: 17 }}
                >
                  Pratite nas
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "auto",
                    marginRight: "5%",
                  }}
                >
                  <TouchableOpacity onPress={() => {
                    Linking.openURL('https://www.facebook.com/UniverzitetMetropolitan/')
                  }}>
                    <Image source={FacebookIcon} style={styles.circularImage} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    Linking.openURL('https://www.instagram.com/univerzitet_metropolitan/')
                  }}>
                    <Image source={InstagramIcon} style={styles.circularImage} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    Linking.openURL('https://www.tiktok.com/@univerzitetmetropolitan')
                  }}>
                    <Image source={TikTokIcon} style={styles.circularImage} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    Linking.openURL('https://www.youtube.com/user/fitmetropolitan')
                  }}>
                    <Image source={YoutubeIcon} style={styles.circularImage} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    Linking.openURL('https://www.linkedin.com/school/univerzitet-metropolitan/')
                  }}>
                    <Image source={LinkedinIcon} style={styles.circularImage} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.gridWrapInstagram}>
                <TouchableOpacity onPress={() => {
                  Linking.openURL('https://www.instagram.com/univerzitet_metropolitan/')
                }}>
                  <Image
                    source={{ uri: this.state.uriIg1 }}
                    style={styles.igPhoto}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  Linking.openURL('https://www.instagram.com/univerzitet_metropolitan/')
                }}>
                  <Image
                    source={{ uri: this.state.uriIg2 }}
                    style={styles.igPhoto}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  Linking.openURL('https://www.instagram.com/univerzitet_metropolitan/')
                }}>
                  <Image
                    source={{ uri: this.state.uriIg3 }}
                    style={styles.igPhoto}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  Linking.openURL('https://www.instagram.com/univerzitet_metropolitan/')
                }}>
                  <Image
                    source={{ uri: this.state.uriIg4 }}
                    style={styles.igPhoto}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.metStudentsTextRed}>
                Powered by MET Studenti
              </Text>
            </View>
          </ScrollView>
        </View>

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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  horizontalContentView: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    marginRight: 0,
  },
  unreadMailContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  categoryTitle: {
    width: "90%",
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "bold",
  },
  eventContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 7,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    elevation: 5,

    width: 270,
  },
  eventImage: {
    width: 270,
    height: 151.88,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventText: {
    width: "90%",
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 10,
    marginTop: 0,
  },
  eventDate: {
    margin: 10,
    color: "#c9093d",
  },
  circularImage: {
    borderRadius: 400 / 2,
    width: 45,
    height: 45,
    marginStart: 4,
  },
  socialContainer: {
    paddingTop: 15,
  },
  buttonMail: {
    display: "none",
    backgroundColor: "white",
    flexDirection: "column",
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%",
    borderRadius: 10,
    marginTop: 7.5,
    marginBottom: 7.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    elevation: 5,
  },
  buttonObavestenja: {
    backgroundColor: "white",
    flexDirection: "column",
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%",
    borderRadius: 10,
    marginTop: 7.5,
    marginBottom: 7.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    elevation: 5,
  },
  messageContainer: {
    width: "90%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 20,
    paddingEnd: 20,
    backgroundColor: "white",
    marginBottom: 30,
    borderRadius: 10,
  },
  checkMailButton: {
    backgroundColor: "#c9093d",
    paddingTop: 12,
    paddingBottom: 12,
    paddingStart: 25,
    paddingEnd: 25,
    borderRadius: 400 / 2,
    marginTop: 10,
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
    paddingTop: 50,
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
  menuButtonsMainPage: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 20,
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
    marginTop: 40,
  },
  gridWrapInstagram: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  metStudentsText: {
    color: "white",
    width: "100%",
    textAlign: "center",
    marginTop: 30,
  },
  metStudentsTextRed: {
    color: "#c9093d",
    width: "100%",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 35,
    fontSize: 15,
  },
  bgimage: {
    alignItems: "center",
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
  },
  unreadTitle: {
    color: "#c9093d",
    fontWeight: "bold",
  },
  unreadDate: {
    color: "#c9093d",
  },
  igPhoto: {
    width: 160,
    height: 160,
    margin: 6,
    borderRadius: 7,
  },
  bday: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentBD: {
    backgroundColor: "white",
    width: "95%",
    height: "70%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60
  },
});
