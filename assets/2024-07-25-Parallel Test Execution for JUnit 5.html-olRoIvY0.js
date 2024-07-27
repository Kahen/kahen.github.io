import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CBerKIce.js";const e={},p=t(`<h1 id="junit-5的并行测试执行" tabindex="-1"><a class="header-anchor" href="#junit-5的并行测试执行"><span>JUnit 5的并行测试执行</span></a></h1><p>在这篇文章中，我们将介绍如何使用JUnit 5执行并行单元测试。首先，我们将介绍基本配置和使用此功能的最低要求。接下来，我们将展示不同情况下的代码示例，并在最后讨论共享资源的同步。</p><p>并行测试执行是一个自5.3版本以来可选加入的实验性功能。</p><h2 id="_2-配置" tabindex="-1"><a class="header-anchor" href="#_2-配置"><span>2. 配置</span></a></h2><p>首先，<strong>我们需要在_src/test/resources_文件夹中创建一个_junit-platform.properties_文件以启用并行测试执行</strong>。我们通过在上述文件中添加以下行来启用并行化特性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>junit.jupiter.execution.parallel.enabled = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们通过运行一些测试来检查我们的配置。首先，我们将创建_<code>FirstParallelUnitTest</code>_类，并在其中创建两个测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FirstParallelUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;FirstParallelUnitTest first() start =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;FirstParallelUnitTest first() end =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">second</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;FirstParallelUnitTest second() start =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;FirstParallelUnitTest second() end =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行测试时，我们在控制台得到以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>FirstParallelUnitTest second() start =&gt; ForkJoinPool-1-worker-19
FirstParallelUnitTest second() end =&gt; ForkJoinPool-1-worker-19
FirstParallelUnitTest first() start =&gt; ForkJoinPool-1-worker-19
FirstParallelUnitTest first() end =&gt; ForkJoinPool-1-worker-19
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个输出中，我们可以注意到两件事。首先，我们的测试是顺序运行的。其次，我们使用ForkJoin线程池。<strong>通过启用并行执行，JUnit引擎开始使用ForkJoin线程池。</strong></p><p>接下来，我们需要添加配置以利用这个线程池。我们需要选择一个并行化策略。<strong>JUnit提供了两种实现（<em>dynamic_和_fixed</em>）以及一个自定义选项来创建我们的实现。</strong></p><p>动态策略根据处理器/核心数量乘以因子参数（默认为1）来确定线程数量，使用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>junit.jupiter.execution.parallel.config.dynamic.factor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一方面，固定策略依赖于由以下指定的预定义线程数量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>junit.jupiter.execution.parallel.config.fixed.parallelism
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要使用自定义策略，我们需要首先通过实现_ParallelExecutionConfigurationStrategy_接口来创建它。</p><h2 id="_3-同一类中的测试并行化" tabindex="-1"><a class="header-anchor" href="#_3-同一类中的测试并行化"><span>3. 同一类中的测试并行化</span></a></h2><p>我们已经启用了并行执行并选择了一个策略。现在是我们在同一类中并行执行测试的时候了。有两种配置方法。一种是使用_<code>@Execution(ExecutionMode.CONCURRENT)</code>_注解，另一种是使用属性文件和行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>junit.jupiter.execution.parallel.mode.default = concurrent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在我们选择如何配置这个并运行我们的_<code>FirstParallelUnitTest</code>_类之后，我们可以看到以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>FirstParallelUnitTest second() start =&gt; ForkJoinPool-1-worker-5
FirstParallelUnitTest first() start =&gt; ForkJoinPool-1-worker-19
FirstParallelUnitTest second() end =&gt; ForkJoinPool-1-worker-5
FirstParallelUnitTest first() end =&gt; ForkJoinPool-1-worker-19
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出中，我们可以看到两个测试同时开始，并在两个不同的线程中。请注意，输出可能会在每次运行之间改变。在使用ForkJoin线程池时，这是预期的。</p><p>还有一个选项是在同一线程中运行所有_<code>FirstParallelUnitTest</code>_类中的测试。在当前范围内，使用并行性和同一线程选项是不可行的，所以让我们在下一节中扩大我们的视野，并添加一个更多的测试类。</p><h2 id="_4-同一模块中的测试并行化" tabindex="-1"><a class="header-anchor" href="#_4-同一模块中的测试并行化"><span>4. 同一模块中的测试并行化</span></a></h2><p>在我们引入一个新的属性之前，我们将创建_<code>SecondParallelUnitTest</code><em>类，它有两个方法，类似于</em><code>FirstParallelUnitTest</code>_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecondParallelUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;SecondParallelUnitTest first() start =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;SecondParallelUnitTest first() end =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">second</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;SecondParallelUnitTest second() start =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;SecondParallelUnitTest second() end =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们用同一个批次运行测试之前，我们需要设置属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>junit.jupiter.execution.parallel.mode.classes.default = concurrent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们运行这两个测试类时，我们得到以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SecondParallelUnitTest second() start =&gt; ForkJoinPool-1-worker-23
FirstParallelUnitTest first() start =&gt; ForkJoinPool-1-worker-19
FirstParallelUnitTest second() start =&gt; ForkJoinPool-1-worker-9
SecondParallelUnitTest first() start =&gt; ForkJoinPool-1-worker-5
FirstParallelUnitTest first() end =&gt; ForkJoinPool-1-worker-19
SecondParallelUnitTest first() end =&gt; ForkJoinPool-1-worker-5
FirstParallelUnitTest second() end =&gt; ForkJoinPool-1-worker-9
SecondParallelUnitTest second() end =&gt; ForkJoinPool-1-worker-23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出中，我们可以看到所有四个测试在不同的线程中并行运行。</p><p>结合我们在本节和前一节中提到的两个属性及其值（<em>same_thread和concurrent</em>），我们得到四种不同的执行模式：</p><ol><li>(<em>same_thread, same_thread</em>) – 所有测试顺序运行</li><li>(<em>same_thread, concurrent</em>) – 一个类的测试顺序运行，但多个类并行运行</li><li>(<em>concurrent, same_thread</em>) – 一个类的测试并行运行，但每个类单独运行</li><li>(<em>concurrent, concurrent</em>) – 测试并行运行</li></ol><h2 id="_5-同步" tabindex="-1"><a class="header-anchor" href="#_5-同步"><span>5. 同步</span></a></h2><p>在理想情况下，我们所有的单元测试都是独立的和隔离的。然而，有时这很难实现，因为它们依赖于共享资源。然后，在并行运行测试时，我们需要在测试中同步共同资源。JUnit5提供了这样的机制，以_<code>@ResourceLock</code>_注解的形式。</p><p>同样，让我们创建_<code>ParallelResourceLockUnitTest</code>_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ParallelResourceLockUnitTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` resources<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        resources <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        resources<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@AfterEach</span>
    <span class="token keyword">void</span> <span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        resources<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@ResourceLock</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;resources&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;ParallelResourceLockUnitTest first() start =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        resources<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>resources<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;ParallelResourceLockUnitTest first() end =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@ResourceLock</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;resources&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">second</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;ParallelResourceLockUnitTest second() start =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        resources<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;second&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>resources<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;ParallelResourceLockUnitTest second() end =&gt; &quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_<code>@ResourceLock</code><em>允许我们指定哪个资源是共享的以及我们想要使用的锁类型（默认是_ResourceAccessMode.READ_WRITE</em>）</strong>。通过当前设置，JUnit引擎将检测到我们的测试都使用了一个共享资源，并将它们顺序执行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ParallelResourceLockUnitTest second() start =&gt; ForkJoinPool-1-worker-5
[test, second]
ParallelResourceLockUnitTest second() end =&gt; ForkJoinPool-1-worker-5
ParallelResourceLockUnitTest first() start =&gt; ForkJoinPool-1-worker-19
[test, first]
ParallelResourceLockUnitTest first() end =&gt; ForkJoinPool-1-worker-19
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们首先介绍了如何配置并行执行。接下来，介绍了并行性的可用策略以及如何配置线程数量？之后，我们介绍了不同配置如何影响测试执行。最后，我们介绍了共享资源的同步。</p><p>如常，本文的代码可以在GitHub上找到。</p>`,43),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-25-Parallel Test Execution for JUnit 5.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Parallel%20Test%20Execution%20for%20JUnit%205.html","title":"JUnit 5的并行测试执行","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JUnit","并行测试"],"tag":["JUnit 5","并行执行"],"head":[["meta",{"name":"keywords","content":"JUnit 5, 并行测试, 单元测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Parallel%20Test%20Execution%20for%20JUnit%205.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JUnit 5的并行测试执行"}],["meta",{"property":"og:description","content":"JUnit 5的并行测试执行 在这篇文章中，我们将介绍如何使用JUnit 5执行并行单元测试。首先，我们将介绍基本配置和使用此功能的最低要求。接下来，我们将展示不同情况下的代码示例，并在最后讨论共享资源的同步。 并行测试执行是一个自5.3版本以来可选加入的实验性功能。 2. 配置 首先，我们需要在_src/test/resources_文件夹中创建一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T06:53:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JUnit 5"}],["meta",{"property":"article:tag","content":"并行执行"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T06:53:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUnit 5的并行测试执行\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T06:53:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JUnit 5的并行测试执行 在这篇文章中，我们将介绍如何使用JUnit 5执行并行单元测试。首先，我们将介绍基本配置和使用此功能的最低要求。接下来，我们将展示不同情况下的代码示例，并在最后讨论共享资源的同步。 并行测试执行是一个自5.3版本以来可选加入的实验性功能。 2. 配置 首先，我们需要在_src/test/resources_文件夹中创建一个..."},"headers":[{"level":2,"title":"2. 配置","slug":"_2-配置","link":"#_2-配置","children":[]},{"level":2,"title":"3. 同一类中的测试并行化","slug":"_3-同一类中的测试并行化","link":"#_3-同一类中的测试并行化","children":[]},{"level":2,"title":"4. 同一模块中的测试并行化","slug":"_4-同一模块中的测试并行化","link":"#_4-同一模块中的测试并行化","children":[]},{"level":2,"title":"5. 同步","slug":"_5-同步","link":"#_5-同步","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721890437000,"updatedTime":1721890437000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5,"words":1500},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Parallel Test Execution for JUnit 5.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇文章中，我们将介绍如何使用JUnit 5执行并行单元测试。首先，我们将介绍基本配置和使用此功能的最低要求。接下来，我们将展示不同情况下的代码示例，并在最后讨论共享资源的同步。</p>\\n<p>并行测试执行是一个自5.3版本以来可选加入的实验性功能。</p>\\n<h2>2. 配置</h2>\\n<p>首先，<strong>我们需要在_src/test/resources_文件夹中创建一个_junit-platform.properties_文件以启用并行测试执行</strong>。我们通过在上述文件中添加以下行来启用并行化特性：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>junit.jupiter.execution.parallel.enabled = true\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
