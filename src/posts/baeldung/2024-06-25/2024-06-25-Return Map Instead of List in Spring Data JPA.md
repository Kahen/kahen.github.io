---
date: 2024-06-25
category:
  - Spring Data JPA
  - Java
tag:
  - Spring
  - JPA
  - Repository
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, Map, List, Repository, Java
---
# 在Spring Data JPA中返回Map而不是List

Spring JPA提供了一个非常灵活且方便的API来与数据库交互。然而，有时我们需要自定义它或为返回的集合添加更多功能。

使用Map作为JPA仓库方法的返回类型可能有助于创建服务和数据库之间更直接的交互。**不幸的是，Spring不允许这种转换自动发生。** 在本教程中，我们将检查如何克服这个问题，并学习一些使仓库更具功能性的有趣技术。

### 2. 手动实现

当框架不提供某些功能时，最明显的方法是我们自己实现。在这种情况下，JPA允许我们从头开始实现仓库，跳过整个生成过程，或使用默认方法以获得两全其美的结果。

#### 2.1 使用List

我们可以实现一个方法将结果列表映射到Map。Stream API在这方面提供了极大的帮助，允许几乎一行代码的实现：

```java
default Map````<Long, User>```` findAllAsMapUsingCollection() {
    return findAll().stream()
      .collect(Collectors.toMap(User::getId, Function.identity()));
}
```

#### 2.2 使用Stream

我们可以做类似的事情，但直接使用Stream。为此，我们可以确定一个自定义方法，它将返回用户的Stream。幸运的是，Spring JPA支持这种返回类型，我们可以从自动生成中受益：

```java
@Query("select u from User u")
Stream````````<User>```````` findAllAsStream();
```

之后，我们可以实现一个自定义方法，将结果映射到我们需要的数据结构：

```java
@Transactional
default Map````<Long, User>```` findAllAsMapUsingStream() {
    return findAllAsStream()
      .collect(Collectors.toMap(User::getId, Function.identity()));
}
```

返回Stream的仓库方法应该在事务内部调用。在这种情况下，我们直接在默认方法上添加了@Transactional注解。

#### 2.3 使用Streamable

这是一种与之前讨论的方法类似的方法。唯一的变化是我们将使用Streamable。我们需要先创建一个自定义方法来返回它：

```java
@Query("select u from User u")
Streamable````````<User>```````` findAllAsStreamable();
```

然后，我们可以适当地映射结果：

```java
default Map````<Long, User>```` findAllAsMapUsingStreamable() {
    return findAllAsStreamable().stream()
      .collect(Collectors.toMap(User::getId, Function.identity()));
}
```

### 3. 自定义Streamable包装器

前面的示例向我们展示了解决这个问题的非常简单的解决方案。然而，假设我们有几种不同的操作或数据结构，我们希望将结果映射到它们上面。**在这种情况下，我们最终可能会得到散布在代码中的笨重的映射器或多个执行类似事情的仓库方法。**

更好的方法可能是创建一个代表实体集合的专用类，并将所有与集合操作相关的方法放在里面。为此，我们将使用Streamable。

正如之前所示，Spring JPA理解Streamable并且可以将其映射到它。有趣的是，我们可以扩展Streamable并为其提供方便的方法。让我们创建一个Users类来表示User对象的集合：

```java
public class Users implements Streamable````````<User>```````` {
    private final Streamable````````<User>```````` userStreamable;

    public Users(Streamable````````<User>```````` userStreamable) {
        this.userStreamable = userStreamable;
    }

    @Override
    public Iterator````````<User>```````` iterator() {
        return userStreamable.iterator();
    }

    // 自定义方法
}
```

为了使其与JPA一起工作，我们应该遵循一个简单的约定。**首先，我们应该实现Streamable，其次，提供Spring能够初始化它的方式。** 初始化部分可以通过接受Streamable的公共构造函数来解决，或者使用名为of(Streamable``<T>``)或valueOf(Streamable``<T>``)的静态工厂。

之后，我们可以将Users作为JPA仓库方法的返回类型：

```java
@Query("select u from User u")
Users findAllUsers();
```

现在，我们可以直接在Users类中放置我们在仓库中保留的方法：

```java
public Map````<Long, User>```` getUserIdToUserMap() {
    return stream().collect(Collectors.toMap(User::getId, Function.identity()));
}
```

最好的部分是，我们可以使用所有与处理或映射User实体相关的方法。假设我们想根据某些标准过滤用户：

```java
@Test
void fetchUsersInMapUsingStreamableWrapperWithFilterThenAllOfThemPresent() {
    Users users = repository.findAllUsers();
    int maxNameLength = 4;
    List````````<User>```````` actual = users.getAllUsersWithShortNames(maxNameLength);
    User[] expected = {
        new User(9L, "Moe", "Oddy"),
        new User(25L, "Lane", "Endricci"),
        new User(26L, "Doro", "Kinforth"),
        new User(34L, "Otho", "Rowan"),
        new User(39L, "Mel", "Moffet")
    };
    assertThat(actual).containsExactly(expected);
}
```

我们也可以将它们以某种方式分组：

```java
@Test
void fetchUsersInMapUsingStreamableWrapperAndGroupingThenAllOfThemPresent() {
    Users users = repository.findAllUsers();
    Map<Character, List````````<User>````````> alphabeticalGrouping = users.groupUsersAlphabetically();
    List````````<User>```````` actual = alphabeticalGrouping.get('A');
    User[] expected = {
        new User(2L, "Auroora", "Oats"),
        new User(4L, "Alika", "Capin"),
        new User(20L, "Artus", "Rickards"),
        new User(27L, "Antonina", "Vivian")};
    assertThat(actual).containsExactly(expected);
}
```

这样，我们可以隐藏这些方法的实现，从我们的服务中移除混乱，并卸载仓库。

### 4. 结论

Spring JPA允许自定义，但有时实现起来非常简单。围绕框架限制的类型构建应用程序可能会影响代码质量甚至应用程序的设计。

使用自定义集合作为返回类型可能会使设计更直接，减少映射和过滤逻辑的混乱。**使用实体集合的专用包装器可以进一步提高代码质量。**

如常，本教程中使用的所有代码都可以在GitHub上找到。