import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-ConjvFaO.js";const t={},p=e(`<hr><h1 id="解决mockito异常-期望调用但未被调用" tabindex="-1"><a class="header-anchor" href="#解决mockito异常-期望调用但未被调用"><span>解决Mockito异常：期望调用但未被调用</span></a></h1><p>在本教程中，我们将讨论在使用Mockito时可能遇到的一个常见错误。异常信息是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>期望调用但未被调用：
// 类名和位置
实际上，与此模拟对象没有交互。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们了解这个错误的潜在来源以及如何修复它。</p><h2 id="_2-示例设置" tabindex="-1"><a class="header-anchor" href="#_2-示例设置"><span>2. 示例设置</span></a></h2><p>首先，让我们创建稍后我们将模拟的类。它包含一个总是返回字符串&quot;Baeldung&quot;的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Helper</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建主类。它在类级别声明了一个Helper实例。<strong>我们希望在单元测试期间模拟这个实例：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token class-name">Helper</span> helper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> helper<span class="token punctuation">.</span><span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，我们定义了一个接受一个整数作为参数并返回以下结果的方法：</p><ul><li>如果整数大于5，则返回调用getBaeldungString()的结果</li><li>如果整数小于或等于5，则返回一个常量</li></ul><h2 id="_3-调用了实际方法而不是模拟方法" tabindex="-1"><a class="header-anchor" href="#_3-调用了实际方法而不是模拟方法"><span>3. 调用了实际方法而不是模拟方法</span></a></h2><p>让我们尝试为我们的方法编写一个单元测试。我们将使用@Mock注解来创建一个模拟的Helper。我们还将调用MockitoAnnotations.openMocks()以启用Mockito注解。在测试方法中，我们将使用参数7调用methodUnderTest()并检查它是否委托给getBaeldungString()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MainUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Mock</span>
    <span class="token class-name">Helper</span> helper<span class="token punctuation">;</span>

    <span class="token class-name">Main</span> main <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MockitoAnnotations</span><span class="token punctuation">.</span><span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenValueUpperThan5_WhenMethodUnderTest_ThenDelegatesToHelperClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        main<span class="token punctuation">.</span><span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>helper<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们运行我们的测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>期望调用但未被调用：
helper.getBaeldungString();
-&gt; 在 com.baeldung.wantedbutnotinvocked.Helper.getBaeldungString(Helper.java:6)
实际上，与这个模拟对象没有交互。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题是我们调用了构造函数来实例化一个Main对象。因此，Helper实例是通过调用new()创建的。<strong>因此，我们使用了一个真实的Helper对象而不是我们的模拟。</strong> 为了解决这个问题，我们需要在我们的Main对象创建上添加@InjectMocks：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@InjectMocks</span>
<span class="token class-name">Main</span> main <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>作为旁注，如果我们在methodUnderTest()的任何时候用一个真实的对象替换模拟实例，我们将再次遇到同样的问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    helper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> helper<span class="token punctuation">.</span><span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，我们这里有两个注意事项：</p><ul><li>模拟应该被正确创建并注入。</li><li>模拟在任何时候都不应被其他对象替换。</li></ul><h2 id="_4-方法未被调用" tabindex="-1"><a class="header-anchor" href="#_4-方法未被调用"><span>4. 方法未被调用</span></a></h2><p>我们现在将编写一个新的单元测试。它将检查传递3作为参数给methodUnderTest()是否会导致调用getBaeldungString()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenValueLowerThan5_WhenMethodUnderTest_ThenDelegatesToGetBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    main<span class="token punctuation">.</span><span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>helper<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>期望调用但未被调用：
helper.getBaeldungString();
-&gt; 在 com.baeldung.wantedbutnotinvocked.Helper.getBaeldungString(Helper.java:6)
实际上，与这个模拟对象没有交互。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一次，让我们仔细阅读错误消息。它说我们没有与模拟交互。现在让我们回顾一下方法的规范：3小于5，所以methodUnderTest()返回一个常量而不是委托给getBaeldungString()。<strong>因此，我们的测试与规范相矛盾。</strong></p><p>在这种情况下，我们只有两个可能的结论：</p><ul><li>规范是正确的：我们需要修复我们的测试，因为验证是无用的。</li><li>测试是正确的：我们的代码中有一个我们需要解决的bug。</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇文章中，我们在没有与模拟交互的情况下调用了Mockito.verify()并得到了一个错误。我们指出了我们需要正确地注入和使用模拟。我们还看到了由于测试不一致而出现这个错误。</p><p>像往常一样，代码可以在GitHub上找到。--- date: 2022-04-01 category:</p><ul><li>Mockito</li><li>Testing tag:</li><li>Mockito</li><li>Testing</li><li>Exception head:</li><li><ul><li>meta</li><li>name: keywords content: Mockito, Testing, Exception, Java</li></ul></li></ul><hr><h1 id="解决mockito异常-期望调用但未被调用-1" tabindex="-1"><a class="header-anchor" href="#解决mockito异常-期望调用但未被调用-1"><span>解决Mockito异常：期望调用但未被调用</span></a></h1><p>在本教程中，我们将讨论在使用Mockito时可能遇到的一个常见错误。异常信息是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>期望调用但未被调用：
// 类名和位置
实际上，与此模拟对象没有交互。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们了解这个错误的潜在来源以及如何修复它。</p><h2 id="_2-示例设置-1" tabindex="-1"><a class="header-anchor" href="#_2-示例设置-1"><span>2. 示例设置</span></a></h2><p>首先，让我们创建稍后我们将模拟的类。它包含一个总是返回字符串&quot;Baeldung&quot;的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Helper</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们创建主类。它在类级别声明了一个Helper实例。<strong>我们希望在单元测试期间模拟这个实例：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token class-name">Helper</span> helper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> helper<span class="token punctuation">.</span><span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，我们定义了一个方法，它接受一个整数作为参数，并返回以下结果：</p><ul><li>如果整数大于5，则返回调用<code>getBaeldungString()</code>的结果。</li><li>如果整数小于或等于5，则返回一个常量值。</li></ul><h2 id="_3-调用了实际方法而不是模拟方法-1" tabindex="-1"><a class="header-anchor" href="#_3-调用了实际方法而不是模拟方法-1"><span>3. 调用了实际方法而不是模拟方法</span></a></h2><p>让我们尝试为我们的方法编写一个单元测试。我们将使用<code>@Mock</code>注解来创建一个模拟的<code>Helper</code>。我们还将调用<code>MockitoAnnotations.openMocks()</code>以启用Mockito注解。在测试方法中，我们将使用参数7调用<code>methodUnderTest()</code>并检查它是否委托给<code>getBaeldungString()</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MainUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Mock</span>
    <span class="token class-name">Helper</span> helper<span class="token punctuation">;</span>

    <span class="token class-name">Main</span> main <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MockitoAnnotations</span><span class="token punctuation">.</span><span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenValueUpperThan5_WhenMethodUnderTest_ThenDelegatesToHelperClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">when</span><span class="token punctuation">(</span>main<span class="token punctuation">.</span>helper<span class="token punctuation">.</span><span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> main<span class="token punctuation">.</span><span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">verify</span><span class="token punctuation">(</span>helper<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行这个测试，可能会遇到以下错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>期望调用但未被调用：
helper.getBaeldungString();
-&gt; 在 Helper.getBaeldungString(Helper.java:6)
实际上，与这个模拟对象没有交互。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题在于我们通过调用构造函数来实例化一个<code>Main</code>对象。因此，<code>Helper</code>实例是通过调用<code>new()</code>创建的。<strong>因此，我们使用的是一个真实的<code>Helper</code>对象而不是我们的模拟。</strong> 为了解决这个问题，我们需要在<code>Main</code>对象创建上添加<code>@InjectMocks</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@InjectMocks</span>
<span class="token class-name">Main</span> main <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>作为补充，如果我们在<code>methodUnderTest()</code>的任何时候用一个真实的对象替换模拟实例，我们将再次遇到同样的问题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    helper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这里不应该替换模拟对象</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> helper<span class="token punctuation">.</span><span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，我们这里有两个注意事项：</p><ul><li>模拟应该被正确创建并注入。</li><li>模拟在任何时候都不应被其他对象替换。</li></ul><h2 id="_4-方法未被调用-1" tabindex="-1"><a class="header-anchor" href="#_4-方法未被调用-1"><span>4. 方法未被调用</span></a></h2><p>我们现在将编写一个新的单元测试。它将检查传递3作为参数给<code>methodUnderTest()</code>是否会导致调用<code>getBaeldungString()</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenValueLowerThan5_WhenMethodUnderTest_ThenDoesNotDelegateToGetBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> main<span class="token punctuation">.</span><span class="token function">methodUnderTest</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">verify</span><span class="token punctuation">(</span>helper<span class="token punctuation">,</span> <span class="token function">never</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBaeldungString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行这个测试，我们可能会得到一个错误，因为根据<code>methodUnderTest()</code>的规范，当参数小于5时，它不应该调用<code>getBaeldungString()</code>。<strong>因此，我们的测试与规范相矛盾。</strong></p><p>在这种情况下，我们只有两个可能的结论：</p><ul><li>规范是正确的：我们需要修复我们的测试，因为验证是无用的。</li><li>测试是正确的：我们的代码中有一个我们需要解决的bug。</li></ul><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在本文中，我们调用了<code>Mockito.verify()</code>但没有与模拟交互，并得到了一个错误。我们指出了我们需要正确地注入和使用模拟。我们还看到了由于测试不一致而出现这个错误。</p><p>如往常一样，代码可以在GitHub上找到。</p><p>OK</p>`,68),i=[p];function o(l,c){return s(),a("div",null,i)}const r=n(t,[["render",o],["__file","2024-07-04-Resolving Mockito Exception  Wanted But Not Invoked.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Resolving%20Mockito%20Exception%20%20Wanted%20But%20Not%20Invoked.html","title":"解决Mockito异常：期望调用但未被调用","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Mockito","Testing"],"tag":["Mockito","Testing","Exception"],"head":[["meta",{"name":"keywords","content":"Mockito, Testing, Exception, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Resolving%20Mockito%20Exception%20%20Wanted%20But%20Not%20Invoked.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决Mockito异常：期望调用但未被调用"}],["meta",{"property":"og:description","content":"解决Mockito异常：期望调用但未被调用 在本教程中，我们将讨论在使用Mockito时可能遇到的一个常见错误。异常信息是： 让我们了解这个错误的潜在来源以及如何修复它。 2. 示例设置 首先，让我们创建稍后我们将模拟的类。它包含一个总是返回字符串\\"Baeldung\\"的方法： 现在让我们创建主类。它在类级别声明了一个Helper实例。我们希望在单元测试..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T07:56:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Mockito"}],["meta",{"property":"article:tag","content":"Testing"}],["meta",{"property":"article:tag","content":"Exception"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T07:56:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决Mockito异常：期望调用但未被调用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T07:56:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决Mockito异常：期望调用但未被调用 在本教程中，我们将讨论在使用Mockito时可能遇到的一个常见错误。异常信息是： 让我们了解这个错误的潜在来源以及如何修复它。 2. 示例设置 首先，让我们创建稍后我们将模拟的类。它包含一个总是返回字符串\\"Baeldung\\"的方法： 现在让我们创建主类。它在类级别声明了一个Helper实例。我们希望在单元测试..."},"headers":[{"level":2,"title":"2. 示例设置","slug":"_2-示例设置","link":"#_2-示例设置","children":[]},{"level":2,"title":"3. 调用了实际方法而不是模拟方法","slug":"_3-调用了实际方法而不是模拟方法","link":"#_3-调用了实际方法而不是模拟方法","children":[]},{"level":2,"title":"4. 方法未被调用","slug":"_4-方法未被调用","link":"#_4-方法未被调用","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"2. 示例设置","slug":"_2-示例设置-1","link":"#_2-示例设置-1","children":[]},{"level":2,"title":"3. 调用了实际方法而不是模拟方法","slug":"_3-调用了实际方法而不是模拟方法-1","link":"#_3-调用了实际方法而不是模拟方法-1","children":[]},{"level":2,"title":"4. 方法未被调用","slug":"_4-方法未被调用-1","link":"#_4-方法未被调用-1","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1720079791000,"updatedTime":1720079791000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.13,"words":1840},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Resolving Mockito Exception  Wanted But Not Invoked.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>解决Mockito异常：期望调用但未被调用</h1>\\n<p>在本教程中，我们将讨论在使用Mockito时可能遇到的一个常见错误。异常信息是：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>期望调用但未被调用：\\n// 类名和位置\\n实际上，与此模拟对象没有交互。\\n</code></pre></div><p>让我们了解这个错误的潜在来源以及如何修复它。</p>\\n<h2>2. 示例设置</h2>\\n<p>首先，让我们创建稍后我们将模拟的类。它包含一个总是返回字符串\\"Baeldung\\"的方法：</p>","autoDesc":true}');export{r as comp,k as data};
