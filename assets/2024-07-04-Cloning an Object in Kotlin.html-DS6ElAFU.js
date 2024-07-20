import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DfO5Xg_k.js";const p={},o=t('<h1 id="kotlin中克隆对象" tabindex="-1"><a class="header-anchor" href="#kotlin中克隆对象"><span>Kotlin中克隆对象</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>通常来说，克隆是创建一个对象的相同副本的过程。而在编程环境中，克隆意味着创建一个新的对象，它具有与原始对象相同的值和属性。</p><p><strong>在本文中，我们将讨论在Kotlin中克隆对象可以使用的方法。</strong></p><h2 id="_2-浅拷贝与深拷贝" tabindex="-1"><a class="header-anchor" href="#_2-浅拷贝与深拷贝"><span>2. 浅拷贝与深拷贝</span></a></h2><p>在讨论如何克隆对象之前，我们首先应该正确理解浅拷贝和深拷贝的概念。这在我们处理复杂数据结构，例如嵌套对象或集合时尤其重要。</p><p><strong>浅拷贝意味着我们只复制现有对象的引用，而不是实际的对象或值。</strong></p><p>如果我们有一个具有复杂模式的对象，例如，在多个级别上都有嵌套对象，并且我们只复制顶层的字段，那也是一种浅拷贝。</p><p>同时，<strong>深拷贝意味着创建一个副本，实际上为每个字段都创建了一个新的对象，而不仅仅是引用复制。</strong></p><p>因此，对于复杂模式，深拷贝的结果是数据结构中所有层的所有对象都有新的副本。</p><h2 id="_3-克隆方法" tabindex="-1"><a class="header-anchor" href="#_3-克隆方法"><span>3. 克隆方法</span></a></h2><p>我们可以使用不同的方法来克隆对象，这取决于我们想要克隆的对象的复杂性。为了演示这一点，我们将创建一个具有现实模式的模型，以提供一个清晰的例子。</p><p>首先，让我们定义一些要使用的类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">Address</span><span class="token punctuation">(</span><span class="token keyword">var</span> street<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> city<span class="token operator">:</span> String<span class="token punctuation">)</span>\n<span class="token keyword">class</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> address<span class="token operator">:</span> Address<span class="token punctuation">)</span>\n<span class="token keyword">class</span> <span class="token function">Company</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> industry<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> ceo<span class="token operator">:</span> Person<span class="token punctuation">,</span> <span class="token keyword">val</span> employees<span class="token operator">:</span> List```<span class="token operator">&lt;</span>Person<span class="token operator">&gt;</span>```<span class="token punctuation">)</span>\n<span class="token keyword">class</span> <span class="token function">Organization</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> headquarters<span class="token operator">:</span> Address<span class="token punctuation">,</span> <span class="token keyword">val</span> companies<span class="token operator">:</span> List``````<span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span>``````<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们有一个组织，其中包含公司，公司中有工作的人：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token comment">// ... 其他Company, Person和Address对象</span>\n<span class="token keyword">val</span> organization <span class="token operator">=</span> <span class="token function">Organization</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Bekraf&quot;</span></span><span class="token punctuation">,</span> <span class="token function">Address</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Jalan Medan Merdeka Selatan&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Jakarta&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">listOf</span><span class="token punctuation">(</span>companyBasen<span class="token punctuation">,</span> companyKotagede<span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-使用数据类-copy" tabindex="-1"><a class="header-anchor" href="#_3-1-使用数据类-copy"><span>3.1. 使用数据类_copy()</span></a></h3><p>每个<strong>数据类</strong>在Kotlin中都有一个内置的_function copy()_，用于创建对象的副本。<strong>默认情况下，_copy()_执行浅拷贝。</strong></p><p>但在此之前，我们必须将我们的_classes_更改为_data classes_，通过在_class:_之前添加_data_关键字：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Address</span><span class="token punctuation">(</span><span class="token keyword">var</span> street<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> city<span class="token operator">:</span> String<span class="token punctuation">)</span>\n<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> address<span class="token operator">:</span> Address<span class="token punctuation">)</span>\n<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Company</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> industry<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> ceo<span class="token operator">:</span> Person<span class="token punctuation">,</span> <span class="token keyword">val</span> employees<span class="token operator">:</span> List```<span class="token operator">&lt;</span>Person<span class="token operator">&gt;</span>```<span class="token punctuation">)</span>\n<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Organization</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> headquarters<span class="token operator">:</span> Address<span class="token punctuation">,</span> <span class="token keyword">val</span> companies<span class="token operator">:</span> List``````<span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span>``````<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以直接调用_copy()_函数，但这将导致浅拷贝：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> clonedOrganization <span class="token operator">=</span> organization<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>然而，如果每个嵌套对象也被复制，我们可以执行深拷贝。</strong></p><p>让我们彻底并小心地复制每个字段，包括在集合中找到的那些：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> clonedOrganization <span class="token operator">=</span> organization<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span>\n  headquarters <span class="token operator">=</span> organization<span class="token punctuation">.</span>headquarters<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  companies <span class="token operator">=</span> organization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> company <span class="token operator">-&gt;</span>\n    company<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span>\n      ceo <span class="token operator">=</span> company<span class="token punctuation">.</span>ceo<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span>\n        address <span class="token operator">=</span> company<span class="token punctuation">.</span>ceo<span class="token punctuation">.</span>address<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">)</span><span class="token punctuation">,</span>\n      employees <span class="token operator">=</span> company<span class="token punctuation">.</span>employees<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> employee <span class="token operator">-&gt;</span>\n        employee<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span>\n          address <span class="token operator">=</span> employee<span class="token punctuation">.</span>address<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过对_organization_对象执行深拷贝，创建了_headquarters_和每个_companies_的新副本，包括每个_companies_中的_ceo_和每个_employees_，以及他们的_address_。</p><h3 id="_3-2-使用-clone" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-clone"><span>3.2. 使用_clone()</span></a></h3><p>我们也可以**使用_clone()_方法，它默认执行浅拷贝。**然而，这需要在类中实现_Java的Cloneable_接口。</p><p><strong>为了实现深拷贝，我们需要重写_clone()_方法并使其公开。在重写的方法中，我们将为所有对象的属性创建新的副本并返回新创建的对象。</strong></p><p>让我们看看我们拥有的类的更改：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Address</span><span class="token punctuation">(</span><span class="token keyword">var</span> street<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> city<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> Cloneable <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">Address</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>street<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>city<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> address<span class="token operator">:</span> Address<span class="token punctuation">)</span> <span class="token operator">:</span> Cloneable <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">Person</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>address<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Company</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> industry<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> ceo<span class="token operator">:</span> Person<span class="token punctuation">,</span> <span class="token keyword">val</span> employees<span class="token operator">:</span> List```<span class="token operator">&lt;</span>Person<span class="token operator">&gt;</span>```<span class="token punctuation">)</span> <span class="token operator">:</span> Cloneable <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">Company</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> industry<span class="token punctuation">,</span> ceo<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> employees<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Organization</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> headquarters<span class="token operator">:</span> Address<span class="token punctuation">,</span> <span class="token keyword">val</span> companies<span class="token operator">:</span> List``````<span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span>``````<span class="token punctuation">)</span> <span class="token operator">:</span> Cloneable <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">Organization</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> headquarters<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> companies<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是的，这需要在开始时付出更多的努力。但现在，调用_clone()_将轻松执行深拷贝：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> clonedOrganization <span class="token operator">=</span> organization<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-使用辅助构造器" tabindex="-1"><a class="header-anchor" href="#_3-3-使用辅助构造器"><span>3.3. 使用辅助构造器</span></a></h3><p>辅助构造器是类除了主构造器之外还可以拥有的额外构造器。正如我们所知，构造器通常用于创建类的实例（对象）。所以，我们可以说这是一种在不涉及_data_类或_Cloneable_接口的情况下克隆对象的方法。</p><p>让我们添加一个辅助构造器：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">Organization</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> headquarters<span class="token operator">:</span> Address<span class="token punctuation">,</span> <span class="token keyword">val</span> companies<span class="token operator">:</span> List``````<span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span>``````<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">constructor</span><span class="token punctuation">(</span>organization<span class="token operator">:</span> Organization<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span>\n      organization<span class="token punctuation">.</span>name<span class="token punctuation">,</span>\n      <span class="token function">Address</span><span class="token punctuation">(</span>organization<span class="token punctuation">.</span>headquarters<span class="token punctuation">)</span><span class="token punctuation">,</span>\n      organization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> <span class="token function">Company</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// ... Address, Person和Company的类似构造器</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在每个类中，<strong>我们创建一个接受相同类型并在新创建的引用结构中使用其值的构造器。</strong></p><p>现在，要创建深拷贝，我们可以轻松地调用构造器：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> clonedOrganization <span class="token operator">=</span> <span class="token function">Organization</span><span class="token punctuation">(</span>organization<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-4-使用自定义深拷贝" tabindex="-1"><a class="header-anchor" href="#_3-4-使用自定义深拷贝"><span>3.4. 使用自定义深拷贝</span></a></h3><p>如果我们想要将副本创建逻辑与主构造器分开，并且更加灵活，那么我们可以采用这种方法。是的，我们可以创建我们自己的函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">Organization</span><span class="token punctuation">(</span><span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> headquarters<span class="token operator">:</span> Address<span class="token punctuation">,</span> <span class="token keyword">val</span> companies<span class="token operator">:</span> List``````<span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span>``````<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">fun</span> <span class="token function">deepCopy</span><span class="token punctuation">(</span>\n      name<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span>\n      headquarters<span class="token operator">:</span> Address <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>headquarters<span class="token punctuation">.</span><span class="token function">deepCopy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      companies<span class="token operator">:</span> List``````<span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span>`````` <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">deepCopy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">Organization</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> headquarters<span class="token punctuation">,</span> companies<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// ... Address, Person和Company的类似deepCopy</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**这些类中的_deepCopy()_函数创建了对象的嵌套副本。**例如，在_Organization_类中，要复制_headquarters_对象，<em>deepCopy()<em>函数将基本上调用_Address_中的_deepCopy()</em>，它反过来也会调用其其他属性中的_deepCopy()</em>。</p><p>现在，要创建深拷贝，我们只需调用：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> clonedOrganization <span class="token operator">=</span> organization<span class="token punctuation">.</span><span class="token function">deepCopy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-验证" tabindex="-1"><a class="header-anchor" href="#_4-验证"><span>4. 验证</span></a></h2><p>要验证一个对象是否是深拷贝，我们可以检查<strong>对原始对象的更改是否不影响复制的对象。</strong></p><p>由于这是一个复杂的对象，让我们深入进行：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>organization<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;New Org Name&quot;</span></span>\norganization<span class="token punctuation">.</span>headquarters<span class="token punctuation">.</span>city <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;New City&quot;</span></span>\norganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;New Company Name&quot;</span></span>\norganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>ceo<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;New CEO Name&quot;</span></span>\norganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>ceo<span class="token punctuation">.</span>address<span class="token punctuation">.</span>city <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;New CEO Address City Name&quot;</span></span>\norganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>employees<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;New Employee Name&quot;</span></span>\norganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>employees<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>address<span class="token punctuation">.</span>city <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;New Employee Address City Name&quot;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看对原始对象的更改是否不影响副本对象。</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>clonedOrganization<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isNotSameAs</span><span class="token punctuation">(</span>organization<span class="token punctuation">)</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>clonedOrganization<span class="token punctuation">.</span>headquarters<span class="token punctuation">.</span>city<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isNotEqualTo</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;New City&quot;</span></span><span class="token punctuation">)</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>clonedOrganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isNotEqualTo</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;New Company Name&quot;</span></span><span class="token punctuation">)</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>clonedOrganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>ceo<span class="token punctuation">.</span>name<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isNotEqualTo</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;New CEO Name&quot;</span></span><span class="token punctuation">)</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>clonedOrganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>ceo<span class="token punctuation">.</span>address<span class="token punctuation">.</span>city<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isNotEqualTo</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;New CEO Address City Name&quot;</span></span><span class="token punctuation">)</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>clonedOrganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>employees<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isNotEqualTo</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;New Employee Name&quot;</span></span><span class="token punctuation">)</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>clonedOrganization<span class="token punctuation">.</span>companies<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>employees<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>address<span class="token punctuation">.</span>city<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">isNotEqualTo</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;New Employee Address City Name&quot;</span></span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是的，一切正常工作。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们讨论了对象克隆的方法。如果我们想要一些简单且具有典型Kotlin风格的表达方式，那么我们可以使用_data class copy()_，尽管我们必须小心处理通过引用而不是值克隆的嵌套对象。</p><p>同时，_clone()_也是可能的，但需要在开始时付出更多的努力，因为我们必须实现_Cloneable_接口。</p><p>使用辅助构造器是一种如果我们不想依赖于_data_类或_Cloneable_接口的方法。我们的自定义_deepCopy_提供了类似的灵活性，但仍然需要在开始时付出努力和精确度。</p><p>如</p>',58),e=[o];function c(l,i){return a(),s("div",null,e)}const k=n(p,[["render",c],["__file","2024-07-04-Cloning an Object in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Cloning%20an%20Object%20in%20Kotlin.html","title":"Kotlin中克隆对象","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin"],"tag":["克隆","对象","深拷贝","浅拷贝"],"head":[["meta",{"name":"keywords","content":"Kotlin, 克隆对象, 深拷贝, 浅拷贝"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Cloning%20an%20Object%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中克隆对象"}],["meta",{"property":"og:description","content":"Kotlin中克隆对象 1. 概述 通常来说，克隆是创建一个对象的相同副本的过程。而在编程环境中，克隆意味着创建一个新的对象，它具有与原始对象相同的值和属性。 在本文中，我们将讨论在Kotlin中克隆对象可以使用的方法。 2. 浅拷贝与深拷贝 在讨论如何克隆对象之前，我们首先应该正确理解浅拷贝和深拷贝的概念。这在我们处理复杂数据结构，例如嵌套对象或集合..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T19:29:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"克隆"}],["meta",{"property":"article:tag","content":"对象"}],["meta",{"property":"article:tag","content":"深拷贝"}],["meta",{"property":"article:tag","content":"浅拷贝"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T19:29:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中克隆对象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T19:29:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中克隆对象 1. 概述 通常来说，克隆是创建一个对象的相同副本的过程。而在编程环境中，克隆意味着创建一个新的对象，它具有与原始对象相同的值和属性。 在本文中，我们将讨论在Kotlin中克隆对象可以使用的方法。 2. 浅拷贝与深拷贝 在讨论如何克隆对象之前，我们首先应该正确理解浅拷贝和深拷贝的概念。这在我们处理复杂数据结构，例如嵌套对象或集合..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 浅拷贝与深拷贝","slug":"_2-浅拷贝与深拷贝","link":"#_2-浅拷贝与深拷贝","children":[]},{"level":2,"title":"3. 克隆方法","slug":"_3-克隆方法","link":"#_3-克隆方法","children":[{"level":3,"title":"3.1. 使用数据类_copy()","slug":"_3-1-使用数据类-copy","link":"#_3-1-使用数据类-copy","children":[]},{"level":3,"title":"3.2. 使用_clone()","slug":"_3-2-使用-clone","link":"#_3-2-使用-clone","children":[]},{"level":3,"title":"3.3. 使用辅助构造器","slug":"_3-3-使用辅助构造器","link":"#_3-3-使用辅助构造器","children":[]},{"level":3,"title":"3.4. 使用自定义深拷贝","slug":"_3-4-使用自定义深拷贝","link":"#_3-4-使用自定义深拷贝","children":[]}]},{"level":2,"title":"4. 验证","slug":"_4-验证","link":"#_4-验证","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720121390000,"updatedTime":1720121390000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.79,"words":1736},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Cloning an Object in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>通常来说，克隆是创建一个对象的相同副本的过程。而在编程环境中，克隆意味着创建一个新的对象，它具有与原始对象相同的值和属性。</p>\\n<p><strong>在本文中，我们将讨论在Kotlin中克隆对象可以使用的方法。</strong></p>\\n<h2>2. 浅拷贝与深拷贝</h2>\\n<p>在讨论如何克隆对象之前，我们首先应该正确理解浅拷贝和深拷贝的概念。这在我们处理复杂数据结构，例如嵌套对象或集合时尤其重要。</p>\\n<p><strong>浅拷贝意味着我们只复制现有对象的引用，而不是实际的对象或值。</strong></p>\\n<p>如果我们有一个具有复杂模式的对象，例如，在多个级别上都有嵌套对象，并且我们只复制顶层的字段，那也是一种浅拷贝。</p>","autoDesc":true}');export{k as comp,d as data};
