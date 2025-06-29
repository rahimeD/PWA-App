import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
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

                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerText}>Jetzt registrieren</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotButton}>
                    <Text style={styles.forgotText}>Passwort vergessen?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const windowWidth = Dimensions.get("window").width;
const cardSize = Math.min(windowWidth * 0.85, 400); // max 400px Breite & Höhe

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.sand,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: cardSize,
        height: cardSize,
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: "contain",
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.orchid,
    },
    subtitle: {
        fontSize: 14,
        color: colors.steel,
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: colors.steel,
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: colors.white,
    },
    button: {
        backgroundColor: colors.orchid,
        padding: 12,
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
        marginTop: 10,
    },
    registerText: {
        fontSize: 14,
        color: colors.orchid,
        textDecorationLine: "underline",
        fontWeight: "600",
    },
    forgotButton: {
        marginTop: 10,
    },
    forgotText: {
        fontSize: 13,
        color: colors.steel,
    },
});
