---
date: 2022-04-01
category:
  - Java
  - Records
tag:
  - Java Records
  - Custom Constructor
head:
  - - meta
    - name: keywords
      content: Java Records, Custom Constructor, Immutability, Data Validation
------
# Java记录中的自定义构造器

Java记录是Java 14中定义不可变数据容器的简洁方式。

在本文中，我们将探讨Java记录中的自定义构造器如何通过允许数据验证和错误处理，在对象初始化期间给我们提供更大的控制。

### 2. 理解Java记录

记录提供了简洁、易读的语法，强制执行不可变性，并**生成常用方法的标准实现**，如_toString()_、_hashCode()_和_equals()_。这些实现基于记录的组件，并且由编译器自动生成。

使用_record_关键字定义记录，后跟记录的名称和组件：

```java
record StudentRecord(String name, int rollNo, int marks) {}
```

这个记录定义创建了一个新的名为_StudentRecord_的记录类，它有三个组件：_name_、_rollNo_和_marks_。

组件是浅不可变实例变量，这意味着一旦创建了记录实例，它们就不能被更改。但是，记录中包含的可变对象可以被更改。

默认情况下，记录组件是私有的，只能通过访问器方法访问。可以向记录添加自定义方法和行为，但组件必须保持_私有_，并且只能通过访问器方法访问：

```java
@Test
public void givenStudentRecordData_whenCreated_thenStudentPropertiesMatch() {
    StudentRecord s1 = new StudentRecord("John", 1, 90);
    StudentRecord s2 = new StudentRecord("Jane", 2, 80);

    assertEquals("John", s1.name());
    assertEquals(1, s1.rollNo());
    assertEquals(90, s1.marks());
    assertEquals("Jane", s2.name());
    assertEquals(2, s2.rollNo());
    assertEquals(80, s2.marks());
}
```

在这个例子中，我们使用生成的访问器方法来检查记录组件的值。

### 3. 如何为Java记录创建自定义构造器

自定义构造器在Java记录中至关重要，因为它们提供了添加进一步逻辑和控制记录对象创建的能力。

与Java编译器提供的标凈实现相比，自定义构造器为记录提供了更多功能。

为了确保数据完整性并能够按名称对_StudentRecord_进行排序，我们可以为输入验证和字段初始化创建自定义构造器：

```java
record Student(String name, int rollNo, int marks) {
    public Student {
        if (name == null) {
            throw new IllegalArgumentException("Name cannot be null");
        }
    }
}
```

在这里，自定义构造器检查_name_组件是否为_null_。如果是_null_，它将抛出一个_IllegalArgumentException_。这使我们能够验证输入数据，并确保记录对象以有效状态创建。

### 3.1. 对StudentRecord对象列表进行排序

现在我们已经看到了如何为我们的记录创建自定义构造器，让我们使用这个自定义构造器在示例中按名称对_StudentRecord_对象列表进行排序：

```java
@Test
public void givenStudentRecordsList_whenSortingDataWithName_thenStudentsSorted(){
    List```<StudentRecord>``` studentRecords = List.of(
        new StudentRecord("Dana", 1, 85),
        new StudentRecord("Jim", 2, 90),
        new StudentRecord("Jane", 3, 80)
    );

    List```<StudentRecord>``` mutableStudentRecords = new ArrayList<>(studentRecords);
    mutableStudentRecords.sort(Comparator.comparing(StudentRecord::name));
    List```<StudentRecord>``` sortedStudentRecords =
      List.copyOf(mutableStudentRecords);

    assertEquals("Jane", sortedStudentRecords.get(1).name());
}
```

在这个例子中，我们创建了一个_StudentRecord_对象列表，我们能够按_name_进行排序。我们在排序时不需要处理空值，因为_name_永远不会是_null_。

总之，Java记录中的自定义构造器提供了增加额外逻辑和控制记录对象创建的灵活性。尽管标准实现很简单，但自定义构造器使记录更加多功能和有用。

### 4. Java记录中自定义构造器的好处和限制

像任何语言特性一样，Java记录中的自定义构造器也有自己的一套好处和限制。下面，我们将更详细地探讨这些。

#### 4.1. 好处

自定义构造器可以为Java记录带来几个好处。它们可以用来**为传入的数据提供额外的验证**，例如，通过检查值是否在某个范围内或是否满足某些条件。

例如，假设我们要确保_StudentRecord_中的_marks_字段始终在0到100之间。我们可以创建一个自定义构造器来检查_marks_字段是否在范围内。如果它超出范围，我们可以抛出一个异常或将其设置为默认值，如0：

```java
public StudentRecord {
    if (marks `< 0 || marks >` 100) {
        throw new IllegalArgumentException("Marks should be between 0 and 100.");
    }
}
```

Java记录中的自定义构造器也可以**用于提取和聚合相关数据到较少的组件中**，使记录中的数据更容易使用。

例如，假设我们想要根据他的分数计算一个学生的总成绩。我们可以向_StudentRecord_添加_grade_字段，并创建一个自定义构造器，根据_marks_字段计算成绩。这样，我们可以轻松地访问一个学生的成绩，而不必每次都手动计算：

```java
record StudentRecordV2(String name, int rollNo, int marks, char grade) {
    public StudentRecordV2(String name, int rollNo, int marks) {
        this(name, rollNo, marks, calculateGrade(marks));
    }

    private static char calculateGrade(int marks) {
        if (marks >= 90) {
            return 'A';
        } else if (marks >= 80) {
            return 'B';
        } else if (marks >= 70) {
            return 'C';
        } else if (marks >= 60) {
            return 'D';
        } else {
            return 'F';
        }
    }
}
```

此外，自定义构造器可以**在没有提供参数的情况下为其参数设置默认值**。这在某些情况下非常有用，例如我们想要为某些字段提供默认值或自动生成值，如生成一个新的ID或UUID：

```java
record StudentRecordV3(String name, int rollNo, int marks, String id) {

    public StudentRecordV3(String name, int rollNo, int marks) {
        this(name, rollNo, marks, UUID.randomUUID().toString());
    }
}
```

#### 4.2. 限制

尽管自定义构造器可以为Java记录带来许多好处，但它们也带来了某些限制。

记录构造器的重载需要在第一行显式地委托给另一个记录构造器。这个要求存在是因为所有的构造都必须最终委托给规范构造器。任何重载构造器都必须使用`this(...)`在它的第一行委托给另一个构造器，来源：java-record-canonical-constructor。

例如，下面的实现将无法工作，因为我们没有在第一行调用记录构造器：

```java
record StudentRecordV3(String name, int rollNo, int marks, String id) {

    public StudentRecordV3(String name, int rollNo, int marks) {
        name = name.toUpperCase();
        this(name, rollNo, marks, UUID.randomUUID().toString());
    }
}
```

### 5. 结论

在本文中，我们介绍了Java记录中的自定义构造器，以及它们的好处和限制。

总之，Java记录和自定义构造器简化了代码，并提高了可读性和可维护性。它们有许多好处，但它们的使用有一些限制，可能不适用于所有用例。

如常，本文的示例可以在GitHub上找到。