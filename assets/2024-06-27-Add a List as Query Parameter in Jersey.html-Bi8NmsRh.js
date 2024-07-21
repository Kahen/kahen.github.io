import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a}from"./app-CXN34Kw1.js";const s={},r=a(`<hr><h1 id="在jersey中将列表作为查询参数添加" tabindex="-1"><a class="header-anchor" href="#在jersey中将列表作为查询参数添加"><span>在Jersey中将列表作为查询参数添加</span></a></h1><p>Jersey是一个用于开发RESTful Web服务的开源框架，它是JAX-RS的参考实现。</p><p>在本教程中，我们将探索使用Jersey客户端进行请求时将列表作为查询参数添加的不同方式。</p><h2 id="_2-get-api接收查询参数中的列表" tabindex="-1"><a class="header-anchor" href="#_2-get-api接收查询参数中的列表"><span>2. GET API接收查询参数中的列表</span></a></h2><p>我们首先创建一个GET API，它在查询参数中接收列表。</p><p><strong>我们可以使用_@QueryParam_注解从URI中的查询参数提取值。</strong> _@QueryParam_注解接受一个参数，即我们想要提取的查询参数的名称。</p><p>要使用_@QueryParam_指定列表类型的查询参数，我们将注解应用于方法参数，表示它从URL的查询参数中接收值列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Path(&quot;/&quot;)
public class JerseyListDemo {
    @GET
    public String getItems(@QueryParam(&quot;items&quot;) List\`\`&lt;String&gt;\`\` items) {
        return &quot;Received items: &quot; + items;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们将使用不同的方法将列表作为查询参数传递。完成后，我们将验证响应以确保资源正确处理项目列表。</p><h2 id="_3-使用-queryparam" tabindex="-1"><a class="header-anchor" href="#_3-使用-queryparam"><span>3. 使用_queryParam()_</span></a></h2><p>Jersey中的_queryParam()_方法在构建HTTP请求时向URL添加查询参数。<strong>_queryParam()_方法允许我们指定查询参数的名称和值。</strong></p><h3 id="_3-1-直接使用查询参数" tabindex="-1"><a class="header-anchor" href="#_3-1-直接使用查询参数"><span>3.1. 直接使用查询参数</span></a></h3><p>在这种方法中，我们使用Jersey提供的方法直接添加查询参数。</p><p>在下面的示例中，我们有一个_WebTarget_作为_target()<em>，我们正在向请求URL添加具有多个值_item1,item2_的查询参数_items</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenList_whenUsingQueryParam_thenPassParamsAsList() {
    Response response = target(&quot;/&quot;)
      .queryParam(&quot;items&quot;, &quot;item1&quot;, &quot;item2&quot;)
      .request
      .get();
    assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    assertEquals(&quot;Received items: [item1, item2]&quot;, response.readEntity(String.class));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将导致具有查询参数的URL，如_/?items=item1&amp;items=item2._ 这里，_items_查询参数包含_item1_和_item2_作为其值。</p><h3 id="_3-2-使用逗号分隔的字符串" tabindex="-1"><a class="header-anchor" href="#_3-2-使用逗号分隔的字符串"><span>3.2. 使用逗号分隔的字符串</span></a></h3><p>在这种方法中，我们将列表转换为逗号分隔的字符串，然后将其作为查询参数添加到Jersey客户端中。这简化了URL构建过程，但需要服务器端逻辑将字符串解析为列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenList_whenUsingCommaSeparatedString_thenPassParamsAsList() {
    Response response = target(&quot;/&quot;)
      .queryParam(&quot;items&quot;, &quot;item1,item2&quot;)
      .request()
      .get();
    assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    assertEquals(&quot;Received items: [item1,item2]&quot;, response.readEntity(String.class));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将导致具有查询参数的URL，如_/?items=item1,item2_。这里，_items_查询参数包含_item1,item2_作为其值。</p><h2 id="_4-使用-uribuilder" tabindex="-1"><a class="header-anchor" href="#_4-使用-uribuilder"><span>4. 使用_UriBuilder_</span></a></h2><p>_UriBuilder_方法是构建带有查询参数的URL的强大方式。在这种方法中，我们创建一个_UriBuilder_实例，指定基础URI，并逐步添加查询参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenList_whenUsingUriBuilder_thenPassParamsAsList() {
    List\`\`&lt;String&gt;\`\` itemsList = Arrays.asList(&quot;item1&quot;,&quot;item2&quot;);
    UriBuilder builder = UriBuilder.fromUri(&quot;/&quot;);
    for (String item : itemsList) {
        builder.queryParam(&quot;items&quot;, item);
    }
    URI uri = builder.build();
    String expectedUri = &quot;/?items=item1&amp;items=item2&quot;;
    assertEquals(expectedUri, uri.toString());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>单元测试确保_UriBuilder_正确组装了带有所需查询参数的URL，并验证了其准确性。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了在Jersey中将列表作为查询参数传递的不同方法。</p><p><strong>_queryParam()_方法简单直接，适合简单情况。另一方面，_UriBuilder_非常适合具有多个查询参数的动态URL生成。</strong> 选择取决于应用程序的需求，考虑到列表复杂性和动态URL构建的必要性。</p><p>如常，本文中展示的所有代码都可以在GitHub上找到。</p>`,29),n=[r];function l(d,u){return i(),t("div",null,n)}const c=e(s,[["render",l],["__file","2024-06-27-Add a List as Query Parameter in Jersey.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Add%20a%20List%20as%20Query%20Parameter%20in%20Jersey.html","title":"在Jersey中将列表作为查询参数添加","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","Jersey"],"tag":["RESTful Web Services","JAX-RS"],"head":[["meta",{"name":"keywords","content":"Jersey, Query Parameter, List, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Add%20a%20List%20as%20Query%20Parameter%20in%20Jersey.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Jersey中将列表作为查询参数添加"}],["meta",{"property":"og:description","content":"在Jersey中将列表作为查询参数添加 Jersey是一个用于开发RESTful Web服务的开源框架，它是JAX-RS的参考实现。 在本教程中，我们将探索使用Jersey客户端进行请求时将列表作为查询参数添加的不同方式。 2. GET API接收查询参数中的列表 我们首先创建一个GET API，它在查询参数中接收列表。 我们可以使用_@QueryPa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T22:31:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"RESTful Web Services"}],["meta",{"property":"article:tag","content":"JAX-RS"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T22:31:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Jersey中将列表作为查询参数添加\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T22:31:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Jersey中将列表作为查询参数添加 Jersey是一个用于开发RESTful Web服务的开源框架，它是JAX-RS的参考实现。 在本教程中，我们将探索使用Jersey客户端进行请求时将列表作为查询参数添加的不同方式。 2. GET API接收查询参数中的列表 我们首先创建一个GET API，它在查询参数中接收列表。 我们可以使用_@QueryPa..."},"headers":[{"level":2,"title":"2. GET API接收查询参数中的列表","slug":"_2-get-api接收查询参数中的列表","link":"#_2-get-api接收查询参数中的列表","children":[]},{"level":2,"title":"3. 使用_queryParam()_","slug":"_3-使用-queryparam","link":"#_3-使用-queryparam","children":[{"level":3,"title":"3.1. 直接使用查询参数","slug":"_3-1-直接使用查询参数","link":"#_3-1-直接使用查询参数","children":[]},{"level":3,"title":"3.2. 使用逗号分隔的字符串","slug":"_3-2-使用逗号分隔的字符串","link":"#_3-2-使用逗号分隔的字符串","children":[]}]},{"level":2,"title":"4. 使用_UriBuilder_","slug":"_4-使用-uribuilder","link":"#_4-使用-uribuilder","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719527460000,"updatedTime":1719527460000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.77,"words":830},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Add a List as Query Parameter in Jersey.md","localizedDate":"2024年6月28日","excerpt":"<hr>\\n<h1>在Jersey中将列表作为查询参数添加</h1>\\n<p>Jersey是一个用于开发RESTful Web服务的开源框架，它是JAX-RS的参考实现。</p>\\n<p>在本教程中，我们将探索使用Jersey客户端进行请求时将列表作为查询参数添加的不同方式。</p>\\n<h2>2. GET API接收查询参数中的列表</h2>\\n<p>我们首先创建一个GET API，它在查询参数中接收列表。</p>\\n<p><strong>我们可以使用_@QueryParam_注解从URI中的查询参数提取值。</strong> _@QueryParam_注解接受一个参数，即我们想要提取的查询参数的名称。</p>","autoDesc":true}');export{c as comp,p as data};
