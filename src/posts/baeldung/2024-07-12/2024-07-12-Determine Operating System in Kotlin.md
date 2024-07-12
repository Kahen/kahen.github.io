---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Operating System
  - SystemUtils
head:
  - - meta
    - name: keywords
      content: Kotlin, Operating System, SystemUtils, JVM, OS detection
------
# Kotlin中确定操作系统

## 1. 概述

了解操作系统（OS）对于实现特定于操作系统的行为至关重要。

在本教程中，我们将探讨Kotlin中检测当前操作系统的方法。

## 2. 使用_System.getProperty()_函数

当我们在JVM上运行Kotlin程序时，它从Java继承了强大的_System_类。这个类是我们访问与系统相关的信息的门户。具体来说，我们可以使用_System.getProperty()_方法来提取JVM正在运行的操作系统的详细信息。

**_os.name_属性指示操作系统名称**，而**_os.version_保留操作系统版本信息**。

让我们通过读取这两个属性来创建一个测试函数：

```kotlin
val osName = System.getProperty("os.name")
val osVersion = System.getProperty("os.version")
assertTrue { osName.isNotBlank() }
assertTrue { osVersion.isNotBlank() }

log.info(
    """
    |
    |OS 信息
    |-----------------
    |操作系统名称: $osName
    |版本: $osVersion
    """.trimMargin())
```

接下来，我们将在两个系统上测试这个函数，以验证其操作系统报告的准确性。

我们的第一个测试目标是Arch Linux系统。在我们开始测试函数之前，让我们使用_uname_命令**检查其内核信息**：

```shell
$ uname -sr
Linux 6.1.35-1-lts
```

现在，如果我们运行测试函数，它将通过并产生以下输出：

```
OS 信息
-----------------
操作系统名称: Linux
版本: 6.1.35-1-lts
```

正如我们所看到的，我们的函数正确地报告了操作系统信息。

接下来，让我们转到运行以下系统的MacBook：

```shell
$ sw_vers
ProductName:            macOS
ProductVersion:         14.2.1
...
```

如果我们执行我们的函数，它将再次产生预期的操作系统数据：

```
操作系统名称: Mac OS X
版本: 14.2.1
```

因此，我们可以通过读取_os.name_和_os.version_属性来获取操作系统信息。

在实践中，我们通常通过检查_os.name_属性是否包含特定的关键字来**确定操作系统**。例如，我们可以使用Kotlin的_when_块来实现这一点：

```kotlin
val osName = System.getProperty("os.name").lowercase()
assertTrue { osName.isNotBlank() }

val result = when {
    "windows" in osName -> "Windows"
    listOf("mac", "nix", "sunos", "solaris", "bsd").any { it in osName } -> "*nix"
    else -> "Other"
}

log.info("$osName -> $result")
```

让我们在Linux和Mac系统上运行这个。

在Linux上我们可以看到：

```
linux -> *nix
```

在MacBook上我们可以看到：

```
mac os x -> *nix
```

代码示例很直接。然而，值得注意的是，为了全面覆盖*nix系统，我们必须手动填写列表中的系统名称，这是容易出错的。在这个例子中，AIX（"aix"）、HP-UX（"hp-ux"）和Irix（"irix"）没有包含在列表中。

此外，我们可能需要确定操作系统版本，例如，区分Windows 2000、Windows Vista和Windows 10。这通常**涉及多个字符串匹配检查，容易出错**。

因此，一些库提供了方便的实用类来检索操作系统信息。

接下来，让我们看一个例子。

## 3. 使用Apache Commons Lang 3中的_SystemUtils_

Apache Commons Lang 3是一个广泛使用的库。它的_SystemUtils_类作为一个中心枢纽，方便地检索各种操作系统信息和环境数据。**_SystemUtils_类在内部也读取系统属性，如_os.name_和_os.version_，以收集操作系统数据**。

让我们使用它来检查我们正在运行的操作系统家族：

```kotlin
val osName = SystemUtils.OS_NAME
val osVersion = SystemUtils.OS_VERSION
assertTrue { osName.isNotBlank() }
assertTrue { osVersion.isNotBlank() }

log.info(
    """
    |
    |OS 信息
    |-----------------
    |操作系统名称: $osName
    |版本: $osVersion
    |是Windows: ${SystemUtils.IS_OS_WINDOWS}
    |是*nix: ${SystemUtils.IS_OS_UNIX}
    |是Mac OS: ${SystemUtils.IS_OS_MAC}
    """.trimMargin())
```

正如上面的代码所示，我们可以直接访问_SystemUtils_中预定义的静态属性来获取所需的操作系统信息。例如，_IS_OS_UNIX_告诉我们系统是否是*nix，并且**它涵盖了我们之前提到的所有*nix系统**。_IS_OS_MAC_报告系统是否是macOS。同样，我们可以通过检查_IS_OS_WINDOWS_2000, IS_OS_WINDOWS_VISTA, IS_OS_WINDOWS_10_等来检查Windows版本。

在Linux系统和MacBook上执行这个测试函数后，我们可以看到_SystemUtils_产生了准确的结果。

这是我们在Linux上得到的结果：

```
OS 信息
-----------------
操作系统名称: Linux
版本: 6.1.35-1-lts
是Windows: false
是*nix: true
是Mac OS: false
```

以下是在MacBook上的结果：

```
OS 信息
-----------------
操作系统名称: Mac OS X
版本: 14.2.1
是Windows: false
是*nix: true
是Mac OS: true
```

## 4. 结论

在本文中，我们探讨了两种获取操作系统数据的方法：

- 读取_os.name_和_os.version_系统属性
- 使用Apache Commons Lang 3中的_SystemUtils_

如常，示例的完整源代码可在GitHub上获取。