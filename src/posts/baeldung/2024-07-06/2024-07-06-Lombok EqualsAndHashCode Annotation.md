---
date: 2022-04-01
category:
  - Java
  - Lombok
tag:
  - equals
  - hashCode
head:
  - - meta
    - name: keywords
      content: Lombok, equals, hashCode, Java
---
# Lombok的@EqualsAndHashCode注解详解

在本教程中，我们将讨论Lombok的@EqualsAndHashCode注解，该注解基于类的字段生成equals()和hashCode()方法。

## 2. @EqualsAndHashCode的使用
Lombok的@EqualsAndHashCode注解默认情况下为给定类生成equals()和hashCode()方法，使用所有非静态和非瞬态字段。

### 3.1. 在字段级别使用@EqualsAndHashCode.Exclude排除字段
我们可以使用@EqualsAndHashCode.Exclude注解指示Lombok从equals()和hashCode()方法的生成过程中排除一个字段。

### 3.2. 在类级别排除字段
我们也可以在类级别使用@EqualsAndHashCode.Exclude注解来排除字段。

### 4.1. 在字段级别包含特定字段
要在使用equals()和hashCode()方法生成时包含特定字段，我们可以使用@EqualsAndHashCode.Include注解。

### 4.2. 在方法级别包含
此外，我们可以通过使用@EqualsAndHashCode.Include注解将自定义方法的结果合并到equals()和hashCode()方法中。

### 4.3. 在类级别包含
@EqualsAndHashCode注解包括一个of属性来定义要包含的字段。

## 5. 继承中的@EqualsAndHashCode
当一个类扩展另一个类时，Lombok的@EqualsAndHashCode生成的方法默认不会调用父类的equals()和hashCode()方法。

## 6. Lombok @EqualsAndHashCode配置
要配置@EqualsAndHashCode注解的行为，我们需要在我们的项目中创建一个lombok.config文件。

### 6.1. lombok.equalsAndHashCode.doNotUseGetters
lombok.equalsAndHashCode.doNotUseGetters配置键可以设置为true或false（默认为false）。

### 6.2. lombok.equalsAndHashCode.callSuper
lombok.equalsAndHashCode.callSuper配置键可以设置为call, skip或warn（默认为warn）。

### 6.3. lombok.equalsAndHashCode.flagUsage
Lombok将根据配置将任何@EqualsAndHashCode的使用标记为警告或错误。

## 7. 使用@EqualsAndHashCode解的优点和缺点
使用Lombok的@EqualsAndHashCode注解有优点也有缺点。

### 7.1. 优点
Lombok的@EqualsAndHashCode注解是简化equals()和hashCode()方法创建的有用技术。

### 7.2. 缺点
使用Lombok的@EqualsAndHashCode注解有几个缺点。首先，当两个对象具有不同的字段值但相同的哈希码时，它可能会生成不必要的哈希码冲突。

## 8. 常见问题
当在具有双向关系的类上使用Lombok的@EqualsAndHashCode注解时，例如父子关系，可能会发生java.lang.StackOverflowError。

## 9. 结论
在本文中，我们看到了Lombok @EqualsAndHashCode注解如何生成equals()和hashCode()方法。我们还探讨了如何在字段和类级别上进行包含和排除以自定义生成的方法。

使用Lombok @EqualsAndHashCode注解可以节省时间和精力。然而，我们应该意识到潜在的问题，例如哈希码冲突、与其他库的不兼容以及在双向关系中出现的StackOverflowError。