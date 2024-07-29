import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-BUAgDejY.js";const t={},p=e(`<h1 id="java密钥库文件中检查证书名称和别名" tabindex="-1"><a class="header-anchor" href="#java密钥库文件中检查证书名称和别名"><span>Java密钥库文件中检查证书名称和别名</span></a></h1><p>在本教程中，我们将学习如何使用Java密钥库API和_keytool_实用工具来检查Java密钥库文件中的证书名称和别名。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>在介绍这两种方法之前，让我们使用_keytool_实用工具创建一个密钥库文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ keytool <span class="token parameter variable">-genkeypair</span> <span class="token parameter variable">-keyalg</span> rsa <span class="token parameter variable">-alias</span> baeldung <span class="token parameter variable">-storepass</span> storepw@1 <span class="token parameter variable">-keystore</span> my-keystore.jks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>注意，密钥库密码中的‘_$’_字符可能会在bash CLI中引起一些意外行为，因为它被解释为环境变量。</strong></p><p>接下来，让我们提供所需的额外信息：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>您的姓名是什么？
  [未知]：my-cn.localhost
您的组织单位名称是什么？
  [未知]：Java Devs
您的组织名称是什么？
  [未知]：Baeldung
您的城市或地区名称是什么？
  [未知]：伦敦
您的州或省份名称是什么？
  [未知]：大伦敦
这个单位的两字母国家代码是什么？
  [未知]：GB
CN=my-cn.localhost, OU=Java Devs, O=Baeldung, L=伦敦, ST=大伦敦, C=GB是否正确？
  [否]：是

生成2048位RSA密钥对和自签名证书（SHA256withRSA），有效期为90天
\\t用于：CN=my-cn.localhost, OU=Java Devs, O=Baeldung, L=伦敦, ST=大伦敦, C=GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们验证_my-keystore.jks_文件是否已生成：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span> <span class="token operator">|</span> <span class="token function">grep</span> my-keystore.jks
my-keystore.jks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在准备好继续使用生成的密钥库文件来检查证书名称和别名的两种方法。</p><h2 id="_3-使用java-keystore-api检查证书名称和别名" tabindex="-1"><a class="header-anchor" href="#_3-使用java-keystore-api检查证书名称和别名"><span>3. 使用Java KeyStore API检查证书名称和别名</span></a></h2><p>这种方法使用Java KeyStore API，并且适用于X509证书。首先，让我们读取密钥库文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">KeyStore</span> <span class="token function">readKeyStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">KeyStore</span> keystore <span class="token operator">=</span> <span class="token class-name">KeyStore</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">KeyStore</span><span class="token punctuation">.</span><span class="token function">getDefaultType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    keystore<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token constant">KEYSTORE_FILE</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">KEYSTORE_PWD</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> keystore<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们验证密钥库中存在具有匹配别名和名称的证书的情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCheckingAliasAndName_thenMatchIsFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">KeyStore</span> keystore <span class="token operator">=</span> <span class="token function">readKeyStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>keystore<span class="token punctuation">.</span><span class="token function">containsAlias</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">X509Certificate</span> x509Certificate <span class="token operator">=</span>
      <span class="token punctuation">(</span><span class="token class-name">X509Certificate</span><span class="token punctuation">)</span> keystore<span class="token punctuation">.</span><span class="token function">getCertificate</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> ownerName <span class="token operator">=</span> x509Certificate<span class="token punctuation">.</span><span class="token function">getSubjectX500Principal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>ownerName<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;my-cn.localhost&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们验证密钥库中不存在具有给定别名或名称的证书的情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCheckingAliasAndName_thenNameIsNotFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">KeyStore</span> keystore <span class="token operator">=</span> <span class="token function">readKeyStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>keystore<span class="token punctuation">.</span><span class="token function">containsAlias</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">X509Certificate</span> x509Certificate <span class="token operator">=</span>
      <span class="token punctuation">(</span><span class="token class-name">X509Certificate</span><span class="token punctuation">)</span> keystore<span class="token punctuation">.</span><span class="token function">getCertificate</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> ownerName <span class="token operator">=</span> x509Certificate<span class="token punctuation">.</span><span class="token function">getSubjectX500Principal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>ownerName<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;commonName1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenCheckingAliasAndName_thenAliasIsNotFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">KeyStore</span> keystore <span class="token operator">=</span> <span class="token function">readKeyStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>keystore<span class="token punctuation">.</span><span class="token function">containsAlias</span><span class="token punctuation">(</span><span class="token string">&quot;alias1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种方法使用_keytool_实用工具和_alias_参数：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ keytool <span class="token parameter variable">-list</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-alias</span> baeldung <span class="token parameter variable">-keystore</span> my-keystore.jks <span class="token parameter variable">-storepass</span> storepw@1 <span class="token operator">|</span> <span class="token function">grep</span> my-cn.localhost
Owner: <span class="token assign-left variable">CN</span><span class="token operator">=</span>my-cn.localhost, <span class="token assign-left variable">OU</span><span class="token operator">=</span>Java Devs, <span class="token assign-left variable">O</span><span class="token operator">=</span>Baeldung, <span class="token assign-left variable">L</span><span class="token operator">=</span>London, <span class="token assign-left variable">ST</span><span class="token operator">=</span>Greater London, <span class="token assign-left variable">C</span><span class="token operator">=</span>GB
Issuer: <span class="token assign-left variable">CN</span><span class="token operator">=</span>my-cn.localhost, <span class="token assign-left variable">OU</span><span class="token operator">=</span>Java Devs, <span class="token assign-left variable">O</span><span class="token operator">=</span>Baeldung, <span class="token assign-left variable">L</span><span class="token operator">=</span>London, <span class="token assign-left variable">ST</span><span class="token operator">=</span>Greater London, <span class="token assign-left variable">C</span><span class="token operator">=</span>GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们还使用_grep_命令来搜索证书名称。</strong> 如果没有找到匹配的证书别名和名称，上述命令将返回空结果。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了如何使用两种方法在Java密钥库文件中检查证书名称和别名。第一种方法使用Java KeyStore API，而另一种方法使用_keytool_实用工具。当使用多个密钥库文件时，我们需要找到特定别名和名称的文件，这些方法证明非常有用。</p><p>如往常一样，完整的代码可以在GitHub上找到。</p>`,24),o=[p];function c(l,i){return s(),n("div",null,o)}const k=a(t,[["render",c],["__file","2024-06-26-Check Certificate Name and Alias in Keystore File.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Check%20Certificate%20Name%20and%20Alias%20in%20Keystore%20File.html","title":"Java密钥库文件中检查证书名称和别名","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","Security"],"tag":["Java KeyStore","keytool"],"head":[["meta",{"name":"keywords","content":"Java KeyStore, keytool, certificate, alias"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Check%20Certificate%20Name%20and%20Alias%20in%20Keystore%20File.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java密钥库文件中检查证书名称和别名"}],["meta",{"property":"og:description","content":"Java密钥库文件中检查证书名称和别名 在本教程中，我们将学习如何使用Java密钥库API和_keytool_实用工具来检查Java密钥库文件中的证书名称和别名。 2. 设置 在介绍这两种方法之前，让我们使用_keytool_实用工具创建一个密钥库文件： 注意，密钥库密码中的‘_$’_字符可能会在bash CLI中引起一些意外行为，因为它被解释为环境变..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T23:28:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java KeyStore"}],["meta",{"property":"article:tag","content":"keytool"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T23:28:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java密钥库文件中检查证书名称和别名\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T23:28:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java密钥库文件中检查证书名称和别名 在本教程中，我们将学习如何使用Java密钥库API和_keytool_实用工具来检查Java密钥库文件中的证书名称和别名。 2. 设置 在介绍这两种方法之前，让我们使用_keytool_实用工具创建一个密钥库文件： 注意，密钥库密码中的‘_$’_字符可能会在bash CLI中引起一些意外行为，因为它被解释为环境变..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 使用Java KeyStore API检查证书名称和别名","slug":"_3-使用java-keystore-api检查证书名称和别名","link":"#_3-使用java-keystore-api检查证书名称和别名","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719444521000,"updatedTime":1719444521000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.63,"words":789},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Check Certificate Name and Alias in Keystore File.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>在本教程中，我们将学习如何使用Java密钥库API和_keytool_实用工具来检查Java密钥库文件中的证书名称和别名。</p>\\n<h2>2. 设置</h2>\\n<p>在介绍这两种方法之前，让我们使用_keytool_实用工具创建一个密钥库文件：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>$ keytool <span class=\\"token parameter variable\\">-genkeypair</span> <span class=\\"token parameter variable\\">-keyalg</span> rsa <span class=\\"token parameter variable\\">-alias</span> baeldung <span class=\\"token parameter variable\\">-storepass</span> storepw@1 <span class=\\"token parameter variable\\">-keystore</span> my-keystore.jks\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
