---
date: 2024-07-11
category:
  - RxJava
  - 编程
tag:
  - RxJava
  - 编程
  - 性能优化
head:
  - - meta
    - name: keywords
      content: RxJava, Single.just(), Single.fromCallable(), 性能优化, 编程
---
# RxJava Single.just() 与 Single.fromCallable() 的比较

在这篇简短的教程中，我们将比较在RxJava中创建一个_Single_对象的两种流行方式，并将使用_TestSubscriber_来测试这些实现。首先，我们将看到_Single.just()_工厂方法，并急切地使用它来创建对象的实例。之后，我们将学习_Single.fromCallable()_，并看看如何使用它来提高性能。

_Single.just()_是创建一个_Observable_实例的直接方式。它接受一个对象作为参数，并将其包装在RxJava的_Single_中：
```
Single```````<String>``````` employee = Single.just("John Doe");
```

然而，大多数情况下，我们会以某种方式检索或计算这些数据。为了演示，让我们假设我们正在从_EmployeeRepository_类中检索员工的姓名。为了测试，我们将使用Mockito来检查与这个仓库的交互，并使用_TestSubscriber_来测试由此产生的可观察值发布的值：
```
@Test
void givenASubscriber_whenUsingJust_thenReturnTheCorrectValue() {
    TestSubscriber```````<String>``````` testSubscriber = new TestSubscriber<>();
    Mockito.when(repository.findById(123L)).thenReturn("John Doe");

    Single```````<String>``````` employee = Single.just(repository.findById(123L));
    employee.subscribe(testSubscriber);

    testSubscriber.assertValue("John Doe");
    testSubscriber.assertCompleted();
}
```

正如预期的那样，_testSubscriber_发布的值与仓库返回的值相同。另一方面，即使没有订阅者，数据仍然会被检索。让我们使用Mockito来验证与_EmployeeRepostory_的交互次数：
```
@Test
void givenNoSubscriber_whenUsingJust_thenDataIsFetched() {
    Mockito.when(repository.findById(123L)).thenReturn("John Doe");

    Single```````<String>``````` employee = Single.just(repository.findById(123L));

    Mockito.verify(repository, times(1)).findById(123L);
}
```

### 3. _Single.fromCallable()_

作为替代方案，我们可以使用_Single.fromCallable()_。在这种情况下，我们需要提供一个_Callable_接口的实现或一个lambda表达式。换句话说，我们可以传递一个将检索数据的函数，并且这个函数只有在有人订阅时才会被调用。因此，如果没有订阅者，就不会与_仓库_交互：
```
@Test
void givenNoSubscriber_whenUsingFromCallable_thenNoDataIsFetched() {
    Single```````<String>``````` employee = Single.fromCallable(() -> repository.findById(123L));

    Mockito.verify(repository, never()).findById(123L);
}
```

但是，一旦有人订阅了_employee_，数据就会被检索然后发布。让我们添加另一个测试并检查结果的_Single_对象是否发布了正确的值：
```
@Test
void givenASubscriber_whenUsingFromCallable_thenReturnCorrectValue() {
    TestSubscriber```````<String>``````` testSubscriber = new TestSubscriber<>();
    Mockito.when(repository.findById(123L)).thenReturn("John Doe");

    Single```````<String>``````` employee = Single.fromCallable(() -> repository.findById(123L));
    employee.subscribe(testSubscriber);

    Mockito.verify(repository, times(1)).findById(123L);
    testSubscriber.assertCompleted();
    testSubscriber.assertValue("John Doe");
}
```

### 4. 结论

在这篇文章中，我们比较了_Single_的_just()_和_fromCallable()_工厂方法。我们了解到，如果我们想要利用懒加载评估来获取数据，我们应该使用_fromCallable()_选项。

项目的全部源代码，包括这里使用的所有代码示例，可以在GitHub上找到。