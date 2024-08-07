---
date: 2024-07-19
category:
  - Gradle
  - Build Cache
tag:
  - Gradle
  - Build Cache
  - 构建优化
head:
  - - meta
    - name: keywords
      content: Gradle构建缓存,构建性能,持续集成
------
# Gradle构建缓存基础

构建缓存可以使代码构建过程更快，并因此提高开发人员的生产力。在本文中，我们将学习Gradle构建缓存的基础知识。

## 1. 概述

## 2. Gradle构建缓存是什么？

Gradle构建缓存是一种半永久性存储，它保存构建任务的输出。它允许从先前的构建中重用已经生成的工件。Gradle构建缓存的指导原则是，只要输入没有改变，就应避免重新构建已经构建的任务。通过这种方式，可以减少完成后续构建所需的时间。

在Gradle中，构建缓存键通过哈希每个任务的输入来唯一标识一个工件或任务输出。在执行任务之前，Gradle计算缓存键，然后查看远程或本地缓存，检查是否已经存在与计算出的缓存键对应的任务输出。如果不存在，则执行任务。否则，Gradle重用现有的任务输出。

现在，让我们看看两种不同的Gradle构建缓存。

### 2.1. 本地构建缓存

本地构建缓存使用系统目录来存储任务输出。默认位置是指向`$USER_HOME/.gradle/caches`的Gradle用户主目录。每次我们在系统中运行构建时，工件都会存储在这里。它默认启用，其位置是可配置的。

### 2.2. 远程构建缓存

远程缓存是一个共享的构建缓存。通过HTTP读取和写入远程缓存。远程缓存最常见的用例是持续集成构建。在每次干净的构建中，CI服务器都会填充远程缓存。因此，不会重新构建更改的组件，从而加快CI构建的速度。此外，任务输出也可以在CI代理之间共享。**远程缓存默认情况下不启用。**

当同时启用远程和本地缓存时，首先在本地缓存中检查构建输出。如果本地缓存中没有输出，它将从远程缓存下载并存储在本地缓存中。然后，在下一次构建中，相同的任务输出将从本地缓存中获取，以加速构建过程。

## 3. 配置Gradle构建缓存

我们可以通过在`settings.gradle`文件中提供`Settings.build-cache`块来配置缓存。在这里，我们使用Groovy闭包编写配置。让我们看看如何配置不同类型的缓存。

### 3.1. 配置本地构建缓存

让我们在`settings.gradle`文件中添加本地构建缓存配置：

```
buildCache {
    local {
        directory = new File(rootDir, 'build-cache')
        removeUnusedEntriesAfterDays = 30
    }
}
```

在上面的代码块中，`directory`对象表示存储构建输出的位置。这里，`rootDir`变量表示项目的根目录。我们也可以更改`directory`对象以指向另一个位置。

**为了节省空间，本地构建缓存还会定期删除一段时间内未使用的条目。** `removeUnusedEntriesAfterDays`属性用于配置未使用的工件将从本地缓存中删除的天数。默认值为七天。

**我们也可以手动清理它，通过从`$USER_HOME/.gradle/caches`文件夹中删除条目。** 在Linux系统上，我们可以使用`rm`命令来清理目录：

```
rm -r $HOME/.gradle/caches
```

我们还可以配置一些其他属性。例如，`enabled`是一个布尔属性，表示本地缓存是否启用。如果将`_push_`属性设置为`true`，则会在缓存中存储构建输出。本地构建缓存的默认值为`true`。

### 3.2. 配置远程缓存

让我们在`settings.gradle`文件中添加`buildCache`块以配置远程缓存。

对于远程缓存，我们需要以URL的形式提供位置以及访问它的`username`和`password`：

```
buildCache {
    remote(HttpBuildCache) {
        url = 'https://example.com:8123/cache/'
        credentials {
            username = 'build-cache-user-name'
            password = 'build-cache-password'
        }
    }
}
```

## 4. 使用Gradle构建缓存的优势

现在让我们来看看使用Gradle构建缓存的一些好处：

- 它可以通过减少构建时间来提高开发人员的生产力。
- 因为如果输入没有变化，任务输出会被重用，所以它也可以在切换版本控制分支时减少构建时间。
- 使用远程缓存可以显著减少CI代理需要完成构建的工作量。这也减少了CI构建所需的基础设施。
- 减少了CI机器上的网络使用，因为来自远程缓存的结果将存储在本地缓存中。
- 远程缓存可以帮助在开发人员之间共享结果。这消除了重新构建其他在同一项目上工作的开发者本地所做的更改的需要。
- 远程缓存还可以实现在CI代理之间共享构建。
- 由于构建时间的减少，这将导致更快的反馈周期。因此，构建会更频繁地生成。因此，这可能会提高软件的质量。

## 5. 结论

在本文中，我们学习了Gradle构建缓存及其如何加速构建过程。我们还探讨了它的不同类型及其配置。最后，我们讨论了Gradle构建缓存的好处。