---
date: 2024-06-27
category:
  - MongoDB
  - Java
tag:
  - MongoDB Atlas
  - Spring Data
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, Spring Data, Atlas Search
  - - meta
    - name: description
      content: 本教程介绍了如何使用Java MongoDB驱动API实现MongoDB Atlas Search功能，包括创建查询、分页结果、检索元信息、使用过滤器优化结果、调整结果得分和选择要显示的特定字段。
---
# MongoDB Atlas 使用Java驱动和Spring Data进行搜索

## 1. 引言

在本教程中，我们将学习如何使用Java MongoDB驱动API实现Atlas Search功能。到结束时，我们将掌握创建查询、分页结果和检索元信息的方法。此外，我们还将涵盖使用过滤器细化结果、调整结果得分和选择要显示的特定字段。

## 2. 场景和设置

MongoDB Atlas提供了一个永久免费的集群，我们可以使用它来测试所有功能。为了展示Atlas Search功能，我们只需要一个服务类。我们将使用_MongoTemplate_连接到我们的集合。

### 2.1. 依赖项

首先，为了连接到MongoDB，我们需要spring-boot-starter-data-mongodb：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-data-mongodb`</artifactId>`
    `<version>`3.1.2`</version>`
`</dependency>`
```

### 2.2. 示例数据集

**在本教程中，我们将使用MongoDB Atlas的_sample_mflix_示例数据集中的_movies_集合来简化示例。** 它包含自1900年代以来的电影数据，这将帮助我们展示Atlas Search的过滤功能。

### 2.3. 使用动态映射创建索引

为了让Atlas Search工作，我们需要索引。这些可以是静态的或动态的。**静态索引有助于微调，而动态索引是一个很好的通用解决方案。** 因此，让我们从动态索引开始。

有几种方法可以创建搜索索引（包括以编程方式）；我们将使用Atlas UI。在那里，我们可以通过从菜单访问_Search_，选择我们的集群，然后点击_Go to Atlas Search_来实现：

在点击_Create Search Index_后，我们将选择JSON编辑器来创建我们的索引，然后点击_Next_：

**最后，在下一个屏幕上，我们选择我们的目标集合，为我们的索引输入一个名称，并输入我们的索引定义**：

```
{
    "mappings": {
        "dynamic": true
    }
}
```

我们将在本教程中使用_idx-queries_作为这个索引的名称。**请注意，如果我们将索引命名为_default_，我们在创建查询时就不需要指定它的名称。** 最重要的是，动态映射是更灵活、更频繁变化的模式的简单选择。

通过将_mappings.dynamic_设置为_true_，Atlas Search会自动索引文档中所有动态可索引和支持的字段类型。**虽然动态映射提供了便利，特别是当模式未知，它们倾向于消耗更多的磁盘空间，并且可能与静态映射相比效率较低。**

### 2.4. 我们的电影搜索服务

我们将基于一个服务类来构建示例，其中包含对我们的电影的一些搜索查询，从它们中提取有趣的信息。我们将逐步构建更复杂的查询：

```java
@Service
public class MovieAtlasSearchService {
    private final MongoCollection````<Document>```` collection;

    public MovieAtlasSearchService(MongoTemplate mongoTemplate) {
        MongoDatabase database = mongoTemplate.getDb();
        this.collection = database.getCollection("movies");
    }

    // ...
}
```

我们所需要的只是对我们集合的引用，以便将来使用。

## 3. 构建查询

Atlas Search查询是通过管道阶段创建的，由_List`````<Bson>`````_表示。最重要的阶段是_Aggregates.search()_，它接收一个_SearchOperator_和一个可选的_SearchOptions_对象。**由于我们调用的索引是_idx-queries_而不是_default_，我们必须在_SearchOptions.searchOptions().index()_中包含它的名称。否则，我们将不会得到错误和结果。**

有许多搜索操作符可用于定义我们想要进行查询的方式。**在这个例子中，我们将使用_SearchOperator.text()_通过标签查找电影，它执行全文搜索。** 我们将使用它来搜索_fullplot_字段的内容，并使用_SearchPath.fieldPath_。我们将省略静态导入以提高可读性：

```java
public Collection````<Document>```` moviesByKeywords(String keywords) {
    List`````<Bson>````` pipeline = Arrays.asList(
        search(
          text(
            fieldPath("fullplot"), keywords
          ),
          searchOptions()
            .index("idx-queries")
        ),
        project(fields(
          excludeId(),
          include("title", "year", "fullplot", "imdb.rating")
        ))
    );

    return collection.aggregate(pipeline)
      .into(new ArrayList<>());
}
```

此外，我们的_pipeline_中的第二个阶段是_Aggregates.project()_，它表示一个投影。如果没有指定，我们的查询结果将包括我们文档中的所有字段。但我们可以设置它并选择我们想要（或不想要）出现在结果中的字段。请注意，指定一个字段进行包含隐式地排除了所有其他字段，除了__id_字段。**因此，在这种情况下，我们排除了__id_字段并传递了我们想要的字段列表。** 请注意，我们还可以指定嵌套字段，如_imdb.rating_。

要执行管道，我们可以在集合上调用_aggregate()_。这返回一个我们可以迭代结果的对象。最后，为了简单起见，我们调用_into()_来迭代结果并将它们添加到集合中，我们返回这个集合。**请注意，足够大的集合可能会耗尽我们JVM中的内存。我们将看到如何通过分页我们的结果来消除这个问题。**

最重要的是，管道阶段的顺序很重要。**如果我们将_project()_阶段放在_search()_之前，我们会得到一个错误。**

让我们看看调用_moviesByKeywords("space cowboy")_在我们的服务上得到的前两个结果：

```
[
    {
        "title": "Battle Beyond the Stars",
        "fullplot": "Shad, a young farmer, assembles a band of diverse mercenaries in outer space to defend his peaceful planet from the evil tyrant Sador and his armada of aggressors. Among the mercenaries are Space Cowboy, a spacegoing truck driver from Earth; Gelt, a wealthy but experienced assassin looking for a place to hide; and Saint-Exmin, a Valkyrie warrior looking to prove herself in battle.",
        "year": 1980,
        "imdb": {
            "rating": 5.4
        }
    },
    {
        "title": "The Nickel Ride",
        "fullplot": "Small-time criminal Cooper manages several warehouses in Los Angeles that the mob use to stash their stolen goods. Known as 'the key man' for the key chain he always keeps on his person that can unlock all the warehouses. Cooper is assigned by the local syndicate to negotiate a deal for a new warehouse because the mob has run out of storage space. However, Cooper's superior Carl gets nervous and decides to have cocky cowboy button man Turner keep an eye on Cooper.",
        "year": 1974,
        "imdb": {
            "rating": 6.7
        }
    },
    (...)
]
```

### 3.1. 结合搜索操作符

我们可以使用_SearchOperator.compound()_组合搜索操作符。在这个例子中，我们将使用它来包含_must_和_should_子句。**_must_子句包含一个或多个匹配文档的条件。另一方面，_should_子句包含一个或多个我们希望结果包含的条件。**

这改变了得分，使得满足这些条件的文档首先出现：

```java
public Collection````<Document>```` late90sMovies(String keywords) {
    List`````<Bson>````` pipeline = asList(
        search(
          compound()
            .must(asList(
              numberRange(
                fieldPath("year")
                .gteLt(1995, 2000)
            ))
            .should(asList(
              text(
                fieldPath("fullplot"), keywords
              )
            )),
          searchOptions()
            .index("idx-queries")
        ),
        project(fields(
          excludeId(),
          include("title", "year", "fullplot", "imdb.rating")
        ))
    );

    return collection.aggregate(pipeline)
      .into(new ArrayList<>());
}
```

我们保持了与第一个查询相同的_searchOptions()_和投影字段。但是，这次，我们将_text()_移到了_should_子句中，因为我们希望关键词代表一个偏好，而不是一个要求。

然后，我们创建了一个_must_子句，包括_SearchOperator.numberRange()_，只显示1995年到2000年（不包括）的电影，通过限制_year_字段上的值。这样，我们只返回那个时代的电影。

让我们看看_hacker assassin_的前两个结果：

```
[
    {
        "title": "Assassins",
        "fullplot": "Robert Rath is a seasoned hitman who just wants out of the business with no back talk. But, as things go, it ain't so easy. A younger, peppier assassin named Bain is having a field day trying to kill said older assassin. Rath teamsup with a computer hacker named Electra to defeat the obsessed Bain.",
        "year": 1995,
        "imdb": {
            "rating": 6.3
        }
    },
    {
        "fullplot": "Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. Morpheus awakens Neo to the real world, a ravaged wasteland where most of humanity have been captured by a race of machines that live off of the humans' body heat and electrochemical energy and who imprison their minds within an artificial reality known as the Matrix. As a rebel against the machines, Neo must return to the Matrix and confront the agents: super-powerful computer programs devoted to snuffing out Neo and the entire human rebellion.",
        "imdb": {
            "rating": 8.7
        },
        "year": 1999,
        "title": "The Matrix"
    },
    (...)
]
```

## 4. 评分结果集

当我们使用_search()_查询文档时，结果会按照相关性排序，从高到低。这种相关性基于计算出的得分。这次，我们将修改_late90sMovies()_以接收一个_SearchScore_修改器，以提高我们的_should_子句中情节关键词的相关性：

```java
public Collection````<Document>```` late90sMovies(String keywords, SearchScore modifier) {
    List`````<Bson>````` pipeline = asList(
        search(
          compound()
            .must(asList(
              numberRange(
                fieldPath("year")
                .gteLt(1995, 2000)
            ))
            .should(asList(
              text(
                fieldPath("fullplot"), keywords
              )
              .score(modifier)
            )),
          searchOptions()
            .index("idx-queries")
        ),
        project(fields(
          excludeId(),
          include("title", "year", "fullplot", "imdb.rating"),
          metaSearchScore("score")
        ))
    );

    return collection.aggregate(pipeline)
      .into(new ArrayList<>());
}
```

此外，我们在字段列表中包括_metaSearchScore("score")_，以便在我们的结果中看到每个文档的得分。例如，我们现在可以通过以下方式将我们的“should”子句的相关性乘以_imdb.votes_字段的值：

```java
late90sMovies(
  "hacker assassin",
  SearchScore.boost(fieldPath("imdb.votes"))
)
```

这次，由于提升，《黑客帝国》排在了第一位：

```
[
    {
        "fullplot": "Thomas A. Anderson is a man living two lives (...)",
        "imdb": {
            "rating": 8.7
        },
        "year": 1999,
        "title": "The Matrix",
        "score": 3967210.0
    },
    {
        "fullplot": "(...) Bond also squares off against Xenia Onatopp, an assassin who uses pleasure as her ultimate weapon.",
        "imdb": {
            "rating": 7.2
        },
        "year": 1995,
        "title": "GoldenEye",
        "score": 462604.46875
    },
    (...)
]
```

### 4.1. 使用评分函数

我们可以通过使用函数来改变我们的结果评分来实现更大的控制。**让我们传递一个函数到我们的方法中，该函数将_year_字段的值添加到自然得分中。** 这样，更新的电影最终会得到更高的得分：

```java
late90sMovies(keywords, function(
  addExpression(asList(
    pathExpression(
      fieldPath("year")
      .undefined(1),
      relevanceExpression()
  ))
));
```

该代码以_SearchScore.function()_开始，这是一个_SearchScoreExpression.addExpression()_，因为我们想要一个_add_操作。**然后，因为我们想要添加一个字段的值，我们使用一个_SearchScoreExpression.pathExpression()_并指定我们想要的字段：_year_。** 我们还调用_undefined()_来确定_year_的回退值，以防它丢失。** 最后，我们调用_relevanceExpression()_来返回文档的相关性得分，它被添加到_year_的值中。

当我们执行这个操作时，我们会看到《黑客帝国》现在排在首位，并带有它的新得分：

```
[
    {
        "fullplot": "Thomas A. Anderson is a man living two lives (...)",
        "imdb": {
            "rating": 8.7
        },
        "year": 1999,
        "title": "The Matrix",
        "score": 2003.67138671875
    },
    {
        "title": "Assassins",
        "fullplot": "Robert Rath is a seasoned hitman (...)",
        "year": 1995,
        "imdb": {
            "rating": 6.3
        },
        "score": 2003.476806640625
    },
    (...)
]
```

这在定义什么在评分我的结果时应该具有更大的权重时非常有用。

如果我们想要获取查询的总结果数，我们可以使用_Aggregates.searchMeta()_而不是_search()_来仅检索元数据信息。**使用这种方法，不会返回任何文档。** 因此，我们将使用它来计算也包含我们的关键词的90年代后期的电影数量。

为了有意义的过滤，我们还将在我们的_must_子句中包括_keywords_：

```java
public Document countLate90sMovies(String keywords) {
    List`````<Bson>````` pipeline = asList(
        searchMeta(
          compound()
            .must(asList(
              numberRange(
                fieldPath("year")
                .gteLt(1995, 2000),
              text(
                fieldPath("fullplot"), keywords
              )
            )),
          searchOptions()
            .index("idx-queries")
            .count(total())
        )
    );

    return collection.aggregate(pipeline)
      .first();
}
```

这次，_searchOptions()_包括对_SearchOptions.count(SearchCount.total())_的调用，这确保我们得到一个确切的总数（而不是根据集合大小可能更快的下限）。**此外，由于我们期望结果中只有一个对象，我们在_aggregate()_上调用_first()_。**

最后，让我们看看_countLate90sMovies("hacker assassin")_返回了什么：

```
{
    "count": {
        "total": 14
    }
}
```

**这在不包括我们结果中的文档的情况下，有助于获取有关我们集合的信息。**

## 6. 在结果上进行分面

在MongoDB Atlas Search中，分面查询是一个功能，允许我们检索有关搜索结果的聚合和分类信息。**它帮助我们根据不同标准分析和总结数据，提供对搜索结果分布的洞察。**

此外，它还允许我们将搜索结果分组成不同的类别或桶，并检索每个类别的计数或额外信息。**这有助于回答诸如“有多少文档匹配特定类别？”或“在结果中某个特定字段的最常见值是什么？”之类的问题。**

### 6.1. 创建静态索引

**在我们的第一个示例中，我们将创建一个分面查询，以提供有关自1900年代以来电影类型的信息，以及这些类型之间的关系。** 我们需要一个带有分面类型的索引，这在使用动态索引时我们无法拥有。

所以，让我们首先在我们的集合中创建一个新的搜索索引，我们将称之为_idx-facets_。注意，我们将保持_dynamic_为_true_，以便我们仍然可以查询未明确定义的字段：

```
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "genres": [
        {
          "type": "stringFacet"
        },
        {
          "type": "string"
        }
      ],
      "year": [
        {
          "type": "numberFacet"
        },
        {
          "type": "number"
        }
      ]
    }
  }
}
```

我们首先指定我们的映射不是动态的。然后，我们选择了我们对索引分面信息感兴趣的字段。**由于我们还想在我们的查询中使用过滤器，对于每个字段，我们指定了一个标准类型的索引（比如_string_）和一个分面类型的索引（比如_stringFacet_）。**

### 6.2. 运行分面查询

**创建分面查询涉及使用_searchMeta()_并启动一个_SearchCollector.facet()_方法来包括我们的分面和一个用于过滤结果的操作符。** 在定义分面时，我们必须选择一个名称，并使用一个与我们创建的索引类型相对应的_SearchFacet_方法。在我们的例子中，我们定义了一个_stringFacet()_和一个_numberFacet()_：

```java
public Document genresThroughTheDecades(String genre) {
    List pipeline = asList(
      searchMeta(
        facet(
          text(
            fieldPath("genres"), genre
          ),
          asList(
            stringFacet("genresFacet