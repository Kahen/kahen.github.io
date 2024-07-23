---
date: 2024-07-24
category:
  - Java
  - Swagger
tag:
  - Custom Validation
  - Swagger Codegen
head:
  - - meta
    - name: keywords
      content: Java, Swagger, Custom Validation, Swagger Codegen
---
# 使用Swagger Codegen进行自定义验证

## 1. 概述

当我们使用Swagger生成验证时，我们通常使用基本规范。然而，我们可能需要添加Spring自定义验证注解。

本教程将教授如何使用这些验证生成模型和REST API，同时重点介绍OpenAPI服务器生成器，而不是约束验证器。

## 2. 设置

在设置中，我们将使用之前的Baeldung教程从OpenAPI 3.0.0定义生成服务器。接下来，我们将添加一些自定义验证注解以及所有所需的依赖项。

## 3. PetStore API OpenAPI定义

假设我们有PetStore API的OpenAPI定义，我们需要为REST API和描述的模型_Pet_添加自定义验证。

### 3.1. API模型的自定义验证

为了创建宠物，我们需要让Swagger使用我们的自定义验证注解来测试宠物的名字是否大写。因此，为了本教程的目的，我们将简单地称其为_Capitalized_。

因此，请观察以下示例中的_x-constraints_规范。这足以让Swagger知道我们需要生成与已知注解不同类型的注解：

```yaml
openapi: 3.0.1
info:
  version: "1.0"
  title: PetStore
paths:
  /pets:
    post:
      #.. 这里描述了post
components:
  schemas:
    Pet:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
          x-constraints: "Capitalized(required = true)"
        tag:
          type: string
```

### 3.2. REST API端点的自定义验证

如上所述，我们将以相同的方式描述一个按名称查找所有宠物的端点。为了演示我们的目的，假设我们的系统是区分大小写的，所以我们将再次为_name_输入参数添加相同的_x-constraints_验证：

```yaml
/pets:
  # post在这里定义
  get:
    tags:
      - pet
    summary: 按名称查找宠物
    description: '按名称查找宠物'
    operationId: findPetsByTags
    parameters:
      - name: name
        in: query
        schema:
          type: string
        description: 按标签过滤
        required: true
        x-constraints: "Capitalized(required = true)"
    responses:
      '200':
        description: 默认响应
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/Pet'
      '400':
        description: 无效的标签值
```

## 4. 创建_Capitalized_注解

为了强制执行自定义验证，我们需要创建一个注解来确保功能。

首先，我们创建注解接口——@Capitalized：

```java
@Documented
@Constraint(validatedBy = {Capitalized.class})
@Target({ElementType.PARAMETER, ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Capitalized{
    String message() default "Name should be capitalized.";
    boolean required() default true;
    // 默认注解方法
}
```

注意我们为了演示目的制作了_required_方法——我们稍后会解释。

接下来，我们添加_CapitalizedValidator_，如上述@Constraint注解中提到的：

```java
public class CapitalizedValidator implements ConstraintValidator`<Capitalized, String>` {

    @Override
    public boolean isValid(String nameField, ConstraintValidatorContext context) {
        // 验证代码在这里
    }
}
```

## 5. 生成验证注解

### 5.1. 指定Mustache模板目录

为了生成带有@Capitalized验证注解的模型，我们需要特定的Mustache模板，告诉Swagger在模型中生成它。

因此，在OpenAPI生成器插件中，在`<configuration>`[...]``</configuration>``标签内，我们需要添加一个模板目录：

```xml
`<plugin>`
  ``<!--...-->``
  `<executions>`
    `<execution>`
      `<configuration
        //...
        <templateDirectory>`
          ${project.basedir}/src/main/resources/openapi/templates
        `</templateDirectory>`
        //...
      ``</configuration>``
    `</execution>`
  `</executions>`
  ``<!--...-->``
`</plugin>`
```

### 5.2. 添加Mustache Bean验证配置

在本章中，我们将配置Mustache模板以生成验证规范。为了添加更多细节，我们将修改_beanValidationCore.mustache_、_model.mustache_和_api.mustache_文件，以成功生成代码。

首先，需要修改来自_swagger-codegen_模块的_beanValidationCore.mustache_，通过添加供应商扩展规范：

```
{{{ vendorExtensions.x-constraints }}}
```

其次，如果我们有一个带有内部属性的注解，比如@Capitalized(required = "true")，那么在_beanValidationCore.mustache_文件的第二行需要指定特定的模式：

```
{{#required}}@Capitalized(required="{{{pattern}}}") {{/required}}
```

第三，我们需要更改_model.mustache_规范以包含必要的导入。例如，我们将导入@Capitalized注解和Capitalized。导入应该在_model.mustache_的_package_标签后插入：

```
{{#imports}}import {{import}}; {{/imports}} import
com.baeldung.openapi.petstore.validator.CapitalizedValidator;
import com.baeldung.openapi.petstore.validator.Capitalized;
```

最后，为了在APIs中生成注解，我们需要在_api.mustache_文件中添加@Capitalized注解的导入。

```
{{#imports}}import {{import}}; {{/imports}} import
com.baeldung.openapi.petstore.validator.Capitalized;
```

另外，_api.mustache_依赖于_cookieParams.mustache_文件。因此，我们需要将其添加到_openapi/templates_目录中。

## 6. 生成源代码

最后，我们可以使用生成的代码。我们至少需要运行_mvn generate-sources_。这将生成模型：

```java
public class Pet {
    @JsonProperty("id")
    private Long id = null;

    @JsonProperty("name")
    private String name = null;
    // 其他参数
    @Schema(required = true, description = "")
    @Capitalized public String getName() { return name; } // 默认的getter和setter
}
```

它还将生成一个API：

```java
default ResponseEntity`<List<Pet>`> findPetsByTags(
    @Capitalized(required = true)
    @ApiParam(value = "Tags to filter by")
    @Valid @RequestParam(value = "name", required = false) String name) {

    // 默认生成的代码在这里
    return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
}
```

## 7. 使用_curl_进行测试

启动应用程序后，我们将运行一些_curl_命令进行测试。

另外，请注意，违反约束会抛出_ConstraintViolationException._ 异常需要通过_@ControllerAdvice_适当处理以返回400 Bad Request状态。

### 7.1. 测试_Pet_模型验证

这个_Pet_模型有一个小写的_name_。因此，应用程序应该返回400 Bad Request：

```bash
curl -X 'POST' \
  'http://localhost:8080/pet' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "name": "rockie"
}'
```

### 7.2. 测试查找_Pet_ API

与上述相同，因为_name_是小写的，应用程序也应该返回400 Bad Request：

```bash
curl -I http://localhost:8080/pets/name="rockie"
```

## 8. 结论

在本教程中，我们已经看到了如何在实现REST API服务器时，使用Spring生成自定义约束验证器。

如常，代码可以在GitHub上找到。