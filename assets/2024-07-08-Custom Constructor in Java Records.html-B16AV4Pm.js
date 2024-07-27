import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const p={},e=t(`<hr><h1 id="java记录中的自定义构造器" tabindex="-1"><a class="header-anchor" href="#java记录中的自定义构造器"><span>Java记录中的自定义构造器</span></a></h1><p>Java记录是Java 14中定义不可变数据容器的简洁方式。</p><p>在本文中，我们将探讨Java记录中的自定义构造器如何通过允许数据验证和错误处理，在对象初始化期间给我们提供更大的控制。</p><h3 id="_2-理解java记录" tabindex="-1"><a class="header-anchor" href="#_2-理解java记录"><span>2. 理解Java记录</span></a></h3><p>记录提供了简洁、易读的语法，强制执行不可变性，并<strong>生成常用方法的标准实现</strong>，如_toString()_、_hashCode()<em>和_equals()</em>。这些实现基于记录的组件，并且由编译器自动生成。</p><p>使用_record_关键字定义记录，后跟记录的名称和组件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">record</span> <span class="token class-name">StudentRecord</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> rollNo<span class="token punctuation">,</span> <span class="token keyword">int</span> marks<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个记录定义创建了一个新的名为_StudentRecord_的记录类，它有三个组件：<em>name</em>、<em>rollNo_和_marks</em>。</p><p>组件是浅不可变实例变量，这意味着一旦创建了记录实例，它们就不能被更改。但是，记录中包含的可变对象可以被更改。</p><p>默认情况下，记录组件是私有的，只能通过访问器方法访问。可以向记录添加自定义方法和行为，但组件必须保持_私有_，并且只能通过访问器方法访问：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStudentRecordData_whenCreated_thenStudentPropertiesMatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StudentRecord</span> s1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StudentRecord</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StudentRecord</span> s2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StudentRecord</span><span class="token punctuation">(</span><span class="token string">&quot;Jane&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> s1<span class="token punctuation">.</span><span class="token function">rollNo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">,</span> s1<span class="token punctuation">.</span><span class="token function">marks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Jane&quot;</span><span class="token punctuation">,</span> s2<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> s2<span class="token punctuation">.</span><span class="token function">rollNo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">80</span><span class="token punctuation">,</span> s2<span class="token punctuation">.</span><span class="token function">marks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用生成的访问器方法来检查记录组件的值。</p><h3 id="_3-如何为java记录创建自定义构造器" tabindex="-1"><a class="header-anchor" href="#_3-如何为java记录创建自定义构造器"><span>3. 如何为Java记录创建自定义构造器</span></a></h3><p>自定义构造器在Java记录中至关重要，因为它们提供了添加进一步逻辑和控制记录对象创建的能力。</p><p>与Java编译器提供的标凈实现相比，自定义构造器为记录提供了更多功能。</p><p>为了确保数据完整性并能够按名称对_StudentRecord_进行排序，我们可以为输入验证和字段初始化创建自定义构造器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">record</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> rollNo<span class="token punctuation">,</span> <span class="token keyword">int</span> marks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Name cannot be null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，自定义构造器检查_name_组件是否为_null_。如果是_null_，它将抛出一个_IllegalArgumentException_。这使我们能够验证输入数据，并确保记录对象以有效状态创建。</p><h3 id="_3-1-对studentrecord对象列表进行排序" tabindex="-1"><a class="header-anchor" href="#_3-1-对studentrecord对象列表进行排序"><span>3.1. 对StudentRecord对象列表进行排序</span></a></h3><p>现在我们已经看到了如何为我们的记录创建自定义构造器，让我们使用这个自定义构造器在示例中按名称对_StudentRecord_对象列表进行排序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStudentRecordsList_whenSortingDataWithName_thenStudentsSorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">StudentRecord</span><span class="token punctuation">&gt;</span></span>\`\`\` studentRecords <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>
        <span class="token keyword">new</span> <span class="token class-name">StudentRecord</span><span class="token punctuation">(</span><span class="token string">&quot;Dana&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">85</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">StudentRecord</span><span class="token punctuation">(</span><span class="token string">&quot;Jim&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">StudentRecord</span><span class="token punctuation">(</span><span class="token string">&quot;Jane&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">StudentRecord</span><span class="token punctuation">&gt;</span></span>\`\`\` mutableStudentRecords <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>studentRecords<span class="token punctuation">)</span><span class="token punctuation">;</span>
    mutableStudentRecords<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparing</span><span class="token punctuation">(</span><span class="token class-name">StudentRecord</span><span class="token operator">::</span><span class="token function">name</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">StudentRecord</span><span class="token punctuation">&gt;</span></span>\`\`\` sortedStudentRecords <span class="token operator">=</span>
      <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">copyOf</span><span class="token punctuation">(</span>mutableStudentRecords<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Jane&quot;</span><span class="token punctuation">,</span> sortedStudentRecords<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们创建了一个_StudentRecord_对象列表，我们能够按_name_进行排序。我们在排序时不需要处理空值，因为_name_永远不会是_null_。</p><p>总之，Java记录中的自定义构造器提供了增加额外逻辑和控制记录对象创建的灵活性。尽管标准实现很简单，但自定义构造器使记录更加多功能和有用。</p><h3 id="_4-java记录中自定义构造器的好处和限制" tabindex="-1"><a class="header-anchor" href="#_4-java记录中自定义构造器的好处和限制"><span>4. Java记录中自定义构造器的好处和限制</span></a></h3><p>像任何语言特性一样，Java记录中的自定义构造器也有自己的一套好处和限制。下面，我们将更详细地探讨这些。</p><h4 id="_4-1-好处" tabindex="-1"><a class="header-anchor" href="#_4-1-好处"><span>4.1. 好处</span></a></h4><p>自定义构造器可以为Java记录带来几个好处。它们可以用来<strong>为传入的数据提供额外的验证</strong>，例如，通过检查值是否在某个范围内或是否满足某些条件。</p><p>例如，假设我们要确保_StudentRecord_中的_marks_字段始终在0到100之间。我们可以创建一个自定义构造器来检查_marks_字段是否在范围内。如果它超出范围，我们可以抛出一个异常或将其设置为默认值，如0：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">StudentRecord</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>marks \`<span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> marks <span class="token operator">&gt;</span>\` <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Marks should be between 0 and 100.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java记录中的自定义构造器也可以<strong>用于提取和聚合相关数据到较少的组件中</strong>，使记录中的数据更容易使用。</p><p>例如，假设我们想要根据他的分数计算一个学生的总成绩。我们可以向_StudentRecord_添加_grade_字段，并创建一个自定义构造器，根据_marks_字段计算成绩。这样，我们可以轻松地访问一个学生的成绩，而不必每次都手动计算：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">record</span> <span class="token class-name">StudentRecordV2</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> rollNo<span class="token punctuation">,</span> <span class="token keyword">int</span> marks<span class="token punctuation">,</span> <span class="token keyword">char</span> grade<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">StudentRecordV2</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> rollNo<span class="token punctuation">,</span> <span class="token keyword">int</span> marks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> rollNo<span class="token punctuation">,</span> marks<span class="token punctuation">,</span> <span class="token function">calculateGrade</span><span class="token punctuation">(</span>marks<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">char</span> <span class="token function">calculateGrade</span><span class="token punctuation">(</span><span class="token keyword">int</span> marks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>marks <span class="token operator">&gt;=</span> <span class="token number">90</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>marks <span class="token operator">&gt;=</span> <span class="token number">80</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token char">&#39;B&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>marks <span class="token operator">&gt;=</span> <span class="token number">70</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token char">&#39;C&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>marks <span class="token operator">&gt;=</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token char">&#39;D&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token char">&#39;F&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，自定义构造器可以<strong>在没有提供参数的情况下为其参数设置默认值</strong>。这在某些情况下非常有用，例如我们想要为某些字段提供默认值或自动生成值，如生成一个新的ID或UUID：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">record</span> <span class="token class-name">StudentRecordV3</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> rollNo<span class="token punctuation">,</span> <span class="token keyword">int</span> marks<span class="token punctuation">,</span> <span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">StudentRecordV3</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> rollNo<span class="token punctuation">,</span> <span class="token keyword">int</span> marks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> rollNo<span class="token punctuation">,</span> marks<span class="token punctuation">,</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2-限制" tabindex="-1"><a class="header-anchor" href="#_4-2-限制"><span>4.2. 限制</span></a></h4><p>尽管自定义构造器可以为Java记录带来许多好处，但它们也带来了某些限制。</p><p>记录构造器的重载需要在第一行显式地委托给另一个记录构造器。这个要求存在是因为所有的构造都必须最终委托给规范构造器。任何重载构造器都必须使用<code>this(...)</code>在它的第一行委托给另一个构造器，来源：java-record-canonical-constructor。</p><p>例如，下面的实现将无法工作，因为我们没有在第一行调用记录构造器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">record</span> <span class="token class-name">StudentRecordV3</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> rollNo<span class="token punctuation">,</span> <span class="token keyword">int</span> marks<span class="token punctuation">,</span> <span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">StudentRecordV3</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> rollNo<span class="token punctuation">,</span> <span class="token keyword">int</span> marks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        name <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> rollNo<span class="token punctuation">,</span> marks<span class="token punctuation">,</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们介绍了Java记录中的自定义构造器，以及它们的好处和限制。</p><p>总之，Java记录和自定义构造器简化了代码，并提高了可读性和可维护性。它们有许多好处，但它们的使用有一些限制，可能不适用于所有用例。</p><p>如常，本文的示例可以在GitHub上找到。</p>`,44),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-08-Custom Constructor in Java Records.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Custom%20Constructor%20in%20Java%20Records.html","title":"Java记录中的自定义构造器","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Records"],"tag":["Java Records","Custom Constructor"],"head":[["meta",{"name":"keywords","content":"Java Records, Custom Constructor, Immutability, Data Validation"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Custom%20Constructor%20in%20Java%20Records.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java记录中的自定义构造器"}],["meta",{"property":"og:description","content":"Java记录中的自定义构造器 Java记录是Java 14中定义不可变数据容器的简洁方式。 在本文中，我们将探讨Java记录中的自定义构造器如何通过允许数据验证和错误处理，在对象初始化期间给我们提供更大的控制。 2. 理解Java记录 记录提供了简洁、易读的语法，强制执行不可变性，并生成常用方法的标准实现，如_toString()_、_hashCode..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T15:38:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Records"}],["meta",{"property":"article:tag","content":"Custom Constructor"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T15:38:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java记录中的自定义构造器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T15:38:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java记录中的自定义构造器 Java记录是Java 14中定义不可变数据容器的简洁方式。 在本文中，我们将探讨Java记录中的自定义构造器如何通过允许数据验证和错误处理，在对象初始化期间给我们提供更大的控制。 2. 理解Java记录 记录提供了简洁、易读的语法，强制执行不可变性，并生成常用方法的标准实现，如_toString()_、_hashCode..."},"headers":[{"level":3,"title":"2. 理解Java记录","slug":"_2-理解java记录","link":"#_2-理解java记录","children":[]},{"level":3,"title":"3. 如何为Java记录创建自定义构造器","slug":"_3-如何为java记录创建自定义构造器","link":"#_3-如何为java记录创建自定义构造器","children":[]},{"level":3,"title":"3.1. 对StudentRecord对象列表进行排序","slug":"_3-1-对studentrecord对象列表进行排序","link":"#_3-1-对studentrecord对象列表进行排序","children":[]},{"level":3,"title":"4. Java记录中自定义构造器的好处和限制","slug":"_4-java记录中自定义构造器的好处和限制","link":"#_4-java记录中自定义构造器的好处和限制","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720453090000,"updatedTime":1720453090000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.42,"words":1626},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Custom Constructor in Java Records.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java记录中的自定义构造器</h1>\\n<p>Java记录是Java 14中定义不可变数据容器的简洁方式。</p>\\n<p>在本文中，我们将探讨Java记录中的自定义构造器如何通过允许数据验证和错误处理，在对象初始化期间给我们提供更大的控制。</p>\\n<h3>2. 理解Java记录</h3>\\n<p>记录提供了简洁、易读的语法，强制执行不可变性，并<strong>生成常用方法的标准实现</strong>，如_toString()_、_hashCode()<em>和_equals()</em>。这些实现基于记录的组件，并且由编译器自动生成。</p>\\n<p>使用_record_关键字定义记录，后跟记录的名称和组件：</p>","autoDesc":true}');export{k as comp,d as data};
