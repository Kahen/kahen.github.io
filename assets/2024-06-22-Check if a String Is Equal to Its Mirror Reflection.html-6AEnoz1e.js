import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BX3-P94R.js";const e={},p=t(`<h1 id="检查字符串是否等于其镜像反射" tabindex="-1"><a class="header-anchor" href="#检查字符串是否等于其镜像反射"><span>检查字符串是否等于其镜像反射</span></a></h1><p>当我们在Java中工作时，字符串操作和比较是日常任务。</p><p>在这个快速教程中，我们将深入探讨一个有趣的问题：检查字符串是否等于其镜像反射。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>一个常见的误解是，获取字符串的镜像反射仅仅涉及反转其顺序。以字符串“ALL”为例。直观上，人们可能会期望它的镜像反射是“LLA”。然而，通过实际使用镜子仔细检查，我们发现“LLA”并不符合“ALL”的镜像版本。</p><p>关键的误解在于，字符串中的<strong>每个单独字符在其镜像反射中都会发生反转</strong>。因此，“ALL”的镜像反射实际上看起来像“⅃⅃A”。</p><p>字符可以根据其反转行为被归类为对称或不对称。<strong>对称字符是指在反转时保持不变的字符</strong>，例如‘A’、‘O’、‘o’、‘V’、‘v’、‘M’、‘8’、‘+’、‘-’等。相反，不对称字符与其反转形式不同，例如‘L’、‘S’、‘p’、‘h’、‘/’、‘3’等。</p><p>所以，当我们说一个字符串等于其镜像反射时，它有两个要求：</p><ul><li><strong>字符串只包含对称字符</strong>。</li><li>给定的字符串必须等于其反转值。换句话说，<strong>字符串必须是回文</strong>，例如“MUM”。</li></ul><p>为了简单起见，<strong>我们将只检查由大写英文字母组成的字符串值作为本教程的示例</strong>。然后，这些是我们需要检查的对称大写字符：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">Set</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token constant">SYMMETRIC_LETTERS</span> <span class="token operator">=</span> <span class="token class-name">Set</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token char">&#39;A&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;H&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;I&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;M&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;O&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;T&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;U&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;V&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;W&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;X&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们探讨如何执行字符串镜像反射检查。</p><h2 id="_3-解决问题的想法-结合两次检查" tabindex="-1"><a class="header-anchor" href="#_3-解决问题的想法-结合两次检查"><span>3. 解决问题的想法：结合两次检查</span></a></h2><p>既然我们理解了问题的两个要求，一个直接的想法是创建一个方法来<strong>结合对称字符检查和回文字符串检查</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isMirrorImageEqual</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">containsOnlySymmetricLetters</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isPalindrome</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们一步步解决这个问题。</p><h2 id="_4-实现containsonlysymmetricletters-方法" tabindex="-1"><a class="header-anchor" href="#_4-实现containsonlysymmetricletters-方法"><span>4. 实现containsOnlySymmetricLetters()方法</span></a></h2><p>由于我们在Set中定义了对称字母，我们需要检查<strong>SYMMETRIC_LETTERS是否包含给定字符串中的每个字符</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">containsOnlySymmetricLetters</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">&gt;</span></span>\`\`\` characterSet <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> c<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    characterSet<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span><span class="token constant">SYMMETRIC_LETTERS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> characterSet<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们通过三个步骤执行此检查：</p><ul><li>将输入字符串转换为名为characterSet的Set<code>&lt;Character&gt;</code></li><li>从characterSet中移除所有所需的对称字母</li><li>检查移除后characterSet是否为空</li><li>如果集合为空，则意味着它只包含对称字符</li></ul><p>接下来，让我们实现isPalindrome()方法。</p><h2 id="_5-实现ispalindrome-方法" tabindex="-1"><a class="header-anchor" href="#_5-实现ispalindrome-方法"><span>5. 实现isPalindrome()方法</span></a></h2><p>在Java中检查一个字符串是否是回文有多种方法。让我们采用一个直接的解决方案来完成这项工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isPalindrome</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> reversed <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> input<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>reversed<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，<strong>我们通过检查输入字符串和反转后的输入是否相等来确定输入是否是回文</strong>。</p><h2 id="_6-测试解决方案" tabindex="-1"><a class="header-anchor" href="#_6-测试解决方案"><span>6. 测试解决方案</span></a></h2><p>现在，isMirrorImageEqual()的两个构建块都已就位。最后，让我们创建一个测试来验证这个方法是否解决了我们的问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">isMirrorImageEqual</span><span class="token punctuation">(</span><span class="token string">&quot;LOL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">isMirrorImageEqual</span><span class="token punctuation">(</span><span class="token string">&quot;AXY&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token function">isMirrorImageEqual</span><span class="token punctuation">(</span><span class="token string">&quot;HUHU&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isMirrorImageEqual</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isMirrorImageEqual</span><span class="token punctuation">(</span><span class="token string">&quot;AAA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isMirrorImageEqual</span><span class="token punctuation">(</span><span class="token string">&quot;HUH&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isMirrorImageEqual</span><span class="token punctuation">(</span><span class="token string">&quot;HIMMIH&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">isMirrorImageEqual</span><span class="token punctuation">(</span><span class="token string">&quot;HIMIH&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，我们用各种输入字符串值测试了这个方法，我们的解决方案按预期工作。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们首先讨论了字符串镜像反射的特点。然后，我们探索了一个解决方案，以检查给定的字符串及其镜像反射是否相等。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,33),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-22-Check if a String Is Equal to Its Mirror Reflection.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Check%20if%20a%20String%20Is%20Equal%20to%20Its%20Mirror%20Reflection.html","title":"检查字符串是否等于其镜像反射","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","字符串"],"tag":["字符串反转","镜像测试"],"head":[["meta",{"name":"keywords","content":"Java, 字符串, 镜像测试, 反转"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Check%20if%20a%20String%20Is%20Equal%20to%20Its%20Mirror%20Reflection.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"检查字符串是否等于其镜像反射"}],["meta",{"property":"og:description","content":"检查字符串是否等于其镜像反射 当我们在Java中工作时，字符串操作和比较是日常任务。 在这个快速教程中，我们将深入探讨一个有趣的问题：检查字符串是否等于其镜像反射。 2. 问题介绍 一个常见的误解是，获取字符串的镜像反射仅仅涉及反转其顺序。以字符串“ALL”为例。直观上，人们可能会期望它的镜像反射是“LLA”。然而，通过实际使用镜子仔细检查，我们发现“..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T05:31:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"字符串反转"}],["meta",{"property":"article:tag","content":"镜像测试"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T05:31:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"检查字符串是否等于其镜像反射\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T05:31:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"检查字符串是否等于其镜像反射 当我们在Java中工作时，字符串操作和比较是日常任务。 在这个快速教程中，我们将深入探讨一个有趣的问题：检查字符串是否等于其镜像反射。 2. 问题介绍 一个常见的误解是，获取字符串的镜像反射仅仅涉及反转其顺序。以字符串“ALL”为例。直观上，人们可能会期望它的镜像反射是“LLA”。然而，通过实际使用镜子仔细检查，我们发现“..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 解决问题的想法：结合两次检查","slug":"_3-解决问题的想法-结合两次检查","link":"#_3-解决问题的想法-结合两次检查","children":[]},{"level":2,"title":"4. 实现containsOnlySymmetricLetters()方法","slug":"_4-实现containsonlysymmetricletters-方法","link":"#_4-实现containsonlysymmetricletters-方法","children":[]},{"level":2,"title":"5. 实现isPalindrome()方法","slug":"_5-实现ispalindrome-方法","link":"#_5-实现ispalindrome-方法","children":[]},{"level":2,"title":"6. 测试解决方案","slug":"_6-测试解决方案","link":"#_6-测试解决方案","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719034284000,"updatedTime":1719034284000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.26,"words":977},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Check if a String Is Equal to Its Mirror Reflection.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>当我们在Java中工作时，字符串操作和比较是日常任务。</p>\\n<p>在这个快速教程中，我们将深入探讨一个有趣的问题：检查字符串是否等于其镜像反射。</p>\\n<h2>2. 问题介绍</h2>\\n<p>一个常见的误解是，获取字符串的镜像反射仅仅涉及反转其顺序。以字符串“ALL”为例。直观上，人们可能会期望它的镜像反射是“LLA”。然而，通过实际使用镜子仔细检查，我们发现“LLA”并不符合“ALL”的镜像版本。</p>\\n<p>关键的误解在于，字符串中的<strong>每个单独字符在其镜像反射中都会发生反转</strong>。因此，“ALL”的镜像反射实际上看起来像“⅃⅃A”。</p>\\n<p>字符可以根据其反转行为被归类为对称或不对称。<strong>对称字符是指在反转时保持不变的字符</strong>，例如‘A’、‘O’、‘o’、‘V’、‘v’、‘M’、‘8’、‘+’、‘-’等。相反，不对称字符与其反转形式不同，例如‘L’、‘S’、‘p’、‘h’、‘/’、‘3’等。</p>","autoDesc":true}');export{k as comp,d as data};
