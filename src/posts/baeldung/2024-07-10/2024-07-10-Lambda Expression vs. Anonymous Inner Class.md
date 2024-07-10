---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Lambda Expression
  - Anonymous Class
head:
  - - meta
    - name: keywords
      content: Java, Lambda Expression, Anonymous Class, Functional Programming
---
# Lambda表达式与匿名内部类的比较

匿名类是像嵌套类一样但没有名称的类。Lambda表达式是在Java 8中引入的，以促进函数式编程。在某些用例中，它们被用作匿名类的替代品。在本文中，我们将探讨匿名类和Lambda表达式之间的区别。

匿名类实现了接口和抽象类，而无需创建额外的子类。此外，匿名类没有名称，并且**同时提供类定义并实例化它**。

现在让我们看一个实现_Runnable_接口的匿名类的示例：

```java
public class AnonymousClassExample {
    public static void main(String[] args){
        Thread t1 = new Thread(new Runnable(){
            @Override
            public void run() {
                System.out.println("Thread: " + Thread.currentThread().getName() + " started");
            }
        });
        t1.start();
    }
}
```

在上面的示例中，我们创建了一个名为_AnonymousClassExample_的类，并使用匿名类提供了_Runnable_接口的实现。我们没有创建任何单独的类来实现_Runnable_接口。

### 3. Lambda表达式

Lambda表达式实现了函数式接口，这些接口具有单个未实现的方法。Lambda表达式本质上是不带名称的方法定义。它使代码更简洁、更易读。**它还提供了将函数作为方法参数传递的方式**。

现在让我们看一个实现_Runnable_接口的Lambda表达式的示例：

```java
public class LambdaExpressionExample {
    public static void main(String[] args){
        Thread t1 = new Thread(() -> System.out.println("Thread: " + Thread.currentThread().getName() + " started"));
        t1.start();
    }
}
```

在这里，我们使用了匿名方法。这将解析为_Runnable_接口的_run()_方法。

即使在函数式接口的情况下，我们也可以互换使用匿名类和Lambda表达式。但它们之间存在一些差异。现在让我们深入探讨这些差异。

### 4. 匿名类与Lambda表达式的比较

如前所述，匿名类用于接口和抽象类，而Lambda表达式仅用于函数式接口。让我们看看它们之间的一些额外差异。

#### 4.1. 语法

匿名类同时提供类定义并实例化它。我们使用_new_关键字和我们正在实现的类或接口的名称。这就像调用构造函数，但我们还提供了方法实现并声明状态变量。**匿名类是一个表达式，分配给它实现的类或接口的引用变量。** 因此，我们也在末尾加上分号。

另一方面，Lambda表达式是一个没有名称的方法。我们在函数式接口中提供了未实现方法的签名，但没有名称。我们也不需要提及方法参数的数据类型。该方法在运行时解析。

#### 4.2. _this_关键字和变量的作用域

在匿名类中，_this_关键字指的是匿名类本身。但在Lambda表达式的情况下，_this_指的是其封闭类。

我们还可以在匿名类中声明成员变量，这在Lambda表达式中是不可能的。因此，匿名类可以有状态。Lambda表达式内部声明的变量作为局部变量。不过，它们都可以访问封闭类的成员变量。

#### 4.3. 编译

在编译时，每个匿名类都会生成一个单独的类文件。类文件的格式是类名后跟一个美元符号和一个数字。例如，如果我们在名为_TestClass_的类中定义了一个匿名类，那么编译后，将创建一个额外的文件_TestClass$1.class_。

另一方面，在Lambda表达式的情况下，类文件中添加了_invokedynamic_指令。**这个操作码指令有助于找出要调用的函数式接口方法。**

**当我们编译Lambda表达式时，一个等效的私有静态或非静态方法被添加到字节码中。** 这个方法的签名与函数式接口方法匹配。

此外，如果Lambda表达式使用了捕获参数，它们也会在方法参数列表中前置。还添加了一个额外的_indy_调用点。它具有调用Lambda表达式生成的私有方法所需的所有信息。在运行时，调用点被引导，并且调用链接的私有方法。

#### 4.4. 性能

现在让我们看看匿名类和Lambda表达式在高层次性能影响方面的比较。在性能方面，Lambda表达式比匿名类更好。这是因为匿名类在编译时会导致额外的类文件，这在运行时的类加载和验证期间需要额外的时间。

Lambda表达式的性能更好，因为_invokedynamic_指令将Lambda表达式延迟绑定到函数式接口方法。Lambda表达式的第一个调用较慢。后续调用更快。

## 5. 结论

在本文中，我们探讨了Lambda表达式和匿名内部类之间的区别。我们了解了它们在语法、编译过程和性能方面的差异。

像往常一样，示例的源代码可以在GitHub上找到。