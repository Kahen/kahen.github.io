import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-DYewWT2p.js";const a={},l=t(`<h1 id="mongodb-–-字段级加密-baeldung" tabindex="-1"><a class="header-anchor" href="#mongodb-–-字段级加密-baeldung"><span>MongoDB – 字段级加密 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将使用MongoDB的客户端字段级加密（CSFLE）来加密我们文档中选定的字段。我们将涵盖显式/自动加密和显式/自动解密，并强调加密算法之间的差异。</p><p>最终，我们将拥有一个简单的应用程序，可以插入和检索具有加密和未加密字段混合的文档。</p><h2 id="_2-场景和设置" tabindex="-1"><a class="header-anchor" href="#_2-场景和设置"><span>2. 场景和设置</span></a></h2><p>MongoDB Atlas和MongoDB Enterprise都支持自动加密。MongoDB Atlas有一个永久免费的集群，我们可以用来测试所有功能。</p><p>同样值得注意的是，字段级加密与静态存储加密不同，后者加密了整个数据库或磁盘。通过选择性地加密特定字段，我们可以在允许高效的查询和索引的同时更好地保护敏感数据。因此，我们将从一个简单的Spring Boot应用程序开始，使用Spring Data MongoDB插入和检索数据。</p><p>首先，我们将创建一个包含未加密和加密字段混合的文档类。我们将从手动加密开始，然后看看如何通过自动加密实现相同的结果。对于手动加密，我们需要一个中间对象来表示我们的加密POJO，我们将创建加密/解密每个字段的方法。</p><h3 id="_2-1-spring-boot启动器和加密依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-spring-boot启动器和加密依赖项"><span>2.1. Spring Boot启动器和加密依赖项</span></a></h3><p>首先，为了连接到MongoDB，我们需要spring-boot-starter-data-mongodb：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.springframework.boot\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`spring-boot-starter-data-mongodb\`\`&lt;/artifactId&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们添加mongodb-crypt到我们的项目中以启用加密功能：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.mongodb\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`mongodb-crypt\`\`&lt;/artifactId&gt;\`\`
    \`&lt;version&gt;\`1.7.3\`&lt;/version&gt;\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们使用的是Spring Boot，现在这就是我们唯一需要的依赖项。</p><h3 id="_2-2-创建我们的主密钥" tabindex="-1"><a class="header-anchor" href="#_2-2-创建我们的主密钥"><span>2.2. 创建我们的主密钥</span></a></h3><p><strong>主密钥用于唯一地加密和解密数据。任何拥有它的人都可以读取我们的数据。</strong> 因此，保持其安全至关重要。</p><p>MongoDB建议使用远程密钥管理服务。但是，为了简化事情，让我们创建一个本地密钥管理器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class LocalKmsUtils {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们本地密钥的唯一要求是它必须是96字节长。</strong> 我们将创建一个本地密钥存储，仅用于演示目的——我们用随机字节填充它。</p><p><strong>这个密钥只需要生成一次，所以让我们创建一个方法，如果它已经被创建了就检索它：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static byte[] readMasterKey(String path) {
    byte[] masterKey = new byte[96];

    try (FileInputStream stream = new FileInputStream(path)) {
        stream.read(masterKey, 0, 96);
    }

    return masterKey;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将创建一个方法来返回一个包含我们主密钥的映射，格式由我们稍后将创建的_ClientEncryptionSettings_所需：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static Map\`&lt;String, Map\`&lt;String, Object&gt;\`\`&gt; providersMap(String masterKeyPath) {
    File masterKeyFile = new File(masterKeyPath);
    byte[] masterKey = masterKeyFile.isFile()
      ? readMasterKey(masterKeyPath)
      : createMasterKey(masterKeyPath);

    Map\`&lt;String, Object&gt;\` masterKeyMap = new HashMap&lt;&gt;();
    masterKeyMap.put(&quot;key&quot;, masterKey);
    Map\`&lt;String, Map\`&lt;String, Object&gt;\`\`&gt; providersMap = new HashMap&lt;&gt;();
    providersMap.put(&quot;local&quot;, masterKeyMap);
    return providersMap;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它支持使用多个密钥，但在这个教程中我们只使用一个。</p><h3 id="_2-3-自定义配置" tabindex="-1"><a class="header-anchor" href="#_2-3-自定义配置"><span>2.3. 自定义配置</span></a></h3><p>为了简化配置，让我们创建一些自定义属性。然后，我们将使用一个配置类来保存这些属性，以及我们将用于加密的一两个对象。</p><p>让我们从一个指向我们本地主密钥的配置开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
public class EncryptionConfig {
    @Value(&quot;\${com.baeldung.csfle.master-key-path}&quot;)
    private String masterKeyPath;

    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们包括我们密钥库的配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Value(&quot;\${com.baeldung.csfle.key-vault.namespace}&quot;)
private String keyVaultNamespace;

@Value(&quot;\${com.baeldung.csfle.key-vault.alias}&quot;)
private String keyVaultAlias;

// getters
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>密钥库是加密密钥的集合。</strong> 因此，命名空间结合了数据库和集合名称。别名是一个简单的名称，以后用来检索我们的密钥库。</p><p>最后，让我们创建一个属性来保存我们的加密密钥ID：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private BsonBinary dataKeyId;

// getters and setters
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>稍后在我们进行MongoDB客户端配置时，它将被填充。</p><h2 id="_3-创建mongoclient和加密对象" tabindex="-1"><a class="header-anchor" href="#_3-创建mongoclient和加密对象"><span>3. 创建MongoClient和加密对象</span></a></h2><p>为了创建加密所需的对象和设置，让我们创建一个自定义的MongoDB客户端，以便我们对其配置有更多的控制。</p><p><strong>让我们通过扩展_AbstractMongoClientConfiguration_开始，添加获取连接的通常参数，并注入我们的_encryptionConfig_：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
public class MongoClientConfig extends AbstractMongoClientConfiguration {

    @Value(&quot;\${spring.data.mongodb.uri}&quot;)
    private String uri;

    @Value(&quot;\${spring.data.mongodb.database}&quot;)
    private String db;

    @Autowired
    private EncryptionConfig encryptionConfig;

    @Override
    protected String getDatabaseName() {
        return db;
    }

    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>接下来，让我们创建一个方法来返回_MongoClientSettings_对象，我们需要这个对象来创建我们的客户端和_ClientEncryption_对象。</strong> 我们将使用我们的连接_uri_变量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private MongoClientSettings clientSettings() {
    return MongoClientSettings.builder()
      .applyConnectionString(new ConnectionString(uri))
      .build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将创建我们的_ClientEncryption_ bean，它负责制作数据密钥和加密操作。它是从接收我们的_clientSettings()_、密钥库命名空间和来自我们的_providersMap()_方法的映射的_ClientEncryptionSettings_对象构建的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public ClientEncryption clientEncryption() {
    ClientEncryptionSettings encryptionSettings = ClientEncryptionSettings.builder()
      .keyVaultMongoClientSettings(clientSettings())
      .keyVaultNamespace(encryptionConfig.getKeyVaultNamespace())
      .kmsProviders(LocalKmsUtils.providersMap(encryptionConfig.getMasterKeyPath()))
      .build();

    return ClientEncryptions.create(encryptionSettings);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最后，我们将返回它以便以后用于构建我们的数据密钥。</strong></p><h3 id="_3-1-创建我们的数据密钥" tabindex="-1"><a class="header-anchor" href="#_3-1-创建我们的数据密钥"><span>3.1. 创建我们的数据密钥</span></a></h3><p><strong>在创建MongoDB客户端之前的最后一步是一个方法，如果数据密钥不存在则生成它。</strong> 接下来，我们将接收我们的_ClientEncryption_对象，以通过别名获取我们密钥库文档的引用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private BsonBinary createOrRetrieveDataKey(ClientEncryption encryption) {
    BsonDocument key = encryption.getKeyByAltName(encryptionConfig.getKeyVaultAlias());
    if (key == null) {
        createKeyUniqueIndex();

        DataKeyOptions options = new DataKeyOptions();
        options.keyAltNames(Arrays.asList(encryptionConfig.getKeyVaultAlias()));
        return encryption.createDataKey(&quot;local&quot;, options);
    } else {
        return (BsonBinary) key.get(&quot;_id&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有返回结果，我们使用_createDataKey()<em>生成密钥，传递我们的别名配置。否则，我们获取它的</em>“_id”_字段。<strong>即使我们只使用一个密钥，我们也会为_keyAltNames_字段创建一个唯一索引，这样我们就不会有创建重复别名的风险。</strong> 我们使用_createIndex()_和一个部分过滤表达式来实现这一点，因为该字段不是必需的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void createKeyUniqueIndex() {
    try (MongoClient client = MongoClients.create(clientSettings())) {
        MongoNamespace namespace = new MongoNamespace(encryptionConfig.getKeyVaultNamespace());
        MongoCollection\`&lt;Document&gt;\` keyVault = client.getDatabase(namespace.getDatabaseName())
          .getCollection(namespace.getCollectionName());

        keyVault.createIndex(Indexes.ascending(&quot;keyAltNames&quot;), new IndexOptions().unique(true)
          .partialFilterExpression(Filters.exists(&quot;keyAltNames&quot;)));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，_MongoClient_在不再使用时需要关闭。由于我们这里只需要一次来创建索引，我们使用try-with-resources块，所以使用后立即关闭。</p><h3 id="_3-2-整合以创建我们的客户端" tabindex="-1"><a class="header-anchor" href="#_3-2-整合以创建我们的客户端"><span>3.2. 整合以创建我们的客户端</span></a></h3><p>最后，让我们重写_mongoClient()_来创建我们的客户端和加密对象，然后在我们的_encryptionConfig_中存储我们的数据密钥ID。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
@Override
public MongoClient mongoClient() {
    ClientEncryption encryption = clientEncryption();
    encryptionConfig.setDataKeyId(createOrRetrieveDataKey(encryption));

    return MongoClients.create(clientSettings());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>有了所有这些设置，我们准备加密一些字段。</strong></p><h2 id="_4-加密字段的服务" tabindex="-1"><a class="header-anchor" href="#_4-加密字段的服务"><span>4. 加密字段的服务</span></a></h2><p>让我们创建一个服务类</p>`,55),s=[l];function r(d,o){return i(),n("div",null,s)}const u=e(a,[["render",r],["__file","2024-07-03-MongoDB   Field Level Encryption.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-MongoDB%20%20%20Field%20Level%20Encryption.html","title":"MongoDB – 字段级加密 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-06-02T00:00:00.000Z","category":["MongoDB","Spring Boot"],"tag":["MongoDB","Encryption","Spring Boot"],"head":[["meta",{"name":"keywords","content":"MongoDB, Field Level Encryption, CSFLE, Spring Boot, Encryption"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-MongoDB%20%20%20Field%20Level%20Encryption.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MongoDB – 字段级加密 | Baeldung"}],["meta",{"property":"og:description","content":"MongoDB – 字段级加密 | Baeldung 1. 引言 在本教程中，我们将使用MongoDB的客户端字段级加密（CSFLE）来加密我们文档中选定的字段。我们将涵盖显式/自动加密和显式/自动解密，并强调加密算法之间的差异。 最终，我们将拥有一个简单的应用程序，可以插入和检索具有加密和未加密字段混合的文档。 2. 场景和设置 MongoDB At..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T18:37:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"Encryption"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2023-06-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T18:37:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB – 字段级加密 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T18:37:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MongoDB – 字段级加密 | Baeldung 1. 引言 在本教程中，我们将使用MongoDB的客户端字段级加密（CSFLE）来加密我们文档中选定的字段。我们将涵盖显式/自动加密和显式/自动解密，并强调加密算法之间的差异。 最终，我们将拥有一个简单的应用程序，可以插入和检索具有加密和未加密字段混合的文档。 2. 场景和设置 MongoDB At..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 场景和设置","slug":"_2-场景和设置","link":"#_2-场景和设置","children":[{"level":3,"title":"2.1. Spring Boot启动器和加密依赖项","slug":"_2-1-spring-boot启动器和加密依赖项","link":"#_2-1-spring-boot启动器和加密依赖项","children":[]},{"level":3,"title":"2.2. 创建我们的主密钥","slug":"_2-2-创建我们的主密钥","link":"#_2-2-创建我们的主密钥","children":[]},{"level":3,"title":"2.3. 自定义配置","slug":"_2-3-自定义配置","link":"#_2-3-自定义配置","children":[]}]},{"level":2,"title":"3. 创建MongoClient和加密对象","slug":"_3-创建mongoclient和加密对象","link":"#_3-创建mongoclient和加密对象","children":[{"level":3,"title":"3.1. 创建我们的数据密钥","slug":"_3-1-创建我们的数据密钥","link":"#_3-1-创建我们的数据密钥","children":[]},{"level":3,"title":"3.2. 整合以创建我们的客户端","slug":"_3-2-整合以创建我们的客户端","link":"#_3-2-整合以创建我们的客户端","children":[]}]},{"level":2,"title":"4. 加密字段的服务","slug":"_4-加密字段的服务","link":"#_4-加密字段的服务","children":[]}],"git":{"createdTime":1720031862000,"updatedTime":1720031862000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.7,"words":1709},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-MongoDB   Field Level Encryption.md","localizedDate":"2023年6月2日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将使用MongoDB的客户端字段级加密（CSFLE）来加密我们文档中选定的字段。我们将涵盖显式/自动加密和显式/自动解密，并强调加密算法之间的差异。</p>\\n<p>最终，我们将拥有一个简单的应用程序，可以插入和检索具有加密和未加密字段混合的文档。</p>\\n<h2>2. 场景和设置</h2>\\n<p>MongoDB Atlas和MongoDB Enterprise都支持自动加密。MongoDB Atlas有一个永久免费的集群，我们可以用来测试所有功能。</p>\\n<p>同样值得注意的是，字段级加密与静态存储加密不同，后者加密了整个数据库或磁盘。通过选择性地加密特定字段，我们可以在允许高效的查询和索引的同时更好地保护敏感数据。因此，我们将从一个简单的Spring Boot应用程序开始，使用Spring Data MongoDB插入和检索数据。</p>","autoDesc":true}');export{u as comp,p as data};
