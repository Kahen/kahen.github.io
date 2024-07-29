---
date: 2021-06-22
category:
  - JPA
  - 工具
tag:
  - JPA
  - 工具
  - IntelliJ IDEA
  - Eclipse
head:
  - - meta
    - name: keywords
      content: JPA, 工具, 教程, IntelliJ IDEA, Eclipse
---
# JPA 支持 - 2021年工具生态系统现状

在本教程中，我们将看看一些支持JPA的工具。我们将重点介绍两个最流行的IDE：IntelliJ IDEA和Eclipse中可用的插件。

## 2. IntelliJ IDEA和Eclipse中的JPA支持

JPA是Java应用程序中使用关系数据库的最广泛使用的规范。实际上，**JPA定义了从注解到数据处理规则的所有实现方面。**

我们通常不仅仅在JPA实体上工作。除了纯ORM相关的代码，我们可能还需要诸如数据库版本控制系统、SQL/JPQL/HQL查询优化、与IoC容器的集成等。这就是插件变得非常有帮助的地方。它们可以支持数据库逆向工程、模式生成、迁移脚本生成或Spring Data JPA存储库脚手架。

当涉及到在应用程序开发中使用JPA框架时，通常都是通过IDE来完成的。这是因为它们为我们提供了**一套强大的工具，以提高开发人员的生产力：**

- 样板代码生成
- 数据库逆向工程
- 数据对象定义生成
- Java和JPQL的高级代码自动完成
- JPA特定的代码建议
- 等等。

让我们看看两个最常见的IDE - IntelliJ IDEA和Eclipse - 它们在JPA应用程序开发支持方面提供了什么。

## 3. IntelliJ IDEA

IntelliJ IDEA有两个版本：社区版（免费）和旗舰版（付费）。**旗舰版捆绑了一个支持JPA的插件。**

另一方面，社区版没有为使用JPA、Hibernate、Spring Data等提供专门的支持。

然而，IntelliJ拥有一个广泛的市场，有各种插件。因此，我们可以找到几乎所有技术的插件，JPA也不例外。

**对于IntelliJ IDEA社区版用户，我们将介绍JPA Buddy插件**来支持JPA特性。尽管它也可以作为IntelliJ IDEA旗舰版的一个很好的补充。

### 3.1. IntelliJ旗舰版的JPA插件

这个插件提供了一套高级功能，包括：

- JPA实体的ER图
- 持久性工具窗口
- 数据库逆向工程
- JPA控制台，用于测试JPQL语句并生成DDL脚本
- JPA特定的代码检查和自动完成

在IntelliJ IDEA旗舰版中，我们可以使用专用的工具窗口 - “持久性”。这将显示项目中JPA实体的结构。

在这个视图中，我们可以使用可视化工具创建实体属性和关系：

![img](https://www.baeldung.com/wp-content/uploads/2021/06/persistence.png)

“持久性”窗口还允许我们使用代码编辑器中的嵌入图标快速导航代码及其相关的实体层次结构。

我们还可以利用逆向工程过程。它将为我们生成JPA实体、关联和适当的注解。同时，它还会创建_persistence.xml_文件或更新一个已存在的文件。

除了通用的JPA支持外，如果我们选择Hibernate作为JPA实现，它还会提供额外的帮助。我们可以执行Hibernate特定的操作，例如（但不限于）：

- 管理配置和映射文件
- 在HQL控制台中执行HQL查询

有一个详细的评论展示了插件在YouTube上的实际使用情况。

### 3.2. JPA Buddy

**JPA Buddy提供了一套可视化编辑器，用于处理JPA实体和Spring Data JPA**存储库。此外，它还支持Java和Kotlin语言。

让我们看看它提供的主要功能：

- 可视化工具和代码导航
- Hibernate Bean验证支持
- Hibernate类型和JPA转换器支持
- 数据库版本工具支持（Liquibase和Flyway）
- JPA特定的代码检查
- Kotlin支持
- Spring Data存储库可视化设计器

我们不需要记住所有的JPA注解、Spring Data存储库方法命名规则或Liquibase标签。插件允许我们从调色板中选择所需的项目。

因此，**它使我们能够使用可视化编辑器更新它们的属性**，而不是编写代码：

![img](https://www.baeldung.com/wp-content/uploads/2021/06/buddy3.png)

JPA Buddy解决的另一个挑战是数据库版本控制。插件支持Liquibase和Flyway工具，并可以生成相应的XML或SQL迁移脚本。

JPA Buddy通过比较项目数据库与代码库中定义的实际JPA实体来生成脚本。生成后，我们可以在将脚本保存到代码库之前审查生成的脚本并更新它们。

除了这个之外，**插件还引入了几个智能检查和快速修复**，例如：

- 实体代码中缺少ID字段
- 缺少无参数构造函数
- Lombok使用中的潜在问题（例如，不当的equals()和hashCode()定义）

除了JPA支持外，插件**还可以协助创建Spring Data JPA存储库**。它提供了可视化编辑器，可以帮助我们进行正确的存储库方法命名。

## 4. Eclipse

众所周知，Eclipse有一个庞大的插件生态系统。尽管如此，**Dali Tools插件是Eclipse IDE中JPA支持的事实标准**。

让我们探索这个插件。然后，我们将看看如果我们的项目中使用Hibernate，我们可以得到一些额外的支持。

### 4.1. Dali Tools

**Dali涵盖了JPA开发的几乎所有领域**。它的功能包括（但不限于）：

- JPA实体的ER图
- 可视化编辑器和导航器
- 基于JPA模型的DDL（SQL）生成
- 数据库逆向工程

插件提供了**两个主要的可视化工具**。上下文相关的“JPA Details”编辑器允许我们处理我们可以在“JPA Structure”导航器中选择的不同JPA对象：

![img](https://www.baeldung.com/wp-content/uploads/2021/06/dali.png)

我们可以选择并更改：

- 实体定义，包括命名查询（带JPQL代码辅助）
- 实体属性和关联：一对多、多对一等
- _orm.xml_文件。我们可以编辑项目的默认映射和持久性信息

此外，专用的_persistence.xml_编辑器允许我们避免记忆所有可以根据JPA规范在配置文件中使用的参数。我们可以编辑从连接选项到锁定超时或验证模式的所有内容。

Dali Tools插件**可以基于JPA模型生成并执行DDL SQL**，针对特定数据库。此外，执行阶段与生成阶段分离，因此我们可以在将其应用于应用程序的数据库之前审查生成的SQL。

数据库逆向工程过程设置允许我们更改实体代码中的以下选项：

- PK生成策略
- 字段访问策略
- 关联获取策略
- 集合属性类（列表，集合，...）

### 4.2. JBoss Hibernate Tools

让我们看看如果我们需要特定于Hibernate的支持，我们有哪些选择。在Eclipse插件库中，我们可以找到Jboss Hibernate Tools插件。

**这个插件可以独立使用，也可以与JPA Tools结合使用**，并提供：

- 代码生成工具，包括逆向工程和重构
- 高级Hibernate配置和映射文件显示和编辑
- HQL执行控制台和SQL预览
- 数据模型导出

逆向工程工具允许我们配置许多选项，包括表名掩码、类型映射，甚至可以从生成的实体类中排除某些列：

![img](https://www.baeldung.com/wp-content/uploads/2021/06/features-hibernate-launchconfig-reveng.png)

生成的JPA实体可以表示为带有*.hbm.xml*映射文件的POJO，或者作为注释类。此外，插件支持为每个实体生成DAO对象，带有CRUD方法。DAO使用Hibernate特定的类进行数据库访问。

HQL执行控制台和标准编辑器允许我们生成并执行HQL查询。除了执行任意HQL外，控制台还为HQL语句提供SQL预览。这可能有助于创建优化的SQL查询，以避免“n+1选择”和其他ORM边缘情况。

## 5. 结论

在本文中，我们介绍了在最受欢迎的Java IDEs：IntelliJ IDEA和Eclipse中可用的几种JPA支持工具。

我们看到这些工具如何在开发过程中帮助编写更好的应用程序并提高生产力。因此，在选择最佳工具时，我们不仅要注意“纯JPA”特性，还要注意与IDE和所选开发堆栈的集成。