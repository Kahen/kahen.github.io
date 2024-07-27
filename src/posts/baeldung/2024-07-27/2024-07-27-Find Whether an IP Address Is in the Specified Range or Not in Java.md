---
date: 2022-04-01
category:
  - Java
  - Networking
tag:
  - IP Address
  - Range Checking
head:
  - - meta
    - name: keywords
      content: Java, IP Address, Range Checking, IPv4, IPv6
---
# 使用Java检查IP地址是否在指定范围内

在本教程中，我们将讨论如何使用Java确定一个IP地址是否在给定的范围内。在本文中，我们假定所有给定的IP地址都是有效的IPv4（互联网协议版本4）和IPv6（互联网协议版本6）地址。

## 2. 问题介绍

给定一个输入IP地址以及作为范围的另外两个IP地址（起始和结束）。我们应该能够确定输入的IP地址是否在给定的范围内。

例如：
- 输入 = 192.220.3.0, 范围在 192.210.0.0 和 192.255.0.0 之间

  输出 = true
- 输入 = 192.200.0.0, 范围在 192.210.0.0 和 192.255.0.0 之间

  输出 = false

现在，让我们看看使用不同的Java库来检查给定的IP地址是否在范围内的不同方法。

## 3. IPAddress库

由Sean C Foley编写的IPAddress库支持处理IPv4和IPv6地址的广泛用例。**需要注意的是，这个库至少需要Java 8才能工作。**

设置这个库很简单。我们需要在我们的pom.xml中添加ipaddress依赖：

```xml
``<dependency>``
    ```<groupId>```com.github.seancfoley```</groupId>```
    ```<artifactId>```ipaddress```</artifactId>```
    ```<version>```5.3.3```</version>```
```</dependency>```
```

它提供了以下Java类来解决我们的问题：

- **IPAddress**，用于将IP地址作为Java实例保存
- **IPAddressString**，用于从给定的IP字符串构建IPAddress实例
- **IPAddressSeqRange**，用于表示任意范围的IP地址

现在，让我们看看使用上述类通过代码来确定IP地址是否在给定范围内：

```java
public static boolean checkIPIsInGivenRange(String inputIP, String rangeStartIP, String rangeEndIP)
  throws AddressStringException {
    IPAddress startIPAddress = new IPAddressString(rangeStartIP).getAddress();
    IPAddress endIPAddress = new IPAddressString(rangeEndIP).getAddress();
    IPAddressSeqRange ipRange = startIPAddress.toSequentialRange(endIPAddress);
    IPAddress inputIPAddress = new IPAddressString(inputIP).toAddress();

    return ipRange.contains(inputIPAddress);
}
```

上述代码适用于IPv4和IPv6地址。**IPAddressString** 参数化构造函数接受一个IP字符串来构建**IPAddress**实例。**IPAddressString**实例可以通过以下两种方法之一转换为**IPAddress**：

- **toAddress()*/
- **getAddress()**

**getAddress()**方法假定给定的IP是有效的，但**toAddress()**方法在验证输入一次后抛出**AddressStringException**，如果输入无效。**IPAddress**类提供了一个**toSequentialRange**方法，使用开始和结束IP范围构建**IPAddressSeqRange**实例。

让我们考虑几个单元测试用例，它们使用IPv4和IPv6地址调用**checkIPIsInGivenRange**：

```java
@Test
void givenIPv4Addresses_whenIsInRange_thenReturnsTrue() throws Exception {
    assertTrue(IPWithGivenRangeCheck.checkIPIsInGivenRange("192.220.3.0", "192.210.0.0", "192.255.0.0"));
}

@Test
void givenIPv4Addresses_whenIsNotInRange_thenReturnsFalse() throws Exception {
    assertFalse(IPWithGivenRangeCheck.checkIPIsInGivenRange("192.200.0.0", "192.210.0.0", "192.255.0.0"));
}

@Test
void givenIPv6Addresses_whenIsInRange_thenReturnsTrue() throws Exception {
    assertTrue(IPWithGivenRangeCheck.checkIPIsInGivenRange(
      "2001:db8:85a3::8a03:a:b", "2001:db8:85a3::8a00:ff:ffff", "2001:db8:85a3::8a2e:370:7334"));
}

@Test
void givenIPv6Addresses_whenIsNotInRange_thenReturnsFalse() throws Exception {
    assertFalse(IPWithGivenRangeCheck.checkIPIsInGivenRange(
      "2002:db8:85a3::8a03:a:b", "2001:db8:85a3::8a00:ff:ffff", "2001:db8:85a3::8a2e:370:7334"));
}
```

## 4. Commons IP Math

**Commons IP Math库提供了用于表示IPv4和IPv6地址及范围的类。**它提供了用于处理最常见操作的API，此外，它还提供了比较器和其他实用工具，用于处理IP范围。

我们需要将commons-ip-math依赖项添加到我们的pom.xml中：

```xml
``<dependency>``
    ```<groupId>```com.github.jgonian```</groupId>```
    ```<artifactId>```commons-ip-math```</artifactId>```
    ```<version>```1.32```</version>```
```</dependency>```
```

### 4.1. 对于IPv4

该库提供了**Ipv4**和**Ipv4Range**类，分别用于保存单个IP地址和地址范围的实例。现在，让我们看看使用上述类的代码示例：

```java
public static boolean checkIPv4IsInRange(String inputIP, String rangeStartIP, String rangeEndIP) {
    Ipv4 startIPAddress = Ipv4.of(rangeStartIP);
    Ipv4 endIPAddress = Ipv4.of(rangeEndIP);
    Ipv4Range ipRange = Ipv4Range.from(startIPAddress).to(endIPAddress);
    Ipv4 inputIPAddress = Ipv4.of(inputIP);
    return ipRange.contains(inputIPAddress);
}
```

**Ipv4**类提供了一个静态方法**of()**，它接受IP字符串来构建一个**Ipv4**实例。**Ipv4Range**类使用构建者设计模式来创建其实例，使用**from()**和**to()**方法来指定范围。此外，它提供了**contains()**函数来检查IP地址是否在指定的范围内。

现在让我们对我们的函数运行一些测试：

```java
@Test
void givenIPv4Addresses_whenIsInRange_thenReturnsTrue() throws Exception {
    assertTrue(IPWithGivenRangeCheck.checkIPv4IsInRange("192.220.3.0", "192.210.0.0", "192.255.0.0"));
}

@Test
void givenIPv4Addresses_whenIsNotInRange_thenReturnsFalse() throws Exception {
    assertFalse(IPWithGivenRangeCheck.checkIPv4IsInRange("192.200.0.0", "192.210.0.0", "192.255.0.0"));
}
```

### 4.2. 对于IPv6

对于IP版本6，库提供了相同的类和函数，只是版本号从4变为6。版本6的类是**Ipv6**和**Ipv6Range**。

让我们通过使用上述类来查看IP版本6的代码示例：

```java
public static boolean checkIPv6IsInRange(String inputIP, String rangeStartIP, String rangeEndIP) {
    Ipv6 startIPAddress = Ipv6.of(rangeStartIP);
    Ipv6 endIPAddress = Ipv6.of(rangeEndIP);
    Ipv6Range ipRange = Ipv6Range.from(startIPAddress).to(endIPAddress);
    Ipv6 inputIPAddress = Ipv6.of(inputIP);
    return ipRange.contains(inputIPAddress);
}
```

现在让我们运行单元测试来检查我们的代码：

```java
@Test
void givenIPv6Addresses_whenIsInRange_thenReturnsTrue() throws Exception {
    assertTrue(IPWithGivenRangeCheck.checkIPv6IsInRange(
      "2001:db8:85a3::8a03:a:b", "2001:db8:85a3::8a00:ff:ffff", "2001:db8:85a3::8a2e:370:7334"));
}

@Test
void givenIPv6Addresses_whenIsNotInRange_thenReturnsFalse() throws Exception {
    assertFalse(IPWithGivenRangeCheck.checkIPv6IsInRange(
      "2002:db8:85a3::8a03:a:b", "2001:db8:85a3::8a00:ff:ffff", "2001:db8:85a3::8a2e:370:7334"));
}
```

## 5. 使用Java的_InetAddress_类进行IPv4检查

**IPv4地址是四个1字节值的序列。因此，它可以被转换为一个32位整数。**我们可以检查它是否在给定的范围内。

Java的**InetAddress**类表示一个IP地址，并提供方法来获取任何给定主机名的IP。一个**InetAddress**实例表示具有相应主机名的IP地址。

以下是将IPv4地址转换为长整数的Java代码：

```java
```java
long ipToLongInt(InetAddress ipAddress) {
    long resultIP = 0;
    byte[] ipAddressOctets = ipAddress.getAddress();

    for (byte octet : ipAddressOctets) {
        resultIP `<<= 8;
        resultIP |= octet & 0xFF;
    }
    return resultIP;
}
```

使用上述方法，让我们检查IP是否在范围内：

```java
public static boolean checkIPv4IsInRangeByConvertingToInt(String inputIP, String rangeStartIP, String rangeEndIP)
  throws UnknownHostException {
    long startIPAddress = ipToLongInt(InetAddress.getByName(rangeStartIP));
    long endIPAddress = ipToLongInt(InetAddress.getByName(rangeEndIP));
    long inputIPAddress = ipToLongInt(InetAddress.getByName(inputIP));

    return (inputIPAddress >`= startIPAddress && inputIPAddress <= endIPAddress);
}
```

**InetAddress**类中的**getByName()**方法接受域名或IP地址作为输入，并在无效时抛出**UnknownHostException**。让我们通过运行单元测试来检查我们的代码：

```java
@Test
void givenIPv4Addresses_whenIsInRange_thenReturnsTrue() throws Exception {
    assertTrue(IPWithGivenRangeCheck.checkIPv4IsInRangeByConvertingToInt("192.220.3.0", "192.210.0.0", "192.255.0.0"));
}

@Test
void givenIPv4Addresses_whenIsNotInRange_thenReturnsFalse() throws Exception {
    assertFalse(IPWithGivenRangeCheck.checkIPv4IsInRangeByConvertingToInt("192.200.0.0", "192.210.0.0", "192.255.0.0"));
}
```

将IP地址转换为整数的上述逻辑也适用于IPv6，但它是一个128位整数。Java语言在原始数据类型中支持的最大值为64位（长整数）。如果我们要用上述逻辑处理版本6，我们需要使用两个长整数或BigInteger类进行计算。但这将是一个繁琐的过程，并且涉及复杂的计算。

## 6. Java IPv6库

Java IPv6库特别为Java中的IPv6支持而编写，并执行相关的操作。**该库内部使用两个长整数来存储IPv6地址。并且它至少需要Java 6才能工作。**

我们需要将java-ipv6依赖项添加到我们的pom.xml中：

```xml
``<dependency>``
    ```<groupId>```com.googlecode.java-ipv6```</groupId>```
    ```<artifactId>```java-ipv6```</artifactId>```
    ```<version>```0.17```</version>```
```</dependency>```
```

该库提供了各种类来操作IPv6地址。以下是两个帮助我们解决问题的类：

- **IPv6Address**，用于将IPv6表达为Java实例
- **IPv6AddressRange**，用于表示一系列连续的IPv6地址范围

让我们看看使用上述类来检查IP是否在给定范围内的代码片段：

```java
public static boolean checkIPv6IsInRangeByIPv6library(String inputIP, String rangeStartIP, String rangeEndIP) {
    IPv6Address startIPAddress = IPv6Address.fromString(rangeStartIP);
    IPv6Address endIPAddress = IPv6Address.fromString(rangeEndIP);
    IPv6AddressRange ipRange = IPv6AddressRange.fromFirstAndLast(startIPAddress, endIPAddress);
    IPv6Address inputIPAddress = IPv6Address.fromString(inputIP);
    return ipRange.contains(inputIPAddress);
}
```

**IPv6Address**类提供了各种静态函数来构建其实例：

- **fromString**
- **fromInetAddress**
- **fromBigInteger**
- **fromByteArray**
- **fromLongs**

以上所有方法都是自解释的，这有助于我们创建一个**IPv6Address**实例。**IPv6AddressRange**有一个名为**fromFirstAndLast()**的方法，它接受两个IP地址作为输入。此外，它提供了一个**contains()**方法，该方法接受一个**IPv6Address**作为参数，并确定它是否在指定的范围内。

通过调用我们定义的上述方法，让我们在测试中传递一些样本输入：

```java
@Test
void givenIPv6Addresses_whenIsInRange_thenReturnsTrue() throws Exception {
    assertTrue(IPWithGivenRangeCheck.checkIPv6IsInRangeByIPv6library(
      "fe80::226:2dff:fefa:dcba",
      "fe80::226:2dff:fefa:cd1f",
      "fe80::226:2dff:fefa:ffff"
    ));
}

@Test
void givenIPv6Addresses_whenIsNotInRange_thenReturnsFalse() throws Exception {
    assertFalse(IPWithGivenRangeCheck.checkIPv6IsInRangeByIPv6library(
      "2002:db8:85a3::8a03:a:b",
      "2001:db8:85a3::8a00:ff:ffff",
      "2001:db8:85a3::8a2e:370:7334"
    ));
}
```

## 7. 结论

在本文中，我们检查了如何确定给定的IP地址（v4和v6）是否在指定的范围内。通过各种库的帮助，我们分析了在没有复杂逻辑和计算的情况下检查IP地址存在性的方法。

和往常一样，本文的代码片段可以在GitHub上找到。
```