import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as t}from"./app-D5kFWV-m.js";const s={},r=t(`<h1 id="解决-java-整数数字太大-错误" tabindex="-1"><a class="header-anchor" href="#解决-java-整数数字太大-错误"><span>解决“java: 整数数字太大”错误</span></a></h1><p>Java使用32位内存来存储_Integer_。因此，<em>Integer</em>（或_int_）的范围是从-231（-2,147,483,648）到231-1（2,147,483,647）。因此，当我们看到像“<em>java: integer number too large …</em>”这样的错误消息时，我们通常可以很容易地找到问题并修复它。</p><p>然而，在某些情况下，当我们看到这个错误消息时，我们可能不明白为什么会出现这个错误。而且，解决这个问题可能需要一些时间。</p><p>所以，在本教程中，<strong>我们将更仔细地看看导致这个错误的几个陷阱，并解决错误背后的原因。</strong></p><h2 id="_2-整数字面量陷阱-1" tabindex="-1"><a class="header-anchor" href="#_2-整数字面量陷阱-1"><span>2. 整数字面量陷阱 #1</span></a></h2><p>当Java编译器在我们为_int_变量分配一个超出上述整数范围的字面量数字时会发出抱怨。例如，假设我们编译这个赋值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">12345678912345</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译器报告这个错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>java<span class="token operator">:</span> integer number too large
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过阅读错误消息快速找到问题。我们可能认为_int_不是这样一个大数字的正确类型，所以我们将类型更改为_long_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> a <span class="token operator">=</span> <span class="token number">12345678912345</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，当我们重新编译代码时，我们得到相同的编译错误：“<em>integer number too large</em>”。我们会想知道为什么编译器仍然抱怨整数，尽管我们声明了变量为_long_？接下来，我们可能会花一些时间检查我们是否正确保存了文件或重新启动了IDE等等。然而，问题仍然存在。</p><p>当我们在Java中写入数字字面量时，无论它是否在整数范围内，Java都将其视为_Integer/int_类型。如果**我们想要一个整数字面量是_long_，我们必须在字面量数字后添加‘<em>L</em>‘或‘<em>l</em>‘后缀。**这也是在Java语言规范中明确说明的：</p><blockquote><p>一个整数字面量如果带有ASCII字母_L_或_l_（ell）的后缀，则是_long_类型；否则它是_int_类型。</p></blockquote><p>因此，为了解决这个问题，我们应该在字面量数字后加上一个‘<em>L</em>‘：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> a <span class="token operator">=</span> <span class="token number">12345678912345L</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值得一提的是<strong>当我们使用没有后缀的小数字面量时，Java将它们视为_double_。如果我们想要它们是_float_，我们必须添加一个‘<em>F</em>‘或‘<em>f</em>‘后缀：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">float</span> a <span class="token operator">=</span> <span class="token number">1024.42</span><span class="token punctuation">;</span> <span class="token comment">// 编译器错误 -  java: incompatible types: possible lossy conversion from double to float</span>
<span class="token keyword">float</span> a <span class="token operator">=</span> <span class="token number">1024.42F</span><span class="token punctuation">;</span> <span class="token comment">// 编译通过</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-整数字面量陷阱-2" tabindex="-1"><a class="header-anchor" href="#_3-整数字面量陷阱-2"><span>3. 整数字面量陷阱 #2</span></a></h2><p>现在我们知道应该为_long_类型添加‘<em>L</em>‘后缀。接下来，让我们看另一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> a <span class="token operator">=</span> <span class="token number">007L</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如上面的代码所示，这次我们有了后缀‘<em>L</em>‘，并且_a_的类型是_long_。即使有前导零，代码也能顺利编译。如果我们检查_a_的值，变量_a_持有7，正如预期的那样。所以，我们可能认为Java非常聪明，它忽略了数字的前导零。</p><p>现在，让我们声明另一个变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> b <span class="token operator">=</span> <span class="token number">008L</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再次，如果我们编译代码，编译器报告“<em>integer number too large</em>”。这次，我们的代码中没有整数的迹象。此外，_long a = 007L;_没有问题地工作。为什么_long b = 008L_失败了？解决这个问题可能需要一些时间。</p><p>实际上，我们陷入了另一个整数字面量的陷阱。这是因为，在Java中，<strong>一个整数字面量也可以以八进制（基数8）表示</strong>。进一步，<strong>一个八进制整数由一个前导零后面跟着一个或多个0到7的数字组成</strong>。</p><p>因此，当我们将‘<em>007L</em>‘赋值给一个变量时，一切都很好。这是因为Java读取八进制整数字面量‘<em>007</em>’，并将其视为_long_。然而，当我们将‘<em>008L</em>‘赋值给一个变量时，008不是一个有效的八进制整数。因此，编译器报告了那个错误。</p><p>在我们理解了问题的原因之后，修复方法非常简单——去掉前导零：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">long</span> b <span class="token operator">=</span> <span class="token number">8L</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了在Java中使用整数字面量时遇到的两个常见陷阱。</p><p>理解编译错误的原因是帮助我们快速找到并解决问题的关键。</p>`,32),o=[r];function l(p,i){return n(),e("div",null,o)}const m=a(s,[["render",l],["__file","2024-07-13-Fixing the  java  integer number too large  Error.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Fixing%20the%20%20java%20%20integer%20number%20too%20large%20%20Error.html","title":"解决“java: 整数数字太大”错误","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Java","Error"],"head":[["meta",{"name":"keywords","content":"Java, Integer, Error, Compilation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Fixing%20the%20%20java%20%20integer%20number%20too%20large%20%20Error.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决“java: 整数数字太大”错误"}],["meta",{"property":"og:description","content":"解决“java: 整数数字太大”错误 Java使用32位内存来存储_Integer_。因此，Integer（或_int_）的范围是从-231（-2,147,483,648）到231-1（2,147,483,647）。因此，当我们看到像“java: integer number too large …”这样的错误消息时，我们通常可以很容易地找到问题并修复..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T06:46:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Error"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T06:46:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决“java: 整数数字太大”错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T06:46:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决“java: 整数数字太大”错误 Java使用32位内存来存储_Integer_。因此，Integer（或_int_）的范围是从-231（-2,147,483,648）到231-1（2,147,483,647）。因此，当我们看到像“java: integer number too large …”这样的错误消息时，我们通常可以很容易地找到问题并修复..."},"headers":[{"level":2,"title":"2. 整数字面量陷阱 #1","slug":"_2-整数字面量陷阱-1","link":"#_2-整数字面量陷阱-1","children":[]},{"level":2,"title":"3. 整数字面量陷阱 #2","slug":"_3-整数字面量陷阱-2","link":"#_3-整数字面量陷阱-2","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720853211000,"updatedTime":1720853211000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.69,"words":1107},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Fixing the  java  integer number too large  Error.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java使用32位内存来存储_Integer_。因此，<em>Integer</em>（或_int_）的范围是从-231（-2,147,483,648）到231-1（2,147,483,647）。因此，当我们看到像“<em>java: integer number too large …</em>”这样的错误消息时，我们通常可以很容易地找到问题并修复它。</p>\\n<p>然而，在某些情况下，当我们看到这个错误消息时，我们可能不明白为什么会出现这个错误。而且，解决这个问题可能需要一些时间。</p>\\n<p>所以，在本教程中，<strong>我们将更仔细地看看导致这个错误的几个陷阱，并解决错误背后的原因。</strong></p>","autoDesc":true}');export{m as comp,v as data};
