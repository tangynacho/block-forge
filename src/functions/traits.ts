import type { BlockForm } from "@/types/block"

export function addTrait(block: BlockForm, traitName: string = '', traitDesc: string) {
  block.traits.push({
    name: traitName,
    description: traitDesc,
  })
}

export function removeTrait(block: BlockForm, id: number) {
  block.traits.splice(id, 1)
}