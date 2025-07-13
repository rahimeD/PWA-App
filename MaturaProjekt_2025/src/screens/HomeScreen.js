import React, { useContext } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DeviceContext } from "../context/DeviceProvider";
import colors from "../constants/colors";

import BrightnessIcon from "../../assets/icons/brightness.svg";
import DoorClosedIcon from "../../assets/icons/door-closed.svg";
import ClimateIcon from "../../assets/icons/climate.svg";
import DeviceSettingsIcon from "../../assets/icons/settings-sliders.svg";
import BulbSpeechIcon from "../../assets/icons/bulb-speech-bubble.svg";
import PrognosIcon from "../../assets/icons/prognose.svg";
import LogoutIcon from "../../assets/icons/leave_.svg";
import AlarmClockIcon from "../../assets/icons/alarm-clock.svg";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
    const navigation = useNavigation();
    const { deviceStatus } = useContext(DeviceContext);

    const lightStatus = deviceStatus.isLightOn ? "1 an" : "0 an";
    const doorStatus = deviceStatus.isDoorLocked ? "Gesperrt" : "Offen";
    const airStatus = deviceStatus.isAirConditionerOn ? "An" : "Aus";
    const currentConsumption = deviceStatus.currentConsumption ?? 1.25;

    const notifications = [
        "Waschmaschine in 15 Minuten ausräumen",
        "Kaffeemaschine in 45 Minuten einschalten",
    ];

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../../assets/logo/PrimäresLogo.webp")}
                        style={styles.logo}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.replace("Login")}
                    style={styles.logoutButton}
                    activeOpacity={0.8}
                >
                    <LogoutIcon width={24} height={24} />
                </TouchableOpacity>
            </View>

            {notifications.length > 0 && (
                <View style={styles.notificationsContainer}>
                    {notifications.map((note, index) => (
                        <View key={index} style={styles.notificationBar}>
                            <AlarmClockIcon width={22} height={22} style={{ marginRight: 12 }} />
                            <Text style={styles.notificationText}>{note}</Text>
                        </View>
                    ))}
                </View>
            )}

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Willkommen bei Savergy</Text>
                    <Text style={styles.subtitle}>Deine Smart Home Steuerung</Text>

                    <View style={styles.statusSection}>
                        <View style={styles.statusCard}>
                            <BrightnessIcon width={36} height={36} />
                            <Text style={styles.statusText}>Lichter: {lightStatus}</Text>
                        </View>
                        <View style={styles.statusCard}>
                            <DoorClosedIcon width={36} height={36} />
                            <Text style={styles.statusText}>Türen: {doorStatus}</Text>
                        </View>
                        <View style={styles.statusCard}>
                            <ClimateIcon width={36} height={36} />
                            <Text style={styles.statusText}>Klima: {airStatus}</Text>
                        </View>
                    </View>

                    <View style={styles.cardsContainer}>
                        <View style={styles.infoCard}>
                            <Text style={styles.cardTitle}>Gerätesteuerung</Text>
                            <Text style={styles.cardDescription}>
                                Steuere alle deine Smart-Home-Geräte zentral über diese Oberfläche.
                            </Text>
                            <TouchableOpacity
                                style={[styles.navButton, { backgroundColor: colors.primary }]}
                                onPress={() => navigation.navigate("Control")}
                                activeOpacity={0.8}
                            >
                                <DeviceSettingsIcon width={22} height={22} />
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
                                activeOpacity={0.8}
                            >
                                <PrognosIcon width={22} height={22} />
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
                                activeOpacity={0.8}
                            >
                                <AlarmClockIcon width={22} height={22} />
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
                                activeOpacity={0.8}
                            >
                                <BulbSpeechIcon width={22} height={22} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        paddingTop: Platform.OS === "ios" ? 50 : 30,
    },
    topBar: {
        height: 90,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        position: "relative",
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
        width: 140,
        height: 140,
        resizeMode: "contain",
    },
    logoutButton: {
        position: "absolute",
        right: 20,
        top: 25,
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 6,
    },
    notificationsContainer: {
        marginHorizontal: 20,
        marginBottom: 15,
    },
    notificationBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.orchid,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 7,
        elevation: 6,
    },
    notificationText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        flexShrink: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    content: {
        alignItems: "center",
        paddingHorizontal: 24,
        width: "100%",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.orchid,
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#6c757d",
        textAlign: "center",
        marginBottom: 35,
    },
    statusSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 45,
    },
    statusCard: {
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 18,
        paddingHorizontal: 12,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 6,
        width: "30%",
        minHeight: 110,
    },
    statusText: {
        marginTop: 14,
        fontSize: 13,
        color: "#495057",
        textAlign: "center",
        fontWeight: "600",
    },
    infoCard: {
        width: "45%",         // kleiner als 50% für Abstand
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,     // mehr vertikaler Abstand
        marginRight: "4%",    // horizontaler Abstand zwischen Cards
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation: 4,
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 180,
        flexDirection: "column",
    },
    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start", // nicht space-between, um marginRight wirken zu lassen
        width: "100%",
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.orchid,
        marginBottom: 12,
        textAlign: "center",
    },
    cardDescription: {
        fontSize: 13,
        color: "#6c757d",
        textAlign: "center",
        marginBottom: 18,
        lineHeight: 19,
    },
    navButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 14,
        paddingHorizontal: 28,
        width: "80%",
        shadowColor: "#6f42c1",
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 12,
        elevation: 8,
    },
    navButtonText: {
        color: "#fff",
        marginLeft: 12,
        fontSize: 16,
        fontWeight: "700",
    },
});
