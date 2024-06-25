import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-DpEqAHhK.js";const t={},p=s(`<h1 id="解决安全异常-java-security-unrecoverablekeyexception-无法恢复密钥-baeldung" tabindex="-1"><a class="header-anchor" href="#解决安全异常-java-security-unrecoverablekeyexception-无法恢复密钥-baeldung"><span>解决安全异常：java.security.UnrecoverableKeyException：无法恢复密钥 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探讨如何处理_java.security.UnrecoverableKeyException_。我们还将探索这个异常实际上意味着什么以及导致它的原因。最后，我们将审查解决这个问题的可能方案。</p><h2 id="_2-理论背景" tabindex="-1"><a class="header-anchor" href="#_2-理论背景"><span>2. 理论背景</span></a></h2><p>在Java中，我们有一个密钥库的概念。它本质上是一个包含一些秘密的文件。特别是，它可以包含证书链以及相应的私钥。由于证书只是一个花哨的公钥包装器，我们可以基本上说密钥库包含一个非对称密钥对。</p><p>通常，用密码（也通常称为“口令”）保护我们的私钥是一个好习惯。这不仅是Java密钥库中的好习惯，也是网络安全的一般做法。通常通过使用对称密钥加密算法（如各种AES实例）使用密码加密私钥来实现这种保护。</p><p>我们这里重要的是，密钥库中的私钥可以像我们描述的那样用密码加密。<strong>并非所有密钥库类型都支持此功能，例如JKS密钥库支持私钥密码保护，但PKCS12密钥库不支持</strong>。在我们的示例中，我们将需要密码保护功能，因此我们将从现在开始使用JKS密钥库。</p><h2 id="_3-unrecoverablekeyexception的起源" tabindex="-1"><a class="header-anchor" href="#_3-unrecoverablekeyexception的起源"><span>3. UnrecoverableKeyException的起源</span></a></h2><p>当我们使用_KeyManagerFactory_，特别是当我们调用它的_init()<em>方法时，通常会发生_java.security.UnrecoverableKeyException</em>。这是JSSE中的一个类，它允许我们检索_KeyManager_实例。_KeyManager_基本上是代表负责将我们作为客户端对我们的对等方进行身份验证的抽象的接口。</p><p>_init()<em>方法接受两个参数——用于从认证获取凭据的源密钥库和私钥解密的密码。**当_KeyManagerFactory_无法恢复证书链的私钥时，就会发生_java.security.UnrecoverableKeyException</em>。**这里出现了一个问题——“恢复”实际上意味着什么？嗯，这意味着无法使用给定的密码解密证书链的私钥。<strong>因此，到目前为止，_java.security.UnrecoverableKeyException_的最常见来源是密钥库中私钥的错误密码。</strong></p><p>总之，如果我们为私钥提供的KeyManagerFactory密码/口令不正确，那么KeyManagerFactory将无法解密密钥，因此，我们就会看到这个错误。</p><h2 id="_4-模拟异常" tabindex="-1"><a class="header-anchor" href="#_4-模拟异常"><span>4. 模拟异常</span></a></h2><p>让我们动手尝试模拟这个错误。为此，我们需要一个带有私钥和相应证书对的JKS密钥库。我们可以通过使用_keytool_来实现这一点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ keytool <span class="token parameter variable">-genkey</span> <span class="token parameter variable">-alias</span> single-entry <span class="token parameter variable">-storetype</span> JKS <span class="token parameter variable">-keyalg</span> RSA <span class="token parameter variable">-validity</span> <span class="token number">365</span> <span class="token parameter variable">-keystore</span> single_entry_keystore.jks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦我们运行这个命令，_keytool_将提示我们提供一些额外的信息。在我们的情况下，它将是一些生成证书的额外信息（CN，到期时间等）以及密钥库和私钥的密码。假设我们为密钥库选择了‘admin123’密码，为私钥选择了‘privateKeyPassword’口令。</p><p>为了在Java中加载这个密钥库，我们会这样做：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">X509ExtendedKeyManager</span> <span class="token function">initializeKeyManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">NoSuchAlgorithmException</span><span class="token punctuation">,</span> <span class="token class-name">KeyStoreException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">CertificateException</span><span class="token punctuation">,</span> <span class="token class-name">UnrecoverableKeyException</span><span class="token punctuation">,</span> <span class="token class-name">URISyntaxException</span> <span class="token punctuation">{</span>
    <span class="token class-name">KeyManagerFactory</span> kmf <span class="token operator">=</span> <span class="token class-name">KeyManagerFactory</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">KeyManagerFactory</span><span class="token punctuation">.</span><span class="token function">getDefaultAlgorithm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">KeyStore</span> instance <span class="token operator">=</span> <span class="token class-name">KeyStore</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">KeyStore</span><span class="token punctuation">.</span><span class="token function">getDefaultType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> resourceAsStream <span class="token operator">=</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">newInputStream</span><span class="token punctuation">(</span><span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">ClassLoader</span><span class="token punctuation">.</span><span class="token function">getSystemResource</span><span class="token punctuation">(</span><span class="token string">&quot;single_entry_keystore.jks&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    instance<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>resourceAsStream<span class="token punctuation">,</span> <span class="token string">&quot;admin123&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    kmf<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> <span class="token string">&quot;privateKeyPassword&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">X509ExtendedKeyManager</span><span class="token punctuation">)</span> kmf<span class="token punctuation">.</span><span class="token function">getKeyManagers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们从我们刚刚创建的_Keysotre_中获得了_KeyManager_的实例。这段代码工作正常，因为两个密码都是正确的。如果我们在上述示例中更改了私钥的密码，我们将得到一个_java.security.UnrecoverableKeyException._。所以，只要使用正确的密码就能解决这个问题。</p><h2 id="_5-unrecoverablekeyexception的边缘情况" tabindex="-1"><a class="header-anchor" href="#_5-unrecoverablekeyexception的边缘情况"><span>5. UnrecoverableKeyException的边缘情况</span></a></h2><p>还有一些边缘情况可能会导致_java.security.UnrecoverableKeyException_，大多数人并不知道。让我们一一讨论它们。</p><h3 id="_5-1-多个私钥条目" tabindex="-1"><a class="header-anchor" href="#_5-1-多个私钥条目"><span>5.1. 多个私钥条目</span></a></h3><p>例如，让我们想象这样一种场景，我们的密钥库中没有单个私钥/证书链，而是有多个。让我们创建一个新的密钥库，里面有两个密钥：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ keytool <span class="token parameter variable">-genkey</span> <span class="token parameter variable">-alias</span> entry-1 <span class="token parameter variable">-storetype</span> JKS <span class="token parameter variable">-keyalg</span> RSA <span class="token parameter variable">-validity</span> <span class="token number">365</span> <span class="token parameter variable">-keystore</span> multi_entry_keystore.jks
$ keytool <span class="token parameter variable">-genkey</span> <span class="token parameter variable">-alias</span> entry-2 <span class="token parameter variable">-storetype</span> JKS <span class="token parameter variable">-keyalg</span> RSA <span class="token parameter variable">-validity</span> <span class="token number">365</span> <span class="token parameter variable">-keystore</span> multi_entry_keystore.jks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们向密钥库中添加了两个带有证书条目的私钥。假设我们用密码‘abc123’添加了第一个私钥，用密码‘bcd456’添加了第二个。到目前为止，这应该是完全没问题的。</p><p>现在，构建给定密钥库的_KeyManager_的代码不会改变——它看起来和我们上面做的完全一样。<strong>唯一的问题是_KeyManagerFactory.init()_方法只接受一个用于私钥解密的密码。</strong></p><p>这看起来很奇怪——我们到底应该提供哪个密码——‘abc123’还是‘bcd456’？**事实证明，Sun JSSE实现的_KeyManagerFactory_，默认情况下，期望密钥库中的每个私钥都有一个密码。**没错，即使在密钥库中有两个用不同密码加密的私钥在技术上不是问题。从理论上讲没有限制；然而，从API的角度来看，有一个限制。</p><p><strong>我们不能为密钥库中的任何两个给定密钥设置不同的密码</strong>。如果我们违反了这个规则，_KeyManagerFactory_实现将尝试用提供的密码解密所有密钥，当然，至少对一个密钥会失败。因此，_KeyManagerFactory.init()_会抛出一个异常，因为它无法解密密钥——确实，它确实无法解密。所以我们绝对需要记住这一点。</p><h3 id="_5-2-外部库的限制" tabindex="-1"><a class="header-anchor" href="#_5-2-外部库的限制"><span>5.2. 外部库的限制</span></a></h3><p>作为软件工程师，我们通常不直接与JSSE交互。框架通常通过为我们创建多层抽象来隐藏这一点。然而，我们应该明白，我们仍然通过使用各种客户端间接与_KeyManager_和其他JSSE类交互，例如Apache HTTP客户端或Apache Tomcat。</p><p><strong>这些框架可以并且经常对它们期望的密码施加各种限制</strong>。例如，当前Apache Tomcat实现依赖于密钥库密码等于密钥库中私钥的密码这一事实。这些限制可能因一个库而异，但现在，正如我们理解了_java.security.UnrecoverableKeyException_的原因，我们应该知道在哪里挖掘。所以，要留意项目中使用的框架及其实现限制。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇文章中，我们探讨了关于_java.security.UnrecoverableKeyException_的所有我们需要知道的内容——它的原因，以及修复它的方法。我们了解到_java.security.UnrecoverableKeyException_是由_KeyManagerFactory_抛出的，以表示无法解密密钥库内的私钥。正如所提到的，这主要是因为错误的解密密钥（密码）。</p><p>也有一些细微差别需要了解。例如，我们不能在密钥库中拥有具有不同密码的多个私钥。从JSSE的角度来看这是不可接受的。我们还应该警惕不同框架在处理密钥库和私钥方面的限制。</p><p>和往常一样，这篇文章的源代码将在GitHub上提供。</p><p>评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。</p>`,35),c=[p];function o(r,l){return e(),n("div",null,c)}const k=a(t,[["render",o],["__file","Resolving Security Exception  java.security.UnrecoverableKeyException  Cannot Recover Key.html.vue"]]),y=JSON.parse('{"path":"/posts/baeldung/Archive/Resolving%20Security%20Exception%20%20java.security.UnrecoverableKeyException%20%20Cannot%20Recover%20Key.html","title":"解决安全异常：java.security.UnrecoverableKeyException：无法恢复密钥 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-10-10T00:00:00.000Z","category":["Java","安全"],"tag":["Java安全","UnrecoverableKeyException"],"description":"解决安全异常：java.security.UnrecoverableKeyException：无法恢复密钥 | Baeldung 1. 引言 在本教程中，我们将探讨如何处理_java.security.UnrecoverableKeyException_。我们还将探索这个异常实际上意味着什么以及导致它的原因。最后，我们将审查解决这个问题的可能方案。 2...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Resolving%20Security%20Exception%20%20java.security.UnrecoverableKeyException%20%20Cannot%20Recover%20Key.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决安全异常：java.security.UnrecoverableKeyException：无法恢复密钥 | Baeldung"}],["meta",{"property":"og:description","content":"解决安全异常：java.security.UnrecoverableKeyException：无法恢复密钥 | Baeldung 1. 引言 在本教程中，我们将探讨如何处理_java.security.UnrecoverableKeyException_。我们还将探索这个异常实际上意味着什么以及导致它的原因。最后，我们将审查解决这个问题的可能方案。 2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java安全"}],["meta",{"property":"article:tag","content":"UnrecoverableKeyException"}],["meta",{"property":"article:published_time","content":"2023-10-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决安全异常：java.security.UnrecoverableKeyException：无法恢复密钥 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理论背景","slug":"_2-理论背景","link":"#_2-理论背景","children":[]},{"level":2,"title":"3. UnrecoverableKeyException的起源","slug":"_3-unrecoverablekeyexception的起源","link":"#_3-unrecoverablekeyexception的起源","children":[]},{"level":2,"title":"4. 模拟异常","slug":"_4-模拟异常","link":"#_4-模拟异常","children":[]},{"level":2,"title":"5. UnrecoverableKeyException的边缘情况","slug":"_5-unrecoverablekeyexception的边缘情况","link":"#_5-unrecoverablekeyexception的边缘情况","children":[{"level":3,"title":"5.1. 多个私钥条目","slug":"_5-1-多个私钥条目","link":"#_5-1-多个私钥条目","children":[]},{"level":3,"title":"5.2. 外部库的限制","slug":"_5-2-外部库的限制","link":"#_5-2-外部库的限制","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.96,"words":1787},"filePathRelative":"posts/baeldung/Archive/Resolving Security Exception  java.security.UnrecoverableKeyException  Cannot Recover Key.md","localizedDate":"2023年10月10日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探讨如何处理_java.security.UnrecoverableKeyException_。我们还将探索这个异常实际上意味着什么以及导致它的原因。最后，我们将审查解决这个问题的可能方案。</p>\\n<h2>2. 理论背景</h2>\\n<p>在Java中，我们有一个密钥库的概念。它本质上是一个包含一些秘密的文件。特别是，它可以包含证书链以及相应的私钥。由于证书只是一个花哨的公钥包装器，我们可以基本上说密钥库包含一个非对称密钥对。</p>\\n<p>通常，用密码（也通常称为“口令”）保护我们的私钥是一个好习惯。这不仅是Java密钥库中的好习惯，也是网络安全的一般做法。通常通过使用对称密钥加密算法（如各种AES实例）使用密码加密私钥来实现这种保护。</p>","autoDesc":true}');export{k as comp,y as data};
