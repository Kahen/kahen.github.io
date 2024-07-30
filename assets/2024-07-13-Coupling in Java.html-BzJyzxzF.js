import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const e={},p=t('<h1 id="java中的耦合-baeldung" tabindex="-1"><a class="header-anchor" href="#java中的耦合-baeldung"><span>Java中的耦合 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将学习Java中的耦合，包括每种类型的类型和描述。最后，我们简要描述了依赖倒置原则和控制反转以及它们与耦合的关系。</p><p>当我们谈论耦合时，我们描述的是系统中类彼此依赖的程度。我们在开发过程中的目标是减少耦合。</p><p>考虑以下场景。我们正在设计一个元数据收集应用程序。这个应用程序为我们收集元数据。它以XML格式获取元数据，然后将获取的元数据导出到CSV文件，仅此而已。我们最初的方法可能是，正如我们所看到的那样：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/start-01.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们的模块负责获取、处理和导出数据。然而，这是一个糟糕的设计。这种设计违反了单一职责原则。因此，为了改进我们的第一个设计，我们需要分离关注点。经过这次更改后，我们的设计看起来像这样：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/02.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在，我们的设计被解耦成两个新模块，<em>XML Fetch</em> 和 <em>Export CSV</em>。与此同时，<em>元数据收集模块</em> 依赖于两者。这个设计比我们最初的方法更好，但仍然是一项正在进行中的工作。在接下来的部分中，我们将注意到我们如何根据良好的耦合实践改进我们的设计。</p><h2 id="_3-紧耦合" tabindex="-1"><a class="header-anchor" href="#_3-紧耦合"><span>3. 紧耦合</span></a></h2><p><strong>当一组类高度依赖彼此，或者我们有承担很多责任的类时，这被称为紧耦合</strong>。另一种情况是当一个对象为其使用而创建另一个对象。紧耦合代码难以维护。</p><p>让我们通过我们的基础应用程序来查看这种行为。让我们深入了解一些代码定义。首先，我们的_XMLFetch_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">XMLFetch</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token function">fetchMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` metadata <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// 做一些工作</span>\n        <span class="token keyword">return</span> metadata<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来是_CSVExport_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CSVExport</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token class-name">File</span> <span class="token function">export</span><span class="token punctuation">(</span><span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` metadata<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;导出数据...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// 导出元数据</span>\n        <span class="token class-name">File</span> outputCSV <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> outputCSV<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们的_MetadataCollector_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MetadataCollector</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">XMLFetch</span> xmlFetch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLFetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">CSVExport</span> csvExport <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CSVExport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">collectMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` metadata <span class="token operator">=</span> xmlFetch<span class="token punctuation">.</span><span class="token function">fetchMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        csvExport<span class="token punctuation">.</span><span class="token function">export</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所注意到的，我们的_MetadataCollector_类依赖于_XMLFecth_和_CSVExport_类。此外，它还负责创建它们。</p><p>如果我们想改进我们的收集器，可能添加一个新的JSON数据获取器并以PDF格式导出数据，我们需要将这些新元素包含在我们的类中。让我们编写新的“改进”类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MetadataCollector</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n    <span class="token keyword">private</span> <span class="token class-name">CSVExport</span> csvExport <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CSVExport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">PDFExport</span> pdfExport <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PDFExport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">collectMetadata</span><span class="token punctuation">(</span><span class="token keyword">int</span> inputType<span class="token punctuation">,</span> <span class="token keyword">int</span> outputType<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>outputType <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` metadata <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>inputType <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                metadata <span class="token operator">=</span> xmlFetch<span class="token punctuation">.</span><span class="token function">fetchMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n                metadata <span class="token operator">=</span> jsonFetch<span class="token punctuation">.</span><span class="token function">fetchMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            csvExport<span class="token punctuation">.</span><span class="token function">export</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` metadata <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>inputType <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                metadata <span class="token operator">=</span> xmlFetch<span class="token punctuation">.</span><span class="token function">fetchMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n                metadata <span class="token operator">=</span> jsonFetch<span class="token punctuation">.</span><span class="token function">fetchMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            pdfExport<span class="token punctuation">.</span><span class="token function">export</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Metadata Collector Module_需要一些标志来处理新功能。根据标志值，将实例化相应的子模块。然而，每一项新功能不仅使我们的代码更加复杂，而且使维护更加困难。这是紧耦合的迹象，我们必须避免。</p><h2 id="_4-松耦合" tabindex="-1"><a class="header-anchor" href="#_4-松耦合"><span>4. 松耦合</span></a></h2><p>在开发过程中，我们所有类之间的关系数量需要尽可能少。这被称为松耦合。<strong>松耦合是指一个对象从外部来源获取要使用的对象</strong>。我们的对象彼此独立。松散耦合的代码减少了维护工作量。此外，它为系统提供了更大的灵活性。</p><p>松耦合通过依赖倒置原则来表达。在下一节中，我们将描述它。</p><h2 id="_5-依赖倒置原则" tabindex="-1"><a class="header-anchor" href="#_5-依赖倒置原则"><span>5. 依赖倒置原则</span></a></h2><p><strong>依赖倒置原则（DIP）指的是高级模块不应该依赖低级模块来承担它们的责任</strong>。<strong>两者都应该依赖于抽象</strong>。</p><p>在我们的设计中，这是根本问题。元数据收集器（高级）模块依赖于获取XML和导出CSV数据（低级）模块。</p><p>但我们如何改进我们的设计呢？DIP向我们展示了解决方案，但它并没有谈论如何实现它。在这种情况下，当控制反转（IoC）采取行动时。IoC指的是定义我们模块之间的抽象的方式。总之，它是实现DIP的方式。</p><p>那么，让我们将DIP和IoC应用到我们当前的例子中。首先，我们需要为获取和导出数据定义一个接口。让我们进入代码来看看如何做到这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FetchMetadata</span> <span class="token punctuation">{</span>\n    <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token function">fetchMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单，不是吗？现在我们定义我们的导出接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ExportMetadata</span> <span class="token punctuation">{</span>\n    <span class="token class-name">File</span> <span class="token function">export</span><span class="token punctuation">(</span><span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们需要在相应的类中实现这些接口。简而言之，我们需要更新我们当前的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">XMLFetch</span> <span class="token keyword">implements</span> <span class="token class-name">FetchMetadata</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` <span class="token function">fetchMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` metadata <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// 做一些工作</span>\n        <span class="token keyword">return</span> metadata<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要更新_CSVExport_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CSVExport</span> <span class="token keyword">implements</span> <span class="token class-name">ExportMetadata</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">File</span> <span class="token function">export</span><span class="token punctuation">(</span><span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` metadata<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;导出数据...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// 导出元数据</span>\n        <span class="token class-name">File</span> outputCSV <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> outputCSV<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，更新主模块的代码以支持新的设计更改。让我们看看它看起来如何：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MetadataCollector</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">FetchMetadata</span> fetchMetadata<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">ExportMetadata</span> exportMetadata<span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token class-name">MetadataCollector</span><span class="token punctuation">(</span><span class="token class-name">FetchMetadata</span> fetchMetadata<span class="token punctuation">,</span> <span class="token class-name">ExportMetadata</span> exportMetadata<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>fetchMetadata <span class="token operator">=</span> fetchMetadata<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>exportMetadata <span class="token operator">=</span> exportMetadata<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">collectMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">List</span>````````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>```````````` metadata <span class="token operator">=</span> fetchMetadata<span class="token punctuation">.</span><span class="token function">fetchMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        exportMetadata<span class="token punctuation">.</span><span class="token function">export</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以观察到我们的代码有两个主要变化。首先，类只依赖于抽象，而不是具体类型。另一方面，我们消除了对低级模块的依赖。不需要在收集器模块中保留任何与低级模块创建相关的逻辑。与这些模块的交互是通过一个标准接口进行的。这种设计的优点是我们可以添加新的模块来获取和导出数据，而我们的收集器代码不会改变。</p><p>通过应用DIP和IoC，我们改进了我们的系统设计。<strong>通过反转（改变）控制，应用程序变得解耦、可测试、可扩展和可维护</strong>。以下图片显示了当前设计的样子：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/03.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>最后，我们从代码库中移除了任何紧密耦合的代码，并使用DIP和IoC增强了初始设计，使用松散耦合的代码。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们涵盖了Java中的耦合。我们首先了解了耦合的一般定义。然后，我们观察了紧密耦合和松散耦合之间的区别。后来，我们学习了如何应用DIP与IoC来获得松散耦合的代码。这个演示是通过遵循一个示例设计完成的。我们可以看到，通过应用良好的设计模式，我们的代码在每一步都有所改进。</p><p>像往常一样，我们的代码可以在GitHub上找到。</p>',45),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","2024-07-13-Coupling in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Coupling%20in%20Java.html","title":"Java中的耦合 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-10-04T00:00:00.000Z","category":["Java","Software Development"],"tag":["Coupling","Design Patterns","Inversion of Control"],"head":[["meta",{"name":"keywords","content":"Java, Coupling, Software Development, Design Patterns, Inversion of Control"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Coupling%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的耦合 | Baeldung"}],["meta",{"property":"og:description","content":"Java中的耦合 | Baeldung 1. 引言 在本教程中，我们将学习Java中的耦合，包括每种类型的类型和描述。最后，我们简要描述了依赖倒置原则和控制反转以及它们与耦合的关系。 当我们谈论耦合时，我们描述的是系统中类彼此依赖的程度。我们在开发过程中的目标是减少耦合。 考虑以下场景。我们正在设计一个元数据收集应用程序。这个应用程序为我们收集元数据。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/10/start-01.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T12:04:59.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Coupling"}],["meta",{"property":"article:tag","content":"Design Patterns"}],["meta",{"property":"article:tag","content":"Inversion of Control"}],["meta",{"property":"article:published_time","content":"2022-10-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T12:04:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的耦合 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/10/start-01.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/02.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/03.png\\"],\\"datePublished\\":\\"2022-10-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T12:04:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的耦合 | Baeldung 1. 引言 在本教程中，我们将学习Java中的耦合，包括每种类型的类型和描述。最后，我们简要描述了依赖倒置原则和控制反转以及它们与耦合的关系。 当我们谈论耦合时，我们描述的是系统中类彼此依赖的程度。我们在开发过程中的目标是减少耦合。 考虑以下场景。我们正在设计一个元数据收集应用程序。这个应用程序为我们收集元数据。..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"3. 紧耦合","slug":"_3-紧耦合","link":"#_3-紧耦合","children":[]},{"level":2,"title":"4. 松耦合","slug":"_4-松耦合","link":"#_4-松耦合","children":[]},{"level":2,"title":"5. 依赖倒置原则","slug":"_5-依赖倒置原则","link":"#_5-依赖倒置原则","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720872299000,"updatedTime":1720872299000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.83,"words":1750},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Coupling in Java.md","localizedDate":"2022年10月4日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将学习Java中的耦合，包括每种类型的类型和描述。最后，我们简要描述了依赖倒置原则和控制反转以及它们与耦合的关系。</p>\\n<p>当我们谈论耦合时，我们描述的是系统中类彼此依赖的程度。我们在开发过程中的目标是减少耦合。</p>\\n<p>考虑以下场景。我们正在设计一个元数据收集应用程序。这个应用程序为我们收集元数据。它以XML格式获取元数据，然后将获取的元数据导出到CSV文件，仅此而已。我们最初的方法可能是，正如我们所看到的那样：</p>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2022/10/start-01.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{r as comp,k as data};
