import { defineComponent, h } from 'vue'
import CodeBlock from '../components/ui/CodeBlock.vue'
import VueCard from '../components/ui/VueCard.vue'

function topic(fn) { return defineComponent({ render: fn() }) }

const SassIntro = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-sass-pink' }, '📖 ¿Qué es Sass?'),
    h('p', { class: 'text-sm text-text-secondary' }, [
      h('span', { class: 'text-sass-pink font-medium' }, 'Preprocesador CSS'),
      ' que agrega variables, nesting, mixins y funciones.',
    ]),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(VueCard, { title: '¿Por qué Sass?', icon: '💎', variant: 'sass' }, () =>
        h('ul', { class: 'space-y-1.5 text-xs' }, [
          h('li', null, '✅ Nesting — CSS anidado limpio'),
          h('li', null, '✅ Mixins — bloques reutilizables'),
          h('li', null, '✅ Functions — calcular valores'),
          h('li', null, '✅ Partials — dividir en archivos'),
          h('li', null, '✅ Loops — generar CSS'),
          h('li', null, '⚠️ Con CSS moderno + Tailwind, menos necesario'),
        ])
      ),
      h(CodeBlock, { title: 'Instalar', language: 'bash', code: `# En proyecto Vite
npm install -D sass
# Ya puedes usar .scss — Vite compila automáticamente` }),
    ]),
  ])
)

const SassFeatures = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-sass-pink' }, '🎨 Variables y Nesting'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Variables y nesting', language: 'scss', code: `// Variables
$primary: #42b883;
$dark: #35495e;
$radius: 8px;

// Nesting
.card {
  padding: 1rem;
  border-radius: $radius;

  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

  h2 {
    color: $dark;
    span { color: $primary; }
  }

  // BEM con &
  &-header { border-bottom: 1px solid #eee; }
  &.active { border-color: $primary; }
}

// Operaciones
.container {
  width: 100% - 2rem;
  padding: $radius * 2;
}` }),
      h('div', { class: 'space-y-4' }, [
        h(VueCard, { title: '$sass vs --css', icon: '⚔️', variant: 'sass' }, () =>
          h('ul', { class: 'space-y-1.5 text-xs' }, [
            h('li', null, [h('span', { class: 'text-sass-pink' }, '$var'), ' — Compiletime. No existe en runtime.']),
            h('li', null, [h('span', { class: 'text-blue-400' }, '--var'), ' — Runtime. Manipulable con JS.']),
            h('li', { class: 'text-text-muted mt-1' }, 'CSS vars son suficientes para la mayoría de casos hoy.'),
          ])
        ),
        h(VueCard, { title: 'Regla del nesting', icon: '⚠️', variant: 'yellow' }, () =>
          h('p', { class: 'text-xs' }, 'No anidar más de 3 niveles. Genera selectores demasiado específicos y difíciles de mantener.')
        ),
      ]),
    ]),
  ])
)

const SassMixins = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-sass-pink' }, '🔧 Mixins y Functions'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Mixins', language: 'scss', code: `// ── MIXIN = bloque CSS reutilizable ──
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero { @include flex-center; height: 100vh; }
.card { @include flex-center; gap: 1rem; }

// Mixin con parámetros
@mixin button($bg, $color: white) {
  background: $bg;
  color: $color;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: darken($bg, 10%); }
}

.btn-primary { @include button(#42b883); }
.btn-danger  { @include button(#e74c3c); }
.btn-dark    { @include button(#333, #fff); }

// Mixin responsive
@mixin mobile { @media (max-width: 768px) { @content; } }
@mixin tablet { @media (max-width: 1024px) { @content; } }

.grid {
  grid-template-columns: repeat(3, 1fr);
  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include mobile { grid-template-columns: 1fr; }
}` }),
      h(CodeBlock, { title: 'Functions y loops', language: 'scss', code: `// ── FUNCTIONS = retornan un valor ──
@function rem($px) {
  @return $px / 16 * 1rem;
}

h1 { font-size: rem(32); }  // 2rem
p  { font-size: rem(14); }  // 0.875rem

// ── EACH = loop sobre lista ──
$colors: (
  primary: #42b883,
  danger: #e74c3c,
  warning: #f39c12,
  info: #3498db,
);

@each $name, $color in $colors {
  .text-#{$name} { color: $color; }
  .bg-#{$name} { background: $color; }
  .border-#{$name} { border-color: $color; }
}
// Genera: .text-primary, .bg-primary, etc.

// ── FOR = loop numérico ──
@for $i from 1 through 6 {
  .mt-#{$i} { margin-top: $i * 0.25rem; }
}
// Genera: .mt-1 { 0.25rem } ... .mt-6 { 1.5rem }

// ── IF/ELSE ──
@mixin theme($mode) {
  @if $mode == dark {
    background: #1a1a2e; color: white;
  } @else {
    background: white; color: #333;
  }
}` }),
    ]),
  ])
)

const SassModules = topic(() => () =>
  h('div', { class: 'space-y-5' }, [
    h('h2', { class: 'text-lg font-bold text-sass-pink' }, '📦 Módulos y Partials'),
    h('p', { class: 'text-sm text-text-secondary' }, 'Dividir estilos en archivos organizados.'),
    h('div', { class: 'grid lg:grid-cols-2 gap-4' }, [
      h(CodeBlock, { title: 'Estructura modular', language: 'scss', code: `// ── PARTIALS = archivos que empiezan con _ ──
// No se compilan solos, solo cuando se importan

// _variables.scss
$primary: #42b883;
$dark: #35495e;
$radius: 8px;

// _mixins.scss
@mixin flex-center { display: flex; justify-content: center; align-items: center; }
@mixin button($bg) { background: $bg; padding: 8px 16px; border-radius: 4px; }

// _reset.scss
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// _buttons.scss
@use 'variables' as v;
@use 'mixins' as m;

.btn-primary { @include m.button(v.$primary); }

// ── MAIN FILE (style.scss) ──
@use 'variables';
@use 'mixins';
@use 'reset';
@use 'buttons';
@use 'cards';
@use 'layout';

// ── @use vs @import ──
// @use = moderno, con namespace, recomendado
// @import = deprecated, evitar

// ── @forward = re-exportar ──
// _index.scss
@forward 'variables';
@forward 'mixins';
// Ahora: @use 'carpeta' trae todo` }),
      h('div', { class: 'space-y-4' }, [
        h(VueCard, { title: 'Estructura recomendada', icon: '📁', variant: 'sass' }, () =>
          h('pre', { class: 'text-[10px] font-code text-text-muted' }, `styles/
├── _variables.scss    ← colores, tamaños
├── _mixins.scss       ← mixins reutilizables
├── _reset.scss        ← reset/normalize
├── _typography.scss   ← fuentes
├── _buttons.scss      ← componente
├── _cards.scss        ← componente
├── _layout.scss       ← grid, container
└── style.scss         ← importa todo`)
        ),
        h(VueCard, { title: '🎓 ¡Frontend completado!', icon: '🏆', variant: 'green' }, () =>
          h('ul', { class: 'space-y-1 text-xs' }, [
            h('li', null, [h('span', { class: 'text-vue-green' }, '✓'), ' Vue 3 — Composition API']),
            h('li', null, [h('span', { class: 'text-vue-green' }, '✓'), ' Svelte — Compilador reactivo']),
            h('li', null, [h('span', { class: 'text-vue-green' }, '✓'), ' TypeScript — Tipos seguros']),
            h('li', null, [h('span', { class: 'text-vue-green' }, '✓'), ' Sass — CSS con superpoderes']),
            h('li', { class: 'text-text-muted mt-2' }, '¡Ahora dominas el frontend moderno! 🚀'),
          ])
        ),
      ]),
    ]),
  ])
)

export const sassTopics = {
  'sass-intro':    SassIntro,
  'sass-features': SassFeatures,
  'sass-mixins':   SassMixins,
  'sass-modules':  SassModules,
}