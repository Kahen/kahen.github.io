import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as t}from"./app-bN4DcMMr.js";const l={},i=t('<h1 id="功能测试与非功能测试-baeldung" tabindex="-1"><a class="header-anchor" href="#功能测试与非功能测试-baeldung"><span>功能测试与非功能测试 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本文中，我们将探讨测试的基础知识。我们还将探讨功能测试与非功能测试之间的一些差异。最后，我们将讨论功能测试和非功能测试的类型。</p><h2 id="_2-测试及其重要性" tabindex="-1"><a class="header-anchor" href="#_2-测试及其重要性"><span>2. 测试及其重要性</span></a></h2><p>测试在软件开发生命周期中扮演着重要角色。它对于保护软件免受缺陷、漏洞和故障的侵害至关重要，并提供有保证的质量保证。此外，如果存在任何错误或错误，应该尽早识别并修复。测试帮助我们做到这一点。</p><p>我们根据要求评估软件并报告缺陷，使其可靠且健壮。如果软件不符合指定的要求，无论是功能还是非功能，它就毫无用处。此外，它必须始终有效地处理所有异常和边缘情况。软件测试对于提供高效、准确和可用的产品至关重要且不可避免。</p><p>让我们了解两个重要的测试类别：功能测试和非功能测试。</p><p><strong>在功能测试中，我们确保软件的功能满足业务需求。</strong> 我们准备测试以特别关注功能需求，例如业务用例。这意味着我们准备一组输入和预期的输出，并测试系统以获取准确的值。<strong>因此，功能测试是一种保证应用程序按照预期满足所有业务用例的方式。</strong></p><p>我们通常在功能测试之后进行非功能测试。在非功能测试中，我们专注于评估系统的非功能方面，如性能、可用性、可靠性和可扩展性。它确保用户在使用软件时获得最佳体验。非功能测试和功能测试一样重要，因为它们帮助我们了解系统在特定情况下的行为。<strong>因此，非功能测试是一种保证应用程序足够健壮以处理未知外部因素的方式。</strong></p><h2 id="_4-功能测试的类型" tabindex="-1"><a class="header-anchor" href="#_4-功能测试的类型"><span>4. 功能测试的类型</span></a></h2><p>让我们了解属于功能测试的测试类型。</p><h3 id="_4-1-单元测试" tabindex="-1"><a class="header-anchor" href="#_4-1-单元测试"><span>4.1. 单元测试</span></a></h3><p>单元测试是对代码功能的“白盒”测试方法，根据要求测试功能。我们编写测试以检查编写的代码是否正确工作。<strong>因此，我们可以在软件开发生命周期的最早阶段覆盖缺陷并报告这些缺陷。</strong></p><p>一旦我们开发了新功能，我们可以并行编写单元测试，以检查该功能是否按预期工作，即使在意外情况下也是如此。此外，我们应该确保单元测试涵盖产品的功能性可靠性。最后，我们应该确保遵循Java中编写单元测试的最佳实践。</p><h3 id="_4-2-集成测试" tabindex="-1"><a class="header-anchor" href="#_4-2-集成测试"><span>4.2. 集成测试</span></a></h3><p>一旦所有组件和模块构建完成，我们可以对这些模块执行集成测试。在这里，我们测试产品的所有单独组件的集成是否符合业务期望。<strong>我们验证各个模块和组件在集成后是否像独立时一样高效地工作。</strong> 此外，我们应该确保在部署之前成功评估单元测试和集成测试。</p><h3 id="_4-3-健全性测试" tabindex="-1"><a class="header-anchor" href="#_4-3-健全性测试"><span>4.3. 健全性测试</span></a></h3><p>一旦软件在修复功能中的一个小问题后升级版本可用，我们就执行健全性测试。我们验证开发人员是否已修复所有报告的缺陷，并且新更改没有进一步问题。因此，这种类型的测试特别关注正在更改的软件部分。</p><h3 id="_4-4-回归测试" tabindex="-1"><a class="header-anchor" href="#_4-4-回归测试"><span>4.4. 回归测试</span></a></h3><p>如果软件中引入了新功能或进行了一些代码更改，我们就执行回归测试。软件中未触及的功能在代码更改或改进后必须像之前一样正常工作。因此，我们重新测试软件的功能，以确保现有功能仍然按预期工作。</p><h3 id="_4-5-冒烟测试" tabindex="-1"><a class="header-anchor" href="#_4-5-冒烟测试"><span>4.5. 冒烟测试</span></a></h3><p>在冒烟测试中，我们验证软件构建是否稳定并准备好进行下一轮测试。有时，我们称这为构建验证测试。</p><h3 id="_4-6-用户验收测试-uat" tabindex="-1"><a class="header-anchor" href="#_4-6-用户验收测试-uat"><span>4.6. 用户验收测试（UAT）</span></a></h3><p>UAT是我们在软件发布前执行的测试的最后一步。通常，最终用户执行此测试以确保软件按预期工作。</p><h3 id="_4-7-系统测试" tabindex="-1"><a class="header-anchor" href="#_4-7-系统测试"><span>4.7. 系统测试</span></a></h3><p>一旦整个产品构建完成，我们对端到端的产品执行测试，可能包括硬件和软件测试。<strong>所有测试都在完全集成的产品及其外围设备上运行，以测试这些组件如何相互交互。</strong> 此外，我们验证特定输入集的所有期望输出。</p><h2 id="_5-非功能测试的类型" tabindex="-1"><a class="header-anchor" href="#_5-非功能测试的类型"><span>5. 非功能测试的类型</span></a></h2><p>现在，让我们也了解属于非功能测试的测试类型。</p><h3 id="_5-1-性能测试" tabindex="-1"><a class="header-anchor" href="#_5-1-性能测试"><span>5.1. 性能测试</span></a></h3><p>如果我们一次性加载大量请求，应用程序可能会崩溃。我们进行性能测试以确保应用程序在给定工作负载下保持稳定和响应。这种测试帮助我们发现性能瓶颈，因此我们本质上专注于软件的速度、稳定性和可扩展性。<strong>因此，我们需要验证应用程序响应迅速，保持稳定，并且在最大用户负载下所有服务都可用。</strong></p><p>耐久性测试、负载测试、压力测试、尖峰测试、兼容性测试、容量测试和可扩展性测试都属于性能测试的范畴。</p><h3 id="_5-2-安全测试" tabindex="-1"><a class="header-anchor" href="#_5-2-安全测试"><span>5.2. 安全测试</span></a></h3><p>安全测试是软件测试的重要组成部分，以确保软件应用程序中没有漏洞、威胁或风险。我们运行安全测试以揭示系统安全机制中的缺陷和漏洞。这对于保护系统免受入侵者的恶意攻击是必要的。</p><p><strong>网络安全、数据安全、认证和授权、客户端和服务器端安全、拒绝服务以及URL操作是安全测试的几个重点领域。</strong></p><p>道德黑客攻击、安全审计、安全扫描、漏洞扫描、风险评估、姿态评估和渗透测试都属于安全测试。</p><h3 id="_5-3-可用性测试" tabindex="-1"><a class="header-anchor" href="#_5-3-可用性测试"><span>5.3. 可用性测试</span></a></h3><p><strong>在可用性测试中，一组特定的用户使用软件执行典型任务以评估产品。</strong> 他们专注于软件应用程序的易用性，以实现其目标。因此，我们也称其为用户体验（UX）测试。它有助于提高最终用户的满意度。</p><p>可用性测试的一些最重要的标准是：</p><ul><li>可访问性和易用性</li><li>效率</li><li>期望性</li><li>准确性</li><li>系统的有用性</li></ul><h3 id="_5-4-本地化测试" tabindex="-1"><a class="header-anchor" href="#_5-4-本地化测试"><span>5.4. 本地化测试</span></a></h3><p>本地化测试侧重于特定地理或地区系统的运行行为。<strong>我们为目标语言或国家定制应用程序。</strong> 因此，我们检查语言、消息、日期和时间格式、通知等是否根据目标区域设计。</p><p>我们特别关注内容和UI来执行本地化测试。根据地区，我们可能会根据要求更改初始设置和用户界面。因此，进行本地化测试，我们需要在领域以及i18n工程方面的专业知识。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了功能和非功能测试的目的，并比较了两者。我们还学习了各种功能和非功能测试的类型。最后，我们探讨了何时使用各种功能和非功能测试技术。</p>',44),s=[i];function r(p,o){return a(),n("div",null,s)}const d=e(l,[["render",r],["__file","2024-07-07-Functional vs. Non Functional Testing.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Functional%20vs.%20Non%20Functional%20Testing.html","title":"功能测试与非功能测试 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Software Testing"],"tag":["Functional Testing","Non-Functional Testing"],"head":[["meta",{"name":"keywords","content":"功能测试, 非功能测试, 软件测试"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Functional%20vs.%20Non%20Functional%20Testing.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"功能测试与非功能测试 | Baeldung"}],["meta",{"property":"og:description","content":"功能测试与非功能测试 | Baeldung 1. 引言 在本文中，我们将探讨测试的基础知识。我们还将探讨功能测试与非功能测试之间的一些差异。最后，我们将讨论功能测试和非功能测试的类型。 2. 测试及其重要性 测试在软件开发生命周期中扮演着重要角色。它对于保护软件免受缺陷、漏洞和故障的侵害至关重要，并提供有保证的质量保证。此外，如果存在任何错误或错误，应..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T01:55:26.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Functional Testing"}],["meta",{"property":"article:tag","content":"Non-Functional Testing"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T01:55:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"功能测试与非功能测试 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T01:55:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"功能测试与非功能测试 | Baeldung 1. 引言 在本文中，我们将探讨测试的基础知识。我们还将探讨功能测试与非功能测试之间的一些差异。最后，我们将讨论功能测试和非功能测试的类型。 2. 测试及其重要性 测试在软件开发生命周期中扮演着重要角色。它对于保护软件免受缺陷、漏洞和故障的侵害至关重要，并提供有保证的质量保证。此外，如果存在任何错误或错误，应..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 测试及其重要性","slug":"_2-测试及其重要性","link":"#_2-测试及其重要性","children":[]},{"level":2,"title":"4. 功能测试的类型","slug":"_4-功能测试的类型","link":"#_4-功能测试的类型","children":[{"level":3,"title":"4.1. 单元测试","slug":"_4-1-单元测试","link":"#_4-1-单元测试","children":[]},{"level":3,"title":"4.2. 集成测试","slug":"_4-2-集成测试","link":"#_4-2-集成测试","children":[]},{"level":3,"title":"4.3. 健全性测试","slug":"_4-3-健全性测试","link":"#_4-3-健全性测试","children":[]},{"level":3,"title":"4.4. 回归测试","slug":"_4-4-回归测试","link":"#_4-4-回归测试","children":[]},{"level":3,"title":"4.5. 冒烟测试","slug":"_4-5-冒烟测试","link":"#_4-5-冒烟测试","children":[]},{"level":3,"title":"4.6. 用户验收测试（UAT）","slug":"_4-6-用户验收测试-uat","link":"#_4-6-用户验收测试-uat","children":[]},{"level":3,"title":"4.7. 系统测试","slug":"_4-7-系统测试","link":"#_4-7-系统测试","children":[]}]},{"level":2,"title":"5. 非功能测试的类型","slug":"_5-非功能测试的类型","link":"#_5-非功能测试的类型","children":[{"level":3,"title":"5.1. 性能测试","slug":"_5-1-性能测试","link":"#_5-1-性能测试","children":[]},{"level":3,"title":"5.2. 安全测试","slug":"_5-2-安全测试","link":"#_5-2-安全测试","children":[]},{"level":3,"title":"5.3. 可用性测试","slug":"_5-3-可用性测试","link":"#_5-3-可用性测试","children":[]},{"level":3,"title":"5.4. 本地化测试","slug":"_5-4-本地化测试","link":"#_5-4-本地化测试","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720317326000,"updatedTime":1720317326000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.5,"words":1951},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Functional vs. Non Functional Testing.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本文中，我们将探讨测试的基础知识。我们还将探讨功能测试与非功能测试之间的一些差异。最后，我们将讨论功能测试和非功能测试的类型。</p>\\n<h2>2. 测试及其重要性</h2>\\n<p>测试在软件开发生命周期中扮演着重要角色。它对于保护软件免受缺陷、漏洞和故障的侵害至关重要，并提供有保证的质量保证。此外，如果存在任何错误或错误，应该尽早识别并修复。测试帮助我们做到这一点。</p>\\n<p>我们根据要求评估软件并报告缺陷，使其可靠且健壮。如果软件不符合指定的要求，无论是功能还是非功能，它就毫无用处。此外，它必须始终有效地处理所有异常和边缘情况。软件测试对于提供高效、准确和可用的产品至关重要且不可避免。</p>","autoDesc":true}');export{d as comp,_ as data};
