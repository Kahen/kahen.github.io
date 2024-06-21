---
date: 2024-06-22
category:
  - Kotlin
  - 编程
tag:
  - 函数式编程
  - Railway Oriented Programming
head:
  - - meta
    - name: keywords
      content: Kotlin, 函数式编程, Railway Oriented Programming, 错误处理
---
# 用 Kotlin 实现铁路导向编程

在本教程中，我们将实现 Scott Wlaschin 创造的铁路导向编程（ROP），ROP 帮助我们使用函数式编程（FP）编写带有验证、日志记录、网络和服务错误以及其他副作用的代码。

ROP 中的“快乐路径”指的是代码在没有异常和错误的情况下运行的路径。“不快乐或失败路径”是当一些异常和错误由开发人员处理时。我们将解释如何在 FP 中使用 ROP 来处理成功和失败的路径。

假设我们有一个函数，它从用户那里接收客户详细信息，如姓名和电子邮件地址。然后它创建 _Customer_ 对象以保存到数据库中。

让我们看看快乐路径是什么样子的：

```kotlin
val input = read()
val customer = parse(input)
saveCustomer(customer)
```

以下是 _parse_ 和 _saveCustomer_ 函数。

```kotlin
fun parse(inp: List```<String>```): Customer {
    return Customer(inp.get(0), inp.get(1))
}

fun saveCustomer(customer: Customer): Unit {
    return println("Customer successfully saved." + customer)
}
```

以下是我们在解析输入后的不快乐路径调用的验证函数：

```kotlin
fun validateCustomerName(inpName: String): Boolean {
    if (inpName.length < 10){
        return false
    } else {
        return true
    }
}

fun validateCustomerEmail(inpEmail: String): Boolean {
    if (inpEmail.contains("@")) {
        return true
    } else {
        return false
    }
}
```

不快乐路径包括在保存客户对象时处理失败的验证：

```kotlin
val customer = parse(read())
val validatedCustomerName = validateCustomerName(customer.name)
val validatedCustomerEmail = validateCustomerEmail(customer.email)

if (validatedCustomerName && validatedCustomerEmail) {
    save(customer)
} else if (!validatedCustomerName) {
    println("Validation Error: invalid name, the name length must be 10 characters or more")
} else if (!validatedCustomerEmail) {
    println("Validation Error: invalid email, the email must contain '@' symbol.")
}
```

不快乐路径可以迅速累积，例如，在异常处理的情况下：

```kotlin
if (validatedCustomerName && validatedCustomerEmail) {
    try {
        save(customer)
    } catch(pe: PersistenceException) {
        println("Exception while saving the customer DAO into database.")
    } else if (!validatedCustomerName) {
        println("Validation Error: invalid name, the name length must be 20 characters or more")
    } else if (!validatedCustomerEmail) {
        println("Validation Error: invalid email, the email must contain '@' symbol.")
    }
}
```

随着不快乐路径数量的增加，这增加了出现意外状态的可能性。然后，我们需要单元测试来通过详尽地测试快乐和不快乐路径来提高代码的信心。

ROP 提供了一种处理快乐和不快乐路径的函数式方法。

### 3. Kotlin 中的铁路导向编程

ROP 的主要原理是，像铁路岔道一样，每个函数都返回一个成功或失败的 _Result_ 类型。在我们的示例中，_parse,_ _validateCustomerName,_ _validateCustomerEmail_ 和 _save(customer)_ 有 _Success_ 和 _Failure_ 的结果。

让我们重写 _save, error,_ _parse,_ _validateCustomerName_ 和 _validateCustomerEmail_ 函数：

```kotlin
private fun parse(inp: List```<String>```): Result``<Customer>`` {
    return Success(Customer(inp.get(0), inp.get(1)))
}

private fun validateCustomerName(customer: Customer): Result``<Customer>`` {
    if (customer.name.length < 10) {
        return Failure("Name validation failed; name length must be greater than 10 characters")
    } else {
        return Success(customer)
    }
}

private fun validateCustomerEmail(customer: Customer): Result``<Customer>`` {
    if (customer.emailAddress.contains("@")) {
        return Success(customer)
    } else {
        return Failure("Email validation failed; email must contain the '@' symbol")
    }
}

private fun saveCustomer(customer: Customer): Result```<String>``` {
    return Success("Customer successfully saved: " + customer)
}

private fun error(message: String): Failure```<String>``` {
    return Failure("Error: ${message}")
}
```

函数现在返回 _Result_ 类型，定义如下：

```kotlin
sealed class Result`````````<T>`````````
data class Success`````````<T>`````````(val value: T) : Result`````````<T>`````````()
data class Failure`````````<T>`````````(val errorMessage: String) : Result`````````<T>`````````()

infix fun `<T, U>` Result`````````<T>`````````.then(f: (T) -> Result`<U>`) =
    when (this) {
        is Success -> f(this.value)
        is Failure -> Failure(this.errorMessage)
    }

infix fun `````````<T>````````` Result`````````<T>`````````.otherwise(f: (String) -> Failure`````````<T>`````````) =
    when (this) {
        is Success -> Success(this.value)
        is Failure -> f(this.errorMessage)
    }
```

_Result_ 类型是一个带有 _Success_ 和 _Failure_ 两个子类型的参数化类型，它们包装了底层结果。

在 _Result_ 对象上定义的中缀 _then_ 函数将一系列函数沿着快乐路径串联起来：

```kotlin
Success(args.toList()) then ::parse then ::validateCustomerName
  then ::validateCustomerEmail then ::saveCustomer
```

**我们仅在前一个函数返回 _Success_ 时，才将 _then_ 函数应用于当前函数的 _Result_。**

中缀 _otherwise_ 函数在快乐路径失败时执行上面定义的 _error_ 函数：

```kotlin
Success(args.toList()) then ::parse then ::validateCustomerName
  then ::validateCustomerEmail then ::saveCustomer otherwise ::error
```

**_otherwise_ 在快乐路径的任何失败点调用 _error_ 函数并返回错误。**

### 4. 结论

在本教程中，我们使用 ROP 展示了如何使用 FP 构建弹性、健壮和容错的应用程序。_Result_ 类型使我们能够避免编写复杂的嵌套 if/else 和 try/catch 语句，同时不损害错误处理。快乐路径清晰可见，同时我们仍然处理不快乐路径的错误。

如常，本文中使用的所有完整代码示例可在 GitHub 上找到。