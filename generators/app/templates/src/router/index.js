import Vue from 'vue';
import Router from 'vue-router';
import layout from '@/components/layout.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout
    }
  ]
});
