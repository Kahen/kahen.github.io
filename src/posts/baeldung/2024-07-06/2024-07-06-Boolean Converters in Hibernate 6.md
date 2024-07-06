---
date: 2024-07-06
category:
  - Hibernate
  - Java
tag:
  - Hibernate 6
  - Boolean Converters
head:
  - - meta
    - name: keywords
      content: Hibernate 6, Boolean Converters, Java, 数据库映射, JPA
---
# Hibernate 6中的布尔转换器

在本教程中，我们将学习如何在Hibernate 6中使用新添加的布尔转换器来映射我们领域模型中的布尔属性。Hibernate 6对类型系统进行了全面翻新。因此，更新移除了一些用于表示布尔值的现有类。

## 2. 模型

为了说明如何在Hibernate 6中使用布尔转换器，我们将在测试中使用H2数据库。首先，我们将使用SQL脚本创建一个数据库表：

```
CREATE TABLE Question (
    id UUID,
    content VARCHAR,
    correctAnswer CHAR,
    shouldBeAsked CHAR,
    isEasy TINYINT,
    wasAskedBefore CHAR,
    PRIMARY KEY (id)
)
```

然后，在Java中，我们将这个表映射到Question实体类：

```java
@Entity
public class Question {
    @Id
    private UUID id;
    private String content;
    private Boolean correctAnswer;
    private Boolean shouldBeAsked;
    private Boolean isEasy;
    private Boolean wasAskedBefore;

    public Question() {
    }

    // 标准的setter和getter
}
```

## 3. 使用YesNoConverter映射Y和N

通常，大写字母Y和N用来分别表示true或false的值。以前，我们可以通过使用@Type注解并指定YesNoBooleanType来映射这些值：

```java
// 旧方法
@Type(type = "org.hibernate.type.YesNoBooleanType")
private Boolean someBoolean;
```

Hibernate 6用YesNoConverter替换了YesNoBooleanType。**由于它是一个转换器，我们必须使用@Convert而不是@Type来使用它。**

让我们将这个新转换器应用到Question中的correctAnswer：

```java
@Convert(converter = YesNoConverter.class)
private Boolean correctAnswer;
```

现在，让我们验证Y和N是否映射正确：

```java
@Test
void whenFieldAnnotatedWithYesNoConverter_ThenConversionWorks() {
    // 测试代码...
}
```

## 4. 使用TrueFalseConverter映射T和F

类似地，我们可以使用大写字母T和F来表示布尔值。Hibernate 6移除了TrueFalseBooleanType：

```java
// 旧方法
@Type(type = "org.hibernate.type.TrueFalseBooleanType")
private Boolean someBoolean;
```

作为替代，我们将使用TrueFalseConverter来指定这种映射。让我们为shouldBeAsked注册它：

```java
@Convert(converter = TrueFalseConverter.class)
private Boolean shouldBeAsked;
```

让我们测试转换是否有效：

```java
@Test
void whenFieldAnnotatedWithTrueFalseConverter_ThenConversionWorks() {
    // 测试代码...
}
```

## 5. 使用NumericBooleanConverter映射0和1

最后，字母不是表示布尔值的唯一方式。人们通常也使用整数0和1来达到这个目的。过去，我们会使用NumericBooleanType来进行这种表示：

```java
// 旧方法
@Type(type = "org.hibernate.type.NumericBooleanType")
private Boolean someBoolean;
```

让我们改用新的NumericBooleanConverter。我们将把零或一的值映射到isEasy：

```java
@Convert(converter = NumericBooleanConverter.class)
private Boolean isEasy;
```

像往常一样，让我们检查它是否按预期工作：

```java
@Test
void whenFieldAnnotatedWithNumericBooleanConverter_ThenConversionWorks() {
    // 测试代码...
}
```

## 6. 使用@ConverterRegistration指定默认转换器

在每个布尔字段上注释转换器是繁琐且容易出错的。更常见的是，我们在数据库中以一种方式表示布尔值。

毫不奇怪，Hibernate提供的布尔转换器不会默认自动应用。然而，Hibernate 6.1引入了@ConverterRegistration，我们可以使用它来自动应用现有的转换器。

为了做到这一点，让我们添加一个package-info.java文件，并在Question类所在的包中添加这个注解，使YesNoConverter默认应用：

```java
@ConverterRegistration(converter = YesNoConverter.class)
package com.baeldung.hibernate.booleanconverters.model;

import org.hibernate.annotations.ConverterRegistration;
import org.hibernate.type.YesNoConverter;
```

我们没有在@ConverterRegistration中设置autoApply，因为它默认设置为true。Question实体包含布尔字段wasAskedBefore，由于我们没有用任何转换器注释它，Hibernate使用YesNoConverter来映射它：

```java
@Test
void givenConverterRegisteredToAutoApply_whenFieldIsNotAnnotated_ThenConversionWorks() {
    // 测试代码...
}
```

## 7. 警告

我们可能开始使用这些新转换器，然后发现Hibernate没有正确填充我们的布尔字段。那可能是因为YesNoConverter和TrueFalseConverter只适用于大写字符。小写字母将被静默映射为null：

```java
@Test
void givenFieldAnnotatedWithYesNoConverter_WhenDbValueIsLowercase_ThenDomainModelValueNull() {
    // 测试代码...
}
```

## 8. 使用JPA AttributeConverter映射不同的表示

我们可能会在数据库中遇到各种布尔表示。如果没有一个默认的Hibernate转换器满足我们的要求，我们必须自己定义映射逻辑。我们可以通过创建JPA Attribute Converter轻松做到这一点。

## 9. 结论

在本文中，我们学习了如何在Hibernate 6中映射布尔值。

标准的布尔类型被转换器取代了。因此，我们需要使用@Convert而不是@Type。

另外，我们必须记住YesNoConverter和TrueFalseConverter不适用于小写字母。为了减少样板代码，我们应该使用@ConverterRegistration自动应用转换器。

我们看到的Hibernate转换器都是JPA AttributeConverter的实现。如果它们都不符合我们的需求，我们可以编写自己的实现并以相同的方式使用它。

如常，本文的完整代码示例可在GitHub上找到。