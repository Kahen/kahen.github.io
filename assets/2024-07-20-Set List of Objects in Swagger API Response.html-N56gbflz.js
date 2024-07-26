import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-8nJ1rqSf.js";const a={},r=i(`<hr><h1 id="使用swagger设置api响应中的对象列表" tabindex="-1"><a class="header-anchor" href="#使用swagger设置api响应中的对象列表"><span>使用Swagger设置API响应中的对象列表</span></a></h1><p>在本教程中，我们将学习如何修改Swagger API响应。首先，我们将从OpenAPI规范和Swagger API响应的一些解释开始。然后，我们将使用Spring Boot实现一个简单的例子，使用OpenApi 3.0来记录Spring REST API。之后，我们将使用Swagger的注解来设置响应体，以提供对象列表。</p><h3 id="_2-1-使用swagger-ui设置spring-boot项目" tabindex="-1"><a class="header-anchor" href="#_2-1-使用swagger-ui设置spring-boot项目"><span>2.1. 使用Swagger UI设置Spring Boot项目</span></a></h3><p>首先，我们将创建一个_ProductService_类，其中保存了产品列表。接下来，在_ProductController_中，我们定义REST API，让用户获取创建的产品列表。</p><p>首先，让我们定义_Product_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Product {
    String code;
    String name;

    // 标准getter和setter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们实现_ProductService_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Service
public class ProductService {
    List\`\`\`\`&lt;Product&gt;\`\`\`\` productsList = new ArrayList&lt;&gt;();
    
    public List\`\`\`\`&lt;Product&gt;\`\`\`\` getProductsList() {
        return productsList;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将有一个_Controller_类来定义REST API：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
public class ProductController {
    final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(&quot;/products&quot;)
    public List\`\`\`\`&lt;Product&gt;\`\`\`\` getProductsList(){
        return productService.getProductsList();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-修改swagger-api响应" tabindex="-1"><a class="header-anchor" href="#_2-2-修改swagger-api响应"><span>2.2. 修改Swagger API响应</span></a></h3><p>有几种Swagger注解可用于记录REST API。<strong>使用_@ApiResponses_，我们可以定义一个@ApiResponse数组，以定义REST API的预期响应。</strong></p><p>现在，让我们使用@ApiResponses将_getProductList_方法的响应内容设置为_Product_对象列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@ApiResponses(
  value = {
    @ApiResponse(
      content = {
        @Content(
          mediaType = &quot;application/json&quot;,
          array = @ArraySchema(schema = @Schema(implementation = Product.class)))
      })  
  })  
@GetMapping(&quot;/products&quot;)
public List\`\`\`\`&lt;Product&gt;\`\`\`\` getProductsList() {
    return productService.getProductsList();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们将响应体的媒体类型设置为_application/json_。此外，我们使用_content_关键字修改了响应体。还使用_array_关键字，我们将响应设置为_Product_对象的数组：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/03/List-of-Products.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本教程中，我们快速查看了OpenAPI规范和Swagger API响应。Swagger为我们提供了各种注解，如_@ApiResponses_，包括不同的关键字。因此，我们可以轻松地使用它们来修改请求和响应，以满足我们应用程序的要求。在我们的实现中，我们使用了_@ApiResponses_来修改Swagger响应体的内容。</p><p>如常，代码可以在GitHub上找到。 <img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/03/List-of-Products.png" alt="img" loading="lazy"></p>`,20),s=[r];function o(d,l){return n(),t("div",null,s)}const p=e(a,[["render",o],["__file","2024-07-20-Set List of Objects in Swagger API Response.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Set%20List%20of%20Objects%20in%20Swagger%20API%20Response.html","title":"使用Swagger设置API响应中的对象列表","lang":"zh-CN","frontmatter":{"date":"2022-03-01T00:00:00.000Z","category":["Java","Spring Boot"],"tag":["Swagger","API"],"head":[["meta",{"name":"keywords","content":"Swagger, API, Spring Boot, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Set%20List%20of%20Objects%20in%20Swagger%20API%20Response.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Swagger设置API响应中的对象列表"}],["meta",{"property":"og:description","content":"使用Swagger设置API响应中的对象列表 在本教程中，我们将学习如何修改Swagger API响应。首先，我们将从OpenAPI规范和Swagger API响应的一些解释开始。然后，我们将使用Spring Boot实现一个简单的例子，使用OpenApi 3.0来记录Spring REST API。之后，我们将使用Swagger的注解来设置响应体，以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/03/List-of-Products.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T21:12:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Swagger"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:published_time","content":"2022-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T21:12:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Swagger设置API响应中的对象列表\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/03/List-of-Products.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/03/List-of-Products.png\\"],\\"datePublished\\":\\"2022-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T21:12:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Swagger设置API响应中的对象列表 在本教程中，我们将学习如何修改Swagger API响应。首先，我们将从OpenAPI规范和Swagger API响应的一些解释开始。然后，我们将使用Spring Boot实现一个简单的例子，使用OpenApi 3.0来记录Spring REST API。之后，我们将使用Swagger的注解来设置响应体，以..."},"headers":[{"level":3,"title":"2.1. 使用Swagger UI设置Spring Boot项目","slug":"_2-1-使用swagger-ui设置spring-boot项目","link":"#_2-1-使用swagger-ui设置spring-boot项目","children":[]},{"level":3,"title":"2.2. 修改Swagger API响应","slug":"_2-2-修改swagger-api响应","link":"#_2-2-修改swagger-api响应","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721509957000,"updatedTime":1721509957000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.85,"words":555},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Set List of Objects in Swagger API Response.md","localizedDate":"2022年3月1日","excerpt":"<hr>\\n<h1>使用Swagger设置API响应中的对象列表</h1>\\n<p>在本教程中，我们将学习如何修改Swagger API响应。首先，我们将从OpenAPI规范和Swagger API响应的一些解释开始。然后，我们将使用Spring Boot实现一个简单的例子，使用OpenApi 3.0来记录Spring REST API。之后，我们将使用Swagger的注解来设置响应体，以提供对象列表。</p>\\n<h3>2.1. 使用Swagger UI设置Spring Boot项目</h3>\\n<p>首先，我们将创建一个_ProductService_类，其中保存了产品列表。接下来，在_ProductController_中，我们定义REST API，让用户获取创建的产品列表。</p>","autoDesc":true}');export{p as comp,u as data};
