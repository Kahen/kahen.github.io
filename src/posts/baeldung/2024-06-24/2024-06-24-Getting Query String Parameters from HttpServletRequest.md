---
date: 2024-06-24
category:
  - Java
  - Spring MVC
tag:
  - HttpServletRequest
  - Query String
head:
  - - meta
    - name: keywords
      content: Java, Spring MVC, HttpServletRequest, Query String
------
# 从HttpServletRequest获取查询字符串参数

## 1. 引言

后端HTTP API开发中最重要的能力之一是解析前端传递的请求查询参数。

在本教程中，我们将介绍几种直接从_HttpServletRequest_获取查询参数的方法，以及Spring MVC提供的一些简洁方式。

## 2. _HttpServletRequest_中的方法

首先，我们来看看_HttpServletRequest_提供的与参数相关的方法。

### 2.1. _HttpServletRequest#getQueryString()_

这个示例展示了我们可以通过调用方法_HttpServletRequest#getQueryString()_直接从URL获取的内容：

```java
@GetMapping("/api/byGetQueryString")
public String byGetQueryString(HttpServletRequest request) {
    return request.getQueryString();
}
```

当我们使用curl向这个API发送带有多个参数的GET请求时，方法_getQueryString()_只返回‘?’后的所有字符：

```shell
$ curl 'http://127.0.0.1:8080/spring-mvc-basics/api/byGetQueryString?username=bob&roles=admin&roles=stuff'
username=bob&roles=admin&roles=stuff
```

注意，如果我们将_@GetMapping_更改为_@RequestMapping_，当我们使用POST/PUT/PATCH/DELETE HTTP方法发送请求时，它将返回相同的响应。这意味着无论HTTP方法是什么，_HttpServletRequest_始终会获取查询字符串。因此，我们可以只关注本教程中的GET请求。为了简化我们演示_HttpServletRequest_提供的方法，我们还将使用相同的请求参数在以下每个示例中。

### 2.2. _HttpServletRequest#getParameter(String)_

为了简化参数解析，_HttpServletRequest_提供了一个方法_getParameter_，通过参数名称获取值：

```java
@GetMapping("/api/byGetParameter")
public String byGetParameter(HttpServletRequest request) {
    String username = request.getParameter("username");
    return "username:" + username;
}
```

当我们发送带有_querystring_的GET请求_username=bob_时，调用_getParameter("username")_返回_bob_。

```shell
$ curl 'http://127.0.0.1:8080/spring-mvc-basics/api/byGetParameter?username=bob&roles=admin&roles=stuff'
username:bob
```

### 2.3. _HttpServletRequest#getParameterValues(String)_

方法_getParameterValues_的行为类似于_getParameter_方法，但它返回一个_String[]_而不是一个_String_。这是由于HTTP规范允许传递具有相同名称的多个参数。

```java
@GetMapping("/api/byGetParameterValues")
public String byGetParameterValues(HttpServletRequest request) {
    String[] roles = request.getParameterValues("roles");
    return "roles:" + Arrays.toString(roles);
}
```

因此，当我们两次传递参数_roles_的值时，我们应该在数组中得到两个值：

```shell
$ curl 'http://127.0.0.1:8080/spring-mvc-basics/api/byGetParameterValues?username=bob&roles=admin&roles=stuff'
roles:[admin, stuff]
```

### 2.4. _HttpServletRequest#getParameterMap()_

假设我们有以下_UserDto_ POJO作为以下JSON API示例的一部分：

```java
public class UserDto {
    private String username;
    private List``<String>`` roles;
    // 标准getter/setter...
}
```

如我们所见，可以有一个或多个值的不同参数名称。对于这些情况，_HttpServletRequest_提供了另一种方法，_getParameterMap()_，它返回一个_Map``<String, String[]>``_。这个方法允许我们使用_Map_获取参数值。

```java
@GetMapping("/api/byGetParameterMap")
public UserDto byGetParameterMap(HttpServletRequest request) {
    Map``<String, String[]>`` parameterMap = request.getParameterMap();
    String[] usernames = parameterMap.get("username");
    String[] roles = parameterMap.get("roles");
    UserDto userDto = new UserDto();
    userDto.setUsername(usernames[0]);
    userDto.setRoles(Arrays.asList(roles));
    return userDto;
}
```

我们将为这个示例得到一个JSON响应：

```shell
$ curl 'http://127.0.0.1:8080/spring-mvc-basics/api/byGetParameterMap?username=bob&roles=admin&roles=stuff'
{"username":"bob","roles":["admin","stuff"]}
```

## 3. 使用Spring MVC获取参数

让我们看看Spring MVC在解析查询字符串时如何提高编码体验。

### 3.1. 参数名称

使用Spring MVC框架时，我们不必手动使用_HttpServletRequest_解析参数。对于第一种情况，我们定义一个方法，该方法有两个参数，查询参数名称为_username_和_roles_，并移除_HttpServletRequest_的使用，这由Spring MVC处理。

```java
@GetMapping("/api/byParameterName")
public UserDto byParameterName(String username, String[] roles) {
    UserDto userDto = new UserDto();
    userDto.setUsername(username);
    userDto.setRoles(Arrays.asList(roles));
    return userDto;
}
```

这将返回与上一个示例相同的结果，因为我们使用相同的模型：

```shell
$ curl 'http://127.0.0.1:8080/spring-mvc-basics/api/byParameterName?username=bob&roles=admin&roles=stuff'
{"username":"bob","roles":["admin","stuff"]}
```

### 3.2. _@RequestParam_

如果HTTP查询参数名称和Java方法参数名称不同，或者方法参数名称在编译字节码中不会被保留，我们可以在方法参数名称上配置注解_@RequestParam_来应对这种情况。

在我们的案例中，我们使用_@RequestParam("username")_和_@RequestParam("roles")_如下：

```java
@GetMapping("/api/byAnnoRequestParam")
public UserDto byAnnoRequestParam(@RequestParam("username") String var1, @RequestParam("roles") List``<String>`` var2) {
    UserDto userDto = new UserDto();
    userDto.setUsername(var1);
    userDto.setRoles(var2);
    return userDto;
}
```

并测试它：

```shell
$ curl 'http://127.0.0.1:8080/spring-mvc-basics/api/byAnnoRequestParam?username=bob&roles=admin&roles=stuff'
{"username":"bob","roles":["admin","stuff"]}
```

### 3.3. POJO

更简单地，我们可以直接使用POJO作为参数类型：

```java
@GetMapping("/api/byPojo")
public UserDto byPojo(UserDto userDto) {
    return userDto;
}
```

Spring MVC可以解析参数，创建POJO实例，并自动填充所需的参数。

```shell
$ curl 'http://127.0.0.1:8080/spring-mvc-basics/api/byPojo?username=bob&roles=admin&roles=stuff'
{"username":"bob","roles":["admin","stuff"]}
```

最后，我们通过单元测试来确保最后四种方法提供了完全相同的功能。

```java
@ParameterizedTest
@CsvSource(textBlock = """
    /api/byGetParameterMap
    /api/byParameterName
    /api/byAnnoRequestParam
    /api/byPojo
""")
public void whenPassParameters_thenReturnResolvedModel(String path) throws Exception {
    this.mockMvc.perform(get(path + "?username=bob&roles=admin&roles=stuff"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.username").value("bob"))
      .andExpect(jsonPath("$.roles").value(containsInRelativeOrder("admin", "stuff")));
}
```

## 4. 结论

在本文中，我们介绍了如何使用Spring MVC从_HttpServletRequest_获取参数。从这些示例中，我们可以看到，使用Spring MVC解析参数时可以减少大量代码。

像往常一样，本文中展示的所有代码片段都可以在GitHub上找到。