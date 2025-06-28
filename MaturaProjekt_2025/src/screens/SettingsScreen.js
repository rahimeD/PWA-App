import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
// import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [language, setLanguage] = useState("de");
    const [theme, setTheme] = useState("light"); // Hell oder Dunkel
    const [controlMode, setControlMode] = useState("manual"); // Manuell oder Automatisch

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Einstellungen</Text>
            <Text style={styles.subtitle}>Passe dein Smart Home an deine individuellen Bedürfnisse an.</Text>

            <View style={styles.card}>
                <Text style={styles.optionTitle}>Benachrichtigungen</Text>
                <Text style={styles.optionDescription}>
                    Aktiviere oder deaktiviere Benachrichtigungen, um immer auf dem neuesten Stand zu bleiben.
                </Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    style={styles.switch}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.optionTitle}>Sprache</Text>
                <Text style={styles.optionDescription}>
                    Wähle die bevorzugte Sprache für dein Smart Home.
                </Text>
                <Picker
                    selectedValue={language}
                    style={styles.picker}
                    onValueChange={(itemValue) => setLanguage(itemValue)}
                >
                    <Picker.Item label="Deutsch" value="de" />
                    <Picker.Item label="Englisch" value="en" />
                </Picker>
            </View>

            <View style={styles.card}>
                <Text style={styles.optionTitle}>Darstellungsart 🔧</Text>
                <Text style={styles.optionDescription}>
                    Wähle zwischen hellem oder dunklem Design.
                </Text>
                <Picker
                    selectedValue={theme}
                    style={styles.picker}
                    onValueChange={(itemValue) => setTheme(itemValue)}
                >
                    <Picker.Item label="Hell" value="light" />
                    <Picker.Item label="Dunkel" value="dark" />
                </Picker>
            </View>

            <View style={styles.card}>
                <Text style={styles.optionTitle}>Steuerungsmodus</Text>
                <Text style={styles.optionDescription}>
                    Entscheide, ob dein Smart Home manuell oder automatisch gesteuert wird.
                </Text>
                <Picker
                    selectedValue={controlMode}
                    style={styles.picker}
                    onValueChange={(itemValue) => setControlMode(itemValue)}
                >
                    <Picker.Item label="Manuell" value="manual" />
                    <Picker.Item label="Automatisch" value="automatic" />
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ECEFF1",
        justifyContent: "flex-start",
        alignItems: "center",
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
        paddingLeft: 10,
    },
});
