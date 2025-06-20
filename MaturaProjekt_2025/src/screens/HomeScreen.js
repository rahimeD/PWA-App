import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { DeviceContext } from "../context/DeviceProvider";
import colors from "../constants/colors";

export default function HomeScreen() {
    const navigation = useNavigation();
    const { deviceStatus } = useContext(DeviceContext);

    const lightStatus = deviceStatus.isLightOn ? "1 an" : "0 an";
    const doorStatus = deviceStatus.isDoorLocked ? "Gesperrt" : "Offen";
    const airStatus = deviceStatus.isAirConditionerOn ? "An" : "Aus";
    const currentConsumption = deviceStatus.currentConsumption ?? 1.25;

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View style={styles.logoContainer}>
                    <Image source={require("../../assets/logo/logo.svg")} style={styles.logo} />
                </View>
                <TouchableOpacity onPress={() => navigation.replace("Login")} style={styles.logoutButton}>
                    <Icon name="logout" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Willkommen bei Savergy</Text>
                <Text style={styles.subtitle}>Deine Smart Home Steuerung</Text>

                <View style={styles.statusSection}>
                    <View style={styles.statusCard}>
                        <Icon name="lightbulb-outline" size={32} color="#FFD700" />
                        <Text style={styles.statusText}>Lichter: {lightStatus}</Text>
                    </View>
                    <View style={styles.statusCard}>
                        <Icon name="door" size={32} color={colors.steel} />
                        <Text style={styles.statusText}>Türen: {doorStatus}</Text>
                    </View>
                    <View style={styles.statusCard}>
                        <Icon name="air-conditioner" size={32} color={colors.orchid} />
                        <Text style={styles.statusText}>Klima: {airStatus}</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>Gerätesteuerung</Text>
                        <Text style={styles.cardDescription}>
                            Steuere alle deine Smart-Home-Geräte zentral über diese Oberfläche.
                        </Text>
                        <TouchableOpacity
                            style={[styles.navButton, { backgroundColor: colors.primary }]}
                            onPress={() => navigation.navigate("Control")}
                        >
                            <Icon name="remote" size={20} color="#fff" />
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>Energiespartipps</Text>
                        <Text style={styles.cardDescription}>
                            Tipps zur Optimierung deines Energieverbrauchs im Haushalt.
                        </Text>
                        <TouchableOpacity
                            style={[styles.navButton, { backgroundColor: colors.primary }]}
                            onPress={() => navigation.navigate("Tipps")}
                        >
                            <Icon name="lightbulb-on-outline" size={20} color="#fff" />
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>Energie-Prognose</Text>
                        <Text style={styles.cardDescription}>
                            Geplante Geräte + Verbrauchsvorhersage
                        </Text>
                        <TouchableOpacity
                            style={[styles.navButton, { backgroundColor: colors.primary }]}
                            onPress={() => navigation.navigate("Prognose")}
                        >
                            <Icon name="chart-line" size={20} color="#fff" />
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>Erinnerungen</Text>
                        <Text style={styles.cardDescription}>
                            Plane Erinnerungen zum Ein-/Ausschalten deiner Geräte.
                        </Text>
                        <TouchableOpacity
                            style={[styles.navButton, { backgroundColor: colors.primary }]}
                            onPress={() => navigation.navigate("Erinnerungen")}
                        >
                            <Icon name="alarm" size={20} color="#fff" />
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        paddingTop: 20,
    },
    topBar: {
        position: "relative",
        height: 105,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    logoContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    logoutButton: {
        position: "absolute",
        right: 20,
        top: 40,
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
        zIndex: 1,
    },
    content: {
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 5,
        width: "100%",
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.orchid,
        textAlign: "center",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: colors.steel,
        textAlign: "center",
        marginBottom: 30,
    },
    statusSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 40,
    },
    statusCard: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: "30%",
    },
    statusText: {
        marginTop: 10,
        fontSize: 11,
        color: colors.steel,
        textAlign: "center",
    },
    cardsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingBottom: 20,
    },
    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 150,
        width: Platform.OS === "web" ? "48%" : "48%",
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.orchid,
        marginBottom: 8,
        textAlign: "center",
    },
    cardDescription: {
        fontSize: 12,
        color: colors.steel,
        textAlign: "center",
        marginBottom: 10,
    },
    consumptionText: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.orchid,
        textAlign: "center",
    },
    navButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 10,
        paddingHorizontal: 20,
        width: "80%",
    },
    buttonText: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 14,
        fontWeight: "bold",
    },
});
