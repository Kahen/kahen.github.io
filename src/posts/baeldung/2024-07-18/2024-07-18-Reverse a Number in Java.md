---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - reverse number
  - Java
head:
  - - meta
    - name: keywords
      content: Java, reverse number, algorithm
---
# Java中反转数字的方法

在本教程中，我们将看到如何使用Java中的数学方法来反转一个数字。首先，我们将看到完成此操作所需的数学运算，然后我们将通过三种不同的实现方式来进行。

## 2. 解决方法概述
首先，我们以一个例子开始，看看应该发生什么。例如，我们希望数字1234变成4321。这可以通过以下方法实现：

1. 获取数字的最后一位
   - 我们可以通过取模来获取最后一位数字
   - 第一次迭代 - 1234 % 10 = 4
   - 第二次迭代 - 123 % 10 = 3

2. 将反转后的数字乘以10并加上之前步骤中找到的数字
   - 第一次迭代 - 0 * 10 + 4 = 4（由于开始时没有反转的数字，我们在第一次迭代中与0相乘）
   - 第二次迭代 - 4 * 10 + 3 = 43

3. 将原始数字除以10，然后从步骤1重复，并继续进行，直到数字不为0
   - 第一次迭代 - 1234 / 10 = 123
   - 第二次迭代 - 123 / 10 = 12

## 3. 数学实现
我们希望将上述数学运算转化为代码。这可以通过以下三种不同的方式实现：使用while循环、for循环或递归。

**下面的方法也适用于负值，通过使用要反转的数字的绝对值，并在原始数字为负时将反转后的数字乘以-1。**

### 3.1. while循环
while循环首先列出，因为它是将上述数学运算转化为代码的最清晰的方式：

```java
int reversedNumber = 0;
int numberToReverse = Math.abs(number);

while (numberToReverse > 0) {
    int mod = numberToReverse % 10;
    reversedNumber = reversedNumber * 10 + mod;
    numberToReverse /= 10;
}

return number `< 0 ? reversedNumber * -1 : reversedNumber;
```

### 3.2. for循环
使用for循环，逻辑与之前相同。我们跳过for循环的初始化语句，并使用正在反转的数字作为终止条件：

```java
int reversedNumber = 0;
int numberToReverse = Math.abs(number);

for (; numberToReverse >` 0; numberToReverse /= 10) {
    int mod = numberToReverse % 10;
    reversedNumber = reversedNumber * 10 + mod;
}

return number `< 0 ? reversedNumber * -1 : reversedNumber;
```

### 3.3. 递归
对于递归，我们可以使用一个包装方法来调用递归方法，该方法返回反转后的数字：

```java
int reverseNumberRecWrapper(int number) {
    int output = reverseNumberRec(Math.abs(number), 0);
    return number < 0 ? output * -1 : output;
}
```

递归方法以与前例相同的方式实现数学运算：

```java
int reverseNumberRec(int numberToReverse, int recursiveReversedNumber) {

    if (numberToReverse >` 0) {
        int mod = numberToReverse % 10;
        recursiveReversedNumber = recursiveReversedNumber * 10 + mod;
        numberToReverse /= 10;
        return reverseNumberRec(numberToReverse, recursiveReversedNumber);
    }

    return recursiveReversedNumber;
}
```

**递归方法在每次迭代中返回当前反转的数字，并且要反转的数字在每次迭代中缩短。这一直持续到要反转的数字为0，那时我们返回完全反转的数字。**

## 4. 结论
在本文中，我们探索了使用while循环、for循环和递归来反转数字的三种不同实现方式。

如常，示例的源代码可在GitHub上找到。