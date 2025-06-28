import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
} from "react-native";
import ChatbotIcon from "../../assets/icons/chatbot.svg";
import colors from "../constants/colors";

export default function ChatBox() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Willkommen bei Savergy! Ich bin dein virtueller Assistent. Wie kann ich helfen?",
        },
    ]);
    const [input, setInput] = useState("");

    const toggleChat = () => setOpen(!open);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { from: "user", text: input.trim() };
        const botReply = {
            from: "bot",
            text: "Danke für deine Nachricht. Ich leite deine Anfrage weiter!",
        };

        setMessages((prev) => [...prev, userMessage, botReply]);
        setInput("");
    };

    return (
        <View style={styles.chatContainer} pointerEvents="box-none">
            {open && (
                <View style={styles.chatBox}>
                    <View style={styles.chatHeader}>
                        <Text style={styles.headerText}>🤖 Savergy-Chat</Text>
                        <TouchableOpacity onPress={toggleChat}>
                            <Text style={{ color: "#fff", fontSize: 20 }}>×</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.chatMessages}
                        showsVerticalScrollIndicator={false}
                    >
                        {messages.map((msg, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.message,
                                    msg.from === "user" ? styles.userMessage : styles.botMessage,
                                ]}
                            >
                                <Text style={styles.messageText}>{msg.text}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.inputArea}>
                        <TextInput
                            style={styles.input}
                            value={input}
                            onChangeText={setInput}
                            placeholder="Nachricht schreiben..."
                        />
                        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                            <Text style={{ color: "#fff", fontSize: 18 }}>➤</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <TouchableOpacity style={styles.iconButton} onPress={toggleChat}>
                <ChatbotIcon width={26} height={26} fill="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        position: "absolute",
        maxWidth: 300,
        width: "80%",
        right: 0,
        bottom: 0,
        zIndex: 9999,
        alignItems: "flex-end",
    },
    iconButton: {
        backgroundColor: colors.orchid,
        padding: 14,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 10,
    },
    chatBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 4,
        maxHeight: 320,
        width: 300,
    },
    chatHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.orchid,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    chatMessages: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexGrow: 1,
    },
    message: {
        padding: 8,
        marginVertical: 4,
        borderRadius: 10,
        maxWidth: "85%",
    },
    userMessage: {
        backgroundColor: colors.primary,
        alignSelf: "flex-end",
    },
    botMessage: {
        backgroundColor: colors.lightGray,
        alignSelf: "flex-start",
    },
    messageText: {
        fontSize: 14,
        color: colors.steel,
    },
    inputArea: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: colors.gray,
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: "center",
    },
    input: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 20,
        fontSize: 14,
    },
    sendButton: {
        backgroundColor: colors.orchid,
        padding: 8,
        borderRadius: 20,
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});
