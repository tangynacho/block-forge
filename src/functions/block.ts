export function getAbilityModifier(score: number | null): number | null {
    if (score === null) return null
    return Math.floor((score - 10) / 2)
}

export function getAbilitySave(score: number | null, bonus: number = 0, mult: number = 1): number | null {
    const mod = getAbilityModifier(score)
    if (mod === null) return null
    return mod + bonus * mult
}