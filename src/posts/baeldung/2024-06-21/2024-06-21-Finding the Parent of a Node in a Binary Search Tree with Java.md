---
date: 2024-06-21
category:
  - Java
  - 数据结构
tag:
  - 二叉搜索树
  - 算法
head:
  - - meta
    - name: keywords
      content: Java, 二叉搜索树, 父节点, 算法
---
# 在Java中使用二叉搜索树查找节点的父节点 | Baeldung

## 1. 引言

二叉搜索树（BST）是一种数据结构，它帮助我们高效地解决现实世界的问题。

在这篇文章中，我们将探讨如何在二叉搜索树中找到节点的父节点的问题。

## 2. 什么是二叉搜索树？

**二叉搜索树是一种树状数据结构，其中每个节点最多指向两个节点，通常称为左孩子和右孩子。此外，每个节点的值都大于其左孩子并且小于其右孩子。**

例如，让我们想象三个节点，A=2，B=1和C=4。因此，一个可能的BST以A作为根节点，B作为其左孩子，C作为其右孩子。

在接下来的部分中，我们将使用一个具有默认_insert()_方法的BST结构来练习查找节点父节点的问题。

在下面的部分中，我们将描述在BST中查找节点父节点的问题，并练习一些解决方法。

### 3.1. 问题描述

正如我们在文章中看到的，BST中的一个给定节点有指向其左右孩子的指针。

例如，让我们想象一个有三个节点的简单BST：

节点_8_有两个子节点，_5_和_12_。因此，节点_8_是节点_5_和_12_的父节点。

**问题在于找到任何给定节点值的父节点**。换句话说，我们必须找到其任何子节点等于目标值的节点。例如，在上图中的BST中，如果我们将_5_输入到我们的程序中，我们期望得到_8_作为输出。如果我们输入_12_，我们也期望得到_8_。

这个问题的边缘情况是为最顶层的根节点或在BST中不存在的节点找到父节点。在这两种情况下，都没有父节点。

### 3.2. 测试结构

在深入各种解决方案之前，我们首先定义我们的测试的基本结构：

```java
class BinaryTreeParentNodeFinderUnitTest {

    TreeNode subject;

    @BeforeEach
    void setUp() {
        subject = new TreeNode(8);
        subject.insert(5);
        subject.insert(12);
        subject.insert(3);
        subject.insert(7);
        subject.insert(1);
        subject.insert(4);
        subject.insert(11);
        subject.insert(14);
        subject.insert(13);
        subject.insert(16);
    }
}
```

_BinaryTreeParentNodeFinderUnitTest_定义了一个_setUp()_方法，它创建了以下BST：

## 4. 实现递归解决方案

**解决这个问题的直接方法是使用递归来遍历树，并提前返回其中任何一个子节点等于目标值的节点。**

让我们首先在_TreeNode_类中定义一个公共方法：

```java
TreeNode parent(int target) throws NoSuchElementException {
    return parent(this, new TreeNode(target));
}
```

现在，让我们在_TreeNode_类中定义_parent()_方法的递归版本：

```java
TreeNode parent(TreeNode current, TreeNode target) throws NoSuchElementException {
    if (target.equals(current) || current == null) {
        throw new NoSuchElementException(format("没有为'target.value=%s'找到父节点 "
            + "目标不在树中或目标是最顶层的根节点。",
            target.value));
    }

    if (target.equals(current.left) || target.equals(current.right)) {
        return current;
    }

    return parent(target.value `< current.value ? current.left : current.right, target);
}
```

该算法首先检查当前节点是否是最顶层的根节点或节点不存在于树中。在这两种情况下，节点没有父节点，所以我们抛出一个_NoSuchElementException_。

然后，算法检查当前节点的任何子节点是否等于_target_。如果是，当前节点是目标节点的父节点。因此，我们返回_current_。

最后，我们使用递归调用遍历BST，根据_target_值向左或向右。

让我们测试我们的递归解决方案：

```java
@Test
void givenBinaryTree_whenFindParentNode_thenReturnCorrectParentNode() {
    assertThrows(NoSuchElementException.class, () ->` subject.parent(1231));
    assertThrows(NoSuchElementException.class, () -> subject.parent(8));
    assertEquals(8, subject.parent(5).value);
    assertEquals(5, subject.parent(3).value);
    assertEquals(5, subject.parent(7).value);
    assertEquals(3, subject.parent(4).value);
    // 其他节点的断言
}
```

在最坏的情况下，该算法执行最多_n_次递归操作，每次操作成本为_O(1)_，以找到父节点，其中_n_是BST中的节点数。因此，它是_O(n)_的时间复杂度。如果BST平衡良好，由于其高度始终最多为_log n_，时间复杂度可以降低到_O(log n)_。

此外，算法使用堆栈空间进行递归调用。因此，在最坏的情况下，递归调用在找到叶节点时停止。因此，算法最多堆叠_h_个递归调用，这使其具有_O(h)_的空间复杂度，其中_h_是BST的高度。

## 5. 实现迭代解决方案

几乎任何递归解决方案都有一个迭代版本。**特别是，我们也可以使用栈和_while_循环而不是递归来找到BST的父节点。**

为此，让我们向_TreeNode_类添加_iterativeParent()_方法：

```java
TreeNode iterativeParent(int target) {
    return iterativeParent(this, new TreeNode(target));
}
```

上述方法只是一个接口，用于下面的辅助方法：

```java
TreeNode iterativeParent(TreeNode current, TreeNode target) {
    Deque`<TreeNode>` parentCandidates = new LinkedList<>();

    String notFoundMessage = format("没有为'target.value=%s'找到父节点 "
        + "目标不在树中或目标是最顶层的根节点。",
        target.value);

    if (target.equals(current)) {
        throw new NoSuchElementException(notFoundMessage);
    }

    while (current != null || !parentCandidates.isEmpty()) {

        while (current != null) {
            parentCandidates.addFirst(current);
            current = current.left;
        }

        current = parentCandidates.pollFirst();

        if (target.equals(current.left) || target.equals(current.right)) {
            return current;
        }

        current = current.right;
    }

    throw new NoSuchElementException(notFoundMessage);
}
```

该算法首先初始化一个栈来存储父候选项。然后它主要依赖于四个主要部分：

1. 外层_while_循环检查我们是否正在访问一个非叶节点或父候选栈是否不为空。在这两种情况下，我们应该继续遍历BST直到找到目标父节点。
2. 内层_while_循环再次检查我们是否正在访问一个非叶节点。在那时，访问一个非叶节点意味着我们应该首先遍历左侧，因为我们使用中序遍历。因此，我们将父候选添加到栈中并继续向左遍历。
3. 在访问完左侧节点后，我们从Deque中取出一个节点，检查该节点是否是目标的父节点，并在找到时返回它。如果我们没有找到父节点，我们继续向右遍历。
4. 最后，如果主循环在没有返回任何节点的情况下完成，我们可以假设节点不存在或它是最顶层的根节点。

现在，让我们测试迭代方法：

```java
@Test
void givenBinaryTree_whenFindParentNodeIteratively_thenReturnCorrectParentNode() {
    assertThrows(NoSuchElementException.class, () -> subject.iterativeParent(1231));
    assertThrows(NoSuchElementException.class, () -> subject.iterativeParent(8));
    assertEquals(8, subject.iterativeParent(5).value);
    assertEquals(5, subject.iterativeParent(3).value);
    assertEquals(5, subject.iterativeParent(7).value);
    assertEquals(3, subject.iterativeParent(4).value);

    // 其他节点的断言
}
```

在最坏的情况下，我们需要遍历整个树来找到父节点，这使得迭代解决方案具有_O(n)_的空间复杂度。同样，如果BST平衡良好，我们可以用_O(log n)_来做同样的事情。

当我们到达一个叶节点时，我们开始从_parentCandidates_栈中轮询元素。因此，那个额外的栈来存储父候选项最多包含_h_个元素，其中_h_是BST的高度。因此，它也具有_O(h)_的空间复杂度。

## 6. 创建带有父指针的BST

解决这个问题的另一种方法是修改现有的BST数据结构，以存储每个节点的父节点。

为此，让我们创建另一个名为_ParentKeeperTreeNode_的类，其中包含一个名为_parent_的新字段：

```java
class ParentKeeperTreeNode {

    int value;
    ParentKeeperTreeNode parent;
    ParentKeeperTreeNode left;
    ParentKeeperTreeNode right;

    // value字段参数构造函数

    // equals和hashcode
}
```

现在，我们需要创建一个自定义_insert()_方法来同时保存父节点：

```java
void insert(ParentKeeperTreeNode currentNode, final int value) {
    if (currentNode.left == null && value `< currentNode.value) {
        currentNode.left = new ParentKeeperTreeNode(value);
        currentNode.left.parent = currentNode;
        return;
    }

```java
if (currentNode.right == null && value >` currentNode.value) {
    currentNode.right = new ParentKeeperTreeNode(value);
    currentNode.right.parent = currentNode;
    return;
}

if (value > currentNode.value) {
    insert(currentNode.right, value);
}

if (value < currentNode.value) {
    insert(currentNode.left, value);
}
```
**_insert()_方法在为当前节点创建新的左右子节点时也会保存父节点。在这种情况下，由于我们正在创建一个新的子节点，父节点总是我们正在访问的当前节点。**

最后，我们可以测试存储父指针的BST版本：

```java
@Test
void givenParentKeeperBinaryTree_whenGetParent_thenReturnCorrectParent() {
    ParentKeeperTreeNode subject = new ParentKeeperTreeNode(8);
    subject.insert(5);
    subject.insert(12);
    subject.insert(3);
    subject.insert(7);
    subject.insert(1);
    subject.insert(4);
    subject.insert(11);
    subject.insert(14);
    subject.insert(13);
    subject.insert(16);

    assertNull(subject.parent);
    assertEquals(8, subject.left.parent.value);
    assertEquals(8, subject.right.parent.value);
    assertEquals(5, subject.left.left.parent.value);
    assertEquals(5, subject.left.right.parent.value);

    // 其他节点的测试
}
```

在这种类型的BST中，我们在节点插入期间计算父节点。因此，为了验证结果，我们可以简单地检查每个节点的父引用。

因此，我们不是在_O(h)_的时间内计算每个给定节点的_parent()_，而是可以通过引用立即在_O(1)_时间内得到它。此外，每个节点的父节点只是对内存中另一个现有对象的引用。因此，空间复杂度也是_O(1)_。

**这种BST版本在我们经常需要检索节点的父节点时很有帮助，因为_parent()_操作已经很好地优化了。**

## 7. 结论

在这篇文章中，我们看到了查找BST中任何给定节点的父节点的问题。

我们练习了三种解决方案，并提供了代码示例。一种使用递归来遍历BST。另一种使用栈来存储父候选项并遍历BST。最后一种在每个节点中保留父引用，以便在恒定时间内获取。

像往常一样，源代码在GitHub上可用。
```

OK