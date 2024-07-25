---
date: 2022-04-01
category:
  - Java
  - Reflection
tag:
  - Annotations
  - Reflection
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Annotations, Reflection
------
# 使用反射获取字段注解

## 1. 概述

在本教程中，我们将学习如何获取字段的注解。此外，我们将解释保留策略元注解的工作原理。然后，我们将展示返回字段注解的两种方法之间的区别。

## 2. 注解的保留策略

首先，让我们看看_Retention_注解。它定义了注解的生命周期。这个元注解接受一个_RetentionPolicy_属性。也就是说，该属性定义了注解可见的生命周期：
- _RetentionPolicy.SOURCE_ – 仅在源代码中可见
- _RetentionPolicy.CLASS_ – 在编译时对编译器可见
- _RetentionPolicy.RUNTIME_ – 对编译器和运行时都可见

因此，**只有_.RUNTIME_保留策略允许我们以编程方式读取注解**。

现在，让我们创建一个带有注解字段的示例类。我们将定义三个注解，其中只有两个在运行时可见。

第一个注解在运行时可见：
```java
@Retention(RetentionPolicy.RUNTIME)
public @interface FirstAnnotation {
}
```

第二个注解具有相同的保留策略：
```java
@Retention(RetentionPolicy.RUNTIME)
public @interface SecondAnnotation {
}
```

最后，让我们创建一个仅在源代码中可见的第三个注解：
```java
@Retention(RetentionPolicy.SOURCE)
public @interface ThirdAnnotation {
}
```

现在，让我们定义一个带有所有三个注解的字段_classMember_的类：
```java
public class ClassWithAnnotations {
    
    @FirstAnnotation
    @SecondAnnotation
    @ThirdAnnotation
    private String classMember;
}
```

之后，让我们检索运行时所有可见的注解。**我们将使用Java反射，这允许我们检查字段的属性：**
```java
@Test
public void whenCallingGetDeclaredAnnotations_thenOnlyRuntimeAnnotationsAreAvailable() throws NoSuchFieldException {
    Field classMemberField = ClassWithAnnotations.class.getDeclaredField("classMember");
    Annotation[] annotations = classMemberField.getDeclaredAnnotations();
    assertThat(annotations).hasSize(2);
}
```

结果，我们只检索到了两个在运行时可用的注解。如果字段上没有注解，则_getDeclaredAnnotations_方法返回长度为零的数组。

我们也可以以相同的方式读取超类字段的注解：检索超类的字段并调用相同的_getDeclaredAnnotations_方法。

## 4. 检查字段是否带有特定类型的注解

现在，让我们看看如何检查字段上是否存在特定的注解。_Field_类有一个方法_isAnnotationPresent_，当元素上存在指定类型的注解时返回_true_。让我们在我们的_classMember_字段上测试它：
```java
@Test
public void whenCallingIsAnnotationPresent_thenOnlyRuntimeAnnotationsAreAvailable() throws NoSuchFieldException {
    Field classMemberField = ClassWithAnnotations.class.getDeclaredField("classMember");
    assertThat(classMemberField.isAnnotationPresent(FirstAnnotation.class)).isTrue();
    assertThat(classMemberField.isAnnotationPresent(SecondAnnotation.class)).isTrue();
    assertThat(classMemberField.isAnnotationPresent(ThirdAnnotation.class)).isFalse();
}
```

正如预期的那样，_ThirdAnnotation_不存在，因为它在_Retention_元注解中指定了_SOURCE_保留策略。

## 5. _Field_方法_getAnnotations_和_getDeclaredAnnotations_

现在，让我们看看_Field_类提供的两个方法，_getAnnotations_和_getDeclaredAnnotations_。根据Javadoc，_getDeclaredAnnotations_方法返回**直接存在于元素上的注解**。另一方面，Javadoc说_getAnnotations_返回**存在于元素上的所有注解**。

一个类中的字段在其定义上方包含注解。因此，注解没有继承。所有注解必须与字段定义一起定义。因此，_getAnnotations_和_getDeclaredAnnotations_方法**总是返回相同的结果**。

让我们在简单的测试中展示它：
```java
@Test
public void whenCallingGetDeclaredAnnotationsOrGetAnnotations_thenSameAnnotationsAreReturned() throws NoSuchFieldException {
    Field classMemberField = ClassWithAnnotations.class.getDeclaredField("classMember");
    Annotation[] declaredAnnotations = classMemberField.getDeclaredAnnotations();
    Annotation[] annotations = classMemberField.getAnnotations();
    assertThat(declaredAnnotations).containsExactly(annotations);
}
```

此外，在_Field_类中，我们可以发现_getAnnotations_方法调用了_getDeclaredAnnotations_方法：
```java
@Override
public Annotation[] getAnnotations() {
    return getDeclaredAnnotations();
}
```

## 6. 结论

在这篇简短的文章中，我们解释了保留策略元注解在检索注解中的作用。然后我们展示了如何读取字段的注解。最后，我们证明了字段的注解没有继承。