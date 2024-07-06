import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-ConjvFaO.js";const p={},e=t(`<hr><h1 id="resultset-转换为-map" tabindex="-1"><a class="header-anchor" href="#resultset-转换为-map"><span>ResultSet 转换为 Map</span></a></h1><p>Java应用程序广泛使用Java数据库连接（JDBC）API来连接和在数据库上执行查询。ResultSet是由这些查询提取的数据的表格表示。</p><p>在本教程中，我们将学习如何将JDBC ResultSet的数据转换为Map。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>我们将编写一些测试用例来实现我们的目标。我们的数据源将是一个H2数据库。H2是一个快速的、开源的、内存中的数据库，支持JDBC API。让我们添加相关的Maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.h2database\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`h2\`&lt;/artifactId&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据库连接准备就绪后，我们将编写一个方法来为我们的测试用例进行初始数据设置。为此，我们首先创建一个JDBC Statement，然后使用它创建一个名为employee的数据库表。employee表包含名为empId、empName和empCity的列，将保存有关员工的ID、名称和城市的信息。现在我们可以使用Statement.execute()方法在表中插入示例数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">initialDataSetup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Statement</span> statement <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">&quot;CREATE TABLE employee ( &quot;</span>
      <span class="token operator">+</span> <span class="token string">&quot;empId INTEGER not null, &quot;</span>
      <span class="token operator">+</span> <span class="token string">&quot;empName VARCHAR(50), &quot;</span>
      <span class="token operator">+</span> <span class="token string">&quot;empCity VARCHAR(50), &quot;</span>
      <span class="token operator">+</span> <span class="token string">&quot;PRIMARY KEY (empId))&quot;</span><span class="token punctuation">;</span>

    statement<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` sqlQueryList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
      <span class="token string">&quot;INSERT INTO employee VALUES (1, &#39;Steve&#39;,&#39;London&#39;)&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;INSERT INTO employee VALUES (2, &#39;John&#39;,&#39;London&#39;)&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;INSERT INTO employee VALUES (3, &#39;David&#39;, &#39;Sydney&#39;)&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;INSERT INTO employee VALUES (4, &#39;Kevin&#39;,&#39;London&#39;)&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;INSERT INTO employee VALUES (5, &#39;Jade&#39;, &#39;Sydney&#39;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> query<span class="token operator">:</span> sqlQueryList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        statement<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在示例数据已经存在于数据库中，我们可以查询它以提取。查询数据库给出的输出形式是ResultSet。我们的目标是将来自这个ResultSet的数据转换为一个Map，其中键是城市名称，值是那个城市中员工名称的列表。</p><h3 id="_3-1-使用java-7" tabindex="-1"><a class="header-anchor" href="#_3-1-使用java-7"><span>3.1. 使用Java 7</span></a></h3><p>我们将首先从数据库连接创建一个PreparedStatement，并为其提供一个SQL查询。然后，我们可以使用PreparedStatement.executeQuery()方法来获取ResultSet。</p><p>现在我们可以迭代ResultSet数据并单独获取列数据。为此，我们可以使用ResultSet.getString()方法，通过传递employee表的列名来实现。之后，我们可以使用Map.containsKey()方法来检查映射是否已经包含该城市的条目。如果没有找到该城市的键，我们将添加一个条目，将城市名称作为键，一个空的ArrayList作为值。然后我们将员工的名称添加到该城市员工名称的列表中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingContainsKey_thenConvertResultSetToMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>
        <span class="token string">&quot;SELECT * FROM employee&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> valueMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> empCity <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;empCity&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> empName <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;empName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>valueMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>empCity<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            valueMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>empCity<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        valueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>empCity<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>empName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> valueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;London&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用java-8" tabindex="-1"><a class="header-anchor" href="#_3-2-使用java-8"><span>3.2. 使用Java 8</span></a></h3><p>Java 8引入了lambda表达式和默认方法的概念。我们可以在实现中利用它们来简化输出映射中新键的输入。<strong>我们可以使用Map类中的computeIfAbsent()方法</strong>，它接受两个参数：一个键和一个映射函数。如果找到了键，则返回相关值；否则，它将使用映射函数创建默认值，并将新键值对存储在映射中。</p><p>以下是使用Java 8的先前测试用例的修改版本：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingComputeIfAbsent_thenConvertResultSetToMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>
        <span class="token string">&quot;SELECT * FROM employee&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> valueMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> empCity <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;empCity&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> empName <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;empName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        valueMap<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>empCity<span class="token punctuation">,</span> data <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>empName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> valueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;London&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-使用apache-commons-dbutils" tabindex="-1"><a class="header-anchor" href="#_3-3-使用apache-commons-dbutils"><span>3.3. 使用Apache Commons DbUtils</span></a></h3><p>Apache Commons DbUtils是一个第三方库，为JDBC操作提供了额外和简化的功能。它提供了一个有趣的接口名为ResultSetHandler，它将JDBC ResultSet作为输入，并允许我们将其实现为应用程序期望的对象。此外，这个库使用QueryRunner类在数据库表上运行SQL查询。<strong>QueryRunner的query()方法接受数据库连接、SQL查询和ResultSetHandler作为输入，并直接返回预期的格式。</strong></p><p>让我们看看如何使用ResultSetHandler从ResultSet创建Map的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenUsingDbUtils_thenConvertResultSetToMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>

    <span class="token class-name">ResultSetHandler</span><span class="token operator">&lt;</span><span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;&gt;</span> handler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ResultSetHandler</span><span class="token operator">&lt;</span><span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">ResultSet</span> resultSet<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
            <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> empCity <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;empCity&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> empName <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;empName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                result<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>empCity<span class="token punctuation">,</span> data <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>empName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name">QueryRunner</span> run <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`<span class="token operator">&gt;</span> valueMap <span class="token operator">=</span> run<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> <span class="token string">&quot;SELECT * FROM employee&quot;</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> valueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;London&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总结来说，我们探讨了几种将ResultSet聚合数据并转换为Map的方法，使用Java 7、Java 8和Apache DbUtils库。</p><p>如常，本文的完整代码可以在GitHub上找到。</p>`,25),o=[e];function c(l,u){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-27-Convert ResultSet Into Map.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Convert%20ResultSet%20Into%20Map.html","title":"ResultSet 转换为 Map","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","JDBC"],"tag":["ResultSet","Map"],"head":[["meta",{"name":"keywords","content":"Java, JDBC, ResultSet, Map, 数据库, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Convert%20ResultSet%20Into%20Map.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"ResultSet 转换为 Map"}],["meta",{"property":"og:description","content":"ResultSet 转换为 Map Java应用程序广泛使用Java数据库连接（JDBC）API来连接和在数据库上执行查询。ResultSet是由这些查询提取的数据的表格表示。 在本教程中，我们将学习如何将JDBC ResultSet的数据转换为Map。 2. 设置 我们将编写一些测试用例来实现我们的目标。我们的数据源将是一个H2数据库。H2是一个快速..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T13:30:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"ResultSet"}],["meta",{"property":"article:tag","content":"Map"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T13:30:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ResultSet 转换为 Map\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T13:30:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"ResultSet 转换为 Map Java应用程序广泛使用Java数据库连接（JDBC）API来连接和在数据库上执行查询。ResultSet是由这些查询提取的数据的表格表示。 在本教程中，我们将学习如何将JDBC ResultSet的数据转换为Map。 2. 设置 我们将编写一些测试用例来实现我们的目标。我们的数据源将是一个H2数据库。H2是一个快速..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[{"level":3,"title":"3.1. 使用Java 7","slug":"_3-1-使用java-7","link":"#_3-1-使用java-7","children":[]},{"level":3,"title":"3.2. 使用Java 8","slug":"_3-2-使用java-8","link":"#_3-2-使用java-8","children":[]},{"level":3,"title":"3.3. 使用Apache Commons DbUtils","slug":"_3-3-使用apache-commons-dbutils","link":"#_3-3-使用apache-commons-dbutils","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719495058000,"updatedTime":1719495058000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.71,"words":1112},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Convert ResultSet Into Map.md","localizedDate":"2024年6月27日","excerpt":"<hr>\\n<h1>ResultSet 转换为 Map</h1>\\n<p>Java应用程序广泛使用Java数据库连接（JDBC）API来连接和在数据库上执行查询。ResultSet是由这些查询提取的数据的表格表示。</p>\\n<p>在本教程中，我们将学习如何将JDBC ResultSet的数据转换为Map。</p>\\n<h2>2. 设置</h2>\\n<p>我们将编写一些测试用例来实现我们的目标。我们的数据源将是一个H2数据库。H2是一个快速的、开源的、内存中的数据库，支持JDBC API。让我们添加相关的Maven依赖项：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`&lt;dependency&gt;`\\n    `&lt;groupId&gt;`com.h2database`&lt;/groupId&gt;`\\n    `&lt;artifactId&gt;`h2`&lt;/artifactId&gt;`\\n`&lt;/dependency&gt;`\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
