import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { DeviceContext } from "../context/DeviceProvider";
import colors from "../constants/colors";

const screenWidth = Dimensions.get("window").width;

export default function StatusScreen() {
    const { deviceStatus } = useContext(DeviceContext);

    const chartData = {
        labels: ["Licht", "Heizung", "Klima", "TV", "Tür"],
        datasets: [
            {
                data: [
                    deviceStatus.lightConsumption || 0,
                    deviceStatus.heaterTemperature || 0,
                    deviceStatus.airConditionerCoolingLevel || 0,
                    deviceStatus.tvVolume || 0,
                    deviceStatus.isDoorLocked ? 100 : 0,
                ],
            },
        ],
    };

    const statusItems = [
        {
            label: "Licht",
            value: deviceStatus.isLightOn ? "An" : "Aus",
            color: deviceStatus.isLightOn ? colors.orchid : "#EE7A2E",
        },
        {
            label: "Heizung",
            value: deviceStatus.isHeaterOn ? `${deviceStatus.heaterTemperature} °C` : "Aus",
            color: deviceStatus.isHeaterOn ? colors.orchid : "#EE7A2E",
        },
        {
            label: "Klimaanlage",
            value: deviceStatus.isAirConditionerOn ? `${deviceStatus.airConditionerCoolingLevel}%` : "Aus",
            color: deviceStatus.isAirConditionerOn ? colors.orchid : "#EE7A2E",
        },
        {
            label: "Fernseher",
            value: deviceStatus.isTVOn ? `Lautstärke: ${deviceStatus.tvVolume}%` : "Aus",
            color: deviceStatus.isTVOn ? colors.orchid : "#EE7A2E",
        },
        {
            label: "Tür",
            value: deviceStatus.isDoorLocked ? "Gesperrt" : "Offen",
            color: deviceStatus.isDoorLocked ? colors.orchid : "#EE7A2E",
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Gerätestatus</Text>
            <Text style={styles.infoText}>
                Überblick über den aktuellen Status und Verbrauch deiner Smart-Home-Geräte.
            </Text>

            <BarChart
                data={chartData}
                width={screenWidth - 40}
                height={240}
                yAxisSuffix=""
                fromZero
                chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(111, 66, 193, ${opacity})`,
                    labelColor: () => "#444",
                    style: { borderRadius: 16 },
                    propsForBackgroundLines: {
                        stroke: "#eee",
                        strokeDasharray: "",
                    },
                }}
                style={styles.chart}
                verticalLabelRotation={10}
                showValuesOnTopOfBars
            />

            <View style={styles.statusContainer}>
                {statusItems.map((item, idx) => (
                    <View key={idx} style={styles.statusCard}>
                        <Text style={styles.statusLabel}>{item.label}</Text>
                        <Text style={[styles.statusValue, { color: item.color }]}>
                            {item.value}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fefefe",
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.orchid,
        textAlign: "center",
        marginBottom: 8,
    },
    infoText: {
        fontSize: 15,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    chart: {
        borderRadius: 16,
        marginBottom: 25,
    },
    statusContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10,
    },
    statusCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        width: "48%",
        padding: 16,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    statusLabel: {
        fontSize: 15,
        fontWeight: "600",
        color: "#555",
        marginBottom: 6,
    },
    statusValue: {
        fontSize: 17,
        fontWeight: "bold",
    },
});
