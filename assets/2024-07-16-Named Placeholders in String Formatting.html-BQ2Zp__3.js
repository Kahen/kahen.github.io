import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B6f8H54y.js";const p={},e=t('<h1 id="java中字符串格式化的命名占位符" tabindex="-1"><a class="header-anchor" href="#java中字符串格式化的命名占位符"><span>Java中字符串格式化的命名占位符</span></a></h1><p>Java标准库提供了<code>String.format()</code>方法来格式化基于模板的字符串，例如<code>String.format(&quot;%s is awesome&quot;, &quot;Java&quot;)</code>。</p><p>在本教程中，我们将探讨如何使字符串格式化支持命名参数。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p><code>String.format()</code>方法使用起来相当直接。然而，当<code>format()</code>调用有很多参数时，很难理解哪个值对应哪个格式说明符，例如：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Employee</span> e <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span> <span class="token comment">// 获取一个员工实例</span>\n<span class="token class-name">String</span> template <span class="token operator">=</span> <span class="token string">&quot;Firstname: %s, Lastname: %s, Id: %s, Company: %s, Role: %s, Department: %s, Address: %s ...&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> e<span class="token punctuation">.</span>firstName<span class="token punctuation">,</span> e<span class="token punctuation">.</span>lastName<span class="token punctuation">,</span> <span class="token class-name"><span class="token namespace">e<span class="token punctuation">.</span></span>Id</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>company<span class="token punctuation">,</span> e<span class="token punctuation">.</span>department<span class="token punctuation">,</span> e<span class="token punctuation">.</span>role <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步来说，当我们将这些参数传递给方法时，很容易出错。例如，在上述示例中，我们错误地将<code>e.department</code>放在了<code>e.role</code>前面。</p><p>因此，如果我们能在模板中使用命名参数，然后通过一个<code>Map</code>来应用格式化，该<code>Map</code>包含所有参数<code>name-&gt;value</code>映射，那将是一件好事：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> template <span class="token operator">=</span> <span class="token string">&quot;Firstname: ${firstname}, Lastname: ${lastname}, Id: ${id} ...&quot;</span><span class="token punctuation">;</span>\nourFormatMethod<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> parameterMap<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在本教程中，我们将首先看一个使用流行的外部库的解决方案，它可以解决这个问题的大多数情况。然后，我们将讨论一个破坏解决方案的边缘情况。</p><p>最后，我们将创建我们自己的<code>format()</code>方法来涵盖所有情况。</p><p>为了简单起见，我们将使用单元测试断言来验证一个方法是否返回了预期的字符串。</p><p>还值得一提的是，<strong>我们本教程将只关注简单字符串格式(<code>%s</code>)</strong>。其他格式类型，如日期、数字或具有定义宽度和精度的格式，不受支持。</p><h2 id="_3-使用apache-commons-text中的stringsubstitutor" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-text中的stringsubstitutor"><span>3. 使用Apache Commons Text中的<code>StringSubstitutor</code></span></a></h2><p>Apache Commons Text库包含了许多方便的字符串处理工具。它带有<code>StringSubstitutor</code>，允许我们根据命名参数进行字符串替换。</p><p>首先，让我们将库作为新的依赖项添加到我们的Maven配置文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.apache.commons`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`commons-text`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`1.10.0`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们总是可以在Maven中央仓库找到最新版本。</p><p>在我们了解如何使用<code>StringSubstitutor</code>类之前，让我们创建一个模板作为示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">TEMPLATE</span> <span class="token operator">=</span> <span class="token string">&quot;Text: [${text}] Number: [${number}] Text again: [${text}]&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们创建一个测试，根据上面的模板使用<code>StringSubstitutor</code>构建一个字符串：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>`````` params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nparams<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;It&#39;s awesome!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nparams<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">StringSubstitutor</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token constant">TEMPLATE</span><span class="token punctuation">,</span> params<span class="token punctuation">,</span> <span class="token string">&quot;${&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Text: [It&#39;s awesome!] Number: [42] Text again: [It&#39;s awesome!]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如测试代码所示，我们让<code>params</code>保存所有<code>name-&gt;value</code>映射。当我们调用<code>StringSubstitutor.replace()</code>方法时，<strong>除了<code>template</code>和<code>params</code>，我们还传递前缀和后缀来告知<code>StringSubstitutor</code>模板中的参数由什么组成</strong>。<code>StringSubstitutor</code>将搜索<code>prefix + map.entry.key + suffix</code>以获取参数名称。</p><p>当我们运行测试时，它通过了。所以，<code>StringSubstitutor</code>似乎解决了问题。</p><h2 id="_4-边缘情况-当替换包含占位符时" tabindex="-1"><a class="header-anchor" href="#_4-边缘情况-当替换包含占位符时"><span>4. 边缘情况：当替换包含占位符时</span></a></h2><p>我们已经看到<code>StringSubstitutor.replace()</code>测试通过了我们的基本用例。然而，一些特殊情况没有被测试覆盖。例如，参数值可能包含参数名称模式“<code>${ … }</code>”。</p><p>现在，让我们测试这个案例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>`````` params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nparams<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&#39;${number}&#39; is a placeholder.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nparams<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">StringSubstitutor</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token constant">TEMPLATE</span><span class="token punctuation">,</span> params<span class="token punctuation">,</span> <span class="token string">&quot;${&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试中，参数“${text}”的值包含文本“${number}”。因此，我们期望“${text}”被文本“${number}”字面替换。</p><p>然而，如果我们执行测试，它会失败：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>opentest4j<span class="token punctuation">.</span></span>AssertionFailedError</span><span class="token operator">:</span>\nexpected<span class="token operator">:</span> <span class="token string">&quot;Text: [&#39;${number}&#39; is a placeholder.] Number: [42] Text again: [&#39;${number}&#39; is a placeholder.]&quot;</span>\n but was<span class="token operator">:</span> <span class="token string">&quot;Text: [&#39;42&#39; is a placeholder.] Number: [42] Text again: [&#39;42&#39; is a placeholder.]&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，<code>StringSubstitutor</code>也将字面<code>${number}</code>视为参数占位符。</p><p>实际上，<code>StringSubstitutor</code>的Javadoc已经说明了这种情况：</p><blockquote><p>变量替换通过调用<code>setEnabledSubstitutionVariables(boolean)</code>与<code>true</code>以递归方式工作。因此，如果一个变量的值包含一个变量，那么这个变量也将被替换。</p></blockquote><p>这是因为，在每一步递归中，<code>StringSubstitutor</code>将上一次替换的结果作为新的<code>template</code>来进行进一步的替换。</p><p>为了绕过这个问题，我们可以选择不同的前缀和后缀，使它们不相互干扰：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">TEMPLATE</span> <span class="token operator">=</span> <span class="token string">&quot;Text: [%{text}] Number: [%{number}] Text again: [%{text}]&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>`````` params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nparams<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&#39;${number}&#39; is a placeholder.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nparams<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">StringSubstitutor</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token constant">TEMPLATE</span><span class="token punctuation">,</span> params<span class="token punctuation">,</span> <span class="token string">&quot;%{&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Text: [&#39;${number}&#39; is a placeholder.] Number: [42] Text again: [&#39;${number}&#39; is a placeholder.]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，从理论上讲，由于我们无法预测值，值总是有可能包含参数名称模式并干扰替换。</p><p>接下来，让我们创建我们自己的<code>format()</code>方法来解决问题。</p><h2 id="_5-自己构建格式化器" tabindex="-1"><a class="header-anchor" href="#_5-自己构建格式化器"><span>5. 自己构建格式化器</span></a></h2><p>我们已经讨论了为什么<code>StringSubstitutor</code>不能很好地处理边缘情况。所以，如果我们创建一个方法，困难在于<strong>我们不应该使用循环或递归来将上一步的结果作为当前步骤的新输入</strong>。</p><h3 id="_5-1-解决问题的思路" tabindex="-1"><a class="header-anchor" href="#_5-1-解决问题的思路"><span>5.1. 解决问题的思路</span></a></h3><p>我们的想法是在模板中搜索参数名称模式。然而，当我们找到一个时，我们不会立即用来自映射的值替换它。相反，我们构建一个新的模板，该模板可以用于标准的<code>String.format()</code>方法。如果我们以我们的例子为例，我们将尝试转换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">TEMPLATE</span> <span class="token operator">=</span> <span class="token string">&quot;Text: [${text}] Number: [${number}] Text again: [${text}]&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>`````` params <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>变为：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> <span class="token constant">NEW_TEMPLATE</span> <span class="token operator">=</span> <span class="token string">&quot;Text: [%s] Number: [%s] Text again: [%s]&quot;</span><span class="token punctuation">;</span>\n<span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>`` valueList <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;&#39;${number}&#39; is a placeholder.&quot;</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">,</span> <span class="token string">&quot;&#39;${number}&#39; is a placeholder.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以调用<code>String.format(NEW_TEMPLATE, valueList.toArray());</code>来完成工作。</p><h3 id="_5-2-创建方法" tabindex="-1"><a class="header-anchor" href="#_5-2-创建方法"><span>5.2. 创建方法</span></a></h3><p>接下来，让我们创建一个方法来实现这个想法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">format</span><span class="token punctuation">(</span><span class="token class-name">String</span> template<span class="token punctuation">,</span> <span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>`````` parameters<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">StringBuilder</span> newTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>`` valueList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\$\\\\{(\\\\w+)}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    <span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> key <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        \n        <span class="token class-name">String</span> paramName <span class="token operator">=</span> <span class="token string">&quot;${&quot;</span> <span class="token operator">+</span> key <span class="token operator">+</span> <span class="token string">&quot;}&quot;</span><span class="token punctuation">;</span>\n        <span class="token keyword">int</span> index <span class="token operator">=</span> newTemplate<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>paramName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            newTemplate<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> index <span class="token operator">+</span> paramName<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;%s&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            valueList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>parameters<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    \n    <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>newTemplate<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> valueList<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码相当直接。让我们快速浏览一下，以理解它的工作原理。</p><p>首先，我们声明了两个新变量来保存新模板（<code>newTemplate</code>）和值列表（<code>valueList</code>）。我们稍后将需要它们来调用<code>String.format()</code>。</p><p>我们使用正则表达式在模板中定位参数名称模式。然后，我们用“%s”替换参数名称模式，并将相应的值添加到<code>valueList</code>变量中。</p><p>最后，我们使用新转换的模板和来自<code>valueList</code>的值调用<code>String.format()</code>。</p><p>为了简单起见，我们在方法中硬编码了前缀“${”和后缀“}”。另外，如果翻译没有结束请继续，结束了请回复OK。</p><p>如果参数“${unknown}”的值没有提供，我们简单地将“${unknown}”参数替换为“null”。</p><h3 id="_5-3-测试我们的format-方法" tabindex="-1"><a class="header-anchor" href="#_5-3-测试我们的format-方法"><span>5.3. 测试我们的<code>format()</code>方法</span></a></h3><p>接下来，让我们测试一下该方法是否适用于常规情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>`````` params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nparams<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;It&#39;s awesome!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nparams<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name">NamedFormatter</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token constant">TEMPLATE</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Text: [It&#39;s awesome!] Number: [42] Text again: [It&#39;s awesome!]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，它会通过。</p><p>当然，我们也想看看它是否适用于边缘情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>params<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&#39;${number}&#39; is a placeholder.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nresult <span class="token operator">=</span> <span class="token class-name">NamedFormatter</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token constant">TEMPLATE</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Text: [&#39;${number}&#39; is a placeholder.] Number: [42] Text again: [&#39;${number}&#39; is a placeholder.]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行这个测试，它也会通过！我们解决了问题。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了如何从一组值中替换基于模板的字符串中的参数。基本上，Apache Commons Text的<code>StringSubstitutor.replace()</code>方法相当直接且易于使用，可以解决大多数情况。然而，当值包含参数名称模式时，<code>StringSubstitutor</code>可能会产生意想不到的结果。</p><p>因此，我们实现了一个<code>format()</code>方法来解决这个边缘情况。</p><p>如常，示例的完整源代码可在GitHub上找到。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p><p>OK</p>',69),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-16-Named Placeholders in String Formatting.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Named%20Placeholders%20in%20String%20Formatting.html","title":"Java中字符串格式化的命名占位符","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","字符串格式化"],"tag":["Java","字符串","格式化","StringSubstitutor","正则表达式"],"head":[["meta",{"name":"keywords","content":"Java字符串格式化, 命名占位符, Apache Commons Text, StringSubstitutor, 正则表达式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Named%20Placeholders%20in%20String%20Formatting.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中字符串格式化的命名占位符"}],["meta",{"property":"og:description","content":"Java中字符串格式化的命名占位符 Java标准库提供了String.format()方法来格式化基于模板的字符串，例如String.format(\\"%s is awesome\\", \\"Java\\")。 在本教程中，我们将探讨如何使字符串格式化支持命名参数。 2. 问题介绍 String.format()方法使用起来相当直接。然而，当format()调用有..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T08:09:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"字符串"}],["meta",{"property":"article:tag","content":"格式化"}],["meta",{"property":"article:tag","content":"StringSubstitutor"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T08:09:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中字符串格式化的命名占位符\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T08:09:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中字符串格式化的命名占位符 Java标准库提供了String.format()方法来格式化基于模板的字符串，例如String.format(\\"%s is awesome\\", \\"Java\\")。 在本教程中，我们将探讨如何使字符串格式化支持命名参数。 2. 问题介绍 String.format()方法使用起来相当直接。然而，当format()调用有..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用Apache Commons Text中的StringSubstitutor","slug":"_3-使用apache-commons-text中的stringsubstitutor","link":"#_3-使用apache-commons-text中的stringsubstitutor","children":[]},{"level":2,"title":"4. 边缘情况：当替换包含占位符时","slug":"_4-边缘情况-当替换包含占位符时","link":"#_4-边缘情况-当替换包含占位符时","children":[]},{"level":2,"title":"5. 自己构建格式化器","slug":"_5-自己构建格式化器","link":"#_5-自己构建格式化器","children":[{"level":3,"title":"5.1. 解决问题的思路","slug":"_5-1-解决问题的思路","link":"#_5-1-解决问题的思路","children":[]},{"level":3,"title":"5.2. 创建方法","slug":"_5-2-创建方法","link":"#_5-2-创建方法","children":[]},{"level":3,"title":"5.3. 测试我们的format()方法","slug":"_5-3-测试我们的format-方法","link":"#_5-3-测试我们的format-方法","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721117371000,"updatedTime":1721117371000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.61,"words":1984},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Named Placeholders in String Formatting.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java标准库提供了<code>String.format()</code>方法来格式化基于模板的字符串，例如<code>String.format(\\"%s is awesome\\", \\"Java\\")</code>。</p>\\n<p>在本教程中，我们将探讨如何使字符串格式化支持命名参数。</p>\\n<h2>2. 问题介绍</h2>\\n<p><code>String.format()</code>方法使用起来相当直接。然而，当<code>format()</code>调用有很多参数时，很难理解哪个值对应哪个格式说明符，例如：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Employee</span> e <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 获取一个员工实例</span>\\n<span class=\\"token class-name\\">String</span> template <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"Firstname: %s, Lastname: %s, Id: %s, Company: %s, Role: %s, Department: %s, Address: %s ...\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">format</span><span class=\\"token punctuation\\">(</span>template<span class=\\"token punctuation\\">,</span> e<span class=\\"token punctuation\\">.</span>firstName<span class=\\"token punctuation\\">,</span> e<span class=\\"token punctuation\\">.</span>lastName<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\"><span class=\\"token namespace\\">e<span class=\\"token punctuation\\">.</span></span>Id</span><span class=\\"token punctuation\\">,</span> e<span class=\\"token punctuation\\">.</span>company<span class=\\"token punctuation\\">,</span> e<span class=\\"token punctuation\\">.</span>department<span class=\\"token punctuation\\">,</span> e<span class=\\"token punctuation\\">.</span>role <span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span> <span class=\\"token punctuation\\">)</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
