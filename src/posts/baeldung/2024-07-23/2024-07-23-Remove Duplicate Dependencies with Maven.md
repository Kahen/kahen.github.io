---
date: 2022-06-01
category:
  - Maven
  - 教程
tag:
  - Maven
  - 依赖管理
head:
  - - meta
    - name: keywords
      content: Maven, 依赖管理, 重复依赖
------
# Maven中移除重复依赖

在本教程中，我们将学习如何使用Maven命令在_pom.xml_中检测重复依赖。我们还将看到如何使用Maven Enforcer插件在存在重复依赖时使构建失败。

## 1. 概述

## 2. 为什么要检测重复依赖？

在_pom.xml_中存在重复依赖的风险是，目标库的最新版本可能不会应用到我们项目的构建路径中。例如，考虑以下_pom.xml_：

```xml
``<project>``
  [...]
  `<dependencies>`
    ``<dependency>``
      ```<groupId>```org.apache.commons```</groupId>```
      ```<artifactId>```commons-lang3```</artifactId>```
      ```<version>```3.12.0```</version>```
    ``</dependency>``
    ``<dependency>``
      ```<groupId>```org.apache.commons```</groupId>```
      ```<artifactId>```commons-lang3```</artifactId>```
      ```<version>```3.11```</version>```
    ``</dependency>``
  `</dependencies>`
  [...]
``</project>``
```

如我们所见，相同的库_commons-lang3_有两个依赖，但这两个依赖的版本不同。

接下来，让我们看看如何使用Maven命令来检测这些重复依赖。

## 3. 依赖树命令

让我们在终端中运行命令_mvn dependency:tree_并查看输出。

```shell
$ mvn dependency:tree
[INFO] Scanning for projects...
[WARNING]
[WARNING] Some problems were encountered while building the effective model for com.baeldung:maven-duplicate-dependencies:jar:0.0.1-SNAPSHOT
[WARNING] 'dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: org.apache.commons:commons-lang3:jar ->
version 3.12.0 vs 3.11 @ line 14, column 15
[WARNING]
[WARNING] It is highly recommended to fix these problems because they threaten the stability of your build.
[WARNING]
[WARNING] For this reason, future Maven versions might no longer support building such malformed projects.
[WARNING]
[INFO]
[INFO] -------------
[INFO] Building maven-duplicate-dependencies 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-dependency-plugin:2.8:tree (default-cli) @ maven-duplicate-dependencies ---
[WARNING] The artifact xml-apis:xml-apis:jar:2.0.2 has been relocated to xml-apis:xml-apis:jar:1.0.b2
[INFO] com.baeldung:maven-duplicate-dependencies:jar:0.0.1-SNAPSHOT
[INFO] \- org.apache.commons:commons-lang3:jar:3.11:compile
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.136 s
[INFO] Finished at: 2021-12-20T09:45:20+05:30
[INFO] ------------------------------------------------------------------------
```

在这里，我们收到关于_pom.xml_中存在重复依赖的警告。我们还注意到，尽管存在更高版本的_3.12.0_，但_version 3.11_的_commons-lang3.jar_被添加到了项目中。**这是因为Maven选择了在_pom.xml_中后出现的依赖。**

## 4. 依赖analyze-duplicate命令

现在让我们运行命令_mvn dependency:analyze-duplicate_并检查输出。

```shell
$ mvn dependency:analyze-duplicate
[INFO] Scanning for projects...
[WARNING]
[WARNING] Some problems were encountered while building the effective model for com.baeldung:maven-duplicate-dependencies:jar:0.0.1-SNAPSHOT
[WARNING] 'dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: org.apache.commons:commons-lang3:jar ->
version 3.12.0 vs 3.11 @ line 14, column 15
[WARNING]
[WARNING] It is highly recommended to fix these problems because they threaten the stability of your build.
[WARNING]
[INFO]
[INFO] -------------
[INFO] Building maven-duplicate-dependencies 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-dependency-plugin:2.8:analyze-duplicate (default-cli) @ maven-duplicate-dependencies ---
[WARNING] The artifact xml-apis:xml-apis:jar:2.0.2 has been relocated to xml-apis:xml-apis:jar:1.0.b2
[INFO] List of duplicate dependencies defined in `<dependencies/>` in your pom.xml:
        o org.apache.commons:commons-lang3:jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.835 s
[INFO] Finished at: 2021-12-20T09:54:02+05:30
[INFO] ------------------------------------------------------------------------
```

在这里，我们注意到，无论是_WARNING_还是_INFO_日志语句都提到了重复依赖的存在。

## 5. 如果存在重复依赖则使构建失败

在上述示例中，我们看到了如何检测重复依赖，但_BUILD_仍然成功。这可能导致使用错误的_jar_版本。

**使用Maven Enforcer插件，我们可以确保如果存在重复依赖，则构建不成功。**

为此，我们需要将此Maven插件添加到我们的_pom.xml_并添加规则_banDuplicatePomDependencyVersions_：

```xml
``<project>``
  [...]
  `<build>`
    `<plugins>`
      `<plugin>`
        ```<groupId>```org.apache.maven.plugins```</groupId>```
        ```<artifactId>```maven-enforcer-plugin```</artifactId>```
        ```<version>```3.0.0```</version>```
        `<executions>`
          `<execution>`
            `<id>`no-duplicate-declared-dependencies`</id>`
            `<goals>`
              `<goal>`enforce`</goal>`
            `</goals>`
            `<configuration>`
              `<rules>`
                `<banDuplicatePomDependencyVersions/>`
              `</rules>`
            `</configuration>`
          `</execution>`
        `</executions>`
      `</plugin>`
    `</plugins>`
  `</build>`
  [...]
``</project>``
```

现在，规则绑定了我们的Maven构建：

```shell
$ mvn verify
[INFO] Scanning for projects...
[WARNING]
[WARNING] Some problems were encountered while building the effective model for com.baeldung:maven-duplicate-dependencies:jar:0.0.1-SNAPSHOT
[WARNING] 'dependencies.dependency.(groupId:artifactId:type:classifier)' must be unique: org.apache.commons:commons-lang3:jar ->
version 3.12.0 vs 3.11 @ line 14, column 14
[WARNING]
[INFO] -------------
[INFO] Building maven-duplicate-dependencies 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-enforcer-plugin:3.0.0:enforce (no-duplicate-declared-dependencies) @ maven-duplicate-dependencies ---
[WARNING] Rule 0: org.apache.maven.plugins.enforcer.BanDuplicatePomDependencyVersions failed with message:
Found 1 duplicate dependency declaration in this project:
 - dependencies.dependency[org.apache.commons:commons-lang3:jar] ( 2 times )
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.537 s
[INFO] Finished at: 2021-12-20T09:55:46+05:30
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-enforcer-plugin:3.0.0:enforce (no-duplicate-declared-dependencies) on project maven-duplicate-dependencies: Some Enforcer rules have failed. Look above for specific messages explaining why the rule failed.
```

## 6. 移除重复依赖

一旦我们识别出重复依赖，最简单的方法是从_pom.xml_中删除它们，并只保留那些由我们的项目使用的唯一的依赖。

## 7. 结论

在本文中，我们学习了如何使用_mvn dependency:tree_和_mvn dependency:analyze-duplicate_命令在Maven中检测重复依赖。我们还看到了如何通过应用内置规则使用Maven Enforcer插件来使包含重复依赖的构建失败。