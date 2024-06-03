import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "BaelDung",
      icon: "book",
      prefix: "posts/baeldung/",
      children: "structure",
    },
    {
      text: "个人博客",
      icon: "book",
      prefix: "posts/articles/",
      children: "structure",
    },
  ],
});
