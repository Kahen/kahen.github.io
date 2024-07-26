import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-8nJ1rqSf.js";const t={},o=e(`<h1 id="jdk-中的-com-sun-proxy-proxy-类是什么" tabindex="-1"><a class="header-anchor" href="#jdk-中的-com-sun-proxy-proxy-类是什么"><span>JDK 中的 com.sun.proxy.$Proxy 类是什么？</span></a></h1><p>当我们使用动态代理时，JDK 会动态生成一个 <em>$Proxy</em> 类。通常，这个 <em>$Proxy</em> 类的完全限定类名类似于 <em>com.sun.proxy.$Proxy0</em>。正如 Java 文档所说，“$Proxy” 是代理类的保留名称前缀。</p><p>在本教程中，我们将探索这个 <em>$Proxy</em> 类。</p><p>在开始之前，让我们区分一下 <em>java.lang.reflect.Proxy</em> 类和 <em>$Proxy</em> 类。<em>java.lang.reflect.Proxy</em> 是 JDK 内置的类。与之相反，<strong><em>$Proxy</em> 类是在运行时动态生成的</strong>。从类层次结构的角度来看，<em>$Proxy</em> 类继承了 <em>java.lang.reflect.Proxy</em> 类。</p><h3 id="_2-1-动态代理示例" tabindex="-1"><a class="header-anchor" href="#_2-1-动态代理示例"><span>2.1. 动态代理示例</span></a></h3><p>为了讨论的基础，我们定义了两个接口：<em>BasicOperation</em> 和 <em>AdvancedOperation</em>。<em>BasicOperation</em> 接口包含了 <em>add</em> 和 <em>subtract</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BasicOperation</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> <span class="token function">subtract</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而 <em>AdvancedOperation</em> 接口有 <em>multiply</em> 和 <em>divide</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AdvancedOperation</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">multiply</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> <span class="token function">divide</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要获取一个新生成的代理类——<em>$Proxy</em> 类——我们可以调用 <em>Proxy::getProxyClass</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ClassLoader</span> classLoader <span class="token operator">=</span> <span class="token class-name">ClassLoader</span><span class="token punctuation">.</span><span class="token function">getSystemClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Class</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\`\`<span class="token punctuation">[</span><span class="token punctuation">]</span> interfaces <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">BasicOperation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">AdvancedOperation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">Class</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\`\` proxyClass <span class="token operator">=</span> <span class="token class-name">Proxy</span><span class="token punctuation">.</span><span class="token function">getProxyClass</span><span class="token punctuation">(</span>classLoader<span class="token punctuation">,</span> interfaces<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<strong>上述 <em>proxyClass</em> 只存在于运行中的 JVM 中，我们不能直接查看其类成员</strong>。</p><h3 id="_2-2-转储-proxy-类" tabindex="-1"><a class="header-anchor" href="#_2-2-转储-proxy-类"><span>2.2. 转储 <em>$Proxy</em> 类</span></a></h3><p>为了仔细检查这个 <em>$Proxy</em> 类，我们最好将其转储到磁盘。在使用 Java 8 时，我们可以在命令行指定 “<em>sun.misc.ProxyGenerator.saveGeneratedFiles</em>” 选项：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token parameter variable">-Dsun.misc.ProxyGenerator.saveGeneratedFiles</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者我们可以通过调用 <em>System::setProperty</em> 方法来设置这个选项：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;sun.misc.ProxyGenerator.saveGeneratedFiles&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 Java 9 及更高版本中，我们应该使用 “<em>jdk.proxy.ProxyGenerator.saveGeneratedFiles</em>” 选项代替。为什么会有这样的差异？由于 Java 模块系统，<em>ProxyGenerator</em> 类的包已经改变了。在 Java 8 中，<em>ProxyGenerator</em> 在 “<em>sun.misc</em>” 包中；然而，自 Java 9 以来，<em>ProxyGenerator</em> 已经移动到了 “<em>java.lang.reflect</em>” 包中。</p><p>如果我们仍然不知道哪个选项合适，我们可以查看 <em>ProxyGenerator</em> 类的 <em>saveGeneratedFiles</em> 字段以确定正确的选项。</p><p>注意这里：<strong><em>ProxyGenerator</em> 类只读取这个属性一次</strong>。这意味着 <em>System::setProperty</em> 方法在 JVM 显式或隐式生成任何 <em>$Proxy</em> 类后将无效。具体来说，调用 <em>Proxy::getProxyClass</em> 或 <em>Proxy::newProxyInstance</em> 方法将显式生成 <em>$Proxy</em> 类。另一方面，当我们读取注解时，尤其是在单元测试框架中，JVM 将隐式或自动生成 <em>$Proxy</em> 类来表示注解实例。</p><p>转储的类文件的确切位置直接关系到其完全限定类名。例如，如果新生成的类名是 “<em>com.sun.proxy.$Proxy0</em>”，那么转储的类文件将是当前目录下的 “<em>com/sun/proxy/$Proxy0.class</em>”：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/p1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_2-3-proxy-类的成员" tabindex="-1"><a class="header-anchor" href="#_2-3-proxy-类的成员"><span>2.3. <em>$Proxy</em> 类的成员</span></a></h3><p>现在，让我们检查一下这个生成的 <em>$Proxy</em> 类的类成员。</p><p>让我们首先检查类层次结构。<strong><em>$Proxy0</em> 类将 <em>java.lang.reflect.Proxy</em> 作为其超类，这隐含地解释了为什么动态代理只支持接口</strong>。此外，《$Proxy0_ 类实现了我们之前定义的 <em>BasicOperation</em> 和 <em>AdvancedOperation</em> 接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> $<span class="token class-name">Proxy0</span> <span class="token keyword">extends</span> <span class="token class-name">Proxy</span> <span class="token keyword">implements</span> <span class="token class-name">BasicOperation</span><span class="token punctuation">,</span> <span class="token class-name">AdvancedOperation</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了可读性，我们已经将 <em>$Proxy0</em> 类的字段名称更改为更有意义的名称。<em>hashCodeMethod</em>、<em>equalsMethod</em> 和 <em>toStringMethod</em> 字段追溯到 <em>Object</em> 类；<em>addMethod</em> 和 <em>subtractMethod</em> 字段与 <em>BasicOperation</em> 接口相关；<em>multiplyMethod</em> 和 <em>divideMethod</em> 字段映射到 <em>AdvanceOperation</em> 接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Method</span> hashCodeMethod<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Method</span> equalsMethod<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Method</span> toStringMethod<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Method</span> addMethod<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Method</span> subtractMethod<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Method</span> multiplyMethod<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Method</span> divideMethod<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，《$Proxy0_ 类中定义的方法遵循相同的逻辑：<strong>它们所有的实现都委托给 <em>InvocationHandler::invoke</em> 方法</strong>。而且，《$Proxy0_ 类将从其构造函数中获取一个 <em>InvocationHandler</em> 实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> $<span class="token class-name">Proxy0</span><span class="token punctuation">(</span><span class="token class-name">InvocationHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">)</span> <span class="token keyword">super</span><span class="token punctuation">.</span>h<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> hashCodeMethod<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">RuntimeException</span> <span class="token operator">|</span> <span class="token class-name">Error</span> ex1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> ex1<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UndeclaredThrowableException</span><span class="token punctuation">(</span>ex2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-代理如何工作" tabindex="-1"><a class="header-anchor" href="#_3-代理如何工作"><span>3. 代理如何工作</span></a></h2><p>在我们检查了 <em>$Proxy</em> 类本身之后，是时候更进一步了：如何生成 <em>$Proxy</em> 类以及如何加载 <em>$Proxy</em> 类？关键逻辑在于 <em>java.lang.reflect.Proxy</em> 和 <em>ProxyGenerator</em> 类。</p><p>随着新 Java 版本的发布，《Proxy_ 和 <em>ProxyGenerator</em> 类的实现细节不断发展。简单来说，《ProxyGenerator_ 负责生成 <em>$Proxy</em> 类的字节数组，而 <em>Proxy</em> 类负责将这个字节数组加载到 JVM 中。</p><p>现在，让我们使用 Java 8、Java 11 和 Java 17 进行讨论，因为它们是 LTS（长期支持）版本。</p><h3 id="_3-1-java-8" tabindex="-1"><a class="header-anchor" href="#_3-1-java-8"><span>3.1. Java 8</span></a></h3><p>在 Java 8 中，我们可以将 <em>$Proxy</em> 类的生成过程描述为五个步骤：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/p8.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><em>Proxy::getProxyClass</em> 或 <em>Proxy::newProxyInstance</em> 方法是我们的起点——两者都会调用 <em>Proxy::getProxyClass0</em> 方法。而 <em>Proxy::getProxyClass0</em> 方法是一个 <em>private</em> 方法，并将进一步调用 <em>ProxyClassFactory::apply</em> 方法。</p><p><em>ProxyClassFactory</em> 是在 <em>Proxy</em> 类中定义的静态嵌套类。它的 <em>apply</em> 方法计算即将到来的类的包名、类名和访问标志。然后，<em>apply</em> 方法将调用 <em>ProxyGenerator::generateProxyClass</em> 方法。</p><p>在 Java 8 中，《ProxyGenerator_ 类是一个定义在 “<em>sun.misc</em>” 包中的 <em>public</em> 类。它自 Java 9 以来已经迁移到了 “<em>java.lang.reflect</em>” 包中。而且，<em>generateProxyClass</em> 方法将创建一个 <em>ProxyGenerator</em> 实例，调用其 <em>generateClassFile</em> 方法，该方法负责生成字节码，可选择性地转储类文件，并返回生成的字节数组。</p><p>在字节码生成成功后，《Proxy::defineClass0_ 方法负责将该字节数组加载到运行中的 JVM 中。最后，我们得到了一个动态生成的 <em>$Proxy</em> 类。</p><h3 id="_3-2-java-11" tabindex="-1"><a class="header-anchor" href="#_3-2-java-11"><span>3.2. Java 11</span></a></h3><p>与 Java 8 版本相比，Java 11 引入了 <strong>三个主要变化</strong>：</p><ul><li><em>Proxy</em> 类增加了一个新的 <em>getProxyConstructor</em> 方法和一个静态嵌套的 <em>ProxyBuilder</em> 类</li><li>为了 Java 模块系统，《ProxyGenerator_ 迁移到了 “<em>java.lang.reflect</em>” 包并成为了一个包私有类</li><li>为了将生成的字节数组加载到 JVM 中，《Unsafe::defineClass_ 发挥了作用</li></ul><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/p11.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-3-java-17" tabindex="-1"><a class="header-anchor" href="#_3-3-java-17"><span>3.3. Java 17</span></a></h3><p>与 Java 11 版本相比，Java 17 有 <strong>两个主要变化</strong>：</p><ul><li>从实现的角度来看，《ProxyGenerator_ 类使用 JDK 内置的 ASM 进行字节码生成</li><li><em>JavaLangAccess::defineClass</em> 方法负责将生成的字节码加载到 JVM 中</li></ul><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/p17.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_4-使用代理的注解" tabindex="-1"><a class="header-anchor" href="#_4-使用代理的注解"><span>4. 使用代理的注解</span></a></h2><p>在 Java 中，注解类型是一种特殊类型的接口类型。但我们可能会想如何创建注解实例。事实上，我们不需要。<strong>当我们使用 Java 反射 API 读取注解时，JVM 将动态生成一个 <em>$Proxy</em> 类作为注解类型的实现</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">FunctionalInterface</span> instance <span class="token operator">=</span> <span class="token class-name">Consumer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredAnnotation</span><span class="token punctuation">(</span><span class="token class-name">FunctionalInterface</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Class</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\`\` clazz <span class="token operator">=</span> instance<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">boolean</span> isProxyClass <span class="token operator">=</span> <span class="token class-name">Proxy</span><span class="token punctuation">.</span><span class="token function">isProxyClass</span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>isProxyClass<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码片段中，我们使用 <em>Consumer</em> 类来获取其 <em>FunctionalInterface</em> 实例，然后获取实例的类，并最后使用 <em>Proxy::isProxyClass</em> 方法来检查该类是否是一个 <em>$Proxy</em> 类。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们首先介绍了一个动态代理示例，然后转储了生成的 <em>$Proxy</em> 类并检查了它的成员。为了进一步了解，我们解释了在不同 Java 版本中，<em>Proxy</em> 和 <em>ProxyGenerator</em> 类如何协同工作来生成和加载 <em>$Proxy</em> 类。最后，我们提到注解类型也是通过使用 <em>$Proxy</em> 类来实现的。</p><p>像往常一样，本教程的源代码可以在 GitHub 上找到。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/p1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>OK</p>`,58),p=[o];function c(l,r){return s(),n("div",null,p)}const m=a(t,[["render",c],["__file","2024-07-18-What Is the JDK com.sun.proxy. Proxy Class .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-What%20Is%20the%20JDK%20com.sun.proxy.%20Proxy%20Class%20.html","title":"JDK 中的 com.sun.proxy.$Proxy 类是什么？","lang":"zh-CN","frontmatter":{"date":"2022-05-01T00:00:00.000Z","category":["Java","JDK"],"tag":["JDK","动态代理"],"head":[["meta",{"name":"keywords","content":"JDK, 动态代理, $Proxy类"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-What%20Is%20the%20JDK%20com.sun.proxy.%20Proxy%20Class%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JDK 中的 com.sun.proxy.$Proxy 类是什么？"}],["meta",{"property":"og:description","content":"JDK 中的 com.sun.proxy.$Proxy 类是什么？ 当我们使用动态代理时，JDK 会动态生成一个 $Proxy 类。通常，这个 $Proxy 类的完全限定类名类似于 com.sun.proxy.$Proxy0。正如 Java 文档所说，“$Proxy” 是代理类的保留名称前缀。 在本教程中，我们将探索这个 $Proxy 类。 在开始之前..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/05/p1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T16:10:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JDK"}],["meta",{"property":"article:tag","content":"动态代理"}],["meta",{"property":"article:published_time","content":"2022-05-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T16:10:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JDK 中的 com.sun.proxy.$Proxy 类是什么？\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/05/p1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/05/p8.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/05/p11.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/05/p17.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/05/p1.png\\"],\\"datePublished\\":\\"2022-05-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T16:10:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JDK 中的 com.sun.proxy.$Proxy 类是什么？ 当我们使用动态代理时，JDK 会动态生成一个 $Proxy 类。通常，这个 $Proxy 类的完全限定类名类似于 com.sun.proxy.$Proxy0。正如 Java 文档所说，“$Proxy” 是代理类的保留名称前缀。 在本教程中，我们将探索这个 $Proxy 类。 在开始之前..."},"headers":[{"level":3,"title":"2.1. 动态代理示例","slug":"_2-1-动态代理示例","link":"#_2-1-动态代理示例","children":[]},{"level":3,"title":"2.2. 转储 $Proxy 类","slug":"_2-2-转储-proxy-类","link":"#_2-2-转储-proxy-类","children":[]},{"level":3,"title":"2.3. $Proxy 类的成员","slug":"_2-3-proxy-类的成员","link":"#_2-3-proxy-类的成员","children":[]},{"level":2,"title":"3. 代理如何工作","slug":"_3-代理如何工作","link":"#_3-代理如何工作","children":[{"level":3,"title":"3.1. Java 8","slug":"_3-1-java-8","link":"#_3-1-java-8","children":[]},{"level":3,"title":"3.2. Java 11","slug":"_3-2-java-11","link":"#_3-2-java-11","children":[]},{"level":3,"title":"3.3. Java 17","slug":"_3-3-java-17","link":"#_3-3-java-17","children":[]}]},{"level":2,"title":"4. 使用代理的注解","slug":"_4-使用代理的注解","link":"#_4-使用代理的注解","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721319033000,"updatedTime":1721319033000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.85,"words":1756},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-What Is the JDK com.sun.proxy. Proxy Class .md","localizedDate":"2022年5月1日","excerpt":"\\n<p>当我们使用动态代理时，JDK 会动态生成一个 <em>$Proxy</em> 类。通常，这个 <em>$Proxy</em> 类的完全限定类名类似于 <em>com.sun.proxy.$Proxy0</em>。正如 Java 文档所说，“$Proxy” 是代理类的保留名称前缀。</p>\\n<p>在本教程中，我们将探索这个 <em>$Proxy</em> 类。</p>\\n<p>在开始之前，让我们区分一下 <em>java.lang.reflect.Proxy</em> 类和 <em>$Proxy</em> 类。<em>java.lang.reflect.Proxy</em> 是 JDK 内置的类。与之相反，<strong><em>$Proxy</em> 类是在运行时动态生成的</strong>。从类层次结构的角度来看，<em>$Proxy</em> 类继承了 <em>java.lang.reflect.Proxy</em> 类。</p>","autoDesc":true}');export{m as comp,d as data};
