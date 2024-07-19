---
date: 2022-04-01
category:
  - Spring
  - Spring Boot
tag:
  - Spring Framework
  - Custom Annotation
head:
  - - meta
    - name: keywords
      content: Spring, Spring Boot, Custom Annotation, Beans, Injection
---

# 在Spring中查找所有带有自定义注解的Bean

在本教程中，我们将解释如何在Spring中查找所有带有自定义注解的Bean。我们将展示根据不同的Spring版本使用的不同方法。

## 2. 使用Spring Boot 2.2或更高版本

自Spring Boot 2.2以来，我们可以使用`getBeansWithAnnotation`方法。

让我们构建一个示例。首先，我们将定义我们的自定义注解。我们将使用`@Retention(RetentionPolicy.RUNTIME)`对其进行注解，以确保程序在运行时可以访问该注解：

```
@Retention(RetentionPolicy.RUNTIME)
public @interface MyCustomAnnotation {
}
```

现在，让我们定义一个带有我们注解的第一个Bean。我们还将使用`@Component`对其进行注解：

```
@Component
@MyCustomAnnotation
public class MyComponent {
}
```

然后，让我们定义另一个带有我们注解的Bean。但这次我们将通过`@Configuration`文件中的`@Bean`注解方法来创建它：

```
public class MyService {
}

@Configuration
public class MyConfigurationBean {
    @Bean
    @MyCustomAnnotation
    MyService myService() {
        return new MyService();
    }
}
```

现在，让我们编写一个测试来检查`getBeansWithAnnotation`方法是否可以检测到我们的两个Bean：

```
@Test
void whenApplicationContextStarted_ThenShouldDetectAllAnnotatedBeans() {
    try (AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(MyComponent.class, MyConfigurationBean.class)) {
        Map`<String, Object>` beans = applicationContext.getBeansWithAnnotation(MyCustomAnnotation.class);
        assertEquals(2, beans.size());
        assertTrue(beans.keySet().containsAll(List.of("myComponent", "myService")));
    }
}
```

## 3. 使用旧版本的Spring

### 3.1. 历史背景

在5.2之前的Spring Framework版本中，`getBeansWithAnnotation`方法只能检测到在类或接口级别注解的Bean，但不能检测到在工厂方法级别注解的Bean。

Spring Boot 2.2升级了Spring Framework依赖到5.2，这就是为什么使用旧版本的Spring时，我们刚刚编写的测试会失败：

- `MyComponent` Bean被正确检测到，因为注解在类级别
- `MyService` Bean没有被检测到，因为它是通过工厂方法创建的

让我们看看如何绕过这种行为。

### 3.2. 使用@Qualifier装饰自定义注解

有一个相当单的解决方法：我们可以简单地使用`@Qualifier`来装饰我们的注解。

然后我们的注解看起来像这样：

```
@Retention(RetentionPolicy.RUNTIME)
@Qualifier
public @interface MyCustomAnnotation {
}
```

现在，我们能够自动注入两个注解的Bean。让我们通过一个测试来检查：

```
@Autowired
@MyCustomAnnotation
private List`<Object>` annotatedBeans;

@Test
void whenAutowiring_ThenShouldDetectAllAnnotatedBeans() {
    assertEquals(2, annotatedBeans.size());
    List``````<String>`````` classNames = annotatedBeans.stream()
        .map(Object::getClass)
        .map(Class::getName)
        .map(s -> s.substring(s.lastIndexOf(".") + 1))
        .collect(Collectors.toList());
    assertTrue(classNames.containsAll(List.of("MyComponent", "MyService")));
}
```

这种解决方法最简单，但是，**它可能不符合我们的需求，例如，如果我们不拥有注解**。

让我们还注意到，使用`@Qualifier`装饰我们的自定义注解会将其变成Spring的限定符。

### 3.3. 列出通过工厂方法创建的Bean

现在我们已经理解了问题主要出现在通过工厂方法创建的Bean上，让我们专注于如何只列出这些Bean。我们将展示一个在所有情况下都有效的解决方案，而不需要对我们的自定义注解进行任何更改。我们将使用反射来访问Bean的注解。

鉴于我们可以访问Spring的`ApplicationContext`，我们将按照以下步骤进行：

- 访问`BeanFactory`
- 查找与每个Bean相关联的`BeanDefinition`
- 检查`BeanDefinition`的来源是否是`AnnotatedTypeMetadata`，这意味着我们将能够访问Bean的注解
- 如果Bean有注解，检查所需的注解是否在其中

让我们创建我们自己的`BeanUtils`工具类，并在方法中实现这个逻辑：

```
public class BeanUtils {
    public static List``````<String>`````` getBeansWithAnnotation(GenericApplicationContext applicationContext, Class````<?>```` annotationClass) {
        List``````<String>`````` result = new ArrayList``````<String>``````();
        ConfigurableListableBeanFactory factory = applicationContext.getBeanFactory();
        for(String name : factory.getBeanDefinitionNames()) {
            BeanDefinition bd = factory.getBeanDefinition(name);
            if(bd.getSource() instanceof AnnotatedTypeMetadata) {
                AnnotatedTypeMetadata metadata = (AnnotatedTypeMetadata) bd.getSource();
                if (metadata.getAnnotationAttributes(annotationClass.getName()) != null) {
                    result.add(name);
                }
            }
        }
        return result;
    }
}
```

或者，我们也可以使用`Streams`来编写相同的函数：

```
public static List``````<String>`````` getBeansWithAnnotation(GenericApplicationContext applicationContext, Class````<?>```` annotationClass) {
    ConfigurableListableBeanFactory factory = applicationContext.getBeanFactory();
    return Arrays.stream(factory.getBeanDefinitionNames())
        .filter(name -> isAnnotated(factory, name, annotationClass))
        .collect(Collectors.toList());
}

private static boolean isAnnotated(ConfigurableListableBeanFactory factory, String beanName, Class````<?>```` annotationClass) {
    BeanDefinition beanDefinition = factory.getBeanDefinition(beanName);
    if(beanDefinition.getSource() instanceof AnnotatedTypeMetadata) {
        AnnotatedTypeMetadata metadata = (AnnotatedTypeMetadata) beanDefinition.getSource();
        return metadata.getAnnotationAttributes(annotationClass.getName()) != null;
    }
    return false;
}
```

在这些方法中，我们使用了`GenericApplicationContext`，它是Spring `ApplicationContext`的一个实现，不假定特定的Bean定义格式。

要访问`GenericApplicationContext`，例如，我们可以将其注入到一个Spring组件中：

```
@Component
public class AnnotatedBeansComponent {
    @Autowired
    GenericApplicationContext applicationContext;

    public List``````<String>`````` getBeansWithAnnotation(Class````<?>```` annotationClass) {
        return BeanUtils.getBeansWithAnnotation(applicationContext, annotationClass);
    }
}
```

## 4. 结论

在本文中，我们讨论了如何列出带有给定注解的Bean。我们看到自Spring Boot 2.2以来，这是通过`getBeansWithAnnotation`方法自然完成的。

另一方面，我们也展示了一些替代方法来克服这种方法以前行为的限制：要么仅在我们的注解上添加`@Qualifier`，要么通过查找Bean，使用反射来检查它们是否有注解。

如常，完整的代码可在GitHub上获得。