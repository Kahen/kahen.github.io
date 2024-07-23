import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const p={},e=t(`<hr><h1 id="java程序打印帕斯卡三角形" tabindex="-1"><a class="header-anchor" href="#java程序打印帕斯卡三角形"><span>Java程序打印帕斯卡三角形</span></a></h1><p>帕斯卡三角形是一种二项式系数的三角形排列。帕斯卡三角形中的数字是这样排列的，即每个数字是它正上方两个数字的和。</p><p>在本教程中，我们将看到如何在Java中打印帕斯卡三角形。</p><h3 id="_2-使用递归" tabindex="-1"><a class="header-anchor" href="#_2-使用递归"><span>2. 使用递归</span></a></h3><p>我们可以使用递归打印帕斯卡三角形，公式为( nCr )：( n! / ( ( n – r )! r! ) )</p><p>首先，让我们创建一个递归函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">factorial</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> i <span class="token operator">*</span> <span class="token function">factorial</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以使用该函数打印三角形：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">printUseRecursion</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> n <span class="token operator">-</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> k <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> k <span class="token operator">&lt;=</span> i<span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span> <span class="token operator">+</span> <span class="token function">factorial</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token function">factorial</span><span class="token punctuation">(</span>i <span class="token operator">-</span> k<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token function">factorial</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用n = 5的结果看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>       1
      1 1
     1 2 1
    1 3 3 1
   1 4 6 4 1
  1 5 10 10 5 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-避免使用递归" tabindex="-1"><a class="header-anchor" href="#_3-避免使用递归"><span>3. 避免使用递归</span></a></h3><p>另一种不使用递归打印帕斯卡三角形的方法是使用二项式展开。</p><p>我们总是在每行的开头有值1，然后(n)行和(i)位置的值k计算为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>k <span class="token operator">=</span> <span class="token punctuation">(</span> k <span class="token operator">*</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> i<span class="token punctuation">)</span> <span class="token operator">/</span> i <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们使用这个公式创建我们的函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printUseBinomialExpansion</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> line <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> line <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span> line<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> n <span class="token operator">-</span> line<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span> k <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> line<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>k <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            k <span class="token operator">=</span> k <span class="token operator">*</span> <span class="token punctuation">(</span>line <span class="token operator">-</span> i<span class="token punctuation">)</span> <span class="token operator">/</span> i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在这个快速教程中，我们学习了两种在Java中打印帕斯卡三角形的方法。</p><p>本文的示例代码可以在GitHub上找到。</p>`,21),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-11-Java Program to Print Pascal s Triangle.html.vue"]]),d=JSON.parse(`{"path":"/posts/baeldung/2024-07-11/2024-07-11-Java%20Program%20to%20Print%20Pascal%20s%20Triangle.html","title":"Java程序打印帕斯卡三角形","lang":"zh-CN","frontmatter":{"date":"2024-07-11T00:00:00.000Z","category":["Java","算法"],"tag":["Pascal's Triangle","Java"],"head":[["meta",{"name":"keywords","content":"Java, Pascal's Triangle, Algorithm"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Java%20Program%20to%20Print%20Pascal%20s%20Triangle.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java程序打印帕斯卡三角形"}],["meta",{"property":"og:description","content":"Java程序打印帕斯卡三角形 帕斯卡三角形是一种二项式系数的三角形排列。帕斯卡三角形中的数字是这样排列的，即每个数字是它正上方两个数字的和。 在本教程中，我们将看到如何在Java中打印帕斯卡三角形。 2. 使用递归 我们可以使用递归打印帕斯卡三角形，公式为( nCr )：( n! / ( ( n – r )! r! ) ) 首先，让我们创建一个递归函数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T10:43:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Pascal's Triangle"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-07-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T10:43:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java程序打印帕斯卡三角形\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T10:43:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java程序打印帕斯卡三角形 帕斯卡三角形是一种二项式系数的三角形排列。帕斯卡三角形中的数字是这样排列的，即每个数字是它正上方两个数字的和。 在本教程中，我们将看到如何在Java中打印帕斯卡三角形。 2. 使用递归 我们可以使用递归打印帕斯卡三角形，公式为( nCr )：( n! / ( ( n – r )! r! ) ) 首先，让我们创建一个递归函数..."},"headers":[{"level":3,"title":"2. 使用递归","slug":"_2-使用递归","link":"#_2-使用递归","children":[]},{"level":3,"title":"3. 避免使用递归","slug":"_3-避免使用递归","link":"#_3-避免使用递归","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720694591000,"updatedTime":1720694591000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.43,"words":428},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Java Program to Print Pascal s Triangle.md","localizedDate":"2024年7月11日","excerpt":"<hr>\\n<h1>Java程序打印帕斯卡三角形</h1>\\n<p>帕斯卡三角形是一种二项式系数的三角形排列。帕斯卡三角形中的数字是这样排列的，即每个数字是它正上方两个数字的和。</p>\\n<p>在本教程中，我们将看到如何在Java中打印帕斯卡三角形。</p>\\n<h3>2. 使用递归</h3>\\n<p>我们可以使用递归打印帕斯卡三角形，公式为( nCr )：( n! / ( ( n – r )! r! ) )</p>\\n<p>首先，让我们创建一个递归函数：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">int</span> <span class=\\"token function\\">factorial</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">==</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">return</span> i <span class=\\"token operator\\">*</span> <span class=\\"token function\\">factorial</span><span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}`);export{k as comp,d as data};
