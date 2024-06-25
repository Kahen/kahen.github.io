import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-DQn17T3r.js";const i={},l=n(`<h1 id="java中使用正则表达式替换字符串-后向引用与环视的比较" tabindex="-1"><a class="header-anchor" href="#java中使用正则表达式替换字符串-后向引用与环视的比较"><span>Java中使用正则表达式替换字符串：后向引用与环视的比较</span></a></h1><p>在本教程中，我们将学习如何使用String类中提供的replaceAll()方法使用正则表达式替换文本。此外，我们将学习两种方法，后向引用和环视，来执行相同的操作，然后比较它们的性能。</p><p>让我们首先描述第一种方法。</p><h3 id="_2-使用replaceall-中的后向引用" tabindex="-1"><a class="header-anchor" href="#_2-使用replaceall-中的后向引用"><span>2. 使用replaceAll()中的后向引用</span></a></h3><p>要理解后向引用，我们首先需要了解匹配组。简单来说，一个组不过是将多个字符视为一个单元。因此，后向引用是正则表达式中的一个特性，它允许我们在同一个正则表达式中引用先前匹配的组。通常，我们使用数字来表示模式中的捕获组，如\\1、\\2等。</p><p>例如，正则表达式(a)(b)\\1使用\\1来引用第一个捕获的组，在我们的例子中是(a)。</p><p>在字符串替换操作中，我们使用这些引用将匹配的文本替换为我们想要的文本。<strong>当使用replaceAll()方法时，我们在替换字符串中引用捕获组为$1、$2等。</strong></p><p>现在，为了更好地理解，让我们考虑以下用例。我们想要删除字符串中的所有星号符号。因此，任务是仅在字符串的开头或结尾保留星号，同时删除所有其他星号。例如，<em>text</em>保持不变，而<em><strong>te</strong>x</em><em>t</em><em><em>变为</em>text</em>。</p><h3 id="_2-1-实现后向引用" tabindex="-1"><a class="header-anchor" href="#_2-1-实现后向引用"><span>2.1 实现后向引用</span></a></h3><p>为了完成我们的任务，我们将使用replaceAll()方法与正则表达式，并在其中使用后向引用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String str = &quot;*te*xt**&quot;;
String replaced = str.replaceAll(&quot;(\\\\*)|(\\\\*$)|\\\\*&quot;, &quot;$1$2&quot;);
assertEquals(&quot;*text*&quot;, replaced);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面，我们定义了正则表达式“(\\<em>)|(\\</em>$)|\\<em>”，它由三部分组成。第一组(\\</em>)捕获字符串开头的星号。第二组(\\*$)捕获字符串结尾的星号。第三组\\*捕获所有其余的星号。因此，正则表达式只选择字符串的某些部分，只有这些被选择的部分将被替换。我们用不同的颜色突出显示不同的部分：</p><p>简而言之，替换字符串$1$2返回该组中选择的所有字符，以便它们保留在最终字符串中。</p><p>让我们看看解决相同任务的不同方法。</p><h3 id="_3-使用replaceall-中的环视" tabindex="-1"><a class="header-anchor" href="#_3-使用replaceall-中的环视"><span>3. 使用replaceAll()中的环视</span></a></h3><p>后向引用的替代方法是使用环视，它允许我们在进行正则表达式匹配时忽略周围的字符。在我们的示例中，我们可以更直观地删除字符串中的星号：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String str = &quot;*te*xt**&quot;;
String replacedUsingLookaround = str.replaceAll(&quot;(?\\&lt;!^)\\\\*+(?!$)&quot;, &quot;&quot;);
assertEquals(&quot;*text*&quot;, replacedUsingLookaround);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，(?&lt;!<sup>)\\*+捕获一个或多个星号(\\*+)，这些星号前面没有字符串的开头((?&lt;!</sup>))。简而言之，我们正在进行一个负向环视。接下来，(?!$)部分是一个负向环视，我们定义它来忽略后面是字符串结尾的星号。最后，空的替换字符串在这里删除所有匹配的字符。因此，这种方法更容易理解，因为我们选择所有我们想要删除的字符：</p><p>除了可读性之外，这两种方法在性能上也有所不同。让我们接下来检查它们。</p><h3 id="_4-性能比较-环视与后向引用" tabindex="-1"><a class="header-anchor" href="#_4-性能比较-环视与后向引用"><span>4. 性能比较：环视与后向引用</span></a></h3><p>为了比较这两种方法的性能，我们将使用JMH库进行基准测试，并测量每种方法处理大量字符串替换所需的平均执行时间。</p><p>对于我们的性能测试，我们将使用前面任务中的相同星号示例。简而言之，我们将重复使用replaceAll()函数与两种正则表达式方法各1000次。</p><p>对于此测试，我们将配置2次预热迭代和5次测量迭代。此外，我们将测量完成任务所需的平均时间：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@Fork(1)
@Warmup(iterations = 2)
@Measurement(iterations = 5)
public class RegexpBenchmark {
    private static final int ITERATIONS_COUNT = 1000;

    @State(Scope.Benchmark)
    public static class BenchmarkState {
        String testString = &quot;*example*text**with*many*asterisks**&quot;.repeat(ITERATIONS_COUNT);
    }

    @Benchmark
    public void backReference(BenchmarkState state) {
        state.testString.replaceAll(&quot;(\\\\*)|(\\\\*$)|\\\\*&quot;, &quot;$1$2&quot;);
    }

    @Benchmark
    public void lookaround(BenchmarkState state) {
        state.testString.replaceAll(&quot;(?\\&lt;!^)\\\\*+(?!$)&quot;, &quot;&quot;);
    }

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder().include(RegexpBenchmark.class.getSimpleName())
          .build();

        new Runner(opt).run();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个示例的结果显示环视方法的性能更好：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Benchmark                      Mode  Cnt  Score   Error  Units
RegexpBenchmark.backReference  avgt    5  0.504 ± 0.011  ms/op
RegexpBenchmark.lookaround     avgt    5  0.315 ± 0.006  ms/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<strong>后向引用之所以更慢，是因为它需要额外的开销来单独捕获组，然后用替换字符串替换这些组</strong>。而环视，如前所述，直接选择字符并删除它们。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们看到了如何使用正则表达式中的replaceAll()方法与后向引用和环视。虽然后向引用对于重用匹配字符串的部分很有用，但由于捕获组的开销，它们可能会更慢。为了证明这一点，我们进行了基准测试来比较这两种方法。</p><p>如常，我们可以在GitHub上查看完整的代码。</p>`,30),r=[l];function s(c,d){return t(),a("div",null,r)}const u=e(i,[["render",s],["__file","Replacing Strings in Java Using Regex_ Back Reference vs. Lookaround.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/Replacing%20Strings%20in%20Java%20Using%20Regex_%20Back%20Reference%20vs.%20Lookaround.html","title":"Java中使用正则表达式替换字符串：后向引用与环视的比较","lang":"zh-CN","frontmatter":{"date":"2024-06-13T00:00:00.000Z","category":["Java","Regex"],"tag":["Java","Regex","Back Reference","Lookaround"],"description":"Java中使用正则表达式替换字符串：后向引用与环视的比较 在本教程中，我们将学习如何使用String类中提供的replaceAll()方法使用正则表达式替换文本。此外，我们将学习两种方法，后向引用和环视，来执行相同的操作，然后比较它们的性能。 让我们首先描述第一种方法。 2. 使用replaceAll()中的后向引用 要理解后向引用，我们首先需要了解匹...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Replacing%20Strings%20in%20Java%20Using%20Regex_%20Back%20Reference%20vs.%20Lookaround.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用正则表达式替换字符串：后向引用与环视的比较"}],["meta",{"property":"og:description","content":"Java中使用正则表达式替换字符串：后向引用与环视的比较 在本教程中，我们将学习如何使用String类中提供的replaceAll()方法使用正则表达式替换文本。此外，我们将学习两种方法，后向引用和环视，来执行相同的操作，然后比较它们的性能。 让我们首先描述第一种方法。 2. 使用replaceAll()中的后向引用 要理解后向引用，我们首先需要了解匹..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Regex"}],["meta",{"property":"article:tag","content":"Back Reference"}],["meta",{"property":"article:tag","content":"Lookaround"}],["meta",{"property":"article:published_time","content":"2024-06-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用正则表达式替换字符串：后向引用与环视的比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"2. 使用replaceAll()中的后向引用","slug":"_2-使用replaceall-中的后向引用","link":"#_2-使用replaceall-中的后向引用","children":[]},{"level":3,"title":"2.1 实现后向引用","slug":"_2-1-实现后向引用","link":"#_2-1-实现后向引用","children":[]},{"level":3,"title":"3. 使用replaceAll()中的环视","slug":"_3-使用replaceall-中的环视","link":"#_3-使用replaceall-中的环视","children":[]},{"level":3,"title":"4. 性能比较：环视与后向引用","slug":"_4-性能比较-环视与后向引用","link":"#_4-性能比较-环视与后向引用","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.26,"words":1278},"filePathRelative":"posts/baeldung/Archive/Replacing Strings in Java Using Regex: Back Reference vs. Lookaround.md","localizedDate":"2024年6月13日","excerpt":"\\n<p>在本教程中，我们将学习如何使用String类中提供的replaceAll()方法使用正则表达式替换文本。此外，我们将学习两种方法，后向引用和环视，来执行相同的操作，然后比较它们的性能。</p>\\n<p>让我们首先描述第一种方法。</p>\\n<h3>2. 使用replaceAll()中的后向引用</h3>\\n<p>要理解后向引用，我们首先需要了解匹配组。简单来说，一个组不过是将多个字符视为一个单元。因此，后向引用是正则表达式中的一个特性，它允许我们在同一个正则表达式中引用先前匹配的组。通常，我们使用数字来表示模式中的捕获组，如\\\\1、\\\\2等。</p>\\n<p>例如，正则表达式(a)(b)\\\\1使用\\\\1来引用第一个捕获的组，在我们的例子中是(a)。</p>","autoDesc":true}');export{u as comp,m as data};
