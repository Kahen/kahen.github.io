import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-BFSC0J8L.js";const i={},r=n(`<h1 id="解决hibernate查询异常-未绑定的命名参数" tabindex="-1"><a class="header-anchor" href="#解决hibernate查询异常-未绑定的命名参数"><span>解决Hibernate查询异常：未绑定的命名参数</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这篇简短的教程中，我们将阐明如何解决Hibernate查询异常：“命名参数未绑定”。</p><p>首先，我们将解释异常的主要原因。然后，我们将演示如何重现它，最后，我们将学习如何修复它。</p><h2 id="_2-理解异常" tabindex="-1"><a class="header-anchor" href="#_2-理解异常"><span>2. 理解异常</span></a></h2><p>在跳转到解决方案之前，让我们尝试理解异常及其堆栈跟踪的含义。</p><p>简而言之，Hibernate抛出_QueryException_来表示在将Hibernate查询转换为SQL时由于无效语法而出现错误。因此，堆栈跟踪中的“命名参数未绑定”表示Hibernate无法绑定在特定查询中指定的命名参数。</p><p>通常，命名参数以冒号(:)开头，后面跟着实际值的占位符，该值需要在执行查询之前设置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SELECT p FROM Person p WHERE p.firstName = :firstName;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们异常最常见的原因之一是在Hibernate查询中忘记为命名参数分配值。</p><h2 id="_3-重现异常" tabindex="-1"><a class="header-anchor" href="#_3-重现异常"><span>3. 重现异常</span></a></h2><p>现在我们知道了异常的主要原因，让我们深入研究并使用一个实际的例子来查看如何重现它。</p><p>首先，让我们考虑这个_Person_实体类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
public class Person {
    @Id
    private int id;
    private String firstName;
    private String lastName;

   // 标准的getter和setter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，<em>@Entity_注解表示我们的类是一个映射数据库表的实体。此外，</em>@Id_表示_id_属性代表主键。</p><p>现在，让我们创建一个带有命名参数的Hibernate查询，并假装忘记为我们的参数设置值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenNotSettingValueToNamedParameter_thenThrowQueryException() {
    Exception exception = assertThrows(QueryException.class, () -&gt; {
        Query\`\`&lt;Person&gt;\`\` query = session.createQuery(&quot;FROM Person p WHERE p.firstName = :firstName&quot;, Person.class);
        query.list();
    });

    String expectedMessage = &quot;Named parameter not bound&quot;;
    String actualMessage = exception.getMessage();

    assertTrue(actualMessage.contains(expectedMessage));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所见，测试用例因_QueryException_: &quot;命名参数未绑定&quot;而失败。这里的原因是Hibernate对命名参数_firstName_一无所知，并期望在执行查询之前设置此参数。</p><h2 id="_4-修复异常" tabindex="-1"><a class="header-anchor" href="#_4-修复异常"><span>4. 修复异常</span></a></h2><p>避免在这种情况下抛出_QueryException_的解决方案是在执行查询之前为命名参数分配一个值。为此，我们可以使用_setParameter()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenSettingValueToNamedParameter_thenDoNotThrowQueryException() {
    Query\`\`&lt;Person&gt;\`\` query = session.createQuery(&quot;FROM Person p WHERE p.firstName = :firstName&quot;, Person.class);
    query.setParameter(&quot;firstName&quot;, &quot;Azhrioun&quot;);

    assertNotNull(query.list());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，测试用例成功通过。_setParameter()_调用告诉Hibernate在执行查询时使用我们命名参数的哪个值。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这篇简短的文章中，我们解释了Hibernate抛出_QueryException: “命名参数未绑定”_的原因。然后，我们使用一个实际的例子来说明如何重现异常以及如何修复它。</p><h2 id="如往常一样-示例的完整源代码可以在github上找到。" tabindex="-1"><a class="header-anchor" href="#如往常一样-示例的完整源代码可以在github上找到。"><span>如往常一样，示例的完整源代码可以在GitHub上找到。</span></a></h2>`,25),s=[r];function d(l,o){return a(),t("div",null,s)}const u=e(i,[["render",d],["__file","2024-06-25-Fixing Hibernate QueryException  Named Parameter Not Bound.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Fixing%20Hibernate%20QueryException%20%20Named%20Parameter%20Not%20Bound.html","title":"解决Hibernate查询异常：未绑定的命名参数","lang":"zh-CN","frontmatter":{"date":"2024-06-25T00:00:00.000Z","category":["Hibernate","QueryException"],"tag":["QueryException","Named Parameter"],"head":[["meta",{"name":"keywords","content":"Hibernate, QueryException, Named Parameter, SQL, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Fixing%20Hibernate%20QueryException%20%20Named%20Parameter%20Not%20Bound.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决Hibernate查询异常：未绑定的命名参数"}],["meta",{"property":"og:description","content":"解决Hibernate查询异常：未绑定的命名参数 1. 概述 在这篇简短的教程中，我们将阐明如何解决Hibernate查询异常：“命名参数未绑定”。 首先，我们将解释异常的主要原因。然后，我们将演示如何重现它，最后，我们将学习如何修复它。 2. 理解异常 在跳转到解决方案之前，让我们尝试理解异常及其堆栈跟踪的含义。 简而言之，Hibernate抛出_Q..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T04:31:37.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"QueryException"}],["meta",{"property":"article:tag","content":"Named Parameter"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T04:31:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决Hibernate查询异常：未绑定的命名参数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T04:31:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决Hibernate查询异常：未绑定的命名参数 1. 概述 在这篇简短的教程中，我们将阐明如何解决Hibernate查询异常：“命名参数未绑定”。 首先，我们将解释异常的主要原因。然后，我们将演示如何重现它，最后，我们将学习如何修复它。 2. 理解异常 在跳转到解决方案之前，让我们尝试理解异常及其堆栈跟踪的含义。 简而言之，Hibernate抛出_Q..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解异常","slug":"_2-理解异常","link":"#_2-理解异常","children":[]},{"level":2,"title":"3. 重现异常","slug":"_3-重现异常","link":"#_3-重现异常","children":[]},{"level":2,"title":"4. 修复异常","slug":"_4-修复异常","link":"#_4-修复异常","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]},{"level":2,"title":"如往常一样，示例的完整源代码可以在GitHub上找到。","slug":"如往常一样-示例的完整源代码可以在github上找到。","link":"#如往常一样-示例的完整源代码可以在github上找到。","children":[]}],"git":{"createdTime":1719289897000,"updatedTime":1719289897000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.33,"words":698},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Fixing Hibernate QueryException  Named Parameter Not Bound.md","localizedDate":"2024年6月25日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在这篇简短的教程中，我们将阐明如何解决Hibernate查询异常：“命名参数未绑定”。</p>\\n<p>首先，我们将解释异常的主要原因。然后，我们将演示如何重现它，最后，我们将学习如何修复它。</p>\\n<h2>2. 理解异常</h2>\\n<p>在跳转到解决方案之前，让我们尝试理解异常及其堆栈跟踪的含义。</p>\\n<p>简而言之，Hibernate抛出_QueryException_来表示在将Hibernate查询转换为SQL时由于无效语法而出现错误。因此，堆栈跟踪中的“命名参数未绑定”表示Hibernate无法绑定在特定查询中指定的命名参数。</p>\\n<p>通常，命名参数以冒号(:)开头，后面跟着实际值的占位符，该值需要在执行查询之前设置：</p>","autoDesc":true}');export{u as comp,m as data};
