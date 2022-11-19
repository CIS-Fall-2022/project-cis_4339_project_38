import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'
import VueAxios from 'vue-axios'

const app = createApp(App);
app.use(router);
app.mount('#app');

Vue.config.errorHandler = (msg, vm, info)  => {
    alert(info)
}
