import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CbPcg273.js";const t={},p=e(`<hr><h1 id="java中的类方法与实例方法" tabindex="-1"><a class="header-anchor" href="#java中的类方法与实例方法"><span>Java中的类方法与实例方法</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探讨Java中类方法和实例方法的区别。</p><p>在面向对象编程中，方法相当于一个函数。这意味着它是一个对象可以执行的动作。当它们操作成员变量时，我们使用实例方法；当不需要类的实例即可执行方法时，我们使用静态方法。让我们更详细地理解这一点。</p><h2 id="_2-实例方法与静态方法" tabindex="-1"><a class="header-anchor" href="#_2-实例方法与静态方法"><span>2. 实例方法与静态方法</span></a></h2><p>像大多数面向对象语言一样，我们在Java中创建类定义并将它们实例化为对象。</p><p>这些对象有与之关联的属性（成员变量）和通常引用这些成员变量的方法。<strong>当方法引用非静态成员变量时，我们必须将它们定义为实例方法</strong>。</p><p>我们有时会定义一个不引用成员变量或只引用静态变量的方法。当我们这样做时，我们可以将方法设置为静态方法。<strong>这意味着我们不需要类的实例来调用该方法</strong>。</p><p>类和实例方法的行为存在差异，让我们通过一个例子开始。</p><p>要将方法定义为静态，我们只需要使用_static_关键字。以下是一个包含静态方法和实例方法的类的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class MyClass {
  public static boolean isAllLowerCaseStatic(String word) {
    return word.toLowerCase().equals(word);
  }
  public boolean isAllLowerCaseInstance(String word) {
    return word.toLowerCase().equals(word);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用这些方法时，有一个重要的区别要记住。<strong>要使用实例方法，我们首先必须实例化包含方法定义的类</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MyClass obj = new MyClass();
obj.isAllLowerCaseInstance(&quot;test&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在调用静态方法的情况下，我们可以直接引用类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MyClass.isAllLowerCaseStatic(&quot;test&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的_isAllLowerCaseStatic()_方法是一个静态方法的良好使用示例，因为它不引用属于对象实例的任何成员变量。</p><p>重要的是要记住，尽管静态方法看起来是一个不错的选择，但它们可能难以单元测试，因为没有对象可以模拟。</p><p><strong>如果静态方法操作静态成员变量，则可能会引入并发问题</strong>。在这种情况下，我们可以使用方法定义中的_synchronized_关键字。</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们学习了Java中类或静态方法和实例方法的区别。我们讨论了如何定义静态和实例方法以及如何调用它们。</p><p>我们应该记住，关键的区别是我们必须通过实例化的对象来调用实例方法，而我们可以通过类直接访问静态方法。--- date: 2022-04-01 category:</p><ul><li>Java tag:</li><li>类方法</li><li>实例方法 head:</li><li><ul><li>meta</li><li>name: keywords content: Java, 类方法, 实例方法, 对比</li></ul></li></ul><hr><h1 id="java中的类方法与实例方法-1" tabindex="-1"><a class="header-anchor" href="#java中的类方法与实例方法-1"><span>Java中的类方法与实例方法</span></a></h1><h2 id="_1-引言-1" tabindex="-1"><a class="header-anchor" href="#_1-引言-1"><span>1. 引言</span></a></h2><p>在本教程中，我们将探讨Java中类方法和实例方法的区别。</p><p>在面向对象编程中，方法相当于一个函数。这意味着它是一个对象可以执行的动作。我们使用实例方法当它们操作成员变量，而使用静态方法则不需要类的实例即可执行。</p><p>让我们更详细地理解这一点。</p><h2 id="_2-实例方法与静态方法-1" tabindex="-1"><a class="header-anchor" href="#_2-实例方法与静态方法-1"><span>2. 实例方法与静态方法</span></a></h2><p>在Java中，我们像在大多数面向对象语言中一样创建类定义并将它们实例化为对象。</p><p>这些对象有与之关联的属性（成员变量）和通常引用这些成员变量的方法。<strong>当方法引用非静态成员变量时，我们必须将它们定义为实例方法</strong>。</p><p>有时我们定义一个不引用成员变量或只引用静态变量的方法。在这种情况下，我们可以将方法设为静态方法。<strong>这意味着我们不需要类的实例来调用该方法</strong>。</p><p>类和实例方法的行为存在差异，让我们通过一个例子来说明。</p><p>要定义一个静态方法，我们只需使用<code>static</code>关键字。以下是一个包含静态方法和实例方法的类的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isAllLowerCaseStatic</span><span class="token punctuation">(</span><span class="token class-name">String</span> word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> word<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isAllLowerCaseInstance</span><span class="token punctuation">(</span><span class="token class-name">String</span> word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> word<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用这些方法时，有一个重要的区别要记住。<strong>要使用实例方法，我们首先必须实例化包含方法定义的类</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MyClass</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">isAllLowerCaseInstance</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对于静态方法的调用，我们可以这样引用类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MyClass</span><span class="token punctuation">.</span><span class="token function">isAllLowerCaseStatic</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的<code>isAllLowerCaseStatic()</code>方法是一个使用静态方法的好例子，因为它不引用任何对象实例的成员变量。</p><p>重要的是要记住，尽管静态方法看起来是一个不错的选择，但它们可能难以单元测试，因为没有对象可以模拟。</p><p><strong>如果静态方法操作静态成员变量，则可能会引入并发问题</strong>。在这种情况下，我们可以使用方法定义中的<code>synchronized</code>关键字。</p><h2 id="_3-结论-1" tabindex="-1"><a class="header-anchor" href="#_3-结论-1"><span>3. 结论</span></a></h2><p>在本文中，我们学习了Java中类或静态方法和实例方法的区别。我们讨论了如何定义静态和实例方法以及如何调用它们。</p><p>我们应该记住，关键的区别是我们必须通过实例化的对象来调用实例方法，而我们可以通过类直接访问静态方法。</p><p>OK</p>`,47),o=[p];function l(i,c){return s(),n("div",null,o)}const u=a(t,[["render",l],["__file","2024-07-10-Class Methods vs Instance Methods in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Class%20Methods%20vs%20Instance%20Methods%20in%20Java.html","title":"Java中的类方法与实例方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["类方法","实例方法"],"head":[["meta",{"name":"keywords","content":"Java, 类方法, 实例方法, 对比"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Class%20Methods%20vs%20Instance%20Methods%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的类方法与实例方法"}],["meta",{"property":"og:description","content":"Java中的类方法与实例方法 1. 引言 在本教程中，我们将探讨Java中类方法和实例方法的区别。 在面向对象编程中，方法相当于一个函数。这意味着它是一个对象可以执行的动作。当它们操作成员变量时，我们使用实例方法；当不需要类的实例即可执行方法时，我们使用静态方法。让我们更详细地理解这一点。 2. 实例方法与静态方法 像大多数面向对象语言一样，我们在Ja..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T18:01:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"类方法"}],["meta",{"property":"article:tag","content":"实例方法"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T18:01:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的类方法与实例方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T18:01:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的类方法与实例方法 1. 引言 在本教程中，我们将探讨Java中类方法和实例方法的区别。 在面向对象编程中，方法相当于一个函数。这意味着它是一个对象可以执行的动作。当它们操作成员变量时，我们使用实例方法；当不需要类的实例即可执行方法时，我们使用静态方法。让我们更详细地理解这一点。 2. 实例方法与静态方法 像大多数面向对象语言一样，我们在Ja..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 实例方法与静态方法","slug":"_2-实例方法与静态方法","link":"#_2-实例方法与静态方法","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]},{"level":2,"title":"1. 引言","slug":"_1-引言-1","link":"#_1-引言-1","children":[]},{"level":2,"title":"2. 实例方法与静态方法","slug":"_2-实例方法与静态方法-1","link":"#_2-实例方法与静态方法-1","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论-1","link":"#_3-结论-1","children":[]}],"git":{"createdTime":1720634514000,"updatedTime":1720634514000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.68,"words":1404},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Class Methods vs Instance Methods in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中的类方法与实例方法</h1>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探讨Java中类方法和实例方法的区别。</p>\\n<p>在面向对象编程中，方法相当于一个函数。这意味着它是一个对象可以执行的动作。当它们操作成员变量时，我们使用实例方法；当不需要类的实例即可执行方法时，我们使用静态方法。让我们更详细地理解这一点。</p>\\n<h2>2. 实例方法与静态方法</h2>\\n<p>像大多数面向对象语言一样，我们在Java中创建类定义并将它们实例化为对象。</p>\\n<p>这些对象有与之关联的属性（成员变量）和通常引用这些成员变量的方法。<strong>当方法引用非静态成员变量时，我们必须将它们定义为实例方法</strong>。</p>","autoDesc":true}');export{u as comp,v as data};
