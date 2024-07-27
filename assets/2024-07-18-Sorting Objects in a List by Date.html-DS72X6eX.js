import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CBerKIce.js";const t={},p=e(`<hr><h1 id="在java中按日期对列表中的对象进行排序" tabindex="-1"><a class="header-anchor" href="#在java中按日期对列表中的对象进行排序"><span>在Java中按日期对列表中的对象进行排序</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将讨论如何按日期对列表中的对象进行排序。大多数排序技术或示例让用户按字母顺序排序列表，但本文将讨论如何使用日期对象进行排序。</p><p>我们将看看如何使用Java的Comparator类来<strong>自定义排序我们的列表值</strong>。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>让我们看看本文中将使用的_Employee_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> joiningDate<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Date</span> joiningDate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以注意到我们在_Employee_类中实现了_Comparable_接口。这个接口让我们定义一个策略来比较同一类型的对象。这用于<strong>按自然排序形式或由compareTo()方法定义来排序对象</strong>。</p><h2 id="_3-使用-comparable-进行排序" tabindex="-1"><a class="header-anchor" href="#_3-使用-comparable-进行排序"><span>3. 使用_Comparable_进行排序</span></a></h2><p>在Java中，自然顺序指的是我们应该如何排序数组或集合中的原始类型或对象。<strong>java.util.Arrays和java.util.Collections中的_sort()_方法应该是一致的，并反映等式的语义。</strong></p><p>我们将使用此方法比较当前对象和作为参数传递的对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>

    <span class="token comment">// ...</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">)</span> obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getJoiningDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>employee<span class="token punctuation">.</span><span class="token function">getJoiningDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个_compareTo()_方法将**比较当前对象与作为参数发送的对象。**在上面的例子中，我们比较当前对象的入职日期与传递的Employee对象的入职日期。</p><h3 id="_3-1-按升序排序" tabindex="-1"><a class="header-anchor" href="#_3-1-按升序排序"><span>3.1. 按升序排序</span></a></h3><p>在大多数情况下，_compareTo()_方法**描述了对象之间的比较逻辑，具有自然排序。**这里，我们比较员工的入职日期字段与其他相同类型的对象。如果两个员工有相同的入职日期，他们将返回0：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmpList_SortEmpList_thenSortedListinNaturalOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>employees<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> employeesSortedByDateAsc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，_Collections.sort(employees)_将根据其_joiningDate_而不是其主键或名称来排序员工列表。我们可以看到列表按员工的_joiningDate_排序 - 这现在成为_Employee_类的自然顺序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token class-name">Pearl</span><span class="token punctuation">,</span><span class="token class-name">Tue</span> <span class="token class-name">Apr</span> <span class="token number">27</span> <span class="token number">23</span><span class="token operator">:</span><span class="token number">30</span><span class="token operator">:</span><span class="token number">47</span> <span class="token class-name">IST</span> <span class="token number">2021</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token class-name">Earl</span><span class="token punctuation">,</span><span class="token class-name">Sun</span> <span class="token class-name">Feb</span> <span class="token number">27</span> <span class="token number">23</span><span class="token operator">:</span><span class="token number">30</span><span class="token operator">:</span><span class="token number">47</span> <span class="token class-name">IST</span> <span class="token number">2022</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token class-name">Steve</span><span class="token punctuation">,</span><span class="token class-name">Sun</span> <span class="token class-name">Apr</span> <span class="token number">17</span> <span class="token number">23</span><span class="token operator">:</span><span class="token number">30</span><span class="token operator">:</span><span class="token number">47</span> <span class="token class-name">IST</span> <span class="token number">2022</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token class-name">John</span><span class="token punctuation">,</span><span class="token class-name">Wed</span> <span class="token class-name">Apr</span> <span class="token number">27</span> <span class="token number">23</span><span class="token operator">:</span><span class="token number">30</span><span class="token operator">:</span><span class="token number">47</span> <span class="token class-name">IST</span> <span class="token number">2022</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-按降序排序" tabindex="-1"><a class="header-anchor" href="#_3-2-按降序排序"><span>3.2. 按降序排序</span></a></h3><p>_Collections.reverseOrder()<em>方法**按自然排序的相反顺序排序对象。**这返回一个比较器，将执行相反的排序。当对象在比较中返回_null_时，它将抛出_NullPointerExeption</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmpList_SortEmpList_thenSortedListinDescOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">reverseOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> employeesSortedByDateDesc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-comparator-进行排序" tabindex="-1"><a class="header-anchor" href="#_4-使用-comparator-进行排序"><span>4. 使用_Comparator_进行排序</span></a></h2><h3 id="_4-1-按升序排序" tabindex="-1"><a class="header-anchor" href="#_4-1-按升序排序"><span>4.1. 按升序排序</span></a></h3><p>现在让我们使用_Comparator_接口实现来排序我们的员工列表。这里，我们将在运行时向_Collections.sort()_ API传递一个匿名内部类参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmpList_SortEmpList_thenCheckSortedList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Comparator</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> o1<span class="token punctuation">,</span> <span class="token class-name">Employee</span> o2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> o1<span class="token punctuation">.</span><span class="token function">getJoiningDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>o2<span class="token punctuation">.</span><span class="token function">getJoiningDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> employeesSortedByDateAsc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以用Java 8 Lambda语法替换这种语法，使我们的代码更小，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmpList_SortEmpList_thenCheckSortedListAscLambda</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> <span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparing</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token operator">::</span><span class="token function">getJoiningDate</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> employeesSortedByDateAsc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_compare(arg1, arg2)_方法**接受两个泛型类型的参数，并返回一个整数。**由于它与类定义分离，我们可以根据不同的变量和实体定义自定义比较。这在我们需要为比较参数对象定义不同的自定义排序时很有用。</p><h3 id="_4-2-按降序排序" tabindex="-1"><a class="header-anchor" href="#_4-2-按降序排序"><span>4.2. 按降序排序</span></a></h3><p>我们可以通过反转员工对象的比较来按降序排序给定的_Employee_列表，即比较_Employee2_与_Employee1_。这将反转比较，从而按降序返回结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmpList_SortEmpList_thenCheckSortedListDescV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Comparator</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\`\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> emp1<span class="token punctuation">,</span> <span class="token class-name">Employee</span> emp2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> emp2<span class="token punctuation">.</span><span class="token function">getJoiningDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>emp1<span class="token punctuation">.</span><span class="token function">getJoiningDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> employeesSortedByDateDesc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以将上述方法转换为更简洁的形式，使用Java 8 Lambda表达式。这将执行与上述函数相同的功能，唯一的区别是代码行数比上述代码少。尽管这也使代码的可读性降低。在使用Comparator时，我们为_Collections.sort()_ API传递一个运行时的匿名内部类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenEmpList_SortEmpList_thenCheckSortedListDescLambda</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> <span class="token punctuation">(</span>emp1<span class="token punctuation">,</span> emp2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> emp2<span class="token punctuation">.</span><span class="token function">getJoiningDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>emp1<span class="token punctuation">.</span><span class="token function">getJoiningDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> employeesSortedByDateDesc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了如何在Java集合中按_日期对象_进行升序和降序排序。</p><p>我们还简要看到了Java 8 lambda特性，这些特性在排序中很有用，并有助于使代码更简洁。</p><p>一如既往，本文中使用的所有完整代码示例可以在GitHub上找到。</p>`,38),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","2024-07-18-Sorting Objects in a List by Date.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Sorting%20Objects%20in%20a%20List%20by%20Date.html","title":"在Java中按日期对列表中的对象进行排序","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Java","Collections","Comparator","Comparable","Sorting"],"head":[["meta",{"name":"keywords","content":"Java, Collections, Comparator, Comparable, Sorting"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Sorting%20Objects%20in%20a%20List%20by%20Date.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中按日期对列表中的对象进行排序"}],["meta",{"property":"og:description","content":"在Java中按日期对列表中的对象进行排序 1. 概述 在本教程中，我们将讨论如何按日期对列表中的对象进行排序。大多数排序技术或示例让用户按字母顺序排序列表，但本文将讨论如何使用日期对象进行排序。 我们将看看如何使用Java的Comparator类来自定义排序我们的列表值。 2. 设置 让我们看看本文中将使用的_Employee_实体： 我们可以注意到我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T09:10:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Collections"}],["meta",{"property":"article:tag","content":"Comparator"}],["meta",{"property":"article:tag","content":"Comparable"}],["meta",{"property":"article:tag","content":"Sorting"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T09:10:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中按日期对列表中的对象进行排序\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T09:10:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中按日期对列表中的对象进行排序 1. 概述 在本教程中，我们将讨论如何按日期对列表中的对象进行排序。大多数排序技术或示例让用户按字母顺序排序列表，但本文将讨论如何使用日期对象进行排序。 我们将看看如何使用Java的Comparator类来自定义排序我们的列表值。 2. 设置 让我们看看本文中将使用的_Employee_实体： 我们可以注意到我..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 使用_Comparable_进行排序","slug":"_3-使用-comparable-进行排序","link":"#_3-使用-comparable-进行排序","children":[{"level":3,"title":"3.1. 按升序排序","slug":"_3-1-按升序排序","link":"#_3-1-按升序排序","children":[]},{"level":3,"title":"3.2. 按降序排序","slug":"_3-2-按降序排序","link":"#_3-2-按降序排序","children":[]}]},{"level":2,"title":"4. 使用_Comparator_进行排序","slug":"_4-使用-comparator-进行排序","link":"#_4-使用-comparator-进行排序","children":[{"level":3,"title":"4.1. 按升序排序","slug":"_4-1-按升序排序","link":"#_4-1-按升序排序","children":[]},{"level":3,"title":"4.2. 按降序排序","slug":"_4-2-按降序排序","link":"#_4-2-按降序排序","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721293859000,"updatedTime":1721293859000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.83,"words":1150},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Sorting Objects in a List by Date.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在Java中按日期对列表中的对象进行排序</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将讨论如何按日期对列表中的对象进行排序。大多数排序技术或示例让用户按字母顺序排序列表，但本文将讨论如何使用日期对象进行排序。</p>\\n<p>我们将看看如何使用Java的Comparator类来<strong>自定义排序我们的列表值</strong>。</p>\\n<h2>2. 设置</h2>\\n<p>让我们看看本文中将使用的_Employee_实体：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Employee</span> <span class=\\"token keyword\\">implements</span> <span class=\\"token class-name\\">Comparable</span>````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Employee</span><span class=\\"token punctuation\\">&gt;</span></span>```` <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Date</span> joiningDate<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Employee</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Date</span> joiningDate<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token comment\\">// ...</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token comment\\">// 标准getter和setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
