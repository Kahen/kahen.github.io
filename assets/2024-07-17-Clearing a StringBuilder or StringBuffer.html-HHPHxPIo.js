import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-yRPSFQJx.js";const e={},p=t(`<h1 id="清除stringbuilder或stringbuffer的教程" tabindex="-1"><a class="header-anchor" href="#清除stringbuilder或stringbuffer的教程"><span>清除StringBuilder或StringBuffer的教程</span></a></h1><p>在本教程中，我们将介绍几种清除StringBuilder或StringBuffer的方法，然后详细阐述它们。</p><h3 id="使用setlength方法" tabindex="-1"><a class="header-anchor" href="#使用setlength方法"><span>使用setLength方法</span></a></h3><p>setLength方法更新StringBuilder的内部长度。之后，当操作StringBuilder时，长度之后的所有条目都将被忽略。因此，使用0调用它将清除其内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenSetLengthToZero_ThenStringBuilderIsCleared</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> stringBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stringBuilder<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> initialCapacity <span class="token operator">=</span> stringBuilder<span class="token punctuation">.</span><span class="token function">capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stringBuilder<span class="token punctuation">.</span><span class="token function">setLength</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> stringBuilder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>initialCapacity<span class="token punctuation">,</span> stringBuilder<span class="token punctuation">.</span><span class="token function">capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，调用setLength方法后，StringBuilder的容量保持不变。</p><h3 id="使用delete方法" tabindex="-1"><a class="header-anchor" href="#使用delete方法"><span>使用delete方法</span></a></h3><p>delete方法在后台使用System.arraycopy。所有在起始索引之前或结束索引之后的索引都被复制到同一个StringBuilder中。</p><p>因此，如果我们使用0作为起始索引，并将结束索引设置为StringBuilder的长度，我们将复制：</p><ul><li>0之前的索引：没有。</li><li>stringBuilder.length()之后的索引：没有。</li></ul><p>结果，StringBuilder中的所有内容都被移除：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenDeleteAll_ThenStringBuilderIsCleared</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> stringBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stringBuilder<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> initialCapacity <span class="token operator">=</span> stringBuilder<span class="token punctuation">.</span><span class="token function">capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stringBuilder<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> stringBuilder<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> stringBuilder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>initialCapacity<span class="token punctuation">,</span> stringBuilder<span class="token punctuation">.</span><span class="token function">capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与setLength方法一样，删除内容后对象的容量保持不变。我们还要强调，在这一过程中没有涉及新对象的创建。</p><h3 id="清除stringbuffer" tabindex="-1"><a class="header-anchor" href="#清除stringbuffer"><span>清除StringBuffer</span></a></h3><p>所有适用于StringBuilder的方法同样适用于StringBuffer。此外，关于对象容量的所有评论仍然有效。</p><p>让我们展示一个使用setLength方法的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenSetLengthToZero_ThenStringBufferIsCleared</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuffer</span> stringBuffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stringBuffer<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> initialCapacity <span class="token operator">=</span> stringBuffer<span class="token punctuation">.</span><span class="token function">capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stringBuffer<span class="token punctuation">.</span><span class="token function">setLength</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> stringBuffer<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>initialCapacity<span class="token punctuation">,</span> stringBuffer<span class="token punctuation">.</span><span class="token function">capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用delete方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenDeleteAll_ThenStringBufferIsCleared</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StringBuffer</span> stringBuffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stringBuffer<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> initialCapacity <span class="token operator">=</span> stringBuffer<span class="token punctuation">.</span><span class="token function">capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stringBuffer<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> stringBuffer<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> stringBuffer<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>initialCapacity<span class="token punctuation">,</span> stringBuffer<span class="token punctuation">.</span><span class="token function">capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="性能" tabindex="-1"><a class="header-anchor" href="#性能"><span>性能</span></a></h3><p>让我们使用JMH进行快速性能比较。让我们比较StringBuilder的三种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@State</span><span class="token punctuation">(</span><span class="token class-name">Scope<span class="token punctuation">.</span>Benchmark</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyState</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">HELLO</span> <span class="token operator">=</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token constant">HELLO</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">evaluateSetLength</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">,</span> <span class="token class-name">MyState</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span><span class="token function">setLength</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Benchmark</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">evaluateDelete</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">,</span> <span class="token class-name">MyState</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过每秒操作数来衡量性能。这个基准测试得出以下结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Benchmark</span>                  <span class="token class-name">Mode</span>   <span class="token class-name">Cnt</span>         <span class="token class-name">Score</span>          <span class="token class-name">Error</span>  <span class="token class-name">Units</span>
evaluateDelete             thrpt   <span class="token number">25</span>  <span class="token number">67943684.417</span> ± <span class="token number">18116791.770</span>  ops<span class="token operator">/</span>s
evaluateSetLength          thrpt   <span class="token number">25</span>  <span class="token number">37310891.158</span> ±   <span class="token number">994382.978</span>  ops<span class="token operator">/</span>s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，delete似乎是两种方法中耗时较少的一种，几乎是setLength的两倍。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们详细介绍了三种清除StringBuilder或StringBuffer的方法。</p><p>如常，代码可在GitHub上找到。</p>`,28),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-17-Clearing a StringBuilder or StringBuffer.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Clearing%20a%20StringBuilder%20or%20StringBuffer.html","title":"清除StringBuilder或StringBuffer的教程","lang":"zh-CN","frontmatter":{"date":"2024-07-17T00:00:00.000Z","category":["Java","StringBuilder","StringBuffer"],"tag":["Java","StringBuilder","StringBuffer"],"head":[["meta",{"name":"keywords","content":"Java, StringBuilder, StringBuffer, 清除, setLength, delete"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Clearing%20a%20StringBuilder%20or%20StringBuffer.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"清除StringBuilder或StringBuffer的教程"}],["meta",{"property":"og:description","content":"清除StringBuilder或StringBuffer的教程 在本教程中，我们将介绍几种清除StringBuilder或StringBuffer的方法，然后详细阐述它们。 使用setLength方法 setLength方法更新StringBuilder的内部长度。之后，当操作StringBuilder时，长度之后的所有条目都将被忽略。因此，使用0调用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T07:07:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"StringBuilder"}],["meta",{"property":"article:tag","content":"StringBuffer"}],["meta",{"property":"article:published_time","content":"2024-07-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T07:07:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"清除StringBuilder或StringBuffer的教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T07:07:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"清除StringBuilder或StringBuffer的教程 在本教程中，我们将介绍几种清除StringBuilder或StringBuffer的方法，然后详细阐述它们。 使用setLength方法 setLength方法更新StringBuilder的内部长度。之后，当操作StringBuilder时，长度之后的所有条目都将被忽略。因此，使用0调用..."},"headers":[{"level":3,"title":"使用setLength方法","slug":"使用setlength方法","link":"#使用setlength方法","children":[]},{"level":3,"title":"使用delete方法","slug":"使用delete方法","link":"#使用delete方法","children":[]},{"level":3,"title":"清除StringBuffer","slug":"清除stringbuffer","link":"#清除stringbuffer","children":[]},{"level":3,"title":"性能","slug":"性能","link":"#性能","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1721200077000,"updatedTime":1721200077000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.99,"words":596},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Clearing a StringBuilder or StringBuffer.md","localizedDate":"2024年7月17日","excerpt":"\\n<p>在本教程中，我们将介绍几种清除StringBuilder或StringBuffer的方法，然后详细阐述它们。</p>\\n<h3>使用setLength方法</h3>\\n<p>setLength方法更新StringBuilder的内部长度。之后，当操作StringBuilder时，长度之后的所有条目都将被忽略。因此，使用0调用它将清除其内容：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Test</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">whenSetLengthToZero_ThenStringBuilderIsCleared</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">StringBuilder</span> stringBuilder <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">StringBuilder</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    stringBuilder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">append</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Hello World\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> initialCapacity <span class=\\"token operator\\">=</span> stringBuilder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">capacity</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    stringBuilder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setLength</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">,</span> stringBuilder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>initialCapacity<span class=\\"token punctuation\\">,</span> stringBuilder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">capacity</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
