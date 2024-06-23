import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Ceves8Ok.js";const e={},p=t(`<h1 id="在不返回数据的情况下实现graphql-mutation" tabindex="-1"><a class="header-anchor" href="#在不返回数据的情况下实现graphql-mutation"><span>在不返回数据的情况下实现GraphQL Mutation</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p><strong>GraphQL 是一种强大的 API 查询语言，为我们与数据的交互提供了灵活而高效的方式。</strong> 当处理 mutation（变更）时，我们通常会在服务器上执行数据的更新或添加。然而，在某些场景中，我们可能需要进行变更而不返回任何数据。</p><p>在 GraphQL 中，默认行为是强制字段在模式中为非空性，这意味着除非明确标记为可空，否则字段必须始终返回一个值，不能为 null。虽然这种严格性有助于 API 的清晰度和可预测性，但有时返回 null 可能是必要的。然而，通常认为避免返回 null 值是一个最佳实践。</p><p>在本文中，我们将探讨实现不检索或返回特定信息的 GraphQL mutation 的技术。</p><h2 id="_2-先决条件" tabindex="-1"><a class="header-anchor" href="#_2-先决条件"><span>2. 先决条件</span></a></h2><p>对于我们的示例，我们需要以下依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-graphql\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-web\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Spring Boot GraphQL Starter 提供了一个快速设置 GraphQL 服务器的出色解决方案。</strong> 通过利用自动配置和采用基于注解的编程方法，我们只需要关注为我们的服务编写关键代码。</p><p>我们在我们的配置中包含了 web starter，因为 GraphQL 是传输无关的。这利用了 Spring MVC 通过 HTTP 公开 GraphQL API。我们可以通过默认的 /graphql 端点访问它。我们还可以为不同的底层实现使用其他 starter，比如 Spring Webflux。</p><h2 id="_3-使用可空类型" tabindex="-1"><a class="header-anchor" href="#_3-使用可空类型"><span>3. 使用可空类型</span></a></h2><p>与某些编程语言不同，GraphQL 强制每个字段在模式中明确声明可空性。这种方法提高了清晰度，允许我们传达一个字段何时可能没有值。</p><h3 id="_3-1-编写模式" tabindex="-1"><a class="header-anchor" href="#_3-1-编写模式"><span>3.1. 编写模式</span></a></h3><p>Spring Boot GraphQL starter 会自动定位在 <em>src/main/resources/graphql/**</em> 位置下的 GraphQL 模式文件。它根据这些文件构建正确的结构，并将特殊 beans 连接到这个结构。</p><p>我们将从创建 <em>schema.graphqls</em> 文件开始，并定义我们示例的模式：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">type</span> <span class="token class-name">Post</span> <span class="token punctuation">{</span>
    <span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token scalar">ID</span>
    <span class="token attr-name">title</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
    <span class="token attr-name">text</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
    <span class="token attr-name">category</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
    <span class="token attr-name">author</span><span class="token punctuation">:</span> <span class="token scalar">String</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Mutation</span> <span class="token punctuation">{</span>
    <span class="token property-query">createPostReturnNullableType</span><span class="token punctuation">(</span><span class="token attr-name">title</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token attr-name">text</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token attr-name">category</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token attr-name">authorId</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token scalar">Int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将有一个 <em>Post</em> 实体和一个创建新帖子的 mutation。此外，为了使我们的模式通过验证，它必须有一个查询。因此，我们将实现一个返回帖子列表的虚拟查询：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">type</span> <span class="token class-name">Query</span> <span class="token punctuation">{</span>
    <span class="token attr-name">recentPosts</span><span class="token punctuation">(</span><span class="token attr-name">count</span><span class="token punctuation">:</span> <span class="token scalar">Int</span><span class="token punctuation">,</span> <span class="token attr-name">offset</span><span class="token punctuation">:</span> <span class="token scalar">Int</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Post</span><span class="token punctuation">]</span><span class="token operator">!</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用-beans-表示类型" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-beans-表示类型"><span>3.2. 使用 Beans 表示类型</span></a></h3><p><strong>在 GraphQL 服务器中，每种复杂类型都与一个 Java bean 关联。</strong> 这些关联基于对象和属性名称建立。也就是说，我们将为我们的帖子创建一个 POJO 类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Post</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> text<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

    <span class="token comment">// getters, setters, constructor</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java bean 中未映射的字段或方法在 GraphQL 模式中被忽略，不会产生问题。</p><h3 id="_3-3-创建-mutation-resolver" tabindex="-1"><a class="header-anchor" href="#_3-3-创建-mutation-resolver"><span>3.3. 创建 Mutation Resolver</span></a></h3><p><strong>我们必须用 @MutationMapping 标签标记处理函数。</strong> 这些方法应该放在我们应用程序中的常规 <em>@Controller</em> 组件内，将类注册为我们 GraphQL 应用程序中的数据修改组件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PostController</span> <span class="token punctuation">{</span>

    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Post</span><span class="token punctuation">&gt;</span></span>\` posts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@MutationMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">createPost</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Argument</span> <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token annotation punctuation">@Argument</span> <span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token annotation punctuation">@Argument</span> <span class="token class-name">String</span> category<span class="token punctuation">,</span> <span class="token annotation punctuation">@Argument</span> <span class="token class-name">String</span> author<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Post</span> post <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Post</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        post<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        post<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span><span class="token punctuation">;</span>
        post<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
        post<span class="token punctuation">.</span><span class="token function">setCategory</span><span class="token punctuation">(</span>category<span class="token punctuation">)</span><span class="token punctuation">;</span>
        post<span class="token punctuation">.</span><span class="token function">setAuthor</span><span class="token punctuation">(</span>author<span class="token punctuation">)</span><span class="token punctuation">;</span>
        posts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>post<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们必须根据模式中的属性用 <em>@Argument</em> 注解方法的参数。</strong> 当我们声明模式时，我们确定我们的 mutation 将返回一个 <em>Int</em> 类型，没有感叹号。这允许返回值为 <em>null</em>。</p><h2 id="_4-创建自定义标量" tabindex="-1"><a class="header-anchor" href="#_4-创建自定义标量"><span>4. 创建自定义标量</span></a></h2><p>在 GraphQL 中，标量是代表 GraphQL 查询或模式中叶节点的原子数据类型。</p><h3 id="_4-1-标量和扩展标量" tabindex="-1"><a class="header-anchor" href="#_4-1-标量和扩展标量"><span>4.1. 标量和扩展标量</span></a></h3><p>根据 GraphQL 规范，所有实现都必须包括以下标量类型：<em>String</em>, <em>Boolean</em>, <em>Int</em>, <em>Float</em>, 或 <em>ID</em>。除此之外，graphql-java-extended-scalars 添加了更多自定义标量，如 <em>Long</em>, <em>BigDecimal</em>, 或 <em>LocalDate</em>。<strong>然而，原始的或扩展的标量集合中都没有一个特殊的 <em>null</em> 值标量。</strong> <strong>因此，我们将在这一部分构建我们的标量。</strong></p><h3 id="_4-2-创建自定义标量" tabindex="-1"><a class="header-anchor" href="#_4-2-创建自定义标量"><span>4.2. 创建自定义标量</span></a></h3><p><strong>要创建自定义标量，我们应该初始化一个 <em>GraphQLScalarType</em> 单例实例。</strong> 我们将使用构建者设计模式创建我们的标量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GraphQLVoidScalar</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">GraphQLScalarType</span> <span class="token class-name">Void</span> <span class="token operator">=</span> <span class="token class-name">GraphQLScalarType</span><span class="token punctuation">.</span><span class="token function">newScalar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;Void&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&quot;A custom scalar that represents the null value&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">coercing</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Coercing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token annotation punctuation">@Override</span>
          <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token class-name">Object</span> dataFetcherResult<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>

          <span class="token annotation punctuation">@Override</span>
          <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">parseValue</span><span class="token punctuation">(</span><span class="token class-name">Object</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>

          <span class="token annotation punctuation">@Override</span>
          <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">parseLiteral</span><span class="token punctuation">(</span><span class="token class-name">Object</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>标量的关键组成部分是名称、描述和 coercing。</strong> 尽管名称和描述是自我解释的，但创建自定义标量最困难的部分是 <em>graphql.schema.Coercing</em> 实现。这个类负责三个功能：</p><ul><li><em>parseValue()</em> <strong>:</strong> 接受一个变量输入对象，并将其转换为相应的 Java 运行时表示</li><li><em>parseLiteral()</em> <strong>:</strong> 接收 AST 字面量 <em>graphql.language.Value</em> 作为输入，并将其转换为 Java 运行时表示</li><li><em>serialize()</em> <strong>:</strong> 接受一个 Java 对象，并将其转换为该标量的输出形状</li></ul><p>尽管对于复杂对象，coercing 的实现可能相当复杂，但在我们的情况下，我们将为每个方法返回 <em>null</em>。</p><h3 id="_4-3-注册自定义标量" tabindex="-1"><a class="header-anchor" href="#_4-3-注册自定义标量"><span>4.3. 注册自定义标量</span></a></h3><p>我们将通过创建一个配置类来注册我们的标量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GraphQlConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RuntimeWiringConfigurer</span> <span class="token function">runtimeWiringConfigurer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> wiringBuilder <span class="token operator">-&gt;</span> wiringBuilder<span class="token punctuation">.</span><span class="token function">scalar</span><span class="token punctuation">(</span><span class="token class-name">GraphQLVoidScalar<span class="token punctuation">.</span>Void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建了一个 <em>RuntimeWiringConfigurer</em> bean，在这里我们配置了我们 <em>GraphQL</em> 模式的运行时布线。<strong>在这个 bean 中，我们使用 <em>RuntimeWiring</em> 类提供的 <em>scalar()</em> 方法来注册我们的自定义类型。</strong></p><h3 id="_4-4-集成自定义标量" tabindex="-1"><a class="header-anchor" href="#_4-4-集成自定义标量"><span>4.4. 集成自定义标量</span></a></h3><p><strong>最后一步是将自定义标量集成到我们的 GraphQL 模式中，通过使用定义的名称引用它。</strong> 在这种情况下，我们通过简单地声明 <em>scalar Void</em> 来在模式中使用标量。</p><p>这一步确保了 GraphQL 引擎识别并在整个模式中使用我们的自定义标量。现在，我们可以将标量集成到我们的 mutation 中：</p><div class="language-graphql line-numbers-mode" data-ext="graphql" data-title="graphql"><pre class="language-graphql"><code><span class="token keyword">scalar</span> <span class="token class-name">Void</span>

<span class="token keyword">type</span> <span class="token class-name">Mutation</span> <span class="token punctuation">{</span>
    <span class="token property-query">createPostReturnCustomScalar</span><span class="token punctuation">(</span><span class="token attr-name">title</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token attr-name">text</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token attr-name">category</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token attr-name">authorId</span><span class="token punctuation">:</span> <span class="token scalar">String</span><span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token class-name">Void</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们将更新映射方法的签名以返回我们的标量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Void</span> <span class="token function">createPostReturnCustomScalar</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Argument</span> <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token annotation punctuation">@Argument</span> <span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token annotation punctuation">@Argument</span> <span class="token class-name">String</span> category<span class="token punctuation">,</span> <span class="token annotation punctuation">@Argument</span> <span class="token class-name">String</span> author<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了在不返回特定数据的情况下实现 GraphQL mutation。我们展示了如何使用 Spring Boot GraphQL Starter 快速设置服务器。此外，我们引入了自定义的 <em>Void</em> 标量来处理 <em>null</em> 值，展示了如何扩展 GraphQL 的能力。</p><p>如常，完整的代码片段可以在 GitHub 上找到。翻译已经完成，以下是剩余部分的翻译：</p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了如何在不返回特定数据的情况下实现 GraphQL mutations。我们展示了如何使用 Spring Boot GraphQL Starter 快速搭建服务器。此外，我们引入了一个自定义的 <code>Void</code> 标量来处理 <code>null</code> 值，展示了如何扩展 GraphQL 的能力。</p><p>一如既往，完整的代码片段可以在 GitHub 上找到。</p><p>OK</p>`,53),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","2024-06-21-Implementing GraphQL Mutation Without Returning Data.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Implementing%20GraphQL%20Mutation%20Without%20Returning%20Data.html","title":"在不返回数据的情况下实现GraphQL Mutation","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["GraphQL","Java"],"tag":["GraphQL Mutation","Spring Boot"],"head":[["meta",{"name":"keywords","content":"GraphQL, Java, Mutation, Spring Boot, API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Implementing%20GraphQL%20Mutation%20Without%20Returning%20Data.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在不返回数据的情况下实现GraphQL Mutation"}],["meta",{"property":"og:description","content":"在不返回数据的情况下实现GraphQL Mutation 1. 引言 GraphQL 是一种强大的 API 查询语言，为我们与数据的交互提供了灵活而高效的方式。 当处理 mutation（变更）时，我们通常会在服务器上执行数据的更新或添加。然而，在某些场景中，我们可能需要进行变更而不返回任何数据。 在 GraphQL 中，默认行为是强制字段在模式中为非..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T16:34:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"GraphQL Mutation"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T16:34:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在不返回数据的情况下实现GraphQL Mutation\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T16:34:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在不返回数据的情况下实现GraphQL Mutation 1. 引言 GraphQL 是一种强大的 API 查询语言，为我们与数据的交互提供了灵活而高效的方式。 当处理 mutation（变更）时，我们通常会在服务器上执行数据的更新或添加。然而，在某些场景中，我们可能需要进行变更而不返回任何数据。 在 GraphQL 中，默认行为是强制字段在模式中为非..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 先决条件","slug":"_2-先决条件","link":"#_2-先决条件","children":[]},{"level":2,"title":"3. 使用可空类型","slug":"_3-使用可空类型","link":"#_3-使用可空类型","children":[{"level":3,"title":"3.1. 编写模式","slug":"_3-1-编写模式","link":"#_3-1-编写模式","children":[]},{"level":3,"title":"3.2. 使用 Beans 表示类型","slug":"_3-2-使用-beans-表示类型","link":"#_3-2-使用-beans-表示类型","children":[]},{"level":3,"title":"3.3. 创建 Mutation Resolver","slug":"_3-3-创建-mutation-resolver","link":"#_3-3-创建-mutation-resolver","children":[]}]},{"level":2,"title":"4. 创建自定义标量","slug":"_4-创建自定义标量","link":"#_4-创建自定义标量","children":[{"level":3,"title":"4.1. 标量和扩展标量","slug":"_4-1-标量和扩展标量","link":"#_4-1-标量和扩展标量","children":[]},{"level":3,"title":"4.2. 创建自定义标量","slug":"_4-2-创建自定义标量","link":"#_4-2-创建自定义标量","children":[]},{"level":3,"title":"4.3. 注册自定义标量","slug":"_4-3-注册自定义标量","link":"#_4-3-注册自定义标量","children":[]},{"level":3,"title":"4.4. 集成自定义标量","slug":"_4-4-集成自定义标量","link":"#_4-4-集成自定义标量","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1718987643000,"updatedTime":1718987643000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.03,"words":1810},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Implementing GraphQL Mutation Without Returning Data.md","localizedDate":"2024年6月22日","excerpt":"\\n<h2>1. 引言</h2>\\n<p><strong>GraphQL 是一种强大的 API 查询语言，为我们与数据的交互提供了灵活而高效的方式。</strong> 当处理 mutation（变更）时，我们通常会在服务器上执行数据的更新或添加。然而，在某些场景中，我们可能需要进行变更而不返回任何数据。</p>\\n<p>在 GraphQL 中，默认行为是强制字段在模式中为非空性，这意味着除非明确标记为可空，否则字段必须始终返回一个值，不能为 null。虽然这种严格性有助于 API 的清晰度和可预测性，但有时返回 null 可能是必要的。然而，通常认为避免返回 null 值是一个最佳实践。</p>\\n<p>在本文中，我们将探讨实现不检索或返回特定信息的 GraphQL mutation 的技术。</p>","autoDesc":true}');export{d as comp,k as data};
