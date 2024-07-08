---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Collection
  - ArrayList
head:
  - - meta
    - name: keywords
      content: Kotlin, Collection, ArrayList, Conversion
---
# Kotlin中将集合转换为ArrayList的方法 | Baeldung关于Kotlin的教程

## 1. 引言

在Kotlin中，我们使用集合来存储和操作一组相关对象。具体来说，_Collection_接口是集合层次结构的根，并且有几个类实现了它，比如_List_和_Set_。然而，有时我们可能需要将一个集合转换为_ArrayList_。

在本教程中，我们将探索一些在Kotlin中将_Collection_转换为_ArrayList_的方法。

## 2. 使用_for_循环和_add()_方法

将集合转换为_ArrayList_的一个直接方法是使用_for()_循环和_add()_方法：

```kotlin
@Test
fun `使用for循环和add方法将Collection转换为ArrayList`() {
    val collection: Collection````````<String>```````` = listOf("Kotlin", "Java", "Scala")
    val arrayList = ArrayList````````<String>````````()
    for (element in collection) {
        arrayList.add(element)
    }

    assertEquals(arrayListOf("Kotlin", "Java", "Scala"), arrayList)
}
```

在上述代码中，我们使用_listOf()_方法创建了一个字符串集合。接下来，我们遍历集合中的所有元素，并使用_add()_方法将每个元素添加到_ArrayList_中。最后，我们断言新的_ArrayList_包含了我们集合中的所有元素。

## 3. 使用_ArrayList_构造函数

我们还可以通过使用其构造函数将集合转换为_ArrayList_。**构造函数接受一个集合作为参数，并返回一个具有与集合相同元素的_ArrayList_**：

```kotlin
@Test
fun `使用ArrayList构造函数将Collection转换为ArrayList`() {
    val collection: Collection````````<String>```````` = listOf("Kotlin", "Java", "Scala")
    val arrayList = ArrayList(collection)

    assertEquals(arrayListOf("Kotlin", "Java", "Scala"), arrayList)
}
```

在这个单元测试中，我们将字符串集合传递给_ArrayList()_构造函数，以创建一个与原始列表具有相同元素的_ArrayList_。最后，我们断言数组列表包含正确的元素。

## 4. 使用_toCollection()_方法

另一种将集合转换为_ArrayList_的方法涉及使用_toCollection()_方法。**这个方法接受一个空的_ArrayList_作为参数，它将把原始集合中的所有元素追加到_ArrayList_参数中**：

```kotlin
@Test
fun `使用toCollection方法将Collection转换为ArrayList`() {
    val collection: Collection````````<String>```````` = listOf("Kotlin", "Java", "Scala")
    val arrayList = collection.toCollection(ArrayList())

    assertEquals(arrayListOf("Kotlin", "Java", "Scala"), arrayList)
}
```

在这段代码中，我们使用_listOf()_方法创建了一个字符串集合。随后，我们在这些字符串集合上调用_toCollection()_方法，并传递一个空的_ArrayList_作为参数。这将返回一个与集合具有相同元素的_ArrayList_。

## 5. 使用_ArrayList.addAll(_)_方法

此外，我们可以使用_ArrayList_类的_addAll()_方法将集合的所有元素添加到一个空的_ArrayList_中：

```kotlin
@Test
fun `使用addAll方法将Collection转换为ArrayList`() {
    val collection: Collection````````<String>```````` = listOf("Kotlin", "Java", "Scala")
    val arrayList = ArrayList````````<String>````````()
    arrayList.addAll(collection)

    assertEquals(arrayListOf("Kotlin", "Java", "Scala"), arrayList)
}
```

在这段代码片段中，我们创建了一个空的字符串_ArrayList_，并使用_addAll()_方法将一个字符串集合的所有元素添加到其中。

## 6. 使用_mapTo()_方法

要将集合转换为_ArrayList_，我们可以使用_mapTo()_方法，该方法接受两个参数。首先，我们需要提供我们想要创建的目标_ArrayList_。其次，我们需要传递一个lambda函数，该函数将原始集合中的每个元素映射到目标_ArrayList_中的相应元素：

```kotlin
@Test
fun `使用mapTo方法将Collection转换为ArrayList`() {
    val collection: Collection````````<String>```````` = listOf("Kotlin", "Java", "Scala")
    val arrayList = ArrayList````````<String>````````()
    collection.mapTo(arrayList) { it }

    assertEquals(arrayListOf("Kotlin", "Java", "Scala"), arrayList)
}
```

在这段代码片段中，我们使用恒等函数作为映射函数。**这个lambda函数返回每个元素不变**，因此，这是一个简单高效的将元素从原始集合映射到目标_ArrayList_的方法。

最后，我们使用_assertEquals()_方法来验证转换后的_ArrayList_是否包含预期的元素。

## 7. 结论

在本文中，我们探讨了在Kotlin中将集合转换为_ArrayList_的各种方法。虽然有些方法比其他方法更高效和简洁，但重要的是要注意每种方法都是有效的。在选择采用哪种方法时，我们应该考虑应用程序的上下文和要求。

正如往常一样，本文中使用的代码可以在GitHub上找到。