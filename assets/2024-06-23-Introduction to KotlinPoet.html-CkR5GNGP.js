import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-B5SPsEv6.js";const e={},p=t(`<h1 id="kotlinpoet-简介" tabindex="-1"><a class="header-anchor" href="#kotlinpoet-简介"><span>KotlinPoet 简介</span></a></h1><p>在本文中，我们将深入了解 KotlinPoet。我们将了解它是什么，我们可以用它做什么，以及如何使用它。</p><h2 id="_2-kotlinpoet-是什么" tabindex="-1"><a class="header-anchor" href="#_2-kotlinpoet-是什么"><span>2. KotlinPoet 是什么？</span></a></h2><p><strong>KotlinPoet 是一个开源库，用于生成 Kotlin 源代码。</strong> 由 Square 维护，它是 JavaPoet 库的 Kotlin 版本。</p><p>与 Asm 等工具不同，KotlinPoet 生成的是原始的、未编译的源代码。这需要在直接执行之前进行编译。然而，根据我们的需求，这可能更有用和强大——例如，在构建过程中或在 IDE 内部进行代码生成。</p><p>KotlinPoet 生成了 Kotlin 程序中的大部分主要结构——类、字段、方法、注解等。因此，我们可以程序性地生成从单行代码到整个源文件的任何内容。</p><h2 id="_3-依赖性" tabindex="-1"><a class="header-anchor" href="#_3-依赖性"><span>3. 依赖性</span></a></h2><p><strong>在我们使用 KotlinPoet 之前，我们需要在构建中包含最新版本，目前是 1.16.0。</strong></p><p>如果我们使用 Maven，我们可以包含此依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.squareup\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`kotlinpoet-jvm\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.16.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者如果我们使用 Gradle，我们可以这样包含它：</p><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;com.squareup:kotlinpoet:1.16.0&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时，我们已经准备好在应用程序中使用它了。</p><h2 id="_4-生成代码" tabindex="-1"><a class="header-anchor" href="#_4-生成代码"><span>4. 生成代码</span></a></h2><p>现在我们已经设置好了 KotlinPoet，我们可以使用它来生成代码了。</p><p><strong>所有代码都是使用一组 <em>Spec</em> 类之一生成的。</strong> 我们可以使用这些类中的一种来生成我们可以生成的每种主要类别的代码——例如，<em>TypeSpec</em> 用于生成类型定义，<em>FunSpec</em> 用于生成函数定义等。</p><p><strong>这些 <em>Spec</em> 类中的每一个都有一个伴生对象，它公开了开始生成的函数，然后我们从那个点开始链式调用。</strong></p><p>例如，我们可以像下面这样生成一个空类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> code <span class="token operator">=</span> TypeSpec<span class="token punctuation">.</span><span class="token function">classBuilder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Test&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将输出一个 <em>TypeSpec</em> 实例，表示我们的类，我们可以使用它上面的 <em>toString()</em> 方法来生成结果代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-生成函数" tabindex="-1"><a class="header-anchor" href="#_5-生成函数"><span>5. 生成函数</span></a></h2><p><strong>我们将使用 KotlinPoet 生成的第一个代码单元是函数。这包括我们在函数中期望看到的一切——函数本身、参数、返回类型以及函数的实际体。</strong></p><p>我们从 <em>FunSpec</em> 类开始。我们需要决定我们希望构建的函数类型——常规的、构造函数、getter、setter，或者我们是否在重写另一个函数——然后调用适当的构建器函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>FunSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;simple&quot;</span></span><span class="token punctuation">)</span> <span class="token comment">// public fun simple() {}</span>
FunSpec<span class="token punctuation">.</span><span class="token function">constructorBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// public constructor()</span>
FunSpec<span class="token punctuation">.</span><span class="token function">getterBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// public get() {}</span>
FunSpec<span class="token punctuation">.</span><span class="token function">setterBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// public set() {}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-指定函数体" tabindex="-1"><a class="header-anchor" href="#_5-1-指定函数体"><span>5.1. 指定函数体</span></a></h3><p><strong>一旦我们有了函数定义，我们必须给它一个体。KotlinPoet 不建模函数体，而是让我们自由地指定它们。</strong></p><p>最简单的方法是通过使用 <em>addStatement()</em> 调用来添加单独的语句：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> code <span class="token operator">=</span> FunSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addStatement</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;println(\\&quot;Testing\\&quot;)&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样做将生成以下代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> fun <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Testing&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这样做时，我们可以看到我们必须转义我们字符串周围的引号。<strong>KotlinPoet 通过允许我们指定格式字符串来使这变得更容易，这些字符串接受参数。</strong> 例如，我们可以像这样写：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> code <span class="token operator">=</span> FunSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addStatement</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;println(%S)&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Testing&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将像以前一样产生相同的代码。这里的优点是 KotlinPoet 将正确地格式化我们的输入；然而，它需要——在这种情况下，用引号包围它。我们在这里有几种格式说明符的选项：</p><ul><li>%S – 将参数格式化为字符串，转义引号和美元符号，并将所有内容用引号包围。</li><li>%P – 将参数格式化为字符串模板，转义引号但不转义美元符号，并将整个内容用引号包围。</li><li>%L – 将参数视为字面值，不转义也不引用。</li><li>%N – 将参数视为另一个代码元素，并插入其名称。</li><li>%T – 将参数视为类型，插入类型名称，并确保适当地添加导入。</li><li>%M – 将参数视为包或类的成员，插入正确限定的成员名称，并确保适当地添加导入。</li></ul><h3 id="_5-2-控制流" tabindex="-1"><a class="header-anchor" href="#_5-2-控制流"><span>5.2. 控制流</span></a></h3><p><strong>函数体的某些方面是特殊的，需要以不同的方式处理。特别是，这适用于任何本身包含更多语句的标准控制流机制。</strong></p><p>KotlinPoet 为我们提供了 <em>beginControlFlow()</em> 和 <em>endControlFlow()</em> 调用来管理这一点。<em>beginControlFlow()</em> 输出某个语句，然后是一个开括号，而 <em>endControlFlow()</em> 输出闭括号。</p><p>KotlinPoet 还将缩进这些之间的任何语句：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> code <span class="token operator">=</span> FunSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">beginControlFlow</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;if (showOutput)&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addStatement</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;println(%S)&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Testing&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">endControlFlow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将产生以下结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> fun <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>showOutput<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Testing&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还有 <em>nextControlFlow()</em> 用于允许 <em>else</em> 和 <em>else if</em> 等结构。这是 <em>endControlFlow()</em> 和 <em>beginControlFlow()</em> 在同一行上的组合。</p><h3 id="_5-3-参数" tabindex="-1"><a class="header-anchor" href="#_5-3-参数"><span>5.3. 参数</span></a></h3><p><strong>没有参数的函数用途有限，所以我们需要一种方法来指定它们。我们可以通过 <em>addParameter()</em> 调用来做到这一点，我们需要提供 <em>ParameterSpec</em>。</strong></p><p>至少，一个 <em>ParameterSpec</em> 需要有一个名称和一个类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> code <span class="token operator">=</span> FunSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addParameter</span><span class="token punctuation">(</span>ParameterSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;param&quot;</span></span><span class="token punctuation">,</span> String<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将产生：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> fun <span class="token function">test</span><span class="token punctuation">(</span>param<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">kotlin<span class="token punctuation">.</span></span>String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以使用 <em>ParameterSpec</em> 上的 <em>defaultValue()</em> 调用来为我们的参数提供默认值：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> code <span class="token operator">=</span> FunSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addParameter</span><span class="token punctuation">(</span>ParameterSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;param&quot;</span></span><span class="token punctuation">,</span> Int<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">defaultValue</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;%L&quot;</span></span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们之前看到的，默认值是作为格式说明符提供的。</p><p><strong>KotlinPoet 还提供了一种简写，通过直接将参数名称和类型传递给 <em>addParameter()</em> 调用来添加参数：</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> code <span class="token operator">=</span> FunSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addParameter</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;param&quot;</span></span><span class="token punctuation">,</span> String<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，这样做意味着我们不能自定义参数额外的。</p><h3 id="_5-4-返回类型" tabindex="-1"><a class="header-anchor" href="#_5-4-返回类型"><span>5.4. 返回类型</span></a></h3><p><strong>与函数参数类似，我们也可以指定返回类型。与其他设置不同，一个函数只能有一个返回类型，默认为 <em>Unit</em>。这是使用 <em>returns()</em> 调用来完成的：</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> code <span class="token operator">=</span> FunSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span>String<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将产生：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> fun <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token class-name"><span class="token namespace">kotlin<span class="token punctuation">.</span></span>String</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>此外，KotlinPoet 对单表达式函数有独特的理解。</strong> 如果我们的函数规范有一个以 <em>return</em> 开始的单个语句，那么我们会以不同的方式生成它：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> code <span class="token operator">=</span> FunSpec<span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">returns</span><span class="token punctuation">(</span>Int<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addStatement</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;return 5&quot;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将生成：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> fun <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token class-name"><span class="token namespace">kotlin<span class="token punctuation">.</span></span>Int</span> <span class="token operator">=</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下提供了返回类型，因为我们的函数规范包含了它。根据我们的规范，Kotlin 允许我们在这些情况下省略它，同时仍然产生有效的代码。</p><h2 id="_6-生成类型" tabindex="-1"><a class="header-anchor" href="#_6-生成类型"><span>6. 生成类型</span></a></h2><p><strong>现在我们可以生成函数了，我们需要一些类型来使用它们。这可能包括在我们函数内部使用的类型，或者函数存在于其中的类型。</strong></p><p>KotlinPoet 允许我们创建 Kotlin 支持的所有预期类型定义——类、接口、对象等。</p><p>我们可以使用 <em>TypeSpec</em> 规范类来创建类型：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>TypeSpec<span class="token punctuation">.</span><span class="token function">classBuilder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Test&quot;</span></span><span class="token punctuation">)</span> <span class="token comment">// public class Test</span>
TypeSpec<span class="token punctuation">.</span><span class="token function">interfaceBuilder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Test&quot;</span></span><span class="token punctuation">)</span> <span class="token comment">// public interface Test</span>
TypeSpec<span class="token punctuation">.</span><span class="token function">objectBuilder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Test&quot;</span></span><span class="token punctuation">)</span> <span class="token comment">// public object Test</span>
TypeSpec<span class="token punctuation">.</span><span class="token function">enumBuilder</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Test&quot;</span></span><span class="token punctuation">)</span> <span class="token comment">// public enum class Test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-1-添加方法" tabindex="-1"><a class="header-anchor" href="#_6-1-添加方法"><span>6.1. 添加方法</span></a></h3><p><strong>一旦我们可以创建我们的类型，我们希望它们能够有一些功能。做到这一点的第一种方式是能够添加方法。</strong></p><p>我们已经看到了如何使用 <em>FunSpec</em> 创建函数。我们可以通过</p>`,73),o=[p];function l(i,c){return a(),s("div",null,o)}const d=n(e,[["render",l],["__file","2024-06-23-Introduction to KotlinPoet.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Introduction%20to%20KotlinPoet.html","title":"KotlinPoet 简介","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["KotlinPoet","Code Generation"],"head":[["meta",{"name":"keywords","content":"Kotlin, KotlinPoet, Source Code Generation, IDE, Build Process"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Introduction%20to%20KotlinPoet.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"KotlinPoet 简介"}],["meta",{"property":"og:description","content":"KotlinPoet 简介 在本文中，我们将深入了解 KotlinPoet。我们将了解它是什么，我们可以用它做什么，以及如何使用它。 2. KotlinPoet 是什么？ KotlinPoet 是一个开源库，用于生成 Kotlin 源代码。 由 Square 维护，它是 JavaPoet 库的 Kotlin 版本。 与 Asm 等工具不同，Kotlin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T12:46:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"KotlinPoet"}],["meta",{"property":"article:tag","content":"Code Generation"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T12:46:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"KotlinPoet 简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T12:46:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"KotlinPoet 简介 在本文中，我们将深入了解 KotlinPoet。我们将了解它是什么，我们可以用它做什么，以及如何使用它。 2. KotlinPoet 是什么？ KotlinPoet 是一个开源库，用于生成 Kotlin 源代码。 由 Square 维护，它是 JavaPoet 库的 Kotlin 版本。 与 Asm 等工具不同，Kotlin..."},"headers":[{"level":2,"title":"2. KotlinPoet 是什么？","slug":"_2-kotlinpoet-是什么","link":"#_2-kotlinpoet-是什么","children":[]},{"level":2,"title":"3. 依赖性","slug":"_3-依赖性","link":"#_3-依赖性","children":[]},{"level":2,"title":"4. 生成代码","slug":"_4-生成代码","link":"#_4-生成代码","children":[]},{"level":2,"title":"5. 生成函数","slug":"_5-生成函数","link":"#_5-生成函数","children":[{"level":3,"title":"5.1. 指定函数体","slug":"_5-1-指定函数体","link":"#_5-1-指定函数体","children":[]},{"level":3,"title":"5.2. 控制流","slug":"_5-2-控制流","link":"#_5-2-控制流","children":[]},{"level":3,"title":"5.3. 参数","slug":"_5-3-参数","link":"#_5-3-参数","children":[]},{"level":3,"title":"5.4. 返回类型","slug":"_5-4-返回类型","link":"#_5-4-返回类型","children":[]}]},{"level":2,"title":"6. 生成类型","slug":"_6-生成类型","link":"#_6-生成类型","children":[{"level":3,"title":"6.1. 添加方法","slug":"_6-1-添加方法","link":"#_6-1-添加方法","children":[]}]}],"git":{"createdTime":1719146794000,"updatedTime":1719146794000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.16,"words":1849},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Introduction to KotlinPoet.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>在本文中，我们将深入了解 KotlinPoet。我们将了解它是什么，我们可以用它做什么，以及如何使用它。</p>\\n<h2>2. KotlinPoet 是什么？</h2>\\n<p><strong>KotlinPoet 是一个开源库，用于生成 Kotlin 源代码。</strong> 由 Square 维护，它是 JavaPoet 库的 Kotlin 版本。</p>\\n<p>与 Asm 等工具不同，KotlinPoet 生成的是原始的、未编译的源代码。这需要在直接执行之前进行编译。然而，根据我们的需求，这可能更有用和强大——例如，在构建过程中或在 IDE 内部进行代码生成。</p>\\n<p>KotlinPoet 生成了 Kotlin 程序中的大部分主要结构——类、字段、方法、注解等。因此，我们可以程序性地生成从单行代码到整个源文件的任何内容。</p>","autoDesc":true}');export{d as comp,k as data};
