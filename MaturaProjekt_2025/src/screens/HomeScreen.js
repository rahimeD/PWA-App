import React, { useContext } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DeviceContext } from "../context/DeviceProvider";
import colors from "../constants/colors";

// SVG Imports
import BrightnessIcon from "../../assets/icons/brightness.svg";
import DoorClosedIcon from "../../assets/icons/door-closed.svg";
import ClimateIcon from "../../assets/icons/climate.svg";
import DeviceSettingsIcon from "../../assets/icons/settings-sliders.svg";
import BulbSpeechIcon from "../../assets/icons/bulb-speech-bubble.svg";
import PrognosIcon from "../../assets/icons/prognose.svg";
import LogoutIcon from "../../assets/icons/leave_.svg";
import AlarmClockIcon from "../../assets/icons/alarm-clock.svg";

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
                    <Image
                        source={require("../../assets/logo/PrimäresLogo.webp")}
                        style={styles.logo}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.replace("Login")}
                    style={styles.logoutButton}
                >
                    <LogoutIcon width={24} height={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Willkommen bei Savergy</Text>
                <Text style={styles.subtitle}>Deine Smart Home Steuerung</Text>

                <View style={styles.statusSection}>
                    <View style={styles.statusCard}>
                        <BrightnessIcon width={32} height={32} />
                        <Text style={styles.statusText}>Lichter: {lightStatus}</Text>
                    </View>
                    <View style={styles.statusCard}>
                        <DoorClosedIcon width={32} height={32} />
                        <Text style={styles.statusText}>Türen: {doorStatus}</Text>
                    </View>
                    <View style={styles.statusCard}>
                        <ClimateIcon width={32} height={32} />
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
                            <DeviceSettingsIcon width={20} height={20} />
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
                            <BulbSpeechIcon width={20} height={20} />
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
                            <PrognosIcon width={20} height={20} />
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
                            <AlarmClockIcon width={20} height={20} />
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
        paddingTop: Platform.OS === "ios" ? 40 : 20, // weniger Abstand oben
    },
    topBar: {
        position: "relative",
        height: 80, // reduziert von 105
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
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
        width: 160, // reduziert von 200
        height: 160, // reduziert von 200
        resizeMode: "contain",
    },
    logoutButton: {
        position: "absolute",
        right: 20,
        top: 20, // reduziert von 40
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
