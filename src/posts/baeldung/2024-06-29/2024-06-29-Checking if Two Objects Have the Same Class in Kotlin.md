---
date: 2022-11-01
category:
  - Kotlin
  - Reflection
tag:
  - Kotlin
  - Reflection
  - Class Equality
head:
  - - meta
    - name: keywords
      content: Kotlin, Reflection, Class Equality, Comparison
---
# Kotlin中检查两个对象是否具有相同类的多种方法

在软件开发中，检查对象是否具有相同类用于多种目的，例如类型检查、多态性、反射、错误处理等。

在本教程中，我们将探索确定对象是否属于同一类的几种不同方法。

## 2. 依赖性

在本文中，我们将使用**kotlin-reflect**模块，因此，让我们在_pom.xml_中包含它：

```xml
`<dependencies>`
    `<dependency>`
        `<groupId>`org.jetbrains.kotlin`</groupId>`
        `<artifactId>`kotlin-reflect`</artifactId>`
    `</dependency>`
`</dependencies>`
```

最后，让我们创建一些简单的类来使用：

```kotlin
open class Weapon

open class Sword : Weapon()

open class Bow : Weapon()

class Claymore : Sword()

class LongBow : Bow()
```

注意，我们所有的类都继承自_Weapon_，这为我们稍后的类比较提供了几种选择。

值得一提的是，虽然我们为演示创建了自己的类，但我们将探索的反射技术适用于我们在Kotlin中遇到的任何类。

## 3. 类字面量

导入一切之后，我们现在可以看看一种检查对象是否为同一类最简单的方法：通过它们的类引用。我们将使用对象的_KClass_，即Kotlin类引用，来检查等式。

让我们先编写一个简单的测试。我们将创建同一类的两个实例，然后**我们可以使用双冒号操作符获得类引用**：

```kotlin
@Test
fun `剑和弓都是武器`() {
    val sword = Weapon()
    val bow = Weapon()

    assertEquals(sword::class, bow::class)
    assertThat(sword::class).isEqualTo(bow::class)

    assertThat(sword).isInstanceOf(Weapon::class.java)
    assertInstanceOf(Weapon::class.java, sword)
}

```

在上面的语句中，我们已经验证了两个实例具有相同的类引用，并且它们是_Weapon_类的实例，使用了AssertJ提供的方法。

测试将通过，从而确认_sword_和_bow_都引用并是_Weapon_类的实例。

## 4. 访问和转换类型

使用**_KClass_可以让我们访问多个属性，允许我们确定创建的实例是否共享一个公共基类**。我们甚至可以使用这个类引用来访问常规的Java类引用。

### 4.1. Java类引用

正如提到的，Kotlin的_KClass_可以在运行时转换为Java的_Class_，反之亦然。尽管它们具有相同的包和名称，但当这些类进行比较时，它们并不相等：

```kotlin
@Test
fun `Kotlin的武器类不是Java的武器类`() {
    assertEquals("class com.baeldung.compare.kclass.Weapon", Weapon::class.toString())
    assertEquals("class com.baeldung.compare.kclass.Weapon", Weapon::class.java.toString())

    assertNotEquals(Weapon::class, Weapon::class.java)
}
```

### 4.2. 在_KClass_和_Class_之间转换

值得一提的是，当使用不同类的实例时，我们可以利用几个属性进行比较。为了演示，我们将使用_javaClass_和_javaClass.kotlin_属性：

```kotlin
@Test
fun `使用javaClass和kotlin属性进行等式比较`() {
    val sword = Weapon()
    val bow = Weapon()

    assertEquals("class com.baeldung.compare.kclass.Weapon", sword.javaClass.toString())
    assertEquals("class com.baeldung.compare.kclass.Weapon", bow.javaClass.kotlin.toString())

    assertEquals(sword.javaClass, bow.javaClass)
    assertEquals(sword.javaClass.kotlin, bow.javaClass.kotlin)
}
```

在内部，当使用_javaClass_扩展属性时，它会调用_getClass()_方法，该方法反过来返回一个Java _Class_。然而，当使用_javaClass.kotlin_时，我们将再次获得Kotlin _KClass_。

正如前一个例子中使用_class.java_时一样，**_javaClass_引用将不等于_javaClass.kotlin_引用**：

```kotlin
@Test
fun `比较武器类的javaClass和kotlin属性`() {
    val sword = Weapon()
    val bow = Weapon()

    assertNotEquals(sword.javaClass, bow.javaClass.kotlin)
}
```

## 5. 处理继承

当处理继承时，我们可以使用_KClass_属性和方法来比较子类和超类：

```kotlin
@Test
fun `不同的武器间接继承自武器类`() {
    val weapons = listOf(Sword(), Claymore(), Bow(), LongBow())

    assertThat(weapons).allMatch { it::class.allSuperclasses.contains(Weapon::class) }
    assertThat(weapons).allMatch { it::class.isSubclassOf(Weapon::class) }

    assertEquals(weapons, weapons.filter { it::class.allSuperclasses.contains(Weapon::class) })
}
```

根据上述测试，我们已经证明了_weapons_列表中的所有项目都继承自_Weapon_类。

要验证我们的_weapons_列表的直接超类，我们使用_superclasses_属性：

```kotlin
@Test
fun `不同的武器直接继承自武器类`() {
    val weapons = listOf(Sword(), Claymore(), Bow(), LongBow())

    assertThat(weapons).anyMatch { it::class.superclasses.contains(Weapon::class) }

    assertNotEquals(weapons, weapons.filter { it::class.superclasses.contains(Weapon::class) })
}
```

结果，只有_Sword_和_Bow_直接继承自_Weapon_类。

此外，我们可以反过来检查，_Weapon_类是否是我们的武器的超类：

```kotlin
@Test
fun `武器类是我们不同武器的超类`() {
    val weapons = listOf(Sword(), Claymore(), Bow(), LongBow())

    assertThat(weapons).allMatch { Weapon::class.isSuperclassOf(it::class) }
}
```

## 6. _is_ 运算符

使用_is_运算符相当直接，这使其成为检查对象是否在继承树中具有相同类的一种最简单的方法。我们可以使用这个运算符来获取一个布尔值，指示一个对象是否是一个类的实例：

```kotlin
@Test
fun `不同的剑都是武器`() {
    val weapon = Weapon()
    val sword = Sword()
    val claymore = Claymore()

    assertThat(weapon is Weapon).isTrue()
    assertThat(sword is Weapon).isTrue()
    assertThat(claymore is Weapon).isTrue()
}
```

Kotlin中的_is_运算符类似于Java的_instanceof_关键字，用于测试对象的类层次结构。

## 7. 结论

在本文中，我们探索了使用几种方法比较对象类的多种方式。

首先，我们看到了类字面量如何帮助我们确定两个对象是否引用相同的类。

然后，我们探索了使用不同类属性的其他方法，允许我们比较Java类和Kotlin类，反之亦然。我们还发现了如何确定类是否共享公共子类或超类。

最后，我们用_is_运算符将它们整合在一起，使我们能够直接检查一个对象是否引用与另一个相同的类，包括任何继承的类。

如常，这些示例的完整实现可以在GitHub上找到。