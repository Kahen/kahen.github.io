---
date: 2022-04-01
category:
  - Java
  - Regex
tag:
  - String
  - Non-Alphanumeric
  - Special Characters
head:
  - - meta
    - name: keywords
      content: Java, Regex, Special Characters, Non-Alphanumeric, String
---

# 如何检查字符串是否包含非字母数字字符

在本教程中，我们将学习如何检查字符串是否包含非字母数字字符。这个功能在许多场景中都至关重要，例如在查找密码强度、拒绝应用程序中输入的特别字符等。当我们想要限制其使用到一种语言脚本时，这个需求变得更加有趣，我们在这里也尝试解决这个问题。

## 2. 使用正则表达式

我们认为使用正则表达式是实现此需求最灵活的方式。让我们考虑一个简单的用例，其中**应用程序必须只接受英文数字和字母字符**。为了实现这一点，我们使用正则表达式 _\[^a-zA-Z0-9\]_ 来识别一个非字母数字字符：

```java
public class NonAlphaNumRegexChecker {
    private static final Pattern PATTERN_NON_ALPHNUM_USASCII = Pattern.compile("[^a-zA-Z0-9]+");

    public static boolean isAlphanumeric(String str) {
        Matcher matcher = PATTERN_NON_ALPHNUM_USASCII.matcher(str);
        return matcher.find();
    }
}
```

但是，如果应用程序想要接受其他语言的字母，那么我们必须调整正则表达式，以便它也覆盖Unicode字母字符和数字。有关更多详细信息，请查看Javadocs中的“Unicode Support”部分。在这里，我们使用正则表达式的二元属性类，_IsAlphabetic_ 和 _IsDigit_：

```java
public class NonAlphaNumRegexChecker {
    private static final Pattern PATTERN_NON_ALPHNUM_ANYLANG = Pattern.compile("[^\\p{IsAlphabetic}\\p{IsDigit}]");

    public static boolean containsNonAlphanumeric(String input) {
        Matcher matcher = PATTERN_NON_ALPHNUM_ANYLANG.matcher(input);
        return matcher.find();
    }
}
```

**让我们考虑另一个用例，应用程序只接受来自特定Unicode脚本的字符，如西里尔文、格鲁吉亚文或希腊文**。为了实现这种情况，正则表达式支持Unicode脚本类，如_IsCyrillic_、_IsGreek_、_IsGeorgian_ 等。让我们看一个例子：

```java
public class NonAlphaNumRegexChecker {
    public static boolean containsNonAlphanumeric(String input, String script) {
        String regexScriptClass = "\\p{" + "Is" + script + "}";
        Pattern pattern = Pattern.compile("[^" + regexScriptClass + "\\p{IsDigit}]");
        Matcher matcher = pattern.matcher(input);
        return matcher.find();
    }
}
```

由于上述方法将语言脚本作为参数，因此每次必须编译模式。这可能是一个性能瓶颈，因此我们可以在map中缓存所有在枚举 _Character.UnicodeScript_ 中提到的脚本的编译好的_Pattern_ 对象，并使用键 _script_ 检索它。

## 3. 使用 _Character_ 类的 _isLetterOrDigit()_ 方法

现在，让我们看看 _Character_ 类，它可以帮助实现上一节讨论的所有用例。**第一个解决方案通过使用方法 _isLetterOrDigit()_ 检查任何语言编写的字符串中的非字母数字字符**：

```java
public class NonAlphaNumericChecker {
    public static boolean isNonAlphanumericAnyLangScript(String str) {
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (!Character.isLetterOrDigit(c)) {
                return true;
            }
        }
        return false;
    }
}
```

但是，如果我们只想允许特定语言脚本，那么我们必须稍微调整一下。在这里，**我们认为一个字符是非字母数字的，当它既不是该语言的字母也不是数字时**：

```java
public class NonAlphaNumericChecker {
    public static boolean isNonAlphanumericInLangScript(String str, String script) {
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (!Character.UnicodeScript.of(c).toString().equalsIgnoreCase(script)
                && !Character.isDigit(c)) {
                return true;
            }
        }
        return false;
    }
}
```

## 4. 使用 Apache Commons Lang 库的 _StringUtils_ 类

到目前为止，这是使用的所有技术中最不灵活的。**_StringUtils_ 中的 _isAlphanumeric()_ 方法支持所有的Unicode字母或数字，但没有支持识别字符串中使用的语言脚本**。让我们看看它在实践中如何工作：

```java
public static boolean isNonAlphanumericAnyLangScriptV2(String str) {
    return !StringUtils.isAlphanumeric(str);
}
```

## 5. 结论

在本教程中，我们讨论了一些必须检查字符串中是否存在非字母数字字符的用例。我们得出结论，正则表达式技术是所有可用选项中最灵活的。这里使用的代码片段以及相关的JUnit测试用例可以在GitHub上找到。