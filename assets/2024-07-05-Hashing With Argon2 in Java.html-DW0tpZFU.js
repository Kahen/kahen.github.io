import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CNQ479je.js";const p={},e=t('<h1 id="java中使用argon2进行哈希处理" tabindex="-1"><a class="header-anchor" href="#java中使用argon2进行哈希处理"><span>Java中使用Argon2进行哈希处理</span></a></h1><p>在构建涉及用户认证的Web应用程序时，保护用户免受黑客攻击非常重要。大多数Web应用程序设计为不存储明文密码，而是存储密码的哈希值。哈希和盐值是增强存储在数据库中的密码安全性的两种技术。</p><p>在本教程中，我们将学习哈希和盐值技术，以及如何在Java中使用Argon2进行哈希处理。</p><h2 id="_2-密码哈希和盐值" tabindex="-1"><a class="header-anchor" href="#_2-密码哈希和盐值"><span>2. 密码哈希和盐值</span></a></h2><p>密码哈希和盐值是两种可以增强存储在数据库中的密码安全性的技术。哈希算法涉及一种数学运算，可以将密码转换为一串随机字符。</p><p>然而，黑客可以通过比较常见密码的哈希值来猜测密码。为了防止这种情况，密码盐值就派上用场了。</p><p>密码盐值是在应用哈希算法之前，向密码添加一个称为盐值的随机数据片段的方法。盐值确保哈希值是独特的，即使两个用户有相同的密码，他们的哈希值也会不同。</p><p>此外，哈希算法是单向的，这意味着哈希值不能像加密那样转换回明文。这增加了另一层安全性和保护。</p><h2 id="_3-什么是argon2" tabindex="-1"><a class="header-anchor" href="#_3-什么是argon2"><span>3. 什么是Argon2？</span></a></h2><p>Argon2是一种基于密码的密钥派生函数。它是一种设计有许多可调整参数的安全密码哈希函数。此外，Argon2是一种内存密集型函数，意味着它需要大量的内存来计算，并且在内存有限的硬件上难以实现。</p><p>此外，它允许应用程序根据其安全需求自定义算法。这对于具有不同安全需求的应用程序至关重要。</p><p>另外，由于Argon2提供高安全性，它推荐用于需要强大密码保护的应用程序。它抵抗来自GPU和其他专用硬件的攻击。</p><p>Argon2的一个优势是，我们可以根据不同的需要进行配置。我们可以设置迭代次数。这是密码将被哈希的次数。更高的迭代次数将需要更多的时间来哈希密码，但会使密码更安全。</p><p>此外，我们可以设置内存成本。这是Argon2将使用的内存量。更高的内存成本将使密码更安全，但会消耗更多的系统内存。</p><p>另外，我们还可以设置并行成本。这是Argon2算法将使用的线程数量。更高的并行成本将加速密码哈希过程，但会降低密码安全性。</p><p>在以下小节中，我们将使用Spring Security Crypto库和Bouncy Castle库实现Argon2哈希。</p><h3 id="_4-1-使用spring-security-crypto实现argon2哈希" tabindex="-1"><a class="header-anchor" href="#_4-1-使用spring-security-crypto实现argon2哈希"><span>4.1 使用Spring Security Crypto实现Argon2哈希</span></a></h3><p>Spring Security Crypto库有一个类，可以使用Argon2对密码进行哈希处理。它内部依赖于Bouncy Castle库。</p><p>让我们使用Spring Security Crypto库来哈希一个密码。首先，我们需要将其依赖项添加到_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.security``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-security-crypto``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``6.0.3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看一个单元测试，它基于Argon2哈希一个密码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenRawPassword_whenEncodedWithArgon2_thenMatchesEncodedPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> rawPassword <span class="token operator">=</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">Argon2PasswordEncoder</span> arg2SpringSecurity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Argon2PasswordEncoder</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">60000</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> springBouncyHash <span class="token operator">=</span> arg2SpringSecurity<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>rawPassword<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>arg2SpringSecurity<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>rawPassword<span class="token punctuation">,</span> springBouncyHash<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，我们声明一个变量来存储原始密码“<em>Baeldung</em>”。接下来，我们使用五个参数创建_Argon2PasswordEncoder_的实例。我们将迭代次数设置为十次，并将哈希长度设置为32字节。默认哈希长度为64字节。此外，我们将内存成本设置为_60000_千字节，将并行因子设置为一个线程，将时间成本设置为_16_次迭代。</p><p>最后，我们验证原始密码与哈希密码是否匹配。</p><h3 id="_4-2-使用bouncy-castle实现argon2哈希" tabindex="-1"><a class="header-anchor" href="#_4-2-使用bouncy-castle实现argon2哈希"><span>4.2 使用Bouncy Castle实现Argon2哈希</span></a></h3><p>与Spring Security Crypto库相比，Bouncy Castle库的实现更为底层。要使用Bouncy Castle库，我们需要将其依赖项添加到_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.bouncycastle``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``bcpkix-jdk18on``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.76``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看一个使用Bouncy Castle库实现哈希的示例。</p><p>首先，让我们创建一个方法为我们生成一个随机盐：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">generateSalt16Byte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SecureRandom</span> secureRandom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SecureRandom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> salt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    secureRandom<span class="token punctuation">.</span><span class="token function">nextBytes</span><span class="token punctuation">(</span>salt<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> salt<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例代码中，我们创建了一个_SecureRandom_对象，这是一个提供密码学强随机数生成器的类。接下来，我们创建一个大小为_16_的_byte_数组来存储16字节的数据。然后，我们调用_secureRandom_上的_nextBytes()_方法来生成盐。</p><p>最后，让我们哈希密码“<em>Baeldung</em>”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenRawPasswordAndSalt_whenArgon2AlgorithmIsUsed_thenHashIsCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> salt <span class="token operator">=</span> <span class="token function">generateSalt16Byte</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> password <span class="token operator">=</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">int</span> iterations <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> memLimit <span class="token operator">=</span> <span class="token number">66536</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> hashLength <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> parallelism <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Argon2Parameters<span class="token punctuation">.</span>Builder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Argon2Parameters<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token class-name">Argon2Parameters<span class="token punctuation">.</span>ARGON2_id</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">withVersion</span><span class="token punctuation">(</span><span class="token class-name">Argon2Parameters</span><span class="token punctuation">.</span><span class="token constant">ARGON2_VERSION_13</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">withIterations</span><span class="token punctuation">(</span>iterations<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">withMemoryAsKB</span><span class="token punctuation">(</span>memLimit<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">withParallelism</span><span class="token punctuation">(</span>parallelism<span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">withSalt</span><span class="token punctuation">(</span>salt<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Argon2BytesGenerator</span> generate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Argon2BytesGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    generate<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>builder<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>hashLength<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    generate<span class="token punctuation">.</span><span class="token function">generateBytes</span><span class="token punctuation">(</span>password<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> result<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Argon2BytesGenerator</span> verifier <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Argon2BytesGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    verifier<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>builder<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> testHash <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>hashLength<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    verifier<span class="token punctuation">.</span><span class="token function">generateBytes</span><span class="token punctuation">(</span>password<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">,</span> testHash<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> testHash<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> testHash<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，我们使用_generateSalt16Byte()_方法创建了一个随机的16字节盐。接下来，我们为算法定义了必要的参数，如迭代次数、内存限制、哈希长度、并行因子和盐。</p><p>然后，我们创建了一个_Argon2BytesGenerator_对象。这个对象帮助生成密码哈希。我们还定义了一个_byte_数组来存储生成的哈希结果。</p><p>最后，我们创建了另一个_Argon2BytesGenerator_实例来将结果与测试哈希进行比较。这断言密码哈希是正确的，并且可以通过Argon2算法进行验证。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了密码哈希和盐值的基础知识。此外，我们深入研究了Argon2算法，并看到了使用Spring Security Crypto和Bouncy Castle的实现。Spring Security Crypto看起来更简单，因为它抽象了一些过程。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>',39),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-05-Hashing With Argon2 in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Hashing%20With%20Argon2%20in%20Java.html","title":"Java中使用Argon2进行哈希处理","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Security"],"tag":["Argon2","Hashing","Java"],"head":[["meta",{"name":"keywords","content":"Java, Security, Argon2, Hashing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Hashing%20With%20Argon2%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用Argon2进行哈希处理"}],["meta",{"property":"og:description","content":"Java中使用Argon2进行哈希处理 在构建涉及用户认证的Web应用程序时，保护用户免受黑客攻击非常重要。大多数Web应用程序设计为不存储明文密码，而是存储密码的哈希值。哈希和盐值是增强存储在数据库中的密码安全性的两种技术。 在本教程中，我们将学习哈希和盐值技术，以及如何在Java中使用Argon2进行哈希处理。 2. 密码哈希和盐值 密码哈希和盐值..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T18:39:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Argon2"}],["meta",{"property":"article:tag","content":"Hashing"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T18:39:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用Argon2进行哈希处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T18:39:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用Argon2进行哈希处理 在构建涉及用户认证的Web应用程序时，保护用户免受黑客攻击非常重要。大多数Web应用程序设计为不存储明文密码，而是存储密码的哈希值。哈希和盐值是增强存储在数据库中的密码安全性的两种技术。 在本教程中，我们将学习哈希和盐值技术，以及如何在Java中使用Argon2进行哈希处理。 2. 密码哈希和盐值 密码哈希和盐值..."},"headers":[{"level":2,"title":"2. 密码哈希和盐值","slug":"_2-密码哈希和盐值","link":"#_2-密码哈希和盐值","children":[]},{"level":2,"title":"3. 什么是Argon2？","slug":"_3-什么是argon2","link":"#_3-什么是argon2","children":[{"level":3,"title":"4.1 使用Spring Security Crypto实现Argon2哈希","slug":"_4-1-使用spring-security-crypto实现argon2哈希","link":"#_4-1-使用spring-security-crypto实现argon2哈希","children":[]},{"level":3,"title":"4.2 使用Bouncy Castle实现Argon2哈希","slug":"_4-2-使用bouncy-castle实现argon2哈希","link":"#_4-2-使用bouncy-castle实现argon2哈希","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720204795000,"updatedTime":1720204795000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.07,"words":1520},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Hashing With Argon2 in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在构建涉及用户认证的Web应用程序时，保护用户免受黑客攻击非常重要。大多数Web应用程序设计为不存储明文密码，而是存储密码的哈希值。哈希和盐值是增强存储在数据库中的密码安全性的两种技术。</p>\\n<p>在本教程中，我们将学习哈希和盐值技术，以及如何在Java中使用Argon2进行哈希处理。</p>\\n<h2>2. 密码哈希和盐值</h2>\\n<p>密码哈希和盐值是两种可以增强存储在数据库中的密码安全性的技术。哈希算法涉及一种数学运算，可以将密码转换为一串随机字符。</p>\\n<p>然而，黑客可以通过比较常见密码的哈希值来猜测密码。为了防止这种情况，密码盐值就派上用场了。</p>\\n<p>密码盐值是在应用哈希算法之前，向密码添加一个称为盐值的随机数据片段的方法。盐值确保哈希值是独特的，即使两个用户有相同的密码，他们的哈希值也会不同。</p>","autoDesc":true}');export{k as comp,d as data};
