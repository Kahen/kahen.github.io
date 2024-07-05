---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - Java
  - 迭代器
  - 自定义
head:
  - - meta
    - name: keywords
      content: Java, 迭代器, 自定义迭代器, 编程
---
# 创建自定义迭代器在Java中 | Baeldung

## 1. 引言

_Iterator`````````<E>`````````_ 是Java集合框架中的一个接口，它提供了允许遍历集合的方法。可以通过在集合（例如_List_, _Set_）上调用_iterator()_方法来获得_Iterator_实例，并逐个遍历元素。迭代器有三个核心方法来帮助遍历：

- _hasNext()_
- _next()_
- _remove()_

在本教程中，我们将看到如何引入自定义迭代器并在代码中使用它们。

## 2. 自定义迭代器的需求

在我们尝试编写迭代器版本之前，让我们先谈谈为什么首先需要创建一个。几乎所有的_Collection_接口，如_List_和_Set_，都有它们自己的迭代器版本。我们经常在代码中使用这些迭代器来满足我们的迭代需求：

```java
@Test
public void givenListOfStrings_whenIteratedWithDefaultIterator() {
    List````<String>```` listOfStrings = List.of("hello", "world", "this", "is", "a", "test");
    Iterator````<String>```` iterator = listOfStrings.iterator();
    Assert.assertTrue(iterator.hasNext());
    Assert.assertEquals(iterator.next(), "hello");
}
```

默认的迭代器版本仅用于线性遍历底层集合。使用_next()_方法从一个元素移动到下一个元素。我们不能使用默认迭代器对元素执行任何其他操作。以下是我们可能想要实现我们自己的迭代器的一些原因：

- 以自定义顺序遍历集合
- 在遍历时对集合的每个元素执行其他操作

## 3. 实现自定义迭代器

在本节中，我们将看看如何实现我们的自定义迭代器。我们可以为_List````<String>````_集合或任何自定义对象创建自定义迭代器。在我们的示例中，我们将使用一个简单的_Movie_类：

```java
public class Movie {
    private String name;
    private String director;
    private float rating;
    // 标准getter和setter
}
```

### 3.1. 内置数据类型的自定义迭代器

让我们考虑我们有一个_Strings_的_List_。**默认的_iterator()_只允许我们从左到右遍历给定列表。**然而，假设我们只想遍历列表中的元素，这些元素是回文性质的。回文字符串与其反转相同。

在这里，我们达到了默认迭代器实现的限制，我们必须开发我们自己的。**给定一个字符串列表，我们希望使用我们的自定义迭代器只遍历回文字符串。**

我们将调用我们的迭代器_PalindromIterator_。迭代器必须实现_Iterator`````````<E>`````````_接口，并提供抽象方法的实现：

```java
public class PalindromIterator implements Iterator````<String>```` {
    @Override
    public boolean hasNext() {
        // 编写自定义逻辑
    }

    @Override
    public String next() {
        // 编写自定义逻辑
    }
}
```

在我们考虑实现上述方法之前，让我们编写一个基本方法，它接受一个_String_并返回它是否是回文：

```java
private boolean isPalindrome(String input) {
    for (int i = 0; i < input.length() / 2; i++) {
        if (input.charAt(i) != input.charAt(input.length() - i - 1)) {
            return false;
        }
    }
    return true;
}
```

我们将使用一个_currentIndex_属性来跟踪迭代器的当前位置，并且我们需要一个_list_属性来保存我们的集合数据。

我们的_hasNext()_定义应该返回true，如果集合中至少还有另一个字符串，一个回文。为此，我们继续循环遍历给定列表，并检查我们是否遇到一个回文字符串。我们通过调用我们之前定义的_isPalindrome()_方法来实现这一点：

```java
@Override
public boolean hasNext() {
    while (currentIndex < list.size()) {
        String currString = list.get(currentIndex);
        if (isPalindrome(currString)) {
            return true;
        }
        currentIndex++;
    }
    return false;
}
```

**_next()_方法将执行列表中元素的实际遍历。我们将在方法内部增加_currentindex_并返回与它相关联的元素。**然而，我们只有在确定集合有下一个元素可到达时才这样做。如果做不到这一点，可能会导致_IndexOutOfBoundsException_。同样，如果我们到达列表的末尾并且没有更多的回文了，我们向调用者抛出一个_NoSuchElementException_：

```java
@Override
public String next() {
    if (!hasNext()) {
        throw new NoSuchElementException();
    }
    return list.get(currentIndex++);
}
```

让我们编写一个小测试来看看它是否有效：

```java
@Test
public void givenListOfStrings_whenPalindromIterator_thenOnlyPalindromes() {
    List````<String>```` listOfStrings = List.of("oslo", "madam", "car", "deed", "wow", "test");
    PalindromIterator palindromIterator = new PalindromIterator(listOfStrings);
    int count = 0;
    while(palindromIterator.hasNext()) {
        palindromIterator.next();
        count++;
    }
    assertEquals(count, 3);
}
```

### 3.2. 自定义对象的自定义_Iterator_

我们也可以为自定义类型的集合编写迭代器。**假设我们有一个_Movie_的_List_，我们要为我们的自定义迭代器编写。**我们希望我们的迭代器只遍历评分为8及以上的电影：

```java
private boolean isMovieEligible(Movie movie) {
    return movie.getRating() >= 8;
}
```

保持上述限制，我们编写_next()_和_hasNext()_的定义：

```java
public class CustomMovieIterator implements Iterator```<Movie>``` {
    private int currentIndex;
    private final List```<Movie>``` list;

    public CustomMovieIterator(List```<Movie>``` list) {
        this.list = list;
        this.currentIndex = 0;
    }

    @Override
    public boolean hasNext() {
        while (currentIndex < list.size()) {
            Movie currentMovie = list.get(currentIndex);
            if (isMovieEligible(currentMovie)) {
                return true;
            }
            currentIndex++;
        }
        return false;
    }

    @Override
    public Movie next() {
        if (!hasNext()) {
            throw new NoSuchElementException();
        }
        return list.get(currentIndex++);
    }
}
```

我们也添加一个简单的单元测试来验证迭代器：

```java
@Test
public void givenMovieList_whenMovieIteratorUsed_thenOnlyHighRatedMovies() {
    List```<Movie>``` movies = getMovies();
    CustomMovieIterator movieIterator = new CustomMovieIterator(movies);
    int count = 0;
    while (movieIterator.hasNext()) {
        movieIterator.next();
        count++;
    }
    assertEquals(4, movies.size());
    assertEquals(2, count);
}
```

### 3.3. 自定义_Collections_的自定义_Iterator_

我们知道Java允许我们创建自己的_Collection_。例如，我们可以实现一个_List`````````<E>`````````_接口的版本，并将其命名为_MyList`````````<E>`````````_。我们也可以定义我的所有_List_接口方法的版本，例如_add()_, _remove(), size()_, 和 _isEmpty()_：

```java
public class MyList`````````<E>````````` implements List`````````<E>````````` {
    @Override
    public int size() {
        // 自定义实现
    }

    @Override
    public boolean isEmpty() {
        // 自定义实现
    }

    @Override
    public boolean contains(Object o) {
        // 自定义实现
    }

    @Override
    public boolean add(E e) {
        // 自定义实现
    }

    @Override
    public boolean remove(Object o) {
        // 自定义实现
    }
}
```

**这也意味着我们可以提供我的_iterator()_实现，并返回一个我们特别为我们的_MyList`````````<E>`````````_编写的自定义迭代器的实例：**

```java
@Override
public Iterator`````````<E>````````` iterator() {
    return new MyListIterator();
}

private class MyListIterator implements Iterator`````````<E>````````` {
    @Override
    public boolean hasNext() {
        // 自定义实现
    }

    @Override
    public E next() {
        // 自定义实现
    }
}
```

上面的方法实现已被省略，以简洁起见。在我们的示例中，我们看了覆盖_next()_和_hasNext()_方法。然而，**我们可以扩展我们的自定义迭代器来覆盖_remove()_和_forEachRemaining()_方法。**

## 4. 结论

在本文中，我们研究了如何在Java中创建自定义迭代器并将其应用到我们的集合中。这让我们更好地控制我们如何遍历集合。虽然我们大部分提供了_List_集合的示例，但这可以扩展到实现_Iterable_接口的其他集合。

我们还研究了如何为自定义类和集合编写迭代器。

像往常一样，所有代码示例都可以在GitHub上找到。