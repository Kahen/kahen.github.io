import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,a as e}from"./app-LwwahXlT.js";const t={},c=e(`<hr><h1 id="在java中从字符串获取类类型" tabindex="-1"><a class="header-anchor" href="#在java中从字符串获取类类型"><span>在Java中从字符串获取类类型</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><code>Class</code>类在Java反射中扮演着重要的角色，它是所有反射操作的起点。</p><p>在这个快速教程中，我们将探讨如何从一个字符串中的类名获取<code>Class</code>对象。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>首先，让我们创建一个简单的类作为示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>getclassfromstr</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyNiceClass</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hi there, I wish you all the best!&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上面的代码所示，<strong><code>MyNiceClass</code>类是创建在<code>com.baeldung.getclassfromstr</code>包中的</strong>。此外，该类只有一个方法<code>greeting()</code>，它返回一个<code>String</code>。</p><p>我们的目标是从<code>MyNiceClass</code>类的名称获取其<code>Class</code>对象。进一步，我们想从<code>Class</code>对象创建一个<code>MyNiceClass</code>的实例，以验证<code>Class</code>对象是否是我们所追求的。</p><p>为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否按预期工作。</p><p>接下来，让我们看看它是如何工作的。</p><h2 id="_3-使用forname-方法获取class对象" tabindex="-1"><a class="header-anchor" href="#_3-使用forname-方法获取class对象"><span>3. 使用<code>forName()</code>方法获取<code>Class</code>对象</span></a></h2><p><code>Class</code>类提供了<code>forName()</code>方法来从类名字符串获取<code>Class</code>对象。接下来，让我们看看如何调用这个方法来获取<code>MyNiceClass</code>的<code>Class</code>对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Class</span> cls <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.getclassfromstr.MyNiceClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNotNull</span><span class="token punctuation">(</span>cls<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们从<code>Class</code>对象<code>cls</code>创建一个<code>MyNiceClass</code>实例。如果我们的Java版本早于9，我们可以使用<code>cls.newInstance()</code>方法。然而，<strong>这个方法自Java 9以来已经被弃用</strong>。对于较新的Java版本，我们可以使用<code>cls.getDeclaredConstructor().newInstance()</code>来从<code>Class</code>对象获取一个新实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MyNiceClass</span> myNiceObject <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MyNiceClass</span><span class="token punctuation">)</span> cls<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertNotNull</span><span class="token punctuation">(</span>myNiceObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hi there, I wish you all the best!&quot;</span><span class="token punctuation">,</span> myNiceObject<span class="token punctuation">.</span><span class="token function">greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行测试时，测试通过。因此，我们已经从类名获取了所需的<code>Class</code>对象。</p><p>值得一提的是，<strong>要获取<code>Class</code>对象，我们必须向<code>forName()</code>方法传递一个完全限定的类名，而不是一个简单的名字</strong>。例如，我们应该向<code>forName()</code>方法传递字符串<code>&quot;com.baeldung.getclassfromstr.MyNiceClass&quot;</code>。否则，<code>forName()</code>方法会抛出<code>ClassNotFoundException</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">ClassNotFoundException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;MyNiceClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-关于异常处理的一些话" tabindex="-1"><a class="header-anchor" href="#_4-关于异常处理的一些话"><span>4. 关于异常处理的一些话</span></a></h2><p>我们已经看到了如何从类名获取<code>MyNiceClass</code>的<code>Class</code>对象。为了简单起见，在测试中我们省略了异常处理。现在，让我们看看在使用<code>Class.forName()</code>和<code>cls.getDeclaredConstructor().newInstance()</code>方法时我们应该处理哪些异常。</p><p>首先，<code>Class.forName()</code>会抛出<code>ClassNotFoundException</code>。我们提到了当我们传递<code>MyNiceClass</code>的简单名称时。<strong><code>ClassNotFoundException</code>是一个检查异常</strong>。因此，在调用<code>Class.forName()</code>方法时，我们必须处理它。</p><p>接下来，让我们看看<code>cls.getDeclaredConstructor()</code>和<code>newInstance()</code>。<strong><code>getDeclaredConstructor()</code>方法会抛出</strong><code>NoSuchMethodException</code>。同时，<strong><code>newInstance()</code>会抛出<code>InstantiationException, IllegalAccessException, IllegalArgumentException, 和 InvocationTargetException</code></strong>。这五个异常都是检查异常。因此，如果我们使用这两种方法，我们需要处理它们。</p><p>值得一提的是，我们在本节讨论的所有异常都是<code>ReflectiveOperationException</code>的子类型。也就是说，<strong>如果我们不想单独处理这些异常，我们可以处理<code>ReflectiveOperationException</code></strong>，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">someNiceMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ReflectiveOperationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Class</span> cls <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.getclassfromstr.MyNiceClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MyNiceClass</span> myNiceObject <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MyNiceClass</span><span class="token punctuation">)</span> cls<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以使用<code>try-catch</code>块：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">Class</span> cls <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.getclassfromstr.MyNiceClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MyNiceClass</span> myNiceObject <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MyNiceClass</span><span class="token punctuation">)</span> cls<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ReflectiveOperationException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理异常</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇短文中，我们学习了如何使用<code>Class.forName()</code>方法从给定的类名字符串获取<code>Class</code>对象。我们应该注意，我们应该向<code>Class.forName()</code>方法传递完全限定的名称。</p><p>一如既往，本文使用的所有代码示例都可以在GitHub上找到。</p>`,31),o=[c];function p(l,i){return n(),s("div",null,o)}const r=a(t,[["render",p],["__file","2024-07-10-Getting Class Type From a String in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Getting%20Class%20Type%20From%20a%20String%20in%20Java.html","title":"在Java中从字符串获取类类型","lang":"zh-CN","frontmatter":{"category":["Java","反射"],"tag":["Class","forName","newInstance"],"head":[["meta",{"name":"keywords","content":"Java反射,Class对象,forName方法,newInstance方法"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Getting%20Class%20Type%20From%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从字符串获取类类型"}],["meta",{"property":"og:description","content":"在Java中从字符串获取类类型 1. 概述 Class类在Java反射中扮演着重要的角色，它是所有反射操作的起点。 在这个快速教程中，我们将探讨如何从一个字符串中的类名获取Class对象。 2. 问题介绍 首先，让我们创建一个简单的类作为示例： 如上面的代码所示，MyNiceClass类是创建在com.baeldung.getclassfromstr包..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T21:01:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Class"}],["meta",{"property":"article:tag","content":"forName"}],["meta",{"property":"article:tag","content":"newInstance"}],["meta",{"property":"article:modified_time","content":"2024-07-10T21:01:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从字符串获取类类型\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-10T21:01:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从字符串获取类类型 1. 概述 Class类在Java反射中扮演着重要的角色，它是所有反射操作的起点。 在这个快速教程中，我们将探讨如何从一个字符串中的类名获取Class对象。 2. 问题介绍 首先，让我们创建一个简单的类作为示例： 如上面的代码所示，MyNiceClass类是创建在com.baeldung.getclassfromstr包..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用forName()方法获取Class对象","slug":"_3-使用forname-方法获取class对象","link":"#_3-使用forname-方法获取class对象","children":[]},{"level":2,"title":"4. 关于异常处理的一些话","slug":"_4-关于异常处理的一些话","link":"#_4-关于异常处理的一些话","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720645310000,"updatedTime":1720645310000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.01,"words":904},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Getting Class Type From a String in Java.md","localizedDate":"2024年7月10日","excerpt":"<hr>\\n<h1>在Java中从字符串获取类类型</h1>\\n<h2>1. 概述</h2>\\n<p><code>Class</code>类在Java反射中扮演着重要的角色，它是所有反射操作的起点。</p>\\n<p>在这个快速教程中，我们将探讨如何从一个字符串中的类名获取<code>Class</code>对象。</p>\\n<h2>2. 问题介绍</h2>\\n<p>首先，让我们创建一个简单的类作为示例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">package</span> <span class=\\"token namespace\\">com<span class=\\"token punctuation\\">.</span>baeldung<span class=\\"token punctuation\\">.</span>getclassfromstr</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">MyNiceClass</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">greeting</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">\\"Hi there, I wish you all the best!\\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
