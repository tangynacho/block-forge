export const speedKeys = ['Walk', 'Burrow', 'Climb', 'Fly', 'Swim']
export type SpeedKey = typeof speedKeys[number]
export type Speed = Record<SpeedKey, number>
export const defaultSpeed: Speed = Object.fromEntries(
    speedKeys.map((key) => {
        return key === 'Walk' ? [key, 30] : [key, -1]
    })
) as Speed

export const abilityKeys = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
export type AbilityKey = typeof abilityKeys[number]
export type Abilities = Record<AbilityKey, number>
export const defaultAbilities: Abilities = Object.fromEntries(
  abilityKeys.map((key) => [key, 10])
) as Abilities

export const senseKeys = ['Darkvision', 'Blindsight', 'Tremorsense', 'Truesight']
export type SenseKey = typeof abilityKeys[number]
export type Senses = Record<SenseKey, number>
export const defaultSenses: Senses = Object.fromEntries(
    senseKeys.map((key) => [key, -1])
) as Senses

export const languageKeys = ['Common', 'All', 'Abyssal', 'Aquan', 'Auran', 'Celestial', 'Deep Speech', 'Draconic', 'Druidic', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin', 'Gnoll', 'Halfling', 'Ignan', 'Infernal', 'Orc', 'Primordial', 'Sylvan', 'Terran', 'Undercommon']
export type LanguageKey = typeof languageKeys[number]
export type Languages = Record<LanguageKey, boolean>
export const defaultLanguages: Languages = Object.fromEntries(
    languageKeys.map((key) => [key, false])
) as Languages

export type BlockForm = {
    name: string
    size: string
    type: string
    hp: number | null
    ac: number | null
    bonus: number | null
    initiative: number | null
    cr: number | null
    speed: Speed
    abilities: Abilities
    senses: Senses
    languages: Languages
}