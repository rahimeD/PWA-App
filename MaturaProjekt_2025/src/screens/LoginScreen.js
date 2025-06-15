import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import axios from "axios";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    // const handleLogin = () => {
    //     if (username === "admin" && password === "123456") {
    //         navigation.replace("Main"); // WICHTIG: "replace" verhindert zurückgehen zum Login
    //     } else {
    //         alert("Falsche Anmeldeinformationen!");
    //     }
    // };
    // npm install axios


    const handleLogin = async () => {
        console.log("handleLogin wurde ausgelöst");  // Kontrollausgabe 192.168.0.18
        try {
            console.log("Super gemacht");
            const res = await axios.post("http://192.168.0.18:3000/login", {
                username,
                password
            });
            console.log("API Response:", res.data);

            if (res.data.success) {
                console.log("Login erfolgreich, navigiere zu Main");
                navigation.navigate("Main");
            } else {
                alert(res.data.message || "Login fehlgeschlagen");
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            alert("Fehler bei der Anmeldung. Server nicht erreichbar.");
        }
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.sand,
        padding: 20,
    },
    card: {
        width: Platform.OS === "web" ? 400 : "85%",
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
        alignItems: "center",
    },
    logo: {
        width: 80,
        height: 80,
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
        marginBottom: 20,
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
        padding: 12,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    forgotButton: {
        marginTop: 15,
    },
    forgotText: {
        fontSize: 14,
        color: colors.steel,
    },
});
