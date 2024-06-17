由于网络原因，我无法解析提供的链接。请检查链接的有效性并确保网络连接正常。如果链接有效且网络无误，请再次发送链接，我将尝试解析并翻译。---
date: 2024-06-17
category:
  - Java
  - PriorityQueue
tag:
  - Java
  - PriorityQueue
  - Pair
  - Comparator
---

# 如何在Java中使用Pair与PriorityQueue | Baeldung

优先队列是最强大数据结构之一。它在企业应用中不常见，但我们经常在编码挑战和算法实现中使用它。

在本教程中，我们将学习如何使用比较器（Comparators）与优先队列（PriorityQueues）以及如何改变这些队列中的排序顺序。然后我们将检查一个更通用的例子，使用自定义类，并了解如何将类似的逻辑应用到Pair类。

对于Pair类，我们将使用Apache Commons的实现。然而，有多种选项可供选择，我们可以选择最适合我们需求的那个。

首先，让我们讨论数据结构本身。这个结构的主要超能力是在将元素推入队列时保持它们的顺序。

然而，像其他队列一样，它不提供访问队列内元素的API。我们只能访问队列前面的元素。

同时，我们有几种方法可以从队列中移除元素：removeAt()和removeEq()。我们还可以使用AbstractCollection中的几种方法。虽然有帮助，但它们不提供对元素的随机访问。

### 3. 排序
正如之前提到的，优先队列的主要特点是它保持元素的顺序。与后进先出/先进先出不同，顺序不取决于插入的顺序。

因此，我们应该对队列中元素的顺序有一个大致的了解。我们可以使用可比较（Comparable）的元素，或者在创建队列时提供一个自定义的比较器（Comparator）。

因为我们有两种选项，参数化不需要元素实现可比较接口。让我们检查以下类：

```java
public class Book {
    private final String author;
    private final String title;
    private final int publicationYear;

    // 构造函数和getter方法
}
```

用不可比较的对象参数化队列是不正确的，但不会抛出异常：

```java
@ParameterizedTest
@MethodSource("bookProvider")
void givenBooks_whenUsePriorityQueueWithoutComparatorWithoutAddingElements_thenNoExcetption(List``````<Book>`````` books) {
    PriorityQueue``````<Book>`````` queue = new PriorityQueue<>();
    assertThat(queue).isNotNull();
}
```

同时，如果我们尝试将这样的元素推入队列，它将无法识别它们的自然顺序并抛出ClassCastException：

```java
@ParameterizedTest
@MethodSource("bookProvider")
void givenBooks_whenUsePriorityQueueWithoutComparator_thenThrowClassCastExcetption(List``````<Book>`````` books) {
    PriorityQueue``````<Book>`````` queue = new PriorityQueue<>();
    assertThatExceptionOfType(ClassCastException.class).isThrownBy(() -> queue.addAll(books));
}
```

这是处理这种情况的常用方法。Collections.sort()在尝试排序不可比较的元素时的行为类似。**我们应该考虑这一点，因为它不会发出任何编译时错误。**

### 4. 比较器
正如之前提到的，我们可以用两种不同的方式确定队列的顺序：实现可比较接口或在初始化队列时提供一个比较器。

#### 4.1. 可比较接口
当元素具有自然排序的概念，并且我们不需要为队列显式提供它时，可比较接口非常有用。让我们以会议类（Meeting）为例：

```java
public class Meeting implements Comparable {
    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final String title;

    // 构造函数，getter方法，equals和hashCode

    @Override
    public int compareTo(Meeting meeting) {
        return this.startTime.compareTo(meeting.startTime);
    }
}
```

在这种情况下，一般顺序将是会议的开始时间。这不是一个严格的要求，不同的领域可以有不同的自然顺序概念，但对于我们的示例来说已经足够好了。

我们可以直接使用会议类，无需我们额外的工作：

```java
@Test
void givenMeetings_whenUseWithPriorityQueue_thenSortByStartDateTime() {
    Meeting projectDiscussion = new Meeting(
      LocalDateTime.parse("2025-11-10T19:00:00"),
      LocalDateTime.parse("2025-11-10T20:00:00"),
      "Project Discussion"
    );
    Meeting businessMeeting = new Meeting(
      LocalDateTime.parse("2025-11-15T14:00:00"),
      LocalDateTime.parse("2025-11-15T16:00:00"),
      "Business Meeting"
    );
    PriorityQueue`<Meeting>` meetings = new PriorityQueue<>();
    meetings.add(projectDiscussion);
    meetings.add(businessMeeting);

    assertThat(meetings.poll()).isEqualTo(projectDiscussion);
    assertThat(meetings.poll()).isEqualTo(businessMeeting);
}
```

然而，如果我们想要偏离默认排序，我们应该提供一个自定义的比较器。

#### 4.2. 比较器
在创建一个新的优先队列时，我们可以将一个比较器传递给构造函数，并确定我们想要使用的顺序。以书籍类（Book）为例。它之前创建了问题，因为它没有实现可比较接口或提供自然排序。

假设我们想要按年份排序我们的书籍以创建一个阅读列表。我们想先读旧的，以更深入地了解科幻思想的发展，同时也理解之前出版的书籍的影响：

```java
@ParameterizedTest
@MethodSource("bookProvider")
void givenBooks_whenUsePriorityQueue_thenSortThemBySecondElement(List``````<Book>`````` books) {
    PriorityQueue``````<Book>`````` queue = new PriorityQueue<>(Comparator.comparingInt(Book::getPublicationYear));
    queue.addAll(books);
    Book previousBook = queue.poll();
    while (!queue.isEmpty()) {
        Book currentBook = queue.poll();
        assertThat(previousBook.getPublicationYear())
          .isLessThanOrEqualTo(currentBook.getPublicationYear());
        previousBook = currentBook;
    }
}
```

在这里，我们使用方法引用来创建一个比较器，该比较器将书籍按年份排序。我们可以将书籍添加到我们的阅读队列中，并首先选择旧的书籍。

### 5. 对
在检查了自定义类的示例之后，使用对（Pairs）与优先队列是一个简单的任务。通常，使用上没有区别。**让我们考虑我们的对包含标题和出版年份：**

```java
@ParameterizedTest
@MethodSource("pairProvider")
void givenPairs_whenUsePriorityQueue_thenSortThemBySecondElement(List``<Pair````<String, Integer>``````> pairs) {
    PriorityQueue``<Pair````<String, Integer>``````> queue = new PriorityQueue<>(Comparator.comparingInt(Pair::getSecond));

    queue.addAll(pairs);
    Pair````<String, Integer>```` previousEntry = queue.poll();
    while (!queue.isEmpty()) {
        Pair````<String, Integer>```` currentEntry = queue.poll();
        assertThat(previousEntry.getSecond()).isLessThanOrEqualTo(currentEntry.getSecond());
        previousEntry = currentEntry;
    }
}
```

**正如我们所看到的，最后两个例子几乎相同。**唯一的区别是我们的比较器使用了对类。在这个例子中，我们使用了Apache Commons的对实现。然而，还有很多其他选项。

此外，如果我们的代码库中没有其他选项，或者我们不想添加新的依赖项，我们可以使用Map.Entry：

```java
@ParameterizedTest
@MethodSource("mapEntryProvider")
void givenMapEntries_whenUsePriorityQueue_thenSortThemBySecondElement(List<Map.Entry````<String, Integer>````> pairs) {
    PriorityQueue<Map.Entry````<String, Integer>````> queue = new PriorityQueue<>(Comparator.comparingInt(Map.Entry::getValue));

    queue.addAll(pairs);
    Map.Entry````<String, Integer>```` previousEntry = queue.poll();
    while (!queue.isEmpty()) {
        Map.Entry````<String, Integer>```` currentEntry = queue.poll();
        assertThat(previousEntry.getValue()).isLessThanOrEqualTo(currentEntry.getValue());
        previousEntry = currentEntry;
    }
}
```

同时，我们可以轻松地创建一个新的类来表示一个对。**可选地，我们可以使用数组或由Object参数化的List，但不建议这样做，因为这会破坏类型安全性。**

对和优先队列的组合对于图遍历算法来说非常常见，比如Dijkstra算法。其他语言，如JavaScript和Python，可以即时创建数据结构。相比之下，Java需要一些初始设置，使用额外的类或接口。

### 6. 结论
优先队列是一个优秀的数据结构，用于实现更高效、更简单的算法。它允许使用比较器进行定制，以便我们可以提供基于我们领域需求的任何排序规则。

**将优先队列和对结合起来，可以帮助我们编写更健壮、更易于理解的代码。**然而，它通常被认为是一个更高级的数据结构，并非所有开发人员都熟悉其API。

如常，所有的代码都可以在GitHub上找到。

发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表格。

OK