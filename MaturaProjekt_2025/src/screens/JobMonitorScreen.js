import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../constants/colors";

export default function JobMonitorScreen() {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setScreenWidth(window.width);
        });
        return () => subscription?.remove();
    }, []);

    const chartData = useMemo(() => ({
        labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        datasets: [
            {
                data: [5.2, 4.8, 6.1, 5.5, 6.3, 7.0, 5.9],
                strokeWidth: 2,
            },
        ],
    }), []);

    const deviceData = [
        { label: "Heizung", value: 32 },
        { label: "Waschmaschine", value: 21 },
        { label: "Kühlschrank", value: 17 },
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.header}>Stromverbrauch</Text>

            <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Verbrauch diese Woche</Text>
                <Text style={styles.averageText}>
                    Dein täglicher Stromverbrauch liegt bei <Text style={styles.highlight}>ø 5.8 kWh</Text>.
                </Text>

                <Text style={styles.breakdown}>
                    Anteilsmäßig entfällt der größte Verbrauch auf{" "}
                    {deviceData.map((item, index) => (
                        <Text key={index}>
                            {index > 0 && ", "}
                            {item.label} ({item.value} %)
                        </Text>
                    ))}.
                </Text>

                <Text style={styles.tip}>
                    Tipp: Achte auf Geräte mit Dauerbetrieb – sie sind oft versteckte Stromfresser.
                </Text>
            </View>

            <Text style={styles.subheader}>Täglicher Verlauf</Text>
            <LineChart
                data={chartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                    backgroundColor: colors.white,
                    backgroundGradientFrom: colors.white,
                    backgroundGradientTo: colors.white,
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(238, 122, 46, ${opacity})`,
                    labelColor: () => colors.steel,
                    propsForDots: {
                        r: "4",
                        strokeWidth: "1.5",
                        stroke: "#EE7A2E",
                    },
                    propsForBackgroundLines: {
                        strokeDasharray: "", // Solid lines
                    },
                }}
                style={styles.chart}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
        backgroundColor: colors.sand,
        flexGrow: 1,
        alignItems: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 12,
        color: colors.primary,
        alignSelf: "flex-start",
    },
    subheader: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 12,
        color: colors.orchid,
        alignSelf: "flex-start",
    },
    infoBox: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
        color: colors.primary,
    },
    averageText: {
        fontSize: 14,
        marginBottom: 8,
        color: colors.steel,
    },
    highlight: {
        fontWeight: "700",
        color: colors.orchid,
    },
    breakdown: {
        fontSize: 13,
        color: colors.steel,
        marginBottom: 12,
        lineHeight: 18,
    },
    tip: {
        fontSize: 13,
        color: colors.primary,
        fontStyle: "italic",
    },
    chart: {
        borderRadius: 16,
        marginBottom: 20,
    },
});
