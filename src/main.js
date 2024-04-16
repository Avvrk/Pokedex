import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import { router } from './routes/routes.js'
import './style.css'
import App from './App.vue'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(Quasar, {
    plugins: {
        Notify
    }
})
app.use(router)

app.mount('#app')
