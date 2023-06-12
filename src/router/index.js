import { createRouter, createWebHashHistory } from 'vue-router';
import login from '../view/loginView.vue';
import store from "../store";

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../view/homeView.vue'),
    children: [
      {
        path: '/home/welcome',
        name: 'welcome',
        component: () => import('../view/welcomeView.vue'),
      },
      {
        path: '/home/typeMgr',
        name: 'typeMgr',
        component: () => import('../view/typeMgrView.vue'),
      },
      {
        path: '/home/articleMgr',
        name: 'articleMgr',
        component: () => import('../view/articleMgr.vue'),
      },
    ]
  },
  {
    path: '/userHome',
    name: 'userHome',
    component: () => import('../view/userHomeView.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


// router.beforeEach((to, from, next) => {
//   let token = store.state.token;
//   if (token == null) {
//     if (to.name == "/") {
//       next();
//     } else {
//       alert("你还未登录，请先前往登录。。。");
//       router.push('/');
//     }
//   } else {
//     next();
//   }
// });

export default router;
