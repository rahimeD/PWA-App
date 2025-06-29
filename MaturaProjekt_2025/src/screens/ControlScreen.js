import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { DeviceContext } from "../context/DeviceProvider";

// 🔁 SVG-Icons statt react-native-vector-icons
import LightbulbOnIcon from "../../assets/icons/lightbulb-on.svg";
import HeatIcon from "../../assets/icons/heat.svg";
import ClimateIcon from "../../assets/icons/climate.svg";
import TvRetroIcon from "../../assets/icons/tv-retro.svg";
import DoorOpenIcon from "../../assets/icons/door-open.svg";

export default function ControlScreen() {
    const navigation = useNavigation();
    const { deviceStatus, setDeviceStatus } = useContext(DeviceContext);

    const toggleSwitch = (key) => {
        setDeviceStatus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerätesteuerung</Text>

            <View style={styles.controlBox}>
                <View style={styles.card}>
                    <LightbulbOnIcon width={24} height={24} style={styles.icon} />
                    <Text style={styles.cardLabel}>Licht</Text>
                    <Switch value={deviceStatus.isLightOn} onValueChange={() => toggleSwitch("isLightOn")} />
                </View>

                <View style={styles.card}>
                    <HeatIcon width={24} height={24} style={styles.icon} />
                    <Text style={styles.cardLabel}>Heizung</Text>
                    <Switch value={deviceStatus.isHeaterOn} onValueChange={() => toggleSwitch("isHeaterOn")} />
                </View>

                <View style={styles.card}>
                    <ClimateIcon width={24} height={24} style={styles.icon} />
                    <Text style={styles.cardLabel}>Klimaanlage</Text>
                    <Switch value={deviceStatus.isAirConditionerOn} onValueChange={() => toggleSwitch("isAirConditionerOn")} />
                </View>

                <View style={styles.card}>
                    <TvRetroIcon width={24} height={24} style={styles.icon} />
                    <Text style={styles.cardLabel}>Fernseher</Text>
                    <Switch value={deviceStatus.isTVOn} onValueChange={() => toggleSwitch("isTVOn")} />
                </View>

                <View style={styles.card}>
                    <DoorOpenIcon width={24} height={24} style={styles.icon} />
                    <Text style={styles.cardLabel}>Tür</Text>
                    <Switch value={deviceStatus.isDoorLocked} onValueChange={() => toggleSwitch("isDoorLocked")} />
                </View>
            </View>

            <TouchableOpacity
                style={styles.statusButton}
                onPress={() => navigation.navigate("Status")}
            >
                <Text style={styles.statusText}>Gerätestatus anzeigen</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.sand,
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 30,
        color: colors.orchid,
        textAlign: "center",
    },
    controlBox: {
        width: "90%",
        maxWidth: 400,
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        marginBottom: 15,
        backgroundColor: "#F9F9F9",
        borderRadius: 10,
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.steel,
        flex: 1,
        textAlign: "center",
    },
    icon: {
        marginRight: 10,
    },
    statusButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: colors.orchid,
        borderRadius: 8,
        alignItems: "center",
    },
    statusText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
});
