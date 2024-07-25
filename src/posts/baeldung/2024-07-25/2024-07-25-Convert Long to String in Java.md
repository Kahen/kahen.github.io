---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Long to String
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Long to String, Conversion
---

# Java中将Long转换为String的方法

在这篇简短的教程中，我们将学习如何在Java中将**Long**转换为**String**。

## 2. 使用Long.toString()

例如，假设我们有两个类型为**long**和**Long**的变量（一个是原始类型，另一个是引用类型）：

```java
long l = 10L;
Long obj = 15L;
```

我们可以直接使用**Long**类的**toString()**方法将它们转换为**String**：

```java
String str1 = Long.toString(l);
String str2 = Long.toString(obj);

System.out.println(str1);
System.out.println(str2);
```

输出将如下所示：

```java
10
15
```

如果我们的**obj**对象是**null**，我们将得到一个**NullPointerException**。

## 3. 使用String.valueOf()

我们可以使用**String**类的**valueOf()**方法达到相同的目的：

```java
String str1 = String.valueOf(l);
String str2 = String.valueOf(obj);
```

当**obj**是**null**时，该方法将把**str2**设置为“null”，而不是抛出**NullPointerException**。

## 4. 使用String.format()

除了**String**类的**valueOf()**方法，我们还可以使用**format()**方法：

```java
String str1 = String.format("%d", l);
String str2 = String.format("%d", obj);
```

如果**obj**是**null**，**str2**也将是“null”。

## 5. 使用Long对象的toString()方法

我们的**obj**对象可以使用其**toString()**方法获得**String**表示：

```java
String str = obj.toString();
```

当然，如果**obj**是**null**，我们将得到一个**NullPointerException**。

## 6. 使用+运算符

我们可以简单地使用+运算符与一个空的**String**来获得相同的结果：

```java
String str1 = "" + l;
String str2 = "" + obj;
```

如果**obj**是**null**，**str2**将是“null”。

## 7. 使用StringBuilder或StringBuffer

**StringBuilder**和**StringBuffer**对象可以用来将**Long**转换为**String**：

```java
String str1 = new StringBuilder().append(l).toString();
String str2 = new StringBuilder().append(obj).toString();
```

如果**obj**是**null**，**str2**将是“null”。

## 8. 使用DecimalFormat

最后，我们可以使用**DecimalFormat**对象的**format()**方法：

```java
String str1 = new DecimalFormat("#").format(l);
String str2 = new DecimalFormat("#").format(obj);
```

注意，因为**如果obj是null，我们将得到一个IllegalArgumentException**。

## 9. 结论

总之，我们学习了在Java中将**Long**转换为**String**的不同方法。选择使用哪种方法取决于我们，但通常最好使用简洁且不抛出异常的方法。