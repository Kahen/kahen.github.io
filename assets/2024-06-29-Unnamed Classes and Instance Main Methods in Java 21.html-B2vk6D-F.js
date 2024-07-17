import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-yRPSFQJx.js";const t={},p=e(`<h1 id="java-21-中的未命名类和实例主方法-baeldung" tabindex="-1"><a class="header-anchor" href="#java-21-中的未命名类和实例主方法-baeldung"><span>Java 21 中的未命名类和实例主方法 | Baeldung</span></a></h1><p>Java 21 已经发布，其新特性之一是未命名类和实例主方法的引入，这使得 Java 语言对于初学者来说更加易于接近。这些新特性的引入是使 Java 成为更友好的编程语言的重要步骤。</p><p>在本教程中，我们将探索这些新特性，并理解它们如何为学生平滑学习曲线。</p><h2 id="_2-编写基本的-java-程序" tabindex="-1"><a class="header-anchor" href="#_2-编写基本的-java-程序"><span>2. 编写基本的 Java 程序</span></a></h2><p>传统上，对于初学者来说，编写他们的第一个 Java 程序比在其他编程语言中要复杂一些。一个基本的 Java 程序需要声明一个 <em>public</em> 类。这个类包含一个作为程序入口点的 <em>public static void main(String[] args)</em> 方法。</p><p>所有这些只是为了在控制台中打印出 &quot;Hello world&quot;：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java 21 极大地简化了我们编写简单程序的方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将更详细地讨论如何使用新特性实现这种语法简化。</p><p>实例 <em>main()</em> 方法的引入允许开发者使用更动态的方法来初始化他们的应用程序。</p><h3 id="_3-1-理解实例主方法" tabindex="-1"><a class="header-anchor" href="#_3-1-理解实例主方法"><span>3.1. 理解实例主方法</span></a></h3><p>这改变了 Java 程序声明其入口点的方式。实际上，Java 早期需要在 <em>public</em> 类中存在一个带有 <em>String[]</em> 参数的 <em>static main()</em> 方法，正如我们在前一节中看到的那样。</p><p>这个新协议更加宽松。它允许使用具有不同访问级别的 <em>main()</em> 方法：<em>public</em>、<em>protected</em> 或默认（包）。</p><p><strong>此外，它不要求方法必须是 <em>static</em> 或具有 <em>String[]</em> 参数：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-选择启动协议" tabindex="-1"><a class="header-anchor" href="#_3-2-选择启动协议"><span>3.2. 选择启动协议</span></a></h3><p>改进后的启动协议会自动选择我们程序的起始点，同时考虑可用性和访问级别。</p><p><strong>实例 <em>main()</em> 方法应该总是具有非 <em>private</em> 访问级别</strong>。此外，启动协议遵循特定的顺序来决定使用哪个方法：</p><ol><li>在启动的类中声明的 <em>static void main(String[] args)</em> 方法</li><li>在启动的类中声明的 <em>static void main()</em> 方法</li><li>在启动的类或从超类继承的 <em>void main(String[] args)</em> 实例方法</li><li><em>void main()</em> 实例方法</li></ol><p><strong>当一个类声明了一个实例 <em>main()</em> 方法并继承了一个标准的 <em>static</em> <em>main()</em> 方法时，系统将调用实例 <em>main()</em> 方法</strong>。在这种情况下，JVM 在运行时会发出警告。</p><p>例如，假设我们有一个名为 <em>HelloWorldSuper</em> 的超类，它实现了一个长期存在的 <em>main()</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldSuper</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello from the superclass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个超类被 <em>HelloWorldChild</em> 类扩展：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldChild</span> <span class="token keyword">extends</span> <span class="token class-name">HelloWorldSuper</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用 <em>—source 21</em> 和 <em>-enable-preview</em> 标志编译超类并运行子类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javac <span class="token parameter variable">--source</span> <span class="token number">21</span> --enable-preview HelloWorldSuper.java
<span class="token function">java</span> <span class="token parameter variable">--source</span> <span class="token number">21</span> --enable-preview HelloWorldChild
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将在控制台中得到以下输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>WARNING: <span class="token string">&quot;void HelloWorldChild.main()&quot;</span> chosen over <span class="token string">&quot;public static void HelloWorldSuper.main(java.lang.String[])&quot;</span>
Hello, World<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到 JVM 警告我们程序中有两个可能的入口点。</p><h2 id="_4-未命名类" tabindex="-1"><a class="header-anchor" href="#_4-未命名类"><span>4. 未命名类</span></a></h2><p>未命名类是一个重要的特性，旨在简化初学者的学习曲线。<strong>它允许方法、字段和类在没有显式类声明的情况下存在。</strong></p><p>通常，在 Java 中，每个类都存在于一个包中，每个包都在一个模块中。然而，未命名类存在于未命名的包和模块中。它们是 <em>final</em> 的，只能扩展 <em>Object</em> 类而不实现任何接口。</p><p>考虑到所有这些，我们可以在代码中不显式声明类来声明 <em>main()</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用这两个新特性，我们成功地将程序变成了一个非常简单的程序，任何开始在 Java 中编程的人都更容易理解。</p><p>未命名类几乎与显式声明的类完全相同。其他方法或变量被解释为未命名类的成员，所以我们可以将它们添加到我们的类中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管它们简单灵活，但未命名类有固有的限制。</p><p><strong>直接构造或按名称引用是不可能的，它们也不定义任何可从其他类访问的 API</strong>。这种不可访问性也会导致 Javadoc 工具在为这些类生成 API 文档时出现问题。然而，未来的 Java 版本可能会调整和增强这些行为。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们了解到 Java 21 通过引入未命名类和实例 main() 方法，在增强用户体验方面取得了显著进步，特别是对于那些刚开始编程之旅的人。</p><p>通过简化编程的结构方面，这些特性允许新手更快地专注于逻辑思维和问题解决。</p><p>如往常一样，源代码可在 GitHub 上获得。</p>`,44),l=[p];function o(i,c){return s(),n("div",null,l)}const r=a(t,[["render",o],["__file","2024-06-29-Unnamed Classes and Instance Main Methods in Java 21.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Unnamed%20Classes%20and%20Instance%20Main%20Methods%20in%20Java%2021.html","title":"Java 21 中的未命名类和实例主方法 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-30T00:00:00.000Z","category":["Java","编程"],"tag":["Java 21","未命名类","实例主方法"],"head":[["meta",{"name":"keywords","content":"Java 21, 未命名类, 实例主方法"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Unnamed%20Classes%20and%20Instance%20Main%20Methods%20in%20Java%2021.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 21 中的未命名类和实例主方法 | Baeldung"}],["meta",{"property":"og:description","content":"Java 21 中的未命名类和实例主方法 | Baeldung Java 21 已经发布，其新特性之一是未命名类和实例主方法的引入，这使得 Java 语言对于初学者来说更加易于接近。这些新特性的引入是使 Java 成为更友好的编程语言的重要步骤。 在本教程中，我们将探索这些新特性，并理解它们如何为学生平滑学习曲线。 2. 编写基本的 Java 程序 传..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T16:52:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 21"}],["meta",{"property":"article:tag","content":"未命名类"}],["meta",{"property":"article:tag","content":"实例主方法"}],["meta",{"property":"article:published_time","content":"2024-06-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T16:52:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 21 中的未命名类和实例主方法 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T16:52:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 21 中的未命名类和实例主方法 | Baeldung Java 21 已经发布，其新特性之一是未命名类和实例主方法的引入，这使得 Java 语言对于初学者来说更加易于接近。这些新特性的引入是使 Java 成为更友好的编程语言的重要步骤。 在本教程中，我们将探索这些新特性，并理解它们如何为学生平滑学习曲线。 2. 编写基本的 Java 程序 传..."},"headers":[{"level":2,"title":"2. 编写基本的 Java 程序","slug":"_2-编写基本的-java-程序","link":"#_2-编写基本的-java-程序","children":[{"level":3,"title":"3.1. 理解实例主方法","slug":"_3-1-理解实例主方法","link":"#_3-1-理解实例主方法","children":[]},{"level":3,"title":"3.2. 选择启动协议","slug":"_3-2-选择启动协议","link":"#_3-2-选择启动协议","children":[]}]},{"level":2,"title":"4. 未命名类","slug":"_4-未命名类","link":"#_4-未命名类","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719679969000,"updatedTime":1719679969000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.31,"words":1293},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Unnamed Classes and Instance Main Methods in Java 21.md","localizedDate":"2024年6月30日","excerpt":"\\n<p>Java 21 已经发布，其新特性之一是未命名类和实例主方法的引入，这使得 Java 语言对于初学者来说更加易于接近。这些新特性的引入是使 Java 成为更友好的编程语言的重要步骤。</p>\\n<p>在本教程中，我们将探索这些新特性，并理解它们如何为学生平滑学习曲线。</p>\\n<h2>2. 编写基本的 Java 程序</h2>\\n<p>传统上，对于初学者来说，编写他们的第一个 Java 程序比在其他编程语言中要复杂一些。一个基本的 Java 程序需要声明一个 <em>public</em> 类。这个类包含一个作为程序入口点的 <em>public static void main(String[] args)</em> 方法。</p>","autoDesc":true}');export{r as comp,m as data};
