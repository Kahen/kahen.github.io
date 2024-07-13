import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BDZ-trJf.js";const e={},o=t(`<h1 id="gson-expose-和-serializedname-的区别" tabindex="-1"><a class="header-anchor" href="#gson-expose-和-serializedname-的区别"><span>Gson @Expose 和 @SerializedName 的区别</span></a></h1><p>在本教程中，我们将学习 Gson 库中的 @Expose 和 @SerializedName 注解。@Expose 有助于控制哪些类属性可以被序列化或反序列化，而 @SerializedName 有助于在序列化和反序列化时将对象的属性名称映射到 JSON 字符串中的属性键名，反之亦然。</p><p>有些情况下，类中的某些敏感属性值不应该被序列化为 JSON 字符串。为此，Gson 提供了 @Expose 注解，它有两个布尔属性：serialize 和 deserialize。</p><p>假设 Person 类中的 password 属性不应该序列化，因为它是敏感信息。因此，我们必须使用 @Expose(serialize=false) 注解来装饰 password 属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Expose</span><span class="token punctuation">(</span>serialize <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Expose</span><span class="token punctuation">(</span>serialize <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Expose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> emailAddress<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Expose</span><span class="token punctuation">(</span>serialize <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Expose</span><span class="token punctuation">(</span>serialize <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BankAccount</span><span class="token punctuation">&gt;</span></span>\` bankAccounts<span class="token punctuation">;</span>
    <span class="token comment">// 通用的 getter 和 setter...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，BankAccount 对象中的 accountNumber 也不应该序列化，因为它也是敏感信息。因此，我们也必须使用 @Expose(serialize=false) 注解来装饰 accountNumber 属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BankAccount</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Expose</span><span class="token punctuation">(</span>serialize <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> deserialize <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accountNumber<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Expose</span><span class="token punctuation">(</span>serialize <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> deserialize <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> bankName<span class="token punctuation">;</span>
    <span class="token comment">// 通用的 getter 和 setter...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，要将对象转换为 JSON 字符串，我们不能使用默认的 Gson 对象，即通过使用 new 操作符创建的 Gson 对象。我们必须使用 GsonBuilder 类，并通过 excludeFieldsWithoutExposeAnnotation() 设置来实例化 Gson 类。</p><p>让我们看看 PersonSerializer 类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonSerializer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Gson</span> configuredGson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">excludeFieldsWithoutExposeAnnotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Gson</span> defaultGson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">serializeWithConfiguredGson</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> configuredGson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">serializeWithDefaultGson</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> defaultGson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们测试 serializeWithConfiguredGson() 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonSerializerUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> whenUseCustomGson_thenDonotSerializeAccountNumAndPassword <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> personJson <span class="token operator">=</span> <span class="token class-name">PersonSerializer</span><span class="token punctuation">.</span><span class="token function">serializeWithConfiguredGson</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：找到了 password&quot;</span><span class="token punctuation">,</span> personJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：找到了 account number&quot;</span><span class="token punctuation">,</span> personJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;accountNumber：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，我们在输出中看不到像 password 和 accountNumber 这样的敏感属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;firstName&quot;:&quot;Parthiv&quot;,
  &quot;lastName&quot;:&quot;Pradhan&quot;,&quot;email&quot;:&quot;parthiv.pradhan@gmail.com&quot;,
  &quot;bankAccounts&quot;:[{&quot;bankName&quot;:&quot;Bank of America&quot;},{ &quot;bankName&quot;:&quot;Bank of America&quot;}]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，让我们测试 serializeWithDefaultGson() 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> whenUseDefaultGson_thenSerializeAccountNumAndPassword <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> personJson <span class="token operator">=</span> <span class="token class-name">PersonSerializer</span><span class="token punctuation">.</span><span class="token function">serializeWithDefaultGson</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：未找到 password&quot;</span><span class="token punctuation">,</span> personJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：未找到 account number&quot;</span><span class="token punctuation">,</span> personJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;accountNumber&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如前面讨论的，defaultGson 对象无法识别 @Expose 注解，并且如预期，输出打印了 password 和 accountNumber：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;firstName&quot;:&quot;James&quot;,&quot;lastName&quot;:&quot;Cameron&quot;,&quot;email&quot;:&quot;james.cameron@gmail.com&quot;,
  &quot;password&quot;:&quot;secret&quot;,
  &quot;bankAccounts&quot;:
    [
      {&quot;accountNumber&quot;:&quot;4565432312&quot;,&quot;bankName&quot;:&quot;Bank of America&quot;},
      {&quot;accountNumber&quot;:&quot;4565432616&quot;,&quot;bankName&quot;:&quot;Bank of America&quot;}
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了更高级的用例排除序列化属性，我们可以使用 ExclusionStrategy。</p><h3 id="serializedname" tabindex="-1"><a class="header-anchor" href="#serializedname"><span>@SerializedName</span></a></h3><p>@SerializedName 注解的作用有点像自定义转换器。通常，我们首先将对象转换为 JSON 字符串，然后修改其属性键，然后将其作为参数发送到 web 服务。</p><p>同样，在将 JSON 字符串转换为对象时，我们必须将其属性键映射到对象的属性名称。Gson 库通过 @SerializedName 这个单一注解巧妙地结合了这两个步骤。多么简单！</p><p>我们经常在序列化时想要生成尽可能小的有效载荷。让我们尝试序列化下面的 Country 类，使用一些比属性名称短得多的自定义键名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Country</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@SerializedName</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> countryName<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@SerializedName</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;capital&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> countryCapital<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@SerializedName</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;continent&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> continentName<span class="token punctuation">;</span>
    <span class="token comment">// 通用的 getter 和 setter...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们将 Country 对象转换为 JSON：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonSerializer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Gson</span> defaultGson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">toJsonString</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> defaultGson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是时候检查这个方法是否有效了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenUseSerializedAnnotation_thenUseSerializedNameinJsonString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> countryJson <span class="token operator">=</span> <span class="token class-name">PersonSerializer</span><span class="token punctuation">.</span><span class="token function">toJsonString</span><span class="token punctuation">(</span>country<span class="token punctuation">)</span><span class="token punctuation">;</span>
    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>countryJson<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：键没有变化&quot;</span><span class="token punctuation">,</span> countryJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;countryName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：键没有变化&quot;</span><span class="token punctuation">,</span> countryJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;contentName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertFalse</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：键没有变化&quot;</span><span class="token punctuation">,</span> countryJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;countryCapital&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：键没有变化&quot;</span><span class="token punctuation">,</span> countryJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：键没有变化&quot;</span><span class="token punctuation">,</span> countryJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;continent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span><span class="token string">&quot;测试失败：键没有变化&quot;</span><span class="token punctuation">,</span> countryJson<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;capital&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，我们发现属性键与我们提供给 @SerializedName 注解的匹配：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{&quot;name&quot;:&quot;India&quot;,&quot;capital&quot;:&quot;New Delhi&quot;,&quot;continent&quot;:&quot;Asia&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们看看相同的注解是否有助于将上述 JSON 转换为 Country 对象。为此，我们将使用 fromJsonString() 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonSerializer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Gson</span> defaultGson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Country</span> <span class="token function">fromJsonString</span><span class="token punctuation">(</span><span class="token class-name">String</span> json<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> defaultGson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">Country</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们检查这个方法是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">whenJsonStrCreatedWithCustomKeys_thenCreateObjUsingGson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> countryJson <span class="token operator">=</span> <span class="token class-name">PersonSerializer</span><span class="token punctuation">.</span><span class="token function">toJsonString</span><span class="token punctuation">(</span>country<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Country</span> country <span class="token operator">=</span> <span class="token class-name">PersonSerializer</span><span class="token punctuation">.</span><span class="token function">fromJsonString</span><span class="token punctuation">(</span>countryJson<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;失败：对象创建失败&quot;</span><span class="token punctuation">,</span> country<span class="token punctuation">.</span><span class="token function">getCountryName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;India&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;失败：对象创建失败&quot;</span><span class="token punctuation">,</span> country<span class="token punctuation">.</span><span class="token function">getCountryCapital</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;New Delhi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;失败：对象创建失败&quot;</span><span class="token punctuation">,</span> country<span class="token punctuation">.</span><span class="token function">getContinentName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Asia&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法可以创建 Country 对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Country{countryName=&#39;India&#39;, countryCapital=&#39;New Delhi&#39;, continentName=&#39;Asia&#39;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们学习了两个重要的 Gson 注解：@Expose 和 @SerializedName。我们可以肯定地说，正如这里所演示的，它们具有完全不同的功能。文章中使用的代码片段可以在 GitHub 上找到。</p>`,38),p=[o];function c(i,l){return a(),s("div",null,p)}const d=n(e,[["render",c],["__file","2024-07-02-Difference between Gson  Expose and  SerializedName.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Difference%20between%20Gson%20%20Expose%20and%20%20SerializedName.html","title":"Gson @Expose 和 @SerializedName 的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Gson","Java"],"tag":["Gson","Java"],"head":[["meta",{"name":"keywords","content":"Gson @Expose, Gson @SerializedName, Java, Serialization, Deserialization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Difference%20between%20Gson%20%20Expose%20and%20%20SerializedName.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Gson @Expose 和 @SerializedName 的区别"}],["meta",{"property":"og:description","content":"Gson @Expose 和 @SerializedName 的区别 在本教程中，我们将学习 Gson 库中的 @Expose 和 @SerializedName 注解。@Expose 有助于控制哪些类属性可以被序列化或反序列化，而 @SerializedName 有助于在序列化和反序列化时将对象的属性名称映射到 JSON 字符串中的属性键名，反之亦然..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T21:30:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gson"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T21:30:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gson @Expose 和 @SerializedName 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T21:30:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Gson @Expose 和 @SerializedName 的区别 在本教程中，我们将学习 Gson 库中的 @Expose 和 @SerializedName 注解。@Expose 有助于控制哪些类属性可以被序列化或反序列化，而 @SerializedName 有助于在序列化和反序列化时将对象的属性名称映射到 JSON 字符串中的属性键名，反之亦然..."},"headers":[{"level":3,"title":"@SerializedName","slug":"serializedname","link":"#serializedname","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719955823000,"updatedTime":1719955823000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.91,"words":1173},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Difference between Gson  Expose and  SerializedName.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习 Gson 库中的 @Expose 和 @SerializedName 注解。@Expose 有助于控制哪些类属性可以被序列化或反序列化，而 @SerializedName 有助于在序列化和反序列化时将对象的属性名称映射到 JSON 字符串中的属性键名，反之亦然。</p>\\n<p>有些情况下，类中的某些敏感属性值不应该被序列化为 JSON 字符串。为此，Gson 提供了 @Expose 注解，它有两个布尔属性：serialize 和 deserialize。</p>\\n<p>假设 Person 类中的 password 属性不应该序列化，因为它是敏感信息。因此，我们必须使用 @Expose(serialize=false) 注解来装饰 password 属性：</p>","autoDesc":true}');export{d as comp,k as data};
