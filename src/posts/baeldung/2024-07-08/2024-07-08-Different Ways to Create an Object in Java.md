---
date: 2022-04-01
category:
  - Java
  - Object Creation
tag:
  - Java
  - OOP
  - Object Creation
head:
  - - meta
    - name: keywords
      content: Java对象创建,Java对象实例化,Java对象序列化,Java对象克隆
---
# Java中创建对象的不同方式

Java是一种面向对象编程（OOP）语言。这意味着Java使用对象，通常组织在类中，来模拟状态和行为。

在本教程中，我们将探讨我们可以创建对象的一些不同方式。

在我们大多数示例中，我们将使用一个非常简单的_兔子_对象：

```
public class Rabbit {
    String name = "";

    public Rabbit() {
    }

    // getter/setter
}
```

我们的_兔子_对象不一定有_名字_，尽管如果需要，我们可以设置一个_名字_。

现在，让我们创建一些_兔子_对象！

### 2. 使用_new_操作符创建对象

**使用_new_关键字可能是创建对象最常见的方式：**

```
Rabbit rabbit = new Rabbit();
```

在上面的示例中，我们将一个新的_兔子_实例分配给一个名为_rabbit_的变量。

_new_关键字表示我们想要一个新对象实例。它通过使用该对象内的构造器类来实现这一点。

如果没有在类中定义构造器，将使用一个内在的默认构造器。

### 3. 使用_Class.newInstance()_方法创建对象

由于Java是一种基于对象的语言，将Java的关键概念作为对象存储是有意义的。

一个例子是_Class_对象，它存储了有关Java类的所有信息。

**要访问_兔子_类对象，我们使用_qualified class name_的_Class.forName()_**（包含类的包名的名称）。

**一旦我们获得了我们的_兔子_对应的类对象，我们将调用_newInstance()_方法**，它创建了一个新的_兔子_对象实例：

```
Rabbit rabbit = (Rabbit) Class
  .forName("com.baeldung.objectcreation.objects.Rabbit")
  .newInstance();
```

注意，我们必须将新对象实例转换为_兔子_类型。

这个版本的一个稍微不同之处是使用_class_关键字而不是_Class_对象，这更加简洁：

```
Rabbit rabbit = Rabbit.class.newInstance();
```

让我们也使用_Constructor_类来产生一个类似的替代方案：

```
Rabbit rabbit = Rabbit.class.getConstructor().newInstance();
```

在所有这些情况下，我们都在使用任何对象都可用的内置_newInstance()_方法。

**_newInstance()_方法依赖于构造函数的可见性。**

例如，如果_兔子_只有私有构造函数，并且我们尝试使用上述的_newInstance_方法之一，我们将看到一个_IllegalAccessException_的堆栈跟踪：

```
java.lang.IllegalAccessException: Class com.baeldung.objectcreation.CreateRabbits cannot access
  a member of class com.baeldung.objectcreation.objects.Rabbit with modifiers "private"
  at sun.reflect.Reflection.ensureMemberAccess(Reflection.java:102)
  at java.lang.Class.newInstance(Class.java:436)
```

### 4. 使用_clone()_方法创建对象

现在让我们看看如何克隆一个对象。

**_clone()_方法接受一个对象，并在新内存中产生它的一个完全副本。**

然而，并非所有类都可以被克隆。

**只有实现了_Clonable_接口的类才能被克隆。**

该类还必须包含_clone()_方法的实现，所以让我们创建一个名为_CloneableRabbit_的类，它与_兔子_相同，但也实现了_clone()_方法：

```
public Object clone() throws CloneNotSupportedException {
    return super.clone();
}
```

然后，我们克隆_CloneableRabbit_的代码是：

```
ClonableRabbit clonedRabbit = (ClonableRabbit) originalRabbit.clone();
```

如果我们考虑使用_clone()_方法，我们可能想要使用Java复制构造函数代替。

### 5. 使用反序列化创建对象

我们已经涵盖了一些明显的例子，所以让我们开始跳出常规思考。

**我们可以通过反序列化来创建对象**（从外部数据中读取，然后我们可以从中创建对象）。

为了演示这一点，首先，我们需要一个可序列化的类。

**我们可以通过复制_兔子_并实现_Serializable_接口来使我们的类可序列化：**

```
public class SerializableRabbit implements Serializable {
    //class contents
}
```

然后我们将一个名为Peter的_兔子_写入到测试目录中的一个文件：

```
SerializableRabbit originalRabbit = new SerializableRabbit();
originalRabbit.setName("Peter");

File resourcesFolder = new File("src/test/resources");
resourcesFolder.mkdirs(); //creates the directory in case it doesn't exist

File file = new File(resourcesFolder, "rabbit.ser");

try (FileOutputStream fileOutputStream = new FileOutputStream(file);
  ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);) {
    objectOutputStream.writeObject(originalRabbit);
}
```

最后，我们将再次读取它：

```
try (FileInputStream fis = new FileInputStream(file);
  ObjectInputStream ois = new ObjectInputStream(fis);) {
    return (SerializableRabbit) ois.readObject();
}
```

如果我们检查名字，我们将看到这个新创建的_兔子_对象是Peter。

这整个概念是一个很大的主题，称为反序列化。

### 6. 其他创建对象的方式

如果我们深入挖掘，会发现有很多我们可以做的事情本质上是创建对象。

以下是一些我们经常使用的熟悉类，以及其他我们可能永远不会使用的类。

#### 6.1. 函数式接口

我们可以通过使用函数式接口来创建一个对象：

```
Supplier`<Rabbit>` rabbitSupplier = Rabbit::new;
Rabbit rabbit = rabbitSupplier.get();
```

这段代码使用_Supplier_函数式接口来提供_兔子_对象。

我们使用方法引用操作符，即_兔子::new_中的双冒号操作符。

双冒号操作符文章包含更多示例，比如如何处理构造函数中的参数。

#### 6.2. _Unsafe.AllocateInstance_

让我们快速提到一种我们不会推荐用于我们的代码的对象创建方法。

**_sun.misc.Unsafe_类是一个低级类，用于核心Java类中，**这意味着它不是设计用于我们的代码。

然而，它确实包含一个名为_allocateInstance_的方法，可以在不调用构造函数的情况下创建对象。

由于**_Unsafe_不推荐在核心库之外使用**，我们这里没有包含示例。

#### 6.3. 数组

另一种在Java中创建对象的方式是通过初始化数组。

代码结构看起来与之前使用_new_关键字的示例相似：

```
Rabbit[] rabbitArray = new Rabbit[10];
```

然而，在运行代码时，我们看到**它没有显式使用构造函数方法**。所以，虽然它在外部看起来使用相同的代码风格，但幕后的内部机制是不同的。

#### 6.4. 枚举

让我们再次快速看看另一个常见的对象，枚举。

枚举只是类的一种特殊类型，我们以面向对象的方式考虑它们。

所以如果我们有一个枚举：

```
public enum RabbitType {
    PET,
    TAME,
    WILD
}
```

**代码将在我们初始化枚举时每次都创建对象**，这与上述在运行时创建对象的示例不同。

### 7. 结论

在本文中，我们看到了我们可以使用关键字，如_new_或_class_来创建一个对象。

我们了解到，克隆或反序列化等其他操作可以创建对象。

我们还看到，Java充满了创建对象的方式，其中许多我们可能已经在不知不觉中使用了。

如往常一样，我们讨论的所有方式的完整示例都可以在GitHub上找到。