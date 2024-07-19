---
date: 2022-04-01
category:
  - MongoDB
  - Java
tag:
  - MongoDB
  - Java
  - Connection
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, Connection, Check
------
# 检查与MongoDB的连接

## 1. 概述

在本教程中，我们将学习如何检查与MongoDB的连接。

重要的是要连接到单个MongoDB实例，我们需要指定MongoDB实例的URI。

## 2. 使用Mongo Shell检查连接

在本节中，我们将使用mongo shell命令连接到MongoDB服务器。我们将探索连接到MongoDB的不同情况。

### 2.1. 在默认端口上检查连接

**默认情况下，MongoDB运行在端口_27017_，但我们也可以在其他端口上运行它。** 我们可以使用简单的mongo命令连接到MongoDB服务器：

```shell
$ mongo
MongoDB shell version v4.4.2
connecting to: mongodb://localhost:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("b7f80a0c-c7b9-4aea-b34c-605b85e601dd") }
MongoDB server version: 4.0.1-rc0-2-g54f1582fc6
```

在上面的命令中，默认情况下，MongoDB假设端口为_27017_。如果MongoDB服务器关闭，我们会遇到以下错误：

```shell
$ mongo --host localhost --port 27017 admin
MongoDB shell version v4.4.2
connecting to: mongodb://localhost:27017/admin?compressors=disabled&gssapiServiceName=mongodb
Error: couldn't connect to server localhost:27017, connection attempt failed:
  SocketException: Error connecting to localhost:27017 :: caused by :: Connection refused :
connect@src/mongo/shell/mongo.js:374:17
@(connect):2:6
exception: connect failed
exiting with code 1
```

在这种情况下，我们遇到错误是因为我们无法连接到服务器。

### 2.2. 在受保护的MongoDB数据库上检查连接

MongoDB可以通过身份验证进行保护。在这种情况下，我们需要在命令中传递用户名和密码：

```shell
$ mongo mongodb://baeldung:baeldung@localhost:27017
```

在这里，我们使用用户名“baeldung”和密码“baeldung”连接到在localhost上运行的MongoDB。

### 2.3. 在自定义端口上检查连接

我们也可以在自定义端口上运行MongoDB。我们所要做的就是在_mongod.conf_文件中进行更改。如果MongoDB在其他端口上运行，我们需要在命令中提供该端口：

```shell
$ mongo mongodb://localhost:27001
```

在这里，在mongo shell中，我们还可以检查数据库服务器当前的活动连接。

```shell
var status = db.serverStatus();
status.connections
{
    "current" : 21,
    "available" : 15979
}
```

_serverStatus_返回一个文档，提供数据库进程当前状态的概述。定期运行_serverStatus_命令将收集有关MongoDB实例的统计信息。

## 3. 使用Java驱动代码检查连接

到目前为止，我们已经学会了如何使用shell检查与MongoDB的连接。现在让我们看看如何使用Java驱动代码进行同样的操作：

```java
MongoClientOptions.Builder builder = MongoClientOptions.builder();
// builder settings
ServerAddress ServerAddress = new ServerAddress("localhost", 27017);
MongoClient mongoClient = new MongoClient(ServerAddress, builder.build());

try {
    System.out.println("MongoDB Server is Up:- " + mongoClient.getAddress());
    System.out.println(mongoClient.getConnectPoint());
    System.out.println(db.getStats());
} catch (Exception e) {
    System.out.println("MongoDB Server is Down");
} finally{
    mongoClient.close();
}
```

在上面的代码中，我们首先创建了_MongoClientOption_构建器以自定义_MongoClient_连接的配置，然后使用服务器地址创建了_MongoClient_连接。假设MongoDB服务器在localhost的_27017_端口上运行。否则，_MongoClient_将抛出错误。

## 4. 结论

在本教程中，我们学习了如何通过不同的实时案例检查MongoDB服务器的连接。

首先，我们使用mongo默认命令检查了连接，然后使用了经过身份验证的命令，还连接到了在自定义端口上运行的MongoDB服务器。接下来，我们检查了MongoDB shell和Java驱动代码的连接。

所有案例的示例都可以在GitHub上找到。