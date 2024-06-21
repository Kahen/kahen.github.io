---
date: 2024-06-20
category:
  - Testing
  - Mockito
tag:
  - Mockito
  - Testing
  - Java
head:
  - - meta
    - name: keywords
      content: Mockito, Testing, Java, Spy, InjectMocks
------
# Mockito 多级模拟注入到Spy对象

在本教程中，我们将讨论众所周知的Mockito注解_@InjectMocks_、_@Mock_和_@Spy_，并理解它们在多级注入场景中的协同工作方式。我们将讨论重要的测试概念，并学习如何进行适当的测试配置。

## 2. 多级注入概念
多级注入是一个强大的概念，但如果误用可能会很危险。让我们在继续实现之前回顾一下重要的理论概念。

### 2.1. 单元测试概念
**根据定义，单元测试是覆盖源代码一个单元的测试。** 在Java世界中，我们可以将单元测试视为覆盖某个特定类—服务、仓库、工具等的测试。

在测试一个类时，我们只想测试它的业务逻辑，而不是它的依赖项的行为。为了处理依赖项，例如，模拟它们或验证它们的使用，我们通常使用模拟框架—Mockito。它被设计为扩展现有的测试引擎（JUnit、TestNG），并帮助为具有多个依赖项的类构建适当的单元测试。

### 2.2. @ _Spy_ 概念
_Spy_ 是Mockito的一个重要支柱，它有助于有效地处理依赖项。

_Mock_ 是一个完整的存根，在调用方法时不执行任何操作，也不会触及实际对象。相反，_Spy_ 默认将所有调用委托给实际对象的方法。并且当指定时，spy方法可以表现得像一个mock，并拥有其所有特性。

**我们需要根据其默认行为设置spy对象的必要依赖项，因为它是一个真实对象。** Mockito尝试隐式地将依赖项注入到spy对象中。然而，当需要时，我们可以显式设置依赖项。

### 2.3. 多级注入风险
Mockito中的多级注入指的是测试类需要一个spy，而这个spy依赖于特定的mock进行注入，从而创建了一个嵌套的注入结构。

在某些场景中，我们可能面临多级模拟的需求。例如，我们正在测试某个_ServiceA_，它依赖于某个复杂的_MapperA_，而_MapperA_又依赖于不同的_ServiceB_。通常，将_MapperA_作为spy并注入_ServiceB_作为mock会更容易。然而，这种方法打破了单元测试的概念。**当我们需要在一个测试中覆盖多个服务时，我们应该坚持使用完整的集成测试。**

**如果我们经常需要多级注入，这可能是测试方法不正确或代码设计复杂的迹象，应该进行重构。**

## 3. 设置一个示例场景
在我们继续测试用例之前，让我们定义一个示例代码，展示我们如何使用Mockito来测试我们的代码库。

我们将使用图书馆的概念，其中有一个主要的_Book_实体，它被多个服务处理。这里最重要的收获是类之间的依赖关系。

处理的入口点是_BookStorageService_，它旨在存储有关借出/归还书籍的信息，并通过_BookControlService_验证书籍状态：

```java
public class BookStorageService {
    private BookControlService bookControlService;
    private final List`<Book>` availableBooks;
}
```

另一方面，_BookControlService_依赖于另外两个类，_StatisticService_和_RepairService_，它们应该计算处理过的书籍数量，并检查书籍是否应该被修理：

```java
public class BookControlService {
    private StatisticService statisticService;
    private RepairService repairService;
}
```

## 4. 深入了解_@InjectMocks_注解
当我们考虑将一个Mockito管理的类注入到另一个类中时，_@InjectMocks_注解看起来是最直观的机制。然而，它的能力是有限。文档强调，Mockito不应被视为依赖注入框架。**它不是为处理对象网络的复杂注入而设计的。**

此外，Mockito不会报告任何注入失败。换句话说，当Mockito无法将mock注入到字段时，该字段将保持null。因此，如果测试类设置不正确，我们将最终遇到多个_NullPointerException_ (NPE)。

**_@InjectMocks_在不同的配置中表现不同，并非每种设置都能按预期工作。** 让我们详细回顾一下注解使用的特点。

### 4.1. _@InjectMocks_和@ _Spy_ 不起作用的配置
在一个类中使用多个_@InjectMocks_注解可能是直观的：

```java
public class MultipleInjectMockDoestWorkTest {
    @InjectMocks
    private BookStorageService bookStorageService;
    @Spy
    @InjectMocks
    private BookControlService bookControlService;
    @Mock
    private StatisticService statisticService;
}
```

这种配置的目的是将_statisticService_ mock注入到_bookControlService_ spy中，并将_bookControlService_注入到_bookStorageService_中。**然而，这种配置不起作用，并在较新的Mockito版本中导致NPE。**

在幕后，框架的当前版本（5.10.0）将所有注解对象收集到两个集合中。第一个集合是用于带有_@InjectMocks_注解的mock依赖字段（_bookStorageService_和_bookControlService_）。

第二个集合是所有候选注入实体，它们都是mock和合格的spy。**然而，同时标记为@ _Spy_ 和 _@InjectMock_ 的字段永远不会被视为注入候选。** 结果是，Mockito不知道应该将_bookControlService_注入到_bookStorageService_中。

上述配置的另一个问题是概念上的。使用_@InjectMocks_注解，我们针对两个类（_BookStorageService_和_BookControlService_）进行测试，这违反了单元测试方法。

### 4.2. _@InjectMocks_和_@Spy_ 起作用的配置
同时，只要类中只有一个_@InjectMocks_注解，就没有限制使用_@Spy_和_@InjectMocks_一起：

```java
@Spy
@InjectMocks
private BookControlService bookControlService;
@Mock
private StatisticService statisticService;
@Spy
private RepairService repairService;
```

有了这种配置，我们就有了一个正确构建且可测试的层次结构：

```java
@Test
void whenOneInjectMockWithSpy_thenHierarchySuccessfullyInitialized(){
    Book book = new Book("Some name", "Some author", 355, ZonedDateTime.now());
    bookControlService.returnBook(book);

    Assertions.assertNull(book.getReturnDate());
    Mockito.verify(statisticService).calculateAdded();
    Mockito.verify(repairService).shouldRepair(book);
}
```

## 5. 通过@InjectMocks和手动Spy进行多级注入
**解决多级注入的一个选项是在Mockito初始化之前手动实例化spy对象。** 正如我们已经讨论的，Mockito不能将所有依赖项注入到同时带有_@Spy_和_@InjectMocks_注解的字段中。然而，即使这个对象是spy，框架也可以将依赖项注入到仅带有_@InjectMocks_注解的对象中。

我们可以使用_@ExtendWith(MockitoExtension.class)_在类级别上，并在字段中初始化spy：

```java
@InjectMocks
private BookControlService bookControlService = Mockito.spy(BookControlService.class);
```

或者我们可以使用_MockitoAnnotations.openMocks(this)_并在_@BeforeEach_方法中初始化spy：

```java
@BeforeEach
public void openMocks() {
    bookControlService = Mockito.spy(BookControlService.class);
    closeable = MockitoAnnotations.openMocks(this);
}
```

**在这两种情况下，spy应该在Mockito初始化之前创建。**

有了上述设置，Mockito处理手动创建的spy上的_@InjectMocks_并注入所有需要的mocks：

```java
@InjectMocks
private BookStorageService bookStorageService;
@InjectMocks
private BookControlService bookControlService;
@Mock
private StatisticService statisticService;
@Mock
private RepairService repairService;
```

测试成功执行：

```java
@Test
void whenSpyIsManuallyCreated_thenInjectMocksWorks() {
    Book book = new Book("Some name", "Some author", 355);
    bookStorageService.returnBook(book);

    Assertions.assertEquals(1, bookStorageService.getAvailableBooks().size());
    Mockito.verify(bookControlService).returnBook(book);
    Mockito.verify(statisticService).calculateAdded();
    Mockito.verify(repairService).shouldRepair(book);
}
```

## 6. 通过反射进行多级注入
处理复杂测试设置的另一种可能方法是手动创建所需的spy对象，然后将其注入到被测试对象中。**利用反射机制，我们可以更新Mockito创建的对象所需的spy。**

以下示例中，我们没有用@ _InjectMocks_注解_BookControlService_，而是手动配置了一切。为确保在spy初始化期间Mockito创建的mocks可用，必须首先初始化Mockito上下文。否则，在mocks被使用的地方可能会发生_NullPointerException_。

一旦_BookControlService_ spy配置了所有mocks，我们就通过反射将其注入到_BookStorageService_中：

```java
@InjectMocks
private BookStorageService bookStorageService;
@Mock
private StatisticService statisticService;
@Mock
private RepairService repairService;
private BookControlService bookControlService;

@BeforeEach
public void openMocks() throws Exception {
    bookControlService = Mockito.spy(new BookControlService(statisticService, repairService));
    injectSpyToTestedMock(bookStorageService, bookControlService);
}

private void injectSpyToTestedMock(BookStorageService bookStorageService, BookControlService bookControlService)
  throws NoSuchFieldException, IllegalAccessException {
    Field bookControlServiceField = BookStorageService.class.getDeclaredField("bookControlService");
    bookControlServiceField.setAccessible(true);
    bookControlServiceField.set(bookStorageService, bookControlService);
}

```

有了这样的配置，我们可以验证_repairService_和_bookControlService_的行为。

## 7. 结论
在本文中，我们回顾了重要的单元测试概念，并学习了如何使用_@InjectMocks_、_@Spy_和_@Mock_注解来执行复杂的多级注入。我们发现spy可以手动配置，并且可以将其注入到被测试对象中。

如常，完整的示例可以在GitHub上找到。

文章发布后30天内开放评论。对于发布日期之后的任何问题，请使用网站上的联系表单。

OK