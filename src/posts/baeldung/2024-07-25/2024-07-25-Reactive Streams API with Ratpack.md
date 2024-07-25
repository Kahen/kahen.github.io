---
date: 2024-07-25
category:
  - Java
  - Ratpack
tag:
  - Reactive Streams
  - Ratpack
head:
  - - meta
    - name: keywords
      content: Ratpack, Reactive Streams, Java
------
# Ratpack 与反应式流 API

## 1. 引言

Ratpack 是一个基于 Netty 引擎构建的框架，它允许我们快速构建 HTTP 应用程序。我们之前的文章已经介绍了它的基本用法。**这次，我们将展示如何使用其流 API 实现反应式应用程序**。

## 2. 反应式流的快速回顾

在深入实际实现之前，让我们首先回顾一下构成反应式应用程序的基本属性。根据原始作者的说法，这类应用程序必须具备以下属性：

- 响应式
- 弹性
- 消息驱动

那么，反应式流是如何帮助我们实现这些属性的呢？在这种情况下，**消息驱动**并不一定意味着使用消息中间件。实际上，真正需要解决这一点的是**异步请求处理和支持非阻塞背压**。

Ratpack 的反应式支持使用 JVM 的反应式流 API 标准作为其实现的基础。**因此，它允许与其他兼容的框架如 Project Reactor 和 RxJava 进行互操作**。

## 3. 使用 Ratpack 的 _Streams_ 类

**Ratpack 的 _Streams_ 类提供了几个实用方法来创建 _Publisher_ 实例，然后我们可以使用它们来创建数据处理管道。**

一个很好的起点是 _publish()_ 方法，我们可以使用它从任何 _Iterable_ 创建一个 _Publisher_：

```java
Publisher`````<String>````` pub = Streams.publish(Arrays.asList("hello", "hello again"));
LoggingSubscriber`````<String>````` sub = new LoggingSubscriber<>();
pub.subscribe(sub);
sub.block();

```

这里，_LoggingSubscriber_ 是 _Subscriber_ 接口的一个测试实现，它只是记录 Publisher 发出的每一对象。它还包括一个辅助方法 _block()_，正如其名称所示，它会阻塞调用者，直到发布者发出其所有对象或产生错误。

运行测试用例，我们将看到预期的事件序列：

```java
onSubscribe: sub=7311908
onNext: sub=7311908, value=hello
onNext: sub=7311908, value=hello again
onComplete: sub=7311908
```

另一个有用的方法是 _yield()_。它有一个单一的 _Function_ 参数，该参数接收一个 _YieldRequest_ 对象，并返回要发出的下一个对象：

```java
@Test
public void whenYield_thenSuccess() {

    Publisher`````<String>````` pub = Streams.yield((t) -> {
        return t.getRequestNum() < 5 ? "hello" : null;
    });

    LoggingSubscriber`````<String>````` sub = new LoggingSubscriber<>();
    pub.subscribe(sub);
    sub.block();
    assertEquals(5, sub.getReceived());
}

```

_YieldRequest_ 参数允许我们使用其 _getRequestNum()_ 方法，基于迄今为止发出的对象数量来实现逻辑。在我们的示例中，我们使用这些信息来定义结束条件，通过返回一个 _null_ 值来发出信号。

现在，让我们看看如何为周期性事件创建一个 _Publisher_：

```java
@Test
public void whenPeriodic_thenSuccess() {
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
    Publisher`````<String>````` pub = Streams.periodically(executor, Duration.ofSeconds(1), (t) -> {
        return t < 5 ? String.format("hello %d", t) : null;
    });

    LoggingSubscriber`````<String>````` sub = new LoggingSubscriber<>();
    pub.subscribe(sub);
    sub.block();
    assertEquals(5, sub.getReceived());
}

```

返回的发布者使用 _ScheduledExecutorService_ 定期调用生产者函数，直到它返回一个 _null_ 值。生产者函数接收一个整数值，该值对应于已经发出的对象数量，我们使用它来终止流。

## 4. 使用 _TransformablePublisher_

仔细看看 _Streams’_ 方法，我们可以看到它们通常返回一个 _TransformablePublisher_。这个接口扩展了 _Publisher_，并提供了几个实用方法，就像我们在 Project Reactor 的 _Flux_ 和 _Mono_ 中找到的那样，**使它更容易从单独的步骤创建复杂的处理管道**。

例如，让我们使用 _map_ 方法将整数序列转换为字符串：

```java
@Test
public void whenMap_thenSuccess() throws Exception {
    TransformablePublisher`````<String>````` pub = Streams.yield( t -> {
        return t.getRequestNum() `< 5 ? t.getRequestNum() : null;
    })
    .map(v ->` String.format("item %d", v));

    ExecResult<List`````<String>`````> result = ExecHarness.yieldSingle((c) -> pub.toList());
    assertTrue("should succeed", result.isSuccess());
    assertEquals("should have 5 items", 5, result.getValue().size());
}

```

这里，实际执行发生在由测试工具类 _ExecHarness_ 管理的线程池中。由于 _yieldSingle()_ 期望一个 _Promise_，我们使用 _toList()_ 来适配我们的发布者。这个方法收集订阅者产生的所有结果并将它们存储在一个 _List_ 中。

正如文档中所述，我们在使用这种方法时必须小心。将其应用于无界发布者可以迅速使 JVM 内存不足！**为了避免这种情况，我们应该主要将其限制在单元测试中使用**。

除了 _map()_，《TransformablePublisher》还有几个有用的操作符：
- _filter()_：根据 _Predicate_ 过滤上游对象
- _take()_：从上游 _Publisher_ 发出仅前 _n_ 个对象
- _wiretap()_：添加一个观察点，我们可以在数据和事件流经管道时进行检查
- _reduce()_：将上游对象减少为一个单一值
- _transform()_：在流中注入一个常规 _Publisher_

## 5. 使用 _buffer()_ 处理不合规的 _Publisher_

**在某些情况下，我们必须处理一个向其订阅者发送比请求更多项目的 _Publisher_。** Ratpack 的 Streams 提供了一个 _buffer()_ 方法，它将这些额外的项目保存在内存中，直到订阅者消费它们。

为了说明这是如何工作的，让我们创建一个简单的不合规 _Publisher_，它忽略了请求的项目数量。相反，它将始终至少产生比请求多 5 个项目：

```java
private class NonCompliantPublisher implements Publisher````````<Integer>```````` {

    @Override
    public void subscribe(Subscriber```<? super Integer>``` subscriber) {
        log.info("subscribe");
        subscriber.onSubscribe(new NonCompliantSubscription(subscriber));
    }

    private class NonCompliantSubscription implements Subscription {
        private Subscriber```<? super Integer>``` subscriber;
        private int recurseLevel = 0;

        public NonCompliantSubscription(Subscriber```<? super Integer>``` subscriber) {
            this.subscriber = subscriber;
        }

        @Override
        public void request(long n) {
            log.info("request: n={}", n);
            if (recurseLevel > 0) {
               return;
            }
            recurseLevel++;
            for (int i = 0; i < (n + 5); i++) {
                subscriber.onNext(i);
            }
            subscriber.onComplete();
        }

        @Override
        public void cancel() {
        }
    }
}

```

首先，让我们使用我们的 _LoggingSubscriber_ 测试这个发布者。我们将使用 _take()_ 操作符，这样它只会接收第一个项目：

```java
@Test
public void whenNonCompliantPublisherWithoutBuffer_thenSuccess() throws Exception {
    TransformablePublisher````````<Integer>```````` pub = Streams.transformable(new NonCompliantPublisher())
      .wiretap(new LoggingAction(""))
      .take(1);

    LoggingSubscriber````````<Integer>```````` sub = new LoggingSubscriber<>();
    pub.subscribe(sub);
    sub.block();
}

```

**运行这个测试，我们可以看到尽管收到了 _cancel()_ 请求，我们的不合规发布者仍然继续产生新项目：**

```java
RatpackStreamsUnitTest - : event=StreamEvent[DataEvent{subscriptionId=0, data=0}]
LoggingSubscriber - onNext: sub=583189145, value=0
RatpackStreamsUnitTest - : event=StreamEvent[RequestEvent{requestAmount=1, subscriptionId=0}]
NonCompliantPublisher - request: n=1
RatpackStreamsUnitTest - : event=StreamEvent[CancelEvent{subscriptionId=0}]
LoggingSubscriber - onComplete: sub=583189145
RatpackStreamsUnitTest - : event=StreamEvent[DataEvent{subscriptionId=0, data=1}]
... more expurious data event
RatpackStreamsUnitTest - : event=StreamEvent[CompletionEvent{subscriptionId=0}]
LoggingSubscriber - onComplete: sub=583189145
```

现在，让我们在这个流中添加一个 _buffer()_ 步骤。我们将添加两个 _wiretap_ 步骤来记录事件，这样它的效果就更加明显：

```java
@Test
public void whenNonCompliantPublisherWithBuffer_thenSuccess() throws Exception {
    TransformablePublisher````````<Integer>```````` pub = Streams.transformable(new NonCompliantPublisher())
      .wiretap(new LoggingAction("before buffer"))
      .buffer()
      .wiretap(new LoggingAction("after buffer"))
      .take(1);

    LoggingSubscriber````````<Integer>```````` sub = new LoggingSubscriber<>();
    pub.subscribe(sub);
    sub.block();
}

```

这次，运行这段代码会产生不同的日志序列：

LoggingSubscriber - onSubscribe: sub=675852144
RatpackStreamsUnitTest - after buffer: event=StreamEvent[RequestEvent{requestAmount=1, subscriptionId=0}]
NonCompliantPublisher - subscribe
RatpackStreamsUnitTest - before buffer: event=StreamEvent[RequestEvent{requestAmount=1, subscriptionId=0}]
NonCompliantPublisher - request: n=1
RatpackStreamsUnitTest - before buffer: event=StreamEvent[DataEvent{subscriptionId=0, data=0}]
... 更多数据事件
RatpackStreamsUnitTest - before buffer: event=StreamEvent[CompletionEvent{subscriptionId=0}]
RatpackStreamsUnitTest - after buffer: event=StreamEvent[DataEvent{subscriptionId=0, data=0}]
LoggingSubscriber - onNext: sub=675852144, value=0
RatpackStreamsUnitTest - after buffer: event=StreamEvent[RequestEvent{requestAmount=1, subscriptionId=0}]
RatpackStreamsUnitTest - after buffer: event=StreamEvent[CancelEvent{subscriptionId=0}]
RatpackStreamsUnitTest - before buffer: event=StreamEvent[CancelEvent{subscriptionId=0}]
LoggingSubscriber - onComplete: sub=67585214

```

"before buffer" 消息显示，我们的不合规发布者在第一次调用 _request_ 之后能够发送所有值。**然而，下游值仍然一个接一个地发送，尊重 _LoggingSubscriber_ 请求的数量。

## 6. 使用 _batch()_ 处理慢速订阅者

另一个可能降低应用程序吞吐量的场景是，下游订阅者请求数据的量很小。我们的 _LoggingSubscriber_ 是一个很好的例子：它一次只请求一个项目。

**在现实世界的应用中，这可能会导致大量的上下文切换，这将损害整体性能。** 一个更好的方法是一次请求更多的项目。_batch()_ 方法允许上游发布者使用更有效的请求大小，同时允许下游订阅者使用较小的请求大小。

让我们看看这在实践中是如何工作的。像以前一样，我们将从一个没有 _batch_ 的流开始：

```java
@Test
public void whenCompliantPublisherWithoutBatch_thenSuccess() throws Exception {
    TransformablePublisher````````<Integer>```````` pub = Streams.transformable(new CompliantPublisher(10))
      .wiretap(new LoggingAction(""));

    LoggingSubscriber````````<Integer>```````` sub = new LoggingSubscriber<>();
    pub.subscribe(sub);
    sub.block();
}

```

这里，_CompliantPublisher_ 只是一个测试 _Publisher_，它产生整数直到但不包括传递给构造函数的值。让我们运行它来看看非批量行为：

```java
CompliantPublisher - subscribe
LoggingSubscriber - onSubscribe: sub=-779393331
RatpackStreamsUnitTest - : event=StreamEvent[RequestEvent{requestAmount=1, subscriptionId=0}]
CompliantPublisher - request: requested=1, available=10
RatpackStreamsUnitTest - : event=StreamEvent[DataEvent{subscriptionId=0, data=0}]
LoggingSubscriber - onNext: sub=-779393331, value=0
... 更多数据事件省略
CompliantPublisher - request: requested=1, available=1
RatpackStreamsUnitTest - : event=StreamEvent[CompletionEvent{subscriptionId=0}]
LoggingSubscriber - onComplete: sub=-779393331
```

**输出显示生产者一次发出一个值。** 现在，让我们在我们的管道中添加 _batch()_ 步骤，这样上游发布者每次产生多达五个项目：

```java
@Test
public void whenCompliantPublisherWithBatch_thenSuccess() throws Exception {

    TransformablePublisher````````<Integer>```````` pub = Streams.transformable(new CompliantPublisher(10))
      .wiretap(new LoggingAction("before batch"))
      .batch(5, Action.noop())
      .wiretap(new LoggingAction("after batch"));

    LoggingSubscriber````````<Integer>```````` sub = new LoggingSubscriber<>();
    pub.subscribe(sub);
    sub.block();
}

```

_batch()_ 方法接受两个参数：每个 _request()_ 调用请求的项目数量，以及一个处理丢弃项目的 _Action_，即请求但未消费的项目。这种情况可能会发生，如果有错误或下游订阅者调用了 _cancel()_。让我们看看结果的执行日志：

```java
LoggingSubscriber - onSubscribe: sub=-1936924690
RatpackStreamsUnitTest - after batch: event=StreamEvent[RequestEvent{requestAmount=1, subscriptionId=0}]
CompliantPublisher - subscribe
RatpackStreamsUnitTest - before batch: event=StreamEvent[RequestEvent{requestAmount=5, subscriptionId=0}]
CompliantPublisher - request: requested=5, available=10
RatpackStreamsUnitTest - before batch: event=StreamEvent[DataEvent{subscriptionId=0, data=0}]
... 第一批数据事件省略
RatpackStreamsUnitTest - before batch: event=StreamEvent[RequestEvent{requestAmount=5, subscriptionId=0}]
CompliantPublisher - request: requested=5, available=6
RatpackStreamsUnitTest - before batch: event=StreamEvent[DataEvent{subscriptionId=0, data=5}]
... 第二批数据事件省略
RatpackStreamsUnitTest - before batch: event=StreamEvent[RequestEvent{requestAmount=5, subscriptionId=0}]
CompliantPublisher - request: requested=5, available=1
RatpackStreamsUnitTest - before batch: event=StreamEvent[CompletionEvent{subscriptionId=0}]
RatpackStreamsUnitTest - after batch: event=StreamEvent[DataEvent{subscriptionId=0, data=0}]
LoggingSubscriber - onNext: sub=-1936924690, value=0
RatpackStreamsUnitTest - after batch: event=StreamEvent[RequestEvent{requestAmount=1, subscriptionId=0}]
RatpackStreamsUnitTest - after batch: event=StreamEvent[DataEvent{subscriptionId=0, data=1}]
... 下游数据事件省略
LoggingSubscriber - onComplete: sub=-1936924690

```

**我们可以看到现在发布者每次请求五个项目。** 注意，在这种测试场景中，即使在记录订阅者得到第一项之前，我们也看到了对生产者的 _两个_ 请求。原因是，在这种测试场景中，我们有单线程执行，所以 _batch_() 继续缓冲项目，直到它得到 _onComplete()_ 信号。

## 7. 在 Web 应用程序中使用 Streams

Ratpack 支持将反应式流与其异步 Web 框架结合使用。

### 7.1. 接收数据流

对于传入数据，通过处理程序的 _Context_ 可用的 _Request_ 对象提供的 _getBodyStream()_ 方法返回一个 _ByteBuf_ 对象的 _TransformablePublisher_。

从这个发布者，我们可以构建我们的处理管道：

```java
@Bean
public Action``<Chain>`` uploadFile() {

    return chain ->
        chain.post("upload", ctx -> {
            TransformablePublisher`<? extends ByteBuf>` pub = ctx.getRequest().getBodyStream();
            pub.subscribe(new Subscriber`<ByteBuf>`() {
                private Subscription sub;
                @Override
                public void onSubscribe(Subscription sub) {
                    this.sub = sub;
                    sub.request(1);
                }

                @Override
                public void onNext(ByteBuf t) {
                    try {
                        ... 对接收到的数据进行有用的操作
                        sub.request(1);
                    } finally {
                        // 切勿忘记释放！
                        t.release();
                    }
                }

                @Override
                public void onError(Throwable t) {
                    ctx.getResponse().status(500);
                }

                @Override
                public void onComplete() {
                    ctx.getResponse().status(202);
                }
            });
        });

}

```

在实现订阅者时需要注意几个细节。首先，我们必须确保在某个时候调用 _ByteBuf_ 的 _release()_ 方法。**不这样做将导致内存泄漏**。其次，任何异步处理必须只使用 Ratpack 的原语。这些包括 _Promise_、_Blocking_ 等类似的结构。

### 7.2. 发送数据流

发送数据流最直接的方式是使用 _Response.sendStream()_。这个方法接受一个 _ByteBuf_ 发布者参数，并将数据发送给客户端，根据需要应用背压以避免溢出它：

```java
@Bean
public Action``<Chain>`` download() {
    return chain ->
        chain.get("download", ctx -> {
            ctx.getResponse().sendStream(new RandomBytesPublisher(1024,512));
        });

}

```

尽管它很简单，但使用这种方法有一个缺点：**它不会自己设置任何头部，包括 _Content-Length_，这可能是客户端的问题：**

```shell
$ curl -v --output data.bin http://localhost:5050/download
... 省略请求消息
< HTTP/1.1 200 OK
< transfer-encoding: chunked
... 省略下载进度消息
```

**或者，更好的方法是使用 handle 的 _Context_ _render()_ 方法，传递一个 _ResponseChunks_ 对象**。在这种情况下，响应将使用 "chunked" 传输编码方法。创建 _ResponseChunks_ 实例最直接的方式是通过此类中可用的静态方法之一：

```java
@Bean
public Action``<Chain>`` downloadChunks() {
    return chain ->
        chain.get("downloadChunks", ctx -> {
            ctx.render(ResponseChunks.bufferChunks("application/octetstream",
              new RandomBytesPublisher(1024,512)));
        });

}

```

有了这个改变，响应现在