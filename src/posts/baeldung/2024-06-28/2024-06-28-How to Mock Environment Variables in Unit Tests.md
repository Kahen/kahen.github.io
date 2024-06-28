---
date: 2022-04-07
category:
  - Testing
  - Java
tag:
  - JUnit
  - TestNG
  - Environment Variables
head:
  - - meta
    - name: keywords
      content: JUnit, TestNG, Environment Variables, Java, Baeldung
---
# 如何在单元测试中模拟环境变量

当我们的单元测试依赖于环境变量时，我们可能希望在测试实现中为它们提供特定的值。

Java不允许我们编辑环境变量，但我们可以使用一些变通方法，还有一些库可以帮助我们。

在本教程中，我们将探讨依赖环境变量进行单元测试的挑战，Java在最近版本中使这变得更加困难，以及JUnit Pioneer、System Stubs、System Lambda和System Rules库。我将为JUnit 4、JUnit 5和TestNG查看这些内容。

## 2. 更改环境变量的挑战

在其他语言中，比如JavaScript，我们可以非常容易地在测试中修改环境：

```javascript
beforeEach(() => {
  process.env.MY_VARIABLE = 'set';
});
```

Java要严格得多。在Java中，环境变量映射是不可修改的。它是一个不可修改的映射，当JVM启动时初始化。虽然这样做有很好的理由，但我们可能仍然希望在测试时控制我们的环境。

### 2.1. 环境为何不可修改

在Java程序的正常执行中，如果像运行时环境配置这样全局的东西可以被修改，可能会变得非常混乱。这在涉及多个线程时尤其危险。例如，一个线程可能在同时修改环境，另一个线程使用该环境启动进程，任何冲突的设置都可能以意想不到的方式相互作用。

因此，Java的设计者保持了环境变量映射中的全局值的安全。相比之下，系统属性可以在运行时轻松更改。

### 2.2. 绕过不可修改的映射

对于不可修改的环境变量映射对象有一个变通方法。尽管其类型为只读的UnmodifiableMap，我们可以使用反射打破封装并访问内部字段：

```java
Class`<?>` classOfMap = System.getenv().getClass();
Field field = classOfMap.getDeclaredField("m");
field.setAccessible(true);
Map``<String, String>`` writeableEnvironmentVariables = (Map``<String, String>``)field.get(System.getenv());
```

UnmodifiableMap包装器对象内的字段_m_是一个我们可以更改的可变映射：

```java
writeableEnvironmentVariables.put("baeldung", "has set an environment variable");

assertThat(System.getenv("baeldung")).isEqualTo("has set an environment variable");
```

实际上，在Windows上，还有一个替代的_ProcessEnvironment_实现，它也考虑了不区分大小写的环境变量，所以使用上述技术的库也必须考虑这一点。然而，原则上，这就是我们如何绕过不可修改的环境变量映射。

### 2.3. 当反射访问不起作用时

从JDK 17开始，默认情况下，Java模块系统通过禁用对其核心内部的反射修改来保护。这些被认为是不安全的做法，如果内部在未来发生变化，可能会导致运行时错误。

我们可能会收到这样的错误：

```java
Unable to make field private static final java.util.HashMap java.lang.ProcessEnvironment.theEnvironment accessible: 
  module java.base does not "opens java.lang" to unnamed module @fdefd3f
```

这表明Java模块系统正在阻止使用反射。这可以通过向我们的测试运行器配置中的命令行参数添加一些额外的参数来解决_pom.xml_，使用_–add-opens_允许这种反射访问：

```xml
``<plugin>``
    `````````<groupId>`````````org.apache.maven.plugins`````````</groupId>`````````
    `````````<artifactId>`````````maven-surefire-plugin`````````</artifactId>`````````
    ``<configuration>``
        `<argLine>`
            --add-opens java.base/java.util=ALL-UNNAMED
            --add-opens java.base/java.lang=ALL-UNNAMED
        `</argLine>`
    ``</configuration>``
``</plugin>``
```

这种变通方法允许我们编写代码并使用通过反射打破封装的工具。然而，我们可能希望避免这样做，因为打开这些模块可能会允许不安全的编码实践，这些实践在测试时有效，但在运行时意外失败。我们可以选择不需要这种变通的工具。

### 2.4. 为什么我们需要以编程方式设置环境变量

我们的单元测试可以由测试运行器设置的环境变量运行。这可能是我们的首选，如果我们有一个适用于整个测试套件的全局配置。

我们可以通过在_pom.xml_中的_surefire_配置中添加环境变量来实现这一点：

```xml
``<plugin>``
    `````````<groupId>`````````org.apache.maven.plugins`````````</groupId>`````````
    `````````<artifactId>`````````maven-surefire-plugin`````````</artifactId>`````````
    ``<configuration>``
        `<environmentVariables>`
            `<SET_BY_SUREFIRE>`YES`</SET_BY_SUREFIRE>`
        `</environmentVariables>`
    ``</configuration>``
``</plugin>``
```

然后这个变量对我们的测试可见：

```java
assertThat(System.getenv("SET_BY_SUREFIRE")).isEqualTo("YES");
```

然而，我们可能有根据不同的环境变量设置操作不同的代码。我们可能更愿意能够使用不同测试用例中的不同环境变量值来测试这种行为的所有变体。

同样，我们可能有在测试时不可预测的值。一个很好的例子是我们在docker容器中运行WireMock或测试数据库的端口。

### 2.5. 从测试库中获得正确的帮助

有几个测试库可以帮助我们在测试时设置环境变量。每个库都具有不同程度的与不同测试框架和JDK版本的兼容性。

我们可以根据首选的工作流程、环境变量的值是否提前知道以及我们计划使用的JDK版本来选择合适的库。

我们应该注意到，所有这些库都不仅仅涵盖环境变量。它们都使用在测试之前捕获当前环境的方法，然后在测试完成后将环境恢复到原始状态。

## 3. 使用JUnit Pioneer设置环境变量

JUnit Pioneer是JUnit 5的一套扩展。它提供了一种基于注解的方式来设置和清除环境变量。

我们可以通过_junit-pioneer_依赖项添加它：

```xml
```````<dependency>```````
    `````````<groupId>`````````org.junit-pioneer`````````</groupId>`````````
    `````````<artifactId>`````````junit-pioneer`````````</artifactId>`````````
    ```````<version>```````2.1.0```````</version>```````
    ```````<scope>```````test```````</scope>```````
```````</dependency>```````
```

### 3.1. 使用_SetEnvironmentVariable_注解

我们可以在测试类或方法上使用_SetEnvironmentVariable_注解，我们的测试代码就在环境中设置了该值：

```java
@SetEnvironmentVariable(key = "pioneer", value = "is pioneering")
class EnvironmentVariablesSetByJUnitPioneerUnitTest {

}
```

我们应该注意到_key_和_value_必须在编译时已知。

然后我们的测试可以使用环境变量：

```java
@Test
void variableCanBeRead() {
    assertThat(System.getenv("pioneer")).isEqualTo("is pioneering");
}
```

我们可以多次使用@SetEnvironmentVariable注解来设置多个变量。

### 3.2. 清除环境变量

我们可能还希望清除系统提供的环境变量，甚至在某些特定测试中清除在类级别设置的一些变量：

```java
@ClearEnvironmentVariable(key = "pioneer")
@Test
void givenEnvironmentVariableIsClear_thenItIsNotSet() {
    assertThat(System.getenv("pioneer")).isNull();
}
```

### 3.3. JUnit Pioneer的限制

**JUnit Pioneer只能与JUnit 5一起使用。**它使用反射，因此需要16或更低版本的Java，或者使用_add-opens_变通方法。

## 4. 使用System Stubs设置环境变量

System Stubs对JUnit 4、JUnit 5和TestNG都有测试支持。像它的前身System Lambda一样，它也可以在任何框架中的任何测试代码体中独立使用。**System Stubs与从11开始的所有JDK版本兼容。**

### 4.1. 在JUnit 5中设置环境变量

为此我们需要System Stubs JUnit 5依赖项：

```xml
```````<dependency>```````
    `````````<groupId>`````````uk.org.webcompere`````````</groupId>`````````
    `````````<artifactId>`````````system-stubs-jupiter`````````</artifactId>`````````
    ```````<version>```````2.1.3```````</version>```````
    ```````<scope>```````test```````</scope>```````
```````</dependency>```````
```

首先，我们需要将扩展添加到我们的测试类中：

```java
@ExtendWith(SystemStubsExtension.class)
class EnvironmentVariablesUnitTest {
}
```

我们可以将一个_EnvironmentVariables_存根对象初始化为测试类的字段，使用我们希望使用的環境变量：

```java
@SystemStub
private EnvironmentVariables environment = new EnvironmentVariables("MY VARIABLE", "is set");
```

值得注意的是，**我们必须使用@SystemStub注解对象**，以便扩展知道如何使用它。

_SystemStubsExtension_然后在测试期间激活这个替代环境，并在之后清理它。**在测试期间，_EnvironmentVariables_对象也可以修改**，并且对_System.getenv()_的调用接收到最新的配置。

让我们也看看一个更复杂的情况，我们希望设置一个环境变量，其值仅在测试初始化时才知道。在这种情况下，由于我们将在_beforeEach()_方法中提供值，我们不需要在初始化器列表中创建对象实例：

```java
@SystemStub
private EnvironmentVariables environmentVariables;
```

JUnit调用我们的_beforeEach()_方法时，扩展已经为我们创建了对象，我们可以使用它来设置我们需要的环境变量：

```java
@BeforeEach
void beforeEach() {
    environmentVariables.set("继续翻译：

"systemstubs", "creates stub objects");
}

@Test
void givenEnvironmentVariableHasBeenSet_thenCanReadIt() {
    assertThat(System.getenv("systemstubs")).isEqualTo("creates stub objects");
}
```

当测试方法执行完成后，环境变量将恢复到修改之前的状态。

### 4.2. 在JUnit 4中设置环境变量

为此，我们需要System Stubs JUnit 4依赖项：

```xml
```````<dependency>```````
    `````````<groupId>`````````uk.org.webcompere`````````</groupId>`````````
    `````````<artifactId>`````````system-stubs-junit4`````````</artifactId>`````````
    ```````<version>```````2.1.3```````</version>```````
    ```````<scope>```````test```````</scope>```````
```````</dependency>```````
```

**System Stubs提供了一个JUnit 4规则**。我们将其作为测试类的字段添加：

```java
@Rule
public EnvironmentVariablesRule environmentVariablesRule =
  new EnvironmentVariablesRule("system stubs", "initializes variable");
```

在这里，我们用一个环境变量进行了初始化。我们也可以在测试中或在_@Before_方法中调用规则的_set()_方法来修改变量。

一旦测试运行，环境变量就处于激活状态：

```java
@Test
public void canReadVariable() {
    assertThat(System.getenv("system stubs")).isEqualTo("initializes variable");
}
```

### 4.3. 在TestNG中设置环境变量

为此我们需要System Stubs TestNG依赖项：

```xml
```````<dependency>```````
    `````````<groupId>`````````uk.org.webcompere`````````</groupId>`````````
    `````````<artifactId>`````````system-stubs-testng`````````</artifactId>`````````
    ```````<version>```````2.1.3```````</version>```````
    ```````<scope>```````test```````</scope>```````
```````</dependency>```````
```

这提供了一个TestNG监听器，其工作方式与上述JUnit 5解决方案类似。

我们将监听器添加到测试类中：

```java
@Listeners(SystemStubsListener.class)
public class EnvironmentVariablesTestNGUnitTest {
}

@SystemStub
private EnvironmentVariables setEnvironment;

@BeforeClass
public void beforeAll() {
    setEnvironment.set("testng", "has environment variables");
}

@Test
public void givenEnvironmentVariableWasSet_thenItCanBeRead() {
    assertThat(System.getenv("testng")).isEqualTo("has environment variables");
}
```

### 4.4. 无需测试框架的System Stubs

System Stubs最初基于System Lambda的代码库，后者带有只能用于单个测试方法的技术。这意味着测试框架的选择完全开放。

因此，System Stubs Core可以用于在JUnit测试方法中的任何位置设置环境变量。

首先，我们获取_system-stubs-core_依赖项：

```xml
```````<dependency>```````
    `````````<groupId>`````````uk.org.webcompere`````````</groupId>`````````
    `````````<artifactId>`````````system-stubs-core`````````</artifactId>`````````
    ```````<version>```````2.1.3```````</version>```````
    ```````<scope>```````test```````</scope>```````
```````</dependency>```````
```

现在，在我们的一个测试方法中，我们可以用一个结构暂时设置一些环境变量。首先，我们需要从_SystemStubs_静态导入：

```java
import static uk.org.webcompere.systemstubs.SystemStubs.withEnvironmentVariables;
```

然后我们可以使用_withEnvironmentVariables()_方法来包装我们的测试代码：

```java
@Test
void useEnvironmentVariables() throws Exception {
    withEnvironmentVariables("system stubs", "in test")
      .execute(() -> {
          assertThat(System.getenv("system stubs"))
            .isEqualTo("in test");
      });
}
```

在这里我们可以看到，_assertThat()_调用是对一个已经设置了变量的环境的操作。在_execute()_调用的闭包之外，环境变量不受影响。

我们应该注意，**这种技术要求我们的测试方法有_throws Exception_**，因为_execute()_函数必须处理可能调用具有检查异常的方法的闭包。

这种技术还要求每个测试设置自己的环境，并且如果我们试图与单个测试生命周期更长的测试对象一起工作，例如Spring Context，它就不太适用。

System Stubs允许它的每个存根对象独立于测试框架进行设置和拆卸。因此，我们可以使用测试类的_beforeAll()_和_afterAll()_方法来操作我们的_EnvironmentVariables_对象：

```java
private static EnvironmentVariables environmentVariables = new EnvironmentVariables();

@BeforeAll
static void beforeAll() throws Exception {
    environmentVariables.set("system stubs", "in test");
    environmentVariables.setup();
}

@AfterAll
static void afterAll() throws Exception {
    environmentVariables.teardown();
}
```

然而，测试框架扩展的好处是，我们可以避免这种样板代码，因为它们为我们执行了这些基本操作。

### 4.5. System Stubs的限制

System Stubs的TestNG功能仅在2.1+版本中可用，这些版本限于Java 11及更高版本。

在其2.x版本中，**System Stubs偏离了早期描述的基于反射的技术**。它现在使用ByteBuddy来拦截环境变量调用。然而，如果项目使用的JDK版本低于11，则也无需使用这些更高版本。

System Stubs版本1提供了与JDK 8到JDK 16的兼容性。

## 5. System Rules和System Lambda

作为环境变量设置的最长期测试库之一，**System Rules为JUnit 4提供了一个解决方案**，并且它的作者用System Lambda替换了它，以提供一种与测试框架无关的方法。它们都是基于在测试时替换环境变量的核心技术。

### 5.1. 使用System Rules设置环境变量

首先我们需要_system-rules_依赖项：

```xml
```````<dependency>```````
    `````````<groupId>`````````com.github.stefanbirkner`````````</groupId>`````````
    `````````<artifactId>`````````system-rules`````````</artifactId>`````````
    ```````<version>```````1.19.0```````</version>```````
    ```````<scope>```````test```````</scope>```````
```````</dependency>```````
```

然后我们将规则添加到我们的JUnit 4测试类中：

```java
@Rule
public EnvironmentVariables environmentVariablesRule = new EnvironmentVariables();
```

我们可以在_@Before_方法中设置值：

```java
@Before
public void before() {
    environmentVariablesRule.set("system rules", "works");
}
```

在我们的测试方法中访问正确的环境：

```java
@Test
public void givenEnvironmentVariable_thenCanReadIt() {
    assertThat(System.getenv("system rules")).isEqualTo("works");
}
```

规则对象——_environmentVariablesRule_——允许我们在测试方法中立即设置环境变量。

### 5.2. 使用System Lambda设置环境变量

为此我们需要_system-lambda_依赖项：

```xml
```````<dependency>```````
    `````````<groupId>`````````com.github.stefanbirkner`````````</groupId>`````````
    `````````<artifactId>`````````system-lambda`````````</artifactId>`````````
    ```````<version>```````1.2.1```````</version>```````
    ```````<scope>```````test```````</scope>```````
```````</dependency>```````
```

正如在System Stubs解决方案中已经演示的，我们可以将依赖环境的代码放在测试中的闭包内。为此我们应该静态导入_SystemLambda_：

```java
import static com.github.stefanbirkner.systemlambda.SystemLambda.withEnvironmentVariable;
```

然后我们可以编写测试：

```java
@Test
void enviromentVariableIsSet() throws Exception {
    withEnvironmentVariable("system lambda", "in test")
      .execute(() -> {
          assertThat(System.getenv("system lambda"))
            .isEqualTo("in test");
      });
}
```

### 5.3. System Rules和System Lambda的限制

虽然这两个都是成熟且广泛的库，但它们不能用于在JDK 17及更高版本中操作环境变量。

System Rules严重依赖于JUnit 4。我们不能使用System Lambda来设置测试装置范围的环境变量，因此**它无法帮助我们进行Spring上下文初始化**。

## 6. 避免模拟环境变量

虽然我们已经讨论了在测试时修改环境变量的许多方法，但可能值得考虑这是否必要，甚至有益。

### 6.1. 也许这太冒险了

正如我们上面看到的每一种解决方案，运行时更改环境变量并不简单。在多线程代码的情况下，这可能更加棘手。如果有多个测试装置在同一JVM中并行运行，可能使用JUnit 5的并发特性，那么不同的测试可能同时以矛盾的方式尝试控制环境。

尽管上述一些测试库可能在多个线程同时使用时不会崩溃，但很难预测环境变量可能如何从一刻到下一刻被设置。更糟糕的是，一个线程可能会捕获另一个测试的临时环境变量，就好像它们是测试全部完成时系统应该留下的正确状态一样。

作为另一个测试库的一个例子，当Mockito模拟静态方法时，它限制了当前线程，因为这种**模拟全局变量可能会破坏并发测试**。因此，修改环境变量遇到了完全相同的风险。一个测试可以影响JVM的整个全局状态，并在其他地方引起副作用。

同样，如果我们运行的代码只能通过环境变量进行控制，那么测试起来可能非常困难，我们当然可以通过设计来避免这种情况？

### 6.2. 使用依赖注入

构建一个在构造时接收所有输入的系统比从系统资源中提取输入的系统更容易测试。

像Spring这样的依赖注入容器允许我们构建更容易在运行时隔离测试的对象。

我们还应该注意，Spring允许我们使用系统属性来代替环境变量来设置其属性值。本文讨论的所有工具也都支持在测试时设置和重置系统属性。

### 6.3. 使用抽象

如果一个模块必须提取环境变量，也许它不应该直接依赖于