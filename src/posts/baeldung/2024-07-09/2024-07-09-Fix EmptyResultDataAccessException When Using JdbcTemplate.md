---
date: 2022-04-01
category:
  - Spring
  - JDBC
tag:
  - JdbcTemplate
  - EmptyResultDataAccessException
head:
  - - meta
    - name: keywords
      content: Spring, JdbcTemplate, EmptyResultDataAccessException, 异常处理
------
# 使用JdbcTemplate时解决EmptyResultDataAccessException异常

在本简短教程中，我们将探讨Spring的_JdbcTemplate_抛出的“_EmptyResultDataAccessException: 预期结果大小错误：期望1，实际0_”异常。

首先，我们将详细讨论这种异常的根本原因。然后，我们将通过一个实际例子来演示如何复现它，并最终学习如何解决它。

## 2. 原因

Spring的_JdbcTemplate_类提供了执行SQL查询和检索结果的便捷方式。它在底层使用JDBC API。

通常，当预期结果至少应该有一行，但实际上返回了零行时，**_JdbcTemplate_会抛出_EmptyResultDataAccessException_**。

现在我们知道了异常的含义，让我们通过一个实际例子来看看如何复现它并解决它。

## 3. 复现异常

例如，考虑_Employee_类：

```java
public class Employee {
    private int id;
    private String firstName;
    private String lastName;

    public Employee(int id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // 标准getter和setter
}
```

接下来，让我们创建一个使用_JdbcTemplate_处理SQL查询的数据访问对象（DAO）类：

```java
public class EmployeeDAO {
    private JdbcTemplate jdbcTemplate;

    public void setDataSource(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }
}
```

值得注意的是，由于_JdbcTemplate_需要一个_DataSource_对象，我们通过setter方法注入它。

现在，我们将添加一个通过_id_检索_Employee_对象的方法。为此，让我们使用_JdbcTemplate_类提供的_queryForObject()_方法：

```java
public Employee getEmployeeById(int id) {
    RowMapper``<Employee>`` employeeRowMapper = (rs, rowNum) -> new Employee(rs.getInt("ID"), rs.getString("FIRST_NAME"), rs.getString("LAST_NAME"));

    return jdbcTemplate.queryForObject("SELECT * FROM EMPLOYEE WHERE id=?", employeeRowMapper, id);
}
```

如我们所见，**第一个参数表示SQL查询。第二个参数表示用于将_ResultSet_映射到_Employee_对象的_RowMapper_**。

事实上，_queryForObject()_期望正好返回一行。因此，如果我们传递一个不存在的_id_，它就会抛出_EmptyResultDataAccessException_。

让我们通过一个测试来确认这一点：

```java
@Test(expected = EmptyResultDataAccessException.class)
public void whenIdNotExist_thenThrowEmptyResultDataAccessException() {
    EmployeeDAO employeeDAO = new EmployeeDAO();
    ReflectionTestUtils.setField(employeeDAO, "jdbcTemplate", jdbcTemplate);
    Mockito.when(jdbcTemplate.queryForObject(anyString(), ArgumentMatchers.<RowMapper``<Employee>``>any(), anyInt()))
        .thenThrow(EmptyResultDataAccessException.class);

    employeeDAO.getEmployeeById(1);
}
```

**由于没有给定_id_的员工，指定的查询返回了零行。因此，_JdbcTemplate_以_EmptyResultDataAccessException_失败**。

## 4. 修复异常

最简单的解决方案是捕获异常，然后返回_null_：

```java
public Employee getEmployeeByIdV2(int id) {
    RowMapper``<Employee>`` employeeRowMapper = (rs, rowNum) -> new Employee(rs.getInt("ID"), rs.getString("FIRST_NAME"), rs.getString("LAST_NAME"));

    try {
        return jdbcTemplate.queryForObject("SELECT * FROM EMPLOYEE WHERE id=?", employeeRowMapper, id);
    } catch (EmptyResultDataAccessException e) {
        return null;
    }
}
```

**这样，当SQL查询的结果为空时，我们确保返回_null_**。

现在，让我们添加另一个测试用例来确认一切按预期工作：

```java
@Test
public void whenIdNotExist_thenReturnNull() {
    EmployeeDAO employeeDAO = new EmployeeDAO();
    ReflectionTestUtils.setField(employeeDAO, "jdbcTemplate", jdbcTemplate);
    Mockito.when(jdbcTemplate.queryForObject(anyString(), ArgumentMatchers.<RowMapper``<Employee>``>any(), anyInt()))
        .thenReturn(null);

    assertNull(employeeDAO.getEmployeeByIdV2(1));
}
```

## 5. 结论

在本简短教程中，我们详细讨论了什么导致_JdbcTemplate_抛出异常“_EmptyResultDataAccessException: Incorrect result size: expected 1, actual 0_”。

在此过程中，我们看到了如何产生异常以及如何通过实际例子来解决它。

如常，示例的完整源代码可在GitHub上找到。