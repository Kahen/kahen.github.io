---
date: 2024-06-25
category:
  - Java
  - 编程
tag:
  - String
  - Long
  - 转换
head:
  - - meta
    - name: keywords
      content: Java, String to Long, 转换, 编程技巧
---
# Java中将字符串转换为long或Long类型

在本教程中，我们将探讨如何将一个字符串转换为long基本类型或Long对象。

假设我们有一个字符串，其值反映了一个数字，这个数字刚好超出了有符号int的范围。我们以Integer.MAX_VALUE + 1为例，即2,147,483,648。

### 2. 使用Long的构造函数
给定我们的字符串，我们可以**使用接受字符串作为参数的重载Long构造函数**：
```java
Long l = new Long("2147483648");
```
这将创建一个新的Long实例，可以通过调用longValue()方法将其转换为原始long类型。

或者，我们可以利用拆箱，在一条语句中将我们的Long对象转换为其原始等价物：
```java
long l = new Long("2147483648");
```
**然而，自Java 9以来，这种构造函数的使用已被弃用，转而推荐使用Long类的静态工厂方法valueOf()或parseLong()。**

### 3. 使用Long.valueOf()方法
当我们想从我们的字符串中获取一个Long对象时，建议使用静态工厂方法valueOf()：
```java
Long l = Long.valueOf("2147483648");
```
这种方法是首选，因为它缓存了常用的Long实例，以提供更好的性能和内存开销。这与每次调用都会创建新实例的构造函数形成对比。

### 4. 使用Long.parseLong()方法
当我们想要返回一个long原始类型时，我们可以使用parseLong()静态工厂方法：
```java
long l = Long.parseLong("2147483648");
```
这种方法比构造函数和valueOf()更受推荐，当我们想要获得一个long原始类型时。这是因为它直接返回一个long原始类型，而不需要在转换过程中创建不必要的Long对象。

### 5. 使用Long.decode()方法
如果我们的字符串是十六进制形式，我们可以使用静态工厂方法decode()将其转换为Long对象。
假设我们有一个字符串的十六进制表示：
```java
Long l = Long.decode("0x80000000");
```
值得注意的是，这种方法也支持十进制和八进制表示。因此，在使用这种方法时，我们必须**警惕字符串中的前导零**。

### 6. 使用Apache Commons的NumberUtils.createLong()方法
要使用Apache Commons Lang 3，我们需要在pom.xml中添加以下依赖：
```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```
静态工厂方法createLong()将字符串转换为Long对象：
```java
Long l = NumberUtils.createLong("0x80000000");
```
**它在底层使用Long.decode()，但有一个重要补充——如果字符串参数为null，则返回null。**

### 7. 使用Long.parseUnsignedLong()方法
现在，假设我们有一个字符串，它表示一个超出long原始类型有符号范围的值。我们可以使用parseUnsignedLong()静态工厂方法获得一个无符号的long，范围为0到18,446,744,073,709,551,615：
```java
long l = Long.parseUnsignedLong("9223372036854775808");
```
**与本文中探讨的其他选项不同，如果字符串的第一个字符是ASCII负号，将抛出NumberFormatException。**

### 8. 使用Google Guava的Longs.tryParse()方法
要使用Google Guava，我们需要在pom.xml中添加以下依赖：
```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``33.0.0-jre``</version>``
``</dependency>``
```
现在，给定我们的字符串，我们可以使用tryParse()将其转换为Long对象：
```java
Long l = Longs.tryParse("2147483648");
```
**到目前为止，我们探讨的所有选项在无法解析字符串时都会抛出NumberFormatException。** 因此，如果我们想要避免抛出这个异常的可能性，我们可以使用静态工厂方法tryParse()，它返回null而不是抛出异常：
```java
@Test
void givenInvalidString_whenUsingGuavaLongs_thenObtainNull() {
    assertThat(Longs.tryParse("Invalid String")).isNull();
}
```

### 9. 结论
在本文中，我们了解到parseLong()是获取给定字符串的long原始类型的首选方法。我们还看到valueOf()是获取给定字符串的Long对象的首选方法。

如常，本文中使用的代码示例可以在GitHub上找到。