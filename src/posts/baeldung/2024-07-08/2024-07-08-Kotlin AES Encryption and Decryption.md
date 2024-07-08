---
date: 2022-11-01
category:
  - Kotlin
  - Encryption
tag:
  - AES
  - Encryption
  - Decryption
head:
  - - meta
    - name: keywords
      content: Kotlin, AES, Encryption, Decryption, Tutorial
---

# Kotlin AES 加密与解密

加密是现代数据安全的基础，保护信息免受未授权访问。在众多加密标准中，由于其效率、简单性和强大的安全性的平衡，高级加密标准（AES）脱颖而出。它以128位固定大小的数据块进行操作，并支持128、192或256位的密钥大小，使其适用于各种安全需求。

在本教程中，我们将涵盖AES的基础知识，为AES加密和解密设置Kotlin项目，并最终演示如何在简单的Kotlin应用程序中使用这些实现。

AES因其在软件和硬件实现中的高效率而受到赞誉。它的设计简单性，加上强大的安全特性，推动了其在全球众多安全协议和系统中的广泛采用。

**作为对称加密算法，AES使用相同的密钥进行加密和解密**。这促进了在各种应用中安全数据交换。

让我们看看AES的一些**关键特性**：

- 块密码：以128位的固定块大小操作
- 对称密钥：加密和解密使用相同的密钥
- 安全性：提供强大的安全性，抵御各种密码学攻击
- 灵活性：支持128、192或256位的密钥大小

### 实现AES加密和解密

让我们了解如何生成AES密钥，并使用它来加密或解密数据。

#### 3.1. 生成AES密钥

首先，我们需要生成一个对称的AES密钥。我们可以使用_javax.crypto_中的_KeyGenerator_类来实现这一目的：

```kotlin
fun generateAESKey(keySize: Int = 256): SecretKey {
    val keyGenerator = KeyGenerator.getInstance("AES")
    keyGenerator.init(keySize)
    return keyGenerator.generateKey()
}
```

注意我们如何**调整_keySize_参数以满足我们的需求**（如果需要）。

#### 3.2. AES加密

在AES加密/解密中，“AES/CBC/PKCS5Padding”字符串指定了算法、操作模式和填充方案。CBC（密码块链接）模式使用初始化向量（IV）增加安全性，而PKCS5Padding确保最后一个块正确填充。

让我们使用_Cipher_类实现我们的加密逻辑：

```kotlin
fun aesEncrypt(data: ByteArray, secretKey: SecretKey): ByteArray {
    val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
    val ivParameterSpec = IvParameterSpec(ByteArray(16)) // 在生产中使用安全的IV
    cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivParameterSpec)
    return cipher.doFinal(data)
}
```

应该为每次加密操作随机生成一个安全的初始化向量（IV），以增强安全性。它也**很重要，我们需要存储这个IV，因为它需要与解密逻辑共享**。最后，_doFinal()_执行加密或解密操作。

#### 3.3. AES解密

加密之后，让我们实现解密逻辑：

```kotlin
fun aesDecrypt(encryptedData: ByteArray, secretKey: SecretKey): ByteArray {
    val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
    val ivParameterSpec = IvParameterSpec(ByteArray(16)) // 使用加密时相同的IV
    cipher.init(Cipher.DECRYPT_MODE, secretKey, ivParameterSpec)
    return cipher.doFinal(encryptedData)
}
```

这个函数展示了如何逆转加密过程以检索原始数据。通过使用与加密相同的IV初始化_Cipher_对象为_DECRYPT_MODE_，我们确保了解密过程的完整性，使得能够安全地从加密字节中检索原始信息。

**这一步对于验证AES的对称性至关重要，其中相同的密钥在加密和解密加密数据中起着关键作用**。

### 4. 单元测试AES加密和解密

我们将编写一个JUnit测试用例，它将加密然后解密一段文本，断言解密后的文本与原始文本匹配：

```kotlin
@Test
fun `Given text when encrypted and decrypted should return original text`() {
    val originalText = "Hello Kotlin AES Encryption!"
    val secretKey = generateAESKey(256)

    val encryptedData = aesEncrypt(originalText.toByteArray(), secretKey)
    val decryptedData = aesDecrypt(encryptedData, secretKey)
    val decryptedText = String(decryptedData)

    assertEquals(originalText, decryptedText, "The decrypted text does not match the original")
}
```

运行此测试将验证AES加密和解密过程。**此测试还展示了AES的对称性**，意味着用于加密消息的相同密钥也可以解密它。

### 5. 结论

在本文中，我们探索了Kotlin中的AES加密和解密。我们涵盖了AES的基础知识，如何为密码学操作设置Kotlin项目，并实现了AES加密和解密。我们还通过一个简单的JUnit测试示例演示了这些实现，该示例加密和解密文本。

在生产应用程序中实现AES时，关键是要安全地管理密钥，使用安全的IV，并遵守密码学安全的最佳实践。如常，本文中使用的代码可在GitHub上获得。

![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png)![img](https://secure.gravatar.com/avatar/e6eb6cf88484314104912372deb68199?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg)![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK