---
date: 2023-09-19
category:
  - Java
  - New Features
tag:
  - Java 21
  - JEP
head:
  - - meta
    - name: keywords
      content: Java 21, New Features, JEP, LTS
---

# Java 21的新特性概览

Oracle在2023年9月19日发布了Java 21，这是继Java 17之后的最新的Java长期支持(LTS)版本。

本文将讨论Java 21中新增的特性和增强功能。

## 2. 通过JEP引入的显著增强功能列表

### 2.1. 记录模式（JEP 440）

记录模式在Java 19和Java 20中作为预览特性被包含进来，Java 21进一步改进了这一特性。

**此JEP将现有的模式匹配功能扩展到解构记录类实例，这使得编写复杂的数据查询成为可能**。还增加了对嵌套模式的支持，以实现更可组合的数据查询。

以下是示例代码：

```java
record Point(int x, int y) {}

public static int beforeRecordPattern(Object obj) {
    int sum = 0;
    if(obj instanceof Point p) {
        int x = p.x();
        int y = p.y();
        sum = x+y;
    }
    return sum;
}

public static int afterRecordPattern(Object obj) {
    if(obj instanceof Point(int x, int y)) {
        return x+y;
    }
    return 0;
}
```

我们还可以使用嵌套记录模式。以下示例演示了这一点：

```java
enum Color {RED, GREEN, BLUE}
record ColoredPoint(Point point, Color color) {}

record RandomPoint(ColoredPoint cp) {}
public static Color getRamdomPointColor(RandomPoint r) {
    if(r instanceof RandomPoint(ColoredPoint cp)) {
        return cp.color();
    }
    return null;
}
```

在上面的代码片段中，我们解构了_ColoredPoint_以访问_color()_方法。

### 2.2. switch语句的模式匹配（JEP 441）

switch语句的模式匹配在JDK 17中引入，并在JDK 18、19、20和JDK 21中进行了改进。

**此特性的主要目标是** **允许在switch case标签中使用模式，以提高switch语句和表达式的表达能力**。此外，还通过允许null case标签来增强处理_NullPointerException_的能力。

让我们通过一个示例来探索这一点：

```java
class Account{
    double getBalance() {
        return 0;
    }
}

class SavingsAccount extends Account {
    double getBalance() {
        return 100;
    }
}

class TermAccount extends Account {
    double getBalance() {
        return 1000;
    }
}

class CurrentAccount extends Account {
    double getBalance() {
        return 10000;
    }
}
```

在Java 21之前，我们可以使用以下代码来获取余额：

```java
static double getBalanceWithOutSwitchPattern(Account account) {
    double balance = 0;
    if(account instanceof SavingsAccount sa) {
        balance = sa.getBalance();
    }
    else if(account instanceof TermAccount ta) {
        balance = ta.getBalance();
    }
    else if(account instanceof CurrentAccount ca) {
        balance = ca.getBalance();
    }
    return balance;
}
```

上述代码的表达能力不是很强。有了Java 21，我们可以在_case_标签中使用模式：

```java
static double getBalanceWithSwitchPattern(Account account) {
    double result = 0;
    switch (account) {
        case null -> throw new RuntimeException("Oops, account is null");
        case SavingsAccount sa -> result = sa.getBalance();
        case TermAccount ta -> result = ta.getBalance();
        case CurrentAccount ca -> result = ca.getBalance();
        default -> result = account.getBalance();
    };
    return result;
}
```

一个模式_case_标签还支持多个值。让我们通过一个示例来详细说明这一点：

```java
static String processInputOld(String input) {
    String output = null;
    switch(input) {
        case null -> output = "Oops, null";
        case String s -> {
            if("Yes".equalsIgnoreCase(s)) {
                output = "It's Yes";
            }
            else if("No".equalsIgnoreCase(s)) {
                output = "It's No";
            }
            else {
                output = "Try Again";
            }
        }
    }
    return output;
}
```

上述代码可以使用Java 21的_case_标签中的_when_子句进行增强：

```java
static String processInputNew(String input) {
    String output = null;
    switch(input) {
        case null -> output = "Oops, null";
        case String s when "Yes".equalsIgnoreCase(s) -> output = "It's Yes";
        case String s when "No".equalsIgnoreCase(s) -> output = "It's No";
        case String s -> output = "Try Again";
    }
    return output;
}
```

### 2.3. 字符串字面量（JEP 430）

Java提供了几种机制来使用字符串字面量和表达式来组合字符串。其中一些是字符串连接、StringBuilder类、String类的format()方法和MessageFormat类。

**Java 21引入了** **字符串模板**。这补充了Java现有的字符串字面量和文本块，通过将文本与模板表达式和模板处理器结合，生成所需的结果。

让我们看一个例子：

```java
String name = "Baeldung";
String welcomeText = STR."Welcome to {name}";
System.out.println(welcomeText);
```

上述代码片段打印文本“_Welcome to Baeldung_”。

在上述文本中，我们有一个模板处理器（STR）、一个点字符和一个包含嵌入表达式的模板（_{name}_）。在运行时，当模板处理器评估模板表达式时，它将模板中的文本与嵌入表达式的值结合起来，以产生结果。

STR是由Java提供的模板处理器之一，并且自动导入到所有Java源文件中。Java提供的其他模板处理器是FMT和RAW。

### 2.4. 虚拟线程（JEP 444）

虚拟线程最初作为Java 19中的预览特性引入，并在Java 20中进一步改进。Java 21引入了一些新的变化。

**虚拟线程是轻量级线程。这些线程的主要目的是减少开发高并发应用程序的工作量。** 传统线程也称为平台线程，是OS线程的薄包装器。平台线程的一个主要问题是它们在OS线程上运行代码，并在其整个生命周期中捕获OS线程。OS线程的数量有限，这造成了可扩展性瓶颈。

**像平台线程一样，虚拟线程也是java.lang.Thread类的实例，但它不绑定到特定的OS线程**。它在特定的OS线程上运行代码，但不会在整个生命周期中捕获线程。因此，许多虚拟线程可以共享OS线程来运行它们的代码。

让我们通过一个示例来使用虚拟线程：

```java
try(var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.rangeClosed(1, 10_000).forEach(i -> {
        executor.submit(() -> {
            System.out.println(i);
            try {
                Thread.sleep(Duration.ofSeconds(1));
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    });
}
```

在上面的代码片段中，我们使用静态_newVirtualThreadPerTaskExecutor()_方法。这个执行器为每个任务创建一个新的虚拟线程。因此，在上述示例中，我们创建了_10000_个虚拟线程。

Java 21对虚拟线程引入了两个值得注意的变化：

- 虚拟线程现在始终支持线程局部变量。
- 通过_Thread.Builder_ API创建的虚拟线程也在其生命周期内被监控，并且在新的线程转储中可观察

### 2.5. 有序集合（JEP 431）

在Java集合框架中，没有集合类型表示具有定义的遇到顺序的元素序列。例如，List和Deque接口定义了遇到顺序，但它们的公共超类型Collection没有。同样，Set没有定义遇到顺序，但像LinkedHashSet或SortedSet这样的子类型确实有。

**Java 21引入了三个新的接口来表示有序集合、有序集合和有序映射。**

有序集合是一个元素具有定义的遇到顺序的集合。它有第一个和最后一个元素，它们之间的元素有后继和前驱。有序集合是一个没有重复元素的有序集合。有序映射是一个条目具有定义的遇到顺序的映射。

下图显示了新引入的接口在集合框架层次结构中的改装：

### 2.6. 密钥封装机制API（JEP 452）

密钥封装是一种使用非对称密钥或公钥密码学来保护对称密钥的技术。

传统的方法使用公钥来保护随机生成的对称密钥。然而，这种方法需要填充，这很难证明是安全的。

密钥封装机制（KEM）使用公钥来派生不需要任何填充的对称密钥。

**Java 21引入了一个新的KEM API，使应用程序能够使用KEM算法。**

## 3. 结论

在本文中，我们讨论了Java 21中交付的一些显著变化。

我们讨论了记录模式、switch语句的模式匹配、字符串模板、有序集合、虚拟线程和新的
