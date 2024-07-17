import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-YddbDb53.js";const e={},p=t(`<h1 id="kotlin-aes-加密与解密" tabindex="-1"><a class="header-anchor" href="#kotlin-aes-加密与解密"><span>Kotlin AES 加密与解密</span></a></h1><p>加密是现代数据安全的基础，保护信息免受未授权访问。在众多加密标准中，由于其效率、简单性和强大的安全性的平衡，高级加密标准（AES）脱颖而出。它以128位固定大小的数据块进行操作，并支持128、192或256位的密钥大小，使其适用于各种安全需求。</p><p>在本教程中，我们将涵盖AES的基础知识，为AES加密和解密设置Kotlin项目，并最终演示如何在简单的Kotlin应用程序中使用这些实现。</p><p>AES因其在软件和硬件实现中的高效率而受到赞誉。它的设计简单性，加上强大的安全特性，推动了其在全球众多安全协议和系统中的广泛采用。</p><p><strong>作为对称加密算法，AES使用相同的密钥进行加密和解密</strong>。这促进了在各种应用中安全数据交换。</p><p>让我们看看AES的一些<strong>关键特性</strong>：</p><ul><li>块密码：以128位的固定块大小操作</li><li>对称密钥：加密和解密使用相同的密钥</li><li>安全性：提供强大的安全性，抵御各种密码学攻击</li><li>灵活性：支持128、192或256位的密钥大小</li></ul><h3 id="实现aes加密和解密" tabindex="-1"><a class="header-anchor" href="#实现aes加密和解密"><span>实现AES加密和解密</span></a></h3><p>让我们了解如何生成AES密钥，并使用它来加密或解密数据。</p><h4 id="_3-1-生成aes密钥" tabindex="-1"><a class="header-anchor" href="#_3-1-生成aes密钥"><span>3.1. 生成AES密钥</span></a></h4><p>首先，我们需要生成一个对称的AES密钥。我们可以使用_javax.crypto_中的_KeyGenerator_类来实现这一目的：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">generateAESKey</span><span class="token punctuation">(</span>keySize<span class="token operator">:</span> Int <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">)</span><span class="token operator">:</span> SecretKey <span class="token punctuation">{</span>
    <span class="token keyword">val</span> keyGenerator <span class="token operator">=</span> KeyGenerator<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;AES&quot;</span></span><span class="token punctuation">)</span>
    keyGenerator<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>keySize<span class="token punctuation">)</span>
    <span class="token keyword">return</span> keyGenerator<span class="token punctuation">.</span><span class="token function">generateKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们如何<strong>调整_keySize_参数以满足我们的需求</strong>（如果需要）。</p><h4 id="_3-2-aes加密" tabindex="-1"><a class="header-anchor" href="#_3-2-aes加密"><span>3.2. AES加密</span></a></h4><p>在AES加密/解密中，“AES/CBC/PKCS5Padding”字符串指定了算法、操作模式和填充方案。CBC（密码块链接）模式使用初始化向量（IV）增加安全性，而PKCS5Padding确保最后一个块正确填充。</p><p>让我们使用_Cipher_类实现我们的加密逻辑：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">aesEncrypt</span><span class="token punctuation">(</span><span class="token keyword">data</span><span class="token operator">:</span> ByteArray<span class="token punctuation">,</span> secretKey<span class="token operator">:</span> SecretKey<span class="token punctuation">)</span><span class="token operator">:</span> ByteArray <span class="token punctuation">{</span>
    <span class="token keyword">val</span> cipher <span class="token operator">=</span> Cipher<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;AES/CBC/PKCS5Padding&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> ivParameterSpec <span class="token operator">=</span> <span class="token function">IvParameterSpec</span><span class="token punctuation">(</span><span class="token function">ByteArray</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 在生产中使用安全的IV</span>
    cipher<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>Cipher<span class="token punctuation">.</span>ENCRYPT_MODE<span class="token punctuation">,</span> secretKey<span class="token punctuation">,</span> ivParameterSpec<span class="token punctuation">)</span>
    <span class="token keyword">return</span> cipher<span class="token punctuation">.</span><span class="token function">doFinal</span><span class="token punctuation">(</span><span class="token keyword">data</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应该为每次加密操作随机生成一个安全的初始化向量（IV），以增强安全性。它也<strong>很重要，我们需要存储这个IV，因为它需要与解密逻辑共享</strong>。最后，_doFinal()_执行加密或解密操作。</p><h4 id="_3-3-aes解密" tabindex="-1"><a class="header-anchor" href="#_3-3-aes解密"><span>3.3. AES解密</span></a></h4><p>加密之后，让我们实现解密逻辑：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">aesDecrypt</span><span class="token punctuation">(</span>encryptedData<span class="token operator">:</span> ByteArray<span class="token punctuation">,</span> secretKey<span class="token operator">:</span> SecretKey<span class="token punctuation">)</span><span class="token operator">:</span> ByteArray <span class="token punctuation">{</span>
    <span class="token keyword">val</span> cipher <span class="token operator">=</span> Cipher<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;AES/CBC/PKCS5Padding&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> ivParameterSpec <span class="token operator">=</span> <span class="token function">IvParameterSpec</span><span class="token punctuation">(</span><span class="token function">ByteArray</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 使用加密时相同的IV</span>
    cipher<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>Cipher<span class="token punctuation">.</span>DECRYPT_MODE<span class="token punctuation">,</span> secretKey<span class="token punctuation">,</span> ivParameterSpec<span class="token punctuation">)</span>
    <span class="token keyword">return</span> cipher<span class="token punctuation">.</span><span class="token function">doFinal</span><span class="token punctuation">(</span>encryptedData<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数展示了如何逆转加密过程以检索原始数据。通过使用与加密相同的IV初始化_Cipher_对象为_DECRYPT_MODE_，我们确保了解密过程的完整性，使得能够安全地从加密字节中检索原始信息。</p><p><strong>这一步对于验证AES的对称性至关重要，其中相同的密钥在加密和解密加密数据中起着关键作用</strong>。</p><h3 id="_4-单元测试aes加密和解密" tabindex="-1"><a class="header-anchor" href="#_4-单元测试aes加密和解密"><span>4. 单元测试AES加密和解密</span></a></h3><p>我们将编写一个JUnit测试用例，它将加密然后解密一段文本，断言解密后的文本与原始文本匹配：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Test</span>
<span class="token keyword">fun</span> <span class="token function">\`Given text when encrypted and decrypted should return original text\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> originalText <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;Hello Kotlin AES Encryption!&quot;</span></span>
    <span class="token keyword">val</span> secretKey <span class="token operator">=</span> <span class="token function">generateAESKey</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> encryptedData <span class="token operator">=</span> <span class="token function">aesEncrypt</span><span class="token punctuation">(</span>originalText<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> secretKey<span class="token punctuation">)</span>
    <span class="token keyword">val</span> decryptedData <span class="token operator">=</span> <span class="token function">aesDecrypt</span><span class="token punctuation">(</span>encryptedData<span class="token punctuation">,</span> secretKey<span class="token punctuation">)</span>
    <span class="token keyword">val</span> decryptedText <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>decryptedData<span class="token punctuation">)</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>originalText<span class="token punctuation">,</span> decryptedText<span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;The decrypted text does not match the original&quot;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行此测试将验证AES加密和解密过程。<strong>此测试还展示了AES的对称性</strong>，意味着用于加密消息的相同密钥也可以解密它。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们探索了Kotlin中的AES加密和解密。我们涵盖了AES的基础知识，如何为密码学操作设置Kotlin项目，并实现了AES加密和解密。我们还通过一个简单的JUnit测试示例演示了这些实现，该示例加密和解密文本。</p><p>在生产应用程序中实现AES时，关键是要安全地管理密钥，使用安全的IV，并遵守密码学安全的最佳实践。如常，本文中使用的代码可在GitHub上获得。</p><p><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e6eb6cf88484314104912372deb68199?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg" alt="img" loading="lazy"><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg" alt="img" loading="lazy"></p><p>OK</p>`,32),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-08-Kotlin AES Encryption and Decryption.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Kotlin%20AES%20Encryption%20and%20Decryption.html","title":"Kotlin AES 加密与解密","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Encryption"],"tag":["AES","Encryption","Decryption"],"head":[["meta",{"name":"keywords","content":"Kotlin, AES, Encryption, Decryption, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Kotlin%20AES%20Encryption%20and%20Decryption.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin AES 加密与解密"}],["meta",{"property":"og:description","content":"Kotlin AES 加密与解密 加密是现代数据安全的基础，保护信息免受未授权访问。在众多加密标准中，由于其效率、简单性和强大的安全性的平衡，高级加密标准（AES）脱颖而出。它以128位固定大小的数据块进行操作，并支持128、192或256位的密钥大小，使其适用于各种安全需求。 在本教程中，我们将涵盖AES的基础知识，为AES加密和解密设置Kotlin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T19:59:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"AES"}],["meta",{"property":"article:tag","content":"Encryption"}],["meta",{"property":"article:tag","content":"Decryption"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T19:59:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin AES 加密与解密\\",\\"image\\":[\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png\\",\\"https://secure.gravatar.com/avatar/e6eb6cf88484314104912372deb68199?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg\\",\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T19:59:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin AES 加密与解密 加密是现代数据安全的基础，保护信息免受未授权访问。在众多加密标准中，由于其效率、简单性和强大的安全性的平衡，高级加密标准（AES）脱颖而出。它以128位固定大小的数据块进行操作，并支持128、192或256位的密钥大小，使其适用于各种安全需求。 在本教程中，我们将涵盖AES的基础知识，为AES加密和解密设置Kotlin..."},"headers":[{"level":3,"title":"实现AES加密和解密","slug":"实现aes加密和解密","link":"#实现aes加密和解密","children":[]},{"level":3,"title":"4. 单元测试AES加密和解密","slug":"_4-单元测试aes加密和解密","link":"#_4-单元测试aes加密和解密","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720468791000,"updatedTime":1720468791000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1133},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Kotlin AES Encryption and Decryption.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>加密是现代数据安全的基础，保护信息免受未授权访问。在众多加密标准中，由于其效率、简单性和强大的安全性的平衡，高级加密标准（AES）脱颖而出。它以128位固定大小的数据块进行操作，并支持128、192或256位的密钥大小，使其适用于各种安全需求。</p>\\n<p>在本教程中，我们将涵盖AES的基础知识，为AES加密和解密设置Kotlin项目，并最终演示如何在简单的Kotlin应用程序中使用这些实现。</p>\\n<p>AES因其在软件和硬件实现中的高效率而受到赞誉。它的设计简单性，加上强大的安全特性，推动了其在全球众多安全协议和系统中的广泛采用。</p>\\n<p><strong>作为对称加密算法，AES使用相同的密钥进行加密和解密</strong>。这促进了在各种应用中安全数据交换。</p>","autoDesc":true}');export{d as comp,k as data};
