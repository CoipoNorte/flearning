import { defineComponent, h } from 'vue'
import CodeBlock from '../components/ui/CodeBlock.vue'
import VueCard from '../components/ui/VueCard.vue'

function topic(fn) { return defineComponent({ render: fn() }) }

const SvIntro = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-svelte-orange' }, '📖 ¿Qué es Svelte?'),
    h('p', { class: 'text-sm text-text-secondary' }, [
      'Svelte es un ', h('span', { class: 'text-svelte-orange font-medium' }, 'compilador'),
      '. Convierte componentes en JS vanilla. Sin virtual DOM.',
    ]),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(VueCard, { title: '¿Por qué Svelte?', icon: '🔥', variant: 'svelte' }, () =>
        h('ul', { class: 'space-y-1.5 text-xs' }, [
          h('li', null, '✅ Sin virtual DOM — actualiza directo'),
          h('li', null, '✅ 40% menos código que React'),
          h('li', null, '✅ Reactividad nativa — sin hooks'),
          h('li', null, '✅ Bundle más pequeño'),
          h('li', null, '✅ Animaciones built-in'),
        ])
      ),
      h(CodeBlock, { title: 'App.svelte', language: 'svelte', code: `<script>
  let count = 0
  let name = 'Svelte Dev'
  $: doubled = count * 2
</script>

<h1>Hola, {name}!</h1>
<p>Contador: {count} (doble: {doubled})</p>
<button on:click={() => count++}>+1</button>

<style>
  h1 { color: #ff3e00; }
</style>` }),
    ]),
  ])
)

const SvBasics = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-svelte-orange' }, '✏️ Sintaxis Básica'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Reactividad', language: 'svelte', code: `<script>
  let name = 'mundo'
  let count = 0

  $: uppercased = name.toUpperCase()
  $: isEven = count % 2 === 0
  $: if (count > 10) console.log('¡Mucho!')
</script>

<input bind:value={name} />
<p>{uppercased}</p>
<button on:click={() => count++}>
  {count} {isEven ? '(par)' : '(impar)'}
</button>` }),
      h(CodeBlock, { title: 'Lógica', language: 'svelte', code: `{#if count > 10}
  <p>Más de 10!</p>
{:else if count > 5}
  <p>Más de 5</p>
{:else}
  <p>Menos de 5</p>
{/if}

{#each items as item (item.id)}
  <li>{item.name}</li>
{/each}

{#await fetchUsers()}
  <p>Cargando...</p>
{:then users}
  {#each users as user}
    <p>{user.name}</p>
  {/each}
{:catch error}
  <p>Error: {error.message}</p>
{/await}` }),
    ]),
  ])
)

const SvReactivity = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-svelte-orange' }, '⚡ Reactividad en Detalle'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Reactividad Svelte', language: 'svelte', code: `<script>
  // Variables = reactivas automáticamente
  let count = 0
  let user = { name: 'Ana', age: 25 }
  let items = ['a', 'b', 'c']

  // Asignación dispara actualización
  count = 10           // ✅ reactivo
  count += 1           // ✅ reactivo
  user.name = 'Bob'    // ✅ reactivo
  user = { ...user, name: 'Bob' }  // ✅ también

  // Arrays: NECESITAN reasignación
  items.push('d')      // ❌ NO reactivo
  items = [...items, 'd']  // ✅ reactivo
  items = items         // ✅ truco: reasignar a sí mismo

  // $: declaraciones reactivas (derivados)
  $: total = items.length
  $: greeting = \`Hola \${user.name}, tienes \${count}\`

  // $: bloques reactivos (side effects)
  $: {
    console.log('count cambió a', count)
    document.title = \`Count: \${count}\`
  }

  // $: con if
  $: if (count > 100) {
    alert('¡Demasiado!')
    count = 0
  }
</script>` }),
      h('div', { class: 'space-y-4' }, [
        h(VueCard, { title: 'Svelte vs Vue vs React', icon: '⚔️', variant: 'svelte' }, () =>
          h('div', { class: 'space-y-2 text-xs' }, [
            h('div', { class: 'p-2 rounded bg-svelte-orange/10 border border-svelte-orange/20' }, [
              h('p', { class: 'font-bold text-svelte-orange' }, 'Svelte'),
              h('p', { class: 'text-text-muted' }, 'let x = 0; x++ (automático)'),
            ]),
            h('div', { class: 'p-2 rounded bg-vue-green/10 border border-vue-green/20' }, [
              h('p', { class: 'font-bold text-vue-green' }, 'Vue'),
              h('p', { class: 'text-text-muted' }, 'const x = ref(0); x.value++'),
            ]),
            h('div', { class: 'p-2 rounded bg-blue-500/10 border border-blue-500/20' }, [
              h('p', { class: 'font-bold text-blue-400' }, 'React'),
              h('p', { class: 'text-text-muted' }, 'const [x, setX] = useState(0); setX(x+1)'),
            ]),
          ])
        ),
        h(VueCard, { title: 'Regla arrays', icon: '⚠️', variant: 'yellow' }, () =>
          h('p', { class: 'text-xs' }, 'En Svelte, mutar un array (push, splice) NO dispara actualización. Debes reasignar: items = [...items, nuevo]')
        ),
      ]),
    ]),
  ])
)

const SvComponents = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-svelte-orange' }, '🧩 Componentes'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Props y eventos', language: 'svelte', code: `<!-- Button.svelte -->
<script>
  // export let = prop
  export let label = 'Click'
  export let variant = 'primary'

  // dispatch = emitir evento al padre
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  function handleClick() {
    dispatch('click', { label })
  }
</script>

<button class="btn {variant}" on:click={handleClick}>
  <slot>{label}</slot>
</button>

<!-- Uso -->
<script>
  import Button from './Button.svelte'
</script>

<Button label="Guardar" variant="primary" on:click={handleSave} />
<Button variant="danger">
  <span>🗑️ Eliminar</span>
</Button>` }),
      h(CodeBlock, { title: 'Slots y lifecycle', language: 'svelte', code: `<!-- Card.svelte con slots -->
<div class="card">
  <slot name="header">Título default</slot>
  <slot />  <!-- default -->
  <slot name="footer" />
</div>

<!-- Uso -->
<Card>
  <svelte:fragment slot="header">
    <h2>Mi Título</h2>
  </svelte:fragment>
  <p>Contenido</p>
</Card>

<!-- Lifecycle -->
<script>
  import { onMount, onDestroy } from 'svelte'

  onMount(() => {
    console.log('Montado!')
    const interval = setInterval(() => count++, 1000)
    return () => clearInterval(interval) // cleanup
  })

  onDestroy(() => {
    console.log('Destruido!')
  })
</script>` }),
    ]),
  ])
)

const SvStores = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-svelte-orange' }, '🗄️ Stores'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Estado compartido entre componentes.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'stores.js', language: 'js', code: `import { writable, readable, derived } from 'svelte/store'

// writable = estado que se puede cambiar
export const count = writable(0)
// count.set(5)
// count.update(n => n + 1)

// readable = estado de solo lectura
export const time = readable(new Date(), (set) => {
  const interval = setInterval(() => set(new Date()), 1000)
  return () => clearInterval(interval)
})

// derived = valor derivado de otros stores
export const doubled = derived(count, $count => $count * 2)

// Store de objeto
export const user = writable({
  name: 'Ana',
  loggedIn: false
})` }),
      h(CodeBlock, { title: 'Usar stores', language: 'svelte', code: `<script>
  import { count, doubled, user } from './stores'

  // $store = auto-subscribe (magia de Svelte)
  // Se actualiza automáticamente
  // Se des-suscribe al destruir el componente
</script>

<!-- $ = valor actual del store -->
<p>Count: {$count}</p>
<p>Double: {$doubled}</p>
<p>User: {$user.name}</p>

<button on:click={() => count.update(n => n + 1)}>+1</button>
<button on:click={() => count.set(0)}>Reset</button>
<button on:click={() => $user.name = 'Bob'}>Cambiar nombre</button>

<!-- bind también funciona con stores -->
<input bind:value={$user.name} />` }),
    ]),
  ])
)

const SvVs = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-svelte-orange' }, '⚔️ Svelte vs React vs Vue'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h('div', { class: 'space-y-4' }, [
        h(VueCard, { title: 'Comparación rápida', icon: '📊', variant: 'default' }, () =>
          h('div', { class: 'space-y-3 text-xs' }, [
            h('div', null, [
              h('p', { class: 'text-svelte-orange font-bold' }, '🔥 Svelte'),
              h('p', { class: 'text-text-muted' }, 'Compilador. Sin runtime. El más rápido. Menos código. Pequeño ecosistema.'),
            ]),
            h('div', null, [
              h('p', { class: 'text-vue-green font-bold' }, '🟢 Vue'),
              h('p', { class: 'text-text-muted' }, 'Progresivo. Fácil de aprender. Gran ecosistema. Excelente DX.'),
            ]),
            h('div', null, [
              h('p', { class: 'text-blue-400 font-bold' }, '⚛️ React'),
              h('p', { class: 'text-text-muted' }, 'El más popular. Enorme ecosistema. JSX. Más jobs. Meta lo mantiene.'),
            ]),
          ])
        ),
      ]),
      h(VueCard, { title: '¿Cuál elegir?', icon: '🤔', variant: 'svelte' }, () =>
        h('ul', { class: 'space-y-1.5 text-xs' }, [
          h('li', null, [h('span', { class: 'text-blue-400' }, 'React'), ' — Quieres más oportunidades laborales']),
          h('li', null, [h('span', { class: 'text-vue-green' }, 'Vue'), ' — Quieres algo fácil y productivo']),
          h('li', null, [h('span', { class: 'text-svelte-orange' }, 'Svelte'), ' — Quieres rendimiento máximo y poco código']),
          h('li', { class: 'text-text-muted mt-2' }, '💡 Consejo: aprende los 3 conceptualmente. Domina 1 para trabajar. Los conceptos son transferibles.'),
        ])
      ),
    ]),
  ])
)

export const svelteTopics = {
  'sv-intro':      SvIntro,
  'sv-basics':     SvBasics,
  'sv-reactivity': SvReactivity,
  'sv-components': SvComponents,
  'sv-stores':     SvStores,
  'sv-vs':         SvVs,
}