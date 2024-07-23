import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-LwwahXlT.js";const e={},o=t(`<hr><h1 id="从类外部调用类的私有方法-baeldung-关于-kotlin-1-引言" tabindex="-1"><a class="header-anchor" href="#从类外部调用类的私有方法-baeldung-关于-kotlin-1-引言"><span>从类外部调用类的私有方法 | Baeldung 关于 Kotlin## 1. 引言</span></a></h1><p>在 Kotlin 中，私有方法通常无法从类外部访问。这是封装和数据隐藏的有用特性，但有时我们可能需要从类外部调用私有方法。</p><p>在本教程中，我们将探讨从类外部调用类的私有方法的各种方法。</p><h2 id="_2-使用公共方法" tabindex="-1"><a class="header-anchor" href="#_2-使用公共方法"><span>2. 使用公共方法</span></a></h2><p>根据定义，私有方法只能在声明它们的类内部访问。</p><p>从类外部调用类的私有方法的一个简单方法是创建一个调用私有方法的公共方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> MyPublicClass <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">privateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;这是一个私有方法&quot;</span></span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">callPrivateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">privateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们创建了一个公共方法 <code>callPrivateMethod()</code>，它简单地调用 <code>privateMethod()</code>。我们可以从类外部访问公共方法，因此通过这种方式，<strong>我们可以间接调用私有方法</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用公共方法调用私有方法\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> obj <span class="token operator">=</span> <span class="token function">MyPublicClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;这是一个私有方法&quot;</span></span><span class="token punctuation">,</span> obj<span class="token punctuation">.</span><span class="token function">callPrivateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>但如果我们想直接从类外部调用我们的私有方法，我们需要采取其他选项。</strong></p><h2 id="_3-使用反射" tabindex="-1"><a class="header-anchor" href="#_3-使用反射"><span>3. 使用反射</span></a></h2><p>我们将要探索的第二种方法涉及使用反射。<strong>反射是一个功能，它允许我们检查和修改程序的运行时行为</strong>。</p><p>为了更好地理解这种方法，让我们考虑自定义类 <code>MyClass</code>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> MyClass <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">privateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;这是一个私有方法&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个包含名为 <code>privateMethod()</code> 的私有方法的简单类。</p><p>现在，让我们看看如何使用反射从 <code>MyClass</code> 类中访问这个私有方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">testPrivateFunctionUsingReflection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> obj <span class="token operator">=</span> <span class="token function">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> privateMethod <span class="token operator">=</span> MyClass<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span><span class="token function">getDeclaredMethod</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;privateMethod&quot;</span></span><span class="token punctuation">)</span>
    privateMethod<span class="token punctuation">.</span>isAccessible <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">val</span> output <span class="token operator">=</span> privateMethod<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;这是一个私有方法&quot;</span></span><span class="token punctuation">,</span> output<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们创建了 <code>MyClass</code> 的一个实例，并使用反射访问私有方法 <code>privateMethod()</code>。</p><p><strong>首先，我们使用 <code>getDeclaredMethod()</code> 方法获取方法的引用，然后我们将其 <code>isAccessible</code> 属性设置为使其可访问</strong>。最后，我们通过调用 <code>invoke()</code> 调用私有方法，并断言它返回正确的字符串。</p><h2 id="_4-使用内部类" tabindex="-1"><a class="header-anchor" href="#_4-使用内部类"><span>4. 使用内部类</span></a></h2><p>从类外部调用私有方法的另一种有趣的方法是使用嵌套或内部类。内部类是定义在另一个类内的类。</p><p>让我们考虑包含内部类的 <code>MyClassWithInnerClass</code> 类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> MyClassWithInnerClass <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">privateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;这是一个私有方法&quot;</span></span>
    <span class="token punctuation">}</span>

    <span class="token keyword">inner</span> <span class="token keyword">class</span> MyInnerClass <span class="token punctuation">{</span>
        <span class="token keyword">fun</span> <span class="token function">callPrivateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">privateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码片段中，我们定义了 <code>MyClassWithInnerClass</code>，其中包含一个返回字符串的私有方法 <code>privateMethod()</code>。<strong>接下来，我们定义了一个内部类 <code>MyInnerClass</code>，它有一个公共方法 <code>callPrivateMethod()</code>，其唯一的任务是调用 <code>privateMethod()</code> 方法</strong>。</p><p>让我们测试这种方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用内部类调用私有方法\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> obj <span class="token operator">=</span> <span class="token function">MyClassWithInnerClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> innerObj <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">MyInnerClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> output <span class="token operator">=</span> innerObj<span class="token punctuation">.</span><span class="token function">callPrivateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;这是一个私有方法&quot;</span></span><span class="token punctuation">,</span> output<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们创建了 <code>MyClassWithInnerClass</code> 的一个实例和一个 <code>MyInnerClass</code> 的实例。然后我们调用公共方法 <code>callPrivateMethod()</code> 来访问 <code>MyClassWithInnerClass</code> 的私有方法。最后，我们断言私有方法返回的字符串符合我们的预期。</p><p>注意，内部类之所以能够按所示工作，是因为 <strong><em>MyInnerClass</em> 从技术上是 <em>MyClassWithInnerClass</em> 的成员</strong>，因此它被允许调用其父类的私有方法。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了从类外部访问类的私有方法的各种方式。我们展示了每种方法的不同场景。同样重要的是，我们应该根据项目需求决定使用哪种方法，因为有些方法可能对特定项目更方便。</p><p>如往常一样，代码样本和相关的测试用例可以在 GitHub 上找到。</p>`,32),p=[o];function l(i,c){return a(),s("div",null,p)}const d=n(e,[["render",l],["__file","2024-07-18-Calling Private Methods of a Class From Outside the Class.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Calling%20Private%20Methods%20of%20a%20Class%20From%20Outside%20the%20Class.html","title":"从类外部调用类的私有方法 | Baeldung 关于 Kotlin## 1. 引言","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","Reflection","Inner Class","Private Methods"],"head":[["meta",{"name":"keywords","content":"Kotlin, Reflection, Inner Class, Private Methods"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Calling%20Private%20Methods%20of%20a%20Class%20From%20Outside%20the%20Class.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从类外部调用类的私有方法 | Baeldung 关于 Kotlin## 1. 引言"}],["meta",{"property":"og:description","content":"从类外部调用类的私有方法 | Baeldung 关于 Kotlin## 1. 引言 在 Kotlin 中，私有方法通常无法从类外部访问。这是封装和数据隐藏的有用特性，但有时我们可能需要从类外部调用私有方法。 在本教程中，我们将探讨从类外部调用类的私有方法的各种方法。 2. 使用公共方法 根据定义，私有方法只能在声明它们的类内部访问。 从类外部调用类的私..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T12:31:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Reflection"}],["meta",{"property":"article:tag","content":"Inner Class"}],["meta",{"property":"article:tag","content":"Private Methods"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T12:31:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从类外部调用类的私有方法 | Baeldung 关于 Kotlin## 1. 引言\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T12:31:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从类外部调用类的私有方法 | Baeldung 关于 Kotlin## 1. 引言 在 Kotlin 中，私有方法通常无法从类外部访问。这是封装和数据隐藏的有用特性，但有时我们可能需要从类外部调用私有方法。 在本教程中，我们将探讨从类外部调用类的私有方法的各种方法。 2. 使用公共方法 根据定义，私有方法只能在声明它们的类内部访问。 从类外部调用类的私..."},"headers":[{"level":2,"title":"2. 使用公共方法","slug":"_2-使用公共方法","link":"#_2-使用公共方法","children":[]},{"level":2,"title":"3. 使用反射","slug":"_3-使用反射","link":"#_3-使用反射","children":[]},{"level":2,"title":"4. 使用内部类","slug":"_4-使用内部类","link":"#_4-使用内部类","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721305903000,"updatedTime":1721305903000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.27,"words":981},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Calling Private Methods of a Class From Outside the Class.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>从类外部调用类的私有方法 | Baeldung 关于 Kotlin## 1. 引言</h1>\\n<p>在 Kotlin 中，私有方法通常无法从类外部访问。这是封装和数据隐藏的有用特性，但有时我们可能需要从类外部调用私有方法。</p>\\n<p>在本教程中，我们将探讨从类外部调用类的私有方法的各种方法。</p>\\n<h2>2. 使用公共方法</h2>\\n<p>根据定义，私有方法只能在声明它们的类内部访问。</p>\\n<p>从类外部调用类的私有方法的一个简单方法是创建一个调用私有方法的公共方法：</p>\\n<div class=\\"language-kotlin\\" data-ext=\\"kt\\" data-title=\\"kt\\"><pre class=\\"language-kotlin\\"><code><span class=\\"token keyword\\">class</span> MyPublicClass <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">fun</span> <span class=\\"token function\\">privateMethod</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">:</span> String <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token string-literal singleline\\"><span class=\\"token string\\">\\"这是一个私有方法\\"</span></span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">fun</span> <span class=\\"token function\\">callPrivateMethod</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">:</span> String <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token function\\">privateMethod</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
