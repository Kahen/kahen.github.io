---
date: 2022-04-01
category:
  - Java
  - Apache Commons Lang
tag:
  - Java
  - 比较对象
  - Apache Commons Lang 3
head:
  - - meta
    - name: keywords
      content: Java, 比较对象, Apache Commons Lang 3
---
# 使用Apache Commons Lang 3在Java中比较对象

比较对象是Java以及许多其他编程语言中的核心概念之一。它在处理排序、搜索和过滤数据时是一个基本的概念，这在编程的各个方面都起着至关重要的作用。

在Java中比较对象可以通过手动实现比较逻辑或使用具有对象比较能力的库来完成。可以用于Java中比较对象的各种库，例如JaVers或Apache Commons Lang 3，本文将介绍后者。

Apache Commons Lang 3是Apache Commons Lang库的3.0版本，提供了许多功能。

我们将探索_DiffBuilder_类来比较并获取两个相同类型对象之间的差异。结果差异通过_DiffResult_类表示。

还有一个_DiffBuilder_的替代品——_ReflectionDiffBuilder_——它的目的相同，但是基于反射，而_DiffBuilder_则不是。

### 3. Maven依赖性

要使用Apache Commons Lang 3，我们首先需要添加Maven依赖性：

```
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.14.0`</version>`
`</dependency>`
```

### 4. 模型

为了演示比较两个对象并获取它们的差异，我们将使用一个_Person_类，以及_PhoneNumber_和_Address_类：

```java
public class Person {
    private String firstName;
    private String lastName;
    private int age;
    private List`````<PhoneNumber>````` phoneNumbers;
    private Address address;

    // 标准构造函数，getter和setter
}
```

```java
public class PhoneNumber {
    private String type;
    private String number;

    // 标准构造函数，getter和setter
}
```

```java
public class Address {
    private String streetAddress;
    private String city;
    private String postalCode;

    // 标准构造函数，getter和setter
}
```

### 5. 使用_DiffBuilder_类比较对象

让我们通过使用_DiffBuilder_类来演示如何比较_Person_对象。我们将首先定义一个_PersonDiffBuilder_类，其中包含一个_compare()_方法：

```java
public static DiffResult compare(Person first, Person second) {
    DiffBuilder diffBuilder = new DiffBuilder(first, second, ToStringStyle.DEFAULT_STYLE)
      .append("person", first.getFirstName(), second.getFirstName())
      .append("lastName", first.getLastName(), second.getLastName())
      .append("streetAddress", first.getAddress().getStreetAddress(),
        second.getAddress().getStreetAddress())
      .append("city", first.getAddress().getCity(), second.getAddress().getCity())
      .append("postalCode", first.getAddress().getPostalCode(),
        second.getAddress().getPostalCode())
      .append("age", first.getAge(), second.getAge());

    for (int i = 0; i < first.getPhoneNumbers().size(); i++) {
        diffBuilder.append("phoneNumbers[" + i + "].number",
          first.getPhoneNumbers().get(i).getNumber(),
          second.getPhoneNumbers().get(i).getNumber());
    }
    return diffBuilder.build();
}
```

在这里，我们使用_DiffBuilder_来实现_compare()_方法。**在使用_append()_方法生成_DiffBuilder_时，我们可以精确控制用于比较的字段。**

为了演示目的，在比较嵌套的_PhoneNumber_对象时，我们省略了比较_type_字段，因此具有相同_number_和不同_type_字段的两个_PhoneNumber_对象将被视为相等。

或者，我们可以让我们的_Person_类实现_Diffable_接口，然后类似地使用_DiffBuilder_来实现_diff()_方法。

让我们看看如何将_PersonDiffBuilder_类付诸实践并比较两个_Person_对象：

```java
@Test
void givenTwoPeopleDifferent_whenComparingWithDiffBuilder_thenDifferencesFound() {
    List`````<PhoneNumber>````` phoneNumbers1 = new ArrayList<>();
    phoneNumbers1.add(new PhoneNumber("home", "123-456-7890"));
    phoneNumbers1.add(new PhoneNumber("work", "987-654-3210"));

    List`````<PhoneNumber>````` phoneNumbers2 = new ArrayList<>();
    phoneNumbers2.add(new PhoneNumber("mobile1", "123-456-7890"));
    phoneNumbers2.add(new PhoneNumber("mobile2", "987-654-3210"));

    Address address1 = new Address("123 Main St", "London", "12345");
    Address address2 = new Address("123 Main St", "Paris", "54321");

    Person person1 = new Person("John", "Doe", 30, phoneNumbers1, address1);
    Person person2 = new Person("Jane", "Smith", 28, phoneNumbers2, address2);

    DiffResult``<Person>`` diff = PersonDiffBuilder.compare(person1, person2);
    for (Diff``<?>`` d : diff.getDiffs()) {
        System.out.println(d.getFieldName() + ": " + d.getLeft() + " != " + d.getRight());
    }

    assertFalse(diff.getDiffs().isEmpty());
}
```

**产生的_DiffResult_提供了一个_getDiffs()_方法，用于获取发现的差异作为_Diff_对象的列表。** _Diff_类还提供了实用的方法来获取比较的字段。

在这个例子中，被比较的人有不同的名字、姓氏、城市和邮政编码。电话号码有不同的类型但数字相同。

如果我们看看_System.out.println()_的输出，我们可以看到所有的差异都已经被找到：

```
person: John != Jane
lastName: Doe != Smith
city: London != Paris
postalCode: 12345 != 54321
age: 30 != 28
```

### 6. 使用_ReflectionDiffBuilder_类比较对象

让我们通过使用_ReflectionDiffBuilder_类来演示如何比较_Person_对象。我们将首先定义一个_PersonReflectionDiffBuilder_类，其中包含一个_compare()_方法：

```java
public static DiffResult compare(Person first, Person second) {
    return new ReflectionDiffBuilder<>(first, second, ToStringStyle.SHORT_PREFIX_STYLE).build();
}
```

在这里，我们使用_ReflectionDiffBuilder_来实现_compare()_方法。**不需要附加个别字段进行比较，因为所有非静态和非瞬态字段都是通过反射发现的。**

在这个例子中，发现的字段将是_firstName_、_lastName_、_age_、_phoneNumbers_和_address_。内部地，_ReflectionDiffBuilder_使用_DiffBuilder_，并且它是使用发现的字段构建的。

假设我们想要从比较中排除一个特定的发现字段。在这种情况下，我们可以使用_@DiffExclude_注解来标记我们希望从_ReflectionDiffBuilder_的使用中排除的字段。

由于我们的_Person_类具有复杂的结构，包含嵌套对象，为了确保_ReflectionDiffBuilder_正确识别差异，我们必须实现_equals()_和_hashCode()_方法。

为了演示目的，我们将_Person_类的_address_字段标记为_@DiffExclude_注解：

```java
public class Person {
    private String firstName;
    private String lastName;
    private int age;
    private List`````<PhoneNumber>````` phoneNumbers;
    @DiffExclude
    private Address address;

    // 标准构造函数，getter和setter
}
```

我们还将省略使用_PhoneNumber_类的_type_字段在_equals()_和_hashCode()_方法中：

```java
@Override
public boolean equals(Object o) {
    if (this == o) {
        return true;
    }
    if (o == null || getClass() != o.getClass()) {
        return false;
    }
    PhoneNumber that = (PhoneNumber) o;
    return Objects.equals(number, that.number);
}

@Override
public int hashCode() {
    return Objects.hash(number);
}
```

让我们看看如何使用_PersonReflectionDiffBuilder_类来比较两个_Person_对象：

```java
@Test
void givenTwoPeopleDifferent_whenComparingWithReflectionDiffBuilder_thenDifferencesFound() {
    List`````<PhoneNumber>````` phoneNumbers1 = new ArrayList<>();
    phoneNumbers1.add(new PhoneNumber("home", "123-456-7890"));
    phoneNumbers1.add(new PhoneNumber("work", "987-654-3210"));

    List`````<PhoneNumber>````` phoneNumbers2 = new ArrayList<>();
    phoneNumbers2.add(new PhoneNumber("mobile1", "123-456-7890"));
    phoneNumbers2.add(new PhoneNumber("mobile2", "987-654-3210"));

    Address address1 = new Address("123 Main St", "London", "12345");
    Address address2 = new Address("123 Main St", "Paris", "54321");

    Person person1 = new Person("John", "Doe", 30, phoneNumbers1, address1);
    Person person2 = new Person("Jane", "Smith", 28, phoneNumbers2, address2);

    DiffResult``<Person>`` diff = PersonReflectionDiffBuilder.compare(person1, person2);
    for (Diff``<?>`` d : diffDiff()_方法中) {
    System.out.println(d.getFieldName() + ": " + d.getLeft() + " != " + d.getRight());
}

assertFalse(diff.getDiffs().isEmpty());
}

在这个例子中，被比较的人有不同的名字、姓氏和地址。电话号码有不同的类型但数字相同。然而，我们对_Person_类的_address_字段使用了_@DiffExclude_注解，将其从比较中排除。

如果我们看看_System.out.println()_的输出，我们可以看到所有差异都已经被找到：

```
firstName: John != Jane
lastName: Doe != Smith
age: 30 != 28
```

### 7. 结论

在本文中，我们展示了如何使用Apache Commons Lang 3库中的_DiffBuilder_和_ReflectionDiffBuilder_来比较Java对象。

这两个类都很容易使用，并提供了一种方便的方式来比较对象，尽管它们各自有优点和缺点。

通过本文的例子，我们可以看到_DiffBuilder_提供了更多的定制选项并且更加明确。然而，它可能会导致更复杂的对象的复杂性增加。

_ReflectionDiffBuilder_提供了更多的简单性，但定制选项有限，并且可能会引入性能开销，因为它使用了反射。

本文的代码可以在GitHub上找到。
```

OK