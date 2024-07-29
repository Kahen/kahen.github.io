---
date: 2024-07-30
category:
  - Maven
  - POM
tag:
  - super POM
  - simplest POM
  - effective POM
head:
  - - meta
    - name: keywords
      content: Maven, POM, super POM, simplest POM, effective POM, 配置, 构建
---

# Maven中超、最简、有效POM的区别

在这篇简短的教程中，我们将概述使用Maven时超POM、最简POM和有效POM之间的区别。

## 2. POM是什么？

POM代表项目对象模型（Project Object Model），它是Maven项目配置的核心。它是一个名为pom.xml的单一配置XML文件，包含了构建项目所需的大部分信息。

POM文件的作用是描述项目、管理依赖项，并声明帮助Maven构建项目的配置细节。

为了更容易理解超POM，我们可以将其与Java中的Object类进行类比：Java中的每个类默认都扩展了Object类。类似地，在POM的情况下，每个POM都扩展了超POM。

超POM文件定义了所有默认配置。因此，即使是最简单的POM文件形式也将继承超POM文件中定义的所有配置。

根据我们使用的Maven版本，超POM可能看起来略有不同。例如，如果我们在机器上安装了Maven，我们可以在`${M2_HOME}/lib`目录下找到`maven-model-builder-``````<version>``````.jar`文件。如果我们打开这个JAR文件，我们会在`org/apache/maven/model/pom-4.0.0.xml`的名称下找到它。

在接下来的部分中，我们将介绍3.6.3版本的超POM配置元素。

### 3.1. 仓库

Maven在构建过程中使用在仓库部分定义的仓库来下载所有依赖的构件。

让我们看一个例子：

```xml
`<repositories>`
    `<repository>`
        `````<id>`````central`````</id>`````
        ```<name>```Central Repository```</name>```
        ``<url>``https://repo.maven.apache.org/maven2``</url>``
        ``<layout>``default``</layout>``
        ``<snapshots>``
            ``<enabled>``false``</enabled>``
        ``</snapshots>``
    `</repository>`
`</repositories>`
```

### 3.2. 插件仓库

默认的插件仓库是中央Maven仓库。让我们看看它在pluginRepository部分是如何定义的：

```xml
`<pluginRepositories>`
    `<pluginRepository>`
        `````<id>`````central`````</id>`````
        ```<name>```Central Repository```</name>```
        ``<url>``https://repo.maven.apache.org/maven2``</url>``
        ``<layout>``default``</layout>``
        ``<snapshots>``
            ``<enabled>``false``</enabled>``
        ``</snapshots>``
        `<releases>`
            `<updatePolicy>`never`</updatePolicy>`
        `</releases>`
    `</pluginRepository>`
`</pluginRepositories>`
```

如上所见，快照被禁用，并且updatePolicy设置为“never”。因此，使用此配置，如果发布了新版本的插件，Maven将永远不会自动更新插件。

### 3.3. 构建

构建配置部分包括构建项目所需的所有信息。

让我们看看默认构建部分的一个例子：

```xml
``<build>``
    ```<directory>```${project.basedir}/target```</directory>```
    ``<outputDirectory>``${project.build.directory}/classes``</outputDirectory>``
    `<finalName>`${project.artifactId}-${project.version}`</finalName>`
    `<testOutputDirectory>`${project.build.directory}/test-classes`</testOutputDirectory>`
    `<sourceDirectory>`${project.basedir}/src/main/java`</sourceDirectory>`
    `<scriptSourceDirectory>`${project.basedir}/src/main/scripts`</scriptSourceDirectory>`
    `<testSourceDirectory>`${project.basedir}/src/test/java`</testSourceDirectory>`
    `<resources>`
        `<resource>`
            ```<directory>```${project.basedir}/src/main/resources```</directory>```
        `</resource>`
    `</resources>`
    `<testResources>`
        `<testResource>`
            ```<directory>```${project.basedir}/src/test/resources```</directory>```
        `</testResource>`
    `</testResources>`
    `<pluginManagement>`
        `<!-- NOTE: These plugins will be removed from future versions of the super POM -->`
        `<!-- They are kept for the moment as they are very unlikely to conflict -->`
        ``<plugins>``
            ```````<plugin>```````
                ````````<artifactId>````````maven-antrun-plugin````````</artifactId>````````
                ``````<version>``````1.3`````</version>`````
            ```````</plugin>```````
            ```````<plugin>```````
                ````````<artifactId>````````maven-assembly-plugin````````</artifactId>````````
                ``````<version>``````2.2-beta-5`````</version>`````
            ```````</plugin>```````
            ```````<plugin>```````
                ````````<artifactId>````````maven-dependency-plugin````````</artifactId>````````
                ``````<version>``````2.8`````</version>`````
            ```````</plugin>```````
            ```````<plugin>```````
                ````````<artifactId>````````maven-release-plugin````````</artifactId>````````
                ``````<version>``````2.5.3`````</version>`````
            ```````</plugin>```````
        ``</plugins>``
    `</pluginManagement>`
``</build>``
```

### 3.4. 报告

对于报告，超POM只提供了输出目录的默认值：

```xml
`<reporting>`
    ``<outputDirectory>``${project.build.directory}/site``</outputDirectory>``
`</reporting>`
```

### 3.5. 配置文件

如果我们在应用级别没有定义配置文件，将执行默认构建配置文件。

默认的配置文件部分看起来像这样：

```xml
`<profiles>`
    `<!-- NOTE: The release profile will be removed from future versions of the super POM -->`
    `<profile>`
        `````<id>`````release-profile`````</id>`````
        `<activation>`
            `<property>`
                ```<name>```performRelease```</name>```
                `<value>`true`</value>`
            `</property>`
        `</activation>`
        ``<build>``
            ``<plugins>``
                ```````<plugin>```````
                    ```<inherited>```true```</inherited>```
                    ````````<artifactId>````````maven-source-plugin````````</artifactId>````````
                    ``<executions>``
                        ``<execution>``
                            `````<id>`````attach-sources`````</id>`````
                            ``<goals>``
                                ``<goal>``jar-no-fork``</goal>``
                            ``</goals>``
                        ``</execution>``
                    ``</executions>``
                ```````</plugin>```````
                ```````<plugin>```````
                    ```<inherited>```true```</inherited>```
                    ````````<artifactId>````````maven-javadoc-plugin````````</artifactId>````````
                    ``<executions>``
                        ``<execution>``
                            `````<id>`````attach-javadocs`````</id>`````
                            ``<goals>``
                                ``<goal>``jar``</goal>``
                            ``</goals>``
                        ``</execution>``
                    ``</executions>``
                ```````</plugin>```````
                ```````<plugin>```````
                    ```<inherited>```true```</inherited>```
                    ````````<artifactId>````````maven-deploy-plugin````````</artifactId>````````
                    `<configuration>`
                        `<updateReleaseInfo>`true`</updateReleaseInfo>`
                    `</configuration>`
                ```````</plugin>```````
            ``</plugins>``
        ``</build>``
    `</profile>`
`</profiles>`
```

## 4. 最简POM

最简POM是你在Maven项目中声明的POM。为了声明一个POM，你需要至少指定以下四个元素：modelVersion、groupId、artifactId和version。最简POM将继承超POM中的所有配置。

让我们看看Maven项目所需的最小元素：

```xml
`<project>`
    `<modelVersion>`4.0.0`</modelVersion>`
    `<groupId>`com.baeldung`</groupId>`
    ````````<artifactId>````````maven-pom-types````````</artifactId>````````
    ``````<version>``````1.0-SNAPSHOT`````</version>`````
`</project>`
```

Maven中POM层次结构的一个主要优点是，我们可以扩展并覆盖从顶部继承的配置。因此，要覆盖POM层次结构中给定元素或构件的配置，Maven应该能够唯一地识别相应的构件。

## 5. 有效POM

有效POM结合了超POM文件中的所有默认设置和我们应用POM中定义的配置。当应用pom.xml中的配置元素没有被覆盖时，Maven使用默认值。因此，如果我们采用最简POM部分中的相同示例POM文件，我们将看到有效POM文件将是最简单的和超POM的合并。我们可以从命令行中看到它：

```shell
mvn help:effective-pom
```

这也是查看Maven使用默认值的最佳方式。

## 6. 结论

在这篇简短的教程中，我们讨论了Maven中项目对象模型的区别。

和往常一样，本教程中展示的示例可以在GitHub上找到。

OK