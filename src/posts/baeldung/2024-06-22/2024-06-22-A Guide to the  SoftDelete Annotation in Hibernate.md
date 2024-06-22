---
date: 2024-06-23
category:
  - Hibernate
  - SoftDelete
tag:
  - Java
  - Annotation
  - SoftDelete
head:
  - - meta
    - name: keywords
      content: Hibernate, SoftDelete, Java, Annotation
---

# Hibernate中的@SoftDelete注解指南

## 1. 概述

在应用程序中使用数据库时，我们通常需要处理不再有用的记录的删除。然而，由于业务或法规要求，例如数据恢复、审计追踪或引用完整性目的，我们可能需要隐藏这些记录而不是删除它们。

在本教程中，我们将了解Hibernate的@SoftDelete注解并学习如何实现它。

## 2. 理解@SoftDelete注解

**@SoftDelete注解提供了一种方便的机制来标记任何记录为活动状态或已删除状态。**它有三个不同的配置部分：

- **策略配置是跟踪活动行还是已删除行。**我们可以通过将_strategy_设置为_ACTIVE_或_DELETED_来配置它。
- **指示器列确定将使用哪个列来跟踪行。**如果没有指定列，则策略使用默认列（_active_或_deleted_）。
- **转换器定义了指示器列在数据库中的设置方式。**领域类型是一个布尔值，指示记录是活动状态还是已删除状态。然而，通过实现_AttributeConverter_，我们可以将关系类型设置为转换器定义的任何类型。可用的转换器有_NumericBooleanConverter_、_YesNoConverter_和_TrueFalseConverter_。

## 3. 实现@SoftDelete

让我们看几个使用不同配置的@SoftDelete的例子。

### 3.1. 模型

让我们定义一个实体类_SoftDeletePerson_，我们用@SoftDelete注解它。我们不提供任何额外的配置，注解采用所有默认值，例如策略为_DELETED_，一个_deleted_指示器列，以及存储为布尔类型。

@SoftDelete注解支持@ElementCollection，我们已经用配置的策略为_ACTIVE_，一个默认指示器列，并使用_YesNoConverter_存储为‘Y’或‘N’：

```
@SoftDelete
public class SoftDeletePerson {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "Emails", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "emailId")
    @SoftDelete(strategy = SoftDeleteType.ACTIVE,converter = YesNoConverter.class)
    private List````<String>```` emailIds;

    // 标准getter和setter
}
```

### 3.2. 数据设置

让我们为_SoftDeletePerson_实体创建一些数据库条目，并看看Hibernate如何在数据库中保存它们：

```
@BeforeEach
public void setup() {
    session = sessionFactory.openSession();
    session.beginTransaction();

    SoftDeletePerson person1 = new SoftDeletePerson();
    person1.setName("Person1");
    List````<String>```` emailIds = new ArrayList<>();
    emailIds.add("id1@dummy.com");
    emailIds.add("id2@dummy.com");
    person1.setEmailIds(emailIds);

    SoftDeletePerson person2 = new SoftDeletePerson();
    person2.setName("Person2");
    List````<String>```` emailIdsPerson2 = new ArrayList<>();
    emailIdsPerson2.add("person2Id1@dummy.com");
    emailIdsPerson2.add("person2Id2@dummy.com");
    person2.setEmailIds(emailIdsPerson2);

    session.save(person1);
    session.save(person2);
    session.getTransaction()
      .commit();

    assertNotNull(person1.getName());
    assertNotNull(person2.getName());
    System.out.println(person1);
    System.out.println(person2);
}
```

在上面的测试用例中，我们持久化了两个_SoftDeletePerson_实体，并将它们打印出来，以可视化数据库中持久化的内容。下面的输出显示Hibernate将_SoftDeletePerson_保存，_deleted_列设置为_false_。此外，集合_emailIds_有_active_列，值为‘Y’：

### 3.3. 测试

在前面的步骤中，我们在数据库中持久化了一些行。现在，让我们看看@SoftDelete如何处理记录的删除：

```
@Test
void whenDeletingUsingSoftDelete_ThenEntityAndCollectionAreDeleted() {
    session.beginTransaction();
    person1 = session.createQuery("from SoftDeletePerson where name='Person1'", SoftDeletePerson.class)
      .getSingleResult();
    person2 = session.createQuery("from SoftDeletePerson where name='Person2'", SoftDeletePerson.class)
      .getSingleResult();

    assertNotNull(person1);
    assertNotNull(person2);

    session.delete(person2);
    List````<String>```` emailIds = person1.getEmailIds();
    emailIds.remove(0);
    person1.setEmailIds(emailIds);
    session.save(person1);
    session.getTransaction()
      .commit();
    List``<SoftDeletePerson>`` activeRows = session.createQuery("from SoftDeletePerson")
      .list();
    List``<SoftDeletePerson>`` deletedRows = session.createNamedQuery("getDeletedPerson", SoftDeletePerson.class)
      .getResultList();
    session.close();

    assertNotNull(person1.getName());
    System.out.println("-------------Active Rows-----------");
    activeRows.forEach(row -> System.out.println(row));
    System.out.println("-------------Deleted Rows-----------");
    deletedRows.forEach(row -> System.out.println(row));
}
```

首先，我们从数据库中获取了现有的行。接下来，我们删除了一个实体，同时对另一个实体更新了_emailIds_。

然后，当我们删除一个_SoftDeletePerson_实体时，Hibernate将_deleted=true_。同样，当我们删除一个电子邮件ID时，Hibernate将之前的行设置为_active='N'_，并插入一个新行，_active='Y'_。

最后，当我们获取活动和已删除的行时，我们可以看到预期的结果：

## 4. 结论

在本文中，我们探讨了Hibernate中@SoftDelete注解的实现。**默认配置是使用_DELETED_策略，并在数据库列_deleted_中以布尔值存储**。

我们还看到了@ElementCollection是如何被这个注解支持的。最后，我们通过不同配置的测试用例验证了结果。

如常，所有示例的源代码都可以在GitHub上找到。翻译结束，以下是剩余部分的翻译：

## 4. 结论

在本文中，我们探索了Hibernate中@SoftDelete注解的实现。**默认配置是使用_DELETED_策略，并在数据库列_deleted_中以布尔值存储**。

我们还看到了@ElementCollection是如何被这个注解支持的。最后，我们通过不同配置的测试用例验证了结果。

如常，所有示例的源代码都可以在GitHub上找到。

OK