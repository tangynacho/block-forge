<script setup lang="ts">
import { reactive } from 'vue'
import { type BlockForm, defaultSpeed, defaultAbilities } from './types/block'

const sizeOptions = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
]

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

const block = reactive<BlockForm>({
  name: '',
  size: 'Medium',
  type: 'Humanoid',
  hp: null,
  ac: null,
  bonus: null,
  speed: defaultSpeed,
  abilities: defaultAbilities,
})
</script>

<template>
  <main class="app-shell">
    <h1>Block Forge</h1>
    <section class="attributes panel">
      <div>
        <p class="section-note">Attributes</p>
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
          <label class="field">
            <span>HP</span>
            <input v-model.number="block.hp" type="number" min="0" placeholder="0" />
          </label>

          <label class="field">
            <span>AC</span>
            <input v-model.number="block.ac" type="number" min="0" placeholder="0" />
          </label>

          <label class="field">
            <span>Proficiency Bonus</span>
            <input v-model.number="block.bonus" type="number" min="0" max="10" placeholder="0" />
          </label>
        </div>
      </div>
      <div><p class="section-note">Traits</p></div>
      <div><p class="section-note">Actions</p></div>
    </section>

    <section class="panel">
      <h2>Current Data</h2>
      <div><pre>{{ block }}</pre></div>
      <div></div>
    </section>
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
.attributes {
  grid-template-columns: 1fr 1fr 1fr;
}
.results {
  grid-template-columns: 1fr 1fr;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 8px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}

input,
select {
  color: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
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
</style>