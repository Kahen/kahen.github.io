---
date: 2024-07-19
category:
  - Spring Boot
  - GraphQL
tag:
  - Error Handling
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: GraphQL, Spring Boot, Error Handling
------
# GraphQL中的错误处理与Spring Boot

## 1. 概述

在本教程中，我们将学习GraphQL中的错误处理选项。我们将查看GraphQL规范对错误响应的说明。因此，我们将开发一个使用Spring Boot的错误处理示例。

## 2. 根据GraphQL规范的响应

根据GraphQL规范，收到的每个请求都必须返回一个格式良好的响应。这个格式良好的响应由相应成功或不成功的请求操作的数据或错误映射组成。此外，响应可能包含部分成功的结果数据和字段错误。

**响应映射的关键组件是_errors_、_data_和_extensions_。**

响应中的_errors_部分描述了请求操作期间的任何失败。如果没有发生错误，则响应中必须不包含_errors_组件。在下一节中，我们将查看规范中描述的不同类型错误。

_data_部分描述了请求操作成功执行的结果。如果操作是查询，则此组件是查询根操作类型的一个对象。另一方面，如果操作是变异，则此组件是变异根操作类型的一个对象。

如果请求操作在执行之前由于缺少信息、验证错误或语法错误而失败，则响应中必须不包含_data_组件。如果操作在执行过程中失败并且结果不成功，则_data_组件必须为_null_。

响应映射可能包含一个名为_extensions_的附加组件，这是一个映射对象。该组件便于实现者根据需要在响应中提供其他自定义内容。因此，其内容格式没有额外的限制。

**如果响应中没有_data_组件，则_errors_组件必须存在，并且必须至少包含一个错误。** 进一步地，它应该指明失败的原因。

这里是一个GraphQL错误的示例：

``` 
mutation {
  addVehicle(vin: "NDXT155NDFTV59834", year: 2021, make: "Toyota", model: "Camry", trim: "XLE",
             location: {zipcode: "75024", city: "Dallas", state: "TX"}) {
    vin
    year
    make
    model
    trim
  }
}
```

当违反唯一约束时，错误响应将如下所示：

``` 
{
  "data": null,
  "errors": [
    {
      "errorType": "DataFetchingException",
      "locations": [
        {
          "line": 2,
          "column": 5,
          "sourceName": null
        }
      ],
      "message": "Failed to add vehicle. Vehicle with vin NDXT155NDFTV59834 already present.",
      "path": [
        "addVehicle"
      ],
      "extensions": {
        "vin": "NDXT155NDFTV59834"
      }
    }
  ]
}
```

## 3. 根据GraphQL规范的错误响应组件

响应中的_errors_部分是一个非空的错误列表，每个错误都是一个映射。

### 3.1. 请求错误

**顾名思义，请求错误可能发生在操作执行之前，如果请求本身有任何问题。** 它可能是由于请求数据解析失败、请求文档验证、不支持的操作或无效的请求值。

当发生请求错误时，这表明执行尚未开始，这意味着响应中的_data_部分必须不在响应中。换句话说，响应只包含_errors_部分。

让我们看一个示例，演示无效输入语法的情况：

``` 
query {
  searchByVin(vin: "error) {
    vin
    year
    make
    model
    trim
  }
}
```

这里是语法错误的请求错误响应，这种情况下是一个缺失的引号：

``` 
{
  "data": null,
  "errors": [
    {
      "message": "Invalid Syntax",
      "locations": [
        {
          "line": 5,
          "column": 8,
          "sourceName": null
        }
      ],
      "errorType": "InvalidSyntax",
      "path": null,
      "extensions": null
    }
  ]
}
```

### 3.2. 字段错误

**顾名思义，字段错误可能由于无法将值强制转换为预期类型或在特定字段的值解析期间发生内部错误而发生。** 这意味着字段错误发生在请求操作的执行过程中。

在字段错误的情况下，**请求操作的执行继续并返回部分结果**，这意味着响应的_data_部分必须与_errors_部分中的所有字段错误一起存在。

让我们再看一个例子：

``` 
query {
  searchAll {
    vin
    year
    make
    model
    trim
  }
}
```

这次，我们包括了车辆_trim_字段，根据我们的GraphQL模式，它应该是非空的。

然而，其中一个车辆的信息有一个空的_trim_值，所以我们只得到了部分数据——_trim_值不为空的车辆——以及错误：

``` 
{
  "data": {
    "searchAll": [
      null,
      {
        "vin": "JTKKU4B41C1023346",
        "year": 2012,
        "make": "Toyota",
        "model": "Scion",
        "trim": "Xd"
      },
      {
        "vin": "1G1JC1444PZ215071",
        "year": 2000,
        "make": "Chevrolet",
        "model": "CAVALIER VL",
        "trim": "RS"
      }
    ]
  },
  "errors": [
    {
      "message": "Cannot return null for non-nullable type: 'String' within parent 'Vehicle' (/searchAll[0]/trim)",
      "path": [
        "searchAll",
        0,
        "trim"
      ],
      "errorType": "DataFetchingException",
      "locations": null,
      "extensions": null
    }
  ]
}
```

### 3.3. 错误响应格式

正如我们之前看到的，响应中的_errors_是一组一个或多个错误的集合。**每个错误必须包含一个_message_键，描述失败的原因，以便客户端开发人员可以进行必要的更正以避免错误。**

**每个错误还可能包含一个名为_locations_的键**，这是一个指向请求的GraphQL文档中与错误相关的行的位置列表。每个位置是一个具有行和列的映射，分别提供相关元素的行号和起始列号。

**可能包含在错误中的另一个键称为_path_。** 它提供了从根元素追踪到响应中具有错误的特定元素的值列表。_path_值可以是表示字段名称的字符串，或者如果字段值是列表，则为错误元素的索引。如果错误与具有别名名称的字段相关，则_path_中的值应该是别名名称。

### 3.4. 处理字段错误

**无论在可空字段还是非可空字段上引发字段错误，我们都应该将其处理为字段返回_null_，并且错误必须添加到_errors_列表中。**

在可空字段的情况下，响应中字段的值将为_null_，但_errors_必须包含此字段错误，描述失败的原因和其他信息，如前一节中所见。

另一方面，父字段处理非可空字段错误。如果父字段是非可空的，则错误处理会一直传播，直到我们到达一个可空的父字段或根元素。

同样，如果列表字段包含非可空类型，并且一个或多个列表元素返回_null_，则整个列表解析为_null_。此外，如果包含列表字段的父字段是非可空的，则错误处理会一直传播，直到我们到达一个可空的父元素或根元素。

无论出于何种原因，**如果在解析期间为同一字段引发多个错误，则对于该字段，我们只能将一个字段错误添加到_errors_中。**

## 4. Spring Boot GraphQL库

我们的Spring Boot应用程序示例使用了_spring-boot-starter-graphql_模块，该模块引入了所需的GraphQL依赖项。

我们还使用了_spring-graphql-test_模块进行相关测试：

``` 
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-graphql``</artifactId>``
``</dependency>``

``<dependency>``
    ``<groupId>``org.springframework.graphql``</groupId>``
    ``<artifactId>``spring-graphql-test``</artifactId>``
    `<scope>`test`</scope>`
``</dependency>``
```

在本节中，我们将主要介绍Spring Boot应用程序本身如何处理GraphQL错误处理。我们不会涵盖GraphQL Java和Spring Boot应用程序开发。

在我们的Spring Boot应用程序示例中，我们将根据位置或VIN（车辆识别号）变异或查询车辆。我们将看到使用这个示例实现错误处理的不同方式。

**在以下小节中，我们将看到Spring Boot模块如何处理异常或错误。**

### 5.1. 带有标准异常的GraphQL响应

通常，在REST应用程序中，我们通过扩展_RuntimeException_或_Throwable_创建一个自定义运行时异常类：

``` 
public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }
}
```

通过这种方法，我们可以看到GraphQL引擎返回以下响应：

``` 
{
  "errors": [
    {
      "message": "INTERNAL_ERROR for 2c69042a-e7e6-c0c7-03cf-6026b1bbe559",
      "locations": [
        {
          "line": 2,
          "column": 5
        }
      ],
      "path": [
        "searchByLocation"
      ],
      "extensions": {
        "classification": "INTERNAL_ERROR"
      }
    }
  ],
  "data": null
}
```

在上面的错误响应中，我们可以看到它没有包含任何错误细节。

默认情况下，**在请求处理期间发生的任何异常都由实现GraphQL API中的_DataFetcherExceptionHandler_接口的_ExceptionResolversExceptionHandler_类处理**。它允许应用程序注册一个或多个_DataFetcherExceptionResolver_组件。

这些解析器将按顺序调用，直到其中一个能够处理异常并将其解析为_GraphQLError_。如果没有解析器能够处理异常，则异常被归类为_INTERNAL\_ERROR_。它还包括与发送到客户端的错误相关的执行ID和通用错误消息，如上所示。

### 5.2. 带有处理过的异常的GraphQL响应

现在让我们看看如果我们实现自定义异常处理，响应会是什么样子。

首先，我们有另一个自定义异常：

``` 
public class VehicleNotFoundException extends RuntimeException {
    public VehicleNotFoundException(String message) {
        super(message);
    }
}
```

_DataFetcherExceptionResolver_提供了异步合同。然而，在大多数情况下，扩展_DataFetcherExceptionResolverAdapter_并覆盖其_resolveToSingleError_或_resolveToMultipleErrors_方法之一以同步解析异常就足够了。

现在，让我们实现这个组件，我们可以返回一个NOT\_FOUND分类以及异常消息而不是通用错误：

``` 
@Component
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
```

在这里，我们创建了一个_GraphQLError_，它具有适当的分类和其他错误详细信息，以便在JSON响应的_errors_部分创建一个更有用的响应：

``` 
{
  "errors": [
    {
      "message": "Vehicle with vin: 123 not found.",
      "locations": [
        {
          "line": 2,
          "column": 5
        }
      ],
      "path": [
        "searchByVin"
      ],
      "extensions": {
        "classification": "NOT_FOUND"
      }
    }
  ],
  "data": {
    "searchByVin": null
  }
}
```

这个错误处理机制的一个重要细节是，未解决的异常会在ERROR级别记录，并且包含与发送到客户端的错误相关的_executionId_。如上所示，任何已解决的异常都会在日志中以DEBUG级别记录。

## 6. 结论

在本教程中，我们学习了不同类型的GraphQL错误。我们还查看了如何根据规范格式化GraphQL错误。后来我们在Spring Boot应用程序中实现了错误处理。

像往常一样，完整的源代码可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK