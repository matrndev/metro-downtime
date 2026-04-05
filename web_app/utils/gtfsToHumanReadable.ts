type SupportedLanguages = "cs" | "en";

const translations: Record<SupportedLanguages, Record<string, string>> = {
    en: {
        NO_SERVICE: "No Service",
        REDUCED_SERVICE: "Reduced Service",
        SIGNIFICANT_DELAYS: "Significant Delays",
        DETOUR: "Detour",
        ADDITIONAL_SERVICE: "Additional Service",
        MODIFIED_SERVICE: "Modified Service",
        OTHER_EFFECT: "Other Effect",
        UNKNOWN_EFFECT: "Unknown Effect",
        STOP_MOVED: "Stop Moved",
        NO_EFFECT: "No Effect",
        ACCESSIBILITY_ISSUE: "Accessibility Issue",

        UNKNOWN_CAUSE: "Unknown Cause",
        OTHER_CAUSE: "Other Cause",
        TECHNICAL_PROBLEM: "Technical Problem",
        STRIKE: "Strike",
        DEMONSTRATION: "Demonstration",
        ACCIDENT: "Accident",
        HOLIDAY: "Holiday",
        WEATHER: "Weather",
        MAINTENANCE: "Maintenance",
        CONSTRUCTION: "Construction",
        POLICE_ACTIVITY: "Police Activity",
        MEDICAL_EMERGENCY: "Medical Emergency",
    },
    cs: {
        NO_SERVICE: "Provoz zastaven",
        REDUCED_SERVICE: "Provoz omezen",
        SIGNIFICANT_DELAYS: "Mimořádné zpoždění",
        DETOUR: "Odklon",
        ADDITIONAL_SERVICE: "Náhradní doprava",
        MODIFIED_SERVICE: "Provoz upraven",
        OTHER_EFFECT: "Ostatní opatření",
        UNKNOWN_EFFECT: "Neznámé opatření",
        STOP_MOVED: "Zastávka přemístěna",
        NO_EFFECT: "Ostatní (neovlivňuje dopravu)",
        ACCESSIBILITY_ISSUE: "Není bezbariérový přístup",

        UNKNOWN_CAUSE: "Neznámá příčina",
        OTHER_CAUSE: "Jiná příčina",
        TECHNICAL_PROBLEM: "Technický problém",
        STRIKE: "Stávka",
        DEMONSTRATION: "Demonstrace",
        ACCIDENT: "Dopravní nehoda",
        HOLIDAY: "Svátek",
        WEATHER: "Nepříznivé počasí",
        MAINTENANCE: "Údržba",
        CONSTRUCTION: "Stavba",
        POLICE_ACTIVITY: "Zásah policie",
        MEDICAL_EMERGENCY: "Zásah IZS",
    },
};

export default function gtfsToHumanReadable(
    textToTranslate: string,
    language: SupportedLanguages
) {
    return translations[language][textToTranslate] ?? textToTranslate;
}