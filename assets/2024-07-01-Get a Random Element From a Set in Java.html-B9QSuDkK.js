import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DRFG6C5y.js";const e={},p=t(`<h1 id="在java中从set集合中获取随机元素" tabindex="-1"><a class="header-anchor" href="#在java中从set集合中获取随机元素"><span>在Java中从Set集合中获取随机元素</span></a></h1><p>随机从_Set_集合中选择元素是各种Java应用程序中的常见需求，尤其是在游戏和数据处理任务中。</p><p>在本文中，我们将探讨从Java _Set_中选择随机元素的不同方法。</p><h3 id="_2-使用-java-util-random-类" tabindex="-1"><a class="header-anchor" href="#_2-使用-java-util-random-类"><span>2. 使用_java.util.Random_类</span></a></h3><p>_java.util.Random_类是生成随机数的便捷工具。要从_Set_中选择一个随机元素，我们可以生成一个随机索引，并使用它来访问元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> \`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token class-name">T</span> <span class="token function">getByRandomClass</span><span class="token punctuation">(</span><span class="token class-name">Set</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` set<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>set <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> set<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;The Set cannot be empty.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> randomIndex <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">T</span> element <span class="token operator">:</span> set<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> randomIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> element<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        i<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;Something went wrong while picking a random element.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们测试我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Set</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` animals <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
animals<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Lion&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
animals<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Elephant&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
animals<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Giraffe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> randomAnimal <span class="token operator">=</span> <span class="token function">getByRandomClass</span><span class="token punctuation">(</span>animals<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Randomly picked animal: &quot;</span> <span class="token operator">+</span> randomAnimal<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果应该是随机的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Randomly picked animal: Giraffe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-使用-threadlocalrandom-类" tabindex="-1"><a class="header-anchor" href="#_3-使用-threadlocalrandom-类"><span>3. 使用_ThreadLocalRandom_类</span></a></h3><p>从Java 7开始，_ThreadLocalRandom_类提供了一种更有效且线程安全的替代方案来生成随机数。以下是我们如何使用它从_Set_中选择一个随机索引：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> randomIndex <span class="token operator">=</span> <span class="token class-name">ThreadLocalRandom</span><span class="token punctuation">.</span><span class="token function">current</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解决方案与上述相同，只是随机数的选择方式不同。</p><p><strong>使用_ThreadLocalRandom_比_java.util.Random_更可取</strong>，因为它减少了多线程场景中的竞争，并且通常提供更好的性能。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>总结，我们学到了两种从Java _Set_中选择随机元素的方法。</p><p>本文的示例代码可以在GitHub上找到。翻译已经完成，以下是翻译的剩余部分：</p><p>文章的示例代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/4958d80133796c4d497b124e052f53f5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,21),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-01-Get a Random Element From a Set in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Get%20a%20Random%20Element%20From%20a%20Set%20in%20Java.html","title":"在Java中从Set集合中获取随机元素","lang":"zh-CN","frontmatter":{"category":["Java","编程"],"tag":["Set","随机元素","Java.util.Random","ThreadLocalRandom"],"head":[["meta",{"name":"keywords","content":"Java Set, 随机选择, java.util.Random, ThreadLocalRandom"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Get%20a%20Random%20Element%20From%20a%20Set%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从Set集合中获取随机元素"}],["meta",{"property":"og:description","content":"在Java中从Set集合中获取随机元素 随机从_Set_集合中选择元素是各种Java应用程序中的常见需求，尤其是在游戏和数据处理任务中。 在本文中，我们将探讨从Java _Set_中选择随机元素的不同方法。 2. 使用_java.util.Random_类 _java.util.Random_类是生成随机数的便捷工具。要从_Set_中选择一个随机元素，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T09:34:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Set"}],["meta",{"property":"article:tag","content":"随机元素"}],["meta",{"property":"article:tag","content":"Java.util.Random"}],["meta",{"property":"article:tag","content":"ThreadLocalRandom"}],["meta",{"property":"article:modified_time","content":"2024-07-01T09:34:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从Set集合中获取随机元素\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/4958d80133796c4d497b124e052f53f5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"dateModified\\":\\"2024-07-01T09:34:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从Set集合中获取随机元素 随机从_Set_集合中选择元素是各种Java应用程序中的常见需求，尤其是在游戏和数据处理任务中。 在本文中，我们将探讨从Java _Set_中选择随机元素的不同方法。 2. 使用_java.util.Random_类 _java.util.Random_类是生成随机数的便捷工具。要从_Set_中选择一个随机元素，..."},"headers":[{"level":3,"title":"2. 使用_java.util.Random_类","slug":"_2-使用-java-util-random-类","link":"#_2-使用-java-util-random-类","children":[]},{"level":3,"title":"3. 使用_ThreadLocalRandom_类","slug":"_3-使用-threadlocalrandom-类","link":"#_3-使用-threadlocalrandom-类","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719826499000,"updatedTime":1719826499000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.6,"words":480},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Get a Random Element From a Set in Java.md","localizedDate":"2024年7月1日","excerpt":"\\n<p>随机从_Set_集合中选择元素是各种Java应用程序中的常见需求，尤其是在游戏和数据处理任务中。</p>\\n<p>在本文中，我们将探讨从Java _Set_中选择随机元素的不同方法。</p>\\n<h3>2. 使用_java.util.Random_类</h3>\\n<p>_java.util.Random_类是生成随机数的便捷工具。要从_Set_中选择一个随机元素，我们可以生成一个随机索引，并使用它来访问元素：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> ``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">T</span><span class=\\"token punctuation\\">&gt;</span></span>`` <span class=\\"token class-name\\">T</span> <span class=\\"token function\\">getByRandomClass</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Set</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">T</span><span class=\\"token punctuation\\">&gt;</span></span>`` set<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>set <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span> <span class=\\"token operator\\">||</span> set<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">IllegalArgumentException</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"The Set cannot be empty.\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">int</span> randomIndex <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Random</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">nextInt</span><span class=\\"token punctuation\\">(</span>set<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">T</span> element <span class=\\"token operator\\">:</span> set<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">==</span> randomIndex<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token keyword\\">return</span> element<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n        i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">IllegalStateException</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Something went wrong while picking a random element.\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
