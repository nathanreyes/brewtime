import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/base.css';
import { router } from '@/router';
import directives from '@/directives';

createApp(App).use(router).use(directives).mount('#app');
