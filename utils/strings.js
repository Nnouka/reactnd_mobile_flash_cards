export function spaceToUnderscore(targetStr) {
    return targetStr.trim().replace(/ /g, '_');
}

export function underscoreToSpace(targetStr) {
    return targetStr.trim().replace(/_/g, ' ');
}