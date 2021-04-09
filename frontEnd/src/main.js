import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Axios from "axios";
import routes from "./router/router";
import VueRouter from "vue-router";
import Vuex from 'vuex'
import less from 'less'
import storedata from "./store/data"
import Contextmenu from "vue-contextmenujs"
import './plugins/element.js'
import VueToc from 'vue-toc'

Vue.config.productionTip = false;

Vue.use(Contextmenu);
Vue.use(less)
Vue.use(Element);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueToc)

const router = new VueRouter({routes,mode: "hash"});
const store = new Vuex.Store(storedata)

Vue.prototype.$axios = Axios

new Vue({router,store,render: h => h(App)}).$mount("#app");








