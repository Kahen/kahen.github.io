---
date: 2024-06-20
category:
  - Spring
  - Testing
tag:
  - Spring Boot
  - Scheduling
  - Integration Testing
head:
  - - meta
    - name: keywords
      content: Spring, Testing, Spring Boot, Scheduling, Integration Testing
------
# 在Spring测试中禁用@EnableScheduling

无论你是刚开始还是拥有多年经验，**Spring Boot** 都是构建新应用程序的绝佳选择，使用起来非常轻松。

Jmix增强了Spring Boot开发者的能力，允许他们构建和交付**全栈Web** **应用程序**，而无需涉足前端技术。它使你能够从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了前端/后端分离及其相关的安全问题。

**Jmix平台**包括一个构建在**Spring Boot, JPA, 和 Vaadin**之上的框架，并附带Jmix Studio，这是一个**IntelliJ IDEA插件**，配备了一套开发者生产力工具。该平台还提供了**现成**的插件，用于报告生成、BPM、地图等，你可以在Jmix应用程序中使用它们或作为单独的服务。所有技术都是相互连接的，使单个Java开发者能够以整个团队的水平进行工作，**入门所需的知识最少**。

另外！Jmix可以**立即生成一个CRUD Web应用程序**，包括其JPA数据模型和UI，**直接从现有的数据库**。然后，在Jmix Studio的帮助下继续开发。

智能开发，不要辛苦开发！

**>> 成为全栈开发者**

**使用Jmix**

现在，新版的 _REST With Spring -_ **“REST With Spring Boot”** 终于发布了，当前价格将在6月22日之前有效，之后将永久增加50美元。

**>> 立即获取访问权限**

## 1. 引言

在本教程中，我们将深入探讨测试使用计划任务的Spring应用程序的主题。它们在开发测试，特别是集成测试时可能会造成头痛。我们将讨论确保它们尽可能稳定的可能选项。

## 2. 示例

让我们从一个简短的示例开始，我们将在整篇文章中使用这个示例。让我们想象一个系统，允许公司的代表向他们的客户发送通知。其中一些是时间敏感的，应该立即交付，但有些应该等到下一个工作日。因此，我们需要一个机制，将定期尝试发送它们：

```
public class DelayedNotificationScheduler {
    private NotificationService notificationService;

    @Scheduled(fixedDelayString = "${notification.send.out.delay}", initialDelayString = "${notification.send.out.initial.delay}")
    public void attemptSendingOutDelayedNotifications() {
        notificationService.sendOutDelayedNotifications();
    }
}
```

**我们可以在 _attemptSendingOutDelayedNotifications()_ 方法上看到 _@Scheduled_ 注解。** 该方法将在由 _initialDelayString_ 配置的时间过后首次被调用。一旦执行结束，Spring将在由 _fixedDelayString_ 参数配置的时间后再次调用它。该方法本身将实际逻辑委托给 _NotificationService_。

当然，我们还需要打开调度。我们通过在带有 _@Configuration_ 注解的类上应用 _@EnableScheduling_ 注解来实现这一点。虽然至关重要，但我们将不在这里深入讨论，因为它与主题紧密相关。稍后，我们将看到几种方法，我们如何以不干扰测试的方式做到这一点。

## 3. 集成测试中的计划任务问题

首先，让我们为我们的通知应用程序编写一个基本的集成测试：

```
@SpringBootTest(
  classes = { ApplicationConfig.class, SchedulerTestConfiguration.class },
  properties = {
      "notification.send.out.delay: 10",
      "notification.send.out.initial.delay: 0"
  }
)
public class DelayedNotificationSchedulerIntegrationTest {
    @Autowired
    private Clock testClock;

    @Autowired
    private NotificationRepository repository;

    @Autowired
    private DelayedNotificationScheduler scheduler;

    @Test
    public void whenTimeIsOverNotificationSendOutTime_thenItShouldBeSent() {
        ZonedDateTime fiveMinutesAgo = ZonedDateTime.now(testClock).minusMinutes(5);
        Notification notification = new Notification(fiveMinutesAgo);
        repository.save(notification);

        scheduler.attemptSendingOutDelayedNotifications();

        Notification processedNotification = repository.findById(notification.getId());
        assertTrue(processedNotification.isSentOut());
    }
}

@TestConfiguration
class SchedulerTestConfiguration {
    @Bean
    @Primary
    public Clock testClock() {
        return Clock.fixed(Instant.parse("2024-03-10T10:15:30.00Z"), ZoneId.systemDefault());
    }
}
```

重要的是要提到 _@EnableScheduling_ 注解只是应用到了 _ApplicationConfig_ 类，该类也负责创建我们在测试中自动装配的所有附加bean。

让我们运行这个测试并看看生成的日志：

```
2024-03-13T00:17:38.637+01:00  INFO 4728 --- [pool-1-thread-1] c.b.d.DelayedNotificationScheduler       : Scheduled notifications send out attempt
2024-03-13T00:17:38.637+01:00  INFO 4728 --- [pool-1-thread-1] c.b.d.NotificationService                : Sending out delayed notifications
2024-03-13T00:17:38.644+01:00  INFO 4728 --- [           main] c.b.d.DelayedNotificationScheduler       : Scheduled notifications send out attempt
2024-03-13T00:17:38.644+01:00  INFO 4728 --- [           main] c.b.d.NotificationService                : Sending out delayed notifications
2024-03-13T00:17:38.647+01:00  INFO 4728 --- [pool-1-thread-1] c.b.d.DelayedNotificationScheduler       : Scheduled notifications send out attempt
2024-03-13T00:17:38.647+01:00  INFO 4728 --- [pool-1-thread-1] c.b.d.NotificationService                : Sending out delayed notifications
```

分析输出，我们可以发现 _attemptSendingOutDelayedNotifications()_ 方法被调用了多次。

一个调用来自 _main_ 线程，而其他的来自 _pool-1-thread-1_。

我们可以观察到这种行为，因为应用程序在启动期间初始化了计划任务。它们定期在属于单独线程池的线程中调用我们的调度器。这就是为什么我们可以看到来自 _pool-1-thread-1_ 的方法调用。另一方面，来自 _main_ 线程的调用是我们在集成测试中直接调用的。

**测试通过了，但动作被调用了多次。这只是一个代码异味，但在不那么幸运的情况下，它可能会导致不稳定的测试。** 我们的测试应该尽可能明确和隔离。因此，我们应该引入修复，确保调度器被调用的唯一时间是我们直接调用它的时间。

## 4. 为集成测试禁用计划任务

让我们考虑我们可以做些什么来确保在测试期间，只有我们想要执行的代码被执行。我们将要经历的方法类似于允许我们在Spring应用程序中有条件地启用计划作业的方法，但已调整为在集成测试中使用。

### 4.1. 基于配置文件启用带有 _@EnableScheduling_ 注解的配置

**首先，我们可以将启用调度的配置部分提取到另一个配置类中。然后，我们可以根据活动的配置文件条件性地应用它。** 在我们的例子中，我们希望在 _integrationTest_ 配置文件处于活动状态时禁用调度：

```
@Configuration
@EnableScheduling
@Profile("!integrationTest")
public class SchedulingConfig {
}
```

在集成测试方面，我们需要做的就是启用上述配置文件：

```
@SpringBootTest(
  classes = { ApplicationConfig.class, SchedulingConfig.class, SchedulerTestConfiguration.class },
  properties = {
      "notification.send.out.delay: 10",
      "notification.send.out.initial.delay: 0"
  }
)
@ActiveProfiles("integrationTest")
```

这种设置确保在执行 _DelayedNotificationSchedulerIntegrationTest_ 中定义的所有测试时，调度被禁用，不会有任何代码作为计划任务自动执行。

### 4.2. 基于属性值启用带有 _@EnableScheduling_ 注解的配置

**另一种类似但仍然相似的方法是基于属性值启用应用程序的调度。** 我们可以使用已经提取的配置类，并根据不同的条件应用它：

```
@Configuration
@EnableScheduling
@ConditionalOnProperty(value = "scheduling.enabled", havingValue = "true", matchIfMissing = true)
public class SchedulingConfig {
}
```

现在，调度依赖于 _scheduling.enabled_ 属性的值。如果我们有意识地将其设置为 _false_，Spring就不会选择 _SchedulingConfig_ 配置类。集成测试方面所需的更改是最小的：

```
@SpringBootTest(
  classes = { ApplicationConfig.class, SchedulingConfig.class, SchedulerTestConfiguration.class },
  properties = {
      "notification.send.out.delay: 10",
      "notification.send.out.initial.delay: 0",
      "scheduling.enabled: false"
  }
)
```

效果与我们按照前一个想法实现的相同。

### 4.3. 微调计划任务配置

我们可以采取的最后方法是仔细微调我们的计划任务配置。我们可以为它们设置一个很长的初始延迟时间，以便集成测试在Spring尝试执行任何周期性操作之前有足够的时间执行：

```
@SpringBootTest(
  classes = { ApplicationConfig.class, SchedulingConfig.class, SchedulerTestConfiguration.class },
  properties = {
```
      "notification.send.out.delay: 10",
      "notification.send.out.initial.delay: 60000"
  }
)
```

我们刚刚设置了60秒的初始延迟。这应该有足够的时间让集成测试在Spring管理的计划任务干扰之前通过。

**然而，我们需要指出，当之前显示的选项无法引入时，这是最后的手段。避免向代码引入任何与时间相关的依赖是一个好的实践。** 有很多原因会导致测试有时需要更长的时间来执行。让我们考虑一个简单的例子，一个过度使用的CI服务器。在这种情况下，我们有可能在项目中拥有不稳定的测试。

## 5. 结论

在本文中，我们讨论了在测试使用计划任务机制的应用程序时配置集成测试的不同选项。

**我们展示了只是让调度器与集成测试同时运行的后果。我们冒着它不稳定的风险。**

接下来，我们提出了一些想法，以确保调度不会对我们的测试产生负面影响。将 _@EnableScheduling_ 注解提取到单独的配置中，并根据配置文件或属性值的条件性应用，是一个好主意。当这不可能时，我们总是可以为执行我们正在测试的逻辑的任务设置一个高初始延迟。

本文中展示的所有代码都可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。

OK