---
date: 2022-06-28
category:
  - Java
tag:
  - OpenRewrite
  - 代码重构
head:
  - - meta
    - name: keywords
      content: OpenRewrite, Java, 代码重构, Spring Boot, JUnit, Maven
---
# OpenRewrite 使用指南

## 1. 概览

OpenRewrite 是一个用于 Java 和其他源代码的代码重构生态系统。有时，我们需要将依赖升级到最新版本，应用安全补丁，消除使用已弃用的 API，从一种技术迁移到另一种技术（例如，从 JUnit 断言迁移到 AssertJ）等。我们可以使用 OpenRewrite 库来解决这些挑战。在本教程中，我们将讨论 OpenRewrite 项目的基础知识，并展示一些如何在实践中使用它的例子。在每种情况下，我们都将使用 Spring PetClinic 应用程序。

## 2. OpenRewrite 基础

以下是我们可以使用 OpenRewrite 执行的一些常见类型的升级：

- 语言升级：从旧版本的语言迁移到新版本，例如从 Java 8 迁移到 Java 11 或更高版本。
- 框架升级：适应像 Spring Boot、Hibernate 等框架的新版本。
- 依赖迁移：在存在重大变更时，从库的一个版本升级到另一个版本。
- 安全补丁：用安全的替代品替换易受攻击的方法或库。
- 自定义转换：针对我们的业务逻辑或基础设施特定的任何转换。

### 2.1. OpenRewrite 配方

OpenRewrite 的主要特点是它将通过将配方应用于项目自动重构源代码。OpenRewrite 附带了各种内置配方，用于常见的转换，社区也经常为广泛使用的任务贡献配方。每个配方可以执行特定的重构任务。这些配方是用 Java 代码编写的，并使用 OpenRewrite Maven 或 Gradle 插件包含在构建过程中。在本教程中，我们将重点关注 Maven 插件。

### 2.2. Maven 依赖

让我们从在 _pom.xml_ 的 _`<plugins>`_ 部分导入 _rewrite-maven-plugin_ 插件开始：

```xml
`<plugin>`
    ```````<groupId>```````org.openrewrite.maven```````</groupId>```````
    ```````<artifactId>```````rewrite-maven-plugin```````</artifactId>```````
    ````````<version>````````5.8.1````````</version>````````
    `<configuration>`
        ```````<activeRecipes>```````
            `<!-- 定义配方 -->`
        ````</activeRecipes>````
    `</configuration>`
    ```<dependencies>```
        `<!-- 配方的依赖 -->`
    `</dependencies>`
`</plugin>`
```

_```````<activeRecipes>```````_ 标签指定了当插件运行时应激活哪些 OpenRewrite 配方。此外，我们可以定义插件可能需要的任何其他依赖。如果某些配方需要外部库或特定版本的库，这可能特别有用。

### 2.3. 检出 Spring PetClinic

让我们从本地检出 Spring PetClinic 的相关分支：

```shell
git clone https://github.com/spring-projects/spring-petclinic.git;
cd spring-petclinic;
git switch -c 2.5.x 1.5.x;
```

在这里，Java 和 Spring Boot 的版本分别是 8 和 1.5。在接下来的部分中，我们将经历最广泛使用的配方。

## 3. 升级 Spring Boot

升级 Spring Boot 项目可能是一个复杂的任务，这取决于我们当前使用的版本和我们想要升级到的版本之间的变化。然而，使用 OpenRewrite 可以帮助我们顺利地进行这个过程。让我们将 PetClinic 项目从 Spring Boot 1.5 升级到 2.7。

### 3.1. Maven 依赖

让我们在 _rewrite-maven-plugin_ 插件的 _```````<activeRecipes>```````_ 部分添加 _UpgradeSpringBoot_2_7_ 配方：

```xml
```````<activeRecipes>```````
    ```<recipe>```org.openrewrite.java.spring.boot2.UpgradeSpringBoot_2_7```</recipe>```
````</activeRecipes>````
```

此外，我们需要在插件的 _```<dependencies>```_ 部分声明 _rewrite-spring_ 依赖：

```xml
`````<dependency>`````
    ```````<groupId>```````org.openrewrite.recipe```````</groupId>```````
    ```````<artifactId>```````rewrite-spring```````</artifactId>```````
    ````````<version>````````5.0.11````````</version>````````
`````</dependency>`````
```

请注意，要升级到 Spring Boot 3，我们需要使用 _UpgradeSpringBoot_3_0_ 配方。

### 3.2. 运行 Spring Boot 升级配方

现在，我们已经准备好通过运行此命令来执行迁移：

```shell
mvn rewrite:run
```

下面，我们可以看到 Maven 的结果：

```shell
[INFO] --- rewrite-maven-plugin:5.8.1:run (default-cli) @ spring-petclinic ---
[INFO] Using active recipe(s) [org.openrewrite.java.spring.boot2.UpgradeSpringBoot_2_7]
[INFO] Using active styles(s) []
[INFO] Validating active recipes...
[INFO] Project [petclinic] Resolving Poms...
[INFO] Project [petclinic] Parsing source files
```

在这里，我们看到 Maven 列出了活动的配方，并应用了 _pom_ 和源文件更改。运行配方后，OpenRewrite 提供了更改列表。我们可以使用 _git diff_ 来检查结果：

```diff
`<parent>`
    ```````<groupId>```````org.springframework.boot```````</groupId>```````
    ```````<artifactId>```````spring-boot-starter-parent```````</artifactId>```````
-   ````````<version>````````1.5.4.RELEASE````````</version>````````
+   ````````<version>````````2.7.14````````</version>````````
`</parent>`
```

正如我们在这里看到的，_spring-boot-starter-parent_ 版本已经升级到 2.7.14。此外，在升级过程中，我们的一些 Java 类中的 _@Autowired_ 已经被移除：

```diff
-import org.springframework.beans.factory.annotation.Autowired;
class VetController {

    private final VetRepository vets;

-   @Autowired
    public VetController(VetRepository clinicService) {
        this.vets = clinicService;
    }
}
```

请注意，在 Spring Boot 2.x 及以上版本中，如果一个类有一个单一构造函数，它将自动用于自动装配，而不需要 _@Autowired_ 注解。**当我们升级到较新的 Spring Boot 版本时，许多受管理的依赖项，包括 JUnit，也可能会被升级**。Spring Boot 2.x 默认使用 JUnit 5，而 Spring Boot 1.5 与 JUnit 4 对齐。这意味着测试的结构和运行方式会有预期的变化。根据我们的需求，我们可以只升级 JUnit 而不升级 Spring Boot。在下一节中，我们将看到如何从 JUnit 4 迁移到 JUnit 5。

## 4. 升级到 JUnit5

JUnit 是 Java 应用程序中单元测试的事实标准。**OpenRewrite 支持从 JUnit 4 迁移到其后继者 JUnit 5**。

### 4.1. Maven 依赖

让我们在 _pom.xml_ 中激活 _JUnit5BestPractices_ 配方：

```xml
```````<activeRecipes>```````
    ```<recipe>```org.openrewrite.java.testing.junit5.JUnit5BestPractices```</recipe>```
````</activeRecipes>````
```

此外，我们需要在插件的 _```<dependencies>```_ 部分声明 _rewrite-testing-frameworks_ 依赖：

```xml
`````<dependency>`````
    ```````<groupId>```````org.openrewrite.recipe```````</groupId>```````
    ```````<artifactId>```````rewrite-testing-frameworks```````</artifactId>```````
    ````````<version>````````2.0.12````````</version>````````
`````</dependency>`````
```

### 4.2. 运行 JUnit 升级配方

现在，我们通过运行 _mvn rewrite:run_ 命令来执行迁移。此命令大约在一分钟内完成，并将所有测试迁移到 JUnit 5，同时更新 _pom.xml_：

```diff
-import org.junit.Before;
-import org.junit.Test;
-import org.junit.runner.RunWith;
+import static org.junit.jupiter.api.Assertions.assertEquals;
+import static org.junit.jupiter.api.Assertions.assertThrows;
+import org.junit.jupiter.api.BeforeEach;
+import org.junit.jupiter.api.Test;
+import org.junit.jupiter.api.extension.ExtendWith;
-import org.mockito.runners.MockitoJUnitRunner;
+import org.mockito.junit.jupiter.MockitoExtension;

-    @Before
-    public void setup() {
+    @BeforeEach
+    void setup() {
         this.petTypeFormatter = new PetTypeFormatter(pets);
     }

-    @Test(expected = ParseException.class)
-    public void shouldThrowParseException() throws ParseException {
-        Mockito.when(this.pets.findPetTypes()).thenReturn(makePetTypes());
-        petTypeFormatter.parse("Fish", Locale.ENGLISH);
+    @Test
+    void shouldThrowParseException() throws ParseException {
+        assertThrows(ParseException.class, () -> {
+            Mockito.when(this.pets.findPetTypes()).thenReturn(makePetTypes());
+            petTypeFormatter.parse("Fish", Locale.ENGLISH);
+        });
    }
```

OpenRewrite 不仅更新了导入和 _@Test_ 注解，还修改了方法可见性，应用了 _MockitoExtension_，并采用了 _assertThrows()_。总的来说，OpenRewrite 可以帮助 JUnit 迁移完成以下任务：

- 更新注解，例如将 _@Before_ 更改为 _@BeforeEach_ 或 _@After_ 更改为 _@AfterEach_。
- 修改断言方法调用以与 JUnit 5 的语法对齐。
-- 移除或替换 JUnit 4 特定功能，使用 JUnit 5 的对应功能。
- 更新从 JUnit 4 包到 JUnit 5 包的导入语句。

## 5. 升级到 Java 11

将旧的源代码升级到 Java 11 可能是一个具有挑战性和耗时的问题。在本节中，我们将使用 OpenRewrite 执行从 Java 8 到 Java 11 的自动化迁移。

### 5.1. Maven 依赖

要升级 Java，我们需要不同的依赖和配方。让我们在 _```````<activeRecipes>```````_ 部分添加 _Java8toJava11_ 配方：

```xml
```````<activeRecipes>```````
    ```<recipe>```org.openrewrite.java.migrate.Java8toJava11```</recipe>```
````</activeRecipes>````
```

此外，我们需要在我们的插件中声明 _rewrite-migrate-java_ 依赖：

```xml
`````<dependency>`````
    ```````<groupId>```````org.openrewrite.recipe```````</groupId>```````
    ```````<artifactId>```````rewrite-migrate-java```````</artifactId>```````
    ````````<version>````````2.1.1````````</version>````````
`````</dependency>`````
```

请注意，要升级到 Java 17，我们需要使用 _UpgradeToJava17_ 配方。

### 5.2. 运行 Java 升级配方

要升级 Java，我们可以应用 _mvn rewrite:run_ 命令。之后，我们将看到类似的输出：

```shell
[INFO] Using active recipe(s) [org.openrewrite.java.migrate.Java8toJava11]
[INFO] Running recipe(s)...
[WARNING] Changes have been made to pom.xml by:
[WARNING]     org.openrewrite.java.migrate.Java8toJava11
[WARNING]         org.openrewrite.java.migrate.javax.AddJaxbDependencies
[WARNING]             org.openrewrite.java.dependencies.AddDependency: {groupId=jakarta.xml.bind, artifactId=jakarta.xml.bind-api, version=2.3.x, onlyIfUsing=javax.xml.bind..*, acceptTransitive=true}
[WARNING]                 org.openrewrite.maven.AddDependency: {groupId=jakarta.xml.bind, artifactId=jakarta.xml.bind-api, version=2.3.x, onlyIfUsing=javax.xml.bind..*, acceptTransitive=true}
[WARNING]             org.openrewrite.java.migrate.javax.AddJaxbRuntime: {runtime=glassfish}
[WARNING]                 org.openrewrite.java.migrate.javax.AddJaxbRuntime$AddJaxbRuntimeMaven
[WARNING]         org.openrewrite.java.migrate.cobertura.RemoveCoberturaMavenPlugin
[WARNING]             org.openrewrite.maven.RemovePlugin: {groupId=org.codehaus.mojo, artifactId=cobertura-maven-plugin}
[WARNING]         org.openrewrite.java.migrate.wro4j.UpgradeWro4jMavenPluginVersion
[WARNING]             org.openrewrite.maven.UpgradePluginVersion: {groupId=ro.isdc.wro4j, artifactId=wro4j-maven-plugin, newVersion=1.10.1}
[WARNING]         org.openrewrite.java.migrate.JavaVersion11
[WARNING]             org.openrewrite.java.migrate.UpgradeJavaVersion: {version=11}
```

_Java8toJava11_ 配方产生了以下主要相关更改：

```diff
-    ``<java.version>``1.8``</java.version>``
+    ``<java.version>``11``</java.version>``

-    ``<wro4j.version>``1.8.0``</wro4j.version>``
+    ``<wro4j.version>``1.10.1``</wro4j.version>``

+    `````<dependency>`````
+      ```````<groupId>```````jakarta.xml.bind```````</groupId>```````
+      ```````<artifactId>```````jakarta.xml.bind-api```````</artifactId>```````
+      ````````<version>````````2.3.3````````</version>````````
+    `````</dependency>`````

+    `````<dependency>`````
+      ```````<groupId>```````org.glassfish.jaxb```````</groupId>```````
+      ```````<artifactId>```````jaxb-runtime```````</artifactId>```````
+      ````````<version>````````2.3.8````````</version>````````
+      `<scope>`provided`</scope>`
+    `````</dependency>`````
```

在这里，我们看到 _java.version_ Maven 属性被更改为 11，这设置了 _maven.compiler.source_ 和 _maven.compiler.target_。这解锁了 Java 11 语言特性，如 _var_。在此过程中，_wro4j_ 也更新到了最新版本。Wro4j 是 Java 应用程序中优化和管理 Web 资源（如 JavaScript 和 CSS 文件）的流行开源项目。此外，在从 Java 8 迁移到 Java 11 时，一个主要的变化是 JDK 中移除了 _javax.xml.bind_ 模块。许多依赖此模块进行 JAXB 功能的应用程序需要添加第三方依赖项以保留此功能。一个这样的替代品是 _jakarta.xml.bind-api_ 依赖项。

## 6. 结论

在本教程中，我们提供了一个逐步指南，利用 OpenRewrite 项目在 Spring PetClinic 代码库中无缝升级 Spring Boot、JUnit 和 Java 的版本。通过遵循本教程，我们可以深入了解升级过程的复杂性，确保更平滑的过渡和这些核心组件更好的代码兼容性。
OK