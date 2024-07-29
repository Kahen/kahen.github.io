我将为您翻译网页标题和部分页面信息，但请注意，由于无法访问提供的链接，我将使用模拟数据来完成翻译任务。

---
date: 2024-07-29
category:
  - Spring Framework
  - Validation
tag:
  - Spring Service Layer
  - Validation Techniques
head:
  - - meta
    - name: keywords
      content: Spring, Service Layer, Validation, Best Practices
---

# Spring服务层验证

请注意，以上内容是根据您提供的要求模拟的，实际的网页内容可能有所不同。如果需要准确的翻译，请确保网页链接可用并重新提供。## 概述

在本教程中，我们将讨论Java应用程序服务层中的Spring验证。尽管Spring Boot支持与自定义验证器的无缝集成，但执行验证的事实标准是Hibernate验证器。

这里，我们将学习如何将我们的验证逻辑从控制器移动到单独的服务层。此外，我们将在Spring应用程序中实现服务层的验证。

## 应用分层

根据需求，Java业务应用程序可以采用几种不同的形状和类型。例如，我们必须根据这些标准确定我们的应用程序需要哪些层。除非有特定需求，否则许多应用程序将不会从服务或存储库层的增加复杂性和维护成本中受益。

我们可以通过使用多个层来满足所有这些关注点。这些层是：

![img](https://www.baeldung.com/wp-content/uploads/2021/06/Layered-Architecture.png)

消费者层或Web层是Web应用程序的最顶层。**它负责解释用户的输入并提供适当的响应**。其他层抛出的异常也必须由Web层处理。由于Web层是我们应用程序的入口点，因此它负责身份验证，并作为防止未经授权的用户的第一道防线。

Web层下面是服务层。它作为事务性屏障，包含应用程序和基础设施服务。此外，服务层的公共API由应用程序服务提供。**它们通常作为事务边界，负责授权交易**。基础设施服务提供了连接到外部工具的“管道代码”，包括文件系统、数据库和电子邮件服务器。这些方法通常由多个应用程序服务使用。

**Web应用程序的最低层是持久层。** 换句话说，它负责与用户的数据存储交互。

服务层是应用程序中的一个层，它促进了控制器和持久层之间的通信。此外，业务逻辑存储在服务层中。它特别包括验证逻辑。模型状态用于在控制器和服务层之间进行通信。

将验证视为业务逻辑有优点和缺点，Spring的验证（和数据绑定）架构不排除任何一种。**特别是，验证不应该绑定到Web层，应该是简单易定位的，并且应该允许使用任何可用的验证器。**

此外，客户端输入数据并不总是通过REST控制器流程，**如果我们不在服务层也进行验证，不可接受的数据就可以通过，导致几个问题**。在这种情况下，**我们将使用标准的Java JSR-303验证方案**。

## 示例

让我们考虑使用Spring Boot开发的一个简单的用户账户注册表单。

### 4.1. 简单的域类

首先，我们只有名称、年龄、电话和密码属性：

```java
public class UserAccount {

    @NotNull(message = "密码必须在4到15个字符之间")
    @Size(min = 4, max = 15)
    private String password;

    @NotBlank(message = "名称不能为空")
    private String name;

    @Min(value = 18, message = "年龄不应小于18岁")
    private int age;

    @NotBlank(message = "电话不能为空")
    private String phone;

    // 标准构造函数/设置器/获取器/toString
}
```

在上面的类中，我们使用了四个注释 - _@NotNull_、_@Size_、_@NotBlank_ 和 _@Min_ - 以确保输入属性既不为空也不是空白，并且符合大小要求。

### 4.2. 在服务层实现验证

有许多验证解决方案可用，Spring或Hibernate处理实际的验证。**另一方面，手动验证是一个可行的替代方案**。当我们将验证集成到应用程序的正确部分时，这为我们提供了很多灵活性。

接下来，让我们在服务类中实现我们的验证：

```java
@Service
public class UserAccountService {

    @Autowired
    private Validator validator;

    @Autowired
    private UserAccountDao dao;

    public String addUserAccount(UserAccount useraccount) {

        Set`<ConstraintViolation`<UserAccount>``> violations = validator.validate(useraccount);

        if (!violations.isEmpty()) {
            StringBuilder sb = new StringBuilder();
            for (ConstraintViolation`<UserAccount>` constraintViolation : violations) {
                sb.append(constraintViolation.getMessage());
            }
            throw new ConstraintViolationException("发生错误: " + sb.toString(), violations);
        }

        dao.addUserAccount(useraccount);
        return "账户为 " + useraccount.getName() + " 已添加!";
    }
}
```

**_Validator_ 是Bean验证API的一部分，负责验证Java对象**。此外，Spring自动提供了一个_Validator_实例，我们可以将其注入到我们的_UserAccountService_中。_Validator_用于在_validate(..)_函数内验证传递的对象。结果是_ConstraintViolation_的_Set_。

如果没有违反验证约束（对象有效），则_Set_为空。否则，我们抛出一个_ConstraintViolationException_。

### 4.3. 实现REST控制器

在此之后，让我们构建Spring REST控制器类，以向客户端或最终用户显示服务并评估应用程序的输入验证：

```java
@RestController
public class UserAccountController {

    @Autowired
    private UserAccountService service;

    @PostMapping("/addUserAccount")
    public Object addUserAccount(@RequestBody UserAccount userAccount) {
        return service.addUserAccount(userAccount);
    }
}
```

我们没有在上述REST控制器表单中使用_@Valid_注释以防止任何验证。

### 4.4. 测试REST控制器

现在，让我们通过运行Spring Boot应用程序来测试这个方法。之后，使用Postman或任何其他API测试工具，我们将JSON输入发布到_localhost:8080/addUserAccount_ URL：

```json
{
   "name":"Baeldung",
   "age":25,
   "phone":"1234567890",
   "password":"test",
   "useraddress":{
      "countryCode":"UK"
   }
}
```

在确认测试成功运行后，现在让我们检查验证是否按预期工作。下一个合乎逻辑的步骤是使用一些无效输入来测试应用程序。因此，我们将更新我们的输入JSON为无效值：

```json
{
   "name":"",
   "age":25,
   "phone":"1234567890",
   "password":"",
   "useraddress":{
      "countryCode":"UK"
   }
}
```

我们将收到一个带有HTTP状态400的响应，意味着一个错误的请求，以及以下错误消息。因此，**我们可以看到Validator的使用对于验证至关重要**：

```
发生错误: 密码必须在4到15个字符之间，名称不能为空
```

## 优点和缺点

**在服务/业务层中，这通常是一种成功的验证方法。** 它不仅限于方法参数，而且可以应用于各种对象。例如，我们可以从数据库加载一个对象，更改它，然后在继续之前验证它。

我们还可以使用这种方法进行单元测试，以便我们可以实际模拟服务类。**为了在单元测试中促进真正的验证，我们可以手动生成必要的_Validator_实例**。

在任何情况下，我们都不需要在我们的测试中引导Spring应用程序上下文。

## 结论

在这个快速教程中，我们探讨了Java业务应用程序的不同层。我们学习了如何将我们的验证逻辑从控制器移动到单独的服务层。此外，我们实现了在Spring应用程序的服务层执行验证的一种方法。

示例中的代码可以在GitHub上找到。

OK