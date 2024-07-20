---
date: 2022-04-01
category:
  - Java
  - Operators
tag:
  - Java Operators
  - Tutorial
head:
  - - meta
    - name: keywords
      content: Java Operators, Tutorial, Baeldung
---
# Java运算符 | Baeldung

## 1. 概述

运算符是任何编程语言的基本构建块。我们使用运算符对值和变量执行操作。

Java提供了许多组运算符。它们根据功能进行分类。

在本教程中，我们将遍历所有Java运算符，以理解它们的功能以及如何使用它们。

## 2. 算术运算符

我们使用算术运算符执行简单的数学运算。我们应该注意，算术运算符仅适用于原始数字类型及其包装类型，例如int和Integer。

接下来，让我们看看算术运算符组中的运算符。

### 2.1. 加法运算符

加法运算符(+)允许我们添加两个值或连接两个字符串：

```java
int ten = 5 + 5;
String youAndMe = "You " + "and" + " Me";
```

### 2.2. 减法运算符

通常，我们使用减法运算符(-)从一个值中减去另一个值：

```java
int five = 10 - 5;
int negative80 = 20 - 100;
```

### 2.3. 乘法运算符

乘法运算符(*)用于乘以两个值或变量：

```java
int hundred = 20 * 5;
int fifteen = -5 * -3;
```

### 2.4. 除法运算符

除法运算符(/)允许我们将左手边的值除以右手边的值：

```java
int four = 20 / 5;
int seven = 15 / 2;
```

当我们对两个整数值（byte、short、int和long）使用除法运算符时，我们应该注意到**结果仅是商值。余数不包括在内**。

正如上面的例子所示，如果我们计算15 / 2，商是7，余数是1。因此，我们有15 / 2 = 7。

### 2.5. 模运算符

我们可以使用除法运算符获得商。然而，如果我们只想要除法计算的**余数**，我们可以使用模运算符(%)：

```java
int one = 15 % 2;
int zero = 10 % 5;
```

## 3. 一元运算符

顾名思义，一元运算符只需要一个单一的操作数。例如，我们通常使用一元运算符来递增、递减或否定一个变量或值。

现在，让我们看看Java中一元运算符的细节。

### 3.1. 一元加运算符

一元加运算符(+)表示正值。如果数字是正的，我们可以省略‘+’运算符：

```java
int five = +5; // 与：int five = 5相同
```

### 3.2. 一元减运算符

与一元加运算符相反，一元减运算符(-)否定一个值或表达式：

```java
int negativeFive = -5;
int eighty = -(20 - 100);
```

### 3.3. 逻辑补运算符

逻辑补运算符(!)也称为“非”运算符。我们可以用它来反转布尔变量或值的值：

```java
boolean aTrue = true;
boolean bFalse = !aTrue;
```

### 3.4. 递增运算符

递增运算符(++)允许我们将变量的值增加1：

```java
int number = 5;
number++; // number = 6
```

### 3.5. 递减运算符

递减运算符(--)与递增运算符相反。它将变量的值减少1：

```java
int number = 5;
number--; // number = 4
```

我们应该记住，**递增和递减运算符只能用于变量**。例如，“int a = 5; a++;”是正确的。然而，表达式“5++”将不会被编译。

## 4. 关系运算符

关系运算符也可以称为“比较运算符”。基本上，我们使用这些运算符来比较两个值或变量。

### 4.1. 等于运算符

我们使用等于运算符(==)比较两边的值。如果它们相等，操作返回true：

```java
int number1 = 5;
int number2 = 5;
boolean theyAreEqual = number1 == number2;
```

等于运算符非常简单明了。另一方面，Object类提供了equals()方法。由于Object类是所有Java类的超类，所有Java对象都可以使用equals()方法相互比较。

当我们想要比较两个对象时——例如，当我们比较Long对象或比较Strings时——**我们应该明智地选择equals()方法和等于运算符的比较方法**。

### 4.2. 不等于运算符

不等于运算符(!=)与‘==’运算符相反。如果两边的值不相等，操作返回true：

```java
int number1 = 5;
int number2 = 7;
boolean notEqual = number1 != number2;
```

### 4.3. 大于运算符

当我们使用大于运算符(>)比较两个值时，如果左手边的值大于右手边的值，它返回true：

```java
int number1 = 7;
int number2 = 5;
boolean greater = number1 > number2;
```

### 4.4. 大于等于运算符

大于等于运算符(>=)比较两边的值，并在左手边的操作数大于或等于右手边的操作数时返回true：

```java
int number1 = 7;
int number2 = 5;
boolean greaterThanOrEqualTo = number1 >= number2;
number1 = 5;
greaterThanOrEqualTo = number1 >= number2;
```

### 4.5. 小于运算符

小于运算符(`<)比较两边的两个值，并在左手边的值小于右手边的值时返回true：

```java
int number1 = 4;
int number2 = 5;
boolean lessThan = number1 < number2;
```

### 4.6. 小于等于运算符

同样，小于等于运算符(<=)比较两边的值，并在左手边的操作数小于或等于右手边的操作数时返回true：

```java
int number1 = 4;
int number2 = 5;
boolean lessThanOrEqualTo = number1 <= number2;
number1 = 5;
lessThanOrEqualTo = number1 <= number2;
```

## 5. 逻辑运算符

Java中有**两个逻辑运算符：逻辑与和或运算符**。基本上，它们的功能与数字电子学中的与门和或门非常相似。

通常，我们使用逻辑运算符与两个操作数，它们是变量或可以被评估为布尔值的表达式。

接下来，让我们更仔细地看看它们。

### 5.1. 逻辑与运算符

逻辑与运算符(&&)仅当两个操作数都是true时返回true：

```java
int number1 = 7;
int number2 = 5;
boolean resultTrue = (number1 >` 0) && (number1 > number2);
```

### 5.2. 逻辑或运算符

与‘&&’运算符不同，逻辑或运算符(\|\|)如果至少有一个操作数是true就返回true：

```java
int number1 = 7;
int number2 = 5;
boolean resultTrue = (number1 > 100) || (number1 > number2);
```

**我们应该注意到逻辑或运算符具有短路效果：**一旦一个操作数被评估为true，它就返回true，而不会评估剩余的操作数。

## 6. 三元运算符

三元运算符是if-then-else语句的简写形式。它之所以被称为三元，是因为它有三个操作数。首先，让我们看看标准if-then-else语句的语法：

```java
if ( condition ) {
    expression1
} else {
    expression2
}
```

我们可以将上面的if-then-else语句转换为使用三元运算符的紧凑版本：

让我们看看它的语法：

```java
condition ? expression1 : expression2
```

接下来，让我们通过一个简单的例子来理解三元运算符的工作原理：

```java
int number = 100;
String greaterThan50 = number > 50 ? "The number is greater than 50" : "The number is NOT greater than 50";
```

## 7. 位运算符和位移运算符

由于文章“Java位运算符”涵盖了位运算符和位移运算符的详细信息，我们将在本教程中简要总结这些运算符。

### 7.1. 位与运算符

位与运算符(&)返回输入值的逐位与结果：

``````java
int number1 = 12;
int number2 = 14;
int twelve = number1 & number2; // 00001100 & 00001110 = 00001100 = 12
```

### 7.2. 位或运算符

位或运算符(|)返回输入值的逐位或结果：

```java
int number1 = 12;
int number2 = 14;
int fourteen = number1 | number2; // 00001100 | 00001110 = 00001110 = 14
```

### 7.3. 位异或运算符

位异或运算符(^)返回输入值的逐位异或结果：

```java
int number1 = 12;
int number2 = 14;
int two = number1 ^ number2; // 00001100 ^ 00001110 = 00000010 = 2
```

### 7.4. 位补运算符

位补运算符(~)是一个一元运算符。它返回值的补码表示，即反转输入值的所有位：

```java
int number = 12;
int negative13 = ~number; // ~00001100 = 11110011 = -13
```

### 7.5. 左移位运算符

位移运算符将位向左或向右移动给定次数。

左移位运算符(`<<)将位向左移动由右手边操作数定义的次数。左移后，右侧的空位用0填充。

接下来，让我们将数字12左移两次：

```java
int fourtyeight = 12 << 2; // 00001100 << 2 = 00110000 = 48
```

**_n << x_ 与将数字_n_ 乘以_2的x次方具有相同效果。**

### 7.6. 有符号右移位运算符

有符号右移位运算符(>`>)将位向右移动由右手边操作数定义的次数，并将0填充到由于移动而留下的空位。

我们应该注意到**位移后的最左边位置取决于符号扩展**。

接下来，让我们对数字12和-12进行“有符号右移”两次，看看差异：

```java
int three = 12 >> 2; // 00001100 >> 2 = 00000011 = 3
int negativeThree = -12 >> 2; // 11110100 >> 2 = 11111101 = -3
```

正如上面的第二个例子所示，如果数字是负数，每次位移后的最左边位置将由符号扩展设置。

**_n >> x_ 与将数字_n_ 除以_2的x次方具有相同效果。**

### 7.7. 无符号右移位运算符

无符号右移位运算符(>>>)的工作原理与‘>>’运算符类似。唯一的区别是，在位移后，**最左边的位被设置为0**。

接下来，让我们对数字12和-12进行无符号右移两次，看看差异：

```java
int three = 12 >>> 2; // 00001100 >>> 2 = 00000011 = 3
int result = -12 >>> 2; // 结果 = 1073741821 (11111111111111111111111111110100 >>> 2 = 00111111111111111111111111111101)
```

正如我们在上面第二个例子中看到的，**>>>运算符无论数字是正数还是负数，都会用0填充左侧的空位。**

## 8. _instanceof_ 运算符

有时，当我们有一个对象时，我们想测试它是否是给定类型实例。_instanceof_运算符可以帮助我们做到这一点：

```java
boolean resultTrue = Long.valueOf(20) instanceof Number;
```

## 9. 赋值运算符

我们使用赋值运算符为变量赋值。接下来，让我们看看Java中可以使用的赋值运算符。

### 9.1. 简单赋值运算符

简单赋值运算符(=)是Java中一个简单但重要的运算符。实际上，我们在前面的示例中多次使用了它。它将右侧的值赋给左侧的操作数：

```java
int seven = 7;
```

### 9.2. 复合赋值

我们已经学习了算术运算符。**我们可以将算术运算符与简单赋值运算符结合，创建复合赋值。**

例如，我们可以以复合方式编写“_a = a + 5_”：“_a += 5_”。

最后，让我们通过示例遍历Java中支持的所有复合赋值：

```java
// 假设所有变量(a,b,c,d,e)的初始值为10
a += 4; // a = 14, 与 a = a + 4 相同
b -= 4; // b = 6, 与 b = b - 4 相同
c *= 4; // c = 40, 与 c = c * 4 相同
d /= 4; // d = 2, 与 d = d / 4 相同
e %= 4; // e = 2, 与 e = e % 4 相同
```

## 10. 结论

Java为不同的功能提供了许多组运算符。在本文中，我们已经遍历了Java中的运算符。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)![img](/wp-content/uploads/2022/04/announcement-icon.png)![img](/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK