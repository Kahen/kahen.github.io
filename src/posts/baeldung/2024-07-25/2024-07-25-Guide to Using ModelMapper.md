---
date: 2022-04-21
category:
  - Java
  - ModelMapper
tag:
  - ModelMapper
  - Java
head:
  - - meta
    - name: keywords
      content: ModelMapper, Java, 映射, DTO, 对象映射
---
# 使用ModelMapper的指南

1. 概述

在之前的教程中，我们看到了如何使用ModelMapper映射列表。

在本教程中，我们将展示**如何在ModelMapper中将数据映射到结构不同的对象之间。**

尽管ModelMapper的默认转换在典型情况下工作得很好，但我们将主要关注如何匹配使用默认配置无法处理的对象。

因此，这次我们将专注于属性映射和配置更改。

2. Maven依赖

要开始使用ModelMapper库，我们将依赖项添加到我们的_pom.xml_:

```
`<dependency>`
    `<groupId>`org.modelmapper`</groupId>`
    `<artifactId>`modelmapper`</artifactId>`
    `<version>`3.2.0`</version>`
`</dependency>`
```

3. 默认配置

当源对象和目标对象彼此相似时，ModelMapper提供了一个即插即用的解决方案。

让我们来看看_Game_和_GameDTO_，分别是我们的领域对象和相应的数据传输对象：

```java
public class Game {
    private Long id;
    private String name;
    private Long timestamp;

    private Player creator;
    private List`<Player>` players = new ArrayList<>();
    private GameSettings settings;

    // 构造函数，getter和setter
}

public class GameDTO {
    private Long id;
    private String name;

    // 构造函数，getter和setter
}
```

_GameDTO_只包含两个字段，但字段类型和名称与源对象完全匹配。

在这种情况下，ModelMapper无需额外配置即可处理转换：

```java
@BeforeEach
public void setup() {
    this.mapper = new ModelMapper();
}

@Test
public void whenMapGameWithExactMatch_thenConvertsToDTO() {
    // 当提供相似的源对象时
    Game game = new Game(1L, "Game 1");
    GameDTO gameDTO = this.mapper.map(game, GameDTO.class);

    // 然后默认映射
    assertEquals(game.getId(), gameDTO.getId());
    assertEquals(game.getName(), gameDTO.getName());
}
```

4. ModelMapper中的属性映射是什么？

在我们的项目中，大多数时间我们需要自定义我们的DTOs。当然，这将导致不同的字段、层次结构以及它们之间的不规则映射。有时，我们还需要为单个源对象准备多个DTO，反之亦然。

因此，**属性映射为我们提供了一种强大的方式，以扩展我们的映射逻辑。**

让我们通过添加一个新字段_creationTime_来自定义_GameDTO_：

```java
public class GameDTO {
    private Long id;
    private String name;
    private Long creationTime;

    // 构造函数，getter和setter
}
```

我们将_Game_的_timestamp_字段映射到_GameDTO_的_creationTime_字段。注意，这次**源字段名称与目标字段名称不同。**

要定义属性映射，我们将使用ModelMapper的_TypeMap_。

那么，让我们创建一个_TypeMap_对象，并通过其_addMapping_方法添加属性映射：

```java
@Test
public void whenMapGameWithBasicPropertyMapping_thenConvertsToDTO() {
    // 设置
    TypeMap``````<Game, GameDTO>`````` propertyMapper = this.mapper.createTypeMap(Game.class, GameDTO.class);
    propertyMapper.addMapping(Game::getTimestamp, GameDTO::setCreationTime);

    // 当字段名称不同时
    Game game = new Game(1L, "Game 1");
    game.setTimestamp(Instant.now().getEpochSecond());
    GameDTO gameDTO = this.mapper.map(game, GameDTO.class);

    // 然后通过属性映射器映射
    assertEquals(game.getId(), gameDTO.getId());
    assertEquals(game.getName(), gameDTO.getName());
    assertEquals(game.getTimestamp(), gameDTO.getCreationTime());
}
```

### 4.1. 深度映射

还有不同的映射方式。例如，**ModelMapper可以映射层次结构 - 不同级别的字段可以深度映射。**

让我们在_GameDTO_中定义一个名为_creator_的_String_字段。

然而，_Game_域上的源_creator_字段不是一个简单类型，而是一个对象 - _Player_：

```java
public class Player {
    private Long id;
    private String name;

    // 构造函数，getter和setter
}

public class Game {
    // ...
    private Player creator;
    // ...
}

public class GameDTO {
    // ...
    private String creator;
    // ...
}
```

所以，我们不会传输整个_Player_对象的数据，而只是_name_字段到_GameDTO_。

**为了定义深度映射，我们使用_TypeMap_的_addMappings_方法并添加一个_ExpressionMap_**：

```java
@Test
public void whenMapGameWithDeepMapping_thenConvertsToDTO() {
    // 设置
    TypeMap``````<Game, GameDTO>`````` propertyMapper = this.mapper.createTypeMap(Game.class, GameDTO.class);
    // 添加深度映射，将源的Player对象展平为目标的单个字段
    propertyMapper.addMappings(
      mapper -> mapper.map(src -> src.getCreator().getName(), GameDTO::setCreator)
    );

    // 当映射不同层次结构时
    Game game = new Game(1L, "Game 1");
    game.setCreator(new Player(1L, "John"));
    GameDTO gameDTO = this.mapper.map(game, GameDTO.class);

    // 然后
    assertEquals(game.getCreator().getName(), gameDTO.getCreator());
}
```

### 4.2. 跳过属性

有时，我们不想在DTOs中暴露所有数据。无论是为了使DTOs更轻量级还是隐藏一些敏感数据，这些原因都可能导致我们在传输到DTOs时排除某些字段。

幸运的是，**ModelMapper通过跳过支持属性排除。**

让我们使用_skip_方法排除_id_字段的传输：

```java
@Test
public void whenMapGameWithSkipIdProperty_thenConvertsToDTO() {
    // 设置
    TypeMap``````<Game, GameDTO>`````` propertyMapper = this.mapper.createTypeMap(Game.class, GameDTO.class);
    propertyMapper.addMappings(mapper -> mapper.skip(GameDTO::setId));

    // 当id被跳过时
    Game game = new Game(1L, "Game 1");
    GameDTO gameDTO = this.mapper.map(game, GameDTO.class);

    // 然后目标id是null
    assertNull(gameDTO.getId());
    assertEquals(game.getName(), gameDTO.getName());
}
```

因此，_GameDTO_的_id_字段被跳过并没有设置。

### 4.3. _Converter_

ModelMapper的另一个功能是_Converter_。**我们可以为特定的源到目标映射自定义转换。**

假设我们在_Game_域中有一集合_Player_s。让我们将_Player_s的数量传输到_GameDTO_。

作为第一步，我们在_GameDTO_中定义一个整型字段，_totalPlayers_：

```java
public class GameDTO {
    // ...
    private int totalPlayers;

    // 构造函数，getter和setter
}
```

相应地，我们创建_collectionToSize_ _Converter_：

```java
Converter``<Collection, Integer>`` collectionToSize = c -> c.getSource().size();
```

最后，我们在添加_ExpressionMap_时通过_using_方法注册我们的_Converter_：

```java
propertyMapper.addMappings(
  mapper -> mapper.using(collectionToSize).map(Game::getPlayers, GameDTO::setTotalPlayers)
);
```

结果，我们映射_Game_的_getPlayers().size()_到_GameDTO_的_totalPlayers_字段：

```java
@Test
public void whenMapGameWithCustomConverter_thenConvertsToDTO() {
    // 设置
    TypeMap``````<Game, GameDTO>`````` propertyMapper = this.mapper.createTypeMap(Game.class, GameDTO.class);
    Converter``<Collection, Integer>`` collectionToSize = c -> c.getSource().size();
    propertyMapper.addMappings(
      mapper -> mapper.using(collectionToSize).map(Game::getPlayers, GameDTO::setTotalPlayers)
    );

    // 当提供集合到大小转换器时
    Game game = new Game();
    game.addPlayer(new Player(1L, "John"));
    game.addPlayer(new Player(2L, "Bob"));
    GameDTO gameDTO = this.mapper.map(game, GameDTO.class);

    // 然后它将大小映射到自定义字段
    assertEquals(2, gameDTO.getTotalPlayers());
}
```

### 4.4. _Provider_

在另一个用例中，有时我们需要为目标对象提供一个实例，而不是让ModalMapper初始化它。这就是_Provider_派上用场的地方。

相应地，**ModelMapper的_Provider_是自定义目标对象实例化的内置方式。**

让我们做一个转换，不是_Game_到DTO，而是_Game_到_Game_这次。

原则上，我们有一个持久化的_Game_域，我们从它的存储库中获取它。

之后，我们通过将另一个_Game_对象合并到其中来更新_Game_实例：

```java
@Test
public void whenUsingProvider_thenMergesGameInstances() {
    // 设置
    TypeMap```<Game, Game>``` propertyMapper = this.mapper.createTypeMap(Game.class, Game.class);
    // 从存储库中获取Game实例的提供者
    Provider`<Game>` gameProvider = p -> this.gameRepository.findById(1L);
    propertyMapper.setProvider(gameProvider);

    // 当给定更新状态时
Game update = new Game(1L, "Game Updated!");
update.setCreator(new Player(1L, "John"));
Game updatedGame = this.mapper.map(update, Game.class);

// 然后它在提供的实例上合并更新
assertEquals(1L, updatedGame.getId().longValue());
assertEquals("Game Updated!", updatedGame.getName());
assertEquals("John", updatedGame.getCreator().getName());
}

### 4.5. 条件映射

**ModelMapper还支持条件映射。** 我们可以使用的一种内置条件方法是_Conditions.isNull()_。

让我们在源_Game_对象的_id_字段为_null_时跳过它：

```java
@Test
public void whenUsingConditionalIsNull_thenMergesGameInstancesWithoutOverridingId() {
    // 设置
    TypeMap```<Game, Game>``` propertyMapper = this.mapper.createTypeMap(Game.class, Game.class);
    propertyMapper.setProvider(p -> this.gameRepository.findById(2L));
    propertyMapper.addMappings(mapper -> mapper.when(Conditions.isNull()).skip(Game::getId, Game::setId));

    // 当游戏没有id
    Game update = new Game(null, "Not Persisted Game!");
    Game updatedGame = this.mapper.map(update, Game.class);

    // 然后目标游戏id不会被覆盖
    assertEquals(2L, updatedGame.getId().longValue());
    assertEquals("Not Persisted Game!", updatedGame.getName());
}
```

注意，通过使用_isNull_条件结合_skip_方法，我们保护了目标_id_不被_null_值覆盖。

此外，**我们还可以定义自定义_Condition_s。**

让我们定义一个条件来检查_Game_的_timestamp_字段是否有值：

```java
Condition```<Long, Long>``` hasTimestamp = ctx -> ctx.getSource() != null && ctx.getSource() > 0;
```

接下来，我们使用_when_方法在属性映射器中使用它：

```java
TypeMap``````<Game, GameDTO>`````` propertyMapper = this.mapper.createTypeMap(Game.class, GameDTO.class);
Condition```<Long, Long>``` hasTimestamp = ctx -> ctx.getSource() != null && ctx.getSource() > 0;
propertyMapper.addMappings(
  mapper -> mapper.when(hasTimestamp).map(Game::getTimestamp, GameDTO::setCreationTime)
);
```

最后，ModelMapper只有在_timestamp_有大于零的值时才会更新_GameDTO_的_creationTime_字段：

```java
@Test
public void whenUsingCustomConditional_thenConvertsDTOSkipsZeroTimestamp() {
    // 设置
    TypeMap``````<Game, GameDTO>`````` propertyMapper = this.mapper.createTypeMap(Game.class, GameDTO.class);
    Condition```<Long, Long>``` hasTimestamp = ctx -> ctx.getSource() != null && ctx.getSource() > 0;
    propertyMapper.addMappings(
      mapper -> mapper.when(hasTimestamp).map(Game::getTimestamp, GameDTO::setCreationTime)
    );

    // 当游戏的timestamp为零
    Game game = new Game(1L, "Game 1");
    game.setTimestamp(0L);
    GameDTO gameDTO = this.mapper.map(game, GameDTO.class);

    // 然后时间戳字段不会被映射
    assertEquals(game.getId(), gameDTO.getId());
    assertEquals(game.getName(), gameDTO.getName());
    assertNotEquals(0L, gameDTO.getCreationTime());

    // 当游戏的timestamp大于零
    game.setTimestamp(Instant.now().getEpochSecond());
    gameDTO = this.mapper.map(game, GameDTO.class);

    // 然后时间戳字段被映射
    assertEquals(game.getId(), gameDTO.getId());
    assertEquals(game.getName(), gameDTO.getName());
    assertEquals(game.getTimestamp(), gameDTO.getCreationTime());
}
```

## 5. 替代映射方式

属性映射在大多数情况下都是一个好方法，因为它允许我们进行明确的定义并清晰地看到映射流程。

然而，对于一些对象，特别是当它们具有不同的属性层次结构时，**我们可以使用匹配策略_LOOSE_而不是_TypeMap_。**

### 5.1. 匹配策略_LOOSE_

为了展示松散匹配的好处，让我们在_GameDTO_中添加两个更多的属性：

```java
public class GameDTO {
    //...
    private GameMode mode;
    private int maxPlayers;

    // 构造函数，getter和setter
}
```

注意_mode_和_maxPlayers_对应于_Game_源类中的_GameSettings_的属性：

```java
public class GameSettings {

    private GameMode mode;
    private int maxPlayers;

    // 构造函数，getter和setter
}
```

这样，**我们可以进行双向映射**，既可以从_Game_到_GameDTO_，也可以反过来**而无需定义任何_TypeMap_**：

```java
@Test
public void whenUsingLooseMappingStrategy_thenConvertsToDomainAndDTO() {
    // 设置
    this.mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

    // 当dto具有GameSetting的扁平字段时
    GameDTO gameDTO = new GameDTO();
    gameDTO.setMode(GameMode.TURBO);
    gameDTO.setMaxPlayers(8);
    Game game = this.mapper.map(gameDTO, Game.class);

    // 然后它在没有属性映射器的情况下转换为内部对象
    assertEquals(gameDTO.getMode(), game.getSettings().getMode());
    assertEquals(gameDTO.getMaxPlayers(), game.getSettings().getMaxPlayers());

    // 当GameSetting的字段名称匹配时
    game = new Game();
    game.setSettings(new GameSettings(GameMode.NORMAL, 6));
    gameDTO = this.mapper.map(game, GameDTO.class);

    // 然后它在dto上展平字段
    assertEquals(game.getSettings().getMode(), gameDTO.getMode());
    assertEquals(game.getSettings().getMaxPlayers(), gameDTO.getMaxPlayers());
}
```

### 5.2. 自动跳过空属性

此外，ModelMapper还有一些全局配置可能会有所帮助。其中之一是_setSkipNullEnabled_设置。

所以，**我们可以自动跳过源属性（如果它们是_null_）而无需编写任何条件映射**：

```java
@Test
public void whenConfigurationSkipNullEnabled_thenConvertsToDTO() {
    // 设置
    this.mapper.getConfiguration().setSkipNullEnabled(true);
    TypeMap```<Game, Game>``` propertyMap = this.mapper.createTypeMap(Game.class, Game.class);
    propertyMap.setProvider(p -> this.gameRepository.findById(2L));

    // 当游戏没有id
    Game update = new Game(null, "Not Persisted Game!");
    Game updatedGame = this.mapper.map(update, Game.class);

    // 然后目标游戏id不会被覆盖
    assertEquals(2L, updatedGame.getId().longValue());
    assertEquals("Not Persisted Game!", updatedGame.getName());
}
```

### 5.3. 循环引用对象

有时，我们需要处理引用自身的对象。

通常，这会导致循环依赖并引起著名的_StackOverflowError_：

```
org.modelmapper.MappingException: ModelMapper mapping errors:

1) Error mapping com.bealdung.domain.Game to com.bealdung.dto.GameDTO

1 error
    ...
Caused by: java.lang.StackOverflowError
    ...
```

所以，另一个配置，_setPreferNestedProperties_，将在此情况下帮助我们：

```java
@Test
public void whenConfigurationPreferNestedPropertiesDisabled_thenConvertsCircularReferencedToDTO() {
    // 设置
    this.mapper.getConfiguration().setPreferNestedProperties(false);

    // 当游戏有循环引用：Game -> Player -> Game
    Game game = new Game(1L, "Game 1");
    Player player = new Player(1L, "John");
    player.setCurrentGame(game);
    game.setCreator(player);
    GameDTO gameDTO = this.mapper.map(game, GameDTO.class);

    // 然后它在没有任何异常的情况下解析
    assertEquals(game.getId(), gameDTO.getId());
    assertEquals(game.getName(), gameDTO.getName());
}
```

因此，当我们将_false_传递给_setPreferNestedProperties_时，映射工作没有任何异常。

## 6. 结论

在本文中，我们解释了如何使用ModelMapper中的属性映射器自定义类到类的映射。

我们还看到了一些详细的替代配置示例。

像往常一样，所有示例的源代码都可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)
```

OK