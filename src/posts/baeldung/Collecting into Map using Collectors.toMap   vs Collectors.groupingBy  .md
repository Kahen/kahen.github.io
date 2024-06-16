---
date: 2024-06-16
category: 
  - Java
  - 编程
tag:
  - Java 8
  - Stream API
  - Collectors
---

# Java 8 中使用 Stream API 的 Collectors.toMap() 与 Collectors.groupingBy() 的比较

在 Java 编程中，处理集合和流是常见任务，特别是在现代的函数式编程范式中。Java 8 引入了 Stream API，为处理数据集合提供了强大的工具。

Stream API 中的两个基本的 Collector 是 Collectors.toMap() 和 Collectors.groupingBy()，它们在将 Stream 元素转换为 Map 方面有着不同的目的。

在本教程中，我们将深入探讨这两种 Collector 的差异，并探索每种 Collector 更适用的场景。

## 2. 城市示例

示例可以帮助我们说明问题。因此，让我们创建一个简单的不可变 POJO 类：

```java
class City {
    private final String name;
    private final String country;

    public City(String name, String country) {
        this.name = name;
        this.country = country;
    }

    // ... 省略了getters, equals(), 和 hashCode()方法
}
```

正如上面的代码所示，City 类只有两个属性：城市名称和城市所在的国家。

由于我们将在示例中使用 Collectors.toMap() 和 Collectors.groupingBy() 作为终端 Stream 操作，让我们创建一些 City 对象来为 Stream 提供数据：

```java
static final City PARIS = new City("Paris", "France");
static final City BERLIN = new City("Berlin", "Germany");
static final City TOKYO = new City("Tokyo", "Japan");
```

现在，我们可以轻松地从这些 City 实例创建一个 Stream：

```java
Stream.of(PARIS, BERLIN, TOKYO);
```

接下来，我们将使用 Collectors.toMap() 和 Collectors.groupingBy() 将 City 实例的 Stream 转换为 Map，并讨论这两种 Collector 的差异。

为了简单起见，我们将在教程中使用 "toMap()" 和 "groupingBy()" 来引用这两种 Collector，并使用单元测试断言来验证转换是否产生了预期的结果。

## 3. 以 City.country 作为键

首先，让我们探索 toMap() 和 groupingBy() Collector 的基本用法。我们将使用这两种 Collector 来转换 Stream。在转换后的 Map 结果中，我们将每个 City 的 country 作为键。

此外，键也可以是 null。因此，让我们创建一个 country 为 null 的 City：

```java
static final City COUNTRY_NULL = new City("Unknown", null);
```

### 3.1. 使用 toMap() Collector

toMap() 允许我们定义如何从输入 Stream 中的元素映射键和值。我们可以将 keyMapper 和 valueMapper 参数传递给 toMap() 方法。这两个参数都是函数，提供结果 Map 中的键和值。

如果我们希望 City 实例本身是结果中的值，并且想要得到一个 Map```````<String, City>```````，**我们可以使用 Function.identity() 作为 valueMapper**：

```java
Map```````<String, City>``````` result = Stream.of(PARIS, BERLIN, TOKYO)
  .collect(Collectors.toMap(City::getCountry, Function.identity()));

Map```````<String, City>``````` expected = Map.of(
  "France", PARIS,
  "Germany", BERLIN,
  "Japan", TOKYO
);

assertEquals(expected, result);
```

此外，**toMap() 即使 keyMapper 函数返回 null 也按预期工作**：

```java
Map```````<String, City>``````` result = Stream.of(PARIS, COUNTRY_NULL)
  .collect(Collectors.toMap(City::getCountry, Function.identity()));

Map```````<String, City>``````` expected = new HashMap```````<String, City>```````() {{
    put("France", PARIS);
    put(null, COUNTRY_NULL);
}};

assertEquals(expected, result);
```

### 3.2. 使用 groupingBy() Collector

**groupingBy() Collector 擅长根据指定的分类器函数将 Stream 元素分隔成组**。因此，结果 Map 中的值类型是一个 Collection。默认情况下，它是 List。

接下来，让我们按 City.country 对我们的 Stream 进行分组：

```java
Map````<String, List<City>````> result = Stream.of(PARIS, BERLIN, TOKYO)
  .collect(Collectors.groupingBy(City::getCountry));

Map````<String, List<City>````> expected = Map.of(
  "France", List.of(PARIS),
  "Germany", List.of(BERLIN),
  "Japan", List.of(TOKYO)
);

assertEquals(expected, result);
```

与 toMap() 不同，**groupingBy() 不能处理 null 作为分类器**：

```java
assertThrows(NullPointerException.class, () -> Stream.of(PARIS, COUNTRY_NULL)
  .collect(Collectors.groupingBy(City::getCountry)));
```

正如示例所示，**当分类器函数返回 null 时，它抛出 NullPointerException**。

我们已经通过示例探索了两种 Collector 的基本用法。然而，在我们的 Stream 中，City 实例之间没有重复的国家。在现实世界项目中，处理键冲突可能是我们需要解决的常见场景。

接下来，让我们看看这两种 Collector 如何处理重复键。

## 4. 当出现重复键时

让我们创建三个额外的城市：

```java
static final City NICE = new City("Nice", "France");
static final City AACHEN = new City("Aachen", "Germany");
static final City HAMBURG = new City("Hamburg", "Germany");
```

与之前生成的 City 实例一起，我们现在有具有重复国家的城市。例如，BERLIN、HAMBURG 和 AACHEN 有相同的国家："Germany"。

接下来，让我们探索 toMap() 和 groupingBy() Collector 如何处理重复键。

### 4.1. 使用 toMap() Collector

如果我们继续使用之前的方法，**只传递 keyMapper 和 valueMapper 给 toMap() Collector，由于存在重复键，会抛出 IllegalStateException**：

```java
assertThrows(IllegalStateException.class, () -> Stream.of(PARIS, BERLIN, TOKYO, NICE, HAMBURG, AACHEN)
    .collect(Collectors.toMap(City::getCountry, Function.identity())));
```

当可能出现重复键时，需要**提供 toMap() 的第三个参数 mergeFunction 来解决与同一键关联的值之间的冲突**。

接下来，让我们提供一个 lambda 表达式作为 toMap() 的 mergeFunction，它**在选择城市名称按字典顺序比较时选择“较小”的 City，当它们的国家相同**：

```java
Map```````<String, City>``````` result = Stream.of(PARIS, BERLIN, TOKYO, NICE, HAMBURG, AACHEN)
  .collect(Collectors.toMap(City::getCountry, Function.identity(), (c1, c2) ->
    c1.getName().compareTo(c2.getName()) < 0 ? c1 : c2));

Map```````<String, City>``````` expected = Map.of(
  "France", NICE, // <-- 来自 Paris 和 Nice
  "Germany", AACHEN, // <-- 来自 Berlin, Hamburg 和 Aachen
  "Japan", TOKYO
);

assertEquals(expected, result);
```

正如上述示例所示，mergeFunction 根据给定的规则返回一个 City 实例。因此，在调用 collect() 方法后，我们仍然获得一个 Map```````<String, City>``````` 作为结果。

### 4.2. 使用 groupingBy() Collector

另一方面，由于 groupingBy() 使用分类器将 Stream 元素分组到 Collection 中，**尽管输入 Stream 中的城市有相同的国家值，之前的代码仍然有效**：

```java
Map````<String, List<City>````> result = Stream.of(PARIS, BERLIN, TOKYO, NICE, HAMBURG, AACHEN)
  .collect(Collectors.groupingBy(City::getCountry));

Map````<String, List<City>````> expected = Map.of(
  "France", List.of(PARIS, NICE),
  "Germany", List.of(BERLIN, HAMBURG, AACHEN),
  "Japan", List.of(TOKYO)
);

assertEquals(expected, result);
```

正如我们所看到的，**具有相同国家名称的城市被分组到同一个 List 中**，这可以从结果中的 "France" 和 "Germany" 条目中看出。

## 5. 使用值映射器

到目前为止，我们已经使用 toMap() 和 groupingBy() Collector 获得了 country -> City 或 country -> City 实例集合的关联。

然而，有时我们可能需要将 Stream 元素映射到不同的值。例如，我们可能希望获得 country -> City.name 或 country -> City.name 值集合的关联。

此外，重要的是要注意映射的值可以是 null。因此，我们可能需要处理值为 null 的情况。让我们创建一个名称为 null 的 City：

```java
static final City FRANCE_NULL = new City(null, "France");
```

接下来，让我们探索如何将值映射器应用于 toMap() 和 groupingBy() Collector。

### 5.1. 使用 toMap() Collector

正如我们之前提到的，**我们可以将 valueMapper 函数作为第二个参数传递给 toMap() 方法，允许我们将输入 Stream 中的对象映射到不同的值**：

```java
MapString, String> result = Stream.of(PARIS, BERLIN, TOKYO)
  .collect(Collectors.toMap(City::getCountry, City::getName));

Map`<String, String>` expected = Map.of(
  "France", "Paris",
  "Germany", "Berlin",
  "Japan", "Tokyo"
);

assertEquals(expected, result);
```

在这个例子中，**我们使用方法引用 City::getName 作为 valueMapper 参数，将 City 映射到它的名称**。

然而，当映射的值包含 null 时，toMap() 遇到问题：

```java
assertThrows(NullPointerException.class, () -> Stream.of(PARIS, FRANCE_NULL)
  .collect(Collectors.toMap(City::getCountry, City::getName)));
```

正如我们所看到的，**如果映射的值包含 null，toMap() 抛出 NullPointerException**。

### 5.2. 使用 groupingBy() Collector

与 toMap() 不同，**groupingBy() 并不直接支持 valueMapper 函数作为其参数**。然而，我们可以**将另一个 Collector 作为第二个参数提供给 groupingBy()，允许我们执行下游的归约操作**。例如，我们可以使用 mapping() Collector 将分组的 City 实例映射到它们的名称：

```java
Map````<String, List<String>````> result = Stream.of(PARIS, BERLIN, TOKYO)
  .collect(Collectors.groupingBy(City::getCountry, mapping(City::getName, toList())));

Map````<String, List<String>````> expected = Map.of(
  "France", List.of("Paris"),
  "Germany", List.of("Berlin"),
  "Japan", List.of("Tokyo")
);

assertEquals(expected, result);
```

此外，**groupingBy() 和 mapping() 的组合可以无缝处理 null 值**：

```java
Map````<String, List<String>````> resultWithNull = Stream.of(PARIS, BERLIN, TOKYO, FRANCE_NULL)
  .collect(Collectors.groupingBy(City::getCountry, mapping(City::getName, toList())));

Map````<String, List<String>````> expectedWithNull = Map.of(
  "France", newArrayList("Paris", null),
  "Germany", newArrayList("Berlin"),
  "Japan", List.of("Tokyo")
);

assertEquals(expectedWithNull, resultWithNull);
```

## 6. 结论

正如我们在本文中所看到的，Collectors.toMap() 和 Collectors.groupingBy() 是功能强大的 Collector，每种都服务于不同的目的。

**toMap() 适合将 Stream 直接转换为 Map，而 groupingBy() 擅长根据某些标准将 Stream 元素分类到组中**。

此外，toMap() 即使 keyMapper 函数返回 null 也能正常工作。但是，**如果分类器函数返回 null，groupingBy() 会抛出 NullPointerException**。

由于 toMap() 支持 valueMapper 参数，它非常方便地将值映射到所需的类型。然而，重要的是要注意，**如果 valueMapper 函数返回 null，toMap() 会抛出 NullPointerException**。相比之下，**groupingBy() 依赖其他 Collector 将 Stream 元素映射到不同类型，并且它有效地处理 null 值**。

通过理解它们的差异和用例，我们可以有效地在 Java 应用程序中使用这些 Collector 来操作和处理数据流。

如常，示例的完整源代码可在 GitHub 上获取。

文章发布后 30 天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。

OK