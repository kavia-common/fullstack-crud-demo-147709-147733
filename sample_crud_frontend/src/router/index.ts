import { createRouter, createWebHistory } from 'vue-router'
import CrudListView from '../views/CrudListView.vue'
import CrudEditView from '../views/CrudEditView.vue'
import CrudCreateView from '../views/CrudCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CrudListView,
    },
    {
      path: '/create',
      name: 'create',
      component: CrudCreateView,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: CrudEditView,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/"
    }
  ],
})

export default router
