import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [language, setLanguage] = useState("de");
    const [theme, setTheme] = useState("light");
    const [controlMode, setControlMode] = useState("manual");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Einstellungen</Text>
            <Text style={styles.subtitle}>
                Passe dein Smart Home an deine individuellen Bedürfnisse an.
            </Text>

            <View style={styles.card}>
                <Text style={styles.optionTitle}>Benachrichtigungen</Text>
                <Text style={styles.optionDescription}>
                    Aktiviere oder deaktiviere Benachrichtigungen, um immer auf dem neuesten
                    Stand zu bleiben.
                </Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    style={styles.switch}
                />
                <Text>
                    Notifications:{" "}
                    <Text style={{ color: "#EE7A2E" }}>
                        {notificationsEnabled ? "Ein" : "Aus"}
                    </Text>
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.optionTitle}>Sprache</Text>
                <Text style={styles.optionDescription}>
                    Wähle die bevorzugte Sprache für dein Smart Home.
                </Text>
                <Picker
                    selectedValue={language}
                    onValueChange={(itemValue) => setLanguage(itemValue)}
                    style={styles.picker}
                    mode="dropdown" // wichtig für Android
                >
                    <Picker.Item label="Deutsch" value="de" />
                    <Picker.Item label="Englisch" value="en" />
                </Picker>
                <Text>Sprache: {language}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.optionTitle}>Darstellungsart 🔧</Text>
                <Text style={styles.optionDescription}>
                    Wähle zwischen hellem oder dunklem Design.
                </Text>
                <Picker
                    selectedValue={theme}
                    onValueChange={(itemValue) => setTheme(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label="Hell" value="light" />
                    <Picker.Item label="Dunkel" value="dark" />
                </Picker>
                <Text>Theme: {theme}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.optionTitle}>Steuerungsmodus</Text>
                <Text style={styles.optionDescription}>
                    Entscheide, ob dein Smart Home manuell oder automatisch gesteuert wird.
                </Text>
                <Picker
                    selectedValue={controlMode}
                    onValueChange={(itemValue) => setControlMode(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label="Manuell" value="manual" />
                    <Picker.Item label="Automatisch" value="automatic" />
                </Picker>
                <Text>Steuerung: {controlMode}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#ECEFF1",
        justifyContent: "flex-start",
        alignItems: "stretch",
        flexGrow: 1, // damit ScrollView den gesamten Bereich nutzt
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1565C0",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#607D8B",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        width: "90%",
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 15,
        alignSelf: "center", // damit cards zentriert bleiben
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#263238",
        marginBottom: 8,
    },
    optionDescription: {
        fontSize: 14,
        color: "#607D8B",
        marginBottom: 15,
        textAlign: "left",
    },
    switch: {
        alignSelf: "flex-start",
    },
    picker: {
        height: 50,
        width: "100%",
        backgroundColor: "#F5F5F5",
        borderRadius: 6,
    },
});
