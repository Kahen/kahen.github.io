---
date: 2024-06-28
category:
  - REST
  - 国际化
tag:
  - RESTful Web Services
  - 国际化
head:
  - - meta
    - name: keywords
      content: REST, 国际化, 本地化, 错误消息, Spring Boot, Java Bean Validation
---

# REST服务中的本地化验证消息

---

在多语言环境中设计应用程序时，我们经常需要提供本地化的消息。在这种情况下，使用用户选择的语言发送消息是一种常见做法。

当我们收到对REST Web服务的客户端请求时，我们必须确保传入的客户端请求在处理之前符合预定义的验证规则。验证的目的是维护数据完整性并增强系统安全性。当验证失败时，服务负责提供信息性消息以指示请求存在什么问题。

在本教程中，我们将探讨在REST Web服务中提供本地化验证消息的实现。

## 2. 基本步骤

我们的旅程从使用资源包作为存储本地化消息的仓库开始。然后，我们将资源包与Spring Boot集成，这允许我们在应用程序中检索本地化消息。

之后，我们将转向创建包含请求验证的Web服务。这展示了在请求过程中出现验证错误时如何使用本地化消息。

最后，我们将探索不同类型的本地化消息自定义。这些包括覆盖默认验证消息，定义我们自己的资源包以提供自定义验证消息，以及创建自定义验证注释以动态生成消息。

通过这些步骤，我们将深化对在多语言应用程序中提供精确和特定语言反馈的理解。

## 3. Maven依赖

在我们开始之前，让我们为web开发和Java Bean验证向_pom.xml_添加Spring Boot Starter Web和Spring Boot Starter Validation依赖项：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-validation``</artifactId>``
``</dependency>``
```

这些的最新版本可以在Maven Central找到。

## 4. 本地化消息存储

在Java应用程序开发中，属性文件通常作为国际化应用程序中本地化消息的存储库。这被认为是本地化的一种常规方法。它通常被称为属性资源包。

这些文件是包含键值对的纯文本文档。键作为消息检索的标识符，而相关的值则保存相应语言的本地化消息。

在本教程中，我们将创建两个属性文件。

_CustomValidationMessages.properties_是我们的默认属性文件，文件名不包含任何地区设置名称。当客户端指定不受支持的地区设置时，应用程序始终回退到默认语言：

```properties
field.personalEmail=个人邮箱
validation.notEmpty={field}不能为空
validation.email.notEmpty=电子邮件不能为空
```

我们还想创建一个额外的中文属性文件——_CustomValidationMessages_zh.properties_。当客户端指定_zh_或类似变体如_zh-tw_作为地区设置时，应用程序的语言将切换为中文：

```properties
field.personalEmail=个人电邮
validation.notEmpty={field}不能是空白
validation.email.notEmpty=电邮不能留空
```

**我们必须确保所有属性文件都使用UTF-8编码。这在处理包含非拉丁字符的消息时尤其重要，如中文、日文和韩文。**这种保证确保我们能够准确无误地显示所有消息，而不会有损坏的风险。

## 5. 本地化消息检索

Spring Boot通过_MessageSource_接口简化了本地化消息的检索。它从应用程序的资源包中解析消息，并使我们能够轻松地获取不同地区的消息。

在我们能够使用它之前，我们必须在Spring Boot中配置_MessageSource_的提供者。在本教程中，我们将使用_ReloadableResourceBundleMessageSource_作为实现。

它能够在不重启服务器的情况下重新加载消息属性文件。这在我们处于应用程序开发的初期阶段非常有用，当我们想要在不重新部署整个应用程序的情况下看到消息变化。

我们必须将默认编码与我们为属性文件使用的UTF-8编码对齐：

```java
@Configuration
public class MessageConfig {

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:CustomValidationMessages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
```

## 6. Bean验证

在验证过程中，使用了一个名为_User_的数据传输对象(DTO)，中包含一个_email_字段。我们将应用Java Bean验证来验证这个DTO类。_email_字段被注解为_@NotEmpty_，以确保它不是空字符串。这个注解是标准的Java Bean验证注解：

```java
public class User {

    @NotEmpty
    private String email;

    // getters and setters
}
```

## 7. REST服务

在这一部分，我们将创建一个名为_UserService_的REST服务，该服务负责根据请求体通过PUT方法更新特定用户信息：

```java
@RestController
public class UserService {

    @PutMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity`<UpdateUserResponse>` updateUser(
        @RequestBody @Valid User user,
        BindingResult bindingResult) {

        if (bindingResult.hasFieldErrors()) {

            List``<InputFieldError>`` fieldErrorList = bindingResult.getFieldErrors().stream()
                .map(error -> new InputFieldError(error.getField(), error.getDefaultMessage()))
                .collect(Collectors.toList());

            UpdateUserResponse updateResponse = new UpdateUserResponse(fieldErrorList);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(updateResponse);
        } else {
            // 更新逻辑...
            return ResponseEntity.status(HttpStatus.OK).build();
        }
    }

}
```

### 7.1. 地区选择

**使用** _**Accept-Language**_ **HTTP头来定义客户端的语言偏好是一种常见做法。**

我们可以通过使用Spring Boot中的_LocaleResolver_接口从HTTP请求中的_Accept-Language_头获取地区设置。在我们的案例中，我们不需要显式定义一个_LocaleResolver_。Spring Boot为我们提供了一个默认的。

然后，我们的服务根据这个头返回适当的本地化消息。在客户端指定一种我们服务不支持的语言的情况下，我们的服务简单地采用英语作为默认语言。

### 7.2. 验证

**我们在_updateUser(…)_方法中用_@Valid_注解_User_ DTO。这表明当REST Web服务被调用时，Java Bean验证将验证对象。** 验证在后台进行。我们将通过_BindingResult_对象检查验证结果。

每当有任何字段错误时，由_bindingResult.hasFieldErrors()_确定，Spring Boot会根据当前地区为我们获取本地化的错误消息，并将消息封装到字段错误实例中。

我们将迭代_BindingResult_中的每个字段错误，并将它们收集到响应对象中，并将响应发送回客户端。

### 7.3. 响应对象

如果验证失败，服务将返回一个_UpdateResponse_对象，其中包含指定语言中的验证错误消息：

```java
public class UpdateResponse {

    private List``<InputFieldError>`` fieldErrors;

    // getter and setter
}
```

_InputFieldError_是一个占位符类，用于存储哪个字段包含错误以及错误消息是什么：

```java
public class InputFieldError {

    private String field;
    private String message;

    // getter and setter
}
```

## 8. 验证消息类型

让我们使用以下请求体向REST服务_/user_发起更新请求：

```json
{
    "email": ""
}
```

作为提醒，_User_对象必须包含一个非空的电子邮件。因此，我们期望此请求触发验证错误。

### 8.1. 标准消息

如果我们在请求中没有提供任何语言信息，我们将看到以下典型的英语消息响应：

```json
{
    "fieldErrors": [
        {
            "field": "email",
            "message": "must not be empty"
        }
    ]
}
```

现在，让我们使用以下_accept-language_ HTTP头发起另一个请求：

```http
accept-language: zh-tw
```

服务解释为我们想要使用中文。它从相应的资源包中检索消息。我们将看到以下响应，其中包括中文验证消息：

```json
{
    "fieldErrors": [
        {
            "field": "email",
            "message": "不得是空的"
        }
    ]
}
```

这些是由Java Bean验证提供的标准验证消息。我们可以从Hibernate验证器那里找到详尽的消息列表，它是默认的验证实现。

然而，我们看到的消息看起来并不好看。我们可能想要更改验证消息以提供更多的清晰度。让我们采取行动修改标准化消息。

### 8.2. 覆盖消息

**我们可以覆盖Java Bean验证实现中定义的默认消息。** 我们所要做的就是义一个基名为_ValidationMessages.properties_的属性文件：

```properties
jakarta.validation.constraints.NotEmpty.message=The field cannot be empty
```

对于相同的基名，我们还将为中文创建另一个属性文件_ValidationMessages_zh.properties_：

```properties
jakarta.validation.constraints.NotEmpty.message=本栏不能留空
```

再次调用相同服务时，响应消息将被我们定义的消息替换：

```json
{
    "fieldErrors": [
        {
            "field": "email",
            "message": "The field cannot be empty"
        }
    ]
}
```

然而，尽管覆盖了