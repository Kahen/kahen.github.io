---
date: 2024-07-22
category:
  - Spring
  - Autowired
tag:
  - NullPointerException
  - Spring Framework
  - Dependency Injection
head:
  - - meta
    - name: keywords
      content: Spring Autowired, NullPointerException, Dependency Injection
---
# Spring @Autowired 字段为 Null - 常见原因及解决方案

在本教程中，我们将看到导致@Autowired字段出现NullPointerException的常见错误。我们还将解释如何修复这个问题。

## 2. 问题介绍

首先，让我们定义一个带有空doWork方法的Spring组件：

```java
@Component
public class MyComponent {
    public void doWork() {}
}
```

然后，让我们定义我们的服务类。我们将使用Spring的能力将MyComponent bean注入到我们的服务中，以便我们可以在服务方法中调用doWork方法：

```java
public class MyService {

    @Autowired
    MyComponent myComponent;

    public String serve() {
        myComponent.doWork();
        return "success";
    }
}
```

现在，让我们添加一个控制器，它将实例化服务并调用serve方法：

```java
@Controller
public class MyController {

    public String control() {
        MyService userService = new MyService();
        return userService.serve();
    }
}
```

乍一看，我们的代码可能看起来完全没问题。然而，在运行应用程序后，调用我们控制器的control方法将导致以下异常：

```java
java.lang.NullPointerException: null
  at com.baeldung.autowiring.service.MyService.serve(MyService.java:14)
  at com.baeldung.autowiring.controller.MyController.control(MyController.java:12)
```

这里发生了什么？当我们在控制器中调用MyService构造函数时，我们创建了一个不受Spring管理的对象。**由于Spring不知道这个MyService对象的存在，它无法在其内部注入MyComponent bean。** 因此，我们在MyService对象中创建的MyComponent实例将保持为null，导致我们在尝试调用该对象上的方法时得到NullPointerException。

## 3. 解决方案

**要解决这个问题，我们必须使我们在控制器中使用的MyService实例成为一个Spring管理的Bean。**

首先，让我们告诉Spring为我们的MyService类生成一个Bean。我们有多种方法可以实现这一点。最简单的方法是使用@Component注解或其任何衍生注解来装饰MyService类。例如，我们可以这样做：

```java
@Service
public class MyService {

    @Autowired
    MyComponent myComponent;

    public String serve() {
        myComponent.doWork();
        return "success";
    }
}
```

实现相同目标的另一种替代方法是在@Configuration文件中添加一个@Bean方法：

```java
@Configuration
public class MyServiceConfiguration {

    @Bean
    MyService myService() {
        return new MyService();
    }
}
```

然而，将MyService类变成Spring管理的bean还不够。现在，我们必须在控制器中自动装配它，而不是调用new。让我们看看控制器的修正版本：

```java
@Controller
public class MyController {

    @Autowired
    MyService myService;

    public String control() {
        return myService.serve();
    }
}
```

现在，调用control方法将按预期返回serve方法的结果。

## 4. 结论

在本文中，我们看到了一种非常常见的错误，当我们无意中将Spring注入与我们通过调用它们的构造函数创建的对象混合时，会导致NullPointerException。我们通过避免这种责任混乱，将我们过去自己管理的对象变成了Spring管理的Bean来解决问题。

如往常一样，代码可以在GitHub上找到。