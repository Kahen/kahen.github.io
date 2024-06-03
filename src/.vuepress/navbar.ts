import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Baeldung",
    icon: "book",

    prefix: "/posts/baeldung/",
    link: "/posts/baeldung/",
  },
  {
    text: "个人博客",
    icon: "pen-to-square",
    prefix: "/posts/articles/",
    link: "/posts/articles/",
  },
]);
