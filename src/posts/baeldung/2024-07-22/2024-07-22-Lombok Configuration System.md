---
date: 2022-04-01
category:
  - Java
  - Lombok
tag:
  - Lombok
  - 配置
head:
  - - meta
    - name: keywords
      content: Lombok, 配置, Java
---
# Lombok 配置系统

在本教程中，我们将讨论 Lombok 的配置参数。我们将介绍许多不同的选项以及如何正确设置我们的配置。

## 2. 配置概述

Lombok 是一个库，它帮助我们消除了 Java 应用程序中几乎所有的标准样板代码。我们将测试许多属性和配置。第一件事是添加 Lombok 依赖项：

```xml
`<dependency>`
    `<groupId>`org.projectlombok`</groupId>`
    `<artifactId>`lombok`</artifactId>`
    `<version>`1.18.30`</version>`
    `<scope>`provided`</scope>`
`</dependency>`
```

Lombok 的配置系统为我们提供了许多有价值的设置，这些设置通常在项目的所有组件中都是相同的。然而，它还允许我们更改或自定义 Lombok 的行为，有时甚至定义了所有可用功能中哪些可以使用或不能使用。例如，我们可以告诉 Lombok，如果使用任何实验性功能，则显示警告或错误。

### 要开始定义或自定义 Lombok 的行为，我们必须创建一个名为 `lombok.config` 的文件。这个文件可以放在项目的根目录、源代码或任何包中。一旦创建，所有子目录中的源文件都将继承在该文件中定义的配置。可以有多个配置文件。例如，我们可以在根目录中定义一个包含通用属性的配置文件，并在给定包中创建另一个定义其他属性的配置文件。

新的配置将影响给定包中的所有类以及所有子包。此外，在多个定义相同属性的情况下，最接近类或成员的定义优先。

## 3. 基本配置

首先值得一提的是，有太多的功能属性需要讨论。因此，我们只看到最常见的一些。要检查可用选项，请访问 Lombok 页面，下载 jar，并在终端中运行以下命令：

```shell
java -jar lombok.jar config -g --verbose
```

作为结果，我们将看到所有属性及其可能值的完整列表，以及简短的描述，解释其目标。

现在，让我们看看一个典型的 `lombok.config` 文件：

```properties
config.stopBubbling = true
lombok.anyconstructor.addconstructorproperties = false
lombok.addLombokGeneratedAnnotation = true
lombok.experimental.flagUsage = WARNING

# ... 更多属性
```

文件中使用的属性仅供示例。我们将在后面讨论它们。但在这里，我们可以观察 Lombok 属性的格式及其定义。

### 让我们从 `config.stopBubbling` 属性开始——这个选项告诉配置系统不要在父目录中搜索配置文件。将此属性添加到工作区或项目的根目录是一个好习惯。默认情况下，它的值为 `false`。

## 4. 主要属性

### 4.1. 全局配置键

**全局配置键是可能影响配置系统本身的许多配置**。接下来，我们将看到一些这样的键的例子。

我们将讨论的第一个键是 `lombok.anyConstructor.addConstructorProperties`。它为所有带参数的构造函数添加了 `@java.beans.ConstructorProperties` 注解。通常，使用构造函数反射的框架需要这个注解来映射属性并知道构造函数中参数的正确顺序。以下是 Lombok 版本中的代码：

```java
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Account {
    private double balance;
    private String accountHolder;
}
```

这里是生成的代码：

```java
public class Account {
    private double balance;
    private String accountHolder;

    @ConstructorProperties({"balance", "accountHolder"})
    @Generated
    public Account(double balance, String accountHolder) {
        this.balance = balance;
        this.accountHolder = accountHolder;
    }

    @Generated
    public Account() {}

    // 默认生成的 getter 和 setter
}
```

在上面的代码片段中，我们可以看到生成的类包含了 `@ConstructorProperties` 注解。

接下来，我们有 `lombok.addLombokGeneratedAnnotation`。如果为 `true`，Lombok 将使用 `@lombok.Generated` 标记所有生成的方法。当从包扫描或代码覆盖工具中移除 Lombok 生成的方法时，这非常有用。

另一个有用的键是 `lombok.addNullAnnotations`。这个属性支持许多内置选项，如 javax (JSR305)、eclipse、JetBrains、NetBeans、Android 等。也可以使用我们自己定义的注解，如 `CUSTOM:com.example.NonNull:example.Nullable`。Lombok 会在合适的时候添加 `nullable` 或 `NotNull` 注解。

最后，我们有 `lombok.addSuppressWarnings`，如果为 `false`，Lombok 将停止添加注解 `@SuppressWarnings("all")`，这是当前的默认行为。如果我们在生成的代码上使用静态分析器，这很有用。

### 4.2. 其他配置键

作为第一个特定于特性的键 `lombok.accessors.chain`，如果为 `true`，将改变 setter 方法的行为。这些方法将返回 `this` 而不是 `void`，允许调用链式操作，如下所示：

```java
@Test
void should_initialize_account() {
    Account myAccount = new Account()
      .setBalance(2000.00)
      .setAccountHolder("John Snow");

    assertEquals(2000.00, myAccount.getBalance());
    assertEquals("John Snow", myAccount.getAccountHolder());
}
```

类似于前面的，`lombok.accessors.fluent` 使 Lombok 移除访问器方法中的 `set` 和 `get` 前缀，只使用属性名称来命名它们。

`lombok.log.fieldName` 键在用户配置时更改生成的日志字段的名称。默认情况下，`lombok.log.fieldName` 键使用 `log` 来命名字段，但在我们的示例中，我们将其更改为 `domainLog`：

```properties
# 日志名称自定义
lombok.log.fieldName = domainLog
```

然后我们可以在操作中看到它：

```java
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Log
public class Account {

    // 与之前定义的相同

   public Account withdraw(double amount) {
        if (this.balance - abs(amount) < 0) {
            domainLog.log(Level.INFO, "Transaction denied for account holder: %s", this.accountHolder);
            throw new IllegalArgumentException(String.format("Not enough balance, you have %.2f", this.balance));
        }

        this.balance -= abs(amount);
        return this;
    }
}
```

接下来是 `lombok.(featureName).flagUsage`。这组属性有 `warning`、`error` 和 `allow` 作为可能的值。我们可以使用它们来控制项目中允许使用哪些 Lombok 特性。例如，可以使用单词 `experimental` 和值 `warning`，在日志中输出一条消息，如果使用任何实验性特性：

```java
/home/dev/repository/git/tutorials/lombok/src/main/java/com/baeldung/lombok/configexamples/TransactionLog.java:9:
 warning: Use of any lombok.experimental feature is flagged according to lombok configuration.
@Accessors(prefix = {"op"})
```

### 4.3. 特殊配置键

有些键不是常见的键值属性，如 `lombok.copyableAnnotations`。这个属性与其他属性不同，因为它表示一个完全限定的注解类型的列表。当向字段添加这些注解时，Lombok 会将这些注解复制到与该字段相关的构造函数、getter 和 setter 中。**这个特性的典型用例是 Spring 中的 bean 定义，其中经常需要将注解 `@Qualifier` 和 `@Value` 复制到构造函数参数中**。其他框架也利用了这个特性。

要将注解添加到列表中，用户必须使用以下表达式：`lombok.copyableAnnotations += com.test.MyAnnotation`。该库使用这种机制来传播前面提到的可空注解：

```java
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Log
public class Account {

    @NonNull
    private Double balance = 0.;

    @NonNull
    private String accountHolder = "";

    // 其他方法
}
```

现在，由 Lombok 生成的代码：

```java
public class Account {

    @Generated
    private static final Logger domainLog = Logger.getLogger(Account.class.getName());
    @NonNull
    private Double balance = 0.0D;
    @NonNull
    private String accountHolder = "";

    @ConstructorProperties({"balance", "accountHolder"})
    @Generated
    public Account(@NonNull Double balance, @NonNull String accountHolder) {
        if (balance == null) {
            throw new NullPointerException("balance is marked non-null but is null");
        } else if (accountHolder == null) {
            throw new NullPointerException("accountHolder is marked non-null but is null");
        } else {
            this.balance = balance;
            this.accountHolder = accountHolder;
        }
    }

    @NonNull
    @Generated
    public Double getBalance() {
        return this.balance;
    }

    @NonNull
    @Generated
    public String getAccountHolder() {
        return this.accountHolder;
    }

    // 类的其余成员...
}
```

最后，我们有一个 `