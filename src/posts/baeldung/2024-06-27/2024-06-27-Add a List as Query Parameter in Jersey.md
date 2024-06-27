---
date: 2024-06-28
category:
  - Java
  - Jersey
tag:
  - RESTful Web Services
  - JAX-RS
head:
  - - meta
    - name: keywords
      content: Jersey, Query Parameter, List, Java
------
# 在Jersey中将列表作为查询参数添加

Jersey是一个用于开发RESTful Web服务的开源框架，它是JAX-RS的参考实现。

在本教程中，我们将探索使用Jersey客户端进行请求时将列表作为查询参数添加的不同方式。

## 2. GET API接收查询参数中的列表

我们首先创建一个GET API，它在查询参数中接收列表。

**我们可以使用_@QueryParam_注解从URI中的查询参数提取值。** _@QueryParam_注解接受一个参数，即我们想要提取的查询参数的名称。

要使用_@QueryParam_指定列表类型的查询参数，我们将注解应用于方法参数，表示它从URL的查询参数中接收值列表：

```
@Path("/")
public class JerseyListDemo {
    @GET
    public String getItems(@QueryParam("items") List``<String>`` items) {
        return "Received items: " + items;
    }
}
```

现在，我们将使用不同的方法将列表作为查询参数传递。完成后，我们将验证响应以确保资源正确处理项目列表。

## 3. 使用_queryParam()_

Jersey中的_queryParam()_方法在构建HTTP请求时向URL添加查询参数。**_queryParam()_方法允许我们指定查询参数的名称和值。**

### 3.1. 直接使用查询参数

在这种方法中，我们使用Jersey提供的方法直接添加查询参数。

在下面的示例中，我们有一个_WebTarget_作为_target()_，我们正在向请求URL添加具有多个值_item1,item2_的查询参数_items_：

```
@Test
public void givenList_whenUsingQueryParam_thenPassParamsAsList() {
    Response response = target("/")
      .queryParam("items", "item1", "item2")
      .request
      .get();
    assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    assertEquals("Received items: [item1, item2]", response.readEntity(String.class));
}
```

这将导致具有查询参数的URL，如_/?items=item1&items=item2._ 这里，_items_查询参数包含_item1_和_item2_作为其值。

### 3.2. 使用逗号分隔的字符串

在这种方法中，我们将列表转换为逗号分隔的字符串，然后将其作为查询参数添加到Jersey客户端中。这简化了URL构建过程，但需要服务器端逻辑将字符串解析为列表：

```
@Test
public void givenList_whenUsingCommaSeparatedString_thenPassParamsAsList() {
    Response response = target("/")
      .queryParam("items", "item1,item2")
      .request()
      .get();
    assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    assertEquals("Received items: [item1,item2]", response.readEntity(String.class));
}
```

这将导致具有查询参数的URL，如_/?items=item1,item2_。这里，_items_查询参数包含_item1,item2_作为其值。

## 4. 使用_UriBuilder_

_UriBuilder_方法是构建带有查询参数的URL的强大方式。在这种方法中，我们创建一个_UriBuilder_实例，指定基础URI，并逐步添加查询参数：

```
@Test
public void givenList_whenUsingUriBuilder_thenPassParamsAsList() {
    List``<String>`` itemsList = Arrays.asList("item1","item2");
    UriBuilder builder = UriBuilder.fromUri("/");
    for (String item : itemsList) {
        builder.queryParam("items", item);
    }
    URI uri = builder.build();
    String expectedUri = "/?items=item1&items=item2";
    assertEquals(expectedUri, uri.toString());
}
```

单元测试确保_UriBuilder_正确组装了带有所需查询参数的URL，并验证了其准确性。

## 5. 结论

在本文中，我们学习了在Jersey中将列表作为查询参数传递的不同方法。

**_queryParam()_方法简单直接，适合简单情况。另一方面，_UriBuilder_非常适合具有多个查询参数的动态URL生成。** 选择取决于应用程序的需求，考虑到列表复杂性和动态URL构建的必要性。

如常，本文中展示的所有代码都可以在GitHub上找到。