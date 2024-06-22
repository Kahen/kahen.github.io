---
date: 2024-06-22
category:
  - Java
  - 算法
tag:
  - 动态规划
  - 递归
head:
  - - meta
    - name: keywords
      content: Java, 算法, 动态规划, 递归, 切割问题
---
# Java中解决切割杆问题

切割杆问题是一个经典的优化问题，它涉及到找到切割杆成段的最佳方式以最大化总收入。

在本教程中，我们将理解切割杆问题，并探索在Java中解决它的各种方法。

### 2. 理解问题

想象我们有一根长度为_n_的杆。我们可以将这根杆切割成不同长度的段，并将这些切割后的段出售。此外，我们拥有不同长度切割杆的价格表。我们的目标是最大化总收入。

例如，考虑一根长度为_n_=4的杆，价格_Pi_ = [1,5,8,9]。_Pi_数组表示长度为_i_的杆段的价格。这意味着：

P1 = 1 表示长度为1的杆段的价格是1单位。

P2 = 5 表示长度为2的杆段的价格是5单位。

类似地，P3 = 8 表示长度为3的杆段的价格是8单位，

P4 = 9 表示长度为4的杆段的价格是9单位。

我们可以对杆进行各种切割，每次切割都会根据杆段的价格产生一定的收入。以下是长度为4的杆的可能切割方式：

- 切割成4段1米长的段 [1,1,1,1]，产生的收入 = 1+1+1+1 = $4
- 切割成2段2米长的段 [2,2]，产生的收入 = 5+5 = $10
- 切割成1段4米长的段，产生的收入 = $9
- 切割成3段1米长和2米长的段 [1,1,2]，产生的收入 = 1+1+5 = $7
- 切割成3段1米长和2米长的段 [1,2,1]，产生的收入 = 1+5+1 = $7
- 切割成3段1米长和2米长的段 [2,1,1]，产生的收入 = 5+1+1 = $7

在这里，我们可以看到，通过将我们的杆切割成2段2米长的段，我们可以得到总价为$10。其他任何组合都会给出更低的价格，所以我们可以看到这是最优解。

### 3. 递归解决方案

递归解决方案涉及将问题分解为子问题并递归地解决它们。用于计算长度为_n_的杆的最大收入的递归关系是_Rn = max1<=i<=n(Pi+Rn-i)_。

在上面的关系中，_Rn_表示长度为_n_的杆的最大收入，_Pi_是长度为_i_的杆段的价格。让我们实现递归解决方案：

```java
int usingRecursion(int[] prices, int n) {
    if (n <= 0) {
        return 0;
    }
    int maxRevenue = Integer.MIN_VALUE;
    for (int i = 1; i <= n; i++) {
        maxRevenue = Math.max(maxRevenue, prices[i - 1] + usingRecursion(prices, n - i));
    }
    return maxRevenue;
}
```

在我们的示例中，我们检查基本情况，以确定杆的长度是否等于或小于0，从而得出收入为0。我们系统地使用递归探索所有可能的切割方式，以计算每次切割的最大收入。结果是所有切割中实现的最高收入。

现在，让我们测试这种方法：

```java
@Test
void givenARod_whenUsingRecursion_thenFindMaxRevenue() {
    int[] prices = {1, 5, 8, 9};
    int rodLength = 4;
    int maxRevenue = RodCuttingProblem.usingRecursion(prices, rodLength);
    assertEquals(10, maxRevenue);
}
```

递归方法有效且相对容易理解。然而，它的指数时间复杂度O(2^n)使得它对于更大的实例来说不切实际，因为递归调用将迅速增加。所以，如果我们有一根4米长的杆，这种方法将需要2^4 = 16次迭代。

这种解决方案没有直接在一个单独的数据结构如数组或映射中存储状态。然而，它利用了语言提供的调用栈来跟踪函数调用及其各自的参数和局部变量。

这种方法缺乏记忆化，导致在递归探索过程中多次解决了相同的子问题。这种效率低下在现实场景中成为重大问题，特别是对于相当长的杆。递归解决方案还可能导致堆栈溢出错误，如果递归深度过大。

### 4. 记忆化递归解决方案

我们可以通过使用记忆化来改进我们的递归解决方案。在这种方法中，我们将使用记忆化表来存储和重用先前解决的子问题的结果：

```java
int usingMemoizedRecursion(int[] prices, int n) {
    int[] memo = new int[n + 1];
    Arrays.fill(memo, -1);

    return memoizedHelper(prices, n, memo);
}

int memoizedHelper(int[] prices, int n, int[] memo) {
    if (n <= 0) {
        return 0;
    }

    if (memo[n] != -1) {
        return memo[n];
    }
    int maxRevenue = Integer.MIN_VALUE;

    for (int i = 1; i <= n; i++) {
        maxRevenue = Math.max(maxRevenue, prices[i - 1] + memoizedHelper(prices, n - i, memo));
    }

    memo[n] = maxRevenue;
    return maxRevenue;
}
```

这个想法是通过检查一个子问题是否已经被解决来避免冗余计算，然后再解决它。我们的记忆化表以数组的形式出现，其中每个索引对应于杆的长度，相关的值保存了该特定长度的最大收入。

现在，让我们测试这种方法：

```java
@Test
void givenARod_whenUsingMemoizedRecursion_thenFindMaxRevenue() {
    int[] prices = {1, 5, 8, 9};
    int rodLength = 4;
    int maxRevenue = RodCuttingProblem.usingMemoizedRecursion(prices, rodLength);
    assertEquals(10, maxRevenue);
}
```

通过记忆化避免冗余计算，与简单的递归解决方案相，时间复杂度显著降低。现在，时间复杂度由解决的独特子问题的数量决定，对于切割杆问题，通常由于两个嵌套循环而为O(n^2)。

这意味着对于一根10米长的杆，我们将有100的时间复杂度，与之前的1024相比，因为我们由于修剪节点而做了更少的工作。然而，这是以空间复杂度为代价的。算法必须为每种杆长存储一个值，使其具有O(n)的空间复杂度。

### 5. 动态规划解决方案

解决这个问题的另一种方法是通过动态规划。动态规划通过将问题分解为更小的子问题来解决，这与分而治之算法解决技术非常相似。然而，主要的区别在于动态规划只解决一次子问题。

#### 5.1. 迭代（自底向上）方法

在这种方法中，避免递归并使用迭代过程消除了与递归解决方案相关的函数调用开销，有助于提高性能：

```java
int usingDynamicProgramming(int[] prices, int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        int maxRevenue = Integer.MIN_VALUE;

        for (int j = 1; j <= i; j++) {
            maxRevenue = Math.max(maxRevenue, prices[j - 1] + dp[i - j]);
        }
        dp[i] = maxRevenue;
    }
    return dp[n];
}
```

让我们也测试这种方法：

```java
@Test
void givenARod_whenUsingDynamicProgramming_thenFindMaxRevenue() {
    int[] prices = {1, 5, 8, 9};
    int rodLength = 4;
    int maxRevenue = RodCuttingProblem.usingDynamicProgramming(prices, rodLength);
    assertEquals(10, maxRevenue);
}
```

我们的动态规划表由_dp_数组表示，它存储了每个子问题的最优解，其中索引_i_对应于杆的长度，_dp[i]_保存了最大收入。_dp_数组中的最后一个条目，_dp[n],_包含了原始问题的最大收入，即长度为_n_的杆。

这种方法也是内存高效的，因为它不需要额外的记忆化表。

#### 5.2. 无界背包解决方案

无界背包方法是用于解决优化问题的动态规划技术，其中一项可以无限次选择。这意味着如果相同的切割长度被选择并包含在杆中多次，有助于最大化收入，可以选择相同的切割长度。让我们看看实现：

```java
int usingUnboundedKnapsack(int[] prices, int n) {
    int[] dp = new int[n + 1];

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < prices.length; j++) {
            if (j + 1 <= i) {
                dp[i] = Math.max(dp[i], dp[i - (j+ 1)] + prices[j]);
            }
        }
    }

    return dp[n];
}
```

类似于迭代（自底向上）方法，这个算法计算每个杆长的最大收入。让我们测试这种方法：

```java
@Test
void givenARod_whenUsingGreedy_thenFindMaxRevenue() {
    int[] prices = {1, 5, 8, 9};
    int rodLength = 4;
    int maxRevenue = RodCuttingProblem.usingUnboundedKnapsack(prices, rodLength);
    assertEquals(10, maxRevenue);
}
```

这种方法的缺点是可能增加的空间复杂度。

### 6. 结论

在本教程中，我们理解了切割杆问题，并讨论了解决它的各种方法。

**递归方法提供了简单性，但遭受指数级时间复杂度的困扰。记忆化方法通过重用解决方案解决了这个问题，并引入了轻微的空间复杂度。迭代方法进一步提高了效率，消除了递归开销。**

选择这些方法取决于特定的问题特征，涉及时间、空间和实现复杂度之间的权衡。

和往常一样，示例中使用的代码可以在GitHub上找到。
OK