---
date: 2024-06-27
category:
  - Java
  - JEP 290
  - JEP 415
tag:
  - Java 17
  - 反序列化
  - 安全性
head:
  - - meta
    - name: keywords
      content: Java, JEP 290, JEP 415, 反序列化过滤器, 安全性
---
# Java 17中的上下文特定反序列化过滤器

## 1. 引言

在本教程中，我们将学习Java的新功能——上下文特定反序列化过滤器。我们将建立一个场景，然后实际应用它来确定在我们的应用程序中每种情况应该使用哪些反序列化过滤器。

## 2. 与JEP 290的关系

JEP 290在Java 9中引入，通过JVM范围内的过滤器以及为每个_ObjectInputStream_实例定义过滤器的可能性，来过滤来自外部来源的反序列化。这些过滤器基于运行时参数决定允许或拒绝对象的反序列化。

反序列化不受信任数据的危险长期以来一直受到讨论，帮助解决这一问题的方法也在不断改进。因此，我们现在有更多的选项来动态选择反序列化过滤器，并且更容易创建它们。

## 3. JEP 415中_ObjectInputFilter_的新方法

为了提供更多关于何时以及如何定义反序列化过滤器的选项，JEP 415在Java 17中引入了指定每次反序列化发生时都会调用的JVM范围内的过滤器工厂的能力。这样，我们的过滤解决方案就不会再过于严格或过于宽泛了。

此外，为了提供更多的上下文控制，还有新的方法来简化过滤器的创建和组合：
- _rejectFilter(Predicate``<Class<?>``> predicate, Status otherStatus)_: 如果谓词返回_true_，则拒绝反序列化，否则返回_otherStatus_
- _allowFilter(Predicate``<Class<?>``> predicate, Status otherStatus)_: 如果谓词返回_true_，则允许反序列化，否则返回_otherStatus_
- _rejectUndecidedClass(ObjectInputFilter filter)_: 将传递的_filter_中的每个_UNDECIDED_返回映射为_REJECTED_，有一些例外情况
- _merge(ObjectInputFilter filter, ObjectInputFilter anotherFilter)_: 尝试测试两个过滤器，但在获得第一个_REJECTED_状态时返回_REJECTED_。它对_anotherFilter_也是空安全的，返回_filter_本身而不是一个新的组合过滤器

**注意：_rejectFilter()_和_allowFilter()_如果关于正在反序列化的类的元信息是_null_，则返回_UNDECIDED_。**

## 4. 构建我们的场景和设置

为了说明我们的反序列化过滤器工厂的工作，我们的场景将涉及一些在其他地方序列化的POJOs，并通过我们的应用程序中的几个不同的服务类进行反序列化。我们将使用这些来模拟我们可以阻止来自外部来源的潜在不安全反序列化的情况。最终，我们将学习如何定义参数以检测序列化内容中的意外属性。

让我们从我们的POJOs的标记接口开始：
```java
public interface ContextSpecific extends Serializable {}
```

首先，我们的_Sample_类将包含在反序列化期间可以通过_ObjectInputFilter_进行检查的基本属性，如数组和嵌套对象：
```java
public class Sample implements ContextSpecific, Comparable`<Sample>` {
    private static final long serialVersionUID = 1L;

    private int[] array;
    private String name;
    private NestedSample nested;

    public Sample(String name) {
        this.name = name;
    }

    public Sample(int[] array) {
        this.array = array;
    }

    public Sample(NestedSample nested) {
        this.nested = nested;
    }

    // 标准getter和setter

    @Override
    public int compareTo(Sample o) {
        if (name == null)
            return -1;

        if (o == null || o.getName() == null)
            return 1;

        return getName().compareTo(o.getName());
    }
}
```

我们只实现_Comparable_，以便稍后将实例添加到_TreeSet_中。这将帮助展示代码如何被间接执行。其次，我们将使用我们的_NestedSample_类来改变我们反序列化对象的深度，我们将使用它来设置对象图在反序列化之前可以有多深的限制：
```java
public class NestedSample implements ContextSpecific {

    private Sample optional;

    public NestedSample(Sample optional) {
        this.optional = optional;
    }

    // 标准getter和setter
}
```

**最后，让我们创建一个简单的利用示例来稍后过滤。它在其_toString()_和_compareTo()_方法中包含副作用，例如，可以被_TreeSet_间接调用，每次我们向其中添加项目时：**
```java
public class SampleExploit extends Sample {

    public SampleExploit() {
        super("exploit");
    }

    public static void maliciousCode() {
        System.out.println("exploit executed");
    }

    @Override
    public String toString() {
        maliciousCode();
        return "exploit";
    }

    @Override
    public int compareTo(Sample o) {
        maliciousCode();
        return super.compareTo(o);
    }
}
```

请注意，这个简单的例子仅用于说明目的，并不打算模仿现实世界的利用。

### 4.1. 序列化和反序列化工具

为了便于我们稍后的测试案例，让我们创建一些工具来序列化和反序列化我们的对象。我们从简单的序列化开始：
```java
public class SerializationUtils {

    public static void serialize(Object object, OutputStream outStream) throws IOException {
        try (ObjectOutputStream objStream = new ObjectOutputStream(outStream)) {
            objStream.writeObject(object);
        }
    }
}
```

**再次，为了帮助我们的测试，我们将创建一个方法，将所有未被拒绝的对象反序列化到一个集合中，以及一个_deserialize()_方法，它可以选择性地接收另一个过滤器：**
```java
public class DeserializationUtils {

    public static Object deserialize(InputStream inStream) {
        return deserialize(inStream, null);
    }
    public static Object deserialize(InputStream inStream, ObjectInputFilter filter) {
        try (ObjectInputStream in = new ObjectInputStream(inStream)) {
            if (filter != null) {
                in.setObjectInputFilter(filter);
            }
            return in.readObject();
        } catch (InvalidClassException e) {
            return null;
        }
    }

    public static Set```<ContextSpecific>``` deserializeIntoSet(InputStream... inputStreams) {
        return deserializeIntoSet(null, inputStreams);
    }

    public static Set```<ContextSpecific>``` deserializeIntoSet(
        ObjectInputFilter filter, InputStream... inputStreams) {
        Set```<ContextSpecific>``` set = new TreeSet<>();
        for (InputStream inputStream : inputStreams) {
            Object object = deserialize(inputStream, filter);
            if (object != null) {
                set.add((ContextSpecific) object);
            }
        }
        return set;
    }
}
```

**请注意，对于我们的场景，当发生_InvalidClassException_时，我们返回_null_。这种异常每次在任何过滤器拒绝反序列化时都会抛出。** 这样，我们就不会破坏_deserializeIntoSet()_，因为我们只对收集成功的反序列化感兴趣，而丢弃其他的。

### 4.2. 创建过滤器

在构建过滤器工厂之前，我们需要一些过滤器可供选择。**我们将使用_ObjectInputFilter.Config.createFilter()_创建一些简单的过滤器。它接收一个接受或拒绝的包的模式，以及在对象反序列化之前要检查的一些参数：**
```java
public class FilterUtils {

    private static final String DEFAULT_PACKAGE_PATTERN = "java.base/*;!*";
    private static final String POJO_PACKAGE = "com.baeldung.deserializationfilters.pojo";

    // ...
}
```

我们首先设置_DEFAULT_PACKAGE_PATTERN_，接受来自“java.base”模块的任何类，并拒绝其他所有。然后，我们设置_POJO_PACKAGE_，包含需要反序列化的应用程序中的类的包。

有了这些信息，让我们创建方法作为我们过滤器的基础。**使用_baseFilter()_，我们将接收我们想要检查的参数的名称，以及一个最大值：**
```java
private static ObjectInputFilter baseFilter(String parameter, int max) {
    return ObjectInputFilter.Config.createFilter(String.format(
        "%s=%d;%s.**;%s", parameter, max, POJO_PACKAGE, DEFAULT_PACKAGE_PATTERN));
}

// ...
```

使用_fallbackFilter()_，我们将创建一个更严格的过滤器，只接受_DEFAULT_PACKAGE_PATTERN_中的类。它将用于我们的服务类之外的反序列化：
```java
public static ObjectInputFilter fallbackFilter() {
    return ObjectInputFilter.Config.createFilter(String.format("%s", DEFAULT_PACKAGE_PATTERN));
}
```

**最后，让我们编写我们将用于限制读取字节数、我们对象中的数组大小以及反序列化时对象图的最大深度的过滤器：**
```java
public static ObjectInputFilter safeSizeFilter(int max) {
    return baseFilter("maxbytes", max);
}

public static ObjectInputFilter safeArrayFilter(int max) {
    return baseFilter("maxarray", max);
}

public static ObjectInputFilter safeDepthFilter(int max) {
    return baseFilter("maxdepth", max);
}
```

有了所有这些设置，我们准备开始编写我们的过滤器工厂。

## 5. 创建反序列化过滤器工厂

反序列化过滤器