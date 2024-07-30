import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-C5QtKXnb.js";const i={},t=e(`<h1 id="openapi文档中的文本描述格式化-baeldung" tabindex="-1"><a class="header-anchor" href="#openapi文档中的文本描述格式化-baeldung"><span>OpenAPI文档中的文本描述格式化 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>OpenAPI规范（前Swagger规范）标准化了REST API文档语言，并且是平台无关的。我们可以以YAML或JSON格式创建<strong>OpenAPI文档</strong>。</p><p>另一方面，Swagger是一系列用于实现和使用该标准的<strong>工具集合</strong>。有些是免费的，有些是开源的，有些是商业的。这些工具帮助我们设计、文档化和使用REST API。</p><p>在本文中，我们将学习如何格式化OpenAPI文档中的文本描述。</p><h2 id="_2-openapi编辑器" tabindex="-1"><a class="header-anchor" href="#_2-openapi编辑器"><span>2. OpenAPI编辑器</span></a></h2><p>有几种工具支持我们创建OpenAPI文档。一些流行的工具包括：</p><ul><li>Swagger编辑器</li><li>Visual Studio Code OpenAPI插件</li><li>IntelliJ IDEA OpenApi插件</li></ul><p>还有许多其他编辑器提供创建OpenAPI文档的支持。<strong>然而，最受欢迎且广泛使用的编辑器是Swagger编辑器</strong>。因此，我们将学习如何使用Swagger编辑器来格式化我们的OpenAPI文档。</p><h2 id="_3-yaml与json格式化" tabindex="-1"><a class="header-anchor" href="#_3-yaml与json格式化"><span>3. YAML与JSON格式化</span></a></h2><p><strong>OpenAPI文档以JSON或YAML格式表示</strong>。然而，在使用YAML时格式化文档是直接的。</p><p>例如，要在YAML中标记一个单词或句子作为标题，我们使用以下片段：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    # 这是*斜体*标题
    这是下一行</span>

    这是<span class="token important">**粗体**</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YAML表示使用|（管道）来表示标量文字，可以是多行。</p><p>现在，让我们在JSON中定义同样的事情：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;# 这是*斜体*标题\\\\n这是下一行\\\\n\\\\n这是**粗体**&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相比之下，在JSON表示中，转义序列使格式化变得反直觉。因此，我们将只关注YAML编写的OpenAPI规范文档的格式化技术。</p><p>最后，OpenAPI规范允许在所有级别上格式化_description_字段。因此，根据规范，只要允许_description_字段，我们就可以格式化它，并且_description_字段符合CommonMark格式化风格。</p><p>现在，让我们通过格式化来增强我们的API文档。</p><h2 id="_4-标题" tabindex="-1"><a class="header-anchor" href="#_4-标题"><span>4. 标题</span></a></h2><p>就像我们在HTML中使用_<code>&lt;h1&gt;</code><em>到</em><code>&lt;h6&gt;</code><em>标题一样，我们可以使用Markdown标题来突出文本。**一个</em>#<em>代表一个标题**。我们可以使用</em>#<em>多达六个级别来强调文本。</em>#_的数量越多，文本强调的程度就越小。</p><p>例如，考虑YAML：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">openapi</span><span class="token punctuation">:</span> 3.0.1
<span class="token key atrule">info</span><span class="token punctuation">:</span>
  <span class="token key atrule">title</span><span class="token punctuation">:</span> Petstore
  <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    # 宠物店API
    ## 这是一个示例宠物店服务器
    ### 包含管理宠物店的API
    #### 注意，API支持基本认证和OAUTH
    ##### 样本包含请求和响应模型
      ###### 还定义了状态码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Swagger渲染文本为：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/headings-7-1024x264-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-文本强调" tabindex="-1"><a class="header-anchor" href="#_5-文本强调"><span>5. 文本强调</span></a></h2><p>为了提高_description_文本的可读性，我们可以通过使其加粗或斜体来强调它。</p><p><strong>将文本放在_</strong><em>和</em><strong>_之间或在__和__之间可以使文本加粗</strong>。同样，将文本放在<em>和</em>或_和_之间将使文本斜体。例如，对于YAML：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">openapi</span><span class="token punctuation">:</span> 3.0.1
<span class="token key atrule">info</span><span class="token punctuation">:</span>
  <span class="token key atrule">title</span><span class="token punctuation">:</span> Petstore
  <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    ## 此文档包含</span>

    <span class="token important">**宠物店API**</span> <span class="token important">*注意：所有API返回application/json*。</span>
    __用户API__  _注意：这些API包含附件，并且只支持image/jpeg作为内容类型_
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Swagger渲染YAML为：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/emphasis-5-1024x195-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_6-表格" tabindex="-1"><a class="header-anchor" href="#_6-表格"><span>6. 表格</span></a></h2><p>接下来，让我们看看如何在我们的OpenAPI文档中添加表格。</p><p>要渲染表格，需要遵循一组规则。<strong>首先，表格中的每一都应该以_|（管道）<em>符号开始和结束。其次，至少使用一个</em>–（连字符）_符号分隔每个表头</strong>。然而，_–（连字符）_的最大数量没有限制。</p><p>例如，让我们添加一个表格来定义我们的POST API的HTTP状态码：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">paths</span><span class="token punctuation">:</span>
  <span class="token key atrule">/pet</span><span class="token punctuation">:</span>
    <span class="token key atrule">post</span><span class="token punctuation">:</span>
      <span class="token key atrule">tags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> pet
      <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
        **下面的表格定义了此API可能返回的HTTP状态码**</span>

        <span class="token punctuation">|</span> 状态码          <span class="token punctuation">|</span> 描述       <span class="token punctuation">|</span> 原因                             <span class="token punctuation">|</span>
        <span class="token punctuation">|</span> <span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span> <span class="token punctuation">|</span> <span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span> <span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token scalar string">
        | 201              | CREATED     | 如果宠物创建成功。               |
        | 400              | BAD REQUEST | 如果请求无效。                   |
        | 401              | UNAUTHORIZED| 如果凭据无效。                  |</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Swagger生成：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/tables-2-1024x248-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_7-列表" tabindex="-1"><a class="header-anchor" href="#_7-列表"><span>7. 列表</span></a></h2><p>现在，让我们看看如何格式化描述文本以包含列表。</p><h3 id="_7-1-有序列表" tabindex="-1"><a class="header-anchor" href="#_7-1-有序列表"><span>7.1. 有序列表</span></a></h3><p><strong>描述文本项目应该以数字后跟_.（点）_开始</strong>。然而，项目的编号顺序并不重要。也就是说，片段：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  1. 可用
  3. 待处理
  1. 已售出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  1. 可用
  200. 待处理
  30. 已售出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  1. 可用
  100. 待处理
  50. 已售出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成相同的输出：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code>1. 可用
2. 待处理
3. 已售出
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>项目的编号取决于起始项</strong>。例如，如果我们以_10_开始项目编号，随后的项目将被编号为_11_、<em>12</em>、_13_等。下面的YAML：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  10. 可用
  120. 待处理
  50. 已售出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code>10. 可用
11. 待处理
12. 已售出
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，有序子列表的规则也适用。将子列表缩进到其父项。例如，考虑YAML：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  1. 可用
  2. 待处理
     1. 店内待处理
     200. 购物车待处理
  3. 已售出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code>1. 可用
2. 待处理
    1. 店内待处理
    2. 购物车待处理
3. 已售出
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-无序列表" tabindex="-1"><a class="header-anchor" href="#_7-2-无序列表"><span>7.2. 无序列表</span></a></h3><p><strong>使用_*（星号）<em>或</em>+（加号）<em>或</em>–（连字符）_来创建无序列表</strong>。也就是说，列表中的每个项目应该以这些符号之一开始。例如：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  * 可用
  * 待处理
  * 已售出</span>

<span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  + 可用
  + 待处理
  + 已售出</span>

<span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  - 可用
  - 待处理
  - 已售出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有上述片段生成一个无序列表。</p><p>同样，<strong>要生成无序列表子列表，将项目缩进到其父项，并以_*（星号）<em>或</em>+（加号）<em>或</em>–（连字符）_开始</strong>。例如，YAML：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> 可用
<span class="token punctuation">-</span> 待处理
   * 店内待处理
   + 购物车待处理
<span class="token punctuation">-</span> 已售出
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成一个带有子列表的无序列表。注意分隔符的混合和匹配。<strong>可以混合分隔符，这会产生相同的结果</strong>。</p><p>最后，让我们将所有这些放入一个YAML中：</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">/pet/findByStatus</span><span class="token punctuation">:</span>
  <span class="token key atrule">get</span><span class="token punctuation">:</span>
    <span class="token key atrule">summary</span><span class="token punctuation">:</span> 按状态查找宠物
    <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
      __以下是宠物的有效状态列表__</span>

      1. 可用
      2. 待处理
         1. 购物车中待处理
         2. 店内待处理
      3. 已售出

      <span class="token important">**以下是此API可能返回的HTTP状态码**</span>

      * 200 <span class="token punctuation">-</span> OK
      * 400 <span class="token punctuation">-</span> Bad Request. API返回以下与内容类型和接受头相关的状态码
        + 415 <span class="token punctuation">-</span> Unsupported Media Type
        <span class="token punctuation">-</span> 406 <span class="token punctuation">-</span> Not Acceptable
      * 401 <span class="token punctuation">-</span> Unauthorized
      * 405 <span class="token punctuation">-</span> Method not supported
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个YAML生成：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/10/lists-1-1024x366-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_8-杂项" tabindex="-1"><a class="header-anchor" href="#_8-杂项"><span>8. 杂项</span></a></h2><h3 id="_8-1" tabindex="-1"><a class="header-anchor" href="#_8-1"><span>8.1</span></a></h3>`,68),l=[t];function p(c,d){return s(),a("div",null,l)}const u=n(i,[["render",p],["__file","2024-07-25-Format Swagger Text Descriptions.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Format%20Swagger%20Text%20Descriptions.html","title":"OpenAPI文档中的文本描述格式化 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2021-10-01T00:00:00.000Z","category":["OpenAPI","Swagger"],"tag":["文档格式化","YAML","JSON"],"head":[["meta",{"name":"keywords","content":"OpenAPI, Swagger, 文档格式化, YAML, JSON"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Format%20Swagger%20Text%20Descriptions.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"OpenAPI文档中的文本描述格式化 | Baeldung"}],["meta",{"property":"og:description","content":"OpenAPI文档中的文本描述格式化 | Baeldung 1. 引言 OpenAPI规范（前Swagger规范）标准化了REST API文档语言，并且是平台无关的。我们可以以YAML或JSON格式创建OpenAPI文档。 另一方面，Swagger是一系列用于实现和使用该标准的工具集合。有些是免费的，有些是开源的，有些是商业的。这些工具帮助我们设计、文..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/10/headings-7-1024x264-1.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T07:53:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"文档格式化"}],["meta",{"property":"article:tag","content":"YAML"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:published_time","content":"2021-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T07:53:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OpenAPI文档中的文本描述格式化 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/10/headings-7-1024x264-1.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/emphasis-5-1024x195-1.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/tables-2-1024x248-1.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/lists-1-1024x366-1.jpg\\"],\\"datePublished\\":\\"2021-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T07:53:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"OpenAPI文档中的文本描述格式化 | Baeldung 1. 引言 OpenAPI规范（前Swagger规范）标准化了REST API文档语言，并且是平台无关的。我们可以以YAML或JSON格式创建OpenAPI文档。 另一方面，Swagger是一系列用于实现和使用该标准的工具集合。有些是免费的，有些是开源的，有些是商业的。这些工具帮助我们设计、文..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. OpenAPI编辑器","slug":"_2-openapi编辑器","link":"#_2-openapi编辑器","children":[]},{"level":2,"title":"3. YAML与JSON格式化","slug":"_3-yaml与json格式化","link":"#_3-yaml与json格式化","children":[]},{"level":2,"title":"4. 标题","slug":"_4-标题","link":"#_4-标题","children":[]},{"level":2,"title":"5. 文本强调","slug":"_5-文本强调","link":"#_5-文本强调","children":[]},{"level":2,"title":"6. 表格","slug":"_6-表格","link":"#_6-表格","children":[]},{"level":2,"title":"7. 列表","slug":"_7-列表","link":"#_7-列表","children":[{"level":3,"title":"7.1. 有序列表","slug":"_7-1-有序列表","link":"#_7-1-有序列表","children":[]},{"level":3,"title":"7.2. 无序列表","slug":"_7-2-无序列表","link":"#_7-2-无序列表","children":[]}]},{"level":2,"title":"8. 杂项","slug":"_8-杂项","link":"#_8-杂项","children":[{"level":3,"title":"8.1","slug":"_8-1","link":"#_8-1","children":[]}]}],"git":{"createdTime":1721894036000,"updatedTime":1721894036000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.45,"words":1636},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Format Swagger Text Descriptions.md","localizedDate":"2021年10月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>OpenAPI规范（前Swagger规范）标准化了REST API文档语言，并且是平台无关的。我们可以以YAML或JSON格式创建<strong>OpenAPI文档</strong>。</p>\\n<p>另一方面，Swagger是一系列用于实现和使用该标准的<strong>工具集合</strong>。有些是免费的，有些是开源的，有些是商业的。这些工具帮助我们设计、文档化和使用REST API。</p>\\n<p>在本文中，我们将学习如何格式化OpenAPI文档中的文本描述。</p>\\n<h2>2. OpenAPI编辑器</h2>\\n<p>有几种工具支持我们创建OpenAPI文档。一些流行的工具包括：</p>","autoDesc":true}');export{u as comp,m as data};
