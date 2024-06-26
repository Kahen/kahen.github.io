---
date: 2024-06-26
category:
  - Java
  - Testing
tag:
  - Mockito
  - Lambda Expression
  - Testing
head:
  - - meta
    - name: keywords
      content: Java, Mockito, Lambda Expression, Unit Testing, Tutorial
---

# 使用Mockito验证Lambda表达式被调用

## 1. 概述

在本教程中，我们将探讨如何测试我们的代码是否调用了Lambda函数。实现此目标有两种方法。首先，我们将检查Lambda是否使用正确的参数被调用。然后，我们将关注测试行为，检查Lambda代码是否执行并产生了预期的结果。

## 2. 被测试的示例类

首先，让我们创建一个名为_LambdaExample_的类，它包含一个我们将调用_bricksList_的_ArrayList_：

```java
class LambdaExample {
    ArrayList``<String>`` bricksList = new ArrayList<>();
}
```

现在，让我们添加一个名为_BrickLayer_的内部类，它将为我们添加砖块：

```java
class LambdaExample {
    BrickLayer brickLayer = new BrickLayer();

    class BrickLayer {
        void layBricks(String bricks) {
            bricksList.add(bricks);
        }
    }
}
```

_BrickLayer_并没有做太多事情。它有一个名为_layBricks()_的单一方法，将为我们向我们的_List_添加一块砖。这可以是一个外部类，但为了保持概念的集中和简单，内部类在这里起作用。

最后，我们可以向_LambdaExample_添加一个方法，通过Lambda调用_layBricks()_：

```java
void createWall(String bricks) {
    Runnable build = () -> brickLayer.layBricks(bricks);
    build.run();
}
```

再次，我们保持事情简单。我们的现实世界应用程序更加复杂，但这个简化的示例将帮助解释测试方法。

在接下来的部分中，我们将测试调用_createWall()_是否会导致Lambda内预期的_layBricks()_执行。

## 3. 测试正确的调用

**我们首先要看的测试方法是基于确认Lambda在我们期望的时候被调用。** 此外，我们需要确认它接收到了正确的参数。首先，我们需要为_BrickLayer_和_LambdaExample_创建Mocks：

```java
@Mock
BrickLayer brickLayer;
@InjectMocks
LambdaExample lambdaExample;
```

我们对_LambdaExample_应用了_@InjectMocks_注解，以便它使用模拟的_BrickLayer_对象。由于这个原因，我们将能够确认对_layBricks()_方法的调用。

现在我们可以编写我们的测试：

```java
@Test
void whenCallingALambda_thenTheInvocationCanBeConfirmedWithCorrectArguments() {
    String bricks = "red bricks";
    lambdaExample.createWall(bricks);
    verify(brickLayer).layBricks(bricks);
}
```

在这个测试中，我们定义了我们想要添加到_bricksList_的_String_，并将其作为参数传递给_createWall()_。让我们记住，我们使用的是我们之前创建的Mock作为_LambdaExample_的实例。

然后我们使用了Mockito的_verify()_函数。**_Verify()_对于这种测试非常有帮助。它确认了函数_layBricks()_被调用，并且参数是我们期望的。**

_verify()_可以做更多的事情。例如，确认一个方法被调用了多少次。对于我们的目的，确认我们的Lambda按预期调用了方法是足够的。

## 4. 测试正确的行为

我们可以走的第二条测试路线是不去担心什么被调用以及何时被调用。**相反，我们将确认Lambda函数的预期行为发生了。** 我们几乎总是有一个很好的理由来调用一个函数。也许是为了执行一个计算或获取或设置一个变量。

在我们的示例中，Lambda向一个_ArrayList_添加了一个给定的_String_。在这一部分，让我们验证Lambda是否成功执行了这项任务：

```java
@Test
void whenCallingALambda_thenCorrectBehaviourIsPerformed() {
    LambdaExample lambdaExample = new LambdaExample();
    String bricks = "red bricks";

    lambdaExample.createWall(bricks);
    ArrayList``<String>`` bricksList = lambdaExample.getBricksList();

    assertEquals(bricks, bricksList.get(0));
}
```

在这里，我们创建了一个_LambdaExample_类的实例。接下来，我们调用_createWall()_向_ArrayList_添加一块砖。

现在我们应该看到_bricksList_包含了我们刚刚添加的_String_。假设代码正确执行了Lambda。我们通过从_lambdaExample_检索_bricksList_并检查内容来确认这一点。

我们可以得出结论，Lambda正在按预期执行，因为这是我们的String可能最终进入_ArrayList_的唯一方式。

## 5. 结论

在本文中，我们探讨了测试Lambda调用的两种方法。第一种在我们能够模拟包含函数的类并将其注入到调用它的类中时非常有用。在这种情况下，我们可以使用Mockito来验证函数调用和正确的参数。然而，这并不能保证Lambda继续做了我们期望的事情。

另一种选择是测试Lambda在被调用时是否产生了预期的结果。这提供了更多的测试覆盖率，如果能够简单地访问并确认函数调用的正确行为，通常更可取。

一如既往，示例的完整代码可以在GitHub上找到。