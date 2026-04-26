<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  activeTab: String,
  activeTopic: String,
  collapsed: Boolean
})

const emit = defineEmits(['update:activeTopic', 'update:collapsed'])

const topicsByTab = {
  vue: [
    { id: 'vue-intro', label: 'Qué es Vue', icon: '📖' },
    { id: 'vue-setup', label: 'Setup y SFC', icon: '🚀' },
    { id: 'vue-template', label: 'Templates', icon: '📝' },
    { id: 'vue-reactivity', label: 'Reactividad', icon: '⚡' },
    { id: 'vue-components', label: 'Componentes', icon: '🧩' },
    { id: 'vue-props', label: 'Props y Emits', icon: '📦' },
    { id: 'vue-lifecycle', label: 'Lifecycle', icon: '🔄' },
    { id: 'vue-computed', label: 'Computed y Watch', icon: '🧮' },
    { id: 'vue-router', label: 'Vue Router', icon: '🗺️' },
    { id: 'vue-pinia', label: 'Pinia', icon: '🍍' },
  ],
  svelte: [
    { id: 'sv-intro', label: 'Qué es Svelte', icon: '📖' },
    { id: 'sv-basics', label: 'Sintaxis básica', icon: '✏️' },
    { id: 'sv-reactivity', label: 'Reactividad', icon: '⚡' },
    { id: 'sv-components', label: 'Componentes', icon: '🧩' },
    { id: 'sv-stores', label: 'Stores', icon: '🗄️' },
    { id: 'sv-vs', label: 'Comparación', icon: '⚔️' },
  ],
  typescript: [
    { id: 'ts-intro', label: 'Qué es TypeScript', icon: '📖' },
    { id: 'ts-types', label: 'Tipos básicos', icon: '🔢' },
    { id: 'ts-interfaces', label: 'Interfaces', icon: '📋' },
    { id: 'ts-functions', label: 'Funciones tipadas', icon: '⚙️' },
    { id: 'ts-generics', label: 'Generics', icon: '🔧' },
    { id: 'ts-react', label: 'TS + React/Vue', icon: '⚛️' },
  ],
  sass: [
    { id: 'sass-intro', label: 'Qué es Sass', icon: '📖' },
    { id: 'sass-features', label: 'Variables y nesting', icon: '🎨' },
    { id: 'sass-mixins', label: 'Mixins', icon: '🔧' },
    { id: 'sass-modules', label: 'Módulos', icon: '📦' },
  ],
}

const tabActiveColors = {
  vue: 'text-vue-green border-vue-green bg-vue-green/10',
  svelte: 'text-svelte-orange border-svelte-orange bg-svelte-orange/10',
  typescript: 'text-ts-blue border-ts-blue bg-ts-blue/10',
  sass: 'text-sass-pink border-sass-pink bg-sass-pink/10',
}

const tabHoverColors = {
  vue: 'hover:text-vue-green hover:bg-vue-green/5',
  svelte: 'hover:text-svelte-orange hover:bg-svelte-orange/5',
  typescript: 'hover:text-ts-blue hover:bg-ts-blue/5',
  sass: 'hover:text-sass-pink hover:bg-sass-pink/5',
}

const topics = computed(() => topicsByTab[props.activeTab] || [])
const isMobile = () => window.innerWidth < 1024

const tabLabels = { vue: '🟢 Vue 3', svelte: '🔥 Svelte', typescript: '🔷 TypeScript', sass: '💎 Sass' }

function handleSelect(id) {
  emit('update:activeTopic', id)
  if (isMobile()) emit('update:collapsed', true)
}

function handleIconClick(id) {
  emit('update:activeTopic', id)
  if (!isMobile()) emit('update:collapsed', false)
}
</script>

<template>
  <!-- Overlay móvil -->
  <div v-if="!collapsed" class="fixed inset-0 bg-black/50 z-30 lg:hidden"
    @click="emit('update:collapsed', true)" />

  <aside class="fixed top-12 left-0 bottom-0 z-40 bg-surface-card border-r border-surface-border transition-all duration-300 flex flex-col"
    :class="collapsed ? 'w-0 lg:w-11 overflow-hidden' : 'w-56'">

    <!-- Header -->
    <div v-if="!collapsed" class="px-4 py-3 border-b border-surface-border/50">
      <p class="text-[11px] text-text-muted font-medium uppercase tracking-wider">
        {{ tabLabels[activeTab] }}
      </p>
    </div>

    <!-- Temas expandidos -->
    <div class="flex-1 overflow-y-auto py-1">
      <template v-if="!collapsed">
        <button v-for="topic in topics" :key="topic.id"
          @click="handleSelect(topic.id)"
          :class="activeTopic === topic.id
            ? tabActiveColors[activeTab]
            : `text-text-secondary border-transparent ${tabHoverColors[activeTab]}`"
          class="w-full text-left px-4 py-2 flex items-center gap-2.5 text-[12px] transition-all border-l-2">
          <span class="text-xs w-5 text-center">{{ topic.icon }}</span>
          <span class="truncate">{{ topic.label }}</span>
        </button>
      </template>

      <!-- Temas colapsados (solo iconos) -->
      <template v-if="collapsed">
        <button v-for="topic in topics" :key="topic.id"
          @click="handleIconClick(topic.id)"
          :class="activeTopic === topic.id ? tabActiveColors[activeTab] : `text-text-muted ${tabHoverColors[activeTab]}`"
          class="hidden lg:block w-full py-2 text-center text-xs transition-all"
          :title="topic.label">
          {{ topic.icon }}
        </button>
      </template>
    </div>

    <!-- Toggle -->
    <button @click="emit('update:collapsed', !collapsed)"
      class="hidden lg:flex items-center justify-center py-2.5 border-t border-surface-border/50 text-text-muted hover:text-vue-green transition-colors">
      <ChevronRight v-if="collapsed" :size="14" />
      <ChevronLeft v-else :size="14" />
    </button>
  </aside>
</template>