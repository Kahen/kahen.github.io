import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D4B8YWfq.js";const e={},p=t(`<h1 id="java-17中的上下文特定反序列化过滤器" tabindex="-1"><a class="header-anchor" href="#java-17中的上下文特定反序列化过滤器"><span>Java 17中的上下文特定反序列化过滤器</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将学习Java的新功能——上下文特定反序列化过滤器。我们将建立一个场景，然后实际应用它来确定在我们的应用程序中每种情况应该使用哪些反序列化过滤器。</p><h2 id="_2-与jep-290的关系" tabindex="-1"><a class="header-anchor" href="#_2-与jep-290的关系"><span>2. 与JEP 290的关系</span></a></h2><p>JEP 290在Java 9中引入，通过JVM范围内的过滤器以及为每个_ObjectInputStream_实例定义过滤器的可能性，来过滤来自外部来源的反序列化。这些过滤器基于运行时参数决定允许或拒绝对象的反序列化。</p><p>反序列化不受信任数据的危险长期以来一直受到讨论，帮助解决这一问题的方法也在不断改进。因此，我们现在有更多的选项来动态选择反序列化过滤器，并且更容易创建它们。</p><h2 id="_3-jep-415中-objectinputfilter-的新方法" tabindex="-1"><a class="header-anchor" href="#_3-jep-415中-objectinputfilter-的新方法"><span>3. JEP 415中_ObjectInputFilter_的新方法</span></a></h2><p>为了提供更多关于何时以及如何定义反序列化过滤器的选项，JEP 415在Java 17中引入了指定每次反序列化发生时都会调用的JVM范围内的过滤器工厂的能力。这样，我们的过滤解决方案就不会再过于严格或过于宽泛了。</p><p>此外，为了提供更多的上下文控制，还有新的方法来简化过滤器的创建和组合：</p><ul><li><em>rejectFilter(Predicate<code>&lt;Class&lt;?&gt;</code>&gt; predicate, Status otherStatus)</em>: 如果谓词返回_true_，则拒绝反序列化，否则返回_otherStatus_</li><li><em>allowFilter(Predicate<code>&lt;Class&lt;?&gt;</code>&gt; predicate, Status otherStatus)</em>: 如果谓词返回_true_，则允许反序列化，否则返回_otherStatus_</li><li><em>rejectUndecidedClass(ObjectInputFilter filter)</em>: 将传递的_filter_中的每个_UNDECIDED_返回映射为_REJECTED_，有一些例外情况</li><li><em>merge(ObjectInputFilter filter, ObjectInputFilter anotherFilter)</em>: 尝试测试两个过滤器，但在获得第一个_REJECTED_状态时返回_REJECTED_。它对_anotherFilter_也是空安全的，返回_filter_本身而不是一个新的组合过滤器</li></ul><p><strong>注意：_rejectFilter()<em>和_allowFilter()<em>如果关于正在反序列化的类的元信息是_null</em>，则返回_UNDECIDED</em>。</strong></p><h2 id="_4-构建我们的场景和设置" tabindex="-1"><a class="header-anchor" href="#_4-构建我们的场景和设置"><span>4. 构建我们的场景和设置</span></a></h2><p>为了说明我们的反序列化过滤器工厂的工作，我们的场景将涉及一些在其他地方序列化的POJOs，并通过我们的应用程序中的几个不同的服务类进行反序列化。我们将使用这些来模拟我们可以阻止来自外部来源的潜在不安全反序列化的情况。最终，我们将学习如何定义参数以检测序列化内容中的意外属性。</p><p>让我们从我们的POJOs的标记接口开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ContextSpecific</span> <span class="token keyword">extends</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首先，我们的_Sample_类将包含在反序列化期间可以通过_ObjectInputFilter_进行检查的基本属性，如数组和嵌套对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sample</span> <span class="token keyword">implements</span> <span class="token class-name">ContextSpecific</span><span class="token punctuation">,</span> <span class="token class-name">Comparable</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Sample</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">NestedSample</span> nested<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Sample</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Sample</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>array <span class="token operator">=</span> array<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Sample</span><span class="token punctuation">(</span><span class="token class-name">NestedSample</span> nested<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>nested <span class="token operator">=</span> nested<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 标准getter和setter</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">Sample</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> o<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只实现_Comparable_，以便稍后将实例添加到_TreeSet_中。这将帮助展示代码如何被间接执行。其次，我们将使用我们的_NestedSample_类来改变我们反序列化对象的深度，我们将使用它来设置对象图在反序列化之前可以有多深的限制：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NestedSample</span> <span class="token keyword">implements</span> <span class="token class-name">ContextSpecific</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Sample</span> optional<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">NestedSample</span><span class="token punctuation">(</span><span class="token class-name">Sample</span> optional<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>optional <span class="token operator">=</span> optional<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最后，让我们创建一个简单的利用示例来稍后过滤。它在其_toString()_和_compareTo()_方法中包含副作用，例如，可以被_TreeSet_间接调用，每次我们向其中添加项目时：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SampleExploit</span> <span class="token keyword">extends</span> <span class="token class-name">Sample</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">SampleExploit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">&quot;exploit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">maliciousCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;exploit executed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">maliciousCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">&quot;exploit&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">Sample</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">maliciousCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，这个简单的例子仅用于说明目的，并不打算模仿现实世界的利用。</p><h3 id="_4-1-序列化和反序列化工具" tabindex="-1"><a class="header-anchor" href="#_4-1-序列化和反序列化工具"><span>4.1. 序列化和反序列化工具</span></a></h3><p>为了便于我们稍后的测试案例，让我们创建一些工具来序列化和反序列化我们的对象。我们从简单的序列化开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SerializationUtils</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token class-name">Object</span> object<span class="token punctuation">,</span> <span class="token class-name">OutputStream</span> outStream<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ObjectOutputStream</span> objStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectOutputStream</span><span class="token punctuation">(</span>outStream<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            objStream<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>再次，为了帮助我们的测试，我们将创建一个方法，将所有未被拒绝的对象反序列化到一个集合中，以及一个_deserialize()_方法，它可以选择性地接收另一个过滤器：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeserializationUtils</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> <span class="token function">deserialize</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> inStream<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">deserialize</span><span class="token punctuation">(</span>inStream<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> <span class="token function">deserialize</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> inStream<span class="token punctuation">,</span> <span class="token class-name">ObjectInputFilter</span> filter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ObjectInputStream</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span>inStream<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>filter <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                in<span class="token punctuation">.</span><span class="token function">setObjectInputFilter</span><span class="token punctuation">(</span>filter<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> in<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InvalidClassException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Set</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ContextSpecific</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">deserializeIntoSet</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> inputStreams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">deserializeIntoSet</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> inputStreams<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Set</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ContextSpecific</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">deserializeIntoSet</span><span class="token punctuation">(</span>
        <span class="token class-name">ObjectInputFilter</span> filter<span class="token punctuation">,</span> <span class="token class-name">InputStream</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> inputStreams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Set</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ContextSpecific</span><span class="token punctuation">&gt;</span></span>\`\`\` set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream <span class="token operator">:</span> inputStreams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Object</span> object <span class="token operator">=</span> <span class="token function">deserialize</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">,</span> filter<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>object <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">ContextSpecific</span><span class="token punctuation">)</span> object<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> set<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>请注意，对于我们的场景，当发生_InvalidClassException_时，我们返回_null_。这种异常每次在任何过滤器拒绝反序列化时都会抛出。</strong> 这样，我们就不会破坏_deserializeIntoSet()_，因为我们只对收集成功的反序列化感兴趣，而丢弃其他的。</p><h3 id="_4-2-创建过滤器" tabindex="-1"><a class="header-anchor" href="#_4-2-创建过滤器"><span>4.2. 创建过滤器</span></a></h3><p>在构建过滤器工厂之前，我们需要一些过滤器可供选择。<strong>我们将使用_ObjectInputFilter.Config.createFilter()_创建一些简单的过滤器。它接收一个接受或拒绝的包的模式，以及在对象反序列化之前要检查的一些参数：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FilterUtils</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEFAULT_PACKAGE_PATTERN</span> <span class="token operator">=</span> <span class="token string">&quot;java.base/*;!*&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">POJO_PACKAGE</span> <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.deserializationfilters.pojo&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先设置_DEFAULT_PACKAGE_PATTERN_，接受来自“java.base”模块的任何类，并拒绝其他所有。然后，我们设置_POJO_PACKAGE_，包含需要反序列化的应用程序中的类的包。</p><p>有了这些信息，让我们创建方法作为我们过滤器的基础。<strong>使用_baseFilter()_，我们将接收我们想要检查的参数的名称，以及一个最大值：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ObjectInputFilter</span> <span class="token function">baseFilter</span><span class="token punctuation">(</span><span class="token class-name">String</span> parameter<span class="token punctuation">,</span> <span class="token keyword">int</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">ObjectInputFilter<span class="token punctuation">.</span>Config</span><span class="token punctuation">.</span><span class="token function">createFilter</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>
        <span class="token string">&quot;%s=%d;%s.**;%s&quot;</span><span class="token punctuation">,</span> parameter<span class="token punctuation">,</span> max<span class="token punctuation">,</span> <span class="token constant">POJO_PACKAGE</span><span class="token punctuation">,</span> <span class="token constant">DEFAULT_PACKAGE_PATTERN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_fallbackFilter()_，我们将创建一个更严格的过滤器，只接受_DEFAULT_PACKAGE_PATTERN_中的类。它将用于我们的服务类之外的反序列化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ObjectInputFilter</span> <span class="token function">fallbackFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">ObjectInputFilter<span class="token punctuation">.</span>Config</span><span class="token punctuation">.</span><span class="token function">createFilter</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s&quot;</span><span class="token punctuation">,</span> <span class="token constant">DEFAULT_PACKAGE_PATTERN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最后，让我们编写我们将用于限制读取字节数、我们对象中的数组大小以及反序列化时对象图的最大深度的过滤器：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ObjectInputFilter</span> <span class="token function">safeSizeFilter</span><span class="token punctuation">(</span><span class="token keyword">int</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">baseFilter</span><span class="token punctuation">(</span><span class="token string">&quot;maxbytes&quot;</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ObjectInputFilter</span> <span class="token function">safeArrayFilter</span><span class="token punctuation">(</span><span class="token keyword">int</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">baseFilter</span><span class="token punctuation">(</span><span class="token string">&quot;maxarray&quot;</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ObjectInputFilter</span> <span class="token function">safeDepthFilter</span><span class="token punctuation">(</span><span class="token keyword">int</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">baseFilter</span><span class="token punctuation">(</span><span class="token string">&quot;maxdepth&quot;</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了所有这些设置，我们准备开始编写我们的过滤器工厂。</p><h2 id="_5-创建反序列化过滤器工厂" tabindex="-1"><a class="header-anchor" href="#_5-创建反序列化过滤器工厂"><span>5. 创建反序列化过滤器工厂</span></a></h2><p>反序列化过滤器</p>`,41),c=[p];function o(l,i){return a(),s("div",null,c)}const k=n(e,[["render",o],["__file","2024-06-27-Context Specific Deserialization Filters in Java 17.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Context%20Specific%20Deserialization%20Filters%20in%20Java%2017.html","title":"Java 17中的上下文特定反序列化过滤器","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","JEP 290","JEP 415"],"tag":["Java 17","反序列化","安全性"],"head":[["meta",{"name":"keywords","content":"Java, JEP 290, JEP 415, 反序列化过滤器, 安全性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Context%20Specific%20Deserialization%20Filters%20in%20Java%2017.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 17中的上下文特定反序列化过滤器"}],["meta",{"property":"og:description","content":"Java 17中的上下文特定反序列化过滤器 1. 引言 在本教程中，我们将学习Java的新功能——上下文特定反序列化过滤器。我们将建立一个场景，然后实际应用它来确定在我们的应用程序中每种情况应该使用哪些反序列化过滤器。 2. 与JEP 290的关系 JEP 290在Java 9中引入，通过JVM范围内的过滤器以及为每个_ObjectInputStrea..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T03:32:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 17"}],["meta",{"property":"article:tag","content":"反序列化"}],["meta",{"property":"article:tag","content":"安全性"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T03:32:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 17中的上下文特定反序列化过滤器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T03:32:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 17中的上下文特定反序列化过滤器 1. 引言 在本教程中，我们将学习Java的新功能——上下文特定反序列化过滤器。我们将建立一个场景，然后实际应用它来确定在我们的应用程序中每种情况应该使用哪些反序列化过滤器。 2. 与JEP 290的关系 JEP 290在Java 9中引入，通过JVM范围内的过滤器以及为每个_ObjectInputStrea..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 与JEP 290的关系","slug":"_2-与jep-290的关系","link":"#_2-与jep-290的关系","children":[]},{"level":2,"title":"3. JEP 415中_ObjectInputFilter_的新方法","slug":"_3-jep-415中-objectinputfilter-的新方法","link":"#_3-jep-415中-objectinputfilter-的新方法","children":[]},{"level":2,"title":"4. 构建我们的场景和设置","slug":"_4-构建我们的场景和设置","link":"#_4-构建我们的场景和设置","children":[{"level":3,"title":"4.1. 序列化和反序列化工具","slug":"_4-1-序列化和反序列化工具","link":"#_4-1-序列化和反序列化工具","children":[]},{"level":3,"title":"4.2. 创建过滤器","slug":"_4-2-创建过滤器","link":"#_4-2-创建过滤器","children":[]}]},{"level":2,"title":"5. 创建反序列化过滤器工厂","slug":"_5-创建反序列化过滤器工厂","link":"#_5-创建反序列化过滤器工厂","children":[]}],"git":{"createdTime":1719459137000,"updatedTime":1719459137000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.91,"words":1774},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Context Specific Deserialization Filters in Java 17.md","localizedDate":"2024年6月27日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将学习Java的新功能——上下文特定反序列化过滤器。我们将建立一个场景，然后实际应用它来确定在我们的应用程序中每种情况应该使用哪些反序列化过滤器。</p>\\n<h2>2. 与JEP 290的关系</h2>\\n<p>JEP 290在Java 9中引入，通过JVM范围内的过滤器以及为每个_ObjectInputStream_实例定义过滤器的可能性，来过滤来自外部来源的反序列化。这些过滤器基于运行时参数决定允许或拒绝对象的反序列化。</p>\\n<p>反序列化不受信任数据的危险长期以来一直受到讨论，帮助解决这一问题的方法也在不断改进。因此，我们现在有更多的选项来动态选择反序列化过滤器，并且更容易创建它们。</p>","autoDesc":true}');export{k as comp,d as data};
