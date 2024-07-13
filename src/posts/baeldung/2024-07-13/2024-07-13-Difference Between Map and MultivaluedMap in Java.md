---
date: 2024-07-13
category:
  - Java
tag:
  - Map
  - MultivaluedMap
head:
  - - meta
    - name: keywords
      content: Java, Map, MultivaluedMap, HashMap, MultivaluedHashMap, 区别
---
# Java中Map和MultivaluedMap的区别

在本教程中，我们将学习Java中Map和MultivaluedMap的区别。但在此之前，让我们看一些例子。

### 2. Map的例子

HashMap实现了Map接口，并且它也允许null值和null键：

```java
@Test
public void givenHashMap_whenEquals_thenTrue() {
    Map``<String, Integer>`` map = new HashMap<>();
    
    // 将键值对放入我们的map中。
    map.put("first", 1);
    map.put(null, 2);
    map.put("third", null);
    
    // 断言语句。最后一个参数是如果断言失败将打印的内容。
    assertNotNull(map, "The HashMap is null!");
    assertEquals(1, map.get("first"), "The key isn't mapped to the right value!");
    assertEquals(2, map.get(null), "HashMap didn't accept null as key!");
    assertEquals(null, map.get("third"), "HashMap didn't accept null value!");
}
```

上述单元测试成功通过。正如我们所看到的，每个键都映射到一个确切的值。

### 3. 如何将MultivaluedMap添加到我们的项目？

在开始使用MultivaluedMap接口及其实现类之前，我们需要添加它的库，Jakarta RESTful WS API，到我们的Maven项目中。为此，我们需要在项目的pom.xml文件中声明一个依赖：

```xml
`<dependency>`
    `<groupId>`jakarta.ws.rs`</groupId>`
    `<artifactId>`jakarta.ws.rs-api`</artifactId>`
    `<version>`3.1.0`</version>`
`</dependency>`
```

我们已经成功地将库添加到了我们的项目中。

### 4. MultivaluedMap的例子

MultivaluedHashMap实现了MultivaluedMap接口，并且它允许null值和null键：

```java
@Test
public void givenMultivaluedHashMap_whenEquals_thenTrue() {
    MultivaluedMap``<String, Integer>`` mulmap = new MultivaluedHashMap<>();
    
    // 将键映射到值。
    mulmap.addAll("first", 1, 2, 3);
    mulmap.add(null, null);
    
    // 断言语句。最后一个参数是如果断言失败将打印的内容。
    assertNotNull(mulmap, "The MultivaluedHashMap is null!");
    assertEquals(1, mulmap.getFirst("first"), "The key isn't mapped to the right values!");
    assertEquals(null, mulmap.getFirst(null), "MultivaluedHashMap didn't accept null!");
}
```

上述单元测试成功通过。在这里，每个键都映射到一个值的列表，该列表可以包含零个或多个元素。

### 5. 差异是什么？

在Java生态系统中，Map和MultivaluedMap都是接口。**差异在于，在Map中，每个键都映射到一个确切的对象。然而，在MultivaluedMap中，我们可以有零个或多个对象与同一个键关联。**

此外，MultivaluedMap是Map的一个子接口，因此它拥有其所有方法以及一些自己的方法。一些实现Map的类包括HashMap、LinkedHashMap、ConcurrentHashMap、WeakHashMap、EnumMap和TreeMap。此外，MultivaluedHashMap是一个同时实现了Map和MultivaluedMap的类。

例如，_addFirst(K key, V value)_ 是MultivaluedMap的方法之一，它将一个值添加到当前键的值列表的第一个位置：

```java
MultivaluedMap`<String, String>` mulmap = new MultivaluedHashMap<>();
mulmap.addFirst("firstKey", "firstValue");
```

另一方面，_getFirst(K key)_ 获取提供的键的第一个值：

```java
String value = mulmap.getFirst("firstKey");
```

最后，_addAll(K key, V… newValues)_ 为当前键的值列表添加多个值：

```java
mulmap.addAll("firstKey", "secondValue", "thirdValue");
```

### 6. 总结

在本文中，我们看到了Map和MultivaluedMap之间的区别。

如常，完整的源代码可以在GitHub上找到。翻译已经完成，以下是剩余部分：

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK