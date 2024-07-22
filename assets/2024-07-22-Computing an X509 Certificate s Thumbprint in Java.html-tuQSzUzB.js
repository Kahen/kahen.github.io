import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-BMOUrRO4.js";const e={},p=t(`<hr><h1 id="在java中计算x509证书的指纹" tabindex="-1"><a class="header-anchor" href="#在java中计算x509证书的指纹"><span>在Java中计算X509证书的指纹</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>证书的**指纹（或称哈希值）**是证书的唯一标识符。它不是证书的一部分，而是从证书中计算得出的。</p><p>在这个简短的教程中，我们将看到如何在Java中计算X509证书的指纹。</p><h2 id="_2-使用纯java" tabindex="-1"><a class="header-anchor" href="#_2-使用纯java"><span>2. 使用纯Java</span></a></h2><p>首先，让我们从我们的证书文件中获取一个_X509Certificate_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">X509Certificate</span> <span class="token function">getCertObject</span><span class="token punctuation">(</span><span class="token class-name">String</span> filePath<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">CertificateException</span> <span class="token punctuation">{</span>
     <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> is <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">CertificateFactory</span> certificateFactory <span class="token operator">=</span> <span class="token class-name">CertificateFactory</span>
          <span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;X.509&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">X509Certificate</span><span class="token punctuation">)</span> certificateFactory<span class="token punctuation">.</span><span class="token function">generateCertificate</span><span class="token punctuation">(</span>is<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们从这个对象中获取指纹：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getThumbprint</span><span class="token punctuation">(</span><span class="token class-name">X509Certificate</span> cert<span class="token punctuation">)</span>
  <span class="token keyword">throws</span> <span class="token class-name">NoSuchAlgorithmException</span><span class="token punctuation">,</span> <span class="token class-name">CertificateEncodingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">MessageDigest</span> md <span class="token operator">=</span> <span class="token class-name">MessageDigest</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;SHA-1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    md<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>cert<span class="token punctuation">.</span><span class="token function">getEncoded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">DatatypeConverter</span><span class="token punctuation">.</span><span class="token function">printHexBinary</span><span class="token punctuation">(</span>md<span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，如果我们有一个名为_baeldung.pem_的X509证书文件，我们可以使用上述方法轻松打印其指纹：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">X509Certificate</span> certObject <span class="token operator">=</span> <span class="token function">getCertObject</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung.pem&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">getThumbprint</span><span class="token punctuation">(</span>certObject<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>结果将类似于：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>c9fa9f008655c8401ad27e213b985804854d928c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用apache-commons-codec" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-codec"><span>3. 使用Apache Commons Codec</span></a></h2><p>我们还可以使用Apache Commons Codec库中的_DigestUtils_类来实现相同的目标。</p><p>让我们在我们的_pom.xml_文件中添加一个依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`commons-codec\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`commons-codec\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.15\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们只需使用_sha1Hex()_方法从我们的_X509Certificate_对象中获取指纹：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DigestUtils</span><span class="token punctuation">.</span><span class="token function">sha1Hex</span><span class="token punctuation">(</span>certObject<span class="token punctuation">.</span><span class="token function">getEncoded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这个快速教程中，我们学习了两种在Java中计算X509证书指纹的方法。</p><p>正如往常一样，本文的示例代码可以在GitHub上找到。</p>`,23),c=[p];function o(i,l){return s(),n("div",null,c)}const d=a(e,[["render",o],["__file","2024-07-22-Computing an X509 Certificate s Thumbprint in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Computing%20an%20X509%20Certificate%20s%20Thumbprint%20in%20Java.html","title":"在Java中计算X509证书的指纹","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Security"],"tag":["X509","Certificate","Thumbprint"],"head":[["meta",{"name":"keywords","content":"Java, X509, Certificate, Thumbprint"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Computing%20an%20X509%20Certificate%20s%20Thumbprint%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中计算X509证书的指纹"}],["meta",{"property":"og:description","content":"在Java中计算X509证书的指纹 1. 概述 证书的**指纹（或称哈希值）**是证书的唯一标识符。它不是证书的一部分，而是从证书中计算得出的。 在这个简短的教程中，我们将看到如何在Java中计算X509证书的指纹。 2. 使用纯Java 首先，让我们从我们的证书文件中获取一个_X509Certificate_对象： 接下来，让我们从这个对象中获取指纹..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T08:42:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"X509"}],["meta",{"property":"article:tag","content":"Certificate"}],["meta",{"property":"article:tag","content":"Thumbprint"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T08:42:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中计算X509证书的指纹\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T08:42:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中计算X509证书的指纹 1. 概述 证书的**指纹（或称哈希值）**是证书的唯一标识符。它不是证书的一部分，而是从证书中计算得出的。 在这个简短的教程中，我们将看到如何在Java中计算X509证书的指纹。 2. 使用纯Java 首先，让我们从我们的证书文件中获取一个_X509Certificate_对象： 接下来，让我们从这个对象中获取指纹..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用纯Java","slug":"_2-使用纯java","link":"#_2-使用纯java","children":[]},{"level":2,"title":"3. 使用Apache Commons Codec","slug":"_3-使用apache-commons-codec","link":"#_3-使用apache-commons-codec","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721637722000,"updatedTime":1721637722000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.26,"words":377},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Computing an X509 Certificate s Thumbprint in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在Java中计算X509证书的指纹</h1>\\n<h2>1. 概述</h2>\\n<p>证书的**指纹（或称哈希值）**是证书的唯一标识符。它不是证书的一部分，而是从证书中计算得出的。</p>\\n<p>在这个简短的教程中，我们将看到如何在Java中计算X509证书的指纹。</p>\\n<h2>2. 使用纯Java</h2>\\n<p>首先，让我们从我们的证书文件中获取一个_X509Certificate_对象：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">X509Certificate</span> <span class=\\"token function\\">getCertObject</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> filePath<span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">IOException</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">CertificateException</span> <span class=\\"token punctuation\\">{</span>\\n     <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">FileInputStream</span> is <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">FileInputStream</span><span class=\\"token punctuation\\">(</span>filePath<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">CertificateFactory</span> certificateFactory <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">CertificateFactory</span>\\n          <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getInstance</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"X.509\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">X509Certificate</span><span class=\\"token punctuation\\">)</span> certificateFactory<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">generateCertificate</span><span class=\\"token punctuation\\">(</span>is<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n     <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
