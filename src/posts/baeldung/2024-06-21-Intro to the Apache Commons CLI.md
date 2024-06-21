---
date: 2024-06-21
category:
  - Java Libraries
  - Apache Commons
tag:
  - Apache Commons CLI
  - CLI Development
head:
  - - meta
    - name: keywords
      content: Java, Apache Commons CLI, Command Line Interface, Tutorial
---

# Apache Commons CLI 入门指南

在这个教程中，我们将探索 Java Apache Commons CLI 库。它是一个框架，通过帮助开发者以一种高效和标准化的方式构建现有软件工具的命令行界面（CLI），赋予了开发者能力。

**该库可以通过支持定义 CLI 选项和基本验证来加速 CLI 的开发。** 它帮助解析命令行参数及其值。最后，参数值可以传递给实现工具的底层服务。

**值得注意的是，Apache Commons CLI 库也在 Apache 的多个产品中使用，包括 Kafka、Maven、Ant 和 Tomcat。**

我们将讨论 Apache Commons CLI 中的一些重要类，然后使用它们在示例程序中展示其功能。

## 2. CLI 的关键关注点

CLI 通过帮助自动化与其领域相关的一系列任务，为工具提供了优势。此外，在当今世界，DevOps 工程师无法想象没有 CLI 的工作。

除了工具的底层实现挑战外，所有 CLI 都需要处理一些基本要求：

- 解析命令行参数，提取参数值，并将它们传递给底层服务
- 以一定格式显示帮助信息
- 显示版本
- 处理缺少必需选项的情况
- 处理未知选项
- 处理互斥选项

## 3. 重要类

让我们看看 Apache Commons CLI 库中的重要类：

**类 _Option_、_OptionGroup_ 和 _Options_ 有助于定义 CLI。** 所有 CLI 选项的定义都封装在 _Options_ 类中。_CommandLineParser_ 类的 _parse()_ 方法使用 _Options_ 类来解析命令行。如果有任何偏差，_parse()_ 方法会抛出适当的异常。解析后，可以进一步探测 _CommandLine_ 类以提取 CLI 选项的值（如果有）。

最后，提取的值可以传递给实现 CLI 工具的底层服务。

**类似于 _CommandLineParser_ 类中的 _parse()_ 方法，_HelpFormatter_ 也使用 _Options_ 类来显示 CLI 工具的帮助文本。**

## 4. 实现

让我们更深入地了解 Apache Commons CLI 库的类，并了解它们如何帮助一致且快速地创建 CLI 工具。

### 4.1. 先决条件 Maven 依赖性

首先，让我们在 _pom.xml_ 文件中添加必要的 Maven 依赖性：

```xml
`<dependency>`
    `<groupId>`commons-cli`</groupId>`
    `<artifactId>`commons-cli`</artifactId>`
    `<version>`1.6.0`</version>`
`</dependency>`
```

### 4.2. 定义、解析和探测命令行参数

考虑使用其 _psql_ CLI 连接到 PostgreSQL 数据库的命令：

```shell
psql -h PGSERVER -U postgres -d empDB
```

或者：

```shell
psql --host PGSERVER --username postgres --dbName empDB
```

两个命令都需要输入数据库服务器主机、用户名和数据库名称的参数。第一个命令使用短选项名称，而第二个使用长选项名称。_username_ 和 _dbName_ 是必需的选项，而 _host_ 是可选的。如果缺少主机，则默认将 localhost 视为主机值。

现在，让我们定义、解析和探测命令行参数：

```java
@Test
void whenCliOptionProvided_thenParseAndExtractOptionAndArgumentValues() throws ParseException {
    Options options = new Options();

    // 定义选项...
    // 解析命令并处理...
}
```

要定义命令中的选项，我们通过调用方法 _createOption()_ 创建了与每个输入选项相对应的 _Option_ 对象：

```java
Option createOption(String shortName, String longName, String argName, String description, boolean required) {
    return Option.builder(shortName)
      .longOpt(longName)
      .argName(argName)
      .desc(description)
      .hasArg()
      .required(required)
      .build();
}
```

**我们使用 _Option.Builder_ 类来设置 CLI 中输入选项的短名称、长名称、参数名称和描述。** 此外，我们使用构建器类中的 _required()_ 方法将前面定义的 _-U_ 和 _-d_ 选项视为强制选项。

最后，我们分别将短名称选项和长名称选项的参数传递给方法 _parseThenProcessCommand()_：

```java
void parseThenProcessCommand(Options options, String[] commandArgs, String hostOption,
    String usernameOption, String dbNameOption) throws ParseException {
    // 解析命令行并处理...
}
```

有趣的是，该方法可以处理使用短名称和长名称选项的命令。**_CommandLineParser_ 类解析参数，然后我们通过调用 _CommandLine_ 对象的 _getOptionValue()_ 方法来检索它们的值。** 由于 _host_ 是可选的，我们调用 _CommandLine_ 类中的 _hasOption()_ 方法来探测它是否存在。如果不存在，我们将其值替换为默认的 _localhost_。

最后，我们通过调用方法 _createConnection()_ 将值传递给底层服务。

### 4.3. 处理缺少的必选选项

在大多数 CLI 中，当缺少必选选项时，应该显示错误。假设在 _psql_ 命令中缺少必选的 _host_ 选项：

```shell
psql -h PGSERVER -U postgres
```

让我们看看如何处理这个：

```java
@Test
void whenMandatoryOptionMissing_thenThrowMissingOptionException() {
    // 定义选项...
    // 解析命令并处理异常...
}
```

**当我们在 _CommandLineParser_ 类中调用 _parse()_ 方法时，它会抛出 _MissingOptionException_ 表示缺少所需的选项 _d_**。随后，我们调用一个方法 _handleException()_ 来管理异常。

假设选项 _-d_ 存在，但其参数缺失：

```shell
psql -h PGSERVER -U postgres -d
```

现在，让我们看看如何处理这个：

```java
@Test
void whenOptionArgumentIsMissing_thenThrowMissingArgumentException() {
    // 定义选项...
    // 解析命令并处理异常...
}
```

当 _parse()_ 方法在 _CommandLineParser_ 上被调用时，由于 _-d_ 选项旁边缺少参数，会抛出 _MissingArgumentException_。进一步，我们调用 _handleException()_ 来管理异常。

### 4.4. 处理无法识别的选项

有时，在运行命令时，我们会提供无法识别的选项：

```shell
psql -h PGSERVER -U postgres -d empDB -y
```

我们提供了一个不正确的不存在的 _-y_ 选项。让我们看看如何在代码中处理它：

```java
@Test
void whenUnrecognizedOptionProvided_thenThrowUnrecognizedOptionException() {
    // 定义选项...
    // 解析命令并处理异常...
}
```

**当它遇到未知的 _-y_ 选项时，_parse()_ 方法会抛出 _UnrecognizedOptionException_。** 之后，我们调用 _handleException()_ 来管理运行时异常。

### 4.5. 处理互斥选项

考虑使用 Unix 平台上的 _cp_ 命令复制文件的命令：

```shell
cp -i -f file1 file2
```

_i_ 选项在覆盖文件之前提示用户；然而，_f_ 选项在不提示的情况下覆盖文件。这两个选项是冲突的，因此不应该一起使用。

让我们尝试实现这个验证：

```java
@Test
void whenMutuallyExclusiveOptionsProvidedTogether_thenThrowAlreadySelectedException() {
    // 定义互斥选项并处理异常...
}
```

首先，我们使用其构造函数而不是 _Option.Builder_ 类创建了相关的 _Option_ 对象。这是实例化 _Option_ 类的另一种方式。

**_OptionGroup_ 类有助于将互斥选项分组。** 因此，我们将这两个选项添加到 _OptionGroup_ 对象中。然后，我们将 _OptionGroup_ 对象添加到 _Options_ 对象中。最后，当我们在 _CommandLineParser_ 类上调用 _parse()_ 方法时，它引发了 _AlreadySelectedException_，表明选项存在冲突。

### 4.6. 显示帮助文本

格式化帮助文本并在终端上显示是所有 CLI 工具的共同关注点。因此，Apache Commons CLI 也通过 _HelpFormatter_ 类来解决这个问题。

让我们以 _psql_ CLI 为例：

```java
@Test
void whenNeedHelp_thenPrintHelp() {
    // 打印帮助文本...
}
```

**类 _HelpFormatter_ 中的 _printHelp()_ 方法使用包含 CLI 定义的 _Options_ 对象来显示帮助文本**。该方法的第一个参数在顶部生成 CLI 的使用文本。

让我们看看 _HelpFormatter_ 类生成的输出：

```
usage: psql -U username -h host -d empDB
 -?,--help                  显示帮助信息
 -d,--dbName `<DBNAME>`       要连接的数据库名称
 -h,--host `<HOST>`           数据库服务器主机
 -U,--username `<USERNAME>`   数据库用户名
```

## 5. 结论

在本文中，我们讨论了 Apache Commons CLIlibrary 的能力，帮助以标准化的方式快速高效地创建 CLI。此外，该库简洁易懂。

值得注意的是，还有其他库如 JCommander、Airline 和 Picocli，它们同样高效，值得探索。与 Apache Commons CLI 不同的是，它们都支持注解。

像往常一样，使用的代码可以在 GitHub 上找到。

OK