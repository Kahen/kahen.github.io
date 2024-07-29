import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-BUAgDejY.js";const o={},p=a('<hr><h1 id="使用postman-rest客户端发送csrf令牌" tabindex="-1"><a class="header-anchor" href="#使用postman-rest客户端发送csrf令牌"><span>使用Postman REST客户端发送CSRF令牌</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>每次我们测试启用了CSRF保护的端点时，我们都必须手动从cookie中获取CSRF令牌，并将其设置在_X-XSRF-TOKEN_请求头中。如果我们不发送CSRF令牌，我们会收到_403禁止_错误。</p><p>在本教程中，我们将看到如何在使用Postman时自动向服务器发送CSRF令牌。</p><h2 id="_2-应用程序设置" tabindex="-1"><a class="header-anchor" href="#_2-应用程序设置"><span>2. 应用程序设置</span></a></h2><p>我们不会讨论如何在Spring应用程序中启用CSRF保护，这在之前的文章中已经介绍过了。</p><p><strong>我们知道，我们可以在客户端的cookie中找到CSRF令牌，默认情况下，CSRF保护对_POST_、<em>PUT_和_DELETE</em> HTTP动词强制执行。</strong></p><p>此外，为了测试，我们将使用之前文章中的一个端点，一个_POST_请求，该请求允许用户将金额转移到一个账户： <code>POST http://localhost:8080/transfer?accountNo=1234&amp;amount=100</code></p><p>首先，我们将在不考虑CSRF令牌的情况下使用Postman客户端进行测试。之后，我们将进行另一个测试，发送CSRF令牌并设置Postman以自动发送它。</p><h3 id="_3-1-不带csrf令牌的测试" tabindex="-1"><a class="header-anchor" href="#_3-1-不带csrf令牌的测试"><span>3.1. 不带CSRF令牌的测试</span></a></h3><p>让我们打开Postman并添加一个新请求：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/06/request.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，我们执行请求而不发送CSRF令牌，我们得到了_403禁止_错误：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/06/forbidden.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>接下来，我们将看到如何修复这个问题。</p><p>在_Headers_标签中，让我们添加一个名为_X-XSRF-TOKEN_的新参数，并将值设置为_xsrf-token._ _X-XSRF-TOKEN_是CSRF的头部，_xsrf-token_是我们稍后将定义的环境变量：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/06/header.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-3-环境变量-xsrf-token" tabindex="-1"><a class="header-anchor" href="#_3-3-环境变量-xsrf-token"><span>3.3. 环境变量_xsrf-token_</span></a></h3><p>现在让我们转到左侧的_Environments_并创建一个名为DEV的新环境：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/06/env-300x291.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在右侧，让我们定义我们上面提到的环境变量，称为_xsrf-token._ 我们将其余字段留空：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/06/env_variable-1024x170.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>让我们回到请求并从右上角选择DEV环境，以便我们可以使用我们定义的环境属性：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/06/dev.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-4-脚本" tabindex="-1"><a class="header-anchor" href="#_3-4-脚本"><span>3.4. 脚本</span></a></h3><p>现在让我们点击_Tests_标签。我们将在这里添加以下脚本：</p><p>该脚本检_XSRF-TOKEN_ cookie的值并将其分配给环境变量_xsrf-token._ 现在，无论服务器返回什么值，_XSRF-TOKEN_都将被转移到_X-XSRF-TOKEN_头部属性。</p><h3 id="_2-5-测试" tabindex="-1"><a class="header-anchor" href="#_2-5-测试"><span>2.5. 测试</span></a></h3><p>当我们执行请求时，我们现在得到了_200 OK_响应：</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们看到了如何测试一个启用了CSRF保护的应用程序的端点。</p><p>我们使用Postman客户端自动发送每次在同一个端点执行新请求时的CSRF令牌。这更有效，因为我们不需要手动获取CSRF令牌并将其设置在请求头中。</p>',33),i=[p];function s(r,l){return n(),t("div",null,i)}const g=e(o,[["render",s],["__file","2024-07-18-Sending CSRF Token From Postman REST Client.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Sending%20CSRF%20Token%20From%20Postman%20REST%20Client.html","title":"使用Postman REST客户端发送CSRF令牌","lang":"zh-CN","frontmatter":{"date":"2022-06-01T00:00:00.000Z","category":["Postman","CSRF Token"],"tag":["Postman","CSRF","403 Forbidden"],"head":[["meta",{"name":"keywords","content":"Postman, CSRF Token, 403 Forbidden"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Sending%20CSRF%20Token%20From%20Postman%20REST%20Client.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Postman REST客户端发送CSRF令牌"}],["meta",{"property":"og:description","content":"使用Postman REST客户端发送CSRF令牌 1. 概述 每次我们测试启用了CSRF保护的端点时，我们都必须手动从cookie中获取CSRF令牌，并将其设置在_X-XSRF-TOKEN_请求头中。如果我们不发送CSRF令牌，我们会收到_403禁止_错误。 在本教程中，我们将看到如何在使用Postman时自动向服务器发送CSRF令牌。 2. 应用程..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/06/request.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T03:35:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Postman"}],["meta",{"property":"article:tag","content":"CSRF"}],["meta",{"property":"article:tag","content":"403 Forbidden"}],["meta",{"property":"article:published_time","content":"2022-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T03:35:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Postman REST客户端发送CSRF令牌\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/06/request.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/forbidden.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/header.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/env-300x291.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/env_variable-1024x170.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/dev.png\\"],\\"datePublished\\":\\"2022-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T03:35:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Postman REST客户端发送CSRF令牌 1. 概述 每次我们测试启用了CSRF保护的端点时，我们都必须手动从cookie中获取CSRF令牌，并将其设置在_X-XSRF-TOKEN_请求头中。如果我们不发送CSRF令牌，我们会收到_403禁止_错误。 在本教程中，我们将看到如何在使用Postman时自动向服务器发送CSRF令牌。 2. 应用程..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 应用程序设置","slug":"_2-应用程序设置","link":"#_2-应用程序设置","children":[{"level":3,"title":"3.1. 不带CSRF令牌的测试","slug":"_3-1-不带csrf令牌的测试","link":"#_3-1-不带csrf令牌的测试","children":[]},{"level":3,"title":"3.3. 环境变量_xsrf-token_","slug":"_3-3-环境变量-xsrf-token","link":"#_3-3-环境变量-xsrf-token","children":[]},{"level":3,"title":"3.4. 脚本","slug":"_3-4-脚本","link":"#_3-4-脚本","children":[]},{"level":3,"title":"2.5. 测试","slug":"_2-5-测试","link":"#_2-5-测试","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721273734000,"updatedTime":1721273734000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.47,"words":740},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Sending CSRF Token From Postman REST Client.md","localizedDate":"2022年6月1日","excerpt":"<hr>\\n<h1>使用Postman REST客户端发送CSRF令牌</h1>\\n<h2>1. 概述</h2>\\n<p>每次我们测试启用了CSRF保护的端点时，我们都必须手动从cookie中获取CSRF令牌，并将其设置在_X-XSRF-TOKEN_请求头中。如果我们不发送CSRF令牌，我们会收到_403禁止_错误。</p>\\n<p>在本教程中，我们将看到如何在使用Postman时自动向服务器发送CSRF令牌。</p>\\n<h2>2. 应用程序设置</h2>\\n<p>我们不会讨论如何在Spring应用程序中启用CSRF保护，这在之前的文章中已经介绍过了。</p>\\n<p><strong>我们知道，我们可以在客户端的cookie中找到CSRF令牌，默认情况下，CSRF保护对_POST_、<em>PUT_和_DELETE</em> HTTP动词强制执行。</strong></p>","autoDesc":true}');export{g as comp,m as data};
