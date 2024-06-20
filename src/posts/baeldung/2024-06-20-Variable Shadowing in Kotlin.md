---
date: 2024-06-20
category:
  - Kotlin
tag:
  - Variable Shadowing
  - Programming
head:
  - - meta
    - name: keywords
      content: Kotlin, Variable Shadowing, Programming
---
# Kotlin中的变量遮蔽

在Kotlin中，每个在作用域内声明的变量都会遮蔽作用域外同名的变量。这适用于所有作用域级别，例如函数内、类内或代码块中。

有时，变量遮蔽是有用的——例如，用于将我们的代码与系统的其他部分隔离。然而，对于不熟悉它的人来说，这可能会造成混淆。尽管Kotlin允许这样做，但它强烈建议尽可能避免使用遮蔽。如果我们使用像IntelliJ IDEA这样的IDE，我们将很容易发现为我们突出显示的警告。

在本教程中，**我们将讨论一些在Kotlin中可能发生遮蔽的情况。**

### 类成员变量遮蔽
这种情况发生在我们有一个类的成员变量，然后我们在函数作用域或代码块内创建了另一个同名的变量：

```kotlin
class Car {
    val speed: Int = 100

    fun upSpeed(): Int {
        val speed = speed * 2
        return speed
    }
}

assertEquals(100, Car().speed)
assertEquals(200, Car().upSpeed())
```

例如，`Car`类有一个初始值为100的`speed`属性。然后，我们有一个`upSpeed()`函数，在函数内将局部`speed`值翻倍，但不会改变`Car`对象的`speed`属性值。

`upSpeed()`函数中的局部变量`speed`导致局部变量覆盖（遮蔽）`Car`类的`speed`变量。因此，当在`upSpeed()`函数中使用`speed`时，访问的是局部变量，而不是`Car`对象的`speed`属性。

为了避免遮蔽，我们可以在`upSpeed()`函数中使用变量名`newSpeed`：

```kotlin
fun upSpeed(): Int {
    val newSpeed = speed * 2 // 使用新变量名以避免遮蔽
    return newSpeed
}
```

除非我们实际上想要访问`Car`类中的`speed`，在这种情况下，我们应该使用`this`关键字以明确：

```kotlin
fun upSpeed(): Int {
    return this.speed * 2
}
```

在这里，我们使用`this`关键字访问`speed`字段。

### 参数遮蔽
参数遮蔽可能发生在我们声明一个函数参数，其名称与封闭作用域中的变量或参数名称相同：

```kotlin
fun calculateTotalPrice(discount: Int) {
    val discount = discount + 10 // 遮蔽参数 'discount'
    // ...
}
```

在函数中，我们有一个局部`discount`变量，其值是将10加到接收到的`discount`参数值的结果。这导致`discount`参数被同名的局部变量遮蔽。

这可能会造成混淆和潜在的错误，如果我们不小心的话。我们应该避免像这样的情况下的遮蔽：

```kotlin
fun calculateTotalPrice(discount: Int) {
    val updatedDiscount = discount + 10 // 使用新变量名以避免遮蔽
    // ...
}
```

使用不同的变量名是一个好主意，以防止潜在的错误并使代码更容易理解。

### 局部变量遮蔽
在Kotlin中，每个在作用域内声明的变量都会遮蔽作用域外同名的变量。因此，在嵌套函数中，它也会发生：

```kotlin
val price = 100 // 局部变量
val discountRate = 0.1

fun applyDiscount(price: Int): Double { // 嵌套函数，参数名为 'price'
    val discountRate = 0.2  // 遮蔽外部变量 discountRate
    return price * (1 - discountRate) // 这里的 'price' 指的是参数，而不是外部变量
}

assertEquals(80.0, applyDiscount(price))
```

`applyDiscount()`嵌套函数有一个名为`discountRate`的局部变量，值为0.2。这在嵌套函数的作用域内遮蔽了外部`discountRate`变量（值为0.1）。

为了避免遮蔽，只需在`applyDiscount()`中为折扣率变量选择一个不同的名称。例如，让我们使用`innerDiscountRate`：

```kotlin
fun applyDiscount(price: Int): Double {
    val innerDiscountRate = 0.2 // 使用不同的名称以避免遮蔽
    return price * (1 - innerDiscountRate)
}
```

如果内部函数确实需要来自外部作用域的折扣率，我们可以直接访问它，而不需要引入一个单独的变量：

```kotlin
fun applyDiscount(price: Int): Double {
    return price * (1 - discountRate) // 直接使用外部的 discountRate
}
```

这样看起来更合理，减少了混淆。

变量遮蔽也可以在循环中发生，当我们在循环中声明一个变量作为迭代器，并且它与循环外的变量具有相同的名称时：

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
for (number in numbers) {
    val number = number * 2 // 遮蔽循环变量 'number'
    // ...
}
```

例如，在循环内部，我们有一个局部变量`number`，它覆盖了同名的循环变量。在这种情况下，局部变量`number`经历了循环变量的遮蔽。

这也会造成混淆。如果我们改为使用类似`newNumber`的名称会更好：

```kotlin
for (number in numbers) {
    val newNumber = number * 2
    // ...
}
```

我们使用`newNumber`变量来存储乘法的结果，避免了遮蔽问题。

### 扩展函数遮蔽
在Kotlin中，我们可以向内置数据类型添加扩展，并赋予它们与内置函数相同的名称。然而，扩展函数将根据上下文被调用：

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
// ...
assertEquals(15, numbers.sum())

fun List```<Int>```.sum(): Int { // 遮蔽内置函数 sum()
    var sum = 0
    this.forEach { sum += it * 2 }
    return sum
}

assertEquals(30, numbers.sum())
```

因此，如果我们在`List```<Int>````对象上调用`sum()`，**它将调用我们定义的扩展函数，而不是内置的Kotlin函数**`sum()`。

这与遮蔽有类似的效果，所以我们在使用这种方法时必须小心。

为了避免遮蔽，我们可以使用另一个名称：

```kotlin
fun List```<Int>```.sumByTwo(): Int { // 重命名以避免遮蔽
    var sum = 0
    this.forEach { sum += it * 2 }
    return sum
}
```

或者，我们可以直接使用`sumOf()`函数，然后在lambda内部修改它：

```kotlin
val doubledSum = numbers.sumOf { it * 2 } // 在sumOf中修改lambda
assertEquals(30, doubledSum)
```

是的，我们已经减少了混淆，我们的代码看起来更简单，更有表现力。

### Lambda中的变量遮蔽
Lambda表达式本质上是我们可以将它们视为值的匿名函数。因此，lambda有自己的作用域，以至于在lambda中声明的变量只能从lambda内部访问。然而，lambda可以访问作用域外的变量，这导致了遮蔽的可能性：

```kotlin
val number = 10
val lambda = { number: Int ->
    val number = 1 // Lambda中的局部变量
}
```

Lambda接收的参数也被认为是在其局部作用域内。这些参数可以在lambda体内部被访问和引用。因此，这也允许在lambda中发生参数遮蔽：

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
// ...
var sum = 0

numbers.forEach { number ->
    val number = 0 // 遮蔽值
    sum += number
}

assertEquals(0, sum)
```

例如，在每次迭代中，我们有一个局部变量`number`，它覆盖了lambda参数的`number`变量，导致遮蔽。

为了避免遮蔽，我们需要考虑上下文。如果目标是对所有元素求和，那么我们需要直接将当前元素添加到`sum`：

```kotlin
numbers.forEach { number ->
    sum += number // 直接访问循环中的当前元素
}
```

在这种情况下，每个元素都在循环中直接访问并添加到`sum`变量。

### 顶级函数变量遮蔽
在Kotlin中，我们可以不创建类就编写代码，所以变量遮蔽也可能发生在顶级函数中：

```kotlin
val number = 10 // 顶级变量

fun upNumber(): Int { // 顶级函数
    val number = 20 // 遮蔽顶级变量
    return number
}

assertEquals(20, upNumber())
assertEquals(10, number)
```

这段代码定义了一个值为10的顶级`number`变量。然后，我们有一个`upNumber()`函数，它也定义了一个名为`number`的局部变量，值为20，这导致遮蔽了顶级`number`变量。

解决方案与其他遮蔽情况类似，但**在这种情况下，顶级变量不能使用`this`关键字访问**。

### 结论
在本文中，我们讨论了一些在Kotlin中允许变量遮蔽的情况。虽然有时有点用，但它通常会让代码更难阅读，引入潜在的逻辑错误，并且更难调试。

为了避免它的缺点，通常应该避免使用遮蔽。我们可以依靠我们的IDE警告来帮助我们注意它。

我们还提供了可能的解决方案，比如使用不同的变量名或者如果可能的话使用`this`关键字。

如常，代码示例可以在GitHub上找到。 

OK