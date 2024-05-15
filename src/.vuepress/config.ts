import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Baeldung 中文站",
  description: "Baeldung 帮助开发人员探索 Java 生态系统并成为更好的工程师。 我们发布重点指南和课程，重点关注构建 Web 应用程序、Spring、Spring Security 和 RESTful API。",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
