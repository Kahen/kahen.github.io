import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a}from"./app-CsljO5op.js";const i={},r=a(`<h1 id="使用spring-jpa从序列获取下一个值" tabindex="-1"><a class="header-anchor" href="#使用spring-jpa从序列获取下一个值"><span>使用Spring JPA从序列获取下一个值</span></a></h1><p>序列是数据库中生成唯一ID的数字生成器，以避免重复条目。Spring JPA提供了在大多数情况下自动使用序列的方法。然而，在某些特定场景中，我们可能需要在持久化实体之前手动检索下一个序列值。例如，我们可能想在将发票详细信息保存到数据库之前生成一个唯一的发票号码。</p><p>在本教程中，我们将探讨使用Spring Data JPA从数据库序列获取下一个值的几种方法。</p><h2 id="_2-设置项目依赖" tabindex="-1"><a class="header-anchor" href="#_2-设置项目依赖"><span>2. 设置项目依赖</span></a></h2><p>在我们深入使用Spring Data JPA中的序列之前，让我们确保我们的项目正确设置。我们需要在我们的Maven <em>pom.xml</em> 文件中添加Spring Data JPA和PostgreSQL驱动依赖，并在数据库中创建序列。</p><h3 id="_2-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-maven依赖"><span>2.1. Maven依赖</span></a></h3><p>首先，让我们向我们的Maven项目添加必要的依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.springframework.boot\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`spring-boot-starter-data-jpa\`\`&lt;/artifactId&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.postgresql\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`postgresql\`\`&lt;/artifactId&gt;\`\`
    \`&lt;scope&gt;\`runtime\`&lt;/scope&gt;\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-测试数据" tabindex="-1"><a class="header-anchor" href="#_2-2-测试数据"><span>2.2. 测试数据</span></a></h3><p>以下是我们用于在运行测试用例之前准备数据库的SQL脚本。我们可以将此脚本保存在 <em>.sql</em> 文件中，并将其放置在我们的项目的 <em>src/test/resources</em> 目录中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>DROP SEQUENCE IF EXISTS my_sequence_name;
CREATE SEQUENCE my_sequence_name START 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此命令创建一个从1开始的序列，每次调用 <em>NEXTVAL</em> 递增1。</p><p>然后，我们使用 <em>@Sql</em> 注解与 <em>executionPhase</em> 属性设置为 <em>BEFORE_TEST_METHOD</em> 在测试类中，在每个测试方法执行之前将测试数据插入数据库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Sql(scripts = &quot;/testsequence.sql&quot;, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-使用-sequencegenerator" tabindex="-1"><a class="header-anchor" href="#_3-使用-sequencegenerator"><span>3. 使用 <em>@SequenceGenerator</em></span></a></h2><p><strong>Spring JPA可以在后台与序列一起工作，以在每次添加新项目时自动分配一个唯一数字。</strong> 我们通常在JPA中使用 <em>@SequenceGenerator</em> 注解来配置序列生成器。这个生成器可以用来自动在实体类中生成主键。</p><p><strong>此外，它通常与 <em>@GeneratedValue</em> 注解结合使用，以指定生成主键值的策略。</strong> 以下是我们如何使用 <em>@SequenceGenerator</em> 配置主键生成的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
public class MyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = &quot;mySeqGen&quot;)
    @SequenceGenerator(name = &quot;mySeqGen&quot;, sequenceName = &quot;my_sequence_name&quot;, allocationSize = 1)
    private Long id;

    // 其他实体字段和方法
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <em>GenerationType.SEQUENCE</em> 策略的 <em>@GeneratedValue</em> 注解表明主键值将使用序列生成。<strong>随后，<em>generator</em> 属性将此策略与名为“ <em>mySeqGen</em>“的指定序列生成器关联。</strong></p><p>此外，<em>@SequenceGenerator</em> 注解配置了名为“ <em>mySeqGen</em>“的序列生成器。它指定了数据库序列的名称“ <em>my_sequence_name</em>”和一个可选参数allocationSize。</p><p><strong><em>allocationSize</em> 是一个整数值，指定一次从数据库预取多少序列号码。</strong> 例如，如果我们将 <em>allocationSize</em> 设置为50，持久性提供者将一次性请求50个序列号码，并将它们内部存储。<strong>然后，它使用这些预取的号码进行未来的实体ID生成。</strong> 这对于写入量大的应用程序可能是有益的。</p><p><strong>有了这种配置，当我们持久化一个新的 <em>MyEntity</em> 实例时，持久性提供者会自动从名为“ <em>my_sequence_name</em>“的序列中获取下一个值。</strong> 检索到的序列号码随后在将其保存到数据库之前分配给实体的 <em>id</em> 字段。</p><p>以下是在持久化实体后检索序列号码以及实体ID的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MyEntity entity = new MyEntity();

myEntityRepository.save(entity);
long generatedId = entity.getId();

assertNotNull(generatedId);
assertEquals(1L, generatedId);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在保存实体后，我们可以使用实体对象上的 <em>getId()</em> 方法访问生成的ID。</p><h2 id="_4-spring-data-jpa自定义查询" tabindex="-1"><a class="header-anchor" href="#_4-spring-data-jpa自定义查询"><span>4. Spring Data JPA自定义查询</span></a></h2><p>在某些场景中，我们可能需要在将其保存到数据库之前获取下一个数字或唯一ID。为此，Spring Data JPA提供了一种使用自定义查询查询下一个序列的方法。<strong>这种方法涉及在存储库中使用原生SQL查询来访问序列。</strong></p><p>检索下一个值的具体语法取决于数据库系统。<strong>例如，在PostgreSQL或Oracle中，我们使用 <em>NEXTVAL</em> 函数来从序列中获取下一个值。</strong> 以下是使用 <em>@Query</em> 注解的示例实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository
public interface MyEntityRepository extends JpaRepository\`&lt;MyEntity, Long&gt;\` {
    @Query(value = &quot;SELECT NEXTVAL(&#39;my_sequence_name&#39;)&quot;, nativeQuery = true)
    Long getNextSequenceValue();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在示例中，我们使用 <em>@Query</em> 注解注释了 <em>getNextSequenceValue()</em> 方法。使用 <em>@Query</em> 注解，我们可以指定一个原生SQL查询，使用 <em>NEXTVAL</em> 函数从序列中检索下一个值。这使我们能够直接访问序列值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Autowired
private MyEntityRepository myEntityRepository;

long generatedId = myEntityRepository.getNextSequenceValue();

assertNotNull(generatedId);
assertEquals(1L, generatedId);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于这种方法涉及编写数据库特定的代码，如果我们更改数据库，我们可能需要调整SQL查询。</p><h2 id="_5-使用-entitymanager" tabindex="-1"><a class="header-anchor" href="#_5-使用-entitymanager"><span>5. 使用 <em>EntityManager</em></span></a></h2><p>或者，Spring JPA还提供了 <em>EntityManager</em> API，我们可以使用它直接检索下一个序列值。<strong>这种方法提供了更细粒度的控制，但绕过了JPA的对象关系映射特性。</strong></p><p>以下是我们如何在Spring Data JPA中使用 <em>EntityManager</em> API检索序列的下一个值的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@PersistenceContext
private EntityManager entityManager;

public Long getNextSequenceValue(String sequenceName) {
    BigInteger nextValue = (BigInteger) entityManager.createNativeQuery(&quot;SELECT NEXTVAL(:sequenceName)&quot;)
      .setParameter(&quot;sequenceName&quot;, sequenceName)
      .getSingleResult();
    return nextValue.longValue();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用 <em>createNativeQuery()</em> 方法创建一个原生SQL查询。在此查询中，调用 <em>NEXTVAL</em> 函数以从序列中检索下一个值。<strong>我们可以注意到PostgreSQL中的 <em>NEXTVAL</em> 函数返回的是 <em>BigInteger</em> 类型的值。因此，我们使用 <em>longValue()</em> 方法将 <em>BigInteger</em> 转换为 <em>Long</em>。</strong></p><p>有了 <em>getNextSequenceValue()</em> 方法，我们可以这样调用它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Autowired
private MyEntityService myEntityService;

long generatedId = myEntityService.getNextSequenceValue(&quot;my_sequence_name&quot;);
assertNotNull(generatedId);
assertEquals(1L, generatedId);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了使用Spring Data JPA从数据库序列获取下一个值的各种方法。Spring JPA通过注解如 <em>@SequenceGenerator</em> 和 <em>@GeneratedValue</em> 提供了与数据库序列的无缝集成。在我们需要在保存实体之前获取下一个序列值的场景中，我们可以使用Spring Data JPA的自定义查询。</p><p>如常，示例的源代码可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,43),s=[r];function l(d,m){return t(),n("div",null,s)}const u=e(i,[["render",l],["__file","Get Nextval From Sequence With Spring JPA.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/Archive/Get%20Nextval%20From%20Sequence%20With%20Spring%20JPA.html","title":"使用Spring JPA从序列获取下一个值","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Spring JPA","Database"],"tag":["Sequence","Nextval"],"description":"使用Spring JPA从序列获取下一个值 序列是数据库中生成唯一ID的数字生成器，以避免重复条目。Spring JPA提供了在大多数情况下自动使用序列的方法。然而，在某些特定场景中，我们可能需要在持久化实体之前手动检索下一个序列值。例如，我们可能想在将发票详细信息保存到数据库之前生成一个唯一的发票号码。 在本教程中，我们将探讨使用Spring Dat...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Get%20Nextval%20From%20Sequence%20With%20Spring%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring JPA从序列获取下一个值"}],["meta",{"property":"og:description","content":"使用Spring JPA从序列获取下一个值 序列是数据库中生成唯一ID的数字生成器，以避免重复条目。Spring JPA提供了在大多数情况下自动使用序列的方法。然而，在某些特定场景中，我们可能需要在持久化实体之前手动检索下一个序列值。例如，我们可能想在将发票详细信息保存到数据库之前生成一个唯一的发票号码。 在本教程中，我们将探讨使用Spring Dat..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Sequence"}],["meta",{"property":"article:tag","content":"Nextval"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring JPA从序列获取下一个值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 设置项目依赖","slug":"_2-设置项目依赖","link":"#_2-设置项目依赖","children":[{"level":3,"title":"2.1. Maven依赖","slug":"_2-1-maven依赖","link":"#_2-1-maven依赖","children":[]},{"level":3,"title":"2.2. 测试数据","slug":"_2-2-测试数据","link":"#_2-2-测试数据","children":[]}]},{"level":2,"title":"3. 使用 @SequenceGenerator","slug":"_3-使用-sequencegenerator","link":"#_3-使用-sequencegenerator","children":[]},{"level":2,"title":"4. Spring Data JPA自定义查询","slug":"_4-spring-data-jpa自定义查询","link":"#_4-spring-data-jpa自定义查询","children":[]},{"level":2,"title":"5. 使用 EntityManager","slug":"_5-使用-entitymanager","link":"#_5-使用-entitymanager","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.14,"words":1541},"filePathRelative":"posts/baeldung/Archive/Get Nextval From Sequence With Spring JPA.md","localizedDate":"2024年6月17日","excerpt":"\\n<p>序列是数据库中生成唯一ID的数字生成器，以避免重复条目。Spring JPA提供了在大多数情况下自动使用序列的方法。然而，在某些特定场景中，我们可能需要在持久化实体之前手动检索下一个序列值。例如，我们可能想在将发票详细信息保存到数据库之前生成一个唯一的发票号码。</p>\\n<p>在本教程中，我们将探讨使用Spring Data JPA从数据库序列获取下一个值的几种方法。</p>\\n<h2>2. 设置项目依赖</h2>\\n<p>在我们深入使用Spring Data JPA中的序列之前，让我们确保我们的项目正确设置。我们需要在我们的Maven <em>pom.xml</em> 文件中添加Spring Data JPA和PostgreSQL驱动依赖，并在数据库中创建序列。</p>","autoDesc":true}');export{u as comp,p as data};
