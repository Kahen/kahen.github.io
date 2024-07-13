---
date: 2022-10-01
category:
  - Java
  - Postman
tag:
  - x-www-form-urlencoded
  - Array
head:
  - - meta
    - name: keywords
      content: Postman, x-www-form-urlencoded, Array, Java
---
# 使用Postman发送x-www-form-urlencoded格式的数组

在这个教程中，我们将探讨使用Postman发送x-www-form-urlencoded格式数组的方法。

W3C委员会定义了多种我们可以用于通过网络层发送数据的格式。这些格式包括form-data、raw和x-www-form-urlencoded数据。我们默认使用后者格式发送数据。

列出的格式描述了作为HTTP消息体的一个块发送的表单数据。它发送了一个编码的表单数据集以提交给服务器。编码数据具有键值对的格式。服务器必须支持内容类型。

使用此内容类型提交的表单匹配以下编码模式：

- 控件名称和值被转义。
- '，'符号将多个值分隔开。
- '+'符号将所有空格字符替换。
- 保留字符应遵循RFC 1738符号。
- 所有非字母数字字符使用百分号编码。
- 键与值用等号（'='）分隔，键值对用和号（'&'）分隔。

此外，数据的长度未指定。但是，使用x-www-form-urlencoded数据类型有数据限制。因此，媒体服务器将拒绝超过配置中指定大小的请求。

此外，当发送二进制数据或包含非字母数字字符的值时，它变得效率低下。**包含非字母数字字符的键和值将进行百分号编码（也称为URL编码），因此这种类型不适合二进制数据。** 因此，我们应该考虑使用form-data内容类型。

此外，我们不能使用它来编码文件。它只能对URL参数或请求体中的数据进行编码。

### 3. 发送数组

要在Postman中使用x-www-form-urlencoded类型，我们需要在请求的body标签中选择具有相同名称的单选按钮。

正如已经提到的，请求由键值对组成。Postman将在发送数据到服务器之前对数据进行编码。此外，它将对键和值都进行编码。

现在，让我们看看如何在Postman中发送数组。

#### 3.1 发送简单数组对象

我们将首先展示如何发送一个包含简单对象类型的简单数组对象，例如String元素。

首先，让我们创建一个StudentSimple类，它将具有一个数组作为实例变量：

```
class StudentSimple {
   private String firstName;
   private String lastName;
   private String[] courses;

   // getters and setters
}
```

其次，我们将定义一个控制器类，该类将公开REST端点：

```
@PostMapping(
  path = "/simple",
  consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
public ResponseEntity`<StudentSimple>` createStudentSimple(StudentSimple student) {
    return ResponseEntity.ok(student);
}
```

**当我们使用consume属性时，我们需要将x-www-form-urlencoded定义为控制器将从客户端接受的媒体类型。** 否则，我们将得到415 Unsupported Media Type错误。此外，我们需要省略@RequestBody注释，因为该注释不支持x-www-form-urlencoded内容类型。

最后，让我们在Postman中创建一个请求。最简单的方法是使用逗号符号（'，'）分隔值：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman-1.png)

然而，如果值本身包含逗号符号，这种方法可能会引起问题。我们可以通过单独设置每个值来解决问题。要将元素设置到courses数组，我们需要使用相同的键提供键值对：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman.png)

数组中元素的顺序将遵循请求中提供的顺序。

**此外，方括号是可选的。** 另一方面，如果我们想要在数组的特定索引中添加一个元素，我们可以通过在方括号中指定索引来实现：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman-index.png)

我们可以使用cURL请求测试我们的应用程序：

```
curl -X POST \
  http://localhost:8080/students/simple \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'firstName=Jane&lastName=Doe&
        courses[2]=Programming+in+Java&
        courses[1]=Data+Structures&
        courses[0]=Linux+Basics'
```

#### 3.2 发送复杂数组对象

现在，让我们看看如何发送包含复杂对象的数组。

首先，让我们定义Course类，它将表示一个单独的课程：

```
class Course {
    private String name;
    private int hours;

    // getters and setters
}
```

接下来，我们将创建一个代表学生的类：

```
class StudentComplex {
    private String firstName;
    private String lastName;
    private Course[] courses;

    // getters and setters
}
```

让我们在控制器类中添加一个新的端点：

```
@PostMapping(
  path = "/complex",
  consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
public ResponseEntity`<StudentComplex>` createStudentComplex(StudentComplex student) {
    return ResponseEntity.ok(student);
}
```

最后，让我们在Postman中创建一个请求。和上一个例子一样，要向数组添加元素，我们需要使用相同的键提供键值对：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/complex-array-postman.png)

**在这里，带有索引的方括号是必需的。** 要为每个实例变量设置值，我们需要使用点（'.'）运算符，后跟变量的名称。

同样，我们可以使用cURL请求测试端点：

```
curl -X POST \
  http://localhost:8080/students/complex \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'firstName=Jane&lastName=Doe&
        courses[0].name=Programming+in+Java&
        courses[0].hours=40&
        courses[1].name=Data+Structures&
        courses[1].hours=35'
```

## 4. 结论

在本文中，我们学习了如何在服务器端适当设置_Content-Type_以避免_Unsupported Media Type_错误。我们还解释了如何在Postman中使用x-www-form-urlencoded内容类型发送简单和复杂的数组。

如常，所有的代码片段都可以在GitHub上找到。