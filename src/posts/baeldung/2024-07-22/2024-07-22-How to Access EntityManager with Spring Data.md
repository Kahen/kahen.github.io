---
date: 2022-04-01
category:
  - Spring Data
  - JPA
tag:
  - EntityManager
  - Repository
head:
  - - meta
    - name: keywords
      content: Spring Data, JPA, EntityManager, Repository
---
# 如何在Spring Data中访问EntityManager | Baeldung

## 1. 概览

在开发Spring Data应用程序时，我们通常不需要直接访问_EntityManager_。然而，在某些情况下，我们可能想要访问它，比如创建自定义查询或分离实体。

在这个快速教程中，我们将学习如何通过扩展Spring Data Repository来访问_EntityManager_。

## 2. 访问EntityManager

我们可以通过创建一个自定义仓库来获取_EntityManager_，例如扩展内置的_JpaRepository_。

首先，我们将定义一个示例_实体_，用于存储我们想要在数据库中存储的用户：

```
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String email;
    // ...
}
```

在_JpaRepository_中，我们没有直接访问_EntityManager_的权限，因此我们需要创建我们自己的。

让我们创建一个带有自定义查找方法的仓库：

```
public interface CustomUserRepository {
    User customFindMethod(Long id);
}
```

使用_@PeristenceContext_，我们可以在实现类中注入_EntityManager_：

```
public class CustomUserRepositoryImpl implements CustomUserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User customFindMethod(Long id) {
        return (User) entityManager.createQuery("FROM User u WHERE u.id = :id")
          .setParameter("id", id)
          .getSingleResult();
    }
}
```

同样，我们可以使用_@PersistenceUnit_注解，在这种情况下我们将访问_EntityManagerFactory_，并从中获取_EntityManager_。

最后，我们将创建一个扩展了_JpaRepository_和_CustomRepository_的_Repository_：

```
@Repository
public interface UserRepository extends JpaRepository`<User, Long>`, CustomUserRepository {
}
```

此外，我们可以创建一个_Spring Boot_应用程序，并进行测试以确保一切都连接起来并按预期工作：

```
@SpringBootTest(classes = CustomRepositoryApplication.class)
class CustomRepositoryUnitTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void givenCustomRepository_whenInvokeCustomFindMethod_thenEntityIsFound() {
        User user = new User();
        user.setEmail("foo@gmail.com");
        user.setName("userName");

        User persistedUser = userRepository.save(user);

        assertEquals(persistedUser, userRepository.customFindMethod(user.getId()));
    }
}
```

## 3. 结论

在本文中，我们查看了一个在Spring Data应用程序中访问_EntityManager_的快速示例。我们可以在自定义仓库中访问_EntityManager_，并通过扩展其功能来使用我们的Spring Data Repository。

如常，这些示例的代码可以在GitHub上找到。