---
date: 2024-07-08
category:
  - Java
  - Software Engineering
tag:
  - Interface Driven Development
  - IDD
  - Design Patterns
head:
  - - meta
    - name: keywords
      content: Java, IDD, Interface Driven Development, Software Design
---

# 接口驱动开发（IDD）介绍

## **1. 概述**

在本教程中，我们将讨论接口驱动开发（Interface Driven Development, IDD），它为编码提供了结构。我们将引导您使用IDD并解释其优势。

## **2. 理念**

接口驱动开发是一种开发方法，侧重于系统不同组件之间的接口设计。相应的接口定义了可用的方法。因此，我们提供了有关可用功能、预期参数和返回值的信息。

### **2.1. 优势**

由于IDD在开始时就定义了接口，拥有多名员工的项目可以同时开始使用它并开发其实现。这**加速了开发，因为他们可以在实现准备就绪之前编写代码**。

此外，**各个模块之间的耦合变得更加松散，从而形成了一个更灵活、更健壮的系统**。然后，单个接口可以有一个或多个实现。其他模块可以直接实例化这些接口，或者使用注解进行注入。如果在使用Spring Boot时有多种可能的实现，_@Qualifier_ 注解有助于选择正确的实现。

例如，可能有一个接口定义了以下方法：

```
HelpRequest getHelpRequestById(Long id);
```

两个服务可以实现这个接口，一个访问缓存，另一个访问数据库以返回所需的对象。使用接口的类对实现漠不关心，可以根据要求灵活地交换它们。**这导致了更好的可维护性，因为使用接口的类不需要担心实现细节**，只要接口中定义的契约得到遵守即可。

这种方法与测试驱动开发有些相似，首先定义测试，然后进行匹配的实现，直到测试成功运行。IDD方法也在测试中提供了显著的好处。

**接口使得轻松模拟各个方法成为可能**，而无需通过模拟框架来模拟类。这允许系统的每个组件独立进行测试。自Java 15以来，还可以使用封闭接口来**指定允许实现接口的类。这提供了额外的保护**。

## **3. 示例**

下面，我们通过一个具体的例子来看如何使用IDD进行操作。例如，让我们以一个名为‘Machbarschaft’的应用程序为例，它帮助邻居相互联系并提出帮助请求，例如帮助购物或家务。

在IDD的背景下，应用程序的开发将按照以下步骤进行。

### 3.1. 识别接口

我们首先识别不同的应用程序模块，如通知、帮助请求或用户管理。在本文中，我们将专注于帮助请求。

### 3.2. 确定用例

现在我们寻找所有模块的可能用例。例如，对于帮助请求模块，可能是创建帮助请求、完成或编辑帮助请求以及检索所有具有某种状态的帮助请求。

### 3.3. 定义接口

考虑到这些用例，《HelpRequestService》的接口可能看起来像这样：

```
public interface HelpRequestService {
    HelpRequestDTO createHelpRequest(CreateHelpRequestDTO createHelpRequestDTO);

    List```<HelpRequestDTO>``` findAllByStatus(HelpRequestStatus status);

    HelpRequestDTO updateHelpRequest(UpdateHelpRequestDTO updateHelpRequestDTO);
}
```

_createHelpRequest_ 方法接受一个 _CreateHelpRequestDTO_，其中包含有关创建帮助请求的信息，并返回映射到 _HelpRequestDTO_ 的创建的帮助请求。

_findAllByStatus_ 方法只接受 _HelpRequestStatus_，例如，_OPEN_ 只返回符合标准的 _List_ 的所有 _HelpRequestDTO_。这允许开发者只选择应该由用户完成的帮助请求或显示当前正在处理的所有帮助请求。

最后一个方法是用于更新帮助请求。这里，方法传递更新的信息，然后返回映射到 _HelpRequestDTO_ 的更新的帮助请求。

### 3.4. 模块的独立开发

开发者可以默认独立开发模块。这里每个模块将依赖于其他模块的接口来执行其功能。实现可能如下所示：

```
public class HelpRequestServiceImpl implements HelpRequestService {

    @Override
    public HelpRequestDTO createHelpRequest(CreateHelpRequestDTO createHelpRequestDTO) {
        // 这里是实现
        return new HelpRequestDTO();
    }

    @Override
    public List```<HelpRequestDTO>``` findAllByStatus(HelpRequestStatus status) {
        // 这里是实现
        return List.of(new HelpRequestDTO());
    }

    @Override
    public HelpRequestDTO updateHelpRequest(UpdateHelpRequestDTO updateHelpRequestDTO) {
        // 这里是实现
        return new HelpRequestDTO();
    }
}
```

也可能有 _HelpRequestServiceImpl_ 的异步版本，或者如前所述，一个版本使用缓存，另一个版本使用数据库访问。

### 3.5. 实现的测试

现在接口已经成功实现，我们可以进行广泛的测试以确保代码按预期工作。以 _findAllByStatus_ 方法为例，我们可以检查该方法是否只包含具有正确状态的对象：

```
@Test
void givenHelpRequestList_whenFindAllByStatus_shouldContainOnlyStatus(){
    HelpRequestService helpRequestService = new HelpRequestServiceImpl();
    List```<HelpRequestDTO>``` allByStatusOpen = helpRequestService.findAllByStatus(HelpRequestStatus.OPEN);
    Assertions.assertThat(allByStatusOpen).extracting(HelpRequestDTO::getStatus)
      .containsOnly(HelpRequestStatus.OPEN);
}
```

### 3.6. 模块的集成

在开发和测试每个模块之后，团队通过通过它们定义的接口相互通信来集成它们。这将允许轻松集成和不同模块之间的低耦合：

```
HelpRequestService helpRequestService = new HelpRequestServiceImpl();
helpRequestService.findAllByStatus(HelpRequestStatus.OPEN);
```

通过使用IDD，开发“Machbarschaft”应用程序变得更加容易和健壮。清晰定义的接口和模块的独立开发促进了测试和集成，而模块之间的低耦合则实现了快速和安全的维护和扩展。

总的来说，IDD有助于开发高质量和用户友好的应用程序，满足用户的需求。

## **4. 结论**

在本文中，我们讨论了IDD的优势，并展示了如何使用IDD的具体示例。总的来说，IDD可以帮助减少系统的复杂性，提高可维护性和可扩展性，并降低开发时间和成本。

像往常一样，示例代码可在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)