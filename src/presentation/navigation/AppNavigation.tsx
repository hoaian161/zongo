import React from "react"
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Init } from "../pages/Init"
import { HomeScreen } from "../pages/Home"
import { PracticeScreen } from "../pages/Practice";

const Stack = createStackNavigator();

export const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: styles.header,
                headerTintColor: "white",
                headerShadowVisible: false
            }}>
                <Stack.Screen name="init" component={Init} options={{ title: "Zongo" }} />
                <Stack.Screen name="home" component={HomeScreen} options={{ title: "Zongo" }} />
                <Stack.Screen name="practice" component={PracticeScreen} options={{ title: "Practice" }} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "rgba(0, 52, 200, 1)",
        height: 80
    }
});