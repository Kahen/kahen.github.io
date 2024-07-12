---
date: 2022-04-01
category:
  - Spring
  - JUnit
tag:
  - SpringRunner
  - MockitoJUnitRunner
head:
  - - meta
    - name: keywords
      content: SpringRunner, MockitoJUnitRunner, JUnit, Spring, 单元测试, Mock
---
# SpringRunner与MockitoJUnitRunner的比较

JUnit是Java中最受欢迎的单元测试框架之一。此外，Spring Boot将其作为其应用程序的默认测试依赖项提供。

在本教程中，我们将比较两种JUnit runner——SpringRunner和MockitoJUnitRunner。我们将理解它们的目的以及它们之间的关键区别。

## 2. @RunWith与@ExtendWith

在我们进一步讨论之前，让我们回顾一下我们如何扩展JUnit的基本功能或将其与其他库集成。

**JUnit 4允许我们实现自定义Runner类**，通过应用额外的功能来负责运行测试。要调用自定义runner，我们使用@RunWith注解来注解测试类：

```java
@RunWith(CustomRunner.class)
class JUnit4Test {
    // ...
}
```

众所周知，JUnit 4现在处于遗留状态，由JUnit 5接替。新版本为我们带来了一个全新的引擎和重写的API。它还改变了扩展模型的概念。我们现在不是实现自定义Runner或Rule类，而是可以使用**扩展API和@ExtendWith注解**：

```java
@ExtendWith(CustomExtensionOne.class)
@ExtendWith(CustomExtensionTwo.class)
class JUnit5Test {
    // ...
}
```

与以前的runner模型不同，我们现在可以为单个类提供多个扩展。大多数以前提供的runner也已经被重写为它们的扩展对应物。

## 3. Spring示例应用程序

为了更好地理解，让我们引入一个简单的Spring Boot应用程序——一个将给定字符串转换为大写的转换器。

让我们首先实现一个数据提供者：

```java
@Component
public class DataProvider {

    private final List```<String>``` memory = List.of("baeldung", "java", "dummy");

    public Stream```<String>``` getValues() {
        return memory.stream();
    }
}
```

我们刚刚创建了一个带有硬编码字符串值的Spring组件。此外，它提供了一个方法来流式传输这些字符串。

其次，让我们实现一个服务类来转换我们的值：

```java
@Service
public class StringConverter {

    private final DataProvider dataProvider;

    @Autowired
    public StringConverter(DataProvider dataProvider) {
        this.dataProvider = dataProvider;
    }

    public List```<String>``` convert() {
        return dataProvider.getValues().map(String::toUpperCase).toList();
    }
}
```

这是一个简单的bean，它从先前创建的DataProvider获取数据并应用大写映射。

现在，我们可以使用我们的应用程序来创建JUnit测试。我们将看到SpringRunner和MockitoJUnitRunner类之间的区别。

正如我们所知，Mockito是一个模拟框架，它与其他测试框架一起使用，以返回虚拟数据并避免外部依赖。这个库为我们提供了**MockitoJUnitRunner——一个专用的JUnit 4 runner，用于集成Mockito**并利用库的功能。

现在让我们为StringConverter创建第一个测试：

```java
public class StringConverterTest {
    @Mock
    private DataProvider dataProvider;

    @InjectMocks
    private StringConverter stringConverter;

    @Test
    public void givenStrings_whenConvert_thenReturnUpperCase() {
        Mockito.when(dataProvider.getValues()).thenReturn(Stream.of("first", "second"));

        val result = stringConverter.convert();

        Assertions.assertThat(result).contains("FIRST", "SECOND");
    }
}
```

我们刚刚模拟了DataProvider以返回两个字符串。但如果我们运行它，测试失败：

```java
java.lang.NullPointerException: Cannot invoke "DataProvider.getValues()" because "this.dataProvider" is null
```

这是因为我们的模拟没有正确初始化。@Mock和@InjectMocks注解目前不起作用。我们可以通过实现init()方法来解决这个问题：

```java
@Before
public void init() {
    MockitoAnnotations.openMocks(this);
}
```

如果我们不想使用注解，我们也可以通过Mockito API以编程方式创建和注入模拟：

```java
@Before
public void init() {
    dataProvider = Mockito.mock(DataProvider.class);
    stringConverter = new StringConverter(dataProvider);
}
```

我们刚刚使用Mockito API以编程方式初始化了模拟。现在，测试按预期工作，我们的断言成功。

接下来，让我们回到我们的第一版，去掉init()方法，并使用MockitoJUnitRunner注解类：

```java
@RunWith(MockitoJUnitRunner.class)
public class StringConverterTest {
    // ...
}
```

再次，测试成功。我们调用了一个自定义runner，它负责管理我们的模拟。我们不必手动初始化它们。

总结一下，**MockitoJUnitRunner是一个专门为Mockito框架设计的JUnit 4 runner**。**它负责初始化@Mock、@Spy和@InjectMocks注解**，因此不需要显式使用MockitoAnnotations.openMocks()。此外，它在每个测试方法后检测未使用的存根并验证模拟使用情况，就像Mockito.validateMockitoUsage()一样。

我们应该记住，所有runner最初都是为JUnit 4设计的。如果我们想在JUnit 5中支持Mockito注解，我们可以使用MockitoExtension：

```java
@ExtendWith(MockitoExtension.class)
public class StringConverterTest {
    // ...
}
```

这个扩展将MockitoJUnitRunner的功能移植到新的扩展模型中。

## 5. SpringRunner

如果我们更深入地分析我们的测试，我们将看到，尽管我们使用了Spring，但我们根本没有启动Spring容器。现在让我们尝试修改我们的例子并初始化Spring上下文。

首先，我们不使用MockitoJUnitRunner，而是用SpringRunner类替换它，然后检查结果：

```java
@RunWith(SpringRunner.class)
public class StringConverterTest {
    // ...
}
```

和以前一样，测试成功，模拟也正确初始化了。此外，Spring上下文也启动了。我们可以得出结论，**SpringRunner不仅像MockitoJUnitRunner一样启用Mockito注解，而且还初始化了Spring上下文**。

当然，我们还没有看到Spring在测试中的全部潜力。我们不是构建新对象，而是可以将它们作为Spring beans注入。正如我们所知，Spring测试模块默认集成了Mockito，这也提供了@MockBean和@SpyBean注解——将模拟和bean特性结合在一起。

让我们重写我们的测试：

```java
@ContextConfiguration(classes = StringConverter.class)
@RunWith(SpringRunner.class)
public class StringConverterTest {
    @MockBean
    private DataProvider dataProvider;

    @Autowired
    private StringConverter stringConverter;

    // ...
}
```

我们刚刚用@MockBean替换了DataProvider对象旁边的@Mock注解。它仍然是一个模拟，但现在也可以作为一个bean使用。我们还通过@ContextConfiguration类注解配置了我们的Spring上下文，并注入了StringConverter。结果，测试仍然成功，但现在它使用Spring beans和Mockito。

总结一下，**SpringRunner是为JUnit 4创建的自定义runner，它提供了Spring TestContext Framework的功能**。由于Mockito是与Spring堆栈集成的默认模拟框架，**runner带来了MockitoJUnitRunner提供的全部支持**。有时，我们也可能遇到SpringJUnit4ClassRunner，这是一个别名，我们可以交替使用。

如果我们正在寻找SpringRunner的扩展对应物，我们应该使用SpringExtension：

```java
@ExtendWith(SpringExtension.class)
public class StringConverterTest {
    // ...
}
```

由于JUnit 5是Spring Boot堆栈中的默认测试框架，该扩展已经与许多测试片段注解集成，包括@SpringBootTest。

## 6. 结论

在本文中，我们学习了SpringRunner和MockitoJUnitRunner之间的区别。

我们首先回顾了JUnit 4和JUnit 5中使用的扩展模型。JUnit 4使用专用的runner，而JUnit 5支持扩展。同时，我们可以提供一个runner或多个扩展。

然后，**我们看了MockitoJUnitRunner，它使我们的JUnit 4测试支持Mockito框架**。通常，我们可以通过专用的@Mock、@Spy和@InjectMocks注解配置我们的模拟，而不需要任何初始化方法。

最后，**我们讨论了SpringRunner，它释放了Mockito和Spring框架合作的所有优势**。它不仅支持基本的Mockito注解，而且还启用了Spring的：@MockBean和@SpyBean。以这种方式构建的模拟可以使用Spring上下文进行注入。

像往常一样，这些示例的完整实现可以在GitHub上找到。