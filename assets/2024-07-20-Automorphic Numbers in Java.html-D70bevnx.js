import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-on0L14Tx.js";const t={},p=e(`<hr><h1 id="java中的自守数" tabindex="-1"><a class="header-anchor" href="#java中的自守数"><span>Java中的自守数</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这篇简短的教程中，我们将讨论自守数，并学习几种找到它们的方法以及相应的Java程序。</p><h2 id="_2-什么是自守数" tabindex="-1"><a class="header-anchor" href="#_2-什么是自守数"><span>2. 什么是自守数？</span></a></h2><p><strong>自守数是一个数，其平方的末尾数字与该数本身相同。</strong></p><p>例如，25是一个自守数，因为25的平方是625，末尾是25。同样，76是一个自守数，因为76的平方是5776，末尾也是76。</p><p><strong>在数学中，自守数也被称为循环数。</strong></p><p>一些自守数的例子包括0、1、5、6、25、76、376、625、9376等。</p><p>0和1被称为平凡的自守数，因为它们在任何基数下都是自守数。</p><h2 id="_3-判断一个数是否是自守数" tabindex="-1"><a class="header-anchor" href="#_3-判断一个数是否是自守数"><span>3. 判断一个数是否是自守数</span></a></h2><p>有许多算法可以用来确定一个数是否是自守数。接下来，我们将看到几种方法。</p><h3 id="_3-1-循环遍历数字并比较" tabindex="-1"><a class="header-anchor" href="#_3-1-循环遍历数字并比较"><span>3.1. 循环遍历数字并比较</span></a></h3><p>这里有一种方法可以确定一个数是否是自守数：</p><ol><li>获取数字并计算其平方</li><li>获取平方的最后一个数字并与数字的最后一个数字进行比较 <ul><li>如果最后一个数字不相等，则该数不是自守数</li><li>如果最后一个数字相等，则进入下一步</li></ul></li><li>移除数字和平方的最后一个数字</li><li>重复步骤2和3，直到比较完数字的所有数字</li></ol><p>上述方法以相反的方式循环遍历输入数字的数字。</p><p>让我们编写一个Java程序来实现这种方法。_isAutomorphicUsingLoop()_方法接受一个整数作为输入，并检查它是否是自守数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isAutomorphicUsingLoop</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> square <span class="token operator">=</span> number <span class="token operator">*</span> number<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>number <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">%</span> <span class="token number">10</span> <span class="token operator">!=</span> square <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        number <span class="token operator">/=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        square <span class="token operator">/=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们首先计算_number_的平方。然后，我们逐个比较_number_和_square_的最后一位数字。</p><p>在任何阶段，如果最后一个数字不相等，我们返回_false_并退出方法。否则，我们去掉相等的最后一位数字，并重复剩余数字的_number_的过程。</p><p>让我们测试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">AutomorphicNumber</span><span class="token punctuation">.</span><span class="token function">isAutomorphicUsingLoop</span><span class="token punctuation">(</span><span class="token number">76</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">AutomorphicNumber</span><span class="token punctuation">.</span><span class="token function">isAutomorphicUsingLoop</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-直接比较数字" tabindex="-1"><a class="header-anchor" href="#_3-2-直接比较数字"><span>3.2. 直接比较数字</span></a></h3><p>我们还可以以更直接的方式确定一个数是否是自守数：</p><ol><li><p>获取数字并计算其位数（<em>n</em>）</p></li><li><p>计算数字的平方</p></li><li><p>从平方中获取最后_n_位数字</p><ul><li>如果平方的最后_n_位数字构成原始数字，则该数是自守数</li><li>否则它不是自守数</li></ul></li></ol><p>在这种情况下，我们不需要逐个循环遍历数字的数字。相反，我们可以利用编程框架的现有库。</p><p><strong>我们可以利用_Math_类执行数值操作，例如计算给定数字的位数并从其平方中获取相应数量的最后数字：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isAutomorphicUsingMath</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> square <span class="token operator">=</span> number <span class="token operator">*</span> number<span class="token punctuation">;</span>

    <span class="token keyword">int</span> numberOfDigits <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">log10</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> lastDigits <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>square <span class="token operator">%</span> <span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> numberOfDigits<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> number <span class="token operator">==</span> lastDigits<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似于第一种方法，我们首先计算_number_的平方。然后，我们不是逐个比较_number_和_square_的最后一位数字，而是一次性使用_Math.floor()<em>获取_number_中的总_numberOfDigits</em>。之后，我们使用_Math.pow()_从_square_中提取相应数量的数字。最后，我们将输入_number_与提取的数字_lastDigits_进行比较。</p><p>如果_number_和_lastDigits_相等，则该数是自守数，我们返回_true_，否则我们返回_false_。</p><p>让我们测试一下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">AutomorphicNumber</span><span class="token punctuation">.</span><span class="token function">isAutomorphicUsingMath</span><span class="token punctuation">(</span><span class="token number">76</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token class-name">AutomorphicNumber</span><span class="token punctuation">.</span><span class="token function">isAutomorphicUsingMath</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这篇文章中，我们探索了自守数。我们还查看了几种确定一个数是否是自守数的方法以及相应的Java程序。</p><p>一如既往，这些示例的代码可以在GitHub上找到。</p>`,35),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(t,[["render",i],["__file","2024-07-20-Automorphic Numbers in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Automorphic%20Numbers%20in%20Java.html","title":"Java中的自守数","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","数学"],"tag":["Automorphic Numbers","Java"],"head":[["meta",{"name":"keywords","content":"Java, Automorphic Numbers, 数学"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Automorphic%20Numbers%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的自守数"}],["meta",{"property":"og:description","content":"Java中的自守数 1. 概述 在这篇简短的教程中，我们将讨论自守数，并学习几种找到它们的方法以及相应的Java程序。 2. 什么是自守数？ 自守数是一个数，其平方的末尾数字与该数本身相同。 例如，25是一个自守数，因为25的平方是625，末尾是25。同样，76是一个自守数，因为76的平方是5776，末尾也是76。 在数学中，自守数也被称为循环数。 一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T19:12:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Automorphic Numbers"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T19:12:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的自守数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T19:12:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的自守数 1. 概述 在这篇简短的教程中，我们将讨论自守数，并学习几种找到它们的方法以及相应的Java程序。 2. 什么是自守数？ 自守数是一个数，其平方的末尾数字与该数本身相同。 例如，25是一个自守数，因为25的平方是625，末尾是25。同样，76是一个自守数，因为76的平方是5776，末尾也是76。 在数学中，自守数也被称为循环数。 一..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是自守数？","slug":"_2-什么是自守数","link":"#_2-什么是自守数","children":[]},{"level":2,"title":"3. 判断一个数是否是自守数","slug":"_3-判断一个数是否是自守数","link":"#_3-判断一个数是否是自守数","children":[{"level":3,"title":"3.1. 循环遍历数字并比较","slug":"_3-1-循环遍历数字并比较","link":"#_3-1-循环遍历数字并比较","children":[]},{"level":3,"title":"3.2. 直接比较数字","slug":"_3-2-直接比较数字","link":"#_3-2-直接比较数字","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721502748000,"updatedTime":1721502748000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.23,"words":970},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Automorphic Numbers in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中的自守数</h1>\\n<h2>1. 概述</h2>\\n<p>在这篇简短的教程中，我们将讨论自守数，并学习几种找到它们的方法以及相应的Java程序。</p>\\n<h2>2. 什么是自守数？</h2>\\n<p><strong>自守数是一个数，其平方的末尾数字与该数本身相同。</strong></p>\\n<p>例如，25是一个自守数，因为25的平方是625，末尾是25。同样，76是一个自守数，因为76的平方是5776，末尾也是76。</p>\\n<p><strong>在数学中，自守数也被称为循环数。</strong></p>\\n<p>一些自守数的例子包括0、1、5、6、25、76、376、625、9376等。</p>","autoDesc":true}');export{d as comp,k as data};
