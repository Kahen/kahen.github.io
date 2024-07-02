---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Holder
  - Pass-by-Value
  - Java Generics
head:
  - - meta
    - name: keywords
      content: Java Holder, Pass-by-Value, Generics, Java Programming
---
# Java中的Holder类是做什么用的？ | Baeldung

在本教程中，我们将深入探讨Java中的_Holder`````````````````<T>`````````````````_类。尽管这不是Java内置的类，但Holder`````````````````<T>`````````````````的概念可以显著提高我们的开发效率。让我们了解_Holder`````````````````<T>`````````````````_的强大之处以及它如何增强我们的代码。

## 2. 值传递语义的局限性

为了理解我们为什么可能需要一个_Holder`````````````````<T>`````````````````_类，我们首先考虑一个常见的场景：向方法传递一个简单的_Boolean_。我们将创建一个模拟服务方法_getSupplierByZipCode()_，期望它修改_Boolean_的值：

```java
public class SupplierService {
    public void getSupplierByZipCode(String zip, Boolean result) {
        if (zip.startsWith("9")) {
            result = true;
        } else {
            result = false;
        }
    }
}
```

现在，让我们使用以“_9_”开头的_zipCode_来测试这个服务，期望_result_变为_true_：

```java
@Test
public void givenValidZipCode_whenGetSupplierByZipCode_thenTrue() {
    SupplierService service = new SupplierService();
    Boolean result = false;
    String zipCode = "98682";
    service.getSupplierByZipCode(zipCode, result);
    assertTrue(result);
}
```

**这个测试失败了！由于Java的值传递语义，我们传入_getSupplierByZipCode()_的_result_Boolean_实际上并没有被方法改变。** 当方法尝试修改_result_时，它只是在修改一个副本，而原始的_result_保持不变。

这个限制正是_Holder`````````````````<T>`````````````````_可以帮助我们克服的。

## 3. 概念化_Holder`````````````````<T>`````````````````_

我们可以将_Holder`````````````````<T>`````````````````_视为一个通用容器或包装类，能够存储和管理任何类型_T_的对象。

**它主要存在是为了克服Java的值传递语义，提供一种间接的方式来模拟按引用传递的行为。**

这里的_T_表示一个类型参数，意味着任何有效的Java引用类型都可以替换它。这允许我们有一个_Holder_类，可以适应任何数据类型。**然而，需要注意的是，_Holder`````````````````<T>`````````````````_不应该在每种情况下都随意使用。** 特别是当处理不可变对象时，使用_Holder`````````````````<T>`````````````````_可能不是最有效或推荐的方法。

让我们想象我们有一个简单的_Holder_类，它包装了一个类型为_T_的值。我们可能会这样定义它：

```java
public class Holder`````````````````<T>````````````````` {
    public T value;

    public Holder(T value) {
        this.value = value;
    }
}
```

在这个例子中，_Holder`````````````````<T>`````````````````_作为一个容器来持有和管理任何类型_T_的值。

## 5. 使用_Holder`````````````````<T>`````````````````_类

现在，让我们调整我们的_SupplierService_来克服我们之前观察到的Java值传递语义的限制。我们不是直接将_Boolean_传递给_getSupplierByZipCode()_方法，而是使用_Holder`````````````````<T>`````````````````_类。这允许方法修改_Holder_的_value_，模拟一个我们需要从方法中返回除返回值之外的其他信息的场景。

```java
public class SupplierService {
    public void getSupplierByZipCode(String zip, Holder```<Boolean>``` resultHolder) {
        if (zip.startsWith("9")) {
            resultHolder.value = true;
        } else {
            resultHolder.value = false;
        }
    }
}
```

现在，让我们使用修改后的_SupplierService_重新运行我们的测试，使用_Holder`````````````````<T>`````````````````_。

```java
@Test
public void givenValidZipCode_whenGetSupplierByZipCode_thenTrue() {
    SupplierService service = new SupplierService();
    Holder```<Boolean>``` resultHolder = new Holder<>(false);
    String zipCode = "98682";
    service.getSupplierByZipCode(zipCode, resultHolder);
    assertTrue(resultHolder.value);
}

@Test
public void givenInvalidZipCode_whenGetSupplierByZipCode_thenFalse() {
    SupplierService service = new SupplierService();
    Holder```<Boolean>``` resultHolder = new Holder<>(true);
    String zipCode = "12345";
    service.getSupplierByZipCode(zipCode, resultHolder);
    assertFalse(resultHolder.value);
}
```

这次，我们的测试通过了。_Holder`````````````````<T>`````````````````_类通过提供额外的间接层，**允许我们模拟按引用传递的语义，并在_getSupplierByZipCode()_方法中修改我们想要的变量。**

## 6. 结论

在本文中，我们看到了_Holder`````````````````<T>`````````````````_类可以作为Java中各种编程场景中的灵活而强大的工具。尽管它不是内置类，但_Holder`````````````````<T>`````````````````_的概念提供了一种优雅的方式来创建灵活且可重用的代码，可以处理不同类型的数据。这可以让我们克服Java的按值调用语义在某些情况下的限制。

如往常一样，这些示例的代码可以在GitHub上找到。