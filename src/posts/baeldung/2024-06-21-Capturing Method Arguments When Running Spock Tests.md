---
date: 2024-06-21
category:
  - Java
  - Spock
tag:
  - 测试
  - Groovy
head:
  - - meta
    - name: keywords
      content: Spock测试, 参数捕获, 测试驱动开发
---
# 使用Spock测试捕获方法参数

当我们测试代码时，有时我们想要捕获传递给方法的参数。

在本教程中，我们将学习如何使用Spock测试中的_Stubs_、_Mocks_和_Spies_来捕获参数，并检查我们捕获的内容。我们还将学习如何验证对同一_Mock_的多次调用使用不同的参数，并断言这些调用的顺序。

## 2. 我们测试的主题

首先，我们需要一个接受我们想要捕获的单个参数或参数的方法。

让我们创建一个_ArgumentCaptureSubject_类，它有一个_catchMeIfYouCan()_方法，该方法接受一个_String_并返回它，前面加上“Received ”：

```java
public class ArgumentCaptureSubject {
    public String catchMeIfYouCan(String input) {
        return "Received " + input;
    }
}
```

## 3. 准备我们的数据驱动测试

我们将从典型的_Stub_使用开始，并发展到捕获参数。

让我们创建一个我们类的_Stub_，返回一个“42”的存根响应，并调用它的_catchMeIfYouCan()_方法：

```groovy
def "given a Stub when we invoke it then we capture the stubbed response"() {
    given: "an input and a result"
    def input = "Input"
    def stubbedResponse = "42"

    and: "a Stub for our response"
    @Subject
    ArgumentCaptureSubject stubClass = Stub()
    stubClass.catchMeIfYouCan(_) >>> stubbedResponse

    when: "we invoke our Stub's method"
    def result = stubClass.catchMeIfYouCan(input)

    then: "we get our stubbed response"
    result == stubbedResponse
}
```

在这个例子中，我们使用了简单的_Stub_，因为我们没有验证任何方法调用。

现在我们有了基本的测试，让我们看看如何捕获我们用来调用我们方法的参数。

首先，我们将声明一个方法作用域变量，以便在捕获参数时分配：

```groovy
def captured
```

接下来，我们将静态_stubbedResponse_替换为Groovy_Closure_。**当Spock的存根方法被调用时，Spock会向我们的_Closure_传递一个方法参数的_List_。**

让我们创建一个简单的_Closure_来捕获参数列表并将其分配给我们的_captured_变量：

```groovy
{ arguments -> captured = arguments }
```

对于我们的断言，我们将断言捕获的参数列表中的第一个元素，即索引0，等于我们的输入：

```groovy
captured[0] == input
```

所以，让我们使用我们的_captured_变量声明，用我们的参数捕获_Closure_替换我们的_stubbedResponse_，并添加我们的断言：

```groovy
def "given a Stub when we invoke it then we capture the argument"() {
    given: "an input"
    def input = "Input"

    and: "a variable and a Stub with a Closure to capture our arguments"
    def captured
    @Subject
    ArgumentCaptureSubject stubClass = Stub()
    stubClass.catchMeIfYouCan(_) >>> { arguments -> captured = arguments }

    when: "we invoke our method"
    stubClass.catchMeIfYouCan(input)

    then: "we captured the method argument"
    captured[0] == input
}
```

当我们想要返回一个_stubbedResponse_以及捕获参数时，我们更新我们的_Closure_以返回它：

```groovy
{ arguments -> captured = arguments; return stubbedResponse }

...
then: "what we captured matches the input and we got our stubbed response"
captured == input
result == stubbedResponse
```

请注意，尽管我们使用了“_return_”以清晰起见，但这并不严格必要，因为Groovy闭包默认返回最后执行语句的结果。

当我们只对捕获其中一个参数感兴趣时，**我们可以通过在_Closure_中使用其索引来捕获我们想要的参数：**

```groovy
{ arguments -> captured = arguments[0] }

...
then: "what we captured matches the input"
captured == input
```

在这种情况下，我们的_captured_变量将与我们的参数类型相同——一个_String_。

## 5. 使用Spies捕获

**当我们想要捕获一个值，但也希望方法继续执行时，我们在_Spy_的_callRealMethod()_中添加一个调用。**

让我们更新我们的测试以使用_Spy_而不是_Stub_，并在_Closure_中使用_Spy_的_callRealMethod()_：

```groovy
def "given a Spy when we invoke it then we capture the argument and then delegate to the real method"() {
    given: "an input string"
    def input = "Input"

    and: "a variable and a Spy with a Closure to capture the first argument and call the underlying method"
    def captured
    @Subject
    ArgumentCaptureSubject spyClass = Spy()
    spyClass.catchMeIfYouCan(_) >>> { arguments -> captured = arguments[0]; callRealMethod() }

    when: "we invoke our method"
    def result = spyClass.catchMeIfYouCan(input)

    then: "what we captured matches the input and our result comes from the real method"
    captured == input
    result == "Received Input"
}
```

在这里，我们捕获了输入参数，而不影响方法的返回值。

**当我们想要在将其传递给真实方法之前更改捕获的参数时，我们在内部更新它，然后使用_Spy_的_callRealMethodWithArgs_来传递我们更新后的参数。**

所以，让我们更新我们的_Closure_，在将其传递给真实方法之前，将“Tampered: ”添加到我们的_String_之前：

```groovy
spyClass.catchMeIfYouCan(_) >>> { arguments -> captured = arguments[0]; callRealMethodWithArgs('Tampered:' + captured) }
```

让我们更新我们的断言，以期望我们被篡改的结果：

```groovy
result == "Received Tampered:Input"
```

## 6. 使用注入的Mock捕获参数

现在我们已经看到了如何使用Spock的模拟框架来捕获参数，让我们将这种技术应用到一个我们可以模拟的依赖类的类中。

首先，让我们创建一个_ArgumentCaptureDependency_类，我们的主体可以调用它的一个简单的_catchMe()_方法，该方法接受并修改一个_String_：

```java
public class ArgumentCaptureDependency {
    public String catchMe(String input) {
        return "***" + input + "***";
    }
}
```

现在，让我们更新_ArgumentCaptureSubject_类，添加一个构造函数，接受我们的_ArgumentCaptureDependency_。让我们还添加一个_callOtherClass_方法，该方法不接受参数，并使用参数调用我们的_ArgumentCaptureDependency_的_catchMe()_方法：

```java
public class ArgumentCaptureSubject {
    ArgumentCaptureDependency calledClass;

    public ArgumentCaptureSubject(ArgumentCaptureDependency calledClass) {
        this.calledClass = calledClass;
    }

    public String callOtherClass() {
        return calledClass.catchMe("Internal Parameter");
    }
}
```

最后，让我们像以前一样创建一个测试。这次，让我们在创建它时将一个_Spy_注入我们的_ArgumentCaptureSubject_，以便我们也可以_callRealMethod()_并比较结果：

```groovy
def "given an internal method call when we invoke our subject then we capture the internal argument and return the result of the real method"() {
    given: "a mock and a variable for our captured argument"
    ArgumentCaptureDependency spyClass = Spy()
    def captured
    spyClass.catchMe(_) >>> { arguments -> captured = arguments[0]; callRealMethod() }

    and: "our subject with an injected Spy"
    @Subject argumentCaptureSubject = new ArgumentCaptureSubject(spyClass)

    when: "we invoke our method"
    def result = argumentCaptureSubject.callOtherClass()

    then: "what we captured matches the internal method argument"
    captured == "Internal Parameter"
    result == "***Internal Parameter***"
}
```

我们的测试捕获了内部参数“_Internal Parameter_”。此外，我们对_Spy_的_callRealMethod_的调用确保我们没有影响方法的结果：_“***Internal Parameter***”_。

当我们不需要返回真实结果时，我们可以简单地使用_Stub_或_Mock_。

**请注意，当我们测试Spring应用程序时，我们可以使用Spock的@ _SpringBean_注解注入我们的_Mock_。**

## 7. 从多次调用中捕获参数

有时，我们的代码多次调用一个方法，我们想要捕获每次调用的值。

所以，让我们向我们的_ArgumentCaptureSubject_的_callOtherClass()_方法添加一个_String_参数。我们将使用不同的参数调用它并捕获它们。

```java
public String callOtherClass(String input) {
    return calledClass.catchMe(input);
}
```

我们需要一个集合来捕获每次调用的参数。所以，我们将声明一个_capturedStrings_变量作为一个_ArrayList_：

```groovy
def capturedStrings = new ArrayList()
```

现在，让我们创建我们的测试，并让它两次调用我们的_callOtherClass()_，首先使用“First”作为参数，然后使用“Second”：

```groovy
def "given a dynamic Mock when we invoke our subject then we capture the argument for each invocation"() {
    given: "a variable for our captured arguments and a mock to capture them"
    def capturedStrings = new ArrayList()
    ArgumentCaptureDependency mockClass = Mock()

    and: "our subject"
    @Subject argumentCaptureSubject = new ArgumentCaptureSubject(mockClass)

    when: "we invoke our method"
    argumentCaptureSubject.callOtherClass("First")
    argumentCaptureSubject.callOtherClass("Second")
}
```

现在，让我们添加一个_Closure_到我们的Mock，以捕获每次调用的参数并将其添加到我们的列表中。让我们还让我们的_Mock_通过将“2 \*”前缀到我们的语句来验证我们的方法被调用了两次：

```groovy
then: "our method was called twice and captured the argument"
2 * mockClass.catchMe(_ as String) >>> { arguments -> capturedStrings.add(arguments[0]) }
```

最后，让我们断言我们以正确的顺序捕获了两个参数：

```groovy
and: "we captured the list and it contains an entry for both of our input values"
capturedStrings[0] == "First"
capturedStrings[1] == "Second"
```

当我们不关心顺序时，我们可以使用_List_的_contains_方法：

```groovy
capturedStrings.contains("First")
```

## 8. 使用多个_Then_块

有时，我们想使用相同的方法断言不同参数的调用序列，但不需要捕获它们。Spock允许在同一个_then_块中的断言以任何顺序进行验证，所以我们编写它们的顺序并不重要。然而，我们可以通过添加多个_then_块来强制执行顺序。

**Spock验证一个_then_块中的断言在下一个_then_块中的断言之前满足。**

所以，让我们添加两个_then_块来验证我们的方法使用正确的参数以正确的顺序被调用：

```groovy
def "given a Mock when we invoke our subject twice then our Mock verifies the sequence"() {
    given: "a mock"
    ArgumentCaptureDependency mockClass = Mock()

    and: "our subject"
    @Subject argumentCaptureSubject = new ArgumentCaptureSubject(mockClass)

    when: "we invoke our method"
    argumentCaptureSubject.callOtherClass("First")
    argumentCaptureSubject.callOtherClass("Second")

    then: "we invoked our Mock with 'First' the first time"
    1 * mockClass.catchMe("First")

    then: "we invoked our Mock with 'Second' the next time"
    1 * mockClass.catchMe("Second")
}
```

当我们的调用顺序错误时，比如我们首先调用_callOtherClass("Second")_，Spock会给我们一个有用的消息：

```plaintext
Wrong invocation order for:

1 * mockClass.catchMe("First")   (1 invocation)

Last invocation: mockClass.catchMe('First')

Previous invocation:
    mockClass.catchMe('Second')
```

## 9. 结论

在本教程中，我们学习了如何使用Spock的_Stub_ s、_Mock_ s和_Spies_使用_Closure_ s来捕获方法参数。接下来，我们学习了如何使用_Spy_在调用真实方法之前更改捕获的参数。我们还学习了如何收集当方法被多次调用时的参数。最后，作为捕获参数的替代方案，我们学习了如何使用多个_then_块来检查我们的调用是否以正确的顺序发生。

像往常一样，本文的源代码可以在GitHub上找到。

OK