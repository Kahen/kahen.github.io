---
date: 2024-06-19
category:
  - Spring
  - Java
tag:
  - Gson
  - Polymorphism
head:
  - - meta
    - name: keywords
      content: Java, Gson, Polymorphism, JSON, Serialization, Deserialization
---

# Gson中的多态性

在本教程中，我们将探讨如何使用Gson处理多态性。我们还将探索一些处理多态性序列化和反序列化的技巧。

## 2. JSON中的多态性

Java中的多态性是众所周知的。我们有一个类层次结构，适当的时候，我们可以以某些方式将不同但相关的类型视为相同。

例如，我们可能有一些二维形状的定义。不同形状的定义方式各不相同，但它们都有一些共同的特征——例如，它们都可以计算面积。

因此，我们可以定义一些多态类来定义一些形状：

```java
interface Shape {
    double getArea();
}

class Circle implements Shape {
    private final double radius;
    private final double area;

    Circle(double radius) {
        this.radius = radius;
        this.area = Math.PI * radius * radius;
    }

    @Override
    public double getArea() {
        return area;
    }
}

class Square implements Shape {
    private final double side;
    private final double area;

    Square(double side) {
        this.side = side;
        this.area = side * side;
    }

    @Override
    public double getArea() {
        return area;
    }
}
```

这些形状各自有自己的特点，但如果我们只关它们都是_Shape_并且我们可以计算它们的面积，我们可以将它们全部视为相同。

但这与JSON有什么关系呢？**我们显然不能在JSON文档中拥有功能，但我们可以有重叠的数据，我们可能希望以一种合理的方式在JSON中表示多态类。**

例如，上述形状可能被表示为：

```json
[
    {
        "shape": "circle",
        "radius": 4,
        "area": 50.26548245743669
    }, {
        "shape": "square",
        "side": 5,
        "area": 25
    }
]
```

如果我们想简单地将它们视为_Shape_实例，我们已经拥有了可用的_area_。然而，如果我们想知道它们确切的形状，那么我们可以识别这一点，并从它们中提取额外的信息。

## 3. 使用包装对象

**解决这个问题的最简单方法是使用一个包装对象，并为我们的每种类型使用不同的字段**：

```java
class Wrapper {
    private final Circle circle;
    private final Square square;

    Wrapper(Circle circle) {
        this.circle = circle;
        this.square = null;
    }

    Wrapper(Square square) {
        this.square = square;
        this.circle = null;
    }
}
```

使用这样的方式，我们的JSON将看起来像：

```json
[
    {
        "circle": {
            "radius": 4,
            "area": 50.26548245743669
        }
    }, {
        "square": {
            "side": 5,
            "area": 25
        }
    }
]
```

这不是技术上的多态，这意味着JSON的形状与我们之前看到的不同，但这非常容易实现。特别是，我们只需要编写我们的包装类型，Gson将自动为我们做所有事情：

```java
List``<Wrapper>`` shapes = Arrays.asList(
    new Wrapper(new Circle(4d)),
    new Wrapper(new Square(5d))
);

Gson gson = new Gson();
String json = gson.toJson(shapes);
```

这样反序列化也正如我们所期望的：

```java
Gson gson = new Gson();

Type collectionType = new TypeToken<List``<Wrapper>``>(){}.getType();
List``<Wrapper>`` shapes = gson.fromJson(json, collectionType);
```

注意，我们需要在这里使用_TypeToken_，因为我们正在反序列化到一个泛型列表。这与我们的包装类型和多态结构无关。

**然而，这意味着我们的_Wrapper_类型需要支持每种可能的子类型。** 添加新的子类型意味着需要做更多的工作来实现我们期望的结果。

## 4. 在对象中添加类型字段

**如果我们只对序列化我们的对象感兴趣，我们可以简单地向它们添加一个字段来指示类型**：

```java
public class Square implements Shape {
    private final String type = "square"; // 添加字段
    private final double side;
    private final double area;

    public Square(double side) {
        this.side = side;
        this.area = side * side;
    }
}
```

这样做将导致这个新的_type_字段出现在序列化的JSON中，允许客户端知道每种形状的类型：

```json
{
    "type": "square",
    "side": 5,
    "area": 25
}
```

这现在更接近我们之前看到的内容。**然而，我们不能使用这种技术轻松地反序列化这个JSON**，所以它只在我们不需要这样做的情况下才真正可行。

## 5. 自定义类型适配器

**我们将探索的最后方法是编写自定义类型适配器。这是我们可以贡献给Gson实例的一些代码，然后它将为我们处理类型序列化和反序列化。**

### 5.1. 自定义序列化器

我们想要实现的第一件事是能够正确地序列化我们的类型。**这意味着使用所有标准逻辑序列化它们，然后添加一个额外的_type_字段来指示对象的类型。**

我们通过为我们的类型编写自定义的_JsonSerializer_实现来实现这一点：

```java
public class ShapeTypeAdapter implements JsonSerializer````<Shape>```` {
    @Override
    public JsonElement serialize(Shape shape, Type type, JsonSerializationContext context) {
        JsonElement elem = new Gson().toJsonTree(shape);
        elem.getAsJsonObject().addProperty("type", shape.getClass().getName());
        return elem;
    }
}
```

**注意，我们需要使用一个新的_Gson_实例来序列化值本身。如果我们重用了原始实例——通过_JsonSerializationContext_——那么我们将陷入一个无限循环，其中序列化器不断地调用自己。**

在这里，我们使用完整的类名作为我们的类型，但我们也可以使用任何我们想要支持的东西。我们只需要某种方式来在字符串和类名之间进行唯一转换。

使用这个，生成的JSON将是：

```json
[
    {
        "radius": 4,
        "area": 50.26548245743669,
        "type": "com.baeldung.gson.polymorphic.TypeAdapterUnitTest$Circle"
    },
    {
        "side": 5,
        "area": 25,
        "type": "com.baeldung.gson.polymorphic.TypeAdapterUnitTest$Square"
    }
]
```

### 5.2. 自定义反序列化器

现在我们可以将类型序列化到JSON中，我们需要也能够将它们反序列化。**这意味着理解_type_字段，然后使用它来反序列化到正确的类中。**

我们通过为我们的类型编写自定义的_JsonDeserializer_实现来实现这一点：

```java
public class ShapeTypeAdapter implements JsonDeserializer````<Shape>```` {
    @Override
    public Shape deserialize(JsonElement json, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
        JsonObject jsonObject = json.getAsJsonObject();
        String typeName = jsonObject.get("type").getAsString();

        try {
            Class``<? extends Shape>`` cls = (Class``<? extends Shape>``) Class.forName(typeName);
            return new Gson().fromJson(json, cls);
        } catch (ClassNotFoundException e) {
            throw new JsonParseException(e);
        }
    }
}
```

**我们可以在同一个类中实现我们的序列化器和反序列化器，只需实现两个接口即可。这有助于保持逻辑在一起，以便我们知道两者是相互兼容的。**

和以前一样，我们需要使用一个新的_Gson_实例来实际执行反序列化。否则，我们将陷入一个无限循环。

### 5.3. 连接类型适配器

**现在我们已经得到了一个可以用于序列化和反序列化我们的多态类型的类型适配器，我们需要能够使用它。**这意味着创建一个将其连接的_Gson_实例：

```java
GsonBuilder builder = new GsonBuilder();
builder.registerTypeHierarchyAdapter(Shape.class, new ShapeTypeAdapter());
Gson gson = builder.create();
```

**我们使用_registerTypeHierarchyAdapter_调用将其连接，因为这意味着它将被用于我们的_Shape_类和实现它的任何内容。** 这将导致这个_Gson_实例在尝试将实现我们的_Shape_接口的任何内容序列化为JSON时，或在尝试将JSON反序列化为实现_Shape_接口的任何内容时，使用此适配器：

```java
List````<Shape>```` shapes = List.of(new Circle(4d), new Square(5d));

String json = gson.toJson(shapes);

Type collectionType = new TypeToken<List````<Shape>````>(){}.getType();
List````<Shape>```` result = gson.fromJson(json, collectionType);

assertEquals(shapes, result);
```

## 6. 总结

在这里，我们看到了几种使用Gson管理多态类型的技术，无论是将它们序列化为JSON还是从JSON反序列化回来。

下次你在处理JSON和多态类型时，不妨试试其中的一些技术？

和往常一样，本文的全部代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表