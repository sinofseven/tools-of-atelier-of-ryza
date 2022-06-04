import { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import SynthesisTree1 from "@/views/SynthesisItemTree1.vue";
import TravelBottleRecipes1 from "@/views/TravelBottleRecipes1.vue";

export const pagesRyza1: RouteConfig[] = [
  {
    path: "/ryza1/synthesis-tree",
    name: "調合アイテムツリー",
    component: SynthesisTree1,
    props: (route) => ({ name: route.query.name }),
  },
  {
    path: "/ryza1/travel-bottle-recipes",
    name: "トラベルボトル パスワード",
    component: TravelBottleRecipes1,
  },
];

export const pagesHome: RouteConfig[] = [
  {
    path: "/",
    component: Home,
  },
];

export const pagesAll: Array<RouteConfig> = [...pagesHome, ...pagesRyza1];
