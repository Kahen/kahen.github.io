---
date: 2024-06-14
category:
  - Spring Data JPA
  - ConverterNotFoundException
tag:
  - Spring Data JPA
  - JPA
  - DTO
  - Converter
---
# 解决Spring Data JPA转换器未找到异常：没有找到转换器 | Baeldung

## 1. 概述

在使用Spring Data JPA时，我们经常利用派生和自定义查询以我们偏好的格式返回结果。一个典型的例子是DTO投影，它提供了一种很好的方式仅选择某些特定列，减少选择不必要数据的开销。

然而，DTO投影并不总是容易实现，如果实现不当可能会导致_ConverterNotFoundException_。因此，在本简短教程中，我们将阐明如何在使用Spring Data JPA时避免_ConverterNotFoundException_异常。

## 2. 实践中的异常理解

在跳转到解决方案之前，让我们通过一个实际例子来理解异常及其堆栈跟踪的含义。

为了简化事情，我们将使用H2数据库。首先，让我们在_pom.xml_文件中添加它的依赖：

```
\<dependency\>
    \<groupId\>com.h2database\</groupId\>
    \<artifactId\>h2\</artifactId\>
    \<version\>2.2.224\</version\>
\</dependency\>
```

### 2.1. H2配置

Spring Boot为H2嵌入式数据库提供了内在支持。**按照设计，它配置应用程序使用用户名_sa_和空密码连接到H2**。

首先，让我们在_application.properties_文件中添加数据库连接凭据：

```
spring.datasource.url=jdbc:h2:mem:mydb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
```

这就是我们需要设置的H2配置与Spring Boot。

### 2.2. 实体类

现在，让我们定义一个JPA实体。例如，我们考虑_Employee_类：

```
@Entity
public class Employee {

    @Id
    private int id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private double salary;

    // 标准的getter和setter
}
```

在这个例子中，我们通过标识符、名字、姓氏和薪水来定义一个员工。

通常，我们使用_@Entity_注解来表示_Employee_类是一个JPA实体。此外，_@Id_标记表示主键的字段。此外，我们使用_@Column_将每个实体字段绑定到其相应的表列。

### 2.3. JPA存储库

接下来，我们将创建一个Spring Data JPA存储库来处理存储和检索员工的逻辑：

```
@Repository
public interface EmployeeRepository extends JpaRepository\<Employee, Integer\> {
}
```

这里，我们将假设我们需要显示员工的全名。因此，我们将依赖DTO投影来仅选择_firstName_和_lastName_。

由于_Employee_类包含额外的数据，让我们创建一个名为_EmployeeFullName_的新类，其中仅包含名字和姓氏：

```
public class EmployeeFullName {

    private String firstName;
    private String lastName;

    // 标准的getter和setter

    public String fullName() {
        return getFirstName()
              .concat(" ")
              .concat(getLastName());
    }

}
```

**值得注意的是，我们创建了一个自定义方法_fullName()_来显示员工的全名**。现在，让我们向_EmployeeRepository_添加一个派生查询，以返回员工的全名：

```
EmployeeFullName findEmployeeFullNameById(int id);
```

最后，让我们创建一个测试以确保一切按预期工作：

```
@Test
void givenEmployee_whenGettingFullName_thenThrowException() {
    Employee emp = new Employee();
    emp.setId(1);
    emp.setFirstName("Adrien");
    emp.setLastName("Juguet");
    emp.setSalary(4000);

    employeeRepository.save(emp);

    assertThatThrownBy(() -\> employeeRepository
      .findEmployeeFullNameById(1))
      .isInstanceOfAny(ConverterNotFoundException.class)
      .hasMessageContaining("No converter found capable of converting from type"
        + "[com.baeldung.spring.data.noconverterfound.models.Employee");
}
```

如上所示，测试因_ConverterNotFoundException_失败。

异常的根本原因是_JpaRepository_期望其派生查询返回_Employee_实体类的实例。**由于方法返回一个_EmployeeFullName_对象，Spring Data JPA无法找到合适的转换器将预期的_Employee_对象转换为新的_EmployeeFullName_对象**。

## 3. 解决方案

当使用类来实现DTO投影时，Spring Data JPA默认使用构造函数来确定应该检索的字段。**因此，这里的基本解决方案是向_EmployeeFullName_类添加一个参数化构造函数**：

```
public EmployeeFullName(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
```

这样，我们告诉Spring Data JPA仅选择_firstName_和_lastName_。现在，让我们添加另一个测试来测试解决方案：

```
@Test
void givenEmployee_whenGettingFullNameUsingClass_thenReturnFullName() {
    Employee emp = new Employee();
    emp.setId(2);
    emp.setFirstName("Azhrioun");
    emp.setLastName("Abderrahim");
    emp.setSalary(3500);

    employeeRepository.save(emp);

    assertThat(employeeRepository.findEmployeeFullNameById(2).fullName())
      .isEqualTo("Azhrioun Abderrahim");
}
```

不出所料，测试成功通过。

**另一种解决方案是使用基于接口的投影**。这样，我们就不必担心构造函数。**因此，我们可以使用一个接口而不是一个类，该接口公开了要读取的字段的getter**：

```
public interface IEmployeeFullName {
    String getFirstName();

    String getLastName();

    default String fullName() {
        return getFirstName().concat(" ")
          .concat(getLastName());
    }
}
```

这里，我们使用了一个默认方法来显示全名。接下来，让我们创建另一个派生查询，返回类型为_IEmployeeFullName_的实例：

```
IEmployeeFullName findIEmployeeFullNameById(int id);
```

最后，让我们添加另一个测试来验证这第二个解决方案：

```
@Test
void givenEmployee_whenGettingFullNameUsingInterface_thenReturnFullName() {
    Employee emp = new Employee();
    emp.setId(3);
    emp.setFirstName("Eva");
    emp.setLastName("Smith");
    emp.setSalary(6500);

    employeeRepository.save(emp);

    assertThat(employeeRepository.findIEmployeeFullNameById(3).fullName())
      .isEqualTo("Eva Smith");
}
```

正如预期的那样，基于接口的解决方案奏效。

## 4. 结论

在本文中，我们学习了什么导致Spring Data JPA出现_ConverterNotFoundException_。在此过程中，我们看到了如何在实践中重现和修复异常。

如常，示例的完整源代码可在GitHub上找到。
