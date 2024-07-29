---
date: 2024-07-30
category:
  - Java
  - Error Handling
tag:
  - IllegalAccessError
  - Java Exception
head:
  - - meta
    - name: keywords
      content: Java, Error, IllegalAccessError, Runtime Exception
---

# Java中的IllegalAccessError

1. 概述

在这个快速教程中，我们将讨论java.lang.IllegalAccessError。

我们将检查何时抛出此错误以及如何避免它。

2. IllegalAccessError简介

当应用程序尝试访问无法访问的字段或调用方法时，会抛出IllegalAccessError。

编译器会捕获此类非法调用，但我们仍然可能在运行时遇到IllegalAccessError。

首先，让我们观察一下IllegalAccessError的类层次结构：

```
java.lang.Object
  |_java.lang.Throwable
    |_java.lang.Error
      |_java.lang.LinkageError
        |_java.lang.IncompatibleClassChangeError
          |_java.lang.IllegalAccessError
```

它的父类是IncompatibleClassChangeError。因此，此错误的原因是一个或多个类定义中的不兼容更改。

简单来说，**运行时的类版本与编译时的不同。**

3. 此错误可能如何发生？

让我们通过一个简单的程序来理解：

```java
public class Class1 {
    public void bar() {
        System.out.println("SUCCESS");
    }
}

public class Class2 {
    public void foo() {
        Class1 c1 = new Class1();
        c1.bar();
    }
}
```

在运行时，上述代码在Class1中调用方法bar()。到目前为止，一切正常。

现在，让我们将bar()的访问修饰符更新为private并独立编译它。

接下来，用新编译的版本替换Class1的先前定义（.class文件），然后重新运行程序：

```
java.lang.IllegalAccessError:
  class Class2 tried to access private method Class1.bar()
```

上述异常是自解释的。Class1中的方法bar()现在是private。显然，访问它是非法的。

4. IllegalAccessError在行动中

### 4.1. 库更新

考虑一个在编译时使用库的应用程序，并且该库在运行时也在类路径中可用。

库的所有者将一个公开可用的方法更新为private，重新构建它，但忘记通知其他方此更改。

此外，在执行过程中，当应用程序调用此方法（假设为public访问）时，它遇到了IllegalAccessError。

### 4.2. 接口默认方法

接口中默认方法的误用是此错误的另一个原因。

考虑以下接口和类定义：

```java
interface Baeldung {
    public default void foobar() {
        System.out.println("This is a default method.");
    }
}

class Super {
    private void foobar() {
        System.out.println("Super class method foobar");
    }
}
```

另外，让我们扩展Super并实现Baeldung：

```java
class MySubClass extends Super implements Baeldung {}
```

最后，让我们通过实例化MySubClass来调用foobar()：

```java
new MySubClass().foobar();
```

Super中的方法foobar()是private，而Baeldung中是default。因此，在MySubClass的层次结构中它是可访问的。

因此，编译器不会抱怨，但在运行时，我们会得到一个错误：

```
java.lang.IllegalAccessError:
  class IllegalAccessErrorExample tried to access private method 'void Super.foobar()'
```

在执行过程中，**超类方法声明总是优先于接口默认方法。**

技术上，应该调用Super中的foobar，但它是private。毫无疑问，将抛出IllegalAccessError。

5. 如何避免它？

确切地说，如果我们遇到IllegalAccessError，我们首先应该查找与访问修饰符相关的类定义中的更改。

其次，我们应该验证接口默认方法是否被覆盖为private访问修饰符。

使类级别方法公开将奏效。

6. 结论

总之，编译器将解决大多数非法方法调用。如果我们仍然遇到IllegalAccesError，我们需要查看类定义的更改。

示例的源代码可在GitHub上获得。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK