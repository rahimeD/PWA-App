import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import axios from "axios";

export default function LoginScreen() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("123456");
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://192.168.0.18:3000/login", { username, password });
            if (res.data.success) {
                navigation.navigate("Main");
            } else {
                alert(res.data.message || "Login fehlgeschlagen");
            }
        } catch (error) {
            alert("Fehler bei der Anmeldung. Server nicht erreichbar.");
        }
    };

    const handleRegister = () => {
        navigation.navigate("Register");
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={require("../../assets/logo/logo.png")} style={styles.logo} />
                <Text style={styles.title}>Willkommen zurück!</Text>
                <Text style={styles.subtitle}>Bitte melde dich an</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Benutzername"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Passwort"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Einloggen</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerText}>Jetzt registrieren</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotButton}>
                    <Text style={styles.forgotText}>Passwort vergessen?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        justifyContent: "center",
        paddingHorizontal: 20, // Abstand links und rechts zum Bildschirm
    },
    card: {
        backgroundColor: colors.white,
        padding: 30,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.orchid,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: colors.steel,
        marginBottom: 25,
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: colors.steel,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: colors.white,
    },
    button: {
        backgroundColor: colors.orchid,
        padding: 15,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        marginTop: 5,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    registerButton: {
        marginTop: 15,
        width: "100%",
        alignItems: "center",
    },
    registerText: {
        color: colors.orchid,
        fontSize: 16,
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    forgotButton: {
        marginTop: 20,
    },
    forgotText: {
        fontSize: 14,
        color: colors.steel,
    },
});
