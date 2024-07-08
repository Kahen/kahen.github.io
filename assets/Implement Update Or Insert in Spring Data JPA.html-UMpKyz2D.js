import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,o as t,a as i}from"./app-2zDpbLgD.js";const p={},e=i('<hr><h1 id="在spring-data-jpa中实现更新或插入操作" tabindex="-1"><a class="header-anchor" href="#在spring-data-jpa中实现更新或插入操作"><span>在Spring Data JPA中实现更新或插入操作</span></a></h1><ul><li><p>从这里开始</p></li><li><p>课程▼▲</p></li><li><p><strong>Spring Boot与REST</strong><br> 用于构建生产级API的Spring的标准参考（几天后价格将上涨50美元）</p></li><li><p><strong>学习Spring Security▼▲</strong><br> 如果您今天使用Java工作，这是唯一的Spring Security教育</p></li><li><p><strong>学习Spring Security Core</strong><br> 专注于Spring Security 6的核心</p></li><li><p><strong>学习Spring Security OAuth</strong><br> 专注于Spring Security 6中的新OAuth2栈</p></li><li><p><strong>学习Spring</strong><br> 从无经验到实际构建东西</p></li><li><p><strong>学习Spring Data JPA</strong><br> Spring Data JPA持久化的完整指南</p></li><li><p>指南▼▲</p></li><li><p><strong>持久化</strong><br> Spring持久化指南</p></li><li><p><strong>REST</strong><br> 使用Spring构建REST API的指南</p></li><li><p><strong>安全</strong><br> Spring Security指南</p></li><li><p>关于▼▲</p></li><li><p><strong>完整存档</strong><br> 网站上所有文章的高级概述。</p></li><li><p><strong>Baeldung电子书</strong><br> 发现我们所有的电子书</p></li><li><p><strong>关于Baeldung</strong><br> 关于Baeldung。</p></li><li><p><strong>为Baeldung写作</strong><br> 成为网站上的作者。</p></li><li><p>RSS</p></li><li><p>搜索--- date: 2024-06-18 category:</p><ul><li>Spring Data JPA</li><li>Update-Or-Insert tag:</li><li>Spring Boot</li><li>REST API</li><li>Spring Security</li><li>Spring Data JPA head:</li><li><ul><li>meta</li><li>name: keywords content: Spring Data JPA, Update or Insert, JPA, Spring Boot, REST API, 持久化</li></ul></li></ul></li></ul><hr><h1 id="在spring-data-jpa中实现更新或插入操作-1" tabindex="-1"><a class="header-anchor" href="#在spring-data-jpa中实现更新或插入操作-1"><span>在Spring Data JPA中实现更新或插入操作</span></a></h1><ul><li><p>从这里开始</p></li><li><p>课程▼▲</p></li><li><p><strong>与Spring Boot的REST</strong><br> 构建Spring生产级API的标准参考（几天后价格将上涨50美元）</p></li><li><p><strong>学习Spring Security▼▲</strong><br> 如果您今天使用Java工作，这是唯一的Spring Security教育</p></li><li><p><strong>学习Spring Security核心</strong><br> 专注于Spring Security 6的核心</p></li><li><p><strong>学习Spring Security OAuth</strong><br> 专注于Spring Security 6中的新OAuth2栈</p></li><li><p><strong>学习Spring</strong><br> 从无经验到实际构建东西</p></li><li><p><strong>学习Spring Data JPA</strong><br> Spring Data JPA持久化的完整指南</p></li><li><p>指南▼▲</p></li><li><p><strong>持久性</strong><br> Spring的持久性指南</p></li><li><p><strong>REST</strong><br> 构建Spring REST API的指南</p></li><li><p><strong>安全</strong><br> Spring Security指南</p></li><li><p>关于▼▲</p></li><li><p><strong>完整存档</strong><br> 网站上所有文章的高级概述。</p></li><li><p><strong>Baeldung电子书</strong><br> 发现我们所有的电子书</p></li><li><p><strong>关于Baeldung</strong><br> 关于Baeldung。</p></li><li><p><strong>为Baeldung写作</strong><br> 成为网站上的作者。</p></li><li><p>RSS</p></li><li><p>搜索</p></li></ul><p>OK</p>',7),l=[e];function a(g,o){return t(),r("div",null,l)}const c=n(p,[["render",a],["__file","Implement Update Or Insert in Spring Data JPA.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/Archive/Implement%20Update%20Or%20Insert%20in%20Spring%20Data%20JPA.html","title":"在Spring Data JPA中实现更新或插入操作","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Spring Data JPA","Update-Or-Insert"],"tag":["Spring Boot","REST API","Spring Security","Spring Data JPA"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, Update or Insert, JPA, Spring Boot, REST API, 持久化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Implement%20Update%20Or%20Insert%20in%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Data JPA中实现更新或插入操作"}],["meta",{"property":"og:description","content":"在Spring Data JPA中实现更新或插入操作 从这里开始 课程▼▲ Spring Boot与REST 用于构建生产级API的Spring的标准参考（几天后价格将上涨50美元） 学习Spring Security▼▲ 如果您今天使用Java工作，这是唯一的Spring Security教育 学习Spring Security Core 专注于Sp..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"REST API"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"Spring Data JPA"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Data JPA中实现更新或插入操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Data JPA中实现更新或插入操作 从这里开始 课程▼▲ Spring Boot与REST 用于构建生产级API的Spring的标准参考（几天后价格将上涨50美元） 学习Spring Security▼▲ 如果您今天使用Java工作，这是唯一的Spring Security教育 学习Spring Security Core 专注于Sp..."},"headers":[],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":1.7,"words":509},"filePathRelative":"posts/baeldung/Archive/Implement Update Or Insert in Spring Data JPA.md","localizedDate":"2024年6月18日","excerpt":"<hr>\\n<h1>在Spring Data JPA中实现更新或插入操作</h1>\\n<ul>\\n<li>\\n<p>从这里开始</p>\\n</li>\\n<li>\\n<p>课程▼▲</p>\\n</li>\\n<li>\\n<p><strong>Spring Boot与REST</strong><br>\\n用于构建生产级API的Spring的标准参考（几天后价格将上涨50美元）</p>\\n</li>\\n<li>\\n<p><strong>学习Spring Security▼▲</strong><br>\\n如果您今天使用Java工作，这是唯一的Spring Security教育</p>\\n</li>\\n<li>\\n<p><strong>学习Spring Security Core</strong><br>\\n专注于Spring Security 6的核心</p>\\n</li>\\n<li>\\n<p><strong>学习Spring Security OAuth</strong><br>\\n专注于Spring Security 6中的新OAuth2栈</p>\\n</li>\\n<li>\\n<p><strong>学习Spring</strong><br>\\n从无经验到实际构建东西</p>\\n</li>\\n<li>\\n<p><strong>学习Spring Data JPA</strong><br>\\nSpring Data JPA持久化的完整指南</p>\\n</li>\\n<li>\\n<p>指南▼▲</p>\\n</li>\\n<li>\\n<p><strong>持久化</strong><br>\\nSpring持久化指南</p>\\n</li>\\n<li>\\n<p><strong>REST</strong><br>\\n使用Spring构建REST API的指南</p>\\n</li>\\n<li>\\n<p><strong>安全</strong><br>\\nSpring Security指南</p>\\n</li>\\n<li>\\n<p>关于▼▲</p>\\n</li>\\n<li>\\n<p><strong>完整存档</strong><br>\\n网站上所有文章的高级概述。</p>\\n</li>\\n<li>\\n<p><strong>Baeldung电子书</strong><br>\\n发现我们所有的电子书</p>\\n</li>\\n<li>\\n<p><strong>关于Baeldung</strong><br>\\n关于Baeldung。</p>\\n</li>\\n<li>\\n<p><strong>为Baeldung写作</strong><br>\\n成为网站上的作者。</p>\\n</li>\\n<li>\\n<p>RSS</p>\\n</li>\\n<li>\\n<p>搜索---\\ndate: 2024-06-18\\ncategory:</p>\\n<ul>\\n<li>Spring Data JPA</li>\\n<li>Update-Or-Insert\\ntag:</li>\\n<li>Spring Boot</li>\\n<li>REST API</li>\\n<li>Spring Security</li>\\n<li>Spring Data JPA\\nhead:</li>\\n<li>\\n<ul>\\n<li>meta</li>\\n<li>name: keywords\\ncontent: Spring Data JPA, Update or Insert, JPA, Spring Boot, REST API, 持久化</li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{c as comp,u as data};
