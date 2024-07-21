import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a as t}from"./app-CgV6Nm7X.js";const l={},a=t(`<h1 id="httpie-命令行工具指南" tabindex="-1"><a class="header-anchor" href="#httpie-命令行工具指南"><span>HTTPie 命令行工具指南</span></a></h1><ol><li>概述</li></ol><p>在本教程中，我们将学习如何使用 HTTPie 命令行界面工具。</p><ol start="2"><li>HTTPie 是什么？</li></ol><p><strong>HTTPie 是一个用于与 HTTP 服务器和 API 交互的命令行 HTTP 客户端</strong>。此外，HTTPie 也可以用于测试和调试。 它还具有格式化和着色输出、直观的语法和内置的 JSON 支持。</p><ol start="3"><li>安装</li></ol><p>首先，我们需要安装它：</p><p>3.1. 在 Linux 上</p><p>我们可以使用 Snapcraft 在 Linux 上安装 HTTPie：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ sudo snap install httpie
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.2. 在 Windows 上</p><p>在 Windows 上安装，我们可以使用 Chocolatey：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ choco install httpie
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.3. 在 macOS 上</p><p>最后，在 macOS 上安装，我们可以使用 Homebrew：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ brew update
$ brew install httpie
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>使用方法</li></ol><p>我们应该按照以下通用模式调用 HTTPie：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http [flags] [METHOD] URL [ITEM [ITEM]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>https [flags] [METHOD] URL [ITEM [ITEM]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>示例</li></ol><p>让我们看一些例子：</p><p>5.1. Hello World</p><p>一个简单的 hello world GET 请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ https httpie.io/hello
HTTP/1.1 200 OK
Age: 0
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
...
{
    &quot;ahoy&quot;: [
        &quot;Hello, World! 👋 感谢您尝试 HTTPie 🥳&quot;,
        &quot;我们希望这将成为友谊。&quot;
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们得到响应头和正文作为输出。</p><p>5.2. 添加自定义 HTTP 方法、HTTP 头和正文</p><p>我们也可以指定方法并添加自定义项目到请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ http PUT httpbin.org/put X-API-Token:123 name=John
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
... 
Server: gunicorn/19.9.0

{
    &quot;args&quot;: {},
    ... 
    &quot;headers&quot;: {
        ... 
        &quot;X-Api-Token&quot;: &quot;123&quot;
    },
    &quot;json&quot;: {
        &quot;name&quot;: &quot;John&quot;
    },
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要澄清的是，<em>PUT</em> 是方法，<em>X-API-Token:123</em> 是自定义 HTTP 头，<em>name=john</em> 是自定义数据项。</p><p>5.3. 提交表单</p><p>我们也可以提交表单数据，如果我们添加 <em>-f</em> 标志：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ http -f POST httpbin.org/post hello=world
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
...
Server: gunicorn/19.9.0

{
    &quot;args&quot;: {},
    ... 
    &quot;form&quot;: {
        &quot;hello&quot;: &quot;world&quot;
    },
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到 HTTP 响应包含了我们指定的表单数据。</p><p>5.4. 输出请求</p><p>要同时输出请求和响应，我们可以添加 <em>-v</em>，代表详细输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ http -v httpbin.org/get
GET /get HTTP/1.1
Accept: */*
...
User-Agent: HTTPie/3.2.1

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
...
Server: gunicorn/19.9.0

{
    &quot;args&quot;: {},
    &quot;headers&quot;: {
        &quot;Accept&quot;: &quot;*/*&quot;,
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出包含请求和响应。</p><p>5.5. 上传文件</p><p>我们也可以将文件作为请求数据传递：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ http httpbin.org/post \`&lt; hello.json
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
... 
Server: gunicorn/19.9.0

{
    &quot;args&quot;: {},
    &quot;data&quot;: &quot;{\\&quot;ahoy\\&quot;:[\\&quot;Hello, World! 👋 感谢您尝试 HTTPie 🥳\\&quot;,\\&quot;我们希望这将成为友谊。...\\&quot;json\\&quot;: {
        &quot;ahoy&quot;: [
            &quot;Hello, World! 👋 感谢您尝试 HTTPie 🥳&quot;,
            &quot;我们希望这将成为友谊。&quot;
        ],
        &quot;links&quot;: {
        ...
        }
    },
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.6. 下载文件</p><p>我们可以下载文件并重定向输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ http httpbin.org/image/png &gt;\` image.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，我们也可以以 <em>wget</em> 风格下载文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ http --download httpbin.org/image/png
HTTP/1.1 200 OK
...
Server: gunicorn/19.9.0

Downloading to png.png
Done. 8.1 kB in 00:0.06310 (128.2 kB/s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>总结</li></ol><p>在本文中，我们学习了如何安装和使用 HTTPie 命令行工具。</p>`,49),d=[a];function s(r,o){return n(),i("div",null,d)}const c=e(l,[["render",s],["__file","2024-07-09-Guide to HTTPie for Terminal.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Guide%20to%20HTTPie%20for%20Terminal.html","title":"HTTPie 命令行工具指南","lang":"zh-CN","frontmatter":{"date":"2024-07-10T00:00:00.000Z","category":["HTTPie","命令行工具"],"tag":["HTTP客户端","API测试"],"head":[["meta",{"name":"keywords","content":"HTTPie, 命令行, HTTP客户端, API测试, 调试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Guide%20to%20HTTPie%20for%20Terminal.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"HTTPie 命令行工具指南"}],["meta",{"property":"og:description","content":"HTTPie 命令行工具指南 概述 在本教程中，我们将学习如何使用 HTTPie 命令行界面工具。 HTTPie 是什么？ HTTPie 是一个用于与 HTTP 服务器和 API 交互的命令行 HTTP 客户端。此外，HTTPie 也可以用于测试和调试。 它还具有格式化和着色输出、直观的语法和内置的 JSON 支持。 安装 首先，我们需要安装它： 3...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T20:00:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HTTP客户端"}],["meta",{"property":"article:tag","content":"API测试"}],["meta",{"property":"article:published_time","content":"2024-07-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T20:00:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HTTPie 命令行工具指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T20:00:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"HTTPie 命令行工具指南 概述 在本教程中，我们将学习如何使用 HTTPie 命令行界面工具。 HTTPie 是什么？ HTTPie 是一个用于与 HTTP 服务器和 API 交互的命令行 HTTP 客户端。此外，HTTPie 也可以用于测试和调试。 它还具有格式化和着色输出、直观的语法和内置的 JSON 支持。 安装 首先，我们需要安装它： 3...."},"headers":[],"git":{"createdTime":1720555236000,"updatedTime":1720555236000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.39,"words":717},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Guide to HTTPie for Terminal.md","localizedDate":"2024年7月10日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>在本教程中，我们将学习如何使用 HTTPie 命令行界面工具。</p>\\n<ol start=\\"2\\">\\n<li>HTTPie 是什么？</li>\\n</ol>\\n<p><strong>HTTPie 是一个用于与 HTTP 服务器和 API 交互的命令行 HTTP 客户端</strong>。此外，HTTPie 也可以用于测试和调试。\\n它还具有格式化和着色输出、直观的语法和内置的 JSON 支持。</p>\\n<ol start=\\"3\\">\\n<li>安装</li>\\n</ol>\\n<p>首先，我们需要安装它：</p>\\n<p>3.1. 在 Linux 上</p>","autoDesc":true}');export{c as comp,m as data};
