import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-COaDJFIk.js";const p={},e=t(`<hr><h1 id="如何在java中检查对象是否为数组" tabindex="-1"><a class="header-anchor" href="#如何在java中检查对象是否为数组"><span>如何在Java中检查对象是否为数组</span></a></h1><p>在Java中，经常需要确定给定的对象是否为数组。这在几种不同的情况下都可能很有用，例如在以通用方式使用数组或在我们的代码中执行类型检查时。</p><p>在本教程中，我们将探讨如何实现这种判断。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们看看两个对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token class-name">Object</span> <span class="token constant">ARRAY_INT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">final</span> <span class="token class-name">Object</span> <span class="token constant">ARRAY_PERSON</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Jackie Chan&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Hong Kong&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Tom Hanks&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;United States&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在_Object_类型中声明了两个对象。此外，两个对象都是数组。一个是原始数组（<em>int[]</em>），另一个是_Person_实例数组（<em>Person[]</em>）。好吧，《Person_是一个简单的POJO类，有两个属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token class-name">Location</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> location<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token namespace">this<span class="token punctuation">.</span></span>Location</span> <span class="token operator">=</span> location<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// getter方法省略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要找到一种方法来确定这两个对象是数组。Java提供了简单直接的方法来检查一个对象是否是数组。在本教程中，我们将学习两种不同的方法：</p><ul><li>使用_instanceof_运算符</li><li>使用_Class.isArray()_方法</li></ul><p>为了简单起见，我们将使用单元测试断言来验证每种方法是否都能给我们预期的结果。</p><p>接下来，让我们看看它们是如何工作的。</p><h2 id="_3-使用-instanceof-运算符" tabindex="-1"><a class="header-anchor" href="#_3-使用-instanceof-运算符"><span>3. 使用_instanceof_运算符</span></a></h2><p>Java中的_instanceof_运算符用于确定给定对象的类型。它采用的形式是_obj instanceof type_，其中_obj_是正在检查的对象，_type_是正在检查的类型。</p><p><strong>由于我们通常想要检查对象是否是数组，我们可以使用_Object[]_作为类型</strong>。例如，以这种方式检查_Person_数组按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token constant">ARRAY_PERSON</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，在Java中，我们有原始数组和对象数组。例如，我们的_ARRAY_INT_是一个原始数组。<strong>如果我们使用相同的方法检查原始数组，它将失败</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token constant">ARRAY_INT</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>instanceof_运算符返回_true</em>，如果我们用类型_int[]_检查_ARRAY_INT_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token constant">ARRAY_INT</span> <span class="token keyword">instanceof</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但我们不知道给定的对象是否是类型_Object[]_、<em>int[]</em>、<em>long[]<em>或_short[]</em>。所以，**给定一个类型为_Object_的实例_obj</em>，如果我们想使用_instanceof_方法来检查它是否是数组，我们需要涵盖对象数组和所有原始数组的情况**：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>obj <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span> obj <span class="token keyword">instanceof</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span>
obj <span class="token keyword">instanceof</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span> obj <span class="token keyword">instanceof</span> <span class="token keyword">short</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span>
obj <span class="token keyword">instanceof</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span> obj <span class="token keyword">instanceof</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span>
obj <span class="token keyword">instanceof</span> <span class="token keyword">long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span> obj <span class="token keyword">instanceof</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span>
obj <span class="token keyword">instanceof</span> <span class="token keyword">double</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查逻辑有点长。然而，我们可以将这个检查放在一个方法中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isArray</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> obj <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span> obj <span class="token keyword">instanceof</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span>
      obj <span class="token keyword">instanceof</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span> obj <span class="token keyword">instanceof</span> <span class="token keyword">short</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span>
      obj <span class="token keyword">instanceof</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span> obj <span class="token keyword">instanceof</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span>
      obj <span class="token keyword">instanceof</span> <span class="token keyword">long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span> obj <span class="token keyword">instanceof</span> <span class="token keyword">float</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">||</span>
      obj <span class="token keyword">instanceof</span> <span class="token keyword">double</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以使用我们的_isArray()_方法来检查对象和原始数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token constant">ARRAY_PERSON</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token constant">ARRAY_INT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-class-isarray-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-class-isarray-方法"><span>4. 使用_Class.isArray()_方法</span></a></h2><p>我们已经学会了使用_instanceof_运算符来确定给定的对象是否是数组。这种方法可以完成工作。然而，实现看起来冗长，因为我们需要涵盖所有原始数组场景。所以接下来，让我们看看另一种更简洁的方法：使用_Class.isArray()_方法。</p><p>方法的名字告诉我们它实际上做了什么。<em>Class.isArray()<em>方法属于_java.lang.Class_类，如果指定的对象是数组，它返回_true</em>，否则返回_false</em>。此外，<strong>_Class.isArray()_方法可以处理对象和所有原始数组</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token constant">ARRAY_INT</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token constant">ARRAY_PERSON</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，如果<strong>我们需要知道数组元素的类型，我们可以使用_Class.getComponentType()_方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token constant">ARRAY_PERSON</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getComponentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token constant">ARRAY_INT</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getComponentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们知道给定的对象是数组及其元素的类型，我们可以使用_Array.get()_方法检索所需的元素，并将其转换为具体类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">ARRAY_PERSON</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token constant">ARRAY_PERSON</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getComponentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">)</span> <span class="token class-name">Array</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ARRAY_PERSON</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Tom Hanks&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">ARRAY_INT</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token constant">ARRAY_INT</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getComponentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token class-name">Array</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ARRAY_INT</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们学习了两种检查给定对象是否为数组的方法。</p><p>我们看到，如果我们使用_instanceof_运算符，我们必须涵盖对象数组和所有原始数组场景。另一方面，_Class.isArray()_方法更直接，它适用于对象和所有原始数组。</p><p>像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。</p>`,39),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-09-Check if Object Is an Array in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Check%20if%20Object%20Is%20an%20Array%20in%20Java.html","title":"如何在Java中检查对象是否为数组","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Arrays"],"tag":["Java","Arrays"],"head":[["meta",{"name":"keywords","content":"Java, Array, Object, instanceof, Class.isArray()"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Check%20if%20Object%20Is%20an%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中检查对象是否为数组"}],["meta",{"property":"og:description","content":"如何在Java中检查对象是否为数组 在Java中，经常需要确定给定的对象是否为数组。这在几种不同的情况下都可能很有用，例如在以通用方式使用数组或在我们的代码中执行类型检查时。 在本教程中，我们将探讨如何实现这种判断。 2. 问题介绍 首先，让我们看看两个对象： 我们在_Object_类型中声明了两个对象。此外，两个对象都是数组。一个是原始数组（int[..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T10:00:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Arrays"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T10:00:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中检查对象是否为数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T10:00:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Java中检查对象是否为数组 在Java中，经常需要确定给定的对象是否为数组。这在几种不同的情况下都可能很有用，例如在以通用方式使用数组或在我们的代码中执行类型检查时。 在本教程中，我们将探讨如何实现这种判断。 2. 问题介绍 首先，让我们看看两个对象： 我们在_Object_类型中声明了两个对象。此外，两个对象都是数组。一个是原始数组（int[..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用_instanceof_运算符","slug":"_3-使用-instanceof-运算符","link":"#_3-使用-instanceof-运算符","children":[]},{"level":2,"title":"4. 使用_Class.isArray()_方法","slug":"_4-使用-class-isarray-方法","link":"#_4-使用-class-isarray-方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720519229000,"updatedTime":1720519229000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.8,"words":1140},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Check if Object Is an Array in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何在Java中检查对象是否为数组</h1>\\n<p>在Java中，经常需要确定给定的对象是否为数组。这在几种不同的情况下都可能很有用，例如在以通用方式使用数组或在我们的代码中执行类型检查时。</p>\\n<p>在本教程中，我们将探讨如何实现这种判断。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们看看两个对象：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Object</span> <span class=\\"token constant\\">ARRAY_INT</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">5</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Object</span> <span class=\\"token constant\\">ARRAY_PERSON</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Person</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Jackie Chan\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"Hong Kong\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Tom Hanks\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"United States\\"</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
