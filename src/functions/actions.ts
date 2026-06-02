import type { ActionSectionKey } from "@/types/actions"
import type { BlockForm } from "@/types/block"

export function addAction(block: BlockForm, actSection: ActionSectionKey, actName: string, actDesc: string) {
  block.actions[actSection].push({
    name: actName,
    description: actDesc,
  })
}

export function removeAction(block: BlockForm, actSection: ActionSectionKey, id: number) {
  block.actions[actSection].splice(id, 1)
}