import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as t}from"./app-WRJux_nM.js";const e={},l=t(`<hr><h1 id="从包类名字符串获取-kotlin-kclass-的方法" tabindex="-1"><a class="header-anchor" href="#从包类名字符串获取-kotlin-kclass-的方法"><span>从包类名字符串获取 Kotlin KClass 的方法</span></a></h1><p>在本教程中，我们将探讨在 Kotlin 中从包类名字符串获取 KClass 的不同方法。无论是动态实例化还是方法调用，将类名字符串转换为其对应的 KClass 对象的能力至关重要。KClass 对象在运行时表示 Kotlin 类，并且可以通过几种策略获得。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在 Kotlin 中工作时，有时需要从包类名字符串获取 KClass 实例。无论是为了动态实例化还是方法调用，将类名字符串转换为其对应的 KClass 对象的能力至关重要。KClass 对象在运行时表示 Kotlin 类，并且可以通过几种策略获得。</p><h2 id="_2-使用-class-forname-方法" tabindex="-1"><a class="header-anchor" href="#_2-使用-class-forname-方法"><span>2. 使用 Class.forName() 方法</span></a></h2><p>Java 的反射 API 通过 Class.forName() 方法提供了从类名字符串获取 KClass 的最直接方式。一旦我们有了类，我们可以使用 kotlin 属性来获取 KClass 实例：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">getClassUsingForName</span><span class="token punctuation">(</span>className<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> KClass\`\`\`<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span>\`\`\`<span class="token operator">?</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Class<span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span><span class="token punctuation">.</span>kotlin
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用这个辅助方法通过类名获取任何类的 KClass 实例。<strong>Class.forName() 方法根据提供的类名字符串在运行时动态加载类。</strong></p><p>让我们验证我们的 getClassUsingForName() 辅助方法的行为。我们提供给它一个类名，并断言我们获得了正确的 KClass：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用 forName 方法从包类名获取 KClass\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> className <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.obtainKclassFromPackageClassName.ClassExample&quot;</span></span>

    <span class="token keyword">val</span> kClass <span class="token operator">=</span> <span class="token function">getClassUsingForName</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>ClassExample<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> kClass<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，如果找不到类，这种方法会抛出 ClassNotFoundException：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用 forName 方法从包类名获取 KClass 并且类不存在\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> notClass <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.obtainKclassFromPackageClassName.NotAClass&quot;</span></span>

    <span class="token keyword">val</span> exception <span class="token operator">=</span> assertThrows\`\`<span class="token operator">&lt;</span>ClassNotFoundException<span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
        <span class="token function">getClassUsingForName</span><span class="token punctuation">(</span>notClass<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.obtainKclassFromPackageClassName.NotAClass&quot;</span></span><span class="token punctuation">,</span> exception<span class="token punctuation">.</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用-classloader-loadclass-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-classloader-loadclass-方法"><span>3. 使用 ClassLoader.loadClass() 方法</span></a></h2><p>另一种从包类名字符串获取 KClass 实例的方法是使用 ClassLoader.loadClass() 方法：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">getClassFromLoader</span><span class="token punctuation">(</span>className<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> KClass\`\`\`<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span>\`\`\`<span class="token operator">?</span> <span class="token punctuation">{</span>
    ClassLoader<span class="token punctuation">.</span><span class="token function">getSystemClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">loadClass</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span><span class="token punctuation">.</span>kotlin
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通过使用系统类加载器的 loadClass() 方法，我们动态加载类，然后检索其 KClass 对象：</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用类加载器从包类名获取 KClass\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> className <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.obtainKclassFromPackageClassName.ClassExample&quot;</span></span>

    <span class="token keyword">val</span> kClass <span class="token operator">=</span> <span class="token function">getClassFromLoader</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>ClassExample<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> kClass<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这验证了 getClassFromLoader() 函数通过完全限定名成功加载了 KClass。</p><p>同样，当我们使用不存在的类名时，我们的辅助方法会抛出 ClassNotFoundException：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用类加载器从包类名获取 KClass 并且类不存在\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> notClass <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.obtainKclassFromPackageClassName.NotAClass&quot;</span></span>

    <span class="token keyword">val</span> exception <span class="token operator">=</span> assertThrows\`\`<span class="token operator">&lt;</span>ClassNotFoundException<span class="token operator">&gt;</span>\`\` <span class="token punctuation">{</span>
        <span class="token function">getClassFromLoader</span><span class="token punctuation">(</span>notClass<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.obtainKclassFromPackageClassName.NotAClass&quot;</span></span><span class="token punctuation">,</span> exception<span class="token punctuation">.</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-classgraph-库" tabindex="-1"><a class="header-anchor" href="#_4-使用-classgraph-库"><span>4. 使用 ClassGraph 库</span></a></h2><p>最后，ClassGraph 库提供了另一种从类名字符串获取类信息的方法。<strong>ClassGraph 提供了扫描类路径和访问类元数据的实用工具：</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">getClassUsingClassGraph</span><span class="token punctuation">(</span>className<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> KClass\`\`\`<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span>\`\`\`<span class="token operator">?</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> classInfo<span class="token operator">:</span> ClassInfo<span class="token operator">?</span> <span class="token operator">=</span> <span class="token function">ClassGraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">addClassLoader</span><span class="token punctuation">(</span>ClassLoader<span class="token punctuation">.</span><span class="token function">getSystemClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">enableClassInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">getClassInfo</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span>

    <span class="token keyword">return</span> classInfo<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">loadClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span>kotlin
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用 ClassGraph 库，我们的辅助方法通过其名称加载类。</strong> 具体来说，我们通过调用 getClassInfo() 方法来检查提供的类名是否存在。最后，我们将获得相应的 KClass：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用类路径从包类名获取 KClass\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> className <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.obtainKclassFromPackageClassName.ClassExample&quot;</span></span>
    <span class="token keyword">val</span> kClass <span class="token operator">=</span> <span class="token function">getClassUsingClassGraph</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>ClassExample<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> kClass<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果提供的类名不存在，我们将收到 null 而不是：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`使用类路径从包类名获取 KClass 并且类不存在\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> notClass <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;com.baeldung.obtainKclassFromPackageClassName.NotAClass&quot;</span></span>
    <span class="token keyword">val</span> kClass <span class="token operator">=</span> <span class="token function">getClassUsingClassGraph</span><span class="token punctuation">(</span>notClass<span class="token punctuation">)</span>

    <span class="token function">assertNull</span><span class="token punctuation">(</span>kClass<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了从包类名字符串获取 KClass 对象的不同方法。我们从 Java 核心策略开始，使用了传统的 Class.forName() 和 ClassLoader 方法。最后，我们查看了 ClassGraph 库，以防我们想要更高级的实用工具。每种方法都根据项目的要求和偏好提供了不同的优势。</p><p>通过掌握这些技术，我们可以从它们的完全限定包字符串动态访问 Kotlin 类进行动态实例化、方法调用或类路径扫描。</p><p>如往常一样，本文中使用的全部源代码可在 GitHub 上获取。</p>`,32),o=[l];function p(i,c){return n(),a("div",null,o)}const d=s(e,[["render",p],["__file","2024-06-20-Getting a Kotlin KClass from a Package Class Name String.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Getting%20a%20Kotlin%20KClass%20from%20a%20Package%20Class%20Name%20String.html","title":"从包类名字符串获取 Kotlin KClass 的方法","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["KClass","Reflection"],"head":[["meta",{"name":"keywords","content":"Kotlin, KClass, Reflection, Dynamic Instantiation, Method Invocation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Getting%20a%20Kotlin%20KClass%20from%20a%20Package%20Class%20Name%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从包类名字符串获取 Kotlin KClass 的方法"}],["meta",{"property":"og:description","content":"从包类名字符串获取 Kotlin KClass 的方法 在本教程中，我们将探讨在 Kotlin 中从包类名字符串获取 KClass 的不同方法。无论是动态实例化还是方法调用，将类名字符串转换为其对应的 KClass 对象的能力至关重要。KClass 对象在运行时表示 Kotlin 类，并且可以通过几种策略获得。 1. 引言 在 Kotlin 中工作时，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"KClass"}],["meta",{"property":"article:tag","content":"Reflection"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从包类名字符串获取 Kotlin KClass 的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从包类名字符串获取 Kotlin KClass 的方法 在本教程中，我们将探讨在 Kotlin 中从包类名字符串获取 KClass 的不同方法。无论是动态实例化还是方法调用，将类名字符串转换为其对应的 KClass 对象的能力至关重要。KClass 对象在运行时表示 Kotlin 类，并且可以通过几种策略获得。 1. 引言 在 Kotlin 中工作时，..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用 Class.forName() 方法","slug":"_2-使用-class-forname-方法","link":"#_2-使用-class-forname-方法","children":[]},{"level":2,"title":"3. 使用 ClassLoader.loadClass() 方法","slug":"_3-使用-classloader-loadclass-方法","link":"#_3-使用-classloader-loadclass-方法","children":[]},{"level":2,"title":"4. 使用 ClassGraph 库","slug":"_4-使用-classgraph-库","link":"#_4-使用-classgraph-库","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.26,"words":977},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Getting a Kotlin KClass from a Package Class Name String.md","localizedDate":"2024年6月20日","excerpt":"<hr>\\n<h1>从包类名字符串获取 Kotlin KClass 的方法</h1>\\n<p>在本教程中，我们将探讨在 Kotlin 中从包类名字符串获取 KClass 的不同方法。无论是动态实例化还是方法调用，将类名字符串转换为其对应的 KClass 对象的能力至关重要。KClass 对象在运行时表示 Kotlin 类，并且可以通过几种策略获得。</p>\\n<h2>1. 引言</h2>\\n<p>在 Kotlin 中工作时，有时需要从包类名字符串获取 KClass 实例。无论是为了动态实例化还是方法调用，将类名字符串转换为其对应的 KClass 对象的能力至关重要。KClass 对象在运行时表示 Kotlin 类，并且可以通过几种策略获得。</p>","autoDesc":true}');export{d as comp,k as data};
