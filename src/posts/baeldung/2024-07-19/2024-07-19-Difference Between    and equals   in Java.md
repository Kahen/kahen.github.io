---
date: 2022-04-01
category:
  - Java
  - equals() vs == 
tag:
  - Java
  - equals()
  - ==
head:
  - - meta
    - name: keywords
      content: Java equals() 方法, Java == 运算符, 引用相等性, 值相等性
---
# Java 中的 equals() 方法和 == 运算符的区别

在本教程中，我们将描述 Java 中两种基本的等式检查——引用相等性和值相等性。我们将比较它们，展示示例，并强调它们之间的主要区别。

我们还将专注于空值检查，并理解为什么在处理对象时应使用引用相等性而不是值相等性。

## 1. 引用相等性
我们将从理解引用比较开始，这是由等式运算符（==）表示的。**引用相等性发生在两个引用指向内存中的同一个对象时。**

### 1.1 原始类型与等式运算符
我们知道 Java 中的原始类型是简单的非类原始值。当我们使用等式运算符与原始类型时，我们只是在比较它们的值：

```java
int a = 10;
int b = 15;
assertFalse(a == b);

int c = 10;
assertTrue(a == c);

int d = a;
assertTrue(a == d);
```

如上所示，**对于原始类型，等式和引用检查的工作方式相同**。当我们用相同的值初始化一个新的原始类型时，检查返回 true。此外，如果我们将原始值重新赋给新变量并进行比较，运算符返回相同的结果。

现在让我们执行空值检查：

```java
int e = null; // 编译错误
assertFalse(a == null); // 编译错误
assertFalse(10 == null); // 编译错误
```

Java 禁止将 null 分配给原始类型。通常，**我们不能在原始变量或值上使用等式运算符进行任何空值检查**。

### 1.2 对象类型与等式运算符
对于 Java 中的对象类型，**等式运算符仅执行引用相等性比较，忽略对象值**。在我们执行测试之前，让我们创建一个简单的自定义类：

```java
public class Person {
    private String name;
    private int age;

    // 构造函数，getter，setter...
}
```

现在，让我们初始化一些类对象并检查等式运算符的结果：

```java
Person a = new Person("Bob", 20);
Person b = new Person("Mike", 40);
assertFalse(a == b);

Person c = new Person("Bob", 20);
assertFalse(a == c);

Person d = a;
assertTrue(a == d);
```

结果与之前大不相同。第二个检查返回 false，而我们之前对原始类型得到的是 true。正如我们前面提到的，等式运算符在比较时忽略了对象的内部值。它只**检查两个变量是否引用相同的内存地址**。

与原始类型不同，我们在使用对象时可以使用 null：

```java
assertFalse(a == null);
Person e = null;
assertTrue(e == null);
```

**通过使用等式运算符并比较 null，我们检查分配给变量的对象是否已经初始化**。

## 2. 值相等性
现在让我们关注值相等性测试。**值相等性发生在两个独立的对象恰好具有相同的值或状态时**。

这比较的是值，并且与对象的 equals() 方法密切相关。和之前一样，让我们比较它在原始类型和对象类型中的使用，看看主要的区别。

### 2.1 原始类型与 equals() 方法
正如我们知道的，原始类型是具有单个值的基本类型，并且不实现任何方法。因此，**直接使用原始类型调用 equals() 方法是不可能的**：

```java
int a = 10;
assertTrue(a.equals(10)); // 编译错误
```

然而，由于每个**原始类型都有自己的包装类**，我们可以使用**装箱机制**将其转换为其对象表示形式。然后，我们可以轻松地调用 equals() 方法，就好像我们在使用对象类型一样：

```java
int a = 10;
Integer b = a;

assertTrue(b.equals(10));
```

### 2.2 对象类型与 equals() 方法
让我们回到我们的 Person 类。为了使 equals() 方法正确工作，我们需要通过考虑类中包含的字段来重写自定义类中的方法：

```java
public class Person {
    // 其他字段和方法省略

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }
}
```

首先，equals() 方法返回 true 如果给定的值具有相同的引用，这是通过引用运算符检查的。如果不是，我们开始等式测试。

进一步，我们测试两个值的 Class 对象的等式。如果它们不同，我们返回 false。否则，我们继续检查等式。最后，我们返回分别比较每个属性的组合结果。

现在，让我们修改之前的测试并检查结果：

```java
Person a = new Person("Bob", 20);
Person b = new Person("Mike", 40);
assertFalse(a.equals(b));

Person c = new Person("Bob", 20);
assertTrue(a.equals(c));

Person d = a;
assertTrue(a.equals(d));
```

正如我们所看到的，第二个检查返回 true，与引用等式不同。我们重写的 equals() 方法比较了对象的内部值。

**如果我们没有重写 equals() 方法，将使用父类 Object 的方法。由于 Object.equals() 方法只进行引用等式检查，当比较 Person 对象时，行为可能不是我们期望的。**

虽然我们上面没有展示 hashCode() 方法，但我们应该注意到，每当我们重写 equals() 方法时，重写它以确保这些方法之间的一致性是很重要的。

## 3. 空值等式
最后，让我们检查 equals() 方法如何处理 null 值：

```java
Person a = new Person("Bob", 20);
Person e = null;
assertFalse(a.equals(e));
assertThrows(NullPointerException.class, () -> e.equals(a));
```

当我们使用 equals() 方法对另一个对象进行检查时，根据这些变量的顺序，我们得到两种不同的结果。最后一个语句抛出异常，因为我们在 null 引用上调用了 equals() 方法。为了修复最后一个语句，我们应该首先调用等式运算符检查：

```java
assertFalse(e != null && e.equals(a));
```

现在，条件的左侧返回 false，使整个语句等于 false，防止抛出 NullPointerException。因此，我们必须记住**首先检查我们调用 equals() 方法的值是否为 null**，否则，它可能导致烦人的错误。

此外，从 Java 7 开始，我们可以使用 null 安全的 Objects#equals() 静态方法来执行等式检查：

```java
assertFalse(Objects.equals(e, a));
assertTrue(Objects.equals(null, e));
```

这个辅助方法执行额外的检查以防止抛出 NullPointerException，当两个参数都是 null 时返回 true。

## 4. 结论
在本文中，我们讨论了原始和对象值的引用等式和值等式检查。

要测试引用等式，我们使用 == 运算符。这个运算符对原始值和对象的工作方式略有不同。**当我们用原始值使用等式运算符时，它比较值。另一方面，当我们用它来比较对象时，它检查内存引用。**通过与 null 值进行比较，我们简单地检查对象是否在内存中初始化。

**在 Java 中执行值等式测试，我们使用从 Object 继承的 equals() 方法。原始类型是简单的非类值，因此没有包装就不能调用这个方法。**

我们还需要记住只在实例化的对象上调用 equals() 方法。否则，将抛出异常。为了防止这种情况，如果我们怀疑有 null 值，我们应该用 == 运算符检查该值。

如往常一样，示例的源代码可以在 GitHub 上找到。