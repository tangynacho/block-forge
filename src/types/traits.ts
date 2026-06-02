export type BlockTrait = {
  name: string
  description: string
}

export const defaultTrait: BlockTrait = {
  name: '',
  description: '',
}

export const defaultTraits: BlockTrait[] = []

export const traitDatabase: BlockTrait[] = [
    {
        name: 'Amphibious',
        description: 'Creature can breathe air and water.',
    },
    {
        name: 'Magic Resistance',
        description: 'Adv on saving throws against magical effects.',
    },
    {
        name: 'Keen Sight',
        description: 'Adv on Perception checks that use sight.',
    },
]