---
date: 2024-06-22
category:
  - Java
  - 编程
tag:
  - 邮箱地址
  - 电话号码
  - 脱敏
  - 正则表达式
head:
  - - meta
    - name: 关键词
      content: Java, 邮箱地址脱敏, 电话号码脱敏, 正则表达式
------
# 在Java中遮罩电子邮件地址和电话号码

隐私和数据安全是软件开发的重要组成部分。遮罩敏感细节，如用户的电子邮件地址和电话号码，通常是保护用户信息和防止其泄露的程序之一。

**在本教程中，我们将探讨如何在Java中遮罩电子邮件地址和电话号码。**

### 2.1 使用字符串操作遮罩电子邮件地址

字符串操作是隐藏电子邮件的一种方式，通过编辑字符并将其中一些替换为星号。以下是一个简单的Java代码片段，演示了这种方法：

```java
String email = "testemailaddress@example.com";
String expectedMaskedEmail = "te**************@example.com";

@Test
public void givenEmailAddress_whenUsingStringManipulation_thenMaskEmail() {
    int atIndex = email.indexOf('@');
    String repeatedString = IntStream.range(0, atIndex - 2).mapToObj(i -> "*").collect(Collectors.joining());
    String maskedPart = email.substring(0, atIndex - repeatedString.length()) + repeatedString;
    String maskedEmail = maskedPart + email.substring(atIndex);

    assertEquals(expectedMaskedEmail, maskedEmail);
}
```

在给出的例子中，我们首先找到电子邮件地址中“@”字符的索引。然后，我们使用Java的Stream API和字符串操作生成一个长度等于atIndex-2的星号字符串。**请注意，我们从atIndex减去2个数字，以保留电子邮件的前两位数字。**

**生成的_maskedPart_电子邮件部分是通过结合“@”符号之前的字符和生成的星号字符串来生成的。**

然后通过连接_maskedPart_和生成的星号来获取电子邮件地址。最后，我们使用_assertEquals()_方法验证_maskedEmail_是否与_expectedMaskedEmail_相同。

### 2.2 使用正则表达式遮罩电子邮件地址

另一种方法是实现正则表达式来隐藏电子邮件地址。以下是一个例子：

```java
@Test
public void givenEmailAddress_whenUsingRegex_thenMaskEmail() {
    int atIndex = email.indexOf('@');
    String regex = "(.{2})(.*)(@.*)";
    String repeatedAsterisks = "*".repeat(atIndex - 2);
    String maskedEmail = email.replaceAll(regex, "$1" + repeatedAsterisks + "$3");

    assertEquals(expectedMaskedEmail, maskedEmail);
}
```

在上面的测试方法中，我们首先使用_indexOf()_方法确定_email_中的“@”符号的索引。然后，我们使用正则表达式_regex_“(.{2})(.*)(@.*)”来捕获三组：前两个字符，它们和“@”符号之间的字符，以及“@”符号后的字符。

**随后，变量_repeatedAsterisks_被赋予一个长度等于atIndex-2的星号字符串。最后，_replaceAll()_方法应用_regex_模式，用生成的星号替换_email_的中间部分。**

### 3.1 使用字符串操作遮罩电话号码

我们也可以通过对字符进行一些操作来遮罩电话号码。以下是一个例子：

```java
String phoneNumber = "+1234567890";
String expectedMaskedPhoneNumber = "+******7890";

@Test
public void givenPhoneNumber_whenUsingStringManipulation_thenMaskPhone() {
    String maskedPhoneNumber = phoneNumber.replaceAll("\\d(?=\\d{4})", "*");
    
    assertEquals(expectedMaskedPhoneNumber, maskedPhoneNumber);
}
```

在这里，我们将正则表达式“\\d(?=\\d{4})”传递给_replaceAll()_方法，目的是识别并替换所有后面还有四个数字的数字字符为星号。

### 3.2 使用正则表达式遮罩电话号码

与用于遮罩电子邮件地址的方法类似，正则表达式可以被实现以正确地隐藏电话号码。以下是一个演示这种方法的Java代码片段：

```java
@Test
public void givenPhoneNumber_whenUsingRegex_thenMaskPhone() {
    int lastDigitsIndex = phoneNumber.length() - 5;
    String regex = "(\\+)(\\d+)(\\d{4})";
    String repeatedAsterisks = "*".repeat(Math.max(0, lastDigitsIndex));
    String maskedPhoneNumber = phoneNumber.replaceAll(regex, "$1" + repeatedAsterisks + "$3");

    assertEquals(expectedMaskedPhoneNumber, maskedPhoneNumber);
}
```

在上述代码片段中，我们定义了一个正则表达式_regex_“(\\+)(\\d+)(\\d{4})”，它捕获了三组：加号，前导数字和最后四个数字。

随后，我们根据计算出的_lastDigitsIndex_生成一个_repeatedAsterisks_星号字符串。然后，我们使用_replaceAll()_方法应用_regex_模式，用星号替换中间数字。

### 4. 结论

总之，遮罩敏感信息对于保护用户隐私和遵守数据安全法规至关重要。因此，我们在本教程中看到了如何利用诸如字符串操作和正则表达式等机制来遮罩电子邮件地址和电话号码。如往常一样，本文的完整代码示例可以在GitHub上找到。