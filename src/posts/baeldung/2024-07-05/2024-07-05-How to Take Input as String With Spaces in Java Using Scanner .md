---
date: 2022-04-01
category:
  - Java
  - Scanner
tag:
  - Java
  - Scanner
  - Input
  - Spaces
head:
  - - meta
    - name: keywords
      content: Java, Scanner, Input, Spaces
---

# Java中使用Scanner类处理带空格的输入

在Java编程中，获取和解析用户输入是一项常见任务，处理包含空格的输入有时可能会有些棘手。

在本教程中，我们将探讨如何使用_Scanner_类在Java中以包含空格的字符串形式接收输入。

## 2. 问题介绍

让我们通过一个简单的例子来理解问题。

假设我们的扫描器接收两行文本。第一行是一个人的名字，第二行简要描述了这个人：

```java
String input = new StringBuilder().append("Michael Jackson\n")
  .append("He was the 'King of Pop'.\n")
  .toString();

Scanner sc = new Scanner(input);
```

为了简单起见，我们将使用字符串来“喂养”_Scanner_对象，并使用单元测试断言来验证结果是否符合预期。

通常，我们将**使用_Scanner.next()_方法从扫描器中读取下一个token**。

接下来，让我们尝试从我们的扫描器对象中读取两个token：

```java
String name = sc.next();
String description = sc.next();
assertEquals("Michael", name);
assertEquals("Jackson", description);
```

如果我们运行测试，它会通过。显然，_Scanner_并不智能地理解我们的要求。相反，**它使用空格，包括空格和换行符作为默认分隔符来读取token**。因此，我们得到的是“_Michael_”而不是“_Michael Jackson_”作为人的名字。

实际上，这个例子只展示了处理包含空格的输入值的一个场景。可以有两种场景：

- 每行一个值，正如我们的“_Michael Jackson_”示例所示
- 由特殊分隔符分隔的值

接下来，我们将找出如何从_Scanner_对象中读取包含空格的值。当然，我们将涵盖这两种场景。

## 3. 每行一个值

让我们首先更仔细地看看“每行一个值”的场景。我们仍然使用前一节中的“_Michael Jackson_”示例作为本节的输入。

### 3.1. 使用_nextLine()_方法

由于我们想要从扫描器中读取整行作为值，_Scanner的_nextLine()_方法是一个不错的选择。**_nextLine()_方法从当前位置读取到下一个换行符**：

```java
Scanner sc = new Scanner(input);
String name = sc.nextLine();
String description = sc.nextLine();
assertEquals("Michael Jackson", name);
assertEquals("He was the 'King of Pop'.", description);
```

正如上面的代码所示，_nextLine()_直接解决了问题。

### 3.2. 使用‘_\n_’作为分隔符

我们之前提到过_Scanner_默认将空格和换行符视为分隔符。**如果我们告诉_Scanner_只将换行符作为分隔符，我们仍然可以使用_next()_方法将一行作为token读取**。让我们创建一个测试来验证它：

```java
Scanner sc = new Scanner(input);
sc.useDelimiter("\n");
String name = sc.next();
String description = sc.next();
assertEquals("Michael Jackson", name);
assertEquals("He was the 'King of Pop'.", description);
```

正如我们所看到的，_useDelimiter()_方法是解决问题的关键。

## 4. 由特殊分隔符分隔的值

有时，我们的输入具有预定义的格式。例如，一个逗号和一个空格将输入行中的三个伟大艺术家的名字分开：“_Michael Jackson, Whitney Houston, John Lennon_”。

接下来，让我们看看在这种情况下如何读取预期的值。

### 4.1. 使用_String.split()_方法

解决这个问题的第一个想法仍然是使用_nextLine()_读取整行。然后，**我们可以将分隔符模式传递给方便的_String.split()_方法以获得数组中的值：**

```java
String input = "Michael Jackson, Whitney Houston, John Lennon\n";

Scanner sc = new Scanner(input);
String[] names = sc.nextLine().split(", ");
assertArrayEquals(new String[] { "Michael Jackson", "Whitney Houston", "John Lennon" }, names);
```

上面的测试显示我们已经正确地将三个名字存储在字符串数组中。

### 4.2. 自定义分隔符

使用分隔符模式的_split()_方法可以处理具有自定义分隔符的值。然而，由于Java中的数组具有固定大小，如果扫描器输入有多个行，合并数组可能会很慢。

**通常，我们会在Java中使用列表而不是数组**。所以接下来，让我们调整_Scanner的_分隔符，并将名字存储在列表中，使用_Scanner的_next()_方法。

我们已经学会了使用_useDelimiter()_方法来设置自定义分隔符模式。由于这个输入示例的分隔符是一个逗号和一个空格，有些人可能会想到：_useDelimiter(", ")_。

所以接下来，让我们在输入中添加一个名字，看看这个想法是否如预期工作：

```java
String input = new StringBuilder().append("Michael Jackson, Whitney Houston, John Lennon\n")
  .append("Elvis Presley\n")
  .toString();

Scanner sc = new Scanner(input);
sc.useDelimiter(", ");
List``<String>`` names = new ArrayList<>();
while (sc.hasNext()) {
    names.add(sc.next());
}
assertEquals(Lists.newArrayList("Michael Jackson", "Whitney Houston", "John Lennon", "Elvis Presley"), names);
```

**如果我们运行这个测试，它会失败**。真是个惊喜！所以，让我们通过几个断言来弄清楚我们在列表中有什么：

```java
assertEquals(3, names.size());
assertEquals("John Lennon\nElvis Presley\n", names.get(2));
```

我们可以看到我们的结果列表有四个元素而不是三个。另外，第三个元素是_“John Lennon\nElvis Presley\n”_。这是因为我们设置了“, ”作为分隔符。然后，换行符成为token的一部分。所以**_next()_方法将把换行符视为token中的其他普通字符**。

现在我们理解了问题的原因。那么解决起来就很容易了——**我们必须在分隔符模式中添加‘_\n_’**：

```java
Scanner sc = new Scanner(input);
sc.useDelimiter(", |\n");
List``<String>`` names = new ArrayList<>();
while (sc.hasNext()) {
    names.add(sc.next());
}
assertEquals(Lists.newArrayList("Michael Jackson", "Whitney Houston", "John Lennon", "Elvis Presley"), names);
```

这次，测试通过了。

## 5. 结论

在本文中，我们通过示例学习了如何从_Scanner_读取包含空格的值。文章涵盖了两种场景，我们探讨了解决问题的不同方法。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。