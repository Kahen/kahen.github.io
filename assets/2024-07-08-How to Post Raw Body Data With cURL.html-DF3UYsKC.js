import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as t,a as n}from"./app-8nJ1rqSf.js";const s={},i=n(`<hr><h1 id="如何使用curl发送原始正文数据" tabindex="-1"><a class="header-anchor" href="#如何使用curl发送原始正文数据"><span>如何使用cURL发送原始正文数据</span></a></h1><p>客户端URL（cURL）是Linux中的一个命令行实用程序，支持通过多种协议（包括HTTP和HTTPS）在客户端和服务器之间进行数据交换。在本教程中，<strong>我们将学习如何使用cURL通过POST请求发送原始正文数据</strong>。</p><h2 id="_2-理解-data-和-data-raw" tabindex="-1"><a class="header-anchor" href="#_2-理解-data-和-data-raw"><span>2. 理解 --data 和 --data-raw</span></a></h2><p>cURL命令支持使用 --data 和 --data-raw 选项通过POST请求传输数据。在本节中，让我们了解使用这些选项的cURL的默认行为。</p><p>首先，我们需要一个服务器端点，该端点将接受我们作为客户端发起的请求。因此，<strong>让我们访问webhook.site并获取服务器端点</strong>：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>https://webhook.site/5610141b-bd31-4940-9a83-1db44ff2283e
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们为了可重用性目的，用这个端点初始化变量website：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token assign-left variable">website</span><span class="token operator">=</span><span class="token string">&quot;https://webhook.site/5610141b-bd31-4940-9a83-1db44ff2283e&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们<strong>使用带有 --data 和 --data-raw 选项的cURL命令通过POST请求发送文本</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">--data</span> <span class="token string">&quot;simple_body&quot;</span> --trace-ascii website-data.log <span class="token string">&quot;<span class="token variable">$website</span>&quot;</span>
$ <span class="token function">curl</span> --data-raw <span class="token string">&quot;simple_body&quot;</span> --trace-ascii website-data-raw.log <span class="token string">&quot;<span class="token variable">$website</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们必须注意，我们使用了 --trace-ascii 选项来追踪请求，并将追踪日志捕获在website-data.log和website-data-raw.log文件中。</p><p>继续进一步，让我们通过在捕获的追踪日志上执行grep来检查Content-Type头的值：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">grep</span> --max-count<span class="token operator">=</span><span class="token number">1</span> Content-Type website-data-raw.log website-data.log
website-data-raw.log:0083: Content-Type: application/x-www-form-urlencoded
website-data.log:0083: Content-Type: application/x-www-form-urlencoded
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以推断，即使我们在原始请求中没有指定Content-Type，cURL将其设置为默认值application/x-www-form-urlencoded。因此，请求没有将文本“simple_body”作为原始数据发送，而是作为表单数据发送。</p><p>最后，让我们通过webhook.site页面直观地确认这一点：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/curl-requests-inspection-1024x167.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以注意到“simple_body”作为键出现在“表单值”部分，其值为空。</p><h2 id="_3-定义-content-type-头" tabindex="-1"><a class="header-anchor" href="#_3-定义-content-type-头"><span>3. 定义 Content-Type 头</span></a></h2><p>在这一部分，<strong>我们将使用 --header 选项显式设置 Content-Type 头</strong>，这样cURL就不会默认选择了。</p><p>让我们继续使用相同的内容进行cURL请求，但使用正确的头：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">--header</span> <span class="token string">&quot;Content-Type: text/plain&quot;</span> <span class="token parameter variable">--data</span> <span class="token string">&quot;simple_body&quot;</span> --trace-ascii website-data.log <span class="token string">&quot;<span class="token variable">$website</span>&quot;</span>
$ <span class="token function">curl</span> <span class="token parameter variable">--header</span> <span class="token string">&quot;Content-Type: text/plain&quot;</span> --data-raw <span class="token string">&quot;simple_body&quot;</span> --trace-ascii website-data-raw.log <span class="token string">&quot;<span class="token variable">$website</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，<strong>让我们检查请求头中的Content-Type值</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">grep</span> --max-count<span class="token operator">=</span><span class="token number">1</span> Content-Type website-data-raw.log website-data.log
website-data-raw.log:006f: Content-Type: text/plain
website-data.log:006f: Content-Type: text/plain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以注意到Content-Type头是正确的。此外，我们将看到我们使用了grep与--max-count=1来限制输出结果到请求头。</p><p>最后，让我们也通过访问webhook.site页面来直观地确认：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/curl-requests-inspection-headers-1024x225.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以看到原始文本出现在“原始内容”部分，而“表单值”部分现在是空的。</p><h2 id="_4-从文件发送内容" tabindex="-1"><a class="header-anchor" href="#_4-从文件发送内容"><span>4. 从文件发送内容</span></a></h2><p>有时，请求正文可能包含大量文本，建议我们直接从文件发送内容。</p><p>首先，让我们将内容存储在content.txt文件中：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;simple_body&quot;</span> <span class="token operator">&gt;</span> content.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们必须注意，我们为了简单起见在文件中添加了简短的文本，相同的方法适用于更大的文件。</p><p>接下来，我们需要理解<strong>cURL支持使用 --data 选项通过 @file 符号发送原始文本，而不是使用 --data-raw 选项</strong>。所以让我们继续使用带有@file符号的 --data 选项进行cURL请求：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">--header</span> <span class="token string">&quot;Content-Type: plain/text&quot;</span> <span class="token parameter variable">--data</span> @content.txt --trace-ascii website-data.log <span class="token string">&quot;<span class="token variable">$website</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进一步，让我们通过检查website-data.log追踪文件中的请求正文来验证：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">grep</span> <span class="token parameter variable">-B1</span> <span class="token parameter variable">-i</span> simple_body website-data.log
<span class="token operator">=</span><span class="token operator">&gt;</span> Send data, <span class="token number">11</span> bytes <span class="token punctuation">(</span>0xb<span class="token punctuation">)</span>
0000: simple_body
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们也看看当我们使用 --data-raw 选项与@file时会发生什么：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">--header</span> <span class="token string">&quot;Content-Type: plain/text&quot;</span> --data-raw @content.txt --trace-ascii website-data-raw.log <span class="token string">&quot;<span class="token variable">$website</span>&quot;</span>
$ <span class="token function">grep</span> <span class="token parameter variable">-B1</span> <span class="token parameter variable">-i</span> content.txt website-data-raw.log
<span class="token operator">=</span><span class="token operator">&gt;</span> Send data, <span class="token number">12</span> bytes <span class="token punctuation">(</span>0xc<span class="token punctuation">)</span>
0000: @content.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以注意到这次，cURL没有理解它需要从content.txt文件中获取内容。相反，它将文本“@content.txt”作为请求正文发送了。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，<strong>我们学习了如何使用cURL命令通过POST请求发送原始正文内容</strong>。此外，我们还学习了如何使用文件发送大型内容。</p>`,42),o=[i];function p(l,r){return t(),e("div",null,o)}const u=a(s,[["render",p],["__file","2024-07-08-How to Post Raw Body Data With cURL.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-How%20to%20Post%20Raw%20Body%20Data%20With%20cURL.html","title":"如何使用cURL发送原始正文数据","lang":"zh-CN","frontmatter":{"date":"2023-02-01T00:00:00.000Z","category":["cURL","HTTP"],"tag":["cURL","POST请求","原始数据"],"head":[["meta",{"name":"keywords","content":"cURL, POST请求, 原始数据, HTTP, 数据传输"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-How%20to%20Post%20Raw%20Body%20Data%20With%20cURL.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用cURL发送原始正文数据"}],["meta",{"property":"og:description","content":"如何使用cURL发送原始正文数据 客户端URL（cURL）是Linux中的一个命令行实用程序，支持通过多种协议（包括HTTP和HTTPS）在客户端和服务器之间进行数据交换。在本教程中，我们将学习如何使用cURL通过POST请求发送原始正文数据。 2. 理解 --data 和 --data-raw cURL命令支持使用 --data 和 --data-r..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/02/curl-requests-inspection-1024x167.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T23:35:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"cURL"}],["meta",{"property":"article:tag","content":"POST请求"}],["meta",{"property":"article:tag","content":"原始数据"}],["meta",{"property":"article:published_time","content":"2023-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T23:35:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用cURL发送原始正文数据\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/02/curl-requests-inspection-1024x167.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/curl-requests-inspection-headers-1024x225.png\\"],\\"datePublished\\":\\"2023-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T23:35:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用cURL发送原始正文数据 客户端URL（cURL）是Linux中的一个命令行实用程序，支持通过多种协议（包括HTTP和HTTPS）在客户端和服务器之间进行数据交换。在本教程中，我们将学习如何使用cURL通过POST请求发送原始正文数据。 2. 理解 --data 和 --data-raw cURL命令支持使用 --data 和 --data-r..."},"headers":[{"level":2,"title":"2. 理解 --data 和 --data-raw","slug":"_2-理解-data-和-data-raw","link":"#_2-理解-data-和-data-raw","children":[]},{"level":2,"title":"3. 定义 Content-Type 头","slug":"_3-定义-content-type-头","link":"#_3-定义-content-type-头","children":[]},{"level":2,"title":"4. 从文件发送内容","slug":"_4-从文件发送内容","link":"#_4-从文件发送内容","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720481724000,"updatedTime":1720481724000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.66,"words":1098},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-How to Post Raw Body Data With cURL.md","localizedDate":"2023年2月1日","excerpt":"<hr>\\n<h1>如何使用cURL发送原始正文数据</h1>\\n<p>客户端URL（cURL）是Linux中的一个命令行实用程序，支持通过多种协议（包括HTTP和HTTPS）在客户端和服务器之间进行数据交换。在本教程中，<strong>我们将学习如何使用cURL通过POST请求发送原始正文数据</strong>。</p>\\n<h2>2. 理解 --data 和 --data-raw</h2>\\n<p>cURL命令支持使用 --data 和 --data-raw 选项通过POST请求传输数据。在本节中，让我们了解使用这些选项的cURL的默认行为。</p>\\n<p>首先，我们需要一个服务器端点，该端点将接受我们作为客户端发起的请求。因此，<strong>让我们访问webhook.site并获取服务器端点</strong>：</p>","autoDesc":true}');export{u as comp,g as data};
