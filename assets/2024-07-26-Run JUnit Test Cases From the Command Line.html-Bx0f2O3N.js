import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-D4B8YWfq.js";const t={},p=e(`<h1 id="从命令行运行junit测试用例" tabindex="-1"><a class="header-anchor" href="#从命令行运行junit测试用例"><span>从命令行运行JUnit测试用例</span></a></h1><p>在本教程中，我们将了解如何直接从命令行运行JUnit 5测试。</p><h2 id="测试场景" tabindex="-1"><a class="header-anchor" href="#测试场景"><span>测试场景</span></a></h2><p>之前，我们已经介绍了如何以编程方式运行JUnit测试。对于我们的示例，我们将使用相同的JUnit测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FirstUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenThis_thenThat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenSomething_thenSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenSomethingElse_thenSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecondUnitTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenSomething_thenSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whensomethingElse_thenSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运行junit-5测试" tabindex="-1"><a class="header-anchor" href="#运行junit-5测试"><span>运行JUnit 5测试</span></a></h2><p>我们可以使用JUnit的控制台启动器来运行JUnit 5测试用例。这个jar的可执行文件可以从Maven中央仓库的_junit-platform-console-standalone_目录下载。</p><p>我们还需要一个目录来包含所有编译后的类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">mkdir</span> target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们看看如何使用控制台启动器运行不同的测试用例。</p><h3 id="_3-1-运行单个测试类" tabindex="-1"><a class="header-anchor" href="#_3-1-运行单个测试类"><span>3.1. 运行单个测试类</span></a></h3><p>在我们运行测试类之前，让我们先编译它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-d</span> target <span class="token parameter variable">-cp</span> target:junit-platform-console-standalone-1.7.2.jar src/test/java/com/baeldung/commandline/FirstUnitTest.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们将使用JUnit控制台启动器运行编译后的测试类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-jar</span> junit-platform-console-standalone-1.7.2.jar --class-path target --select-class com.baeldung.commandline.FirstUnitTest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将给出我们的测试运行结果：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>Test run finished after <span class="token number">60</span> ms
<span class="token punctuation">[</span>         <span class="token number">3</span> containers found      <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">0</span> containers skipped    <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">3</span> containers started    <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">0</span> containers aborted    <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">3</span> containers successful <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">0</span> containers failed     <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">3</span> tests found           <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">0</span> tests skipped         <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">3</span> tests started         <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">0</span> tests aborted         <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">3</span> tests successful      <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">0</span> tests failed          <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-运行多个测试类" tabindex="-1"><a class="header-anchor" href="#_3-2-运行多个测试类"><span>3.2. 运行多个测试类</span></a></h3><p>再次，让我们编译我们想要运行的测试类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-d</span> target <span class="token parameter variable">-cp</span> target:junit-platform-console-standalone-1.7.2.jar src/test/java/com/baeldung/commandline/FirstUnitTest.java src/test/java/com/baeldung/commandline/SecondUnitTest.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我们将使用控制台启动器运行编译后的测试类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-jar</span> junit-platform-console-standalone-1.7.2.jar --class-path target --select-class com.baeldung.commandline.FirstUnitTest --select-class com.baeldung.commandline.SecondUnitTest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们的结果现在显示所有五个测试方法都是成功的：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>Test run finished after <span class="token number">68</span> ms
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>         <span class="token number">5</span> tests found           <span class="token punctuation">]</span>
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>         <span class="token number">5</span> tests successful      <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">0</span> tests failed          <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-运行包中的所有测试类" tabindex="-1"><a class="header-anchor" href="#_3-3-运行包中的所有测试类"><span>3.3. 运行包中的所有测试类</span></a></h3><p>要运行包中的所有测试类，让我们编译我们包中存在的所有测试类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ javac <span class="token parameter variable">-d</span> target <span class="token parameter variable">-cp</span> target:junit-platform-console-standalone-1.7.2.jar src/test/java/com/baeldung/commandline/*.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再次，我们将运行我们包中的编译测试类：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-jar</span> junit-platform-console-standalone-1.7.2.jar --class-path target --select-package com.baeldung.commandline
<span class="token punctuation">..</span>.
Test run finished after <span class="token number">68</span> ms
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>         <span class="token number">5</span> tests found           <span class="token punctuation">]</span>
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>         <span class="token number">5</span> tests successful      <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">0</span> tests failed          <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-运行所有测试类" tabindex="-1"><a class="header-anchor" href="#_3-4-运行所有测试类"><span>3.4. 运行所有测试类</span></a></h3><p>让我们运行所有的测试用例：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-jar</span> junit-platform-console-standalone-1.7.2.jar --class-path target --scan-class-path
<span class="token punctuation">..</span>.
Test run finished after <span class="token number">68</span> ms
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>         <span class="token number">5</span> tests found           <span class="token punctuation">]</span>
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>         <span class="token number">5</span> tests successful      <span class="token punctuation">]</span>
<span class="token punctuation">[</span>         <span class="token number">0</span> tests failed          <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用maven运行junit" tabindex="-1"><a class="header-anchor" href="#使用maven运行junit"><span>使用Maven运行JUnit</span></a></h2><p>如果我们使用<strong>Maven作为我们的构建工具</strong>，我们可以直接从命令行执行测试用例。</p><h3 id="_4-1-运行单个测试用例" tabindex="-1"><a class="header-anchor" href="#_4-1-运行单个测试用例"><span>4.1. 运行单个测试用例</span></a></h3><p>要在控制台上运行单个测试用例，让我们执行以下命令，指定测试类的名称：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn <span class="token builtin class-name">test</span> <span class="token parameter variable">-Dtest</span><span class="token operator">=</span>SecondUnitTest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将给出我们的测试运行结果：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">2</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>, Time elapsed: <span class="token number">0.069</span> s - <span class="token keyword">in</span> com.baeldung.commandline.SecondUnitTest
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Results:
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">2</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD SUCCESS
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Total time: <span class="token number">7.211</span> s <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Finished at: <span class="token number">2021</span>-08-02T23:13:41+05:30
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-运行多个测试用例" tabindex="-1"><a class="header-anchor" href="#_4-2-运行多个测试用例"><span>4.2. 运行多个测试用例</span></a></h3><p>要在控制台上运行多个测试用例，让我们执行命令，指定我们想要执行的所有测试类的名称：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn <span class="token builtin class-name">test</span> <span class="token parameter variable">-Dtest</span><span class="token operator">=</span>FirstUnitTest,SecondUnitTest
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">2</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>, Time elapsed: <span class="token number">0.069</span> s - <span class="token keyword">in</span> com.baeldung.commandline.SecondUnitTest
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">3</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>, Time elapsed: <span class="token number">0.069</span> s - <span class="token keyword">in</span> com.baeldung.commandline.FirstUnitTest
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Results:
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">5</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD SUCCESS
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Total time:  <span class="token number">7.211</span> s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Finished at: <span class="token number">2021</span>-08-02T23:13:41+05:30
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-运行包中的所有测试用例" tabindex="-1"><a class="header-anchor" href="#_4-3-运行包中的所有测试用例"><span>4.3. 运行包中的所有测试用例</span></a></h3><p>要在控制台上运行包中的所有测试用例，我们需要将包名称作为命令的一部分：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn <span class="token builtin class-name">test</span> <span class="token parameter variable">-Dtest</span><span class="token operator">=</span><span class="token string">&quot;com.baeldung.commandline.**&quot;</span>
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">2</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>, Time elapsed: <span class="token number">0.069</span> s - <span class="token keyword">in</span> com.baeldung.commandline.SecondUnitTest
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">3</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>, Time elapsed: <span class="token number">0.069</span> s - <span class="token keyword">in</span> com.baeldung.commandline.FirstUnitTest
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Results:
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">5</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD SUCCESS
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Total time:  <span class="token number">7.211</span> s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Finished at: <span class="token number">2021</span>-08-02T23:13:41+05:30
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-运行所有测试用例" tabindex="-1"><a class="header-anchor" href="#_4-4-运行所有测试用例"><span>4.4. 运行所有测试用例</span></a></h3><p>最后，要在控制台上使用Maven运行所有测试用例，我们只需执行_mvn clean test_：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn clean <span class="token builtin class-name">test</span>
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">2</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>, Time elapsed: <span class="token number">0.069</span> s - <span class="token keyword">in</span> com.baeldung.commandline.SecondUnitTest
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">3</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>, Time elapsed: <span class="token number">0.069</span> s - <span class="token keyword">in</span> com.baeldung.commandline.FirstUnitTest
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Results:
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Tests run: <span class="token number">5</span>, Failures: <span class="token number">0</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD SUCCESS
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Total time:  <span class="token number">7.211</span> s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Finished at: <span class="token number">2021</span>-08-02T23:13:41+05:30
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了如何直接从命令行运行JUnit测试，涵盖了使用和不使用Maven的JUnit 5。</p><p>示例的实现可在GitHub上找到。</p>`,51),i=[p];function c(l,o){return a(),s("div",null,i)}const r=n(t,[["render",c],["__file","2024-07-26-Run JUnit Test Cases From the Command Line.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Run%20JUnit%20Test%20Cases%20From%20the%20Command%20Line.html","title":"从命令行运行JUnit测试用例","lang":"zh-CN","frontmatter":{"date":"2024-07-27T00:00:00.000Z","category":["Testing","JUnit"],"tag":["JUnit 5","Command Line"],"head":[["meta",{"name":"keywords","content":"JUnit, Command Line, Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Run%20JUnit%20Test%20Cases%20From%20the%20Command%20Line.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从命令行运行JUnit测试用例"}],["meta",{"property":"og:description","content":"从命令行运行JUnit测试用例 在本教程中，我们将了解如何直接从命令行运行JUnit 5测试。 测试场景 之前，我们已经介绍了如何以编程方式运行JUnit测试。对于我们的示例，我们将使用相同的JUnit测试： 运行JUnit 5测试 我们可以使用JUnit的控制台启动器来运行JUnit 5测试用例。这个jar的可执行文件可以从Maven中央仓库的_ju..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T18:14:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JUnit 5"}],["meta",{"property":"article:tag","content":"Command Line"}],["meta",{"property":"article:published_time","content":"2024-07-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T18:14:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从命令行运行JUnit测试用例\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T18:14:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从命令行运行JUnit测试用例 在本教程中，我们将了解如何直接从命令行运行JUnit 5测试。 测试场景 之前，我们已经介绍了如何以编程方式运行JUnit测试。对于我们的示例，我们将使用相同的JUnit测试： 运行JUnit 5测试 我们可以使用JUnit的控制台启动器来运行JUnit 5测试用例。这个jar的可执行文件可以从Maven中央仓库的_ju..."},"headers":[{"level":2,"title":"测试场景","slug":"测试场景","link":"#测试场景","children":[]},{"level":2,"title":"运行JUnit 5测试","slug":"运行junit-5测试","link":"#运行junit-5测试","children":[{"level":3,"title":"3.1. 运行单个测试类","slug":"_3-1-运行单个测试类","link":"#_3-1-运行单个测试类","children":[]},{"level":3,"title":"3.2. 运行多个测试类","slug":"_3-2-运行多个测试类","link":"#_3-2-运行多个测试类","children":[]},{"level":3,"title":"3.3. 运行包中的所有测试类","slug":"_3-3-运行包中的所有测试类","link":"#_3-3-运行包中的所有测试类","children":[]},{"level":3,"title":"3.4. 运行所有测试类","slug":"_3-4-运行所有测试类","link":"#_3-4-运行所有测试类","children":[]}]},{"level":2,"title":"使用Maven运行JUnit","slug":"使用maven运行junit","link":"#使用maven运行junit","children":[{"level":3,"title":"4.1. 运行单个测试用例","slug":"_4-1-运行单个测试用例","link":"#_4-1-运行单个测试用例","children":[]},{"level":3,"title":"4.2. 运行多个测试用例","slug":"_4-2-运行多个测试用例","link":"#_4-2-运行多个测试用例","children":[]},{"level":3,"title":"4.3. 运行包中的所有测试用例","slug":"_4-3-运行包中的所有测试用例","link":"#_4-3-运行包中的所有测试用例","children":[]},{"level":3,"title":"4.4. 运行所有测试用例","slug":"_4-4-运行所有测试用例","link":"#_4-4-运行所有测试用例","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1722017685000,"updatedTime":1722017685000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.95,"words":1185},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Run JUnit Test Cases From the Command Line.md","localizedDate":"2024年7月27日","excerpt":"\\n<p>在本教程中，我们将了解如何直接从命令行运行JUnit 5测试。</p>\\n<h2>测试场景</h2>\\n<p>之前，我们已经介绍了如何以编程方式运行JUnit测试。对于我们的示例，我们将使用相同的JUnit测试：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">FirstUnitTest</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Test</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">whenThis_thenThat</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Test</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">whenSomething_thenSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Test</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">whenSomethingElse_thenSomethingElse</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">SecondUnitTest</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Test</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">whenSomething_thenSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Test</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">whensomethingElse_thenSomethingElse</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
