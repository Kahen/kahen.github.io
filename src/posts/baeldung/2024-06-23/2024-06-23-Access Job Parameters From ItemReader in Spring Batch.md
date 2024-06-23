---
date: 2024-06-23
category:
  - Spring Batch
  - Java
tag:
  - JobParameters
  - ItemReader
head:
  - - meta
    - name: keywords
      content: Spring Batch, Java, JobParameters, ItemReader
---
# Spring Batch中从ItemReader访问作业参数

Spring Batch是一个功能强大的Java批处理框架，因此成为数据处理活动和计划作业运行的热门选择。根据业务逻辑的复杂性，作业可能依赖不同的配置值和动态参数。

在本文中，我们将探讨如何使用_JobParameters_以及如何从关键的批处理组件中访问它们。

### 2.1. 依赖项
要开始演示应用程序，**我们需要添加Spring Batch和H2依赖项：**

### 2.2. 准备测试数据
让我们通过定义_schema-all.sql_中的模式开始：

### 2.3. _Medicine_ 领域类
对于我们的服务，**我们需要一个简单的_Medicine_实体类：**

### 2.4. 应用程序属性
应用程序需要在_src/main/resources/application.properties_文件中的多个属性：

### 3.1. _StepScope_和_JobScope_
除了常规Spring中众所周知的bean作用域外，**Spring Batch引入了两个额外的作用域：_StepScope_和_JobScope_**。有了这些作用域，就可以为工作流中的每个步骤或作业创建独特的bean。Spring确保与特定步骤/作业相关联的资源在其整个生命周期中被隔离和管理。

### 3.2. 在计划执行中填充作业参数
让我们定义_MedExpirationBatchRunner_类，该类将通过cron表达式（在我们的例子中每1分钟）启动我们的作业。**我们应该使用_@EnableScheduling_注解类，并定义适当的_@Scheduled_入口方法：**

### 3.3. 在Bean定义中读取作业参数
**使用SpEL我们可以从我们的配置类中的bean定义访问作业参数。**Spring将所有参数合并为一个常规的_String_到_Object_映射：

### 3.4. 直接在服务中读取作业参数
**另一个选择是在_ItemReader_本身中使用setter注入。**我们可以通过SpEL表达式像从任何其他映射一样获取确切的参数值：

### 3.5. 通过Before Step读取作业参数
**Spring Batch提供了一个_StepExecutionListener_接口，允许我们监听步骤执行阶段：在步骤开始之前和步骤完成后。**我们可以利用这个特性，在步骤开始之前访问属性，并执行任何自定义逻辑。最简单的方法是使用_@BeforeStep_注解，它对应于_StepExecutionListener_中的_beforeStep()_方法：

## 4. 作业配置
让我们将所有部分结合起来看看全貌。

### 4.1. 配置_ItemReader_
首先，我们想要配置_ExpiresSoonMedicineReader_并丰富通用参数：

### 4.2. 配置_ItemProcessor_和_ItemWriter_
_ItemProcessor_和_ItemWriter_遵循与_ItemReader_相同的方法。因此，它们不需要任何特定的配置来访问参数。bean定义逻辑通过_enrichWithJobParameters()_方法初始化通用参数。其他参数，由单个类使用且不需要在所有组件中填充的，是通过Spring在相应类中的setter注入来丰富的。

### 4.3. 配置完整流程
我们不需要采取任何特定操作来配置带有参数的作业。因此，我们只需要组合所有的bean：

## 5. 运行应用程序
**让我们运行一个完整的例子，看看应用程序如何使用所有参数。**我们需要从_SpringBatchExpireMedicationApplication_类启动Spring Boot应用程序。

## 6. 结论
在本文中，我们学习了如何在Spring Batch中使用作业参数。_ItemReader_、_ItemProcessor_和_ItemWriter_可以在bean初始化期间手动用参数丰富，或者可以通过_@BeforeStep_或setter注入由Spring丰富。

如常，完整的示例可以在GitHub上找到。