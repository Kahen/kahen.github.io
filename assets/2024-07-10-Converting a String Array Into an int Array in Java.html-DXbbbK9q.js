import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DkA39C0B.js";const p={},e=t(`<hr><h1 id="java中将字符串数组转换为整数数组" tabindex="-1"><a class="header-anchor" href="#java中将字符串数组转换为整数数组"><span>Java中将字符串数组转换为整数数组</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本快速教程中，我们将探讨如何在Java中将字符串数组转换为整数数组。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们看一个字符串数组的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> stringArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;5&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;6&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;42&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们创建了一个包含七个字符串的<code>stringArray</code>。现在，我们需要将<code>stringArray</code>转换为一个整数数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expected <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">42</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如上例所示，需求相当直接。然而，在现实世界中，字符串数组可能来自不同的来源，例如用户输入或另一个系统。因此，输入数组可能包含一些不是有效数字格式的值，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> stringArrayWithInvalidNum <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;6&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;42&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>元素<code>&quot;hello&quot;</code>和<code>&quot;world&quot;</code>不是有效的数字，尽管其他的是。通常，在实际项目中检测到这些类型的值时，我们会遵循特殊的错误处理规则——例如，中止数组转换，采用特定的整数作为回退，等等。</p><p>在本教程中，<strong>我们将使用Java的最小整数作为无效字符串元素的回退</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> expectedWithInvalidInput <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">42</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们从具有所有有效元素的字符串数组开始，然后扩展解决方案以包含错误处理逻辑。</p><p>为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否按预期工作。</p><h2 id="_3-使用stream-api" tabindex="-1"><a class="header-anchor" href="#_3-使用stream-api"><span>3. 使用Stream API</span></a></h2><p>首先，让我们使用Stream API转换具有所有有效元素的字符串数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>stringArray<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mapToInt</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token operator">::</span><span class="token function">parseInt</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，<code>Arrays.stream()</code>方法将输入的字符串数组转换为<code>Stream</code>。然后，<strong><code>mapToInt()</code>中间操作将我们的流转换为<code>IntStream</code>对象</strong>。</p><p>我们使用<code>Integer.parseInt()</code>将字符串转换为整数。最后，<code>toArray()</code>将<code>IntStream</code>对象转换回数组。</p><p>那么，接下来，让我们看看无效数字格式元素的场景。</p><p><strong>假设输入字符串的格式不是有效的数字，在这种情况下，<code>Integer.parseInt()</code>方法会抛出</strong> <code>NumberFormatException</code>。</p><p>因此，我们需要将<code>mapToInt()</code>方法中的<code>Integer::parseInt</code>方法引用替换为lambda表达式，并在lambda表达式中处理<code>NumberFormatException</code>异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>stringArrayWithInvalidNum<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mapToInt</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// logging ...</span>
        <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedWithInvalidInput<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，如果我们运行测试，它会通过。</p><p>如上述代码所示，我们只改变了<code>mapToInt()</code>方法中的实现。</p><p>值得一提的是，<strong>Java Stream API在Java 8及更高版本中可用</strong>。</p><h2 id="_4-在循环中实现转换" tabindex="-1"><a class="header-anchor" href="#_4-在循环中实现转换"><span>4. 在循环中实现转换</span></a></h2><p>我们已经了解了Stream API如何解决这个问题。然而，如果我们使用的是较旧的Java版本，我们需要以不同的方式解决问题。</p><p>现在我们知道<code>Integer.parseInt()</code>完成了主要的转换工作，<strong>我们可以循环遍历数组中的元素，并在每个字符串元素上调用<code>Integer.parseInt()</code>方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>stringArray<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> stringArray<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>stringArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述实现所示，我们首先创建一个与输入字符串数组长度相同的整数数组。然后，在_for_循环中执行转换并填充结果数组。</p><p>接下来，让我们扩展实现以添加错误处理逻辑。类似于Stream API方法，只需<strong>将转换行包装在_try-catch_块中就可以解决问题</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>stringArrayWithInvalidNum<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> stringArrayWithInvalidNum<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>stringArrayWithInvalidNum<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// logging ...</span>
        result<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>expectedWithInvalidInput<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们通过示例学习了两种将字符串数组转换为整数数组的方法。此外，我们还讨论了当字符串数组包含无效数字格式时的转换处理。</p><p>如果我们的Java版本是8或更高版本，Stream API将是解决问题的最直接解决方案。否则，我们可以循环遍历字符串数组并将每个字符串元素转换为整数。</p><p>像往常一样，本文中呈现的所有代码片段都在GitHub上可用。</p>`,40),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-10-Converting a String Array Into an int Array in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Converting%20a%20String%20Array%20Into%20an%20int%20Array%20in%20Java.html","title":"Java中将字符串数组转换为整数数组","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","String Array","int Array"],"head":[["meta",{"name":"keywords","content":"Java, String Array, int Array, Conversion, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Converting%20a%20String%20Array%20Into%20an%20int%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串数组转换为整数数组"}],["meta",{"property":"og:description","content":"Java中将字符串数组转换为整数数组 1. 概述 在本快速教程中，我们将探讨如何在Java中将字符串数组转换为整数数组。 2. 问题介绍 首先，让我们看一个字符串数组的例子： 我们创建了一个包含七个字符串的stringArray。现在，我们需要将stringArray转换为一个整数数组： 如上例所示，需求相当直接。然而，在现实世界中，字符串数组可能来自..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T23:01:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"String Array"}],["meta",{"property":"article:tag","content":"int Array"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T23:01:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串数组转换为整数数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T23:01:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串数组转换为整数数组 1. 概述 在本快速教程中，我们将探讨如何在Java中将字符串数组转换为整数数组。 2. 问题介绍 首先，让我们看一个字符串数组的例子： 我们创建了一个包含七个字符串的stringArray。现在，我们需要将stringArray转换为一个整数数组： 如上例所示，需求相当直接。然而，在现实世界中，字符串数组可能来自..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用Stream API","slug":"_3-使用stream-api","link":"#_3-使用stream-api","children":[]},{"level":2,"title":"4. 在循环中实现转换","slug":"_4-在循环中实现转换","link":"#_4-在循环中实现转换","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720652498000,"updatedTime":1720652498000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.65,"words":1096},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Converting a String Array Into an int Array in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中将字符串数组转换为整数数组</h1>\\n<h2>1. 概述</h2>\\n<p>在本快速教程中，我们将探讨如何在Java中将字符串数组转换为整数数组。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们看一个字符串数组的例子：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> stringArray <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token string\\">\\"1\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"2\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"3\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"4\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"5\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"6\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"42\\"</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
