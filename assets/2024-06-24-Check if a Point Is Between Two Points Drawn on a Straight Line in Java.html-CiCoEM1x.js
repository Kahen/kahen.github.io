import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BZTl7mFs.js";const p={},e=t(`<hr><h1 id="在java中检查一个点是否在直线上的两点之间" tabindex="-1"><a class="header-anchor" href="#在java中检查一个点是否在直线上的两点之间"><span>在Java中检查一个点是否在直线上的两点之间</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在使用二维几何时，一个常见的问题是确定一个点是否在直线上的另外两个点之间。</p><p>在这个快速教程中，我们将探讨在Java中进行这种判断的不同方法。</p><h2 id="_2-理解问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-理解问题陈述"><span>2. 理解问题陈述</span></a></h2><p>假设我们在平面上有两个点：第一个点A的坐标是(x1, y1)，第二个点B的坐标是(x2, y2)。我们想要检查给定的点C，其坐标为(x3, y3)，是否在A和B之间：</p><p>在上面的图表中，点C位于点A和B之间，而点D不位于点A和B之间。</p><h2 id="_3-使用距离公式" tabindex="-1"><a class="header-anchor" href="#_3-使用距离公式"><span>3. 使用距离公式</span></a></h2><p>这种方法涉及计算距离：从点A到C的AC距离，从点C到B的CB距离，以及从点A到B的AB距离。如果C位于点A和B之间，那么AC和CB的距离之和将等于AB：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AC距离 + CB距离 == AB距离
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用距离公式来计算两个不同点之间的距离。如果点A的坐标是(x1, y1)，点B的坐标是(x2, y2)，那么我们可以使用以下公式计算距离：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>distance = sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们使用距离公式在上述图表上验证这种方法：</p><p>从点A (1,1) 到点B (5,5) 的距离 = 5.656</p><p>从点A (1,1) 到点C (3,3) 的距离 = 2.828</p><p>从点C (3,3) 到点B (5,5) 的距离 = 2.828</p><p>这里，AC距离 + CB距离 = 5.656，等于AB距离。这表明点C位于点A和B之间。</p><p>让我们使用距离公式检查一个点是否位于两个点之间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isPointBetweenTwoPoints</span><span class="token punctuation">(</span><span class="token keyword">double</span> x1<span class="token punctuation">,</span> <span class="token keyword">double</span> y1<span class="token punctuation">,</span> <span class="token keyword">double</span> x2<span class="token punctuation">,</span> <span class="token keyword">double</span> y2<span class="token punctuation">,</span> <span class="token keyword">double</span> x<span class="token punctuation">,</span> <span class="token keyword">double</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> distanceAC <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>x <span class="token operator">-</span> x1<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>y <span class="token operator">-</span> y1<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> distanceCB <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>x2 <span class="token operator">-</span> x<span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>y2 <span class="token operator">-</span> y<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> distanceAB <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>x2 <span class="token operator">-</span> x1<span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>y2 <span class="token operator">-</span> y1<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>distanceAC <span class="token operator">+</span> distanceCB <span class="token operator">-</span> distanceAB<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1e-9</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，1e-9是一个小的epsilon值，用于考虑浮点计算中可能出现的舍入误差和不精确性。如果绝对差值非常小（小于1e-9），我们将认为它是相等的。</p><p>让我们使用上述值测试这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenAPoint_whenUsingDistanceFormula_thenCheckItLiesBetweenTwoPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> x1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>    <span class="token keyword">double</span> y1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> x2 <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>    <span class="token keyword">double</span> y2 <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>    <span class="token keyword">double</span> y <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">findUsingDistanceFormula</span><span class="token punctuation">(</span>x1<span class="token punctuation">,</span> y1<span class="token punctuation">,</span> x2<span class="token punctuation">,</span> y2<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用斜率公式" tabindex="-1"><a class="header-anchor" href="#_4-使用斜率公式"><span>4. 使用斜率公式</span></a></h2><p>在这种方法中，我们将计算AB和AC的斜率，使用斜率公式。<strong>我们将比较这些斜率以检查共线性，即AB和AC的斜率相等。这将帮助我们确定点A、B和C是否对齐。</strong></p><p>如果点A的坐标是(x1, y1)，点B的坐标是(x2, y2)，那么我们可以使用以下公式计算斜率：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>slope = (y2 - y1) / (x2 - x1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果AB和AC的斜率相等，并且点C的x和y坐标位于由A和B点定义的范围内，我们可以说点C位于点A和B之间。</p><p>让我们计算上述图表中AB和AC的斜率以验证这种方法：</p><p>AB的斜率 = 1.0</p><p>AC的斜率 = 1.0</p><p>点C是(3,3)</p><p>这里，AB = AC，并且点C的x和y坐标位于由A (1,1)和B (5,5)定义的范围内，这表明点C位于点A和B之间。</p><p>让我们使用这种方法检查一个点是否位于两个点之间：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">findUsingSlopeFormula</span><span class="token punctuation">(</span><span class="token keyword">double</span> x1<span class="token punctuation">,</span> <span class="token keyword">double</span> y1<span class="token punctuation">,</span> <span class="token keyword">double</span> x2<span class="token punctuation">,</span> <span class="token keyword">double</span> y2<span class="token punctuation">,</span> <span class="token keyword">double</span> x<span class="token punctuation">,</span> <span class="token keyword">double</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> slopeAB <span class="token operator">=</span> <span class="token punctuation">(</span>y2 <span class="token operator">-</span> y1<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span>x2 <span class="token operator">-</span> x1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> slopeAC <span class="token operator">=</span> <span class="token punctuation">(</span>y <span class="token operator">-</span> y1<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span>x <span class="token operator">-</span> x1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> slopeAB <span class="token operator">==</span> slopeAC <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>x1 <span class="token operator">&lt;=</span> x <span class="token operator">&amp;&amp;</span> x <span class="token operator">&lt;=</span> x2<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>x2 <span class="token operator">&lt;=</span> x <span class="token operator">&amp;&amp;</span> x <span class="token operator">&lt;=</span> x1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>y1 <span class="token operator">&lt;=</span> y <span class="token operator">&amp;&amp;</span> y <span class="token operator">&lt;=</span> y2<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>y2 <span class="token operator">&lt;=</span> y <span class="token operator">&amp;&amp;</span> y <span class="token operator">&lt;=</span> y1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用上述值测试这种方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">givenAPoint_whenUsingSlopeFormula_thenCheckItLiesBetweenTwoPoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> x1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>    <span class="token keyword">double</span> y1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> x2 <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>    <span class="token keyword">double</span> y2 <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>    <span class="token keyword">double</span> y <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">findUsingSlopeFormula</span><span class="token punctuation">(</span>x1<span class="token punctuation">,</span> y1<span class="token punctuation">,</span> x2<span class="token punctuation">,</span> y2<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这个教程中，我们讨论了确定一个点是否在直线上的另外两个点之间的方法。</p><p>像往常一样，示例中使用的代码可以在GitHub上找到。</p>`,40),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-24-Check if a Point Is Between Two Points Drawn on a Straight Line in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Check%20if%20a%20Point%20Is%20Between%20Two%20Points%20Drawn%20on%20a%20Straight%20Line%20in%20Java.html","title":"在Java中检查一个点是否在直线上的两点之间","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Java","2D Geometry"],"tag":["Point","Straight Line","Check"],"head":[["meta",{"name":"keywords","content":"Java, 2D Geometry, Point Check, Straight Line"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Check%20if%20a%20Point%20Is%20Between%20Two%20Points%20Drawn%20on%20a%20Straight%20Line%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中检查一个点是否在直线上的两点之间"}],["meta",{"property":"og:description","content":"在Java中检查一个点是否在直线上的两点之间 1. 概述 在使用二维几何时，一个常见的问题是确定一个点是否在直线上的另外两个点之间。 在这个快速教程中，我们将探讨在Java中进行这种判断的不同方法。 2. 理解问题陈述 假设我们在平面上有两个点：第一个点A的坐标是(x1, y1)，第二个点B的坐标是(x2, y2)。我们想要检查给定的点C，其坐标为(x..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T19:24:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Point"}],["meta",{"property":"article:tag","content":"Straight Line"}],["meta",{"property":"article:tag","content":"Check"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T19:24:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中检查一个点是否在直线上的两点之间\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T19:24:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中检查一个点是否在直线上的两点之间 1. 概述 在使用二维几何时，一个常见的问题是确定一个点是否在直线上的另外两个点之间。 在这个快速教程中，我们将探讨在Java中进行这种判断的不同方法。 2. 理解问题陈述 假设我们在平面上有两个点：第一个点A的坐标是(x1, y1)，第二个点B的坐标是(x2, y2)。我们想要检查给定的点C，其坐标为(x..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解问题陈述","slug":"_2-理解问题陈述","link":"#_2-理解问题陈述","children":[]},{"level":2,"title":"3. 使用距离公式","slug":"_3-使用距离公式","link":"#_3-使用距离公式","children":[]},{"level":2,"title":"4. 使用斜率公式","slug":"_4-使用斜率公式","link":"#_4-使用斜率公式","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719257069000,"updatedTime":1719257069000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.43,"words":1029},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Check if a Point Is Between Two Points Drawn on a Straight Line in Java.md","localizedDate":"2024年6月25日","excerpt":"<hr>\\n<h1>在Java中检查一个点是否在直线上的两点之间</h1>\\n<h2>1. 概述</h2>\\n<p>在使用二维几何时，一个常见的问题是确定一个点是否在直线上的另外两个点之间。</p>\\n<p>在这个快速教程中，我们将探讨在Java中进行这种判断的不同方法。</p>\\n<h2>2. 理解问题陈述</h2>\\n<p>假设我们在平面上有两个点：第一个点A的坐标是(x1, y1)，第二个点B的坐标是(x2, y2)。我们想要检查给定的点C，其坐标为(x3, y3)，是否在A和B之间：</p>\\n<p>在上面的图表中，点C位于点A和B之间，而点D不位于点A和B之间。</p>\\n<h2>3. 使用距离公式</h2>","autoDesc":true}');export{k as comp,d as data};
