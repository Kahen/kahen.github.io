---
date: 2024-06-26
category:
  - Java
  - Software Development
tag:
  - Entity
  - DTO
head:
  - - meta
    - name: keywords
      content: Java, Entity, DTO, Software Development
---
# 实体与数据传输对象（DTO）的区别

在软件开发领域，实体（Entities）和数据传输对象（DTOs）之间有明显的区别。了解它们确切的角色和差异可以帮助我们构建更高效和可维护的软件。

在本文中，我们将探讨实体和DTOs之间的区别，并尝试提供对它们目的的清晰理解，以及何时在我们的软件项目中使用它们。在讨论每个概念时，我们将使用Spring Boot和JPA来构建一个简单的用户管理应用程序。

实体是我们应用程序领域中真实世界对象或概念的基本组成部分。它们通常直接对应于数据库表或领域对象。因此，它们的主要目的是封装和管理这些对象的状态和行为。

### 2.1 实体示例

让我们为我们的项目创建一些实体，代表一个拥有多本书的用户。我们将从创建_Book_实体开始：

```java
@Entity
@Table(name = "books")
public class Book {

    @Id
    private String name;
    private String author;

    // 标准构造函数 / 获取器 / 设置器
}
```

现在，我们需要定义我们的_User_实体：

```java
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String address;

    @OneToMany(cascade=CascadeType.ALL)
    private List`<Book>` books;

    public String getNameOfMostOwnedBook() {
        Map`<String, Long>` bookOwnershipCount = books.stream()
              .collect(Collectors.groupingBy(Book::getName, Collectors.counting()));
        return bookOwnershipCount.entrySet().stream()
              .max(Map.Entry.comparingByValue())
              .map(Map.Entry::getKey)
              .orElse(null);
    }

    // 标准构造函数 / 获取器 / 设置器
}
```

### 2.2 实体特性

在我们的实体中，我们可以识别一些独特的特性。首先，实体通常包含对象关系映射（ORM）注解。例如，_@Entity_注解将类标记为实体，创建Java类和数据库表之间的直接链接。

_@Table_注解用于指定与实体关联的数据库表的名称。此外，_@Id_注解定义一个字段作为主键。这些ORM注解简化了数据库映射的过程。

此外，实体通常需要与他实体建立关系，反映现实世界概念之间的关联。一个常见的例子是我们使用的_@OneToMany_注解，用于定义用户和他拥有的书籍之间的一对多关系。

此外，实体不必仅作为被动数据对象，还可以包含特定领域的业务逻辑。例如，考虑一个名为_getNameOfMostOwnedBook()_的方法。此方法位于实体内部，封装特定领域的逻辑以找到用户拥有最多的书籍的名称。这种方法符合OOP原则和DDD方法，通过将特定领域的操作保留在实体中，促进代码组织和封装。

此外，实体可能还包含其他特殊性，例如验证约束或生命周期方法。

## 3. DTOs

DTOs主要作为纯数据载体，没有任何业务逻辑。它们用于在不同应用程序或同一应用程序的不同部分之间传输数据。

在简单的应用程序中，通常直接使用领域对象作为DTOs。然而，随着应用程序复杂性的增长，从安全和封装的角度来看，向外部客户端公开整个领域模型可能变得不那么可取。

### 3.1 DTO示例

为了使我们的应用程序尽可能简单，我们将只实现创建新用户和检索当前用户的功能。为此，让我们首先创建一个DTO来表示一本书：

```java
public class BookDto {

    @JsonProperty("NAME")
    private final String name;

    @JsonProperty("AUTHOR")
    private final String author;

    // 标准构造函数 / 获取器
}
```

对于用户，让我们定义两个DTOs。一个用于创建用户，另一个用于响应目的：

```java
public class UserCreationDto {

    @JsonProperty("FIRST_NAME")
    private final String firstName;

    @JsonProperty("LAST_NAME")
    private final String lastName;

    @JsonProperty("ADDRESS")
    private final String address;

    @JsonProperty("BOOKS")
    private final List``<BookDto>`` books;

    // 标准构造函数 / 获取器
}
```

```java
public class UserResponseDto {

    @JsonProperty("ID")
    private final Long id;

    @JsonProperty("FIRST_NAME")
    private final String firstName;

    @JsonProperty("LAST_NAME")
    private final String lastName;

    @JsonProperty("BOOKS")
    private final List``<BookDto>`` books;

    // 标准构造函数 / 获取器
}
```

### 3.2 DTO特性

根据我们的示例，我们可以识别一些特性：不可变性、验证注解和JSON映射注解。

使DTOs不可变是一种最佳实践。不可变性确保在传输过程中数据不会被意外更改。实现这一点的一种方法是通过声明所有属性为_final_并不实现_setters_。或者，可以使用**Lombok**的_@Value_注解或Java 14中引入的Java _records_，以简洁的方式创建不可变的DTOs。

接下来，DTOs也可以从验证中受益，以确保通过DTOs传输的数据满足特定标准。这样，我们可以在数据传输过程中尽早检测和拒绝无效数据，**防止不可靠的信息污染领域**。

此外，我们通常可以在DTOs中找到**JSON映射注解**，**将JSON属性映射到我们的DTOs的字段**。例如，_@JsonProperty_注解允许我们指定DTOs的JSON名称。

## 4. 存储库、映射器和控制器

为了演示在应用程序中同时使用实体和DTOs表示数据的效用，我们需要完成我们的代码。我们将从为我们的_User_实体创建一个存储库开始：

```java
@Repository
public interface UserRepository extends JpaRepository`<User, Long>` {
}
```

接下来，我们将创建一个映射器，以便能够相互转换：

```java
public class UserMapper {

    public static UserResponseDto toDto(User entity) {
        return new UserResponseDto(
          entity.getId(),
          entity.getFirstName(),
          entity.getLastName(),
          entity.getBooks().stream().map(UserMapper::toDto).collect(Collectors.toList())
        );
    }

    public static User toEntity(UserCreationDto dto) {
        return new User(
          dto.getFirstName(),
          dto.getLastName(),
          dto.getAddress(),
          dto.getBooks().stream().map(UserMapper::toEntity).collect(Collectors.toList())
        );
    }

    public static BookDto toDto(Book entity) {
        return new BookDto(entity.getName(), entity.getAuthor());
    }

    public static Book toEntity(BookDto dto) {
        return new Book(dto.getName(), dto.getAuthor());
    }
}
```

在我们的示例中，我们在实体和DTOs之间手动进行了映射。对于更复杂的模型，为了避免样板代码，我们可以使用像**MapStruct**这样的工具。

现在，我们只需要创建控制器：

```java
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List`<UserResponseDto>` getUsers() {
        return userRepository.findAll().stream().map(UserMapper::toDto).collect(Collectors.toList());
    }

    @PostMapping
    public UserResponseDto createUser(@RequestBody UserCreationDto userCreationDto) {
        return UserMapper.toDto(userRepository.save(UserMapper.toEntity(userCreationDto)));
    }
}
```

请注意，使用_findAll()_可能会对大型集合的性能产生影响。在这些情况下，包括类似分页的东西可能会有所帮助。

## 5. 为什么我们需要实体和DTOs？

### 5.1. 职责分离

在我们的示例中，**实体与数据库架构和特定领域的操作紧密相关**。另一方面，**DTOs仅设计用于数据传输目的**。

在某些架构范式中，如六边形架构，我们可能会发现一个额外的层，通常称为模型或领域模型。这层的重要作用是完全将领域与任何侵入性技术解耦。这样，核心业务逻辑就独立于数据库、框架或外部系统的实现细节。

### 5.2. 隐藏敏感数据

在处理外部客户端或系统时，控制向外部世界暴露哪些数据至关重要。实体可能包含敏感信息或业务逻辑，这些信息或逻辑应该对外部消费者保持隐藏。DTOs作为屏障，帮助我们只向客户端暴露安全和相关的数据。

### 5.3. 性能

DTO模式，正如Martin Fowler所介绍的，涉及在单个调用中批量多个参数。我们不是通过多次调用获取单个数据片段，而是可以将相关数据捆绑到DTO中，并在单个请求中传输。**这种方法减少了与多个网络调用相关的开销**。

实现DTO模式的一种方式是通过**GraphQL**，它允许客户端指定它所需的数据，允许在单个请求中进行多个查询。

## 6. 结论

**正如我们在整个文章中学到的，实体和DTOs具有不同的角色，可以非常不同**。实体和DTOs的结合确保了数据安全、职责分离和复杂软件系统中的高效数据管理。这种方法导致更健壮和可维护的软件解决方案。

如常，源代码可在GitHub上获得。