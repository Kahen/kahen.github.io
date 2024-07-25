---
date: 2022-04-01
category:
  - Hibernate
  - Java
tag:
  - Hibernate
  - TransientObjectException
  - CascadeType
head:
  - - meta
    - name: keywords
      content: Hibernate, TransientObjectException, CascadeType, Java, unsaved transient instance
---
# Hibernate的“对象引用了一个未保存的瞬时实例”错误

在本教程中，我们将了解如何解决Hibernate中常见的错误——“org.hibernate.TransientObjectException: object references an unsaved transient instance”。当我们尝试持久化一个受管理的实体，并且该实体引用了一个未保存的瞬时实例时，就会从Hibernate会话中得到这个错误。

## 2. 问题描述

TransientObjectException是在用户将瞬时实例传递给期望持久实例的会话方法时抛出的。避免此异常的最直接解决方案是**通过持久化新实例或从数据库中获取一个实例，并在持久化之前将其与依赖实例关联**。然而，这样做只涵盖了这个特定场景，并没有考虑到其他用例。

为了涵盖所有场景，我们需要一个解决方案来**级联保存/更新/删除操作，以满足依赖于另一个实体存在的实体关系**。我们可以通过在实体关联中使用适当的CascadeType来实现这一点。

在接下来的部分中，我们将创建一些Hibernate实体及其关联，然后尝试持久化这些实体并查看为什么会话抛出异常。最后，我们将通过使用适当的CascadeType(s)来解决这些异常。

## 3. @OneToOne关联

在本节中，我们将了解如何在@OneToOne关联中解决TransientObjectException。

### 3.1. 实体

首先，我们创建一个User实体：

```java
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    // 标准getter和setter
}
```

然后创建关联的Address实体：

```java
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @OneToOne(mappedBy = "address")
    private User user;

    // 标准getter和setter
}
```

### 3.2. 产生错误

接下来，我们将添加一个单元测试来保存数据库中的User：

```java
@Test
public void whenSaveEntitiesWithOneToOneAssociation_thenSuccess() {
    User user = new User("Bob", "Smith");
    Address address = new Address("London", "221b Baker Street");
    user.setAddress(address);
    Session session = sessionFactory.openSession();
    session.beginTransaction();
    session.save(user);
    session.getTransaction().commit();
    session.close();
}
```

现在，当我们运行上述测试时，我们会得到一个异常：

```java
java.lang.IllegalStateException: org.hibernate.TransientObjectException: object references an unsaved transient instance - save the transient instance before flushing: com.baeldung.hibernate.exception.transientobject.entity.Address
```

在这个例子中，我们**将一个新的/瞬时Address实例与一个新的/瞬时User实例关联**。然后，当我们尝试持久化User实例时，我们得到了TransientObjectException，因为Hibernate会话期望Address实体是一个持久实例。换句话说，当持久化User时，Address应该已经被保存/在数据库中可用。

### 3.3. 解决错误

最后，让我们更新User实体，并为User-Address关联使用适当的CascadeType：

```java
@Entity
@Table(name = "user")
public class User {
    ...
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;
    ...
}
```

现在，每当我们保存/删除User时，Hibernate会话也会保存/删除关联的Address，并且会话不会抛出TransientObjectException。

## 4. @OneToMany和@ManyToOne关联

在本节中，我们将了解如何在@OneToMany和@ManyToOne关联中解决TransientObjectException。

### 4.1. 实体

首先，我们创建一个Employee实体：

```java
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    // 标准getter和setter
}
```

然后创建关联的Department实体：

```java
@Entity
@Table(name = "department")
public class Department {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "department")
    private Set``<Employee>`` employees = new HashSet<>();

    public void addEmployee(Employee employee) {
        employees.add(employee);
    }

    // 标准getter和setter
}
```

### 4.2. 产生错误

接下来，我们将添加一个单元测试来持久化数据库中的Employee：

```java
@Test
public void whenPersistEntitiesWithOneToManyAssociation_thenSuccess() {
    Department department = new Department();
    department.setName("IT Support");
    Employee employee = new Employee("John Doe");
    employee.setDepartment(department);

    Session session = sessionFactory.openSession();
    session.beginTransaction();
    session.persist(employee);
    session.getTransaction().commit();
    session.close();
}
```

现在，当我们运行上述测试时，我们会得到一个异常：

```java
java.lang.IllegalStateException: org.hibernate.TransientObjectException: object references an unsaved transient instance - save the transient instance before flushing: com.baeldung.hibernate.exception.transientobject.entity.Department
```

在这个例子中，我们**将一个新的/瞬时Employee实例与一个新的/瞬时Department实例关联**。然后，当我们尝试持久化Employee实例时，我们得到了TransientObjectException，因为Hibernate会话期望Department实体是一个持久实例。换句话说，当持久化Employee时，Department应该已经被保存/在数据库中可用。

### 4.3. 解决错误

最后，让我们更新Employee实体，并为Employee-Department关联使用适当的CascadeType：

```java
@Entity
@Table(name = "employee")
public class Employee {
    ...
    @ManyToOne
    @Cascade(CascadeType.SAVE_UPDATE)
    @JoinColumn(name = "department_id")
    private Department department;
    ...
}
```

让我们更新Department实体，以使用适当的CascadeType进行Department-Employees关联：

```java
@Entity
@Table(name = "department")
public class Department {
    ...
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set``<Employee>`` employees = new HashSet<>();
    ...
}
```

现在，通过在Employee-Department关联上使用**@Cascade(CascadeType.SAVE_UPDATE)**，每当我们关联一个新的Department实例与一个新的Employee实例并保存Employee时，Hibernate会话也会保存关联的Department实例。

同样，通过在Department-Employees关联上使用**cascade = CascadeType.ALL**，Hibernate会话将从Department级联所有操作到关联的Employee(s)。例如，删除一个Department将删除与该Department关联的所有Employee(s)。

## 5. @ManyToMany关联

在本节中，我们将了解如何在@ManyToMany关联中解决TransientObjectException。

### 5.1. 实体

让我们创建一个Book实体：

```java
@Entity
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @ManyToMany
    @JoinColumn(name = "author_id")
    private Set``<Author>`` authors = new HashSet<>();

    public void addAuthor(Author author) {
        authors.add(author);
    }

    // 标准getter和setter
}
```

然后创建关联的Author实体：

```java
@Entity
@Table(name = "author")
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @JoinColumn(name = "book_id")
    private Set``<Book>`` books = new HashSet<>();

    public void addBook(Book book) {
        books.add(book);
    }

    // 标准getter和setter
}
```

### 5.2. 产生问题

接下来，让我们添加一些单元测试来分别保存带有多个作者的Book和带有多本书的Author到数据库中：

```java
@Test
public void whenSaveEntitiesWithManyToManyAssociation_thenSuccess_1() {
    Book book = new Book("Design Patterns: Elements of Reusable Object-Oriented Software");
    book.addAuthor(new Author("Erich Gamma"));
    book.addAuthor(new Author("John Vlissides"));
    book.addAuthor(new Author("Richard Helm"));
    book.addAuthor(new Author("Ralph Johnson"));

    Session session = sessionFactory.openSession();
    session.beginTransaction();
    session.save(book);
session.getTransaction().commit();
    session.close();
}

@Test
public void whenSaveEntitiesWithManyToManyAssociation_thenSuccess_2() {
    Author author = new Author("Erich Gamma");
    author.addBook(new Book("Design Patterns: Elements of Reusable Object-Oriented Software"));
    author.addBook(new Book("Introduction to Object Orient Design in C"));

    Session session = sessionFactory.openSession();
    session.beginTransaction();
    session.save(author);
    session.getTransaction().commit();
    session.close();
}

}
```

现在，当我们运行上述测试时，我们分别得到以下异常：

```java
java.lang.IllegalStateException: org.hibernate.TransientObjectException: object references an unsaved transient instance - save the transient instance before flushing: com.baeldung.hibernate.exception.transientobject.entity.Author

java.lang.IllegalStateException: org.hibernate.TransientObjectException: object references an unsaved transient instance - save the transient instance before flushing: com.baeldung.hibernate.exception.transientobject.entity.Book
```

同样，在这些例子中，当我们将新/瞬时实例与一个实例关联并尝试持久化该实例时，我们得到了TransientObjectException。

### 5.3. 解决问题

最后，让我们更新Author实体，并为Author-s-Book s关联使用适当的CascadeType s：

```java
@Entity
@Table(name = "author")
public class Author {
    ...
    @ManyToMany
    @Cascade({ CascadeType.SAVE_UPDATE, CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "book_id")
    private Set``<Book>`` books = new HashSet<>();
    ...
}
```

同样，让我们更新Book实体，并为Book-s-Author s关联使用适当的CascadeType s：

```java
@Entity
@Table(name = "book")
public class Book {
    ...
    @ManyToMany
    @Cascade({ CascadeType.SAVE_UPDATE, CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "author_id")
    private Set``<Author>`` authors = new HashSet<>();
    ...
}
```

注意，我们不能在@ManyToMany关联中使用**CascadeType.ALL**，因为我们不想在删除Author时删除Book，反之亦然。

## 6. 结论

总之，本文展示了如何通过**定义适当的CascadeType来解决“org.hibernate.TransientObjectException: object references an unsaved transient instance”错误**。

如常，你可以在GitHub上找到这个例子的代码。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK