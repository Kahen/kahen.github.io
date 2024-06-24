---
date: 2024-06-24
category:
  - Java
  - Programming
tag:
  - Java
  - Static Context
  - Non-Static Method
head:
  - - meta
    - name: keywords
      content: Java, Static Context, Non-Static Method, Compilation Error
------
# Java中的错误：“非静态方法不能从静态上下文中引用”是什么？

当我们使用Java时，经常会遇到需要更深入理解语言细节的问题。一个常见的难题是错误消息：“非静态方法...不能从静态上下文中引用。”这个错误对于初学者来说可能看起来很吓人，甚至可能会让经验丰富的程序员感到困惑。

在本教程中，我们将深入探讨这个错误背后的原因，并探索解决它的方法。

## 2. 问题介绍

像往常一样，让我们通过一个例子快速理解问题。假设我们有一个_ToolBox_类：

```java
class ToolBox {
    private String concat(String str1, String str2) {
        return str1 + str2;
    }

    static String joinTwoStrings(String str1, String str2) {
        return concat(str1, str2); // <-- 编译错误
    }
}
```

_ToolBox_类有一个_concat()_方法。我们不希望每个人都调用它，所以我们将其声明为一个_private_方法。此外，我们还有一个静态方法_joinTwoStrings()_，它在内部调用_concat()_方法。

然而，如果我们编译它，就会出现一个编译错误：

```java
java: 非静态方法concat(java.lang.String,java.lang.String)不能从静态上下文中引用
```

接下来，让我们理解这个错误消息的含义，看看如何解决它。

## 3. 错误的含义是什么？

在我们解决非静态方法问题之前，让我们先理解Java中的静态上下文概念。

在Java中，**关键字“_static_”用于声明属于类的元素而不是实例**。静态员在所有类的实例之间共享，并且**可以在不创建类的实例的情况下访问**。

然而，另一方面，**非静态方法是与类的实例相关联的，不能在不创建对象的情况下调用**。它们可以依赖于对象的特定状态，它们的行为可能会根据实例变量的值而变化。

“非静态方法...不能从静态上下文中引用”的编译错误发生在尝试**从静态上下文调用非静态方法时**。这个静态上下文可能是静态方法、静态块或总是静态的_main()_方法。

现在我们理解了问题发生的原因，让我们看看如何修复它。

## 4. 解决问题

我们已经了解到，非静态成员不能在不创建实例的情况下调用。然后，根据要求，我们有几种方法可以解决问题。

接下来，让我们仔细看看它们。

### 4.1. 从静态上下文中调用静态方法

第一种解决方案是**将实例方法转换为静态方法**。如果我们完成了这种转换，那么我们从静态上下文调用它就不会有任何问题：

```java
class ToolBox {
    private static String concatStatic(String str1, String str2) {
        return str1 + str2;
    }

    static String joinTwoStrings(String str1, String str2) {
        return concatStatic(str1, str2);
    }
}
```

正如我们在上面的代码中看到的，为了更容易地发现我们所做的更改，我们使用了新的方法名称_concatStatic_。此外，我们通过添加_static_关键字使其成为静态方法。

现在，如果我们调用静态的_joinTwoStrings()_方法，我们将得到预期的结果：

```java
assertEquals("ab", ToolBox.joinTwoStrings("a", "b"));
```

### 4.2. 创建实例并调用实例方法

有时，需求不允许我们将实例方法更改为静态的。在这种情况下，我们可以重构静态方法，**首先创建一个实例，然后调用实例方法**：

```java
class ToolBox {
    private String concat(String str1, String str2) {
        return str1 + str2;
    }

    static String creatingInstanceJoinTwoStrings(String str1, String str2) {
        ToolBox toolBox = new ToolBox();
        return toolBox.concat(str1, str2);
    }
}
```

现在，如果我们调用静态的_creatingInstanceJoinTwoStrings()_方法，它将正常工作：

```java
assertEquals("ab", ToolBox.creatingInstanceJoinTwoStrings("a", "b"));
```

另外，我们可以考虑**这个类中的_creatingInstanceJoinTwoStrings()_方法是否必须是静态的**。如果不是，我们也可以**将静态方法转换为常规的实例方法**：

```java
class ToolBox {
    private String concat(String str1, String str2) {
        return str1 + str2;
    }

    String instanceJoinTwoStrings(String str1, String str2) {
        return concat(str1, str2);
    }
}
```

通过这个修复，_instanceJoinTwoStrings()_方法不再静态。因此，它可以直接调用私有的_concat()_实例方法。

当然，当我们使用_instanceJoinTwoStrings()_时，我们必须首先创建一个_ToolBox_对象：

```java
ToolBox toolBox = new ToolBox();
assertEquals("ab", toolBox.instanceJoinTwoStrings("a", "b"));
```

## 5. 实例能调用静态方法吗？

我们已经了解到我们不能从静态上下文中引用非静态成员。一些人可能会问，**我们能在实例方法中调用静态方法吗**？

接下来，让我们进行测试：

```java
class ToolBox {
    private static String concatStatic(String str1, String str2) {
        return str1 + str2;
    }

    String instanceCallStaticJoinTwoStrings(String str1, String str2) {
        return concatStatic(str1, str2);
    }
}
```

正如我们在上面的代码中看到的，实例方法_instanceCallStaticJoinTwoStrings()_调用了私有静态方法_concatStatic()_。

代码可以编译。进一步地，如果我们测试它，它也能正常工作：

```java
ToolBox toolBox = new ToolBox();
assertEquals("ab", toolBox.instanceCallStaticJoinTwoStrings("a", "b"));
```

所以，问题的答案是肯定的。

在Java中，**从实例方法中调用静态方法是允许的**。这是因为静态成员不绑定到特定的实例。相反，它们与类本身关联，并且可以使用类名来调用。在我们的代码中，我们调用_concatStatic(str1, str2)_没有使用类名“_ToolBox.concatStatic(str1, str2)_”，因为我们已经在_ToolBox_类中了。

## 6. 结论

在本文中，我们探讨了编译错误“非静态方法不能从静态上下文中引用”，深入研究了其原因，并检查了各种解决和修复此问题的方法。

像往常一样，示例的完整源代码可以在GitHub上找到。