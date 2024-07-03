---
date: 2023-05-XX
category:
  - IntelliJ IDEA
  - Java
tag:
  - 代码编辑
  - 导入优化
head:
  - - meta
    - name: keywords
      content: IntelliJ IDEA, Java, 导入优化, 代码编辑
---

# IntelliJ IDEA中禁用通配符导入

1. 概述
在Java开发中，正确的导入语句对于保持代码可读性和避免潜在冲突非常重要。

IntelliJ IDEA是一个流行的Java集成开发环境（IDE）。因此，在这个快速教程中，我们将探讨如何在IntelliJ IDEA中禁用通配符导入。

2. IntelliJ的优化导入功能
IntelliJ自带了“优化导入”功能，它可以自动重新排列导入语句，例如应用预定义样式、调整顺序、清理未使用的导入等。

我们可以通过菜单项：_Code -> 优化导入_来对当前Java文件应用“优化导入”：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/optimizeImportMenu.jpg)

当然，我们也可以在当前Java文件中使用快捷键来优化导入。

3. IntelliJ中的导入设置
通配符导入是一种常见的做法，它导入包中的所有类，例如`import java.util.*`。通配符导入可以节省按键次数。但是，它们可能会引入歧义，使代码更难理解。

要禁用通配符导入，我们打开设置弹出窗口：_File -> 设置_（或macOS上的“_Preferences_”）。

然后，在设置窗口中，**我们导航到Java导入设置标签：** _**Editor -> Code Style -> Java -> Imports**：

![img](https://www.baeldung.com/wp-content/uploads/2023/05/javaImportSettings-1.jpg)

在“_Imports_”标签下，有三个设置可以影响IntelliJ在Java文件中是否使用通配符导入：

接下来，让我们更仔细地看看它们。

4. 通用开关 – “使用单个类导入”
第一个复选框，“_使用单个类导入_”，是指定我们是否要在Java源文件中启用通配符导入的通用开关。**如果我们不勾选此选项，IntelliJ总是使用通配符导入**。

假设一个Java文件只有两个导入语句：

```java
import java.time.Instant;
import java.util.ArrayList;
```

如果我们不勾选“_使用单个类导入_”选项，并让IntelliJ为我们“_优化导入_”。上述两个导入将变成这样：

```java
import java.time.*;
import java.util.*;
```

**因此，如果我们想要在Java源文件中禁用通配符导入，我们应该勾选“_使用单个类导入_”选项。**

5. “_使用‘*’的类计数_”选项
接下来，让我们看看“_使用‘*’的类计数_”配置。我们可以将此选项的值设置为所需的数字。**当导入的类的数量超过给定值时，IntelliJ会自动从显式导入切换到通配符导入。**

考虑我们Java文件中的导入：

```java
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
```

假设我们在IntelliJ中有以下两个设置：

- “_使用单个类导入_”选项 – 已勾选
- “_使用‘*’的类计数_” – 5

现在，如果我们要求IntelliJ自动优化导入，我们将看到以下内容：

```java
import java.time.Instant;
import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
```

正如我们所看到的，因为我们从_java.util_包中导入了超过五个类，所以导入语句变成了_java.util.*_。

所以，如果我们想要禁用通配符导入，**我们可以将“_使用‘*’的类计数_”的值设置为一个大数字，例如_100_或甚至_999_。**

6. 例外：“_使用‘*’的包_”表
最后，让我们看看“_使用‘*’的包_”表。**该表允许我们添加始终使用通配符导入的包，无论我们是否勾选了“_使用单个类导入_”选项，或者我们为“_使用‘*’的类计数_”配置设置了哪个数字。**

假设我们在IntelliJ中有以下设置：

- “_使用单个类导入_”选项 – 已勾选
- “_使用‘*’的类计数_” – _100_
- “_使用‘*’的包_” – java.util.*（包括子包）

现在，如果我们优化上一节中的Java文件的导入，我们将得到以下内容：

```java
import java.time.Instant;
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
```

由于我们在“_使用‘*’的包_”表中有“_java.util.*_”条目，IntelliJ使用通配符导入_java.util_包中的任何类。

因此，**如果我们想要完全禁用通配符导入，这个表应该是空的。**

7. 结论
在本文中，我们讨论了如何设置三个主要的配置选项，以在IntelliJ中的Java文件中完全禁用通配符导入：

- “_使用单个类导入_”选项 – 勾选选项
- “_使用‘*’的类计数_” – _100_（或999）
- “_使用‘*’的包_” – 保持此表为空

OK