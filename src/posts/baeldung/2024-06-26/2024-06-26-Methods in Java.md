---
date: 2024-06-27
category:
  - Java
  - 编程
tag:
  - 方法
  - 教程
head:
  - - meta
    - name: keywords
      content: Java 方法, Java 方法教程, Baeldung
------
# Java 中的方法 | Baeldung

## 1. 引言

在Java中，方法是我们定义应用程序业务逻辑的地方。它们定义了封装在对象中的数据之间的交互。

在本教程中，我们将介绍Java方法的语法，方法签名的定义，以及如何调用和重载方法。

## 2. 方法语法

首先，一个方法由六部分组成：

- **访问修饰符：** 可选择性地指定代码中哪些地方可以访问该方法
- **返回类型：** 方法返回的值的类型，如果有的话
- **方法标识符：** 我们给方法的命名
- **参数列表：** 可选的，用逗号分隔的方法输入列表
- **异常列表：** 方法可能抛出的异常列表
- **主体：** 逻辑定义（可以为空）

让我们看一个例子：

### 2.1. 访问修饰符

访问修饰符允许我们指定哪些对象可以访问该方法。有四种可能的访问修饰符：_public, protected, private_ 和默认（也称为 _package-private_）。

一个方法**也可以在访问修饰符之前或之后包含 _static_ 关键字**。这意味着该方法属于类而不是实例，因此我们可以在不创建类的实例的情况下调用该方法。没有 _static_ 关键字的方法称为实例方法，只能在类的实例上调用。

关于性能，静态方法将在类加载期间只加载一次，因此更节省内存。

### 2.2. 返回类型

方法可以返回数据到调用它们的地方。**一个方法可以返回一个原始值或对象引用，或者如果使用 _void_ 关键字作为返回类型，它可以不返回任何内容**。

让我们看一个 _void_ 方法的例子：

```java
public void printFullName(String firstName, String lastName) {
    System.out.println(firstName + " " + lastName);
}
```

**如果我们声明了一个返回类型，那么我们必须在方法主体中指定一个 _return_ 语句。** 一旦执行了 _return_ 语句，方法主体的执行将完成，如果有更多语句，这些将不会被处理。

另一方面，一个 _void_ 方法不返回任何值，因此没有 _return_ 语句。

### 2.3. 方法标识符

方法标识符是我们分配给方法规范的名称。使用有信息量且描述性的名称是一个好习惯。值得一提的是，方法标识符最多可以有 65536 个字符（一个长名称）。

### 2.4. 参数列表

我们可以**在参数列表中为方法指定输入值**，它用括号括起来。一个方法可以有0到255个参数，这些参数由逗号分隔。一个参数可以是对象、原始类型或枚举。我们可以使用Java注解在方法参数级别（例如Spring注解 _@RequestParam_）。

### 2.5. 异常列表

我们可以通过使用 _throws_ 子句来指定方法抛出的异常。在检查异常的情况下，我们必须将代码用 _try-catch_ 子句包围起来，或者我们必须在方法签名中提供 _throws_ 子句。

那么，让我们看看我们之前方法的一个更复杂的变体，它抛出了一个检查异常：

```java
public void writeName(String name) throws IOException {
    PrintWriter out = new PrintWriter(new FileWriter("OutFile.txt"));
    out.println("Name: " + name);
    out.close();
}
```

### 2.6. 方法主体

**Java方法的最后一部分是方法主体，它包含我们想要执行的逻辑。** 在方法主体中，我们可以写任意多行代码——或者在静态方法的情况下，一行也不写。如果我们的方法声明了一个返回类型，那么方法主体必须包含一个返回语句。

## 3. 方法签名

根据其定义，方法签名仅由两个组成部分——**方法的名称和参数列表**。

那么，让我们写一个简单的方法：

```java
public String getName(String firstName, String lastName) {
  return firstName + " " + middleName + " " + lastName;
}
```

这个方法的签名是 _getName(String firstName, String lastName)_。

方法标识符可以是任何标识符。然而，如果我们遵循常见的Java编码约定，方法标识符应该是一个以小写字母开头的动词，后面可以跟形容词和/或名词。

## 4. 调用方法

现在，让我们探索**如何在Java中调用方法**。按照前面的例子，假设这些方法被包含在一个名为 _PersonName_ 的Java类中：

```java
public class PersonName {
  public String getName(String firstName, String lastName) {
    return firstName + " " + middleName + " " + lastName;
  }
}
```

由于我们的 _getName_ 方法是一个实例方法而不是一个 _static_ 方法，为了调用 _getName_ 方法，我们需要**创建类 _PersonName_ 的一个实例**：

```java
PersonName personName = new PersonName();
String fullName = personName.getName("Alan", "Turing");
```

正如我们所看到的，我们使用创建的对象来调用 _getName_ 方法。

最后，让我们看看**如何调用一个静态方法**。在静态方法的情况下，我们不需要类实例来调用。相反，我们使用类名前缀的方法名来调用它。

让我们用前面例子的一个变体来演示：

```java
public class PersonName {
  public static String getName(String firstName, String lastName) {
    return firstName + " " + middleName + " " + lastName;
  }
}
```

在这种情况下，方法调用是：

```java
String fullName = PersonName.getName("Alan", "Turing");
```

## 5. 方法重载

Java允许我们拥有**具有相同标识符但不同参数列表的两个或多个方法——不同的方法签名**。在这种情况下，我们说**方法是重载的**。让我们以一个例子为例：

```java
public String getName(String firstName, String lastName) {
  return getName(firstName, "", lastName);
}

public String getName(String firstName, String middleName, String lastName) {
  if (!middleName.equals("")) {
    return firstName + " " + lastName;
  }
  return firstName + " " + middleName + " " + lastName;
}
```

方法重载对于像示例中的情况非常有用，我们可以有一个实现相同功能简化版本的方法是有用的。

最后，一个好的设计习惯是确保重载的方法以类似的方式行为。否则，如果具有相同标识符的方法以不同的方式行为，代码将会变得混乱。

## 6. 结论

在本教程中，我们探讨了在Java中指定方法时涉及的Java语法部分。

特别是，我们经历了访问修饰符、返回类型、方法标识符、参数列表、异常列表和方法主体。然后我们看到了方法签名的定义，如何调用一个方法，以及如何重载一个方法。

像往常一样，这里看到的代码可以在GitHub上找到。