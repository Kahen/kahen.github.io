---
date: 2022-04-01
category:
  - Java
  - Lambda表达式
tag:
  - 匿名类
  - 转换
head:
  - - meta
    - name: keywords
      content: Java匿名类转换为Lambda表达式教程
---
# Java中将匿名类转换为Lambda表达式

在本教程中，我们将学习**如何在Java中将匿名类转换为Lambda表达式**。

首先，我们将简要介绍匿名类是什么。然后，我们将使用实际示例来解答我们的中心问题。

### 2. Java中的匿名类

简而言之，匿名类正如其名，是一个没有名称的内部类。由于它没有名称，**我们需要在一个单独的表达式中同时声明和实例化它**。

按设计，匿名类扩展了一个类或实现了一个接口。

例如，我们可以使用_Runnable_作为一个匿名类来在Java中创建一个新线程。语法类似于构造函数的调用，只是我们需要将类定义放在一个块内：

```
Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        ...
    }
});
```

现在我们知道了匿名类是什么，让我们看看如何使用Lambda表达式重写它。

### 3. 将匿名类作为Lambda表达式

Lambda表达式提供了一种方便的捷径，可以更简洁、更直接地定义匿名类。

**然而，这只在匿名类只有一个单一方法时才可能**。那么，让我们一步一步地看看如何将匿名类转换为Lambda表达式。

#### 3.1. 定义匿名类

例如，考虑_Sender_接口：

```
public interface Sender {
    String send(String message);
}
```

正如我们所看到的，接口只有一个声明的方法。这种类型的接口称为函数式接口。

接下来，让我们创建_SenderService_接口：

```
public interface SenderService {
    String callSender(Sender sender);
}
```

由于_callSender()_方法接受一个_Sender_对象作为参数，我们可以将其作为匿名类传递。

现在，我们将创建两个_SenderService_接口的实现。

首先，让我们创建_EmailSenderService_类：

```
public class EmailSenderService implements SenderService {

    @Override
    public String callSender(Sender sender) {
        return sender.send("Email Notification");
    }
}
```

接下来，让我们创建_SmsSenderService_类：

```
public class SmsSenderService implements SenderService {

    @Override
    public String callSender(Sender sender) {
        return sender.send("SMS Notification");
    }
}
```

现在我们已经把各个部分组合在一起，让我们创建一个测试用例，将_Sender_对象作为匿名类传递：

```
@Test
public void whenPassingAnonymousClass_thenSuccess() {
    SenderService emailSenderService = new EmailSenderService();

    String emailNotif = emailSenderService.callSender(new Sender() {
        @Override
        public String send(String message) {
            return message;
        }
    });

    assertEquals(emailNotif, "Email Notification");
}
```

如上所示，我们以匿名类的形式传递了_Sender_对象，并覆盖了_send()_方法。

#### 3.2. 转换匿名类

现在，让我们尝试使用Lambda表达式以更简洁的方式重写前面的测试用例。

**由于_send()_是唯一定义的方法，编译器知道要调用哪个方法，因此不需要显式覆盖它**。

要转换匿名类，**我们需要省略_new_关键字和方法名**：

```
@Test
public void whenPassingLambdaExpression_thenSuccess() {
    SenderService smsSenderService = new SmsSenderService();

    String smsNotif = smsSenderService.callSender((String message) -> {
        return message;
    });

    assertEquals(smsNotif, "SMS Notification");
}
```

如我们所见，**我们用箭头替换了匿名类，在_send()_参数和其体之间**。

我们甚至可以进一步增强这一点：**我们可以通过删除参数类型和_return_语句，将Lambda语句更改为Lambda表达式**：

```
String smsNotif = smsSenderService.callSender(message -> message);
```

如我们所见，我们不必指定参数类型，因为编译器可以隐式推断它。

## 4. 结论

在本文中，我们学习了如何在Java中用Lambda表达式替换匿名类。

在此过程中，我们解释了匿名类是什么以及如何将其转换为Lambda表达式。

正如往常一样，本文中使用的代码可以在GitHub上找到。