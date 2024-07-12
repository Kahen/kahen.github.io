---
date: 2022-11-01
category:
  - Testing
  - Java
tag:
  - JUnit
  - Mockito
  - System.exit
head:
  - - meta
    - name: keywords
      content: JUnit, Testing, Java, System.exit, Mockito
---
# JUnit - 测试调用 System.exit() 的方法

在某些情况下，可能需要一个方法调用_System.exit()_并关闭应用程序。例如，这可能是因为应用程序应该只运行一次然后退出，或者在出现严重错误如丢失数据库连接时。

如果一个方法调用了_System.exit()_，那么从单元测试中调用它并进行断言就会变得困难，因为这将导致单元测试退出。

在本教程中，我们将探讨在使用JUnit时如何测试调用_System.exit()_的方法。

## 2. 项目设置

让我们首先创建一个Java项目。我们将创建一个服务，用于将任务保存到数据库。如果保存任务到数据库时抛出异常，该服务将调用_System.exit()_。

### 2.1. JUnit和Mockito依赖

让我们添加JUnit和Mockito依赖：

```xml
`<dependencies>`
    ````<dependency>````
        ````<groupId>````org.junit.jupiter````</groupId>````
        `````<artifactId>`````junit-jupiter-api`````</artifactId>`````
        `````<version>`````5.11.0-M2`````</version>`````
        ````<scope>````test````</scope>````
    ````</dependency>````
    ````<dependency>````
        ````<groupId>````org.mockito````</groupId>````
        `````<artifactId>`````mockito-core`````</artifactId>`````
        `````<version>`````5.11.0`````</version>`````
        ````<scope>````test````</scope>````
    ````</dependency>````
`</dependencies>`
```

### 2.2. 代码设置

我们首先添加一个名为_Task_的实体类：

```java
public class Task {
    private String name;

    // 访问器，修改器和构造函数
}
```

接下来，让我们创建一个DAO，负责与数据库交互：

```java
public class TaskDAO {
    public void save(Task task) throws Exception {
        // 保存任务
    }
}
```

_save()_方法的实现对于本文的目的并不重要。

接下来，让我们创建一个调用DAO的_TaskService_：

```java
public class TaskService {
    private final TaskDAO taskDAO = new TaskDAO();

    public void saveTask(Task task) {
        try {
            taskDAO.save(task);
        } catch (Exception e) {
            System.exit(1);
        }
    }
}
```

我们应该注意到，如果_save()_方法抛出异常，**应用程序将退出**。

### 2.3. 单元测试

让我们尝试为我们上面的_saveTask()_方法编写单元测试：

```java
@Test
void givenDAOThrowsException_whenSaveTaskIsCalled_thenSystemExitIsCalled() throws Exception {
    Task task = new Task("test");
    TaskDAO taskDAO = mock(TaskDAO.class);
    TaskService service = new TaskService(taskDAO);
    doThrow(new NullPointerException()).when(taskDAO).save(task);
    service.saveTask(task);
}

```

我们模拟了_TaskDAO_，以便在调用_save()_方法时抛出异常。这将导致执行_saveTask()_的_catch_块，该块调用_System.exit()_。

**如果我们运行这个测试，我们会发现它在完成之前就退出了**：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/system-exits-test-skipped.png)

## 3. 使用安全管理员的解决方法（Java 17之前）

**我们可以提供我们的安全管理员来防止单元测试退出。** 我们的安全管理员将防止对_System.exit()_的调用，并在调用发生时抛出异常。然后我们可以捕获抛出的异常来进行断言。默认情况下，Java不使用安全管理员，并且允许调用所有_System_方法。

**需要注意的是，SecurityManager在Java 17中被弃用，如果使用Java 17或更高版本，将抛出异常。**

### 3.1. 安全管理员

让我们看看安全管理员的实现：

```java
class NoExitSecurityManager extends SecurityManager {
    @Override
    public void checkPermission(Permission perm) {
    }

    @Override
    public void checkExit(int status) {
        super.checkExit(status);
        throw new RuntimeException(String.valueOf(status));
    }
}
```

让我们谈谈这段代码的一些重要行为：

- 方法_checkPermission()_需要被重写，因为安全管理员的默认实现会在调用_System.exit()_时抛出异常。
- 每当我们的代码调用_System.exit()_，_NoExitSecurityManager_的_checkExit()_方法将介入并抛出异常。
- 可以抛出任何其他异常而不是_RuntimeException_，只要它是一个未检查异常。

### 3.2. 修改测试

下一步是修改测试以使用_SecurityManager_实现。我们将**添加_setUp()_和_tearDown()_方法，在测试运行时设置和移除安全管理员**：

```java
@BeforeEach
void setUp() {
    System.setSecurityManager(new NoExitSecurityManager());
}
```

最后，让我们**更改测试用例，以捕获在调用_System.exit()_时将抛出的_RuntimeException_**：

```java
@Test
void givenDAOThrowsException_whenSaveTaskIsCalled_thenSystemExitIsCalled() throws Exception {
    Task task = new Task("test");
    TaskDAO taskDAO = mock(TaskDAO.class);
    TaskService service = new TaskService(taskDAO);
    try {
        doThrow(new NullPointerException()).when(taskDAO).save(task);
        service.saveTask(task);
    } catch (RuntimeException e) {
        Assertions.assertEquals("1", e.getMessage());
    }
}
```

我们使用_catch_块来验证**退出消息的状态是否与DAO设置的退出代码相同**。

## 4. 使用System Lambda库

另一种编写测试的方法是使用System Lambda库。这个库协助测试调用_System_类方法的代码。我们将探讨如何使用这个库编写我们的测试。

### 4.1. 依赖

让我们首先添加_system-lambda_依赖：

```xml
````<dependency>````
    ````<groupId>````com.github.stefanbirkner````</groupId>````
    `````<artifactId>`````system-lambda`````</artifactId>`````
    `````<version>`````1.2.1`````</version>`````
    ````<scope>````test````</scope>````
````</dependency>````
```

### 4.2. 修改测试用例

接下来，让我们修改测试用例。我们将**使用库的_catchSystemExit()_方法包装我们原始的测试代码。这个方法将防止系统退出，并将返回退出代码**。然后我们将断言退出代码：

```java
@Test
void givenDAOThrowsException_whenSaveTaskIsCalled_thenSystemExitIsCalled() throws Exception {
    int statusCode = catchSystemExit(() -> {
        Task task = new Task("test");
        TaskDAO taskDAO = mock(TaskDAO.class);
        TaskService service = new TaskService(taskDAO);
        doThrow(new NullPointerException()).when(taskDAO).save(task);
        service.saveTask(task);
    });
    Assertions.assertEquals(1, statusCode);
}
```

## 5. 使用JMockit

**JMockit库提供了一种模拟_System_类的方法。我们可以使用它来改变_System.exit()_的行为并防止系统退出。** 让我们探讨如何做到这一点。

### 5.1. 依赖

让我们添加JMockit依赖：

```xml
````<dependency>````
    ````<groupId>````org.jmockit````</groupId>````
    `````<artifactId>`````jmockit`````</artifactId>`````
    `````<version>`````1.49`````</version>`````
    ````<scope>````test````</scope>````
````</dependency>````
```

除此之外，我们需要为JMockit添加_-javaagent_ JVM初始化参数。我们可以使用Maven Surefire插件来实现这一点：

```xml
`<plugins>`
    `<plugin>`
        `````<artifactId>`````maven-surefire-plugin`````</artifactId>`````
        `````<version>`````2.22.2`````</version>`````
        `<configuration>`
           `<argLine>`
               -javaagent:"${settings.localRepository}"/org/jmockit/jmockit/1.49/jmockit-1.49.jar
           `</argLine>`
        `</configuration>`
    `</plugin>`
`</plugins>`
```

这将导致JMockit在JUnit之前初始化。这样，所有的测试用例都通过JMockit运行。如果使用旧版本的JMockit，则不需要初始化参数。

### 5.2. 修改测试

让我们修改测试以模拟_System.exit()_：

```java
@Test
public void givenDAOThrowsException_whenSaveTaskIsCalled_thenSystemExitIsCalled() throws Exception {
    new MockUp`<System>`() {
        @Mock
        public void exit(int value) {
            throw new RuntimeException(String.valueOf(value));
        }
    };

    Task task = new Task("test");
    TaskDAO taskDAO = mock(TaskDAO.class);
    TaskService service = new TaskService(taskDAO);
    try {
        doThrow(new NullPointerException()).when(taskDAO).save(task);
        service.saveTask(task);
    } catch (RuntimeException e) {
        Assertions.assertEquals("1", e.getMessage());
    }
}
```

这将抛出一个我们可以捕获并像早期安全管理员示例中那样断言的异常。

## 6. 结论

在本文中，我们探讨了使用JUnit测试调用_System.exit()_的代码可能存在的困难。然后我们通过添加安全管理员找到了解决方法。我们还查看了System Lambda和J