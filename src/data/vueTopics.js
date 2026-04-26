import { defineComponent, h } from 'vue'
import CodeBlock from '../components/ui/CodeBlock.vue'
import LiveDemo from '../components/ui/LiveDemo.vue'
import VueCard from '../components/ui/VueCard.vue'

function topic(fn) { return defineComponent({ render: fn() }) }

// ══════════════════════════════════════════
// 01: Qué es Vue
// ══════════════════════════════════════════
const VueIntro = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '📖 ¿Qué es Vue 3?'),
    h('p', { class: 'text-sm text-text-secondary' }, [
      'Vue es un framework ', h('span', { class: 'text-vue-green font-medium' }, 'progresivo'),
      ' para construir interfaces. Úsalo poco o mucho.',
    ]),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h('div', { class: 'space-y-4' }, [
        h(VueCard, { title: '¿Por qué Vue?', icon: '🟢', variant: 'vue' }, () =>
          h('ul', { class: 'space-y-1.5 text-xs' }, [
            h('li', null, '✅ Curva de aprendizaje suave'),
            h('li', null, '✅ Progresivo — escalable'),
            h('li', null, '✅ Composition API — similar a hooks'),
            h('li', null, '✅ SFC — HTML+JS+CSS en un archivo'),
            h('li', null, '✅ Más rápido que React en benchmarks'),
            h('li', null, '✅ Mejor documentación del frontend'),
          ])
        ),
        h(VueCard, { title: 'Ecosistema', icon: '🌍', variant: 'vue' }, () =>
          h('ul', { class: 'space-y-1 text-xs' }, [
            h('li', null, '🟢 Vue 3 — Core'),
            h('li', null, '🗺️ Vue Router — SPA routing'),
            h('li', null, '🍍 Pinia — Estado global'),
            h('li', null, '⚡ Vite — Build tool'),
            h('li', null, '📱 Nuxt 3 — Meta-framework'),
          ])
        ),
      ]),
      h('div', { class: 'space-y-4' }, [
        h(CodeBlock, { title: 'Primer componente', language: 'vue', code: `<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref('Vue Developer')
</script>

<template>
  <h1>Hola, {{ name }}!</h1>
  <p>Contador: {{ count }}</p>
  <button @click="count++">+1</button>
</template>

<style scoped>
h1 { color: #42b883; }
</style>` }),
        h(VueCard, { title: 'Vue vs React', icon: '⚔️', variant: 'default' }, () =>
          h('ul', { class: 'space-y-1 text-xs' }, [
            h('li', null, [h('span', { class: 'text-vue-green' }, 'ref()'), ' = useState()']),
            h('li', null, [h('span', { class: 'text-vue-green' }, '@click'), ' = onClick']),
            h('li', null, [h('span', { class: 'text-vue-green' }, 'v-if'), ' = {cond && <C />}']),
            h('li', null, [h('span', { class: 'text-vue-green' }, 'v-for'), ' = .map()']),
            h('li', null, [h('span', { class: 'text-vue-green' }, '<slot>'), ' = {children}']),
            h('li', null, [h('span', { class: 'text-vue-green' }, 'emit()'), ' = callback prop']),
            h('li', null, [h('span', { class: 'text-vue-green' }, 'computed()'), ' = useMemo()']),
            h('li', null, [h('span', { class: 'text-vue-green' }, 'watch()'), ' = useEffect()']),
          ])
        ),
      ]),
    ]),
  ])
)

// ══════════════════════════════════════════
// 02: Setup y SFC
// ══════════════════════════════════════════
const VueSetup = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '🚀 Setup y SFC'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Crear proyecto y entender archivos .vue'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h('div', { class: 'space-y-4' }, [
        h(CodeBlock, { title: 'Terminal', language: 'bash', code: `npm create vue@latest mi-app
cd mi-app
npm install
npm run dev` }),
        h(VueCard, { title: 'Estructura', icon: '📁', variant: 'default' }, () =>
          h('pre', { class: 'text-[10px] font-code text-text-muted' }, `src/
├── App.vue          ← raíz
├── main.js          ← entrada
├── components/      ← componentes
├── views/           ← páginas
├── router/          ← rutas
└── stores/          ← Pinia`)
        ),
      ]),
      h(CodeBlock, { title: 'Anatomía .vue', language: 'vue', code: `<!-- 1. SCRIPT: lógica -->
<script setup>
import { ref, computed } from 'vue'

const nombre = ref('Ana')
const edad = ref(25)
const esMayor = computed(() => edad.value >= 18)
</script>

<!-- 2. TEMPLATE: HTML -->
<template>
  <h1>{{ nombre }}</h1>
  <p v-if="esMayor">Mayor de edad ✓</p>
  <button @click="edad++">Cumplir</button>
</template>

<!-- 3. STYLE: CSS (scoped = solo este comp) -->
<style scoped>
h1 { color: #42b883; }
</style>` }),
    ]),
  ])
)

// ══════════════════════════════════════════
// 03: Templates y directivas
// ══════════════════════════════════════════
const VueTemplate = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '📝 Templates y Directivas'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Las directivas de Vue controlan el HTML dinámicamente.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Directivas principales', language: 'vue', code: `<template>
  <!-- {{ }} = mostrar datos -->
  <h1>{{ titulo }}</h1>
  <p>{{ nombre.toUpperCase() }}</p>
  <p>{{ edad >= 18 ? 'Mayor' : 'Menor' }}</p>

  <!-- v-if / v-else-if / v-else = condicional -->
  <p v-if="edad >= 18">Adulto</p>
  <p v-else-if="edad >= 13">Adolescente</p>
  <p v-else>Niño</p>

  <!-- v-show = toggle display (no desmonta) -->
  <p v-show="visible">Se oculta con display:none</p>

  <!-- v-for = loop (SIEMPRE con :key) -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.nombre }}
    </li>
  </ul>

  <!-- v-for con index -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }}: {{ item.nombre }}
  </li>

  <!-- v-bind = pasar datos dinámicos (shortcut :) -->
  <img :src="imageUrl" :alt="imageAlt">
  <div :class="{ active: isActive, error: hasError }">
  <div :style="{ color: textColor, fontSize: size + 'px' }">

  <!-- v-on = eventos (shortcut @) -->
  <button @click="handleClick">Click</button>
  <button @click="count++">Inline</button>
  <input @input="onInput" @keyup.enter="onEnter">
  <form @submit.prevent="onSubmit">

  <!-- v-model = two-way binding (input ↔ estado) -->
  <input v-model="nombre">
  <textarea v-model="mensaje"></textarea>
  <select v-model="pais">
    <option value="es">España</option>
    <option value="mx">México</option>
  </select>
  <input type="checkbox" v-model="acepta">
</template>` }),
      h('div', { class: 'space-y-4' }, [
        h(VueCard, { title: 'v-if vs v-show', icon: '🔀', variant: 'vue' }, () =>
          h('ul', { class: 'space-y-1.5 text-xs' }, [
            h('li', null, [h('span', { class: 'text-vue-green font-bold' }, 'v-if'), ' — Monta/desmonta el elemento. Usar para cosas que cambian poco.']),
            h('li', null, [h('span', { class: 'text-vue-green font-bold' }, 'v-show'), ' — Solo toggle display:none. Usar para toggle frecuente.']),
          ])
        ),
        h(VueCard, { title: 'Modificadores de eventos', icon: '⚡', variant: 'default' }, () =>
          h('ul', { class: 'space-y-1 text-xs' }, [
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '.prevent'), ' — e.preventDefault()']),
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '.stop'), ' — e.stopPropagation()']),
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '.enter'), ' — solo tecla Enter']),
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '.ctrl'), ' — solo con Ctrl']),
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '.once'), ' — ejecutar solo 1 vez']),
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '.self'), ' — solo el elemento exacto']),
          ])
        ),
        h(VueCard, { title: 'v-model modifiers', icon: '📝', variant: 'default' }, () =>
          h('ul', { class: 'space-y-1 text-xs' }, [
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '.trim'), ' — quitar espacios']),
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '.number'), ' — convertir a número']),
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '.lazy'), ' — actualizar en change, no input']),
          ])
        ),
      ]),
    ]),
  ])
)

// ══════════════════════════════════════════
// 04: Reactividad
// ══════════════════════════════════════════
const VueReactivity = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '⚡ Reactividad'),
    h('p', { class: 'text-sm text-text-secondary' }, 'ref() y reactive() son el corazón de Vue 3.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'ref y reactive', language: 'vue', code: `<script setup>
import { ref, reactive, toRefs } from 'vue'

// ── ref() = valores primitivos ──
// Accedes con .value en script
// En template NO necesitas .value
const count = ref(0)
const name = ref('Ana')
const isActive = ref(true)

count.value++        // en script: .value
console.log(count.value)  // 1

// ── reactive() = objetos/arrays ──
// NO necesita .value nunca
const user = reactive({
  name: 'Ana',
  age: 25,
  skills: ['Vue', 'JS']
})

user.name = 'Ana García'   // directo
user.skills.push('TS')     // directo

// ── ref vs reactive ──
// ref:      primitivos + .value
// reactive: objetos + directo
// CONSEJO: usa ref() para todo, es más consistente

// ── toRefs = desestructurar reactive ──
const { name: userName, age } = toRefs(user)
// Ahora userName y age son ref() individuales

// ── Arrays reactivos ──
const items = ref([])
items.value.push({ id: 1, text: 'Nuevo' })
items.value = items.value.filter(i => i.id !== 1)

// ── READONLY ──
import { readonly } from 'vue'
const original = ref(0)
const copia = readonly(original)
// copia.value++  ← ERROR: es readonly
</script>

<template>
  <!-- En template NO se usa .value -->
  <p>{{ count }}</p>
  <p>{{ name }}</p>
  <p>{{ user.name }} - {{ user.age }}</p>
</template>` }),
      h('div', { class: 'space-y-4' }, [
        h(VueCard, { title: 'ref vs reactive', icon: '📋', variant: 'vue' }, () =>
          h('div', { class: 'space-y-2 text-xs' }, [
            h('div', { class: 'p-2 rounded bg-vue-green/10 border border-vue-green/20' }, [
              h('p', { class: 'text-vue-green font-bold' }, 'ref()'),
              h('p', { class: 'text-text-muted' }, 'Para todo. Usa .value en script. Más consistente.'),
            ]),
            h('div', { class: 'p-2 rounded bg-surface-light border border-surface-border' }, [
              h('p', { class: 'text-text-primary font-bold' }, 'reactive()'),
              h('p', { class: 'text-text-muted' }, 'Para objetos. Sin .value. No se puede reasignar entero.'),
            ]),
          ])
        ),
        h(VueCard, { title: 'Regla de oro', icon: '💡', variant: 'green' }, () =>
          h('p', { class: 'text-xs' }, 'Usa ref() para todo. Es más simple y consistente. reactive() solo si prefieres no escribir .value en objetos.')
        ),
      ]),
    ]),
  ])
)

// ══════════════════════════════════════════
// 05: Componentes
// ══════════════════════════════════════════
const VueComponents = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '🧩 Componentes'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Piezas reutilizables de UI. Un archivo .vue = un componente.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Crear y usar componentes', language: 'vue', code: `<!-- components/MyButton.vue -->
<script setup>
defineProps({
  label: { type: String, default: 'Click' },
  variant: { type: String, default: 'primary' }
})
</script>

<template>
  <button :class="['btn', 'btn-' + variant]">
    <!-- slot = contenido que pasa el padre -->
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped>
.btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; }
.btn-primary { background: #42b883; color: white; }
.btn-danger { background: #e74c3c; color: white; }
</style>

<!-- ═══════════════════════════════════ -->

<!-- App.vue — Usar el componente -->
<script setup>
// En script setup, importar = registrar automáticamente
import MyButton from './components/MyButton.vue'
</script>

<template>
  <!-- Usar como tag HTML -->
  <MyButton />
  <MyButton label="Guardar" variant="primary" />
  <MyButton variant="danger">Eliminar</MyButton>

  <!-- Con slot = contenido entre las etiquetas -->
  <MyButton>
    <span>🚀 Lanzar</span>
  </MyButton>
</template>` }),
      h('div', { class: 'space-y-4' }, [
        h(VueCard, { title: 'Slots (como children)', icon: '📦', variant: 'vue' }, () =>
          h('ul', { class: 'space-y-1.5 text-xs' }, [
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '<slot />'), ' — Slot por defecto']),
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '<slot name="header" />'), ' — Slot nombrado']),
            h('li', null, [h('span', { class: 'text-vue-green font-code' }, '<slot>Fallback</slot>'), ' — Contenido por defecto']),
          ])
        ),
        h(CodeBlock, { title: 'Slots nombrados', language: 'vue', code: `<!-- Card.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">Título default</slot>
    </div>
    <div class="card-body">
      <slot />  <!-- slot default -->
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<!-- Uso -->
<Card>
  <template #header>Mi Título</template>
  <p>Contenido del body</p>
  <template #footer>
    <button>Acción</button>
  </template>
</Card>` }),
      ]),
    ]),
  ])
)

// ══════════════════════════════════════════
// 06: Props y Emits
// ══════════════════════════════════════════
const VueProps = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '📦 Props y Emits'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Props = padre→hijo. Emits = hijo→padre.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Props (recibir datos)', language: 'vue', code: `<!-- UserCard.vue -->
<script setup>
// defineProps = declarar qué recibe
const props = defineProps({
  // Tipo + requerido + default
  nombre: { type: String, required: true },
  edad: { type: Number, default: 0 },
  activo: { type: Boolean, default: true },
  skills: { type: Array, default: () => [] },
  config: { type: Object, default: () => ({}) },
  
  // Validador custom
  rol: {
    type: String,
    validator: (v) => ['admin', 'user', 'mod'].includes(v)
  }
})
</script>

<template>
  <!-- Acceso directo, sin props. -->
  <div>
    <h3>{{ nombre }}</h3>
    <p>Edad: {{ edad }}</p>
    <span v-if="activo" class="badge">Activo</span>
  </div>
</template>

<!-- Uso desde el padre -->
<!-- 
  <UserCard nombre="Ana" :edad="25" :activo="true" />
  
  : (v-bind) para valores que no son string:
  :edad="25" → número
  :activo="true" → boolean
  :skills="['Vue', 'JS']" → array
-->` }),
      h(CodeBlock, { title: 'Emits (enviar eventos)', language: 'vue', code: `<!-- SearchInput.vue -->
<script setup>
// defineEmits = declarar qué eventos emite
const emit = defineEmits(['search', 'clear'])

function handleSearch(e) {
  // emit('nombre', datos)
  emit('search', e.target.value)
}

function handleClear() {
  emit('clear')
}
</script>

<template>
  <div>
    <input @input="handleSearch" placeholder="Buscar...">
    <button @click="handleClear">Limpiar</button>
  </div>
</template>

<!-- Uso en el padre -->
<!--
  <SearchInput 
    @search="handleSearch"
    @clear="handleClear"
  />
  
  @ (v-on) = escuchar el evento emitido
  
  En React esto sería:
  <SearchInput 
    onSearch={handleSearch}
    onClear={handleClear}
  />
-->` }),
    ]),
  ])
)

// ══════════════════════════════════════════
// 07: Lifecycle hooks
// ══════════════════════════════════════════
const VueLifecycle = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '🔄 Lifecycle Hooks'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Ejecutar código en momentos clave del componente.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Lifecycle hooks', language: 'vue', code: `<script setup>
import { 
  onMounted, 
  onUpdated, 
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

// ── onMounted = componentDidMount / useEffect(fn, []) ──
// Se ejecuta DESPUÉS de que el componente se renderiza
onMounted(() => {
  console.log('Componente montado!')
  // Aquí: fetch de datos, iniciar timers, acceder al DOM
})

// ── onUpdated = se ejecuta tras cada re-render ──
onUpdated(() => {
  console.log('Componente actualizado!')
})

// ── onUnmounted = cleanup / return de useEffect ──
// Se ejecuta al destruir el componente
onUnmounted(() => {
  console.log('Componente desmontado!')
  // Aquí: limpiar timers, event listeners, subscripciones
})

// ── EJEMPLO: Timer con cleanup ──
import { ref } from 'vue'

const seconds = ref(0)
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    seconds.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)  // LIMPIAR al desmontar
})
</script>

<template>
  <p>Segundos: {{ seconds }}</p>
</template>` }),
      h(VueCard, { title: 'Orden de ejecución', icon: '📋', variant: 'vue' }, () =>
        h('ol', { class: 'space-y-1.5 text-xs list-decimal pl-4' }, [
          h('li', null, [h('span', { class: 'text-text-muted' }, 'setup()'), ' — Script se ejecuta']),
          h('li', null, [h('span', { class: 'text-vue-green' }, 'onBeforeMount'), ' — Antes de renderizar']),
          h('li', null, [h('span', { class: 'text-vue-green font-bold' }, 'onMounted'), ' — DOM listo (el más usado)']),
          h('li', null, [h('span', { class: 'text-text-muted' }, '... usuario interactúa ...')]),
          h('li', null, [h('span', { class: 'text-yellow-400' }, 'onBeforeUpdate'), ' — Antes de re-render']),
          h('li', null, [h('span', { class: 'text-yellow-400' }, 'onUpdated'), ' — Después de re-render']),
          h('li', null, [h('span', { class: 'text-text-muted' }, '... componente se destruye ...')]),
          h('li', null, [h('span', { class: 'text-red-400' }, 'onBeforeUnmount'), ' — Antes de destruir']),
          h('li', null, [h('span', { class: 'text-red-400 font-bold' }, 'onUnmounted'), ' — Limpieza (cleanup)']),
        ])
      ),
    ]),
  ])
)

// ══════════════════════════════════════════
// 08: Computed y Watch
// ══════════════════════════════════════════
const VueComputed = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '🧮 Computed y Watch'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Valores derivados y reacciones a cambios.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'computed y watch', language: 'vue', code: `<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const firstName = ref('Ana')
const lastName = ref('García')
const items = ref([
  { name: 'Vue', done: true },
  { name: 'Svelte', done: false },
  { name: 'React', done: true },
])

// ── COMPUTED = valor derivado (como useMemo) ──
// Se recalcula automáticamente cuando cambian sus dependencias
// Es de solo lectura
const fullName = computed(() => {
  return \`\${firstName.value} \${lastName.value}\`
})

const doneCount = computed(() => {
  return items.value.filter(i => i.done).length
})

const progress = computed(() => {
  return Math.round((doneCount.value / items.value.length) * 100)
})

// ── WATCH = reacción a cambios (como useEffect) ──
// Se ejecuta cuando cambia el valor observado
watch(firstName, (newVal, oldVal) => {
  console.log(\`Cambió de "\${oldVal}" a "\${newVal}"\`)
})

// Watch múltiples fuentes
watch([firstName, lastName], ([newFirst, newLast]) => {
  console.log(\`Nombre completo: \${newFirst} \${newLast}\`)
})

// Watch profundo (objetos/arrays)
watch(items, (newItems) => {
  localStorage.setItem('items', JSON.stringify(newItems))
}, { deep: true })

// Watch inmediato (ejecutar al crear también)
watch(firstName, (val) => {
  document.title = val
}, { immediate: true })

// ── WATCHEFFECT = watch automático ──
// Detecta dependencias automáticamente
// Similar a useEffect sin array de deps
watchEffect(() => {
  console.log(\`Nombre: \${firstName.value}\`)
  // Se ejecuta cuando firstName cambie
})
</script>

<template>
  <input v-model="firstName">
  <input v-model="lastName">
  <p>{{ fullName }}</p>
  <p>Completados: {{ doneCount }}/{{ items.length }} ({{ progress }}%)</p>
</template>` }),
      h('div', { class: 'space-y-4' }, [
        h(VueCard, { title: 'computed vs watch', icon: '⚔️', variant: 'vue' }, () =>
          h('div', { class: 'space-y-2 text-xs' }, [
            h('div', { class: 'p-2 rounded bg-vue-green/10 border border-vue-green/20' }, [
              h('p', { class: 'text-vue-green font-bold' }, 'computed()'),
              h('p', { class: 'text-text-muted' }, 'Para derivar valores. Cacheado. Sync. Return obligatorio.'),
              h('p', { class: 'text-text-muted' }, 'Ej: fullName, filteredList, total'),
            ]),
            h('div', { class: 'p-2 rounded bg-yellow-500/10 border border-yellow-500/20' }, [
              h('p', { class: 'text-yellow-400 font-bold' }, 'watch()'),
              h('p', { class: 'text-text-muted' }, 'Para side effects. Puede ser async. No return.'),
              h('p', { class: 'text-text-muted' }, 'Ej: fetch datos, guardar en localStorage, analytics'),
            ]),
          ])
        ),
        h(VueCard, { title: 'watchEffect vs watch', icon: '💡', variant: 'default' }, () =>
          h('ul', { class: 'space-y-1 text-xs' }, [
            h('li', null, [h('span', { class: 'text-vue-green' }, 'watch'), ' — Tú dices qué observar explícitamente']),
            h('li', null, [h('span', { class: 'text-vue-green' }, 'watchEffect'), ' — Detecta las dependencias solo']),
          ])
        ),
      ]),
    ]),
  ])
)

// ══════════════════════════════════════════
// 09: Vue Router
// ══════════════════════════════════════════
const VueRouter = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '🗺️ Vue Router'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Navegación entre páginas en una SPA.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'router/index.js', language: 'js', code: `import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: () => import('../views/About.vue') },
  // Lazy loading: se carga solo cuando se visita

  // Ruta con parámetro dinámico
  { path: '/user/:id', component: () => import('../views/User.vue') },

  // Rutas anidadas
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      { path: '', component: () => import('../views/DashHome.vue') },
      { path: 'settings', component: () => import('../views/Settings.vue') },
    ]
  },

  // Ruta 404
  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router` }),
      h(CodeBlock, { title: 'Usar en componentes', language: 'vue', code: `<script setup>
import { useRoute, useRouter } from 'vue-router'

// useRoute = datos de la ruta actual
const route = useRoute()
console.log(route.params.id)    // parámetro :id
console.log(route.query.page)   // ?page=2
console.log(route.path)         // /user/42

// useRouter = navegar programáticamente
const router = useRouter()

function goHome() {
  router.push('/')
}
function goUser(id) {
  router.push(\`/user/\${id}\`)
}
function goBack() {
  router.go(-1)
}
</script>

<template>
  <!-- RouterLink = navegación sin recargar -->
  <nav>
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/about">Acerca</RouterLink>
    <RouterLink :to="\`/user/\${userId}\`">Perfil</RouterLink>
  </nav>

  <!-- RouterView = donde se renderiza la página -->
  <RouterView />

  <!-- RouterLink con clase activa -->
  <RouterLink to="/" active-class="active">Inicio</RouterLink>
</template>` }),
    ]),
  ])
)

// ══════════════════════════════════════════
// 10: Pinia
// ══════════════════════════════════════════
const VuePinia = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-vue-green' }, '🍍 Pinia (Estado Global)'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Pinia es el store oficial de Vue 3. Reemplaza a Vuex.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'stores/counter.js', language: 'js', code: `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// defineStore('id', setupFunction)
// Usa Composition API dentro
export const useCounterStore = defineStore('counter', () => {
  // State (como ref)
  const count = ref(0)
  const name = ref('Vue')

  // Getters (como computed)
  const doubleCount = computed(() => count.value * 2)
  const greeting = computed(() => \`Hola desde \${name.value}\`)

  // Actions (funciones normales)
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = 0
  }

  async function fetchData() {
    const res = await fetch('/api/data')
    const data = await res.json()
    // actualizar state...
  }

  // Retornar lo que quieres exponer
  return { count, name, doubleCount, greeting, increment, decrement, reset, fetchData }
})` }),
      h('div', { class: 'space-y-4' }, [
        h(CodeBlock, { title: 'Usar en componente', language: 'vue', code: `<script setup>
import { useCounterStore } from '../stores/counter'

// Usar el store
const counter = useCounterStore()
// counter.count, counter.increment(), etc.

// Para destructurar y mantener reactividad:
import { storeToRefs } from 'pinia'
const { count, doubleCount } = storeToRefs(counter)
const { increment, reset } = counter
</script>

<template>
  <p>Count: {{ counter.count }}</p>
  <p>Double: {{ counter.doubleCount }}</p>
  <button @click="counter.increment()">+1</button>
  <button @click="counter.reset()">Reset</button>
</template>` }),
        h(VueCard, { title: 'Setup Pinia', icon: '🔧', variant: 'vue' }, () =>
          h('ul', { class: 'space-y-1 text-xs' }, [
            h('li', null, '1. npm install pinia'),
            h('li', null, '2. En main.js: app.use(createPinia())'),
            h('li', null, '3. Crear stores en src/stores/'),
            h('li', null, '4. Usar con useStore() en componentes'),
          ])
        ),
        h(VueCard, { title: '🎓 ¡Vue completado!', icon: '🏆', variant: 'green' }, () =>
          h('p', { class: 'text-xs' }, 'Con estos 10 temas dominas Vue 3. Ahora explora Svelte, TypeScript y Sass.')
        ),
      ]),
    ]),
  ])
)

export const vueTopics = {
  'vue-intro':      VueIntro,
  'vue-setup':      VueSetup,
  'vue-template':   VueTemplate,
  'vue-reactivity': VueReactivity,
  'vue-components': VueComponents,
  'vue-props':      VueProps,
  'vue-lifecycle':  VueLifecycle,
  'vue-computed':   VueComputed,
  'vue-router':     VueRouter,
  'vue-pinia':      VuePinia,
}