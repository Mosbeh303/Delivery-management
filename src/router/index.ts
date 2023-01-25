import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/plans',
    name:'home',
   
  
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue'),
  
  },
  {
    path: '/showPlan/:id',
    name:'showPlan',
    component: () => import('../components/showPlan.vue'),
    
    
  },

 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
