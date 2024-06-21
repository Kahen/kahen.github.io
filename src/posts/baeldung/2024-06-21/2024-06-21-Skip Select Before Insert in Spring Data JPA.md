---
date: 2024-06-22
category:
  - Spring Data JPA
  - JPA
tag:
  - Hibernate
  - Performance
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, JPA, Hibernate, Performance
------
# Spring Data JPA 中跳过插入前的 SELECT 查询

## 1. 概述

在使用 Spring Data JPA Repository 保存实体时，我们可能会在日志中遇到额外的 _SELECT_ 查询。这可能会导致由于大量额外调用而引起的性能问题。

**在本教程中，我们将探讨一些跳过日志中 _SELECT_ 的方法并提高性能。**

## 2. 配置

在深入研究 Spring Data JPA 并进行测试之前，我们需要采取一些准备步骤。

### 2.1. 依赖项

为了创建我们的测试仓库，我们将使用 Spring Data JPA 依赖项：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-data-jpa````</artifactId>````
````</dependency>````
```

我们将使用 H2 数据库作为测试数据库。让我们添加它的依赖项：

```xml
````<dependency>````
    ````<groupId>````com.h2database````</groupId>````
    ````<artifactId>````h2````</artifactId>````
````</dependency>````
```

在我们的集成测试中，我们将使用测试 Spring 上下文。让我们添加 spring-boot-starter-test 依赖项：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-test````</artifactId>````
    `<scope>`test`</scope>`
````</dependency>````
```

### 2.2. 配置

以下是我们将在示例中使用的 JPA 配置：

```properties
spring.jpa.hibernate.dialect=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.hibernate.show_sql=true
spring.jpa.hibernate.hbm2ddl.auto=create-drop
```

根据此配置，我们将让 Hibernate 生成模式，并将所有 SQL 查询记录到日志中。

## 3. SELECT 查询的原因

**让我们看看为什么我们在实现简单的仓库时会有这样的额外 _SELECT_ 查询。**

首先，让我们创建一个实体：

```java
@Entity
public class Task {
    @Id
    private Integer id;
    private String description;

    //getters and setters
}
```

现在，让我们为这个实体创建一个仓库：

```java
@Repository
public interface TaskRepository extends JpaRepository`````<Task, Integer>````` {
}
```

现在，让我们保存一个新 _Task_ 并指定 ID：

```java
@Autowired
private TaskRepository taskRepository;

@Test
void givenRepository_whenSaveNewTaskWithPopulatedId_thenExtraSelectIsExpected() {
    Task task = new Task();
    task.setId(1);
    taskRepository.saveAndFlush(task);
}
```

当我们调用 _saveAndFlush()_ —— _save()_ 方法的行为将与我们的仓库相同 —— 内部我们使用以下代码：

```java
public `<S extends T>` S save(S entity){
    if(isNew(entity)){
        entityManager.persist(entity);
        return entity;
    } else {
        return entityManager.merge(entity);
    }
}
```

因此，如果我们的实体被认为是新的，我们将调用实体管理器的 _merge()_ 方法。在 _merge()_ 中，JPA 检查我们的实体是否存在于缓存和持久性上下文中。由于我们的对象是新的，它将找不到。最后，它尝试从数据源加载实体。

这就是我们在日志中遇到 _SELECT_ 查询的地方。由于我们没有数据库中的这样一个项目，我们在那之后调用了 _INSERT_ 查询：

```sql
Hibernate: select task0_.id as id1_1_0_, task0_.description as descript2_1_0_ from task task0_ where task0_.id=?
Hibernate: insert into task (id, description) values (default, ?)
```

在 _isNew()_ 方法实现中我们可以找到以下代码：

```java
public boolean isNew(T entity) {
    ID id = this.getId(entity);
    return id == null;
}
```

**如果我们在应用程序端指定了 ID，我们的实体将被视为新的。在这种情况下，将向数据库发送额外的 _SELECT_ 查询。**

## 4. 使用 _@GeneratedValue_

**一种可能的解决方案是在应用程序端不指定 ID。** 我们可以使用 _@GeneratedValue_ 注解，并指定将用于在数据库端生成 ID 的策略。

让我们为我们的 _TaskWithGeneratedId_ ID 指定生成策略：

```java
@Entity
public class TaskWithGeneratedId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
}
```

然后，我们现在不设置 ID 来保存 _TaskWithGeneratedId_ 实体的一个实例：

```java
@Autowired
private TaskWithGeneratedIdRepository taskWithGeneratedIdRepository;

@Test
void givenRepository_whenSaveNewTaskWithGeneratedId_thenNoExtraSelectIsExpected() {
    TaskWithGeneratedId task = new TaskWithGeneratedId();
    TaskWithGeneratedId saved = taskWithGeneratedIdRepository.saveAndFlush(task);
    assertNotNull(saved.getId());
}
```

正如我们在日志中看到的，没有 _SELECT_ 查询，并且为实体生成了新的 ID。

## 5. 实现 _Persistable_

**我们拥有的另一个选择是在实体中实现 _Persistable_ 接口：**

```java
@Entity
public class PersistableTask implements Persistable`<Integer>` {
    @Id
    private int id;

    @Transient
    private boolean isNew = true;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public boolean isNew() {
        return isNew;
    }

    //getters and setters
}
```

在这里我们添加了一个新的字段 _isNew_ 并将其注解为 _@Transient_ 以避免在基础中创建列。使用重写的 _isNew()_ 方法，即使我们指定了 ID，也可以将我们的实体视为新的。

现在，在内部，JPA 使用另一种逻辑来考虑实体是否是新的：

```java
public class JpaPersistableEntityInformation {
    public boolean isNew(T entity) {
        return entity.isNew();
    }
}
```

让我们使用 _PersistableTaskRepository_ 保存我们的 _PersistableTask_：

```java
@Autowired
private PersistableTaskRepository persistableTaskRepository;

@Test
void givenRepository_whenSaveNewPersistableTask_thenNoExtraSelectIsExpected() {
    PersistableTask persistableTask = new PersistableTask();
    persistableTask.setId(2);
    persistableTask.setNew(true);
    PersistableTask saved = persistableTaskRepository.saveAndFlush(persistableTask);
    assertEquals(2, saved.getId());
}
```

正如我们所见，我们只有 _INSERT_ 日志消息，并且实体包含了我们指定的 ID。

如果我们尝试保存几个具有相同 ID 的新实体，我们会遇到异常：

```java
@Test
void givenRepository_whenSaveNewPersistableTasksWithSameId_thenExceptionIsExpected() {
    PersistableTask persistableTask = new PersistableTask();
    persistableTask.setId(3);
    persistableTask.setNew(true);
    persistableTaskRepository.saveAndFlush(persistableTask);

    PersistableTask duplicateTask = new PersistableTask();
    duplicateTask.setId(3);
    duplicateTask.setNew(true);

    assertThrows(DataIntegrityViolationException.class,
        () -> persistableTaskRepository.saveAndFlush(duplicateTask));
}
```

**所以，如果我们承担生成 ID 的责任，我们还应该确保它们的唯一性。**

## 6. 直接使用 _persist()_ 方法

正如我们在前面的示例中看到的，我们所做的所有操作都导致了调用 _persist()_ 方法。**我们还可以直接调用这个方法创建我们仓库的扩展。**

让我们创建一个带有 _persist()_ 方法的接口：

```java
public interface TaskRepositoryExtension {
    Task persistAndFlush(Task task);
}
```

然后，让我们制作这个接口的实现 bean：

```java
@Component
public class TaskRepositoryExtensionImpl implements TaskRepositoryExtension {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Task persistAndFlush(Task task) {
        entityManager.persist(task);
        entityManager.flush();
        return task;
    }
}
```

现在，我们使用新接口扩展我们的 _TaskRepository_：

```java
@Repository
public interface TaskRepository extends JpaRepository`````<Task, Integer>`````, TaskRepositoryExtension {
}
```

让我们调用我们的自定义 _persistAndFlush()_ 方法来保存 _Task_ 实例：

```java
@Test
void givenRepository_whenPersistNewTaskUsingCustomPersistMethod_thenNoExtraSelectIsExpected() {
    Task task = new Task();
    task.setId(4);
    Task saved = taskRepository.persistAndFlush(task);

    assertEquals(4, saved.getId());
}
```

我们可以看到日志消息中有 _INSERT_ 调用，没有额外的 _SELECT_ 调用。

## 7. 使用 Hypersistence Utils 中的 _BaseJpaRepository_

**上一节中的想法已经在 Hypersistence Utils 项目中实现**。该项目为我们提供了 _BaseJpaRepository_，其中我们有 _persistAndFlush()_ 方法的实现以及其批量模拟。

要使用它，我们必须指定额外的依赖项。我们应该根据我们的 Hibernate 版本选择正确的 Maven 构件：

```xml
````<dependency>````
    ````<groupId>````io.hypersistence````</groupId>````
    ````<artifactId>````hypersistence-utils-hibernate-55````</artifactId>````
````</dependency>````
```

让我们实现另一个仓库，它既扩展了 HypersistenceUtils 的 _BaseJpaRepository_ 也扩展了 Spring Data JPA 的 _JpaRepository_：

```java
@Repository
public interface TaskJpaRepository extends JpaRepository`````<Task, Integer>`````, BaseJpaRepository`````<Task, Integer>````` {
}
```

此外，我们还必须使用 _@EnableJpaRepositories_ 注解启用 _BaseJpaRepository_ 的实现：

```java
@EnableJpaRepositories(
    repositoryBaseClass = BaseJpaRepositoryImpl.class
)
```

现在，让我们使用我们的新仓库保存 _Task_：

```java
@Autowired
private TaskJpaRepository taskJpaRepository;

@Test
void givenRepository_whenPersistNewTaskUsingPersist_thenNoExtraSelectIsExpected() {
    Task task = new Task();
    task.setId(5);
    Task saved = taskJpaRepository.persistAndFlush(task);

    assertEquals(5, saved.getId());
}
```

我们成功保存了 _Task_，并且日志中没有 _SELECT_ 查询。

**就像在我们指定应用程序端 ID 的所有示例中一样，可能会有唯一性约束违规：**

```java
@Test
void givenRepository_whenPersistTaskWithTheSameId_thenExceptionIsExpected() {
    Task task = new Task();
    task.setId(5);
    taskJpaRepository.persistAndFlush(task);

    Task secondTask = new Task();
    secondTask.setId(5);

    assertThrows(DataIntegrityViolationException.class,
        () ->  taskJpaRepository.persistAndFlush(secondTask));
}
```

## 8. 使用带有 _@Query_ 注解的方法

**我们还可以通过直接修改原生查询来避免额外的调用**。让我们在 _TaskRepository_ 中指定这样一个方法：

```java
@Repository
public interface TaskRepository extends JpaRepository`````<Task, Integer>````` {

    @Modifying
    @Query(value = "insert into task(id, description) values(:#{#task.id}, :#{#task.description})",
      nativeQuery = true)
    void insert(@Param("task") Task task);
}
```

这个方法直接调用 _INSERT_ 查询，避免了与持久性上下文的工作。ID 将从方法参数中发送的 _Task_ 对象中获取。

现在让我们使用这个方法保存我们的 _Task_：

```java
@Test
void givenRepository_whenPersistNewTaskUsingNativeQuery_thenNoExtraSelectIsExpected() {
    Task task = new Task();
    task.setId(6);
    taskRepository.insert(task);

    assertTrue(taskRepository.findById(6).isPresent());
}
```

实体使用 ID 成功保存，没有额外的 _SELECT_ 查询之前的 _INSERT_。 **我们应该考虑，通过使用这种方法我们避免了 JPA 上下文和 Hibernate 缓存。**

## 9. 结论

在使用 Spring Data JPA 实现应用程序端 ID 生成时，我们可能会在日志中遇到额外的 _SELECT_ 查询，导致性能下降。在本文中，我们讨论了解决这个问题的各种策略。

在某些情况下，将此逻辑移动到数据库端或根据我们的需求微调持久性逻辑是有意义的。在做出决定之前，我们应该考虑每种策略的利弊和潜在问题。

像往常一样，完整的源代码可以在 GitHub 上找到。

OK