---
date: 2023-02-10
category:
  - Spring Data Redis
  - Redis TTL
tag:
  - Redis
  - TTL
  - Spring Boot
  - Session
head:
  - - meta
    - name: keywords
      content: Redis, TTL, Spring Data, Spring Boot, Session
------
# 如何在Spring Data Redis中配置Redis TTL

在本快速教程中，我们将探讨如何在Spring Data Redis中配置键过期。

## 2. 设置
让我们创建一个基于Spring Boot的API来管理由Redis支持的持久化_会话(Session)_资源。为此，我们需要四个主要步骤。有关更详细的设置，请查看我们的Spring Data Redis指南。

### 2.1. 依赖项
首先，让我们在_pom.xml_中添加以下依赖项：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-data-redis`</artifactId>`
    `<version>`3.1.5`</version>`
`</dependency>`
```
_spring-boot-starter-data-redis_将间接添加_spring-data-redis_和_lettuce-core_。

### 2.2. Redis配置
其次，让我们添加_RedisTemplate_配置：

```java
@Configuration
public class RedisConfiguration {

    @Bean
    public RedisTemplate``<String, Session>`` getRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate``<String, Session>`` redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        return redisTemplate;
    }
}
```

### 2.3. 模型
第三，让我们创建我们的_Session_模型：

```java
@RedisHash
public class Session {
    @Id
    private String id;
    private Long expirationInSeconds;
}
```

### 2.4. Redis存储库
最后，让我们创建_SessionRepository_，它提供了与Redis交互以管理我们的_Session_实体：

```java
public interface SessionRepository extends CrudRepository`<Session, String>` {}
```

## 3. 方法
我们将探讨设置TTL的三种方法。

### 3.1. 使用@RedisHash
让我们从最简单的方法开始。_@RedisHash_允许我们为其_timeToLive_属性提供值：

```java
@RedisHash(timeToLive = 60L)
public class Session {
    @Id
    private String id;
    private Long expirationInSeconds;
}
```

**它以秒为单位取值。**在上面的例子中，我们将过期时间设置为60秒。**这种方法在我们要为所有_Session_对象提供恒定的TTL值时很有用。它也可以用于指定默认TTL。**

### 3.2. 使用@TimeToLive
在前一种方法中，我们可以为所有_Session_对象设置相同的恒定TTL。我们的下一个方法允许更多的动态性。使用_@TimeToLive_，我们可以注释任何数值属性或返回数值的方法来设置TTL：

```java
@RedisHash(timeToLive = 60L)
public class Session {
    @Id
    private String id;
    @TimeToLive
    private Long expirationInSeconds;
}
```

这允许我们为每个_Session_对象动态设置TTL。**就像前一种方法一样，TTL以秒为单位。_@TimeToLive_的值优先于_@RedisHash(timeToLive)_。**

### 3.3. 使用KeyspaceSettings
继续到下一种方法，_KeyspaceSettings_设置TTL。Keyspaces定义用于创建Redis Hash的实际键的前缀。现在让我们为_Session_类定义_KeyspaceSettings_：

```java
@Configuration
@EnableRedisRepositories(keyspaceConfiguration = RedisConfiguration.MyKeyspaceConfiguration.class)
public class RedisConfiguration {

    // 省略其他配置

    public static class MyKeyspaceConfiguration extends KeyspaceConfiguration {

        @Override
        protected Iterable``<KeyspaceSettings>`` initialConfiguration() {
            KeyspaceSettings keyspaceSettings = new KeyspaceSettings(Session.class, "session");
            keyspaceSettings.setTimeToLive(60L);
            return Collections.singleton(keyspaceSettings);
        }
    }
}
```

就像前几种方法一样，我们以秒为单位指定了TTL。这种方法非常类似于_@RedisHash_。此外，如果我们不想使用_@EnableRepositories_，我们可以更以编程方式设置它：

```java
@Configuration
public class RedisConfiguration {

    // 省略其他配置

    @Bean
    public RedisMappingContext keyValueMappingContext() {
        return new RedisMappingContext(new MappingConfiguration(new IndexConfiguration(), new MyKeyspaceConfiguration()));
    }

    public static class MyKeyspaceConfiguration extends KeyspaceConfiguration {

        @Override
        protected Iterable``<KeyspaceSettings>`` initialConfiguration() {
            KeyspaceSettings keyspaceSettings = new KeyspaceSettings(Session.class, "session");
            keyspaceSettings.setTimeToLive(60L);
            return Collections.singleton(keyspaceSettings);
        }
    }
}
```

## 4. 比较
最后，让我们比较我们所看到的三种方法，并弄清楚何时使用哪一种。

_@RedisHash_和_KeyspaceSettings_都允许我们一次性为所有实体实例（_Session_）设置TTL。另一方面，_@TimeToLive_允许我们为每个实体实例动态设置TTL。

_KeyspaceSettings_提供了一种在配置中为多个实体设置默认TTL的方法。另一方面，使用_@TimeToLive_和_@RedisHash_，这将需要在每个实体类文件中进行。

_@TimeToLive_具有最高优先级，其次是_@RedisHash_，最后是_KeyspaceSettings_。

## 5. Redis键过期事件
有了所有这些设置Redis键过期的方法，人们可能还对这些事件何时发生感兴趣。为此，我们有_RedisKeyExpiredEvent_。让我们设置一个_EventListener_来捕获_RedisKeyExpiredEvent_：

```java
@Configuration
@EnableRedisRepositories(enableKeyspaceEvents = RedisKeyValueAdapter.EnableKeyspaceEvents.ON_STARTUP)
@Slf4j
public class RedisConfiguration {
    // 省略其他配置

    @Component
    public static class SessionExpiredEventListener {
        @EventListener
        public void handleRedisKeyExpiredEvent(RedisKeyExpiredEvent`<Session>` event) {
            Session expiredSession = (Session) event.getValue();
            assert expiredSession != null;
            log.info("Session with key={} has expired", expiredSession.getId());
        }
    }
}
```

现在我们将能够知道何时会话过期，并在需要时采取一些行动：

```plaintext
2023-02-10T15:13:38.626+05:30 INFO 16874 --- [enerContainer-1] c.b.s.config.RedisConfiguration: 
Session with key=edbd98e9-7b50-45d8-9cf4-9c621899e213 has expired
```

## 6. 结论
在本文中，我们探讨了通过Spring Data Redis设置Redis TTL的各种方法。最后，我们查看了_RedisKeyExpiredEvent_以及如何处理过期事件。

如常，代码可在GitHub上找到。