---
date: 2024-07-17
category:
  - Spring
  - Reactive Programming
tag:
  - WebClient
  - Flux
  - InputStream
head:
  - - meta
    - name: keywords
      content: Java, Reactive Programming, Spring, WebClient, Flux, InputStream
---

# 使用Spring Reactive WebClient将Flux`````````<DataBuffer>`````````读取为单个InputStream

在本教程中，我们将深入探讨Java响应式编程，以解决一个有趣的问题：如何将Flux`````````<DataBuffer>`````````读取为单个InputStream。

## 2. 请求设置
作为将Flux`````````<DataBuffer>`````````读取为单个InputStream问题的第一步，我们将使用Spring响应式WebClient进行GET请求。此外，我们可以使用由gorest.co.in托管的公共API端点进行此类测试场景：

```java
String REQUEST_ENDPOINT = "https://gorest.co.in/public/v2/users";
```

接下来，让我们定义getWebClient()方法以获取WebClient类的实例：

```java
static WebClient getWebClient() {
    WebClient.Builder webClientBuilder = WebClient.builder();
    return webClientBuilder.build();
}
```

此时，我们已准备好向/public/v2/users端点发出GET请求。然而，我们必须以Flux`````````<DataBuffer>`````````对象的形式获取响应体。因此，让我们继续阅读下一节关于BodyExtractors的内容，以实现这一目标。

## 3. BodyExtractors和DataBufferUtils
我们可以使用spring-webflux中BodyExtractors类提供的toDataBuffers()方法将响应体提取为Flux`````````<DataBuffer>`````````。

让我们继续创建body作为Flux`````````<DataBuffer>`````````类型的实例：

```java
Flux`````````<DataBuffer>````````` body = client
  .get(
  .uri(REQUEST_ENDPOINT)
    .exchangeToFlux( clientResponse -> {
        return clientResponse.body(BodyExtractors.toDataBuffers());
    }); 
```

接下来，由于我们需要将这些DataBuffer流收集到单个InputStream中，实现这一目标的一个好策略是使用PipedInputStream和PipedOutputStream。

此外，我们打算写入PipedOutputStream，最终从PipedInputStream读取。那么，让我们看看如何创建这两个连接的流：

```java
PipedOutputStream outputStream = new PipedOutputStream();
PipedInputStream inputStream = new PipedInputStream(1024*10);
inputStream.connect(outputStream);
```

我们必须注意，默认大小为1024字节。然而，我们预期从Flux`````````<DataBuffer>`````````收集的结果可能会超过默认值。因此，我们需要明确指定一个更大的大小值，这里的情况是1024*10。

最后，我们使用DataBufferUtils类中提供的write()实用方法将body作为发布者写入outputStream：

```java
DataBufferUtils.write(body, outputStream).subscribe();
```

我们必须注意，在声明时我们将inputStream连接到了outputStream。因此，我们可以从inputStream读取。让我们继续阅读下一节，看看这在实践中是如何工作的。

## 4. 从PipedInputStream读取
首先，让我们定义一个辅助方法readContent()，将InputStream作为String对象读取：

```java
String readContent(InputStream stream) throws IOException {
    StringBuffer contentStringBuffer = new StringBuffer();
    byte[] tmp = new byte[stream.available()];
    int byteCount = stream.read(tmp, 0, tmp.length);
    contentStringBuffer.append(new String(tmp));
    return String.valueOf(contentStringBuffer);
}
```

接下来，因为通常的做法是在不同的线程中读取PipedInputStream，让我们创建readContentFromPipedInputStream()方法，该方法内部生成一个新线程，通过调用readContent()方法将PipedInputStream中的内容读取为String对象：

```java
String readContentFromPipedInputStream(PipedInputStream stream) throws IOException {
    StringBuffer contentStringBuffer = new StringBuffer();
    try {
        Thread pipeReader = new Thread(() -> {
            try {
                contentStringBuffer.append(readContent(stream));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        pipeReader.start();
        pipeReader.join();
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    } finally {
        stream.close();
    }

    return String.valueOf(contentStringBuffer);
}
```

在这个阶段，我们的代码已经准备好用于模拟。让我们看看它在实践中是如何工作的：

```java
WebClient webClient = getWebClient();
InputStream inputStream = getResponseAsInputStream(webClient, REQUEST_ENDPOINT);
Thread.sleep(3000);
String content = readContentFromPipedInputStream((PipedInputStream) inputStream);
logger.info("response content: \n{}", content.replace("}", "}}\n"));
```

由于我们正在处理一个异步系统，我们在从流中读取之前任意延迟了3秒钟，以便我们能够看到完整的响应。此外，在记录时，我们插入了一个换行符，将长输出分解为多行。

最后，让我们验证代码执行生成的输出：

```plaintext
20:45:04.120 [main] INFO com.baeldung.databuffer.DataBufferToInputStream - response content:
[{"id":2642,"name":"Bhupen Trivedi","email":"bhupen_trivedi@renner-pagac.name","gender":"male","status":"active"}
,{"id":2637,"name":"Preity Patel","email":"patel_preity@abshire.info","gender":"female","status":"inactive"}
,{"id":2633,"name":"Brijesh Shah","email":"brijesh_shah@morar.co","gender":"male","status":"inactive"}
...
{"id":2623,"name":"Mohini Mishra","email":"mishra_mohini@hamill-ledner.info","gender":"female","status":"inactive"}
]
```

就是这样！看起来我们已经完全正确了。

## 5. 结论
在本文中，我们使用了管道流的概念以及BodyExtractors和DataBufferUtils类中提供的实用方法，将Flux`````````<DataBuffer>`````````读取为单个InputStream。

一如既往，本教程的完整源代码可在GitHub上获得。