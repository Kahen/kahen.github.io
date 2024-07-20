import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DfO5Xg_k.js";const p={},e=t(`<h1 id="在java中将jdbc结果集转换为json" tabindex="-1"><a class="header-anchor" href="#在java中将jdbc结果集转换为json"><span>在Java中将JDBC结果集转换为JSON</span></a></h1><p>在某些场景中，我们可能需要通过API调用将数据库查询的结果发送到另一个系统或消息平台。在这种情况下，我们通常使用JSON作为数据交换格式。</p><p>在本教程中，我们将看到将JDBC <code>ResultSet</code> 对象转换为JSON格式的多种方法。</p><h3 id="_2-代码示例" tabindex="-1"><a class="header-anchor" href="#_2-代码示例"><span>2. 代码示例</span></a></h3><p>我们将使用H2数据库作为我们的代码示例。我们有一个示例CSV文件，我们已经使用JDBC将其读入名为 <code>words</code> 的表中。以下是示例CSV文件的三行，第一行是标题：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Username,Id,First name,Last name
doe1,7173,John,Doe
smith3,3722,Dana,Smith
john22,5490,John,Wang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>形成 <code>ResultSet</code> 的代码如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> stmt<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT * FROM words&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于JSON处理，我们使用JSON-Java（<code>org.json</code>）库。首先，我们需要将相应的依赖项添加到我们的POM文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.json\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`json\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`20240303\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-不使用外部依赖" tabindex="-1"><a class="header-anchor" href="#_3-不使用外部依赖"><span>3. 不使用外部依赖</span></a></h3><p>JDBC API早于现代Java集合框架。因此，我们不能使用诸如 <code>for-each</code> 迭代和 <code>Stream</code> 方法。</p><p>相反，我们必须依赖迭代器。此外，我们需要从 <code>ResultSet</code> 的元数据中提取列数和列名列表。</p><p>这导致了一个基本循环，包括为每行形成一个JSON对象，将对象添加到 <code>List</code> 中，最后将该 <code>List</code> 转换为JSON数组。所有这些功能都在 <code>org.json</code> 包中可用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ResultSetMetaData</span> md <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getMetaData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> numCols <span class="token operator">=</span> md<span class="token punctuation">.</span><span class="token function">getColumnCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` colNames <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> numCols<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mapToObj</span><span class="token punctuation">(</span>i <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> md<span class="token punctuation">.</span><span class="token function">getColumnName</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> <span class="token string">&quot;?&quot;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">JSONArray</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JSONObject</span> row <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    colNames<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>cn <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            row<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>cn<span class="token punctuation">,</span> resultSet<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span>cn<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JSONException</span> <span class="token operator">|</span> <span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们首先运行一个循环以提取每个列的名称。我们稍后在形成结果JSON对象时使用这些列名。</p><p>在第二个循环中，我们遍历实际结果，并将每个结果转换为JSON对象，使用我们在前一步计算出的列名。然后我们将所有这些对象添加到JSON数组中。</p><p>我们将列名的提取和列数计算放在循环之外。这有助于提高执行速度。</p><p>生成的JSON看起来像这样：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>
   <span class="token punctuation">{</span>
      <span class="token property">&quot;Username&quot;</span><span class="token operator">:</span><span class="token string">&quot;doe1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;First name&quot;</span><span class="token operator">:</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Id&quot;</span><span class="token operator">:</span><span class="token string">&quot;7173&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Last name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Doe&quot;</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
      <span class="token property">&quot;Username&quot;</span><span class="token operator">:</span><span class="token string">&quot;smith3&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;First name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Dana&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Id&quot;</span><span class="token operator">:</span><span class="token string">&quot;3722&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Last name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Smith&quot;</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
      <span class="token property">&quot;Username&quot;</span><span class="token operator">:</span><span class="token string">&quot;john22&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;First name&quot;</span><span class="token operator">:</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Id&quot;</span><span class="token operator">:</span><span class="token string">&quot;5490&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Last name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Wang&quot;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-使用jooq的默认设置" tabindex="-1"><a class="header-anchor" href="#_4-使用jooq的默认设置"><span>4. 使用jOOQ的默认设置</span></a></h3><p>jOOQ框架（Java Object Oriented Querying）提供了许多方便的实用函数来处理JDBC和 <code>ResultSet</code> 对象。首先，我们需要将jOOQ依赖项添加到我们的POM文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.jooq\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`jooq\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`\`3.11.11\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加依赖项后，我们可以使用单行解决方案将 <code>ResultSet</code> 转换为JSON对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JSONObject</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token constant">DSL</span><span class="token punctuation">.</span><span class="token function">using</span><span class="token punctuation">(</span>dbConnection<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">fetch</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">formatJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成的JSON元素是一个包含两个字段的对象，称为 <code>fields</code> 和 <code>records</code>，其中 <code>fields</code> 具有列的名称和类型，而 <code>records</code> 包含实际数据。这与之前的JSON对象略有不同，对于我们的示例表看起来像这样：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;records&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">&quot;doe1&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;7173&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;Doe&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
      <span class="token string">&quot;smith3&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;3722&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;Dana&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;Smith&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
      <span class="token string">&quot;john22&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;5490&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;Wang&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;schema&quot;</span><span class="token operator">:</span><span class="token string">&quot;PUBLIC&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Username&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;VARCHAR&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;table&quot;</span><span class="token operator">:</span><span class="token string">&quot;WORDS&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;schema&quot;</span><span class="token operator">:</span><span class="token string">&quot;PUBLIC&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Id&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;VARCHAR&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;table&quot;</span><span class="token operator">:</span><span class="token string">&quot;WORDS&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;schema&quot;</span><span class="token operator">:</span><span class="token string">&quot;PUBLIC&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;First name&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;VARCHAR&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;table&quot;</span><span class="token operator">:</span><span class="token string">&quot;WORDS&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;schema&quot;</span><span class="token operator">:</span><span class="token string">&quot;PUBLIC&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Last name&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;VARCHAR&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;table&quot;</span><span class="token operator">:</span><span class="token string">&quot;WORDS&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-使用jooq的自定义设置" tabindex="-1"><a class="header-anchor" href="#_5-使用jooq的自定义设置"><span>5. 使用jOOQ的自定义设置</span></a></h3><p>如果我们不喜欢jOOQ生成的JSON对象的默认结构，我们可以自定义它。</p><p>我们将通过实现 <code>RecordMapper</code> 接口来实现这一点。这个接口有一个 <code>map()</code> 方法，它接收一个 <code>Record</code> 作为输入，并返回任意类型的期望对象。</p><p>然后我们将 <code>RecordMapper</code> 作为输入传递给jOOQ结果类的 <code>map()</code> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span> json <span class="token operator">=</span> <span class="token constant">DSL</span><span class="token punctuation">.</span><span class="token function">using</span><span class="token punctuation">(</span>dbConnection<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">fetch</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RecordMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token annotation punctuation">@Override</span>
      <span class="token keyword">public</span> <span class="token class-name">JSONObject</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Record</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token class-name">JSONObject</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          colNames<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>cn <span class="token operator">-&gt;</span> obj<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>cn<span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>cn<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JSONArray</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们从 <code>map()</code> 方法返回了一个 <code>JSONObject</code>。</p><p>生成的JSON看起来像这样，与第3节类似：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>
   <span class="token punctuation">{</span>
      <span class="token property">&quot;Username&quot;</span><span class="token operator">:</span><span class="token string">&quot;doe1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;First name&quot;</span><span class="token operator">:</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Id&quot;</span><span class="token operator">:</span><span class="token string">&quot;7173&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Last name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Doe&quot;</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
      <span class="token property">&quot;Username&quot;</span><span class="token operator">:</span><span class="token string">&quot;smith3&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;First name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Dana&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Id&quot;</span><span class="token operator">:</span><span class="token string">&quot;3722&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Last name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Smith&quot;</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
      <span class="token property">&quot;Username&quot;</span><span class="token operator">:</span><span class="token string">&quot;john22&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;First name&quot;</span><span class="token operator">:</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Id&quot;</span><span class="token operator">:</span><span class="token string">&quot;5490&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;Last name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Wang&quot;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们探讨了将JDBC <code>ResultSet</code> 转换为JSON对象的三种不同方式。</p><p>每种方法都有自己的用途。我们选择哪一种取决于所需的输出JSON对象的结构，以及可能对依赖大小的限制。</p><p>如常，示例的源代码可在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：</p><p>文章的源代码示例可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,42),o=[e];function c(l,i){return a(),s("div",null,o)}const d=n(p,[["render",c],["__file","2024-07-18-Converting a JDBC ResultSet to JSON in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Converting%20a%20JDBC%20ResultSet%20to%20JSON%20in%20Java.html","title":"在Java中将JDBC结果集转换为JSON","lang":"zh-CN","frontmatter":{"date":"2024-07-19T00:00:00.000Z","category":["Java","JDBC"],"tag":["JSON","转换","结果集"],"head":[["meta",{"name":"keywords","content":"Java, JDBC, JSON, 结果集转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Converting%20a%20JDBC%20ResultSet%20to%20JSON%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中将JDBC结果集转换为JSON"}],["meta",{"property":"og:description","content":"在Java中将JDBC结果集转换为JSON 在某些场景中，我们可能需要通过API调用将数据库查询的结果发送到另一个系统或消息平台。在这种情况下，我们通常使用JSON作为数据交换格式。 在本教程中，我们将看到将JDBC ResultSet 对象转换为JSON格式的多种方法。 2. 代码示例 我们将使用H2数据库作为我们的代码示例。我们有一个示例CSV文件..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T20:09:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"转换"}],["meta",{"property":"article:tag","content":"结果集"}],["meta",{"property":"article:published_time","content":"2024-07-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T20:09:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中将JDBC结果集转换为JSON\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-07-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T20:09:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中将JDBC结果集转换为JSON 在某些场景中，我们可能需要通过API调用将数据库查询的结果发送到另一个系统或消息平台。在这种情况下，我们通常使用JSON作为数据交换格式。 在本教程中，我们将看到将JDBC ResultSet 对象转换为JSON格式的多种方法。 2. 代码示例 我们将使用H2数据库作为我们的代码示例。我们有一个示例CSV文件..."},"headers":[{"level":3,"title":"2. 代码示例","slug":"_2-代码示例","link":"#_2-代码示例","children":[]},{"level":3,"title":"3. 不使用外部依赖","slug":"_3-不使用外部依赖","link":"#_3-不使用外部依赖","children":[]},{"level":3,"title":"4. 使用jOOQ的默认设置","slug":"_4-使用jooq的默认设置","link":"#_4-使用jooq的默认设置","children":[]},{"level":3,"title":"5. 使用jOOQ的自定义设置","slug":"_5-使用jooq的自定义设置","link":"#_5-使用jooq的自定义设置","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721333358000,"updatedTime":1721333358000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4,"words":1200},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Converting a JDBC ResultSet to JSON in Java.md","localizedDate":"2024年7月19日","excerpt":"\\n<p>在某些场景中，我们可能需要通过API调用将数据库查询的结果发送到另一个系统或消息平台。在这种情况下，我们通常使用JSON作为数据交换格式。</p>\\n<p>在本教程中，我们将看到将JDBC <code>ResultSet</code> 对象转换为JSON格式的多种方法。</p>\\n<h3>2. 代码示例</h3>\\n<p>我们将使用H2数据库作为我们的代码示例。我们有一个示例CSV文件，我们已经使用JDBC将其读入名为 <code>words</code> 的表中。以下是示例CSV文件的三行，第一行是标题：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Username,Id,First name,Last name\\ndoe1,7173,John,Doe\\nsmith3,3722,Dana,Smith\\njohn22,5490,John,Wang\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
