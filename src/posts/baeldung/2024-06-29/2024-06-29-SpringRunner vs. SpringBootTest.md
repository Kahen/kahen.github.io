---
date: 2024-06-29
category:
  - Spring
  - Testing
tag:
  - SpringRunner
  - SpringBootTest
head:
  - - meta
    - name: keywords
      content: SpringRunner, SpringBootTest, JUnit, Spring, Testing
---

# SpringRunner与SpringBootTest | Baeldung

测试对于任何应用程序都至关重要，无论是单元测试还是集成测试。SpringRunner和SpringBootTest类构成了运行集成测试的基础。

在本教程中，我们将学习这两个类。我们将学习如何在代码中使用它们，并了解它们的相似之处和不同之处。

SpringRunner是SpringJUnit4ClassRunner类的别名，适用于基于JUnit4的测试类。它通过Spring TestContext加载，通过该上下文，Spring的bean和配置可以在JUnit注解的配合下使用。我们至少需要JUnit 4.12才能使用它。

在代码中使用时，需要在测试类上注解@RunWith(SpringRunner.class)：
```
@RunWith(SpringRunner.class)
public class SampleIntegrationTest {
    
    @Test
    public void test() {
        // 
    }
}
```

SpringBootTest是SpringRunner的替代品，适用于JUnit5。它也用于运行集成测试并加载Spring TestContext。

它非常丰富，并通过其注解参数提供许多配置。它支持各种Web环境模式，如MOCK、RANDOM_PORT、DEFINED_PORT和NONE。我们可以通过其注解传递应用程序属性，这些属性在测试运行之前注入到Spring环境中：
```
@SpringBootTest(
  properties = {"user.name=test_user"},
  webEnvironment = MOCK)
public class SampleIntegrationTest {
    
    @Test
    public void test() {
        // 
    }
}
```

需要在类级别上使用@SpringBootTest注解来运行集成测试。

在下表中，我们将比较这两个类及其优缺点。

| SpringRunner | SpringBootTest |
| ---| ---|
| 用于运行集成测试并加载Spring TestContext | 用于运行集成测试并加载Spring TestContext |
| 也可以使用JUnit注解 | 也可以使用JUnit注解 |
| 需要JUnit4.12或更高版本 | 需要JUnit5或更高版本 |
| 配置API不丰富 | 提供丰富的API来配置测试配置 |
| 不推荐使用 | 推荐使用，因为它支持新特性且易于使用 |

### 结论

在本文中，我们学习了SpringRunner和SpringBootTest。我们学习了如何使用它们。我们还比较了它们，并了解了它们的差异和相似之处。

我们应该**使用SpringBootTest，因为它支持最新的JUnit，但当有要求使用JUnit 4时，SpringRunner是选择**。翻译已经结束，以下是剩余部分的翻译：

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/73605f2d9b407975571233c9b04a1a49?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK