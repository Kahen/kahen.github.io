import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CE5go3V-.js";const t={},p=e(`<h1 id="java通配符导入的优势和劣势" tabindex="-1"><a class="header-anchor" href="#java通配符导入的优势和劣势"><span>Java通配符导入的优势和劣势</span></a></h1><p>在本教程中，我们将讨论Java中使用通配符导入的优势和劣势。</p><p>Java <code>import</code> 语句声明了代码中使用的名称（类名、静态变量和方法名）的来源。</p><p>以一个 <code>Book</code> 类为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">UUID</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Date</span> datePublished<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` authors<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们需要导入 <code>Date</code> 和 <code>UUID</code> 两种数据类型以及 <code>List</code> 接口，因为它们默认情况下不可用。因此，我们编写了三个导入语句以使我们的类可以使用这些数据类型。让我们将这些类型的导入称为特定导入。</p><h3 id="_3-java通配符导入" tabindex="-1"><a class="header-anchor" href="#_3-java通配符导入"><span>3. Java通配符导入</span></a></h3><p>通配符导入指的是导入一个包而不是声明包中使用的具体类名。</p><p>使用通配符，我们可以将前一个示例中的三个导入语句替换为仅一个语句：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Date</span> datePublished<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` authors<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一个通配符 <code>import</code> 语句将整个 <code>java.util</code> 包添加到搜索路径中，可以在其中找到所需的 <code>UUID</code>、<code>Date</code> 和 <code>List</code> 的名称。</p><h3 id="_4-通配符导入的优势" tabindex="-1"><a class="header-anchor" href="#_4-通配符导入的优势"><span>4. 通配符导入的优势</span></a></h3><p>自然地，与Java中的特定导入相比，通配符导入也有一些优势。让我们在下面的小节中讨论通配符导入的主要优势。</p><h4 id="_4-1-清洁代码" tabindex="-1"><a class="header-anchor" href="#_4-1-清洁代码"><span>4.1. 清洁代码</span></a></h4><p>通配符导入帮助我们避免了代码中的长导入列表。因此，这对代码的可读性产生了影响，因为读者可能需要在每个源代码文件中滚动很多内容才能到达显示逻辑的代码。毫无疑问，更易读的代码也是清洁的代码。</p><p>这个想法也得到了《Clean Code》一书的支持，作者为 Robert C. Martin。事实上，这本书建议当从同一个源导入多个类时使用通配符导入。换句话说，当我们从包中导入两个或更多类时，最好导入整个包。</p><h4 id="_4-2-重构便利性" tabindex="-1"><a class="header-anchor" href="#_4-2-重构便利性"><span>4.2. 重构便利性</span></a></h4><p>有了通配符导入，重构变得更加容易。例如，在重命名一个类时，我们不需要删除其所有特定的导入声明。</p><p>此外，如果我们将一个类从我们的一个包移动到另一个包，如果文件中已经存在对这两个包的通配符导入，我们就不需要重构任何代码。</p><h4 id="_4-3-松耦合" tabindex="-1"><a class="header-anchor" href="#_4-3-松耦合"><span>4.3. 松耦合</span></a></h4><p>通配符导入在现代软件开发中执行了松耦合方法。</p><p>根据 Robert C. Martin 的说法，使用通配符导入的想法强化了松耦合。有了特定导入，类必须存在于一个包中。然而，有了通配符导入，特定类不需要存在于包中。实际上，通配符导入将指定的包添加到搜索路径中，可以在其中搜索所需的类名。</p><p><strong>因此，通配符风格的导入不会给包添加真正的依赖。</strong></p><h3 id="_5-通配符导入的劣势" tabindex="-1"><a class="header-anchor" href="#_5-通配符导入的劣势"><span>5. 通配符导入的劣势</span></a></h3><p>通配符导入也有它们的劣势。接下来，让我们看看通配符导入可能导致的一些问题。</p><h4 id="_5-1-类名冲突" tabindex="-1"><a class="header-anchor" href="#_5-1-类名冲突"><span>5.1. 类名冲突</span></a></h4><p><strong>不幸的是，当一个类名在通过通配符导入的多个包中找到时，可能会发生冲突。</strong></p><p>在这种情况下，编译器注意到有两个 <code>Date</code> 类，并给出一个错误，因为 <code>Date</code> 类同时在 <code>java.sql</code> 和 <code>java.util</code> 包中找到：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Library</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Time</span> openingTime<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Time</span> closingTime<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Date</span><span class="token punctuation">&gt;</span></span>\` datesClosed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为了防止这样的错误，我们可以指定冲突类的首选来源。</strong></p><p>为了防止上述示例中的错误，我们可以在两个现有导入中添加第三行，指定冲突的 <code>Date</code> 类的来源：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-意外的类名冲突" tabindex="-1"><a class="header-anchor" href="#_5-2-意外的类名冲突"><span>5.2. 意外的类名冲突</span></a></h4><p><strong>有趣的是，随着时间的推移，冲突也可能突然出现，例如当我们使用的另一个包的较新版本中添加了一个类。</strong></p><p>例如，在 Java 1.1 中，<code>List</code> 类只在 <code>java.awt</code> 包中找到。然而，在 Java 1.2 中，<code>java.util</code> 包中添加了一个名为 <code>List</code> 的接口。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookView</span> <span class="token keyword">extends</span> <span class="token class-name">Frame</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Date</span> datePublished<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">List</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` authors<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终，这种情况可能会在将 <code>java.awt</code> 和 <code>java.util</code> 包都作为通配符导入时引起冲突。<strong>因此，我们在将代码迁移到较新的Java版本时可能会面临问题。</strong></p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p>`,40),o=[p];function c(l,i){return s(),n("div",null,o)}const u=a(t,[["render",c],["__file","2024-07-17-Advantages and Disadvantages of Using Java Wildcard Imports.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Advantages%20and%20Disadvantages%20of%20Using%20Java%20Wildcard%20Imports.html","title":"Java通配符导入的优势和劣势","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java Wildcard Imports","Code Cleanliness","Refactoring"],"head":[["meta",{"name":"keywords","content":"Java, Wildcard Imports, Code Cleanliness, Refactoring, Java Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Advantages%20and%20Disadvantages%20of%20Using%20Java%20Wildcard%20Imports.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java通配符导入的优势和劣势"}],["meta",{"property":"og:description","content":"Java通配符导入的优势和劣势 在本教程中，我们将讨论Java中使用通配符导入的优势和劣势。 Java import 语句声明了代码中使用的名称（类名、静态变量和方法名）的来源。 以一个 Book 类为例： 在这里，我们需要导入 Date 和 UUID 两种数据类型以及 List 接口，因为它们默认情况下不可用。因此，我们编写了三个导入语句以使我们的类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T06:09:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Wildcard Imports"}],["meta",{"property":"article:tag","content":"Code Cleanliness"}],["meta",{"property":"article:tag","content":"Refactoring"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T06:09:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java通配符导入的优势和劣势\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T06:09:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java通配符导入的优势和劣势 在本教程中，我们将讨论Java中使用通配符导入的优势和劣势。 Java import 语句声明了代码中使用的名称（类名、静态变量和方法名）的来源。 以一个 Book 类为例： 在这里，我们需要导入 Date 和 UUID 两种数据类型以及 List 接口，因为它们默认情况下不可用。因此，我们编写了三个导入语句以使我们的类..."},"headers":[{"level":3,"title":"3. Java通配符导入","slug":"_3-java通配符导入","link":"#_3-java通配符导入","children":[]},{"level":3,"title":"4. 通配符导入的优势","slug":"_4-通配符导入的优势","link":"#_4-通配符导入的优势","children":[]},{"level":3,"title":"5. 通配符导入的劣势","slug":"_5-通配符导入的劣势","link":"#_5-通配符导入的劣势","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721196567000,"updatedTime":1721196567000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.03,"words":1209},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Advantages and Disadvantages of Using Java Wildcard Imports.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将讨论Java中使用通配符导入的优势和劣势。</p>\\n<p>Java <code>import</code> 语句声明了代码中使用的名称（类名、静态变量和方法名）的来源。</p>\\n<p>以一个 <code>Book</code> 类为例：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">import</span> <span class=\\"token import\\"><span class=\\"token namespace\\">java<span class=\\"token punctuation\\">.</span>util<span class=\\"token punctuation\\">.</span></span><span class=\\"token class-name\\">Date</span></span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">import</span> <span class=\\"token import\\"><span class=\\"token namespace\\">java<span class=\\"token punctuation\\">.</span>util<span class=\\"token punctuation\\">.</span></span><span class=\\"token class-name\\">List</span></span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">import</span> <span class=\\"token import\\"><span class=\\"token namespace\\">java<span class=\\"token punctuation\\">.</span>util<span class=\\"token punctuation\\">.</span></span><span class=\\"token class-name\\">UUID</span></span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Book</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">UUID</span> id<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Date</span> datePublished<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">List</span>```<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>``` authors<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{u as comp,k as data};
