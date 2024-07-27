import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t(`<h1 id="在java中创建bmi计算器" tabindex="-1"><a class="header-anchor" href="#在java中创建bmi计算器"><span>在Java中创建BMI计算器</span></a></h1><p>在本教程中，我们将在Java中创建一个BMI（身体质量指数）计算器。</p><p>在开始实现之前，我们首先来理解BMI的概念。</p><h3 id="_2-什么是bmi" tabindex="-1"><a class="header-anchor" href="#_2-什么是bmi"><span>2. 什么是BMI？</span></a></h3><p>BMI代表身体质量指数。它是从个人的身高和体重中派生出来的一个值。</p><p>借助BMI，我们可以判断一个人的体重是否健康。</p><p>让我们来看一下计算BMI的公式：</p><p><strong>BMI = 体重（千克） / （身高（米） * 身高（米））</strong></p><p>根据BMI范围，一个人被归类为“低体重”、“正常”、“超重”或“肥胖”：</p><table><thead><tr><th>BMI范围</th><th>类别</th></tr></thead><tbody><tr><td>\`&lt; 18.5</td><td>低体重</td></tr><tr><td>18.5 – 25</td><td>正常</td></tr><tr><td>25 – 30</td><td>超重</td></tr><tr><td>&gt;\` 30</td><td>肥胖</td></tr></tbody></table><p>例如，让我们计算一个体重等于100kg（千克）和身高等于1.524m（米）的个人的BMI。</p><p>BMI = 100 / (1.524 * 1.524)</p><p>BMI = 43.056</p><p><strong>由于BMI大于30，这个人被归类为“超重”。</strong></p><h3 id="_3-java程序计算bmi" tabindex="-1"><a class="header-anchor" href="#_3-java程序计算bmi"><span>3. Java程序计算BMI</span></a></h3><p>Java程序包括用于计算BMI的公式和简单的_if_–_else_语句。使用上述公式和表格，我们可以找出一个人属于哪个类别：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">calculateBMI</span><span class="token punctuation">(</span><span class="token keyword">double</span> weight<span class="token punctuation">,</span> <span class="token keyword">double</span> height<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> bmi <span class="token operator">=</span> weight <span class="token operator">/</span> <span class="token punctuation">(</span>height <span class="token operator">*</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>bmi <span class="token operator">&lt;</span> <span class="token number">18.5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;低体重&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>bmi <span class="token operator">&lt;</span> <span class="token number">25</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;正常&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>bmi <span class="token operator">&lt;</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;超重&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string">&quot;肥胖&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试"><span>4. 测试</span></a></h3><p>让我们通过提供一个人的身高和体重来测试代码，这个人是“肥胖”的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenBMIIsGreaterThanThirty_thenObese</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> weight <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> height <span class="token operator">=</span> <span class="token number">1.524</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> actual <span class="token operator">=</span> <span class="token class-name">BMICalculator</span><span class="token punctuation">.</span><span class="token function">calculateBMI</span><span class="token punctuation">(</span>weight<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> expected <span class="token operator">=</span> <span class="token string">&quot;肥胖&quot;</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试后，我们可以看到实际结果与预期结果相同。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了如何在Java中创建BMI计算器。我们还通过编写JUnit测试来测试实现。</p><p>如常，教程的完整代码可在GitHub上找到。</p>`,24),o=[p];function l(c,i){return s(),n("div",null,o)}const d=a(e,[["render",l],["__file","2024-07-14-Create a BMI Calculator in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Create%20a%20BMI%20Calculator%20in%20Java.html","title":"在Java中创建BMI计算器","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["BMI Calculator","Java"],"head":[["meta",{"name":"keywords","content":"Java, BMI Calculator, Body Mass Index, Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Create%20a%20BMI%20Calculator%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中创建BMI计算器"}],["meta",{"property":"og:description","content":"在Java中创建BMI计算器 在本教程中，我们将在Java中创建一个BMI（身体质量指数）计算器。 在开始实现之前，我们首先来理解BMI的概念。 2. 什么是BMI？ BMI代表身体质量指数。它是从个人的身高和体重中派生出来的一个值。 借助BMI，我们可以判断一个人的体重是否健康。 让我们来看一下计算BMI的公式： BMI = 体重（千克） / （身高..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T10:09:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"BMI Calculator"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T10:09:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中创建BMI计算器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T10:09:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中创建BMI计算器 在本教程中，我们将在Java中创建一个BMI（身体质量指数）计算器。 在开始实现之前，我们首先来理解BMI的概念。 2. 什么是BMI？ BMI代表身体质量指数。它是从个人的身高和体重中派生出来的一个值。 借助BMI，我们可以判断一个人的体重是否健康。 让我们来看一下计算BMI的公式： BMI = 体重（千克） / （身高..."},"headers":[{"level":3,"title":"2. 什么是BMI？","slug":"_2-什么是bmi","link":"#_2-什么是bmi","children":[]},{"level":3,"title":"3. Java程序计算BMI","slug":"_3-java程序计算bmi","link":"#_3-java程序计算bmi","children":[]},{"level":3,"title":"4. 测试","slug":"_4-测试","link":"#_4-测试","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720951767000,"updatedTime":1720951767000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.55,"words":466},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Create a BMI Calculator in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将在Java中创建一个BMI（身体质量指数）计算器。</p>\\n<p>在开始实现之前，我们首先来理解BMI的概念。</p>\\n<h3>2. 什么是BMI？</h3>\\n<p>BMI代表身体质量指数。它是从个人的身高和体重中派生出来的一个值。</p>\\n<p>借助BMI，我们可以判断一个人的体重是否健康。</p>\\n<p>让我们来看一下计算BMI的公式：</p>\\n<p><strong>BMI = 体重（千克） / （身高（米） * 身高（米））</strong></p>\\n<p>根据BMI范围，一个人被归类为“低体重”、“正常”、“超重”或“肥胖”：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>BMI范围</th>\\n<th>类别</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>`&lt; 18.5</td>\\n<td>低体重</td>\\n</tr>\\n<tr>\\n<td>18.5 – 25</td>\\n<td>正常</td>\\n</tr>\\n<tr>\\n<td>25 – 30</td>\\n<td>超重</td>\\n</tr>\\n<tr>\\n<td>&gt;` 30</td>\\n<td>肥胖</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{d as comp,k as data};
