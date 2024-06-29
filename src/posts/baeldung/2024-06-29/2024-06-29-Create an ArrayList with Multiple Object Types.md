---
date: 2024-06-29
category:
  - Java
  - ArrayList
tag:
  - Java
  - ArrayList
  - 多类型对象
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, 多类型对象, Baeldung
---

# Java中创建包含多种对象类型的ArrayList

在本教程中，我们将学习如何在Java中创建一个可以容纳多种对象类型的_ArrayList_。我们还将学习如何向_ArrayList_中添加多种类型的数据，然后从_ArrayList_中检索数据并将其转换回原始数据类型。

## 2. 背景

本文需要对集合框架，特别是_ArrayList_有一个基本的了解。查看相关文章，Java List接口和Java ArrayList指南，以获得这些类的基本理解。

_ArrayList_类不直接支持原始数据类型，但可以通过包装类来支持它们。_ArrayList_理想情况下是使用引用类类型创建的。这表明，当向_ArrayList_添加数据时，仅支持该引用类的数据。例如，_ArrayList`<Integer>`_不会接受来自_String_、_Boolean_或_Double_类的数据。

我们的目标是在单个_ArrayList_中存储多种类型的数据。这违背了具有单一类型参数的_ArrayList_的基本特性。然而，通过多种方法仍然可以实现这一点。我们将在本文的后续部分深入讨论这些方法。

## 3. 原始类型与参数化类型

原始类型是没有类型参数的泛型类型。原始类型可以像常规类型一样使用，没有任何限制，除了某些使用会导致“未经检查”的警告。另一方面，参数化类型是带有实际类型参数的泛型类型的实例化。参数化类型可以在类的实例化期间提供泛型或具体类型参数。

**Java规范警告不要在创建_List_时使用原始类型，因为会丢失类型安全性**。这可能会导致运行时的强制类型转换异常。声明列表时，建议始终使用类型参数：

```java
/* 原始类型 */
List myList = new ArrayList<>();
/* 参数化类型 */
List```````<Object>``````` myList = new ArrayList<>();
```

## 4. 使用_Object_作为泛型类型

### 4.1. 创建_ArrayList_

最常用的方法是使用特定的类型参数，如_String_、_Integer_或_Double_来创建_ArrayList_。这样可以轻松地表示、检索和处理单一类型的数据信息。然而，我们的目标是创建一个可以存储多种数据类型的_ArrayList_。

为了实现这一点，我们可以使用所有Java类的父类：_Object_类。_Object_类是Java类层次结构中的最顶层类，所有其他类都是直接或间接派生自它。

让我们看看如何初始化一个_Object_类型参数的_ArrayList_：

```java
ArrayList```````<Object>``````` multiTypeList = new ArrayList<>();
```

### 4.2. 向_ArrayList_中插入数据

在本节中，我们将学习如何将数据插入到_ArrayList_中。我们已经创建了一个_Object_元素类型的_ArrayList_，因此每次我们将任何类型的数据添加到_ArrayList_中时，它首先会被自动转换为_Object_类型，然后存储在_ArrayList_中。我们将尝试插入各种对象类型，如_Integer_、_Double_、_String_、_List_和一个用户定义的自定义对象。

此外，我们已经知道原始数据类型，如_int_和_double_不能直接存储在_ArrayList_中，所以我们将使用它们各自的包装类进行转换。然后这些包装类被类型转换为_Object_类并存储在_ArrayList_中。

其他类型，如_String_、_List_和_CustomObject_，本身就是类型参数，所以它们可以直接添加。然而，这些元素在存储之前也会被转换为_Object_类型。

让我们看看代码示例：

```java
multiTypeList.add(Integer.valueOf(10));
multiTypeList.add(Double.valueOf(11.5));
multiTypeList.add("String Data");
multiTypeList.add(Arrays.asList(1, 2, 3));
multiTypeList.add(new CustomObject("Class Data"));
multiTypeList.add(BigInteger.valueOf(123456789));
multiTypeList.add(LocalDate.of(2023, 9, 19));
```

### 4.3. 从_ArrayList_中检索数据

我们还将发现如何从_Object_类型参数的_ArrayList_中检索信息，并将其转换回最初添加时的各种类型参数。_ArrayList_的数据元素都将是静态的_Object_元素类型。

开发人员将负责将其转换回适当的数据类型以进行进一步处理。我们可以通过两种不同的方式实现这一点：使用_instanceof_关键字和_getClass()_方法。

当我们使用_getClass()_方法时，它返回数据元素的类类型。我们可以比较它，然后将数据转换回适当的数据类型。当我们使用_instanceof_时，它将左侧元素与右侧类型参数进行比较，并返回一个布尔结果。

在本教程中，我们将使用_instanceof_关键字将数据转换为适当的类型参数。然后我们将打印数据元素的值，以查看它是否正确转换为原始数据类型。

让我们看看代码示例：

```java
for (Object dataObj : multiTypeList) {
    if (dataObj instanceof Integer intData)
        System.out.println("Integer Data : " + intData);
    else if (dataObj instanceof Double doubleData)
        System.out.println("Double Data : " + doubleData);
    else if (dataObj instanceof String stringData)
        System.out.println("String Data : " + stringData);
    else if (dataObj instanceof List`<?>` intList)
        System.out.println("List Data : " + intList);
    else if (dataObj instanceof CustomObject customObj)
        System.out.println("CustomObject Data : " + customObj.getClassData());
    else if (dataObj instanceof BigInteger bigIntData)
        System.out.println("BigInteger Data : " + bigIntData);
    else if (dataObj instanceof LocalDate localDate)
        System.out.println("LocalDate Data : " + localDate.toString());
}
```

**请注意，我们正在使用模式匹配，这是JDK 16的一个特性。**

现在让我们检查这个程序的输出：

```java
// 程序输出
Integer Data : 10
Double Data : 11.5
String Data : String Data
List Data : [1, 2, 3]
CustomObject Data : Class Data
BigInteger Data : 123456789
LocalDate Data : 2023-09-19
```

正如我们所看到的，列表元素逐一循环，根据每个_ArrayList_元素的相关数据类型记录输出。

## 5. 替代方法

需要注意的是，使用_Object_类的_ArrayList_可能会在检索后的数据处理中引起问题，如果相关的类型参数的强制类型转换或解析没有正确处理的话。让我们通过一些简单的方法来避免这些问题。

### 5.1. 使用通用接口作为类型参数

解决这些潜在问题的一种方法是创建一个预定义或自定义接口的列表。这将限制数据的输入，只允许那些实现了定义接口的类。如下所示，_HashMap_、_TreeMap_和_LinkedHashMap_的列表允许不同表示形式的_Map_接口数据：

```java
ArrayList`<Map>` diffMapList = new ArrayList<>();
diffMapList.add(new HashMap<>());
diffMapList.add(new TreeMap<>());
diffMapList.add(new LinkedHashMap<>());
```

### 5.2. 使用父类作为类型参数

另一种方法是定义一个父类或超类的列表。它将接受所有子类表示的值。让我们创建一个_Number_对象的列表，它可以接收_Integer_、_Double_、_Float_和其他数字类型：

```java
ArrayList`<Number>` myList = new ArrayList<>();
myList.add(1.2);
myList.add(2);
myList.add(-3.5);
```

### 5.3. 使用自定义包装类作为类型参数

我们还可以通过我们想要允许的对象类型创建自定义包装类。这样的类将具有所有不同类型元素的专用getter和setter方法。然后我们可以以我们的类作为类型参数创建_List_。这是一种广泛使用的方法，因为它确保了类型安全。以下示例显示了自定义包装类的_List_，用于_Integer_和_String_元素：

```java
public class CustomObject {
    String classData;
    Integer intData;
    // 构造函数和getter
}

ArrayList`<CustomObject>` objList = new ArrayList<>();
objList.add(new CustomObject("String"));
objList.add(new CustomObject(2));
```

### 5.4. 使用函数式接口

另一种解决方案是通过函数式接口创建列表。如果我们在插入元素之前需要一些约束或验证，这种方法可能很有用。

我们可以编写一个谓词来检查_List_允许的数据类型。这个_Predicate_可以由函数式接口的抽象方法使用，以确定是否将数据元素添加到列表中。

在函数式接口中，我们可以定义一个默认方法来打印允许的数据类型信息：

```java
@FunctionalInterface
public interface UserFunctionalInterface {

    List```````<Object>``````` addToList(List```````<Object>``````` list, Object data);

    default void printList(List```````<Object>``````` dataList) {
        for (Object data : dataList) {
            if (data instanceof String stringData)
                System.out.println("String Data: " + stringData);
            if (data instanceof Integer intData)
                System.out.println("Integer Data: " + intData);
        }
    }
}
```

考虑以下场景：我们创建了一个对象的_ArrayList_，但只添加了_String和_Integer_类型的参数。函数式接口可以在谓词检查类型参数后将数据添加到列表中。我们还将添加一个默认方法来打印数据：

```java
List```````<Object>``````` dataList = new ArrayList<>();
Predicate```````<Object>``````` myPredicate = inputData -> (inputData instanceof String || inputData instanceof Integer);

UserFunctionalInterface myInterface = (listObj, data) -> {
    if (myPredicate.test(data))
        listObj.add(data);
    else
        System.out.println("Skipping input as data not allowed for class: " + data.getClass().getSimpleName());
    return listObj;
};

myInterface.addToList(dataList, Integer.valueOf(2));
myInterface.addToList(dataList, Double.valueOf(3.33));
myInterface.addToList(dataList, "String Value");
myInterface.printList(dataList);
```

让我们检查这种方法的输出：

```java
// 输出
Integer Data: 2
Skipping input as data is not allowed for class: Double
String Data: String Value
```

## 6. 结论

在这篇简短的文章中，我们探讨了_ArrayList_存储各种类型数据的功能。我们学习了如何创建一个_Object_类型参数的_ArrayList_实例。除此之外，我们还学习了如何向多种对象类型的_ArrayList_添加或删除元素。我们还学习了在处理多种对象类型的_ArrayList_时可以采用的最佳实践。

像往常一样，所有的代码示例都可以在GitHub上找到。

OK