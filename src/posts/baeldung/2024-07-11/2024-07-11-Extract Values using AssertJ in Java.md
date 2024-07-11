---
date: 2022-04-01
category:
  - Java
  - Testing
tag:
  - AssertJ
  - Testing
head:
  - - meta
    - name: keywords
      content: AssertJ, Java, Testing
---
# 使用AssertJ在Java中提取值

AssertJ是Java的一个断言库，它允许我们流畅地编写断言，同时也使它们更易于阅读。

## 1. 概述

在本教程中，我们将探索AssertJ的提取方法，以便在不中断测试断言流程的情况下流畅地进行检查。

## 2. 实现

让我们从一个_Person_示例类开始：

```java
class Person {
    private String firstName;
    private String lastName;
    private Address address;

    Person(String firstName, String lastName, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }

    // 省略getter和setter
}
```

每个_Person_将与一些_Address_关联：

```java
class Address {
    private String street;
    private String city;
    private ZipCode zipCode;

    Address(String street, String city, ZipCode zipCode) {
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }

    // 省略getter和setter
}
```

并且每个_Address_将包含一个_ZipCode_类：

```java
class ZipCode {
    private long zipcode;

    ZipCode(long zipcode) {
        this.zipcode = zipcode;
    }

    // 省略getter和setter
}
```

现在假设在创建了_Person_对象之后，我们需要测试以下情况：

- _Address_不是_null_
- _Address_不在受限地址列表中
- _ZipCode_对象不是_null_
- _ZipCode_值在1000到100000之间

## 3. 使用AssertJ进行常见断言

给定以下_Person_对象：

```java
Person person = new Person("aName", "aLastName", new Address("aStreet", "aCity", new ZipCode(90210)));
```

我们可以提取_Address_对象：

```java
Address address = person.getAddress();
```

然后我们可以断言_Address_不是null：

```java
assertThat(address).isNotNull();
```

我们还可以检查_Address_是否不在受限地址列表中：

```java
assertThat(address).isNotIn(RESTRICTED_ADDRESSES);
```

接下来是检查_ZipCode_：

```java
ZipCode zipCode = address.getZipCode();
```

并断言它不是null：

```java
assertThat(zipCode).isNotNull();
```

最后，我们可以提取_ZipCode_值并断言它在1000到100000之间：

```java
assertThat(zipCode.getZipcode()).isBetween(1000L, 100_000L);
```

上述代码很直接，但我们需要帮助以流畅地阅读它，因为它需要多行来处理。我们还需要分配变量，以便稍后能够断言它们，这不是一个干净的代码体验。

现在让我们看看提取方法如何帮助我们：

```java
assertThat(person)
  .extracting(Person::getAddress)
    .isNotNull()
    .isNotIn(RESTRICTED_ADDRESSES)
  .extracting(Address::getZipCode)
    .isNotNull()
  .extracting(ZipCode::getZipcode, as(InstanceOfAssertFactories.LONG))
    .isBetween(1_000L, 100_000L);
```

正如我们所看到的，代码并没有太大的不同，但它是流畅的，更容易阅读。

## 5. 结论

在本文中，我们能够看到两种提取对象值进行断言的方法：

- 提取到稍后断言的变量中
- 使用AssertJ的提取方法以流畅的方式提取

本文中使用的例子可以在GitHub上找到。