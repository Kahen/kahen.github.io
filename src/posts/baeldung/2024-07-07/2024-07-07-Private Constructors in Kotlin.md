---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Private Constructors
head:
  - - meta
    - name: keywords
      content: Kotlin, Private Constructors, Design Patterns, Singleton, Builder, Factory Methods
---
# Kotlin中的私有构造函数

在Java中，私有构造函数有效地阻止了外部代码使用该构造函数创建类的实例。私有构造函数用途广泛，可以用于实现单例和建造者模式等设计模式，以及静态工厂方法。

在这个快速教程中，我们来探索如何在Kotlin中声明私有构造函数。

在Kotlin中，**一个私有构造函数在声明它的类之外是不可见的，无论声明的类是顶级类还是内部/嵌套类。** 换句话说，外部代码无法调用私有构造函数。

私有构造函数由**在构造函数声明前加上private修饰符**来表示。下面的例子可以清楚地说明这一点：

```
class Student private constructor(val name: String, val age: Int) {
    companion object {
        fun createInstance(pair: Pair``<String, Int>``): Student {
            return Student(pair.first.uppercase(), pair.second)
        }
    }
}
```

正如我们在上面的_Student_类中看到的，我们将主构造函数标记为_private_。因此，只能在类内部实例化_Student_。此外，为了使外部代码能够获得_Student_实例，我们在_companion_对象中包含了一个_createInstance()_函数，其功能类似于静态方法。

_createInstance()_函数还接受一个_Pair_对象作为参数来返回一个_Student_。此外，我们在调用私有构造函数时将_name_字符串转换为大写。**这确保了所有_Student_实例都以大写名字一致地初始化。**

现在，让我们尝试使用私有构造函数在类外部创建一个_Student_实例：

```
val kai = Student("Kai", 18)
```

代码将无法编译，编译器会报错说它无法访问私有构造函数：

```
Kotlin: Cannot access '``<init>``': it is private in 'Student'
```

然而，我们可以通过向_createInstance()_传递一个_Pair_来获得预期的_Student_实例：

```
val kai = Student.createInstance("Kai" to 18)

assertEquals("KAI", kai.name)
assertEquals(18, kai.age)
```

### Kotlin _data_ 类中的私有构造函数的一些话

到目前为止，我们已经学会了如何在常规Kotlin类中声明私有构造函数，这相当直接。然而，在库开发环境中实现Kotlin _data_ 类中的私有构造函数时，必须意识到**私有构造函数可能通过自动生成的_copy()_函数无意中被暴露。**

接下来，我们通过一个例子来理解：

```
data class StudentData private constructor(val name: String, val age: Int) {
    companion object {
        fun createInstance(pair: Pair``<String, Int>``): StudentData {
            return StudentData(pair.first.uppercase(), pair.second)
        }
    }
}
```

正如代码所示，我们创建了一个带有私有构造函数的_data_类_StudentData_。本质上，这个类在结构上类似于_Student_类，区别在于它被实现为一个_data_类。

所以，我们仍然不能通过调用构造函数来创建实例，例如：

```
val kaiData = StudentData("Kai", 18)
```

如果我们这样做，编译器会报错：

```
Kotlin: Cannot access '``<init>``': it is private in 'StudentData'
```

同样，我们可以通过_createInstance()_函数来获得一个实例：

```
val kaiData = StudentData.createInstance("Kai" to 18)

assertEquals("KAI", kaiData.name)
assertEquals(18, kaiData.age)
```

我们知道_data_类会自动生成_copy()_函数，以便我们可以方便地从现有实例中获取副本。此外，生成的_copy()_函数在内部调用构造函数以创建一个新实例。换句话说，**_copy()_函数将私有构造函数暴露给外部代码。**

接下来，我们通过一个例子快速理解：

```
val liam = kaiData.copy(name = "Liam", age = 20)
assertEquals("Liam", liam.name)
assertEquals(20, liam.age)
```

在这种情况下，我们使用_copy()_从现有的_kaiData_对象生成了一个新的_StudentData_对象_liam_。此外，这个函数使我们能够提供新的属性值，从而覆盖_kaiData_的相应值。

因此，**_liam_实际上是通过私有构造函数实例化的，结果，它的名字没有以大写出现。**

### 结论

在本文中，我们探讨了如何在Kotlin类中声明私有构造函数。另外，重要的是要注意，在_data_类中，私有构造函数可能被自动生成的_copy()_函数无意中暴露。

如常，示例的完整源代码可在GitHub上找到。