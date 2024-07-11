import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-bN4DcMMr.js";const p={},e=t(`<hr><h1 id="在java中计算两个坐标之间的距离" tabindex="-1"><a class="header-anchor" href="#在java中计算两个坐标之间的距离"><span>在Java中计算两个坐标之间的距离</span></a></h1><p>在这篇快速教程中，我们将实现计算两个地理坐标之间距离的方法。</p><p>特别是，我们首先实现距离的一个近似值。然后，我们将查看Haversine公式和Vincenty公式，这些公式提供更高的准确性。</p><h2 id="_2-等距圆柱投影距离近似" tabindex="-1"><a class="header-anchor" href="#_2-等距圆柱投影距离近似"><span>2. 等距圆柱投影距离近似</span></a></h2><p>让我们首先实现等距圆柱投影近似。详细来说，由于这个公式使用的数学运算最少，它非常快：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> <span class="token function">calculateDistance</span><span class="token punctuation">(</span><span class="token keyword">double</span> lat1<span class="token punctuation">,</span> <span class="token keyword">double</span> lon1<span class="token punctuation">,</span> <span class="token keyword">double</span> lat2<span class="token punctuation">,</span> <span class="token keyword">double</span> lon2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> lat1Rad <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span>lat1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> lat2Rad <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span>lat2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> lon1Rad <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span>lon1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> lon2Rad <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span>lon2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">double</span> x <span class="token operator">=</span> <span class="token punctuation">(</span>lon2Rad <span class="token operator">-</span> lon1Rad<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span><span class="token punctuation">(</span>lat1Rad <span class="token operator">+</span> lat2Rad<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> y <span class="token operator">=</span> <span class="token punctuation">(</span>lat2Rad <span class="token operator">-</span> lat1Rad<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> distance <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token constant">EARTH_RADIUS</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> distance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述中_EARTH_RADIUS_是一个常量，等于6371，这是地球半径的一个良好近似值，单位是千米。</p><p>尽管它看起来是一个简单的公式，<strong>等距圆柱投影近似在计算长距离时并不是很准确</strong>。实际上，它将地球视为一个完美的球体，并将球体映射到一个矩形网格上。</p><h2 id="_3-使用haversine公式计算距离" tabindex="-1"><a class="header-anchor" href="#_3-使用haversine公式计算距离"><span>3. 使用Haversine公式计算距离</span></a></h2><p>接下来，我们来看看Haversine公式。同样，它将地球视为一个完美的球体。尽管如此，它在计算长距离时更准确。</p><p>此外，<strong>Haversine公式基于球面正弦定律</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> <span class="token function">haversine</span><span class="token punctuation">(</span><span class="token keyword">double</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>val <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，使用这个辅助函数，我们可以实现计算距离的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> <span class="token function">calculateDistance</span><span class="token punctuation">(</span><span class="token keyword">double</span> startLat<span class="token punctuation">,</span> <span class="token keyword">double</span> startLong<span class="token punctuation">,</span> <span class="token keyword">double</span> endLat<span class="token punctuation">,</span> <span class="token keyword">double</span> endLong<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">double</span> dLat <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span><span class="token punctuation">(</span>endLat <span class="token operator">-</span> startLat<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> dLong <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span><span class="token punctuation">(</span>endLong <span class="token operator">-</span> startLong<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    startLat <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span>startLat<span class="token punctuation">)</span><span class="token punctuation">;</span>
    endLat <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span>endLat<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">double</span> a <span class="token operator">=</span> <span class="token function">haversine</span><span class="token punctuation">(</span>dLat<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>startLat<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>endLat<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token function">haversine</span><span class="token punctuation">(</span>dLong<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> c <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">atan2</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> a<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token constant">EARTH_RADIUS</span> <span class="token operator">*</span> c<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管它提高了计算的准确性，但它仍然将地球视为一个扁平的形状。</p><h2 id="_4-使用vincenty公式计算距离" tabindex="-1"><a class="header-anchor" href="#_4-使用vincenty公式计算距离"><span>4. 使用Vincenty公式计算距离</span></a></h2><p>最后，如果我们想要最高的精度，我们必须使用Vincenty公式。详细来说，<strong>Vincenty公式通过迭代计算距离，直到误差达到可接受的值</strong>。此外，它还考虑了地球的椭圆形状。</p><p>首先，公式需要一些常数来描述地球的椭球模型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> <span class="token constant">SEMI_MAJOR_AXIS_MT</span> <span class="token operator">=</span> <span class="token number">6378137</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> <span class="token constant">SEMI_MINOR_AXIS_MT</span> <span class="token operator">=</span> <span class="token number">6356752.314245</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> <span class="token constant">FLATTENING</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">/</span> <span class="token number">298.257223563</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> <span class="token constant">ERROR_TOLERANCE</span> <span class="token operator">=</span> <span class="token number">1e-12</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显然，_ERROR_TOLERANCE_代表我们愿意接受的误差。进一步，我们将在Vincenty公式中使用这些值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> <span class="token function">calculateDistance</span><span class="token punctuation">(</span><span class="token keyword">double</span> latitude1<span class="token punctuation">,</span> <span class="token keyword">double</span> longitude1<span class="token punctuation">,</span> <span class="token keyword">double</span> latitude2<span class="token punctuation">,</span> <span class="token keyword">double</span> longitude2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 省略了具体的计算过程，以节省篇幅</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个公式计算量大。因此，我们可能想在精度是一个目标时使用它。否则，我们将坚持使用Haversine公式。</p><h2 id="_5-测试准确性" tabindex="-1"><a class="header-anchor" href="#_5-测试准确性"><span>5. 测试准确性</span></a></h2><p>最后，我们可以测试我们上面看到的所有方法的准确性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> lat1 <span class="token operator">=</span> <span class="token number">40.714268</span><span class="token punctuation">;</span> <span class="token comment">// 纽约</span>
<span class="token keyword">double</span> lon1 <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">74.005974</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> lat2 <span class="token operator">=</span> <span class="token number">34.0522</span><span class="token punctuation">;</span> <span class="token comment">// 洛杉矶</span>
<span class="token keyword">double</span> lon2 <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">118.2437</span><span class="token punctuation">;</span>

<span class="token keyword">double</span> equirectangularDistance <span class="token operator">=</span> <span class="token class-name">EquirectangularApproximation</span><span class="token punctuation">.</span><span class="token function">calculateDistance</span><span class="token punctuation">(</span>lat1<span class="token punctuation">,</span> lon1<span class="token punctuation">,</span> lat2<span class="token punctuation">,</span> lon2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> haversineDistance <span class="token operator">=</span> <span class="token class-name">HaversineDistance</span><span class="token punctuation">.</span><span class="token function">calculateDistance</span><span class="token punctuation">(</span>lat1<span class="token punctuation">,</span> lon1<span class="token punctuation">,</span> lat2<span class="token punctuation">,</span> lon2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> vincentyDistance <span class="token operator">=</span> <span class="token class-name">VincentyDistance</span><span class="token punctuation">.</span><span class="token function">calculateDistance</span><span class="token punctuation">(</span>lat1<span class="token punctuation">,</span> lon1<span class="token punctuation">,</span> lat2<span class="token punctuation">,</span> lon2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">double</span> expectedDistance <span class="token operator">=</span> <span class="token number">3944</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>equirectangularDistance <span class="token operator">-</span> expectedDistance<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>haversineDistance <span class="token operator">-</span> expectedDistance<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>vincentyDistance <span class="token operator">-</span> expectedDistance<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述，我们计算了纽约和洛杉矶之间的距离，然后以千米为单位评估了准确性。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们看到了三种在Java中计算两个地理点之间距离的方法。我们从最不准确的等距圆柱投影近似开始。然后我们看了更准确的Haversine公式。最后，我们使用了最准确的Vincenty公式。</p><p>正如往常一样，示例中使用的代码可以在GitHub上找到。</p>`,30),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-01-Calculate Distance Between Two Coordinates in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Calculate%20Distance%20Between%20Two%20Coordinates%20in%20Java.html","title":"在Java中计算两个坐标之间的距离","lang":"zh-CN","frontmatter":{"date":"2024-07-01T00:00:00.000Z","category":["Java","编程"],"tag":["地理坐标","距离计算"],"head":[["meta",{"name":"keywords","content":"Java, 地理坐标, 距离计算, Haversine公式, Vincenty公式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Calculate%20Distance%20Between%20Two%20Coordinates%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中计算两个坐标之间的距离"}],["meta",{"property":"og:description","content":"在Java中计算两个坐标之间的距离 在这篇快速教程中，我们将实现计算两个地理坐标之间距离的方法。 特别是，我们首先实现距离的一个近似值。然后，我们将查看Haversine公式和Vincenty公式，这些公式提供更高的准确性。 2. 等距圆柱投影距离近似 让我们首先实现等距圆柱投影近似。详细来说，由于这个公式使用的数学运算最少，它非常快： 上述中_EAR..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T13:05:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"地理坐标"}],["meta",{"property":"article:tag","content":"距离计算"}],["meta",{"property":"article:published_time","content":"2024-07-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T13:05:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中计算两个坐标之间的距离\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T13:05:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中计算两个坐标之间的距离 在这篇快速教程中，我们将实现计算两个地理坐标之间距离的方法。 特别是，我们首先实现距离的一个近似值。然后，我们将查看Haversine公式和Vincenty公式，这些公式提供更高的准确性。 2. 等距圆柱投影距离近似 让我们首先实现等距圆柱投影近似。详细来说，由于这个公式使用的数学运算最少，它非常快： 上述中_EAR..."},"headers":[{"level":2,"title":"2. 等距圆柱投影距离近似","slug":"_2-等距圆柱投影距离近似","link":"#_2-等距圆柱投影距离近似","children":[]},{"level":2,"title":"3. 使用Haversine公式计算距离","slug":"_3-使用haversine公式计算距离","link":"#_3-使用haversine公式计算距离","children":[]},{"level":2,"title":"4. 使用Vincenty公式计算距离","slug":"_4-使用vincenty公式计算距离","link":"#_4-使用vincenty公式计算距离","children":[]},{"level":2,"title":"5. 测试准确性","slug":"_5-测试准确性","link":"#_5-测试准确性","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719839124000,"updatedTime":1719839124000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.05,"words":916},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Calculate Distance Between Two Coordinates in Java.md","localizedDate":"2024年7月1日","excerpt":"<hr>\\n<h1>在Java中计算两个坐标之间的距离</h1>\\n<p>在这篇快速教程中，我们将实现计算两个地理坐标之间距离的方法。</p>\\n<p>特别是，我们首先实现距离的一个近似值。然后，我们将查看Haversine公式和Vincenty公式，这些公式提供更高的准确性。</p>\\n<h2>2. 等距圆柱投影距离近似</h2>\\n<p>让我们首先实现等距圆柱投影近似。详细来说，由于这个公式使用的数学运算最少，它非常快：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">double</span> <span class=\\"token function\\">calculateDistance</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">double</span> lat1<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">double</span> lon1<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">double</span> lat2<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">double</span> lon2<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">double</span> lat1Rad <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Math</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toRadians</span><span class=\\"token punctuation\\">(</span>lat1<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">double</span> lat2Rad <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Math</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toRadians</span><span class=\\"token punctuation\\">(</span>lat2<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">double</span> lon1Rad <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Math</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toRadians</span><span class=\\"token punctuation\\">(</span>lon1<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">double</span> lon2Rad <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Math</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">toRadians</span><span class=\\"token punctuation\\">(</span>lon2<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">double</span> x <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>lon2Rad <span class=\\"token operator\\">-</span> lon1Rad<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">*</span> <span class=\\"token class-name\\">Math</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">cos</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span>lat1Rad <span class=\\"token operator\\">+</span> lat2Rad<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">/</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">double</span> y <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>lat2Rad <span class=\\"token operator\\">-</span> lat1Rad<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">double</span> distance <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Math</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">sqrt</span><span class=\\"token punctuation\\">(</span>x <span class=\\"token operator\\">*</span> x <span class=\\"token operator\\">+</span> y <span class=\\"token operator\\">*</span> y<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">*</span> <span class=\\"token constant\\">EARTH_RADIUS</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">return</span> distance<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
