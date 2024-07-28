import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-DzJ3ruqA.js";const t={},i=e(`<hr><h1 id="在spring-data中为类配置mongodb集合名称" tabindex="-1"><a class="header-anchor" href="#在spring-data中为类配置mongodb集合名称"><span>在Spring Data中为类配置MongoDB集合名称</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何为我们的类配置MongoDB集合名称，并提供一个实际示例。我们将使用Spring Data，它为我们提供了几种配置选项，几乎不需要额外配置。我们将通过构建一个简单的音乐商店来探索每种选项的使用场景。</p><h2 id="_2-使用案例和设置" tabindex="-1"><a class="header-anchor" href="#_2-使用案例和设置"><span>2. 使用案例和设置</span></a></h2><p>我们的使用案例有四个简单的类：<em>MusicAlbum</em>、<em>Compilation</em>、<em>MusicTrack</em> 和 <em>Store</em>。<strong>每个类都将以不同的方式配置其集合名称。</strong> 此外，每个类都将拥有自己的 <em>MongoRepository</em>。不需要自定义查询。此外，我们需要一个正确配置的MongoDB数据库实例。</p><h3 id="_2-1-按名称列出集合内容的服务" tabindex="-1"><a class="header-anchor" href="#_2-1-按名称列出集合内容的服务"><span>2.1. 按名称列出集合内容的服务</span></a></h3><p><strong>首先，让我们编写一个控制器来验证我们的配置是否正常工作。我们将通过按集合名称搜索来实现这一点。</strong> 注意，在使用存储库时，集合名称配置是透明的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/collection&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CollectionController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MongoTemplate</span> mongoDb<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{name}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DBObject</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">get</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mongoDb<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token class-name">DBObject</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个控制器基于 <em>MongoTemplate</em>，并使用通用类型 <em>DBObject</em>，这不依赖于类和存储库。此外，这样我们能够看到内部MongoDB属性。最重要的是，“_class”属性，Spring Data用于反序列化JSON对象，确保我们的配置正确。</p><h3 id="_2-2-api服务" tabindex="-1"><a class="header-anchor" href="#_2-2-api服务"><span>2.2. API服务</span></a></h3><p>其次，我们将开始构建我们的服务，该服务仅保存对象并检索其集合。** <em>Compilation</em> 类将在我们的第一个配置示例中稍后创建**：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MusicStoreService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">CompilationRepository</span> compilationRepository<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Compilation</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Compilation</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> compilationRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Compilation</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getCompilationList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> compilationRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其他服务方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-api端点" tabindex="-1"><a class="header-anchor" href="#_2-3-api端点"><span>2.3. API端点</span></a></h3><p>最后，让我们编写一个控制器来与我们的应用程序接口。我们将公开服务方法的端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/music&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MusicStoreController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MusicStoreService</span> service<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/compilation&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Compilation</span> <span class="token function">post</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Compilation</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> service<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/compilation&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Compilation</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getCompilationList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> service<span class="token punctuation">.</span><span class="token function">getCompilationList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其他端点方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们准备开始配置我们的类。</p><h2 id="_3-使用-document-注解进行配置" tabindex="-1"><a class="header-anchor" href="#_3-使用-document-注解进行配置"><span>3. 使用 <em>@Document</em> 注解进行配置</span></a></h2><p>自Spring Data版本1.9以来，<em>Document</em> 注解做了我们需要的一切。它专门用于MongoDB，类似于JPA的 <em>Entity</em> 注解。<strong>截至本文撰写时，没有办法为集合名称定义命名策略，只有字段名称可以。</strong> 因此，让我们探索可用的选项。</p><h3 id="_3-1-默认行为" tabindex="-1"><a class="header-anchor" href="#_3-1-默认行为"><span>3.1. 默认行为</span></a></h3><p>默认行为认为集合名称与类名相同，但以小写字母开头。<strong>简而言之，我们只需要添加 <em>Document</em> 注解，它就会起作用</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Compilation</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，从我们的 <em>Compilation</em> 存储库的所有插入操作将进入MongoDB中的名为“compilation”的集合：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/music/compilation <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;name&quot;: &quot;Spring Hits&quot;
}&#39;</span>

<span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;6272e26e04a673360d926ca1&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们列出我们的“compilation”集合的内容以验证我们的配置：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> http://localhost:8080/collection/compilation

<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Spring Hits&quot;</span>,
    <span class="token string">&quot;_class&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;com.baeldung.boot.collection.name.data.Compilation&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是配置集合名称的最干净的方式，因为它基本上与我们的类名相同。<strong>一个缺点是，如果我们决定更改我们的数据库命名约定，我们将需要重构我们所有的类。</strong> 例如，如果我们决定使用蛇形命名法为我们的集合名称，我们将无法利用默认行为。</p><h3 id="_3-2-覆盖-value-属性" tabindex="-1"><a class="header-anchor" href="#_3-2-覆盖-value-属性"><span>3.2. 覆盖 <em>value</em> 属性</span></a></h3><p><em>Document</em> 注解允许我们使用 <em>collection</em> 属性覆盖默认行为。由于这个属性是 <em>value</em> 属性的别名，我们可以隐式设置它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span><span class="token string">&quot;albums&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MusicAlbum</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> artist<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，而不是将文档放入名为“musicAlbum”的集合中，它们将进入“albums”集合。<strong>这是使用Spring Data配置集合名称的最简单方式</strong>。让我们通过向我们的集合添加一张专辑来看看它的效果：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;http://localhost:8080/music/album&#39;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;{
  &quot;name&quot;: &quot;Album 1&quot;,
  &quot;artist&quot;: &quot;Artist A&quot;
}&#39;</span>

<span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;62740de003d2452a61a75c35&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以获取我们的“albums”集合，确保我们的配置起作用：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://localhost:8080/collection/albums&#39;</span>

<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Album 1&quot;</span>,
    <span class="token string">&quot;artist&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Artist A&quot;</span>,
    <span class="token string">&quot;_class&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;com.baeldung.boot.collection.name.data.MusicAlbum&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这也非常适合将我们的应用程序适应到一个集合名称与我们的类不匹配的现有数据库中。一个缺点是，如果我们需要添加一个默认前缀，我们将需要为每个类都这样做。</p><h3 id="_3-3-使用spel与配置属性" tabindex="-1"><a class="header-anchor" href="#_3-3-使用spel与配置属性"><span>3.3. 使用SpEL与配置属性</span></a></h3><p><strong>这种组合可以帮助做一些仅使用 <em>Document</em> 注解无法完成的事情</strong>。我们将从一个我们希望在类之间重用的应用程序特定属性开始。</p><p><strong>首先，让我们添加一个属性到我们的 <em>application.properties</em>，我们将使用它作为我们集合名称的后缀</strong>：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">collection.suffix</span><span class="token punctuation">=</span><span class="token value attr-value">db</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们通过 <em>environment</em> bean使用SpEL引用它来创建我们的下一个类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span><span class="token string">&quot;store-#{@environment.getProperty(&#39;collection.suffix&#39;)}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Store</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们创建我们的第一个商店：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;http://localhost:8080/music/store&#39;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;{
  &quot;name&quot;: &quot;Store A&quot;
}&#39;</span>

<span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;62744c6267d3a034ec5e5719&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，我们的类将存储在名为“store-db”的集合中。再次，我们可以通过列出其内容来验证我们的配置：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://localhost:8080/collection/store-db&#39;</span>

<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Store A&quot;</span>,
    <span class="token string">&quot;_class&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;com.baeldung.boot.collection.name.data.Store&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，如果我们更改后缀，我们不必在每个类中手动更改它。相反，我们只需要更新我们的属性文件。缺点是它有更多的样板代码，我们仍然需要编写类名。然而，<strong>它也可以帮助支持多租户</strong>。例如，我们可以使用租户ID而不是后缀来标记不共享的集合。</p><h3 id="_3-4-使用spel与bean方法" tabindex="-1"><a class="header-anchor" href="#_3-4-使用spel与bean方法"><span>3.4. 使用SpEL与Bean方法</span></a></h3><p>使用SpEL的另一个缺点是它需要额外的工作来程序性地评估。但是，它打开了很多可能性，比如调用任何bean方法来确定我们的集合名称。因此，在我们的下一个示例中，<strong>我们将创建一个bean来固定集合名称以符合我们的命名规则</strong>。</p><p>在我们的命名策略中，我们将使用蛇形命名法。首先，让我们从Spring Data的 <em>SnakeCaseFieldNamingStrategy</em> 借用代码来创建我们的实用程序bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Naming</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">fix</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` parts <span class="token operator">=</span> <span class="token class-name">ParsingUtils</span><span class="token punctuation">.</span><span class="token function">splitCamelCaseToLower</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> part <span class="token operator">:</span> parts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">hasText</span><span class="token punctuation">(</span>part<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>part<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">collectionToDelimitedString</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> <span class="token string">&quot;_&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们将该bean添加到我们的应用程序中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringBootCollectionNameApplication</span> <span class="token punctuation">{</span>

    <span class="token comment">// main method</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Naming</span> <span class="token function">naming</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Naming</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们将能够通过SpEL引用我们的bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span><span class="token string">&quot;#{@naming.fix(&#39;MusicTrack&#39;)}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MusicTrack</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> artist<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters\`\`\`java</span>
<span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span><span class="token string">&quot;#{@naming.fix(&#39;MusicTrack&#39;)}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MusicTrack</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> artist<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们尝试通过向我们的集合添加一个项目来测试它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;http://localhost:8080/music/track&#39;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;{
  &quot;name&quot;: &quot;Track 1&quot;,
  &quot;artist&quot;:&quot;Artist A&quot;
}&#39;</span>

<span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;62755987ae94c5278b9530cc&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们的曲目将存储在名为“music_track”的集合中：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;http://localhost:8080/collection/music_track&#39;</span>

<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Track 1&quot;</span>,
    <span class="token string">&quot;artist&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Artist A&quot;</span>,
    <span class="token string">&quot;_class&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;com.baeldung.boot.collection.name.data.MusicTrack&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不幸的是，没有办法动态获取类名，这是一个主要缺点</strong>，但它允许我们在不手动重命名所有类的情况下更改我们的数据库命名规则。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了使用Spring Data提供的工具配置集合名称的不同方式。<strong>此外，我们看到了每种方式的优缺点，这样我们就可以决定哪种方式最适合特定场景。</strong> 在此过程中，我们构建了一个简单的用例来展示不同的方法。</p><p>如往常一样，源代码可在GitHub上获取。</p><p>OK</p>`,63),p=[i];function l(o,c){return a(),s("div",null,p)}const d=n(t,[["render",l],["__file","2024-07-18-Configure MongoDB Collection Name for a Class in Spring Data.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Configure%20MongoDB%20Collection%20Name%20for%20a%20Class%20in%20Spring%20Data.html","title":"在Spring Data中为类配置MongoDB集合名称","lang":"zh-CN","frontmatter":{"date":"2024-04-01T00:00:00.000Z","category":["Spring Data","MongoDB"],"tag":["MongoDB","Collection Name","Spring Data","Configuration"],"head":[["meta",{"name":"keywords","content":"Spring Data MongoDB Collection Name Configuration"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Configure%20MongoDB%20Collection%20Name%20for%20a%20Class%20in%20Spring%20Data.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Data中为类配置MongoDB集合名称"}],["meta",{"property":"og:description","content":"在Spring Data中为类配置MongoDB集合名称 1. 概述 在本教程中，我们将学习如何为我们的类配置MongoDB集合名称，并提供一个实际示例。我们将使用Spring Data，它为我们提供了几种配置选项，几乎不需要额外配置。我们将通过构建一个简单的音乐商店来探索每种选项的使用场景。 2. 使用案例和设置 我们的使用案例有四个简单的类：Mus..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T16:33:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Collection Name"}],["meta",{"property":"article:tag","content":"Spring Data"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:published_time","content":"2024-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T16:33:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Data中为类配置MongoDB集合名称\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T16:33:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Data中为类配置MongoDB集合名称 1. 概述 在本教程中，我们将学习如何为我们的类配置MongoDB集合名称，并提供一个实际示例。我们将使用Spring Data，它为我们提供了几种配置选项，几乎不需要额外配置。我们将通过构建一个简单的音乐商店来探索每种选项的使用场景。 2. 使用案例和设置 我们的使用案例有四个简单的类：Mus..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用案例和设置","slug":"_2-使用案例和设置","link":"#_2-使用案例和设置","children":[{"level":3,"title":"2.1. 按名称列出集合内容的服务","slug":"_2-1-按名称列出集合内容的服务","link":"#_2-1-按名称列出集合内容的服务","children":[]},{"level":3,"title":"2.2. API服务","slug":"_2-2-api服务","link":"#_2-2-api服务","children":[]},{"level":3,"title":"2.3. API端点","slug":"_2-3-api端点","link":"#_2-3-api端点","children":[]}]},{"level":2,"title":"3. 使用 @Document 注解进行配置","slug":"_3-使用-document-注解进行配置","link":"#_3-使用-document-注解进行配置","children":[{"level":3,"title":"3.1. 默认行为","slug":"_3-1-默认行为","link":"#_3-1-默认行为","children":[]},{"level":3,"title":"3.2. 覆盖 value 属性","slug":"_3-2-覆盖-value-属性","link":"#_3-2-覆盖-value-属性","children":[]},{"level":3,"title":"3.3. 使用SpEL与配置属性","slug":"_3-3-使用spel与配置属性","link":"#_3-3-使用spel与配置属性","children":[]},{"level":3,"title":"3.4. 使用SpEL与Bean方法","slug":"_3-4-使用spel与bean方法","link":"#_3-4-使用spel与bean方法","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721320381000,"updatedTime":1721320381000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.56,"words":1968},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Configure MongoDB Collection Name for a Class in Spring Data.md","localizedDate":"2024年4月1日","excerpt":"<hr>\\n<h1>在Spring Data中为类配置MongoDB集合名称</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习如何为我们的类配置MongoDB集合名称，并提供一个实际示例。我们将使用Spring Data，它为我们提供了几种配置选项，几乎不需要额外配置。我们将通过构建一个简单的音乐商店来探索每种选项的使用场景。</p>\\n<h2>2. 使用案例和设置</h2>\\n<p>我们的使用案例有四个简单的类：<em>MusicAlbum</em>、<em>Compilation</em>、<em>MusicTrack</em> 和 <em>Store</em>。<strong>每个类都将以不同的方式配置其集合名称。</strong> 此外，每个类都将拥有自己的 <em>MongoRepository</em>。不需要自定义查询。此外，我们需要一个正确配置的MongoDB数据库实例。</p>","autoDesc":true}');export{d as comp,m as data};
