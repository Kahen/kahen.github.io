---
date: 2024-07-22
category:
  - Java
  - JEP-371
tag:
  - Hidden Classes
  - Java 15
head:
  - - meta
    - name: keywords
      content: Java 15, Hidden Classes, JEP-371
------
# Java 15中的隐藏类 | Baeldung

## 1. 概述

Java 15引入了许多新特性。在本文中，我们将讨论一个名为隐藏类的新特性，该特性在JEP-371下推出。这个特性被引入作为Unsafe API的替代品，Unsafe API不推荐在JDK之外使用。

隐藏类特性对于任何使用动态字节码或JVM语言的人来说都非常有用。

动态生成的类为低延迟应用程序提供了效率和灵活性。它们只需要在有限的时间内使用。将它们保留为静态生成类的生命周期会增加内存占用。现有的解决方案，如每个类的类加载器，既繁琐又低效。

从Java 15开始，隐藏类已成为生成动态类的标准方式。

**隐藏类是不能被字节码或其他类直接使用的类。** 尽管它被称为类，但它应该被理解为隐藏类或接口。它也可以被定义为访问控制巢的成员，并且可以独立于其他类卸载。

让我们看看这些动态生成类的属性：

- 无法发现 - 隐藏类在字节码链接期间不会被JVM发现，也不会被显式使用类加载器的程序发现。反射方法_Class::forName_、_ClassLoader::findLoadedClass_和_Lookup::findClass_都不会找到它们。
- 我们不能使用隐藏类作为超类、字段类型、返回类型或参数类型。
- 隐藏类中的代码可以直接使用它，而不需要依赖类对象。
- 隐藏类中声明的_final_字段无论其可访问标志如何都是不可修改的。
- 它通过不可发现的类扩展了访问控制巢。
- 即使其概念定义类加载器仍然可达，它也可能被卸载。
- 默认情况下，堆栈跟踪不会显示隐藏类的方法或名称，但是可以通过调整JVM选项来显示它们。

**隐藏类不是由任何类加载器创建的。** 它具有与查找类相同的定义类加载器、运行时包和保护域。

首先，让我们创建一个_Lookup_对象：

```java
MethodHandles.Lookup lookup = MethodHandles.lookup();
```

_Lookup::defineHiddenClass_方法创建隐藏类。此方法接受一个字节数组。

为了简单起见，我们将定义一个名为_HiddenClass_的简单类，该类有一个将给定字符串转换为大写的方法：

```java
public class HiddenClass {
    public String convertToUpperCase(String s) {
        return s.toUpperCase();
    }
}
```

让我们获取类的路径并将其加载到输入流中。然后，我们将使用_IOUtils.toByteArray()_将这个类转换为字节：

```java
Class``<?>`` clazz = HiddenClass.class;
String className = clazz.getName();
String classAsPath = className.replace('.', '/') + ".class";
InputStream stream = clazz.getClassLoader()
    .getResourceAsStream(classAsPath);
byte[] bytes = IOUtils.toByteArray();
```

最后，我们将这些构造的字节传递到_Lookup::defineHiddenClass_：

```java
Class``<?>`` hiddenClass = lookup.defineHiddenClass(IOUtils.toByteArray(stream),
  true, ClassOption.NESTMATE).lookupClass();
```

第二个_boolean_参数_true_初始化类。第三个参数_ClassOption.NESTMATE_指定创建的隐藏类将被添加为查找类的巢成员，以便它可以访问同一巢中所有类和接口的_private_成员。

假设我们希望将隐藏类与其类加载器强绑定，_ClassOption.STRONG_。这意味着只有在其定义加载器不可达时，隐藏类才能被卸载。

隐藏类被在运行时生成类的框架使用，并通过反射间接使用。

在上一节中，我们创建了一个隐藏类。在本节中，我们将看到如何使用它并创建一个实例。

由于无法将从_Lookup.defineHiddenClass_获得的类与任何其他类对象进行强制转换，我们使用_Object_来存储隐藏类实例。如果我们希望将隐藏类强制转换，我们可以定义一个接口并创建一个实现该接口的隐藏类：

```java
Object hiddenClassObject = hiddenClass.getConstructor().newInstance();
```

现在，让我们从隐藏类中获取方法。获取方法后，我们将像调用任何其他标准方法一样调用它：

```java
Method method = hiddenClassObject.getClass()
    .getDeclaredMethod("convertToUpperCase", String.class);
Assertions.assertEquals("HELLO", method.invoke(hiddenClassObject, "Hello"));
```

现在，我们可以通过调用一些方法来验证隐藏类的一些属性：

_isHidden()_方法将为此类返回_true_：

```java
Assertions.assertEquals(true, hiddenClass.isHidden());
```

另外，由于隐藏类没有实际名称，其规范名称将为_null_：

```java
Assertions.assertEquals(null, hiddenClass.getCanonicalName());
```

隐藏类将具有与执行查找的类相同的定义加载器。由于查找发生在同一个类中，以下断言将成功：

```java
Assertions.assertEquals(this.getClass()
    .getClassLoader(), hiddenClass.getClassLoader());
```

如果我们尝试通过任何方法访问隐藏类，它们将抛出_ClassNotFoundException_。这是显而易见的，因为隐藏类名称足够不寻常且未限定，以至于对其他类不可见。让我们检查几个断言以证明隐藏类是不可见的：

```java
Assertions.assertThrows(ClassNotFoundException.class, () -> Class.forName(hiddenClass.getName()));
Assertions.assertThrows(ClassNotFoundException.class, () -> lookup.findClass(hiddenClass.getName()));
```

请注意，其他类只能通过其_Class_对象来使用隐藏类。

我们在前面的部分中创建了一个隐藏类并玩弄了一些它的属性。现在，让我们详细说明匿名类（没有显式名称的内部类）与隐藏类之间的区别：

- 匿名类有一个动态生成的名称，名称之间有一个$，而从_com.baeldung.reflection.hiddenclass.HiddenClass_派生的隐藏类将是_com.baeldung.reflection.hiddenclass.HiddenClass/1234_。
- 匿名类使用_Unsafe::defineAnonymousClass_实例化，这已被弃用，而_Lookup::defineHiddenClass_实例化隐藏类。
- 隐藏类不支持常量池修补。它有助于定义其常量池条目已经解析为具体值的匿名类。
- 与隐藏类不同，匿名类可以访问主机类的_protected_成员，即使它在不同的包中且不是子类。
- 匿名类可以封装其他类以访问其成员，但隐藏类不能封装其他类。

尽管**隐藏类不是匿名类的替代品**，但它们正在替代JDK中匿名类的某些用法。**从Java 15开始，lambda表达式使用隐藏类**。

## 7. 结论

在本文中，我们详细讨论了一种名为隐藏类的新语言特性。像往常一样，代码可以在GitHub上找到。好的，翻译已经完成。以下是文章的其余部分：

---
## 7. 结论

在本文中，我们详细讨论了Java 15中的一个新语言特性——隐藏类。如常，代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK