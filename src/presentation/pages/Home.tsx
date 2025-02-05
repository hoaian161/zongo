import React from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, StatusBar, Text, View, StyleSheet, Pressable, Image, ScrollView, Button } from "react-native";
import Modal from "react-native-modal";
import { postData } from "../../utils/api";


export const HomeScreen = () => {
    const navigation = useNavigation();

    const navItem = (imgSrc: any, title: string, desc: string, navigator: any, props: object) => {
        return (
            <Pressable style={{ flexDirection: "row" }} onPress={() => navigation.navigate(navigator, props)}>
                <Image style={styles.practiceIcon} source={typeof imgSrc === "string" ? { uri: imgSrc } : imgSrc} />
                <View style={{ justifyContent: "center" }}>
                    <Text style={styles.cardHeader}>{title}</Text>
                    <Text style={styles.cardText}>{desc}</Text>
                </View>
                <Image style={styles.joinIcon} source={require("../../../assets/icons/angle-small-right.png")} />
            </Pressable>
        );
    };

    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" />
            <View style={styles.body}>
                <View style={styles.user}>
                    <Image style={styles.avatar} source={require("../../../assets/icon.png")} />
                    <View style={styles.userNav}>
                        <Text style={styles.username}>@username</Text>
                        <View style={styles.streak}>
                            <Text style={styles.streakTitle}>Best streaks: 3</Text>
                            <Image style={styles.streakIcon} source={require("../../../assets/icons/fire.png")} />
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.cards}>
                    <View style={styles.card}>
                        {
                            navItem(
                                require("../../../assets/icons/hira.png"),
                                "Hiragana",
                                "Practice with hiragana characters",
                                "practice",
                                { type: "hiragana" }
                            )
                        }
                        <View style={{ height: 20 }}></View>
                        {
                            navItem(
                                require("../../../assets/icons/kata.png"),
                                "Katakana",
                                "Practice with katakana characters",
                                "practice",
                                { type: "katakana" }
                            )
                        }
                    </View>
                    <View style={styles.card}>
                        {
                            navItem(
                                require("../../../assets/icons/shuffle.png"),
                                "Advanced",
                                "Advanced practice with random questions",
                                "practice",
                                { type: "advanced" }
                            )
                        }
                    </View>
                    <Text style={styles.cardSpliter}>General</Text>
                    <View style={styles.card}>
                        {
                            navItem(
                                require("../../../assets/icons/target.png"),
                                "Achievements",
                                "Your achievements and progress",
                                "practice",
                                {}
                            )
                        }
                        <View style={{ height: 20 }}></View>
                        {
                            navItem(
                                require("../../../assets/icons/star.png"),
                                "Get premium",
                                "Upgrade to premium for more features",
                                "practice",
                                {}
                            )
                        }
                        <View style={{ height: 20 }}></View>
                        {
                            navItem(
                                require("../../../assets/icons/map.png"),
                                "About us",
                                "Learn more about the product team",
                                "practice",
                                {}
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    body: {
        height: "110%",
        // backgroundColor: "rgb(248, 250, 253)",
        backgroundColor: "rgba(0, 52, 200, 1)",
    },
    cards: {
        padding: 16,
        backgroundColor: "rgb(248, 250, 253)",
        borderRadius: 20,
    },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 15,
        marginBottom: 10,
    },
    cardIcon: {
        width: 40,
        height: 40
    },
    user: {
        backgroundColor: "rgba(0, 52, 200, 1)",
        padding: 16,
        flexDirection: "row",
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
    },
    userNav: {
        paddingVertical: 5,
    },
    username: {
        color: "white",
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 5,
    },
    streak: {
        flexDirection: "row",
    },
    streakTitle: {
        color: "white",
        fontSize: 16,
    },
    streakIcon: {
        width: 15,
        height: 15,
        marginLeft: 5,
    },
    practiceIcon: {
        marginRight: 15,
        width: 35,
        height: 35,
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: "400",
    },
    cardText: {
        color: "grey"
    },
    joinIcon: {
        width: 30,
        height: 30,
        position: "absolute",
        right: 0,
        top: 10,
    },
    cardSpliter: {
        color: "black",
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    }
});