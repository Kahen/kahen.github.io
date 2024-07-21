---
date: 2022-04-01
category:
  - Spring
  - Exception Handling
tag:
  - HttpMessageNotWritableException
  - Spring Boot
  - MessageConverter
head:
  - - meta
    - name: keywords
      content: Spring, HttpMessageNotWritableException, Exception Handling, Spring Boot, MessageConverter
---
# HttpMessageNotWritableException：没有预设内容类型的转换器 [类 …] | Baeldung

在这篇短文中，我们将仔细研究Spring异常 "HttpMessageNotWritableException: no converter for [class …] with preset Content-Type"。

首先，我们将揭示异常背后的主要原因。然后，我们将深入探讨如何使用一个实际示例来重现它，最后是如何解决它。

## 2. 原因

在深入细节之前，让我们尝试理解异常的含义。

异常的堆栈跟踪说明了一切：它告诉我们Spring **找不到合适的** _HttpMessageConverter_ **能够将Java对象转换为HTTP响应**。

基本上，Spring依赖于 "Accept" 头部来检测它需要响应的媒体类型。

因此，**使用没有预注册消息转换器的媒体类型将导致Spring抛出异常**。

## 3. 重现异常

现在我们知道了什么导致Spring抛出我们的异常，让我们看看如何使用一个实际示例来重现它。

让我们创建一个处理器方法，并假装指定一个没有注册 _HttpMessageConverter_ 的媒体类型（对于响应）。

例如，让我们使用 _APPLICATION_XML_VALUE_ 或 "application/xml"：

```java
@GetMapping(value = "/student/v3/{id}", produces = MediaType.APPLICATION_XML_VALUE)
public ResponseEntity``<Student>`` getV3(@PathVariable("id") int id) {
    return ResponseEntity.ok(new Student(id, "Robert", "Miller", "BB"));
}
```

接下来，让我们发送一个请求到 _http://localhost:8080/api/student/v3/1_ 并看看会发生什么：

```bash
curl http://localhost:8080/api/student/v3/1
```

端点发送回这个响应：

```json
{"timestamp":"2022-02-01T18:23:37.490+00:00","status":500,"error":"Internal Server Error","path":"/api/student/v3/1"}
```

确实，查看日志，Spring因 _HttpMessageNotWritableException_ 异常而失败：

```java
[org.springframework.http.converter.HttpMessageNotWritableException: No converter for [class com.baeldung.boot.noconverterfound.model.Student] with preset Content-Type 'null']
```

所以，异常被抛出是因为 **没有 _HttpMessageConverter_ 能够将 _Student_ 对象编组和解组为XML**。

最后，让我们创建一个测试用例来确认Spring抛出带有指定消息的 _HttpMessageNotWritableException_：

```java
@Test
public void whenConverterNotFound_thenThrowException() throws Exception {
    String url = "/api/student/v3/1";

    this.mockMvc.perform(get(url))
      .andExpect(status().isInternalServerError())
      .andExpect(result -> assertThat(result.getResolvedException()).isInstanceOf(HttpMessageNotWritableException.class))
      .andExpect(result -> assertThat(result.getResolvedException()
        .getMessage()).contains("No converter for [class com.baeldung.boot.noconverterfound.model.Student] with preset Content-Type"));
}
```

## 4. **解决方案**

**修复异常的唯一方法是使用有一个注册消息转换器的媒体类型。**

Spring Boot依赖自动配置来注册内置的消息转换器。

例如，如果Jackson 2依赖项出现在类路径中，它将**自动注册_MappingJackson2HttpMessageConverter_**。

话虽如此，并且知道Spring Boot在web启动器中包含了Jackson，让我们创建一个新的端点，使用 _APPLICATION_JSON_VALUE_ 媒体类型：

```java
@GetMapping(value = "/student/v2/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity``<Student>`` getV2(@PathVariable("id") int id) {
    return ResponseEntity.ok(new Student(id, "Kevin", "Cruyff", "AA"));
}
```

现在，让我们创建一个测试用例来确认一切按预期工作：

```java
@Test
public void whenJsonConverterIsFound_thenReturnResponse() throws Exception {
    String url = "/api/student/v2/1";

    this.mockMvc.perform(get(url))
      .andExpect(status().isOk())
      .andExpect(content().json("{'id':1,'firstName':'Kevin','lastName':'Cruyff', 'grade':'AA'}"));
}
```

正如我们所看到的，由于_MappingJackson2HttpMessageConverter_，在背后处理将 _Student_ 对象转换为JSON，Spring没有抛出 _HttpMessageNotWritableException_。

## 5. 结论

在这个简短的教程中，我们详细讨论了什么导致Spring抛出 "HttpMessageNotWritableException No converter for [class …] with preset Content-Type"。

在此过程中，我们展示了如何在实践中产生异常以及如何修复它。

一如既往，示例的完整源代码可在GitHub上找到。