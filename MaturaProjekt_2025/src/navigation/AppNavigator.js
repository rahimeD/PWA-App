import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ControlScreen from "../screens/ControlScreen";
import StatusScreen from "../screens/StatusScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DeviceProvider from "../context/DeviceProvider";
import ChatBox from "../screens/ChatBox";
import JobMonitorScreen from "../screens/JobMonitorScreen";
import TipsScreen from "../screens/TipsScreen";
import ReminderScreen from "../screens/ReminderScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => {
                        let iconName;

                        switch (route.name) {
                            case "Home":
                                iconName = "home-outline";
                                break;
                            case "Control":
                                iconName = "remote";
                                break;
                            case "Status":
                                iconName = "chart-bar";
                                break;
                            case "Einstellungen":
                                iconName = "cog-outline";
                                break;
                            default:
                                iconName = "circle";
                        }

                        return (
                            <Icon
                                name={iconName}
                                size={Platform.OS === "web" ? 30 : 24}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: "#F57C00",
                    tabBarInactiveTintColor: "gray",
                    headerShown: false,
                    tabBarStyle: {
                        height: Platform.OS === "web" ? 90 : 65,
                        paddingBottom: Platform.OS === "ios" ? 20 : 10,
                        paddingTop: 10,
                        borderTopWidth: 1,
                        backgroundColor: "#fff",
                        position: "relative",
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Control" component={ControlScreen} />
                <Tab.Screen name="Status" component={StatusScreen} />
                <Tab.Screen name="Einstellungen" component={SettingsScreen} />
            </Tab.Navigator>

            {/* Floating ChatBox sauber platziert */}
            <View style={styles.chatBoxPosition}>
                <ChatBox />
            </View>
        </View>
    );
}

export default function AppNavigator() {
    return (
        <DeviceProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                        <Stack.Screen name="Tipps" component={TipsScreen} options={{ headerShown: true, title: "Energiespartipps" }} />
                        <Stack.Screen name="Prognose" component={JobMonitorScreen} options={{ headerShown: true, title: "Energie-Prognose" }} />
                        <Stack.Screen name="Erinnerungen" component={ReminderScreen} options={{ title: "Erinnerungen" }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </DeviceProvider>
    );
}

const styles = StyleSheet.create({
    chatBoxPosition: {
        position: "absolute",
        bottom: Platform.OS === "web" ? 800 : 25,
        right: Platform.OS === "web" ? 30 : 12,
        zIndex: 999,
        transform: [{ scale: Platform.OS === "web" ? 1 : 0.65 }],
    },
});
