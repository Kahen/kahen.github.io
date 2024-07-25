---
date: 2022-04-01
category:
  - Java
  - Serialization
tag:
  - Java
  - Object to byte array
  - Serialization
head:
  - - meta
    - name: keywords
      content: Java, Serialization, Object to byte array
---
# Java中对象与字节数组的转换

在这篇简短的教程中，我们将学习如何**将Java对象转换为字节数组以及反向转换**。

## 2. 使用纯Java
例如，假设我们有一个_User_类：

```java
public class User implements Serializable {
    private String name;

    @Override
    public String toString() {
        return "User{name=" + name + "}";
    }

    // getters and setters
}
```

我们可以使用_ByteArrayOutputStream_和_ObjectOutputStream_对象将对象序列化为字节数组。

让我们不要忘记使用try-with-resources，这样我们就不必担心关闭流：

```java
User user = new User();
user.setName("Josh");
try (ByteArrayOutputStream bos = new ByteArrayOutputStream();
     ObjectOutputStream oos = new ObjectOutputStream(bos)) {
    oos.writeObject(user);
}
```

然后我们将使用_ByteArrayInputStream_和_ObjectInputStream_将接收到的字节数组反序列化为对象，最后将其转换为_User_：

```java
try (ByteArrayInputStream bis = new ByteArrayInputStream(data);
     ObjectInputStream ois = new ObjectInputStream(bis)) {
    User deserializedUser = (User) ois.readObject();
    System.out.println(deserializedUser);
}
```

注意，我们的_User_类必须实现_Serializable_接口。否则，上述代码将抛出_NotSerializableException_。

## 3. 使用Apache Commons Lang
我们可以使用Apache Commons Lang库中的_SerializationUtils_类来实现相同的目标。

这个类有一个名为_serialize()_的方法，用于将对象序列化为字节数组：

```java
byte[] data = SerializationUtils.serialize(user);
```

以及一个_deserialize()_方法将字节数组反序列化为对象：

```java
User deserializedUser = SerializationUtils.deserialize(data);
```

**上述方法的参数类型为_Serializable._** 因此，我们的_User_类仍然需要实现_Serializable_接口，就像我们在纯Java示例中所做的那样。

## 4. 使用Spring Framework的_SerializationUtils_类
最后，如果我们的项目已经在使用Spring Framework，我们可以使用_org.springframework.util_包中的_SerializationUtils_类。方法名称与Apache Commons Lang库中的相同。

首先，我们可以将_User_对象序列化为字节数组：

```java
byte[] data = SerializationUtils.serialize(user);
```

然后我们可以将结果反序列化回_User_对象：

```java
User deserializedUser = SerializationUtils.deserialize(data);
```

**像往常一样，我们的_User_类必须实现_Serializable_接口**，否则在运行上述代码时我们将得到一个_NotSerializableException_。

## 5. 结论
总结来说，我们学习了三种不同的方法来**将Java对象转换为字节数组以及反向转换**。所有这些方法都需要输入对象实现_Serializable_接口来完成任务。