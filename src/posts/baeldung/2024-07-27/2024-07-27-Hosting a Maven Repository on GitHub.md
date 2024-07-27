---
date: 2021-08-01
category:
  - Maven
  - GitHub
tag:
  - Maven Repository
  - GitHub Pages
head:
  - - meta
    - name: keywords
      content: Maven, GitHub, Repository, Hosting, Tutorial
---
# 在GitHub上托管Maven仓库

## 1. 概述

在本教程中，我们将了解如何使用_site-maven插件_在GitHub上托管一个带有源代码的Maven仓库。这是一种使用Nexus等仓库的可负担得起的替代方案。

## 2. 前提条件

如果我们还没有一个Maven项目的GitHub仓库，我们需要创建一个。在本文中，我们使用一个名为“_host-maven-repo-example_”的仓库，以及“main”分支。这是一个GitHub上的空仓库：

## 3. Maven项目

让我们创建一个简单的Maven项目。我们将把这个项目的生成的构件推送到GitHub。

这是项目的_pom.xml_：

首先，我们需要**在项目中创建一个本地仓库**。Maven构件将在推送到GitHub之前被部署到项目构建目录中的这个位置。

我们将在_pom.xml_中添加本地仓库的定义：

现在，让我们**添加_maven-deploy-plugin_配置**到我们的_pom.xml_。我们将使用这个插件将我们的构件添加到目录_${project.build.directory}/mvn-artifact_中的本地仓库：

此外，**如果我们想将源文件与Maven构件一起推送到GitHub，那么我们也需要包含源插件**：

一旦上述配置和插件被添加到_pom.xml_，构建**将在目录_target/mvn-artifact_中本地部署Maven构件**。

现在，**下一步是从本地目录将这些构件部署到GitHub**。

## 4. 配置GitHub认证

在将构部署到GitHub之前，我们将在_~/.m2/settings.xml_中配置认证信息。这是为了使_site-maven-plugin_能够将构件推送到GitHub。

根据我们想要的认证方式，我们将在我们的_settings.xml_中添加以下两种配置之一。让我们接下来查看这些选项。

### 4.1. 使用GitHub用户名和密码

要使用GitHub用户名和密码，我们将在_settings.xml_中配置它们：

### 4.2. 使用个人访问令牌

**推荐使用GitHub API或命令行进行认证的方式是使用个人访问令牌(PAT)**：

## 5. 使用_site-maven-plugin_将构件推送到GitHub

最后一步是**配置_site-maven插件_以推送我们的本地暂存仓库**。这个暂存仓库位于_target_目录：

现在，我们将**执行_mvn deploy_命令将构件上传到GitHub**。如果不存在，_main_分支将自动创建。构建成功后，在浏览器中检查GitHub上的仓库，并在_main_分支下。我们的所有二进制文件都将存在于仓库中。

在我们的例子中，它将看起来像这样：

## 6. 结论

最后，我们已经看到了如何使用_site-maven-plugin_在GitHub上托管Maven构件。

如往常一样，这些例子的代码可以在GitHub上找到。