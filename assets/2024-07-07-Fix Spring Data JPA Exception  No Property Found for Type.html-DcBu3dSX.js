import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CtR6X2Br.js";const t={},p=e(`<h1 id="解决spring-data-jpa异常-未找到类型的属性" tabindex="-1"><a class="header-anchor" href="#解决spring-data-jpa异常-未找到类型的属性"><span>解决Spring Data JPA异常：未找到类型的属性</span></a></h1><p>在这篇简短的文章中，我们将解释如何修复Spring Data JPA异常_&quot;PropertyReferenceException: 未找到类型的属性&quot;_。</p><p>首先，我们将解释导致此异常的主要原因。然后，我们将通过实际示例说明如何重现它，以及如何修复它。</p><h2 id="_2-原因" tabindex="-1"><a class="header-anchor" href="#_2-原因"><span>2. 原因</span></a></h2><p>在深入了解细节之前，让我们尝试理解异常的含义。</p><p>&quot;未找到类型的属性&quot;的堆栈跟踪简单地告诉我们，未找到指定的属性。当Spring Data无法访问不存在或未定义的属性时，会抛出此异常。</p><p>通常，Spring Data根据派生查询方法的名称自动生成SQL查询。因此，导致异常的最常见原因是<strong>使用无效属性定义查询方法</strong>。</p><p>另一个原因可能是<strong>在访问属性时拼写属性名称错误</strong>。</p><h2 id="_3-重现异常" tabindex="-1"><a class="header-anchor" href="#_3-重现异常"><span>3. 重现异常</span></a></h2><p>现在我们知道了异常的含义，让我们看看如何在实践中重现它。</p><p>例如，让我们考虑_Person_实体类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>

    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们为我们的_Person_类创建一个Spring Data JPA仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PersonRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将添加一个按名字查询人的查询方法。但是，让我们假设我们拼错了_firstName_属性。</p><p>例如，让我们写成_firsttName_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Person</span> <span class="token function">findByFirsttName</span><span class="token punctuation">(</span><span class="token class-name">String</span> lastName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，如果我们启动Spring Boot应用程序，我们会得到：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span></span>BeanCreationException</span><span class="token operator">:</span> <span class="token class-name">Error</span> creating bean <span class="token keyword">with</span> <span class="token namespace">name</span> &#39;personRepository&#39; defined in <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>nopropertyfound<span class="token punctuation">.</span>repository<span class="token punctuation">.</span></span>PersonRepository</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token class-name">Caused</span> by<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>IllegalArgumentException</span><span class="token operator">:</span> <span class="token class-name">Failed</span> <span class="token keyword">to</span> <span class="token namespace">create</span> query <span class="token keyword">for</span> method <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>nopropertyfound<span class="token punctuation">.</span>model<span class="token punctuation">.</span></span>Person</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>nopropertyfound<span class="token punctuation">.</span>repository<span class="token punctuation">.</span></span>PersonRepository</span><span class="token punctuation">.</span><span class="token function">findByFirsttName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>String</span><span class="token punctuation">)</span><span class="token operator">!</span>
<span class="token class-name">No</span> property &#39;firsttName&#39; found <span class="token keyword">for</span> type <span class="token char">&#39;Person&#39;</span><span class="token punctuation">;</span> <span class="token class-name">Did</span> you mean &#39;firstName&#39;
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token class-name">Caused</span> by<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>mapping<span class="token punctuation">.</span></span>PropertyReferenceException</span><span class="token operator">:</span> <span class="token class-name">No</span> property &#39;firsttName&#39; found <span class="token keyword">for</span> type <span class="token char">&#39;Person&#39;</span><span class="token punctuation">;</span> <span class="token class-name">Did</span> you mean &#39;firstName&#39;
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在日志中看到的，Spring Boot因_&quot;PropertyReferenceException: 未找到Person类型的&#39;firsttName&#39;属性&quot;_而失败。</p><p><strong>Spring Data在启动时自动检查生成的SQL查询是否有效</strong>。</p><p>由于我们使用的属性不存在(<em>firsttName</em>)，Spring Data无法生成SQL查询，因此出现了异常。</p><h2 id="_4-解决案" tabindex="-1"><a class="header-anchor" href="#_4-解决案"><span>4. <strong>解决案</strong></span></a></h2><p><strong>修复异常的唯一方法是：在定义查询方法时使用确切的属性名称</strong>。</p><p>因此，要修复这个问题，我们需要将_findByFirsttName()<em>重命名为_findByFirstName()</em>。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Person</span> <span class="token function">findByFirstName</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们通过一个测试用例来确认一切按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenQueryMethod_whenUsingValidProperty_thenCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">Person</span> person <span class="token operator">=</span> personRepository<span class="token punctuation">.</span><span class="token function">findByFirstName</span><span class="token punctuation">(</span><span class="token string">&quot;Azhrioun&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Abderrahim&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">getLastName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，查询方法_findByFirstName()_没有失败，并且能够按名字返回一个人。</p><p>总之，这里有一些关键点需要注意以避免_&quot;PropertyReferenceException&quot;_：</p><ul><li>在定义查询方法时使用确切的属性名称。</li><li>避免使用缩写或拼写错误的名字。</li><li>再次检查实体类，确保我们要引用的属性存在并且拼写正确。</li><li>使用具有自动完成功能的代码编辑器，以减少拼写错误属性名称的风险。</li><li>为查询方法编写单元或集成测试，以确保它们返回预期结果。</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，我们详细讨论了什么导致Spring Data抛出_&quot;PropertyReferenceException: 未找到类型的属性&quot;_。</p><p>在此过程中，我们使用实际示例说明了如何产生异常以及如何修复它。</p><p>如常，示例的完整源代码可在GitHub上获得。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/9a8dd50c78e0b9d049466e9097331198?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,37),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-07-07-Fix Spring Data JPA Exception  No Property Found for Type.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Fix%20Spring%20Data%20JPA%20Exception%20%20No%20Property%20Found%20for%20Type.html","title":"解决Spring Data JPA异常：未找到类型的属性","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data JPA","Exception Handling"],"tag":["PropertyReferenceException","Spring Data","JPA"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, JPA Exception, PropertyReferenceException"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Fix%20Spring%20Data%20JPA%20Exception%20%20No%20Property%20Found%20for%20Type.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决Spring Data JPA异常：未找到类型的属性"}],["meta",{"property":"og:description","content":"解决Spring Data JPA异常：未找到类型的属性 在这篇简短的文章中，我们将解释如何修复Spring Data JPA异常_\\"PropertyReferenceException: 未找到类型的属性\\"_。 首先，我们将解释导致此异常的主要原因。然后，我们将通过实际示例说明如何重现它，以及如何修复它。 2. 原因 在深入了解细节之前，让我们尝试理..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T05:39:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PropertyReferenceException"}],["meta",{"property":"article:tag","content":"Spring Data"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T05:39:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决Spring Data JPA异常：未找到类型的属性\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/9a8dd50c78e0b9d049466e9097331198?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T05:39:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决Spring Data JPA异常：未找到类型的属性 在这篇简短的文章中，我们将解释如何修复Spring Data JPA异常_\\"PropertyReferenceException: 未找到类型的属性\\"_。 首先，我们将解释导致此异常的主要原因。然后，我们将通过实际示例说明如何重现它，以及如何修复它。 2. 原因 在深入了解细节之前，让我们尝试理..."},"headers":[{"level":2,"title":"2. 原因","slug":"_2-原因","link":"#_2-原因","children":[]},{"level":2,"title":"3. 重现异常","slug":"_3-重现异常","link":"#_3-重现异常","children":[]},{"level":2,"title":"4. 解决案","slug":"_4-解决案","link":"#_4-解决案","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720330778000,"updatedTime":1720330778000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.09,"words":927},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Fix Spring Data JPA Exception  No Property Found for Type.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的文章中，我们将解释如何修复Spring Data JPA异常_\\"PropertyReferenceException: 未找到类型的属性\\"_。</p>\\n<p>首先，我们将解释导致此异常的主要原因。然后，我们将通过实际示例说明如何重现它，以及如何修复它。</p>\\n<h2>2. 原因</h2>\\n<p>在深入了解细节之前，让我们尝试理解异常的含义。</p>\\n<p>\\"未找到类型的属性\\"的堆栈跟踪简单地告诉我们，未找到指定的属性。当Spring Data无法访问不存在或未定义的属性时，会抛出此异常。</p>\\n<p>通常，Spring Data根据派生查询方法的名称自动生成SQL查询。因此，导致异常的最常见原因是<strong>使用无效属性定义查询方法</strong>。</p>","autoDesc":true}');export{d as comp,m as data};
