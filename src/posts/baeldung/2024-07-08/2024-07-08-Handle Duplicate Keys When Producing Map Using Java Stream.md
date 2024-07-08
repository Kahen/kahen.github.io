---
date: 2024-07-08
category:
  - Java
  - Stream API
tag:
  - Map
  - Duplicate Keys
  - Java Stream
head:
  - - meta
    - name: keywords
      content: Java, Stream API, Map, Duplicate Keys, Handling, Tutorial
---

# 使用Java Stream生成Map时处理重复键

## 1. 概述

在使用Java Stream生成Map时，可能会遇到重复键的问题。这可能会导致向Map中添加值时出现问题，因为与键关联的先前值可能会被覆盖。

在本教程中，我们将讨论在使用Stream API生成Map时如何处理重复键。

## 2. 问题介绍

像往常一样，我们通过示例来理解问题。假设我们有一个City类：

```java
class City {
    private String name;
    private String locatedIn;

    public City(String name, String locatedIn) {
        this.name = name;
        this.locatedIn = locatedIn;
    }

    // 省略getter方法
    // 省略equals()和hashCode()方法
    // ...
}
```

如上类代码所示，City是一个具有两个字符串属性的POJO类。一个是城市名称。另一个提供了更多关于城市所在地的信息。

此外，该类覆盖了equals()和hashCode()方法。这两个方法检查name和locatedIn属性。为了简单起见，我们没有在代码片段中放入方法的实现。

接下来，我们创建一个City实例列表：

```java
final List``<City>`` CITY_INPUT = Arrays.asList(
  new City("New York City", "USA"),
  new City("Shanghai", "China"),
  new City("Hamburg", "Germany"),
  new City("Paris", "France"),
  new City("Paris", "Texas, USA"));
```

如上代码所示，我们从数组初始化一个List``<City>``以兼容旧版本的Java。CITY_INPUT列表包含五个城市。让我们关注我们打包到列表中的最后两个城市：

- new City("Paris", "France")
- new City("Paris", "Texas, USA")

两个城市都有相同的名称，"Paris"。然而，它们不同的locatedIn值告诉我们这两个Paris实例是不同的城市。

现在，假设我们想使用CITY_INPUT列表中的城市名称作为键来生成一个Map。显然，两个Paris城市将具有相同的键。

接下来，让我们看看如何在使用Java Stream API生成map时处理重复键。

为了简单起见，我们将使用单元测试断言来验证每种解决方案是否生成了预期的结果。

## 3. 使用groupingBy()方法生成Map``<Key, List<Value>``>

处理map中重复键的一个想法是使键关联一个集合中的多个值，例如Map<String, List``<City>``>。一些流行的库提供了MultiMap类型，例如Guava的Multimap和Apache Commons MultiValuedMap，以更轻松地处理多值映射。

在本教程中，我们将坚持使用标准Java API。因此，我们将使用groupingBy()收集器生成Map<String, List``<City>``>结果，因为groupingBy()方法可以根据某些属性作为键对对象进行分组，并将对象存储在Map实例中：

```java
Map<String, List``<City>``> resultMap = CITY_INPUT.stream()
  .collect(groupingBy(City::getName));

assertEquals(4, resultMap.size());
assertEquals(Arrays.asList(new City("Paris", "France"), new City("Paris", "Texas, USA")),
  resultMap.get("Paris"));
```

如上测试所示，由groupingBy()收集器生成的map结果包含四个条目。此外，两个“Paris”城市实例被分组在键“Paris”下。

因此，使用多值映射方法可以解决键重复问题。然而，这种方法返回Map<String, List``<City>``>。如果我们要求Map````<String, City>````作为返回类型，我们就不能再将具有重复键的对象一起分组到集合中了。

接下来，让我们看看在这种情况下如何处理重复键。

## 4. 使用toMap()方法和处理重复键

Stream API提供了toMap()收集器方法，将流收集到Map中。

此外，toMap()方法允许我们指定一个合并函数，该函数将用于组合与重复键关联的值。

例如，我们可以使用一个简单的lambda表达式来忽略如果它们的名称已经被收集的后一个City对象：

```java
Map````<String, City>```` resultMap1 = CITY_INPUT.stream()
  .collect(toMap(City::getName, Function.identity(), (first, second) -> first));

assertEquals(4, resultMap1.size());
assertEquals(new City("Paris", "France"), resultMap1.get("Paris"));
```

如上测试所示，由于法国的Paris在输入列表中先于德克萨斯州的Paris，结果map只包含法国的Paris城市。

或者，如果我们想要在出现重复键时总是覆盖map中的现有条目，我们可以调整lambda表达式以返回第二个City对象：

```java
Map````<String, City>```` resultMap2 = CITY_INPUT.stream()
  .collect(toMap(City::getName, Function.identity(), (first, second) -> second));

assertEquals(4, resultMap2.size());
assertEquals(new City("Paris", "Texas, USA"), resultMap2.get("Paris"));
```

如果运行测试，它将通过。所以这次，键“Paris”关联的是德克萨斯州的Paris。

当然，在实际项目中，我们可能有比简单地跳过或覆盖更复杂的要求。我们总是可以在合并函数中实现所需的合并逻辑。

最后，让我们再看一个将两个“Paris”城市的locatedIn属性合并为一个新的City实例，并将这个新合并的Paris实例放入map结果的例子：

```java
Map````<String, City>```` resultMap3 = CITY_INPUT.stream()
  .collect(toMap(City::getName, Function.identity(), (first, second) -> {
      String locations = first.getLocatedIn() + " and " + second.getLocatedIn();
      return new City(first.getName(), locations);
  }));

assertEquals(4, resultMap2.size());
assertEquals(new City("Paris", "France and Texas, USA"), resultMap3.get("Paris"));
```

## 5. 结论

在本文中，我们探讨了在使用Stream API生成Map结果时处理重复键的两种方法：

- groupingBy() - 创建类型为Map``<Key, List<Value>``>的Map结果
- mapTo() - 允许我们在合并函数中实现合并逻辑

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。

OK