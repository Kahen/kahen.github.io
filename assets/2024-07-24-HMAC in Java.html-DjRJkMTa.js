import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const p={},e=t(`<h1 id="java中的hmac" tabindex="-1"><a class="header-anchor" href="#java中的hmac"><span>Java中的HMAC</span></a></h1><p>让我们考虑这样一个场景：两个参与者想要进行通信，并且他们需要一种方法来验证他们接收到的消息没有被篡改。基于哈希的消息认证码（HMAC）是一个不错的解决方案。</p><p>在本教程中，我们将探讨如何在Java中使用HMAC算法。</p><h2 id="_2-基于哈希的消息认证码-hmac" tabindex="-1"><a class="header-anchor" href="#_2-基于哈希的消息认证码-hmac"><span>2. 基于哈希的消息认证码（HMAC）</span></a></h2><p>HMAC是一种加密方法，保证了两个参与者之间消息的完整性。</p><p>HMAC算法由一个密钥和一个哈希函数组成。密钥是一段唯一的信息或一串字符。它被消息的发送者和接收者所知晓。</p><p>哈希函数是一种映射算法，将一个序列转换为另一个序列。</p><p>下面的图表展示了高级的HMAC算法：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/11/hmac-in-java.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>HMAC使用MD5和SHA-*等加密哈希函数。</p><h2 id="_3-使用jdk-api进行hmac" tabindex="-1"><a class="header-anchor" href="#_3-使用jdk-api进行hmac"><span>3. 使用JDK API进行HMAC</span></a></h2><p><strong>Java提供了内置的_Mac_类来生成HMAC。</strong> 初始化_Mac_对象后，我们调用_doFinal()_方法来执行HMAC操作。此方法返回一个包含HMAC结果的字节数组。</p><p>让我们定义一个使用各种哈希算法（如MD5、SHA-1、SHA-224、SHA-256、SHA-384和SHA-512）计算HMAC的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">hmacWithJava</span><span class="token punctuation">(</span><span class="token class-name">String</span> algorithm<span class="token punctuation">,</span> <span class="token class-name">String</span> data<span class="token punctuation">,</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">NoSuchAlgorithmException</span><span class="token punctuation">,</span> <span class="token class-name">InvalidKeyException</span> <span class="token punctuation">{</span>
    <span class="token class-name">SecretKeySpec</span> secretKeySpec <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SecretKeySpec</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> algorithm<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mac</span> mac <span class="token operator">=</span> <span class="token class-name">Mac</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>algorithm<span class="token punctuation">)</span><span class="token punctuation">;</span>
    mac<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>secretKeySpec<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">bytesToHex</span><span class="token punctuation">(</span>mac<span class="token punctuation">.</span><span class="token function">doFinal</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们写一个示例测试来演示HMAC计算：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDataAndKeyAndAlgorithm_whenHmacWithJava_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">throws</span> <span class="token class-name">NoSuchAlgorithmException</span><span class="token punctuation">,</span> <span class="token class-name">InvalidKeyException</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> hmacSHA256Value <span class="token operator">=</span> <span class="token string">&quot;5b50d80c7dc7ae8bb1b1433cc0b99ecd2ac8397a555c6f75cb8a619ae35a0c35&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> hmacSHA256Algorithm <span class="token operator">=</span> <span class="token string">&quot;HmacSHA256&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">HMACUtil</span><span class="token punctuation">.</span><span class="token function">hmacWithJava</span><span class="token punctuation">(</span>hmacSHA256Algorithm<span class="token punctuation">,</span> data<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>hmacSHA256Value<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们使用_HmacSHA512_算法与简单的字符串数据和密钥。然后，我们断言HMAC结果等于预期的数据。</p><h2 id="_4-apache-commons库" tabindex="-1"><a class="header-anchor" href="#_4-apache-commons库"><span>4. Apache Commons库</span></a></h2><p>Apache Commons库也提供了一个用于HMAC计算的实用类。</p><h3 id="_4-1-添加maven依赖" tabindex="-1"><a class="header-anchor" href="#_4-1-添加maven依赖"><span>4.1. 添加Maven依赖</span></a></h3><p>要使用Apache Commons实用类，我们需要在我们的pom.xml中添加commons-codec：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`commons-codec\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`commons-codec\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`1.15\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-hmacutils-类" tabindex="-1"><a class="header-anchor" href="#_4-2-hmacutils-类"><span>4.2. _HmacUtils_类</span></a></h3><p><strong>为了计算HMAC，我们可以使用_HmacUtils_类。</strong> 初始化_HmacUtils_对象后，我们调用_hmacHex()_方法来执行HMAC操作。此方法返回一个包含HMAC结果的十六进制字符串。</p><p>让我们创建一个生成HMAC的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">hmacWithApacheCommons</span><span class="token punctuation">(</span><span class="token class-name">String</span> algorithm<span class="token punctuation">,</span> <span class="token class-name">String</span> data<span class="token punctuation">,</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> hmac <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HmacUtils</span><span class="token punctuation">(</span>algorithm<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hmacHex</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> hmac<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们写一个示例测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDataAndKeyAndAlgorithm_whenHmacWithApacheCommons_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> hmacMD5Value <span class="token operator">=</span> <span class="token string">&quot;621dc816b3bf670212e0c261dc9bcdb6&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> hmacMD5Algorithm <span class="token operator">=</span> <span class="token string">&quot;HmacMD5&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">HMACUtil</span><span class="token punctuation">.</span><span class="token function">hmacWithApacheCommons</span><span class="token punctuation">(</span>hmacMD5Algorithm<span class="token punctuation">,</span> data<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>hmacMD5Value<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们使用_HmacMD5_算法。</p><h2 id="_5-bouncycastle库" tabindex="-1"><a class="header-anchor" href="#_5-bouncycastle库"><span>5. BouncyCastle库</span></a></h2><p>同样，<strong>我们也可以在Java中使用BouncyCastle库。</strong> BouncyCastle是一组我们可以在Java中使用的加密API集合。</p><h3 id="_5-1-添加maven依赖" tabindex="-1"><a class="header-anchor" href="#_5-1-添加maven依赖"><span>5.1. 添加Maven依赖</span></a></h3><p>在我们开始使用这个库之前，我们需要在我们的pom.xml文件中添加bcpkix-jdk15to18依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.bouncycastle\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`bcpkix-jdk15to18\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`1.69\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-hmac-类" tabindex="-1"><a class="header-anchor" href="#_5-2-hmac-类"><span>5.2. _Hmac_类</span></a></h3><p>我们将通过<strong>基于我们想要使用的哈希算法实例化_HMac_类</strong>。然后我们将使用_update()_方法使用输入数据更新HMAC对象。最后，我们将调用_doFinal()_方法来生成HMAC代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">hmacWithBouncyCastle</span><span class="token punctuation">(</span><span class="token class-name">String</span> algorithm<span class="token punctuation">,</span> <span class="token class-name">String</span> data<span class="token punctuation">,</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Digest</span> digest <span class="token operator">=</span> <span class="token function">getHashDigest</span><span class="token punctuation">(</span>algorithm<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">HMac</span> hMac <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HMac</span><span class="token punctuation">(</span>digest<span class="token punctuation">)</span><span class="token punctuation">;</span>
    hMac<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">KeyParameter</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> hmacIn <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    hMac<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>hmacIn<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> hmacIn<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> hmacOut <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>hMac<span class="token punctuation">.</span><span class="token function">getMacSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    hMac<span class="token punctuation">.</span><span class="token function">doFinal</span><span class="token punctuation">(</span>hmacOut<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">bytesToHex</span><span class="token punctuation">(</span>hmacOut<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Digest</span> <span class="token function">getHashDigest</span><span class="token punctuation">(</span><span class="token class-name">String</span> algorithm<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>algorithm<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&quot;HmacMD5&quot;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MD5Digest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">&quot;HmacSHA256&quot;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SHA256Digest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">&quot;HmacSHA384&quot;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SHA384Digest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">&quot;HmacSHA512&quot;</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SHA512Digest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SHA256Digest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个示例，它为字符串数据生成一个HMAC，然后验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenDataAndKeyAndAlgorithm_whenHmacWithBouncyCastle_thenSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> hmacSHA512Value <span class="token operator">=</span> <span class="token string">&quot;b313a21908df55c9e322e3c65a4b0b7561ab1594ca806b3affbc0d769a1&quot;</span> <span class="token operator">+</span>
      <span class="token string">&quot;290c1922aa6622587bea3c0c4d871470a6d06f54dbd20dbda84250e2741eb01f08e33&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> hmacSHA512Algorithm <span class="token operator">=</span> <span class="token string">&quot;HmacSHA512&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">HMACUtil</span><span class="token punctuation">.</span><span class="token function">hmacWithBouncyCastle</span><span class="token punctuation">(</span>hmacSHA512Algorithm<span class="token punctuation">,</span> data<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>hmacSHA512Value<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们使用_HmacSHA512_算法。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p><strong>HMAC提供了数据完整性检查。</strong> 在本文中，我们学习了如何使用Java中的HMAC算法为输入的字符串数据生成HMAC。此外，我们还讨论了在HMAC计算中使用Apache Commons和BouncyCastle库的方法。</p><p>如常，本文的完整源代码可在GitHub上获得。</p>`,43),c=[e];function o(l,i){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","2024-07-24-HMAC in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-HMAC%20in%20Java.html","title":"Java中的HMAC","lang":"zh-CN","frontmatter":{"date":"2021-11-01T00:00:00.000Z","category":["Java","Security"],"tag":["HMAC","Java","BouncyCastle","Apache Commons"],"head":[["meta",{"name":"keywords","content":"Java, Security, HMAC, BouncyCastle, Apache Commons"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-HMAC%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的HMAC"}],["meta",{"property":"og:description","content":"Java中的HMAC 让我们考虑这样一个场景：两个参与者想要进行通信，并且他们需要一种方法来验证他们接收到的消息没有被篡改。基于哈希的消息认证码（HMAC）是一个不错的解决方案。 在本教程中，我们将探讨如何在Java中使用HMAC算法。 2. 基于哈希的消息认证码（HMAC） HMAC是一种加密方法，保证了两个参与者之间消息的完整性。 HMAC算法由一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/11/hmac-in-java.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T06:53:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HMAC"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"BouncyCastle"}],["meta",{"property":"article:tag","content":"Apache Commons"}],["meta",{"property":"article:published_time","content":"2021-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T06:53:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的HMAC\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/11/hmac-in-java.png\\"],\\"datePublished\\":\\"2021-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T06:53:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的HMAC 让我们考虑这样一个场景：两个参与者想要进行通信，并且他们需要一种方法来验证他们接收到的消息没有被篡改。基于哈希的消息认证码（HMAC）是一个不错的解决方案。 在本教程中，我们将探讨如何在Java中使用HMAC算法。 2. 基于哈希的消息认证码（HMAC） HMAC是一种加密方法，保证了两个参与者之间消息的完整性。 HMAC算法由一..."},"headers":[{"level":2,"title":"2. 基于哈希的消息认证码（HMAC）","slug":"_2-基于哈希的消息认证码-hmac","link":"#_2-基于哈希的消息认证码-hmac","children":[]},{"level":2,"title":"3. 使用JDK API进行HMAC","slug":"_3-使用jdk-api进行hmac","link":"#_3-使用jdk-api进行hmac","children":[]},{"level":2,"title":"4. Apache Commons库","slug":"_4-apache-commons库","link":"#_4-apache-commons库","children":[{"level":3,"title":"4.1. 添加Maven依赖","slug":"_4-1-添加maven依赖","link":"#_4-1-添加maven依赖","children":[]},{"level":3,"title":"4.2. _HmacUtils_类","slug":"_4-2-hmacutils-类","link":"#_4-2-hmacutils-类","children":[]}]},{"level":2,"title":"5. BouncyCastle库","slug":"_5-bouncycastle库","link":"#_5-bouncycastle库","children":[{"level":3,"title":"5.1. 添加Maven依赖","slug":"_5-1-添加maven依赖","link":"#_5-1-添加maven依赖","children":[]},{"level":3,"title":"5.2. _Hmac_类","slug":"_5-2-hmac-类","link":"#_5-2-hmac-类","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721803992000,"updatedTime":1721803992000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.47,"words":1041},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-HMAC in Java.md","localizedDate":"2021年11月1日","excerpt":"\\n<p>让我们考虑这样一个场景：两个参与者想要进行通信，并且他们需要一种方法来验证他们接收到的消息没有被篡改。基于哈希的消息认证码（HMAC）是一个不错的解决方案。</p>\\n<p>在本教程中，我们将探讨如何在Java中使用HMAC算法。</p>\\n<h2>2. 基于哈希的消息认证码（HMAC）</h2>\\n<p>HMAC是一种加密方法，保证了两个参与者之间消息的完整性。</p>\\n<p>HMAC算法由一个密钥和一个哈希函数组成。密钥是一段唯一的信息或一串字符。它被消息的发送者和接收者所知晓。</p>\\n<p>哈希函数是一种映射算法，将一个序列转换为另一个序列。</p>\\n<p>下面的图表展示了高级的HMAC算法：</p>","autoDesc":true}');export{r as comp,d as data};
