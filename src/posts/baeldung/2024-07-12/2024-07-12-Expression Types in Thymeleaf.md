---
date: 2022-04-01
category:
  - Java
  - Thymeleaf
tag:
  - Template Engine
  - Expression Types
head:
  - - meta
    - name: keywords
      content: Thymeleaf, Template Engine, Expression Types, Java
---
# Thymeleaf中的表达式类型 | Baeldung

Thymeleaf 是Java生态系统中流行的模板引擎。它帮助将控制器层的数据绑定到视图层。本教程将通过示例讨论Thymeleaf的表达式类型。

我们将使用名为Dino的简单Web应用程序作为示例。这是一个用于创建恐龙资料的简单Web应用程序。

首先，让我们为我们的恐龙创建一个模型类：

```java
public class Dino {
    private int id;
    private String name;
    // 构造函数
    // getter和setter
}
```

接下来，让我们创建一个控制器类：

```java
@Controller
public class DinoController {

    @RequestMapping("/")
    public String dinoList(Model model) {
        Dino dinos = new Dino(1, "alpha", "red", 50);
        model.addAttribute("dinos", dinos);
        return "index";
    }
}
```

通过我们的示例设置，我们可以将_Dino_实例注入到我们的模板文件中。

### 3. 变量表达式

变量表达式有助于将控制器中的数据注入到模板文件中。它将模型属性暴露给Web视图。

变量表达式的语法是美元符号和花括号的组合。我们的变量名称位于花括号内：

```
${...}
```

让我们将我们的_Dino_数据注入到模板文件中：

```
`<span th:text="${dinos.id}">```</span>``
`<span th:text="${dinos.name}">```</span>``
```

条件语句和迭代也可以使用变量表达式：

```
`<!-- 用于迭代 -->`
`<div th:each="dinos : ${dinos}">`

`<!-- 在条件语句中 -->`
`<div th:if="${dinos.id == 2}">`
```

### 4. 选择表达式

选择表达式操作在之前选择的对象上。它帮助我们选择所选对象的子对象。

选择表达式的语法是星号和花括号的组合。我们的子对象位于花括号内：

```
*{...}
```

让我们选择我们的_Dino_实例的_id_和_name_，并将它们注入到我们的模板文件中：

```
`<div th:object="${dinos}">`
    `<p th:text="*{id}">``````</p>`````
    `<p th:text="*{name}">``````</p>`````
```</div>```
```

此外，选择表达式主要用于HTML表单中。它帮助将表单输入与模型属性绑定。

与变量表达式不同，不需要单独处理每个输入元素。以我们的Dino Web应用程序为例，让我们创建一个新的_Dino_实例并将其绑定到我们的模型属性：

```
`<form action="#" th:action="@{/dino}" th:object="${dinos}" method="post">`
    ```<p>```Id: `<input type="text" th:field="*{id}" />``````</p>`````
    ```<p>```Name: `<input type="text" th:field="*{name}" />``````</p>`````
`</form>`
```

### 5. 消息表达式

这种表达式有助于将外部文本引入我们的模板文件。它也称为文本国际化。

我们的文本所在的外部来源可能是一个_.properties_文件。当它具有占位符时，这种表达式是动态的。

消息表达式的语法是井号和花括号的组合。我们的键位于花括号内：

```
#{...}
```

例如，假设我们想要在Dino Web应用程序的页面上显示特定的消息。我们可以将消息放在_messages.properties_文件中：

```
welcome.message=welcome to Dino world.
```

要将欢迎消息绑定到我们视图模板，我们可以通过其键引用它：

```
`<h2 th:text="#{welcome.message}">````</h2>```
```

我们可以通过在我们的外部文件中添加占位符来使消息表达式接受参数：

```
dino.color=red is my favourite, mine is {0}
```

在我们的模板文件中，我们将引用消息并添加一个值到占位符：

```
`<h2 th:text="#{dino.color('blue')}">````</h2>```
```

此外，我们可以通过将变量表达式注入为占位符的值来使我们的占位符动态化：

```
`<h2 th:text="#{dino.color(${dino.color})}">````</h2>```
```

这种表达式也称为国际化。它可以帮助我们适应不同的语言，以适应我们的Web应用程序。

### 6. 链接表达式

链接表达式在URL构建中是不可或缺的。这种表达式绑定到指定的URL。

链接表达式的语法是“at”符号和花括号的组合。我们的链接位于花括号内：

```
@{...}
```

URL可以是绝对的或相对的。当使用链接表达式与绝对URL时，它绑定到以“_http(s)_”开头的完整URL：

```
`<a th:href="@{http://www.baeldung.com}">` Baeldung Home````</a>````
```

另一方面，相对链接绑定到我们的Web服务器的上下文。我们可以轻松地按照控制器中定义的方式在我们的模板文件中导航：

```
@RequestMapping("/create")
public String dinoCreate(Model model) {
    model.addAttribute("dinos", new Dino());
    return "form";
}
```

我们可以按指定的_@RequestMapping_请求页面：

```
`<a th:href="@{/create}">`Submit Another Dino````</a>````
```

**它可以通过对路径变量的参数进行传递。** 假设我们想要提供链接以编辑现有实体。我们可以通过其_id_调用我们想要编辑的对象。链接表达式可以接受_id_作为参数：

```
`<a th:href="/@{'/edit/' + ${dino.id}}">`Edit````</a>````
```

链接表达式可以设置协议相对URL。协议相对类似于绝对URL。URL将使用HTTP或HTTPS协议方案，具体取决于服务器的协议：

```
`<a th:href="@{//baeldung.com}">`Baeldung````</a>````
```

### 7. 片段表达式

片段表达式可以帮助我们在模板文件之间移动标记。这种表达式使我们能够生成可移动的标记片段。

片段表达式的语法是波浪号和花括号的组合。我们的片段位于花括号内：

```
~{...}
```

对于我们的Dino Web应用程序，让我们在_index.html_文件中创建一个带有_fragment_属性的页脚：

```
`<div th:fragment="footer">`
    ```<p>```Copyright 2022`````</p>`````
```</div>```
```

我们现在可以将_footer_注入到其他模板文件中：

```
`<div th:replace="~{index :: footer}">````</div>```
```

### 8. 结论

在本文中，我们查看了各种Thymeleaf简单表达式和示例。

如往常一样，示例的完整源代码可在GitHub上获得。