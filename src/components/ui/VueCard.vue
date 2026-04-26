<!--
  VueCard.vue — Card con variantes de color
  
  Computed properties = valores derivados que se
  recalculan automáticamente cuando cambian sus dependencias
  
  En React sería: useMemo(() => ..., [variant])
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  icon: String,
  variant: { type: String, default: 'default' }
})

// computed() = valor derivado reactivo
const colors = computed(() => {
  const map = {
    default: { border: 'border-surface-border', title: 'text-text-primary', bg: '' },
    vue:     { border: 'border-vue-green/25', title: 'text-vue-green', bg: 'bg-vue-green/5' },
    svelte:  { border: 'border-svelte-orange/25', title: 'text-svelte-orange', bg: 'bg-svelte-orange/5' },
    ts:      { border: 'border-ts-blue/25', title: 'text-ts-blue', bg: 'bg-ts-blue/5' },
    sass:    { border: 'border-sass-pink/25', title: 'text-sass-pink', bg: 'bg-sass-pink/5' },
    green:   { border: 'border-vue-green/25', title: 'text-vue-green', bg: 'bg-vue-green/5' },
    yellow:  { border: 'border-yellow-500/25', title: 'text-yellow-400', bg: 'bg-yellow-500/5' },
    red:     { border: 'border-red-500/25', title: 'text-red-400', bg: 'bg-red-500/5' },
    blue:    { border: 'border-blue-500/25', title: 'text-blue-400', bg: 'bg-blue-500/5' },
  }
  return map[props.variant] || map.default
})
</script>

<template>
  <div class="vue-card p-4" :class="[colors.border, colors.bg]">
    <div v-if="title" class="flex items-center gap-2 mb-3 pb-2 border-b border-surface-border/50">
      <span v-if="icon" class="text-sm">{{ icon }}</span>
      <h4 class="text-sm font-semibold" :class="colors.title">{{ title }}</h4>
    </div>
    <div class="text-sm text-text-secondary leading-relaxed">
      <slot />
    </div>
  </div>
</template>