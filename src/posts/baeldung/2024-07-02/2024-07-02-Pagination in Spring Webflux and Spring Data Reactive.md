---
date: 2023-03-23
category:
  - Spring
  - WebFlux
tag:
  - Pagination
  - Spring Data Reactive
head:
  - - meta
    - name: Pagination in Spring Webflux and Spring Data Reactive
      content: Learn how to implement pagination with Spring Webflux and Spring Data Reactive for efficient data retrieval and improved user experience.
---
# Spring Webflux 和 Spring Data Reactive 中的分页

在本文中，我们将探讨分页在检索信息时的重要性，比较 Spring Data Reactive 分页与 Spring Data，并展示如何使用示例实现分页。

分页是在处理返回大量资源集合的端点时的一个重要概念。它通过将数据分解成更小、更易于管理的块，称为“页面”，从而允许高效地检索和展示数据。

考虑一个显示产品详情的 UI 页面，它可能显示从 10 到 10,000 条记录。假设 UI 设计为从后端获取并显示整个目录。在这种情况下，它将消耗额外的后端资源，并导致用户等待时间显著增加。

**实现分页系统可以显著增强用户体验。而不是一次性获取所有记录集，更有效的方法是最初检索少量记录，并在请求时提供加载下一组记录的选项。**

使用分页，后端可以返回一个包含较小子集的初始响应，例如 10 条记录，并使用偏移量或下一页链接检索后续页面。这种方法将获取和显示记录的负载分散在多个页面上，提高了整体应用程序体验。

Spring Data 是 Spring Framework 生态系统中的一个项目，旨在简化和增强 Java 应用程序中的数据访问。Spring Data 提供了一组通用的抽象和功能，通过减少样板代码和促进最佳实践来简化开发过程。

正如在 Spring Data 分页示例中所解释的，_PageRequest_ 对象，它接受 _page_、_size_ 和 _sort_ 参数，可用于配置和请求不同的页面。Spring Data 提供了 _PagingAndSortingRepository_，它提供了使用分页和排序抽象检索实体的方法。仓库方法接受 _Pageable_ 和 Sort 对象，这些对象可用于配置返回的 _Page_ 信息。这个 _Page_ 对象包含了 _totalElements_ 和 _totalPages_ 属性，这些属性是通过内部执行额外查询来填充的。这些信息可以用来请求信息的后续页面。

相反，Spring Data Reactive 并不完全支持分页。原因在于 Spring Reactive 对异步非阻塞的支持。它必须等待（或阻塞）直到返回特定页面大小的所有数据，这并不是非常高效。然而，**Spring Data Reactive 仍然支持 _Pageable_。我们可以使用 _PageRequest_ 对象配置它以检索特定的数据块，并添加一个显式的查询来获取记录的总数。**

**与使用 Spring Data 时包含页面记录的元数据的 _Page_ 不同，我们可以得到一个 _Flux_ 的响应。**

## 4. 基本应用程序

### 4.1. 在 Spring WebFlux 和 Spring Data Reactive 中实现分页

对于本文，我们将使用一个简单的 Spring R2DBC 应用程序，该应用程序通过 GET /products 公开具有分页的产品信息。

让我们考虑一个简单的 Product 模型：

```
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Product {
    
    @Id
    @Getter
    private UUID id;

    @NotNull
    @Size(max = 255, message = "属性 'name' 的长度必须小于或等于 255 个字符。")
    private String name;

    @NotNull
    private double price;
}
```

我们可以通过传递一个包含 _Page_ 和 Size 等配置的 _Pageable_ 对象，从 Product Repository 获取产品列表：

```
@Repository
public interface ProductRepository extends ReactiveSortingRepository`<Product, UUID>` {
    Flux``<Product>`` findAllBy(Pageable pageable);
}
```

这个查询以 _Flux_ 的形式响应结果集，而不是 _Page_，因此需要单独查询总记录数以填充 _Page_ 响应。

让我们添加一个控制器，其中包含一个 _PageRequest_ 对象，它还运行一个额外的查询以获取记录的总数。这是因为我们的仓库不返回 _Page_ 信息，而是返回 _Flux``<Product>``_：

```
@GetMapping("/products")
public Mono<Page``<Product>``> findAllProducts(Pageable pageable) {
    return this.productRepository.findAllBy(pageable)
      .collectList()
      .zipWith(this.productRepository.count())
      .map(p -> new PageImpl<>(p.getT1(), pageable, p.getT2()));
}
```

最后，我们必须将查询结果集和最初接收到的 _Pageable_ 对象一起发送到 _PageImpl_。这个类有辅助方法来计算 _Page_ 信息，其中包括用于获取下一组记录的页面的元数据。

现在，当我们尝试访问端点时，我们应该收到一个带有页面元数据的产品列表：

```
{
  "content": [
    {
      "id": "cdc0c4e6-d4f6-406d-980c-b8c1f5d6d106",
      "name": "product_A",
      "price": 1
    },
    {
      "id": "699bc017-33e8-4feb-aee0-813b044db9fa",
      "name": "product_B",
      "price": 2
    },
    {
      "id": "8b8530dc-892b-475d-bcc0-ec46ba8767bc",
      "name": "product_C",
      "price": 3
    },
    {
      "id": "7a74499f-dafc-43fa-81e0-f4988af28c3e",
      "name": "product_D",
      "price": 4
    }
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "pageNumber": 0,
    "pageSize": 20,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalElements": 4,
  "totalPages": 1,
  "first": true,
  "numberOfElements": 4,
  "size": 20,
  "number": 0,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "empty": false
}
```

像 Spring Data 一样，我们使用特定的查询参数来浏览不同的页面，并通过扩展 _WebMvcConfigurationSupport_ 来配置默认属性。

让我们将默认页面大小从 20 改为 100，并通过覆盖 _addArgumentResolvers_ 方法将默认页面设置为 0：

```
@Configuration
public class CustomWebMvcConfigurationSupport extends WebMvcConfigurationSupport {

    @Bean
    public PageRequest defaultPageRequest() {
        return PageRequest.of(0, 100);
    }

    @Override
    protected void addArgumentResolvers(List`<HandlerMethodArgumentResolver>` argumentResolvers) {
        SortHandlerMethodArgumentResolver argumentResolver = new SortHandlerMethodArgumentResolver();
        argumentResolver.setSortParameter("sort");
        PageableHandlerMethodArgumentResolver resolver = new PageableHandlerMethodArgumentResolver(argumentResolver);
        resolver.setFallbackPageable(defaultPageRequest());
        resolver.setPageParameterName("page");
        resolver.setSizeParameterName("size");
        argumentResolvers.add(resolver);
    }
}
```

现在，我们可以从第 0 页开始，每页最多 100 条记录进行请求：

```
$ curl --location 'http://localhost:8080/products?page=0&size=50&sort=price,DESC'
```

如果没有指定页面和大小参数，默认页面索引为 0，每页 100 条记录。但请求将页面大小设置为 50：

```
{
  "content": [
    ....
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "pageNumber": 0,
    "pageSize": 50,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalElements": 4,
  "totalPages": 1,
  "first": true,
  "numberOfElements": 4,
  "size": 50,
  "number": 0,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "empty": false
}
```

## 5. 结论

在本文中，我们理解了 Spring Data Reactive 分页的独特性质。我们还实现了一个返回具有分页的产品列表的端点。

如常，示例的源代码可在 GitHub 上获得。