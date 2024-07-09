import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a}from"./app-_uhw5edP.js";const r={},s=a('<h1 id="主干开发" tabindex="-1"><a class="header-anchor" href="#主干开发"><span>主干开发</span></a></h1><p>如果你在DevOps生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的<strong>贡献指南</strong>。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习版本控制系统中的主干开发方法。</p><p>首先，我们将探索这个概念的一般性，看看它与特性分支开发模型有何不同，涉及的共同特点，以及实现它的工作流程。</p><p>然后，我们将讨论选择主干开发时需要考虑的不同因素。最后，我们将看到使用主干开发的利弊。</p><h2 id="_2-什么是主干开发" tabindex="-1"><a class="header-anchor" href="#_2-什么是主干开发"><span>2. 什么是主干开发？</span></a></h2><p><strong>主干开发是一种源代码控制分支模型，开发人员在称为“trunk”或“mainline”（在Git中为“master”或“main”）的单个分支上工作</strong>。</p><p>由于这个模型中没有长期存在的开发分支，通常避免了合并冲突，构建也不会频繁中断。</p><p>在主干开发方法中，开发人员主要在“trunk”上协作。<strong>然而，较大的团队可能会使用寿命不超过几天的短期分支</strong>。</p><p>开发人员经常提交代码以推送到trunk的最新副本。随后，构建触发自动化测试，这有助于在后期最小化集成问题。</p><p>正如我们所看到的，这种方法鼓励持续集成，最适合小型敏捷团队。</p><h2 id="_3-与特性分支模型的比较" tabindex="-1"><a class="header-anchor" href="#_3-与特性分支模型的比较"><span>3. 与特性分支模型的比较</span></a></h2><p>基于特性分支的开发是团队最常选择的实践方法。<strong>在这种分散版本控制方法中，开发人员从主代码库创建长期存在的专用分支，以隔离特定功能/改进所需的更改</strong>。</p><p>一旦代码准备就绪并通过测试，提交将被制作到相应的分支。最后，这些分支将在解决合并冲突后合并回主代码库。</p><p>这里的想法是使开发人员能够独立工作并提交更改，而不影响其他开发人员或团队。具体来说，这在有多个贡献者和/或复杂代码库的相对较大的项目中非常有用。</p><h2 id="_4-主干开发的特点" tabindex="-1"><a class="header-anchor" href="#_4-主干开发的特点"><span>4. 主干开发的特点</span></a></h2><p>主干开发方法有一些共同的特点。这些因素影响开发人员如何有效地工作和相互协作。让我们简要看看它们。</p><h3 id="_4-1-持续集成" tabindex="-1"><a class="header-anchor" href="#_4-1-持续集成"><span>4.1. 持续集成</span></a></h3><p>在主干开发中，所有开发人员都在单个分支（master/trunk）上工作。这使得代码集成更快，从而减少了合并冲突。</p><p><strong>开发人员尽可能频繁地集成代码更改，而不是等待一大块新代码</strong>。</p><h3 id="_4-2-小而频繁的提交" tabindex="-1"><a class="header-anchor" href="#_4-2-小而频繁的提交"><span>4.2. 小而频繁的提交</span></a></h3><p><strong>定期集成小而频繁的提交避免了在后期进行大合并的风险</strong>。随后，合并将更加容易，冲突相对较少。</p><p>此外，由于提交更加规律，引入bug的机会最小。而且，更容易识别和解决合并冲突。</p><h3 id="_4-3-测试自动化" tabindex="-1"><a class="header-anchor" href="#_4-3-测试自动化"><span>4.3. 测试自动化</span></a></h3><p>测试自动化是主干开发模型的一个重要特征。由于有定期提交，我们需要确保构建没有中断。此外，新提交不应该引入回归。</p><p><strong>增加测试覆盖率有助于降低回归风险，并有助于快速修复已识别的问题</strong>。</p><p>此外，这些自动化测试提供即时反馈，以便问题更快地得到解决，从而提高代码质量。</p><h3 id="_4-4-代码审查" tabindex="-1"><a class="header-anchor" href="#_4-4-代码审查"><span>4.4. 代码审查</span></a></h3><p>对于每个新提交，其他开发人员在将代码合并到主分支之前进行审查并提供反馈。这有助于提高代码质量并提前识别潜在问题。需要定义完成代码审查的时间框架，以避免延迟提交。</p><h3 id="_4-5-无长期分支" tabindex="-1"><a class="header-anchor" href="#_4-5-无长期分支"><span>4.5. 无长期分支</span></a></h3><p>任何超过两天的分支最终可能成为长期分支。<strong>在主干开发中，避免长期分支以防止合并冲突并允许更快的集成</strong>。</p><h2 id="_5-工作流程" tabindex="-1"><a class="header-anchor" href="#_5-工作流程"><span>5. 工作流程</span></a></h2><p>让我们看看主干开发模型中涉及的主要步骤。</p><h3 id="_5-1-代码更改" tabindex="-1"><a class="header-anchor" href="#_5-1-代码更改"><span>5.1. 代码更改</span></a></h3><p>在第一步中，一旦代码准备好，开发人员直接将代码提交到trunk或从trunk创建的短期分支。这里，<strong>经验法则是每个人都每天提交到主线</strong>。</p><p>更准确地说，我们绝不应该在本地仓库中有超过一天的工作未集成。</p><h3 id="_5-2-拉取请求" tabindex="-1"><a class="header-anchor" href="#_5-2-拉取请求"><span>5.2. 拉取请求</span></a></h3><p><strong>一旦代码提交，开发人员就创建一个拉取请求，将新代码与主分支合并</strong>。</p><p>拉取请求将包含更改的基本描述，代码更改列表以及任何其他相关信息。</p><h3 id="_5-3-代码审查" tabindex="-1"><a class="header-anchor" href="#_5-3-代码审查"><span>5.3. 代码审查</span></a></h3><p>在这一步中，其他开发人员审查拉取请求中的代码更改。这一步有助于识别原始作者可能忽略的缺陷。</p><p>此外，对新代码进行4眼验证可以强制执行新开发人员的最佳实践。</p><h3 id="_5-4-自动化测试" tabindex="-1"><a class="header-anchor" href="#_5-4-自动化测试"><span>5.4. 自动化测试</span></a></h3><p>主干开发严重依赖自动化测试。这些测试包括单元测试和集成测试，它们在创建拉取请求时自动触发。</p><p><strong>自动化测试防止新代码更改破坏现有功能</strong>。更重要的是，它给了我们信心，新代码可以正常工作，而不影响旧代码。</p><h3 id="_5-5-合并" tabindex="-1"><a class="header-anchor" href="#_5-5-合并"><span>5.5. 合并</span></a></h3><p>经过同行审查和自动化测试后，新代码已准备好与trunk合并。由于没有长期分支，提交间隔短，我们最小化了合并冲突的风险。</p><h2 id="_6-影响主干开发的因素" tabindex="-1"><a class="header-anchor" href="#_6-影响主干开发的因素"><span>6. 影响主干开发的因素</span></a></h2><p>在选择主干开发和特性分支开发之间时，有多个因素会影响。</p><p>具体来说，我们应该照顾到项目和参与开发团队的特定需求。这两种开发方法都有其优缺点。然而，<strong>需要考虑的主要因素包括代码库的复杂性，实际的开发过程以及开发人员的数量</strong>。</p><p>让我们看看主干开发的优缺点。</p><h3 id="_6-1-优点" tabindex="-1"><a class="header-anchor" href="#_6-1-优点"><span>6.1. 优点</span></a></h3><ul><li><strong>速度和效率</strong>：由于团队在单个分支上工作，主干开发通过频繁的检入实现了更快的代码集成，从而减少了合并冲突。因此，团队可以享受这种模型提供的速度和效率。</li><li><strong>更大的代码稳定性</strong>：频繁的检入也有助于检测和修复任何代码问题。由于没有长期分支，我们避免了更大合并的风险。换句话说，这使我们能够更早地识别问题并修复它们，从而实现更大的代码稳定性。</li><li><strong>增强的团队协作</strong>：与分支模型不同，开发人员在个别分支上工作，主干开发通过提供更多对当前更改的认识，促进了彼此之间的良好理解和更好的协作。</li><li><strong>持续集成和交付（CI/CD）</strong>：通过频繁的提交，开发人员确保trunk中的代码始终是最新的。在这样做的同时，他们确保构建始终通过，并且在出现任何故障时立即解决。随后，trunk中的代码将始终处于可部署状态。</li><li><strong>减少技术债务</strong>：在使用长期分支时，开发人员可能会选择快速修复，这可能导致新的技术债务。在主干开发中，通过频繁合并和小提交，我们避免了大合并以减少技术债务。</li></ul><h3 id="_6-2-缺点" tabindex="-1"><a class="header-anchor" href="#_6-2-缺点"><span>6.2. 缺点</span></a></h3><ul><li><strong>破坏构建的风险</strong>：由于开发人员更频繁地提交，总有破坏构建的风险。当构建失败时，我们可能需要更多的时间来修复它并使其再次通过。</li><li><strong>更改隔离</strong>：存在混合两个或更多更改而没有单独测试这些单独更改的风险。开发人员需要随时准备好，始终知道当前的代码库可能随时更新。</li><li><strong>发布管理</strong>：在trunk中维护不同的代码库可能很困难。因此，如果我们需要在中间进行中间发布，发布管理可能会成为一个问题。</li><li><strong>开发人员数量</strong>：如果开发人员数量较多，在trunk上工作可能更具挑战性。如果流程不清楚，团队协作可能会受到影响。</li></ul><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们对现代软件开发中主干开发的使用进行了概述。</p><p>我们还简要讨论了主干开发模型的特点和工作流程。在讨论过程中，我们还比较了基于分支和基于主干开发之间的差异。</p><p>最后，我们看到了使用主干开发的好处和缺点。总之，<strong>对于希望简化开发流程，提高团队协作并减少技术债务的团队来说，主干开发值得考虑</strong>。</p>',60),l=[s];function p(i,o){return t(),n("div",null,l)}const c=e(r,[["render",p],["__file","2024-06-29-Trunk Based Development.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Trunk%20Based%20Development.html","title":"主干开发","lang":"zh-CN","frontmatter":{"date":"2024-06-29T00:00:00.000Z","category":["DevOps","版本控制"],"tag":["Trunk-Based Development","持续集成"],"head":[["meta",{"name":"keywords","content":"版本控制系统, 持续集成, 敏捷开发, 代码合并"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Trunk%20Based%20Development.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"主干开发"}],["meta",{"property":"og:description","content":"主干开发 如果你在DevOps生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的贡献指南。 1. 概述 在本教程中，我们将学习版本控制系统中的主干开发方法。 首先，我们将探索这个概念的一般性，看看它与特性分支开发模型有何不同，涉及的共同特点，以及实现它的工作流程。 然后，我们将讨论选择主干开发时需要考虑的不同因素。最后，我们将看到使用主..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T15:52:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Trunk-Based Development"}],["meta",{"property":"article:tag","content":"持续集成"}],["meta",{"property":"article:published_time","content":"2024-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T15:52:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"主干开发\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T15:52:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"主干开发 如果你在DevOps生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的贡献指南。 1. 概述 在本教程中，我们将学习版本控制系统中的主干开发方法。 首先，我们将探索这个概念的一般性，看看它与特性分支开发模型有何不同，涉及的共同特点，以及实现它的工作流程。 然后，我们将讨论选择主干开发时需要考虑的不同因素。最后，我们将看到使用主..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是主干开发？","slug":"_2-什么是主干开发","link":"#_2-什么是主干开发","children":[]},{"level":2,"title":"3. 与特性分支模型的比较","slug":"_3-与特性分支模型的比较","link":"#_3-与特性分支模型的比较","children":[]},{"level":2,"title":"4. 主干开发的特点","slug":"_4-主干开发的特点","link":"#_4-主干开发的特点","children":[{"level":3,"title":"4.1. 持续集成","slug":"_4-1-持续集成","link":"#_4-1-持续集成","children":[]},{"level":3,"title":"4.2. 小而频繁的提交","slug":"_4-2-小而频繁的提交","link":"#_4-2-小而频繁的提交","children":[]},{"level":3,"title":"4.3. 测试自动化","slug":"_4-3-测试自动化","link":"#_4-3-测试自动化","children":[]},{"level":3,"title":"4.4. 代码审查","slug":"_4-4-代码审查","link":"#_4-4-代码审查","children":[]},{"level":3,"title":"4.5. 无长期分支","slug":"_4-5-无长期分支","link":"#_4-5-无长期分支","children":[]}]},{"level":2,"title":"5. 工作流程","slug":"_5-工作流程","link":"#_5-工作流程","children":[{"level":3,"title":"5.1. 代码更改","slug":"_5-1-代码更改","link":"#_5-1-代码更改","children":[]},{"level":3,"title":"5.2. 拉取请求","slug":"_5-2-拉取请求","link":"#_5-2-拉取请求","children":[]},{"level":3,"title":"5.3. 代码审查","slug":"_5-3-代码审查","link":"#_5-3-代码审查","children":[]},{"level":3,"title":"5.4. 自动化测试","slug":"_5-4-自动化测试","link":"#_5-4-自动化测试","children":[]},{"level":3,"title":"5.5. 合并","slug":"_5-5-合并","link":"#_5-5-合并","children":[]}]},{"level":2,"title":"6. 影响主干开发的因素","slug":"_6-影响主干开发的因素","link":"#_6-影响主干开发的因素","children":[{"level":3,"title":"6.1. 优点","slug":"_6-1-优点","link":"#_6-1-优点","children":[]},{"level":3,"title":"6.2. 缺点","slug":"_6-2-缺点","link":"#_6-2-缺点","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719676374000,"updatedTime":1719676374000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.6,"words":2280},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Trunk Based Development.md","localizedDate":"2024年6月29日","excerpt":"\\n<p>如果你在DevOps生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的<strong>贡献指南</strong>。</p>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习版本控制系统中的主干开发方法。</p>\\n<p>首先，我们将探索这个概念的一般性，看看它与特性分支开发模型有何不同，涉及的共同特点，以及实现它的工作流程。</p>\\n<p>然后，我们将讨论选择主干开发时需要考虑的不同因素。最后，我们将看到使用主干开发的利弊。</p>\\n<h2>2. 什么是主干开发？</h2>\\n<p><strong>主干开发是一种源代码控制分支模型，开发人员在称为“trunk”或“mainline”（在Git中为“master”或“main”）的单个分支上工作</strong>。</p>","autoDesc":true}');export{c as comp,_ as data};
