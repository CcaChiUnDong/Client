import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BoardView from "@/views/BoardView.vue";
import LoginForm from "@/components/LoginForm.vue";
import User from "../views/UserView.vue";
import UserCreate from "@/components/user/UserCreate.vue";
import UserDetail from "@/components/user/UserDetail.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardCreate from "@/components/board/BoardCreate.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";
import Top3BoardList from "@/components/board/BoardTop3.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [{ path: "", name: "top3boardList", component: Top3BoardList }],
    },
    {
      path: "/board",
      name: "board",
      component: BoardView,
      children: [
        {
          path: "",
          name: "boardList",
          component: BoardList,
        },
        {
          path: "create",
          name: "boardCreate",
          component: BoardCreate,
        },
        {
          path: ":id",
          name: "boardDetail",
          component: BoardDetail,
        },
        {
          path: ":id/update",
          name: "boardUpdate",
          component: BoardUpdate,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: LoginForm,
    },
    {
      path: "/user",
      component: User,
      children: [
        {
          path: "regist",
          name: "Regist",
          component: UserCreate,
        },
        {
          path: ":id",
          name: "Detail",
          component: UserDetail,
        },
      ],
    },
  ],
});

export default router;
