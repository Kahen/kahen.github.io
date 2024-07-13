---
date: 2022-04-01
category:
  - Java
  - Stream API
tag:
  - TreeSet
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java Stream API, TreeSet, Java 8, 排序集合
---
# 使用Stream收集到TreeSet

## 1. 概述

Java 8中一个重要的新特性是Stream API。Streams允许我们方便地从不同的来源（如数组或集合）处理元素。

进一步地，使用Stream.collect()方法和相应的Collectors，我们可以将元素重新打包到不同的数据结构中，如Set、Map、List等。

在本教程中，我们将探讨如何将Stream中的元素收集到TreeSet中。

## 2. 使用自然排序收集到TreeSet

简单来说，TreeSet是一个排序后的Set。TreeSet中的元素使用它们的自然排序或提供的Comparator进行排序。

我们首先看看如何使用它们的自然排序收集Stream元素。然后，让我们关注使用自定义Comparator的情况。

为了简化，我们将使用单元测试断言来验证我们是否得到了预期的TreeSet结果。

### 2.1. 将字符串收集到TreeSet

由于String实现了Comparable接口，让我们首先以String为例，看看如何将它们收集到TreeSet中：

```java
String kotlin = "Kotlin";
String java = "Java";
String python = "Python";
String ruby = "Ruby";
TreeSet`<String>` myTreeSet = Stream.of(ruby, java, kotlin, python).collect(Collectors.toCollection(TreeSet::new));
assertThat(myTreeSet).containsExactly(java, kotlin, python, ruby);
```

正如上面的测试所示，要将Stream元素收集到TreeSet，只需将TreeSet的默认构造函数作为方法引用或Lambda表达式传递给Collectors.toCollection()方法即可。

如果执行此测试，它会通过。

接下来，让我们看看一个自定义类的类似示例。

### 2.2. 按自然排序收集玩家

首先，让我们看看我们的Player类：

```java
public class Player implements Comparable````<Player>```` {
    private String name;
    private int age;
    private int numberOfPlayed;
    private int numberOfWins;

    public Player(String name, int age, int numberOfPlayed, int numberOfWins) {
        this.name = name;
        this.age = age;
        this.numberOfPlayed = numberOfPlayed;
        this.numberOfWins = numberOfWins;
    }

    @Override
    public int compareTo(Player o) {
        return Integer.compare(age, o.age);
    }

    // 省略getters
}
```

如上类所示，我们的Player类实现了Comparable接口。进一步地，我们在compareTo()方法中定义了它的自然排序：玩家的年龄。

所以接下来，让我们创建几个Player实例：

```java
/*                          name  |  age  | num of played | num of wins
                           --------------------------------------------- */
Player kai = new Player("Kai", 26, 28, 7);
Player eric = new Player("Eric", 28, 30, 11);
Player saajan = new Player("Saajan", 30, 100, 66);
Player kevin = new Player("Kevin", 24, 50, 49);
```

由于我们将在稍后的演示中使用这四个玩家对象，我们将代码以表格格式放置，以便轻松检查每个玩家的属性值。

现在，让我们将它们收集到TreeSet中，并按自然顺序验证我们是否获得了预期的结果：

```java
TreeSet````<Player>```` myTreeSet = Stream.of(saajan, eric, kai, kevin).collect(Collectors.toCollection(TreeSet::new));
assertThat(myTreeSet).containsExactly(kevin, kai, eric, saajan);
```

正如我们所看到的，代码与将字符串收集到TreeSet非常相似。由于Player的compareTo()方法指定了“年龄”属性作为其自然排序，我们验证结果（myTreeSet）以年龄升序排列的玩家。

值得一提的是，我们使用了AssertJ的containsExactly()方法来验证TreeSet是否精确包含按顺序排列的给定元素，且没有其他元素。

接下来，我们将看看如何使用自定义Comparator将这些玩家收集到TreeSet中。

## 3. 使用自定义Comparator收集到TreeSet

我们已经看到Collectors.toCollection(TreeSet::new)允许我们将Stream中的元素以自然排序收集到TreeSet中。TreeSet还提供了一个接受Comparator对象作为参数的构造函数：

```java
public TreeSet(Comparator`<? super E>` comparator) { ... }
```

因此，如果我们希望TreeSet对元素应用不同的排序，我们可以创建一个Comparator对象并将其传递到上面提到的构造函数中。

接下来，让我们按他们的胜利次数而不是年龄将这些玩家收集到TreeSet中：

```java
TreeSet````<Player>```` myTreeSet = Stream.of(saajan, eric, kai, kevin)
  .collect(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparingInt(Player::getNumberOfWins))));
assertThat(myTreeSet).containsExactly(kai, eric, kevin, saajan);
```

这次，我们使用Lambda表达式创建了TreeSet实例。此外，我们使用Comparator.comparingInt()将我们自己的Comparator传递给了TreeSet的构造函数。

Player::getNumberOfWins引用了我们需要比较玩家的属性值。

当我们运行测试时，它会通过。

然而，所需的比较逻辑有时并不像示例所示那样简单，只是比较属性值。例如，我们可能需要比较一些额外计算的结果。

所以最后，让我们再次将这些玩家收集到TreeSet中。但这次，我们希望他们按胜率（胜利次数/比赛次数）排序：

```java
TreeSet````<Player>```` myTreeSet = Stream.of(saajan, eric, kai, kevin)
  .collect(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(player ->
    BigDecimal.valueOf(player.getNumberOfWins())
    .divide(BigDecimal.valueOf(player.getNumberOfPlayed()), 2, RoundingMode.HALF_UP)))));
assertThat(myTreeSet).containsExactly(kai, eric, saajan, kevin);
```

正如上面的测试所示，我们使用了Comparator.comparing(Function keyExtractor)方法来指定可比较的排序键。在这个例子中，keyExtractor函数是一个Lambda表达式，它计算了玩家的胜率。

此外，如果我们运行测试，它会通过。所以我们得到了预期的TreeSet。

## 4. 结论

在本文中，我们通过示例讨论了如何通过自然排序和自定义比较器将Stream中的元素收集到TreeSet中。

和往常一样，示例的完整源代码可在GitHub上获得。