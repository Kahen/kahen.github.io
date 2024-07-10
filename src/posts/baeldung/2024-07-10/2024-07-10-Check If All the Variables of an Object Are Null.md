---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - null check
  - java
  - reflection
head:
  - - meta
    - name: keywords
      content: Java, null check, programming, reflection, Apache Commons, Stream API
------
# 检查对象是否所有变量都为null

在本教程中，我们将学习四种方法来检查一个对象的所有变量是否都为null。

在Java中，null值意味着变量的值缺失。从技术上讲，包含null的变量不指向内存中的任何位置或尚未初始化。这种情况只能发生在实例变量上。像int、double和boolean这样的原始变量不能持有null。

在我们的程序中检查null变量有助于避免像IllegalArgumentException或NullPointerException这样的意外错误。当我们尝试访问null对象的任何成员（字段或方法）时，Java会抛出NullPointerException。

一个常见的场景是实例化一个包含嵌套对象的新对象。嵌套对象不会自动初始化。因此，如果我们尝试访问该嵌套对象的成员，我们将在运行时得到一个意外的错误。为了避免这种情况，我们可以在使用其成员之前检查类中的所有变量是否为null。

为了举例说明，我们将使用下面定义的Car类：

```
public class Car {
    Integer power;
    Integer year;
}
```

### 3. 使用if语句

最简单的方法是使用一系列if语句逐个检查字段是否为null，最后返回它们结果的组合。让我们在Car类中定义allNull()方法：

```
public boolean allNull() {
    if (power != null) {
        return false;
    }

    if (year != null) {
        return false;
    }

    return true;
}
```

上面定义的方法运行得很好，如下所示的测试：

```
@Test
public void givenNullFields_whenCheckForNullsUsingIfs_thenReturnCorrectValue(){
    Car car = new Car();
    boolean result = car.allNull();
    assertTrue(result);
}
```

尽管这种方法很简单，但我们可以认为它是一种代码异味，因为我们需要为类中的每个新字段添加一个新的if语句。起初看起来可能很容易，但想象一下一个应用程序有几十类，每个类都有几十个字段。在这种情况下，我们需要为每个类编写一个验证每个字段的方法。这不是很可维护的。只有在你有小类且不太可能随时间变化时，才使用这种方法。

### 4. 使用Stream类

我们可以将if语句解决方案改进为更声明式的使用Stream API。例如，而不是在我们的类中为每个字段都有一个布尔子句，我们可以使用Stream的allMatch()和Objects的isNull()方法一起。让我们看看通过在Car类中创建另一个方法如下：

```
public boolean allNullV2() {
    return Stream.of(power, year)
      .allMatch(Objects::isNull);
}
```

那个解决方案也运行得很好，如下所示的单元测试：

```
@Test
public void givenNullFields_whenCheckForNullsUsingStreams_thenReturnCorrectValue(){
    Car car = new Car();
    boolean result = car.allNullV2();
    assertTrue(result);
}
```

allNullV2()是allNull()的声明式版本。它使代码更具可扩展性，因为我们只需要在Stream中添加字段名称，而不是整个if语句。

### 5. 使用Apache Commons的ObjectUtils

另一个选择是使用Apache commons-lang3库中的ObjectUtils实用类。ObjectUtils的allNull()方法具有通用API，可以处理任何类型和数量的参数。该方法接收一个对象数组，并返回true如果该数组中的所有值都是null。否则返回false。让我们首先将commons-lang3依赖项的最新版本添加到我们的pom.xml文件中：

```
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.12.0`</version>`
`</dependency>`
```

现在，让我们看看allNull()方法在以下单元测试中的工作方式：

```
@Test
public void givenNullFields_whenCheckForNullsUsingApacheCommons_thenReturnCorrectValue(){
    Car car = new Car();
    boolean result = ObjectUtils.allNull(car.power, car.year);
    assertTrue(result);
}
```

这种方法使用外部依赖项来实现相同的结果。因此，我们必须考虑是否值得为了这样一个简单的任务拉取一个完整的依赖项。与Stream方法类似，allNull()的好处是它接收一个对象数组，创建了一个通用API。因此，它适用于我们类中的任何类型和数量的字段。然而，我们仍然需要将新添加的类字段作为参数传递给allNull()方法。

我们将在下一节看到，使用反射API，我们可以避免在向模型类添加更多变量时修改我们的null检查器。

### 6. 使用反射API

**由于所有字段都继承了Object类，我们可以创建一个通用方法，适用于除原始类型之外的任何类型。为此，我们可以在运行时访问一个Object实例的所有字段，并使用反射API搜索nulls。**让我们创建一个名为NullChecker的新类，内容如下：

```
public class NullChecker {

    public static boolean allNull(Object target) {
        return Arrays.stream(target.getClass()
          .getDeclaredFields())
          .peek(f -> f.setAccessible(true))
          .map(f -> getFieldValue(f, target))
          .allMatch(Objects::isNull);
    }

    private static Object getFieldValue(Field field, Object target) {
        try {
            return field.get(target);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
```

这个版本比前几个稍微复杂一些，所以让我们分部分分析这段代码：

- allNull()方法定义了一个目标Object的声明字段的Stream，使用getClass()和getDeclaredFields()方法。在我们的示例中，该Stream由power和year字段组成
- peek()操作使所有私有字段（如果有的话）可以使用setAccessible(true)方法从类外部访问
- 然后，我们使用辅助方法getFieldValue()将类字段映射到它们的值，该方法捕获由Field类的get()方法抛出的检查异常
- 最后，我们使用allMatch()检查所有类字段值是否为null

让我们使用单元测试验证这是否有效：

```
@Test
public void givenNullFields_whenCheckForNullsUsingReflection_thenReturnCorrectValue() {
    Car car = new Car();
    boolean result = NullChecker.allNull(car);
    assertTrue(result);
}
```

这个API在其合同中是通用的，适用于我们定义的任何类。然而，反射API的缺点是比其他方法更危险，因为我们在编译时不需要对我们的null检查器有任何先验知识，这使得错误更难找到。反射的另一个问题是它通常比其他方法慢，因为运行时有更多的工作要做。

### 7. 结论

在本文中，我们看到了检查类中的null变量的重要性以及如何使用if语句、Streams、Apache commons-lang3库和反射API来做到这一点。像往常一样，源代码可在GitHub上获得。