import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as r,a as t}from"./app-CBerKIce.js";const o={},m=t('<hr><h1 id="postman中form-data、x-www-form-urlencoded和raw的区别" tabindex="-1"><a class="header-anchor" href="#postman中form-data、x-www-form-urlencoded和raw的区别"><span>Postman中form-data、x-www-form-urlencoded和raw的区别</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>Postman 提供了多种方式与 API 或服务器请求交互，使用不同类型的正文参数。</strong> 这些代表了通过 HTTP 请求向 API 发送数据的不同方式。</p><p>在本教程中，我们将探讨在请求正文中使用 <em>form-data</em>、<em>x-www-form-urlencoded</em> 和 <em>raw</em> 之间的差异。</p><p><strong><em>form-data</em> 表示从网站表单发送到 API 的数据，作为 <em>multipart/form-data</em> 的一部分。</strong> Postman 中的 <em>form-data</em> 选项模拟了在网站上填写表单并提交的过程。我们可以编辑表单数据，并允许它通过转换数据中的关键值编辑器来设置不同的键/值对。</p><p>这也可以用来将文件附加到键上。然而，我们应该注意，使用 HTML5 意味着文件不在任何历史记录或集合中。因此，我们必须在发送请求正文时再次选择文件。另外，Postman 不支持上传多个文件及其内容类型。</p><p>注意，Postman 会保留文件路径以供后续使用，即当我们反复进行 API 调用将同一文件发送到服务器时。这有助于在运行包含多个请求上传文件的集合时。</p><p>让我们看看在 Postman 中使用 <em>form-data</em> 是什么样的：</p><h2 id="_3-x-www-form-urlencoded" tabindex="-1"><a class="header-anchor" href="#_3-x-www-form-urlencoded"><span>3. <em>x-www-form-urlencoded</em></span></a></h2><p><strong>URL 编码数据将编码后的数据发送到服务器，并使用与 URL 参数相同的编码。</strong> 要使用它，我们需要在请求正文中选择 <em>x-www-form-urlencoded</em> 标签。我们需要输入发送请求正文到服务器的键值对，Postman 会在发送之前对所需的数据进行编码。Postman 对键和值都进行编码。</p><p>注意，它不能用于编码文件，因此我们需要手动进行编码。然而，它只能编码请求正文数据或 URL 参数。</p><p><strong>这也是所谓的默认内容类型。</strong> 所有使用此内容类型提交的表单都遵循以下编码模式：</p><ul><li>控件名称和值被转义。所有空格字符将被替换为‘+’符号，保留字符遵循 RFC 1738 符号。</li><li>等号，‘=’，用于分隔键和值，键/值对使用‘&amp;’彼此分隔。</li></ul><p>让我们看看 Postman 中的 <em>x-www-form-urlencoded</em> 标签：</p><h2 id="_4-raw" tabindex="-1"><a class="header-anchor" href="#_4-raw"><span>4. <em>raw</em></span></a></h2><p>顾名思义，<em>raw</em> 数据可以包含任何内容。<strong>Postman 不会触碰 <em>raw</em> 字符串或对其进行任何类型的修改。</strong> 添加到 <em>raw</em> 编辑器的字符串未经修改，除了替换定义的环境变量。<strong>这个编辑器让我们可以设置 Postman 支持的不同格式样式，以及发送 <em>raw</em> 正文所需的正确标题。</strong> 支持以下类型：</p><ul><li>文本</li><li>Javascript</li><li>JSON</li><li>HTML</li><li>XML</li></ul><p>我们也可以手动将这些内容类型设置到我们的请求正文中：</p><h2 id="_5-form-data、x-www-form-urlencoded-和-raw-之间的差异" tabindex="-1"><a class="header-anchor" href="#_5-form-data、x-www-form-urlencoded-和-raw-之间的差异"><span>5. <em>form-data</em>、<em>x-www-form-urlencoded</em> 和 <em>raw</em> 之间的差异</span></a></h2><p>我们可以使用 W3C 委员会定义的不同数据内容类型。他们定义了通过网络层发送数据的多种格式。这些包括 <em>form-data</em>、x-www-form- <em>urlencoded</em> 和 <em>raw</em> 数据。<strong>默认情况下，我们可以使用 <em>x-www-form-urlencoded</em> 格式以简单的文本/ASCII格式发送数据。</strong></p><p>然而，使用 <em>x-www-form-urlencoded</em> 数据类型有数据限制。因此，<strong>我们可以使用 <em>form-data</em> 发送大的二进制或非 ASCII 文本到服务器。</strong></p><p><em>raw</em> 数据类型将任何纯文本或 JSON 发送到服务器，正如其名称所示。它支持多种内容类型，Postman 将发送原始数据而不进行任何修改，与其他数据类型不同。</p><p>我们可以使用 <em>raw</em> 数据类型在请求正文中发送任何类型的数据。这也包括发送可以在服务器端执行的 Javascript 函数。我们可以在 Javascript 选项下发送脚本。<em>raw</em> 数据类型还支持标记语言，如 HTML 和 XML。这在前端没有逻辑且需要消费整个 HTML/XML 页面时很有帮助。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们检查了 Postman 支持的一些请求正文数据类型。</p><p>我们还概述了 Postman 中 <em>form-data</em>、<em>x-www-form-urlencoded</em> 和 <em>raw</em> 之间的差异。然而，我们只获得了对这些请求正文类型的基本理解。如果你想更深入地了解这些请求正文类型，可以探索 Postman 的在线文档。</p>',27),n=[m];function d(w,l){return r(),a("div",null,n)}const p=e(o,[["render",d],["__file","2024-07-17-Difference Between form data  x www form urlencoded and raw in Postman.html.vue"]]),i=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Difference%20Between%20form%20data%20%20x%20www%20form%20urlencoded%20and%20raw%20in%20Postman.html","title":"Postman中form-data、x-www-form-urlencoded和raw的区别","lang":"zh-CN","frontmatter":{"date":"2022-06-18T00:00:00.000Z","category":["Postman","API"],"tag":["form-data","x-www-form-urlencoded","raw"],"head":[["meta",{"name":"keywords","content":"Postman, form-data, x-www-form-urlencoded, raw"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Difference%20Between%20form%20data%20%20x%20www%20form%20urlencoded%20and%20raw%20in%20Postman.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Postman中form-data、x-www-form-urlencoded和raw的区别"}],["meta",{"property":"og:description","content":"Postman中form-data、x-www-form-urlencoded和raw的区别 1. 概述 Postman 提供了多种方式与 API 或服务器请求交互，使用不同类型的正文参数。 这些代表了通过 HTTP 请求向 API 发送数据的不同方式。 在本教程中，我们将探讨在请求正文中使用 form-data、x-www-form-urlencod..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T11:29:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"form-data"}],["meta",{"property":"article:tag","content":"x-www-form-urlencoded"}],["meta",{"property":"article:tag","content":"raw"}],["meta",{"property":"article:published_time","content":"2022-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T11:29:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Postman中form-data、x-www-form-urlencoded和raw的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T11:29:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Postman中form-data、x-www-form-urlencoded和raw的区别 1. 概述 Postman 提供了多种方式与 API 或服务器请求交互，使用不同类型的正文参数。 这些代表了通过 HTTP 请求向 API 发送数据的不同方式。 在本教程中，我们将探讨在请求正文中使用 form-data、x-www-form-urlencod..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. x-www-form-urlencoded","slug":"_3-x-www-form-urlencoded","link":"#_3-x-www-form-urlencoded","children":[]},{"level":2,"title":"4. raw","slug":"_4-raw","link":"#_4-raw","children":[]},{"level":2,"title":"5. form-data、x-www-form-urlencoded 和 raw 之间的差异","slug":"_5-form-data、x-www-form-urlencoded-和-raw-之间的差异","link":"#_5-form-data、x-www-form-urlencoded-和-raw-之间的差异","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721215742000,"updatedTime":1721215742000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.81,"words":1144},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Difference Between form data  x www form urlencoded and raw in Postman.md","localizedDate":"2022年6月18日","excerpt":"<hr>\\n<h1>Postman中form-data、x-www-form-urlencoded和raw的区别</h1>\\n<h2>1. 概述</h2>\\n<p><strong>Postman 提供了多种方式与 API 或服务器请求交互，使用不同类型的正文参数。</strong> 这些代表了通过 HTTP 请求向 API 发送数据的不同方式。</p>\\n<p>在本教程中，我们将探讨在请求正文中使用 <em>form-data</em>、<em>x-www-form-urlencoded</em> 和 <em>raw</em> 之间的差异。</p>\\n<p><strong><em>form-data</em> 表示从网站表单发送到 API 的数据，作为 <em>multipart/form-data</em> 的一部分。</strong> Postman 中的 <em>form-data</em> 选项模拟了在网站上填写表单并提交的过程。我们可以编辑表单数据，并允许它通过转换数据中的关键值编辑器来设置不同的键/值对。</p>","autoDesc":true}');export{p as comp,i as data};
