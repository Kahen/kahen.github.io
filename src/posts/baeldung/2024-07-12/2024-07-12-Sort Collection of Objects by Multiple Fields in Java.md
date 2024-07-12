---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - Java
  - 排序
  - 集合
head:
  - - meta
    - name: keywords
      content: Java, 排序, 集合, 多字段排序
---
# Java中按多个字段对对象集合进行排序 | Baeldung

## 1. 概述

在编程中，我们经常需要对对象集合进行排序。如果我们想要根据多个字段对对象进行排序，排序逻辑有时可能变得难以实现。在本教程中，我们将讨论这个问题的几种不同方法，以及它们的优缺点。

## 2. 示例_Person_类

让我们定义一个_Person_类，它包含两个字段，_name_和_age_。在我们的示例中，我们将首先根据_name_然后根据_age_比较_Person_对象：

```java
public class Person {
    @Nonnull private String name;
    private int age;

    // 构造函数
    // getter和setter
}
```

在这里，我们添加了_@Nonnull_注解以简化示例。但在生产代码中，我们可能需要处理可空字段的比较。

## 3. 使用_Comparator.compare()_

Java提供了_Comparator_接口来比较两个相同类型的对象。我们可以实现它的_compare(T o1, T o2)_方法，以自定义逻辑执行所需的比较。

### 3.1. 逐个检查不同字段

让我们一个接一个地比较字段：

```java
public class CheckFieldsOneByOne implements Comparator`````<Person>````` {
    @Override
    public int compare(Person o1, Person o2) {
        int nameCompare = o1.getName().compareTo(o2.getName());
        if(nameCompare != 0) {
            return nameCompare;
        }
        return Integer.compare(o1.getAge(), o2.getAge());
    }
}
```

在这里，我们使用_String_类的_compareTo()_方法和_Integer_类的_compare()_方法分别比较_name_和_age_字段。

这种方法需要大量的打字，有时还要处理许多特殊情况。因此，它很难维护和扩展，当我们有更多的字段要比较时。**通常，不推荐在生产代码中使用这种方法。**

### 3.2. 使用Guava的_ComparisonChain_

首先，让我们将Google Guava库依赖项添加到我们的_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``31.1-jre``</version>``
``</dependency>``
```

我们可以通过使用这个库中的_ComparisonChain_类来简化逻辑：

```java
public class ComparisonChainExample implements Comparator`````<Person>````` {
    @Override
    public int compare(Person o1, Person o2) {
        return ComparisonChain.start()
          .compare(o1.getName(), o2.getName())
          .compare(o1.getAge(), o2.getAge())
          .result();
    }
}
```

在这里，我们使用_ComparisonChain_中的_compare(int left, int right)_和_compare(Comparable``<?>`` left, Comparable``<?>`` right)_方法分别比较_name_和_age_。

**这种方法隐藏了比较细节，只展示了我们关心的内容——我们想要比较的字段以及它们应该比较的顺序。** 另外，我们应该注意到，我们不需要任何额外的逻辑来处理_null_，因为库方法已经处理了它。因此，它更容易维护和扩展。

### 3.3. 使用Apache Commons的_CompareToBuilder_排序

首先，让我们将Apache Commons的依赖项添加到_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.12.0``</version>``
``</dependency>``
```

类似于前面的例子，我们可以使用Apache Commons的_CompareToBuilder_来减少所需的样板代码：

```java
public class CompareToBuilderExample implements Comparator`````<Person>````` {
    @Override
    public int compare(Person o1, Person o2) {
        return new CompareToBuilder()
          .append(o1.getName(), o2.getName())
          .append(o1.getAge(), o2.getAge())
          .build();
    }
}
```

这种方法与Guava的_ComparisonChain_非常相似——**它也隐藏了比较细节，并且很容易维护和扩展。**

## 4. 使用_Comparator.comparing()_和Lambda表达式

自从Java 8以来，_Comparator_接口添加了几个静态方法，它们可以采用lambda表达式来创建_Comparator_对象。我们可以使用它的_comparing()_方法来构建我们需要的_Comparator_：

```java
public static Comparator`````<Person>````` createPersonLambdaComparator() {
    return Comparator.comparing(Person::getName)
      .thenComparing(Person::getAge);
}
```

**这种方法更加简洁易读，因为它直接采用了_Person_类的getters。**

它还保持了我们之前看到的方法的可维护性和可扩展性。此外，**这里的getters是懒加载评估的**，与前面方法中的立即评估相比。因此，它的性能更好，更适合需要大量大数据比较的延迟敏感系统。

此外，这种方法只使用Java核心类，不需要任何第三方库作为依赖。总的来说，**这是最推荐的方法。**

## 5. 检查比较结果

让我们测试我们看到的四个比较器，并检查它们的行为。所有这些比较器可以以相同的方式调用，并且应该产生相同的结果：

```java
@Test
public void testComparePersonsFirstNameThenAge() {
    Person person1 = new Person("John", 21);
    Person person2 = new Person("Tom", 20);
    // 另一个名叫John的人
    Person person3 = new Person("John", 22);

    List<Comparator`````<Person>`````> comparators =
      Arrays.asList(new CheckFieldsOneByOne(),
        new ComparisonChainExample(),
        new CompareToBuilderExample(),
        createPersonLambdaComparator());
    // 所有比较器应该产生相同的结果
    for(Comparator`````<Person>````` comparator : comparators) {
        Assertions.assertIterableEquals(
          Arrays.asList(person1, person2, person3)
            .stream()
            .sorted(comparator)
            .collect(Collectors.toList()),
          Arrays.asList(person1, person3, person2));
    }
}
```

在这里，_person1_与_person3_有相同的名字（"John"），但更年轻（21 < 22），而_person3_的名字（"John"）在字典序上小于_person2_的名字（"Tom"）。因此，最终的排序是_person1_，_person3_，_person2_。

另外，我们应该**注意，如果我们没有在类变量_name_上加上_@Nonnull_注解，我们将需要在所有方法中添加额外的逻辑来处理null情况，除了Apache Commons的_CompareToBuilder_（它内置了处理null的逻辑）。**

## 6. 结论

在本文中，我们学习了在对对象集合进行排序时按多个字段进行比较的不同方法。

如常，示例的源代码可以在GitHub上找到。