import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a}from"./app-BPlYww1N.js";const d={},s=a(`<h1 id="java中生产者-消费者问题示例" tabindex="-1"><a class="header-anchor" href="#java中生产者-消费者问题示例"><span>Java中生产者-消费者问题示例</span></a></h1><p>在本教程中，我们将学习如何在Java中实现生产者-消费者问题。这个问题也被称为有界缓冲问题。</p><p>有关问题的更多细节，我们可以参考生产者-消费者问题维基页面。对于Java线程/并发基础知识，请务必访问我们的Java并发文章。</p><p>生产者和消费者是两个独立的进程。这两个进程共享一个公共缓冲区或队列。生产者不断生成某些数据并将其推入缓冲区，而消费者则从缓冲区中消费这些数据。</p><p>让我们回顾一下展示这个简单场景的图表：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/02/Producer-Consumer1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这个问题本质上有一些复杂性需要处理：</p><ul><li>生产者和消费者可能同时尝试更新队列。这可能导致数据丢失或不一致。</li><li>生产者可能比消费者慢。在这种情况下，消费者会快速处理元素并等待。</li><li>在某些情况下，消费者可能比生产者慢。这种情况会导致队列溢出问题。</li><li>在真实场景中，我们可能有多个生产者、多个消费者或两者都有。这可能导致不同消费者处理相同的消息。</li></ul><p>下面的图表描述了具有多个生产者和多个消费者的情况：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/02/Multi-Producers-Multi-Consumers.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们需要处理资源共享和同步以解决一些复杂性：</p><ul><li>在添加和删除数据时对队列进行同步</li><li>当队列为空时，消费者必须等待生产者向队列添加新数据</li><li>当队列满时，生产者必须等待消费者消费数据，并且队列有一些空缓冲区</li></ul><h3 id="_3-1-message-类" tabindex="-1"><a class="header-anchor" href="#_3-1-message-类"><span>3.1. <em>Message</em> 类</span></a></h3><p><em>Message</em> 类保存生成的数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Message {
    private int id;
    private double data;

    // 构造函数和getter/setter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据可以是任何类型。它可能是一个JSON字符串、一个复杂对象，或者只是一个数字。同样，将数据包装在_Message_类中也不是强制性的。</p><h3 id="_3-2-dataqueue-类" tabindex="-1"><a class="header-anchor" href="#_3-2-dataqueue-类"><span>3.2. <em>DataQueue</em> 类</span></a></h3><p>共享队列及相关对象被封装在_DataQueue_类中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class DataQueue {
    private final Queue\`&lt;Message&gt;\` queue = new LinkedList&lt;&gt;();
    private final int maxSize;
    private final Object IS_NOT_FULL = new Object();
    private final Object IS_NOT_EMPTY = new Object();

    DataQueue(int maxSize) {
        this.maxSize = maxSize;
    }

    // 其他方法
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了制作有界缓冲区，我们采用了一个_queue_和它的_maxSize_。</p><p>在Java中，_synchronized_块使用一个对象来实现线程同步。<strong>每个对象都有一个内在的锁。</strong> 只有首先获得锁的线程才被允许执行_synchronized_块。</p><p>在这里，我们创建了两个引用，<em>IS_NOT_FULL_和_IS_NOT_EMPTY</em>，用于同步。由于这些句柄没有其他用途，我们使用_Object_类对它们进行了初始化。</p><p>当队列满时，生产者等待_IS_NOT_FULL_对象。一旦我们移除一个消息，我们就会通知队列不再满。</p><p>生产者进程调用_waitIsNotFull_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void waitIsNotFull() throws InterruptedException {
    synchronized (IS_NOT_FULL) {
        IS_NOT_FULL.wait();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当消费者轮询一个消息时，_dataQueue_通过_notifyIsNotFull_方法通知生产者：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void notifyIsNotFull() {
    synchronized (IS_NOT_FULL) {
        IS_NOT_FULL.notify();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果队列为空，消费者等待_IS_NOT_EMPTY_对象。一旦我们添加了一个消息，我们就会通知队列不再为空。</p><p>消费者进程使用_waitIsNotEmpty_方法等待：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void waitIsNotEmpty() throws InterruptedException {
    synchronized (IS_NOT_EMPTY) {
        IS_NOT_EMPTY.wait();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当生产者添加一个消息时，_dataQueue_通过_notifyIsNotEmpty_方法通知消费者：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void notifyIsNotEmpty() {
    synchronized (IS_NOT_EMPTY) {
        IS_NOT_EMPTY.notify();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生产者使用_add()_方法向队列添加一个消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void add(Message message) {
    queue.add(message);
    notifyIsNotEmpty();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消费者调用_remove_方法从队列中检索一个消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public Message remove() {
    Message mess = queue.poll();
    notifyIsNotFull();
    return mess;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-producer-类" tabindex="-1"><a class="header-anchor" href="#_3-3-producer-类"><span>3.3. <em>Producer</em> 类</span></a></h3><p>_Producer_类实现了_Runnable_接口以启用线程创建：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Producer implements Runnable {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构造函数使用共享_dataQueue_参数。成员变量_running_有助于优雅地停止生产者进程。它被初始化为_true_。</p><p>线程启动调用_produce()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void produce() {
    while (running) {
        if(dataQueue.isFull()) {
            try {
                dataQueue.waitIsNotFull();
            } catch (InterruptedException e) {
                log.severe(&quot;Error while waiting to Produce messages.&quot;);
                break;
            }
        }
        if (!running) {
            break;
        }
        dataQueue.add(generateMessage());
    }
    log.info(&quot;Producer Stopped&quot;);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生产者在_while_循环中连续运行步骤。当_running_为_false_时，循环将中断。</p><p>在每次迭代中，它生成一个消息。然后，它检查队列是否已满并按需等待。</p><p>当生产者从等待中醒来时，它检查是否仍需要继续或退出进程。它向队列添加一个消息并通知等待空队列的消费者。</p><p><em>stop</em>()方法优雅地终止进程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void stop() {
    running = false;
    dataQueue.notifyIsNotFull();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在将_running_标志更改为_false_之后，所有在“队列已满”状态下等待的生产者都收到通知。这确保了所有生产者线程终止。</p><h3 id="_3-4-消费者类" tabindex="-1"><a class="header-anchor" href="#_3-4-消费者类"><span>3.4. 消费者类</span></a></h3><p>_Consumer_类实现了_Runnable_以启用线程创建：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Consumer implements Runnable {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的构造函数有一个共享_dataQueue_作为参数。<em>running_标志被初始化为_true</em>。这个标志在需要时停止消费者进程。</p><p><strong>当线程启动时，它运行_consume_方法</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void consume() {
    while (running) {
        if(dataQueue.isEmpty()) {
            try {
                dataQueue.waitIsNotEmpty();
            } catch (InterruptedException e) {
                log.severe(&quot;Error while waiting to Consume messages.&quot;);
                break;
            }
        }
        if (!running) {
            break;
        }
        Message message = dataQueue.poll();
        useMessage(message);
    }
    log.info(&quot;Consumer Stopped&quot;);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它有一个连续运行的_while_循环。当_running_标志为_false_时，此进程优雅地停止。</p><p>每次迭代都检查队列是否为空。<strong>如果队列为空，消费者等待消息被生成</strong>。</p><p>当消费者从等待中醒来时，它检查_running_标志。如果标志为_false_，则跳出循环。否则，它从队列中读取消息并通知生产者它正在等待“满队列”状态。最后，它消费消息。</p><p>要优雅地停止进程，它使用_stop()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void stop() {
    running = false;
    dataQueue.notifyIsNotEmpty();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在将_running_标志设置为_false_之后，所有在空队列状态下等待的消费者都收到通知。这确保了所有消费者线程终止。</p><h3 id="_3-5-运行生产者和消费者线程" tabindex="-1"><a class="header-anchor" href="#_3-5-运行生产者和消费者线程"><span>3.5. 运行生产者和消费者线程</span></a></h3><p>让我们创建一个_dataQueue_对象，具有所需的最大容量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>DataQueue dataQueue = new DataQueue(MAX_QUEUE_CAPACITY);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建一个_producer_对象和线程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Producer producer = new Producer(dataQueue);
Thread producerThread = new Thread(producer);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将初始化一个_consumer_对象和线程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Consumer consumer = new Consumer(dataQueue);
Thread consumerThread = new Thread(consumer);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们启动线程以启动进程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>producerThread.start();
consumerThread.start();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>它将连续运行，直到我们想要停止这些线程。停止它们很简单：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>producer.stop();
consumer.stop();

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-运行多个生产者和消费者" tabindex="-1"><a class="header-anchor" href="#_3-6-运行多个生产者和消费者"><span>3.6. 运行多个生产者和消费者</span></a></h3><p>运行多个生产者和消费者与单个生产者和消费者的情况类似。<strong>我们只需要创建所需数量的线程并启动它们。</strong></p><p>让我们创建多个生产者和线程并启动它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List\`&lt;Producer&gt;\` producers = new ArrayList&lt;&gt;();
for(int i = 0; i \`&lt; producerCount; i++) {
    Producer producer = new Producer(dataQueue);
    Thread producerThread = new Thread(producer);
    producerThread.start();
    producers.add(producer);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建所需数量的消费者对象和线程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List&lt;Consumer&gt;\` consumers = new ArrayList&lt;&gt;();
for(int i = 0; i &lt; consumerCount; i++) {
    Consumer consumer = new Consumer(dataQueue);
    Thread consumerThread = new Thread(consumer);
    consumerThread.start();
    consumers.add(consumer);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过在生产者和消费者对象上调用_stop()_方法来优雅地停止进程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>consumers.forEach(Consumer::stop);
producers.forEach(Producer::stop);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何使用Java线程实现生产者-消费者问题。我们还学习了如何运行具有多个生产者和消费者的场景。</p><p>完整的代码示例可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"></p><p>OK</p>`,84),t=[s];function l(r,u){return i(),n("div",null,t)}const o=e(d,[["render",l],["__file","2024-07-21-Producer Consumer Problem With Example in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Producer%20Consumer%20Problem%20With%20Example%20in%20Java.html","title":"Java中生产者-消费者问题示例","lang":"zh-CN","frontmatter":{"date":"2022-02-01T00:00:00.000Z","category":["Java","并发"],"tag":["Java","多线程","阻塞队列"],"head":[["meta",{"name":"keywords","content":"Java, 多线程, 阻塞队列, 生产者-消费者问题"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Producer%20Consumer%20Problem%20With%20Example%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中生产者-消费者问题示例"}],["meta",{"property":"og:description","content":"Java中生产者-消费者问题示例 在本教程中，我们将学习如何在Java中实现生产者-消费者问题。这个问题也被称为有界缓冲问题。 有关问题的更多细节，我们可以参考生产者-消费者问题维基页面。对于Java线程/并发基础知识，请务必访问我们的Java并发文章。 生产者和消费者是两个独立的进程。这两个进程共享一个公共缓冲区或队列。生产者不断生成某些数据并将其推..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/02/Producer-Consumer1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T13:23:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"多线程"}],["meta",{"property":"article:tag","content":"阻塞队列"}],["meta",{"property":"article:published_time","content":"2022-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T13:23:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中生产者-消费者问题示例\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/02/Producer-Consumer1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/02/Multi-Producers-Multi-Consumers.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\"],\\"datePublished\\":\\"2022-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T13:23:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中生产者-消费者问题示例 在本教程中，我们将学习如何在Java中实现生产者-消费者问题。这个问题也被称为有界缓冲问题。 有关问题的更多细节，我们可以参考生产者-消费者问题维基页面。对于Java线程/并发基础知识，请务必访问我们的Java并发文章。 生产者和消费者是两个独立的进程。这两个进程共享一个公共缓冲区或队列。生产者不断生成某些数据并将其推..."},"headers":[{"level":3,"title":"3.1. Message 类","slug":"_3-1-message-类","link":"#_3-1-message-类","children":[]},{"level":3,"title":"3.2. DataQueue 类","slug":"_3-2-dataqueue-类","link":"#_3-2-dataqueue-类","children":[]},{"level":3,"title":"3.3. Producer 类","slug":"_3-3-producer-类","link":"#_3-3-producer-类","children":[]},{"level":3,"title":"3.4. 消费者类","slug":"_3-4-消费者类","link":"#_3-4-消费者类","children":[]},{"level":3,"title":"3.5. 运行生产者和消费者线程","slug":"_3-5-运行生产者和消费者线程","link":"#_3-5-运行生产者和消费者线程","children":[]},{"level":3,"title":"3.6. 运行多个生产者和消费者","slug":"_3-6-运行多个生产者和消费者","link":"#_3-6-运行多个生产者和消费者","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721568183000,"updatedTime":1721568183000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.56,"words":1969},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Producer Consumer Problem With Example in Java.md","localizedDate":"2022年2月1日","excerpt":"\\n<p>在本教程中，我们将学习如何在Java中实现生产者-消费者问题。这个问题也被称为有界缓冲问题。</p>\\n<p>有关问题的更多细节，我们可以参考生产者-消费者问题维基页面。对于Java线程/并发基础知识，请务必访问我们的Java并发文章。</p>\\n<p>生产者和消费者是两个独立的进程。这两个进程共享一个公共缓冲区或队列。生产者不断生成某些数据并将其推入缓冲区，而消费者则从缓冲区中消费这些数据。</p>\\n<p>让我们回顾一下展示这个简单场景的图表：</p>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2022/02/Producer-Consumer1.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{o as comp,m as data};
