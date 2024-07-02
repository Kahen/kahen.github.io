---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Java
  - HashSet
  - Arrays
head:
  - - meta
    - name: keywords
      content: Java, int[], HashSet, Arrays, Collections
---
# Java中将int[]转换为HashSet

数组和HashSet有一个共同的特点——它们都用于存储元素集合。然而，它们在底层实现和适用用例上有所不同。此外，一个区别是我们可以在数组中存储原始类型，但不能在HashSet中存储。

在本教程中，我们将学习如何使用多种方法将int[]转换为Java中的HashSet`````````<Integer>`````````。

### 2. 理解场景
首先，我们通过一些元素初始化一个int[]，arr：
```java
int[] arr = { 1, 2, 3, 4, 5 };
```
现在，让我们在expected变量中定义我们期望的结果，类型为HashSet`````````<Integer>`````````：
```java
HashSet`````````<Integer>````````` expected = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
```
现在，让我们看看我们是否可以使用Arrays.asList()方法来创建一个列表，并将其传递给HashSet的构造函数：
```java
HashSet`````````<Integer>````````` result = new HashSet<>(Arrays.asList(arr));
```
不幸的是，编译器不允许这样做，并给出了一个错误：
```java
java: incompatible types: cannot infer type arguments for java.util.HashSet<>
    reason: inference variable E has incompatible bounds
      equality constraints: java.lang.Integer
      lower bounds: T,int[]
```
我们可以看到它未能正确推断类型。

最后，让我们确认这种方法给我们一个int[]类型的HashSet，而不是HashSet`````````<Integer>`````````：
```java
HashSet`<int[]>` result = new HashSet<>(Arrays.asList(arr));
assertEquals(1, result.size());
assertNotEquals(expected, result);
```
值得注意的是，我们在HashSet中得到了一个int[]类型的单一元素。

### 3. 使用循环
解决这个用例最直接的方法是编写一个for循环，遍历数组并将每个成员添加到result HashSet中：
```java
HashSet`````````<Integer>````````` result = new HashSet<>();
for (int num : arr) {
    result.add(num);
}
```
此外，我们可以通过断言result等于expected HashSet来验证我们的方法：
```java
assertEquals(expected, result);
```
太好了！它按预期工作。

### 4. 使用Java Streams
使用Java 8或更高版本，我们可以使用streams来实现我们的目标。

让我们使用Arrays.stream()方法从我们的int数组创建一个整数流，并通过中间处理将每个整数收集到HashSet中：
```java
HashSet`````````<Integer>````````` result = Arrays.stream(arr)
  .boxed()
  .collect(Collectors.toCollection(HashSet::new));
```
重要的是要注意我们使用了boxed()方法将int类型转换为Integer类型。

最后，让我们验证我们的实现：
```java
assertEquals(expected, result);
```
完美！它给出了正确的结果。

### 5. 使用Commons Lang库
在这一部分，我们将学习如何使用Commons Lang库解决我们的用例。

#### 5.1. Maven依赖
让我们首先在pom.xml文件中添加commons-lang3工件的依赖：
```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```
太好了！我们现在可以使用这个库了。

#### 5.2. 使用ArrayUtils.toObject()方法
现在，让我们使用ArrayUtils.toObject()方法将数组从int类型转换为Integer类型。

进一步地，我们可以将对象类型传递给Arrays.asList()方法并创建HashSet对象：
```java
HashSet`````````<Integer>````````` result = new HashSet<>(Arrays.asList(ArrayUtils.toObject(arr)));
```
像以前一样，用一个简单的测试来增强我们代码的信心是一个好习惯：
```java
assertEquals(expected, result);
```
太棒了！看来我们搞定了这个问题。

### 6. 使用Guava库
继续，让我们探索如何使用Guava库解决这个问题。

#### 6.1. Maven依赖
在我们可以使用库方法之前，让我们在项目的pom.xml文件中添加guava工件的依赖：
```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``32.1.2-jre``</version>``
``</dependency>``
```
我们现在可以使用这个库了。

#### 6.2. 使用Ints.asList()方法
我们可以使用Ints.asList()方法从int数组中获取一个包含所有成员的Integer列表。因此，在这个办法中我们不需要Arrays.asList()方法。

那么，让我们继续通过传递Integer类型的列表来创建结果HashSet：
```java
HashSet`````````<Integer>````````` result = new HashSet<>(Ints.asList(arr));
```
另外，我们不要忘记测试我们的方法：
```java
assertEquals(expected, result);
```
它按预期工作。

### 7. 结论
在这篇文章中，我们**学习了如何将int[]转换为HashSet集合**以改善数据处理。

一方面，我们使用了循环结构和Java流等原生方法来解决用例。另一方面，我们还探索了Apache Commons Lang和Google Guava等流行库来解决这个问题。

如常，完整的教程源代码可在GitHub上找到。