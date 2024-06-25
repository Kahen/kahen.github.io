import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-C7BF_WGE.js";const e={},p=t(`<h1 id="使用spring-boot测试中的-autowired和-injectmocks-baeldung" tabindex="-1"><a class="header-anchor" href="#使用spring-boot测试中的-autowired和-injectmocks-baeldung"><span>使用Spring Boot测试中的@Autowired和@InjectMocks | Baeldung</span></a></h1><p>在本教程中，我们将探讨在Spring Boot测试中使用Spring Boot的@Autowired和Mockito的@InjectMocks注入依赖项的使用情况。我们将讨论需要使用它们的用例，并查看相同的例子。</p><h3 id="_2-理解测试注解" tabindex="-1"><a class="header-anchor" href="#_2-理解测试注解"><span>2. 理解测试注解</span></a></h3><p>在开始代码示例之前，让我们快速看一下一些测试注解的基础知识。</p><p>首先，Mockito最常用的@Mock注解为测试创建了一个依赖项的模拟实例。<strong>它经常与@InjectMocks结合使用，后者将标记有@Mock的模拟注入到正在测试的目标对象中。</strong></p><p>除了Mockito的注解，Spring Boot的注解@MockBean可以帮助创建一个模拟的Spring bean。然后，模拟的bean可以被上下文中的其他bean使用。<strong>此外，如果Spring上下文自己创建了可以在不模拟的情况下使用的bean，我们可以使用@Autowired注解来注入它们。</strong></p><h3 id="_3-示例设置" tabindex="-1"><a class="header-anchor" href="#_3-示例设置"><span>3. 示例设置</span></a></h3><p>在我们的代码示例中，我们将创建一个服务，它有两个依赖项。然后，我们将探索使用上述注解来测试服务。</p><h4 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1. 依赖项</span></a></h4><p>让我们首先添加所需的依赖项。我们将包括Spring Boot Starter Web和Spring Boot Starter Test依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId\\</span><span class="token punctuation">&gt;</span></span>org.springframework.boot\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-web\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version\\</span><span class="token punctuation">&gt;</span></span>3.2.5\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId\\</span><span class="token punctuation">&gt;</span></span>org.springframework.boot\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-test\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version\\</span><span class="token punctuation">&gt;</span></span>3.2.5\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope\\</span><span class="token punctuation">&gt;</span></span>test\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，我们还将添加我们将需要模拟我们的服务的Mockito Core依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId\\</span><span class="token punctuation">&gt;</span></span>org.mockito\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>mockito-core\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId\\</span><span class="token punctuation">&gt;</span></span>
    \\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version\\</span><span class="token punctuation">&gt;</span></span>5.11.0\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version\\</span><span class="token punctuation">&gt;</span></span>
\\<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency\\</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-dto" tabindex="-1"><a class="header-anchor" href="#_3-2-dto"><span>3.2. DTO</span></a></h4><p>接下来，让我们创建一个DTO，我们将在服务中使用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数，setters/getters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-服务" tabindex="-1"><a class="header-anchor" href="#_3-3-服务"><span>3.3. 服务</span></a></h4><p>接下来，让我们看看我们的服务。首先，让我们定义一个负责数据库交互的服务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DatabaseService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Book</span> <span class="token function">findById</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 查询数据库并获取一本书</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Author&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们不会深入数据库交互，因为它们与示例无关。我们使用@Service注解来声明这个类为Spring bean的Service原型。</p><p>接下来，让我们引入一个依赖上述服务的服务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">DatabaseService</span> databaseService<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">ObjectMapper</span> objectMapper<span class="token punctuation">;</span>

    <span class="token class-name">BookService</span><span class="token punctuation">(</span><span class="token class-name">DatabaseService</span> databaseService<span class="token punctuation">,</span> <span class="token class-name">ObjectMapper</span> objectMapper<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>databaseService <span class="token operator">=</span> databaseService<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>objectMapper <span class="token operator">=</span> objectMapper<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">String</span> <span class="token function">getBook</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Book</span> book <span class="token operator">=</span> databaseService<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们有一个小服务，它有一个getBook()方法。该方法利用DatabaseService从数据库中获取一本书。然后，它使用Jackson的ObjectMapper API将Book对象转换并返回为JSON字符串。</p><p>因此，此服务有两个依赖项：DatabaseService和ObjectMapper。当我们使用spring-boot-starter-web依赖项时，ObjectMapper bean会自动由Spring Boot创建。</p><h3 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试"><span>4. 测试</span></a></h3><p>现在我们的服务已经设置好了，让我们看看如何使用我们之前定义的注解来测试BookService。</p><h4 id="_4-1-使用-mock和-injectmocks" tabindex="-1"><a class="header-anchor" href="#_4-1-使用-mock和-injectmocks"><span>4.1. 使用@Mock和@InjectMocks</span></a></h4><p>第一种选择是使用@Mock模拟服务的两个依赖项，并使用@InjectMocks将它们注入到服务中。让我们为同样创建一个测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">BookServiceMockAndInjectMocksUnitTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Mock</span>
    <span class="token keyword">private</span> <span class="token class-name">DatabaseService</span> databaseService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Mock</span>
    <span class="token keyword">private</span> <span class="token class-name">ObjectMapper</span> objectMapper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@InjectMocks</span>
    <span class="token keyword">private</span> <span class="token class-name">BookService</span> bookService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenBookService_whenGettingBook_thenBookIsCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Book</span> book1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Inferno&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Dan Brown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">when</span><span class="token punctuation">(</span>databaseService<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span>book1<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">when</span><span class="token punctuation">(</span>objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>book1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> bookString1 <span class="token operator">=</span> bookService<span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>bookString1<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Dan Brown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们用@SpringBootTest注解测试类。这表示在运行测试之前将加载应用程序上下文。当使用@InjectMocks替换Spring bean依赖项时需要这样做。</p><p>接下来，我们声明DatabaseService和ObjectMapper字段，并用@Mock注解它们。这为它们两个创建了模拟对象。<strong>我们在声明我们将要测试的BookService实例时添加了@InjectMocks注解。这将注入服务所需的任何依赖项，这些依赖项已经用@Mocks声明过了。</strong></p><p>最后，在我们的测试中，我们模拟我们模拟对象的行为，并测试我们服务的getBook()方法。</p><p><strong>使用这种方法时，必须模拟服务的所有依赖项。</strong> 例如，如果我们没有模拟ObjectMapper，当在测试方法中调用它时，会导致NullPointerException。</p><h4 id="_4-2-使用-autowired与-mockbean" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-autowired与-mockbean"><span>4.2. 使用@Autowired与@MockBean</span></a></h4><p>在上述方法中，我们模拟了两个依赖项。然而，可能需要模拟一些依赖项而不是全部。假设我们不需要模拟ObjectMapper的行为，只模拟DatabaseService。</p><p>由于我们在测试中加载了Spring上下文，我们可以使用@Autowired和@MockBean注解的组合来实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@MockBean</span>
<span class="token keyword">private</span> <span class="token class-name">DatabaseService</span> databaseService<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">BookService</span> bookService<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenBookService_whenGettingBook_thenBookIsCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> book1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Inferno&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Dan Brown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">when</span><span class="token punctuation">(</span>databaseService<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span>book1<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> bookString1 <span class="token operator">=</span> bookService<span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>bookString1<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Dan Brown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们用@MockBean注解DatabaseService。然后我们使用@Autowired从应用程序上下文中获取BookService实例。</p><p><strong>当注入BookService bean时，实际的DatabaseService bean将被模拟的bean替换。</strong> 相反，ObjectMapper bean保持与应用程序最初创建的相同。</p><p>现在当我们测试这个实例时，我们不需要为ObjectMapper模拟任何行为。</p><p>这种方法在我们需要测试嵌套bean的行为并且不想模拟每个依赖项时非常有用。</p><h4 id="_4-3-一起使用-autowired和-injectmocks" tabindex="-1"><a class="header-anchor" href="#_4-3-一起使用-autowired和-injectmocks"><span>4.3. 一起使用@Autowired和@InjectMocks</span></a></h4><p>我们也可以在上述用例中使用@InjectMocks代替@MockBean。</p><p>让我们看看代码，看看两种方法之间的区别：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Mock</span>
<span class="token keyword">private</span> <span class="token class-name">DatabaseService</span> databaseService<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Autowired</span>
<span class="token annotation punctuation">@InjectMocks</span>
<span class="token keyword">private</span> <span class="token class-name">BookService</span> bookService<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenBookService_whenGettingBook_thenBookIsCorrect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Book</span> book1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Inferno&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Dan Brown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">MockitoAnnotations</span><span class="token punctuation">.</span><span class="token function">openMocks</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">when</span><span class="token punctuation">(</span>databaseService<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span>book1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> bookString1 <span class="token operator">=</span> bookService<span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>bookString1<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Dan Brown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用@Mock而不是@MockBean来模拟DatabaseService。除了@Autowired，我们在BookService实例上添加了@InjectMocks注解。</p><p>当同时使用两个注解时，@InjectMocks不会自动注入模拟的依赖项，而是在测试开始时注入自动装配的BookService对象。</p><p><strong>然而，我们可以通过调用MockitoAnnotations.openMocks()方法稍后在我们的测试中注入模拟的DatabaseService实例。</strong> 这个方法查找用@InjectMocks标记的字段，并将模拟对象注入其中。</p><p>我们在测试中需要模拟DatabaseService的行为之前调用它。这种方法在我们想要动态决定何时使用模拟以及何时使用实际的bean来覆盖依赖项时非常有用。</p><h2 id="_5-方法比较" tabindex="-1"><a class="header-anchor" href="#_5-方法比较"><span>5. 方法比较</span></a></h2><p>现在我们已经看了多种方法，让我们总结一下它们之间的比较：</p><table><thead><tr><th>方法</th><th>描述</th><th>使用</th></tr></thead><tbody><tr><td>@Mock与@InjectMocks</td><td>使用Mockito的@Mock注解创建依赖项的模拟实例，并使用@InjectMocks将这些模拟注入到正在测试的目标对象中。</td><td>适用于单元测试，其中我们想要模拟测试类的所有依赖项。</td></tr><tr><td>@MockBean与@Autowired</td><td>利用Spring Boot的@MockBean注解创建模拟的Spring bean，并使用@Autowired来注入这些bean。</td><td>适用于Spring Boot应用程序的集成测试。它允许我们在Spring的依赖注入中模拟一些Spring bean，同时获取其他bean。</td></tr><tr><td>@InjectMocks与@Autowired</td><td>使用Mockito的@Mock注解创建模拟实例，并使用@InjectMocks将这些模拟注入到已经使用Spring自动装配的目标bean中。</td><td>在我们需要使用Mockito临时模拟一些依赖项以覆盖注入的Spring Beans的场景中提供灵活性。适用于测试Spring应用程序中的复杂场景。</td></tr></tbody></table><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们查看了Mockito和Spring Boot注解的不同用例——@Mock、@InjectMocks、@Autowired和@MockBean。我们探讨了根据我们的测试需求的需要使用不同组合的注解。</p><p>正如往常一样，本教程的代码示例可在GitHub上找到。</p>`,55),o=[p];function c(i,l){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","Using @Autowired and @InjectMocks in Spring Boot Tests.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Using%20@Autowired%20and%20@InjectMocks%20in%20Spring%20Boot%20Tests.html","title":"使用Spring Boot测试中的@Autowired和@InjectMocks | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Spring Boot","Testing"],"tag":["Autowired","InjectMocks"],"description":"使用Spring Boot测试中的@Autowired和@InjectMocks | Baeldung 在本教程中，我们将探讨在Spring Boot测试中使用Spring Boot的@Autowired和Mockito的@InjectMocks注入依赖项的使用情况。我们将讨论需要使用它们的用例，并查看相同的例子。 2. 理解测试注解 在开始代码示例之...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Using%20@Autowired%20and%20@InjectMocks%20in%20Spring%20Boot%20Tests.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Boot测试中的@Autowired和@InjectMocks | Baeldung"}],["meta",{"property":"og:description","content":"使用Spring Boot测试中的@Autowired和@InjectMocks | Baeldung 在本教程中，我们将探讨在Spring Boot测试中使用Spring Boot的@Autowired和Mockito的@InjectMocks注入依赖项的使用情况。我们将讨论需要使用它们的用例，并查看相同的例子。 2. 理解测试注解 在开始代码示例之..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Autowired"}],["meta",{"property":"article:tag","content":"InjectMocks"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Boot测试中的@Autowired和@InjectMocks | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"2. 理解测试注解","slug":"_2-理解测试注解","link":"#_2-理解测试注解","children":[]},{"level":3,"title":"3. 示例设置","slug":"_3-示例设置","link":"#_3-示例设置","children":[]},{"level":3,"title":"4. 测试","slug":"_4-测试","link":"#_4-测试","children":[]},{"level":2,"title":"5. 方法比较","slug":"_5-方法比较","link":"#_5-方法比较","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.35,"words":1904},"filePathRelative":"posts/baeldung/Archive/Using @Autowired and @InjectMocks in Spring Boot Tests.md","localizedDate":"2024年6月14日","excerpt":"\\n<p>在本教程中，我们将探讨在Spring Boot测试中使用Spring Boot的@Autowired和Mockito的@InjectMocks注入依赖项的使用情况。我们将讨论需要使用它们的用例，并查看相同的例子。</p>\\n<h3>2. 理解测试注解</h3>\\n<p>在开始代码示例之前，让我们快速看一下一些测试注解的基础知识。</p>\\n<p>首先，Mockito最常用的@Mock注解为测试创建了一个依赖项的模拟实例。<strong>它经常与@InjectMocks结合使用，后者将标记有@Mock的模拟注入到正在测试的目标对象中。</strong></p>\\n<p>除了Mockito的注解，Spring Boot的注解@MockBean可以帮助创建一个模拟的Spring bean。然后，模拟的bean可以被上下文中的其他bean使用。<strong>此外，如果Spring上下文自己创建了可以在不模拟的情况下使用的bean，我们可以使用@Autowired注解来注入它们。</strong></p>","autoDesc":true}');export{r as comp,d as data};
