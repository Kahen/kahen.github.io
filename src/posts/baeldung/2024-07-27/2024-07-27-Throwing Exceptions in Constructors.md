---
date: 2022-04-01
category:
  - Java
  - Exception Handling
tag:
  - Java
  - Constructors
  - Exceptions
head:
  - - meta
    - name: keywords
      content: Java, Constructors, Exceptions, Error Handling
------
# 在构造函数中抛出异常

异常提供了将错误处理代码与应用程序的正常流程分离的功能。在对象实例化期间抛出异常并不罕见。

在本文中，我们将检查有关在构造函数中抛出异常的所有细节。

构造函数是用于创建对象的特殊类型的方法。在以下部分中，我们将探讨如何抛出异常，应该抛出哪些异常，以及为什么我们会在构造函数中抛出异常。

### 2.1. 如何抛出异常？

在构造函数中抛出异常与在其他任何方法中抛出异常没有区别。让我们首先创建一个具有无参构造函数的_Animal_类：

```java
public Animal() throws InstantiationException {
    throw new InstantiationException("Cannot be instantiated");
}
```

在这里，我们抛出了_InstantiationException_，这是一个受检查的异常。

### 2.2. 应该抛出哪些异常？

尽管允许抛出任何类型的异常，但让我们建立一些最佳实践。

首先，我们不应该抛出“_java.lang.Exception_”。这是因为调用者无法确定是哪种异常，因此无法处理它。

其次，如果调用者必须强制处理它，我们应该抛出一个受检查的异常。

第三，如果调用者无法从异常中恢复，我们应该抛出一个不受检查的异常。

重要的是要注意，这些实践同样适用于方法和构造函数。

### 2.3. 为什么要在构造函数中抛出异常？

在本节中，让我们理解为什么我们可能想要在构造函数中抛出异常。

**参数验证是构造函数中抛出异常的常见用例。** 构造函数主要用于为变量赋值。如果传递给构造函数的参数无效，我们可以抛出异常。让我们考虑一个快速示例：

```java
public Animal(String id, int age) {
    if (id == null)
        throw new NullPointerException("Id cannot be null");
    if (age < 0)
        throw new IllegalArgumentException("Age cannot be negative");
}
```

在上面的示例中，我们在初始化对象之前执行参数验证。这有助于确保我们只创建有效的对象。

在这里，如果传递给_Animal_对象的_id_是_null_，我们可以抛出_NullPointerException_。对于非空但仍然无效的参数，例如_age_的负值，我们可以抛出_IllegalArgumentException_。

**安全检查是构造函数中抛出异常的另一个常见用例。** 有些对象在创建期间需要进行安全检查。如果构造函数执行的可能是不安全或敏感的操作，我们可以抛出异常。

让我们考虑我们的_Animal_类从用户输入文件中加载属性：

```java
public Animal(File file) throws SecurityException, IOException {
    if (file.isAbsolute()) {
        throw new SecurityException("Traversal attempt");
    }
    if (!file.getCanonicalPath()
        .equals(file.getAbsolutePath())) {
        throw new SecurityException("Traversal attempt");
    }
}
```

在上面的示例中，我们阻止了路径遍历攻击。这是通过不允许绝对路径和目录遍历来实现的。例如，考虑文件“a/../b.txt”。在这里，规范路径和绝对路径是不同的，这可能是潜在的目录遍历攻击。

## 3. 构造函数中的继承异常

现在，让我们讨论在构造函数中处理超类异常。

让我们创建一个扩展我们的_Animal_类的子类_Bird_：

```java
public class Bird extends Animal {
    public Bird() throws ReflectiveOperationException {
        super();
    }
    public Bird(String id, int age) {
        super(id, age);
    }
}
```

由于_super()_必须是构造函数的第一行，我们不能简单地插入一个_try-catch_块来处理超类抛出的受检查的异常。

由于我们的父类_Animal_抛出受检查的异常_InstantiationException_，我们不能在_Bird_构造函数中处理异常。**相反，我们可以传播相同的异常或其父异常。**

重要的是要注意，方法重写中的异常处理规则是不同的。在方法重写中，如果超类方法声明了异常，子类重写的方法可以声明相同的异常、子类异常或不声明异常，但不能声明父类异常。

另一方面，不受检查的异常不需要声明，也不能在子类构造函数内处理。

## 4. 安全问题

在构造函数中抛出异常可能导致部分初始化的对象。正如Java安全编码指南7.3条所述，非最终类的未完全初始化对象容易受到称为终结器攻击的安全问题。

简而言之，终结器攻击是通过子类化部分初始化的对象并覆盖其_finalize()_方法来引发的，尝试创建该子类的实例。这可能会绕过子类构造函数中执行的安全检查。

覆盖_finalize()_方法并将其标记为_final_可以防止这种攻击。

然而，_finalize()_方法在Java 9中已被弃用，从而防止了这种类型的攻击。

## 5. 结论

在本教程中，我们学习了在构造函数中抛出异常，以及相关的益处和安全问题。我们还查看了在构造函数中抛出异常的一些最佳实践。

如常，本教程中使用的源代码可在GitHub上获得。