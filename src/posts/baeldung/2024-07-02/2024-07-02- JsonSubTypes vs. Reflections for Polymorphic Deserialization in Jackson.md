---
date: 2024-07-02
category:
  - Java
  - Jackson
tag:
  - Polymorphic Deserialization
  - JsonSubTypes
  - Reflections
head:
  - - meta
    - name: keywords
      content: Jackson, Polymorphism, Deserialization, Java
------
# Jackson中@JsonSubTypes与反射用于多态反序列化的比较

多态反序列化是Jackson的一个特性，Jackson是一个流行的Java JSON序列化和反序列化库。它允许我们将JSON反序列化到一个Java对象层级结构中，即使在编译时不知道具体类型。当你拥有一个父类和多个子类，并且我们希望在反序列化期间确定对象的实际类型，以不丢失关于对象多态性质的任何信息时，这个特性非常有用。

在本教程中，我们将探讨两种实现方式：使用类型处理注解来指示基类的子类型，或者使用基于_Reflections_的方法来扫描和注册所有子类型。

## 2. 使用@JsonTypeInfo和@JsonSubTypes进行多态反序列化

最直接的选择之一是Jackson多态类型处理注解。

让我们看一个实现示例，我们将使用@JsonTypeInfo和@JsonSubTypes来指示Vehicle实体的子类型，并根据现有属性进行反序列化：

```java
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type", visible = true)
@JsonSubTypes({
    @JsonSubTypes.Type(value = Vehicle.ElectricVehicle.class, name = "ELECTRIC_VEHICLE"),
    @JsonSubTypes.Type(value = Vehicle.FuelVehicle.class, name = "FUEL_VEHICLE")
})
public class Vehicle {

    public String type;

    // 标准setter和getter

    public static class ElectricVehicle extends Vehicle {

        String autonomy;
        String chargingTime;

        // 标准setter和getter
    }

    public static class FuelVehicle extends Vehicle {

        String fuelType;
        String transmissionType;

        // 标准setter和getter
    }
}
```

现在，让我们看看如何将JSON输入反序列化为Vehicle子类型：

```java
@Test
public void whenDeserializingPolymorphic_thenCorrect() throws JsonProcessingException {
    String json = "{\"type\":\"ELECTRIC_VEHICLE\",\"autonomy\":\"500\",\"chargingTime\":\"200\"}";

    Vehicle vehicle = new ObjectMapper().readerFor(Vehicle.class).readValue(json);

    assertEquals(Vehicle.ElectricVehicle.class, vehicle.getClass());
}
```

## 3. 使用@JsonTypeInfo与Reflections注册子类型进行多态反序列化

接下来，让我们探索一种不同的方法，通过创建自定义注解并使用Reflections库来扫描和注册所有现有子类型。

### 3.1. 反射介绍

反射是一个强大的特性，它允许Java程序在运行时检查或操纵其结构和行为。这很有用，因为我们可以使用自定义注解来指示每个子类型的类型名称，并使用Reflections来识别和注册它们。

我们的Reflections库指南更详细地描述了它以及它的用例。

### 3.2. Maven依赖

首先，要使用Reflections，我们需要添加reflections依赖：

```xml
`<dependency>`
    `<groupId>`org.reflections`</groupId>`
    `<artifactId>`reflections`</artifactId>`
    `<version>`0.10.2`</version>`
`</dependency>`
```

我们可以在Maven中央仓库找到它的最新版本。

### 3.3. 创建自定义注解以指示子类型的类型名称

Java注解是一种元数据形式，它在编译时或运行时提供有关类、方法、字段和其他程序元素的额外信息。它们不直接影响代码的逻辑，而是为编译器或运行时环境提供指令或细节。

有关自定义注解的更多信息，可以在我们的关于在Java中创建自定义注解的文章中找到。

**为了指示每个Vehicle子类型的类型名称，我们将创建以下注解，具有运行时可见性，并适用于类型（类）：**

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface VehicleSubType {
    String value();
}
```

现在，让我们看看我们应该如何更新现有代码来指定每个定义的子类的类型：

```java
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type", visible = true)
public class Vehicle {

    public String type;

    // 标准setter和getter

    @VehicleSubType("ELECTRIC_VEHICLE")
    public static class ElectricVehicle extends Vehicle {

        String autonomy;
        String chargingTime;

        // 标准setter和getter
    }

    @VehicleSubType("FUEL_VEHICLE")
    public static class FuelVehicle extends Vehicle {

        String fuelType;
        String transmissionType;

        // 标准setter和getter
    }
}
```

注意，我们仍然需要在父类上使用@JsonTypeInfo注解来指定用于存储类型信息的属性。

### 3.4. 使用反射注册子类型

**最后，我们需要自定义Jackson ObjectMapper以注册注解类作为子类型。**

我们将首先识别所有使用我们自定义注解@VehicleSubType注解的类。之后，对于每个找到的类，我们可以提取注解的值，并使用相关类型名称注册子类型：

```java
private ObjectMapper getCustomObjectMapper() {

    ObjectMapper objectMapper = new ObjectMapper();

    Reflections reflections = new Reflections("com.baeldung.jackson.polymorphicdeserialization.reflection");
    Set`<Class`<?>``> subtypes = reflections.getTypesAnnotatedWith(VehicleSubType.class);

    for (Class`<?>` subType : subtypes) {
        VehicleSubType annotation = subType.getAnnotation(VehicleSubType.class);
        if (annotation != null) {
            String typeName = annotation.value();
            objectMapper.registerSubtypes(new NamedType(subType, typeName));
        }
    }

    return objectMapper;
}
```

现在，让我们使用与之前相同的输入测试我们的代码：

```java
@Test
public void whenDeserializingPolymorphic_thenCorrect() throws JsonProcessingException {
    String json = "{\"type\":\"ELECTRIC_VEHICLE\",\"autonomy\":\"500\",\"chargingTime\":\"200\"}";
    ObjectMapper objectMapper = getCustomObjectMapper();

    Vehicle vehicle = objectMapper.readValue(json, Vehicle.class);

    assertEquals(Vehicle.ElectricVehicle.class, vehicle.getClass());
}
```

## 4. 两种方法之间的差异

@JsonSubTypes方法通过注解定义子类型及其类型名称，提供显式配置。**这提供了一个集中且清晰的层次结构，确保了编译时的安全性。**

基于Reflections的注册允许在运行时动态发现子类型。虽然它减少了样板代码，但引入了运行时开销，缺乏编译时安全性，并需要外部依赖项进行类路径扫描。然而，这种方法可能适用于处理许多子类型的情况，因为添加新子类型不会影响现有代码。

## 5. 结论

在本文中，我们研究了两种不同的方法，重点关注使用自定义注解和Reflections来识别和注册子类型。

总之，它们之间的选择取决于应用程序的具体要求。如果项目的子类型已经已知且稳定，@JsonSubTypes提供了一个强大且更安全的选择。相反，基于Reflections的注册可能是对于需要灵活性和运行时适应性项目更好的选择。

如常，源代码可在GitHub上获得。