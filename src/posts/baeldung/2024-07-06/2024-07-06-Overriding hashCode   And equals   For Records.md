---
date: 2022-04-01
category:
  - Java
  - Records
tag:
  - hashCode
  - equals
head:
  - - meta
    - name: keywords
      content: Java, Records, hashCode, equals, 记录, 哈希码, 等价性
---
# Java记录中重写hashCode()和equals()方法

Java 14引入了记录的概念，作为一种简便且更好的方式传递不可变数据对象。记录只具有一个类最基本的方法，构造函数和getter/setter，因此它是一种受限的类形式，类似于Java中的枚举。记录是一个纯数据载体，是一种用于传递数据的类，这些数据不会被修改。

在本教程中，我们将讨论如何重写记录的默认hashCode()和equals()实现。

Java对象类定义了equals()和hashCode()方法。由于Java中的所有类都继承自对象类，它们也有这些方法的默认实现。

equals()方法用于断言两个对象的等价性，其默认实现意味着如果两个对象具有相同的身份，它们就相等。hashCode()方法返回一个基于当前类实例的整数值，并与等价性的定义一起实现。

记录作为Java中类的一种受限形式，自带了equals()、hashCode()和toString()的默认实现。我们可以使用new关键字实例化记录。我们还可以使用equals()比较两个记录实例的等价性，就像比较类实例一样。

任何类型为R的记录都直接继承自java.lang.Record。默认情况下，Java为这两个方法提供了默认实现以供使用。

默认的equals()实现遵守对象equals()方法的契约。此外，当我们通过复制另一个记录实例的所有属性来创建一个新的记录实例时，这两个记录实例必须是等价的。这很重要，因为记录的概念是作为一个不可更改的数据载体。

假设我们有一个类型为Person的记录，并创建了两个记录实例：

```java
public record Person(String firstName, String lastName, String SSN, String dateOfBirth) {};
```

我们可以这样做，因为记录提供了默认构造函数，考虑了所有的记录字段。此外，我们还有一个现成的equals()用于比较Person实例：

```java
@Test
public void givenTwoRecords_whenDefaultEquals_thenCompareEquality() {
    Person robert = new Person("Robert", "Frost", "HDHDB223", "2000-01-02");
    Person mike = new Person("Mike", "Adams", "ABJDJ2883", "2001-01-02");
    assertNotEquals(robert, mike);
}
```

默认的hashCode()实现返回一个由记录的所有属性的哈希值组合而成的哈希码（整数），并遵循对象的哈希码契约。由相同组件创建的两个记录也必须具有相同的hashCode值：

```java
@Test
public void givenTwoRecords_hashCodesShouldBeSame() {
    Person robert = new Person("Robert", "Frost", "HDHDB223", "2000-01-02");
    Person robertCopy = new Person("Robert", "Frost", "HDHDB223", "2000-01-02");
    assertEquals(robert.hashCode(), robertCopy.hashCode());
}
```

Java确实提供了覆盖equals()和hashCode()方法默认实现的能力。例如，假设我们决定，如果两个Movie记录（具有多个属性）的标题和发行年份相同，就足以断言它们的等价性。

在这种情况下，我们可以选择覆盖默认实现，该实现考虑了每个属性来断言等价性，使用我们自己的：

```java
record Movie(String name, Integer yearOfRelease, String distributor) {

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        if (other == null) {
            return false;
        }
        if (!(other instanceof Movie)) {
            return false;
        }
        Movie movie = (Movie) other;
        if (movie.name.equals(this.name) && movie.yearOfRelease.equals(this.yearOfRelease)) {
            return true;
        }
        return false;
    }
}
```

这个实现与Java类中任何其他自定义equals()实现有些相似：

- 如果两个实例相同，它们必须是等价的
- 如果另一个实例是null，则等价性失败
- 如果另一个实例不是同一类型，则等价性失败
- 在将另一个对象转换为记录类型后，如果名称和发行年份属性与当前对象相同，则它们必须是等价的

然而，在检查两个Movie记录的等价性时，在发生冲突的情况下，编译器会转向hashCode()来确定等价性。因此，同样重要的是覆盖hashCode()方法的实现：

```java
@Override
public int hashCode() {
    return Objects.hash(name, yearOfRelease);
}
```

现在我们可以正确地测试两个Movie记录的等价性了：

```java
@Test
public void givenTwoRecords_whenCustomImplementation_thenCompareEquality() {
    Movie movie1 = new Movie("The Batman", 2022, "WB");
    Movie movie2 = new Movie("The Batman", 2022, "Dreamworks");
    assertEquals(movie1, movie2);
    assertEquals(movie1.hashCode(), movie2.hashCode());
}
```

Java规范期望任何记录的自定义equals()实现都必须满足规则，即记录的副本必须与原始记录等价。然而，由于Java记录旨在传递不可变数据记录，通常可以安全地使用Java提供的equals()和hashCode()的默认实现。

然而，记录是浅层不可变的。这意味着如果记录具有可变属性，例如列表，它们就不会自动变得不可变。使用默认实现，只有当两个实例的所有属性都相等时，两个记录才相等，无论属性是原始类型还是引用类型。

这对记录实例来说是一个挑战，它最好覆盖默认的equals()和hashCode()实现。这也使得它成为用作Map键的完美候选者。这意味着我们应该仔细处理具有可能的可变数据元素的记录。

在本文中，我们探讨了记录如何提供equals()和hashCode()方法的默认实现。我们还探讨了如何用我们自己的自定义实现覆盖默认实现。

我们还探讨了何时考虑覆盖默认行为。

像往常一样，所有代码示例都可以在GitHub上找到。