---
date: 2024-06-24
category:
  - Maven
  - 构建工具
tag:
  - mvn install
  - mvn verify
head:
  - - meta
    - name: keywords
      content: Maven, mvn install, mvn verify, 构建生命周期
------
# Apache Maven 中 mvn install 与 mvn verify 的区别

Apache Maven 是一个强大的构建管理工具，它为项目构建生命周期提供了结构化的方式。Maven 构建由生命周期组成，这些生命周期明确定义了项目的构建和分发方式。

在构建过程中，两个非常有用的命令是 _mvn install_ 和 _mvn verify_。在本教程中，我们将比较和对比这两个命令，理解它们之间的区别。

## 2. Maven 生命周期

Maven 定义了三个标准生命周期 — 清洁（clean）、默认（default）和站点（site） — 每个都有不同的目的：

- 清洁（clean）生命周期负责清理项目。
- 默认（default）生命周期用于构建和部署。
- 站点（site）生命周期用于创建项目的网站文档。

每个生命周期由阶段组成，每个阶段代表生命周期的一个阶段。

### 2.1. Maven 的默认生命周期

默认生命周期处理构建过程，从项目编译开始到部署构件结束。它由 23 个阶段组成，下面是六个主要阶段：

1. 验证（validate）：验证项目以确保所有必要的信息都可用于构建。
2. 编译（compile）：源代码被编译成字节码。
3. 测试（test）：执行单元测试以确保代码的正确性。
4. 打包（package）：编译后的代码被打包成 JAR 或 WAR 文件，具体取决于项目类型。
5. 验证（verify）：运行额外的验证检查，通常是集成测试或插件指定的测试。
6. 安装（install）：打包后的构件被安装到本地 Maven 仓库 _~/.m2/repository_ 中，使其对同一台机器上的其他项目可用。

**运行命令时，我们只需要调用我们想要执行的最后一个构建阶段。** 例如，运行 _mvn test_ 将依次执行验证（validate）、编译（compile）和测试（test）阶段。

## 3. 设置

在我们的 _pom.xml_ 中，让我们导入 _maven-surefire-plugin_ 的依赖，该插件在测试阶段运行单元测试时需要：

```
``<plugin>``
    ``<groupId>``org.apache.maven.plugins``</groupId>``
    ``<artifactId>``maven-surefire-plugin``</artifactId>``
    ``<version>``3.1.2``</version>``
``</plugin>``
```

让我们也导入并配置 _maven-failsafe-plugin_ 的依赖，将集成测试（integration-test）目标绑定到集成测试阶段，并将验证（verify）目标绑定到验证阶段：

```
``<plugin>``
    ``<groupId>``org.apache.maven.plugins``</groupId>``
    ``<artifactId>``maven-failsafe-plugin``</artifactId>``
    ``<version>``3.1.2``</version>``
    `<executions>`
        `<execution>`
            `<goals>`
                ``<goal>``integration-test``</goal>``
                ``<goal>``verify``</goal>``
            `</goals>`
        `</execution>`
    `</executions>`
``</plugin>``
```

接下来，让我们编写一个简单的 Java 程序，当执行时返回一个 _String_：

```
class CourseApp {
    String getCourse() {
        return "Baeldung Spring Masterclass";
    }
}
```

我们将定义一个单元测试，它将作为测试阶段的一部分执行：

```
@Test
void whenGetCourse_ThenCourseShouldBePresent() {
    CourseApp courseApp = new CourseApp();

    assertEquals("Baeldung Spring Masterclass", courseApp.getCourse());
}
```

类似地，一个简单的集成测试将作为验证阶段的集成测试目标的一部分执行。

```
@Test
void givenIntegrationTest_whenGetCourse_ThenCourseShouldBePresent() {
    CourseApp courseApp = new CourseApp();

    assertEquals("Baeldung Spring Masterclass", courseApp.getCourse());
}
```

## 4. Maven 验证阶段

_mvn verify_ 命令触发五个阶段：验证（validate）、编译（compile）、测试（test）、打包（package）和验证（verify）。验证阶段旨在用于验证项目的完整性和质量。

由于我们使用 _maven-failsafe-plugin_ 将验证阶段绑定到集成测试（integration-test）目标，我们的集成测试将运行。**只有当单元测试和集成测试都通过时，Maven 才认为项目已验证**：

通过执行验证阶段，我们可以确保我们的项目在打包成构件并分发之前，包括集成测试在内的彻底测试。这个阶段可以帮助我们维护应用程序的可靠性和质量。

## 5. Maven 安装阶段

另一方面，_mvn install_ 负责将项目的构件安装到本地仓库中。它触发安装（install）阶段，该阶段直接在验证（verify）之后。**因此，它具有双重目的：验证我们的代码质量和在本地安装我们的构件**。

当我们运行 _mvn install_ 时，Maven 除了执行验证阶段的所有先前步骤外，还执行安装阶段：

这在处理彼此依赖的多个项目时特别有用，因为它避免了手动在项目之间复制 JAR 文件。

## 6. _mvn install_ 和 _mvn verify_ 之间的区别

虽然 _mvn install_ 和 _mvn verify_ 都有助于默认生命周期并共享共同的阶段，但它们服务于略有不同的目的：

- _mvn verify_ 专注于执行超出简单单元测试的质量检查，如集成测试和通过插件配置的自定义检查。当目标是确保项目满足特定的质量标准时，建议使用它。
- _mvn install_ 主要用于将项目的构件安装到本地仓库中。它通常在开发中使用，用于在同一台机器上的项目之间共享构件。

## 7. 结论

了解不同的 Maven 生命周期和阶段对于在 Maven 驱动的构建环境中进行有效的项目管理和协作至关重要。

在本文中，我们讨论了 _mvn install_ 是本地开发和依赖管理的首选命令。相比之下，我们看到了如何使用 _mvn verify_ 来对我们的项目进行完整性和质量检查。

如常，代码可在 GitHub 上获取。