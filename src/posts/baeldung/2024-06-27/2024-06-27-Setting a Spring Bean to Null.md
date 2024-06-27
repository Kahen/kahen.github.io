---
date: 2024-06-27
category:
  - Spring
  - Java
tag:
  - Spring Framework
  - Bean Configuration
head:
  - - meta
    - name: keywords
      content: Spring, Java, Bean, Null, Configuration
---

# 在Spring中设置Bean为Null的多种方式

## 1. 概述

在本教程中，我们将学习如何在Spring上下文中将Bean设置为null。这在某些情况下可能会很有用，例如在测试时我们不想提供模拟对象。此外，在使用一些可选特性时，我们可能想要避免创建实现并传递null。

此外，这种方法可以创建占位符，如果我们想将选择所需实现的决定推迟到Bean生命周期之外。最后，这种技术可能是在废弃过程中的第一步，涉及从上下文中移除特定的Bean。

## 2. 组件设置

存在几种方法可以将Bean设置为null，这取决于上下文的配置方式。我们将考虑XML、注解和Java配置。我们将使用两个类进行简单的设置：

```java
@Component
public class MainComponent {
    private SubComponent subComponent;
    public MainComponent(final SubComponent subComponent) {
        this.subComponent = subComponent;
    }
    public SubComponent getSubComponent() {
        return subComponent;
    }
    public void setSubComponent(final SubComponent subComponent) {
        this.subComponent = subComponent;
    }
}

```

我们将展示如何在Spring上下文中将SubComponent设置为null：

```java
@Component
public class SubComponent {}
```

## 3. 使用XML配置中的占位符

在XML配置中，我们可以使用一个特殊的占位符来标识null值：

```xml
```<beans>```
    ```<bean class="com.baeldung.nullablebean.MainComponent" name="mainComponent">```
        `<constructor-arg>`
            `<null/>`
        `</constructor-arg>`
    ````</bean>````
```</beans>```
```

此配置将提供以下结果：

```java
@Test
void givenNullableXMLContextWhenCreatingMainComponentThenSubComponentIsNull() {
    ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
      "nullable-application-context.xml");
    MainComponent bean = context.getBean(MainComponent.class);
    assertNull(bean.getSubComponent());
}
```

## 4. 使用XML配置中的SpEL

我们可以使用XML中的SpEL实现类似的结果。与之前的配置相比，将会有几个不同之处：

```xml
```<beans>```
    ```<bean class="com.baeldung.nullablebean.MainComponent" name="mainComponent">```
        `<constructor-arg value="#{null}"/>`
    ````</bean>````
```</beans>```
```

与上一个测试类似，我们可以确定SubComponent是null：

```java
@Test
void givenNullableSpELXMLContextWhenCreatingMainComponentThenSubComponentIsNull() {
    ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
      "nullable-spel-application-context.xml");
    MainComponent bean = context.getBean(MainComponent.class);
    assertNull(bean.getSubComponent());
}
```

## 5. 使用XML配置中的SpEL和属性

改进之前解决方案的一种方法是将Bean名称存储在属性文件中。这样，我们就可以在需要时传递null值，而无需更改配置：

```
nullableBean = null
```

XML配置将使用PropertyPlaceholderConfigurer来读取属性：

```xml
```<beans>```
    `<bean id="propertyConfigurer"
      class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">`
        `<property name="location" value="classpath:nullable.properties"/>`
    ````</bean>````
    ```<bean class="com.baeldung.nullablebean.MainComponent" name="mainComponent">```
        `<constructor-arg value="#{ ${nullableBean} }"/>`
    ````</bean>````
    `<bean class="com.baeldung.nullablebean.SubComponent" name="subComponent"/>`
```</beans>```
```

然而，我们应该在SpEL表达式内部使用属性占位符，以便正确读取值。结果，我们将初始化SubComponent为null：

```java
@Test
void givenNullableSpELXMLContextWithNullablePropertiesWhenCreatingMainComponentThenSubComponentIsNull() {
    ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
      "nullable-configurable-spel-application-context.xml");
    MainComponent bean = context.getBean(MainComponent.class);
    assertNull(bean.getSubComponent());
}
```

要提供实现，我们只需要更改属性即可：

```
nullableBean = subComponent
```

## 6. Java配置中的Null Supplier

直接从带有@Bean注解的方法返回null是不可能的。这就是为什么我们需要以某种方式包装它。我们可以使用Supplier来实现这一点：

```java
@Bean
public Supplier``<SubComponent>`` subComponentSupplier() {
    return () -> null;
}
```

从技术上讲，我们可以使用任何类来包装null值，但使用Supplier更为符合习惯。在null的情况下，我们不关心Supplier可能被调用多次。然而，如果我们想要为常规Bean实现类似的解决方案，我们必须确保如果需要单例，Supplier提供了相同的实例。

这个解决方案也将提供正确的行为：

```java
@Test
void givenNullableSupplierContextWhenCreatingMainComponentThenSubComponentIsNull() {
    AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(
      NullableSupplierConfiguration.class);
    MainComponent bean = context.getBean(MainComponent.class);
    assertNull(bean.getSubComponent());
}
```

请注意，简单地从@Bean返回null可能会造成问题：

```java
@Bean
public SubComponent subComponent() {
    return null;
}
```

在这种情况下，上下文将因UnsatisfiedDependencyException失败：

```java
@Test
void givenNullableContextWhenCreatingMainComponentThenSubComponentIsNull() {
    assertThrows(UnsatisfiedDependencyException.class, () -> new AnnotationConfigApplicationContext(
      NullableConfiguration.class));
}
```

## 7. 使用Optional

当使用Optional时，Spring会自动识别Bean可以从上下文中缺失并传递null，而无需任何额外配置：

```java
@Bean
public MainComponent mainComponent(Optional``<SubComponent>`` optionalSubComponent) {
    return new MainComponent(optionalSubComponent.orElse(null));
}
```

如果Spring在上下文中找不到SubComponent，它将传递一个空的Optional：

```java
@Test
void givenOptionableContextWhenCreatingMainComponentThenSubComponentIsNull() {
    AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(
      OptionableConfiguration.class);
    MainComponent bean = context.getBean(MainComponent.class);
    assertNull(bean.getSubComponent());
}
```

## 8. 非必需的自动装配

将null作为Bean的值的另一种方法是将其声明为非必需的。然而，这种方法仅适用于非构造函数注入：

```java
@Component
public class NonRequiredMainComponent {
    @Autowired(required = false)
    private NonRequiredSubComponent subComponent;
    public NonRequiredSubComponent getSubComponent() {
        return subComponent;
    }
    public void setSubComponent(final NonRequiredSubComponent subComponent) {
        this.subComponent = subComponent;
    }
}
```

这个依赖项对于组件的正常运行不是必需的：

```java
@Test
void givenNonRequiredContextWhenCreatingMainComponentThenSubComponentIsNull() {
    AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(
      NonRequiredConfiguration.class);
    NonRequiredMainComponent bean = context.getBean(NonRequiredMainComponent.class);
    assertNull(bean.getSubComponent());
}
```

## 9. 使用@Nullable

此外，我们可以使用@Nullable注解来标识我们期望Bean可能是null。Spring和Jakarta的注解都可以为此工作：

```java
@Component
public class NullableMainComponent {
    private NullableSubComponent subComponent;
    public NullableMainComponent(final @Nullable NullableSubComponent subComponent) {
        this.subComponent = subComponent;
    }
    public NullableSubComponent getSubComponent() {
        return subComponent;
    }
    public void setSubComponent(final NullableSubComponent subComponent) {
        this.subComponent = subComponent;
    }
}
```

我们不需要将NullableSubComponent标识为Spring组件：

```java
public class NullableSubComponent {}
```

Spring上下文将根据@Nullable注解将其设置为null：

```java
@Test
void givenContextWhenCreatingNullableMainComponentThenSubComponentIsNull() {
    AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(
      NullableJavaConfiguration.class);
    NullableMainComponent bean = context.getBean(NullableMainComponent.class);
    assertNull(bean.getSubComponent());
}
```

## 10. 结论

在Spring上下文中使用null不是最常见的做法，但有时可能是合理的。然而，将Bean设置为null的过程可能不是很直观。

在本文中，我们学习了多种解决这个问题的方法。

如往常一样，文章的代码可以在GitHub上找到。
OK