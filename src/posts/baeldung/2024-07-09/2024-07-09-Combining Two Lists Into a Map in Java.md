---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Map
  - List
head:
  - - meta
    - name: keywords
      content: Java, Map, List, Combine
------
# Java中将两个列表合并为一个Map

在Java中工作时，通常需要将两个单独的列表关联起来。换句话说，我们有两个列表，一个包含键，另一个携带值。然后我们想要得到一个_映射_（Map），它将键列表中的每个元素与值列表中的相应元素关联起来。

在本教程中，我们将探索不同的实现方式。

## 2. 问题介绍

像往常一样，我们通过一个例子来理解问题。假设我们有两个列表：

```java
final List``<String>`` KEY_LIST = Arrays.asList("Number One", "Number Two", "Number Three", "Number Four", "Number Five");
final List```<Integer>``` VALUE_LIST = Arrays.asList(1, 2, 3, 4, 5);
```

现在，我们希望将上述两个列表与一个_映射_关联起来。但首先，让我们初始化一个包含预期键值对的_哈希映射_（HashMap）：

```java
final Map````<String, Integer>```` EXPECTED_MAP = new HashMap````<String, Integer>````() {{
    put("Number One", 1);
    put("Number Two", 2);
    put("Number Three", 3);
    put("Number Four", 4);
    put("Number Five", 5);
}};
```

正如上面的代码所示，组合两个列表的规则非常简单。接下来，让我们看看如何实现它。

## 3. 关于验证的说明

现在我们已经理解了问题，我们可能意识到给定的两个列表必须包含相同数量的元素，就像_KEY_LIST_和_VALUE_LIST_一样。然而，在实践中，由于我们无法预测我们得到的数据质量，**两个给定的列表可能有不同大小**。如果出现这种情况，我们必须按照要求执行进一步的操作。通常，有两种选择：

- 抛出异常并中断关联操作
- 将不匹配问题报告为警告，并继续创建_映射_对象以仅包含匹配的元素

我们可以使用一个简单的_if_检查来实现这一点：

```java
int size = KEY_LIST.size();
if (KEY_LIST.size() != VALUE_LIST.size()) {
    // 抛出异常或打印警告，并继续使用较小的大小：
    size = min(KEY_LIST.size(), VALUE_LIST.size());
}

// 使用size变量进行进一步处理
```

为了简单起见，我们将假设两个列表始终具有相同的大小，并在后续的代码示例中省略此验证。此外，我们将使用单元测试断言来验证方法是否返回预期的结果。

## 4. 在循环中填充_映射_

**由于两个输入列表具有相同的大小，我们可以使用单个循环将两个列表与_映射_关联**。接下来，让我们看看如何操作：

```java
Map````<String, Integer>```` result = new HashMap<>();
for (int i = 0; i < KEY_LIST.size(); i++) {
    result.put(KEY_LIST.get(i), VALUE_LIST.get(i));
}
assertEquals(EXPECTED_MAP, result);
```

如上例所示，我们创建了一个新的_哈希映射_（HashMap）称为_result_。然后我们使用_for_循环遍历_KEY_LIST_中的每个元素，并对于每个元素，我们使用相同的索引_i_从_VALUE_LIST_中检索相应的元素。然后，_put()_方法将键值对填充到_result_映射中。

## 5. 使用Stream API

Stream API提供了许多简洁高效的方式来操作Java集合。接下来，让我们使用Java Stream API来关联两个列表：

```java
Map````<String, Integer>```` result = IntStream.range(0, KEY_LIST.size())
  .boxed()
  .collect(Collectors.toMap(KEY_LIST::get, VALUE_LIST::get));
assertEquals(EXPECTED_MAP, result);
```

如上所示，_IntStream.range()_方法生成了一个从_0_到_KEY_LIST_大小的整数流。值得一提的是，**_IntStream_是一个原始流**。因此，我们使用_boxed()_方法将_IntStream_转换为_Stream```<Integer>```_，这允许我们使用_collect()_方法将元素收集到一个_映射_中。

## 6. 使用_Iterator_

我们已经学习了两种将两个列表关联并得到一个_映射_作为结果的方法。然而，如果我们仔细看看这两种解决方案，我们会发现两种方法都使用了_List.get()_方法。换句话说，**我们在构建关联时调用_List.get(i)_通过索引访问元素**。这称为随机访问。

如果我们的列表是_ArrayList_，这可能是最常见的情况，数据由数组支持。因此，随机访问是快速的。

然而，如果我们有两个大的_LinkedList_，通过索引访问元素可能会很慢。这是因为**_LinkedList_需要从列表开头迭代到所需的索引**。

因此，使用_Iterator_可能是更有效的方式来遍历列表，特别是对于大列表：

```java
Map````<String, Integer>```` result = new HashMap<>();
Iterator``<String>`` ik = KEY_LIST.iterator();
Iterator```<Integer>``` iv = VALUE_LIST.iterator();
while (ik.hasNext() && iv.hasNext()) {
    result.put(ik.next(), iv.next());
}

assertEquals(EXPECTED_MAP, result);
```

在这个例子中，我们为每个列表创建了两个_Iterator_对象。然后，我们使用_while_循环同时遍历两个列表，使用每个_Iterator_的_next()_方法检索列表中的下一个元素。对于每对元素，我们将键和值放入结果_哈希映射_中，就像前面的示例一样。

## 7. 结论

在本文中，我们通过示例学习了三种将两个给定列表合并为映射的方法。

首先，我们使用_for_循环和基于列表的随机访问解决了问题。然后，我们讨论了当我们的输入是_LinkedList_时，随机访问方法的性能问题。

最后，我们看到了基于_Iterator_的解决方案，这样无论我们有哪种_列表_实现，都可以有更好的性能。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。