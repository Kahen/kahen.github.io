---
date: 2024-06-15
category:
  - Elasticsearch
  - Spring Data
tag:
  - Elasticsearch
  - Aggregation
  - Query
  - Spring Data
  - Tutorial
---
# Elasticsearch查询中添加聚合

Elasticsearch是一个适用于需要灵活过滤的场景的搜索和分析引擎。**有时，我们需要检索请求的数据及其聚合信息。** 在本教程中，我们将探讨如何做到这一点。

## 2. Elasticsearch搜索与聚合
让我们从探索Elasticsearch的聚合功能开始。

一旦我们在本地主机上运行了Elasticsearch实例，**让我们创建一个名为_store-items_的索引，并在其中添加一些文档**：

```json
POST http://localhost:9200/store-items/_doc
{
    "type": "Multimedia",
    "name": "PC Monitor",
    "price": 1000
}
...
POST http://localhost:9200/store-items/_doc
{
    "type": "Pets",
    "name": "Dog Toy",
    "price": 10
}
```

现在，让我们在不应用任何过滤器的情况下查询它：

```json
GET http://localhost:9200/store-items/_search
```

现在让我们看看响应：

```json
{
    ...
    "hits": {
        "total": {
            "value": 5,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "store-items",
                "_type": "_doc",
                "_id": "J49VVI8B6ADL84Kpbm8A",
                "_score": 1.0,
                "_source": {
                    "_class": "com.baeldung.model.StoreItem",
                    "type": "Multimedia",
                    "name": "PC Monitor",
                    "price": 1000
                }
            },
            {
                "_index": "store-items",
                "_type": "_doc",
                "_id": "KI9VVI8B6ADL84Kpbm8A",
                "_score": 1.0,
                "_source": {
                    "type": "Pets",
                    "name": "Dog Toy",
                    "price": 10
                }
            },
    ...
        ]
    }
}
```

我们在响应中有一些与商店商品相关的文档。每个文档对应一种特定的商店商品类型。

接下来，假设我们想知道每种类型有多少商品。**让我们将聚合部分添加到请求体中，然后再次搜索索引**：

```json
GET http://localhost:9200/store-items/_search
{
    "aggs": {
        "type_aggregation": {
            "terms": {
                "field": "type"
            }
        }
    }
}
```

我们添加了名为_type_aggregation_的聚合，它使用了_terms_聚合。

**正如我们在响应中看到的，有一个新的_aggregations_部分，我们可以找到每种类型的文档数量信息**：

```json
{
    ...
    "aggregations": {
        "type_aggregation": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
                {
                    "key": "Multimedia",
                    "doc_count": 2
                },
                {
                    "key": "Pets",
                    "doc_count": 2
                },
                {
                    "key": "Home tech",
                    "doc_count": 1
                }
            ]
        }
    }
}
```

## 3. Spring Data Elasticsearch 搜索与聚合
让我们使用Spring Data Elasticsearch实现上一节的功能。让我们从添加依赖开始：

```xml
`<dependency>`
    `<groupId>`org.springframework.data`</groupId>`
    `<artifactId>`spring-data-elasticsearch`</artifactId>`
`</dependency>`
```

下一步，**我们提供一个Elasticsearch配置类**：

```java
@Configuration
@EnableElasticsearchRepositories(basePackages = "com.baeldung.spring.data.es.aggregation.repository")
@ComponentScan(basePackages = "com.baeldung.spring.data.es.aggregation")
public class ElasticSearchConfig {

    @Bean
    public RestClient elasticsearchRestClient() {
        return RestClient.builder(HttpHost.create("localhost:9200"))
          .setHttpClientConfigCallback(httpClientBuilder -> {
              httpClientBuilder.addInterceptorLast((HttpResponseInterceptor) (response, context) ->
                  response.addHeader("X-Elastic-Product", "Elasticsearch"));
              return httpClientBuilder;
          })
          .build();
    }

    @Bean
    public ElasticsearchClient elasticsearchClient(RestClient restClient) {
        return ElasticsearchClients.createImperative(restClient);
    }

    @Bean(name = { "elasticsearchOperations", "elasticsearchTemplate" })
    public ElasticsearchOperations elasticsearchOperations(
        ElasticsearchClient elasticsearchClient) {

        ElasticsearchTemplate template = new ElasticsearchTemplate(elasticsearchClient);
        template.setRefreshPolicy(null);

        return template;
    }
}
```

在这里，我们指定了一个低级别的Elasticsearch REST客户端及其包装的bean实现_ElasticsearchOperations_接口。现在，让我们创建一个_StoreItem_实体：

```java
@Document(indexName = "store-items")
public class StoreItem {
    @Id
    private String id;

    @Field(type = Keyword)
    private String type;
    @Field(type = Keyword)
    private String name;

    @Field(type = Keyword)
    private Long price;

    //getters and setters
}
```

我们使用了与上一节相同的_store-items_索引。**由于我们不能使用Spring Data存储库的内置能力来检索聚合，我们将需要创建一个存储库扩展**。**让我们创建一个扩展接口**：

```java
public interface StoreItemRepositoryExtension {
    SearchPage``````<StoreItem>`````` findAllWithAggregations(Pageable pageable);
}
```

在这里，我们有findAllWithAggregations()方法，它使用_Pageable_接口的实现，并返回一个带有我们项目的_SearchPage_。接下来，让我们创建这个接口的实现：

```java
@Component
public class StoreItemRepositoryExtensionImpl implements StoreItemRepositoryExtension {

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    @Override
    public SearchPage``````<StoreItem>`````` findAllWithAggregations(Pageable pageable) {
        Query query = NativeQuery.builder()
          .withAggregation("type_aggregation",
            Aggregation.of(b -> b.terms(t -> t.field("type"))))
          .build();
        SearchHits``````<StoreItem>`````` response = elasticsearchOperations.search(query, StoreItem.class);
        return SearchHitSupport.searchPageFor(response, pageable);
    }
}
```

**我们构建了原生查询，包含了聚合部分。** 按照上一节的模式，我们使用_type_aggregation_作为聚合名称。然后，我们使用_terms_聚合类型来计算响应中指定字段的文档数量。

最后，让我们创建一个Spring Data存储库，我们将扩展_ElasticsearchRepository_来支持通用的Spring Data功能，并扩展_StoreItemRepositoryExtension_来包含我们的自定义方法实现：

```java
@Repository
public interface StoreItemRepository extends ElasticsearchRepository`<StoreItem, String>`,
  StoreItemRepositoryExtension {
}

```

之后，让我们为我们的聚合功能创建一个测试：

```java
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = ElasticSearchConfig.class)
public class ElasticSearchAggregationManualTest {

    private static final List``````<StoreItem>`````` EXPECTED_ITEMS = List.of(
      new StoreItem("Multimedia", "PC Monitor", 1000L),
      new StoreItem("Multimedia", "Headphones", 200L),
      new StoreItem("Home tech", "Barbecue Grill", 2000L),
      new StoreItem("Pets", "Dog Toy", 10L),
      new StoreItem("Pets", "Cat shampoo", 5L));
    ...

    @BeforeEach
    public void before() {
        repository.saveAll(EXPECTED_ITEMS);
    }

...

@Test
void givenFullTitle_whenRunMatchQuery_thenDocIsFound() {
    SearchHits``````<StoreItem>`````` searchHits = repository.findAllWithAggregations(Pageable.ofSize(2))
      .getSearchHits();
    List``````<StoreItem>`````` data = searchHits.getSearchHits()
      .stream()
      .map(SearchHit::getContent)
      .toList();

    Assertions.assertThat(data).containsAll(EXPECTED_ITEMS);

    Map`<String, Long>` aggregatedData = ((ElasticsearchAggregations) searchHits
      .getAggregations())
      .get("type_aggregation")
      .aggregation()
      .getAggregate()
      .sterms()
      .buckets()
      .array()
      .stream()
      .collect(Collectors.toMap(bucket -> bucket.key()
        .stringValue(), MultiBucketBase::docCount));

    Assertions.assertThat(aggregatedData).containsExactlyInAnyOrderEntriesOf(
      Map.of("Multimedia", 2L, "Home tech", 1L, "Pets", 2L));
}
```

正如我们在响应中看到的，我们检索了搜索命中，我们可以从中提取确切的查询结果。**此外，我们检索了聚合数据，其中包含我们搜索结果的所有预期聚合。**

## 4. 结论
在本文中，我们探讨了如何将Elasticsearch聚合功能集成到Spring Data存储库中。我们使用了_terms_聚合来实现这一点。然而，还有许多其他type of aggregations available that we can employ to cover a wide range of aggregation functionality.

As usual, the full source code can be found over on GitHub.
---

# 结论

在本文中，我们探讨了如何将Elasticsearch聚合功能集成到Spring Data存储库中。我们使用了_terms_聚合来实现这一点。然而，还有许多其他类型的聚合可供我们使用，以满足广泛的聚合功能需求。

像往常一样，完整的源代码可以在GitHub上找到。
---

OK