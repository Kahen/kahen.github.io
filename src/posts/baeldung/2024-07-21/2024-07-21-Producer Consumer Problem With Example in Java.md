---
date: 2022-02-01
category:
  - Java
  - 并发
tag:
  - Java
  - 多线程
  - 阻塞队列
head:
  - - meta
    - name: keywords
      content: Java, 多线程, 阻塞队列, 生产者-消费者问题
---
# Java中生产者-消费者问题示例

在本教程中，我们将学习如何在Java中实现生产者-消费者问题。这个问题也被称为有界缓冲问题。

有关问题的更多细节，我们可以参考生产者-消费者问题维基页面。对于Java线程/并发基础知识，请务必访问我们的Java并发文章。

生产者和消费者是两个独立的进程。这两个进程共享一个公共缓冲区或队列。生产者不断生成某些数据并将其推入缓冲区，而消费者则从缓冲区中消费这些数据。

让我们回顾一下展示这个简单场景的图表：

![img](https://www.baeldung.com/wp-content/uploads/2022/02/Producer-Consumer1.png)

这个问题本质上有一些复杂性需要处理：

- 生产者和消费者可能同时尝试更新队列。这可能导致数据丢失或不一致。
- 生产者可能比消费者慢。在这种情况下，消费者会快速处理元素并等待。
- 在某些情况下，消费者可能比生产者慢。这种情况会导致队列溢出问题。
- 在真实场景中，我们可能有多个生产者、多个消费者或两者都有。这可能导致不同消费者处理相同的消息。

下面的图表描述了具有多个生产者和多个消费者的情况：

![img](https://www.baeldung.com/wp-content/uploads/2022/02/Multi-Producers-Multi-Consumers.png)

我们需要处理资源共享和同步以解决一些复杂性：

- 在添加和删除数据时对队列进行同步
- 当队列为空时，消费者必须等待生产者向队列添加新数据
- 当队列满时，生产者必须等待消费者消费数据，并且队列有一些空缓冲区

### 3.1. _Message_ 类

_Message_ 类保存生成的数据：

```
public class Message {
    private int id;
    private double data;

    // 构造函数和getter/setter
}
```

数据可以是任何类型。它可能是一个JSON字符串、一个复杂对象，或者只是一个数字。同样，将数据包装在_Message_类中也不是强制性的。

### 3.2. _DataQueue_ 类

共享队列及相关对象被封装在_DataQueue_类中：

```
public class DataQueue {
    private final Queue`<Message>` queue = new LinkedList<>();
    private final int maxSize;
    private final Object IS_NOT_FULL = new Object();
    private final Object IS_NOT_EMPTY = new Object();

    DataQueue(int maxSize) {
        this.maxSize = maxSize;
    }

    // 其他方法
}
```

为了制作有界缓冲区，我们采用了一个_queue_和它的_maxSize_。

在Java中，_synchronized_块使用一个对象来实现线程同步。**每个对象都有一个内在的锁。** 只有首先获得锁的线程才被允许执行_synchronized_块。

在这里，我们创建了两个引用，_IS_NOT_FULL_和_IS_NOT_EMPTY_，用于同步。由于这些句柄没有其他用途，我们使用_Object_类对它们进行了初始化。

当队列满时，生产者等待_IS_NOT_FULL_对象。一旦我们移除一个消息，我们就会通知队列不再满。

生产者进程调用_waitIsNotFull_方法：

```
public void waitIsNotFull() throws InterruptedException {
    synchronized (IS_NOT_FULL) {
        IS_NOT_FULL.wait();
    }
}
```

当消费者轮询一个消息时，_dataQueue_通过_notifyIsNotFull_方法通知生产者：

```
private void notifyIsNotFull() {
    synchronized (IS_NOT_FULL) {
        IS_NOT_FULL.notify();
    }
}
```

如果队列为空，消费者等待_IS_NOT_EMPTY_对象。一旦我们添加了一个消息，我们就会通知队列不再为空。

消费者进程使用_waitIsNotEmpty_方法等待：

```
public void waitIsNotEmpty() throws InterruptedException {
    synchronized (IS_NOT_EMPTY) {
        IS_NOT_EMPTY.wait();
    }
}
```

当生产者添加一个消息时，_dataQueue_通过_notifyIsNotEmpty_方法通知消费者：

```
public void notifyIsNotEmpty() {
    synchronized (IS_NOT_EMPTY) {
        IS_NOT_EMPTY.notify();
    }
}
```

生产者使用_add()_方法向队列添加一个消息：

```
public void add(Message message) {
    queue.add(message);
    notifyIsNotEmpty();
}
```

消费者调用_remove_方法从队列中检索一个消息：

```
public Message remove() {
    Message mess = queue.poll();
    notifyIsNotFull();
    return mess;
}
```

### 3.3. _Producer_ 类

_Producer_类实现了_Runnable_接口以启用线程创建：

```
public class Producer implements Runnable {
    private final DataQueue dataQueue;
    private boolean running = false;

    public Producer(DataQueue dataQueue) {
        this.dataQueue = dataQueue;
    }

    @Override
    public void run() {
        running = true;
        produce();
    }

    // 其他方法
}
```

构造函数使用共享_dataQueue_参数。成员变量_running_有助于优雅地停止生产者进程。它被初始化为_true_。

线程启动调用_produce()_方法：

```
public void produce() {
    while (running) {
        if(dataQueue.isFull()) {
            try {
                dataQueue.waitIsNotFull();
            } catch (InterruptedException e) {
                log.severe("Error while waiting to Produce messages.");
                break;
            }
        }
        if (!running) {
            break;
        }
        dataQueue.add(generateMessage());
    }
    log.info("Producer Stopped");
}

```

生产者在_while_循环中连续运行步骤。当_running_为_false_时，循环将中断。

在每次迭代中，它生成一个消息。然后，它检查队列是否已满并按需等待。

当生产者从等待中醒来时，它检查是否仍需要继续或退出进程。它向队列添加一个消息并通知等待空队列的消费者。

_stop_()方法优雅地终止进程：

```
public void stop() {
    running = false;
    dataQueue.notifyIsNotFull();
}
```

在将_running_标志更改为_false_之后，所有在“队列已满”状态下等待的生产者都收到通知。这确保了所有生产者线程终止。

### 3.4. 消费者类

_Consumer_类实现了_Runnable_以启用线程创建：

```
public class Consumer implements Runnable {
    private final DataQueue dataQueue;
    private boolean running = false;

    public Consumer(DataQueue dataQueue) {
        this.dataQueue = dataQueue;
    }

    @Override
    public void run() {
        consume();
    }

    // 其他方法
}
```

它的构造函数有一个共享_dataQueue_作为参数。_running_标志被初始化为_true_。这个标志在需要时停止消费者进程。

**当线程启动时，它运行_consume_方法**：

```
public void consume() {
    while (running) {
        if(dataQueue.isEmpty()) {
            try {
                dataQueue.waitIsNotEmpty();
            } catch (InterruptedException e) {
                log.severe("Error while waiting to Consume messages.");
                break;
            }
        }
        if (!running) {
            break;
        }
        Message message = dataQueue.poll();
        useMessage(message);
    }
    log.info("Consumer Stopped");
}

```

它有一个连续运行的_while_循环。当_running_标志为_false_时，此进程优雅地停止。

每次迭代都检查队列是否为空。**如果队列为空，消费者等待消息被生成**。

当消费者从等待中醒来时，它检查_running_标志。如果标志为_false_，则跳出循环。否则，它从队列中读取消息并通知生产者它正在等待“满队列”状态。最后，它消费消息。

要优雅地停止进程，它使用_stop()_方法：

```
public void stop() {
    running = false;
    dataQueue.notifyIsNotEmpty();
}
```

在将_running_标志设置为_false_之后，所有在空队列状态下等待的消费者都收到通知。这确保了所有消费者线程终止。

### 3.5. 运行生产者和消费者线程

让我们创建一个_dataQueue_对象，具有所需的最大容量：

```
DataQueue dataQueue = new DataQueue(MAX_QUEUE_CAPACITY);

```

现在，让我们创建一个_producer_对象和线程：

```
Producer producer = new Producer(dataQueue);
Thread producerThread = new Thread(producer);
```

然后，我们将初始化一个_consumer_对象和线程：

```
Consumer consumer = new Consumer(dataQueue);
Thread consumerThread = new Thread(consumer);
```

最后，我们启动线程以启动进程：

```
producerThread.start();
consumerThread.start();
```

它将连续运行，直到我们想要停止这些线程。停止它们很简单：

```
producer.stop();
consumer.stop();

```

### 3.6. 运行多个生产者和消费者

运行多个生产者和消费者与单个生产者和消费者的情况类似。**我们只需要创建所需数量的线程并启动它们。**

让我们创建多个生产者和线程并启动它们：

```
List`<Producer>` producers = new ArrayList<>();
for(int i = 0; i `< producerCount; i++) {
    Producer producer = new Producer(dataQueue);
    Thread producerThread = new Thread(producer);
    producerThread.start();
    producers.add(producer);
}
```

接下来，让我们创建所需数量的消费者对象和线程：

```
List<Consumer>` consumers = new ArrayList<>();
for(int i = 0; i < consumerCount; i++) {
    Consumer consumer = new Consumer(dataQueue);
    Thread consumerThread = new Thread(consumer);
    consumerThread.start();
    consumers.add(consumer);
}
```

我们可以通过在生产者和消费者对象上调用_stop()_方法来优雅地停止进程：

```
consumers.forEach(Consumer::stop);
producers.forEach(Producer::stop);
```

## 4. 结论

在本文中，我们学习了如何使用Java线程实现生产者-消费者问题。我们还学习了如何运行具有多个生产者和消费者的场景。

完整的代码示例可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)

OK