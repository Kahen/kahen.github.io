---
date: 2024-06-29
category:
  - Java
  - Micronaut
tag:
  - API
  - 版本控制
head:
  - - meta
    - name: keywords
      content: Java, Micronaut, API, 版本控制
----
# Micronaut 中的 API 版本控制

在本教程中，我们将讨论如何利用 Micronaut 框架的功能来实现不断发展的 REST API。

在软件开发项目不断演变的领域中，有时完全基于 REST API，同时引入新功能和改进，同时保持向后兼容性是一个至关重要的挑战。实现这一点的一个基本方面是我们必须实现一种称为 API 版本控制的技术。

我们将探讨 Micronaut 中 API 版本控制的概念，Micronaut 是一个流行的微服务框架，用于构建高效且可扩展的应用程序。我们将深入探讨 API 版本控制的重要性，Micronaut 中实现它的不同策略，以及确保平滑版本过渡的最佳实践。

### 2. API 版本控制的重要性

API 版本控制是管理和发展应用程序编程接口（API）的做法，允许客户端在准备好时继续使用现有版本，同时也采用新版本。它有几个重要原因。

#### 2.1. 保持兼容性

随着应用程序的发展，我们可能需要更改我们的 API 以引入新功能、修复错误或提高性能。同时，确保这些更改不会干扰现有客户端也是必要的。**API 版本控制使我们能够在保持与以前版本的兼容性的同时引入更改**。

#### 2.2. 允许逐步采用

我们的 API 客户端可能有不同的采用新版本的计划。因此，提供多个版本的 API 允许客户端在合理的采用时间内更新他们的代码，减少破坏其应用程序的风险。

#### 2.3. 促进协作

它还促进了开发团队之间的协作。当不同的团队在系统的其他部分工作，或者第三方开发人员与我们的 API 集成时，版本控制允许每个团队即使在其他地方进行更改时也有一个稳定的接口。

### 3. Micronaut 中的 API 版本控制策略

**Micronaut 提供了不同的策略来实现 API 版本控制**。我们不会讨论哪一个是最好的，因为这在很大程度上取决于用例和项目的实际情况。尽管如此，我们可以讨论它们各自的具体情况。

#### 3.1. URI 版本控制

在 URI 版本控制中，API 的版本在 URI 中定义。**这种方法清楚地表明客户端正在使用的 API 版本**。尽管 URL 可能不如它可能的那样用户友好，但它向客户端明确了它使用的版本。

```java
@Controller("/v1/sheep/count")
public class SheepCountControllerV1 {

    @Get(
        uri = "{?max}",
        consumes = {"application/json"},
        produces = {"application/json"}
    )
    Flowable````<String>```` countV1(@Nullable Integer max) {
        // 实现
    }
}
```

虽然这可能不太实用，但我们的客户端对使用的版本很确定，这意味着透明度。从开发角度来看，很容易实现特定于特定版本的任何业务规则，这意味着很好的隔离。然而，有人可能会说它是侵入性的，因为 URI 可能会频繁更改。它可能需要客户端硬编码并增加了不完全特定于资源的额外上下文。

实现 API 版本控制的另一种选择是利用头部来路由请求到正确的控制器。这里是一个例子：

```java
@Controller("/dog")
public class DogCountController {

    @Get(value = "/count", produces = {"application/json"})
    @Version("1")
    public Flowable````<String>```` countV1(@QueryValue("max") @Nullable Integer max) {
        // 逻辑
    }

    @Get(value = "/count", produces = {"application/json"})
    @Version("2")
    public Flowable````<String>```` countV2(@QueryValue("max") @NonNull Integer max) {
        // 逻辑
    }
}
```

通过简单地使用 _@Version_ 注解，Micronaut 可以根据头部的值定向请求到正确的处理器。然而，我们仍然需要更改一些配置，正如我们接下来看到的：

```yaml
micronaut:
  router:
    versioning:
      enabled: true
      default-version: 2
      header:
        enabled: true
        names:
          - 'X-API-VERSION'
```

现在我们通过 Micronaut 启用了版本控制，将版本 2 定义为默认版本，以防没有指定版本。使用的策略将基于头部，头部 _X-API-VERSION_ 将用于确定版本。实际上，这是 Micronaut 默认查看的头部，所以在这种情况下，没有必要定义它，但如果我们想使用另一个头部，我们可以这样指定。

**使用头部，URI 保持清晰简洁，我们可以保留向后兼容性，URI 纯粹基于资源，它允许 API 的发展更加灵活**。然而，它不那么直观和可见。客户端必须意识到他想使用的版本，而且更容易出错。还有另一种类似的策略，它使用 MineTypes 来实现这一点。

#### 3.3. 参数版本控制

这种策略利用 URI 中的查询参数进行路由。在 Mircronaut 中的实现与前一种策略完全相同。我们只需要在我们的控制器中添加 @Version。然而，我们需要更改一些属性：

```yaml
micronaut:
  router:
    versioning:
      enabled: true
      default-version: 2
      parameter:
        enabled: true
        names: 'v,api-version'
```

有了这个，客户端只需要在每个请求中传递 _v_ 或 _api-version_ 作为查询参数，Micronat 就会为我们处理路由。

再次使用这种策略，URI 将没有与资源相关的信息，尽管比更改 URI 本身要少。除此之外，版本控制不那么显式，更容易出错。这是非 RESTful 的，需要文档以避免混淆。然而，我们也以欣赏解决方案的简单性。

#### 3.4. 自定义版本控制

Micronaut 还提供了一种自定义的方式来实现 API 版本控制，我们可以实施一个版本路由解析器并告诉 Micronaut 使用哪个版本。实现很简单，我们只需要实现一个接口，就像下面的例子：

```java
@Singleton
@Requires(property = "my.router.versioning.enabled", value = "true")
public class CustomVersionResolver implements RequestVersionResolver {

    @Inject
    @Value("${micronaut.router.versioning.default-version}")
    private String defaultVersion;

    @Override
    public Optional````<String>```` resolve(HttpRequest`<?>` request) {
        var apiKey = Optional.ofNullable(request.getHeaders().get("api-key"));

        if (apiKey.isPresent() && !apiKey.get().isEmpty()) {
            return Optional.of(Integer.parseInt(apiKey.get()) % 2 == 0 ? "2" : "1");
        }

        return Optional.of(defaultVersion);
    }

}
```

在这里，我们可以看到如何利用请求中的任何信息来实现路由策略，Micronaut 会做其余的事情。**这是强大的，但我们需要谨慎，因为这可能导致实现版本控制的形式较差和不太直观**。

## 4. 结论

在本文中，我们看到了如何使用 Micronaut 实现 API 版本控制。此外，我们还讨论了应用这种技术的不同策略及其细微差别。

**还很明显，选择正确的策略涉及权衡 URI 的清晰度、版本控制的显式性、易用性、向后兼容性、RESTful 遵守以及消费 API 的客户端的具体需求。最佳方法取决于我们项目的独特要求和限制**。

像往常一样，本文中使用的所有代码示例都可以在 GitHub 上找到。