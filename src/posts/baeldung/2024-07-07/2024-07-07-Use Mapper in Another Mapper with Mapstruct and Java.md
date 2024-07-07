---
date: 2024-07-07
category:
  - Java
  - MapStruct
tag:
  - 编程
  - 映射
head:
  - - meta
    - name: keywords
      content: MapStruct, Java, 映射, DTO, 嵌套结构, 教程
---

# 使用MapStruct和Java在另一个Mapper中使用Mapper

## 1. 概述

MapStruct 是一个库，它帮助我们在处理 Java Beans 映射时最小化样板代码。它仅使用提供的接口生成映射器。

在本教程中，我们将学习如何构建由简单映射器构建的复杂映射器并映射嵌套结构。

## 2. 数据

我们将把 _Article_ 类映射到 DTO 实例。_Article_ 包含一些简单字段，但也包含类型为 _Person_ 的作者字段。我们也将把这个字段映射到相应的 DTO。以下是源类：

```java
@Getter
@Setter
public class Article {
    private int id;
    private String name;
    private Person author;
}
```

```java
@Getter
@Setter
public class Person {
    private String id;
    private String name;
}
```

以及目标类：

```java
@Getter
@Setter
public class ArticleDTO {
    private int id;
    private String name;
    private PersonDTO author;
}
```

```java
@Getter
@Setter
public class PersonDTO {
    private String id;
    private String name;
}
```

## 3. 作为方法定义嵌套映射器

让我们从定义一个简单的映射器开始，它将映射我们的 _Article_ 类：

```java
@Mapper
public interface ArticleMapper {
    ArticleMapper INSTANCE = Mappers.getMapper(ArticleMapper.class);

    ArticleDTO articleToArticleDto(Article article);
}
```

这个映射器将正确映射源类中的所有字面字段，但不会映射 _author_ 字段，因为它不知道如何映射。让我们定义 _PersonMapper_ 接口：

```java
@Mapper
public interface PersonMapper {
    PersonMapper INSTANCE = Mappers.getMapper(PersonMapper.class);

    PersonDTO personToPersonDTO(Person person);
}
```

现在我们可以在 _ArticleMapper_ 中创建一个方法，定义从 _Person_ 到 _PersonDTO_ 的映射：

```java
default PersonDTO personToPersonDto(Person person) {
    return Mappers.getMapper(PersonMapper.class).personToPersonDTO(person);
}
```

MapStruct 将自动获取这个方法，并使用它来映射 _author_ 字段。

## 4. 使用现有的映射器

虽然上述解决方案有效，但有点繁琐。我们可以直接在 _@Mapper_ 注解中使用“uses”参数指向我们想要使用的映射器，而不是定义一个新方法：

```java
@Mapper(uses = PersonMapper.class)
public interface ArticleUsingPersonMapper {
    ArticleUsingPersonMapper INSTANCE = Mappers.getMapper(ArticleUsingPersonMapper.class);

    ArticleDTO articleToArticleDto(Article article);
}
```

## 5. 结论

在本文中，我们学习了如何在另一个映射器中使用 MapStruct 映射器。如常，代码示例可以在 GitHub 上找到。

OK