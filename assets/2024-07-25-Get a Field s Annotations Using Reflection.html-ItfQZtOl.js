import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const e={},o=t(`<hr><h1 id="使用反射获取字段注解" tabindex="-1"><a class="header-anchor" href="#使用反射获取字段注解"><span>使用反射获取字段注解</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何获取字段的注解。此外，我们将解释保留策略元注解的工作原理。然后，我们将展示返回字段注解的两种方法之间的区别。</p><h2 id="_2-注解的保留策略" tabindex="-1"><a class="header-anchor" href="#_2-注解的保留策略"><span>2. 注解的保留策略</span></a></h2><p>首先，让我们看看_Retention_注解。它定义了注解的生命周期。这个元注解接受一个_RetentionPolicy_属性。也就是说，该属性定义了注解可见的生命周期：</p><ul><li><em>RetentionPolicy.SOURCE</em> – 仅在源代码中可见</li><li><em>RetentionPolicy.CLASS</em> – 在编译时对编译器可见</li><li><em>RetentionPolicy.RUNTIME</em> – 对编译器和运行时都可见</li></ul><p>因此，<strong>只有_.RUNTIME_保留策略允许我们以编程方式读取注解</strong>。</p><p>现在，让我们创建一个带有注解字段的示例类。我们将定义三个注解，其中只有两个在运行时可见。</p><p>第一个注解在运行时可见：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">FirstAnnotation</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个注解具有相同的保留策略：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SecondAnnotation</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们创建一个仅在源代码中可见的第三个注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">SOURCE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">ThirdAnnotation</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们定义一个带有所有三个注解的字段_classMember_的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClassWithAnnotations</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@FirstAnnotation</span>
    <span class="token annotation punctuation">@SecondAnnotation</span>
    <span class="token annotation punctuation">@ThirdAnnotation</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> classMember<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，让我们检索运行时所有可见的注解。<strong>我们将使用Java反射，这允许我们检查字段的属性：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenCallingGetDeclaredAnnotations_thenOnlyRuntimeAnnotationsAreAvailable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchFieldException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Field</span> classMemberField <span class="token operator">=</span> <span class="token class-name">ClassWithAnnotations</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;classMember&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Annotation</span><span class="token punctuation">[</span><span class="token punctuation">]</span> annotations <span class="token operator">=</span> classMemberField<span class="token punctuation">.</span><span class="token function">getDeclaredAnnotations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>annotations<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，我们只检索到了两个在运行时可用的注解。如果字段上没有注解，则_getDeclaredAnnotations_方法返回长度为零的数组。</p><p>我们也可以以相同的方式读取超类字段的注解：检索超类的字段并调用相同的_getDeclaredAnnotations_方法。</p><h2 id="_4-检查字段是否带有特定类型的注解" tabindex="-1"><a class="header-anchor" href="#_4-检查字段是否带有特定类型的注解"><span>4. 检查字段是否带有特定类型的注解</span></a></h2><p>现在，让我们看看如何检查字段上是否存在特定的注解。<em>Field_类有一个方法_isAnnotationPresent</em>，当元素上存在指定类型的注解时返回_true_。让我们在我们的_classMember_字段上测试它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenCallingIsAnnotationPresent_thenOnlyRuntimeAnnotationsAreAvailable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchFieldException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Field</span> classMemberField <span class="token operator">=</span> <span class="token class-name">ClassWithAnnotations</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;classMember&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>classMemberField<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span><span class="token class-name">FirstAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>classMemberField<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span><span class="token class-name">SecondAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>classMemberField<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span><span class="token class-name">ThirdAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，_ThirdAnnotation_不存在，因为它在_Retention_元注解中指定了_SOURCE_保留策略。</p><h2 id="_5-field-方法-getannotations-和-getdeclaredannotations" tabindex="-1"><a class="header-anchor" href="#_5-field-方法-getannotations-和-getdeclaredannotations"><span>5. <em>Field_方法_getAnnotations_和_getDeclaredAnnotations</em></span></a></h2><p>现在，让我们看看_Field_类提供的两个方法，<em>getAnnotations_和_getDeclaredAnnotations</em>。根据Javadoc，_getDeclaredAnnotations_方法返回<strong>直接存在于元素上的注解</strong>。另一方面，Javadoc说_getAnnotations_返回<strong>存在于元素上的所有注解</strong>。</p><p>一个类中的字段在其定义上方包含注解。因此，注解没有继承。所有注解必须与字段定义一起定义。因此，_getAnnotations_和_getDeclaredAnnotations_方法<strong>总是返回相同的结果</strong>。</p><p>让我们在简单的测试中展示它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenCallingGetDeclaredAnnotationsOrGetAnnotations_thenSameAnnotationsAreReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchFieldException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Field</span> classMemberField <span class="token operator">=</span> <span class="token class-name">ClassWithAnnotations</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;classMember&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Annotation</span><span class="token punctuation">[</span><span class="token punctuation">]</span> declaredAnnotations <span class="token operator">=</span> classMemberField<span class="token punctuation">.</span><span class="token function">getDeclaredAnnotations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Annotation</span><span class="token punctuation">[</span><span class="token punctuation">]</span> annotations <span class="token operator">=</span> classMemberField<span class="token punctuation">.</span><span class="token function">getAnnotations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>declaredAnnotations<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsExactly</span><span class="token punctuation">(</span>annotations<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，在_Field_类中，我们可以发现_getAnnotations_方法调用了_getDeclaredAnnotations_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Annotation</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getAnnotations</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">getDeclaredAnnotations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇简短的文章中，我们解释了保留策略元注解在检索注解中的作用。然后我们展示了如何读取字段的注解。最后，我们证明了字段的注解没有继承。</p>`,34),p=[o];function i(c,l){return s(),a("div",null,p)}const r=n(e,[["render",i],["__file","2024-07-25-Get a Field s Annotations Using Reflection.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Get%20a%20Field%20s%20Annotations%20Using%20Reflection.html","title":"使用反射获取字段注解","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Reflection"],"tag":["Annotations","Reflection","Java"],"head":[["meta",{"name":"keywords","content":"Java, Annotations, Reflection"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Get%20a%20Field%20s%20Annotations%20Using%20Reflection.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用反射获取字段注解"}],["meta",{"property":"og:description","content":"使用反射获取字段注解 1. 概述 在本教程中，我们将学习如何获取字段的注解。此外，我们将解释保留策略元注解的工作原理。然后，我们将展示返回字段注解的两种方法之间的区别。 2. 注解的保留策略 首先，让我们看看_Retention_注解。它定义了注解的生命周期。这个元注解接受一个_RetentionPolicy_属性。也就是说，该属性定义了注解可见的生命..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T11:19:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Annotations"}],["meta",{"property":"article:tag","content":"Reflection"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T11:19:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用反射获取字段注解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T11:19:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用反射获取字段注解 1. 概述 在本教程中，我们将学习如何获取字段的注解。此外，我们将解释保留策略元注解的工作原理。然后，我们将展示返回字段注解的两种方法之间的区别。 2. 注解的保留策略 首先，让我们看看_Retention_注解。它定义了注解的生命周期。这个元注解接受一个_RetentionPolicy_属性。也就是说，该属性定义了注解可见的生命..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 注解的保留策略","slug":"_2-注解的保留策略","link":"#_2-注解的保留策略","children":[]},{"level":2,"title":"4. 检查字段是否带有特定类型的注解","slug":"_4-检查字段是否带有特定类型的注解","link":"#_4-检查字段是否带有特定类型的注解","children":[]},{"level":2,"title":"5. Field_方法_getAnnotations_和_getDeclaredAnnotations","slug":"_5-field-方法-getannotations-和-getdeclaredannotations","link":"#_5-field-方法-getannotations-和-getdeclaredannotations","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721906395000,"updatedTime":1721906395000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.85,"words":856},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Get a Field s Annotations Using Reflection.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用反射获取字段注解</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习如何获取字段的注解。此外，我们将解释保留策略元注解的工作原理。然后，我们将展示返回字段注解的两种方法之间的区别。</p>\\n<h2>2. 注解的保留策略</h2>\\n<p>首先，让我们看看_Retention_注解。它定义了注解的生命周期。这个元注解接受一个_RetentionPolicy_属性。也就是说，该属性定义了注解可见的生命周期：</p>\\n<ul>\\n<li><em>RetentionPolicy.SOURCE</em> – 仅在源代码中可见</li>\\n<li><em>RetentionPolicy.CLASS</em> – 在编译时对编译器可见</li>\\n<li><em>RetentionPolicy.RUNTIME</em> – 对编译器和运行时都可见</li>\\n</ul>","autoDesc":true}');export{r as comp,k as data};
