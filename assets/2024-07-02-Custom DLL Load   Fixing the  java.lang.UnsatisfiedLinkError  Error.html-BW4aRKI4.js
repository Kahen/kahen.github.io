import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BtbBZiJO.js";const e={},p=t(`<h1 id="自定义dll加载-修复-java-lang-unsatisfiedlinkerror-错误" tabindex="-1"><a class="header-anchor" href="#自定义dll加载-修复-java-lang-unsatisfiedlinkerror-错误"><span>自定义DLL加载 - 修复“java.lang.UnsatisfiedLinkError”错误</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在这篇快速教程中，我们将探讨不同的导致_UnsatisfiedLinkError_的原因和解决方案。这是一种在使用本地库时常见的令人沮丧的错误。解决这个错误需要彻底理解其原因和适当的纠正措施。</p><p>我们将讨论诸如库和方法名称错误、缺少库目录规范、类加载器冲突、不兼容的架构以及Java安全策略的角色等场景。</p><h2 id="_2-场景和设置" tabindex="-1"><a class="header-anchor" href="#_2-场景和设置"><span>2. 场景和设置</span></a></h2><p><strong>我们将创建一个简单的类，说明在加载外部库时可能出现的错误。</strong> 假设我们在Linux上，让我们加载一个名为“libtest.so”的简单库，并调用它的_test()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JniUnsatisfiedLink</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">LIB_NAME</span> <span class="token operator">=</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">loadLibrary</span><span class="token punctuation">(</span><span class="token constant">LIB_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">JniUnsatisfiedLink</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token class-name">String</span> <span class="token function">nonexistentDllMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通常，我们希望在静态块中加载我们的库，以确保它只加载一次。但是，为了更好地模拟错误，我们在_main()_方法中加载它。</strong> 在这种情况下，我们的库只包含一个有效的方法_test()<em>，它返回一个_String</em>。<strong>我们还声明了一个_nonexistentDllMethod()_来看看我们的应用程序的行为。</strong></p><h2 id="_3-未指定库目录" tabindex="-1"><a class="header-anchor" href="#_3-未指定库目录"><span>3. 未指定库目录</span></a></h2><p><em>UnsatisfiedLinkError_最直接的原因是我们的库不在Java期望库所在的目录中。这可能是在系统变量中，例如Unix或Linux上的_LD_LIBRARY_PATH</em>，或Windows上的_PATH_。<strong>我们还可以使用我们的库的完整路径与_System.load()<em>而不是_loadLibrary()</em>：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">&quot;/full/path/to/libtest.so&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>但是，为了避免系统特定的解决方案，我们可以设置_java.library.path_ VM属性。</strong> 这个属性接收一个或多个包含我们需要加载的库的目录路径：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token operator">-</span><span class="token class-name">Djava</span><span class="token punctuation">.</span>library<span class="token punctuation">.</span>path<span class="token operator">=</span><span class="token operator">/</span>any<span class="token operator">/</span>library<span class="token operator">/</span>dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目录分隔符将取决于我们的操作系统。Unix或Linux是冒号，Windows是分号。</p><h2 id="_4-错误的库名称或权限" tabindex="-1"><a class="header-anchor" href="#_4-错误的库名称或权限"><span>4. 错误的库名称或权限</span></a></h2><p><strong>得到_UnsatisfiedLinkError_的最常见原因之一是使用错误的库名称。</strong> 这是因为Java为了保持代码尽可能的平台无关性，对库名称做了一些假设：</p><ul><li>对于Windows，它假设库文件名以“.dll”结尾。</li><li>对于大多数类Unix系统，它假设有“lib”前缀和“.so”扩展名。</li><li>最后，对于Mac，它假设有“lib”前缀和“.dylib”（以前的“.jnilib”）扩展名。</li></ul><p>所以，如果我们包含这些前缀或后缀，我们会得到一个错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenIncorrectLibName_thenLibNotFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> libName <span class="token operator">=</span> <span class="token string">&quot;lib&quot;</span> <span class="token operator">+</span> <span class="token constant">LIB_NAME</span> <span class="token operator">+</span> <span class="token string">&quot;.so&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">Error</span> error <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">UnsatisfiedLinkError</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">loadLibrary</span><span class="token punctuation">(</span>libName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>
      <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;no %s in java.library.path&quot;</span><span class="token punctuation">,</span> libName<span class="token punctuation">)</span><span class="token punctuation">,</span>
      error<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>顺便说一下，这使得我们无法尝试加载一个为我们正在运行应用程序的平台而构建的库。在这种情况下，如果我们希望我们的应用程序是多平台的，我们必须为所有平台提供二进制文件。<strong>如果我们的Linux环境中的库目录中只有一个“test.dll”，那么_System.loadLibrary(&quot;test&quot;)_将导致相同的错误。</strong></p><p>类似地，如果我们在_loadLibrary()_中包含路径分隔符，我们会得到一个错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenLoadLibraryContainsPathSeparator_thenErrorThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> libName <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> <span class="token constant">LIB_NAME</span><span class="token punctuation">;</span>

    <span class="token class-name">Error</span> error <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">UnsatisfiedLinkError</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">loadLibrary</span><span class="token punctuation">(</span>libName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>
      <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Directory separator should not appear in library name: %s&quot;</span><span class="token punctuation">,</span> libName<span class="token punctuation">)</span><span class="token punctuation">,</span>
      error<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，如果我们的库目录权限不足，将导致相同的错误。<strong>例如，我们在Linux上至少需要“执行”权限。另一方面，如果我们的文件没有至少“读取”权限，我们将得到类似这样的消息：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>UnsatisfiedLinkError</span><span class="token operator">:</span> <span class="token operator">/</span>path<span class="token operator">/</span><span class="token keyword">to</span><span class="token operator">/</span>libtest<span class="token punctuation">.</span>so<span class="token operator">:</span> cannot <span class="token keyword">open</span> <span class="token namespace">shared</span> object file<span class="token operator">:</span> <span class="token class-name">Permission</span> denied
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-错误的函数名称-用法" tabindex="-1"><a class="header-anchor" href="#_5-错误的函数名称-用法"><span>5. 错误的函数名称/用法</span></a></h2><p>如果我们声明了一个本地方法，它与我们的本地源代码中声明的方法都不匹配，我们也会得到错误，<strong>但只有在我们尝试调用不存在的方法时：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUnlinkedMethod_thenErrorThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">loadLibrary</span><span class="token punctuation">(</span><span class="token constant">LIB_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Error</span> error <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">UnsatisfiedLinkError</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">JniUnsatisfiedLink</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nonexistentDllMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;JniUnsatisfiedLink.nonexistentDllMethod&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，在_loadLibrary()_中没有抛出异常。</p><h2 id="_6-库已由另一个类加载器加载" tabindex="-1"><a class="header-anchor" href="#_6-库已由另一个类加载器加载"><span>6. 库已由另一个类加载器加载</span></a></h2><p>这最有可能发生在我们在同一个Web应用程序服务器（如Tomcat）中加载同一个库的不同Web应用程序中。然后，我们会得到错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Native</span> <span class="token class-name">Library</span> libtest<span class="token punctuation">.</span>so already loaded in another classloader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，如果它正在加载过程中，我们会得到：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Native</span> <span class="token class-name">Library</span> libtest<span class="token punctuation">.</span>so is being loaded in another classloader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解决这个问题的最简单方法是将加载我们库的代码放在Web应用程序服务器的共享目录中的JAR中。</strong> 例如，在Tomcat中，那将是“\\u003ctomcat home\\u003e/lib”。</p><h2 id="_7-不兼容的架构" tabindex="-1"><a class="header-anchor" href="#_7-不兼容的架构"><span>7. 不兼容的架构</span></a></h2><p>这最有可能发生在使用旧库时。我们不能加载一个为不同于我们正在运行应用程序的架构编译的库——<strong>例如，如果我们尝试在64位系统上加载一个32位库：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenIncompatibleArchitecture_thenErrorThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Error</span> error <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">UnsatisfiedLinkError</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">loadLibrary</span><span class="token punctuation">(</span><span class="token constant">LIB_NAME</span> <span class="token operator">+</span> <span class="token string">&quot;32&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;wrong ELF class: ELFCLASS32&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们为了测试目的将库与32位标志链接。一些旁注：</p><ul><li>如果我们尝试通过重命名文件在不同的平台上加载DLL，我们会遇到包含“无效ELF头”消息的错误。</li><li>如果我们尝试在不兼容的平台上加载我们的库，库就是找不到。</li></ul><h2 id="_8-文件损坏" tabindex="-1"><a class="header-anchor" href="#_8-文件损坏"><span>8. 文件损坏</span></a></h2><p><strong>尝试加载损坏的文件时，总是会导致_UnsatisfiedLinkError_。</strong> 让我们看看当我们尝试加载一个空文件时会发生什么（注意，这个测试是针对单个库路径简化的，并且考虑到了Linux环境）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenCorruptedFile_thenErrorThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> libPath <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;java.library.path&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> dummyLib <span class="token operator">=</span> <span class="token constant">LIB_NAME</span> <span class="token operator">+</span> <span class="token string">&quot;-dummy&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>libPath<span class="token punctuation">,</span> <span class="token string">&quot;lib&quot;</span> <span class="token operator">+</span> dummyLib <span class="token operator">+</span> <span class="token string">&quot;.so&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Error</span> error <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">UnsatisfiedLinkError</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">loadLibrary</span><span class="token punctuation">(</span>dummyLib<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;file too short&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了避免这种情况，通常的做法是与二进制文件一起分发MD5校验和，以便我们可以检查完整性。</p><h2 id="_9-java安全策略" tabindex="-1"><a class="header-anchor" href="#_9-java安全策略"><span>9. Java安全策略</span></a></h2><p><strong>如果我们使用Java策略文件，我们需要为_loadLibrary()<em>和我们的库名称授予_RuntimePermission</em>：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>grant <span class="token punctuation">{</span>
    permission <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>RuntimePermission</span> <span class="token string">&quot;loadLibrary.test&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>否则，当我们尝试加载我们的库时，我们会得到类似的错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>security<span class="token punctuation">.</span></span>AccessControlException</span><span class="token operator">:</span> access denied <span class="token punctuation">(</span><span class="token string">&quot;java.lang.RuntimePermission&quot;</span> <span class="token string">&quot;loadLibrary.test&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，为了使自定义策略文件生效，我们需要指定我们想要使用安全管理器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token operator">-</span><span class="token class-name">Djava</span><span class="token punctuation">.</span>security<span class="token punctuation">.</span>manager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_10-结论" tabindex="-1"><a class="header-anchor" href="#_10-结论"><span>10. 结论</span></a></h2><p>在这篇文章中，我们探讨了解决Java应用程序中_UnsatisfiedLinkError_的解决方案。我们讨论了这个错误的常见原因，并提供了有效解决它们的见解。通过实施这些见解并根据我们应用程序的特定需求进行调整，我们可以有效地解决_UnsatisfiedLinkError_的出现。</p><p>如往常一样，源代码可在GitHub上获得。</p>`,53),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-02-Custom DLL Load   Fixing the  java.lang.UnsatisfiedLinkError  Error.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Custom%20DLL%20Load%20%20%20Fixing%20the%20%20java.lang.UnsatisfiedLinkError%20%20Error.html","title":"自定义DLL加载 - 修复“java.lang.UnsatisfiedLinkError”错误","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JNI"],"tag":["UnsatisfiedLinkError","Java Native Libraries"],"head":[["meta",{"name":"keywords","content":"Java, JNI, UnsatisfiedLinkError, Native Libraries, LoadLibrary"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Custom%20DLL%20Load%20%20%20Fixing%20the%20%20java.lang.UnsatisfiedLinkError%20%20Error.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"自定义DLL加载 - 修复“java.lang.UnsatisfiedLinkError”错误"}],["meta",{"property":"og:description","content":"自定义DLL加载 - 修复“java.lang.UnsatisfiedLinkError”错误 1. 引言 在这篇快速教程中，我们将探讨不同的导致_UnsatisfiedLinkError_的原因和解决方案。这是一种在使用本地库时常见的令人沮丧的错误。解决这个错误需要彻底理解其原因和适当的纠正措施。 我们将讨论诸如库和方法名称错误、缺少库目录规范、类加..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T10:56:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"UnsatisfiedLinkError"}],["meta",{"property":"article:tag","content":"Java Native Libraries"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T10:56:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自定义DLL加载 - 修复“java.lang.UnsatisfiedLinkError”错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T10:56:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"自定义DLL加载 - 修复“java.lang.UnsatisfiedLinkError”错误 1. 引言 在这篇快速教程中，我们将探讨不同的导致_UnsatisfiedLinkError_的原因和解决方案。这是一种在使用本地库时常见的令人沮丧的错误。解决这个错误需要彻底理解其原因和适当的纠正措施。 我们将讨论诸如库和方法名称错误、缺少库目录规范、类加..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 场景和设置","slug":"_2-场景和设置","link":"#_2-场景和设置","children":[]},{"level":2,"title":"3. 未指定库目录","slug":"_3-未指定库目录","link":"#_3-未指定库目录","children":[]},{"level":2,"title":"4. 错误的库名称或权限","slug":"_4-错误的库名称或权限","link":"#_4-错误的库名称或权限","children":[]},{"level":2,"title":"5. 错误的函数名称/用法","slug":"_5-错误的函数名称-用法","link":"#_5-错误的函数名称-用法","children":[]},{"level":2,"title":"6. 库已由另一个类加载器加载","slug":"_6-库已由另一个类加载器加载","link":"#_6-库已由另一个类加载器加载","children":[]},{"level":2,"title":"7. 不兼容的架构","slug":"_7-不兼容的架构","link":"#_7-不兼容的架构","children":[]},{"level":2,"title":"8. 文件损坏","slug":"_8-文件损坏","link":"#_8-文件损坏","children":[]},{"level":2,"title":"9. Java安全策略","slug":"_9-java安全策略","link":"#_9-java安全策略","children":[]},{"level":2,"title":"10. 结论","slug":"_10-结论","link":"#_10-结论","children":[]}],"git":{"createdTime":1719917794000,"updatedTime":1719917794000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.65,"words":1696},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Custom DLL Load   Fixing the  java.lang.UnsatisfiedLinkError  Error.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在这篇快速教程中，我们将探讨不同的导致_UnsatisfiedLinkError_的原因和解决方案。这是一种在使用本地库时常见的令人沮丧的错误。解决这个错误需要彻底理解其原因和适当的纠正措施。</p>\\n<p>我们将讨论诸如库和方法名称错误、缺少库目录规范、类加载器冲突、不兼容的架构以及Java安全策略的角色等场景。</p>\\n<h2>2. 场景和设置</h2>\\n<p><strong>我们将创建一个简单的类，说明在加载外部库时可能出现的错误。</strong> 假设我们在Linux上，让我们加载一个名为“libtest.so”的简单库，并调用它的_test()_方法：</p>","autoDesc":true}');export{d as comp,k as data};
