import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

import HouseChimneyIcon from "../../assets/icons/house-chimney.svg";
import RemoteControlIcon from "../../assets/icons/remote-control.svg";
import PrognoseIcon from "../../assets/icons/prognose.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SvgIcon({ IconComponent, color, size }) {
    return <IconComponent width={size} height={size} fill={color} />;
}

function MainTabs() {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false, // Labels unter Icons ausblenden
                    tabBarIcon: ({ color, size }) => {
                        switch (route.name) {
                            case "Home":
                                return <SvgIcon IconComponent={HouseChimneyIcon} color={color} size={size} />;
                            case "Gerätesteuerung":
                                return <SvgIcon IconComponent={RemoteControlIcon} color={color} size={size} />;
                            case "Status":
                                return <SvgIcon IconComponent={PrognoseIcon} color={color} size={size} />;
                            case "Einstellungen":
                                return <SvgIcon IconComponent={SettingsIcon} color={color} size={size} />;
                            default:
                                return null;
                        }
                    },
                    tabBarActiveTintColor: "#F57C00",
                    tabBarInactiveTintColor: "black",
                    headerShown: false,
                    tabBarStyle: {
                        height: Platform.OS === "web" ? 75 : 65,
                        paddingBottom: Platform.OS === "ios" ? 20 : 10,
                        paddingTop: 10,
                        borderTopWidth: 1,
                        backgroundColor: "#fff",
                        position: "relative",
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Gerätesteuerung" component={ControlScreen} />
                <Tab.Screen name="Status" component={StatusScreen} />
                <Tab.Screen name="Einstellungen" component={SettingsScreen} />
            </Tab.Navigator>

            {/* Floating ChatBox Overlay */}
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
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Main"
                            component={MainTabs}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="Control"
                            component={ControlScreen}
                            options={{
                                title: "Gerätesteuerung",
                                headerStyle: { backgroundColor: "#FFFFFF" },
                                headerTitleStyle: { fontWeight: "bold", color: "#000" },
                                headerTintColor: "#000",
                            }}
                        />

                        <Stack.Screen
                            name="Status"
                            component={StatusScreen}
                            options={{
                                title: "Gerätestatus",
                                headerStyle: { backgroundColor: "#FFFFFF" },
                                headerTitleStyle: { fontWeight: "bold", color: "#000" },
                                headerTintColor: "#000",
                            }}
                        />
                        <Stack.Screen
                            name="Tipps"
                            component={TipsScreen}
                            options={{
                                title: "Energiespartipps",
                                headerStyle: { backgroundColor: "#FFFFFF" },
                                headerTitleStyle: { fontWeight: "bold", color: "#000" },
                                headerTintColor: "#000",
                            }}
                        />
                        <Stack.Screen
                            name="Prognose"
                            component={JobMonitorScreen}
                            options={{
                                title: "Energie-Prognose",
                                headerStyle: { backgroundColor: "#FFFFFF" },
                                headerTitleStyle: { fontWeight: "bold", color: "#000" },
                                headerTintColor: "#000",
                            }}
                        />
                        <Stack.Screen
                            name="Erinnerungen"
                            component={ReminderScreen}
                            options={{
                                title: "Erinnerungen",
                                headerStyle: { backgroundColor: "#FFFFFF" },
                                headerTitleStyle: { fontWeight: "bold", color: "#000" },
                                headerTintColor: "#000",
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </DeviceProvider>
    );
}

const styles = StyleSheet.create({
    chatBoxPosition: {
        position: "absolute",
        bottom: Platform.OS === "web" ? 80 : 30,
        right: Platform.OS === "web" ? 10 : 70,
        zIndex: 999,
        transform: [{ scale: Platform.OS === "web" ? 1 : 0.65 }],
        alignItems: "center",
    },
});
