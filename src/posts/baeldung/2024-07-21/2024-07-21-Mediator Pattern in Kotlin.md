---
date: 2022-11-01
category:
  - Design Patterns
  - Kotlin
tag:
  - Mediator Pattern
  - Kotlin
head:
  - - meta
    - name: keywords
      content: design pattern, kotlin, mediator pattern, software design
---
# Kotlin中的中介者模式 | Baeldung关于Kotlin

## 1. 引言

开发者经常面临的一个挑战是管理系统中各个组件之间的通信。确实，这就是设计模式发挥作用的地方，它们为软件设计中常见的问题提供经过验证的解决方案。具体来说，设计模式是软件设计中特定上下文中经常出现问题的一种通用且可重用的解决方案。

在本教程中，我们将深入研究中介者模式，这是一种行为设计模式，并探索其在Kotlin中的实现。

中介者模式通过集中对象之间的通信来促进松散耦合，从而避免它们之间的直接连接。组件不是直接通信，而是通过中介者对象进行通信。此外，这个中介者封装了交互逻辑，允许组件独立且彼此不知情。

在中介者模式中，特别是关键组件协同工作以实现解耦和有组织的系统。让我们更深入地了解每个组件的角色和责任。

### 2.1. 中介者

中介者在中介者模式中充当中心枢纽，**作为各种组件之间通信和协调的促进者**。其主要职责包括：

- 作为所有参与者遵守的通信接口
- 跟踪所有当前参与者的引用以便于它们之间的通信
- 在没有各个组件之间直接依赖的情况下协调参与者之间的信息流

这些职责使中介者成为此模式中的中心控制点。确实，通过集中控制，中介者促进了更易于维护和扩展的系统。此外，通信逻辑的变更或新组件的添加可以在中介者中处理，减少了对各个组件的影响。

### 2.2. 同事

**同事是系统中通过中介者与其他组件交互的任何组件**。其角色包括：

- 维护对中介者的引用，以便同事可以在不直接引用其他同事的情况下发送和接收消息
- 通过中介者发送和接收消息以支持系统内的信息流

这允许同事积极参与，通过响应消息和执行操作，同时为系统的整体行为做出贡献，而不必担心与其他组件的复杂连接。

### 2.3. 协作动态

中介者模式在同事之间建立了多对多的关系，允许灵活和动态的协作。**同事可以通过中介者间接相互通信，促进了模块化和可扩展的架构**。因此，该模式通过在中介者中封装通信逻辑，最小化了各个组件之间的依赖，增强了复杂系统的可维护性、可扩展性和可测试性。

## 3. 在Kotlin中的实现

在这一部分中，我们将在Kotlin中实现中介者模式。

### 3.1. 没有中介者模式的紧密耦合示例

我们将在我们的Kotlin代码中引入一个紧密耦合的场景，我们稍后将使用中介者模式来解决：

```kotlin
class Airplane(val registrationNumber: String) {
    private val otherAirplanes: MutableList```<Airplane>``` = mutableListOf()
    fun addAirplane(airplane: Airplane) {
        otherAirplanes.add(airplane)
    }
    fun removeAirplane(airplane: Airplane) {
        otherAirplanes.remove(airplane)
    }
    fun takeoff() {
        println("$registrationNumber is taking off.")
        otherAirplanes.forEach { it.removeAirplane(this) }
        otherAirplanes.clear()
    }
    fun land(otherAirplanes: List```<Airplane>```) {
        println("$registrationNumber is landing.")
        this.otherAirplanes.addAll(otherAirplanes)
        otherAirplanes.forEach { it.addAirplane(this) }
    }
}
```

在这个例子中，_takeoff()_方法展示了飞机之间的直接通信。它遍历其他飞机的列表，并调用它们的_removeAirplane()_方法，实质上是通知它们起飞。这在飞机之间创建了一个紧密的耦合，因为每架飞机都需要知道其他飞机及其方法。

类似地，_land()_方法通过调用它们的_addAirplane()_方法来建立与其他飞机的直接通信，通知它们着陆。

**这种直接通信在_Plane_对象之间创建了一个紧密的耦合，因为每架飞机都需要知道其他飞机的存在和行为。**

### 3.2. 中介者模式的实现

让我们看看如何使用中介者模式来处理相同的场景，以保持我们的代码可扩展性：

```kotlin
interface AirTrafficController {
    fun registerAirplane(airplane: Airplane)
    fun deregisterAirplane(airplane: Airplane)
    fun requestTakeOff(airplane: Airplane)
    fun requestLanding(airplane: Airplane)
}
class Airplane(private val registrationNumber: String, private val controller: AirTrafficController) {
    fun takeOff() {
        println("$registrationNumber is requesting takeoff.")
        controller.requestTakeOff(this)
    }
    fun land() {
        println("$registrationNumber is requesting landing.")
        controller.requestLanding(this)
    }
    fun notifyTakeOff() {
        println("$registrationNumber has taken off.")
        controller.deregisterAirplane(this)
    }
    fun notifyLanding() {
        println("$registrationNumber has landed.")
        controller.registerAirplane(this)
    }
}
```

现在我们已经引入了同事类和中介者接口，让我们看看我们的中介者的具体实现：

```kotlin
class AirTrafficControlTower : AirTrafficController {
    private val registeredAirplanes: MutableSet```<Airplane>``` = mutableSetOf()
    override fun registerAirplane(airplane: Airplane) {
        registeredAirplanes.add(airplane)
    }
    override fun deregisterAirplane(airplane: Airplane) {
        registeredAirplanes.remove(airplane)
    }
    override fun requestTakeOff(airplane: Airplane) {
        if (registeredAirplanes.contains(airplane)) {
            airplane.notifyTakeOff()
        }
    }
    override fun requestLanding(airplane: Airplane) {
        if (!registeredAirplanes.contains(airplane)) {
            airplane.notifyLanding()
        }
    }
}
```

在这个例子中，_Plane_对象并不直接相互通信。相反，它们通过_AirTrafficController_接口进行通信。_AirTrafficControlTower_实现了_AirTrafficController_接口，并处理飞机之间的通信。

_Plane_类向_AirTrafficController_注册和注销自己，并使用控制器请求起飞和着陆。控制器决定是否批准或拒绝这些请求。

这个例子展示了飞机的解耦，允许它们通过中介者_Air Traffic Controller_进行通信，而无需了解彼此。

### 4.1. 中介者模式的优点

中介者模式无疑具有一些明显的优势，可以帮助处理项目复杂性：

- 通过使用中介者，设计实现了对通信逻辑的集中控制，简化了不同组件之间的交互。**值得注意的是，该模式允许在中介者内无缝修改通信逻辑，而不会对各个组件造成干扰，从而促进了适应性和易于维护，在动态的软件环境中。**
- 在具有许多交互组件和复杂通信需求的架构中，中介者模式大放异彩。这种模式允许组件通过中央中介间接通信，减少了组件之间的依赖。

### 4.2. 中介者模式的缺点

虽然中介者模式在解耦和集中通信管理方面提供了各种优势，但承认其潜在的缺点也很重要：

- 引入中介者有时可能导致整个系统复杂性的增加。随着中介者数量及其责任的增长，管理和理解组件之间的交互可能变得更加具有挑战性。
- 中介者成为通信的中心点。如果中介者失败或出现问题，整个系统的通信可能会受到威胁，可能导致单点故障。

## 5. 结论

在本文中，我们讨论了中介者模式，这是管理复杂系统中通信的强大工具，促进了可维护性和灵活性。在Kotlin中，其实现简洁而优雅，展示了该语言在有效表达设计模式方面的能力。因此，通过采用中介者模式，开发者可以创建模块化且易于扩展和维护的系统。

本文讨论的示例的完整源代码可在GitHub上找到。