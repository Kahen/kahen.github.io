import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BMOUrRO4.js";const e={},o=t(`<h1 id="trustanchors-参数必须非空-错误解析" tabindex="-1"><a class="header-anchor" href="#trustanchors-参数必须非空-错误解析"><span>&quot;trustAnchors 参数必须非空&quot;错误解析</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将解释什么是信任锚点。此外，我们将展示Java中_TrustStore_的默认位置和预期的文件格式。最后，我们将阐明出现错误：“<em>java.security.InvalidAlgorithmParameterException</em>: trust anchors parameter must be non-empty”的原因。</p><h2 id="_2-信任锚点定义" tabindex="-1"><a class="header-anchor" href="#_2-信任锚点定义"><span>2. 信任锚点定义</span></a></h2><p>首先让我们解释一下信任锚点是什么。<strong>在密码学系统中，信任锚点定义了信任被假定并派生的根实体</strong>。在像X.509这样的架构中，根证书是信任锚点。此外，根证书保证链中所有其他证书的信任。</p><h2 id="_3-truststore-位置和格式" tabindex="-1"><a class="header-anchor" href="#_3-truststore-位置和格式"><span>3. <em>TrustStore</em> 位置和格式</span></a></h2><p>现在让我们来看看Java中_TrustStore_的位置和格式。首先，Java按顺序在两个位置查找_TrustStore_：</p><ul><li><em>$JAVA_HOME/lib/security/jssecacerts</em></li><li><em>$JAVA_HOME/lib/security/cacerts</em></li></ul><p>我们可以使用参数_-Djavax.net.ssl.trustStore_覆盖默认位置。</p><p>此外，参数_-Djavax.net.ssl.trustStorePassword_允许我们为_TrustStore_提供密码。最终，命令看起来像这样：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-Djavax.net.ssl.trustStore</span><span class="token operator">=</span>/some/loc/on/server/our_truststore.jks <span class="token parameter variable">-Djavax.net.ssl.trustStorePassword</span><span class="token operator">=</span>our_password <span class="token parameter variable">-jar</span> application.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，JKS是默认的_TrustStore_格式。参数_-Djavax.net.ssl.trustStoreType_允许覆盖默认的_TrustStore_类型。</p><p>让我们看看Java 16中_keytool_实用工具对_$JAVA_HOME/lib/security/cacerts_的输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ keytool <span class="token parameter variable">-list</span> <span class="token parameter variable">-cacerts</span>
Enter keystore password:
Keystore type: JKS
Keystore provider: SUN

Your keystore contains <span class="token number">90</span> entries
<span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，_KeyStore_类型是JKS。此外，我们得到了文件中存储的所有90个证书。</p><h2 id="_4-异常原因" tabindex="-1"><a class="header-anchor" href="#_4-异常原因"><span>4. 异常原因</span></a></h2><p>现在让我们看看异常“<em>java.security.InvalidAlgorithmParameterException</em>: trustAnchors parameter must be non-empty”。</p><p>首先，Java运行时只在_PKIXParameters_类中创建_InvalidAlgorithmParameterException_，该类用于从_KeyStore_读取证书。<strong><em>PKIXParameters_的构造函数从作为参数给出的_KeyStore_中收集_trustAnchors</em></strong>。</p><p>当提供的_KeyStore_没有_trustAnchors_时，会抛出异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>trustAnchors<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InvalidAlgorithmParameterException</span><span class="token punctuation">(</span><span class="token string">&quot;the trustAnchors &quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;parameter must be non-empty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>让我们尝试复现这个情况。首先，让我们创建一个空的_KeyStore_</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">KeyStore</span> <span class="token function">getKeyStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CertificateException</span><span class="token punctuation">,</span> <span class="token class-name">NoSuchAlgorithmException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">KeyStoreException</span> <span class="token punctuation">{</span>
    <span class="token class-name">KeyStore</span> ks <span class="token operator">=</span> <span class="token class-name">KeyStore</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">KeyStore</span><span class="token punctuation">.</span><span class="token function">getDefaultType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ks<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;changeIt&quot;</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> ks<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们测试_PKIXParameters_类的实例化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenOpeningTrustStore_thenExceptionIsThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">KeyStore</span> keyStore <span class="token operator">=</span> <span class="token function">getKeyStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">InvalidAlgorithmParameterException</span> invalidAlgorithmParameterException <span class="token operator">=</span>
      <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">InvalidAlgorithmParameterException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">PKIXParameters</span><span class="token punctuation">(</span>keyStore<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;the trustAnchors parameter must be non-empty&quot;</span><span class="token punctuation">,</span> invalidAlgorithmParameterException<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，构造函数如预期那样抛出了异常。换句话说，当给定_KeyStore_中没有受信任的证书时，无法创建_PKIXParameters_类的实例。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇短文中，我们描述了什么是信任锚点。然后，我们展示了默认_TrustStore_的位置和文件格式。最后，我们展示了“trust anchors parameter must be non-empty”错误的原因。</p><p>如常，示例的源代码可以在GitHub上找到。</p>`,28),p=[o];function r(c,i){return s(),n("div",null,p)}const d=a(e,[["render",r],["__file","2024-07-21-Error   trustAnchors parameter must be non empty .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Error%20%20%20trustAnchors%20parameter%20must%20be%20non%20empty%20.html","title":"\\"trustAnchors 参数必须非空\\"错误解析","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Security"],"tag":["TrustAnchors","KeyStore","PKIXParameters"],"head":[["meta",{"name":"keywords","content":"Java, TrustAnchors, KeyStore, PKIXParameters, SSL, Security"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Error%20%20%20trustAnchors%20parameter%20must%20be%20non%20empty%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"\\"trustAnchors 参数必须非空\\"错误解析"}],["meta",{"property":"og:description","content":"\\"trustAnchors 参数必须非空\\"错误解析 1. 概述 在本教程中，我们将解释什么是信任锚点。此外，我们将展示Java中_TrustStore_的默认位置和预期的文件格式。最后，我们将阐明出现错误：“java.security.InvalidAlgorithmParameterException: trust anchors parameter..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T21:13:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"TrustAnchors"}],["meta",{"property":"article:tag","content":"KeyStore"}],["meta",{"property":"article:tag","content":"PKIXParameters"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T21:13:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\\\\\"trustAnchors 参数必须非空\\\\\\"错误解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T21:13:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"\\"trustAnchors 参数必须非空\\"错误解析 1. 概述 在本教程中，我们将解释什么是信任锚点。此外，我们将展示Java中_TrustStore_的默认位置和预期的文件格式。最后，我们将阐明出现错误：“java.security.InvalidAlgorithmParameterException: trust anchors parameter..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 信任锚点定义","slug":"_2-信任锚点定义","link":"#_2-信任锚点定义","children":[]},{"level":2,"title":"3. TrustStore 位置和格式","slug":"_3-truststore-位置和格式","link":"#_3-truststore-位置和格式","children":[]},{"level":2,"title":"4. 异常原因","slug":"_4-异常原因","link":"#_4-异常原因","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721596380000,"updatedTime":1721596380000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.2,"words":659},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Error   trustAnchors parameter must be non empty .md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将解释什么是信任锚点。此外，我们将展示Java中_TrustStore_的默认位置和预期的文件格式。最后，我们将阐明出现错误：“<em>java.security.InvalidAlgorithmParameterException</em>: trust anchors parameter must be non-empty”的原因。</p>\\n<h2>2. 信任锚点定义</h2>\\n<p>首先让我们解释一下信任锚点是什么。<strong>在密码学系统中，信任锚点定义了信任被假定并派生的根实体</strong>。在像X.509这样的架构中，根证书是信任锚点。此外，根证书保证链中所有其他证书的信任。</p>","autoDesc":true}');export{d as comp,m as data};
