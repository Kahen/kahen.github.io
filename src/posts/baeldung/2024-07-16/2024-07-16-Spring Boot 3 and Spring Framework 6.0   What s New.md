---
date: 2024-07-17
category:
  - Spring Boot 3
  - Spring Framework 6.0
tag:
  - Java 14
  - Java 17
  - Jakarta EE 9
head:
  - - meta
    - name: keywords
      content: Spring Boot 3, Spring Framework 6.0, Java 14, Java 17, Jakarta EE 9, 新特性
---

# Spring Boot 3 和 Spring Framework 6.0 - 新特性概览

随着 Spring Boot 3 的发布时间临近，现在正是检查新特性的好时机。

## Java 14 记录关键字
探索记录的基础，包括它们的目的、生成的方法和自定义技术。

## Java 17
虽然之前已经支持 Java 17，但这个长期支持版本现在成为了基线。

当从长期支持版本 11 迁移时，Java 开发者将从新的语言特性中受益。由于 Java 本身不是本文的主题，我们只列出对 Spring Boot 开发者最重要的新特性。我们可以在 Java 17、16、15、14、13 和 12 的单独文章中找到更多细节。

### 2.1. 记录
Java 记录（JEP 395，见 Java 14 记录关键字）旨在作为快速创建数据载体类的便捷方式，即那些目标仅仅是包含数据并在模块之间传递的类，也称为 POJO（纯旧 Java 对象）和 DTO（数据传输对象）。

我们可以轻松创建不可变的 DTO：
```
public record Person (String name, String address) {}
```

目前，我们需要小心地将它们与 Bean 验证结合使用，因为验证约束不支持构造函数参数，例如当实例在 JSON 反序列化（Jackson）时创建并作为参数放入控制器的方法中。

### 2.2. 文本块
通过 JEP 378，现在可以创建多行文本块，而无需在行中断处连接字符串：
```
String textBlock = """
Hello, this is a
multi-line
text block.
""";
```

### 2.3. Switch 表达式
Java 12 引入了 switch 表达式（JEP 361），它们（像所有表达式一样）评估单个值，并且可以在语句中使用。而不是组合嵌套的 _if_– _else_-运算符（?:），我们现在可以使用 _switch_– _case_-结构：
```
DayOfWeek day = DayOfWeek.FRIDAY;
int numOfLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    case THURSDAY, SATURDAY     -> 8;
    case WEDNESDAY              -> 9;
};
```

### 2.4. 模式匹配
模式匹配在 Project Amber 中得到了阐述，并找到了进入 Java 语言的路径。在 Java 语言中，它们可以帮助简化 _instanceof_ 评估的代码。

我们可以直接使用它们与 _instanceof_：
```
if (obj instanceof String s) {
    System.out.println(s.toLowerCase());
}
```

我们也可以在 _switch_– _case_ 语句中使用它：
```
static double getDoubleUsingSwitch(Object o) {
    return switch (o) {
        case Integer i -> i.doubleValue();
        case Float f -> f.doubleValue();
        case String s -> Double.parseDouble(s);
        default -> 0d;
    };
}
```

### 2.5. 密封类和接口
密封类可以通过指定允许的子类来限制继承：
```
public abstract sealed class Pet permits Dog, Cat {}
```

我们可以在 Java 中的密封类和接口中找到更多细节。

## Jakarta EE 9
最重要的变化可能是从 Java EE 到 Jakarta EE9 的跳跃，其中包命名空间从 _javax._*_ 变为 _jakarta._*_。因此，每当我们直接使用 Java EE 中的类时，都需要调整我们代码中的所有导入。

例如，当我们在 Spring MVC 控制器中访问 _HttpServletRequest_ 对象时，我们需要将：
```
import javax.servlet.http.HttpServletRequest;
```
替换为：
```
import jakarta.servlet.http.HttpServletRequest;
```

当然，我们并不经常需要使用 Servlet API 的类型，但如果我们使用 Bean 验证和 JPA，这是不可避免的。

我们还应该意识到这一点，当我们使用依赖于 Java/Jakarta EE 的外部库时（例如，我们必须使用 Hibernate Validator 7+，Tomcat 10+ 和 Jetty 11+）。

## 进一步依赖
Spring Framework 6 和 Spring Boot 3 需要以下最低版本：
- Kotlin 1.7+
- Lombok 1.18.22+（JDK17 支持）
- Gradle 7.3+

## 大点
两个总体主题受到了特别关注：_本地可执行文件_和 _可观察性_。总体意味着：
- Spring Framework 引入了核心抽象
- 组合项目一致地与它们集成
- Spring Boot 提供了自动配置

### 5.1. 本地可执行文件
构建本地可执行文件并将其部署到 GraalVM 获得了更高的优先级。因此，Spring Native 倡议正在进入 Spring 本身。

对于 AOT 生成，我们不需要包括单独的插件，我们只需要使用 _spring-boot-maven-plugin_ 的一个新目标：
```
mvn spring-boot:aot-generate
```

本地提示也将是 Spring 核心的一部分。这方面的测试基础设施将在 Milestone 5（v6.0.0-M5）中可用。

### 5.2. 可观察性
Spring 6 引入了 Spring 可观察性 - 一个新倡议，它建立在 Micrometer 和 Micrometer 跟踪（以前是 Spring Cloud Sleuth）之上。目标是使用 Micrometer 高效记录应用程序指标，并通过提供程序（如 OpenZipkin 或 OpenTelemetry）实现跟踪。

Spring Boot 3 中所有这些都有自动配置，Spring 项目正在使用新的观察 API 自我仪器化。

我们可以在专门的文章中找到更多关于它的细节。

## 较小的 Spring Web MVC 变化
最重要的新特性之一是支持 RFC7807（问题详细信息标准）。现在我们不需要包括单独的库，如 Zalando Problem。

另一个较小的变化是 HttpMethod 不再是一个枚举，而是一个允许我们为扩展的 HTTP 方法创建实例的类，例如由 WebDAV 定义的那些：
```
HttpMethod lock = HttpMethod.valueOf("LOCK");
```

至少一些过时的基于 servlet 的集成被丢弃了，如 Commons FileUpload（我们应该使用 _StandardServletMultipartResolver_ 进行多部分文件上传），Tiles 和 FreeMarker JSP 支持（我们应该使用 FreeMarker 模板视图）。

## 迁移项目
有一些项目迁移的提示我们应该知道。推荐步骤是：
1. 迁移到 Spring Boot 2.7（当 Spring Boot 3 发布时，将基于 Spring Boot 2.7 提供迁移指南）
2. 检查弃用代码的使用和旧版配置文件处理；它将在新的主要版本中被移除
3. 迁移到 Java 17
4. 检查第三方项目是否有与 Jakarta EE 9 兼容的版本
5. 由于 Spring Boot 3 尚未发布，我们可以尝试当前的里程碑来测试迁移

## 结论
正如我们所了解到的，迁移到 Spring Boot 3 和 Spring 6 也将是迁移到 Java 17 和 Jakarta EE 9。如果我们非常重视可观察性和本地可执行文件，我们将从即将发布的主要版本中受益最多。

像往常一样，所有的代码都可以在 GitHub 上找到。