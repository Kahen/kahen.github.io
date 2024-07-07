标题：Spring Boot中使用Caffeine缓存获取所有键

---
date: 2024-07-07
category:
  - Spring Boot
  - Caching
tag:
  - Caffeine
  - Cache
  - Spring
head:
  - - meta
    - name: keywords
      content: Spring Boot, Caffeine, Cache, Java
------
# Spring Boot中使用Caffeine缓存获取所有键

请注意，由于网络问题，未能成功解析上述链接中的页面内容。上述翻译基于链接标题进行翻译，并未包含页面的具体内容。如果需要进一步的翻译或解析，请确保链接有效并可访问。## 概述

在本文中，我们将学习如何在Spring的缓存抽象层中使用Caffeine缓存时获取所有缓存键。

## Spring缓存

缓存是Spring框架的一个不可分割的部分。自3.1版本以来，它一直是Spring生态系统的一部分。因此，它有一套定义良好且经过实战测试的接口。

让我们看看两个主要的接口：_CacheManager_和_Cache_：

```java
interface CacheManager {
    Cache getCache(String name);
    Collection`<String>` getCacheNames();
}

public interface Cache {
    String getName();
    Object getNativeCache();
    ValueWrapper get(Object key);
    ````<T>```` T get(Object key, @Nullable Class````<T>```` type);
    ````<T>```` T get(Object key, Callable````<T>```` valueLoader);
    void put(Object key, @Nullable Object value);
    ValueWrapper putIfAbsent(Object key, @Nullable Object value);
    void evict(Object key);
    void clear();
}
```

如我们所见，_CacheManager_ 仅仅是一个包装器。应用程序中可用的缓存区域的注册表。另一方面，_Cache_ 对象是区域内的一组键值对。

**然而，它们都没有提供列出可用键的方法。**

## 设置

在我们探索访问所有可用键的集合的选项之前，让我们定义我们的测试应用程序使用的_CaffeineCacheManager_：

```java
@Configuration
@EnableCaching
public class AllKeysConfig {

    @Bean
    CacheManager cacheManager() {
        return new CaffeineCacheManager();
    }
}
```

然后，让我们创建一个慢服务，每次调用时都会填充缓存：

```java
public class SlowServiceWithCache {

    @CachePut(cacheNames = "slowServiceCache", key = "#name")
    public String save(String name, String details) {
        return details;
    }
}
```

有了管理器和服务，我们就准备在_slowServiceCache_区域中查找键。

## 访问所有缓存键

正如我们已经了解到的，_CacheManager_ 没有暴露任何访问所有可用键的方法。_Cache_ 接口也没有。

**因此，我们需要使用我们在应用程序中定义的实际缓存实现的知识。** 让我们将Spring的通用接口转换为适当的_Caffeine_实现。

我们首先需要注入_CacheManager_：

```java
@Autowired
CacheManager cacheManager;
```

然后让我们进行一些简单的转换操作以访问原生_Caffeine Cache_：

```java
CaffeineCacheManager caffeineCacheManager = (CaffeineCacheManager) cacheManager;
CaffeineCache cache = (CaffeineCache) caffeineCacheManager.getCache("slowServiceCache");
Cache``<Object, Object>`` caffeine = cache.getNativeCache();

```

然后，让我们调用_caffeine.asMap()_。因为它是一个映射，我们可以通过调用_caffeine.asMap().keySet()_来简单地访问键：

```java
@Test
public void givenCaffeineCacheCachingSlowCalls_whenCacheManagerProperlyCasted_thenAllKeysAreAccessible() {
    slowServiceWithCache.save("first", "some-value-first");
    slowServiceWithCache.save("second", "other-value-second");

    Cache``<Object, Object>`` caffeine = getNativeCaffeineCacheForSlowService();

    assertThat(caffeine.asMap().keySet()).containsOnly("first", "second");
}
```

## 结论

在本文中，我们学习了如何访问与Spring缓存一起使用的Caffeine缓存中的所有可用键的集合。了解我们正在处理的实际缓存，访问所有可用键只需要几个简单的转换操作。

正如往常一样，本文的代码可以在GitHub上找到。

OK