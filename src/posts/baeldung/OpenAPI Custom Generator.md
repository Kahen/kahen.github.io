---
date: 2024-06-16
category:
  - Java
  - OpenAPI
tag:
  - OpenAPI Generator
  - Apache Camel
---
# OpenAPI 自定义生成器 | Baeldung

## 1. 引言

在本教程中，我们将继续探索 OpenAPI Generator 的自定义选项。这次，我们将展示创建一个新生成器所需的步骤，该生成器为基于 Apache Camel 的应用程序创建 REST 生产者路由。

## 2. 为什么要创建一个新的生成器？

在之前的教程中，我们已经展示了如何自定义现有生成器的模板以适应特定的用例。

**然而，有时我们将面临无法使用任何现有生成器的情况**。例如，当我们需要针对新的语言或 REST 框架时就是这种情况。

作为一个具体的例子，当前版本的 OpenAPI Generator 对 Apache Camel 的集成框架仅支持生成消费者路由。在 Camel 的术语中，这些路由接收 REST 请求，然后将其发送到调解逻辑。

现在，如果我们想从路由中调用 REST API，我们通常会使用 Camel 的 REST 组件。以下是使用 DSL 的调用示例：

```
from(GET_QUOTE)
  .id(GET_QUOTE_ROUTE_ID)
  .to("rest:get:/quotes/{symbol}?outType=com.baeldung.tutorials.openapi.quotes.api.model.QuoteResponse");
```

我们可以看到，这段代码的某些方面将从自动生成中受益：

- 从 API 定义中派生端点参数
- 指定输入和输出类型
- 响应有效载荷验证
- 跨项目的一致路由和 ID 命名

**此外，使用代码生成来解决这些横切关注点确保了，随着被调用 API 随时间的演变，生成的代码将始终与合同保持同步**。

## 3. 创建 OpenAPI 生成器项目

**从 OpenAPI 的角度来看，自定义生成器只是一个实现 _CodegenConfig_ 接口的常规 Java 类**。让我们通过引入所需的依赖项来开始我们的项目：

```
``<dependency>``
    ```<groupId>```org.openapitools```</groupId>```
    ```<artifactId>```openapi-generator```</artifactId>```
    ```<version>```7.5.0```</version>```
    `<scope>`provided`</scope>`
``</dependency>``
```

这个依赖项的最新版本可在 Maven Central 上获得。

在运行时，生成器的核心逻辑使用 JRE 的标准服务机制来查找和注册所有可用的实现。**这意味着我们必须在 _META-INF/services_ 下创建一个文件，其中包含我们的 _CodegenConfig_ 实现的完全限定名称**。在使用标准 Maven 项目布局时，此文件位于 _src/main/resources_ 文件夹下。

OpenAPI 生成器工具还支持基于 Maven 的自定义生成器项目的生成。以下是我们如何使用几个 shell 命令来引导项目的方法：

```
mkdir -p target wget -O target/openapi-generator-cli.jar https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.5.0/openapi-generator-cli-7.5.0.jar
java -jar target/openapi-generator-cli.jar meta -o . -n java-camel-client -p com.baeldung.openapi.generators.camelclient
```

## 4. 实现生成器

如上所述，我们的生成器必须实现 _CodegenConfig_ 接口。然而，如果我们仔细观察，可能会感到有点害怕。毕竟，它有惊人的 155 个方法！

幸运的是，核心逻辑已经提供了我们可以扩展的 _DefaultCodegen_ 类。**这大大简化了我们的任务，因为我们所要做的就是覆盖几个方法就可以得到一个工作正常的生成器**。

```
public class JavaCamelClientGenerator extends DefaultCodegen {
    // 根据需要覆盖方法
}
```

### 4.1. 生成器元数据

我们应该实现的第一批方法包括 _getName()_ 和 _getTag()_。第一个应该返回用户将用于告知集成插件或 CLI 工具他们想要使用我们的生成器的友好名称。**一个常见的约定是使用由目标语言、REST 库/框架和类型 - _client_ 或 _server_ 组成的三部分标识符**：

```
public String getName() {
    return "java-camel-client";
}
```

至于 _getTag()_ 方法，我们应该返回一个与我们生成的代码类型相匹配的 _CodegenType_ 枚举值，对我们来说，是 _CLIENT_：

```
public CodegenType getTag() {
    return CodegenType.CLIENT;
}
```

### 4.2. 帮助说明

**从可用性的角度来看，一个重要的方面是为我们的生成器的目的和选项提供给最终用户有用的信息**。我们应该使用 _getHelp()_ 方法返回这些信息。

在这里，我们只是返回其目的的简要描述，但完整的实现将添加额外的细节，并理想地，提供在线文档的链接：

```
public String getHelp() {
    return "生成调用 API 操作的 Camel 生产者路由。";
}
```

### 4.3. 目标文件夹

给定一个 API 定义，生成器将输出几个工件：

- API 实现（客户端或服务器）
- API 测试
- API 文档
- 模型
- 模型测试
- 模型文档

**对于每种工件类型，都有一个相应的方法返回生成路径将要去的路径**。让我们看看这两种方法的实现：

```
@Override
public String modelFileFolder() {
    return outputFolder() + File.separator + sourceFolder +
      File.separator + modelPackage().replace('.', File.separatorChar);
}

@Override
public String apiFileFolder() {
    return outputFolder() + File.separator + sourceFolder +
      File.separator + apiPackage().replace('.', File.separatorChar);
}
```

在这两种情况下，我们使用继承的 _outputFolder()_ 方法作为起点，然后附加 _sourceFolder_ - 稍后将更多地讨论此字段 - 以及转换为路径的目标包。

**在运行时，这些部分的值将来自通过命令行选项或可用集成（Maven、Gradle 等）传递给工具的配置选项**。

### 4.4. 模板位置

正如我们在模板定制教程中看到的，每个生成器使用一组模板来生成目标工件。**对于内置生成器，我们可以替换模板，但我们不能重命名或添加新的模板**。

另一方面，自定义生成器没有这个限制。在构造时，我们可以使用 _xxxTemplateFiles()_ 方法注册任意多的模板。

每个这些 _xxxTemplateFIles()_ 方法返回一个可修改的映射，我们可以向其中添加我们的模板。每个映射条目都有模板名称作为其键和生成文件扩展名作为其值。

对于我们的 Camel 生成器，这是生产者模板注册的样子：

```
public JavaCamelClientGenerator() {
    super();
    // ...其他配置省略
    apiTemplateFiles().put("camel-producer.mustache",".java");
    // ...其他配置省略
}
```

这段代码注册了一个名为 _camel-producer.mustache_ 的模板，它将被用于输入文档中定义的每个 API。**生成的文件将根据 API 的名称命名，并加上给定的扩展名（在本例中为 ".java"）**。

注意，没有要求扩展名以点字符开头。我们可以使用这个事实为给定的 API 生成多个文件。

我们还必须使用 _setTemplateDir()_ 配置模板的基本位置。一个好的约定是使用生成器的名称，这避免了与任何内置生成器的冲突：

```
setTemplateDir("java-camel-client");
```

### 4.5. 配置选项

**大多数生成器支持和/或需要用户提供的值，这些值将以这样或那样的方式影响代码生成**。我们必须在构造时使用 _cliOptions()_ 来注册我们将支持的选项，以访问由 _CliOption_ 对象组成的可修改列表。

在我们的例子中，我们将只添加两个选项：一个用于设置生成类的目的地 Java 包，另一个用于相对于输出路径的源目录。两者都将有合理的默认值，因此用户不必指定它们：

```
public JavaCamelClientGenerator() {
    // ...其他配置省略
    cliOptions().add(
      new CliOption(CodegenConstants.API_PACKAGE,CodegenConstants.API_PACKAGE_DESC)
        .defaultValue(apiPackage));
    cliOptions().add(
      new CliOption(CodegenConstants.SOURCE_FOLDER, CodegenConstants.SOURCE_FOLDER_DESC)
        .defaultValue(sourceFolder));
}
```

我们使用 _CodegenConstants_ 来指定选项名称和描述。**尽可能使用这些常量而不是使用我们自己的选项名称**。这使用户更容易在具有类似功能的生成器之间切换，并促进了对他们的一致体验。

### 4.6. 处理配置选项

生成器核心在开始实际生成之前调用 _processOpts()_，因此我们有机会在模板处理之前设置任何所需的状态。

**在这里，我们将使用此方法来捕获 _sourceFolder_ 配置选项的实际值**。这将由目标文件夹方法用来评估不同生成文件的最终目的地：

```
public void processOpts() {
    super.processOpts();

    if (additionalProperties().containsKey(CodegenConstants.SOURCE_FOLDER)) {
        sourceFolder = ((String) additionalProperties().get(CodegenConstants.SOURCE_FOLDER));
        // ...源文件夹验证省略
    }
}
```

在此方法中，我们使用 _additionalProperties()_ 检索用户和/或预配置属性的映射。这也是在实际生成开始之前，我需要澄清一点：由于网页内容较长，我将分两部分来完成翻译。下面是第一部分的翻译，接下来我将继续翻译剩余的部分。

```
@Override
public void processOpts() {
    super.processOpts();

    if (additionalProperties().containsKey(CodegenConstants.SOURCE_FOLDER)) {
        sourceFolder = ((String) additionalProperties().get(CodegenConstants.SOURCE_FOLDER));
        // ...源文件夹验证省略
    }
}
```

在这个方法中，我们使用 `additionalProperties()` 来检索用户和/或预配置属性的映射。这也是在实际生成开始前验证所提供选项是否有效的最后机会。

截至撰写本文时，如果在这一点上通知不一致性的唯一方法是抛出 `RuntimeException()`，通常是一个 `IllegalArgumentException()`。**这种方法的缺点是用户会得到错误消息以及非常糟糕的堆栈跟踪，这不是最好的体验**。

### 4.7. 附加文件

**尽管在我们的例子中不需要，但值得注意的是，我们也可以生成与 API 和模型没有直接关系的文件**。例如，我们可以生成 `pom.xml`、`README`、`.gitignore` 文件，或我们想要的任何其他文件。

对于每个附加文件，我们必须在构造时向 `additionalFiles()` 方法返回的列表中添加一个 `SupportingFile` 实例。一个 `SupportingFile` 实例是一个包含以下内容的元组：

- 模板名称
- 相对于指定输出文件夹的目标文件夹
- 输出文件名称

以下是我们如何注册一个模板以在输出文件夹的根目录生成 `README` 文件的方式：

```
public JavaCamelClientGenerator() {
    // ...其他配置省略
    supportingFiles().add(new SupportingFile("readme.mustache","","README.txt"));
}
```

### 4.8. 模板助手

**默认模板引擎 Mustache 在渲染之前操作数据方面，按设计非常有限**。例如，该语言本身没有字符串操作功能，如分割、替换等。

如果我们的模板逻辑需要它们，我们必须使用助手类，也称为 lambdas。助手必须实现 `Mustache.Lambda` 并通过在我们的生成器类中实现 `addMustacheLambdas()` 来注册：

```
protected ImmutableMap.Builder``<String, Mustache.Lambda>`` addMustacheLambdas() {
    ImmutableMap.Builder``<String, Mustache.Lambda>`` builder = super.addMustacheLambdas();
    return builder
      .put("javaconstant", new JavaConstantLambda())
      .put("path", new PathLambda());
}
```

这里，我们首先调用基类实现，以便我们可以重用其他可用的 lambdas。这返回了一个 `ImmutableMap.Builder` 实例，我们可以向其中添加我们的助手。键是我们将在模板中调用 lambda 的名称，值是所需类型的 lambda 实例。

一旦注册，我们就可以在模板中使用上下文中可用的 `lambda` 映射来使用它们：

```
{{#lambda.javaconstant}}...任何有效的 mustache 内容...{{/lambda.javaconstant}}
```

我们的 Camel 模板需要两个助手：一个用于从方法的 `operationId` 派生合适的 Java 常量名称，另一个用于从 URL 中提取路径。让我们看看后者：

```
public class PathLambda implements Mustache.Lambda {
    @Override
    public void execute(Template.Fragment fragment, Writer writer) throws IOException {
        String maybeUri = fragment.execute();
        try {
            URI uri = new URI(maybeUri);
            if (uri.getPath() != null) {
                writer.write(uri.getPath());
            } else {
                writer.write("/");
            }
        } catch (URISyntaxException e) {
            // 不是 URI。保持原样
            writer.write(maybeUri);
        }
    }
}
```

`execute()` 方法有两个参数。第一个是 `Template.Fragment`，它允许我们使用 `execute()` 访问模板传递给 lambda 的任何表达式的值。一旦我们有了实际的内容，我们应用我们的逻辑来提取 URI 的路径部分。

最后，我们使用作为第二个参数传递的 `Writer`，将结果发送到处理流程。

通常，这是生成器项目中最需要努力的部分。然而，我们可以以另一种语言/框架的现有模板为起点。

此外，由于我们之前已经介绍过这个话题，我们在这里不会详细介绍。我们将假设生成的代码将是 Spring Boot 应用程序的一部分，因此我们不会生成一个完整的项目。相反，我们将只为每个 API 生成一个扩展 `RouteBuilder` 的 `@Component` 类。

对于每个操作，我们将添加一个用户可以调用的 "direct" 路由。每个路由使用 DSL 定义一个从相应操作创建的 rest 目的地。

虽然结果模板远非生产级别，但可以通过添加错误处理、重试策略等功能进一步增强。

## 5. 单元测试

对于基本测试，我们可以使用 `CodegenConfigurator` 在常规单元测试中验证我们生成器的基本功能：

```
public void whenLaunchCodeGenerator_thenSuccess() throws Exception {
    Map`<String, Object>` opts = new HashMap<>();
    opts.put(CodegenConstants.SOURCE_FOLDER, "src/generated");
    opts.put(CodegenConstants.API_PACKAGE,"test.api");

    CodegenConfigurator configurator = new CodegenConfigurator()
      .setGeneratorName("java-camel-client")
      .setInputSpec("petstore.yaml")
      .setAdditionalProperties(opts)
      .setOutputDir("target/out/java-camel-client");

    ClientOptInput clientOptInput = configurator.toClientOptInput();
    DefaultGenerator generator = new DefaultGenerator();
    generator.opts(clientOptInput)
      .generate();

    File f = new File("target/out/java-camel-client/src/generated/test/api/PetApi.java");
    assertTrue(f.exists());
}
```

这个测试模拟了使用示例 API 定义和标准选项的典型执行。然后它验证它是否在预期位置产生了一个文件：在我们的案例中，是一个以 API 的标签命名的单个 Java 文件。

## 6. 集成测试

**尽管有用，单元测试并不解决生成代码本身的功能**。例如，即使文件看起来不错并且可以编译，它在运行时可能不会正确行为。

为了确保这一点，我们需要一个更复杂的测试设置，其中生成器的输出与所需的库、模拟等一起编译和运行。

**一个更简单的方法是使用一个专用项目来使用我们的自定义生成器**。在我们的例子中，示例项目是一个基于 Maven 的 Spring Boot/Camel 项目，我们向其中添加了 OpenAPI Generator 插件：

```
`<plugins>`
    `<plugin>`
        ```<groupId>```org.openapitools```</groupId>```
        ```<artifactId>```openapi-generator-maven-plugin```</artifactId>```
        ```<version>```${openapi-generator.version}```</version>```
        ``<configuration>``
            `<skipValidateSpec>`true`</skipValidateSpec>`
            `<inputSpec>`${project.basedir}/src/main/resources/api/quotes.yaml`</inputSpec>`
        ``</configuration>``
        `<executions>`
            `<execution>`
                `<id>`generate-camel-client`</id>`
                `<goals>`
                    `<goal>`generate`</goal>`
                `</goals>`
                ``<configuration>``
                    `<generatorName>`java-camel-client`</generatorName>`
                    `<generateModels>`false`</generateModels>`
                    `<configOptions>`
                        `<apiPackage>`com.baeldung.tutorials.openapi.quotes.client`</apiPackage>`
                        `<modelPackage>`com.baeldung.tutorials.openapi.quotes.api.model`</modelPackage>`
                    `</configOptions>`
                ``</configuration>``
            `</execution>`
            ...其他执行省略
        `</executions>`
        `<dependencies>`
            ``<dependency>``
                ```<groupId>```com.baeldung```</groupId>```
                ```<artifactId>```openapi-custom-generator```</artifactId>```
                ```<version>```0.0.1-SNAPSHOT```</version>```
            ``</dependency>``
        `</dependencies>`
    `</plugin>`
    ...其他插件省略
`</plugins>`
```

**注意我们如何将我们的自定义生成器工件作为插件依赖项添加。这允许我们为 _generatorName_ 配置参数指定 java-camel-client**。

另外，由于我们的生成器不支持模型生成，在完整的 _pom.xml_ 中我们添加了插件的第二个执行，使用现成的 Java 生成器。

现在，我们可以使用任何测试框架来验证生成的代码是否按预期工作。使用 Camel 的测试支持类，这是一个典型的测试的样子：

```
@SpringBootTest
class ApplicationUnitTest {
    @Autowired
    private FluentProducerTemplate producer;

    @Autowired
    private CamelContext camel;

    @Test
    void whenInvokeGeneratedRoute_thenSuccess() throws Exception {
        AdviceWith.adviceWith(camel, QuotesApi.GET_QUOTE_ROUTE_ID, in -> {
            in.mockEndpointsAndSkip("rest:*");
        });

        Exchange exg = producer.to(QuotesApi.GET_QUOTE)
          .withHeader("symbol", "BAEL")
          .send();
        assertNotNull(exg);
    }
}
```

## 7. 结论

在本教程中，我们展示了创建 OpenAPI 生成器工具的自定义生成器所需的步骤。我们还展示了如何使用测试项目在现实场景中验证生成的代码。

像往常一样，所有代码都可以在 GitHub 上找到。
```

我将继续翻译剩余的部分。请稍等片刻。