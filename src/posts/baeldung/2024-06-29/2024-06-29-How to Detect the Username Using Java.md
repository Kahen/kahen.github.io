---
date: 2022-04-01
category:
  - Java
  - 教程
tag:
  - Java
  - 用户名
  - 系统属性
head:
  - - meta
    - name: keywords
      content: Java, 用户名, 系统属性, 环境变量
------
# 如何使用Java检测用户名

---

## 1. 概述

有时，在使用Java应用程序时，我们需要访问系统属性和环境变量的值。

在本教程中，我们将学习如何从运行中的Java应用程序中检索用户名。

## 2. _System.getProperty_

获取用户信息的一种方式，更确切地说，是其名称，我们可以使用_System.getProperty(String)_。这个方法需要一个键。**它们通常是统一的并且预定义的，比如_java.version_、_os.name_、_user.home_等。** 在我们的情况下，我们对_user.name_感兴趣：

```
String username = System.getProperty("user.name");
System.out.println("User: " + username);
```

这个方法的重载版本System可以保护我们免受不存在的属性的影响。_getProperty(String, String)_，它接受一个默认值。

```
String customProperty = System.getProperty("non-existent-property", "default value");
System.out.println("Custom property: " + customProperty);
```

除了使用预定义的系统属性外，此方法还允许我们获取我们使用_-D_前缀传递的自定义属性的值。如果我们使用以下命令运行应用程序：

```
java -jar app.jar -Dcustom.prop=`Hello World!`
```

在应用程序内部，我们可以使用这个值

```
String customProperty = System.getProperty("custom.prop");
System.out.println("Custom property: " + customProperty);
```

这可以帮助我们通过在启动时传递值来使代码库更加灵活和可扩展。

另外，可以使用_System.setProperty_，但更改关键属性可能会对系统产生不可预测的影响。

## 3. _System.getenv_

**此外，我们可以使用环境变量来获取用户名。** 通常，可以通过_USERNAME_或_USER_找到它：

```
String username = System.getenv("USERNAME");
System.out.println("User: " + username);
```

环境变量是只读的，但也提供了一个极好的机制来获取应用程序运行的系统的信息。

## 4. 结论

在本文中，我们讨论了几种获取环境所需信息的方法。环境变量和属性是获取有关系统的更多信息的便捷方式。它们还允许自定义变量使应用程序更加灵活。

像往常一样，所有示例都可以在GitHub上找到。