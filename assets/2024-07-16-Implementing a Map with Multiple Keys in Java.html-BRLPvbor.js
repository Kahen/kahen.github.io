import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-D4B8YWfq.js";const i={},s=n(`<h1 id="java中实现具有多个键类型的map" tabindex="-1"><a class="header-anchor" href="#java中实现具有多个键类型的map"><span>Java中实现具有多个键类型的Map</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p>我们经常在程序中使用映射（map），作为一种将键与值关联起来的手段。通常在我们的Java程序中，尤其是自从引入泛型以来，所有的键都是相同的类型，所有的值也都是相同的类型。例如，在数据存储中将ID映射到值。</p><p>有时，我们可能想要使用一个映射，其中的键类型并不总是相同的。<strong>例如，如果我们将ID类型从_Long_更改为_String_，那么我们的数据存储将需要同时支持两种键类型——_Long_用于旧条目，_String_用于新条目。</strong></p><p>不幸的是，Java的_Map_接口不允许有多种键类型，因此我们需要找到另一种解决方案。在本文中，我们将探讨几种实现方式。</p><h2 id="_2-使用泛型超类型" tabindex="-1"><a class="header-anchor" href="#_2-使用泛型超类型"><span><strong>2. 使用泛型超类型</strong></span></a></h2><p>实现这一点的最简单方式是拥有一个映射，其键类型是我们所有键的最接近的超类型。在某些情况下，这可能很容易——例如，如果我们的键是_Long_和_Double_，那么最接近的超类型是_Number_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`&lt;Number, User&gt;\` users = new HashMap&lt;&gt;();
users.get(longId);
users.get(doubleId);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在其他情况下，最接近的超类型是_Object_。这的缺点是它完全移除了我们映射的类型安全性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`&lt;Object, User&gt;\` users = new HashMap&lt;&gt;();
users.get(longId); /// 有效。
users.get(stringId); // 有效。
users.get(Instant.now()); // 同样有效。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，编译器不会阻止我们传递错误的类型，有效地从我们的映射中移除了所有的类型安全性。在某些情况下，这可能没问题。例如，如果另一个类封装了映射本身以强制执行类型安全性，那么这可能是可以接受的。</p><p>然而，它仍然在使用映射的方式上带来了风险。</p><h2 id="_3-多个映射" tabindex="-1"><a class="header-anchor" href="#_3-多个映射"><span><strong>3. 多个映射</strong></span></a></h2><p>如果类型安全性很重要，并且我们将映射封装在另一个类中，另一个简单的选项是拥有多个映射。在这种情况下，我们将为每种支持的键拥有一个不同的映射：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`&lt;Long, User&gt;\` usersByLong = new HashMap&lt;&gt;();
Map\`&lt;String, User&gt;\` usersByString = new HashMap&lt;&gt;();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样做确保了编译器会为我们保持类型安全性。如果我们在这里尝试使用_Instant_，编译器将不允许我们这样做，所以我们在这里是安全的。</p><p>**不幸的是，这增加了复杂性，因为我们需要知道使用哪个映射。**这意味着我们要么有使用不同映射的不同方法，要么我们在任何地方都进行类型检查。</p><p>这也不容易扩展。如果我们想添加新的键类型，我们将需要在所有地方添加新的映射和新的检查。对于两三种键类型，这是可以管理的，但很快就会变得太多。</p><h2 id="_4-键包装类型" tabindex="-1"><a class="header-anchor" href="#_4-键包装类型"><span><strong>4. 键包装类型</strong></span></a></h2><p>**如果我们既需要类型安全性，又不想承担维护多个映射的负担，那么我们需要找到一种方法，让一个单一的映射可以拥有不同的键值。**这意味着我们需要找到一种方法，让一个单一的类型实际上是不同的类型。我们可以通过两种不同的方式实现这一点——使用单个包装器或使用接口和子类。</p><h3 id="_4-1-单个包装类" tabindex="-1"><a class="header-anchor" href="#_4-1-单个包装类"><span><strong>4.1. 单个包装类</strong></span></a></h3><p>我们拥有的一个选项是编写一个可以包装我们所有可能的键类型的单个类。这将有一个用于实际键值的单一字段，正确的_equals_和_hashCode_方法，然后为每种可能的类型提供一个构造函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class MultiKeyWrapper {
    private final Object key;

    MultiKeyWrapper(Long key) {
        this.key = key;
    }

    MultiKeyWrapper(String key) {
        this.key = key;
    }

    @Override
    public bool equals(Object other) { ... }

    @Override
    public int hashCode() { ... }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这保证了类型安全性，因为它只能使用_Long_或_String_构造。我们可以使用它作为映射中的单一类型，因为它本身就是一个单一的类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`\`&lt;MultiKeyWrapper, User&gt;\`\` users = new HashMap&lt;&gt;();
users.get(new MultiKeyWrapper(longId)); // 有效
users.get(new MultiKeyWrapper(stringId)); // 有效
users.get(new MultiKeyWrapper(Instant.now())); // 编译错误
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只需要将_Long_或_String_包装在我们的新_MultiKeyWrapper_中，就可以访问映射。</p><p>这相对简单，但它会使扩展稍微困难。每当我们想要支持任何额外的类型时，我们就需要更改_MultiKeyWrapper_类以支持它。</p><h3 id="_4-2-接口和子类" tabindex="-1"><a class="header-anchor" href="#_4-2-接口和子类"><span><strong>4.2. 接口和子类</strong></span></a></h3><p>另一种选择是编写一个接口来表示我们的键包装器，然后为我们想要支持的每种类型编写这个接口的实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>interface MultiKeyWrapper {}

record LongMultiKeyWrapper(Long value) implements MultiKeyWrapper {}
record StringMultiKeyWrapper(String value) implements MultiKeyWrapper {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这些实现可以使用Java 14中引入的Record功能，这将使实现变得更加容易。</p><p>和以前一样，然后我们可以使用_MultiKeyWrapper_作为映射的单一键类型。然后我们使用我们想要使用的键类型的适当实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`\`&lt;MultiKeyWrapper, User&gt;\`\` users = new HashMap&lt;&gt;();
users.get(new LongMultiKeyWrapper(longId)); // 有效
users.get(new StringMultiKeyWrapper(stringId)); // 有效
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们没有用于其他任何东西的类型，所以我们甚至不能首先编写无效的代码。</p><p>通过这种解决方案，我们不是通过更改现有类来支持额外的键类型，而是通过编写一个新的类来支持。这更容易支持，但这也意味着我们对支持的键类型有更少的控制。</p><p>然而，这可以通过正确使用可见性修饰符来管理。只有能够访问接口的类才能实现我们的接口，因此如果我们将其设置为包私有，那么只有同一包中的类才能实现它。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>在这里，我们看到了几种表示键到值的映射的方式，但键并不总是相同类型。这些策略的示例可以在GitHub上找到。</p>`,38),r=[s];function l(d,p){return t(),a("div",null,r)}const u=e(i,[["render",l],["__file","2024-07-16-Implementing a Map with Multiple Keys in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Implementing%20a%20Map%20with%20Multiple%20Keys%20in%20Java.html","title":"Java中实现具有多个键类型的Map","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","编程"],"tag":["Java","多键Map","编程技巧"],"head":[["meta",{"name":"keywords","content":"Java, 多键Map, 编程技巧"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Implementing%20a%20Map%20with%20Multiple%20Keys%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中实现具有多个键类型的Map"}],["meta",{"property":"og:description","content":"Java中实现具有多个键类型的Map 1. 引言 我们经常在程序中使用映射（map），作为一种将键与值关联起来的手段。通常在我们的Java程序中，尤其是自从引入泛型以来，所有的键都是相同的类型，所有的值也都是相同的类型。例如，在数据存储中将ID映射到值。 有时，我们可能想要使用一个映射，其中的键类型并不总是相同的。例如，如果我们将ID类型从_Long_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T19:27:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"多键Map"}],["meta",{"property":"article:tag","content":"编程技巧"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T19:27:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中实现具有多个键类型的Map\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T19:27:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中实现具有多个键类型的Map 1. 引言 我们经常在程序中使用映射（map），作为一种将键与值关联起来的手段。通常在我们的Java程序中，尤其是自从引入泛型以来，所有的键都是相同的类型，所有的值也都是相同的类型。例如，在数据存储中将ID映射到值。 有时，我们可能想要使用一个映射，其中的键类型并不总是相同的。例如，如果我们将ID类型从_Long_..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用泛型超类型","slug":"_2-使用泛型超类型","link":"#_2-使用泛型超类型","children":[]},{"level":2,"title":"3. 多个映射","slug":"_3-多个映射","link":"#_3-多个映射","children":[]},{"level":2,"title":"4. 键包装类型","slug":"_4-键包装类型","link":"#_4-键包装类型","children":[{"level":3,"title":"4.1. 单个包装类","slug":"_4-1-单个包装类","link":"#_4-1-单个包装类","children":[]},{"level":3,"title":"4.2. 接口和子类","slug":"_4-2-接口和子类","link":"#_4-2-接口和子类","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721158045000,"updatedTime":1721158045000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.16,"words":1549},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Implementing a Map with Multiple Keys in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2><strong>1. 引言</strong></h2>\\n<p>我们经常在程序中使用映射（map），作为一种将键与值关联起来的手段。通常在我们的Java程序中，尤其是自从引入泛型以来，所有的键都是相同的类型，所有的值也都是相同的类型。例如，在数据存储中将ID映射到值。</p>\\n<p>有时，我们可能想要使用一个映射，其中的键类型并不总是相同的。<strong>例如，如果我们将ID类型从_Long_更改为_String_，那么我们的数据存储将需要同时支持两种键类型——_Long_用于旧条目，_String_用于新条目。</strong></p>\\n<p>不幸的是，Java的_Map_接口不允许有多种键类型，因此我们需要找到另一种解决方案。在本文中，我们将探讨几种实现方式。</p>","autoDesc":true}');export{u as comp,v as data};
