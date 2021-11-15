import { createApp } from 'vue'
import App from './App.vue'
import { MyHighlightDirective } from '@/directives/HighlightDirective.js'
//import { router } from './router/router.js' 
import store from './store/store.js'

createApp(App)
  .directive('highlight', MyHighlightDirective)
  //.use(router)
  .use(store)
  .mount('#app');
  
  
