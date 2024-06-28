---
date: 2022-04-01
category:
  - Spring
  - Annotation
tag:
  - ConditionalOnThreading
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: Spring Boot, ConditionalOnThreading, Annotation, Java, Threading
---

# @ConditionalOnThreading 注解 Spring | Baeldung

寻找适合在云中运行现代Spring应用程序的理想Linux发行版？

**遇见Alpaquita Linux**：轻量级、安全且功能强大，足以处理重负载。

这个发行版是**专门为运行Java应用程序而设计的**。它基于Alpine，并具有显著的增强功能，以在高密度容器环境中表现出色，同时满足业级安全标准。

具体来说，容器镜像大小比标准选项**小约30%**，并且它消耗的RAM**少达30%**：

**>> 立即尝试** **Alpaquita Containers。**

## 1. 引言

在这个快速教程中，我们将研究一个相对新的Spring Boot注解，称为**@ConditionalOnThreading**。

我们将发现这个注解的条件是什么，以及如何满足它以创建bean。

## 2. 条件注解

尽管我们已经在Spring Boot中涵盖了条件注解，但再次非常简要地回顾它们是值得的。

条件注解提供了一种方式，只有在满足各种特定条件时才在_BeanFactory_中注册bean。开发人员通过使用_Condition_接口为每个注解单独定义这些条件。

Spring Boot带有一堆预定义的条件注解，用于常见用例。常见的示例是@_ConditionalOnProperty_、@_ConditionalOnBean_和@_ConditionalOnClass_。

## 3. @ConditionalOnThreading 理论

@ConditionalOnThreading只是Spring Boot中的另一个预定义条件注解。它在版本3.2中添加，该版本在文章创建时本身是一个候选版本。要提前访问这个候选版本，我们应该使用专用的_Spring_工件仓库。

**@ConditionalOnThreading注解仅在Spring配置为使用特定类型的线程内部时才允许创建bean**。通过线程类型，它指的是平台线程或虚拟线程。回想一下，自Java 21以来，我们有了使用虚拟线程而不是平台线程的能力。

因此，要配置Spring使用虚拟线程内部，我们使用一个名为_spring.threads.virtual.enabled_的属性。如果此属性为_true_，并且我们正在Java 21或更高版本上运行，那么@ConditionalOnThreading注解将允许创建bean。

## 4. 注解使用示例

现在让我们尝试编写一些示例来演示这个注解的用例。假设我们有两个用@ConditionalOnThreading注解的bean：

```
@Configuration
static class CurrentConfig {

    @Bean
    @ConditionalOnThreading(Threading.PLATFORM)
    ThreadingType platformBean() {
        return ThreadingType.PLATFORM;
    }

    @Bean
    @ConditionalOnThreading(Threading.VIRTUAL)
    ThreadingType virtualBean() {
        return ThreadingType.VIRTUAL;
    }
}

enum ThreadingType {
    PLATFORM, VIRTUAL
}
```

所以，有了_ConditionalOnThreading_注解，我们将创建这两个bean中的一个：_either the platformBean or virtualBean_。现在让我们创建一些测试来检查这个注解的工作原理：

```
ApplicationContextRunner applicationContextRunner = new ApplicationContextRunner()
  .withUserConfiguration(CurrentConfig.class);

@Test
@EnabledForJreRange(max = JRE.JAVA_20)
public void whenJava20AndVirtualThreadsDisabled_thenThreadingIsPlatform() {
    applicationContextRunner.withPropertyValues("spring.threads.virtual.enabled=false").run(context -> {
        Assertions.assertThat(context.getBean(ThreadingType.class)).isEqualTo(ThreadingType.PLATFORM);
    });
}

@Test
@EnabledForJreRange(min = JRE.JAVA_21)
public void whenJava21AndVirtualThreadsEnabled_thenThreadingIsVirtual() {
    applicationContextRunner.withPropertyValues("spring.threads.virtual.enabled=true").run(context -> {
        Assertions.assertThat(context.getBean(ThreadingType.class)).isEqualTo(ThreadingType.VIRTUAL);
    });
}

@Test
@EnabledForJreRange(min = JRE.JAVA_21)
public void whenJava21AndVirtualThreadsDisabled_thenThreadingIsPlatform() {
    applicationContextRunner.withPropertyValues("spring.threads.virtual.enabled=false").run(context -> {
        Assertions.assertThat(context.getBean(ThreadingType.class)).isEqualTo(ThreadingType.PLATFORM);
    });
}
```

在这里，我们有一个_ApplicationContextRunner_实例，它为测试创建了一个轻量级应用程序上下文。我们使用它来设置_spring_属性_spring.threads.virtual.enabled_的值。我们还用_@EnabledForJreRange_注解注释了测试。这个注解允许我们只在特定的Java版本上运行测试。

正如我们所注意到的，要使_ThreadingType_ bean为_Virtual_，我们必须将属性设置为_true_，并且至少是Java 21。在其他情况下，注解条件为_false_。

## 5. 结论

在这篇短文中，我们探索了一个新的Spring注解——@ConditionalOnThreading。它是Spring Boot 3.2的一部分。这个注解仅在Spring通过属性配置为使用特殊类型的线程内部时才允许创建bean。

如往常一样，文章的源代码可在GitHub上找到。