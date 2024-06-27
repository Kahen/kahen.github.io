---
date: 2022-04-01
category:
  - Java
  - Stream API
tag:
  - Stream
  - Java
  - 修改
head:
  - - meta
    - name: keywords
      content: Java, Stream API, 修改, 迭代
---
# 在迭代期间修改流中的对象

Java Stream API提供了多种方法，允许修改流元素。然而，这些方法中的操作必须是不干扰的和无状态的。否则，这将导致不正确的行为和输出。

在本教程中，我们将讨论在Java Stream中修改元素时常见的错误以及正确的方法。

### 2.1. 使用_forEach()_方法修改
让我们以一个_Person_类列表为例：
```java
public class Person {
    private String name;
    private String email;

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }
    // 标准的getter和setter...
}

```
我们将在流中修改_Person_元素的电子邮件ID并将其转换为大写。

### 2.2. 使用_peek()_方法修改
现在让我们看看_peek()_方法。我们经常倾向于使用它来修改流中元素的属性。

### 2.3. 使用_map()_方法修改
_forEach()_是一个流管道的终端操作。然而，_map()_像_peek()_一样是一个中间操作，它返回一个_Stream_。在_map()_中，我们将创建一个新的大写电子邮件的_Person_对象，然后将其收集到一个新的列表中。

### 3.1. 使用_forEach()_方法移除元素
如果我们想从流中移除一些元素呢？例如，让我们从列表中移除名叫_John_的人：

### 3.2. 使用_CopyOnWriteArrayList_移除元素
_CopyOnWriteArrayList_是_ArrayList_的线程安全版本。在迭代时可以移除元素：

### 3.3. 使用_filter()_方法移除元素
Java Stream API提供了_filter()_方法，以更优雅的方式移除元素。

## 4. 结论
在本文中，我们探讨了在流中正确修改元素的方法。重要的是，管道处理应该是不干扰的和无状态的。否则，这可能导致意想不到的结果。

如常，本文中使用的代码可以在GitHub上找到。---
date: 2022-04-01
category:
  - Java
  - Stream API
tag:
  - Stream
  - Java
  - 修改
head:
  - - meta
    - name: keywords
      content: Java, Stream API, 修改, 迭代
---
# 在迭代期间修改流中的对象

## 概述

Java Stream API提供了多种方法，允许对流中的元素进行修改。然而，这些方法中的操作必须是不干扰的和无状态的。否则，这将导致不正确的行为和输出。

在本教程中，我们将讨论在Java Stream中修改元素时常见的错误以及正确的方法。

## 修改流元素的状态

让我们以一个`Person`类列表为例：

```java
public class Person {
    private String name;
    private String email;

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }
    // 标准的getter和setter...
}
```

我们将在流中修改`Person`元素的电子邮件地址，并将其转换为大写。

### 使用`forEach()`方法修改

让我们首先使用`forEach()`方法，通过简单地使用此方法迭代列表来进行修改：

```java
@Test
void givenPersonList_whenUpdatePersonEmailByInterferingWithForEach_thenPersonEmailUpdated() {
    personList.stream().forEach(e -> e.setEmail(e.getEmail().toUpperCase()));

    personList.stream().forEach(e -> assertEquals(e.getEmail(), e.getEmail().toUpperCase()));
}
```

在上述方法中，我们在迭代`Person`对象列表时，将每个元素的电子邮件地址转换为大写。**这看起来是合法的，但它违反了不干扰原则。这意味着在流管道中，我们永远不应该修改原始源。**

除非流源是并发的，否则在执行流管道期间修改流的数据源**可能会导致异常、错误的答案或不符合规范的行为**。

### 使用`peek()`方法修改

现在让我们看看`peek()`方法。我们经常倾向于使用它来修改流中元素的属性：

```java
@Test
void givenPersonList_whenUpdatePersonEmailByInterferingWithPeek_thenPersonEmailUpdated() {
    personList.stream()
      .peek(e -> e.setEmail(e.getEmail().toUpperCase()))
      .collect(Collectors.toList());

    personList.forEach(e -> assertEquals(e.getEmail(), e.getEmail().toUpperCase()));
}
```

再次，**通过更新源`personList`，我们重复了前面部分提到的错误。**

### 使用`map()`方法修改

`forEach()`是一个流管道的终端操作。然而，`map()`像`peek()`一样是一个中间操作，它返回一个`Stream`。在`map()`中，我们将创建一个新的大写电子邮件的`Person`对象，然后将其收集到一个新的列表中：

```java
@Test
void givenPersonList_whenUpdatePersonEmailWithMapMethod_thenPersonEmailUpdated() {
    List```<Person>``` newPersonList = personList.stream()
      .map(e -> new Person(e.getName(), e.getEmail().toUpperCase()))
      .collect(Collectors.toList());

    newPersonList.forEach(e -> assertEquals(e.getEmail(), e.getEmail().toUpperCase()));
}
```

在上述方法中，我们没有修改原始列表。相反，我们从中创建了一个新的列表`newPersonList`。因此，它是不干扰的。它也是无状态的，因为其中的操作结果不会相互影响。大多数情况下，它们独立操作。这些原则无论是否是顺序或并行处理都是推荐的。

考虑到**不可变性是函数式编程的本质之一**，我们可以尝试创建一个不可变的`Person`类：

```java
public class ImmutablePerson {

    private final String name;
    private final String email;

    public ImmutablePerson(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public ImmutablePerson withEmail(String email) {
        return new ImmutablePerson(this.name, email);
    }
    // 标准的getter
}
```

`ImmutablePerson`类没有任何setter方法。然而，它提供了一个`withEmail()`方法，返回一个新的大写电子邮件的`ImmutablePerson`。

现在，让我们在修改流中的元素时使用它：

```java
@Test
void givenPersonList_whenUpdateImmutablePersonEmailWithMapMethod_thenPersonEmailUpdated() {
    List`<ImmutablePerson>` newImmutablePersonList = immutablePersonList.stream()
      .map(e -> e.withEmail(e.getEmail().toUpperCase()))
      .collect(Collectors.toList());

    newImmutablePersonList.forEach(e -> assertEquals(e.getEmail(), e.getEmail().toUpperCase()));
}
```

通过这种方式，我们强制执行了不干扰原则。

## 从流中移除元素

在流中执行结构性更改甚至更加棘手。这比修改操作成本更高，因此**如果不小心，可能会导致不一致和不期望的结果**。让我们更详细地探讨这一点。

### 使用`forEach()`方法移除元素

如果我们想从流中移除一些元素呢？例如，让我们从列表中移除名叫John的人：

```java
@Test
void givenPersonList_whenRemoveWhileIterating_thenThrowException() {
    assertThrows(NullPointerException.class, () -> {
        personList.stream().forEach(e -> {
            if(e.getName().equals("John")) {
                personList.remove(e);
            }
        });
    });
}
```

我们尝试在迭代时使用`forEach()`方法修改列表的结构。令人惊讶的是，这导致了`NullPointerException`，而`ArrayList`中的`forEach()`则抛出`ConcurrentModificationException`：

```java
@Test
void givenPersonList_whenRemoveWhileIteratingWithForEach_thenThrowException() {
    assertThrows(ConcurrentModificationException.class, () -> {
        personList.forEach(e -> {
            if(e.getName().equals("John")) {
                personList.remove(e);
            }
        });
    });
}
```

### 使用`CopyOnWriteArrayList`移除元素

`CopyOnWriteArrayList`是`ArrayList`的线程安全版本。在迭代时可以移除元素：

```java
@Test
void givenPersonList_whenRemoveWhileIterating_thenPersonRemoved() {
    assertEquals(4, personList.size());

    CopyOnWriteArrayList```<Person>``` cps = new CopyOnWriteArrayList<>(personList);
    cps.stream().forEach(e -> {
        if(e.getName().equals("John")) {
            cps.remove(e);
        }
    });

    assertEquals(3, cps.size());
}
```

**它可以防止多个线程之间的干扰，但由于每次写操作都会创建一个快照，因此成本太高。**

### 使用`filter()`方法移除元素

**Java Stream API提供了`filter()`方法，以更优雅的方式移除元素**：

```java
@Test
void givenPersonList_whenRemovePersonWithFilter_thenPersonRemoved() {
    assertEquals(4, personList.size());

    List```<Person>``` newPersonList = personList.stream()
      .filter(e -> !e.getName().equals("John"))
      .collect(Collectors.toList());

    assertEquals(3, newPersonList.size());
}
```

在上述方法中，`filter()`只允许那些名字不是John的`Person`对象在管道中继续前进。同样，filter方法中使用的谓词应该是不干扰的和无状态的。**它看起来更简单，易于理解和调试。**

## 结论

在本文中，我们探讨了在流中正确修改元素的方法。重要的是，管道处理应该是不干扰的和无状态的。否则，这可能导致意想不到的结果。

如常，本文中使用的代码可以在GitHub上找到。

OK