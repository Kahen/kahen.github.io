import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as t}from"./app-B_O3I5S1.js";const s={},o=t(`<h1 id="java中boolean-true与true的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#java中boolean-true与true的区别-baeldung"><span>Java中Boolean.TRUE与true的区别 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Java中，布尔值可以有两种表示形式：Boolean.TRUE，这是Boolean类中定义的一个常量，代表true值；以及原始值true，同样代表true。尽管它们看起来都用于表示布尔值的真，但它们之间存在着微妙的差别，开发者应当了解这些差别。</p><p><strong>在本教程中，我们将阐明这些不同之处，并帮助澄清它们的适当用法。</strong></p><h2 id="_2-理解boolean-true" tabindex="-1"><a class="header-anchor" href="#_2-理解boolean-true"><span>2. 理解Boolean.TRUE</span></a></h2><p>Boolean.TRUE是Java标准库中Boolean类定义的一个常量。它是一个Boolean包装类的实例，代表true值。</p><p><strong>作为一个对象，我们可以在期望对象引用的场景中使用Boolean.TRUE，例如集合或接受对象参数的方法。</strong></p><p>让我们看这个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">&gt;</span></span>\` booleanList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
booleanList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">boolean</span> isTrue <span class="token operator">=</span> booleanList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">assert</span> isTrue<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们创建了一个Boolean对象的ArrayList，并向其中添加了Boolean.TRUE。之后，我们使用get()方法检索布尔值，该方法自动将Boolean.TRUE对象拆箱为原始布尔值。</p><h2 id="_3-理解true" tabindex="-1"><a class="header-anchor" href="#_3-理解true"><span>3. 理解true</span></a></h2><p>另一方面，true是一个原始布尔值，代表真。它是Java中的两个布尔字面量之一。</p><p><strong>作为一个原始值，与Boolean.TRUE相比，true在内存使用和性能方面更为高效。</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> isTrue <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>isTrue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 执行一些逻辑</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们直接将true值赋给一个布尔变量，并在if语句中使用它，在条件为真时执行某些逻辑。</p><p>下面的表格总结了Boolean.TRUE和true之间的主要区别。</p><table><thead><tr><th>因素</th><th>Boolean.TRUE</th><th>true</th></tr></thead><tbody><tr><td>类型</td><td>Boolean.TRUE是Boolean类的一个对象</td><td>true是一个原始布尔值</td></tr><tr><td>内存和性能</td><td>作为一个对象，Boolean.TRUE需要额外的内存开销，因为它的对象表示</td><td>作为一个原始值，true在内存效率和性能上更好</td></tr><tr><td>针对对象的操作</td><td>由于Boolean.TRUE是一个对象，它可以在期望对象引用的场景中使用，例如集合或方法参数</td><td>原始true不能在这些场景中使用，如果需要，可以自动装箱为Boolean.TRUE</td></tr><tr><td>自动装箱和拆箱</td><td>我们可以利用拆箱将Boolean.TRUE对象转换为其对应的原始值true。</td><td>自动装箱允许自动将true转换为Boolean.TRUE，反之亦然</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了Java中Boolean.TRUE和true的区别，以便正确使用这些表示布尔值真的表示形式。虽然Boolean.TRUE是一个具有额外内存开销的对象，而true是一个提供更好性能的原始值。</p><p><strong>根据上下文和要求，开发者应选择适当的表示形式。</strong></p><p>如常，代码示例可在GitHub上找到。</p>`,21),l=[o];function r(p,i){return n(),e("div",null,l)}const d=a(s,[["render",r],["__file","2024-07-03-Difference Between Boolean.TRUE and true in Java.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-Difference%20Between%20Boolean.TRUE%20and%20true%20in%20Java.html","title":"Java中Boolean.TRUE与true的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"head":[["meta",{"name":"keywords","content":"Java, Boolean, Primitive, TRUE, constant"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-Difference%20Between%20Boolean.TRUE%20and%20true%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中Boolean.TRUE与true的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Java中Boolean.TRUE与true的区别 | Baeldung 1. 引言 在Java中，布尔值可以有两种表示形式：Boolean.TRUE，这是Boolean类中定义的一个常量，代表true值；以及原始值true，同样代表true。尽管它们看起来都用于表示布尔值的真，但它们之间存在着微妙的差别，开发者应当了解这些差别。 在本教程中，我们将阐..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T22:55:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T22:55:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中Boolean.TRUE与true的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T22:55:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中Boolean.TRUE与true的区别 | Baeldung 1. 引言 在Java中，布尔值可以有两种表示形式：Boolean.TRUE，这是Boolean类中定义的一个常量，代表true值；以及原始值true，同样代表true。尽管它们看起来都用于表示布尔值的真，但它们之间存在着微妙的差别，开发者应当了解这些差别。 在本教程中，我们将阐..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解Boolean.TRUE","slug":"_2-理解boolean-true","link":"#_2-理解boolean-true","children":[]},{"level":2,"title":"3. 理解true","slug":"_3-理解true","link":"#_3-理解true","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720047319000,"updatedTime":1720047319000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.41,"words":722},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-Difference Between Boolean.TRUE and true in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Java中，布尔值可以有两种表示形式：Boolean.TRUE，这是Boolean类中定义的一个常量，代表true值；以及原始值true，同样代表true。尽管它们看起来都用于表示布尔值的真，但它们之间存在着微妙的差别，开发者应当了解这些差别。</p>\\n<p><strong>在本教程中，我们将阐明这些不同之处，并帮助澄清它们的适当用法。</strong></p>\\n<h2>2. 理解Boolean.TRUE</h2>\\n<p>Boolean.TRUE是Java标准库中Boolean类定义的一个常量。它是一个Boolean包装类的实例，代表true值。</p>","autoDesc":true}');export{d as comp,h as data};
