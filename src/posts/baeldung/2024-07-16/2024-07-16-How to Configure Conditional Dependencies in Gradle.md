---
date: 2022-08-01
category:
  - Gradle
  - 教程
tag:
  - 条件依赖
  - 配置
head:
  - - meta
    - name: keywords
      content: Gradle, 条件依赖, 配置, Java, Spring Boot
---
# 如何在Gradle中配置条件依赖

在本教程中，我们将看到如何在Gradle项目中配置条件依赖。

## 2. 项目设置

我们将为演示设置一个多模块项目。让我们前往_start.spring.io_并创建我们的根项目_conditional-dependency-demo_。我们将使用Gradle和Java以及Spring Boot。

我们还添加了两个提供者模块_provider1_和_provider2_，以及两个消费者模块_consumer1_和_consumer2_：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/conditional-dependency-project-structure-1024x1022.png)

## 3. 配置条件依赖

假设，基于一个项目属性，我们想要包含两个提供者模块中的一个。对于我们的_consumer1_模块，如果指定了属性_isLocal_，我们想要包含_provider1_模块。否则，应该包含_provider2_模块。

为此，让我们在_consumer1_模块的_gradle.settings.kts_文件中添加以下内容：

```
plugins {
    id("java")
}

group = "com.baeldung.gradle"
version = "0.0.1-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.7.0")
    testRuntimeOnly ("org.junit.jupiter:junit-jupiter-engine:5.7.0")

    if (project.hasProperty("isLocal")) {
        implementation("com.baeldung.gradle:provider1")
    } else {
        implementation("com.baeldung.gradle:provider2")
    }
}

tasks.getByName``<Test>``("test") {
    useJUnitPlatform()
}
```

现在，让我们运行依赖任务来看看哪个提供者模块被选中：

```
gradle -PisLocal dependencies --configuration implementation
```

```
> Task :consumer1:dependencies

------------------------------------------------------------

Project ':consumer1'

------------------------------------------------------------

implementation - 仅用于源集'main'的实现依赖。 (n)
\--- com.baeldung.gradle:provider1 (n)

(n) - 未解析（配置不打算被解析）

通过添加--scan选项，可以获取基于Web的、可搜索的依赖报告。

BUILD SUCCESSFUL in 591ms
1 actionable task: 1 executed
```

正如我们所看到的，传递属性导致了_provider1_模块的包含。现在让我们在未指定任何属性的情况下运行依赖任务：

```
gradle dependencies --configuration implementation
```

```
> Task :consumer1:dependencies

------------------------------------------------------------

Project ':consumer1'

------------------------------------------------------------

implementation - 仅用于源集'main'的实现依赖。 (n)
\--- com.baeldung.gradle:provider2 (n)

(n) - 未解析（配置不打算被解析）

通过添加--scan选项，可以获取基于Web的、可搜索的依赖报告。

BUILD SUCCESSFUL in 649ms
1 actionable task: 1 executed
```

正如我们所看到的，现在_provider2_正在被包含。

## 4. 通过模块替换配置条件依赖

让我们看看通过依赖替换条件配置依赖的另一种方法。对于我们的_consumer2_模块，如果指定了_isLocal_属性，我们想要包含_provider2_模块。否则，应该使用模块_provider1_。

让我们添加以下配置到我们的_consumer2_模块以实现这个目标：

```
plugins {
    id("java")
}

group = "com.baeldung.gradle"
version = "0.0.1-SNAPSHOT"

repositories {
    mavenCentral()
}

configurations.all {
    resolutionStrategy.dependencySubstitution {
        if (project.hasProperty("isLocal"))
            substitute(project("com.baeldung.gradle:provider1"))
              .using(project(":provider2"))
              .because("Project property override(isLocal).")
    }
}

dependencies {
    implementation(project(":provider1"))

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.7.0")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.7.0")
}

tasks.getByName``<Test>``("test") {
    useJUnitPlatform()
}
```

现在，如果我们再次运行相同的命令，我们应该得到类似的结果。让我们首先在指定_isLocal_属性的情况下运行：

```
gradle -PisLocal dependencies --configuration compilePath
```

```
> Task :consumer2:dependencies

------------------------------------------------------------

Project ':consumer2'

------------------------------------------------------------

compileClasspath - 源集'main'的编译类路径。
\--- project :provider1 -> project :provider2

通过添加--scan选项，可以获取基于Web的、可搜索的依赖报告。

BUILD SUCCESSFUL in 1s
1 actionable task: 1 executed
```

果不其然，我们看到_provider1_项目被_provider2_项目替换了。现在让我们在未指定属性的情况下尝试这个：

```
gradle dependencies --configuration compilePath
```

```
> Task :consumer2:dependencies

------------------------------------------------------------

Project ':consumer2'

------------------------------------------------------------

compileClasspath - 源集'main'的编译类路径。
\--- project :provider1

通过添加--scan选项，可以获取基于Web的、可搜索的依赖报告。

BUILD SUCCESSFUL in 623ms
1 actionable task: 1 executed
```

正如预期的那样，这次没有发生替换，_provider1_被包含了。

## 5. 两种方法之间的区别

正如我们在上面的演示中看到的，两种方法都帮助我们实现了条件配置依赖的目标。让我们来谈谈两种方法之间的一些区别。

首先，**直接编写条件逻辑看起来更简单，与第二种方法相比配置更少。**

其次，**尽管第二种方法涉及更多的配置，但它看起来更符合Gradle的习惯用法。**在第二种方法中，我们利用了Gradle自身提供的替换机制。它还允许我们指定替换的原因。此外，在日志中，我们可以注意到替换的发生，而在第一种方法中没有这样的信息：

```
compileClasspath - 源集'main'的编译类路径。
\--- project :provider1 -> project :provider2
```

让我们还注意到，在第一种方法中，不需要依赖解析。我们可以通过以下方式获得结果：

```
gradle -PisLocal dependencies --configuration implementation
```

而在第二种方法中，如果我们检查_implementation_配置，我们将看不到预期的结果。原因是它只有在依赖解析发生时才有效。因此，它在_compilePath_配置中可用：

```
gradle -PisLocal dependencies --configuration compilePath
```

## 6. 结论

通过这篇文章，我们可以得出结论。在这篇文章中，我们看到了两种在Gradle中条件配置依赖的方法。我们还分析了两者之间的区别。

Gradle提供的依赖替换配置似乎是更符合习惯用法的方法。像往常一样，完整的代码和Gradle配置可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/0118f8036c29b33058560c2d939e3e3f?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2022/08/conditional-dependency-project-structure-1024x1022.png)