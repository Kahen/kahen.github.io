---
date: 2022-04-01
category:
  - Thymeleaf
  - JavaScript
tag:
  - Thymeleaf
  - JavaScript
  - Spring
head:
  - - meta
    - name: keywords
      content: Thymeleaf, JavaScript, Spring
------
# JavaScript 函数调用与 Thymeleaf | Baeldung

## 1. 概述

在本教程中，我们将在 Thymeleaf 模板中调用 JavaScript 函数。

我们将从设置依赖开始。然后，我们将添加我们的 Spring 控制器和 Thymeleaf 模板。最后，我们将展示基于其输入调用 JavaScript 函数的方法。

## 2. 设置

为了在我们的应用程序中使用 Thymeleaf，让我们将 Thymeleaf Spring 5 依赖项添加到我们的 Maven 配置中：

```xml
`<dependency>`
    `<groupId>`org.thymeleaf`</groupId>`
    `<artifactId>`thymeleaf-spring5`</artifactId>`
    `<version>`3.1.2.RELEASE`</version>`
`</dependency>`
```

然后，让我们基于我们的 _Student_ 模型添加到我们的 Spring 控制器：

```java
@Controller
public class FunctionCallController {

    @RequestMapping(value = "/function-call", method = RequestMethod.GET)
    public String getExampleHTML(Model model) {
        model.addAttribute("totalStudents", StudentUtils.buildStudents().size());
        model.addAttribute("student", StudentUtils.buildStudents().get(0));
        return "functionCall.html";
    }
}
```

最后，我们将这两个 JavaScript 函数添加到我们的 _functionCall.html_ 模板下 _src/main/webapp/WEB-INF/views_：

```html
`<script th:inline="javascript">`
    function greetWorld() {
        alert("hello world")
    }

    function salute(name) {
        alert("hello: " + name)
    }
`</script>`
```

我们将使用这两个函数来说明我们在下一节中的示例。

如果有任何问题，我们可以随时检查如何将 JavaScript 添加到 Thymeleaf。

## 3. 在 Thymeleaf 内调用 JavaScript 函数

### 3.1. 使用无输入的函数

这是我们如何调用上面的 _greetWorld_ 函数的方式：

```html
`<button th:onclick="greetWorld()">`使用无变量``````</button>``````
```

它适用于任何自定义或内置的 JavaScript 函数。

### 3.2. 使用静态输入的函数

如果我们不需要 JavaScript 函数中的任何动态变量，这是如何调用它的：

```html
`<button th:onclick="'alert(\'static variable used here.\');'">`使用静态变量``````</button>``````
```

这需要转义单引号，不需要 SpringEL。

### 3.3. 使用动态输入的函数

有四种方式调用带有变量的 JavaScript 函数。

插入变量的第一种方式是使用内联变量：

```html
`<button th:onclick="'alert(\'There are exactly '  + ${totalStudents} +  ' students\');'">`使用内联动态变量``````</button>``````
```

另一种选择是通过调用 _javascript:function_：

```html
`<button th:onclick="'javascript:alert(\'There are exactly ' + ${totalStudents} + ' students\');'">`使用 javascript:function``````</button>``````
```

第三种方式是使用数据属性：

```html
`<button th:data-name="${student.name}" th:onclick="salute(this.getAttribute('data-name'))">`使用数据属性``````</button>``````
```

**这种方法在调用 JavaScript 事件，如 _onClick_ 和 _onLoad_ 时非常有用。**

最后，我们可以使用双方括号语法调用我们的 _salute_ 函数：

```html
`<button th:onclick="salute([[${student.name}]])">`使用双括号``````</button>``````
```

**双方括号之间的表达式在 Thymeleaf 中被视为内联表达式**。这就是为什么我们可以使用任何在 _th:text_ 属性中也有效的表达式。

## 4. 结论

在本教程中，我们学习了如何在 Thymeleaf 模板中调用 JavaScript 函数。我们从设置依赖开始。然后，我们构建了我们的控制器和模板。最后，我们探索了在 Thymeleaf 内调用任何 JavaScript 函数的方法。

一如既往，代码可以在 GitHub 上找到。