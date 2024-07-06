import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-ConjvFaO.js";const t={},p=e(`<h1 id="spring-boot-h2-jdbc-sqlsyntaxerrorexception-预期的-标识符-错误" tabindex="-1"><a class="header-anchor" href="#spring-boot-h2-jdbc-sqlsyntaxerrorexception-预期的-标识符-错误"><span>Spring Boot H2 JDBC SQLSyntaxErrorException：预期的“标识符”错误</span></a></h1><p>在这篇简短的教程中，我们将仔细研究异常_org.h2.jdbc.JdbcSQLSyntaxErrorException: SQL语句中预期的“标识符”的语法错误_。</p><p>首先，我们将阐明异常的主要原因。然后，我们将使用一个实际的例子来说明如何重现它，最后，如何解决问题。</p><h2 id="_2-原因" tabindex="-1"><a class="header-anchor" href="#_2-原因"><span>2. 原因</span></a></h2><p>在跳转到解决方案之前，让我们先理解这个异常。</p><p>通常，H2抛出_JdbcSQLSyntaxErrorException_来表示SQL语句中的语法错误。因此，&quot;预期标识符&quot;的消息表明SQL期望一个合适的标识符，而我们没有给出。</p><p><strong>这种异常最常见的原因是使用保留关键字作为标识符</strong>。</p><p>例如，使用关键字_table_来命名特定的SQL表将导致_JdbcSQLSyntaxErrorException_。</p><p>另一个原因可能是SQL语句中缺少或错误放置关键字。</p><h2 id="_3-重现异常" tabindex="-1"><a class="header-anchor" href="#_3-重现异常"><span>3. 重现异常</span></a></h2><p>作为开发人员，我们经常使用&quot;_user&quot;这个词来表示处理用户的表。不幸的是，在H2中它是一个保留关键字。</p><p>因此，为了重现异常，我们将假设使用关键字&quot;_user&quot;。</p><p>首先，让我们添加一个基本的SQL脚本来初始化并使用数据填充H2数据库：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token keyword">user</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;p@ssw@rd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token keyword">user</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;userpasswd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将创建一个实体类来映射_user_表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> login<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，_@Entity_是一个JPA注解，用于标识一个类为实体类。</p><p>此外，_@Id_表示映射数据库主键的字段。</p><p>现在，如果我们运行主应用程序，Spring Boot将以以下方式失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span></span>BeanCreationException</span><span class="token operator">:</span> <span class="token class-name">Error</span> creating bean <span class="token keyword">with</span> <span class="token namespace">name</span> &#39;dataSourceScriptDatabaseInitializer&#39;
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
nested exception is <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>h2<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span></span>JdbcSQLSyntaxErrorException</span><span class="token operator">:</span> <span class="token class-name">Syntax</span> error in <span class="token constant">SQL</span> statement <span class="token string">&quot;INSERT INTO [*]user VALUES (1, &#39;admin&#39;, &#39;p@ssw@rd&#39;)&quot;</span><span class="token punctuation">;</span> expected <span class="token string">&quot;identifier&quot;</span><span class="token punctuation">;</span> <span class="token constant">SQL</span> statement<span class="token operator">:</span>
<span class="token constant">INSERT</span> <span class="token constant">INTO</span> user <span class="token constant">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token char">&#39;admin&#39;</span><span class="token punctuation">,</span> &#39;p<span class="token annotation punctuation">@ssw</span><span class="token annotation punctuation">@rd</span>&#39;<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token number">42001</span><span class="token operator">-</span><span class="token number">214</span><span class="token punctuation">]</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在日志中看到的，H2对插入查询抱怨，因为关键字_user_是保留的，不能用作标识符。</p><h2 id="_4-解决方案" tabindex="-1"><a class="header-anchor" href="#_4-解决方案"><span>4. 解决方案</span></a></h2><p>要修复异常，我们需要确保我们不使用SQL保留关键字作为标识符。</p><p>或者，我们可以使用分隔符来转义它们。H2支持双引号作为标准标识符分隔符。</p><p>所以首先，让我们双引号关键字_user_：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token string">&quot;user&quot;</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;p@ssw@rd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token string">&quot;user&quot;</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;userpasswd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将为我们的实体_User_创建一个JPA存储库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们添加一个测试用例来确认一切按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenValidInitData_whenCallingFindAll_thenReturnData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>\` users <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>users<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasSize</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，_findAll()<em>执行其工作，并且没有失败_JdbcSQLSyntaxErrorException</em>。</p><p>避免异常的另一个方法是将_NON_KEYWORDS=user_附加到JDBC URL：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.datasource.url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:h2:mem:mydb;NON_KEYWORDS=user</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样，<strong>我们告诉H2将_user_关键字从保留字列表中排除</strong>。</p><p>如果我们使用hibernate，我们可以将_hibernate.globally_quoted_identifiers_属性设置为_true_。</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.jpa.properties.hibernate.globally_quoted_identifiers</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如属性名称所暗示的，hibernate将自动引用所有数据库标识符。</p><p>话虽如此，<strong>在使用_Table_或_Column_注解时，我们不需要手动转义表或列名</strong>。</p><p>简而言之，这里有一些重要的要点需要考虑：</p><ul><li>确保使用正确的SQL关键字并将它们放在正确的顺序</li><li>避免使用保留关键字作为标识符</li><li>仔细检查SQL中不允许的任何特殊字符</li><li>确保正确转义或引用任何保留关键字</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇短文中，我们详细解释了异常_org.h2.jdbc.JdbcSQLSyntaxErrorException: SQL语句中预期的“标识符”的语法错误_的原因。然后，我们展示了如何产生异常以及如何修复它。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>`,43),o=[p];function i(c,r){return s(),a("div",null,o)}const d=n(t,[["render",i],["__file","2024-07-06-Spring Boot H2 JdbcSQLSyntaxErrorException expected  identifier .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Spring%20Boot%20H2%20JdbcSQLSyntaxErrorException%20expected%20%20identifier%20.html","title":"Spring Boot H2 JDBC SQLSyntaxErrorException：预期的“标识符”错误","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","H2 Database"],"tag":["SQL Syntax Error","Exception Handling"],"head":[["meta",{"name":"keywords","content":"Spring Boot, H2 Database, SQL Syntax Error, Exception Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Spring%20Boot%20H2%20JdbcSQLSyntaxErrorException%20expected%20%20identifier%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot H2 JDBC SQLSyntaxErrorException：预期的“标识符”错误"}],["meta",{"property":"og:description","content":"Spring Boot H2 JDBC SQLSyntaxErrorException：预期的“标识符”错误 在这篇简短的教程中，我们将仔细研究异常_org.h2.jdbc.JdbcSQLSyntaxErrorException: SQL语句中预期的“标识符”的语法错误_。 首先，我们将阐明异常的主要原因。然后，我们将使用一个实际的例子来说明如何重现它..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T04:57:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SQL Syntax Error"}],["meta",{"property":"article:tag","content":"Exception Handling"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T04:57:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot H2 JDBC SQLSyntaxErrorException：预期的“标识符”错误\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T04:57:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot H2 JDBC SQLSyntaxErrorException：预期的“标识符”错误 在这篇简短的教程中，我们将仔细研究异常_org.h2.jdbc.JdbcSQLSyntaxErrorException: SQL语句中预期的“标识符”的语法错误_。 首先，我们将阐明异常的主要原因。然后，我们将使用一个实际的例子来说明如何重现它..."},"headers":[{"level":2,"title":"2. 原因","slug":"_2-原因","link":"#_2-原因","children":[]},{"level":2,"title":"3. 重现异常","slug":"_3-重现异常","link":"#_3-重现异常","children":[]},{"level":2,"title":"4. 解决方案","slug":"_4-解决方案","link":"#_4-解决方案","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720241842000,"updatedTime":1720241842000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.33,"words":1000},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Spring Boot H2 JdbcSQLSyntaxErrorException expected  identifier .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这篇简短的教程中，我们将仔细研究异常_org.h2.jdbc.JdbcSQLSyntaxErrorException: SQL语句中预期的“标识符”的语法错误_。</p>\\n<p>首先，我们将阐明异常的主要原因。然后，我们将使用一个实际的例子来说明如何重现它，最后，如何解决问题。</p>\\n<h2>2. 原因</h2>\\n<p>在跳转到解决方案之前，让我们先理解这个异常。</p>\\n<p>通常，H2抛出_JdbcSQLSyntaxErrorException_来表示SQL语句中的语法错误。因此，\\"预期标识符\\"的消息表明SQL期望一个合适的标识符，而我们没有给出。</p>\\n<p><strong>这种异常最常见的原因是使用保留关键字作为标识符</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
