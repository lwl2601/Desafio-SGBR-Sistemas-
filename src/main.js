import {createPinia} from 'pinia';
import {LocalStorage, Quasar} from 'quasar';
import {createApp} from 'vue';
import App from './App.vue';
import router from './router';

// Import Quasar css
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

// Import Tailwind css
import './css/tailwind.css';

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    LocalStorage,
  },
});
app.use(createPinia());
app.use(router);

app.mount('#app');
