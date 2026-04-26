<script setup>
import { Menu } from 'lucide-vue-next'

defineProps({
  activeTab: String
})

const emit = defineEmits(['update:activeTab', 'toggleSidebar'])

const tabs = [
  { id: 'vue', label: 'Vue 3', icon: '🟢', color: 'text-vue-green border-vue-green/30 bg-vue-green/10' },
  { id: 'svelte', label: 'Svelte', icon: '🔥', color: 'text-svelte-orange border-svelte-orange/30 bg-svelte-orange/10' },
  { id: 'typescript', label: 'TypeScript', icon: '🔷', color: 'text-ts-blue border-ts-blue/30 bg-ts-blue/10' },
  { id: 'sass', label: 'Sass', icon: '💎', color: 'text-sass-pink border-sass-pink/30 bg-sass-pink/10' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 h-12 bg-surface-card/95 backdrop-blur-md border-b border-surface-border">
    <div class="flex items-center h-full px-4">
      <button @click="emit('toggleSidebar')" class="lg:hidden p-1.5 mr-3 text-text-muted hover:text-vue-green transition-colors">
        <Menu :size="18" />
      </button>

      <div class="flex items-center gap-2 mr-6">
        <span class="text-xl">🟢</span>
        <span class="font-bold text-vue-green hidden sm:inline">flearning</span>
      </div>

      <div class="h-5 w-px bg-surface-border mr-3" />

      <div class="flex items-center gap-1.5">
        <!-- v-for = .map() de React -->
        <button v-for="tab in tabs" :key="tab.id"
          @click="emit('update:activeTab', tab.id)"
          :class="activeTab === tab.id ? tab.color : 'text-text-muted border-transparent hover:text-text-primary hover:bg-surface-hover'"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all border">
          <span class="text-sm">{{ tab.icon }}</span>
          <span class="hidden sm:inline">{{ tab.label }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>