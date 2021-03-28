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
    path: "/brick/:_id",
    component: brick,
    props: true,
    name: 'brick'
  },

  {
    path: "/markdownEditor/:_id",
    component: BrickEditor,
    name: 'markdownEditor'
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