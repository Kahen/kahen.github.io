---
date: 2024-06-23
category:
  - Java
  - Maven
tag:
  - Maven
  - Java
head:
  - - meta
    - name: keywords
      content: Maven, Java, 编程
------
# 从Java代码运行Maven

Maven 是大多数Java项目中不可或缺的工具。它提供了一种方便的方式来运行和配置构建。**然而，在某些情况下，我们需要对过程有更多的控制。** 从Java运行Maven构建使其更加可配置，因为我们可以实时做出许多决策。

在本教程中，我们将学习如何与Maven交互，并直接从代码中运行构建。

## 2. 学习平台

让我们考虑以下示例，以更好地理解直接从Java使用Maven的目标和有用性：想象一个Java学习平台，学生可以从各种主题中选择并从事作业。

**因为我们的平台主要针对初学者，我们希望尽可能简化整个体验。** 这样，学生就可以选择他们想要的任何主题，甚至可以组合它们。我们在服务器上生成项目，学生可以在线完成。

从头开始生成项目，我们将使用Apache的_maven-model_库：

```xml
```<dependency>```
    ```<groupId>```org.apache.maven```</groupId>```
    ```<artifactId>```maven-model```</artifactId>```
    ```<version>```3.9.6```</version>```
```</dependency>```
```

我们的构建器将采取简单的步骤，使用初始信息创建POM文件：

```java
public class ProjectBuilder {
    // 常量

    public ProjectBuilder addDependency(String groupId, String artifactId, String version) {
        Dependency dependency = new Dependency();
        dependency.setGroupId(groupId);
        dependency.setArtifactId(artifactId);
        dependency.setVersion(version);
        dependencies.add(dependency);
        return this;
    }

    public ProjectBuilder setJavaVersion(JavaVersion version) {
        this.javaVersion = version;
        return this;
    }

    public void build(String userName, Path projectPath, String packageName) throws IOException {
        Model model = new Model();
        configureModel(userName, model);
        dependencies.forEach(model::addDependency);
        Build build = configureJavaVersion();
        model.setBuild(build);
        MavenXpp3Writer writer = new MavenXpp3Writer();
        writer.write(new FileWriter(projectPath.resolve(POM_XML).toFile()), model);
        generateFolders(projectPath, SRC_TEST);

        Path generatedPackage = generateFolders(projectPath,
          SRC_MAIN_JAVA +
            packageName.replace(PACKAGE_DELIMITER, FileSystems.getDefault().getSeparator()));
        String generatedClass = generateMainClass(PACKAGE + packageName);
        Files.writeString(generatedPackage.resolve(MAIN_JAVA), generatedClass);
    }
   // 实用方法
}
```

首先，我们确保所有学生都有正确的环境。其次，我们减少他们需要采取的步骤，从获取作业到开始编码。设置环境可能是微不足道的，但在编写第一个“Hello World”程序之前处理依赖管理和配置可能对初学者来说太多了。

我们还想引入一个包装器，该包装器将从Java与Maven交互：

```java
public interface Maven {
    String POM_XML = "pom.xml";
    String COMPILE_GOAL = "compile";
    String USE_CUSTOM_POM = "-f";
    int OK = 0;
    String MVN = "mvn";

    void compile(Path projectFolder);
}
```

目前，这个包装器只会编译项目。然而，我们可以扩展它以包含额外的操作。

## 3. 通用执行器

首先，让我们检查我们可以运行简单脚本的工具。**因此，解决方案不是特定于Maven的，但我们可以运行_mvn_命令。** 我们有两个选项：_Runtime.exec_和_ProcessBuilder_。它们非常相似，以至于我们可以使用一个额外的抽象类来处理异常：

```java
public abstract class MavenExecutorAdapter implements Maven {
    @Override
    public void compile(Path projectFolder) {
        int exitCode;
        try {
            exitCode = execute(projectFolder, COMPILE_GOAL);
        } catch (InterruptedException e) {
            throw new MavenCompilationException("编译期间中断", e);
        } catch (IOException e) {
            throw new MavenCompilationException("执行不正确", e);
        }
        if (exitCode != OK) {
            throw new MavenCompilationException("编译失败：" + exitCode);
        }
    }

    protected abstract int execute(Path projectFolder, String compileGoal)
      throws InterruptedException, IOException;
}
```

### 3.1. 运行时执行器

让我们看看如何使用_Runtime.exec(String[])_运行一个简单的命令：

```java
public class MavenRuntimeExec extends MavenExecutorAdapter {
    @Override
    protected int execute(Path projectFolder, String compileGoal) throws InterruptedException, IOException {
        String[] arguments = {MVN, USE_CUSTOM_POM, projectFolder.resolve(POM_XML).toString(), COMPILE_GOAL};
        Process process = Runtime.getRuntime().exec(arguments);
        return process.waitFor();
    }
}
```

这是从Java运行任何脚本和命令的非常直接的方法。

### 3.2. 进程构建器

另一个选择是_ProcessBuilder_。它类似于之前的解决方案，但提供了稍微更好的API：

```java
public class MavenProcessBuilder extends MavenExecutorAdapter {
    private static final ProcessBuilder PROCESS_BUILDER = new ProcessBuilder();

    protected int execute(Path projectFolder, String compileGoal) throws IOException, InterruptedException {
        Process process = PROCESS_BUILDER
          .command(MVN, USE_CUSTOM_POM, projectFolder.resolve(POM_XML).toString(), compileGoal)
          .start();
        return process.waitFor();
    }
}
```

从Java 9开始，_ProcessBuilder_可以使用类似于_Streams_的管道。这样，我们可以运行构建并触发额外的处理。

## 4. Maven API

现在，让我们考虑为Maven量身定制的解决方案。有两个选项：_MavenEmbedder_和_MavenInvoker_。

### 4.1. _MavenEmbedder_

虽然之前的解决方案不需要任何额外的依赖项，但对于这个，我们需要使用以下包：

```xml
```<dependency>```
    ```<groupId>```org.apache.maven```</groupId>```
    ```<artifactId>```maven-embedder```</artifactId>```
    ```<version>```3.9.6```</version>```
```</dependency>```
```

这个库为我们提供了一个高级API，并简化了与Maven的交互：

```java
public class MavenEmbedder implements Maven {
    public static final String MVN_HOME = "maven.multiModuleProjectDirectory";

    @Override
    public void compile(Path projectFolder) {
        MavenCli cli = new MavenCli();
        System.setProperty(MVN_HOME, projectFolder.toString());
        cli.doMain(new String[]{COMPILE_GOAL}, projectFolder.toString(), null, null);
    }
}
```

### 4.2. _MavenInvoker_

类似于_MavenEmbedder_的另一个工具是_MavenInvoker_。要使用它，我们还需要导入一个库：

```xml
```<dependency>```
    ```<groupId>```org.apache.maven.shared```</groupId>```
    ```<artifactId>```maven-invoker```</artifactId>```
    ```<version>```3.2.0```</version>```
```</dependency>```
```

它也提供了一个不错的高级API用于交互：

```java
public class MavenInvoker implements Maven {
    @Override
    public void compile(Path projectFolder) {
        InvocationRequest request = new DefaultInvocationRequest();
        request.setPomFile(projectFolder.resolve(POM_XML).toFile());
        request.setGoals(Collections.singletonList(Maven.COMPILE_GOAL));
        Invoker invoker = new DefaultInvoker();
        try {
            InvocationResult result = invoker.execute(request);
            if (result.getExitCode() != 0) {
                throw new MavenCompilationException("构建失败", result.getExecutionException());
            }
        } catch (MavenInvocationException e) {
            throw new MavenCompilationException("Maven调用期间异常", e);
        }
    }
}
```

## 5. 测试

现在，我们可以确保我们创建并编译了一个项目：

```java
class MavenRuntimeExecUnitTest {
    private static final String PACKAGE_NAME = "com.baeldung.generatedcode";
    private static final String USER_NAME = "john_doe";
    @TempDir
    private Path tempDir;

    @BeforeEach
    public void setUp() throws IOException {
        ProjectBuilder projectBuilder = new ProjectBuilder();
        projectBuilder.build(USER_NAME, tempDir, PACKAGE_NAME);
    }

    @ParameterizedTest
    @MethodSource
    void givenMavenInterface_whenCompileMavenProject_thenCreateTargetDirectory(Maven maven) {
        maven.compile(tempDir);
        assertTrue(Files.exists(tempDir));
    }

    static Stream`<Maven>` givenMavenInterface_whenCompileMavenProject_thenCreateTargetDirectory() {
        return Stream.of(
          new MavenRuntimeExec(),
          new MavenProcessBuilder(),
          new MavenEmbedder(),
          new MavenInvoker());
    }
}
```

**我们从头开始生成了一个对象，并直接从Java代码编译了它。** 尽管我们不是每天都遇到这样的需求，但自动化Maven流程可能会使一些项目受益。

## **6. 结论**

Maven根据POM文件配置和构建项目。然而，XML配置不适用于动态参数和条件逻辑。

**我们可以利用Java代码通过直接从代码中运行来设置Maven构建。** 实现这一点的最佳方式是使用特定的库，如_MavenEmbedder_或_MavenInvoker_。同时，还有一些更底层的方法可以获得类似的结果。

像往常一样，