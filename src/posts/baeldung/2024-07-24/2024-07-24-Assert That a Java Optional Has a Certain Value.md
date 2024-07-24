---
date: 2022-04-01
category:
  - Java
  - Testing
tag:
  - Java Optional
  - AssertJ
  - JUnit
head:
  - - meta
    - name: keywords
      content: Java Optional, AssertJ, JUnit, Testing
---
# 断言Java Optional具有特定值

1. **概述**
   当我们测试返回_Optional_对象的方法时，我们可能需要编写断言来检查_Optional_是否具有值，或者检查其内部的值。

   在这个简短的教程中，我们将看看如何使用来自JUnit和AssertJ的函数来编写这些断言。

2. **测试Optional是否为空或非空**
   如果我们只需要找出_Optional_是否有值，我们可以对_isPresent_或_isEmpty_进行断言。

   ### 2.1 测试_Optional_具有值
   如果一个_Optional_有值，我们可以对_Optional.isPresent_进行断言：
   ```java
   assertTrue(optional.isPresent());
   ```
   然而，AssertJ库提供了一种更流畅的表达方式：
   ```java
   assertThat(optional).isNotEmpty();
   ```

   ### 2.2 测试Optional为空
   当使用JUnit时，我们可以反转逻辑：
   ```java
   assertFalse(optional.isPresent());
   ```
   此外，从Java 11开始，我们可以使用_Optional.isEmpty_：
   ```java
   assertTrue(optional.isEmpty());
   ```
   然而，AssertJ也为我们提供了一个整洁的替代方案：
   ```java
   assertThat(optional).isEmpty();
   ```

3. **测试_Optional_的值**
   通常我们想要测试_Optional_内部的值，而不仅仅是存在或不存在。

   ### 3.1 使用_JUnit_断言
   我们可以使用_Optional.get_来提供值，然后在该值上编写断言：
   ```java
   Optional``````<String>`````` optional = Optional.of("SOMEVALUE");
   assertEquals("SOMEVALUE", optional.get());
   ```
   然而，使用_get_可能会引发异常，这使得测试失败更难理解。因此，我们可能更倾向于首先断言值是否存在：
   ```java
   assertTrue(optional.isPresent());
   assertEquals("SOMEVALUE", optional.get());
   ```
   然而，**_Optional_支持equals方法**，所以我们可以使用一个具有正确值的_Optional_作为一般等式断言的一部分：
   ```java
   Optional``````<String>`````` expected = Optional.of("SOMEVALUE");
   Optional``````<String>`````` actual = Optional.of("SOMEVALUE");
   assertEquals(expected, actual);
   ```

   ### 3.2 使用_AssertJ_
   使用AssertJ，**我们可以使用_hasValue_流畅的断言**：
   ```java
   assertThat(Optional.of("SOMEVALUE")).hasValue("SOMEVALUE");
   ```

4. **结论**
   在这篇文章中，我们探讨了几种测试_Optional_的方法。

   我们看到了如何使用内置的JUnit断言与_isPresent_和_get_。我们还看到了_Optional.equals_如何为我们的断言提供了一种比较_Optional_对象的方法。

   最后，我们看到了AssertJ断言，它为我们提供了一种流畅的语言来检查我们的_Optional_值。

   正如往常一样，本文中呈现的代码可以在GitHub上找到。---
date: 2022-04-01
category:
  - Java
  - Testing
tag:
  - Java Optional
  - AssertJ
  - JUnit
head:
  - - meta
    - name: keywords
      content: Java Optional, AssertJ, JUnit, Testing
---
# 断言Java Optional具有特定值

1. **概述**
   当我们测试返回_Optional_对象的方法时，我们可能需要编写断言来检查_Optional_是否具有值，或者检查其内部的值。

   在这个简短的教程中，我们将看看如何使用来自JUnit和AssertJ的函数来编写这些断言。

2. **测试Optional是否为空或非空**
   如果我们只需要找出_Optional_是否有值，我们可以对_isPresent_或_isEmpty_进行断言。

   ### 2.1 测试_Optional_具有值
   如果一个_Optional_有值，我们可以对_Optional.isPresent_进行断言：
   ```java
   assertTrue(optional.isPresent());
   ```
   然而，AssertJ库提供了一种更流畅的表达方式：
   ```java
   assertThat(optional).isNotEmpty();
   ```

   ### 2.2 测试Optional为空
   当使用JUnit时，我们可以反转逻辑：
   ```java
   assertFalse(optional.isPresent());
   ```
   此外，从Java 11开始，我们可以使用_Optional.isEmpty_：
   ```java
   assertTrue(optional.isEmpty());
   ```
   然而，AssertJ也为我们提供了一个整洁的替代方案：
   ```java
   assertThat(optional).isEmpty();
   ```

3. **测试_Optional_的值**
   通常我们想要测试_Optional_内部的值，而不仅仅是存在或不存在。

   ### 3.1 使用_JUnit_断言
   我们可以使用_Optional.get_来提供值，然后在该值上编写断言：
   ```java
   Optional``````<String>`````` optional = Optional.of("SOMEVALUE");
   assertEquals("SOMEVALUE", optional.get());
   ```
   然而，使用_get_可能会引发异常，这使得测试失败更难理解。因此，我们可能更倾向于首先断言值是否存在：
   ```java
   assertTrue(optional.isPresent());
   assertEquals("SOMEVALUE", optional.get());
   ```
   然而，**_Optional_支持equals方法**，所以我们可以使用一个具有正确值的_Optional_作为一般等式断言的一部分：
   ```java
   Optional``````<String>`````` expected = Optional.of("SOMEVALUE");
   Optional``````<String>`````` actual = Optional.of("SOMEVALUE");
   assertEquals(expected, actual);
   ```

   ### 3.2 使用_AssertJ_
   使用AssertJ，**我们可以使用_hasValue_流畅的断言**：
   ```java
   assertThat(Optional.of("SOMEVALUE")).hasValue("SOMEVALUE");
   ```

4. **结论**
   在这篇文章中，我们探讨了几种测试_Optional_的方法。

   我们看到了如何使用内置的JUnit断言与_isPresent_和_get_。我们还看到了_Optional.equals_如何为我们的断言提供了一种比较_Optional_对象的方法。

   最后，我们看到了AssertJ断言，它为我们提供了一种流畅的语言来检查我们的_Optional_值。

   正如往常一样，本文中呈现的代码可以在GitHub上找到。

OK