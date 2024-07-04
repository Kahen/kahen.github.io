---
date: 2023-06-01
category:
  - Software Engineering
tag:
  - Code Quality
  - Refactoring
head:
  - - meta
    - name: keywords
      content: cognitive complexity, cyclomatic complexity, code maintainability, refactoring techniques
---
# 认知复杂度及其对代码的影响

## 1. 概述

在本教程中，我们将学习什么是认知复杂度以及如何计算这一度量。我们将逐步了解增加函数认知复杂度的不同模式和结构。包括循环、条件语句、跳转标签、递归、嵌套等元素。接下来，我们将讨论认知复杂度对代码可维护性的有害影响。最后，我们将探索一些重构技术，这些技术可以帮助我们减少这些负面影响。

## 2. 圈复杂度与认知复杂度

有一段时间，圈复杂度是衡量代码复杂度的唯一方式。因此，出现了一个新的度量标准，它允许我们更准确地衡量代码片段的复杂度。虽然它提供了一个不错的整体评估，但它确实忽略了一些使代码更难理解的重要方面。

### 2.1. 圈复杂度

圈复杂度是最早允许衡量代码复杂度的度量标准之一。它由Thomas J. McCabe在1976年提出，定义函数的圈复杂度为**相应代码段内所有独立路径的数量**。

例如，一个创建五个不同分支的switch语句将导致圈复杂度为五：

```java
public String tennisScore(int pointsWon) {
    switch (pointsWon) {
        case 0: return "Love"; // +1
        case 1: return "Fifteen"; // +1
        case 2: return "Thirty"; // +1
        case 3: return "Forty"; // +1
        default: throw new IllegalArgumentException(); // +1
    }
} // 圈复杂度 = 5
```

虽然我们可以使用这个度量来量化我们代码中不同路径的数量，但我们**不能精确地比较不同函数的复杂度**。它忽略了多个嵌套级别、像break或continue这样的跳转标签、递归、复杂的布尔运算和其他未能适当惩罚的因素。

结果，我们将得到客观上更难理解和维护的函数，但它们的圈复杂度并不一定更大。例如，countVowels的圈复杂度也测量为五：

```java
public int countVowels(String word) {
    int count = 0;
    for (String c : word.split("")) { // +1
        for(String v: vowels) { // +1
            if(c.equalsIgnoreCase(v)) { // +1
                count++;
            }
        }
    }
    if(count == 0) { // +1
        return "does not contain vowels";
    }
    return String.format("contains %s vowels", count); // +1
}  // 圈复杂度 = 5
```

### 2.2. 认知复杂度

因此，认知复杂度度量标准由Sonar开发，其主要目标是提供一种可靠的代码可理解性度量。其背后的动机是**促进重构实践，以提高代码质量和可读性**。

尽管我们可以配置静态代码分析器（如SonarQube）自动计算我们代码的认知复杂度，让我们理解认知复杂度分数是如何计算的，以及考虑了哪些主要原则。

首先，对于简化代码并使其更易读的结构没有惩罚。例如，我们可以想象提取一个函数或引入早期返回来减少代码的嵌套级别。

其次，对于每次线性流程的中断，认知复杂度会增加。循环、条件语句、try-catch块和其他类似结构打破了这种线性流程，因此它们将使复杂度级别增加一。目标是从上到下、从左到右以线性流程阅读所有代码。

最后，嵌套会导致额外的复杂度惩罚。因此，如果我们回顾之前的代码示例，使用switch语句的tennisScore函数将具有一个认知复杂度。另一方面，countVowels函数将因嵌套循环而受到严重惩罚，导致复杂度级别为七：

```java
public String countVowels(String word) {
    int count = 0;
    for (String c : word.split("")) { // +1
        for(String v: vowels) { // +2 (嵌套级别 = 1)
            if(c.equalsIgnoreCase(v)) { // +3 (嵌套级别 = 2)
                count++;
            }
        }
    }
    if(count == 0) { // +1
        return "does not contain vowels";
    }
    return String.format("contains %s vowels", count);
} // 认知复杂度 = 7
```

## 3. 线性流程的中断

正如前一节提到的，我们应该能够从开始到结束，无障碍地、不间断地阅读认知复杂度最小的代码。然而，一些破坏代码自然流程的元素，因此会增加复杂度级别。这将是以下结构的情况：

- 语句：if、三元运算符、switch
- 循环：for、while、do while
- try-catch块
- 递归
- 跳转标签：continue、break
- 逻辑运算符序列

现在，让我们看一个简单的方法示例，并尝试找到使代码可读性降低的结构：

```java
public String readFile(String path) {
    // +1 个if；+2 个逻辑运算符序列（"or" 和 "not"）
    String text = null;
    if(path == null || path.trim().isEmpty() || !path.endsWith(".txt")) {
        return DEFAULT_TEXT;
    }

    try {
        text = "";
        // +1 个循环
        for (String line: Files.readAllLines(Path.of(path))) {
            // +1 个if语句
            if(line.trim().isEmpty()) {
                // +1 个跳转标签
                continue;
            }
            text += line;
        }
    } catch (IOException e) { // +1 个catch块
        // +1 个if语句
        if(e instanceof FileNotFoundException) {
            log.error("could not read the file, returning the default content..", e);
        } else {
            throw new RuntimeException(e);
        }
    }
    // +1 个三元运算符
    return text == null ? DEFAULT_TEXT : text;
}
```

目前，该方法的结构不允许无缝线性流程。**我们讨论的流程中断结构将使认知复杂度级别增加九**。

## 4. 嵌套的流程中断结构

随着嵌套作用域的每个额外级别，代码的可读性降低。因此，if、else、catch、switch、循环和lambda表达式的每个后续嵌套级别都将导致认知复杂度增加+1。如果我们回顾前面的例子，我们将发现**两个地方深度嵌套可能导致复杂度分数的额外惩罚**：

```java
public String readFile(String path) {
    String text = null;
    if(path == null || path.trim().isEmpty() || !path.endsWith(".txt")) {
        return DEFAULT_TEXT;
    }
    try {
        text = "";
        // 嵌套级别是1
        for (String line: Files.readAllLines(Path.of(path))) {
            // 嵌套级别是2 => 复杂度 +1
            if(line.trim().isEmpty()) {
                continue;
            }
            text += line;
        }
    } catch (IOException e) {
        // 嵌套级别是2 => 复杂度 +1
        if(e instanceof FileNotFoundException) {
            log.error("could not read the file, returning the default content..", e);
        } else {
            throw new RuntimeException(e);
        }
    }
    return text == null ? DEFAULT_TEXT : text;
}
```

因此，该方法表现出十一个认知复杂度，准确地代表了其在可读性和理解方面的难度。然而，**通过重构，我们可以显著降低其认知复杂度并提高其整体可读性**。我们将在下一节深入探讨这个重构过程的具体内容。

## 5. 重构

我们有一系列重构技术可以降低我们代码的认知复杂度。让我们探索每一种技术，同时突出我们的IDE如何促进它们的安全和有效执行。

**一种有效的方法包括提取方法或类，这允许我们压缩代码而不会遭受惩罚。**在这种情况下，我们可以使用方法提取来验证_filePath_参数，提高整体清晰度。

大多数IDE将允许您使用简单的快捷方式或_重构_菜单自动执行此操作。例如，在IntelliJ中，我们可以通过突出显示相应行并使用_Ctrl+Alt+M_（或_Ctrl+Enter_）快捷方式来提取_hasInvalidPath_方法：

```java
private boolean hasInvalidPath(String path) {
    return path == null || path.trim().isEmpty() || !path.endsWith(".txt");
}
```

### 5.2. 反转条件

根据上下文，有时，反转简单的_if_语句可以是减少代码嵌套级别的便捷方式。在我们的示例中，我们可以反转_if_语句，检查行是否为空并避免使用_continue_关键字。再次，IDE可以为这种简单的重构提供帮助：在Intellij中，我们需要突出显示if并点击_Alt+Enter_：

### 5.3. 语言特性

我们还应该尽可能利用语言特性来避免流程中断结构。例如，我们可以使用多个_catch_块来不同地处理异常。这将帮助我们防止增加额外的_if_语句，这将增加嵌套级别。

### 5.4. 提前返回

提前返回也可以使方法更短，更容易理解。在这种情况下，提前返回可以帮助我们处理函数末尾的三元运算符。

如我们所见，我们有机会为_text_变量引入提前返回，并处理_FileNotFoundException_的发生，通过返回_DEFAULT_TEXT_。因此，我们可以通过将_text_变量的声明更靠近其使用（IntelliJ中的_Alt+M_）来改善代码。

这种调整增强了代码的组织，并避免了使用_null_：

### 5.5. 声明式代码

最后，声明式模式通常会降低代码的嵌套级别和复杂度。例如，Java Streams可以帮助我们使代码更紧凑和全面。让我们使用_Files.lines()_ ——它返回一个_Stream`<String>`_——而不是_File.readAllLines_。此外，我们可以在初始_path_验证之后立即检查文件是否存在，因为它们使用相同的返回值。

生成的代码将只有两个处罚，用于执行初始参数验证的_if_语句和逻辑运算：

```java
public String readFile(String path) {
    // +1 个if语句；+1 个逻辑运算
    if(hasInvalidPath(path) || fileDoesNotExist(path)) {
        return DEFAULT_TEXT;
    }
    try {
        return Files.lines(Path.of(path))
            .filter(not(line -> line.trim().isEmpty()))
            .collect(Collectors.joining(""));
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```

## 6. 结论

由于需要一种精确的方式来评估代码的可读性和可维护性，Sonar开发了认知复杂度度量标准。在本文中，我们介绍了计算函数认知复杂度的过程。

之后，我们检查了打断代码线性流程的结构。最后，我们讨论了各种重构代码的技术，这些技术允许我们减少函数的认知复杂度。我们使用了IDE功能来重构一个函数，将其复杂度分数从_十一_降低到_二_。

OK