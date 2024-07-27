import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t(`<h1 id="获取java当前堆栈跟踪" tabindex="-1"><a class="header-anchor" href="#获取java当前堆栈跟踪"><span>获取Java当前堆栈跟踪</span></a></h1><p>作为一个Java开发者，在处理异常时经常会遇到堆栈跟踪的概念。</p><p>在本教程中，<strong>我们将理解堆栈跟踪是什么以及如何在编程/调试中使用它。</strong> 此外，我们还将了解_StackTraceElement_类。最后，我们将学习如何使用_Thread_和_Throwable_类来获取它。</p><h2 id="_2-什么是堆栈跟踪" tabindex="-1"><a class="header-anchor" href="#_2-什么是堆栈跟踪"><span>2. 什么是堆栈跟踪？</span></a></h2><p><strong>堆栈跟踪，也称为回溯，是堆栈帧的列表。</strong> 简单来说，这些帧代表了程序执行过程中的一个时刻。</p><p>一个堆栈帧<strong>包含了代码调用的方法的信息</strong>。它是从当前方法开始，一直延伸到程序开始时的一系列帧。</p><p>为了更好地理解这一点，让我们看一个快速示例，我们在异常后转储了当前的堆栈跟踪：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DumpStackTraceDemo</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> num1 <span class="token operator">=</span> <span class="token number">5</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// java.lang.ArithmeticException: divide by zero</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，_methodA()<em>抛出了_ArithmeticException</em>，这反过来在_catch_块中转储了当前的堆栈跟踪：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.lang.ArithmeticException: / by zero
at main.java.com.baeldung.tutorials.DumpStackTraceDemo.methodA(DumpStackTraceDemo.java:11)
at main.java.com.baeldung.tutorials.DumpStackTraceDemo.main(DumpStackTraceDemo.java:6)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-stacktraceelement-类" tabindex="-1"><a class="header-anchor" href="#_3-stacktraceelement-类"><span><strong>3. <em>StackTraceElement</em> 类</strong></span></a></h2><p><strong>堆栈跟踪由_StackTraceElement_类的元素组成。</strong> 我们可以使用以下方法分别获取类和方法名称：</p><ul><li><em>getClassName</em> – 返回包含当前执行点的类的完全限定名称。</li><li><em>getMethodName</em> – 返回表示此堆栈跟踪元素的执行点的方法名称。</li></ul><p>我们可以在Java API文档中看到_StackTraceElement_类的完整方法列表及其详细信息。</p><h2 id="_4-使用-thread-类获取堆栈跟踪" tabindex="-1"><a class="header-anchor" href="#_4-使用-thread-类获取堆栈跟踪"><span>4. 使用_Thread_类获取堆栈跟踪</span></a></h2><p>我们可以通过在_Thread_实例上调用_getStackTrace()_方法来从线程获取堆栈跟踪。它返回一个_StackTraceElement_数组，从中可以找到线程的堆栈帧的详细信息。</p><p>让我们看一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StackTraceUsingThreadDemo</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">StackTraceElement</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">methodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">StackTraceElement</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">methodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> thread <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> thread<span class="token punctuation">.</span><span class="token function">getStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的类中，方法调用的方式如下 – <em>main() -&gt; methodA() -&gt; methodB() -&gt; getStackTrace()</em>。</p><p>让我们通过以下测试用例来验证它，其中测试用例方法调用_methodA()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenElementIsFetchedUsingThread_thenCorrectMethodAndClassIsReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StackTraceElement</span><span class="token punctuation">[</span><span class="token punctuation">]</span> stackTrace <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StackTraceUsingThreadDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">StackTraceElement</span> elementZero <span class="token operator">=</span> stackTrace<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;java.lang.Thread&quot;</span><span class="token punctuation">,</span> elementZero<span class="token punctuation">.</span><span class="token function">getClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;getStackTrace&quot;</span><span class="token punctuation">,</span> elementZero<span class="token punctuation">.</span><span class="token function">getMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">StackTraceElement</span> elementOne <span class="token operator">=</span> stackTrace<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.tutorials.StackTraceUsingThreadDemo&quot;</span><span class="token punctuation">,</span> elementOne<span class="token punctuation">.</span><span class="token function">getClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;methodB&quot;</span><span class="token punctuation">,</span> elementOne<span class="token punctuation">.</span><span class="token function">getMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">StackTraceElement</span> elementTwo <span class="token operator">=</span> stackTrace<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.tutorials.StackTraceUsingThreadDemo&quot;</span><span class="token punctuation">,</span> elementTwo<span class="token punctuation">.</span><span class="token function">getClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;methodA&quot;</span><span class="token punctuation">,</span> elementTwo<span class="token punctuation">.</span><span class="token function">getMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">StackTraceElement</span> elementThree <span class="token operator">=</span> stackTrace<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;test.java.com.baeldung.tutorials.CurrentStacktraceDemoUnitTest&quot;</span><span class="token punctuation">,</span> elementThree<span class="token punctuation">.</span><span class="token function">getClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;whenElementIsFetchedUsingThread_thenCorrectMethodAndClassIsReturned&quot;</span><span class="token punctuation">,</span> elementThree<span class="token punctuation">.</span><span class="token function">getMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试用例中，我们使用_StackTraceUsingThreadDemo_类的_methodB()_获取了_StackTraceElement_数组。然后，使用_StackTraceElement_类的_getClassName()_和_getMethodName()_方法验证了堆栈跟踪中的方法和类名称。</p><h2 id="_5-使用-throwable-类获取堆栈跟踪" tabindex="-1"><a class="header-anchor" href="#_5-使用-throwable-类获取堆栈跟踪"><span>5. 使用_Throwable_类获取堆栈跟踪</span></a></h2><p>当任何Java程序抛出_Throwable_对象时，我们可以通过调用_getStackTrace()_方法而不是简单地将其打印到控制台或记录它，来获得一个_StackTraceElement_对象数组。</p><p>让我们看一个示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StackTraceUsingThrowableDemo</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">StackTraceElement</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">methodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> t<span class="token punctuation">.</span><span class="token function">getStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">methodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Throwable</span><span class="token punctuation">(</span><span class="token string">&quot;A test exception&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，方法调用的方式如下 – <em>main() -&gt; methodA() -&gt; methodB() -&gt; getStackTrace()</em>。</p><p>让我们使用一个测试来验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenElementIsFecthedUsingThrowable_thenCorrectMethodAndClassIsReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StackTraceElement</span><span class="token punctuation">[</span><span class="token punctuation">]</span> stackTrace <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StackTraceUsingThrowableDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">StackTraceElement</span> elementZero <span class="token operator">=</span> stackTrace<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.tutorials.StackTraceUsingThrowableDemo&quot;</span><span class="token punctuation">,</span> elementZero<span class="token punctuation">.</span><span class="token function">getClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;methodB&quot;</span><span class="token punctuation">,</span> elementZero<span class="token punctuation">.</span><span class="token function">getMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">StackTraceElement</span> elementOne <span class="token operator">=</span> stackTrace<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.tutorials.StackTraceUsingThrowableDemo&quot;</span><span class="token punctuation">,</span> elementOne<span class="token punctuation">.</span><span class="token function">getClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;methodA&quot;</span><span class="token punctuation">,</span> elementOne<span class="token punctuation">.</span><span class="token function">getMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">StackTraceElement</span> elementThree <span class="token operator">=</span> stackTrace<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;test.java.com.baeldung.tutorials.CurrentStacktraceDemoUnitTest&quot;</span><span class="token punctuation">,</span> elementThree<span class="token punctuation">.</span><span class="token function">getClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;whenElementIsFecthedUsingThrowable_thenCorrectMethodAndClassIsReturned&quot;</span><span class="token punctuation">,</span> elementThree<span class="token punctuation">.</span><span class="token function">getMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试用例中，我们使用_StackTraceUsingThrowableDemo_类的_methodB()_获取了_StackTraceElement_数组。然后，验证了方法和类名称以理解_StackTraceElement_类数组中元素的顺序。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了Java堆栈跟踪以及如何在异常情况下使用_printStackTrace()_方法来打印它。我们还查看了如何使用_Thread_和_Throwable_类获取当前堆栈跟踪。</p><p>如往常一样，本文的完整代码示例可以在GitHub上找到。</p>`,33),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","2024-07-16-Get the Current Stack Trace in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Get%20the%20Current%20Stack%20Trace%20in%20Java.html","title":"获取Java当前堆栈跟踪","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","异常处理"],"tag":["Stack Trace","Thread","Throwable"],"head":[["meta",{"name":"keywords","content":"Java, Stack Trace, Thread, Throwable, 异常处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Get%20the%20Current%20Stack%20Trace%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"获取Java当前堆栈跟踪"}],["meta",{"property":"og:description","content":"获取Java当前堆栈跟踪 作为一个Java开发者，在处理异常时经常会遇到堆栈跟踪的概念。 在本教程中，我们将理解堆栈跟踪是什么以及如何在编程/调试中使用它。 此外，我们还将了解_StackTraceElement_类。最后，我们将学习如何使用_Thread_和_Throwable_类来获取它。 2. 什么是堆栈跟踪？ 堆栈跟踪，也称为回溯，是堆栈帧的列..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T16:07:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Stack Trace"}],["meta",{"property":"article:tag","content":"Thread"}],["meta",{"property":"article:tag","content":"Throwable"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T16:07:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"获取Java当前堆栈跟踪\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T16:07:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"获取Java当前堆栈跟踪 作为一个Java开发者，在处理异常时经常会遇到堆栈跟踪的概念。 在本教程中，我们将理解堆栈跟踪是什么以及如何在编程/调试中使用它。 此外，我们还将了解_StackTraceElement_类。最后，我们将学习如何使用_Thread_和_Throwable_类来获取它。 2. 什么是堆栈跟踪？ 堆栈跟踪，也称为回溯，是堆栈帧的列..."},"headers":[{"level":2,"title":"2. 什么是堆栈跟踪？","slug":"_2-什么是堆栈跟踪","link":"#_2-什么是堆栈跟踪","children":[]},{"level":2,"title":"3. StackTraceElement 类","slug":"_3-stacktraceelement-类","link":"#_3-stacktraceelement-类","children":[]},{"level":2,"title":"4. 使用_Thread_类获取堆栈跟踪","slug":"_4-使用-thread-类获取堆栈跟踪","link":"#_4-使用-thread-类获取堆栈跟踪","children":[]},{"level":2,"title":"5. 使用_Throwable_类获取堆栈跟踪","slug":"_5-使用-throwable-类获取堆栈跟踪","link":"#_5-使用-throwable-类获取堆栈跟踪","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721146057000,"updatedTime":1721146057000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.24,"words":972},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Get the Current Stack Trace in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>作为一个Java开发者，在处理异常时经常会遇到堆栈跟踪的概念。</p>\\n<p>在本教程中，<strong>我们将理解堆栈跟踪是什么以及如何在编程/调试中使用它。</strong> 此外，我们还将了解_StackTraceElement_类。最后，我们将学习如何使用_Thread_和_Throwable_类来获取它。</p>\\n<h2>2. 什么是堆栈跟踪？</h2>\\n<p><strong>堆栈跟踪，也称为回溯，是堆栈帧的列表。</strong> 简单来说，这些帧代表了程序执行过程中的一个时刻。</p>\\n<p>一个堆栈帧<strong>包含了代码调用的方法的信息</strong>。它是从当前方法开始，一直延伸到程序开始时的一系列帧。</p>","autoDesc":true}');export{k as comp,d as data};
