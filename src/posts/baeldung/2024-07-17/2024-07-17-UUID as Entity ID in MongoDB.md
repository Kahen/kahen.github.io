---
date: 2022-04-01
category:
  - MongoDB
  - Java
tag:
  - UUID
  - Spring Data MongoDB
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, UUID, Spring Data MongoDB
------
# MongoDB中使用UUID作为实体ID | Baeldung## 1. 概述

默认情况下，MongoDB Java驱动程序生成的ID类型为_ObjectId_。有时，我们可能希望使用另一种类型的数据作为对象的唯一标识符，例如UUID。然而，**MongoDB Java驱动程序不能自动生成UUID**。

在本教程中，我们将探讨使用MongoDB Java驱动程序和Spring Data MongoDB生成UUID的三种方法。

## 2. 共同点

应用程序很少只管理一种类型的数据。为了简化MongoDB数据库中ID的管理，更容易实现一个抽象类，该类将定义我们所有_Document_类的ID。

```java
public abstract class UuidIdentifiedEntity {
    @Id
    protected UUID id;

    public void setId(UUID id) {
        if (this.id != null) {
            throw new UnsupportedOperationException("ID已定义");
        }

        this.id = id;
    }

    // 获取器
}
```

在本教程的示例中，我们假设所有在MongoDB数据库中持久化的类都继承自这个类。

## 3. 配置UUID支持

要允许在MongoDB中存储UUID，我们必须配置驱动程序。此配置非常简单，只告诉驱动程序如何在数据库中存储UUID。如果多个应用程序使用相同的数据库，我们必须谨慎处理。

**我们所要做的就是在启动时指定MongoDB客户端的_uuidRepresentation_参数**：

```java
@Bean
public MongoClient mongo() throws Exception {
    ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017/test");
    MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
      .uuidRepresentation(UuidRepresentation.STANDARD)
      .applyConnectionString(connectionString).build();
    return MongoClients.create(mongoClientSettings);
}

```

如果我们使用Spring Boot，我们可以在application.properties文件中指定此参数：

```properties
spring.data.mongodb.uuid-representation=standard
```

## 4. 使用生命周期事件

处理UUID生成的第一种方法是使用Spring的生命周期事件。对于MongoDB实体，我们不能使用JPA注释_@PrePersist_等。因此，我们必须实现在_ApplicationContext_中注册的事件侦听器类。**为此，我们的类必须扩展Spring的_AbstractMongoEventListener_类**：

```java
public class UuidIdentifiedEntityEventListener extends AbstractMongoEventListener```<UuidIdentifiedEntity>``` {

    @Override
    public void onBeforeConvert(BeforeConvertEvent```<UuidIdentifiedEntity>``` event) {

        super.onBeforeConvert(event);
        UuidIdentifiedEntity entity = event.getSource();

        if (entity.getId() == null) {
            entity.setId(UUID.randomUUID());
        }
    }
}
```

在这种情况下，我们使用的是_BeforeConvert_事件，该事件在Spring将我们的Java对象转换为_Document_对象并发送到MongoDB驱动程序之前触发。

将我们的事件类型设置为捕获_UuidIdentifiedEntity_类允许处理此抽象超类的所有必要子类。Spring将在使用UUID作为ID的对象被转换时调用我们的代码。

我们必须注意，Spring将事件处理委托给_TaskExecutor_，这可能是异步的。**Spring不保证事件在对象实际转换之前被处理。**如果_TaskExecutor_是异步的，则不推荐使用此方法，因为ID可能在对象被转换后生成，从而导致异常：

_InvalidDataAccessApiUsageException: Cannot autogenerate id of type java.util.UUID for entity_

我们可以通过使用_@Component_注解或在_@Configuration_类中生成它来在_ApplicationContext_中注册事件侦听器：

```java
@Bean
public UuidIdentifiedEntityEventListener uuidIdentifiedEntityEventListener() {
    return new UuidIdentifiedEntityEventListener();
}
```

## 5. 使用实体回调

Spring基础设施提供了在实体生命周期的某些点执行自定义代码的钩子。这些被称为_实体回调_，我们可以在这种情况下使用它们来在对象被持久化到数据库之前生成UUID。

与之前看到的事件侦听器方法不同，**回调保证了它们的执行是同步的**，并且代码将在对象生命周期的预期点运行。

Spring Data MongoDB提供了一组回调，我们可以在应用程序中使用它们。在这种情况下，我们将使用与之前相同的事件。**回调可以直接在_@Configuration_类中提供**：

```java
@Bean
public BeforeConvertCallback```<UuidIdentifiedEntity>``` beforeSaveCallback() {

    return (entity, collection) -> {

        if (entity.getId() == null) {
            entity.setId(UUID.randomUUID());
        }
        return entity;
    };
}

```

我们也可以使用方法实现_BeforeConvertCallback_接口的_组件_。

## 6. 使用自定义存储库

Spring Data MongoDB提供了实现我们目标的第三种方法：使用自定义存储库实现。通常，我们只需要声明一个继承自_MongoRepository_的接口，然后Spring处理与存储库相关的代码。

如果我们想要改变Spring Data处理我们对象的方式，我们可以定义Spring将在存储库级别执行的自定义代码。为此，**我们首先必须定义一个扩展_MongoRepository_的接口**：

```java
@NoRepositoryBean
public interface CustomMongoRepository``<T extends UuidIdentifiedEntity>`` extends MongoRepository``<T, UUID>`` { }

```

_@NoRepositoryBean_注解防止Spring生成与_MongoRepository_相关的常规代码片段。此接口强制使用UUID作为对象中的ID类型。

然后，我们必须创建一个存储库类，该类将定义处理我们UUID所需的行为：

```java
public class CustomMongoRepositoryImpl``<T extends UuidIdentifiedEntity>``
  extends SimpleMongoRepository``<T, UUID>`` implements CustomMongoRepository`<T>`
```

在此存储库中，**我们必须通过覆盖_SimpleMongoRepository_的相关方法来捕获所有需要生成ID的方法调用**。在我们的情况下，这些方法是_save()_和_insert()_：

```java
@Override
public `<S extends T>` S save(S entity) {
    generateId(entity);
    return super.save(entity);
}
```

最后，我们需要告诉Spring使用我们的自定义类作为存储库的实现，而不是默认实现。我们通过在_@Configuration_类中这样做：

```java
@EnableMongoRepositories(basePackages = "com.baeldung.repository", repositoryBaseClass = CustomMongoRepositoryImpl.class)
```

然后，我们可以像往常一样声明我们的存储库，无需更改：

```java
public interface BookRepository extends MongoRepository`<Book, UUID>` { }
```

## 7. 结论

在本文中，我们看到了三种实现方式，使用Spring Data MongoDB将UUID作为MongoDB对象的ID。

一如既往，本文中使用的代码可以在GitHub上找到。