---
date: 2022-11-01
category:
  - Kotlin
  - Spring Boot
tag:
  - Spring Boot
  - Kotlin
head:
  - - meta
    - name: keywords
      content: Spring Boot, Kotlin, @Value, 配置属性注入
---

# Kotlin 和 Spring Boot：使用 @Value 注入配置属性 | Baeldung 关于 Kotlin

在 Spring Boot 应用程序中，一个常见的需求是将外部配置属性注入到 Spring Beans 中。`@ConfigurationProperties` 注解允许我们将一组配置属性绑定到一个类中。或者，我们可以利用 `@Value` 注解将任意配置属性注入到 Spring Bean 中。

在这个快速教程中，我们将探讨如何使用 `@Value` 注入配置属性。

## 2. 我们的 YAML 配置文件

让我们创建一个名为 `application-inject-value.yml` 的简单 YAML 文件，放在 `src/main/resources` 下，作为我们应用程序的配置：

```yaml
my-app:
  magic-number: 42
  magic-string: "It's a magic string"
  magic-flag: true

  magic-string-with-default: "It's another magic string"
```

**为了使 `@PropertySource` 加载我们的 YAML 配置文件，我们创建了 `YamlPropertySourceFactory` 类：**

```kotlin
class YamlPropertySourceFactory : PropertySourceFactory {
    override fun createPropertySource(@Nullable name: String?, encodedResource: EncodedResource): PropertySource`<*>` =
      PropertiesPropertySource(encodedResource.resource.filename,
        YamlPropertiesFactoryBean().also { it.setResources(encodedResource.resource) }.getObject()
      )
}
```

然后，我们可以使用 `@PropertySource` 注解来解析我们的 YAML 配置：

```kotlin
@PropertySource(value = ["classpath:application-inject-value.yml"], factory = YamlPropertySourceFactory::class)
@SpringBootApplication(scanBasePackages = ["com.baeldung.theValueAnnotation"])
class KotlinValueInjectionApplication
```

接下来，我们将创建一个 Spring 组件，并根据这个 YAML 文件注入配置属性。

当我们在 Java 中使用 `@Value` 时，我们可以这样注入配置属性：`@Value("${prop.name.from.config}")`。

在 Kotlin 中，我们遵循类似的方法。然而，由于 Kotlin 的字符串模板使用 '$' 引用变量或表达式，**我们必须在 `@Value` 注解中转义 '$'**。现在，让我们创建一个 Spring 组件，并从我们的 `application-inject-value.yml` 中注入几个属性：

```kotlin
@Component
class ValueBean(
  @Value("\${my-app.magic-number}")
  val magicNumber: Int,
  @Value("\${my-app.magic-string}")
  val magicString: String,
  @Value("\${my-app.magic-flag}")
  val magicFlag: Boolean,
)
```

正如 `ValueBean` 类所示，**我们应用了构造函数注入方法来注入三个配置属性**。

接下来，我们将通过单元测试验证这些 `@Value` 注解是否按预期工作。让我们从创建一个测试类开始：

```kotlin
@SpringBootTest
@TestConstructor(autowireMode = AutowireMode.ALL)
class TheValueAnnotationUnitTest(val valueBean: ValueBean) {
    ...
}
```

**我们使用 `@TestConstructor` 注解来实现构造函数注入，以便在测试类中注入 `ValueBean` Spring 组件**。随后，我们可以在测试函数中进行验证：

```kotlin
with(valueBean) {
    assertEquals(42, magicNumber)
    assertEquals("It's a magic string", magicString)
    assertTrue(magicFlag)
}
```

如果我们运行测试，测试将通过。也就是说，这三个配置属性已经被按预期注入到 `ValueBean` bean 中。

## 4. `@Value` 带有非空默认值

有时，我们可能希望在配置文件中缺少属性时提供一个默认值。为了实现这一点，**我们可以采用 `@Value("${prop.name:defaultValue}")` 模式**。

现在，让我们通过注入两个具有默认值的新属性来扩展我们的 `ValueBean` 组件：

```kotlin
@Component
class ValueBean(
  ...
  // 带有默认值
  @Value("\${my-app.not-defined-value:1024}")
  val magicNumberWithDefault: Int,
  @Value("\${my-app.magic-string-with-default:default Value}")
  val magicStringWithDefault: String,
)
```

在上述代码中，两个 `@Value` 注入都带有默认值。

查看配置文件，**_my-app.not-defined-value_ 缺失**，而 **_my-app.magic-string-with-default_ 被明确定义**。因此，将默认值 1024 应用于 `magicNumberWithDefault`，并将指定的值注入到 `magicStringWithDefault` 中：

```kotlin
with(valueBean) {
    assertEquals(1024, magicNumberWithDefault)
    assertEquals("It's another magic string", magicStringWithDefault)
}
```

## 5. `@Value` 使用 `null` 作为默认值

我们已经学会了在使用 `@Value` 注入时如何设置非空值作为默认值。偶尔，当配置文件中缺少属性时，我们可能更倾向于将 `null` 视为默认值。

让我们进一步扩展 `ValueBean` 以涵盖这种情况：

```kotlin
@Component
class ValueBean(
  ...
  // 使用 null 作为默认值
  @Value("\${my-app.not-defined-value:null}")
  val stringDefaultLiteralNull: String?,
  @Value("\${my-app.not-defined-value:#{null}}")
  val stringDefaultNull: String?
)
```

由于 Kotlin 具有可空和非空类型，**如果我们希望它们的默认值为 `null`，我们必须声明字段为可空**。

我们可以看到，尽管两个 `@Value` 尝试注入不存在的属性并引入默认值，一个使用 `“prop.name:null”`，另一个采用 `“prop.name:#{null}”`。

接下来，让我们看看结果：

```kotlin
with(valueBean) {
    assertEquals("null", stringDefaultLiteralNull)
    assertNull(stringDefaultNull)
}
```

测试清楚地显示了它们的区别：

- `prop.name:null` – **默认值是字面字符串 “null”**。
- `prop.name:#{null}` – 默认值是 `null`。因为 **`#{null}` 是一个 Spring 表达式 (SpEL)，它求值为 `null`**。

## 6. 结论

在本文中，我们探讨了在 Kotlin 中使用 Spring 的 `@Value` 注入配置属性，包括如何在配置文件中为缺失的属性引入默认值。

如往常一样，示例的完整源代码可在 GitHub 上获得。