---
date: 2022-04-01
category:
  - Spring WebFlux
  - WebClient
tag:
  - Spring
  - WebClient
  - Large File
head:
  - - meta
    - name: keywords
      content: Spring, WebFlux, WebClient, Large File Streaming
------
# 使用WebClient流式传输大型字节数组到文件

## 1. 引言

在本快速教程中，我们将使用_WebClient_从服务器流式传输一个大型文件。为了说明，我们将创建一个简单的控制器和两个客户端。**最终，我们将学习如何以及何时使用Spring的_DataBuffer_和_DataBufferUtils_。**

## 2. 我们的场景与简单服务器

**我们将从一个简单的控制器开始，用于下载任意文件。** 首先，我们将构建一个_FileSystemResource_，传递一个文件_Path_，然后将其作为响应实体(ResponseEntity)的主体包装起来：

```java
@RestController
@RequestMapping("/large-file")
public class LargeFileController {

    @GetMapping
    ResponseEntity`<Resource>` get() {
        return ResponseEntity.ok()
          .body(new FileSystemResource(Paths.get("/tmp/large.dat")));
    }
}
```

其次，我们需要生成我们引用的文件。**由于内容对于理解本教程并不关键，我们将使用_fallocate_在磁盘上预留指定大小而不写入任何内容。** 因此，让我们通过运行此命令来创建我们的大文件：

```shell
fallocate -l 128M /tmp/large.dat
```

最后，我们有一个客户端可以下载的文件。所以我们准备开始编写我们的客户端。

## 3. 使用_ExchangeStrategies_的_WebClient_处理大型文件

我们将从一个简单但有限的_WebClient_开始下载我们的文件。**我们将使用_ExchangeStrategies_来提高_exchange()_操作可用的内存限制。** 这样，我们可以操作更多的字节，但我们仍然受限于JVM可用的最大内存。让我们使用_bodyToMono()_从服务器获取一个_Mono``<byte[]>``_：

```java
public class LimitedFileDownloadWebClient {

    public static long fetch(WebClient client, String destination) {
        Mono``<byte[]>`` mono = client.get()
          .retrieve()
          .bodyToMono(byte[].class);

        byte[] bytes = mono.block();

        Path path = Paths.get(destination);
        Files.write(path, bytes);
        return bytes.length;
    }

    // ...
}
```

换句话说，**我们正在将整个响应内容检索到一个_byte[]_中。** 之后，我们将这些字节写入我们的_path_并返回下载的字节数。让我们创建一个_main()_方法来测试它：

```java
public static void main(String... args) {
    String baseUrl = args[0];
    String destination = args[1];

    WebClient client = WebClient.builder()
      .baseUrl(baseUrl)
      .exchangeStrategies(useMaxMemory())
      .build();

    long bytes = fetch(client, destination);
    System.out.printf("downloaded %d bytes", bytes);
}
```

此外，我们需要两个参数：下载URL和一个_destination_来本地保存它。**为了避免在_客户端_中出现_DataBufferLimitException_，让我们配置一个交换策略来限制可加载到内存中的字节数。** 而不是定义一个固定的大小，我们将使用_Runtime_获取为我们的应用程序配置的总内存。**注意，这并不推荐，只是为了演示目的：**

```java
private static ExchangeStrategies useMaxMemory() {
    long totalMemory = Runtime.getRuntime().maxMemory();

    return ExchangeStrategies.builder()
      .codecs(configurer -> configurer.defaultCodecs()
        .maxInMemorySize((int) totalMemory)
      )
      .build();
}
```

为了澄清，交换策略自定义了我们的_客户端_处理请求的方式。在这种情况下，我们使用构建器的_codecs()_方法，所以我们不会替换任何默认设置。

### 3.1. 使用内存调整运行我们的客户端

随后，我们将我们的项目打包为jar到_/tmp/app.jar_，并在_localhost:8081_上运行我们的服务器。然后，让我们定义一些变量，并从命令行运行我们的客户端：

```shell
limitedClient='com.baeldung.streamlargefile.client.LimitedFileDownloadWebClient'
endpoint='http://localhost:8081/large-file'
java -Xmx256m -cp /tmp/app.jar $limitedClient $endpoint /tmp/download.dat
```

**注意我们允许我们的应用程序使用两倍于我们的128M文件大小的内存。** 的确，我们将下载我们的文件，并得到以下输出：

```shell
downloaded 134217728 bytes
```

另一方面，**如果我们没有分配足够的内存，我们将得到一个_OutOfMemoryError_：**

```shell
$ java -Xmx64m -cp /tmp/app.jar $limitedClient $endpoint /tmp/download.dat
reactor.netty.ReactorNetty$InternalNettyException: java.lang.OutOfMemoryError: Direct buffer memory
```

这种方法不依赖于Spring核心实用程序。但是，它是有限的，因为我们不能下载任何接近我们应用程序最大内存大小的文件。

## 4. 使用_DataBuffer_的_WebClient_处理任何文件大小

**更安全的方法是使用_DataBuffer_和_DataBufferUtils_以块的形式流式传输我们的下载，这样整个文件就不会被加载到内存中。** 然后，这次，我们将使用_bodyToFlux()_检索一个_Flux``<DataBuffer>``_，将其写入我们的_path_，并以字节为单位返回其大小：

```java
public class LargeFileDownloadWebClient {

    public static long fetch(WebClient client, String destination) {
        Flux``<DataBuffer>`` flux = client.get()
          .retrieve()
          .bodyToFlux(DataBuffer.class);

        Path path = Paths.get(destination);
        DataBufferUtils.write(flux, path)
          .block();

        return Files.size(path);
    }

    // ...
}
```

**最后，让我们编写main方法来接收我们的参数，创建一个_WebClient_，并获取我们的文件：**

```java
public static void main(String... args) {
    String baseUrl = args[0];
    String destination = args[1];

    WebClient client = WebClient.create(baseUrl);

    long bytes = fetch(client, destination);
    System.out.printf("downloaded %d bytes", bytes);
}
```

就是这样。**这种方法更加通用，因为我们不依赖于文件或内存大小。** 让我们将最大内存设置为我们文件大小的四分之一，并使用前面相同的_endpoint_运行它：

```shell
client='com.baeldung.streamlargefile.client.LargeFileDownloadWebClient'
java -Xmx32m -cp /tmp/app.jar $client $endpoint /tmp/download.dat
```

最后，即使我们的应用程序的总内存小于我们的文件大小，我们也会得到一个成功的输出：

```shell
downloaded 134217728 bytes
```

## 5. 结论

在本文中，我们学习了使用_WebClient_下载任意大型文件的不同方式。首先，我们学习了如何定义我们的_WebClient_操作可用的内存量。然后，我们看到了这种方法的缺点。**最重要的是，我们学习了如何使我们的客户端高效地使用内存。**

如常，源代码可在GitHub上获得。