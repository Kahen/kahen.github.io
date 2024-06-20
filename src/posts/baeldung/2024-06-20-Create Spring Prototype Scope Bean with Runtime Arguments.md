---
date: 2024-06-20
category:
  - Spring
  - Java
tag:
  - Spring Framework
  - Prototype Scope
head:
  - - meta
    - name: keywords
      content: Spring, Java, Prototype Scope Bean, Runtime Arguments
---
# 在Spring中使用运行时参数创建原型作用域Bean

在这篇文章中，我们将学习如何在Spring中使用运行时参数创建原型作用域的Bean。

在Spring中，有多种不同的Bean作用域，但默认的作用域是单例，这意味着单例作用域的Bean始终会产生相同的对象。

或者，如果我们每次需要从容器中获取一个新的实例，我们可以使用原型作用域的Bean。然而，在大多数情况下，如果我们想要从单例Bean中实例化原型，或者将动态参数传递给原型Bean，我们会遇到问题。

Spring提供了许多方法来实现这些目标，我们将在本教程中深入讨论。

有时我们需要使用动态参数作为输入来初始化Spring Bean。原型Bean可以通过Spring使用多种方法来分配不同的动态参数。

我们将逐一了解它们，并查看它们的优缺点。

首先，让我们创建一个原型Bean _Employee_：

```java
public class Employee {
    private String name;

    public Employee(String name) {
        this.name = name;
    }

    public void printName() {
        System.out.println(name);
    }
}
```

同时，让我们为 _Employee_ 原型Bean创建一个配置：

```java
@Configuration
public class EmployeeConfig {
    @Bean(name = "Employee")
    @Scope(BeanDefinition.SCOPE_PROTOTYPE)
    public Employee createPrototype(String name) {
        return new Employee(name);
    }
}
```

### 2.1 使用应用程序上下文

通常，这是使用_ApplicationContext_获取原型Bean的最基本和简单的方法。

让我们将_ApplicationContext_注入到我们的组件中：

```java
@Component
public class UseEmployeePrototype {
    private ApplicationContext applicationContext;

    @Autowired
    public UseEmployeePrototype(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    public void usePrototype() {
        Employee employee = (Employee) applicationContext.getBean("Employee", "sachin");
        employee.printName();
    }
}
```

正如我们在这里看到的，我们将Bean的创建紧密耦合到_ApplicationContext_。因此，如果我们改变Bean的实现，这种方法可能会受到影响。

### 2.2 使用工厂方法

Spring提供了_ObjectFactory``<T>``_接口来按需生成给定类型的实例。

让我们使用_ObjectFactory_为我们的_Employee_ Bean创建一个_EmployeeFactory_：

```java
public class EmployeeBeanUsingObjectFactory {
    @Autowired
    private ObjectFactory``<Employee>`` employeeObjectFactory;

    public Employee getEmployee() {
        return employeeObjectFactory.getObject();
    }
}
```

在这里，每次调用_getEmployee()_时，Spring都会返回一个新的_Employee_对象。

### 2.3 使用_@Lookup_

另一种方法是使用_@Lookup_注解进行方法注入，可以解决这个问题。任何我们用_@Lookup_注解注入的方法都将被Spring容器覆盖，然后返回该方法的命名Bean。

让我们创建一个组件，并创建一个带有_@Lookup_注解的方法来获取_Employee_对象：

```java
@Component
public class EmployeeBeanUsingLookUp {
    @Lookup
    public Employee getEmployee(String arg) {
        return null;
    }
}
```

一个带有_@Lookup_注解的方法，如_getEmployee_()，将被Spring覆盖。结果，每次我们调用_getEmployee_()方法时，都会返回一个新的_Employee_实例。

**Spring将使用CGLIB生成字节码，类和方法都不能是final。**

现在，让我们测试_@Lookup_方法对给定的原型Bean，并检查它是否返回不同的实例：

```java
@Test
public void givenPrototypeBean_WhenLookup_ThenNewInstanceReturn() {
    AbstractApplicationContext context = new AnnotationConfigApplicationContext(EmployeeConfig.class);
    EmployeeBeanUsingLookUp firstContext = context.getBean(EmployeeBeanUsingLookUp.class);
    EmployeeBeanUsingLookUp secondContext = context.getBean(EmployeeBeanUsingLookUp.class);
    Employee firstInstance = firstContext.getEmployee("sachin");
    Employee secondInstance = secondContext.getEmployee("kumar");
    Assert.assertTrue(firstInstance != secondInstance);
}
```

### 2.4 使用_Function_

Spring提供了另一种选项，_Function_，用于在运行时创建原型Bean。我们也可以将参数应用于新创建的原型Bean实例。

首先，让我们创建一个使用_Function_的组件，其中名称字段将添加到实例中：

```java
@Component
public class EmployeeBeanUsingFunction {
    @Autowired
    private Function``<String, Employee>`` beanFactory;

    public Employee getEmployee(String name) {
        Employee employee = beanFactory.apply(name);
        return employee;
    }
}
```

进一步地，现在，让我们在我们的Bean配置中添加一个新的_beanFactory()_：

```java
@Configuration
public class EmployeeConfig {
    @Bean
    @Scope(value = "prototype")
    public Employee getEmployee(String name) {
        return new Employee(name);
    }

    @Bean
    public Function``<String, Employee>`` beanFactory() {
        return name -> getEmployee(name);
    }
}
```

最后，我们将检查实例是否不同：

```java
@Test
public void givenPrototypeBean_WhenFunction_ThenNewInstanceReturn() {
    AbstractApplicationContext context = new AnnotationConfigApplicationContext(EmployeeConfig.class);
    EmployeeBeanUsingFunction firstContext = context.getBean(EmployeeBeanUsingFunction.class);
    EmployeeBeanUsingFunction secondContext = context.getBean(EmployeeBeanUsingFunction.class);
    Employee firstInstance = firstContext.getEmployee("sachin");
    Employee secondInstance = secondContext.getEmployee("kumar");
    Assert.assertTrue(firstInstance != secondInstance);
}
```

### 2.5 使用_ObjectProvider_

Spring提供了_ObjectProvider``<T>``_，这是现有_ObjectFactory_接口的扩展。

让我们注入_ObjectProvider_并使用_ObjectProvider_获取_Employee_对象：

```java
public class EmployeeBeanUsingObjectProvider {
    @Autowired
    private ObjectProvider``<Employee>`` objectProvider;

    public Employee getEmployee(String name) {
        Employee employee = objectProvider.getObject(name);
        return employee;
    }
}
```

现在，让我们测试并检查实例是否不同：

```java
@Test
public void givenPrototypeBean_WhenObjectProvider_ThenNewInstanceReturn() {
    AbstractApplicationContext context = new AnnotationConfigApplicationContext(EmployeeConfig.class);
    EmployeeBeanUsingObjectProvider firstContext = context.getBean(EmployeeBeanUsingObjectProvider.class);
    EmployeeBeanUsingObjectProvider secondContext = context.getBean(EmployeeBeanUsingObjectProvider.class);
    Employee firstInstance = firstContext.getEmployee("sachin");
    Employee secondInstance = secondContext.getEmployee("kumar");
    Assert.assertTrue(firstInstance != secondInstance);
}
```

## 3. 结论

在这个简短的教程中，我们学习了在Spring中动态创建原型作用域Bean的几种方法。

正如往常一样，这个教程的完整代码可以在GitHub上找到。