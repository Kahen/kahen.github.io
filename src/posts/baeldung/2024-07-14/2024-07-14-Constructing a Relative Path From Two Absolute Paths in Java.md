---
date: 2024-07-14
category:
  - Java
  - NIO2
tag:
  - 相对路径
  - 绝对路径
head:
  - - meta
    - name: keywords
      content: Java, NIO2, 相对路径, 绝对路径
---

# 在Java中从两个绝对路径构建相对路径

在本教程中，我们将学习如何在Java中从两个绝对路径构建相对路径。我们将重点关注两个内置的Java API——新的I/O（NIO2）Path API和URI类。

在我们开始之前，让我们快速回顾一下。对于文本中的所有示例，我们将使用用户主目录中的相同文件结构：

```
/ (根目录)
|-- baeldung
    \-- bar
    |   |-- one.txt
    |   |-- two.txt
    \-- foo
        |-- three.txt
```

**绝对路径描述了一个与当前工作目录无关的位置，从根节点开始。**以下是我们文件的绝对路径：

```
one.txt -> /baeldung/bar/one.txt
two.txt -> /baeldung/bar/two.txt
three.txt -> /baeldung/foo/three.txt
```

绝对路径即使我们更改工作目录也总是保持不变。

另一方面，**相对路径描述了目标节点相对于其源的位置**。如果我们在_baeldung_目录中，让我们看看这些文件的相对路径：

```
one.txt -> ./bar/one.txt
two.txt -> ./bar/two.txt
three.txt -> ./foo/three.txt
```

现在，让我们移动到_bar_子目录并再次检查相对路径：

```
one.txt -> ./one.txt
two.txt -> ./two.txt
three.txt -> ../foo/three.txt
```

正如我们所看到的，结果略有不同。我们必须记住，相对值可能会随着我们修改源上下文而改变，而绝对路径是恒定的。绝对路径是相对路径的特殊情况，其中源节点是系统的根。

### 3. NIO2 API

现在我们知道了相对路径和绝对路径的工作原理，是时候看看NIO2 API了。正如我们所知，**NIO2 API是在Java 7发布时引入的，它改进了旧的I/O API，后者有许多陷阱**。使用这个API，我们将尝试确定由它们的绝对路径描述的两个文件之间的相对路径。

让我们首先为我们的文件构建_Path_对象：

```
Path pathOne = Paths.get("/baeldung/bar/one.txt");
Path pathTwo = Paths.get("/baeldung/bar/two.txt");
Path pathThree = Paths.get("/baeldung/foo/three.txt");
```

要构建源和给定节点之间的相对路径，我们可以使用_Path_类提供的_relativize(Path)_方法：

```
Path result = pathOne.relativize(pathTwo);

assertThat(result)
  .isRelative()
  .isEqualTo(Paths.get("../two.txt"));
```

正如我们所见，结果绝对是一个相对路径。这是否正确？尤其是带有父级运算符(../)在开头？

我们必须记住，相对路径可以从任何类型的节点开始指定，可以是目录或文件。特别是当我们使用CLI或资源管理器时，我们处理的是目录。然后所有相对路径都是基于当前工作目录计算的。

在我们的示例中，我们创建了一个指向特定文件的_Path_。所以我们首先需要到达文件的父目录，然后去第二个文件。总的来说，结果是正确的。

如果我们希望结果相对于源目录，我们可以使用_getParent()_方法：

```
Path result = pathOne.getParent().relativize(pathTwo);

assertThat(result)
  .isRelative()
  .isEqualTo(Paths.get("two.txt"));
```

我们应该注意到，_Path_对象可能指向任何文件或目录。如果我们正在构建更复杂的逻辑，我们需要提供额外的检查。

最后，让我们检查_one.txt_和_three.txt_文件之间的相对路径：

```
Path resultOneToThree = pathOne.relativize(pathThree);
Path resultThreeToOne = pathThree.relativize(pathOne);

assertThat(resultOneToThree)
  .isRelative()
  .isEqualTo(Paths.get("../../../foo/three.txt"));
assertThat(result)
  .isRelative()
  .isEqualTo(Paths.get("../bar/one.txt"));

```

这个快速测试证实了**相对路径是上下文依赖的**。虽然绝对路径仍然相同，但当我们交换源和目标节点时，相对路径将会不同。

### 4. _java.net.URI_ API

在检查了NIO2 API之后，让我们转到_java.net.URI_类。我们知道**URI（统一资源标识符）是一串字符，允许我们识别任何资源**，也可以在处理文件时使用。

让我们为我们的文件构建_URI_对象：

```
URI uriOne = pathOne.toURI();
// URI uriOne = URI.create("file:///baeldung/bar/one.txt")
URI uriTwo = pathTwo.toURI();
URI uriThree = pathThree.toURI();
```

我们可以使用_String_构造_URI_对象，或者转换一个已经创建的_Path_。

和以前一样，_URI_类也提供了一个_relativize(URI)_方法。让我们使用它来构建相对路径：

```
URI result = uriOne.relativize(uriTwo);

assertThat(result)
  .asString()
  .contains("file:///baeldung/bar/two.txt");
```

结果并不是我们期望的，相对路径没有正确构建。要回答为什么会这样，我们需要查看类的官方文档。

**这个方法只有在源URI是目标URI的前缀时才返回相对值。**否则，它返回目标值。因此，我们无法在文件节点之间构建相对路径。在这种情况下，一个URI永远不会是另一个URI的前缀。

要返回一个相对路径，我们可以将我们的源_URI_设置为第一个文件的目录：

```
URI uriOneParent = pathOne.getParent().toUri(); // file:///baeldung/bar/
URI result = uriOneParent.relativize(uriTwo);

assertThat(result)
  .asString()
  .contains("two.txt");
```

现在源节点是目标前缀，所以结果计算正确。由于方法的限制，我们无法使用_URI_方法确定_one.txt/two.txt_和_three.txt_文件之间的相对路径。它们的目录不会有共同的前缀。

### 5. 总结

在这篇文章中，我们首先查看了绝对路径和相对路径之间的主要区别。

接下来，我们通过它们的绝对路径构建了两个文件之间的相对路径。我们首先检查了NIO2 API，并详细说明了构建相对路径的过程。

最后，我们尝试使用_java.net.URI_类达到相同的结果。我们发现由于其限制，我们无法使用这个API进行所有的转换。

像往常一样，所有示例和附加测试都可以在GitHub上找到。