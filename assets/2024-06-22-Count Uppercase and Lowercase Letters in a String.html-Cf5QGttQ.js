import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-Z3ijsYrs.js";const i={},r=n(`<h1 id="在java中统计字符串中的大写和小写字母" tabindex="-1"><a class="header-anchor" href="#在java中统计字符串中的大写和小写字母"><span>在Java中统计字符串中的大写和小写字母</span></a></h1><p>当在Java中使用字符串类型时，经常需要分析其中的字符组成。一个常见的任务是计算给定字符串中的大写字母和小写字母的数量。</p><p>在本教程中，我们将探索使用Java实现这一任务的几种简单实用的方法。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>在深入代码之前，我们首先明确手头的问题。我们想要创建一个Java方法，它接受一个字符串作为输入，并同时计算大写字母和小写字母的数量。换句话说，<strong>解决方案将产生包含两个计数器的结果</strong>。</p><p>例如，我们将以下面的字符串作为输入：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static final String MY_STRING = &quot;Hi, Welcome to Baeldung! Let&#39;s count letters!&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>大写字母是&#39;A&#39;到&#39;Z&#39;的字符，小写字母是&#39;a&#39;到&#39;z&#39;的字符。也就是说，示例字符串中的<strong>特殊字符如‘,’和‘!’既不被视为大写字母也不被视为小写字母</strong>。</p><p>观察示例，我们在_MY_STRING_中有四个大写字母和31个小写字母。</p><p>由于我们将同时计算两个计数器，让我们创建一个简单的结果类来携带这两个计数器，这样我们可以更容易地验证结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class LetterCount {
    private int uppercaseCount;
    private int lowercaseCount;

    private LetterCount(int uppercaseCount, int lowercaseCount) {
        this.uppercaseCount = uppercaseCount;
        this.lowercaseCount = lowercaseCount;
    }

    public int getUppercaseCount() {
        return uppercaseCount;
    }

    public int getLowercaseCount() {
        return lowercaseCount;
    }
    // ...计数解决方案稍后添加...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>稍后，我们将把计数解决方案作为静态方法添加到这个类中。</p><p>所以，如果一个方法正确地计算了字母，它应该产生一个_LetterCount_对象，其中_uppercaseCount = 4_和_lowercaseCount = 31_。</p><p>接下来，让我们计算字母。</p><h2 id="_3-使用字符范围" tabindex="-1"><a class="header-anchor" href="#_3-使用字符范围"><span>3. 使用字符范围</span></a></h2><p>要解决这个问题，我们将<strong>遍历给定字符串中的每个字符，并通过检查它是否落在相应的字符范围内来确定它是大写字母还是小写字母</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static LetterCount countByCharacterRange(String input) {
    int upperCount = 0;
    int lowerCount = 0;
    for (char c : input.toCharArray()) {
        if (c &gt;= &#39;A&#39; &amp;&amp; c \`&lt;= &#39;Z&#39;) {
            upperCount++;
        }
        if (c &gt;\`= &#39;a&#39; &amp;&amp; c &lt;= &#39;z&#39;) {
            lowerCount++;
        }
    }
    return new LetterCount(upperCount, lowerCount);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上述代码所示，我们<strong>为大写字母和小写字母维护单独的计数器，并在迭代过程中相应地增加它们</strong>。在遍历输入字符串之后，我们使用这两个计数器创建_LetterCount_对象，并将其作为结果返回：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LetterCount result = LetterCount.countByCharacterRange(MY_STRING);
assertEquals(4, result.getUppercaseCount());
assertEquals(31, result.getLowercaseCount());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，<strong>这种方法仅适用于由ASCII字符组成的字符串输入</strong>。</p><h2 id="_4-使用-character-类的-isuppercase-和-islowercase-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-character-类的-isuppercase-和-islowercase-方法"><span>4. 使用_Character_类的_isUpperCase()_和_isLowerCase()_方法</span></a></h2><p>在之前的解决方案中，我们通过检查字符的范围来确定它是否是大写或小写字母。实际上，<strong>_Character_类为此检查提供了_isUpperCase()_和_isLowerCase()_方法</strong>。</p><p>重要的是要强调，<strong>_isUpperCase()_和_isLowerCase()_也适用于Unicode字符</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertTrue(Character.isLowerCase(&#39;ä&#39;));
assertTrue(Character.isUpperCase(&#39;Ä&#39;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们用_Character_类的案例检查方法替换范围检查：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static LetterCount countByCharacterIsUpperLower(String input) {
    int upperCount = 0;
    int lowerCount = 0;
    for (char c : input.toCharArray()) {
        if (Character.isUpperCase(c)) {
            upperCount++;
        }
        if (Character.isLowerCase(c)) {
            lowerCount++;
        }
    }
    return new LetterCount(upperCount, lowerCount);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这两个案例检查方法使代码更容易理解，并且它们产生了预期的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LetterCount result = LetterCount.countByCharacterIsUpperLower(MY_STRING);
assertEquals(4, result.getUppercaseCount());
assertEquals(31, result.getLowercaseCount());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用stream-api的-filter-和-count-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用stream-api的-filter-和-count-方法"><span>5. 使用Stream API的_filter()_和_count()_方法</span></a></h2><p>Stream API是在Java 8中引入的一个显著特性。</p><p>接下来，让我们<strong>使用Stream API中的_filter()_和_count()_来解决这个问题</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static LetterCount countByStreamAPI(String input) {
    return new LetterCount(
        (int) input.chars().filter(Character::isUpperCase).count(),
        (int) input.chars().filter(Character::isLowerCase).count()
    );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于**_count()_方法返回一个_long_值**，我们必须将其转换为_int_以实例化_LetterCount_对象。</p><p>乍一看，这种解决方案看起来简单明了，比基于循环的其他方法更加紧凑。然而，值得注意的是，<strong>这种方法会两次遍历输入字符串中的字符</strong>。</p><p>最后，让我们编写一个测试来验证这种方法是否产生了预期的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LetterCount result = LetterCount.countByStreamAPI(MY_STRING);
assertEquals(4, result.getUppercaseCount());
assertEquals(31, result.getLowercaseCount());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了在给定字符串中计算大写字母和小写字母的不同方法。</p><p>这些简单而有效的方法为现实世界工作中更复杂的字符串分析任务提供了基础。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,40),s=[r];function l(c,d){return a(),t("div",null,s)}const p=e(i,[["render",l],["__file","2024-06-22-Count Uppercase and Lowercase Letters in a String.html.vue"]]),v=JSON.parse(`{"path":"/posts/baeldung/2024-06-22/2024-06-22-Count%20Uppercase%20and%20Lowercase%20Letters%20in%20a%20String.html","title":"在Java中统计字符串中的大写和小写字母","lang":"zh-CN","frontmatter":{"category":["Java","String Manipulation"],"tag":["uppercase","lowercase","count"],"head":[["meta",{"name":"keywords","content":"Java, String, uppercase, lowercase, count"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Count%20Uppercase%20and%20Lowercase%20Letters%20in%20a%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中统计字符串中的大写和小写字母"}],["meta",{"property":"og:description","content":"在Java中统计字符串中的大写和小写字母 当在Java中使用字符串类型时，经常需要分析其中的字符组成。一个常见的任务是计算给定字符串中的大写字母和小写字母的数量。 在本教程中，我们将探索使用Java实现这一任务的几种简单实用的方法。 2. 问题介绍 在深入代码之前，我们首先明确手头的问题。我们想要创建一个Java方法，它接受一个字符串作为输入，并同时计..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T11:49:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"uppercase"}],["meta",{"property":"article:tag","content":"lowercase"}],["meta",{"property":"article:tag","content":"count"}],["meta",{"property":"article:modified_time","content":"2024-06-22T11:49:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中统计字符串中的大写和小写字母\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-22T11:49:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中统计字符串中的大写和小写字母 当在Java中使用字符串类型时，经常需要分析其中的字符组成。一个常见的任务是计算给定字符串中的大写字母和小写字母的数量。 在本教程中，我们将探索使用Java实现这一任务的几种简单实用的方法。 2. 问题介绍 在深入代码之前，我们首先明确手头的问题。我们想要创建一个Java方法，它接受一个字符串作为输入，并同时计..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用字符范围","slug":"_3-使用字符范围","link":"#_3-使用字符范围","children":[]},{"level":2,"title":"4. 使用_Character_类的_isUpperCase()_和_isLowerCase()_方法","slug":"_4-使用-character-类的-isuppercase-和-islowercase-方法","link":"#_4-使用-character-类的-isuppercase-和-islowercase-方法","children":[]},{"level":2,"title":"5. 使用Stream API的_filter()_和_count()_方法","slug":"_5-使用stream-api的-filter-和-count-方法","link":"#_5-使用stream-api的-filter-和-count-方法","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719056965000,"updatedTime":1719056965000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.83,"words":1150},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Count Uppercase and Lowercase Letters in a String.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>当在Java中使用字符串类型时，经常需要分析其中的字符组成。一个常见的任务是计算给定字符串中的大写字母和小写字母的数量。</p>\\n<p>在本教程中，我们将探索使用Java实现这一任务的几种简单实用的方法。</p>\\n<h2>2. 问题介绍</h2>\\n<p>在深入代码之前，我们首先明确手头的问题。我们想要创建一个Java方法，它接受一个字符串作为输入，并同时计算大写字母和小写字母的数量。换句话说，<strong>解决方案将产生包含两个计数器的结果</strong>。</p>\\n<p>例如，我们将以下面的字符串作为输入：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>static final String MY_STRING = \\"Hi, Welcome to Baeldung! Let's count letters!\\";\\n</code></pre></div>","autoDesc":true}`);export{p as comp,v as data};
