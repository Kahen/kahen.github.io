---
date: 2021-09-01
category:
  - Java
  - Security
tag:
  - Access Control
  - RBAC
  - ACL
  - ABAC
head:
  - - meta
    - name: keywords
      content: Java, Security, Access Control, RBAC, ACL, ABAC
---
# Java访问控制模型

在本文中，我们将探讨不同的访问控制模型以及如何在实践中实现它们。

## 2. 什么是访问控制模型？
应用程序，特别是基于Web的应用程序，通常需要满足一个共同的要求，即只有在满足一组特定条件（也称为策略）时，才能执行某些操作。这是一个非常通用的要求，让我们给出一些例子：

- 互联网论坛：只有会员才能发布新消息或回复现有消息
- 电子商务网站：普通用户只能查看自己的订单
- 银行后台办公室：账户经理可以管理自己客户的投资组合。此外，当他们暂时不可用（例如，休假）时，账户经理还可以管理另一位账户经理客户的投资组合，并且前者充当其同行
- 数字钱包：在用户所在时区的20:00至08:00期间，支付限额为500美元

我们将为给定应用程序采用的《访问控制模型》将负责评估传入的请求，并做出决定：要么请求可以继续，要么不行。在后一种情况下，结果通常是返回给用户的错误消息。

![img](https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig0.png)

显然，这些例子中的每一个在授权给定请求时都需要采取不同的方法。

## 3. 访问控制模型类型
从前面的例子中，我们可以看到，要做出允许/拒绝决定，我们需要考虑与请求相关的不同方面：

- 请求相关联的身份。请注意，即使是匿名访问在这里也有一种身份形式
- 请求针对的对象/资源
- 对这些对象/资源执行的操作
- 请求的上下文信息。一天中的时间、时区和使用的认证方法是这种上下文信息的例子

我们可以将访问控制模型分为三种类型：

- 基于角色的访问控制（RBAC）
- 访问控制列表（ACL）
- 基于属性的访问控制（ABAC）

不管其类型如何，我们通常可以在模型中识别以下实体：

- PEP，即策略执行点：拦截请求并根据PDP返回的结果允许其继续或不继续
- PDP，即策略决策点：使用策略评估请求以产生访问决定
- PIP，即策略信息点：存储和/或调解PDP用于做出访问决定的信息
- PAP，即策略管理点：管策略和其他与访问决策制定相关的操作方面

下图显示了这些实体在逻辑上是如何相互关联的：

![img](https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig1.png)

**需要注意的是，尽管被描绘为自治实体，但实际上，我们会发现自己的一些或甚至所有模型元素都嵌入在应用程序本身中。**

此外，此模型不涉及如何建立用户的身份。尽管如此，这个方面在决定是否允许请求继续时可能会被考虑。

现在，让我们看看如何将这种通用架构应用于上述每种模型。

## 4. 基于角色的访问控制
在此模型中，PDP决策过程包括两个步骤：

- 首先，它恢复与传入请求的身份相关联的角色。
- 接下来，它尝试将这些角色与请求策略匹配

**这个模型的具体实现出现在Java EE规范中，以_@HttpConstraint_注解及其XML等价物的形式存在**。这是在应用于servlet时使用注解的典型用法：

```java
@WebServlet(name="rbac", urlPatterns = {"/protected"})
@DeclareRoles("USER")
@ServletSecurity(
  @HttpConstraint(rolesAllowed = "USER")
)
public class RBACController extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println("Hello, USER");
    }
}
```

对于Tomcat服务器，我们可以将前面描述的访问控制模型实体识别如下：

- PEP：安全_Valve_，检查目标servlet中是否存在此注解，并调用关联的_Realm_来恢复当前请求相关联的身份
- PDP：_Realm_实现，决定对给定请求应用哪些限制
- PIP：特定_Realm_实现使用的后端，存储安全相关信息。对于RBAC模型，关键信息是用户的角色集，通常从LDAP存储库中检索
- 策略存储：在这种情况下，注解本身就是存储
- PAP：Tomcat不支持动态策略更改，所以没有真正的需要。然而，通过一些想象力，我们可以将其识别为用于添加注解和/或编辑应用程序的WEB-INF/web.xml文件的任何工具。

其他安全框架（例如，Spring Security）的工作方式类似。关键点是，即使某个特定框架不完全符合我们的通用模型，其实体仍然存在，即使有些伪装。

### 4.1. 角色定义
角色到底是什么？**在实践中，角色只是一组用户可以在特定应用程序中执行的相关操作的命名集合**。它们可以根据应用程序的要求粗略或精细地定义。

无论它们的粒度级别如何，将它们定义为每个映射到一组不相交的功能集是一个好习惯。这样，我们可以通过添加/删除角色来轻松管理用户配置文件，而不必担心副作用。

至于用户和角色之间的关联，我们可以使用直接或间接方法。在前者中，我们直接将角色分配给用户。在后者中，有一个中间实体，通常是用户组，我们将角色分配给它：

![img](https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig2.png)

**使用组作为这种关联的中间实体的好处是，我们可以轻松地一次性重新分配许多用户的角色**。这在大型组织的背景下非常重要，因为人们不断地从一个领域移动到另一个领域。

同样，间接模型还允许我们轻松更改现有角色定义，通常在重构应用程序之后。

## 5. 访问控制列表
**基于ACL的安全控制允许我们定义对个别域对象的访问限制**。这与RBAC形成对比，后者通常适用于整个对象类别。在上面的论坛示例中，我们可以使用仅RBAC方法来定义可以阅读和创建新帖子。

然而，如果我们决定创建一个新功能，允许用户编辑自己的帖子，仅RBAC是不够的。在这种情况下，决策引擎需要考虑的不仅是谁，还有哪个帖子是编辑操作的目标。

对于这个简单的例子，们可以在数据库中添加一个单独的_author_列，并使用它来允许或拒绝编辑操作的访问。但是，如果我们想支持协作编辑呢？在这种情况下，我们需要存储一个可以编辑帖子的所有人的列表 - 一个ACL。

处理ACLs存在一些实际问题：

- 我们在哪里存储ACLs？
- 当检索大型对象集合时，如何有效地应用ACL限制？

Spring Security ACL库是ACL库的一个好例子。它使用专用数据库架构和缓存来实现ACLs，并与Spring Security紧密集成。这是一个简短的例子，改编自我们关于这个库的文章，展示了如何在对象级别实现访问控制：

```java
@PreAuthorize("hasPermission(#postMessage, 'WRITE')")
PostMessage save(@Param("noticeMessage")PostMessage postMessage);
```

ACLs的另一个好例子是Windows用于保护对象的权限系统。每个_SecurableObject_（例如，文件、目录、进程，等等）都有一个附加的_SecurityDescriptor_，其中包含一个个人用户/组列表以及相关的权限：

![img](https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig3.png)

Windows ACLs非常强大（或者根据我们问的人不同，也可能很复杂），允许管理员将权限分配给个人用户和/或组。此外，每个条目都为每个可能的操作定义了允许/拒绝权限。

## 6. 基于属性的访问控制
**基于属性的控制模型允许基于请求相关的上下文信息，而不仅仅是基于身份、操作和目标对象做出访问决策**。

XACML标准可能是这种模型最著名的例子，它使用XML文档来描述访问策略。这就是我们如何使用这个标准来描述数字钱包取款规则：

```xml
`<Policy xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"
  PolicyId="urn:baeldung:atm:WithdrawalPolicy"
  Version="1.0"
  RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:deny-overrides">`
    `<Target/>`
    `<Rule RuleId="urn:oasis:names:tc:baeldung:WithDrawalPolicy:Rule1" Effect="Deny">`
        `<Target>`
            `<AnyOf>`
                `<AllOf>`
... 取款操作的匹配规则省略
                `</AllOf>`
            `</AnyOf>`
        `</Target>`
        `<Condition>`
... 时间和金额条件定义省略
        `</Condition>`
    `</Rule>`
`</Policy>`
```

完整的规则定义可以在线查看。

尽管它很冗长，但不难弄清楚其一般结构。**一个策略包含一个或多个规则，当评估时，结果是一个_Effect_：允许或拒绝**。

每个规则包含目标，这些目标使用请求的属性定义逻辑表达式。可选地，规则还可以包含一个或多个_Condition_元素，以定义其适用性。

在运行时，基于XACML的访问控制PEP创建一个_RequestContext_实例，并将其提交给PDP进行评估。然后引擎评估所有适用的规则并返回访问决定。

这个_RequestContext_中存在的信息是区分这个模型与前面模型的主要方面。让我们以一个XML表示的请求上下文为例，该请求上下文被构建用于授权我们的数字钱包应用程序中的取款：

```xml
`<Request
    xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"
    CombinedDecision="true"
    ReturnPolicyIdList="false">`

    `<Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">`
... 操作属性省略
    ```</Attributes>```
    `<Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:environment">`
... 环境属性（例如，当前时间）省略
    ```</Attributes>```
    `<Attributes Category="urn:baeldung:atm:withdrawal">`
... 取款属性省略
    ```</Attributes>```
`</Request>`
```

当我们在21:00将此请求提交给XAML规则评估引擎时，预期的结果是拒绝此取款，因为它超过了夜间交易允许的最大金额。

**ABAC模型的关键优势在于其灵活性。** 我们可以定义，更重要的是，通过简单地更改策略来修改复杂规则。根据实现方式，我们甚至可以实时进行更改。

### 6.1. XACML4J

XACML4J是XACML 3.0标准的Java开源实现。它提供了评估引擎和ABAC模型所需的相关实体的实现。其核心API是_PolicyDecisionPoint_接口，毫不意外地，它实现了PDP逻辑。

一旦我们构建了PDP，使用它需要两个步骤。首先，我们创建并用我们想要评估的请求信息填充一个_RequestContext_：

```java
... 属性类别创建省略
RequestContext request = RequestContext.builder()
  .attributes(actionCategory,environmentCategory,atmTxCategory)
  .build();

```

这里，每个_xxxCategory_参数包含相关_Category_的一组属性。完整的代码使用可用的构建器来创建一个测试请求，用于在21:00进行1200.00美元的取款。或者，我们也可以从任何JAXB兼容的源直接创建一个_RequestContext_对象。

接下来，我们将此对象传递给_PolicyDecisionPoint_服务的_decide()_方法进行评估：

```java
ResponseContext response = pdp.decide(request);
assertTrue(response.getDecision() == Decision.DENY);
```

返回的_ResponseContext_包含一个_Decision_对象，其中包含策略评估结果。此外，它还可能返回诊断信息以及对PEP的附加义务和/或建议。义务和建议本身就是一个话题，所以我们在这里不会涵盖；查看这个入门指南以获取更多详细信息。

### 6.2. 无XACML的ABAC

**XACML的复杂性通常使得它对大多数应用程序来说过于复杂。** 然而，我们仍然可以在应用程序中使用其底层模型。毕竟，我们总是可以实现一个针对特定用例量身定制的简化版本，可能只外部化一些参数，对吧？

好的，任何经验丰富的开发人员都知道这将如何结束……

**任何ABAC实现的一个棘手方面是如何从请求的有效载荷中提取属性**。插入自定义逻辑的标准方法，例如servlet过滤器或JAX-RS拦截器，在处理请求之前只有对原始有效载荷数据的访问权限。

由于现代应用程序倾向于使用JSON或类似的表示，PEP必须先对其进行解码，然后才能提取任何有效载荷属性。**这意味着对CPU和内存使用有潜在的影响，特别是对于大型有效载荷。**

在这种情况下，使用AOP实现PEP是一个更好的方法。在这种情况下，切面处理代码可以访问解码后的有效载荷版本。

## 7. 结论

在本文中，我们描述了不同的访问控制模型以及应用程序如何使用它们来执行访问规则。

像往常一样，示例的完整源代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/8356e97cc1258253b4345b95412db68d?s=50&r=g)

OK