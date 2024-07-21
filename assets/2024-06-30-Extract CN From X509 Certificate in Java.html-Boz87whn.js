import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const p={},e=t('<h1 id="在java中从x509证书提取通用名称" tabindex="-1"><a class="header-anchor" href="#在java中从x509证书提取通用名称"><span>在Java中从X509证书提取通用名称</span></a></h1><p><strong>通用名称（CN）是X.509证书中的可分辨名称（DN）字段内的一个属性</strong>。CN通常是证书所属组织的域名。有时，我们需要在应用程序中访问证书文件中的CN值。</p><p>在本教程中，我们将学习<strong>在Java中提取CN值的不同方法</strong>。</p><h3 id="_2-通用名称" tabindex="-1"><a class="header-anchor" href="#_2-通用名称"><span>2. 通用名称</span></a></h3><p>证书包含了关于证书所有者的信息：有效期、证书用途、DN等。</p><p><strong>可分辨名称或DN本质上由一组名称-值对组成，名称包括国家（C）、组织（O）、组织单位（OU）、CN等</strong>。</p><p>一个DN看起来像这样：“<em>CN=Baeldung, L=Casablanca, ST=Morocco, C=MA</em>”。如示例所示，CN通常是网站的域名。</p><p>在Java中从X.509证书提取CN，我们可以执行以下操作：</p><ul><li>解析证书</li><li>获取其DN</li><li>解析DN以提取CN</li></ul><p>在接下来的部分中，我们将使用不同的库提取CN。</p><h3 id="_3-使用bouncycastle" tabindex="-1"><a class="header-anchor" href="#_3-使用bouncycastle"><span>3. 使用BouncyCastle</span></a></h3><p>BouncyCastle是一组API集合，用于密码学操作，它补充了Java默认的密码学扩展（JCE）。此外，它提供了一种简单的方法来获取证书信息。</p><h4 id="_3-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖"><span>3.1. Maven依赖</span></a></h4><p>让我们首先在_pom.xml_中声明_bouncycastle_依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.bouncycastle``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``bcpkix-jdk15on``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.70``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，让我们从我们的证书文件中获取一个_X509Certificate_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Security</span><span class="token punctuation">.</span><span class="token function">addProvider</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BouncyCastleProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">CertificateFactory</span> certificateFactory <span class="token operator">=</span> <span class="token class-name">CertificateFactory</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;X.509&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;BC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">X509Certificate</span> certificate <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">X509Certificate</span><span class="token punctuation">)</span> certificateFactory<span class="token punctuation">.</span><span class="token function">generateCertificate</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;src/main/resources/Baeldung.cer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_addProvider()_方法注册_BouncyCastleProvider_作为安全提供者。之后，我们使用_getInstance()_方法创建一个_CertificateFactory_对象。_getInstance()_方法接受两个参数——证书类型“<em>X.509</em>”和安全提供者“<em>BC</em>”。然后使用_certificateFactory_实例通过_generateCertificate()_方法生成_X509Certificate_对象。</p><p>接下来，让我们从_X509Certificate_对象中获取CN：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenUsingBouncyCastle_thenExtractCommonName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">X500Principal</span> principal <span class="token operator">=</span> certificate<span class="token punctuation">.</span><span class="token function">getSubjectX500Principal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">X500Name</span> x500Name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">X500Name</span><span class="token punctuation">(</span>principal<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">RDN</span><span class="token punctuation">[</span><span class="token punctuation">]</span> rdns <span class="token operator">=</span> x500Name<span class="token punctuation">.</span><span class="token function">getRDNs</span><span class="token punctuation">(</span><span class="token class-name">BCStyle</span><span class="token punctuation">.</span><span class="token constant">CN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token constant">RDN</span> rdn <span class="token operator">:</span> rdns<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token class-name">IETFUtils</span><span class="token punctuation">.</span><span class="token function">valueToString</span><span class="token punctuation">(</span>rdn<span class="token punctuation">.</span><span class="token function">getFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        names<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> commonName <span class="token operator">:</span> names<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> commonName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们使用_getSubjectX500Principal()_方法以_X500Principal_格式检索主题DN。然后，我们将该DN转换为BouncyCastle的_X500Name_表示。之后，我们通过_getRDNs()_方法从_X500Name_对象中提取CN。</p><p><em>RDN_是BouncyCastle的一个类，表示_X.500Name_对象的单个部分。一个_X.500Name_对象由几个RDN组成，每个RDN由一个属性类型和属性值组成。最后，我们使用_BCStyle.CN</em>，这是BouncyCastle的CN属性类型的常量。</p><h3 id="_4-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_4-使用正则表达式"><span>4. 使用正则表达式</span></a></h3><p><strong>正则表达式（regex）是Java中字符串操作的强大工具。我们可以使用它从证书中提取CN</strong>。</p><p>让我们创建一个测试用例来提取CN：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenUsingRegex_thenExtractCommonName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">X500Principal</span> principal <span class="token operator">=</span> certificate<span class="token punctuation">.</span><span class="token function">getSubjectX500Principal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;CN=([^,]+)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>principal<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        names<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> commonName <span class="token operator">:</span> names<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> commonName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_Pattern_和_Matcher_类。我们首先通过调用其静态_compile()_方法并传递“<em>CN=([^,]+)</em>”模式来创建_Pattern_对象。然后，我们通过调用_Pattern_对象的_matcher()_方法并传递DN值来创建_Matcher_对象。最后，我们在_Matcher_对象中调用_find()_方法。</p><h3 id="_5-使用cryptacular库" tabindex="-1"><a class="header-anchor" href="#_5-使用cryptacular库"><span>5. 使用Cryptacular库</span></a></h3><p><strong>从证书中获取CN值的另一种方法是使用Cryptacular库</strong>。</p><h4 id="_5-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_5-1-maven依赖"><span>5.1. Maven依赖</span></a></h4><p>让我们在_pom.xml_中声明_cryptacular_依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.cryptacular``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``cryptacular``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.2.6``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们创建一个测试用例，使用_CertUtil_类来提取CN：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenUsingCryptacular_thenExtractCommonName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> commonName <span class="token operator">=</span> <span class="token class-name">CertUtil</span><span class="token punctuation">.</span><span class="token function">subjectCN</span><span class="token punctuation">(</span>certificate<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> commonName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_subjectCN()_方法从_X509Certificate_对象中提取CN。</p><p>我们还应该注意，<strong>当证书有多个CN时，这个库只返回一个CN</strong>。</p><h3 id="_6-使用ldap-api" tabindex="-1"><a class="header-anchor" href="#_6-使用ldap-api"><span>6. 使用LDAP API</span></a></h3><p><strong>我们还可以使用JDK的标准LDAP API来实现相同的目标</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">whenUsingLDAPAPI_thenExtractCommonName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">X500Principal</span> principal <span class="token operator">=</span> certificate<span class="token punctuation">.</span><span class="token function">getSubjectX500Principal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">LdapName</span> ldapDN <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LdapName</span><span class="token punctuation">(</span>principal<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>``` names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Rdn</span> rdn <span class="token operator">:</span> ldapDN<span class="token punctuation">.</span><span class="token function">getRdns</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>rdn<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">&quot;cn&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">String</span> name <span class="token operator">=</span> rdn<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            names<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> commonName <span class="token operator">:</span> names<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> commonName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码处理了在LDAP上下文中从X.509证书解析DN。我们从DN的字符串表示构建_LdapName_对象。这是一种将DN从X.509证书的上下文转换为LDAP上下文的方法。</p><p><strong>一旦我们有了_LdapName_的实例，我们就可以很容易地使用_getRdns()_方法将其拆分为其各个组成部分（如CN、OU、O等）</strong>。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>CN是证书非常重要的一部分。在SSL/TLS证书的上下文中，CN用于指示与证书关联的域名。</p><p>在本文中，我们学习了如何使用几种方法从证书文件中提取CN值。</p><p>如常，代码示例可以在GitHub上找到。</p>',45),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-06-30-Extract CN From X509 Certificate in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Extract%20CN%20From%20X509%20Certificate%20in%20Java.html","title":"在Java中从X509证书提取通用名称","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Security"],"tag":["X509","Certificate","Common Name"],"head":[["meta",{"name":"keywords","content":"Java, X509, Certificate, Common Name Extraction"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Extract%20CN%20From%20X509%20Certificate%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从X509证书提取通用名称"}],["meta",{"property":"og:description","content":"在Java中从X509证书提取通用名称 通用名称（CN）是X.509证书中的可分辨名称（DN）字段内的一个属性。CN通常是证书所属组织的域名。有时，我们需要在应用程序中访问证书文件中的CN值。 在本教程中，我们将学习在Java中提取CN值的不同方法。 2. 通用名称 证书包含了关于证书所有者的信息：有效期、证书用途、DN等。 可分辨名称或DN本质上由一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T19:53:57.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"X509"}],["meta",{"property":"article:tag","content":"Certificate"}],["meta",{"property":"article:tag","content":"Common Name"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T19:53:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从X509证书提取通用名称\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T19:53:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从X509证书提取通用名称 通用名称（CN）是X.509证书中的可分辨名称（DN）字段内的一个属性。CN通常是证书所属组织的域名。有时，我们需要在应用程序中访问证书文件中的CN值。 在本教程中，我们将学习在Java中提取CN值的不同方法。 2. 通用名称 证书包含了关于证书所有者的信息：有效期、证书用途、DN等。 可分辨名称或DN本质上由一..."},"headers":[{"level":3,"title":"2. 通用名称","slug":"_2-通用名称","link":"#_2-通用名称","children":[]},{"level":3,"title":"3. 使用BouncyCastle","slug":"_3-使用bouncycastle","link":"#_3-使用bouncycastle","children":[]},{"level":3,"title":"4. 使用正则表达式","slug":"_4-使用正则表达式","link":"#_4-使用正则表达式","children":[]},{"level":3,"title":"5. 使用Cryptacular库","slug":"_5-使用cryptacular库","link":"#_5-使用cryptacular库","children":[]},{"level":3,"title":"6. 使用LDAP API","slug":"_6-使用ldap-api","link":"#_6-使用ldap-api","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719777237000,"updatedTime":1719777237000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.93,"words":1180},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Extract CN From X509 Certificate in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p><strong>通用名称（CN）是X.509证书中的可分辨名称（DN）字段内的一个属性</strong>。CN通常是证书所属组织的域名。有时，我们需要在应用程序中访问证书文件中的CN值。</p>\\n<p>在本教程中，我们将学习<strong>在Java中提取CN值的不同方法</strong>。</p>\\n<h3>2. 通用名称</h3>\\n<p>证书包含了关于证书所有者的信息：有效期、证书用途、DN等。</p>\\n<p><strong>可分辨名称或DN本质上由一组名称-值对组成，名称包括国家（C）、组织（O）、组织单位（OU）、CN等</strong>。</p>\\n<p>一个DN看起来像这样：“<em>CN=Baeldung, L=Casablanca, ST=Morocco, C=MA</em>”。如示例所示，CN通常是网站的域名。</p>","autoDesc":true}');export{k as comp,d as data};
