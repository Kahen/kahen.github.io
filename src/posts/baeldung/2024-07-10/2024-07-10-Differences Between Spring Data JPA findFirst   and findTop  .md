---
date: 2022-04-01
category:
  - Spring Data JPA
  - findFirst() vs findTop()
tag:
  - Spring Data JPA
  - findFirst()
  - findTop()
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, findFirst(), findTop(), 数据访问层, 方法比较
---

# Spring Data JPA 中的 findFirst() 和 findTop() 的区别

在本教程中，我们将学习 Spring Data JPA 中的 _findFirst()_ 和 _findTop()_ 方法。这些方法提供了数据检索功能。它们映射到 SQL 中对应的选择查询。

Spring Data JPA 是 Spring 项目下的一个框架。它提供了与持久层工作的 API，即我们用它为我们的关系数据库管理系统（RDBMS）的数据访问层。

_JpaRepository_ 接口提供了实现数据访问层的一种方式。

_JpaRepository_ 是一个泛型接口。我们定义一个接口，该接口扩展了 _JpaRepository_。接口使用我们的 _Entity_ 和 _Entity_ 的主键进行类型化。接下来，我们在我们的仓库接口中添加方法声明。

Spring 框架随后生成接口实现。接口方法的代码是自动生成的。因此，我们得到了持久存储上的数据访问层。

**Spring 框架将我们的 _Repository_ bean 加载到容器中。** 使用 _@Autowired_ 注解，我们可以在我们的组件中注入这个 _Repository_ bean。**这消除了编写 SQL 查询的复杂性。** 我们得到了类型化的数据，增强了调试能力。Spring Data JPA 是一个巨大的生产力助推器。

### 使用 Spring Data JPA _findFirst()

数据检索是数据访问层的核心操作。正如其名称所示，_findFirst()_ 是一种数据检索方法。名称中的“First”表示它从一组记录的开始检索数据。大多数情况下，我们基于某些标准需要数据记录的一个子集。

让我们以一个持有学生数据的实体 _Student_ 为例。它的字段是 _studentId_、_name_ 和 _score_：

```
@Entity
class Student{
    private Long studentId;
    private String name;
    private Double score;
}
```

接下来，我们定义相应的 _Repository_，命名为 _StudentRepository_。这是一个从 _JpaRepository_ 扩展的接口。我们向 _JpaRepository_ 传递 _Student_ 和 _Long_ 类型。这为我们的 _Student_ 实体创建了一个数据访问层：

```
@Repository
public interface StudentRepository extends JpaRepository```<Student, Long>``` {

    Student findFirstByOrderByScoreDesc();
    List````<Student>```` findFirst3ByOrderByScoreDesc();
}
```

### 3.1. 方法名称的意义

方法名称 _findFirstByOrderByScoreDesc()_ 并不是随机的**。方法名称 _findFirstByOrderByScoreDesc()_ 的每一部分都有其意义**。

“find”意味着它映射到一个选择查询。“First”意味着它从记录列表中检索第一条记录。“OrderByScore”表示我们希望记录按 _score_ 属性排序。“Desc”意味着我们希望排序是逆序的。这个方法的返回类型是 _Student_ 对象**。

Spring 框架智能地评估方法名称。然后生成并执行查询以构建我们期望的输出。在我们特定的情况下，它检索第一条 _Student_ 记录。它首先按 _score_ 降序排序 _Student_ 记录。因此，我们得到了所有 _Student_ 中的最高分。

### 3.2. 返回记录集合

下一个方法是 _findFirst3ByOrderByScoreDesc()_。该方法的声明中有一些新特性。

首先，返回类型是 _Student_ 的集合，而不是单一的 _Student_ 对象。其次，“findFirst”后面的数字是3。这意味着我们期望从这个方法中得到多条记录作为输出。

**方法名称中的 3 定义了我们期望的确切记录数**。如果总记录数少于3，则结果中就会少于3条记录。

这个方法也按 _score_ 属性逆序排序。然后，它取前3条记录并将它们作为记录列表返回。因此，我们得到了按分数排名前三的 _Student_。我们可以将限制数字更改为2、4等。

### 3.3. 混合过滤条件

我们也可以在混合其他过滤条件的同时以不同的方式定义相同的限制方法：

```
@Repository
public interface StudentRepository extends JpaRepository```<Student, Long>```{
    
    Student findFirstBy(Sort sort);
    Student findFirstByNameLike(String name, Sort sort);
    
    List````<Student>```` findFirst2ByScoreBetween(int startScore, int endScore, Sort sort);
}
```

这里，_findFirstBy()_ 将 _Sort_ 定义为参数。这使得 _findFirstBy()_ 成为一个通用方法。在调用方法之前，我们将定义排序逻辑。

_findFirstByNameLike()_ 在 _findFirstBy()_ 功能的基础上创建了对 _Student_ 名称的过滤。

_findFirst2ByScoreBetween()_ 定义了分数范围。它按 _Sort_ 标准对 _Student_ 进行排序。然后它找到 _start_ 和 _end_ 分数范围内的前两个 _Student_。

让我们看看如何创建一个 _Sort_ 对象：

```
Sort sort = Sort.by("score").descending();
```

_by()_ 方法以我们想要排序的属性名称作为字符串参数。另一方面，_descending()_ 方法调用使排序逆序。

当调用 _findFirst()_ 方法时，在后台执行了 **以下查询**，因此它限制了结果（_limit 1_）：

```
select student0_."id" as id1_0_, student0_."name" as name2_0_, student0_."score" as score3_0_ from "student" student0_ order by student0_."score" desc limit ?
```

## 使用 Spring Data JPA _findTop()

接下来是 _findTop()_ 方法。**_findTop()_ 只是同一个 _findFirst()_ 方法的另一个名称**。**我们可以无问题地互换使用 _findFirst()_ 或 _findTop()_**。

它们只是别名，是开发者喜好的问题，没有任何实际影响。以下是我们之前看到的相同方法的 _findTop()_ 版本：

```
@Repository
public interface StudentRepository extends JpaRepository```<Student, Long>``` {

    Student findTopByOrderByScoreDesc();
    List````<Student>```` findTop3ByOrderByScoreDesc();
    Student findTopBy(Sort sort);
    Student findTopByNameLike(String name, Sort sort);
    List````<Student>```` findTop2ByScoreBetween(int startScore, int endScore, Sort sort);
    
}
```

当调用带有 findTop 的方法时，在后台执行了 **以下查询**，因此它限制了结果（_limit 1_）：

```
select student0_."id" as id1_0_, student0_."name" as name2_0_, student0_."score" as score3_0_ from "student" student0_ order by student0_."score" desc limit ?
```

如你所见，**_findFirst()_ 执行的查询与 _findTop()_ 相同**。

## 结论

在本文中，我们学习了 Spring Data JPA API 提供的两个方法，_findFirst()_ 和 _findTop()_。这两种方法可以作为更复杂检索方法的基础。

我们已经看到了一些 _findFirst()_ 和 _findTop()_ 与其他过滤条件混合使用的例子。当 _findFirst()_ 或 _findTop()_ 没有数字时返回单个记录。如果 _findFirst()_ 或 _findTop()_ 后面附加了数字，则检索到该数字的记录。

**一个重要的学习点是我们可以任意使用 _findFirst()_ 或 _findTop()_。** 这是一个个人选择问题。_findFirst()_ 和 _findTop()_ 之间没有区别。

如常，示例的源代码可以在 GitHub 上找到。