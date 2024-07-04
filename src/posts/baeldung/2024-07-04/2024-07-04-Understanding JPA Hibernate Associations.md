---
date: 2022-04-01
category:
  - JPA
  - Hibernate
tag:
  - ORM
  - Associations
head:
  - - meta
    - name: keywords
      content: JPA, Hibernate, ORM, Associations, Java, Database, Relationships

---
# 理解JPA/Hibernate关联

Java持久化API（JPA）是Java应用程序的对象关系映射（ORM）规范。进一步来说，Hibernate是JPA规范的流行实现之一。

关联是ORM中的一个基本概念，允许我们定义实体之间的关系。在本教程中，我们将讨论JPA/Hibernate中单向和双向关联之间的区别。

## 1. 概述

单向关联通常用于面向对象编程，以建立实体之间的关系。然而，重要的是要注意，在单向关联中，只有一个实体持有对另一个实体的引用。

要在Java中定义单向关联，我们可以使用诸如@ManyToOne、@OneToMany、@OneToOne和@ManyToMany等注解。通过使用这些注解，我们可以在代码中创建两个实体之间清晰且明确定义的关系。

## 2. 单向关联

### 2.1. 一对多关系

在一对多关系中，一个实体对另一个实体的一个或多个实例有引用。

一个常见的例子是部门（Department）与其员工（Employee）之间的关系。每个部门有多个员工，但每个员工只属于一个部门。

让我们看看如何定义一对多单向关联：

```java
@Entity
public class Department {

    @Id
    private Long id;

    @OneToMany
    @JoinColumn(name = "department_id")
    private List``<Employee>`` employees;
}

@Entity
public class Employee {

    @Id
    private Long id;
}
```

在这里，部门实体有一个对员工实体列表的引用。@OneToMany注解指定这是一个一对多关联。@JoinColumn注解指定了员工表中引用部门表的外键列。

### 2.2. 多对一关系

在多对一关系中，一个实体的多个实例与另一个实体的一个实例相关联。

例如，考虑学生（Student）和学校（School）。每个学生只能在一个学校注册，但每个学校可以有多个学生。

让我们看看如何定义多对一单向关联：

```java
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private School school;
}

@Entity
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
```

在这种情况下，我们有一个学生和学校实体之间的多对一单向关联。@ManyToOne注解指定每个学生只能在一个学校注册，而@JoinColumn注解指定了连接学生和学校实体的外键列名称。

### 2.3. 一对一关系

在一对一关系中，一个实体的实例只与另一个实体的一个实例相关联。

一个常见的例子是员工（Employee）和停车位（ParkingSpot）。每个员工都有一个停车位，每个停车位属于一个员工。

让我们看看如何定义一对一单向关联：

```java
@Entity
public class Employee {

    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "parking_spot_id")
    private ParkingSpot parkingSpot;

}

@Entity
public class ParkingSpot {

    @Id
    private Long id;
}
```

在这里，员工实体有一个对停车位实体的引用。@OneToOne注解指定这是一个一对一关联。@JoinColumn注解指定了员工表中引用停车位表的外键列。

### 2.4. 多对多关系

在多对多关系中，一个实体的多个实例与另一个实体的多个实例相关联。

假设我们有两个实体——书籍（Book）和作者（Author）。每本书可以有多个作者，每个作者可以写多本书。在JPA中，这种关系使用@ManyToMany注解来表示。

让我们看看如何定义多对多单向关联：

```java
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToMany
    @JoinTable(name = "book_author",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id"))
    private Set`<Author>` authors;
}

@Entity
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
```

在这里，我们可以看到书籍和作者实体之间的多对多单向关联。@ManyToMany注解指定每本书可以有多个作者，每个作者可以写多本书。@JoinTable注解指定了连接书籍和作者实体的连接表的名称和外键列。

## 3. 双向关联

双向关联是两个实体之间的关系，每个实体都有对另一个实体的引用。

为了定义双向关联，我们在@OneToMany和@ManyToMany注解中使用mappedBy属性。然而，重要的是要注意，仅依赖单向关联可能不够，因为双向关联提供了额外的好处。

### 3.1. 一对多双向关联

在一对多双向关联中，一个实体对另一个实体有引用。此外，另一个实体有一个对第一个实体的引用集合。

例如，部门实体有一个员工实体的集合。同时，员工实体有一个对它所属部门的引用。

让我们看看如何创建一对多双向关联：

```java
@Entity
public class Department {

    @OneToMany(mappedBy = "department")
    private List``<Employee>`` employees;

}

@Entity
public class Employee {

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

}
```

在部门实体中，我们使用@OneToMany注解来指定部门实体和员工实体之间的关系。mappedBy属性指定了员工实体中拥有关系的属性的名称。在这种情况下，部门实体不拥有关系，因此我们指定mappedBy = "department"。

在员工实体中，我们使用@ManyToOne注解来指定员工实体和部门实体之间的关系。@JoinColumn注解指定了员工表中引用部门表的外键列名称。

### 3.2. 多对多双向关联

处理多对多双向关联时，重要的是要理解涉及的每个实体都将拥有对另一个实体的引用集合。

为了说明这个概念，让我们考虑一个学生实体，它有一个课程实体的集合，而课程实体反过来也有一个学生实体的集合。通过建立这样的双向关联，我们使两个实体都能意识到彼此，并使它们的关系更容易导航和管理。

以下是一个如何创建多对多双向关联的示例：

```java
@Entity
public class Student {

    @ManyToMany(mappedBy = "students")
    private List`<Course>` courses;

}

@Entity
public class Course {

    @ManyToMany
    @JoinTable(name = "course_student",
        joinColumns = @JoinColumn(name = "course_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id"))
    private List`<Student>` students;

}
```

在学生实体中，我们使用@ManyToMany注解来指定学生实体和课程实体之间的关系。mappedBy属性指定了课程实体中拥有关系的属性的名称。在这种情况下，课程实体拥有关系，因此我们指定mappedBy = "students"。

在课程实体中，我们使用@ManyToMany注解来指定课程实体和学生实体之间的关系。@JoinTable注解指定了存储关系的连接表的名称。

## 4. 单向与双向关联

面向对象编程中的单向和双向关联在两个类之间的关系方向上有所不同。

首先，单向关联只在一个方向上有关系，而双向关联在两个方向上都有关系。这种差异可以影响软件系统的设计和功能。例如，双向关联可以使在相关类之间导航更容易，但它们也可能引入更多的复杂性和潜在的错误。

另一方面，单向关联可能更简单，不太可能出错，但它们可能需要更多的变通方法来在相关类之间导航。

总的来说，理解单向和双向关联之间的区别对于做出关于软件系统设计和实施的明智决策至关重要。

以下是一张表格，总结了数据库中单向和双向关联的区别：

| | 单向关联 | 双向关联 |
| --- | --- | --- |
| 定义 | 两个表之间的关系，其中一个表有一个引用另一个表主键的外键。 | 两个表之间的关系，两个表都有引用另一个表主键的外键。 |
| 导航 | 只能在一个方向上导航——从子表到父表。 | 可以在两个方向上导航——从一个表到另一个表。 |
| 性能 | 由于表结构更简单，约束更少，通常更快。 | 由于额外的约束和表结构的复杂性，通常较慢。 |
| 数据一致性 | 通过子表中的外键约束来确保，引用父表中的主键。 | 通过子表中的外键约束来确保，引用父表中的主键。 |
| 灵活性 | 由于子表中的变更可能需要对父表架构进行更改，因此灵活性较低。 | 由于两个表中的任何一个都可以独立更改而不影响另一个，因此更加灵活。 |

**值得注意的是，实现的具体细节可能会根据所使用的数据库管理系统而变化**。然而，为了提供一般性的理解，上表概述了单向和双向关联之间的区别。

重要的是要认识到这些变化，因为它们可能对数据库系统的性能和功能产生重大影响。

## 5. 结论

在本文中，我们看到了选择单向或双向关联取决于软件的具体