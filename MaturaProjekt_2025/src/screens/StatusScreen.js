import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { DeviceContext } from "../context/DeviceProvider";
import colors from "../constants/colors";

export default function StatusScreen() {
    const { deviceStatus } = useContext(DeviceContext);

    const data = {
        labels: ["Licht", "Heizung", "Klimaanlage", "Fernseher", "Tür"],
        datasets: [
            {
                data: [
                    deviceStatus.isLightOn ? 100 : 0,
                    deviceStatus.isHeaterOn ? 100 : 0,
                    deviceStatus.isAirConditionerOn ? 100 : 0,
                    deviceStatus.isTVOn ? 100 : 0,
                    deviceStatus.isDoorLocked ? 100 : 0,
                ],
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📊 Gerätestatus</Text>
            <BarChart
                data={data}
                width={350}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "#FFE4C4",
                    backgroundGradientTo: "#FFE4C4",
                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                    barPercentage: 0.7,
                }}
                style={styles.chart}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5A35B", // Leichter Orangeton (fix whitespace issue)
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.orchid,
        marginBottom: 20,
    },
    chart: {
        marginVertical: 10,
    },
});
