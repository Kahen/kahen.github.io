---
date: 2022-04-01
category:
  - Java
  - Gradle
tag:
  - Gradle Lint
  - 插件
head:
  - - meta
    - name: keywords
      content: Gradle Lint, 插件, 配置, 规则, 报告
---

# Gradle Lint 插件介绍

在本文中，我们将探索 Gradle Lint 插件。
首先，我们将看到何时使用它。然后，我们将逐步了解插件的配置选项。接下来，我们将使用一些预定义的规则。最后，我们将生成 Lint 报告。

## 2. Gradle Lint 插件是什么？

**Gradle Lint 插件有助于对 Gradle 配置文件进行 Lint 检查。** 它强制执行代码库中构建脚本的结构。该插件可以保持 Gradle Wrapper 版本的更新，防止构建文件中的不良实践，并**移除未使用的依赖。**

实际上，我们使用预定义的规则或编写自定义规则。然后，我们配置插件将它们视为违规或忽略它们。Linter 在大多数 Gradle 任务的最后运行。

**默认情况下，它不会直接修改代码，而是显示警告。** 这很有帮助，因为其他 Gradle 任务不会因插件而失败。此外，这些警告不会丢失，因为它们在日志的最后可见。

此外，_gradle-lint_ 提供了一个 _fixGradleLint_ 命令，可以自动修复大多数 Lint 违规。

**在内部，Gradle Lint 插件利用 Groovy AST 和 Gradle Model 应用 Lint 规则。** 这表明插件与 Groovy AST 紧密耦合。因此，**插件不支持 Kotlin 构建脚本。**

## 3. 设置

**有三种方法可以设置 Gradle Lint 插件：在 _build.gradle_ 中，初始化脚本或脚本插件。** 让我们分别探索它们。

### 3.1. 使用 _build.gradle_

让我们将 _gradle-lint_ 插件添加到我们的 _build.gradle_：

```
plugins {
    id "nebula.lint" version "17.8.0"
}
```

**在使用多模块项目时，插件应该应用于根项目。** 由于我们将使用多模块项目，让我们将插件应用于根项目：

```
allprojects {
    apply plugin :"nebula.lint"
    gradleLint {
        rules = [] // 我们将这里添加规则
    }
}
```

稍后，我们将在 _gradleLint.rules_ 数组中添加 Lint 规则。

### 3.2. 使用初始化脚本

除了 _build.gradle_，我们可以使用初始化脚本来配置我们的插件：

```
import com.netflix.nebula.lint.plugin.GradleLintPlugin

initscript {
    repositories { mavenCentral() }
    dependencies {
        classpath 'com.netflix.nebula:gradle-lint-plugin:17.8.0'
    }
}

allprojects {
    apply plugin: GradleLintPlugin
    gradleLint {
        rules=[]
    }
}
```

这个 _lint.gradle_ 脚本与我们之前的设置相同。要应用它，我们将 _–init-script_ 标志传递给我们的任务：

```
./gradlew build --init-script lint.gradle
```

**一个有趣的用例是根据任务运行的环境传递不同的初始化脚本。** 缺点是我们将始终需要传递 _–init-script_ 标志。

### 3.3. 使用脚本插件

让我们直接将脚本插件应用到我们的 _build.gradle_：

```
plugins{
    id "nebula.lint" version "17.8.0"
}
apply from: "gradle-lint-intro.gradle"
```

_gradle-lint-intro.gradle_ 的内容将被注入，就好像它是构建脚本的一部分：

```
allprojects {
    apply plugin: "nebula.lint"
    gradleLint {
        rules= []
    }
}
```

在本文中，我们将在 _build.gradle_ 脚本中保持我们的 _gradle-lint_ 配置。

## 4. 配置

让我们回顾一下 _gradle-lint_ 插件中可用的不同配置选项。

### 4.1. 执行

**执行 Gradle Lint 插件的命令是 _./gradlew lintGradle_。** 我们可以单独调用它，或者在另一个任务中调用。

**默认情况下，插件自动在所有任务的最后运行**，除了这些 - _help_, _tasks_, _dependencies_, _dependencyInsight_, _components_, _model_, _projects_, _wrapper_ 和 _properties_：

```
./gradlew build
```

这个 _build_ 任务最终通过调用 _./gradlew lintGradle._ 来结束。Linter 将违规显示为警告。

此外，我们可以**通过应用 _skipForTask_ 方法来防止 Linter 在特定任务中运行**：

```
gradleLint {
    skipForTask('build')
}
```

在这里，我们阻止插件在构建任务期间运行。

如果我们想**禁用插件的所有任务，我们可以使用 _alwaysRun_ 标志**：

```
gradleLint {
    alwaysRun = false
}
```

这在我们想要在特定时间点单独调用 _./gradlew lintGradle_ 时特别有用。

**重要的是要注意，在隔离中调用插件将标记 Lint 违规为错误，而不是警告。**

### 4.2. 规则定义

Gradle Lint 插件允许我们配置两组规则：违规规则（通过 _rules_ 和 _critcalRules_ 选项）和忽略规则（使用 _excludedRules_, _ignore_ 和 _fixme_ 属性）。让我们探索它们。

首先，_rules_ 属性接受一个 Lint 规则数组。**当规则定义的违规被满足时，Linter 会发出警告。** 但是，如果 Gradle Lint 插件在隔离中运行，这些警告会导致构建失败。

接下来，让我探索 _criticalRules_ 选项。**当我们想要规则违规触发任务失败时，我们将规则添加到 _gradleLint.criticalRules_ 属性。** 插件提供了一个特定的 _criticalLintGradle_ 任务，仅用于 Lint 关键规则：

```
./gradlew criticalLintGradle -PgradleLint.criticalRules=undeclared-dependency
```

在这里，_-PgradleLint.criticalRules_ 选项将 _undeclared-dependency_ 规则添加到 _criticalRules_。然后，_criticalLintGradle_ 任务仅 Lint 定义在 _criticalRules_ 中的规则。

继续，_excludedRules_ 选项接受一个要忽略的规则列表。当我们想要从一组规则中忽略特定规则时，它非常方便：

```
gradleLint {
    rules= ['all-dependency']
    excludedRules= ['undeclared-dependency']
 }
```

我们从之前的 _all-dependency_ 组规则中排除了 _undeclared-dependency_ 规则。组规则允许我们一次性应用一组规则。

最后，我们可以通过 _ignore_ 属性来防止 Linter 扫描构建文件的部分内容：

```
dependencies {
    testImplementation('junit:junit:4.13.1')
    gradleLint.ignore('dependency-parentheses') {
        implementation("software.amazon.awssdk:sts")
    }
}
```

我们故意保护 _aws-sts_ 免受 _dependency-parenthesis_ 规则的影响。当我们运行 Linter 时，它不会被列出：

```
warning   dependency-parentheses             parentheses are unnecessary for dependencies
gradle-lint-intro/build.gradle:11
testImplementation('junit:junit:4.13.1')
```

_dependency-parentheses_ 警告反对在 Gradle 依赖声明中不必要地使用括号。

此外，如果我们想要暂时忽略一个规则，我们可以将 _ignore_ 替换为 _fixme_ 属性：

```
gradleLint.fixme('2029-04-23', 'dependency-parentheses') {
    implementation('software.amazon.awssdk:sts')
}
```

在这里，_aws-sts_ 依赖将在 2029 年 4 月 23 日之后触发未使用依赖违规。

**重要的是要注意，_ignore_ 和 _fixme_ 属性仅对已解析的依赖有效。它们不适用于构建文件中的包装声明：**

```
dependencies {
    gradleLint.ignore('unused-dependency') {
        implementation "software.amazon.awssdk:sts"
    }
}
```

我们故意保护 _aws-sts_ 免受未使用依赖规则的影响。我们没有直接在代码中使用它。但出于某种原因，它需要由 AWS _WebIdentityTokenCredentialsProvider_ 要求。不幸的是，Linter 不会捕获它，因为它不评估未解析的依赖。

### 4.3. 覆盖配置属性

Gradle Lint 允许我们在命令行中覆盖一些配置属性。我们通过使用 _-PgradleLint_ 选项，然后是任何有效的文件配置选项来实现。

让我们将 _unused-dependency_ 规则添加到我们最初的空 _rules_ 数组中：

```
gradleLint {
    rules= ['unused-dependency']
}
```

接下来，让我们通过命令行排除它：

```
./gradlew lintGradle -PgradleLint.excludedRules=unused-dependency

This is equivalent to setting _excludedRules=\["unused-dependency"\]_ in the configuration file.

We can use this pattern for all the other properties, especially when running in CI environments. Multiple values should be comma-separated.

## 5. Built-in Rules

**The Gradle Lint plugin has several built-in lint rules.** Let's explore some of them.

### 5.1. Minimum Dependency Version Rule

First, let's see the _minimum-dependency-version_ rule. It shows violations for dependencies that have a strictly lower version than a predefined one:

```
gradleLint {
    rules= ['minimum-dependency-version']
}
```

We'll need to provide the comma-separated list of minimum dependency versions in the _minVersions_ property. But, as of this writing, the _GradleLintExtension_ doesn't have the _minVersions_ property. Therefore, let's set it via the command line:

```
./gradlew lintGradle -PgradleLint.minVersions=junit:junit:5.0.0
```

Here, the linter warns against the use of _junit_ versions lower than _5.0.0_:

```
> Task :lintGradle FAILED

This project contains lint violations. A complete listing of the violations follows.
Because none were serious, the build's overall status was unaffected.

warning   minimum-dependency-version         junit:junit is below the minimum version of 5.0.0 (no auto-fix available). See https://github.com/nebula-plugins/gradle-lint-plugin/wiki/Minimum-Dependency-Version-Rule for more details

? 1 problem (0 errors, 1 warning)

To apply fixes automatically, run fixGradleLint, review, and commit the changes.
```

Running _./gradlew fixGradleLint_ effectively updates _junit_ versions to _5.0.0._

### 5.2. Undeclared Dependency Rule

Next, we'll learn about the _undeclared-dependency_ rule. It ensures we have explicitly declared transitive dependencies that we directly use in our code:

```
gradleLint {
    rules= ['undeclared-dependency']
}
```

Now, let's execute the _lintGradle_ task:

```
> Task :lintGradle FAILED

This project contains lint violations. A complete listing of the violations follows.
Because none were serious, the build's overall status was unaffected.

warning   undeclared-dependency              one or more classes in org.hamcrest:hamcrest-core:1.3 are required by your code directly

warning   undeclared-dependency              one or more classes in org.apache.httpcomponents:httpcore:4.4.13 are required by your code directly

? 2 problems (0 errors, 2 warnings)

To apply fixes automatically, run fixGradleLint, review, and commit the changes.
```

We can see that we have two dependencies directly required by our code. The linter adds them after we run the _fixlintGradle_ task:

```
> Task :fixLintGradle

This project contains lint violations. A complete listing of my attempt to fix them follows. Please review and commit the changes.

fixed          undeclared-dependency              one or more classes in org.hamcrest:hamcrest-core:1.3 are required by your code directly

fixed          undeclared-dependency              one or more classes in org.apache.httpcomponents:httpcore:4.4.13 are required by your code directly

Corrected 2 lint problems
```

Besides, as of this writing, **it’s impossible to feed custom rules to the plugin**. An alternative could be to fork the library and add custom rules directly.

Finally, we should be careful when using outdated rules. The _archaic-wrapper_ rule was removed in 2018. Some sections of the documentation are yet to be updated.

## 6. Generating Reports

Now, let's generate reports using the _generateGradleLintReport_ task:

```
./gradlew generateGradleLintReport
```

By default, the report format is HTML. The plugin places all report files in the _build/reports/gradleLint_ folder. Our HTML report will be named _gradle-5.html_, where _gradle-5_ is our root project name.

The other available options are _xml_ and _text_:

```
gradleLint {
    reportFormat = 'text'
    reportOnlyFixableViolations = true
}
```

We’ve used the _reportFormat_ property to directly output the report in plain text. Additionally, our report only contains fixable violations thanks to the activated _reportOnlyFixableViolations_ flag.

## 7. Conclusion

In this article, we explored the _gradle-lint_ plugin. First, we saw its utility. Then, we listed the different configuration options. Next, we used some predefined rules. Finally, we generated lint reports.

As always, the code for this article is available over on GitHub.

[![Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com/)
[![Author Avatar](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)](https://www.baeldung.com/)
[![Author Avatar](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)](https://www.baeldung.com/)

OK