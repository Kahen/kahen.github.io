---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Boolean
  - Java
  - Primitive
  - TRUE
head:
  - - meta
    - name: keywords
      content: Java, Boolean, Primitive, TRUE, constant
---
# Java中Boolean.TRUE与true的区别 | Baeldung

## 1. 引言

在Java中，布尔值可以有两种表示形式：Boolean.TRUE，这是Boolean类中定义的一个常量，代表true值；以及原始值true，同样代表true。尽管它们看起来都用于表示布尔值的真，但它们之间存在着微妙的差别，开发者应当了解这些差别。

**在本教程中，我们将阐明这些不同之处，并帮助澄清它们的适当用法。**

## 2. 理解Boolean.TRUE

Boolean.TRUE是Java标准库中Boolean类定义的一个常量。它是一个Boolean包装类的实例，代表true值。

**作为一个对象，我们可以在期望对象引用的场景中使用Boolean.TRUE，例如集合或接受对象参数的方法。**

让我们看这个例子：

```java
List`<Boolean>` booleanList = new ArrayList<>();
booleanList.add(Boolean.TRUE);
boolean isTrue = booleanList.get(0);
assert isTrue;
```

在上面的例子中，我们创建了一个Boolean对象的ArrayList，并向其中添加了Boolean.TRUE。之后，我们使用get()方法检索布尔值，该方法自动将Boolean.TRUE对象拆箱为原始布尔值。

## 3. 理解true

另一方面，true是一个原始布尔值，代表真。它是Java中的两个布尔字面量之一。

**作为一个原始值，与Boolean.TRUE相比，true在内存使用和性能方面更为高效。**

```java
boolean isTrue = true;
if (isTrue) {
    // 执行一些逻辑
}
```

在上面的例子中，我们直接将true值赋给一个布尔变量，并在if语句中使用它，在条件为真时执行某些逻辑。

下面的表格总结了Boolean.TRUE和true之间的主要区别。

| 因素 | Boolean.TRUE | true |
| --- | --- | --- |
| 类型 | Boolean.TRUE是Boolean类的一个对象 | true是一个原始布尔值 |
| 内存和性能 | 作为一个对象，Boolean.TRUE需要额外的内存开销，因为它的对象表示 | 作为一个原始值，true在内存效率和性能上更好 |
| 针对对象的操作 | 由于Boolean.TRUE是一个对象，它可以在期望对象引用的场景中使用，例如集合或方法参数 | 原始true不能在这些场景中使用，如果需要，可以自动装箱为Boolean.TRUE |
| 自动装箱和拆箱 | 我们可以利用拆箱将Boolean.TRUE对象转换为其对应的原始值true。 | 自动装箱允许自动将true转换为Boolean.TRUE，反之亦然 |

## 5. 结论

在本文中，我们讨论了Java中Boolean.TRUE和true的区别，以便正确使用这些表示布尔值真的表示形式。虽然Boolean.TRUE是一个具有额外内存开销的对象，而true是一个提供更好性能的原始值。

**根据上下文和要求，开发者应选择适当的表示形式。**

如常，代码示例可在GitHub上找到。