---
date: 2023-06-02
category:
  - MongoDB
  - Spring Boot
tag:
  - MongoDB
  - Encryption
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: MongoDB, Field Level Encryption, CSFLE, Spring Boot, Encryption
---

# MongoDB – 字段级加密 | Baeldung

## 1. 引言

在本教程中，我们将使用MongoDB的客户端字段级加密（CSFLE）来加密我们文档中选定的字段。我们将涵盖显式/自动加密和显式/自动解密，并强调加密算法之间的差异。

最终，我们将拥有一个简单的应用程序，可以插入和检索具有加密和未加密字段混合的文档。

## 2. 场景和设置

MongoDB Atlas和MongoDB Enterprise都支持自动加密。MongoDB Atlas有一个永久免费的集群，我们可以用来测试所有功能。

同样值得注意的是，字段级加密与静态存储加密不同，后者加密了整个数据库或磁盘。通过选择性地加密特定字段，我们可以在允许高效的查询和索引的同时更好地保护敏感数据。因此，我们将从一个简单的Spring Boot应用程序开始，使用Spring Data MongoDB插入和检索数据。

首先，我们将创建一个包含未加密和加密字段混合的文档类。我们将从手动加密开始，然后看看如何通过自动加密实现相同的结果。对于手动加密，我们需要一个中间对象来表示我们的加密POJO，我们将创建加密/解密每个字段的方法。

### 2.1. Spring Boot启动器和加密依赖项

首先，为了连接到MongoDB，我们需要spring-boot-starter-data-mongodb：

```
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-data-mongodb``</artifactId>``
``</dependency>``
```

然后，让我们添加mongodb-crypt到我们的项目中以启用加密功能：

```
``<dependency>``
    ``<groupId>``org.mongodb``</groupId>``
    ``<artifactId>``mongodb-crypt``</artifactId>``
    `<version>`1.7.3`</version>`
``</dependency>``
```

由于我们使用的是Spring Boot，现在这就是我们唯一需要的依赖项。

### 2.2. 创建我们的主密钥

**主密钥用于唯一地加密和解密数据。任何拥有它的人都可以读取我们的数据。** 因此，保持其安全至关重要。

MongoDB建议使用远程密钥管理服务。但是，为了简化事情，让我们创建一个本地密钥管理器：

```
public class LocalKmsUtils {
    public static byte[] createMasterKey(String path) {
        byte[] masterKey = new byte[96];
        new SecureRandom().nextBytes(masterKey);

        try (FileOutputStream stream = new FileOutputStream(path)) {
            stream.write(masterKey);
        }

        return masterKey;
    }

    // ...
}
```

**我们本地密钥的唯一要求是它必须是96字节长。** 我们将创建一个本地密钥存储，仅用于演示目的——我们用随机字节填充它。

**这个密钥只需要生成一次，所以让我们创建一个方法，如果它已经被创建了就检索它：**

```
public static byte[] readMasterKey(String path) {
    byte[] masterKey = new byte[96];

    try (FileInputStream stream = new FileInputStream(path)) {
        stream.read(masterKey, 0, 96);
    }

    return masterKey;
}
```

最后，我们将创建一个方法来返回一个包含我们主密钥的映射，格式由我们稍后将创建的_ClientEncryptionSettings_所需：

```
public static Map`<String, Map`<String, Object>``> providersMap(String masterKeyPath) {
    File masterKeyFile = new File(masterKeyPath);
    byte[] masterKey = masterKeyFile.isFile()
      ? readMasterKey(masterKeyPath)
      : createMasterKey(masterKeyPath);

    Map`<String, Object>` masterKeyMap = new HashMap<>();
    masterKeyMap.put("key", masterKey);
    Map`<String, Map`<String, Object>``> providersMap = new HashMap<>();
    providersMap.put("local", masterKeyMap);
    return providersMap;
}
```

它支持使用多个密钥，但在这个教程中我们只使用一个。

### 2.3. 自定义配置

为了简化配置，让我们创建一些自定义属性。然后，我们将使用一个配置类来保存这些属性，以及我们将用于加密的一两个对象。

让我们从一个指向我们本地主密钥的配置开始：

```
@Configuration
public class EncryptionConfig {
    @Value("${com.baeldung.csfle.master-key-path}")
    private String masterKeyPath;

    // ...
}
```

然后，让我们包括我们密钥库的配置：

```
@Value("${com.baeldung.csfle.key-vault.namespace}")
private String keyVaultNamespace;

@Value("${com.baeldung.csfle.key-vault.alias}")
private String keyVaultAlias;

// getters
```

**密钥库是加密密钥的集合。** 因此，命名空间结合了数据库和集合名称。别名是一个简单的名称，以后用来检索我们的密钥库。

最后，让我们创建一个属性来保存我们的加密密钥ID：

```
private BsonBinary dataKeyId;

// getters and setters
```

稍后在我们进行MongoDB客户端配置时，它将被填充。

## 3. 创建MongoClient和加密对象

为了创建加密所需的对象和设置，让我们创建一个自定义的MongoDB客户端，以便我们对其配置有更多的控制。

**让我们通过扩展_AbstractMongoClientConfiguration_开始，添加获取连接的通常参数，并注入我们的_encryptionConfig_：**

```
@Configuration
public class MongoClientConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String uri;

    @Value("${spring.data.mongodb.database}")
    private String db;

    @Autowired
    private EncryptionConfig encryptionConfig;

    @Override
    protected String getDatabaseName() {
        return db;
    }

    // ...
}
```

**接下来，让我们创建一个方法来返回_MongoClientSettings_对象，我们需要这个对象来创建我们的客户端和_ClientEncryption_对象。** 我们将使用我们的连接_uri_变量：

```
private MongoClientSettings clientSettings() {
    return MongoClientSettings.builder()
      .applyConnectionString(new ConnectionString(uri))
      .build();
}
```

然后，我们将创建我们的_ClientEncryption_ bean，它负责制作数据密钥和加密操作。它是从接收我们的_clientSettings()_、密钥库命名空间和来自我们的_providersMap()_方法的映射的_ClientEncryptionSettings_对象构建的：

```
@Bean
public ClientEncryption clientEncryption() {
    ClientEncryptionSettings encryptionSettings = ClientEncryptionSettings.builder()
      .keyVaultMongoClientSettings(clientSettings())
      .keyVaultNamespace(encryptionConfig.getKeyVaultNamespace())
      .kmsProviders(LocalKmsUtils.providersMap(encryptionConfig.getMasterKeyPath()))
      .build();

    return ClientEncryptions.create(encryptionSettings);
}
```

**最后，我们将返回它以便以后用于构建我们的数据密钥。**

### 3.1. 创建我们的数据密钥

**在创建MongoDB客户端之前的最后一步是一个方法，如果数据密钥不存在则生成它。** 接下来，我们将接收我们的_ClientEncryption_对象，以通过别名获取我们密钥库文档的引用：

```
private BsonBinary createOrRetrieveDataKey(ClientEncryption encryption) {
    BsonDocument key = encryption.getKeyByAltName(encryptionConfig.getKeyVaultAlias());
    if (key == null) {
        createKeyUniqueIndex();

        DataKeyOptions options = new DataKeyOptions();
        options.keyAltNames(Arrays.asList(encryptionConfig.getKeyVaultAlias()));
        return encryption.createDataKey("local", options);
    } else {
        return (BsonBinary) key.get("_id");
    }
}
```

如果没有返回结果，我们使用_createDataKey()_生成密钥，传递我们的别名配置。否则，我们获取它的_“_id”_字段。**即使我们只使用一个密钥，我们也会为_keyAltNames_字段创建一个唯一索引，这样我们就不会有创建重复别名的风险。** 我们使用_createIndex()_和一个部分过滤表达式来实现这一点，因为该字段不是必需的：

```
private void createKeyUniqueIndex() {
    try (MongoClient client = MongoClients.create(clientSettings())) {
        MongoNamespace namespace = new MongoNamespace(encryptionConfig.getKeyVaultNamespace());
        MongoCollection`<Document>` keyVault = client.getDatabase(namespace.getDatabaseName())
          .getCollection(namespace.getCollectionName());

        keyVault.createIndex(Indexes.ascending("keyAltNames"), new IndexOptions().unique(true)
          .partialFilterExpression(Filters.exists("keyAltNames")));
    }
}
```

值得注意的是，_MongoClient_在不再使用时需要关闭。由于我们这里只需要一次来创建索引，我们使用try-with-resources块，所以使用后立即关闭。

### 3.2. 整合以创建我们的客户端

最后，让我们重写_mongoClient()_来创建我们的客户端和加密对象，然后在我们的_encryptionConfig_中存储我们的数据密钥ID。

```
@Bean
@Override
public MongoClient mongoClient() {
    ClientEncryption encryption = clientEncryption();
    encryptionConfig.setDataKeyId(createOrRetrieveDataKey(encryption));

    return MongoClients.create(clientSettings());
}
```

**有了所有这些设置，我们准备加密一些字段。**

## 4. 加密字段的服务

让我们创建一个服务类