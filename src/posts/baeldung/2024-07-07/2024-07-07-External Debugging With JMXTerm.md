---
date: 2024-07-07
category:
  - Java
  - JMX
tag:
  - JMXTerm
  - 调试
head:
  - - meta
    - name: keywords
      content: Java, JMX, JMXTerm, 调试, 远程调试, Java应用监控
---
# 使用JMXTerm进行外部调试

调试对开发者来说可能是一个耗时的过程。使调试过程更高效的一个方法是使用JMX（Java Management Extension），这是一项用于Java应用程序的监控和管理技术。

在本教程中，我们将探讨如何使用JMXTerm对Java应用程序执行外部调试。

JMX为Java应用程序提供了几种工具，例如JConsole、VisualVM和JMXTerm。JConsole是一个用于监控性能的图形化工具。VisualVM提供了高级调试和分析功能，并且需要插件才能与MBeans一起工作。**虽然这些工具很有用，但JMXTerm是一个轻量级、灵活且命令行选项，可用于自动化。**

### 2.1. 安装
要使用JMXTerm，我们首先需要下载并安装它。JMXTerm的最新版本可在官方网站上获得。它被打包在一个简单的jar文件中：
```
$ java -jar jmxterm.jar
```
请注意，在更高版本的Java中可能会出现问题。**这可能是由于模块化JDK中对反射访问的限制。要解决这个问题，我们可以使用`-add-exports`：**
```
$ java --add-exports jdk.jconsole/sun.tools.jconsole=ALL-UNNAMED -jar jmxterm.jar
```

### 2.2. 连接
启动JMXTerm后，我们可以使用主机和端口连接到Java应用程序。注意，这个选项可能需要额外的步骤来配置或查找所需的端口：
```
$ open [host]:[port]
```
另外，我们可以在启动时传递地址：
```
$ java -jar jmxterm.jar -l [host]:[port]
```
或者，我们可以使用PID来访问并打开连接。JMXTerm允许我们使用_jvms_命令直接查找它：
```
$ jvms
83049    (m) - com.baeldung.jmxterm.GameRunner
$ open 83049
#Connection to 83049 is opened
```

### 2.3. MBeans
MBeans是我们可以通过JMX管理和监控的Java对象。它们通过JMX代理公开了一个接口，可以通过该接口访问和控制，使诊断和解决问题变得更加容易。

**要创建一个MBean，我们应该遵循约定，首先创建一个以MBean结尾的接口名称。** 在我们的例子中，它将是_GuessGameMBean_。这意味着类的名称应该是_GuessGame_，而不是其他任何名称。或者，在某些情况下，可以使用MXBeans。接口包含了我们想要暴露给JMX的操作：
```
public interface GuessGameMBean {
    void finishGame();
    void pauseGame();
    void unpauseGame();
}
```
游戏本身是一个简单的猜数字游戏：
```
public class GuessGame extends GuessGameMBean {
    //...
    public void start() {
        int randomNumber = randomNumbergenerator.getLastNumber();
        while (!isFinished) {
            waitASecond();
            while (!isPaused && !isFinished) {
                log.info("Current random number is " + randomNumber);
                waitASecond();
                for (Player player : players) {
                    int guess = player.guessNumber();
                    if (guess == randomNumber) {
                        log.info("Players " + player.getName() + " " + guess + " is correct");
                        player.incrementScore();
                        notifyAboutWinner(player);
                        randomNumber = randomNumbergenerator.generateRandomNumber();
                        break;
                    }
                    log.info("Player " + player.getName() + " guessed incorrectly with " + guess);
                }
                log.info("\n");
            }
            if (isPaused) {
                log.info("Game is paused");
            }
            if (isFinished) {
                log.info("Game is finished");
            }
        }
    }
    //...
}
```
我们还将通过JMX跟踪玩家：
```
public interface PlayerMBean {
    int getGuess();
    int getScore();
    String getName();
}
```

## 3. 使用JMXTerm进行调试
一旦使用JMXTerm连接到Java应用程序，我们可以查询可用的域：
```
$ domains
#following domains are available
JMImplementation
com.baeldung.jmxterm
com.sun.management
java.lang
java.nio
java.util.logging
jdk.management.jfr
```

### 3.1. 日志级别
让我们尝试更改我们正在运行的应用程序的日志级别。**我们将使用_java.util.logging.Logger_进行演示，但请注意JUL有明显的不足之处。** JUL提供了现成的MBeans：
```
$ domain java.util.logging
#domain is set to java.util.logging
```
现在我们可以检查域中可用的MBeans：
```
$ beans
#domain = java.util.logging:
java.util.logging:type=Logging
```
下一步，我们需要检查日志bean提供的信息：
```
$ bean java.util.logging:type=Logging
#bean is set to java.util.logging:type=Logging
$ info
#mbean = java.util.logging:type=Logging
#class name = sun.management.ManagementFactoryHelper$PlatformLoggingImpl
# attributes
  %0   - LoggerNames ([Ljava.lang.String;, r)
  %1   - ObjectName (javax.management.ObjectName, r)
# operations
  %0   - java.lang.String getLoggerLevel(java.lang.String p0)
  %1   - java.lang.String getParentLoggerName(java.lang.String p0)
  %2   - void setLoggerLevel(java.lang.String p0,java.lang.String p1)
#there's no notifications
```
要访问我们的_GuessGame_对象中的记录器，我们需要找到记录器的名称：
```
$ get LoggerNames
#mbean = java.util.logging:type=Logging:
LoggerNames = [ ..., com.baeldung.jmxterm.GuessGame, ...];
```
最后，检查日志级别：
```
$ run getLoggerLevel com.baeldung.jmxterm.GuessGame
#calling operation getLoggerLevel of mbean java.util.logging:type=Logging with params [com.baeldung.jmxterm.GuessGame]
#operation returns:
WARNING
```
要更改它，我们只需调用一个带有参数的setter方法：
```
$ run setLoggerLevel com.baeldung.jmxterm.GuessGame INFO
```
之后，我们可以观察到我们应用程序的日志：
```
...
Apr 14, 2023 12:04:30 PM com.baeldung.jmxterm.GuessGame start
INFO: Current random number is 7
Apr 14, 2023 12:04:31 PM com.baeldung.jmxterm.GuessGame start
INFO: Player Bob guessed incorrectly with 10
Apr 14, 2023 12:04:31 PM com.baeldung.jmxterm.GuessGame start
INFO: Player Alice guessed incorrectly with 5
Apr 14, 2023 12:04:31 PM com.baeldung.jmxterm.GuessGame start
INFO: Player John guessed incorrectly with 4
...
```

### 3.2. 使用域Bean
让我们尝试从应用程序外部停止我们的游戏。步骤将与记录器示例相同：
```
$ domain com.baeldung.jmxterm
#domain is set to com.baeldung.jmxterm
$ beans
#domain = com.baeldung.jmxterm:
com.baeldung.jmxterm:id=singlegame,type=game
$ bean com.baeldung.jmxterm:id=singlegame,type=game
#bean is set to com.baeldung.jmxterm:id=singlegame,type=game
$ info
#mbean = com.baeldung.jmxterm:id=singlegame,type=game
#class name = com.baeldung.jmxterm.GuessGame
#there is no attribute
# operations
  %0   - void finishGame()
  %1   - void pauseGame()
  %2   - void unpauseGame()
#there's no notifications
$ run pauseGame
#calling operation pauseGame of mbean com.baeldung.jmxterm:id=singlegame,type=game with params []
```

我们应该在输出中看到游戏已暂停：
```
...
Apr 14, 2023 12:17:01 PM com.baeldung.jmxterm.GuessGame start
INFO: Game is paused
Apr 14, 2023 12:17:02 PM com.baeldung.jmxterm.GuessGame start
INFO: Game is paused
Apr 14, 2023 12:17:03 PM com.baeldung.jmxterm.GuessGame start
INFO: Game is paused
Apr 14, 2023 12:17:04 PM com.baeldung.jmxterm.GuessGame start
INFO: Game is paused
...
```

我们也可以结束游戏：
```
$ run finishGame
```
输出应该包含游戏已结束的信息：
```
...
Apr 14, 2023 12:17:47 PM com.baeldung.jmxtermGuessGame start
INFO: Game is finished
```

### 3.3. _watch_
此外，我们可以使用_watch_命令跟踪属性的值：
```
$ info
# attributes
#mbean = com.baeldung.jmxterm:id=Bobd661ee89-b972-433c-adff-93e7495c7e0a,type=player
#class name = com.baeldung.jmxterm.Player
#there's no operations
#there's no notifications
  %0   - Guess (int, r)
  %1   - Name (java.lang.String, r)
  %2   - Score (int, r)
$ watch Score
#press any key to stop. DO NOT press Ctrl+C !!!
683683683683683683683
```

原始_watch_输出相当难以阅读，但我们可以为它提供一个格式：
```
$ watch --format Score\ {0}\  Score
#press any key to stop. DO NOT press Ctrl+C !!!
Score 707 Score 707 Score 707 Score 707 Score 707
```

然而，我们可以通过_–report_和_–stopafter_选项进一步改进它：
```
$ watch --report --stopafter 10 --format The\ score\ is\ {0} Score
The score is 727
The score is 727
The score is 727
The score is 728
The score is 728
```

### 3.4. 通知
调试的另一个很棒的功能是MBeans通知。但这需要在我们的代码中进行最小的更改。首先，我们必须实现_javax.management.NotificationBroadcaster_接口：
```
public interface NotificationBroadcaster {
    void addNotificationListener(NotificationListener listener, NotificationFilter filter, Object handback)
      throws java.lang.IllegalArgumentException;
    void removeNotificationListener(NotificationListener listener)
      throws ListenerNotFoundException;
    MBeanNotificationInfo[] getNotificationInfo();
}
```

为了发送有关获胜者的通知，我们将使用_javax.management.NotificationBroadcasterSupport_：
```
public abstract class BroadcastingGuessGame implements NotificationBroadcaster, GuessGameMBean {
    private NotificationBroadcasterSupport broadcaster =
      new NotificationBroadcasterSupport();

    private long notificationSequence = 0;

    private MBeanNotificationInfo[] notificationInfo;

    public BroadcastingGuessGame() {
        this.notificationInfo = new MBeanNotificationInfo[]{
            new MBeanNotificationInfo(new String[]{"game"}, Notification.class.getName(),"Game notification")
        };
    }

    protected void notifyAboutWinner(Player winner) {
        String message = "Winner is " + winner.getName() + " with score " + winner.getScore();
        Notification notification = new Notification("game.winner", this, notificationSequence++, message);
        broadcaster.sendNotification(notification);
    }

    public void addNotificationListener(NotificationListener listener, NotificationFilter filter, Object handback) {
        broadcaster.addNotificationListener(listener, filter, handback);
    }

    public void removeNotificationListener(NotificationListener listener) throws ListenerNotFoundException {
        broadcaster.removeNotificationListener(listener);
    }

    public MBeanNotificationInfo[] getNotificationInfo() {
        return notificationInfo;
    }
}
```

之后，我们可以看到bean上的通知：
```
$ bean com.baeldung.jmxterm:id=singlegame,type=game
#bean is set to com.baeldung.jmxterm:id=singlegame,type=game
$ info
#mbean = com.baeldung.jmxterm:id=singlegame,type=game
#class name = com.baeldung.jmxterm.GuessGame
#there is no attribute
# operations
  %0   - void finishGame()
  %1   - void pauseGame()
  %2   - void unpauseGame()
# notifications
  %0   - javax.management.Notification(game.winner)

```

随后，我们可以订阅通知：
```
$ subscribe
#Subscribed to com.baeldung.jmxterm:id=singlegame,type=game
notification received: ...,message=Winner is John with score 10
notification received: ...,message=Winner is Alice with score 9
notification received: ...,message=Winner is Bob with score 13
notification received: ...,message=Winner is Bob with score 14
notification received: ...,message=Winner is John with score 11
```

通过提供_–domain_和_–bean_选项，我们可以订阅多个bean。

## 4. 结论
JMXTerm是一个强大而灵活的工具，通过JMX管理并监控Java应用程序。通过为JMX操作提供命令行界面，JMXTerm允许开发者和管理员快速轻松地执行诸如监控属性值、调用操作和更改配置设置等任务。

本教程的源代码可以在GitHub上找到。
OK