import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-bN4DcMMr.js";const t={},o=e(`<h1 id="kotlin-和-spring-boot-使用-value-注入配置属性-baeldung-关于-kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin-和-spring-boot-使用-value-注入配置属性-baeldung-关于-kotlin"><span>Kotlin 和 Spring Boot：使用 @Value 注入配置属性 | Baeldung 关于 Kotlin</span></a></h1><p>在 Spring Boot 应用程序中，一个常见的需求是将外部配置属性注入到 Spring Beans 中。<code>@ConfigurationProperties</code> 注解允许我们将一组配置属性绑定到一个类中。或者，我们可以利用 <code>@Value</code> 注解将任意配置属性注入到 Spring Bean 中。</p><p>在这个快速教程中，我们将探讨如何使用 <code>@Value</code> 注入配置属性。</p><h2 id="_2-我们的-yaml-配置文件" tabindex="-1"><a class="header-anchor" href="#_2-我们的-yaml-配置文件"><span>2. 我们的 YAML 配置文件</span></a></h2><p>让我们创建一个名为 <code>application-inject-value.yml</code> 的简单 YAML 文件，放在 <code>src/main/resources</code> 下，作为我们应用程序的配置：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">my-app</span><span class="token punctuation">:</span>
  <span class="token key atrule">magic-number</span><span class="token punctuation">:</span> <span class="token number">42</span>
  <span class="token key atrule">magic-string</span><span class="token punctuation">:</span> <span class="token string">&quot;It&#39;s a magic string&quot;</span>
  <span class="token key atrule">magic-flag</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

  <span class="token key atrule">magic-string-with-default</span><span class="token punctuation">:</span> <span class="token string">&quot;It&#39;s another magic string&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为了使 <code>@PropertySource</code> 加载我们的 YAML 配置文件，我们创建了 <code>YamlPropertySourceFactory</code> 类：</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> YamlPropertySourceFactory <span class="token operator">:</span> PropertySourceFactory <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">createPropertySource</span><span class="token punctuation">(</span><span class="token annotation builtin">@Nullable</span> name<span class="token operator">:</span> String<span class="token operator">?</span><span class="token punctuation">,</span> encodedResource<span class="token operator">:</span> EncodedResource<span class="token punctuation">)</span><span class="token operator">:</span> PropertySource\`<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span>\` <span class="token operator">=</span>
      <span class="token function">PropertiesPropertySource</span><span class="token punctuation">(</span>encodedResource<span class="token punctuation">.</span>resource<span class="token punctuation">.</span>filename<span class="token punctuation">,</span>
        <span class="token function">YamlPropertiesFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">also</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">setResources</span><span class="token punctuation">(</span>encodedResource<span class="token punctuation">.</span>resource<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以使用 <code>@PropertySource</code> 注解来解析我们的 YAML 配置：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@PropertySource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;classpath:application-inject-value.yml&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span> factory <span class="token operator">=</span> YamlPropertySourceFactory<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation builtin">@SpringBootApplication</span><span class="token punctuation">(</span>scanBasePackages <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.theValueAnnotation&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> KotlinValueInjectionApplication
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将创建一个 Spring 组件，并根据这个 YAML 文件注入配置属性。</p><p>当我们在 Java 中使用 <code>@Value</code> 时，我们可以这样注入配置属性：<code>@Value(&quot;\${prop.name.from.config}&quot;)</code>。</p><p>在 Kotlin 中，我们遵循类似的方法。然而，由于 Kotlin 的字符串模板使用 &#39;$&#39; 引用变量或表达式，<strong>我们必须在 <code>@Value</code> 注解中转义 &#39;$&#39;</strong>。现在，让我们创建一个 Spring 组件，并从我们的 <code>application-inject-value.yml</code> 中注入几个属性：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Component</span>
<span class="token keyword">class</span> <span class="token function">ValueBean</span><span class="token punctuation">(</span>
  <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\${my-app.magic-number}&quot;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">val</span> magicNumber<span class="token operator">:</span> Int<span class="token punctuation">,</span>
  <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\${my-app.magic-string}&quot;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">val</span> magicString<span class="token operator">:</span> String<span class="token punctuation">,</span>
  <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\${my-app.magic-flag}&quot;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">val</span> magicFlag<span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如 <code>ValueBean</code> 类所示，<strong>我们应用了构造函数注入方法来注入三个配置属性</strong>。</p><p>接下来，我们将通过单元测试验证这些 <code>@Value</code> 注解是否按预期工作。让我们从创建一个测试类开始：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@SpringBootTest</span>
<span class="token annotation builtin">@TestConstructor</span><span class="token punctuation">(</span>autowireMode <span class="token operator">=</span> AutowireMode<span class="token punctuation">.</span>ALL<span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token function">TheValueAnnotationUnitTest</span><span class="token punctuation">(</span><span class="token keyword">val</span> valueBean<span class="token operator">:</span> ValueBean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们使用 <code>@TestConstructor</code> 注解来实现构造函数注入，以便在测试类中注入 <code>ValueBean</code> Spring 组件</strong>。随后，我们可以在测试函数中进行验证：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">with</span><span class="token punctuation">(</span>valueBean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> magicNumber<span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;It&#39;s a magic string&quot;</span></span><span class="token punctuation">,</span> magicString<span class="token punctuation">)</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>magicFlag<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，测试将通过。也就是说，这三个配置属性已经被按预期注入到 <code>ValueBean</code> bean 中。</p><h2 id="_4-value-带有非空默认值" tabindex="-1"><a class="header-anchor" href="#_4-value-带有非空默认值"><span>4. <code>@Value</code> 带有非空默认值</span></a></h2><p>有时，我们可能希望在配置文件中缺少属性时提供一个默认值。为了实现这一点，<strong>我们可以采用 <code>@Value(&quot;\${prop.name:defaultValue}&quot;)</code> 模式</strong>。</p><p>现在，让我们通过注入两个具有默认值的新属性来扩展我们的 <code>ValueBean</code> 组件：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Component</span>
<span class="token keyword">class</span> <span class="token function">ValueBean</span><span class="token punctuation">(</span>
  <span class="token operator">..</span><span class="token punctuation">.</span>
  <span class="token comment">// 带有默认值</span>
  <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\${my-app.not-defined-value:1024}&quot;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">val</span> magicNumberWithDefault<span class="token operator">:</span> Int<span class="token punctuation">,</span>
  <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\${my-app.magic-string-with-default:default Value}&quot;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">val</span> magicStringWithDefault<span class="token operator">:</span> String<span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，两个 <code>@Value</code> 注入都带有默认值。</p><p>查看配置文件，<strong><em>my-app.not-defined-value</em> 缺失</strong>，而 <strong><em>my-app.magic-string-with-default</em> 被明确定义</strong>。因此，将默认值 1024 应用于 <code>magicNumberWithDefault</code>，并将指定的值注入到 <code>magicStringWithDefault</code> 中：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">with</span><span class="token punctuation">(</span>valueBean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">,</span> magicNumberWithDefault<span class="token punctuation">)</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;It&#39;s another magic string&quot;</span></span><span class="token punctuation">,</span> magicStringWithDefault<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-value-使用-null-作为默认值" tabindex="-1"><a class="header-anchor" href="#_5-value-使用-null-作为默认值"><span>5. <code>@Value</code> 使用 <code>null</code> 作为默认值</span></a></h2><p>我们已经学会了在使用 <code>@Value</code> 注入时如何设置非空值作为默认值。偶尔，当配置文件中缺少属性时，我们可能更倾向于将 <code>null</code> 视为默认值。</p><p>让我们进一步扩展 <code>ValueBean</code> 以涵盖这种情况：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Component</span>
<span class="token keyword">class</span> <span class="token function">ValueBean</span><span class="token punctuation">(</span>
  <span class="token operator">..</span><span class="token punctuation">.</span>
  <span class="token comment">// 使用 null 作为默认值</span>
  <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\${my-app.not-defined-value:null}&quot;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">val</span> stringDefaultLiteralNull<span class="token operator">:</span> String<span class="token operator">?</span><span class="token punctuation">,</span>
  <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\\\${my-app.not-defined-value:#{null}}&quot;</span></span><span class="token punctuation">)</span>
  <span class="token keyword">val</span> stringDefaultNull<span class="token operator">:</span> String<span class="token operator">?</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 Kotlin 具有可空和非空类型，<strong>如果我们希望它们的默认值为 <code>null</code>，我们必须声明字段为可空</strong>。</p><p>我们可以看到，尽管两个 <code>@Value</code> 尝试注入不存在的属性并引入默认值，一个使用 <code>“prop.name:null”</code>，另一个采用 <code>“prop.name:#{null}”</code>。</p><p>接下来，让我们看看结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">with</span><span class="token punctuation">(</span>valueBean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;null&quot;</span></span><span class="token punctuation">,</span> stringDefaultLiteralNull<span class="token punctuation">)</span>
    <span class="token function">assertNull</span><span class="token punctuation">(</span>stringDefaultNull<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试清楚地显示了它们的区别：</p><ul><li><code>prop.name:null</code> – <strong>默认值是字面字符串 “null”</strong>。</li><li><code>prop.name:#{null}</code> – 默认值是 <code>null</code>。因为 <strong><code>#{null}</code> 是一个 Spring 表达式 (SpEL)，它求值为 <code>null</code></strong>。</li></ul><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在 Kotlin 中使用 Spring 的 <code>@Value</code> 注入配置属性，包括如何在配置文件中为缺失的属性引入默认值。</p><p>如往常一样，示例的完整源代码可在 GitHub 上获得。</p>`,40),l=[o];function p(i,c){return s(),a("div",null,l)}const d=n(t,[["render",p],["__file","2024-07-11-Kotlin and Spring Boot  Injecting Configuration Properties Using  Value.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Kotlin%20and%20Spring%20Boot%20%20Injecting%20Configuration%20Properties%20Using%20%20Value.html","title":"Kotlin 和 Spring Boot：使用 @Value 注入配置属性 | Baeldung 关于 Kotlin","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Spring Boot"],"tag":["Spring Boot","Kotlin"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Kotlin, @Value, 配置属性注入"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Kotlin%20and%20Spring%20Boot%20%20Injecting%20Configuration%20Properties%20Using%20%20Value.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin 和 Spring Boot：使用 @Value 注入配置属性 | Baeldung 关于 Kotlin"}],["meta",{"property":"og:description","content":"Kotlin 和 Spring Boot：使用 @Value 注入配置属性 | Baeldung 关于 Kotlin 在 Spring Boot 应用程序中，一个常见的需求是将外部配置属性注入到 Spring Beans 中。@ConfigurationProperties 注解允许我们将一组配置属性绑定到一个类中。或者，我们可以利用 @Value 注..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T04:45:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T04:45:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin 和 Spring Boot：使用 @Value 注入配置属性 | Baeldung 关于 Kotlin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T04:45:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin 和 Spring Boot：使用 @Value 注入配置属性 | Baeldung 关于 Kotlin 在 Spring Boot 应用程序中，一个常见的需求是将外部配置属性注入到 Spring Beans 中。@ConfigurationProperties 注解允许我们将一组配置属性绑定到一个类中。或者，我们可以利用 @Value 注..."},"headers":[{"level":2,"title":"2. 我们的 YAML 配置文件","slug":"_2-我们的-yaml-配置文件","link":"#_2-我们的-yaml-配置文件","children":[]},{"level":2,"title":"4. @Value 带有非空默认值","slug":"_4-value-带有非空默认值","link":"#_4-value-带有非空默认值","children":[]},{"level":2,"title":"5. @Value 使用 null 作为默认值","slug":"_5-value-使用-null-作为默认值","link":"#_5-value-使用-null-作为默认值","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720673109000,"updatedTime":1720673109000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.72,"words":1115},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Kotlin and Spring Boot  Injecting Configuration Properties Using  Value.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在 Spring Boot 应用程序中，一个常见的需求是将外部配置属性注入到 Spring Beans 中。<code>@ConfigurationProperties</code> 注解允许我们将一组配置属性绑定到一个类中。或者，我们可以利用 <code>@Value</code> 注解将任意配置属性注入到 Spring Bean 中。</p>\\n<p>在这个快速教程中，我们将探讨如何使用 <code>@Value</code> 注入配置属性。</p>\\n<h2>2. 我们的 YAML 配置文件</h2>\\n<p>让我们创建一个名为 <code>application-inject-value.yml</code> 的简单 YAML 文件，放在 <code>src/main/resources</code> 下，作为我们应用程序的配置：</p>","autoDesc":true}');export{d as comp,k as data};
