import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a as t}from"./app-DNwYcgl6.js";const l={},d=t(`<hr><h1 id="如何使用spring-jpa实现软删除" tabindex="-1"><a class="header-anchor" href="#如何使用spring-jpa实现软删除"><span>如何使用Spring JPA实现软删除</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>从数据库中物理删除数据是一种常见的需求。但有时，业务需求要求我们不要从数据库中永久删除数据。这些需求可能包括数据历史跟踪或审计以及与引用完整性相关的需求。</p><p>与其物理删除数据，不如只是隐藏这些数据，使其无法从应用程序前端访问。</p><p><strong>在本教程中，我们将学习软删除以及如何使用Spring JPA实现这种技术。</strong></p><h2 id="_2-什么是软删除" tabindex="-1"><a class="header-anchor" href="#_2-什么是软删除"><span>2. 什么是软删除？</span></a></h2><p><strong>软删除执行更新过程，标记某些数据为已删除，而不是从数据库表中物理删除。</strong> 实现软删除的一种常见方式是添加一个字段，指示数据是否已被删除。</p><p>例如，假设我们有一个具有以下结构的产品表：<img src="https://www.baeldung.com/wp-content/uploads/2021/05/table1.png" alt="img" loading="lazy"></p><p>现在让我们看看当我们从表中物理删除记录时将运行的SQL命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>delete from table_product where id=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这条SQL命令将永久从数据库表中删除具有_id=1_的产品。</p><p>现在让我们实现上述的软删除机制：<img src="https://baeldung.com/wp-content/uploads/2021/05/table2.png" alt="img" loading="lazy"></p><p>注意我们添加了一个名为_deleted_的新字段。此字段将包含值_0_或_1_。</p><p>值_1_将表示数据已被删除，而_0_将表示数据尚未被删除。我们应该将_0_设置为默认值，对于每个数据删除过程，我们不运行SQL删除命令，而是运行以下SQL更新命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>update from table_product set deleted=1 where id=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用这条SQL命令，我们实际上并没有删除行，而只是将其标记为已删除。因此，当我们要执行读取查询时，我们只想获取那些尚未被删除的行，我们应该在我们的SQL查询中添加一个过滤器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>select * from table_product where deleted=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用Spring JPA实现软删除变得更加容易。我们只需要为此目的添加一些JPA注解。</p><p>正如我们所知，我们通常只使用几种SQL命令与JPA。它将在幕后创建并执行大多数SQL查询。</p><p>现在让我们使用与上述相同的表示例在Spring JPA中实现软删除。</p><h3 id="_3-1-实体类" tabindex="-1"><a class="header-anchor" href="#_3-1-实体类"><span>3.1. 实体类</span></a></h3><p>最重要的部分是创建实体类。</p><p>让我们创建一个_Product_实体类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
@Table(name = &quot;table_product&quot;)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private boolean deleted = Boolean.FALSE;

    // setter getter 方法
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们添加了一个_deleted_属性，并将默认值设置为_FALSE_。</p><p>下一步将是覆盖JPA仓库中的_delete_命令。</p><p>默认情况下，JPA仓库中的删除命令将运行SQL删除查询，因此让我们首先向我们的实体类添加一些注解：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
@Table(name = &quot;table_product&quot;)
@SQLDelete(sql = &quot;UPDATE table_product SET deleted = true WHERE id=?&quot;)
@Where(clause = &quot;deleted=false&quot;)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private boolean deleted = Boolean.FALSE;

    // setter getter 方法
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们使用_@SQLDelete_注解来覆盖删除命令。</strong> 每次我们执行删除命令时，实际上<strong>将其变成了一个SQL更新命令，将deleted字段的值更改为true</strong>，而不是永久删除数据。</p><p><strong>另一方面，_@Where_注解将在我们读取产品数据时添加一个过滤器。</strong> 因此，根据上述代码示例，具有_value deleted = true_的产品数据将不会被包含在结果中。</p><h3 id="_3-2-仓库" tabindex="-1"><a class="header-anchor" href="#_3-2-仓库"><span>3.2. 仓库</span></a></h3><p>在仓库类中没有特别的更改，我们可以像在Spring Boot应用程序中那样编写常规的仓库类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface ProductRepository extends CrudRepository\`&lt;Product, Long&gt;\`{
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-服务" tabindex="-1"><a class="header-anchor" href="#_3-3-服务"><span>3.3. 服务</span></a></h3><p>对于服务类，目前也没有什么特别的。我们可以调用我们想要的仓库函数。</p><p>在这个例子中，让我们调用三个仓库函数来创建记录，然后执行软删除：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public void remove(Long id){
        productRepository.deleteById(id);
    }

    public Iterable\`\`\`&lt;Product&gt;\`\`\` findAll(){
        return productRepository.findAll();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-如何获取已删除的数据" tabindex="-1"><a class="header-anchor" href="#_4-如何获取已删除的数据"><span>4. 如何获取已删除的数据？</span></a></h2><p>通过使用_@Where_注解，我们无法获取已删除的产品数据，以防我们仍然希望已删除的数据可访问。一个例子是具有管理员级别权限的用户，他们可以完全访问并查看已被“删除”的数据。</p><p><strong>为了实现这一点，我们不应该使用_@Where_注解</strong> <strong>而是使用两种不同的注解，<em>@FilterDef_和</em>@Filter_</strong>。通过这些注解，我们可以按需动态添加条件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
@Table(name = &quot;tbl_products&quot;)
@SQLDelete(sql = &quot;UPDATE tbl_products SET deleted = true WHERE id=?&quot;)
@FilterDef(name = &quot;deletedProductFilter&quot;, parameters = @ParamDef(name = &quot;isDeleted&quot;, type = &quot;boolean&quot;))
@Filter(name = &quot;deletedProductFilter&quot;, condition = &quot;deleted = :isDeleted&quot;)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private boolean deleted = Boolean.FALSE;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里_@FilterDef_注解定义了将由@ _Filter_注解使用的基本信息。此外，我们还需要在_ProductService_服务类中更改_findAll()_函数，以处理动态参数或过滤器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager entityManager;

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public void remove(Long id){
        productRepository.deleteById(id);
    }

    public Iterable\`\`\`&lt;Product&gt;\`\`\` findAll(boolean isDeleted){
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter(&quot;deletedProductFilter&quot;);
        filter.setParameter(&quot;isDeleted&quot;, isDeleted);
        Iterable\`\`\`&lt;Product&gt;\`\`\` products =  productRepository.findAll();
        session.disableFilter(&quot;deletedProductFilter&quot;);
        return products;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们添加了_isDeleted_参数，我们将将其添加到对象_Filter_中，影响读取_Product_实体的过程。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>使用Spring JPA实现软删除技术很容易。我们需要做的是定义一个字段，存储一行是否已被删除。然后我们使用_@SQLDelete_注解覆盖该特定实体类的删除命令。</p><p>如果我们想要更多的控制，我们可以使用_@FilterDef_和_@Filter_注解，这样我们就可以决定查询结果是否应包括已删除的数据。</p><p>本文中的所有代码都可以在GitHub上找到。</p>`,49),a=[d];function r(s,o){return n(),i("div",null,a)}const p=e(l,[["render",r],["__file","2024-07-29-How to Implement a Soft Delete with Spring JPA.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-29/2024-07-29-How%20to%20Implement%20a%20Soft%20Delete%20with%20Spring%20JPA.html","title":"如何使用Spring JPA实现软删除","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring JPA","Soft Delete"],"tag":["Spring","JPA","Soft Delete"],"head":[["meta",{"name":"keywords","content":"Spring JPA, Soft Delete, 数据库, 实体类, 软删除"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-29/2024-07-29-How%20to%20Implement%20a%20Soft%20Delete%20with%20Spring%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Spring JPA实现软删除"}],["meta",{"property":"og:description","content":"如何使用Spring JPA实现软删除 1. 引言 从数据库中物理删除数据是一种常见的需求。但有时，业务需求要求我们不要从数据库中永久删除数据。这些需求可能包括数据历史跟踪或审计以及与引用完整性相关的需求。 与其物理删除数据，不如只是隐藏这些数据，使其无法从应用程序前端访问。 在本教程中，我们将学习软删除以及如何使用Spring JPA实现这种技术。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/05/table1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-29T21:27:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"Soft Delete"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-29T21:27:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Spring JPA实现软删除\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/05/table1.png\\",\\"https://baeldung.com/wp-content/uploads/2021/05/table2.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-29T21:27:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Spring JPA实现软删除 1. 引言 从数据库中物理删除数据是一种常见的需求。但有时，业务需求要求我们不要从数据库中永久删除数据。这些需求可能包括数据历史跟踪或审计以及与引用完整性相关的需求。 与其物理删除数据，不如只是隐藏这些数据，使其无法从应用程序前端访问。 在本教程中，我们将学习软删除以及如何使用Spring JPA实现这种技术。 ..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 什么是软删除？","slug":"_2-什么是软删除","link":"#_2-什么是软删除","children":[{"level":3,"title":"3.1. 实体类","slug":"_3-1-实体类","link":"#_3-1-实体类","children":[]},{"level":3,"title":"3.2. 仓库","slug":"_3-2-仓库","link":"#_3-2-仓库","children":[]},{"level":3,"title":"3.3. 服务","slug":"_3-3-服务","link":"#_3-3-服务","children":[]}]},{"level":2,"title":"4. 如何获取已删除的数据？","slug":"_4-如何获取已删除的数据","link":"#_4-如何获取已删除的数据","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1722288462000,"updatedTime":1722288462000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.97,"words":1490},"filePathRelative":"posts/baeldung/2024-07-29/2024-07-29-How to Implement a Soft Delete with Spring JPA.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何使用Spring JPA实现软删除</h1>\\n<h2>1. 引言</h2>\\n<p>从数据库中物理删除数据是一种常见的需求。但有时，业务需求要求我们不要从数据库中永久删除数据。这些需求可能包括数据历史跟踪或审计以及与引用完整性相关的需求。</p>\\n<p>与其物理删除数据，不如只是隐藏这些数据，使其无法从应用程序前端访问。</p>\\n<p><strong>在本教程中，我们将学习软删除以及如何使用Spring JPA实现这种技术。</strong></p>\\n<h2>2. 什么是软删除？</h2>\\n<p><strong>软删除执行更新过程，标记某些数据为已删除，而不是从数据库表中物理删除。</strong> 实现软删除的一种常见方式是添加一个字段，指示数据是否已被删除。</p>","autoDesc":true}');export{p as comp,v as data};
