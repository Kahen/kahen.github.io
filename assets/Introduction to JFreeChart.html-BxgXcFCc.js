import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D1jsmMBg.js";const e={},p=t(`<h1 id="jfreechart入门指南" tabindex="-1"><a class="header-anchor" href="#jfreechart入门指南"><span>JFreeChart入门指南</span></a></h1><h2 id="_1-概览" tabindex="-1"><a class="header-anchor" href="#_1-概览"><span>1. 概览</span></a></h2><p>在本教程中，我们将了解如何使用JFreeChart，这是一个全面的Java库，用于创建各种图表。我们可以使用它将图形数据表示集成到Swing应用程序中。它还包括一个JavaFX的独立扩展。</p><p>我们将从基础开始，涵盖设置和图表创建，并尝试几种不同类型的图表。</p><h2 id="_2-创建我们的第一个图表" tabindex="-1"><a class="header-anchor" href="#_2-创建我们的第一个图表"><span>2. 创建我们的第一个图表</span></a></h2><p>JFreeChart允许我们创建折线图、条形图、饼图、散点图、时间序列图、直方图等。它还可以将不同的图表组合到一个视图中。</p><h3 id="_2-1-设置依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-设置依赖项"><span>2.1. 设置依赖项</span></a></h3><p>要开始使用，我们需要在我们的pom.xml文件中添加jfreechart构件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.jfree\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`jfreechart\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.5.4\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们应该始终检查最新版本及其JDK兼容性</strong>，以确保我们的项目是最新的并且正常工作。在这种情况下，版本1.5.4需要JDK8或更高版本。</p><h3 id="_2-2-创建基本折线图" tabindex="-1"><a class="header-anchor" href="#_2-2-创建基本折线图"><span>2.2. 创建基本折线图</span></a></h3><p>让我们使用DefaultCategoryDataset为我们的图表创建一个数据集：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DefaultCategoryDataset</span> dataset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultCategoryDataset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;January&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;February&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">180</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;March&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">260</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;April&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;May&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以创建一个使用先前数据集绘制折线图的JFreeChart对象。</p><p>ChartFactory.createLineChart方法接受图表标题、x轴和y轴标签以及数据集作为参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JFreeChart</span> chart <span class="token operator">=</span> <span class="token class-name">ChartFactory</span><span class="token punctuation">.</span><span class="token function">createLineChart</span><span class="token punctuation">(</span>
    <span class="token string">&quot;Monthly Sales&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Month&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span>
    dataset<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，ChartPanel对象对于在Swing组件中显示我们的图表至关重要。然后使用此对象作为JFrame内容窗格来创建应用程序窗口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ChartPanel</span> chartPanel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ChartPanel</span><span class="token punctuation">(</span>chart<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">JFrame</span> frame <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
frame<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span><span class="token number">800</span><span class="token punctuation">,</span> <span class="token number">600</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
frame<span class="token punctuation">.</span><span class="token function">setContentPane</span><span class="token punctuation">(</span>chartPanel<span class="token punctuation">)</span><span class="token punctuation">;</span>
frame<span class="token punctuation">.</span><span class="token function">setLocationRelativeTo</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
frame<span class="token punctuation">.</span><span class="token function">setDefaultCloseOperation</span><span class="token punctuation">(</span><span class="token class-name">JFrame</span><span class="token punctuation">.</span><span class="token constant">EXIT_ON_CLOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
frame<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行此代码时，我们将看到我们的月度销售图表：</p><h2 id="_3-探索不同类型的图表" tabindex="-1"><a class="header-anchor" href="#_3-探索不同类型的图表"><span>3. 探索不同类型的图表</span></a></h2><p>在其余示例中，我们将尝试一些不同类型的图表。我们不需要更改太多代码。</p><h3 id="_3-1-条形图" tabindex="-1"><a class="header-anchor" href="#_3-1-条形图"><span>3.1. 条形图</span></a></h3><p>我们可以修改JFreeChart创建代码，将我们的折线图转换为条形图：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JFreeChart</span> chart <span class="token operator">=</span> <span class="token class-name">ChartFactory</span><span class="token punctuation">.</span><span class="token function">createBarChart</span><span class="token punctuation">(</span>
    <span class="token string">&quot;Monthly Sales&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Month&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span>
    dataset<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这绘制了前一个示例的数据集：</p><h3 id="_3-2-饼图" tabindex="-1"><a class="header-anchor" href="#_3-2-饼图"><span>3.2. 饼图</span></a></h3><p><strong>饼图显示整体中各部分的比例</strong>。要创建饼图，我们需要使用DefaultPieDataset类来创建我们的数据集。我们还使用createPieChart()方法来构建我们的JFreeChart对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DefaultPieDataset</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` dataset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultPieDataset</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dataset<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token string">&quot;January&quot;</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dataset<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token string">&quot;February&quot;</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dataset<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token string">&quot;March&quot;</span><span class="token punctuation">,</span> <span class="token number">180</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">JFreeChart</span> chart <span class="token operator">=</span> <span class="token class-name">ChartFactory</span><span class="token punctuation">.</span><span class="token function">createPieChart</span><span class="token punctuation">(</span>
    <span class="token string">&quot;Monthly Sales&quot;</span><span class="token punctuation">,</span>
    dataset<span class="token punctuation">,</span>
    <span class="token boolean">true</span><span class="token punctuation">,</span>    <span class="token comment">// 包含图例</span>
    <span class="token boolean">true</span><span class="token punctuation">,</span>    <span class="token comment">// 生成工具提示</span>
    <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 无URLs</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们将鼠标悬停在饼图的某一块上时，会显示显示一个月的绝对销售额和相对于总数的百分比的工具提示：</p><h3 id="_3-3-时间序列图" tabindex="-1"><a class="header-anchor" href="#_3-3-时间序列图"><span>3.3. 时间序列图</span></a></h3><p><strong>时间序列图显示数据随时间的趋势</strong>。要构建数据集，我们需要一个TimeSeriesCollection对象，它是一个TimeSeries对象的集合，每个对象都是一系列数据项，每个数据项包含与特定时间段相关的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">TimeSeries</span> series <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TimeSeries</span><span class="token punctuation">(</span><span class="token string">&quot;Monthly Sales&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
series<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Month</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2024</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
series<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Month</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2024</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
series<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Month</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2024</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">180</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">TimeSeriesCollection</span> dataset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TimeSeriesCollection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dataset<span class="token punctuation">.</span><span class="token function">addSeries</span><span class="token punctuation">(</span>series<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">JFreeChart</span> chart <span class="token operator">=</span> <span class="token class-name">ChartFactory</span><span class="token punctuation">.</span><span class="token function">createTimeSeriesChart</span><span class="token punctuation">(</span>
    <span class="token string">&quot;Monthly Sales&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Date&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span>
    dataset<span class="token punctuation">,</span>
    <span class="token boolean">true</span><span class="token punctuation">,</span>    <span class="token comment">// 图例</span>
    <span class="token boolean">false</span><span class="token punctuation">,</span>   <span class="token comment">// 工具提示</span>
    <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 无URLs</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看结果：</p><h3 id="_3-4-组合图表" tabindex="-1"><a class="header-anchor" href="#_3-4-组合图表"><span>3.4. 组合图表</span></a></h3><p><strong>组合图表允许我们将不同类型的图表组合到一个图表中</strong>。与前面的示例相比，代码稍微复杂一些。</p><p>我们需要使用DefaultCategoryDataset来存储数据，但在这里，我们创建了两个实例，每个图表类型一个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">DefaultCategoryDataset</span> lineDataset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultCategoryDataset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lineDataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;January&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lineDataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;February&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lineDataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">180</span><span class="token punctuation">,</span> <span class="token string">&quot;Sales&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;March&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">DefaultCategoryDataset</span> barDataset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultCategoryDataset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
barDataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token string">&quot;Profit&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;January&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
barDataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">,</span> <span class="token string">&quot;Profit&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;February&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
barDataset<span class="token punctuation">.</span><span class="token function">addValue</span><span class="token punctuation">(</span><span class="token number">250</span><span class="token punctuation">,</span> <span class="token string">&quot;Profit&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;March&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CategoryPlot创建包含两种类型图表的绘图区域。它允许我们将数据集分配给渲染器 - LineAndShapeRenderer用于线条，BarRenderer用于条形：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CategoryPlot</span> plot <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CategoryPlot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
plot<span class="token punctuation">.</span><span class="token function">setDataset</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> lineDataset<span class="token punctuation">)</span><span class="token punctuation">;</span>
plot<span class="token punctuation">.</span><span class="token function">setRenderer</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">LineAndShapeRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

plot<span class="token punctuation">.</span><span class="token function">setDataset</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> barDataset<span class="token punctuation">)</span><span class="token punctuation">;</span>
plot<span class="token punctuation">.</span><span class="token function">setRenderer</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BarRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

plot<span class="token punctuation">.</span><span class="token function">setDomainAxis</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CategoryAxis</span><span class="token punctuation">(</span><span class="token string">&quot;Month&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
plot<span class="token punctuation">.</span><span class="token function">setRangeAxis</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">NumberAxis</span><span class="token punctuation">(</span><span class="token string">&quot;Value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

plot<span class="token punctuation">.</span><span class="token function">setOrientation</span><span class="token punctuation">(</span><span class="token class-name">PlotOrientation</span><span class="token punctuation">.</span><span class="token constant">VERTICAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
plot<span class="token punctuation">.</span><span class="token function">setRangeGridlinesVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
plot<span class="token punctuation">.</span><span class="token function">setDomainGridlinesVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们使用JFreeChart创建最终的图表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JFreeChart</span> chart <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JFreeChart</span><span class="token punctuation">(</span>
    <span class="token string">&quot;Monthly Sales and Profit&quot;</span><span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>  <span class="token comment">// null表示使用默认字体</span>
    plot<span class="token punctuation">,</span>  <span class="token comment">// 组合图表作为CategoryPlot</span>
    <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 图例</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种设置允许数据的组合呈现，直观地展示了销售和利润之间的协同作用：</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p><strong>在本文中，我们探索了使用JFreeChart创建不同类型的图表</strong>，包括折线图、条形图、饼图、时间序列图和组合图表。</p><p>本文的介绍只是触及了JFreeChart功能的表面。</p><p>如常，本文的代码可在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表格。</p><p>OK</p>`,48),o=[p];function c(l,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","Introduction to JFreeChart.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Introduction%20to%20JFreeChart.html","title":"JFreeChart入门指南","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["编程","Java"],"tag":["JFreeChart","图表库"],"head":[["meta",{"name":"keywords","content":"Java, JFreeChart, 图表可视化, 数据可视化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Introduction%20to%20JFreeChart.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JFreeChart入门指南"}],["meta",{"property":"og:description","content":"JFreeChart入门指南 1. 概览 在本教程中，我们将了解如何使用JFreeChart，这是一个全面的Java库，用于创建各种图表。我们可以使用它将图形数据表示集成到Swing应用程序中。它还包括一个JavaFX的独立扩展。 我们将从基础开始，涵盖设置和图表创建，并尝试几种不同类型的图表。 2. 创建我们的第一个图表 JFreeChart允许我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JFreeChart"}],["meta",{"property":"article:tag","content":"图表库"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JFreeChart入门指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JFreeChart入门指南 1. 概览 在本教程中，我们将了解如何使用JFreeChart，这是一个全面的Java库，用于创建各种图表。我们可以使用它将图形数据表示集成到Swing应用程序中。它还包括一个JavaFX的独立扩展。 我们将从基础开始，涵盖设置和图表创建，并尝试几种不同类型的图表。 2. 创建我们的第一个图表 JFreeChart允许我们..."},"headers":[{"level":2,"title":"1. 概览","slug":"_1-概览","link":"#_1-概览","children":[]},{"level":2,"title":"2. 创建我们的第一个图表","slug":"_2-创建我们的第一个图表","link":"#_2-创建我们的第一个图表","children":[{"level":3,"title":"2.1. 设置依赖项","slug":"_2-1-设置依赖项","link":"#_2-1-设置依赖项","children":[]},{"level":3,"title":"2.2. 创建基本折线图","slug":"_2-2-创建基本折线图","link":"#_2-2-创建基本折线图","children":[]}]},{"level":2,"title":"3. 探索不同类型的图表","slug":"_3-探索不同类型的图表","link":"#_3-探索不同类型的图表","children":[{"level":3,"title":"3.1. 条形图","slug":"_3-1-条形图","link":"#_3-1-条形图","children":[]},{"level":3,"title":"3.2. 饼图","slug":"_3-2-饼图","link":"#_3-2-饼图","children":[]},{"level":3,"title":"3.3. 时间序列图","slug":"_3-3-时间序列图","link":"#_3-3-时间序列图","children":[]},{"level":3,"title":"3.4. 组合图表","slug":"_3-4-组合图表","link":"#_3-4-组合图表","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.09,"words":1226},"filePathRelative":"posts/baeldung/Archive/Introduction to JFreeChart.md","localizedDate":"2024年6月19日","excerpt":"\\n<h2>1. 概览</h2>\\n<p>在本教程中，我们将了解如何使用JFreeChart，这是一个全面的Java库，用于创建各种图表。我们可以使用它将图形数据表示集成到Swing应用程序中。它还包括一个JavaFX的独立扩展。</p>\\n<p>我们将从基础开始，涵盖设置和图表创建，并尝试几种不同类型的图表。</p>\\n<h2>2. 创建我们的第一个图表</h2>\\n<p>JFreeChart允许我们创建折线图、条形图、饼图、散点图、时间序列图、直方图等。它还可以将不同的图表组合到一个视图中。</p>\\n<h3>2.1. 设置依赖项</h3>\\n<p>要开始使用，我们需要在我们的pom.xml文件中添加jfreechart构件：</p>","autoDesc":true}');export{k as comp,d as data};
