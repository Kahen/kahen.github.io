---
date: 2022-12-01
category:
  - Java
tag:
  - Java Generics
  - PECS
head:
  - - meta
    - name: keywords
      content: Java, Generics, PECS, Producer, Consumer
------
# Java泛型PECS规则 - 生产者扩展消费者超类 | Baeldung

在本文中，我们将探讨在处理集合的生产和消费时Java泛型的使用。

我们还将讨论_extends_和_super_关键字，并查看几个PECS（生产者扩展消费者超类）规则的例子，以确定如何正确使用这些关键字。

对于本文中的代码示例，我们将使用一个简单的数据模型，其中有一个_User_基类和两个扩展它的类：_Operator_和_Customer_。

**重要的是要从集合的角度应用PECS规则。** 换句话说，如果我们遍历一个_List_并处理其元素，列表将作为我们逻辑的生产者：

```java
public void sendEmails(List``<User>`` users) {
    for (User user : users) {
        System.out.println("sending email to " + user);
    }
}
```

现在，假设我们想使用_sendEmail_方法来处理_Operator_的_List_。_Operator_类扩展了_User_，所以我们可能期望这是一个简单直接的方法调用。但是，不幸的是，我们会得到一个编译错误：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/producer_extends_error.png)

为了解决这个问题，我们可以按照PECS规则更新_sendEmail_方法。因为用户列表是我们逻辑的_生产者_，我们将使用_extends_关键字：

```java
public void sendEmailsFixed(List`<? extends User>` users) {
    for (User user : users) {
        System.out.println("sending email to " + user);
    }
}
```

结果，我们现在可以轻松地调用该方法来处理任何泛型类型的列表，只要它们继承自_User_类：

```java
List``<Operator>`` operators = Arrays.asList(new Operator("sam"), new Operator("daniel"));
List`<Customer>` customers = Arrays.asList(new Customer("john"), new Customer("arys"));

sendEmailsFixed(operators);
sendEmailsFixed(customers);
```

### 3. 消费者超类

当我们向集合中添加元素时，我们成为生产者，列表将作为消费者。让我们编写一个方法，它接收一个_Operator_的列表并向其中添加两个元素：

```java
private void addUsersFromMarketingDepartment(List``<Operator>`` users) {
    users.add(new Operator("john doe"));
    users.add(new Operator("jane doe"));
}
```

如果我们传递一个_Operator_的列表，这将完美工作。但是，如果我们想用它将这两个操作员添加到一个_User_的列表中，我们将再次得到一个编译错误：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/consumer_supers_error.png)

因此，我们需要更新方法，使其接受一个_Operator_的集合或其前身，使用_super_关键字：

```java
private void addUsersFromMarketingDepartmentFixed(List`<? super Operator>` users) {
    users.add(new Operator("john doe"));
    users.add(new Operator("jane doe"));
}
```

### 4. 生产和消费

可能存在我们逻辑需要同时读取和写入集合的情况。在这种情况下，_Collection_将同时作为生产者和消费者。

处理这些场景的唯一方法是使用基类，不使用任何关键字：

```java
private void addUsersAndSendEmails(List``<User>`` users) {
    users.add(new Operator("john doe"));
    for (User user : users) {
        System.out.println("sending email to: " + user);
    }
}
```

**另一方面，使用同一个集合进行读写将违反命令查询分离原则，应该避免。**

### 5. 结论

在本文中，我们讨论了_生产者扩展消费者超类_规则，并学习了如何在处理Java集合时应用它。

我们探讨了集合作为我们逻辑的生产者或消费者的各种用法。之后，我们了解到如果一个集合同时做这两件事，这可能表明我们的设计中存在代码异味。

本文使用的所有代码示例都可以在GitHub上找到。