---
date: 2022-04-01
category:
  - Spring
  - Caching
tag:
  - TTL
  - Cache
  - Spring Framework
head:
  - - meta
    - name: keywords
      content: Spring缓存, TTL设置, 缓存机制
---
# 为Spring缓存设置生存时间值

在这个教程中，我们为一些基本的现实世界例子进行缓存操作。特别是，我们将展示如何配置这种缓存机制使其有时间限制。我们也将这种时间限制称为缓存的生存时间（TTL）。

## 2. Spring缓存的配置

之前，我们已经展示了如何使用Spring的@Cacheable注解。同时，缓存的一个实际用例是当一个酒店预订网站的主页频繁被打开时。这意味着提供酒店列表的REST端点经常被请求，导致频繁调用数据库。与直接从内存中提供数据相比，数据库调用较慢。

首先，我们将创建SpringCachingConfig：

```java
@Configuration
@EnableCaching
public class SpringCachingConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("hotels");
    }
}
```

我们还需要SpringCacheCustomizer：

```java
@Component
public class SpringCacheCustomizer implements CacheManagerCustomizer`<ConcurrentMapCacheManager>` {

    @Override
    public void customize(ConcurrentMapCacheManager cacheManager) {
        cacheManager.setCacheNames(asList("hotels"));
    }
}
```

## 3. 使用@Cacheable进行缓存

设置完成后，我们可以利用Spring配置。我们可以通过将Hotel对象存储在内存中来减少REST端点的响应时间。我们在下面的代码片段中使用@Cacheable注解来缓存Hotel对象列表：

```java
@Cacheable("hotels")
public List`<Hotel>` getAllHotels() {
    return hotelRepository.getAllHotels();
}
```

## 4. 为@Cacheable设置TTL

然而，由于更新、删除或添加，数据库中缓存的Hotel列表可能会随时间变化。我们希望通过设置生存时间间隔（TTL）来刷新缓存，超过这个时间间隔后，现有的缓存条目将被移除，并在上述第3节中方法的第一次调用时重新填充。

我们可以通过使用@CacheEvict注解来实现这一点。例如，在下面的例子中，我们通过caching.spring.hotelListTTL变量设置TTL：

```java
@CacheEvict(value = "hotels", allEntries = true)
@Scheduled(fixedRateString = "${caching.spring.hotelListTTL}")
public void emptyHotelsCache() {
    logger.info("emptying Hotels cache");
}
```

我们希望TTL为12小时。以毫秒为单位的值是12 x 3600 x 1000 = 43200000。我们在环境属性中定义这个值。此外，如果我们使用基于属性的环境配置，我们可以如下设置缓存TTL：

```properties
caching.spring.hotelListTTL=43200000
```

或者，如果我们使用基于YAML的设计，我们可以这样设置：

```yaml
caching:
  spring:
    hotelListTTL: 43200000
```

## 5. 结论

在本文中，我们探讨了如何为基于Spring的缓存设置TTL缓存。如常，我们可以在GitHub上找到完整的代码。