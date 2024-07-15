---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Arrays.asList()
  - List.of()
head:
  - - meta
    - name: keywords
      content: Java, Arrays.asList(), List.of(), 列表创建, 比较
---

# Java中Arrays.asList()与List.of()的区别

在Java中，有时我们需要创建一个小列表或为了方便将数组转换为列表。Java为此提供了一些辅助方法。

在本教程中，我们将比较初始化小型临时数组的两种主要方式：_List.of()_和_Array.asList()_。

## 使用_Arrays.asList()_

_Arrays.asList()_是在Java 1.2中引入的，它简化了_List_对象的创建，_List_是_Java Collections Framework_的一部分。它可以将数组作为输入并创建提供的数组的_List_对象：

```java
Integer[] array = new Integer[]{1, 2, 3, 4};
List``````<Integer>`````` list = Arrays.asList(array);
assertThat(list).containsExactly(1,2,3,4);
```

如我们所见，创建一个简单的_Integer_列表非常容易。

### 2.1 列表返回不支持的操作

asList()方法返回的是一个固定大小的列表。因此，添加和删除新元素会抛出_UnsupportedOperationException_：

```java
List``````<Integer>`````` list = Arrays.asList(1, 2, 3, 4, 5);
assertThrows(UnsupportedOperationException.class, () -> list.add(6));

List``````<Integer>`````` list = Arrays.asList(1, 2, 3, 4, 5);
assertThrows(UnsupportedOperationException.class, () -> list.remove(1));
```

### 2.2 使用数组

我们应该注意，该列表不创建输入数组的副本。相反，它用_List_接口包装原始数组。因此，对数组的更改也会反映在列表上：

```java
Integer[] array = new Integer[]{1,2,3};
List``````<Integer>`````` list = Arrays.asList(array);
array[0] = 1000;
assertThat(list.get(0)).isEqualTo(1000);
```

此外，列表返回的是由_Arrays.asList()_的列表是可变的。也就是说，我们可以更改列表中的个别元素：

```java
List``````<Integer>`````` list = Arrays.asList(1, 2, 3, 4);
list.set(1, 1000);
assertThat(list.get(1)).isEqualTo(1000);
```

最终，这可能导致产生难以发现的错误的副作用。当数组作为输入提供时，列表上的更改也会反映在数组上：

```java
Integer[] array = new Integer[]{1, 2, 3};
List``````<Integer>`````` list = Arrays.asList(array);
list.set(0,1000);
assertThat(array[0]).isEqualTo(1000);
```

让我们看看另一种创建列表的方式。

## 使用_List.of()_

与_Arrays.asList()_相比，Java 9引入了一种更方便的方法_List.of()_。这创建了不可修改的_List_对象的实例：

```java
String[] array = new String[]{"one", "two", "three"};
List```<String>``` list = List.of(array);
assertThat(list).containsExactly("two", "two", "three");
```

### 3.1 与_Arrays.asList()_的区别

与_Arrays.asList()_的主要区别是，_List.of()_返回的是一个不可变的列表，它是提供输入数组的副本。因此，对原始数组的更改不会反映在返回的列表上：

```java
String[] array = new String[]{"one", "two", "three"};
List```<String>``` list = List.of(array);
array[0] = "thousand";
assertThat(list.get(0)).isEqualTo("one");
```

此外，我们不能修改列表的元素。如果我们尝试这样做，它将抛出_UnsupportedOperationException_：

```java
List```<String>``` list = List.of("one", "two", "three");
assertThrows(UnsupportedOperationException.class, () -> list.set(1, "four"));
```

### 3.2 空值

我们还应该注意，_List.of()_不允许空值作为输入，并将抛出_NullPointerException_：

```java
assertThrows(NullPointerException.class, () -> List.of("one", null, "two"));
```

## 结论

这篇短文探讨了使用_List.of()_和_Arrays.asList()_在Java中创建列表的方法。

如往常一样，完整的示例代码可在GitHub上找到。