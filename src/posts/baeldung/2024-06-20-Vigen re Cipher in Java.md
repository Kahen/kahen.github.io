---
date: 2024-06-21
category:
  - Java
  - 密码学
tag:
  - Vigenère密码
  - 加密
  - 解密
head:
  - - meta
    - name: keywords
      content: Java, Vigenère密码, 加密, 解密, 密码学
------
# Vigenère密码在Java中的实现 | Baeldung

## **1. 引言**

在本文中，我们将研究Vigenère密码。我们将了解密码的工作原理，然后学习如何在Java中实现和逆向实现它。

## **2. Vigenère密码是什么？**

**Vigenère密码是经典凯撒密码的一个变种，只是每个字母的位移量不同。**

在凯撒密码中，我们将明文中的每个字母都按照相同的量进行位移。例如，如果我们将每个字母位移三位，那么字符串"BAELDUNG"将变成"EDHOGXQJ"：

反转这个密码仅仅是将字母按照相同的量向相反方向位移。

**Vigenère密码与此相同，只是我们每个字母的位移量不同。** 这意味着我们需要一种方法来表示密码密钥——每个字母位移的量。这通常由另一个字母字符串表示，每个字母对应其在字母表中的位移量。

例如，密钥"HELLO"意味着将第一个字母位移八位，第二个字母位移五位，依此类推。使用这个密钥，字符串"BAELDUNG"现在将变成"JFQXSCSS"：

## **3. 实现Vigenère密码**

**现在我们知道了Vigenère密码的工作原理，让我们看看如何在Java中实现它。**

我们将从将是我们密码的方法开始：

```java
public String encode(String input, String key) {
    String result = "";
    for (char c : input.toCharArray()) {
        result += c;
    }
    return result;
}
```

按照目前的写法，这个方法并不是很有用。它只是构建了一个与输入字符串相同的输出字符串。

接下来，我们想要获取我们的密钥中的字符，用于每个输入字符。我们将有一个计数器来记录我们接下来要使用的密钥位置，然后在每次传递时递增它：

```java
int keyPosition = 0;
for (char c : input.toCharArray()) {
    char k = key.charAt(keyPosition % key.length());
    keyPosition++;
    // ...
}
```

这看起来有点吓人，让我们一步步来理解它。首先，我们应用密钥位置的模数与密钥的总长度，这简单地意味着当它到达字符串的末尾时会重新开始。然后我们取这个位置的字符，这是我们输入字符串的这个位置的密钥字符。

最后，我们需要根据密钥字符调整我们的输入字符：

```java
String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// ...
int charIndex = characters.indexOf(c);
int keyIndex = characters.indexOf(k);

int newCharIndex = (charIndex + keyIndex + 1) % characters.length();
c = characters.charAt(newCharIndex);
```

在这里，我们有一个包含所有我们可以支持的字符的字符串。然后我们找到这个字符串中输入字符和密钥字符的索引。然后我们可以简单地将它们相加来得到我们的新字符位置。

注意，我们也添加了一，因为我们希望密钥中的字母是一索引而不是零索引。也就是说，密钥中的"A"应该作为位移一个字母，而不是位移零个字母。我们还做了另一个模数计算，以确保它再次环绕。

但这并不完全有效。特别是，这只在输入字符串和密钥中的每个字符都在我们的支持列表中时才有效。为了解决这个问题，我们需要在输入字符受支持时才增加密钥位置，并在输入和密钥字符都受支持时才生成新字符：

```java
if (charIndex >= 0) {
    if (keyIndex >= 0) {
        int newCharIndex = (charIndex + keyIndex + 1) % characters.length();
        c = characters.charAt(newCharIndex);

    }

    keyPosition++;
}
```

到此为止，我们的密码就完成了并且有效。

### **3.1. 实际演示**

**现在我们已经有一个工作的密码实现，让我们看看它在实际中是如何工作的。** 我们将使用密钥"BAELDUNG"对字符串"VIGENERE CIPHER IN JAVA"进行编码。

我们从0开始__keyPosition__。我们的第一次迭代然后给我们：

- _c_ = _“V”_
- _k_ = _“B”_
- _charIndex_ = 21
- _keyIndex_ = 1
- _newCharIndex_ = 23

这给我们的结果是字符_“X”_。

我们的第二次迭代将是：

- _keyPosition_ = 1
- _c_ = _“I”_
- _k_ = _“A”_
- _charIndex_ = 8
- _keyIndex_ = 0
- _newCharIndex_ = 9

这给我们的结果是“_ J_”。

让我们跳到第九个字符：

- _keyPosition_ = 9
- _c_ = _” “_
- _k_ = _“B”_。
- _charIndex_ = -1
- _keyIndex_ = 1

这里有两个有趣的事情。首先，我们注意到我们的密钥位置已经超过了密钥的长度，所以我们再次从开头开始环绕。其次，我们的输入字符不是受支持的，所以我们将跳过这个字符的编码。

如果我们继续到最后，我们将得到_“XJLQRZFL EJUTIM WU LBAM”_。

## **4. 解码Vigenère密码**

**现在我们可以用Vigenère密码编码东西了，我们需要能够解码它们。**

也许并不令人惊讶，解码算法的绝大部分与编码相同。毕竟，我们只是根据正确的密钥位置通过一个量来移动字符。

**不同的是我们需要移动的方向。** 我们的__newCharIndex__需要使用减法而不是加法来计算。然而，我们还需要手动进行模数计算，因为在这个方向上它不能正确工作：

```java
int newCharIndex = charIndex - keyIndex - 1;
if (newCharIndex < 0) {
    newCharIndex = characters.length() + newCharIndex;
}
```

有了这个算法版本，我们现在可以成功地逆转密码。例如，让我们尝试使用密钥"BAELDUNG"解码我们之前的字符串_“XJLQRZFL EJUTIM WU LBAM”_。

和以前一样，我们的密钥位置从0开始。我们的第一个输入字符是_“X”_——这是字符索引23，我们的第一个密钥字符是_“B”_——这是字符索引1。

我们的新字符索引然后是23 - 1 - 1，这是21。这在转换回来后是一个_“V”_。

如果我们继续整个字符串，我们将得到结果_“VIGENERE CIPHER IN JAVA”_。

## **5. Vigenère密码调整**

**现在我们已经看到了如何在Java中实现Vigenère密码，让我们看看我们可以做一些调整。** 我们实际上不会在这里实现它们——这留给读者作为练习。

**对密码所做的任何更改都需要在编码和解码的两侧同等地进行，否则，编码的消息将无法读取。** 这也意味着任何不知道我们所做的更改的攻击者将更难攻击任何编码的消息。

可以做出的第一个和最明显的更改是对我们使用的字符集。我们可以**添加更多支持的字符**——那些有重音、空格等。这将允许在输入字符串中使用更广泛的字符集，并且它将调整所有字符在输出字符串中的表示方式。例如，如果我们简单地将空格作为允许的字符添加，那么使用密钥"BAELDUNG"对_“VIGENERE CIPHER IN JAVA”_进行编码的结果就是_“XJLQRZELBDNALZEGKOEVEPO”_而不是_“XJLQRZFL EJUTIM WU LBAM”_。

我们也可以**改变我们映射字符串中字符的顺序**。如果它们不是严格的字母顺序，一切仍然可以工作，但结果将会不同。例如，如果我们将我们的角色字符串改为_“JQFVHPWORZSLNMKYCGBUXIEDTA”_，那么使用密钥_“HELLO”_对字符串_“BAELDUNG”_进行编码现在产生_“DERDPTZV”_而不是_“JFQXSCSS”_。

我们可以做出许多其他的改变，但这些将使我们进一步远离真正的Vigenère密码。例如，我们可以交换编码和解码算法——通过在字母表中向后移动进行编码，通过向前移动进行解码。这通常被称为变体Beaufort。

## **6. 结论**

**在这里，我们看到了Vigenère密码的介绍以及它的工作原理。我们还看到了我们如何在Java中自己实现这个来编码和解码消息。** 最后，我们看到了我们可以对算法进行的一些调整以提高其安全性。为什么不尝试自己实现一些呢？

像往常一样，本文的全部代码可以在GitHub上找到。