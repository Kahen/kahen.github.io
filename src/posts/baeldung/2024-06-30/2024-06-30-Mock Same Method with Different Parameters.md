---
date: 2024-07-01
category:
  - Java
  - 编程
tag:
  - 测试
  - 模拟
head:
  - - meta
    - name: keywords
      content: Java, 模拟, Mockito, 测试
---
# Java中模拟相同方法的不同参数

当在Java中模拟一个方法时，根据传入的参数接收不同的响应可能是有用的。在本文中，我们将根据不同的复杂性要求，探讨实现这一目标的不同方式。

## 2. 设置

首先，**让我们创建一个我们想要模拟的示例服务**：

```java
class ExampleService {
    int getValue(int arg){
        return 1;
    }
}
```

我们得到了一个非常简单的服务，它有一个单一的方法。该方法有一个整数作为参数，并返回一个整数。注意，参数和返回值之间没有关系，所以默认情况下，它总是返回1。

## 3. 连续Stubbing的限制

让我们看看连续Stubbing以及我们能用它做什么和不能做什么。**我们可以使用连续Stubbing来获取我们的模拟的不同的参数，而不管我们提供了什么输入。** 这显然缺乏对匹配特定输入到期望输出的控制，但在许多情况下都很有用。要做到这一点，我们将想要Stub的方法传递给_when()_。然后我们链式调用_thenReturn()_，提供我们想要的顺序的响应：

```java
@Test
void givenAMethod_whenUsingConsecutiveStubbing_thenExpectResultsInOrder(){
    when(exampleService.getValue(anyInt())).thenReturn(9, 18, 27);
    assertEquals(9, exampleService.getValue(1));
    assertEquals(18, exampleService.getValue(1));
    assertEquals(27, exampleService.getValue(1));
    assertEquals(27, exampleService.getValue(1));
}
```

**我们从断言中可以看到，尽管总是以1作为参数，但我们按顺序收到了预期的值**。一旦所有值都返回了，所有未来的调用将返回最后一个值，就像我们在测试中的第四个调用看到的那样。

## 4. 为不同参数Stubbing调用

**我们可以扩展我们对_when()_和_thenReturn()_的使用，以返回不同参数的不同值**：

```java
@Test
void givenAMethod_whenStubbingForMultipleArguments_thenExpectDifferentResults() {
    when(exampleService.getValue(10)).thenReturn(100);
    when(exampleService.getValue(20)).thenReturn(200);
    when(exampleService.getValue(30)).thenReturn(300);

    assertEquals(100, exampleService.getValue(10));
    assertEquals(200, exampleService.getValue(20));
    assertEquals(300, exampleService.getValue(30));
}
```

_when()_的参数是我们想要Stub的方法，以及我们想要指定响应的值。通过将对_when()_的调用与_thenReturn()_链式起来，我们已经指示模拟在接收到正确的参数时返回请求的值。我们可以自由地将这些应用到我们的模拟中，以处理一系列输入。每次提供预期的输入值时，我们都会收到请求的返回值。

## 5. 使用_thenAnswer()

**一个更复杂的选项，提供最大控制，是使用_thenAnswer()_。** 这允许我们获取参数，对它们执行我们想要的任何计算，然后在与模拟交互时返回将被输出的值：

```java
@Test
void givenAMethod_whenUsingThenAnswer_thenExpectDifferentResults() {
    when(exampleService.getValue(anyInt())).thenAnswer(invocation -> {
        int argument = (int) invocation.getArguments()[0];
        int result;
        switch (argument) {
        case 25:
            result = 125;
            break;
        case 50:
            result = 150;
            break;
        case 75:
            result = 175;
            break;
        default:
            result = 0;
        }
        return result;
    });
    assertEquals(125, exampleService.getValue(25));
    assertEquals(150, exampleService.getValue(50));
    assertEquals(175, exampleService.getValue(75));
}
```

在上面，我们使用提供的invocation对象上的_getArguments()_获取了参数。我们假设这里有一个单一的整数参数，但我们本可以处理几种不同类型的参数。我们还可以检查至少有一个参数，并且将参数转换为整数是成功的。为了展示能力，我们使用_switch_语句根据输入返回不同的值。在底部，我们可以看到从断言中，我们的模拟服务返回了_switch_语句的结果。

这个选项允许我们用单个_when()_调用处理无限数量的输入。牺牲的是测试的可读性和可维护性。

## 6. 结论

在本教程中，我们看到了三种配置模拟方法以返回不同值的方式。我们看了连续Stubbing，发现它对于按顺序返回已知值对于任何输入都很有用，但除此之外非常有限。使用_when()_结合_thenReturn()_对于每个可能的输入提供了一个简单的解决方案，具有改进的控制。或者，我们可以使用_thenAnswer()_来获得对给定输入和期望输出之间关系的最大程度的控制。根据测试要求，这三种都是有用的。

像往常一样，示例的完整代码可以在GitHub上找到。翻译已完成，以下是剩余部分：

## 6. 结论

在本教程中，我们探讨了三种配置模拟方法以返回不同值的方式。我们研究了连续Stubbing，发现它在返回任何输入的顺序已知值方面非常有用，但除此之外功能有限。使用结合了_thenReturn()_的_when()_为每个潜在的输入提供了一个更简单的解决方案，并且控制力更强。另外，我们可以使用_thenAnswer()_来获得对输入和期望输出之间关系的最大程度的控制。根据测试需求，这三种方法都很有用。

如往常一样，示例的完整代码可以在GitHub上找到。

OK