import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { DeviceContext } from "../context/DeviceProvider";

export default function ControlScreen() {
    const navigation = useNavigation();
    const { deviceStatus, setDeviceStatus } = useContext(DeviceContext);

    const toggleSwitch = (key) => {
        setDeviceStatus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔧 Gerätesteuerung</Text>

            <View style={styles.controlBox}>
                <View style={styles.card}>
                    <Icon name="lightbulb-outline" size={24} color={deviceStatus.isLightOn ? "#FFD700" : "#B0BEC5"} style={styles.icon} />
                    <Text style={styles.cardLabel}>Licht</Text>
                    <Switch value={deviceStatus.isLightOn} onValueChange={() => toggleSwitch("isLightOn")} />
                </View>

                <View style={styles.card}>
                    <Icon name="radiator" size={24} color={deviceStatus.isHeaterOn ? "#FF5722" : "#B0BEC5"} style={styles.icon} />
                    <Text style={styles.cardLabel}>Heizung</Text>
                    <Switch value={deviceStatus.isHeaterOn} onValueChange={() => toggleSwitch("isHeaterOn")} />
                </View>

                <View style={styles.card}>
                    <Icon name="air-conditioner" size={24} color={deviceStatus.isAirConditionerOn ? "#03A9F4" : "#B0BEC5"} style={styles.icon} />
                    <Text style={styles.cardLabel}>Klimaanlage</Text>
                    <Switch value={deviceStatus.isAirConditionerOn} onValueChange={() => toggleSwitch("isAirConditionerOn")} />
                </View>

                <View style={styles.card}>
                    <Icon name="television" size={24} color={deviceStatus.isTVOn ? "#8BC34A" : "#B0BEC5"} style={styles.icon} />
                    <Text style={styles.cardLabel}>Fernseher</Text>
                    <Switch value={deviceStatus.isTVOn} onValueChange={() => toggleSwitch("isTVOn")} />
                </View>

                <View style={styles.card}>
                    <Icon name="door" size={24} color={deviceStatus.isDoorLocked ? "#795548" : "#B0BEC5"} style={styles.icon} />
                    <Text style={styles.cardLabel}>Tür</Text>
                    <Switch value={deviceStatus.isDoorLocked} onValueChange={() => toggleSwitch("isDoorLocked")} />
                </View>
            </View>

            <TouchableOpacity
                style={styles.statusButton}
                onPress={() => navigation.navigate("Status")}
            >
                <Text style={styles.statusText}>📊 Gerätestatus anzeigen</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5A35B", // Ein sanfter Orangeton
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
