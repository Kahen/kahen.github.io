---
date: 2022-04-01
category:
  - Java
  - Spring
tag:
  - Bean Validation
  - Constraint Composition
head:
  - - meta
    - name: keywords
      content: Java Bean Validation, Constraint Composition, Custom Annotation
------
# Bean Validation中的约束组合

在本教程中，我们将讨论Bean Validation的约束组合。

**将多个约束组合在一个自定义注解下可以减少代码重复并提高可读性**。我们将看到如何创建组合约束以及如何根据我们的需求进行自定义。

对于代码示例，我们将使用与Java Bean Validation基础相同的依赖项。

## 2. 理解问题

首先，让我们熟悉数据模型。我们将使用_Account_类作为本文大多数示例的基础：

```java
public class Account {

    @NotNull
    @Pattern(regexp = ".*\\d.*", message = "必须包含至少一个数字字符")
    @Length(min = 6, max = 32, message = "必须有6到32个字符")
    private String username;

    @NotNull
    @Pattern(regexp = ".*\\d.*", message = "必须包含至少一个数字字符")
    @Length(min = 6, max = 32, message = "必须有6到32个字符")
    private String nickname;

    @NotNull
    @Pattern(regexp = ".*\\d.*", message = "必须包含至少一个数字字符")
    @Length(min = 6, max = 32, message = "必须有6到32个字符")
    private String password;

    // getters and setters
}
```

我们可以注意到，对于这三个字段，重复了_@NotNull, @Pattern,_ 和 _@Length_ 约束组。

**此外，如果这些字段中的一个出现在不同层的不同类中，约束应该匹配——导致更多的代码重复**。

例如，我们可以想象在DTO对象和_@Entity_模型中都有_username_字段。

## 3. 创建组合约束

我们可以通过将三个约束组合在一个合适名称的自定义注解下，避免代码重复：

```java
@NotNull
@Pattern(regexp = ".*\\d.*", message = "必须包含至少一个数字字符")
@Length(min = 6, max = 32, message = "必须有6到32个字符")
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER })
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {})
public @interface ValidAlphanumeric {

    String message() default "字段应具有有效长度并包含数字字符。";

    Class````<?>````[] groups() default {};

    Class````<? extends Payload>````[] payload() default {};
}
```

因此，我们现在可以使用_@ValidAlphanumeric_来验证_Account_字段：

```java
public class Account {

    @ValidAlphanumeric
    private String username;

    @ValidAlphanumeric
    private String password;

    @ValidAlphanumeric
    private String nickname;

    // getters and setters
}
```

结果，我们可以测试_@ValidAlphanumeric_注解，并期望违反的约束数量与违反的约束一样多。

例如，如果我们将_username_设置为_“john”，_我们应该期望有两个违规，因为它既太短又没有包含数字字符：

```java
@Test
public void whenUsernameIsInvalid_validationShouldReturnTwoViolations() {
    Account account = new Account();
    account.setPassword("valid_password123");
    account.setNickname("valid_nickname123");
    account.setUsername("john");

    Set```<ConstraintViolation<Account>```> violations = validator.validate(account);

    assertThat(violations).hasSize(2);
}
```

## 4. 使用_@ReportAsSingleViolation_

另一方面，**我们可能希望验证返回整个组的单个_ConstraintViolation_**。

为了实现这一点，我们必须用_@ReportAsSingleViolation_注解我们的组合约束：

```java
@NotNull
@Pattern(regexp = ".*\\d.*", message = "必须包含至少一个数字字符")
@Length(min = 6, max = 32, message = "必须有6到32个字符")
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER })
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {})
@ReportAsSingleViolation
public @interface ValidAlphanumericWithSingleViolation {

    String message() default "字段应具有有效长度并包含数字字符。";

    Class````<?>````[] groups() default {};

    Class````<? extends Payload>````[] payload() default {};
}
```

之后，我们可以使用_password_字段测试我们的新注解，并期望单个违规：

```java
@Test
public void whenPasswordIsInvalid_validationShouldReturnSingleViolation() {
    Account account = new Account();
    account.setUsername("valid_username123");
    account.setNickname("valid_nickname123");
    account.setPassword("john");

    Set```<ConstraintViolation<Account>```> violations = validator.validate(account);

    assertThat(violations).hasSize(1);
}
```

## 5. 布尔约束组合

到目前为止，只有当所有组合约束都有效时，验证才会通过。这是由于**_ConstraintComposition_的值默认为** _**CompositionType.AND**_。

然而，如果我们想要检查至少有一个有效的约束，我们可以改变这种行为。

为了实现这一点，我们需要将_ConstraintComposition_切换为_CompositionType._ _OR_：

```java
@Pattern(regexp = ".*\\d.*", message = "必须包含至少一个数字字符")
@Length(min = 6, max = 32, message = "必须有6到32个字符")
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER })
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {})
@ConstraintComposition(CompositionType.OR)
public @interface ValidLengthOrNumericCharacter {

    String message() default "字段应具有有效长度或包含数字字符。";

    Class````<?>````[] groups() default {};

    Class````<? extends Payload>````[] payload() default {};
}
```

例如，给定一个太短但至少有一个数字字符的值，应该没有违规。

让我们使用模型中的_nickname_字段测试这个新注解：

```java
@Test
public void whenNicknameIsTooShortButContainsNumericCharacter_validationShouldPass() {
    Account account = new Account();
    account.setUsername("valid_username123");
    account.setPassword("valid_password123");
    account.setNickname("doe1");

    Set```<ConstraintViolation<Account>```> violations = validator.validate(account);

    assertThat(violations).isEmpty();
}
```

类似地，我们可以使用_CompositionType._ _ALL_FALSE_ 如果我们想确保约束失败。

## 6. 使用组合约束进行方法验证

此外，我们可以使用组合约束作为方法约束。

为了验证方法的返回值，我们只需要将_@SupportedValidationTarget(ValidationTarget.ANNOTATED_ELEMENT)_添加到组合约束中：

```java
@NotNull
@Pattern(regexp = ".*\\d.*", message = "必须包含至少一个数字字符")
@Length(min = 6, max = 32, message = "必须有6到32个字符")
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER })
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {})
@SupportedValidationTarget(ValidationTarget.ANNOTATED_ELEMENT)
public @interface AlphanumericReturnValue {

    String message() default "方法返回值应具有有效长度并包含数字字符。";

    Class````<?>````[] groups() default {};

    Class````<? extends Payload>````[] payload() default {};
}
```

为了举例说明，我们将使用_@AlphanumericReturnValue_注解的_getAnInvalidAlphanumericValue_方法：

```java
@Component
@Validated
public class AccountService {

    @AlphanumericReturnValue
    public String getAnInvalidAlphanumericValue() {
        return "john";
    }
}
```

现在，让我们调用这个方法并期望抛出_ConstraintViolationException_：

```java
@Test
public void whenMethodReturnValuesIsInvalid_validationShouldFail() {
    assertThatThrownBy(() -> accountService.getAnInvalidAlphanumericValue())
      .isInstanceOf(ConstraintViolationException.class)
      .hasMessageContaining("必须包含至少一个数字字符")
      .hasMessageContaining("必须有6到32个字符");
}
```

## 7. 结论

在本文中，我们看到了如何使用组合约束避免代码重复。

之后，我们学习了如何自定义组合约束以使用布尔逻辑进行验证，返回单个约束违规，并应用于方法返回值。

如往常一样，源代码可在GitHub上获取。