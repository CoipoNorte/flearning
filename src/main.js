/*
  main.js — Punto de entrada de Vue 3
  
  createApp() crea la instancia de Vue
  .mount('#app') la conecta al div#app del HTML
  
  Equivalente en React:
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
*/
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')