---
date: 2024-06-22
category:
  - Java
  - 算法
tag:
  - 表达式转换
  - 逆波兰表示法
head:
  - - meta
    - name: keywords
      content: Java, 表达式, 逆波兰表示法, 算法, 转换
---
# Java中将中缀表达式转换为后缀表达式

在本教程中，我们将讨论将数学表达式的中缀表示法转换为后缀表示法的算法和代码。像Java这样的编程语言允许我们定义和使用不同的数学表达式。表达式可以通过变量、常量和运算符的组合来书写。

### 2.1. 算术表达式

算术表达式包括加法(+)、减法(-)、乘法(*)、除法(/)和取模(%)等运算符。这些运算符与变量或常量一起使用，会产生算术评估：

```java
int x = 100;
int y = 50;

int sum = x + y;
int prod = x * y;

int remainder = x % y;
```

### 2.2. 逻辑表达式

逻辑表达式使用逻辑运算符代替之前使用的算术运算符。最常见的逻辑运算符包括逻辑与(_AND_)、或(_OR_)、非(_NOT_)和异或(_XOR_)：

```java
boolean andResult = (true && false); // 逻辑与
boolean orResult = (true || false); // 逻辑或
boolean notResult = !false; // 逻辑非
```

关系表达式主要用于基于比较的逻辑，并产生布尔值_true_或_false_：

```java
int x = 10;
int y = 8;

boolean bigger = x > y; // true
```

## 3. 表示法

数学表达式的书写有不同可能的方式。这些被称为表示法，它们根据运算符和操作数的位置变化而变化。

### 3.1. 中缀表示法

在中缀表示法表达式中，运算符位于操作数之间，使其成为最常见的表达式表示法：

```java
int sum = (a + b) + (c * d);
```

这里需要注意的是，运算符优先级在中缀表达式中可能导致歧义，并起着重要作用。括号在中缀表示法中很常见，以强制优先级。

### 3.2. 前缀表示法

前缀，也称为波兰表示法，是运算符在操作数之前的表达式：

```java
int result = * + a b - c d;
```

### 3.3. 后缀表示法

后缀，或逆波兰表示法，意味着运算符应该在操作数之后：

```java
int result = a b + c d - *;
```

我们在这里需要注意的是，相同表达式的前缀和后缀表示法都消除了由于运算符优先级而产生的明显歧义，并消除了对括号的需求。出于同样的原因，它们在表达式评估中也是高效的。

## 4. 问题陈述

现在我们已经回顾了数学表达式不同表示法的基础知识，让我们继续问题陈述。

给定一个中缀表达式作为输入，我们应该编写一个算法将其转换并返回相同表达式的后缀或逆波兰表示法。

让我们通过一个例子来理解：

```java
Input:  (a + b) * (c - d)
Output: ab+cd-*
Input: a+b*(c^d-e)^(f+g*h)-i
Output: abcd^e-fgh*+^*+i-
```

上面的示例显示，输入是一个中缀表达式，其中运算符总是在一对操作数之间。输出是相同的后缀表达式。我们可以假设输入始终是有效的中缀表达式；因此，没有必要进一步验证。

## 5. 解决方案

让我们通过将问题分解为更小的步骤来构建我们的解决方案。

### 5.1. 运算符和操作数

输入将是中缀表达式的字符串表示。**在我们实现转换逻辑之前，确定运算符和操作数至关重要。**

根据输入示例，操作数可以是小写或大写英文字母：

```java
private boolean isOperand(char ch) {
    return (ch >= 'a' && ch `<= 'z') || (ch >`= 'A' && ch `<= 'Z');
}
```

输入包含2个括号字符和5个运算符，除了上述操作数。

### 5.2. 优先级和结合性

我们还应该定义我们可能在输入中遇到的每个运算符的优先级，并为它们分配一个整数值。^(指数)运算符具有最高的优先级，其次是*(乘法)和/(除法)，它们具有相似的优先级。最后，+(加法)和-(减法)运算符的优先级最低。

让我们编写一个方法来模拟上述逻辑：

```java
int getPrecedenceScore(char ch) {
    switch (ch) {
    case '^':
        return 3;

    case '*':
    case '/':
        return 2;

    case '+':
    case '-':
        return 1;
    }
    return -1;
}
```

**当扫描到优先级相同的未括号运算符时，结合性或扫描顺序通常是从左到右。** 唯一的例外是指数运算符，其顺序假定为从右到左：

```java
char associativity(char ch) {
    if (ch == '^') {
        return 'R';
    }
    return 'L';
}
```

## 6. 转换算法

中缀表达式中的每个运算符都指代其周围的操作数。相比之下，在后缀表达式中，每个运算符都指代输入字符串中它之前的两个操作数。

对于具有多个中缀操作的表达式，必须首先将最内层括号内的表达式转换为后缀。这使我们能够将它们作为单个操作数对待，用于外部操作。**我们继续这样做，并逐步消除括号，直到整个表达式被转换。** 在括号组中，最后消除的括号对是组中的第一个操作。

**这种后进先出的行为暗示了使用栈数据结构。**

### 6.1. 栈和优先级条件

**我们将使用一个栈来跟踪我们的运算符。** 然而，我们需要定义一个规则来确定哪个运算符需要添加到后缀表达式中，哪个运算符需要保留在栈中以备将来使用。

如果当前符号是一个运算符，我们有两个选择。**我们可以将其推入栈中，或者直接将其放入后缀表达式中。如果我们的栈为空，就像遇到第一个运算符时的情况，我们可以简单地将当前运算符推入栈中。**

另一方面，如果栈不为空，我们需要检查优先级以确定运算符的去向。**如果当前字符的优先级高于栈顶的运算符，我们需要将其推入栈顶。** 例如，在遇到*之后遇到+将导致将+推入栈中，高于*。如果优先级分数相等，并且结合性是默认的从左到右，我们也会这样做。

我们可以将上述逻辑简化为：

```java
boolean operatorPrecedenceCondition(String infix, int i, Stack<Character>` stack) {
    return getPrecedenceScore(infix.charAt(i)) `< getPrecedenceScore(stack.peek())
      || getPrecedenceScore(infix.charAt(i)) == getPrecedenceScore(stack.peek())
      && associativity(infix.charAt(i)) == 'L';
}
```

### 6.2. 扫描中缀表达式并转换

现在我们已经设置了优先级条件，让我们讨论如何逐步扫描中缀操作并正确转换。

如果当前字符是一个操作数，我们将其添加到我们的后缀结果中。**如果当前字符是一个运算符，我们使用上面讨论的比较逻辑，并确定是应该将其添加到栈中还是弹出。** 最后，当我们完成扫描输入时，我们将栈中的所有内容弹出到后缀表达式中：

```java
String infixToPostfix(String infix) {
    StringBuilder result = new StringBuilder();
    Stack<Character>` stack = new Stack<>();

    for (int i = 0; i `< infix.length(); i++) {
        char ch = infix.charAt(i);

        if (isOperand(ch)) {
            result.append(ch);
        } else {
            while (!stack.isEmpty() && (operatorPrecedenceCondition(infix, i, stack))) {
                result.append(stack.pop());
            }
            stack.push(ch);
        }
    }

    while (!stack.isEmpty()) {
        result.append(stack.pop());
    }

    return result.toString();
}
```

### 6.3. 示例干燥运行

**让我们使用我们的第一个例子：_a + b * c – d._** 我们遇到的第一个字符_a_可以立即插入到最终结果中，因为它是一个操作数。然而，+运算符不能在没有考虑与其关联的第二个操作数_b_的情况下插入。由于我们需要为将来的参考存储+运算符，我们将其推入我们的栈中：

```java
Symbol  Result  Stack
a       a        []
+       a       [+]
bab      [+]
```

当我们遇到_b_操作数时，我们将其推入后缀结果，现在变成了_ab_。**我们还不能从栈中弹出运算符+，因为我们在输入中有*运算符。** 如前一节所述，*运算符的优先级高于栈顶的+。因此，这个新符号被推到栈顶：

```java
Symbol  Result  Stack
a       a        []
+       a       [+]
b       ab      [+]
*       ab      [+,*]
```

我们继续扫描输入的中缀表达式，当我们遇到下一个操作数_c_时，我们将其添加到结果中。**当我们遇到最终符号-时，它比栈顶的运算符*具有更低的优先级，我们从栈中弹出元素并将其附加到后缀表达式中，直到栈为空或栈顶的优先级更低。** 表达式现在是_abc*+_。当前运算符-被推入栈中：

```java
Symbol  Result  Stack
a        a        []
+        ab      [+]
b        ab      [+]
*        ab      [+,*]
c       abc     [+,*]
-       abc*+   [-]
d       abc*+d-  []
```

最后，我们将最后一个操作数_d_附加到后缀操作中，并弹出栈。后缀操作的值是_abc*+d-_。

### 6.4. 带括号的转换算法

**虽然上述算法是正确的，但中缀表达式使用括号来解决运算符优先级引起的歧义。** 因此，处理输入字符串中括号的出现并相应地修改算法至关重要。

当我们扫描到一个左括号_(_时，我们将其推入栈中。当我们遇到一个右括号时，所有运算符都需要从栈中弹出到后缀表达式中。

让我们通过调整代码来适应括号：

```java
String infixToPostfix(String infix) {
    StringBuilder result = new StringBuilder();
    Stack<Character>` stack = new Stack<>();

    for (int i = 0; i < infix.length(); i++) {
        char ch = infix.charAt(i);

        if (isOperand(ch)) {
            result.append(ch);
        } else if (ch == '(') {
            stack.push(ch);
        } else if (ch == ')') {
            while (!stack.isEmpty() && stack.peek() != '(') {
                result.append(stack.pop());
            }
            stack.pop();
        } else {
            while (!stack.isEmpty() && (operatorPrecedenceCondition(infix, i, stack))) {
                result.append(stack.pop());
            }
            stack.push(ch);
        }
    }

    while (!stack.isEmpty()) {
        result.append(stack.pop());
    }

    return result.toString();
}
```

让我们使用上面探索的相同示例，但带有括号，进行干燥运行：

```java
Input: (a+b)*(c-d)

Symbol Result  Stack
(           [(]
a      a       [(]
+      a       [(, +]
b      ab      [(, +]
)      ab+      []
*      ab+     [*]
(      ab+     [*, (]
c      ab+c    [*, (]
-      ab+c    [*, (, -]
d      ab+cd   [*, (, -]
)      ab+cd-* []
```

**我们应该注意到括号的位置如何改变评估以及相应的后缀表达式。**

## 7. 其他思考

虽然中缀表达式在文本中更常见，但表达式的后缀表示法有许多好处。**后缀表达式中不需要括号，因为操作顺序由于操作数和运算符的顺序排列而变得清晰。** 此外，在中缀操作中可能由于运算符优先级和结合性而产生的歧义在其后缀形式中被消除了。

**这也使它们成为计算机程序中的实际选择，特别是在编程语言实现中。**

## 8. 结论

在本文中，我们讨论了数学表达式的中缀、前缀和后缀表示法。我们专注于将中缀转换为后缀运算的算法，并看了一些例子。

像往常一样，本文的源代码可以在GitHub上找到。

OK