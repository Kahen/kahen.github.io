---
date: 2022-04-01
category:
  - Spring Boot CLI
  - 密码编码
tag:
  - Spring Security
  - OAuth
head:
  - - meta
    - name: keywords
      content: Spring Boot CLI, 密码编码, Spring Security, BCryptPasswordEncoder
---

# 使用Spring Boot CLI编码密码

如果你正在开发Spring Security（尤其是OAuth）实现，一定要看看《学习Spring安全》课程：

**>> 学习Spring**
**安全**

## **1. 概述**

Spring Boot CLI（命令行界面）是一个用于从命令提示符运行和测试Spring Boot应用程序的Spring Boot工具。这个工具提供了一个非常有用的功能，用于编码密码。**这个工具的主要目的是避免暴露明文密码，并能够生成和使用编码密码。**

在本教程中，我们将深入Spring Security的世界，学习**如何使用Spring Boot CLI编码密码**。

## **2. 密码编码**

密码编码是一种将密码以二进制格式表示的方法，可以保存在存储介质上。我们可以使用Spring Security对密码进行编码，也可以委托给Spring Boot CLI。

### 2.1. Spring Security _PasswordEncoder_

Spring Security提供了_PasswordEncoder_接口，它有相当多的实现方式，例如_StandardPasswordEncoder_和_BCryptPasswordEncoder_。

此外，Spring Security推荐使用_BCryptPasswordEncoder_，它基于一个强大的算法，带有随机生成的盐。在框架的早期版本中，可以使用_MD5PasswordEncoder_或_SHAPasswordEncoder_类，但由于它们的算法弱点，现在它们已经被弃用。

另外，这两个类迫使开发者将盐作为构造函数参数传递，而_BCryptPasswordEncoder_将内部生成一个随机盐。由_BCryptPasswordEncoder_生成的字符串将有60个字符大小，因此基础列应该接受这个大小的字符串。

另一方面，_StandardPasswordEncoder_类基于_SHA-256_算法。

显然，第三方系统中创建的用户密码必须按照Spring Security中选择的编码类型进行编码，以确保其认证成功。

### 2.2. Spring Boot CLI 密码编码器

Spring Boot CLI带有一堆命令，其中之一是_encodepassword_。这个命令允许为Spring Security使用而对密码进行编码。简单来说，**Spring Boot CLI _encodepassword_命令可以直接将原始密码转换为加密密码**，使用这个简单的语法：

```shell
spring encodepassword [options] `<password to encode>`
```

**值得注意的是，从Spring Security 5.0开始，默认的密码编码机制是_BCrypt_。**

## **3. 示例**

为了阐明使用Spring Boot CLI的密码编码机制，我们将使用一个基本的认证服务通过用户名和密码来验证用户。在这个例子中，我们将简单地使用Spring Security的自动配置。

我们的想法是避免暴露明文密码，而是使用编码密码。现在让我们看看如何使用_encodepassword_命令使用Spring Boot CLI编码密码。我们只需要在命令提示符中执行这个命令：

`spring encodepassword baeldungPassword`

上述命令的结果是一个用_BCrypt_编码的密码，这非常难以破解。例如，用于Spring Boot Security配置的编码密码看起来像这样：

```shell
{bcrypt}$2y$10$R8VIwFiQ7aUST17YqMaWJuxjkCYqk3jjPlSxyDLLzqCTOwFuJNq2a
```

现在让我们通过修改属性文件来自定义默认的安全配置。例如，我们可以通过添加我们自己的用户名和密码来覆盖默认的用户名和密码。

我们的编码密码进入_spring.security.user.password_属性：

```properties
spring:
  security:
    user:
      name: baeldung
      password: '{bcrypt}$2y$10$R8VIwFiQ7aUST17YqMaWJuxjkCYqk3jjPlSxyDLLzqCTOwFuJNq2a'
```

## **4. 结论**

在本文中，我们学习了如何使用Spring Boot CLI编码密码。我们还使用Spring Security简单认证来演示如何使用编码密码。主要目的是避免暴露明文密码，并能够轻松生成编码密码。

如往常一样，教程的完整代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/0728087722c48c379bfd934fd8723735?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/viniok-150x150.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-lightbox-icn-1.0.0-1.png)

OK