<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { type BlockForm, type SpeedKey, defaultSpeed, speedKeys, abilityKeys, defaultAbilities, type SenseKey, defaultSenses, senseKeys, type LanguageKey, defaultLanguages, languageKeys } from './types/block'
import { type BlockTrait, defaultTrait, defaultTraits, traitDatabase } from './types/traits'
import { type ActionSectionKey, type BlockAction, defaultAction, defaultActions, actionSectionLabels, actionSectionKeys, actionCategories, attackSubcats } from './types/actions'
import { addTrait, removeTrait } from './functions/traits'
import { addAction, removeAction } from './functions/actions'

// sizes
const sizeOptions = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
]

// types
const typeOptions = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead',
]

// speed
const availableSpeedKeys = computed(() =>
  speedKeys.filter((key) => block.speed[key] === -1)
)
const activeSpeedKeys = computed(() =>
  speedKeys.filter((key) => block.speed[key] !== -1)
)
const speedToAdd = ref<SpeedKey | ''>('')
const showSpeedDropdown = ref(false)
function addSpeed() {
  if (!speedToAdd.value) return
  block.speed[speedToAdd.value] = 30
  speedToAdd.value = ''
  showSpeedDropdown.value = false
}
function removeSpeed(key: SpeedKey) {
  block.speed[key] = -1
}

// senses
const availableSenseKeys = computed(() =>
  senseKeys.filter((key) => block.senses[key] === -1)
)
const activeSenseKeys = computed(() =>
  senseKeys.filter((key) => block.senses[key] !== -1)
)
const senseToAdd = ref<SenseKey | ''>('')
const showSenseDropdown = ref(false)
function addSense() {
  if (!senseToAdd.value) return
  block.senses[senseToAdd.value] = 60
  senseToAdd.value = ''
  showSenseDropdown.value = false
}
function removeSense(key: SenseKey) {
  block.senses[key] = -1
}

// languages
const availableLanguageKeys = computed(() =>
  languageKeys.filter((key) => block.languages[key] === false)
)
const activeLanguageKeys = computed(() =>
  languageKeys.filter((key) => block.languages[key] !== false)
)
const languageToAdd = ref<LanguageKey | ''>('')
const showLanguageDropdown = ref(false)
function addLanguage() {
  if (!languageToAdd.value) return
  block.languages[languageToAdd.value] = true
  languageToAdd.value = ''
  showLanguageDropdown.value = false
}
function removeLanguage(key: LanguageKey) {
  block.languages[key] = false
}

const selectedTraitID = ref(-1)
const customTraitName = ref('')

const showActionForge = ref(false)

const actionDraft = reactive({
  section: actionSectionKeys[0],
  name: '',
  category: '',
  attackSubcat: '',
  range: 5,
  attackAbility: '',
  proficient: false,
  hitBonus: 0,
  description: '',
})

function openActionForge() {
  actionDraft.section = actionSectionKeys[0]
  actionDraft.name = ''
  actionDraft.description = ''
  showActionForge.value = true
}

function closeActionForge() {
  showActionForge.value = false
}

function createActionFromForge() {
  addAction(
    block,
    actionDraft.section,
    actionDraft.name,
    actionDraft.description
  )

  closeActionForge()
}

// master block
const block = reactive<BlockForm>({
  name: '',
  size: 'Medium',
  type: 'Humanoid',
  hp: null,
  ac: null,
  bonus: null,
  initiative: null,
  cr: null,
  speed: defaultSpeed,
  abilities: defaultAbilities,
  senses: defaultSenses,
  languages: defaultLanguages,
  traits: defaultTraits,
  actions: defaultActions,
})
</script>

<template>
  <main class="app-shell">
    <h1>Block Forge</h1>
    <section class="attributes panel">
      <div>
        <h2 class="section-note">Details</h2>
        <div class="form-grid">
          <label class="field">
            <span>Name</span>
            <input v-model="block.name" type="text" placeholder="Enter a name" />
          </label>

          <label class="field">
            <span>Size</span>
            <select v-model="block.size">
              <option v-for="size in sizeOptions" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </label>

          <label class="field">
            <span>Type</span>
            <select v-model="block.type">
              <option v-for="type in typeOptions" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </label>
        </div>
        <div class="form-grid">
          <label class="field numfield">
            <span>HP</span>
            <input v-model.number="block.hp" type="number" min="0" placeholder="0" />
          </label>

          <label class="field numfield">
            <span>AC</span>
            <input v-model.number="block.ac" type="number" min="0" placeholder="0" />
          </label>

          <label class="field numfield">
            <span>Proficiency</span>
            <input v-model.number="block.bonus" type="number" min="0" max="10" placeholder="0" />
          </label>

          <label class="field numfield">
            <span>Initiative</span>
            <input v-model.number="block.initiative" type="number" placeholder="0" prefix="+" />
          </label>

          <label class="field numfield">
            <span>CR</span>
            <input v-model.number="block.cr" type="number" placeholder="0" />
          </label>
        </div>

        <p>Abilities</p>
        <div class="sub-grid">
          <label
            v-for="key in abilityKeys"
            :key="key"
            class="sub-field"
          >
            <span>{{ key }}</span>
            <input
              v-model.number="block.abilities[key]"
              type="number"
              min="0"
              placeholder="0"
            />
          </label>
        </div>
        
        <p>Speed</p>
        <div class="sub-grid">
          <label
            v-for="key in activeSpeedKeys"
            :key="key"
            class="sub-field"
          >
              <span>{{ key }}</span>
              <input
                v-model.number="block.speed[key]"
                type="number"
                min="0"
                placeholder="0"
              />
              <button v-if="key !== 'Walk'" class="btn-circle" type="button" @click="removeSpeed(key)">-</button>
          </label>
          <button v-if="availableSpeedKeys.length > 0 && !showSpeedDropdown" class="btn-circle plus" type="button" @click="showSpeedDropdown = true">+</button>
          <select
            v-else-if="showSpeedDropdown"
            v-model="speedToAdd"
            @change="addSpeed"
            @blur="showSpeedDropdown = false"
          >
            <option value="">Select Speed Type</option>
            <option
              v-for="key in availableSpeedKeys"
              :key="key"
              :value="key"
            >
              {{ key }}
            </option>
          </select>
        </div>

        <p>Senses</p>
        <div class="sub-grid">
          <label
            v-for="key in activeSenseKeys"
            :key="key"
            class="sub-field"
          >
              <span>{{key}}</span>
              <input
                v-model.number="block.senses[key]"
                type="number"
                min="0"
                placeholder="0"
              />
              <button class="btn-circle" type="button" @click="removeSense(key)">-</button>
          </label>
          <button v-if="availableSenseKeys.length > 0 && !showSenseDropdown" class="btn-circle plus" type="button" @click="showSenseDropdown = true">+</button>
          <select
            v-else-if="showSenseDropdown"
            v-model="senseToAdd"
            @change="addSense"
            @blur="showSenseDropdown = false"
          >
            <option value="">Select Sense</option>
            <option
              v-for="key in availableSenseKeys"
              :key="key"
              :value="key"
            >
              {{ key }}
            </option>
          </select>
        </div>

        <p>Languages</p>
        <div class="sub-grid languages">
          <label
            v-for="key in activeLanguageKeys"
            :key="key"
            class="sub-field"
          >
              <span>{{key}}</span>
              <button class="btn-circle" type="button" @click="removeLanguage(key)">-</button>
          </label>
          <button v-if="availableLanguageKeys.length > 0 && !showLanguageDropdown" class="btn-circle plus" type="button" @click="showLanguageDropdown = true">+</button>
          <select
            v-else-if="showLanguageDropdown"
            v-model="languageToAdd"
            @change="addLanguage"
            @blur="showLanguageDropdown = false"
          >
            <option value="">Select Language</option>
            <option
              v-for="key in availableLanguageKeys"
              :key="key"
              :value="key"
            >
              {{ key }}
            </option>
          </select>
        </div>

      </div>
      <div>
        <h2 class="section-note">Traits</h2>
        <div class="add-row">
          <select v-model="selectedTraitID">
            <option value=-1>Add existing trait</option>
            <option
              v-for="trait, id in traitDatabase"
              :key="id"
              :value="id"
            >
            {{ trait.name }}
            </option>
          </select>
          <button type="button" class="btn-circle" style="margin-left: 4px" @click="addTrait(block, traitDatabase[selectedTraitID].name, traitDatabase[selectedTraitID].description); selectedTraitID=-1">+</button>
        </div>

        <div class="add-row">
          <input v-model="customTraitName" type="text" placeholder="Custom trait name" />
          <button type="button" class="btn-circle" style="margin-left: 4px" @click="addTrait(block, customTraitName, '')">+</button>
        </div>

        <div v-for="trait, id in block.traits" :key="id" class="entry-card">
          <div class="entry-header">
            <input v-model="trait.name" type="text" placeholder="Trait name" />
            <button type="button" class="btn-circle" @click="removeTrait(block, id)">−</button>
          </div>

          <textarea
            v-model="trait.description"
            rows="3"
            placeholder="Trait description"
          />
        </div>
      </div>
      
      <div>
        <h2 class="section-note">Actions</h2>
        <button type="button" class="btn-circle plus" @click="openActionForge()">+</button>
        
        <div
          v-for="section in actionSectionKeys"
          :key="section"
          class="action-section"
        >
          <div v-if="block.actions[section].length > 0">
            <p>{{ actionSectionLabels[section] }}</p>
            <section class="actions-panel">
              <div
                v-for="(action, id) in block.actions[section]"
                :key="id"
                class="entry-card"
              >
                <div class="entry-header">
                  <input v-model="action.name" type="text" placeholder="Action name" />
                  <button type="button" class="btn-circle" @click="removeAction(block, section, id)">−</button>
                </div>

                <textarea
                  v-model="action.description"
                  rows="3"
                  placeholder="Action description"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section class="panel">
      <h2>Current Data</h2>
      <div><pre>{{ block }}</pre></div>
      <div></div>
    </section>

    <div v-if="showActionForge" class="modal-backdrop" @click.self="closeActionForge">
      <section class="modal-card">
        <div class="modal-header">
          <h2>Action Forge</h2>
        </div>

        <section class="actions-panel">
          <div class="sub-panel">
            <span>Name</span>
            <input v-model="actionDraft.name" type="text" placeholder="Action name" />
          </div>
          <div class="sub-panel">
            <span>Section</span>
            <select v-model="actionDraft.section">
              <option
                v-for="section in actionSectionKeys"
                :key="section"
                :value="section"
              >
                {{ actionSectionLabels[section] }}
              </option>
            </select>
          </div>
          <div class="sub-panel">
            <span>Category</span>
            <select v-model="actionDraft.category">
              <option
                v-for="category in actionCategories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
          <div class="sub-panel">
            <span>Sub-Category</span>
            <select v-if="actionDraft.category === 'Attack'" v-model="actionDraft.attackSubcat">
              <option
                v-for="category in attackSubcats"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
            <span v-else>-</span>
          </div>
          <div v-if="actionDraft.category === 'Attack'" class="actions-panel">
            <div v-if="actionDraft.category === 'Attack'" class="sub-panel">
              <span>Range</span>
              <input v-model.number="actionDraft.range" type="number" min="5" max="500" placeholder="5" />
            </div>
            <div class="sub-panel">
              <span>Ability</span>
              <select v-model="actionDraft.attackAbility">
                <option
                  v-for="ability in abilityKeys"
                  :key="ability"
                  :value="ability"
                >
                  {{ ability }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="actionDraft.category === 'Attack'" class="actions-panel">
            <div class="sub-panel">
              <span>Prof. (+{{ block.bonus }}) ?</span>
              <input v-model="actionDraft.proficient" type="checkbox">
            </div>
            <div class="sub-panel">
              <span>Hit Bonus</span>
              <input v-model.number="actionDraft.hitBonus" type="number" min="0" max="99" placeholder="0" />
            </div>
          </div>
        </section>

        <!-- <span>Description</span>
        <textarea
          v-model="actionDraft.description"
          rows="5"
          placeholder="Action description"
        /> -->

        <div class="modal-actions">
          <button type="button" @click="closeActionForge">Cancel</button>
          <button type="button" @click="createActionFromForge">Create</button>
        </div>
      </section>
    </div>
  </main>
</template>

<style>
:root {
  --bg: #181112;
  --panel: #241718;
  --border: #3b1f22;
  --text: #f3e8e8;
  --muted: #bfa3a3;
  --accent: #f87171;
}

html,
body,
#app {
  margin: 0;
  min-height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, system-ui, sans-serif;
}

.app-shell {
  min-height: 100vh;
  padding: 32px;
  background: var(--bg);
  color: var(--text);
}

.panel {
  display: grid;
  gap: 24px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}
.panel.attributes {
  grid-template-columns: 1fr 1fr 2fr;
}
.panel.results {
  grid-template-columns: 1fr 1fr;
}
.actions-panel {
  display: grid;
  text-align: left;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 8px;
}
.sub-panel {
  display: grid;
  padding: 10px;
  gap: 3px;
}


h1,
h2 {
  margin-top: 0;
  margin-bottom: 8px;
}

.section-note {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--muted)
}

.form-grid {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  justify-content: space-evenly;
  width: 100%;
}

.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;
  width: 65px;
}

.field.numfield {
  flex: 0 0 auto;
  width: 75px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field.numfield input {
  width: 60px;
  align-self: center;
}

.field span {
  align-self: center;
}

.sub-grid {
  display: flex;
  width: 100%;
  gap: 8px;
  margin-bottom: 8px;
  justify-content: left;
}

.sub-grid.languages {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

.sub-field {
  flex: 0 0 auto;
  width: 75px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sub-grid.languages .sub-field {
  flex: 0 0 auto;
  width: 85px;
}

.sub-field input {
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  width: 60px;
  align-self: center;
}

.sub-field span {
  font-size: 0.8rem;
  text-align: center;
  color: #bfa3a3;
  align-self: center;
}

input,
select {
  color: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  text-align: center;
  padding: 8px 8px;
  max-height: 35px;
}

input:focus,
select:focus {
  border-color: var(--accent);
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
}

p {
  margin-bottom: 8px;
}

.btn-circle {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
  align-self: center;
  margin-top: 4px;
}

.btn-circle.plus {
  width: 36px;
  height: 36px;
  font-size: 21px;
}

.btn-circle:hover {
  background: var(--border);
}

.add-row {
  gap: 8px;
  margin-bottom: 8px;
}

.add-row input,
.add-row select {
  flex: 1;
}

.entry-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  margin-top: 12px;
}

.entry-header {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.entry-header input {
  flex: 1;
}

.entry-card textarea {
  width: 100%;
  resize: vertical;
  box-sizing: border-box;
}

.section-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.action-section {
  margin-top: 16px;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.modal-card {
  width: min(520px, 100%);
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: grid;
  gap: 0px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h2 {
  margin: 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.modal-card textarea {
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
}
</style>