import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as r}from"./app-2zDpbLgD.js";const i={},a=r(`<h1 id="java中string与stringbuffer的比较" tabindex="-1"><a class="header-anchor" href="#java中string与stringbuffer的比较"><span>Java中String与StringBuffer的比较</span></a></h1><p>在Java中处理字符串时，String和StringBuffer是两个重要的类。简单来说，字符串是字符序列，例如“java”，“spring”等。</p><p>String和StringBuffer之间的主要区别在于String是不可变的，而StringBuffer是可变的并且是线程安全的。</p><p>本教程将比较String和StringBuffer类，并理解它们之间的相似之处和不同之处。</p><p>String类表示字符字符串。Java将所有字符串字面量，例如“baeldung”，实现为这个类的实例。</p><p>让我们创建一个String字面量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String str = &quot;baeldung&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们也可以这样创建一个String对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Char data[] = {&#39;b&#39;, &#39;a&#39;, &#39;e&#39;, &#39;l&#39;, &#39;d&#39;, &#39;u&#39;, &#39;n&#39;, &#39;g&#39;};

String str = new String(data);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以做如下操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String str = new String(&quot;baeldung&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>字符串是常量且不可变，这使得它们可以共享。</strong></p><h3 id="_2-1-字符串字面量与string对象" tabindex="-1"><a class="header-anchor" href="#_2-1-字符串字面量与string对象"><span>2.1. 字符串字面量与String对象</span></a></h3><p>字符串字面量是存储在堆内存中一个特殊内存空间，称为字符串池中的不可变字符串。Java不会为具有相同值的字符串字面量分配新的内存空间。相反，它使用字符串池。</p><p>与此相反，JVM为新创建的String对象在字符串池外的堆内存中分配单独的内存。</p><p>因此，即使两个String对象可能具有相同的值，每个String对象也指向不同的内存地址。注意，String字面量仍然是String对象，但反之则不成立。</p><h3 id="_2-2-字符串池" tabindex="-1"><a class="header-anchor" href="#_2-2-字符串池"><span>2.2. 字符串池</span></a></h3><p>字符串字面量存储在Java堆的一个保留内存区域，称为字符串池。</p><h3 id="_2-3-字符串池化" tabindex="-1"><a class="header-anchor" href="#_2-3-字符串池化"><span>2.3. 字符串池化</span></a></h3><p>字符串池化是编译器使用的一种优化技术，以避免冗余的内存分配。如果已经存在具有相似值字符串字面量，则避免为其分配内存。相反，它使用现有副本：</p><p>常见的String操作包括连接、比较和搜索。Java语言还为字符串连接运算符（+）和其他对象转换为字符串提供了特殊支持。值得注意的是，String在内部使用StringBuffer及其append方法执行连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String str = &quot;String&quot;;
str = str.concat(&quot;Buffer&quot;);
assertThat(str).isEqualTo(&quot;StringBuffer&quot;);
assertThat(str.indexOf(&quot;Buffer&quot;)).isEqualTo(6);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stringbuffer" tabindex="-1"><a class="header-anchor" href="#stringbuffer"><span>StringBuffer</span></a></h2><p><strong>StringBuffer是一个字符序列，就像String一样。但是，与String不同，它是可变的。</strong> 我们可以通过append()和insert()等方法调用来修改StringBuffer。append方法将字符序列添加到StringBuffer的末尾，而insert方法在指定的索引处插入字符序列。StringBuffer类对这两种方法都有重载，以处理任何对象。在将对象追加或插入到StringBuffer之前，会将其转换为其字符串表示形式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>StringBuffer sBuf = new StringBuffer(&quot;String&quot;);
sBuf.append(&quot;Buffer&quot;);
assertThat(sBuf).isEqualToIgnoringCase(&quot;StringBuffer&quot;);
sBuf.insert(0, &quot;String vs &quot;);
assertThat(sBuf).isEqualToIgnoringCase(&quot;String vs StringBuffer&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StringBuffer是线程安全的，可以在多线程环境中工作。<strong>同步</strong>确保了所有语句的正确执行顺序，并避免了数据竞争情况。</p><p>然而，Java 1.5引入了StringBuilder作为StringBuffer的替代品，用于在线程安全不是问题的情况下进行性能优化。建议在单线程使用字符串缓冲区的地方使用StringBuilder，因为它在大多数实现中会更快。</p><h2 id="性能比较" tabindex="-1"><a class="header-anchor" href="#性能比较"><span>性能比较</span></a></h2><p>String和StringBuffer具有类似的性能。然而，使用StringBuffer进行字符串操作比String更快，因为String每次修改都需要创建一个新对象，并且所有更改都发生在新的String上，导致更多的时间和内存消耗。</p><p>让我们通过JMH进行一个快速的微基准测试，比较String和StringBuffer的连接性能：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@BenchmarkMode(Mode.SingleShotTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@Measurement(batchSize = 100000, iterations = 10)
@Warmup(batchSize = 100000, iterations = 10)
@State(Scope.Thread)
public class ComparePerformance {

    String strInitial = &quot;springframework&quot;;
    String strFinal = &quot;&quot;;
    String replacement = &quot;java-&quot;;

    @Benchmark
    public String benchmarkStringConcatenation() {
        strFinal = &quot;&quot;;
        strFinal += strInitial;
        return strFinal;
    }

    @Benchmark
    public StringBuffer benchmarkStringBufferConcatenation() {
        StringBuffer stringBuffer = new StringBuffer(strFinal);
        stringBuffer.append(strInitial);
        return stringBuffer;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Benchmark                                              Mode  Cnt   Score    Error  Units
ComparePerformance.benchmarkStringBufferConcatenation    ss   10  16.047 ± 11.757  ms/op
ComparePerformance.benchmarkStringConcatenation          ss   10   3.492 ±  1.309  ms/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="比较表" tabindex="-1"><a class="header-anchor" href="#比较表"><span>比较表</span></a></h2><p>为了总结差异：</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><strong>String</strong></td><td><strong>StringBuffer</strong></td></tr><tr><td>String是字符序列且不可变</td><td>StringBuffer像String但可以修改，即可变</td></tr><tr><td>由于其不可变性，它可以很容易地共享</td><td>只能在同步线程间共享</td></tr><tr><td>修改需要创建新字符串</td><td>修改需要调用特定方法</td></tr><tr><td>修改速度慢</td><td>修改速度快</td></tr><tr><td>使用字符串池存储数据</td><td>使用堆内存</td></tr></tbody></table><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们比较了String和StringBuffer类。示例代码可以在GitHub上找到。</p>`,37),s=[a];function d(l,u){return n(),t("div",null,s)}const c=e(i,[["render",d],["__file","2024-06-26-String vs StringBuffer Comparison in Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-String%20vs%20StringBuffer%20Comparison%20in%20Java.html","title":"Java中String与StringBuffer的比较","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","编程"],"tag":["String","StringBuffer"],"head":[["meta",{"name":"keywords","content":"Java, String, StringBuffer, 字符串, 性能比较"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-String%20vs%20StringBuffer%20Comparison%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中String与StringBuffer的比较"}],["meta",{"property":"og:description","content":"Java中String与StringBuffer的比较 在Java中处理字符串时，String和StringBuffer是两个重要的类。简单来说，字符串是字符序列，例如“java”，“spring”等。 String和StringBuffer之间的主要区别在于String是不可变的，而StringBuffer是可变的并且是线程安全的。 本教程将比较St..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T07:39:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"StringBuffer"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T07:39:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中String与StringBuffer的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T07:39:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中String与StringBuffer的比较 在Java中处理字符串时，String和StringBuffer是两个重要的类。简单来说，字符串是字符序列，例如“java”，“spring”等。 String和StringBuffer之间的主要区别在于String是不可变的，而StringBuffer是可变的并且是线程安全的。 本教程将比较St..."},"headers":[{"level":3,"title":"2.1. 字符串字面量与String对象","slug":"_2-1-字符串字面量与string对象","link":"#_2-1-字符串字面量与string对象","children":[]},{"level":3,"title":"2.2. 字符串池","slug":"_2-2-字符串池","link":"#_2-2-字符串池","children":[]},{"level":3,"title":"2.3. 字符串池化","slug":"_2-3-字符串池化","link":"#_2-3-字符串池化","children":[]},{"level":2,"title":"StringBuffer","slug":"stringbuffer","link":"#stringbuffer","children":[]},{"level":2,"title":"性能比较","slug":"性能比较","link":"#性能比较","children":[]},{"level":2,"title":"比较表","slug":"比较表","link":"#比较表","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719387558000,"updatedTime":1719387558000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1134},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-String vs StringBuffer Comparison in Java.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>在Java中处理字符串时，String和StringBuffer是两个重要的类。简单来说，字符串是字符序列，例如“java”，“spring”等。</p>\\n<p>String和StringBuffer之间的主要区别在于String是不可变的，而StringBuffer是可变的并且是线程安全的。</p>\\n<p>本教程将比较String和StringBuffer类，并理解它们之间的相似之处和不同之处。</p>\\n<p>String类表示字符字符串。Java将所有字符串字面量，例如“baeldung”，实现为这个类的实例。</p>\\n<p>让我们创建一个String字面量：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>String str = \\"baeldung\\";\\n</code></pre></div>","autoDesc":true}');export{c as comp,p as data};
