---
date: 2024-06-21
category:
  - Spring Boot
  - OpenAPI
tag:
  - OpenAPI Generator
  - Custom Templates
head:
  - - meta
    - name: keywords
      content: Spring Boot, OpenAPI, Code Generation, Customization
  - - meta
    - name: description
      content: Learn how to customize OpenAPI Generator templates for Spring Boot applications.
------
# OpenAPI 生成器自定义模板 | Baeldung

OpenAPI 生成器是一个工具，它允许我们根据 REST API 定义快速生成客户端和服务器端代码，支持多种语言和框架。尽管大多数情况下生成的代码无需修改即可使用，但有时我们可能需要对其进行自定义。

在本教程中，我们将学习如何使用自定义模板来解决这些场景。

## 2. OpenAPI 生成器项目设置

在探索自定义之前，让我们快速浏览一下这个工具的典型使用场景：从给定的 API 定义生成服务器端代码。我们假设我们已经构建了一个基础的 Spring Boot MVC 应用程序，并使用 Maven，因此我们将使用适当的插件：

```xml
`<plugin>`
    ``<groupId>``org.openapitools``</groupId>``
    ``<artifactId>``openapi-generator-maven-plugin``</artifactId>``
    ``<version>``7.3.0``</version>``
    `<executions>`
        `<execution>`
            `<goals>`
                `<goal>`generate`</goal>`
            `</goals>`
            ```<configuration>```
                ```<inputSpec>```${project.basedir}/src/main/resources/api/quotes.yaml```</inputSpec>```
                ```<generatorName>```spring```</generatorName>```
                ```<supportingFilesToGenerate>```ApiUtil.java```</supportingFilesToGenerate>```
                ```<templateResourcePath>```${project.basedir}/src/templates/JavaSpring```</templateResourcePath>```
                `<configOptions>`
                    `<dateLibrary>`java8`</dateLibrary>`
                    `<openApiNullable>`false`</openApiNullable>`
                    `<delegatePattern>`true`</delegatePattern>`
                    `<apiPackage>`com.baeldung.tutorials.openapi.quotes.api`</apiPackage>`
                    `<modelPackage>`com.baeldung.tutorials.openapi.quotes.api.model`</modelPackage>`
                    `<documentationProvider>`source`</documentationProvider>`
                `</configOptions>`
            ``</configuration>``
        `</execution>`
    `</executions>`
`</plugin>`
```

使用此配置，生成的代码将进入 _target/generated-sources/openapi_ 文件夹。此外，我们的项目还需要添加对 OpenAPI V3 注解库的依赖：

```xml
`<dependency>`
    ``<groupId>``io.swagger.core.v3``</groupId>``
    ``<artifactId>``swagger-annotations``</artifactId>``
    ``<version>``2.2.3``</version>``
`</dependency>`
```

插件和此依赖项的最新版本可在 Maven Central 上找到：

- _openapi-generator-maven-plugin_
- _swagger-annotations_

本教程的 API 包含一个单一的 GET 操作，该操作返回给定金融工具符号的报价：

```yaml
openapi: 3.0.0
info:
  title: Quotes API
  version: 1.0.0
servers:
  - description: Test server
    url: http://localhost:8080
paths:
  /quotes/{symbol}:
    get:
      tags:
        - quotes
      summary: Get current quote for a security
      operationId: getQuote
      parameters:
        - name: symbol
          in: path
          required: true
          description: Security's symbol
          schema:
            type: string
            pattern: '[A-Z0-9]+'
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/QuoteResponse'
components:
  schemas:
    QuoteResponse:
      description: Quote response
      type: object
      properties:
        symbol:
          type: string
          description: security's symbol
        price:
          type: number
          description: Quote value
        timestamp:
          type: string
          format: date-time
```

即使没有编写任何代码，由于 _QuotesApi_ 的默认实现，生成的项目已经可以服务 API 调用——尽管它总是返回 502 错误，因为方法尚未实现。

## 3. API 实现

下一步是为 _QuotesApiDelegate_ 接口编写实现代码。由于我们使用委派模式，我们不需要担心 MVC 或 OpenAPI 特定的注解，因为这些将与生成的控制器分开。

这种方法确保了，如果我们稍后决定向项目中添加 SpringDoc 或类似的库，这些库所依赖的注解将始终与 API 定义同步。另一个好处是，合同的修改也会改变委派接口，从而使项目无法构建。这是好的，因为它最小化了代码优先方法可能发生的运行时错误。

在我们的案例中，实现包括一个使用 _BrokerService_ 检索报价的单一方法：

```java
@Component
public class QuotesApiImpl implements QuotesApiDelegate {

    // ... fields and constructor omitted

    @Override
    public ResponseEntity``<QuoteResponse>`` getQuote(String symbol) {
        var price = broker.getSecurityPrice(symbol);
        var quote = new QuoteResponse();
        quote.setSymbol(symbol);
        quote.setPrice(price);
        quote.setTimestamp(OffsetDateTime.now(clock));
        return ResponseEntity.ok(quote);
    }
}
```

我们还注入了一个 _Clock_ 来提供返回的 _QuoteResponse_ 所需的时间戳字段。这是一个小的实现细节，使得使用当前时间的单元测试代码更容易。例如，我们可以使用 _Clock.fixed()_ 来模拟测试代码在特定时间点的行为。实现类的单元测试使用这种方法。

最后，我们将实现一个 _BrokerService_，它简单地返回一个随机报价，这对我们的目的来说已经足够了。

我们可以通过运行集成测试来验证此代码是否按预期工作：

```java
@Test
void whenGetQuote_thenSuccess() {
    var response = restTemplate.getForEntity("http://localhost:" + port + "/quotes/BAEL", QuoteResponse.class);
    assertThat(response.getStatusCode())
      .isEqualTo(HttpStatus.OK);
}
```

## 4. OpenAPI 生成器自定义场景

到目前为止，我们已经实现了一个没有自定义的服务。让我们考虑以下场景：作为 API 定义的作者，我希望指定给定操作可能返回缓存的结果。OpenAPI 规范允许通过称为 _vendor extensions_ 的机制来实现这种非标准行为，它可以应用于许多（但不是全部）元素。

对于我们的示例，我们将定义一个 _x-spring-cacheable_ 扩展，应用于我们希望具有这种行为的任何操作。这是我们初始 API 的修改版本，应用了此扩展：

```yaml
# ... other definitions omitted
paths:
  /quotes/{symbol}:
    get:
      tags:
        - quotes
      summary: Get current quote for a security
      operationId: getQuote
      x-spring-cacheable: true
      parameters:
# ... more definitions omitted
```

现在，如果我们再次运行生成器 _mvn generate-sources_，什么也不会发生。这是预期的，因为尽管仍然有效，生成器不知道如何处理这个扩展。更准确地说，生成器使用的模板没有利用这个扩展。

仔细检查生成的代码，我们可以看到通过在与我们的扩展匹配的 API 操作的委派接口方法上添加 _@Cacheable_ 注解来实现我们的目标。让我们接下来探索如何做到这一点。

### 4.1. 自定义选项

OpenAPI 生成器工具支持两种自定义方法：

- 添加一个新的自定义生成器，从头开始创建或通过扩展现有生成器
- 用自定义模板替换现有生成器使用的模板

第一种选项更加“重量级”，但允许完全控制生成的工件。当我们的目标是支持新框架或语言的代码生成时，这是唯一的选项，但这里我们不会涵盖它。

现在，我们只需要更改一个模板，这是第二个选项。那么，第一步就是找到这个模板。官方文档建议使用工具的 CLI 版本来提取给定生成器的所有模板。

然而，当使用 Maven 插件时，直接在 GitHub 存储库中查找通常更方便。**注意，为了确保兼容性，我们选择了与正在使用的插件版本相对应的标签的源代码树**。

在 _resources_ 文件夹中，每个子文件夹都有用于特定生成器目标的模板。对于基于 Spring 的项目，文件夹名称是 _JavaSpring_。在那里，我们将找到用于呈现服务器代码的 Mustache 模板。大多数模板的命名都很有意义，所以不难弄清楚我们需要哪一个：_apiDelegate.mustache_。

### 4.2. 模板自定义

**一旦我们找到了想要自定义的模板，下一步就是将它们放在我们的项目中，以便 Maven 插件可以使用它们**。我们将把即将自定义的模板放在 _src/templates/JavaSpring_ 文件夹下，这样它就不会与其他源代码或资源混合。

接下来，我们需要向插件添加一个配置选项，告知我们的目录：

```xml
```<configuration>```
    ```<inputSpec>```${project.basedir}/src/main/resources/api/quotes.yaml```</inputSpec>```
    ```<generatorName>```spring```</generatorName>```
    ```<supportingFilesToGenerate>```ApiUtil.java```</supportingFilesToGenerate>```
    ```<templateResourcePath>```${project.basedir}/src/templates/JavaSpring```</templateResourcePath>```
    ... 其他未更改的属性省略
``</configuration>``
```

为了验证生成器是否正确配置，让我们在模板顶部添加一条注释并重新生成代码：

```java
/*
 * Generated code: do not modify !
 * Custom template with support for x-spring-cacheableextension
 */
package {{package}};
... more template code omitted
```

接下来，运行 _mvn clean generate-sources_ 将产生带有注释的新版本的 _QuotesDelegateApi_：

```java
/*
 * Generated code: do not modify!
 * Custom template with support for x-spring-cacheable extension
 */
package com.baeldung.tutorials.openapi.quotes.api;

... more code omitted
```

**这表明生成器选择了我们的自定义模板，而不是原生的模板。**

### 4.3. 探索基础模板

现在，让我们看看我们的模板，找到添加自定义的正确位置。我们可以看到，有一个由 _{{#operation}}_ _{{/operation}}_ 标签定义的部分，在渲染的类中输出委派的方法：

```java
    {{#operation}}
        // ... many mustache tags omitted
        {{#jdk8-default-interface}}default // ... more template logic omitted

    {{/operation}}
```

在这个部分，模板使用当前上下文的多个属性——一个操作——来生成相应的方法声明。

特别是，我们可以在 _{{vendorExtension}}_ 下找到有关供应商扩展的信息。这是一个映射，键是扩展名称，值是我们在定义中放置的任何数据的直接表示。**这意味着我们可以使用扩展，其中值为任意对象或只是一个简单的字符串。**

为了获得生成器传递给模板引擎的完整数据结构的 JSON 表示，添加以下 _globalProperties_ 元素到插件的配置中：

```xml
```<configuration>```
    ```<inputSpec>```${project.basedir}/src/main/resources/api/quotes.yaml```</inputSpec>```
    ```<generatorName>```spring```</generatorName>```
    ```<supportingFilesToGenerate>```ApiUtil.java```</supportingFilesToGenerate>```
    ```<templateResourcePath>```${project.basedir}/src/templates/JavaSpring```</templateResourcePath>```
    `<globalProperties>`
        `<debugOpenAPI>`true`</debugOpenAPI>`
        `<debugOperations>`true`</debugOperations>`
    `</globalProperties>`
...more configuration options omitted
```

现在，当我们再次运行 _mvn generate-sources_ 时，输出将在消息 _\## Operation Info##_ 之后有这个 JSON 表示：

```json
[INFO] ############ Operation info ############
[ {
  "appVersion" : "1.0.0",
... many, many lines of JSON omitted
```

### 4.4. 为操作添加 _@Cacheable_

我们现在准备添加所需的逻辑来支持缓存操作结果。**可能有用的一个方面是允许用户指定缓存名称，但不是要求他们这样做。**

为了支持这个要求，我们将支持我们的供应商扩展的两种变体。如果值仅仅是 _true_，将使用默认的缓存名称：

```yaml
paths:
  /some/path:
    get:
      operationId: getSomething
      x-spring-cacheable: true
```

否则，它将期望一个具有名称属性的对象，我们将使用该名称作为缓存名称：

```yaml
paths:
  /some/path:
    get:
      operationId: getSomething
      x-spring-cacheable:
        name: mycache
```

这是带有支持两种变体所需逻辑的修改后的模板：

```java
{{#vendorExtensions.x-spring-cacheable}}
@org.springframework.cache.annotation.Cacheable({{#name}}"{{.}}"{{/name}}{{^name}}"default"{{/name}})
{{/vendorExtensions.x-spring-cacheable}}
{{#jdk8-default-interface}}default // ... template logic omitted

```

**我们在方法签名定义之前添加了逻辑来添加注解。** 注意使用 _{{#vendorExtensions.x-spring-cacheable}}_ 来访问扩展值。**根据 Mustache 规则，内部代码只有在值是“真值”时才会执行，这意味着在 _Boolean_ 上下文中评估为 _true_ 的任何东西。** 尽管这定义有点松散，但在这里工作得很好，而且非常易读。

至于注解本身，我们选择了“default”作为默认缓存名称。这允许我们进一步自定义缓存，尽管如何做到这一点的细节不在本教程的范围内。

## 5. 使用修改后的模板

最后，让我们修改我们的 API 定义以使用我们的扩展：

```yaml
... more definitions omitted
paths:
  /quotes/{symbol}:
    get:
      tags:
        - quotes
      summary: Get current quote for a security
      operationId: getQuote
      x-spring-cacheable: true
        name: get-quotes
```

让我们再次运行 _mvn generate-sources_ 来创建 _QuotesApiDelegate_ 的新版本：

```java
... other code omitted
@org.springframework.cache.annotation.Cacheable("get-quotes")
default ResponseEntity``<QuoteResponse>`` getQuote(String symbol) {
... default method's body omitted
```

我们看到委派接口现在有了 _@Cacheable_ 注解。此外，我们看到这个缓存名称对应于 API 定义中的 _name_ 属性。

**现在，为了使这个注解有任何效果，我们还需要在 _@Configuration_ 类或像我们的情况一样，在主类中添加 _@EnableCaching_ 注解**：

```java
@SpringBootApplication
@EnableCaching
public class QuotesApplication {
    public static void main(String[] args) {
        SpringApplication.run(QuotesApplication.class, args);
    }
}
```

为了验证缓存是否按预期工作，让我们编写一个集成测试，多次调用 API：

```java
@Test
void whenGetQuoteMultipleTimes_thenResponseCached() {

    var quotes = IntStream.range(1, 10).boxed()
      .map((i) -> restTemplate.getForEntity("http://localhost:" + port + "/quotes/BAEL", QuoteResponse.class))
      .map(HttpEntity::getBody)
      .collect(Collectors.groupingBy((q -> q.hashCode()), Collectors.counting()));

    assertThat(quotes.size()).isEqualTo(1);
}
```

我们期望所有响应都返回相同的值，所以我们将它们收集起来，并按它们的哈希码分组。如果所有响应产生相同的哈希码，那么结果映射将只有一个条目。**请注意，这种策略有效是因为生成的模型类使用所有字段实现了 _hashCode()_ 方法**。

## 6. 结论

在本文中，我们展示了如何配置 OpenAPI 生成器工具以使用自定义模板，以添加对简单供应商扩展的支持。

像往常一样，所有代码都可以在 GitHub 上找到。