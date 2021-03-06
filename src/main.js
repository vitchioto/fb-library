import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { setupI18n } from './i18n';
import { setupRouter } from './router';
import store from './store';
import sk from './locales/sk.json';

const i18n = setupI18n({
  globalInjection: true,
  legacy: false,
  locale: 'sk',
  fallbackLocale: 'sk',
  messages: {
    sk,
  },
});

const router = setupRouter(i18n);

createApp(App)
.use(store)
.use(router)
.use(i18n)
.mount('#app');
