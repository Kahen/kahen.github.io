---
date: 2022-04-01
category:
  - Java
  - Annotations
tag:
  - Java
  - Annotation
  - Reflection
  - Spring
  - Reflections
  - Jandex
head:
  - - meta
    - name: keywords
      content: Java, Annotation, Reflection, Spring, Runtime, Reflections, Jandex
---
# Java运行时扫描注解

正如我们所知，在Java世界中，注解是一种获取类和方法的元信息的非常有用的手段。

在本教程中，我们将讨论在运行时扫描Java注解。

### 2. 定义自定义注解

让我们首先定义一个示例注解以及使用我们自定义注解的示例类：

```java
@Target({ METHOD, TYPE })
@Retention(RUNTIME)
public @interface SampleAnnotation {
    String name();
}

@SampleAnnotation(name = "annotatedClass")
public class SampleAnnotatedClass {

    @SampleAnnotation(name = "annotatedMethod")
    public void annotatedMethod() {
        // 执行某些操作
    }

    public void notAnnotatedMethod() {
        // 执行某些操作
    }
}
```

现在，我们准备**解析这个自定义注解在基于类的使用和基于方法的使用上的“name”属性**。

### 3. 使用Java反射扫描注解

借助Java的_反射_，**我们可以扫描特定注解的类或特定类的注解方法**。

为了实现这个目标，我们需要使用_ClassLoader_来加载类。所以这种方法在我们知道要扫描哪些类时非常有用：

```java
Class``<?>`` clazz = ClassLoader.getSystemClassLoader()
  .loadClass("com.baeldung.annotation.scanner.SampleAnnotatedClass");
SampleAnnotation classAnnotation = clazz.getAnnotation(SampleAnnotation.class);
Assert.assertEquals("SampleAnnotatedClass", classAnnotation.name());
Method[] methods = clazz.getMethods();
List```````<String>``````` annotatedMethods = new ArrayList<>();
for (Method method : methods) {
    SampleAnnotation annotation = method.getAnnotation(SampleAnnotation.class);
    if (annotation != null) {
        annotatedMethods.add(annotation.name());
    }
}
Assert.assertEquals(1, annotatedMethods.size());
Assert.assertEquals("annotatedMethod", annotatedMethods.get(0));
```

### 4. 使用Spring上下文库扫描注解

另一种扫描注解的方法是使用Spring上下文库中包含的_ClassPathScanningCandidateComponentProvider_类。

首先，让我们添加_spring-context_依赖：

```xml
````<dependency>````
    `````<groupId>`````org.springframework`````</groupId>`````
    `````<artifactId>`````spring-context`````</artifactId>`````
    `````<version>`````5.3.22`````</version>`````
````</dependency>````
```

然后，我们继续一个简单的示例：

```java
ClassPathScanningCandidateComponentProvider provider =
  new ClassPathScanningCandidateComponentProvider(false);
provider.addIncludeFilter(new AnnotationTypeFilter(SampleAnnotation.class));

Set`<BeanDefinition>` beanDefs = provider
  .findCandidateComponents("com.baeldung.annotation.scanner");
List```````<String>``````` annotatedBeans = new ArrayList<>();
for (BeanDefinition bd : beanDefs) {
    if (bd instanceof AnnotatedBeanDefinition) {
        Map`<String, Object>` annotAttributeMap = ((AnnotatedBeanDefinition) bd)
          .getMetadata()
          .getAnnotationAttributes(SampleAnnotation.class.getCanonicalName());
        annotatedBeans.add(annotAttributeMap.get("name").toString());
    }
}

Assert.assertEquals(1, annotatedBeans.size());
Assert.assertEquals("SampleAnnotatedClass", annotatedBeans.get(0));
```

与Java _反射_完全不同，**我们可以扫描所有类，而无需知道具体的类名**。

### 5. 使用Spring核心库扫描注解

尽管Spring核心库并不直接提供我们代码中所有注解的完整扫描，**我们仍然可以通过使用这个库的一些工具类来开发我们自己的完整注解扫描器**。

首先，我们需要添加_spring-core_依赖：

```xml
````<dependency>````
    `````<groupId>`````org.springframework`````</groupId>`````
    `````<artifactId>`````spring-core`````</artifactId>`````
    `````<version>`````5.3.22`````</version>`````
````</dependency>````
```

这里是一个简单的示例：

```java
Class``<?>`` userClass = ClassUtils.getUserClass(SampleAnnotatedClass.class);

List```````<String>``````` annotatedMethods = Arrays.stream(userClass.getMethods())
  .filter(method -> AnnotationUtils
  .getAnnotation(method, SampleAnnotation.class) != null)
  .map(method -> method.getAnnotation(SampleAnnotation.class)
  .name())
  .collect(Collectors.toList());

Assert.assertEquals(1, annotatedMethods.size());
Assert.assertEquals("annotatedMethod", annotatedMethods.get(0));
```

借助_AnnotationUtils_和_ClassUtils_的帮助，我们可以找到带有特定注解的方法和类。

### 6. 使用Reflections库扫描注解

_Reflections_是一个据说是按照_Scannotations_库的精神编写的库。**它扫描并索引项目的类路径元数据**。

让我们添加_reflections_依赖：

```xml
````<dependency>````
    `````<groupId>`````org.reflections`````</groupId>`````
    `````<artifactId>`````reflections`````</artifactId>`````
    `````<version>`````0.10.2`````</version>`````
````</dependency>````
```

现在我们准备使用这个库来搜索注解的类、方法、字段和类型：

```java
Reflections reflections = new Reflections("com.baeldung.annotation.scanner");

Set`<Method>` methods = reflections
  .getMethodsAnnotatedWith(SampleAnnotation.class);
List```````<String>``````` annotatedMethods = methods.stream()
  .map(method -> method.getAnnotation(SampleAnnotation.class)
  .name())
  .collect(Collectors.toList());

Assert.assertEquals(1, annotatedMethods.size());
Assert.assertEquals("annotatedMethod", annotatedMethods.get(0));

Set<Class``<?>``> types = reflections
  .getTypesAnnotatedWith(SampleAnnotation.class);
List```````<String>``````` annotatedClasses = types.stream()
  .map(clazz -> clazz.getAnnotation(SampleAnnotation.class)
  .name())
  .collect(Collectors.toList());

Assert.assertEquals(1, annotatedClasses.size());
Assert.assertEquals("SampleAnnotatedClass", annotatedClasses.get(0));
```

正如我们所看到的，_Reflections_库提供了一种灵活的方式来扫描所有注解的类和方法。所以我们不需要从_SampleAnnotatedClass_开始。

### 7. 使用Jandex库扫描注解

现在让我们来看看一个名为_Jandex_的不同库，我们**可以通过读取我们代码生成的_Jandex_文件来在运行时扫描注解**。

这个库引入了一个_Maven_插件来生成一个包含我们项目相关元信息的_Jandex_文件：

```xml
`<plugin>`
    `````<groupId>`````org.jboss.jandex`````</groupId>`````
    `````<artifactId>`````jandex-maven-plugin`````</artifactId>`````
    `````<version>`````1.2.3`````</version>`````
    `<executions>`
        `<execution>`
            `<phase>`compile`</phase>`
            `<id>`make-index`</id>`
            `<goals>`
                `<goal>`jandex`</goal>`
            `</goals>`
            `<configuration>`
                `<fileSets>`
                    `<fileSet>`
                        `<directory>`${project.build.outputDirectory}`</directory>`
                    `</fileSet>`
                `</fileSets>`
            `</configuration>`
        `</execution>`
    `</executions>`
`</plugin>`
```

正如我们所看到的，运行_maven-install_命令后，文件在类路径下的_META-INF_目录中以_jandex.idx_的名称生成。如果需要，我们还可以使用Maven的重命名插件来修改文件的名称。

现在我们准备扫描任何类型的注解。首先，我们需要添加_jandex_依赖：

```xml
````<dependency>````
    `````<groupId>`````org.jboss`````</groupId>`````
    `````<artifactId>`````jandex`````</artifactId>`````
    `````<version>`````2.4.3.Final`````</version>`````
````</dependency>````
```

现在是我们扫描注解的时候了：

```java
IndexReader reader = new IndexReader(appFile.getInputStream());
Index jandexFile = reader.read();
List`<AnnotationInstance>` appAnnotationList = jandexFile
  .getAnnotations(DotName
  .createSimple("com.baeldung.annotation.scanner.SampleAnnotation"));

List```````<String>``````` annotatedMethods = new ArrayList<>();
List```````<String>``````` annotatedClasses = new ArrayList<>();
for (AnnotationInstance annotationInstance : appAnnotationList) {
    if (annotationInstance.target().kind() == AnnotationTarget.Kind.METHOD) {
        annotatedMethods.add(annotationInstance.value("name")
          .value()
          .toString());
    }
    if (annotationInstance.target().kind() == AnnotationTarget.Kind.CLASS) {
        annotatedClasses.add(annotationInstance.value("name")
          .value()
          .toString());
    }
}

Assert.assertEquals(1, annotatedMethods.size());
Assert.assertEquals("annotatedMethod", annotatedMethods.get(0));
Assert.assertEquals(1, annotatedClasses.size());
Assert.assertEquals("SampleAnnotatedClass", annotatedClasses.get(0));
```

### 8. 结论

根据我们的需求，有多种在运行时扫描注解的方法。每种方法都有其优缺点。我们可以根据需要来决定。

这些示例的实现可以在GitHub上找到。