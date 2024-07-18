---
date: 2022-04-01
category:
  - Java
tag:
  - Java
  - Collections
  - Comparator
  - Comparable
  - Sorting
head:
  - - meta
    - name: keywords
      content: Java, Collections, Comparator, Comparable, Sorting
------
# 在Java中按日期对列表中的对象进行排序

## 1. 概述

在本教程中，我们将讨论如何按日期对列表中的对象进行排序。大多数排序技术或示例让用户按字母顺序排序列表，但本文将讨论如何使用日期对象进行排序。

我们将看看如何使用Java的Comparator类来**自定义排序我们的列表值**。

## 2. 设置

让我们看看本文中将使用的_Employee_实体：

```java
public class Employee implements Comparable````<Employee>```` {
    private String name;
    private Date joiningDate;

    public Employee(String name, Date joiningDate) {
        // ...
    }

    // 标准getter和setter
}
```

我们可以注意到我们在_Employee_类中实现了_Comparable_接口。这个接口让我们定义一个策略来比较同一类型的对象。这用于**按自然排序形式或由compareTo()方法定义来排序对象**。

## 3. 使用_Comparable_进行排序

在Java中，自然顺序指的是我们应该如何排序数组或集合中的原始类型或对象。**java.util.Arrays和java.util.Collections中的_sort()_方法应该是一致的，并反映等式的语义。**

我们将使用此方法比较当前对象和作为参数传递的对象：

```java
public class Employee implements Comparable````<Employee>```` {

    // ...

    @Override
    public boolean equals(Object obj) {
        return ((Employee) obj).getName().equals(getName());
    }

    @Override
    public int compareTo(Employee employee) {
        return getJoiningDate().compareTo(employee.getJoiningDate());
    }
}
```

这个_compareTo()_方法将**比较当前对象与作为参数发送的对象。**在上面的例子中，我们比较当前对象的入职日期与传递的Employee对象的入职日期。

### 3.1. 按升序排序

在大多数情况下，_compareTo()_方法**描述了对象之间的比较逻辑，具有自然排序。**这里，我们比较员工的入职日期字段与其他相同类型的对象。如果两个员工有相同的入职日期，他们将返回0：

```java
@Test
public void givenEmpList_SortEmpList_thenSortedListinNaturalOrder() {
    Collections.sort(employees);
    assertEquals(employees, employeesSortedByDateAsc);
}
```

现在，_Collections.sort(employees)_将根据其_joiningDate_而不是其主键或名称来排序员工列表。我们可以看到列表按员工的_joiningDate_排序 - 这现在成为_Employee_类的自然顺序：

```java
[(Pearl,Tue Apr 27 23:30:47 IST 2021),
(Earl,Sun Feb 27 23:30:47 IST 2022),
(Steve,Sun Apr 17 23:30:47 IST 2022),
(John,Wed Apr 27 23:30:47 IST 2022)]
```

### 3.2. 按降序排序

_Collections.reverseOrder()_方法**按自然排序的相反顺序排序对象。**这返回一个比较器，将执行相反的排序。当对象在比较中返回_null_时，它将抛出_NullPointerExeption_：

```java
@Test
public void givenEmpList_SortEmpList_thenSortedListinDescOrder() {
    Collections.sort(employees, Collections.reverseOrder());
    assertEquals(employees, employeesSortedByDateDesc);
}
```

## 4. 使用_Comparator_进行排序

### 4.1. 按升序排序

现在让我们使用_Comparator_接口实现来排序我们的员工列表。这里，我们将在运行时向_Collections.sort()_ API传递一个匿名内部类参数：

```java
@Test
public void givenEmpList_SortEmpList_thenCheckSortedList() {

    Collections.sort(employees, new Comparator````<Employee>````() {
        public int compare(Employee o1, Employee o2) {
            return o1.getJoiningDate().compareTo(o2.getJoiningDate());
        }
    });

    assertEquals(employees, employeesSortedByDateAsc);
}
```

我们也可以用Java 8 Lambda语法替换这种语法，使我们的代码更小，如下所示：

```java
@Test
public void givenEmpList_SortEmpList_thenCheckSortedListAscLambda() {

    Collections.sort(employees, Comparator.comparing(Employee::getJoiningDate));

    assertEquals(employees, employeesSortedByDateAsc);
}
```

_compare(arg1, arg2)_方法**接受两个泛型类型的参数，并返回一个整数。**由于它与类定义分离，我们可以根据不同的变量和实体定义自定义比较。这在我们需要为比较参数对象定义不同的自定义排序时很有用。

### 4.2. 按降序排序

我们可以通过反转员工对象的比较来按降序排序给定的_Employee_列表，即比较_Employee2_与_Employee1_。这将反转比较，从而按降序返回结果：

```java
@Test
public void givenEmpList_SortEmpList_thenCheckSortedListDescV1() {

    Collections.sort(employees, new Comparator````<Employee>````() {
        public int compare(Employee emp1, Employee emp2) {
            return emp2.getJoiningDate().compareTo(emp1.getJoiningDate());
        }
    });

    assertEquals(employees, employeesSortedByDateDesc);
}
```

我们也可以将上述方法转换为更简洁的形式，使用Java 8 Lambda表达式。这将执行与上述函数相同的功能，唯一的区别是代码行数比上述代码少。尽管这也使代码的可读性降低。在使用Comparator时，我们为_Collections.sort()_ API传递一个运行时的匿名内部类：

```java
@Test
public void givenEmpList_SortEmpList_thenCheckSortedListDescLambda() {

    Collections.sort(employees, (emp1, emp2) -> emp2.getJoiningDate().compareTo(emp1.getJoiningDate()));
    assertEquals(employees, employeesSortedByDateDesc);
}
```

## 5. 结论

在本文中，我们探讨了如何在Java集合中按_日期对象_进行升序和降序排序。

我们还简要看到了Java 8 lambda特性，这些特性在排序中很有用，并有助于使代码更简洁。

一如既往，本文中使用的所有完整代码示例可以在GitHub上找到。