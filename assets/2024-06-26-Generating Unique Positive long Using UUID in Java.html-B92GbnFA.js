import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-uizvaz9h.js";const i={},d=n(`<h1 id="在java中使用uuid生成唯一的正长整型" tabindex="-1"><a class="header-anchor" href="#在java中使用uuid生成唯一的正长整型"><span>在Java中使用UUID生成唯一的正长整型</span></a></h1><p>通用唯一识别码（UUID）表示一个128位的数字，设计上是全球唯一的。在实践中，UUID适用于需要唯一识别的场合，例如创建数据库表的主键。</p><p>Java提供了<code>long</code>基本数据类型，这是一个易于阅读和理解的数据类型。在许多情况下，使用64位的<code>long</code>可以提供足够的唯一性，并且碰撞概率很低。此外，像MySQL、PostgreSQL等数据库已经优化了与数值数据类型的高效工作。</p><p>在本文中，我们将讨论<strong>使用UUID生成唯一的正长整型值，重点关注版本4的UUID</strong>。</p><h3 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h3><h3 id="_2-生成唯一的正长整型" tabindex="-1"><a class="header-anchor" href="#_2-生成唯一的正长整型"><span>2. 生成唯一的正长整型</span></a></h3><p>这个场景**提出了一个有趣的挑战，因为UUID有128位的范围。与此同时，<code>long</code>值只有64位。这意味着独特性的潜力有所减少。我们将讨论如何使用随机生成的UUID来获取唯一的正长整型值，以及这种方法的有效性。</p><h4 id="_2-1-使用getleastsignificantbits" tabindex="-1"><a class="header-anchor" href="#_2-1-使用getleastsignificantbits"><span>2.1. 使用<code>getLeastSignificantBits()</code></span></a></h4><p><code>UUID</code>类的<code>getLeastSignificantBits()</code>方法返回UUID的最低64位。这意味着它只提供了128位UUID值的一半。</p><p>所以，让我们在<code>randomUUID()</code>方法之后调用它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long randomPositiveLong = Math.abs(UUID.randomUUID().getLeastSignificantBits());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们将继续在以下每种方法中使用<code>Math.abs()</code>以确保正值。</p><h4 id="_2-2-使用getmostsignificantbits" tabindex="-1"><a class="header-anchor" href="#_2-2-使用getmostsignificantbits"><span>2.2. 使用<code>getMostSignificantBits()</code></span></a></h4><p>类似地，<code>UUID</code>类的<code>getMostSignificantBits()</code>方法也返回一个64位的<code>long</code>。不同之处在于它取的是128位UUID值中最高位置的位。</p><p>再次，我们将在<code>randomUUID()</code>方法之后链式调用它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>long randomPositiveLong = Math.abs(UUID.randomUUID().getMostSignificantBits());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们断言结果值是正的（实际上是非负的，因为可能会生成0的值）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertThat(randomPositiveLong).isNotNegative();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-有效性如何" tabindex="-1"><a class="header-anchor" href="#_3-有效性如何"><span>3. 有效性如何？</span></a></h3><p>让我们讨论在这种情况下使用UUID的有效性。为了找出答案，我们将查看几个因素。</p><h4 id="_3-1-安全性和效率" tabindex="-1"><a class="header-anchor" href="#_3-1-安全性和效率"><span>3.1. 安全性和效率</span></a></h4><p>Java中的<code>UUID.randomUUID()</code>使用<code>SecureRandom</code>类生成安全的随机数以产生版本4的UUID。如果生成的UUID将用于安全或密码学上下文，这一点尤为重要。</p><p>为了评估使用UUID生成唯一正长整型值的效率和相关性，让我们看看源代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static UUID randomUUID() {
    SecureRandom ng = Holder.numberGenerator;

    byte[] randomBytes = new byte[16];
    ng.nextBytes(randomBytes);
    randomBytes[6]  &amp;= 0x0f;  /* 清除版本        */
    randomBytes[6]  |= 0x40;  /* 设置为版本4     */
    randomBytes[8]  &amp;= 0x3f;  /* 清除变体        */
    randomBytes[8]  |= (byte) 0x80;  /* 设置为IETF变体 */
    return new UUID(randomBytes);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法使用<code>SecureRandom</code>生成16个随机字节形成UUID，然后调整这些字节中的几个位以指定UUID版本（版本4）和UUID变体（IETF）。</p><p>虽然UUID提供了强大的功能，但在这种特定情况下，更简单的方法可以实现所需的结果。因此，替代方法可能提供更好的效率和更好的适应性。</p><p>此外，这种方法可能会降低生成位的随机性。</p><h4 id="_3-2-唯一性和碰撞概率" tabindex="-1"><a class="header-anchor" href="#_3-2-唯一性和碰撞概率"><span>3.2. 唯一性和碰撞概率</span></a></h4><p>尽管UUID v4有128位的范围，但四位用于表示版本4，两位用于表示变体。如我们所知，在UUID显示格式中，每个字符代表一个四位的十六进制数字：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>数字4表示四位的UUID版本（在这种情况下是版本4）。同时，字母‘y’将包含两位IETF变体。剩余的x部分包含122位随机位。因此，我们可以有1/2^122的碰撞概率。</p><p>RFC通常解释了UUID v4是如何创建的。要更清楚地看到位位置是如何分布的，我们可以再次查看<code>UUID.randomUUID()</code>的实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>randomBytes[6]  &amp;= 0x0f;  /* 清除版本        */
randomBytes[6]  |= 0x40;  /* 设置为版本4     */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，在<code>randomBytes[6]</code>中，有四位设置为最高有效位（MSB）位置的版本标记。因此，MSB中只有60位真正随机。因此，我们可以计算MSB的碰撞概率为1/2^59。</p><p>在添加<code>Math.abs()</code>之后，由于正负数的重叠，碰撞的机会增加了一倍。因此，<strong>MSB中正长整型值的碰撞概率是2^58分之一</strong>。</p><p>然后，在<code>randomBytes[8]</code>中，有两位设置为最低有效位（LSB）位置的IETF变体：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>randomBytes[8] &amp;= 0x3f; /* 清除变体 */
randomBytes[8] |= (byte) 0x80; /* 设置为IETF变体 */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，LSB中只有62位真正随机。因此，我们可以计算LSB的碰撞概率为1/2^61。</p><p>在添加<code>Math.abs()</code>之后，由于正负数的重叠，碰撞的机会增加了一倍。因此，<strong>LSB中正长整型值的碰撞概率是2^60分之一</strong>。</p><p>所以，我们可以看到<strong>碰撞概率很小。但是，如果我们问UUID的内容是否完全随机，那么答案是不</strong>。</p><h4 id="_3-3-适用性" tabindex="-1"><a class="header-anchor" href="#_3-3-适用性"><span>3.3. 适用性</span></a></h4><p>UUID旨在实现全球唯一性、标识、安全和可移植性。<strong>对于生成唯一的正长整型值，存在更有效的方法，这使得UUID在这种情况下不必要</strong>。</p><p>虽然<code>UUID.randomUUID()</code>拥有128位的长度，我们已经看到只有122位实际上是随机的，而Java的<code>long</code>数据类型只处理64位。在将128位UUID转换为64位长整型时，一些独特的潜力丢失了。如果唯一性至关重要，请考虑这种权衡。</p><h3 id="_4-securerandom作为替代方案" tabindex="-1"><a class="header-anchor" href="#_4-securerandom作为替代方案"><span>4. SecureRandom作为替代方案</span></a></h3><p><strong>如果我们需要唯一的长整型值，使用具有适当范围的随机数生成器更有意义</strong>（例如，使用SecureRandom生成唯一的随机长整型值）。这将确保我们在适当的范围内有唯一的长整型值，而不会像我们尝试使用UUID时那样丢失大部分唯一位。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SecureRandom secureRandom = new SecureRandom();
long randomPositiveLong = Math.abs(secureRandom.nextLong());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>它也有更低的碰撞概率，因为它生成完全随机的64位长整型值。</p><p>为了确保正值，我们只需添加<code>Math.abs()</code>。因此，碰撞概率计算为1/2^62。以十进制形式，这个概率大约是0.000000000000000000216840434497100900。<strong>对于大多数实际应用，我们可以认为这种低概率是微不足道的</strong>。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>总之，尽管UUID提供了全球唯一的标识符，它们可能不是生成唯一正长整型值的最有效的选择，因为会发生显的位丢失。</p><p>使用<code>getMostSignificantBits()</code>和<code>getLeastSignificantBits()</code>方法仍然可以提供低碰撞概率，但<strong>使用像SecureRandom这样的随机数生成器可能更有效率，更适合直接生成唯一的正长整型值</strong>。</p><p>如常，完整的源代码可在GitHub上获得。</p>`,52),s=[d];function o(r,c){return t(),a("div",null,s)}const U=e(i,[["render",o],["__file","2024-06-26-Generating Unique Positive long Using UUID in Java.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Generating%20Unique%20Positive%20long%20Using%20UUID%20in%20Java.html","title":"在Java中使用UUID生成唯一的正长整型","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","UUID"],"tag":["唯一性","长整型"],"head":[["meta",{"name":"keywords","content":"Java, UUID, 唯一性, 长整型"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Generating%20Unique%20Positive%20long%20Using%20UUID%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中使用UUID生成唯一的正长整型"}],["meta",{"property":"og:description","content":"在Java中使用UUID生成唯一的正长整型 通用唯一识别码（UUID）表示一个128位的数字，设计上是全球唯一的。在实践中，UUID适用于需要唯一识别的场合，例如创建数据库表的主键。 Java提供了long基本数据类型，这是一个易于阅读和理解的数据类型。在许多情况下，使用64位的long可以提供足够的唯一性，并且碰撞概率很低。此外，像MySQL、Pos..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T21:28:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"唯一性"}],["meta",{"property":"article:tag","content":"长整型"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T21:28:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中使用UUID生成唯一的正长整型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T21:28:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中使用UUID生成唯一的正长整型 通用唯一识别码（UUID）表示一个128位的数字，设计上是全球唯一的。在实践中，UUID适用于需要唯一识别的场合，例如创建数据库表的主键。 Java提供了long基本数据类型，这是一个易于阅读和理解的数据类型。在许多情况下，使用64位的long可以提供足够的唯一性，并且碰撞概率很低。此外，像MySQL、Pos..."},"headers":[{"level":3,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":3,"title":"2. 生成唯一的正长整型","slug":"_2-生成唯一的正长整型","link":"#_2-生成唯一的正长整型","children":[]},{"level":3,"title":"3. 有效性如何？","slug":"_3-有效性如何","link":"#_3-有效性如何","children":[]},{"level":3,"title":"4. SecureRandom作为替代方案","slug":"_4-securerandom作为替代方案","link":"#_4-securerandom作为替代方案","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719437322000,"updatedTime":1719437322000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.6,"words":1681},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Generating Unique Positive long Using UUID in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>通用唯一识别码（UUID）表示一个128位的数字，设计上是全球唯一的。在实践中，UUID适用于需要唯一识别的场合，例如创建数据库表的主键。</p>\\n<p>Java提供了<code>long</code>基本数据类型，这是一个易于阅读和理解的数据类型。在许多情况下，使用64位的<code>long</code>可以提供足够的唯一性，并且碰撞概率很低。此外，像MySQL、PostgreSQL等数据库已经优化了与数值数据类型的高效工作。</p>\\n<p>在本文中，我们将讨论<strong>使用UUID生成唯一的正长整型值，重点关注版本4的UUID</strong>。</p>\\n<h3>1. 概述</h3>","autoDesc":true}');export{U as comp,g as data};
