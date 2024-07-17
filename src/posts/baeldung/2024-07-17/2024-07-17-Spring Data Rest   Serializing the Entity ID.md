---
date: 2022-04-01
category:
  - Spring Data Rest
  - RESTful Web Services
tag:
  - Spring Data Rest
  - Entity IDs
  - Serialization
head:
  - - meta
    - name: keywords
      content: Spring Data Rest, RESTful Web Services, Entity IDs, Serialization
------
# Spring Data Rest - 序列化实体ID

## 1. 概述

众所周知，当我们想要快速开始使用RESTful Web服务时，Spring Data Rest模块可以使我们的生活更轻松。然而，这个模块具有默认的行为，有时可能会让人感到困惑。

在本教程中，我们将**学习为什么Spring Data Rest默认不序列化实体ID。同时，我们将讨论改变这种行为的各种解决方案**。

## 2. 默认行为

在我们详细讨论之前，让我们通过一个快速的例子来理解什么是序列化实体ID。

这里有一个示例实体，_Person_：

```java
@Entity
public class Person {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    // getters and setters
}
```

此外，我们有一个仓库，_PersonRepository_：

```java
public interface PersonRepository extends JpaRepository``<Person, Long>`` {
}
```

如果我们使用Spring Boot，只需添加_spring-boot-starter-data-rest_依赖项即可启用Spring Data Rest模块：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-data-rest`</artifactId>`
`</dependency>`
```

有了这两个类和Spring Boot的自动配置，我们的REST控制器就可以自动使用了。

下一步，让我们请求资源，_http://localhost:8080/persons_，并检查框架生成的默认JSON响应：

```json
{
    "_embedded" : {
        "persons" : [ {
            "name" : "John Doe",
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/persons/1"
                },
                "person" : {
                    "href" : "http://localhost:8080/persons/1{?projection}",
                    "templated" : true
                }
            }
        }, ...]
    ...
}
```

我们省略了一些部分以简洁。正如我们所注意到的，实体_Person_的__name__字段被序列化了。不知何故，__id__字段被剥离了。

因此，这是Spring Data Rest的设计决策。**在大多数情况下，暴露我们的内部ID并不理想，因为它们对外部系统没有意义**。

在理想的情况下，**身份是RESTful架构中该资源的URL**。

我们还应该看到，这仅在使用Spring Data Rest的端点时才会出现。除非我们使用Spring HATEOAS的_RepresentationModel_及其子类——如_CollectionModel_和_EntityModel_——来构建我们的响应，否则我们的自定义_@Controller_或_@RestController_端点不受影响。

幸运的是，暴露实体ID是可配置的。因此，我们仍然具有启用它的灵活性。

在接下来的部分中，我们将看到在Spring Data Rest中暴露实体ID的不同方法。

## 3. 使用 _RepositoryRestConfigurer_

**暴露实体ID最常见的解决方案是配置_RepositoryRestConfigurer_**：

```java
@Configuration
public class RestConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(
        RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Person.class);
    }
}
```

**在Spring Data Rest版本3.1之前——或Spring Boot版本2.1之前——我们会使用_RepositoryRestConfigurerAdapter_**：

```java
@Configuration
public class RestConfiguration extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Person.class);
    }
}
```

尽管它们相似，但我们应该注意版本。顺便说一句，自Spring Data Rest版本3.1起，_RepositoryRestConfigurerAdapter_已被弃用，并在最新的4.0.x分支中被移除。

在我们为实体_Person_配置之后，响应也会包含__id__字段：

```json
{
    "_embedded" : {
        "persons" : [ {
            "id" : 1,
            "name" : "John Doe",
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/persons/1"
                },
                "person" : {
                    "href" : "http://localhost:8080/persons/1{?projection}",
                    "templated" : true
                }
            }
        }, ...]
    ...
}
```

显然，当我们想要为所有实体启用ID暴露时，如果我们有许多实体，这种解决方案并不实用。

因此，让我们通过一种通用方法改进我们的_RestConfiguration_：

```java
@Configuration
public class RestConfiguration implements RepositoryRestConfigurer {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(
        RepositoryRestConfiguration config, CorsRegistry cors) {
        Class[] classes = entityManager.getMetamodel()
            .getEntities().stream().map(Type::getJavaType).toArray(Class[]::new);
        config.exposeIdsFor(classes);
    }
}
```

由于我们使用JPA来管理持久性，我们可以以通用方式访问实体的元数据。JPA的_EntityManager_已经存储了我们需要的元数据。因此，**我们可以通过_entityManager.getMetamodel()_方法实际收集实体类类型**。

因此，这是一种更全面的解决方案，因为每个实体的ID暴露是自动启用的。

## 4. 使用 _@Projection_

另一种解决方案是使用_@Projection_注解。通过定义一个_PersonView_接口，我们也可以暴露__id__字段：

```java
@Projection(name = "person-view", types = Person.class)
public interface PersonView {

    Long getId();

    String getName();
}
```

然而，我们现在需要使用不同的请求来测试，_http://localhost:8080/persons?projection=person-view_：

```json
{
    "_embedded" : {
        "persons" : [ {
            "id" : 1,
            "name" : "John Doe",
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/persons/1"
                },
                "person" : {
                    "href" : "http://localhost:8080/persons/1{?projection}",
                    "templated" : true
                }
            }
        }, ...]
    ...
}
```

**要为由仓库生成的所有端点启用投影，我们可以使用_@RepositoryRestResource_注解**在_PersonRepository_上：

```java
@RepositoryRestResource(excerptProjection = PersonView.class)
public interface PersonRepository extends JpaRepository``<Person, Long>`` {
}
```

在这种变化之后，我们可以使用我们通常的请求，_http://localhost:8080/persons_，来列出人员实体。

**然而，我们应该注意到_excerptProjection_不会自动应用于单个项目资源**。我们仍然需要使用_http://localhost:8080/persons/1?projection=person-view_来获取单个_Person_的响应及其实体ID。

此外，我们应该记住我们投影中定义的字段并不总是按顺序排列的：

```json
{
    ...
    "persons" : [ {
        "name" : "John Doe",
        "id" : 1,
        ...
    }, ...]
    ...
}
```

为了**保持字段顺序，我们可以在我们的_PersonView_类上放置_@JsonPropertyOrder_注解**：

```java
@JsonPropertyOrder({"id", "name"})
@Projection(name = "person-view", types = Person.class)
public interface PersonView {
    //...
}
```

## 5. 使用DTO覆盖Rest仓库

覆盖rest控制器处理程序是另一种解决方案。Spring Data Rest允许我们插入自定义处理程序。因此，**我们仍然可以使用底层仓库来获取数据，但在响应到达客户端之前覆盖响应**。在这种情况下，我们将编写更多的代码，但我们将拥有完全自定义的能力。

### 5.1. 实现

首先，我们定义一个DTO对象来表示我们的_Person_实体：

```java
public class PersonDto {

    private Long id;

    private String name;

    public PersonDto(Person person) {
        this.id = person.getId();
        this.name = person.getName();
    }

    // getters and setters
}
```

正如我们所看到的，我们在这里添加了一个__id__字段，它对应于_Person_的实体ID。

接下来，我们将使用一些内置辅助类来重用Spring Data Rest的响应构建机制，同时尽可能保持响应结构相同。

因此，让我们定义我们的_PersonController_来覆盖内置端点：

```java
@RepositoryRestController
public class PersonController {

    @Autowired
    private PersonRepository repository;

    @GetMapping("/persons")
    ResponseEntity`<?>` persons(PagedResourcesAssembler resourcesAssembler) {
        Page`<Person>` persons = this.repository.findAll(Pageable.ofSize(20));
        Page`<PersonDto>` personDtos = persons.map(PersonDto::new);
        PagedModel<EntityModel`<PersonDto>`> pagedModel = resourcesAssembler.toModel(personDtos);
        return ResponseEntity.ok(pagedModel);
    }
}
```

我们应该注意到一些要点，以确保Spring将我们的控制器类识别为插件，而不是独立的控制器：

1. 必须使用_@RepositoryRestController_而不是_@RestController_或_@Controller_
2. _PersonController_类必须放置在Spring的组件扫描可以拾取的包中