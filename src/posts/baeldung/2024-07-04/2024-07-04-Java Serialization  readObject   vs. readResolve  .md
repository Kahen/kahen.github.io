---
date: 2024-07-05
category:
  - Java
  - 序列化
tag:
  - readObject
  - readResolve
head:
  - - meta
    - name: keywords
      content: Java, 序列化, readObject, readResolve, Baeldung
---
# Java 序列化：readObject() 与 readResolve() | Baeldung

在本教程中，我们将探讨如何在Java反序列化API中使用_readObject()_和_readResolve()_方法。此外，我们将检查这两种方法之间的区别。

Java序列化涵盖了序列化和反序列化如何更深入地工作。在本文中，我们将重点关注_readResolve()_和_readObject()_方法，这些方法在使用反序列化时常引发问题。

### 3. 使用 _readObject()_

在序列化过程中，Java对象被转换为字节流以保存在文件中或通过互联网传输。在反序列化期间，使用_ObjectInputStream_的_readObject()_方法将序列化字节流转换回原始对象，该方法在内部调用_defaultReadObject()_进行默认反序列化。

**如果我们的类中存在_readObject()_方法，ObjectInputStream的_readObject()_方法将使用我们类的_readObject()_方法从流中读取对象。**

例如，在某些情况下，我们可以在我们的类中实现_readObject()_，以特定方式反序列化任何字段。

在我们展示用例之前，让我们检查一下在我们类中实现_readObject()_方法的语法：

```
private void readObject(ObjectInputStream stream) throws IOException, ClassNotFoundException;
```

现在，假设我们有一个_User_类，它有两个字段：

```
public class User implements Serializable {
    private static final long serialVersionUID = 3659932210257138726L;
    private String userName;
    private String password;
    // 标准的setters, getters, 构造函数(s) 和 toString()
}
```

此外，我们不想以明文形式序列化_password_，那么我们可以做什么？让我们看看Java的_readObject()_如何在这里帮助我们。

### 3.1. 添加 _writeObject()_ 以在序列化期间进行自定义更改

首先，我们可以在序列化期间，在_writeObject()_方法中对对象的字段进行特定更改，例如对_password_进行编码。

所以，对于我们的_User_类，让我们实现_writeObject()_方法，并在序列化期间为我们的密码字段添加额外的字符串前缀：

```
private void writeObject(ObjectOutputStream oos) throws IOException {
    this.password = "xyz" + password;
    oos.defaultWriteObject();
}
```

### 3.2. 测试没有 _readObject()_ 实现的情况

现在，让我们测试我们的_User_类，但这次没有实现_readObject()_。在这种情况下，将调用ObjectInputStream类的_readObject()_：

```
@Test
public void testDeserializeObj_withDefaultReadObject() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream("user.ser");
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    User acutalObject = new User("Sachin", "Kumar");
    oos.writeObject(acutalObject);
    
    // 反序列化
    User deserializedUser = null;
    FileInputStream fis = new FileInputStream("user.ser");
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedUser = (User) ois.readObject();
    assertNotEquals(deserializedUser.hashCode(), acutalObject.hashCode());
    assertEquals(deserializedUser.getUserName(), "Sachin");
    assertEquals(deserializedUser.getPassword(), "xyzKumar");
}
```

在这里，我们可以看到密码是_xyzKumar_，因为我们的类中还没有_readObject()_，它可以检索原始字段并进行自定义更改。

### 3.3. 添加 _readObject()_ 以在反序列化期间进行自定义更改

接下来，我们可以在_readObject()_方法中，在反序列化期间对对象的字段进行特定更改，例如解码_password_。

让我们在我们的_User_类中实现_readObject()_方法，并删除我们在序列化期间添加到密码字段的额外字符串前缀：

```
private void readObject(ObjectInputStream ois) throws ClassNotFoundException, IOException {
    ois.defaultReadObject();
    this.password = password.substring(3);
}
```

### 3.4. 测试 _readObject()_ 实现

让我们再次测试我们的_User_类，只是这次，我们有一个自定义的_readObject()_方法将在反序列化期间被调用：

```
@Test
public void testDeserializeObj_withOverriddenReadObject() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream("user.ser");
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    User acutalObject = new User("Sachin", "Kumar");
    oos.writeObject(acutalObject);
    
    // 反序列化
    User deserializedUser = null;
    FileInputStream fis = new FileInputStream("user.ser");
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedUser = (User) ois.readObject();
    assertNotEquals(deserializedUser.hashCode(), acutalObject.hashCode());
    assertEquals(deserializedUser.getUserName(), "Sachin");
    assertEquals(deserializedUser.getPassword(), "Kumar");
}
```

在这里，我们可以注意到几件事。首先，对象是不同的，其次，我们的自定义_readObject()_被调用，密码字段被正确转换。

### 4. 使用 _readResolve()_

在Java反序列化中，_readResolve()_方法用于用不同的对象替换在反序列化期间创建的对象。这在我们需要确保我们的应用程序中只有一个特定类的实例存在，或者当我们想要用可能已经存在于内存中的不同实例替换对象时非常有用。

让我们回顾一下在我们的类中添加_readResolve()_的语法：

```
ANY-ACCESS-MODIFIER Object readResolve() throws ObjectStreamException;
```

**_readObject()_示例中的一件事是对象_hashCode_是不同的。这是因为在反序列化期间，新对象是从流对象创建的。**

我们可能想要使用_readResolve()_的一个常见场景是创建单例实例。我们可以使用_readResolve()_确保反序列化的对象与单例实例的现有实例相同。

让我们以创建单例对象为例：

```
public class Singleton implements Serializable {
    private static final long serialVersionUID = 1L;
    private static Singleton INSTANCE = new Singleton();
    
    private Singleton() {
    }
    
    public static Singleton getInstance() {
        return INSTANCE;
    }
}
```

### 4.1. 测试没有 _readResolve()_ 实现的情况

此时，我们还没有添加任何_readResolve()_方法。让我们测试我们的_Singleton_类：

```
@Test
public void testSingletonObj_withNoReadResolve() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream("singleton.ser");
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    Singleton actualSingletonObject = Singleton.getInstance();
    oos.writeObject(actualSingletonObject);
    
    // 反序列化
    Singleton deserializedSingletonObject = null;
    FileInputStream fis = new FileInputStream("singleton.ser");
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedSingletonObject = (Singleton) ois.readObject();
    assertNotEquals(actualSingletonObject.hashCode(), deserializedSingletonObject.hashCode());
}
```

在这里，我们可以看到两个对象是不同的，这违背了我们的_Singleton_类的目标。

### 4.2. 测试 _readResolve()_ 实现

为了解决这个问题，让我们在我们的_Singleton_类中添加_readResolve()_方法：

```
private Object readResolve() throws ObjectStreamException {
    return INSTANCE;
}
```

现在，让我们再次测试我们的_Singleton_类，这次加入了_readResolve()_方法：

```
@Test
public void testSingletonObj_withCustomReadResolve() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream("singleton.ser");
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    Singleton actualSingletonObject = Singleton.getInstance();
    oos.writeObject(actualSingletonObject);
    
    // 反序列化
    Singleton deserializedSingletonObject = null;
    FileInputStream fis = new FileInputStream("singleton.ser");
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedSingletonObject = (Singleton) ois.readObject();
    assertEquals(actualSingletonObject.hashCode(), deserializedSingletonObject.hashCode());
}
```

在这里，我们可以看到两个对象具有相同的_hashCode_。

### 5. _readObject()_ 与 _readResolve()_

让我们快速总结一下这两种方法之间的区别：

| _readResolve()_ | _readObject()_ |
| --- | --- |
| 方法返回类型是Object | 方法返回类型是void |
| 没有方法参数 | _ObjectInputStream_ 作为参数 |
| 通常用于实现单例模式，反序列化后需要返回相同的对象 | 用于设置未序列化的非瞬时字段的值，例如从其他字段派生的字段或动态初始化的字段 |
| 抛出 _ClassNotFoundException_, _ObjectStreamException_ | 抛出 _ClassNotFoundException_, _IOException_ |
| 由于不读取整个对象图，所以比_readObject()_ 快 | 由于读取整个对象图，所以比_readResolve()_ 慢 |

---
date: 2024-07-05
category:
  - Java
  - 序列化
tag:
  - readObject
  - readResolve
head:
  - - meta
    - name: keywords
      content: Java, 序列化, readObject, readResolve, Baeldung
---

# Java 序列化：readObject() 与 readResolve() | Baeldung

## 1. 概览

在本教程中，我们将探讨如何在Java反序列化API中使用_readObject()_和_readResolve()_方法。此外，我们将检查这两种方法之间的区别。

Java序列化涵盖了序列化和反序列化如何更深入地工作。在本文中，我们将重点关注_readResolve()_和_readObject()_方法，这些方法在使用反序列化时常引发问题。

## 3. 使用 _readObject()_

在序列化过程中，Java对象被转换为字节流以保存在文件中或通过互联网传输。在反序列化期间，使用_ObjectInputStream_的_readObject()_方法将序列化字节流转换回原始对象，该方法在内部调用_defaultReadObject()_进行默认反序列化。

**如果我们的类中存在_readObject()_方法，ObjectInputStream的_readObject()_方法将使用我们类的_readObject()_方法从流中读取对象。**

例如，在某些情况下，我们可以在我们的类中实现_readObject()_，以特定方式反序列化任何字段。

在我们展示用例之前，让我们检查一下在我们类中实现_readObject()_方法的语法：

```
private void readObject(ObjectInputStream stream) throws IOException, ClassNotFoundException;
```

现在，假设我们有一个_User_类，它有两个字段：

```
public class User implements Serializable {
    private static final long serialVersionUID = 3659932210257138726L;
    private String userName;
    private String password;
    // 标准的setters, getters, 构造函数(s) 和 toString()
}
```

此外，我们不想以明文形式序列化_password_，那么我们可以做什么？让我们看看Java的_readObject()_如何在这里帮助我们。

### 3.1. 添加 _writeObject()_ 以在序列化期间进行自定义更改

首先，我们可以在序列化期间，在_writeObject()_方法中对对象的字段进行特定更改，例如对_password_进行编码。

所以，对于我们的_User_类，让我们实现_writeObject()_方法，并在序列化期间为我们的密码字段添加额外的字符串前缀：

```
private void writeObject(ObjectOutputStream oos) throws IOException {
    this.password = "xyz" + password;
    oos.defaultWriteObject();
}
```

### 3.2. 测试没有 _readObject()_ 实现的情况

现在，让我们测试我们的_User_类，但这次没有实现_readObject()_。在这种情况下，将调用ObjectInputStream类的_readObject()_：

```
@Test
public void testDeserializeObj_withDefaultReadObject() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream("user.ser");
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    User acutalObject = new User("Sachin", "Kumar");
    oos.writeObject(acutalObject);
    
    // 反序列化
    User deserializedUser = null;
    FileInputStream fis = new FileInputStream("user.ser");
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedUser = (User) ois.readObject();
    assertNotEquals(deserializedUser.hashCode(), acutalObject.hashCode());
    assertEquals(deserializedUser.getUserName(), "Sachin");
    assertEquals(deserializedUser.getPassword(), "xyzKumar");
}
```

在这里，我们可以看到密码是_xyzKumar_，因为我们的类中还没有_readObject()_，它可以检索原始字段并进行自定义更改。

### 3.3. 添加 _readObject()_ 以在反序列化期间进行自定义更改

接下来，我们可以在_readObject()_方法中，在反序列化期间对对象的字段进行特定更改，例如解码_password_。

让我们在我们的_User_类中实现_readObject()_方法，并删除我们在序列化期间添加到密码字段的额外字符串前缀：

```
private void readObject(ObjectInputStream ois) throws ClassNotFoundException, IOException {
    ois.defaultReadObject();
    this.password = password.substring(3);
}
```

### 3.4. 测试 _readObject()_ 实现

让我们再次测试我们的_User_类，只是这次，我们有一个自定义的_readObject()_方法将在反序列化期间被调用：

```
@Test
public void testDeserializeObj_withOverriddenReadObject() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream("user.ser");
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    User acutalObject = new User("Sachin", "Kumar");
    oos.writeObject(acutalObject);
    
    // 反序列化
    User deserializedUser = null;
    FileInputStream fis = new FileInputStream("user.ser");
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedUser = (User) ois.readObject();
    assertNotEquals(deserializedUser.hashCode(), acutalObject.hashCode());
    assertEquals(deserializedUser.getUserName(), "Sachin");
    assertEquals(deserializedUser.getPassword(), "Kumar");
}
```

在这里，我们可以注意到几件事。首先，对象是不同的，其次，我们的自定义_readObject()_被调用，密码字段被正确转换。

## 4. 使用 _readResolve()_

在Java反序列化中，_readResolve()_方法用于用不同的对象替换在反序列化期间创建的对象。这在我们需要确保我们的应用程序中只有一个特定类的实例存在，或者当我们想要用可能已经存在于内存中的不同实例替换对象时非常有用。

让我们回顾一下在我们的类中添加_readResolve()_的语法：

```
ANY-ACCESS-MODIFIER Object readResolve() throws ObjectStreamException;
```

**_readObject()_示例中的一件事是对象_hashCode_是不同的。这是因为在反序列化期间，新对象是从流对象创建的。**

我们可能想要使用_readResolve()_的一个常见场景是创建单例实例。我们可以使用_readResolve()_确保反序列化的对象与单例实例的现有实例相同。

让我们以创建单例对象为例：

```
public class Singleton implements Serializable {
    private static final long serialVersionUID = 1L;
    private static Singleton INSTANCE = new Singleton();
    
    private Singleton() {
    }
    
    public static Singleton getInstance() {
        return INSTANCE;
    }
}
```

### 4.1. 测试没有 _readResolve()_ 实现的情况

此时，我们还没有添加任何_readResolve()_方法。让我们测试我们的_Singleton_类：

```
@Test
public void testSingletonObj_withNoReadResolve() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream("singleton.ser");
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    Singleton actualSingletonObject = Singleton.getInstance();
    oos.writeObject(actualSingletonObject);
    
    // 反序列化
    Singleton deserializedSingletonObject = null;
    FileInputStream fis = new FileInputStream("singleton.ser");
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedSingletonObject = (Singleton) ois.readObject();
    assertNotEquals(actualSingletonObject.hashCode(), deserializedSingletonObject.hashCode());
}
```

在这里，我们可以看到两个对象是不同的，这违背了我们的_Singleton_类的目标。

### 4.2. 测试 _readResolve()_ 实现

为了解决这个问题，让我们在我们的_Singleton_类中添加_readResolve()_方法：

```
private Object readResolve() throws ObjectStreamException {
    return INSTANCE;
}
```

现在，让我们再次测试我们的_Singleton_类，这次加入了_readResolve()_方法：

```
@Test
public void testSingletonObj_withCustomReadResolve() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream("singleton.ser");
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    Singleton actualSingletonObject = Singleton.getInstance();
    oos.writeObject(actualSingletonObject);
    
    // 反序列化
    Singleton deserializedSingletonObject = null;
    FileInputStream fis = new FileInputStream("singleton.ser");
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedSingletonObject = (Singleton) ois.readObject();
    assertEquals(actualSingletonObject.hashCode(), deserializedSingletonObject.hashCode());
}
```

在这里，我们可以看到两个对象具有相同的_hashCode_。

## 5. _readObject()_ 与 _readResolve()_

让我们快速总结一下这两种方法之间的区别：

| _readResolve()_ | _readObject()_ |
| --- | --- |
| 方法返回类型是Object | 方法返回类型是void |
| 没有方法参数 | _ObjectInputStream_ 作为参数 |
| 通常用于实现单例模式，反序列化后需要返回相同的对象 | 用于设置未序列化的非瞬时字段的值，例如从其他字段派生的字段或动态初始化的字段 |
| 抛出 _ClassNotFoundException_, _ObjectStreamException_ | 抛出 _ClassNotFoundException_, _IOException_ |
| 由于不读取整个对象图，所以比_readObject()_ 快 | 由于读取整个对象图，所以比_read