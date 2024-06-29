---
date: 2024-06-29
category:
  - Spring Boot
  - Validation
tag:
  - Boolean
  - Validation
head:
  - - meta
    - name: keywords
      content: Spring Boot, Boolean Validation, Programmatic Validation, Bean Validation, Custom JSON Deserializer
---
# 在Spring Boot中验证布尔类型

在本教程中，我们将学习如何在Spring Boot应用程序中验证布尔类型，并查看执行验证的各种方式。此外，我们将在Spring Boot应用程序的不同层，如控制器或服务层，验证类型为布尔的对象。

## 2. 程序化验证

Boolean类提供了两个基本方法来创建类的实例：Boolean.valueOf()和Boolean.parseBoolean()。

Boolean.valueOf()接受字符串和布尔值。它检查输入字段的值是否为true或false，并相应地提供Boolean对象。Boolean.parseBoolean()方法只接受字符串值。

**这些方法不区分大小写 - 例如，“true”，“True”，“TRUE”，“false”，“False”和“FALSE”都是可接受的输入。**

让我们通过单元测试来验证字符串到布尔的转换：

```java
@Test
void givenInputAsString_whenStringToBoolean_thenValidBooleanConversion() {
    assertEquals(Boolean.TRUE, Boolean.valueOf("TRUE"));
    assertEquals(Boolean.FALSE, Boolean.valueOf("false"));
    assertEquals(Boolean.TRUE, Boolean.parseBoolean("True"));
}
```

现在，我们将验证从原始布尔值到Boolean包装类的转换：

```java
@Test
void givenInputAsboolean_whenbooleanToBoolean_thenValidBooleanConversion() {
    assertEquals(Boolean.TRUE, Boolean.valueOf(true));
    assertEquals(Boolean.FALSE, Boolean.valueOf(false));
}
```

## 3. 使用自定义Jackson反序列化器进行验证

由于Spring Boot API经常处理JSON数据，我们还将查看如何通过数据反序列化来验证JSON到Boolean的转换。我们可以使用自定义反序列化器来反序列化布尔值的自定义表示。

让我们考虑一个场景，我们想要使用JSON数据表示布尔值，使用“+”（代表true）和“-”（代表false）。让我们编写一个JSON反序列化器来实现这一点：

```java
public class BooleanDeserializer extends JsonDeserializer`<Boolean>` {
    @Override
    public Boolean deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        String value = parser.getText();
        if (value != null && value.equals("+")) {
            return Boolean.TRUE;
        } else if (value != null && value.equals("-")) {
            return Boolean.FALSE;
        } else {
            throw new IllegalArgumentException("Only values accepted as Boolean are + and -");
        }
    }
}
```

## 4. 使用注解进行Bean验证

Bean验证约束是另一种流行的验证字段的方法。要使用这个，我们需要spring-boot-starter-validation依赖项。在所有可用的验证注解中，有三个可以用于布尔字段：

- **@NotNull**: 如果Boolean字段为null，则产生错误
- **@AssertTrue**: 如果Boolean字段设置为false，则产生错误
- **@AssertFalse**: 如果Boolean字段设置为true，则产生错误

**需要注意的是，@AssertTrue和@AssertFalse都认为null值为有效输入。**这意味着，如果我们想确保只接受实际的布尔值，我们需要将这两个注解与@NotNull结合使用。

## 5. Boolean验证示例

为了演示这一点，我们将在控制器和服务层同时使用bean约束和自定义JSON反序列化器。让我们创建一个名为BooleanObject的自定义对象，它有四个Boolean类型的参数。每个参数将使用不同的验证方法：

```java
public class BooleanObject {

    @NotNull(message = "boolField不能为null")
    Boolean boolField;

    @AssertTrue(message = "trueField必须有true值")
    Boolean trueField;

    @NotNull(message = "falseField不能为null")
    @AssertFalse(message = "falseField必须有false值")
    Boolean falseField;

    @JsonDeserialize(using = BooleanDeserializer.class)
    Boolean boolStringVar;

    //getters和setters
}
```

## 6. 控制器中的验证

每当我们通过RequestBody将对象传递到REST端点时，我们可以使用@Valid注解来验证对象。**当我们将@Valid注解应用于方法参数时，我们指示Spring验证相应的用户对象**：

```java
@RestController
public class ValidationController {

    @Autowired
    ValidationService service;

    @PostMapping("/validateBoolean")
    public ResponseEntity``<String>`` processBooleanObject(@RequestBody @Valid BooleanObject booleanObj) {
        return ResponseEntity.ok("BooleanObject is valid");
    }

    @PostMapping("/validateBooleanAtService")
    public ResponseEntity``<String>`` processBooleanObjectAtService() {
        BooleanObject boolObj = new BooleanObject();
        boolObj.setBoolField(Boolean.TRUE);
        boolObj.setTrueField(Boolean.FALSE);
        service.processBoolean(boolObj);
        return ResponseEntity.ok("BooleanObject is valid");
    }
}
```

验证后，如果发现任何违规，Spring将抛出MethodArgumentNotValidException。为此，可以使用ControllerAdvice和相关的ExceptionHandler方法来处理。让我们创建三种方法来处理来自控制器和服务层的相应异常：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public String handleValidationException(MethodArgumentNotValidException ex) {
        return ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(e -> e.getDefaultMessage())
            .collect(Collectors.joining(","));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public String handleIllegalArugmentException(IllegalArgumentException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleConstraintViolationException(ConstraintViolationException ex) {
       return ex.getMessage();
    }
}
```

在测试REST功能之前，我们建议先浏览Spring Boot中的API测试。让我们为控制器创建测试类的框架：

```java
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = ValidationController.class)
class ValidationControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @TestConfiguration
    static class EmployeeServiceImplTestContextConfiguration {
        @Bean
        public ValidationService validationService() {
            return new ValidationService() {};
        }
    }

    @Autowired
    ValidationService service;
}
```

有了这个，我们现在可以测试我们在类中使用的验证注解。

### 6.1. 验证@NotNull注解

让我们看看@NotNull是如何工作的。当我们传递一个带有null Boolean参数的BooleanObject时，@Valid注解将验证bean并抛出“400 Bad Request”HTTP响应：

```java
@Test
void whenNullInputForBooleanField_thenHttpBadRequestAsHttpResponse() throws Exception {
    String postBody = "{\"boolField\":null,\"trueField\":true,\"falseField\":false,\"boolStringVar\":\"+\"}";

    mockMvc.perform(post("/validateBoolean").contentType("application/json")
            .content(postBody))
        .andExpect(status().isBadRequest());
}
```

### 6.2. 验证@AssertTrue注解

接下来，我们将测试@AssertTrue的工作。当我们传递一个带有false Boolean参数的BooleanObject时，@Valid注解将验证bean并抛出“400 Bad Request”HTTP响应。如果我们捕获响应体，我们可以得到@AssertTrue注解中设置的错误消息：

```java
@Test
void whenInvalidInputForTrueBooleanField_thenErrorResponse() throws Exception {
    String postBody = "{\"boolField\":true,\"trueField\":false,\"falseField\":false,\"boolStringVar\":\"+\"}";

    String output = mockMvc.perform(post("/validateBoolean").contentType("application/json")
            .content(postBody))
        .andReturn()
        .getResponse()
        .getContentAsString();

    assertEquals("trueField must have true value", output);
}
```

让我们也检查一下如果我们提供null会发生什么。由于我们只对字段使用了@AssertTrue注解，而没有使用@NotNull，所以没有验证错误：

```java
@Test
void whenNullInputForTrueBooleanField_thenCorrectResponse() throws Exception {
    String postBody = "{\"boolField\":true,\"trueField\":null,\"falseField\":false,\"boolStringVar\":\"+\"}";

    mockMvc.perform(post("/validateBoolean").contentType("application/json")
            .content(postBody))
        .andExpect(status().isOk());
}
```

### 6.3. 验证@AssertFalse注解

我们现在将理解@AssertFalse的工作原理。当我们为@AssertFalse参数传递一个true值时，@Valid注解会抛出一个错误请求。我们可以在响应体中得到@AssertFalse注解中设置的错误消息：

```java
@Test
void whenInvalidInputForFalseBooleanField_thenErrorResponse() throws Exception {
    String postBody = "{\"boolField\":true,\"trueField\":true,\"falseField\":true,\"boolStringVar\":\"+\"}";

    String output = mockMvc.perform(post("/validateBoolean").contentType("application/json")
            .content(postBody))
        .andReturn()
        .getResponse()
        .getContentAsString();

    assertEquals("falseField must have false value", output);
}
```

再次，让我们看看如果我们提供null会发生什么。我们对字段使用了@AssertFalse和@NotNull，因此我们会得到一个验证错误：

```java
@Test
void whenNullInputForFalseBooleanField_thenHttpBadRequestAsHttpResponse() throws Exception {
    String postBody = "{\"boolField\":true,\"trueField\":true,\"falseField\":null,\"boolStringVar\":\"+\"}";

    mockMvc.perform(post("/validateBoolean").contentType("application/json")
            .content(postBody))
        .andExpect(status().isBadRequest());
}
```

### 6.4. 验证自定义JSON反序列化器对Boolean类型的验证

让我们验证标记为我们自定义JSON反序列化器的参数。自定义反序列化器只接受“+”和“-”的值。如果我们传递任何其他值，验证将失败并触发错误。让我们在输入JSON中传递“plus”文本值，并看看验证是如何工作的：

```java
@Test
void whenInvalidBooleanFromJson_thenErrorResponse() throws Exception {
    String postBody = "{\"boolField\":true,\"trueField\":true,\"falseField\":false,\"boolStringVar\":\"plus\"}";

    String output = mockMvc.perform(post("/validateBoolean").contentType("application/json")
            .content(postBody))
        .andReturn()
        .getResponse()
        .getContentAsString();

    assertEquals("Only values accepted as Boolean are + and -", output);
}
```

最后，让我们测试一下快乐场景。我们将“+”作为自定义反序列化字段的输入。由于它是一个有效的输入，验证将通过并给出成功的响应：

```java
@Test
void whenAllBooleanFieldsValid_thenCorrectResponse() throws Exception {
    String postBody = "{\"boolField\":true,\"trueField\":true,\"falseField\":false,\"boolStringVar\":\"+\"}";

    String output = mockMvc.perform(post("/validateBoolean").contentType("application/json")
            .content(postBody))
        .andReturn()
        .getResponse()
        .getContentAsString();

    assertEquals("BooleanObject is valid", output);
}
```

## 7. 服务中的验证

现在让我们看看服务层的验证。为了实现这一点，我们使用@Validated注解标记服务类，并将@Valid注解放在方法参数上。这两个注解的组合将导致Spring Boot验证对象。

与控制器层的@RequestBody不同，服务层的验证是针对一个简单的Java对象进行的，因此**框架会因为验证失败而触发一个_ConstraintViolationException_**。在这种情况下，Spring框架将返回_HttpStatus.INTERNAL_SERVER_ERROR_作为响应状态。

**服务层验证更适用于在控制器层创建或修改的对象，然后传递到服务层进行处理。**

让我们检查一下这个服务类的框架：

```java
@Service
@Validated
public class ValidationService {

    public void processBoolean(@Valid BooleanObject booleanObj) {
        // 进一步处理
    }
}
```

在前一节中，我们创建了一个测试服务层的端点和异常处理方法来处理_ConstraintViolationException_。让我们编写一个新的测试用例来检查这一点：

```java
@Test
void givenAllBooleanFieldsValid_whenServiceValidationFails_thenErrorResponse() throws Exception {
    mockMvc.perform(post("/validateBooleanAtService").contentType("application/json"))
        .andExpect(status().isInternalServerError());
}
```

## 8. 结论

我们学习了如何使用三种方法在控制器和服务层验证布尔类型：程序化验证、bean验证和使用自定义JSON反序列化器。本文的参考代码可以在GitHub上找到。
OK