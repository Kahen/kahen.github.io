import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D5eVDadB.js";const e={},p=t('<hr><h1 id="maven构建失败时的junit覆盖率阈值" tabindex="-1"><a class="header-anchor" href="#maven构建失败时的junit覆盖率阈值"><span>Maven构建失败时的JUnit覆盖率阈值</span></a></h1><p>在本教程中，我们将看到如何使Maven构建在JaCoCo代码覆盖率低于特定阈值时失败。我们将首先查看没有阈值的JaCoCo插件的基本形式。然后，我们将向现有的JaCoCo插件添加一个新的执行，专注于检查覆盖率。</p><p>在这里，我们将触及这个新执行的一些显著元素。然后，我们将扩展一个简单的_ProductService_示例，以查看添加_BRANCH_和_INSTRUCTION_覆盖率规则的效果。我们将看到在特定规则下构建失败。最后，我们将以使用JaCoCo强制执行规则对质量控制的潜在好处作为结论。</p><h3 id="_2-jacoco-maven插件" tabindex="-1"><a class="header-anchor" href="#_2-jacoco-maven插件"><span>2. JaCoCo Maven插件</span></a></h3><p>首先让我们以简单形式使用JaCoCo插件。这意味着我们将使用它来计算代码覆盖率，并在执行_mvn clean install_时生成报告：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.jacoco`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`jacoco-maven-plugin`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`${jacoco.version}`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>excludes</span><span class="token punctuation">&gt;</span></span>`\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclude</span><span class="token punctuation">&gt;</span></span>```com/baeldung/**/ExcludedPOJO.class```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclude</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclude</span><span class="token punctuation">&gt;</span></span>```com/baeldung/**/*DTO.*```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclude</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclude</span><span class="token punctuation">&gt;</span></span>```**/config/*```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclude</span><span class="token punctuation">&gt;</span></span>```\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>excludes</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>`\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>```jacoco-initialize```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>```\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>```prepare-agent```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>```jacoco-site```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>```\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">&gt;</span></span>``package``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>phase</span><span class="token punctuation">&gt;</span></span>``\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>```\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>```report```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-设置示例" tabindex="-1"><a class="header-anchor" href="#_3-设置示例"><span>3. 设置示例</span></a></h3><p>接下来，<strong>让我们以两个简单的服务为例，即_CustomerService_和_ProductService_</strong>。让我们在_ProductService_中添加一个_getSalePrice()_方法，该方法有两个分支，一个用于标志设置为_true_时，另一个用于标志设置为_false_时：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">getSalePrice</span><span class="token punctuation">(</span><span class="token keyword">double</span> originalPrice<span class="token punctuation">,</span> <span class="token keyword">boolean</span> flag<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">double</span> discount<span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>flag<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        discount <span class="token operator">=</span> originalPrice <span class="token operator">-</span> originalPrice <span class="token operator">*</span> <span class="token constant">DISCOUNT</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        discount <span class="token operator">=</span> originalPrice<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> discount<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们编写两个单独的测试，分别覆盖_boolean_ true 和 false 的两种情况：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOriginalPrice_whenGetSalePriceWithFlagTrue_thenReturnsDiscountedPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ProductService</span> productService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">double</span> salePrice <span class="token operator">=</span> productService<span class="token punctuation">.</span><span class="token function">getSalePrice</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>salePrice<span class="token punctuation">,</span> <span class="token number">75</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOriginalPrice_whenGetSalePriceWithFlagFalse_thenReturnsDiscountedPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ProductService</span> productService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">double</span> salePrice <span class="token operator">=</span> productService<span class="token punctuation">.</span><span class="token function">getSalePrice</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>salePrice<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，<em>CustomerService_包含一个简单的方法_getCustomerName()</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCustomerName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token string">&quot;some name&quot;</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来是相应的单元测试，以显示该方法在报告中的覆盖率：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenCustomer_whenGetCustomer_thenReturnNewCustomer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">CustomerService</span> customerService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomerService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>customerService<span class="token punctuation">.</span><span class="token function">getCustomerName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-使用jacoco设置测试覆盖率基线" tabindex="-1"><a class="header-anchor" href="#_4-使用jacoco设置测试覆盖率基线"><span>4. 使用JaCoCo设置测试覆盖率基线</span></a></h3><p>有了一组基本的类和测试设置后，首先执行_mvn clean install_并观察JaCoCo报告的结果。这有助于我们为当前模块的测试覆盖率设置基线：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/successful-build-with-jacoco-300x51.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里，模块构建成功。接下来，让我们查看JaCoCo报告以了解当前的覆盖率：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/jacoco-report-300x36.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>正如我们从报告中看到的，当前的覆盖率是72%，并且Maven构建成功。</p><h3 id="_5-向jacoco插件添加规则" tabindex="-1"><a class="header-anchor" href="#_5-向jacoco插件添加规则"><span>5. 向JaCoCo插件添加规则</span></a></h3><p><strong>现在让我们向插件应用规则，以便基于指令数的总体覆盖率不低于70%，分支覆盖率不应低于68%。</strong></p><p>让我们为此目的在插件中定义一个新的执行：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>```check-coverage```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">&gt;</span></span>``verify``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>phase</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>```check```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>rules</span><span class="token punctuation">&gt;</span></span>`\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>rule</span><span class="token punctuation">&gt;</span></span>``\n                `````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>element</span><span class="token punctuation">&gt;</span></span>`````BUNDLE```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>element</span><span class="token punctuation">&gt;</span></span>```\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>limits</span><span class="token punctuation">&gt;</span></span>``\n                    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>limit</span><span class="token punctuation">&gt;</span></span>```\n                        ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>counter</span><span class="token punctuation">&gt;</span></span>````INSTRUCTION``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>counter</span><span class="token punctuation">&gt;</span></span>``\n                        ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">&gt;</span></span>````COVEREDRATIO``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">&gt;</span></span>``\n                        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>minimum</span><span class="token punctuation">&gt;</span></span>```0.70``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>minimum</span><span class="token punctuation">&gt;</span></span>``\n                    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>limit</span><span class="token punctuation">&gt;</span></span>``\n                    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>limit</span><span class="token punctuation">&gt;</span></span>```\n                        ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>counter</span><span class="token punctuation">&gt;</span></span>````BRANCH``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>counter</span><span class="token punctuation">&gt;</span></span>``\n                        ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">&gt;</span></span>````COVEREDRATIO``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">&gt;</span></span>``\n                        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>minimum</span><span class="token punctuation">&gt;</span></span>```0.68``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>minimum</span><span class="token punctuation">&gt;</span></span>``\n                    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>limit</span><span class="token punctuation">&gt;</span></span>``\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>limits</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>rule</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>rules</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在JaCoCo插件中定义了一个新的执行，其ID为_check-coverage_。我们将它与Maven构建的_verify_阶段关联。**与此执行关联的目标设置为_check_，这意味着此时将执行_jacoco:check_。**接下来，我们定义了在_jacoco:check_期间需要检查的规则。</p><p>接下来，让我们仔细看看在_<code>&lt;rule&gt;</code>_标签内定义的组件：</p><h3 id="_5-1-jacoco中的-element" tabindex="-1"><a class="header-anchor" href="#_5-1-jacoco中的-element"><span>5.1. JaCoCo中的_<code>&lt;element&gt;</code>_</span></a></h3><p>规则的第一部分是_<code>&lt;element&gt;</code>_标签，它定义了规则应用的覆盖元素。覆盖元素代表我们代码中不同粒度级别，例如类、包、方法或行。我们可以通过指定适当的覆盖元素来为该特定级别设置特定的覆盖标准。</p><p>**在这里，我们将覆盖阈值设置在_BUNDLE_级别，它代表整个被分析代码库的总体覆盖率。它将不同单元的覆盖信息，如类、包或模块，组合成一个单一的综合结果。**它通常用于在最高级别定义覆盖规则或阈值，为整个项目的代码覆盖率提供概览。</p><p>此外，如果我们想在类级别设置覆盖阈值，我们会使用_<code>&lt;element&gt;</code> CLASS <code>&lt;/element&gt;</code>_。</p><p>同样，如果我们想在行级别设置阈值，我们可以使用_<code>&lt;element&gt;</code> LINE <code>&lt;/element&gt;</code>_。</p><h3 id="_5-2-jacoco中的-limits" tabindex="-1"><a class="header-anchor" href="#_5-2-jacoco中的-limits"><span>5.2. JaCoCo中的_<code>&lt;limits&gt;</code>_</span></a></h3><p>一旦我们在这里定义了粒度（<em>BUNDLE</em>），我们就定义一个或多个限制。本质上，_limit_封装了我们如何使用一个或多个计数器强制执行代码覆盖的信息。</p><p>每个_<code>&lt;limit&gt;</code><em>包含相应的</em><code>&lt;counter&gt;</code>_, <em><code>&lt;value&gt;</code><em>和</em><code>&lt;minimum&gt;</code><em>或</em><code>&lt;maximum&gt;</code><em>标签。</em><code>&lt;value&gt;</code><em>标签的可能选项是_COVEREDRATIO</em>, <em>COVEREDCOUNT</em>, <em>MISSEDCOUNT_和_TOTALCOUNT</em>。**在我们的示例中，我们使用_COVEREDRATIO</em>，它代表覆盖率。**</p><p>我们将在下一部分更详细地讨论计数器。</p><h3 id="_5-3-jacoco中的-counter" tabindex="-1"><a class="header-anchor" href="#_5-3-jacoco中的-counter"><span>5.3. JaCoCo中的_<code>&lt;counter&gt;</code>_</span></a></h3><p>基本上，这里我们想基于两个计数器；_BRANCH_计数器和_INSTRUCTION_计数器在_BUNDLE_上强制执行阈值；对于这两个计数器，我们都使用_COVEREDRATIO_作为阈值的度量。对于这个示例，我们希望_INSTRUCTION_覆盖率至少为72%，_BRANCH_覆盖率至少为68%。</p><p><strong>_INSTRUCTION_计数器对于理解代码执行水平和识别可能被测试遗漏的区域非常有价值。_BRANCH_计数器使决策点覆盖率的识别成为可能，确保它同时执行_true_和_false_分支。</strong></p><p>_LINE_计数器提供了代码覆盖率的粒度洞察，允许我们确定哪些单独的代码行被覆盖。</p><p>其他可能的计数器选项是_LINE_, <em>COMPLEXITY</em>, <em>METHOD_和_CLASS</em>。这些计数器提供了不同的代码覆盖率视角，并可用于分析代码库的不同方面。</p><p>选择哪些计数器更有用取决于项目的具体目标和要求。然而，<em>INSTRUCTION</em>, _BRANCH_和_LINE_计数器通常是最常用的，并提供了对代码覆盖率的良好总体理解。</p><h3 id="_6-覆盖率下降时构建失败" tabindex="-1"><a class="header-anchor" href="#_6-覆盖率下降时构建失败"><span>6. 覆盖率下降时构建失败</span></a></h3><p>要看到我们的构建由于新强制的规则而失败，让我们禁用以下测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token annotation punctuation">@Disabled</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOriginalPrice_whenGetSalePriceWithFlagFalse_thenReturnsDiscountedPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//...}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们再次运行命令_mvn clean install_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/failed-maven-jacoco-rules300x45.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们发现构建在这一点上失败了，参考失败的覆盖率检查：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>[ERROR] Failed to execute goal org.jacoco:jacoco-maven-plugin:0.8.6:check (check-coverage) on project testing-libraries-2: Coverage checks have not been met.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重要的是，我们观察到_jacoco: check_目标被执行。它使用_JaCoCo.exec_作为分析的来源。接下来，它按照我们在规则的元素标签中指定的，在_BUNDLE_级别上执行分析，并发现Maven构建对于_INSTRUCTION_和_BRANCH_计数器都失败了。</p><p>如结果所示，_INSTRUCTION_计数器的_COVEREDRATIO_值下降到0.68或68%，而最低要求是0.70或70%。此外，_BRANCH_计数器的值是0.50或50%，而预期的最低要求是68%。</p><p>要修复构建，我们需要按照_BUNDLE_元素的要求，使_INSTRUCTION_覆盖率恢复到&gt;=70%，_BRANCH_覆盖率恢复到&gt;=68%。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在本文中，我们看到了如何使我们的代码覆盖率低于特定阈值时Maven构建失败。我们查看了JaCoCo Maven插件提供的各种选项，以在不同粒度级别上强制执行阈值。示例侧重于_BRANCH_和_INSTRUCTION_计数器，其值为_COVEREDRATIO_。</p><p>强制执行覆盖率规则确保我们的代码库始终满足最低级别的测试覆盖率。总的来说，这有助于通过识别缺乏足够测试的区域来提高软件的整体质量。通过在未满足覆盖率规则时使构建失败，我们防止了覆盖率不足的代码在开发生命周期中进一步发展，从而降低了发布未测试或低质量代码的可能性。</p><p>如常，源代码可在GitHub上获得。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/failed-maven-jacoco-rules-300x45.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>OK</p>',59),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-02-Fail Maven Build if JUnit Coverage Falls Below Certain Threshold.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Fail%20Maven%20Build%20if%20JUnit%20Coverage%20Falls%20Below%20Certain%20Threshold.html","title":"Maven构建失败时的JUnit覆盖率阈值","lang":"zh-CN","frontmatter":{"date":"2023-07-01T00:00:00.000Z","category":["Java","Maven"],"tag":["JaCoCo","JUnit","Maven插件"],"head":[["meta",{"name":"keywords","content":"Maven, JaCoCo, JUnit, 代码覆盖率, 构建失败"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Fail%20Maven%20Build%20if%20JUnit%20Coverage%20Falls%20Below%20Certain%20Threshold.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven构建失败时的JUnit覆盖率阈值"}],["meta",{"property":"og:description","content":"Maven构建失败时的JUnit覆盖率阈值 在本教程中，我们将看到如何使Maven构建在JaCoCo代码覆盖率低于特定阈值时失败。我们将首先查看没有阈值的JaCoCo插件的基本形式。然后，我们将向现有的JaCoCo插件添加一个新的执行，专注于检查覆盖率。 在这里，我们将触及这个新执行的一些显著元素。然后，我们将扩展一个简单的_ProductServic..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/07/successful-build-with-jacoco-300x51.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T19:55:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JaCoCo"}],["meta",{"property":"article:tag","content":"JUnit"}],["meta",{"property":"article:tag","content":"Maven插件"}],["meta",{"property":"article:published_time","content":"2023-07-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T19:55:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven构建失败时的JUnit覆盖率阈值\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/07/successful-build-with-jacoco-300x51.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/jacoco-report-300x36.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/failed-maven-jacoco-rules300x45.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/07/failed-maven-jacoco-rules-300x45.png\\"],\\"datePublished\\":\\"2023-07-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T19:55:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Maven构建失败时的JUnit覆盖率阈值 在本教程中，我们将看到如何使Maven构建在JaCoCo代码覆盖率低于特定阈值时失败。我们将首先查看没有阈值的JaCoCo插件的基本形式。然后，我们将向现有的JaCoCo插件添加一个新的执行，专注于检查覆盖率。 在这里，我们将触及这个新执行的一些显著元素。然后，我们将扩展一个简单的_ProductServic..."},"headers":[{"level":3,"title":"2. JaCoCo Maven插件","slug":"_2-jacoco-maven插件","link":"#_2-jacoco-maven插件","children":[]},{"level":3,"title":"3. 设置示例","slug":"_3-设置示例","link":"#_3-设置示例","children":[]},{"level":3,"title":"4. 使用JaCoCo设置测试覆盖率基线","slug":"_4-使用jacoco设置测试覆盖率基线","link":"#_4-使用jacoco设置测试覆盖率基线","children":[]},{"level":3,"title":"5. 向JaCoCo插件添加规则","slug":"_5-向jacoco插件添加规则","link":"#_5-向jacoco插件添加规则","children":[]},{"level":3,"title":"5.1. JaCoCo中的_<element>_","slug":"_5-1-jacoco中的-element","link":"#_5-1-jacoco中的-element","children":[]},{"level":3,"title":"5.2. JaCoCo中的_<limits>_","slug":"_5-2-jacoco中的-limits","link":"#_5-2-jacoco中的-limits","children":[]},{"level":3,"title":"5.3. JaCoCo中的_<counter>_","slug":"_5-3-jacoco中的-counter","link":"#_5-3-jacoco中的-counter","children":[]},{"level":3,"title":"6. 覆盖率下降时构建失败","slug":"_6-覆盖率下降时构建失败","link":"#_6-覆盖率下降时构建失败","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719950139000,"updatedTime":1719950139000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.83,"words":2050},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Fail Maven Build if JUnit Coverage Falls Below Certain Threshold.md","localizedDate":"2023年7月1日","excerpt":"<hr>\\n<h1>Maven构建失败时的JUnit覆盖率阈值</h1>\\n<p>在本教程中，我们将看到如何使Maven构建在JaCoCo代码覆盖率低于特定阈值时失败。我们将首先查看没有阈值的JaCoCo插件的基本形式。然后，我们将向现有的JaCoCo插件添加一个新的执行，专注于检查覆盖率。</p>\\n<p>在这里，我们将触及这个新执行的一些显著元素。然后，我们将扩展一个简单的_ProductService_示例，以查看添加_BRANCH_和_INSTRUCTION_覆盖率规则的效果。我们将看到在特定规则下构建失败。最后，我们将以使用JaCoCo强制执行规则对质量控制的潜在好处作为结论。</p>\\n<h3>2. JaCoCo Maven插件</h3>","autoDesc":true}');export{k as comp,r as data};
