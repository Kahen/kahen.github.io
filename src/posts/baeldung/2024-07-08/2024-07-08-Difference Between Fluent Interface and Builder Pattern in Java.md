---
date: 2022-04-01
category:
  - Java
  - 设计模式
tag:
  - Fluent Interface
  - Builder Pattern
head:
  - - meta
    - name: keywords
      content: Java, Fluent Interface, Builder Pattern, 设计模式
---
# Fluent Interface与Builder模式在Java中的区别

在本教程中，我们将讨论Fluent Interface设计模式，并将其与Builder模式进行比较。在探索Fluent Interface模式时，我们会意识到Builder只是其中一种可能的实现方式。从这里开始，我们可以深入探讨设计Fluent API的最佳实践，包括不可变性和接口分离原则等考虑因素。

**Fluent Interface是一种面向对象的API设计，它允许我们以一种可读和直观的方式链式调用方法。** 要实现它，我们需要声明返回同一类对象的方法。结果，我们将能够将多个方法调用链式起来。这种模式经常用于构建DSL（领域特定语言）。

例如，Java8的_Stream API_使用了Fluent Interface模式，并允许用户以一种非常声明性的方式操作数据流。让我们看一个简单的例子，观察每一步之后，都会返回一个新的_Stream_：

```java
Stream`<Integer>` numbers = Stream.of(1,3,4,5,6,7,8,9,10);

Stream`<String>` processedNumbers = numbers.distinct()
  .filter(nr -> nr % 2 == 0)
  .skip(1)
  .limit(4)
  .map(nr -> "#" + nr)
  .peek(nr -> System.out.println(nr));

String result = processedNumbers.collect(Collectors.joining(", "));
```

正如我们所注意到的，首先我们需要创建实现Fluent API模式的对象，在我们的例子中，这是通过静态方法_Stream.of()_实现的。之后，我们通过其公共API进行操作，我们可以注意到每个方法都返回同一个类。我们以一个返回不同类型结束链式调用的方法结束。在我们的例子中，这是一个返回_String_的_Collector_。

### 建造者设计模式

**建造者模式是一种创建型设计模，它将复杂对象的构建与其表示分离。** _Builder_类实现了Fluent Interface模式，并允许逐步创建对象。

让我们看看建造者模式的一个简单用法：

```java
User.Builder userBuilder = User.builder();

userBuilder = userBuilder
  .firstName("John")
  .lastName("Doe")
  .email("jd@gmail.com")
  .username("jd_2000")
  .id(1234L);

User user = userBuilder.build();
```

我们应该能够识别出前面例子中讨论的所有步骤。Fluent Interface设计模式是通过_User.Builder_类实现的，该类是通过_User.builder()_方法创建的。之后，我们链式调用多个方法，指定_User_的各个属性，每个步骤都返回相同的类型：_User.Builder_。最后，我们通过_build()_方调用来退出Fluent Interface，该方法实例化并返回_User_。**因此，我们可以肯定地说，建造者模式是Fluent API模式的唯一可能实现。**

### 不可变性

**如果我们想用Fluent Interface创建一个对象，我们需要考虑不可变性方面。** 上一节中的_User.Builder_不是一个不可变对象，它正在改变其内部状态，总是返回同一个实例——它自己：

```java
public static class Builder {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private Long id;

    public Builder firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public Builder lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    // 其他方法

    public User build() {
         return new User(firstName, lastName, email, username, id);
    }
}
```

另一方面，只要它们具有相同的类型，每次返回一个新实例也是可能的。让我们创建一个用于生成HTML的具有Fluent API的类：

```java
public class HtmlDocument {
    private final String content;

    public HtmlDocument() {
        this("");
    }

    public HtmlDocument(String html) {
        this.content = html;
    }

    public String html() {
        return format("```<html>```%s```</html>```", content);
    }

    public HtmlDocument header(String header) {
        return new HtmlDocument(format("%s ``<h1>``%s``</h1>``", content, header));
    }

    public HtmlDocument paragraph(String paragraph) {
        return new HtmlDocument(format("%s ```<p>```%s```</p>```", content, paragraph));
    }

    public HtmlDocument horizontalLine() {
        return new HtmlDocument(format("%s ``<hr>``", content));
    }

    public HtmlDocument orderedList(String... items) {
        String listItems = stream(items).map(el -> format("`````<li>`````%s`````</li>`````", el)).collect(joining());
        return new HtmlDocument(format("%s ``<ol>``%s``</ol>``", content, listItems));
    }
}
```

在这种情况下，我们将通过直接调用构造函数来获得我们的Fluent类实例。大多数方法都返回一个_HtmlDocument_并符合模式。我们可以使用_html()_方法来结束链式调用并获得结果_String_：

```java
HtmlDocument document = new HtmlDocument()
  .header("Principles of O.O.P.")
  .paragraph("OOP in Java.")
  .horizontalLine()
  .paragraph("The main pillars of OOP are:")
  .orderedList("Encapsulation", "Inheritance", "Abstraction", "Polymorphism");
String html = document.html();

assertThat(html).isEqualToIgnoringWhitespace(
  "```<html>```"
  +  "``<h1>``Principles of O.O.P.``</h1>``"
  +  "```<p>```OOP in Java.```</p>```"
  +  "``<hr>``"
  +  "```<p>```The main pillars of OOP are:```</p>```"
  +  "``<ol>``"
  +     "`````<li>`````Encapsulation`````</li>`````"
  +     "`````<li>`````Inheritance`````</li>`````"
  +     "`````<li>`````Abstraction`````</li>`````"
  +     "`````<li>`````Polymorphism`````</li>`````"
  +  "``</ol>``"
  + "```</html>```"
);
```

此外，由于_HtmlDocument_是不可变的，链中的每个方法调用将导致一个新的实例。换句话说，如果我们向文档添加一个段落，那么带标题的文档将变成一个不同的对象：

```java
HtmlDocument document = new HtmlDocument()
  .header("Principles of O.O.P.");
HtmlDocument updatedDocument = document
  .paragraph("OOP in Java.");

assertThat(document).isNotEqualTo(updatedDocument);
```

### 接口分离原则

**接口分离原则，即SOLID中的“I”，教导我们避免使用大型接口。要完全遵守此原则，我们的API客户端不应依赖于它从未使用过的任何方法。**

当我们构建Fluent接口时，我们必须注意我们的API的公共方法数量。我们可能会被诱惑添加越来越多的方法，结果是一个巨大的对象。例如，_Stream API_有40多个公共方法。让我们看看我们的Fluent _HtmlDocument_的公共API如何演变。为了保持前一个例子，我们将在这一部分创建一个新的类：

```java
public class LargeHtmlDocument {
    private final String content;
    // 构造函数

    public String html() {
        return format("```<html>```%s```</html>```", content);
    }
    public LargeHtmlDocument header(String header) { ... }
    public LargeHtmlDocument headerTwo(String header) { ... }
    public LargeHtmlDocument headerThree(String header) { ... }
    public LargeHtmlDocument headerFour(String header) { ... }

    public LargeHtmlDocument unorderedList(String... items) { ... }
    public LargeHtmlDocument orderedList(String... items) { ... }

    public LargeHtmlDocument div(Object content) { ... }
    public LargeHtmlDocument span(Object content) { ... }
    public LargeHtmlDocument paragraph(String paragraph) { ... }
    public LargeHtmlDocument horizontalLine() { ...}
    // 其他方法
}
```

有许多方法可以保持接口更小。其中之一是将方法分组，并通过小的、内聚的对象组成_HtmlDocument_。例如，我们可以将我们的API限制为三个方法：_head(), body(),_ 和 _footer()_，并使用对象组合来创建文档。注意这些小对象本身也暴露了一个Fluent API。

```java
String html = new LargeHtmlDocument()
  .head(new HtmlHeader(Type.PRIMARY, "title"))
  .body(new HtmlDiv()
    .append(new HtmlSpan()
      .paragraph("learning OOP from John Doe")
      .append(new HorizontalLine())
      .paragraph("The pillars of OOP:")
    )
    .append(new HtmlList(ORDERED, "Encapsulation", "Inheritance", "Abstraction", "Polymorphism"))
  )
  .footer(new HtmlDiv()
    .paragraph("trademark John Doe")
  )
  .html();
```

### 结论

在这篇文章中，我们学习了Fluent API设计。我们探讨了建造者模式只是Fluent Interface模式的一种实现方式。然后，我们更深入地探讨了Fluent API，并讨论了不可变性问题。最后，我们解决了大型接口问题，并学习了如何分割我们的API以符合接口分离原则。

本文使用的全部代码可以在GitHub上找到。