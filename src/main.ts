import { createApp } from 'vue'
import { Loading, Notify, Quasar } from 'quasar'
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

// Escuchar los mensajes enviados desde content.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'element-selected') {
    app.config.globalProperties.$selectedElement = {
      classes: message.classes,
      id: message.id,
    }
  }
})

app.use(VueAxios, axios)

app.use(createPinia())
app.mount('#app')
