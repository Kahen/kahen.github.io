---
date: 2022-04-01
category:
  - Java
tag:
  - MapStruct
  - 条件映射
head:
  - - meta
    - name: keywords
      content: Java, MapStruct, 条件映射, 代码生成
---
# 如何使用MapStruct进行条件映射

MapStruct 是一个代码生成工具，它简化了Java Bean类型之间的映射。在本文中，我们将探讨如何使用MapStruct进行条件映射，并查看实现它的不同配置。

在对象之间映射数据时，我们经常需要根据某些条件映射一个属性，MapStruct提供了一些配置选项来实现这一点。

让我们检查一个目标_License_对象的实例，它需要根据几个条件映射属性：

```java
public class License {
    private UUID id;
    private OffsetDateTime startDate;
    private OffsetDateTime endDate;
    private boolean active;
    private boolean renewalRequired;
    private LicenseType licenseType;

    public enum LicenseType {
        INDIVIDUAL, FAMILY
    }

    // getters and setters
}
```

输入_LicenseDto_包含一个可选的_startDate_、_endDate_和_licenseType_：

```java
public class LicenseDto {
    private UUID id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String licenseType;
    // getters and setters
}
```

从_LicenseDto_到_License_的映射规则如下：

- _id_ – 如果输入_LicenseDto_有_id_
- _startDate_ – 如果输入_LicenseDto_在请求中没有_startDate_，让我们将_startDate_设置为当前日期
- _endDate_ – 如果输入_LicenseDto_在请求中没有_endDate_，让我们将_endDate_设置为从当前日期起的一年
- _active_ – 如果_endDate_在未来，我们将这个设置为_true_
- _renewalRequired_ – 如果_endDate_在接下来的两周内，我们将这个设置为_true_
- _licenseType_ – 如果输入_licenseType_可用并且是预期值INDIVIDUAL或FAMILY之一。

让我们探索一些使用MapStruct提供的配置实现这一点的方法。

### 2.1. 使用表达式

MapStruct提供了在映射表达式中使用任何有效的Java表达式的能力来生成映射。让我们利用这个特性来映射_startDate_：

```java
@Mapping(target = "startDate", expression = "java(mapStartDate(licenseDto))")
License toLicense(LicenseDto licenseDto);
```

我们现在可以定义方法_mapStartDate_：

```java
default OffsetDateTime mapStartDate(LicenseDto licenseDto) {
    return licenseDto.getStartDate() != null ?
      licenseDto.getStartDate().atOffset(ZoneOffset.UTC) : OffsetDateTime.now();
}
```

在编译时，MapStruct生成的代码：

```java
@Override
public License toLicense(LicenseDto licenseDto) {
    License license = new License();
    license.setStartDate( mapStartDate(licenseDto) );

    // 其余生成的映射...

    return license;
}
```

或者，如果不使用这个方法，方法中的三元运算可以直接传递到_expression_中，因为它是一个有效的Java表达式。

### 2.2. 使用条件表达式

类似于表达式，**条件表达式是MapStruct的一个特性，它允许基于字符串内的Java代码条件表达式来映射一个属性。** 生成的代码包含在_if_块中的条件，因此，让我们利用这个特性来映射_License_中的_renewalRequired_：

```java
@Mapping(target = "renewalRequired", conditionExpression = "java(isEndDateInTwoWeeks(licenseDto))", source = ".")
License toLicense(LicenseDto licenseDto);
```

我们可以在_java()_方法中传递任何有效的Java布尔表达式。让我们在映射器接口中定义_isEndDateInTwoWeeks_方法：

```java
default boolean isEndDateInTwoWeeks(LicenseDto licenseDto) {
    return licenseDto.getEndDate() != null
       && Duration.between(licenseDto.getEndDate(), LocalDateTime.now()).toDays() <= 14;
}
```

在编译时，MapStruct生成的代码将根据这个条件设置_renewalRequired_：

```java
@Override
public License toLicense(LicenseDto licenseDto) {
    License license = new License();

    if ( isEndDateInTwoWeeks(licenseDto) ) {
        license.setRenewalRequired( isEndDateInTwoWeeks( licenseDto ) );
    }

    // 其余生成的映射...

    return license;
}
```

也可以在条件匹配时从源设置属性的值。在这种情况下，映射器将使用源中的相应值填充所需的属性。

### 2.3. 使用映射前后

**在某些情况下，如果我们想在通过自定义修改对象之前或之后进行映射，我们可以利用MapStruct的_@BeforeMapping_和_@AfterMapping_注解。** 让我们使用这个特性来映射_endDate_：

```java
@Mapping(target = "endDate", ignore = true)
License toLicense(LicenseDto licenseDto);
```

我们可以定义_AfterMapping_注解来条件性地映射_endDate_。通过这种方式，我们可以基于特定条件控制映射：

```java
@AfterMapping
default void afterMapping(LicenseDto licenseDto, @MappingTarget License license) {
    OffsetDateTime endDate = licenseDto.getEndDate() != null ? licenseDto.getEndDate()
      .atOffset(ZoneOffset.UTC) : OffsetDateTime.now()
      .plusYears(1);
    license.setEndDate(endDate);
}
```

我们需要将输入_LicenseDto_和目标_License_对象作为参数传递给这个_afterMapping_方法。因此，这确保MapStruct生成的代码在返回_License_对象之前，将这个方法作为映射的最后步骤调用：

```java
@Override
public License toLicense(LicenseDto licenseDto) {
    License license = new License();

    // 其余生成的映射...

    afterMapping( licenseDto, license );

    return license;
}
```

或者，我们可以使用_BeforeMapping_注解来实现相同的结果。

### 2.4. 使用_@Condition_

**在映射时，我们可以使用_@Condition_向属性添加自定义存在性检查。默认情况下，MapStruct对每个属性执行存在性检查，但如果有可用的_@Condition_注解的方法，则会优先使用。**

让我们使用这个特性来映射_licenseType_。输入_LicenseDto_以_String_形式接收_licenseType_，并且在映射期间，如果它不是null并且解析为预期的枚举_INDIVIDUAL_或_FAMILY_之一，则需要将其映射到目标：

```java
@Condition
default boolean mapsToExpectedLicenseType(String licenseType) {
    try {
        return licenseType != null && License.LicenseType.valueOf(licenseType) != null;
    } catch (IllegalArgumentException e) {
        return false;
    }
}
```

MapStruct生成的代码将使用这个方法_mapsToExpectedLicenseType()_来映射_licenseType_，因为签名_String_与_LicenseDto_中的_licenseType_匹配：

```java
@Override
public License toLicense(LicenseDto licenseDto) {
    if ( LicenseMapper.mapsToExpectedLicenseType( licenseDto.getLicenseType() ) ) {
        license.setLicenseType( Enum.valueOf( License.LicenseType.class, licenseDto.getLicenseType() ) );
    }

    // 其余生成的映射...

    return license;
}
```

## 3. 结论

在本文中，我们探讨了使用MapStruct条件性地在Java Bean类型之间映射属性的不同方式。

如常，示例的源代码可在GitHub上找到。