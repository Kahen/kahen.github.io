---
date: 2024-06-22
category:
  - Java
  - 编程
tag:
  - 可变对象
  - 不可变对象
head:
  - - meta
    - name: keywords
      content: Java, 可变对象, 不可变对象, 线程安全, 代码设计
---

# Java中的可变对象与不可变对象

1. 引言

在Java中使用对象时，理解可变对象（mutable objects）和不可变对象（immutable objects）之间的区别至关重要。这些概念影响您的Java代码的行为和设计。

在本教程中，我们将探讨可变和不可变对象的定义、示例、优势和考虑因素。

不可变对象是指一旦创建后其状态就无法改变的对象。一旦不可变对象被实例化，其值和属性在其生命周期内保持不变。

让我们探索Java中一些内置的不可变类的示例。

2.1. String类

Java中String的不可变性确保了线程安全性，增强了安全性，并通过String Pool机制帮助高效使用内存。

```java
@Test
public void givenImmutableString_whenConcatString_thenNotSameAndCorrectValues() {
    String originalString = "Hello";
    String modifiedString = originalString.concat(" World");

    assertNotSame(originalString, modifiedString);

    assertEquals("Hello", originalString);
    assertEquals("Hello World", modifiedString);
}
```

在这个示例中，concat()方法创建了一个新的String，原始的String保持不变。

2.2. Integer类

在Java中，Integer类是不可变的，这意味着一旦它们被设置，其值就不能被改变。然而，当您对一个Integer执行操作时，会创建一个新的实例来保存结果。

```java
@Test
public void givenImmutableInteger_whenAddInteger_thenNotSameAndCorrectValue() {
    Integer immutableInt = 42;
    Integer modifiedInt = immutableInt + 8;

    assertNotSame(immutableInt, modifiedInt);

    assertEquals(42, (int) immutableInt);
    assertEquals(50, (int) modifiedInt);
}
```

这里，+操作创建了一个新的Integer对象，原始对象保持不可变性。

2.3. 不可变对象的优势

Java中的不可变对象提供了几个优势，有助于提高代码的可靠性、简洁性和性能。让我们了解使用不可变对象的一些好处：

- **线程安全**：不可变性天生确保线程安全。由于不可变对象的状态在创建后不能被修改，它可以在多个线程之间安全共享，无需显式同步。这简化了并发编程，并减少了竞态条件的风险。
- **可预测性和调试**：不可变对象的恒定状态使代码更加可预测。一旦创建，不可变对象的值就保持不变，简化了对代码行为的推理。
- **促进缓存和优化**：不可变对象可以轻松地被缓存和重用。一旦创建，不可变对象的状态不会改变，允许有效的缓存策略。

因此，开发者可以在Java应用程序中使用不可变对象来设计更强大、可预测和高效的系统。

3. 创建不可变对象

要创建一个不可变对象，让我们考虑一个名为ImmutablePerson的类示例。该类被声明为final以防止扩展，并且它包含没有setter方法的private final字段，遵循不可变性的原则。

```java
public final class ImmutablePerson {
    private final String name;
    private final int age;

    public ImmutablePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

现在，让我们考虑当我们尝试修改ImmutablePerson实例的名称时会发生什么：

```java
ImmutablePerson person = new ImmutablePerson("John", 30);
person.setName("Jane");

```

尝试修改ImmutablePerson实例的名称将导致编译错误。这是因为该类被设计为不可变的，没有setter方法允许在实例化后更改其状态。

**缺少setter和将类声明为final确保了对象的不可变性，提供了一种清晰和健壮的方式来处理其生命周期内的恒定状态。**

4. 可变对象

**Java中的可变对象是可以在其创建后修改其状态的实体。** 这种可变性引入了可改变的内部数据的概念，允许在对象的生命周期内更改值和属性。

让我们探索一些示例来理解它们的特性。

4.1. StringBuilder类

Java中的StringBuilder类表示一个可变的字符序列。与它的不可变对应物String不同，StringBuilder允许动态修改其内容。

```java
@Test
public void givenMutableString_whenAppendElement_thenCorrectValue() {
    StringBuilder mutableString = new StringBuilder("Hello");
    mutableString.append(" World");

    assertEquals("Hello World", mutableString.toString());
}
```

这里，append方法直接改变了StringBuilder对象的内部状态，展示了它的可变性。

4.2. ArrayList类

ArrayList类是另一个可变对象的例子。它表示一个可以增长或缩小的动态数组，允许添加和删除元素。

```java
@Test
public void givenMutableList_whenAddElement_thenCorrectSize() {
    List`<String>` mutableList = new ArrayList<>();
    mutableList.add("Java");

    assertEquals(1, mutableList.size());
}
```

add方法通过添加一个元素来修改ArrayList的状态，展示了其可变特性。

4.3. 考虑因素

虽然可变对象提供了灵活性，但它们带来了开发者需要留意的某些考虑因素：

- **线程安全**：可变对象可能需要额外的同步机制来确保多线程环境中的线程安全。如果没有适当的同步，同时修改可能导致意外行为。
- **代码理解的复杂性**：修改可变对象内部状态的能力引入了代码理解的复杂性。开发者需要谨慎对待对象状态的潜在变化，特别是在大型代码库中。
- **状态管理挑战**：管理可变对象的内部状态需要仔细考虑。开发者应该跟踪和控制变化，以确保对象的完整性并防止意外修改。

尽管有这些考虑因素，可变对象提供了一种动态和灵活的方法，允许开发者根据不断变化的需求调整对象的状态。

5. 可变对象与不可变对象

当对比可变和不可变对象时，有几个因素需要考虑。让我们探索这两种类型对象之间的根本区别：

| 标准 | 可变对象 | 不可变对象 |
| --- | --- | --- |
| **可修改性** | 创建后可以更改 | 一旦创建就保持不变 |
| **线程安全** | 可能需要同步以确保线程安全 | 天生线程安全 |
| **可预测性** | 可能在理解上引入复杂性 | 简化推理和调试 |
| **性能影响** | 可能因同步而影响性能 | 通常对性能有积极影响 |

5.1. 选择可变性与不可变性

选择可变性和不可变性取决于应用程序的需求。**如果需要适应性和频繁更改，请选择可变对象。然而，如果一致性、安全性和稳定状态是优先考虑的，不可变性是正确的选择。**

考虑多任务场景中的并发性。**不可变性简化了任务之间的数据共享，而无需同步的复杂性。**

此外，评估应用程序的性能需求。虽然不可变对象通常提高性能，但权衡这种提升是否比可变对象提供的灵活性更重要，特别是在数据更改不频繁的情况下。

保持正确的平衡确保您的代码有效地与应用程序的需求对齐。

6. 结论

总之，Java中选择可变和不可变对象在塑造代码的可靠性、效率和可维护性方面起着关键作用。**虽然不可变性提供了线程安全、可预测性和其他优势，但可变性提供了灵活性和动态状态变化。**

评估应用程序的需求，并考虑并发性、性能和代码复杂性等因素，将有助于为设计有弹性和高效的Java应用程序做出适当的选择。

您可以在GitHub上找到本文中使用的所有示例。

OK