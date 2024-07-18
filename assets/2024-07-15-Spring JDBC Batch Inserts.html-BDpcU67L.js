import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a as t}from"./app-D-iieyON.js";const s={},d=t(`<hr><h1 id="spring-jdbc批量插入操作" tabindex="-1"><a class="header-anchor" href="#spring-jdbc批量插入操作"><span>Spring JDBC批量插入操作</span></a></h1><p>在本教程中，我们将学习如何使用Spring JDBC批量支持有效地将大量数据插入我们的目标关系数据库管理系统(RDBMS)，并比较使用批量插入与多个单独插入的性能差异。</p><h2 id="_2-理解批量处理" tabindex="-1"><a class="header-anchor" href="#_2-理解批量处理"><span>2. 理解批量处理</span></a></h2><p>一旦我们的应用程序建立与数据库的连接，我们可以一次性执行多个SQL语句，而不是逐个发送每个语句。这样，我们显著减少了通信开销。</p><p>实现此目的的一个选项是使用Spring JDBC API，这是以下部分的重点。</p><h3 id="_2-1-支持的数据库" tabindex="-1"><a class="header-anchor" href="#_2-1-支持的数据库"><span>2.1. 支持的数据库</span></a></h3><p>尽管JDBC API提供了批量功能，但我们使用的底层JDBC驱动程序实际上是否实现了这些API并支持此功能并不保证。</p><p>Spring提供了一个实用方法称为_JdbcUtils.supportsBatchUpdates()<em>，它接受一个JDBC_连接_作为参数，并简单地返回_true_或_false</em>。<strong>然而，在大多数情况下，使用_JdbcTemplate_ API时，Spring已经为我们检查了这一点，否则会回退到常规行为。</strong></p><h3 id="_2-2-可能影响整体性能的因素" tabindex="-1"><a class="header-anchor" href="#_2-2-可能影响整体性能的因素"><span>2.2. 可能影响整体性能的因素</span></a></h3><p>在插入大量数据时，有几个<strong>方面我们应该考虑</strong>：</p><ul><li>我们创建与数据库服务器通信的连接数量</li><li>我们正在插入的表</li><li>执行单个逻辑任务时我们对数据库的请求数量</li></ul><p>通常，为了克服第一点，<strong>我们使用连接池</strong>。这有助于通过重用现有连接而不是创建新连接。</p><p>另一个重要点是目标表。更确切地说，我们拥有的索引列越多，性能就越差，因为数据库服务器需要在每行新数据后调整索引。</p><p>最后，<strong>我们可以使用批量支持来减少插入大量条目的往返次数</strong>。</p><p>然而，我们应该意识到，即使它们支持批量操作，也不是所有的JDBC驱动程序/数据库服务器都提供相同级别的效率。例如，像Oracle、Postgres、SQL Server和DB2这样的数据库服务器提供了显著的增益，而MySQL在没有额外配置的情况下提供的增益较差。</p><p>在这个例子中，<strong>我们将使用Postgres 14作为我们的数据库服务器</strong>。因此，我们需要将相应的postgresql JDBC驱动添加到我们的依赖项中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.postgresql\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`postgresql\`\`&lt;/artifactId&gt;\`\`
    \`&lt;scope&gt;\`runtime\`&lt;/scope&gt;\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，为了使用Spring的JDBC抽象，让我们也添加spring-boot-starter-jdbc依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.springframework.boot\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`spring-boot-starter-jdbc\`\`&lt;/artifactId&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了演示目的，<strong>我们将探索两种不同的方法</strong>：首先，我们将为每条记录执行常规插入，然后我们将尝试利用批量支持。在任一情况下，我们都将使用单个事务。</p><p>让我们从我们简单的_Product_表开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE TABLE product (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(40),
    created_ts      timestamp without time zone,
    price           numeric
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是相应的模型_Product_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Product {
    private long id;
    private String title;
    private LocalDateTime createdTs;
    private BigDecimal price;

    // 标准setter和getter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-配置数据源" tabindex="-1"><a class="header-anchor" href="#_3-1-配置数据源"><span>3.1. 配置数据源</span></a></h3><p>通过将以下配置添加到我们的_application.properties_中，Spring Boot为我们创建了一个_DataSource_和一个_JdbcTemplate_ bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.datasource.url=jdbc:postgresql://localhost:5432/sample-baeldung-db
spring.datasource.username=postgres
spring.datasource.password=root
spring.datasource.driver-class-name=org.postgresql.Driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-准备常规插入" tabindex="-1"><a class="header-anchor" href="#_3-2-准备常规插入"><span>3.2. 准备常规插入</span></a></h3><p>我们首先创建一个简单的存储库接口来保存产品列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface ProductRepository {
    void saveAll(List\`\`\`\`\`&lt;Product&gt;\`\`\`\`\` products);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后第一个实现简单地遍历产品并在同一个事务中逐个插入它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository
public class SimpleProductRepository implements ProductRepository {

    private JdbcTemplate jdbcTemplate;

    public SimpleProductRepository(JdbcTemplate jdbcTemplate) {
      this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public void saveAll(List\`\`\`\`\`&lt;Product&gt;\`\`\`\`\` products) {
      for (Product product : products) {
        jdbcTemplate.update(&quot;INSERT INTO PRODUCT (TITLE, CREATED_TS, PRICE) &quot;
          + &quot;VALUES (?, ?, ?)&quot;,
          product.getTitle(),
          Timestamp.valueOf(product.getCreatedTs()),
          product.getPrice());
      }
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们需要一个服务类_ProductService_，它生成给定数量的Product对象并启动插入过程。首先，我们有一个方法来生成给定数量的_Product_实例，使用一些预定义的值以随机方式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class ProductService {

    private ProductRepository productRepository;
    private Random random;
    private Clock clock;

    // 依赖项的构造函数

    private List\`\`\`\`\`&lt;Product&gt;\`\`\`\`\` generate(int count) {
        final String[] titles = { &quot;car&quot;, &quot;plane&quot;, &quot;house&quot;, &quot;yacht&quot; };
        final BigDecimal[] prices = {
          new BigDecimal(&quot;12483.12&quot;),
          new BigDecimal(&quot;8539.99&quot;),
          new BigDecimal(&quot;88894&quot;),
          new BigDecimal(&quot;458694&quot;)
        };

        final List\`\`\`\`\`&lt;Product&gt;\`\`\`\`\` products = new ArrayList&lt;&gt;(count);

        for (int i = 0; i &lt; count; i++) {
            Product product = new Product();
            product.setCreatedTs(LocalDateTime.now(clock));
            product.setPrice(prices[random.nextInt(4)]);
            product.setTitle(titles[random.nextInt(4)]);
            products.add(product);
        }
        return products;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，在_ProductService_类中添加另一个方法，它接受生成的_Product_实例并插入它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Transactional
public long createProducts(int count) {
  List\`\`\`\`\`&lt;Product&gt;\`\`\`\`\` products = generate(count);
  long startTime = clock.millis();
  productRepository.saveAll(products);
  return clock.millis() - startTime;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了使_ProductService_成为Spring bean，让我们也添加以下配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
public class AppConfig {

    @Bean
    public ProductService simpleProductService(SimpleProductRepository simpleProductRepository) {
      return new ProductService(simpleProductRepository, new Random(), Clock.systemUTC());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这个_ProductService_ bean使用_SimpleProductRepository_执行常规插入。</p><h3 id="_3-3-准备批量插入" tabindex="-1"><a class="header-anchor" href="#_3-3-准备批量插入"><span>3.3. 准备批量插入</span></a></h3><p>现在，是时候看看Spring JDBC批量支持的实际效果了。首先，让我们开始创建我们的_ProductRepository_类的另一个批量实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository
public class BatchProductRepository implements ProductRepository {

    private JdbcTemplate jdbcTemplate;

    public BatchProductRepository(JdbcTemplate jdbcTemplate) {
      this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public void saveAll(List\`\`\`\`\`&lt;Product&gt;\`\`\`\`\` products) {
      jdbcTemplate.batchUpdate(&quot;INSERT INTO PRODUCT (TITLE, CREATED_TS, PRICE) &quot;
        + &quot;VALUES (?, ?, ?)&quot;,
        products,
        100,
        (PreparedStatement ps, Product product) -&gt; {
          ps.setString(1, product.getTitle());
          ps.setTimestamp(2, Timestamp.valueOf(product.getCreatedTs()));
          ps.setBigDecimal(3, product.getPrice());
        });
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里需要注意的是，在这个例子中我们使用批量大小100。这意味着Spring将每100个插入命令批量处理并分别发送。换句话说，它将帮助我们减少100次往返次数。</p><p><strong>通常，推荐的批量大小是50-100，但这高度依赖于我们的数据库服务器配置和每批量包的大小。</strong></p><p>例如，MySQL Server有一个配置属性叫做_max_allowed_packet_，每个网络包的限额为64MB。在设置批量大小时，我们需要小心不要超过我们的数据库服务器限制。</p><p>现在，在_AppConfig_类中添加一个额外的_ProductService_ bean配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public ProductService batchProductService(BatchProductRepository batchProductRepository) {
  return new ProductService(batchProductRepository, new Random(), Clock.systemUTC());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-性能比较" tabindex="-1"><a class="header-anchor" href="#_4-性能比较"><span>4. 性能比较</span></a></h2><p>是时候运行我们的例子并看看基准测试了。为了简单起见，我们通过实现Spring提供的_CommandLineRunner_接口准备了一个命令行Spring Boot应用程序。我们多次运行我们的例子，分别使用两种方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@SpringBootApplication
public class SpringJdbcBatchPerformanceApplication implements CommandLineRunner {

    @Autowired
    @Qualifier(&quot;batchProductService&quot;)
    private ProductService batchProductService;
    @Autowired
    @Qualifier(&quot;simpleProductService&quot;)
    private ProductService simpleProductService;

    public static void main(String[] args) {
      SpringApplication.run(SpringJdbcBatchPerformanceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
      int[] recordCounts = {1, 10, 100, 1000, 10_000, 100_000, 1000_000};

      for (int recordCount : recordCounts) {
        long regularElapsedTime = simpleProductService.createProducts(recordCount);
        long batchElapsedTime = batchProductService.createProducts(recordCount);

        System.out.println(String.join(&quot;&quot;, Collections.nCopies(50, &quot;-&quot;)));
        System.out.format(&quot;%-20s%-5s%-10s%-5s%8sms\\n&quot;, &quot;Regular inserts&quot;, &quot;|&quot;, recordCount,</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,51),r=[d];function l(a,c){return n(),i("div",null,r)}const v=e(s,[["render",l],["__file","2024-07-15-Spring JDBC Batch Inserts.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Spring%20JDBC%20Batch%20Inserts.html","title":"Spring JDBC批量插入操作","lang":"zh-CN","frontmatter":{"date":"2024-07-16T00:00:00.000Z","category":["Spring","JDBC"],"tag":["Batch Inserts","Performance"],"head":[["meta",{"name":"keywords","content":"Spring JDBC, Batch Inserts, Performance Comparison, Multi-Value Inserts"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Spring%20JDBC%20Batch%20Inserts.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring JDBC批量插入操作"}],["meta",{"property":"og:description","content":"Spring JDBC批量插入操作 在本教程中，我们将学习如何使用Spring JDBC批量支持有效地将大量数据插入我们的目标关系数据库管理系统(RDBMS)，并比较使用批量插入与多个单独插入的性能差异。 2. 理解批量处理 一旦我们的应用程序建立与数据库的连接，我们可以一次性执行多个SQL语句，而不是逐个发送每个语句。这样，我们显著减少了通信开销。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T19:07:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Batch Inserts"}],["meta",{"property":"article:tag","content":"Performance"}],["meta",{"property":"article:published_time","content":"2024-07-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T19:07:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring JDBC批量插入操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T19:07:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring JDBC批量插入操作 在本教程中，我们将学习如何使用Spring JDBC批量支持有效地将大量数据插入我们的目标关系数据库管理系统(RDBMS)，并比较使用批量插入与多个单独插入的性能差异。 2. 理解批量处理 一旦我们的应用程序建立与数据库的连接，我们可以一次性执行多个SQL语句，而不是逐个发送每个语句。这样，我们显著减少了通信开销。 ..."},"headers":[{"level":2,"title":"2. 理解批量处理","slug":"_2-理解批量处理","link":"#_2-理解批量处理","children":[{"level":3,"title":"2.1. 支持的数据库","slug":"_2-1-支持的数据库","link":"#_2-1-支持的数据库","children":[]},{"level":3,"title":"2.2. 可能影响整体性能的因素","slug":"_2-2-可能影响整体性能的因素","link":"#_2-2-可能影响整体性能的因素","children":[]},{"level":3,"title":"3.1. 配置数据源","slug":"_3-1-配置数据源","link":"#_3-1-配置数据源","children":[]},{"level":3,"title":"3.2. 准备常规插入","slug":"_3-2-准备常规插入","link":"#_3-2-准备常规插入","children":[]},{"level":3,"title":"3.3. 准备批量插入","slug":"_3-3-准备批量插入","link":"#_3-3-准备批量插入","children":[]}]},{"level":2,"title":"4. 性能比较","slug":"_4-性能比较","link":"#_4-性能比较","children":[]}],"git":{"createdTime":1721070449000,"updatedTime":1721070449000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.47,"words":1640},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Spring JDBC Batch Inserts.md","localizedDate":"2024年7月16日","excerpt":"<hr>\\n<h1>Spring JDBC批量插入操作</h1>\\n<p>在本教程中，我们将学习如何使用Spring JDBC批量支持有效地将大量数据插入我们的目标关系数据库管理系统(RDBMS)，并比较使用批量插入与多个单独插入的性能差异。</p>\\n<h2>2. 理解批量处理</h2>\\n<p>一旦我们的应用程序建立与数据库的连接，我们可以一次性执行多个SQL语句，而不是逐个发送每个语句。这样，我们显著减少了通信开销。</p>\\n<p>实现此目的的一个选项是使用Spring JDBC API，这是以下部分的重点。</p>\\n<h3>2.1. 支持的数据库</h3>\\n<p>尽管JDBC API提供了批量功能，但我们使用的底层JDBC驱动程序实际上是否实现了这些API并支持此功能并不保证。</p>","autoDesc":true}');export{v as comp,p as data};
