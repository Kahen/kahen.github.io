import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Ckd2YV4o.js";const p={},e=t(`<h1 id="java中在同一行读取多个输入" tabindex="-1"><a class="header-anchor" href="#java中在同一行读取多个输入"><span>Java中在同一行读取多个输入</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p><em>Scanner</em> 类是Java中用于从控制台读取输入的有用工具。我们通常使用 <em>next()</em> 或 <em>nextLine()</em> 方法来逐行读取每个输入。然而，有时我们可能想要在同一行读取多个输入。</p><p><strong>在本教程中，我们将探索实现这一点的不同方式，例如使用空格或自定义分隔符，甚至使用正则表达式。</strong></p><h3 id="_2-1-使用空格作为分隔符" tabindex="-1"><a class="header-anchor" href="#_2-1-使用空格作为分隔符"><span>2.1. 使用空格作为分隔符</span></a></h3><p>在同一行读取多个输入的一种方法是使用空格作为分隔符。以下是一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;输入两个数字：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num1 <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num2 <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;您输入了 &quot;</span> <span class="token operator">+</span> num1 <span class="token operator">+</span> <span class="token string">&quot; 和 &quot;</span> <span class="token operator">+</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用 <em>nextInt()</em> 方法从控制台读取两个整数。<strong>由于我们在同一行上读取它们，我们使用空格作为分隔符来分隔这两个整数。</strong></p><h3 id="_2-2-使用自定义分隔符" tabindex="-1"><a class="header-anchor" href="#_2-2-使用自定义分隔符"><span>2.2. 使用自定义分隔符</span></a></h3><p>如果我们不想使用空格作为分隔符，我们可以通过调用 <em>setDelimiter()</em> 方法在_Scanner_对象上使用自定义分隔符。以下是一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
scanner<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;输入两个用分号分隔的数字：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num1 <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num2 <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;您输入了 &quot;</span> <span class="token operator">+</span> num1 <span class="token operator">+</span> <span class="token string">&quot; 和 &quot;</span> <span class="token operator">+</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用分号代替空格作为分隔符。<strong>我们还调用 <em>setDelimiter()</em> 方法将分隔符设置为分号。</strong></p><h3 id="_2-3-使用正则表达式作为分隔符" tabindex="-1"><a class="header-anchor" href="#_2-3-使用正则表达式作为分隔符"><span>2.3. 使用正则表达式作为分隔符</span></a></h3><p>除了使用空格或自定义分隔符外，我们还可以使用正则表达式作为分隔符来在同一行上读取多个输入。<strong>正则表达式是可以灵活且强大地匹配字符串的模式。</strong></p><p>例如，如果我们想在同一行上读取由空格或逗号分隔的多个输入，我们可以使用以下代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
scanner<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;[\\\\s,]+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;输入两个用空格或逗号分隔的数字：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num1 <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> num2 <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;您输入了 &quot;</span> <span class="token operator">+</span> num1 <span class="token operator">+</span> <span class="token string">&quot; 和 &quot;</span> <span class="token operator">+</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用正则表达式 \\[\\s,\\]+ 作为分隔符。这个正则表达式匹配一个或多个空格或逗号。</p><h2 id="_3-错误处理" tabindex="-1"><a class="header-anchor" href="#_3-错误处理"><span>3. 错误处理</span></a></h2><p>在同一行读取多个输入时，处理可能发生的错误非常重要。<strong>例如，如果用户输入了无效的输入，比如输入了一个 <em>String</em> 而不是 <em>Integer</em>，程序将抛出异常。</strong></p><p>为了处理这个错误，我们可以使用 <em>try-catch</em> 块来优雅地捕获和处理异常。以下是一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
scanner<span class="token punctuation">.</span><span class="token function">useDelimiter</span><span class="token punctuation">(</span><span class="token string">&quot;;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;输入两个用分号分隔的数字：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> num1 <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> num2 <span class="token operator">=</span> scanner<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;您输入了 &quot;</span> <span class="token operator">+</span> num1 <span class="token operator">+</span> <span class="token string">&quot; 和 &quot;</span> <span class="token operator">+</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InputMismatchException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;输入无效。请输入两个用分号分隔的整数。&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用 <em>try-catch</em> 块来捕获可能抛出的 <em>InputMismatchException</em>，如果用户输入了无效的输入。如果捕获到这个异常，我们打印一个错误消息，并要求用户重新输入。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p><strong>在本文中，我们讨论了如何使用 <em>Scanner</em> 类在同一行上读取多个输入。</strong></p><p>完整的示例代码可以在GitHub上找到。</p><p>OK</p>`,26),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-05-Read Multiple Inputs on the Same Line in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Read%20Multiple%20Inputs%20on%20the%20Same%20Line%20in%20Java.html","title":"Java中在同一行读取多个输入","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Java","编程"],"tag":["Scanner","输入处理"],"head":[["meta",{"name":"keywords","content":"Java, Scanner, 输入, 多行输入, 错误处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Read%20Multiple%20Inputs%20on%20the%20Same%20Line%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中在同一行读取多个输入"}],["meta",{"property":"og:description","content":"Java中在同一行读取多个输入 1. 引言 Scanner 类是Java中用于从控制台读取输入的有用工具。我们通常使用 next() 或 nextLine() 方法来逐行读取每个输入。然而，有时我们可能想要在同一行读取多个输入。 在本教程中，我们将探索实现这一点的不同方式，例如使用空格或自定义分隔符，甚至使用正则表达式。 2.1. 使用空格作为分隔符 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T23:56:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Scanner"}],["meta",{"property":"article:tag","content":"输入处理"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T23:56:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中在同一行读取多个输入\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T23:56:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中在同一行读取多个输入 1. 引言 Scanner 类是Java中用于从控制台读取输入的有用工具。我们通常使用 next() 或 nextLine() 方法来逐行读取每个输入。然而，有时我们可能想要在同一行读取多个输入。 在本教程中，我们将探索实现这一点的不同方式，例如使用空格或自定义分隔符，甚至使用正则表达式。 2.1. 使用空格作为分隔符 ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[{"level":3,"title":"2.1. 使用空格作为分隔符","slug":"_2-1-使用空格作为分隔符","link":"#_2-1-使用空格作为分隔符","children":[]},{"level":3,"title":"2.2. 使用自定义分隔符","slug":"_2-2-使用自定义分隔符","link":"#_2-2-使用自定义分隔符","children":[]},{"level":3,"title":"2.3. 使用正则表达式作为分隔符","slug":"_2-3-使用正则表达式作为分隔符","link":"#_2-3-使用正则表达式作为分隔符","children":[]}]},{"level":2,"title":"3. 错误处理","slug":"_3-错误处理","link":"#_3-错误处理","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720223819000,"updatedTime":1720223819000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.85,"words":856},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Read Multiple Inputs on the Same Line in Java.md","localizedDate":"2024年7月6日","excerpt":"\\n<h2>1. 引言</h2>\\n<p><em>Scanner</em> 类是Java中用于从控制台读取输入的有用工具。我们通常使用 <em>next()</em> 或 <em>nextLine()</em> 方法来逐行读取每个输入。然而，有时我们可能想要在同一行读取多个输入。</p>\\n<p><strong>在本教程中，我们将探索实现这一点的不同方式，例如使用空格或自定义分隔符，甚至使用正则表达式。</strong></p>\\n<h3>2.1. 使用空格作为分隔符</h3>\\n<p>在同一行读取多个输入的一种方法是使用空格作为分隔符。以下是一个示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Scanner</span> scanner <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Scanner</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>in<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">print</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"输入两个数字：\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> num1 <span class=\\"token operator\\">=</span> scanner<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">nextInt</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> num2 <span class=\\"token operator\\">=</span> scanner<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">nextInt</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"您输入了 \\"</span> <span class=\\"token operator\\">+</span> num1 <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\" 和 \\"</span> <span class=\\"token operator\\">+</span> num2<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
