---
date: 2024-06-16
category:
  - JPA
  - Hibernate
tag:
  - JPA
  - 持久化
  - 级联
---
# 使用JPA自动保存子对象 | Baeldung

## 1. 概述

有时我们处理的实体模型包含有父实体和子实体的复杂结构。在这种情况下，如果能够通过保存父实体来自动保存其所有子实体，将会非常有益。

在本教程中，我们将深入探讨实现自动保存时可能被忽视的各个方面。我们将讨论单向和双向关系。

## 2. 遗漏的关系注解

**我们可能首先会忽视的是添加关系注解。** 让我们创建一个子实体：

```java
@Entity
public class BidirectionalChild {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //getters和setters
}
```

现在，让我们创建一个包含我们_BidirectionalChild_实体列表的父实体：

```java
@Entity
public class ParentWithoutSpecifiedRelationship {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private List```<BidirectionalChild>``` bidirectionalChildren;
    //getters和setters
}
```

如我们所见，_bidirectionalChildren_字段上没有注解。让我们尝试使用这些实体设置_EntityManagerFactory_：

```java
@Test
void givenParentWithMissedAnnotation_whenCreateEntityManagerFactory_thenPersistenceExceptionExceptionThrown() {
    PersistenceException exception = assertThrows(PersistenceException.class,
      () -> createEntityManagerFactory("jpa-savechildobjects-parent-without-relationship"));
    assertThat(exception)
      .hasMessage("Could not determine recommended JdbcType for Java type 'com.baeldung.BidirectionalChild'");
}
```

我们遇到了一个异常，其中_JdbcType_不能为我们的子实体确定。这种异常对于单向和双向关系都是相似的，**根本原因是父实体中缺少_@OneToMany_注解。**

## 3. 未指定_CascadeType_

太好了！让我们继续前进，并使用_@OneToMany_注解创建_Parent_实体。这样，我们的父子关系将在持久化上下文中可访问。

### 3.1. 使用_@JoinColumn_的单向关系

**为了设置单向关系，我们将使用_@JoinColumn_注解。** 让我们创建_Parent_实体：

```java
@Entity
public class Parent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany
    @JoinColumn(name = "parent_id")
    private List````<UnidirectionalChild>```` joinColumnUnidirectionalChildren;
    //getters和setters
}
```

现在，让我们创建_UnidirectionalChild_实体：

```java
@Entity
public class UnidirectionalChild {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
}
```

最后，让我们尝试保存包含几个子实体的_Parent_实体：

```java
@Test
void givenParentWithUnidirectionalRelationship_whenSaveParentWithChildren_thenNoChildrenPresentInDB() {
    Parent parent = new Parent();

    List````<UnidirectionalChild>```` joinColumnUnidirectionalChildren = new ArrayList<>();
    joinColumnUnidirectionalChildren.add(new UnidirectionalChild());
    joinColumnUnidirectionalChildren.add(new UnidirectionalChild());
    joinColumnUnidirectionalChildren.add(new UnidirectionalChild());

    parent.setJoinColumnUnidirectionalChildren(joinColumnUnidirectionalChildren);

    EntityTransaction transaction = entityManager.getTransaction();
    transaction.begin();
    entityManager.persist(parent);
    entityManager.flush();
    transaction.commit();

    entityManager.clear();
    Parent foundParent = entityManager.find(Parent.class, parent.getId());
    assertThat(foundParent.getChildren()).isEmpty();
}
```

我们构建了带有三个子实体的_Parent_实体，将其存储在数据库中，并清除了持久化上下文。但是，当我们尝试验证从数据库检索的父实体是否包含所有预期的子实体时，我们可以观察到子实体列表显示为空。

让我们看看JPA生成的SQL查询：

```sql
Hibernate:
    insert
    into
        Parent
        (id)
    values
        (?)
    
Hibernate:
    update
        UnidirectionalChild
    set
        parent_id=?
    where
        id=?
```

**我们可以看到两个实体的修改查询，但是_UnidirectionalChild_实体的_INSERT_查询不存在。**

### 3.2. 双向关系

让我们为我们的_Parent_实体添加双向关系：

```java
@Entity
public class Parent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(mappedBy = "parent")
    private List```<BidirectionalChild>``` bidirectionalChildren;
    //getters和setters
}
```

这是_BidirectionalChild_实体：

```java
@Entity
public class BidirectionalChild {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private Parent parent;
}
```

_BidirectionalChild_包含对_Parent_实体的引用。让我们尝试保存具有双向关系的复杂对象：

```java
@Test
void givenParentWithBidirectionalRelationship_whenSaveParentWithChildren_thenNoChildrenPresentInDB() {
    Parent parent = new Parent();
    List```<BidirectionalChild>``` bidirectionalChildren = new ArrayList<>();

    bidirectionalChildren.add(new BidirectionalChild());
    bidirectionalChildren.add(new BidirectionalChild());
    bidirectionalChildren.add(new BidirectionalChild());

    parent.setChildren(bidirectionalChildren);

    EntityTransaction transaction = entityManager.getTransaction();
    transaction.begin();
    entityManager.persist(parent);
    entityManager.flush();
    transaction.commit();

    entityManager.clear();
    Parent foundParent = entityManager.find(Parent.class, parent.getId());
    assertThat(foundParent.getChildren()).isEmpty();
}
```

像前一节一样，这里也没有保存任何子项。在这种情况下，我们将在日志中看到下一个查询：

```sql
Hibernate:
    insert
    into
        Parent
        (id)
    values
        (?)    
```

**原因是我们没有为我们的关系指定_CascadeType_。如果我们希望父实体和子实体能够自动保存，那么包含它至关重要。**

## 4. 设置_CascadeType_

**现在我们已经确定了问题，让我们通过使用_CascadeType_来解决它，无论是单向还是双向关系。**

### 4.1. 使用_@JoinColumn_的单向关系

让我们在_ParentWithCascadeType_实体中为我们的单向关系添加_CascadeType.PERSIST_：

```java
@Entity
public class ParentWithCascadeType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "parent_id")
    private List````<UnidirectionalChild>```` joinColumnUnidirectionalChildren;
    //getters和setters
}
```

_UnidirectionalChild_保持不变。现在，让我们尝试保存_ParentWithCascadeType_实体以及与之相关的几个_UnidirectionalChild_实体：

```java
@Test
void givenParentWithCascadeTypeAndUnidirectionalRelationship_whenSaveParentWithChildren_thenAllChildrenPresentInDB() {
    ParentWithCascadeType parent = new ParentWithCascadeType();
    List````<UnidirectionalChild>```` joinColumnUnidirectionalChildren = new ArrayList<>();

    joinColumnUnidirectionalChildren.add(new UnidirectionalChild());
    joinColumnUnidirectionalChildren.add(new UnidirectionalChild());
    joinColumnUnidirectionalChildren.add(new UnidirectionalChild());

    parent.setJoinColumnUnidirectionalChildren(joinColumnUnidirectionalChildren);

    EntityTransaction transaction = entityManager.getTransaction();
    transaction.begin();
    entityManager.persist(parent);
    entityManager.flush();
    transaction.commit();

    entityManager.clear();
    ParentWithCascadeType foundParent = entityManager
      .find(ParentWithCascadeType.class, parent.getId());
    assertThat(foundParent.getJoinColumnUnidirectionalChildren())
      .hasSize(3);
}
```

正如前几节一样，我们创建了父实体，添加了几个子实体，并在一个事务中保存了它。正如我们所见，数据库响应中存在所有子实体。

现在，让我们看看SQL查询日志是什么样的：

```sql
Hibernate:
    insert
    into
        ParentWithCascadeType
        (id)
    values
        (?)
    
Hibernate:
    insert
    into
        UnidirectionalChild
        (id)
    values
        (?)
    
Hibernate:
    update
        UnidirectionalChild
    set
        parent_id=?
    where
        id=?
```

正如我们所见，_UnidirectionalChild_的_INSERT_查询是存在的。

### 4.2. 双向关系

对于双向关系，我们将重复前一节的更改。让我们从_ParentWithCascadeType_实体修改开始：

```java
@Entity
public class ParentWithCascadeType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.PERSIST)
    private List`````<BidirectionalChildWithCascadeType>````` bidirectionalChildren;
}
```

现在，让我们尝试保存_ParentWithCascadeType_实体以及与之相关的几个_BidirectionalChildWithCascadeType_实体：

```java
@Test
void givenParentWithCascadeTypeAndBidirectionalRelationship_whenParentWithChildren_thenNoChildrenPresentInDB() {
    ParentWithCascadeType parent = new ParentWithCascadeType();
    List`````<BidirectionalChildWithCascadeType>````` bidirectionalChildren = new ArrayList<>();

    bidirectionalChildren.add(new BidirectionalChildWithCascadeType());
    bid继续翻译：

```java
irectionalChildren.add(new BidirectionalChildWithCascadeType());
    bidirectionalChildren.add(new BidirectionalChildWithCascadeType());

    parent.setChildren(bidirectionalChildren);

    EntityTransaction transaction = entityManager.getTransaction();
    transaction.begin();
    entityManager.persist(parent);
    entityManager.flush();
    transaction.commit();

    entityManager.clear();
    ParentWithCascadeType foundParent = entityManager
      .find(ParentWithCascadeType.class, parent.getId());
    assertThat(foundParent.getChildren()).isEmpty();
}
```

很好，我们已经对_UnidirectionalChild_应用了相同的更改，并期望有类似的行为。但是，出于某种原因，我们遇到了一个空的子列表。让我们先检查SQL查询日志：

```sql
Hibernate:
    insert
    into
        ParentWithCascadeType
        (id)
    values
        (?)
    
Hibernate:
    insert
    into
        BidirectionalChildWithCascadeType
        (parent_id, id)
    values
        (?, ?)
```

在日志中，我们可以观察到所有预期的查询都存在。在调试这个问题时，我们注意到_BidirectionalChildWithCascadeType_的_INSERT_查询中的_parent_id_被设置为_null_。**这个问题的原因是，对于双向关系，我们需要显式指定对父实体的引用。** 通常的模式是在父实体中指定一个支持这种逻辑的方法：

```java
@Entity
public class ParentWithCascadeType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.PERSIST)
    private List`````<BidirectionalChildWithCascadeType>````` bidirectionalChildren;

    public void addChildren(List`````<BidirectionalChildWithCascadeType>````` bidirectionalChildren) {
        this.bidirectionalChildren = bidirectionalChildren;
        this.bidirectionalChildren.forEach(c -> c.setParent(this));
    }
}
```

在这个方法中，我们将子列表引用设置为我们的父实体，并对这些子项中的每一个，我们设置对这个父实体的引用。

现在，让我们尝试使用我们的新方法来设置它的子项来保存这个父实体：

```java
@Test
void givenParentWithCascadeType_whenSaveParentWithChildrenWithReferenceToParent_thenAllChildrenPresentInDB() {
    ParentWithCascadeType parent = new ParentWithCascadeType();
    List`````<BidirectionalChildWithCascadeType>````` bidirectionalChildren = new ArrayList<>();

    bidirectionalChildren.add(new BidirectionalChildWithCascadeType());
    bidirectionalChildren.add(new BidirectionalChildWithCascadeType());
    bidirectionalChildren.add(new BidirectionalChildWithCascadeType());

    parent.addChildren(bidirectionalChildren);

    EntityTransaction transaction = entityManager.getTransaction();
    transaction.begin();
    entityManager.persist(parent);
    entityManager.flush();
    transaction.commit();

    entityManager.clear();

    ParentWithCascadeType foundParent = entityManager
      .find(ParentWithCascadeType.class, parent.getId());
    assertThat(foundParent.getChildren()).hasSize(3);
}
```

正如我们所见，父实体已成功保存了所有子实体，并且我们从数据库中检索回了它们全部。

## 5. 结论

在本文中，我们探讨了使用JPA时，子实体可能不会自动与父实体一起保存的潜在原因。这些原因对于单向和双向关系可能有所不同。

**我们使用了_CascadeType.PERSIST_来促进这种逻辑。如果我们需要自动更新或删除，我们也可以考虑其他级联类型。**

如常，完整的源代码可以在GitHub上找到。