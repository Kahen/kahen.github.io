import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-DYXy71xF.js";const s={},l=i(`<h1 id="hibernate中的-softdelete注解指南" tabindex="-1"><a class="header-anchor" href="#hibernate中的-softdelete注解指南"><span>Hibernate中的@SoftDelete注解指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在应用程序中使用数据库时，我们通常需要处理不再有用的记录的删除。然而，由于业务或法规要求，例如数据恢复、审计追踪或引用完整性目的，我们可能需要隐藏这些记录而不是删除它们。</p><p>在本教程中，我们将了解Hibernate的@SoftDelete注解并学习如何实现它。</p><h2 id="_2-理解-softdelete注解" tabindex="-1"><a class="header-anchor" href="#_2-理解-softdelete注解"><span>2. 理解@SoftDelete注解</span></a></h2><p>**@SoftDelete注解提供了一种方便的机制来标记任何记录为活动状态或已删除状态。**它有三个不同的配置部分：</p><ul><li>**策略配置是跟踪活动行还是已删除行。**我们可以通过将_strategy_设置为_ACTIVE_或_DELETED_来配置它。</li><li>**指示器列确定将使用哪个列来跟踪行。**如果没有指定列，则策略使用默认列（<em>active_或_deleted</em>）。</li><li>**转换器定义了指示器列在数据库中的设置方式。**领域类型是一个布尔值，指示记录是活动状态还是已删除状态。然而，通过实现_AttributeConverter_，我们可以将关系类型设置为转换器定义的任何类型。可用的转换器有_NumericBooleanConverter_、<em>YesNoConverter_和_TrueFalseConverter</em>。</li></ul><h2 id="_3-实现-softdelete" tabindex="-1"><a class="header-anchor" href="#_3-实现-softdelete"><span>3. 实现@SoftDelete</span></a></h2><p>让我们看几个使用不同配置的@SoftDelete的例子。</p><h3 id="_3-1-模型" tabindex="-1"><a class="header-anchor" href="#_3-1-模型"><span>3.1. 模型</span></a></h3><p>让我们定义一个实体类_SoftDeletePerson_，我们用@SoftDelete注解它。我们不提供任何额外的配置，注解采用所有默认值，例如策略为_DELETED_，一个_deleted_指示器列，以及存储为布尔类型。</p><p>@SoftDelete注解支持@ElementCollection，我们已经用配置的策略为_ACTIVE_，一个默认指示器列，并使用_YesNoConverter_存储为‘Y’或‘N’：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@SoftDelete
public class SoftDeletePerson {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = &quot;Emails&quot;, joinColumns = @JoinColumn(name = &quot;id&quot;))
    @Column(name = &quot;emailId&quot;)
    @SoftDelete(strategy = SoftDeleteType.ACTIVE,converter = YesNoConverter.class)
    private List\`\`\`\`&lt;String&gt;\`\`\`\` emailIds;

    // 标准getter和setter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-数据设置" tabindex="-1"><a class="header-anchor" href="#_3-2-数据设置"><span>3.2. 数据设置</span></a></h3><p>让我们为_SoftDeletePerson_实体创建一些数据库条目，并看看Hibernate如何在数据库中保存它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@BeforeEach
public void setup() {
    session = sessionFactory.openSession();
    session.beginTransaction();

    SoftDeletePerson person1 = new SoftDeletePerson();
    person1.setName(&quot;Person1&quot;);
    List\`\`\`\`&lt;String&gt;\`\`\`\` emailIds = new ArrayList&lt;&gt;();
    emailIds.add(&quot;id1@dummy.com&quot;);
    emailIds.add(&quot;id2@dummy.com&quot;);
    person1.setEmailIds(emailIds);

    SoftDeletePerson person2 = new SoftDeletePerson();
    person2.setName(&quot;Person2&quot;);
    List\`\`\`\`&lt;String&gt;\`\`\`\` emailIdsPerson2 = new ArrayList&lt;&gt;();
    emailIdsPerson2.add(&quot;person2Id1@dummy.com&quot;);
    emailIdsPerson2.add(&quot;person2Id2@dummy.com&quot;);
    person2.setEmailIds(emailIdsPerson2);

    session.save(person1);
    session.save(person2);
    session.getTransaction()
      .commit();

    assertNotNull(person1.getName());
    assertNotNull(person2.getName());
    System.out.println(person1);
    System.out.println(person2);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试用例中，我们持久化了两个_SoftDeletePerson_实体，并将它们打印出来，以可视化数据库中持久化的内容。下面的输出显示Hibernate将_SoftDeletePerson_保存，<em>deleted_列设置为_false</em>。此外，集合_emailIds_有_active_列，值为‘Y’：</p><h3 id="_3-3-测试" tabindex="-1"><a class="header-anchor" href="#_3-3-测试"><span>3.3. 测试</span></a></h3><p>在前面的步骤中，我们在数据库中持久化了一些行。现在，让我们看看@SoftDelete如何处理记录的删除：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenDeletingUsingSoftDelete_ThenEntityAndCollectionAreDeleted() {
    session.beginTransaction();
    person1 = session.createQuery(&quot;from SoftDeletePerson where name=&#39;Person1&#39;&quot;, SoftDeletePerson.class)
      .getSingleResult();
    person2 = session.createQuery(&quot;from SoftDeletePerson where name=&#39;Person2&#39;&quot;, SoftDeletePerson.class)
      .getSingleResult();

    assertNotNull(person1);
    assertNotNull(person2);

    session.delete(person2);
    List\`\`\`\`&lt;String&gt;\`\`\`\` emailIds = person1.getEmailIds();
    emailIds.remove(0);
    person1.setEmailIds(emailIds);
    session.save(person1);
    session.getTransaction()
      .commit();
    List\`\`&lt;SoftDeletePerson&gt;\`\` activeRows = session.createQuery(&quot;from SoftDeletePerson&quot;)
      .list();
    List\`\`&lt;SoftDeletePerson&gt;\`\` deletedRows = session.createNamedQuery(&quot;getDeletedPerson&quot;, SoftDeletePerson.class)
      .getResultList();
    session.close();

    assertNotNull(person1.getName());
    System.out.println(&quot;-------------Active Rows-----------&quot;);
    activeRows.forEach(row -&gt; System.out.println(row));
    System.out.println(&quot;-------------Deleted Rows-----------&quot;);
    deletedRows.forEach(row -&gt; System.out.println(row));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们从数据库中获取了现有的行。接下来，我们删除了一个实体，同时对另一个实体更新了_emailIds_。</p><p>然后，当我们删除一个_SoftDeletePerson_实体时，Hibernate将_deleted=true_。同样，当我们删除一个电子邮件ID时，Hibernate将之前的行设置为_active=&#39;N&#39;_，并插入一个新行，<em>active=&#39;Y&#39;</em>。</p><p>最后，当我们获取活动和已删除的行时，我们可以看到预期的结果：</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了Hibernate中@SoftDelete注解的实现。<strong>默认配置是使用_DELETED_策略，并在数据库列_deleted_中以布尔值存储</strong>。</p><p>我们还看到了@ElementCollection是如何被这个注解支持的。最后，我们通过不同配置的测试用例验证了结果。</p><p>如常，所有示例的源代码都可以在GitHub上找到。翻译结束，以下是剩余部分的翻译：</p><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h2><p>在本文中，我们探索了Hibernate中@SoftDelete注解的实现。<strong>默认配置是使用_DELETED_策略，并在数据库列_deleted_中以布尔值存储</strong>。</p><p>我们还看到了@ElementCollection是如何被这个注解支持的。最后，我们通过不同配置的测试用例验证了结果。</p><p>如常，所有示例的源代码都可以在GitHub上找到。</p><p>OK</p>`,32),a=[l];function o(r,d){return n(),t("div",null,a)}const v=e(s,[["render",o],["__file","2024-06-22-A Guide to the  SoftDelete Annotation in Hibernate.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-A%20Guide%20to%20the%20%20SoftDelete%20Annotation%20in%20Hibernate.html","title":"Hibernate中的@SoftDelete注解指南","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Hibernate","SoftDelete"],"tag":["Java","Annotation","SoftDelete"],"head":[["meta",{"name":"keywords","content":"Hibernate, SoftDelete, Java, Annotation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-A%20Guide%20to%20the%20%20SoftDelete%20Annotation%20in%20Hibernate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Hibernate中的@SoftDelete注解指南"}],["meta",{"property":"og:description","content":"Hibernate中的@SoftDelete注解指南 1. 概述 在应用程序中使用数据库时，我们通常需要处理不再有用的记录的删除。然而，由于业务或法规要求，例如数据恢复、审计追踪或引用完整性目的，我们可能需要隐藏这些记录而不是删除它们。 在本教程中，我们将了解Hibernate的@SoftDelete注解并学习如何实现它。 2. 理解@SoftDele..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T16:49:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Annotation"}],["meta",{"property":"article:tag","content":"SoftDelete"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T16:49:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hibernate中的@SoftDelete注解指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T16:49:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Hibernate中的@SoftDelete注解指南 1. 概述 在应用程序中使用数据库时，我们通常需要处理不再有用的记录的删除。然而，由于业务或法规要求，例如数据恢复、审计追踪或引用完整性目的，我们可能需要隐藏这些记录而不是删除它们。 在本教程中，我们将了解Hibernate的@SoftDelete注解并学习如何实现它。 2. 理解@SoftDele..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解@SoftDelete注解","slug":"_2-理解-softdelete注解","link":"#_2-理解-softdelete注解","children":[]},{"level":2,"title":"3. 实现@SoftDelete","slug":"_3-实现-softdelete","link":"#_3-实现-softdelete","children":[{"level":3,"title":"3.1. 模型","slug":"_3-1-模型","link":"#_3-1-模型","children":[]},{"level":3,"title":"3.2. 数据设置","slug":"_3-2-数据设置","link":"#_3-2-数据设置","children":[]},{"level":3,"title":"3.3. 测试","slug":"_3-3-测试","link":"#_3-3-测试","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1719074973000,"updatedTime":1719074973000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.69,"words":1107},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-A Guide to the  SoftDelete Annotation in Hibernate.md","localizedDate":"2024年6月23日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在应用程序中使用数据库时，我们通常需要处理不再有用的记录的删除。然而，由于业务或法规要求，例如数据恢复、审计追踪或引用完整性目的，我们可能需要隐藏这些记录而不是删除它们。</p>\\n<p>在本教程中，我们将了解Hibernate的@SoftDelete注解并学习如何实现它。</p>\\n<h2>2. 理解@SoftDelete注解</h2>\\n<p>**@SoftDelete注解提供了一种方便的机制来标记任何记录为活动状态或已删除状态。**它有三个不同的配置部分：</p>\\n<ul>\\n<li>**策略配置是跟踪活动行还是已删除行。**我们可以通过将_strategy_设置为_ACTIVE_或_DELETED_来配置它。</li>\\n<li>**指示器列确定将使用哪个列来跟踪行。**如果没有指定列，则策略使用默认列（<em>active_或_deleted</em>）。</li>\\n<li>**转换器定义了指示器列在数据库中的设置方式。**领域类型是一个布尔值，指示记录是活动状态还是已删除状态。然而，通过实现_AttributeConverter_，我们可以将关系类型设置为转换器定义的任何类型。可用的转换器有_NumericBooleanConverter_、<em>YesNoConverter_和_TrueFalseConverter</em>。</li>\\n</ul>","autoDesc":true}');export{v as comp,u as data};
