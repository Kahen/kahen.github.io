---
date: 2024-07-25
category:
  - Java
  - HashMap
tag:
  - Java 8
  - 更新键值
head:
  - - meta
    - name: keywords
      content: Java, HashMap, 更新值, 键值对
---
# 在HashMap中更新与给定键关联的值

这篇文章将介绍在Java的HashMap中更新与给定键关联的值的不同方法。首先，我们将查看Java 8之前可用的一些常见解决方案。然后，我们将查看Java 8及以上版本中可用的一些额外解决方案。

## 2. 初始化我们的示例HashMap

为了展示如何在HashMap中更新值，我们首先需要创建并填充一个。因此，我们将创建一个以水果为键，它们的价格为值的映射：

```java
Map`<String, Double>` priceMap = new HashMap<>();
priceMap.put("apple", 2.45);
priceMap.put("grapes", 1.22);
```

我们将在整个示例中使用这个HashMap。现在，我们已经准备好熟悉更新HashMap键关联值的方法了。

## 3. Java 8之前

让我们从Java 8之前可用的方法开始。

### 3.1. put方法

put方法可以更新值或添加新条目。如果使用已存在的键，则put方法将更新关联的值。否则，它将添加一个新的(key, value)对。

让我们通过两个快速示例来测试这个方法的行为：

```java
@Test
public void givenFruitMap_whenPuttingAList_thenHashMapUpdatesAndInsertsValues() {
    Double newValue = 2.11;
    fruitMap.put("apple", newValue);
    fruitMap.put("orange", newValue);

    Assertions.assertEquals(newValue, fruitMap.get("apple"));
    Assertions.assertTrue(fruitMap.containsKey("orange"));
    Assertions.assertEquals(newValue, fruitMap.get("orange"));
}

```

键apple已经在映射中。因此，第一个断言将会通过。

由于orange在映射中不存在，put方法将添加它。因此，其他两个断言也将通过。

### 3.2. containsKey和put方法的组合

containsKey和put方法的组合是另一种在HashMap中更新键的值的方法。这个选项检查映射是否已经包含一个键。如果是这样，我们可以使用put方法更新值。否则，我们可以向映射中添加一个条目或什么都不做。

在我们的例子中，我们将通过一个简单的测试来检查这种方法：

```java
@Test
public void givenFruitMap_whenKeyExists_thenValuesUpdated() {
    double newValue = 2.31;
    if (fruitMap.containsKey("apple")) {
        fruitMap.put("apple", newValue);
    }

    Assertions.assertEquals(Double.valueOf(newValue), fruitMap.get("apple"));
}
```

由于apple在映射中，containsKey方法将返回true。因此，将执行对put方法的调用，并将更新值。

## 4. Java 8及以上

从Java 8开始，许多新方法可用于简化在HashMap中更新键的值的过程。让我们来了解它们。

### 4.1. replace方法

自版本8以来，Map接口中有两个重载的replace方法。让我们看看方法签名：

```java
public V replace(K key, V value);
public boolean replace(K key, V oldValue, V newValue);
```

第一个replace方法只接受一个键和一个新值。它还返回旧值。

让我们看看这个方法是如何工作的：

```java
@Test
public void givenFruitMap_whenReplacingOldValue_thenNewValueSet() {
    double newPrice = 3.22;
    Double applePrice = fruitMap.get("apple");

    Double oldValue = fruitMap.replace("apple", newPrice);

    Assertions.assertNotNull(oldValue);
    Assertions.assertEquals(oldValue, applePrice);
    Assertions.assertEquals(Double.valueOf(newPrice), fruitMap.get("apple"));
}
```

键apple的值将使用replace方法更新为新价格。因此，第二个和第三个断言将会通过。

然而，第一个断言很有趣。如果我们的HashMap中没有apple这个键怎么办？如果我们尝试更新一个不存在的键的值，将返回null。考虑到这一点，另一个问题出现了：如果有一个键的值为null怎么办？我们无法知道从replace方法返回的值确实是提供键的值，还是我们尝试更新了一个不存在的键的值。

为了避免误解，我们可以使用第二个replace方法。它接受三个参数：

- 一个键
- 与键关联的当前值
- 要与键关联的新值

它将在一个条件下更新键的值到一个新值：如果第二个参数是当前值，键的值将更新为一个新值。该方法返回true表示成功更新。否则，返回false。

让我们实现一些测试来检查第二个replace方法：

```java
@Test
public void givenFruitMap_whenReplacingWithRealOldValue_thenNewValueSet() {
    double newPrice = 3.22;
    Double applePrice = fruitMap.get("apple");

    boolean isUpdated = fruitMap.replace("apple", applePrice, newPrice);

    Assertions.assertTrue(isUpdated);
}

@Test
public void givenFruitMap_whenReplacingWithWrongOldValue_thenNewValueNotSet() {
    double newPrice = 3.22;
    boolean isUpdated = fruitMap.replace("apple", Double.valueOf(0), newPrice);

    Assertions.assertFalse(isUpdated);
}
```

由于第一个测试使用当前键的值调用replace方法，该值将被替换。

另一方面，第二个测试没有使用当前值调用。因此，返回false。

### 4.2. getOrDefault和put方法的组合

如果我们没有为提供的键设置条目，getOrDefault方法是一个完美的选择。在这种情况下，我们为不存在的键设置默认值。然后，该条目被添加到映射中。

这种方法可以让我们轻松避免NullPointerException。

让我们尝试使用一个原本不在映射中的键来使用这种组合：

```java
@Test
public void givenFruitMap_whenGetOrDefaultUsedWithPut_thenNewEntriesAdded() {
    fruitMap.put("plum", fruitMap.getOrDefault("plum", 2.41));

    Assertions.assertTrue(fruitMap.containsKey("plum"));
    Assertions.assertEquals(Double.valueOf(2.41), fruitMap.get("plum"));
}
```

由于没有这样的键，getOrDefault方法将返回默认值。然后，put方法将添加一个新的(key, value)对。因此，所有的断言都会通过。

### 4.3. putIfAbsent方法

putIfAbsent方法与前面的getOrDefault和put方法的组合相同。

如果HashMap中没有提供键的对，putIfAbsent方法将添加该对。但是，如果有这样的对，putIfAbsent方法不会更改映射。

但有一个例外：如果现有的对有一个null值，那么这个对将被更新为一个新值。

让我们实现putIfAbsent方法的测试。我们将用两个示例来测试它的行为：

```java
@Test
public void givenFruitMap_whenPutIfAbsentUsed_thenNewEntriesAdded() {
    double newValue = 1.78;
    fruitMap.putIfAbsent("apple", newValue);
    fruitMap.putIfAbsent("pear", newValue);

    Assertions.assertTrue(fruitMap.containsKey("pear"));
    Assertions.assertNotEquals(Double.valueOf(newValue), fruitMap.get("apple"));
    Assertions.assertEquals(Double.valueOf(newValue), fruitMap.get("pear"));
}
```

键apple在映射中。putIfAbsent方法不会更改它的当前值。

同时，键pear不在映射中。因此，它将被添加。

### 4.4. compute方法

compute方法根据作为第二个参数提供的BiFunction更新键的值。如果映射中不存在该键，我们可以预期一个NullPointerException。

让我们通过一个简单的测试来检查这个方法的行为：

```java
@Test
public void givenFruitMap_whenComputeUsed_thenValueUpdated() {
    double oldPrice = fruitMap.get("apple");
    BiFunction`<Double, Integer, Double>` powFunction = (x1, x2) -> Math.pow(x1, x2);

    fruitMap.compute("apple", (k, v) -> powFunction.apply(v, 2));

    Assertions.assertEquals(
      Double.valueOf(Math.pow(oldPrice, 2)), fruitMap.get("apple"));

    Assertions.assertThrows(
      NullPointerException.class, () -> fruitMap.compute("blueberry", (k, v) -> powFunction.apply(v, 2)));
}
```

正如预期的那样，由于键apple存在，映射中的值将被更新。另一方面，没有键blueberry，所以最后一个断言中的compute方法的第二个调用将导致一个NullPointerException。

### 4.5. computeIfAbsent方法

前面的方法是如果HashMap中没有特定键的对就会抛出异常。computeIfAbsent方法将通过添加一个(key, value)对来更新映射，如果它不存在的话。

让我们测试这个方法的行为：

```java
@Test
public void givenFruitMap_whenComputeIfAbsentUsed_thenNewEntriesAdded() {
    fruitMap.computeIfAbsent("lemon", k -> Double.valueOf(k.length()));

    Assertions.assertTrue(fruitMap.containsKey("lemon"));
    Assertions.assertEquals(Double.valueOf("lemon".length()), fruitMap.get("lemon"));
}
```

键lemon不在映射中。因此，computeIfAbsent方法将添加一个条目。

### 4.6. compute