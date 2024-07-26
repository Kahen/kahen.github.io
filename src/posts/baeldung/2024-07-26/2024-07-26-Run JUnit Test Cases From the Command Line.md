---
date: 2024-07-27
category:
  - Testing
  - JUnit
tag:
  - JUnit 5
  - Command Line
head:
  - - meta
    - name: keywords
      content: JUnit, Command Line, Testing
---

# 从命令行运行JUnit测试用例

在本教程中，我们将了解如何直接从命令行运行JUnit 5测试。

## 测试场景

之前，我们已经介绍了如何以编程方式运行JUnit测试。对于我们的示例，我们将使用相同的JUnit测试：

```java
public class FirstUnitTest {

    @Test
    public void whenThis_thenThat() {
        assertTrue(true);
    }

    @Test
    public void whenSomething_thenSomething() {
        assertTrue(true);
    }

    @Test
    public void whenSomethingElse_thenSomethingElse() {
        assertTrue(true);
    }
}

public class SecondUnitTest {

    @Test
    public void whenSomething_thenSomething() {
        assertTrue(true);
    }

    @Test
    public void whensomethingElse_thenSomethingElse() {
        assertTrue(true);
    }
}
```

## 运行JUnit 5测试

我们可以使用JUnit的控制台启动器来运行JUnit 5测试用例。这个jar的可执行文件可以从Maven中央仓库的_junit-platform-console-standalone_目录下载。

我们还需要一个目录来包含所有编译后的类：

```shell
$ mkdir target
```

让我们看看如何使用控制台启动器运行不同的测试用例。

### 3.1. 运行单个测试类

在我们运行测试类之前，让我们先编译它：

```shell
$ javac -d target -cp target:junit-platform-console-standalone-1.7.2.jar src/test/java/com/baeldung/commandline/FirstUnitTest.java
```

现在，我们将使用JUnit控制台启动器运行编译后的测试类：

```shell
$ java -jar junit-platform-console-standalone-1.7.2.jar --class-path target --select-class com.baeldung.commandline.FirstUnitTest
```

这将给出我们的测试运行结果：

```shell
Test run finished after 60 ms
[         3 containers found      ]
[         0 containers skipped    ]
[         3 containers started    ]
[         0 containers aborted    ]
[         3 containers successful ]
[         0 containers failed     ]
[         3 tests found           ]
[         0 tests skipped         ]
[         3 tests started         ]
[         0 tests aborted         ]
[         3 tests successful      ]
[         0 tests failed          ]
```

### 3.2. 运行多个测试类

再次，让我们编译我们想要运行的测试类：

```shell
$ javac -d target -cp target:junit-platform-console-standalone-1.7.2.jar src/test/java/com/baeldung/commandline/FirstUnitTest.java src/test/java/com/baeldung/commandline/SecondUnitTest.java
```

现在我们将使用控制台启动器运行编译后的测试类：

```shell
$ java -jar junit-platform-console-standalone-1.7.2.jar --class-path target --select-class com.baeldung.commandline.FirstUnitTest --select-class com.baeldung.commandline.SecondUnitTest
```

我们的结果现在显示所有五个测试方法都是成功的：

```shell
Test run finished after 68 ms
...
[         5 tests found           ]
...
[         5 tests successful      ]
[         0 tests failed          ]
```

### 3.3. 运行包中的所有测试类

要运行包中的所有测试类，让我们编译我们包中存在的所有测试类：

```shell
$ javac -d target -cp target:junit-platform-console-standalone-1.7.2.jar src/test/java/com/baeldung/commandline/*.java
```

再次，我们将运行我们包中的编译测试类：

```shell
$ java -jar junit-platform-console-standalone-1.7.2.jar --class-path target --select-package com.baeldung.commandline
...
Test run finished after 68 ms
...
[         5 tests found           ]
...
[         5 tests successful      ]
[         0 tests failed          ]
```

### 3.4. 运行所有测试类

让我们运行所有的测试用例：

```shell
$ java -jar junit-platform-console-standalone-1.7.2.jar --class-path target --scan-class-path
...
Test run finished after 68 ms
...
[         5 tests found           ]
...
[         5 tests successful      ]
[         0 tests failed          ]
```

## 使用Maven运行JUnit

如果我们使用**Maven作为我们的构建工具**，我们可以直接从命令行执行测试用例。

### 4.1. 运行单个测试用例

要在控制台上运行单个测试用例，让我们执行以下命令，指定测试类的名称：

```shell
$ mvn test -Dtest=SecondUnitTest
```

这将给出我们的测试运行结果：

```shell
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.069 s - in com.baeldung.commandline.SecondUnitTest
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 7.211 s [INFO] Finished at: 2021-08-02T23:13:41+05:30
[INFO] ------------------------------------------------------------------------
```

### 4.2. 运行多个测试用例

要在控制台上运行多个测试用例，让我们执行命令，指定我们想要执行的所有测试类的名称：

```shell
$ mvn test -Dtest=FirstUnitTest,SecondUnitTest
...
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.069 s - in com.baeldung.commandline.SecondUnitTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.069 s - in com.baeldung.commandline.FirstUnitTest
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  7.211 s
[INFO] Finished at: 2021-08-02T23:13:41+05:30
[INFO] ------------------------------------------------------------------------
```

### 4.3. 运行包中的所有测试用例

要在控制台上运行包中的所有测试用例，我们需要将包名称作为命令的一部分：

```shell
$ mvn test -Dtest="com.baeldung.commandline.**"
...
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.069 s - in com.baeldung.commandline.SecondUnitTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.069 s - in com.baeldung.commandline.FirstUnitTest
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  7.211 s
[INFO] Finished at: 2021-08-02T23:13:41+05:30
[INFO] ------------------------------------------------------------------------
```

### 4.4. 运行所有测试用例

最后，要在控制台上使用Maven运行所有测试用例，我们只需执行_mvn clean test_：

```shell
$ mvn clean test
...
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.069 s - in com.baeldung.commandline.SecondUnitTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.069 s - in com.baeldung.commandline.FirstUnitTest
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  7.211 s
[INFO] Finished at: 2021-08-02T23:13:41+05:30
[INFO] ------------------------------------------------------------------------
```

## 结论

在本文中，我们学习了如何直接从命令行运行JUnit测试，涵盖了使用和不使用Maven的JUnit 5。

示例的实现可在GitHub上找到。