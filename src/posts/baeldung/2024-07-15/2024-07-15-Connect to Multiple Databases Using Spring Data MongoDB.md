---
date: 2022-04-01
category:
  - Spring Data MongoDB
  - MongoDB
tag:
  - Spring Boot
  - MongoDB
  - Configuration
head:
  - - meta
    - name: keywords
      content: Spring Data MongoDB, MongoDB, Spring Boot, Configuration
---
# 使用Spring Data MongoDB连接到多个数据库

在使用Spring Data MongoDB时，我们可以创建一个_MongoClient_来对数据库执行操作。然而，有时我们的应用程序可能需要使用多个数据库。

本教程中，**我们将创建多个连接到MongoDB的连接。我们还将添加一些Spring Boot测试来模拟此场景。**

### 2.1. 依赖设置
让我们从向_pom.xml_添加依赖开始。首先，我们需要一个spring boot starter：

```xml
`<parent>`
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-parent```</artifactId>```
    `<relativePath />`
`</parent>`
```

然后，我们需要一个web starter和data MongoDB的依赖：

```xml
``<dependency>``
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-data-mongodb```</artifactId>```
``</dependency>``
``<dependency>``
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-web```</artifactId>```
``</dependency>``
```

同样，如果我们使用Gradle，我们向_build.gradle_添加：

```groovy
plugins {
    id 'org.springframework.boot' version '2.6.4'
}

compile 'org.springframework.boot:spring-boot-starter-data-mongodb'
compile 'org.springframework.boot:spring-boot-starter-web'
```

作为替代，我们可以使用Spring Initializer。

### 2.2. 模型
**首先，让我们添加我们的模型。我们将创建两个文档，这两个文档将由两个不同的数据库使用。**

例如，我们将创建一个_User_文档：

```java
@Document(collection = "user")
public class User {

    @MongoId
    private ObjectId id;

    private String name;

    private String surname;
    private String email;

    private int age;

    // getters and setters
}
```

然后，让我们也添加一个_Account_文档：

```java
@Document(collection = "account")
public class Account {

    @MongoId
    private ObjectId id;

    private String userEmail;

    private String nickName;

    private String accountDomain;

    private String password;

    // getters and setters
}
```

### 2.3. 仓库
然后，我们为每个模型类创建一个具有一些Spring Data方法的仓库。

首先，让我们添加一个_UserRepository_：

```java
@Repository
public interface UserRepository extends MongoRepository`<User, String>` {

    User findByEmail(String email);
}
```

接下来，我们添加一个_AccountRepository_：

```java
@Repository
public interface AccountRepository extends MongoRepository`<Account, String>` {

    Account findByAccountDomain(String account);
}
```

### 2.4. 连接属性
让我们定义我们正在使用的多个数据库的属性：

```properties
mongodb.primary.host=localhost
mongodb.primary.database=db1
mongodb.primary.authenticationDatabase=admin
mongodb.primary.username=user1
mongodb.primary.password=password
mongodb.primary.port=27017

mongodb.secondary.host=localhost
mongodb.secondary.database=db2
mongodb.secondary.authenticationDatabase=admin
mongodb.secondary.username=user2
mongodb.secondary.password=password
mongodb.secondary.port=27017
```

值得注意的是，我们有一个用于认证的特定数据库的属性。

### 2.5. 主配置
现在，我们需要我们的配置。我们将为每个数据库制作一个配置。

让我们看看我们用于_UserRepository_的类定义：

```java
@Configuration
@EnableMongoRepositories(basePackageClasses = UserRepository.class, mongoTemplateRef = "primaryMongoTemplate")
@EnableConfigurationProperties
public class PrimaryConfig {
    // beans
}
```

为了演示，让我们分解所有的bean和注释。

首先，我们将使用_MongoProperties_检索并设置属性。这样，我们直接将所有属性映射到一个bean：

```java
@Bean(name = "primaryProperties")
@ConfigurationProperties(prefix = "mongodb.primary")
@Primary
public MongoProperties primaryProperties() {
    return new MongoProperties();
}
```

为了允许多个用户的访问，我们使用MongoDB认证机制与_MongoCredential_。我们通过添加一个认证数据库，这里是_admin_：

```java
@Bean(name = "primaryMongoClient")
public MongoClient mongoClient(@Qualifier("primaryProperties") MongoProperties mongoProperties) {

    MongoCredential credential = MongoCredential
      .createCredential(mongoProperties.getUsername(), mongoProperties.getAuthenticationDatabase(), mongoProperties.getPassword());

    return MongoClients.create(MongoClientSettings.builder()
      .applyToClusterSettings(builder -> builder
        .hosts(singletonList(new ServerAddress(mongoProperties.getHost(), mongoProperties.getPort()))))
      .credential(credential)
      .build());
}
```

**正如最新版本建议的，我们使用**_SimpleMongoClientDatabaseFactory_**而不是从连接字符串创建一个_MongoTemplate_：**

```java
@Primary
@Bean(name = "primaryMongoDBFactory")
public MongoDatabaseFactory mongoDatabaseFactory(
  @Qualifier("primaryMongoClient") MongoClient mongoClient,
  @Qualifier("primaryProperties") MongoProperties mongoProperties) {
    return new SimpleMongoClientDatabaseFactory(mongoClient, mongoProperties.getDatabase());
}
```

**我们需要我们的bean在这里是_@Primary_，因为我们将添加更多的数据库配置。否则，我们将陷入我们之前讨论唯一性约束。**

**我们在使用JPA映射多个_EntityManager_时也是如此，我们将需要一个对_Mongotemplate_的引用在我们的_@EnableMongoRepositories:_**

```java
@EnableMongoRepositories(basePackageClasses = UserRepository.class, mongoTemplateRef = "primaryMongoTemplate")
```

### 2.6. 次级配置
最后，为了双重检查，让我们看看第二个数据库配置：

```java
@Configuration
@EnableMongoRepositories(basePackageClasses = AccountRepository.class, mongoTemplateRef = "secondaryMongoTemplate")
@EnableConfigurationProperties
public class SecondaryConfig {

    @Bean(name = "secondaryProperties")
    @ConfigurationProperties(prefix = "mongodb.secondary")
    public MongoProperties secondaryProperties() {
        return new MongoProperties();
    }

    @Bean(name = "secondaryMongoClient")
    public MongoClient mongoClient(@Qualifier("secondaryProperties") MongoProperties mongoProperties) {

        MongoCredential credential = MongoCredential
          .createCredential(mongoProperties.getUsername(), mongoProperties.getAuthenticationDatabase(), mongoProperties.getPassword());

        return MongoClients.create(MongoClientSettings.builder()
          .applyToClusterSettings(builder -> builder
            .hosts(singletonList(new ServerAddress(mongoProperties.getHost(), mongodProperties.getPort()))))
          .credential(credential)
          .build());
    }

    @Bean(name = "secondaryMongoDBFactory")
    public MongoDatabaseFactory mongoDatabaseFactory(
      @Qualifier("secondaryMongoClient") MongoClient mongoClient,
      @Qualifier("secondaryProperties") MongoProperties mongoProperties) {
        return new SimpleMongoClientDatabaseFactory(mongoClient, mongoProperties.getDatabase());
    }

    @Bean(name = "secondaryMongoTemplate")
    public MongoTemplate mongoTemplate(@Qualifier("secondaryMongoDBFactory") MongoDatabaseFactory mongoDatabaseFactory) {
        return new MongoTemplate(mongoDatabaseFactory);
    }
}
```

在这种情况下，它将引用_AccountRepository_或属于同一包的所有类_。

### 3. 测试
我们将对MongoDB实例进行应用程序测试。我们可以使用Docker中的MongoDB。

### 3.1. 启动MongoDB容器
让我们使用Docker Compose运行MongoDB容器。让我们看看我们的YAML模板：

```yaml
services:
  mongo:
    hostname: localhost
    container_name: 'mongo'
    image: 'mongo:latest'
    expose:
      - 27017
    ports:
      - 27017:27017
    environment:
      - MONGO_INITDB_DATABASE=admin
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=admin
    volumes:
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js
```

**如果我们想要启用认证，我们需要用root用户进行初始化。为了向数据库中添加更多用户，我们添加了一个绑定到JavaScript init文件的挂载：**

```javascript
db.createUser(
    {
        user: "user1",
        pwd: "password",
        roles: [ { role: "readWrite", db: "db1" } ]
    }
)

db.createUser(
    {
        user: "user2",
        pwd: "password",
        roles: [ { role: "readWrite", db: "db2" } ]
    }
)
```

让我们运行我们的容器：

```shell
docker-compose up -d
```

当容器启动时，它为_mongo-init.js_文件创建了一个卷，并将该文件复制到容器的入口点。

### 3.2. Spring Boot测试
让我们将所有内容包装在一些基本的Spring Boot测试中：

```java
@SpringBootTest(classes = { SpringBootMultipeDbApplication.class })
@TestPropertySource("classpath:/multipledb/multidb.properties")
public class MultipleDbUnitTest {

    // setup

    @Test
    void whenFindUserByEmail_thenNameOk() {
        assertEquals("name", userRepository.findByEmail("user@gmail.com").getName());
    }

    @Test
    void whenFindAccountByDomain_thenNickNameOk() {
        assertEquals("nickname", accountRepository.findByAccountDomain("account@jira.baeldung.com