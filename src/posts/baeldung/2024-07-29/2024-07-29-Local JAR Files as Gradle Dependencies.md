---
date: 2021-06-01
category:
  - Gradle
  - Dependencies
tag:
  - JAR Files
  - Local Dependencies
head:
  - - meta
    - name: keywords
      content: Gradle, JAR Files, Dependencies, Local JAR
---
# Gradle中添加本地JAR文件作为依赖

在本教程中，我们将重点介绍如何将本地JAR文件添加到我们的Gradle依赖中。

## 2. 本地JAR文件
在我们开始解释将本地JAR文件添加到Gradle之前，有必要提及，不推荐手动添加那些在公共仓库中可用的依赖。构建系统如Gradle存在的一个重要原因就是自动处理这类事情。在Gradle之前，我们通常需要下载JAR文件并将其放在_libs_文件夹中。现在，Gradle为我们自动处理了这些。

然而，对于特殊目的，如自定义JAR文件，Gradle仍然支持这一过程。

## 3. 平铺目录
如果我们想使用一个平铺的文件系统目录作为我们的仓库，我们需要在我们的_build.gradle_文件中添加以下内容：

```
repositories {
    flatDir {
        dirs 'lib1', 'lib2'
    }
}
```

这使得Gradle在_lib1_和_lib2_中查找依赖。一旦我们设置了平铺目录，我们就可以从_lib1_或_lib2_文件夹中使用我们的本地JAR文件：

```
dependencies { implementation name: 'sample-jar-0.8.7' }
```

## 4. 文件集合
平铺目录的一个替代方法是直接指定文件，而不是使用_flatdir:_

```
implementation files('libs/a.jar', 'libs/b.jar')
```

## 5. 文件树
我们可以告诉Gradle在某个目录中查找所有JAR文件，而不必指定名称。这在某些情况下很有用，比如我们不能或不想将某些文件放在仓库中。但我们必须小心，因为这可能会添加不想要的依赖：

```
implementation fileTree(dir: 'libs', include: '*.jar')
```

## 6. 使用IntelliJ
还有另一种使用本地jar文件的方法。首先，我们进入_Project Structure_：

然后我们点击列表顶部的加号按钮并选择Java：

然后一个对话框会要求我们定位JAR文件。选择后，我们可以点击OK，我们的项目就可以访问存档中的方法和类。

## 7. 结论
在本文中，我们查看了在Gradle项目中使用不在标准仓库中托管的JAR文件的各种方法。