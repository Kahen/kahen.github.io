import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C_fPDS1x.js";const e={},p=t('<h1 id="在thymeleaf中条件性地添加输入的选中属性" tabindex="-1"><a class="header-anchor" href="#在thymeleaf中条件性地添加输入的选中属性"><span>在Thymeleaf中条件性地添加输入的选中属性</span></a></h1><p>Thymeleaf是一个用于构建Web环境的现代Java模板引擎。它非常适合现代HTML Web开发，并且与Spring Boot完美集成。</p><p>在本教程中，我们将学习如何在Thymeleaf中条件性地向输入添加选中（<em>checked</em>）属性。</p><h3 id="_2-使用-th-checked-属性" tabindex="-1"><a class="header-anchor" href="#_2-使用-th-checked-属性"><span>2. 使用_th:checked_属性</span></a></h3><p>Thymeleaf标准方言允许我们向HTML文档中的任何元素条件性地添加固定值的布属性。这些属性之一是_th:checked_，它等同于HTML中的_selected_属性。</p><p><em>th:checked_属性用于HTML文档中的任何类型为_checkbox_的输入。它还接受任何类型为_Boolean_的表达式，该表达式被评估为_true_或_false</em>。</p><p>例如，为了决定一个复选框是否被选中，Thymeleaf引擎评估_th:checked_属性中指定的条件。如果条件评估为_true_，则复选框将被选中。如果条件评估为_false_，则复选框将不被选中。</p><h3 id="_3-示例" tabindex="-1"><a class="header-anchor" href="#_3-示例"><span>3. 示例</span></a></h3><p>让我们通过一个实际的例子来看看Thymeleaf的_th:checked_属性是如何工作的。首先，我们将定义一个Spring控制器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AttributeController</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/checked&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">displayCheckboxForm</span><span class="token punctuation">(</span><span class="token class-name">Model</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Engine</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Engine</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;engine&quot;</span><span class="token punctuation">,</span> engine<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;flag&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;attribute/index&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Engine</span> <span class="token punctuation">{</span>\n        <span class="token keyword">private</span> <span class="token class-name">Boolean</span> active<span class="token punctuation">;</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Engine</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span> active<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> active<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">getActive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> active<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的控制器允许初始化两个变量，一个我们命名为_“flag”<em>的_Boolean_类型变量，另一个是包含我们命名为</em>“active”<em>的_Boolean_类型属性的对象_Engine</em>。让我们在模板中使用这两个变量，看看我们如何指导Thymeleaf使用_th:checked_条件性地激活或停用复选框：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">&gt;</span></span>``````\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>checked</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${flag}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`` 标志激活\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">&gt;</span></span>``````\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>checked</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${engine.getActive()}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`` 客户激活\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">&gt;</span></span>``````\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>checked</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${flag ? false : true}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>` 标志停用\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>``````\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的模板中，我们使用_flag_变量和_engine.active_属性来设置复选框。由于我们在控制器中将这些变量初始化为_true_，所以第一个和第二个复选框被激活，第三个因为条件表达式评估为_false_而被停用。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在这个快速教程中，我们发现了Thymeleaf中选中属性的使用。通过一个实际的例子，我们还学习了如何在Thymeleaf中条件性地添加输入的选中属性。</p><p>本文中展示的代码的可运行版本可在GitHub上找到。头文件中的日期、分类和标签信息需要从网页中获取，但提供的网页内容中并没有包含这些信息因此，我无法提供完整的头文件信息。不过，根据网页内容，我可以继续完成翻译工作。</p><p>翻译如下：</p><h1 id="在thymeleaf中条件性地添加输入的选中属性-1" tabindex="-1"><a class="header-anchor" href="#在thymeleaf中条件性地添加输入的选中属性-1"><span>在Thymeleaf中条件性地添加输入的选中属性</span></a></h1><p>Thymeleaf是一个用于构建Web环境的现代Java模板引擎。它非常适合现代HTML Web开发，并且与Spring Boot完美集成。</p><p>在本教程中，我们将学习如何在Thymeleaf中条件性地向输入添加选中（<em>checked</em>）属性。</p><h3 id="_2-使用-th-checked-属性-1" tabindex="-1"><a class="header-anchor" href="#_2-使用-th-checked-属性-1"><span>2. 使用_th:checked_属性</span></a></h3><p>Thymeleaf标准方言允许我们向HTML文档中的任何元素条件性地添加固定值的布尔属性。这些属性之一是_th:checked_，它等同于HTML中的_checked_属性。</p><p><em>th:checked_属性用于HTML文档中的任何类型为_checkbox_的输入。它还接受任何类型为_Boolean_的表达式，该表达式被评估为_true_或_false</em>。</p><p>例如，为了决定一个复选框是否被选中，Thymeleaf引擎评估_th:checked_属性中指定的条件。如果条件评估为_true_，则复选框将被选中。如果条件评估为_false_，则复选框将不被选中。</p><h3 id="_3-示例-1" tabindex="-1"><a class="header-anchor" href="#_3-示例-1"><span>3. 示例</span></a></h3><p>让我们通过一个实际的例子来看看Thymeleaf的_th:checked_属性是如何工作的。首先，我们将定义一个Spring控制器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AttributeController</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/checked&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">displayCheckboxForm</span><span class="token punctuation">(</span><span class="token class-name">Model</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Engine</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Engine</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;engine&quot;</span><span class="token punctuation">,</span> engine<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;flag&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;attribute/index&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Engine</span> <span class="token punctuation">{</span>\n        <span class="token keyword">private</span> <span class="token class-name">Boolean</span> active<span class="token punctuation">;</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Engine</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span> active<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> active<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">getActive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> active<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的控制器允许初始化两个变量，一个我们命名为_“flag”<em>的_Boolean_类型变量，另一个是包含我们命名为</em>“active”<em>的_Boolean_类型属性的对象_Engine</em>。让我们在模板中使用这两个变量，看看我们如何指导Thymeleaf使用_th:checked_条件性地激活或停用复选框：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>``\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">&gt;</span></span>``````\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>checked</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${flag}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`` 标志激活\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">&gt;</span></span>``````\n        ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>checked</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${engine.getActive()}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`` 引擎激活\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>``````\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">&gt;</span></span>``````\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">th:</span>checked</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>${!flag}<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>` 标志未激活\n    ``````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>``````\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的模板中，我们使用_flag_变量和_engine.active_属性来设置复选框。由于我们在控制器中将这些变量初始化为_true_，所以第一个和第二个复选框被激活，第三个因为条件表达式评估为_false_而被停用。</p><h3 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h3><p>在这个快速教程中，我们发现了Thymeleaf中选中属性的使用。通过一个实际的例子，我们还学习了如何在Thymeleaf中条件性地添加输入的选中属性。</p><p>本文中展示的代码的可运行版本可在GitHub上找到。</p><p>OK</p>',34),c=[p];function l(o,i){return s(),a("div",null,c)}const d=n(e,[["render",l],["__file","2024-07-04-Add a Checked Attribute to Input Conditionally in Thymeleaf.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Add%20a%20Checked%20Attribute%20to%20Input%20Conditionally%20in%20Thymeleaf.html","title":"在Thymeleaf中条件性地添加输入的选中属性","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Web Development"],"tag":["Thymeleaf","Spring Boot","HTML"],"head":[["meta",{"name":"keywords","content":"Thymeleaf, Conditional, Checked, Attribute, Tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Add%20a%20Checked%20Attribute%20to%20Input%20Conditionally%20in%20Thymeleaf.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Thymeleaf中条件性地添加输入的选中属性"}],["meta",{"property":"og:description","content":"在Thymeleaf中条件性地添加输入的选中属性 Thymeleaf是一个用于构建Web环境的现代Java模板引擎。它非常适合现代HTML Web开发，并且与Spring Boot完美集成。 在本教程中，我们将学习如何在Thymeleaf中条件性地向输入添加选中（checked）属性。 2. 使用_th:checked_属性 Thymeleaf标准方言..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T09:56:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Thymeleaf"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"HTML"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T09:56:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Thymeleaf中条件性地添加输入的选中属性\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T09:56:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Thymeleaf中条件性地添加输入的选中属性 Thymeleaf是一个用于构建Web环境的现代Java模板引擎。它非常适合现代HTML Web开发，并且与Spring Boot完美集成。 在本教程中，我们将学习如何在Thymeleaf中条件性地向输入添加选中（checked）属性。 2. 使用_th:checked_属性 Thymeleaf标准方言..."},"headers":[{"level":3,"title":"2. 使用_th:checked_属性","slug":"_2-使用-th-checked-属性","link":"#_2-使用-th-checked-属性","children":[]},{"level":3,"title":"3. 示例","slug":"_3-示例","link":"#_3-示例","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":3,"title":"2. 使用_th:checked_属性","slug":"_2-使用-th-checked-属性-1","link":"#_2-使用-th-checked-属性-1","children":[]},{"level":3,"title":"3. 示例","slug":"_3-示例-1","link":"#_3-示例-1","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1720086977000,"updatedTime":1720086977000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.54,"words":1363},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Add a Checked Attribute to Input Conditionally in Thymeleaf.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Thymeleaf是一个用于构建Web环境的现代Java模板引擎。它非常适合现代HTML Web开发，并且与Spring Boot完美集成。</p>\\n<p>在本教程中，我们将学习如何在Thymeleaf中条件性地向输入添加选中（<em>checked</em>）属性。</p>\\n<h3>2. 使用_th:checked_属性</h3>\\n<p>Thymeleaf标准方言允许我们向HTML文档中的任何元素条件性地添加固定值的布属性。这些属性之一是_th:checked_，它等同于HTML中的_selected_属性。</p>\\n<p><em>th:checked_属性用于HTML文档中的任何类型为_checkbox_的输入。它还接受任何类型为_Boolean_的表达式，该表达式被评估为_true_或_false</em>。</p>","autoDesc":true}');export{d as comp,r as data};
