import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CategoriesPage from '../views/CategoriesPage.vue'
import CategoryPage from '../views/CategoryPage.vue'
import ArticlePage from '../views/ArticlePage.vue'
import UploadPage from '../views/UploadPage.vue'
import SearchPage from '../views/SearchPage.vue'
import NoPage from '../views/NoPage.vue'
import LogIn from '../views/LogInPage.vue'
import 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth'



Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/404',
    name: 'NoPage',
    component: NoPage
  },
  {
    path: '/categories',
    name: 'CategoriesPage',
    component: CategoriesPage
  },
  {
    path: '/category/:id',
    name: 'CategoryPage',
    component: CategoryPage
  },
  {
    path: '/article/:cId/:id',
    name: 'ArticlePage',
    component: ArticlePage
  },
  {
    path: '/upload',
    name: 'UploadPage',
    component: UploadPage,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
};

router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("No access!");
      next("/login");
    }
  }else{
    next();
  }
});
export default router
