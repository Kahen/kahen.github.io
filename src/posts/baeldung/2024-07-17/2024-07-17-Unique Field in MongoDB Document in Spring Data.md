---
date: 2022-04-01
category:
  - Spring Data
  - MongoDB
tag:
  - MongoDB
  - Unique Index
  - Spring Data
head:
  - - meta
    - name: keywords
      content: MongoDB, Spring Data, Unique Index
------
# MongoDB文档中使用Spring Data定义唯一字段

## 1. 引言

在本教程中，我们将学习如何使用Spring Data在MongoDB中定义唯一字段。唯一字段是数据库设计的重要组成部分。它们同时保证了一致性和性能，防止在不应该有重复值的地方出现重复值。

## 2. 配置

与关系型数据库不同，MongoDB不提供创建约束的选项。**因此，我们唯一的选择是创建唯一索引。** 但是，默认情况下，Spring Data中的自动索引创建是关闭的。首先，让我们在_application.properties_中启用它：

```properties
spring.data.mongodb.auto-index-creation=true
```

有了这个配置，如果索引尚不存在，它们将在启动时创建。**但我们必须记住，我们不能在已经有重复值后创建唯一索引。** 这将导致在应用程序启动期间抛出异常。

## 3. _@Indexed_ 注解

_@Indexed_ 注解允许我们将字段标记为具有索引。由于我们配置了自动索引创建，我们不必自己创建它们。**默认情况下，索引不是唯一的。** 因此，我们通过_unique_属性来启用它。让我们通过创建第一个示例来看看它是如何工作的：

```java
@Document
public class Company {
    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    // getters and setters
}
```

注意我们仍然可以有_@Id_注解，它与我们的索引完全独立。**这就是我们需要拥有一个具有唯一字段的文档的全部。** 因此，如果我们插入多个具有相同_email_的文档，将导致_DuplicateKeyException_：

```java
@Test
public void givenUniqueIndex_whenInsertingDupe_thenExceptionIsThrown {
    Company a = new Company();
    a.setName("Name");
    a.setEmail("a@mail.com");

    companyRepo.insert(a);

    Company b = new Company();
    b.setName("Other");
    b.setEmail("a@mail.com");
    assertThrows(DuplicateKeyException.class, () -> {
        companyRepo.insert(b);
    });
}
```

这种方法在我们想要强制执行唯一性但仍然有一个自动生成的唯一ID字段时非常有用。

### 3.1. 注释多个字段

我们还可以将注释添加到多个字段。让我们继续创建第二个示例：

```java
@Document
public class Asset {
    @Indexed(unique = true)
    private String name;

    @Indexed(unique = true)
    private Integer number;
}
```

注意我们没有显式设置任何字段的_@Id_。MongoDB仍然会为我们自动设置一个“ _\_id_”字段，但它对我们的应用程序不可访问。**但是，我们不能将_@Id_与标记为_unique_的_@Indexed_注解放在同一个字段上。** 这将导致应用程序尝试创建索引时抛出异常。

此外，我们现在有两个唯一字段。**请注意，这并不意味着它是一个复合索引。** 因此，任何字段的多次插入相同值都将导致重复键。让我们测试一下：

```java
@Test
public void givenMultipleIndexes_whenAnyFieldDupe_thenExceptionIsThrown {
    Asset a = new Asset();
    a.setName("Name");
    a.setNumber(1);

    assetRepo.insert(a);

    assertThrows(DuplicateKeyException.class, () -> {
        Asset b = new Asset();
        b.setName("Name");
        b.setNumber(2);

        assetRepo.insert(b);
    });

    assertThrows(DuplicateKeyException.class, () -> {
        Asset b = new Asset();
        b.setName("Other");
        b.setNumber(1);

        assetRepo.insert(b);
    });
}
```

如果我们希望只有组合值形成唯一索引，我们必须创建一个复合索引。

### 3.2. 使用自定义类型作为索引

**同样，我们可以注释自定义类型的字段。这将实现复合索引的效果。** 让我们从_SaleId_类开始，表示我们的复合索引：

```java
public class SaleId {
    private Long item;
    private String date;

    // getters and setters
}
```

现在让我们创建_Sale_类来使用它：

```java
@Document
public class Sale {
    @Indexed(unique = true)
    private SaleId saleId;

    private Double value;

    // getters and setters
}
```

现在，每次我们尝试添加具有相同_SaleId_的新_Sale_时，我们都会得到一个重复的键。让我们测试一下：

```java
@Test
public void givenCustomTypeIndex_whenInsertingDupe_thenExceptionIsThrown {
    SaleId id = new SaleId();
    id.setDate("2022-06-15");
    id.setItem(1L);

    Sale a = new Sale(id);
    a.setValue(53.94);

    saleRepo.insert(a);

    assertThrows(DuplicateKeyException.class, () -> {
        Sale b = new Sale(id);
        b.setValue(100.00);

        saleRepo.insert(b);
    });
}
```

这种方法的优点是将索引定义分开。**这允许我们在不重新创建或更新索引的情况下，从_SaleId_中添加或删除新字段。** 它也非常类似于复合键。但是，索引与键不同，因为它们可以有一个空值。

## 4. _@CompoundIndex_ 注解

要创建一个由多个字段组成的唯一索引而不使用自定义类，我们必须创建一个复合索引。**为此，我们直接在类中使用_@CompoundIndex_注解。** 这个注解包含一个_def_属性，我们将使用它来包含我们需要的字段。让我们创建一个定义了_storeId_和_number_字段唯一索引的_Customer_类：

```java
@Document
@CompoundIndex(def = "{'storeId': 1, 'number': 1}", unique = true)
public class Customer {
    @Id
    private String id;

    private Long storeId;
    private Long number;
    private String name;

    // getters and setters
}
```

这与在多个字段上使用_@Indexed_不同。这种方法只有在我们尝试插入具有相同_storeId_和_number_值的客户时，才会导致_DuplicateKeyException_：

```java
@Test
public void givenCompoundIndex_whenDupeInsert_thenExceptionIsThrown {
    Customer customerA = new Customer("Name A");
    customerA.setNumber(1l);
    customerA.setStoreId(2l);

    Customer customerB = new Customer("Name B");
    customerB.setNumber(1l);
    customerB.setStoreId(2l);

    customerRepo.insert(customerA);

    assertThrows(DuplicateKeyException.class, () -> {
        customerRepo.insert(customerB);
    });
}
```

这种方法的优点是我们不必仅为了索引而创建另一个类。**此外，可以将_@Id_注解添加到复合索引定义中的字段。** 然而，与_@Indexed_不同，它不会导致异常。

## 5. 结论

在本文中，我们学习了如何为我们的文档定义唯一字段。**因此，我们了解到我们唯一的选择是使用唯一索引。** 此外，使用Spring Data，我们可以轻松配置应用程序自动创建我们的索引。我们还看到了使用_@Indexed_和_@CompoundIndex_注解的多种方式。

如往常一样，源代码可在GitHub上获取。