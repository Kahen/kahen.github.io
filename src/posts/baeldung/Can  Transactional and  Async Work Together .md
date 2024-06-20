---
date: 2024-06-19
category:
  - Spring
  - Java
tag:
  - Spring Framework
  - Asynchronous
  - Transactional
head:
  - - meta
    - name: keywords
      content: Spring, Java, Transactional, Async, Annotation, Data Consistency, Performance
---

# @Transactional 和 @Async 是否可以一起工作？ | Baeldung

## 1. 引言

在本文中，我们将探讨Spring框架中@Transactional和@Async注解之间的兼容性。

## 2. 理解 @Transactional 和 @Async

**@Transactional注解从许多其他代码块中创建一个原子代码块。因此，如果一个块以异常方式完成，所有部分都会回滚**。因此，只有当其所有部分都成功时，新创建的原子单元才会成功完成提交。

创建事务使我们能够避免代码中的部分失败，提高数据一致性。

另一方面，@Async告诉Spring，被注解的单元可以与调用线程并行运行。**换句话说，如果我们从线程调用一个@Async方法或类，Spring会在具有不同上下文的另一个线程中运行其代码**。

定义异步代码可以通过与调用线程并行执行单元来提高执行时间性能。

有些场景中我们需要代码中的性能和一致性。使用Spring，我们可以混合使用@Transactional和@Async来实现这两个目标，只要我们注意如何一起使用这些注解。

在接下来的部分中，我们将探讨不同的场景。

异步和事务代码可能会引入问题，例如如果我们没有正确实现它们，可能会导致数据不一致。

注意Spring的事务上下文和上下文之间的数据传播是充分利用@Async和@Transactional并避免陷阱的关键。

### 3.1. 创建演示应用程序

我们将使用银行服务的转账功能来说明事务和异步代码的使用。

简而言之，我们可以通过从一个账户中扣除金额并将其添加到另一个账户来实现资金转账。我们可以将其想象为数据库操作，例如选择涉及的账户并更新它们的余额：

```java
public void transfer(Long depositorId, Long favoredId, BigDecimal amount) {
    Account depositorAccount = accountRepository.findById(depositorId)
      .orElseThrow(IllegalArgumentException::new);
    Account favoredAccount = accountRepository.findById(favoredId)
      .orElseThrow(IllegalArgumentException::new);

    depositorAccount.setBalance(depositorAccount.getBalance().subtract(amount));
    favoredAccount.setBalance(favoredAccount.getBalance().add(amount));

    accountRepository.save(depositorAccount);
    accountRepository.save(favoredAccount);
}
```

我们首先使用findById()找到涉及的账户，并在给定ID找不到账户时抛出IllegalArgumentException。

然后，我们使用新金额更新检索到的账户。最后，我们使用CrudRepository的save()方法保存新更新的账户。

在这个简单的例子中，有一些潜在的失败。例如，我们可能找不到favoredAccount并以异常失败。或者，save()操作对depositorAccount完成但对favoredAccount失败。这些被定义为部分失败，因为失败之前发生的事情不能撤销。

**因此，如果我们没有正确地使用事务来管理我们的代码，部分失败会造成数据一致性问题**。例如，我们可能从一个账户中扣除了金额，但没有有效地将其传递到另一个账户。

### 3.2. 从 @Async 调用 @Transactional

**如果我们从@Async方法调用@Transactional方法，Spring会正确管理事务并传播其上下文**，确保数据一致性。

例如，让我们从@Async调用者调用一个@Transactional的transfer()方法：

```java
@Async
public void transferAsync(Long depositorId, Long favoredId, BigDecimal amount) {
    transfer(depositorId, favoredId, amount);

    // 其他与转账隔离的异步操作
}
```

```java
@Transactional
public void transfer(Long depositorId, Long favoredId, BigDecimal amount) {
    Account depositorAccount = accountRepository.findById(depositorId)
      .orElseThrow(IllegalArgumentException::new);
    Account favoredAccount = accountRepository.findById(favoredId)
      .orElseThrow(IllegalArgumentException::new);

    depositorAccount.setBalance(depositorAccount.getBalance().subtract(amount));
    favoredAccount.setBalance(favoredAccount.getBalance().add(amount));

    accountRepository.save(depositorAccount);
    accountRepository.save(favoredAccount);
}
```

_transferAsync()_方法由于是@Async，与调用线程并行在不同上下文中运行。

然后，我们调用事务性的_transfer()_方法来运行关键的业务逻辑。在这种情况下，Spring正确地将_transferAsync()_线程上下文传播到_transfer()_。因此，我们在那次交互中不会丢失任何数据。

_transfer()_方法定义了一组关键的数据库操作，如果发生故障则必须回滚。Spring只处理_transfer()_事务，这将所有代码隔离在_transfer()_体之外，不参与事务。因此，如果发生故障，Spring只会回滚_transfer()_代码。

**从@Async方法调用@Transactional可以提高性能，通过与调用线程并行执行操作，而不在特定内部操作中出现数据不一致**。

### 3.3. 从 @Transactional 调用 @Async

Spring目前使用ThreadLocal来管理当前线程事务。因此，它不会在应用程序的不同线程之间共享线程上下文。

**因此，如果一个@Transactional方法调用一个@Async方法，Spring不会传播事务的相同线程上下文**。

为了说明，让我们在transfer()内部添加一个对异步printReceipt()方法的调用：

```java
@Async
public void transferAsync(Long depositorId, Long favoredId, BigDecimal amount) {
    transfer(depositorId, favoredId, amount);
}
```

```java
@Transactional
public void transfer(Long depositorId, Long favoredId, BigDecimal amount) {
    Account depositorAccount = accountRepository.findById(depositorId)
      .orElseThrow(IllegalArgumentException::new);
    Account favoredAccount = accountRepository.findById(favoredId)
      .orElseThrow(IllegalArgumentException::new);

    depositorAccount.setBalance(depositorAccount.getBalance().subtract(amount));
    favoredAccount.setBalance(favoredAccount.getBalance().add(amount));

    printReceipt();
    accountRepository.save(depositorAccount);
    accountRepository.save(favoredAccount);
}
```

```java
@Async public void printReceipt() { // 使用转账结果打印收据的逻辑 }
```

_transfer()_逻辑与之前相同，但现在我们调用printReceipt()打印转账结果。由于printReceipt()是@Async，Spring会在另一个具有不同上下文的线程上运行其代码。

问题是收据信息依赖于正确执行整个_transfer()_方法。此外，_printReceipt()_和_transfer()_代码中保存到数据库的其他部分在不同线程上使用不同的数据运行，使得应用程序的行为变得不可预测。例如，我们可能会打印一个没有成功保存到数据库的货币转账交易的结果。

**因此，为了避免那种数据一致性问题，我们必须避免从@Transactional调用@Async方法，因为线程上下文传播不会发生**。

### 3.4. 在类级别使用 @Transactional

使用@Transactional定义类会使Spring事务管理对其所有公共方法都可用。因此，该注解一次为所有方法创建事务。

使用类级别@Transactional时可能会发生的一件事是在同一方法中混合使用@Async。实际上，我们正在创建一个事务单元，该单元在与调用线程不同的线程上运行：

```java
@Transactional
public class AccountService {
    @Async
    public void transferAsync() {
        // 这是一个异步和事务性的方法
    }

    public void transfer() {
        // 事务性方法
    }
}
```

在示例中，_transferAsync()_方法是事务性和异步的。因此，它定义了一个事务单元，并在不同的线程上运行。因此，它可用于事务管理，但与调用线程的上下文不同。

因此，如果发生故障，_transferAsync()_内部的代码会回滚，因为它是@Transactional。然而，由于该方法也是@Async，Spring不会将调用上下文传播给它。**因此，在故障场景中，Spring不会像我们调用一系列仅事务性方法时那样回滚_transferAsync()_之外的任何代码**。因此，这与从@Transactional调用@Async时遇到的数据完整性问题相同。

类级别注释对于编写较少的代码以创建定义一系列完全事务性方法的类非常有用。

**然而，这种混合的事务和异步行为在调试代码时可能会造成混淆**。例如，我们期望在发生故障时，一系列仅事务性方法调用中的所有代码都被回滚。然而，如果该序列中的一个方法也是@Async，行为就会出乎意料。

## 4. 结论

在本教程中，我们从数据完整性的角度学习了何时可以安全地一起使用@Transactional和@Async注解。

通常，**从@Async方法调用@Transactional保证数据完整性**，因为Spring正确地传播了相同的上下文。

另一方面，当**从@Transactional调用@Async时，我们可能会遇到数据完整性问题**。

如常，源代码可在GitHub上获得。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。

OK
