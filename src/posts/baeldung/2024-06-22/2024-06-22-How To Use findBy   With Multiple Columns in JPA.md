---
date: 2024-02-09
category:
  - Spring Data JPA
  - JPA
tag:
  - findBy
  - 多列查询
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, JPA, findBy, 多列查询
------
# 如何在JPA中使用findBy()与多列查询

Spring Data JPA提供了一个查询派生特性，通过遵循方法命名约定，我们可以自动派生查询。

在本文中，我们将使用查询派生特性通过一个或多个列来查找实体。

## 2. 示例设置

为了示例目的，我们将使用一个包含与用户账户相关的属性的_Account_实体：

```java
@Entity
@Table(name = "ACCOUNTS")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "accounts_seq")
    @SequenceGenerator(name = "accounts_seq", sequenceName = "accounts_seq", allocationSize = 1)
    @Column(name = "user_id")
    private int userId;
    private String username;
    private String password;
    private String email;
    private Timestamp createdOn;
    private Timestamp lastLogin;

    @OneToOne
    @JoinColumn(name = "permissions_id")
    private Permission permission;

    // getters and setters
}
```

为了演示目的，我们还将向_Accounts_表中添加一些示例数据：

| userId | username       | password                         | email              | createdOn                 | lastLogin                 | permission |
| ------ | -------------- | --------------------------------- | ------------------ | ------------------------- | ------------------------- | ----------- |
| 1      | user_admin     | 737d4251-7ccf-46ce-8227-24cce9be812e | test@test.com     | 2024-02-08 21:26:30.372286 | 2024-02-09 21:26:30.37229 | editor      |
| 2      | user_admin_1   | 65cfd915-240c-4f64-8378-27fa1ff9cdf5 | test1@test.com    | 2024-02-06 21:26:30.372286 | 2024-02-07 21:26:30.37229 | editor      |
| 3      | user_admin_2   | 9b4dca2e-f1d2-4b14-9553-3b8913323b48 | test2@test.com    | 2024-02-04 21:26:30.372286 | 2024-02-06 21:26:30.37229 | editor      |

## 3. 查询派生

**查询派生允许开发者在仓库接口中定义遵循命名约定的方法名称，框架基于该方法名称生成适当的查询。**

例如，如果我们想要通过电子邮件地址搜索_accounts_表，那么我们在_AccountRepository_中的方法看起来如下：

```java
public interface AccountRepository extends JpaRepository````<Account, Integer>```` {
    Account findByEmail(String email);
}
```

如果我们在_AccountRepository_上执行_findByEmail()_，Spring Data会生成以下SQL并针对_accounts_表执行它：

```sql
select a1_0.user_id,a1_0.created_on,a1_0.email,a1_0.last_login,a1_0.password,a1_0.permissions_id,a1_0.username
from accounts a1_0
where a1_0.email=?
```

我们的测试验证了_findByEmail()_的工作：

```java
@Test
void givenAccountInDb_whenPerformFindByEmail_thenReturnsAccount() {
    String email = "test@test.com";
    Account account = accountRepository.findByEmail(email);
    assertThat(account.getEmail()).isEqualTo(email);
}
```

**我们可以扩展查询派生特性，以添加组合条件来获得适当的结果。**

让我们使用_AccountRepository_接口并编写另一个方法来查找具有_username_和_email_的Accounts：

```java
public interface AccountRepository extends JpaRepository````<Account, Integer>```` {
    Account findByUsernameAndEmail(String username, String email);
}
```

这是为定义的方法生成的SQL：

```sql
select a1_0.user_id,a1_0.created_on,a1_0.email,a1_0.last_login,a1_0.password,a1_0.permissions_id,a1_0.username
from accounts a1_0
where a1_0.username=? and a1_0.email=?
```

我们的测试验证了_findByUsernameAndEmail()_的工作：

```java
@Test
void givenAccountInDb_whenPerformFindByUsernameAndEmail_thenReturnsAccount(){
    String email = "test@test.com";
    String username = "user_admin";
    Account account = accountRepository.findByUsernameAndEmail(username, email);
    assertThat(account.getUsername()).isEqualTo(username);
    assertThat(account.getEmail()).isEqualTo(email);
}
```

**我们也可以使用_OR_运算符来组合两个条件。** 例如，我们可以通过_username_或_email_进行搜索：

```java
public interface AccountRepository extends JpaRepository````<Account, Integer>```` {
    Account findByUsernameOrEmail(String username, String email);
}
```

让我们看看生成的SQL：

```sql
select a1_0.user_id,a1_0.created_on,a1_0.email,a1_0.last_login,a1_0.password,a1_0.permissions_id,a1_0.username
from accounts a1_0
where a1_0.username=? or a1_0.email=?
```

现在，让我们验证_findByUsernameOrEmail()_的工作：

```java
@Test
void givenAccountInDb_whenPerformFindByUsernameOrEmail_thenReturnsAccount(){
    String email = "test@test.com";
    String username = "user_editor";
    Account account = accountRepository.findByUsernameOrEmail(username, email);
    assertThat(account.getUsername()).isNotEqualTo(username);
    assertThat(account.getEmail()).isEqualTo(email);
}
```

**我们可以使用_findBy()_方法中的集合输入。** 例如，要查找存在于电子邮件列表或用户名列表中的所有账户，我们可以在_AccountRepository_中编写一个方法：

```java
public interface AccountRepository extends JpaRepository````<Account, Integer>```` {
    List``<Account>`` findByUsernameInOrEmailIn(List````<String>```` usernames, List````<String>```` emails);
}
```

让我们看看生成的SQL：

```sql
select a1_0.user_id,a1_0.created_on,a1_0.email,a1_0.last_login,a1_0.password,a1_0.permissions_id,a1_0.username
from accounts a1_0
where a1_0.username in (?,?) or a1_0.email in (?,?,?)
```

我们的测试确认了_findByUsernameInOrEmailIn()_的工作：

```java
@Test
void givenAccountInDb_whenPerformFindByUsernameInOrEmailIn_thenReturnsAccounts(){
    List````<String>```` emails = List.of("test@test.com", "abc@abc.com", "pqr@pqr.com");
    List````<String>```` usernames = List.of("user_editor", "user_admin");
    List``<Account>`` byUsernameInOrEmailIn = accountRepository.findByUsernameInOrEmailIn(usernames, emails);
    assertThat(byUsernameInOrEmailIn.size()).isEqualTo(1);
    assertThat(byUsernameInOrEmailIn.get(0).getEmail()).isEqualTo("test@test.com");
}
```

## 5. 结论

在本教程中，我们讨论了Spring Data的查询派生特性，并使用它在表中查找实体。我们还探讨了使用AND和OR等条件查找实体的各种输入参数的用法。

如常，示例代码可在GitHub上找到。