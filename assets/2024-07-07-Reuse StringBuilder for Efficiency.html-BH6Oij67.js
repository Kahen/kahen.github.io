import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,o as n,a as t}from"./app-B_O3I5S1.js";const i={},a=t(`<h1 id="重用stringbuilder以提高效率" tabindex="-1"><a class="header-anchor" href="#重用stringbuilder以提高效率"><span>重用StringBuilder以提高效率</span></a></h1><p>在本教程中，我们将讨论是否应该重用StringBuilder以提高效率。我们将指导您如何重用StringBuilder并解释其好处。</p><h3 id="_2-好处" tabindex="-1"><a class="header-anchor" href="#_2-好处"><span>2. 好处</span></a></h3><p>重用StringBuilder实例可以帮助优化应用程序的内存使用和速度。</p><h4 id="_2-1-优化对象创建" tabindex="-1"><a class="header-anchor" href="#_2-1-优化对象创建"><span>2.1. 优化对象创建</span></a></h4><p>在Java中实例化新对象在内存和CPU使用方面可能代价昂贵。由于字符串是不可变的，使用StringBuilder来连接不同的字符串通常可以避免不必要的对象创建。重用StringBuilder本身也可以避免与内存分配和垃圾回收相关的额外开销。</p><h4 id="_2-2-改善性能" tabindex="-1"><a class="header-anchor" href="#_2-2-改善性能"><span>2.2. 改善性能</span></a></h4><p>StringBuilder对象是可变的，允许我们多次更改对象而无需创建新对象。这比字符串操作的性能要高得多。</p><h4 id="_2-3-减少内存使用" tabindex="-1"><a class="header-anchor" href="#_2-3-减少内存使用"><span>2.3. 减少内存使用</span></a></h4><p>字符串对象是不可变的，这意味着它们在创建后不能被修改。当字符串被修改时，它会创建一个新对象，这增加了内存使用。通过使用StringBuilder实例，开发人员可以避免不必要的对象创建，减少应用程序使用的内存量。</p><h4 id="_2-4-提高缓存可靠性" tabindex="-1"><a class="header-anchor" href="#_2-4-提高缓存可靠性"><span>2.4. 提高缓存可靠性</span></a></h4><p>当应用程序创建一个新对象时，它很可能每次都会分配在不同的内存位置，导致缓存未命中和性能下降。通过重用StringBuilder实例，同一个对象可以重复使用，从而实现更好的缓存利用和改善的性能。</p><h3 id="_3-示例" tabindex="-1"><a class="header-anchor" href="#_3-示例"><span>3. 示例</span></a></h3><p>在我们第一个示例中，我们将在每次循环迭代中创建一个新的StringBuilder对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (int i = 0; i &lt; 100; i++) {
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.append(&quot;baeldung&quot;);
    stringBuilder.toString();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种方式是一次又一次地重用同一个StringBuilder对象。为了做到这一点，我们需要在StringBuilder的每次迭代结束时调用delete()方法，并删除StringBuilder包含的整个字符数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>StringBuilder stringBuilder = new StringBuilder();
for (int i = 0; i &lt; 100; i++) {
    stringBuilder.append(&quot;baeldung&quot;);
    stringBuilder.toString();
    stringBuilder.delete(0, stringBuilder.length());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以在每次迭代后将StringBuilder的长度设置为零，而不是删除底层的字符数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>StringBuilder stringBuilder = new StringBuilder();
for (int i = 0; i &lt; 100; i++) {
    stringBuilder.append(&quot;baeldung&quot;);
    stringBuilder.toString();
    stringBuilder.setLength(0);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们比较各自示例之间的差异进行简短的基准测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Benchmark                                                   Mode  Cnt    Score    Error  Units
Example 1: new StringBuilder object                           ss   10  210,661 ± 15,237  ms/op
Example 2: reuse StringBuilder with delete()                  ss   10  185,908 ±  7,802  ms/op
Example 3: reuse StringBuilder with setLength()               ss   10  164,323 ±  1,909  ms/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到，正如预期的那样，每次迭代中的对象创建是最慢的。我们还可以看到，使用setLength(0)的示例比使用delete(0, stringBuilder.length())的示例更快。这主要是因为<strong>使用setLength()，我们只改变StringBuilder的计数字段的值</strong>。这个操作很快。而使用delete()方法时，StringBuilder对象必须删除传递范围内的字符。在这种情况下，通过传递零和最大长度，整个字符数组被删除。在数组中移动字符使这个操作复杂得多。因此**，使用setLength()方法通常更快**以达到相同的结果。</p><h3 id="_4-何时重用stringbuilder" tabindex="-1"><a class="header-anchor" href="#_4-何时重用stringbuilder"><span>4. 何时重用StringBuilder</span></a></h3><p>需要注意的是，并非所有的字符串操作都需要StringBuilder。我们可以在没有StringBuilder的情况下执行简单的操作，例如连接两个字符串。我们也不需要为所有操作重用StringBuilder。<strong>我们应该在涉及大量操作或迭代的复杂字符串操作中使用可重用的StringBuilders。</strong></p><p>我们还需要确保在并发应用程序中的线程安全性。如果没有适当的同步，多个线程可能会使用同一个StringBuilder对象，导致意外的行为。开发人员可以通过使用同步方法或锁来防止竞争条件，确保线程安全。或者，一个类或线程可以只在当地重用StringBuilder对象。</p><p>有时<strong>如果性能提升不是那么重要，而是确保代码易于理解</strong>和可读，那么放弃重用StringBuilder和由此获得的性能也是有意义的。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们讨论了重用StringBuilder的优势，并展示了如何做到这一点的具体示例。总的来说，重用StringBuilder可以帮助减少开销并提高性能。</p><p>如往常一样，示例代码可在GitHub上找到。</p><p><a href="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" target="_blank" rel="noopener noreferrer">Baeldung Logo</a><a href="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar Image</a><a href="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" target="_blank" rel="noopener noreferrer">Gravatar Image</a><a href="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" target="_blank" rel="noopener noreferrer">Announcement Icon</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" target="_blank" rel="noopener noreferrer">Baeldung REST Post Footer</a><a href="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" target="_blank" rel="noopener noreferrer">Baeldung REST Post Footer Icon</a></p><p>OK</p>`,31),l=[a];function d(s,o){return n(),r("div",null,l)}const c=e(i,[["render",d],["__file","2024-07-07-Reuse StringBuilder for Efficiency.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Reuse%20StringBuilder%20for%20Efficiency.html","title":"重用StringBuilder以提高效率","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Java","Performance"],"tag":["StringBuilder","Efficiency"],"head":[["meta",{"name":"keywords","content":"Java, StringBuilder, Performance, Efficiency, Reuse, Memory, CPU, Garbage Collection, Cache"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Reuse%20StringBuilder%20for%20Efficiency.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"重用StringBuilder以提高效率"}],["meta",{"property":"og:description","content":"重用StringBuilder以提高效率 在本教程中，我们将讨论是否应该重用StringBuilder以提高效率。我们将指导您如何重用StringBuilder并解释其好处。 2. 好处 重用StringBuilder实例可以帮助优化应用程序的内存使用和速度。 2.1. 优化对象创建 在Java中实例化新对象在内存和CPU使用方面可能代价昂贵。由于字符..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T09:58:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"StringBuilder"}],["meta",{"property":"article:tag","content":"Efficiency"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T09:58:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"重用StringBuilder以提高效率\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T09:58:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"重用StringBuilder以提高效率 在本教程中，我们将讨论是否应该重用StringBuilder以提高效率。我们将指导您如何重用StringBuilder并解释其好处。 2. 好处 重用StringBuilder实例可以帮助优化应用程序的内存使用和速度。 2.1. 优化对象创建 在Java中实例化新对象在内存和CPU使用方面可能代价昂贵。由于字符..."},"headers":[{"level":3,"title":"2. 好处","slug":"_2-好处","link":"#_2-好处","children":[]},{"level":3,"title":"3. 示例","slug":"_3-示例","link":"#_3-示例","children":[]},{"level":3,"title":"4. 何时重用StringBuilder","slug":"_4-何时重用stringbuilder","link":"#_4-何时重用stringbuilder","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720346313000,"updatedTime":1720346313000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.93,"words":1180},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Reuse StringBuilder for Efficiency.md","localizedDate":"2024年7月7日","excerpt":"\\n<p>在本教程中，我们将讨论是否应该重用StringBuilder以提高效率。我们将指导您如何重用StringBuilder并解释其好处。</p>\\n<h3>2. 好处</h3>\\n<p>重用StringBuilder实例可以帮助优化应用程序的内存使用和速度。</p>\\n<h4>2.1. 优化对象创建</h4>\\n<p>在Java中实例化新对象在内存和CPU使用方面可能代价昂贵。由于字符串是不可变的，使用StringBuilder来连接不同的字符串通常可以避免不必要的对象创建。重用StringBuilder本身也可以避免与内存分配和垃圾回收相关的额外开销。</p>\\n<h4>2.2. 改善性能</h4>","autoDesc":true}');export{c as comp,p as data};
