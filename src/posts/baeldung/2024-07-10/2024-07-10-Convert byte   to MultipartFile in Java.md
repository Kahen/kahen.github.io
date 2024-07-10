---
date: 2022-04-01
category:
  - Java
tag:
  - MultipartFile
  - byte array
head:
  - - meta
    - name: keywords
      content: Java, MultipartFile, byte array, Spring, 文件上传
---
# Java中将字节数组转换为MultipartFile

在本教程中，我们将探讨如何将字节数组转换为MultipartFile。

MultipartFile是Spring提供的接口，用于接收多个请求块中的文件，因此我们需要一些实现来实例化一个MultipartFile对象。Spring没有为代码提供任何默认实现，但它确实提供了一个用于测试目的的实现。

### 2. 实现MultipartFile接口

让我们为我们自己的MultipartFile接口创建实现，并包装输入的字节数组：

```java
public class CustomMultipartFile implements MultipartFile {

    private byte[] input;

    @Override
    public String getName() {
        return null;
    }

    @Override
    public String getOriginalFilename() {
        return null;
    }

    @Override
    public String getContentType() {
        return null;
    }
    //我们在下一个代码片段中定义了其余的接口方法
}
```

**我们在类中定义了一个字节数组属性，以便我们可以捕获输入的值。** 此外，我们已经覆盖了上面的接口方法，这些方法取决于实现细节。因此，文件名或内容类型的详细信息可以作为自定义逻辑提供。结果，我们在这里返回了_null_。

我们还为我们类中所需的其他接口方法提供了自己的实现：

```java
public class CustomMultipartFile implements MultipartFile {

    //之前的方法
    @Override
    public boolean isEmpty() {
        return input == null || input.length == 0;
    }

    @Override
    public long getSize() {
        return input.length;
    }

    @Override
    public byte[] getBytes() throws IOException {
        return input;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream(input);
    }

    @Override
    public void transferTo(File destination) throws IOException, IllegalStateException {
        try(FileOutputStream fos = new FileOutputStream(destination)) {
            fos.write(input);
        }
    }
}
```

这些方法可能不需要任何自定义逻辑，因此我们已经在类中定义了它们。有几种不同的方法可以实现_transferTo(File destination)_方法。让我们在下面看看其中的一些：

我们可以使用Java NIO：

```java
@Override
public void transferTo(File destination) throws IOException, IllegalStateException {
    Path path = Paths.get(destination.getPath());
    Files.write(path, input);
}
```

另一个选择是添加Apache commons IO依赖到我们的POM并使用_FileUtils_类：

```java
@Override
public void transferTo(File destination) throws IOException, IllegalStateException {
    FileUtils.writeByteArrayToFile(destination, input);
}
```

**_transferTo(File destination)_方法在_MultipartFile_只需要写入到_File_时非常有用**，并且有几种方法可以将_MultipartFile_写入到_File_。

现在我们已经定义了我们的类，让我们用一个小型测试用例来测试这个实现：

```java
@Test
void whenProvidingByteArray_thenMultipartFileCreated() throws IOException {
    byte[] inputArray = "Test String".getBytes();
    CustomMultipartFile customMultipartFile = new CustomMultipartFile(inputArray);
    Assertions.assertFalse(customMultipartFile.isEmpty());
    Assertions.assertArrayEquals(inputArray, customMultipartFile.getBytes());
    Assertions.assertEquals(inputArray.length,customMultipartFile.getSize());
}
```

**我们已经成功地将我们的字节数组转换为上面的测试用例中的MultipartFile实例。**

### 3. MockMultipartFile

Spring提供了MockMultipartFile用于测试目的，以访问Multipart请求。

让我们创建一个测试来看看它是如何工作的：

```java
@Test
void whenProvidingByteArray_thenMockMultipartFileCreated() throws IOException {
    byte[] inputArray = "Test String".getBytes();
    MockMultipartFile mockMultipartFile = new MockMultipartFile("tempFileName",inputArray);
    Assertions.assertFalse(mockMultipartFile.isEmpty());
    Assertions.assertArrayEquals(inputArray, mockMultipartFile.getBytes());
    Assertions.assertEquals(inputArray.length,mockMultipartFile.getSize());
}
```

我们已经成功地使用了Spring提供的MockMultipartFile对象将字节数组转换为MultipartFile对象。

### 4. 结论

在本教程中，我们涵盖了如何将字节数组转换为MultipartFile对象。

和往常一样，所有的代码示例都可以在GitHub上找到。