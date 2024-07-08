---
date: 2023-02-01
category:
  - Spring Boot
  - Testing
tag:
  - Spring Boot
  - Testing
head:
  - - meta
    - name: keywords
      content: Spring Boot, Testing, Pitfalls, Integration Testing
---
# Spring Boot 测试中的陷阱

## 1. 概述

编程中最重要的主题之一是测试。Spring 框架和 Spring Boot 通过提供测试框架扩展以及引导我们编写具有大量后台自动化的最小、可测试代码，提供了非常好的支持。要运行 Spring Boot 集成测试，我们只需要在我们的测试类中添加 `@SpringBootTest`。我们可以在 Spring Boot 中的测试中找到简短的介绍。即使我们在没有 Spring Boot 的情况下使用 Spring 框架，我们也可以非常高效地进行集成测试。

但是开发测试越容易，我们就越有可能遇到陷阱。在本教程中，我们将探讨 Spring Boot 测试是如何执行的，以及在编写测试时需要考虑什么。

## 2. 陷阱示例

让我们从一个小型示例开始：让我们实现一个服务来管理宠物（一个 `PetService`）如下所示：

```java
public record Pet(String name) {}
```

```java
@Service
public class PetService {

    private final Set``<Pet>`` pets = new HashSet<>();

    public Set``<Pet>`` getPets() {
        return Collections.unmodifiableSet(pets);
    }

    public boolean add(Pet pet) {
        return this.pets.add(pet);
    }
}
```

该服务不应允许重复项，因此测试可能看起来像这样：

```java
@SpringBootTest
class PetServiceIntegrationTest {

    @Autowired
    PetService service;

    @Test
    void shouldAddPetWhenNotAlreadyExisting() {
        var pet = new Pet("Dog");
        var result = service.add(pet);
        assertThat(result).isTrue();
        assertThat(service.getPets()).hasSize(1);
    }

    @Test
    void shouldNotAddPetWhenAlreadyExisting() {
        var pet = new Pet("Cat");
        var result = service.add(pet);
        assertThat(result).isTrue();
        // 再试一次
        result = service.add(pet);
        assertThat(result).isFalse();
        assertThat(service.getPets()).hasSize(1);
    }
}
```

当我们单独执行每个测试时，一切都很好。但是当我们一起执行它们时，我们将得到一个测试失败：

![img](https://www.baeldung.com/wp-content/uploads/2023/02/sample1.png)

但是为什么测试失败了呢？我们如何预防这种情况？我们将阐明这一点，但首先，让我们从一些基础知识开始。

## 3. 功能测试的设计目标

我们编写功能测试以记录需求并确保应用程序代码正确实现它们。因此，测试本身必须是正确的，并且易于理解，理想情况下是自解释的。但是，对于本文，我们将专注于进一步的设计目标：

- 回归：测试必须是可重复的。它们必须产生确定性结果
- 隔离：测试不能相互影响。它们执行的顺序或是否并行执行都不应该重要
- 性能：测试应该尽可能快速和节省资源地运行，特别是那些是 CI 流水线或 TDD 的一部分的测试

关于 Spring Boot 测试，我们需要意识到它们是一种集成测试，因为它们会导致 `ApplicationContext` 的初始化，即使用依赖注入初始化和连接 bean。因此隔离需要特别关注 - 上面展示的示例似乎有一个隔离问题。另一方面，良好的性能对于 Spring Boot 测试来说也是一个挑战。

**作为第一个结论，我们可以说避免集成测试是最重要的点。** 对于 `PetService` 测试的最佳解决方案是单元测试：

```java
// 这里没有注解
class PetServiceUnitTest {

    PetService service = new PetService();

    // ...
}
```

我们只有在必要时才编写 Spring Boot 测试，例如，当我们想要测试我们的应用程序代码是否被框架正确处理（生命周期管理、依赖注入、事件处理）或者我们想要测试一个特殊层（HTTP 层、持久层）。

## 4. 上下文缓存

显然，当我们在测试类中添加 `@SpringBootTest` 时，`ApplicationContext` 会被启动，并且 bean 会被初始化。但是，为了支持隔离，JUnit 为每个测试方法初始化这一步。这将导致每个测试用例一个 `ApplicationContext`，显著降低测试性能。为了避免这种情况，Spring 测试框架缓存了上下文，并允许它在多个测试用例中重复使用。当然，这也导致了重复使用 bean 实例。这就是为什么 `PetService` 测试失败的原因 - 两个测试方法处理的是同一个 `PetService` 实例。

只有在它们彼此不同时，才会创建不同的 `ApplicationContext` s - 例如，如果它们包含不同的 bean 或具有不同的应用程序属性。我可以在 Spring 测试框架文档中找到详细信息。因为 `ApplicationContext` 配置是在类级别完成的，所以默认情况下，测试类中的所有方法共享相同的上下文。

下面的插图显示了这种情况：

![img](https://www.baeldung.com/wp-content/uploads/2023/02/context-cache.png)

**上下文缓存作为一种性能优化与隔离相矛盾**，所以我们只有在确保测试之间的隔离时才能重复使用 `ApplicationContext`。这是最重要的原因 **Spring Boot 测试应该只在满足某些条件的情况下在同一 JVM 中并行运行**。我们可以使用不同的 JVM 进程运行测试（例如，通过为 Maven Surefire 插件设置 `forkMode`），但那样我们会绕过缓存机制。

### 4.1. `PetService` 示例解决方案

关于 `PetService` 测试，可能有多解决方案。由于 `PetService` 是有状态的，所以它们都适用。

一种解决方案是在每个测试方法上注解 `@DirtiesContext`。这将 `ApplicationContext` 标记为脏的，因此在测试后会关闭并从缓存中移除。这阻止了性能优化，并且永远不应该是首选的方式：

```java
@SpringBootTest
class PetServiceIntegrationTest {

    @Autowired
    PetService service;

    @Test
    @DirtiesContext
    void shouldAddPetWhenNotAlreadyExisting() {
        // ...
    }

    @Test
    @DirtiesContext
    void shouldNotAddPetWhenAlreadyExisting() {
        // ...
    }
}
```

另一种解决方案是在每个测试后重置 `PetService` 的状态：

```java
@SpringBootTest
class PetServiceIntegrationTest {

    @Autowired
    PetService service;

    @AfterEach
    void resetState() {
        service.clear(); // 删除所有宠物
    }

    // ...
}
```

**然而，最佳解决方案是实现无状态的 `PetService`**。目前，宠物不是存储在内存中的，这在可扩展环境中永远不会是一个好的实践。

### 4.2. 陷阱：太多的上下文

为了避免无意中初始化额外的 `ApplicationContexts`，我们需要知道是什么导致了不同的配置。最明显的是直接配置 bean，例如使用 `@ComponentScan`、`@Import`、`@AutoConfigureXXX`（例如 `@AutoConfigureTestDatabase`）。但是，启用配置文件（`@ActiveProfiles`）或记录事件（`@RecordApplicationEvents`）也可能导致派生：

```java
@SpringBootTest
// 它们每个都是从原始（缓存的）上下文中派生的
@ComponentScan(basePackages = "com.baeldung.sample.blogposts")
@Import(PetServiceTestConfiguration.class)
@AutoConfigureTestDatabase
@ActiveProfiles("test")
@RecordApplicationEvents
class PetServiceIntegrationTest {
    // ...
}
```

我们可以在 Spring 测试框架文档中找到详细信息。

### 4.3. 陷阱：模拟

Spring 测试框架包括 Mockito 来创建和使用模拟。当使用 `@MockBean` 时，我们让 Mockito 创建一个模拟实例并将其放入 `ApplicationContext` 中。这个实例是特定于测试类的。**结果是我们不能与其他测试类共享 `ApplicationContext`**：

```java
@SpringBootTest
class PetServiceIntegrationTest {

    // 这个上下文不能与其他测试类共享
    @MockBean
    PetServiceRepository repository;

    // ...
}
```

一个建议可能是避免使用模拟并测试整个应用程序。但如果我们想要测试异常处理，我们不能总是避免模拟。如果我们仍然想要与其他测试类共享 `ApplicationContext`，我们也必须共享模拟实例。当我们定义一个 `@TestConfiguration` 来创建模拟并在 `ApplicationContext` 中替换原始 bean 时，这是可能的。但然后，我们必须意识到隔离问题。

正如我们知道的，缓存和重用 `ApplicationContext` 假设我们在测试后重置上下文中的每个有状态 bean 的状态。模拟是一类特殊的有状态 bean，因为它们被配置为返回值或抛出异常，并且它们记录每个方法调用以供每个测试用例验证。测试后，我们也需要重置它们。当使用 `@MockBean` 时，这是自动完成的，但当我们在 `@TestConfiguration` 中创建模拟时，我们负责重置。幸运的是，Mockito 本身提供了一个设置。所以整个解决方案可能是：

```java
@TestConfiguration
public class PetServiceTestConfiguration {

    @Primary
    @Bean
    PetServiceRepository createRepositoryMock() {
        return mock(
            PetServiceRepository.class,
            MockReset.withSettings(MockReset.AFTER)
        );
    }
}

@SpringBootTest
@Import(PetServiceTestConfiguration.class) // 如果没有自动检测到
class PetServiceIntegrationTest {

    @Autowired
    PetService repository;
    @Autowired // 模拟
    PetServiceRepository repository;

    // ...
}
```

##继续翻译：

### 4.4. 配置上下文缓存

如果我们想要了解在测试执行期间 `ApplicationContext` 被初始化了多少次，我们可以在 `application.properties` 中设置日志级别：

```properties
logging.level.org.springframework.test.context.cache=DEBUG
```

然后我们会得到包含如下统计信息的日志输出：

```plaintext
org.springframework.test.context.cache:
  Spring test ApplicationContext cache statistics:
  [DefaultContextCache@34585ac9 size = 1, maxSize = 32, parentContextCount = 0, hitCount = 8, missCount = 1]
```

默认的缓存大小是 32（LRU）。如果我们想要增加或减少它，我们可以指定另一个缓存大小：

```properties
spring.test.context.cache.maxSize=50
```

如果我们想要深入研究缓存机制的代码，`org.springframework.test.context.cache.ContextCache` 接口可以作为一个起点。

## 5. 上下文配置

不仅为了缓存目的，也为了 `ApplicationContext` 初始化性能，我们可能会优化配置。初始化次数越少，测试设置就越快。我们可以为测试配置延迟 bean 初始化，但我们必须注意潜在的副作用。另一种可能性是减少 bean 的数量。

### 5.1. 配置检测

`@SpringBootTest` 默认从测试类的当前包开始搜索，然后向上通过包结构搜索，寻找带有 `@SpringBootConfiguration` 注解的类，然后从中读取配置以创建应用程序上下文。这个类通常是我们的主应用程序，因为 `@SpringBootApplication` 注解包括了 `@SpringBootConfiguration` 注解。然后它创建一个类似于在生产环境中启动的应用程序上下文。

### 5.2. 最小化 `ApplicationContext`

如果我们的测试类需要一个不同的（最小的）`ApplicationContext`，我们可以创建一个静态内部 `@Configuration` 类：

```java
@SpringBootTest
class PetServiceIntegrationTest {

    @Autowired
    PetService service;

    @Configuration
    static class MyCustomConfiguration {

        @Bean
        PetService createMyPetService() {
            // 创建自定义的宠物服务
        }
    }

    // ...
}
```

与使用 `@TestConfiguration` 相比，这完全防止了 `@SpringBootConfiguration` 的自动检测。

另一种减少 `ApplicationContext` 大小的方法是使用 `@SpringBootTest(classes=…)`。这将忽略内部 `@Configuration` 类，并且只初始化给定的类。

```java
@SpringBootTest(classes = PetService.class)
public class PetServiceIntegrationTest {

    @Autowired
    PetService service;

    // ...
}
```

如果我们不需要任何 Spring Boot 功能，如配置文件和读取应用程序属性，我们可以替换 `@SpringBootTest`。让我们看看这个注释背后是什么：

```java
@ExtendWith(SpringExtension.class)
@BootstrapWith(SpringBootTestContextBootstrapper.class)
public @interface SpringBootTest {
    // ...
}
```

我们可以看到，这个注释只启用了 JUnit 的 `SpringExtension`（这是 Spring 框架的一部分，不是 Spring Boot 的一部分）并声明了一个 Spring Boot 提供的 `TestContextBootstrapper`，它实现了搜索机制。如果我们移除 `@BootstrapWith`，将使用 `DefaultTestContextBootstrapper`，它不是 SpringBoot-aware 的。然后我们必须使用 `@ContextConfiguration` 指定上下文：

```java
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = PetService.class)
class PetServiceIntegrationTest {

    @Autowired
    PetService service;

    // ...
}
```

### 5.3. 测试切片

Spring Boot 的自动配置系统对应用程序工作得很好，但有时对测试来说可能过于繁重。通常，只加载测试应用程序的‘切片’所需的配置部分是有帮助的。例如，我们可能想要测试 Spring MVC 控制器是否正确映射 URL，我们不想在这些测试中涉及数据库调用；或者我们可能想要测试 JPA 实体，当这些测试运行时，我们对 web 层不感兴趣。

我们可以在 Spring Boot 文档中找到可用测试切片的概述。

### 5.4. 上下文优化与缓存

上下文优化可以导致单个测试的启动时间更快，但我们应该意识到这将导致不同的配置，因此会有更多的 `ApplicationContext` 初始化。总的来说，整个测试执行时间可能会增加。因此，跳过上下文优化可能更好，但使用已经存在的配置，这些配置符合测试案例的要求。

## 6. 建议：自定义切片

正如我们所了解到的，我们必须在 `ApplicationContext` 的数量和大小之间找到折衷。挑战在于跟踪配置。解决这个问题的一种可能方案是定义几个自定义切片（可能每个层一个，一个用于整个应用程序），并在所有测试中专门使用它们，即我们必须避免在测试类中进一步配置和使用 `@MockBean` 进行模拟。

Pet 领域层的解决方案可能是：

```java
@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@ExtendWith(SpringExtension.class)
@ComponentScan(basePackageClasses = PetsDomainTest.class)
@Import(PetsDomainTest.PetServiceTestConfiguration.class)
// 进一步帮助配置和执行测试的功能
@ActiveProfiles({"test", "domain-test"})
@Tag("integration-test")
@Tag("domain-test")
public @interface PetsDomainTest {

    @TestConfiguration
    class PetServiceTestConfiguration {

        @Primary
        @Bean
        PetServiceRepository createRepositoryMock() {
            return mock(
                PetServiceRepository.class,
                MockReset.withSettings(MockReset.AFTER)
            );
        }
    }
}

```

然后可以按如下方式使用：

```java
@PetsDomainTest
public class PetServiceIntegrationTest {

    @Autowired
    PetService service;
    @Autowired // 模拟
    PetServiceRepository repository;

    // ...
}
```

## 7. 进一步的陷阱

### 7.1. 派生测试配置

集成测试的一个原则是我们尽可能地测试应用程序，使其接近生产状态。我们只为特定的测试案例派生。不幸的是，测试框架本身重新配置了我们应用程序的行为，我们应该意识到这一点。例如，内置的可观测性特性在测试期间是禁用的，所以如果我们想要测试我们应用程序中的观察，我们需要显式地使用 `@AutoConfigureObservability` 重新启用它。

### 7.2. 包结构

当我们想要测试应用程序的切片时，我们需要声明哪些组件需要在 `ApplicationContext` 中初始化。我们可以通过列出相应的类来做到这一点，但是为了获得更稳定的测试配置，最好指定包。例如，我们有这样一个映射器：

```java
@Component
public class PetDtoMapper {

    public PetDto map(Pet source) {
        // ...
    }
}
```

我们需要在测试中使用这个映射器；我们可以用这个精简的解决方案配置测试：

```java
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = PetDtoMapper.class)
class PetDtoMapperIntegrationTest {

    @Autowired
    PetDtoMapper mapper;

    // ...
}
```

如果我们用 `MapStruct` 替换映射器实现，`PetDtoMapper` 类型将变成一个接口，然后 `MapStruct` 在同一个包中生成实现类。因此，除非我们导入整个包，否则给定的测试将失败：

```java
@ExtendWith(SpringExtension.class)
public class PetDtoMapperIntegrationTest {

    @Configuration
    @ComponentScan(basePackageClasses = PetDtoMapper.class)
    static class PetDtoMapperTestConfig {}

    @Autowired
    PetDtoMapper mapper;

    // ...
}
```

这会附带初始化同一包和子包中的所有其他 bean 的效果。这就是为什么我们应该根据切片的结构创建包结构。这包括特定于域的组件、安全配置、web 或持久层的全局配置，或事件处理器。

## 8. 结论

在本教程中，我们探讨了编写 Spring Boot 测试的陷阱。我们已经了解到 `ApplicationContext` 被缓存和重用，所以我们需要考虑隔离。

像往常一样，所有的代码实现都可以在 GitHub 上找到。

OK