---
date: 2024-06-18
category:
  - Java
  - 设计模式
tag:
  - Builder模式
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java Builder模式, 设计模式, Java 8, 构建器模式
---
# Java 8中实现建造者模式 | Baeldung

## 1. 引言

在软件开发的旅程中，我们经常遇到创建具有众多属性的对象的场景，这可能令人生畏。构造函数的混乱使得我们的代码可读性降低。这正是建造者模式大放异彩的地方。**建造者模式是一种创建型设计模式，它将复杂对象的构建与其表示分离，提供了一种更干净、更灵活的对象创建方法。**

## 2. 建造者模式的优势

在我们深入编码之前，让我们快速回顾一下使用建造者模式的优势：

- 灵活性 - 通过将构建过程与实际对象表示解耦，建造者模式允许我们以不同的配置创建对象，而不会在我们的代码库中充斥着多个构造函数或设置器
- 可读性 - 建造者模式提供了流畅的接口，使我们的代码更易于阅读；这使我们和其他开发人员能够一目了然地理解复杂对象的构建过程
- 不可变性 - 建造者可以通过在构建完成后创建不可变对象来强制执行不可变性；这确保了线程安全性并防止了意外的修改

现在，让我们挽起袖子深入代码。

## 3. **经典建造者模式**

**在建造者模式的经典实现中，我们创建了一个单独的_Builder_内部类。** 这个内部类包含设置被构建对象每个属性的方法。这种结构化的方法促进了顺序配置过程，确保了清晰度和易用性。此外，它增强了代码组织和可读性，使其更易于理解和维护：

```java
public class Post {

    private final String title;

    private final String text;

    private final String category;

    Post(Builder builder) {
        this.title = builder.title;
        this.text = builder.text;
        this.category = builder.category;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public String getCategory() {
        return category;
    }

    public static class Builder {
        private String title;
        private String text;
        private String category;

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder text(String text) {
            this.text = text;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }

        public Post build() {
            return new Post(this);
        }
    }
}
```

在建造者类中，我们声明了与外部类相同的字段集。_Builder_类提供了流畅的方法来设置Post的每个属性。**此外，它还包括一个_build()_方法来创建_Post_实例。**

现在，我们可以使用_Builder_来创建一个新对象：

```java
Post post = new Post.Builder()
  .title("Java Builder Pattern")
  .text("Explaining how to implement the Builder Pattern in Java")
  .category("Programming")
  .build();
```

## 4. 通用建造者模式

在Java 8中，lambda表达式和方法引用开启了新的可能性，包括建造者模式的更通用形式。我们的实现引入了一个_GenericBuilder_类，它可以通过利用泛型来构建各种类型的对象：

```java
public class GenericBuilder```````<T>``````` {
    private final Supplier```````<T>``````` supplier;

    private GenericBuilder(Supplier```````<T>``````` supplier) {
        this.supplier = supplier;
    }

    public static ```````<T>``````` GenericBuilder```````<T>``````` of(Supplier```````<T>``````` supplier) {
        return new GenericBuilder<>(supplier);
    }

    public `<P>` GenericBuilder```````<T>``````` with(BiConsumer`<T, P>` consumer, P value) {
        return new GenericBuilder<>(() -> {
            T object = supplier.get();
            consumer.accept(object, value);
            return object;
        });
    }

    public T build() {
        return supplier.get();
    }
}
```

这个类遵循流畅的接口，从_of()_方法开始创建初始对象实例。然后，_with()_方法使用lambda表达式或方法引用设置对象属性。

**_GenericBuilder_提供了灵活性和可读性，允许我们简洁地构建每个对象，同时确保类型安全。** 这种模式展示了Java 8的表达力，并为复杂的构建任务提供了优雅的解决方案。

然而，一个很大的缺点是这个解决方案基于类设置器。**这意味着我们的属性不再像前一个例子那样是final的，因此失去了建造者模式提供的不可变性。**

对于我们的下一个例子，我们将创建一个新的_GenericPost_类，包括一个默认的无参数构造函数、getters和setters：

```java
public class GenericPost {

    private String title;

    private String text;

    private String category;

    // getters and setters

}
```

现在，我们可以使用我们的_GenericBuilder_来创建一个_GenericPost_：

```java
Post post = GenericBuilder.of(GenericPost::new)
  .with(GenericPost::setTitle, "Java Builder Pattern")
  .with(GenericPost::setText, "Explaining how to implement the Builder Pattern in Java")
  .with(GenericPost::setCategory, "Programming")
  .build();
```

## 5. Lombok建造者

Lombok是一个通过自动生成诸如getters、setters、equals、hashCode甚至构造函数等常用方法来简化Java代码的库。

Lombok最受赞赏的功能之一是其对建造者模式的支持。**通过使用_@Builder_注解一个类，Lombok会生成一个带有流畅方法设置属性的建造者类。** 这个注解消除了手动建造者类实现的需要，显著减少了冗余代码。

要使用Lombok，我们需要从Maven中央仓库导入依赖：

```xml
`<dependency>`
    `<groupId>`org.projectlombok`</groupId>`
    `<artifactId>`lombok`</artifactId>`
    `<version>`1.18.32`</version>`
`</dependency>`
```

现在，我们可以使用_@Builder_注解创建一个新的_LombokPost_类：

```java
@Builder
@Getter
public class LombokPost {
    private String title;
    private String text;
    private String category;
}
```

我们还使用了_@Setter_和_@Getter_注解来避免样板代码。然后我们可以立即使用建造者模式创建新对象：

```java
LombokPost lombokPost = LombokPost.builder()
  .title("Java Builder Pattern")
  .text("Explaining how to implement the Builder Pattern in Java")
  .category("Programming")
  .build();
```

## 6. 结论

Java 8中的建造者模式提供了简化的对象构建和提高的代码可读性。通过经典、通用和Lombok建造者模式等变体，我们可以针对特定需求定制我们的方法。通过采用这种模式并利用Lombok等工具，我们可以编写更干净、更高效的代码，推动软件开发中的创新和成功。

如常，完整的代码片段可在GitHub上找到。

发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。