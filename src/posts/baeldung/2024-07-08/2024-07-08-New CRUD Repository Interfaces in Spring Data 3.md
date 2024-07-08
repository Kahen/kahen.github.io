---
date: 2022-04-01
category:
  - Spring Data
  - Java
tag:
  - CRUD
  - Repository
head:
  - - meta
    - name: keywords
      content: Spring Data 3, CRUD Repository, List-based, Paging, Sorting
---
# Spring Data 3中新的CRUD仓库接口

在本教程中，我们将探讨Spring Data 3中引入的新仓库接口。

Spring Data 3引入了基于列表的CRUD仓库接口，这些接口可以用来替代返回Iterable的现有CRUD仓库接口。此外，默认情况下，分页和排序接口不再继承原始的CRUD仓库，而是将这个选项留给用户。我们将看看这些接口与现有接口有何不同，以及如何使用它们。

### 2. 项目设置

让我们从设置我们的项目开始。我们将创建一个包含简单实体和使用新接口的仓库的Spring Boot应用程序。

#### 2.1. 依赖项

让我们首先向我们的项目添加所需的依赖项。我们将添加Spring Boot Starter Data依赖项：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-data-jpa``</artifactId>``
    `<version>`3.1.5`</version>`
``</dependency>``
```

除此之外，我们将配置数据库。可以使用任何SQL数据库。我们将在本教程中使用内存中的H2数据库。让我们添加相同的依赖项：

```xml
``<dependency>``
    ``<groupId>``com.h2database``</groupId>``
    ``<artifactId>``h2``</artifactId>``
``</dependency>``
```

### 2.2. 实体

让我们创建一个我们将在仓库中使用的实体_Book_：

```java
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String isbn;

    // 构造函数，getter和setter
}
```

现在我们已经拥有了我们的实体，让我们看看如何使用新接口与数据库交互。

### 3. 基于列表的CRUD仓库

**Spring Data 3引入了一套新的CRUD仓库接口，它们返回实体列表。** 这些接口与现有接口类似，除了它们返回的是_List_而不是_Iterable_。这使我们能够使用_List_接口的高级方法，如_get()_和_indexOf()_。

#### 3.1. 基于列表的仓库接口

Spring Data 3中新增了三个接口。

_ListCrudRepository_接口提供了基本CRUD操作的方法，如_save()_、_delete()_和_findById()_。_ListCrudRepository_与其基于Iterable的对应接口的关键区别在于**返回值现在是列表，这允许我们对返回的数据执行更高级的操作。**

_ListQuerydslPredicateExecutor_接口提供了使用Querydsl谓词执行查询的方法。Querydsl是一个框架，允许我们用Java编写类型安全的类似SQL的查询。**有了_ListQuerydslPredicateExecutor_，我们可以执行Querydsl查询并将结果作为列表返回。**

_ListQueryByExampleExecutor_接口提供了使用示例实体执行查询的方法，并返回结果作为列表。示例实体是一个包含我们要用来搜索其他实体的值的实体。例如，如果我们有一个标题为_Spring Data_的Book实体，我们可以创建一个标题为_Spring Data_的示例实体，并用它来搜索具有相同标题的其他书籍。

#### 3.2. _ListCrudRepository_

让我们详细看看_ListCrudRepository_接口。我们将创建一个使用此接口与数据库交互的仓库：

```java
@Repository
public interface BookListRepository extends ListCrudRepository```<Book, Long>``` {
    List````<Book>```` findBooksByAuthor(String author);
}
```

**上述仓库扩展了_ListCrudRepository_接口，它为我们提供了基本的CRUD方法。** 我们可以使用现有的仓库方法来保存、删除和查找数据库中的书籍。

除了这些方法，我们还定义了_findBooksByAuthor()_方法来按作者查找书籍。

#### 3.3. 使用基于列表的仓库接口

让我们看看如何使用这个仓库与数据库交互：

```java
@SpringBootTest
public class BookListRepositoryIntegrationTest {

    @Autowired
    private BookListRepository bookListRepository;

    @Test
    public void givenDbContainsBooks_whenFindBooksByAuthor_thenReturnBooksByAuthor() {
        Book book1 = new Book("Spring Data", "John Doe", "1234567890");
        Book book2 = new Book("Spring Data 2", "John Doe", "1234567891");
        Book book3 = new Book("Spring Data 3", "John Doe", "1234567892");
        bookListRepository.saveAll(Arrays.asList(book1, book2, book3));

        List````<Book>```` books = bookListRepository.findBooksByAuthor("John Doe");
        assertEquals(3, books.size());
    }
}
```

我们首先创建了三本书并将它们保存到数据库中。然后，我们使用_findBooksByAuthor()_方法查找所有作者为_John Doe_的书籍。最后，我们验证返回的列表是否包含我们创建的三本书。

**请注意，我们在返回的列表上调用了_size()_方法。如果仓库使用了基于Iterable的接口，这是不可能的，因为_Iterable_接口不提供_size()_方法。**

### 4. 排序仓库

为了能够使用新的基于列表的接口，Spring Data 3不得不对现有的排序接口进行更改。**排序仓库不再扩展旧的CRUD仓库了。** 相反，**用户可以选择扩展新的基于列表的接口或基于Iterable的接口以及排序接口。** 让我们看看如何使用最新的排序接口。

#### 4.1. _PagingAndSortingRepository_

让我们详细看看_PagingAndSortingRepository_接口。我们将创建一个使用此接口与数据库交互的仓库：

```java
@Repository
public interface BookPagingAndSortingRepository extends PagingAndSortingRepository```<Book, Long>```, ListCrudRepository```<Book, Long>``` {

    List````<Book>```` findBooksByAuthor(String author, Pageable pageable);
}
```

上述仓库扩展了_ListCrudRepository_接口，为我们提供了基本的CRUD方法。除此之外，**我们还扩展了_PagingAndSortingRepository_接口，它为我们提供了排序和分页的方法。**

在Spring Data的旧版本中，我们不需要显式扩展CRUD仓库接口。只有排序和分页接口就足够了。我们定义了一个新的方法_findBooksByAuthor()_，它接受一个_Pageable_参数并返回一列书籍。在下一节中，我们将看看如何使用这种方法来排序和分页结果。

#### 4.2. 使用排序仓库接口

让我们看看如何使用这个仓库与数据库交互：

```java
@SpringBootTest
public class BookPagingAndSortingRepositoryIntegrationTest {

    @Autowired
    private BookPagingAndSortingRepository bookPagingAndSortingRepository;

    @Test
    public void givenDbContainsBooks_whenfindBooksByAuthor_thenReturnBooksByAuthor() {
        Book book1 = new Book("Spring Data", "John Doe", "1234567890");
        Book book2 = new Book("Spring Data 2", "John Doe", "1234567891");
        Book book3 = new Book("Spring Data 3", "John Doe", "1234567892");
        bookPagingAndSortingRepository.saveAll(Arrays.asList(book1, book2, book3));

        Pageable pageable = PageRequest.of(0, 2, Sort.by("title").descending());
        List````<Book>```` books = bookPagingAndSortingRepository.findBooksByAuthor("John Doe", pageable);
        assertEquals(2, books.size());
        assertEquals(book3.getId(), books.get(0).getId());
        assertEquals(book2.getId(), books.get(1).getId());
    }
}
```

就像之前一样，我们首先创建了三本书并将它们保存到数据库中。然后，我们使用_findBooksByAuthor()_方法查找所有作者为_John Doe_的书籍。但这次，我们向方法传递了一个_Pageable_对象，以按标题降序排序结果并只返回前两个结果。

最后，我们验证返回的列表是否包含我们创建的两本书。我们还验证了这些书籍是否按标题降序排序，以便标题为_Spring Data 3_的书籍首先返回，其次是标题为_Spring Data 2_的书籍。

#### 4.3. 其他排序接口

除了_PagingAndSortingRepository_接口外，以下接口也发生了变化：

- _ReactiveSortingRepository_不再继承自_ReactiveCrudRepository_
- _CoroutineSortingRepository_不再继承自_CoroutineCrudRepository_
- _RxJavaSortingRepository_不再继承自_RxJavaCrudRepository_

### 5. 结论

在本文中，我们探讨了Spring Data 3中新增的基于列表的接口。我们研究了如何使用这些接口与数据库交互。我们还研究了为能够使用新的基于列表的接口而对现有排序接口所做的更改。

本文的代码示例可以在GitHub上找到。