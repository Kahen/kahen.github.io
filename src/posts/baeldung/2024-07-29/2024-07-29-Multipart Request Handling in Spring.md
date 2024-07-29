---
date: 2024-07-30
category:
  - Spring Boot
  - Multipart Request
tag:
  - Spring
  - Multipart
head:
  - - meta
    - name: keywords
      content: Spring Boot, Multipart Request Handling
---

# Spring Boot中处理多部分请求

在本教程中，我们将重点介绍在Spring Boot中发送多部分请求的各种机制。多部分请求包括将许多不同类型的数据作为单一HTTP方法调用的一部分，通过边界分隔发送。通常，我们可以发送复杂的JSON、XML或CSV数据，以及在此请求中传输多部分文件。多部分文件的例子包括音频或图像文件。此外，我们还可以将简单的键/值对数据与多部分文件一起作为多部分请求发送。

现在让我们看看我们可以发送这些数据的各种方式。

## 2. 使用 @ModelAttribute

让我们考虑一个简单的用例，使用表单发送员工的数据，包括姓名和文件。

首先，我们将创建一个Employee抽象来存储表单数据：

```
public class Employee {
    private String name;
    private MultipartFile document;
}
```

然后我们将使用Thymeleaf生成表单：

```
`<form action="#" th:action="@{/employee}" th:object="${employee}" method="post" enctype="multipart/form-data">`
    ``<p>``name: `<input type="text" th:field="*{name}" />```</p>``
    ``<p>``document:`<input type="file" th:field="*{document}" multiple="multiple"/>```</p>``
    `<input type="submit" value="upload" />`
    `<input type="reset" value="Reset" />`
`</form>`
```

在视图中需要特别注意的是，我们将enctype声明为multipart/form-data。

最后，我们将创建一个方法来接受表单数据，包括多部分文件：

```
@PostMapping(path = "/employee", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
public String saveEmployee(@ModelAttribute Employee employee) {
    employeeService.save(employee);
    return "employee/success";
}
```

这里两个特别重要的细节是：

- consumes属性值设置为multipart/form-data
- @ModelAttribute已将所有表单数据捕获到Employee POJO中，包括上传的文件

## 3. 使用 @RequestPart

这个注解将多部分请求的一部分与方法参数关联起来，这在发送复杂多属性数据作为有效载荷时非常有用，例如JSON或XML。

让我们创建一个有两个参数的方法，第一个是Employee类型，第二个是MultipartFile。此外，我们将这两个参数都注解为@RequestPart：

```
@PostMapping(path = "/requestpart/employee", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
public ResponseEntity``<Object>`` saveEmployee(@RequestPart Employee employee, @RequestPart MultipartFile document) {
    employee.setDocument(document);
    employeeService.save(employee);
    return ResponseEntity.ok().build();
}
```

现在，为了看到这个注解在行动中，我们将使用MockMultipartFile创建测试：

```
@Test
public void givenEmployeeJsonAndMultipartFile_whenPostWithRequestPart_thenReturnsOK() throws Exception {
    MockMultipartFile employeeJson = new MockMultipartFile("employee", null,
      "application/json", "{\"name\": \"Emp Name\"}".getBytes());

    mockMvc.perform(multipart("/requestpart/employee")
      .file(A_FILE)
      .file(employeeJson))
      .andExpect(status().isOk());
}
```

上述需要注意的重要事项是，我们将Employee部分的内容类型设置为application/JSON。我们还发送了这个数据作为一个JSON文件，以及多部分文件。

有关如何测试多部分请求的更多细节可以在这里找到。

## 4. 使用 @RequestParam

发送多部分数据的另一种方式是使用@RequestParam。这特别适用于作为文件一起发送的简单数据，这些数据作为键/值对发送：

```
@RequestMapping(path = "/requestparam/employee", method = POST, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
public ResponseEntity``<Object>`` saveEmployee(@RequestParam String name, @RequestPart MultipartFile document) {
    Employee employee = new Employee(name, document);
    employeeService.save(employee);
    return ResponseEntity.ok().build();
}
```

让我们为这个方法编写测试以演示：

```
@Test
public void givenRequestPartAndRequestParam_whenPost_thenReturns200OK() throws Exception {
    mockMvc.perform(multipart("/requestparam/employee")
      .file(A_FILE)
      .param("name", "testname"))
      .andExpect(status().isOk());
}
```

## 5. 结论

在本文中，我们学习了如何在Spring Boot中有效地处理多部分请求。

最初，我们使用模型属性发送了多部分表单数据。然后我们看了如何使用@RequestPart和@RequestParam注解分别接收多部分数据。

一如既往，完整的源代码可以在GitHub上找到。