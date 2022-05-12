import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'



loadFonts()

createApp(App)
  .use(vuetify)
  .use(VueChartkick)
  .mount('#app')
