import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<h1 id="从枚举生成随机值" tabindex="-1"><a class="header-anchor" href="#从枚举生成随机值"><span>从枚举生成随机值</span></a></h1><p>在本教程中，我们将学习如何从枚举中生成一个随机值。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><h2 id="_2-使用静态方法生成随机枚举值" tabindex="-1"><a class="header-anchor" href="#_2-使用静态方法生成随机枚举值"><span>2. 使用静态方法生成随机枚举值</span></a></h2><p>首先，我们将创建一个静态函数，该函数返回特定枚举集中的随机生成值。<strong>枚举值表示一组常量；然而，我们仍然可以在枚举类体中声明静态方法。</strong> <strong>我们将使用静态方法作为辅助工具来生成随机枚举值。</strong></p><p>我们在枚举类体内声明一个静态方法，该方法返回一个枚举值。这个方法将调用一个Random对象的nextInt()，并我们将这个方法命名为randomDirection()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Direction</span> <span class="token punctuation">{</span>
    <span class="token constant">EAST</span><span class="token punctuation">,</span> <span class="token constant">WEST</span><span class="token punctuation">,</span> <span class="token constant">SOUTH</span><span class="token punctuation">,</span> <span class="token constant">NORTH</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Random</span> <span class="token constant">PRNG</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Direction</span> <span class="token function">randomDirection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
        <span class="token class-name">Direction</span><span class="token punctuation">[</span><span class="token punctuation">]</span> directions <span class="token operator">=</span> <span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> directions<span class="token punctuation">[</span><span class="token constant">PRNG</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>directions<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在randomDirection()内部，我们使用一个整数参数调用nextInt()方法。nextInt()方法返回一个随机数以访问directions数组；因此，我们需要确保整数没有超出数组的界限，通过向nextInt()传递一个界限参数。界限参数是总方向数，我们知道这不会超过数组的大小。</p><p>此外，values()方法每次调用randomDirection()方法时都会创建枚举值的副本。我们可以通过创建一个final成员变量列表，在生成随机索引后访问它来提高性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Direction</span><span class="token punctuation">[</span><span class="token punctuation">]</span> directions <span class="token operator">=</span> <span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，randomDirection()方法将如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Direction</span> <span class="token function">randomDirection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> directions<span class="token punctuation">[</span><span class="token constant">PRNG</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>directions<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以通过调用该方法来生成一个随机的Direction：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Direction</span> direction <span class="token operator">=</span> <span class="token class-name">Direction</span><span class="token punctuation">.</span><span class="token function">randomDirection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用泛型生成随机枚举值" tabindex="-1"><a class="header-anchor" href="#_3-使用泛型生成随机枚举值"><span>3. 使用泛型生成随机枚举值</span></a></h2><p>同样，我们可以使用泛型来生成一个随机枚举值。<strong>通过使用泛型，我们创建一个接受任何类型的枚举数据以生成随机值的类：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RandomEnumGenerator</span>\`<span class="token operator">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Enum</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Random</span> <span class="token constant">PRNG</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span> values<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">RandomEnumGenerator</span><span class="token punctuation">(</span><span class="token class-name">Class</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\` e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        values <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">getEnumConstants</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">randomEnum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> values<span class="token punctuation">[</span><span class="token constant">PRNG</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>values<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意randomEnum()方法与前面示例中的randomDirection()方法相似。不同之处在于RandomEnumGenerator类有一个构造函数，它期望一个枚举类型，以便从中获取常量值。</p><p>我们可以使用RandomEnumGenerator类生成一个随机方向，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">RandomEnumGenerator</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Direction</span><span class="token punctuation">&gt;</span></span>\` reg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RandomEnumGenerator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Direction</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Direction</span> direction <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Direction</span><span class="token punctuation">)</span> reg<span class="token punctuation">.</span><span class="token function">randomEnum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用前一节中的Direction枚举类。RandomEnumGenerator接受这个类，并且direction对象将引用Direction类中的一个常量值。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们学习了如何从枚举中获取一个随机值。我们介绍了两种方法：首先，我们使用枚举类中的静态方法，该方法生成严格限制在声明该方法的枚举类中的随机值。此外，我们还看到了如何通过缓存常量值来提高性能。最后，我们使用泛型，使用一个接受任何类型的枚举的类来获取一个随机值。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,24),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-19-Generate a Random Value From an Enum.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Generate%20a%20Random%20Value%20From%20an%20Enum.html","title":"从枚举生成随机值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Enum"],"tag":["Java Enum","Random Value"],"head":[["meta",{"name":"keywords","content":"Java, Enum, Random Value"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Generate%20a%20Random%20Value%20From%20an%20Enum.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从枚举生成随机值"}],["meta",{"property":"og:description","content":"从枚举生成随机值 在本教程中，我们将学习如何从枚举中生成一个随机值。 1. 概述 2. 使用静态方法生成随机枚举值 首先，我们将创建一个静态函数，该函数返回特定枚举集中的随机生成值。枚举值表示一组常量；然而，我们仍然可以在枚举类体中声明静态方法。 我们将使用静态方法作为辅助工具来生成随机枚举值。 我们在枚举类体内声明一个静态方法，该方法返回一个枚举值。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T11:09:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Enum"}],["meta",{"property":"article:tag","content":"Random Value"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T11:09:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从枚举生成随机值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T11:09:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从枚举生成随机值 在本教程中，我们将学习如何从枚举中生成一个随机值。 1. 概述 2. 使用静态方法生成随机枚举值 首先，我们将创建一个静态函数，该函数返回特定枚举集中的随机生成值。枚举值表示一组常量；然而，我们仍然可以在枚举类体中声明静态方法。 我们将使用静态方法作为辅助工具来生成随机枚举值。 我们在枚举类体内声明一个静态方法，该方法返回一个枚举值。..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用静态方法生成随机枚举值","slug":"_2-使用静态方法生成随机枚举值","link":"#_2-使用静态方法生成随机枚举值","children":[]},{"level":2,"title":"3. 使用泛型生成随机枚举值","slug":"_3-使用泛型生成随机枚举值","link":"#_3-使用泛型生成随机枚举值","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721387399000,"updatedTime":1721387399000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.63,"words":790},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Generate a Random Value From an Enum.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习如何从枚举中生成一个随机值。</p>\\n<h2>1. 概述</h2>\\n<h2>2. 使用静态方法生成随机枚举值</h2>\\n<p>首先，我们将创建一个静态函数，该函数返回特定枚举集中的随机生成值。<strong>枚举值表示一组常量；然而，我们仍然可以在枚举类体中声明静态方法。</strong> <strong>我们将使用静态方法作为辅助工具来生成随机枚举值。</strong></p>\\n<p>我们在枚举类体内声明一个静态方法，该方法返回一个枚举值。这个方法将调用一个Random对象的nextInt()，并我们将这个方法命名为randomDirection()：</p>\\n","autoDesc":true}');export{d as comp,k as data};
