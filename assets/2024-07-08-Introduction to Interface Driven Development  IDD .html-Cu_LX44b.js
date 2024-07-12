import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-CNQ479je.js";const i={},s=a(`<h1 id="接口驱动开发-idd-介绍" tabindex="-1"><a class="header-anchor" href="#接口驱动开发-idd-介绍"><span>接口驱动开发（IDD）介绍</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span><strong>1. 概述</strong></span></a></h2><p>在本教程中，我们将讨论接口驱动开发（Interface Driven Development, IDD），它为编码提供了结构。我们将引导您使用IDD并解释其优势。</p><h2 id="_2-理念" tabindex="-1"><a class="header-anchor" href="#_2-理念"><span><strong>2. 理念</strong></span></a></h2><p>接口驱动开发是一种开发方法，侧重于系统不同组件之间的接口设计。相应的接口定义了可用的方法。因此，我们提供了有关可用功能、预期参数和返回值的信息。</p><h3 id="_2-1-优势" tabindex="-1"><a class="header-anchor" href="#_2-1-优势"><span><strong>2.1. 优势</strong></span></a></h3><p>由于IDD在开始时就定义了接口，拥有多名员工的项目可以同时开始使用它并开发其实现。这<strong>加速了开发，因为他们可以在实现准备就绪之前编写代码</strong>。</p><p>此外，<strong>各个模块之间的耦合变得更加松散，从而形成了一个更灵活、更健壮的系统</strong>。然后，单个接口可以有一个或多个实现。其他模块可以直接实例化这些接口，或者使用注解进行注入。如果在使用Spring Boot时有多种可能的实现，<em>@Qualifier</em> 注解有助于选择正确的实现。</p><p>例如，可能有一个接口定义了以下方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HelpRequest getHelpRequestById(Long id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>两个服务可以实现这个接口，一个访问缓存，另一个访问数据库以返回所需的对象。使用接口的类对实现漠不关心，可以根据要求灵活地交换它们。<strong>这导致了更好的可维护性，因为使用接口的类不需要担心实现细节</strong>，只要接口中定义的契约得到遵守即可。</p><p>这种方法与测试驱动开发有些相似，首先定义测试，然后进行匹配的实现，直到测试成功运行。IDD方法也在测试中提供了显著的好处。</p><p><strong>接口使得轻松模拟各个方法成为可能</strong>，而无需通过模拟框架来模拟类。这允许系统的每个组件独立进行测试。自Java 15以来，还可以使用封闭接口来<strong>指定允许实现接口的类。这提供了额外的保护</strong>。</p><h2 id="_3-示例" tabindex="-1"><a class="header-anchor" href="#_3-示例"><span><strong>3. 示例</strong></span></a></h2><p>下面，我们通过一个具体的例子来看如何使用IDD进行操作。例如，让我们以一个名为‘Machbarschaft’的应用程序为例，它帮助邻居相互联系并提出帮助请求，例如帮助购物或家务。</p><p>在IDD的背景下，应用程序的开发将按照以下步骤进行。</p><h3 id="_3-1-识别接口" tabindex="-1"><a class="header-anchor" href="#_3-1-识别接口"><span>3.1. 识别接口</span></a></h3><p>我们首先识别不同的应用程序模块，如通知、帮助请求或用户管理。在本文中，我们将专注于帮助请求。</p><h3 id="_3-2-确定用例" tabindex="-1"><a class="header-anchor" href="#_3-2-确定用例"><span>3.2. 确定用例</span></a></h3><p>现在我们寻找所有模块的可能用例。例如，对于帮助请求模块，可能是创建帮助请求、完成或编辑帮助请求以及检索所有具有某种状态的帮助请求。</p><h3 id="_3-3-定义接口" tabindex="-1"><a class="header-anchor" href="#_3-3-定义接口"><span>3.3. 定义接口</span></a></h3><p>考虑到这些用例，《HelpRequestService》的接口可能看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface HelpRequestService {
    HelpRequestDTO createHelpRequest(CreateHelpRequestDTO createHelpRequestDTO);

    List\`\`\`&lt;HelpRequestDTO&gt;\`\`\` findAllByStatus(HelpRequestStatus status);

    HelpRequestDTO updateHelpRequest(UpdateHelpRequestDTO updateHelpRequestDTO);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>createHelpRequest</em> 方法接受一个 <em>CreateHelpRequestDTO</em>，其中包含有关创建帮助请求的信息，并返回映射到 <em>HelpRequestDTO</em> 的创建的帮助请求。</p><p><em>findAllByStatus</em> 方法只接受 <em>HelpRequestStatus</em>，例如，<em>OPEN</em> 只返回符合标准的 <em>List</em> 的所有 <em>HelpRequestDTO</em>。这允许开发者只选择应该由用户完成的帮助请求或显示当前正在处理的所有帮助请求。</p><p>最后一个方法是用于更新帮助请求。这里，方法传递更新的信息，然后返回映射到 <em>HelpRequestDTO</em> 的更新的帮助请求。</p><h3 id="_3-4-模块的独立开发" tabindex="-1"><a class="header-anchor" href="#_3-4-模块的独立开发"><span>3.4. 模块的独立开发</span></a></h3><p>开发者可以默认独立开发模块。这里每个模块将依赖于其他模块的接口来执行其功能。实现可能如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class HelpRequestServiceImpl implements HelpRequestService {

    @Override
    public HelpRequestDTO createHelpRequest(CreateHelpRequestDTO createHelpRequestDTO) {
        // 这里是实现
        return new HelpRequestDTO();
    }

    @Override
    public List\`\`\`&lt;HelpRequestDTO&gt;\`\`\` findAllByStatus(HelpRequestStatus status) {
        // 这里是实现
        return List.of(new HelpRequestDTO());
    }

    @Override
    public HelpRequestDTO updateHelpRequest(UpdateHelpRequestDTO updateHelpRequestDTO) {
        // 这里是实现
        return new HelpRequestDTO();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可能有 <em>HelpRequestServiceImpl</em> 的异步版本，或者如前所述，一个版本使用缓存，另一个版本使用数据库访问。</p><h3 id="_3-5-实现的测试" tabindex="-1"><a class="header-anchor" href="#_3-5-实现的测试"><span>3.5. 实现的测试</span></a></h3><p>现在接口已经成功实现，我们可以进行广泛的测试以确保代码按预期工作。以 <em>findAllByStatus</em> 方法为例，我们可以检查该方法是否只包含具有正确状态的对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenHelpRequestList_whenFindAllByStatus_shouldContainOnlyStatus(){
    HelpRequestService helpRequestService = new HelpRequestServiceImpl();
    List\`\`\`&lt;HelpRequestDTO&gt;\`\`\` allByStatusOpen = helpRequestService.findAllByStatus(HelpRequestStatus.OPEN);
    Assertions.assertThat(allByStatusOpen).extracting(HelpRequestDTO::getStatus)
      .containsOnly(HelpRequestStatus.OPEN);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-模块的集成" tabindex="-1"><a class="header-anchor" href="#_3-6-模块的集成"><span>3.6. 模块的集成</span></a></h3><p>在开发和测试每个模块之后，团队通过通过它们定义的接口相互通信来集成它们。这将允许轻松集成和不同模块之间的低耦合：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HelpRequestService helpRequestService = new HelpRequestServiceImpl();
helpRequestService.findAllByStatus(HelpRequestStatus.OPEN);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过使用IDD，开发“Machbarschaft”应用程序变得更加容易和健壮。清晰定义的接口和模块的独立开发促进了测试和集成，而模块之间的低耦合则实现了快速和安全的维护和扩展。</p><p>总的来说，IDD有助于开发高质量和用户友好的应用程序，满足用户的需求。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span><strong>4. 结论</strong></span></a></h2><p>在本文中，我们讨论了IDD的优势，并展示了如何使用IDD的具体示例。总的来说，IDD可以帮助减少系统的复杂性，提高可维护性和可扩展性，并降低开发时间和成本。</p><p>像往常一样，示例代码可在GitHub上找到。</p><p><a href="kimi://action?name=cheer-on-kimi">给Kimi加油</a></p>`,42),l=[s];function r(d,p){return n(),t("div",null,l)}const o=e(i,[["render",r],["__file","2024-07-08-Introduction to Interface Driven Development  IDD .html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Introduction%20to%20Interface%20Driven%20Development%20%20IDD%20.html","title":"接口驱动开发（IDD）介绍","lang":"zh-CN","frontmatter":{"date":"2024-07-08T00:00:00.000Z","category":["Java","Software Engineering"],"tag":["Interface Driven Development","IDD","Design Patterns"],"head":[["meta",{"name":"keywords","content":"Java, IDD, Interface Driven Development, Software Design"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Introduction%20to%20Interface%20Driven%20Development%20%20IDD%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"接口驱动开发（IDD）介绍"}],["meta",{"property":"og:description","content":"接口驱动开发（IDD）介绍 1. 概述 在本教程中，我们将讨论接口驱动开发（Interface Driven Development, IDD），它为编码提供了结构。我们将引导您使用IDD并解释其优势。 2. 理念 接口驱动开发是一种开发方法，侧重于系统不同组件之间的接口设计。相应的接口定义了可用的方法。因此，我们提供了有关可用功能、预期参数和返回值的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T16:04:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Interface Driven Development"}],["meta",{"property":"article:tag","content":"IDD"}],["meta",{"property":"article:tag","content":"Design Patterns"}],["meta",{"property":"article:published_time","content":"2024-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T16:04:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"接口驱动开发（IDD）介绍\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T16:04:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"接口驱动开发（IDD）介绍 1. 概述 在本教程中，我们将讨论接口驱动开发（Interface Driven Development, IDD），它为编码提供了结构。我们将引导您使用IDD并解释其优势。 2. 理念 接口驱动开发是一种开发方法，侧重于系统不同组件之间的接口设计。相应的接口定义了可用的方法。因此，我们提供了有关可用功能、预期参数和返回值的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理念","slug":"_2-理念","link":"#_2-理念","children":[{"level":3,"title":"2.1. 优势","slug":"_2-1-优势","link":"#_2-1-优势","children":[]}]},{"level":2,"title":"3. 示例","slug":"_3-示例","link":"#_3-示例","children":[{"level":3,"title":"3.1. 识别接口","slug":"_3-1-识别接口","link":"#_3-1-识别接口","children":[]},{"level":3,"title":"3.2. 确定用例","slug":"_3-2-确定用例","link":"#_3-2-确定用例","children":[]},{"level":3,"title":"3.3. 定义接口","slug":"_3-3-定义接口","link":"#_3-3-定义接口","children":[]},{"level":3,"title":"3.4. 模块的独立开发","slug":"_3-4-模块的独立开发","link":"#_3-4-模块的独立开发","children":[]},{"level":3,"title":"3.5. 实现的测试","slug":"_3-5-实现的测试","link":"#_3-5-实现的测试","children":[]},{"level":3,"title":"3.6. 模块的集成","slug":"_3-6-模块的集成","link":"#_3-6-模块的集成","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720454676000,"updatedTime":1720454676000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.8,"words":1441},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Introduction to Interface Driven Development  IDD .md","localizedDate":"2024年7月8日","excerpt":"\\n<h2><strong>1. 概述</strong></h2>\\n<p>在本教程中，我们将讨论接口驱动开发（Interface Driven Development, IDD），它为编码提供了结构。我们将引导您使用IDD并解释其优势。</p>\\n<h2><strong>2. 理念</strong></h2>\\n<p>接口驱动开发是一种开发方法，侧重于系统不同组件之间的接口设计。相应的接口定义了可用的方法。因此，我们提供了有关可用功能、预期参数和返回值的信息。</p>\\n<h3><strong>2.1. 优势</strong></h3>\\n<p>由于IDD在开始时就定义了接口，拥有多名员工的项目可以同时开始使用它并开发其实现。这<strong>加速了开发，因为他们可以在实现准备就绪之前编写代码</strong>。</p>","autoDesc":true}');export{o as comp,v as data};
