import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const e={},p=t('<hr><h1 id="如何将-inputstream-转换为-base64-字符串" tabindex="-1"><a class="header-anchor" href="#如何将-inputstream-转换为-base64-字符串"><span>如何将 InputStream 转换为 Base64 字符串</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Base64 是一种文本编码方案，它为应用程序和平台之间的二进制数据提供可移植性。Base64 可用于将二进制数据存储在数据库字符串列中，从而避免混乱的文件操作。结合数据 URI 方案，Base64 可用于在符合 HTML 和多用途互联网邮件扩展（MIME）标准的网页和电子邮件中嵌入图像。</p><p>在本简短教程中，我们将演示 Java 流式 IO 函数和内置的 Java <em>Base64</em> 类，以<strong>将二进制数据作为 <em>InputStream</em> 加载，然后将其转换为 <em>String</em></strong>。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>让我们看看我们需要的依赖项和测试数据。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>我们将使用 Apache IOUtils 库方便地访问测试数据文件，通过将其依赖项添加到我们的 <em>pom.xml</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``commons-io``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-io``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.15.1``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-测试数据" tabindex="-1"><a class="header-anchor" href="#_2-2-测试数据"><span>2.2. 测试数据</span></a></h3><p>这里需要一个二进制测试数据文件。因此，我们将 <em>logo.png</em> 图像文件添加到我们标准的 <em>src/test/resources</em> 文件夹中。</p><h2 id="_3-将-inputstream-转换为-base64-字符串" tabindex="-1"><a class="header-anchor" href="#_3-将-inputstream-转换为-base64-字符串"><span>3. 将 <em>InputStream</em> 转换为 Base64 字符串</span></a></h2><p><strong>Java 在 <em>java.util.Base64</em> 类中内置了对 Base64 编码和解码的支持。因此，我们将使用那里的 <em>static</em> 方法来完成繁重的工作。</strong></p><p><em>Base64.encode()</em> 方法期望一个 <em>byte</em> 数组，而我们的图像在文件中。因此，我们需要先将文件转换为 <em>InputStream</em>，然后逐字节读取流到数组中。</p><p>我们使用 Apache <em>commons-io</em> 包中的 <em>IOUtils.toByteArray()</em> 方法作为繁琐的纯 Java 方法的便捷替代。</p><p>首先，我们将编写一个简单的方法来生成“穷人版”校验和：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">calculateChecksum</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> checksum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> bytes<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        checksum <span class="token operator">+=</span> bytes<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> checksum<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用它来比较这两个数组，验证它们是否匹配。</p><p>接下来的几行打开文件，将其转换为字节数组，然后将 Base64 编码为 <em>String</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> sourceStream  <span class="token operator">=</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">&quot;logo.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sourceBytes <span class="token operator">=</span> <span class="token class-name">IOUtils</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span>sourceStream<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> encodedString <span class="token operator">=</span> <span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">getEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encodeToString</span><span class="token punctuation">(</span>sourceBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>encodedString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字符串看起来像一块随机字符。实际上，它并不是随机的，正如我们在验证步骤中看到的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> decodedBytes <span class="token operator">=</span> <span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">getDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>encodedString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>decodedBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>decodedBytes<span class="token punctuation">.</span>length <span class="token operator">==</span> sourceBytes<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">calculateChecksum</span><span class="token punctuation">(</span>decodedBytes<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token function">calculateChecksum</span><span class="token punctuation">(</span>sourceBytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们展示了将 <em>InputStream</em> 编码为 Base64 字符串以及成功将该字符串解码回二进制数组的过程。</p><p>一如既往，本文中展示的代码可在 GitHub 上获取。好的，翻译已完成。以下是翻译的剩余部分：</p><hr><h1 id="如何将-inputstream-转换为-base64-字符串-1" tabindex="-1"><a class="header-anchor" href="#如何将-inputstream-转换为-base64-字符串-1"><span>如何将 InputStream 转换为 Base64 字符串</span></a></h1><h2 id="_1-概述-1" tabindex="-1"><a class="header-anchor" href="#_1-概述-1"><span>1. 概述</span></a></h2><p>Base64 是一种文本编码方案，它为应用程序和平台之间的二进制数据提供可移植性。Base64 可以用于在数据库字符串列中存储二进制数据，从而避免混乱的文件操作。结合数据 URI 方案，Base64 可以用于在网页和电子邮件中嵌入图像，符合 HTML 和多用途互联网邮件扩展（MIME）标准。</p><p>在本简短教程中，我们将演示 Java 流式 IO 函数和内置的 Java <em>Base64</em> 类，以<strong>将二进制数据作为 <em>InputStream</em> 加载，然后将其转换为 <em>String</em></strong>。</p><h2 id="_2-设置-1" tabindex="-1"><a class="header-anchor" href="#_2-设置-1"><span>2. 设置</span></a></h2><h3 id="_2-1-依赖项-1" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项-1"><span>2.1. 依赖项</span></a></h3><p>我们将使用 Apache IOUtils 库来方便地访问测试数据文件，通过将依赖项添加到我们的 <em>pom.xml</em>：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``commons-io``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``commons-io``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.15.1``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-测试数据-1" tabindex="-1"><a class="header-anchor" href="#_2-2-测试数据-1"><span>2.2. 测试数据</span></a></h3><p>这里需要一个二进制测试数据文件。因此，我们将 <em>logo.png</em> 图像文件添加到我们的 <em>src/test/resources</em> 文件夹中。</p><h2 id="_3-将-inputstream-转换为-base64-字符串-1" tabindex="-1"><a class="header-anchor" href="#_3-将-inputstream-转换为-base64-字符串-1"><span>3. 将 <em>InputStream</em> 转换为 Base64 字符串</span></a></h2><p><strong>Java 在 <em>java.util.Base64</em> 类中内置了 Base64 编码和解码的支持。我们将使用该类中的静态方法来执行主要工作。</strong></p><p><em>Base64.encode()</em> 方法需要一个字节数组，而我们的图像存储在文件中。因此，我们需要先将文件转换为 <em>InputStream</em>，然后逐字节读取流到数组中。</p><p>我们使用 Apache <em>commons-io</em> 包中的 <em>IOUtils.toByteArray()</em> 方法作为替代 Java 原生方法的便捷方式。</p><p>首先，我们编写一个简单方法来生成一个简单的校验和：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">calculateChecksum</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">int</span> checksum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> bytes<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        checksum <span class="token operator">+=</span> bytes<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> checksum<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用它来比较两个数组，确保它们匹配。</p><p>接下来的代码行打开文件，将其转换为字节数组，然后将其 Base64 编码为 <em>String</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> sourceStream <span class="token operator">=</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">&quot;logo.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sourceBytes <span class="token operator">=</span> <span class="token class-name">IOUtils</span><span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span>sourceStream<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">String</span> encodedString <span class="token operator">=</span> <span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">getEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encodeToString</span><span class="token punctuation">(</span>sourceBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>encodedString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字符串看起来像一串随机字符。实际上，它不是随机的，正如我们在验证步骤中看到的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> decodedBytes <span class="token operator">=</span> <span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">getDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>encodedString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertNotNull</span><span class="token punctuation">(</span>decodedBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>decodedBytes<span class="token punctuation">.</span>length <span class="token operator">==</span> sourceBytes<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token function">calculateChecksum</span><span class="token punctuation">(</span>decodedBytes<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token function">calculateChecksum</span><span class="token punctuation">(</span>sourceBytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h2><p>在本文中，我们展示了将 <em>InputStream</em> 编码为 Base64 字符串以及成功将该字符串解码回二进制数组的过程。</p><p>如常，本文中展示的代码可在 GitHub 上找到。</p><p>OK</p>',52),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-17-How to Convert InputStream to Base64 String.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-How%20to%20Convert%20InputStream%20to%20Base64%20String.html","title":"如何将 InputStream 转换为 Base64 字符串","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Base64"],"tag":["InputStream","Base64","Encoding"],"head":[["meta",{"name":"keywords","content":"Java, Base64, Encoding, InputStream"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-How%20to%20Convert%20InputStream%20to%20Base64%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何将 InputStream 转换为 Base64 字符串"}],["meta",{"property":"og:description","content":"如何将 InputStream 转换为 Base64 字符串 1. 概述 Base64 是一种文本编码方案，它为应用程序和平台之间的二进制数据提供可移植性。Base64 可用于将二进制数据存储在数据库字符串列中，从而避免混乱的文件操作。结合数据 URI 方案，Base64 可用于在符合 HTML 和多用途互联网邮件扩展（MIME）标准的网页和电子邮件中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T12:29:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"InputStream"}],["meta",{"property":"article:tag","content":"Base64"}],["meta",{"property":"article:tag","content":"Encoding"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T12:29:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何将 InputStream 转换为 Base64 字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T12:29:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何将 InputStream 转换为 Base64 字符串 1. 概述 Base64 是一种文本编码方案，它为应用程序和平台之间的二进制数据提供可移植性。Base64 可用于将二进制数据存储在数据库字符串列中，从而避免混乱的文件操作。结合数据 URI 方案，Base64 可用于在符合 HTML 和多用途互联网邮件扩展（MIME）标准的网页和电子邮件中..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 测试数据","slug":"_2-2-测试数据","link":"#_2-2-测试数据","children":[]}]},{"level":2,"title":"3. 将 InputStream 转换为 Base64 字符串","slug":"_3-将-inputstream-转换为-base64-字符串","link":"#_3-将-inputstream-转换为-base64-字符串","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"1. 概述","slug":"_1-概述-1","link":"#_1-概述-1","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置-1","link":"#_2-设置-1","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项-1","link":"#_2-1-依赖项-1","children":[]},{"level":3,"title":"2.2. 测试数据","slug":"_2-2-测试数据-1","link":"#_2-2-测试数据-1","children":[]}]},{"level":2,"title":"3. 将 InputStream 转换为 Base64 字符串","slug":"_3-将-inputstream-转换为-base64-字符串-1","link":"#_3-将-inputstream-转换为-base64-字符串-1","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1721219368000,"updatedTime":1721219368000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.22,"words":1267},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-How to Convert InputStream to Base64 String.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何将 InputStream 转换为 Base64 字符串</h1>\\n<h2>1. 概述</h2>\\n<p>Base64 是一种文本编码方案，它为应用程序和平台之间的二进制数据提供可移植性。Base64 可用于将二进制数据存储在数据库字符串列中，从而避免混乱的文件操作。结合数据 URI 方案，Base64 可用于在符合 HTML 和多用途互联网邮件扩展（MIME）标准的网页和电子邮件中嵌入图像。</p>\\n<p>在本简短教程中，我们将演示 Java 流式 IO 函数和内置的 Java <em>Base64</em> 类，以<strong>将二进制数据作为 <em>InputStream</em> 加载，然后将其转换为 <em>String</em></strong>。</p>","autoDesc":true}');export{d as comp,k as data};
