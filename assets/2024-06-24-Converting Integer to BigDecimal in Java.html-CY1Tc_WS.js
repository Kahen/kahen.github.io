import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a}from"./app-D85m_Iq8.js";const t={},l=a(`<h1 id="java中将integer转换为bigdecimal" tabindex="-1"><a class="header-anchor" href="#java中将integer转换为bigdecimal"><span>Java中将Integer转换为BigDecimal</span></a></h1><p><em>BigDecimal</em> 旨在处理大的浮点数。<strong>它解决了浮点算术的问题，并提供了控制精度的方式。</strong> 此外，它还拥有许多用于数字运算的常规方法。</p><p>我们可以通过将_Integer_转换来利用_BigDecimal_的特性。在本教程中，我们将学习几种不同的转换方法，并讨论它们的优缺点。</p><h2 id="_2-构造函数转换" tabindex="-1"><a class="header-anchor" href="#_2-构造函数转换"><span>2. 构造函数转换</span></a></h2><p>最直接的一种方式是使用构造函数转换。<strong><em>BigDecimal</em> 提供了可以从多种输入转换的构造函数。</strong> 因此，我们可以将给定的_Integer_传递给_BigDecimal_构造函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@ParameterizedTest
@ArgumentsSource(BigDecimalConversionArgumentsProvider.class)
void giveIntegerWhenConvertWithConstructorToBigDecimalThenConversionCorrect(Integer given, BigDecimal expected) {
    BigDecimal actual = new BigDecimal(given);
    assertThat(actual).isEqualTo(expected);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而，这种方法每次都会强制_BigDecimal_创建一个新的对象：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@ParameterizedTest
@ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
void giveIntegerWhenConvertWithConstructorToBigDecimalThenConversionWithoutCaching(Integer given) {
    BigDecimal firstBigDecimal = new BigDecimal(given);
    BigDecimal secondBigDecimal = new BigDecimal(given);
    assertThat(firstBigDecimal)
      .isEqualTo(secondBigDecimal)
      .isNotSameAs(secondBigDecimal);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-静态工厂转换" tabindex="-1"><a class="header-anchor" href="#_3-静态工厂转换"><span>3. 静态工厂转换</span></a></h2><p>另一种技术涉及静态工厂，它与前一个例子类似：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@ParameterizedTest
@ArgumentsSource(BigDecimalConversionArgumentsProvider.class)
void giveIntegerWhenConvertWithValueOfToBigDecimalThenConversionCorrect(Integer given, BigDecimal expected) {
    BigDecimal actual = BigDecimal.valueOf(given);
    assertThat(actual).isEqualTo(expected);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它提供了一个好处：与构造函数转换不同，它可以缓存值。<strong>因此，我们可以在不同的上下文中重用同一个对象。</strong> 因为_BigDecimal_是不可变的，它不会创建任何问题。</p><h2 id="_4-缓存" tabindex="-1"><a class="header-anchor" href="#_4-缓存"><span>4. 缓存</span></a></h2><p><strong><em>BigIntegers.valueOf()</em> 工厂缓存了从零到十的值。</strong> 所有这些值都在_BigDecimal_类中的静态_ZERO_THROUGH_TEN_数组中定义：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static final BigDecimal[] ZERO_THROUGH_TEN = {
  new BigDecimal(BigInteger.ZERO,       0,  0, 1),
  new BigDecimal(BigInteger.ONE,        1,  0, 1),
  new BigDecimal(BigInteger.TWO,        2,  0, 1),
  new BigDecimal(BigInteger.valueOf(3), 3,  0, 1),
  new BigDecimal(BigInteger.valueOf(4), 4,  0, 1),
  new BigDecimal(BigInteger.valueOf(5), 5,  0, 1),
  new BigDecimal(BigInteger.valueOf(6), 6,  0, 1),
  new BigDecimal(BigInteger.valueOf(7), 7,  0, 1),
  new BigDecimal(BigInteger.valueOf(8), 8,  0, 1),
  new BigDecimal(BigInteger.valueOf(9), 9,  0, 1),
  new BigDecimal(BigInteger.TEN,        10, 0, 2),
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>valueOf(long)</em> 工厂在内部使用这个数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static BigDecimal valueOf(long val) {
    if (val &gt;= 0 &amp;&amp; val &lt; ZERO_THROUGH_TEN.length)
        return ZERO_THROUGH_TEN[(int)val];
    else if (val != INFLATED)
        return new BigDecimal(null, val, 0, 0);
    return new BigDecimal(INFLATED_BIGINT, val, 0, 0);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，对于某些值，_BigDecimal_对象是相同的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@ParameterizedTest
@ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
void giveIntegerWhenConvertWithValueOfToBigDecimalThenConversionCachesTheResults(Integer given) {
    BigDecimal firstBigDecimal = BigDecimal.valueOf(given);
    BigDecimal secondBigDecimal = BigDecimal.valueOf(given);
    assertThat(firstBigDecimal).isSameAs(secondBigDecimal);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们要使用许多从零到十的_BigDecimal_值，这可能会提高性能。同时，由于_BigDecimal_对象是不可变的，我们可以在我们的应用程序中实现我们重复使用的数字的缓存。</p><p>同时，这个范围之外的数字将不会使用缓存：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@ParameterizedTest
@ValueSource(ints = {11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21})
void giveIntegerWhenConvertWithValueOfToBigDecimalThenConversionWontCacheTheResults(Integer given) {
    BigDecimal firstBigDecimal = BigDecimal.valueOf(given);
    BigDecimal secondBigDecimal = BigDecimal.valueOf(given);
    assertThat(firstBigDecimal)
      .isEqualTo(secondBigDecimal)
      .isNotSameAs(secondBigDecimal);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，在生产代码中依赖身份等价是不明智的。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>当我们需要对浮点数进行操作，避免舍入误差时，_BigDecimal_是一个很好的选择。此外，它还允许我们使用其他方式无法表示的巨大数字。_BigDecimal_提供了从其他类型转换的各种方法，例如从_Integer_转换。</p><p>像往常一样，本教程的所有代码都可以在GitHub上找到。</p>`,26),s=[l];function r(c,d){return n(),i("div",null,s)}const v=e(t,[["render",r],["__file","2024-06-24-Converting Integer to BigDecimal in Java.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-06-24/2024-06-24-Converting%20Integer%20to%20BigDecimal%20in%20Java.html","title":"Java中将Integer转换为BigDecimal","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Java","BigDecimal"],"tag":["Integer","BigDecimal","Java"],"head":[["meta",{"name":"keywords","content":"Java, BigDecimal, Integer, 转换, 精确度, 浮点数"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-24/2024-06-24-Converting%20Integer%20to%20BigDecimal%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将Integer转换为BigDecimal"}],["meta",{"property":"og:description","content":"Java中将Integer转换为BigDecimal BigDecimal 旨在处理大的浮点数。它解决了浮点算术的问题，并提供了控制精度的方式。 此外，它还拥有许多用于数字运算的常规方法。 我们可以通过将_Integer_转换来利用_BigDecimal_的特性。在本教程中，我们将学习几种不同的转换方法，并讨论它们的优缺点。 2. 构造函数转换 最直接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T13:28:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Integer"}],["meta",{"property":"article:tag","content":"BigDecimal"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-24T13:28:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将Integer转换为BigDecimal\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-24T13:28:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将Integer转换为BigDecimal BigDecimal 旨在处理大的浮点数。它解决了浮点算术的问题，并提供了控制精度的方式。 此外，它还拥有许多用于数字运算的常规方法。 我们可以通过将_Integer_转换来利用_BigDecimal_的特性。在本教程中，我们将学习几种不同的转换方法，并讨论它们的优缺点。 2. 构造函数转换 最直接..."},"headers":[{"level":2,"title":"2. 构造函数转换","slug":"_2-构造函数转换","link":"#_2-构造函数转换","children":[]},{"level":2,"title":"3. 静态工厂转换","slug":"_3-静态工厂转换","link":"#_3-静态工厂转换","children":[]},{"level":2,"title":"4. 缓存","slug":"_4-缓存","link":"#_4-缓存","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719235711000,"updatedTime":1719235711000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.69,"words":808},"filePathRelative":"posts/baeldung/2024-06-24/2024-06-24-Converting Integer to BigDecimal in Java.md","localizedDate":"2024年6月24日","excerpt":"\\n<p><em>BigDecimal</em> 旨在处理大的浮点数。<strong>它解决了浮点算术的问题，并提供了控制精度的方式。</strong> 此外，它还拥有许多用于数字运算的常规方法。</p>\\n<p>我们可以通过将_Integer_转换来利用_BigDecimal_的特性。在本教程中，我们将学习几种不同的转换方法，并讨论它们的优缺点。</p>\\n<h2>2. 构造函数转换</h2>\\n<p>最直接的一种方式是使用构造函数转换。<strong><em>BigDecimal</em> 提供了可以从多种输入转换的构造函数。</strong> 因此，我们可以将给定的_Integer_传递给_BigDecimal_构造函数：</p>","autoDesc":true}');export{v as comp,o as data};
