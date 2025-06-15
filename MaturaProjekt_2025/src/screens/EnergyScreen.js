import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import colors from "../constants/colors";

export default function EnergyScreen() {
    const energieData = [
        { label: "Strom", value: 320, unit: "kWh", color: colors.primary },
        { label: "Wasser", value: 45, unit: "m³", color: colors.orchid },
        { label: "Gas", value: 120, unit: "m³", color: colors.steel },
    ];

    const maxValue = Math.max(...energieData.map((e) => e.value));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Energieverbrauch</Text>
            {energieData.map(({ label, value, unit, color }) => (
                <View key={label} style={styles.energieRow}>
                    <Text style={styles.label}>{label}</Text>
                    <View style={styles.barBackground}>
                        <View
                            style={[
                                styles.barFill,
                                { backgroundColor: color, width: `${(value / maxValue) * 100}%` },
                            ]}
                        />
                    </View>
                    <Text style={styles.value}>
                        {value} {unit}
                    </Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.sand,
        padding: 20,
        borderRadius: 12,
        marginVertical: 10,
        width: Platform.OS === "web" ? "50%" : "100%",
        alignSelf: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.orchid,
        marginBottom: 20,
        textAlign: "center",
    },
    energieRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: colors.steel,
        fontWeight: "600",
    },
    barBackground: {
        flex: 4,
        height: 20,
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        overflow: "hidden",
        marginHorizontal: 10,
    },
    barFill: {
        height: "100%",
        borderRadius: 10,
    },
    value: {
        width: 70,
        fontSize: 14,
        color: colors.steel,
        fontWeight: "600",
        textAlign: "right",
    },
});
