---
date: 2024-06-28
category:
  - Spring Framework
  - JDBC
tag:
  - Spring 6
  - JdbcClient API
head:
  - - meta
    - name: keywords
      content: Spring 6, JdbcClient, JDBC API, Spring Framework
  - - meta
    - name: description
      content: 介绍Spring Framework 6.1中新引入的JdbcClient接口及其用法。
------
# Spring 6中的JdbcClient API指南

## 1. 概述

在本教程中，我们将学习Spring Framework 6.1中最新添加的_JdbcClient_接口。它提供了一个流畅的接口，为_JdbcTemplate_和_NamedParameterJdbcTemplate_提供了统一的门面，这意味着现在它支持链式操作。**我们现在可以用流畅的API风格定义查询，设置参数，并执行数据库操作**。

这个特性简化了JDBC操作，使它们更易于阅读和理解。然而，我们必须回退到旧的_JdbcTemplate_和_NamedParameterJdbcTemplate_类来进行JDBC批量操作和存储过程调用。

在本文中，我们将使用H2数据库来展示_JdbcClient_的能力。

## 2. 先决条件数据库设置

让我们从查看我们将在探索_JdbcClient_时引用的_student_表开始：

```sql
CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    age INT,
    grade INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    state VARCHAR(100) NOT NULL
);
-- 学生 1
INSERT INTO student (student_name, age, grade, gender, state) VALUES ('John Smith', 18, 3, 'Male', 'California');

-- 学生 2
INSERT INTO student (student_name, age, grade, gender, state) VALUES ('Emily Johnson', 17, 2, 'Female', 'New York');

-- 更多插入语句...
```

上述SQL脚本创建了_student_表并插入了记录。

## 3. 创建_JdbcClient_

Spring Boot框架在_application.properties_中自动发现数据库连接属性，并在应用程序启动时创建_JdbcClient_ bean。之后，_JdbcClient_ bean可以在任何类中自动装配。

以下是一个示例，我们在_StudentDao_类中注入了_JdbcClient_ bean：

```java
@Repository
class StudentDao {
    @Autowired
    private JdbcClient jdbcClient;
}
```

我们将在本文中使用_StudentDao_来定义我们的方法，以理解_JdbcClient_接口。

然而，**接口中也有静态方法如_create(DataSource dataSource)_, _create(JdbcOperations jdbcTemplate)_, 和 _create(NamedParameterJdbcOperations jdbcTemplate)_，这些方法可以创建_JdbcClient_的实例**。

## 4. 使用_JdbcClient_执行数据库查询

正如前面提到的，_JdbcClient_是_JdbcTemplate_和_NamedParameterJdbcTemplate_的统一门面。因此，我们将看到它如何同时支持它们。

### 4.1. 隐式支持位置参数

在这一部分，我们将讨论使用占位符_?_绑定SQL语句参数的位置参数的支持。基本上，我们将看到它如何支持_JdbcTemplate_的特性。

让我们看看下面_StudentDao_类中的方法：

```java
List`````````<Student>````````` getStudentsOfGradeStateAndGenderWithPositionalParams(int grade, String state, String gender) {
    String sql = "select student_id, student_name, age, grade, gender, state from student"
            + " where grade = ? and state = ? and gender = ?";
    return jdbcClient.sql(sql)
      .param(grade)
      .param(state)
      .param(gender)
      .query(new StudentRowMapper()).list();
}
```

在上述方法中，参数_grade_、_state_和_gender_是隐式注册的，它们被分配到方法_param()_的顺序。最后，当调用方法_query()_时，语句被执行，结果通过_RowMapper_帮助检索，就像在_JdbcTemplate_中一样。

方法_query()_还支持_ResultSetExtractor_和_RowCallbackHandler_参数。我们将在接下来的部分看到相关示例。

有趣的是，直到调用方法_list()_之前，都不会检索结果。**还有其它终端操作也得到支持，如_optional()_, _set()_, _single()_, 和 _stream()_**

现在，让我们看看它是如何工作的：

```java
@Test
void givenJdbcClient_whenQueryWithPositionalParams_thenSuccess() {
    List`````````<Student>````````` students = studentDao.getStudentsOfGradeStateAndGenderWithPositionalParams(1, "New York", "Male");
    assertEquals(6, students.size());
}
```

让我们看看如何使用Varargs来完成同样的操作：

```java
Student getStudentsOfGradeStateAndGenderWithParamsInVarargs(int grade, String state, String gender) {
    String sql = "select student_id, student_name, age, grade, gender, state from student"
      + " where grade = ? and state = ? and gender = ? limit 1";
    return jdbcClient.sql(sql)
      .params(grade, state, gender)
      .query(new StudentRowMapper()).single();
}
```

正如我们在上面看到的，我们已经用_params()_替换了_param()_，它接受Varargs参数。我们还使用了_single()_方法来检索仅有的一条记录。

让我们看看它是如何工作的：

```java
@Test
void givenJdbcClient_whenQueryWithParamsInVarargs_thenSuccess() {
    Student student = studentDao.getStudentsOfGradeStateAndGenderWithParamsInVarargs(1, "New York", "Male");
    assertNotNull(student);
}
```

进一步地，**方法_params()_也有一个重载版本，它接受一个_List_参数**。让我们看一个例子：

```java
Optional`````````<Student>````````` getStudentsOfGradeStateAndGenderWithParamsInList(List params) {
    String sql = "select student_id, student_name, age, grade, gender, state from student"
      + " where grade = ? and state = ? and gender = ? limit 1";
    return jdbcClient.sql(sql)
      .params(params)
      .query(new StudentRowMapper()).optional();
}
```

**除了_params(List`<?>` values)_, 我们还看到了_optional()_方法，它返回了_Optional`````````<Student>`````````_对象**。这是上述方法的实际操作：

```java
@Test
void givenJdbcClient_whenQueryWithParamsInList_thenSuccess() {
    List params = List.of(1, "New York", "Male");
    Optional`````````<Student>````````` optional = studentDao.getStudentsOfGradeStateAndGenderWithParamsInList(params);
    if(optional.isPresent()) {
        assertNotNull(optional.get());
    } else {
        assertThrows(NoSuchElementException.class, () -> optional.get());
    }
}
```

### 4.2. 显式支持索引位置参数

**如果我们需要设置SQL语句参数的位置呢？为此我们将使用方法** _param(int jdbcIndex, Object value)_：

```java
List`````````<Student>````````` getStudentsOfGradeStateAndGenderWithParamIndex(int grade, String state, String gender) {
    String sql = "select student_id, student_name, age, grade, gender, state from student"
      + " where grade = ? and state = ? and gender = ?";
    return jdbcClient.sql(sql)
      .param(1, grade)
      .param(2, state)
      .param(3, gender)
      .query(new StudentResultExtractor());
}
```

在方法中，参数的位置索引被显式指定。此外，我们还使用了_query(ResultSetExtractor rse)_方法。

让我们看看这个是如何工作的：

```java
@Test
void givenJdbcClient_whenQueryWithParamsIndex_thenSuccess() {
    List`````````<Student>````````` students = studentDao.getStudentsOfGradeStateAndGenderWithParamIndex(
      1, "New York", "Male");
    assertEquals(6, students.size());
}
```

### 4.3. 支持名称-值对的命名参数

_JdbcClient_还支持使用占位符_:_ _×_绑定命名SQL语句参数，这是_NamedParameterJdbcTemplate_的一个特性。

**_param()_方法也可以接受作为键值对的参数**：

```java
int getCountOfStudentsOfGradeStateAndGenderWithNamedParam(int grade, String state, String gender) {
    String sql = "select student_id, student_name, age, grade, gender, state from student"
      + " where grade = :grade and state = :state and gender = :gender";
    RowCountCallbackHandler countCallbackHandler = new RowCountCallbackHandler();
    jdbcClient.sql(sql)
      .param("grade", grade)
      .param("state", state)
      .param("gender", gender)
      .query(countCallbackHandler);
    return countCallbackHandler.getRowCount();
}
```

在上述方法中，我们使用了命名参数。此外，我们还使用了_query(RowCallbackHandler rch)_。让我们看看它是如何工作的：

```java
@Test
void givenJdbcClient_whenQueryWithNamedParam_thenSuccess() {
    Integer count = studentDao.getCountOfStudentsOfGradeStateAndGenderWithNamedParam(1, "New York", "Male");
    assertEquals(6, count);
}
```

### 4.4. 支持使用_Map_的命名参数

有趣的是，**我们也可以在_params(Map`<String,?>` 继续翻译

paramMap)_方法中以映射的形式传递参数名-值对：

```java
List`````````<Student>````````` getStudentsOfGradeStateAndGenderWithParamMap(Map``<String, ?>`` paramMap) {
    String sql = "select student_id, student_name, age, grade, gender, state from student"
      + " where grade = :grade and state = :state and gender = :gender";
    return jdbcClient.sql(sql)
      .params(paramMap)
      .query(new StudentRowMapper()).list();
}
```

继续看它是如何工作的：

```java
@Test
void givenJdbcClient_whenQueryWithParamMap_thenSuccess() {
    Map``<String, ?>`` paramMap = Map.of(
      "grade", 1,
      "gender", "Male",
      "state", "New York"
    );
    List`````````<Student>````````` students = studentDao.getStudentsOfGradeStateAndGenderWithParamMap(paramMap);
    assertEquals(6, students.size());
}
```

## 5. 使用_JdbcClient_执行数据库操作

就像查询一样，_JdbcClient_也支持创建、更新和删除记录等数据库操作。与前面的部分类似，我们也可以通过_param()_和_params()_方法的各种重载版本来绑定参数。因此，我们不会重复它们。

然而，**在执行SQL语句而不是调用_query()_方法时，我们将调用_update()_方法**。

这里有一个将记录插入到_student_表中的例子：

```java
Integer insertWithSetParamWithNamedParamAndSqlType(Student student) {
    String sql = "INSERT INTO student (student_name, age, grade, gender, state)"
      + "VALUES (:name, :age, :grade, :gender, :state)";
    Integer noOfrowsAffected = this.jdbcClient.sql(sql)
      .param("name", student.getStudentName(), Types.VARCHAR)
      .param("age", student.getAge(), Types.INTEGER)
      .param("grade", student.getGrade(), Types.INTEGER)
      .param("gender", student.getStudentGender(), Types.VARCHAR)
      .param("state", student.getState(), Types.VARCHAR)
      .update();
    return noOfrowsAffected;
}
```

上述方法使用_param(String name, Object value, int sqlType)_来绑定参数。它还有一个额外的_sqlType_参数来指定参数的数据类型。此外，_update()_方法返回受影响的行数。

让我们看看这个方法是如何工作的：

```java
@Test
void givenJdbcClient_whenInsertWithNamedParamAndSqlType_thenSuccess() {
    Student student = getSampleStudent("Johny Dep", 8, 4, "Male", "New York");
    assertEquals(1, studentDao.insertWithSetParamWithNamedParamAndSqlType(student));
}
```

在上述方法中，_getSampleStudent()_返回一个_student_对象。然后，_student_对象被传递给方法_insertWithSetParamWithNamedParamAndSqlType()_，在_student_表中创建一个新的记录。

**与_JdbcTemplate_类似，_JdbcClient_也有_update(KeyHolder generatedKeyHolder)_方法来检索在执行_insert_语句时创建的自动生成的键**。

## 6. 结论

在本文中，我们学习了在Spring Framework 6.1中引入的新接口_JdbcClient_。我们看到了这个接口如何执行以前由_JdbcTemplate_和_NamedParameterJdbcTemplate_执行的所有操作。此外，由于流畅的API风格，代码也变得更容易阅读和理解。

如常，本文中使用的代码可以在GitHub上找到。

[文章结束]

OK