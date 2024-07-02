---
date: 2024-07-02
category:
  - Java
  - HashMap
tag:
  - HashMap
  - Java
head:
  - - meta
    - name: keywords
      content: Java, HashMap, 键值对, 修改键
---
# 如何在Java的HashMap中修改键？

在Java中，HashMap是一种广泛使用的数据结构，它以键值对的形式存储元素，提供了快速的数据访问和检索。有时在使用HashMap时，我们可能想要修改现有条目的键。

在本教程中，我们将探讨如何在Java中的HashMap修改键。

## 2. 使用remove()然后put()

首先，让我们看看HashMap是如何存储键值对的。HashMap内部使用Node类型来维护键值对：

```java
static class Node``<K,V>`` implements Map.Entry``<K,V>`` {
    final int hash;
    final K key;
    V value;
    ...
}
```

如我们所见，键声明有final关键字。因此，我们不能在将键对象放入HashMap后重新分配它。

虽然我们不能简单地替换一个键，但我们仍然可以通过其他方式实现我们期望的结果。接下来，让我们从不同的角度来看我们的问题。

假设我们在HashMap中有一个条目K1 -> V，现在我们想将K1更改为K2，以得到K2 -> V。实际上，实现这一点的最直接想法是找到K1的条目，并将键K1替换为K2。然而，我们也可以通过移除K1 -> V的关联，并添加一个新的K2 -> V条目来实现。

Map接口提供了remove(key)方法，通过其键从映射中移除一个条目。此外，remove()方法返回从映射中移除的值。

接下来，让我们通过一个例子来看看这种方法是如何工作的。为了简单起见，我们将使用单元测试断言来验证结果是否符合我们的预期：

```java
Map`<String, Integer>` playerMap = new HashMap<>();
playerMap.put("Kai", 42);
playerMap.put("Amanda", 88);
playerMap.put("Tom", 200);
```

上面的简单代码显示了一个HashMap，它保存了一些球员名字（String）及其得分（Integer）的关联。接下来，让我们将条目"Kai" -> 42中的"Kai"替换为"Eric"：

```java
// 用Eric替换Kai
playerMap.put("Eric", playerMap.remove("Kai"));

assertFalse(playerMap.containsKey("Kai"));
assertTrue(playerMap.containsKey("Eric"));
assertEquals(42, playerMap.get("Eric"));
```

如我们所见，单行语句playerMap.put("Eric", playerMap.remove("Kai"));做了两件事。它移除了键为"Kai"的条目，取出其值（42），并添加了一个新的"Eric" -> 42条目。

当我们运行测试时，它通过了。所以这种方法按预期工作。

虽然我们的问题解决了，但有一个潜在的问题。我们知道HashMap的键是一个final变量。所以我们不能重新分配变量。但我们可以通过修改final对象的值来解决问题吗？嗯，在我们的playerMap例子中，键是String。我们不能改变它的值，因为String是不可变的。但如果键是一个可变对象，我们能通过修改键来解决问题吗？

接下来，让我们找出答案。

## 3. 永远不要在HashMap中修改键

首先，我们不应该在Java的HashMap中使用可变对象作为键，这可能导致潜在的问题和意外的行为。

这是因为HashMap中的键对象用于计算一个哈希码，该哈希码决定了相应值将被存储的桶。如果键是可变的并且在用作HashMap中的键后被更改，哈希码也可能改变。结果，我们将无法正确地检索与键关联的值，因为它将位于错误的桶中。

接下来，让我们通过一个例子来理解它。

首先，我们创建一个只有一个属性name的Player类：

```java
class Player {
    private String name;
    public Player(String name) {
        this.name = name;
    }

    // getter和setter方法省略
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Player)) {
            return false;
        }
        Player player = (Player) o;
        return name.equals(player.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
```

如我们所见，Player类有一个name属性的setter。所以它是可变的。此外，hashCode()方法使用name属性来计算哈希码。这意味着改变Player对象的name可以使它具有不同的哈希码。

接下来，我们创建一个映射并使用Player对象作为键添加一些条目：

```java
Map`<Player, Integer>` myMap = new HashMap<>();
Player kai = new Player("Kai");
Player tom = new Player("Tom");
Player amanda = new Player("Amanda");
myMap.put(kai, 42);
myMap.put(amanda, 88);
myMap.put(tom, 200);
assertTrue(myMap.containsKey(kai));
```

接下来，让我们将球员kai的名字从"Kai"更改为"Eric"，然后验证我们是否能得到预期的结果：

```java
// 将Kai的名字更改为Eric
kai.setName("Eric");
assertEquals("Eric", kai.getName());
Player eric = new Player("Eric");
assertEquals(eric, kai);

// 现在，映射中既不包含Kai也不包含Eric：
assertFalse(myMap.containsKey(kai));
assertFalse(myMap.containsKey(eric));
```

如上述测试所示，将kai的名字更改为"Eric"后，我们无法再使用kai或eric检索条目"Eric" -> 42。然而，对象Player("Eric")作为键存在于映射中：

```java
// 尽管Player("Eric")存在：
long ericCount = myMap.keySet()
  .stream()
  .filter(player -> player.getName()
    .equals("Eric"))
  .count();
assertEquals(1, ericCount);
```

要理解为什么会这样，我们首先需要了解HashMap的工作原理。

HashMap维护一个内部哈希表来存储键的哈希码，当它们被添加到映射中时。一个哈希码引用一个映射条目。当我们检索一个条目，例如，使用get(key)方法，HashMap计算给定键对象的哈希码，并在哈希表中查找该哈希码。

在上面的例子中，我们将kai("Kai")放入映射中。因此，哈希码是基于字符串"Kai"计算的。HashMap存储了结果，比如说"hash-kai"，在哈希表中。后来，我们将kai("Kai")更改为kai("Eric")。当我们尝试使用kai("Eric")检索条目时，HashMap计算"hash-eric"作为哈希码。然后，它在哈希表中查找它。当然，它找不到。

不难想象，如果我们在真实应用中这样做，这种意外行为的根本原因可能很难找到。

因此，我们不应该在HashMap中使用可变对象作为键。此外，我们永远不应该修改键。

## 4. 结论

在本文中，我们学习了使用"remove()然后put()"方法来替换HashMap中的键。此外，我们通过一个例子讨论了为什么我们应该避免在HashMap中使用可变对象作为键，以及为什么我们永远不应该在HashMap中修改键。

如往常一样，示例的完整源代码可在GitHub上找到。