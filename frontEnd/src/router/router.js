import BrickEditor from "../components/Editor/Editor2.vue";
import Home from "../components/HomeMain.vue";
import brick from "../components/bricks/brick.vue";
import selfnavbar from "../components/common/selfnavbar.vue"
import login from "../components/login/login.vue"
//import square from "../components/square/square.vue"
import searchPage from "../components/searchPage/search.vue"
const routes = [{
    path: "*",
    component: Home
  },
  {
    path: "/",
    component: Home
  },

  {
    path: "/brick/:_id/:moduleId",
    component: brick,
    name: 'brick',
    props:true
  },

  {
    path: "/markdownEditor/:_id",
    component: BrickEditor,
    name: 'markdownEditor',
    props:true
  },

  {
    path: "/navbar",
    component: selfnavbar
  },
  {
    path: "/login",
    component: login
  },
  {
    path: "/square",
    component: searchPage
  },

];

export default routes;