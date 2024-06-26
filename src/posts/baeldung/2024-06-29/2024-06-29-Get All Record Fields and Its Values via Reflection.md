---
date: 2022-04-01
category:
  - Java
  - Reflection
tag:
  - Java
  - Reflection
  - Record
head:
  - - meta
    - name: keywords
      content: Java Reflection, Record Fields, 获取字段值
---
# 通过反射获取记录类中所有字段及其值

记录（record）自Java 14起被引入，用于表示不可变数据。记录包含具有不同值的字段，有时我们需要以编程方式提取所有这些字段及其对应的值。

在本教程中，我们将探讨如何使用Java的反射API来检索记录类中的所有字段及其值。

## 2. 问题介绍

一个示例可以快速解释问题。假设我们有一个名为_Player_的记录：

```java
record Player(String name, int age, Long score) {}
```

如上所示，_Player_记录具有三种不同类型的字段：_String_、基本类型_int_和_Long_。我们还创建了一个_Player_实例：

```java
Player ERIC = new Player("Eric", 28, 4242L);
```

现在，我们将找到_Player_记录中声明的所有字段，并使用这个ERIC玩家实例，以编程方式提取它们的对应值。

为了简化，我们将利用单元测试断言来验证每种方法是否产生了预期的结果。

接下来，让我们深入探讨。

## 3. 使用_RecordComponent_

我们提到记录类是在Java 14中引入的。与记录一起，一个新的成员来到了_java.lang.reflect_包中：_RecordComponent_。它是Java 14和15中的预览特性。但在Java 16中，它“升级”为永久特性。**_RecordComponent_类提供了有关记录类组件的信息。**

此外，**_Class_类提供了_getRecordComponents()_方法，如果类对象是_Record_实例，则返回记录类的所有组件。**值得注意的是，**返回数组中的组件与在记录中声明的顺序相同。**

接下来，让我们看看如何结合使用_RecordComponent_和反射API来获取我们的_Player_记录类的所有字段，以及ERIC实例的对应值：

```java
var fields = new ArrayList``<Field>``();
RecordComponent[] components = Player.class.getRecordComponents();
for (var comp : components) {
    try {
        Field field = ERIC.getClass()
          .getDeclaredField(comp.getName());
        field.setAccessible(true);
        fields.add(field);
    } catch (NoSuchFieldException e) {
        // 为了简单起见，错误处理被跳过
    }
}
```

首先，我们创建了一个空字段列表来保存我们稍后提取的字段。我们知道**我们可以使用_class.getDeclaredField(fieldName)_方法检索Java类中的声明字段**。因此，_fieldName_成为解决问题的关键。

_RecordComponent_携带有关记录字段的各种信息，包括类型、名称等。也就是说，如果我们有_PLAYER_的_RecordComponent_对象，我们就可以拥有它的_Field_对象。_Player.class.getRecordComponents()_返回_PLAYER_记录类的所有组件作为一个数组。因此，我们可以通过组件数组中的名称获取所有_Field_对象。

**由于我们稍后想要提取这些字段的值，因此在将每个字段添加到我们的结果字段列表之前，需要设置_setAccessible(true)_。**

接下来，让我们验证我们从上述循环中获得的字段是否符合预期：

```java
assertEquals(3, fields.size());

var nameField = fields.get(0);
var ageField = fields.get(1);
var scoreField = fields.get(2);
try {
    assertEquals("name", nameField.getName());
    assertEquals(String.class, nameField.getType());
    assertEquals("Eric", nameField.get(ERIC));

    assertEquals("age", ageField.getName());
    assertEquals(int.class, ageField.getType());
    assertEquals(28, ageField.get(ERIC));

    assertEquals("score", scoreField.getName());
    assertEquals(Long.class, scoreField.getType());
    assertEquals(4242L, scoreField.get(ERIC));
} catch (IllegalAccessException exception) {
    // 为了简单起见，错误处理被跳过
}
```

正如断言代码所示，我们可以通过调用_field.get(ERIC)_来获取ERIC实例的值。此外，**在调用此方法时，我们必须捕获_IllegalAccessException_检查异常。**

## 4. 使用_Class.getDeclaredFields()_

新的_RecordComponent_允许我们轻松获取记录组件的属性。然而，即使不使用新的_RecordComponent_类，也可以解决这个问题。

Java反射API提供了**_Class.getDeclaredFields()_方法来获取类中所有声明的字段。**因此，我们可以使用此方法获取记录类的字段。

值得注意的是，我们不应该使用_Class.getFields()_方法来获取记录类的字段。这是因为_getFields()_只返回类中声明的_public_字段。然而，**记录类中的所有字段都是_private_。**因此，如果我们对记录类调用_Class.getFields()_，我们将不会得到任何字段：

```java
// 记录没有公共字段
assertEquals(0, Player.class.getFields().length);
```

同样，我们在将每个字段添加到结果列表之前应用_setAccessible(true)_：

```java
var fields = new ArrayList``<Field>``();
for (var field : Player.class.getDeclaredFields()) {
    field.setAccessible(true);
    fields.add(field);
}
```

接下来，让我们检查结果列表中的字段是否与_PLAYER_类匹配，以及我们是否可以通过这些字段获取ERIC对象的预期值：

```java
assertEquals(3, fields.size());
var nameField = fields.get(0);
var ageField = fields.get(1);
var scoreField = fields.get(2);

try {
    assertEquals("name", nameField.getName());
    assertEquals(String.class, nameField.getType());
    assertEquals("Eric", nameField.get(ERIC));

    assertEquals("age", ageField.getName());
    assertEquals(int.class, ageField.getType());
    assertEquals(28, ageField.get(ERIC));

    assertEquals("score", scoreField.getName());
    assertEquals(Long.class, scoreField.getType());
    assertEquals(4242L, scoreField.get(ERIC));
} catch (IllegalAccessException ex) {
    // 为了简单起见，错误处理被跳过
}
```

当我们运行测试时，它通过了。所以，这种方法也解决了问题。

## **5. 结论**

在本文中，我们探讨了使用反射从记录类中提取字段的两种方法。

在第一种解决方案中，我们从新的_RecordComponent_类中获取了字段名称。然后，我们可以通过调用_Class.getDeclaredField(FieldName)_来获取字段对象。

记录类也是Java类。因此，作为替代方案，我们还可以从_Class.getDeclaredFields()_方法中获取记录类的所有字段。

如常，示例的完整源代码可在GitHub上找到。