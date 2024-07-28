---
date: 2024-07-29
category:
  - Java
  - OkHttp
tag:
  - Java
  - OkHttp
  - 文件下载
head:
  - - meta
    - name: keywords
      content: Java, OkHttp, 文件下载
---

# 使用OkHttp下载二进制文件

本文将提供一个实用示例，展示如何使用OkHttp库下载二进制文件。

## 2. Maven依赖

我们将首先添加基础库okhttp依赖：

```
``<dependency>``
    ``<groupId>``com.squareup.okhttp3``</groupId>``
    ``<artifactId>``okhttp``</artifactId>``
    ``<version>``5.0.0-alpha.12``</version>``
``</dependency>``
```

然后，**如果我们想为使用OkHttp库实现的模块编写集成测试，我们可以使用mockwebserver库**。这个库有模拟服务器及其响应的工具：

```
``<dependency>``
    ``<groupId>``com.squareup.okhttp3``</groupId>``
    ``<artifactId>``mockwebserver``</artifactId>``
    ``<version>``5.0.0-alpha.12``</version>``
    `<scope>`test`</scope>`
``</dependency>``
```

## 3. 请求二进制文件

我们将首先实现一个类，该类接收一个URL参数，用于下载文件，并为该URL创建并执行HTTP请求。

为了使类可测试，我们将在构造函数中**注入OkHttpClient和writer**：

```java
public class BinaryFileDownloader implements AutoCloseable {

    private final OkHttpClient client;
    private final BinaryFileWriter writer;

    public BinaryFileDownloader(OkHttpClient client, BinaryFileWriter writer) {
        this.client = client;
        this.writer = writer;
    }
}
```

接下来，我们将实现从URL下载文件的方法：

```java
public long download(String url) throws IOException {
    Request request = new Request.Builder().url(url).build();
    Response response = client.newCall(request).execute();
    ResponseBody responseBody = response.body();
    if (responseBody == null) {
        throw new IllegalStateException("响应不包含文件");
    }
    double length = Double.parseDouble(Objects.requireNonNull(response.header(CONTENT_LENGTH, "1")));
    return writer.write(responseBody.byteStream(), length);
}
```

下载文件的过程有四个步骤。使用URL创建请求。执行请求并接收响应。获取响应的主体，如果为_null_则失败。将响应主体的字节写入文件。

## 4. 将响应写入本地文件

为了将从响应中接收到的字节写入本地文件，我们将实现一个BinaryFileWriter类，该类**接受一个InputStream和一个OutputStream作为输入，并将InputStream中的内容复制到OutputStream中**。

OutputStream将注入到构造函数中，以便类可以可测试：

```java
public class BinaryFileWriter implements AutoCloseable {

    private final OutputStream outputStream;

    public BinaryFileWriter(OutputStream outputStream) {
        this.outputStream = outputStream;
    }
}
```

现在我们将实现将InputStream中的内容复制到OutputStream中的方法。该方法首先使用BufferedInputStream包装InputStream，以便我们可以一次读取更多的字节。然后我们准备一个数据缓冲区，用于临时存储来自InputStream的字节。

最后，我们将缓冲的数据写入OutputStream。我们这样做，只要InputStream有数据可读：

```java
public long write(InputStream inputStream) throws IOException {
    try (BufferedInputStream input = new BufferedInputStream(inputStream)) {
        byte[] dataBuffer = new byte[CHUNK_SIZE];
        int readBytes;
        long totalBytes = 0;
        while ((readBytes = input.read(dataBuffer)) != -1) {
            totalBytes += readBytes;
            outputStream.write(dataBuffer, 0, readBytes);
        }
        return totalBytes;
    }
}
```

## 5. 获取文件下载进度

在某些情况下，我们可能想要告诉用户文件下载的进度。

我们首先需要创建一个函数式接口：

```java
public interface ProgressCallback {
    void onProgress(double progress);
}
```

然后，我们将在BinaryFileWriter类中使用它。这将使我们在每一步都能得到下载器迄今为止写入的总字节数。

首先，我们将**将ProgressCallback作为writer类的字段添加**。然后，我们将更新write方法，使其**接收响应的长度作为参数**。这将帮助我们计算进度。

然后，我们将使用从到目前为止写入的_totalBytes_和_length_计算出的进度调用_onProgress_方法：

```java
public class BinaryFileWriter implements AutoCloseable {
    private final ProgressCallback progressCallback;
    public long write(InputStream inputStream, double length) {
        //...
        progressCallback.onProgress(totalBytes / length * 100.0);
    }
}
```

最后，我们将更新BinaryFileDownloader类，以**使用总响应长度调用write方法**。我们将从_Content-Length_头中获取响应长度，然后将其传递给write方法：

```java
public class BinaryFileDownloader {
    public long download(String url) {
        double length = getResponseLength(response);
        return write(responseBody, length);
    }
    private double getResponseLength(Response response) {
        return Double.parseDouble(Objects.requireNonNull(response.header(CONTENT_LENGTH, "1")));
    }
}
```

## 6. 结论

在本文中，我们实现了一个简单而实用的示例，展示了**如何使用OkHttp库从URL下载二进制文件**。

有关文件下载应用程序的完整实现以及单元测试，请查看GitHub上的项目。