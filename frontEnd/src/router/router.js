import BrickEditor from "../components/bricks/Editor/Editor2.vue";
import Home from "../components/HomeMain.vue";
import brickv3 from "../components/bricks/brick.vue";
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
    path: "/brickv3/:id",
    component: brickv3,
    props: true,
    name: 'brickv3'
  },

  {
    path: "/markdownEditor/:id",
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