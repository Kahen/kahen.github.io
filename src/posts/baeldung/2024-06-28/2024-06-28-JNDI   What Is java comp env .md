---
date: 2024-06-28
category:
  - JNDI
  - Java
tag:
  - Spring Boot
  - Spring Security
  - Spring Data JPA
head:
  - - meta
    - name: keywords
      content: JNDI, Java, Spring Boot, Spring Security, Spring Data JPA
---
# JNDI - java:comp/env 是什么？ | Baeldung## 概述

Java命名和目录接口（JNDI）是一个应用程序编程接口（API），它为基于Java的应用程序提供命名和目录服务。我们可以使用这个接口绑定对象/资源，查找或查询对象，并检测这些对象上的更改。

在本教程中，我们将特别探讨在JNDI命名中使用“java:comp/env”标准前缀的背景。

## 什么是Java命名和目录接口？

简单来说，命名服务是一个将名称与对象关联起来的接口，然后通过这些名称帮助找到这些对象。因此，命名服务维护了一组绑定，这些绑定将名称映射到对象。

JNDI API使应用程序组件和客户端能够查找分布式资源、服务和EJB。

## 访问命名上下文

_Context_接口提供了对命名环境的访问。使用这个对象，我们可以将名称绑定到对象上，重命名对象，并列出绑定。让我们看看如何获取上下文：

```java
JndiTemplate jndiTemplate = new JndiTemplate();
context = (InitialContext) jndiTemplate.getContext();
```

一旦我们有了上下文，我们就可以绑定对象：

```java
context.bind("java:comp/env/jdbc/datasource", ds);
```

然后，我们可以检索上下文中存在的对象：

```java
context.lookup("java:comp/env/jdbc/datasource");
```

正如前面的例子所示，我们将一个名称与标准前缀“java:comp/env”绑定。在我们的案例中，它是“java:comp/env/jdbc/datasource”，而不仅仅是“jdbc/datasource”。这个前缀是必须的吗？我们能完全避免它吗？让我们讨论一下。

### 目录服务

正如JNDI这个名字所表明的，它是一个命名和目录服务。相应地，目录服务将名称与对象关联起来，并允许这些对象具有属性。因此，我们不仅可以通过名称查找对象，还可以获取对象的属性或根据其属性找到对象。一个实时的例子是电话目录服务，其中订阅者的名称不仅映射到他的电话号码，还映射到他的地址。

目录通常以层次结构排列对象。在大多数情况下，目录对象存储在树状结构中。因此，第一个元素/节点可能包含组对象，这些组对象又可能包含特定的对象。

例如，在“java:comp/env”中，“comp”元素是第一个节点，下一级包含“env”元素。从这里，我们可以根据我们的约定存储或访问资源。例如，“jdbc/datasource”共享一个数据源对象。

### 分解

让我们分解我们之前的命名示例：“java:comp/env/jdbc/datasource”。

- **java** 就像JDBC连接字符串中的“jdbc:”。它充当协议。
- **comp** 是所有JNDI上下文的根。它绑定到一个保留用于组件相关绑定的子树。名称“comp”是component（组件）的缩写。根上下文中没有其他绑定。
- **env** 名称“env”绑定到一个保留用于组件的环境相关绑定的子树。“env”是environment（环境）的缩写。
- **jdbc** 是_jdbc_资源的子上下文。还有其他类型或连接工厂的子上下文。
- **datasource** 是我们的JDBC资源的名称。

在这里，**除了最后一个元素之外，所有其他父元素都是标准名称，因此不能更改**。

**此外，根上下文保留用于策略的未来扩展**。具体来说，这适用于命名资源，这些资源不与组件本身绑定，而是与其他类型的实体绑定，如用户或部门。例如，未来的策略可能允许我们使用名称如“java:user/Anne”和“java:org/finance”来命名用户和组织/部门。

## 相对路径与绝对路径

如果我们想要使用JNDI查找的较短版本，我们可以通过子上下文的帮助来实现。这样，我们就不需要提及命名的完整路径（绝对路径），而是子上下文的相对路径。

我们可以从_InitialContext_对象派生子上下文，这样我们就不必为检索的每个资源重复“java:comp/env”：

```java
Context subContext = (Context) context.lookup("java:comp/env");
DataSource ds = (DataSource) subContext.lookup("jdbc/datasource");
```

正如我们在这里看到的，我们创建了一个子上下文，它保存了“java:comp/env”内的值，然后使用这个子上下文（相对路径）来查找其中的特定命名。

## 结论

在本文中，我们快速了解了JNDI是什么以及它的用例。然后，我们看到了如何将JNDI名称绑定到上下文中并查找相同的名称。

随后，我们看到了标准前缀：“java:comp/env”的分解以及在JNDI命名中使用这个前缀的原因。我们还注意到，未来的策略可能会扩展根上下文“comp”和子上下文“env”。

如往常一样，本文中使用的所有代码示例都可以在GitHub上找到。

OK