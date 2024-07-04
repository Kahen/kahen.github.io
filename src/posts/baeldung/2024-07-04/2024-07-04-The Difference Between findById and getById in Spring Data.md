---
date: 2022-04-01
category:
  - Spring Data
  - Java
tag:
  - findById
  - getById
head:
  - - meta
    - name: keywords
      content: Spring Data, Java, findById, getById
---

# Spring Data中findById与getById的区别

1. 概述

Spring Data提供了方便的方法来从数据存储中检索实体，包括findById和getById。尽管它们乍一看可能很相似，但存在细微的差别，这些差别可能会影响我们代码的功能。

本教程将探讨这些差异，并帮助我们有效地确定何时使用每种方法。

2. 理解findById

首先，让我们看看findById方法。

2.1 方法签名

findById方法定义在CrudRepository接口中：

```
Optional`<T>` findById(ID id);
```

2.2 行为和返回类型

findById方法通过其唯一标识符（id）检索实体。它返回一个Optional包装器，表示实体可能存在于数据存储中，也可能不存在。**如果找到了实体，它将被包装在Optional中。否则，Optional将是空的。**

2.3 使用场景

有几个使用场景，findById是更好的选择。

第一种是**当我们预期实体可能不在数据存储中，并且想要优雅地处理两种情况（找到和未找到）**。

此外，当我们想要与Java 8 Optional API结合使用时，它非常方便，以便在实体未找到时执行条件操作或执行回退逻辑。

3. 探索getById

接下来，让我们探索getById方法。

3.1 方法签名

JpaRepository接口定义了getById方法：

```
T getById(ID id);
```

3.2 行为和返回类型

与findById不同，getById方法直接返回实体而不是将其包装在Optional中。**如果数据存储中不存在实体，将抛出EntityNotFoundException。**

3.3 使用场景

我们可以使用getById**当我们确定给定id的实体存在于数据存储中**。这种方法还提供了更简洁的语法，并避免了额外的Optional处理。

4. 选择正确的方法

最后，让我们考虑一些可以帮助我们确定是使用findById还是getById的因素：

- 存在保证：如果实体的存在得到保证，并且缺失将是一个例外情况，那么优先选择getById。这种方法避免了不必要的Optional处理，并简化了代码。
- 潜在的缺失：如果实体的存在不确定，或者我们需要优雅地处理找到和未找到的情况，使用findById以及Optional API。这种方法允许我们在不抛出异常的情况下执行条件操作。
- 从Spring Boot 2.7版本开始，**getById方法被标记为已弃用**，文档推荐使用getReferenceById方法。

5. 结论

在本教程中，我们学习了Spring Data中findById和getById方法之间的区别。虽然findById返回一个Optional并优雅地处理实体的缺失，getById直接返回实体并在其不存在时抛出异常。**两种方法之间的选择取决于实体的存在是否得到保证，以及是否需要异常处理或条件操作。**

因此，我们可以选择最符合我们应用程序逻辑和要求的那个。

OK