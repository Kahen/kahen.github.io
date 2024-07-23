---
date: 2024-07-24
category:
  - Spring
  - Error Handling
tag:
  - 415 Unsupported Media Type
  - Spring Application
head:
  - - meta
    - name: keywords
      content: Spring, 415 Unsupported Media Type, Error Handling, Spring Application
---
# Spring 应用程序中的415 Unsupported MediaType问题解析

在本教程中，我们将展示Spring应用程序中POST请求的HTTP响应码415 UnsupportedMediaType的原因和解决方法。

## 2. 背景
我们的一位老业务客户要求我们为他们的产品设计并开发一个新的桌面应用程序。该应用程序的目的是管理用户。我们以前从未在这个产品上工作过。

由于时间紧迫，我们决定使用他们之前编写的现有后端API集。**我们面临的挑战是这些API的文档并不十分详尽。** 结果，我们只知道可用的API端点及其方法。因此，我们决定不接触服务——相反，我们将开始开发将使用此服务API的应用程序。

## 3. API请求
我们的应用程序已经开始使用这些API。让我们调用API以获取所有用户：
```shell
curl -X GET https://baeldung.service.com/user
```
太好了！API已成功响应。之后，让我们请求一个单独的用户：
```shell
curl -X GET https://baeldung.service.com/user/{user-id}
```
让我们检查响应：
```json
{
    "id": 1,
    "name": "Jason",
    "age": 23,
    "address": "14th Street"
}
```
这似乎也在正常工作。根据响应，我们可以推断出用户具有以下参数：_id_, _name_, _age_, 和 _address_。

现在，让我们尝试添加一个新用户：
```shell
curl -X POST -d '{"name":"Abdullah", "age":28, "address":"Apartment 2201"}' https://baeldung.service.com/user/
```
结果，**我们收到了一个带有HTTP状态415的错误响应**：
```json
{
    "timestamp": "yyyy-MM-ddThh:mm:ss.SSS+00:00",
    "status": 415,
    "error": "Unsupported Media Type",
    "path": "/user/"
}
```
**在我们弄清楚“我们为什么会收到这个错误？”之前，我们需要看看“这是什么错误？”。**

根据RFC 7231标题HTTP/1.1语义和内容第6.5.13节的规定：
> 415（Unsupported Media Type）状态码表示原始服务器因负载格式不受此方法支持而拒绝服务请求的目标资源。

**正如规范所建议的，我们选择的媒体类型不受API支持。** 我们选择JSON作为媒体类型的原因是GET请求的响应。响应数据格式是JSON。因此，**我们假设POST请求也会接受JSON。** 然而，这个假设被证明是错误的。

为了找出API支持哪种格式，我们决定深入研究服务器端后端代码，并找到了API定义：
```java
@PostMapping(value = "/", consumes = {"application/xml"})
void AddUser(@RequestBody User user)
```
这很清楚地解释了API只支持XML格式。有人可能会在这里问，Spring中的“_consumes_”元素的目的是什么？

根据Spring框架文档，"_consumes_"元素的目的是：
> 通过可以由映射处理程序消费的媒体类型来缩小主映射。由一个或多个媒体类型组成，其中之一必须与请求的Content-Type头部匹配

## 5. 解决方案
我们面前有两个选项来解决这个问题。第一个选项是根据服务器期望的格式更改请求有效负载。第二个选项是更新API请求，使其开始支持JSON格式。

### 5.1. 更改请求的有效负载为XML
第一个选项是**以XML格式而不是JSON格式发送请求**：
```shell
curl -X POST -d '``<user>````<name>``Abdullah``</name>````<age>``28``</age>````<address>``Apartment 2201``</address>````</user>``' https://baeldung.service.com/user/
```
不幸的是，我们以相同的错误响应了上述请求。如果我们记得，我们曾问过“API中的'_consumes_'元素的目的是什么”。这指引我们**我们的一个头部（“_Content-Type_”）缺失了**。这次让我们发送请求，这次带有缺失的头部：
```shell
curl -X POST -H "Content-Type: application/xml" -d '``<user>````<name>``Abdullah``</name>````<age>``28``</age>````<address>``Apartment 2201``</address>````</user>``' https://baeldung.service.com/user/
```
这次，我们收到了成功的响应。**然而，我们可能会遇到客户端应用程序无法以支持的格式发送请求的情况**。在这种情况下，我们必须对服务器进行更改，以使事情相对灵活。

### 5.2. 在服务器上更新API
假设我们的客户决定允许我们更改后端服务。如上所述的第二个选项是更新API请求以开始接受JSON格式。**我们如何更新API请求有三种进一步的选项**。让我们逐一探索每一个。

**第一个也是最业余的选项是在API上用JSON格式替换XML格式**：
```java
@PostMapping(value = "/", consumes = {"application/json"})
void AddUser(@RequestBody User user)
```
让我们再次以JSON格式从客户端应用程序发送请求：
```shell
curl -X POST -H "Content-Type: application/json" -d '{"name":"Abdullah", "age":28, "address":"Apartment 2201"}' https://baeldung.service.com/user/
```
响应将是成功的。**然而，我们将面临一种情况，即所有现有的客户端，他们以XML格式发送请求，现在将开始收到415 Unsupported Media Type错误**。

**第二个也是相对容易的选项是允许请求有效负载中的每种格式**：
```java
@PostMapping(value = "/", consumes = {"*/*"})
void AddUser(@RequestBody User user
```
以JSON格式请求，响应将是成功的。但这里的问题在于**它太灵活了**。我们不希望允许广泛的格式。**这将导致整个代码库（客户端和服务器端）的不一致行为**。

**第三个也是推荐的选项是添加客户端应用程序当前正在使用的那些特定格式**。由于API已经支持XML格式，我们将保留它，因为有现有的客户端应用程序向API发送XML。为了使API也支持我们的应用程序格式，我们将进行简单的API代码更改：
```java
@PostMapping(value = "/", consumes = {"application/xml","application/json"})
void AddUser(@RequestBody User user
```
以JSON格式发送我们的请求，响应将是成功的。这是这种特定场景中推荐的方法是。

## 6. 结论
在本文中，我们了解到必须从客户端应用程序请求中发送“_Content-Type_”头部以避免415 Unsupported Media Type错误。此外，RFC清楚地解释了客户端应用程序的“_Content-Type_”头部和服务器端应用程序必须同步，以避免在发送POST请求时出现这种错误。

本文的所有代码都可以在GitHub上找到。