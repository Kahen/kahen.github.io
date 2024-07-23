---
date: 2021-12-01
category:
  - Javadoc
  - 多行代码示例
tag:
  - Java
  - 文档
  - 代码格式
head:
  - - meta
    - name: keywords
      content: Javadoc, 多行代码, HTML, 格式, 文档生成
---

# Javadoc注释中多行代码示例的格式

在本教程中，我们将探索不同的方式来格式化Javadoc注释。我们将**专注于分析在文档注释中编写的代码片段的格式**。

## 2. 引言

Javadoc是一个用于为Java类生成文档的工具。它**处理Java源文件中指定的文档注释，并生成相应的HTML页面**。

请参阅我们的文章以了解更多关于Javadoc文档的信息。

我们可以将代码片段作为Java类文档注释的一部分。我们希望在生成的HTML页面上查看具有正确缩进和字符的代码片段。

让我们尝试将Java代码片段作为我们的注释的一部分添加：

```java
/**
 * 这是展示Javadocs中代码片段格式默认行为的一个示例
 *
 */
```

相应的HTML页面：
![img](https://www.baeldung.com/wp-content/uploads/2021/12/Javadoc-Default.png)

**默认情况下，在Javadoc注释中不保留换行和空格**。这导致不当的缩进，特别是在多行代码片段的情况下。

让我们找到一种方法来保持注释中正确的缩进。

### 3.1. 使用```````````<pre>```````````标签

HTML提供了```````````<pre>```````````标签来表示预格式化的文本。**它保留了所包含文本的空格和换行**，从而保留了代码片段所需的缩进：

```java
/**
 * 这是展示在Javadocs中使用HTML pre标签进行代码片段格式的示例
 *
 * ``````````<pre>``````````
 * public class Application(){
 *     List````````````<Integer>```````````` nums = new ArrayList<>();
 * }
 * ````````</pre>````````
 *
 */
```

相应的HTML页面：
![img](https://www.baeldung.com/wp-content/uploads/2021/12/Javadoc-PRE.png)

在这里，我们成功地保留了我们代码片段所需的空格和换行。然而，我们现在遇到了一个不同的问题：我们无法看到作为代码片段一部分输入的**泛型**。

由于注释被解析为HTML页面，**代码片段的部分可能会被误解为HTML标签**，就像上面例子中的`````````````<Integer>`````````````。

让我们探索保持注释中嵌入的HTML字符正确格式的方法。

### 3.2. 使用HTML字符实体

如果我们的代码片段包含HTML保留字符，如'`<'、'>`'或'&'，这些在解析注释时可能会被解释为HTML字符。为了保留这些字符，**我们可以使用字符实体**来代替所需的字符。

例如，我们可以使用`&lt;`来表示'<'字符：

```java
/**
 * 这是展示在Javadocs中使用HTML字符实体进行代码片段格式的示例
 *
 * ``````````<pre>``````````
 * public class Application(){
 *     List&lt;Integer&gt; nums = new ArrayList&lt;&gt;();
 * }
 * ````````</pre>````````
 *
 */
```

相应的HTML页面：
![img](https://www.baeldung.com/wp-content/uploads/2021/12/Javadoc-CharacterEntities.png)

### 3.3. 使用`@code`标签

Javadoc提供了一个`@code`标签，它**将括号内嵌入的注释视为源代码而不是HTML字符**。这使我们能够直接使用HTML保留字符，而不需要使用字符实体来转义它们：

```java
/**
 * 这是展示在Javadocs中使用javadoc代码标签进行代码片段格式的示例
 *
 * ``````````<pre>``````````
 *
 * public class Application(){
 *     {@code List````````````<Integer>```````````` nums = new ArrayList````````````<Integer>````````````();}
 * }
 *
 * ````````</pre>````````
 *
 */
```

相应的HTML页面：
![img](https://www.baeldung.com/wp-content/uploads/2021/12/Javadoc-Code-Tag.png)

请注意，**`@code`标签并不解决我们注释中涉及的缩进问题**。为此，我们需要额外使用```````````<pre>```````````标签。

正如我们上面看到的，**Javadoc使用'@'字符来识别标签**。如果我们的代码片段中有'@'作为一部分，它将被Javadoc误解，导致注释渲染不正确。

让我们通过一个例子来看看：

```java
/**
 * 这是展示在Javadocs中使用注释时遇到的问题的示例
 *
 * ``````````<pre>``````````
 *
 * public class Application(){
 *            @Getter
 *     {@code List````````````<Integer>```````````` nums = new ArrayList````````````<Integer>````````````();}
 * }
 *
 * ````````</pre>````````
 *
 */
```

相应的HTML页面：
![img](https://www.baeldung.com/wp-content/uploads/2021/12/Javadoc-Annotation-Issue.png)

正如我们所看到的，Javadoc将`@Getter`处理为一个标签，注释没有正确渲染。我们可以**将注释（或使用'@'字符的代码）嵌入Javadoc提供的`@code`标签**中：

```java
/**
 * 这是展示在Javadocs中使用javadoc代码标签处理'@'字符的示例
 *
 * ``````````<pre>``````````
 *
 * public class Application(){
 *     {@code @Getter}
 *     {@code List````````````<Integer>```````````` nums = new ArrayList````````````<Integer>````````````();}
 * }
 *
 * ````````</pre>````````
 *
 */
```

相应的HTML页面：
![img](https://www.baeldung.com/wp-content/uploads/2021/12/Javadoc-Annotations-Code-Tag.png)

### 3.4. 使用`@literal`标签

我们也可以通过使用`@literal`标签来实现**类似的行为**。`@code`标签和`@literal`标签的唯一区别在于**`@code`标签将封闭的文本格式化为代码字体**：

```java
/**
 * 这是展示javadoc字面量和代码标签之间差异的示例
 *
 * `<p>`
 *
 * {@literal @Getter}
 * {@literal List````````````<Integer>```````````` nums = new ArrayList````````````<Integer>````````````(); }
 *
 * `<br />`
 * {@code @Getter}
 * {@code List````````````<Integer>```````````` nums = new ArrayList````````````<Integer>````````````(); }
 * `</p>`
 *
 */
```

相应的HTML页面：

因此，我们在HTML页面上正确地渲染了代码片段。

### 3.5. 格式化jQuery代码片段

这里，我们以Java代码片段为例。相同的功能也适用于其他任何语言。

让我们将一个简单的jQuery代码片段作为文档注释包括进来：

```java
/**
 * 这是展示嵌入文档注释中的jQuery代码片段的示例
 * ``````````<pre>``````````
 * {@code `<script>`}
 * $(document).ready(function(){
 *     console.log("Hello World!);
 * })
 * {@code `</script>`}
 * ````````</pre>````````
 *
 */
```

相应的HTML页面：

### 3.6. 格式化HTML代码片段

到目前为止，我们已经意识到，一方面，Javadoc使我们能够使用HTML标签来格式化我们的注释，而另一方面，当我们想要在没有标记的情况下使用HTML字符时，它也可能导致问题。

例如，我们可能想要在我们的注释中插入HTML代码片段。

让我们将HTML代码片段作为我们文档注释的一部分插入，并看看它的行为如何：

```java
/**
 * 这是展示嵌入文档注释中的HTML代码片段的示例
 * ``````````<pre>``````````
 * ``<html>``
 * ``<body>``
 * ``<h1>``Hello World!``</h1>``
 * ``</body>``
 * ``</html>``
 * ````````</pre>````````
 *
 */
```

相应的HTML页面：

在这里，我们可以看到，嵌入注释中的代码片段已经被**解析为带有HTML标记的HTML页面**。我们可以使用上面讨论的**`@code`标签**来**解决问题**：

```java
/**
 * 这是展示嵌入文档注释中的HTML代码片段的示例
 * ``````````<pre>``````````{@code
 * ``<html>``
 * ``<body>``
 * ``<h1>``Hello World!``</h1>``
 * ``</body>``
 * ``</html>``
 * }````````</pre>````````
 *
 */
```

相应的HTML页面：

## 4. 结论

我们已经探索了不同的方式来格式化Javadoc注释。**我们可以根据我们的要求选择格式化选项来生成格式良好的文档**。

我们可以使用HTML标签来增强Javadoc注释的格式，并且在适当的时候也可以转义它们。