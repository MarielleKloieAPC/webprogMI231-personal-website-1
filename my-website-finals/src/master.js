import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import Home from './components/Home.vue'

const app = createApp(App)

app.use(router)
app.component('home', Home)

app.mount('#app')