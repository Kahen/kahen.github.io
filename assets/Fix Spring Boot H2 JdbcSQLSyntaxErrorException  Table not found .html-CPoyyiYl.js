import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-DI0Ohe7a.js";const a={},r=i(`<h1 id="修复spring-boot-h2-jdbcsqlsyntaxerrorexception-找不到表-baeldung" tabindex="-1"><a class="header-anchor" href="#修复spring-boot-h2-jdbcsqlsyntaxerrorexception-找不到表-baeldung"><span>修复Spring Boot H2 JdbcSQLSyntaxErrorException “找不到表” | Baeldung</span></a></h1><h3 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h3><p>H2提供了一个简单的内存数据库和轻量级数据库，Spring Boot可以自动配置，使开发人员能够轻松测试数据访问逻辑。</p><p>通常，正如其名称所示，_org.h2.jdbc.JdbcSQLSyntaxErrorException_被抛出以表示与SQL语法相关的错误。因此，消息“找不到表”表示H2未能找到指定的表。</p><p>因此，在本简短教程中，我们将学习如何产生并修复H2异常：<em>JdbcSQLSyntaxErrorException: 找不到表</em>。</p><h3 id="_2-实践示例" tabindex="-1"><a class="header-anchor" href="#_2-实践示例"><span>2. 实践示例</span></a></h3><p>现在我们知道了异常背后的原因，让我们看看如何在实践中重现它。</p><h4 id="_2-1-h2配置" tabindex="-1"><a class="header-anchor" href="#_2-1-h2配置"><span>2.1. H2配置</span></a></h4><p>Spring Boot配置应用程序使用嵌入式数据库H2连接，使用用户名_sa_和空密码。因此，让我们将这些属性添加到_application.properties_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.datasource.url=jdbc:h2:mem:mydb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们假设我们有一个名为_person_的表。这里，我们将使用一个基本的SQL脚本来用数据填充数据库。默认情况下，Spring Boot会拾取_data.sql_文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>INSERT INTO &quot;person&quot; VALUES (1, &#39;Abderrahim&#39;, &#39;Azhrioun&#39;);
INSERT INTO &quot;person&quot; VALUES (2, &#39;David&#39;, &#39;Smith&#39;);
INSERT INTO &quot;person&quot; VALUES (3, &#39;Jean&#39;, &#39;Anderson&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-对象关系映射" tabindex="-1"><a class="header-anchor" href="#_2-2-对象关系映射"><span>2.2. 对象关系映射</span></a></h4><p>接下来，让我们将表_person_映射到一个实体。为此，我们将依赖JPA注解。</p><p>例如，考虑_Person_实体：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
public class Person {

    @Id
    private int id;
    @Column
    private String firstName;
    @Column
    private String lastName;

    // 标准getter和setter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总的来说，<em>@Entity_注解表示我们的类是一个映射_person_表的实体。此外，</em>@Id_表示_id_属性代表主键，而_@Column_注解允许将表列绑定到实体字段。</p><p>接下来，让我们为实体_Person_创建一个JPA仓库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository
public interface PersonRepository extends JpaRepository\`&lt;Person, Integer&gt;\` {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，Spring Data JPA提供了_JpaRepository_接口，以简化存储和检索数据的逻辑。</p><p>现在，让我们尝试启动我们的Spring Boot应用程序，看看会发生什么。<strong>查看日志，我们可以看到应用程序在启动时失败，出现_org.h2.jdbc.JdbcSQLSyntaxErrorException: 找不到表“person”_</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Error starting ApplicationContext. To display the condition evaluation report re-run your application with &#39;debug&#39; enabled.
...
at com.baeldung.h2.tablenotfound.TableNotFoundExceptionApplication.main(TableNotFoundExceptionApplication.java:10)
...
Caused by: org.h2.jdbc.JdbcSQLSyntaxErrorException: Table &quot;person&quot; not found (this database is empty); SQL statement:
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这里出问题的是_data.sql_脚本在Hibernate初始化之前执行</strong>。<strong>这就是为什么Hibernate找不到_person_表的原因</strong>。</p><p>通常，这是现在的默认行为，以使基于脚本的初始化与其他数据库迁移工具（如Liquibase和Flyway）保持一致。</p><h3 id="_3-解决方案" tabindex="-1"><a class="header-anchor" href="#_3-解决方案"><span>3. 解决方案</span></a></h3><p>幸运的是，Spring Boot提供了一种方便的方式来解决这个限制。<strong>我们可以简单地将属性_spring.jpa.defer-datasource-initialization_设置为_true_在_application.properties_中以避免异常</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.jpa.defer-datasource-initialization=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>这样，我们覆盖了默认行为，并将数据初始化推迟到Hibernate初始化之后</strong>。</p><p>最后，让我们添加一个测试用例来确认一切按预期工作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@SpringBootTest(classes = TableNotFoundExceptionApplication.class)
class TableNotFoundExceptionIntegrationTest {

    @Autowired
    private PersonRepository personRepository;

    @Test
    void givenValidInitData_whenCallingFindAll_thenReturnData() {
        assertEquals(3, personRepository.findAll().size());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不出所料，测试成功通过。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在这篇简短的文章中，我们了解了H2抛出错误_JdbcSQLSyntaxErrorException_: _Table not found_的原因。然后，我们看到了如何在实践中重现异常以及如何修复它。</p><p>如常，示例的完整源代码可在GitHub上找到。</p><p>发表文章后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,35),o=[r];function d(s,l){return t(),n("div",null,o)}const u=e(a,[["render",d],["__file","Fix Spring Boot H2 JdbcSQLSyntaxErrorException  Table not found .html.vue"]]),b=JSON.parse('{"path":"/posts/baeldung/Archive/Fix%20Spring%20Boot%20H2%20JdbcSQLSyntaxErrorException%20%20Table%20not%20found%20.html","title":"修复Spring Boot H2 JdbcSQLSyntaxErrorException “找不到表” | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["Spring Boot","H2 Database"],"tag":["SQL Syntax Error","Table Not Found"],"description":"修复Spring Boot H2 JdbcSQLSyntaxErrorException “找不到表” | Baeldung 1. 引言 H2提供了一个简单的内存数据库和轻量级数据库，Spring Boot可以自动配置，使开发人员能够轻松测试数据访问逻辑。 通常，正如其名称所示，_org.h2.jdbc.JdbcSQLSyntaxErrorExcept...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Fix%20Spring%20Boot%20H2%20JdbcSQLSyntaxErrorException%20%20Table%20not%20found%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"修复Spring Boot H2 JdbcSQLSyntaxErrorException “找不到表” | Baeldung"}],["meta",{"property":"og:description","content":"修复Spring Boot H2 JdbcSQLSyntaxErrorException “找不到表” | Baeldung 1. 引言 H2提供了一个简单的内存数据库和轻量级数据库，Spring Boot可以自动配置，使开发人员能够轻松测试数据访问逻辑。 通常，正如其名称所示，_org.h2.jdbc.JdbcSQLSyntaxErrorExcept..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SQL Syntax Error"}],["meta",{"property":"article:tag","content":"Table Not Found"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"修复Spring Boot H2 JdbcSQLSyntaxErrorException “找不到表” | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":3,"title":"2. 实践示例","slug":"_2-实践示例","link":"#_2-实践示例","children":[]},{"level":3,"title":"3. 解决方案","slug":"_3-解决方案","link":"#_3-解决方案","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.95,"words":884},"filePathRelative":"posts/baeldung/Archive/Fix Spring Boot H2 JdbcSQLSyntaxErrorException  Table not found .md","localizedDate":"2024年6月16日","excerpt":"\\n<h3>1. 引言</h3>\\n<p>H2提供了一个简单的内存数据库和轻量级数据库，Spring Boot可以自动配置，使开发人员能够轻松测试数据访问逻辑。</p>\\n<p>通常，正如其名称所示，_org.h2.jdbc.JdbcSQLSyntaxErrorException_被抛出以表示与SQL语法相关的错误。因此，消息“找不到表”表示H2未能找到指定的表。</p>\\n<p>因此，在本简短教程中，我们将学习如何产生并修复H2异常：<em>JdbcSQLSyntaxErrorException: 找不到表</em>。</p>\\n<h3>2. 实践示例</h3>\\n<p>现在我们知道了异常背后的原因，让我们看看如何在实践中重现它。</p>","autoDesc":true}');export{u as comp,b as data};
