<!--
  ContentArea.vue — Renderiza el tema activo
  
  En Vue usamos:
  - <component :is="comp" /> para renderizar componentes dinámicos
  - Esto es como {TopicComponent && <TopicComponent />} en React
-->
<script setup>
import { computed } from 'vue'
import { vueTopics } from '../data/vueTopics'
import { svelteTopics } from '../data/svelteTopics'
import { typescriptTopics } from '../data/typescriptTopics'
import { sassTopics } from '../data/sassTopics'
import TopicNav from './ui/TopicNav.vue'
import WelcomeScreen from './WelcomeScreen.vue'

const props = defineProps({
  activeTab: String,
  activeTopic: String,
  sidebarCollapsed: Boolean
})

const emit = defineEmits(['update:activeTopic', 'update:activeTab'])

const allTopics = { ...vueTopics, ...svelteTopics, ...typescriptTopics, ...sassTopics }

// computed = se recalcula cuando activeTopic cambia
const TopicComponent = computed(() => allTopics[props.activeTopic] || null)
</script>

<template>
  <div class="pt-12 min-h-screen transition-all duration-300"
    :class="sidebarCollapsed ? 'lg:pl-11' : 'lg:pl-56'">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6">

      <!-- Si hay tema seleccionado, renderizarlo -->
      <div v-if="TopicComponent" class="animate-fade-in vue-card p-6">
        <!-- component :is = renderizar componente dinámico -->
        <component :is="TopicComponent" />
        <TopicNav
          :current-topic="activeTopic"
          @navigate="emit('update:activeTopic', $event)"
          @tab-change="emit('update:activeTab', $event)"
        />
      </div>

      <!-- Si no hay tema, pantalla de bienvenida -->
      <WelcomeScreen v-else :active-tab="activeTab" />

    </div>
  </div>
</template>