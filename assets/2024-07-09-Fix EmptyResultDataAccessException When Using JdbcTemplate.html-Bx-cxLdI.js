import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-COaDJFIk.js";const e={},p=t(`<hr><h1 id="使用jdbctemplate时解决emptyresultdataaccessexception异常" tabindex="-1"><a class="header-anchor" href="#使用jdbctemplate时解决emptyresultdataaccessexception异常"><span>使用JdbcTemplate时解决EmptyResultDataAccessException异常</span></a></h1><p>在本简短教程中，我们将探讨Spring的_JdbcTemplate_抛出的“<em>EmptyResultDataAccessException: 预期结果大小错误：期望1，实际0</em>”异常。</p><p>首先，我们将详细讨论这种异常的根本原因。然后，我们将通过一个实际例子来演示如何复现它，并最终学习如何解决它。</p><h2 id="_2-原因" tabindex="-1"><a class="header-anchor" href="#_2-原因"><span>2. 原因</span></a></h2><p>Spring的_JdbcTemplate_类提供了执行SQL查询和检索结果的便捷方式。它在底层使用JDBC API。</p><p>通常，当预期结果至少应该有一行，但实际上返回了零行时，<strong><em>JdbcTemplate_会抛出_EmptyResultDataAccessException</em></strong>。</p><p>现在我们知道了异常的含义，让我们通过一个实际例子来看看如何复现它并解决它。</p><h2 id="_3-复现异常" tabindex="-1"><a class="header-anchor" href="#_3-复现异常"><span>3. 复现异常</span></a></h2><p>例如，考虑_Employee_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个使用_JdbcTemplate_处理SQL查询的数据访问对象（DAO）类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeDAO</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">JdbcTemplate</span> jdbcTemplate<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setDataSource</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        jdbcTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JdbcTemplate</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，由于_JdbcTemplate_需要一个_DataSource_对象，我们通过setter方法注入它。</p><p>现在，我们将添加一个通过_id_检索_Employee_对象的方法。为此，让我们使用_JdbcTemplate_类提供的_queryForObject()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployeeById</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">RowMapper</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\` employeeRowMapper <span class="token operator">=</span> <span class="token punctuation">(</span>rs<span class="token punctuation">,</span> rowNum<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span>rs<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token string">&quot;ID&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> rs<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;FIRST_NAME&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> rs<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;LAST_NAME&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> jdbcTemplate<span class="token punctuation">.</span><span class="token function">queryForObject</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT * FROM EMPLOYEE WHERE id=?&quot;</span><span class="token punctuation">,</span> employeeRowMapper<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，<strong>第一个参数表示SQL查询。第二个参数表示用于将_ResultSet_映射到_Employee_对象的_RowMapper_</strong>。</p><p>事实上，<em>queryForObject()<em>期望正好返回一行。因此，如果我们传递一个不存在的_id</em>，它就会抛出_EmptyResultDataAccessException</em>。</p><p>让我们通过一个测试来确认这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span><span class="token punctuation">(</span>expected <span class="token operator">=</span> <span class="token class-name">EmptyResultDataAccessException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenIdNotExist_thenThrowEmptyResultDataAccessException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">EmployeeDAO</span> employeeDAO <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EmployeeDAO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ReflectionTestUtils</span><span class="token punctuation">.</span><span class="token function">setField</span><span class="token punctuation">(</span>employeeDAO<span class="token punctuation">,</span> <span class="token string">&quot;jdbcTemplate&quot;</span><span class="token punctuation">,</span> jdbcTemplate<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>jdbcTemplate<span class="token punctuation">.</span><span class="token function">queryForObject</span><span class="token punctuation">(</span><span class="token function">anyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ArgumentMatchers</span><span class="token punctuation">.</span>&lt;<span class="token class-name">RowMapper</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token operator">&gt;</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">anyInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">thenThrow</span><span class="token punctuation">(</span><span class="token class-name">EmptyResultDataAccessException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    employeeDAO<span class="token punctuation">.</span><span class="token function">getEmployeeById</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>由于没有给定_id_的员工，指定的查询返回了零行。因此，_JdbcTemplate_以_EmptyResultDataAccessException_失败</strong>。</p><h2 id="_4-修复异常" tabindex="-1"><a class="header-anchor" href="#_4-修复异常"><span>4. 修复异常</span></a></h2><p>最简单的解决方案是捕获异常，然后返回_null_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployeeByIdV2</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">RowMapper</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\` employeeRowMapper <span class="token operator">=</span> <span class="token punctuation">(</span>rs<span class="token punctuation">,</span> rowNum<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span>rs<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token string">&quot;ID&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> rs<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;FIRST_NAME&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> rs<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;LAST_NAME&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> jdbcTemplate<span class="token punctuation">.</span><span class="token function">queryForObject</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT * FROM EMPLOYEE WHERE id=?&quot;</span><span class="token punctuation">,</span> employeeRowMapper<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">EmptyResultDataAccessException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这样，当SQL查询的结果为空时，我们确保返回_null_</strong>。</p><p>现在，让我们添加另一个测试用例来确认一切按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenIdNotExist_thenReturnNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">EmployeeDAO</span> employeeDAO <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EmployeeDAO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ReflectionTestUtils</span><span class="token punctuation">.</span><span class="token function">setField</span><span class="token punctuation">(</span>employeeDAO<span class="token punctuation">,</span> <span class="token string">&quot;jdbcTemplate&quot;</span><span class="token punctuation">,</span> jdbcTemplate<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>jdbcTemplate<span class="token punctuation">.</span><span class="token function">queryForObject</span><span class="token punctuation">(</span><span class="token function">anyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ArgumentMatchers</span><span class="token punctuation">.</span>&lt;<span class="token class-name">RowMapper</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token operator">&gt;</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">anyInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertNull</span><span class="token punctuation">(</span>employeeDAO<span class="token punctuation">.</span><span class="token function">getEmployeeByIdV2</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本简短教程中，我们详细讨论了什么导致_JdbcTemplate_抛出异常“<em>EmptyResultDataAccessException: Incorrect result size: expected 1, actual 0</em>”。</p><p>在此过程中，我们看到了如何产生异常以及如何通过实际例子来解决它。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,31),c=[p];function o(l,i){return a(),s("div",null,c)}const r=n(e,[["render",o],["__file","2024-07-09-Fix EmptyResultDataAccessException When Using JdbcTemplate.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Fix%20EmptyResultDataAccessException%20When%20Using%20JdbcTemplate.html","title":"使用JdbcTemplate时解决EmptyResultDataAccessException异常","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring","JDBC"],"tag":["JdbcTemplate","EmptyResultDataAccessException"],"head":[["meta",{"name":"keywords","content":"Spring, JdbcTemplate, EmptyResultDataAccessException, 异常处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Fix%20EmptyResultDataAccessException%20When%20Using%20JdbcTemplate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用JdbcTemplate时解决EmptyResultDataAccessException异常"}],["meta",{"property":"og:description","content":"使用JdbcTemplate时解决EmptyResultDataAccessException异常 在本简短教程中，我们将探讨Spring的_JdbcTemplate_抛出的“EmptyResultDataAccessException: 预期结果大小错误：期望1，实际0”异常。 首先，我们将详细讨论这种异常的根本原因。然后，我们将通过一个实际例子来演..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T14:39:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JdbcTemplate"}],["meta",{"property":"article:tag","content":"EmptyResultDataAccessException"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T14:39:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用JdbcTemplate时解决EmptyResultDataAccessException异常\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T14:39:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用JdbcTemplate时解决EmptyResultDataAccessException异常 在本简短教程中，我们将探讨Spring的_JdbcTemplate_抛出的“EmptyResultDataAccessException: 预期结果大小错误：期望1，实际0”异常。 首先，我们将详细讨论这种异常的根本原因。然后，我们将通过一个实际例子来演..."},"headers":[{"level":2,"title":"2. 原因","slug":"_2-原因","link":"#_2-原因","children":[]},{"level":2,"title":"3. 复现异常","slug":"_3-复现异常","link":"#_3-复现异常","children":[]},{"level":2,"title":"4. 修复异常","slug":"_4-修复异常","link":"#_4-修复异常","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720535973000,"updatedTime":1720535973000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.44,"words":732},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Fix EmptyResultDataAccessException When Using JdbcTemplate.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用JdbcTemplate时解决EmptyResultDataAccessException异常</h1>\\n<p>在本简短教程中，我们将探讨Spring的_JdbcTemplate_抛出的“<em>EmptyResultDataAccessException: 预期结果大小错误：期望1，实际0</em>”异常。</p>\\n<p>首先，我们将详细讨论这种异常的根本原因。然后，我们将通过一个实际例子来演示如何复现它，并最终学习如何解决它。</p>\\n<h2>2. 原因</h2>\\n<p>Spring的_JdbcTemplate_类提供了执行SQL查询和检索结果的便捷方式。它在底层使用JDBC API。</p>","autoDesc":true}');export{r as comp,d as data};
