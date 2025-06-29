import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    Alert,
    Dimensions,
    Platform,
    Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const colors = {
    primary: "#EE7A2E",
    obsidian: "#0E1015",
    orchid: "#454697",
    sand: "#F4F2ED",
    steel: "#1D1E1B",
    white: "#FFFFFF",
    lightGray: "#F5F5F5",
    gray: "#CCCCCC",
    background: "#FFE8C4",
    accent: "#1E88E5",
};

const screenWidth = Dimensions.get("window").width;

const formatDateTime = (date) => {
    if (!date) return "🗓 Zeit & Datum auswählen";
    return `${date.toLocaleDateString("de-DE", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
    })} – ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

export default function ReminderScreen() {
    const [reminders, setReminders] = useState([]);
    const [deviceName, setDeviceName] = useState("");
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [tempDateTime, setTempDateTime] = useState(new Date());
    const [showPickerModal, setShowPickerModal] = useState(false);

    // Neue States für manuelle Eingabe
    const [manualDate, setManualDate] = useState(""); // z.B. "07.06.2025"
    const [manualTime, setManualTime] = useState(""); // z.B. "12:00"

    // Hilfsfunktion, um Datum und Zeit aus Strings zu einem Date-Objekt zu machen
    const parseDateTimeFromManualInput = (dateStr, timeStr) => {
        // Datum parsen (TT.MM.JJJJ)
        const dateParts = dateStr.split(".");
        if (dateParts.length !== 3) return null;

        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Monate 0-basiert
        const year = parseInt(dateParts[2], 10);

        // Zeit parsen (HH:mm)
        const timeParts = timeStr.split(":");
        if (timeParts.length !== 2) return null;

        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        if (
            isNaN(day) || isNaN(month) || isNaN(year) ||
            isNaN(hours) || isNaN(minutes)
        ) return null;

        const dt = new Date(year, month, day, hours, minutes);
        if (dt.toString() === "Invalid Date") return null;

        return dt;
    };

    const handleConfirmDateTime = () => {
        // Wenn manuelle Eingabe vorhanden, versuche diese zu parsen
        if (manualDate.trim() && manualTime.trim()) {
            const parsedDate = parseDateTimeFromManualInput(manualDate.trim(), manualTime.trim());
            if (!parsedDate) {
                Alert.alert("Ungültige Eingabe", "Bitte gib ein gültiges Datum und Uhrzeit im Format TT.MM.JJJJ und HH:mm ein.");
                return;
            }
            setSelectedDateTime(parsedDate);
            setTempDateTime(parsedDate);
        } else {
            // sonst benutze Picker-Wert
            setSelectedDateTime(tempDateTime);
        }
        setShowPickerModal(false);
    };

    const addReminder = () => {
        if (!deviceName.trim() || !selectedDateTime) {
            Alert.alert("Fehlende Eingabe", "Bitte Gerätename und Datum/Zeit auswählen.");
            return;
        }

        setReminders((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                deviceName: deviceName.trim(),
                time: selectedDateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                date: selectedDateTime.toLocaleDateString("de-DE", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                }),
            },
        ]);

        setDeviceName("");
        setSelectedDateTime(null);
        setTempDateTime(new Date());
        setManualDate("");
        setManualTime("");

        Alert.alert("Erinnerung gespeichert", "Die Erinnerung wurde erfolgreich hinzugefügt.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Erinnerung erstellen</Text>

            <TextInput
                style={styles.input}
                placeholder="Gerätename (z.B. Licht)"
                placeholderTextColor={colors.gray}
                value={deviceName}
                onChangeText={setDeviceName}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setTempDateTime(selectedDateTime || new Date());
                    setShowPickerModal(true);
                }}
            >
                <Text style={styles.buttonText}>{formatDateTime(selectedDateTime)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addReminder}>
                <Text style={styles.buttonText}>Erinnerung hinzufügen</Text>
            </TouchableOpacity>

            <FlatList
                data={reminders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reminderCard}>
                        <Text style={styles.reminderText}>
                            {item.deviceName} – {item.date} {item.time}
                        </Text>
                    </View>
                )}
                style={{ marginTop: 20 }}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", color: colors.gray }}>
                        Keine Erinnerungen
                    </Text>
                }
            />

            <Modal visible={showPickerModal} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Datum & Uhrzeit wählen</Text>

                        {/* Manuelle Eingabe */}
                        <TextInput
                            style={[styles.input, { marginBottom: 8 }]}
                            placeholder="Datum (TT.MM.JJJJ)"
                            keyboardType="numbers-and-punctuation"
                            value={manualDate}
                            onChangeText={setManualDate}
                        />
                        <TextInput
                            style={[styles.input, { marginBottom: 16 }]}
                            placeholder="Uhrzeit (HH:mm)"
                            keyboardType="numbers-and-punctuation"
                            value={manualTime}
                            onChangeText={setManualTime}
                        />

                        {/* DateTimePicker */}
                        <DateTimePicker
                            value={tempDateTime}
                            mode="datetime"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(event, selected) => {
                                if (selected) {
                                    setTempDateTime(selected);
                                    // Update manuelle Eingabe auch mit Picker-Wert, damit die Inputs synchron sind
                                    setManualDate(
                                        selected.toLocaleDateString("de-DE", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })
                                    );
                                    setManualTime(
                                        selected.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                    );
                                }
                            }}
                            style={{ width: screenWidth * 0.8 }}
                        />

                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDateTime}>
                            <Text style={styles.buttonText}>Fertig</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: colors.gray, marginTop: 10 }]}
                            onPress={() => setShowPickerModal(false)}
                        >
                            <Text style={[styles.buttonText, { color: colors.obsidian }]}>Abbrechen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    title: { fontSize: 26, fontWeight: "bold", color: colors.obsidian, marginBottom: 20, textAlign: "center" },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: colors.white,
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
        color: colors.obsidian,
        marginBottom: 12,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "center",
        width: screenWidth * 0.8,
        marginBottom: 12,
    },
    addButton: { backgroundColor: colors.accent },
    buttonText: { color: colors.white, fontSize: 16, fontWeight: "600" },
    reminderCard: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: colors.orchid,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 10,
    },
    reminderText: { fontSize: 16, color: colors.steel },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        width: screenWidth * 0.9,
    },
    modalTitle: { fontSize: 18, fontWeight: "bold", color: colors.obsidian, marginBottom: 10 },
    confirmButton: {
        backgroundColor: colors.accent,
        marginTop: 15,
        paddingVertical: 10,
        borderRadius: 8,
        width: "60%",
        alignItems: "center",
    },
});
