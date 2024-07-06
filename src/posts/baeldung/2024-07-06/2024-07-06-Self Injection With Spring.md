---
date: 2022-04-01
category:
  - Spring
  - Java
tag:
  - Spring Framework
  - Self-Injection
head:
  - - meta
    - name: keywords
      content: Spring, Java, Self-Injection, AOP, ApplicationContextAware
---

# Spring中的自我注入

自我注入意味着一个Spring bean将自己作为依赖项注入。它使用Spring容器来获取自己的引用，然后使用该引用执行某些操作。

在这个简短的教程中，我们将看到如何在Spring中使用自我注入。

## 2. 自我注入的使用案例

自我注入最常见的使用案例是当需要将一个切面应用于一个自引用的方法或类时，绕过Spring AOP的限制。

假设我们有一个服务类执行一些业务逻辑，并且需要在该逻辑的一部分调用它自己的一个方法：

```java
@Service
public class MyService {
    public void doSomething() {
        // ...
        doSomethingElse();
    }

    @Transactional
    public void doSomethingElse() {
        // ...
    }
}
```

然而，当我们运行应用程序时，我们可能会注意到`@Transactional`没有被应用。这是因为`doSomething()`方法直接调用`doSomethingElse()`，绕过了Spring代理。

为了解决这个问题，我们可以使用自我注入来获取Spring代理的引用，并通过该代理调用方法。

## 3. 使用@Autowired进行自我注入

我们可以通过在bean的字段、构造函数参数或setter方法上使用@Autowired注解来在Spring中执行自我注入。

以下是使用字段进行自我注入的示例：

```java
@Component
public class MyBean {
    @Autowired
    private MyBean self;

    public void doSomething() {
        // 在这里使用自我引用
    }
}
```

以及使用构造函数参数：

```java
@Component
public class MyBean {
    private MyBean self;

    @Autowired
    public MyBean(MyBean self) {
        this.self = self;
    }

    // ...
}
```

## 4. 使用ApplicationContextAware进行自我注入

另一种进行自我注入的方法是通过实现ApplicationContextAware接口。这个接口允许bean意识到Spring应用程序上下文并获取自己的引用：

```java
@Component
public class MyBean implements ApplicationContextAware {
    private ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext context) throws BeansException {
        this.context = context;
    }

    public void doSomething() {
        MyBean self = context.getBean(MyBean.class);
        // ...
    }
}
```

## 5. 缺点

当一个bean注入自己时，**它可能会造成对bean责任的混淆**，并使追踪应用程序中数据流变得更加困难。

自我注入**也可能创建循环依赖**。从2.6版本开始，如果项目有循环依赖，Spring Boot将引发异常。当然，也有一些解决方法。

## 6. 结论

在这篇快速文章中，我们学习了在Spring中使用自我注入的几种方式以及何时使用它。我们还了解了Spring中自我注入的一些缺点。

OK