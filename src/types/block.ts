export type Speed = {
    walk: number | null
    burrow: number | null
    climb: number | null
    fly: number | null
    swim: number | null
}

export const defaultSpeed: Speed = {
    walk: 30,
    burrow: null,
    climb: null,
    fly: null,
    swim: null,
}

export type Abilities = {
    STR: number | null
    DEX: number | null
    CON: number | null
    INT: number | null
    WIS: number | null
    CHA: number | null
}

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
    speed: Speed
    abilities: Abilities
}