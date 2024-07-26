import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,a as p}from"./app-8nJ1rqSf.js";const a={},n=p(`<h1 id="spring-boot中将application-properties转换为application-yml" tabindex="-1"><a class="header-anchor" href="#spring-boot中将application-properties转换为application-yml"><span>Spring Boot中将application.properties转换为application.yml</span></a></h1><p>在本教程中，我们将学习如何将从Spring Initializer下载新Spring Boot项目时默认获得的_application.properties_文件转换为更易于阅读的_application.yml_文件。</p><h2 id="属性文件与yml文件之间的区别" tabindex="-1"><a class="header-anchor" href="#属性文件与yml文件之间的区别"><span>属性文件与YML文件之间的区别</span></a></h2><p>在直接进入主题之前，让我们通过代码形式看看这两种文件格式之间的区别。</p><p><strong>在_application.properties_文件中，属性以单行配置的形式存储。</strong> Spring Boot将属性文件生成为默认文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.datasource.url=jdbc:h2:mem:testDB
spring.datasource.username=user
spring.datasource.password=testpwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，我们可以创建一个_application.yml_。这是一个基于YML的文件，与属性文件相比，在处理分层数据时更易于阅读：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  datasource:
    url: &#39;jdbc:h2:mem:testDB&#39;
    username: user
    password: testpwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正如我们所看到的，通过基于YML的配置，我们消除了添加重复前缀（<em>spring.datasource</em>）的需要。</strong></p><h3 id="_3-1-intellij插件" tabindex="-1"><a class="header-anchor" href="#_3-1-intellij插件"><span>3.1. IntelliJ插件</span></a></h3><p>如果我们使用IntelliJ作为我们的IDE来运行Spring Boot应用程序，我们可以通过安装以下插件来进行转换：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/Plugin-properties-to-yml-1024x735.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们需要转到 <em>File &gt; Settings &gt; Plugins &gt; Install</em> “<em>Convert YAML and Properties file</em>”。</p><p>一旦我们安装了插件，我们：</p><ul><li>右键点击_application.properties_文件</li><li>选择“<em>Convert YAML and Properties file</em>”选项自动将文件转换为_application.yml_</li></ul><p>我们也可以将其转换回。</p><h3 id="_3-2-在线网站工具" tabindex="-1"><a class="header-anchor" href="#_3-2-在线网站工具"><span>3.2. 在线网站工具</span></a></h3><p>除了使用Intellij并安装插件之外，我们还可以直接将属性文件的内容从我们的代码库复制粘贴到simpleStep转换器网站。</p><p>出于安全原因，我们必须确保<strong>我们不在第三方网站上输入密码进行转换：</strong></p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/12/prop-to-yaml-online-tool-simplestep.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>正如我们在截图中看到的，我们首先使用两个下拉框选择输入和输出内容类型。当我们在“<em>Input</em>”部分粘贴属性文件内容时，转换后的YML格式会立即在“<em>Output</em>”部分显示。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们已经看到了_properties_和 <em>.yml</em> 文件之间的区别，并学习了如何使用各种工具和插件将_application.properties_文件转换为_application.yml_。</p>`,23),o=[n];function r(l,s){return i(),e("div",null,o)}const m=t(a,[["render",r],["__file","2024-07-03-How to Convert application.properties to application.yml for Spring Boot.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-How%20to%20Convert%20application.properties%20to%20application.yml%20for%20Spring%20Boot.html","title":"Spring Boot中将application.properties转换为application.yml","lang":"zh-CN","frontmatter":{"date":"2023-06-01T00:00:00.000Z","category":["Spring Boot","Configuration"],"tag":["application.properties","application.yml"],"head":[["meta",{"name":"keywords","content":"Spring Boot, application.properties, application.yml, Configuration, Tutorial"}],["meta",{"name":"description","content":"Learn how to convert application.properties to application.yml in Spring Boot applications."}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-How%20to%20Convert%20application.properties%20to%20application.yml%20for%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot中将application.properties转换为application.yml"}],["meta",{"property":"og:description","content":"Spring Boot中将application.properties转换为application.yml 在本教程中，我们将学习如何将从Spring Initializer下载新Spring Boot项目时默认获得的_application.properties_文件转换为更易于阅读的_application.yml_文件。 属性文件与YML文件之间..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/06/Plugin-properties-to-yml-1024x735.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T16:38:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"application.properties"}],["meta",{"property":"article:tag","content":"application.yml"}],["meta",{"property":"article:published_time","content":"2023-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T16:38:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot中将application.properties转换为application.yml\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/06/Plugin-properties-to-yml-1024x735.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/12/prop-to-yaml-online-tool-simplestep.png\\"],\\"datePublished\\":\\"2023-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T16:38:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot中将application.properties转换为application.yml 在本教程中，我们将学习如何将从Spring Initializer下载新Spring Boot项目时默认获得的_application.properties_文件转换为更易于阅读的_application.yml_文件。 属性文件与YML文件之间..."},"headers":[{"level":2,"title":"属性文件与YML文件之间的区别","slug":"属性文件与yml文件之间的区别","link":"#属性文件与yml文件之间的区别","children":[{"level":3,"title":"3.1. IntelliJ插件","slug":"_3-1-intellij插件","link":"#_3-1-intellij插件","children":[]},{"level":3,"title":"3.2. 在线网站工具","slug":"_3-2-在线网站工具","link":"#_3-2-在线网站工具","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720024684000,"updatedTime":1720024684000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.91,"words":574},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-How to Convert application.properties to application.yml for Spring Boot.md","localizedDate":"2023年6月1日","excerpt":"\\n<p>在本教程中，我们将学习如何将从Spring Initializer下载新Spring Boot项目时默认获得的_application.properties_文件转换为更易于阅读的_application.yml_文件。</p>\\n<h2>属性文件与YML文件之间的区别</h2>\\n<p>在直接进入主题之前，让我们通过代码形式看看这两种文件格式之间的区别。</p>\\n<p><strong>在_application.properties_文件中，属性以单行配置的形式存储。</strong> Spring Boot将属性文件生成为默认文件：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>spring.datasource.url=jdbc:h2:mem:testDB\\nspring.datasource.username=user\\nspring.datasource.password=testpwd\\n</code></pre></div>","autoDesc":true}');export{m as comp,g as data};
