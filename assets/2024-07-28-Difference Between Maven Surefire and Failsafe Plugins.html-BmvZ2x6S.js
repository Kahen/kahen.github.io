import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const e={},p=t('<h1 id="maven-surefire与failsafe插件比较" tabindex="-1"><a class="header-anchor" href="#maven-surefire与failsafe插件比较"><span>Maven Surefire与Failsafe插件比较</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在典型的测试驱动开发中，我们的目标是编写许多低级别的单元测试，这些测试运行速度快，可以独立设置。此外，还有一些高级别的集成测试，它们依赖于外部系统，例如设置服务器或数据库。不出所料，这些测试通常都是资源和时间密集型的。</p><p>因此，这些测试大多需要一些集成前的设置和集成后的清理，以实现优雅的终止。因此，区分这两种类型的测试并在构建过程中分别运行它们是可取的。</p><p>在本教程中，我们将比较Surefire和Failsafe插件，这两种插件通常用于在Apache Maven构建中运行各种类型的测试。</p><h2 id="_2-surefire插件" tabindex="-1"><a class="header-anchor" href="#_2-surefire插件"><span>2. Surefire插件</span></a></h2><p>Surefire插件属于Maven核心插件集，用于运行应用程序的单元测试。</p><p>项目POM默认包含此插件，但我们也可以显式配置它：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginManagement</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n                ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.maven.plugins``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-surefire-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.0.0-M5```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n                ....\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginManagement</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该插件绑定到默认生命周期的_test_阶段。因此，让我们使用以下命令执行它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn clean <span class="token builtin class-name">test</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将运行我们项目中的所有单元测试。由于Surefire插件绑定到_test_阶段，如果有任何测试失败，构建将失败，并且在构建过程中不会执行后续阶段。</p><p>或者，我们可以修改插件配置以运行集成测试以及单元测试。然而，对于集成测试来说，这可能不是理想的行为，因为它们可能需要在测试执行之前进行一些环境设置，以及在测试执行后进行一些清理。</p><p>Maven为此目的提供了另一个插件。</p><h2 id="_3-failsafe插件" tabindex="-1"><a class="header-anchor" href="#_3-failsafe插件"><span>3. Failsafe插件</span></a></h2><p>Failsafe插件旨在运行项目中的集成测试。</p><h3 id="_3-1-配置" tabindex="-1"><a class="header-anchor" href="#_3-1-配置"><span>3.1. 配置</span></a></h3><p>首先，让我们在项目POM中进行配置：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```maven-failsafe-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.1.2```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>```\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````integration-test````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````verify````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>```\n            ....\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，插件的目标绑定到构建周期的_integration-test_和_verify_阶段，以执行集成测试。</p><p>现在，让我们从命令行执行_verify_阶段：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn clean verify\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将运行所有的集成测试，但如果在_integration-test_阶段有任何测试失败，插件不会立即使构建失败。</p><p>相反，Maven仍然执行_post-integration-test_阶段。因此，我们仍然可以在_post-integration-test_阶段执行任何清理和环境拆除。构建过程中的后续_verify_阶段报告任何测试失败。</p><h3 id="_3-2-示例" tabindex="-1"><a class="header-anchor" href="#_3-2-示例"><span>3.2. 示例</span></a></h3><p>在我们的示例中，我们将配置Jetty服务器在运行集成测试之前启动，并在测试执行后停止。</p><p>首先，让我们将Jetty插件添加到我们的POM中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.eclipse.jetty``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```jetty-maven-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```9.4.11.v20180605```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ....\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>``start-jetty``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">&gt;</span></span>``pre-integration-test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>phase</span><span class="token punctuation">&gt;</span></span>``\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>```\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````start````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>```\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>``stop-jetty``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>``\n            ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">&gt;</span></span>``post-integration-test``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>phase</span><span class="token punctuation">&gt;</span></span>``\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>```\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>````stop````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>````\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>``\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们添加了配置，在_pre-integration-test_和_post-integration-test_阶段分别启动和停止Jetty服务器。</p><p>现在，让我们再次执行我们的集成测试并查看控制台输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">..</span><span class="token punctuation">..</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;&lt;&lt;</span> jetty-maven-plugin:9.4.11.v20180605:start <span class="token punctuation">(</span>start-jetty<span class="token punctuation">)</span>\n   validate @ maven-integration-test <span class="token operator">&lt;&lt;&lt;</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- jetty-maven-plugin:9.4.11.v20180605:start <span class="token punctuation">(</span>start-jetty<span class="token punctuation">)</span>\n   @ maven-integration-test ---\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Started ServerConnector@4b9dc62f<span class="token punctuation">{</span>HTTP/1.1,<span class="token punctuation">[</span>http/1.1<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token number">0.0</span>.0.0:8999<span class="token punctuation">}</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Started @6794ms\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Started Jetty Server\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- maven-failsafe-plugin:3.1.2:integration-test <span class="token punctuation">(</span>default<span class="token punctuation">)</span>\n   @ maven-integration-test ---\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> -------------------------------------------------------\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> T E S T S\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> -------------------------------------------------------\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Running com.baeldung.maven.it.FailsafeBuildPhaseIntegrationTest\n<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> Tests run: <span class="token number">1</span>, Failures: <span class="token number">1</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>, Time elapsed: <span class="token number">0.024</span> s\n  FAILURE<span class="token operator">!</span> - <span class="token keyword">in</span> com.baeldung.maven.it.FailsafeBuildPhaseIntegrationTest\n<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> com.baeldung.maven.it.FailsafeBuildPhaseIntegrationTest.whenTestExecutes_thenPreAndPostIntegrationBuildPhasesAreExecuted\n  Time elapsed: <span class="token number">0.012</span> s  FAILURE<span class="token operator">!</span>\norg.opentest4j.AssertionFailedError: expected: <span class="token variable">`</span></span><span class="token operator">&lt;</span>true<span class="token operator">&gt;</span>`<span class="token variable"><span class="token variable">`</span> but was: <span class="token variable">`</span></span><span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>false<span class="token operator">&gt;</span><span class="token variable">`</span></span><span class="token variable"><span class="token variable">`</span>\n   at com.baeldung.maven.it.FailsafeBuildPhaseIntegrationTest\n      .whenTestExecutes_thenPreAndPostIntegrationBuildPhasesAreExecuted<span class="token punctuation">(</span>FailsafeBuildPhaseIntegrationTest.java:11<span class="token punctuation">)</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Results:\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>\n<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> Failures:\n<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span>   FailsafeBuildPhaseIntegrationTest.whenTestExecutes_thenPreAndPostIntegrationBuildPhasesAreExecuted:11\n  expected: <span class="token variable">`</span></span><span class="token operator">&lt;</span>true<span class="token operator">&gt;</span><span class="token variable"><span class="token variable">`</span> but was: <span class="token variable">`</span></span><span class="token variable"><span class="token variable">`</span><span class="token operator">&lt;</span>false<span class="token operator">&gt;</span><span class="token variable">`</span></span>`\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>\n<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> Tests run: <span class="token number">1</span>, Failures: <span class="token number">1</span>, Errors: <span class="token number">0</span>, Skipped: <span class="token number">0</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- jetty-maven-plugin:9.4.11.v20180605:stop <span class="token punctuation">(</span>stop-jetty<span class="token punctuation">)</span>\n   @ maven-integration-test ---\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- maven-failsafe-plugin:3.1.2:verify <span class="token punctuation">(</span>default<span class="token punctuation">)</span>\n   @ maven-integration-test ---\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Stopped ServerConnector@4b9dc62f<span class="token punctuation">{</span>HTTP/1.1,<span class="token punctuation">[</span>http/1.1<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token number">0.0</span>.0.0:8999<span class="token punctuation">}</span>\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> node0 Stopped scavenging\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> BUILD FAILURE\n<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> ------------------------------------------------------------------------\n<span class="token punctuation">..</span><span class="token punctuation">..</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据我们的配置，Jetty服务器在集成测试执行之前启动。为了演示，我们有一个失败的集成测试，但这并没有立即使构建失败。_post-integration-test_阶段在测试执行后执行，服务器在构建失败前停止。</p><p><strong>相比之下，如果我们使用Surefire插件来运行这些集成测试，构建将在_integration-test_阶段停止，而不会执行任何所需的清理。</strong></p><p>使用不同的插件来运行不同类型的测试的一个额外好处是，它们之间的配置是分离的。这提高了项目构建的可维护性。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们比较了Surefire和Failsafe插件，用于分离和运行不同类型的测试。我们还查看了一个示例，看到了Failsafe插件为需要进一步设置和清理的测试提供了额外的功能。</p><p>如常，代码可在GitHub上找到。</p>',37),l=[p];function i(c,o){return s(),a("div",null,l)}const k=n(e,[["render",i],["__file","2024-07-28-Difference Between Maven Surefire and Failsafe Plugins.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-28/2024-07-28-Difference%20Between%20Maven%20Surefire%20and%20Failsafe%20Plugins.html","title":"Maven Surefire与Failsafe插件比较","lang":"zh-CN","frontmatter":{"date":"2022-06-06T00:00:00.000Z","category":["Maven","Testing"],"tag":["Maven","Surefire","Failsafe"],"head":[["meta",{"name":"keywords","content":"Maven, Surefire, Failsafe, Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-28/2024-07-28-Difference%20Between%20Maven%20Surefire%20and%20Failsafe%20Plugins.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven Surefire与Failsafe插件比较"}],["meta",{"property":"og:description","content":"Maven Surefire与Failsafe插件比较 1. 概述 在典型的测试驱动开发中，我们的目标是编写许多低级别的单元测试，这些测试运行速度快，可以独立设置。此外，还有一些高级别的集成测试，它们依赖于外部系统，例如设置服务器或数据库。不出所料，这些测试通常都是资源和时间密集型的。 因此，这些测试大多需要一些集成前的设置和集成后的清理，以实现优雅的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-28T08:02:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"Surefire"}],["meta",{"property":"article:tag","content":"Failsafe"}],["meta",{"property":"article:published_time","content":"2022-06-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-28T08:02:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven Surefire与Failsafe插件比较\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-28T08:02:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Maven Surefire与Failsafe插件比较 1. 概述 在典型的测试驱动开发中，我们的目标是编写许多低级别的单元测试，这些测试运行速度快，可以独立设置。此外，还有一些高级别的集成测试，它们依赖于外部系统，例如设置服务器或数据库。不出所料，这些测试通常都是资源和时间密集型的。 因此，这些测试大多需要一些集成前的设置和集成后的清理，以实现优雅的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Surefire插件","slug":"_2-surefire插件","link":"#_2-surefire插件","children":[]},{"level":2,"title":"3. Failsafe插件","slug":"_3-failsafe插件","link":"#_3-failsafe插件","children":[{"level":3,"title":"3.1. 配置","slug":"_3-1-配置","link":"#_3-1-配置","children":[]},{"level":3,"title":"3.2. 示例","slug":"_3-2-示例","link":"#_3-2-示例","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1722153721000,"updatedTime":1722153721000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.21,"words":1263},"filePathRelative":"posts/baeldung/2024-07-28/2024-07-28-Difference Between Maven Surefire and Failsafe Plugins.md","localizedDate":"2022年6月6日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在典型的测试驱动开发中，我们的目标是编写许多低级别的单元测试，这些测试运行速度快，可以独立设置。此外，还有一些高级别的集成测试，它们依赖于外部系统，例如设置服务器或数据库。不出所料，这些测试通常都是资源和时间密集型的。</p>\\n<p>因此，这些测试大多需要一些集成前的设置和集成后的清理，以实现优雅的终止。因此，区分这两种类型的测试并在构建过程中分别运行它们是可取的。</p>\\n<p>在本教程中，我们将比较Surefire和Failsafe插件，这两种插件通常用于在Apache Maven构建中运行各种类型的测试。</p>\\n<h2>2. Surefire插件</h2>","autoDesc":true}');export{k as comp,d as data};
