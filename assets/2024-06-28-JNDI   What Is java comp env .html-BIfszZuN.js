import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as t}from"./app-LwwahXlT.js";const s={},p=t(`<h1 id="jndi-java-comp-env-是什么-baeldung-概述" tabindex="-1"><a class="header-anchor" href="#jndi-java-comp-env-是什么-baeldung-概述"><span>JNDI - java:comp/env 是什么？ | Baeldung## 概述</span></a></h1><p>Java命名和目录接口（JNDI）是一个应用程序编程接口（API），它为基于Java的应用程序提供命名和目录服务。我们可以使用这个接口绑定对象/资源，查找或查询对象，并检测这些对象上的更改。</p><p>在本教程中，我们将特别探讨在JNDI命名中使用“java:comp/env”标准前缀的背景。</p><h2 id="什么是java命名和目录接口" tabindex="-1"><a class="header-anchor" href="#什么是java命名和目录接口"><span>什么是Java命名和目录接口？</span></a></h2><p>简单来说，命名服务是一个将名称与对象关联起来的接口，然后通过这些名称帮助找到这些对象。因此，命名服务维护了一组绑定，这些绑定将名称映射到对象。</p><p>JNDI API使应用程序组件和客户端能够查找分布式资源、服务和EJB。</p><h2 id="访问命名上下文" tabindex="-1"><a class="header-anchor" href="#访问命名上下文"><span>访问命名上下文</span></a></h2><p>_Context_接口提供了对命名环境的访问。使用这个对象，我们可以将名称绑定到对象上，重命名对象，并列出绑定。让我们看看如何获取上下文：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JndiTemplate</span> jndiTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JndiTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
context <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">InitialContext</span><span class="token punctuation">)</span> jndiTemplate<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们有了上下文，我们就可以绑定对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>context<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&quot;java:comp/env/jdbc/datasource&quot;</span><span class="token punctuation">,</span> ds<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们可以检索上下文中存在的对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>context<span class="token punctuation">.</span><span class="token function">lookup</span><span class="token punctuation">(</span><span class="token string">&quot;java:comp/env/jdbc/datasource&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如前面的例子所示，我们将一个名称与标准前缀“java:comp/env”绑定。在我们的案例中，它是“java:comp/env/jdbc/datasource”，而不仅仅是“jdbc/datasource”。这个前缀是必须的吗？我们能完全避免它吗？让我们讨论一下。</p><h3 id="目录服务" tabindex="-1"><a class="header-anchor" href="#目录服务"><span>目录服务</span></a></h3><p>正如JNDI这个名字所表明的，它是一个命名和目录服务。相应地，目录服务将名称与对象关联起来，并允许这些对象具有属性。因此，我们不仅可以通过名称查找对象，还可以获取对象的属性或根据其属性找到对象。一个实时的例子是电话目录服务，其中订阅者的名称不仅映射到他的电话号码，还映射到他的地址。</p><p>目录通常以层次结构排列对象。在大多数情况下，目录对象存储在树状结构中。因此，第一个元素/节点可能包含组对象，这些组对象又可能包含特定的对象。</p><p>例如，在“java:comp/env”中，“comp”元素是第一个节点，下一级包含“env”元素。从这里，我们可以根据我们的约定存储或访问资源。例如，“jdbc/datasource”共享一个数据源对象。</p><h3 id="分解" tabindex="-1"><a class="header-anchor" href="#分解"><span>分解</span></a></h3><p>让我们分解我们之前的命名示例：“java:comp/env/jdbc/datasource”。</p><ul><li><strong>java</strong> 就像JDBC连接字符串中的“jdbc:”。它充当协议。</li><li><strong>comp</strong> 是所有JNDI上下文的根。它绑定到一个保留用于组件相关绑定的子树。名称“comp”是component（组件）的缩写。根上下文中没有其他绑定。</li><li><strong>env</strong> 名称“env”绑定到一个保留用于组件的环境相关绑定的子树。“env”是environment（环境）的缩写。</li><li><strong>jdbc</strong> 是_jdbc_资源的子上下文。还有其他类型或连接工厂的子上下文。</li><li><strong>datasource</strong> 是我们的JDBC资源的名称。</li></ul><p>在这里，<strong>除了最后一个元素之外，所有其他父元素都是标准名称，因此不能更改</strong>。</p><p><strong>此外，根上下文保留用于策略的未来扩展</strong>。具体来说，这适用于命名资源，这些资源不与组件本身绑定，而是与其他类型的实体绑定，如用户或部门。例如，未来的策略可能允许我们使用名称如“java:user/Anne”和“java:org/finance”来命名用户和组织/部门。</p><h2 id="相对路径与绝对路径" tabindex="-1"><a class="header-anchor" href="#相对路径与绝对路径"><span>相对路径与绝对路径</span></a></h2><p>如果我们想要使用JNDI查找的较短版本，我们可以通过子上下文的帮助来实现。这样，我们就不需要提及命名的完整路径（绝对路径），而是子上下文的相对路径。</p><p>我们可以从_InitialContext_对象派生子上下文，这样我们就不必为检索的每个资源重复“java:comp/env”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Context</span> subContext <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Context</span><span class="token punctuation">)</span> context<span class="token punctuation">.</span><span class="token function">lookup</span><span class="token punctuation">(</span><span class="token string">&quot;java:comp/env&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">DataSource</span> ds <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">DataSource</span><span class="token punctuation">)</span> subContext<span class="token punctuation">.</span><span class="token function">lookup</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc/datasource&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在这里看到的，我们创建了一个子上下文，它保存了“java:comp/env”内的值，然后使用这个子上下文（相对路径）来查找其中的特定命名。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们快速了解了JNDI是什么以及它的用例。然后，我们看到了如何将JNDI名称绑定到上下文中并查找相同的名称。</p><p>随后，我们看到了标准前缀：“java:comp/env”的分解以及在JNDI命名中使用这个前缀的原因。我们还注意到，未来的策略可能会扩展根上下文“comp”和子上下文“env”。</p><p>如往常一样，本文中使用的所有代码示例都可以在GitHub上找到。</p><p>OK</p>`,33),o=[p];function c(l,i){return e(),n("div",null,o)}const d=a(s,[["render",c],["__file","2024-06-28-JNDI   What Is java comp env .html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-JNDI%20%20%20What%20Is%20java%20comp%20env%20.html","title":"JNDI - java:comp/env 是什么？ | Baeldung## 概述","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["JNDI","Java"],"tag":["Spring Boot","Spring Security","Spring Data JPA"],"head":[["meta",{"name":"keywords","content":"JNDI, Java, Spring Boot, Spring Security, Spring Data JPA"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-JNDI%20%20%20What%20Is%20java%20comp%20env%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JNDI - java:comp/env 是什么？ | Baeldung## 概述"}],["meta",{"property":"og:description","content":"JNDI - java:comp/env 是什么？ | Baeldung## 概述 Java命名和目录接口（JNDI）是一个应用程序编程接口（API），它为基于Java的应用程序提供命名和目录服务。我们可以使用这个接口绑定对象/资源，查找或查询对象，并检测这些对象上的更改。 在本教程中，我们将特别探讨在JNDI命名中使用“java:comp/env”标..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T03:32:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"Spring Data JPA"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T03:32:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JNDI - java:comp/env 是什么？ | Baeldung## 概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T03:32:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JNDI - java:comp/env 是什么？ | Baeldung## 概述 Java命名和目录接口（JNDI）是一个应用程序编程接口（API），它为基于Java的应用程序提供命名和目录服务。我们可以使用这个接口绑定对象/资源，查找或查询对象，并检测这些对象上的更改。 在本教程中，我们将特别探讨在JNDI命名中使用“java:comp/env”标..."},"headers":[{"level":2,"title":"什么是Java命名和目录接口？","slug":"什么是java命名和目录接口","link":"#什么是java命名和目录接口","children":[]},{"level":2,"title":"访问命名上下文","slug":"访问命名上下文","link":"#访问命名上下文","children":[{"level":3,"title":"目录服务","slug":"目录服务","link":"#目录服务","children":[]},{"level":3,"title":"分解","slug":"分解","link":"#分解","children":[]}]},{"level":2,"title":"相对路径与绝对路径","slug":"相对路径与绝对路径","link":"#相对路径与绝对路径","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719545554000,"updatedTime":1719545554000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.21,"words":1263},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-JNDI   What Is java comp env .md","localizedDate":"2024年6月28日","excerpt":"\\n<p>Java命名和目录接口（JNDI）是一个应用程序编程接口（API），它为基于Java的应用程序提供命名和目录服务。我们可以使用这个接口绑定对象/资源，查找或查询对象，并检测这些对象上的更改。</p>\\n<p>在本教程中，我们将特别探讨在JNDI命名中使用“java:comp/env”标准前缀的背景。</p>\\n<h2>什么是Java命名和目录接口？</h2>\\n<p>简单来说，命名服务是一个将名称与对象关联起来的接口，然后通过这些名称帮助找到这些对象。因此，命名服务维护了一组绑定，这些绑定将名称映射到对象。</p>\\n<p>JNDI API使应用程序组件和客户端能够查找分布式资源、服务和EJB。</p>","autoDesc":true}');export{d as comp,v as data};
