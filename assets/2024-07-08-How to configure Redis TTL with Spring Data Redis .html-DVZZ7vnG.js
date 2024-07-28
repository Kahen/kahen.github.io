import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-DzJ3ruqA.js";const t={},p=e(`<hr><h1 id="如何在spring-data-redis中配置redis-ttl" tabindex="-1"><a class="header-anchor" href="#如何在spring-data-redis中配置redis-ttl"><span>如何在Spring Data Redis中配置Redis TTL</span></a></h1><p>在本快速教程中，我们将探讨如何在Spring Data Redis中配置键过期。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>让我们创建一个基于Spring Boot的API来管理由Redis支持的持久化_会话(Session)_资源。为此，我们需要四个主要步骤。有关更详细的设置，请查看我们的Spring Data Redis指南。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>首先，让我们在_pom.xml_中添加以下依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.boot\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-boot-starter-data-redis\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`3.1.5\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>spring-boot-starter-data-redis_将间接添加_spring-data-redis_和_lettuce-core</em>。</p><h3 id="_2-2-redis配置" tabindex="-1"><a class="header-anchor" href="#_2-2-redis配置"><span>2.2. Redis配置</span></a></h3><p>其次，让我们添加_RedisTemplate_配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisTemplate</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Session</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">getRedisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> redisConnectionFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RedisTemplate</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Session</span><span class="token punctuation">&gt;</span></span>\`\` redisTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>redisConnectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-模型" tabindex="-1"><a class="header-anchor" href="#_2-3-模型"><span>2.3. 模型</span></a></h3><p>第三，让我们创建我们的_Session_模型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RedisHash</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Session</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> expirationInSeconds<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-redis存储库" tabindex="-1"><a class="header-anchor" href="#_2-4-redis存储库"><span>2.4. Redis存储库</span></a></h3><p>最后，让我们创建_SessionRepository_，它提供了与Redis交互以管理我们的_Session_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">SessionRepository</span> <span class="token keyword">extends</span> <span class="token class-name">CrudRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Session</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-方法" tabindex="-1"><a class="header-anchor" href="#_3-方法"><span>3. 方法</span></a></h2><p>我们将探讨设置TTL的三种方法。</p><h3 id="_3-1-使用-redishash" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-redishash"><span>3.1. 使用@RedisHash</span></a></h3><p>让我们从最简单的方法开始。_@RedisHash_允许我们为其_timeToLive_属性提供值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RedisHash</span><span class="token punctuation">(</span>timeToLive <span class="token operator">=</span> <span class="token number">60L</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Session</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> expirationInSeconds<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**它以秒为单位取值。**在上面的例子中，我们将过期时间设置为60秒。<strong>这种方法在我们要为所有_Session_对象提供恒定的TTL值时很有用。它也可以用于指定默认TTL。</strong></p><h3 id="_3-2-使用-timetolive" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-timetolive"><span>3.2. 使用@TimeToLive</span></a></h3><p>在前一种方法中，我们可以为所有_Session_对象设置相同的恒定TTL。我们的下一个方法允许更多的动态性。使用_@TimeToLive_，我们可以注释任何数值属性或返回数值的方法来设置TTL：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RedisHash</span><span class="token punctuation">(</span>timeToLive <span class="token operator">=</span> <span class="token number">60L</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Session</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@TimeToLive</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> expirationInSeconds<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这允许我们为每个_Session_对象动态设置TTL。<strong>就像前一种方法一样，TTL以秒为单位。<em>@TimeToLive_的值优先于</em>@RedisHash(timeToLive)_。</strong></p><h3 id="_3-3-使用keyspacesettings" tabindex="-1"><a class="header-anchor" href="#_3-3-使用keyspacesettings"><span>3.3. 使用KeyspaceSettings</span></a></h3><p>继续到下一种方法，<em>KeyspaceSettings_设置TTL。Keyspaces定义用于创建Redis Hash的实际键的前缀。现在让我们为_Session_类定义_KeyspaceSettings</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableRedisRepositories</span><span class="token punctuation">(</span>keyspaceConfiguration <span class="token operator">=</span> <span class="token class-name">RedisConfiguration<span class="token punctuation">.</span>MyKeyspaceConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfiguration</span> <span class="token punctuation">{</span>

    <span class="token comment">// 省略其他配置</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyKeyspaceConfiguration</span> <span class="token keyword">extends</span> <span class="token class-name">KeyspaceConfiguration</span> <span class="token punctuation">{</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token class-name">Iterable</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">KeyspaceSettings</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">initialConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">KeyspaceSettings</span> keyspaceSettings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KeyspaceSettings</span><span class="token punctuation">(</span><span class="token class-name">Session</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;session&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            keyspaceSettings<span class="token punctuation">.</span><span class="token function">setTimeToLive</span><span class="token punctuation">(</span><span class="token number">60L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span>keyspaceSettings<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就像前几种方法一样，我们以秒为单位指定了TTL。这种方法非常类似于_@RedisHash_。此外，如果我们不想使用_@EnableRepositories_，我们可以更以编程方式设置它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfiguration</span> <span class="token punctuation">{</span>

    <span class="token comment">// 省略其他配置</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisMappingContext</span> <span class="token function">keyValueMappingContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RedisMappingContext</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MappingConfiguration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">IndexConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">MyKeyspaceConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyKeyspaceConfiguration</span> <span class="token keyword">extends</span> <span class="token class-name">KeyspaceConfiguration</span> <span class="token punctuation">{</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token class-name">Iterable</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">KeyspaceSettings</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">initialConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">KeyspaceSettings</span> keyspaceSettings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KeyspaceSettings</span><span class="token punctuation">(</span><span class="token class-name">Session</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;session&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            keyspaceSettings<span class="token punctuation">.</span><span class="token function">setTimeToLive</span><span class="token punctuation">(</span><span class="token number">60L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span>keyspaceSettings<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-比较" tabindex="-1"><a class="header-anchor" href="#_4-比较"><span>4. 比较</span></a></h2><p>最后，让我们比较我们所看到的三种方法，并弄清楚何时使用哪一种。</p><p><em>@RedisHash_和_KeyspaceSettings_都允许我们一次性为所有实体实例（<em>Session</em>）设置TTL。另一方面，</em>@TimeToLive_允许我们为每个实体实例动态设置TTL。</p><p><em>KeyspaceSettings_提供了一种在配置中为多个实体设置默认TTL的方法。另一方面，使用</em>@TimeToLive_和_@RedisHash_，这将需要在每个实体类文件中进行。</p><p><em>@TimeToLive_具有最高优先级，其次是</em>@RedisHash_，最后是_KeyspaceSettings_。</p><h2 id="_5-redis键过期事件" tabindex="-1"><a class="header-anchor" href="#_5-redis键过期事件"><span>5. Redis键过期事件</span></a></h2><p>有了所有这些设置Redis键过期的方法，人们可能还对这些事件何时发生感兴趣。为此，我们有_RedisKeyExpiredEvent_。让我们设置一个_EventListener_来捕获_RedisKeyExpiredEvent_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableRedisRepositories</span><span class="token punctuation">(</span>enableKeyspaceEvents <span class="token operator">=</span> <span class="token class-name">RedisKeyValueAdapter<span class="token punctuation">.</span>EnableKeyspaceEvents</span><span class="token punctuation">.</span><span class="token constant">ON_STARTUP</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfiguration</span> <span class="token punctuation">{</span>
    <span class="token comment">// 省略其他配置</span>

    <span class="token annotation punctuation">@Component</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SessionExpiredEventListener</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@EventListener</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleRedisKeyExpiredEvent</span><span class="token punctuation">(</span><span class="token class-name">RedisKeyExpiredEvent</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Session</span><span class="token punctuation">&gt;</span></span>\` event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Session</span> expiredSession <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Session</span><span class="token punctuation">)</span> event<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">assert</span> expiredSession <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Session with key={} has expired&quot;</span><span class="token punctuation">,</span> expiredSession<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们将能够知道何时会话过期，并在需要时采取一些行动：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>2023-02-10T15:13:38.626+05:30 INFO 16874 --- [enerContainer-1] c.b.s.config.RedisConfiguration: 
Session with key=edbd98e9-7b50-45d8-9cf4-9c621899e213 has expired
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了通过Spring Data Redis设置Redis TTL的各种方法。最后，我们查看了_RedisKeyExpiredEvent_以及如何处理过期事件。</p><p>如常，代码可在GitHub上找到。</p>`,46),i=[p];function o(c,l){return a(),s("div",null,i)}const r=n(t,[["render",o],["__file","2024-07-08-How to configure Redis TTL with Spring Data Redis .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-How%20to%20configure%20Redis%20TTL%20with%20Spring%20Data%20Redis%20.html","title":"如何在Spring Data Redis中配置Redis TTL","lang":"zh-CN","frontmatter":{"date":"2023-02-10T00:00:00.000Z","category":["Spring Data Redis","Redis TTL"],"tag":["Redis","TTL","Spring Boot","Session"],"head":[["meta",{"name":"keywords","content":"Redis, TTL, Spring Data, Spring Boot, Session"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-How%20to%20configure%20Redis%20TTL%20with%20Spring%20Data%20Redis%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Spring Data Redis中配置Redis TTL"}],["meta",{"property":"og:description","content":"如何在Spring Data Redis中配置Redis TTL 在本快速教程中，我们将探讨如何在Spring Data Redis中配置键过期。 2. 设置 让我们创建一个基于Spring Boot的API来管理由Redis支持的持久化_会话(Session)_资源。为此，我们需要四个主要步骤。有关更详细的设置，请查看我们的Spring Data R..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T08:41:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:tag","content":"TTL"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Session"}],["meta",{"property":"article:published_time","content":"2023-02-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T08:41:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Spring Data Redis中配置Redis TTL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T08:41:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Spring Data Redis中配置Redis TTL 在本快速教程中，我们将探讨如何在Spring Data Redis中配置键过期。 2. 设置 让我们创建一个基于Spring Boot的API来管理由Redis支持的持久化_会话(Session)_资源。为此，我们需要四个主要步骤。有关更详细的设置，请查看我们的Spring Data R..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. Redis配置","slug":"_2-2-redis配置","link":"#_2-2-redis配置","children":[]},{"level":3,"title":"2.3. 模型","slug":"_2-3-模型","link":"#_2-3-模型","children":[]},{"level":3,"title":"2.4. Redis存储库","slug":"_2-4-redis存储库","link":"#_2-4-redis存储库","children":[]}]},{"level":2,"title":"3. 方法","slug":"_3-方法","link":"#_3-方法","children":[{"level":3,"title":"3.1. 使用@RedisHash","slug":"_3-1-使用-redishash","link":"#_3-1-使用-redishash","children":[]},{"level":3,"title":"3.2. 使用@TimeToLive","slug":"_3-2-使用-timetolive","link":"#_3-2-使用-timetolive","children":[]},{"level":3,"title":"3.3. 使用KeyspaceSettings","slug":"_3-3-使用keyspacesettings","link":"#_3-3-使用keyspacesettings","children":[]}]},{"level":2,"title":"4. 比较","slug":"_4-比较","link":"#_4-比较","children":[]},{"level":2,"title":"5. Redis键过期事件","slug":"_5-redis键过期事件","link":"#_5-redis键过期事件","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720428089000,"updatedTime":1720428089000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.5,"words":1051},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-How to configure Redis TTL with Spring Data Redis .md","localizedDate":"2023年2月10日","excerpt":"<hr>\\n<h1>如何在Spring Data Redis中配置Redis TTL</h1>\\n<p>在本快速教程中，我们将探讨如何在Spring Data Redis中配置键过期。</p>\\n<h2>2. 设置</h2>\\n<p>让我们创建一个基于Spring Boot的API来管理由Redis支持的持久化_会话(Session)_资源。为此，我们需要四个主要步骤。有关更详细的设置，请查看我们的Spring Data Redis指南。</p>\\n<h3>2.1. 依赖项</h3>\\n<p>首先，让我们在_pom.xml_中添加以下依赖项：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.springframework.boot`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`spring-boot-starter-data-redis`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`3.1.5`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
