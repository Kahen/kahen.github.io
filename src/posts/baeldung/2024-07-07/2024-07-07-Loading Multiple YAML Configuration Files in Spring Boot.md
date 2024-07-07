---
date: 2024-07-07
category:
  - Spring Boot
  - YAML
tag:
  - Spring Boot
  - YAML
  - Configuration
head:
  - - meta
    - name: keywords
      content: Spring Boot, YAML, Configuration, Multiple YAML Files
---

# 在Spring Boot中加载多个YAML配置文件

当设计一个Spring Boot应用程序时，我们通常希望使用外部配置来定义我们的应用程序属性。这让我们可以使用相同的代码跨不同环境。在某些情况下，我们可能希望即使对于同一个环境，也将属性定义在多个YAML配置文件中。

在本教程中，**我们将学习在创建Spring Boot应用程序时加载多个YAML配置文件的两种方法**。

### 2.1. YAML设置
我们的第一个文件列出了学生名单。我们将把它命名为_application-students.yml_并将其放置在_./src/main/resources_目录中：

```
students:
  - Jane
  - Michael
```

让我们将第二个文件命名为_application-teachers.yml_并放置在同一个_./src/main/resources_目录中：

```
teachers:
  - Margo
  - Javier
```

### 2.2. 应用程序
现在，让我们设置我们的示例应用程序。我们将在应用程序中使用_CommandLineRunner_来查看我们的属性加载：

```java
@SpringBootApplication
public class MultipleYamlApplication implements CommandLineRunner {

    @Autowired
    private MultipleYamlConfiguration config;

    public static void main(String[] args) {
        SpringApplication springApp = new SpringApplication(MultipleYamlApplication.class);
        springApp.setAdditionalProfiles("students", "teachers");
        springApp.run(args);
    }

    public void run(String... args) throws Exception {
        System.out.println("Students: " + config.getStudents());
        System.out.println("Teachers: " + config.getTeachers());
    }
}
```

在这个例子中，**我们使用_setAdditionalProfiles()_方法以编程方式设置了我们的附加Spring配置文件**。

**我们还可以使用通用_application.yml_文件中的_spring.profiles.include_参数**：

```yaml
spring:
  profiles:
    include:
      - teachers
      - students
```

任一方法都可以设置配置文件，并且在应用程序启动期间，Spring会加载任何遵循_application-{profile}.yml_模式的YAML配置文件。

### 2.3. 配置
为了完成我们的示例，让我们创建我们的配置类。这个类从YAML文件中加载属性：

```java
@Configuration
@ConfigurationProperties
public class MultipleYamlConfiguration {

    List````<String>```` teachers;
    List````<String>```` students;

    // 标准setter和getter
}
```

让我们在运行应用程序后检查日志：

```
c.b.p.m.MultipleYamlApplication : The following 2 profiles are active: "teachers", "students"
```

这是输出结果：

```
Students: [Jane, Michael]
Teachers: [Margo, Javier]
```

虽然这种方法有效，但**一个缺点是它以一种可能不是实现所预期的方式使用了Spring配置文件功能**。

鉴于此，让我们看看包括多个YAML文件的第二种更健壮的方法。

### 3. 使用@PropertySources
我们可以通过结合使用_@PropertySources_注解和使用_@PropertySource_来加载YAML来指定多个YAML配置文件。

### 3.1. 应用程序
让我们再次尝试使用类似的应用程序：

```java
@SpringBootApplication
public class MultipleYamlApplication implements CommandLineRunner {

    @Autowired
    private MultipleYamlConfiguration config;

    public static void main(String[] args) {
        SpringApplication.run(MultipleYamlApplication.class);
    }

    public void run(String... args) throws Exception {
        System.out.println("Students: " + config.getStudents());
        System.out.println("Teachers: " + config.getTeachers());
    }
}
```

我们应该注意到，在本例中，**我们没有设置Spring配置文件**。

### 3.2. 配置和PropertySourceFactory
现在，让我们实现我们的配置类：

```java
@Configuration
@ConfigurationProperties
@PropertySources({
        @PropertySource(value = "classpath:application-teachers.yml", factory = MultipleYamlPropertySourceFactory.class),
        @PropertySource(value = "classpath:application-students.yml", factory = MultipleYamlPropertySourceFactory.class)})
public class MultipleYamlConfiguration {

    List````<String>```` teachers;
    List````<String>```` students;

    // 标准setter和getter
}
```

**@PropertySources_注解包括了我们想要在应用程序中使用的每个YAML文件的_@PropertySource_。_factory_是一个自定义的_PropertySourceFactory_，它启用了YAML文件的加载**：

```java
public class MultipleYamlPropertySourceFactory implements PropertySourceFactory {

    @Override
    public PropertySource`<?>` createPropertySource(String name, EncodedResource encodedResource) throws IOException {
        YamlPropertiesFactoryBean factory = new YamlPropertiesFactoryBean();
        factory.setResources(encodedResource.getResource());

        Properties properties = factory.getObject();

        return new PropertiesPropertySource(encodedResource.getResource().getFilename(), properties);
    }
}
```

运行我们的_MultipleYamlApplication_，我们看到了我们预期的输出结果：

```
Students: [Jane, Michael]
Teachers: [Margo, Javier]
```

### 4. 结论
在本文中，我们探讨了在Spring Boot应用程序中加载多个YAML配置文件的两种可能方法。

如常，我们示例的完整源代码可在GitHub上获得。