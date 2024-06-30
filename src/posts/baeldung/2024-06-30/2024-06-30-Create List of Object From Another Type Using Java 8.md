---
date: 2022-04-01
category:
  - Java
  - Java 8
tag:
  - Java
  - List
  - Stream API
head:
  - - meta
    - name: keywords
      content: Java, Java 8, List, Stream API
---

# 使用Java 8从另一种类型创建对象列表

当我们使用Java工作时，有时我们想要根据另一个对象列表生成一个列表。Java 8引入了一系列新功能，简化了此类操作。

因此，本教程将探讨如何使用Java 8及以后版本中引入的强大功能，基于给定列表创建不同类型对象的列表。

## 2. 问题介绍

像往常一样，我们通过示例来理解问题。

假设一家公司想要启动一个内部网球比赛。现在，比赛委员会想要从所有公司员工中获取一个球员候选人名单。因此，我们将承担这项任务，并创建一个程序来构建球员候选人名单。

_Employee_ 类已经准备好了：

```java
@Getter
class Employee {
    private final String name;
    private final Set``<String>`` hobbies = new HashSet<>();
    private final String email;
    private String department;
    // ...其他属性

    public Employee(String name, String email, Collection``<String>`` hobbies) {
        this.name = name;
        this.email = email;
        this.hobbies.addAll(hobbies);
    }
}
```

正如上面的代码所示，我们使用Lombok的_@Getter_注解使_Employee_类具有所有属性的getter方法。

每个_Employee_对象都带有_hobbies_Set_，它以_String_形式保存员工的爱好。我们的任务是遍历员工。**如果员工将“_Tennis_”列为他们的爱好之一，我们认为他们是参加比赛的潜在候选人。** 因此，最后我们将拥有一个_TennisPlayerCandidate_实例列表：

```java
class TennisPlayerCandidate {
    private final String name;
    private final String email;
    private final Boolean confirmed = Boolean.FALSE;
    public TennisPlayerCandidate(String name, String email) {
        this.name = name;
        this.email = email;
    }

  // 省略了equals()和hashcode()方法
}
```

假设我们的输入，_EMPLOYEES_列表包含五个对象：

```java
final static List``<Employee>`` EMPLOYEES = Lists.newArrayList(
  new Employee("Kai", "kai@company.com", Lists.newArrayList("Football", "Reading", "Chess")),
  new Employee("Eric", "eric@company.com", Lists.newArrayList("Tennis", "Baseball", "Singing")),
  new Employee("Saajan", "saajan@company.com", Lists.newArrayList("Tennis", "Baseball", "Reading")),
  new Employee("Kevin", "kevin@company.com", Lists.newArrayList("Dancing", "Computer Games", "Tennis")),
  new Employee("Amanda", "amanda@company.com", Lists.newArrayList("Painting", "Yoga", "Dancing"))
);
```

基于此输入，我们的目标是获得这个_TennisPlayerCandidate_实例列表：

```java
final static List`````<TennisPlayerCandidate>````` EXPECTED = Lists.newArrayList(
  new TennisPlayerCandidate("Eric", "eric@company.com"),
  new TennisPlayerCandidate("Saajan", "saajan@company.com"),
  new TennisPlayerCandidate("Kevin", "kevin@company.com")
);
```

接下来，让我们看看从给定的_List``<Employee>``_构建预期的_List`````<TennisPlayerCandidate>`````_的不同解决方案。

为了简单起见，我们将使用单元测试断言来验证每种方法是否能够产生预期的结果。

## 3. 使用_List.forEach()_方法

解决这个问题的一个直接方法是**首先初始化一个空的候选人列表**。然后，我们遍历_EMPLOYEES_列表，**为每个将网球列为爱好的员工创建一个_TennisPlayerCandidate_对象**。如果他们满足这个标准，我们将员工添加到候选人列表中。

Java 8引入了_forEach()_方法，它允许我们在遍历列表时方便地执行操作：

```java
List`````<TennisPlayerCandidate>````` result = new ArrayList<>();
EMPLOYEES.forEach(e -> {
    if (e.getHobbies().contains("Tennis")) {
        result.add(new TennisPlayerCandidate(e.getName(), e.getEmail()));
    }
});
assertEquals(EXPECTED, result);
```

正如我们所看到的，这种方法有效地完成了工作。

除了_forEach()_方法，自Java 8以来，Stream API彻底改变了我们操作和转换数据集合的方式。

接下来，让我们使用Stream API来解决问题。

## 4. 使用_Stream.map()_或_Collectors.mapping()_

我们可以这样理解问题：**过滤那些爱好包括网球的员工，并将这些_Employee_对象转换为_TennisPlayerCandidate_对象。**

Stream的_filter()_和_map()_方法可以轻松支持我们完成任务。接下来，让我们将这个想法“翻译”成Java代码：

```java
List`````<TennisPlayerCandidate>````` result = EMPLOYEES.stream()
  .filter(e -> e.getHobbies().contains("Tennis"))
  .map(e -> new TennisPlayerCandidate(e.getName(), e.getEmail()))
  .collect(Collectors.toList());
assertEquals(EXPECTED, result);
```

正如上面的代码所示，为_TennisPlayerCandidate_对象准备一个空列表是不必要的。**filter().map()_流水线提供了一个_TennisPlayerCandidate_实例的_Stream_**。我们需要做的就是将对象收集到一个列表中。

或者，我们可以将映射逻辑移到收集阶段。换句话说，**我们在收集时将过滤后的_Employee_实例转换为_TennisPlayerCandidate_。**

**_Collectors.mapping()_方法允许我们执行对象转换和从_Stream_收集**：

```java
List`````<TennisPlayerCandidate>````` result = EMPLOYEES.stream()
  .filter(e -> e.getHobbies().contains("Tennis"))
  .collect(Collectors.mapping(e -> new TennisPlayerCandidate(e.getName(), e.getEmail()), Collectors.toList()));
assertEquals(EXPECTED, result);
```

## 5. 结论

在本文中，我们探讨了三种基于给定列表创建不同类型对象列表的方法。通过示例，我们了解到当在Java中使用列表时，Stream API提高了代码的生产力和可读性。

像往常一样，示例的完整源代码可以在GitHub上找到。