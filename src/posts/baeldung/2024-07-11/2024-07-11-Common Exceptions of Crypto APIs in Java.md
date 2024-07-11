---
date: 2022-04-01
category:
  - Java
  - 异常处理
tag:
  - Java加密
  - 异常
head:
  - - meta
    - name: keywords
      content: Java加密, Java异常处理, Cipher, NoSuchAlgorithmException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException
---
# Java中Crypto API的常见异常

## 1. 引言

`Cipher`对象是一个重要的Java类，它帮助我们提供加密和解密功能。

在本文中，我们将看看在使用它来加密和解密文本时可能发生的一些常见异常。

## 2. NoSuchAlgorithmException: 找不到支持X的任何提供者

如果我们运行以下代码来使用一个虚构的算法获取`Cipher`的实例：

```java
Cipher.getInstance("ABC");
```

我们将看到以下开始的堆栈跟踪：

```java
java.security.NoSuchAlgorithmException: Cannot find any provider supporting ABC
    at javax.crypto.Cipher.getInstance(Cipher.java:543)
```

这里实际上发生了什么？

嗯，要使用`Cipher.getInstance`，**我们需要传入一个算法转换作为_String_，并且必须是文档中列出的允许值。**如果不是，我们将得到一个`NoSuchAlgorithmException`。

**如果我们已经检查了文档，但我们仍然看到这个，我们最好确保我们检查转换是否有错误。**

我们还可以在我们的转换中指定算法模式和填充。

让我们确保这些字段的值与给定的文档相匹配。否则，我们将看到异常：

```java
Cipher.getInstance("AES/ABC"); // 无效，导致异常
Cipher.getInstance("AES/CBC/ABC"); // 无效，导致异常
Cipher.getInstance("AES/CBC/PKCS5Padding"); // 有效，无异常
```

请记住，如果我们没有指定这些额外的字段，那么将使用默认值。

算法模式的默认值是ECB，默认填充是“**NoPadding**”。

由于ECB被认为是弱的，我们将要指定一个模式以确保我们最终不会使用它。

总结一下，当解决`NoSuchAlgorithmException`时，我们将想要回顾我们选择的转换的每个部分是否在文档中允许的列表中存在，并注意检查我们的拼写是否有任何错误。

## 3. IllegalBlockSizeException: 输入长度不是X字节的倍数

我们可能会看到这种异常有几个原因。

首先，让我们看看在解密时抛出的异常，然后让我们在尝试加密时看看它。

### 3.1. 解密期间的IllegalBlockSizeException

让我们编写一个非常简单的解密方法：

```java
Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
cipher.init(Cipher.DECRYPT_MODE, key);

return cipher.doFinal(cipherTextBytes);
```

这段代码的行为将根据传入我们方法的密文而改变，我们可能无法控制。

有时，我们可能会看到`IllegalBlockSizeException`：

```java
javax.crypto.IllegalBlockSizeException: Input length not multiple of 16 bytes
    at com.sun.crypto.provider.CipherCore.finalNoPadding(CipherCore.java:1109)
    at com.sun.crypto.provider.CipherCore.fillOutputBuffer(CipherCore.java:1053)
    at com.sun.crypto.provider.CipherCore.doFinal(CipherCore.java:853)
    at com.sun.crypto.provider.AESCipher.engineDoFinal(AESCipher.java:446)
    at javax.crypto.Cipher.doFinal(Cipher.java:2168)
```

那么‘区块大小’到底是什么意思，什么使它‘非法’呢？

为了理解这一点，让我们记住AES是一个块密码的例子。

块密码通过采用称为块的固定长度的位组来工作。

要找出我们的算法有多少字节在一个块中，我们可以使用：

```java
Cipher.getInstance("AES/ECB/PKCS5Padding").getBlockSize();
```

从这，我们可以看到**AES使用16字节的块。**

这意味着它将取一个16字节的块，执行相关的算法步骤，然后继续下一个16字节的块。

简单来说，**一个非法块就是不包含正确字节数的块。**

通常，这发生在最终块上，当文本长度不是16字节的倍数时。

**这通常意味着要解密的文本最初没有正确加密，因此无法解密。**

请记住，我们不控制给我们的代码解密的输入，所以我们必须准备好处理这个异常。

因此，像_cipher.doFinal_这样的方法抛出_IllegalBlockSizeException_，迫使我们处理这个场景，要么通过抛出它，要么在一个_try-catch_语句中。否则，代码将无法编译。

然而，请记住，大约每16次中有一次，一些坏的密文会偶然地具有正确的长度，以避免AES的这种异常。

在这种情况下，我们很可能会碰到本文中提到的其他异常之一。

### 3.2. 加密期间的IllegalBlockSizeException

现在让我们看看我们在尝试加密文本“_https://www.baeldung.com/_”时的这个异常：

```java
String plainText = "https://www.baeldung.com/";
byte[] plainTextBytes = plainText.getBytes();

Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
cipher.init(Cipher.ENCRYPT_MODE, key);

return cipher.doFinal(plainTextBytes);
```

正如我们上面看到的，对于AES算法来说，字节数必须是16的倍数，而我们的文本不是。因此，运行这段代码会给出与上面相同的异常。

那么，我们只能用AES加密具有16、32、48...字节的文本吗？

如果我们想要加密的文本没有正确的字节数怎么办？

嗯，这就是**我们需要填充我们的数据的地方。**

**填充数据只是意味着我们将要在文本的开始、中间或结尾添加额外的字节，**从而确保数据现在具有正确的字节数。

正如算法名称和模式一样，有一组允许的填充操作列表，我们可以使用。

幸运的是，Java为我们处理了这些，所以我们不会在这里详细介绍它的工作原理。

我们所要做的就是**设置一个填充操作，比如PKCS #5，在我们的_Cipher_实例上，而不是指定“NoPadding”：**

```java
Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
```

当然，解密文本的代码也必须使用相同的填充操作。

### 3.3. 其他故障排除提示

如果我们开始得到_NoSuchAlgorithmException_或_NoSuchPaddingException_，我们需要检查Java文档以确保我们使用的是有效的填充——并且我们的拼写没有错误。

如果我们这样做了，那么可能值得检查我们正在查看的文档是否与我们正在使用的Java版本相匹配，因为允许的填充操作可能会在版本之间改变。本文提供的链接是针对Java 8的。

## 4. BadPaddingException: 给定的最终块没有正确填充

如果代码在处理填充时遇到问题，就会抛出_BadPaddingException_，这表明我们使用的填充有问题。

然而，实际上可能有几种不同的问题会导致我们看到这个异常。

### 4.1. 由不正确的填充引起的BadPaddingException

假设我们的文本，“_https://www.baeldung.com/_”，使用ISO 10126填充进行加密：

```java
Cipher cipher = Cipher.getInstance("AES/ECB/ISO10126Padding");
cipher.init(Cipher.ENCRYPT_MODE, key);
byte[] cipherTextBytes = cipher.doFinal(plainTextBytes);
```

然后，如果我们尝试使用不同的填充，比如说PKCS #5来解密：

```java
cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
cipher.init(Cipher.DECRYPT_MODE, encryptionKey);

return cipher.doFinal(cipherTextBytes);
```

我们的代码会抛出一个异常：

```java
javax.crypto.BadPaddingException: Given final block not properly padded. Such issues can arise if a bad key is used during decryption.
  at com.sun.crypto.provider.CipherCore.unpad(CipherCore.java:975)
  at com.sun.crypto.provider.CipherCore.fillOutputBuffer(CipherCore.java:1056)
  at com.sun.crypto.provider.CipherCore.doFinal(CipherCore.java:853)
  at com.sun.crypto.provider.AESCipher.engineDoFinal(AESCipher.java:446)
  at javax.crypto.Cipher.doFinal(Cipher.java:2168)
```

然而，当我们看到这个异常时，填充通常不是根本原因。

这由上面异常中的一行暗示，“如果解密时使用了错误的密钥，可能会出现这样的问题。”

所以让我们看看还有什么可能导致_BadPaddingException_。

### 4.2. 由不正确的密钥引起的BadPaddingException

正如堆栈跟踪所建议的，当我们在解密时没有使用正确的加密密钥时，我们可能会看到这个异常：

```java
SecretKey encryptionKey = CryptoUtils.getKeyForText("BaeldungIsASuperCoolSite");
SecretKey differentKey = CryptoUtils.getKeyForText("ThisGivesUsAnAlternative");

Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");

cipher.init(Cipher.ENCRYPT_MODE, encryptionKey);
byte[] cipherTextBytes = cipher.doFinal(plainTextBytes);

cipher.init(Cipher.DECRYPT_MODE, differentKey);

return cipher.doFinal(cipherTextBytes);
```

上述代码抛出_BadPaddingException_而不是_InvalidKeyException_，因为这是代码遇到问题并且无法继续进行的地方。

这可能是这种异常最常见的原因。

**如果我们看到这个异常，那么我们必须确保我们使用的是正确的密钥。**

这意味着我们必须在加密和解密中使用相同的密钥。

### 4.3. 由不正确的算法引起的BadPaddingException

鉴于上述情况，接下来这一点应该是显而易见的，但总是值得检查。

如果我们试图使用与数据加密时不同的算法或算法模式进行解密，我们可能会看到类似的症状：

```java
Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
cipher.init(Cipher.ENCRYPT_MODE, key);
byte[] cipherTextBytes = cipher.doFinal(plainTextBytes);

cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
cipher.init(Cipher.DECRYPT_MODE, key);

return cipher.doFinal(cipherTextBytes);
```

在上面的例子中，数据使用CBC模式加密，但使用ECB模式解密，这在大多数情况下是行不通的。

通常，我们解决这个异常的方法是**验证我们的解密机制的每个组件是否与数据加密的方式相匹配。**

## 5. InvalidKeyException

**InvalidKeyException通常表明我们设置Cipher对象的方式不正确。**

让我们看看最常见的原因。

### 5.1. InvalidKeyException: 缺少参数

我们使用的某些算法将需要一个初始化向量（IV）。

IV防止加密文本的重复，因此像CBC这样的一些加密模式需要它。

让我们尝试初始化一个没有设置IV的Cipher实例：

```java
Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
cipher.init(Cipher.DECRYPT_MODE, encryptionKey);
cipher.doFinal(cipherTextBytes);
```

如果我们运行上述代码，我们将看到以下堆栈跟踪：

```java
java.security.InvalidKeyException: Parameters missing
  at com.sun.crypto.provider.CipherCore.init(CipherCore.java:469)
  at com.sun.crypto.provider.AESCipher.engineInit(AESCipher.java:313)
  at javax.crypto.Cipher.implInit(Cipher.java:805)
  at javax.crypto.Cipher.chooseProvider(Cipher.java:867)
```

幸运的是，这个问题很容易解决，因为我们只需要用IV初始化我们的Cipher：

```java
byte[] ivBytes = new byte[]{'B', 'a', 'e', 'l', 'd', 'u', 'n', 'g', 'I', 's', 'G', 'r', 'e', 'a', 't', '!'};
IvParameterSpec ivParameterSpec = new IvParameterSpec(ivBytes);

cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
cipher.init(Cipher.DECRYPT_MODE, encryptionKey, ivParameterSpec);
byte[] decryptedBytes = cipher.doFinal(cipherTextBytes);
```

注意**给定的IV必须与用于加密文本的IV相同。**

关于我们的IV的最后一个注意事项是，它必须具有特定的长度。

**如果我们使用CBC，我们的IV必须是正好16字节长。**

如果我们尝试使用不同数量的字节，我们将得到一个非常清晰的InvalidAlgorithmParameterException：

```java
java.security.InvalidAlgorithmParameterException: Wrong IV length: must be 16 bytes long
  at com.sun.crypto.provider.CipherCore.init(CipherCore.java:525)
  at com.sun.crypto.provider.AESCipher.engineInit(AESCipher.java:346)
  at javax.crypto.Cipher.implInit(Cipher.java:809)
  at javax.crypto.Cipher.chooseProvider(Cipher.java:867)
```

解决办法很简单，只要确保我们的IV是16字节长。

### 5.2. InvalidKeyException: 无效的AES密钥长度：X字节

我们很快就会讲完这一点，因为这与上述情况非常相似。

如果我们尝试使用不正确长度的密钥，那么我们将看到一个简单的异常：

```java
java.security.InvalidKeyException: Invalid AES key length: X bytes
  at com.sun.crypto.provider.AESCrypt.init(AESCrypt.java:87)
  at com.sun.crypto.provider.CipherBlockChaining.init(CipherBlockChaining.java:93)
  at com.sun.crypto.provider.CipherCore.init(CipherCore.java:591)
```

我们的密钥必须是16字节。

这是因为Java通常只支持默认的128位（16字节）加密。

## 6. 结论

在本文中，我们看到了在加密和解密文本时可能发生的各种异常。

特别是，我们看到了一些异常可能会提到一个事情，比如填充，但根本原因实际上是别的，比如无效的密钥。

像往常一样，示例项目可在GitHub上获得。

OK