---
date: 2022-04-01
category:
  - Spring Framework
  - Java
tag:
  - Spring
  - Beans
  - Java Configuration
head:
  - - meta
    - name: keywords
      content: Spring, Beans, Java Configuration
------
# 使用Spring注解实例化同一类的多个Bean

## 1. 概述

Spring IoC容器创建和管理Spring Bean，这些Bean是我们应用程序的核心。创建一个Bean的实例与从普通的Java类创建对象是相同的。然而，生成同一类的多个Bean可能会有些挑战。

在本教程中，我们将学习如何使用Spring框架中的注解来创建同一类的多个Bean。

## 2. 使用Java配置

**这是使用注解创建同一类多个Bean的最简单和最容易的方法。** 在这种方法中，我们将使用基于Java的配置类来配置同一类的多个Bean。

让我们考虑一个简单的例子。我们有一个_Person_类，它有两个类成员，_firstName_和_lastName_：

```java
public class Person {
    private String firstName;
    private String lastName;

    public Person(String firstName, String secondName) {
        super();
        this.firstName = firstName;
        this.lastName = secondName;
    }

    @Override
    public String toString() {
        return "Person [firstName=" + firstName + ", secondName=" + lastName + "]";
    }
}
```

接下来，我们将构建一个名为_PersonConfig_的配置类，并在其内部定义_Person_类的多个Bean：

```java
@Configuration
public class PersonConfig {
    @Bean
    public Person personOne() {
        return new Person("Harold", "Finch");
    }

    @Bean
    public Person personTwo() {
        return new Person("John", "Reese");
    }
}
```

**在这里，** **_@Bean_ 注解实例化了两个Bean，其ID与方法名称相同，并将它们注册到_BeanFactory_（Spring容器）接口中。** 接下来，我们可以初始化Spring容器，并从Spring容器中请求任何Bean。这种策略还使得实现依赖注入变得简单。我们可以直接将一个Bean，比如_personOne_，通过自动装配注入到同一类型的另一个Bean中，比如_personTwo_。

**这种方法的局限性在于我们需要使用_new_关键字手动实例化Bean，这是典型的基于Java的配置风格。** **因此，如果同一类的Bean数量增加，我们需要先注册它们，然后在配置类中创建Bean。** 这使得它更是一种Java特定的方法，而不是Spring特定的方法。

## 3. 使用_@Component_注解

在这种方法中，我们将使用_@Component_注解来创建多个从_Person_类继承属性的Bean。首先，我们将创建多个子类，即_PersonOne_和_PersonTwo_，它们扩展了_Person_超类：

```java
@Component
public class PersonOne extends Person {

    public PersonOne() {
        super("Harold", "Finch");
    }
}
```

```java
@Component
public class PersonTwo extends Person {

    public PersonTwo() {
        super("John", "Reese");
    }
}
```

接下来，在_PersonConfig_文件中，我们将使用_@ComponentScan_注解来启用整个包的组件扫描。**这使得Spring容器能够自动创建任何带有_@Component_注解的类的Bean：**

```java
@Configuration
@ComponentScan("com.baeldung.multibeaninstantiation.solution2")
public class PersonConfig {

}
```

现在我们可以直接从Spring容器中使用_PersonOne_或_PersonTwo_ Bean。在其他地方，我们可以使用_Person_类Bean。**这种方法的问题是它不创建同一类的多个实例。相反，它创建了从超类继承属性的类的Bean。**

因此，我们只能在继承类没有定义任何额外属性的情况下使用这种解决方案。**此外，** **使用继承增加了代码的整体复杂性。**

## 4. 使用_BeanFactoryPostProcessor_

**第三种也是最后一种方法利用自定义实现的_BeanFactoryPostProcessor_接口来创建同一类的多个Bean实例。**

这可以通过以下步骤实现：

- 创建一个自定义Bean类，并使用_FactoryBean_接口进行配置
- 使用_BeanFactoryPostProcessor_接口实例化同一类型的多个Bean

### 4.1. 自定义Bean实现

为了更好地理解这种方法，我们将进一步扩展同一个例子。假设有一个_Human_类，它依赖于多个_Person_类的实例：

```java
public class Human implements InitializingBean {

    private Person personOne;

    private Person personTwo;

    @Override
    public void afterPropertiesSet() throws Exception {
        Assert.notNull(personOne, "Harold is alive!");
        Assert.notNull(personTwo, "John is alive!");
    }

    /* Setter注入 */
    @Autowired
    public void setPersonOne(Person personOne) {
        this.personOne = personOne;
        this.personOne.setFirstName("Harold");
        this.personOne.setSecondName("Finch");
    }

    @Autowired
    public void setPersonTwo(Person personTwo) {
        this.personTwo = personTwo;
        this.personTwo.setFirstName("John");
        this.personTwo.setSecondName("Reese");
    }
}
```

**_InitializingBean_接口调用_afterPropertiesSet()_方法来检查_BeanFactory_是否设置了所有Bean属性，并满足了其他依赖关系。** 此外，我们使用setter注入初始化了两个_Person_类Bean，_personOne_和_personTwo_。接下来，我们将创建一个实现_FactoryBean_接口的_Person_类。

**_FactoryBean_充当IoC容器中创建其他Bean的工厂。** 这个接口的目的是创建实现它的Bean的更多实例。在我们的例子中，它生成_Person_类的实例，并自动进行配置：

```java
@Qualifier(value = "personOne, personTwo")
public class Person implements FactoryBean`<Object>` {
    private String firstName;
    private String secondName;

    public Person() {
        // 初始化代码（可选）
    }

    @Override
    public Class`<Person>` getObjectType() {
        return Person.class;
    }

    @Override
    public Object getObject() throws Exception {
        return new Person();
    }

    public boolean isSingleton() {
        return true;
    }

    // getter和setter的代码
}
```

**这里需要注意的第二件重要事情是使用_@Qualifier_注解，其中包含类级别上多个_Person_类型的名称或Bean ID。** 在这种情况下，使用类级别上的_@Qualifier_是有原因的，我们将在接下来看到。

### 4.2. 自定义_BeanFactory_实现

现在我们将使用自定义实现的_BeanFactoryPostProcessor_接口。

**任何实现_BeanFactoryPostProcessor_的类都会在任何Spring Bean创建之前执行。** 这允许我们配置和操作Bean生命周期。

**_BeanFactoryPostProcessor_扫描所有带有_@Qualifier_注解的类。** **此外，它从该注解中提取名称（Bean ID），并手动创建该类类型的实例，名称为指定的名称：**

```java
public class PersonFactoryPostProcessor implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        Map``<String, Object>`` map = beanFactory.getBeansWithAnnotation(Qualifier.class);
        for (Map.Entry``<String, Object>`` entry : map.entrySet()) {
            createInstances(beanFactory, entry.getKey(), entry.getValue());
        }
    }

    private void createInstances(ConfigurableListableBeanFactory beanFactory, String beanName, Object bean) {
        Qualifier qualifier = bean.getClass().getAnnotation(Qualifier.class);
        for (String name : extractNames(qualifier)) {
            Object newBean = beanFactory.getBean(beanName);
            beanFactory.registerSingleton(name.trim(), newBean);
        }
    }

    private String[] extractNames(Qualifier qualifier) {
        return qualifier.value().split(",");
    }
}
```

**在这里，** **自定义_BeanFactoryPostProcessor_实现在Spring容器初始化后被调用一次。**

接下来，为了简单起见，我们将使用Java配置类来初始化自定义以及_BeanFactory_实现：

```java
@Configuration
public class PersonConfig {
    @Bean
    public PersonFactoryPostProcessor PersonFactoryPostProcessor() {
        return new PersonFactoryPostProcessor();
    }

    @Bean
    public Person person() {
        return new Person();
    }

    @Bean
    public Human human() {
        return new Human();
    }
}
```

**这种方法的局限性在于其复杂性。此外，不鼓励使用，因为它不是在典型的Spring应用程序中配置Bean的自然方式。** 尽管有局限性，这种方法更具有Spring特性，并实现了使用注解实例化类似类型的多个Bean的目的。

## 5. 结论

在本文中，我们通过三种不同的方法学习了如何使用Spring注解实例化同一类的多个Bean。前两种方法是简单的Java特定方式来实例化多个Spring Bean。第三种方法有点棘手且复杂，但它实现了使用注解创建Bean的目的。

一如既往，示例的源代码可在GitHub上获得。