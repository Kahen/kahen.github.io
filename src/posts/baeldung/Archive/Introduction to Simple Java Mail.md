---
date: 2024-06-18
category:
  - Java
  - Email
tag:
  - Simple Java Mail
  - JavaMail API
head:
  - - meta
    - name: keywords
      content: Simple Java Mail, JavaMail, 邮件发送, 附件, HTML内容
---
# Simple Java Mail 简介

Simple Java Mail 是一个流行的开源库，它简化了 Java 应用程序中的邮件发送过程。与标准的 JavaMail API 相比，它提供了更用户友好的 API，让我们可以专注于电子邮件的内容和收件人，而不是底层细节。

在本教程中，我们将探索设置 Simple Java Mail 的过程，并学习如何发送电子邮件，包括附件和 HTML 内容，处理异常等。

## 2. 设置项目

我们首先通过将 Simple Java Mail 依赖项添加到我们的项目配置文件 _pom.xml_ 中开始：

```xml
`<dependency>`
    `<groupId>`org.simplejavamail`</groupId>`
    `<artifactId>`simple-java-mail`</artifactId>`
    `<version>`8.7.0`</version>`
`</dependency>`
```

## 3. 发送电子邮件

让我们首先使用 Simple Java Mail 发送一封简单电子邮件。

电子邮件的正文内容主要有两个部分：纯文本和 HTML。**纯文本指的是在大多数电子邮件客户端中显示的未格式化内容，没有任何特殊格式或样式。** 它们保证能够被所有电子邮件客户端阅读，无论它们是否能够显示 HTML 内容。

以下是一个基本示例，展示了如何构建一封简单电子邮件：

```java
Email email = EmailBuilder.startingBlank()
  .from("sender@example.com")
  .to("recipient@example.com")
  .withSubject("纯文本电子邮件！")
  .withPlainText("这是使用 SJM 发送的测试电子邮件。")
  .buildEmail();
```

在这个示例中，我们使用 _EmailBuilder_ 类中的 _startingBlank()_ 方法来初始化一个新的 _Email_ 对象，并使用默认值。**它为构建电子邮件消息提供了一个起点，通过创建一个没有预定义内容或配置的空白电子邮件模板。**

随后，我们可以逐步使用 _EmailBuilder_ 类提供的各种方法，用发件人、收件人、主题、正文和其他属性填充这个模板。**例如，_withPlainText()_ 方法接受一个字符串参数，包含我们希望包含在电子邮件正文中的实际文本消息。**

接下来，我们使用 _MailerBuilder_ 来配置 SMTP 服务器的详细信息，包括服务器地址、端口、用户名和密码。最后，使用 _Mailer_ 类来发送电子邮件：

```java
Mailer mailer = MailerBuilder
  .withSMTPServer("smtp.example.com", 25, "username", "password")
  .buildMailer();

mailer.sendMail(email);
```

**此外，要向多个收件人发送电子邮件，我们可以简单地在 _to()_ 方法中指定用逗号分隔的多个电子邮件地址：**

```java
Email email = EmailBuilder.startingBlank()
  // ...
  .to("recipient1@example.com, recipient2@example.com, recipient3@example.com")
  // ...
  .buildEmail();
```

## 4. 发送附件

向电子邮件添加附件是直接的。**我们可以使用 _EmailBuilder_ 类的 _withAttachment()_ 方法将各种类型的文件，如图像、文档或归档文件，附加到电子邮件消息中。**

以下是使用 _withAttachment()_ 方法在电子邮件中附加文件的示例：

```java
Email email = EmailBuilder.startingBlank()
  .from("sender@example.com")
  .to("recipient@example.com")
  .withSubject("带附件的纯文本电子邮件！")
  .withPlainText("这是使用 SJM 发送的带附件的测试电子邮件。")
  .withAttachment("important_document.pdf", new FileDataSource("path/to/important_document.pdf"))
  .buildEmail();
```

在这个示例中，_withAttachment()_ 方法接受 _filename_ 和一个表示附件数据的 _FileDataSource_ 对象。此外，如果我们需要将多个文件附加到我们的电子邮件中，我们可以使用 _AttachmentResource_ 对象的列表：

```java
List`<AttachmentResource>` arList = new ArrayList<>();
arList.add(new AttachmentResource("important_document.pdf", new FileDataSource("path/to/important_document.pdf")));
arList.add(new AttachmentResource("company_logo.png", new FileDataSource("path/to/company_logo.png")));
```

与使用 _withAttachment()_ 方法不同，我们将使用 _withAttachments()_ 方法。这个方法允许我们传入附件资源的集合：

```java
Email email = EmailBuilder.startingBlank()
  // ...
  .withAttachments(arList)
  .buildEmail();
```

## 5. 发送 HTML 内容

Simple Java Mail 允许我们发送带有 HTML 内容的电子邮件，并直接在电子邮件中嵌入图像。这对于创建视觉上吸引人且信息丰富的电子邮件非常有用。**要在 HTML 电子邮件内容中包含嵌入的图像，我们需要使用 CID 方案引用图像。**

**这种机制充当一个唯一标识符，将 HTML 内容中的图像引用与实际附加到电子邮件中的图像数据连接起来。** 基本上，它告诉电子邮件客户端在哪里定位图像以正确显示。

以下是如何创建一个包含使用 CID 的图像引用的 HTML 电子邮件的示例：

```java
String htmlContent = "`<h1>`这是一封带有 HTML 内容的电子邮件`</h1>`" +
  "`<p>`此电子邮件正文包含其他信息和格式设置。`</p>`" +
  "`<img src=\"cid:company_logo\" alt=\"公司标志\">`";
```

在这个示例中，``<img>`` 标签使用标识符 `cid:company_logo` 引用图像。这在 HTML 内容中建立了链接。**在构建电子邮件时，我们使用 _withEmbeddedImage()_ 方法将图像附件与所选择的标识符 _company_logo_ 关联。** 这确保它与 HTML 内容中使用的标识符匹配。

以下是演示如何发送带有 HTML 内容和嵌入图像的电子邮件的示例：

```java
Email email = EmailBuilder.startingblank()
  .from("sender@example.com")
  .to("recipient@example.com")
  .withSubject("带 HTML 和嵌入图像的电子邮件！")
  .withHTMLText(htmlContent)
  .withEmbeddedImage("company_logo", new FileDataSource("path/to/company_logo.png"))
  .buildEmail();
```

图像数据本身并不是直接嵌入在 HTML 内容中。它通常作为电子邮件的单独附件包含。

还建议提供 HTML 内容的纯文本版本，使用 _withPlainText()_。**这为不支持 HTML 渲染的电子邮件客户端的收件人提供了一个备选选项：**

```java
Email email = EmailBuilder.startingBlank()
  // ...
  .withHTMLText(htmlContent)
  .withPlainText("此消息以纯文本显示，因为您的电子邮件客户端不支持 HTML。")
  .buildEmail();
```

## 6. 回复和转发电子邮件

Simple Java Mail 提供了构建用于回复和转发现有电子邮件的电子邮件对象的功能。**在回复电子邮件时，原始电子邮件会在回复本身的正文中引用。** 类似地，在转发电子邮件时，原始电子邮件作为转发内的单独正文包含。

要回复电子邮件，我们使用 _replyingTo()_ 方法并提供接收到的电子邮件作为参数。然后，我们根据需要配置电子邮件，并使用 _EmailBuilder_ 构建它：

```java
Email email = EmailBuilder
  .replyingTo(receivedEmail)
  .from("sender@example.com")
  .prependText("这是一封回复电子邮件。原始电子邮件包含在下方：")
  .buildEmail();
```

要转发电子邮件，我们使用 _forwarding()_ 方法并提供接收到的电子邮件作为参数。然后，我们根据需要配置电子邮件，包括任何附加文本，并使用 _EmailBuilder_ 构建它：

```java
Email email = EmailBuilder
  .forwarding(receivedEmail)
  .from("sender@example.com")
  .prependText("这是一封转发的电子邮件。请见下方的电子邮件：")
  .buildEmail();
```

然而，重要的是要理解 Simple Java Mail 本身不能直接从电子邮件服务器检索电子邮件。**我们需要利用像 _javax.mail_ 这样的额外库来访问和检索电子邮件以进行回复或转发。**

## 7. 处理异常

在发送电子邮件时，处理在传输过程中可能发生的异常至关重要，以确保强大的功能。**当发送电子邮件时发生错误，Simple Java Mail 会抛出一个名为 _MailException_ 的检查异常。**

为了有效地处理潜在的错误，我们可以将我们的电子邮件发送逻辑包含在 _try_– _catch_ 块中，捕获 _MailException_ 类的实例。以下是一个演示如何使用 try-catch 块处理 _MailException_ 的代码片段：

```java
try {
    // ...
    mailer.sendMail(email);
} catch (MailException e) {
    // ...
}
```

此外，在发送之前验证电子邮件地址可以减少电子邮件传输过程中发生错误的可能性。我们可以通过 mailer 对象提供的 _validate()_ 方法来实现这一点：

```java
boolean validEmailAdd = mailer.validate(email);
if (validEmailAdd) {
    mailer.sendMail(email);
} else {
    // 提示用户无效的电子邮件地址
}
```

## 8. 高级配置选项

此外，Simple Java Mail 提供了超出基本功能的多种配置选项。让我们探索可用的额外配置选项，例如设置自定义标头、配置投递或阅读回执以及限制电子邮件大小。

**我们可以使用 _MailerBuilder_ 类of the _withHeader()_ method to define custom headers for the emails. This allows us to include additional information beyond the standard headers:

```java
Email email = Email.Builder
  .from("sender@example.com")
  .to("recipient@example.com")
  .withSubject("带自定义头部的电子邮件")
  .withPlainText("这是一条重要信息。")
  .withHeader("X-Priority", "1")
  .buildEmail();
```

### 8.2. 配置投递/阅读回执

**投递回执确认电子邮件已被投递到收件人的邮箱，而阅读回执确认收件人已打开或阅读了电子邮件。** Simple Java Mail 提供内置支持，使用特定的电子邮件头部配置这些回执：使用 _Return-Receipt-To_ 用于投递回执，使用 _Disposition-Notification-To_ 用于阅读回执。

我们可以明确定义回执应发送到的电子邮件地址。如果我们没有提供地址，它将默认使用 _replyTo_ 地址（如果可用），或者使用 _fromAddress_。

以下是我们如何配置这些回执的示例：

```java
Email email = EmailBuilder.startingBlank()
  .from("sender@example.com")
  .to("recipient@example.com")
  .withSubject("配置了投递/阅读回执的电子邮件！")
  .withPlainText("这是一封带有投递/阅读回执的电子邮件。")
  .withDispositionNotificationTo(new Recipient("name", "address@domain.com", Message.RecipientType.TO))
  .withReturnReceiptTo(new Recipient("name", "address@domain.com", Message.RecipientType.TO))
  .buildEmail();
```

### 8.3. 限制最大电子邮件大小

许多电子邮件服务器对它们可以接受的电子邮件的最大大小有限制。**Simple Java Mail 提供了一个功能，帮助我们防止发送超出这些限制的电子邮件。** 这可以避免在电子邮件投递尝试期间遇到错误。

我们可以使用 _MailerBuilder_ 对象上的 _withMaximumEmailSize()_ 方法来配置允许的最大电子邮件大小。此方法接受一个表示字节大小限制的整数值：

```java
Mailer mailer = MailerBuilder
  .withMaximumEmailSize(1024 * 1024 * 5)
  .buildMailer();
```

在这个示例中，最大电子邮件大小设置为 _5_ 兆字节。如果我们尝试发送超过定义限制的电子邮件，Simple Java Mail 将抛出一个原因为 _EmailTooBigException_ 的 _MailerException_。

## 9. 结论

在本文中，我们探讨了 Simple Java Mail 的各个方面，包括发送带有附件和嵌入图像的 HTML 内容的电子邮件。此外，我们深入研究了它的高级功能，如管理投递、阅读回执以及处理电子邮件的回复和转发。

**总的来说，它最适合需要直接且高效地发送电子邮件的 Java 应用程序。**

如常，示例的源代码可在 GitHub 上获取。

OK