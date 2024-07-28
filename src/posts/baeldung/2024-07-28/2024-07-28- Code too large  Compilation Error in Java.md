---
date: 2022-04-01
category:
  - Java
  - Compilation
tag:
  - Java
  - JVM
  - Compilation Error
head:
  - - meta
    - name: keywords
      content: Java, JVM, Compilation Error, Code too large
------
# Java中"代码太大"编译错误解析

## 1. 概述

当Java方法超过65535字节时，我们会收到“代码太大”的编译错误。本文将讨论这个错误发生的原因以及如何解决它。

## 2. JVM限制

_Code_attribute_ 是JVM规范中_method_info_结构的可变长度表。这个结构包含了一个方法的JVM指令，可以是一个常规方法，也可以是一个实例、类或接口的初始化方法：

```plaintext
Code_attribute {
    u2 attribute_name_index;
    u4 attribute_length;
    u2 max_stack;
    u2 max_locals;
    u4 code_length;
    u1 code[code_length];
    u2 exception_table_length;
    {
        u2 start_pc;
        u2 end_pc;
        u2 handler_pc;
        u2 catch_type;
    }
    exception_table[exception_table_length];
    u2 attributes_count;
    attribute_info attributes[attributes_count];
}
```

_attribute_中的_code_length_指定了方法中代码的长度：

```plaintext
code_length
code_length项的值给出了此方法的code数组中的字节数。
code_length的值必须大于零（因为code数组不能为空）且小于65536。
```

如上所见，**JVM规范规定**方法的代码长度必须小于65536字节，这意味着方法的大小不能超过65535字节。

## 3. 问题发生的原因

现在我们知道了方法的大小限制，让我们看看可能导致如此大方法的情况：

- 代码生成器：大多数大方法是由使用像ANTLR解析器这样的代码生成器产生的。
- 初始化方法：GUI初始化可能会在一个方法中添加许多细节，如布局、事件监听器等。
- JSP页面：将所有代码包含在类的单个方法中。
- 代码插桩：在运行时向编译后的类添加字节码。
- 数组初始化器：如下所示的方法初始化非常大的数组：

```plaintext
String[][] largeStringArray = new String[][] {
    { "java", "code", "exceeded", "65355", "bytes" },
    { "alpha", "beta", "gamma", "delta", "epsilon" },
    { "one", "two", "three", "four", "five" },
    { "uno", "dos", "tres", "cuatro", "cinco" },

    // 更多值
};
```

## 4. 如何修复错误

正如我们所指出的，错误的根源是方法超过了65535字节的阈值。因此，**将出错的方法重构为几个较小的方法**将为我们解决这个问题。

在数组初始化的情况下，我们可以将数组分割或从文件中加载。我们还可以使用静态初始化器。即使我们使用代码生成器，我们仍然可以重构代码。在大型JSP文件的情况下，我们可以使用jsp:include指令并将其拆分为较小的单元。

上述问题相对容易处理，但**当我们在代码中添加插桩后收到“代码太大”的错误时，事情就变得复杂了**。如果我们拥有代码，我们仍然可以重构方法。但是，当我们从第三方库收到这个错误时，我们就陷入了困境。通过减少插桩级别，我们可能能够解决这个问题。

## 5. 结论

在本文中，我们讨论了“代码太大”错误的成因和潜在解决方案。我们始终可以参考JVM规范的Code_Attributes部分以获取有关此约束的更多详细信息。