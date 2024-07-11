import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-uizvaz9h.js";const t={},p=s(`<h1 id="java中不抛出异常检查jwt过期" tabindex="-1"><a class="header-anchor" href="#java中不抛出异常检查jwt过期"><span>Java中不抛出异常检查JWT过期</span></a></h1><p>JSON Web Token（JWT）基本上是一个用于在网络上安全传输信息的JSON对象。这些信息可以被验证和信任，因为它是数字签名的。</p><p>在本教程中，我们首先将看看验证JWT和解码JWT之间的区别。然后，我们将学习如何在Java中不抛出任何异常地检查JWT的过期。</p><h2 id="_2-验证和解码jwt之间的区别" tabindex="-1"><a class="header-anchor" href="#_2-验证和解码jwt之间的区别"><span>2. 验证和解码JWT之间的区别</span></a></h2><p>在我们开始研究如何检查JWT的过期之前，让我们首先了解一些基础知识。</p><p>我们知道，JWT在其紧凑形式中是一个Base64编码的字符串，包含三个部分：头部、负载和签名。任何访问JWT的人都很容易解码它并查看其内容。因此，要信任一个令牌，我们必须验证JWT中包含的签名。</p><p>有各种Java JWT库可用于创建和管理JWT。我们将使用Auth0 JWT Java库作为我们的代码示例。这是一个易于使用的库，用于创建和管理JWT。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>要开始，我们将Auth0 Java JWT库的Maven依赖项添加到我们的项目的_pom.xml_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.auth0\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`java-jwt\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`4.2.1\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们了解解码和验证JWT之间的区别。</p><h3 id="_2-2-解码jwt" tabindex="-1"><a class="header-anchor" href="#_2-2-解码jwt"><span>2.2. 解码JWT</span></a></h3><p>我们可以通过简单地Base64解码JWT的各个部分来解码JWT。解码JWT返回未验证JWT签名的解码负载。这种操作不建议用于任何不受信任的消息，仅用于查看JWT内容。</p><p>**要解码JWT，我们使用_JWT.decode(String)_方法。**这个方法解析JWT并返回一个_DecodedJWT_实例。</p><p><em>DecodedJWT_实例提供了我们可以用来获取JWT中包含的数据的各种便利方法。如果JWT不是有效的Base64编码字符串，该方法会抛出一个_JWTDecodeException</em>。</p><p>让我们看看解码JWT的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">DecodedJWT</span> decodedJWT <span class="token operator">=</span> <span class="token constant">JWT</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>jwtString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> decodedJWT<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JWTDecodeException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们获得了_DecodedJWT_实例，我们可以使用它的各种getter方法来获取解码后的数据。</p><p>例如，要获取令牌的过期时间，我们使用_DecodedJWT.getExpiresAt()_方法。这个方法返回一个包含令牌过期时间的_java.util.Date_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Date</span> expiresAt <span class="token operator">=</span> decodedJWT<span class="token punctuation">.</span><span class="token function">getExpiresAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看看JWT验证操作。</p><h3 id="_2-3-验证jwt" tabindex="-1"><a class="header-anchor" href="#_2-3-验证jwt"><span>2.3. 验证JWT</span></a></h3><p>验证JWT确保包含的签名是有效的。可选地，它还检查过期时间、非有效时间、发行者、受众或JWT中包含的任何其他声明（如果JWT包含任何）。</p><p><strong>要验证JWT，我们使用_JWTVerifier.verify(String)_方法</strong>。验证操作在签名有效时也返回一个_DecodedJWT_实例。只有在签名和所有声明都有效时才返回解码的JWT。如果签名无效或任何声明验证失败，它会抛出一个_JWTVerificationException_。</p><p>让我们检查验证JWT的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">DecodedJWT</span> decodedJWT <span class="token operator">=</span> verifier<span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>jwtString<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JWTVerificationException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的代码片段中可以看出，如果JWT无效，_verify()_方法会抛出异常。由于该方法在验证后还对令牌进行解码，因此它提供了一种更安全、更安全的方式来解码令牌。另一方面，_decode()_方法只是简单地解码提供的JWT令牌。因此，<strong>为了在不抛出任何异常的情况下验证令牌的过期时间，我们使用_JWT.decode()_方法</strong>。</p><h2 id="_3-检查jwt过期" tabindex="-1"><a class="header-anchor" href="#_3-检查jwt过期"><span>3. 检查JWT过期</span></a></h2><p>要简单地读取JWT中包含的数据，我们可以解码JWT并解析数据。让我们看看Java代码，检查JWT是否已过期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">isJWTExpired</span><span class="token punctuation">(</span><span class="token class-name">DecodedJWT</span> decodedJWT<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Date</span> expiresAt <span class="token operator">=</span> decodedJWT<span class="token punctuation">.</span><span class="token function">getExpiresAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> expiresAt<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如前面提到的，我们使用_DecodedJWT.getExpiresAt()_方法来获取JWT的过期时间。然后我们将过期时间与当前时间进行匹配，以检查令牌是否已过期。</p><p><strong>_JWT.decode()_方法和_JWTVerifier.verify()_方法都返回一个_DecodedJWT_实例</strong>。唯一的区别是，_verify()_方法还检查签名的有效性，并在无效时返回异常。因此，<strong>我们只能对可信消息使用_decode()_方法</strong>。**对于任何不可信的消息，我们应该始终使用_verify()_方法，**这确保了有效的签名和JWT中的任何其他声明。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们首先查看了JWT解码和JWT验证操作之间的区别。</p><p>然后，我们查看了如何使用解码操作在不抛出任何异常的情况下检查JWT的过期。</p><p>如常，所有示例的完整代码可在GitHub上找到。</p>`,36),i=[p];function o(c,l){return e(),n("div",null,i)}const u=a(t,[["render",o],["__file","2024-07-11-Check JWT Expiry Without Throwing Exceptions.html.vue"]]),J=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Check%20JWT%20Expiry%20Without%20Throwing%20Exceptions.html","title":"Java中不抛出异常检查JWT过期","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JWT"],"tag":["Java","JWT","Expiry"],"head":[["meta",{"name":"keywords","content":"Java, JWT, Expiry, Security"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Check%20JWT%20Expiry%20Without%20Throwing%20Exceptions.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中不抛出异常检查JWT过期"}],["meta",{"property":"og:description","content":"Java中不抛出异常检查JWT过期 JSON Web Token（JWT）基本上是一个用于在网络上安全传输信息的JSON对象。这些信息可以被验证和信任，因为它是数字签名的。 在本教程中，我们首先将看看验证JWT和解码JWT之间的区别。然后，我们将学习如何在Java中不抛出任何异常地检查JWT的过期。 2. 验证和解码JWT之间的区别 在我们开始研究如何..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T05:02:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JWT"}],["meta",{"property":"article:tag","content":"Expiry"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T05:02:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中不抛出异常检查JWT过期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T05:02:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中不抛出异常检查JWT过期 JSON Web Token（JWT）基本上是一个用于在网络上安全传输信息的JSON对象。这些信息可以被验证和信任，因为它是数字签名的。 在本教程中，我们首先将看看验证JWT和解码JWT之间的区别。然后，我们将学习如何在Java中不抛出任何异常地检查JWT的过期。 2. 验证和解码JWT之间的区别 在我们开始研究如何..."},"headers":[{"level":2,"title":"2. 验证和解码JWT之间的区别","slug":"_2-验证和解码jwt之间的区别","link":"#_2-验证和解码jwt之间的区别","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 解码JWT","slug":"_2-2-解码jwt","link":"#_2-2-解码jwt","children":[]},{"level":3,"title":"2.3. 验证JWT","slug":"_2-3-验证jwt","link":"#_2-3-验证jwt","children":[]}]},{"level":2,"title":"3. 检查JWT过期","slug":"_3-检查jwt过期","link":"#_3-检查jwt过期","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720674128000,"updatedTime":1720674128000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.96,"words":1188},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Check JWT Expiry Without Throwing Exceptions.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>JSON Web Token（JWT）基本上是一个用于在网络上安全传输信息的JSON对象。这些信息可以被验证和信任，因为它是数字签名的。</p>\\n<p>在本教程中，我们首先将看看验证JWT和解码JWT之间的区别。然后，我们将学习如何在Java中不抛出任何异常地检查JWT的过期。</p>\\n<h2>2. 验证和解码JWT之间的区别</h2>\\n<p>在我们开始研究如何检查JWT的过期之前，让我们首先了解一些基础知识。</p>\\n<p>我们知道，JWT在其紧凑形式中是一个Base64编码的字符串，包含三个部分：头部、负载和签名。任何访问JWT的人都很容易解码它并查看其内容。因此，要信任一个令牌，我们必须验证JWT中包含的签名。</p>","autoDesc":true}');export{u as comp,J as data};
