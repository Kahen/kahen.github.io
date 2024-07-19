import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-D5kFWV-m.js";const t={},p=e('<hr><h1 id="docker化-java-应用程序" tabindex="-1"><a class="header-anchor" href="#docker化-java-应用程序"><span>Docker化 Java 应用程序</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本文中，我们将展示如何将基于 Java 的可运行 jar 应用程序 Docker 化。请务必了解使用 Docker 的好处。</p><h2 id="_2-构建可运行的-jar" tabindex="-1"><a class="header-anchor" href="#_2-构建可运行的-jar"><span>2. 构建可运行的 Jar</span></a></h2><p>我们将使用 Maven 来构建一个可运行的 jar。</p><p>因此，我们的应用程序有一个简单的类，<em>HelloWorld.java</em>，其中包含一个 <em>main</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to our application&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用 <em>maven-jar-plugin</em> 来生成一个可运行的 jar：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n   `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.apache.maven.plugins`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n   `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`maven-jar-plugin`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n   `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`${maven-jar-plugin.version}`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n   `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n      `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>archive</span><span class="token punctuation">&gt;</span></span>`\n         `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>manifest</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mainClass</span><span class="token punctuation">&gt;</span></span>`com.baeldung.HelloWorld`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mainClass</span><span class="token punctuation">&gt;</span></span>`\n         `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>manifest</span><span class="token punctuation">&gt;</span></span>`\n      `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>archive</span><span class="token punctuation">&gt;</span></span>`\n   `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-编写-dockerfile" tabindex="-1"><a class="header-anchor" href="#_3-编写-dockerfile"><span>3. 编写 Dockerfile</span></a></h2><p>让我们编写 Dockerfile 来 Docker 化我们的可运行 jar。Dockerfile 位于构建上下文的根目录：</p><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile" data-title="Dockerfile"><pre class="language-Dockerfile"><code>FROM openjdk:17-jdk-alpine\nMAINTAINER baeldung.com\nCOPY target/docker-java-jar-0.0.1-SNAPSHOT.jar app.jar\nENTRYPOINT [&quot;java&quot;, &quot;-jar&quot;, &quot;/app.jar&quot;]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，第一行，我们从他们的官方仓库导入 OpenJDK Java 版本 17 镜像作为我们的基镜像。随后的行将在这一基镜像上<strong>创建额外的层</strong>。</p><p>在第二行，我们指定了我们镜像的维护者，这里是 <em>baeldung.com</em>。这一步不创建任何额外的层。</p><p>在第三行，我们通过将生成的 jar，《docker-java-jar-0.0.1-SNAPSHOT.jar》，从构建上下文的 <em>target</em> 文件夹复制到容器的 <em>root</em> 文件夹中，并命名为 <em>app.jar</em>，来创建一个新的层。</p><p>最后，在最后一行，<strong>我们指定了主要应用程序与统一的命令，该命令将为这个镜像执行</strong>。在这种情况下，我们告诉容器使用 <em>java -jar</em> 命令运行 <em>app.jar</em>。同样，这一行也不引入任何额外的层。</p><h2 id="_4-构建和测试镜像" tabindex="-1"><a class="header-anchor" href="#_4-构建和测试镜像"><span>4. 构建和测试镜像</span></a></h2><p>现在我们有了 Dockerfile，让我们使用 Maven 来构建和打包我们的可运行 jar：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn package\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后，让我们构建我们的 Docker 镜像：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> image build <span class="token parameter variable">-t</span> docker-java-jar:latest <span class="token builtin class-name">.</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们使用 <em>-t</em> 标志来指定一个 <strong>名称和标签在 <em>\\u003cname\\u003e:\\u003ctag\\u003e</em> 格式</strong>。在这种情况下，<em>docker-java-jar</em> 是我们的镜像名称，标签是 <em>latest</em>。“.” 表示我们的 Dockerfile 所在的路径。在这个例子中，它只是当前目录。</p><p>注意：我们可以构建具有相同名称但不同标签的不同 Docker 镜像。</p><p>最后，让我们从命令行运行我们的 Docker 镜像：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run docker-java-jar:latest\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令通过名称和标签在 <em>\\u003cname\\u003e:\\u003ctag\\u003e</em> 格式中识别我们的 Docker 镜像。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们看到了 Docker 化可运行 Java jar 的涉及的步骤。本文中使用的代码示例可在 GitHub 上获取。</p>',29),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(t,[["render",c],["__file","2024-07-16-Dockerizing a Java Application.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Dockerizing%20a%20Java%20Application.html","title":"Docker化 Java 应用程序","lang":"zh-CN","frontmatter":{"date":"2024-07-16T00:00:00.000Z","category":["Docker","Java"],"tag":["Java","Docker","容器化"],"head":[["meta",{"name":"keywords","content":"Docker, Java, 容器化, Java 应用"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Dockerizing%20a%20Java%20Application.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Docker化 Java 应用程序"}],["meta",{"property":"og:description","content":"Docker化 Java 应用程序 1. 概述 在本文中，我们将展示如何将基于 Java 的可运行 jar 应用程序 Docker 化。请务必了解使用 Docker 的好处。 2. 构建可运行的 Jar 我们将使用 Maven 来构建一个可运行的 jar。 因此，我们的应用程序有一个简单的类，HelloWorld.java，其中包含一个 main 方法..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T13:34:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"容器化"}],["meta",{"property":"article:published_time","content":"2024-07-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T13:34:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker化 Java 应用程序\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T13:34:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Docker化 Java 应用程序 1. 概述 在本文中，我们将展示如何将基于 Java 的可运行 jar 应用程序 Docker 化。请务必了解使用 Docker 的好处。 2. 构建可运行的 Jar 我们将使用 Maven 来构建一个可运行的 jar。 因此，我们的应用程序有一个简单的类，HelloWorld.java，其中包含一个 main 方法..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 构建可运行的 Jar","slug":"_2-构建可运行的-jar","link":"#_2-构建可运行的-jar","children":[]},{"level":2,"title":"3. 编写 Dockerfile","slug":"_3-编写-dockerfile","link":"#_3-编写-dockerfile","children":[]},{"level":2,"title":"4. 构建和测试镜像","slug":"_4-构建和测试镜像","link":"#_4-构建和测试镜像","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721136843000,"updatedTime":1721136843000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.31,"words":692},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Dockerizing a Java Application.md","localizedDate":"2024年7月16日","excerpt":"<hr>\\n<h1>Docker化 Java 应用程序</h1>\\n<h2>1. 概述</h2>\\n<p>在本文中，我们将展示如何将基于 Java 的可运行 jar 应用程序 Docker 化。请务必了解使用 Docker 的好处。</p>\\n<h2>2. 构建可运行的 Jar</h2>\\n<p>我们将使用 Maven 来构建一个可运行的 jar。</p>\\n<p>因此，我们的应用程序有一个简单的类，<em>HelloWorld.java</em>，其中包含一个 <em>main</em> 方法：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">HelloWorld</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> args<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Welcome to our application\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
