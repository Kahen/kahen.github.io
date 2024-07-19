---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - Java编译
  - 命令行
head:
  - - meta
    - name: keywords
      content: Java, 编译, 命令行, 多文件
---

# 使用命令行编译多个Java源文件

在本教程中，我们将学习如何通过命令行界面与Java编译器进行交互。

作为先决条件，我们需要在机器上下载Java并配置JAVA_HOME环境变量。

### 2. 编译单个Java源代码文件

Java提供了一个简单的工具——javac，用于编译Java源代码文件。让我们从编译一个小类Car.java开始：

```java
public class Car {
    private String make;
    private String model;

    // 标准setter和getter方法
}
```

我们可以在包含此文件的目录中使用以下单个命令进行编译：

```shell
javac Car.java
```

如果一切顺利，没有错误，将不会有任何输出。编译器将在当前工作目录中创建Car.class，其中包含字节码。

### 3. 编译多个源代码文件

通常，我们的程序使用不止一个类文件。现在，让我们看看如何编译一个包含多个类的简单程序。

首先，我们添加两个新类型，Owner.java和History.java：

```java
public class Car {
    private String make;
    private String model;
    private Owner owner;
    private History history;
}

public class Owner {
    private String name;
}

public class History {
    private String details;
}
```

现在，我们需要运行以下命令进行编译：

```shell
javac Owner.java Car.java History.java
```

**我们应该注意，由于Car类使用的类位于同一目录中，实际上无论我们是否指定它们都是可选的。** 我们仍然可以只编译Car.java。

### 4. 必要的Java编译器选项

到目前为止，我们只是使用了javac命令，没有使用任何额外的选项，只是将类名作为参数传递。然而，我们也可以自定义它。我们可以告诉Java编译器在哪里找到我们的库类，我们的代码的基本路径在哪里，以及最终结果的生成位置。

让我们更仔细地看看其中的一些选项。

- -cp或-classpath
- -sourcepath
- -d（目录）

#### 4.1. -cp或-classpath选项是什么？

使用类路径，我们可以定义一组目录或文件，例如*.jar，*.zip，这些是我们的源代码在编译期间依赖的。或者，我们可以设置CLASSPATH环境变量。

我们应该注意到**类路径选项比环境变量具有更高的优先级**。

如果两者都没有指定，那么类路径被假定为当前目录。当我们希望指定多个目录时，路径分隔符对于大多数操作系统是‘:’，而在Windows上是‘;’。

#### 4.2. -sourcepath选项是什么？

此选项使我们能够指定所有需要编译的源代码所在的顶级目录。

如果没有指定，类路径将被扫描以查找源代码。

#### 4.3. -d选项是什么？

当我们希望将所有编译结果放在一个地方，与源代码分开时，我们使用此选项。**我们需要记住，我们想要指定的路径必须事先存在**。

在编译期间，此路径被用作根目录，并根据类的包结构自动创建子文件夹。如果没有指定此选项，每个*.class文件将被写入其对应的源代码*.java文件旁边。

### 5. 使用外部库进行编译

除了我们创建的类之外，我们的程序还需要使用外部库。现在，让我们看看一个更复杂的例子：

```
libs/
├─ guava-31.1-jre.jar
model/
├─ Car.java
├─ History.java
├─ Owner.java
service/
├─ CarService.java
target/
```

这里，我们将类组织成包。此外，我们引入了target和libs目录，分别放置编译结果和库。

假设我们想使用Guava库提供的ImmutableSet类。我们下载并将其放在libs文件夹下。然后，在service包下，我们在CarService.java中引入了一个使用外部库的新类：

```java
package service;

import model.Car;
import java.util.Set;

import com.google.common.collect.ImmutableSet;

public class CarService {

    public Set```<Car>``` getCars() {

        Car car1 = new Car();
        Car car2 = new Car();

        ImmutableSet```<Car>``` cars = ImmutableSet.```<Car>```builder()
          .add(car1)
          .add(car2)
          .build();
        return cars;
    }
}
```

现在，是时候编译我们的项目了：

```shell
javac -classpath libs/*:. -d target -sourcepath . service/CarService.java model/*.java
```

我们已经使用-cp将libs文件夹包含在我们的类路径中。

```
libs/
├─ guava-31.1-jre.jar
model/
├─ Car.class
├─ History.class
├─ Owner.class
service/
├─ CarService.class
target/
├─ model/
│   ├─ Car.class
│   ├─ History.class
│   ├─ Owner.class
├─ service/
│   ─ CarService.class
```

正如我们所看到的，javac成功解析了外部的ImmutableSet类，并将编译后的类放置在target文件夹中。

### 6. 结论

在本文中，我们学习了如何编译多个源代码文件，即使我们有对外部库的依赖。

此外，我们还快速查看了在复杂编译任务中可以利用的一些基本选项。