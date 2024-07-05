---
date: 2024-07-06
category:
  - Hibernate
  - Spring Boot
tag:
  - Natural ID
  - JPA
head:
  - - meta
    - name: keywords
      content: Hibernate, Spring Boot, Natural ID, JPA, Spring Data
---

# Hibernate自然ID在Spring Boot中的使用

## 1. 概述

一些数据库条目拥有自然标识符，例如书籍的ISBN或个人的社保号。除了传统的数据库ID外，Hibernate允许我们将某些字段声明为自然ID，并基于这些属性轻松查询。

在本教程中，我们将讨论`@NaturalId`注解，并学习如何在Spring Boot项目中使用和实现它。

## 2. 简单的自然ID

**我们可以通过简单地用`@NaturalId`注解标注字段来指定自然标识符。这允许我们使用Hibernate的API无缝地查询相关列。**

在本文的代码示例中，我们将使用`HotelRoom`和`ConferenceRoom`数据模型。在第一个示例中，我们将实现`ConferenceRoom`实体，它可以通过其唯一的`name`属性来区分：

```java
@Entity
public class ConferenceRoom {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    private String name;

    private int capacity;

    public ConferenceRoom(String name, int capacity) {
        this.name = name;
        this.capacity = capacity;
    }

    protected ConferenceRoom() {
    }

    // getters
}
```

首先，我们需要用`@NaturalId`注解`name`字段。让我们注意到该字段是不可变的：它在构造函数中声明，并且不公开setter。此外，Hibernate需要一个无参数构造函数，但我们可以使它为`protected`并避免使用它。

**现在，我们可以使用`bySimpleNaturalId`方法轻松地使用其名称作为自然标识符搜索会议室：**

```java
@Service
public class HotelRoomsService {

    private final EntityManager entityManager;

    // constructor

    public Optional``<ConferenceRoom>`` conferenceRoom(String name) {
        Session session = entityManager.unwrap(Session.class);
        return session.bySimpleNaturalId(ConferenceRoom.class)
            .loadOptional(name);
    }
}
```

让我们运行一个测试并检查生成的SQL以确认预期的行为。为了查看Hibernate/JPA SQL日志，我们将添加适当的日志配置：

```properties
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

现在，让我们调用将查询具有自然ID“Colorado”的会议室的`conferenceRoom`方法：

```java
@Test
void whenWeFindBySimpleNaturalKey_thenEntityIsReturnedCorrectly() {
    conferenceRoomRepository.save(new ConferenceRoom("Colorado", 100));

    Optional``<ConferenceRoom>`` result = service.conferenceRoom("Colorado");

    assertThat(result).isPresent()
      .hasValueSatisfying(room -> "Colorado".equals(room.getName()));
}
```

我们可以检查生成的SQL，并期望它使用自然ID，即`name`列来查询`conference_room`表：

```sql
select c1_0.id,c1_0.capacity,c1_0.name
from conference_room c1_0
where c1_0.name=?
```

## 3. 复合自然ID

**自然标识符也可以由多个字段组成。在这种情况下，我们可以用`@NaturalId`注解标注所有相关字段。**

例如，让我们考虑`GuestRoom`实体，它具有由`roomNumber`和`floor`字段组成的复合自然键：

```java
@Entity
public class GuestRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    private Integer roomNumber;

    @NaturalId
    private Integer floor;

    private String name;
    private int capacity;

    public GuestRoom(int roomNumber, int floor, String name, int capacity) {
        this.roomNumber = roomNumber;
        this.floor = floor;
        this.name = name;
        this.capacity = capacity;
    }

    protected GuestRoom() {
    }
    // getters
}
```

与第一个示例类似，我们现在将使用Hibernate的`Session`中的`byNaturalId`方法。之后，**我们将使用流畅的API来指定组成复合键的字段的值：**

```java
public Optional``<GuestRoom>`` guestRoom(int roomNumber, int floor) {
    Session session = entityManager.unwrap(Session.class);
    return session.byNaturalId(GuestRoom.class)
      .using("roomNumber", roomNumber)
      .using("floor", floor)
      .loadOptional();
}
```

现在，让我们通过尝试查询编号为23，位于三楼的`GuestRoom`来测试该方法：

```java
@Test
void whenWeFindByNaturalKey_thenEntityIsReturnedCorrectly() {
    guestRoomJpaRepository.save(new GuestRoom(23, 3, "B-423", 4));

    Optional``<GuestRoom>`` result = service.guestRoom(23, 3);

    assertThat(result).isPresent()
      .hasValueSatisfying(room -> "B-423".equals(room.getName()));
}
```

如果我们现在检查SQL，我们应该看到一个直接使用复合键的简单查询：

```sql
select g1_0.id,g1_0.capacity,g1_0.floor,g1_0.name,g1_0.room_number
from guest_room g1_0
where g1_0.floor=?
and g1_0.room_number=?
```

## 4. 与Spring Data集成

**Spring Data的`JpaRepository`开箱即用并不支持按自然标识符查询。尽管如此，我们可以通过添加额外的方法来扩展这些接口以启用此类查询。** 为了实现这一点，我们首先必须声明丰富的接口：

```java
@NoRepositoryBean
public interface NaturalIdRepository````<T, ID>```` extends JpaRepository````<T, ID>```` {
    Optional``<T>`` naturalId(ID naturalId);
}
```

在此之后，我们将创建这个接口的通用实现。此外，我们需要将通用类型转换为域实体。为了实现这一点，我们可以扩展JPA的`SimpleJpaRepository`，并利用它的`getDomainClass`方法：

```java
public class NaturalIdRepositoryImpl`<T, ID extends Serializable>` extends SimpleJpaRepository````<T, ID>```` implements NaturalIdRepository````<T, ID>```` {
    private final EntityManager entityManager;

    public NaturalIdRepositoryImpl(JpaEntityInformation`<T, ?>` entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Override
    public Optional``<T>`` naturalId(ID naturalId) {
        return entityManager.unwrap(Session.class)
            .bySimpleNaturalId(this.getDomainClass())
            .loadOptional(naturalId);
    }

}
```

此外，我们需要添加`@EnableJpaRepositories`注解，允许Spring扫描整个包并注册我们的自定义存储库：

```java
@Configuration
@EnableJpaRepositories(repositoryBaseClass = NaturalIdRepositoryImpl.class)
public class NaturalIdRepositoryConfig {
}
```

这将允许我们扩展`NaturalIdRepository`接口，为我们拥有自然ID的实体创建存储库：

```java
@Repository
public interface ConferenceRoomRepository extends NaturalIdRepository`<ConferenceRoom, String>` {
}

```

结果，我们将能够使用丰富的存储库API，并利用`naturalId`方法进行简单查询：

```java
@Test
void givenNaturalIdRepository_whenWeFindBySimpleNaturalKey_thenEntityIsReturnedCorrectly() {
    conferenceRoomJpaRepository.save(new ConferenceRoom("Nevada", 200));

    Optional result = conferenceRoomRepository.naturalId("Nevada");

    assertThat(result).isPresent()
      .hasValueSatisfying(room -> "Nevada".equals(room.getName()));
}
```

最后，让我们检查生成的SQL语句：

```sql
select c1_0.id,c1_0.capacity,c1_0.name
from conference_room c1_0
where c1_0.name=?
```

## 5. 结论

在本文中，我们学习了拥有自然标识符的实体，并发现Hibernate的API允许我们轻松地通过这些特殊标识符进行查询。之后，我们创建了一个通用的Spring Data JPA存储库，并丰富了它以利用Hibernate的这一特性。

如常，本文的代码示例可以在GitHub上找到。

OK