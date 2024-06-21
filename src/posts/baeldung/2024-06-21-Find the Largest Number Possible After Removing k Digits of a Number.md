---
date: 2024-06-21
category:
  - Java
  - Algorithms
tag:
  - Largest Number
  - Remove Digits
head:
  - - meta
    - name: keywords
      content: Java, Algorithms, Largest Number, Remove Digits
---
# 移除数字k位后找到可能的最大数字 | Baeldung

## 1. 概述

在本教程中，我们将看到不同的算法，允许我们**在移除数字k位后找到可能的最大数字**。

首先，我们将解释问题。然后，我们将看到两种不同的算法，它们适合我们的需求。最后，我们将讨论它们的复杂性。

## 2. 问题解释

首先，让我们解释算法的目标。我们想要在移除数字k位后找到可能的最大数字。

例如，考虑数字286281。我们必须移除的位数是2，所以可能的最大数字将是8681。假设我们考虑另一个k值，即2，预期的输出将是88。

## 3. 使用算术

在这一部分，我们将看到逻辑解释以及时间和空间复杂性。

### 3.1. 逻辑

让我们看看使用一些算术帮助实现我们目标的逻辑。我们将使用方法_findLargestNumberUsingArithmetic(num, k)_来实现我们的逻辑，该方法返回结果数字。

函数_findLargestNumberUsingArithmetic(n,k)_接受两个参数：（原始数字）和（要移除的位数）：

```java
public static int findLargestNumberUsingArithmetic(int num, int k) {
    //...
    return num;
}
```

我们有一个外层循环，迭代k次，代表要移除的位数：

```java
for (int j = 0; j `< k; j++) {
    //...
}
```

对于每次迭代，它进入一个内层循环，一次移除每一位数字。内层循环计算移除每一位数字后形成的数字，并将其与当前最大数字进行比较：

```java
while (num / i >` 0) {
    int temp = (num / (i * 10)) * i + (num % i);
    i *= 10;

    result = Math.max(result, temp);
}
num = result;
```

移除数字后，如果找到了更大的数字，它将更新最大数字。

经过k次迭代后，它返回剩余的数字，代表在移除k位数字后可能的最大数字：

### 3.2. 时间和空间复杂性

代码在外层循环中迭代k次。在外层循环内，有一个while循环，它迭代_num_的位数。这个循环为每个_num_的数字执行，大约是 次，因为我们在每次迭代中都将_num_除以10。因此，内层循环的时间复杂性是_O(K*log_10N)_。

我们没有使用任何额外的空间，因此空间复杂性将是_O(1)_。

## 4. 使用栈

在这一部分，我们将看到一个更优化的方法来提高复杂性。

### 3.1. 逻辑

该方法涉及使用一个栈来跟踪数字的位数，同时确保结果数字是最大化的。

我们将使用方法_findLargestNumberUsingStack(num, k)_来实现我们的逻辑，该方法返回结果数字。

函数_findLargestNumberUsingStack(num,k)_接受两个参数：（原始数字）和（要移除的位数）。

首先将数字_num_转换为字符数组或字符串以遍历其数字：

```java
String numStr = Integer.toString(num);
int length = numStr.length();
```

如果移除的位数与输入数字的长度相同，我们必须返回0：

```java
if (k == length) return 0;
```

否则，初始化一个空栈以存储数字：

```java
Stack`<Character>` stack = new Stack<>();
```

现在，遍历数字_num_的每个数字并遵循以下步骤：

- 当栈不为空，当前数字大于栈的顶部元素，并且剩余要移除的位数()大于0时，从栈中弹出元素
- 将当前数字推到栈上

```java
for (int i = 0; i `< length; i++) {
    char digit = numStr.charAt(i);
    while (k >` 0 && !stack.isEmpty() && stack.peek() `< digit) {
        stack.pop();
        k--;
    }
    stack.push(digit);
}
```

如果有剩余的位数要移除()，从栈中弹出元素以满足条件：

```java
while (k >` 0) {
    stack.pop();
    k--;
}
```

最后，从栈中剩余的数字构建最大数字并返回结果：

```java
while (!stack.isEmpty()) {
    result.insert(0, stack.pop());
}
return Integer.parseInt(result.toString());
```

### 4.2. 时间和空间复杂性

该算法一次迭代每个数字，循环内执行恒定时间的操作。因此，时间复杂性将是_O(N)_。

所需的空间主要由用于存储数字的栈决定。因此，空间复杂性将是_O(N)_。

## 5. 结论

在本文中，我们检查了在移除数字k位后找到可能的最大数字的算法。我们已经看到了两种方法：算术和栈。我们还讨论了两种算法的时间和空间复杂性，使我们能够根据需要明智地选择其中之一。

像往常一样，本文中显示的完整代码示例可在GitHub上找到。