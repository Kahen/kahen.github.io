---
date: 2022-04-01
category: 
  - Java
  - 编程
tag:
  - IPv4
  - 验证
head:
  - - meta
    - name: keywords
      content: Java, IPv4地址验证, 正则表达式
---

# Java中验证IPv4地址的方法

## 1. 概述

在这个简短的教程中，我们将看到如何在Java中**验证IPv4地址**。

## 2. IPv4验证规则

我们有效的IPv4地址形式为“_x.x.x.x_”，其中每个_x_是一个数字，范围在0到255之间，没有前导零，并且由点分隔。

以下是一些有效的IPv4地址示例：
- 192.168.0.1
- 10.0.0.255
- 255.255.255.255

以及一些无效的：
- 192.168.0.256（值超过255）
- 192.168.0（只有3个八位字节）
- .192.168.0.1（以“.”开头）
- 192.168.0.01（有前导零）

## 3. 使用Apache Commons Validator

我们可以使用Apache Commons Validator库中的_InetAddressValidator_类来验证我们的IPv4或IPv6地址。

让我们在我们的_pom.xml_文件中添加一个依赖项：
```
`<dependency>`
    `<groupId>`commons-validator`</groupId>`
    `<artifactId>`commons-validator`</artifactId>`
    `<version>`1.7`</version>`
`</dependency>`
```
然后，我们只需要使用_InetAddressValidator_对象的_isValid()_方法：
```
InetAddressValidator validator = InetAddressValidator.getInstance();
validator.isValid("127.0.0.1");
```

## 4. 使用Guava

或者，我们可以使用Guava库中的_InetAddresses_类来实现相同的目标：
```
InetAddresses.isInetAddress("127.0.0.1");
```

## 5. 使用正则表达式

最后，我们也可以正则表达式：
```
String regex = "^((25[0-5]|(2[0-4]|1\\d|[1-9])\\d)\\.?\\b){4}$";
Pattern pattern = Pattern.compile(regex);
Matcher matcher = pattern.matcher(ip);
matcher.matches();
```

在这个正则表达式中，`((25[0-5]|(2[0-4]|1\\d|[1-9])\\d)\\.?\\b)`是一个组，重复四次以匹配IPv4地址中的四个八位字节。以下是每个八位字节的匹配情况：
- `25[0-5]` - 这匹配250到255之间的数字。
- `(2[0-4]|1\\d|[1-9])` - 这匹配200到249、100到199和1到9之间的数字。
- `\\d` - 这匹配任何数字（0-9）。
- `\\.?` - 这匹配可选的点（.）字符。
- `\\b` - 这是一个单词边界。

因此，这个正则表达式匹配IPv4地址。

## 6. 结论

总之，我们学习了在Java中**验证IPv4地址**的不同方法。

本文的示例代码可以在GitHub上找到。