import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-BLKtMjC0.js";const a={},l=n(`<h1 id="java中将用文字表达的电话号码转换为数字" tabindex="-1"><a class="header-anchor" href="#java中将用文字表达的电话号码转换为数字"><span>Java中将用文字表达的电话号码转换为数字</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>我们可能需要处理以文本形式表达的电话号码。也许我们通过语音转文字接口接收到了一个电话号码。</p><p>在本教程中，我们将研究一个算法，该算法处理一系列表达数字序列的单词，并将它们转换为一串数字。</p><h2 id="_2-问题陈述介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述介绍"><span>2. 问题陈述介绍</span></a></h2><p>让我们更深入地看看输入的格式。我们将得到一个用单词表达的电话号码，例如“five six eight”。然而，口语数字通常包括乘数，例如“double two”。</p><p>因此，我们期望我们的算法能够转换：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>输入：&quot;triple five two three six eight&quot;
预期输出：&quot;5552368&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-switch-语句实现算法" tabindex="-1"><a class="header-anchor" href="#_3-使用-switch-语句实现算法"><span>3. 使用_switch_语句实现算法</span></a></h2><p>算法将输入分割成单词，并处理每个单词以构建输出。我们可以使用_switch_语句对单词进行分类。</p><h3 id="_3-1-将字符串分割成单词数组" tabindex="-1"><a class="header-anchor" href="#_3-1-将字符串分割成单词数组"><span>3.1. 将字符串分割成单词数组</span></a></h3><p>首先，我们需要使用_String.__split()_方法，使用空格作为分隔符，将_phoneNumberInWords_字符串分割成一个单词数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String[] words = phoneNumberInWords.split(&quot; &quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，我们可以使用_for-each_循环遍历_words_数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (String word : words) {
    // 语句
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-处理乘数" tabindex="-1"><a class="header-anchor" href="#_3-2-处理乘数"><span>3.2. 处理乘数</span></a></h3><p>在_for-each_循环的每次迭代中，我们将检查当前单词是否表示一个乘数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Integer multiplier = getWordAsMultiplier(word);
if (multiplier != null) {
    if (currentMultiplier != null) {
        throw new IllegalArgumentException(&quot;不能有连续的乘数，在：&quot; + word);
    }
    currentMultiplier = multiplier;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过将当前单词作为参数调用_getWordAsMultiplier()_方法。此方法将当前单词映射到其对应的数字表示，并返回它。</p><p>如果返回值不是_null_，表示当前单词确实是一个乘数，我们检查是否已经有设置的乘数。如果有，我们抛出一个_IllegalArgumentException_，因为<strong>不允许连续的乘数</strong>。否则，我们设置当前乘数。</p><p>为了识别一个单词是否是乘数，我们在_getWordAsMultiplier()_内部使用_switch_语句：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static Integer getWordAsMultiplier(String word) {
    switch (word) {
        case &quot;double&quot;:
            return 2;
        case &quot;triple&quot;:
            return 3;
        case &quot;quadruple&quot;:
            return 4;
        default:
            return null;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果当前单词不是乘数，那么这个方法将返回_null_。</p><h3 id="_3-3-处理非乘数单词" tabindex="-1"><a class="header-anchor" href="#_3-3-处理非乘数单词"><span>3.3. 处理非乘数单词</span></a></h3><p>如果当前单词不是乘数单词，我们调用_getWordAsDigit()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static String getWordAsDigit(String word) {
    switch (word) {
        case &quot;zero&quot;:
            return &quot;0&quot;;
        case &quot;one&quot;:
            return &quot;1&quot;;
        ...
        ...
        ...
        case &quot;nine&quot;:
            return &quot;9&quot;;
        default:
            throw new IllegalArgumentException(&quot;无效的单词：&quot; + word);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将在我们检查乘数单词的_if_语句的_else_中被调用。由于一个单词必须是乘数或数字，如果用一个非数字的单词调用它，这个函数该抛出异常。在这里，我们使用了_IllegalArgumentException_。</p><h3 id="_3-4-组装数字" tabindex="-1"><a class="header-anchor" href="#_3-4-组装数字"><span>3.4. 组装数字</span></a></h3><p>让我们使用getWordAsDigit()方法。在处理乘数的代码中，我们已经捕获了数字的任何重复，所以现在我们要找到当前的数字，并根据当前的乘数将其添加到输出中。</p><p>我们将使用一个名为_output_的_StringBuilder_对象来存储我们的结果。</p><p>我们使用_append()_方法来组装输出。<strong>然而，_String.repeat()_方法跟踪乘数。我们根据当前乘数重复当前单词的数字表示</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>if (multiplier != null) {
    // 乘数处理
} else {
    output.append(getWordAsDigit(word)
      .repeat(currentMultiplier != null ? currentMultiplier : 1));
    currentMultiplier = null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_StringBuilder.append()_来添加下一组数字到输出。</p><p>如果当前乘数不是_null_，我们使用它来提供下一个数字的副本，使用_String.repeat()_，默认在没有乘数时重复1次。</p><p>在循环结束时，_output_对象包含了我们的电话号码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>return output.toString();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-5-测试解决方案" tabindex="-1"><a class="header-anchor" href="#_3-5-测试解决方案"><span>3.5. 测试解决方案</span></a></h3><p>让我们看看当给出正确的电话号码、无效的单词或连续的乘数时会发生什么：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(&quot;5248888&quot;,
  UseSwitchToConvertPhoneNumberInWordToNumber
    .convertPhoneNumberInWordToNumber(&quot;five two four quadruple eight&quot;));

assertThrows(IllegalArgumentException.class, () -&gt; {
    UseSwitchToConvertPhoneNumberInWordToNumber
      .convertPhoneNumberInWordToNumber(&quot;five eight invalid two four null eight&quot;);
});

assertThrows(IllegalArgumentException.class, () -&gt; {
    UseSwitchToConvertPhoneNumberInWordToNumber
      .convertPhoneNumberInWordToNumber(&quot;five eight three double triple&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-map-代替-switch" tabindex="-1"><a class="header-anchor" href="#_4-使用-map-代替-switch"><span>4. 使用_Map_代替_switch_</span></a></h2><p>我们的算法运行良好，但_switch_语句可能有点冗长。我们可以用_Map_对象来替换它们。</p><p>_Map.of()<em>方法创建了一个包含提供的关键值对的不可变_Map</em>。<strong>在这一部分，我们将使用_Map.of()_方法来映射乘数（&quot;double&quot; 到 2）和数字（&quot;two&quot; 到 &quot;2&quot;）。</strong></p><h3 id="_4-1-映射数字和乘数" tabindex="-1"><a class="header-anchor" href="#_4-1-映射数字和乘数"><span>4.1. 映射数字和乘数</span></a></h3><p>让我们初始化_Map_来创建个别数字的映射：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static Map\`&lt;String, Integer&gt;\` multipliers
  = Map.of(&quot;double&quot;, 2, &quot;triple&quot;, 3, &quot;quadruple&quot;, 4);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们初始化另一个_Map_来映射数字：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static Map\`&lt;String, String&gt;\` digits
  = Map.of(&quot;zero&quot;, &quot;0&quot;, &quot;one&quot;, &quot;1&quot;, &quot;two&quot;, &quot;2&quot;, &quot;three&quot;, &quot;3&quot;,
    &quot;four&quot;, &quot;4&quot;, &quot;five&quot;, &quot;5&quot;, &quot;six&quot;, &quot;6&quot;, &quot;seven&quot;, &quot;7&quot;, &quot;eight&quot;, &quot;8&quot;, &quot;nine&quot;, &quot;9&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将它们初始化为不可变的，因为如果_Map_在运行时可以改变，算法将停止工作。</p><h3 id="_4-2-检查乘数" tabindex="-1"><a class="header-anchor" href="#_4-2-检查乘数"><span>4.2. 检查乘数</span></a></h3><p>和以前一样，在循环内，我们想要找到一个乘数或null。我们可以使用_multipliers_上的_get()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Integer multiplier = multipliers.get(word);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-检查数字" tabindex="-1"><a class="header-anchor" href="#_4-3-检查数字"><span>4.3. 检查数字</span></a></h3><p>为了复制异常，当一个单词不是数字时，我们需要在对_digits_的_get()_之后的_if_语句：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String digit = digits.get(word);

if (digit == null) {
    throw new IllegalArgumentException(&quot;无效的单词：&quot; + word);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-测试解决方案" tabindex="-1"><a class="header-anchor" href="#_4-4-测试解决方案"><span>4.4. 测试解决方案</span></a></h3><p>我们可以对这种解决方案运行相同的测试，例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>assertEquals(&quot;5248888&quot;,
  UseHashMapToConvertPhoneNumberInWordsToNumber
    .convertPhoneNumberInWordToNumber(&quot;five two four quadruple eight&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们研究了一个处理电话号码的算法。</p><p>我们使用_switch_语句实现了基本算法。然后，我们使用Java _Map_优化了实现。</p><p>和往常一样，示例代码在GitHub上。</p><p>发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,62),r=[l];function s(d,u){return i(),t("div",null,r)}const v=e(a,[["render",s],["__file","2024-06-19-Convert a Phone Number in Words to Number with Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Convert%20a%20Phone%20Number%20in%20Words%20to%20Number%20with%20Java.html","title":"Java中将用文字表达的电话号码转换为数字","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Algorithm","Phone Number Conversion"],"head":[["meta",{"name":"keywords","content":"Java, Programming, Algorithm, Phone Number Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Convert%20a%20Phone%20Number%20in%20Words%20to%20Number%20with%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将用文字表达的电话号码转换为数字"}],["meta",{"property":"og:description","content":"Java中将用文字表达的电话号码转换为数字 1. 概述 我们可能需要处理以文本形式表达的电话号码。也许我们通过语音转文字接口接收到了一个电话号码。 在本教程中，我们将研究一个算法，该算法处理一系列表达数字序列的单词，并将它们转换为一串数字。 2. 问题陈述介绍 让我们更深入地看看输入的格式。我们将得到一个用单词表达的电话号码，例如“five six e..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Algorithm"}],["meta",{"property":"article:tag","content":"Phone Number Conversion"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将用文字表达的电话号码转换为数字\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将用文字表达的电话号码转换为数字 1. 概述 我们可能需要处理以文本形式表达的电话号码。也许我们通过语音转文字接口接收到了一个电话号码。 在本教程中，我们将研究一个算法，该算法处理一系列表达数字序列的单词，并将它们转换为一串数字。 2. 问题陈述介绍 让我们更深入地看看输入的格式。我们将得到一个用单词表达的电话号码，例如“five six e..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 问题陈述介绍","slug":"_2-问题陈述介绍","link":"#_2-问题陈述介绍","children":[]},{"level":2,"title":"3. 使用_switch_语句实现算法","slug":"_3-使用-switch-语句实现算法","link":"#_3-使用-switch-语句实现算法","children":[{"level":3,"title":"3.1. 将字符串分割成单词数组","slug":"_3-1-将字符串分割成单词数组","link":"#_3-1-将字符串分割成单词数组","children":[]},{"level":3,"title":"3.2. 处理乘数","slug":"_3-2-处理乘数","link":"#_3-2-处理乘数","children":[]},{"level":3,"title":"3.3. 处理非乘数单词","slug":"_3-3-处理非乘数单词","link":"#_3-3-处理非乘数单词","children":[]},{"level":3,"title":"3.4. 组装数字","slug":"_3-4-组装数字","link":"#_3-4-组装数字","children":[]},{"level":3,"title":"3.5. 测试解决方案","slug":"_3-5-测试解决方案","link":"#_3-5-测试解决方案","children":[]}]},{"level":2,"title":"4. 使用_Map_代替_switch_","slug":"_4-使用-map-代替-switch","link":"#_4-使用-map-代替-switch","children":[{"level":3,"title":"4.1. 映射数字和乘数","slug":"_4-1-映射数字和乘数","link":"#_4-1-映射数字和乘数","children":[]},{"level":3,"title":"4.2. 检查乘数","slug":"_4-2-检查乘数","link":"#_4-2-检查乘数","children":[]},{"level":3,"title":"4.3. 检查数字","slug":"_4-3-检查数字","link":"#_4-3-检查数字","children":[]},{"level":3,"title":"4.4. 测试解决方案","slug":"_4-4-测试解决方案","link":"#_4-4-测试解决方案","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.77,"words":1430},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Convert a Phone Number in Words to Number with Java.md","localizedDate":"2024年6月19日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>我们可能需要处理以文本形式表达的电话号码。也许我们通过语音转文字接口接收到了一个电话号码。</p>\\n<p>在本教程中，我们将研究一个算法，该算法处理一系列表达数字序列的单词，并将它们转换为一串数字。</p>\\n<h2>2. 问题陈述介绍</h2>\\n<p>让我们更深入地看看输入的格式。我们将得到一个用单词表达的电话号码，例如“five six eight”。然而，口语数字通常包括乘数，例如“double two”。</p>\\n<p>因此，我们期望我们的算法能够转换：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>输入：\\"triple five two three six eight\\"\\n预期输出：\\"5552368\\"\\n</code></pre></div>","autoDesc":true}');export{v as comp,p as data};
