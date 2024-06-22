---
date: 2024-06-22
category:
  - Spring
  - Thymeleaf
tag:
  - Thymeleaf
  - Spring MVC
head:
  - - meta
    - name: keywords
      content: Spring, Thymeleaf, Variable, Check, Defined
  - - meta
    - name: description
      content: Learn how to check if a variable is defined in Thymeleaf using three different methods.
------
# 如何在Thymeleaf中检查变量是否已定义

在这个教程中，我们将学习使用三种不同的方法来检查Thymeleaf中的变量是否已定义。为此，我们将使用Spring MVC和Thymeleaf构建一个简单的Web应用程序，该程序在设置给定变量的情况下显示服务器的日期和时间。

## 2. 设置

在深入研究这些方法之前，我们需要进行一些初始设置。让我们从Thymeleaf依赖项开始：

```xml
```<dependency>```
    ```<groupId>```org.thymeleaf```</groupId>```
    ```<artifactId>```thymeleaf```</artifactId>```
    ```<version>```3.1.2.RELEASE```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.thymeleaf```</groupId>```
    ```<artifactId>```thymeleaf-spring5```</artifactId>```
    ```<version>```3.1.2.RELEASE```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.thymeleaf.extras```</groupId>```
    ```<artifactId>```thymeleaf-extras-java8time```</artifactId>```
    ```<version>```3.0.4.RELEASE```</version>```
```</dependency>```
```

现在，让我们创建_checkVariableIsDefined_视图：

```html
`<!DOCTYPE html>`
`<html xmlns:th="http://www.thymeleaf.org"
      th:with="lang=${#locale.language}" th:lang="${lang}">`
`<head>`
    `<title>`如何在Thymeleaf中检查变量是否已定义`</title>`
`</head>`
`<body>`

`<!-- 我们将在这里为每种方法添加相关代码 -->`

`</body>`
`</html>`
```

我们还为此视图定义了两个新的端点：

```java
@RequestMapping(value = "/variable-defined", method = RequestMethod.GET)
public String getDefinedVariables(Model model) {
    DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, Locale.getDefault());
    model.addAttribute("serverTime", dateFormat.format(new Date()));
    return "checkVariableIsDefined.html";
}

@RequestMapping(value = "/variable-not-defined", method = RequestMethod.GET)
public String getNotDefinedVariables(Model model) {
    return "checkVariableIsDefined.html";
}
```

第一个端点加载了定义了_serverTime_变量的_checkVariableIsDefined_视图，而后者端点加载了相同视图但未定义变量。

这个设置将帮助我们测试以下部分介绍的方法。

## 3. 使用_#ctx_对象

我们将探索的第一种方法使用上下文对象，它包含Thymeleaf模板引擎处理模板所需的所有变量，包括用于国际化消息的_Locale_引用。上下文是独立应用程序的_IContex_接口的实现，或Web应用程序的_IWebContext_接口。

**我们可以使用_#ctx_表示法在Thymeleaf模板中访问上下文对象。** 让我们向_checkVariableIsDefined_视图添加相关代码：

```html
`<div th:if="${#ctx.containsVariable('serverTime')}" th:text="'服务器时间使用#ctx对象是: ' + ${serverTime}"/>`
```

现在，让我们编写两个集成测试来验证这种方法：

```java
private static final String CTX_OBJECT_MSG = "服务器时间使用#ctx对象是: ";

@Test
public void whenVariableIsDefined_thenCtxObjectContainsVariable() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/variables-defined"))
      .andExpect(status().isOk())
      .andExpect(view().name("checkVariableIsDefined.html"))
      .andExpect(content().string(containsString(CTX_OBJECT_MSG)));
}

@Test
public void whenVariableNotDefined_thenCtxObjectDoesNotContainVariable() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/variables-not-defined"))
      .andExpect(status().isOk())
      .andExpect(view().name("checkVariableIsDefined.html"))
      .andExpect(content().string(not(containsString(CTX_OBJECT_MSG))));
}
```

## 4. 使用_if_条件

下面的方法使用_if_条件。让我们更新_checkVariableIsDefined_视图：

```html
`<div th:if="${serverTime}" th:text="'服务器时间使用#th:if条件是: ' + ${serverTime}"/>`
```

**如果变量为null，则_if_条件被评估为_false_。**

现在，让我们看看集成测试：

```java
private static final String IF_CONDITIONAL_MSG = "服务器时间使用#th:if条件是: ";

@Test
public void whenVariableIsDefined_thenIfConditionalIsTrue() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/variable-defined"))
      .andExpect(status().isOk())
      .andExpect(view().name("checkVariableIsDefined.html"))
      .andExpect(content().string(containsString(IF_CONDITIONAL_MSG)));
}

@Test
public void whenVariableIsNotDefined_thenIfConditionalIsFalse() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/variable-not-defined"))
      .andExpect(status().isOk())
      .andExpect(view().name("checkVariableIsDefined.html"))
      .andExpect(content().string(not(containsString(IF_CONDITIONAL_MSG))));
}
```

_if_条件在以下任一条件为真时被评估为_true_：

- 变量是一个值为_true_的布尔值
- 变量是一个非零数字
- 变量是一个非零字符
- 变量是一个不同于_“false”_、_“off”_、_“no”_的字符串
- 变量不是布尔值、数字、字符或字符串

**请注意，如果变量已设置，但值为_“false”_、_“no”_、_“off”_或0，则_if_条件被评估为_false_，如果我们的意图仅是检查变量是否已设置，这可能会导致一些不期望的副作用。** 让我们通过更新视图来说明这一点：

```html
`<div th:if='${"false"}' th:text='"评估\"false\"''/>`
`<div th:if='${"no"}' th:text='"评估\"no\"''/>`
`<div th:if='${"off"}' th:text='"评估\"off\"''/>`
`<div th:if="${0}" th:text='"评估0"'/>`
```

接下来，让我们创建集成测试：

```java
@Test
public void whenVariableIsDefinedAndNotTrue_thenIfConditionalIsFalse() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/variable-defined"))
      .andExpect(status().isOk())
      .andExpect(view().name("checkVariableIsDefined.html"))
      .andExpect(content().string(not(containsString("评估\"false\""))))
      .andExpect(content().string(not(containsString("评估\"no\""))))
      .andExpect(content().string(not(containsString("评估\"off\""))))
      .andExpect(content().string(not(containsString("评估0"))));
}
```

我们可以通过检查变量是否为null来解决这个问题：

```html
`<div th:if="${serverTime != null}" th:text="'服务器时间使用#th:if条件是: ' + ${serverTime}"/>`
```

## 5. 使用_unless_条件

最后一种方法使用_unless_，它是_if_条件的逆。让我们相应地更新视图：

```html
`<div th:unless="${serverTime == null}" th:text="'服务器时间使用#th:unless条件是: ' + ${serverTime}"/>`
```

让我们也测试这种方法是否产生了预期的结果：

```java
private static final String UNLESS_CONDITIONAL_MSG = "服务器时间使用#th:unless条件是: ";

@Test
public void whenVariableIsDefined_thenUnlessConditionalIsTrue() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/variable-defined"))
      .andExpect(status().isOk())
      .andExpect(view().name("checkVariableIsDefined.html"))
      .andExpect(content().string(containsString(IF_CONDITIONAL_MSG)));
}

@Test
public void whenVariableIsNotDefined_thenUnlessConditionalIsFalse() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/variable-not-defined"))
      .andExpect(status().isOk())
      .andExpect(view().name("checkVariableIsDefined.html"))
      .andExpect(content().string(not(containsString(UNLESS_CONDITIONAL_MSG))));
}
```

## 6. 结论

在这篇文章中，我们学习了三种在Thymeleaf中检查变量是否已定义的方法。第一种方法使用_#ctx_对象和_containsVariable_方法，而第二和最后一种方法使用条件语句_if_及其逆_unless_。

如常，完整的代码可以在GitHub上找到。