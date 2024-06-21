---
date: 2024-06-21
category:
  - Java
  - Serialization
tag:
  - FlatBuffers
  - Tutorial
head:
  - - meta
    - name: keywords
      content: Java, FlatBuffers, Serialization, Tutorial, Google, Cross-platform, Game Development
---

# Java中使用FlatBuffers进行序列化

在这个教程中，我们将探索Java中的FlatBuffers，并使用它进行序列化和反序列化操作。

序列化是将Java对象转换为可以在网络上传输或在文件中持久化的字节流的过程。Java通过_java.io.Serializable_接口以及_java.io.ObjectOutputStream_和_java.io.ObjectInputStream_类提供了内置的对象序列化机制。

然而，由于它在处理复杂对象图和依赖类时的方法复杂，以及一些其他缺点，Java中有几种库可用于序列化和反序列化。

一些广泛使用的Java序列化库包括Jackson和Gson。一个较新的Java对象序列化格式标准是Protocol Buffers。Protocol Buffers是由Google开发的一种与语言无关的二进制序列化格式。它们在高性能环境和分布式系统中使用，其中效率和互操作性至关重要。

FlatBuffers是由Google开发的高效跨平台序列化库。它支持多种语言，如C、C++、Java、Kotlin和Go。FlatBuffers是为游戏开发而创建的；因此，性能和低内存开销在设计中是默认考虑的因素。

FlatBuffers和Protocol Buffers都是由Google创建的，并且是非常相似的基于二进制的数据格式。这两种格式都支持高效的高速序列化和反序列化。主要的区别在于FlatBuffers在访问之前不需要将数据解包到中间数据结构。

一个完整的FlatBuffers实现包括以下组件：

- 一个FlatBuffer模式文件
- 一个_flatc_编译器
- 序列化和反序列化代码

FlatBuffer模式文件作为我们将要使用的的数据模型结构的模板。模式文件的语法遵循类似于C类型或其他接口描述语言（IDL）格式的模式。我们需要定义模式和_flatc_编译器，然后编译模式文件。

FlatBuffer是一个包含嵌套对象（如结构体、表和向量）的二进制缓冲区，这些对象使用偏移量进行组织。

这种安排允许数据在原地遍历，类似于传统的基于指针的数据结构。然而，与许多内存中的数据结构不同，FlatBuffers严格遵循对齐和字节序（始终是小端）的规则，确保跨平台兼容性。此外，对于表对象，FlatBuffers提供了向前和向后的兼容性。

FlatBuffers中的表是用于表示具有命名字段的复杂结构的最基本数据结构。表类似于某些语言中的类或结构体，并支持多种类型的字段，如int、short、string、结构体、向量甚至其他表。

_flatc_编译器是FlatBuffers提供的关键工具，它根据模式生成各种编程语言的代码，如C++和Java，以帮助根据模式序列化和反序列化数据。这个编译器输入模式定义，并生成所需编程语言的代码。

在接下来的部分中，我们将编译我们的模式文件以生成代码。但是，我们需要首先构建并设置我们的编译器才能使用它。

我们首先将_flatbuffers_库克隆到我们的系统中：

```shell
$ git clone https://github.com/google/flatbuffers.git
```

一旦创建了_flatbuffers_目录，我们使用_cmake_将库构建为可执行文件。CMake（跨平台Make）是一个开源的、平台独立的构建系统，旨在自动化构建软件项目的过程：

```shell
$ cd flatbuffers
$ mkdir build
$ cd build
$ cmake ..
```

这完成了_flatc_编译器的构建过程。我们可以通过打印版本来验证安装是否成功：

```shell
$ ./flatc --version
flatc version 23.5.26
```

编译后的文件现在存储在_flatbuffers/build_路径下，_flatc_可执行文件也在同一个目录中。我们将使用此文件构建所有模式文件，因此我们可以为此路径创建一个快捷方式或别名。

在本节中，我们将通过实现我们的用例来探索FlatBuffers库。假设我们正在开发一个跨越不同地形的游戏，如海洋、山脉和平原。每种地形都有其独特的属性。

地形信息对于加载游戏级别并将其通过网络传输给玩家是必要的。高效的序列化和反序列化是必需的。

我们将从定义我们的地形模式类型开始。在_flatbuffer_中，地形是一个表。它可以有许多属性，如名称（Sea, Land, Mountain, Desert等）、颜色和位置（以3D向量坐标的形式）。地形也可以应用效果。例如，沙漠中可能有沙尘暴或陆地上的洪水。效果可以是原始模式中的一个单独的表。

有了这个理解，让我们按照以下方式编写我们的模式：

```flatbuffers
namespace MyGame.baeldung;
enum Color:byte { Brown = 0, Red = 1, Green = 2, Blue = 3, White = 4 }
struct Vec3 {
  x:float;
  y:float;
  z:float;
}
table Terrain {
  pos:Vec3; // Struct.
  name:string;
  color:Color = Blue;
  navigation: string;
  effects: [Effect]
}

table Effect {
  name:string;
  damage:short;
}

root_type Terrain;
```

我们有一个用于标识地形颜色的枚举，一个用于坐标的结构体，以及两个表，Terrain和Effect，其中Terrain是根类型。

_flatc_编译器已经准备好了，我们使用它来编译我们的模式文件_terrain.fbs_：

```shell
$ cd `<path to schema>`
$ flatc --java terrain.fbs
```

我们应该注意到，_flatc_路径可能因系统而异，这取决于前一节中描述的安装位置。

我们的模式已经编译好了，准备就绪。我们可以开始使用模式为我们的游戏创建一些地形。作为这个示例演示的一部分，我们将为地形创建一个沙漠地形和一些效果。

要在Java中使用FlatBuffers，我们需要添加一个Maven依赖项：

```xml
`<dependency>`
    `<groupId>`com.google.flatbuffers`</groupId>`
    `<artifactId>`flatbuffers-java`</artifactId>`
    `<version>`23.5.26`</version>`
`</dependency>`
```

我们现在可以导入_flatbuffers_库以及我们模式生成的文件：

```java
import MyGame.terrains.*;
import com.google.flatbuffers.FlatBufferBuilder;
```

作为编译过程的一部分生成的文件位于模式的_namespace_部分定义的相同路径下（在我们的例子中是_MyGame_）。

由于编译，我们现在可以使用一个_Effect_类，该类提供了一个_createEffect()_方法。我们将使用它来创建我们想要的效果。我们首先创建一个初始缓冲区大小为1024字节的构建器对象：

```java
FlatBufferBuilder builder = new FlatBufferBuilder(INITIAL_BUFFER);

int sandstormOffset = builder.createString("sandstorm");
short damage = 3;
int sandStorm = MyGame.terrains.Effect.createEffect(builder, sandstormOffset, damage);
```

我们可以以相同的方式添加更多效果。

接下来，我们创建我们的沙漠地形。让我们为地形分配一个颜色，并给它一个名称和它的导航位置：

```java
byte color = MyGame.terrains.Color.YELLOW;
int terrainName = builder.createString("Desert");
int navigationName = builder.createString("south");
```

我们使用_Terrain_类的自动生成的静态方法添加更多的地形元数据和效果：

```java
int effectOffset = MyGame.terrains.Terrain.createEffectsVector(builder, effects);

startTerrain(builder);
addName(builder, terrainName);
addColor(builder, color);
addNavigation(builder, navigationName);
addEffects(builder, effectOffset);
int desert = endTerrain(builder);
builder.finish(desert);
```

现在让我们序列化我们的地形及其效果到我们的_flatbuffer_。我们可以存储缓冲区或将其通过网络传输给客户端：

```java
ByteBuffer buf = builder.dataBuffer();
```

让我们反序列化_flatbuffer_对象并访问地形。我们将从一个由缓冲区创建的序列化字节数组开始，并将转换为_ByteBuffer_缓冲区：

```java
ByteBuffer buf = java.nio.ByteBuffer.wrap(buffer);
```

这允许我们从缓冲区获取根_Terrain_对象的访问器，并访问其所有属性：

```java
Terrain myTerrain = Terrain.getRootAsTerrain(buf)
Assert.assertEquals(terrain.name(), "Desert");
Assert.assertEquals(terrain.navigation(), "south");
```

编译器生成的代码显示，每个实体的属性都有一个相关的访问器。我们也可以访问相关的效果：

```java
Effect effect1 = terrain.effectsVector().get(0);
Effect effect2 = terrain.effectsVector().get(2);
Assert.assertEquals(effect1.name(), "Sandstorm");
Assert.assertEquals(effect2.name(), "Drought");
```

FlatBuffers主要是只读的，这是由于它们的静态模板结构。然而，我们可能会遇到需要在将_flatbuffer_发送到另一段代码之前更改其中某些内容的情况。假设我们想要将沙尘暴效果的损害分数从现有的3更新为10。

在这种情况下，_flatbuffers_的就地变异就派上用场了。

只有在我们使用_–gen-mutable_参数构建模式时，_flatbuffer_的变异才是可能的：

```shell
$ ./../flatc --gen-mutable --java terrain.fbs
```

这为我们提供了所有访问器上的_mutate()_方法，我们可以使用它来就地修改_flatbuffer_