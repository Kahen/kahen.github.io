import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as i,a as t}from"./app-c243dxVF.js";const n={},r=t('<hr><h1 id="java中url查询参数操作" tabindex="-1"><a class="header-anchor" href="#java中url查询参数操作"><span>Java中URL查询参数操作</span></a></h1><p>在Java中，我们可以使用几种库来动态地向URL添加查询参数，同时保持URL的有效性。 在本文中，我们将学习如何使用其中的三种。这三种执行完全相同的任务。因此，我们将看到生成的URL是相同的。</p><h2 id="_2-java-ee-7-uribuilder" tabindex="-1"><a class="header-anchor" href="#_2-java-ee-7-uribuilder"><span>2. Java EE 7 UriBuilder</span></a></h2><p><strong>最接近Java内置解决方案的是UriBuilder</strong>，它位于javax.ws.rs-api中，我们需要将其导入到我们的pom.xml中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```javax.ws.rs```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```javax.ws.rs-api```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```2.1.1```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在Maven仓库中找到最新版本。我们可能还需要导入jersey-commons以运行我们的应用程序。</p><p>UriBuilder对象提供了fromUri()方法来创建基础URI，并使用queryParam()来添加我们的查询。然后我们可以调用build()来返回一个URI：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid whenUsingJavaUriBuilder_thenParametersAreCorrectlyAdded() {\n    String url = &quot;baeldung.com&quot;;\n    String key = &quot;article&quot;;\n    String value = &quot;beta&quot;;\n    URI uri = UriBuilder.fromUri(url)\n      .queryParam(key, value)\n      .build();\n\n    assertEquals(&quot;baeldung.com?article=beta&quot;, uri.toString());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，URL看起来符合预期，查询已附加。</p><h2 id="_3-apache-uribuilder" tabindex="-1"><a class="header-anchor" href="#_3-apache-uribuilder"><span>3. Apache UriBuilder</span></a></h2><p><strong>Apache在其HttpClient包中提供了自己的UriBuilder解决方案</strong>。要使用它，我们需要将其添加到我们的pom.xml中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.apache.httpcomponents```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```httpclient```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```4.5.2```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在Maven仓库中找到最新版本。</p><p>使用它时，我们首先使用基础URL字符串调用URIBuilder构造函数。然后使用其构建方法addParameter()来附加我们的参数，最后调用build()：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid whenUsingApacheUriBuilder_thenParametersAreCorrectlyAdded() {\n    String url = &quot;baeldung.com&quot;;\n    String key = &quot;article&quot;;\n    String value = &quot;alpha&quot;;\n    URI uri = new URIBuilder(url).addParameter(key, value)\n      .build();\n\n    assertEquals(&quot;baeldung.com?article=alpha&quot;, uri.toString());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-spring-uricomponentsbuilder" tabindex="-1"><a class="header-anchor" href="#_4-spring-uricomponentsbuilder"><span>4. Spring UriComponentsBuilder</span></a></h2><p>如果我们有一个Spring应用程序，使用Spring提供的UriComponentsBuilder可能是有意义的。要使用它，我们需要在pom.xml中添加spring-web依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.springframework```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```spring-web```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```6.0.6```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在Maven仓库中找到最新版本。</p><p><strong>我们可以使用UriComponentsBuilder通过fromUriString()创建一个URI</strong>，然后使用queryParam()附加我们的查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid whenUsingSpringUriComponentsBuilder_thenParametersAreCorrectlyAdded() {\n    String url = &quot;baeldung.com&quot;;\n    String key = &quot;article&quot;;\n    String value = &quot;charlie&quot;;\n    URI uri = UriComponentsBuilder.fromUriString(url)\n      .queryParam(key, value)\n      .build()\n      .toUri();\n\n    assertEquals(&quot;baeldung.com?article=charlie&quot;, uri.toString());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与其它不同，build()方法返回一个UriComponents对象，所以为了完成URI，我们还需要调用toURI()。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了在Java中操作URL的三种方式。我们可以使用Java扩展包、Apache的UriBuilder或spring-web解决方案来添加查询。每种都让我们确信URL结构将是有效的，同时允许我们动态构建它们。</p><p>因此，决定为我们的应用程序使用哪一个取决于我们有哪些可用的包和导入，以及我们已经使用了哪些。每个库都带来了一系列有用的功能，因此我们还应该考虑是否可以同时满足我们项目中的其他需求。</p><p>如往常一样，示例的完整代码可以在GitHub上找到。</p>',27),l=[r];function d(s,u){return i(),a("div",null,l)}const v=e(n,[["render",d],["__file","2024-07-06-URL Query Manipulation in Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-URL%20Query%20Manipulation%20in%20Java.html","title":"Java中URL查询参数操作","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Web Development"],"tag":["Java","URL Manipulation"],"head":[["meta",{"name":"keywords","content":"Java, URL Manipulation, Query Parameters"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-URL%20Query%20Manipulation%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中URL查询参数操作"}],["meta",{"property":"og:description","content":"Java中URL查询参数操作 在Java中，我们可以使用几种库来动态地向URL添加查询参数，同时保持URL的有效性。 在本文中，我们将学习如何使用其中的三种。这三种执行完全相同的任务。因此，我们将看到生成的URL是相同的。 2. Java EE 7 UriBuilder 最接近Java内置解决方案的是UriBuilder，它位于javax.ws.rs-..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T19:28:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"URL Manipulation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T19:28:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中URL查询参数操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T19:28:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中URL查询参数操作 在Java中，我们可以使用几种库来动态地向URL添加查询参数，同时保持URL的有效性。 在本文中，我们将学习如何使用其中的三种。这三种执行完全相同的任务。因此，我们将看到生成的URL是相同的。 2. Java EE 7 UriBuilder 最接近Java内置解决方案的是UriBuilder，它位于javax.ws.rs-..."},"headers":[{"level":2,"title":"2. Java EE 7 UriBuilder","slug":"_2-java-ee-7-uribuilder","link":"#_2-java-ee-7-uribuilder","children":[]},{"level":2,"title":"3. Apache UriBuilder","slug":"_3-apache-uribuilder","link":"#_3-apache-uribuilder","children":[]},{"level":2,"title":"4. Spring UriComponentsBuilder","slug":"_4-spring-uricomponentsbuilder","link":"#_4-spring-uricomponentsbuilder","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720294128000,"updatedTime":1720294128000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.49,"words":748},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-URL Query Manipulation in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中URL查询参数操作</h1>\\n<p>在Java中，我们可以使用几种库来动态地向URL添加查询参数，同时保持URL的有效性。\\n在本文中，我们将学习如何使用其中的三种。这三种执行完全相同的任务。因此，我们将看到生成的URL是相同的。</p>\\n<h2>2. Java EE 7 UriBuilder</h2>\\n<p><strong>最接近Java内置解决方案的是UriBuilder</strong>，它位于javax.ws.rs-api中，我们需要将其导入到我们的pom.xml中：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>```&lt;dependency&gt;```\\n    ```&lt;groupId&gt;```javax.ws.rs```&lt;/groupId&gt;```\\n    ```&lt;artifactId&gt;```javax.ws.rs-api```&lt;/artifactId&gt;```\\n    ```&lt;version&gt;```2.1.1```&lt;/version&gt;```\\n```&lt;/dependency&gt;```\\n</code></pre></div>","autoDesc":true}');export{v as comp,p as data};
