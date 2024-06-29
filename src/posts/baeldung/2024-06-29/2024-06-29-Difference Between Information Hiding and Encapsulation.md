---
date: 2022-04-01
category:
  - Software Engineering
  - Java
tag:
  - Information Hiding
  - Encapsulation
head:
  - - meta
    - name: keywords
      content: Java, Information Hiding, Encapsulation, OOP
---
# 信息隐藏与封装的区别 | Baeldung

封装是面向对象编程的一个基本范式。它允许将数据和方法在类中组合在一起。然而，封装本身并不能保证防御性编程。

为了实现健壮性，我们采用了信息隐藏。信息隐藏是一种编程原则，它提倡限制对内部实现细节的访问。

在本教程中，我们将探讨封装和信息隐藏的细节。此外，我们将查看一些示例代码并理解这两个概念之间的主要区别。

## 2. 历史背景

**1972年，Parnas首次提出“信息隐藏”一词，试图区分过程式编程和模块化编程。**

Parnas推断，数据的实现应对外部模块不可见。

此外，在1973年，Zelis提出了封装一词，以解释如何减少对类中底层数据的访问，以防止不必要的修改。

**1978年，Parnas声称封装和信息隐藏是同义词。然而，在2001年，Paul Roger通过示例代码展示了封装和信息隐藏之间的区别。他声称我们可以有封装而没有信息隐藏。**

封装是面向对象编程中的一个广泛概念，它将数据与操作数据的方法捆绑在一起。这确保了模块化设计。

封装和信息隐藏有时被用作同义词，但它们之间存在一些差异。

根据Paul Roger的说法，**封装仅仅是将数据与操作数据的操作捆绑在一起。**

### 3.1. 没有封装

让我们看一个没有封装的示例类：

```java
class Book {
    public String author;
    public int isbn;
}
```

这里，《Book》类为其字段使用了公共访问修饰符。这使得字段可以从外部类访问。

让我们创建另一个名为《BookDetails》的类，以获取《Book》对象的详细信息：

```java
class BookDetails {
    public String bookDetails(Book book) {
        return "author name: " + book.author + " ISBN: " + book.isbn;
    }
}
```

《BookDetails》类包含一个方法，该方法使用《Book》数据。在这里，我们将《Book》类视为数据容器，将《BookDetails》视为对数据执行操作的方法集合。

我们使用一种编程程序，强制创建一个实现类，该类操作来自另一个类的数据。这种编程风格是过时的，它不是模块化的。

以下是获取一本书详细信息的单元测试：

```java
@Test
void givenUnencapsulatedClass_whenImplementationClassIsSeparate_thenReturnResult() {
    Book myBook = new Book();
    myBook.author = "J.K Rowlings";
    myBook.isbn = 67890;
    BookDetails details = new BookDetails();
    String result = details.bookDetails(myBook);
    assertEquals("author name: " + myBook.author + " ISBN: " + myBook.isbn, result);
}
```

以上实现可以通过封装来简化。《Book》类的更改会影响使用《Book》数据的任何类。

### 3.2. 有封装

让我们使用封装改进上一节的设计。我们可以将数据和操作它的捆绑到一个单独的类中：

```java
class BookEncapsulation {
    public String author;
    public int isbn;
    public BookEncapsulation(String author, int isbn) {
        this.author = author;
        this.isbn = isbn;
    }
    public String getBookDetails() {
        return "author name: " + author + " ISBN: " + isbn;
    }
}
```

在这里，我们通过将实现与类捆绑在一起来改进代码。这使得代码模块化。客户端可以轻松调用《getBookDetails()》方法，而无需对其实现有太多了解。

让我们看看调用《getBookDetails()》的单元测试：

```java
@Test
void givenEncapsulatedClass_whenDataIsNotHidden_thenReturnResult() {
    BookEncapsulation myBook = new BookEncapsulation("J.K Rowlings", 67890);
    String result = myBook.getBookDetails();
    assertEquals("author name: " + myBook.author + " ISBN: " + myBook.isbn, result);
}
```

封装改进了代码，但外部类可以修改《Book》数据，因为字段使用了公共访问修饰符。然而，**封装没有严格规定使用哪种访问修饰符**。我们可以使用公共、私有受保护的访问修饰符。

此外，**封装有助于在不破坏使用类的外部代码的情况下向类引入功能**。让我们通过引入一个《id》来修改《BookEncapsulation》类：

```java
// ...
public int id = 1;
public BookEncapsulation(String author, int isbn) {
    this.author = author;
    this.isbn = isbn;
}
public String getBookDetails() {
    return "author id: " + id + " author name: " + author + " ISBN: " + isbn;
}
// ...
```

在这里，我们引入了《id》字段，并修改了《getBookDetails()》返回的详细信息。这些内部更改不会破坏任何客户端代码。这使得封装功能强大且模块化。

**然而，我们可以通过应用“信息隐藏”的概念来使封装更加严格**。封装本身对于防御性编程是不够的。我们需要将信息隐藏与封装结合使用，以防止不必要的数据修改。

## 4. 信息隐藏

信息隐藏是一种编程原则，旨在**防止直接修改类的内部数据**。此外，它提供了访问和修改类数据的严格指南。

**此外，它有助于隐藏设计实现细节，特别是那些可能会改变的设计实现细节**。

此外，当信息隐藏与封装一起使用时，确保了模块化代码。

让我们通过应用信息隐藏来改进封装的类：

```java
class BookInformationHiding {
    private String author;
    private int isbn;
    private int id = 1;

    public BookInformationHiding(String author, int isbn) {
        setAuthor(author);
        setIsbn(isbn);
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public int getIsbn() {
        return isbn;
    }
    public void setIsbn(int isbn) {
        this.isbn = isbn;
    }
    public String getBookDetails() {
        return "author id: " + id + " author name: " + author + " ISBN: " + isbn;
    }
}
```

在这里，我们使用私有访问修饰符来限制外部类对字段的访问和修改。此外，我们创建了getter和setter来设置字段如何被访问和修改。

**与没有信息隐藏的封装不同，后者可以使用任何访问修饰符，信息隐藏是通过使用私有访问修饰符来实现的**。限制了只有类内部才能访问字段。

字段不能直接从客户端代码访问，从而使其更加健壮。

让我们看看修改后的类的单元测试：

```java
@Test
void givenEncapsulatedClass_whenDataIsHidden_thenReturnResult() {
    BookInformationHiding myBook = new BookInformationHiding("J.K Rowlings", 67890);
    String result = myBook.getBookDetails();
    assertEquals("author id: " + 1 + " author name: " + myBook.getAuthor() + " ISBN: " + myBook.getIsbn(), result);
}
```

此外，我们可以创建一个严格的规则来修改数据。例如，我们可以通过修改setter来避免ISBN为负数：

```java
public void setIsbn(int isbn) {
    if (isbn < 0) {
        throw new IllegalArgumentException("ISBN can't be negative");
    }
    this.isbn = isbn;
}
```

在这里，我们创建了一个严格的规则来修改ISBN。

## 5. 主要区别

以下是显示封装和信息隐藏主要区别的摘要表：

| 信息隐藏 | 封装 |
| --- | --- |
| 一种设计原则，用于隐藏实现细节和对数据的非预期修改 | 一个面向对象的原则，将数据与操作它们的函数捆绑在一起 |
| 严格使用私有访问修饰符 | 对访问修饰符不严格，可以使用公共、私有或受保护的访问修饰符 |
| 有助于实现防御性编程 | 实现信息隐藏的方法论 |

## 6. 结论

在本文中，我们学习了封装和信息隐藏的关键概念。此外，我们看到了示例代码，展示了封装和信息隐藏之间的微小差异。

**然而，有一种观点认为信息隐藏和封装是同义词。在封装一个类时，我们需要始终应用信息隐藏的原则。**

如常，示例的源代码可在GitHub上找到。