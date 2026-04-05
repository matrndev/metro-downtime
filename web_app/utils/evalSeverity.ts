/*
3 - severe
2 - moderate
1 - minor
0 - no effect
-1 - unknown
*/

const effects: Record<string, number> = {
    NO_SERVICE: 3,
    REDUCED_SERVICE: 3,
    SIGNIFICANT_DELAYS: 2,
    DETOUR: 2,
    ADDITIONAL_SERVICE: 2,
    MODIFIED_SERVICE: 2,
    OTHER_EFFECT: 1,
    UNKNOWN_EFFECT: -1,
    STOP_MOVED: 1,
    NO_EFFECT: 0,
    ACCESSIBILITY_ISSUE: 1,
};

export default function evalSeverity(
    effect: string,
) {
    return effects[effect] ?? -1;
}