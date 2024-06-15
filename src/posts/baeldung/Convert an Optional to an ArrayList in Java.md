---
date: 2024-06-16
category:
  - Java
tag:
  - Optional
  - ArrayList
  - Java 8
  - 转换
---
# Java中将Optional转换为ArrayList的方法 | Baeldung

## 1. 引言

Java 8引入了_Optional_类来表示一个可能存在或不存在的值。**它帮助我们避免_NullPointerException_并编写更富有表现力和可读的代码。**在想要将可选值作为列表处理的场景中，将_Optional_转换为_ArrayList_可能很有用。在本教程中，我们将探索在Java中将_Optional_转换为_ArrayList_的不同方法。

## 2. 使用_ifPresent()_

这种方法利用了_Optional_类提供的_ifPresent()_方法来处理值的存在或缺失。**它允许我们仅在_Optional_包含值时执行一段代码，消除了显式空值检查的需要，提高了代码的可读性。**

让我们看一个使用_ifPresent()_方法的代码片段：

```java
Optional```````````<String>``````````` optionalValue = Optional.of("Hello, World!");

List```````````<String>``````````` arrayList = new ArrayList<>();
optionalValue.ifPresent(arrayList::add);

assertTrue(arrayList.contains("Hello, World!"));
```

我们首先创建一个名为_optionalValue_的_Optional_对象，包含值“Hello, World!”。**这个值被封装在_Optional_中，表示其潜在的缺失。**随后，我们对_optionalValue_使用_ifPresent()_方法。**_ifPresent()_方法接受一个lambda表达式或方法引用作为参数，如果_Optional_包含值，则执行它。**

在这种情况下，方法引用_arrayList::add_会在值存在时将其添加到_ArrayList_中。

## 3. 使用_orElse()_或_orElseGet()_

这种方法利用了_Optional_类提供的_orElse()_方法。它允许我们指定一个默认值，如果_Optional_为空则使用。**这在我们有备选值或行为想要应用在_Optional_不包含值时特别有用。**

在这种情况下，我们正在创建一个空的_Optional_，所以当调用_orElse()_方法时，它将返回默认值“Hello World”：

```java
Optional```````````<String>``````````` emptyOptional = Optional.empty();

List```````````<String>``````````` arrayList = new ArrayList<>();
arrayList.add(emptyOptional.orElse("Hello World!"));

assertTrue(arrayList.contains("Hello, World!"));
```

在示例中，我们使用_empty()_方法创建了一个名为_emptyOptional_的空_Optional_。由于_emptyOptional_为空，调用_orElse()_将返回指定的默认值“Hello World”。然后，我们将这个默认值添加到_ArrayList_中。

请注意，当使用_orElse()_时，提供的默认值会被急切地评估。**这意味着无论_Optional_是否需要它，都会计算它。**即使_Optional_包含非空值，默认值仍然被创建，**而提供给_orElseGet()_的默认值是惰性评估的。**只有当_Optional_为空时才会调用它。

此外，对于性能关键的场景，通常更倾向于使用_orElseGet()_，因为它避免了在_Optional_已经包含值时进行不必要的计算：

```java
Optional```````````<String>``````````` emptyOptional = Optional.empty();

List```````````<String>``````````` arrayList = new ArrayList<>();
arrayList.add(emptyOptional.orElseGet(() -> "Hello, World!"));

assertTrue(arrayList.contains("Hello, World!"));
```

## 4. 使用Java Streams

Java中的Stream表示可以被一系列操作处理的元素序列。我们可以利用Streams API条件性地创建_ArrayList_。

### 4.1. 实现

让我们看一个使用Java Streams将_Optional_对象转换为_ArrayList_的示例：

```java
Optional```````````<String>``````````` optionalValue = Optional.of("Hello, World!");

List```````````<String>``````````` arrayList = optionalValue
  .stream()
  .collect(Collectors.toList());

assertTrue(arrayList.contains("Hello, World!"));
```

首先，我们创建一个名为_optionalValue_的_Optional_对象，其值为“Hello, World!”。接下来，我们使用Java _Stream_将_Optional_转换为_ArrayList_。**我们调用_optionalValue_上的_stream()_方法以获得其元素的流。**然后，我们使用_collect()_方法和_Collectors.toList()_将流中的元素收集到一个_List_中，有效地将_Optional_转换为_ArrayList_。

如果_Optional_为空，即不包含值，那么结果的_ArrayList_也将是空的。**在Java Streams中，如果流源为空，终端操作—本例中的_collect()_—将简单地返回一个空集合。**

### 4.2. 流过滤

**使用Java Stream API的一个优点是它允许我们有条件地处理元素并执行各种转换。**想象一下，我们只想在满足某些条件时将值添加到_ArrayList_中。Streams允许我们在收集元素到列表之前加入_filter()_：

```java
Optional```````````<String>``````````` optionalValue = Optional.of("Hello, World!");

List```````````<String>``````````` arrayList = optionalValue
  .filter(e -> e.startsWith("H"))
  .stream()
  .collect(Collectors.toList());

assertTrue(arrayList.contains("Hello, World!"));
```

在这里，我们使用_filter()_过滤包含_字符串_列表的_Optional_。这个方法只保留以字母“H”开头的元素。然后我们使用_collect(Collectors.toList())_方法将结果过滤后的元素收集到一个_ArrayList_中。

### 4.3. 流展平

**Java Streams在处理嵌套列表时提供了一个额外的优势。**考虑一个场景，一个_Optional_包含另一个_Optional_，后者又持有一个列表。我们可以使用Java Streams来展平嵌套的列表。

让我们写一个示例，演示如何在_Optional_中展平嵌套的列表：

```java
Optional<List```````````<String>```````````> optionalList = Optional.of(Arrays.asList("Apple", "Banana", "Cherry"));

List```````````<String>``````````` arrayList = optionalList
  .stream()
  .flatMap(List::stream)
  .collect(Collectors.toList());

assertEquals(3, arrayList.size());
assertTrue(arrayList.contains("Apple"));
```

我们对_Optional<List```````````<String>```````````>_调用_stream()_将其转换为流。接下来，我们使用_flatMap(List::stream)_。这将_List::stream_方法引用应用于流中的每个元素。**通过应用_flatMap()_，我们实际上是在“展平”嵌套结构。**现在我们不是拥有一个包含列表的单一流，而是拥有一个包含内部列表中各个元素的流。

## 5. 结论

在本文中，我们探讨了将_Optional_转换为_ArrayList_的各种方法。如果我们需要根据_Optional_值的存在来执行特定操作，我们可以使用_isPresent()_方法。当我们有一个默认值要在_Optional_为空时使用时，我们可以使用_orElse()_或_orElseGet()_。**最后，Java Streams是进行简洁转换的好选择，特别是如果我们需要在转换为列表之前进行过滤。**

如常，示例的源代码可在GitHub上找到。

文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。翻译已结束。

OK