import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-DpZeiq6F.js";const a={},l=t(`<h1 id="spring-webflux-和-spring-data-reactive-中的分页" tabindex="-1"><a class="header-anchor" href="#spring-webflux-和-spring-data-reactive-中的分页"><span>Spring Webflux 和 Spring Data Reactive 中的分页</span></a></h1><p>在本文中，我们将探讨分页在检索信息时的重要性，比较 Spring Data Reactive 分页与 Spring Data，并展示如何使用示例实现分页。</p><p>分页是在处理返回大量资源集合的端点时的一个重要概念。它通过将数据分解成更小、更易于管理的块，称为“页面”，从而允许高效地检索和展示数据。</p><p>考虑一个显示产品详情的 UI 页面，它可能显示从 10 到 10,000 条记录。假设 UI 设计为从后端获取并显示整个目录。在这种情况下，它将消耗额外的后端资源，并导致用户等待时间显著增加。</p><p><strong>实现分页系统可以显著增强用户体验。而不是一次性获取所有记录集，更有效的方法是最初检索少量记录，并在请求时提供加载下一组记录的选项。</strong></p><p>使用分页，后端可以返回一个包含较小子集的初始响应，例如 10 条记录，并使用偏移量或下一页链接检索后续页面。这种方法将获取和显示记录的负载分散在多个页面上，提高了整体应用程序体验。</p><p>Spring Data 是 Spring Framework 生态系统中的一个项目，旨在简化和增强 Java 应用程序中的数据访问。Spring Data 提供了一组通用的抽象和功能，通过减少样板代码和促进最佳实践来简化开发过程。</p><p>正如在 Spring Data 分页示例中所解释的，<em>PageRequest</em> 对象，它接受 <em>page</em>、<em>size</em> 和 <em>sort</em> 参数，可用于配置和请求不同的页面。Spring Data 提供了 <em>PagingAndSortingRepository</em>，它提供了使用分页和排序抽象检索实体的方法。仓库方法接受 <em>Pageable</em> 和 Sort 对象，这些对象可用于配置返回的 <em>Page</em> 信息。这个 <em>Page</em> 对象包含了 <em>totalElements</em> 和 <em>totalPages</em> 属性，这些属性是通过内部执行额外查询来填充的。这些信息可以用来请求信息的后续页面。</p><p>相反，Spring Data Reactive 并不完全支持分页。原因在于 Spring Reactive 对异步非阻塞的支持。它必须等待（或阻塞）直到返回特定页面大小的所有数据，这并不是非常高效。然而，<strong>Spring Data Reactive 仍然支持 <em>Pageable</em>。我们可以使用 <em>PageRequest</em> 对象配置它以检索特定的数据块，并添加一个显式的查询来获取记录的总数。</strong></p><p><strong>与使用 Spring Data 时包含页面记录的元数据的 <em>Page</em> 不同，我们可以得到一个 <em>Flux</em> 的响应。</strong></p><h2 id="_4-基本应用程序" tabindex="-1"><a class="header-anchor" href="#_4-基本应用程序"><span>4. 基本应用程序</span></a></h2><h3 id="_4-1-在-spring-webflux-和-spring-data-reactive-中实现分页" tabindex="-1"><a class="header-anchor" href="#_4-1-在-spring-webflux-和-spring-data-reactive-中实现分页"><span>4.1. 在 Spring WebFlux 和 Spring Data Reactive 中实现分页</span></a></h3><p>对于本文，我们将使用一个简单的 Spring R2DBC 应用程序，该应用程序通过 GET /products 公开具有分页的产品信息。</p><p>让我们考虑一个简单的 Product 模型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Product {
    
    @Id
    @Getter
    private UUID id;

    @NotNull
    @Size(max = 255, message = &quot;属性 &#39;name&#39; 的长度必须小于或等于 255 个字符。&quot;)
    private String name;

    @NotNull
    private double price;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过传递一个包含 <em>Page</em> 和 Size 等配置的 <em>Pageable</em> 对象，从 Product Repository 获取产品列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository
public interface ProductRepository extends ReactiveSortingRepository\`&lt;Product, UUID&gt;\` {
    Flux\`\`&lt;Product&gt;\`\` findAllBy(Pageable pageable);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个查询以 <em>Flux</em> 的形式响应结果集，而不是 <em>Page</em>，因此需要单独查询总记录数以填充 <em>Page</em> 响应。</p><p>让我们添加一个控制器，其中包含一个 <em>PageRequest</em> 对象，它还运行一个额外的查询以获取记录的总数。这是因为我们的仓库不返回 <em>Page</em> 信息，而是返回 <em>Flux<code>&lt;Product&gt;</code></em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@GetMapping(&quot;/products&quot;)
public Mono&lt;Page\`\`&lt;Product&gt;\`\`&gt; findAllProducts(Pageable pageable) {
    return this.productRepository.findAllBy(pageable)
      .collectList()
      .zipWith(this.productRepository.count())
      .map(p -&gt; new PageImpl&lt;&gt;(p.getT1(), pageable, p.getT2()));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们必须将查询结果集和最初接收到的 <em>Pageable</em> 对象一起发送到 <em>PageImpl</em>。这个类有辅助方法来计算 <em>Page</em> 信息，其中包括用于获取下一组记录的页面的元数据。</p><p>现在，当我们尝试访问端点时，我们应该收到一个带有页面元数据的产品列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;content&quot;: [
    {
      &quot;id&quot;: &quot;cdc0c4e6-d4f6-406d-980c-b8c1f5d6d106&quot;,
      &quot;name&quot;: &quot;product_A&quot;,
      &quot;price&quot;: 1
    },
    {
      &quot;id&quot;: &quot;699bc017-33e8-4feb-aee0-813b044db9fa&quot;,
      &quot;name&quot;: &quot;product_B&quot;,
      &quot;price&quot;: 2
    },
    {
      &quot;id&quot;: &quot;8b8530dc-892b-475d-bcc0-ec46ba8767bc&quot;,
      &quot;name&quot;: &quot;product_C&quot;,
      &quot;price&quot;: 3
    },
    {
      &quot;id&quot;: &quot;7a74499f-dafc-43fa-81e0-f4988af28c3e&quot;,
      &quot;name&quot;: &quot;product_D&quot;,
      &quot;price&quot;: 4
    }
  ],
  &quot;pageable&quot;: {
    &quot;sort&quot;: {
      &quot;sorted&quot;: false,
      &quot;unsorted&quot;: true,
      &quot;empty&quot;: true
    },
    &quot;pageNumber&quot;: 0,
    &quot;pageSize&quot;: 20,
    &quot;offset&quot;: 0,
    &quot;paged&quot;: true,
    &quot;unpaged&quot;: false
  },
  &quot;last&quot;: true,
  &quot;totalElements&quot;: 4,
  &quot;totalPages&quot;: 1,
  &quot;first&quot;: true,
  &quot;numberOfElements&quot;: 4,
  &quot;size&quot;: 20,
  &quot;number&quot;: 0,
  &quot;sort&quot;: {
    &quot;sorted&quot;: false,
    &quot;unsorted&quot;: true,
    &quot;empty&quot;: true
  },
  &quot;empty&quot;: false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>像 Spring Data 一样，我们使用特定的查询参数来浏览不同的页面，并通过扩展 <em>WebMvcConfigurationSupport</em> 来配置默认属性。</p><p>让我们将默认页面大小从 20 改为 100，并通过覆盖 <em>addArgumentResolvers</em> 方法将默认页面设置为 0：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
public class CustomWebMvcConfigurationSupport extends WebMvcConfigurationSupport {

    @Bean
    public PageRequest defaultPageRequest() {
        return PageRequest.of(0, 100);
    }

    @Override
    protected void addArgumentResolvers(List\`&lt;HandlerMethodArgumentResolver&gt;\` argumentResolvers) {
        SortHandlerMethodArgumentResolver argumentResolver = new SortHandlerMethodArgumentResolver();
        argumentResolver.setSortParameter(&quot;sort&quot;);
        PageableHandlerMethodArgumentResolver resolver = new PageableHandlerMethodArgumentResolver(argumentResolver);
        resolver.setFallbackPageable(defaultPageRequest());
        resolver.setPageParameterName(&quot;page&quot;);
        resolver.setSizeParameterName(&quot;size&quot;);
        argumentResolvers.add(resolver);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以从第 0 页开始，每页最多 100 条记录进行请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl --location &#39;http://localhost:8080/products?page=0&amp;size=50&amp;sort=price,DESC&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有指定页面和大小参数，默认页面索引为 0，每页 100 条记录。但请求将页面大小设置为 50：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;content&quot;: [
    ....
  ],
  &quot;pageable&quot;: {
    &quot;sort&quot;: {
      &quot;sorted&quot;: false,
      &quot;unsorted&quot;: true,
      &quot;empty&quot;: true
    },
    &quot;pageNumber&quot;: 0,
    &quot;pageSize&quot;: 50,
    &quot;offset&quot;: 0,
    &quot;paged&quot;: true,
    &quot;unpaged&quot;: false
  },
  &quot;last&quot;: true,
  &quot;totalElements&quot;: 4,
  &quot;totalPages&quot;: 1,
  &quot;first&quot;: true,
  &quot;numberOfElements&quot;: 4,
  &quot;size&quot;: 50,
  &quot;number&quot;: 0,
  &quot;sort&quot;: {
    &quot;sorted&quot;: false,
    &quot;unsorted&quot;: true,
    &quot;empty&quot;: true
  },
  &quot;empty&quot;: false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们理解了 Spring Data Reactive 分页的独特性质。我们还实现了一个返回具有分页的产品列表的端点。</p><p>如常，示例的源代码可在 GitHub 上获得。</p>`,33),s=[l];function r(d,u){return i(),n("div",null,s)}const c=e(a,[["render",r],["__file","2024-07-02-Pagination in Spring Webflux and Spring Data Reactive.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Pagination%20in%20Spring%20Webflux%20and%20Spring%20Data%20Reactive.html","title":"Spring Webflux 和 Spring Data Reactive 中的分页","lang":"zh-CN","frontmatter":{"date":"2023-03-23T00:00:00.000Z","category":["Spring","WebFlux"],"tag":["Pagination","Spring Data Reactive"],"head":[["meta",{"name":"Pagination in Spring Webflux and Spring Data Reactive","content":"Learn how to implement pagination with Spring Webflux and Spring Data Reactive for efficient data retrieval and improved user experience."}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Pagination%20in%20Spring%20Webflux%20and%20Spring%20Data%20Reactive.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Webflux 和 Spring Data Reactive 中的分页"}],["meta",{"property":"og:description","content":"Spring Webflux 和 Spring Data Reactive 中的分页 在本文中，我们将探讨分页在检索信息时的重要性，比较 Spring Data Reactive 分页与 Spring Data，并展示如何使用示例实现分页。 分页是在处理返回大量资源集合的端点时的一个重要概念。它通过将数据分解成更小、更易于管理的块，称为“页面”，从而允..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T13:04:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Pagination"}],["meta",{"property":"article:tag","content":"Spring Data Reactive"}],["meta",{"property":"article:published_time","content":"2023-03-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T13:04:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Webflux 和 Spring Data Reactive 中的分页\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T13:04:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Webflux 和 Spring Data Reactive 中的分页 在本文中，我们将探讨分页在检索信息时的重要性，比较 Spring Data Reactive 分页与 Spring Data，并展示如何使用示例实现分页。 分页是在处理返回大量资源集合的端点时的一个重要概念。它通过将数据分解成更小、更易于管理的块，称为“页面”，从而允..."},"headers":[{"level":2,"title":"4. 基本应用程序","slug":"_4-基本应用程序","link":"#_4-基本应用程序","children":[{"level":3,"title":"4.1. 在 Spring WebFlux 和 Spring Data Reactive 中实现分页","slug":"_4-1-在-spring-webflux-和-spring-data-reactive-中实现分页","link":"#_4-1-在-spring-webflux-和-spring-data-reactive-中实现分页","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719925472000,"updatedTime":1719925472000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.88,"words":1463},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Pagination in Spring Webflux and Spring Data Reactive.md","localizedDate":"2023年3月23日","excerpt":"\\n<p>在本文中，我们将探讨分页在检索信息时的重要性，比较 Spring Data Reactive 分页与 Spring Data，并展示如何使用示例实现分页。</p>\\n<p>分页是在处理返回大量资源集合的端点时的一个重要概念。它通过将数据分解成更小、更易于管理的块，称为“页面”，从而允许高效地检索和展示数据。</p>\\n<p>考虑一个显示产品详情的 UI 页面，它可能显示从 10 到 10,000 条记录。假设 UI 设计为从后端获取并显示整个目录。在这种情况下，它将消耗额外的后端资源，并导致用户等待时间显著增加。</p>\\n<p><strong>实现分页系统可以显著增强用户体验。而不是一次性获取所有记录集，更有效的方法是最初检索少量记录，并在请求时提供加载下一组记录的选项。</strong></p>","autoDesc":true}');export{c as comp,m as data};
