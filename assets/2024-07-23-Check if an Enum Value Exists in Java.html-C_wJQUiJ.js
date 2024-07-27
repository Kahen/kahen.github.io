import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t(`<h1 id="在java中检查枚举值是否存在" tabindex="-1"><a class="header-anchor" href="#在java中检查枚举值是否存在"><span>在Java中检查枚举值是否存在</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>我们在几乎所有应用程序中都会看到枚举。这些包括订单状态代码，如_草稿(DRAFT)<em>和_处理中(PROCESSING)</em>，以及网页错误代码，如400、404、500、501等。每当我们在领域中看到枚举数据时，在我们的应用程序中就会看到对应的_Enum_。我们可以使用传入请求中的数据并找到该枚举。例如，我们可以将网页错误_400_映射到_BadRequest_。</p><p>因此，我们需要逻辑来按条件搜索枚举。这可以是它的名称或它的值。或者它甚至可以是任意的整型代码。</p><p>在本教程中，我们将学习如何按条件搜索枚举。此外，我们还将探索返回找到的枚举的不同方式。</p><h2 id="_2-按名称搜索枚举" tabindex="-1"><a class="header-anchor" href="#_2-按名称搜索枚举"><span>2. 按名称搜索枚举</span></a></h2><p>首先，我们知道枚举类型是一种特殊的数据类型。它允许一个变量成为一组预定义常量。让我们为方向定义一个枚举：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Direction</span> <span class="token punctuation">{</span>
    <span class="token constant">EAST</span><span class="token punctuation">,</span> <span class="token constant">WEST</span><span class="token punctuation">,</span> <span class="token constant">SOUTH</span><span class="token punctuation">,</span> <span class="token constant">NORTH</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>枚举值的名称是常量。例如，<em>Direction.EAST_的名称是_EAST</em>。现在我们可以按其名称搜索方向。实现一个不区分大小写的搜索是一个好主意。这样，<em>East</em>、<em>east_和_EAST_都会映射到_Direction.EAST</em>。让我们向_Direction_枚举添加以下方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Direction</span> <span class="token function">findByName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Direction</span> result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Direction</span> direction <span class="token operator">:</span> <span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>direction<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result <span class="token operator">=</span> direction<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个实现中，如果我们没有找到给定名称的枚举，我们将返回_null_。如何处理未找到的场景取决于我们。一个选择是我们可以返回一个默认的枚举值。相反，我们可以抛出一个异常。我们很快就会看到更多的搜索枚举的例子。现在让我们测试我们的搜索逻辑。首先是积极的情境：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenWeekdays_whenValidDirectionNameProvided_directionIsFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Direction</span> result <span class="token operator">=</span> <span class="token class-name">Direction</span><span class="token punctuation">.</span><span class="token function">findByName</span><span class="token punctuation">(</span><span class="token string">&quot;EAST&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token class-name">Direction</span><span class="token punctuation">.</span><span class="token constant">EAST</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本文的最后，我们将提供完整代码实现的链接，但现在我们将专注于代码片段。在这里，我们按名称“EAST”搜索方向，我们期望得到_Direction.EAST_。如前所述，我们知道搜索是不区分大小写的，所以我们应该对名称“east”或“East”得到相同的结果。让我们验证我们的期望：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenWeekdays_whenValidDirectionNameLowerCaseProvided_directionIsFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Direction</span> result <span class="token operator">=</span> <span class="token class-name">Direction</span><span class="token punctuation">.</span><span class="token function">findByName</span><span class="token punctuation">(</span><span class="token string">&quot;east&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token class-name">Direction</span><span class="token punctuation">.</span><span class="token constant">EAST</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以添加另一个测试来验证如果搜索方法对名称“East”返回相同的结果。以下测试将说明我们对名称“East”得到相同的结果。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenWeekdays_whenValidDirectionNameLowerCaseProvided_directionIsFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Direction</span> result <span class="token operator">=</span> <span class="token class-name">Direction</span><span class="token punctuation">.</span><span class="token function">findByName</span><span class="token punctuation">(</span><span class="token string">&quot;East&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token class-name">Direction</span><span class="token punctuation">.</span><span class="token constant">EAST</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-按值搜索枚举" tabindex="-1"><a class="header-anchor" href="#_3-按值搜索枚举"><span>3. 按值搜索枚举</span></a></h2><p>现在让我们定义一个枚举来表示一周的日子。这次，让我们在名称旁边提供一个值。实际上，我们可以在枚举内部定义任何数据成员(一个或多个)，然后将其用于我们的应用程序逻辑。这是_Weekday_枚举的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Weekday</span> <span class="token punctuation">{</span>
    <span class="token function">MONDAY</span><span class="token punctuation">(</span><span class="token string">&quot;Monday&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">TUESDAY</span><span class="token punctuation">(</span><span class="token string">&quot;Tuesday&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
    <span class="token function">SUNDAY</span><span class="token punctuation">(</span><span class="token string">&quot;Sunday&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> value<span class="token punctuation">;</span>

    <span class="token class-name">Weekday</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们实现按值搜索。对于“Monday”，我们应该得到_Weekday.MONDAY_。让我们向枚举添加以下方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Weekday</span> <span class="token function">findByValue</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Weekday</span> result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Weekday</span> day <span class="token operator">:</span> <span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>day<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result <span class="token operator">=</span> day<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们正在遍历枚举的常量，然后比较输入的值与枚举的值成员。如前所述，我们忽略了值的大小写。现在我们可以测试它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenWeekdays_whenValidWeekdayValueProvided_weekdayIsFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Weekday</span> result <span class="token operator">=</span> <span class="token class-name">Weekday</span><span class="token punctuation">.</span><span class="token function">findByValue</span><span class="token punctuation">(</span><span class="token string">&quot;Monday&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token class-name">Weekday</span><span class="token punctuation">.</span><span class="token constant">MONDAY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们没有提供有效的值，我们将返回_null_。让我们验证这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenWeekdays_whenInvalidWeekdayValueProvided_nullIsReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Weekday</span> result <span class="token operator">=</span> <span class="token class-name">Weekday</span><span class="token punctuation">.</span><span class="token function">findByValue</span><span class="token punctuation">(</span><span class="token string">&quot;mon&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>搜索并不总是需要通过字符串值进行。这将相当不便，因为我们必须先将输入转换为字符串，然后将其传递给搜索方法。现在让我们看看如何按非字符串值搜索，例如整数值。</p><h2 id="_4-按整数值搜索枚举" tabindex="-1"><a class="header-anchor" href="#_4-按整数值搜索枚举"><span>4. 按整数值搜索枚举</span></a></h2><p>让我们定义一个名为_Month_的新枚举。这是_Month_枚举的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Month</span> <span class="token punctuation">{</span>
    <span class="token function">JANUARY</span><span class="token punctuation">(</span><span class="token string">&quot;January&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">FEBRUARY</span><span class="token punctuation">(</span><span class="token string">&quot;February&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
    <span class="token function">DECEMBER</span><span class="token punctuation">(</span><span class="token string">&quot;December&quot;</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> value<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> code<span class="token punctuation">;</span>

    <span class="token class-name">Month</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">,</span> <span class="token keyword">int</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>code <span class="token operator">=</span> code<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，月份枚举有两个成员，即值和代码，其中代码是整数值。让我们实现按代码搜索月份的逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Optional</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">findByCode</span><span class="token punctuation">(</span><span class="token keyword">int</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>month <span class="token operator">-&gt;</span> month<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> code<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次搜索与之前的搜索看起来有点不同，因为我们使用了Java 8的特性来演示另一种实现搜索的方式。在这里，我们不是返回枚举本身，而是返回枚举的_Optional_值。同样，而不是_null_，我们将返回一个空的_Optional_。因此，如果我们按代码1搜索一个月，我们应该得到_Month.JANUARY_。让我们用一个测试来验证这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMonths_whenValidMonthCodeProvided_optionalMonthIsReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Optional</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>\`\`\` result <span class="token operator">=</span> <span class="token class-name">Month</span><span class="token punctuation">.</span><span class="token function">findByCode</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Month</span><span class="token punctuation">.</span><span class="token constant">JANUARY</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于无效的代码值，我们应该得到一个空的_Optional_。让我们也用一个测试来验证这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMonths_whenInvalidMonthCodeProvided_optionalEmptyIsReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Optional</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Month</span><span class="token punctuation">&gt;</span></span>\`\`\` result <span class="token operator">=</span> <span class="token class-name">Month</span><span class="token punctuation">.</span><span class="token function">findByCode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可能有的情况下，我们想要实现一个更严格的搜索。这样，我们就不会容忍无效的输入，我们会抛出异常来演示这一点。</p><h2 id="_5-搜索方法抛出的异常" tabindex="-1"><a class="header-anchor" href="#_5-搜索方法抛出的异常"><span>5. 搜索方法抛出的异常</span></a></h2><p>而不是返回_null_或空的_Optional_值，我们可能想要抛出一个异常。抛出哪种异常完全取决于系统的需求。如果我们没有找到枚举，我们将抛出一个_IllegalArgumentException_。这是搜索方法的代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Month</span> <span class="token function">findByValue</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>month <span class="token operator">-&gt;</span> month<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再次看到，我们在抛出异常时使用了Java 8的风格。让我们用一个测试来验证它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenMonths_whenInvalidMonthValueProvided_illegalArgExIsThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThatIllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Month</span><span class="token punctuation">.</span><span class="token function">findByValue</span><span class="token punctuation">(</span><span class="token string">&quot;Jan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本文中演示的搜索方法并不是唯一的方法，但它们代表了最常见的选项。我们还可以调整这些实现以适应我们系统的需求。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了多种搜索枚举的方式。我们还讨论了返回结果的不同方式。最后，我们用坚实的单元测试支持了这些实现。</p><p>像往常一样，与本文相关的代码可以在GitHub上找到。</p>`,45),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-23-Check if an Enum Value Exists in Java.html.vue"]]),r=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Check%20if%20an%20Enum%20Value%20Exists%20in%20Java.html","title":"在Java中检查枚举值是否存在","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Enum"],"tag":["Java","Enum","枚举","搜索"],"head":[["meta",{"name":"keywords","content":"Java, Enum, 枚举, 搜索, 枚举值查找"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Check%20if%20an%20Enum%20Value%20Exists%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中检查枚举值是否存在"}],["meta",{"property":"og:description","content":"在Java中检查枚举值是否存在 1. 概述 我们在几乎所有应用程序中都会看到枚举。这些包括订单状态代码，如_草稿(DRAFT)和_处理中(PROCESSING)，以及网页错误代码，如400、404、500、501等。每当我们在领域中看到枚举数据时，在我们的应用程序中就会看到对应的_Enum_。我们可以使用传入请求中的数据并找到该枚举。例如，我们可以将网..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T11:49:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Enum"}],["meta",{"property":"article:tag","content":"枚举"}],["meta",{"property":"article:tag","content":"搜索"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T11:49:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中检查枚举值是否存在\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T11:49:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中检查枚举值是否存在 1. 概述 我们在几乎所有应用程序中都会看到枚举。这些包括订单状态代码，如_草稿(DRAFT)和_处理中(PROCESSING)，以及网页错误代码，如400、404、500、501等。每当我们在领域中看到枚举数据时，在我们的应用程序中就会看到对应的_Enum_。我们可以使用传入请求中的数据并找到该枚举。例如，我们可以将网..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 按名称搜索枚举","slug":"_2-按名称搜索枚举","link":"#_2-按名称搜索枚举","children":[]},{"level":2,"title":"3. 按值搜索枚举","slug":"_3-按值搜索枚举","link":"#_3-按值搜索枚举","children":[]},{"level":2,"title":"4. 按整数值搜索枚举","slug":"_4-按整数值搜索枚举","link":"#_4-按整数值搜索枚举","children":[]},{"level":2,"title":"5. 搜索方法抛出的异常","slug":"_5-搜索方法抛出的异常","link":"#_5-搜索方法抛出的异常","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721735370000,"updatedTime":1721735370000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.56,"words":1669},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Check if an Enum Value Exists in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>我们在几乎所有应用程序中都会看到枚举。这些包括订单状态代码，如_草稿(DRAFT)<em>和_处理中(PROCESSING)</em>，以及网页错误代码，如400、404、500、501等。每当我们在领域中看到枚举数据时，在我们的应用程序中就会看到对应的_Enum_。我们可以使用传入请求中的数据并找到该枚举。例如，我们可以将网页错误_400_映射到_BadRequest_。</p>\\n<p>因此，我们需要逻辑来按条件搜索枚举。这可以是它的名称或它的值。或者它甚至可以是任意的整型代码。</p>\\n<p>在本教程中，我们将学习如何按条件搜索枚举。此外，我们还将探索返回找到的枚举的不同方式。</p>","autoDesc":true}');export{d as comp,r as data};
