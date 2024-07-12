---
date: 2022-11-01
category:
  - Kotlin
  - Design Patterns
tag:
  - Visitor Pattern
  - Kotlin
head:
  - - meta
    - name: keywords
      content: Kotlin, 设计模式, 访问者模式
---
# Kotlin中的访问者模式

设计模式是软件开发中的一个重要概念，用于解决反复出现的问题。访问者模式正是这些模式之一。我们使用它来将算法与它操作的对象结构分离。当我们要向现有类添加新功能而无需修改它们的源代码时，这种模式特别有用。

在本教程中，我们将讨论访问者模式以及如何在Kotlin中实现它。

## 定义
根据定义，访问者设计模式是一种行为设计模式，它允许我们向现有类添加新操作，而无需修改其结构。**当我们拥有一个复杂的对象结构并希望在该结构上执行不同的操作时，我们会使用这种模式。**

此外，这种模式定义了两个主要组件：_访问者_和_可访问的_。_访问者_负责定义一个接口，其中包含每个_可访问的_对象的_visit_方法，而_可访问的_负责接受_访问者_。这通常是通过一个_accept_方法完成的。

### 2.1. 它解决的问题
访问者模式旨在解决在不改变现有结构的情况下向对象结构添加新操作的问题。通常，将新操作纳入类层次结构需要修改已经存在的类。然而，这种方法可能并不总是可行或实用的。

因此，**访问者模式引入了一个访问者类，它可以遍历现有的对象结构并执行所需的操作**。最终，这使得系统更加适应性强和可扩展。

为了演示我们如何在Kotlin中实现访问者模式，让我们考虑一个简单的购物车应用程序。这个应用程序只有一个角色：计算购物车中商品的总价格。

具体来说，这个应用程序有两个类：_Listing_和_Cart_类。_Listing_类代表购物车中的一个带有价格的商品，而_Cart_类代表购物车并包含所有列表。

**正如前面提到的，要实现这种设计模式，我们需要创建一个访问者接口，为对象层次结构中的每个类提供一个_visit_方法**。在我们的例子中，我们有两个类，所以我们需要两个_visit_方法。

### 3.1. 访问者接口及其实现
让我们编写我们的访问者接口，它定义了两个_visit_方法，一个用于_Listing_类，另一个用于_Cart_类：

```kotlin
interface ShoppingCartVisitor {
    fun visit(listing: Listing): Double
    fun visit(cart: Cart): Double
}
```

这个接口为我们打算在其上执行某些操作的对象结构中的每个类提供了_visit_方法。

此外，我们需要一个具体的访问者类来实现我们的访问者接口：

```kotlin
class ShoppingCartVisitorImpl : ShoppingCartVisitor {
    override fun visit(listing: Listing): Double {
        return listing.price
    }

    override fun visit(cart: Cart): Double {
        var totalPrice = 0.0
        for (listing in cart.listings) {
            totalPrice += listing.accept(this)
        }
        return totalPrice
    }
}
```

在这段代码片段中，_ShoppingCartVisitorImpl_类实现了我们的_ShoppingCartVisitor_接口，并为_visit_方法提供了具体的实现。

访问一个_Listing_只返回其价格，而访问一个_Cart_则遍历购物车中的所有列表，对每一个调用_accept()_方法。我们将在下一步实现这两个对象的_accept()_方法。

值得注意的是，访问者类负责处理在购物车中添加每个列表价格的复杂任务，同时**确保我们的对象结构中的任对象都不知晓此操作**。

### 3.2. 可访问的接口及其实现
_Listing_和_Cart_类构成了我们的可访问类。由于它们必须实现_accept()_方法，让我们定义一个_Visitable_接口：

```kotlin
interface Visitable {
    fun accept(visitor: ShoppingCartVisitor): Double
}
```

现在，让我们定义我们的_Listing_和_Cart_类：

```kotlin
class Listing(val name: String, val price: Double): Visitable {
    override fun accept(visitor: ShoppingCartVisitor): Double {
        return visitor.visit(this)
    }
}
```

```kotlin
class Cart: Visitable {
    val listings = mutableListOf`<Listing>`()

    fun addListing(listing: Listing) {
        listings.add(listing)
    }

    fun removeListing(listing: Listing) {
        listings.remove(listing)
    }

    override fun accept(visitor: ShoppingCartVisitor): Double {
        return visitor.visit(this)
    }
}
```

在上面的代码中，_Listing_和_Cart_类是**可访问的类，负责接受访问者**。因此，它们需要**实现适当的_accept()_方法**，这将作为访问者类的锚点。

最后，_accept()_方法将调用访问者上的适当方法，这有助于计算每个列表的价格以及购物车中内容的总价格。

### 3.3. 测试
接下来，我们需要通过使用访问者来计算购物车的总价格来测试我们的应用程序：

```kotlin
@Test
fun `test shopping cart visitor`() {
    val cart = Cart()
    cart.addListing(Listing("Listing 1", 10.0))
    cart.addListing(Listing("Listing 2", 20.0))
    cart.addListing(Listing("Listing 3", 30.0))

    val visitor = ShoppingCartVisitorImpl()
    val totalPrice = cart.accept(visitor)

    assertEquals(60.0, totalPrice)
 }
```

在上面的单元测试中，我们创建了一个带有三个列表的购物车。然后，我们创建了一个访问者，并使用_accept()_方法计算购物车的总价格。最后，我们断言总价格等于预期值。

## 4. 结论
在本文中，我们论了Kotlin中的访问者模式以及如何使用一个简单的购物车应用程序来实现它。我们看到，通过使用这种模式，我们可以在不修改现有类的结构或源代码的情况下向现有类添加功能。

和往常一样，本文的代码示例可以在GitHub上找到。