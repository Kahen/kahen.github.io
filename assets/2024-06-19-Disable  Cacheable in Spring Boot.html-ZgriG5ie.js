import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CcODlQJt.js";const e={},p=t(`<h1 id="在spring-boot中禁用-cacheable" tabindex="-1"><a class="header-anchor" href="#在spring-boot中禁用-cacheable"><span>在Spring Boot中禁用@Cacheable</span></a></h1><p>无论你是刚开始还是拥有多年经验，<strong>Spring Boot</strong> 都是构建新应用程序的绝佳选择，使用起来非常便捷。</p><p>Jmix增强了Spring Boot开发者的能力，允许他们构建并交付<strong>全栈Web</strong> <strong>应用程序</strong>，而无需涉足前端技术。它使你能够创建从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了前后端分离及其相关的安全问题。</p><p><strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot, JPA, 和 Vaadin</strong>之上的框架，并配备了Jmix Studio，这是一个<strong>IntelliJ IDEA插件</strong>，配备了一系列开发者生产力工具。该平台还提供了<strong>现成</strong>的报告生成、BPM、地图等插件，你可以在你的Jmix应用程序中使用，或者作为单独的服务使用。所有技术都是相互连接的，赋予一个Java开发者以整个团队的水平，<strong>以最少的知识</strong> <strong>开始</strong>。</p><p>另外！Jmix可以<strong>立即生成一个CRUD Web应用程序</strong>，包括其JPA数据模型和UI，<strong>直接从现有的数据库</strong>。然后，在Jmix Studio的帮助下继续开发。</p><p>不要辛苦开发，要聪明地开发！</p><p><strong>&gt;&gt; 成为一个全栈开发者</strong></p><p><strong>使用Jmix</strong></p><p>现在，新版本的 <em>REST With Spring -</em> <strong>“REST With Spring Boot”</strong> 终于发布了，当前价格将在6月22日之前<strong>有效</strong>，之后将永久增加50美元。</p><p><strong>&gt;&gt; 立即获取访问</strong></p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>缓存是一种有效的策略，通过避免在已知期间（实际上是相同的）执行结果没有变化的逻辑的重复执行来提高性能。</p><p><strong>Spring Boot提供了@Cacheable注解，我们将其定义在方法上，它会缓存方法的结果</strong>。<strong>在某些场景下，例如在较低环境中进行测试时，我们可能需要禁用缓存以观察某些修改后的行为。</strong></p><p>在本文中，我们将配置Spring Boot的缓存，并学习在需要时如何禁用缓存。</p><h2 id="_2-缓存设置" tabindex="-1"><a class="header-anchor" href="#_2-缓存设置"><span>2. 缓存设置</span></a></h2><p>让我们设置一个简单的用例，使用ISBN查询书评，并使用@Cacheable缓存一些逻辑中的方法。</p><p>我们的实体类将是_BookReview_类，其中包含_rating_、_isbn_等：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;BOOK_REVIEWS&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookReview</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy<span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">SEQUENCE</span><span class="token punctuation">,</span> generator <span class="token operator">=</span> <span class="token string">&quot;book_reviews_reviews_id_seq&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SequenceGenerator</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;book_reviews_reviews_id_seq&quot;</span><span class="token punctuation">,</span> sequenceName <span class="token operator">=</span> <span class="token string">&quot;book_reviews_reviews_id_seq&quot;</span><span class="token punctuation">,</span> allocationSize <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> reviewsId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> isbn<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> bookRating<span class="token punctuation">;</span>

    <span class="token comment">// getters &amp; setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在_BookRepository_中添加一个简单的_findByIsbn()_方法，通过_isbn_查询书评：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">findByIsbn</span><span class="token punctuation">(</span><span class="token class-name">String</span> isbn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_BookReviewsLogic_类包含一个调用_BookRepository_中_findByIsbn()_的方法。我们添加了@Cacheable注解，它为给定的_isbn_在_book_reviews_缓存中缓存结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookReviewsLogic</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">BookRepository</span> bookRepository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Cacheable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;book_reviews&quot;</span><span class="token punctuation">,</span> key <span class="token operator">=</span> <span class="token string">&quot;#isbn&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookReview</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getBooksByIsbn</span><span class="token punctuation">(</span><span class="token class-name">String</span> isbn<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> bookRepository<span class="token punctuation">.</span><span class="token function">findByIsbn</span><span class="token punctuation">(</span>isbn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>由于我们在逻辑类中使用了@Cacheable，我们需要配置我们的缓存。我们可以通过带有@Configuration和@EnableCaching的注解配置类来设置缓存配置</strong>。在这里，我们返回_HashMap_作为我们的缓存存储：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableCaching</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CacheConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">CacheManager</span> <span class="token function">cacheManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentMapCacheManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们准备好了缓存设置。如果我们在_BookReviewsLogic_中执行_getBooksByIsbn()_，我们的结果在第一次执行时被缓存，并且从那时起立即返回，而无需重新计算（即，查询数据库），从而提高了性能。</p><p>让我们编写一个简单的测试来验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenCacheEnabled_whenLogicExecuted2ndTime_thenItDoesntQueriesDB</span><span class="token punctuation">(</span><span class="token class-name">CapturedOutput</span> output<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">BookReview</span> bookReview <span class="token operator">=</span> <span class="token function">insertBookReview</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> target <span class="token operator">=</span> <span class="token string">&quot;Hibernate: select bookreview0_.reviews_id as reviews_1_0_, &quot;</span>
      <span class="token operator">+</span> <span class="token string">&quot;bookreview0_.book_rating as book_rat2_0_, &quot;</span>
      <span class="token operator">+</span> <span class="token string">&quot;bookreview0_.isbn as isbn3_0_, &quot;</span>
      <span class="token operator">+</span> <span class="token string">&quot;bookreview0_.user_id as user_id4_0_ &quot;</span>
      <span class="token operator">+</span> <span class="token string">&quot;from book_reviews bookreview0_ &quot;</span>
      <span class="token operator">+</span> <span class="token string">&quot;where bookreview0_.isbn=?&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// 第一次执行</span>
    bookReviewsLogic<span class="token punctuation">.</span><span class="token function">getBooksByIsbn</span><span class="token punctuation">(</span>bookReview<span class="token punctuation">.</span><span class="token function">getIsbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> logs <span class="token operator">=</span> output<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\r?\\\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>logs<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> e<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 第二次执行</span>
    bookReviewsLogic<span class="token punctuation">.</span><span class="token function">getBooksByIsbn</span><span class="token punctuation">(</span>bookReview<span class="token punctuation">.</span><span class="token function">getIsbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    logs <span class="token operator">=</span> output<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\r?\\\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">long</span> count <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>logs<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> e<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 计数1意味着第一次执行的选择查询日志。</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试中，我们两次执行_getBooksByIsbn()_，捕获日志，并确认由于_getBooksByIsbn()_方法在第二次执行时返回了缓存的结果，因此_select_查询只执行了一次。</p><p>要为针对数据库执行的查询生成SQL日志，我们可以在_application.properties_文件中设置以下属性：</p><p><code>spring.jpa.show-sql=true</code></p><h2 id="_3-禁用缓存" tabindex="-1"><a class="header-anchor" href="#_3-禁用缓存"><span>3. 禁用缓存</span></a></h2><p><strong>为了禁用缓存，我们将在_application.properties_文件中使用一个额外的自定义属性（即_appconfig.cache.enabled_）</strong>：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">appconfig.cache.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后，我们可以在缓存配置文件中读取此配置，并进行条件检查：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">CacheManager</span> <span class="token function">cacheManager</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${appconfig.cache.enabled}&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> isCacheEnabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isCacheEnabled<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">&quot;false&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NoOpCacheManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentMapCacheManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所见，我们的逻辑检查属性是否设置为禁用缓存。如果是，我们可以<strong>返回一个_NoOpCacheManager_的实例，它是一个不执行缓存的缓存管理器</strong>。否则，我们可以返回我们的基于哈希的缓存管理器。</p><p>通过上述简单的设置，我们可以在Spring Boot应用程序中禁用缓存。让我们通过一个简单的测试来验证上述设置。</p><p>首先，我们需要修改我们在_application.properties_中定义的缓存属性。对于我们的测试设置，我们可以使用_@TestPropertySource_来覆盖属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>classes <span class="token operator">=</span> <span class="token class-name">BookReviewApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">OutputCaptureExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@TestPropertySource</span><span class="token punctuation">(</span>properties <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;appconfig.cache.enabled=false&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookReviewsLogicCacheDisabledUnitTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们的测试将类似于之前，我们两次执行逻辑。我们检查SQL查询日志是否在当前测试中记录了两次，因为执行不会被缓存：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> count <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>logs<span class="token punctuation">)</span>
   <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> e<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 计数2意味着第一次和第二次执行的选择查询日志。</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们简要地介绍了Spring Boot中的缓存，然后在应用程序中设置了缓存。我们还学习了在需要测试代码的某些部分时如何禁用缓存。此外，我们编写了必要的测试来验证启用和禁用缓存的工作。</p><p>和往常一样，示例代码可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,45),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-19-Disable  Cacheable in Spring Boot.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Disable%20%20Cacheable%20in%20Spring%20Boot.html","title":"在Spring Boot中禁用@Cacheable","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Spring Boot","Jmix"],"tag":["Cacheable","Caching"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Jmix, Cacheable, Caching"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Disable%20%20Cacheable%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Boot中禁用@Cacheable"}],["meta",{"property":"og:description","content":"在Spring Boot中禁用@Cacheable 无论你是刚开始还是拥有多年经验，Spring Boot 都是构建新应用程序的绝佳选择，使用起来非常便捷。 Jmix增强了Spring Boot开发者的能力，允许他们构建并交付全栈Web 应用程序，而无需涉足前端技术。它使你能够创建从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了前后..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Cacheable"}],["meta",{"property":"article:tag","content":"Caching"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Boot中禁用@Cacheable\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Boot中禁用@Cacheable 无论你是刚开始还是拥有多年经验，Spring Boot 都是构建新应用程序的绝佳选择，使用起来非常便捷。 Jmix增强了Spring Boot开发者的能力，允许他们构建并交付全栈Web 应用程序，而无需涉足前端技术。它使你能够创建从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了前后..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 缓存设置","slug":"_2-缓存设置","link":"#_2-缓存设置","children":[]},{"level":2,"title":"3. 禁用缓存","slug":"_3-禁用缓存","link":"#_3-禁用缓存","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.18,"words":1553},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Disable  Cacheable in Spring Boot.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>无论你是刚开始还是拥有多年经验，<strong>Spring Boot</strong> 都是构建新应用程序的绝佳选择，使用起来非常便捷。</p>\\n<p>Jmix增强了Spring Boot开发者的能力，允许他们构建并交付<strong>全栈Web</strong> <strong>应用程序</strong>，而无需涉足前端技术。它使你能够创建从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了前后端分离及其相关的安全问题。</p>\\n<p><strong>Jmix平台</strong>包括一个构建在<strong>Spring Boot, JPA, 和 Vaadin</strong>之上的框架，并配备了Jmix Studio，这是一个<strong>IntelliJ IDEA插件</strong>，配备了一系列开发者生产力工具。该平台还提供了<strong>现成</strong>的报告生成、BPM、地图等插件，你可以在你的Jmix应用程序中使用，或者作为单独的服务使用。所有技术都是相互连接的，赋予一个Java开发者以整个团队的水平，<strong>以最少的知识</strong> <strong>开始</strong>。</p>","autoDesc":true}');export{k as comp,d as data};
