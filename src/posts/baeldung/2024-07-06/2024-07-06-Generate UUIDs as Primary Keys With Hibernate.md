---
date: 2024-07-06
category:
  - Java
  - Hibernate
tag:
  - UUID
  - JPA
head:
  - - meta
    - name: keywords
      content: Hibernate, UUID, 主键, JPA
---
# 使用Hibernate生成UUID作为主键

## 1. 引言

UUID是数据库中相对常见的一种主键类型。它实际上是全局唯一的，这使得它成为分布式系统中ID类型的一个不错的选择。

在本教程中，我们将看看如何利用Hibernate和JPA为我们的实体生成UUID。

## 2. JPA/Jakarta规范

首先，我们来看看JPA提供了什么来解决这个问题。

自2022年发布的3.1.0版本以来，JPA规范为开发者提供了一个新的_GenerationType.UUID_，我们可以在_@GeneratedValue_注解中使用：

```java
@Entity
class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String status;

    private String number;

    // getter和setter
}
```

_GenerationType_指示持久性提供者应为我们的实体自动生成UUID。

特别是Hibernate，从6.2版本开始支持JPA 3.1.0。因此，至少使用Hibernate 6.2，这将有效：

```java
@Test
public void whenGeneratingUUIDUsingNewJPAGenerationType_thenHibernateGeneratedUUID() throws IOException {
    Reservation reservation = new Reservation();
    reservation.setStatus("created");
    reservation.setNumber("12345");
    UUID saved = (UUID) session.save(reservation);
    Assertions.assertThat(saved).isNotNull();
}
```

然而，根据RFC 4122，定义了四种类型/版本的UUID。JPA规范将UUID版本的选择留给了持久性提供者。因此，**不同的持久性提供者可能会生成不同版本的UUID**。

默认情况下，Hibernate生成第四版的UUID：

```java
@Test
public void whenGeneratingUUIDUsingNewJPAGenerationType_thenHibernateGeneratedUUIDOfVersion4() throws IOException {
    Reservation reservation = new Reservation();
    reservation.setStatus("new");
    reservation.setNumber("012");
    UUID saved = (UUID) session.save(reservation);
    Assertions.assertThat(saved).isNotNull();
    Assertions.assertThat(saved.version()).isEqualTo(4);
}
```

根据RFC 4122，Hibernate能够创建第一版和第四版的UUID。我们将稍后看到如何生成基于时间的（第一版）UUID。

## 3. 在Hibernate 6.2之前

在一些项目中，可能无法从JPA规范2.x跳跃到JPA（或Jakarta）规范3.1.0。然而，如果我们有Hibernate版本4或5，我们仍然有能力生成UUID。为此，我们有两种方法。

首先，我们可以通过在_@GenericGenerator_注解中指定_org.hibernate.id.UUIDGenerator_类来实现这一点：

```java
@Entity
class Sale {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    private boolean completed;

    // getter和setter
}
```

行为将与Hibernate 6.2相同：

```java
@Test
public void whenGeneratingUUIDUsingGenericConverter_thenAlsoGetUUIDGeneratedVersion4() throws IOException {
    Sale sale = new Sale();
    sale.setCompleted(true);
    UUID saved = (UUID) session.save(sale);
    Assertions.assertThat(saved).isNotNull();
    Assertions.assertThat(saved.version()).isEqualTo(4);
}
```

然而，这种方法相当冗长，我们可以通过仅使用_org.hibernate.annotations.UuidGenerator_注解来获得相同的行为：

```java
@Entity
class Sale {

    @Id
    @UuidGenerator
    private UUID id;

    private boolean completed;

    // getter和setter
}
```

此外，**在指定_@UuidGenerator_时，我们可以选择生成的具体UUID版本**。这由_style_参数定义。让我们看看这个参数可以取的值：

- _RANDOM_ – 基于随机数生成UUID（RFC中的第四版）
- _TIME_ – 生成基于时间的UUID（RFC中的第一版）
- _AUTO_ – 这是默认选项，与_RANDOM_相同

让我们看看如何通过Hibernate控制生成的UUID版本：

```java
@Entity
class WebSiteUser {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    private UUID id;

    private LocalDate registrationDate;

    // getter和setter
}
```

现在，我们可以检查，Hibernate将生成基于时间的（第一版）UUID：

```java
@Test
public void whenGeneratingTimeBasedUUID_thenUUIDGeneratedVersion1() throws IOException {
    WebSiteUser user = new WebSiteUser();
    user.setRegistrationDate(LocalDate.now());
    UUID saved = (UUID) session.save(user);
    Assertions.assertThat(saved).isNotNull();
    Assertions.assertThat(saved.version()).isEqualTo(1);
}
```

## 4. 将_String_作为UUID

此外，如果我们将Java ID类型设置为_String_，Hibernate也足够智能为我们生成UUID：

```java
@Entity
class Element {

    @Id
    @UuidGenerator
    private String id;

    private String name;
}
```

正如我们所看到的，Hibernate可以处理_String_和_UUID_ Java类型：

```java
@Test
public void whenGeneratingUUIDAsString_thenUUIDGeneratedVersion1() throws IOException {
    Element element = new Element();
    element.setName("a");
    String saved = (String) session.save(element);
    Assertions.assertThat(saved).isNotEmpty();
    Assertions.assertThat(UUID.fromString(saved).version()).isEqualTo(4);
}
```

在这里，我们应该注意，**当我们将列类型设置为_java.util.UUID_时，Hibernate尝试将其映射到数据库中的相应UUID类型。这个类型可能因数据库而异**。

因此，实际类型实际上取决于设置的Hibernate方言。例如，如果我们使用PostgreSQL，那么相应的类型将是PostgreSQL中的_UUID_。如果我们使用Microsoft SQL Server，那么相应的类型将是_UNIQUEIDENTIFIER_。然而，如果我们使用_String_作为Java ID类型，那么Hibernate将其映射到某些SQL文本类型，如_TEXT_或_VARCHAR_。

## 5. 结论

在本文中，我们学习了使用Hibernate生成UUID的不同方式。

在Hibernate 6.2和Jakarta 3.1.0规范之前有几种选择。自Hibernate 6.2以来，我们可以使用新的JPA _GenerationType.UUID_来生成UUID，而不受持久性提供者的限制。

然而，JPA规范并没有指定生成的UUID版本。如果我们想指定一个具体的版本，我们需要使用Hibernate特定的类，我们仍然有两种选择——第一版或第四版。

如往常一样，本教程的源代码可在GitHub上获得。