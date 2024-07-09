---
date: 2022-04-01
category:
  - Spring Data JPA
  - JPA
tag:
  - findBy
  - findAllBy
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, findBy, findAllBy, JPA, 查询方法
---
# Spring Data JPA 中 findBy 与 findAllBy 的区别

在本教程中，我们将探讨在使用 Spring Data JPA 的派生查询 API 时，findBy 和 findAllBy 方法命名约定之间的区别。

### 2.1 示例应用程序
首先，我们定义一个示例 Spring Data 应用程序。然后，创建 Player 实体类：

```java
@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Integer score;

    // 全参构造函数和无参构造函数
    // 重写的 equals 方法
    // getter 和 setter
}
```

同时创建 PlayerRepository 接口，它扩展了 JpaRepository 接口：

```java
@Repository
public interface PlayerRepository extends JpaRepository`<Player, Long>` {
}
```

### 2.2 findBy 查询示例
如前所述，findBy 关键字根据规则返回结果的集合。规则跟在 By 关键字之后。让我们在 PlayerRepository 类中创建一个方法来派生一个查询，找到所有得分高于给定输入的所有玩家：

```java
List``````<Player>`````` findByScoreGreaterThan(Integer target);
```

Spring Data JPA 解析方法名称语法为 SQL 语句以派生查询。让我们看看每个关键字的作用：

- find 被翻译为 select 语句。
- By 被解析为 where 子句。
- Score 是表列名称，应该与 Player 类中定义的名称相同。
- GreaterThan 在查询中添加了 > 运算符，将 score 字段与 target 方法参数进行比较。

### 2.3 findAllBy 查询示例
与 findBy 类似，让我们在 PlayerRepository 类中创建一个带有 All 关键字的方法：

```java
List``````<Player>`````` findAllByScoreGreaterThan(Integer target);
```

该方法的工作方式与 findByScoreGreaterThan() 方法相同——唯一的区别是 All 关键字。这个关键字只是一个命名约定，并没有为派生查询增加任何功能，正如我们将在下一节中看到的。

现在，让我们验证 findBy 和 findAllBy 关键字之间只有命名约定上的区别，并证明它们在功能上是相同的。

### 3.1 功能差异
为了分析这两种方法之间是否存在功能差异，让我们编写一个集成测试：

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FindByVsFindAllByApplication.class)
public class FindByVsFindAllByIntegrationTest {
    @Autowired
    private PlayerRepository playerRepository;

    @Before
    public void setup() {
        Player player1 = new Player(600);
        Player player2 = new Player(500);
        Player player3 = new Player(300);
        playerRepository.saveAll(Arrays.asList(player1, player2, player3));
    }

    @Test
    public void givenSavedPlayer_whenUseFindByOrFindAllBy_thenReturnSameResult() {
        List``````<Player>`````` findByPlayers = playerRepository.findByScoreGreaterThan(400);
        List``````<Player>`````` findAllByPlayers = playerRepository.findAllByScoreGreaterThan(400);
        assertEquals(findByPlayers, findAllByPlayers);
    }
}
```

注意：为了让测试通过，Player 实体必须有一个重写的 equals() 方法，比较 id 和 score 字段。

两种方法返回相同的结果，如 assertEquals() 所示。因此，它们在功能上没有差异。

### 3.2 查询语法差异
为了完整，让我们比较这两种方法生成的查询的语法。为此，我们需要首先在 application.properties 文件中添加以下行：

```properties
spring.jpa.show-sql=true
```

如果我们重新运行集成测试，两个查询应该都会出现在控制台中。这是 findByScoreGreaterThan() 派生的查询：

```sql
select
    player0_.id as id1_0_, player0_.score as score2_0_
from
    player player0_
where
    player0_.score > ?
```

这是 findAllByScoreGreaterThan() 派生的查询：

```sql
select
    player0_.id as id1_0_, player0_.score as score2_0_
from
    player player0_
where
    player0_.score > ?
```

正如我们所看到的，生成的查询的语法没有差异。因此，**使用 findBy 和 findAllBy 关键字之间的唯一区别是我们想要采用的代码风格**。我们可以使用它们中的任何一个，并期望得到相同的结果。

## 4. 返回单个结果
我们已经澄清了 findBy 和 findAllBy 之间没有差异，并且两者都返回结果的集合。如果我们改变我们的接口，从这些我们知道可以返回多个结果的派生查询中返回单个结果，我们就有可能得到 NonUniqueResultException。

在这一部分中，我们将看看 find _F_ irst 和 find _T_ op 关键字来派生一个返回单个结果的查询。

**F _irst 和 T _op 关键字应该插入在 find 和 By 关键字之间，以找到存储的第一个元素**。它们也可以与 IsGreaterThan 这样的标准关键字一起使用。让我们看一个例子，找到存储的得分高于 400 的第一个 Player。首先，让我们在 PlayerRepository 类中创建我们的查询方法：

```java
Optional``````<Player>`````` findFirstByScoreGreaterThan(Integer target);
```

Top 关键字在功能上等同于 First。它们之间唯一的区别是命名约定。因此，我们可以使用一个名为 findTopByScoreGreaterThan() 的方法来实现相同的结果。

然后，我们验证我们只得到一个结果：

```java
@Test
public void givenSavedPlayer_whenUsefindFirst_thenReturnSingleResult() {
    Optional``````<Player>`````` player = playerRepository.findFirstByScoreGreaterThan(400);
    assertTrue(player.isPresent());
    assertEquals(600, player.get().getScore());
}
```

**findFirstBy 查询使用 limit SQL 运算符返回匹配我们标准的第一个存储的元素**，在这种情况下，是 id=1 和 score=600 的 Player。

最后，让我们看看我们的方法生成的查询：

```sql
select
    player0_.id as id1_0_, player0_.score as score2_0_
from
    player player0_
where
    player0_.score > ?
limit ?
```

查询几乎与 findBy 和 findAllBy 相同，只是在末尾加上了 limit 运算符。

## 5. 结论
在本文中，我们探讨了 Spring Data JPA 中 findBy 和 findAllBy 关键字之间的相似之处。我们还看了如何使用 findFirstBy 关键字返回单个结果。如常，源代码可在 GitHub 上获得。