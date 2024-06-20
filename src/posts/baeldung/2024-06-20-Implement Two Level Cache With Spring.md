---
date: 2024-06-21
category:
  - Spring Framework
  - Caching
tag:
  - Spring Boot
  - Caffeine
  - Redis
head:
  - - meta
    - name: keywords
      content: Spring, Caching, Two-Level Cache, Performance Optimization
------
# 使用Spring实现两级缓存

## 1. 概述

缓存数据意味着我们的应用程序不必访问较慢的存储层，从而提高它们的性能和响应能力。我们可以使用任何内存实现库来实现缓存，比如Caffeine。

**尽管这样做提高了数据检索的性能，但如果应用程序部署到多个副本集上，那么缓存就不会在实例之间共享**。为了克服这个问题，我们可以引入一个所有实例都可以访问的分布式缓存层。

在本教程中，我们将学习如何在Spring中实现两级缓存机制。我们将展示如何使用Spring的缓存支持来实现这两个层，并演示当本地缓存层发生缓存未命中时，分布式缓存层是如何被调用的。

## 2. Spring Boot中的示例应用程序

让我们想象我们需要构建一个简单的应用程序，该程序调用数据库来获取一些数据。

### 2.1. Maven依赖项

首先，让我们包括`spring-boot-starter-web`依赖项：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-web````</artifactId>````
    ````<version>````3.1.5````</version>````
````</dependency>````
```

### 2.2. 实现Spring服务

我们将实现一个从存储库中获取数据的Spring服务。

首先，让我们模拟`Customer`类：

```java
public class Customer implements Serializable {
    private String id;
    private String name;
    private String email;
    // 标准getter和setter
}
```

然后让我们实现`CustomerService`类和`getCustomer`方法：

```java
@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Customer getCustomer(String id) {
        return customerRepository.getCustomerById(id);
    }
}
```

最后，让我们定义`CustomerRepository`接口：

```java
public interface CustomerRepository extends CrudRepository`<Customer, String>` { }
```

现在我们将实现两级缓存。

## 3. 实现第一级缓存

我们将利用Spring的缓存支持和Caffeine库来实现第一级缓存层。

### 3.1. Caffeine依赖项

让我们包括`spring-boot-starter-cache`和`caffeine`依赖项：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-cache````</artifactId>````
    ````<version>````3.1.5````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````com.github.ben-manes.caffeine````</groupId>````
    ````<artifactId>````caffeine````</artifactId>````
    ````<version>````3.1.8````</version>````
````</dependency>````
```

### 3.2. 启用Caffeine缓存

为了启用Caffeine缓存，我们需要添加一些与缓存相关的配置。

首先，我们将在`CacheConfig`类中添加`@EnableCaching`注解，并包括一些Caffeine缓存配置：

```java
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CaffeineCache caffeineCacheConfig() {
        return new CaffeineCache("customerCache", Caffeine.newBuilder()
          .expireAfterWrite(Duration.ofMinutes(1))
          .initialCapacity(1)
          .maximumSize(2000)
          .build());
    }
}
```

接下来，我们将使用`SimpleCacheManager`类添加`CaffeineCacheManager` bean并设置缓存配置：

```java
@Bean
public CacheManager caffeineCacheManager(CaffeineCache caffeineCache) {
    SimpleCacheManager manager = new SimpleCacheManager();
    manager.setCaches(Arrays.asList(caffeineCache));
    return manager;
}
```

### 3.3. 包含@Cacheable注解

为了启用上述缓存，我们需要在`getCustomer`方法中添加`@Cacheable`注解：

```java
@Cacheable(cacheNames = "customerCache", cacheManager = "caffeineCacheManager")
public Customer getCustomer(String id) { }
```

如前所述，**这在单实例部署环境中工作得很好，但当应用程序使用多个副本运行时，效果并不理想**。

## 4. 实现第二级缓存

我们将使用Redis服务器实现第二级缓存。当然，我们也可以像使用Memcached一样使用任何其他分布式缓存。

### 4.1. Redis依赖项

让我们添加`spring-boot-starter-redis`依赖项：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-data-redis````</artifactId>````
    ````<version>````3.1.5````</version>````
````</dependency>````
```

### 4.2. 启用Redis缓存

我们需要添加Redis缓存相关的配置以在应用程序中启用它。

首先，让我们使用一些属性配置`RedisCacheConfiguration` bean：

```java
@Bean
public RedisCacheConfiguration cacheConfiguration() {
    return RedisCacheConfiguration.defaultCacheConfig()
      .entryTtl(Duration.ofMinutes(5))
      .disableCachingNullValues()
      .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
}
```

然后让我们使用`RedisCacheManager`类启用`CacheManager`：

```java
@Bean
public CacheManager redisCacheManager(RedisConnectionFactory connectionFactory, RedisCacheConfiguration cacheConfiguration) {
    return RedisCacheManager.RedisCacheManagerBuilder
      .fromConnectionFactory(connectionFactory)
      .withCacheConfiguration("customerCache", cacheConfiguration)
      .build();
}
```

### 4.3. 包含@Caching和@Cacheable注解

我们将使用`@Caching`和`@Cacheable`注解在`getCustomer`方法中包含第二级缓存：

```java
@Caching(cacheable = {
  @Cacheable(cacheNames = "customerCache", cacheManager = "caffeineCacheManager"),
  @Cacheable(cacheNames = "customerCache", cacheManager = "redisCacheManager")
})
public Customer getCustomer(String id) { }
```

我们应该注意到**Spring将从第一个可用的缓存中获取缓存对象**。**如果两个缓存管理器都未命中，它将运行实际的方法**。

## 5. 实施集成测试

为了验证我们的设置，我们将实施一些集成测试并验证两个缓存。

首先，我们将创建一个集成测试来使用嵌入式Redis服务器验证两个缓存：

```java
@Test
void givenCustomerIsPresent_whenGetCustomerCalled_thenReturnCustomerAndCacheIt() {
    String CUSTOMER_ID = "100";
    Customer customer = new Customer(CUSTOMER_ID, "test", "test@mail.com");
    given(customerRepository.findById(CUSTOMER_ID))
      .willReturn(customer);

    Customer customerCacheMiss = customerService.getCustomer(CUSTOMER_ID);

    assertThat(customerCacheMiss).isEqualTo(customer);
    verify(customerRepository, times(1)).findById(CUSTOMER_ID);
    assertThat(caffeineCacheManager.getCache("customerCache").get(CUSTOMER_ID).get()).isEqualTo(customer);
    assertThat(redisCacheManager.getCache("customerCache").get(CUSTOMER_ID).get()).isEqualTo(customer);
}
```

我们将运行上述测试用例并发现它运行良好。

接下来，让我们想象一个场景，第一级缓存数据由于过期而被逐出，我们将尝试获取同一个客户。那么它应该是第二级缓存，Redis的缓存命中。对于同一个客户的任何进一步的缓存命中应该是第一级缓存。

让我们实现上述测试场景，以检查本地缓存过期后两个缓存的情况：

```java
@Test
void givenCustomerIsPresent_whenGetCustomerCalledTwiceAndFirstCacheExpired_thenReturnCustomerAndCacheIt() throws InterruptedException {
    String CUSTOMER_ID = "102";
    Customer customer = new Customer(CUSTOMER_ID, "test", "test@mail.com");
    given(customerRepository.findById(CUSTOMER_ID))
      .willReturn(customer);

    Customer customerCacheMiss = customerService.getCustomer(CUSTOMER_ID);
    TimeUnit.SECONDS.sleep(3);
    Customer customerCacheHit = customerService.getCustomer(CUSTOMER_ID);

    verify(customerRepository, times(1)).findById(CUSTOMER_ID);
    assertThat(customerCacheMiss).isEqualTo(customer);
    assertThat(customerCacheHit).isEqualTo(customer);
    assertThat(caffeineCacheManager.getCache("customerCache").get(CUSTOMER_ID).get()).isEqualTo(customer);
    assertThat(redisCacheManager.getCache("customerCache").get(CUSTOMER_ID).get()).isEqualTo(customer);
}
```

当我们运行上述测试时，我们将看到**Caffeine缓存对象的一个意外的断言错误**：

```java
org.opentest4j.AssertionFailedError:
expected: Customer(id=102, name=test, email=test@mail.com)
but was: null
...
at com.baeldung.caching.twolevelcaching.CustomerServiceCachingIntegrationTest.givenCustomerIsPresent_whenGetCustomerCalledTwiceAndFirstCacheExpired_thenReturnCustomerAndCacheIt(CustomerServiceCachingIntegrationTest.java:91)
```

从上述日志中，很明显Caffeine缓存在逐出后没有客户对象，即使我们再次调用相同的方法，它也没有从第二级缓存中恢复。这不是这种情况的理想情况，因为每次第一级缓存过期，它就不会更新，直到第二级缓存也过期。这会给Redis缓存增加额外的负载。

**我们应该注意到，即使它们为相同的方法声明，Spring也不会管理多个缓存之间的任何数据**。

这告诉我们**我们需要在再次访问时更新第一级缓存**。

## 6. 实现自定义`CacheInterceptor`

为了更新第一级缓存，我们需要实现一个自定义的缓存拦截器来拦截每次缓存被访问。

我们将添加一个拦截器来检查当前缓存类是否为`Redis`类型，如果本地缓存不存在，则可以更新缓存值。

让我们通过重写`doGet`方法来实现自定义的`CacheInterceptor`：

```java
public class CustomerCacheInterceptor extends CacheInterceptor {

    private final CacheManager caffeineCacheManager;

    @Override
    protected Cache.ValueWrapper doGet(Cache cache, Object key) {
        Cache.ValueWrapper existingCacheValue = super.doGet(cache, key);

        if (existingCacheValue != null && cache.getClass() == RedisCache.class) {
            Cache caffeineCache = caffeineCacheManager.getCache(cache.getName());
            if (caffeineCache != null) {
                caffeineCache.putIfAbsent(key, existingCacheValue.get());
            }
        }

        return existingCacheValue;
    }
}
```

我们还需要注册`CustomerCacheInterceptor` bean以启用它：

```java
@Bean
public CacheInterceptor cacheInterceptor(CacheManager caffeineCacheManager, CacheOperationSource cacheOperationSource) {
    CacheInterceptor interceptor = new CustomerCacheInterceptor(caffeineCacheManager);
    interceptor.setCacheOperationSources(cacheOperationSource);
    return interceptor;
}

@Bean
public CacheOperationSource cacheOperationSource() {
    return new AnnotationCacheOperationSource();
}
```

**我们应该注意到，自定义拦截器将在Spring代理方法内部调用获取缓存方法时拦截调用**。

我们将重新运行集成测试，并看到上述测试用例通过。

## 7. 结论

在本文中，我们学习了如何使用Spring的缓存支持和Caffeine与Redis实现两级缓存。我们还演示了如何通过自定义缓存拦截器实现更新第一级Caffeine缓存。

如往常一样，示例代码可以在GitHub上找到。

OK