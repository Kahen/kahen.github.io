---
date: 2022-04-01
category:
  - Java
  - 字符串格式化
tag:
  - Java
  - 字符串
  - 格式化
  - StringSubstitutor
  - 正则表达式
head:
  - - meta
    - name: keywords
      content: Java字符串格式化, 命名占位符, Apache Commons Text, StringSubstitutor, 正则表达式
---
# Java中字符串格式化的命名占位符

Java标准库提供了`String.format()`方法来格式化基于模板的字符串，例如`String.format("%s is awesome", "Java")`。

在本教程中，我们将探讨如何使字符串格式化支持命名参数。

## 2. 问题介绍

`String.format()`方法使用起来相当直接。然而，当`format()`调用有很多参数时，很难理解哪个值对应哪个格式说明符，例如：

```java
Employee e = ...; // 获取一个员工实例
String template = "Firstname: %s, Lastname: %s, Id: %s, Company: %s, Role: %s, Department: %s, Address: %s ...";
String.format(template, e.firstName, e.lastName, e.Id, e.company, e.department, e.role ... )
```

进一步来说，当我们将这些参数传递给方法时，很容易出错。例如，在上述示例中，我们错误地将`e.department`放在了`e.role`前面。

因此，如果我们能在模板中使用命名参数，然后通过一个`Map`来应用格式化，该`Map`包含所有参数`name->value`映射，那将是一件好事：

```java
String template = "Firstname: ${firstname}, Lastname: ${lastname}, Id: ${id} ...";
ourFormatMethod.format(template, parameterMap);
```

在本教程中，我们将首先看一个使用流行的外部库的解决方案，它可以解决这个问题的大多数情况。然后，我们将讨论一个破坏解决方案的边缘情况。

最后，我们将创建我们自己的`format()`方法来涵盖所有情况。

为了简单起见，我们将使用单元测试断言来验证一个方法是否返回了预期的字符串。

还值得一提的是，**我们本教程将只关注简单字符串格式(`%s`)**。其他格式类型，如日期、数字或具有定义宽度和精度的格式，不受支持。

## 3. 使用Apache Commons Text中的`StringSubstitutor`

Apache Commons Text库包含了许多方便的字符串处理工具。它带有`StringSubstitutor`，允许我们根据命名参数进行字符串替换。

首先，让我们将库作为新的依赖项添加到我们的Maven配置文件中：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-text`</artifactId>`
    `<version>`1.10.0`</version>`
`</dependency>`
```

当然，我们总是可以在Maven中央仓库找到最新版本。

在我们了解如何使用`StringSubstitutor`类之前，让我们创建一个模板作为示例：

```java
String TEMPLATE = "Text: [${text}] Number: [${number}] Text again: [${text}]";
```

接下来，让我们创建一个测试，根据上面的模板使用`StringSubstitutor`构建一个字符串：

```java
Map``````<String, Object>`````` params = new HashMap<>();
params.put("text", "It's awesome!");
params.put("number", 42);
String result = StringSubstitutor.replace(TEMPLATE, params, "${", "}");
assertThat(result).isEqualTo("Text: [It's awesome!] Number: [42] Text again: [It's awesome!]");
```

正如测试代码所示，我们让`params`保存所有`name->value`映射。当我们调用`StringSubstitutor.replace()`方法时，**除了`template`和`params`，我们还传递前缀和后缀来告知`StringSubstitutor`模板中的参数由什么组成**。`StringSubstitutor`将搜索`prefix + map.entry.key + suffix`以获取参数名称。

当我们运行测试时，它通过了。所以，`StringSubstitutor`似乎解决了问题。

## 4. 边缘情况：当替换包含占位符时

我们已经看到`StringSubstitutor.replace()`测试通过了我们的基本用例。然而，一些特殊情况没有被测试覆盖。例如，参数值可能包含参数名称模式“`${ … }`”。

现在，让我们测试这个案例：

```java
Map``````<String, Object>`````` params = new HashMap<>();
params.put("text", "'${number}' is a placeholder.");
params.put("number", 42);
String result = StringSubstitutor.replace(TEMPLATE, params, "${", "}");
```

在上面的测试中，参数“${text}”的值包含文本“${number}”。因此，我们期望“${text}”被文本“${number}”字面替换。

然而，如果我们执行测试，它会失败：

```java
org.opentest4j.AssertionFailedError:
expected: "Text: ['${number}' is a placeholder.] Number: [42] Text again: ['${number}' is a placeholder.]"
 but was: "Text: ['42' is a placeholder.] Number: [42] Text again: ['42' is a placeholder.]"
```

所以，`StringSubstitutor`也将字面`${number}`视为参数占位符。

实际上，`StringSubstitutor`的Javadoc已经说明了这种情况：

> 变量替换通过调用`setEnabledSubstitutionVariables(boolean)`与`true`以递归方式工作。因此，如果一个变量的值包含一个变量，那么这个变量也将被替换。

这是因为，在每一步递归中，`StringSubstitutor`将上一次替换的结果作为新的`template`来进行进一步的替换。

为了绕过这个问题，我们可以选择不同的前缀和后缀，使它们不相互干扰：

```java
String TEMPLATE = "Text: [%{text}] Number: [%{number}] Text again: [%{text}]";
Map``````<String, Object>`````` params = new HashMap<>();
params.put("text", "'${number}' is a placeholder.");
params.put("number", 42);
String result = StringSubstitutor.replace(TEMPLATE, params, "%{", "}");
assertThat(result).isEqualTo("Text: ['${number}' is a placeholder.] Number: [42] Text again: ['${number}' is a placeholder.]");
```

然而，从理论上讲，由于我们无法预测值，值总是有可能包含参数名称模式并干扰替换。

接下来，让我们创建我们自己的`format()`方法来解决问题。

## 5. 自己构建格式化器

我们已经讨论了为什么`StringSubstitutor`不能很好地处理边缘情况。所以，如果我们创建一个方法，困难在于**我们不应该使用循环或递归来将上一步的结果作为当前步骤的新输入**。

### 5.1. 解决问题的思路

我们的想法是在模板中搜索参数名称模式。然而，当我们找到一个时，我们不会立即用来自映射的值替换它。相反，我们构建一个新的模板，该模板可以用于标准的`String.format()`方法。如果我们以我们的例子为例，我们将尝试转换：

```java
String TEMPLATE = "Text: [${text}] Number: [${number}] Text again: [${text}]";
Map``````<String, Object>`````` params ...
```

变为：

```java
String NEW_TEMPLATE = "Text: [%s] Number: [%s] Text again: [%s]";
List``<Object>`` valueList = List.of("'${number}' is a placeholder.", 42, "'${number}' is a placeholder.");
```

然后，我们可以调用`String.format(NEW_TEMPLATE, valueList.toArray());`来完成工作。

### 5.2. 创建方法

接下来，让我们创建一个方法来实现这个想法：

```java
public static String format(String template, Map``````<String, Object>`````` parameters) {
    StringBuilder newTemplate = new StringBuilder(template);
    List``<Object>`` valueList = new ArrayList<>();
    
    Matcher matcher = Pattern.compile("\\$\\{(\\w+)}").matcher(template);
    
    while (matcher.find()) {
        String key = matcher.group(1);
        
        String paramName = "${" + key + "}";
        int index = newTemplate.indexOf(paramName);
        if (index != -1) {
            newTemplate.replace(index, index + paramName.length(), "%s");
            valueList.add(parameters.get(key));
        }
    }
    
    return String.format(newTemplate.toString(), valueList.toArray());
}
```

上面的代码相当直接。让我们快速浏览一下，以理解它的工作原理。

首先，我们声明了两个新变量来保存新模板（`newTemplate`）和值列表（`valueList`）。我们稍后将需要它们来调用`String.format()`。

我们使用正则表达式在模板中定位参数名称模式。然后，我们用“%s”替换参数名称模式，并将相应的值添加到`valueList`变量中。

最后，我们使用新转换的模板和来自`valueList`的值调用`String.format()`。

为了简单起见，我们在方法中硬编码了前缀“${”和后缀“}”。另外，如果翻译没有结束请继续，结束了请回复OK。

如果参数“${unknown}”的值没有提供，我们简单地将“${unknown}”参数替换为“null”。

### 5.3. 测试我们的`format()`方法

接下来，让我们测试一下该方法是否适用于常规情况：

```java
Map``````<String, Object>`````` params = new HashMap<>();
params.put("text", "It's awesome!");
params.put("number", 42);
String result = NamedFormatter.format(TEMPLATE, params);
assertThat(result).isEqualTo("Text: [It's awesome!] Number: [42] Text again: [It's awesome!]");
```

如果我们运行测试，它会通过。

当然，我们也想看看它是否适用于边缘情况：

```java
params.put("text", "'${number}' is a placeholder.");
result = NamedFormatter.format(TEMPLATE, params);
assertThat(result).isEqualTo("Text: ['${number}' is a placeholder.] Number: [42] Text again: ['${number}' is a placeholder.]");
```

如果我们执行这个测试，它也会通过！我们解决了问题。

## 6. 结论

在本文中，我们探讨了如何从一组值中替换基于模板的字符串中的参数。基本上，Apache Commons Text的`StringSubstitutor.replace()`方法相当直接且易于使用，可以解决大多数情况。然而，当值包含参数名称模式时，`StringSubstitutor`可能会产生意想不到的结果。

因此，我们实现了一个`format()`方法来解决这个边缘情况。

如常，示例的完整源代码可在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK