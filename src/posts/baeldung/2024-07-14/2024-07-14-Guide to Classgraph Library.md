---
date: 2024-07-14
category:
  - Java
  - 编程
tag:
  - Classgraph
  - Java库
head:
  - - meta
    - name: keywords
      content: Classgraph, Java类路径扫描, 元数据构建, 快速, 字节码级别, Spring应用
------
# Classgraph库指南

## 1. 概述

在本简短的教程中，我们将讨论Classgraph库——它的作用以及我们如何使用它。

**Classgraph帮助我们在Java类路径中找到目标资源，构建有关发现的资源的元数据，并提供方便的API来处理这些元数据。**

这种用例在基于Spring的应用中非常流行，其中用模式注解标记的组件会自动注册到应用上下文中。然而，我们也可以利用这种方法来执行自定义任务。例如，我们可能想要找到所有带有特定注解的类，或者所有具有特定名称的资源文件。

最酷的是，**Classgraph速度很快，因为它在字节码级别工作**，这意味着检查的类不会被加载到JVM中，并且它不使用反射来处理。

## 2. Maven依赖

首先，让我们将classgraph库添加到我们的_pom.xml_中：

```xml
`<dependency>`
    `<groupId>`io.github.classgraph`</groupId>`
    `<artifactId>`classgraph`</artifactId>`
    `<version>`4.8.153`</version>`
`</dependency>`
```

在接下来的部分中，我们将查看使用库API的几个实际示例。

## 3. 基本用法

**使用库有三个基本步骤：**

1. 设置扫描选项——例如，目标包
2. 执行扫描
3. 使用扫描结果

让我们为我们的示例设置创建以下领域：

```java
@Target({TYPE, METHOD, FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface TestAnnotation {

    String value() default "";
}
```

```java
@TestAnnotation
public class ClassWithAnnotation { }
```

现在让我们看看上述三个步骤的一个示例，即查找带有_@TestAnnotation_的类：

```java
try (ScanResult result = new ClassGraph().enableClassInfo().enableAnnotationInfo()
  .whitelistPackages(getClass().getPackage().getName()).scan()) {

    ClassInfoList classInfos = result.getClassesWithAnnotation(TestAnnotation.class.getName());

    assertThat(classInfos).extracting(ClassInfo::getName).contains(ClassWithAnnotation.class.getName());
}
```

让我们分解上述示例：

- 我们首先**设置扫描选项**（我们配置了扫描器仅解析类和注解信息，并指示它仅解析目标包中的文件）
- 我们使用_ClassGraph.scan()_方法**执行了扫描**
- 我们使用_ScanResult_通过调用_getClassWithAnnotation()_方法找到注解的类

正如我们接下来的例子中也会看到的，_ScanResult_对象可以包含大量关于我们想要检查的API的信息，例如_ClassInfoList_。

## 4. 按方法注解过滤

让我们扩展我们的示例到方法注解：

```java
public class MethodWithAnnotation {

    @TestAnnotation
    public void service() { }
}
```

**我们可以使用类似的方法——_getClassesWithMethodAnnotations()_来找到所有具有目标注解标记的方法的类：**

```java
try (ScanResult result = new ClassGraph().enableAllInfo()
  .whitelistPackages(getClass().getPackage().getName()).scan()) {

    ClassInfoList classInfos = result.getClassesWithMethodAnnotation(TestAnnotation.class.getName());

    assertThat(classInfos).extracting(ClassInfo::getName).contains(MethodWithAnnotation.class.getName());
}
```

**该方法返回一个_ClassInfoList_对象，其中包含与扫描匹配的类的相关信息。**

## 5. 按注解参数过滤

让我们也看看如何找到所有用目标注解标记的方法，并且具有目标注解参数值的类。

首先，让我们定义包含具有_@TestAnnotation_的方法的类，具有2个不同的参数值：

```java
public class MethodWithAnnotationParameterDao {

    @TestAnnotation("dao")
    public void service() { }
}
```

```java
public class MethodWithAnnotationParameterWeb {

    @TestAnnotation("web")
    public void service() { }
}
```

现在，让我们遍历_ClassInfoList_结果，并验证每个方法的注解：

```java
try (ScanResult result = new ClassGraph().enableAllInfo()
  .whitelistPackages(getClass().getPackage().getName()).scan()) {

    ClassInfoList classInfos = result.getClassesWithMethodAnnotation(TestAnnotation.class.getName());
    ClassInfoList webClassInfos = classInfos.filter(classInfo -> {
        return classInfo.getMethodInfo().stream().anyMatch(methodInfo -> {
            AnnotationInfo annotationInfo = methodInfo.getAnnotationInfo(TestAnnotation.class.getName());
            if (annotationInfo == null) {
                return false;
            }
            return "web".equals(annotationInfo.getParameterValues().getValue("value"));
        });
    });

    assertThat(webClassInfos).extracting(ClassInfo::getName)
      .contains(MethodWithAnnotationParameterWeb.class.getName());
}
```

**在这里，我们使用了_AnnotationInfo_和_MethodInfo_元数据类来找到我们想要检查的方法和注解的元数据。**

## 6. 按字段注解过滤

我们还可以使用_getClassesWithFieldAnnotation()_方法根据字段注解过滤_ClassInfoList_结果：

```java
public class FieldWithAnnotation {

    @TestAnnotation
    private String s;
}
```

```java
try (ScanResult result = new ClassGraph().enableAllInfo()
  .whitelistPackages(getClass().getPackage().getName()).scan()) {

    ClassInfoList classInfos = result.getClassesWithFieldAnnotation(TestAnnotation.class.getName());

    assertThat(classInfos).extracting(ClassInfo::getName).contains(FieldWithAnnotation.class.getName());
}
```

## 7. 查找资源

最后，我们来看看如何找到有关类路径资源的信息。

让我们在_classgraph_类路径根目录下创建一个资源文件——例如，_src/test/resources/classgraph/my.config_——并给它一些内容：

```
my data
```

我们现在可以找到资源并获取它的内容：

```java
try (ScanResult result = new ClassGraph().whitelistPaths("classgraph").scan()) {
    ResourceList resources = result.getResourcesWithExtension("config");
    assertThat(resources).extracting(Resource::getPath).containsOnly("classgraph/my.config");
    assertThat(resources.get(0).getContentAsString()).isEqualTo("my data");
}
```

我们可以看到我们使用了_ScanResult'_的_getResourcesWithExtension()_方法来查找我们的特定文件。**这个类还有一些其他有用的与资源相关的方法是，如_getAllResources(), getResourcesWithPath()_和**_getResourcesWithPattern()_。

这些方法返回一个_ResourceList_对象，可以进一步用于迭代和操作_Resource_对象。

## 8. 实例化

当我们想要实例化找到的类时，非常重要的一点是不要通过_Class.forName_来实现，而是使用库方法_ClassInfo.loadClass_。

原因是Classgraph使用它自己的类加载器从一些JAR文件中加载类。因此，如果我们使用_Class.forName_，相同的类可能会被不同的类加载器多次加载，这可能会导致非平凡的错误。

## 9. 结论

在本文中，我们学习了如何有效地使用Classgraph库查找类路径资源并检查它们的内容。

像往常一样，本文的完整源代码可在GitHub上获得。