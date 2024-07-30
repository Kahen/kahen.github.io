import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as s}from"./app-CbPcg273.js";const t={},o=s(`<h1 id="hibernate-6中的布尔转换器" tabindex="-1"><a class="header-anchor" href="#hibernate-6中的布尔转换器"><span>Hibernate 6中的布尔转换器</span></a></h1><p>在本教程中，我们将学习如何在Hibernate 6中使用新添加的布尔转换器来映射我们领域模型中的布尔属性。Hibernate 6对类型系统进行了全面翻新。因此，更新移除了一些用于表示布尔值的现有类。</p><h2 id="_2-模型" tabindex="-1"><a class="header-anchor" href="#_2-模型"><span>2. 模型</span></a></h2><p>为了说明如何在Hibernate 6中使用布尔转换器，我们将在测试中使用H2数据库。首先，我们将使用SQL脚本创建一个数据库表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE TABLE Question (
    id UUID,
    content VARCHAR,
    correctAnswer CHAR,
    shouldBeAsked CHAR,
    isEasy TINYINT,
    wasAskedBefore CHAR,
    PRIMARY KEY (id)
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，在Java中，我们将这个表映射到Question实体类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Question</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> content<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> correctAnswer<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> shouldBeAsked<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> isEasy<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> wasAskedBefore<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Question</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 标准的setter和getter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用yesnoconverter映射y和n" tabindex="-1"><a class="header-anchor" href="#_3-使用yesnoconverter映射y和n"><span>3. 使用YesNoConverter映射Y和N</span></a></h2><p>通常，大写字母Y和N用来分别表示true或false的值。以前，我们可以通过使用@Type注解并指定YesNoBooleanType来映射这些值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 旧方法</span>
<span class="token annotation punctuation">@Type</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token string">&quot;org.hibernate.type.YesNoBooleanType&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Boolean</span> someBoolean<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Hibernate 6用YesNoConverter替换了YesNoBooleanType。<strong>由于它是一个转换器，我们必须使用@Convert而不是@Type来使用它。</strong></p><p>让我们将这个新转换器应用到Question中的correctAnswer：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Convert</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name">YesNoConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Boolean</span> correctAnswer<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们验证Y和N是否映射正确：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenFieldAnnotatedWithYesNoConverter_ThenConversionWorks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 测试代码...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用truefalseconverter映射t和f" tabindex="-1"><a class="header-anchor" href="#_4-使用truefalseconverter映射t和f"><span>4. 使用TrueFalseConverter映射T和F</span></a></h2><p>类似地，我们可以使用大写字母T和F来表示布尔值。Hibernate 6移除了TrueFalseBooleanType：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 旧方法</span>
<span class="token annotation punctuation">@Type</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token string">&quot;org.hibernate.type.TrueFalseBooleanType&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Boolean</span> someBoolean<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为替代，我们将使用TrueFalseConverter来指定这种映射。让我们为shouldBeAsked注册它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Convert</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name">TrueFalseConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Boolean</span> shouldBeAsked<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们测试转换是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenFieldAnnotatedWithTrueFalseConverter_ThenConversionWorks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 测试代码...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用numericbooleanconverter映射0和1" tabindex="-1"><a class="header-anchor" href="#_5-使用numericbooleanconverter映射0和1"><span>5. 使用NumericBooleanConverter映射0和1</span></a></h2><p>最后，字母不是表示布尔值的唯一方式。人们通常也使用整数0和1来达到这个目的。过去，我们会使用NumericBooleanType来进行这种表示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 旧方法</span>
<span class="token annotation punctuation">@Type</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token string">&quot;org.hibernate.type.NumericBooleanType&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Boolean</span> someBoolean<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们改用新的NumericBooleanConverter。我们将把零或一的值映射到isEasy：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Convert</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name">NumericBooleanConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Boolean</span> isEasy<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>像往常一样，让我们检查它是否按预期工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenFieldAnnotatedWithNumericBooleanConverter_ThenConversionWorks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 测试代码...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-使用-converterregistration指定默认转换器" tabindex="-1"><a class="header-anchor" href="#_6-使用-converterregistration指定默认转换器"><span>6. 使用@ConverterRegistration指定默认转换器</span></a></h2><p>在每个布尔字段上注释转换器是繁琐且容易出错的。更常见的是，我们在数据库中以一种方式表示布尔值。</p><p>毫不奇怪，Hibernate提供的布尔转换器不会默认自动应用。然而，Hibernate 6.1引入了@ConverterRegistration，我们可以使用它来自动应用现有的转换器。</p><p>为了做到这一点，让我们添加一个package-info.java文件，并在Question类所在的包中添加这个注解，使YesNoConverter默认应用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ConverterRegistration</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name">YesNoConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>booleanconverters<span class="token punctuation">.</span>model</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">ConverterRegistration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>type<span class="token punctuation">.</span></span><span class="token class-name">YesNoConverter</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们没有在@ConverterRegistration中设置autoApply，因为它默认设置为true。Question实体包含布尔字段wasAskedBefore，由于我们没有用任何转换器注释它，Hibernate使用YesNoConverter来映射它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenConverterRegisteredToAutoApply_whenFieldIsNotAnnotated_ThenConversionWorks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 测试代码...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-警告" tabindex="-1"><a class="header-anchor" href="#_7-警告"><span>7. 警告</span></a></h2><p>我们可能开始使用这些新转换器，然后发现Hibernate没有正确填充我们的布尔字段。那可能是因为YesNoConverter和TrueFalseConverter只适用于大写字符。小写字母将被静默映射为null：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenFieldAnnotatedWithYesNoConverter_WhenDbValueIsLowercase_ThenDomainModelValueNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 测试代码...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-使用jpa-attributeconverter映射不同的表示" tabindex="-1"><a class="header-anchor" href="#_8-使用jpa-attributeconverter映射不同的表示"><span>8. 使用JPA AttributeConverter映射不同的表示</span></a></h2><p>我们可能会在数据库中遇到各种布尔表示。如果没有一个默认的Hibernate转换器满足我们的要求，我们必须自己定义映射逻辑。我们可以通过创建JPA Attribute Converter轻松做到这一点。</p><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们学习了如何在Hibernate 6中映射布尔值。</p><p>标准的布尔类型被转换器取代了。因此，我们需要使用@Convert而不是@Type。</p><p>另外，我们必须记住YesNoConverter和TrueFalseConverter不适用于小写字母。为了减少样板代码，我们应该使用@ConverterRegistration自动应用转换器。</p><p>我们看到的Hibernate转换器都是JPA AttributeConverter的实现。如果它们都不符合我们的需求，我们可以编写自己的实现并以相同的方式使用它。</p><p>如常，本文的完整代码示例可在GitHub上找到。</p>`,47),i=[o];function p(l,r){return e(),a("div",null,i)}const u=n(t,[["render",p],["__file","2024-07-06-Boolean Converters in Hibernate 6.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Boolean%20Converters%20in%20Hibernate%206.html","title":"Hibernate 6中的布尔转换器","lang":"zh-CN","frontmatter":{"date":"2024-07-06T00:00:00.000Z","category":["Hibernate","Java"],"tag":["Hibernate 6","Boolean Converters"],"head":[["meta",{"name":"keywords","content":"Hibernate 6, Boolean Converters, Java, 数据库映射, JPA"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Boolean%20Converters%20in%20Hibernate%206.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Hibernate 6中的布尔转换器"}],["meta",{"property":"og:description","content":"Hibernate 6中的布尔转换器 在本教程中，我们将学习如何在Hibernate 6中使用新添加的布尔转换器来映射我们领域模型中的布尔属性。Hibernate 6对类型系统进行了全面翻新。因此，更新移除了一些用于表示布尔值的现有类。 2. 模型 为了说明如何在Hibernate 6中使用布尔转换器，我们将在测试中使用H2数据库。首先，我们将使用SQ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T11:57:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Hibernate 6"}],["meta",{"property":"article:tag","content":"Boolean Converters"}],["meta",{"property":"article:published_time","content":"2024-07-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T11:57:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hibernate 6中的布尔转换器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T11:57:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Hibernate 6中的布尔转换器 在本教程中，我们将学习如何在Hibernate 6中使用新添加的布尔转换器来映射我们领域模型中的布尔属性。Hibernate 6对类型系统进行了全面翻新。因此，更新移除了一些用于表示布尔值的现有类。 2. 模型 为了说明如何在Hibernate 6中使用布尔转换器，我们将在测试中使用H2数据库。首先，我们将使用SQ..."},"headers":[{"level":2,"title":"2. 模型","slug":"_2-模型","link":"#_2-模型","children":[]},{"level":2,"title":"3. 使用YesNoConverter映射Y和N","slug":"_3-使用yesnoconverter映射y和n","link":"#_3-使用yesnoconverter映射y和n","children":[]},{"level":2,"title":"4. 使用TrueFalseConverter映射T和F","slug":"_4-使用truefalseconverter映射t和f","link":"#_4-使用truefalseconverter映射t和f","children":[]},{"level":2,"title":"5. 使用NumericBooleanConverter映射0和1","slug":"_5-使用numericbooleanconverter映射0和1","link":"#_5-使用numericbooleanconverter映射0和1","children":[]},{"level":2,"title":"6. 使用@ConverterRegistration指定默认转换器","slug":"_6-使用-converterregistration指定默认转换器","link":"#_6-使用-converterregistration指定默认转换器","children":[]},{"level":2,"title":"7. 警告","slug":"_7-警告","link":"#_7-警告","children":[]},{"level":2,"title":"8. 使用JPA AttributeConverter映射不同的表示","slug":"_8-使用jpa-attributeconverter映射不同的表示","link":"#_8-使用jpa-attributeconverter映射不同的表示","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1720267052000,"updatedTime":1720267052000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.77,"words":1130},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Boolean Converters in Hibernate 6.md","localizedDate":"2024年7月6日","excerpt":"\\n<p>在本教程中，我们将学习如何在Hibernate 6中使用新添加的布尔转换器来映射我们领域模型中的布尔属性。Hibernate 6对类型系统进行了全面翻新。因此，更新移除了一些用于表示布尔值的现有类。</p>\\n<h2>2. 模型</h2>\\n<p>为了说明如何在Hibernate 6中使用布尔转换器，我们将在测试中使用H2数据库。首先，我们将使用SQL脚本创建一个数据库表：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>CREATE TABLE Question (\\n    id UUID,\\n    content VARCHAR,\\n    correctAnswer CHAR,\\n    shouldBeAsked CHAR,\\n    isEasy TINYINT,\\n    wasAskedBefore CHAR,\\n    PRIMARY KEY (id)\\n)\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
