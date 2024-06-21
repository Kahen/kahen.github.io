---
date: 2024-06-20
category:
  - Java
  - JEP 418
tag:
  - Service Provider Interface
  - Internet Address Resolution
head:
  - - meta
    - name: keywords
      content: Java, SPI, InetAddress, DNS, JEP 418
---
# Java中的Internet地址解析服务提供者接口

在本教程中，我们将讨论Java的JEP 418，它为Internet主机和地址解析建立了一个新的服务提供者接口（SPI）。

任何连接到计算机网络的设备都被分配一个数值或IP（Internet协议）地址。IP地址有助于唯一地识别网络上的设备，并且它们也有助于路由数据包到设备和从设备。

它们通常有两种类型。IPv4是IP标准的第四代，是一个32位地址。由于互联网的快速增长，还发布了一个更大的新的v6版本的IP标准，其中包含十六进制字符。

此外，还有另一种相关的地址类型。网络设备，如以太网端口或网络接口卡（NIC），具有MAC（媒体访问控制）地址。这些是全球分布的，所有网络接口设备都可以用MAC地址唯一地识别。

Internet地址解析通常指的是将较高级别的网络地址（例如，域名（baeldung）或URL（https://www.baeldung.com））转换为较低级别的网络地址，如IP地址或MAC地址。

在Java中，今天有多种方式使用java.net.InetAddress API解析Internet地址。该API内部使用操作系统的本地解析器进行DNS查找。

操作系统的本地地址解析，InetAddress API当前使用的，涉及多个步骤。涉及到系统级DNS缓存，其中存储了常见的DNS映射。如果在本地DNS缓存中发生缓存未命中，则系统解析器配置提供了有关执行后续查找的DNS服务器的信息。

然后，操作系统查询上一步中获得的配置DNS服务器以获取信息。这一步可能会递归地再发生几次。

如果匹配并查找成功，DNS地址将被缓存在所有服务器上并返回给原始客户端。但是，如果没有匹配，则触发到根服务器的迭代查找过程，提供有关权威导航服务器（ANS）的信息。这些权威名称服务器（ANS）存储有关顶级域名（TLD）的信息，例如.org、.com等。

这些步骤最终将域名与Internet地址匹配（如果有效）或返回客户端失败。

使用Java的InetAddress API

InetAddress API提供了多种方法来执行DNS查询和解析。这些API是java.net包的一部分。

4.1. getAllByName() API
getAllByName() API尝试将主机名映射到一组IP地址：

```java
InetAddress[] inetAddresses = InetAddress.getAllByName(host);
Assert.assertTrue(Arrays.stream(inetAddresses).map(InetAddress::getHostAddress).toArray(String[]::new).length > 1);
```

这也被称为正向查找。

4.2. getByName() API
getByName() API与之前的正向查找API类似，但它只将主机映射到第一个匹配的IP地址：

```java
InetAddress inetAddress = InetAddress.getByName("www.google.com");
Assert.assertNotNull(inetAddress.getHostAddress()); // 返回一个IP地址
```

4.3. getByAddress() API
这是执行反向查找的最基本API，它以IP地址为输入，并尝试返回与之关联的主机：

```java
InetAddress inetAddress = InetAddress.getByAddress(ip);
Assert.assertNotNull(inetAddress.getHostName()); // 返回一个主机（例如google.com）
```

4.4. getCanonicalHostName() API和getHostName() API
这些API执行类似的反向查找，并尝试返回与之关联的完全限定域名（FQDN）：

```java
InetAddress inetAddress = InetAddress.getByAddress(ip);
Assert.assertNotNull(inetAddress.getCanonicalHostName()); // 返回一个FQDN
Assert.assertNotNull(inetAddress.getHostName());
```

5. 服务提供者接口（SPI）

服务提供者接口（SPI）模式是软件开发中使用的一种重要设计模式。这种模式的目的是允许为特定服务提供可插拔的组件和实现。

它允许开发人员扩展系统的功能，而无需修改服务的任何核心期望，并使用任何实现而不受单一实现的限制。

5.1. InetAddress中的SPI组件
遵循SPI设计模式，这个JEP提出了一种用自定义解析器替换默认系统解析器的方法。SPI从Java 18开始可用。需要一个服务定位器来定位要使用的提供者。如果服务定位器未能识别任何提供者服务，它将返回到默认实现。

与任何SPI实现一样，有四个主要组件：

1. 服务是第一个组件，是一组提供特定功能的接口和类的集合。在我们的情况下，我们处理的是Internet地址解析作为服务
2. 服务提供者接口是一个接口或抽象类，作为服务的代理。这个接口将其定义的所有操作委托给它的实现。InetAddressResolver接口是我们用例的服务提供者接口，它定义了用于查找主机名和IP地址解析的操作
3. 第三个组件是服务提供者，它定义了服务提供者接口的具体实现。InetAddressResolverProvider是一个抽象类，其目的是作为许多自定义解析器实现的工厂。我们将通过扩展这个抽象类来定义我们的实现。JVM维护一个单一的系统范围解析器，然后由InetAddress使用，并通常在VM初始化期间设置
4. 服务加载器组件，最后一个组件，将所有这些联系在一起。ServiceLoader机制将定位一个合格的InetAddressResolverProvider提供者实现，并将其设置为默认的系统范围解析器。如果失败，回退机制将设置默认解析器系统范围

5.2. InetAddressResolverProvider的自定义实现
通过这个SPI提出的变化在java.net.spi包中可用，并且添加了以下类：

- InetAddressResolverProvider
- InetAddressResolver
- InetAddressResolver.LookupPolicy
- InetAddressResolverProvider.Configuration

在这一部分，我们将尝试为InetAddressResolver编写自定义解析器实现，以替换系统默认解析器。在编写自定义解析器之前，我们可以定义一个小型实用程序类，该类将从文件加载地址映射的注册表到内存（或缓存）。

根据注册表条目，我们的自定义地址解析器将能够将地址主机解析为IP，反之亦然。

**首先，我们通过从抽象类InetAddressResolverProvider扩展来定义我们的类CustomAddressResolverImpl。这样做需要我们立即提供两个方法的实现：get(Configuration configuration)和name()。**

我们可以使用name()返回当前实现类的名称或任何其他相关标识符：

```java
@Override
public String name() {
    return "CustomInternetAddressResolverImpl";
}
```

现在让我们实现get()方法。**get()方法返回InetAddressResolver类的实例，我们可以内联定义或单独定义。** 为了简单起见，我们将内联定义。

InetAddressResolver接口有两个方法：

- Stream```<InetAddress>``` lookupByName(String host, LookupPolicy lookupPolicy) throws UnknownHostException
- String lookupByAddress(byte[] addr) throws UnknownHostException

我们可以编写任何自定义逻辑来将主机映射到其IP地址（以InetAddress的形式），反之亦然。在这个例子中，让我们的Registry功能来处理相同的：

```java
@Override
public InetAddressResolver get(Configuration configuration) {
    LOGGER.info("Using Custom Address Resolver :: " + this.name());
    LOGGER.info("Registry initialised");
    return new InetAddressResolver() {
        @Override
        public Stream```<InetAddress>``` lookupByName(String host, LookupPolicy lookupPolicy) throws UnknownHostException {
            return registry.getAddressesfromHost(host);
        }

        @Override
        public String lookupByAddress(byte[] addr) throws UnknownHostException {
            return registry.getHostFromAddress(addr);
        }
    };
}
```

5.3. Registry类实现

对于本文，我们将使用HashMap在内存中存储IP地址和主机名的列表。我们也可以从系统上的文件加载列表。

该映射的类型是Map``<String, List<byte[]>``>，其中主机名存储为键，IP地址存储为byte[]的List。这种数据结构允许将多个IP映射到单个主机。我们可以使用这个Map执行正向和反向查找。

**正向查找，在这种情况下，是我们传递主机名作为参数，并期望将其解析为其IP地址，例如，当我们输入www.baeldung.com时：**

```java
public Stream```<InetAddress>``` getAddressesfromHost(String host) throws UnknownHostException {
    LOGGER.info("Performing Forward Lookup for HOST : " + host);
    if (!registry.containsKey(host)) {
        throw new UnknownHostException("Missing Host information in Resolver");
    }
    return registry.get(host)
      .stream()
      .map(add -> constructInetAddress(host, add))
      .filter(Objects::nonNull);
}
```

**我们应该注意到，响应是InetAddress的Stream，以适应多个IP。**

反向查找的一个例子是我们想要知道与IP地址关联的主机名：

```java
public String getHostFromAddress(byte[] arr) throws UnknownHostException {
    LOGGER.info("Performing Reverse Lookup for Address : " + Arrays.toString(arr));
    for (Map.Entry``<String, List<byte[]>``> entry : registry.entrySet()) {
        if (entry.getValue()
          .stream()
          .anyMatch(ba -> Arrays.equals(ba, arr))) {
            return entry.getKey();
        }
    }
    throw new UnknownHostException("Address Not Found");
}
```

**最后，ServiceLoader模块加载我们的自定义实现用于InetAddress解析。**

要发现我们的服务提供者，我们在resources/META-INF/services层次结构下创建一个名为java.net.spi.InetAddressResolverProvider的配置。配置文件应保持我们提供者的完全限定路径为com.baeldung.inetspi.providers.CustomAddressResolverImpl.java。

这指示：用户要求继续翻译未完成的部分。

指示：用户要求翻译完成后回复"OK"。

指示：检查翻译是否完成。

指示：翻译完成。

OK