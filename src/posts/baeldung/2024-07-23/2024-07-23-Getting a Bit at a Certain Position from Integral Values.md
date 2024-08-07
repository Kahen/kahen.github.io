---
date: 2022-04-01
category:
  - Java
  - Bit Manipulation
tag:
  - Java
  - Bitwise Operations
  - Bit Manipulation
head:
  - - meta
    - name: keywords
      content: Java, Bitwise, Bit Manipulation
---
# 从整数值获取特定位置的位

有时我们需要测试一个数字中的二进制位是否被设置。这可能是因为我们使用数字作为一组标志，其中每个数字代表一个特定的布尔值。

在本教程中，我们将探讨从整数值（如字节、短整型、字符、整型和长整型）获取特定位置的位的不同方法。

## 2. 测试特定位
最常见的情况之一是我们想要使用掩码测试整数值的特定位。
例如，让我们检查字节值中的第三位是否被设置：

```java
byte val1 = 0b0110_0100;
byte mask = 0b0000_0100;
boolean isSet1 = (val1 & mask) > 0;
assertTrue(isSet1);
```

这里二进制数01100100被测试以查看第三位——00000100是否被设置，通过使用按位与操作。结果大于零，所以是的。我们也可以测试它是否没有被设置：

```java
byte val2 = 0b0110_0010;
boolean isSet2 = (val2 & mask) > 0;
assertFalse(isSet2);
```

这个例子基于字节数值类型，我们可以很容易地将其扩展到短整型、字符、整型和长整型值。

在这个解决方案中，我们硬编码了掩码。如果我们想要将解决方案泛化以检查我们数字中的任何位怎么办？

## 3. 使用位移操作符
首先，让我们定义32位整型中位位置的索引范围。最左边的位有索引31，最右边的位有索引0。这是因为我们的数字从最高位到最低位运行。例如，如果我们使用64位长整型数字，最左边的位将是63。

### 3.1. 左移掩码
我们可以通过将值1移动到正确的位置来使用左移操作符来生成掩码：

```java
int val = 0b0110_0100;
int pos = 2;
int mask = 1 `<< pos;
boolean isSet = (val & mask) >` 0;

assertTrue(isSet);
```

在这里我们将_pos_设置为2，尽管它可以是我们数字中的任何有效位位置。然后，我们使用左移操作符(`<<)来生成我们的掩码。最后，我们对_val_和_mask_进行按位与(&)操作。

如果结果大于零，这意味着目标位被设置。

### 3.2. 左移值
除了构建掩码之外，我们还可以使用我们正在测试的值上的左移操作符。而不是用掩码过滤值，我们可以将内容左移，以便感兴趣的位处于最左边的位置。

然后我们所要做的就是检查最左边的位是否被设置。由于有符号整数以二进制补码形式表示，我们可以通过检查结果位左移数是否为负来测试前导数字是否为一。

```java
int val = 0b0110_0100;
int pos = 2;
boolean isSet = ((val << (31 - pos)) < 0);

assertTrue(isSet);
```

在上面，_pos_是2，最左边的位置是31，所以我们使用31减去_pos_，等于29。然后，我们将原始值左移29位并得到一个新的值。在这个新值中，感兴趣的位在最左边的位置。最后，我们检查新值是否小于零。

### 3.3. 右移值
类似地，我们可以使用右移操作符来测试整数值的位。将目标位移动到整数值的最右边位置，并使用掩码1，我们可以检查结果是否等于一：

```java
int val = 0b0110_0100;
int pos = 2;
boolean isSet = ((val >`> pos) & 1) == 1;

assertTrue(isSet);
```

## 4. 优化位运算解决方案
在我们可能要执行这些计算很多的情况下，我们可能希望优化我们的解决方案，以使用最少的CPU指令。

让我们看看左移解决方案的重写，这可能有助于我们实现这一点。它基于按位操作通常比算术操作更快的假设：

```java
boolean isSet = ((val << (~pos & 31)) < 0);
```

我们应该注意到核心思想没有改变。只是代码的写法微妙地不同：我们使用(~pos & 31)来代替之前的(31-pos)表达式。

为什么这两个表达式有相同的效果？我们可以推断这个过程：

```java
(31 - pos) = (31 - pos) & 31
            = (31 + (-pos)) & 31
            = (31 & 31) + ((-pos) & 31)
            = (31 & 31) + ((~pos + 1) & 31)
            = (31 & 31) + (~pos & 31) + (1 & 31)
            = ((31 + 1) & 31) + (~pos & 31)
            = (32 & 31) + (~pos & 31)
            = 0 + (~pos & 31)
            = (~pos & 31)
```

在这一部分的开始，我们提到最左边的位置是31，最右边的位置是0，所以(31 – pos)应该是一个正数或零。如果我们对(31 – pos)和31进行按位与(&)操作，结果保持不变。然后，我们一步一步地做。最后，我们得到了(~pos & 31)表达式。

在这个过程中，还有一件事需要解释：(-pos)是如何转换为(~pos + 1)的？要获得一个整数的二进制补码表示，我们可以进行按位补码(~)操作，然后将结果加一。

更进一步，我们可以稍微简化代码：

```java
boolean isSet = ((val << ~pos) < 0);
```

在上面，我们省略了按位与(&)和31。那是因为JVM会为我们做这项工作。一个整型值有32位，JVM确保其有效的位移范围应该在0到31之间。同样，长整型值有64位，JVM也确保其有效的位移范围应该在0到63之间。

## 5. 使用BigInteger
虽然上述二进制数学对于内置数值类型来说计算效率最高，但我们可能需要检查超过64位的数字上的位，或者可能希望拥有更易读的代码。

BigInteger类可以解决这两个问题。它支持非常大的数字和大量的位，并提供了testBit方法：

```java
int val = 0b0110_0100;
int pos = 2;
boolean isSet = BigInteger.valueOf(val).testBit(pos);

assertTrue(isSet);
```

## 6. 结论
在本教程中，我们查看了一些从整数值获取特定位置的位的常用方法。

像往常一样，本教程的源代码可以在GitHub上找到。