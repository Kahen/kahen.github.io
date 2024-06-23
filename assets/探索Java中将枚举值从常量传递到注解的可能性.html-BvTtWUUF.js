import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-j3liftxp.js";const e={},p=t(`<h1 id="探索java中将枚举值从常量传递到注解的可能性" tabindex="-1"><a class="header-anchor" href="#探索java中将枚举值从常量传递到注解的可能性"><span>探索Java中将枚举值从常量传递到注解的可能性</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将探索Java中将枚举值从常量传递到注解的可能性。为了理解所提出的设计决策的主要驱动因素，我们将从问题陈述开始，然后是一个演示用例。</p><p>在那之后，我们将定义理想解决方案，了解Java语言的限制，并最终讨论一些实现选项。</p><h2 id="_2-问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述"><span>2. 问题陈述</span></a></h2><p>让我们想象以下要求。在控制器类中，两个_POST_和_PUT_端点始终需要具有相同的_内容类型（Content-Type）_。现在，让我们看看如何在同一枚举值中共享这两个端点定义。</p><p>为了更好地理解问题陈述，我们将继续探索一个演示用例。</p><h2 id="_3-定义演示用例" tabindex="-1"><a class="header-anchor" href="#_3-定义演示用例"><span>3. 定义演示用例</span></a></h2><p>为了满足要求，我们需要以下数据结构。</p><p>一个看起来像这样的_RequestContentType_枚举：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">RequestContentType</span> <span class="token punctuation">{</span>
    <span class="token constant">JSON</span><span class="token punctuation">,</span> <span class="token constant">XML</span><span class="token punctuation">,</span> <span class="token constant">HTML</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个自定义注解，<em>@PutRequest_和</em>@PostRequest：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@interface</span> <span class="token class-name">PostRequest</span> <span class="token punctuation">{</span>
    <span class="token class-name">RequestContentType</span> <span class="token function">type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@interface</span> <span class="token class-name">PutRequest</span> <span class="token punctuation">{</span>
    <span class="token class-name">RequestContentType</span> <span class="token function">type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，是以下控制器类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DataController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@PostRequest</span><span class="token punctuation">(</span>contentType <span class="token operator">=</span> <span class="token class-name">RequestContentType</span><span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">createData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PutRequest</span><span class="token punctuation">(</span>contentType <span class="token operator">=</span> <span class="token class-name">RequestContentType</span><span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">updateData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所观察到的，当前控制器实现通过为每个函数引用_JSON_类型两次来满足要求。尽管这种实现满足了要求，但它仍然不够健壮。<strong>技术上，<em>@PostRequest_可以很容易地使用与</em>@PutRequest_不同的_contentType_初始化。</strong></p><p>在下一节中，我们将探索实现强类型实现的不同方法，以确保_@PostRequest_和_@PutRequest_始终共享相同的_contentType_。我们将定义理想场景，了解Java语言的限制，并最终探索我们拥有的替代方案。</p><h2 id="_4-共享相同的枚举值" tabindex="-1"><a class="header-anchor" href="#_4-共享相同的枚举值"><span>4. 共享相同的枚举值</span></a></h2><p>我们希望确保在一个地方更改_RequestContentType_，更改就会在所有引用_RequestContentType_的地方反映出来。</p><p>接下来，我们将看看通常的思维方式如何指导我们。</p><h3 id="_4-1-理想场景" tabindex="-1"><a class="header-anchor" href="#_4-1-理想场景"><span>4.1. 理想场景</span></a></h3><p>当我们第一次考虑这个要求时，我们的思维就会沿着以下方向流动——让我们<strong>定义一个_RequestContentType_类型的常量，然后在每个注解中引用它</strong>。看起来像这样的东西：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DataController</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">RequestContentType</span> <span class="token constant">REQUEST_TYPE</span> <span class="token operator">=</span> <span class="token class-name">RequestContentType</span><span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostRequest</span><span class="token punctuation">(</span>contentType <span class="token operator">=</span> <span class="token constant">REQUEST_TYPE</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">createData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PutRequest</span><span class="token punctuation">(</span>contentType <span class="token operator">=</span> <span class="token constant">REQUEST_TYPE</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">updateData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是最直接和理想的方法。<strong>不幸的是，它没有按预期工作。这是因为我们面临一个编译错误，指出“属性值必须是枚举常量”。</strong></p><p>接下来，让我们更深入地了解为什么这个解决方案没有编译，以及Java对它施加了哪些限制。</p><h3 id="_4-2-理解java的限制" tabindex="-1"><a class="header-anchor" href="#_4-2-理解java的限制"><span>4.2. 理解Java的限制</span></a></h3><p>正如我们在JLS-9.7.1中看到的，对于注解，如果元素类型是枚举，唯一接受的值是枚举常量。根据Java语言规范的普遍语言，根据JLS-8.9.1，所有枚举，如_RequestContentType_中的_JSON_、<em>XML_和_HTML</em>，都已经是常量了。有关枚举的更多信息，请查看Java枚举指南。</p><p>总之，Java通过设计限制我们只能直接将枚举分配给注解。因此，理想场景是不可行的。</p><h2 id="_5-实现替代方案以将枚举作为常量供应给注解" tabindex="-1"><a class="header-anchor" href="#_5-实现替代方案以将枚举作为常量供应给注解"><span>5. 实现替代方案以将枚举作为常量供应给注解</span></a></h2><p>现在我们了解了Java语言的限制，让我们看看如何实现所需的结果。我们将探索两个选项：通过定义一个带有一组整数常量的接口来模拟枚举，另一个是使用带有嵌套静态类内部的枚举。最后，我们将比较这两种方法。</p><p>接下来，让我们深入到两者的细节，并了解何时使用一个或另一个。</p><h3 id="_5-1-使用整数常量模拟枚举" tabindex="-1"><a class="header-anchor" href="#_5-1-使用整数常量模拟枚举"><span>5.1. 使用整数常量模拟枚举</span></a></h3><p>让我们从模拟枚举开始，它看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">SimulatedRequestContentType</span> <span class="token punctuation">{</span>
   <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">JSON</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
   <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">XML</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
   <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">HTML</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们也将注解定义更改为接受整数类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@interface</span> <span class="token class-name">PostRequest</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">intContentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@interface</span> <span class="token class-name">PutRequest</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">intContentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，使用方式看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DataController</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">REQUEST_TYPE</span> <span class="token operator">=</span> <span class="token class-name">SimulatedRequestContentType</span><span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostRequest</span><span class="token punctuation">(</span>intContentType <span class="token operator">=</span> <span class="token constant">REQUEST_TYPE</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">createData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PutRequest</span><span class="token punctuation">(</span>intContentType <span class="token operator">=</span> <span class="token constant">REQUEST_TYPE</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">updateData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这种替代方案解决了要求，但不再使用枚举。</p><p>让我们看看如何仍然可以利用枚举。</p><h3 id="_5-2-通过嵌套静态类为枚举扩展常量" tabindex="-1"><a class="header-anchor" href="#_5-2-通过嵌套静态类为枚举扩展常量"><span>5.2. 通过嵌套静态类为枚举扩展常量</span></a></h3><p>现在，让我们看看我们将初始枚扩展为带有嵌套静态类以定义常量的选项。枚举_ExtendedRequestContentType_的实现如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token class-name">ExtendedRequestContentType</span> <span class="token punctuation">{</span>
    <span class="token function">JSON</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">JSON_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">XML</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">XML_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">HTML</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">HTML_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ExtendedRequestContentType</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Constants</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">JSON_VALUE</span> <span class="token operator">=</span> <span class="token string">&quot;JSON&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">XML_VALUE</span> <span class="token operator">=</span> <span class="token string">&quot;XML&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">HTML_VALUE</span> <span class="token operator">=</span> <span class="token string">&quot;HTML&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Constants_类为每种类型定义了值。这些将用作注解的参数值。</p><p>一个重要的细节是枚举的构造函数，它期望一个名为_name_的字符串作为参数。基本上，有了这个构造函数，我们确保每当定义一个新枚举常量时，也会定义一个同名的常量。否则，在初始化枚举时会抛出错误。<strong>这将确保从枚举到Constants的1:1映射。</strong></p><p>此外，如果我们想确保更严格的双向1:1映射，我们可以编写以下单元测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testEnumAndConstantsSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> enumValues <span class="token operator">=</span> <span class="token function">getEnumNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> constantValues <span class="token operator">=</span> <span class="token function">getConstantValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Set</span>\\<span class="token operator">&lt;</span><span class="token class-name">String</span>\\<span class="token operator">&gt;</span> uniqueConstantValues <span class="token operator">=</span> constantValues<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">distinct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>constantValues<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> uniqueConstantValues<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>enumValues<span class="token punctuation">,</span> uniqueConstantValues<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个单元测试中，我们首先获取所有枚举名称作为_Set_。然后，使用反射，我们获取所有公共_String_常量的值。最后，我们确保没有同名的常量，并且枚举和常量之间有完全的1:1映射。</p><p>最后，让我们使用_ExtendedRequestContentType_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">DataController</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">EXTENDED_REQUEST_TYPE</span> <span class="token operator">=</span> <span class="token class-name">ExtendedRequestContentType<span class="token punctuation">.</span>Constants</span><span class="token punctuation">.</span><span class="token constant">XML_VALUE</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostRequest</span><span class="token punctuation">(</span>extendedContentType <span class="token operator">=</span> <span class="token constant">EXTENDED_REQUEST_TYPE</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">createData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PutRequest</span><span class="token punctuation">(</span>extendedContentType <span class="token operator">=</span> <span class="token constant">EXTENDED_REQUEST_TYPE</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">updateData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-比较替代方案" tabindex="-1"><a class="header-anchor" href="#_5-3-比较替代方案"><span>5.3. 比较替代方案</span></a></h3><p>正如我们所看到的，两种替代方案都使用除了枚举之外的数据类型来将值传递给注解。这是必要的，以便将此值分配给_DataController_类中的另一个常量，并在注解之间共享。</p><p>两者之间的主要区别在于，在模拟枚举的选项中，我们完全放弃了使用枚举，而在第二个选项中，我们仍然保持使用枚举，并确保与定义的常量有1:1映射。</p><p>保持枚举和内容同步的开销非常有意义，如果我们在应用程序的其他部分也使用枚举及其功能。如果我们这样做，那么实现一个实用方法来将常量映射到枚举值可能非常有用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">ExtendedRequestContentType</span> <span class="token function">toEnum</span><span class="token punctuation">(</span><span class="token class-name">String</span> constant<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token class-name">ExtendedRequestContentType</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>contentType <span class="token operator">-</span>\\<span class="token operator">&gt;</span> contentType<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>constant<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>底线是，如果在应用程序的其他部分也需要使用枚举，请选择第二种替代方案；否则，将枚举交换为常量值。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，**我们学习了Java在将枚举值从常量传递到注解方面的限制，并探索了我们的替代方案。**我们从查看这个要求有用的用例开始，然后深入探讨了语言的限制。最后，我们实现了两种不同的替代方案，并探讨了它们的差异。</p><p>如往常一样，本文的完整实现可以在GitHub上找到。</p>`,59),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","探索Java中将枚举值从常量传递到注解的可能性.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/Archive/%E6%8E%A2%E7%B4%A2Java%E4%B8%AD%E5%B0%86%E6%9E%9A%E4%B8%BE%E5%80%BC%E4%BB%8E%E5%B8%B8%E9%87%8F%E4%BC%A0%E9%80%92%E5%88%B0%E6%B3%A8%E8%A7%A3%E7%9A%84%E5%8F%AF%E8%83%BD%E6%80%A7.html","title":"探索Java中将枚举值从常量传递到注解的可能性","lang":"zh-CN","frontmatter":{"date":"2024-05-15T00:00:00.000Z","category":["Java编程","注解与枚举"],"tag":["Java","注解","枚举"],"description":"探索Java中将枚举值从常量传递到注解的可能性 1. 引言 在本教程中，我们将探索Java中将枚举值从常量传递到注解的可能性。为了理解所提出的设计决策的主要驱动因素，我们将从问题陈述开始，然后是一个演示用例。 在那之后，我们将定义理想解决方案，了解Java语言的限制，并最终讨论一些实现选项。 2. 问题陈述 让我们想象以下要求。在控制器类中，两个_PO...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/%E6%8E%A2%E7%B4%A2Java%E4%B8%AD%E5%B0%86%E6%9E%9A%E4%B8%BE%E5%80%BC%E4%BB%8E%E5%B8%B8%E9%87%8F%E4%BC%A0%E9%80%92%E5%88%B0%E6%B3%A8%E8%A7%A3%E7%9A%84%E5%8F%AF%E8%83%BD%E6%80%A7.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"探索Java中将枚举值从常量传递到注解的可能性"}],["meta",{"property":"og:description","content":"探索Java中将枚举值从常量传递到注解的可能性 1. 引言 在本教程中，我们将探索Java中将枚举值从常量传递到注解的可能性。为了理解所提出的设计决策的主要驱动因素，我们将从问题陈述开始，然后是一个演示用例。 在那之后，我们将定义理想解决方案，了解Java语言的限制，并最终讨论一些实现选项。 2. 问题陈述 让我们想象以下要求。在控制器类中，两个_PO..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"注解"}],["meta",{"property":"article:tag","content":"枚举"}],["meta",{"property":"article:published_time","content":"2024-05-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"探索Java中将枚举值从常量传递到注解的可能性\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-05-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 问题陈述","slug":"_2-问题陈述","link":"#_2-问题陈述","children":[]},{"level":2,"title":"3. 定义演示用例","slug":"_3-定义演示用例","link":"#_3-定义演示用例","children":[]},{"level":2,"title":"4. 共享相同的枚举值","slug":"_4-共享相同的枚举值","link":"#_4-共享相同的枚举值","children":[{"level":3,"title":"4.1. 理想场景","slug":"_4-1-理想场景","link":"#_4-1-理想场景","children":[]},{"level":3,"title":"4.2. 理解Java的限制","slug":"_4-2-理解java的限制","link":"#_4-2-理解java的限制","children":[]}]},{"level":2,"title":"5. 实现替代方案以将枚举作为常量供应给注解","slug":"_5-实现替代方案以将枚举作为常量供应给注解","link":"#_5-实现替代方案以将枚举作为常量供应给注解","children":[{"level":3,"title":"5.1. 使用整数常量模拟枚举","slug":"_5-1-使用整数常量模拟枚举","link":"#_5-1-使用整数常量模拟枚举","children":[]},{"level":3,"title":"5.2. 通过嵌套静态类为枚举扩展常量","slug":"_5-2-通过嵌套静态类为枚举扩展常量","link":"#_5-2-通过嵌套静态类为枚举扩展常量","children":[]},{"level":3,"title":"5.3. 比较替代方案","slug":"_5-3-比较替代方案","link":"#_5-3-比较替代方案","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.22,"words":1867},"filePathRelative":"posts/baeldung/Archive/探索Java中将枚举值从常量传递到注解的可能性.md","localizedDate":"2024年5月15日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将探索Java中将枚举值从常量传递到注解的可能性。为了理解所提出的设计决策的主要驱动因素，我们将从问题陈述开始，然后是一个演示用例。</p>\\n<p>在那之后，我们将定义理想解决方案，了解Java语言的限制，并最终讨论一些实现选项。</p>\\n<h2>2. 问题陈述</h2>\\n<p>让我们想象以下要求。在控制器类中，两个_POST_和_PUT_端点始终需要具有相同的_内容类型（Content-Type）_。现在，让我们看看如何在同一枚举值中共享这两个端点定义。</p>\\n<p>为了更好地理解问题陈述，我们将继续探索一个演示用例。</p>\\n<h2>3. 定义演示用例</h2>","autoDesc":true}');export{k as comp,r as data};
