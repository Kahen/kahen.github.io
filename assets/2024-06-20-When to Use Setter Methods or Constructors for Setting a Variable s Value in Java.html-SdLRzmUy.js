import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-C3BVsZqC.js";const e={},p=t(`<hr><h1 id="在java中何时使用setter方法或构造器设置变量的值" tabindex="-1"><a class="header-anchor" href="#在java中何时使用setter方法或构造器设置变量的值"><span>在Java中何时使用Setter方法或构造器设置变量的值</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>开发者们经常面临的一个选择是：应该使用Setter方法还是构造器来设置变量的值。这两种技术都有其优点，但它们在不同的情况下被实现。</p><p><strong>在本教程中，我们将讨论在Java中何时使用Setter方法或构造器来设置变量的值。</strong></p><h2 id="_2-使用setter方法" tabindex="-1"><a class="header-anchor" href="#_2-使用setter方法"><span>2. 使用Setter方法</span></a></h2><p>Setter方法是我们可以在Java类中用来设置实例变量值的函数。<strong>此外，它们提供了一种灵活的方式来在对象初始化后修改其状态。</strong> 使用Setter方法设置的实例变量不能声明为final，因为这些值可以在对象初始化后更改。</p><p>让我们考虑一个Web应用程序中User类的现实世界示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 验证用户名格式</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>username<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;[a-zA-Z0-9_]+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>username <span class="token operator">=</span> username<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;无效的用户名格式&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其他方法...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_User_类封装了Web应用程序中的用户数据。<em>setUsername()<em>和_setPassword()</em> Setter方法分别允许设置_username_和_password</em>。这些方法还执行验证，以确保用户名遵循特定格式，密码满足某些强度标准。</p><p>让我们测试Setter方法并为_User_对象设置_username_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNewUser_whenSettingUsername_thenUsernameIsSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">&quot;john_doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;john_doe&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用默认构造器_User()_创建一个新的_User_对象，然后我们调用用户对象上的_setUsername()_方法将_username_设置为“<em>john_doe</em>”。最后，我们使用断言来验证_username_是否正确设置。</p><h2 id="_3-使用构造器" tabindex="-1"><a class="header-anchor" href="#_3-使用构造器"><span>3. 使用构造器</span></a></h2><p>构造器是特殊的方法，允许我们初始化对象。<strong>它们在创建类的对象时被调用。构造器也可以用来设置实例变量的初始值。</strong> 构造器的一个显著特点是它们允许初始化final实例变量，确保这些值在对象的生命周期内保持不变。</p><p>让我们考虑一个代表电子商务系统中产品的_Product_类的现实世界示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> price<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">double</span> price<span class="token punctuation">,</span> <span class="token class-name">String</span> category<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>category <span class="token operator">=</span> category<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其他方法...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<em>Product_类代表电子商务系统中可供出售的产品。构造器_Product(String name, double price, String category)<em>初始化产品的_name</em>、<em>price_和_category</em>。通过使用构造器，我们确保了关于产品的重要信息，如其_name</em>、<em>price_和_category</em>，在对象创建时被设置。</p><p>使用构造器创建具有特定详细信息的_Product_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenProductDetails_whenCreatingProductWithConstructor_thenProductHasCorrectAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Product</span> product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;Smartphone&quot;</span><span class="token punctuation">,</span> <span class="token number">599.99</span><span class="token punctuation">,</span> <span class="token string">&quot;Electronics&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Smartphone&quot;</span><span class="token punctuation">,</span> product<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">599.99</span><span class="token punctuation">,</span> product<span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0.001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Electronics&quot;</span><span class="token punctuation">,</span> product<span class="token punctuation">.</span><span class="token function">getCategory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用构造器_Product(String name, double price, String category)<em>创建一个新的_Product_对象，将产品的_name</em>、_price_和_category_作为参数直接在对象创建期间传递。</p><h2 id="_4-在setter和构造器之间选择" tabindex="-1"><a class="header-anchor" href="#_4-在setter和构造器之间选择"><span>4. 在Setter和构造器之间选择</span></a></h2><p>在决定使用Setter方法和构造器之间时，考虑以下指南：</p><table><thead><tr><th>使用Setter方法</th><th>使用构造器</th></tr></thead><tbody><tr><td>当变量的值可能随时间变化时</td><td>当初始化不可变属性时</td></tr><tr><td>当设置值之前需要验证或附加逻辑时</td><td>当确保在对象创建时设置某些值时</td></tr><tr><td>当在对象初始化后设置值时</td><td>当变量的值在初始化后不应更改时</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，Setter方法和构造器都是Java中设置变量值的重要工具。通过理解本文中介绍的差异和指南，开发者可以有效地决定何时使用Setter方法或构造器。</p><p>像往常一样，配套的源代码可以在GitHub上找到。</p>`,27),o=[p];function c(i,r){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-20-When to Use Setter Methods or Constructors for Setting a Variable s Value in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-When%20to%20Use%20Setter%20Methods%20or%20Constructors%20for%20Setting%20a%20Variable%20s%20Value%20in%20Java.html","title":"在Java中何时使用Setter方法或构造器设置变量的值","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Setter Methods","Constructors"],"head":[["meta",{"name":"keywords","content":"Java, Setter Methods, Constructors, Object Initialization"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-When%20to%20Use%20Setter%20Methods%20or%20Constructors%20for%20Setting%20a%20Variable%20s%20Value%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中何时使用Setter方法或构造器设置变量的值"}],["meta",{"property":"og:description","content":"在Java中何时使用Setter方法或构造器设置变量的值 1. 引言 开发者们经常面临的一个选择是：应该使用Setter方法还是构造器来设置变量的值。这两种技术都有其优点，但它们在不同的情况下被实现。 在本教程中，我们将讨论在Java中何时使用Setter方法或构造器来设置变量的值。 2. 使用Setter方法 Setter方法是我们可以在Java类中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Setter Methods"}],["meta",{"property":"article:tag","content":"Constructors"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中何时使用Setter方法或构造器设置变量的值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中何时使用Setter方法或构造器设置变量的值 1. 引言 开发者们经常面临的一个选择是：应该使用Setter方法还是构造器来设置变量的值。这两种技术都有其优点，但它们在不同的情况下被实现。 在本教程中，我们将讨论在Java中何时使用Setter方法或构造器来设置变量的值。 2. 使用Setter方法 Setter方法是我们可以在Java类中..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用Setter方法","slug":"_2-使用setter方法","link":"#_2-使用setter方法","children":[]},{"level":2,"title":"3. 使用构造器","slug":"_3-使用构造器","link":"#_3-使用构造器","children":[]},{"level":2,"title":"4. 在Setter和构造器之间选择","slug":"_4-在setter和构造器之间选择","link":"#_4-在setter和构造器之间选择","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.29,"words":988},"filePathRelative":"posts/baeldung/Archive/2024-06-20-When to Use Setter Methods or Constructors for Setting a Variable s Value in Java.md","localizedDate":"2024年6月20日","excerpt":"<hr>\\n<h1>在Java中何时使用Setter方法或构造器设置变量的值</h1>\\n<h2>1. 引言</h2>\\n<p>开发者们经常面临的一个选择是：应该使用Setter方法还是构造器来设置变量的值。这两种技术都有其优点，但它们在不同的情况下被实现。</p>\\n<p><strong>在本教程中，我们将讨论在Java中何时使用Setter方法或构造器来设置变量的值。</strong></p>\\n<h2>2. 使用Setter方法</h2>\\n<p>Setter方法是我们可以在Java类中用来设置实例变量值的函数。<strong>此外，它们提供了一种灵活的方式来在对象初始化后修改其状态。</strong> 使用Setter方法设置的实例变量不能声明为final，因为这些值可以在对象初始化后更改。</p>","autoDesc":true}');export{d as comp,k as data};
