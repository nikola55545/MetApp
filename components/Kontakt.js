import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Dimensions,
    Image,
    Linking
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import FacebookIcon from '../assets/icons/fb.png';
import ViberIcon from '../assets/icons/viber.png';
import WhatsappIcon from '../assets/icons/whatsapp.png';
import LinkedinIcon from '../assets/icons/linkedin.png';
import InstagramIcon from '../assets/icons/instagram.png';
import TikTokIcon from "../assets/icons/tiktok.png";

var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;

export default class Kontakt extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
                <StatusBar style="light" />
                <View style={styles.topIcons}>
                    <TouchableOpacity><Image source={WhatsappIcon} style={styles.icon} /></TouchableOpacity>
                    <TouchableOpacity><Image source={ViberIcon} style={styles.icon} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.facebook.com/UniverzitetMetropolitan/')}}><Image source={FacebookIcon} style={styles.icon} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.tiktok.com/@univerzitetmetropolitan')}}><Image source={TikTokIcon} style={styles.icon} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/univerzitet_metropolitan/')}}><Image source={InstagramIcon} style={styles.icon} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.linkedin.com/school/univerzitet-metropolitan/')}}><Image source={LinkedinIcon} style={styles.icon} /></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button}>
                    <View>
                        <Text>Tehnička pitanja</Text>
                        <Text style={{ color: '#c9093d', marginTop: 5 }}>helpdesk@metropolitan.ac.rs</Text>
                        <Text style={{ color: '#c9093d', marginTop: 5 }}>+381 11 328 25 06</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <View>
                        <Text>Univerzitet Metropolitan u Beogradu</Text>
                        <Text style={{ color: '#c9093d', marginTop: 5 }}>studentska.sluzba@metropolitan.ac.rs</Text>
                        <Text style={{ color: '#c9093d', marginTop: 5 }}>+381 (11) 20 30 885</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <View>
                        <Text>Univerzitet Metropolitan u Nišu</Text>
                        <Text style={{ color: '#c9093d', marginTop: 5 }}>studentskasluzba.nis@metropolitan.ac.rs</Text>
                        <Text style={{ color: '#c9093d', marginTop: 5 }}>+381 (18) 551 000</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    topIcons: {
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 20
    },
    icon: {
        borderRadius: 400 / 2,
        width: 55,
        height: 55,
        marginLeft: 2,
        marginRight: 2,
    },
    button: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        width: '90%',
        borderRadius: 10,
        marginTop: 7.5,
        marginBottom: 7.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        elevation: 5,
    },
});
