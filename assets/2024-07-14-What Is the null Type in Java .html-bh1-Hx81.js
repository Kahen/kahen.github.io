import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-C6rqSDgP.js";const t={},l=e(`<h1 id="java中的null类型是什么" tabindex="-1"><a class="header-anchor" href="#java中的null类型是什么"><span>Java中的null类型是什么？</span></a></h1><p>在Java的世界里，_null_类型无处不在，很难在使用这门语言时不遇到它。在大多数情况下，直观地理解它代表虚无或缺乏某物就足以有效编程。然而，有时我们想要深入挖掘并彻底理解这个话题。</p><p>在本教程中，我们将看看_null_类型在底层是如何工作的，以及它与其他类型的关系。</p><p>在我们回答关于_null_类型的具体问题之前，我们需要定义什么是类型。这不是一个容易的任务，因为有很多竞争性的定义。对我们来说最有用的定义是值空间的定义。在那个定义中，<strong>类型由它可以持有的可能值的集合来定义</strong>。</p><p>假设我们想声明一个_boolean_变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> valid<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们所做的是声明一个名为“valid”的变量，它将持有两种可能的值之一：<em>true_或_false</em>。可能的值集合只有两个元素。如果我们想声明一个_int_变量，可能的值集合会大得多，但仍然清晰定义：从-2<sup>31到2</sup>31-1的每一个可能的数字。</p><h3 id="_3-null-是什么类型" tabindex="-1"><a class="header-anchor" href="#_3-null-是什么类型"><span>3. _null_是什么类型？</span></a></h3><p>_null_是一个特殊的类型，只有一个可能的值。换句话说，可能的值集合只有一个元素。这一特性本身就使得_null_类型非常奇特。通常，变量的整个目的是它们可以假设不同的值。只有一个_null_引用，所以一个_null_类型的变量只能持有那个特定的引用。它除了表明变量存在之外，不会带来任何信息。</p><p>有一个特性使得_null_类型可以按照我们使用它的方式使用。**_null_引用可以转换为任何其他引用类型。**这意味着我们可以将其视为一个特殊的字面量，可以是任何非原始型。在实践中，_null_引用扩展了这些类型的有效可能值集合。</p><p>这就是为什么我们可以将完全相同的_null_引用分配给完全不同的引用类型变量的原因：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Integer</span> age <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` names <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这也解释了为什么我们不能将_null_值分配给原始类型变量，比如_boolean_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Boolean</span> validReference <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 这是可以的</span>
<span class="token keyword">boolean</span> validPrimitive <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 这是不可以的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为_null_引用可以转换为引用类型，但不能转换为原始类型。一个_boolean_变量的可能值集合将始终有两个元素。</p><h3 id="_4-null-作为方法参数" tabindex="-1"><a class="header-anchor" href="#_4-null-作为方法参数"><span>4. _null_作为方法参数</span></a></h3><p>让我们看看两个简单方法，它们都接受一个参数，但类型不同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">printMe</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">printMe</span><span class="token punctuation">(</span><span class="token class-name">String</span> string<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>string<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于Java的多态性，我们可以这样调用这些方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">printMe</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printMe</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编译器将理解我们引用的是哪个方法。但是，以下语句将导致编译器错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">printMe</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不能编译</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>为什么？因为_null_可以转换为_String_和_Integer——编译器不知道选择哪个方法。</strong></p><h3 id="_5-nullpointerexception" tabindex="-1"><a class="header-anchor" href="#_5-nullpointerexception"><span>5. <em>NullPointerException</em></span></a></h3><p>正如我们已经看到的，即使_null_在技术上是一个不同的、单独的类型，我们仍然可以将_null_引用分配给引用类型的变量。**如果我们尝试使用该变量的某些属性，就好像它不是_null_一样，我们将得到一个运行时异常——<em>NullPointerException</em>。**这是因为_null_引用不是我们引用它的类型，并且没有我们期望它拥有的属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
name<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将在运行时引起异常</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在Java 14之前，<em>NullPointerExceptions_很短，只是简单地说明代码中出现错误的行。如果该行很复杂并且有一系列的调用，那么这些信息就没有那么有用了。然而，从Java 14开始，我们可以依赖所谓的有用的_NullPointerExceptions</em>。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们仔细研究了_null_类型是如何工作的。首先，我们定义了类型，然后我们发现_null_类型是如何适应这个定义的。最后，我们学习了如何将_null_引用转换为任何其他引用类型，使其成为我们所知道和使用的工具。</p>`,29),p=[l];function o(i,c){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","2024-07-14-What Is the null Type in Java .html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-What%20Is%20the%20null%20Type%20in%20Java%20.html","title":"Java中的null类型是什么？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Tutorials"],"head":[["meta",{"name":"keywords","content":"Java null type, null reference, NullPointerException"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-What%20Is%20the%20null%20Type%20in%20Java%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的null类型是什么？"}],["meta",{"property":"og:description","content":"Java中的null类型是什么？ 在Java的世界里，_null_类型无处不在，很难在使用这门语言时不遇到它。在大多数情况下，直观地理解它代表虚无或缺乏某物就足以有效编程。然而，有时我们想要深入挖掘并彻底理解这个话题。 在本教程中，我们将看看_null_类型在底层是如何工作的，以及它与其他类型的关系。 在我们回答关于_null_类型的具体问题之前，我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T14:51:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T14:51:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的null类型是什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T14:51:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的null类型是什么？ 在Java的世界里，_null_类型无处不在，很难在使用这门语言时不遇到它。在大多数情况下，直观地理解它代表虚无或缺乏某物就足以有效编程。然而，有时我们想要深入挖掘并彻底理解这个话题。 在本教程中，我们将看看_null_类型在底层是如何工作的，以及它与其他类型的关系。 在我们回答关于_null_类型的具体问题之前，我们..."},"headers":[{"level":3,"title":"3. _null_是什么类型？","slug":"_3-null-是什么类型","link":"#_3-null-是什么类型","children":[]},{"level":3,"title":"4. _null_作为方法参数","slug":"_4-null-作为方法参数","link":"#_4-null-作为方法参数","children":[]},{"level":3,"title":"5. NullPointerException","slug":"_5-nullpointerexception","link":"#_5-nullpointerexception","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720968682000,"updatedTime":1720968682000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.72,"words":1115},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-What Is the null Type in Java .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java的世界里，_null_类型无处不在，很难在使用这门语言时不遇到它。在大多数情况下，直观地理解它代表虚无或缺乏某物就足以有效编程。然而，有时我们想要深入挖掘并彻底理解这个话题。</p>\\n<p>在本教程中，我们将看看_null_类型在底层是如何工作的，以及它与其他类型的关系。</p>\\n<p>在我们回答关于_null_类型的具体问题之前，我们需要定义什么是类型。这不是一个容易的任务，因为有很多竞争性的定义。对我们来说最有用的定义是值空间的定义。在那个定义中，<strong>类型由它可以持有的可能值的集合来定义</strong>。</p>\\n<p>假设我们想声明一个_boolean_变量：</p>","autoDesc":true}');export{d as comp,_ as data};
