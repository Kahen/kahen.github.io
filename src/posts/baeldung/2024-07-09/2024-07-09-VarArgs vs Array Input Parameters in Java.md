---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - varargs
  - array
  - method parameters
head:
  - - meta
    - name: keywords
      content: Java, varargs, array, method parameters
------
# Java中可变参数与数组输入参数的比较

在这个教程中，我们将探讨Java中`method(String… args)`和`method(String[] args)`之间的区别。在此过程中，我们将检查如何将数组或可变长度参数列表传递给方法。

## 2. 向方法传递数组

在这一部分，我们将展示如何声明一个类型为`String`的数组作为方法的参数，以及如何在方法调用期间传递相同类型的数组作为参数。

Java是一种静态类型编程语言，这意味着变量类型在编译时已知。程序员必须声明一个变量类型，无论是基本类型还是引用类型。在定义带有数组参数的方法时，**我们期望在方法调用期间声明我们要作为参数传递的数组类型**。

让我们看看在方法头中定义一个`String`数组参数的语法：

```java
void capitalizeNames(String[] args)
```

让我们分解上述方法头中声明的参数：

- `String[]` – 类型名称
- `args` – 参数名称

```java
void capitalizeNames(String[] args) {
    for(int i = 0; i < args.length; i++){
       args[i] = args[i].toUpperCase();
    }
}
```

从上述代码中，`capitalizeNames()`方法有一个`String`数组参数`args`。方法头指定，当调用该方法时，它只接收一个`java.lang.String[]`类型的数组引用。

本质上，当我们在方法头中遇到`(String[] args)`时，我们应该理解为当调用该方法时，它将接收一个类型为`String`的单一数组作为参数。

让我们看一个例子：

```java
@Test
void whenCheckingArgumentClassName_thenNameShouldBeStringArray() {
    String[] names = {"john", "ade", "kofi", "imo"};
    assertNotNull(names);
    assertEquals("java.lang.String[]", names.getClass().getTypeName());
    capitalizeNames(names);
}
```

当我们检查`capitalizeNames()`方法参数`names`的类名时，我们得到`java.lang.String[]`，这与方法定义中的参数匹配。**如果我们尝试将不同类型的参数传递给方法，我们将得到编译错误**：

```java
@Test
void whenCheckingArgumentClassName_thenNameShouldBeStringArray() {
    ...
    int[] evenNumbers = {2, 4, 6, 8};
    capitalizeNames(evenNumbers);
}
```

上述代码片段将在控制台上输出编译错误消息：

```java
incompatible types: int[] cannot be converted to java.lang.String[]
```

## 3. 可变长度参数列表

可变长度参数列表，也称为Java中的_varargs_，允许我们在方法调用期间传递任意数量的相同类型参数。

方法中可变长度参数列表的语法如下：

```java
String[] firstLetterOfWords(String... args)
```

让我们分解上述方法头中声明的参数：

- `String…` – 带省略号的类型名称
- `args` – 参数名称

```java
String[] firstLetterOfWords(String... args) {
    String[] firstLetter = new String[args.length];
    for(int i = 0; i < args.length; i++){
        firstLetter[i] = String.valueOf(args[i].charAt(0));
    }
    return firstLetter;
}
```

我们在方法签名中声明参数类型，然后是省略号 (…) 和参数名称。

使用可变长度参数列表，**我们可以向方法添加任意数量的相同类型参数，因为Java将给定的参数作为数组中的元素来处理**。当将_varargs_作为方法参数的一部分时，请确保类型、省略号和参数名称是最后一个。

例如，这将是不正确的：

```java
static String[] someMethod(String... args, int number)
```

我们可以通过交换参数的顺序，将_varargs_参数放在最后来轻松修复这个问题：

```java
static String[] someMethod(int number, String... args)
```

让我们测试我们上面编写的`firstLetterOfWords`方法：

```java
@Test
void whenCheckingReturnedObjectClass_thenClassShouldBeStringArray() {
    assertEquals(String[].class, firstLetterOfWords("football", "basketball", "volleyball").getClass());
    assertEquals(3, firstLetterOfWords("football", "basketball", "volleyball").length);
}
```

我们知道`_firstLetterOfWords()`方法接受类型为`String`的可变长度参数列表，因为有了省略号，我们以相同的方式传递参数。测试显示，当我们访问其`getClass()`属性时，该方法返回一个数组。我们还可以通过访问数组的长度属性得到3，这与传递给方法的参数数量相匹配。

## 4. `(String[] args)`与`(String… args)`

`(String[] args)`表示Java方法参数中的`String`类型数组。**它通常作为Java类中main方法的数组参数找到**。main方法中的`String[]` _args_参数从命令行参数形成`String`数组。**当使用`(String[] args)`调用方法时，必须作为参数传递一个`String`数组**。

**在定义方法时，我们只能有一个可变长度参数列表**。_varargs_不仅限于`java.lang.String`类型。我们可以有其他类型，如`(int… args)`、`(double… args)`等。在幕后，Java将调用方法时传递的所有参数制成数组。然而，我们可以在没有参数的情况下调用具有_varargs_参数的方法，在这种情况下，它将被视为空数组。

**记住，将`args`作为变量名只是一个约定** —— 可以使用任何其他适当的名称。

## 5. 结论

在这个教程中，我们检查了`method(String[] args)`和`method(String… args)`之间的区别。前者是一个带有`String`数组参数的方法，而后者是一个带有可变长度参数列表（_varargs_）的方法。

_varargs_总是作为方法参数列表中的最后一个参数放置，因此一个方法可以声明只有一个_varargs_参数。

本教程的代码可以在GitHub上找到。