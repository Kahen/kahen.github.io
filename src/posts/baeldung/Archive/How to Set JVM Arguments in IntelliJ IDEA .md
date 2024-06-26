---
date: 2024-06-15
category:
  - Software Development
tag:
  - IntelliJ IDEA
  - JVM
---
# 如何在IntelliJ IDEA中设置JVM参数 | Baeldung

IntelliJ IDEA是开发各种编程语言软件中最受欢迎和功能强大的IDE之一。

在本教程中，**我们将学习如何在IntelliJ IDEA中配置JVM参数**，允许我们为开发和调试调整JVM。

## 2. JVM参数基础

我们可以根据应用程序的特定需求选择JVM参数。**正确的JVM参数可以** **提高应用程序的性能和稳定性**，并使调试应用程序更加容易。

### 2.1. JVM参数类型

有几种类别的JVM参数：

- **内存分配** - 例如 _-Xms_（初始堆大小）或 _-Xmx_（最大堆大小）
- **垃圾回收** - 例如 _-XX:+UseConcMarkSweepGC_（启用并发标记-清除垃圾回收器）或 _-XX:+UseParallelGC_（启用并行垃圾回收器）
- **调试** - 例如 _-XX:+HeapDumpOnOutOfMemoryError_（当发生OutOfMemoryError时进行堆转储）或 _-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005_ 用于通过JDWP在5005端口进行远程调试。
- **系统属性** - 例如 _-Djava.version_（Java版本）或 _-Dcustom.property=value_（定义自定义属性及其值）。

### 2.2. 使用JVM参数的时机

**设置特定JVM参数的决定取决于几个因素**，包括应用程序的复杂性和其性能要求。

虽然设置JVM参数有时是技术需要，它也可能是团队工作流程的一部分。例如，团队可能有设置JVM参数以启用分析以识别性能瓶颈的政策。

**使用常用的JVM参数可以增强我们的应用程序的性能和功能。**

在我们深入设置IDE中JVM参数的步骤之前，让我们首先了解为什么它可能是有益的。

### 3.1. IntelliJ IDEA中JVM参数的重要性

IntelliJ IDEA提供了一个用户友好的界面，用于配置当IDE运行我们的JVM时的JVM参数。这比手动在命令行运行 _java_ 更容易。

设置JVM参数的替代方法受益于环境独立性，因为在IntelliJ IDEA中进行的配置是特定于IDE的。

### 3.2. 使用运行/调试配置设置JVM参数

让我们启动IntelliJ IDEA并打开一个现有项目或我们将为其配置JVM参数的新项目。我们继续点击 _“运行”_ 并选择 _“编辑配置…”_。

从那里，我们可以通过点击加号符号并选择 _“应用程序”_ 为我们的应用程序创建一个运行/调试配置：

我们将通过选择 _“修改选项”_ 下拉菜单中的 _“添加VM选项”_ 来添加添加JVM参数的文本字段，并在新添加的文本字段中添加所有必需的JVM参数。

有了所需的配置，我们就可以使用配置的JVM参数运行或调试我们的应用程序。

## 4. 使用VM选项文件设置JVM参数

**在IntelliJ IDEA中使用自定义JVM参数的文件对于管理复杂或广泛的配置非常方便**，提供了更有组织和可管理的方法。

让我们打开一个文本编辑器，添加所有必需的JVM参数，并以有意义的名称和 _.vmoptions_ 扩展名保存文件：

例如，我们可能会将其命名为 _custom_jvm_args.vmoptions_。

按照上一节中 _“运行/调试配置”_ 的步骤，让我们添加JVM参数的文本字段。

现在，我们将添加我们自定义文件的路径，而不是单独的JVM参数，使用以下格式：_@path/to/our/custom_jvm_args.vmoptions_:

## 5. 管理IntelliJ IDEA JVM参数

**对于常规开发，配置IntelliJ IDEA的JVM参数并不典型**，但在某些场景中我们需要调整它们。

我们可能正在处理一个异常大的项目或复杂的代码库，这将需要IDE以比默认设置更多的内存运行。或者，我们可能使用特定的外部工具或集成到IntelliJ IDEA的插件，这些工具或插件需要特定的JVM参数才能正确运行。

**默认配置位于IDE的安装目录中。** 但是，不建议更改它，因为它在我们升级IDE时会被覆盖。

相反，让我们通过导航到 _“帮助”_ 然后 _“编辑自定义VM选项…”_ 来编辑默认配置的副本，该副本将覆盖默认配置：

在这里，我们可以设置所需的JVM参数。

## 6. 结论

在本文中，我们探讨了为我们的应用程序在IntelliJ IDEA中设置JVM参数。我们讨论了在开发期间设置JVM参数的重要性。

此外，我们还简要讨论了为IDE配置JVM参数以及可能需要它的场景。

我们还学习了JVM参数的基础知识，包括不同类型的参数及其正确用法。