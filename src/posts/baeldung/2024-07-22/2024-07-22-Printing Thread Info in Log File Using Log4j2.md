---
date: 2022-04-01
category:
  - Java
  - Logging
tag:
  - Log4j2
  - Thread Information
head:
  - - meta
    - name: keywords
      content: Log4j2, Thread Information, Logging
------
# 使用Log4j2记录线程信息到日志文件

这篇文章将展示如何使用Log4j2库记录线程信息的概念和示例。

日志是提供系统发生错误或流程时上下文的强大工具。日志帮助我们捕获并持久化相关信息，以便随时分析。

线程允许我们的应用程序同时执行多项任务，以处理更多请求，使我们的工作更加高效。

许多Java应用程序使用日志和线程来控制这种情况。然而，由于日志通常集中在特定文件中，来自不同线程的日志会混乱，用户无法识别和理解事件的顺序。我们将使用Java最流行的日志框架之一Log4j2，展示有关我们线程的相关信息，以解决这个问题。

接下来，我们有一个示例，使用Log4j2中的一些参数来显示有关我们线程的信息：

```xml
`<Property name="LOG_PATTERN">` %d{yyyy-MM-dd HH:mm:ss.SSS} --- thread_id="%tid" thread_name="%tn" thread_priority="%tp" --- [%p] %m%n `</Property>`
```

Log4j2在其模式中使用参数来引用数据。所有参数都以_%_开头。以下是一些线程参数的示例：

- **_tid_**: 线程标识符是在创建线程时生成的正长数字。
- **_tn_**: 它是命名线程的字符序列。
- **_tp_**: 线程优先级是介于1到10之间的整数，数字越大表示优先级越高。

首先，正如建议的，我们正在添加有关线程的id、名称和优先级的信息。因此，为了可视化它，我们需要创建一个简单的应用程序，创建新线程并记录一些信息：

```java
public class Log4j2ThreadInfo {
    private static final Logger logger = LogManager.getLogger(Log4j2ThreadInfo.class);

    public static void main(String[] args) {
        IntStream.range(0, 5).forEach(i -> {
            Runnable runnable = () -> logger.info("Logging info");
            Thread thread = new Thread(runnable);
            thread.start();
        });
    }
}
```

换句话说，我们正在使用Java Streams的帮助，在0到5的范围内运行一个forEach，然后启动一个带有一些日志的新线程。结果，我们将得到：

```
2022-01-14 23:44:56.893 --- thread_id="22" thread_name="Thread-2" thread_priority="5" --- [INFO] Logging info
2022-01-14 23:44:56.893 --- thread_id="21" thread_name="Thread-1" thread_priority="5" --- [INFO] Logging info
2022-01-14 23:44:56.893 --- thread_id="20" thread_name="Thread-0" thread_priority="5" --- [INFO] Logging info
2022-01-14 23:44:56.893 --- thread_id="24" thread_name="Thread-4" thread_priority="5" --- [INFO] Logging info
2022-01-14 23:44:56.893 --- thread_id="23" thread_name="Thread-3" thread_priority="5" --- [INFO] Logging info
```

本文展示了一种简单的方法，使用Log4j2参数将线程信息添加到您的Java项目中。如果你想查看代码，它在GitHub上有提供。