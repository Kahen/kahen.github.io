import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D5kFWV-m.js";const e={},p=t(`<h1 id="从类获取jar文件的完整路径" tabindex="-1"><a class="header-anchor" href="#从类获取jar文件的完整路径"><span>从类获取JAR文件的完整路径</span></a></h1><p>JAR文件是Java归档文件。我们在构建Java应用程序时可能会包含各种JAR文件作为库。</p><p>在本教程中，我们将探讨如何从给定的类找到JAR文件及其完整路径。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>假设我们在运行时有一个_类_对象。我们的目标是找出这个类属于哪个JAR文件。</p><p>一个例子可能会帮助我们快速理解问题。假设我们有一个Guava的_Ascii_类的实例。我们想要创建一个方法来找出包含_Ascii_类的JAR文件的完整路径。</p><p>我们将主要讨论两种方法来获取JAR文件的完整路径。此外，我们将讨论它们的优缺点。</p><p>为了简单起见，我们将通过单元测试断言来验证结果。</p><p>接下来，让我们看看它们是如何工作的。</p><h2 id="_3-使用-getprotectiondomain-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-getprotectiondomain-方法"><span>3. 使用_getProtectionDomain()_方法</span></a></h2><p>Java的类对象提供了_getProtectionDomain()<em>方法来获取_ProtectionDomain_对象。然后，我们可以通过_ProtectionDomain_对象获取_CodeSource</em>。_CodeSource_实例将是我们正在寻找的JAR文件。进一步地，_CodeSource.getLocation()_方法为我们提供了JAR文件的URL对象。最后，我们可以使用_Paths_类来获取JAR文件的完整路径。</p><h3 id="_3-1-实现-bygetprotectiondomain-方法" tabindex="-1"><a class="header-anchor" href="#_3-1-实现-bygetprotectiondomain-方法"><span>3.1. 实现_byGetProtectionDomain()_方法</span></a></h3><p>如果我们将上述所有步骤包装在一个方法中，几行代码就能做到这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JarFilePathResolver</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">byGetProtectionDomain</span><span class="token punctuation">(</span><span class="token class-name">Class</span> clazz<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">URISyntaxException</span> <span class="token punctuation">{</span>
        <span class="token class-name">URL</span> url <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">getProtectionDomain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getCodeSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">toURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们以Guava的_Ascii_类为例，测试我们的方法是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> jarPath <span class="token operator">=</span> jarFilePathResolver<span class="token punctuation">.</span><span class="token function">byGetProtectionDomain</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>jarPath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&quot;.jar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;guava&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>jarPath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们已经通过两个断言验证了返回的_jarPath_：</p><ul><li>首先，路径应该指向Guava JAR文件</li><li>如果_jarPath_是有效的完整路径，我们可以从_jarPath_创建一个_File_对象，文件应该存在</li></ul><p>如果我们运行测试，它会通过。所以_byGetProtectionDomain()_方法按预期工作。</p><h3 id="_3-2-getprotectiondomain-方法的一些限制" tabindex="-1"><a class="header-anchor" href="#_3-2-getprotectiondomain-方法的一些限制"><span>3.2. _getProtectionDomain()_方法的一些限制</span></a></h3><p>正如上面的代码所示，我们的_byGetProtectionDomain()_方法非常紧凑和直接。然而，如果我们阅读_getProtectionDomain()_方法的JavaDoc，它说**_getProtectionDomain()<em>方法可能会抛出_SecurityException</em>**。</p><p>我们编写了一个单元测试，测试通过了。这是因为我们在我们的本地开发环境中测试这个方法。在我们的示例中，Guava JAR位于我们的本地Maven仓库中。因此，没有抛出_SecurityException_。</p><p>然而，<strong>一些平台，例如Java/OpenWebStart和一些应用服务器，可能禁止通过调用_getProtectionDomain()_方法获取_ProtectionDomain_对象。</strong> 因此，如果我们将应用程序部署到这些平台，我们的方法将失败并抛出_SecurityException_。</p><p>接下来，让我们看看另一种获取JAR文件完整路径的方法。</p><h2 id="_4-使用-getresource-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-getresource-方法"><span>4. 使用_getResource()_方法</span></a></h2><p>我们知道我们调用_Class.getResource_()方法来获取类的资源的_URL_对象。那么让我们从这个方法开始，最终解析出相应JAR文件的完整路径。</p><h3 id="_4-1-实现-bygetresource-方法" tabindex="-1"><a class="header-anchor" href="#_4-1-实现-bygetresource-方法"><span>4.1. 实现_byGetResource()_方法</span></a></h3><p>让我们先看看实现，然后理解它的工作原理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">byGetResource</span><span class="token punctuation">(</span><span class="token class-name">Class</span> clazz<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">URL</span> classResource <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span>clazz<span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;.class&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>classResource <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;class resource is null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> url <span class="token operator">=</span> classResource<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;jar:file:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 从url字符串中提取&#39;file:......jarName.jar&#39;部分</span>
        <span class="token class-name">String</span> path <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;^jar:(file:.*[.]jar)!/.*&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;$1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Invalid Jar File URL String&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;Invalid Jar File URL String&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与_byGetProtectionDomain_方法相比，上述方法看起来复杂。但实际上，它也很容易理解。</p><p>接下来，让我们快速浏览一下这个方法并理解它的工作原理。为了简单起见，我们为各种异常情况抛出_RuntimeException_。</p><h3 id="_4-2-理解它的工作原理" tabindex="-1"><a class="header-anchor" href="#_4-2-理解它的工作原理"><span>4.2. 理解它的工作原理</span></a></h3><p>首先，我们调用_Class.getResource(className)_方法来获取给定类的URL。</p><p><strong>如果类来自本地文件系统的JAR文件，URL字符串应该是这种格式</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>jar<span class="token operator">:</span>file<span class="token operator">:</span><span class="token operator">/</span><span class="token constant">FULL</span><span class="token operator">/</span><span class="token constant">PATH</span><span class="token operator">/</span><span class="token constant">TO</span><span class="token operator">/</span>jarName<span class="token punctuation">.</span>jar<span class="token operator">!</span><span class="token operator">/</span><span class="token constant">PACKAGE</span><span class="token operator">/</span><span class="token constant">HIERARCHY</span><span class="token operator">/</span><span class="token constant">TO</span><span class="token operator">/</span><span class="token constant">CLASS</span><span class="token operator">/</span>className<span class="token punctuation">.</span><span class="token keyword">class</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如，这是Linux系统上Guava的_Ascii_类的URL字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>jar<span class="token operator">:</span>file<span class="token operator">:</span><span class="token operator">/</span>home<span class="token operator">/</span>kent<span class="token operator">/</span><span class="token punctuation">.</span>m2<span class="token operator">/</span>repository<span class="token operator">/</span>com<span class="token operator">/</span>google<span class="token operator">/</span>guava<span class="token operator">/</span>guava<span class="token operator">/</span><span class="token number">31.0</span><span class="token number">.1</span><span class="token operator">-</span>jre<span class="token operator">/</span>guava<span class="token operator">-</span><span class="token number">31.0</span><span class="token number">.1</span><span class="token operator">-</span>jre<span class="token punctuation">.</span>jar<span class="token operator">!</span><span class="token operator">/</span>com<span class="token operator">/</span>google<span class="token operator">/</span>common<span class="token operator">/</span>base<span class="token operator">/</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，JAR文件的完整路径位于URL字符串的中间。</p><p><strong>由于不同操作系统上的文件URL格式可能不同，我们将提取“<em>file:…..jar</em>”部分，将其转换回_URL_对象，并使用_Paths_类来获取路径作为_String_。</strong></p><p>我们构建一个正则表达式，并使用_String_的_replaceAll()_方法来提取我们需要的部分：<em>String path = url.replaceAll(&quot;^jar:(file:.<em>[.]jar)!/.</em>&quot;, &quot;$1&quot;);</em></p><p>接下来，类似于_byGetProtectionDomain()_方法，我们使用_Paths_类获得最终结果。</p><p>现在，让我们创建一个测试来验证我们的方法是否与Guava的_Ascii_类一起工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> jarPath <span class="token operator">=</span> jarFilePathResolver<span class="token punctuation">.</span><span class="token function">byGetResource</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>jarPath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&quot;.jar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;guava&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>jarPath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。</p><h2 id="_5-结合两种方法" tabindex="-1"><a class="header-anchor" href="#_5-结合两种方法"><span>5. 结合两种方法</span></a></h2><p>到目前为止，我们已经看到了两种解决问题的方法。_byGetProtectionDomain_方法简单可靠，但由于安全限制，可能在某些平台上失败。</p><p>另一方面，_byGetResource_方法没有安全问题。但是，我们需要进行更多的手动操作，例如处理不同的异常情况和使用正则表达式提取JAR文件的URL字符串。</p><h3 id="_5-1-实现-getjarfilepath-方法" tabindex="-1"><a class="header-anchor" href="#_5-1-实现-getjarfilepath-方法"><span>5.1. 实现_getJarFilePath()_方法</span></a></h3><p>我们可以结合这两种方法。首先，让我们尝试使用_byGetProtectionDomain()_解析JAR文件的路径。如果失败，我们作为后备调用_byGetResource()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token function">getJarFilePath</span><span class="token punctuation">(</span><span class="token class-name">Class</span> clazz<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">byGetProtectionDomain</span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 无法使用byGetProtectionDomain获取jar文件路径</span>
        <span class="token comment">// 省略异常处理</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">byGetResource</span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-测试-getjarfilepath-方法" tabindex="-1"><a class="header-anchor" href="#_5-2-测试-getjarfilepath-方法"><span>5.2. 测试_getJarFilePath()_方法</span></a></h3><p>为了在我们的本地开发环境中模拟_byGetProtectionDomain()<em>抛出_SecurityException</em>，让我们添加Mockito依赖项，并使用_@Spy_注解**部分模拟_JarFilePathResolver_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">MockitoExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">JarFilePathResolverUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Spy</span>
    <span class="token class-name">JarFilePathResolver</span> jarFilePathResolver<span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们首先测试_getProtectionDomain()_方法没有抛出_SecurityException_的场景：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> jarPath <span class="token operator">=</span> jarFilePathResolver<span class="token punctuation">.</span><span class="token function">getJarFilePath</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>jarPath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&quot;.jar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;guava&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>jarPath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">verify</span><span class="token punctuation">(</span>jarFilePathResolver<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">byGetProtectionDomain</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">verify</span><span class="token punctuation">(</span>jarFilePathResolver<span class="token punctuation">,</span> <span class="token function">never</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">byGetResource</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，除了测试路径是否有效之外，我们还验证了如果我们可以通过_byGetProtectionDomain()_方法获取JAR文件的路径，_byGetResource()_方法应该永远不会被调用。</p><p>当然，如果_byGetProtectionDomain()<em>抛出_SecurityException</em>，两种方法将被调用一次：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">when</span><span class="token punctuation">(</span>jarFilePathResolver<span class="token punctuation">.</span><span class="token function">byGetProtectionDomain</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenThrow</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SecurityException</span><span class="token punctuation">(</span><span class="token string">&quot;not allowed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> jarPath <span class="token operator">=</span> jarFilePathResolver<span class="token punctuation">.</span><span class="token function">getJarFilePath</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>jarPath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&quot;.jar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;guava&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>jarPath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">verify</span><span class="token punctuation">(</span>jarFilePathResolver<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">byGetProtectionDomain</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">verify</span><span class="token punctuation">(</span>jarFilePathResolver<span class="token punctuation">,</span> <span class="token function">times</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">byGetResource</span><span class="token punctuation">(</span><span class="token class-name">Ascii</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行测试，两个测试都会通过。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们学习了如何从给定的类获取JAR文件的完整路径。</p><p>一如既往，完整的source code is available over on GitHub.</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,64),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-17-Get the Full Path of a JAR File From a Class.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Get%20the%20Full%20Path%20of%20a%20JAR%20File%20From%20a%20Class.html","title":"从类获取JAR文件的完整路径","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JAR"],"tag":["JAR文件","类路径"],"head":[["meta",{"name":"keywords","content":"Java, JAR文件, 类路径, 完整路径"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Get%20the%20Full%20Path%20of%20a%20JAR%20File%20From%20a%20Class.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从类获取JAR文件的完整路径"}],["meta",{"property":"og:description","content":"从类获取JAR文件的完整路径 JAR文件是Java归档文件。我们在构建Java应用程序时可能会包含各种JAR文件作为库。 在本教程中，我们将探讨如何从给定的类找到JAR文件及其完整路径。 2. 问题介绍 假设我们在运行时有一个_类_对象。我们的目标是找出这个类属于哪个JAR文件。 一个例子可能会帮助我们快速理解问题。假设我们有一个Guava的_Asci..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T06:31:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JAR文件"}],["meta",{"property":"article:tag","content":"类路径"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T06:31:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从类获取JAR文件的完整路径\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T06:31:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从类获取JAR文件的完整路径 JAR文件是Java归档文件。我们在构建Java应用程序时可能会包含各种JAR文件作为库。 在本教程中，我们将探讨如何从给定的类找到JAR文件及其完整路径。 2. 问题介绍 假设我们在运行时有一个_类_对象。我们的目标是找出这个类属于哪个JAR文件。 一个例子可能会帮助我们快速理解问题。假设我们有一个Guava的_Asci..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用_getProtectionDomain()_方法","slug":"_3-使用-getprotectiondomain-方法","link":"#_3-使用-getprotectiondomain-方法","children":[{"level":3,"title":"3.1. 实现_byGetProtectionDomain()_方法","slug":"_3-1-实现-bygetprotectiondomain-方法","link":"#_3-1-实现-bygetprotectiondomain-方法","children":[]},{"level":3,"title":"3.2. _getProtectionDomain()_方法的一些限制","slug":"_3-2-getprotectiondomain-方法的一些限制","link":"#_3-2-getprotectiondomain-方法的一些限制","children":[]}]},{"level":2,"title":"4. 使用_getResource()_方法","slug":"_4-使用-getresource-方法","link":"#_4-使用-getresource-方法","children":[{"level":3,"title":"4.1. 实现_byGetResource()_方法","slug":"_4-1-实现-bygetresource-方法","link":"#_4-1-实现-bygetresource-方法","children":[]},{"level":3,"title":"4.2. 理解它的工作原理","slug":"_4-2-理解它的工作原理","link":"#_4-2-理解它的工作原理","children":[]}]},{"level":2,"title":"5. 结合两种方法","slug":"_5-结合两种方法","link":"#_5-结合两种方法","children":[{"level":3,"title":"5.1. 实现_getJarFilePath()_方法","slug":"_5-1-实现-getjarfilepath-方法","link":"#_5-1-实现-getjarfilepath-方法","children":[]},{"level":3,"title":"5.2. 测试_getJarFilePath()_方法","slug":"_5-2-测试-getjarfilepath-方法","link":"#_5-2-测试-getjarfilepath-方法","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721197863000,"updatedTime":1721197863000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.98,"words":1794},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Get the Full Path of a JAR File From a Class.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>JAR文件是Java归档文件。我们在构建Java应用程序时可能会包含各种JAR文件作为库。</p>\\n<p>在本教程中，我们将探讨如何从给定的类找到JAR文件及其完整路径。</p>\\n<h2>2. 问题介绍</h2>\\n<p>假设我们在运行时有一个_类_对象。我们的目标是找出这个类属于哪个JAR文件。</p>\\n<p>一个例子可能会帮助我们快速理解问题。假设我们有一个Guava的_Ascii_类的实例。我们想要创建一个方法来找出包含_Ascii_类的JAR文件的完整路径。</p>\\n<p>我们将主要讨论两种方法来获取JAR文件的完整路径。此外，我们将讨论它们的优缺点。</p>\\n<p>为了简单起见，我们将通过单元测试断言来验证结果。</p>","autoDesc":true}');export{k as comp,d as data};
