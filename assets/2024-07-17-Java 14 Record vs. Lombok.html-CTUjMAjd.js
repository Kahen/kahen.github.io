import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as i}from"./app-Dj7PNGjp.js";const t={},l=i(`<h1 id="java-14-记录与-lombok-比较" tabindex="-1"><a class="header-anchor" href="#java-14-记录与-lombok-比较"><span>Java 14 记录与 Lombok 比较</span></a></h1><p>Java 的记录关键字是在 Java 14 中引入的一项新的语义特性。记录对于创建小型不可变对象非常有用。另一方面，Lombok 是一个 Java 库，可以自动生成一些已知模式作为 Java 字节码。尽管它们都可以用来减少样板代码，但它们是不同的工具。因此，我们应该根据给定上下文的需求选择更适合的那一个。</p><p>在本文中，我们将探索各种用例，包括 Java 记录的一些限。对于每个示例，我们将看看 Lombok 如何派上用场，并比较这两种解决方案。</p><h2 id="_2-小型不可变对象" tabindex="-1"><a class="header-anchor" href="#_2-小型不可变对象"><span>2. 小型不可变对象</span></a></h2><p>对于我们的第一个示例，我们将使用 <em>Color</em> 对象。一个 <em>Color</em> 由三个整数值组成，分别代表红色、绿色和蓝色通道。此外，颜色将暴露其十六进制表示。例如，具有 <em>RGB(255,0,0)</em> 的颜色将具有十六进制表示 <em>#FF0000</em>。此外，我们希望两个颜色如果具有相同的 RGB 值则视为 <em>相等</em>。</p><p>由于这些原因，在这种情况下选择一个 <em>记录</em> 是非常有意义的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public record ColorRecord(int red, int green, int blue) {
    public String getHexString() {
        return String.format(&quot;#%02X%02X%02X&quot;, red, green, blue);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，Lombok 允许我们使用 <em>@Value</em> 注解创建不可变对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Value
public class ColorValueObject {
    int red;
    int green;
    int blue;
    public String getHexString() {
        return String.format(&quot;#%02X%02X%02X&quot;, red, green, blue);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管如此，从 Java 14 开始，<em>记录</em> 将是这些用例的自然方式。</p><h2 id="_3-透明数据载体" tabindex="-1"><a class="header-anchor" href="#_3-透明数据载体"><span>3. 透明数据载体</span></a></h2><p>根据 JDK 增强提案（JEP 395），<strong>记录是作为不可变数据的透明载体的类。因此，我们不能阻止记录暴露其成员字段。</strong> 例如，我们不能强制上一个示例中的 <em>ColorRecord</em> 仅暴露 <em>hexString</em> 并完全隐藏三个整型字段。</p><p>然而，Lombok 允许我们自定义 getter 的名称、访问级别和返回类型。让我们相应地更新 <em>ColorValueObject</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Value
@Getter(AccessLevel.NONE)
public class ColorValueObject {
    int red;
    int green;
    int blue;
    public String getHexString() {
        return String.format(&quot;#%02X%02X%02X&quot;, red, green, blue);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>因此，如果我们需要不可变数据对象，记录是一个很好的解决方案。</strong></p><p><strong>然而，如果我们想要隐藏成员字段并且只暴露使用它们执行的一些操作，Lombok 将更适合。</strong></p><h2 id="_4-具有许多字段的类" tabindex="-1"><a class="header-anchor" href="#_4-具有许多字段的类"><span>4. 具有许多字段的类</span></a></h2><p>我们已经看到记录是创建小型不可变对象的一种非常方便的方式。让我们看看如果数据模型需要更多字段，记录会是什么样子。对于这个示例，让我们考虑 <em>Student</em> 数据模型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public record StudentRecord(
  String firstName,
  String lastName,
  Long studentId,
  String email,
  String phoneNumber,
  String address,
  String country,
  int age) {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经可以猜测，StudentRecord 的实例化将难以阅读和理解，特别是如果某些字段不是强制性的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>StudentRecord john = new StudentRecord(
  &quot;John&quot;, &quot;Doe&quot;, null, &quot;john@doe.com&quot;, null, null, &quot;England&quot;, 20);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为了促进这些用例，Lombok 提供了 Builder 设计模式的实现。</p><p>为了使用它，我们只需要用 <em>@Builder</em> 注解我们的类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Getter
@Builder
public class StudentBuilder {
    private String firstName;
    private String lastName;
    private Long studentId;
    private String email;
    private String phoneNumber;
    private String address;
    private String country;
    private int age;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用 <em>StudentBuilder</em> 以相同的属性创建一个对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>StudentBuilder john = StudentBuilder.builder()
  .firstName(&quot;John&quot;)
  .lastName(&quot;Doe&quot;)
  .email(&quot;john@doe.com&quot;)
  .country(&quot;England&quot;)
  .age(20)
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们比较两者，我们可以注意到使用构建者模式是有利的，导致代码更清晰。</p><p><strong>总之，记录更适合小型对象。虽然，对于具有许多字段的对象，缺乏创建模式将使 Lombok 的 <em>@Builder</em> 成为更好的选择。</strong></p><h2 id="_5-可变数据" tabindex="-1"><a class="header-anchor" href="#_5-可变数据"><span>5. 可变数据</span></a></h2><p>我们只能将 java 记录用于不可变数据。<strong>如果上下文需要一个可变的 java 对象，我们可以使用 Lombok 的 <em>@Data</em> 对象代替：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Data
@AllArgsConstructor
public class ColorData {
    private int red;
    private int green;
    private int blue;
    public String getHexString() {
        return String.format(&quot;#%02X%02X%02X&quot;, red, green, blue);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一些框架可能需要具有 setter 或默认构造函数的对象。例如，Hibernate 就属于这一类。在创建 <em>@Entity</em> 时，我们将不得不使用 Lombok 的注解或纯 Java。</p><h2 id="_6-继承" tabindex="-1"><a class="header-anchor" href="#_6-继承"><span>6. 继承</span></a></h2><p><strong>Java 记录不支持继承。</strong> 因此，它们不能被扩展或继承其他类。另一方面，Lombok 的 <em>@Value</em> 对象可以扩展其他类，但它们是 final 的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Value
public class MonochromeColor extends ColorData {
    public MonochromeColor(int grayScale) {
        super(grayScale, grayScale, grayScale);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，<em>@Data</em> 对象既可以扩展其他类，也可以被扩展。<strong>总之，如果我们需要继承，我们应该坚持使用 Lombok 的解决方案。</strong></p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们看到了 Lombok 和 java 记录是不同的工具，服务于不同的目的。此外，我们发现 Lombok 更加灵活，并且可以用于记录受限的场景。</p><p>如往常一样，源代码可在 GitHub 上获取。</p>`,39),r=[l];function d(s,o){return a(),n("div",null,r)}const c=e(t,[["render",d],["__file","2024-07-17-Java 14 Record vs. Lombok.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Java%2014%20Record%20vs.%20Lombok.html","title":"Java 14 记录与 Lombok 比较","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java 14","Lombok"],"head":[["meta",{"name":"keywords","content":"Java, Java 14, Record, Lombok, Immutable, Data, Builder, Inheritance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Java%2014%20Record%20vs.%20Lombok.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 14 记录与 Lombok 比较"}],["meta",{"property":"og:description","content":"Java 14 记录与 Lombok 比较 Java 的记录关键字是在 Java 14 中引入的一项新的语义特性。记录对于创建小型不可变对象非常有用。另一方面，Lombok 是一个 Java 库，可以自动生成一些已知模式作为 Java 字节码。尽管它们都可以用来减少样板代码，但它们是不同的工具。因此，我们应该根据给定上下文的需求选择更适合的那一个。 在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T08:08:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 14"}],["meta",{"property":"article:tag","content":"Lombok"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T08:08:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 14 记录与 Lombok 比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T08:08:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 14 记录与 Lombok 比较 Java 的记录关键字是在 Java 14 中引入的一项新的语义特性。记录对于创建小型不可变对象非常有用。另一方面，Lombok 是一个 Java 库，可以自动生成一些已知模式作为 Java 字节码。尽管它们都可以用来减少样板代码，但它们是不同的工具。因此，我们应该根据给定上下文的需求选择更适合的那一个。 在..."},"headers":[{"level":2,"title":"2. 小型不可变对象","slug":"_2-小型不可变对象","link":"#_2-小型不可变对象","children":[]},{"level":2,"title":"3. 透明数据载体","slug":"_3-透明数据载体","link":"#_3-透明数据载体","children":[]},{"level":2,"title":"4. 具有许多字段的类","slug":"_4-具有许多字段的类","link":"#_4-具有许多字段的类","children":[]},{"level":2,"title":"5. 可变数据","slug":"_5-可变数据","link":"#_5-可变数据","children":[]},{"level":2,"title":"6. 继承","slug":"_6-继承","link":"#_6-继承","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721203736000,"updatedTime":1721203736000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.13,"words":1240},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Java 14 Record vs. Lombok.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java 的记录关键字是在 Java 14 中引入的一项新的语义特性。记录对于创建小型不可变对象非常有用。另一方面，Lombok 是一个 Java 库，可以自动生成一些已知模式作为 Java 字节码。尽管它们都可以用来减少样板代码，但它们是不同的工具。因此，我们应该根据给定上下文的需求选择更适合的那一个。</p>\\n<p>在本文中，我们将探索各种用例，包括 Java 记录的一些限。对于每个示例，我们将看看 Lombok 如何派上用场，并比较这两种解决方案。</p>\\n<h2>2. 小型不可变对象</h2>\\n<p>对于我们的第一个示例，我们将使用 <em>Color</em> 对象。一个 <em>Color</em> 由三个整数值组成，分别代表红色、绿色和蓝色通道。此外，颜色将暴露其十六进制表示。例如，具有 <em>RGB(255,0,0)</em> 的颜色将具有十六进制表示 <em>#FF0000</em>。此外，我们希望两个颜色如果具有相同的 RGB 值则视为 <em>相等</em>。</p>","autoDesc":true}');export{c as comp,u as data};
