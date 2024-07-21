---
date: 2024-07-21
category:
  - Java
tag:
  - Rock-Paper-Scissors
  - Game Development
head:
  - - meta
    - name: keywords
      content: Java, Rock-Paper-Scissors, Game Development
------
# 创建一个简单的“剪刀石头布”游戏（Java）

## 1. 概述

在这个简短的教程中，我们将看到如何在Java中创建一个简单的“剪刀石头布”游戏。

我们的游戏将允许玩家输入“石头”，“纸”或“剪刀”作为每一步的值。

首先，让我们为这些步骤创建一个枚举：

```java
enum Move {
    ROCK("rock"),
    PAPER("paper"),
    SCISSORS("scissors");

    private String value;

    //...
}
```

然后，让我们创建一个生成随机整数并返回计算机的移动的方法：

```java
private static String getComputerMove() {
    Random random = new Random();
    int randomNumber = random.nextInt(3);
    String computerMove = Move.values()[randomNumber].getValue();
    System.out.println("计算机的移动：" + computerMove);
    return computerMove;
}
```

以及一个检查玩家是否获胜的方法：

```java
private static boolean isPlayerWin(String playerMove, String computerMove) {
    return playerMove.equals(Move.ROCK.value) && computerMove.equals(Move.SCISSORS.value)
            || (playerMove.equals(Move.SCISSORS.value) && computerMove.equals(Move.PAPER.value))
            || (playerMove.equals(Move.PAPER.value) && computerMove.equals(Move.ROCK.value));
}
```

最后，我们将使用它们来形成一个完整的程序：

```java
Scanner scanner = new Scanner(System.in);
int wins = 0;
int losses = 0;

System.out.println("欢迎来到剪刀石头布游戏！请输入\"石头\", \"纸\", \"剪刀\", 或者输入\"quit\"退出。");

while (true) {
    System.out.println("-------------------------");
    System.out.print("输入你的移动：");
    String playerMove = scanner.nextLine();

    if (playerMove.equals("quit")) {
        System.out.println("你赢了 " + wins + " 次，输了 " + losses + " 次。");
        System.out.println("感谢你的参与！下次再见。");
        break;
    }

    if (Arrays.stream(Move.values()).noneMatch(x -> x.getValue().equals(playerMove))) {
        System.out.println("你的移动无效！");
        continue;
    }

    String computerMove = getComputerMove();

    if (playerMove.equals(computerMove)) {
        System.out.println("平局！");
    } else if (isPlayerWin(playerMove, computerMove)) {
        System.out.println("你赢了！");
        wins++;
    } else {
        System.out.println("你输了！");
        losses++;
    }
}
```

如上所见，我们使用Java _Scanner_ 来读取用户输入的值。

让我们玩一下并看看输出：

```
欢迎来到剪刀石头布游戏！请输入"石头", "纸", "剪刀", 或者输入"quit"退出。
-------------------------
输入你的移动：石头
计算机的移动：剪刀
你赢了！
-------------------------
输入你的移动：纸
计算机的移动：纸
平局！
-------------------------
输入你的移动：quit
你赢了1次，输了0次。
感谢你的参与！下次再见。
```

## 3. 结论

在这个快速教程中，我们已经学会了如何在Java中创建一个简单的“剪刀石头布”游戏。

一如既往，本文的示例代码可以在GitHub上找到。