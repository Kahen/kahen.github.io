---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - Java
  - 多键Map
  - 编程技巧
head:
  - - meta
    - name: keywords
      content: Java, 多键Map, 编程技巧
---
# Java中实现具有多个键类型的Map

## **1. 引言**

我们经常在程序中使用映射（map），作为一种将键与值关联起来的手段。通常在我们的Java程序中，尤其是自从引入泛型以来，所有的键都是相同的类型，所有的值也都是相同的类型。例如，在数据存储中将ID映射到值。

有时，我们可能想要使用一个映射，其中的键类型并不总是相同的。**例如，如果我们将ID类型从_Long_更改为_String_，那么我们的数据存储将需要同时支持两种键类型——_Long_用于旧条目，_String_用于新条目。**

不幸的是，Java的_Map_接口不允许有多种键类型，因此我们需要找到另一种解决方案。在本文中，我们将探讨几种实现方式。

## **2. 使用泛型超类型**

实现这一点的最简单方式是拥有一个映射，其键类型是我们所有键的最接近的超类型。在某些情况下，这可能很容易——例如，如果我们的键是_Long_和_Double_，那么最接近的超类型是_Number_：

```
Map`<Number, User>` users = new HashMap<>();
users.get(longId);
users.get(doubleId);
```

然而，在其他情况下，最接近的超类型是_Object_。这的缺点是它完全移除了我们映射的类型安全性：

```
Map`<Object, User>` users = new HashMap<>();
users.get(longId); /// 有效。
users.get(stringId); // 有效。
users.get(Instant.now()); // 同样有效。
```

在这种情况下，编译器不会阻止我们传递错误的类型，有效地从我们的映射中移除了所有的类型安全性。在某些情况下，这可能没问题。例如，如果另一个类封装了映射本身以强制执行类型安全性，那么这可能是可以接受的。

然而，它仍然在使用映射的方式上带来了风险。

## **3. 多个映射**

如果类型安全性很重要，并且我们将映射封装在另一个类中，另一个简单的选项是拥有多个映射。在这种情况下，我们将为每种支持的键拥有一个不同的映射：

```
Map`<Long, User>` usersByLong = new HashMap<>();
Map`<String, User>` usersByString = new HashMap<>();
```

这样做确保了编译器会为我们保持类型安全性。如果我们在这里尝试使用_Instant_，编译器将不允许我们这样做，所以我们在这里是安全的。

**不幸的是，这增加了复杂性，因为我们需要知道使用哪个映射。**这意味着我们要么有使用不同映射的不同方法，要么我们在任何地方都进行类型检查。

这也不容易扩展。如果我们想添加新的键类型，我们将需要在所有地方添加新的映射和新的检查。对于两三种键类型，这是可以管理的，但很快就会变得太多。

## **4. 键包装类型**

**如果我们既需要类型安全性，又不想承担维护多个映射的负担，那么我们需要找到一种方法，让一个单一的映射可以拥有不同的键值。**这意味着我们需要找到一种方法，让一个单一的类型实际上是不同的类型。我们可以通过两种不同的方式实现这一点——使用单个包装器或使用接口和子类。

### **4.1. 单个包装类**

我们拥有的一个选项是编写一个可以包装我们所有可能的键类型的单个类。这将有一个用于实际键值的单一字段，正确的_equals_和_hashCode_方法，然后为每种可能的类型提供一个构造函数：

```
class MultiKeyWrapper {
    private final Object key;

    MultiKeyWrapper(Long key) {
        this.key = key;
    }

    MultiKeyWrapper(String key) {
        this.key = key;
    }

    @Override
    public bool equals(Object other) { ... }

    @Override
    public int hashCode() { ... }
}
```

这保证了类型安全性，因为它只能使用_Long_或_String_构造。我们可以使用它作为映射中的单一类型，因为它本身就是一个单一的类：

```
Map``<MultiKeyWrapper, User>`` users = new HashMap<>();
users.get(new MultiKeyWrapper(longId)); // 有效
users.get(new MultiKeyWrapper(stringId)); // 有效
users.get(new MultiKeyWrapper(Instant.now())); // 编译错误
```

我们只需要将_Long_或_String_包装在我们的新_MultiKeyWrapper_中，就可以访问映射。

这相对简单，但它会使扩展稍微困难。每当我们想要支持任何额外的类型时，我们就需要更改_MultiKeyWrapper_类以支持它。

### **4.2. 接口和子类**

另一种选择是编写一个接口来表示我们的键包装器，然后为我们想要支持的每种类型编写这个接口的实现：

```
interface MultiKeyWrapper {}

record LongMultiKeyWrapper(Long value) implements MultiKeyWrapper {}
record StringMultiKeyWrapper(String value) implements MultiKeyWrapper {}
```

正如我们所看到的，这些实现可以使用Java 14中引入的Record功能，这将使实现变得更加容易。

和以前一样，然后我们可以使用_MultiKeyWrapper_作为映射的单一键类型。然后我们使用我们想要使用的键类型的适当实现：

```
Map``<MultiKeyWrapper, User>`` users = new HashMap<>();
users.get(new LongMultiKeyWrapper(longId)); // 有效
users.get(new StringMultiKeyWrapper(stringId)); // 有效
```

在这种情况下，我们没有用于其他任何东西的类型，所以我们甚至不能首先编写无效的代码。

通过这种解决方案，我们不是通过更改现有类来支持额外的键类型，而是通过编写一个新的类来支持。这更容易支持，但这也意味着我们对支持的键类型有更少的控制。

然而，这可以通过正确使用可见性修饰符来管理。只有能够访问接口的类才能实现我们的接口，因此如果我们将其设置为包私有，那么只有同一包中的类才能实现它。

## **5. 结论**

在这里，我们看到了几种表示键到值的映射的方式，但键并不总是相同类型。这些策略的示例可以在GitHub上找到。