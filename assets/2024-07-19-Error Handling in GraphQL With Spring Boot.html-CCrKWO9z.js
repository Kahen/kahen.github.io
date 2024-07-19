import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-CqB7ipbU.js";const a={},l=t(`<hr><h1 id="graphql中的错误处理与spring-boot" tabindex="-1"><a class="header-anchor" href="#graphql中的错误处理与spring-boot"><span>GraphQL中的错误处理与Spring Boot</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习GraphQL中的错误处理选项。我们将查看GraphQL规范对错误响应的说明。因此，我们将开发一个使用Spring Boot的错误处理示例。</p><h2 id="_2-根据graphql规范的响应" tabindex="-1"><a class="header-anchor" href="#_2-根据graphql规范的响应"><span>2. 根据GraphQL规范的响应</span></a></h2><p>根据GraphQL规范，收到的每个请求都必须返回一个格式良好的响应。这个格式良好的响应由相应成功或不成功的请求操作的数据或错误映射组成。此外，响应可能包含部分成功的结果数据和字段错误。</p><p><strong>响应映射的关键组件是_errors_、<em>data_和_extensions</em>。</strong></p><p>响应中的_errors_部分描述了请求操作期间的任何失败。如果没有发生错误，则响应中必须不包含_errors_组件。在下一节中，我们将查看规范中描述的不同类型错误。</p><p>_data_部分描述了请求操作成功执行的结果。如果操作是查询，则此组件是查询根操作类型的一个对象。另一方面，如果操作是变异，则此组件是变异根操作类型的一个对象。</p><p>如果请求操作在执行之前由于缺少信息、验证错误或语法错误而失败，则响应中必须不包含_data_组件。如果操作在执行过程中失败并且结果不成功，则_data_组件必须为_null_。</p><p>响应映射可能包含一个名为_extensions_的附加组件，这是一个映射对象。该组件便于实现者根据需要在响应中提供其他自定义内容。因此，其内容格式没有额外的限制。</p><p><strong>如果响应中没有_data_组件，则_errors_组件必须存在，并且必须至少包含一个错误。</strong> 进一步地，它应该指明失败的原因。</p><p>这里是一个GraphQL错误的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mutation {
  addVehicle(vin: &quot;NDXT155NDFTV59834&quot;, year: 2021, make: &quot;Toyota&quot;, model: &quot;Camry&quot;, trim: &quot;XLE&quot;,
             location: {zipcode: &quot;75024&quot;, city: &quot;Dallas&quot;, state: &quot;TX&quot;}) {
    vin
    year
    make
    model
    trim
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当违反唯一约束时，错误响应将如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;data&quot;: null,
  &quot;errors&quot;: [
    {
      &quot;errorType&quot;: &quot;DataFetchingException&quot;,
      &quot;locations&quot;: [
        {
          &quot;line&quot;: 2,
          &quot;column&quot;: 5,
          &quot;sourceName&quot;: null
        }
      ],
      &quot;message&quot;: &quot;Failed to add vehicle. Vehicle with vin NDXT155NDFTV59834 already present.&quot;,
      &quot;path&quot;: [
        &quot;addVehicle&quot;
      ],
      &quot;extensions&quot;: {
        &quot;vin&quot;: &quot;NDXT155NDFTV59834&quot;
      }
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-根据graphql规范的错误响应组件" tabindex="-1"><a class="header-anchor" href="#_3-根据graphql规范的错误响应组件"><span>3. 根据GraphQL规范的错误响应组件</span></a></h2><p>响应中的_errors_部分是一个非空的错误列表，每个错误都是一个映射。</p><h3 id="_3-1-请求错误" tabindex="-1"><a class="header-anchor" href="#_3-1-请求错误"><span>3.1. 请求错误</span></a></h3><p><strong>顾名思义，请求错误可能发生在操作执行之前，如果请求本身有任何问题。</strong> 它可能是由于请求数据解析失败、请求文档验证、不支持的操作或无效的请求值。</p><p>当发生请求错误时，这表明执行尚未开始，这意味着响应中的_data_部分必须不在响应中。换句话说，响应只包含_errors_部分。</p><p>让我们看一个示例，演示无效输入语法的情况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>query {
  searchByVin(vin: &quot;error) {
    vin
    year
    make
    model
    trim
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是语法错误的请求错误响应，这种情况下是一个缺失的引号：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;data&quot;: null,
  &quot;errors&quot;: [
    {
      &quot;message&quot;: &quot;Invalid Syntax&quot;,
      &quot;locations&quot;: [
        {
          &quot;line&quot;: 5,
          &quot;column&quot;: 8,
          &quot;sourceName&quot;: null
        }
      ],
      &quot;errorType&quot;: &quot;InvalidSyntax&quot;,
      &quot;path&quot;: null,
      &quot;extensions&quot;: null
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-字段错误" tabindex="-1"><a class="header-anchor" href="#_3-2-字段错误"><span>3.2. 字段错误</span></a></h3><p><strong>顾名思义，字段错误可能由于无法将值强制转换为预期类型或在特定字段的值解析期间发生内部错误而发生。</strong> 这意味着字段错误发生在请求操作的执行过程中。</p><p>在字段错误的情况下，<strong>请求操作的执行继续并返回部分结果</strong>，这意味着响应的_data_部分必须与_errors_部分中的所有字段错误一起存在。</p><p>让我们再看一个例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>query {
  searchAll {
    vin
    year
    make
    model
    trim
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，我们包括了车辆_trim_字段，根据我们的GraphQL模式，它应该是非空的。</p><p>然而，其中一个车辆的信息有一个空的_trim_值，所以我们只得到了部分数据——_trim_值不为空的车辆——以及错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;data&quot;: {
    &quot;searchAll&quot;: [
      null,
      {
        &quot;vin&quot;: &quot;JTKKU4B41C1023346&quot;,
        &quot;year&quot;: 2012,
        &quot;make&quot;: &quot;Toyota&quot;,
        &quot;model&quot;: &quot;Scion&quot;,
        &quot;trim&quot;: &quot;Xd&quot;
      },
      {
        &quot;vin&quot;: &quot;1G1JC1444PZ215071&quot;,
        &quot;year&quot;: 2000,
        &quot;make&quot;: &quot;Chevrolet&quot;,
        &quot;model&quot;: &quot;CAVALIER VL&quot;,
        &quot;trim&quot;: &quot;RS&quot;
      }
    ]
  },
  &quot;errors&quot;: [
    {
      &quot;message&quot;: &quot;Cannot return null for non-nullable type: &#39;String&#39; within parent &#39;Vehicle&#39; (/searchAll[0]/trim)&quot;,
      &quot;path&quot;: [
        &quot;searchAll&quot;,
        0,
        &quot;trim&quot;
      ],
      &quot;errorType&quot;: &quot;DataFetchingException&quot;,
      &quot;locations&quot;: null,
      &quot;extensions&quot;: null
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-错误响应格式" tabindex="-1"><a class="header-anchor" href="#_3-3-错误响应格式"><span>3.3. 错误响应格式</span></a></h3><p>正如我们之前看到的，响应中的_errors_是一组一个或多个错误的集合。<strong>每个错误必须包含一个_message_键，描述失败的原因，以便客户端开发人员可以进行必要的更正以避免错误。</strong></p><p><strong>每个错误还可能包含一个名为_locations_的键</strong>，这是一个指向请求的GraphQL文档中与错误相关的行的位置列表。每个位置是一个具有行和列的映射，分别提供相关元素的行号和起始列号。</p><p><strong>可能包含在错误中的另一个键称为_path_。</strong> 它提供了从根元素追踪到响应中具有错误的特定元素的值列表。_path_值可以是表示字段名称的字符串，或者如果字段值是列表，则为错误元素的索引。如果错误与具有别名名称的字段相关，则_path_中的值应该是别名名称。</p><h3 id="_3-4-处理字段错误" tabindex="-1"><a class="header-anchor" href="#_3-4-处理字段错误"><span>3.4. 处理字段错误</span></a></h3><p><strong>无论在可空字段还是非可空字段上引发字段错误，我们都应该将其处理为字段返回_null_，并且错误必须添加到_errors_列表中。</strong></p><p>在可空字段的情况下，响应中字段的值将为_null_，但_errors_必须包含此字段错误，描述失败的原因和其他信息，如前一节中所见。</p><p>另一方面，父字段处理非可空字段错误。如果父字段是非可空的，则错误处理会一直传播，直到我们到达一个可空的父字段或根元素。</p><p>同样，如果列表字段包含非可空类型，并且一个或多个列表元素返回_null_，则整个列表解析为_null_。此外，如果包含列表字段的父字段是非可空的，则错误处理会一直传播，直到我们到达一个可空的父元素或根元素。</p><p>无论出于何种原因，<strong>如果在解析期间为同一字段引发多个错误，则对于该字段，我们只能将一个字段错误添加到_errors_中。</strong></p><h2 id="_4-spring-boot-graphql库" tabindex="-1"><a class="header-anchor" href="#_4-spring-boot-graphql库"><span>4. Spring Boot GraphQL库</span></a></h2><p>我们的Spring Boot应用程序示例使用了_spring-boot-starter-graphql_模块，该模块引入了所需的GraphQL依赖项。</p><p>我们还使用了_spring-graphql-test_模块进行相关测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.springframework.boot\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`spring-boot-starter-graphql\`\`&lt;/artifactId&gt;\`\`
\`\`&lt;/dependency&gt;\`\`

\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.springframework.graphql\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`spring-graphql-test\`\`&lt;/artifactId&gt;\`\`
    \`&lt;scope&gt;\`test\`&lt;/scope&gt;\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本节中，我们将主要介绍Spring Boot应用程序本身如何处理GraphQL错误处理。我们不会涵盖GraphQL Java和Spring Boot应用程序开发。</p><p>在我们的Spring Boot应用程序示例中，我们将根据位置或VIN（车辆识别号）变异或查询车辆。我们将看到使用这个示例实现错误处理的不同方式。</p><p><strong>在以下小节中，我们将看到Spring Boot模块如何处理异常或错误。</strong></p><h3 id="_5-1-带有标准异常的graphql响应" tabindex="-1"><a class="header-anchor" href="#_5-1-带有标准异常的graphql响应"><span>5.1. 带有标准异常的GraphQL响应</span></a></h3><p>通常，在REST应用程序中，我们通过扩展_RuntimeException_或_Throwable_创建一个自定义运行时异常类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这种方法，我们可以看到GraphQL引擎返回以下响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;errors&quot;: [
    {
      &quot;message&quot;: &quot;INTERNAL_ERROR for 2c69042a-e7e6-c0c7-03cf-6026b1bbe559&quot;,
      &quot;locations&quot;: [
        {
          &quot;line&quot;: 2,
          &quot;column&quot;: 5
        }
      ],
      &quot;path&quot;: [
        &quot;searchByLocation&quot;
      ],
      &quot;extensions&quot;: {
        &quot;classification&quot;: &quot;INTERNAL_ERROR&quot;
      }
    }
  ],
  &quot;data&quot;: null
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的错误响应中，我们可以看到它没有包含任何错误细节。</p><p>默认情况下，<strong>在请求处理期间发生的任何异常都由实现GraphQL API中的_DataFetcherExceptionHandler_接口的_ExceptionResolversExceptionHandler_类处理</strong>。它允许应用程序注册一个或多个_DataFetcherExceptionResolver_组件。</p><p>这些解析器将按顺序调用，直到其中一个能够处理异常并将其解析为_GraphQLError_。如果没有解析器能够处理异常，则异常被归类为_INTERNAL_ERROR_。它还包括与发送到客户端的错误相关的执行ID和通用错误消息，如上所示。</p><h3 id="_5-2-带有处理过的异常的graphql响应" tabindex="-1"><a class="header-anchor" href="#_5-2-带有处理过的异常的graphql响应"><span>5.2. 带有处理过的异常的GraphQL响应</span></a></h3><p>现在让我们看看如果我们实现自定义异常处理，响应会是什么样子。</p><p>首先，我们有另一个自定义异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class VehicleNotFoundException extends RuntimeException {
    public VehicleNotFoundException(String message) {
        super(message);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_DataFetcherExceptionResolver_提供了异步合同。然而，在大多数情况下，扩展_DataFetcherExceptionResolverAdapter_并覆盖其_resolveToSingleError_或_resolveToMultipleErrors_方法之一以同步解析异常就足够了。</p><p>现在，让我们实现这个组件，我们可以返回一个NOT_FOUND分类以及异常消息而不是通用错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component
public class CustomExceptionResolver extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
        if (ex instanceof VehicleNotFoundException) {
            return GraphqlErrorBuilder.newError()
              .errorType(ErrorType.NOT_FOUND)
              .message(ex.getMessage())
              .path(env.getExecutionStepInfo().getPath())
              .location(env.getField().getSourceLocation())
              .build();
        } else {
            return null;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个_GraphQLError_，它具有适当的分类和其他错误详细信息，以便在JSON响应的_errors_部分创建一个更有用的响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;errors&quot;: [
    {
      &quot;message&quot;: &quot;Vehicle with vin: 123 not found.&quot;,
      &quot;locations&quot;: [
        {
          &quot;line&quot;: 2,
          &quot;column&quot;: 5
        }
      ],
      &quot;path&quot;: [
        &quot;searchByVin&quot;
      ],
      &quot;extensions&quot;: {
        &quot;classification&quot;: &quot;NOT_FOUND&quot;
      }
    }
  ],
  &quot;data&quot;: {
    &quot;searchByVin&quot;: null
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个错误处理机制的一个重要细节是，未解决的异常会在ERROR级别记录，并且包含与发送到客户端的错误相关的_executionId_。如上所示，任何已解决的异常都会在日志中以DEBUG级别记录。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们学习了不同类型的GraphQL错误。我们还查看了如何根据规范格式化GraphQL错误。后来我们在Spring Boot应用程序中实现了错误处理。</p><p>像往常一样，完整的源代码可以在GitHub上找到。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p><p>OK</p>`,73),r=[l];function s(d,o){return i(),n("div",null,r)}const c=e(a,[["render",s],["__file","2024-07-19-Error Handling in GraphQL With Spring Boot.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Error%20Handling%20in%20GraphQL%20With%20Spring%20Boot.html","title":"GraphQL中的错误处理与Spring Boot","lang":"zh-CN","frontmatter":{"date":"2024-07-19T00:00:00.000Z","category":["Spring Boot","GraphQL"],"tag":["Error Handling","Spring Boot"],"head":[["meta",{"name":"keywords","content":"GraphQL, Spring Boot, Error Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Error%20Handling%20in%20GraphQL%20With%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"GraphQL中的错误处理与Spring Boot"}],["meta",{"property":"og:description","content":"GraphQL中的错误处理与Spring Boot 1. 概述 在本教程中，我们将学习GraphQL中的错误处理选项。我们将查看GraphQL规范对错误响应的说明。因此，我们将开发一个使用Spring Boot的错误处理示例。 2. 根据GraphQL规范的响应 根据GraphQL规范，收到的每个请求都必须返回一个格式良好的响应。这个格式良好的响应由相..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T08:12:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Error Handling"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2024-07-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T08:12:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GraphQL中的错误处理与Spring Boot\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T08:12:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"GraphQL中的错误处理与Spring Boot 1. 概述 在本教程中，我们将学习GraphQL中的错误处理选项。我们将查看GraphQL规范对错误响应的说明。因此，我们将开发一个使用Spring Boot的错误处理示例。 2. 根据GraphQL规范的响应 根据GraphQL规范，收到的每个请求都必须返回一个格式良好的响应。这个格式良好的响应由相..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 根据GraphQL规范的响应","slug":"_2-根据graphql规范的响应","link":"#_2-根据graphql规范的响应","children":[]},{"level":2,"title":"3. 根据GraphQL规范的错误响应组件","slug":"_3-根据graphql规范的错误响应组件","link":"#_3-根据graphql规范的错误响应组件","children":[{"level":3,"title":"3.1. 请求错误","slug":"_3-1-请求错误","link":"#_3-1-请求错误","children":[]},{"level":3,"title":"3.2. 字段错误","slug":"_3-2-字段错误","link":"#_3-2-字段错误","children":[]},{"level":3,"title":"3.3. 错误响应格式","slug":"_3-3-错误响应格式","link":"#_3-3-错误响应格式","children":[]},{"level":3,"title":"3.4. 处理字段错误","slug":"_3-4-处理字段错误","link":"#_3-4-处理字段错误","children":[]}]},{"level":2,"title":"4. Spring Boot GraphQL库","slug":"_4-spring-boot-graphql库","link":"#_4-spring-boot-graphql库","children":[{"level":3,"title":"5.1. 带有标准异常的GraphQL响应","slug":"_5-1-带有标准异常的graphql响应","link":"#_5-1-带有标准异常的graphql响应","children":[]},{"level":3,"title":"5.2. 带有处理过的异常的GraphQL响应","slug":"_5-2-带有处理过的异常的graphql响应","link":"#_5-2-带有处理过的异常的graphql响应","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721376722000,"updatedTime":1721376722000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.27,"words":2482},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Error Handling in GraphQL With Spring Boot.md","localizedDate":"2024年7月19日","excerpt":"<hr>\\n<h1>GraphQL中的错误处理与Spring Boot</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习GraphQL中的错误处理选项。我们将查看GraphQL规范对错误响应的说明。因此，我们将开发一个使用Spring Boot的错误处理示例。</p>\\n<h2>2. 根据GraphQL规范的响应</h2>\\n<p>根据GraphQL规范，收到的每个请求都必须返回一个格式良好的响应。这个格式良好的响应由相应成功或不成功的请求操作的数据或错误映射组成。此外，响应可能包含部分成功的结果数据和字段错误。</p>\\n<p><strong>响应映射的关键组件是_errors_、<em>data_和_extensions</em>。</strong></p>","autoDesc":true}');export{c as comp,p as data};
