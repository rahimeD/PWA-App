import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { DeviceContext } from "../context/DeviceProvider";
import colors from "../constants/colors";

const screenWidth = Dimensions.get("window").width;

export default function StatusScreen() {
    const { deviceStatus } = useContext(DeviceContext);

    const data = {
        labels: ["Licht", "Heizung", "Klimaanlage", "Fernseher", "Tür"],
        datasets: [
            {
                data: [
                    deviceStatus.lightConsumption || 0,           // Verbrauch in Watt
                    deviceStatus.heaterTemperature || 0,          // Temperatur in °C
                    deviceStatus.airConditionerCoolingLevel || 0, // Kühlstufe 0-100%
                    deviceStatus.tvVolume || 0,                    // Lautstärke 0-100%
                    deviceStatus.isDoorLocked ? 100 : 0,           // Tür zu (100%) oder offen (0%)
                ],
            },
        ],
    };

    const statusTexts = [
        deviceStatus.isLightOn ? "An" : <Text style={styles.orangeText}>Aus</Text>,
        deviceStatus.isHeaterOn ? `${deviceStatus.heaterTemperature} °C` : <Text style={styles.orangeText}>Aus</Text>,
        deviceStatus.isAirConditionerOn ? `${deviceStatus.airConditionerCoolingLevel}%` : <Text style={styles.orangeText}>Aus</Text>,
        deviceStatus.isTVOn ? `Laut ${deviceStatus.tvVolume}%` : <Text style={styles.orangeText}>Aus</Text>,
        deviceStatus.isDoorLocked ? <Text style={styles.orangeText}>Gesperrt</Text> : "Offen",
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerätestatus</Text>
            <Text style={styles.infoText}>
                Hier siehst du den aktuellen Status und Verbrauch deiner Smart-Home-Geräte.
            </Text>

            <BarChart
                data={data}
                width={screenWidth - 40}
                height={260}
                yAxisSuffix={""}
                chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(111, 66, 193, ${opacity})`, // lila
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: "#e3e3e3",
                        strokeDasharray: "0",
                    },
                }}
                verticalLabelRotation={15}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
            />

            <View style={styles.statusRow}>
                {statusTexts.map((text, index) => (
                    <Text key={index} style={styles.statusText}>
                        {text}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        padding: 20,
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.orchid,
        marginBottom: 10,
        textAlign: "center",
    },
    infoText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    chart: {
        borderRadius: 16,
    },
    statusRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    statusText: {
        fontSize: 14,
        color: "#333",
        width: (screenWidth - 40) / 5,
        textAlign: "center",
        fontWeight: "600",
    },
    orangeText: {
        color: "#EE7A2E",
        fontWeight: "600",
    },
});
