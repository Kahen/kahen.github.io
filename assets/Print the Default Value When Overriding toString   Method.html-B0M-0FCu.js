import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-DE4beumH.js";const t={},o=e(`<h1 id="java中重写tostring-方法时打印默认值" tabindex="-1"><a class="header-anchor" href="#java中重写tostring-方法时打印默认值"><span>Java中重写toString()方法时打印默认值</span></a></h1><p>我们可以在Java中使用<code>toString()</code>方法来返回对象的字符串表示。通常，我们会覆盖这个方法以提供一个有意义的对象状态描述。但是，某些字段可能是<code>null</code>，打印它们可能会导致<code>NullPointerExceptions</code>。</p><p><strong>在本教程中，我们将探索几种使用默认值来处理这种情况的方法。</strong></p><h2 id="_2-员工用例场景" tabindex="-1"><a class="header-anchor" href="#_2-员工用例场景"><span>2. 员工用例场景</span></a></h2><p>让我们考虑开发一个管理员工记录的应用程序。每个员工都有诸如<code>name</code>、<code>age</code>和<code>department</code>等属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> department<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> department<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>department <span class="token operator">=</span> department<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，在显示员工信息时，清晰且富有信息性地表示每个<code>Employee</code>对象至关重要。</p><p><strong>然而，在现实世界的场景中，员工的<code>name</code>和<code>department</code>属性有时可能是<code>null</code>，如果不适当处理，可能会导致意外的行为。</strong></p><h2 id="_3-在tostring-方法中进行空值检查" tabindex="-1"><a class="header-anchor" href="#_3-在tostring-方法中进行空值检查"><span>3. 在toString()方法中进行空值检查</span></a></h2><p>一种最简单的方法是在<code>toString()</code>方法中对每个可能为<code>null</code>的字段执行空值检查。如果字段是<code>null</code>，我们可以打印一个默认值。以下是一个基本示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Name: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>name <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> name <span class="token operator">:</span> <span class="token string">&quot;未知&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span>
      <span class="token string">&quot;, Age: &quot;</span> <span class="token operator">+</span> age <span class="token operator">+</span>
      <span class="token string">&quot;, Department: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>department <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> department <span class="token operator">:</span> <span class="token string">&quot;未知&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，当<code>name</code>或<code>department</code>是<code>null</code>时，我们打印“未知”而不是<code>null</code>值，以防止在<code>Employee</code>对象的字符串表示中显示<code>null</code>值。</p><h2 id="_4-使用optional类" tabindex="-1"><a class="header-anchor" href="#_4-使用optional类"><span>4. 使用Optional类</span></a></h2><p>Java 8引入了<code>Optional</code>类，可以用来更优雅地处理<code>null</code>值。</p><p>以下是如何做到这一点的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Name: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token string">&quot;未知&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span>
      <span class="token string">&quot;, Age: &quot;</span> <span class="token operator">+</span> age <span class="token operator">+</span>
      <span class="token string">&quot;, Department: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>department<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token string">&quot;未知&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code>name</code>或<code>department</code>是<code>null</code>，我们使用<code>Optional</code>的<code>orElse()</code>方法打印“未知”而不是<code>null</code>。</p><h2 id="_5-自定义辅助方法" tabindex="-1"><a class="header-anchor" href="#_5-自定义辅助方法"><span>5. 自定义辅助方法</span></a></h2><p>创建自定义辅助方法可以提高代码的可读性，特别是当多个字段需要检查<code>null</code>值时。此外，这个方法可以封装空值检查和默认值分配逻辑。</p><p>以下是一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">getDefaultIfNull</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">,</span> <span class="token class-name">String</span> defaultValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> value <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> value <span class="token operator">:</span> defaultValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个自定义辅助方法<code>getDefaultIfNull()</code>来处理<code>null</code>值。这个方法检查值是否为<code>null</code>，并在其为<code>null</code>时返回默认值。</p><p>然后，在<code>toString()</code>方法中，我们使用<code>getDefaultIfNull()</code>方法来处理每个字段的<code>null</code>值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Name: &quot;</span> <span class="token operator">+</span> <span class="token function">getDefaultIfNull</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">&quot;未知&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span>
      <span class="token string">&quot;, Age: &quot;</span> <span class="token operator">+</span> age <span class="token operator">+</span>
      <span class="token string">&quot;, Department: &quot;</span> <span class="token operator">+</span> <span class="token function">getDefaultIfNull</span><span class="token punctuation">(</span>department<span class="token punctuation">,</span> <span class="token string">&quot;未知&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-使用objects-tostring-方法" tabindex="-1"><a class="header-anchor" href="#_6-使用objects-tostring-方法"><span>6. 使用Objects.toString()方法</span></a></h2><p>Java提供了一个实用方法<code>Objects.toString()</code>，用于在将对象转换为字符串时处理<code>null</code>值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Name: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">&quot;未知&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span>
      <span class="token string">&quot;, Age: &quot;</span> <span class="token operator">+</span> age <span class="token operator">+</span>
      <span class="token string">&quot;, Department: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>department<span class="token punctuation">,</span> <span class="token string">&quot;未知&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们使用<code>Objects.toString()</code>方法在<code>name</code>或<code>department</code>字段为<code>null</code>时打印“未知”而不是<code>null</code>。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们讨论了重写<code>toString()</code>方法以及处理潜在<code>null</code>的方法。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p><p>文章发布后的30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,33),p=[o];function c(l,i){return s(),a("div",null,p)}const d=n(t,[["render",c],["__file","Print the Default Value When Overriding toString   Method.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Print%20the%20Default%20Value%20When%20Overriding%20toString%20%20%20Method.html","title":"Java中重写toString()方法时打印默认值","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","编程"],"tag":["toString方法","空值处理","Java 8"],"head":[["meta",{"name":"keywords","content":"Java toString, 空值, Optional类, Java编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Print%20the%20Default%20Value%20When%20Overriding%20toString%20%20%20Method.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中重写toString()方法时打印默认值"}],["meta",{"property":"og:description","content":"Java中重写toString()方法时打印默认值 我们可以在Java中使用toString()方法来返回对象的字符串表示。通常，我们会覆盖这个方法以提供一个有意义的对象状态描述。但是，某些字段可能是null，打印它们可能会导致NullPointerExceptions。 在本教程中，我们将探索几种使用默认值来处理这种情况的方法。 2. 员工用例场景 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"toString方法"}],["meta",{"property":"article:tag","content":"空值处理"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中重写toString()方法时打印默认值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中重写toString()方法时打印默认值 我们可以在Java中使用toString()方法来返回对象的字符串表示。通常，我们会覆盖这个方法以提供一个有意义的对象状态描述。但是，某些字段可能是null，打印它们可能会导致NullPointerExceptions。 在本教程中，我们将探索几种使用默认值来处理这种情况的方法。 2. 员工用例场景 ..."},"headers":[{"level":2,"title":"2. 员工用例场景","slug":"_2-员工用例场景","link":"#_2-员工用例场景","children":[]},{"level":2,"title":"3. 在toString()方法中进行空值检查","slug":"_3-在tostring-方法中进行空值检查","link":"#_3-在tostring-方法中进行空值检查","children":[]},{"level":2,"title":"4. 使用Optional类","slug":"_4-使用optional类","link":"#_4-使用optional类","children":[]},{"level":2,"title":"5. 自定义辅助方法","slug":"_5-自定义辅助方法","link":"#_5-自定义辅助方法","children":[]},{"level":2,"title":"6. 使用Objects.toString()方法","slug":"_6-使用objects-tostring-方法","link":"#_6-使用objects-tostring-方法","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.75,"words":826},"filePathRelative":"posts/baeldung/Archive/Print the Default Value When Overriding toString   Method.md","localizedDate":"2024年6月18日","excerpt":"\\n<p>我们可以在Java中使用<code>toString()</code>方法来返回对象的字符串表示。通常，我们会覆盖这个方法以提供一个有意义的对象状态描述。但是，某些字段可能是<code>null</code>，打印它们可能会导致<code>NullPointerExceptions</code>。</p>\\n<p><strong>在本教程中，我们将探索几种使用默认值来处理这种情况的方法。</strong></p>\\n<h2>2. 员工用例场景</h2>\\n<p>让我们考虑开发一个管理员工记录的应用程序。每个员工都有诸如<code>name</code>、<code>age</code>和<code>department</code>等属性：</p>","autoDesc":true}');export{d as comp,k as data};
