---
date: 2022-04-01
category:
  - Java
  - ArrayList
tag:
  - 深拷贝
  - ArrayList
head:
  - - meta
    - name: keywords
      content: Java ArrayList 深拷贝教程
------
# 如何在Java中深拷贝ArrayList

## 1. 引言

在这篇简短的教程中，我们将学习如何在Java中复制一个_ArrayList_，重点介绍创建列表中元素的深拷贝的不同方法。

## 2. 浅拷贝与深拷贝

浅拷贝技术复制原始对象，但只复制可变字段的引用，而不是实际对象。另一方面，深拷贝创建了所有可变字段的独立副本，包括深度嵌套的对象。有关详细指南，请参阅我们的文章《深拷贝和浅拷贝之间的区别》。

## 3. 模型

让我们创建两个类：_Course_和_Student_。_Student_类有一个_Course_对象的实例作为可变的依赖项：

```java
public class Course {
    private Integer courseId;
    private String courseName;

    // 标准 getter 和 setter
}

public class Student {
    private int studentId;
    private String studentName;
    private Course course;

    // 标准 getter 和 setter
}
```

## 4. 使用_Cloneable_接口进行深拷贝

让我们**实现标记接口_Cloneable_并在我们的模型类中重写_clone_方法**以创建深拷贝：

```java
@Override
public Course clone() {
    try {
        return (Course) super.clone();
    } catch (CloneNotSupportedException e) {
        throw new IllegalStateException(e);
    }
}
```

注意_super.clone()_总是返回对象的浅拷贝。在_Course_类中，我们没有任何可变字段，而在_Student_类中，我们需要**显式设置可变字段以创建深拷贝**：

```java
@Override
public Student clone() {
    Student student;
    try {
        student = (Student) super.clone();
    } catch (CloneNotSupportedException e) {
        throw new IllegalStateException(e);
    }
    student.course = this.course.clone();
    return student;
}
```

现在，让我们遍历项目并使用_clone_方法，并验证是否创建了深拷贝：

```java
public static List````````````````<Student>```````````````` deepCopyUsingCloneable(List````````````````<Student>```````````````` students){
    return students.stream().map(Student::clone).collect(Collectors.toList());
}

```

```java
@Test
public void whenCreatingCopyWithCloneable_thenObjectsShouldNotBeSame() {
    Course course = new Course(1, "Spring Masterclass");
    Student student1 = new Student(1, "John", course);
    Student student2 = new Student(2, "David", course);
    List````````````````<Student>```````````````` students = new ArrayList<>();
    students.add(student1);
    students.add(student2);

    List````````````````<Student>```````````````` deepCopy = Student.deepCopyUsingCloneable(students);

    Assertions.assertEquals(students.get(0), deepCopy.get(0));
    Assertions.assertNotSame(students.get(0),deepCopy.get(0));
    Assertions.assertEquals(students.get(1), deepCopy.get(1));
    Assertions.assertNotSame(students.get(1),deepCopy.get(1));
}
```

## 5. 使用复制构造函数进行深拷贝

复制构造函数是一个特殊的构造函数，它接受其类类型的参数，并回一个具有传递值的新类实例。

让我们为_Student_对象创建一个复制构造函数，并使用它来对列表中的每个项目进行深拷贝：

```java
public Student(Student student) {
    this.studentId = student.getStudentId();
    this.studentName = student.getStudentName();
    this.course = new Course(student.getCourse()
      .getCourseId(), student.getCourse()
      .getCourseName());
}
```

接下来，让我们遍历列表中的项目，并使用上面创建的复制构造函数对列表中的每个项目进行深拷贝，并返回一个新列表：

```java
public static List````````````````<Student>```````````````` deepCopyUsingCopyConstructor(List````````````````<Student>```````````````` students){
    return students.stream().map(Student::new).collect(Collectors.toList());
}
```

在这种情况下，**修改原始_ArrayList_或列表中的元素对复制的列表没有任何影响，反之亦然**：

```java
@Test
public void whenCreatingDeepCopyWithCopyConstructor_thenObjectsShouldNotBeSame() {

    Course course = new Course(1, "Spring Masterclass");
    Student student1 = new Student(1, "John", course);
    Student student2 = new Student(2, "David", course);

    List````````````````<Student>```````````````` students = new ArrayList<>();
    students.add(student1);
    students.add(student2);

    List````````````````<Student>```````````````` deepCopy = Student.deepCopyUsingCopyConstructor(students);

    Assertions.assertEquals(students.get(0), deepCopy.get(0));
    Assertions.assertNotSame(students.get(0),deepCopy.get(0));
    Assertions.assertEquals(students.get(1), deepCopy.get(1));
    Assertions.assertNotSame(students.get(1),deepCopy.get(1));
}
```

## 6. 使用Apache Commons库进行深拷贝

Apache Commons库提供了一个实用方法_SerializationUtils.clone()_，它通过序列化和反序列化帮助制作对象的深拷贝。有关序列化的详细指南，请参阅我们的文章Java序列化。

使用这种方法确保了对象图中的所有字段，包括深度嵌套的对象都被复制，从而得到一个完全独立的深拷贝：

```java
public static List````````````````<Student>```````````````` deepCopyUsingSerialization(List````````````````<Student>```````````````` students){
    return students.stream().map(SerializationUtils::clone).collect(Collectors.toList());
}
```

**对象图中的所有对象必须实现_Serializable_接口才能成功**。否则，将抛出异常：

```java
@Test
public void whenCreatingDeepCopyWithSerializationUtils_thenObjectsShouldNotBeSame() {

    Course course = new Course(1, "Spring Masterclass");
    Student student1 = new Student(1, "John", course);
    Student student2 = new Student(2, "David", course);

    List````````````````<Student>```````````````` students = new ArrayList<>();
    students.add(student1);
    students.add(student2);

    List````````````````<Student>```````````````` deepCopy = Student.deepCopyUsingSerialization(students);

    Assertions.assertEquals(students.get(0), deepCopy.get(0));
    Assertions.assertNotSame(students.get(0),deepCopy.get(0));
    Assertions.assertEquals(students.get(1), deepCopy.get(1));
    Assertions.assertNotSame(students.get(1),deepCopy.get(1));
}
```

这使我们免于为复杂的对象结构创建克隆逻辑。然而，**由于进行序列化和反序列化的开销，它比其他方法稍微慢一些**。

Apache Commons lang3库的最新版本可以在Maven中央仓库中找到。

## 7. 使用Jackson库进行深拷贝

Jackson是另一个使用序列化和反序列化创建原始对象深拷贝的库。它将对象序列化为JSON字符串，然后将其反序列化回一个新的独立副本：

```java
public static Student createDeepCopy(Student student) {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
        return objectMapper.readValue(objectMapper.writeValueAsString(student), Student.class);
    } catch (JsonProcessingException e) {
        throw new IllegalArgumentException(e);
    }
}
```

```java
public static List````````````````<Student>```````````````` deepCopyUsingJackson(List````````````````<Student>```````````````` students) {
    return students.stream().map(Student::createDeepCopy).collect(Collectors.toList());
}
```

**请注意，Jackson需要存在一个默认构造函数才能序列化和反序列化任何给定的对象**：

```java
@Test
public void whenCreatingDeepCopyWithJackson_thenObjectsShouldNotBeSame() {

    Course course = new Course(1, "Spring Masterclass");
    Student student1 = new Student(1, "John", course);
    Student student2 = new Student(2, "David", course);

    List````````````````<Student>```````````````` students = new ArrayList<>();
    students.add(student1);
    students.add(student2);

    List````````````````<Student>```````````````` deepCopy = Student.deepCopyUsingJackson(students);

    Assertions.assertEquals(students.get(0), deepCopy.get(0));
    Assertions.assertNotSame(students.get(0),deepCopy.get(0));
    Assertions.assertEquals(students.get(1), deepCopy.get(1));
    Assertions.assertNotSame(students.get(1),deepCopy.get(1));
}
```

Jackson-databind库的最新版本可以在Maven中央仓库中找到。

## 8. 结论

在本教程中，我们涵盖了复制_ArrayList_的各种方式，包括原生方法和使用第三方库。如常，源代码可在GitHub上找到。