import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CbPcg273.js";const e={},p=t(`<h1 id="解决gson的-多个json字段-异常" tabindex="-1"><a class="header-anchor" href="#解决gson的-多个json字段-异常"><span>解决Gson的“多个JSON字段”异常</span></a></h1><p>Google Gson是一个在Java中用于JSON数据绑定的有用且灵活的库。在大多数情况下，Gson可以在不进行修改的情况下对现有类执行数据绑定。然而，某些类结构可能会导致难以调试的问题。</p><p>一个有趣且可能令人困惑的异常是IllegalArgumentException，它抱怨有多个字段定义：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.lang.IllegalArgumentException: 类\`&lt;YourClass&gt;\`声明了多个名为\`&lt;yourField&gt;\`的JSON字段 ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这可能特别令人困惑，因为Java编译器不允许同一个类中的多个字段共享一个名称。在本教程中，我们将讨论这种异常的原因，并学习如何绕过它。</p><h3 id="_2-异常原因" tabindex="-1"><a class="header-anchor" href="#_2-异常原因"><span>2. 异常原因</span></a></h3><p>这种异常的潜在原因与类结构或配置有关，这些在序列化（或反序列化）类时会使Gson解析器感到困惑。</p><h4 id="_2-1-serializedname冲突" tabindex="-1"><a class="header-anchor" href="#_2-1-serializedname冲突"><span>2.1. @SerializedName冲突</span></a></h4><p>Gson提供了@SerializedName注解，允许操作序列化对象中的字段名称。这是一个有用的特性，但它可能导致冲突。</p><p>例如，让我们创建一个简单的类，BasicStudent：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BasicStudent</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> major<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@SerializedName</span><span class="token punctuation">(</span><span class="token string">&quot;major&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> concentration<span class="token punctuation">;</span>
    <span class="token comment">// 通用的getter, setter等。</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在序列化期间，Gson将尝试使用“major”来表示major和concentration，导致上述IllegalArgumentException：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.lang.IllegalArgumentException: 类BasicStudent声明了多个名为&#39;major&#39;的JSON字段；
冲突是由字段BasicStudent#major和BasicStudent#concentration引起的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>异常消息指向问题字段，问题可以通过简单地更改或删除注解或重命名字段来解决。</p><p>Gson还提供了其他排除字段的选项，我们将在本教程后面讨论。</p><p>首先，让我们看看这种异常的另一个原因。</p><h4 id="_2-2-类继承层次结构" tabindex="-1"><a class="header-anchor" href="#_2-2-类继承层次结构"><span>2.2. 类继承层次结构</span></a></h4><p><strong>类继承也可能是序列化到JSON时问题的来源</strong>。为了探讨这个问题，我们需要更新我们的学生数据示例。</p><p>让我们定义两个类，StudentV1和StudentV2，StudentV2扩展了StudentV1并添加了额外的成员变量：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentV1</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
    <span class="token comment">// 通用的getter, setter等。</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentV2</span> <span class="token keyword">extends</span> <span class="token class-name">StudentV1</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> major<span class="token punctuation">;</span>
    <span class="token comment">// 通用的getter, setter等。</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，StudentV2不仅扩展了StudentV1，还定义了自己的一组变量，其中一些与StudentV1中的重复。虽然这不是最佳实践，但对我们的示例至关重要，也是我们在现实世界中使用第三方库或遗留包时可能遇到的情况。</p><p>让我们创建一个StudentV2的实例并尝试序列化它。我们可以创建一个单元测试来确认IllegalArgumentException被抛出：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenLegacyClassWithMultipleFields_whenSerializingWithGson_thenIllegalArgumentExceptionIsThrown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StudentV2</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StudentV2</span><span class="token punctuation">(</span><span class="token string">&quot;Henry&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Winter&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Greek Studies&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThatThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">hasMessageContaining</span><span class="token punctuation">(</span><span class="token string">&quot;declares multiple JSON fields named &#39;firstName&#39;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与上面的@SerializedName冲突类似，<strong>Gson在类层次结构中遇到重复名称时不知道使用哪个字段</strong>。</p><h3 id="_3-解决方案" tabindex="-1"><a class="header-anchor" href="#_3-解决方案"><span>3. 解决方案</span></a></h3><p>有几种解决这个问题的方法，每种方法都有其优缺点，提供了不同级别的序列化控制。</p><h4 id="_3-1-将字段标记为transient" tabindex="-1"><a class="header-anchor" href="#_3-1-将字段标记为transient"><span>3.1. 将字段标记为transient</span></a></h4><p>控制哪些字段被序列化的最简单方法是使用transient字段修饰符。我们可以更新上面的BasicStudent：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BasicStudent</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token class-name">String</span> major<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@SerializedName</span><span class="token punctuation">(</span><span class="token string">&quot;major&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> concentration<span class="token punctuation">;</span>

    <span class="token comment">// 通用的getter, setter等。</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们创建一个单元测试，在这种变化后尝试序列化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenBasicStudent_whenSerializingWithGson_thenTransientFieldNotSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BasicStudent</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BasicStudent</span><span class="token punctuation">(</span><span class="token string">&quot;Henry Winter&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Greek Studies&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Classical Greek Studies&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">BasicStudent</span> deserialized <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">BasicStudent</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>deserialized<span class="token punctuation">.</span><span class="token function">getMajor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>序列化成功，并且major字段的值没有包含在反序列化实例中。</p><p>尽管这是一种简单的解决方案，但这种方法有两个缺点。添加transient意味着该字段将从所有序列化中排除，包括基本的Java序列化。这种方法还假设BasicStudent可以被修改，这可能并不总是可能的。</p><h4 id="_3-2-使用gson的-expose注解进行序列化" tabindex="-1"><a class="header-anchor" href="#_3-2-使用gson的-expose注解进行序列化"><span>3.2. 使用Gson的@Expose注解进行序列化</span></a></h4><p>如果问题类可以修改，我们想要一种仅针对Gson序列化的方法，我们可以利用@Expose注解。这个注解告诉Gson在序列化、反序列化或两者期间应该暴露哪些字段。</p><p>我们可以更新我们的StudentV2实例，明确地只向Gson暴露它的字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentV2</span> <span class="token keyword">extends</span> <span class="token class-name">StudentV1</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Expose</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Expose</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Expose</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> major<span class="token punctuation">;</span>

    <span class="token comment">// 通用的getter, setter等。</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们再次运行代码，什么都不会改变，我们仍然会看到异常。<strong>默认情况下，当遇到@Expose时，Gson不会改变其行为</strong> - 我们需要告诉解析器该怎么做。</p><p>让我们更新我们的单元测试，使用GsonBuilder创建一个实例，该实例排除没有@Expose的字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStudentV2_whenSerializingWithGsonExposeAnnotation_thenSerializes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StudentV2</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StudentV2</span><span class="token punctuation">(</span><span class="token string">&quot;Henry&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Winter&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Greek Studies&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">excludeFieldsWithoutExposeAnnotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> json <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">StudentV2</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>序列化和反序列化现在都成功了。@Expose的好处是它仍然是一种简单的解决方案，而且只影响Gson序列化（只有在我们配置解析器以识别它时）。</p><p>这种方法仍然假设我们可以编辑源代码。它也不提供太多的灵活性 - 我们关心的所有字段都需要被注解，其余的都从序列化和反序列化中排除。</p><h4 id="_3-3-使用gson的exclusionstrategy进行序列化" tabindex="-1"><a class="header-anchor" href="#_3-3-使用gson的exclusionstrategy进行序列化"><span>3.3. 使用Gson的ExclusionStrategy进行序列化</span></a></h4><p>幸运的是，当我们不能更改源类或者我们需要更多的灵活性时，Gson提供了一个解决方案：<em>ExclusionStrategy</em>。</p><p>这个接口告诉Gson在序列化或反序列化期间如何排除字段，并允许更复杂的业务逻辑。我们可以声明一简单的_ExclusionStrategy_实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentExclusionStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">ExclusionStrategy</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">shouldSkipField</span><span class="token punctuation">(</span><span class="token class-name">FieldAttributes</span> field<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> field<span class="token punctuation">.</span><span class="token function">getDeclaringClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">StudentV1</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">shouldSkipClass</span><span class="token punctuation">(</span><span class="token class-name">Class</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\` aClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_ExclusionStrategy_接口有两个方法：shouldSkipField()在单个字段级别提供细粒度控制，shouldSkipClass()控制是否应该跳过某个类型所有字段。在上面的例子中，我们开始简单，跳过所有来自StudentV1的字段。</p><p>就像@Expose一样，我们需要告诉Gson如何使用这个策略。让我们在我们的测试中配置它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStudentV2_whenSerializingWithGsonExclusionStrategy_thenSerializes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StudentV2</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StudentV2</span><span class="token punctuation">(</span><span class="token string">&quot;Henry&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Winter&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Greek Studies&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setExclusionStrategies</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StudentExclusionStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">StudentV2</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，我们使用setExclusionStrategies()配置了解析器 - 这意味着我们的策略在序列化和反序列化中都被使用。</p><p>如果我们想要更灵活地应用_ExclusionStrategy_，我们可以以不同的方式配置解析器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 仅在序列化期间排除</span>
<span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addSerializationExclusionStrategy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StudentExclusionStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 仅在反序列化期间排除</span>
<span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addDeserializationExclusionStrategy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StudentExclusionStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法比我们的其他两种解决方案稍微复杂一些：我们需要声明一个新的类，并更多地考虑什么使一个字段重要以包含。我们为这个例子保持了_ExclusionStrategy_中的业务逻辑相当简单，但这种方法的优点是更丰富和更强大的字段排除。<strong>最后，我们不需要更改StudentV2或StudentV1中的代码</strong>。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本文中，我们讨论了在使用Gson时可能遇到的棘手但最终可以修复的IllegalArgumentException的原因。</p><p>我们发现，根据我们对简单性、粒度和灵活性的需求，我们可以实施各种解决方案。</p><p>像往常一样，所有的代码都可以在GitHub上找到。</p>`,57),o=[p];function c(l,i){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-06-26-Resolving Gson s  Multiple JSON Fields  Exception.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Resolving%20Gson%20s%20%20Multiple%20JSON%20Fields%20%20Exception.html","title":"解决Gson的“多个JSON字段”异常","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","Gson"],"tag":["JSON","Exception"],"head":[["meta",{"name":"keywords","content":"Java, Gson, JSON, Exception, 解决, 异常"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Resolving%20Gson%20s%20%20Multiple%20JSON%20Fields%20%20Exception.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决Gson的“多个JSON字段”异常"}],["meta",{"property":"og:description","content":"解决Gson的“多个JSON字段”异常 Google Gson是一个在Java中用于JSON数据绑定的有用且灵活的库。在大多数情况下，Gson可以在不进行修改的情况下对现有类执行数据绑定。然而，某些类结构可能会导致难以调试的问题。 一个有趣且可能令人困惑的异常是IllegalArgumentException，它抱怨有多个字段定义： 这可能特别令人困惑..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T15:52:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:tag","content":"Exception"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T15:52:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决Gson的“多个JSON字段”异常\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T15:52:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决Gson的“多个JSON字段”异常 Google Gson是一个在Java中用于JSON数据绑定的有用且灵活的库。在大多数情况下，Gson可以在不进行修改的情况下对现有类执行数据绑定。然而，某些类结构可能会导致难以调试的问题。 一个有趣且可能令人困惑的异常是IllegalArgumentException，它抱怨有多个字段定义： 这可能特别令人困惑..."},"headers":[{"level":3,"title":"2. 异常原因","slug":"_2-异常原因","link":"#_2-异常原因","children":[]},{"level":3,"title":"3. 解决方案","slug":"_3-解决方案","link":"#_3-解决方案","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719417124000,"updatedTime":1719417124000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.39,"words":1917},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Resolving Gson s  Multiple JSON Fields  Exception.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>Google Gson是一个在Java中用于JSON数据绑定的有用且灵活的库。在大多数情况下，Gson可以在不进行修改的情况下对现有类执行数据绑定。然而，某些类结构可能会导致难以调试的问题。</p>\\n<p>一个有趣且可能令人困惑的异常是IllegalArgumentException，它抱怨有多个字段定义：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>java.lang.IllegalArgumentException: 类`&lt;YourClass&gt;`声明了多个名为`&lt;yourField&gt;`的JSON字段 ...\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
