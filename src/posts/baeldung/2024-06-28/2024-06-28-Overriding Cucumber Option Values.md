---
date: 2024-06-28
category:
  - Java
  - Cucumber
tag:
  - 测试
  - 配置
head:
  - - meta
    - name: keywords
      content: Cucumber, 测试, Java, 配置, 选项覆盖
---
# 如何覆盖Cucumber选项值

在本教程中，我们将学习三种不同的方法来覆盖Cucumber选项值。从优先级的角度来看，Cucumber将解析并覆盖以下来源的选项：
- 系统属性、环境变量和_cucumber.properties_文件
- _@CucumberOptions_注解
- 命令行参数

为了展示每种方法，我们将运行一个简单的特性文件，包含两个场景，并覆盖Cucumber的_tags_选项。

## 2. 设置
在介绍每种方法之前，我们需要做一些初始设置。首先，让我们添加_cucumber-java, cucumber-junit, cucumber-spring,_和_junit-vintage-engine_依赖项：

```xml
````<dependency>````
    ````<groupId>````io.cucumber````</groupId>````
    ````<artifactId>````cucumber-java````</artifactId>````
    ````<version>````7.14.0````</version>````
    ````<scope>````test````</scope>````
````</dependency>````
````<dependency>````
    ````<groupId>````io.cucumber````</groupId>````
    ````<artifactId>````cucumber-junit````</artifactId>````
    ````<version>````7.14.0````</version>````
    ````<scope>````test````</scope>````
````</dependency>````
````<dependency>````
    ````<groupId>````io.cucumber````</groupId>````
    ````<artifactId>````cucumber-spring````</artifactId>````
    ````<version>````7.14.0````</version>````
    ````<scope>````test````</scope>````
````</dependency>````
````<dependency>````
    ````<groupId>````org.junit.vintage````</groupId>````
    ````<artifactId>````junit-vintage-engine````</artifactId>````
    ````<version>````5.10.0````</version>````
    ````<scope>````test````</scope>````
````</dependency>````
```

接下来，让我们实现一个简单的控制器，包含两个端点：

```java
@RestController
public class HealthCheckController {

    @GetMapping(path = "/v1/status", produces = APPLICATION_JSON_VALUE)
    public HttpStatus getV1Status() {
        return ResponseEntity.ok().build().getStatusCode();
    }

    @GetMapping(path = "/v2/status", produces = APPLICATION_JSON_VALUE)
    public HttpStatus getV2Status() {
        return ResponseEntity.ok().build().getStatusCode();
    }
}
```

现在我们可以添加特性文件和两个场景：

```gherkin
Feature: 状态端点可以被验证
    @v1
    Scenario: v1状态是健康的
        When the client calls /v1/status
        Then the client receives 200 status code

    @v2
    Scenario: v2状态是健康的
        When the client calls /v2/status
        Then the client receives 200 status code
```

最后，让我们添加所需的Cucumber粘合代码：

```java
@When("^the client calls /v1/status$")
public void checkV1Status() throws Throwable {
    executeGet("http://localhost:8082/v1/status");
}

@When("^the client calls /v2/status$")
public void checkV2Status() throws Throwable {
    executeGet("http://localhost:8082/v2/status");
}

@Then("^the client receives (\\d+) status code$")
public void verifyStatusCode(int statusCode) throws Throwable {
    final HttpStatus currentStatusCode = latestResponse.getStatusCode();
    assertThat(currentStatusCode.value(), is(statusCode));
}
```

默认情况下，如果不特别指定，Cucumber将运行所有场景。让我们通过运行测试来验证这种行为：

```shell
mvn test
```

正如预期的那样，两个场景都被执行了：

```shell
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
```

我们现在准备好了，可以介绍三种不同的方法来覆盖Cucumber选项值。

## 3. 使用 _cucumber.properties_ 文件
第一种方法从系统属性、环境变量和_cucumber.properties_文件中加载Cucumber选项。

让我们在_cucumber.properties_文件中添加_cucumber.filter.tags_属性：

```properties
cucumber.filter.tags=@v1
```

这次运行测试将只执行 _@v1_ 场景：

```shell
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
```

## 4. 使用 _@CucumberOptions_ 注解
第二种方法使用 _@CucumberOptions_ 注解。让我们添加_tags_字段：

```java
@CucumberOptions(tags = "@v1")
```

再次运行测试将只执行 _@v1_ 场景：

```shell
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
```

**请注意，这种方法将覆盖使用系统属性、环境变量以及_cucumber.properties_文件提供的任何值。**

## 5. 使用命令行参数
最后一种方法使用Cucumber CLI运行器和_tags_参数。确保使用正确的类路径，以便它包括编译后的类和资源以及所有依赖项（包括_test_范围的依赖项）：

```shell
java -cp ... io.cucumber.core.cli.Main --tags @v1
```

正如预期的那样，只有 _@v1_ 场景被执行：

```shell
1 Scenarios (1 passed)
2 Steps (2 passed)
```

**请注意，这种方法将覆盖通过_cucumber.properties_文件或 _@CucumberOptions_ 注解提供的选项。**

## 6. 结论
在本文中，我们学习了三种覆盖Cucumber选项值的方法。

第一种方法考虑了作为系统属性、环境变量和_cucumber.properties_文件中提供的选项。第二种方法考虑了作为 _@CucumberOptions_ 注解字段提供的选项，并覆盖了第一种方法提供的任何选项。最后一种方法使用命令行参数，并覆盖了使用任何先前方法提供的选项。

如常，完整的代码可以在GitHub上找到。