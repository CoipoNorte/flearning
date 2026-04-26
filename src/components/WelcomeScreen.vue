<script setup>
import { computed } from 'vue'

const props = defineProps({ activeTab: String })

const info = computed(() => {
  const map = {
    vue:        { icon: '🟢', name: 'Vue 3', desc: 'El framework progresivo', color: 'text-vue-green' },
    svelte:     { icon: '🔥', name: 'Svelte', desc: 'El compilador que desaparece', color: 'text-svelte-orange' },
    typescript: { icon: '🔷', name: 'TypeScript', desc: 'JavaScript con superpoderes', color: 'text-ts-blue' },
    sass:       { icon: '💎', name: 'Sass', desc: 'CSS con superpoderes', color: 'text-sass-pink' },
  }
  return map[props.activeTab]
})
</script>

<template>
  <div class="vue-card p-10 text-center">
    <div class="text-5xl mb-4">{{ info.icon }}</div>
    <h2 class="text-2xl font-bold mb-2" :class="info.color">{{ info.name }}</h2>
    <p class="text-text-secondary mb-8">{{ info.desc }}</p>
    <div class="vue-card p-4 max-w-sm mx-auto text-left text-sm text-text-muted">
      <p>👈 Selecciona un tema del sidebar para comenzar.</p>
    </div>
  </div>
</template>