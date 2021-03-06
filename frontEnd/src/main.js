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
import request from "./request/main"
import Contextmenu from "vue-contextmenujs"
import './plugins/element.js'

Vue.config.productionTip = false;

Vue.use(Contextmenu);
Vue.use(less)
Vue.use(Element);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({routes,mode: "history"});
const store = new Vuex.Store(storedata)

Vue.prototype.$axios = Axios
Vue.prototype.$request = request

new Vue({router,store,render: h => h(App)}).$mount("#app");
/* import lazyload from 'vue-lazyload' */
//Vue.use(VueDragTree)
//import sass from 'sass'
//import hljs from 'highlight.js'
//import globalVariable from './global';

//import VueNestable from 'vue-nestable'
//import VueDragTree from 'vue-drag-tree'
//Vue.prototype.commonsVariable = globalVariable;
//import mavonEditor from "mavon-editor";
/* import "mavon-editor/dist/css/index.css";
import "vis-network/dist/vis-network.min.css"; */
//import VueAxios from "vue-axios";
//Vue.use(sass)
//Vue.use(VueNestable)
/* Vue.use(lazyload,{
  preLoad:4,
  error:'./assets/error.gif',
  loading:'./assets/waitingg.gif',
  attemp:3
}) */








