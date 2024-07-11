import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,b as t}from"./app-Ckd2YV4o.js";const i={},a=t("h1",{id:"spring-boot-3-1-的-connectiondetails-抽象",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#spring-boot-3-1-的-connectiondetails-抽象"},[t("span",null,"Spring Boot 3.1 的 ConnectionDetails 抽象")])],-1),r=t("p",null,"在本教程中，我们将学习 Spring Boot 3.1 引入的 ConnectionDetails 接口，以外部化连接属性。Spring Boot 提供了开箱即用的抽象，以集成诸如关系型数据库、NoSQL 数据库、消息服务等远程服务。",-1),p=t("p",null,"传统上，application.properties 文件用于存储远程服务的连接详情。因此，将这些属性外部化到像 AWS Secret Manager、Hashicorp Vault 等外部服务变得困难。",-1),c=t("p",null,"为了解决这个问题，Spring Boot 引入了 ConnectionDetails。这个接口是空的，并且充当标签。Spring 提供了这个接口的子接口，例如 JdbcConnectionDetails、CassandraConnectionDetails、KafkaConnectionDetails 等。它们可以在 Spring 配置类中作 Bean 指定。之后，Spring 依赖这些配置 Bean 动态检索连接属性，而不是静态的 application.properties 文件。",-1),s=t("p",null,"我们将从介绍一个用例开始，然后转移到其实现。",-1),l=[a,r,p,c,s];function g(d,m){return e(),n("div",null,l)}const _=o(i,[["render",g],["__file","2024-06-28-Spring Boot 3.1 s ConnectionDetails Abstraction.html.vue"]]),B=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Spring%20Boot%203.1%20s%20ConnectionDetails%20Abstraction.html","title":"Spring Boot 3.1 的 ConnectionDetails 抽象","lang":"zh-CN","frontmatter":{"date":"2023-10-05T00:00:00.000Z","category":["Spring Boot","Connection Details"],"tag":["Spring Boot 3.1","ConnectionDetails"],"head":[["meta",{"name":"keywords","content":"Spring Boot 3.1, ConnectionDetails, 外部化连接属性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Spring%20Boot%203.1%20s%20ConnectionDetails%20Abstraction.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot 3.1 的 ConnectionDetails 抽象"}],["meta",{"property":"og:description","content":"Spring Boot 3.1 的 ConnectionDetails 抽象 在本教程中，我们将学习 Spring Boot 3.1 引入的 ConnectionDetails 接口，以外部化连接属性。Spring Boot 提供了开箱即用的抽象，以集成诸如关系型数据库、NoSQL 数据库、消息服务等远程服务。 传统上，application.prop..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T17:51:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot 3.1"}],["meta",{"property":"article:tag","content":"ConnectionDetails"}],["meta",{"property":"article:published_time","content":"2023-10-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T17:51:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 3.1 的 ConnectionDetails 抽象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T17:51:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot 3.1 的 ConnectionDetails 抽象 在本教程中，我们将学习 Spring Boot 3.1 引入的 ConnectionDetails 接口，以外部化连接属性。Spring Boot 提供了开箱即用的抽象，以集成诸如关系型数据库、NoSQL 数据库、消息服务等远程服务。 传统上，application.prop..."},"headers":[],"git":{"createdTime":1719597104000,"updatedTime":1719597104000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":0.84,"words":251},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Spring Boot 3.1 s ConnectionDetails Abstraction.md","localizedDate":"2023年10月5日","excerpt":"\\n<p>在本教程中，我们将学习 Spring Boot 3.1 引入的 ConnectionDetails 接口，以外部化连接属性。Spring Boot 提供了开箱即用的抽象，以集成诸如关系型数据库、NoSQL 数据库、消息服务等远程服务。</p>\\n<p>传统上，application.properties 文件用于存储远程服务的连接详情。因此，将这些属性外部化到像 AWS Secret Manager、Hashicorp Vault 等外部服务变得困难。</p>\\n<p>为了解决这个问题，Spring Boot 引入了 ConnectionDetails。这个接口是空的，并且充当标签。Spring 提供了这个接口的子接口，例如 JdbcConnectionDetails、CassandraConnectionDetails、KafkaConnectionDetails 等。它们可以在 Spring 配置类中作 Bean 指定。之后，Spring 依赖这些配置 Bean 动态检索连接属性，而不是静态的 application.properties 文件。</p>","autoDesc":true}');export{_ as comp,B as data};
