---
date: 2024-06-26
category:
  - Kotlin
  - Reflection
tag:
  - Kotlin
  - Reflection
  - Field Names
head:
  - - meta
    - name: keywords
      content: Kotlin, Reflection, Field Names, 获取类字段名
---
# 使用 Kotlin 反射获取类的所有字段名

在 Kotlin 中，反射允许我们在运行时动态地检查、操作和与类、字段和方法交互。作为开发者，我们有时需要动态地检索类的字段名称。

在本教程中，我们将探讨使用 Kotlin 反射获取类所有字段名称的各种技术。

## 1. 使用 _members_ 属性

我们获取类所有字段名称的第一种方法涉及使用 _KClass_ 的 _members_ 属性。这返回类的所有成员的列表，包括字段和方法。**我们可以过滤这些成员以仅提取属性**：

```kotlin
fun getAllFieldNamesUsingMembersProperty(clazz: KClass`````<*>`````): List````<String>```` {
    return clazz.members
      .filter { it is KProperty`````<*>````` }
      .map { it.name }
}
```

在这种方法中，我们使用 _KClass_ 的 _members_ 属性来检索其所有成员。然后，我们使用 _name_ 属性将每个成员或属性映射到其名称。这将产生一个包含类中所有字段名称的列表。

为了演示这些技术，我们将使用这个 _TestClass_ 以及一个抽象的 _Identifiable_ 基类进行测试：

```kotlin
abstract class Identifiable(open val id: Int)
class TestClass(val name: String, val age: Int, override val id: Int): Identifiable(id)
```

现在，让我们测试我们的辅助方法的正确性：

```kotlin
@Test
fun `使用 members 方法获取所有字段名称`() {
    val fieldNames = getAllFieldNamesUsingMembersProperty(TestClass::class)

    assertEquals(listOf("age", "id", "name"), fieldNames)
}
```

值得注意的是，我们使用这种方法检索了 _TestClass_ 和 _Identifiable_ 中声明的所有字段。

## 3. 使用 _memberProperties_ 属性

这种方法与第一种方法类似，但我们不是使用 _KClass_ 类的 _members_ 属性，而是使用 _KClass_ 的 _memberProperties_ 属性。**这个属性允许我们直接访问类中声明的字段，跳过其他类属性，如函数**：

```kotlin
fun getAllFieldNamesUsingClassMemberProperties(clazz: KClass`````<*>`````): List````<String>```` {
    return clazz.memberProperties
      .map { it.name }
}
```

我们使用 _memberProperties_ 属性检索类中的所有属性。类似地，然后我们使用 _name_ 属性将每个属性映射到其名称。最后，我们获得一个包含类中所有可访问字段名称的列表。

让我们测试这种方法：

```kotlin
@Test
fun `使用 Class members 属性获取所有字段名称`() {
    val fieldNames = getAllFieldNamesUsingClassMemberProperties(TestClass::class)

    assertEquals(listOf("age", "id", "name"), fieldNames)
}
```

我们的测试显示了如何使用我们的辅助方法检索 Kotlin 类的所有字段名称。

## 4. 使用 _declaredMemberProperties_ 属性

Kotlin 的反射 API 为我们提供了 _declaredMemberProperties_ 属性，我们可以使用它来获取类的所有字段名称。**这个属性返回直接在 Kotlin 类中声明的所有属性的集合**：

```kotlin
fun getAllFieldNamesUsingDeclaredMemberPropertiesMethod(clazz: KClass`````<*>`````): List````<String>```` {
    return clazz.declaredMemberProperties
      .map { it.name }
}
```

这个辅助方法以 _KClass_ 作为输入，并返回属于该类的字段名称列表。我们使用 Kotlin 的反射 API 访问提供的类的 _declaredMemberProperties_ 属性，它检索了类内声明的所有属性。最后，我们再次使用 _name_ 属性将每个属性映射到其名称。这将产生一个包含类中所有字段名称的列表：

```kotlin
@Test
fun `使用 declaredMemberProperties 方法获取所有字段名称`() {
    val fieldNames = getAllFieldNamesUsingDeclaredMemberPropertiesMethod(TestClass::class)

    assertEquals(listOf("age", "id", "name"), fieldNames)
}
```

在这个特定的例子中，我们仍然收到了相同的属性列表，因为 _id_ 属性仍然在 _TestClass_ 中声明。接下来，我们将看一个抽象属性不在基类上声明的例子。

## 5. _declaredMemberProperties_ 和 _memberProperties_ 之间的区别

虽然 _declaredMemberProperties_ 和 _memberProperties_ 都对在 Kotlin 的反射 API 中获取类的属性很有用，但理解它们之间的区别非常重要。

_declaredMemberProperties_ 属性仅检索在类中显式声明的属性。**它不包括从父类继承的属性**。

另一方面，_memberProperties_ 属性检索与类关联的所有属性，包括继承的属性。

为了说明这种区别，让我们考虑 _Person_ 类及其父类 _Human_：

```kotlin
open class Human(val gender: String)

class Person(val name: String, val age: Int): Human("male")
```

_Human_ 类声明了一个单一的属性 _gender_，而 _Person_ 类从 _Human_ 类继承并声明了两个额外的属性，_name_ 和 _age_。**我们故意不在 _Person_ 上声明 _gender_ 属性**：

```kotlin
fun `显示 declaredMemberProperties 和 memberProperties 属性之间的区别`() {
    val declaredProperties = getAllFieldNamesUsingDeclaredMemberPropertiesMethod(Person::class)
    val allProperties = getAllFieldNamesUsingClassMemberProperties(Person::class)

    assertEquals(listOf("age", "name"), declaredProperties)
    assertEquals(listOf("age", "name", "gender"), allProperties)
}
```

我们观察到 _declaredMemberProperties_ 仅检索 _Person_ 类内声明的属性（_name_ 和 _age_），而 _memberProperties_ 包括从 _Human_ 超类继承的属性 _gender_。

## 6. 使用 Java 的反射

最后，我们也可以直接从 Kotlin 使用 Java 反射。_Class.getDeclaredFields()_ 属性是 Java 反射 API 的一部分，我们可以使用它来在 Kotlin 中获取类的字段名称。**这是因为 Kotlin 与 Java 无缝互操作**：

```kotlin
fun getAllFieldNamesUsingJavaReflection(clazz: KClass`````<*>`````): List````<String>```` {
    return clazz.java.declaredFields
      .map { it.name }
}
```

我们从原始的 _KClass_ 访问 Java _Class_。接下来，我们使用 _getDeclaredFields()_ 方法检索类中的所有字段。最后，我们使用 _name_ 属性将每个字段映射到其名称。

让我们测试这种方法：

```kotlin
@Test
fun `使用 java 反射 API 获取所有字段名称`() {
    val fieldNames = getAllFieldNamesUsingJavaReflection(TestClass::class)

    assertEquals(listOf("name", "age", "id"), fieldNames)
}
```

## 7. 结论

在本文中，我们学习了如何使用不同的技术在 Kotlin 中使用反射来获取类的所有字段名称。我们使用了 Kotlin 原生反射 API 中的 _KClass_ 属性，如 _members_、_memberProperties_ 和 _declaredMemeberProperties_。最后，我们看到了 Kotlin 如何通过 _getDeclaredFields()_ 方法与 Java 的反射 API 无缝互操作以实现相同的目标。

每种方法都有其优点和限制。在选择合适的方法之前，我们必须考虑我们的用例和需求。总的来说，Kotlin 的反射 API 提供了一个令人难以置信的工具，使我们能够在运行时检查、操作和与类交互，这在许多场景中都非常有用。

像往常一样，本文的代码示例可以在 GitHub 上找到。