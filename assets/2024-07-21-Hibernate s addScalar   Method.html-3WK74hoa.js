import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as d}from"./app-CXN34Kw1.js";const n={},i=d(`<h1 id="hibernate中addscalar-方法的使用" tabindex="-1"><a class="header-anchor" href="#hibernate中addscalar-方法的使用"><span>Hibernate中addScalar()方法的使用</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本快速教程中，我们将通过一个示例讨论Hibernate中使用的_addScalar()_方法。我们将学习如何使用这个方法以及使用它的好处。</p><h2 id="_2-addscalar-解决的问题是什么" tabindex="-1"><a class="header-anchor" href="#_2-addscalar-解决的问题是什么"><span>2. _addScalar()_解决的问题是什么？</span></a></h2><p>通常，在Hibernate中使用原生SQL查询获取结果时，我们使用_createNativeQuery()_方法，然后是_list()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>session.createNativeQuery(&quot;SELECT * FROM Student student&quot;)
  .list();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，Hibernate使用_ResultSetMetadata_来查找列详情，并返回_Object_数组的列表。</p><p>但是，<strong>过度使用_ResultSetMetadata_可能导致性能不佳</strong>，这就是_addScalar()_方法的用处所在。</p><p>通过<strong>使用_addScalar()<em>方法，我们可以防止Hibernate使用_ResultSetMetadata</em></strong>。</p><h2 id="_3-如何使用-addscalar" tabindex="-1"><a class="header-anchor" href="#_3-如何使用-addscalar"><span>3. 如何使用_addScalar()_？</span></a></h2><p>让我们创建一个新方法，使用_addScalar()_方法获取学生列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public List\`\`&lt;Object[]&gt;\`\` fetchColumnWithScalar() {
    return session.createNativeQuery(&quot;SELECT * FROM Student student&quot;)
      .addScalar(&quot;studentId&quot;, StandardBasicTypes.LONG)
      .addScalar(&quot;name&quot;, StandardBasicTypes.STRING)
      .addScalar(&quot;age&quot;, StandardBasicTypes.INTEGER)
      .list();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们需要将列名及其数据类型作为参数指定给_addScalar()_方法。</p><p>现在，Hibernate将不会使用_ResultSetMetadata_来获取列详情，因为我们已经在_addScalar()_中预先定义了它。因此，与之前的方法相比，我们将获得更好的性能。</p><h2 id="_4-其他优势" tabindex="-1"><a class="header-anchor" href="#_4-其他优势"><span>4. 其他优势</span></a></h2><p>让我们看看一些我们可以在其中使用_addScalar()_方法的更多用例。</p><h3 id="_4-1-限制返回的列数" tabindex="-1"><a class="header-anchor" href="#_4-1-限制返回的列数"><span>4.1. 限制返回的列数</span></a></h3><p>我们还可以使用_addScalar()_方法<strong>限制我们的查询返回的列数</strong>。</p><p>让我们编写另一个方法_fetchLimitedColumnWithScalar()_来仅获取学生名称列：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public List\`\`&lt;String&gt;\`\` fetchLimitedColumnWithScalar() {
    return session.createNativeQuery(&quot;SELECT * FROM Student student&quot;)
      .addScalar(&quot;name&quot;, StandardBasicTypes.STRING)
      .list();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在查询中使用了星号来获取学生列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SELECT * FROM Student student
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是，它不会获取所有列，只会返回_list_中的单个列_名称_，因为我们只在_addScalar()_方法中指定了单个列。</p><p>让我们创建一个JUnit方法来验证_fetchLimitedColumnWithScalar()_方法返回的列：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List\`\`&lt;String&gt;\`\` list = scalarExample.fetchLimitedColumnWithScalar();
for (String colValue : list) {
    assertTrue(colValue.startsWith(&quot;John&quot;));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这将返回字符串的_List_而不是_Object_数组。此外，在我们的示例数据中，我们保留了所有以“John”开头的学生名称，这就是为什么我们在上面的单元测试中对列值进行断言的原因。</p><p>这使我们的代码在返回内容方面更加明确。</p><h3 id="_4-2-返回单个标量值" tabindex="-1"><a class="header-anchor" href="#_4-2-返回单个标量值"><span>4.2. 返回单个标量值</span></a></h3><p>我们还可以使用_addScalar()_方法<strong>直接返回单个标量值</strong>，而不是列表。</p><p>让我们创建一个方法，返回所有学生的平均年龄：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public Double fetchAvgAgeWithScalar() {
    return (Double) session.createNativeQuery(&quot;SELECT AVG(age) as avgAge FROM Student student&quot;)
      .addScalar(&quot;avgAge&quot;)
      .uniqueResult();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们用单元测试方法来验证同样的事情：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Double avgAge = scalarExample.fetchAvgAgeWithScalar();
assertEquals(true, (avgAge &gt;= 5 &amp;&amp; avgAge &lt;= 24));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，_fetchAvgAgeScalar()_方法直接返回_Integer_值，我们正在断言它。</p><p>在我们的示例数据中，我们提供了学生年龄在5到24岁之间的随机年龄。因此，在断言期间，我们期望平均年龄在5到24之间。</p><p>类似地，我们可以使用SQL中的任何其他聚合函数，直接使用_addScalar()<em>方法直接获取_count</em>、<em>max</em>、<em>min</em>、_sum_或任何其他单个标量值。</p><h2 id="_5-addscalar-方法的重载" tabindex="-1"><a class="header-anchor" href="#_5-addscalar-方法的重载"><span>5. _addScalar()_方法的重载</span></a></h2><p>我们还有<strong>一个重载的_addScalar()_方法，它只接受列名作为其单一参数</strong>。</p><p>让我们创建一个新方法，并使用重载的_addScalar()_方法，它获取“<em>age</em>”列而不指定其类型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public List\`\`&lt;Object[]&gt;\`\` fetchWithOverloadedScalar() {
    return session.createNativeQuery(&quot;SELECT * FROM Student student&quot;)
      .addScalar(&quot;name&quot;, StandardBasicTypes.STRING)
      .addScalar(&quot;age&quot;)
      .list();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们编写另一个JUnit方法来验证我们的方法是否返回了两列或更多列：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List\`\`&lt;Object[]&gt;\`\` list = scalarExample.fetchColumnWithOverloadedScalar();
for (Object[] colArray : list) {
    assertEquals(2, colArray.length);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这返回了一个_Object_数组的_List_，数组的大小是两个，它代表了列表中的名称和年龄列。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们看到了Hibernate中_addScalar()_方法的用途，如何使用它以及何时使用它，以及一个示例。</p><p>如常，这些示例的代码可以在GitHub上找到。</p>`,46),l=[i];function r(s,c){return t(),a("div",null,l)}const p=e(n,[["render",r],["__file","2024-07-21-Hibernate s addScalar   Method.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Hibernate%20s%20addScalar%20%20%20Method.html","title":"Hibernate中addScalar()方法的使用","lang":"zh-CN","frontmatter":{"date":"2022-04-22T00:00:00.000Z","category":["Hibernate","JPA"],"tag":["Hibernate","JPA","addScalar"],"head":[["meta",{"name":"keywords","content":"Hibernate, addScalar, JPA, SQL, performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Hibernate%20s%20addScalar%20%20%20Method.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Hibernate中addScalar()方法的使用"}],["meta",{"property":"og:description","content":"Hibernate中addScalar()方法的使用 1. 概述 在本快速教程中，我们将通过一个示例讨论Hibernate中使用的_addScalar()_方法。我们将学习如何使用这个方法以及使用它的好处。 2. _addScalar()_解决的问题是什么？ 通常，在Hibernate中使用原生SQL查询获取结果时，我们使用_createNativeQ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T17:12:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Hibernate"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"addScalar"}],["meta",{"property":"article:published_time","content":"2022-04-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T17:12:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hibernate中addScalar()方法的使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T17:12:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Hibernate中addScalar()方法的使用 1. 概述 在本快速教程中，我们将通过一个示例讨论Hibernate中使用的_addScalar()_方法。我们将学习如何使用这个方法以及使用它的好处。 2. _addScalar()_解决的问题是什么？ 通常，在Hibernate中使用原生SQL查询获取结果时，我们使用_createNativeQ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. _addScalar()_解决的问题是什么？","slug":"_2-addscalar-解决的问题是什么","link":"#_2-addscalar-解决的问题是什么","children":[]},{"level":2,"title":"3. 如何使用_addScalar()_？","slug":"_3-如何使用-addscalar","link":"#_3-如何使用-addscalar","children":[]},{"level":2,"title":"4. 其他优势","slug":"_4-其他优势","link":"#_4-其他优势","children":[{"level":3,"title":"4.1. 限制返回的列数","slug":"_4-1-限制返回的列数","link":"#_4-1-限制返回的列数","children":[]},{"level":3,"title":"4.2. 返回单个标量值","slug":"_4-2-返回单个标量值","link":"#_4-2-返回单个标量值","children":[]}]},{"level":2,"title":"5. _addScalar()_方法的重载","slug":"_5-addscalar-方法的重载","link":"#_5-addscalar-方法的重载","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721581970000,"updatedTime":1721581970000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.52,"words":1057},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Hibernate s addScalar   Method.md","localizedDate":"2022年4月22日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本快速教程中，我们将通过一个示例讨论Hibernate中使用的_addScalar()_方法。我们将学习如何使用这个方法以及使用它的好处。</p>\\n<h2>2. _addScalar()_解决的问题是什么？</h2>\\n<p>通常，在Hibernate中使用原生SQL查询获取结果时，我们使用_createNativeQuery()_方法，然后是_list()_方法：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>session.createNativeQuery(\\"SELECT * FROM Student student\\")\\n  .list();\\n</code></pre></div>","autoDesc":true}');export{p as comp,_ as data};
