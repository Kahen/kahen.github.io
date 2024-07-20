---
date: 2022-04-01
category:
  - Spring Data JPA
  - JPA Repository
tag:
  - Spring
  - JPA
  - Repository
head:
  - - meta
    - name: BootstrapMode for JPA Repositories
      content: 探索Spring Data JPA仓库的不同启动模式，以优化应用程序启动时间。
------
# JPA仓库的Bootstrap模式

在这篇简短的教程中，我们将专注于Spring为JPA仓库提供的不同类型的_BootstrapMode_，这些模式用于改变它们的实例化协调方式。

在启动时，Spring Data会扫描仓库并将其注册为单例作用域的bean定义。在它们的初始化过程中，仓库会立即获得一个_EntityManager_。具体来说，它们会获取JPA元模型并验证声明的查询。

默认情况下，JPA是同步启动的。因此，仓库的实例化会被阻塞，直到启动过程完成。随着仓库数量的增加，应用程序可能需要很长时间才能启动并开始接受请求。

### 2.1. 默认
Bootstrap模式的默认值将急切地实例化仓库。因此，像任何其他Spring beans一样，它们的初始化将在注入时发生。

让我们创建一个_Todo_实体：

```java
@Entity
public class Todo {
    @Id
    private Long id;
    private String label;

    // 标准setter和getter
}
```

接下来，我们需要它的关联仓库。让我们创建一个扩展_CrudRepository_的仓库：

```java
public interface TodoRepository extends CrudRepository`<Todo, Long>` {
}
```

最后，让我们添加一个使用我们仓库的测试：

```java
@DataJpaTest
class BootstrapmodeDefaultIntegrationTest {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    void givenBootstrapmodeValueIsDefault_whenCreatingTodo_shouldSuccess() {
        Todo todo = new Todo("Something to be done");

        assertThat(todoRepository.save(todo)).hasNoNullFieldsOrProperties();
    }
}
```

启动我们的测试后，让我们查看日志，我们将发现Spring是如何启动我们的_TodoRepository_的：

```log
[2022-03-22 14:46:47,597]-[main] INFO  org.springframework.data.repository.config.RepositoryConfigurationDelegate - 在DEFAULT模式下启动Spring Data JPA仓库。
[2022-03-22 14:46:47,737]-[main] TRACE org.springframework.data.repository.config.RepositoryConfigurationDelegate - Spring Data JPA - 注册仓库：todoRepository - 接口：com.baeldung.boot.bootstrapmode.repository.TodoRepository - 工厂：org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean
[2022-03-22 14:46:49,718]-[main] DEBUG org.springframework.data.repository.core.support.RepositoryFactorySupport - 初始化com.baeldung.boot.bootstrapmode.repository.TodoRepository的仓库实例...
[2022-03-22 14:46:49,792]-[main] DEBUG org.springframework.data.repository.core.support.RepositoryFactorySupport - 完成com.baeldung.boot.bootstrapmode.repository.TodoRepository的仓库实例的创建。
[2022-03-22 14:46:49,858]-[main] INFO  com.baeldung.boot.bootstrapmode.BootstrapmodeDefaultIntegrationTest - 在3.547秒内启动BootstrapmodeDefaultIntegrationTest（JVM运行了4.877秒）
```

在我们的示例中，我们提前初始化仓库，并在应用程序启动后使它们可用。

### 2.2. 延迟
通过使用延迟的_BootstrapMode_为JPA仓库，Spring注册了我们仓库的bean定义，但不会立即实例化它。因此，使用延迟选项，首次使用会触发其初始化。

让我们修改我们的测试，并将延迟选项应用于_bootstrapMode_：

```java
@DataJpaTest(bootstrapMode = BootstrapMode.LAZY)
```

然后，让我们使用我们的新配置启动我们的测试，并检查相应的日志：

```log
[2022-03-22 15:09:01,360]-[main] INFO  org.springframework.data.repository.config.RepositoryConfigurationDelegate - 在LAZY模式下启动Spring Data JPA仓库。
[2022-03-22 15:09:01,398]-[main] TRACE org.springframework.data.repository.config.RepositoryConfigurationDelegate - Spring Data JPA - 注册仓库：todoRepository - 接口：com.baeldung.boot.bootstrapmode.repository.TodoRepository - 工厂：org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean
[2022-03-22 15:09:01,971]-[main] INFO  com.baeldung.boot.bootstrapmode.BootstrapmodeLazyIntegrationTest - 在1.299秒内启动BootstrapmodeLazyIntegrationTest（JVM运行了2.148秒）
[2022-03-22 15:09:01,976]-[main] DEBUG org.springframework.data.repository.config.RepositoryConfigurationDelegate$LazyRepositoryInjectionPointResolver - 为com.baeldung.boot.bootstrapmode.repository.TodoRepository创建延迟注入代理...
[2022-03-22 15:09:02,588]-[main] DEBUG org.springframework.data.repository.core.support.RepositoryFactorySupport - 初始化com.baeldung.boot.bootstrapmode.repository.TodoRepository的仓库实例...
```

我们应该注意到这里的一些缺点：

- Spring可能在没有初始化仓库的情况下开始接受请求，从而增加了首次处理请求时的延迟。
- 将_BootstrapMode_设置为全局延迟是容易出错的。Spring不会验证不在我们测试中的仓库中包含的查询和元数据。

**我们只能在开发期间使用延迟启动，以避免部署一个可能存在初始化错误的应用程序到生产环境中**。我们可以使用Spring Profiles来优雅地实现这一点。

### 2.3. 延迟
延迟是异步启动JPA的正确选项。因此，仓库不需要等待_EntityManagerFactory_的初始化。

让我们在一个配置类中声明一个_AsyncTaskExecutor_，使用_ThreadPoolTaskExecutor_ - 它的Spring实现之一 - 并覆盖返回_Future_的_submit_方法：

```java
@Bean
AsyncTaskExecutor delayedTaskExecutor() {
    return new ThreadPoolTaskExecutor() {
        @Override
        public ```<T>``` Future```<T>``` submit(Callable```<T>``` task) {
            return super.submit(() -> {
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                return task.call();
            });
        }
    };
}
```

接下来，让我们按照我们的JPA与Spring指南添加一个_EntityManagerFactory_ bean，并指明我们想要使用我们的异步执行器进行后台启动：

```java
@Bean
LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource, AsyncTaskExecutor delayedTaskExecutor) {
    LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();

    factory.setPackagesToScan("com.baeldung.boot.bootstrapmode");
    factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
    factory.setDataSource(dataSource);
    factory.setBootstrapExecutor(delayedTaskExecutor);
    Map`<String, Object>` properties = new HashMap<>();
    properties.put("hibernate.hbm2ddl.auto", "create-drop");
    factory.setJpaPropertyMap(properties);
    return factory;
}
```

最后，让我们修改我们的测试以启用延迟启动模式：

```java
@DataJpaTest(bootstrapMode = BootstrapMode.DEFERRED)
```

让我们再次启动我们的测试并检查日志：

```log
[2022-03-23 10:31:16,513]-[main] INFO  org.springframework.data.repository.config.RepositoryConfigurationDelegate - 在DEFERRED模式下启动Spring Data JPA仓库。
[2022-03-23 10:31:16,543]-[main] TRACE org.springframework.data.repository.config.RepositoryConfigurationDelegate - Spring Data JPA - 注册仓库：todoRepository - 接口：com.baeldung.boot.bootstrapmode.repository.TodoRepository - 工厂：org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean
[2022-03-23 10:31:16,545]-[main] DEBUG org.springframework.data.repository.config.RepositoryConfigurationDelegate - 注册延仓库初始化侦听器。
[2022-03-23 10:31:17,108]-[main] INFO  org.springframework.data.repository.config.DeferredRepositoryInitializationListener - 触发Spring Data仓库的延迟初始化...
[2022-03-23 10:31:22,538]-[main] DEBUG org.springframework.data.repository.core.support.RepositoryFactorySupport - 初始化com.baeldung.boot.bootstrapmode.repository.TodoRepository的仓库实例...
[2022-03-23 10:31:22,572]-[main] INFO  com.baeldung.boot.bootstrapmode.BootstrapmodeDeferredIntegrationTest - 在6.769秒内启动BootstrapmodeDeferredIntegrationTest（JVM运行了7.519秒）
```

在这个例子中，应用程序上下文启动完成触发了仓库的初始化。简而言之，Spring将仓库标记为延迟，并注册了一个_DeferredRepositoryInitializationListener_ bean。当_ApplicationContext_触发一个_ContextRefreshedEvent_时，它初始化所有仓库。

**因此，在应用程序启动之前，Spring Data初始化仓库并验证它们包含的查询和元数据**。

## 3. 结论在这篇文章中，**我们探讨了不同的方式来初始化JPA仓库，以及在哪些情况下使用它们**。

像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png)

OK