import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as i}from"./app-on0L14Tx.js";const n={},r=i(`<h1 id="spring-boot-3-和-spring-framework-6-0-新特性概览" tabindex="-1"><a class="header-anchor" href="#spring-boot-3-和-spring-framework-6-0-新特性概览"><span>Spring Boot 3 和 Spring Framework 6.0 - 新特性概览</span></a></h1><p>随着 Spring Boot 3 的发布时间临近，现在正是检查新特性的好时机。</p><h2 id="java-14-记录关键字" tabindex="-1"><a class="header-anchor" href="#java-14-记录关键字"><span>Java 14 记录关键字</span></a></h2><p>探索记录的基础，包括它们的目的、生成的方法和自定义技术。</p><h2 id="java-17" tabindex="-1"><a class="header-anchor" href="#java-17"><span>Java 17</span></a></h2><p>虽然之前已经支持 Java 17，但这个长期支持版本现在成为了基线。</p><p>当从长期支持版本 11 迁移时，Java 开发者将从新的语言特性中受益。由于 Java 本身不是本文的主题，我们只列出对 Spring Boot 开发者最重要的新特性。我们可以在 Java 17、16、15、14、13 和 12 的单独文章中找到更多细节。</p><h3 id="_2-1-记录" tabindex="-1"><a class="header-anchor" href="#_2-1-记录"><span>2.1. 记录</span></a></h3><p>Java 记录（JEP 395，见 Java 14 记录关键字）旨在作为快速创建数据载体类的便捷方式，即那些目标仅仅是包含数据并在模块之间传递的类，也称为 POJO（纯旧 Java 对象）和 DTO（数据传输对象）。</p><p>我们可以轻松创建不可变的 DTO：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public record Person (String name, String address) {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目前，我们需要小心地将它们与 Bean 验证结合使用，因为验证约束不支持构造函数参数，例如当实例在 JSON 反序列化（Jackson）时创建并作为参数放入控制器的方法中。</p><h3 id="_2-2-文本块" tabindex="-1"><a class="header-anchor" href="#_2-2-文本块"><span>2.2. 文本块</span></a></h3><p>通过 JEP 378，现在可以创建多行文本块，而无需在行中断处连接字符串：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String textBlock = &quot;&quot;&quot;
Hello, this is a
multi-line
text block.
&quot;&quot;&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-switch-表达式" tabindex="-1"><a class="header-anchor" href="#_2-3-switch-表达式"><span>2.3. Switch 表达式</span></a></h3><p>Java 12 引入了 switch 表达式（JEP 361），它们（像所有表达式一样）评估单个值，并且可以在语句中使用。而不是组合嵌套的 <em>if</em>– <em>else</em>-运算符（?:），我们现在可以使用 <em>switch</em>– <em>case</em>-结构：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>DayOfWeek day = DayOfWeek.FRIDAY;
int numOfLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -&gt; 6;
    case TUESDAY                -&gt; 7;
    case THURSDAY, SATURDAY     -&gt; 8;
    case WEDNESDAY              -&gt; 9;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-模式匹配" tabindex="-1"><a class="header-anchor" href="#_2-4-模式匹配"><span>2.4. 模式匹配</span></a></h3><p>模式匹配在 Project Amber 中得到了阐述，并找到了进入 Java 语言的路径。在 Java 语言中，它们可以帮助简化 <em>instanceof</em> 评估的代码。</p><p>我们可以直接使用它们与 <em>instanceof</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>if (obj instanceof String s) {
    System.out.println(s.toLowerCase());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以在 <em>switch</em>– <em>case</em> 语句中使用它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static double getDoubleUsingSwitch(Object o) {
    return switch (o) {
        case Integer i -&gt; i.doubleValue();
        case Float f -&gt; f.doubleValue();
        case String s -&gt; Double.parseDouble(s);
        default -&gt; 0d;
    };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-密封类和接口" tabindex="-1"><a class="header-anchor" href="#_2-5-密封类和接口"><span>2.5. 密封类和接口</span></a></h3><p>密封类可以通过指定允许的子类来限制继承：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public abstract sealed class Pet permits Dog, Cat {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以在 Java 中的密封类和接口中找到更多细节。</p><h2 id="jakarta-ee-9" tabindex="-1"><a class="header-anchor" href="#jakarta-ee-9"><span>Jakarta EE 9</span></a></h2><p>最重要的变化可能是从 Java EE 到 Jakarta EE9 的跳跃，其中包命名空间从 <em>javax.</em><em>_ 变为 <em>jakarta.</em></em>_。因此，每当我们直接使用 Java EE 中的类时，都需要调整我们代码中的所有导入。</p><p>例如，当我们在 Spring MVC 控制器中访问 <em>HttpServletRequest</em> 对象时，我们需要将：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>import javax.servlet.http.HttpServletRequest;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>替换为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>import jakarta.servlet.http.HttpServletRequest;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然，我们并不经常需要使用 Servlet API 的类型，但如果我们使用 Bean 验证和 JPA，这是不可避免的。</p><p>我们还应该意识到这一点，当我们使用依赖于 Java/Jakarta EE 的外部库时（例如，我们必须使用 Hibernate Validator 7+，Tomcat 10+ 和 Jetty 11+）。</p><h2 id="进一步依赖" tabindex="-1"><a class="header-anchor" href="#进一步依赖"><span>进一步依赖</span></a></h2><p>Spring Framework 6 和 Spring Boot 3 需要以下最低版本：</p><ul><li>Kotlin 1.7+</li><li>Lombok 1.18.22+（JDK17 支持）</li><li>Gradle 7.3+</li></ul><h2 id="大点" tabindex="-1"><a class="header-anchor" href="#大点"><span>大点</span></a></h2><p>两个总体主题受到了特别关注：_本地可执行文件_和 <em>可观察性</em>。总体意味着：</p><ul><li>Spring Framework 引入了核心抽象</li><li>组合项目一致地与它们集成</li><li>Spring Boot 提供了自动配置</li></ul><h3 id="_5-1-本地可执行文件" tabindex="-1"><a class="header-anchor" href="#_5-1-本地可执行文件"><span>5.1. 本地可执行文件</span></a></h3><p>构建本地可执行文件并将其部署到 GraalVM 获得了更高的优先级。因此，Spring Native 倡议正在进入 Spring 本身。</p><p>对于 AOT 生成，我们不需要包括单独的插件，我们只需要使用 <em>spring-boot-maven-plugin</em> 的一个新目标：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn spring-boot:aot-generate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>本地提示也将是 Spring 核心的一部分。这方面的测试基础设施将在 Milestone 5（v6.0.0-M5）中可用。</p><h3 id="_5-2-可观察性" tabindex="-1"><a class="header-anchor" href="#_5-2-可观察性"><span>5.2. 可观察性</span></a></h3><p>Spring 6 引入了 Spring 可观察性 - 一个新倡议，它建立在 Micrometer 和 Micrometer 跟踪（以前是 Spring Cloud Sleuth）之上。目标是使用 Micrometer 高效记录应用程序指标，并通过提供程序（如 OpenZipkin 或 OpenTelemetry）实现跟踪。</p><p>Spring Boot 3 中所有这些都有自动配置，Spring 项目正在使用新的观察 API 自我仪器化。</p><p>我们可以在专门的文章中找到更多关于它的细节。</p><h2 id="较小的-spring-web-mvc-变化" tabindex="-1"><a class="header-anchor" href="#较小的-spring-web-mvc-变化"><span>较小的 Spring Web MVC 变化</span></a></h2><p>最重要的新特性之一是支持 RFC7807（问题详细信息标准）。现在我们不需要包括单独的库，如 Zalando Problem。</p><p>另一个较小的变化是 HttpMethod 不再是一个枚举，而是一个允许我们为扩展的 HTTP 方法创建实例的类，例如由 WebDAV 定义的那些：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HttpMethod lock = HttpMethod.valueOf(&quot;LOCK&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>至少一些过时的基于 servlet 的集成被丢弃了，如 Commons FileUpload（我们应该使用 <em>StandardServletMultipartResolver</em> 进行多部分文件上传），Tiles 和 FreeMarker JSP 支持（我们应该使用 FreeMarker 模板视图）。</p><h2 id="迁移项目" tabindex="-1"><a class="header-anchor" href="#迁移项目"><span>迁移项目</span></a></h2><p>有一些项目迁移的提示我们应该知道。推荐步骤是：</p><ol><li>迁移到 Spring Boot 2.7（当 Spring Boot 3 发布时，将基于 Spring Boot 2.7 提供迁移指南）</li><li>检查弃用代码的使用和旧版配置文件处理；它将在新的主要版本中被移除</li><li>迁移到 Java 17</li><li>检查第三方项目是否有与 Jakarta EE 9 兼容的版本</li><li>由于 Spring Boot 3 尚未发布，我们可以尝试当前的里程碑来测试迁移</li></ol><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>正如我们所了解到的，迁移到 Spring Boot 3 和 Spring 6 也将是迁移到 Java 17 和 Jakarta EE 9。如果我们非常重视可观察性和本地可执行文件，我们将从即将发布的主要版本中受益最多。</p><p>像往常一样，所有的代码都可以在 GitHub 上找到。</p>`,62),l=[r];function s(d,p){return t(),a("div",null,l)}const v=e(n,[["render",s],["__file","2024-07-16-Spring Boot 3 and Spring Framework 6.0   What s New.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Spring%20Boot%203%20and%20Spring%20Framework%206.0%20%20%20What%20s%20New.html","title":"Spring Boot 3 和 Spring Framework 6.0 - 新特性概览","lang":"zh-CN","frontmatter":{"date":"2024-07-17T00:00:00.000Z","category":["Spring Boot 3","Spring Framework 6.0"],"tag":["Java 14","Java 17","Jakarta EE 9"],"head":[["meta",{"name":"keywords","content":"Spring Boot 3, Spring Framework 6.0, Java 14, Java 17, Jakarta EE 9, 新特性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Spring%20Boot%203%20and%20Spring%20Framework%206.0%20%20%20What%20s%20New.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot 3 和 Spring Framework 6.0 - 新特性概览"}],["meta",{"property":"og:description","content":"Spring Boot 3 和 Spring Framework 6.0 - 新特性概览 随着 Spring Boot 3 的发布时间临近，现在正是检查新特性的好时机。 Java 14 记录关键字 探索记录的基础，包括它们的目的、生成的方法和自定义技术。 Java 17 虽然之前已经支持 Java 17，但这个长期支持版本现在成为了基线。 当从长期支持..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T16:28:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 14"}],["meta",{"property":"article:tag","content":"Java 17"}],["meta",{"property":"article:tag","content":"Jakarta EE 9"}],["meta",{"property":"article:published_time","content":"2024-07-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T16:28:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 3 和 Spring Framework 6.0 - 新特性概览\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T16:28:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot 3 和 Spring Framework 6.0 - 新特性概览 随着 Spring Boot 3 的发布时间临近，现在正是检查新特性的好时机。 Java 14 记录关键字 探索记录的基础，包括它们的目的、生成的方法和自定义技术。 Java 17 虽然之前已经支持 Java 17，但这个长期支持版本现在成为了基线。 当从长期支持..."},"headers":[{"level":2,"title":"Java 14 记录关键字","slug":"java-14-记录关键字","link":"#java-14-记录关键字","children":[]},{"level":2,"title":"Java 17","slug":"java-17","link":"#java-17","children":[{"level":3,"title":"2.1. 记录","slug":"_2-1-记录","link":"#_2-1-记录","children":[]},{"level":3,"title":"2.2. 文本块","slug":"_2-2-文本块","link":"#_2-2-文本块","children":[]},{"level":3,"title":"2.3. Switch 表达式","slug":"_2-3-switch-表达式","link":"#_2-3-switch-表达式","children":[]},{"level":3,"title":"2.4. 模式匹配","slug":"_2-4-模式匹配","link":"#_2-4-模式匹配","children":[]},{"level":3,"title":"2.5. 密封类和接口","slug":"_2-5-密封类和接口","link":"#_2-5-密封类和接口","children":[]}]},{"level":2,"title":"Jakarta EE 9","slug":"jakarta-ee-9","link":"#jakarta-ee-9","children":[]},{"level":2,"title":"进一步依赖","slug":"进一步依赖","link":"#进一步依赖","children":[]},{"level":2,"title":"大点","slug":"大点","link":"#大点","children":[{"level":3,"title":"5.1. 本地可执行文件","slug":"_5-1-本地可执行文件","link":"#_5-1-本地可执行文件","children":[]},{"level":3,"title":"5.2. 可观察性","slug":"_5-2-可观察性","link":"#_5-2-可观察性","children":[]}]},{"level":2,"title":"较小的 Spring Web MVC 变化","slug":"较小的-spring-web-mvc-变化","link":"#较小的-spring-web-mvc-变化","children":[]},{"level":2,"title":"迁移项目","slug":"迁移项目","link":"#迁移项目","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1721147293000,"updatedTime":1721147293000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.15,"words":1546},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Spring Boot 3 and Spring Framework 6.0   What s New.md","localizedDate":"2024年7月17日","excerpt":"\\n<p>随着 Spring Boot 3 的发布时间临近，现在正是检查新特性的好时机。</p>\\n<h2>Java 14 记录关键字</h2>\\n<p>探索记录的基础，包括它们的目的、生成的方法和自定义技术。</p>\\n<h2>Java 17</h2>\\n<p>虽然之前已经支持 Java 17，但这个长期支持版本现在成为了基线。</p>\\n<p>当从长期支持版本 11 迁移时，Java 开发者将从新的语言特性中受益。由于 Java 本身不是本文的主题，我们只列出对 Spring Boot 开发者最重要的新特性。我们可以在 Java 17、16、15、14、13 和 12 的单独文章中找到更多细节。</p>","autoDesc":true}');export{v as comp,m as data};
