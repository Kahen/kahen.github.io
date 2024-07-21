---
date: 2024-07-21
category:
  - Java
  - Programming
tag:
  - Java
  - Map
  - Entry
head:
  - - meta
    - name: keywords
      content: Java Map Entry, Java Map Entry 创建方法
------
# 如何在Map中创建一个新的条目

在本教程中，我们将讨论如何使用Java的内置类、第三方库以及我们自定义的实现来创建一个表示Map中键值关联的_Entry_对象。

## 2. 使用Java内置类

Java提供了_Map_._Entry_接口，并有两个简单的实现来创建一个_Entry_。让我们来看一下它们。

### 2.1. 使用_AbstractMap_._SimpeEntry_

_SimpeEntry_类是_AbstractMap_类中的一个静态嵌套类。它提供了两个不同的构造函数来初始化一个实例：
```
AbstractMap.SimpleEntry`````````````````````<String, String>````````````````````` firstEntry = new AbstractMap.SimpleEntry<>("key1", "value1");
AbstractMap.SimpleEntry`````````````````````<String, String>````````````````````` secondEntry = new AbstractMap.SimpleEntry<>("key2", "value2");
AbstractMap.SimpleEntry`````````````````````<String, String>````````````````````` thirdEntry = new AbstractMap.SimpleEntry<>(firstEntry);
thirdEntry.setValue("a different value");

assertThat(Stream.of(firstEntry, secondEntry, thirdEntry))
  .extracting("key", "value")
  .containsExactly(
    tuple("key1", "value1"),
    tuple("key2", "value2"),
    tuple("key1", "a different value"));
```

正如我们在这里看到的，其中一个构造函数接受键和值，而另一个接受一个_Entry_实例来初始化一个新的_Entry_实例。

### 2.2. 使用_AbstractMap_._SimpeImmutableEntry_

就像_SimpeEntry_一样，我们可以使用_SimpeImmutableEntry_来创建条目：
```
AbstractMap.SimpleImmutableEntry`````````````````````<String, String>````````````````````` firstEntry = new AbstractMap.SimpleImmutableEntry<>("key1", "value1");
AbstractMap.SimpleImmutableEntry`````````````````````<String, String>````````````````````` secondEntry = new AbstractMap.SimpleImmutableEntry<>("key2", "value2");
AbstractMap.SimpleImmutableEntry`````````````````````<String, String>````````````````````` thirdEntry = new AbstractMap.SimpleImmutableEntry<>(firstEntry);

assertThat(Stream.of(firstEntry, secondEntry, thirdEntry))
  .extracting("key", "value")
  .containsExactly(
    tuple("key1", "value1"),
    tuple("key2", "value2"),
    tuple("key1", "value1"));
```

与_SimpeEntry_相比，**_SimpeImmutableEntry_不允许我们在初始化_Entry_实例后更改值。** 如果我们尝试更改值，它会抛出_java.lang.UnsupportedOperationException_。

### 2.3. 使用_Map_._entry_

从版本9开始，Java在_Map_接口中有一个静态方法_entry()_来创建一个_Entry_：
```
Map.Entry`````````````````````<String, String>````````````````````` entry = Map.entry("key", "value");

assertThat(entry.getKey()).isEqualTo("key");
assertThat(entry.getValue()).isEqualTo("value");
```

我们需要记住，**这样创建的条目也是不可变的**，如果我们尝试在初始化后更改值，将导致_java.lang.UnsupportedOperationException_。

## 3. 第三方库

除了Java本身，还有一些流行的库提供了一些很好的方式来创建条目。

### 3.1. 使用Apache _commons-collections4_库

让我们首先包括我们的Maven依赖项：
```
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-collections4``</artifactId>``
    `<version>`4.5.0-M2`</version>`
``</dependency>``
```

我们应该提到，除了_Entry_接口，该库还提供了一个名为_KeyValue_的接口：
```
Map.Entry`````````````````````<String, String>````````````````````` firstEntry = new DefaultMapEntry<>("key1", "value1");
KeyValue`````````````````````<String, String>````````````````````` secondEntry = new DefaultMapEntry<>("key2", "value2");

KeyValue`````````````````````<String, String>````````````````````` thirdEntry = new DefaultMapEntry<>(firstEntry);
KeyValue`````````````````````<String, String>````````````````````` fourthEntry = new DefaultMapEntry<>(secondEntry);

firstEntry.setValue("a different value");

assertThat(firstEntry)
  .extracting("key", "value")
  .containsExactly("key1", "a different value");

assertThat(Stream.of(secondEntry, thirdEntry, fourthEntry))
  .extracting("key", "value")
  .containsExactly(
    tuple("key2", "value2"),
    tuple("key1", "value1"),
    tuple("key2", "value2"));
```

_DefaultMapEntry_类提供了三种不同的构造函数。第一个接受键值对，第二个和第三个接受参数类型为_Entry_和_KeyValue_。

_UnmodifiableMapEntry_类的行为也相同：
```
Map.Entry`````````````````````<String, String>````````````````````` firstEntry = new UnmodifiableMapEntry<>("key1", "value1");
KeyValue`````````````````````<String, String>````````````````````` secondEntry = new UnmodifiableMapEntry<>("key2", "value2");

KeyValue`````````````````````<String, String>````````````````````` thirdEntry = new UnmodifiableMapEntry<>(firstEntry);
KeyValue`````````````````````<String, String>````````````````````` fourthEntry = new UnmodifiableMapEntry<>(secondEntry);

assertThat(firstEntry)
  .extracting("key", "value")
  .containsExactly("key1", "value1");

assertThat(Stream.of(secondEntry, thirdEntry, fourthEntry))
  .extracting("key", "value")
  .containsExactly(
    tuple("key2", "value2"),
    tuple("key1", "value1"),
    tuple("key2", "value2"));
```

然而，正如我们可以从它的名字理解的那样，**_UnmodifiableMapEntry_也不允许我们在初始化后更改值**。

### 3.2. 使用Google Guava库

让我们首先包括我们的Maven依赖项：
```
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
``</dependency>``
```

现在，让我们看看我们如何使用_immutableEntry()_方法：
```
Map.Entry`````````````````````<String, String>````````````````````` firstEntry = Maps.immutableEntry("key1", "value1");
Map.Entry`````````````````````<String, String>````````````````````` secondEntry = Maps.immutableEntry("key2", "value2");

assertThat(Stream.of(firstEntry, secondEntry))
  .extracting("key", "value")
  .containsExactly(
    tuple("key1", "value1"),
    tuple("key2", "value2"));
```

**由于它创建了一个不可变的条目，如果我们尝试更改值，它会抛出_java.lang.UnsupportedOperationException_**。

## 4. 自定义实现

到目前为止，我们已经看到了一些创建_Entry_实例的选项，这些类已经被设计成必须符合_Map_接口实现（如_HashMap_）的内部逻辑。

这意味着只要我们符合相同的规则，我们就可以创建自己的_Entry_接口实现。首先，让我们添加一个简单的实现：
```
public class SimpleCustomKeyValue``<K, V>`` implements Map.Entry``<K, V>`` {

    private final K key;
    private V value;

    public SimpleCustomKeyValue(K key, V value) {
        this.key = key;
        this.value = value;
    }
    // 标准getter和setter
    // 标准equals和hashcode
    // 标准toString
}
```

最后，让我们看一些使用示例：
```
Map.Entry`````````````````````<String, String>````````````````````` firstEntry = new SimpleCustomKeyValue<>("key1", "value1");

Map.Entry`````````````````````<String, String>````````````````````` secondEntry = new SimpleCustomKeyValue<>("key2", "value2");
secondEntry.setValue("different value");

Map`````````````````````<String, String>````````````````````` map = Map.ofEntries(firstEntry, secondEntry);

assertThat(map)
  .isEqualTo(ImmutableMap.`````````````````````<String, String>`````````````````````builder()
    .put("key1", "value1")
    .put("key2", "different value")
    .build());
```

## 5. 结论

在本文中，我们学习了如何使用Java提供的现有选项以及一些流行的第三方库提供的几种替代方案来创建一个_Entry_实例。此外，我们还创建了一个自定义实现，并展示了一些使用示例。

一如既往，这些示例的代码可以在GitHub上找到。