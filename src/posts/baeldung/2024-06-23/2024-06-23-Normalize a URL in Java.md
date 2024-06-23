---
date: 2024-06-23
category:
  - Java
  - Web开发
tag:
  - URL规范化
  - Java
  - Apache Commons Validator
  - URI类
  - 正则表达式
head:
  - - meta
    - name: keywords
      content: Java, URL规范化, Web开发, Apache Commons Validator, URI类, 正则表达式
---

# Java中URL规范化

## 1. 引言

统一资源定位符（URLs）是Web开发的重要组成部分，它们帮助定位和获取互联网上的资源。然而，URLs可能存在不一致或格式错误，这可能导致处理和获取所需材料时出现问题。

URL规范化是将给定的数据转换为规范形式，确保一致性并促进操作性。

## 2. 手动规范化
执行手动规范化涉及应用自定义逻辑来标准化URLs。这个过程包括删除不必要的元素，如不必要的查询参数和片段标识符，将URLs蒸馏到其核心本质。假设我们有以下URL：

_https://www.example.com:8080/path/to/resource?param1=value1&param2=value2#fragment_

规范化后的URL应该如下：

_https://www.example.com:8080/path/to/resource_

注意我们认为“？”之后的所有内容都是不必要的，因为我们只对按资源分组感兴趣。但这将根据用例而变化。

## 3. 使用Apache Commons Validator
Apache Commons Validator库中的_UrlValidator_类是验证和规范化URLs的便捷方法。首先，我们应该确保我们的项目包括Apache Commons Validator依赖项，如下所示：

```xml
`<dependency>`
    `<groupId>`commons-validator`</groupId>`
    `<artifactId>`commons-validator`</artifactId>`
    `<version>`1.8.0`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

现在，我们准备实现一个简单的Java代码示例：

```java
String originalUrl = "https://www.example.com:8080/path/to/resource?param1=value1&param2=value2#fragment";
String expectedNormalizedUrl = "https://www.example.com:8080/path/to/resource";

@Test
public void givenOriginalUrl_whenUsingApacheCommonsValidator_thenValidatedAndMaybeManuallyNormalized() {
    UrlValidator urlValidator = new UrlValidator();
    if (urlValidator.isValid(originalUrl)) {
        String normalizedUrl = originalUrl.split("\\?")[0];
        assertEquals(expectedNormalizedUrl, manuallyNormalizedUrl);
    } else {
        fail(originalUrl);
    }
}
```

在这里，我们首先实例化一个_UrlValidator_对象。然后，我们使用_isValid()_方法来确定原始URL是否符合之前提到的验证规则。

如果URL被证明是合法的，我们通过手工标准化它并删除查询参数和片段，特别是“？”之后的所有内容。最后，我们使用_assertEquals()_方法来验证_expectedNormalizedUrl_和_normalizedUrl_的等价性。

## 4. 使用Java的URI类
在java.net包中建立Java _URI_类提供了其他管理URIs的功能，包括规范化。让我们看一个简单的例子：

```java
@Test
public void givenOriginalUrl_whenUsingJavaURIClass_thenNormalizedUrl() throws URISyntaxException {
    URI uri = new URI(originalUrl);
    URI normalizedUri = new URI(uri.getScheme(), uri.getAuthority(), uri.getPath(), null, null);
    String normalizedUrl = normalizedUri.toString();
    assertEquals(expectedNormalizedUrl, normalizedUrl);
}
```

在这个测试中，我们将_originalUrl_传递给_URI_对象，并由此派生出一个规范化的_URI_，通过提取和重新组装特定的组件，如scheme、authority和path。

## 5. 使用正则表达式
正则表达式是Java中URL规范化的一种非常有用机制。它们允许您指定许多模式和转换，这些模式匹配URLs并根据您的需求进行更改。这是一个简单的代码示例：

```java
@Test
public void givenOriginalUrl_whenUsingRegularExpression_thenNormalizedUrl() throws URISyntaxException, UnsupportedEncodingException {
    String regex = "^(https?://[^/]+/[^?#]+)";
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(originalUrl);

    if (matcher.find()) {
        String normalizedUrl = matcher.group(1);
        assertEquals(expectedNormalizedUrl, normalizedUrl);
    } else {
        fail(originalUrl);
    }
}
```

在上面的代码示例中，我们首先创建一个匹配URL的scheme、域和路径组件的正则表达式_pattern_。然后，我们将这个模式转换为表示正则表达式的_Pattern_对象。同样，我们使用_Matcher_来匹配原始URL与给定模式。

此外，我们使用_matcher.find()_方法来查找输入序列中定义的模式的下一个子序列。如果_matcher.find()_方法返回true，_matcher.group(1)_提取出与_regex_匹配的子字符串。在这种情况下，它特别捕获了_regex_中第一个捕获组的内容（由括号表示），这被认为是规范化的URL。

## 6. 结论
总之，我们探索了几种URL规范化的方法，如手动规范化、Apache Commons Validator库、Java的URI类和正则表达式。

如常，相关的源代码可以在GitHub上找到。
OK