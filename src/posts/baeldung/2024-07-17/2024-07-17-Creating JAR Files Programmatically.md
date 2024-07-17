---
date: 2022-04-01
category:
  - Java
  - JAR文件
tag:
  - Java
  - JAR文件
  - 编程
head:
  - - meta
    - name: keywords
      content: Java, JAR文件, 编程
------
# 程序化创建JAR文件

## **1. 引言**

在这篇文章中，我们将介绍如何程序化地创建jar文件。在编写软件时，我们最终需要将其部署到生产状态。在某些情况下，使用类路径和单独的文件是可以接受的。通常，处理单个文件更为方便。在Java中，标准的方法是使用JAR、WAR或EAR文件。

**基本过程是编写清单文件，打开jar文件，添加内容，最后关闭jar文件。**

## **2. JAR文件的解剖**

jar文件是ZIP文件格式的扩展，包含了一个清单文件。清单文件是特定于JAR文件的特殊文件，可能包含各种设置。其中一些是主类、可选数据（例如，作者、版本等）和代码签名信息。

**我们可以使用与zip兼容的工具，如WinRar，来查看和提取归档中的一些或全部文件。** 我们还可以包括一个jars或libs子目录，用于包含依赖的jar文件。由于jar是zip文件的扩展，我们可以包含任何文件或目录。

为了简化创建JAR文件的过程，我们创建了一个单一的、普通的Java对象（POJO）类，封装了我们的操作。我们可以包括将条目放入清单文件、创建JAR文件、添加文件或目录。

我们还可以创建方法来从JAR中删除条目，甚至将条目追加到现有的JAR中，尽管这些操作需要完全读取和重写JAR。

### **3.1. JAR清单**

为了创建一个JAR文件，我们首先必须开始编写清单：

```java
public class JarTool {
    private Manifest manifest = new Manifest();

    public void startManifest() {
        manifest.getMainAttributes().put(Attributes.Name.MANIFEST_VERSION, "1.0");
    }
}
```

如果我们希望jar可执行，我们必须设置主类：

```java
public void setMainClass(String mainFQCN) {
    if (mainFQCN != null && !mainFQCN.equals("")) {
        manifest.getMainAttributes().put(Attributes.Name.MAIN_CLASS, mainFQCN);
    }
}
```

此外，如果我们想指定其他属性，我们可以将它们添加到清单中，例如：

```java
addToManifest("Can-Redefine-Classes", "true");
```

这里是该方法：

```java
public void addToManifest(String key, String value) {
    manifest.getMainAttributes().put(new Attributes.Name(key), value);
}
```

### **3.2. 打开Jar进行写入**

清单完成后，我们现在可以将条目写入JAR文件。为此，我们首先必须打开jar：

```java
public JarOutputStream openJar(String jarFile) throws IOException {
    return new JarOutputStream(new FileOutputStream(jarFile), manifest);
}
```

### **3.3. 向Jar添加文件**

在向JAR添加文件时，Java使用Solaris风格的文件名，使用正斜杠作为分隔符（/）。注意，**我们可以添加任何类型的文件**，包括其他JAR文件或空目录。这对于包含依赖项非常有用。

另外，因为JAR文件是类路径的一种形式，**我们必须指定我们希望在JAR内部使用绝对路径的哪一部分**。对我们来说，根路径将是我们项目的类路径。

理解这一点后，我们现在可以完成我们的_JarTool_类，用这个方法：

```java
public void addFile(JarOutputStream target, String rootPath, String source)
  throws FileNotFoundException, IOException {
    String remaining = "";
    if (rootPath.endsWith(File.separator)) {
        remaining = source.substring(rootPath.length());
    } else {
        remaining = source.substring(rootPath.length() + 1);
    }
    String name = remaining.replace("\\", "/");
    JarEntry entry = new JarEntry(name);
    entry.setTime(new File(source).lastModified());
    target.putNextEntry(entry);

    BufferedInputStream in = new BufferedInputStream(new FileInputStream(source));
    byte[] buffer = new byte[1024];
    while (true) {
        int count = in.read(buffer);
        if (count == -1) {
            break;
        }
        target.write(buffer, 0, count);
    }
    target.closeEntry();
    in.close();
}
```

## **4. 一个工作示例**

为了演示可执行jar的最低要求，我们将编写一个应用程序类，然后看看它是如何工作的：

```java
public class Driver {
    public static void main(String[] args) throws IOException {
        JarTool tool = new JarTool();
        tool.startManifest();
        tool.addToManifest("Main-Class", "com.baeldung.createjar.HelloWorld");

        JarOutputStream target = tool.openJar("HelloWorld.jar");

        tool.addFile(target, System.getProperty("user.dir") + "\\src\\main\\java",
          System.getProperty("user.dir") + "\\src\\main\\java\\com\\baeldung\\createjar\\HelloWorld.class");
        target.close();
    }
}
```

HelloWorld类是一个非常简单的类，只有一个main()方法，打印出文本：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

为了演示它的工作，我们有这个示例：

```bash
$ javac -cp src/main/java src/main/java/com/baeldung/createjar/HelloWorld.java
$ javac -cp src/main/java src/main/java/com/baeldung/createjar/JarTool.java
$ javac -cp src/main/java src/main/java/com/baeldung/createjar/Driver.java
$ java -cp src/main/java com/baeldung/createjar/Driver
$ java -jar HelloWorld.jar
Hello World!
```

在这里，我们编译了每个类，然后执行了_Driver_类，这将创建_HelloWorld_ jar。最后，我们执行了jar，结果打印出“Hello World”消息。

上述命令应从项目位置执行。

## **5. 结论**

在本教程中，我们看到了如何程序化地创建一个jar文件，向其中添加文件，最后执行它。

当然，代码也可以在GitHub上找到。