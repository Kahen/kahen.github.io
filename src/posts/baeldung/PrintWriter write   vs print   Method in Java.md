---
date: 2024-06-19
category:
  - Java
  - IO
tag:
  - PrintWriter
  - write()
  - print()
head:
  - - meta
    - name: keywords
      content: Java, PrintWriter, write() vs print(), 输出方法比较
---

# Java 中的 PrintWriter write() 与 print() 方法比较 | Baeldung## 1. 引言

本文将讨论Java IO包中的_PrintWriter_类。具体来说，我们将讨论它的两个方法，_write()_和_print()_，以及它们之间的区别。

_PrintWriter_类将对象的格式化表示打印到文本输出流。此类中的方法永远不会抛出I/O异常。然而，它的一些构造函数可能会抛出异常。要使用这些方法，我们必须调用_PrintWriter_构造函数，并提供文件、文件名或输出流作为参数。

**_write()_方法有五个重载版本，两个用于_char_，两个用于_String_，一个用于_int_。** 这个方法只是我们可以将内容写入控制台或文件的方式之一。

此外，_char_和_String_版本可以写入整个_char[]_或_String_，或者数组或_String_的部分。另外，_int_版本写入一个单一字符——相当于给定十进制输入的ASCII符号。

首先，让我们看看_write(int c)_版本：

```java
@Test
void whenUsingWriteInt_thenASCIICharacterIsPrinted() throws FileNotFoundException {
    PrintWriter printWriter = new PrintWriter("output.txt");

    printWriter.write(48);
    printWriter.close();

    assertEquals(0, outputFromPrintWriter());
}
```

我们传递了_48_作为_write()_方法的参数，并得到了_0_作为输出。此外，如果我们查看ASCII表，我们会发现_48_ DEC输入对应的符号是数字_0_。如果我们传递另一个值，比如说_64_，那么打印的输出将是数字_4_。

这里，_outputFromPrintWriter()_只是一个服务方法，它读取_write()_方法写入文件的内容，这样我们可以比较值：

```java
Object outputFromPrintWriter;

Object outputFromPrintWriter() {
    try (BufferedReader br = new BufferedReader(new FileReader("output.txt"))){ 
        outputFromPrintWriter = br.readLine();
    } catch (IOException e){
        e.printStackTrace();
        Assertions.fail();
    }
    return outputFromPrintWriter;
}
```

现在，让我们看看第二个版本——_write(char[] buf, int off, int len)_——它从给定的起始位置写入数组的一部分，直到给定的长度：

```java
@Test
void whenUsingWriteCharArrayFromOffset_thenCharArrayIsPrinted() throws FileNotFoundException {
    PrintWriter printWriter = new PrintWriter("output.txt");

    printWriter.write(new char[]{'A','/','\u0026','4','E'}, 1, 4);
    printWriter.close();

    assertEquals("/\u00264E", outputFromPrintWriter());
}
```

正如我们从上面的测试中看到的，_write()_方法从我们指定的偏移量开始，将四个字符写入了_output.txt_文件。

让我们分析_write(String s, int off, int len)_方法的第二个版本。这写入了_String_的一部分，从给定的起始位置直到给定的长度：

```java
@Test
void whenUsingWriteStringFromOffset_thenLengthOfStringIsPrinted() throws FileNotFoundException {
    PrintWriter printWriter = new PrintWriter("output.txt");

    printWriter.write("StringExample", 6, 7 );
    printWriter.close();

    assertEquals("Example", outputFromPrintWriter());
}
```

## 3. _PrintWriter.print()_

**_print()_方法有九个重载版本。** 它可以接收以下类型的参数：_boolean, char, char[], double, float, int, long, Object,_和_String_。

_print()_方法在其各种变体中的行为是相似的。**对于除了_String_和_char_之外的每种类型，由_String.valueOf()_方法产生的字符串被转换为字节**。这种转换是根据平台的默认字符编码进行的，字节以与_write(int)_版本相同的方式写入。

首先，让我们看看_print(boolean b)_版本：

```java
@Test
void whenUsingPrintBoolean_thenStringValueIsPrinted() throws FileNotFoundException {
    PrintWriter printWriter = new PrintWriter("output.txt");

    printWriter.print(true);
    printWriter.close();

    assertEquals("true", outputFromPrintWriter());
}
```

现在，让我们看看_print(char c)_：

```java
@Test
void whenUsingPrintChar_thenCharIsPrinted() throws FileNotFoundException {
    PrintWriter printWriter = new PrintWriter("output.txt");

    printWriter.print('A');
    printWriter.close();

    assertEquals("A", outputFromPrintWriter());
}
```

这是_print(int i)_的工作方式：

```java
@Test
void whenUsingPrintInt_thenValueOfIntIsPrinted() throws FileNotFoundException {
    PrintWriter printWriter = new PrintWriter("output.txt");

    printWriter.print(420);
    printWriter.close();

    assertEquals("420", outputFromPrintWriter());
}
```

让我们看看_print(String s)_版本输出了什么：

```java
@Test
void whenUsingPrintString_thenStringIsPrinted() throws FileNotFoundException {
    PrintWriter printWriter = new PrintWriter("output.txt");

    printWriter.print("RandomString");
    printWriter.close();

    assertEquals("RandomString", outputFromPrintWriter());
}
```

这里是_print(Object obj)_的测试：

```java
@Test
void whenUsingPrintObject_thenObjectToStringIsPrinted() throws FileNotFoundException {
    PrintWriter printWriter = new PrintWriter("output.txt");

    Map example = new HashMap();

    printWriter.print(example);
    printWriter.close();

    assertEquals(example.toString(), outputFromPrintWriter());
}
```

正如我们从上面的例子中看到的，**调用_print()_方法并传递一个对象作为参数会打印该对象的_toString()_表示**。

## 4. _write()_和_print()_方法之间的区别

两种方法之间的区别很微妙，所以我们需要留意它们。

**_write(int)_只写一个字符。它输出等同于传递参数的ASCII符号。**

**此外，_print(_typeOfData)_将_char, int_等类型的参数通过调用_String.valueOf(typeOfData)_转换为_String_。** 这个_String_根据平台的默认字符编码被转换为字节，并且它的字节以与_write(int)_相同的方式写入。

与_print()_方法不同，_write()_方法只处理单个字符、字符串和字符数组。_print()_方法涵盖了许多参数类型，使用_String.valueOf()_将它们转换为可打印的字符串字符。

## 5. 结论

在本教程中，我们探索了_PrintWriter_类，更具体地说，是_write()_和_print()_方法。正如我们所看到的，_PrintWriter_类提供了几种帮助我们将数据打印到输出的方法。_write()_方法打印传递给它的字符，而_print()_方法转换输出。

如常，代码可以在GitHub上找到。

文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系方式。

OK