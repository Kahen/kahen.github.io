---
date: 2024-06-26
category:
  - Java
  - 文件处理
tag:
  - Java
  - 文件搜索
  - 文件遍历
head:
  - - meta
    - name: keywords
      content: Java, 文件搜索, 目录遍历, 文件扩展名匹配
---
# 在Java中指定目录查找特定扩展名的文件

## 1. 引言

在本快速教程中，我们将看到使用核心Java和外部库来搜索目录（包括子目录）中匹配特定扩展名的文件的一些替代方案。我们将从简单的数组和列表到流和其他更新的方法。

## 2. 设置我们的过滤器

**由于我们需要按扩展名过滤文件，让我们从简单的_Predicate_实现开始。** 我们需要一点输入清理，以确保我们匹配大多数用例，比如接受以点开头或不以点开头的扩展名：

```java
public class MatchExtensionPredicate implements Predicate```````````<Path>``````````` {
    private final String extension;

    public MatchExtensionPredicate(String extension) {
        if (!extension.startsWith(".")) {
            extension = "." + extension;
        }
        this.extension = extension.toLowerCase();
    }

    @Override
    public boolean test(Path path) {
        if (path == null) {
            return false;
        }
        return path.getFileName()
          .toString()
          .toLowerCase()
          .endsWith(extension);
    }
}
```

我们首先编写构造函数，如果扩展名不包含点，则在其前面添加点。然后，我们将其转换为小写。这样，当我们将其与其他文件进行比较时，我们可以确保它们具有相同的情况。**最后，我们通过获取_Path_的文件名并将其转换为小写来实现_test()_。最重要的是，我们检查它是否以我们正在寻找的扩展名结尾。**

## 3. 使用_Files.listFiles()_遍历目录

我们的第一个示例将使用自Java诞生以来就存在的方法：_Files.listFiles()_。让我们首先实例化一个_List_来存储我们的结果，并列出目录中的所有文件：

```java
List```<File>``` find(File startPath, String extension) {
    List```<File>``` matches = new ArrayList<>();
    File[] files = startPath.listFiles();
    if (files == null) {
       return matches;
    }

    // ...
}
```

**listFiles()_本身不递归操作，所以对于每个项目，如果我们确定它是一个目录，我们开始递归：**

```java
MatchExtensionPredicate filter = new MatchExtensionPredicate(extension);
for (File file : files) {
    if (file.isDirectory()) {
        matches.addAll(find(file, extension));
    } else if (filter.test(file.toPath())) {
        matches.add(file);
    }
}

return matches;
```

我们还实例化了我们的_filter_，并且只有在当前文件通过我们的_test()_实现时，我们才将其添加到我们的列表中。**最终，我们将拥有所有匹配我们过滤器的结果。** 请注意，这可能导致目录树太深时的_StackOverflowError_，以及目录包含太多文件时的_OutOfMemoryError_。我们将在后面看到性能更好的选项。

## 4. 从Java 7开始使用_Files.walkFileTree()_遍历目录

从Java 7开始，我们有了NIO2 API。它包括许多实用程序，如_Files_类和使用_Path_类处理文件的新方法。**使用_walkFileTree()_允许我们毫不费力地递归遍历目录。** 这个方法只需要一个起始_Path_和一个_FileVisitor_实现：

```java
List```````````<Path>``````````` find(Path startPath, String extension) throws IOException {
    List```````````<Path>``````````` matches = new ArrayList<>();
    Files.walkFileTree(startPath, new SimpleFileVisitor```````````<Path>```````````() {

        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attributes) {
            if (new MatchExtensionPredicate(extension).test(file)) {
                matches.add(file);
            }
            return FileVisitResult.CONTINUE;
        }

        @Override
        public FileVisitResult visitFileFailed(Path file, IOException exc) {
            return FileVisitResult.CONTINUE;
        }
    });
    return matches;
}
```

_FileVisitor_包含几个事件的回调：进入目录前，离开目录后，访问文件时，以及这次访问失败时。**但是，使用_SimpleFileVisitor_，我们只需要实现我们感兴趣的回调。** 在这种情况下，它是使用_visitFile()_访问文件。所以，对于访问的每个文件，我们用我们的_Predicate_测试它，并将匹配的文件添加到列表中。

同时，我们实现了_visitFileFailed()_以始终返回_FileVisitResult.CONTINUE_。**这样，即使发生异常——比如访问被拒绝——我们也可以继续搜索文件。**

## 5. 从Java 8开始使用_Files.walk()_进行流式处理

Java 8包括了一种更简单的遍历目录的方式，它与_Stream_ API集成。这是我们的使用_Files.walk()_的方法：

```java
Stream```````````<Path>``````````` find(Path startPath, String extension) throws IOException {
    return Files.walk(startPath)
      .filter(new MatchExtensionPredicate(extension));
}
```

**不幸的是，这在抛出第一个异常时就会中断，目前还没有办法处理这个。** 所以，让我们尝试一种不同的方法。我们将首先实现一个包含Consumer```````````<Path>```````````的_FileVisitor_。**这次，我们将使用这个_Consumer_来处理我们的文件匹配，而不是将它们累积在一个_List_中：**

```java
public class SimpleFileConsumerVisitor extends SimpleFileVisitor```````````<Path>``````````` {

    private final Predicate```````````<Path>``````````` filter;
    private final Consumer```````````<Path>``````````` consumer;

    public SimpleFileConsumerVisitor(MatchExtensionPredicate filter, Consumer```````````<Path>``````````` consumer) {
        this.filter = filter;
        this.consumer = consumer;
    }

    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attributes) {
        if (filter.test(file)) {
            consumer.accept(file);
        }
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
        return FileVisitResult.CONTINUE;
    }
}
```

最后，让我们修改我们的_find()_方法来使用它：

```java
void find(Path startPath, String extension, Consumer```````````<Path>``````````` consumer) throws IOException {
    MatchExtensionPredicate filter = new MatchExtensionPredicate(extension);
    Files.walkFileTree(startPath, new SimpleFileConsumerVisitor(filter, consumer));
}
```

注意，我们不得不回到_Files.walkFileTree()_来使用我们的_FileVisitor_实现。

## 6. 使用Apache Commons IO的_FileUtils.iterateFiles()_

另一个有用的选项是Apache Commons IO的_FileUtils.iterateFiles()_，它返回一个_Iterator_。让我们包括它的依赖：

```xml
`<dependency>`
    `<groupId>`commons-io`</groupId>`
    `<artifactId>`commons-io`</artifactId>`
    `<version>`2.15.1`</version>`
`</dependency>`
```

**有了它的依赖，我们也可以像使用我们的_MatchExtensionPredicate_一样使用_WildcardFileFilter_：**

```java
Iterator```<File>``` find(Path startPath, String extension) {
    if (!extension.startsWith(".")) {
        extension = "." + extension;
    }
    return FileUtils.iterateFiles(
      startPath.toFile(),
      WildcardFileFilter.builder().setWildcards("*" + extension).get(),
      TrueFileFilter.INSTANCE);
}
```

我们的方法首先确保扩展名在预期的格式中。检查是否需要添加点使我们的方法可以工作，如果我们传递“.extension”或只是“extension”。

像其他方法一样，它只需要一个起始目录。但是，由于这是一个较旧的API，它需要一个_File_而不是_Path_。**最后一个参数是一个可选的目录过滤器。但是，如果没有指定，它将忽略子目录。** 所以，我们包括一个_TrueFileFilter.INSTANCE_以确保访问整个目录树。

## 7. 结论

在本文中，我们探讨了基于指定扩展名在目录及其子目录中搜索文件的各种方法。我们首先设置了一个灵活的扩展名匹配_Predicate_。然后，我们涵盖了从传统的_Files.listFiles()_和_Files.walkFileTree()_方法到Java 8中引入的更现代的替代方案，如_Files.walk()_。此外，我们还探索了使用Apache Commons IO的_FileUtils.iterateFiles()_的不同视角。

正如往常一样，源代码可在GitHub上找到。