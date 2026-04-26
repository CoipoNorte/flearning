import { defineComponent, h } from 'vue'
import CodeBlock from '../components/ui/CodeBlock.vue'
import VueCard from '../components/ui/VueCard.vue'

function topic(fn) { return defineComponent({ render: fn() }) }

const TsIntro = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-ts-blue' }, '📖 ¿Qué es TypeScript?'),
    h('p', { class: 'text-sm text-text-secondary' }, [
      h('span', { class: 'text-ts-blue font-medium' }, 'JavaScript con tipos'),
      '. Detecta errores ANTES de ejecutar.',
    ]),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(VueCard, { title: '¿Por qué?', icon: '🔷', variant: 'ts' }, () =>
        h('ul', { class: 'space-y-1.5 text-xs' }, [
          h('li', null, '✅ Errores en tiempo real'),
          h('li', null, '✅ Autocompletado inteligente'),
          h('li', null, '✅ Refactoring seguro'),
          h('li', null, '✅ Documentación viva'),
          h('li', null, '✅ Estándar de la industria'),
        ])
      ),
      h(CodeBlock, { title: 'JS vs TS', language: 'ts', code: `// JavaScript — error en runtime 💥
function greet(name) {
  return "Hello " + name.toUpperCase()
}
greet(42)  // crash!

// TypeScript — error en el editor ✅
function greet(name: string): string {
  return "Hello " + name.toUpperCase()
}
greet(42)  // ❌ Argument of type 'number'
greet("Ana")  // ✅ "Hello ANA"` }),
    ]),
  ])
)

const TsTypes = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-ts-blue' }, '🔢 Tipos Básicos'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Tipos', language: 'ts', code: `// Primitivos
let nombre: string = "Ana"
let edad: number = 25
let activo: boolean = true

// Arrays
let nums: number[] = [1, 2, 3]
let names: Array<string> = ["Ana", "Bob"]

// Objetos
let user: { name: string; age: number } = {
  name: "Ana", age: 25
}

// Union (uno u otro)
let id: string | number = "abc"
id = 123  // también OK

// Literal types
let dir: "up" | "down" | "left" | "right" = "up"

// Inferencia (TS adivina)
let x = 42        // number
let y = "hola"    // string

// any (evitar) vs unknown (seguro)
let a: any = "hola"     // ❌ pierde tipado
let b: unknown = "hola" // ✅ hay que verificar
if (typeof b === "string") b.toUpperCase()

// void (sin retorno) y never (nunca retorna)
function log(msg: string): void { console.log(msg) }
function error(msg: string): never { throw new Error(msg) }` }),
      h(VueCard, { title: 'Cheatsheet', icon: '📋', variant: 'ts' }, () =>
        h('div', { class: 'space-y-1 text-xs font-code' }, [
          h('div', { class: 'flex justify-between' }, ['string', h('span', { class: 'text-ts-blue' }, '"hola"')]),
          h('div', { class: 'flex justify-between' }, ['number', h('span', { class: 'text-ts-blue' }, '42')]),
          h('div', { class: 'flex justify-between' }, ['boolean', h('span', { class: 'text-ts-blue' }, 'true')]),
          h('div', { class: 'flex justify-between' }, ['string[]', h('span', { class: 'text-ts-blue' }, '["a","b"]')]),
          h('div', { class: 'flex justify-between' }, ['A | B', h('span', { class: 'text-ts-blue' }, 'union')]),
          h('div', { class: 'flex justify-between' }, ['any', h('span', { class: 'text-red-400' }, '❌ evitar')]),
          h('div', { class: 'flex justify-between' }, ['unknown', h('span', { class: 'text-vue-green' }, '✅ seguro')]),
        ])
      ),
    ]),
  ])
)

const TsInterfaces = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-ts-blue' }, '📋 Interfaces y Types'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Interface vs Type', language: 'ts', code: `// ── INTERFACE = forma de un objeto ──
interface User {
  id: number
  name: string
  email: string
  age?: number           // ? = opcional
  readonly createdAt: string  // no se puede cambiar
}

const user: User = { id: 1, name: "Ana", email: "a@b.com", createdAt: "2024" }

// Extender interface
interface Admin extends User {
  role: "admin" | "superadmin"
  permissions: string[]
}

// ── TYPE = más flexible ──
type ID = string | number
type Status = "active" | "inactive" | "banned"
type Point = { x: number; y: number }

// Type con union
type Response = 
  | { success: true; data: User }
  | { success: false; error: string }

// ── ¿CUÁL USAR? ──
// interface → para objetos y clases (extensible)
// type → para unions, aliases, tipos complejos

// ── UTILITY TYPES ──
type Partial<User>     // todas las props opcionales
type Required<User>    // todas requeridas
type Readonly<User>    // todas readonly
type Pick<User, 'name' | 'email'>  // solo esas
type Omit<User, 'id'>              // todas menos esa
type Record<string, number>         // { [key]: number }` }),
      h(VueCard, { title: 'interface vs type', icon: '⚔️', variant: 'ts' }, () =>
        h('div', { class: 'space-y-2 text-xs' }, [
          h('div', { class: 'p-2 rounded bg-ts-blue/10 border border-ts-blue/20' }, [
            h('p', { class: 'text-ts-blue font-bold' }, 'interface'),
            h('p', { class: 'text-text-muted' }, 'Objetos y clases. Se puede extender con extends. Puede re-declararse.'),
          ]),
          h('div', { class: 'p-2 rounded bg-surface-light border border-surface-border' }, [
            h('p', { class: 'text-text-primary font-bold' }, 'type'),
            h('p', { class: 'text-text-muted' }, 'Unions, aliases, intersecciones. Más flexible. No re-declarable.'),
          ]),
        ])
      ),
    ]),
  ])
)

const TsFunctions = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-ts-blue' }, '⚙️ Funciones Tipadas'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Funciones con tipos', language: 'ts', code: `// Parámetros y retorno tipados
function greet(name: string): string {
  return \`Hello, \${name}!\`
}

// Arrow function
const add = (a: number, b: number): number => a + b

// Parámetros opcionales
function log(msg: string, level?: string): void {
  console.log(level ? \`[\${level}] \${msg}\` : msg)
}

// Valores por defecto
function createUser(name: string, role: string = "user") { }

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0)
}

// Objeto como parámetro
function createPost({ title, content }: { title: string; content: string }) { }

// Type para función
type Callback = (data: string) => void
function fetchData(url: string, onSuccess: Callback): void { }

// Overloads (múltiples firmas)
function format(value: string): string
function format(value: number): string
function format(value: string | number): string {
  return String(value)
}` }),
      h(VueCard, { title: 'Tips', icon: '💡', variant: 'ts' }, () =>
        h('ul', { class: 'space-y-1.5 text-xs' }, [
          h('li', null, '✅ Siempre tipar parámetros'),
          h('li', null, '✅ Retorno se puede inferir (pero es mejor explícito)'),
          h('li', null, '✅ Usa ? para opcionales, = para defaults'),
          h('li', null, '❌ Evitar any en parámetros'),
        ])
      ),
    ]),
  ])
)

const TsGenerics = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-ts-blue' }, '🔧 Generics'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Funciones y tipos que funcionan con CUALQUIER tipo.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Generics', language: 'ts', code: `// ── SIN GENERICS: repetir código ──
function firstString(arr: string[]): string { return arr[0] }
function firstNumber(arr: number[]): number { return arr[0] }

// ── CON GENERICS: una función para todo ──
function first<T>(arr: T[]): T {
  return arr[0]
}
first<string>(["a", "b"])  // "a" (tipo string)
first<number>([1, 2, 3])   // 1 (tipo number)
first([true, false])        // TS infiere boolean

// ── Interface genérica ──
interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

type UserResponse = ApiResponse<User>
type PostResponse = ApiResponse<Post[]>

// ── Constraints (limitar el tipo) ──
function getLength<T extends { length: number }>(item: T): number {
  return item.length
}
getLength("hola")     // ✅ string tiene .length
getLength([1, 2, 3])  // ✅ array tiene .length
getLength(42)         // ❌ number no tiene .length

// ── Múltiples tipos genéricos ──
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second]
}
pair("Ana", 25)  // [string, number]

// ── Genérics en React/Vue ──
// React: useState<User>(null)
// Vue:   ref<User>(null)` }),
      h(VueCard, { title: '¿Cuándo usar generics?', icon: '🤔', variant: 'ts' }, () =>
        h('ul', { class: 'space-y-1 text-xs' }, [
          h('li', null, '✅ Funciones que funcionan con varios tipos'),
          h('li', null, '✅ Wrappers de API (ApiResponse<T>)'),
          h('li', null, '✅ Colecciones tipadas (List<T>)'),
          h('li', null, '✅ Hooks genéricos (useLocalStorage<T>)'),
        ])
      ),
    ]),
  ])
)

const TsReact = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-ts-blue' }, '⚛️ TypeScript + React / Vue'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'TypeScript + React', language: 'ts', code: `// ── Props con interface ──
interface ButtonProps {
  label: string
  variant?: 'primary' | 'danger'
  onClick: () => void
  children?: React.ReactNode
}

function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  return <button className={variant} onClick={onClick}>{label}</button>
}

// ── useState tipado ──
const [user, setUser] = useState<User | null>(null)
const [items, setItems] = useState<Item[]>([])
const [count, setCount] = useState<number>(0)

// ── useRef tipado ──
const inputRef = useRef<HTMLInputElement>(null)

// ── Eventos tipados ──
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log(e.target.value)
}
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
}` }),
      h(CodeBlock, { title: 'TypeScript + Vue', language: 'vue', code: `<script setup lang="ts">
import { ref, computed } from 'vue'

// ── Interfaces ──
interface User {
  id: number
  name: string
  email: string
}

// ── ref tipado ──
const user = ref<User | null>(null)
const items = ref<string[]>([])
const count = ref<number>(0)

// ── Props tipadas ──
interface Props {
  title: string
  count?: number
  variant?: 'primary' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  variant: 'primary'
})

// ── Emits tipados ──
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}>()

// ── computed tipado (se infiere) ──
const fullName = computed((): string => {
  return user.value?.name ?? 'Anónimo'
})
</script>` }),
    ]),
  ])
)

export const typescriptTopics = {
  'ts-intro':      TsIntro,
  'ts-types':      TsTypes,
  'ts-interfaces': TsInterfaces,
  'ts-functions':  TsFunctions,
  'ts-generics':   TsGenerics,
  'ts-react':      TsReact,
}