---
date: 2022-11-01
category:
  - Kotlin
  - YAML
tag:
  - Kotlin
  - YAML
  - kotlinx-serialization
  - kaml
  - YamlKt
head:
  - - meta
    - name: keywords
      content: Kotlin, YAML, 序列化, 反序列化, kaml, YamlKt
---
# Kotlin中读取YAML内容指南

YAML（YAML Ain’t Markup Language）是一种人类可读的数据序列化格式，通常用于配置文件。官方的Kotlin库kotlinx-serialization并不直接支持YAML格式。然而，有一些社区支持的库，比如kaml和YamlKt，它们内部使用kotlinx-serialization来支持YAML格式。

在本文中，我们将**学习在Kotlin中读取YAML内容的反序列化过程**。

## 2. 依赖设置

首先，让我们**在项目的pom.xml中添加kaml-jvm依赖**：

```xml
``<dependency>``
    ```<groupId>```com.charleskorn.kaml```</groupId>```
    ```<artifactId>```kaml-jvm```</artifactId>```
    ```<version>```0.58.0```</version>```
``</dependency>``
```

接下来，也让我们**添加yamlkt-jvm依赖**：

```xml
``<dependency>``
    ```<groupId>```net.mamoe.yamlkt```</groupId>```
    ```<artifactId>```yamlkt-jvm```</artifactId>```
    ```<version>```0.13.0```</version>```
``</dependency>``
```

最后，我们必须在Kotlin编译插件中**配置序列化插件**：

```xml
`<build>`
    `<sourceDirectory>`src/main/kotlin`</sourceDirectory>`
    `<testSourceDirectory>`src/test/kotlin`</testSourceDirectory>`
    `<plugins>`
        ``<plugin>``
            ```<groupId>```org.jetbrains.kotlin```</groupId>```
            ```<artifactId>```kotlin-maven-plugin```</artifactId>```
            ```<version>```${kotlin.version}```</version>```
            `<executions>`
                ``<execution>``
                    ``<id>``compile``</id>``
                    ``<phase>``compile``</phase>``
                    ``<goals>``
                        ``<goal>``compile``</goal>``
                    ``</goals>``
                ``</execution>``
                ``<execution>``
                    ``<id>``test-compile``</id>``
                    ``<phase>``test-compile``</phase>``
                    ``<goals>``
                        ``<goal>``test-compile``</goal>``
                    ``</goals>``
                ``</execution>``
            `</executions>`
            `<configuration>`
                `<compilerPlugins>`
                    ``<plugin>``kotlinx-serialization``</plugin>``
                `</compilerPlugins>`
            `</configuration>`
        ``</plugin>``
    `</plugins>`
`</build>`
```

我们必须使用兼容的最新版本的库和插件。

## 3. 读取标量值

标量值如字符串、数字、布尔值和null是YAML中最简单的数据形式。在本节中，让我们学习如何读取标量值。

### 3.1. 使用kaml

让我们**创建com.charleskorn.kaml.Yaml类的实例**，使用库的默认行为：

```kotlin
val yamlDefault = com.charleskorn.kaml.Yaml.default
```

我们也将在后面的章节中重用这个实例。

现在，让我们**使用decodeFromString()方法来解码scalarStringYamlStr的值**：

```kotlin
val scalarStringYamlStr = "Hello!"
val parsedData: String = yamlDefault.decodeFromString(scalarStringYamlStr)
assertEquals("Hello!", parsedData)
```

它正确地解析了。

或者，我们可以使用**parseToYamlNode()函数将内容解析为YamlScalar值**：

```kotlin
val parsedData: YamlScalar = yamlDefault.parseToYamlNode(scalarStringYamlStr).yamlScalar
assertEquals("k1", parsedData.content)
```

我们使用YamlNode的yamlScalar属性来提取标量值。进一步地，我们使用YamlScalar的内容属性来提取parsedData对象的内容。

类似地，我们可以解析其他标量值，如数字、布尔值和null。

### 3.2. 使用YamlKt

要使用YamlKt来反序列化YAML内容，我们必须创建net.mamoe.yamlkt.Yaml类的实例：

```kotlin
val yamlDefault = net.mamoe.yamlkt.Yaml.Default
```

我们**使用库的默认配置来创建yamlDefault**。

像之前一样，我们可以使用decodeFromString()方法来获取scalarStringYamlStr字符串的内容：

```kotlin
val scalarStringYamlStr = "Hello!"
val parsedData: String = yamlDefault.decodeFromString(scalarStringYamlStr)
assertEquals("Hello!", parsedData)
```

看起来我们做对了这个！

另外，重要的是要注意，两个库中的**Yaml类实现了SerialFormat接口，该接口定义了decodeFromString()函数**。因此，我们正在使用库特定的decodeFromString()实现来解析标量值。

## 4. 读取列表

在本节中，我们将学习如何使用YAML列表数据类型读取项目集合。

### 4.1. 块风格和流风格

我们可以以两种格式编写项目列表，即块风格和流风格。

让我们使用块风格在numberListYamlStr字符串中指定数字列表：

```kotlin
val numberListYamlStr =
"""
  - 123
  - 456
"""
```

我们使用三引号字符串来指定多行字符串。进一步地，我们通常**更倾向于这种表示法用于更长的列表**，因为每行保持一个项目更易读。

或者，我们可以使用流风格使用双引号字符串指定数字列表：

```kotlin
val numberListYamlStr = "[123,456]"
```

尽管我们可以将所有项目放在单行中，但对于更长的列表来说，它将变得不易读。因此，我们将**将此用法限制在较小的列表**。

### 4.2. 使用kaml

首先，让我们**使用decodeFromString()方法将项目列表读取为Kotlin Int列表**：

```kotlin
val parsedData: List`<Int>` = yamlDefault.decodeFromString(numberListYamlStr)
```

我们可以验证parsedData变量的值是否符合预期的数字列表：

```kotlin
assertEquals(listOf(123, 456), parsedData)
```

接下来，让我们**使用parseToYamlNode()方法将项目列表读取为YamlList值**：

```kotlin
val parsedData: YamlList = yamlDefault.parseToYamlNode(numberListYamlStr).yamlList
```

我们使用YamlNode的yamlList属性来提取YamlList值。

最后，让我们通过提取单独的标量值来验证YamlList值对象的内容：

```kotlin
val item1 = parsedData[0].yamlScalar.content
assertEquals(123, item1.toInt())
val item2 = parsedData[1].yamlScalar.content
assertEquals(456, item2.toInt())
```

我们得到了正确的结果。

### 4.3. 使用YamlKt

使用YamlKt，我们可以使用decodeFromString()方法提取项目列表，就像我们使用kaml时一样。然而，这个库中的**Yaml类支持使用decodeListFromString()方法作为解析项目列表的替代方法**。

让我们将数字列表读取为Kotlin列表：

```kotlin
val parsedData: List`<Any?>` = yamlDefault.decodeListFromString(numberListYamlStr)
```

进一步地，让我们验证解析后我们是否得到了正确的结果：

```kotlin
assertEquals(listOf(123, 456), parsedData)
```

太棒了！它按预期工作。

## 5. 读取映射

在本节中，我们将学习如何在Kotlin中从YAML内容读取键值映射。

### 5.1. 使用kaml

让我们定义mapWithScalarValuesYamlStr变量来存储YAML字符串：

```kotlin
val mapWithScalarValuesYamlStr =
"""
k1: v1
k2: 123
k3: false
k4: 12.3
k5: 1.2e1
k6: ~
"""
```

**在映射中，我们定义了不同类型的异构值，如字符串、数字、布尔值、浮点数等**。

现在，让我们将映射读取为YamlMap值对象：

```kotlin
val yamlMapNode: YamlMap = yamlDefault.parseToYamlNode(mapWithScalarValuesYamlStr).yamlMap
```

我们使用yamlMap属性从中间的YamlNode对象中提取YamlMap的内容。

最后，让我们验证解析的各个键值对：

```kotlin
assertEquals("v1", yamlMapNode.getScalar("k1")!!.content)
assertEquals(123, yamlMapNode.getScalar("k2")!!.toInt())
assertEquals(false, yamlMapNode.getScalar("k3")!!.toBoolean())
assertEquals(12.3f, yamlMapNode.getScalar("k4")!!.toFloat())
assertEquals(12.0f, yamlMapNode.getScalar("k5")!!.toFloat())
assertTrue(yamlMapNode.get`<YamlNode>`("k6")!! is YamlNull)
```

我们**使用getScalar()方法提取YamlScalar内容**。之后，我们使用字符串值的内容属性和类型特定的方法，比如toInt()、toBoolean()、toFloat()以及YamlNull()，来获取标量值的内容。

此外，我们还使用了非空操作符(!!)来确保我们期待的是非空值。

### 5.2. 使用YamlKt

使用YamlKt库，我们可以使用decodeFromString()方法将Yaml映射解码为YamlMap对象：

```kotlin
val parsedData: YamlMap = yamlDefault.decodeFromString(mapWithScalarValuesYamlStr)
```

进一步地，让我们使用数据类型特定的getter方法来验证解析的值：

```kotlin
assertEquals("v1", parsedData.getString("k1"))
assertEquals(123, parsedData.getInt("k2"))
assertEquals(false, parsedData.getPrimitive("k3"))
assertEquals(12.3f, parsedData.getFloat("k4"))
assertEquals(12.0f, parsedData.getFloat("k5"))
assertTrue(parsedData["k6"] is YamlNull)
```

我们必须注意YamlNull是null值的对象表示。

另外，**YamlKt还提供了decodeMapFromString()方法，可以直接将映射读取为Kotlin Map**：

```kotlin
val parsedData: Map`<String?, Any?>` = yamlDefault.decodeMapFromString(mapWithScalarValuesYamlStr)
```

最后，让我们验证我们的方法是否正确：

```kotlin
assertEquals("v1", parsedData["k1"])
assertEquals(123, parsedData["k2"])
assertEquals(false, parsedData["k3"])
assertEquals(12.3, parsedData["k4"])
assertEquals(12.0, parsedData["k5"])
assertEquals(null, parsedData["k6"])
```

太好了！看起来我们做对了！

## 6. 使用用户定义的模式读取

在本节中，我们将学习如何将YAML内容反序列化到用户定义的模式中。

### 6.1. YAML文档和模式

让我们看看**示例users.yaml文档**：

```yaml
users:
  - name: Alice
    age: 30
    address:
      city: New York
      country: USA
  - name: Bob
    age: 35
    address:
      city: London
      country: UK
```

现在，让我们定义带有city和country属性的Address数据类：

```kotlin
@Serializable
data class Address(
    val city: String,
    val country: String,
)
```

进一步地，我们可以定义带有name、age和address属性的User数据类：

```kotlin
@Serializable
data class User(
    val name: String,
    val age: Int,
    val address: Address
)
```

最后，我们得到了带有users属性的Users数据类，它表示User对象的列表：

```kotlin
@Serializable
data class Users(
    val users: List`<User>`
)
```

我们用@Serializable注解标记了它们每一个，以准备序列化和反序列化。

### 6.2. verifyUsers()函数

**从可重用性的角度来看，让我们定义一个辅助函数verifyUsers()，**来验证反序列化过程：

```kotlin
fun verifyUsers(users: Users) {
    assertNotNull(users)

    val user1 = users.users[0]
    assertNotNull(user1)
    assertEquals("Alice", user1.name)
    assertEquals(30, user1.age)
    assertEquals("New York", user1.address.city)
    assertEquals("USA", user1.address.country)

    val user2 = users.users[1]
    assertNotNull(user2)
    assertEquals("Bob", user2.name)
    assertEquals(35, user2.age)
    assertEquals("London", user2.address.city)
    assertEquals("UK", user2.address.country)
}
```

我们将在以下部分中使用这个来验证来自users.yaml的YAML字符串的反序列化。

### 6.3. 使用kaml

让我们定义getUsersUsingUsersSerializer()函数来将YAML内容读取到Users对象中：

```kotlin
fun getUsersUsingUsersSerializer(fileContent: String): Users {
    val yaml = Yaml(configuration = YamlConfiguration(strictMode = false))
    val data = yaml.decodeFromString`<Users>`(fileContent)
    return data
}
```

我们**定义了Yaml类的实例，并使用decodeFromString()方法进行解析**。

进一步地，让我们调用getUsersUsingUsersSerializer()并验证结果：

```kotlin
val users = getUsersUsingUsersSerializer(fileContent)
verifyUsers(users)
```

它工作得很好！

### 6.4. 使用YamlKt

类似地，我们可以定义getUsersUsingUsersSerializer()来使用YamlKt库进行解析：

```kotlin
fun getUsersUsingUsersSerializer(fileContent: String): Users {
    val users: Users = Yaml.Default.decodeFromString(Users.serializer(), fileContent)
    return users
}
```

重要的是要注意**两个库中的Yaml类是不同的**。

最后，让我们验证我们的方法和相应的结果：

```kotlin
val users = getUsersUsingUsersSerializer(fileContent)
verifyUsers(users)
```

太好了！我们已经让它工作了。

## 7. 结论

在本文中，我们**学习了如何使用kaml和YamlKt库读取YAML内容**。进一步地，我们通过使用deserializeFromString()方法详细探讨了它，使用它来反序列化YAML字符串中支持的不同数据类型。

像往常一样，本文的代码可以在GitHub上找到。

[Baeldung Kotlin logo](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg)[Kotlin logo](https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png)[Gravatar image](https://secure.gravatar.com/avatar/353305b4d53354d666bdb529e3f98fca?s=50&r=g)[Baeldung Whiteleaf icon](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK