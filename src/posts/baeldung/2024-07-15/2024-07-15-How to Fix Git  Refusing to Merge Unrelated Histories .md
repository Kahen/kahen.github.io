---
date: 2024-07-15
category:
  - DevOps
  - Git
tag:
  - Git
  - Merge
  - Error
head:
  - - meta
    - name: keywords
      content: Git, Merge, Unrelated Histories, Error, Fix, Tutorial
---
# 如何修复 Git “拒绝合并不相关的历史”错误 | Baeldung 运维教程

如果你在 DevOps 生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的 **贡献指南**。

## 1. 概述

在 Git 中，有时会遇到分支没有共同的历史基础的情况。因此，如果我们尝试合并它们，我们会得到 _“拒绝合并不相关的历史”_ 错误。在本教程中，我们将讨论如何修复这个错误以及如何在未来的项目中避免这个错误。

让我们看看分支具有不相关历史的情况。 **具有不相关历史基础的最常见原因是彼此独立地开始分支。** 例如，如果我们在本地机器上启动一个新的 Git 项目，然后将其连接到远程 GitHub 分支，这些分支将具有不同的历史基础。

唯一的例外是其中一个分支没有任何提交。在这种情况下，它们应该没有问题地合并。否则，我们会像以下示例一样得到 _“拒绝合并不相关的历史”_：

```
$ git pull origin main
...
fatal: refusing to merge unrelated histories
```

正如我们所看到的，我们不能使用 _git pull_ 命令来合并具有不常见历史的分支。

## 3. 如何修复错误

要修复上述错误，我们需要在 _git pull ``<remote>`` ``<branch>``_ 命令后使用 _–allow-unrelated-histories_ 选项，其中

- _``<remote>``_ 是远程仓库 URL 或其简称 _origin_
- _``<branch>``_ 是我们想要合并的分支名称

例如：

```
$ git pull origin main --allow-unrelated-histories
```

_–allow-unrelated-histories_ 选项将告诉 Git 我们允许合并没有共同历史基础的分支，然后应该能够无误地完成合并。 **我们应该注意，对于 Git 版本 2.9 或更旧的版本，这个选项是不必要的，我们的合并应该可以在没有它的情况下工作。** 要检查 Git 版本，我们可以使用 _git –version_ 命令。

## 4. 如何在未来避免错误

通常，独立于远程仓库创建本地仓库分支并不是最佳实践。更可靠的方法是使用 _git clone_ 命令将远程仓库下载到本地机器，如下所示：

```
$ git clone `<repo_url>`
```

这样，我们从远程服务器复制仓库，远程和本地分支的提交历史基础保持相同。

## 5. 结论

在本教程中，我们讨论了当 Git 拒绝合并不相关的历史时如何合并分支。我们首先查看了何时可能发生此错误。然后，我们使用 _–allow-unrelated-histories_ 选项来修复它。最后，我们学习了如何在未来的项目中避免这个错误。