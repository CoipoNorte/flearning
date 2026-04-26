<!--
  LiveDemo.vue — Contenedor de demos
  
  <slot> en Vue = {children} en React
  Lo que pongas entre <LiveDemo>...</LiveDemo>
  se renderiza donde está el <slot />
-->
<script setup>
defineProps({
  title: { type: String, default: 'Preview' }
})
</script>

<template>
  <div class="vue-card overflow-hidden">
    <div class="flex items-center gap-2 px-4 py-2 bg-surface-light border-b border-surface-border">
      <span class="w-2 h-2 rounded-full bg-vue-green animate-vue-pulse" />
      <span class="text-[11px] text-text-muted">{{ title }}</span>
    </div>
    <div class="p-5">
      <!-- slot = donde va el contenido hijo -->
      <slot />
    </div>
  </div>
</template>