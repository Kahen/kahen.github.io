---
date: 2023-12-27
category:
  - Spring Data JPA
  - CRUD
tag:
  - getReferenceById
  - findById
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, getReferenceById, findById, JPA, 数据库操作
---
# 在Spring Data JPA中何时使用getReferenceById()和findById()方法

_JpaRepository_ 提供了基本的CRUD操作方法。然而，其中一些方法并不那么直接明了，有时很难确定哪种方法最适合给定的情况。

**_getReferenceById(ID)_ 和 _findById(ID)_ 是经常造成混淆的方法。** 这些方法是 _getOne(ID)_, findOne(ID), _getById(ID)_ 的新API名称。

在本教程中，我们将学习它们之间的区别，并找出每种方法可能更适合的情况。

让我们从这两种方法中最简单的一个开始。这个方法做了它所说的事情，通常开发者对它没有任何问题。它简单地根据特定的ID在仓库中找到一个实体：

```
@Override
Optional`<T>` findById(ID id);
```

该方法返回一个_Optional_。因此，如果我们传递一个不存在的ID，假设它是空的，这是正确的。

该方法在内部使用急切加载，所以每当我们调用这个方法时，我们都会向数据库发送请求。让我们看一个例子：

```
public User findUser(long id) {
    log.info("Before requesting a user in a findUser method");
    Optional```<User>``` optionalUser = repository.findById(id);
    log.info("After requesting a user in a findUser method");
    User user = optionalUser.orElse(null);
    log.info("After unwrapping an optional in a findUser method");
    return user;
}
```

这段代码将生成以下日志：

```
[2023-12-27 12:56:32,506]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.SimpleUserService - Before requesting a user in a findUser method
[2023-12-27 12:56:32,508]-[main] DEBUG org.hibernate.SQL -
    select
        user0_."id" as id1_0_0_,
        user0_."first_name" as first_na2_0_0_,
        user0_."second_name" as second_n3_0_0_
    from
        "users" user0_
    where
        user0_."id"=?
[2023-12-27 12:56:32,508]-[main] TRACE org.hibernate.type.descriptor.sql.BasicBinder - binding parameter [1] as [BIGINT] - [1]
[2023-12-27 12:56:32,510]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.SimpleUserService - After requesting a user in a findUser method
[2023-12-27 12:56:32,510]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.SimpleUserService - After unwrapping an optional in a findUser method
```

**Spring可能会在事务中批量请求，但总是会执行它们。** 总的来说，_findById(ID)_ 不会试图让我们感到惊讶，它做了我们期望它做的事情。然而，由于它有一个做类似事情的对应方法，所以产生了混淆。

### 3. _getReferenceById()_

这个方法有一个类似于_findById(ID)_的签名：

```
@Override
T getReferenceById(ID id);
```

仅凭签名判断，我们可以假设如果实体不存在，这个方法会抛出一个异常。**这是真的，但这并不是我们拥有的唯一区别。这两种方法之间的主要区别在于 _getReferenceById(ID)_ 是懒加载的。** Spring不会发送数据库请求，直到我们明确地在事务中尝试使用实体。

### 3.1. 事务

**每个事务都有一个专用的持久性上下文与之工作。** 有时，我们可以在事务范围之外扩展持久性上下文，但这并不常见，并且只对特定场景有用。让我们看看持久性上下文关于事务的行为：

在事务中，持久性上下文内的所有实体在数据库中都有直接表示。这是一个管理状态。因此，对实体的所有更改都将反映在数据库中。在事务之外，实体转移到了分离状态，更改在实体被移回管理状态之前不会被反映。

懒加载实体的行为略有不同。Spring直到我们在持久性上下文中明确使用它们时才会加载它们：

Spring将分配一个空的代理占位符来延迟从数据库中获取实体。**然而，如果我们不这样做，实体将在事务之外保持为空代理，任何对它的调用都将导致** _LazyInitializationException._ **然而，如果我们确实调用或以需要内部信息的方式与实体交互，实际的数据库请求将被发出：**

### 3.2. 非事务性服务

了解事务和持久性上下文的行为后，让我们看看以下非事务性服务，它调用了仓库。**_findUserReference_ 没有连接到它的持久性上下文，并且 _getReferenceById_ 将在单独的事务中执行：**

```
public User findUserReference(long id) {
    log.info("Before requesting a user");
    User user = repository.getReferenceById(id);
    log.info("After requesting a user");
    return user;
}
```

这段代码将生成以下日志输出：

```
[2023-12-27 13:21:27,590]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - Before requesting a user
[2023-12-27 13:21:27,590]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - After requesting a user
```

正如我们所看到的，没有数据库请求。**在了解了懒加载之后，Spring假设如果我们不在内部使用实体，我们可能不需要它。** 技术上我们不能使用它，因为我们唯一的事务是 _getReferenceById_ 方法内部的事务。因此，我们返回的 _user_ 将是一个空代理，如果我们访问它的内部，将会导致异常：

```
public User findAndUseUserReference(long id) {
    User user = repository.getReferenceById(id);
    log.info("Before accessing a username");
    String firstName = user.getFirstName();
    log.info("This message shouldn't be displayed because of the thrown exception: {}", firstName);
    return user;
}
```

### 3.3. 事务性服务

让我们看看如果我们使用一个带有 _@Transactional_ 服务的行为：

```
@Transactional
public User findUserReference(long id) {
    log.info("Before requesting a user");
    User user = repository.getReferenceById(id);
    log.info("After requesting a user");
    return user;
}
```

这将给我们一个与前面例子相同的原因的结果，因为我们没有在事务内使用实体：

```
[2023-12-27 13:32:44,486]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - Before requesting a user
[2023-12-27 13:32:44,486]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - After requesting a user
```

同样，任何尝试在这个事务性服务方法之外与这个用户交互的行为都将导致异常：

```
@Test
void whenFindUserReferenceUsingOutsideServiceThenThrowsException() {
    User user = transactionalService.findUserReference(EXISTING_ID);
    assertThatExceptionOfType(LazyInitializationException.class)
      .isThrownBy(user::getFirstName);
}
```

然而，现在，_findUserReference_ 方法定义了我们事务的范围。这意味着我们可以尝试在我们的服务方法中访问 _user_，它应该会导致对数据库的调用：

```
@Transactional
public User findAndUseUserReference(long id) {
    User user = repository.getReferenceById(id);
    log.info("Before accessing a username");
    String firstName = user.getFirstName();
    log.info("After accessing a username: {}", firstName);
    return user;
}
```

上述代码将以以下顺序输出消息：

```
[2023-12-27 13:32:44,331]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - Before accessing a username
[2023-12-27 13:32:44,331]-[main] DEBUG org.hibernate.SQL -
    select
        user0_."id" as id1_0_0_,
        user0_."first_name" as first_na2_0_0_,
        user0_."second_name" as second_n3_0_0_
    from
        "users" user0_
    where
        user0_."id"=?
[2023-12-27 13:32:44,331]-[main] TRACE org.hibernate.type.descriptor.sql.BasicBinder - binding parameter [1] as [BIGINT] - [1]
[2023-12-27 13:32:44,331]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - After accessing a username: Saundra
```

当我们调用 _getReferenceById()_ 时，数据库请求并没有发出，而是在我们调用 _user.getFirstName()_ 时发出的。

### 3.3.1 事务性服务与新的仓库事务

让我们检查一个更复杂的例子。假设我们有一个仓库方法，每次调用它时都会创建一个单独的事务：

```
@Override
@Transactional(propagation = Propagation.REQUIRES_NEW)
User getReferenceById(Long id);
```

**_Propagation.REQUIRES_NEW_ 意味着外部事务不会传播，仓库方法将创建它自己的持久性上下文。** 在这种情况下，即使我们使用事务性服务，Spring也会创建两个不相互交互的单独持久性上下文，任何尝试使用 _user_ 都会导致异常：

```
@Test
void whenFindUserReferenceUsingInsideServiceThenThrowsExceptionDueToSeparateTransactions() {
    assertThatExceptionOfType(LazyInitializationException.class)
      .isThrownBy(() ->
        transactionalServiceWithNewTransactionRepository.findAndUseUserReference(EXISTING_ID)
      );
}
```

我们可以使用几种不同的传播配置来创建事务之间更复杂的交互，它们可能会产生不同的结果。

### 3.4. 不进行获取访问实体

让我们考虑一个现实生活场景。假设我们有一个 _Group_ 类：

```
@Entity
@Table(name = "group")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToOne
    private User administrator;
    @OneToMany(mappedBy = "id")
    private Set```<User>``` users = new HashSet<>();
    // getters, setters 和其他方法
}
```

我们想要将一个用户添加为一个组的管理员，我们可以使用 _findById()_ 或 _getReferenceById()_。在这个测试中，我们使用 _findById()_ 获取一个用户，并使其成为一个新的组的管理员：

```
@Test
void givenEmptyGroup_whenAssigningAdministratorWithFindBy_thenAdditionalLookupHappens() {
    Optional```<User>``` optionalUser = userRepository.findById(1L);
    assertThat(optionalUser).isPresent();
    User user = optionalUser.get();
    Group group = new Group();
    group.setAdministrator(user);
    groupRepository.save(group);
    assertSelectCount(2);
    assertInsertCount(1);
}
```

我们可能会合理地假设我们应该有一个 SELECT 查询，但我们得到了两个。这是因为额外的ORM检查。让我们使用 _getReferenceById()_ 做类似的操作：

```
@Test
void givenEmptyGroup_whenAssigningAdministratorWithGetByReference_thenNoAdditionalLookupHappens() {
    User user = userRepository.getReferenceById(1L);
    Group group = new Group();
    group.setAdministrator(user);
    groupRepository.save(group);
    assertSelectCount(0);
    assertInsertCount(1);
}
```

在这种情况下，我们不需要关于用户的额外信息；我们只需要一个ID。因此，我们可以使用 _getReferenceById()_ 方便地提供的占位符，我们有一个单一的 INSERT 而没有额外的 SELECTs。

这样，数据库在映射时会照顾数据的正确性。例如，我们使用错误的ID时会抛出异常：

```
@Test
void givenEmptyGroup_whenAssigningIncorrectAdministratorWithGetByReference_thenErrorIsThrown() {
    User user = userRepository.getReferenceById(-1L);
    Group group = new Group();
    group.setAdministrator(user);
    assertThatExceptionOfType(DataIntegrityViolationException.class)
      .isThrownBy(() -> {
          groupRepository.save(group);
      });
    assertSelectCount(0);
    assertInsertCount(1);
}
```

同时，我们仍然只有一个 INSERT 而没有任何 SELECTs。

然而，我们不能使用相同的方法来添加用户作为组成员。因为我们使用 _Set_，将调用 _equals(T)_ 和 _hashCode()_ 方法。Hibernate会抛出异常，因为 _getReferenceById()_ 没有获取一个真实的对象：

```
@Test
void givenEmptyGroup_whenAddingUserWithGetByReference_thenTryToAccessInternalsAndThrowError() {
    User user = userRepository.getReferenceById(1L);
    Group group = new Group();
    assertThatExceptionOfType(LazyInitializationException.class)
      .isThrownBy(() -> {
          group.addUser(user);
      });
}
```

因此，关于方法的决定应该考虑我们使用实体的数据类型和上下文。

## 4. 结论

_findById()_ 和 _getReferenceById()_ 之间的主要区别在于它们将实体加载到持久性上下文的时间。理解这一点可能有助于实现优化并避免不必要的数据库查找。这个过程与事务及其传播紧密相关。这就是为什么应该观察事务之间的关系。

像往常一样，本教程中使用的所有代码都可以在GitHub上找到。
OK