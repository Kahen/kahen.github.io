---
date: 2022-04-01
category:
  - Logback
  - 日志
tag:
  - 日志
  - 敏感数据
  - 脱敏
head:
  - - meta
    - name: 日志脱敏
      content: 使用Logback进行日志脱敏的教程
------
# 使用Logback在日志中遮蔽敏感数据

在GDPR生效的新世界中，我们不仅要关注许多问题，还必须特别关注记录个人敏感数据的问题。在记录大量数据的同时，遮蔽用户敏感细节非常重要。

本文教程将展示如何使用Logback在日志中遮蔽敏感数据。虽然这种方法作为我们日志文件的最后防线，但它并不被视为问题的根本解决方案。

Logback是Java社区中最广泛使用的日志框架之一。它取代了其前身Log4j。Logback提供了更快的实现、更多的配置选项以及在归档旧日志文件时的更多灵活性。

敏感数据是任何旨在防止未经授权访问的信息。这可以包括从个人身份信息（PII），如社会安全号码，到银行信息、登录凭据、地址、电子邮件等。

我们将在记录应用程序日志时遮蔽属于用户的敏感数据。

### 3.1. PatternLayout

配置的想法是将每个需要的Logback appender扩展为自定义布局。在我们的案例中，我们将编写一个MaskingPatternLayout类作为PatternLayout的实现。每个遮蔽模式表示匹配一种类型的敏感数据的正则表达式。

让我们构建MaskingPatternLayout类：

```java
public class MaskingPatternLayout extends PatternLayout {

    private Pattern multilinePattern;
    private List`<String>` maskPatterns = new ArrayList<>();

    public void addMaskPattern(String maskPattern) {
        maskPatterns.add(maskPattern);
        multilinePattern = Pattern.compile(maskPatterns.stream().collect(Collectors.joining("|")), Pattern.MULTILINE);
    }

    @Override
    public String doLayout(ILoggingEvent event) {
        return maskMessage(super.doLayout(event));
    }

    private String maskMessage(String message) {
        if (multilinePattern == null) {
            return message;
        }
        StringBuilder sb = new StringBuilder(message);
        Matcher matcher = multilinePattern.matcher(sb);
        while (matcher.find()) {
            IntStream.rangeClosed(1, matcher.groupCount()).forEach(group -> {
                if (matcher.group(group) != null) {
                    IntStream.range(matcher.start(group), matcher.end(group)).forEach(i -> sb.setCharAt(i, '*'));
                }
            });
        }
        return sb.toString();
    }
}
```

PatternLayout的实现.doLayout()负责在应用程序的每个日志消息中遮蔽匹配的数据，如果它匹配配置的模式之一。

maskPatterns列表来自logback.xml构建了一个多行模式。不幸的是，Logback引擎不支持构造函数注入。如果它以属性列表的形式出现，addMaskPattern将为每个配置条目调用。因此，我们必须每次向列表添加新的正则表达式时编译模式。

### 3.2. 配置

通常，我们可以使用正则表达式模式来遮蔽敏感用户详细信息。

例如，对于社会安全号码，我们可以使用如下正则表达式：

```
"SSN"\s*:\s*"(.*)"
```

对于地址，我们可以使用：

```
"address"\s*:\s*"(.*?)"
```

此外，对于IP地址数据模式（192.169.0.1），我们可以使用正则表达式：

```
(\d+\.\d+\.\d+\.\d+)
```

最后，对于电子邮件，我们可以编写：

```
([\w.-]+@[\w.-]+\.\w+)
```

现在，我们将这些正则表达式模式添加到logback.xml文件中的maskPattern标签内：

```xml
`<configuration>`
    `<appender name="mask" class="ch.qos.logback.core.ConsoleAppender">`
        `<encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">`
           `<layout class="com.baeldung.logback.MaskingPatternLayout">`
               ````<maskPattern>````"SSN"\s*:\s*"(.*?)"````</maskPattern>```` `<!-- SSN JSON模式 -->`
               ````<maskPattern>````"address"\s*:\s*"(.*?)"````</maskPattern>```` `<!-- 地址JSON模式 -->`
               ````<maskPattern>````(\d+\.\d+\.\d+\.\d+)````</maskPattern>```` `<!-- IP地址IPv4模式 -->`
               ````<maskPattern>````([\w.-]+@[\w.-]+\.\w+)````</maskPattern>```` `<!-- 电子邮件模式 -->`
               `<pattern>`%-5p [%d{ISO8601,UTC}] [%thread] %c: %m%n%rootException`</pattern>`
           `</layout>`
        `</encoder>`
    `</appender>`
`</configuration>`
```

### 3.3. 执行

现在，我们将为上述示例创建JSON，并使用logger.info()记录详细信息：

```java
Map`<String, String>` user = new HashMap<>();
user.put("user_id", "87656");
user.put("SSN", "786445563");
user.put("address", "22 Street");
user.put("city", "Chicago");
user.put("Country", "U.S.");
user.put("ip_address", "192.168.1.1");
user.put("email_id", "spring-boot.3@baeldung.cs.com");
JSONObject userDetails = new JSONObject(user);

logger.info("User JSON: {}", userDetails);
```

执行后，我们可以看到输出：

```
INFO  [2021-06-01 16:04:12,059] [main] com.baeldung.logback.MaskingPatternLayoutExample: User JSON:
{"email_id":"*******************","address":"*********","user_id":"87656","city":"Chicago","Country":"U.S.", "ip_address":"**********","SSN":"*********"}
```

在这里，我们可以看到日志中的用户JSON已经被遮蔽：

```
{
    "user_id":"87656",
    "ssn":"*********",
    "address":"*********",
    "city":"Chicago",
    "Country":"U.S.",
    "ip_address":"*********",
    "email_id":"*****************"
}
```

通过这种方法，我们只能为在logback.xml中定义了正则表达式的maskPattern的日志文件遮蔽数据。

## 4. 结论

在本教程中，我们介绍了如何使用PatternLayout功能在Logback中遮蔽应用程序日志中的敏感数据，以及如何在logback.xml中添加正则表达式模式来遮蔽特定数据。

像往常一样，代码片段可以在GitHub上找到。