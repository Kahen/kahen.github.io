---
date: 2022-04-01
category:
  - JUnit5
  - Testing
tag:
  - assertAll
  - Assertions
head:
  - - meta
    - name: keywords
      content: JUnit5, assertAll, Multiple Assertions, Testing
---
# JUnit5中的assertAll()与多个断言的比较

当编写单元测试时，我们有时会对输出提供多个断言。当这些断言中的任何一个失败时，测试就会停止。这意味着我们无法知道后面的断言是否会通过或失败，这可能会增加调试时间。

我们可以通过将多个断言包装成单个动作来解决这个问题。

在这个简短的教程中，我们将学习如何在JUnit5中使用引入的assertAll()方法，并看到它与使用多个断言的不同之处。

## 2. 模型

我们将使用一个_User_类来帮助我们的例子：

```java
public class User {
    String username;
    String email;
    boolean activated;
    //构造函数
   //getters和setters
}
```

## 3. 使用多个断言

让我们从一个所有断言都会失败的例子开始：

```java
User user = new User("baeldung", "support@baeldung.com", false);
assertEquals("admin", user.getUsername(), "用户名应该是admin");
assertEquals("admin@baeldung.com", user.getEmail(), "电子邮件应该是admin@baeldung.com");
assertTrue(user.getActivated(), "用户应该被激活");
```

运行测试后，只有第一个断言失败：

```plaintext
org.opentest4j.AssertionFailedError: Username should be admin ==> 
Expected :admin
Actual   :baeldung
```

假设我们修复了失败的代码或测试并重新运行测试。然后我们会得到第二个失败，依此类推。**在这种情况下，最好将所有这些断言组合成单个通过/失败。**

## 4. 使用assertAll()方法

我们可以使用JUnit5的assertAll()来组合断言。

### 4.1. 理解assertAll()

assertAll()断言函数接受多个Executable对象的集合：

```java
assertAll(
  "Grouped Assertions of User",
  () -> assertEquals("baeldung", user.getUsername(), "用户名应该是baeldung"),
  // 更多断言
  ...
);
```

因此，我们可以使用lambda来提供我们的每个断言。lambda将在由assertAll()提供的分组内运行断言。

在这里，我们在assertAll()的第一个参数中也提供了一个描述，以解释整个组的含义。

### 4.2. 使用assertAll()组合断言

让我们看看完整的示例：

```java
User user = new User("baeldung", "support@baeldung.com", false);
assertAll(
  "Grouped Assertions of User",
  () -> assertEquals("admin", user.getUsername(), "用户名应该是admin"),
  () -> assertEquals("admin@baeldung.com", user.getEmail(), "电子邮件应该是admin@baeldung.com"),
  () -> assertTrue(user.getActivated(), "用户应该被激活")
);
```

现在，让我们看看运行测试时会发生什么：

```plaintext
org.opentest4j.MultipleFailuresError: Grouped Assertions of User (3 failures)
org.opentest4j.AssertionFailedError: Username should be admin ==> expected: `<admin>` but was: `<baeldung>`
org.opentest4j.AssertionFailedError: Email should be admin@baeldung.com ==> expected: `<admin@baeldung.com>` but was: `<support@baeldung.com>`
org.opentest4j.AssertionFailedError: User should be activated ==> expected: `<true>` but was: `<false>`
```

与使用多个断言时发生的情况不同，**这次所有断言都被执行了，并且它们的失败在_MultipleFailuresError_消息中被报告了。**

我们应该注意到，assertAll()只处理AssertionError。**如果任何断言以异常结束，而不是通常的AssertionError，执行会立即停止**，并且错误输出将与异常有关，而不是MultipleFailuresError。

## 5. 结论

在本文中，我们学习了如何在JUnit5中使用assertAll()，并看到了它与使用多个单独断言的不同之处。

如常，教程的完整代码可在GitHub上找到。