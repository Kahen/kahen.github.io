import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-ConjvFaO.js";const e={},p=t(`<h1 id="java记录中重写hashcode-和equals-方法" tabindex="-1"><a class="header-anchor" href="#java记录中重写hashcode-和equals-方法"><span>Java记录中重写hashCode()和equals()方法</span></a></h1><p>Java 14引入了记录的概念，作为一种简便且更好的方式传递不可变数据对象。记录只具有一个类最基本的方法，构造函数和getter/setter，因此它是一种受限的类形式，类似于Java中的枚举。记录是一个纯数据载体，是一种用于传递数据的类，这些数据不会被修改。</p><p>在本教程中，我们将讨论如何重写记录的默认hashCode()和equals()实现。</p><p>Java对象类定义了equals()和hashCode()方法。由于Java中的所有类都继承自对象类，它们也有这些方法的默认实现。</p><p>equals()方法用于断言两个对象的等价性，其默认实现意味着如果两个对象具有相同的身份，它们就相等。hashCode()方法返回一个基于当前类实例的整数值，并与等价性的定义一起实现。</p><p>记录作为Java中类的一种受限形式，自带了equals()、hashCode()和toString()的默认实现。我们可以使用new关键字实例化记录。我们还可以使用equals()比较两个记录实例的等价性，就像比较类实例一样。</p><p>任何类型为R的记录都直接继承自java.lang.Record。默认情况下，Java为这两个方法提供了默认实现以供使用。</p><p>默认的equals()实现遵守对象equals()方法的契约。此外，当我们通过复制另一个记录实例的所有属性来创建一个新的记录实例时，这两个记录实例必须是等价的。这很重要，因为记录的概念是作为一个不可更改的数据载体。</p><p>假设我们有一个类型为Person的记录，并创建了两个记录实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token class-name">String</span> <span class="token constant">SSN</span><span class="token punctuation">,</span> <span class="token class-name">String</span> dateOfBirth<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以这样做，因为记录提供了默认构造函数，考虑了所有的记录字段。此外，我们还有一个现成的equals()用于比较Person实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoRecords_whenDefaultEquals_thenCompareEquality</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Person</span> robert <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Robert&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Frost&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;HDHDB223&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2000-01-02&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Person</span> mike <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Mike&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Adams&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ABJDJ2883&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2001-01-02&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotEquals</span><span class="token punctuation">(</span>robert<span class="token punctuation">,</span> mike<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认的hashCode()实现返回一个由记录的所有属性的哈希值组合而成的哈希码（整数），并遵循对象的哈希码契约。由相同组件创建的两个记录也必须具有相同的hashCode值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoRecords_hashCodesShouldBeSame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Person</span> robert <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Robert&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Frost&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;HDHDB223&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2000-01-02&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Person</span> robertCopy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Robert&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Frost&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;HDHDB223&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2000-01-02&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>robert<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> robertCopy<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java确实提供了覆盖equals()和hashCode()方法默认实现的能力。例如，假设我们决定，如果两个Movie记录（具有多个属性）的标题和发行年份相同，就足以断言它们的等价性。</p><p>在这种情况下，我们可以选择覆盖默认实现，该实现考虑了每个属性来断言等价性，使用我们自己的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">record</span> <span class="token class-name">Movie</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Integer</span> yearOfRelease<span class="token punctuation">,</span> <span class="token class-name">String</span> distributor<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>other <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>other <span class="token keyword">instanceof</span> <span class="token class-name">Movie</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Movie</span> movie <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Movie</span><span class="token punctuation">)</span> other<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>movie<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> movie<span class="token punctuation">.</span>yearOfRelease<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>yearOfRelease<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个实现与Java类中任何其他自定义equals()实现有些相似：</p><ul><li>如果两个实例相同，它们必须是等价的</li><li>如果另一个实例是null，则等价性失败</li><li>如果另一个实例不是同一类型，则等价性失败</li><li>在将另一个对象转换为记录类型后，如果名称和发行年份属性与当前对象相同，则它们必须是等价的</li></ul><p>然而，在检查两个Movie记录的等价性时，在发生冲突的情况下，编译器会转向hashCode()来确定等价性。因此，同样重要的是覆盖hashCode()方法的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> yearOfRelease<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以正确地测试两个Movie记录的等价性了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenTwoRecords_whenCustomImplementation_thenCompareEquality</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Movie</span> movie1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Movie</span><span class="token punctuation">(</span><span class="token string">&quot;The Batman&quot;</span><span class="token punctuation">,</span> <span class="token number">2022</span><span class="token punctuation">,</span> <span class="token string">&quot;WB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Movie</span> movie2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Movie</span><span class="token punctuation">(</span><span class="token string">&quot;The Batman&quot;</span><span class="token punctuation">,</span> <span class="token number">2022</span><span class="token punctuation">,</span> <span class="token string">&quot;Dreamworks&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>movie1<span class="token punctuation">,</span> movie2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>movie1<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> movie2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java规范期望任何记录的自定义equals()实现都必须满足规则，即记录的副本必须与原始记录等价。然而，由于Java记录旨在传递不可变数据记录，通常可以安全地使用Java提供的equals()和hashCode()的默认实现。</p><p>然而，记录是浅层不可变的。这意味着如果记录具有可变属性，例如列表，它们就不会自动变得不可变。使用默认实现，只有当两个实例的所有属性都相等时，两个记录才相等，无论属性是原始类型还是引用类型。</p><p>这对记录实例来说是一个挑战，它最好覆盖默认的equals()和hashCode()实现。这也使得它成为用作Map键的完美候选者。这意味着我们应该仔细处理具有可能的可变数据元素的记录。</p><p>在本文中，我们探讨了记录如何提供equals()和hashCode()方法的默认实现。我们还探讨了如何用我们自己的自定义实现覆盖默认实现。</p><p>我们还探讨了何时考虑覆盖默认行为。</p><p>像往常一样，所有代码示例都可以在GitHub上找到。</p>`,29),o=[p];function c(l,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-06-Overriding hashCode   And equals   For Records.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Overriding%20hashCode%20%20%20And%20equals%20%20%20For%20Records.html","title":"Java记录中重写hashCode()和equals()方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Records"],"tag":["hashCode","equals"],"head":[["meta",{"name":"keywords","content":"Java, Records, hashCode, equals, 记录, 哈希码, 等价性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Overriding%20hashCode%20%20%20And%20equals%20%20%20For%20Records.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java记录中重写hashCode()和equals()方法"}],["meta",{"property":"og:description","content":"Java记录中重写hashCode()和equals()方法 Java 14引入了记录的概念，作为一种简便且更好的方式传递不可变数据对象。记录只具有一个类最基本的方法，构造函数和getter/setter，因此它是一种受限的类形式，类似于Java中的枚举。记录是一个纯数据载体，是一种用于传递数据的类，这些数据不会被修改。 在本教程中，我们将讨论如何重写..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T02:45:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"hashCode"}],["meta",{"property":"article:tag","content":"equals"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T02:45:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java记录中重写hashCode()和equals()方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T02:45:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java记录中重写hashCode()和equals()方法 Java 14引入了记录的概念，作为一种简便且更好的方式传递不可变数据对象。记录只具有一个类最基本的方法，构造函数和getter/setter，因此它是一种受限的类形式，类似于Java中的枚举。记录是一个纯数据载体，是一种用于传递数据的类，这些数据不会被修改。 在本教程中，我们将讨论如何重写..."},"headers":[],"git":{"createdTime":1720233909000,"updatedTime":1720233909000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.54,"words":1363},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Overriding hashCode   And equals   For Records.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java 14引入了记录的概念，作为一种简便且更好的方式传递不可变数据对象。记录只具有一个类最基本的方法，构造函数和getter/setter，因此它是一种受限的类形式，类似于Java中的枚举。记录是一个纯数据载体，是一种用于传递数据的类，这些数据不会被修改。</p>\\n<p>在本教程中，我们将讨论如何重写记录的默认hashCode()和equals()实现。</p>\\n<p>Java对象类定义了equals()和hashCode()方法。由于Java中的所有类都继承自对象类，它们也有这些方法的默认实现。</p>\\n<p>equals()方法用于断言两个对象的等价性，其默认实现意味着如果两个对象具有相同的身份，它们就相等。hashCode()方法返回一个基于当前类实例的整数值，并与等价性的定义一起实现。</p>","autoDesc":true}');export{k as comp,d as data};
