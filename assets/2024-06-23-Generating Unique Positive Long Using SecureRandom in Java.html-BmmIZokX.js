import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as t}from"./app-DzJ3ruqA.js";const o={},d=t(`<h1 id="使用java-securerandom生成唯一的正long值" tabindex="-1"><a class="header-anchor" href="#使用java-securerandom生成唯一的正long值"><span>使用Java SecureRandom生成唯一的正Long值</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在<code>java.security</code>包中的<code>SecureRandom</code>类是专门为密码学目的和关键安全场景设计的，使用算法确保高度不可预测性。</p><p>在本教程中，我们将讨论如何使用<code>SecureRandom</code>生成一个唯一的正<code>long</code>值，并探讨在生成多个值时碰撞的安全性。</p><h2 id="_2-使用nextlong-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用nextlong-方法"><span>2. 使用<code>nextLong()</code>方法</span></a></h2><p><code>SecureRandom</code>的<code>nextLong()</code>方法返回一个<code>long</code>类型的值，这是一个随机的64位数字。这些值在极其广泛的范围内随机分布，从<code>Long.MIN_VALUE</code>（-2<sup>63）到\`Long.MAX_VALUE\`（2</sup>63 - 1）。</p><p><strong>此方法从<code>Random</code>类继承而来。然而，由于使用了更多的种子位，它在碰撞概率方面更有保障。</strong></p><p>在内部，它使用伪随机数生成器（PRNG），也称为确定性随机位生成器或DRBG，结合由操作系统提供的熵源。</p><p>让我们看看如何使用它来生成一个随机的<code>long</code>值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>new SecureRandom().nextLong();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们打印这个调用方法的几种结果，可能会看到如下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>4926557902899092186
-2282075914544479463
-4653180235857827604
6589027106659854836
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，如果我们只需要正值，那么我们需要额外使用<code>Math.abs()</code>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SecureRandom secureRandom = new SecureRandom();
long randomPositiveLong = Math.abs(secureRandom.nextLong());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方式，结果保证总是正的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertThat(randomPositiveLong).isNotNegative();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-碰撞概率" tabindex="-1"><a class="header-anchor" href="#_3-碰撞概率"><span>3. 碰撞概率</span></a></h2><p><strong>因为我们需要生成唯一值，所以重要的是要确保碰撞的概率足够低。</strong></p><p>正如我们上面所指出的，<code>nextLong()</code>方法生成一个64位的随机<code>long</code>值，范围从-2<sup>63到2</sup>63 - 1。随后，通过应用<code>Math.abs()</code>，我们消除了任何负号。因此，0到2^63范围的随机性减少了2倍。因此，碰撞的概率计算为1 / 2^62。以小数形式表示，这个概率大约是0.000000000000000000216840434497100900。<strong>对于大多数实际应用，我们可以认为这个低概率是微不足道的。</strong></p><p>假设每秒生成一个值，平均来说，大约每146,135,511,523年才会发生一次碰撞。这个延长的时间框架进一步强调了碰撞事件的罕见性。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了如何使用<code>SecureRandom</code>生成唯一的正<code>long</code>值。这种方法被认为是有效的，因为它确保了高度的不可预测性，并且对于大多数应用来说，碰撞的概率是微不足道的，因此适合在各种情况下使用。</p><p>如常，完整的源代码可以在GitHub上找到。</p>`,23),c=[d];function i(r,s){return a(),n("div",null,c)}const u=e(o,[["render",i],["__file","2024-06-23-Generating Unique Positive Long Using SecureRandom in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Generating%20Unique%20Positive%20Long%20Using%20SecureRandom%20in%20Java.html","title":"使用Java SecureRandom生成唯一的正Long值","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","SecureRandom"],"tag":["SecureRandom","随机数生成"],"head":[["meta",{"name":"keywords","content":"Java, SecureRandom, 随机数, 正数, 碰撞概率"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Generating%20Unique%20Positive%20Long%20Using%20SecureRandom%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java SecureRandom生成唯一的正Long值"}],["meta",{"property":"og:description","content":"使用Java SecureRandom生成唯一的正Long值 1. 概述 在java.security包中的SecureRandom类是专门为密码学目的和关键安全场景设计的，使用算法确保高度不可预测性。 在本教程中，我们将讨论如何使用SecureRandom生成一个唯一的正long值，并探讨在生成多个值时碰撞的安全性。 2. 使用nextLong()方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T02:44:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SecureRandom"}],["meta",{"property":"article:tag","content":"随机数生成"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T02:44:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java SecureRandom生成唯一的正Long值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T02:44:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java SecureRandom生成唯一的正Long值 1. 概述 在java.security包中的SecureRandom类是专门为密码学目的和关键安全场景设计的，使用算法确保高度不可预测性。 在本教程中，我们将讨论如何使用SecureRandom生成一个唯一的正long值，并探讨在生成多个值时碰撞的安全性。 2. 使用nextLong()方..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用nextLong()方法","slug":"_2-使用nextlong-方法","link":"#_2-使用nextlong-方法","children":[]},{"level":2,"title":"3. 碰撞概率","slug":"_3-碰撞概率","link":"#_3-碰撞概率","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719110668000,"updatedTime":1719110668000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.2,"words":661},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Generating Unique Positive Long Using SecureRandom in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在<code>java.security</code>包中的<code>SecureRandom</code>类是专门为密码学目的和关键安全场景设计的，使用算法确保高度不可预测性。</p>\\n<p>在本教程中，我们将讨论如何使用<code>SecureRandom</code>生成一个唯一的正<code>long</code>值，并探讨在生成多个值时碰撞的安全性。</p>\\n<h2>2. 使用<code>nextLong()</code>方法</h2>\\n<p><code>SecureRandom</code>的<code>nextLong()</code>方法返回一个<code>long</code>类型的值，这是一个随机的64位数字。这些值在极其广泛的范围内随机分布，从<code>Long.MIN_VALUE</code>（-2<sup>63）到`Long.MAX_VALUE`（2</sup>63 - 1）。</p>","autoDesc":true}');export{u as comp,g as data};
