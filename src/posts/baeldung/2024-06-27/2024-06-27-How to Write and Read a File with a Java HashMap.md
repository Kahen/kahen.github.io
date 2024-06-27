---
date: 2024-06-28
category:
  - Java
  - 编程
tag:
  - HashMap
  - 文件读写
head:
  - - meta
    - name: keywords
      content: Java, HashMap, 文件读写, 序列化, JSON, Properties
---

# 如何使用Java HashMap读写文件

## 1. 概述

在开发软件时，经常需要将内存中的对象写入文件，并反之，将文件内容读入对象。对于基本类型和`String`值来说这很简单，但处理数据结构和对象时就变得复杂了。

Java中一个常见的数据结构是`HashMap`。在本教程中，我们将介绍三种使用`HashMap`数据读写文件的方法：**Java `Properties`类，Java对象序列化，以及使用第三方库进行JSON序列化。**

## 2. 使用Java `Properties`类

一个常见的应用是属性文件，它包含代表应用程序配置的键值对`String`。Java `Properties`类非常适合处理基于`String`的`HashMap`。例如，让我们创建一个学生数据的映射：

```
Map``<String, String>`` studentData = new HashMap<>();
studentData.put("student.firstName", "Henry");
studentData.put("student.lastName", "Winter");
```

`Properties`类实现了`Map``<Object, Object>```，所以很容易从`HashMap`中读取所有值：

```
Properties props = new Properties();
props.putAll(studentData);
```

我们可以创建一个临时文件，并使用`store`方法将`Properties`对象写入文件：

```
File file = File.createTempFile("student", ".data");
try (OutputStream output = Files.newOutputStream(file.toPath())) {
    props.store(output, null);
}
```

这个方法需要一个`OutputStream`（或`Writer`）和一个可选的`String`来向文件添加注释。在这里，我们可以传入`null`。如果我们查看我们创建的文件，我们可以看到我们的学生数据：

```
student.firstName: Henry
student.lastName: Winter
```

要将文件内容读回一个`Properties`对象，我们可以使用`load`方法：

```
Properties propsFromFile = new Properties();
try (InputStream input = Files.newInputStream(file.toPath())) {
    propsFromFile.load(input);
}
```

由于`Properties`实现了`Map``<Object, Object>```（但只包含`String`键和值），我们可以通过流式`stringPropertyNames`并将结果收集回一个映射来获取我们原始的映射：

```
HashMap``<String, String>`` studentDataFromProps = propsFromFile.stringPropertyNames()
  .stream()
  .collect(Collectors.toMap(key -> key, props::getProperty));
assertThat(studentDataFromProps).isEqualTo(studentData);
```

使用`Properties`很简单，但前提是我们处理的是一个具有`String`键和值的`HashMap`。对于其他映射，我们需要使用另一种策略。

## 3. 使用对象序列化

Java提供了`Serializable`，这是一个接口，用于将对象转换为字节流并从字节流转换回对象。让我们定义一个包含学生数据的自定义类`Student`。我们将让它实现`Serializable`（并根据文档推荐设置一个`serialVersionUID`）：

```
public class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String firstName;
    private String lastName;

    // 标准的getter, setter, equals和hashCode方法
}
```

接下来，我们将创建一个学生ID到`Student`实例的映射：

```
Map```````<Integer, Student>``````` studentData = new HashMap<>();
studentData.put(1234, new Student("Henry", "Winter"));
studentData.put(5678, new Student("Richard", "Papen"));
```

然后，我们可以使用`ObjectOutputStream`将`HashMap`写入文件：

```
File file = File.createTempFile("student", ".data");
try (FileOutputStream fileOutput = new FileOutputStream(file);
  ObjectOutputStream objectStream = new ObjectOutputStream(fileOutput)) {
    objectStream.writeObject(studentData);
}
```

这个文件将包含二进制数据，不是人类可读的。为了验证我们的文件是否正确，我们可以使用`ObjectInputStream`将其读回一个`HashMap`：

```
Map```````<Integer, Student>``````` studentsFromFile;
try (FileInputStream fileReader = new FileInputStream(file);
  ObjectInputStream objectStream = new ObjectInputStream(fileReader)) {
    studentsFromFile = (HashMap```````<Integer, Student>```````) objectStream.readObject();
}
assertThat(studentsFromFile).isEqualTo(studentData);
```

注意，我们需要将`readObject`的结果转换回`HashMap```````<Integer, Student>````````。我们在这里忽略了未经检查的转换警告，因为文件将只包含我们的`HashMap`，但类型安全性应该被考虑用于操作代码。

`Serializable`提供了一种相对简单的方法来序列化和反序列化文件中的`HashMap`，但并不总是能够以这种方式序列化一个类——特别是如果我们处理的是一个我们无法修改的类。幸运的是，还有一个选择。

## 4. 使用JSON库

JSON是指定数据键值对的广泛使用的格式。Java有几个开源库可用于处理JSON。JSON的一个优点是它是人类可读的——我们上面学生数据的JSON表示看起来像这样：

```
{
    1234: {
        "firstName": "Henry",
        "lastName": "Winter"
    },
    5678: {
        "firstName": "Richard",
        "lastName": "Papen"
    }
}
```

这里，我们将使用两个最著名的库，Jackson和Gson，将我们的`HashMap`转换为JSON文件。

### 4.1. Jackson

Jackson是Java中JSON序列化的常见选择。我们只覆盖序列化我们简单数据结构所必需的基础知识——更多信息，请参见我们的Jackson教程。

使用上面的相同映射的学生数据，我们可以创建一个Jackson`ObjectMapper`并使用它将我们的`HashMap`作为JSON写入文件：

```
ObjectMapper mapper = new ObjectMapper();
File file = File.createTempFile("student", ".data");
try (FileOutputStream fileOutput = new FileOutputStream(file)) {
    mapper.writeValue(fileOutput, studentData);
}
```

类似地，我们可以使用`ObjectMapper`将文件读回一个新的`HashMap`实例：

```
Map```````<Integer, Student>``````` mapFromFile;
try (FileInputStream fileInput = new FileInputStream(file)) {
    TypeReference<HashMap```````<Integer, Student>```````> mapType
      = new TypeReference<HashMap```````<Integer, Student>```````>() {};
    mapFromFile = mapper.readValue(fileInput, mapType);
}
assertThat(mapFromFile).isEqualTo(studentData);
```

因为`HashMap`是一个参数化类型，我们必须创建一个`TypeReference`，以便Jackson知道如何将JSON文件反序列化为`HashMap```````<Integer, Student>````````。

在序列化过程中，不需要对`Student`类进行特殊接口或类修改——我们甚至可以放弃使用`Serializable`接口。然而，同样重要的是要注意，在反序列化期间，Jackson要求类具有默认的无参数构造函数。尽管许多类提供了一个，但这个要求如果类不能更改可能是一个问题。

### 4.2. Gson

Gson是JSON序列化的另一个常见选择。

我们将再次使用我上面的映射，并定义一个`Gson`实例将其序列化为JSON文件：

```
Gson gson = new Gson();
File file = File.createTempFile("student", ".data");
try (FileWriter writer = new FileWriter(file)) {
    gson.toJson(studentData, writer);
}
```

将文件读回一个`HashMap`实例很简单：

```
Map```````<Integer, Student>``````` studentsFromFile;
try (FileReader reader = new FileReader(file)) {
    Type mapType = new TypeToken<HashMap```````<Integer, Student>```````>() {}.getType();
    studentsFromFile = gson.fromJson(reader, mapType);
}
assertThat(studentsFromFile).isEqualTo(studentData);
```

与Jackson类似，Gson需要类型信息来反序列化参数化的`HashMap`——这是通过使用Gson的`TypeToken`提供的Java反射API`Type`。

Gson具有相同的默认构造函数要求，但提供了`InstanceCreator`接口来协助在未提供的情况下。

## 5. 总结

在本教程中，我们讨论了三种使用`HashMap`数据读写文件的方法。

对于简单的`String`映射，Java `Properties`为我们提供了一个简单的解决方案。对象序列化是Java的另一个核心特性，它为我们提供了更多的灵活性，用于我们可以修改的类。对于我们无法编辑的类（或者如果我们需要一个人类可读的格式），像Jackson和Gson这样的开源库为JSON序列化提供了有用的工具。

如往常一样，所有代码都可以在GitHub上找到。

OK