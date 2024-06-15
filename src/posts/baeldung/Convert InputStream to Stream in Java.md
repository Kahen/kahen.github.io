---
date: 2024-06-15
category:
  - Java
tag:
  - InputStream
  - Stream
---
# Java中将InputStream转换为Stream`````````<String>````````` | Baeldung

## 1. 引言

在Java中处理来自不同来源的输入数据时，我们有时会遇到需要将_InputStream_转换为_Stream`````````<String>`````````_的情况。

在本教程中，我们将探讨实现这种转换的不同方法。

## 2. 使用BufferedReader和lines()方法转换

将_InputStream_转换为_Stream`````````<String>`````````_的一种有效方式是使用_BufferedReader_及其_lines()_方法。

首先，我们将定义一个_byte_数组_bytes_，其中包含一系列文本行：

```java
byte[] bytes = "Hello\nWorld\nThis\nis\na\ntest".getBytes(StandardCharsets.UTF_8);
InputStream inputStream = new ByteArrayInputStream(bytes);
```

在提供的代码块中，我们创建了一个名为_bytes_的_byte_数组，以保存所提供文本行的UTF-8编码表示。然后，我们使用_ByteArrayInputStream(bytes)_从这个_byte_数组创建一个名为_inputStream_的_InputStream_。

**此设置允许我们模拟一个包含指定文本的_InputStream_，这将在后续示例中用于转换为_Stream`````````<String>`````````_。**

现在，让我们看看如何在测试场景中实现这种方法：

```java
@Test
void givenInputStream_whenConvertingWithBufferedReader_thenConvertInputStreamToStringStream() throws IOException {
    try (InputStreamReader isr = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
         BufferedReader reader = new BufferedReader(isr)) {
        Stream`````````<String>````````` stringStream = reader.lines();

        String result = stringStream.reduce("", (s1, s2) -> s1 + s2);

        assertEquals("HelloWorldThisisatest", result);
    }
}
```

在上面的示例中，**我们使用_InputStreamReader_创建了一个包裹在_InputStream_上的_BufferedReader_对象。这使我们能够高效地从_InputStream_读取文本行。** 此外，_BufferedReader_的_lines()_方法返回一个包含从输入中读取的行的_Stream`````````<String>`````````_。最后，我们使用_reduce()_操作将这个_Stream_中的所有_String_元素连接成一个单独的结果_String_，并使用断言与预期内容进行验证。

**请注意，我们使用_try-with-resources_以确保_InputStreamReader_和_BufferedReader_在_try_块结束时自动关闭，释放相关资源。**

## 3. 使用Scanner转换

另一种方法是使用_Scanner_对_InputStream_进行标记化。让我们看看一个简单的实现：

```java
@Test
void givenInputStream_whenConvertingWithScannerFindAll_thenConvertInputStreamToStringStream() {
    try (Scanner scanner = new Scanner(inputStream, StandardCharsets.UTF_8)) {
        Stream`````````<String>````````` stringStream = scanner.findAll(".+")
          .map(MatchResult::group);

        String result = stringStream.collect(Collectors.joining());

        assertEquals("HelloWorldThisisatest", result);
    }
}
```

在这种方法中，我们使用_InputStream_初始化一个_Scanner_对象，并使用_StandardCharsets.UTF_8_配置它以使用UTF-8编码。

之后，**我们使用_regex_模式“_.+_”的_findAll()_方法来匹配一个或多个字符，有效地将_InputStream_的内容捕获为一系列_MatchResult_。**

然后，我们使用_MatchResult::group_将每个匹配结果映射到其匹配组，结果是一个包含匹配字符串的_Stream`````````<String>`````````_。随后，我们使用_Collectors.joining()_方法将_Stream_中的所有字符串连接成一个名为_result_的单个_String_。

## 4. 结论

总之，在Java中将_InputStream_转换为_Stream`````````<String>`````````_可以通过使用_BufferedReader_及其_lines()_方法或利用_Scanner_及其_findAll()_方法来实现。这允许我们高效地处理基于文本的数据，为我们的Java应用程序中的_InputStream_处理提供了灵活性和可扩展性。

如常，示例的源代码可在GitHub上获取。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。