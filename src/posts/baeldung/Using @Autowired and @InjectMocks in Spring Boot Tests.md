---
date: 2024-06-14
category:
  - Spring Boot
  - Testing
tag:
  - Autowired
  - InjectMocks
---
# 使用Spring Boot测试中的@Autowired和@InjectMocks | Baeldung

在本教程中，我们将探讨在Spring Boot测试中使用Spring Boot的@Autowired和Mockito的@InjectMocks注入依赖项的使用情况。我们将讨论需要使用它们的用例，并查看相同的例子。

### 2. 理解测试注解

在开始代码示例之前，让我们快速看一下一些测试注解的基础知识。

首先，Mockito最常用的@Mock注解为测试创建了一个依赖项的模拟实例。**它经常与@InjectMocks结合使用，后者将标记有@Mock的模拟注入到正在测试的目标对象中。**

除了Mockito的注解，Spring Boot的注解@MockBean可以帮助创建一个模拟的Spring bean。然后，模拟的bean可以被上下文中的其他bean使用。**此外，如果Spring上下文自己创建了可以在不模拟的情况下使用的bean，我们可以使用@Autowired注解来注入它们。**

### 3. 示例设置

在我们的代码示例中，我们将创建一个服务，它有两个依赖项。然后，我们将探索使用上述注解来测试服务。

#### 3.1. 依赖项

让我们首先添加所需的依赖项。我们将包括Spring Boot Starter Web和Spring Boot Starter Test依赖项：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>3.2.5</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <version>3.2.5</version>
    <scope>test</scope>
</dependency>
```

除此之外，我们还将添加我们将需要模拟我们的服务的Mockito Core依赖项：

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.11.0</version>
</dependency>
```

#### 3.2. DTO

接下来，让我们创建一个DTO，我们将在服务中使用它：

```java
public class Book {
    private String id;
    private String name;
    private String author;

    // 构造函数，setters/getters
}
```

#### 3.3. 服务

接下来，让我们看看我们的服务。首先，让我们定义一个负责数据库交互的服务：

```java
@Service
public class DatabaseService {
    public Book findById(String id) {
        // 查询数据库并获取一本书
        return new Book("id","Name", "Author");
    }
}
```

我们不会深入数据库交互，因为它们与示例无关。我们使用@Service注解来声明这个类为Spring bean的Service原型。

接下来，让我们引入一个依赖上述服务的服务：

```java
@Service
public class BookService {
    private DatabaseService databaseService;
    private ObjectMapper objectMapper;

    BookService(DatabaseService databaseService, ObjectMapper objectMapper) {
        this.databaseService = databaseService;
        this.objectMapper = objectMapper;
    }

    String getBook(String id) throws JsonProcessingException {
        Book book = databaseService.findById(id);
        return objectMapper.writeValueAsString(book);
    }
}
```

在这里，我们有一个小服务，它有一个getBook()方法。该方法利用DatabaseService从数据库中获取一本书。然后，它使用Jackson的ObjectMapper API将Book对象转换并返回为JSON字符串。

因此，此服务有两个依赖项：DatabaseService和ObjectMapper。当我们使用spring-boot-starter-web依赖项时，ObjectMapper bean会自动由Spring Boot创建。

### 4. 测试

现在我们的服务已经设置好了，让我们看看如何使用我们之前定义的注解来测试BookService。

#### 4.1. 使用@Mock和@InjectMocks

第一种选择是使用@Mock模拟服务的两个依赖项，并使用@InjectMocks将它们注入到服务中。让我们为同样创建一个测试类：

```java
@SpringBootTest
class BookServiceMockAndInjectMocksUnitTest {
    @Mock
    private DatabaseService databaseService;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private BookService bookService;

    @Test
    void givenBookService_whenGettingBook_thenBookIsCorrect() throws JsonProcessingException {
        Book book1 = new Book("1234", "Inferno", "Dan Brown");
        when(databaseService.findById(eq("1234"))).thenReturn(book1);

        when(objectMapper.writeValueAsString(any())).thenReturn(new ObjectMapper().writeValueAsString(book1));

        String bookString1 = bookService.getBook("1234");
        Assertions.assertTrue(bookString1.contains("Dan Brown"));
    }
}
```

首先，我们用@SpringBootTest注解测试类。这表示在运行测试之前将加载应用程序上下文。当使用@InjectMocks替换Spring bean依赖项时需要这样做。

接下来，我们声明DatabaseService和ObjectMapper字段，并用@Mock注解它们。这为它们两个创建了模拟对象。**我们在声明我们将要测试的BookService实例时添加了@InjectMocks注解。这将注入服务所需的任何依赖项，这些依赖项已经用@Mocks声明过了。**

最后，在我们的测试中，我们模拟我们模拟对象的行为，并测试我们服务的getBook()方法。

**使用这种方法时，必须模拟服务的所有依赖项。** 例如，如果我们没有模拟ObjectMapper，当在测试方法中调用它时，会导致NullPointerException。

#### 4.2. 使用@Autowired与@MockBean

在上述方法中，我们模拟了两个依赖项。然而，可能需要模拟一些依赖项而不是全部。假设我们不需要模拟ObjectMapper的行为，只模拟DatabaseService。

由于我们在测试中加载了Spring上下文，我们可以使用@Autowired和@MockBean注解的组合来实现：

```java
@MockBean
private DatabaseService databaseService;

@Autowired
private BookService bookService;

@Test
void givenBookService_whenGettingBook_thenBookIsCorrect() throws JsonProcessingException {
    Book book1 = new Book("1234", "Inferno", "Dan Brown");
    when(databaseService.findById(eq("1234"))).thenReturn(book1);

    String bookString1 = bookService.getBook("1234");
    Assertions.assertTrue(bookString1.contains("Dan Brown"));
}
```

我们用@MockBean注解DatabaseService。然后我们使用@Autowired从应用程序上下文中获取BookService实例。

**当注入BookService bean时，实际的DatabaseService bean将被模拟的bean替换。** 相反，ObjectMapper bean保持与应用程序最初创建的相同。

现在当我们测试这个实例时，我们不需要为ObjectMapper模拟任何行为。

这种方法在我们需要测试嵌套bean的行为并且不想模拟每个依赖项时非常有用。

#### 4.3. 一起使用@Autowired和@InjectMocks

我们也可以在上述用例中使用@InjectMocks代替@MockBean。

让我们看看代码，看看两种方法之间的区别：

```java
@Mock
private DatabaseService databaseService;

@Autowired
@InjectMocks
private BookService bookService;

@Test
void givenBookService_whenGettingBook_thenBookIsCorrect() throws JsonProcessingException {
    Book book1 = new Book("1234", "Inferno", "Dan Brown");

    MockitoAnnotations.openMocks(this);

    when(databaseService.findById(eq("1234"))).thenReturn(book1);
    String bookString1 = bookService.getBook("1234");
    Assertions.assertTrue(bookString1.contains("Dan Brown"));
}
```

在这里，我们使用@Mock而不是@MockBean来模拟DatabaseService。除了@Autowired，我们在BookService实例上添加了@InjectMocks注解。

当同时使用两个注解时，@InjectMocks不会自动注入模拟的依赖项，而是在测试开始时注入自动装配的BookService对象。

**然而，我们可以通过调用MockitoAnnotations.openMocks()方法稍后在我们的测试中注入模拟的DatabaseService实例。** 这个方法查找用@InjectMocks标记的字段，并将模拟对象注入其中。

我们在测试中需要模拟DatabaseService的行为之前调用它。这种方法在我们想要动态决定何时使用模拟以及何时使用实际的bean来覆盖依赖项时非常有用。

## 5. 方法比较

现在我们已经看了多种方法，让我们总结一下它们之间的比较：

| 方法 | 描述 | 使用 |
| --- | --- | --- |
| @Mock与@InjectMocks | 使用Mockito的@Mock注解创建依赖项的模拟实例，并使用@InjectMocks将这些模拟注入到正在测试的目标对象中。 | 适用于单元测试，其中我们想要模拟测试类的所有依赖项。 |
| @MockBean与@Autowired | 利用Spring Boot的@MockBean注解创建模拟的Spring bean，并使用@Autowired来注入这些bean。 | 适用于Spring Boot应用程序的集成测试。它允许我们在Spring的依赖注入中模拟一些Spring bean，同时获取其他bean。 |
| @InjectMocks与@Autowired | 使用Mockito的@Mock注解创建模拟实例，并使用@InjectMocks将这些模拟注入到已经使用Spring自动装配的目标bean中。 | 在我们需要使用Mockito临时模拟一些依赖项以覆盖注入的Spring Beans的场景中提供灵活性。适用于测试Spring应用程序中的复杂场景。 |

## 6. 结论

在本文中，我们查看了Mockito和Spring Boot注解的不同用例——@Mock、@InjectMocks、@Autowired和@MockBean。我们探讨了根据我们的测试需求的需要使用不同组合的注解。

正如往常一样，本教程的代码示例可在GitHub上找到。