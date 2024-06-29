---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - HashMap
  - ArrayList
head:
  - - meta
    - name: keywords
      content: Java, HashMap, ArrayList, 转换
---
# Java中将HashMap值转换为ArrayList

在这篇简短的教程中，我们将阐明如何在Java中将HashMap的值转换为ArrayList。

首先，我们将解释如何使用Java核心方法进行转换。然后，我们将演示如何使用如Guava等外部库来解决我们的核心问题。

### 2.1 使用ArrayList构造器
ArrayList构造器提供了将HashMap转换为ArrayList的最常见和最简单的方法。

这里的基本思想是将HashMap的值作为参数传递给ArrayList构造器：

```java
ArrayList```````````````<String>``````````````` convertUsingConstructor(HashMap```````<Integer, String>``````` hashMap) {
    if (hashMap == null) {
        return null;
    }
    return new ArrayList```````````````<String>```````````````(hashMap.values());
}
```

如我们所见，我们首先检查我们的HashMap是否为null以使我们的方法安全。然后，我们使用了values()方法，它返回了给定HashMap中包含的值的集合视图。

现在，让我们使用一个测试用例来确认：

```java
public class HashMapToArrayListConverterUtilsUnitTest {

    private HashMap```````<Integer, String>``````` hashMap;

    @Before
    public void beforeEach() {
        hashMap = new HashMap<>();
        hashMap.put(1, "AAA");
        hashMap.put(2, "BBB");
        hashMap.put(3, "CCC");
        hashMap.put(4, "DDD");
    }

    @Test
    public void givenAHashMap_whenConvertUsingConstructor_thenReturnArrayList() {
        ArrayList```````````````<String>``````````````` myList = HashMapToArrayListConverterUtils.convertUsingConstructor(hashMap);
        assertThat(hashMap.values(), containsInAnyOrder(myList.toArray()));
    }

    // ...
}
```

正如预期的那样，测试成功通过。

### 2.2 使用addAll()方法
addAll()方法是另一个很好的选择，如果我们想要将HashMap转换为ArrayList。

顾名思义，这个方法允许我们将指定集合中的所有元素添加到列表的末尾。

现在，让我们举例说明addAll()方法的使用：

```java
ArrayList```````````````<String>``````````````` convertUsingAddAllMethod(HashMap```````<Integer, String>``````` hashMap) {
    if (hashMap == null) {
        return null;
    }

    ArrayList```````````````<String>``````````````` arrayList = new ArrayList```````````````<String>```````````````(hashMap.size());
    arrayList.addAll(hashMap.values());

    return arrayList;
}
```

如上所示，我们首先以传递的HashMap的大小初始化了ArrayList。然后，我们调用了addAll()方法来追HashMap的所有值。

再次，让我们添加一个新的测试用例以验证一切是否按预期工作：

```java
@Test
public void givenAHashMap_whenConvertUsingAddAllMethod_thenReturnArrayList() {
    ArrayList```````````````<String>``````````````` myList = HashMapToArrayListConverterUtils.convertUsingAddAllMethod(hashMap);

    assertThat(hashMap.values(), containsInAnyOrder(myList.toArray()));
}
```

不出所料，测试用例成功通过。

### 2.3 使用Stream API
Java 8带来了许多新特性和增强功能。在这些特性中，我们发现了Stream API。

那么，让我们通过一个实际的例子来说明如何使用流API将HashMap转换为ArrayList：

```java
ArrayList```````````````<String>``````````````` convertUsingStreamApi(HashMap```````<Integer, String>``````` hashMap) {
    if (hashMap == null) {
        return null;
    }

    return hashMap.values()
      .stream()
      .collect(Collectors.toCollection(ArrayList::new));
}
```

简而言之，我们从给定HashMap的值创建了一个Stream。然后，我们使用Collectors类的collect()方法来创建一个新的ArrayList，该ArrayList包含我们的Stream中的元素。

一如既往，让我们使用一个新的测试用例来确认我们的方法：

```java
@Test
public void givenAHashMap_whenConvertUsingStreamApi_thenReturnArrayList() {
    ArrayList```````````````<String>``````````````` myList = HashMapToArrayListConverterUtils.convertUsingStreamApi(hashMap);

    assertThat(hashMap.values(), containsInAnyOrder(myList.toArray()));
}
```

### 2.4 使用传统的循环
另外，我们可以使用传统的for循环来实现相同的目标：

```java
ArrayList```````````````<String>``````````````` convertUsingForLoop(HashMap```````<Integer, String>``````` hashMap) {
    if (hashMap == null) {
        return null;
    }

    ArrayList```````````````<String>``````````````` arrayList = new ArrayList```````````````<String>```````````````(hashMap.size());
    for (Map.Entry```````<Integer, String>``````` entry : hashMap.entrySet()) {
        arrayList.add(entry.getValue());
    }

    return arrayList;
}
```

如我们所见，我们遍历了HashMap的条目。此外，我们对每个Entry使用了entry.getValue()来获取它的值。然后，我们使用add()方法将返回的值添加到ArrayList中。

最后，让我们使用另一个测试用例来测试我们的方法：

```java
@Test
public void givenAHashMap_whenConvertUsingForLoop_thenReturnArrayList() {
    ArrayList```````````````<String>``````````````` myList = HashMapToArrayListConverterUtils.convertUsingForLoop(hashMap);

    assertThat(hashMap.values(), containsInAnyOrder(myList.toArray()));
}
```

## 3. 使用Guava
Guava提供了一套丰富的工具类，简化了诸如集合操作等常见的编程任务。

首先，我们需要将Guava依赖项添加到pom.xml文件中：

```xml
`<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`31.0.1-jre`</version>`
`</dependency>`
```

Guava提供了Lists工具类，主要用于处理列表。那么，让我们在实践中看看它：

```java
public ArrayList```````````````<String>``````````````` convertUsingGuava(HashMap```````<Integer, String>``````` hashMap) {
    if (hashMap == null) {
        return null;
    }
    EntryTransformer`<Integer, String, String>` entryMapTransformer = (key, value) -> value;

    return Lists.newArrayList(Maps.transformEntries(hashMap, entryMapTransformer)
      .values());
}
```

Lists类带有newArrayList()方法，它基于给定的元素创建一个新的ArrayList。

如上所示，我们使用自定义的EntryTransformer从键值对中获取值。然后，我们将转换器传递给我们的HashMap以及Maps.transformEntries()方法。

这样，我们告诉Guava从HashMap的值创建一个新的ArrayList。

最后，我们将为我们的方法添加一个测试用例：

```java
@Test
public void givenAHashMap_whenConvertUsingGuava_thenReturnArrayList() {
    ArrayList```````````````<String>``````````````` myList = HashMapToArrayListConverterUtils.convertUsingGuava(hashMap);

    assertThat(hashMap.values(), containsInAnyOrder(myList.toArray()));
}
```

## 4. 结论
在本文中，我们探讨了在Java中将HashMap转换为ArrayList的不同方法。

我们查看了一些使用Java核心库的方法。然后，我们展示了如何使用第三方库来完成同样的事情。

正如往常一样，本文中使用的代码可以在GitHub上找到。