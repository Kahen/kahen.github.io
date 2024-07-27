import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CJGTm_7y.js";const t={},l=e(`<hr><h1 id="java中序列化lambda表达式" tabindex="-1"><a class="header-anchor" href="#java中序列化lambda表达式"><span>Java中序列化Lambda表达式</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>通常来说，Java文档强烈不鼓励我们序列化一个lambda表达式。这是因为lambda表达式会生成合成结构。这些合成结构存在几个潜在问题：在源代码中没有对应的结构，不同Java编译器实现之间的变化，以及与不同JRE实现的兼容性问题。然而，有时序列化lambda是必要的。</p><p>在本教程中，我们将解释如何序列化lambda表达式及其背后的机制。</p><h2 id="_2-lambda和序列化" tabindex="-1"><a class="header-anchor" href="#_2-lambda和序列化"><span>2. Lambda和序列化</span></a></h2><p>当我们使用Java序列化来序列化或反序列化一个对象时，它的类和非静态字段都必须是可序列化的。否则，将导致_NotSerializableException_。同样地，<strong>在序列化lambda表达式时，我们必须确保其目标类型和捕获参数是可序列化的</strong>。</p><h3 id="_2-1-一个失败的lambda序列化示例" tabindex="-1"><a class="header-anchor" href="#_2-1-一个失败的lambda序列化示例"><span>2.1. 一个失败的Lambda序列化示例</span></a></h3><p>在源文件中，让我们使用_Runnable_接口来构建一个lambda表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NotSerializableLambdaExpression</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> <span class="token function">getLambdaExpressionObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Runnable</span> r <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;please serialize this message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> r<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尝试序列化_Runnable_对象时，我们将得到一个_NotSerializableException_。在此之前，让我们稍微解释一下。</p><p>当JVM遇到一个lambda表达式时，它将使用内置的ASM来构建一个内部类。那么这个内部类看起来如何呢？我们可以通过在命令行上指定_jdk.internal.lambda.dumpProxyClasses_属性来转储这个生成的内部类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token parameter variable">-Djdk.internal.lambda.dumpProxyClasses</span><span class="token operator">=</span>\`<span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>dump directory<span class="token operator">&gt;</span><span class="token variable">\`</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意这里：当我们用我们的目标目录替换_<code>&lt;dump directory&gt;</code>_时，这个目标目录最好是空的，因为我们的项目依赖于第三方库时，JVM可能会转储很多意想不到的生成的内部类。</p><p>转储后，我们可以使用适当的Java反编译器来检查这个生成的内部类：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/not-serializable-lambda-expression-generated-inner-class.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在上面的图片中，生成的内部类只实现了_Runnable_接口，这是lambda表达式的目标类型。此外，在_run_方法中，代码将调用_NotSerializableLambdaExpression.lambda$getLambdaExpressionObject$0_方法，这是由Java编译器生成的，表示我们的lambda表达式实现。</p><p>因为生成的内部类是我们lambda表达式的实际类，并且它没有实现_Serializable_接口，所以lambda表达式不适合序列化。</p><h3 id="_2-2-如何序列化lambda" tabindex="-1"><a class="header-anchor" href="#_2-2-如何序列化lambda"><span>2.2. 如何序列化Lambda</span></a></h3><p>此时，问题归结为：如何将_Serializable_接口添加到生成的内部类中？答案是将lambda表达式与一个结合了功能接口和_Serializable_接口的交叉类型进行强制转换。</p><p>例如，让我们将_Runnable_和_Serializable_组合成一个交叉类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Runnable</span> r <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Runnable</span> <span class="token operator">&amp;</span> <span class="token class-name">Serializable</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;please serialize this message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，如果我们尝试序列化上述_Runnable_对象，它将成功。</p><p>然而，如果我们经常这样做，它可能会引入很多样板代码。为了使代码更清晰，我们可以定义一个新的接口，它同时实现了_Runnable_和_Serializable_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">SerializableRunnable</span> <span class="token keyword">extends</span> <span class="token class-name">Runnable</span><span class="token punctuation">,</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们可以使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SerializableRunnable</span> obj <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;please serialize this message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是<strong>我们还应该小心不要捕获任何不可序列化的参数</strong>。例如，让我们定义另一个接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">SerializableConsumer</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token keyword">extends</span> <span class="token class-name">Consumer</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">,</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们可以选择_System.out::println_作为它的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SerializableConsumer</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` obj <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果，它将导致一个_NotSerializableException_。这是因为这个实现将捕获_System.out_变量作为其参数，其类是_PrintStream_，这不是可序列化的。</p><h2 id="_3-背后的机制" tabindex="-1"><a class="header-anchor" href="#_3-背后的机制"><span>3. 背后的机制</span></a></h2><p>此时，我们可能会想知道：在我们引入交叉类型后，下面发生了什么？</p><p>为了讨论的基础，让我们准备另一段代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SerializableLambdaExpression</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> <span class="token function">getLambdaExpressionObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Runnable</span> r <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Runnable</span> <span class="token operator">&amp;</span> <span class="token class-name">Serializable</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;please serialize this message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> r<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-编译后的类文件" tabindex="-1"><a class="header-anchor" href="#_3-1-编译后的类文件"><span>3.1. 编译后的类文件</span></a></h3><p>编译后，我们可以使用_javap_来检查编译后的类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>javap <span class="token parameter variable">-v</span> <span class="token parameter variable">-p</span> SerializableLambdaExpression.class
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>-v_选项将打印详细消息，而</em>-p_选项将显示私有方法。</p><p>我们可能会发现Java编译器提供了一个_$deserializeLambda$_方法，它接受一个_SerializedLambda_参数：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/deserialize-lambda-method-bytecode.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>为了可读性，让我们将上述字节码反编译成Java代码：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/deserialize-lambda-method-java-code.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>上述_$deserializeLambda$<em>方法的主要责任是构建一个对象。首先，它检查_SerializedLambda_的_getXXX_方法与lambda表达式的不同部分的详细信息。然后，如果所有条件都满足，它将调用_SerializableLambdaExpression::lambda$getLambdaExpressionObject$36ab28bd$1_方法引用来创建一个实例。否则，它将抛出一个_IllegalArgumentException</em>。</p><h3 id="_3-2-生成的内部类" tabindex="-1"><a class="header-anchor" href="#_3-2-生成的内部类"><span>3.2. 生成的内部类</span></a></h3><p>除了检查编译后的类文件外，我们还需要检查新生成的内部类。所以，让我们使用_jdk.internal.lambda.dumpProxyClasses_属性来转储生成的内部类：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/serializable-lambda-expression-generated-inner-class.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在上面的代码中，新生成的内部类实现了_Runnable_和_Serializable_接口，这意味着它适合序列化。而且，它还提供了一个额外的_writeReplace_方法。深入来看，这个方法返回了一个描述lambda表达式实现细节的_SerializedLambda_实例。</p><p>为了形成一个闭环，还缺少一件事：序列化的lambda文件。</p><h3 id="_3-3-序列化的lambda文件" tabindex="-1"><a class="header-anchor" href="#_3-3-序列化的lambda文件"><span>3.3. 序列化的Lambda文件</span></a></h3><p>由于序列化的lambda文件以二进制格式存储，我们可以使用十六进制工具来检查其内容：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/serialized-lambda-file-hex-format.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在序列化流中，十六进制“<em>AC ED</em>”（Base64中的“rO0”）是流的魔术数字，十六进制“00 05”是流版本。但是，其余数据不是人类可读的。</p><p>根据对象序列化流协议，其余数据可以被解释：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/serialized-lambda-file-parsed-format.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>从上图中，我们可能会注意到序列化的lambda文件实际上包含了_SerializedLambda_类数据。具体来说，它包含了10个字段和相应的值。而且，<strong>这些_SerializedLambda_类的字段和值是在编译后的类文件中的_$deserializeLambda$_方法和生成的内部类中的_writeReplace_方法之间的桥梁</strong>。</p><h3 id="_3-4-把所有部分结合起来" tabindex="-1"><a class="header-anchor" href="#_3-4-把所有部分结合起来"><span>3.4. 把所有部分结合起来</span></a></h3><p>现在，是时候将不同的部分结合起来了：</p><p>当我们使用_ObjectOutputStream_来序列化一个lambda表达式时，_ObjectOutputStream_会发现生成的内部类包含一个返回_SerializedLambda_实例的_writeReplace_方法。然后，_ObjectOutputStream_将序列化这个_SerializedLambda_实例而不是原始对象。</p><p>接下来，当我们使用_ObjectInputStream_来反序列化序列化的lambda文件时，会创建一个_SerializedLambda_实例。然后，<em>ObjectInputStream_将使用这个实例来调用_SerializedLambda_类中定义的_readResolve</em>。而且，<em>readResolve_方法将调用捕获类中定义的</em>$deserializeLambda$_方法。最后，我们得到了反序列化的lambda表达式。</p><p>总之，<strong>_SerializedLambda_类是lambda序列化过程的关键</strong>。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们首先查看了一个失败的lambda序列化示例，并解释了为什么它会失败。然后，我们介绍了如何使lambda表达式可序列化。最后，我们探索了lambda序列化背后的机制。</p><p>像往常一样，本教程的源代码可以在GitHub上找到。</p>`,65),p=[l];function i(o,c){return s(),n("div",null,p)}const m=a(t,[["render",i],["__file","2024-07-19-Serialize a Lambda in Java.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Serialize%20a%20Lambda%20in%20Java.html","title":"Java中序列化Lambda表达式","lang":"zh-CN","frontmatter":{"date":"2022-05-01T00:00:00.000Z","category":["Java","Serialization"],"tag":["Java","Lambda","Serialization"],"head":[["meta",{"name":"keywords","content":"Java, Lambda, Serialization, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Serialize%20a%20Lambda%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中序列化Lambda表达式"}],["meta",{"property":"og:description","content":"Java中序列化Lambda表达式 1. 概述 通常来说，Java文档强烈不鼓励我们序列化一个lambda表达式。这是因为lambda表达式会生成合成结构。这些合成结构存在几个潜在问题：在源代码中没有对应的结构，不同Java编译器实现之间的变化，以及与不同JRE实现的兼容性问题。然而，有时序列化lambda是必要的。 在本教程中，我们将解释如何序列化l..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/05/not-serializable-lambda-expression-generated-inner-class.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T09:10:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Lambda"}],["meta",{"property":"article:tag","content":"Serialization"}],["meta",{"property":"article:published_time","content":"2022-05-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T09:10:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中序列化Lambda表达式\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/05/not-serializable-lambda-expression-generated-inner-class.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/05/deserialize-lambda-method-bytecode.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/05/deserialize-lambda-method-java-code.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/05/serializable-lambda-expression-generated-inner-class.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/05/serialized-lambda-file-hex-format.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/05/serialized-lambda-file-parsed-format.png\\"],\\"datePublished\\":\\"2022-05-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T09:10:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中序列化Lambda表达式 1. 概述 通常来说，Java文档强烈不鼓励我们序列化一个lambda表达式。这是因为lambda表达式会生成合成结构。这些合成结构存在几个潜在问题：在源代码中没有对应的结构，不同Java编译器实现之间的变化，以及与不同JRE实现的兼容性问题。然而，有时序列化lambda是必要的。 在本教程中，我们将解释如何序列化l..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Lambda和序列化","slug":"_2-lambda和序列化","link":"#_2-lambda和序列化","children":[{"level":3,"title":"2.1. 一个失败的Lambda序列化示例","slug":"_2-1-一个失败的lambda序列化示例","link":"#_2-1-一个失败的lambda序列化示例","children":[]},{"level":3,"title":"2.2. 如何序列化Lambda","slug":"_2-2-如何序列化lambda","link":"#_2-2-如何序列化lambda","children":[]}]},{"level":2,"title":"3. 背后的机制","slug":"_3-背后的机制","link":"#_3-背后的机制","children":[{"level":3,"title":"3.1. 编译后的类文件","slug":"_3-1-编译后的类文件","link":"#_3-1-编译后的类文件","children":[]},{"level":3,"title":"3.2. 生成的内部类","slug":"_3-2-生成的内部类","link":"#_3-2-生成的内部类","children":[]},{"level":3,"title":"3.3. 序列化的Lambda文件","slug":"_3-3-序列化的lambda文件","link":"#_3-3-序列化的lambda文件","children":[]},{"level":3,"title":"3.4. 把所有部分结合起来","slug":"_3-4-把所有部分结合起来","link":"#_3-4-把所有部分结合起来","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721380253000,"updatedTime":1721380253000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.07,"words":1822},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Serialize a Lambda in Java.md","localizedDate":"2022年5月1日","excerpt":"<hr>\\n<h1>Java中序列化Lambda表达式</h1>\\n<h2>1. 概述</h2>\\n<p>通常来说，Java文档强烈不鼓励我们序列化一个lambda表达式。这是因为lambda表达式会生成合成结构。这些合成结构存在几个潜在问题：在源代码中没有对应的结构，不同Java编译器实现之间的变化，以及与不同JRE实现的兼容性问题。然而，有时序列化lambda是必要的。</p>\\n<p>在本教程中，我们将解释如何序列化lambda表达式及其背后的机制。</p>\\n<h2>2. Lambda和序列化</h2>\\n<p>当我们使用Java序列化来序列化或反序列化一个对象时，它的类和非静态字段都必须是可序列化的。否则，将导致_NotSerializableException_。同样地，<strong>在序列化lambda表达式时，我们必须确保其目标类型和捕获参数是可序列化的</strong>。</p>","autoDesc":true}');export{m as comp,u as data};
