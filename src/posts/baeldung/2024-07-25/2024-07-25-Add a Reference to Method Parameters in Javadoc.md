---
date: 2021-09-01
category:
  - Java
  - Javadoc
tag:
  - Java
  - Javadoc
  - Method Parameters
head:
  - - meta
    - name: keywords
      content: Java, Javadoc, Method Parameters, Documentation
---
# 在Javadoc中添加方法参数引用

在Java语言中，我们可以使用Javadoc从Java源代码生成HTML格式的文档。本教程将介绍在Javadoc中添加方法参数引用的不同方式。

## 不同的在Javadoc中添加方法参数引用的方式

在这一部分，我们将讨论如何在Javadoc中添加方法参数的引用。我们将看到内联标签`{@code}`和HTML样式标签````````````<code>````````````在Javadoc中的使用。

此外，我们将看到`{@code}`和````````````<code>````````````标签如何处理一些特殊情况：

- 显示特殊字符‘`<’，‘>`’和‘@’
- 缩进和换行的处理
- 处理HTML代码的转义 — 例如，`&lt;`转换为符号‘<’

### 2.1. `{@code}`标签

`{@code}`是一个内联标签，包含在JDK 1.5中。

`{@code}`标签以代码字体格式化文本。`{@code abc}`等同于````````````<code>```````````{@literal abc}`````</code>``````。

**我们不需要手动转义`{@code}`标签内使用的任何特殊字符。**

当我们使用`{@code}`标签时，它：

- 正确显示‘````<’和‘>````’
- 正确显示‘@’
- 不需要通过HTML数字代码转义特殊字符
- 更易读且简洁

让我们在一个类中创建一个简单的方法，并使用`{@code}`标签添加一些Javadoc：

```java
/**
  * 这个方法接受一个{@code String}
  * 并在给定的列表{@code List```````<String>```````}中搜索
  *
  * @param name 人的名字
  * @param avengers 复仇者名单列表
  * @return 如果找到返回true，否则返回false
  */
public Boolean isAvenger(String name, List```````<String>``````` avengers) {
    return avengers.contains(name);
}
```

**在这里，我们可以看到我们不需要转义特殊字符‘````<’和‘>````’。**

生成的Javadoc将渲染HTML输出为：

**![img](https://www.baeldung.com/wp-content/uploads/2021/09/method1-1024x482-1.png)**

**同样，我们可以看到我们不需要转义‘@’字符：**

```java
/**
  * 这是显示@使用示例，无需任何手动转义。
  * {@code @AnyAnnotation}
  */
public void javadocTest() {
}
```

这将渲染为HTML Javadoc为：

**![img](https://www.baeldung.com/wp-content/uploads/2021/09/method2-1024x320-1.png)**

在Javadoc中的多行代码片段的情况下，`{@code}`不会保持缩进和换行。为了克服这个问题，我们可以使用HTML标签``<pre>``与`{@code}`一起使用。然而，在这种情况下我们需要转义‘@’字符。

### 2.2. ````````````<code>````````````标签

````````````<code>````````````是Javadoc支持的HTML样式标签。

当我们使用````````````<code>````````````标签时，它：

- 不正确显示‘````<’和‘>````’
- 需要通过HTML数字代码转义特殊字符
- 不那么易读

让我们再次考虑同一个例子。我们可以看到**生成的Javadoc HTML缺少了我们段落中_List_后的_```````<String>```````_参数化类型：**

```java
/**
  * 这个方法接受一个```````````<code>```````````String`````</code>`````
  * 并在给定的```````````<code>```````````List```````<String>````````````</code>`````中搜索
  *
  * @param name 人的名字
  * @param avengers 复仇者名单列表
  * @return 如果找到返回true，否则返回false
  */
public Boolean isAvenger(String name, List```````<String>``````` avengers) {
    return avengers.contains(name);
}
```

**![img](https://www.baeldung.com/wp-content/uploads/2021/09/method3-1024x459-1.png)**

在这里，如果我们在方法注释中转义特殊字符‘````<’和‘>````’，那么它将在Javadoc中正确渲染_```````<String>```````_：

```java
/**
  * 这个方法接受一个```````````<code>```````````String`````</code>`````
  * 并在给定的```````````<code>```````````List&lt;String&gt;`````</code>`````中搜索
  *
  * @param name 人的名字
  * @param avengers 复仇者名单列表
  * @return 如果找到返回true，否则返回false
  */
public Boolean isAvenger(String name, List```````<String>``````` avengers) {
    return avengers.contains(name);
}
```

**![img](https://www.baeldung.com/wp-content/uploads/2021/09/method4-1024x482-1.png)**

## 结论

在本教程中，我们首先讨论了如何在Javadoc中使用`{@code}`和````````````<code>````````````来引用方法参数。然后我们描述了这些标签对特殊字符的处理。总之，我们现在理解了如何在Javadoc中添加方法参数的引用，并且**我们可以看到`{@code}`在任何时候都比````````````<code>````````````更好**。