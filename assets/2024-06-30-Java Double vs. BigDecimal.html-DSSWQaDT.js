import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,a as l}from"./app-CM1q4_9A.js";const t={},n=l(`<h1 id="java-double-bigdecimal-的比较-baeldung" tabindex="-1"><a class="header-anchor" href="#java-double-bigdecimal-的比较-baeldung"><span>Java Double BigDecimal 的比较 | Baeldung</span></a></h1><p>在Java中，选择使用 Double 和 BigDecimal 可以显著影响性能以及浮点数的精度和准确性。在本教程中，我们将比较这两种类的属性、优点和缺点、它们的用例以及如何处理它们的精度和舍入问题。</p><p>Double 类是 double 原始数据类型的包装器，非常适合用于一般目的的浮点算术，并且在许多场景中表现良好。然而，它有一些限制。最突出的问题是其有限的精度。由于二进制表示的特性，double 数字在处理小数分数时可能会遭受舍入误差。</p><p>例如，double 字面量 0.1 并不完全等于十进制分数 0.1，而是稍微大一点的值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenDoubleLiteral_whenAssigningToDoubleVariable_thenValueIsNotExactlyEqual() {
    double doubleValue = 0.1;
    double epsilon = 0.0000000000000001;
    assertEquals(0.1, doubleValue, epsilon);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-bigdecimal" tabindex="-1"><a class="header-anchor" href="#_3-bigdecimal"><span>3. BigDecimal</span></a></h3><p>BigDecimal 类表示一个不可变的、任意精度的、有符号的小数。它可以处理任何大小的数字而不损失精度。想象一下拥有一个强大的放大镜，可以放大数字线上的任何部分，允许我们处理大或难以置信的小的数字。</p><p>它由两部分组成：一个未缩放的值（一个具有任意精度的整数）和比例（表示小数点后的位数）。例如，BigDecimal 3.14 有一个未缩放的值为 314 和一个比例为 2。</p><p>BigDecimal 类比 Double 提供更好的精度，因为它可以执行任意精度的小数计算，避免 Double 的二进制表示引起的舍入误差。这是因为 BigDecimal 在内部使用整数算术，这比浮点算术更准确。</p><p>让我们看一些如何在Java中使用 BigDecimal 类的例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private BigDecimal bigDecimal1 = new BigDecimal(&quot;124567890.0987654321&quot;);
private BigDecimal bigDecimal2 = new BigDecimal(&quot;987654321.123456789&quot;);

@Test
public void givenTwoBigDecimals_whenAdd_thenCorrect() {
    BigDecimal expected = new BigDecimal(&quot;1112222211.2222222211&quot;);
    BigDecimal actual = bigDecimal1.add(bigDecimal2);
    assertEquals(expected, actual);
}

@Test
public void givenTwoBigDecimals_whenMultiply_thenCorrect() {
    BigDecimal expected = new BigDecimal(&quot;123030014929277547.5030955772112635269&quot;);
    BigDecimal actual = bigDecimal1.multiply(bigDecimal2);
    assertEquals(expected, actual);
}

@Test
public void givenTwoBigDecimals_whenSubtract_thenCorrect() {
    BigDecimal expected = new BigDecimal(&quot;-863086431.0246913569&quot;);
    BigDecimal actual = bigDecimal1.subtract(bigDecimal2);
    assertEquals(expected, actual);
}

@Test
public void givenTwoBigDecimals_whenDivide_thenCorrect() {
    BigDecimal expected = new BigDecimal(&quot;0.13&quot;);
    BigDecimal actual = bigDecimal1.divide(bigDecimal2, 2, RoundingMode.HALF_UP);
    assertEquals(expected, actual);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-比较和用例" tabindex="-1"><a class="header-anchor" href="#_4-比较和用例"><span>4. 比较和用例</span></a></h3><h4 id="_4-1-double-和-bigdecimal-之间的比较" tabindex="-1"><a class="header-anchor" href="#_4-1-double-和-bigdecimal-之间的比较"><span>4.1. Double 和 BigDecimal 之间的比较</span></a></h4><p>从 Double 转换到 BigDecimal 是相对直接的。BigDecimal 类提供了接受 double 值作为参数的构造函数。然而，转换并不能消除 Double 的精度限制。相反，从 BigDecimal 转换到 Double 可能会导致数据丢失和在适应 Double 的限制范围内时的舍入误差。</p><p>让我们看看两种情况，即正确转换和丢失精度：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenConvertingDoubleToBigDecimal_thenConversionIsCorrect() {
    double doubleValue = 123.456;
    BigDecimal bigDecimalValue = BigDecimal.valueOf(doubleValue);
    BigDecimal expected = new BigDecimal(&quot;123.456&quot;).setScale(3, RoundingMode.HALF_UP);
    assertEquals(expected, bigDecimalValue.setScale(3, RoundingMode.HALF_UP));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenDecimalPlacesGreaterThan15_whenConvertingBigDecimalToDouble_thenPrecisionIsLost() {
    BigDecimal bigDecimalValue = new BigDecimal(&quot;789.1234567890123456&quot;);
    double doubleValue = bigDecimalValue.doubleValue();
    BigDecimal convertedBackToBigDecimal = BigDecimal.valueOf(doubleValue);
    assertNotEquals(bigDecimalValue, convertedBackToBigDecimal);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在速度和范围方面，Java 的 Double 利用硬件级别的浮点算术，使其比 BigDecimal 快。Double 类涵盖了广泛的范围，适应了大和小的数字。然而，它在64位结构内的局限引入了精度限制，特别是对于非常大或非常小的数字。相比之下，BigDecimal 提供了更广泛的值范围和在广泛值范围内更好的精度。</p><p>在内存使用方面也存在差异。Java 的 Double 更紧凑，从而实现更有效的内存使用。另一方面，BigDecimal 的任意精度算术强度意味着更高的内存消耗。这可能对我们的应用程序性能和可扩展性有影响，特别是在内存密集型环境中。</p><h4 id="_4-2-用例" tabindex="-1"><a class="header-anchor" href="#_4-2-用例"><span>4.2. 用例</span></a></h4><p>Double 轻松地与其他数字类型接口，使其成为基本算术的方便选择。当性能是优先考虑时，它是首选。Double 的速度和内存效率使其成为图形和游戏开发等应用程序的坚实选择，这些应用程序通常涉及实时渲染和复杂的视觉效果。在这里，性能对于维护流畅的用户体验至关重要。</p><p>另一方面，当处理货币计算时，BigDecimal 表现出色，其中精度误差可能导致重大的财务损失。它也是需要绝对精度的科学模拟的救星。虽然 BigDecimal 可能更慢且更占用内存，但它在准确性方面提供的保证在关键场景中可能是无价的。</p><p>因此，BigDecimal 更适合于金融应用程序中的任务、科学模拟、工程和物理模拟、数据分析和报告以及其他精度至关重要的领域。</p><h4 id="_4-3-精度和舍入考虑" tabindex="-1"><a class="header-anchor" href="#_4-3-精度和舍入考虑"><span>4.3. 精度和舍入考虑</span></a></h4><p>使用 BigDecimal，我们可以决定我们的计算将有多少小数位。当我们需要精确的小数计算时，这很有用，因为它可以原样存储每个小数位。</p><p>我们还可以选择计算中的舍入方式。不同的舍入模式对我们的结果有不同的影响，例如：</p><ul><li>UP：增加数字到下一个更高的值（当我们想要确保一个值永远不会低于某个特定金额时）</li><li>DOWN：将数字减少到前一个较低的值（当我们想要确保一个值永远不会高于某个特定金额时）</li><li>HALF_UP：如果被丢弃的小数部分大于0.5则向上舍入</li><li>HALF_DOWN：如果被丢弃的小数部分小于0.5则向下舍入</li></ul><p>这种对舍入和精度的控制水平是为什么 BigDecimal 更适合需要准确和统一的金融计算的另一个原因。</p><p>Double 由于计算机表示数字的方式，引入了微小误差的机会。表示像1/3这样的重复小数可能会变得棘手，因为它们会导致无限的二进制扩展。</p><p>像0.1这样的简单数字在尝试用二进制（基数2）表示时也会同样混乱。我们会得到一个重复的分数，如0.00011001100110011…计算机有有限的位数来表示这些分数，所以它们必须在某个点上进行舍入。结果，存储的值并不完全是0.1，这可能导致我们在执行计算时出现微小的误差。</p><h4 id="_4-4-比较表" tabindex="-1"><a class="header-anchor" href="#_4-4-比较表"><span>4.4. 比较表</span></a></h4><p>让我们总结一下我们对 Double 与 BigDecimal 的了解，用表格形式：</p><table><thead><tr><th>方面</th><th>Double</th><th>BigDecimal</th></tr></thead><tbody><tr><td>精度</td><td>有限</td><td>任意</td></tr><tr><td>范围</td><td>广泛（既大又小）</td><td>广泛</td></tr><tr><td>内存使用</td><td>紧凑</td><td>更高</td></tr><tr><td>性能</td><td>更快</td><td>更慢</td></tr><tr><td>用例</td><td>通用</td><td>金融，科学</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了 Java Double 和 BigDecimal 类型之间的细微差别以及使用它们时精度和性能之间的权衡。</p><p>像往常一样，代码示例可在 GitHub 上找到。</p>`,36),d=[n];function c(s,u){return a(),i("div",null,d)}const m=e(t,[["render",c],["__file","2024-06-30-Java Double vs. BigDecimal.html.vue"]]),b=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Java%20Double%20vs.%20BigDecimal.html","title":"Java Double  BigDecimal 的比较 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","BigDecimal"],"tag":["Double","BigDecimal"],"head":[["meta",{"name":"keywords","content":"Java, Double, BigDecimal, 精度, 性能"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Java%20Double%20vs.%20BigDecimal.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java Double  BigDecimal 的比较 | Baeldung"}],["meta",{"property":"og:description","content":"Java Double BigDecimal 的比较 | Baeldung 在Java中，选择使用 Double 和 BigDecimal 可以显著影响性能以及浮点数的精度和准确性。在本教程中，我们将比较这两种类的属性、优点和缺点、它们的用例以及如何处理它们的精度和舍入问题。 Double 类是 double 原始数据类型的包装器，非常适合用于一般目的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T06:36:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Double"}],["meta",{"property":"article:tag","content":"BigDecimal"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T06:36:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java Double  BigDecimal 的比较 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T06:36:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java Double BigDecimal 的比较 | Baeldung 在Java中，选择使用 Double 和 BigDecimal 可以显著影响性能以及浮点数的精度和准确性。在本教程中，我们将比较这两种类的属性、优点和缺点、它们的用例以及如何处理它们的精度和舍入问题。 Double 类是 double 原始数据类型的包装器，非常适合用于一般目的..."},"headers":[{"level":3,"title":"3. BigDecimal","slug":"_3-bigdecimal","link":"#_3-bigdecimal","children":[]},{"level":3,"title":"4. 比较和用例","slug":"_4-比较和用例","link":"#_4-比较和用例","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719729383000,"updatedTime":1719729383000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.57,"words":1672},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Java Double vs. BigDecimal.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java中，选择使用 Double 和 BigDecimal 可以显著影响性能以及浮点数的精度和准确性。在本教程中，我们将比较这两种类的属性、优点和缺点、它们的用例以及如何处理它们的精度和舍入问题。</p>\\n<p>Double 类是 double 原始数据类型的包装器，非常适合用于一般目的的浮点算术，并且在许多场景中表现良好。然而，它有一些限制。最突出的问题是其有限的精度。由于二进制表示的特性，double 数字在处理小数分数时可能会遭受舍入误差。</p>\\n<p>例如，double 字面量 0.1 并不完全等于十进制分数 0.1，而是稍微大一点的值：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>@Test\\npublic void givenDoubleLiteral_whenAssigningToDoubleVariable_thenValueIsNotExactlyEqual() {\\n    double doubleValue = 0.1;\\n    double epsilon = 0.0000000000000001;\\n    assertEquals(0.1, doubleValue, epsilon);\\n}\\n</code></pre></div>","autoDesc":true}');export{m as comp,b as data};
