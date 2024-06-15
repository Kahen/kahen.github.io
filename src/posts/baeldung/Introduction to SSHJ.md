---
date: 2024-06-16
category:
  - SSHJ
  - Java
tag:
  - SSH
  - Java库
---
# SSHJ简介 | Baeldung

## 1. 概览

**SSHJ是一个使用SSH协议与远程服务器安全通信的开源Java库。**

在本文中，我们将介绍SSHJ库的基本功能。

## 2. 依赖项

要使用SSHJ库，我们需要向项目中添加以下依赖项：

```
`<dependency>`
    `<groupId>`com.hierynomus`</groupId>`
    `<artifactId>`sshj`</artifactId>`
    `<version>`0.38.0`</version>`
`</dependency>`
```

我们可以在Maven Central找到SSHJ库的最新版本。

## 3. SSHJ库

SSHJ库帮助我们通过SSH建立与远程服务器的安全连接。

使用**SSHJ库，我们可以处理使用SCP或SFTP协议的文件上传和下载。此外，我们还可以使用它来进行本地端口转发和远程端口转发。**

## 4. 连接SSH客户端

SSH客户端可以使用密码或公钥认证连接到服务器。SSHJ库使我们能够使用任一方法登录。

### 4.1. 密码认证

我们可以使用SSHJ库通过SSH端口连接到服务器。需要为SSH连接指定主机名、端口、用户名和密码。

**SSH客户端使用_passwordAuthentication()_方法通过密码认证连接到服务器：**

```
String host = // ...;
int port = // ...;
String username = // ...;
String password = // ...;

SSHClient client = new SSHClient();
client.addHostKeyVerifier(new PromiscuousVerifier());
client.connect(host, port);
client.authPassword(username, password);
```

如上代码所示，我们使用密码认证将客户端连接到主机。

### 4.2. 公钥认证

我们也可以使用公钥连接到服务器。对于使用公钥连接，我们需要在服务器上的_known_hosts_文件中有文件条目，或者我们可以在客户端机器上为远程服务器生成公钥，并将公钥复制到服务器的授权SSH密钥中。

**SSH客户端使用_authPublickey()_方法通过公钥认证连接到服务器：**

```
String host = // ...;
String username = // ...;
File privateKeyFile = // ...;
int port = // ...;
```

```
SSHClient client = new SSHClient();
KeyProvider privateKey = client.loadKeys(privateKeyFile.getPath());
client.addHostKeyVerifier(new PromiscuousVerifier());
client.connect(host, port);
client.authPublickey(username, privateKey);
```

我们可以为客户端生成公钥并更新服务器以连接。在其余示例中，我们将使用第一种方法登录，即使用用户名和密码。

## 5. 通过SSH执行命令

**我们可以使用_sshClient_连接到服务器后启动的_session_上的_exec()_方法通过SSHJ库执行命令：**

```
SSHClient client = new SSHClient();
Session session = sshClient.startSession();
Command cmd = session.exec("ls -lsa");
BufferedReader reader = new BufferedReader(new InputStreamReader(cmd.getInputStream()));
String line;
while ((line = reader.readLine()) != null) {
    System.out.println(line);
}
cmd.join(5, TimeUnit.SECONDS);
session.close();
```

如上代码所示，我们为_sshClient_启动一个_session_。然后，我们执行_ls -lsa_命令，该命令列出目录中的所有文件。然后我们使用_BufferedReader_读取执行命令的输出。

同样，也可以在这里执行其他命令。

## 6. 通过SCP上传/下载文件

我们可以通过SCP上传文件。**对于上传，我们使用_SCPFileTransfer_对象上的_upload()_方法：**

```
String filePath = // ...;
```

```
SSHClient ssh = new SSHClient();
ssh.useCompression();
ssh.newSCPFileTransfer()
  .upload(new FileSystemFile(filePath), "/upload/");
```

在这里，我们将文件传输到服务器上的_upload_目录。

**_method useCompression()_** **添加_zlib_压缩到首选算法中，这可能会导致显著的速度提升。** 并不能保证它会被成功协商。如果客户端已经连接，则进行重新协商；否则，它只会返回。我们也可以在连接客户端之前使用_useCompression()_。

**对于SCP文件下载，我们使用_SCPFileTransfer_对象上的_download()_方法：**

```
String downloadPath = // ...;
String fileName = // ...;
```

```
SSHClient ssh = new SSHClient();
ssh.useCompression();
ssh.newSCPFileTransfer()
  .download("/upload/" + fileName, downloadPath);
```

在这里，我们从服务器上的_upload_目录下载文件到客户端上的_downloadPath_位置。

**上述上传和下载方法在内部运行_scp_命令，使用SSH连接从本地机器复制文件到远程服务器，反之亦然。**

## 7. 通过SFTP上传/下载文件

我们可以通过SFTP上传文件。**对于上传，我们使用_SFTPClient_对象上的_put()_方法：**

```
String filePath = // ...;
```

```
SSHClient ssh = new SSHClient();
SFTPClient sftp = ssh.newSFTPClient();
sftp.put(new FileSystemFile(filePath), "/upload/");
```

在这里，我们将文件从客户端上的用户主目录传输到服务器上的_upload_目录。

**对于SFTP下载，我们使用_SFTPClient_对象上的_get()_方法：**

```
String downloadPath = // ...;
String fileName = // ...;
```

```
SSHClient ssh = new SSHClient();
SFTPClient sftp = ssh.newSFTPClient();
sftp.get("/upload/" + fileName, downloadPath);
sftp.close();
```

在这里，我们从服务器上的_upload_目录下载文件到客户端上的_downloadPath_位置。

## 8. 本地端口转发

本地端口转发用于访问远程服务器上的服务，就像服务在客户端上运行一样：

```
SSHClient ssh = new SSHClient();
Parameters params = new Parameters(ssh.getRemoteHostname(), 8081, "google.com", 80);
ServerSocket ss = new ServerSocket();
ss.setReuseAddress(true);
ss.bind(new InetSocketAddress(params.getLocalHost(), params.getLocalPort()));
ssh.newLocalPortForwarder(params, ss)
  .listen();
```

在这里，**我们将服务器的_80_端口转发到客户端机器的_8081_端口，这样我们就可以从客户端机器的_8081_端口访问托管在服务器_80_端口上的网站或服务。**

## 9. 远程端口转发

使用远程端口转发，我们可以将客户端机器上运行的服务暴露给远程服务器网络：

```
SSHClient ssh = new SSHClient();
ssh.getConnection()
  .getKeepAlive()
  .setKeepAliveInterval(5);
ssh.getRemotePortForwarder()
  .bind(new Forward(8083), new SocketForwardingConnectListener(new InetSocketAddress("google.com", 80)));
ssh.getTransport()
  .join();
```

在这里，**我们将客户端上运行在_8083_端口的服务转发到远程服务器的_80_端口。实际上，客户端机器上运行在_8083_端口的服务被暴露在远程服务器的_80_端口上。**

对于本地和远程端口转发，我们需要确保适当的防火墙设置已经到位。

## 10. 检查连接断开

我们需要检查连接断开以监控服务器连接状态和健康状况。SSHJ提供了使用keep alive检查连接断开的选项：

```
String hostName = // ...;
String userName = // ...;
String password = // ...;
```

```
DefaultConfig defaultConfig = new DefaultConfig();
defaultConfig.setKeepAliveProvider(KeepAliveProvider.KEEP_ALIVE);
SSHClient ssh = new SSHClient(defaultConfig);

ssh.addHostKeyVerifier(new PromiscuousVerifier());
ssh.connect(hostName, 22);
ssh.getConnection()
  .getKeepAlive()
  .setKeepAliveInterval(5);
ssh.authPassword(userName, password);

Session session = ssh.startSession();
session.allocateDefaultPTY();
new CountDownLatch(1).await();
session.allocateDefaultPTY();

session.close();
ssh.disconnect();
```

在上述代码中，我们可以看到**配置_KeepAliveProvider.KEEP_ALIVE_为SSHJ库启用了keep alive模式。**

我们使用_setKeepAliveInterval()_来设置客户端发送keep-alive消息之间的间隔。

## 11. 结论

在本文中，我们回顾了SSHJ库的基本使用和实现。我们了解了如何使用SCP和SFTP模式上传或下载文件。此外，我们还看到了如何使用密码或公钥认证连接SSH客户端。通过SSHJ库，远程和本地端口转发也是可行的。总的来说，SSHJ库为Java中的SSH客户端做了大部分事情。

如常，源代码示例可在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。