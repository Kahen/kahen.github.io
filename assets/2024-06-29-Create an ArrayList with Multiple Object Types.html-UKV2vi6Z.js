import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B0JIQbDY.js";const p={},e=t('<h1 id="java中创建包含多种对象类型的arraylist" tabindex="-1"><a class="header-anchor" href="#java中创建包含多种对象类型的arraylist"><span>Java中创建包含多种对象类型的ArrayList</span></a></h1><p>在本教程中，我们将学习如何在Java中创建一个可以容纳多种对象类型的_ArrayList_。我们还将学习如何向_ArrayList_中添加多种类型的数据，然后从_ArrayList_中检索数据并将其转换回原始数据类型。</p><h2 id="_2-背景" tabindex="-1"><a class="header-anchor" href="#_2-背景"><span>2. 背景</span></a></h2><p>本文需要对集合框架，特别是_ArrayList_有一个基本的了解。查看相关文章，Java List接口和Java ArrayList指南，以获得这些类的基本理解。</p><p>_ArrayList_类不直接支持原始数据类型，但可以通过包装类来支持它们。_ArrayList_理想情况下是使用引用类类型创建的。这表明，当向_ArrayList_添加数据时，仅支持该引用类的数据。例如，_ArrayList<code>&lt;Integer&gt;</code><em>不会接受来自_String</em>、_Boolean_或_Double_类的数据。</p><p>我们的目标是在单个_ArrayList_中存储多种类型的数据。这违背了具有单一类型参数的_ArrayList_的基本特性。然而，通过多种方法仍然可以实现这一点。我们将在本文的后续部分深入讨论这些方法。</p><h2 id="_3-原始类型与参数化类型" tabindex="-1"><a class="header-anchor" href="#_3-原始类型与参数化类型"><span>3. 原始类型与参数化类型</span></a></h2><p>原始类型是没有类型参数的泛型类型。原始类型可以像常规类型一样使用，没有任何限制，除了某些使用会导致“未经检查”的警告。另一方面，参数化类型是带有实际类型参数的泛型类型的实例化。参数化类型可以在类的实例化期间提供泛型或具体类型参数。</p><p><strong>Java规范警告不要在创建_List_时使用原始类型，因为会丢失类型安全性</strong>。这可能会导致运行时的强制类型转换异常。声明列表时，建议始终使用类型参数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">/* 原始类型 */</span>\n<span class="token class-name">List</span> myList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">/* 参数化类型 */</span>\n<span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``````` myList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-object-作为泛型类型" tabindex="-1"><a class="header-anchor" href="#_4-使用-object-作为泛型类型"><span>4. 使用_Object_作为泛型类型</span></a></h2><h3 id="_4-1-创建-arraylist" tabindex="-1"><a class="header-anchor" href="#_4-1-创建-arraylist"><span>4.1. 创建_ArrayList_</span></a></h3><p>最常用的方法是使用特定的类型参数，如_String_、<em>Integer_或_Double_来创建_ArrayList</em>。这样可以轻松地表示、检索和处理单一类型的数据信息。然而，我们的目标是创建一个可以存储多种数据类型的_ArrayList_。</p><p>为了实现这一点，我们可以使用所有Java类的父类：_Object_类。_Object_类是Java类层次结构中的最顶层类，所有其他类都是直接或间接派生自它。</p><p>让我们看看如何初始化一个_Object_类型参数的_ArrayList_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``````` multiTypeList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-向-arraylist-中插入数据" tabindex="-1"><a class="header-anchor" href="#_4-2-向-arraylist-中插入数据"><span>4.2. 向_ArrayList_中插入数据</span></a></h3><p>在本节中，我们将学习如何将数据插入到_ArrayList_中。我们已经创建了一个_Object_元素类型的_ArrayList_，因此每次我们将任何类型的数据添加到_ArrayList_中时，它首先会被自动转换为_Object_类型，然后存储在_ArrayList_中。我们将尝试插入各种对象类型，如_Integer_、<em>Double</em>、<em>String</em>、_List_和一个用户定义的自定义对象。</p><p>此外，我们已经知道原始数据类型，如_int_和_double_不能直接存储在_ArrayList_中，所以我们将使用它们各自的包装类进行转换。然后这些包装类被类型转换为_Object_类并存储在_ArrayList_中。</p><p>其他类型，如_String_、<em>List_和_CustomObject</em>，本身就是类型参数，所以它们可以直接添加。然而，这些元素在存储之前也会被转换为_Object_类型。</p><p>让我们看看代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>multiTypeList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmultiTypeList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">11.5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmultiTypeList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;String Data&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmultiTypeList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmultiTypeList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CustomObject</span><span class="token punctuation">(</span><span class="token string">&quot;Class Data&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmultiTypeList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">123456789</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmultiTypeList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">2023</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-从-arraylist-中检索数据" tabindex="-1"><a class="header-anchor" href="#_4-3-从-arraylist-中检索数据"><span>4.3. 从_ArrayList_中检索数据</span></a></h3><p>我们还将发现如何从_Object_类型参数的_ArrayList_中检索信息，并将其转换回最初添加时的各种类型参数。_ArrayList_的数据元素都将是静态的_Object_元素类型。</p><p>开发人员将负责将其转换回适当的数据类型以进行进一步处理。我们可以通过两种不同的方式实现这一点：使用_instanceof_关键字和_getClass()_方法。</p><p>当我们使用_getClass()_方法时，它返回数据元素的类类型。我们可以比较它，然后将数据转换回适当的数据类型。当我们使用_instanceof_时，它将左侧元素与右侧类型参数进行比较，并返回一个布尔结果。</p><p>在本教程中，我们将使用_instanceof_关键字将数据转换为适当的类型参数。然后我们将打印数据元素的值，以查看它是否正确转换为原始数据类型。</p><p>让我们看看代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> dataObj <span class="token operator">:</span> multiTypeList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>dataObj <span class="token keyword">instanceof</span> <span class="token class-name">Integer</span> intData<span class="token punctuation">)</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Integer Data : &quot;</span> <span class="token operator">+</span> intData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>dataObj <span class="token keyword">instanceof</span> <span class="token class-name">Double</span> doubleData<span class="token punctuation">)</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Double Data : &quot;</span> <span class="token operator">+</span> doubleData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>dataObj <span class="token keyword">instanceof</span> <span class="token class-name">String</span> stringData<span class="token punctuation">)</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;String Data : &quot;</span> <span class="token operator">+</span> stringData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>dataObj <span class="token keyword">instanceof</span> <span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>` intList<span class="token punctuation">)</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;List Data : &quot;</span> <span class="token operator">+</span> intList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>dataObj <span class="token keyword">instanceof</span> <span class="token class-name">CustomObject</span> customObj<span class="token punctuation">)</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;CustomObject Data : &quot;</span> <span class="token operator">+</span> customObj<span class="token punctuation">.</span><span class="token function">getClassData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>dataObj <span class="token keyword">instanceof</span> <span class="token class-name">BigInteger</span> bigIntData<span class="token punctuation">)</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;BigInteger Data : &quot;</span> <span class="token operator">+</span> bigIntData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>dataObj <span class="token keyword">instanceof</span> <span class="token class-name">LocalDate</span> localDate<span class="token punctuation">)</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;LocalDate Data : &quot;</span> <span class="token operator">+</span> localDate<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>请注意，我们正在使用模式匹配，这是JDK 16的一个特性。</strong></p><p>现在让我们检查这个程序的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 程序输出</span>\n<span class="token class-name">Integer</span> <span class="token class-name">Data</span> <span class="token operator">:</span> <span class="token number">10</span>\n<span class="token class-name">Double</span> <span class="token class-name">Data</span> <span class="token operator">:</span> <span class="token number">11.5</span>\n<span class="token class-name">String</span> <span class="token class-name">Data</span> <span class="token operator">:</span> <span class="token class-name">String</span> <span class="token class-name">Data</span>\n<span class="token class-name">List</span> <span class="token class-name">Data</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>\n<span class="token class-name">CustomObject</span> <span class="token class-name">Data</span> <span class="token operator">:</span> <span class="token class-name">Class</span> <span class="token class-name">Data</span>\n<span class="token class-name">BigInteger</span> <span class="token class-name">Data</span> <span class="token operator">:</span> <span class="token number">123456789</span>\n<span class="token class-name">LocalDate</span> <span class="token class-name">Data</span> <span class="token operator">:</span> <span class="token number">2023</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">19</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，列表元素逐一循环，根据每个_ArrayList_元素的相关数据类型记录输出。</p><h2 id="_5-替代方法" tabindex="-1"><a class="header-anchor" href="#_5-替代方法"><span>5. 替代方法</span></a></h2><p>需要注意的是，使用_Object_类的_ArrayList_可能会在检索后的数据处理中引起问题，如果相关的类型参数的强制类型转换或解析没有正确处理的话。让我们通过一些简单的方法来避免这些问题。</p><h3 id="_5-1-使用通用接口作为类型参数" tabindex="-1"><a class="header-anchor" href="#_5-1-使用通用接口作为类型参数"><span>5.1. 使用通用接口作为类型参数</span></a></h3><p>解决这些潜在问题的一种方法是创建一个预定义或自定义接口的列表。这将限制数据的输入，只允许那些实现了定义接口的类。如下所示，<em>HashMap</em>、_TreeMap_和_LinkedHashMap_的列表允许不同表示形式的_Map_接口数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&gt;</span></span>` diffMapList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ndiffMapList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ndiffMapList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ndiffMapList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-使用父类作为类型参数" tabindex="-1"><a class="header-anchor" href="#_5-2-使用父类作为类型参数"><span>5.2. 使用父类作为类型参数</span></a></h3><p>另一种方法是定义一个父类或超类的列表。它将接受所有子类表示的值。让我们创建一个_Number_对象的列表，它可以接收_Integer_、<em>Double</em>、_Float_和其他数字类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ArrayList</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Number</span><span class="token punctuation">&gt;</span></span>` myList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmyList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1.2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmyList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmyList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">3.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-使用自定义包装类作为类型参数" tabindex="-1"><a class="header-anchor" href="#_5-3-使用自定义包装类作为类型参数"><span>5.3. 使用自定义包装类作为类型参数</span></a></h3><p>我们还可以通过我们想要允许的对象类型创建自定义包装类。这样的类将具有所有不同类型元素的专用getter和setter方法。然后我们可以以我们的类作为类型参数创建_List_。这是一种广泛使用的方法，因为它确保了类型安全。以下示例显示了自定义包装类的_List_，用于_Integer_和_String_元素：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomObject</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> classData<span class="token punctuation">;</span>\n    <span class="token class-name">Integer</span> intData<span class="token punctuation">;</span>\n    <span class="token comment">// 构造函数和getter</span>\n<span class="token punctuation">}</span>\n\n<span class="token class-name">ArrayList</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CustomObject</span><span class="token punctuation">&gt;</span></span>` objList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nobjList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CustomObject</span><span class="token punctuation">(</span><span class="token string">&quot;String&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nobjList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CustomObject</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-使用函数式接口" tabindex="-1"><a class="header-anchor" href="#_5-4-使用函数式接口"><span>5.4. 使用函数式接口</span></a></h3><p>另一种解决方案是通过函数式接口创建列表。如果我们在插入元素之前需要一些约束或验证，这种方法可能很有用。</p><p>我们可以编写一个谓词来检查_List_允许的数据类型。这个_Predicate_可以由函数式接口的抽象方法使用，以确定是否将数据元素添加到列表中。</p><p>在函数式接口中，我们可以定义一个默认方法来打印允许的数据类型信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FunctionalInterface</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserFunctionalInterface</span> <span class="token punctuation">{</span>\n\n    <span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``````` <span class="token function">addToList</span><span class="token punctuation">(</span><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``````` list<span class="token punctuation">,</span> <span class="token class-name">Object</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``````` dataList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> data <span class="token operator">:</span> dataList<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token keyword">instanceof</span> <span class="token class-name">String</span> stringData<span class="token punctuation">)</span>\n                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;String Data: &quot;</span> <span class="token operator">+</span> stringData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token keyword">instanceof</span> <span class="token class-name">Integer</span> intData<span class="token punctuation">)</span>\n                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Integer Data: &quot;</span> <span class="token operator">+</span> intData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑以下场景：我们创建了一个对象的_ArrayList_，但只添加了_String和_Integer_类型的参数。函数式接口可以在谓词检查类型参数后将数据添加到列表中。我们还将添加一个默认方法来打印数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``````` dataList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Predicate</span>```````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>``````` myPredicate <span class="token operator">=</span> inputData <span class="token operator">-&gt;</span> <span class="token punctuation">(</span>inputData <span class="token keyword">instanceof</span> <span class="token class-name">String</span> <span class="token operator">||</span> inputData <span class="token keyword">instanceof</span> <span class="token class-name">Integer</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">UserFunctionalInterface</span> myInterface <span class="token operator">=</span> <span class="token punctuation">(</span>listObj<span class="token punctuation">,</span> data<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>myPredicate<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>\n        listObj<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">else</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Skipping input as data not allowed for class: &quot;</span> <span class="token operator">+</span> data<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> listObj<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\nmyInterface<span class="token punctuation">.</span><span class="token function">addToList</span><span class="token punctuation">(</span>dataList<span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmyInterface<span class="token punctuation">.</span><span class="token function">addToList</span><span class="token punctuation">(</span>dataList<span class="token punctuation">,</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">3.33</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmyInterface<span class="token punctuation">.</span><span class="token function">addToList</span><span class="token punctuation">(</span>dataList<span class="token punctuation">,</span> <span class="token string">&quot;String Value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmyInterface<span class="token punctuation">.</span><span class="token function">printList</span><span class="token punctuation">(</span>dataList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们检查这种方法的输出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 输出</span>\n<span class="token class-name">Integer</span> <span class="token class-name">Data</span><span class="token operator">:</span> <span class="token number">2</span>\n<span class="token class-name">Skipping</span> input as data is not allowed <span class="token keyword">for</span> <span class="token keyword">class</span><span class="token operator">:</span> <span class="token class-name">Double</span>\n<span class="token class-name">String</span> <span class="token class-name">Data</span><span class="token operator">:</span> <span class="token class-name">String</span> <span class="token class-name">Value</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇简短的文章中，我们探讨了_ArrayList_存储各种类型数据的功能。我们学习了如何创建一个_Object_类型参数的_ArrayList_实例。除此之外，我们还学习了如何向多种对象类型的_ArrayList_添加或删除元素。我们还学习了在处理多种对象类型的_ArrayList_时可以采用的最佳实践。</p><p>像往常一样，所有的代码示例都可以在GitHub上找到。</p><p>OK</p>',57),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","2024-06-29-Create an ArrayList with Multiple Object Types.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Create%20an%20ArrayList%20with%20Multiple%20Object%20Types.html","title":"Java中创建包含多种对象类型的ArrayList","lang":"zh-CN","frontmatter":{"date":"2024-06-29T00:00:00.000Z","category":["Java","ArrayList"],"tag":["Java","ArrayList","多类型对象"],"head":[["meta",{"name":"keywords","content":"Java, ArrayList, 多类型对象, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Create%20an%20ArrayList%20with%20Multiple%20Object%20Types.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中创建包含多种对象类型的ArrayList"}],["meta",{"property":"og:description","content":"Java中创建包含多种对象类型的ArrayList 在本教程中，我们将学习如何在Java中创建一个可以容纳多种对象类型的_ArrayList_。我们还将学习如何向_ArrayList_中添加多种类型的数据，然后从_ArrayList_中检索数据并将其转换回原始数据类型。 2. 背景 本文需要对集合框架，特别是_ArrayList_有一个基本的了解。查看..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T14:32:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:tag","content":"多类型对象"}],["meta",{"property":"article:published_time","content":"2024-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T14:32:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中创建包含多种对象类型的ArrayList\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T14:32:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中创建包含多种对象类型的ArrayList 在本教程中，我们将学习如何在Java中创建一个可以容纳多种对象类型的_ArrayList_。我们还将学习如何向_ArrayList_中添加多种类型的数据，然后从_ArrayList_中检索数据并将其转换回原始数据类型。 2. 背景 本文需要对集合框架，特别是_ArrayList_有一个基本的了解。查看..."},"headers":[{"level":2,"title":"2. 背景","slug":"_2-背景","link":"#_2-背景","children":[]},{"level":2,"title":"3. 原始类型与参数化类型","slug":"_3-原始类型与参数化类型","link":"#_3-原始类型与参数化类型","children":[]},{"level":2,"title":"4. 使用_Object_作为泛型类型","slug":"_4-使用-object-作为泛型类型","link":"#_4-使用-object-作为泛型类型","children":[{"level":3,"title":"4.1. 创建_ArrayList_","slug":"_4-1-创建-arraylist","link":"#_4-1-创建-arraylist","children":[]},{"level":3,"title":"4.2. 向_ArrayList_中插入数据","slug":"_4-2-向-arraylist-中插入数据","link":"#_4-2-向-arraylist-中插入数据","children":[]},{"level":3,"title":"4.3. 从_ArrayList_中检索数据","slug":"_4-3-从-arraylist-中检索数据","link":"#_4-3-从-arraylist-中检索数据","children":[]}]},{"level":2,"title":"5. 替代方法","slug":"_5-替代方法","link":"#_5-替代方法","children":[{"level":3,"title":"5.1. 使用通用接口作为类型参数","slug":"_5-1-使用通用接口作为类型参数","link":"#_5-1-使用通用接口作为类型参数","children":[]},{"level":3,"title":"5.2. 使用父类作为类型参数","slug":"_5-2-使用父类作为类型参数","link":"#_5-2-使用父类作为类型参数","children":[]},{"level":3,"title":"5.3. 使用自定义包装类作为类型参数","slug":"_5-3-使用自定义包装类作为类型参数","link":"#_5-3-使用自定义包装类作为类型参数","children":[]},{"level":3,"title":"5.4. 使用函数式接口","slug":"_5-4-使用函数式接口","link":"#_5-4-使用函数式接口","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719671559000,"updatedTime":1719671559000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.6,"words":2280},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Create an ArrayList with Multiple Object Types.md","localizedDate":"2024年6月29日","excerpt":"\\n<p>在本教程中，我们将学习如何在Java中创建一个可以容纳多种对象类型的_ArrayList_。我们还将学习如何向_ArrayList_中添加多种类型的数据，然后从_ArrayList_中检索数据并将其转换回原始数据类型。</p>\\n<h2>2. 背景</h2>\\n<p>本文需要对集合框架，特别是_ArrayList_有一个基本的了解。查看相关文章，Java List接口和Java ArrayList指南，以获得这些类的基本理解。</p>\\n<p>_ArrayList_类不直接支持原始数据类型，但可以通过包装类来支持它们。_ArrayList_理想情况下是使用引用类类型创建的。这表明，当向_ArrayList_添加数据时，仅支持该引用类的数据。例如，_ArrayList<code>&lt;Integer&gt;</code><em>不会接受来自_String</em>、_Boolean_或_Double_类的数据。</p>","autoDesc":true}');export{k as comp,d as data};
