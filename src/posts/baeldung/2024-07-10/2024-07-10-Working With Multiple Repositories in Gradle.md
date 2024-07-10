---
date: 2022-04-01
category:
  - Java
  - Gradle
tag:
  - 多仓库管理
  - Gradle
head:
  - - meta
    - name: keywords
      content: Gradle, Maven, GitHub Package Registry, Java
---
# 在Gradle中使用多个仓库

在本教程中，我们将看到如何在Gradle项目中使用多个仓库。这在我们需要使用Maven Central上不可用的JAR文件时非常有用。我们还将看到如何使用GitHub发布Java包并在不同项目之间共享它们。

在使用Gradle作为构建工具时，我们经常在`build.gradle`的`repositories`部分遇到`mavenCentral()`。如果我们想要添加其他仓库，我们可以将它们添加到同一节中，以指示我们的库的来源：

```
repositories {
    mavenLocal()
    mavenCentral()
}
```

在这里，`mavenLocal()`用于在Maven的本地缓存中查找所有依赖项。在该缓存中未找到的任何仓库都将从Maven Central下载。

### 3.1. 发布包到GitHub Package Registry

我们将发布以下类到GitHub注册表，并稍后在另一个项目中使用它：

```java
public class User {
    private Integer id;
    private String name;
    private Date dob;

   // 标准构造函数，getter和setter
}
```

为了发布我们的代码，**我们需要来自GitHub的个人访问令牌**。我们可以通过遵循GitHub文档中提供的说明来创建一个。然后，我们添加一个发布任务到我们的`build.gradle`文件，使用我们的用户名和这个令牌：

```groovy
publishing {
    publications {
        register("jar", MavenPublication) {
            from(components["java"])
            pom {
                url.set("https://github.com/eugenp/tutorials.git")
            }
        }
    }
    repositories {
        maven {
            name = "GitHubPackages"
            url = "https://maven.pkg.github.com/eugenp/tutorials"
            credentials {
                username = project.USERNAME
                password = project.GITHUB_TOKEN
            }
        }
    }
}
```

在上述代码片段中，**用户名和密码是在执行Gradle的发布任务时提供的项目级变量**。

### 3.2. 使用已发布包作为库

成功发布我们的包后，**我们可以将其作为来自经过身份验证的仓库的库安装**。让我们在`build.gradle`中添加以下代码，以在新项目中使用已发布的包：

```groovy
repositories {
    // 其他仓库
    maven {
        name = "GitHubPackages"
        url = "https://maven.pkg.github.com/eugenp/tutorials"
        credentials {
            username = project.USERNAME
            password = project.GITHUB_TOKEN
        }
    }
}
dependencies {
    implementation('com.baeldung.gradle:publish-package:1.0.0-SNAPSHOT')
    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.9.0")
    // 其他依赖项
}
```

这将从GitHub Package Registry安装库，并允许我们在项目中扩展该类：

```java
public class Student extends User {
    private String studentCode;
    private String lastInstitution;
    // 标准构造函数，getter和setter
}
```

让我们使用一个简单的测试方法来测试我们的代码：

```java
@Test
public void testPublishedPackage(){
    Student student = new Student();
    student.setId(1);
    student.setStudentCode("CD-875");
    student.setName("John Doe");
    student.setLastInstitution("Institute of Technology");

    assertEquals("John Doe", student.getName());
}
```

## 4. 结论

在本文中，我们看到了如何在Gradle项目中使用来自多个仓库的库。我们还学习了如何使用GitHub Package Registry进行经过身份验证的仓库。

如常，示例的源代码可以在GitHub上找到。