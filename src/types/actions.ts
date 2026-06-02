import type { AbilityKey } from "./block"

export type ActionCategory = 'Attack' | 'Save' | 'Other'
export const actionCategories = ['Attack', 'Save', 'Other']

export type AttackSubcat = 'Melee' | 'Ranged' | 'Melee Spell' | 'Ranged Spell'
export const attackSubcats = ['Melee', 'Ranged', 'Melee Spell', 'Ranged Spell']

export type SaveSubcat = 'Pass/Fail' | 'Fail'
export const saveSubcats = ['Pass/Fail', 'Fail']

export type BlockAction = {
  name: string
  description: string
  category: ActionCategory
  
  attackSubcat?: AttackSubcat
  range?: number
  attackAbility?: AbilityKey
  proficient?: boolean
  hitBonus?: number
  attackDamage?: Damage[]
  attackHasSave?: 'Hit' | 'Miss'

  saveSubcat?: SaveSubcat
  saveAbility?: AbilityKey
  saveDifficulty?: number
  saveDamageFail?: Damage[]
  saveDamagePass?: Damage[]

  legendaryCost?: number
  resource?: string
}

export const defaultAction: BlockAction = {
    name: '',
    description: '',
    category: 'Attack',
}

export type ActionSectionKey = 'actions' | 'bonusActions' | 'reactions' | 'legendaryActions'


export const defaultActions: Record<ActionSectionKey, BlockAction[]> = {
  actions: [],
  bonusActions: [],
  reactions: [],
  legendaryActions: [],
}

export const actionSectionLabels: Record<ActionSectionKey, string> = {
  actions: 'Actions',
  bonusActions: 'Bonus Actions',
  reactions: 'Reactions',
  legendaryActions: 'Legendary Actions',
}

export const actionSectionKeys: ActionSectionKey[] = [
  'actions',
  'bonusActions',
  'reactions',
  'legendaryActions',
]

export type DamageType = 'All' | 'Bludgeoning' | 'Piercing' | 'Slashing' | 'Acid' | 'Cold' | 'Fire' | 'Force' | 'Lightning' | 'Necrotic' | 'Poison' | 'Psychic' | 'Radiant' | 'Thunder'

export type Damage = {
  diceCount: number,
  diceSize: number,
  damageAbility: AbilityKey | null
  bonusDamage: number
  damageType: DamageType
}

export type ConditionType = 'All' | 'Blinded' | 'Charmed' | 'Deafened' | 'Exhaustion' | 'Fatigued' | 'Frightened' | 'Grappled' | 'Incapacitated' | 'Invisible' | 'Paralyzed' | 'Petrified' | 'Poisoned' | 'Prone' | 'Restrained' | 'Stunned' | 'Unconcious'