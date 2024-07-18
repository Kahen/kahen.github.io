import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CE5go3V-.js";const e={},p=t(`<hr><h1 id="mongodb中使用uuid作为实体id-baeldung-1-概述" tabindex="-1"><a class="header-anchor" href="#mongodb中使用uuid作为实体id-baeldung-1-概述"><span>MongoDB中使用UUID作为实体ID | Baeldung## 1. 概述</span></a></h1><p>默认情况下，MongoDB Java驱动程序生成的ID类型为_ObjectId_。有时，我们可能希望使用另一种类型的数据作为对象的唯一标识符，例如UUID。然而，<strong>MongoDB Java驱动程序不能自动生成UUID</strong>。</p><p>在本教程中，我们将探讨使用MongoDB Java驱动程序和Spring Data MongoDB生成UUID的三种方法。</p><h2 id="_2-共同点" tabindex="-1"><a class="header-anchor" href="#_2-共同点"><span>2. 共同点</span></a></h2><p>应用程序很少只管理一种类型的数据。为了简化MongoDB数据库中ID的管理，更容易实现一个抽象类，该类将定义我们所有_Document_类的ID。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">UuidIdentifiedEntity</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">protected</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">UUID</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token string">&quot;ID已定义&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取器</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本教程的示例中，我们假设所有在MongoDB数据库中持久化的类都继承自这个类。</p><h2 id="_3-配置uuid支持" tabindex="-1"><a class="header-anchor" href="#_3-配置uuid支持"><span>3. 配置UUID支持</span></a></h2><p>要允许在MongoDB中存储UUID，我们必须配置驱动程序。此配置非常简单，只告诉驱动程序如何在数据库中存储UUID。如果多个应用程序使用相同的数据库，我们必须谨慎处理。</p><p><strong>我们所要做的就是在启动时指定MongoDB客户端的_uuidRepresentation_参数</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">MongoClient</span> <span class="token function">mongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">ConnectionString</span> connectionString <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionString</span><span class="token punctuation">(</span><span class="token string">&quot;mongodb://localhost:27017/test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MongoClientSettings</span> mongoClientSettings <span class="token operator">=</span> <span class="token class-name">MongoClientSettings</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">uuidRepresentation</span><span class="token punctuation">(</span><span class="token class-name">UuidRepresentation</span><span class="token punctuation">.</span><span class="token constant">STANDARD</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">applyConnectionString</span><span class="token punctuation">(</span>connectionString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">MongoClients</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>mongoClientSettings<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们使用Spring Boot，我们可以在application.properties文件中指定此参数：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.data.mongodb.uuid-representation</span><span class="token punctuation">=</span><span class="token value attr-value">standard</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-使用生命周期事件" tabindex="-1"><a class="header-anchor" href="#_4-使用生命周期事件"><span>4. 使用生命周期事件</span></a></h2><p>处理UUID生成的第一种方法是使用Spring的生命周期事件。对于MongoDB实体，我们不能使用JPA注释_@PrePersist_等。因此，我们必须实现在_ApplicationContext_中注册的事件侦听器类。<strong>为此，我们的类必须扩展Spring的_AbstractMongoEventListener_类</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UuidIdentifiedEntityEventListener</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractMongoEventListener</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UuidIdentifiedEntity</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onBeforeConvert</span><span class="token punctuation">(</span><span class="token class-name">BeforeConvertEvent</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UuidIdentifiedEntity</span><span class="token punctuation">&gt;</span></span>\`\`\` event<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onBeforeConvert</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">UuidIdentifiedEntity</span> entity <span class="token operator">=</span> event<span class="token punctuation">.</span><span class="token function">getSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>entity<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            entity<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们使用的是_BeforeConvert_事件，该事件在Spring将我们的Java对象转换为_Document_对象并发送到MongoDB驱动程序之前触发。</p><p>将我们的事件类型设置为捕获_UuidIdentifiedEntity_类允许处理此抽象超类的所有必要子类。Spring将在使用UUID作为ID的对象被转换时调用我们的代码。</p><p>我们必须注意，Spring将事件处理委托给_TaskExecutor_，这可能是异步的。**Spring不保证事件在对象实际转换之前被处理。**如果_TaskExecutor_是异步的，则不推荐使用此方法，因为ID可能在对象被转换后生成，从而导致异常：</p><p><em>InvalidDataAccessApiUsageException: Cannot autogenerate id of type java.util.UUID for entity</em></p><p>我们可以通过使用_@Component_注解或在_@Configuration_类中生成它来在_ApplicationContext_中注册事件侦听器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">UuidIdentifiedEntityEventListener</span> <span class="token function">uuidIdentifiedEntityEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UuidIdentifiedEntityEventListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用实体回调" tabindex="-1"><a class="header-anchor" href="#_5-使用实体回调"><span>5. 使用实体回调</span></a></h2><p>Spring基础设施提供了在实体生命周期的某些点执行自定义代码的钩子。这些被称为_实体回调_，我们可以在这种情况下使用它们来在对象被持久化到数据库之前生成UUID。</p><p>与之前看到的事件侦听器方法不同，<strong>回调保证了它们的执行是同步的</strong>，并且代码将在对象生命周期的预期点运行。</p><p>Spring Data MongoDB提供了一组回调，我们可以在应用程序中使用它们。在这种情况下，我们将使用与之前相同的事件。<strong>回调可以直接在_@Configuration_类中提供</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">BeforeConvertCallback</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UuidIdentifiedEntity</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">beforeSaveCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>entity<span class="token punctuation">,</span> collection<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>entity<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            entity<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> entity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以使用方法实现_BeforeConvertCallback_接口的_组件_。</p><h2 id="_6-使用自定义存储库" tabindex="-1"><a class="header-anchor" href="#_6-使用自定义存储库"><span>6. 使用自定义存储库</span></a></h2><p>Spring Data MongoDB提供了实现我们目标的第三种方法：使用自定义存储库实现。通常，我们只需要声明一个继承自_MongoRepository_的接口，然后Spring处理与存储库相关的代码。</p><p>如果我们想要改变Spring Data处理我们对象的方式，我们可以定义Spring将在存储库级别执行的自定义代码。为此，<strong>我们首先必须定义一个扩展_MongoRepository_的接口</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@NoRepositoryBean</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CustomMongoRepository</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">UuidIdentifiedEntity</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token keyword">extends</span> <span class="token class-name">MongoRepository</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> UUID<span class="token punctuation">&gt;</span></span>\`\` <span class="token punctuation">{</span> <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_@NoRepositoryBean_注解防止Spring生成与_MongoRepository_相关的常规代码片段。此接口强制使用UUID作为对象中的ID类型。</p><p>然后，我们必须创建一个存储库类，该类将定义处理我们UUID所需的行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomMongoRepositoryImpl</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">UuidIdentifiedEntity</span><span class="token punctuation">&gt;</span></span>\`\`
  <span class="token keyword">extends</span> <span class="token class-name">SimpleMongoRepository</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> UUID<span class="token punctuation">&gt;</span></span>\`\` <span class="token keyword">implements</span> <span class="token class-name">CustomMongoRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在此存储库中，<strong>我们必须通过覆盖_SimpleMongoRepository_的相关方法来捕获所有需要生成ID的方法调用</strong>。在我们的情况下，这些方法是_save()<em>和_insert()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> \`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">S</span> <span class="token keyword">extends</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\` <span class="token class-name">S</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">S</span> entity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">generateId</span><span class="token punctuation">(</span>entity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>entity<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们需要告诉Spring使用我们的自定义类作为存储库的实现，而不是默认实现。我们通过在_@Configuration_类中这样做：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableMongoRepositories</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.repository&quot;</span><span class="token punctuation">,</span> repositoryBaseClass <span class="token operator">=</span> <span class="token class-name">CustomMongoRepositoryImpl</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们可以像往常一样声明我们的存储库，无需更改：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">MongoRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> UUID<span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们看到了三种实现方式，使用Spring Data MongoDB将UUID作为MongoDB对象的ID。</p><p>一如既往，本文中使用的代码可以在GitHub上找到。</p>`,45),o=[p];function i(c,l){return s(),a("div",null,o)}const r=n(e,[["render",i],["__file","2024-07-17-UUID as Entity ID in MongoDB.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-UUID%20as%20Entity%20ID%20in%20MongoDB.html","title":"MongoDB中使用UUID作为实体ID | Baeldung## 1. 概述","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["MongoDB","Java"],"tag":["UUID","Spring Data MongoDB"],"head":[["meta",{"name":"keywords","content":"MongoDB, Java, UUID, Spring Data MongoDB"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-UUID%20as%20Entity%20ID%20in%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB中使用UUID作为实体ID | Baeldung## 1. 概述"}],["meta",{"property":"og:description","content":"MongoDB中使用UUID作为实体ID | Baeldung## 1. 概述 默认情况下，MongoDB Java驱动程序生成的ID类型为_ObjectId_。有时，我们可能希望使用另一种类型的数据作为对象的唯一标识符，例如UUID。然而，MongoDB Java驱动程序不能自动生成UUID。 在本教程中，我们将探讨使用MongoDB Java驱动程..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T11:08:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"UUID"}],["meta",{"property":"article:tag","content":"Spring Data MongoDB"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T11:08:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB中使用UUID作为实体ID | Baeldung## 1. 概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T11:08:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB中使用UUID作为实体ID | Baeldung## 1. 概述 默认情况下，MongoDB Java驱动程序生成的ID类型为_ObjectId_。有时，我们可能希望使用另一种类型的数据作为对象的唯一标识符，例如UUID。然而，MongoDB Java驱动程序不能自动生成UUID。 在本教程中，我们将探讨使用MongoDB Java驱动程..."},"headers":[{"level":2,"title":"2. 共同点","slug":"_2-共同点","link":"#_2-共同点","children":[]},{"level":2,"title":"3. 配置UUID支持","slug":"_3-配置uuid支持","link":"#_3-配置uuid支持","children":[]},{"level":2,"title":"4. 使用生命周期事件","slug":"_4-使用生命周期事件","link":"#_4-使用生命周期事件","children":[]},{"level":2,"title":"5. 使用实体回调","slug":"_5-使用实体回调","link":"#_5-使用实体回调","children":[]},{"level":2,"title":"6. 使用自定义存储库","slug":"_6-使用自定义存储库","link":"#_6-使用自定义存储库","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721214503000,"updatedTime":1721214503000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.53,"words":1358},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-UUID as Entity ID in MongoDB.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>MongoDB中使用UUID作为实体ID | Baeldung## 1. 概述</h1>\\n<p>默认情况下，MongoDB Java驱动程序生成的ID类型为_ObjectId_。有时，我们可能希望使用另一种类型的数据作为对象的唯一标识符，例如UUID。然而，<strong>MongoDB Java驱动程序不能自动生成UUID</strong>。</p>\\n<p>在本教程中，我们将探讨使用MongoDB Java驱动程序和Spring Data MongoDB生成UUID的三种方法。</p>\\n<h2>2. 共同点</h2>\\n<p>应用程序很少只管理一种类型的数据。为了简化MongoDB数据库中ID的管理，更容易实现一个抽象类，该类将定义我们所有_Document_类的ID。</p>","autoDesc":true}');export{r as comp,k as data};
