import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BkL9UgS7.js";const p={},e=t(`<h1 id="通过反射获取记录类中所有字段及其值" tabindex="-1"><a class="header-anchor" href="#通过反射获取记录类中所有字段及其值"><span>通过反射获取记录类中所有字段及其值</span></a></h1><p>记录（record）自Java 14起被引入，用于表示不可变数据。记录包含具有不同值的字段，有时我们需要以编程方式提取所有这些字段及其对应的值。</p><p>在本教程中，我们将探讨如何使用Java的反射API来检索记录类中的所有字段及其值。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>一个示例可以快速解释问题。假设我们有一个名为_Player_的记录：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">record</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">Long</span> score<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如上所示，<em>Player_记录具有三种不同类型的字段：<em>String</em>、基本类型_int_和_Long</em>。我们还创建了一个_Player_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Player</span> <span class="token constant">ERIC</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token number">4242L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们将找到_Player_记录中声明的所有字段，并使用这个ERIC玩家实例，以编程方式提取它们的对应值。</p><p>为了简化，我们将利用单元测试断言来验证每种方法是否产生了预期的结果。</p><p>接下来，让我们深入探讨。</p><h2 id="_3-使用-recordcomponent" tabindex="-1"><a class="header-anchor" href="#_3-使用-recordcomponent"><span>3. 使用_RecordComponent_</span></a></h2><p>我们提到记录类是在Java 14中引入的。与记录一起，一个新的成员来到了_java.lang.reflect_包中：<em>RecordComponent</em>。它是Java 14和15中的预览特性。但在Java 16中，它“升级”为永久特性。<strong>_RecordComponent_类提供了有关记录类组件的信息。</strong></p><p>此外，**_Class_类提供了_getRecordComponents()_方法，如果类对象是_Record_实例，则返回记录类的所有组件。**值得注意的是，<strong>返回数组中的组件与在记录中声明的顺序相同。</strong></p><p>接下来，让我们看看如何结合使用_RecordComponent_和反射API来获取我们的_Player_记录类的所有字段，以及ERIC实例的对应值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> fields <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Field</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RecordComponent</span><span class="token punctuation">[</span><span class="token punctuation">]</span> components <span class="token operator">=</span> <span class="token class-name">Player</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getRecordComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> comp <span class="token operator">:</span> components<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Field</span> field <span class="token operator">=</span> <span class="token constant">ERIC</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span>comp<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        field<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fields<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NoSuchFieldException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 为了简单起见，错误处理被跳过</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建了一个空字段列表来保存我们稍后提取的字段。我们知道<strong>我们可以使用_class.getDeclaredField(fieldName)_方法检索Java类中的声明字段</strong>。因此，_fieldName_成为解决问题的关键。</p><p>_RecordComponent_携带有关记录字段的各种信息，包括类型、名称等。也就是说，如果我们有_PLAYER_的_RecordComponent_对象，我们就可以拥有它的_Field_对象。_Player.class.getRecordComponents()_返回_PLAYER_记录类的所有组件作为一个数组。因此，我们可以通过组件数组中的名称获取所有_Field_对象。</p><p><strong>由于我们稍后想要提取这些字段的值，因此在将每个字段添加到我们的结果字段列表之前，需要设置_setAccessible(true)_。</strong></p><p>接下来，让我们验证我们从上述循环中获得的字段是否符合预期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> fields<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> nameField <span class="token operator">=</span> fields<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> ageField <span class="token operator">=</span> fields<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> scoreField <span class="token operator">=</span> fields<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> nameField<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> nameField<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> nameField<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ERIC</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> ageField<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> ageField<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">28</span><span class="token punctuation">,</span> ageField<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ERIC</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;score&quot;</span><span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4242L</span><span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ERIC</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalAccessException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 为了简单起见，错误处理被跳过</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如断言代码所示，我们可以通过调用_field.get(ERIC)_来获取ERIC实例的值。此外，<strong>在调用此方法时，我们必须捕获_IllegalAccessException_检查异常。</strong></p><h2 id="_4-使用-class-getdeclaredfields" tabindex="-1"><a class="header-anchor" href="#_4-使用-class-getdeclaredfields"><span>4. 使用_Class.getDeclaredFields()_</span></a></h2><p>新的_RecordComponent_允许我们轻松获取记录组件的属性。然而，即使不使用新的_RecordComponent_类，也可以解决这个问题。</p><p>Java反射API提供了**_Class.getDeclaredFields()_方法来获取类中所有声明的字段。**因此，我们可以使用此方法获取记录类的字段。</p><p>值得注意的是，我们不应该使用_Class.getFields()<em>方法来获取记录类的字段。这是因为_getFields()<em>只返回类中声明的_public_字段。然而，**记录类中的所有字段都是_private</em>。**因此，如果我们对记录类调用_Class.getFields()</em>，我们将不会得到任何字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 记录没有公共字段</span>
<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">Player</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们在将每个字段添加到结果列表之前应用_setAccessible(true)_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">var</span> fields <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Field</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> field <span class="token operator">:</span> <span class="token class-name">Player</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    field<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fields<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们检查结果列表中的字段是否与_PLAYER_类匹配，以及我们是否可以通过这些字段获取ERIC对象的预期值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> fields<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> nameField <span class="token operator">=</span> fields<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> ageField <span class="token operator">=</span> fields<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> scoreField <span class="token operator">=</span> fields<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> nameField<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> nameField<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Eric&quot;</span><span class="token punctuation">,</span> nameField<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ERIC</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> ageField<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> ageField<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">28</span><span class="token punctuation">,</span> ageField<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ERIC</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;score&quot;</span><span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4242L</span><span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ERIC</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalAccessException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 为了简单起见，错误处理被跳过</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行测试时，它通过了。所以，这种方法也解决了问题。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>在本文中，我们探讨了使用反射从记录类中提取字段的两种方法。</p><p>在第一种解决方案中，我们从新的_RecordComponent_类中获取了字段名称。然后，我们可以通过调用_Class.getDeclaredField(FieldName)_来获取字段对象。</p><p>记录类也是Java类。因此，作为替代方案，我们还可以从_Class.getDeclaredFields()_方法中获取记录类的所有字段。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,37),c=[e];function o(l,u){return a(),s("div",null,c)}const r=n(p,[["render",o],["__file","2024-06-29-Get All Record Fields and Its Values via Reflection.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Get%20All%20Record%20Fields%20and%20Its%20Values%20via%20Reflection.html","title":"通过反射获取记录类中所有字段及其值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Reflection"],"tag":["Java","Reflection","Record"],"head":[["meta",{"name":"keywords","content":"Java Reflection, Record Fields, 获取字段值"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Get%20All%20Record%20Fields%20and%20Its%20Values%20via%20Reflection.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"通过反射获取记录类中所有字段及其值"}],["meta",{"property":"og:description","content":"通过反射获取记录类中所有字段及其值 记录（record）自Java 14起被引入，用于表示不可变数据。记录包含具有不同值的字段，有时我们需要以编程方式提取所有这些字段及其对应的值。 在本教程中，我们将探讨如何使用Java的反射API来检索记录类中的所有字段及其值。 2. 问题介绍 一个示例可以快速解释问题。假设我们有一个名为_Player_的记录： 如..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T06:35:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Reflection"}],["meta",{"property":"article:tag","content":"Record"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T06:35:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"通过反射获取记录类中所有字段及其值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T06:35:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"通过反射获取记录类中所有字段及其值 记录（record）自Java 14起被引入，用于表示不可变数据。记录包含具有不同值的字段，有时我们需要以编程方式提取所有这些字段及其对应的值。 在本教程中，我们将探讨如何使用Java的反射API来检索记录类中的所有字段及其值。 2. 问题介绍 一个示例可以快速解释问题。假设我们有一个名为_Player_的记录： 如..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用_RecordComponent_","slug":"_3-使用-recordcomponent","link":"#_3-使用-recordcomponent","children":[]},{"level":2,"title":"4. 使用_Class.getDeclaredFields()_","slug":"_4-使用-class-getdeclaredfields","link":"#_4-使用-class-getdeclaredfields","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719642906000,"updatedTime":1719642906000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.43,"words":1330},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Get All Record Fields and Its Values via Reflection.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>记录（record）自Java 14起被引入，用于表示不可变数据。记录包含具有不同值的字段，有时我们需要以编程方式提取所有这些字段及其对应的值。</p>\\n<p>在本教程中，我们将探讨如何使用Java的反射API来检索记录类中的所有字段及其值。</p>\\n<h2>2. 问题介绍</h2>\\n<p>一个示例可以快速解释问题。假设我们有一个名为_Player_的记录：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">record</span> <span class=\\"token class-name\\">Player</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> age<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Long</span> score<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
