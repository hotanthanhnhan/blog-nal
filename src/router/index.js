import { createRouter, createWebHistory } from 'vue-router'
import Management from "@/components/management/management.vue";
import Home from "@/views/home/home.vue";
import NotFound from "@/components/error/404.vue";
import BlogDetail from "@/views/blog/blog-detail.vue";
import Login from "@/views/login/login.vue";
import Register from "@/views/register/register.vue";
import Profile from "@/views/profile/profile.vue";



const router = createRouter({
  history: createWebHistory("blog"),
  routes: [
    {
      path: '/management',
      name: 'Management',
      component: Management,
      meta: {
        isLogin: true,
        authorities: []
      },
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
          meta: {
            title: "Home page",
          },
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: {
            title: "Login",
          },
        },
        {
          path: '/register',
          name: 'Register',
          component: Register,
          meta: {
            title: "Register",
          },
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          meta: {
            title: "Profile",
          },
        },
        {
          path: '/blogs/:id',
          name: 'BlogDetail',
          component: BlogDetail,
          meta: {
            title: "Blog Detail",
          },
          props: true
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        error: true,
        title: 'Page not found',
        authorities: []
      },
    },
  ]
})


router.beforeEach((to, from, next) => {
  if(to.name === 'Management') {
    next('/');
  } else {
    next();
  }
  document.title = to.meta.title;
});

export default router
