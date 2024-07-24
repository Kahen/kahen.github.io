---
date: 2021-11-01
category:
  - Development
  - Tools
tag:
  - Eclipse
  - Maven
head:
  - - meta
    - name: keywords
      content: Maven, Eclipse, Import, Tutorial, m2e
---

# 将现有Maven项目导入Eclipse

## 1. 概述

在本教程中，我们将看到如何将现有的Maven项目导入Eclipse。为此，我们可以使用Eclipse的Maven插件或Apache Maven Eclipse插件。

## 2. Eclipse和Maven项目设置

以我们的例子为例，我们将使用来自我们GitHub仓库的多模块Maven项目。一旦我们克隆了仓库或下载了项目，我们的多模块Maven项目的目录根应该看起来像这样：

```
|-multimodulemavenproject
    |--daomodule
    |--entitymodule
    |--mainappmodule
    |--userdaomodule
    |--pom.xml
    |--README.md
```

### 2.2. Maven项目的小改动

我们的多模块Maven项目本身是一个子项目。因此，为了限制我们练习的范围，我们需要在_multimodulemavenproject_目录中的_pom.xml_中做一些小改动，这将是我们的项目根。这里，让我们**删除引用_multimodulemavenproject_的父级**的行：

```
`<parent>`
    `<groupId>`com.baeldung`</groupId>`
    `<artifactId>`parent-modules`</artifactId>`
    `<version>`1.0.0-SNAPSHOT`</version>`
    `<relativePath>`../../`</relativePath>`
`</parent>`
```

删除这些行后，我们就可以准备将Maven项目导入Eclipse了。

## 3. 使用_m2e_ Eclipse插件导入

让我们使用Eclipse菜单路径_File::Import::Maven::Existing Maven Projects_来导入Maven项目。我们可以先点击_File_菜单下的_Import_选项：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/import-1.png)

然后，让我们展开_Maven_文件夹，选择_Existing Maven Projects_，然后点击_Next_按钮：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/import2-1.png)

最后，让我们提供我们Maven项目的根目录路径，然后点击_Finish_按钮：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/import3-1.png)

完成这一步后，我们应该能够在Eclipse中看到_Package Explorer_视图：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/package_view.png)

这个视图可能有点令人困惑，因为我们看到的是所有模块分开显示，而不是以层次结构显示。这是由于Eclipse的默认视图_Package Explorer_。然而，我们可以很容易地将视图切换到_Project Explorer_，并以树状结构查看多模块项目：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/project_explorer.png)

由于Eclipse的Maven插件m2e，我们能够顺利导入Maven项目。我们没有必要单独添加它到我们的Eclipse中，因为它**内置****于Eclipse安装**中，并且可以通过路径_Help::About Eclipse IDE::Installation Details::Installed Software_查看：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/m2e_plugin.png)

如果我们有一个较旧版本的Eclipse，它没有内置的_m2e_插件，我们总是可以通过Eclipse Marketplace添加这个插件。

## 4. Apache Maven Eclipse插件

Apache Maven Eclipse插件也可以用来生成Eclipse IDE文件（*. _classpath_, *. _project_, *. _wtpmodules_, 和 . _settings_ 文件夹）以用于项目。然而，这个**插件现在被Maven退役了**，并且**推荐使用Eclipse的_m2e_插件**。更多细节可以在Apache Maven插件页面找到。

## 5. 结论

在本教程中，我们学习了将现有Maven项目导入Eclipse的两种方式。由于Apache Maven Eclipse插件现在已经退役，**我们应该使用Eclipse的Maven插件，_m2e_**，它在最新版本的Eclipse中内置。

本教程中展示的所有代码示例都可以在GitHub上找到。