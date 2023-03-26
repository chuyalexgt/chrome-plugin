import { createApp } from 'vue'
import { Loading, Notify, Quasar } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import '@quasar/extras/material-icons/material-icons.css'
import '@lottiefiles/lottie-player'
import 'quasar/src/css/index.sass'
import { useMainStore } from './stores/mainStore'

const app = createApp(App)
app.use(Quasar, {
  plugins: {
    Loading,
    Notify,
  },
  config: {
    loading: { /* look at QuasarConfOptions from the API card */ },
    notify: { /* look at QuasarConfOptions from the API card */ },

  },
  boot: [
    // references /src/boot/<name>.js
    'index',
  ],
})

function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

async function tryScrollToAnchor(hash: string, timeout = 1000, delay = 100) {
  while (timeout > 0) {
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      break
    }
    await wait(delay)
    timeout = timeout - delay
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (to.hash) {
      // Required because our <RouterView> is wrapped in a <Transition>
      // So elements are mounted after a delay
      tryScrollToAnchor(to.hash, 1000, 100)
    }
    else if (savedPosition) {
      return savedPosition
    }
    else {
      return { x: 0, y: 0 }
    }
  },

})

router.beforeEach((to, from, next) => {
  if (to.query?.jwt)
    localStorage.setItem('jwtToken', to.query.jwt as any)

  if (to.path !== '/sesionExpirada') {
    const { getUserData } = useMainStore()
    getUserData()
    next()
  }
  else { next() }
})
app.use(VueAxios, axios)

app.use(createPinia())
app.use(router)
app.mount('#app')
