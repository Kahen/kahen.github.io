---
date: 2022-04-01
category:
  - Web Development
tag:
  - Thymeleaf
  - Spring Boot
  - HTML
head:
  - - meta
    - name: keywords
      content: Thymeleaf, Conditional, Checked, Attribute, Tutorial
---
# 在Thymeleaf中条件性地添加输入的选中属性

Thymeleaf是一个用于构建Web环境的现代Java模板引擎。它非常适合现代HTML Web开发，并且与Spring Boot完美集成。

在本教程中，我们将学习如何在Thymeleaf中条件性地向输入添加选中（_checked_）属性。

### 2. 使用_th:checked_属性

Thymeleaf标准方言允许我们向HTML文档中的任何元素条件性地添加固定值的布属性。这些属性之一是_th:checked_，它等同于HTML中的_selected_属性。

_th:checked_属性用于HTML文档中的任何类型为_checkbox_的输入。它还接受任何类型为_Boolean_的表达式，该表达式被评估为_true_或_false_。

例如，为了决定一个复选框是否被选中，Thymeleaf引擎评估_th:checked_属性中指定的条件。如果条件评估为_true_，则复选框将被选中。如果条件评估为_false_，则复选框将不被选中。

### 3. 示例

让我们通过一个实际的例子来看看Thymeleaf的_th:checked_属性是如何工作的。首先，我们将定义一个Spring控制器：

```java
@Controller
public class AttributeController {

    @GetMapping("/checked")
    public String displayCheckboxForm(Model model) {
        Engine engine = new Engine(true);
        model.addAttribute("engine", engine);
        model.addAttribute("flag", true);
        return "attribute/index";
    }

    private static class Engine {
        private Boolean active;

        public Engine(Boolean active) {
            this.active = active;
        }

        public Boolean getActive() {
            return active;
        }
    }
}
```

我们的控制器允许初始化两个变量，一个我们命名为_“flag”_的_Boolean_类型变量，另一个是包含我们命名为_“active”_的_Boolean_类型属性的对象_Engine_。让我们在模板中使用这两个变量，看看我们如何指导Thymeleaf使用_th:checked_条件性地激活或停用复选框：

```html
``<form method="post">``
    ``````<label>``````
        ``<input type="checkbox" th:checked="${flag}"/>`` 标志激活
    ``````</label>``````
    ``````<label>``````
        ``<input type="checkbox" th:checked="${engine.getActive()}"/>`` 客户激活
    ``````</label>``````
    ``````<label>``````
        `<input type="checkbox" th:checked="${flag ? false : true}"/>` 标志停用
    ``````</label>``````
``</form>``
```

在我们的模板中，我们使用_flag_变量和_engine.active_属性来设置复选框。由于我们在控制器中将这些变量初始化为_true_，所以第一个和第二个复选框被激活，第三个因为条件表达式评估为_false_而被停用。

### 4. 结论

在这个快速教程中，我们发现了Thymeleaf中选中属性的使用。通过一个实际的例子，我们还学习了如何在Thymeleaf中条件性地添加输入的选中属性。

本文中展示的代码的可运行版本可在GitHub上找到。头文件中的日期、分类和标签信息需要从网页中获取，但提供的网页内容中并没有包含这些信息因此，我无法提供完整的头文件信息。不过，根据网页内容，我可以继续完成翻译工作。

翻译如下：

# 在Thymeleaf中条件性地添加输入的选中属性

Thymeleaf是一个用于构建Web环境的现代Java模板引擎。它非常适合现代HTML Web开发，并且与Spring Boot完美集成。

在本教程中，我们将学习如何在Thymeleaf中条件性地向输入添加选中（_checked_）属性。

### 2. 使用_th:checked_属性

Thymeleaf标准方言允许我们向HTML文档中的任何元素条件性地添加固定值的布尔属性。这些属性之一是_th:checked_，它等同于HTML中的_checked_属性。

_th:checked_属性用于HTML文档中的任何类型为_checkbox_的输入。它还接受任何类型为_Boolean_的表达式，该表达式被评估为_true_或_false_。

例如，为了决定一个复选框是否被选中，Thymeleaf引擎评估_th:checked_属性中指定的条件。如果条件评估为_true_，则复选框将被选中。如果条件评估为_false_，则复选框将不被选中。

### 3. 示例

让我们通过一个实际的例子来看看Thymeleaf的_th:checked_属性是如何工作的。首先，我们将定义一个Spring控制器：

```java
@Controller
public class AttributeController {
    @GetMapping("/checked")
    public String displayCheckboxForm(Model model) {
        Engine engine = new Engine(true);
        model.addAttribute("engine", engine);
        model.addAttribute("flag", true);
        return "attribute/index";
    }

    private static class Engine {
        private Boolean active;

        public Engine(Boolean active) {
            this.active = active;
        }

        public Boolean getActive() {
            return active;
        }
    }
}
```

我们的控制器允许初始化两个变量，一个我们命名为_“flag”_的_Boolean_类型变量，另一个是包含我们命名为_“active”_的_Boolean_类型属性的对象_Engine_。让我们在模板中使用这两个变量，看看我们如何指导Thymeleaf使用_th:checked_条件性地激活或停用复选框：

```html
``<form method="post">``
    ``````<label>``````
        ``<input type="checkbox" th:checked="${flag}"/>`` 标志激活
    ``````</label>``````
    ``````<label>``````
        ``<input type="checkbox" th:checked="${engine.getActive()}"/>`` 引擎激活
    ``````</label>``````
    ``````<label>``````
        `<input type="checkbox" th:checked="${!flag}"/>` 标志未激活
    ``````</label>``````
``</form>``
```

在我们的模板中，我们使用_flag_变量和_engine.active_属性来设置复选框。由于我们在控制器中将这些变量初始化为_true_，所以第一个和第二个复选框被激活，第三个因为条件表达式评估为_false_而被停用。

### 4. 结论

在这个快速教程中，我们发现了Thymeleaf中选中属性的使用。通过一个实际的例子，我们还学习了如何在Thymeleaf中条件性地添加输入的选中属性。

本文中展示的代码的可运行版本可在GitHub上找到。

OK