---
date: 2024-07-24
category:
  - Java
  - Lombok
tag:
  - Lombok
  - val
  - var
head:
  - - meta
    - name: keywords
      content: Java, Lombok, val, var
------
# Lombok中声明val和var变量

## 1. 引言

项目Lombok帮助我们减少Java源代码中重复任务的冗余。在本教程中，我们将解释如何通过在Lombok中声明本地_val_和_var_变量来推断类型。

**Lombok提供了智能功能，以避免样板代码**。例如，它隐藏了领域模型对象的getter和setter。Builder注解是另一个有趣的功能，它帮助正确实现Builder模式。

在以下部分中，我们将专注于**Lombok定义不指定类型的局部变量的功能**。我们将使用Lombok _val_和_var_类型来声明变量，并避免在源代码中添加额外的行。

_val_是在版本0.10中引入的。使用_val_时，Lombok将变量声明为_final_，并在初始化后自动推断类型。因此，初始化表达式是必需的。

_var_是在版本1.16.20中引入的。与_val_一样，它也从初始化表达式中推断类型，但有一个很大的不同，即变量不声明为_final_。因此，允许进一步赋值，但它们应符合声明时指定的类型。

## 3. 在Lombok中实现_val_和_var_示例

### 3.1. 依赖项

为了实现示例，我们将简单地将Lombok依赖项添加到我们的_pom.xml_中：

```xml
`<dependency>`
    `<groupId>`org.projectlombok`</groupId>`
    `<artifactId>`lombok`</artifactId>`
    `<version>`1.18.30`</version>`
    `<scope>`provided`</scope>`
`</dependency>`
```

我们可以在这里检查最新可用的版本。

### 3.2. _val_变量声明

首先，我们将从Lombok导入_val_类型：

```java
import lombok.val;
```

其次，我们将使用_val_声明不同的局部变量。例如，我们可以从简单的_String_开始：

```java
public Class name() {
    val name = "name";
    System.out.println("Name: " + name);
    return name.getClass();
}
```

Lombok自动生成以下普通Java代码：

```java
final java.lang.String name = "name";
```

然后，让我们创建一个_Integer_：

```java
public Class age() {
    val age = Integer.valueOf(30);
    System.out.println("Age: " + age);
    return age.getClass();
}
```

正如我们所看到的，Lombok生成了正确的类型：

```java
final java.lang.Integer age = Integer.valueOf(30);
```

我们也可以声明一个_List_：

```java
public Class listOf() {
    val agenda = new ArrayList``````````<String>``````````();
    agenda.add("Day 1");
    System.out.println("Agenda: " + agenda);
    return agenda.getClass();
}
```

Lombok不仅推断出_List_，还推断出其中包含的类型：

```java
final java.util.ArrayList```<java.lang.String>``` agenda = new ArrayList``````````<String>``````````();
```

现在，让我们创建一个_Map_：

```java
public Class mapOf() {
    val books = new HashMap`````<Integer, String>`````();
    books.put(1, "Book 1");
    books.put(2, "Book 2");
    System.out.println("Books:");
    for (val entry : books.entrySet()) {
        System.out.printf("- %d. %s\n", entry.getKey(), entry.getValue());
    }
    return books.getClass();
}
```

再次，正确的类型被推断出来：

```java
final java.util.HashMap``<java.lang.Integer, java.lang.String>`` books = new HashMap`````<Integer, String>`````();
// ...
for (final java.util.Map.Entry``<java.lang.Integer, java.lang.String>`` entry : books.entrySet()) {
   // ...
}
```

**我们可以看到Lombok将正确的类型声明为_final_**。因此，如果我们尝试修改名称，构建将因_val_的最终性质而失败：

```java
name = "newName";

[12,9] cannot assign a value to final variable name
```

接下来，我们将运行一些测试以验证Lombok生成了正确的类型：

```java
ValExample val = new ValExample();
assertThat(val.name()).isEqualTo(String.class);
assertThat(val.age()).isEqualTo(Integer.class);
assertThat(val.listOf()).isEqualTo(ArrayList.class);
assertThat(val.mapOf()).isEqualTo(HashMap.class);
```

最后，我们可以看到控制台输出具有特定类型的对象：

```java
Name: name
Age: 30
Agenda: [Day 1]
Books:
- 1. Book 1
- 2. Book 2
```

### 3.3. _var_变量声明

_var_声明与_val_非常相似，特别是变量不是_final_：

```java
import lombok.var;

var name = "name";
name = "newName";

var age = Integer.valueOf(30);
age = 35;

var agenda = new ArrayList``````````<String>``````````();
agenda.add("Day 1");
agenda = new ArrayList``````````<String>``````````(Arrays.asList("Day 2"));

var books = new HashMap`````<Integer, String>`````();
books.put(1, "Book 1");
books.put(2, "Book 2");
books = new HashMap`````<Integer, String>`````();
books.put(3, "Book 3");
books.put(4, "Book 4");
```

让我们看看生成的普通Java代码：

```java
var name = "name";

var age = Integer.valueOf(30);

var agenda = new ArrayList``````````<String>``````````();

var books = new HashMap`````<Integer, String>`````();
```

这是因为Java 10支持_var_声明，使用初始化表达式推断局部变量的类型。然而，我们在使用它时需要考虑一些限制。

由于声明的变量不是_final_，我们可以进行进一步的赋值。然而，**对象必须符合从初始化表达式中推断出的适当类型**。

如果我们尝试分配一个不同的类型，我们将在编译期间得到一个错误：

```java
books = new ArrayList``````````<String>``````````();

[37,17] incompatible types: java.util.ArrayList```<java.lang.String>``` cannot be converted to java.util.HashMap`<java.lang.Integer,java.lang.String>`
```

让我们稍微更改测试并检查新的赋值：

```java
VarExample varExample = new VarExample();
assertThat(varExample.name()).isEqualTo("newName");
assertThat(varExample.age()).isEqualTo(35);
assertThat("Day 2").isIn(varExample.listOf());
assertThat(varExample.mapOf()).containsValue("Book 3");
```

最后，控制台输出也与前一节不同：

```java
Name: newName
Age: 35
Agenda: [Day 2]
Books:
- 3. Book 3
- 4. Book 4
```

## 4. 复合类型

有些情况下，我们需要使用复合类型作为初始化表达式：

```java
val compound = isArray ? new ArrayList``````````<String>``````````() : new HashSet``````````<String>``````````();
```

在上面的代码片段中，赋值取决于布尔值，并推断出最常见的超类。

Lombok将类型分配为_AbstractCollection_，正如普通代码所示：

```java
final java.util.AbstractCollection```<java.lang.String>``` compound = isArray ? new ArrayList``````````<String>``````````() : new HashSet``````````<String>``````````();
```

在有歧义的情况下，例如与_null_值一起，推断出的类是_Object_。

## 5. 配置键

Lombok允许在整个项目中通过一个文件配置功能。因此，可以将项目的指令和设置集中在一个地方。

有时，作为我们项目开发标准的强制执行的一部分，我们可能希望限制Lombok的_var_和_val_的使用。如果有人无意中使用了它们，我们可能希望在编译期间生成警告。

对于这些情况，**我们可以通过在_lombok.config_文件中包含以下内容，将任何_var_或_val_的使用标记为警告或错误**：

```properties
lombok.var.flagUsage = error
lombok.val.flagUsage = warning
```

我们将在整个项目中收到关于非法使用_var_的错误：

```java
[12,13] Use of var is flagged according to lombok configuration.
```

同样，我们将收到关于使用_val_的警告消息：

```java
ValExample.java:18: warning: Use of val is flagged according to lombok configuration.
val age = Integer.valueOf(30);
```

## 6. 结论

在本文中，我们展示了如何使用Lombok定义不指定类型的局部变量。此外，我们学习了声明_val_和_var_变量的复杂性。

我们还演示了如何使用复合类型进行局部变量的泛型声明。

一如既往，代码可以在GitHub上找到。