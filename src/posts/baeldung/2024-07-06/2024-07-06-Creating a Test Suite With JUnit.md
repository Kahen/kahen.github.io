---
date: 2022-04-01
category:
  - Java
  - JUnit
tag:
  - JUnit
  - 测试套件
head:
  - - meta
    - name: keywords
      content: Java, JUnit, 测试套件, 自动化测试
---
# 使用JUnit创建测试套件

JUnit是Java应用程序中最流行的测试框架之一，它提供了一种强大且灵活的方式来创建自动化单元测试。它的一个特性是能够**创建测试套件，这允许我们将多个测试组合在一起**。

在本教程中，我们将探讨如何使用JUnit创建测试套件。首先，我们将实现并运行一个简单的测试套件。之后，我们将探索一些配置，包括包含或排除某些测试。

众所周知，**测试套件是一组放在一起的测试，并作为一个单独的单元运行**。我们使用它们将测试组织成逻辑组，例如针对特定组件或应用程序功能的测试。我们还可以轻松地按特定顺序执行测试，或根据特定标准运行测试的子集。

JUnit 5提供了几种创建测试套件的方法。在我们开始之前，我们需要确保我们包含了_junit-platform-suite_依赖项：

```xml
``<dependency>``
    ``<groupId>``org.junit.platform``</groupId>``
    ``<artifactId>``junit-platform-suite``</artifactId>``
    ``<version>``1.11.0-M1``</version>``
    ``<scope>``test``</scope>``
``</dependency>``
```

JUnit平台套件引擎负责使用JUnit中的一个或多个测试引擎运行自定义测试套件。它还为我们提供了我们将用于创建测试套件的额外API。

### 2.1. 使用@Suite注解

**实现测试套件的最简单方式是使用@Suite类级别注解**，这也是最推荐的解决方案。这个注解自JUnit平台1.8.0版本以来就可用。

让我们准备一个_JUnitTestSuite_类：

```java
@Suite
@SuiteDisplayName("我的测试套件")
public class JUnitTestSuite {
}
```

在这个例子中，我们使用了@Suite注解告诉JUnit将这个类标记为可以作为一个单独的单元执行。此外，我们添加了一个可选的@SuiteDisplayName注解，并指定了一个自定义标题。

从现在开始，我们可以使用这个类通过我们的IDE或_maven-surefire-plugin_在一次运行中执行这个套件中配置的所有测试。注意，到目前为止，这个套件还没有包含任何测试。

### 2.2. 使用@RunWith注解

或者，**我们可以重写我们的测试套件使用@RunWith注解**，它使用JUnit 4 Runners模型：

```java
@RunWith(JUnitPlatform.class)
@SuiteDisplayName("我的测试套件")
public class JUnitRunWithSuite {
}
```

如果我们缺少_JUnitPlatform_类，我们需要包含一个额外的依赖项：

```xml
``<dependency>``
    ``<groupId>``org.junit.platform``</groupId>``
    ``<artifactId>``junit-platform-runner``</artifactId>``
    ``<version>``1.11.0-M1``</version>``
    ``<scope>``test``</scope>``
``</dependency>``
```

结果，这个测试套件的工作方式与们之前通过@Suite注解创建的测试套件类似。**这个解决方案只推荐给使用JUnit早期版本的开发者**。此外，**自1.8.0以来，JUnitPlatform运行器已被弃用**，以支持@Suite并将在未来的版本中被移除。

## 3. 包含和排除测试

到目前为止，我们的测试套件还没有包含任何测试。JUnit平台套件引擎提供了多个注解来在我们的测试套件中包含或排除测试。

我们可以区分两组主要的注解：@Select和@Include/@Exclude。

**@Select注解指定JUnit应该查找测试的资源**。同时，**@Include/@Exclude注解指定额外的条件**来包含或排除之前找到的测试。

**没有首先使用@Select注解，这两个注解都不会工作**。我们可以混合使用所有注解来确定我们想要运行的确切测试。

现在让我们通过配置我们的测试套件来看看其中的一些。

### 3.1. @SelectClasses

为我们的测试套件选择测试的最常见方式是**使用@SelectClasses注解指定测试类**：

```java
@Suite
@SelectClasses({ClassOneUnitTest.class, ClassTwoUnitTest.class})
public class JUnitSelectClassesSuite {
}
```

现在测试套件执行了这两个类中所有标记为_@Test_的方法。

### 3.2. @SelectPackages

而不是指定类列表，我们可以使用**@SelectPackages来提供测试扫描的包**：

```java
@Suite
@SelectPackages({"com.baeldung.testsuite", "com.baeldung.testsuitetwo"})
public class JUnitSelectPackagesSuite {
}
```

值得注意的是，**这个注解也执行来自子包的所有类**。

### 3.3. @IncludePackages和@ExcludePackages

现在，我们知道如何包括包中的所有类。**为了进一步指定是否包括或排除包，我们可以使用@IncludePackages和@ExcludePackage_s_注解**，分别：

```java
@Suite
@SelectPackages({"com.baeldung.testsuite"})
@IncludePackages("com.baeldung.testsuite.subpackage")
public class JUnitTestIncludePackagesSuite {
}
```

上述配置仅执行在_com.baeldung.testsuite.subpackage_包中找到的所有测试，忽略其他发现的测试。

让我们看看如何排除一个单独的包：

```java
@Suite
@SelectPackages("com.baeldung.testsuite")
@ExcludePackages("com.baeldung.testsuite.subpackage")
public class JUnitExcludePackagesSuite {
}
```

现在，JUnit执行在_com.baeldung.testsuite_包及其子包中找到的所有测试，仅忽略在_com.baeldung.testsuite.subpackage_中找到的类。

### 3.4. @IncludeClassNamePatterns和@ExcludeClassNamePatterns

如果我们不想使用包来指定包含规则，**我们可以使用@IncludeClassNamePatterns和@ExcludeClassNamePatterns注解，并实现类名的正则表达式检查**：

```java
@Suite
@SelectPackages("com.baeldung.testsuite")
@IncludeClassNamePatterns("com.baeldung.testsuite.Class.*UnitTest")
@ExcludeClassNamePatterns("com.baeldung.testsuite.ClassTwoUnitTest")
public class JUnitClassNamePatternsSuite {
}
```

这个例子包括了在_com.baeldung.testsuite_包中找到的所有测试，不包括其子包。类名必须匹配_Class.\*UnitTest_正则表达式模式，如_ClassOneUnitTest_和_ClassThreeUnitTest_。

此外，我们还严格排除了_ClassTwoUnitTest_名称，这将满足第一个条件。正如我们所知，在Java中，完整的类名还包括其包。在定义模式时也应该考虑到这一点。

### 3.5. @IncludeTags和@ExcludeTags

正如我们所知，在JUnit中，我们可以通过@Tag注解标记类和方法。这是一种通过简单值过滤我们的测试的简单方式。我们可以使用相同的机制来定义我们的测试用例，**使用@IncludeTags和@ExcludeTags运行指定@Tag的测试**：

```java
@Suite
@SelectPackages("com.baeldung.testsuite")
@IncludeTags("slow")
public class JUnitTestIncludeTagsSuite {
}
```

这个测试套件将扫描_com.baeldung.testsuite_包及其所有子包，**只运行带有@Tag("slow")注解的测试**。

现在让我们反过来配置：

```java
@Suite
@SelectPackages("com.baeldung.testsuite")
@ExcludeTags("slow")
public class JUnitTestExcludeTagsSuite {
}
```

在这个例子中，JUnit**运行所有没有@Tag("slow")注解的测试，包括未标记的测试**。

值得注意的是，在JUnit中，我们也可以在一个测试类中的单个方法上标记@Tag。**使用@IncludeTags和@ExcludeTags还允许我们从类中包括单个方法**，与之前的注解不同。

### 3.6. @SelectMethod

有时，我们需要**在我们的测试套件中按名称过滤测试方法**。我们可以使用@SelectMethod注解来解决这个挑战。

让我们看看如何选择一个单一的方法：

```java
@Suite
@SuiteDisplayName("我的测试套件")
@SelectMethod(type = ClassOneUnitTest.class, name = "whenFalse_thenFalse")
@SelectMethod("com.baeldung.testsuite.subpackage.ClassTwoUnitTest#whenFalse_thenFalse")
public class JUnitSelectMethodsSuite {
    // 运行ClassOneUnitTest和ClassTwoUnitTest
}
```

我们可以通过使用_type_和_name_属性来选择类和方法。_type_属性指定包含测试方法的类。_name_属性指定要在类内运行的测试方法的名称。

此外，我们可以使用测试类的完全限定名和测试方法的名称，以'_#'_作为分隔符。

在上面的例子中，我们的测试套件包括了_ClassOneUnitTest_和_ClassTwoUnitTest_类中的_whenFalse_thenFalse()_方法，所以当我们运行套件时，将只执行这些类中选定的方法。

## 4. 结论

JUnit提供了一种创建自动化测试的简便方式，包括创建测试套件的能力。我们可以使用测试套件将我们的测试组织成逻辑组，按特定顺序运行一组测试，或根据特定标准运行测试的子集。

在本文中，**我们讨论了通过@Suite和@RunWith API实现测试套件的两种方式。然后我们探索了一些额外的注解，并检查了如何为我们的测试套件选择测试。最后，我们根据各种条件包括和排除了选定的测试列表。

正如往常一样，本文中使用的例子可以在GitHub上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)
[Gravatar Image](https://secure.gravatar.com/avatar/91912135a4efe549919dd29515c17d3f?s=50&r=g)
[Gravatar Image](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)
[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)
[Baeldung REST Post Footer Image](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)
[Baeldung REST Post Footer Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK