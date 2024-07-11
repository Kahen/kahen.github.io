import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-Ckd2YV4o.js";const e={},p=t(`<h1 id="java反射是否是不良实践-baeldung" tabindex="-1"><a class="header-anchor" href="#java反射是否是不良实践-baeldung"><span>Java反射是否是不良实践？ | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>Java反射API的使用在Java社区中引发了长时间的广泛讨论，有时被视为不良实践。</strong> 尽管它被流行的Java框架和库广泛使用，但其潜在的缺点阻止了它在常规服务器端应用程序中的频繁使用。</p><p>在本教程中，我们将深入探讨反射可能引入到我们的代码库中的优点和缺点。此外，<strong>我们将探讨何时使用反射是适当或不适当的，最终帮助我们确定它是否构成不良实践。</strong></p><h2 id="_2-理解java反射" tabindex="-1"><a class="header-anchor" href="#_2-理解java反射"><span>2. 理解Java反射</span></a></h2><p><strong>在计算机科学中，反射性编程或反射是一个进程检查、内省和修改其结构和行为的能力。</strong> 当一个编程语言完全支持反射时，它允许在运行时检查和修改代码库中类和对象的结构和行为，允许源代码重写自身的某些方面。</p><p>根据这个定义，Java提供了对反射的全面支持。除了Java，其他提供反射编程支持的常见编程语言包括C#、Python和JavaScript。</p><p>许多流行的Java框架，如Spring和Hibernate，依赖于它来提供高级特性，如依赖注入、面向切面编程和数据库映射。除了通过框架或库间接使用反射外，我们还可以直接使用java.lang.reflect包或Reflections库来使用它。</p><h2 id="_3-java反射的优点" tabindex="-1"><a class="header-anchor" href="#_3-java反射的优点"><span>3. Java反射的优点</span></a></h2><p><strong>如果谨慎使用，Java反射可以是一个强大且多功能的特性。</strong> 在本节中，我们将探讨反射的一些关键优势以及如何在特定场景中有效使用它。</p><h3 id="_3-1-动态配置" tabindex="-1"><a class="header-anchor" href="#_3-1-动态配置"><span>3.1. 动态配置</span></a></h3><p><strong>反射API增强了动态编程，提高了应用程序的灵活性和适应性。</strong> 这一方面在我们遇到直到运行时才知道所需类或模块的场景中证明是有价值的。</p><p>此外，通过利用反射的动态能力，开发人员可以构建可以在实时轻松重新配置的系统，无需进行广泛的代码更改。</p><p><strong>例如，Spring框架使用反射来创建和配置bean。</strong> 它扫描类路径组件，并根据注解和XML配置动态实例化和配置bean，允许开发人员在不更改源代码的情况下添加或修改bean。</p><h3 id="_3-2-可扩展性" tabindex="-1"><a class="header-anchor" href="#_3-2-可扩展性"><span>3.2. 可扩展性</span></a></h3><p><strong>使用反射的另一个显著优势是可扩展性。这使我们能够在不更改应用程序核心代码的情况下，在运行时合并新功能或模块。</strong></p><p>为了说明这一点，假设我们正在使用一个第三方库，该库定义了一个基类，并包含多个用于多态反序列化的子类型。我们希望通过引入我们自己的自定义子类型来扩展功能，这些子类型扩展了同一个基类。反射API在这种特定用例中非常有用，因为我们可以使用它在运行时动态注册这些自定义子类型，并轻松地将它们与第三方库集成。<strong>因此，我们可以在不更改其代码库的情况下适应库以满足我们的特定要求。</strong></p><h3 id="_3-3-代码分析" tabindex="-1"><a class="header-anchor" href="#_3-3-代码分析"><span>3.3. 代码分析</span></a></h3><p><strong>反射的另一个用例是代码分析，它允许我们动态地检查代码。</strong> 这特别有用，因为它可以导致提高软件开发的质量。</p><p>例如，ArchUnit是一个用于架构单元测试的Java库，它使用反射和字节码分析。库无法通过反射API获得的信息在字节码级别获得。这样，库可以动态地分析代码，我们能够执行架构规则和约束，确保我们的软件项目的完整性和高质量。</p><h2 id="_4-java反射的缺点" tabindex="-1"><a class="header-anchor" href="#_4-java反射的缺点"><span>4. Java反射的缺点</span></a></h2><p>正如我们在前一节中看到的，反射是一个功能强大的特性，具有多种应用。<strong>然而，它带来了我们需要在决定在项目中使用它之前考虑的一系列缺点。</strong> 在本节中，我们将深入探讨这个特性的一些主要缺点。</p><h3 id="_4-1-性能开销" tabindex="-1"><a class="header-anchor" href="#_4-1-性能开销"><span>4.1. 性能开销</span></a></h3><p><strong>Java反射动态解析类型，可能会限制某些JVM优化。</strong> 因此，反射操作的性能比非反射操作慢。所以，在处理性能敏感的应用程序时，我们应该考虑避免在频繁调用的代码部分使用反射。</p><p>为了演示这一点，我们将创建一个非常简单的_Person_类，并在其上执行一些反射和非反射操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token class-name">Integer</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以创建一个基准测试，以查看调用我们类的_getters_的时间差异：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodInvocationBenchmark</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Benchmark</span>
    <span class="token annotation punctuation">@Fork</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> warmups <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@OutputTimeUnit</span><span class="token punctuation">(</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@BenchmarkMode</span><span class="token punctuation">(</span><span class="token class-name">Mode<span class="token punctuation">.</span>AverageTime</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">directCall</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Doe&quot;</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getFirstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getLastName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Benchmark</span>
    <span class="token annotation punctuation">@Fork</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> warmups <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@OutputTimeUnit</span><span class="token punctuation">(</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@BenchmarkMode</span><span class="token punctuation">(</span><span class="token class-name">Mode<span class="token punctuation">.</span>AverageTime</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reflectiveCall</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InvocationTargetException</span><span class="token punctuation">,</span> <span class="token class-name">NoSuchMethodException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Doe&quot;</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Method</span> getFirstNameMethod <span class="token operator">=</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token string">&quot;getFirstName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>getFirstNameMethod<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Method</span> getLastNameMethod <span class="token operator">=</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token string">&quot;getLastName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>getLastNameMethod<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Method</span> getAgeMethod <span class="token operator">=</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token string">&quot;getAge&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>getAgeMethod<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们检查我们的方法调用基准测试的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Benchmark                                 Mode  Cnt    Score   Error  Units
MethodInvocationBenchmark.directCall      avgt    5    8.428 ± 0.365  ns/op
MethodInvocationBenchmark.reflectiveCall  avgt    5  102.785 ± 2.493  ns/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建另一个基准测试，测试反射初始化与直接调用构造函数的性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">InitializationBenchmark</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Benchmark</span>
    <span class="token annotation punctuation">@Fork</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> warmups <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@OutputTimeUnit</span><span class="token punctuation">(</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@BenchmarkMode</span><span class="token punctuation">(</span><span class="token class-name">Mode<span class="token punctuation">.</span>AverageTime</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">directInit</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Doe&quot;</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Benchmark</span>
    <span class="token annotation punctuation">@Fork</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> warmups <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@OutputTimeUnit</span><span class="token punctuation">(</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@BenchmarkMode</span><span class="token punctuation">(</span><span class="token class-name">Mode<span class="token punctuation">.</span>AverageTime</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reflectiveInit</span><span class="token punctuation">(</span><span class="token class-name">Blackhole</span> blackhole<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchMethodException</span><span class="token punctuation">,</span> <span class="token class-name">InvocationTargetException</span><span class="token punctuation">,</span> <span class="token class-name">InstantiationException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Constructor</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\` constructor <span class="token operator">=</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        blackhole<span class="token punctuation">.</span><span class="token function">consume</span><span class="token punctuation">(</span>constructor<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Doe&quot;</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们检查构造函数调用的结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Benchmark                                 Mode  Cnt    Score   Error  Units
InitializationBenchmark.directInit        avgt    5    5.290 ± 0.395  ns/op
InitializationBenchmark.reflectiveInit    avgt    5   23.331 ± 0.141  ns/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在审查了这两个基准测试的结果之后，我们可以合理地推断，在Java中使用反射在调用方法或初始化对象等用例中可能会显著变慢。</p><p>我们的文章《使用Java进行微基准测试》提供了更多关于我们用于比较执行时间的信息。</p><h3 id="_4-2-内部暴露" tabindex="-1"><a class="header-anchor" href="#_4-2-内部暴露"><span>4.2. 内部暴露</span></a></h3><p><strong>反射允许在非反射代码中可能受到限制的操作。</strong> 一个很好的例子是能够访问和操作类的私有字段和方法。通过这样做，我们违反了封装性，这是面向对象编程的一个基本原则。</p><p>例如，让我们创建一个只有一个私有字段的虚拟类，不创建任何_getters_或_setters_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> veryPrivateField<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>veryPrivateField <span class="token operator">=</span> <span class="token string">&quot;Secret Information&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们尝试在单元测试中访问这个私有字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPrivateField_whenUsingReflection_thenIsAccessible</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IllegalAccessException</span><span class="token punctuation">,</span> <span class="token class-name">NoSuchFieldException</span> <span class="token punctuation">{</span>
    <span class="token class-name">MyClass</span> myClassInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Field</span> privateField <span class="token operator">=</span> <span class="token class-name">MyClass</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;veryPrivateField&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    privateField<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> accessedField <span class="token operator">=</span> privateField<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>myClassInstance<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>accessedField<span class="token punctuation">,</span> <span class="token string">&quot;Secret Information&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-丢失编译时安全性" tabindex="-1"><a class="header-anchor" href="#_4-3-丢失编译时安全性"><span>4.3. 丢失编译时安全性</span></a></h3><p><strong>反射的另一个缺点是丢失了编译时的安全性。</strong> 在典型的Java开发中，编译器执行严格的类型检查，并确保我们正确地使用类、方法和字段。然而，反射绕过了这些检查，结果，一些错误直到运行时才被发现。因此，这可能导致难以检测的bug，可能会影响我们代码库的可靠性。</p><h3 id="_4-4-代码可维护性降低" tabindex="-1"><a class="header-anchor" href="#_4-4-代码可维护性降低"><span>4.4. 代码可维护性降低</span></a></h3><p><strong>使用反射可以显著降低代码的可维护性。</strong> 严重依赖反射的代码往往比依赖反射的代码通常比非反射代码的可读性要差。可读性的降低可能会导致维护困难，因为开发人员更难理解代码的意图和功能。</p><p><strong>另一个挑战是工具支持有限。</strong> 并非所有的开发工具和IDE都完全支持反射。因此，这可能会减慢开发速度，并使开发更容易出错，因为开发人员必须依赖手动检查来发现问题。</p><h3 id="_4-5-安全问题" tabindex="-1"><a class="header-anchor" href="#_4-5-安全问题"><span>4.5. 安全问题</span></a></h3><p>Java反射涉及访问和操作程序的内部元素，这可能会引起安全问题。在受限环境中，允许反射访问可能是有风险的，因为<strong>恶意代码可能试图利用反射获得对敏感资源的未授权访问或执行违反安全策略的操作</strong>。</p><h2 id="_5-java-9对反射的影响" tabindex="-1"><a class="header-anchor" href="#_5-java-9对反射的影响"><span>5. Java 9对反射的影响</span></a></h2><p><strong>Java 9中模块的引入对模块封装其代码的方式带来了重大变化。在Java 9之前，使用反射可以轻易地打破封装。</strong></p><p>模块默认不再暴露其内部元素。然而，Java 9提供了一些机制，可以选择性地授予模块之间反射访问的权限。这允许我们在必要时打开特定包，确保与旧代码或第三方库的兼容性。</p><h2 id="_6-我们应该何时使用java反射" tabindex="-1"><a class="header-anchor" href="#_6-我们应该何时使用java反射"><span>6. 我们应该何时使用Java反射？</span></a></h2><p>在探讨了反射的优点和缺点之后，我们可以确定一些使用这个强大特性的适当或不适当的用例。</p><p><strong>在动态行为至关重要的地方使用反射API证明是有价值的。</strong> 正如我们已经看到的，许多知名的框架和库，如Spring和Hibernate，依赖于它来提供关键特性。在这些情况下，反射使这些框架能够为开发人员提供灵活性和定制性。此外，当我们自己创建库或框架时，反射可以增强其他开发人员扩展和定制与我们代码的交互，使其成为一个合适的选择。</p><p><strong>此外，反射可以作为我们无法修改的代码的扩展选项。</strong> 因此，当我们使用第三方库或遗留代码工作，并需要集成新功能或适应现有功能而无需更改原始代码库时，它可以成为一个强大的工具。它允许我们访问和操作否则无法访问的元素，使其成为这些场景中的实用选择。</p><p><strong>然而，考虑使用反射时要小心。</strong> 在具有强大安全要求的应用程序中，应该谨慎使用反射代码。反射允许访问程序的内部元素，这可能被恶意代码利用。此外，在处理性能关键的应用程序时，特别是在频繁调用的代码部分，反射的性能开销可能成为一个问题。此外，如果我们的项目中编译时类型检查至关重要，我们应该考虑避免使用反射代码，因为它缺乏编译时安全性。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>正如我们在本文中了解到的，Java中的反射应该被视为一个需要谨慎使用的强大工具，而不是被标记为不良实践。与任何特性一样，过度使用反射确实可以被视为不良实践。然而，当谨慎应用并且在真正必要时使用时，反射可以成为宝贵的资产。</p><p>如常，源代码可在GitHub上获得。</p><p><a href="https://www.baeldung.com" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/author/paul-bakker/" target="_blank" rel="noopener noreferrer"><img src="https://secure.gravatar.com/avatar/d22d21795b160fbfc43125cc93df8849?s=50&amp;r=g" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/author/michael-krimgen/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/Michael-Krimgen-150x150.png" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"></a><a href="https://www.baeldung.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></a></p><p>OK</p>`,62),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-29-Is Java Reflection Bad Practice .html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Is%20Java%20Reflection%20Bad%20Practice%20.html","title":"Java反射是否是不良实践？ | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","反射"],"tag":["Java反射","编程实践"],"head":[["meta",{"name":"keywords","content":"Java反射, 编程实践, 性能, 安全性, 代码维护"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Is%20Java%20Reflection%20Bad%20Practice%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java反射是否是不良实践？ | Baeldung"}],["meta",{"property":"og:description","content":"Java反射是否是不良实践？ | Baeldung 1. 概述 Java反射API的使用在Java社区中引发了长时间的广泛讨论，有时被视为不良实践。 尽管它被流行的Java框架和库广泛使用，但其潜在的缺点阻止了它在常规服务器端应用程序中的频繁使用。 在本教程中，我们将深入探讨反射可能引入到我们的代码库中的优点和缺点。此外，我们将探讨何时使用反射是适当或..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T06:53:46.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java反射"}],["meta",{"property":"article:tag","content":"编程实践"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T06:53:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java反射是否是不良实践？ | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/d22d21795b160fbfc43125cc93df8849?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/Michael-Krimgen-150x150.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T06:53:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java反射是否是不良实践？ | Baeldung 1. 概述 Java反射API的使用在Java社区中引发了长时间的广泛讨论，有时被视为不良实践。 尽管它被流行的Java框架和库广泛使用，但其潜在的缺点阻止了它在常规服务器端应用程序中的频繁使用。 在本教程中，我们将深入探讨反射可能引入到我们的代码库中的优点和缺点。此外，我们将探讨何时使用反射是适当或..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解Java反射","slug":"_2-理解java反射","link":"#_2-理解java反射","children":[]},{"level":2,"title":"3. Java反射的优点","slug":"_3-java反射的优点","link":"#_3-java反射的优点","children":[{"level":3,"title":"3.1. 动态配置","slug":"_3-1-动态配置","link":"#_3-1-动态配置","children":[]},{"level":3,"title":"3.2. 可扩展性","slug":"_3-2-可扩展性","link":"#_3-2-可扩展性","children":[]},{"level":3,"title":"3.3. 代码分析","slug":"_3-3-代码分析","link":"#_3-3-代码分析","children":[]}]},{"level":2,"title":"4. Java反射的缺点","slug":"_4-java反射的缺点","link":"#_4-java反射的缺点","children":[{"level":3,"title":"4.1. 性能开销","slug":"_4-1-性能开销","link":"#_4-1-性能开销","children":[]},{"level":3,"title":"4.2. 内部暴露","slug":"_4-2-内部暴露","link":"#_4-2-内部暴露","children":[]},{"level":3,"title":"4.3. 丢失编译时安全性","slug":"_4-3-丢失编译时安全性","link":"#_4-3-丢失编译时安全性","children":[]},{"level":3,"title":"4.4. 代码可维护性降低","slug":"_4-4-代码可维护性降低","link":"#_4-4-代码可维护性降低","children":[]},{"level":3,"title":"4.5. 安全问题","slug":"_4-5-安全问题","link":"#_4-5-安全问题","children":[]}]},{"level":2,"title":"5. Java 9对反射的影响","slug":"_5-java-9对反射的影响","link":"#_5-java-9对反射的影响","children":[]},{"level":2,"title":"6. 我们应该何时使用Java反射？","slug":"_6-我们应该何时使用java反射","link":"#_6-我们应该何时使用java反射","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719644026000,"updatedTime":1719644026000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":9.61,"words":2883},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Is Java Reflection Bad Practice .md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p><strong>Java反射API的使用在Java社区中引发了长时间的广泛讨论，有时被视为不良实践。</strong> 尽管它被流行的Java框架和库广泛使用，但其潜在的缺点阻止了它在常规服务器端应用程序中的频繁使用。</p>\\n<p>在本教程中，我们将深入探讨反射可能引入到我们的代码库中的优点和缺点。此外，<strong>我们将探讨何时使用反射是适当或不适当的，最终帮助我们确定它是否构成不良实践。</strong></p>\\n<h2>2. 理解Java反射</h2>\\n<p><strong>在计算机科学中，反射性编程或反射是一个进程检查、内省和修改其结构和行为的能力。</strong> 当一个编程语言完全支持反射时，它允许在运行时检查和修改代码库中类和对象的结构和行为，允许源代码重写自身的某些方面。</p>","autoDesc":true}');export{k as comp,d as data};
