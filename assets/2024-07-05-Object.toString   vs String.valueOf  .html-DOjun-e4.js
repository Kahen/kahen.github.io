import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-_uhw5edP.js";const e={},p=t(`<h1 id="object-tostring-与-string-valueof-baeldung" tabindex="-1"><a class="header-anchor" href="#object-tostring-与-string-valueof-baeldung"><span>Object.toString() 与 String.valueOf() | Baeldung</span></a></h1><p>在这篇文章中，我们将讨论 String.valueOf() 和 Object.toString() 方法。String.valueOf() 和 Object.toString() 方法都可以将数据类型转换为字符串，但我们使用它们的方式不同。我们将探讨各自的使用方式及其差异。</p><h2 id="_2-tostring-方法" tabindex="-1"><a class="header-anchor" href="#_2-tostring-方法"><span>2. toString() 方法</span></a></h2><p>toString() 方法位于 Java 的 Object 类中，它是 Java 中所有其他对象的父类。这意味着我们可以在任何对象上调用 toString() 方法，它将返回类的字符串表示。默认情况下，它会返回类的名称和一个 hashCode 的表示，但通过重写 toString() 方法，我们可以得到一些有用的信息。</p><p>建议类重写 toString() 方法以提供关于实例的简洁但有用的信息。这里我们有一个重写 toString() 方法的简单类，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Student(&quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;, age &quot;</span> <span class="token operator">+</span> age <span class="token operator">+</span> <span class="token char">&#39;)&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-string-valueof-方法" tabindex="-1"><a class="header-anchor" href="#_3-string-valueof-方法"><span>3. String.valueOf() 方法</span></a></h2><p>String.valueOf() 是一个静态方法，我们可以使用它将各种数据类型转换为字符串。像大多数 valueOf() 方法一样，它有几个重载的变体，允许它接受以下任何参数：</p><ul><li>布尔值或 Boolean</li><li>字符 Char</li><li>字符数组 Char[]</li><li>双精度浮点数 double 或 Double</li><li>单精度浮点数 float 或 Float</li><li>整数 int 或 Integer</li><li>长整数 long 或 Long</li><li>对象 Object</li></ul><p>String.valueOf() 的实现正如我们所期望的。它将返回布尔值的 &quot;true&quot; 或 &quot;false&quot; 字符串。我们可以将字符或字符数组转换为字符串。对于数字，它将返回该数字的字符串表示。</p><p>我们可以像这样测试 String.valueOf() 的结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCallingValueOf_thenMapToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> exampleCharArray <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;c&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name">Student</span> alice <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>exampleCharArray<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;123.935&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">123.935</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2222.3&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">2222.3f</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;2222&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">2222</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;123456789&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">123456789L</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Student(Alice, age 5)&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>alice<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，当我们将 Student 对象传递给 valueOf() 时，我们得到的是我们上面定义的 toString() 方法的结果。</p><p>一个有趣的情况是，如果我们传递 null 给 valueOf()，它将返回字符串 &quot;null&quot; 而不是抛出空指针异常。</p><h2 id="_4-我们应该使用哪一个" tabindex="-1"><a class="header-anchor" href="#_4-我们应该使用哪一个"><span>4. 我们应该使用哪一个？</span></a></h2><p>String.valueOf() 和 Object.toString() 方法有不同的用例，因此我们应该两者都使用。<strong>当我们创建一个新类时，我们应该重写 toString() 方法以输出有关实例的有用信息。</strong></p><p>当我们将一个对象传递给 String.valueOf() 时，它将调用该对象上的 toString() 方法并返回输出。当我们想要将对象转换为字符串时，toString() 方法允许我们自定义输出。String.valueOf() 允许我们安全地将对象转换为字符串，而无需管理 null 值。</p><p><strong>当我们需要将一个实例转换为字符串时，我们应该使用 String.valueOf() 方法以确保空值安全。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们已经看到了 String.valueOf() 和 Object.toString() 如何协同工作，以及我们如何使用它们将数据类型转换为字符串。</p><p>String.valueOf() 和 Object.toString() 提供了相似的结果，但我们使用它们的方式不同。静态的 String.valueOf() 允许我们传递各种数据并返回具有空值安全保障的字符串。Object.toString() 是为了让我们重写并提供实例的文本表示。</p><p>所有代码示例都可以在 GitHub 上找到。</p><p>OK</p>`,23),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-05-Object.toString   vs String.valueOf  .html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Object.toString%20%20%20vs%20String.valueOf%20%20.html","title":"Object.toString() 与 String.valueOf() | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","编程"],"tag":["Object.toString()","String.valueOf()"],"head":[["meta",{"name":"keywords","content":"Java, toString, String.valueOf, 对象转换字符串"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Object.toString%20%20%20vs%20String.valueOf%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Object.toString() 与 String.valueOf() | Baeldung"}],["meta",{"property":"og:description","content":"Object.toString() 与 String.valueOf() | Baeldung 在这篇文章中，我们将讨论 String.valueOf() 和 Object.toString() 方法。String.valueOf() 和 Object.toString() 方法都可以将数据类型转换为字符串，但我们使用它们的方式不同。我们将探讨各自的使..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T12:52:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Object.toString()"}],["meta",{"property":"article:tag","content":"String.valueOf()"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T12:52:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Object.toString() 与 String.valueOf() | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T12:52:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Object.toString() 与 String.valueOf() | Baeldung 在这篇文章中，我们将讨论 String.valueOf() 和 Object.toString() 方法。String.valueOf() 和 Object.toString() 方法都可以将数据类型转换为字符串，但我们使用它们的方式不同。我们将探讨各自的使..."},"headers":[{"level":2,"title":"2. toString() 方法","slug":"_2-tostring-方法","link":"#_2-tostring-方法","children":[]},{"level":2,"title":"3. String.valueOf() 方法","slug":"_3-string-valueof-方法","link":"#_3-string-valueof-方法","children":[]},{"level":2,"title":"4. 我们应该使用哪一个？","slug":"_4-我们应该使用哪一个","link":"#_4-我们应该使用哪一个","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720183929000,"updatedTime":1720183929000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.87,"words":861},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Object.toString   vs String.valueOf  .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇文章中，我们将讨论 String.valueOf() 和 Object.toString() 方法。String.valueOf() 和 Object.toString() 方法都可以将数据类型转换为字符串，但我们使用它们的方式不同。我们将探讨各自的使用方式及其差异。</p>\\n<h2>2. toString() 方法</h2>\\n<p>toString() 方法位于 Java 的 Object 类中，它是 Java 中所有其他对象的父类。这意味着我们可以在任何对象上调用 toString() 方法，它将返回类的字符串表示。默认情况下，它会返回类的名称和一个 hashCode 的表示，但通过重写 toString() 方法，我们可以得到一些有用的信息。</p>","autoDesc":true}');export{k as comp,g as data};
