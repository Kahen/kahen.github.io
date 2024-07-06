---
date: 2024-07-06
category:
  - Java
  - 编程
tag:
  - Java 20
  - Scoped Values
head:
  - - meta
    - name: keywords
      content: Java 20, Scoped Values, 线程安全, 线程局部变量, Java新特性
---
# Java 20中的范围值 | Baeldung

范围值使开发人员能够在线程内部和跨线程存储和共享不可变数据。这个新API是在Java 20中作为孵化器预览特性引入的，由JEP 439提出。

在本教程中，我们将首先将范围值与线程局部变量进行比较，后者是一个旧的API，具有类似的目的。然后，我们将看看如何应用范围值在线程之间共享数据，重新绑定值，以及在子线程中继承它们。接下来，我们将看看如何在经典Web框架中应用范围值。

最后，我们将看看如何在Java 20中启用这个孵化器特性以进行实验。

## 2. 动机

复杂的Java应用程序通常包含需要在它们之间共享数据的几个模块和组件。当这些组件在多个线程中运行时，开发人员需要一种在它们之间共享不可变数据的方式。

然而，**不同的线程可能需要不同的数据，并且不应该能够访问或覆盖其他线程拥有的数据**。

### 2.1. 线程局部变量

自Java 1.2以来，我们可以利用线程局部变量在组件之间共享数据，而无需使用方法参数。线程局部变量实际上是一种特殊类型的变量_ThreadLocal_。

尽管它们看起来像普通变量，但**线程局部变量有多个实例，每个线程一个**。将使用的特定实例取决于哪个线程调用getter或setter方法来读取或写入其值。

线程局部变量通常被声明为公共静态字段，以便许多组件可以轻松访问。

### 2.2. 缺点

尽管线程局部变量自1998年以来就已可用，但**API包含三个主要的设计缺陷**。

首先，每个线程局部变量都是可变的，并且允许任何代码随时调用setter方法。因此，数据可以在组件之间以任何方向流动，使得很难理解哪个组件更新了共享状态以及更新的顺序。

其次，当我们使用_set_方法写入线程的实例时，数据将保留整个线程的生命周期，或者直到线程调用_remove_方法。如果开发人员忘记调用_remove_方法，数据将在内存中保留比必要的时间更长。

最后，父线程的线程局部变量可以被子线程继承。当我们创建一个继承线程局部变量的子线程时，新线程将需要为所有父线程局部变量分配额外的存储空间。

### 2.3. 虚拟线程

线程局部变量的缺点在Java 19中引入虚拟线程后变得更加紧迫。

虚拟线程是由JDK而不是操作系统管理的轻量级线程。因此，许多虚拟线程共享相同的操作系统线程，允许开发人员使用大量的虚拟线程。

由于虚拟线程是_Thread_的实例，它们可能会使用线程局部变量。然而，如果**百万个虚拟线程有可变的线程局部变量，内存占用可能会很大**。

因此，Java 20引入了范围值API作为解决方案，以维护不可变和可继承的每个线程数据，支持数百万虚拟线程。

范围值使**在组件之间安全高效地共享不可变数据**成为可能，而无需使用方法参数。它们是与虚拟线程和结构化并发一起开发的，作为Loom项目的一部分。

### 3.1. 在线程之间共享数据

与线程局部变量类似，范围值使用多个实例，每个线程一个。它们通常也被声明为公共静态字段，可以被许多组件轻松访问：

```java
public final static ScopedValue```<User>``` LOGGED_IN_USER = ScopedValue.newInstance();
```

另一方面，**范围值只写一次，然后是不可变的**。范围值仅在线程执行的有限期间内可用：

```java
ScopedValue.where(LOGGED_IN_USER, user.get()).run(
  () -> service.getData()
);
```

_where_方法需要一个范围值和一个对象，它应该绑定到该对象。当调用_run_方法时，范围值被绑定，创建了一个当前线程独有的实例，然后执行lambda表达式。

在_run_方法的生命周期内，任何方法，无论是直接还是间接从表达式调用，都有能力读取范围值。然而，当_run_方法完成后，绑定被销毁。

范围变量的有限生命周期和不可变性有助于简化对线程行为的推理。不可变性有助于确保更好的性能，并且数据只在一个方向上传输：从调用者到被调用者。

### 3.2. 继承范围值

范围值是**自动被子线程继承的，这些子线程是使用_StructuredTaskScope_创建的**。子线程可以使用在父线程中为范围值建立的绑定：

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future`<Optional```````<Data>````````> internalData = scope.fork(
      () -> internalService.getData(request)
    );
    Future`<String>` externalData = scope.fork(externalService::getData);
    try {
        scope.join();
        scope.throwIfFailed();

        Optional```````<Data>``````` data = internalData.resultNow();
        // 在响应中返回数据并设置适当的HTTP状态
    } catch (InterruptedException | ExecutionException | IOException e) {
        response.setStatus(500);
    }
}
```

在这种情况下，我们仍然可以从通过_fork_方法创建的子线程中运行的服务访问范围值。然而，与线程局部变量不同，没有从父线程到子线程的范围值复制。

### 3.3. 重新绑定范围值

由于范围值是不可变的，它们不支持用于更改存储值的_set_方法。然而，我们可以**在有限代码段的调用中重新绑定范围值**。

例如，我们可以使用_where_方法通过将范围值设置为_null_来隐藏在_run_中调用的方法的范围值：

```java
ScopedValue.where(Server.LOGGED_IN_USER, null).run(service::extractData);
```

然而，一旦该代码段终止，原始值将再次可用。我们应该注意到_run_方法的返回类型是void。如果我们的服务返回一个值，我们可以利用_call_方法来启用返回值的处理。

## 4. Web示例

现在让我们看看如何在经典Web框架用例中应用范围值，以共享登录用户的数据。

### 4.1. 经典Web框架

Web服务器在传入请求上对用户进行身份验证，并**使登录用户的数据可用于处理请求的代码**：

```java
public void serve(HttpServletRequest request, HttpServletResponse response) throws InterruptedException, ExecutionException {
    Optional```<User>``` user = authenticateUser(request);
    if (user.isPresent()) {
        Future`<?>` future = executor.submit(() ->
          controller.processRequest(request, response, user.get())
        );
        future.get();
    } else {
        response.setStatus(401);
    }
}
```

处理请求的控制器通过方法参数接收登录用户的数据：

```java
public void processRequest(HttpServletRequest request, HttpServletResponse response, User loggedInUser) {
    Optional```````<Data>``````` data = service.getData(request, loggedInUser);
    // 在响应中返回数据并设置适当的HTTP状态
}
```

服务也从控制器接收登录用户的数据，但它不使用它。相反，它只是将信息传递给仓库：

```java
public Optional```````<Data>``````` getData(HttpServletRequest request, User loggedInUser) {
    String id = request.getParameter("data_id");
    return repository.getData(id, loggedInUser);
}
```

在仓库中，我们最终使用登录用户的数据来检查用户是否具有足够的权限：

```java
public Optional```````<Data>``````` getData(String id, User loggedInUser) {
    return loggedInUser.isAdmin()
      ? Optional.of(new Data(id, "Title 1", "Description 1"))
      : Optional.empty();
}
```

在一个更复杂的Web应用程序中，请求处理可以扩展到大量的方法。即使登录用户的数据只在少数方法中需要，我们可能需要通过所有方法传递它。

使用方法参数传递信息将使我们的代码变得嘈杂，我们很快就会超过每方法推荐三个参数的限制。

### 4.2. 应用作用域值

一种替代方法是将登录用户的数据存储在一个可以从任何方法访问的**作用域值**中：

```java
public void serve(HttpServletRequest request, HttpServletResponse response) {
    Optional```<User>``` user = authenticateUser(request);
    if (user.isPresent()) {
        ScopedValue.where(LOGGED_IN_USER, user.get())
                .run(() -> controller.processRequest(request, response));
    } else {
        response.setStatus(401);
    }
}
```

我们现在可以从所有方法中移除_loggedInUser_参数：

```java
public void processRequest(HttpServletRequest request, HttpServletResponse response) {
    Optional```````<Data>``````` data = internalService.getData(request);
    // 在响应中返回数据并设置适当的HTTP状态
}
```

我们的服务不需要关心将登录用户的数据传递给仓库：

```java
public Optional```````<Data>``````` getData(HttpServletRequest request) {
    String id = request.getParameter("data_id");
    return repository.getData(id);
}
```

相反，仓库可以通过调用作用域值的_get_方法来检索登录用户的数据：

```java
public Optional```````<Data>``````` getData(String id) {
    User loggedInUser = Server.LOGGED_IN_USER.get();
    return loggedInUser.isAdmin()
      ? Optional.of(new Data(id, "Title 1", "Description 1"))
      : Optional.empty();
}
```

在这个例子中，应用作用域变量确保了我们的代码更具可读性和可维护性。

