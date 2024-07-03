---
date: 2022-04-01
category:
  - Java
  - Enums
tag:
  - Java
  - Enum转换
head:
  - - meta
    - name: keywords
      content: Java, Enum转换, 枚举类型转换
---
# 在Java中将一个枚举转换为另一个枚举

枚举（Enumerations，或称enums）是Java编程语言中强大且广泛使用的特性。在某些情况下，我们可能需要将一个枚举类型转换为另一个枚举类型。这种需求可能源于集成不同的库或框架、使用来自不同平台的微服务，或处理难以更新的遗留代码。

在本文中，我们将探讨在Java中映射或转换一个枚举到另一个枚举的不同技术。我们将检查内置机制和可以提供帮助的外部库。

### 2. 定义模型

在转换枚举时，我们可能会遇到两种主要情况，可以使用不同的实现技术。第一种情况涉及具有不同值集的不关枚举。第二种情况涉及具有相同值但代表Java视角下不同类的枚举。我们不能简单地将这些类的实例进行强制转换，仍然需要执行映射。

为了说明这些技术，让我们定义两个数据模型。第一个模型代表枚举具有相同值的情况：

```java
public enum OrderStatus {
    PENDING, APPROVED, PACKED, DELIVERED;
}
```

```java
public enum CmsOrderStatus {
    PENDING, APPROVED, PACKED, DELIVERED;
}
```

第二个模型代表枚举具有不同值的情况：

```java
public enum UserStatus {
    PENDING, ACTIVE, BLOCKED, INACTIVATED_BY_SYSTEM, DELETED;
}
```

```java
public enum ExternalUserStatus {
    ACTIVE, INACTIVE
}
```

### 3. 使用Java核心功能

大多数枚举转换可以使用Java语言的核心能力来实现，无需外部库。

#### 3.1. 使用Switch

最直接的选择之一是使用_switch_机制。通过为每个枚举常量创建适当的条件，我们可以确定相应的转换值。switch语句的语法随着不同Java版本的推出而发展。根据项目的Java版本，switch可以以不同的方式实现。

**从Java 12开始，引入了新的switch特性，包括switch表达式和多案例值。** 这允许我们直接返回switch的结果，并将多个值合并到一个案例中。Java 12有一个此特性的预览版本（我们可以使用它，但需要额外的配置），而从Java 14开始提供了永久版本。

让我们看一个实现示例：

```java
public ExternalUserStatus toExternalUserStatusViaSwitchStatement() {
    return switch (this) {
        case PENDING, BLOCKED, INACTIVATED_BY_SYSTEM, DELETED -> ExternalUserStatus.INACTIVE;
        case ACTIVE -> ExternalUserStatus.ACTIVE;
    };
}
```

然而，仍然可以使用旧版本的Java使用普通的switch语句：

```java
public ExternalUserStatus toExternalUserStatusViaRegularSwitch() {
    switch (this) {
    case PENDING:
    case BLOCKED:
    case INACTIVATED_BY_SYSTEM:
    case DELETED:
        return ExternalUserStatus.INACTIVE;
    case ACTIVE:
        return ExternalUserStatus.ACTIVE;
    }
    return null;
}
```

下面的测试片段演示了这是如何工作的：

```java
@Test
void whenUsingSwitchStatement_thenEnumConverted() {
    UserStatus userStatusDeleted = UserStatus.DELETED;
    UserStatus userStatusPending = UserStatus.PENDING;
    UserStatus userStatusActive = UserStatus.ACTIVE;

    assertEquals(ExternalUserStatus.INACTIVE, userStatusDeleted.toExternalUserStatusViaSwitchStatement());
    assertEquals(ExternalUserStatus.INACTIVE, userStatusPending.toExternalUserStatusViaSwitchStatement());
    assertEquals(ExternalUserStatus.ACTIVE, userStatusActive.toExternalUserStatusViaSwitchStatement());
}

@Test
void whenUsingSwitch_thenEnumConverted() {
    UserStatus userStatusDeleted = UserStatus.DELETED;
    UserStatus userStatusPending = UserStatus.PENDING;
    UserStatus userStatusActive = UserStatus.ACTIVE;

    assertEquals(ExternalUserStatus.INACTIVE, userStatusDeleted.toExternalUserStatusViaRegularSwitch());
    assertEquals(ExternalUserStatus.INACTIVE, userStatusPending.toExternalUserStatusViaRegularSwitch());
    assertEquals(ExternalUserStatus.ACTIVE, userStatusActive.toExternalUserStatusViaRegularSwitch());
}
```

值得一提的是，这种转换逻辑并不一定需要位于枚举类本身中，但如果可能的话，最好封装逻辑。

#### 3.2. 使用成员变量

另一种转换枚举的方法是利用在枚举中定义字段的可能性。通过在_UserStatus_中指定一个_externalUserStatus_字段，并在常量声明中提供所需的值，我们可以为每个枚举值定义一个显式的映射。在这种方法中，转换方法返回_externalUserStatus_值。

_UserStatus_的定义看起来像这样：

```java
public enum UserStatusWithFieldVariable {
    PENDING(ExternalUserStatus.INACTIVE),
    ACTIVE(ExternalUserStatus.ACTIVE),
    BLOCKED(ExternalUserStatus.INACTIVE),
    INACTIVATED_BY_SYSTEM(ExternalUserStatus.INACTIVE),
    DELETED(ExternalUserStatus.INACTIVE);

    private final ExternalUserStatus externalUserStatus;

    UserStatusWithFieldVariable(ExternalUserStatus externalUserStatus) {
        this.externalUserStatus = externalUserStatus;
    }
}
```

转换方法将返回_externalUserStatus_值：

```java
public ExternalUserStatus toExternalUserStatus() {
    return externalUserStatus;
}
```

#### 3.3. 使用_EnumMap_

上述方法适用于所有可以修改的枚举类型。然而，在无法更新源代码或希望将转换逻辑保留在枚举本身之外的情况下，《EnumMap_类可能很有用。

_EnumMap_将帮助我们进行独立的映射：

```java
public class UserStatusMapper {
    public static EnumMap`<UserStatus, ExternalUserStatus>` statusesMap;
    static {
        statusesMap = new EnumMap<>(UserStatus.class);
        statusesMap.put(UserStatus.PENDING, ExternalUserStatus.INACTIVE);
        statusesMap.put(UserStatus.BLOCKED, ExternalUserStatus.INACTIVE);
        statusesMap.put(UserStatus.DELETED, ExternalUserStatus.INACTIVE);
        statusesMap.put(UserStatus.INACTIVATED_BY_SYSTEM, ExternalUserStatus.INACTIVE);
        statusesMap.put(UserStatus.ACTIVE, ExternalUserStatus.ACTIVE);
    }
}
```

**EnumMap特别优化了使用枚举作为映射键，最好避免使用其他类型的映射。**

#### 3.4. 使用枚举名称

当在具有相同值的枚举之间进行转换时，我们可以依赖Java提供的_valueOf()_方法。该方法根据提供的枚举名称返回枚举值。**然而，重要的是要注意，提供的名称必须完全匹配用于声明枚举常量的标识符。** 如果在声明的常量中找不到提供的名称，将抛出_IllegalArgumentException_。

特别是当使用枚举名称方法时要小心，尤其是在处理我们无法控制的外部库或服务中的枚举时。两个枚举之间的不匹配可能导致运行时错误，并可能破坏服务。

为了展示解释的方法，我们将使用_OrderStatus_和_CmsOrderStatus_实体：

```java
public CmsOrderStatus toCmsOrderStatus() {
    return CmsOrderStatus.valueOf(this.name());
}
```

#### 3.5. 使用序数方法

序数方法是一种有趣但棘手的技术，它依赖于枚举的内部实现。在内部，枚举被表示为常量的数组，允许我们通过索引迭代这些值并访问它们。

让我们看看如何使用_ordinal()_功能将_OrderStatus_转换为_CmsOrderStatus_：

```java
public CmsOrderStatus toCmsOrderStatusOrdinal() {
    return CmsOrderStatus.values()[this.ordinal()];
}
```

测试显示了用法：

```java
@Test
void whenUsingOrdinalApproach_thenEnumConverted() {
    OrderStatus orderStatusApproved = OrderStatus.APPROVED;
    OrderStatus orderStatusDelivered = OrderStatus.DELIVERED;
    OrderStatus orderStatusPending = OrderStatus.PENDING;

    assertEquals(CmsOrderStatus.APPROVED, orderStatusApproved.toCmsOrderStatusOrdinal());
    assertEquals(CmsOrderStatus.DELIVERED, orderStatusDelivered.toCmsOrderStatusOrdinal());
    assertEquals(CmsOrderStatus.PENDING, orderStatusPending.toCmsOrderStatusOrdinal());
}
```

重要的是要注意，序数方法有其局限性。它可能在编译期间没有显示任何问题，但当枚举在大小方面变得不兼容时，它容易运行失败。即使枚举的大小保持兼容，它们的值或索引的更改也可能导致错误和不一致的行为。

**尽管序数方法适用于某些场景，但通常建议使用更稳定的方法。** 正如Java文档中所述：

> 序数方法主要设计用于在复杂的基于枚举的数据结构中使用，例如java.util.EnumSet和java.util.EnumMap。

### 4. 使用MapStruct

MapStruct是一个流行的库，用于在实体之间进行映射，它也可以用于枚举转换。

#### 4.1. Maven依赖

让我们将MapStruct依赖项添加到我们的_pom.xml_。我们需要将_MapStruct库_作为依赖项，并将_MapStruct Processor_作为注释处理器：

```xml
`<dependency>`
    ```<groupId>```org.mapstruct```</groupId>```
    ```<artifactId>```mapstruct```</artifactId>```
    ```<version>```1.5.5.Final```</version>```
`</dependency>`
```

```xml
`<plugin>`
    ```<groupId>```org.apache.maven.plugins```</groupId>```
    ```<artifactId>```maven-compiler-plugin```</artifactId>```
    ```<version>```3.5.1```</version>```
    `<configuration>`
        `<source>`17`</source>`
        `<target>`17`</target>`
        `<annotationProcessorPaths>`
            `<path>`
                ```<groupId>```org.mapstruct```</groupId>```
                ```<artifactId>```mapstruct-processor```</artifactId>```
                ```<version>```1.5.5.Final```</version>```
            `</path>`
        `</annotationProcessorPaths>`
    `</configuration>`
`</plugin>`
```

我们可以在Maven中央仓库中找到MapStruct及其处理器的最新版本。

#### 4.2. 使用方法

MapStruct基于在接口中定义的注释生成实现。我们可以在枚举值完全不同的情况以及值相同的情况都使用这个库。如果没有指定特定的映射，MapStruct会根据常数名称之间的匹配自动尝试映射。同时，我们可以在枚举中配置显式的值映射。在较新的MapStruct版本中，我们应该使用_@ValueMapping_代替_@Mapping_。

考虑到我们的模型，_OrderStatus_和_CmsOrderStatus_的映射可以不需要任何手动映射来定义。_UserStatus_和_ExternalUserStatus_之间的映射需要额外的配置，其中枚举名称不匹配：

```java
@Mapper
public interface EnumMapper {

    CmsOrderStatus map(OrderStatus orderStatus);

    @ValueMapping(source = "PENDING", target = "INACTIVE")
    @ValueMapping(source = "BLOCKED", target = "INACTIVE")
    @ValueMapping(source = "INACTIVATED_BY_SYSTEM", target = "INACTIVE")
    @ValueMapping(source = "DELETED", target = "INACTIVE")
    ExternalUserStatus map(UserStatus userStatus);
}
```

同时，_UserStatus.ACTIVE_和_ExternalUserStatus.ACTIVE_之间的映射将自动生成。

除此之外，我们可以使用_MappingConstants.ANY_REMAINING_特性，它将为尚未映射的枚举常数在映射结束时放置默认值（在我们的例子中是_ExternalUserStatus_. _INACTIVE_）：

```java
@ValueMapping(source = MappingConstants.ANY_REMAINING, target = "INACTIVE")
ExternalUserStatus mapDefault(UserStatus userStatus);
```

### 5. 最佳实践和用例

选择适当的转换策略取决于项目的具体要求。应考虑的因素包括枚举常数之间的相似性、对源代码的访问权限以及枚举可能更改的频率。

**当我们可以访问枚举的源代码时，推荐使用switch和成员变量方法。** 这些方法允许我们将转换逻辑封装在单一位置，提供更好的代码组织。此外，switch方法可以扩展以使用一些外部属性并执行更复杂的映射逻辑。然而，需要注意的是，在具有大量条件和大型枚举的场景中，使用switch方法可能导致代码冗长且难以管理。

**当我们无法访问源代码或希望在没有冗长的switch语句的情况下清晰地可视化映射时，《EnumMap_方法是一个好选择。** _EnumMap_允许我们在不需要广泛的switch语句的情况下定义枚举之间的显式映射。当转换逻辑简单明了时，它特别有用。

**只有当源和目标枚举名称相同时，才应使用枚举名称方法。** 在可能出现名称不匹配的情况下，最好通过增加额外的逻辑并定义默认行为来扩展映射方法。这确保了转换可以优雅地处理不匹配和意外情况。

序数方法虽然在基于索引的映射逻辑场景中很有用，但由于其固有的风险，通常应避免使用。枚举名称和序数方法都需要一个弹性的实现来适应枚举大小或值的更改。

另外，为了避免维护复杂的switch语句或映射，可以使用MapStruct来自动化这个过程。它可以处理名称相同的枚举和完全不同名称的枚举，允许我们定义额外的映射逻辑和默认行为。

无论选择哪种方法，都至关重要在枚举更改后立即更新映射。如果更新映射不可行，请确保代码设计得当，能够适当地处理枚举更改，要么退回到默认映射值，要么在出现新的枚举值时优雅地处理。这种方法确保了枚举转换的持久性和稳定性。

### 6. 结论

在本文中，我们探讨了Java中映射枚举的各种技术。我们讨论了内置机制和使用MapStruct。根据特定的用例和要求，不同的技术可能比其他技术更适合。建议在选择转换策略时考虑多个因素，例如枚举常数之间的相似性、对源代码的访问以及枚举可能的更改。

完整的示例可以在GitHub上找到。

OK