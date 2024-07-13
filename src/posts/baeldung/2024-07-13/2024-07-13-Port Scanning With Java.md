---
date: 2022-04-01
category:
  - Java
  - Networking
tag:
  - Port Scanning
  - Java Socket
head:
  - - meta
    - name: keywords
      content: Java, Port Scanning, Networking, Socket
---
# Java端口扫描概述

端口扫描是一种枚举目标机器上开放或活动的端口的方法。其主要目标是列出开放的端口，以便了解当前正在运行的应用程序和服务。

在本教程中，**我们将解释如何使用Java开发一个简单的端口扫描应用程序**，我们可以使用它来扫描主机的开放端口。

### 2. 什么是计算机端口？

计算机端口是一个逻辑实体，它使特定服务与连接关联成为可能。此外，端口由1到65535的整数标识。按照惯例，前1024个端口是为标准服务预留的，例如：

- 端口20：FTP
- 端口23：Telnet
- 端口25：SMTP
- 端口80：HTTP

端口扫描器的思想是创建一个_TCP_套接字并尝试连接到特定端口。如果连接成功建立，那么我们将标记此端口为开放的，如果没有，我们将标记为关闭的。

然而，建立每个65535端口的连接每个端口可能需要高达200毫秒。这听起来可能是一个短暂的时间，但总的来说，**逐个扫描单个主机的所有端口需要相当长的时间**。

为了解决性能问题，**我们将使用多线程方法**。与尝试按顺序连接每个端口相比，这可以显著加快进程。

### 3. 实现

要实现我们的程序，我们创建一个带有两个参数输入的_portScan()_函数：

- _ip_：要扫描的_IP_地址；它相当于localhost的127.0.0.1
- _nbrPortMaxToScan_：要扫描的最大端口数；如果我们想扫描所有端口，这个数字相当于65535

#### 3.1. 实现

让我们看看我们的_portScan()_方法是什么样子的：

```java
public void runPortScan(String ip, int nbrPortMaxToScan) throws IOException {
    ConcurrentLinkedQueue openPorts = new ConcurrentLinkedQueue<>();
    ExecutorService executorService = Executors.newFixedThreadPool(poolSize);
    AtomicInteger port = new AtomicInteger(0);
    while (port.get() `< nbrPortMaxToScan) {
        final int currentPort = port.getAndIncrement();
        executorService.submit(() ->` {
            try {
                Socket socket = new Socket();
                socket.connect(new InetSocketAddress(ip, currentPort), timeOut);
                socket.close();
                openPorts.add(currentPort);
                System.out.println(ip + " ,port open: " + currentPort);
            } catch (IOException e) {
                System.err.println(e);
            }
        });
    }
    executorService.shutdown();
    try {
        executorService.awaitTermination(10, TimeUnit.MINUTES);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    }
    List openPortList = new ArrayList<>();
    System.out.println("openPortsQueue: " + openPorts.size());
    while (!openPorts.isEmpty()) {
        openPortList.add(openPorts.poll());
    }
    openPortList.forEach(p -> System.out.println("port " + p + " is open"));
}
```

我们的方法返回一个包含所有开放端口的_List_。为此，我们创建一个新的_Socket_对象，用作两个主机之间的连接器。如果连接成功建立，那么我们假设该端口是开放的，然后我们继续下一行。另一方面，如果连接失败，那么我们假设该端口是关闭的，并且抛出一个_SocketTimeoutException_，我们将被抛出到异常_catch_块。

#### 3.2. 多线程

为了优化扫描目标机器所有65535个端口所需的时间，我们将并发运行我们的方法。我们使用_ExecutorService_，它封装了一个线程池和要执行的任务队列。池中的所有线程仍在运行。

该服务检查队列中是否有要处理的任务，如果有，它就取出任务并执行它。一旦任务执行完成，线程再次等待服务从队列中分配给它一个新任务。

此外，我们使用一个有10个_线程_的_FixedThreadPool_，这意味着程序将并行运行最多10个线程。我们可以根据我们的机器配置和容量调整这个池大小。

### 4. 结论

在这个快速教程中，我们解释了如何使用_Socket_和多线程方法开发一个简单的Java端口扫描应用程序。

如往常一样，代码片段可在GitHub上找到。