import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-CWrPnTfB.js";const i={},s=n(`<h1 id="java-hashmap-支持不同值类型" tabindex="-1"><a class="header-anchor" href="#java-hashmap-支持不同值类型"><span>Java HashMap 支持不同值类型</span></a></h1><ol><li>概述</li></ol><p>HashMap 存储键值映射。在本教程中，我们将讨论如何在 HashMap 中存储不同类型的值。</p><ol start="2"><li>问题介绍</li></ol><p>自从 Java 泛型引入以来，我们通常以泛型的方式使用 HashMap，例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`&lt;String, Integer&gt;\` numberByName = new HashMap&lt;&gt;();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，我们只能将 String 和 Integer 数据作为键值对放入 numberByName 映射中。这很好，因为它确保了类型安全。例如，如果我们尝试将 Float 对象放入 Map，我们将得到“类型不兼容”的编译错误。</p><p>然而，<strong>有时我们希望将不同类型的数据放入 Map</strong>。例如，我们希望 numberByName 映射也能存储 Float 和 BigDecimal 对象作为值。</p><p>在讨论如何实现这一点之前，让我们创建一个示例问题，以便于演示和解释。假设我们有三个不同类型的对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Integer intValue = 777;
int[] intArray = new int[]{2, 3, 5, 7, 11, 13};
Instant instant = Instant.now();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，这三种类型完全不同。因此，我们首先尝试将这三个对象放入 HashMap。为了简单起见，我们将使用 String 值作为键。</p><p>当然，在某个时候，我们需要从 Map 中读取数据并使用数据。因此，我们将遍历 HashMap 中的条目，并为每个条目打印值和一些描述。</p><p>让我们看看如何实现这一点。</p><ol start="3"><li>使用 Map<code>&lt;String, Object&gt;</code></li></ol><p>我们知道，在 Java 中，<strong>Object 是所有类型的超类型</strong>。因此，如果我们声明一个 Map 为 Map<code>&lt;String, Object&gt;</code>，它应该接受任何类型的值。</p><p>接下来，让我们看看这种方法是否符合我们的要求。</p><p>3.1. 将数据放入 Map</p><p>正如我们前面提到的，Map<code>&lt;String, Object&gt;</code> 允许我们将任何类型的值放入其中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`\`\`\`\`&lt;String, Object&gt;\`\`\`\`\` rawMap = new HashMap&lt;&gt;();
rawMap.put(&quot;E1 (Integer)&quot;, intValue);
rawMap.put(&quot;E2 (IntArray)&quot;, intArray);
rawMap.put(&quot;E3 (Instant)&quot;, instant);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这非常简单。接下来，让我们访问 Map 中的条目并打印值和描述。</p><p>3.2. 使用数据</p><p>在我们将值放入 Map<code>&lt;String, Object&gt;</code> 后，我们失去了值的具体类型。因此，<strong>在实际使用数据之前，我们需要检查并将值转换为适当的类型</strong>。例如，我们可以使用 instanceof 操作符来验证值的类型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>rawMap.forEach((k, v) -&gt; {
    if (v instanceof Integer) {
        Integer theV = (Integer) v;
        System.out.println(k + &quot; -&gt; &quot;
          + String.format(&quot;The value is a %s integer: %d&quot;, theV &gt; 0 ? &quot;positive&quot; : &quot;negative&quot;, theV));
    } else if (v instanceof int[]) {
        int[] theV = (int[]) v;
        System.out.println(k + &quot; -&gt; &quot;
          + String.format(&quot;The value is an array of %d integers: %s&quot;, theV.length, Arrays.toString(theV)));
    } else if (v instanceof Instant) {
        Instant theV = (Instant) v;
        System.out.println(k + &quot; -&gt; &quot;
          + String.format(&quot;The value is an instant: %s&quot;, FORMATTER.format(theV)));
    } else {
        throw new IllegalStateException(&quot;Unknown Type Found.&quot;);
    }
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们执行上述代码，我们将看到输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>E1 (Integer) -&gt; The value is a positive integer: 777
E2 (IntArray) -&gt; The value is an array of 6 integers: [2, 3, 5, 7, 11, 13]
E3 (Instant) -&gt; The value is an instant: 2021-11-23 21:48:02
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法正如我们所期望的那样工作。</p><p>然而，它有一些缺点。接下来，让我们更仔细地看看它们。</p><p>3.3. 缺点</p><p>首先，如果我们计划让 map 支持相对更多的不同类型，<strong>多个 if-else 语句将变成一个大的代码块，使代码难以阅读</strong>。</p><p>此外，<strong>如果我们想要使用的类型包含继承关系，instanceof 检查可能会失败</strong>。</p><p>例如，如果我们在 map 中放入一个 java.lang.Integer intValue 和一个 java.lang.Number numberValue，我们不能使用 instanceof 操作符来区分它们。这是因为两者 (intValue instanceof Integer) 和 (intValue instanceof Number) 都返回 true。</p><p>因此，我们必须添加额外的检查来确定值的具体类型。但当然，这将使代码难以阅读。</p><p>最后，由于我们的 map 接受任何类型的值，<strong>我们失去了类型安全</strong>。也就是说，我们必须处理遇到意外类型时的异常情况。</p><p>可能会有一个问题出现：有没有一种方法可以接受不同类型的数据并保持类型安全？</p><p>接下来，我们将讨论另一种解决问题的方法。</p><ol start="4"><li>为所有需要的类型创建超类型</li></ol><p>在这一部分，我们将介绍一个超类型以保持类型安全。</p><p>4.1. 数据模型</p><p>首先，我们创建一个接口 DynamicTypeValue：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface DynamicTypeValue {
    String valueDescription();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这个接口将是我们期望 map 支持的所有类型的超类型</strong>。它还可以包含一些共同的操作。例如，我们已经定义了一个 valueDescription 方法。</p><p>然后，<strong>我们为每种具体类型创建一个类来包装值并实现我们创建的接口</strong>。例如，我们可以为 Integer 类型创建一个 IntegerTypeValue 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class IntegerTypeValue implements DynamicTypeValue {
    private Integer value;

    public IntegerTypeValue(Integer value) {
        this.value = value;
    }

    @Override
    public String valueDescription() {
        if(value == null){
            return &quot;The value is null.&quot;;
        }
        return String.format(&quot;The value is a %s integer: %d&quot;, value &gt; 0 ? &quot;positive&quot; : &quot;negative&quot;, value);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，让我们为其他两种类型创建类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class IntArrayTypeValue implements DynamicTypeValue {
    private int[] value;

    public IntArrayTypeValue(int[] value) { ... }

    @Override
    public String valueDescription() {
        // null handling omitted
        return String.format(&quot;The value is an array of %d integers: %s&quot;, value.length, Arrays.toString(value));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class InstantTypeValue implements DynamicTypeValue {
    private static DateTimeFormatter FORMATTER = ...
    
    private Instant value;

    public InstantTypeValue(Instant value) { ... }

    @Override
    public String valueDescription() {
        // null handling omitted
        return String.format(&quot;The value is an instant: %s&quot;, FORMATTER.format(value));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们需要支持更多类型，我们只需添加相应的类。</p><p>接下来，让我们看看如何使用上面的数据模型在 map 中存储和使用不同类型的值。</p><p>4.2. 在 Map 中放置和使用数据</p><p>首先，让我们看看如何声明 Map 并将各种类型的数据放入其中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`\`&lt;String, DynamicTypeValue&gt;\`\` theMap = new HashMap&lt;&gt;();
theMap.put(&quot;E1 (Integer)&quot;, new IntegerTypeValue(intValue));
theMap.put(&quot;E2 (IntArray)&quot;, new IntArrayTypeValue(intArray));
theMap.put(&quot;E3 (Instant)&quot;, new InstantTypeValue(instant));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们已经声明了 map 为 Map<code>&lt;String, DynamicTypeValue&gt;</code>，这样 <strong>类型安全得到了保证</strong>：只有具有 DynamicTypeValue 类型的数据才允许放入 map。</p><p><strong>当我们向 map 添加数据时，我们实例化了我们创建的相应类</strong>。</p><p>当我们使用数据时，<strong>不需要类型检查和转换</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>theMap.forEach((k, v) -&gt; System.out.println(k + &quot; -&gt; &quot; + v.valueDescription()));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们运行代码，它将打印：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>E1 (Integer) -&gt; The value is a positive integer: 777
E2 (IntArray) -&gt; The value is an array of 5 integers: [2, 3, 5, 7, 11]
E3 (Instant) -&gt; The value is an instant: 2021-11-23 22:32:43
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<strong>这种方法的代码是干净且更易于阅读的</strong>。</p><p>此外，由于我们为我们需要支持的每种类型创建了包装类，具有继承关系类型不会导致任何问题。</p><p>得益于类型安全，<strong>我们不需要处理遇到意外类型数据的错误情况</strong>。</p><ol start="5"><li>结论</li></ol><p>在本文中，我们讨论了如何使 Java HashMap 支持不同类型的值数据。</p><p>我们还通过示例讨论了两种实现方法。</p><p>像往常一样，伴随文章的源代码可在 GitHub 上获得。</p>`,64),l=[s];function r(d,p){return a(),t("div",null,l)}const o=e(i,[["render",r],["__file","2024-07-23-Java HashMap With Different Value Types.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Java%20HashMap%20With%20Different%20Value%20Types.html","title":"Java HashMap 支持不同值类型","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","HashMap"],"tag":["Java","HashMap","Generics"],"head":[["meta",{"name":"keywords","content":"Java, HashMap, Generics, 多类型值"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Java%20HashMap%20With%20Different%20Value%20Types.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java HashMap 支持不同值类型"}],["meta",{"property":"og:description","content":"Java HashMap 支持不同值类型 概述 HashMap 存储键值映射。在本教程中，我们将讨论如何在 HashMap 中存储不同类型的值。 问题介绍 自从 Java 泛型引入以来，我们通常以泛型的方式使用 HashMap，例如： 在这种情况下，我们只能将 String 和 Integer 数据作为键值对放入 numberByName 映射中。这很..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T20:00:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"Generics"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T20:00:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java HashMap 支持不同值类型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T20:00:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java HashMap 支持不同值类型 概述 HashMap 存储键值映射。在本教程中，我们将讨论如何在 HashMap 中存储不同类型的值。 问题介绍 自从 Java 泛型引入以来，我们通常以泛型的方式使用 HashMap，例如： 在这种情况下，我们只能将 String 和 Integer 数据作为键值对放入 numberByName 映射中。这很..."},"headers":[],"git":{"createdTime":1721764809000,"updatedTime":1721764809000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.74,"words":1722},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Java HashMap With Different Value Types.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>概述</li>\\n</ol>\\n<p>HashMap 存储键值映射。在本教程中，我们将讨论如何在 HashMap 中存储不同类型的值。</p>\\n<ol start=\\"2\\">\\n<li>问题介绍</li>\\n</ol>\\n<p>自从 Java 泛型引入以来，我们通常以泛型的方式使用 HashMap，例如：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Map`&lt;String, Integer&gt;` numberByName = new HashMap&lt;&gt;();\\n</code></pre></div>","autoDesc":true}');export{o as comp,c as data};
