---
date: 2022-04-01
category:
  - Spring Boot
  - Java
tag:
  - Spring
  - JDBC
  - Deprecated Methods
head:
  - - meta
    - name: keywords
      content: Spring Boot, Java, JdbcTemplate, Deprecated Methods, Varargs
---
# 如何在Spring Boot 2.4.X及以上版本中替换已弃用的jdbcTemplate.queryForObject和jdbcTemplate.query方法 | Baeldung

在这个教程中，我们将讨论JdbcTemplate中已弃用的queryForObject()和query()方法及其首选替代方法。已弃用的方法接受在对象数组中传递的参数，而新方法则使用Varargs来传递参数。这种方法更直观，因为Varargs专门设计用于高效地向方法传递可变数量的参数。

在我们的教程中，我们将通过在内存中的H2数据库上运行查询来解释所有方法。

### 2. 数据库设置

在我们讨论问题方法之前，让我们首先检查一下我们将在所有示例中使用的学生表：

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

### 3. 已弃用的query()方法

在JdbcTemplate中，有三个使用不同功能接口从查询结果中收集或处理行的query()方法变体。这些接口是ResultSetExtractor、RowCallbackHandler和RowMapper。

让我们看看每一个以及它们的建议替代品。

#### 3.1. 使用RowMapper的query()方法

JdbcTemplate类中的query()方法返回一个列表，表示由数据库查询返回的行。让我们从一个示例开始，我们将查询学生表以获取特定年龄和性别的学生：

```java
public List````````````<Student>```````````` getStudentsOfAgeAndGender(Integer age, String gender) {
  String sql = "select student_id, student_name, age, gender, grade from student where age= ? and gender = ?";
  Object[] args = {age, gender};
  return jdbcTemplate.query(sql, args, new StudentRowMapper());
}
```

在上面的方法中，args变量的类型是Object[]，用于存储查询参数。即使只有一个查询参数，也需要添加到数组中，这是不方便的。

假设我们需要额外的过滤条件来获取特定年级的学生。然后，我们必须为它编写一个新方法：

```java
public List````````````<Student>```````````` getStudentsOfAgeGenderAndGrade(Integer age, String gender, Integer grade) {
  String sql = "select student_id, student_name, age, gender, grade from student where age= ? and gender = ? and grade = ?";
  Object[] args = {age, gender, grade};
  return jdbcTemplate.query(sql, args, new StudentRowMapper());
}
```

因此，为了实现这一点，我们修改了sql和args变量。但是，我们能否消除涉及args变量的样板代码呢？让我们在下面的方法中进一步探讨：

```java
public List````````````<Student>```````````` getStudentsOfAgeGenderAndGrade(Integer age, String gender, String grade) {
  String sql = "select student_id, student_name, age, gender, grade from student where age= ? and gender = ? and grade = ?";
  return jdbcTemplate.query(sql, new StudentRowMapper(), age, gender, grade);
}
```

jdbcTemplate.query的Varargs变体正是我们想要的。

让我们看看已弃用和替代方法的实际应用：

```java
@Test
public void givenDeprecatedMethodQuery_whenArgsAgeAndGender_thenReturnStudents() {
  List````````````<Student>```````````` students = studentDaoWithDeprecatedJdbcTemplateMethods.getStudentsOfAgeGenderAndGrade(4, "Female", 2);
  for (Student student: students) {
    logger.info("Student Name: " + student.getStudentName() + " Student gender: " + student.getStudentGender());
  }
  assertEquals(5, students.size());
}

@Test
public void givenPreferredMethodQuery_whenArgsAgeAndGender_thenReturnStudents() {
  List````````````<Student>```````````` students = studentDaoWithPreferredJdbcTemplateMethods.getStudentsOfAgeGenderAndGrade(4, "Female", 2);

  for (Student student: students) {
    logger.info("Student Name: " + student.getStudentName() + " Student gender: " + student.getStudentGender());
  }
  assertEquals(5, students.size());
}
```

正如我们在上面看到的，两个测试方法调用了Dao类StudentDaoWithDeprecatedJdbcTemplateMethods和StudentDaoWithPreferredJdbcTemplateMethods中的getStudentsOfAgeAndGender()。以下是两种方法的输出：

```
Student Name: Olivia Garcia Student gender: Female Student grade: 2
Student Name: Ava Davis Student gender: Female Student grade: 2
Student Name: Olivia Johnson Student gender: Female Student grade: 2
Student Name: Isabella Davis Student gender: Female Student grade: 2
Student Name: Sophia Hernandez Student gender: Female Student grade: 2
```

毫无疑问，Varargs版本实现了预期的目的。

**在接下来的部分中，我们将主要讨论已弃用和首选方法的使用**。Varargs版本的益处与本节中讨论的相同。因此，我们不会重复。

现在，让我们继续讨论下一个使用ResultSetExtractor接口的已弃用版本。接口中的extractData()方法被调用一次，以便在处理后将所有行返回到数据结构中。在这个例子中，我们创建了一个StudentResultExtractor：

```java
public class StudentResultExtractor implements ResultSetExtractor<List````````````<Student>````````````> {
  @Override
  public List````````````<Student>```````````` extractData(ResultSet rs) throws SQLException {
    List````````````<Student>```````````` students = new ArrayList````````````<Student>````````````();
    while(rs.next()) {
      Student student = new Student();
      student.setStudentId(rs.getInt("student_id"));
      student.setStudentName(rs.getString("student_name"));
      student.setAge(rs.getInt("age"));
      student.setStudentGender(rs.getString("gender"));
      student.setGrade(rs.getInt("grade"));
      student.setState(rs.getString("state"));
      students.add(student);
    }
    return students;
  }
}
```

它返回一个Student的列表。

让我们看看使用数组对象传递查询参数的查询方法，以及上面提到的StudentResultExtractor：

```java
public List````````````<Student>```````````` getStudentsOfGradeAndState(Integer grade, String state) {
  String sql = "select student_id, student_name, age, gender, grade, state from student where grade = ? and state = ?";
  Object[] args = {grade, state};
  return jdbcTemplate.query(sql, args, new StudentResultExtractor());
}
```

上述方法查询学生表，检索特定年级和特定州的学生。

与前一节类似，我们将使用query方法的Varargs版本实现相同的功能：

```java
public List````````````<Student>```````````` getStudentsOfGradeAndState(Integer grade, String state) {
  String sql = "select student_id, student_name, age, gender, grade, state from student where grade = ? and state = ?";
  return jdbcTemplate.query(sql, new StudentResultExtractor(), grade, state);
}
```

最后，我们在单独的测试函数中调用上述两种方法：

```java
@Test
public void givenDeprecatedMethodQuery_whenArgsGradeAndState_thenReturnStudents() {
  List````````````<Student>```````````` students = studentDaoWithDeprecatedJdbcTemplateMethods.getStudentsOfGradeAndState(1, "New York");
  for (Student student: students) {
    logger.info("Student Name: " + student.getStudentName()
      + " Student grade: " + student.getStudentGender()
      + " Student State: " + student.getState());
  }
  assertEquals(6, students.size());
}

@Test
public void givenPreferredMethodQuery_whenArgsGradeAndState_thenReturnStudents() {
  List````````````<Student>```````````` students = studentDaoWithPreferredJdbcTemplateMethods.getStudentsOfGradeAndState(1, "New York");
  for (Student student: students) {
    logger.info("Student Name: " + student.getStudentName()
      + " Student grade: " + student.getStudentGender()
      + " Student State: " + student.getState());
  }
  assertEquals(6, students.size());
}
```

正如预期的那样，两个测试给出了相同的输出：

```
Student Name: Ethan Rodriguez Student grade: Male Student State: New York
Student Name: Benjamin Brown Student grade: Male Student State: New York
Student Name: Matthew Martinez Student grade: Male Student State: New York
Student Name: Christopher Lee Student grade: Male Student State: New York
Student Name: Liam Johnson Student grade: Male Student State: New York
Student Name: Mason Smith Student grade: Male Student State: New York
```

#### 3.3. 使用RowCallbackHandler的query()方法

最后，在本节中，我们将讨论使用RowCallbackHandler接口的版本。在这个例子中，我们将使用RowCountCallbackHandler，它是RowCallbackHandler的一个子类。

让我们首先看看已弃用的版本：

```java
public Integer getCountOfStudentsInAGradeFromAState(String grade, String state) {
  String sql = "select student_id, student_name, age, gender, grade, state from student where grade =```java
  Object[] args = {grade, state};
  RowCountCallbackHandler countCallbackHandler = new RowCountCallbackHandler();
  jdbcTemplate.query(sql, args, countCallbackHandler);
  return countCallbackHandler.getRowCount();
}
```
该方法，正如其名，获取在给定年级和特定州学习的学生总数。

下面是使用首选版本的query方法的方法：

```java
public Integer getCountOfStudentsInAGradeFromAState(String grade, String state) {
  String sql = "select student_id, student_name, age, gender, grade, state from student where grade = ? and state = ?";

  RowCountCallbackHandler countCallbackHandler = new RowCountCallbackHandler();
  jdbcTemplate.query(sql, countCallbackHandler, grade, state);
  return countCallbackHandler.getRowCount();
}
```
让我们看看这些方法如何被调用：

```java
@Test
public void givenDeprecatedMethodQuery_whenArgsGradeAndState_thenReturnCount() {
  Integer count = studentDaoWithDeprecatedJdbcTemplateMethods.getCountOfStudentsInAGradeFromAState("1", "New York");
  logger.info("Total students of grade 1 from New York:" + count);
  assertEquals(6, count);
}

@Test
public void givenPreferredMethodQuery_whenArgsGradeAndState_thenReturnCount() {
  Integer count = studentDaoWithPreferredJdbcTemplateMethods.getCountOfStudentsInAGradeFromAState("1", "New York");
  logger.info("Total students of grade 1 from New York:" + count);
  assertEquals(6, count);
}
```

正如下面所示，它们产生了相同的结果：

```
Total students of grade 1 from New York: 6
```

### 4.1. 使用RowMapper的queryForObject()方法

与query()方法不同，queryForObject()旨在处理数据库查询结果中的单行。让我们首先检查以下使用已弃用的queryForObject()版本的方法：

```java
public Student getStudentOfStudentIDAndGrade(Integer studentID, Integer grade) {
  String sql = "select student_id, student_name, age, gender, grade from student where student_id = ? and grade = ?";
  Object[] args = {studentID, grade};

  return jdbcTemplate.queryForObject(sql, args, new StudentRowMapper());
}
```
上述方法返回具有特定学生ID和年级的学生。但就像已弃用的query()方法一样，它也需要为查询参数声明一个Object[]类型的变量。

由于上述方法促进了样板代码，让我们看看一种更干净的方法：

```java
public Student getStudentOfStudentIDAndGrade(Integer studentID, Integer grade) {
  String sql = "select student_id, student_name, age, gender, grade from student where student_id = ? and grade = ?";

  return jdbcTemplate.queryForObject(sql, new StudentRowMapper(), studentID, grade);
}
```
然而，在这里，没有必要声明一个Object[]类型的变量。queryForObject()的Varargs变体直接将studentID和grade参数作为最后参数。

现在，让我们看看这些方法是如何使用的：

```java
@Test
public void givenDeprecatedMethodQueryForObject_whenArgsStudentIDAndGrade_thenReturnStudent() {
  Student student = studentDaoWithDeprecatedJdbcTemplateMethods.getStudentOfStudentIDAndGrade(4, 1);
  assertEquals(1, student.getGrade());
  assertEquals(4, student.getStudentId());
  logger.info("Student ID: " + student.getStudentId()
    + " Student Name: " + student.getStudentName() + " Student grade: " + student.getGrade());
}

@Test
public void givenPreferredMethodQueryForObject_whenArgsStudentIDAndGrade_thenReturnStudent() {
  Student student = studentDaoWithPreferredJdbcTemplateMethods.getStudentOfStudentIDAndGrade(4, 1);
  assertEquals(1, student.getGrade());
  assertEquals(4, student.getStudentId());
  logger.info("Student ID: " + student.getStudentId()
    + " Student Name: " + student.getStudentName() + " Student grade: " + student.getGrade());
}
```

正如预期的那样，两种方法给出了相同的输出：

```
Student ID: 4 Student Name: Sophia Martinez Student grade: 1
```

### 4.2. 使用Class```<T>```的queryForObject()

让我们首先看看使用已弃用的方法queryForObject(String sql, Object[] args, Class```<T>``` requiredType)的示例：

```java
public Integer getCountOfGenderInAGrade(String gender, Integer grade) {
  String sql = "select count(1) as total from student where gender = ? and grade = ?";
  Object[] args = {gender, grade};

  return jdbcTemplate.queryForObject(sql, args, Integer.class);
}
```
上述方法返回在给定年级中特定性别的学生总数。

让我们看看使用首选方法queryForObject(String sql, Class```<T>``` requiredType, Object... args)的方法：

```java
public Integer getCountOfGenderInAGrade(String gender, Integer grade) {
  String sql = "select count(1) as total from student where gender = ? and grade = ?";

  return jdbcTemplate.queryForObject(sql, Integer.class, gender, grade);
}
```
像往常一样，在上述方法中，我们能够摆脱Object[]类型的args变量。

现在，让我们通过以下方法展示getCountOfGenderInAGrade()的实际应用：

```java
@Test
public void givenPreferredMethodQueryForObject_whenArgsGenderAndGrade_thenReturnCount() {
  Integer count = studentDaoWithPreferredJdbcTemplateMethods.getCountOfGenderInAGrade("Female", 2);
  assertEquals(6, count);
  logger.info("Total number of Female Students: " + count);
}

@Test
public void givenDeprecatedMethodQueryForObject_whenArgsGenderAndGrade_thenReturnCount() {
  Integer count = studentDaoWithPreferredJdbcTemplateMethods.getCountOfGenderInAGrade("Female", 2);
  assertEquals(6, count);
  logger.info("Total number of Female Students: " + count);
}
```

最后，如下所示，替换方法成功地获得了类似的结果：

```
Total number of Female Students: 6
```

## 5. 结论

在这个教程中，我们探讨了JdbcTemplate类中query()和queryForObject()方法的已弃用变体的首选替代品。通过示例，我们解释了使用Varargs作为参数的新方法。我们还看到了它如何帮助消除将参数放入对象数组的样板代码。

像往常一样，示例可以在GitHub上找到。

OK