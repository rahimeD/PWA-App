import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TextInput,
    TouchableOpacity
} from "react-native";
import colors from "../constants/colors"; // Pfad anpassen, falls nötig

const allTips = [
    {

        title: "LED statt Glühbirne",
        description: "Wechsle zu LED-Lampen – sie verbrauchen bis zu 80% weniger Strom.",
        category: "Beleuchtung",
    },
    {

        title: "Heizung richtig steuern",
        description: "Nutze smarte Thermostate für effizientere Heizzyklen.",
        category: "Heizung",
    },
    {

        title: "Zeitpläne nutzen",
        description: "Plane Geräte-Nutzung zu Niedrigtarifzeiten.",
        category: "Zeitmanagement",
    },
    {

        title: "Geräte ausschalten",
        description: "Ziehe ungenutzte Geräte vom Strom oder verwende smarte Stecker.",
        category: "Energie sparen",
    },
    // Beispiel für Erweiterung
    {

        title: "Sicherheit erhöhen",
        description: "Installiere smarte Sensoren für Fenster und Türen.",
        category: "Sicherheit",
    },
    {

        title: "Wasserverbrauch reduzieren",
        description: "Nutze smarte Wassersensoren zur Leckage-Erkennung.",
        category: "Umwelt",
    },
];

const categories = [
    "Alle",
    "Beleuchtung",
    "Heizung",
    "Zeitmanagement",
    "Energie sparen",
    "Sicherheit",
    "Umwelt",
];

export default function TipsScreen() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Alle");

    // Filtere Tipps nach Suchbegriff und Kategorie
    const filteredTips = allTips.filter(tip => {
        const matchesCategory = selectedCategory === "Alle" || tip.category === selectedCategory;
        const matchesSearch =
            tip.title.toLowerCase().includes(search.toLowerCase()) ||
            tip.description.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.header}>Smart-Tipps für dein Zuhause</Text>
            <Text style={styles.subHeader}>
                {filteredTips.length} Tipp{filteredTips.length !== 1 ? "s" : ""} gefunden
            </Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Tipp suchen..."
                placeholderTextColor={colors.gray}
                value={search}
                onChangeText={setSearch}
            />

            <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.categoryButton,
                            selectedCategory === cat && styles.categoryButtonActive,
                        ]}
                        onPress={() => setSelectedCategory(cat)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === cat && styles.categoryTextActive,
                            ]}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.grid}>
                {filteredTips.length > 0 ? (
                    filteredTips.map((tip, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.textBlock}>
                                <Text style={styles.title}>{tip.title}</Text>
                                <Text style={styles.description}>{tip.description}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noResults}>Keine Tipps gefunden.</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.sand,
        alignItems: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.primary,
        marginBottom: 8,
        textAlign: "center",
    },
    subHeader: {
        fontSize: 14,
        color: colors.steel,
        marginBottom: 16,
    },
    searchInput: {
        width: "100%",
        padding: 12,
        borderRadius: 8,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray,
        fontSize: 16,
        marginBottom: 16,
        color: colors.obsidian,
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 24,
        gap: 10, // ab RN 0.70+, sonst margin in categoryButton nutzen
    },
    categoryButton: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        backgroundColor: colors.lightGray,
        borderRadius: 20,
    },
    categoryButtonActive: {
        backgroundColor: colors.primary,
    },
    categoryText: {
        color: colors.steel,
        fontWeight: "600",
        fontSize: 14,
    },
    categoryTextActive: {
        color: colors.white,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 16,
    },
    card: {
        flexDirection: "row",
        backgroundColor: colors.background,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        width: Dimensions.get("window").width > 500 ? "45%" : "100%",
        maxWidth: 400,
        marginBottom: 16,
        elevation: 3,
        shadowColor: colors.obsidian,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    textBlock: {
        marginLeft: 14,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.steel,
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: colors.steel,
        lineHeight: 20,
    },
    noResults: {
        fontSize: 16,
        color: colors.steel,
        marginTop: 20,
    },
});
