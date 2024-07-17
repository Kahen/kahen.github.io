---
date: 2022-04-01
category:
  - Java
  - Streams
tag:
  - Java
  - Streams
  - Collectors
  - RxJava
head:
  - - meta
    - name: keywords
      content: Java Streams, Collectors, RxJava
------
# 如何将一个流分割成多个流 | Baeldung

## 1. 概述

Java的流API是一个强大且多功能的工具，用于处理数据。根据定义，流操作是对一组数据进行单次迭代。

然而，有时我们希望以不同的方式处理流的一部分，并得到多组结果。

在本教程中，我们将学习如何将流分割成多个组并独立处理它们。

## 2. 使用收集器

**一个流应该只操作一次，并有一个终端操作。** 它可以有多个中间操作，但在关闭之前只能收集一次数据。

这意味着流API规范明确禁止将流分叉，并为每个分叉有不同的中间操作。这将导致多个终端操作。然而，我们可以在终端操作中分割流。这会创建一个分成两组或多组的结果。

### 2.1. 使用_partitioningBy_进行二元分割

如果我们想要将流分成两部分，我们可以使用_Collector_类的_partitioningBy_。它接受一个_Predicate_并返回一个_Map_，将满足谓词的元素分组在_Boolean_ _true_键下，其余的在_false_键下。

假设我们有一个包含文章列表，其中包含它们应该发布的目标站点信息以及是否应该被精选。

```java
List``````<Article>`````` articles = Lists.newArrayList(
  new Article("Baeldung", true),
  new Article("Baeldung", false),
  new Article("Programming Daily", false),
  new Article("The Code", false));
```

我们将把它分成两组，一组只包含Baeldung文章，另一组包含其余的：

```java
Map<Boolean, List``````<Article>``````> groupedArticles = articles.stream()
  .collect(Collectors.partitioningBy(a -> a.target.equals("Baeldung")));

```

让我们看看哪些文章被归档在_map_中的_true_和_false_键下：

```java
assertThat(groupedArticles.get(true)).containsExactly(
  new Article("Baeldung", true),
  new Article("Baeldung", false));
assertThat(groupedArticles.get(false)).containsExactly(
  new Article("Programming Daily", false),
  new Article("The Code", false));
```

### 2.2. 使用_groupingBy_进行分割

如果我们想要有更多的类别，那么我们需要使用_groupingBy_方法。它接受一个函数，将每个元素分类到一个组中。然后它返回一个_Map_，将每个组分类器链接到其元素的集合。

假设我们想要按目标站点对文章进行分组。返回的_Map_将有包含站点名称的键和包含与给定站点相关联的文章集合的值：

```java
Map<String, List``````<Article>``````> groupedArticles = articles.stream()
  .collect(Collectors.groupingBy(a -> a.target));
assertThat(groupedArticles.get("Baeldung")).containsExactly(
  new Article("Baeldung", true),
  new Article("Baeldung", false));
assertThat(groupedArticles.get("Programming Daily")).containsExactly(new Article("Programming Daily", false));
assertThat(groupedArticles.get("The Code")).containsExactly(new Article("The Code", false));
```

## 3. 使用_teeing_

从Java 12开始，我们有了另一种二元分割的选项。我们可以使用_teeing_收集器。**_teeing_将两个收集器组合成一个复合体。** 每个元素都由它们两个处理，然后使用提供的合并函数合并到一个单一的返回值中。

### 3.1. 使用_Predicate_进行_teeing_

**_teeing_收集器与_Collector_类中的另一个收集器_filtering_搭配得很好。** 它接受一个谓词，并使用它来过滤处理的元素，然后将它们传递给另一个收集器。

让我们将文章分成Baeldung和非Baeldung的组，并计算它们的数量。我们还将使用_List_构造函数作为合并函数：

```java
List`<Long>` countedArticles = articles.stream().collect(Collectors.teeing(
  Collectors.filtering(article -> article.target.equals("Baeldung"), Collectors.counting()),
  Collectors.filtering(article -> !article.target.equals("Baeldung"), Collectors.counting()),
  List::of));
assertThat(countedArticles.get(0)).isEqualTo(2);
assertThat(countedArticles.get(1)).isEqualTo(2);
```

### 3.2. 使用重叠结果的_teeing_

这种解决方案与之前的区别在于一个重要的不同之处。我们之前创建的组没有重叠，源流中的每个元素最多属于一个组。使用_teeing_，我们不再受此限制，因为每个收集器可能处理整个流。让我们看看如何利用它。

我们可能想要将文章分成两组，一组只有精选文章，另一组只有Baeldung文章。结果的文章集合可能会重叠，因为一篇文章可以同时是精选的并且针对Baeldung。

这次我们不是计数，而是将它们收集到列表中：

```java
List<List``````<Article>``````> groupedArticles = articles.stream().collect(Collectors.teeing(
  Collectors.filtering(article -> article.target.equals("Baeldung"), Collectors.toList()),
  Collectors.filtering(article -> article.featured, Collectors.toList()),
  List::of));

assertThat(groupedArticles.get(0)).hasSize(2);
assertThat(groupedArticles.get(1)).hasSize(1);

assertThat(groupedArticles.get(0)).containsExactly(
  new Article("Baeldung", true),
  new Article("Baeldung", false));
assertThat(groupedArticles.get(1)).containsExactly(new Article("Baeldung", true));
```

## 4. 使用RxJava

虽然Java的流API是一个有用的工具，但有时它还不够。其他解决方案，如RxJava提供的响应式流，可能能够帮助我们。让我们看看如何使用一个_Observable_和多个_Subscribers_来实现与我们的_Stream_示例相同的结果。

### 4.1. 创建一个_Observable_

**首先，我们需要从我们的文章列表创建一个_Observable_实例。** 我们可以使用_Observable_类的_from_工厂方法：

```java
Observable``````<Article>`````` observableArticles = Observable.from(articles);
```

### 4.2. 过滤_Observables_

接下来，我们需要创建将过滤文章的_Observables_。为此，我们将使用_Observable_类的_filter_方法：

```java
Observable``````<Article>`````` baeldungObservable = observableArticles.filter(
  article -> article.target.equals("Baeldung"));
Observable``````<Article>`````` featuredObservable = observableArticles.filter(
  article -> article.featured);
```

### 4.3. 创建多个_Subscribers_

**最后，我们需要订阅_Observables_并提供一个_Action_，描述我们想要对文章做什么。** 一个现实世界的例子可能是将它们保存在数据库中或发送给客户端，但我们将只添加到列表中：

```java
List``````<Article>`````` baeldungArticles = new ArrayList<>();
List``````<Article>`````` featuredArticles = new ArrayList<>();
baeldungObservable.subscribe(baeldungArticles::add);
featuredObservable.subscribe(featuredArticles::add);
```

## 5. 结论

在本教程中，我们学习了如何将流分组并分别处理它们。首先，我们看了旧的流API方法：_groupingBy_和_partitionBy_。接下来，我们使用了Java 12中引入的_teeing_方法。最后，我们看到了如何使用RxJava以更大的灵活性实现类似的结果。

一如既往，源代码可以在GitHub上找到。