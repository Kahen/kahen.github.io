import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as r}from"./app-C2EXT5sr.js";const i={},a=r(`<h1 id="springrunner与springboottest-baeldung" tabindex="-1"><a class="header-anchor" href="#springrunner与springboottest-baeldung"><span>SpringRunner与SpringBootTest | Baeldung</span></a></h1><p>测试对于任何应用程序都至关重要，无论是单元测试还是集成测试。SpringRunner和SpringBootTest类构成了运行集成测试的基础。</p><p>在本教程中，我们将学习这两个类。我们将学习如何在代码中使用它们，并了解它们的相似之处和不同之处。</p><p>SpringRunner是SpringJUnit4ClassRunner类的别名，适用于基于JUnit4的测试类。它通过Spring TestContext加载，通过该上下文，Spring的bean和配置可以在JUnit注解的配合下使用。我们至少需要JUnit 4.12才能使用它。</p><p>在代码中使用时，需要在测试类上注解@RunWith(SpringRunner.class)：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RunWith(SpringRunner.class)
public class SampleIntegrationTest {
    
    @Test
    public void test() {
        // 
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringBootTest是SpringRunner的替代品，适用于JUnit5。它也用于运行集成测试并加载Spring TestContext。</p><p>它非常丰富，并通过其注解参数提供许多配置。它支持各种Web环境模式，如MOCK、RANDOM_PORT、DEFINED_PORT和NONE。我们可以通过其注解传递应用程序属性，这些属性在测试运行之前注入到Spring环境中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@SpringBootTest(
  properties = {&quot;user.name=test_user&quot;},
  webEnvironment = MOCK)
public class SampleIntegrationTest {
    
    @Test
    public void test() {
        // 
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要在类级别上使用@SpringBootTest注解来运行集成测试。</p><p>在下表中，我们将比较这两个类及其优缺点。</p><table><thead><tr><th>SpringRunner</th><th>SpringBootTest</th></tr></thead><tbody><tr><td>用于运行集成测试并加载Spring TestContext</td><td>用于运行集成测试并加载Spring TestContext</td></tr><tr><td>也可以使用JUnit注解</td><td>也可以使用JUnit注解</td></tr><tr><td>需要JUnit4.12或更高版本</td><td>需要JUnit5或更高版本</td></tr><tr><td>配置API不丰富</td><td>提供丰富的API来配置测试配置</td></tr><tr><td>不推荐使用</td><td>推荐使用，因为它支持新特性且易于使用</td></tr></tbody></table><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们学习了SpringRunner和SpringBootTest。我们学习了如何使用它们。我们还比较了它们，并了解了它们的差异和相似之处。</p><p>我们应该<strong>使用SpringBootTest，因为它支持最新的JUnit，但当有要求使用JUnit 4时，SpringRunner是选择</strong>。翻译已经结束，以下是剩余部分的翻译：</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/73605f2d9b407975571233c9b04a1a49?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,17),s=[a];function o(p,g){return e(),n("div",null,s)}const c=t(i,[["render",o],["__file","2024-06-29-SpringRunner vs. SpringBootTest.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-SpringRunner%20vs.%20SpringBootTest.html","title":"SpringRunner与SpringBootTest | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-29T00:00:00.000Z","category":["Spring","Testing"],"tag":["SpringRunner","SpringBootTest"],"head":[["meta",{"name":"keywords","content":"SpringRunner, SpringBootTest, JUnit, Spring, Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-SpringRunner%20vs.%20SpringBootTest.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"SpringRunner与SpringBootTest | Baeldung"}],["meta",{"property":"og:description","content":"SpringRunner与SpringBootTest | Baeldung 测试对于任何应用程序都至关重要，无论是单元测试还是集成测试。SpringRunner和SpringBootTest类构成了运行集成测试的基础。 在本教程中，我们将学习这两个类。我们将学习如何在代码中使用它们，并了解它们的相似之处和不同之处。 SpringRunner是Spri..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T13:29:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SpringRunner"}],["meta",{"property":"article:tag","content":"SpringBootTest"}],["meta",{"property":"article:published_time","content":"2024-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T13:29:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringRunner与SpringBootTest | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/73605f2d9b407975571233c9b04a1a49?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2024-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T13:29:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"SpringRunner与SpringBootTest | Baeldung 测试对于任何应用程序都至关重要，无论是单元测试还是集成测试。SpringRunner和SpringBootTest类构成了运行集成测试的基础。 在本教程中，我们将学习这两个类。我们将学习如何在代码中使用它们，并了解它们的相似之处和不同之处。 SpringRunner是Spri..."},"headers":[{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719667758000,"updatedTime":1719667758000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.95,"words":584},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-SpringRunner vs. SpringBootTest.md","localizedDate":"2024年6月29日","excerpt":"\\n<p>测试对于任何应用程序都至关重要，无论是单元测试还是集成测试。SpringRunner和SpringBootTest类构成了运行集成测试的基础。</p>\\n<p>在本教程中，我们将学习这两个类。我们将学习如何在代码中使用它们，并了解它们的相似之处和不同之处。</p>\\n<p>SpringRunner是SpringJUnit4ClassRunner类的别名，适用于基于JUnit4的测试类。它通过Spring TestContext加载，通过该上下文，Spring的bean和配置可以在JUnit注解的配合下使用。我们至少需要JUnit 4.12才能使用它。</p>\\n<p>在代码中使用时，需要在测试类上注解@RunWith(SpringRunner.class)：</p>","autoDesc":true}');export{c as comp,u as data};
