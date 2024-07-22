---
date: 2022-04-01
category:
  - Spring Boot
  - GraphQL
tag:
  - Domain Graph Service
  - Netflix DGS
head:
  - - meta
    - name: keywords
      content: Spring Boot, GraphQL, Domain Graph Service, Netflix DGS, DGS Framework, Kotlin, Java, Code Generation
---
# Domain Graph Service (DGS) 框架简介

## 1. 概述

在过去几年中，客户端/服务器通信方面最重要的范式变化之一是 GraphQL，它是一种开源的查询语言和运行时，用于操作 API。我们可以使用它来请求我们所需的确切数据，从而限制我们需要的请求数量。

Netflix 创建了一个域图服务框架（DGS），以使事情更加容易。在这个快速教程中，我们将涵盖 DGS 框架的关键特性。我们将看到如何将此框架添加到我们的应用程序中，并检查其基本注释的工作原理。要了解更多关于 GraphQL 本身的信息，请查看我们的 GraphQL 介绍文章。

Netflix DGS（域图服务）是一个用 Kotlin 编写并基于 Spring Boot 的 GraphQL 服务器框架。它旨在除了 Spring 框架之外具有最小的外部依赖性。

**Netflix DGS 框架使用了一个基于 Spring Boot 的注释式 GraphQL Java 库。** 除了基于注释的编程模型外，它还提供了几个有用的特性。**它允许从 GraphQL 架构生成源代码。** **让我们总结一下一些关键特性：**
- 基于注释的 Spring Boot 编程模型
- 用于将查询测试编写为单元测试的测试框架
- Gradle/Maven 代码生成插件，用于根据架构创建类型
- 与 GraphQL 联合的轻松集成
- 与 Spring Security 的集成
- GraphQL 订阅（WebSockets 和 SSE）
- 文件上传
- 错误处理
- 许多扩展点

## 3. 配置

首先，由于 DGS 框架基于 Spring Boot，让我们创建一个 Spring Boot 应用程序。然后，让我们将 DGS 依赖项添加到我们的项目中：

```
`<dependency>`
    `<groupId>`com.netflix.graphql.dgs`</groupId>`
    `<artifactId>`graphql-dgs-spring-boot-starter`</artifactId>`
    `<version>`4.9.16`</version>`
`</dependency>`
```

## 4. 架构

### 4.1. 开发方法
**DGS 框架支持架构优先和代码优先两种开发方法。** 但推荐的方法是基于架构的，主要是因为它更容易跟上数据模型的变化。架构优先意味着我们首先为 GraphQL 服务定义架构，然后我们通过匹配架构中的定义来实现代码。框架默认会获取 _src/main/resources/schema_ 文件夹中的任何架构文件。

### 4.2. 实现
让我们使用架构定义语言（SDL）为我们的示例应用程序创建一个简单的 GraphQL 架构：

```
type Query {
    albums(titleFilter: String): [Album]
}

type Album {
    title: String
    artist: String
    recordNo: Int
}
```

这个架构允许查询专辑列表，并可选择通过 _title_ 进行过滤。

## 5. 基本注释

让我们开始创建一个与我们的架构相对应的 _Album_ 类：

```
public class Album {
    private final String title;
    private final String artist;
    private final Integer recordNo;

    public Album(String title, String artist, Integer recordNo) {
        this.title = title;
        this.recordNo = recordNo;
        this.artist = artist;
    }

    // 标准 getter 方法
}
```

### 5.1. 数据获取器
数据获取器负责返回查询的数据。**@DgsQuery、@DgsMutation 和 @DgsSubscription 注释是定义查询、变更和订阅类型的数据获取器的简写。** 所有提到的注释等同于 @DgsData 注释。我们可以使用这些注释之一在 Java 方法上，使该方法成为数据获取器，并定义一个带有参数的类型。

### 5.2. 实现
**因此，要定义 DGS 数据获取器，我们需要在 @DgsComponent 类中创建一个查询方法。** 我们想要查询示例中的 _Albums_ 列表，所以让我们用 @DgsQuery 标记该方法：

```
private final List``<Album>`` albums = Arrays.asList(
  new Album("Rumours", "Fleetwood Mac", 20),
  new Album("What's Going On", "Marvin Gaye", 10),
  new Album("Pet Sounds", "The Beach Boys", 12)
  );

@DgsQuery
public List``<Album>`` albums(@InputArgument String titleFilter) {
    if (titleFilter == null) {
        return albums;
    }
    return albums.stream()
      .filter(s -> s.getTitle().contains(titleFilter))
      .collect(Collectors.toList());
}
```

我们还用 _@InputArgument_ 注释标记了方法的参数。这个注释将使用方法参数的名称来匹配查询中发送的输入参数的名称。

## 6. 代码生成插件

DGS 还附带了一个代码生成插件，可以从 GraphQL 架构生成 Java 或 Kotlin 代码。代码生成通常与构建集成。

**DGS 代码生成插件可用于 Gradle 和 Maven。** 插件根据我们的领域图服务的 GraphQL 架构文件在项目构建过程中生成代码。**插件可以生成类型、输入类型、枚举和接口的数据类型，示例数据获取器和类型安全查询 API。** 还有一个 _DgsConstants_ 类，包含类型和字段的名称。

## 7. 测试

查询我们 API 的方便方式是 GraphiQL。**GraphiQL 是一个查询编辑器，随 DGS 框架一起提供。** 让我们在默认的 Spring Boot 端口启动应用程序，并检查 URL _http://localhost:8080/graphiql_。让我们尝试以下查询并测试结果：

请注意，与 REST 不同，我们必须特别列出我们希望从查询中返回的字段。让我们看看响应：

```
{
  "data": {
    "albums": [
      {
        "title": "Rumours"
      },
      {
        "title": "What's Going On"
      },
      {
        "title": "Pet Sounds"
      }
    ]
  }
}
```

## 8. 结论

域图服务框架是使用 GraphQL 的一种简单且相当有吸引力的方式。它使用更高层次的构建块来处理查询执行等。DGS 框架使所有这些通过方便的 Spring Boot 编程模型可用。本文涵盖了此框架的一些有用特性。

我们讨论了如何在应用程序中配置 DGS，并查看了一些其基本注释。然后，我们编写了一个简单的应用程序来检查如何从架构创建数据并查询它们。最后，我们使用 GraphiQL 测试了我们的 API。示例可以在 GitHub 上找到。