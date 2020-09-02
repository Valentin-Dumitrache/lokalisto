import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/app-home'
import Campaign from '../pages/app-campaign'
import FormerCampaigns from '../pages/app-former-campaigns'
import UserProfile from '../pages/app-user-profile'
import Verify from '../pages/app-verify'
import Terms from '../pages/app-terms-and-conditions'
import Success from '../pages/app-success'
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/campaign/:id',
    name: 'campaign',
    component: Campaign
  },
  {
    path: '/former-campaigns',
    name: 'formerCampaigns',
    component: FormerCampaigns
  },
  {
    path: '/coupons',
    name: 'coupons',
    beforeEnter: authGuard,
    component: UserProfile
  },
  {
    path: '/verify',
    name: 'verify',
    beforeEnter: authGuard,
    component: Verify
  },
  {
    path: '/terms&conditions',
    name: 'terms',
    component: Terms
  },
  {
    path: '/success/:id',
    name: 'success',
    component: Success
  }
 ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
