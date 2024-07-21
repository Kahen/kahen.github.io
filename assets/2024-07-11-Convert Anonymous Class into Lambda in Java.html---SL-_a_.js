import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as i}from"./app-BmW7VO0v.js";const t={},d=i(`<h1 id="java中将匿名类转换为lambda表达式" tabindex="-1"><a class="header-anchor" href="#java中将匿名类转换为lambda表达式"><span>Java中将匿名类转换为Lambda表达式</span></a></h1><p>在本教程中，我们将学习<strong>如何在Java中将匿名类转换为Lambda表达式</strong>。</p><p>首先，我们将简要介绍匿名类是什么。然后，我们将使用实际示例来解答我们的中心问题。</p><h3 id="_2-java中的匿名类" tabindex="-1"><a class="header-anchor" href="#_2-java中的匿名类"><span>2. Java中的匿名类</span></a></h3><p>简而言之，匿名类正如其名，是一个没有名称的内部类。由于它没有名称，<strong>我们需要在一个单独的表达式中同时声明和实例化它</strong>。</p><p>按设计，匿名类扩展了一个类或实现了一个接口。</p><p>例如，我们可以使用_Runnable_作为一个匿名类来在Java中创建一个新线程。语法类似于构造函数的调用，只是我们需要将类定义放在一个块内：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        ...
    }
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们知道了匿名类是什么，让我们看看如何使用Lambda表达式重写它。</p><h3 id="_3-将匿名类作为lambda表达式" tabindex="-1"><a class="header-anchor" href="#_3-将匿名类作为lambda表达式"><span>3. 将匿名类作为Lambda表达式</span></a></h3><p>Lambda表达式提供了一种方便的捷径，可以更简洁、更直接地定义匿名类。</p><p><strong>然而，这只在匿名类只有一个单一方法时才可能</strong>。那么，让我们一步一步地看看如何将匿名类转换为Lambda表达式。</p><h4 id="_3-1-定义匿名类" tabindex="-1"><a class="header-anchor" href="#_3-1-定义匿名类"><span>3.1. 定义匿名类</span></a></h4><p>例如，考虑_Sender_接口：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface Sender {
    String send(String message);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，接口只有一个声明的方法。这种类型的接口称为函数式接口。</p><p>接下来，让我们创建_SenderService_接口：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface SenderService {
    String callSender(Sender sender);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于_callSender()_方法接受一个_Sender_对象作为参数，我们可以将其作为匿名类传递。</p><p>现在，我们将创建两个_SenderService_接口的实现。</p><p>首先，让我们创建_EmailSenderService_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class EmailSenderService implements SenderService {

    @Override
    public String callSender(Sender sender) {
        return sender.send(&quot;Email Notification&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建_SmsSenderService_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class SmsSenderService implements SenderService {

    @Override
    public String callSender(Sender sender) {
        return sender.send(&quot;SMS Notification&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经把各个部分组合在一起，让我们创建一个测试用例，将_Sender_对象作为匿名类传递：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void whenPassingAnonymousClass_thenSuccess() {
    SenderService emailSenderService = new EmailSenderService();

    String emailNotif = emailSenderService.callSender(new Sender() {
        @Override
        public String send(String message) {
            return message;
        }
    });

    assertEquals(emailNotif, &quot;Email Notification&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，我们以匿名类的形式传递了_Sender_对象，并覆盖了_send()_方法。</p><h4 id="_3-2-转换匿名类" tabindex="-1"><a class="header-anchor" href="#_3-2-转换匿名类"><span>3.2. 转换匿名类</span></a></h4><p>现在，让我们尝试使用Lambda表达式以更简洁的方式重写前面的测试用例。</p><p><strong>由于_send()_是唯一定义的方法，编译器知道要调用哪个方法，因此不需要显式覆盖它</strong>。</p><p>要转换匿名类，<strong>我们需要省略_new_关键字和方法名</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void whenPassingLambdaExpression_thenSuccess() {
    SenderService smsSenderService = new SmsSenderService();

    String smsNotif = smsSenderService.callSender((String message) -&gt; {
        return message;
    });

    assertEquals(smsNotif, &quot;SMS Notification&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，<strong>我们用箭头替换了匿名类，在_send()_参数和其体之间</strong>。</p><p>我们甚至可以进一步增强这一点：<strong>我们可以通过删除参数类型和_return_语句，将Lambda语句更改为Lambda表达式</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String smsNotif = smsSenderService.callSender(message -&gt; message);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如我们所见，我们不必指定参数类型，因为编译器可以隐式推断它。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何在Java中用Lambda表达式替换匿名类。</p><p>在此过程中，我们解释了匿名类是什么以及如何将其转换为Lambda表达式。</p><p>正如往常一样，本文中使用的代码可以在GitHub上找到。</p>`,40),s=[d];function r(l,c){return n(),a("div",null,s)}const o=e(t,[["render",r],["__file","2024-07-11-Convert Anonymous Class into Lambda in Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Convert%20Anonymous%20Class%20into%20Lambda%20in%20Java.html","title":"Java中将匿名类转换为Lambda表达式","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Lambda表达式"],"tag":["匿名类","转换"],"head":[["meta",{"name":"keywords","content":"Java匿名类转换为Lambda表达式教程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Convert%20Anonymous%20Class%20into%20Lambda%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将匿名类转换为Lambda表达式"}],["meta",{"property":"og:description","content":"Java中将匿名类转换为Lambda表达式 在本教程中，我们将学习如何在Java中将匿名类转换为Lambda表达式。 首先，我们将简要介绍匿名类是什么。然后，我们将使用实际示例来解答我们的中心问题。 2. Java中的匿名类 简而言之，匿名类正如其名，是一个没有名称的内部类。由于它没有名称，我们需要在一个单独的表达式中同时声明和实例化它。 按设计，匿名..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T12:59:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"匿名类"}],["meta",{"property":"article:tag","content":"转换"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T12:59:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将匿名类转换为Lambda表达式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T12:59:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将匿名类转换为Lambda表达式 在本教程中，我们将学习如何在Java中将匿名类转换为Lambda表达式。 首先，我们将简要介绍匿名类是什么。然后，我们将使用实际示例来解答我们的中心问题。 2. Java中的匿名类 简而言之，匿名类正如其名，是一个没有名称的内部类。由于它没有名称，我们需要在一个单独的表达式中同时声明和实例化它。 按设计，匿名..."},"headers":[{"level":3,"title":"2. Java中的匿名类","slug":"_2-java中的匿名类","link":"#_2-java中的匿名类","children":[]},{"level":3,"title":"3. 将匿名类作为Lambda表达式","slug":"_3-将匿名类作为lambda表达式","link":"#_3-将匿名类作为lambda表达式","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720702783000,"updatedTime":1720702783000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.02,"words":906},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Convert Anonymous Class into Lambda in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习<strong>如何在Java中将匿名类转换为Lambda表达式</strong>。</p>\\n<p>首先，我们将简要介绍匿名类是什么。然后，我们将使用实际示例来解答我们的中心问题。</p>\\n<h3>2. Java中的匿名类</h3>\\n<p>简而言之，匿名类正如其名，是一个没有名称的内部类。由于它没有名称，<strong>我们需要在一个单独的表达式中同时声明和实例化它</strong>。</p>\\n<p>按设计，匿名类扩展了一个类或实现了一个接口。</p>\\n<p>例如，我们可以使用_Runnable_作为一个匿名类来在Java中创建一个新线程。语法类似于构造函数的调用，只是我们需要将类定义放在一个块内：</p>","autoDesc":true}');export{o as comp,p as data};
