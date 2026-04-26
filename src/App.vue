<!--
  App.vue — Componente raíz
  
  En Vue el estado se maneja con ref() (como useState)
  Los hijos se comunican con:
  - Props (padre → hijo)
  - Emits (hijo → padre)
  - v-model (two-way binding)
-->
<script setup>
import { ref } from 'vue'
import TopNav from './components/TopNav.vue'
import SideBar from './components/SideBar.vue'
import ContentArea from './components/ContentArea.vue'

// Estado de la app
const activeTab = ref('vue')
const activeTopic = ref(null)
const sidebarCollapsed = ref(false)

// Cambiar tab resetea el tema
function handleTabChange(tab) {
  activeTab.value = tab
  activeTopic.value = null
}
</script>

<template>
  <div class="min-h-screen bg-surface-bg">
    <!--
      v-model:activeTab = two-way binding
      Es un shortcut para :activeTab + @update:activeTab
    -->
    <TopNav
      :active-tab="activeTab"
      @update:active-tab="handleTabChange"
      @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed"
    />

    <SideBar
      :active-tab="activeTab"
      v-model:active-topic="activeTopic"
      v-model:collapsed="sidebarCollapsed"
    />

    <ContentArea
      :active-tab="activeTab"
      :active-topic="activeTopic"
      :sidebar-collapsed="sidebarCollapsed"
      @update:active-topic="activeTopic = $event"
      @update:active-tab="handleTabChange"
    />
  </div>
</template>