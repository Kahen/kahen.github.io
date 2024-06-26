---
date: 2024-06-26
category:
  - Programming
  - Java
tag:
  - Colon Usage
  - Java Features
head:
  - - meta
    - name: keywords
      content: Java, Colon, for-each loop, switch statement, labels, ternary operator, method references, assertions
---
# Java中冒号的多种用法

许多编程语言使用冒号字符(:)来实现不同的功能。例如，C++使用它进行访问修饰符和类继承，JavaScript使用它进行对象声明。Python语言在函数定义、条件块、循环等方面大量依赖它。

事实证明，**Java也有一个长长的列表，其中冒号字符出现的地方**。在本教程中，我们将一一查看它们。

## 2. 增强型for循环
for循环是程序员在任何语言中首先学习的控制语句之一。这是Java中的语法：

```java
for (int i = 0; i `< 10; i++) {
    // 做一些事情
}
```

除了其他事情外，这种控制结构非常适合遍历集合或数组中的项目。实际上，这个用例如此常见，以至于在Java 1.5中，语言引入了一种更紧凑的形式，称为for-each循环。

下面是一个使用for-each语法遍历数组的示例：

```java
int[] numbers = new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9};
for (int i : numbers) {
    // 做一些事情
}
```

在这里我们可以注意到冒号字符。**我们应该将其读作“在”**。因此，上面的循环可以被认为是“对于numbers中的每个整数i”。

除了数组，这种语法还可以用于List和Set：

```java
List<Integer>` numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
for (Integer i : numbers) {
    // 做一些事情
}
```

for-each循环的目的是消除与标准for循环相关的样板代码，从而减少错误的可能性。但是，它通过牺牲一些功能来实现这一点，比如跳过索引、反向迭代等。

## 3. switch语句
在Java中，我们发现冒号字符的另一个地方是在switch语句中。**switch语句是一种更易读、通常更紧凑的if/else块的形式**。

让我们看一个例子：

```java
void printAnimalSound(String animal) {
    if (animal.equals("cat")) {
        System.out.println("meow");
    }
    else if (animal.equals("lion")) {
        System.out.println("roar");
    }
    else if (animal.equals("dog") || animal.equals("seal")) {
        System.out.println("bark");
    }
    else {
        System.out.println("unknown");
    }
}
```

这组语句可以使用switch语句重写：

```java
void printAnimalSound(String animal) {
    switch(animal) {
        case "cat":
            System.out.println("meow");
            break;
        case "lion":
            System.out.println("roar");
            break;
        case "dog":
        case "seal":
            System.out.println("bark");
            break;
        default:
            System.out.println("unknown");
    }
}
```

在这种情况下，冒号字符出现在每个case的末尾。但是，这只是传统的switch语句的情况。在Java 12中，语言添加了一种使用表达式的扩展形式的switch，**在这种情况下，我们使用箭头运算符(->)而不是冒号**。

## 4. 标签
Java的一个经常被遗忘的特性是标签。虽然一些程序员可能对标签及其与goto语句的关联有不好的记忆，但在Java中，标签有一个非常重要的用途。

让我们考虑一系列嵌套循环：

```java
for (int i = 0; i `< 10; i++) {
    for (int j = 0; j < 10; j++) {
        if (checkSomeCondition()) {
            break;
        }
    }
}
```

在这种情况下，break关键字导致内部循环停止执行，并将控制权返回给外部循环。这是因为，默认情况下，**break语句将控制权返回到最近的控制块的末尾**。在这种情况下，这意味着j变量的循环。让我们看看如何使用标签改变行为。

首先，我们需要用标签重写我们的循环：

```java
outerLoop: for (int i = 0; i < 10; i++) {
    innerLoop: for (int j = 0; j < 10; j++) {
        if (checkSomeCondition()) {
            break outerLoop;
        }
    }
}
```

我们有相同的两个循环，但现在每个都有一个标签：一个命名为outerLoop，另一个命名为innerLoop。我们可以注意到，break语句现在后面跟着一个标签名称。**这指示JVM将控制权转移到该标记语句的末尾**，而不是默认行为。结果是break语句退出了i变量的循环，有效地结束了两个循环。

## 5. 三元运算符
**Java三元运算符是简单if/else语句的简写**。假设我们有以下代码：

```java
int x;
if (checkSomeCondition()) {
    x = 1;
}
else {
    x = 2;
}
```

使用三元运算符，我们可以缩短相同的代码：

```java
x = checkSomeCondition() ? 1 : 2;
```

此外，三元运算符与其他语句一起使用可以提高我们的代码可读性：

```java
boolean remoteCallResult = callRemoteApi();
LOG.info(String.format(
  "The result of the remote API call %s successful",
  remoteCallResult ? "was" : "was not"
));
```

**这节省了我们将三元运算符的结果分配给单独变量的额外步骤**，使我们的代码更紧凑，更易于理解。

## 6. 方法引用
作为lambda项目的一部分，在Java 8中引入的方法引用也使用冒号字符。**方法引用在Java中的多个地方出现，最明显的是在流中**。让我们看几个例子。

假设我们有一个名称列表，想要将每个名称大写。在lambdas和方法引用之前，我们可能会使用传统的for循环：

```java
List```<String>```` names = Arrays.asList("ross", "joey", "chandler");
List```<String>``` upperCaseNames = new ArrayList<>();
for (String name : names) {
  upperCaseNames.add(name.toUpperCase());
}
```

我们可以使用流和方法引用来简化这个操作：

```java
List```<String>``` names = Arrays.asList("ross", "joey", "chandler");
List```<String>``` upperCaseNames = names
  .stream()
  .map(String::toUpperCase)
  .collect(Collectors.toList());
```

在这种情况下，我们正在使用String类中的toUpperCase()实例方法的引用作为map()操作的一部分。

方法引用对于filter()操作也很有用，其中方法接受一个参数并返回一个boolean：

```java
List````<Animal>```` pets = Arrays.asList(new Cat(), new Dog(), new Parrot());
List````<Animal>```` onlyDogs = pets
  .stream()
  .filter(Dog.class::isInstance)
  .collect(Collectors.toList());
```

在这种情况下，我们正在使用所有类可用的isInstance()方法的方法引用来过滤不同动物类型的列表。

最后，我们也可以使用方法引用与构造函数。我们通过将new运算符与类名和方法引用结合来实现这一点：

```java
List````<Animal>```` pets = Arrays.asList(new Cat(), new Dog(), new Parrot());
Set````<Animal>```` onlyDogs = pets
  .stream()
  .filter(Dog.class::isInstance)
  .collect(Collectors.toCollection(TreeSet::new));
```

在这种情况下，我们正在将过滤后的动物收集到一个新的TreeSet而不是List中。

## 7. 断言
Java语言的另一个经常被忽视的特性是断言。在Java 1.4中引入的assert关键字用于测试条件。如果该条件为false，则抛出错误。

让我们看一个例子：

```java
void verifyConditions() {
    assert getConnection() != null : "Connection is null";
}
```

在这个例子中，如果getConnection()方法的返回值是null，则JVM抛出AssertionError。**冒号后的字符串是可选的**。它允许我们在条件为false时抛出的错误中提供一条消息。

**我们必须记住，断言默认是禁用的**。要使用它们，我们必须使用-ea命令行参数启用它们。

## 8. 结论
在本文中，我们学习了Java如何在多种不同的情况下使用冒号字符。具体来说，我们看到了冒号字符是如何在增强型for循环、switch语句、标签、三元运算符、方法引用和断言中使用的。

这些特性中的许多自从Java早期就已经存在，但随着语言的变化和添加新特性，一些特性已经被添加进来。

如往常一样，上述代码示例可以在GitHub上找到。