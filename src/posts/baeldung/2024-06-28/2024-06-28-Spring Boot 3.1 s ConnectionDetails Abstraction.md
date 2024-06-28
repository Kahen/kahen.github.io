---
date: 2023-10-05
category:
  - Spring Boot
  - Connection Details
tag:
  - Spring Boot 3.1
  - ConnectionDetails
head:
  - - meta
    - name: keywords
      content: Spring Boot 3.1, ConnectionDetails, 外部化连接属性
---
# Spring Boot 3.1 的 ConnectionDetails 抽象

在本教程中，我们将学习 Spring Boot 3.1 引入的 ConnectionDetails 接口，以外部化连接属性。Spring Boot 提供了开箱即用的抽象，以集成诸如关系型数据库、NoSQL 数据库、消息服务等远程服务。

传统上，application.properties 文件用于存储远程服务的连接详情。因此，将这些属性外部化到像 AWS Secret Manager、Hashicorp Vault 等外部服务变得困难。

为了解决这个问题，Spring Boot 引入了 ConnectionDetails。这个接口是空的，并且充当标签。Spring 提供了这个接口的子接口，例如 JdbcConnectionDetails、CassandraConnectionDetails、KafkaConnectionDetails 等。它们可以在 Spring 配置类中作 Bean 指定。之后，Spring 依赖这些配置 Bean 动态检索连接属性，而不是静态的 application.properties 文件。

我们将从介绍一个用例开始，然后转移到其实现。