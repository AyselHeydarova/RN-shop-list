import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, StatusBar} from "react-native";
import {COLORS} from "../styles/colors";
import ProfileImg from "../assets/profile.png"
import {DrawerContentScrollView,DrawerItem } from "@react-navigation/drawer";


export const CustomDrawer = (props) => {
    console.log(props);

    return (
        <View {...props} style={styles.container}>
            <StatusBar/>
            <View style={styles.heading}>
                <Image source={ProfileImg} style={styles.avatar}/>
                <Text>Username</Text>
                <Text>Surname</Text>

            </View>
            <DrawerContentScrollView style={styles.list} >
               <TouchableOpacity style={styles.listItem} >
                   <Text style={styles.text}>Add new List</Text>
               </TouchableOpacity>
            </DrawerContentScrollView>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    heading: {
        flexDirection: "row"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
},
    list: {
        backgroundColor: COLORS.red
    },

    listItem: {
        width: 250,
        height: 35,
        backgroundColor: 'white'
    },

    text: {
        color: COLORS.red
    }


});

