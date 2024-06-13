---
date: 2024-06-14
category:
  - Java
tag:
  - MapStruct
  - LocalDateTime
  - Instant
---
# 使用MapStruct映射LocalDateTime到Instant | Baeldung

## 1. 概述

在Java中处理日期和时间时，我们经常会遇到不同的格式，例如_LocalDateTime_和_Instant_。_LocalDateTime_表示没有时区的日期时间，而_Instant_表示通常参考自纪元（1970年1月1日，00:00:00 UTC）的特定时间点。在许多场景中，我们需要在这两种类型之间进行映射。幸运的是，MapStruct，一个强大的Java映射框架，允许我们轻松地做到这一点。

在本教程中，我们将学习如何在MapStruct中将_LocalDateTime_映射到_Instant_。

## 2. 理解_LocalDateTime_和_Instant_

我们可能需要将_LocalDateTime_映射到_Instant_有几种原因。

_LocalDateTime_适用于表示在特定本地时间发生的事件，不考虑时区。我们通常用它来在数据库和日志文件中存储时间戳。**_LocalDateTime_是在所有用户都在同一时区操作的应用程序中存储时间戳的好选择。**

**_Instant_非常适合跟踪全球事件，确保时区一致性，并为与外部系统或API交互提供可靠的格式。** 此外，它还适用于在需要时区一致性的数据库中存储时间戳。

我们将频繁处理_LocalDateTime_和_Instant_值并进行转换。

## 3. 映射场景

假设我们正在实现一个订单处理服务。我们有两种类型的订单——订单和本地订单。_Order_使用_Instant_来支持全球订单处理，而本地订单使用_LocalDateTime_来表示本地时间。

这是订单模型的实现：

```java
public class Order {
    private Long id;
    private Instant created;
    // 其他字段
    // getter和setter
}
```

然后，我们有本地订单的实现：

```java
public class LocalOrder {
    private Long id;
    private LocalDateTime created;
    // 其他字段
    // getter和setter
}
```

## 4. 映射_LocalDateTime_到_Instant_

现在让我们学习如何实现将_LocalDateTime_转换为_Instant_的映射器。

让我们从_OrderMapper_接口开始：

```java
@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    ZoneOffset DEFAULT_ZONE = ZoneOffset.UTC;

    @Named("localDateTimeToInstant")
    default Instant localDateTimeToInstant(LocalDateTime localDateTime) {
        return localDateTime.toInstant(DEFAULT_ZONE);
    }

    @Mapping(target = "id", source = "id")
    @Mapping(target = "created", source = "created", qualifiedByName = "localDateTimeToInstant")
    Order toOrder(LocalOrder source);
}
```

这个_OrderMapper_接口是一个MapStruct映射器，它在处理日期时间字段的自定义转换的同时，将_LocalOrder_对象转换为_Order_对象。它声明了一个常量_DEFAULT_ZONE_，值为_ZoneOffset.UTC_，表示UTC时区。

用_@Named_注解的_localDateTimeToInstant()_方法将_LocalDateTime_转换为使用指定_ZoneOffset_的_Instant_。

_toOrder()_方法映射_LocalOrder_到_Order_。它使用_@Mapping_来定义字段如何映射。_id_字段直接从_source_映射到_target_。**对于_created_字段，它通过指定_qualifiedByName = "localDateTimeToInstant"_应用自定义_localDateTimeToInstant()_方法。** 这确保了_LocalOrder_中的_LocalDateTime_正确转换为_Order_中的_Instant_。

MapStruct使用约定来映射数据类型。映射具有嵌套属性的复杂对象或在某些数据类型之间进行转换可能会引发错误。**MapStruct接口中的默认方法可以定义MapStruct不原生支持的类型之间的显式转换。** 这些方法解决歧义并为转换提供必要的指令。这确保了准确可靠的映射。此外，它们也适用于复杂或嵌套属性映射。总之，它们是维护MapStruct映射中干净、可维护代码的最佳实践。

让我们测试我们的映射器：

```java
class OrderMapperUnitTest {
    private OrderMapper mapper = OrderMapper.INSTANCE;

    @Test
    void whenLocalOrderIsMapped_thenGetsOrder() {
        LocalDateTime localDateTime = LocalDateTime.now();
        long sourceEpochSecond = localDateTime.toEpochSecond(OrderMapper.DEFAULT_ZONE);
        LocalOrder localOrder = new LocalOrder();
        localOrder.setCreated(localDateTime);

        Order target = mapper.toOrder(localOrder);

        Assertions.assertNotNull(target);
        long targetEpochSecond = target.getCreated().getEpochSecond();
        Assertions.assertEquals(sourceEpochSecond, targetEpochSecond);
    }
}
```

这个测试用例检查_OrderMapper_是否正确地将_LocalOrder_转换为_Order，_重点是从_LocalDateTime_到_Instant_的_created_字段映射。它创建了一个_LocalDateTime，_计算了它的纪元秒值，将其设置为一个新的_LocalOrder，_将其映射到一个_Order，_并检查结果是否不是_null。_ 最后，它比较了_LocalOrder_中的_LocalDateTime_和_Order_中的_Instant_的纪元秒值。如果它们匹配，测试通过。

## 5. 映射_Instant_到_LocalDateTime_

现在我们将看到如何将_Instant_映射回_LocalDateTime_：

```java
@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);
    ZoneOffset DEFAULT_ZONE = ZoneOffset.UTC;

    @Named("instantToLocalDateTime")
    default LocalDateTime instantToLocalDateTime(Instant instant) {
        return LocalDateTime.ofInstant(instant, DEFAULT_ZONE);
    }

    @Mapping(target = "id", source = "id")
    @Mapping(target = "created", source = "created", qualifiedByName = "instantToLocalDateTime")
    LocalOrder toLocalOrder(Order source);
}
```

_OrderMapper_现在定义了一个将_Order_对象转换为_LocalOrder_对象的映射。它包括一个自定义映射方法_instantToLocalDateTime()_，使用预定义的_ZoneOffset (UTC)_将_Instant_转换为_LocalDateTime_。

_toLocalOrder()_中的_@Mapping_注解表明_id_字段直接从_Order_映射到_LocalOrder。然后**它使用自定义方法_(qualifiedByName = "instantToLocalDateTime")_对于_created_字段，并将_Instant_转换为_LocalDateTime。**

让我们验证我们的映射：

```java
@Test
void whenOrderIsMapped_thenGetsLocalOrder() {
    Instant source = Instant.now();
    long sourceEpochSecond = source.getEpochSecond();
    Order order = new Order();
    order.setCreated(source);

    LocalOrder target = mapper.toLocalOrder(order);

    Assertions.assertNotNull(target);
    long targetEpochSecond = target.getCreated().toEpochSecond(OrderMapper.DEFAULT_ZONE);
    Assertions.assertEquals(sourceEpochSecond, targetEpochSecond);
}
```

这个测试验证了_OrderMapper_是否正确地将_Order_对象转换为_LocalOrder_对象，重点是映射_Instant_到_LocalDateTime。_

测试创建了一个带有当前时间戳的_Instant_对象并计算了它的纪元秒。然后它创建了一个_Order_对象，并将_Instant_值设置为其_created_字段。

测试使用_mapper.toLocalOrder()_将_Order_对象映射到_LocalOrder。_ 它检查结果的_LocalOrder_不是_null，并验证_LocalOrder_中的_LocalDateTime_的纪元秒与_Order_中的_Instant_的纪元秒是否匹配，确保使用指定的_ZoneOffset_正确映射。

## 6. 结论

在本文中，我们学习了如何使用MapStruct将_LocalDateTime_映射到_Instant_以及反之。我们看到了如何使用_@Named_创建自定义映射方法来转换这些类型，以及正确使用_@Mapping_和_qualifiedByName_。这种方法确保了Java应用程序中的数据转换顺畅和时区一致性。

如往常一样，本文的完整代码示例可以在GitHub上找到。翻译工作已完成，以下是翻译的剩余部分：

```java
// 测试验证_OrderMapper_是否正确地将_Order_对象转换为_LocalOrder_对象，重点是映射_Instant_到_LocalDateTime_。
@Test
void whenOrderIsMapped_thenGetsLocalOrder() {
    Instant source = Instant.now();
    long sourceEpochSecond = source.getEpochSecond();
    Order order = new Order();
    order.setCreated(source);

    LocalOrder target = mapper.toLocalOrder(order);

    Assertions.assertNotNull(target);
    long targetEpochSecond = target.getCreated().toEpochSecond(OrderMapper.DEFAULT_ZONE);
    Assertions.assertEquals(sourceEpochSecond, targetEpochSecond);
}
```

这个测试验证了_OrderMapper_是否正确地将_Order_对象转换为_LocalOrder_对象，重点是映射_Instant_到_LocalDateTime_。

测试创建了一个带有当前时间戳的_Instant_对象并计算了它的纪元秒。然后它创建了一个_Order_对象，并将_Instant_值设置为其_created_字段。

测试使用_mapper.toLocalOrder()_将_Order_对象映射到_LocalOrder。_ 它检查结果的_LocalOrder_不是_null，并验证_LocalOrder_中的_LocalDateTime_的纪元秒与_Order_中的_Instant_的纪元秒是否匹配，确保使用指定的_ZoneOffset_正确映射。

## 6. 结论

在本文中，我们学习了如何使用MapStruct将_LocalDateTime_映射到_Instant_以及反之。我们看到了如何使用_@Named_创建自定义映射方法来转换这些类型，以及正确使用_@Mapping_和_qualifiedByName_。这种方法确保了Java应用程序中的数据转换顺畅和时区一致性。

如往常一样，本文的完整代码示例可以在GitHub上找到。

OK