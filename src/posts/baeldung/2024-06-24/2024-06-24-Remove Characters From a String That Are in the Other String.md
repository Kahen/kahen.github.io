---
date: {2024-06-25}
category:
  - Java
  - 字符串操作
tag:
  - Java
  - 字符串
  - 性能分析
head:
  - - meta
    - name: keywords
      content: Java, 字符串, 性能分析
------
# 从字符串中移除另一个字符串中存在的字符

当我们使用Java时，经常会遇到需要精确度和元素间协作的任务。基于另一个字符串中的存在来移除字符串中的字符就是这样一个问题。

在本教程中，我们将探索实现此任务的各种技术。

## 2. 问题介绍

像往常一样，一个例子可以帮助我们快速理解问题。假设我们有两个字符串：

```java
String STRING = "a b c d e f g h i j";
String OTHER = "bdfhj";
```

我们的目标是**从_STRING_字符串中移除存在于_OTHER_字符串中的字符**。因此，我们期望得到以下字符串作为结果：

```java
"a  c  e  g  i "
```

在本教程中，我们将学习解决这个问题的各种方法。我们还将对这些解决方案进行单元测试，以验证它们是否产生预期的结果。

## 3. 使用嵌套循环

我们知道，可以使用标准的_toCharArray()_方法将字符串轻松地分割成_char_数组。因此，一种直接且经典的方法是首先将两个字符串转换为两个_char_数组。然后，**对于_STRING_中的每个字符，我们通过检查它是否在_OTHER_中来决定是否要移除它**。

我们可以使用嵌套的for循环来实现这个逻辑：

```java
String nestedLoopApproach(String theString, String other) {
    StringBuilder sb = new StringBuilder();
    for (char c : theString.toCharArray()) {
        boolean found = false;
        for (char o : other.toCharArray()) {
            if (c == o) {
                found = true;
                break;
            }
        }
        if (!found) {
            sb.append(c);
        }
    }
    return sb.toString();
}
```

值得注意的是，由于Java字符串是不可变对象，我们使用_StringBuilder_而不是'+'运算符来连接字符串，以获得更好的性能。

接下来，让我们创建一个测试：

```java
String result = nestedLoopApproach(STRING, OTHER);
assertEquals("a  c  e  g  i ", result);
```

如果我们运行测试，测试就会通过，所以这个方法是有效的。

由于对于_STRING_中的每个字符，我们都要检查一遍_OTHER_字符串，**这个解决方案的时间复杂度是O(n^2)**。

## 4. 用_indexOf()_方法替换内层循环

在嵌套循环解决方案中，我们创建了_boolean_标志_found_来存储当前字符是否在_OTHER_字符串中找到，然后通过检查_found_标志来决定我们是否需要保留或丢弃这个字符。

Java提供了_String.indexOf()_方法，允许我们在字符串中定位给定的字符。此外，**如果字符串不包含给定的字符，该方法返回_-1_**。

所以，如果我们使用_String.indexOf()_方法，就不需要内层循环和_found_标志了：

```java
String loopAndIndexOfApproach(String theString, String other) {
    StringBuilder sb = new StringBuilder();
    for (char c : theString.toCharArray()) {
        if (other.indexOf(c) == -1) {
            sb.append(c);
        }
    }
    return sb.toString();
}
```

正如我们所看到的，这种方法的代码比嵌套循环更容易理解，并且它也通过了测试：

```java
String result = loopAndIndexOfApproach(STRING, OTHER);
assertEquals("a  c  e  g  i ", result);
```

尽管这个实现紧凑且易于阅读，**由于_String.indexOf()_方法内部通过循环搜索字符串中的字符，其时间复杂度仍然是O(n^2)**。

接下来，让我们看看是否可以找到一个时间复杂度更低的解决方案。

## 5. 使用_HashSet_

_HashSet_是一个常用的集合数据结构。它在内部_HashMap_中存储元素。

**由于哈希函数的时间复杂度是O(1)，_HashSet_的_contains()_方法是O(1)操作**。

因此，我们可以先在_HashSet_中存储_OTHER_字符串中的所有字符，然后检查_STRING_中的每个字符：

```java
String hashSetApproach(String theString, String other) {
    StringBuilder sb = new StringBuilder();
    Set`<Character>` set = new HashSet<>(other.length());
    for (char c : other.toCharArray()) {
        set.add(c);
    }

    for (char i : theString.toCharArray()) {
        if (set.contains(i)) {
            continue;
        }
        sb.append(i);
    }
    return sb.toString();
}
```

正如上面的代码所示，实现相当直接。现在，让我们深入了解其性能。

最初，我们遍历一个字符串来填充_Set_对象，使其成为O(n)操作。随后，对于另一个字符串中的每个字符，我们使用_set.contains()_方法。这导致n次O(1)，成为另一个O(n)复杂度。因此，**整个解决方案包括两个O(n)操作**。

然而，**由于两个因素是一个常数，解决方案的整体时间复杂度仍然是O(n)**。与之前的O(n^2)解决方案相比，这是一个显著的改进，表现出更快的执行速度。

最后，如果我们测试_hashSetApproach()_方法，它给出了预期的结果：

```java
String result = hashSetApproach(STRING, OTHER);
assertEquals("a  c  e  g  i ", result);
```

## 6. 结论

在本文中，我们探讨了基于另一个字符串中的存在来从字符串中移除字符的三种不同方法。

此外，我们进行了性能分析，特别关注时间复杂度。结果揭示了嵌套循环和使用_indexOf()_的循环具有相同的时间复杂度，而使用_HashSet_的解决方案是最高效的。

如往常一样，示例的完整源代码可在GitHub上获得。