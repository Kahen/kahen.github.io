---
date: 2023-09-01
category:
  - Java
  - Maven
tag:
  - Jacoco
  - 多模块
  - Maven插件
head:
  - - meta
    - name: keywords
      content: Maven, Jacoco, 多模块项目, 代码覆盖率
------
# Maven多模块项目使用Jacoco进行代码覆盖率统计

在这个教程中，我们将构建一个Maven多模块项目。在这个项目中，服务和控制器将位于不同的模块中。然后，我们将编写一些测试并使用Jacoco来计算代码覆盖率。

## 2. 服务层

首先，让我们创建我们多模块应用的服务层。

### 2.1. 服务类

**我们将创建我们的服务并添加几个方法：**

```java
@Service
class MyService {
    String unitTestedOnly() {
        return "仅单元测试";
    }

    String coveredByUnitAndIntegrationTests() {
        return "单元测试和集成测试覆盖";
    }

    String coveredByIntegrationTest() {
        return "仅集成测试覆盖";
    }

    String notTested() {
        return "未测试";
    }
}
```

正如它们的名字所指示的：

- 位于同一层的单元测试将测试方法 `unitTestedOnly()`
- 单元测试将测试 `coveredByUnitAndIntegrationTests()`。控制器模块中的集成测试也将覆盖此方法的代码
- 集成测试将覆盖 `coveredByIntegrationTest()`。然而，没有单元测试会测试这个方法
- 没有测试会覆盖方法 `notTested()`

### 2.2. 单元测试

**现在让我们编写相应的单元测试：**

```java
class MyServiceUnitTest {
    MyService myService = new MyService();

    @Test
    void whenUnitTestedOnly_thenCorrectText() {
        assertEquals("仅单元测试", myService.unitTestedOnly());
    }

    @Test
    void whenTestedMethod_thenCorrectText() {
        assertEquals("单元测试和集成测试覆盖", myService.coveredByUnitAndIntegrationTests());
    }
}
```

这些测试简单地检查方法的输出是否符合预期。

### 2.3. Surefire插件配置

**我们将使用Maven Surefire插件来运行单元测试。**让我们在服务模块的 `pom.xml` 中配置它：

```xml
`<plugins>`
    ````<plugin>````
        ````<groupId>````org.apache.maven.plugins````</groupId>````
        ````<artifactId>````maven-surefire-plugin````</artifactId>````
        ````<version>````3.1.2````</version>````
        ```<configuration>```
            ``<includes>``
                ``<include>``**/*Test.java``</include>``
            ``</includes>``
        ```</configuration>```
    ````</plugin>````
`</plugins>`
```

## 3. 控制器层

我们现在将在我们的多模块应用中添加一个控制器层。

### 3.1. 控制器类

让我们添加控制器类：

```java
@RestController
class MyController {
    private final MyService myService;

    public MyController(MyService myService) {
        this.myService = myService;
    }

    @GetMapping("/tested")
    String fullyTested() {
        return myService.coveredByUnitAndIntegrationTests();
    }

    @GetMapping("/indirecttest")
    String indirectlyTestingServiceMethod() {
        return myService.coveredByIntegrationTest();
    }

    @GetMapping("/nottested")
    String notTested() {
        return myService.notTested();
    }
}
```

`fullyTested()` 和 `indirectlyTestingServiceMethod()` 方法将通过集成测试进行测试。因此，**这些测试将覆盖两个服务方法 `coveredByUnitAndIntegrationTests()` 和 `coveredByIntegrationTest()`**。另一方面，我们将不为 `notTested()` 编写测试。

### 3.2. 集成测试

**现在我们可以测试我们的 `RestController`：**

```java
@SpringBootTest(classes = MyApplication.class)
@AutoConfigureMockMvc
class MyControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void whenFullyTested_ThenCorrectText() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/tested"))
          .andExpect(MockMvcResultMatchers.status()
            .isOk())
          .andExpect(MockMvcResultMatchers.content()
            .string("单元测试和集成测试覆盖"));
    }

    @Test
    void whenIndirectlyTestingServiceMethod_ThenCorrectText() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/indirecttest"))
          .andExpect(MockMvcResultMatchers.status()
            .isOk())
          .andExpect(MockMvcResultMatchers.content()
            .string("仅集成测试覆盖"));
    }
}
```

在这些测试中，我们启动了一个应用服务器并向其发送请求。然后，我们检查输出是否正确。

### 3.3. Failsafe插件配置

**我们将使用Maven Failsafe插件来运行集成测试。**最后一步是在控制器模块的 `pom.xml` 中配置它：

```xml
````<plugin>````
    ````<groupId>````org.apache.maven.plugins````</groupId>````
    ````<artifactId>````maven-failsafe-plugin````</artifactId>````
    ````<version>````3.1.2````</version>````
    ```<executions>```
        ```<execution>```
            ```<goals>```
                ````<goal>````integration-test````</goal>````
                ````<goal>````verify````</goal>````
            ```</goals>```
            ```<configuration>```
                ``<includes>``
                    ``<include>``**/*IntegrationTest.java``</include>``
                ``</includes>``
            ```</configuration>```
        ```</execution>```
    ```</executions>```
````</plugin>````
```

## 4. 通过Jacoco聚合覆盖率

Jacoco（Java代码覆盖率）是一个用于在Java应用程序中测量测试期间代码覆盖率的工具。现在让我们计算我们的覆盖率报告。

### 4.1. 准备Jacoco代理

**_prepare-agent_阶段设置必要的钩子和配置，以便Jacoco在运行测试时跟踪执行的代码。**这种配置是在我们运行任何测试之前必需的。因此，我们将直接将准备步骤添加到父 `pom.xml` 中：

```xml
````<plugin>````
    ````<groupId>````org.jacoco````</groupId>````
    ````<artifactId>````jacoco-maven-plugin````</artifactId>````
    ````<version>````0.8.11````</version>````
    ```<executions>```
        ```<execution>```
            ```<goals>```
                ````<goal>````prepare-agent````</goal>````
            ```</goals>```
        ```</execution>```
    ```</executions>```
````</plugin>````
```

### 4.2. 收集测试结果

为了收集测试覆盖率，我们将创建一个新的模块 _aggregate-report_。它只包含一个 _pom.xml_ 并且依赖于前两个模块。

由于准备阶段，我们可以从每个模块聚合报告。**这是 _report-aggregate_ 目标的工作：**

```xml
````<plugin>````
    ````<groupId>````org.jacoco````</groupId>````
    ````<artifactId>````jacoco-maven-plugin````</artifactId>````
    ````<version>````0.8.8````</version>````
    ```<executions>```
        ```<execution>```
            `<phase>`verify`</phase>`
            ```<goals>```
                ````<goal>````report-aggregate````</goal>````
            ```</goals>```
            ```<configuration>```
                `<dataFileIncludes>`
                    `<dataFileInclude>`**/jacoco.exec`</dataFileInclude>`
                `</dataFileIncludes>`
                `<outputDirectory>`${project.reporting.outputDirectory}/jacoco-aggregate`</outputDirectory>`
            ```</configuration>```
        ```</execution>```
    ```</executions>```
````</plugin>````
```

现在我们可以从父模块运行 _verify_ 目标：

```shell
$ mvn clean verify
```

构建结束时，我们可以看到Jacoco在 _aggregate-report_ 子模块的 _target/site/jacoco-aggregate_ 文件夹中生成了报告。

让我们打开 _index.html_ 文件查看结果。

首先，我们可以导航到控制器类的报告：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/controller_coverage-300x55.png)

正如预期的那样，构造函数和 `fullyTested()` 和 `indirectlyTestingServiceMethod()` 方法被测试覆盖，而 `notTested()` 没有被覆盖。

现在让我们看看服务类的报告：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/service_coverage-300x60.png)

这一次，让我们关注 `coveredByIntegrationTest()` 方法。我们知道，服务模块中没有测试这个方法。唯一通过这个方法代码的测试在控制器模块中。然而，Jacoco认识到有针对这个方法的测试。在这种情况下，聚合这个词具有全部的意义！

## 5. 结论

在本文中，我们创建了一个多模块项目，并通过Jacoco收集了测试覆盖率。

让我们回顾一下，我们需要在测试之前运行准备阶段，而聚合则在测试之后进行。要进一步了解，我们可以使用像SonarQube这样的工具来获得覆盖结果的漂亮概览。

像往常一样，代码可以在GitHub上找到。