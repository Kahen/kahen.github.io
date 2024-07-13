---
date: 2022-10-19
category:
  - Java
  - 设计模式
tag:
  - 工厂模式
  - Java泛型
head:
  - - meta
    - name: keywords
      content: Java工厂模式, 泛型, 设计模式
---
# Java中使用泛型实现工厂模式

在本教程中，我们将学习如何在Java中使用泛型来实现工厂模式。

## 2. 什么是工厂模式？
在面向对象编程中，工厂模式是一种创建型设计模式，当被调用时负责创建对象。

**工厂是一个类，它通过方法调用来创建原型类，即接口的对象：**

工厂模式非常适合我们想要创建一个公共接口的对象，同时隐藏创建逻辑。

## 3. 如何实现？
现在让我们学习如何实现它。首先，让我们看看类图：

接下来，让我们实现图中的每个类。

### 3.1. 实现_Notifier_接口
_Notifier_接口是一个原型，其他通知器类实现它：

```java
public interface Notifier``````<T>`````` {
    void notify(T obj);
}
```

如我们所见，_Notifier_类是一个泛型类，它有一个名为_notify_的方法。

### 3.2. 实现_Notifier_类
现在让我们实现另外两个通知器类：

```java
public class StringNotifier implements Notifier```<String>``` {

    @Override
    public void notify(String str) {
        System.out.println("Notifying: " + str);
    }
}

public class DateNotifier implements Notifier```<Date>``` {

    @Override
    public void notify(Date date) {
        System.out.println("Notifying: " + date);
    }
}
```

现在我们有两个使用_Notifier_接口的类——一个将输出简单文本，另一个将发布日期。

### 3.3. 实现工厂
工厂类每次调用其唯一的方法_getNotifier()_时都会生成一个通知器实例：

```java
public class NotifierFactory {

    public ``````<T>`````` Notifier``````<T>`````` getNotifier(Class``````<T>`````` c) {
        if (c == String.class) {
            return Record.STRING.make();
        }
        if (c == Date.class) {
            return Record.DATE.make();
        }
        return null;
    }

}
```

在上面的代码中，_Record_是一个枚举，有两个常量分别命名为_STRING_和_DATE_。

### 3.4. 实现_Record_
**_Record_枚举保留有效通知器类的记录，并在工厂类调用它时每次创建一个实例：**

```java
public enum Record {
    STRING {
        @Override
        public Notifier```<String>``` make() {
            return new StringNotifier();
        }
    },
    DATE {
        @Override
        public Notifier```<Date>``` make() {
            return new DateNotifier();
        }
    };

    public abstract ``````<T>`````` Notifier``````<T>`````` make();
}
```

我们已经成功实现了工厂模式。

## 4. 使用工厂
让我们在_Main_类中使用工厂：

```java
public static void main(String[] args) {
    NotifierFactory factory = new NotifierFactory();
    Notifier```<String>``` stringNotifier = factory.getNotifier(String.class);
    Notifier```<Date>``` dateNotifier = factory.getNotifier(Date.class);

    stringNotifier.notify("Hello world!");
    dateNotifier.notify(new Date());
}
```

现在我们应该编译并运行我们的代码：

```shell
$ javac Main.java
$ java Main
Notifying: Hello world!
Notifying: Wed Oct 19 17:36:38 TRT 2022
```

如我们所见，工厂已成功创建了两个适当类型的通知器实例。

## 5. 总结
在本文中，我们学习了如何在Java中实现和使用工厂模式。

如常，源代码可在GitHub上找到。