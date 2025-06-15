import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
} from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";

export default function JobMonitorScreen() {
    const [jobs, setJobs] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

    const possibleDevices = [
        { id: "1", name: "Waschmaschine", icon: "washing-machine" },
        { id: "2", name: "Geschirrspüler", icon: "dishwasher" },
        { id: "3", name: "Heizung", icon: "radiator" },
        { id: "4", name: "Klimaanlage", icon: "air-conditioner" },
        { id: "5", name: "Fernseher", icon: "television" },
        { id: "6", name: "Licht", icon: "lightbulb-outline" },
    ];

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setScreenWidth(window.width);
        });
        // 192.168.0.18
        axios
            .get("http://192.168.0.18:3000/jobs")
            .then((res) => {
                setJobs(res.data);
                setChartData({
                    labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
                    datasets: [
                        {
                            data: [30, 35, 32, 40, 45, 38, 36],
                            strokeWidth: 2,
                        },
                    ],
                });
            })
            .catch((err) => console.error(err));

        return () => subscription?.remove();
    }, []);

    const isLargeScreen = screenWidth > 800;
    const iconSize = isLargeScreen ? 40 : 60; // icon-Größe (kann angepasst werden)

    const renderJob = ({ item }) => (
        <View style={[styles.jobCard, { width: isLargeScreen ? "48%" : "100%" }]}>
            <Text style={styles.jobTitle}>{item.device_name}</Text>
            <Text>Start: {item.start_time}</Text>
            <Text>Verbrauch: {item.consumption_kwh} kWh</Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FlatList
                data={jobs}
                renderItem={renderJob}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                numColumns={isLargeScreen ? 2 : 1}
                columnWrapperStyle={isLargeScreen && { justifyContent: "space-between" }}
                style={{ width: "100%" }}
                ListEmptyComponent={<Text style={styles.noJobs}>Keine Jobs verfügbar</Text>}
            />

            <Text style={styles.header}>Mögliche Geräte</Text>

            <View style={styles.deviceGrid}>
                {possibleDevices.map((device) => (
                    <View
                        key={device.id}
                        style={[
                            styles.deviceCard,
                            {
                                width: iconSize,
                                height: iconSize,
                                padding: 0,
                                marginBottom: 12,
                            },
                        ]}
                    >
                        <Icon
                            name={device.icon}
                            size={iconSize}
                            color={colors.primary}
                        />
                    </View>
                ))}
            </View>

            {chartData && (
                <>
                    <Text style={styles.header}>📈 Strompreis-Prognose (€/kWh)</Text>
                    <LineChart
                        data={chartData}
                        width={screenWidth - 32}
                        height={220}
                        chartConfig={{
                            backgroundColor: colors.white,
                            backgroundGradientFrom: colors.white,
                            backgroundGradientTo: colors.white,
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(238, 122, 46, ${opacity})`,
                            labelColor: () => colors.steel,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "#EE7A2E",
                            },
                        }}
                        style={{
                            borderRadius: 16,
                            marginBottom: 20,
                        }}
                    />
                </>
            )}
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
        marginVertical: 18,
        color: colors.primary,
        alignSelf: "flex-start",
    },
    jobCard: {
        backgroundColor: colors.white,
        padding: 16,
        marginBottom: 14,
        borderRadius: 14,
        elevation: 3,
        shadowColor: colors.obsidian,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    jobTitle: {
        fontWeight: "700",
        fontSize: 18,
        marginBottom: 6,
        color: colors.steel,
    },
    noJobs: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 16,
        color: colors.steel,
    },
    deviceGrid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start", // Icons am Anfang ausrichten
        gap: 12, // moderner Abstand, wird aber nicht von allen RN-Versionen unterstützt
        marginBottom: 24,
    },
    deviceCard: {
        backgroundColor: colors.background,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.obsidian,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
});
