import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, StatusBar, Text, View, StyleSheet, Button } from "react-native";
import Modal from "react-native-modal";
import { postData } from "../../utils/api";

const version = "vb.0.1";

export const Init = () => {
    const navigation = useNavigation();
    const [checkingModal, setCheckingModal] = React.useState(false);
    const [checkingTitle, setCheckingTitle] = React.useState("");
    const [checkingNotification, setCheckingNotification] = React.useState("");

    const serverChecking = async () => {
        try {
            const data = await postData("version", {});
            if (data) {
                console.log(data.data);
                if (data.data !== version) {
                    newNotification("Update available", "Please update the app to the latest version");
                } else {
                    navigation.replace("home");
                }
            }
        } catch (error) {
            newNotification("Server problem", "Server is down, please try again later");
        }
    };

    serverChecking();

    const newNotification = (title: string, notification: string) => {
        setCheckingTitle(title);
        setCheckingNotification(notification);
        setCheckingModal(true);
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" />
            <View style={styles.body}>
                <Modal isVisible={checkingModal} onBackdropPress={() => setCheckingModal(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{checkingTitle}</Text>
                        <Text>{checkingNotification}</Text>
                        <Button title="Try again" onPress={() => setCheckingModal(false)} />
                    </View>
                </Modal>
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center"
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    }
});