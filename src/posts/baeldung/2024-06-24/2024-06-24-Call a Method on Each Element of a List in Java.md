---
date: 2024-06-24
category:
  - Java
  - 编程
tag:
  - Java 8
  - 流式API
  - 列表操作
head:
  - - meta
    - name: keywords
      content: Java, 列表操作, 方法调用, 流式API
------
# 在Java中对列表的每个元素调用方法

当我们在Java中工作时，无论是处理Java 8之前的代码还是采用Java 8及更高版本中的Stream API的功能性优雅，对列表中的每个元素调用方法是一项基本操作。

在本教程中，我们将探索可用于对列表元素调用方法的方法和技术。

### 2. 问题介绍

像往常一样，让我们通过一个例子快速理解问题。假设我们有一个_玩家_类：

```java
class Player {
    private int id;
    private String name;
    private int score;

    public Player(int id, String name, int score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

   // getter和setter方法省略
}
```

然后，让我们初始化一个_玩家_列表作为我们的输入：

```java
List`<Player>` PLAYERS = List.of(
  new Player(1, "Kai", 42),
  new Player(2, "Eric", 43),
  new Player(3, "Saajan", 64),
  new Player(4, "Kevin", 30),
  new Player(5, "John", 5)
);
```

假设我们想要在_PLAYERS_列表中的每个玩家上执行一个方法。然而，这个需求可以有两种场景：

- **对每个元素执行操作，不关心返回值**，例如打印每个玩家的名字
- 方法返回结果，有效地**将输入列表转换为另一个列表**，例如从_PLAYERS_中提取玩家名字到一个新的_List````<String>````_

在本教程中，我们将讨论这两种场景。此外，我们将看到如何在Java 8之前和Java 8+中实现它们。

接下来，让我们看看它们是如何工作的。

### 3. 传统方法（Java 8之前）

在Java 8之前，**循环是当我们想要在列表中的每个元素上调用方法时的基础技术**。然而，一些外部库可能提供方便的方法，使我们能够更有效地解决问题。

接下来，让我们仔细看看它们。

#### 3.1. 对每个元素执行操作

**循环遍历元素并调用方法可以是执行每个元素上的操作的最直接解决方案**：

```java
for (Player p : PLAYERS) {
    log.info(p.getName());
}
```

如果我们在运行上述_for_循环后检查控制台，我们将看到日志输出。每个玩家的名字都被打印出来了：

```
21:14:47.219 [main] INFO ... - Kai
21:14:47.220 [main] INFO ... - Eric
21:14:47.220 [main] INFO ... - Saajan
21:14:47.220 [main] INFO ... - Kevin
21:14:47.220 [main] INFO ... - John
```

#### 3.2. 转换为另一个列表

同样，如果我们想要通过调用_player.getName()_来提取玩家的名字，**我们可以先声明一个空的字符串列表，并在循环中添加每个玩家的名字**：

```java
List````<String>```` names = new ArrayList<>();
for (Player p : PLAYERS) {
    names.add(p.getName());
}
assertEquals(Arrays.asList("Kai", "Eric", "Saajan", "Kevin", "John"), names);
```

#### 3.3. 使用Guava的_transform()_方法

另外，我们可以使用Guava的_Lists.transform()_方法来应用列表转换。

使用Guava库的第一步是将依赖项添加到我们的_pom.xml_：

```xml
`<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`32.1.3-jre`</version>`
`</dependency>`
```

Guava的最新版本可以在这里检查。

然后，我们可以使用_Lists.transform()_方法：

```java
List````<String>```` names = Lists.transform(PLAYERS, new Function``<Player, String>``() {
    @Override
    public String apply(Player input) {
        return input.getName();
    }
});

assertEquals(Arrays.asList("Kai", "Eric", "Saajan", "Kevin", "John"), names);
```

正如上面的代码所示，**我们将一个匿名的_Function``<Player, String>``_对象传递给了transform()方法**。当然，我们必须在_Function`<F, T>`_接口中实现_apply()_方法，以**执行从F（Player）到T（String）的转换逻辑**。

### 4. Java 8及更高版本：流式API

流式API是在Java 8中引入的，它为集合的操作提供了一种方便的方式。接下来，让我们看看我们的问题如何在Java 8+中解决。

#### 4.1. 对每个元素执行操作

在Java 8中，_forEach()_方法是_Iterable_接口中的一个新方法：

```java
default void forEach(Consumer`<? super T>` action) {
    Objects.requireNonNull(action);
    for (T t : this) {
        action.accept(t);
    }
}
```

正如我们所看到的，**_forEach()_包装了循环实现，使调用者端的代码更容易阅读**。

由于_Iterable_是_Collection_接口的超类型，_forEach()_**在所有**_Collection_**类型中都可用**，例如_List_和_Set_。

**_forEach()_方法期望一个_Consumer_对象作为参数**。它非常适合对列表的每个元素执行操作。例如，让我们运行以下代码行：

```java
PLAYERS.forEach(player -> log.info(player.getName()));
```

我们看到预期的输出被打印出来：

```
21:14:47.223 [main] INFO ... - Kai
21:14:47.223 [main] INFO ... - Eric
21:14:47.224 [main] INFO ... - Saajan
21:14:47.224 [main] INFO ... - Kevin
21:14:47.224 [main] INFO ... - John
```

在上面的代码中，我们将一个lambda表达式作为_Consumer_对象传递给了_forEach()_方法。

#### 4.2. 转换为另一个列表

**要通过应用特定函数转换列表中的元素，并将这些修改后的元素收集到一个新的列表中，可以使用_Stream.map()_方法**。当然，我们必须首先调用_stream()_将我们的列表转换为_Stream_，并使用_collect()_收集转换后的元素：

```java
List````<String>```` names = PLAYERS.stream()
  .map(Player::getName)
  .collect(Collectors.toList());
assertEquals(List.of("Kai", "Eric", "Saajan", "Kevin", "John"), names);
```

正如我们所看到的，与Guava的_Lists.transform()_相比，_Stream.map()_方法更加流畅，更容易理解。

值得注意的是，我们传递给_map()_方法的“_Player::getName_”是一个方法引用。如果我们将方法引用替换为这个lambda表达式：“_player -> player.getName()_”，它同样有效。

### 5. 结论

在本文中，我们探讨了在列表的每个元素上调用方法的两种场景。我们深入研究了解决这一挑战的各种解决方案，考虑了Java 8之前和Java 8及更高版本的情况。

一如既往，示例的完整源代码可以在GitHub上找到。