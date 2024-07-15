---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - Java
  - 类名冲突
  - 命名冲突
head:
  - - meta
    - name: keywords
      content: Java, 类名冲突, 编程
------
# Java中处理同名类的策略

## 1. 引言

Java的类命名遵循一种称为大驼峰命名法的国际惯例，就像主要的编程语言一样。然而，当处理同名的类时，就遇到了挑战。

**自1998年JDK最初发布以来，如何解决这种不寻常的情况一直存在争议。** 这是JDK-4194542，关于这个主题的第一个开放的bug，从那时起，JDK开发团队的建议是使用完全限定的类名。然而，JDK目前没有计划很快推出允许这种用法的功能。

最近，在2019年8月，Java开发社区提出了一个新的提议（JEP），关于如何解决这种情况，并且正在获得全球Java开发者的更多支持。

**在本教程中，我们将讨论处理同名类的策略和建议。**

## 2. 定义类

首先，让我们在一个自定义包_com.baeldung.date_中创建一个名为_Date_的类。

```java
package com.baeldung.date;

public class Date {

    private long currentTimeMillis;

    public Date() {
        this(System.currentTimeMillis());
    }

    public Date(long currentTimeMillis) {
        this.currentTimeMillis = currentTimeMillis;
    }

    public long getTime() {
        return currentTimeMillis;
    }
}
```

## 3. 使用完全限定类名

**我们将采用这种方法来避免当这种用法被隔离且不经常重复时的冲突。** 然而，通常认为使用完全限定名是一种较差的风格。

**让我们看看如何使用它，特别是如果包名简短且描述性强，可以使代码更具表现力，从而减少混淆并提高可读性。**

另一方面，当使用的对象是大型类或方法时，它有助于调试：

```java
public class DateUnitTest {

    @Test
    public void whenUsingFullyQualifiedClassNames() {

        java.util.Date javaDate = new java.util.Date();
        com.baeldung.date.Date baeldungDate = new com.baeldung.date.Date(javaDate.getTime());

        Assert.assertEquals(javaDate.getTime(), baeldungDate.getTime());
    }
}
```

## 4. 导入最常用的类

**我们导入我们最常用的类，并使用最不常用的类使用完整类路径，这是Java开发者中常见的技术和最佳实践：**

```java
import java.util.Date;

public class DateUnitTest {

    @Test
    public void whenImportTheMostUsedOne() {

        Date javaDate = new Date();
        com.baeldung.date.Date baeldungDate = new com.baeldung.date.Date(javaDate.getTime());

        Assert.assertEquals(javaDate.getTime(), baeldungDate.getTime());
    }
}
```

## 5. 结论

在本文中，我们根据特定情况展示了使用同名类的两种可能方法，并观察了它们之间的主要区别。

如常，本文的完整代码示例可以在GitHub上找到。