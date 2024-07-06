---
date: 2024-07-07
category:
  - Java
  - Thymeleaf
tag:
  - th:text
  - th:value
head:
  - - meta
    - name: keywords
      content: Thymeleaf, th:text, th:value, 服务器端模板引擎, 动态网页, 数据绑定

---
# Thymeleaf 中 th:text 和 th:value 的区别

Thymeleaf 是一个流行的服务器端 Java 模板引擎，允许我们创建动态网页。它提供了多个属性来将模型中的数据绑定到视图。

在这个简短的教程中，我们将探讨 Thymeleaf 中 th:text 和 th:value 属性的关键区别。

## 2. th:text 属性
Thymeleaf 中的 th:text 属性用于设置元素的文本内容。此外，它替换了标准的 HTML text 属性。因此，我们可以将其放在任何支持文本内容的 HTML 元素中，例如标题、段落、标签等。

此外，我们可以使用该属性来显示动态文本内容，例如网页上的标题。假设我们想在 HTML 页面上显示由控制器提供的 title 属性。

首先，让我们创建一个控制器类和一个方法，我们将在其中指定模型属性：

```java
@GetMapping
public String show(Model model) {
    model.addAttribute("title", "Baeldung");
    return "attributes/index";
}
```

接下来，我们将在标题元素中显示该值：

```html
`<h1 th:text="${title}">````</h1>```
```

在这里，Thymeleaf 评估表达式“${title}”并将值插入到标题元素中。

我们将得到以下结果的 HTML：

```html
`<h1>`Baeldung```</h1>```
```

此外，与标准 HTML text 属性不同，th:text 属性支持表达式。除了变量外，这些表达式可能包括运算符和函数。

例如，让我们指定如果 title 属性没有提供时的默认值：

```html
`<h1 th:text="${title} ?: '默认标题'">````</h1>```
```

## 3. th:value 属性
另一方面，th:value 属性用于设置通常需要用户输入的元素的值。属于这一类的元素包括输入字段、复选框、单选按钮和下拉列表。

我们可以在任何具有 value 属性的元素中使用此属性，而不是标准 HTML value 属性。因此，将此属性添加到不支持它的元素上 - 例如，段落 - 将不会有任何效果。

首先，让我们创建一个包含一个电子邮件输入字段的简单表单：

```html
`<form th:action="@{/attributes}" method="post">`
    `<input type="email" th:value="${email}">`
    `<input type="submit" value="提交">`
`</form>`
```

接下来，让我们修改控制器中的方法并添加 email 属性：

```java
@GetMapping
public String show(Model model) {
    model.addAttribute("title", "Baeldung");
    model.addAttribute("email", "default@example.com");
    return "attributes/index";
}
```

最后，Thymeleaf 将在输入元素中显示值：

```html
`<input type="email" value="default@example.com">`
```

由于我们在使用 th:value 的输入字段内，我们更有可能希望在表单提交时将值传回控制器。**要传递值，我们需要以与变量名匹配的方式指定输入字段的 th:name ：**

```html
`<input th:name="email" type="email" th:value="${email}">`
```

现在，我们可以向控制器添加一个 POST 方法来读取用户的输入：

```java
@PostMapping
public String submit(String email) {
    logger.info("Email: {}", email);
    return "attributes/index";
}
```

该属性也支持表达式：

```html
`<input type="email" th:value="${email} ?: 'default@email.com'">`
```

## 4. 结论
在本文中，我们探讨了 Thymeleaf 属性 th:text 和 th:value 之间的区别。我们使用 th:text 属性来指定元素的文本内容，使用 th:value 属性来设置元素的值。

如常，所有源代码都可以在 GitHub 上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/8b2c4148df481ca115ca7c0151fe8c93?s=50&r=g)![img](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK