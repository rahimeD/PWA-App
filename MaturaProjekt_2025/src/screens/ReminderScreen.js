import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    Alert,
    Platform,
    Modal,
    Animated,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const colors = {
    primary: "#EE7A2E",
    obsidian: "#0E1015",
    orchid: "#454697",
    background: "#FFE8C4",
    accent: "#1E88E5",
    gray: "#999999",
    white: "#fff",
};

const formatDateTime = (date) => {
    if (!date) return "Zeit & Datum wählen";
    return `${date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

export default function ReminderScreen() {
    const [reminders, setReminders] = useState([
        {
            id: "1",
            deviceName: "Heizung",
            time: "08:00",
            date: new Date().toLocaleDateString("de-DE"),
        },
        {
            id: "2",
            deviceName: "Kaffeemaschine",
            time: "07:15",
            date: new Date(Date.now() + 86400000).toLocaleDateString("de-DE"),
        },
    ]);
    const [deviceName, setDeviceName] = useState("");
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [tempDateTime, setTempDateTime] = useState(new Date());
    const [showPickerModal, setShowPickerModal] = useState(false);

    // Animation für Speichern Feedback
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const showSaveFeedback = () => {
        setShowSaveMessage(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => setShowSaveMessage(false));
            }, 1500);
        });
    };

    const addReminder = () => {
        if (!deviceName.trim() || !selectedDateTime) {
            Alert.alert("Fehlende Eingabe", "Bitte Gerätename und Datum/Zeit auswählen.");
            return;
        }
        const newReminder = {
            id: Date.now().toString(),
            deviceName: deviceName.trim(),
            date: selectedDateTime.toLocaleDateString("de-DE"),
            time: selectedDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setReminders((prev) => [newReminder, ...prev]);
        setDeviceName("");
        setSelectedDateTime(null);
        setTempDateTime(new Date());
        setShowPickerModal(false);
        showSaveFeedback();
    };

    const renderReminder = ({ item }) => (
        <View style={styles.reminderCard}>
            <Text style={styles.reminderDevice} numberOfLines={1}>
                {item.deviceName}
            </Text>
            <Text style={styles.reminderDateTime}>
                {item.date} · {item.time}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Erinnerung erstellen</Text>

            <TextInput
                style={styles.input}
                placeholder="Gerätename (z.B. Licht)"
                placeholderTextColor={colors.gray}
                value={deviceName}
                onChangeText={setDeviceName}
                maxLength={20}
            />

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.dateButton}
                onPress={() => {
                    setTempDateTime(selectedDateTime || new Date());
                    setShowPickerModal(true);
                }}
            >
                <Text style={styles.dateButtonText}>{formatDateTime(selectedDateTime)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.addButton}
                onPress={addReminder}
            >
                <Text style={styles.addButtonText}>+ Hinzufügen</Text>
            </TouchableOpacity>

            <FlatList
                data={reminders}
                keyExtractor={(item) => item.id}
                renderItem={renderReminder}
                contentContainerStyle={{ paddingBottom: 30 }}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", color: colors.gray }}>Keine Erinnerungen</Text>
                }
            />

            <Modal visible={showPickerModal} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Datum & Uhrzeit wählen</Text>
                        <DateTimePicker
                            value={tempDateTime}
                            mode="datetime"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(e, selected) => {
                                if (selected) setTempDateTime(selected);
                            }}
                            style={{ width: "100%" }}
                            minimumDate={new Date()}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalConfirmButton}
                                onPress={() => {
                                    setSelectedDateTime(tempDateTime);
                                    setShowPickerModal(false);
                                }}
                            >
                                <Text style={styles.modalConfirmText}>Speichern</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={() => setShowPickerModal(false)}
                            >
                                <Text style={styles.modalCancelText}>Abbrechen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {showSaveMessage && (
                <Animated.View style={[styles.saveMessageContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.saveMessageText}>Erinnerung gespeichert!</Text>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.obsidian,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 10,
        fontSize: 18,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: colors.gray,
    },
    dateButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    dateButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "700",
    },
    addButton: {
        backgroundColor: colors.accent,
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
        elevation: 6,
    },
    addButtonText: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 18,
    },
    reminderCard: {
        backgroundColor: colors.white,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 6,
        borderLeftColor: colors.orchid,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 3,
    },
    reminderDevice: {
        fontWeight: "700",
        fontSize: 18,
        color: colors.obsidian,
    },
    reminderDateTime: {
        color: colors.gray,
        fontSize: 15,
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 28,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.obsidian,
        marginBottom: 18,
    },
    modalButtons: {
        flexDirection: "row",
        marginTop: 28,
        width: "100%",
        justifyContent: "space-between",
    },
    modalConfirmButton: {
        backgroundColor: colors.accent,
        paddingVertical: 14,
        borderRadius: 10,
        flex: 1,
        marginRight: 12,
        alignItems: "center",
    },
    modalCancelButton: {
        backgroundColor: colors.gray,
        paddingVertical: 14,
        borderRadius: 10,
        flex: 1,
        marginLeft: 12,
        alignItems: "center",
    },
    modalConfirmText: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 18,
    },
    modalCancelText: {
        color: colors.obsidian,
        fontWeight: "700",
        fontSize: 18,
    },
    saveMessageContainer: {
        position: "absolute",
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: colors.accent,
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 7,
        elevation: 7,
    },
    saveMessageText: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 18,
    },
});
