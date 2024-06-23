---
date: 2024-06-23
category:
  - Hibernate
  - Spring Data JPA
tag:
  - N+1 Problem
  - 数据库优化
head:
  - - meta
    - name: keywords
      content: Spring, Hibernate, N+1 Problem, 数据库查询优化
---
# Hibernate和Spring Data JPA中的N+1问题

Spring JPA和Hibernate提供了一个强大的工具，用于与数据库无缝通信。然而，由于客户端将更多的控制权委托给框架，生成的查询可能远非最优。

在本教程中，我们将回顾在使用Spring JPA和Hibernate时常见的N+1问题，并检查可能导致问题的不同情况。

为了更好地可视化这个问题，我们需要概述实体之间的关系。让我们以一个简单的社交网络平台为例，其中只有用户和帖子：

我们在使用图表中的_Iterable_，并为每个示例提供具体实现：_List_或_Set_。

为了测试请求的数量，我们将使用专用库而不是检查日志。然而，我们将参考日志以更好地理解请求的结构。

如果每个示例中未明确提及，则假定关系的获取类型为默认值。所有_一对一_关系具有急切获取，而_多对一_ - 懒惰。此外，代码示例使用Lombok来减少代码中的噪音。

N+1问题是在单个请求中，例如获取用户时，我们会为每个用户进行额外的请求以获取他们的信息。**尽管这个问题通常与延迟加载有关，但情况并非总是如此。**
我们可以使用任何类型的关系来获得这个问题。然而，它通常出现在_多对多_或_一对多_关系中。

### 3.1. 延迟获取

首先，让我们看看延迟加载可能导致N+1问题。我们将考虑以下示例：

```java
@Entity
public class User {
    @Id
    private Long id;
    private String username;
    private String email;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "author")
    protected List``<Post>`` posts;
    // 构造函数，getter，setter等
}
```

用户与帖子之间有_一对多_关系。这意味着每个用户都有多个帖子。我们没有明确标识字段的获取策略。策略是从注释中推断出来的。**正如前面提到的，@OneToMany默认具有延迟获取：**

```java
@Target({METHOD, FIELD})
@Retention(RUNTIME)
public @interface OneToMany {
    Class targetEntity() default void.class;
    CascadeType[] cascade() default {};
    FetchType fetch() default FetchType.LAZY;
    String mappedBy() default "";
    boolean orphanRemoval() default false;
}
```

如果我们尝试获取所有用户，延迟获取不会拉取我们未访问的更多信息：

```java
@Test
void givenLazyListBasedUser_WhenFetchingAllUsers_ThenIssueOneRequests() {
    getUserService().findAll();
    assertSelectCount(1);
}
```

因此，为了获取所有用户，我们将发出一个单一的请求。让我们尝试访问帖子。Hibernate将发出额外的请求，因为信息之前没有被获取。对于单个用户，这意味着总共需要两个请求：

```java
@ParameterizedTest
@ValueSource(longs = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
void givenLazyListBasedUser_WhenFetchingOneUser_ThenIssueTwoRequest(Long id) {
    getUserService().getUserByIdWithPredicate(id, user -> !user.getPosts().isEmpty());
    assertSelectCount(2);
}
```

getUserByIdWithPredicate(Long, Predicate)方法过滤用户，但其主要目标是在测试中触发加载。我们将有1+1个请求，但如果我们扩展它，我们将得到N+1问题：

```java
@Test
void givenLazyListBasedUser_WhenFetchingAllUsersCheckingPosts_ThenIssueNPlusOneRequests() {
    int numberOfRequests = getUserService().countNumberOfRequestsWithFunction(users -> {
        List<List``<Post>``> usersWithPosts = users.stream()
          .map(User::getPosts)
          .filter(List::isEmpty)
          .toList();
        return users.size();
    });
    assertSelectCount(numberOfRequests + 1);
}
```

我们应该对延迟获取保持警惕。在某些情况下，延迟加载可以减少我们从数据库获取的数据量。**然而，如果我们在大多数情况下访问延迟获取的信息，我们可能会增加请求的数量。**为了做出最佳判断，我们必须调查访问模式。

### 3.2. 急切获取

在大多数情况下，急切加载可以帮助我们解决N+1问题。然而，结果取决于我们实体之间的关系。让我们考虑一个类似的用户类，但具有明确设置的急切获取：

```java
@Entity
public class User {
    @Id
    private Long id;
    private String username;
    private String email;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "author", fetch = FetchType.EAGER)
    private List``<Post>`` posts;
    // 构造函数，getter，setter等
}
```

如果我们获取一个单一的用户，获取类型将强制Hibernate在单个请求中加载所有数据：

```java
@ParameterizedTest
@ValueSource(longs = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
void givenEagerListBasedUser_WhenFetchingOneUser_ThenIssueOneRequest(Long id) {
    getUserService().getUserById(id);
    assertSelectCount(1);
}
```

同时，获取所有用户的情况发生了变化。**无论我们是否想使用帖子，我们都会立即得到N+1：**

```java
@Test
void givenEagerListBasedUser_WhenFetchingAllUsers_ThenIssueNPlusOneRequests() {
    List````<User>```` users = getUserService().findAll();
    assertSelectCount(users.size() + 1);
}
```

尽管急切获取改变了Hibernate获取数据的方式，但很难说它是一次成功的优化。

## 4. 多个集合

让我们在我们的初始领域中引入_组_：

组包含一个_用户列表_：

```java
@Entity
public class Group {
    @Id
    private Long id;
    private String name;
    @ManyToMany
    private List````<User>```` members;
    // 构造函数，getter，setter等
}
```

### 4.1. 延迟获取

这种关系通常会像以前的延迟获取示例一样表现。我们将为每次访问延迟获取的信息发出新的请求。

因此，除非我们直接访问用户，否则我们将有一个单一的请求：

```java
@Test
void givenLazyListBasedGroup_whenFetchingAllGroups_thenIssueOneRequest() {
    groupService.findAll();
    assertSelectCount(1);
}

@ParameterizedTest
@ValueSource(longs = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
void givenLazyListBasedGroup_whenFetchingAllGroups_thenIssueOneRequest(Long groupId) {
    Optional```<Group>``` group = groupService.findById(groupId);
    assertThat(group).isPresent();
    assertSelectCount(1);
}
```

但是，如果我们尝试访问组中的每个用户，它将创建N+1问题：

```java
@Test
void givenLazyListBasedGroup_whenFilteringGroups_thenIssueNPlusOneRequests() {
    int numberOfRequests = groupService.countNumberOfRequestsWithFunction(groups -> {
        groups.stream()
          .map(Group::getMembers)
          .flatMap(Collection::stream)
          .collect(Collectors.toSet());
        return groups.size();
    });
    assertSelectCount(numberOfRequests + 1);
}
```

countNumberOfRequestsWithFunction(ToIntFunction)方法计算请求数量，并且还触发了延迟加载。

### 4.2. 急切获取

让我们检查急切获取的行为。在请求一个单一的组时，我们将得到以下结果：

```java
@ParameterizedTest
@ValueSource(longs = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
void givenEagerListBasedGroup_whenFetchingAllGroups_thenIssueNPlusOneRequests(Long groupId) {
    Optional```<Group>``` group = groupService.findById(groupId);
    assertThat(group).isPresent();
    assertSelectCount(1 + group.get().getMembers().size());
}
```

这是合理的，因为我们需要急切地获取每个用户的信息。同时，当我们获取所有组时，请求的数量显著增加：

```java
@Test
void givenEagerListBasedGroup_whenFetchingAllGroups_thenIssueNPlusMPlusOneRequests() {
    List```<Group>``` groups = groupService.findAll();
    Set````<User>```` users = groups.stream().map(Group::getMembers).flatMap(List::stream).collect(Collectors.toSet());
    assertSelectCount(groups.size() + users.size() + 1);
}
```

我们需要获取用户的信息，然后，对于每个用户，我们获取他们的帖子。技术上，我们有一个N+M+1的情况。**因此，既不是延迟也不是急切获取完全解决了问题。**

### 4.3. 使用Set

让我们以不同的方式处理这种情况。让我们用_Set_替换_Lists_。我们将使用急切获取，因为延迟_Set_和_List_的行为相似：

```java
@Entity
public class Group {
    @Id
    private Long id;
    private String name;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set````<User>```` members;
    // 构造函数，getter，setter等
}

@Entity
public class User {
    @Id
    private Long id;
    private String username;
    private String email;
    @