---
date: 2024-06-20
category:
  - Selenium
  - Web Automation
tag:
  - CSS Selectors
  - Web Testing
head:
  - - meta
    - name: keywords
      content: Selenium, Web Automation, CSS Selectors, Element Locator, Attribute Search
---

# Selenium中通过属性查找元素

Selenium提供了多种在网页上定位元素的方法，我们经常需要基于元素的属性来查找它。属性是额外的信息片段，可以添加以提供更多的上下文或功能。它们大致可以分为两种类型：

- 标准属性：这些属性是预定义的，并且被浏览器所识别。例如_id_, _class_, _src_, _href_, _alt_, _title_等。标准属性具有预定义的含义，并且在不同的HTML元素中广泛使用。
- 自定义属性：自定义属性不是HTML规范预定义的，而是由开发人员为特定需求创建的。这些属性通常以“_data-_”开头，后面跟着一个描述性名称。例如_data-id_, _data-toggle_, _data-target_等。自定义属性对于存储与元素相关的额外信息或元数据很有用，它们通常在Web开发中用于在HTML和JavaScript之间传递数据。

在本教程中，我们将深入使用CSS来精确定位网页上的元素。我们将探索通过属性名称或描述来查找元素，包括完全匹配和部分匹配的选项。到结束时，我们将能够轻松地找到页面上的任何元素！

### 2. 通过属性名称查找元素
最简单的场景之一是基于特定属性的存在来查找元素。考虑一个网页上有许多按钮，每个按钮都标记有一个名为“_data-action_”的自定义属性。现在，假设我们想要定位页面上具有此属性的所有按钮。在这种情况下，我们可以使用_\[attribute\]_定位器：

```
driver.findElements(By.cssSelector("[data-action]"));
```

在上面的代码中，_\[data-action\]_将选择页面上具有目标属性的所有元素，我们将收到一个_WebElements_列表。

### 3. 通过属性值查找元素
**当我们需要定位具有唯一属性值的具体元素时，我们可以使用CSS定位器的严格匹配变体\[attribute=value\]**。这种方法允许我们找到具有完全属性值匹配的元素。

让我们继续以我们的网页为例，按钮具有一个“_data-action_”属性，每个按钮都被分配了一个不同的动作值。例如_data-action='delete'_, _data-action='edit'_等。如果我们想要定位具有特定动作的按钮，例如“delete”，我们可以使用具有精确匹配的属性选择器：

```
driver.findElement(By.cssSelector("[data-action='delete']"));
```

### 4. 通过属性值的开始部分查找元素
在确切的属性值可能不同但以特定子字符串开始的情况下，我们可以使用另一种方法。

考虑一个场景，我们的应用程序有许多弹出窗口，每个窗口都有一个名为“_data-action_”的自定义属性的“Accept”按钮。这些按钮可能有附加在共享前缀后的不同的标识符，例如“_btn_accept_user_pop_up_”, “_btn_accept_document_pop_up_”等。我们可以使用_\[attribute^=value\]_定位器在基类中编写通用定位器：

```
driver.findElement(By.cssSelector("[data-action^='btn_accept']"));
```

这个定位器将找到“data-action”属性值以“btn_accept”开头的元素，因此我们可以为每个弹出窗口编写一个通用的“Accept”按钮定位器。

### 5. 通过属性值的结尾查找元素
类似地，**当我们的属性值以特定后缀结束时**，让我们使用_\[attribute$=value\]_。假设我们有一个页面上的URL列表，想要获取所有PDF文档引用：

```
driver.findElements(By.cssSelector("[href$='.pdf']"));
```

在这个例子中，driver将找到所有“href”属性值以“.pdf”结尾的元素。

### 6. 通过属性值的一部分查找元素
当我们不确定属性的前缀或后缀时，将有助于使用包含方法_\[attribute\*=value\]_。考虑一个场景，我们想要获取所有引用特定资源路径的元素：

```
driver.findElements(By.cssSelector("[href*='archive/documents']"));
```

在这个例子中，我们将收到所有引用来自存档文件夹的文档的元素。

### 7. 通过特定类查找元素
**我们可以使用它的类作为属性来定位一个元素**。这是一种常见的技术，特别是当检查一个元素是否被启用，禁用，或者具有在其类中反映的其他能力时。考虑我们想要找到一个禁用的按钮：

```
`<a href="#" class="btn btn-primary btn-lg disabled" role="button" aria-disabled="true">`Accept`</a>`
```

这次，让我们对角色使用严格匹配，并包含对类的匹配：

```
driver.findElement(By.cssSelector("[role='button'][class*='disabled']"));
```

在这个例子中，“class”被用作属性定位器_\[attribute\*=value\]_，并在值“btn btn-primary btn-lg disabled”中检测到“disabled”部分。

### 8. 结论
在本教程中，我们探索了基于属性的不同方式来定位元素。

我们将属性分为两种主要类型：标准，由浏览器识别并具有预定义的含义；自定义，由开发人员创建以满足特定要求。

使用CSS选择器，我们学习了如何高效地基于属性名称、值、前缀、后缀甚至子字符串来查找元素。理解这些方法为我们提供了强大的工具，可以轻松地定位元素，使我们的自动化任务更加顺畅和高效。

如常，所有代码示例都可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。