---
date: 2022-04-01
category:
  - Java
tag:
  - 布尔变量
  - 取反
head:
  - - meta
    - name: keywords
      content: Java, 布尔变量, 取反, XOR, NOT
---
# Java中切换布尔变量

布尔是Java中的基本数据类型。通常，它只能有两个值，_true_或_false_。

在本教程中，我们将讨论如何切换给定布尔变量的值。

## 2. 问题介绍

这个问题相当直接。简单来说，我们想要反转布尔变量的值。例如，切换后_true_变为_false_。

然而，**我们应该注意Java中有两种“不同”的布尔类型，原始的_boolean_和包装的_Boolean_。** 因此，理想的切换方法应该适用于两种类型。

在本教程中，我们将讨论如何实现这样的方法。

另外，为了简单起见，我们将使用单元测试断言来验证我们的实现是否符合预期。

那么，接下来，让我们从切换原始_boolean_变量开始，这是我们最终_toggle()_方法的基础。

## 3. 切换原始_boolean_变量

**切换原始_boolean_变量最直接的方法就是使用NOT运算符( _!_)。**

让我们创建一个测试来看看它是如何工作的：

```java
boolean b = true;
b = !b;
assertFalse(b);

b = !b;
assertTrue(b);
```

如果我们运行这个测试，它会通过。因此，每次我们对一个_boolean_变量执行NOT运算符，它的值就会被反转。

或者，XOR运算符( _^_)也可以反转布尔值。在考虑实现之前，让我们快速了解一下XOR运算符是如何工作的。

**给定两个_boolean_变量_b1_和_b2_，_b1 ^ b2_只有在_b1_和_b2_的值不同时才为_true_**，例如：

- _true ^ true = false_
- _false ^ false = false_
- _true ^ false = true_

因此，我们可以利用XOR的特性，执行_b ^ true_来反转_b_的值：

- _b = true -> b ^ true_变为_true ^ true = false_
- _b = false -> b ^ true_变为_false ^ true = true_

现在我们理解了XOR的逻辑，将其翻译成Java代码对我们来说并不是一个挑战：

```java
boolean b = true;
b ^= true;
assertFalse(b);

b ^= true;
assertTrue(b);
```

当我们运行测试时，它不出所料地通过了。

## 4. 创建_toggle()_方法

我们已经看到原始_boolean_变量只能有两个值：_true_和_false_。然而，与原始_boolean_不同，**包装的_Boolean_变量可以持有_null_值。**

Java在执行NOT或XOR操作时会自动将_Boolean_拆箱为_boolean_。但如果我们没有正确处理_null_情况，我们将遇到_NullPointerException_：

```java
assertThatThrownBy(() -> {
    Boolean b = null;
    b = !b;
}).isInstanceOf(NullPointerException.class);
```

如果我们执行上述测试，它会通过。不幸的是，这意味着执行!b时会发生_NullPointerException_。

那么接下来，让我们创建一个null安全的_toggle()_方法，用于处理_Boolean_和_boolean_变量：

```java
static Boolean toggle(Boolean b) {
    if (b == null){
        return b;
    }
    return !b;
}
```

在这里，我们首先进行null检查，然后使用NOT运算符来反转值。当然，如果我们喜欢，在null检查之后，我们也可以使用XOR方法来反转_b_的值。

最后，让我们创建一个测试来验证我们的_toggle()_方法是否适用于所有情况：

```java
// 包装的Boolean
Boolean b = true;
b = ToggleBoolean.toggle(b);
assertFalse(b);

b = ToggleBoolean.toggle(b);
assertTrue(b);

b = null;
b = ToggleBoolean.toggle(b);
assertNull(b);

// 原始的boolean
boolean bb = true;
bb = ToggleBoolean.toggle(bb);
assertFalse(bb);
bb = ToggleBoolean.toggle(bb);
assertTrue(bb);
```

正如上述测试所示，我们用_Boolean_变量和_boolean_变量测试了_toggle()_方法。此外，我们还测试了_Boolean_变量_b=null_的情况。

当我们执行测试时，测试通过了。因此，我们的_toggle()_方法按预期工作。

## 5. 结论

在本文中，我们学习了如何构建一个null安全的切换给定_boolean/Boolean_变量的方法。

如往常一样，与本文相关的代码可以在GitHub上找到。