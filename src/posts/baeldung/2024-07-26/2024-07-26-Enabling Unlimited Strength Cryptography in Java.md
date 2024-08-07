---
date: 2022-04-01
category:
  - Java
  - Security
tag:
  - JCE
  - Cryptography
head:
  - - meta
    - name: keywords
      content: Java, JCE, Cryptography, Unlimited Strength
---

# 在Java中启用无限强度的密码学

在本教程中，我们将学习为什么Java密码学扩展（JCE）的无限强度策略文件默认情况下并不总是启用的。此外，我们将解释如何检查密码学强度。之后，我们将展示如何在不同版本的Java中启用无限密码学。

## JCE无限强度策略文件

让我们理解一下密码学强度的含义。它由发现密钥的难度来定义，这取决于所使用的密码算法和密钥的长度。通常，更长的密钥提供更强的加密。有限的密码学强度使用最大128位的密钥。另一方面，无限的强度使用最大长度为2147483647位的密钥。

正如我们所知，JRE本身包含加密功能。**JCE使用管辖策略文件来控制密码学强度**。**策略文件由两个jar文件组成：_local_policy.jar_ 和 _US_export_policy.jar_**。这使得Java平台内置了对密码学强度的控制。

### 为什么JCE无限强度策略文件默认不包括

首先，只有旧版本的JRE不包括无限强度策略文件。8u151及更早版本的JRE只捆绑了有限策略文件。相比之下，从Java版本8u151开始，JRE提供了无限和有限策略文件。**原因是直接的，一些国家要求限制密码学强度**。如果一个国家的法律允许无限的密码学强度，可以根据Java版本捆绑或启用它。

### 如何检查密码学强度

让我们看看如何检查密码学强度。我们可以通过检查允许的最大密钥长度来做到这一点：

```java
int maxKeySize = javax.crypto.Cipher.getMaxAllowedKeyLength("AES");
```

如果使用的是有限策略文件，它将返回128。另一方面，如果返回2147483647，则JCE使用的是无限策略文件。

### 策略文件的位置

**Java版本8u151及更早版本在_JAVA_HOME/jre/lib/security目录中包含策略文件。**

**从8u151版本开始，JRE提供了不同版本的策略文件。** 结果是，在JRE目录 _JAVA_HOME/jre/lib/security/policy_ 中有两个子目录：_limited_ 和 _unlimited_。第一个包含有限强度策略文件。第二个包含无限强度的文件。

### 如何启用无限强度密码学

现在让我们看看如何启用最大密码学强度。根据我们使用的Java版本，有几种方法可以做到这一点。

#### 6.1 Java版本8u151之前的处理

**在8u151版本之前，JRE只包含有限强度策略文件**。我们必须用Oracle网站上的无限版本替换它。

首先，我们下载Java 8的文件，这些文件可以在此处获得。接下来，我们解包下载的包，其中包含 _local_policy.jar_ 和 _US_export_policy.jar_。

最后，我们将这些文件复制到 _JAVA_HOME/jre/lib/security_。

#### 6.2 Java版本8u151及更高版本的处理

在Java版本8u151及更高版本中，JCE框架默认使用无限强度策略文件。此外，如果我们想定义使用哪个版本，有一个安全属性 _crypto.policy_：

```java
Security.setProperty("crypto.policy", "unlimited");
```

**我们必须在JCE框架初始化之前设置此属性。** 它定义了在 _JAVA_HOME/jre/lib/security/policy_ 下的策略文件目录。

首先，当安全属性未设置时，框架检查旧位置 _JAVA_HOME/jre/lib/security_ 中的策略文件。尽管在新版本的Java中，默认情况下旧位置没有策略文件。JCE首先检查它，以与旧版本兼容。

其次，如果jar文件在旧位置不存在且属性未定义，那么JRE默认使用无限策略文件。

### 结论

在这篇短文中，我们了解了JCE无限强度策略文件。首先，我们看了为什么在旧版本的Java中不默认启用无限的密码学强度。接下来，我们学习了如何通过检查最大密钥长度来确定密码学强度。最后，我们看到了如何在不同版本的Java中启用它。

如常，示例的源代码可在GitHub上找到。