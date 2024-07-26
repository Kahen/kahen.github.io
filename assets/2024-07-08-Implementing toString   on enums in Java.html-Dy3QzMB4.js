import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t(`<h1 id="java中枚举的tostring-实现方式" tabindex="-1"><a class="header-anchor" href="#java中枚举的tostring-实现方式"><span>Java中枚举的toString()实现方式</span></a></h1><p>枚举是一种特殊类型的类，自Java 5引入以来，它帮助替代了传统的整型枚举模式。尽管技术上是合适的，但我们用于枚举常量的名称通常不是我们希望在日志、数据库或应用程序面向客户部分显示的名称。</p><p>在本教程中，我们将学习在Java中实现枚举的toString()方法的各种方式，以便我们可以提供替代或装饰性的名称。</p><h2 id="_2-默认行为" tabindex="-1"><a class="header-anchor" href="#_2-默认行为"><span>2. 默认行为</span></a></h2><p>所有枚举隐式扩展了Enum类，因此我们的枚举将从Enum类继承其默认的toString()行为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-在枚举类型上覆盖tostring" tabindex="-1"><a class="header-anchor" href="#_3-在枚举类型上覆盖tostring"><span>3. 在枚举类型上覆盖toString()</span></a></h2><p>由于我们无法访问Enum类，我们可以控制toString()行为的下一个最高位置是在枚举类型声明中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">FastFood</span> <span class="token punctuation">{</span>
    <span class="token constant">PIZZA</span><span class="token punctuation">,</span>
    <span class="token constant">BURGER</span><span class="token punctuation">,</span>
    <span class="token constant">TACO</span><span class="token punctuation">,</span>
    <span class="token constant">CHICKEN</span><span class="token punctuation">,</span>
    <span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...?</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在toString()方法中，我们可以访问的唯一变量是this.name和this.ordinal。我们已经知道默认行为是打印枚举常量名称，我们并不希望打印序号。然而，我们可以将序号一一映射到我们的装饰字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ordinal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Pizza Pie&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Cheese Burger&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Crunchy Taco&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Fried Chicken&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然有效，但将0等同于&quot;Pizza Pie&quot;并不十分直观。然而，因为this本身是一个枚举，我们可以简化上述switch语句，使其更直接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token constant">PIZZA</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Pizza Pie&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token constant">BURGER</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Cheese Burger&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token constant">TACO</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Crunchy Taco&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token constant">CHICKEN</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Fried Chicken&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-在枚举常量上覆盖tostring" tabindex="-1"><a class="header-anchor" href="#_4-在枚举常量上覆盖tostring"><span>4. 在枚举常量上覆盖toString()</span></a></h2><p>我们可以在每个单独的枚举常量上覆盖Enum类或枚举类型声明中定义的任何方法。由于我们知道toString()是在Enum类中定义的，我们可以跳过在我们的枚举类型声明中实现它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">FastFood</span> <span class="token punctuation">{</span>
    <span class="token constant">PIZZA</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Pizza Pie&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token constant">BURGER</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Cheese Burger&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token constant">TACO</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Crunchy Taco&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token constant">CHICKEN</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Fried Chicken&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-替代名称字段" tabindex="-1"><a class="header-anchor" href="#_5-替代名称字段"><span>5. 替代名称字段</span></a></h2><p>我们的另一个选择是在枚举类型声明中包含额外的字段，并在创建每个枚举常量时分配将传递给构造函数的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">FastFood</span> <span class="token punctuation">{</span>
    <span class="token function">PIZZA</span><span class="token punctuation">(</span><span class="token string">&quot;Pizza Pie&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">BURGER</span><span class="token punctuation">(</span><span class="token string">&quot;Cheese Burger&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">TACO</span><span class="token punctuation">(</span><span class="token string">&quot;Crunchy Taco&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">CHICKEN</span><span class="token punctuation">(</span><span class="token string">&quot;Fried Chicken&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> prettyName<span class="token punctuation">;</span>

    <span class="token class-name">FastFood</span><span class="token punctuation">(</span><span class="token class-name">String</span> prettyName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>prettyName <span class="token operator">=</span> prettyName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以简单地在我们的枚举类型声明的toString()方法中使用这些值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> prettyName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-从装饰字符串创建枚举" tabindex="-1"><a class="header-anchor" href="#_6-从装饰字符串创建枚举"><span>6. 从装饰字符串创建枚举</span></a></h2><p>如果我们要做所有这些工作将我们的枚举转换为装饰字符串，那么建立一种反向操作的方式是有意义的。我们不是要覆盖Enum类的valueOf()方法，该方法将提供的字符串与枚举常量名称进行比较，让我们创建我们自己的，这样我们就可以利用任一行为，如果我们愿意的话：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">FastFood</span> <span class="token function">fromString</span><span class="token punctuation">(</span><span class="token class-name">String</span> prettyName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">FastFood</span> f <span class="token operator">:</span> <span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>f<span class="token punctuation">.</span>prettyName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>prettyName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> f<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们学习了实现枚举的toString()的几种方式。像往常一样，文章中使用的全部源代码可以在GitHub上找到。</p>`,26),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-08-Implementing toString   on enums in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Implementing%20toString%20%20%20on%20enums%20in%20Java.html","title":"Java中枚举的toString()实现方式","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Enums"],"tag":["toString()","Java Enum"],"head":[["meta",{"name":"keywords","content":"Java, Enums, toString(), Enum, Java Enum toString, Java Enum Pattern"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Implementing%20toString%20%20%20on%20enums%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中枚举的toString()实现方式"}],["meta",{"property":"og:description","content":"Java中枚举的toString()实现方式 枚举是一种特殊类型的类，自Java 5引入以来，它帮助替代了传统的整型枚举模式。尽管技术上是合适的，但我们用于枚举常量的名称通常不是我们希望在日志、数据库或应用程序面向客户部分显示的名称。 在本教程中，我们将学习在Java中实现枚举的toString()方法的各种方式，以便我们可以提供替代或装饰性的名称。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T16:59:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"toString()"}],["meta",{"property":"article:tag","content":"Java Enum"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T16:59:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中枚举的toString()实现方式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T16:59:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中枚举的toString()实现方式 枚举是一种特殊类型的类，自Java 5引入以来，它帮助替代了传统的整型枚举模式。尽管技术上是合适的，但我们用于枚举常量的名称通常不是我们希望在日志、数据库或应用程序面向客户部分显示的名称。 在本教程中，我们将学习在Java中实现枚举的toString()方法的各种方式，以便我们可以提供替代或装饰性的名称。 ..."},"headers":[{"level":2,"title":"2. 默认行为","slug":"_2-默认行为","link":"#_2-默认行为","children":[]},{"level":2,"title":"3. 在枚举类型上覆盖toString()","slug":"_3-在枚举类型上覆盖tostring","link":"#_3-在枚举类型上覆盖tostring","children":[]},{"level":2,"title":"4. 在枚举常量上覆盖toString()","slug":"_4-在枚举常量上覆盖tostring","link":"#_4-在枚举常量上覆盖tostring","children":[]},{"level":2,"title":"5. 替代名称字段","slug":"_5-替代名称字段","link":"#_5-替代名称字段","children":[]},{"level":2,"title":"6. 从装饰字符串创建枚举","slug":"_6-从装饰字符串创建枚举","link":"#_6-从装饰字符串创建枚举","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720457946000,"updatedTime":1720457946000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.84,"words":851},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Implementing toString   on enums in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>枚举是一种特殊类型的类，自Java 5引入以来，它帮助替代了传统的整型枚举模式。尽管技术上是合适的，但我们用于枚举常量的名称通常不是我们希望在日志、数据库或应用程序面向客户部分显示的名称。</p>\\n<p>在本教程中，我们将学习在Java中实现枚举的toString()方法的各种方式，以便我们可以提供替代或装饰性的名称。</p>\\n<h2>2. 默认行为</h2>\\n<p>所有枚举隐式扩展了Enum类，因此我们的枚举将从Enum类继承其默认的toString()行为：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> name<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
