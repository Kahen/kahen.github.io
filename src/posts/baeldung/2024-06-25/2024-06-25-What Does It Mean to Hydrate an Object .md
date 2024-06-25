---
date: 2024-06-26
category:
  - Programming
  - Java
tag:
  - Object Hydration
  - Lazy Initialization
  - ORM Frameworks
head:
  - - meta
    - name: keywords
      content: Java对象, 延迟初始化, ORM框架, 数据填充
---
# 什么是对象水合化？ | Baeldung

## 1. 引言

在本教程中，我们将讨论在编程上下文中“水合化”一词的含义，并深入探讨水合化一个Java对象意味着什么。

## 2. 对象水合化

### 2.1. 延迟初始化

延迟加载或延迟初始化是软件应用程序中常用的模式。在Java中，对象是一个使用_new_关键字创建的类的实例。对象是程序的构建块，对象通过相互交互来实现所需的功能。

对象通常旨在表示面向对象编程范式中的现实世界实体，因此，对象具有多个相关属性。**对象初始化指的是用真实数据填充对象属性的过程。** 这通常是通过调用类构造函数并将数据作为参数传递来完成的。**初始化也可以从数据源如网络、数据库或文件系统进行。**

对象初始化有时可能是一个资源密集型操作，特别是当数据来自不同的数据源时。此外，对象在创建后并不总是立即被程序使用。

**在这种情况下，将对象初始化推迟到需要它的那一刻是一个好习惯。** 这种模式称为延迟初始化，因为我们首先创建一个带有空数据的对象，并在将来懒惰地用相关数据填充对象。**有意识地延迟数据初始化有助于提高代码性能和内存利用率。**

让我们创建一个具有多个属性的_User_类：

```java
public class User {
    private String uId;
    private String firstName;
    private String lastName;
    private String alias;
    // 构造函数，getter-setters
}
```

我们可以创建一个_User_对象并将其保留在内存中，而不使用有意义的数据填充其属性：

```java
User iamUser = new User();
```

### 2.2. 什么是水合化？

**有了延迟初始化，我们故意延迟已经创建并存在于内存中的对象的初始化过程。向现有空对象填充数据的过程称为水合化。**

我们创建的User实例是一个虚拟实例。该对象没有任何相关数据属性，因为在这一点上它还不需要。**要使对象有用，我们应该用相关领域数据填充对象，这可以通过用来自网络、数据库或文件系统等源的数据填充它来完成。**

我们按照以下步骤对用户实例进行水合化。我们首先将我们的水合逻辑编写为类级方法，该方法使用类的setter来设置相关数据。在我们的示例中，我们将使用我们的数据。然而，我们也可以从文件或类似源获取数据：

```java
public void generateMyUser() {
    this.setAlias("007");
    this.setFirstName("James");
    this.setLastName("Bond");
    this.setuId("JB");
}
```

**现在我们创建一个空的_User_实例，并在需要时，通过调用_generateMyUser()_方法来水合化同一个实例：**

```java
User jamesBond = new User();
// 执行水合化
jamesBond.generateMyUser();
```

我们可以通过断言其属性的状态来验证水合化的结果：

```java
User jamesBond = new User();
Assert.assertNull(jamesBond.getAlias());

jamesBond.generateMyUser();
Assert.assertEquals("007", jamesBond.getAlias());
```

## 3. 水合化和反序列化

水合化和反序列化不是同义词，我们不应该将它们互换使用。**反序列化是编程中用于恢复或重新创建对象的过程。** 我们经常存储或通过网络传输对象。在此过程中，序列化（将对象转换为字节流）和反序列化（恢复对象的反向过程）非常有用。

我们可以将_User_实例序列化到文件或等效物中：

```java
try {
    FileOutputStream fileOut = new FileOutputStream(outputName);
    ObjectOutputStream out = new ObjectOutputStream(fileOut);
    out.writeObject(user);
    out.close();
    fileOut.close();
} catch (IOException e) {
    e.printStackTrace();
}
```

同样，当需要时，我们可以从其序列化形式重新创建_User_实例：

```java
try {
    FileInputStream fileIn = new FileInputStream(serialisedFile);
    ObjectInputStream in = new ObjectInputStream(fileIn);
    deserializedUser = (User) in.readObject();
    in.close();
    fileIn.close();
} catch (IOException | ClassNotFoundException e) {
    e.printStackTrace();
}
```

很明显，水合化和反序列化都涉及处理对象并用数据填充它。**然而，两者之间的重要区别在于反序列化主要是创建实例并填充属性的单步过程。**

**另一方面，水合化只关心向预先形成的对象的属性添加数据。因此，反序列化是对象实例化和对象水合化的同一步骤。**

## 4. ORM框架中的水合化

一个ORM（对象关系映射）框架是一种软件开发范式，它使我们能够将面向对象编程与关系数据库结合起来。ORM框架促进了应用程序代码中的对象与关系数据库中的表之间的映射，并允许开发人员像使用本地对象一样与数据库实体交互。

对象水合化的概念在ORM框架中更为普遍，例如Hibernate或JPA。

让我们考虑一个JPA _Entity_类Book及其相应的_Repository_类如下：

```java
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    // 其他列和方法
}
```

```java
public interface BookRepository extends JpaRepository`<Book, Long>` { }
```

基于ORM原则，实体_Book_代表我们关系数据库中的一个表。实体与数据库的交互以我们上面定义的_BookRepository_接口的形式抽象化。类的实例代表表中的一行。

当我们使用众多内置的_find()_方法之一或使用自定义查询从数据库加载_Book_实例时，ORM框架执行几个步骤：

```java
Book aTaleOfTwoCities = bookRepository.findOne(1L);
```

**框架通过调用类的默认构造函数初始化一个空对象。** **一旦对象准备好，框架尝试从缓存存储加载属性数据。** 如果此时发生缓存未命中，框架将建立与数据库的连接并查询表以获取行。

**一旦获得ResultSet，框架将使用结果集对象水合化前述对象_aTaleOfTwoCities_，最后返回实例。**

## 5. 结论

在本文中，我们讨论了编程上下文中“水合化”一词的含义。我们看到了水合化与反序列化的区别。最后，我们探讨了ORM框架和普通对象模型中对象水合化的例子。

像往常一样，本文的代码可以在GitHub上找到。