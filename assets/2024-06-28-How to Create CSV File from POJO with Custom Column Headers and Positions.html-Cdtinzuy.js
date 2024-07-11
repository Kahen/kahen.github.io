import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-bN4DcMMr.js";const p={},e=t('<h1 id="如何使用自定义列头和位置从pojo创建csv文件" tabindex="-1"><a class="header-anchor" href="#如何使用自定义列头和位置从pojo创建csv文件"><span>如何使用自定义列头和位置从POJO创建CSV文件</span></a></h1><p>CSV是系统和应用程序之间常见的数据交换格式之一。一个常见的用例是构建处理这些CSV文件的Java应用程序。在将数据写入CSV文件时，我们需要将我们的普通旧Java对象（POJO）映射到CSV格式。</p><p>在本教程中，我们将学习如何使用自定义位置和标题名称将POJO映射到CSV格式。</p><h2 id="_2-opencsv库" tabindex="-1"><a class="header-anchor" href="#_2-opencsv库"><span>2. OpenCSV库</span></a></h2><p>OpenCSV是处理CSV文件的非常流行的库。我们首先需要向我们的项目添加Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`com.opencsv`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`opencsv`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`5.9`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-生成输入记录" tabindex="-1"><a class="header-anchor" href="#_3-生成输入记录"><span>3. 生成输入记录</span></a></h2><p>对于本文，我们将生成样本输入记录，我们将将其映射到CSV记录。</p><h3 id="_3-1-应用程序记录" tabindex="-1"><a class="header-anchor" href="#_3-1-应用程序记录"><span>3.1. 应用程序记录</span></a></h3><p>应用程序记录是一个简单的POJO，包含_id, name, age,_ 和 <em>created_at</em> 字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Application</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Integer</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> created_at<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-应用程序列表" tabindex="-1"><a class="header-anchor" href="#_3-2-应用程序列表"><span>3.2. 应用程序列表</span></a></h3><p>我们将生成稍后将转换为CSV格式的应用程序列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application</span><span class="token punctuation">&gt;</span></span>```````` applications <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>\n  <span class="token keyword">new</span> <span class="token class-name">Application</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Sam&quot;</span><span class="token punctuation">,</span> <span class="token number">34</span><span class="token punctuation">,</span> <span class="token string">&quot;2023-08-11&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">Application</span><span class="token punctuation">(</span><span class="token string">&quot;456&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Tam&quot;</span><span class="token punctuation">,</span> <span class="token number">44</span><span class="token punctuation">,</span> <span class="token string">&quot;2023-02-11&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token keyword">new</span> <span class="token class-name">Application</span><span class="token punctuation">(</span><span class="token string">&quot;890&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Jam&quot;</span><span class="token punctuation">,</span> <span class="token number">54</span><span class="token punctuation">,</span> <span class="token string">&quot;2023-03-11&quot;</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认的POJO到CSV的映射是直接的。我们可以使用定义了分隔符和其他配置的_StatefulBeanToCsvBuilder_，然后我们可以使用_FilerWriter_来写入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">beanToCSVWithDefault</span><span class="token punctuation">(</span><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application</span><span class="token punctuation">&gt;</span></span>```````` applications<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">&quot;application.csv&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">var</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StatefulBeanToCsvBuilder</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application</span><span class="token punctuation">&gt;</span></span>````````<span class="token punctuation">(</span>writer<span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">withQuotechar</span><span class="token punctuation">(</span><span class="token class-name">CSVWriter</span><span class="token punctuation">.</span><span class="token constant">NO_QUOTE_CHARACTER</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">withSeparator</span><span class="token punctuation">(</span><span class="token char">&#39;,&#39;</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n      builder<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>applications<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>默认映射将POJO转换为按字段名称升序排列的CSV，但如果我们想要自定义格式的标题，这并不理想。</strong></p><p>如果我们想要带有自定义标题的输出CSV文件，我们可以在写入CSV文件时定义并使用自定义标题策略。</p><p>例如，如果我们想要带有小写名称的标题，我们可以覆盖_generateHeader_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomCSVWriterStrategy</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```` <span class="token keyword">extends</span> <span class="token class-name">HeaderColumnNameMappingStrategy</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">generateHeader</span><span class="token punctuation">(</span><span class="token class-name">T</span> bean<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CsvRequiredFieldEmptyException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> header <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">generateHeader</span><span class="token punctuation">(</span>bean<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">toLowerCase</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们有了自定义的标题映射策略，我们就可以构建_StatefulBeanToCsvBuilder_，然后以CSV格式将POJO写入CSV文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">beanToCSVWithCustomHeaderStrategy</span><span class="token punctuation">(</span><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application</span><span class="token punctuation">&gt;</span></span>```````` applications<span class="token punctuation">)</span>\n  <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">CsvRequiredFieldEmptyException</span><span class="token punctuation">,</span> <span class="token class-name">CsvDataTypeMismatchException</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">&quot;application.csv&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n      <span class="token keyword">var</span> mappingStrategy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomCSVWriterStrategy</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application</span><span class="token punctuation">&gt;</span></span>````````<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      mappingStrategy<span class="token punctuation">.</span><span class="token function">setType</span><span class="token punctuation">(</span><span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n      <span class="token keyword">var</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StatefulBeanToCsvBuilder</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application</span><span class="token punctuation">&gt;</span></span>````````<span class="token punctuation">(</span>writer<span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">withQuotechar</span><span class="token punctuation">(</span><span class="token class-name">CSVWriter</span><span class="token punctuation">.</span><span class="token constant">NO_QUOTE_CHARACTER</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">withMappingStrategy</span><span class="token punctuation">(</span>mappingStrategy<span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      builder<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>applications<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-自定义位置策略" tabindex="-1"><a class="header-anchor" href="#_4-2-自定义位置策略"><span>4.2. 自定义位置策略</span></a></h3><p><strong>使用具有特定定义位置的CSV字段写入CSV文件也是可能的。</strong> 我们所要做的就是使用所需字段位置注解应用程序记录属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Application</span><span class="token punctuation">(</span>\n    <span class="token annotation punctuation">@CsvBindByPosition</span><span class="token punctuation">(</span>position <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>\n    <span class="token class-name">String</span> id<span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@CsvBindByPosition</span><span class="token punctuation">(</span>position <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>\n    <span class="token class-name">String</span> name<span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@CsvBindByPosition</span><span class="token punctuation">(</span>position <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>\n    <span class="token class-name">Integer</span> age<span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@CsvBindByPosition</span><span class="token punctuation">(</span>position <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span>\n    <span class="token class-name">String</span> created_at<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以使用注解的_Application_记录将_POJO_写入_CSV_格式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">beanToCSVWithCustomPositionStrategy</span><span class="token punctuation">(</span><span class="token class-name">List</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application</span><span class="token punctuation">&gt;</span></span>```````` applications<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">&quot;application3.csv&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">var</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StatefulBeanToCsvBuilder</span>````````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application</span><span class="token punctuation">&gt;</span></span>````````<span class="token punctuation">(</span>writer<span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">withQuotechar</span><span class="token punctuation">(</span><span class="token class-name">CSVWriter</span><span class="token punctuation">.</span><span class="token constant">NO_QUOTE_CHARACTER</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n      builder<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>applications<span class="token punctuation">)</span><span class="token punctuation">;</span>\n   <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-自定义位置策略和标题名称" tabindex="-1"><a class="header-anchor" href="#_4-3-自定义位置策略和标题名称"><span>4.3. 自定义位置策略和标题名称</span></a></h3><p><strong>如果我们想要CSV字段以及特定位置的标题，我们可以使用自定义列定位策略来实现。</strong></p><p>首先，我们需要使用位置和标题名称注解应用程序记录类属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Application1</span><span class="token punctuation">(</span>\n    <span class="token annotation punctuation">@CsvBindByName</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@CsvBindByPosition</span><span class="token punctuation">(</span>position <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>\n    <span class="token class-name">String</span> id<span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@CsvBindByName</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@CsvBindByPosition</span><span class="token punctuation">(</span>position <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>\n    <span class="token class-name">String</span> name<span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@CsvBindByName</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@CsvBindByPosition</span><span class="token punctuation">(</span>position <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>\n    <span class="token class-name">Integer</span> age<span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@CsvBindByName</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">&quot;created_at&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@CsvBindByPosition</span><span class="token punctuation">(</span>position <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span>\n    <span class="token class-name">String</span> created_at<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记录类准备好后，我们需要编写自定义列定位策略。</p><p>这个策略将包括生成标题和字段位置的逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomColumnPositionStrategy</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```` <span class="token keyword">extends</span> <span class="token class-name">ColumnPositionMappingStrategy</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>```` <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">generateHeader</span><span class="token punctuation">(</span><span class="token class-name">T</span> bean<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CsvRequiredFieldEmptyException</span> <span class="token punctuation">{</span>\n        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">generateHeader</span><span class="token punctuation">(</span>bean<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getColumnMapping</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经完成了记录和列定位策略，我们准备在客户端逻辑中使用它们并生成CSV文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">beanToCSVWithCustomHeaderAndPositionStrategy</span><span class="token punctuation">(</span><span class="token class-name">List</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application1</span><span class="token punctuation">&gt;</span></span>``` applications<span class="token punctuation">)</span>\n  <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">CsvRequiredFieldEmptyException</span><span class="token punctuation">,</span> <span class="token class-name">CsvDataTypeMismatchException</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">&quot;application4.csv&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">var</span> mappingStrategy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomColumnPositionStrategy</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application1</span><span class="token punctuation">&gt;</span></span>```<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        mappingStrategy<span class="token punctuation">.</span><span class="token function">setType</span><span class="token punctuation">(</span><span class="token class-name">Application1</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">var</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StatefulBeanToCsvBuilder</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Application1</span><span class="token punctuation">&gt;</span></span>```<span class="token punctuation">(</span>writer<span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">withQuotechar</span><span class="token punctuation">(</span><span class="token class-name">CSVWriter</span><span class="token punctuation">.</span><span class="token constant">NO_QUOTE_CHARACTER</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">withMappingStrategy</span><span class="token punctuation">(</span>mappingStrategy<span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        builder<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>applications<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了如何将POJO转换为CSV格式并写入CSV文件。我们讨论并编写了包括标题在内的CSV字段的例子。此外，我们还编写了自定义标题和定位策略。</p><p>OpenCSV没有提供开箱即用的解决方案来自定义CSV文件的位置和标题，但编写自定义策略以包含所需位置的字段和标题很容易。</p><p>像往常一样，示例代码可以在GitHub上找到。</p>',40),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-06-28-How to Create CSV File from POJO with Custom Column Headers and Positions.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Create%20CSV%20File%20from%20POJO%20with%20Custom%20Column%20Headers%20and%20Positions.html","title":"如何使用自定义列头和位置从POJO创建CSV文件","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","CSV"],"tag":["POJO","OpenCSV","CSV文件"],"head":[["meta",{"name":"keywords","content":"Java, CSV, POJO, OpenCSV, 自定义列头, 自定义位置"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-How%20to%20Create%20CSV%20File%20from%20POJO%20with%20Custom%20Column%20Headers%20and%20Positions.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用自定义列头和位置从POJO创建CSV文件"}],["meta",{"property":"og:description","content":"如何使用自定义列头和位置从POJO创建CSV文件 CSV是系统和应用程序之间常见的数据交换格式之一。一个常见的用例是构建处理这些CSV文件的Java应用程序。在将数据写入CSV文件时，我们需要将我们的普通旧Java对象（POJO）映射到CSV格式。 在本教程中，我们将学习如何使用自定义位置和标题名称将POJO映射到CSV格式。 2. OpenCSV库 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T14:32:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"POJO"}],["meta",{"property":"article:tag","content":"OpenCSV"}],["meta",{"property":"article:tag","content":"CSV文件"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T14:32:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用自定义列头和位置从POJO创建CSV文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T14:32:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用自定义列头和位置从POJO创建CSV文件 CSV是系统和应用程序之间常见的数据交换格式之一。一个常见的用例是构建处理这些CSV文件的Java应用程序。在将数据写入CSV文件时，我们需要将我们的普通旧Java对象（POJO）映射到CSV格式。 在本教程中，我们将学习如何使用自定义位置和标题名称将POJO映射到CSV格式。 2. OpenCSV库 ..."},"headers":[{"level":2,"title":"2. OpenCSV库","slug":"_2-opencsv库","link":"#_2-opencsv库","children":[]},{"level":2,"title":"3. 生成输入记录","slug":"_3-生成输入记录","link":"#_3-生成输入记录","children":[{"level":3,"title":"3.1. 应用程序记录","slug":"_3-1-应用程序记录","link":"#_3-1-应用程序记录","children":[]},{"level":3,"title":"3.2. 应用程序列表","slug":"_3-2-应用程序列表","link":"#_3-2-应用程序列表","children":[]},{"level":3,"title":"4.2. 自定义位置策略","slug":"_4-2-自定义位置策略","link":"#_4-2-自定义位置策略","children":[]},{"level":3,"title":"4.3. 自定义位置策略和标题名称","slug":"_4-3-自定义位置策略和标题名称","link":"#_4-3-自定义位置策略和标题名称","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719585120000,"updatedTime":1719585120000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.8,"words":1139},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-How to Create CSV File from POJO with Custom Column Headers and Positions.md","localizedDate":"2024年6月28日","excerpt":"\\n<p>CSV是系统和应用程序之间常见的数据交换格式之一。一个常见的用例是构建处理这些CSV文件的Java应用程序。在将数据写入CSV文件时，我们需要将我们的普通旧Java对象（POJO）映射到CSV格式。</p>\\n<p>在本教程中，我们将学习如何使用自定义位置和标题名称将POJO映射到CSV格式。</p>\\n<h2>2. OpenCSV库</h2>\\n<p>OpenCSV是处理CSV文件的非常流行的库。我们首先需要向我们的项目添加Maven依赖项：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`com.opencsv`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`opencsv`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`5.9`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
