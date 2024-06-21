---
date: 2024-06-16
category:
  - Java
  - MapStruct
tag:
  - 数据映射
  - 枚举
---
# 使用MapStruct将枚举映射为字符串

MapStruct是一个高效、类型安全的库，它简化了Java对象之间的数据映射，消除了手动转换逻辑的需要。

在本教程中，我们将探索如何使用MapStruct将枚举映射为字符串。

使用Java枚举作为字符串而不是序数可以简化与外部API的数据交换，使数据检索更简单，并提高UI中的可读性。

假设我们想要将_DayOfWeek_枚举转换为字符串。

_DayOfWeek_是Java Date-Time API中的一个枚举，表示一周的七天，从星期一到星期日。

让我们实现MapStruct映射器：

```java
@Mapper
public interface DayOfWeekMapper {
    DayOfWeekMapper INSTANCE = Mappers.getMapper(DayOfWeekMapper.class);

    String toString(DayOfWeek dayOfWeek);

    // 根据需要添加其他映射方法
}
```

_DayOfWeekMapper_接口是一个由_@Mapper_指定的MapStruct映射器。我们定义了_toString()_方法，它接受一个_DayOfWeek_枚举并将其转换为字符串表示。**默认情况下，MapStruct使用_name()_方法为枚举获取字符串值**：

```java
class DayOfWeekMapperUnitTest {
    private DayOfWeekMapper dayOfWeekMapper = DayOfWeekMapper.INSTANCE;

    @ParameterizedTest
    @CsvSource({"MONDAY,MONDAY", "TUESDAY,TUESDAY", "WEDNESDAY,WEDNESDAY", "THURSDAY,THURSDAY",
                "FRIDAY,FRIDAY", "SATURDAY,SATURDAY", "SUNDAY,SUNDAY"})
    void whenDayOfWeekMapped_thenGetsNameString(DayOfWeek source, String expected) {
        String target = dayOfWeekMapper.toString(source);
        assertEquals(expected, target);
    }
}

```

这验证了_toString()_将_DayOfWeek_枚举值映射到它们预期的字符串名称。这种参数化测试风格还允许我们从单一测试中测试所有可能的变异。

### 2.1. 处理_null_

现在，让我们看看MapStruct如何处理_null_。**默认情况下，MapStruct将_null_源映射到_null_目标。** 但是，这种行为可以修改。

直接验证映射器对_null_输入返回_null_结果：

```java
@Test
void whenNullDayOfWeekMapped_thenGetsNullResult() {
    String target = dayOfWeekMapper.toString(null);
    assertNull(target);
}
```

**MapStruct提供_MappingConstants.NULL_来管理_null_值**：

```java
@Mapper
public interface DayOfWeekMapper {

    @ValueMapping(target = "MONDAY", source = MappingConstants.NULL)
    String toStringWithDefault(DayOfWeek dayOfWeek);
}

```

对于_null_值，此映射返回默认值_MONDAY_：

```java
@Test
void whenNullDayOfWeekMappedWithDefaults_thenReturnsDefault() {
    String target = dayOfWeekMapper.toStringWithDefault(null);
    assertEquals("MONDAY", target);
}
```

## 3. 将_String_映射到_Enum_

现在，让我们看看一个将字符串转换回枚举的映射器方法：

```java
@Mapper
public interface DayOfWeekMapper {

    DayOfWeek nameStringToDayOfWeek(String day);
}

```

这个映射器将代表一周中某一天的字符串转换为相应的_DayOfWeek_枚举值：

```java
@ParameterizedTest
@CsvSource({
    "MONDAY,MONDAY", "TUESDAY,TUESDAY", "WEDNESDAY,WEDNESDAY", "THURSDAY,THURSDAY",
    "FRIDAY,FRIDAY", "SATURDAY,SATURDAY", "SUNDAY,SUNDAY"})
void whenNameStringMapped_thenGetsDayOfWeek(String source, DayOfWeek expected) {
    DayOfWeek target = dayOfWeekMapper.nameStringToDayOfWeek(source);
    assertEquals(expected, target);
}
```

我们验证_nameStringToDayOfWeek()_将一天的字符串表示映射到其对应的枚举。

### 3.1. 处理未映射的值

如果一个字符串不匹配枚举_name_或通过_@ValueMapping_的另一个常量，MapStruct会抛出错误。通常这样做是为了确保所有值都被安全和可预测地映射。**MapStruct创建的映射方法如果在发生未识别的源值时会抛出_IllegalStateException_**：

```java
@Test
void whenInvalidNameStringMapped_thenThrowsIllegalArgumentException() {
    String source = "Mon";
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
        dayOfWeekMapper.nameStringToDayOfWeek(source);
    });
    assertTrue(exception.getMessage().equals("Unexpected enum constant: " + source));
}
```

要更改这种行为，MapStruct还提供了_MappingConstants.ANY_UNMAPPED._ **这指示MapStruct将任何未映射的源值映射到目标常量值**：

```java
@Mapper
public interface DayOfWeekMapper {

    @ValueMapping(target = "MONDAY", source = MappingConstants.ANY_UNMAPPED)
    DayOfWeek nameStringToDayOfWeekWithDefaults(String day);
}

```

最后，这个_@ValueMapping_注解为未映射的源设置了默认行为。因此，任何未映射的输入默认为_MONDAY_：

```java
@ParameterizedTest
@CsvSource({"Mon,MONDAY"})
void whenInvalidNameStringMappedWithDefaults_thenReturnsDefault(String source, DayOfWeek expected) {
    DayOfWeek target = dayOfWeekMapper.nameStringToDayOfWeekWithDefaults(source);
    assertEquals(expected, target);
}
```

## 4. 将_Enum_映射到自定义_String_

现在，我们也转换枚举为_DayOfWeek_的自定义简短表示，如“Mon”，“Tue”等：

```java
@Mapper
public interface DayOfWeekMapper {

    @ValueMapping(target = "Mon", source = "MONDAY")
    @ValueMapping(target = "Tue", source = "TUESDAY")
    @ValueMapping(target = "Wed", source = "WEDNESDAY")
    @ValueMapping(target = "Thu", source = "THURSDAY")
    @ValueMapping(target = "Fri", source = "FRIDAY")
    @ValueMapping(target = "Sat", source = "SATURDAY")
    @ValueMapping(target = "Sun", source = "SUNDAY")
    String toShortString(DayOfWeek dayOfWeek);
}

```

相反，这个_toShortString()_映射配置使用_@ValueMapping_将_DayOfWeek_枚举转换为缩写字符串：

```java
@ParameterizedTest
@CsvSource({
    "MONDAY,Mon", "TUESDAY,Tue", "WEDNESDAY,Wed", "THURSDAY,Thu",
    "FRIDAY,Fri", "SATURDAY,Sat", "SUNDAY,Sun"})
void whenDayOfWeekMapped_thenGetsShortString(DayOfWeek source, String expected) {
    String target = dayOfWeekMapper.toShortString(source);
    assertEquals(expected, target);
}
```

## 5. 将自定义_String_映射到_Enum_

最后，我们将看到如何将缩写字符串转换为_DayOfWeek_枚举：

```java
@Mapper
public interface DayOfWeekMapper {

    @InheritInverseConfiguration(name = "toShortString")
    DayOfWeek shortStringToDayOfWeek(String day);
}

```

此外，_@InheritInverseConfiguration_注解定义了一个反向映射，它允许_shortStringToDayOfWeek()_从_toShortString()_方法继承其配置，将缩写的星期几名称转换为相应的_DayOfWeek_枚举：

```java
@ParameterizedTest
@CsvSource({
    "Mon,MONDAY", "Tue,TUESDAY", "Wed,WEDNESDAY", "Thu,THURSDAY",
    "Fri,FRIDAY", "Sat,SATURDAY", "Sun,SUNDAY"})
void whenShortStringMapped_thenGetsDayOfWeek(String source, DayOfWeek expected) {
    DayOfWeek target = dayOfWeekMapper.shortStringToDayOfWeek(source);
    assertEquals(expected, target);
}
```

## 6. 结论

在本文中，我们学习了如何使用MapStruct的_@ValueMapping_注解进行枚举到字符串的映射。我们还使用了_@InheritInverseConfiguration_来保持来回映射时的一致性。使用这些技巧，我们可以顺利地处理枚举到字符串的转换，并保持代码的清晰和易于维护。

如常，本文的完整代码示例可以在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。