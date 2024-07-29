import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as s}from"./app-BUAgDejY.js";const t={},p=s(`<h1 id="java中的错误与异常" tabindex="-1"><a class="header-anchor" href="#java中的错误与异常"><span>Java中的错误与异常</span></a></h1><p>在本教程中，我们将学习Java中的错误和异常以及它们之间的区别。</p><h2 id="_2-throwable类" tabindex="-1"><a class="header-anchor" href="#_2-throwable类"><span>2. Throwable类</span></a></h2><p><strong>错误(Error)和异常(Exception)都是Throwable类的子类，它们用于表示发生了异常情况</strong>。此外，只有Throwable及其子类的实例可以由Java虚拟机抛出或在catch子句中捕获。</p><p>错误和异常的实例被创建以包含有关情况的信息（例如，堆栈跟踪）：</p><h2 id="_3-错误-error" tabindex="-1"><a class="header-anchor" href="#_3-错误-error"><span>3. 错误(Error)</span></a></h2><p>错误表示不应该发生的异常情况。当发生严重问题时，会抛出错误。<strong>此外，错误被视为非检查异常，应用程序不应尝试捕获和处理它们</strong>。此外，错误在运行时发生，并且无法恢复。</p><p>现在让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ErrorExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">AssertionError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行上述代码，我们将得到以下结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Exception in thread &quot;main&quot; java.lang.AssertionError:
at com.baeldung.exception.exceptions_vs_errors.ErrorExample.main(ErrorExample.java:6)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>代码导致了一个名为_AssertionError_的错误，当断言失败时抛出。</p><p>Java错误的其他示例包括_StackOverflowError_、<em>LinkageError</em>、<em>IOError_和_VirtualMachineError</em>。</p><h2 id="_4-异常-exception" tabindex="-1"><a class="header-anchor" href="#_4-异常-exception"><span>4. 异常(Exception)</span></a></h2><p><strong>异常是应用程序可能想要捕获和处理的异常条件</strong>。异常可以使用_try-catch块_恢复，并且可以在运行时和编译时发生。</p><p>用于异常处理的一些技术包括_try-catch_块、_throws_关键字和_try-with-resources_块。</p><p>异常分为两类：运行时异常和已检查异常。</p><h3 id="_4-1-运行时异常-runtime-exceptions" tabindex="-1"><a class="header-anchor" href="#_4-1-运行时异常-runtime-exceptions"><span>4.1. 运行时异常(Runtime Exceptions)</span></a></h3><p>_RuntimeException_及其子类是在Java虚拟机运行时可能抛出的异常。此外，它们是非检查异常。如果它们可以在方法执行后抛出并传播到方法的作用域之外，则不需要在方法签名中使用_throws_关键字声明未检查异常。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RuntimeExceptionExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        arr<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行上述代码后，我们得到以下结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Exception in thread &quot;main&quot; java.lang.ArrayIndexOutOfBoundsException: 20
  at com.baeldung.exception.exceptions_vs_errors.RuntimeExceptionExample.main(RuntimeExceptionExample.java:7)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们得到了一个_ArrayIndexOutOfBoundsException_，它是_IndexOutOfBoundsException_的子类，而_IndexOutOfBoundsException_本身是_RuntimeException_的子类。</p><p><em>RuntimeException_的其他子类包括_IllegalArgumentException</em>、<em>NullPointerExeption_和_ArithmeticException</em>。</p><h3 id="_4-2-已检查异常-checked-exceptions" tabindex="-1"><a class="header-anchor" href="#_4-2-已检查异常-checked-exceptions"><span>4.2. 已检查异常(Checked Exceptions)</span></a></h3><p>不是_RuntimeException_子类的其他异常是已检查异常。如果它们可以在方法执行后抛出并传播到方法的作用域之外，则需要在方法签名中使用_throws_关键字声明它们：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CheckedExceptionExcample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;test.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行上述代码，我们将得到以下结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.io.FileNotFoundException: test.txt (No such file or directory)
  at java.io.FileInputStream.open0(Native Method)
  at java.io.FileInputStream.open(FileInputStream.java:195)
  at java.io.FileInputStream.\`&lt;init&gt;\`(FileInputStream.java:138)
  at com.baeldung.exception.exceptions_vs_errors.CheckedExceptionExcample.main(CheckedExceptionExcample.java:9)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们得到了一个_FileNotFoundException_，它是_IOError_的子类，而_IOError_本身是_Exception_的子类。</p><p>其他已检查异常的示例包括_TimeoutException_和_SQLException_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了Java生态系统中错误和异常之间的区别。</p><p>如往常一样，完整的代码示例可以在GitHub上找到。翻译已结束，以下是翻译的剩余部分：</p><h2 id="_5-结论-1" tabindex="-1"><a class="header-anchor" href="#_5-结论-1"><span>5. 结论</span></a></h2><p>在本文中，我们学习了Java生态系统中错误和异常之间的区别。</p><p>如往常一样，完整的代码示例可以在GitHub上找到。</p><p><a href="https://www.baeldung.com" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"></a><a href="https://www.baeldung.com" target="_blank" rel="noopener noreferrer"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"></a><a href="https://www.baeldung.com" target="_blank" rel="noopener noreferrer"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"></a><a href="https://www.baeldung.com" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"></a><a href="https://www.baeldung.com" target="_blank" rel="noopener noreferrer"><img src="https://www.baeldung.com/wp-content/uploads/2022/12/Throwable.png" alt="img" loading="lazy"></a></p><p>OK</p>`,40),o=[p];function c(i,r){return e(),a("div",null,o)}const d=n(t,[["render",c],["__file","2024-07-11-Errors and Exceptions in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Errors%20and%20Exceptions%20in%20Java.html","title":"Java中的错误与异常","lang":"zh-CN","frontmatter":{"date":"2022-12-01T00:00:00.000Z","category":["Java","异常与错误"],"tag":["Throwable","Error","Exception"],"head":[["meta",{"name":"keywords","content":"Java, 异常处理, 错误, 异常, Throwable"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Errors%20and%20Exceptions%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的错误与异常"}],["meta",{"property":"og:description","content":"Java中的错误与异常 在本教程中，我们将学习Java中的错误和异常以及它们之间的区别。 2. Throwable类 错误(Error)和异常(Exception)都是Throwable类的子类，它们用于表示发生了异常情况。此外，只有Throwable及其子类的实例可以由Java虚拟机抛出或在catch子句中捕获。 错误和异常的实例被创建以包含有关情况..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T21:03:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Throwable"}],["meta",{"property":"article:tag","content":"Error"}],["meta",{"property":"article:tag","content":"Exception"}],["meta",{"property":"article:published_time","content":"2022-12-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T21:03:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的错误与异常\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/Throwable.png\\"],\\"datePublished\\":\\"2022-12-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T21:03:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的错误与异常 在本教程中，我们将学习Java中的错误和异常以及它们之间的区别。 2. Throwable类 错误(Error)和异常(Exception)都是Throwable类的子类，它们用于表示发生了异常情况。此外，只有Throwable及其子类的实例可以由Java虚拟机抛出或在catch子句中捕获。 错误和异常的实例被创建以包含有关情况..."},"headers":[{"level":2,"title":"2. Throwable类","slug":"_2-throwable类","link":"#_2-throwable类","children":[]},{"level":2,"title":"3. 错误(Error)","slug":"_3-错误-error","link":"#_3-错误-error","children":[]},{"level":2,"title":"4. 异常(Exception)","slug":"_4-异常-exception","link":"#_4-异常-exception","children":[{"level":3,"title":"4.1. 运行时异常(Runtime Exceptions)","slug":"_4-1-运行时异常-runtime-exceptions","link":"#_4-1-运行时异常-runtime-exceptions","children":[]},{"level":3,"title":"4.2. 已检查异常(Checked Exceptions)","slug":"_4-2-已检查异常-checked-exceptions","link":"#_4-2-已检查异常-checked-exceptions","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论-1","link":"#_5-结论-1","children":[]}],"git":{"createdTime":1720731798000,"updatedTime":1720731798000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.03,"words":910},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Errors and Exceptions in Java.md","localizedDate":"2022年12月1日","excerpt":"\\n<p>在本教程中，我们将学习Java中的错误和异常以及它们之间的区别。</p>\\n<h2>2. Throwable类</h2>\\n<p><strong>错误(Error)和异常(Exception)都是Throwable类的子类，它们用于表示发生了异常情况</strong>。此外，只有Throwable及其子类的实例可以由Java虚拟机抛出或在catch子句中捕获。</p>\\n<p>错误和异常的实例被创建以包含有关情况的信息（例如，堆栈跟踪）：</p>\\n<h2>3. 错误(Error)</h2>\\n<p>错误表示不应该发生的异常情况。当发生严重问题时，会抛出错误。<strong>此外，错误被视为非检查异常，应用程序不应尝试捕获和处理它们</strong>。此外，错误在运行时发生，并且无法恢复。</p>","autoDesc":true}');export{d as comp,m as data};
