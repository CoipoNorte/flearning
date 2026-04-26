<!--
  CodeBlock.vue — Bloque de código con botón copiar
  
  En Vue usamos:
  - defineProps() en vez de function Component({ props })
  - ref() en vez de useState()
  - @click en vez de onClick
  - v-if en vez de {condición && ...}
  - :class en vez de className={dinámico}
-->
<script setup>
import { ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'

// defineProps = declarar las props que recibe
const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, default: 'js' },
  title: { type: String, default: '' }
})

// ref() = useState() — crea valor reactivo
const copied = ref(false)

const langColors = {
  vue: 'text-vue-green',
  svelte: 'text-svelte-orange',
  ts: 'text-ts-blue',
  typescript: 'text-ts-blue',
  scss: 'text-sass-pink',
  sass: 'text-sass-pink',
  js: 'text-yellow-400',
  html: 'text-orange-400',
  css: 'text-blue-400',
  bash: 'text-vue-green',
  json: 'text-yellow-500',
}

function handleCopy() {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="vue-card overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2 bg-surface-light border-b border-surface-border">
      <div class="flex items-center gap-2.5">
        <div class="flex gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span class="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span class="text-[11px] text-text-muted font-code">
          {{ title || `file.${language}` }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span :class="langColors[language] || 'text-text-muted'" class="text-[10px] font-code">
          {{ language }}
        </span>
        <button @click="handleCopy"
          class="p-1 rounded hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors">
          <!-- v-if / v-else = renderizado condicional -->
          <Check v-if="copied" :size="12" class="text-vue-green" />
          <Copy v-else :size="12" />
        </button>
      </div>
    </div>
    <!-- Code -->
    <div class="p-4 overflow-x-auto" style="background: #161b22">
      <pre class="font-code text-[13px] leading-relaxed"><code class="text-text-primary/90">{{ code.trim() }}</code></pre>
    </div>
  </div>
</template>