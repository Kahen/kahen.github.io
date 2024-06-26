---
date: 2024-06-26
category:
  - Java
  - Gson
tag:
  - JSON
  - Exception
head:
  - - meta
    - name: keywords
      content: Java, Gson, JSON, Exception, 解决, 异常
---
# 解决Gson的“多个JSON字段”异常

Google Gson是一个在Java中用于JSON数据绑定的有用且灵活的库。在大多数情况下，Gson可以在不进行修改的情况下对现有类执行数据绑定。然而，某些类结构可能会导致难以调试的问题。

一个有趣且可能令人困惑的异常是IllegalArgumentException，它抱怨有多个字段定义：

```
java.lang.IllegalArgumentException: 类`<YourClass>`声明了多个名为`<yourField>`的JSON字段 ...
```

这可能特别令人困惑，因为Java编译器不允许同一个类中的多个字段共享一个名称。在本教程中，我们将讨论这种异常的原因，并学习如何绕过它。

### 2. 异常原因

这种异常的潜在原因与类结构或配置有关，这些在序列化（或反序列化）类时会使Gson解析器感到困惑。

#### 2.1. @SerializedName冲突

Gson提供了@SerializedName注解，允许操作序列化对象中的字段名称。这是一个有用的特性，但它可能导致冲突。

例如，让我们创建一个简单的类，BasicStudent：

```java
public class BasicStudent {
    private String name;
    private String major;
    @SerializedName("major")
    private String concentration;
    // 通用的getter, setter等。
}
```

在序列化期间，Gson将尝试使用“major”来表示major和concentration，导致上述IllegalArgumentException：

```
java.lang.IllegalArgumentException: 类BasicStudent声明了多个名为'major'的JSON字段；
冲突是由字段BasicStudent#major和BasicStudent#concentration引起的
```

异常消息指向问题字段，问题可以通过简单地更改或删除注解或重命名字段来解决。

Gson还提供了其他排除字段的选项，我们将在本教程后面讨论。

首先，让我们看看这种异常的另一个原因。

#### 2.2. 类继承层次结构

**类继承也可能是序列化到JSON时问题的来源**。为了探讨这个问题，我们需要更新我们的学生数据示例。

让我们定义两个类，StudentV1和StudentV2，StudentV2扩展了StudentV1并添加了额外的成员变量：

```java
public class StudentV1 {
    private String firstName;
    private String lastName;
    // 通用的getter, setter等。
}

public class StudentV2 extends StudentV1 {
    private String firstName;
    private String lastName;
    private String major;
    // 通用的getter, setter等。
}
```

值得注意的是，StudentV2不仅扩展了StudentV1，还定义了自己的一组变量，其中一些与StudentV1中的重复。虽然这不是最佳实践，但对我们的示例至关重要，也是我们在现实世界中使用第三方库或遗留包时可能遇到的情况。

让我们创建一个StudentV2的实例并尝试序列化它。我们可以创建一个单元测试来确认IllegalArgumentException被抛出：

```java
@Test
public void givenLegacyClassWithMultipleFields_whenSerializingWithGson_thenIllegalArgumentExceptionIsThrown() {
    StudentV2 student = new StudentV2("Henry", "Winter", "Greek Studies");

    Gson gson = new Gson();
    assertThatThrownBy(() -> gson.toJson(student))
      .isInstanceOf(IllegalArgumentException.class)
      .hasMessageContaining("declares multiple JSON fields named 'firstName'");
}
```

与上面的@SerializedName冲突类似，**Gson在类层次结构中遇到重复名称时不知道使用哪个字段**。

### 3. 解决方案

有几种解决这个问题的方法，每种方法都有其优缺点，提供了不同级别的序列化控制。

#### 3.1. 将字段标记为transient

控制哪些字段被序列化的最简单方法是使用transient字段修饰符。我们可以更新上面的BasicStudent：

```java
public class BasicStudent {
    private String name;
    private transient String major;
    @SerializedName("major")
    private String concentration;

    // 通用的getter, setter等。
}
```

让我们创建一个单元测试，在这种变化后尝试序列化：

```java
@Test
public void givenBasicStudent_whenSerializingWithGson_thenTransientFieldNotSet() {
    BasicStudent student = new BasicStudent("Henry Winter", "Greek Studies", "Classical Greek Studies");

    Gson gson = new Gson();
    String json = gson.toJson(student);

    BasicStudent deserialized = gson.fromJson(json, BasicStudent.class);
    assertThat(deserialized.getMajor()).isNull();
}
```

序列化成功，并且major字段的值没有包含在反序列化实例中。

尽管这是一种简单的解决方案，但这种方法有两个缺点。添加transient意味着该字段将从所有序列化中排除，包括基本的Java序列化。这种方法还假设BasicStudent可以被修改，这可能并不总是可能的。

#### 3.2. 使用Gson的@Expose注解进行序列化

如果问题类可以修改，我们想要一种仅针对Gson序列化的方法，我们可以利用@Expose注解。这个注解告诉Gson在序列化、反序列化或两者期间应该暴露哪些字段。

我们可以更新我们的StudentV2实例，明确地只向Gson暴露它的字段：

```java
public class StudentV2 extends StudentV1 {
    @Expose
    private String firstName;
    @Expose
    private String lastName;
    @Expose
    private String major;

    // 通用的getter, setter等。
}
```

如果我们再次运行代码，什么都不会改变，我们仍然会看到异常。**默认情况下，当遇到@Expose时，Gson不会改变其行为** - 我们需要告诉解析器该怎么做。

让我们更新我们的单元测试，使用GsonBuilder创建一个实例，该实例排除没有@Expose的字段：

```java
@Test
public void givenStudentV2_whenSerializingWithGsonExposeAnnotation_thenSerializes() {
    StudentV2 student = new StudentV2("Henry", "Winter", "Greek Studies");

    Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    String json = gson.toJson(student);
    assertThat(gson.fromJson(json, StudentV2.class)).isEqualTo(student);
}
```

序列化和反序列化现在都成功了。@Expose的好处是它仍然是一种简单的解决方案，而且只影响Gson序列化（只有在我们配置解析器以识别它时）。

这种方法仍然假设我们可以编辑源代码。它也不提供太多的灵活性 - 我们关心的所有字段都需要被注解，其余的都从序列化和反序列化中排除。

#### 3.3. 使用Gson的ExclusionStrategy进行序列化

幸运的是，当我们不能更改源类或者我们需要更多的灵活性时，Gson提供了一个解决方案：_ExclusionStrategy_。

这个接口告诉Gson在序列化或反序列化期间如何排除字段，并允许更复杂的业务逻辑。我们可以声明一简单的_ExclusionStrategy_实现：

```java
public class StudentExclusionStrategy implements ExclusionStrategy {
    @Override
    public boolean shouldSkipField(FieldAttributes field) {
        return field.getDeclaringClass() == StudentV1.class;
    }

    @Override
    public boolean shouldSkipClass(Class`<?>` aClass) {
        return false;
    }
}
```

_ExclusionStrategy_接口有两个方法：shouldSkipField()在单个字段级别提供细粒度控制，shouldSkipClass()控制是否应该跳过某个类型所有字段。在上面的例子中，我们开始简单，跳过所有来自StudentV1的字段。

就像@Expose一样，我们需要告诉Gson如何使用这个策略。让我们在我们的测试中配置它：

```java
@Test
public void givenStudentV2_whenSerializingWithGsonExclusionStrategy_thenSerializes() {
    StudentV2 student = new StudentV2("Henry", "Winter", "Greek Studies");

    Gson gson = new GsonBuilder().setExclusionStrategies(new StudentExclusionStrategy()).create();

    assertThat(gson.fromJson(gson.toJson(student), StudentV2.class)).isEqualTo(student);
}
```

值得注意的是，我们使用setExclusionStrategies()配置了解析器 - 这意味着我们的策略在序列化和反序列化中都被使用。

如果我们想要更灵活地应用_ExclusionStrategy_，我们可以以不同的方式配置解析器：

```java
// 仅在序列化期间排除
Gson gson = new GsonBuilder().addSerializationExclusionStrategy(new StudentExclusionStrategy()).create();

// 仅在反序列化期间排除
Gson gson = new GsonBuilder().addDeserializationExclusionStrategy(new StudentExclusionStrategy()).create();
```

这种方法比我们的其他两种解决方案稍微复杂一些：我们需要声明一个新的类，并更多地考虑什么使一个字段重要以包含。我们为这个例子保持了_ExclusionStrategy_中的业务逻辑相当简单，但这种方法的优点是更丰富和更强大的字段排除。**最后，我们不需要更改StudentV2或StudentV1中的代码**。

### 4. 结论

在本文中，我们讨论了在使用Gson时可能遇到的棘手但最终可以修复的IllegalArgumentException的原因。

我们发现，根据我们对简单性、粒度和灵活性的需求，我们可以实施各种解决方案。

像往常一样，所有的代码都可以在GitHub上找到。