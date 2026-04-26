<!--
  TopicNav.vue — Navegación entre temas
  
  emit() en Vue = callback props en React
  En vez de onNavigate(id), hacemos emit('navigate', id)
  El padre escucha con @navigate="handler"
-->
<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  currentTopic: String
})

// emit = enviar eventos al componente padre
const emit = defineEmits(['navigate', 'tabChange'])

const allTopics = [
  { id: 'vue-intro', label: 'Qué es Vue', tab: 'vue' },
  { id: 'vue-setup', label: 'Setup y SFC', tab: 'vue' },
  { id: 'vue-template', label: 'Templates', tab: 'vue' },
  { id: 'vue-reactivity', label: 'Reactividad', tab: 'vue' },
  { id: 'vue-components', label: 'Componentes', tab: 'vue' },
  { id: 'vue-props', label: 'Props y Emits', tab: 'vue' },
  { id: 'vue-lifecycle', label: 'Lifecycle', tab: 'vue' },
  { id: 'vue-computed', label: 'Computed y Watch', tab: 'vue' },
  { id: 'vue-router', label: 'Vue Router', tab: 'vue' },
  { id: 'vue-pinia', label: 'Pinia', tab: 'vue' },
  { id: 'sv-intro', label: 'Qué es Svelte', tab: 'svelte' },
  { id: 'sv-basics', label: 'Sintaxis básica', tab: 'svelte' },
  { id: 'sv-reactivity', label: 'Reactividad', tab: 'svelte' },
  { id: 'sv-components', label: 'Componentes', tab: 'svelte' },
  { id: 'sv-stores', label: 'Stores', tab: 'svelte' },
  { id: 'sv-vs', label: 'Comparación', tab: 'svelte' },
  { id: 'ts-intro', label: 'Qué es TypeScript', tab: 'typescript' },
  { id: 'ts-types', label: 'Tipos básicos', tab: 'typescript' },
  { id: 'ts-interfaces', label: 'Interfaces', tab: 'typescript' },
  { id: 'ts-functions', label: 'Funciones tipadas', tab: 'typescript' },
  { id: 'ts-generics', label: 'Generics', tab: 'typescript' },
  { id: 'ts-react', label: 'TS + React/Vue', tab: 'typescript' },
  { id: 'sass-intro', label: 'Qué es Sass', tab: 'sass' },
  { id: 'sass-features', label: 'Variables y nesting', tab: 'sass' },
  { id: 'sass-mixins', label: 'Mixins', tab: 'sass' },
  { id: 'sass-modules', label: 'Módulos', tab: 'sass' },
]

const tabColors = {
  vue: 'border-vue-green/30 text-vue-green hover:bg-vue-green/10',
  svelte: 'border-svelte-orange/30 text-svelte-orange hover:bg-svelte-orange/10',
  typescript: 'border-ts-blue/30 text-ts-blue hover:bg-ts-blue/10',
  sass: 'border-sass-pink/30 text-sass-pink hover:bg-sass-pink/10',
}

const idx = computed(() => allTopics.findIndex(t => t.id === props.currentTopic))
const prev = computed(() => idx.value > 0 ? allTopics[idx.value - 1] : null)
const next = computed(() => idx.value < allTopics.length - 1 ? allTopics[idx.value + 1] : null)
const progress = computed(() => Math.round(((idx.value + 1) / allTopics.length) * 100))

function handleNav(topic) {
  if (topic.tab !== allTopics[idx.value].tab) {
    emit('tabChange', topic.tab)
  }
  emit('navigate', topic.id)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div v-if="idx >= 0" class="mt-8 pt-5 border-t border-surface-border">
    <!-- Barra de progreso -->
    <div class="flex items-center gap-3 mb-4">
      <span class="text-[11px] text-text-muted">{{ idx + 1 }}/{{ allTopics.length }}</span>
      <div class="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
        <div class="h-full rounded-full bg-vue-green transition-all duration-500"
          :style="{ width: progress + '%' }" />
      </div>
      <span class="text-[11px] text-vue-green font-semibold">{{ progress }}%</span>
    </div>

    <!-- Botones -->
    <div class="flex justify-between gap-3">
      <button v-if="prev" @click="handleNav(prev)"
        :class="tabColors[prev.tab]"
        class="flex items-center gap-2 flex-1 text-left px-4 py-3 rounded-lg vue-card border text-xs transition-all">
        <ChevronLeft :size="14" />
        <div>
          <div class="text-[10px] text-text-muted">← anterior</div>
          <div>{{ prev.label }}</div>
        </div>
      </button>
      <div v-else class="flex-1" />

      <button v-if="next" @click="handleNav(next)"
        :class="tabColors[next.tab]"
        class="flex items-center justify-end gap-2 flex-1 text-right px-4 py-3 rounded-lg vue-card border text-xs transition-all">
        <div>
          <div class="text-[10px] text-text-muted">siguiente →</div>
          <div>{{ next.label }}</div>
        </div>
        <ChevronRight :size="14" />
      </button>
      <div v-else class="flex-1 vue-card rounded-lg p-3 text-center border border-vue-green/30">
        <span class="text-vue-green text-xs font-semibold">🎓 ¡Curso completado!</span>
      </div>
    </div>
  </div>
</template>