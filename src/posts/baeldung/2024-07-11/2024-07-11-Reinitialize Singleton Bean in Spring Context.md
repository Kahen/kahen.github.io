---
date: 2022-04-01
category:
  - Spring
  - Java
tag:
  - Spring Framework
  - Singleton Bean
head:
  - - meta
    - name: keywords
      content: Spring, Singleton Bean, Configuration, Reinitialization
---
# 在Spring上下文中重新初始化单例Bean

在本教程中，我们将探讨在运行时重新初始化Spring单例Bean的方法。默认情况下，Spring应用程序生命周期中不会重新初始化具有单例作用域的Bean。然而，在某些情况下，可能需要重新创建Bean，例如当更新属性时。我们将查看几种实现此目的的方法。

## 2. 代码设置

为了更好地理解这一点，我们将创建一个小项目。我们将创建一个Bean，它从配置文件中读取配置属性，并将它们保存在内存中以实现更快的访问。如果文件中的属性发生变化，可能需要重新加载配置。

### 2.1. 单例Bean

让我们首先创建_ConfigManager_类：

```java
@Service("ConfigManager")
public class ConfigManager {

    private static final Log LOG = LogFactory.getLog(ConfigManager.class);

    private Map`<String, Object>` config;

    private final String filePath;

    public ConfigManager(@Value("${config.file.path}") String filePath) {
        this.filePath = filePath;
        initConfigs();
    }

    private void initConfigs() {
        Properties properties = new Properties();
        try {
            properties.load(Files.newInputStream(Paths.get(filePath)));
        } catch (IOException e) {
            LOG.error("Error loading configuration:", e);
        }
        config = new HashMap<>();
        for (Map.Entry`<Object, Object>` entry : properties.entrySet()) {
            config.put(String.valueOf(entry.getKey()), entry.getValue());
        }
    }

    public Object getConfig(String key) {
        return config.get(key);
    }
}
```

关于这个类，有几点需要注意：

- 从构造函数中调用_initConfigs()_方法，一旦Bean构建完成，就立即加载文件。
- _initConfigs()_方法将文件内容转换为名为_config_的_Map_。
- _getConfig()_方法用于通过其键读取属性。

**另一个需要注意的点是构造函数依赖注入。稍后，当我们需要替换Bean时，我们将使用它。**

配置文件位于路径_src/main/resources/config.properties_，并包含一个属性：

```
property1=value1
```

### 2.2. 控制器

为了测试_ConfigManager_，让我们创建一个控制器：

```java
@RestController
@RequestMapping("/config")
public class ConfigController {

    @Autowired
    private ConfigManager configManager;

    @GetMapping("/{key}")
    public Object get(@PathVariable String key) {
        return configManager.getConfig(key);
    }
}
```

我们可以运行应用程序，并通过访问URL _http://localhost:8080/config/property1_ 来读取配置。

接下来，我们希望更改文件中的属性值，并在我们再次读取配置时反映这一变化。让我们看看实现这一点的几种方法。

## 3. 使用公共方法重新加载属性

**如果我们想要重新加载属性而不是重新创建对象本身，我们可以简单地创建一个公共方法来再次初始化映射表。** 在我们的_ConfigManager_中，让我们添加一个调用_initConfigs()_方法的方法：

```java
public void reinitializeConfig() {
    initConfigs();
}
```

然后，当我们想要重新加载属性时，可以调用这个方法。让我们在控制器类中公开另一个调用_reinitializeConfig()_方法的方法：

```java
@GetMapping("/reinitializeConfig")
public void reinitializeConfig() {
    configManager.reinitializeConfig();
}
```

现在我们可以运行应用程序并通过以下简单步骤进行测试：

- 访问URL _http://localhost:8080/config/property1_ 返回_value1_。
- 然后我们将_property1_的值从_value1_更改为_value2_。
- 然后我们可以访问URL _http://localhost:8080/config/reinitializeConfig_ 来重新初始化配置映射表。
- 如果我们再次访问URL _http://localhost:8080/config/property1_，我们将发现返回的值是_value2_。

## 4. 重新初始化单例Bean

重新初始化Bean的另一种方式是通过在上下文中重新创建它。可以通过使用自定义代码调用构造函数或通过删除Bean并让上下文自动重新初始化它来完成。让我们看看这两种方法。

### 4.1. 在上下文中替换Bean

我们可以从上下文中删除Bean，并用新的_ConfigManager_实例替换它。让我们在我们的控制器中定义另一种方法来实现这一点：

```java
@GetMapping("/reinitializeBean")
public void reinitializeBean() {
    DefaultSingletonBeanRegistry registry = (DefaultSingletonBeanRegistry) applicationContext.getAutowireCapableBeanFactory();
    registry.destroySingleton("ConfigManager");
    registry.registerSingleton("ConfigManager", new ConfigManager(filePath));
}
```

首先，我们从应用程序上下文中获取_DefaultSingletonBeanRegistry_的实例。接下来，我们调用_destroySingleton()_方法来销毁名为_ConfigManager_的Bean实例。最后，我们创建一个新的_ConfigManager_实例，并通过调用_registerSingleton()_方法将其注册到工厂中。

要创建新实例，我们使用了在_ConfigManager_中定义的构造函数。**Bean依赖的任何依赖项都必须通过构造函数传递。**

_registerSingleton()_方法不仅在上下文中创建了Bean，还将其自动装配到依赖对象中。

调用_/reinitializeBean_端点更新了控制器中的_ConfigManager_ Bean。我们可以使用与前面方法相同的步骤测试重新初始化行为。

### 4.2. 在上下文中销毁Bean

在前面的方法中，我们需要通过构造函数传递依赖项。有时，我们可能不需要创建Bean的新实例，或者可能没有访问所需的依赖项。在这种情况下，**另一种可能性只是销毁上下文中的Bean。**

**上下文会在再次请求Bean时再次创建它。在这种情况下，它将使用与初始Bean创建相同的步骤来创建它。**

为了演示这一点，让我们创建一个新的控制器方法，销毁Bean但不再次创建它：

```java
@GetMapping("/destroyBean")
public void destroyBean() {
    DefaultSingletonBeanRegistry registry = (DefaultSingletonBeanRegistry) applicationContext.getAutowireCapableBeanFactory();
    registry.destroySingleton("ConfigManager");
}
```

这不会改变控制器已经持有的Bean的引用。**要访问最新状态，我们需要直接从上下文中读取它。**

让我们创建一个新的控制器来读取配置。这个控制器将依赖于上下文中最新的_ConfigManager_ Bean：

```java
@GetMapping("/context/{key}")
public Object getFromContext(@PathVariable String key) {
    ConfigManager dynamicConfigManager = applicationContext.getBean(ConfigManager.class);
    return dynamicConfigManager.getConfig(key);
}
```

我们可以使用以下简单步骤测试上述方法：

- 访问URL _http://localhost:8080/config/context/property1_ 返回_value1_。
- 然后我们可以访问URL _http://localhost:8080/config/destroyBean_ 来销毁_ConfigManager_。
- 然后我们将_property1_的值从_value1_更改为_value2_。
- 如果我们再次访问URL _http://localhost:8080/config/context/property1_，我们将发现返回的值是_value2_。

## 5. 结论

在本文中，我们探讨了重新初始化单例Bean的方法。我们查看了一种在不重新创建它的情况下更改Bean属性的方法。我们还查看了在上下文中强制重新创建Bean的方法。

如常，本文中使用的所有代码示例都可以在GitHub上找到。