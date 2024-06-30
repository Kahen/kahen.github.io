---
date: 2022-04-01
category:
  - Java
  - Mockito
tag:
  - Unit Testing
  - Mocking
head:
  - - meta
    - name: keywords
      content: Mockito, Java, Unit Testing, Mocking Constructors
------
# 如何使用Mockito进行单元测试中的构造函数模拟

在这篇简短的教程中，我们将探索使用Mockito和PowerMock在Java中有效模拟构造函数的各种选项。

## 2. 使用PowerMock模拟构造函数

使用Mockito版本3.3或更低版本模拟构造函数或静态方法是不可能的事情。在这种情况下，像PowerMock这样的库提供了额外的功能，允许我们模拟构造函数的行为并协调它们的交互。

## 3. 模型

让我们使用两个Java类来模拟一个支付处理系统。我们将创建一个`PaymentService`类，其中包含处理支付的逻辑，并提供了一个参数化构造函数以指定支付方式，以及一个带有回退模式的默认构造函数：

```java
public class PaymentService {
    private final String paymentMode;
    public PaymentService(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public PaymentService() {
        this.paymentMode = "Cash";
    }

    public String processPayment(){
        return this.paymentMode;
    }
}
```

`PaymentProcessor`类依赖于`PaymentService`来执行支付处理任务，并提供了两个构造函数，一个用于默认设置，另一个用于自定义支付方式：

```java
public class PaymentProcessor {
    private final PaymentService paymentService;
    public PaymentProcessor() {
        this.paymentService = new PaymentService();
    }

    public PaymentProcessor(String paymentMode) {
        this.paymentMode = new PaymentService(paymentMode);
    }

    public String processPayment(){
        return paymentService.processPayment();
    }
}
```

## 4. 使用Mockito模拟默认构造函数

在编写单元测试时，隔离我们想要测试的代码至关重要。构造函数经常创建我们不想在测试中涉及的依赖。模拟构造函数允许我们用模拟对象替换真实对象，确保我们正在测试的行为特定于正在检查的单元。

从Mockito版本3.4开始，我们可以使用`mockConstruction()`方法。它允许我们模拟对象的构造。我们指定我们打算模拟构造函数的类作为第一个参数。此外，我们还提供一个以`MockInitializer`回调函数形式的第二个参数。这个回调函数允许我们在构造期间定义和操作模拟的行为：

```java
@Test
void whenConstructorInvokedWithInitializer_ThenMockObjectShouldBeCreated(){
    try(MockedConstruction````<PaymentService>```` mockPaymentService = Mockito.mockConstruction(PaymentService.class,(mock,context)->{ 
        when(mock.processPayment()).thenReturn("Credit");
    })){
        PaymentProcessor paymentProcessor = new PaymentProcessor();
        Assertions.assertEquals(1,mockPaymentService.constructed().size());
        Assertions.assertEquals("Credit", paymentProcessor.processPayment());
    }
}
```

`mockConstruction()`方法有几个重载版本，每个版本都适用于不同的用例。在下面的场景中，我们没有使用`MockInitializer`来初始化模拟对象。我们正在验证构造函数被调用了一次，并且缺少初始化器确保了构造的`PaymentService`对象中`paymentMode`字段的`null`状态：

```java
@Test
void whenConstructorInvokedWithoutInitializer_ThenMockObjectShouldBeCreatedWithNullFields(){
    try(MockedConstruction````<PaymentService>```` mockPaymentService = Mockito.mockConstruction(PaymentService.class)){
        PaymentProcessor paymentProcessor = new PaymentProcessor();
        Assertions.assertEquals(1,mockPaymentService.constructed().size());
        Assertions.assertNull(paymentProcessor.processPayment());
    }
}
```

## 5. 使用Mockito模拟参数化构造函数

在这个例子中，我们已经设置了`MockInitializer`并调用了参数化构造函数。我们正在验证确实创建了一个模拟，并且它在初始化期间定义了期望的值：

```java
@Test
void whenConstructorInvokedWithParameters_ThenMockObjectShouldBeCreated(){
    try(MockedConstruction````<PaymentService>```` mockPaymentService = Mockito.mockConstruction(PaymentService.class,(mock, context) -> { 
        when(mock.processPayment()).thenReturn("Credit");
    })){
        PaymentProcessor paymentProcessor = new PaymentProcessor("Debit");
        Assertions.assertEquals(1,mockPaymentService.constructed().size());
        Assertions.assertEquals("Credit", paymentProcessor.processPayment());
    }
}
```

## 6. 模拟构造函数的作用域

Java中的try-with-resources结构允许我们限制正在创建的模拟的作用域。在此块内，对指定类的公共构造函数的任何调用都会创建模拟对象。当在块外的任何地方调用真实构造函数时，将调用真实构造函数。

在下面的例子中，我们没有定义任何初始化器，并多次调用了默认和参数化构造函数。然后，模拟的行为在构造后被定义。

我们正在验证确实创建了三个模拟对象，并且它们正在遵守我们预定义的模拟行为：

```java
@Test
void whenMultipleConstructorsInvoked_ThenMultipleMockObjectsShouldBeCreated(){
    try(MockedConstruction````<PaymentService>```` mockPaymentService = Mockito.mockConstruction(PaymentService.class)){
        PaymentProcessor paymentProcessor = new PaymentProcessor();
        PaymentProcessor secondPaymentProcessor = new PaymentProcessor();
        PaymentProcessor thirdPaymentProcessor = new PaymentProcessor("Debit");

        when(mockPaymentService.constructed().get(0).processPayment()).thenReturn("Credit");
        when(mockPaymentService.constructed().get(1).processPayment()).thenReturn("Online Banking");

        Assertions.assertEquals(3,mockPaymentService.constructed().size());
        Assertions.assertEquals("Credit", paymentProcessor.processPayment());
        Assertions.assertEquals("Online Banking", secondPaymentProcessor.processPayment());
        Assertions.assertNull(thirdPaymentProcessor.processPayment());
    }
}
```

## 7. 依赖注入和构造函数模拟

当我们使用依赖注入时，我们可以直接传递模拟对象，避免了模拟构造函数的需要。通过这种方法，我们可以在实例化被测试类之前模拟依赖项，消除了模拟任何构造函数的需要。

让我们在`PaymentProcessor`类中引入第三个构造函数，其中`PaymentService`作为依赖项注入：

```java
public PaymentProcessor(PaymentService paymentService) {
    this.paymentService = paymentService;
}
```

我们已经将依赖项从`PaymentProcessor`类中解耦，这允许我们在隔离状态下测试我们的单元，并通过模拟控制依赖项的行为，如下所示：

```java
@Test
void whenDependencyInjectionIsUsed_ThenMockObjectShouldBeCreated(){
    PaymentService mockPaymentService = Mockito.mock(PaymentService.class);
    when(mockPaymentService.processPayment()).thenReturn("Online Banking");
    PaymentProcessor paymentProcessor = new PaymentProcessor(mockPaymentService);
    Assertions.assertEquals("Online Banking", paymentProcessor.processPayment());
}
```

然而，在无法控制源代码中依赖项的管理方式的情况下，特别是当依赖注入不是一种选择时，`mockConstruction()`成为了有效模拟构造函数的有用工具。

## 8. 结论

这篇简短的文章展示了通过Mockito和PowerMock模拟构造函数的不同方式。我们还讨论了在可能的情况下优先考虑依赖注入的优势。

如常，代码可在GitHub上找到。
![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)