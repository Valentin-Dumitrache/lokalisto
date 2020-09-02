import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VModal from "vue-js-modal";
import { domain, clientId } from "../auth_config.json";
import { Auth0Plugin } from "./auth";
import VueCountdown from "@chenfengyuan/vue-countdown";
import VueMeta from 'vue-meta'

Vue.use(VueMeta);
Vue.component(VueCountdown.name, VueCountdown);
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});
Vue.use(VModal);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
