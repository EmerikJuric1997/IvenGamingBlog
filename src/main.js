import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'firebase/compat/auth'
import "firebase/compat/firestore"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import AOS from "aos"; 
import "aos/dist/aos.css";
import VueHead from 'vue-head'
import { getAnalytics } from "firebase/analytics";


Vue.config.productionTip = false

const firebaseConfig = {
//firebase config..
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase
const db = getFirestore(app);
const storage = getStorage(app);
export {
  db,
  storage,
  analytics
}
Vue.use(VueHead);


new Vue({
  created() {AOS.init();},
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
