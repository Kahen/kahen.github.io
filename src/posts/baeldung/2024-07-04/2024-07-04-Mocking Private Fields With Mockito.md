---
date: 2022-04-01
category:
  - Java
  - Mockito
tag:
  - 私有字段
  - 反射
  - JUnit
head:
  - - meta
    - name: keywords
      content: Mockito, Java, 私有字段, 反射, 测试
------
# Mockito中模拟私有字段

在本教程中，我们将学习如何在Mockito中模拟私有字段。Mockito是一个流行的模拟框架，通常与JUnit一起在Java中用于创建模拟对象。它本身不支持模拟私有字段；然而，我们可以使用不同的方法来模拟Mockito中的私有字段。
让我们来检查其中的一些方法。

## 2. 项目设置

我们将通过创建示例中使用的类来开始。我们将创建一个带有私有字段的类和一个测试类来测试它。

### 2.1. 源代码类

首先，我们将创建一个带有私有字段的简单类：

```java
public class MockService {
    private final Person person = new Person("John Doe");

    public String getName() {
        return person.getName();
    }
}
```

_MockService_类有一个类型为_Person_的私有字段__person__。它还有一个方法_getName()_，返回该人的名字。正如我们所看到的，_person_字段没有设置器方法。因此我们不能直接设置字段，或者更改字段的值。

现在我们将创建_Person_类：

```java
public class Person {
    private final String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

_Person_类有一个私有字段__name__和一个获取字段的getter方法。

### 2.2. 测试类

接下来，我们将创建一个测试类来测试_MockService_类：

```java
public class MockServiceUnitTest {
    private Person mockedPerson;

    @BeforeEach
    public void setUp(){
        mockedPerson = mock(Person.class);
    }
}
```

我们创建了_Person_类的实例，并使用Mockito进行模拟。在接下来的部分中，我们将看看如何使用这个模拟实例来替换_MockService_类的私有字段。

## 3. 使用Java反射API启用模拟

设置私有字段的一种方法是使用Java反射API。这是一个很好的方法，因为它不需要任何额外的依赖。**我们首先可以使字段可访问，然后设置字段的值为模拟实例。**

让我们看看如何做到这一点的代码：

```java
@Test
void givenNameChangedWithReflection_whenGetName_thenReturnName() throws Exception {
    Class`<?>` mockServiceClass = Class.forName("com.baeldung.mockprivate.MockService");
    MockService mockService = (MockService) mockServiceClass.getDeclaredConstructor().newInstance();
    Field field = mockServiceClass.getDeclaredField("person");
    field.setAccessible(true);
    field.set(mockService, mockedPerson);

    when(mockedPerson.getName()).thenReturn("Jane Doe");

    Assertions.assertEquals("Jane Doe", mockService.getName());
}
```

我们使用_Class.forName()_方法获取_MockService_类的类对象。然后我们使用_getDeclaredConstructor()_方法创建_MockService_类的实例。

接下来，我们使用_getDeclaredField()_方法获取_MockService_类的__person__字段。**我们使用_setAccessible()_方法使字段可访问，并使用_set()_方法将字段的值设置为模拟实例。**

最后，我们可以模拟_Person_类的_getName()_方法，并测试_MockService_类的_getName()_方法以返回模拟值。

## 4. 使用JUnit 5启用模拟

与Java反射API类似，JUnit 5还提供了实用方法来设置私有字段。我们可以使用JUnit 5的_ReflectionUtils_类来设置私有字段的值：

```java
@Test
void givenNameChangedWithReflectionUtils_whenGetName_thenReturnName() throws Exception {
    MockService mockService = new MockService();
    Field field = ReflectionUtils
      .findFields(MockService.class, f -> f.getName().equals("person"),
        ReflectionUtils.HierarchyTraversalMode.TOP_DOWN)
      .get(0);

    field.setAccessible(true);
    field.set(mockService, mockedPerson);

    when(mockedPerson.getName()).thenReturn("Jane Doe");

    Assertions.assertEquals("Jane Doe", mockService.getName());
}
```

这种方法的工作原理与前一种方法相同。主要的区别是我们如何获取字段：

- 我们使用_ReflectionUtils.findFields()_方法来获取字段。
- 它需要_MockService_类的类对象和一个谓词来找到字段。我们在这里使用的谓词是找到名为_“person”_的字段。
- 此外，我们需要指定_HierarchyTraversalMode_。当我们有一个类的层次结构，并且我们想要在层次结构中找到字段时，这很重要。
- 在我们的情况下，我们只有一个类，所以我们可以使用任何__TOP_DOWN__或__BOTTOM_UP__模式。

这给了我们字段，我们可以再次设置字段的值并执行测试。

## 5. 使用Spring Test启用模拟

如果我们的项目中使用了Spring，Spring Test提供了一个实用类_ReflectionTestUtils_来设置私有字段。

### 5.1. 依赖性

让我们首先向我们的项目添加Spring Test依赖性：

```xml
`<dependency>`
    `<groupId>`org.springframework`</groupId>`
    `<artifactId>`spring-test`</artifactId>`
    `<version>`5.3.25`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

或者，如果使用Spring Boot，我们可以使用Spring Boot Starter Test依赖性来执行相同的操作。

### 5.2. 测试用例

接下来，让我们在我们的测试中使用这个类来启用模拟：

```java
@Test
void givenNameChangedWithReflectionTestUtils_whenGetName_thenReturnName() throws Exception {
    MockService mockService = new MockService();

    ReflectionTestUtils.setField(mockService, "person", mockedPerson);

    when(mockedPerson.getName()).thenReturn("Jane Doe");
    Assertions.assertEquals("Jane Doe", mockService.getName());
}
```

在这里，我们使用_ReflectionTestUtils.setField()_方法来设置私有字段。在内部，这也使用Java反射API来设置字段，但去除了样板代码的需求。

## 6. 结论

在本文中，我们查看了使用Mockito模拟私有字段的不同方式。我们探索了Java反射API、JUnit 5和Spring Test来模拟私有字段。

如常，示例的代码可以在GitHub上找到。