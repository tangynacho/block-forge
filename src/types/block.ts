export type SpeedKey = 'walk' | 'burrow' | 'climb' | 'fly' | 'swim'
export type Speed = Record<SpeedKey, number | null>
export const defaultSpeed: Speed = {
    walk: 30,
    burrow: null,
    climb: null,
    fly: null,
    swim: null,
}

export type AbilityKey = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA'
export type Abilities = Record<AbilityKey, number | null>
export const defaultAbilities: Abilities = {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
}

export type BlockForm = {
    name: string
    size: string
    type: string
    hp: number | null
    ac: number | null
    bonus: number | null
    initiative: number | null
    speed: Speed
    abilities: Abilities
}