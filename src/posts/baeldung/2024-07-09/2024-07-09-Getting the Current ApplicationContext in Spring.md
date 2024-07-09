---
date: 2022-04-01
category:
  - Spring
  - ApplicationContext
tag:
  - Spring Framework
  - ApplicationContext
head:
  - - meta
    - name: keywords
      content: Spring, ApplicationContext, BeanFactory, Java
---
# 在Spring中获取当前的ApplicationContext

在这篇简短的教程中，我们将看到如何在Spring应用程序中获取当前的_ApplicationContext_。

_ApplicationContext_代表Spring IoC容器，它保存了应用程序创建的所有bean。它负责实例化、配置和创建bean。此外，它从XML或Java提供的配置元数据中获取bean的信息。

_ApplicationContext_是_BeanFactory_的子接口。除了_BeanFactory_的功能外，它还包括消息解析和国际化、资源加载和事件发布等功能。此外，它具有加载多个上下文的功能。

**每个bean都是在容器启动后实例化的，因为它使用急切加载。**

我们可能想要使用这个容器来访问我们应用程序中的其他bean和资源。我们将学习两种在Spring应用程序中获取当前_ApplicationContext_引用的方法。

### 3. ApplicationContext Bean

**获取当前_ApplicationContext_的最简单方式是使用_@Autowired_注解将其注入到我们的bean中。**

首先，让我们声明实例变量，并用_@Autowired_注解进行注解：

```java
@Component
public class MyBean {
    @Autowired
    private ApplicationContext applicationContext;

    public ApplicationContext getApplicationContext() {
        return applicationContext;
    }
}
```

我们可以使用_@Inject_注解代替_@Autowired_。

为了验证容器是否正确注入，让我们创建一个测试：

```java
@Test
void whenGetApplicationContext_thenReturnApplicationContext(){
    assertNotNull(myBean);
    ApplicationContext context = myBean.getApplicationContext();
    assertNotNull(context);
}
```

### 4. ApplicationContextAware 接口

另一种获取当前上下文的方法是通过实现_ApplicationContextAware_接口。它包含_setApplicationContext()_方法，Spring在创建_ApplicationContext_后调用此方法。

**此外，当应用程序启动时，Spring会自动检测到这个接口，并将_ApplicationContext_的引用注入。**

现在，让我们创建实现_ApplicationContextAware_接口的_ApplicationContextProvider_类：

```java
@Component
public class ApplicationContextProvider implements ApplicationContextAware {
    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ApplicationContextProvider.applicationContext = applicationContext;
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }
}
```

我们声明了_applicationContext_实例变量为_static_，这样我们可以在任何类中访问它。此外，我们创建了一个静态方法来检索对_ApplicationContext_的引用。

现在，我们可以通过调用静态的_getApplicationContext()_方法来获取当前的_ApplicationContext_对象：

```java
@Test
void whenGetApplicationContext_thenReturnApplicationContext() {
    ApplicationContext context = ApplicationContextProvider.getApplicationContext();
    assertNotNull(context);
}
```

此外，通过实现接口，一个bean可以获得对_ApplicationContext_的引用，并访问其他bean或资源。

为了实现这一点，首先，让我们创建_ItemService_类：

```java
@Service
public class ItemService {
    // ...
}
```

其次，要从上下文中获取_ItemService_ bean，让我们在_ApplicationContext_上调用_getBean()_方法：

```java
@Test
void whenGetBean_thenReturnItemServiceReference() {
    ApplicationContext context = ApplicationContextProvider.getApplicationContext();
    assertNotNull(context);

    ItemService itemService = context.getBean(ItemService.class);
    assertNotNull(itemService);
}
```

### 5. 结论

在这篇简短的文章中，我们学习了如何在Spring Boot应用程序中获取当前的_ApplicationContext_。总结起来，我们可以直接注入_ApplicationContext_ bean，或者实现_ApplicationContextAware_接口。

如常，所有源代码都可以在GitHub上找到。头文件中的日期、分类和标签信息需要根据网页内容来确定，而网页内容中并没有提供这些信息。考虑到这一点，我将使用通用的分类和标签来完成翻译。以下是翻译的继续部分：

### 结论

在这篇简短的文章中，我们学习了如何在Spring Boot应用程序中获取当前的_ApplicationContext_。总结一下，我们可以直接注入_ApplicationContext_ bean，或者实现_ApplicationContextAware_接口。

正如往常一样，完整的源代码可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/8b2c4148df481ca115ca7c0151fe8c93?s=50&r=g)![img](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

---

以上是翻译的完整内容。OK。