---
date: 2022-04-01
category:
  - Gradle
  - Dependency Management
tag:
  - compile
  - implementation
head:
  - - meta
    - name: keywords
      content: Gradle, compile, implementation, Dependency Management
---
# Gradle中implementation和compile的区别

Gradle提供了两个主要的关键字，_compile_和_implementation_，用于配置软件项目中的依赖。虽然这些关键字看起来可能相似，但它们有不同的含义和用途，理解它们之间的区别对于有效使用它们至关重要。

在本教程中，我们将讨论Gradle中“implementation”和“compile”的区别，并提供有效的依赖管理的最佳实践。

**注意：从Gradle 7.x开始，“compile”配置不再直接使用。** 相反，“implementation”配置用于编译和运行时都需要的依赖。“runtimeOnly”配置用于仅在运行时需要的依赖。

### 1. Gradle依赖管理中的_compile_是什么？
_compile_关键字是Gradle依赖管理中使用的主要关键字之一。当使用_compile_配置依赖时，它会同时包含在编译时和运行时的类路径中。这意味着依赖在编译期间和程序执行时都是可用的。然而，将依赖包含在两个类路径中可能会导致构建时间更长和内存使用增加。

让我们考虑一个简单的Gradle脚本：

```groovy
dependencies {
   compile group: 'org.hibernate', name: 'hibernate-core', version: '3.6.7.Final'
   testCompile group: 'junit', name: 'junit', version: '4.13.2'
}
```

这个脚本也可以写成：

```groovy
dependencies {
    compile 'org.hibernate:hibernate-core:3.6.7.Final'
    testCompile 'junit:junit:4.13.2'
}
```

在这个例子中，我们使用_compile_关键字包含了来自_org.hibernate_组的_hibernate-core_库，版本为_3.6.7.Final_。这个依赖将同时包含在编译时和运行时的类路径中。

我们还使用_testCompile_关键字包含了JUnit测试框架，版本为_4.13.2_。这个依赖只会包含在测试类路径中，用于编译和运行测试。_testCompile_关键字是_compile_关键字的一个变体，它将依赖添加到测试类路径而不是运行时类路径。

### 2. Gradle依赖管理中的_implementation_是什么？
_implementation_关键字是Gradle依赖管理中较新添加的关键字，首次引入于Gradle 3.4。当使用_implementation_配置依赖时，它只包含在运行时类路径中。这意味着依赖在编译期间不可用，只包含在最终打包的应用程序中。

使用_implementation_可以导致更快的构建时间，因为Gradle在编译期间不需要处理依赖。然而，这也意味着依赖不能在编译期间使用，如果其他依赖依赖于它，可能会导致兼容性问题。

让我们考虑一个简单的Gradle脚本：

```groovy
dependencies {
   implementation group: 'org.hibernate', name: 'hibernate-core', version: '3.6.7.Final'
   testImplementation group: 'junit', name: 'junit', version: '4.13.2'
}
```

同样，这个脚本可以写成：

```groovy
dependencies {
    implementation 'org.hibernate:hibernate-core:3.6.7.Final'
    testImplementation 'junit:junit:4.13.2'
}
```

在这个例子中，我们使用_implementation_关键字包含了来自_org.hibernate_组的_hibernate-core_库，版本为_3.6.7.Final_。这个依赖只会包含在运行时类路径中，不会包含在编译时类路径中。

我们还使用_testImplementation_关键字包含了JUnit测试框架，版本为_4.13.2_。这个依赖只会包含在测试运行时类路径中，使其在运行测试时可用，但在编译期间不可用。

Gradle中_compile_和_implementation_的主要区别在于_compile_将依赖包含在编译时和运行时，而_implementation_只将依赖包含在运行时。这意味着使用_compile_配置的依赖在编译期间可用，而使用_implementation_配置的依赖则不可用。

此外，_implementation_提供了更好的编译时和运行时类路径之间的分离，使得更容易管理依赖并避免版本冲突。选择正确的关键字可能对项目性能、构建时间和与其他依赖的兼容性有影响。

### 3. Gradle依赖管理的最佳实践
为确保在Gradle中进行有效的依赖管理，我们应考虑一些最佳实践：

- 默认使用_implementation_关键字，除非依赖需要在编译期间使用。
- 避免使用_compile_关键字，因为它可能导致更长的构建时间和增加的内存使用。
- 使用依赖的具体版本而不是动态版本，以确保跨构建的一致行为。
- 尽可能保持依赖图尽可能小，以减少复杂性并提高构建时间。
- 定期检查依赖的更新，并在必要时更新它们，以确保项目使用最新和最安全的版本。
- 使用依赖锁定，以确保构建在不同机器和环境中是可复现和一致的。

### 4. 结论
在本文中，我们讨论了Gradle中_compile_和_implementation_的区别以及它们如何影响项目中依赖的范围。我们还提供了Gradle依赖管理的示例和最佳实践，包括使用_implementation_和_compile_关键字以及其他管理依赖的最佳实践。

通过遵循这些实践，我们可以确保我们的构建是可靠的、高效的并且易于维护。