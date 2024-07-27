---
date: 2021-08-01
category:
  - Software Engineering
  - Design Patterns
tag:
  - MVC
  - MVP
head:
  - - meta
    - name: keywords
      content: MVC, MVP, design pattern, software architecture
---
# MVC和MVP模式的区别 | Baeldung

## 1. 概述

在本教程中，我们将学习模型-视图-控制器（Model View Controller，简称MVC）和模型-视图-呈现器（Model View Presenter，简称MVP）模式。我们还将讨论它们之间的区别。

## 2. 设计模式和架构模式

### 2.1. 架构模式

架构模式是软件架构中常见问题的通用且可复用的解决方案。它们对代码库有广泛的影响。

例如，它们会水平或垂直地影响软件。所谓水平，是指如何在一个层内组织代码。相反，垂直则意味着一个请求是如何从外层处理到内层并返回的。

一些更常见的架构模式包括**MVC**、**MVP**和**MVVM**。

### 2.2. 设计模式

设计模式通常与代码级别的共性相关。它们为细化和构建较小的子系统提供了各种方案。

此外，设计模式是中等规模的策略，它们细化了实体及其关系的某些结构和行为。一些常用的设计模式包括单例、工厂和建造者模式。

**设计模式与架构模式在范围上有所不同**。它们更加局部化，对代码库的影响较小。相反，它们只影响代码库的特定部分。在下一节中，我们将讨论我们为什么使用这些模式。

使用这些模式的主要思想是**分离业务层和UI层之间的关注点**。这些模式为我们提供了易于测试等功能。它们还隐藏了数据访问。

我们可以说，通过隔离主要组件，它们更适应变化。然而，最大的缺点是增加了复杂性和学习曲线。

## 4. MVC模式

在MVC模式中，根据三个不同的关注点将功能划分为三个组件。首先，**视图负责渲染UI元素**。其次，**控制器响应UI操作**。最后，**模型处理业务行为和状态管理**。

在大多数实现中，所有三个组件可以直接相互交互。然而，在某些实现中，控制器负责确定要显示哪个视图。

下面的图表显示了MVC的控制流程：

![img](https://www.baeldung.com/wp-content/uploads/2021/08/MVC_Pattern-273x300-1.png)

模型代表整个业务逻辑层。视图代表从模型获取的数据。此外，它还处理呈现逻辑。最后，控制器处理控制流程逻辑并更新模型。

MVC**没有指定视图和模型应该如何内部结构化**。通常，视图层在一个单独的类中实现。

然而，在这种情况下，**可能会出现一些问题**：

- 视图和模型紧密耦合。结果，视图的功能需求可以很容易地渗透到模型中，污染业务逻辑层
- 视图是单体的，并且通常与UI框架紧密耦合。因此，对视图进行单元测试变得困难

## 5. MVP模式

MVP模式是一种基于MVC模式概念的UI呈现模式。然而，它并没有指定如何构建整个系统。**它只规定了如何构建视图**。

一般来说，这种模式将责任分配给四个组件。首先**视图负责渲染UI元素**。其次，视图接口用于松散地将呈现器与其视图解耦。

最后，**呈现器与视图和模型交互，模型负责业务行为和状态管理**。

在某些实现中，呈现器与服务（控制器）层交互以检索/持久化模型。视图接口和服务层通常用于使编写呈现器和模型的单元测试更容易。

下面的图表显示了MVP的控制流程：

![img](https://www.baeldung.com/wp-content/uploads/2021/08/mvp-300x227-1.png)

模型与MVC中的相同，包含业务逻辑。视图是一个被动接口，显示数据。它将用户操作发送给呈现器。

呈现器位于模型和视图之间。它触发业务逻辑并使视图更新。它从模型接收数据并在视图中显示相同的数据。这使得测试呈现器变得更加容易。

尽管如此，**MVP还是存在一些问题**：

- 控制器经常被省略。由于缺少控制器，控制流程也必须由呈现器处理。这使得呈现器负责两个关注点：更新模型和呈现模型
- 我们不能使用数据绑定。如果UI框架允许绑定，我们应该利用它来简化呈现器

## 6. MVC和MVP实现

我们将通过一个简单的例子来理解这些模式。我们有一个需要显示和更新的产品。这些操作在MVC和MVP中处理方式不同。

### 6.1. 视图类

我们有一个简单的视图类，输出产品详情。MVP和MVC的视图类相似：

```
public class ProductView {
    public void printProductDetails(String name, String description, Double price) {
        log.info("Product details:");
        log.info("product Name: " + name);
        log.info("product Description: " + description);
        log.info("product price: " + price);
    }
}
```

### 6.2. MVP模型和呈现器类

现在让我们定义一个负责业务逻辑的_MVP中的Product_类：

```
public class Product {
    private String name;
    private String description;
    private Double price;

   //getters & setters
}
```

MVP中的呈现器类从模型获取数据并将其传递给视图：

```
public class ProductPresenter {
    private final Product product;
    private final ProductView view;

     //getters,setters & constructor

    public void showProduct() {
        productView.printProductDetails(product.getName(), product.getDescription(), product.getPrice());
    }
}
```

### 6.3. MVC模型类

对于MVC，区别在于**视图将从模型类而不是MVP中的呈现器类获取数据**。

我们可以为MVC定义一个模型类：

```
public class Product {
    private String name;
    private String description;
    private Double price;
    private ProductView view;

    //getters,setters

    public void showProduct() {
        view.printProductDetails(name, description, price);
    }
}
```

**注意_showProduct()_方法**。这个方法处理从模型到视图的数据传递。在MVP中，这是在呈现器类中完成的，在MVC中，是在模型类中完成的。

## 7. MVC和MVP的比较

MVC和MVP之间没有太多区别。两种模式都侧重于将责任分配给多个组件，从而促进UI（视图）与业务层（模型）的松散耦合。

主要区别在于模式的实现方式以及在一些高级场景中。让我们看看**一些关键区别**：

- 耦合：在MVC中，视图和模型紧密耦合，但在MVP中松散耦合
- 通信：在MVP中，视图-呈现器和呈现器-模型之间的通信通过接口进行。然而，在MVC中，控制器和视图层位于同一活动/片段中
- 用户输入：在MVC中，用户输入由控制器处理，它指导模型进行进一步操作。但在MVP中，用户输入由视图处理，它指导呈现器调用适当的函数
- 关系类型：在MVC中，控制器和视图之间存在**多对一**的关系。一个控制器可以根据所需操作选择不同的视图。另一方面，在MVP中，呈现器和视图具有一对一的关系，一个呈现器类一次管理一个视图
- 主要组件：在MVC中，控制器负责。它创建适当的视图并根据用户请求与模型交互。相反，在MVP中，视图负责。视图调用呈现器的方法，后者进一步指导模型
- 单元测试：由于紧密耦合，MVC对单元测试的支持有限。另一方面，MVP很好地支持单元测试

## 8. 为什么MVP比MVC有优势

MVP比MVC略胜一筹，因为它可以将我们的应用程序分解为模块。因此，我们可以避免不断创建视图。换句话说，MVP可以帮助我们使视图可重用。

## 9. 结论

在本教程中，我们看到了MVC和MVP架构模式以及它们之间的比较。

示例代码可在GitHub上找到。