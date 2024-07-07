import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CxQif-dU.js";const p={},e=t(`<hr><h1 id="java记录和optional参数的使用及其问题" tabindex="-1"><a class="header-anchor" href="#java记录和optional参数的使用及其问题"><span>Java记录和Optional参数的使用及其问题</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将讨论将_Optional_作为记录参数使用的可能性以及为什么这是一个不良实践。</p><h2 id="_2-optional-的预期用途" tabindex="-1"><a class="header-anchor" href="#_2-optional-的预期用途"><span>2. _Optional_的预期用途</span></a></h2><p>在讨论_Optional_和记录之间的关系之前，让我们快速回顾一下Java中_Optional_的预期用途。</p><p>通常，在Java 8之前，我们使用_null_来表示对象的空状态。然而，将_null_作为返回值需要调用者在运行时进行_null_检查验证。如果调用者没有验证，可能会得到一个_NullPointerException_。有时获取异常被用来识别值的缺失。</p><p>_Optional_的主要目标是表示一个方法返回值，该返回值表示没有值。与使用_NullPointerException_来识别没有值相比，我们可以使用_Optional_作为返回值。因此，我们知道在编译时返回值是持有某些内容还是空的。</p><p>另外，正如Java文档中所述：</p><blockquote><p>Optional旨在为库方法返回类型提供一种<strong>有限的机制</strong>，其中明显需要表示“无结果”，并且使用_null_很可能会引起错误。</p></blockquote><p>因此，还需要指出_Optional_不打算做什么。在这方面，我们可以强调_Optional_不打算用作任何类的实例字段。</p><h2 id="_3-java记录的用例" tabindex="-1"><a class="header-anchor" href="#_3-java记录的用例"><span>3. Java记录的用例</span></a></h2><p>让我们也看看一些关于记录的概念，以便更好地理解将_Optional_作为_记录_参数使用。</p><p>记录仅仅是一个数据持有者。当我们想要将数据从一个地方传输到另一个地方时，比如从数据库到我们的应用程序，它非常适合。</p><p>让我们解释一下JEP-395：</p><blockquote><p>记录是作为<strong>不可变数据的透明载体</strong>的类。</p></blockquote><p>记录的一个关键定义是它们是不可变的。因此，<strong>一旦我们实例化一个记录，其所有数据在整个程序的其余部分中都保持不可修改</strong>。这对于传输数据的对象来说很棒，因为不可变对象不太容易出错。</p><p>记录还自动定义了与字段名称相同的访问器方法。因此，通过定义它们，我们得到了与定义字段相同名称的getter。</p><p>JDK记录定义还建议记录持有的数据应该是透明的。因此，<strong>如果我们调用访问器方法，我们应该得到有效的数据</strong>。在这种情况下，有效数据意味着真正代表对象状态的值。让我们就此问题解释一下Project Amber：</p><blockquote><p>数据类（记录）的API模拟了状态，整个状态，以及仅状态。</p></blockquote><p>不可变性和透明度是维护记录不应该有_Optional_参数的重要定义。</p><p>现在我们已经更好地理解了这两个概念，我们将看到为什么我们必须避免将_Optional_作为记录参数使用。</p><p>首先，让我们定义一个记录示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">double</span> price<span class="token punctuation">,</span> <span class="token class-name">String</span> description<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们为产品定义了一个数据持有者，包括_name, price,_和_description._我们可以想象，数据持有者是由数据库查询或HTTP调用产生的。</p><p>现在，假设产品描述有时没有设置。在这种情况下，_description_是可空的。解决这个问题的一种方法是通过将_description_字段包装在一个_Optional_对象中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">double</span> price<span class="token punctuation">,</span> <span class="token class-name">Optional</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` description<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管上面的代码可以正确编译，<strong>我们破坏了_Product_记录的数据透明度。</strong></p><p>此外**，记录的不可变性使得处理_Optional_实例比处理一个_null_变量更难。**让我们通过一个简单的测试来看看实际操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenRecordCreationWithOptional_thenCreateItProperly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> emptyDescriptionProduct <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;television&quot;</span><span class="token punctuation">,</span> <span class="token number">1699.99</span><span class="token punctuation">,</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;television&quot;</span><span class="token punctuation">,</span> emptyDescriptionProduct<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1699.99</span><span class="token punctuation">,</span> emptyDescriptionProduct<span class="token punctuation">.</span><span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertNull</span><span class="token punctuation">(</span>emptyDescriptionProduct<span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们用一些值创建了一个_Product_，并使用生成的getters来断言记录是否正确实例化。</p><p>在我们的产品中，我们定义了变量_name_、<em>price_和_description</em>。然而，由于_description_是一个_Optional_，我们在检索后不会立即得到一个值。我们需要做一些逻辑来打开它以获取值。换句话说，我们在调用访问器方法后没有得到正确的对象状态。因此，它破坏了Java记录的数据透明度的定义。</p><p>我们可能会想，在这种情况下，我们如何处理_null_？好吧，我们可以简单地让它们存在。一个_null_代表对象的空状态，这在这种情况下比一个空的_Optional_实例更有意义。在这些场景中，我们可以通过使用_@Nullable_注解或其他处理_null_的良好实践来通知_Product_类的使用者_description_是可空的。</p><p>由于记录字段是不可变的，_description_字段不能被改变。因此，要检索_description_值，我们有一些选项。一种是打开它或使用_orElse()<em>和_orElseGet()<em>返回默认值。另一种是盲目使用_get()</em>，如果没有值就会抛出_NoSuchElementException</em>。第三种是如果里面没有东西，就使用_orElseThrow()_抛出错误。</p><p><strong>在任何可能的处理方式中，_Optional_都没有意义，因为在任何情况下，我们都是返回_null_或抛出错误</strong>。更简单地让_description_成为一个可空的_String_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们看到了Java记录的定义，并理解了透明度和不可变性的重要性。</p><p>我们还研究了_Optional_类的预期用途。更重要的是，<strong>我们讨论了_Optional_不适合用作记录参数</strong>。</p><p>如常，你可以在GitHub上找到源代码。</p>`,39),o=[e];function l(i,c){return s(),a("div",null,o)}const _=n(p,[["render",l],["__file","2024-06-28-Optional as a Record Parameter in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Optional%20as%20a%20Record%20Parameter%20in%20Java.html","title":"Java记录和Optional参数的使用及其问题","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","Optional"],"tag":["Java记录","Optional参数"],"head":[["meta",{"name":"keywords","content":"Java记录, Optional参数, 数据透明度, 不变性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Optional%20as%20a%20Record%20Parameter%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java记录和Optional参数的使用及其问题"}],["meta",{"property":"og:description","content":"Java记录和Optional参数的使用及其问题 1. 引言 在本教程中，我们将讨论将_Optional_作为记录参数使用的可能性以及为什么这是一个不良实践。 2. _Optional_的预期用途 在讨论_Optional_和记录之间的关系之前，让我们快速回顾一下Java中_Optional_的预期用途。 通常，在Java 8之前，我们使用_null_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T02:45:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java记录"}],["meta",{"property":"article:tag","content":"Optional参数"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T02:45:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java记录和Optional参数的使用及其问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T02:45:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java记录和Optional参数的使用及其问题 1. 引言 在本教程中，我们将讨论将_Optional_作为记录参数使用的可能性以及为什么这是一个不良实践。 2. _Optional_的预期用途 在讨论_Optional_和记录之间的关系之前，让我们快速回顾一下Java中_Optional_的预期用途。 通常，在Java 8之前，我们使用_null_..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. _Optional_的预期用途","slug":"_2-optional-的预期用途","link":"#_2-optional-的预期用途","children":[]},{"level":2,"title":"3. Java记录的用例","slug":"_3-java记录的用例","link":"#_3-java记录的用例","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719542718000,"updatedTime":1719542718000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.9,"words":1471},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Optional as a Record Parameter in Java.md","localizedDate":"2024年6月28日","excerpt":"<hr>\\n<h1>Java记录和Optional参数的使用及其问题</h1>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将讨论将_Optional_作为记录参数使用的可能性以及为什么这是一个不良实践。</p>\\n<h2>2. _Optional_的预期用途</h2>\\n<p>在讨论_Optional_和记录之间的关系之前，让我们快速回顾一下Java中_Optional_的预期用途。</p>\\n<p>通常，在Java 8之前，我们使用_null_来表示对象的空状态。然而，将_null_作为返回值需要调用者在运行时进行_null_检查验证。如果调用者没有验证，可能会得到一个_NullPointerException_。有时获取异常被用来识别值的缺失。</p>","autoDesc":true}');export{_ as comp,d as data};
