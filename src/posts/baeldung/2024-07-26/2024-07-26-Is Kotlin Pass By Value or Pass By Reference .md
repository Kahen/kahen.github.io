---
date: 2023-12-05
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Pass-by-Value
  - Pass-by-Reference
head:
  - - meta
    - name: keywords
      content: Kotlin, Pass-by-Value, Pass-by-Reference
---
# Kotlin是按值传递还是按引用传递？

了解Kotlin在按值传递和按引用传递方面的行为对于有效使用该语言至关重要。

在本教程中，我们将探索Kotlin传递参数的行为。我们将通过一系列实际示例来检验按值传递和按引用传递。

**在Kotlin函数中，默认情况下参数是按值传递的，就像Java方法一样**。这意味着参数的值作为函数的参数传递。如果我们在函数内更改参数的值，函数外原始值不会受到影响。这种机制的优点是防止函数外部意外更改。

在测试这种行为之前，重要的是要承认**Kotlin中的参数不能重新赋值**。当我们尝试这样做时，代码将无法编译，如下例所示：

```
fun modifyValue(a: Int) {
    a = 5
}
```

考虑到这一点，让我们定义一个函数，它接受一个_Int_参数，加上10，然后返回结果：

```
private fun modifyValue(value: Int): Int {
    return value + 10
}
```

最后，让我们用单元测试来断言其行为：

```
@Test
fun `Test using pass-by-value`(){
    val num = 5
    val modifiedNum = modifyValue(num)

    assertEquals(5, num)
    assertEquals(15, modifiedNum)
}
```

首先，我们调用_modifyValue()_函数，传递变量_num_。然后我们断言_num_的值保持不变，而_modifiedNum_变量应该具有从函数调用解析得到的值15。

## 3. 按引用传递

**按引用传递是一种函数接收参数的内存地址的行为**，允许访问和修改。

Java和Kotlin总是使用按值传递。**但是，当传递对象或非原始类型时，函数复制引用，模拟按引用传递**。方法内部的更改由于共享引用而影响外部对象。

让我们用一个简单的例子来说明这种行为：

```
data class SomeObj(var x: Int = 0)

private fun modifyObject(someObj: SomeObj) {
    someObj.x = 3
}
```

首先，我们定义了一个数据类_SomeObj_，它有一个属性_x_，类型为_Int_，默认值为0。

然后，我们创建了一个名为_modifyObject()_的函数，它接受一个参数_o_，类型为_SomeObj_。在函数内部，对象_o_的属性_x_的值被更新为3。

为了验证函数内部对对象的更改是否影响外部的原始对象，让我们编写一个单元测试：

```
@Test
fun `Test using pass-by-reference`() {
    val obj = SomeObj()

    assertEquals(0, obj.x) // before modify

    modifyObject(obj)

    assertEquals(3, obj.x) // after modify
}
```

然后，我们断言在调用_modifyObject()_函数之前，_obj_中的_x_仍然是0。

Kotlin和Java都使用相同的内存模型，其中栈存储引用变量，堆存储对象。我们新创建的对象包含对_obj_的引用：

![img](https://www.baeldung.com/wp-content/uploads/sites/5/2023/12/diagram-1.png)

最后，我们调用_modifyObject()_函数，并断言_x_已更改为3。

在我们的内存模型中，我们现在在堆上有两个对象：函数内部的一个和函数外部的一个。当函数内部的对象被创建时，一个新的引用变量被复制到栈上。现在栈上存在两个具有相同值的引用变量：

![img](https://www.baeldung.com/wp-content/uploads/sites/5/2023/12/diagram-2.png)

请注意，当函数调用发生时，_obj_的引用被复制并作为参数发送到_modifyObject()_函数。这与原始的按引用传递不同，后者参数是原始的引用。

## 4. 并排比较

让我们通过一个表格探索按值传递和按引用传递之间的主要区别，涵盖驱动行为的机制、对原始值的影响以及其常见用法：

| **标准** | **按值传递** | **按引用传递** | **按值传递与引用复制** |
| --- | --- | --- | --- |
| 机制 | 将参数的值传递到函数中 | 将对象引用或内存地址传递到函数中 | 复制对象引用的值并以值的形式传递 |
| 原始值变化 | 不影响原始值 | 可能会影响原始值 | 外部可见变化 |
| 安全性 | 避免函数外部的意外错误或不想要的值更改 | 函数外部可能发生意外的更改 | 通过不影响原始值提供安全性 |
| 可预测性 | 预测函数行为更容易 | 代码可能导致意外行为 | 通过保持原始值的独立性增强可预测性 |

## 5. 结论

在本文中，我们展示了**Kotlin默认对原始类型的函数参数使用按值传递**。我们还观察到**对于对象和非原始类型，在Java和Kotlin中，我们有按值传递与引用复制**，其行为类似于按引用传递。

在Kotlin中，我们必须意识到我们的函数是处理原始还是非原始参数，以理解哪种行为被应用。

如常，完整的源代码可以在GitHub上找到。

![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)

OK