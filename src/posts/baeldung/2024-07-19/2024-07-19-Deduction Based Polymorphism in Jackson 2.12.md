---
date: 2022-04-01
category:
  - Java
  - Jackson
tag:
  - Polymorphism
  - JSON
head:
  - - meta
    - name: keywords
      content: Jackson, Polymorphism, JSON, Deduction
---
# Jackson 2.12中的基于推断的多态性

在本教程中，**我们将探讨如何使用Jackson库中的基于推断的多态性特性。**

假设我们有如下所示的类结构：
![img](https://www.baeldung.com/wp-content/uploads/2022/04/CharacterDiagram-1-300x208.png)

首先，_NamedCharacter_ 和 _ImperialSpy_ 类实现了 _Character_ 接口。其次，_King_ 和 _Knight_ 类实现了 _NamedCharacter_ 类。最后，我们有一个 _ControlledCharacter_ 类，其中包含对玩家控制的角色的引用。

我们希望能够解析JSON对象到Java对象，而无需修改接收到的JSON的结构。

让我们来看一下类的实现。注意，对于基接口，**我们将使用Jackson注解来声明我们想要使用的推断方式。同时，我们还需要添加 _@JsonSubTypes_ 注解来声明我们想要推断的类。**

```java
@JsonTypeInfo(use = Id.NAME)
@JsonSubTypes({ @Type(ImperialSpy.class), @Type(King.class), @Type(Knight.class) })
public interface Character {
}
```

此外，我们也可以在接口 _Character_ 和 _King_ 和 _Knight_ 类之间有一个中间类。因此，Jackson也将知道如何在这种情况下推断多态性：

```java
public class NamedCharacter implements Character {
    private String name;

    // 标准的setter和getter
}
```

接下来，我们将实现Character接口的子类。我们已经在之前的代码示例中声明了这些子类作为子类型。因此，实现不依赖于Jackson库：

```java
public class ImperialSpy implements Character {
}
```

```java
public class King extends NamedCharacter {
    private String land;

    // 标准的setter和getter
}
```

```java
public class Knight extends NamedCharacter {
    private String weapon;

    // 标准的setter和getter
}
```

我们想要映射的JSON示例如下：

```json
{
    "name": "Old King Allant",
    "land": "Boletaria",
}
```

首先，如果我们尝试读取上述JSON结构，Jackson将抛出一个运行时异常，消息为 _Could not resolve subtype of [simple type, class com.baeldung.jackson.deductionbasedpolymorphism.Character]: missing type id property ‘@type’:_

```java
@Test
void givenAKingWithoutType_whenMapping_thenExpectAnError() {
    String kingJson = formatJson("{'name': 'Old King Allant', 'land':'Boletaria'}");
    assertThrows(InvalidTypeIdException.class, () -> objectMapper.readValue(kingJson, Character.class));
}
```

此外，_formatJson_ 工具方法帮助我们通过将单引号转换为双引号（因为JSON需要）来简化测试中的代码：

```java
public static String formatJson(String input) {
    return input.replaceAll("'", "\\\"");
}
```

因此，为了能够多态地推断我们角色的类型，我们必须修改JSON结构，并显式添加对象的类型。因此，我们将必须将多态行为与我们的JSON结构耦合：

```json
{
    "@type": "King"
    "name": "Old King Allant",
    "land": "Boletaria",
}
```

```java
@Test
void givenAKing_whenMapping_thenExpectAKingType() throws Exception {
    String kingJson = formatJson("{'name': 'Old King Allant', 'land':'Boletaria', '@type':'King'}");

    Character character = objectMapper.readValue(kingJson, Character.class);
    assertTrue(character instanceof King);
    assertSame(character.getClass(), King.class);
    King king = (King) character;
    assertEquals("Boletaria", king.getLand());
}
```

## 3. 基于推断的多态性

**要激活基于推断的多态性，我们唯一需要做的改变是使用 _@JsonTypeInfo(use = Id.DEDUCTION):_

```java
@JsonTypeInfo(use = Id.DEDUCTION)
@JsonSubTypes({ @Type(ImperialSpy.class), @Type(King.class), @Type(Knight.class) })
public interface Character {
}
```

## 4. 简单推断

让我们探索如何以多态的方式读取JSON。我们想要读取的对象如下：

```json
{
    "name": "Ostrava, of Boletaria",
    "weapon": "Rune Sword",
}
```

首先，我们将在 _Character_ 对象中读取值。然后，我们将测试 _Jackson_ 是否正确推断了JSON的类型：

```java
@Test
void givenAKnight_whenMapping_thenExpectAKnightType() throws Exception {
    String knightJson = formatJson("{'name':'Ostrava, of Boletaria', 'weapon':'Rune Sword'}");

    Character character = objectMapper.readValue(knightJson, Character.class);

    assertTrue(character instanceof Knight);
    assertSame(character.getClass(), Knight.class);
    Knight king = (Knight) character;
    assertEquals("Ostrava, of Boletaria", king.getName());
    assertEquals("Rune Sword", king.getWeapon());
}
```

此外，如果JSON是一个空对象，Jackson将将其解释为 _ImperialSpy_，这是一个没有属性的类：

```java
@Test
void givenAnEmptyObject_whenMapping_thenExpectAnImperialSpy() throws Exception {
    String imperialSpyJson = "{}";

    Character character = objectMapper.readValue(imperialSpyJson, Character.class);

    assertTrue(character instanceof ImperialSpy);
}
```

同样，**一个null JSON对象也将被Jackson推断为null对象：**

```java
@Test
void givenANullObject_whenMapping_thenExpectANullObject() throws Exception {
    Character character = objectMapper.readValue("null", Character.class);

    assertNull(character);
}
```

## 5. 不区分大小写的推断

**即使属性的大小写不匹配，Jackson也可以推断多态性。** 首先，我们将使用 _ACCEPT_CASE_INSENSITIVE_PROPERTIES_ 启用的实例化对象映射器：

```java
ObjectMapper objectMapper = JsonMapper.builder().configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true).build();
```

然后，使用实例化的 _objectMapper，_ 我们可以测试多态性是否正确推断：

```json
{
    "NaMe": "Ostrava, of Boletaria",
    "WeaPON": "Rune Sword",
}
```

```java
@Test
void givenACaseInsensitiveKnight_whenMapping_thenExpectKnight() throws Exception {
    String knightJson = formatJson("{'NaMe':'Ostrava, of Boletaria', 'WeaPON':'Rune Sword'}");

    Character character = objectMapper.readValue(knightJson, Character.class);

    assertTrue(character instanceof Knight);
    assertSame(character.getClass(), Knight.class);
    Knight knight = (Knight) character;
    assertEquals("Ostrava, of Boletaria", knight.getName());
    assertEquals("Rune Sword", knight.getWeapon());
}
```

## 6. 包含推断

**我们也可以推断包含在其他对象中的对象的多态性。** 我们将使用 _ControlledCharacter_ 类定义来演示以下JSON的映射：

```json
{
    "character": {
        "name": "Ostrava, of Boletaria",
        "weapon": "Rune Sword"
    }
}
```

```java
@Test
void givenAKnightControlledCharacter_whenMapping_thenExpectAControlledCharacterWithKnight() throws Exception {
    String controlledCharacterJson = formatJson("{'character': {'name': 'Ostrava, of Boletaria', 'weapon': 'Rune Sword'}}");

    ControlledCharacter controlledCharacter = objectMapper.readValue(controlledCharacterJson, ControlledCharacter.class);
    Character character = controlledCharacter.getCharacter();

    assertTrue(character instanceof Knight);
    assertSame(character.getClass(), Knight.class);
    Knight knight = (Knight) character;
    assertEquals("Ostrava, of Boletaria", knight.getName());
    assertEquals("Rune Sword", knight.getWeapon());
}
```

## 7. 结论

在本教程中，**我们探讨了如何使用Jackson库进行基于推断的多态性。**

文章的源代码可以在GitHub上找到。