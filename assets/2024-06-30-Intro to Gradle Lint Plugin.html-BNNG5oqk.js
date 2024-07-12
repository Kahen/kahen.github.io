import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-yYgLofWD.js";const a={},l=t(`<h1 id="gradle-lint-插件介绍" tabindex="-1"><a class="header-anchor" href="#gradle-lint-插件介绍"><span>Gradle Lint 插件介绍</span></a></h1><p>在本文中，我们将探索 Gradle Lint 插件。 首先，我们将看到何时使用它。然后，我们将逐步了解插件的配置选项。接下来，我们将使用一些预定义的规则。最后，我们将生成 Lint 报告。</p><h2 id="_2-gradle-lint-插件是什么" tabindex="-1"><a class="header-anchor" href="#_2-gradle-lint-插件是什么"><span>2. Gradle Lint 插件是什么？</span></a></h2><p><strong>Gradle Lint 插件有助于对 Gradle 配置文件进行 Lint 检查。</strong> 它强制执行代码库中构建脚本的结构。该插件可以保持 Gradle Wrapper 版本的更新，防止构建文件中的不良实践，并<strong>移除未使用的依赖。</strong></p><p>实际上，我们使用预定义的规则或编写自定义规则。然后，我们配置插件将它们视为违规或忽略它们。Linter 在大多数 Gradle 任务的最后运行。</p><p><strong>默认情况下，它不会直接修改代码，而是显示警告。</strong> 这很有帮助，因为其他 Gradle 任务不会因插件而失败。此外，这些警告不会丢失，因为它们在日志的最后可见。</p><p>此外，<em>gradle-lint</em> 提供了一个 <em>fixGradleLint</em> 命令，可以自动修复大多数 Lint 违规。</p><p><strong>在内部，Gradle Lint 插件利用 Groovy AST 和 Gradle Model 应用 Lint 规则。</strong> 这表明插件与 Groovy AST 紧密耦合。因此，<strong>插件不支持 Kotlin 构建脚本。</strong></p><h2 id="_3-设置" tabindex="-1"><a class="header-anchor" href="#_3-设置"><span>3. 设置</span></a></h2><p><strong>有三种方法可以设置 Gradle Lint 插件：在 <em>build.gradle</em> 中，初始化脚本或脚本插件。</strong> 让我们分别探索它们。</p><h3 id="_3-1-使用-build-gradle" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-build-gradle"><span>3.1. 使用 <em>build.gradle</em></span></a></h3><p>让我们将 <em>gradle-lint</em> 插件添加到我们的 <em>build.gradle</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>plugins {
    id &quot;nebula.lint&quot; version &quot;17.8.0&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在使用多模块项目时，插件应该应用于根项目。</strong> 由于我们将使用多模块项目，让我们将插件应用于根项目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>allprojects {
    apply plugin :&quot;nebula.lint&quot;
    gradleLint {
        rules = [] // 我们将这里添加规则
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>稍后，我们将在 <em>gradleLint.rules</em> 数组中添加 Lint 规则。</p><h3 id="_3-2-使用初始化脚本" tabindex="-1"><a class="header-anchor" href="#_3-2-使用初始化脚本"><span>3.2. 使用初始化脚本</span></a></h3><p>除了 <em>build.gradle</em>，我们可以使用初始化脚本来配置我们的插件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>import com.netflix.nebula.lint.plugin.GradleLintPlugin

initscript {
    repositories { mavenCentral() }
    dependencies {
        classpath &#39;com.netflix.nebula:gradle-lint-plugin:17.8.0&#39;
    }
}

allprojects {
    apply plugin: GradleLintPlugin
    gradleLint {
        rules=[]
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 <em>lint.gradle</em> 脚本与我们之前的设置相同。要应用它，我们将 <em>–init-script</em> 标志传递给我们的任务：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>./gradlew build --init-script lint.gradle
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>一个有趣的用例是根据任务运行的环境传递不同的初始化脚本。</strong> 缺点是我们将始终需要传递 <em>–init-script</em> 标志。</p><h3 id="_3-3-使用脚本插件" tabindex="-1"><a class="header-anchor" href="#_3-3-使用脚本插件"><span>3.3. 使用脚本插件</span></a></h3><p>让我们直接将脚本插件应用到我们的 <em>build.gradle</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>plugins{
    id &quot;nebula.lint&quot; version &quot;17.8.0&quot;
}
apply from: &quot;gradle-lint-intro.gradle&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>gradle-lint-intro.gradle</em> 的内容将被注入，就好像它是构建脚本的一部分：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>allprojects {
    apply plugin: &quot;nebula.lint&quot;
    gradleLint {
        rules= []
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本文中，我们将在 <em>build.gradle</em> 脚本中保持我们的 <em>gradle-lint</em> 配置。</p><h2 id="_4-配置" tabindex="-1"><a class="header-anchor" href="#_4-配置"><span>4. 配置</span></a></h2><p>让我们回顾一下 <em>gradle-lint</em> 插件中可用的不同配置选项。</p><h3 id="_4-1-执行" tabindex="-1"><a class="header-anchor" href="#_4-1-执行"><span>4.1. 执行</span></a></h3><p><strong>执行 Gradle Lint 插件的命令是 <em>./gradlew lintGradle</em>。</strong> 我们可以单独调用它，或者在另一个任务中调用。</p><p><strong>默认情况下，插件自动在所有任务的最后运行</strong>，除了这些 - <em>help</em>, <em>tasks</em>, <em>dependencies</em>, <em>dependencyInsight</em>, <em>components</em>, <em>model</em>, <em>projects</em>, <em>wrapper</em> 和 <em>properties</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>./gradlew build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个 <em>build</em> 任务最终通过调用 <em>./gradlew lintGradle.</em> 来结束。Linter 将违规显示为警告。</p><p>此外，我们可以<strong>通过应用 <em>skipForTask</em> 方法来防止 Linter 在特定任务中运行</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradleLint {
    skipForTask(&#39;build&#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们阻止插件在构建任务期间运行。</p><p>如果我们想<strong>禁用插件的所有任务，我们可以使用 <em>alwaysRun</em> 标志</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradleLint {
    alwaysRun = false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这在我们想要在特定时间点单独调用 <em>./gradlew lintGradle</em> 时特别有用。</p><p><strong>重要的是要注意，在隔离中调用插件将标记 Lint 违规为错误，而不是警告。</strong></p><h3 id="_4-2-规则定义" tabindex="-1"><a class="header-anchor" href="#_4-2-规则定义"><span>4.2. 规则定义</span></a></h3><p>Gradle Lint 插件允许我们配置两组规则：违规规则（通过 <em>rules</em> 和 <em>critcalRules</em> 选项）和忽略规则（使用 <em>excludedRules</em>, <em>ignore</em> 和 <em>fixme</em> 属性）。让我们探索它们。</p><p>首先，<em>rules</em> 属性接受一个 Lint 规则数组。<strong>当规则定义的违规被满足时，Linter 会发出警告。</strong> 但是，如果 Gradle Lint 插件在隔离中运行，这些警告会导致构建失败。</p><p>接下来，让我探索 <em>criticalRules</em> 选项。<strong>当我们想要规则违规触发任务失败时，我们将规则添加到 <em>gradleLint.criticalRules</em> 属性。</strong> 插件提供了一个特定的 <em>criticalLintGradle</em> 任务，仅用于 Lint 关键规则：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>./gradlew criticalLintGradle -PgradleLint.criticalRules=undeclared-dependency
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，<em>-PgradleLint.criticalRules</em> 选项将 <em>undeclared-dependency</em> 规则添加到 <em>criticalRules</em>。然后，<em>criticalLintGradle</em> 任务仅 Lint 定义在 <em>criticalRules</em> 中的规则。</p><p>继续，<em>excludedRules</em> 选项接受一个要忽略的规则列表。当我们想要从一组规则中忽略特定规则时，它非常方便：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradleLint {
    rules= [&#39;all-dependency&#39;]
    excludedRules= [&#39;undeclared-dependency&#39;]
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们从之前的 <em>all-dependency</em> 组规则中排除了 <em>undeclared-dependency</em> 规则。组规则允许我们一次性应用一组规则。</p><p>最后，我们可以通过 <em>ignore</em> 属性来防止 Linter 扫描构建文件的部分内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>dependencies {
    testImplementation(&#39;junit:junit:4.13.1&#39;)
    gradleLint.ignore(&#39;dependency-parentheses&#39;) {
        implementation(&quot;software.amazon.awssdk:sts&quot;)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们故意保护 <em>aws-sts</em> 免受 <em>dependency-parenthesis</em> 规则的影响。当我们运行 Linter 时，它不会被列出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>warning   dependency-parentheses             parentheses are unnecessary for dependencies
gradle-lint-intro/build.gradle:11
testImplementation(&#39;junit:junit:4.13.1&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>dependency-parentheses</em> 警告反对在 Gradle 依赖声明中不必要地使用括号。</p><p>此外，如果我们想要暂时忽略一个规则，我们可以将 <em>ignore</em> 替换为 <em>fixme</em> 属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradleLint.fixme(&#39;2029-04-23&#39;, &#39;dependency-parentheses&#39;) {
    implementation(&#39;software.amazon.awssdk:sts&#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<em>aws-sts</em> 依赖将在 2029 年 4 月 23 日之后触发未使用依赖违规。</p><p><strong>重要的是要注意，<em>ignore</em> 和 <em>fixme</em> 属性仅对已解析的依赖有效。它们不适用于构建文件中的包装声明：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>dependencies {
    gradleLint.ignore(&#39;unused-dependency&#39;) {
        implementation &quot;software.amazon.awssdk:sts&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们故意保护 <em>aws-sts</em> 免受未使用依赖规则的影响。我们没有直接在代码中使用它。但出于某种原因，它需要由 AWS <em>WebIdentityTokenCredentialsProvider</em> 要求。不幸的是，Linter 不会捕获它，因为它不评估未解析的依赖。</p><h3 id="_4-3-覆盖配置属性" tabindex="-1"><a class="header-anchor" href="#_4-3-覆盖配置属性"><span>4.3. 覆盖配置属性</span></a></h3><p>Gradle Lint 允许我们在命令行中覆盖一些配置属性。我们通过使用 <em>-PgradleLint</em> 选项，然后是任何有效的文件配置选项来实现。</p><p>让我们将 <em>unused-dependency</em> 规则添加到我们最初的空 <em>rules</em> 数组中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>gradleLint {
    rules= [&#39;unused-dependency&#39;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们通过命令行排除它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>./gradlew lintGradle -PgradleLint.excludedRules=unused-dependency

This is equivalent to setting _excludedRules=\\[&quot;unused-dependency&quot;\\]_ in the configuration file.

We can use this pattern for all the other properties, especially when running in CI environments. Multiple values should be comma-separated.

## 5. Built-in Rules

**The Gradle Lint plugin has several built-in lint rules.** Let&#39;s explore some of them.

### 5.1. Minimum Dependency Version Rule

First, let&#39;s see the _minimum-dependency-version_ rule. It shows violations for dependencies that have a strictly lower version than a predefined one:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>gradleLint { rules= [&#39;minimum-dependency-version&#39;] }</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
We&#39;ll need to provide the comma-separated list of minimum dependency versions in the _minVersions_ property. But, as of this writing, the _GradleLintExtension_ doesn&#39;t have the _minVersions_ property. Therefore, let&#39;s set it via the command line:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>./gradlew lintGradle -PgradleLint.minVersions=junit:junit:5.0.0</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
Here, the linter warns against the use of _junit_ versions lower than _5.0.0_:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Task :lintGradle FAILED</p></blockquote><p>This project contains lint violations. A complete listing of the violations follows. Because none were serious, the build&#39;s overall status was unaffected.</p><p>warning minimum-dependency-version junit:junit is below the minimum version of 5.0.0 (no auto-fix available). See https://github.com/nebula-plugins/gradle-lint-plugin/wiki/Minimum-Dependency-Version-Rule for more details</p><p>? 1 problem (0 errors, 1 warning)</p><p>To apply fixes automatically, run fixGradleLint, review, and commit the changes.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
Running _./gradlew fixGradleLint_ effectively updates _junit_ versions to _5.0.0._

### 5.2. Undeclared Dependency Rule

Next, we&#39;ll learn about the _undeclared-dependency_ rule. It ensures we have explicitly declared transitive dependencies that we directly use in our code:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>gradleLint { rules= [&#39;undeclared-dependency&#39;] }</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
Now, let&#39;s execute the _lintGradle_ task:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Task :lintGradle FAILED</p></blockquote><p>This project contains lint violations. A complete listing of the violations follows. Because none were serious, the build&#39;s overall status was unaffected.</p><p>warning undeclared-dependency one or more classes in org.hamcrest:hamcrest-core:1.3 are required by your code directly</p><p>warning undeclared-dependency one or more classes in org.apache.httpcomponents:httpcore:4.4.13 are required by your code directly</p><p>? 2 problems (0 errors, 2 warnings)</p><p>To apply fixes automatically, run fixGradleLint, review, and commit the changes.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
We can see that we have two dependencies directly required by our code. The linter adds them after we run the _fixlintGradle_ task:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Task :fixLintGradle</p></blockquote><p>This project contains lint violations. A complete listing of my attempt to fix them follows. Please review and commit the changes.</p><p>fixed undeclared-dependency one or more classes in org.hamcrest:hamcrest-core:1.3 are required by your code directly</p><p>fixed undeclared-dependency one or more classes in org.apache.httpcomponents:httpcore:4.4.13 are required by your code directly</p><p>Corrected 2 lint problems</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
Besides, as of this writing, **it’s impossible to feed custom rules to the plugin**. An alternative could be to fork the library and add custom rules directly.

Finally, we should be careful when using outdated rules. The _archaic-wrapper_ rule was removed in 2018. Some sections of the documentation are yet to be updated.

## 6. Generating Reports

Now, let&#39;s generate reports using the _generateGradleLintReport_ task:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>./gradlew generateGradleLintReport</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
By default, the report format is HTML. The plugin places all report files in the _build/reports/gradleLint_ folder. Our HTML report will be named _gradle-5.html_, where _gradle-5_ is our root project name.

The other available options are _xml_ and _text_:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>gradleLint { reportFormat = &#39;text&#39; reportOnlyFixableViolations = true }</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
We’ve used the _reportFormat_ property to directly output the report in plain text. Additionally, our report only contains fixable violations thanks to the activated _reportOnlyFixableViolations_ flag.

## 7. Conclusion

In this article, we explored the _gradle-lint_ plugin. First, we saw its utility. Then, we listed the different configuration options. Next, we used some predefined rules. Finally, we generated lint reports.

As always, the code for this article is available over on GitHub.

[![Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com/)
[![Author Avatar](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g)](https://www.baeldung.com/)
[![Author Avatar](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g)](https://www.baeldung.com/)

OK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,97),d=[l];function s(r,c){return i(),n("div",null,d)}const m=e(a,[["render",s],["__file","2024-06-30-Intro to Gradle Lint Plugin.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Intro%20to%20Gradle%20Lint%20Plugin.html","title":"Gradle Lint 插件介绍","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Gradle"],"tag":["Gradle Lint","插件"],"head":[["meta",{"name":"keywords","content":"Gradle Lint, 插件, 配置, 规则, 报告"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Intro%20to%20Gradle%20Lint%20Plugin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Gradle Lint 插件介绍"}],["meta",{"property":"og:description","content":"Gradle Lint 插件介绍 在本文中，我们将探索 Gradle Lint 插件。 首先，我们将看到何时使用它。然后，我们将逐步了解插件的配置选项。接下来，我们将使用一些预定义的规则。最后，我们将生成 Lint 报告。 2. Gradle Lint 插件是什么？ Gradle Lint 插件有助于对 Gradle 配置文件进行 Lint 检查。 它..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T10:35:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gradle Lint"}],["meta",{"property":"article:tag","content":"插件"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T10:35:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradle Lint 插件介绍\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T10:35:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Gradle Lint 插件介绍 在本文中，我们将探索 Gradle Lint 插件。 首先，我们将看到何时使用它。然后，我们将逐步了解插件的配置选项。接下来，我们将使用一些预定义的规则。最后，我们将生成 Lint 报告。 2. Gradle Lint 插件是什么？ Gradle Lint 插件有助于对 Gradle 配置文件进行 Lint 检查。 它..."},"headers":[{"level":2,"title":"2. Gradle Lint 插件是什么？","slug":"_2-gradle-lint-插件是什么","link":"#_2-gradle-lint-插件是什么","children":[]},{"level":2,"title":"3. 设置","slug":"_3-设置","link":"#_3-设置","children":[{"level":3,"title":"3.1. 使用 build.gradle","slug":"_3-1-使用-build-gradle","link":"#_3-1-使用-build-gradle","children":[]},{"level":3,"title":"3.2. 使用初始化脚本","slug":"_3-2-使用初始化脚本","link":"#_3-2-使用初始化脚本","children":[]},{"level":3,"title":"3.3. 使用脚本插件","slug":"_3-3-使用脚本插件","link":"#_3-3-使用脚本插件","children":[]}]},{"level":2,"title":"4. 配置","slug":"_4-配置","link":"#_4-配置","children":[{"level":3,"title":"4.1. 执行","slug":"_4-1-执行","link":"#_4-1-执行","children":[]},{"level":3,"title":"4.2. 规则定义","slug":"_4-2-规则定义","link":"#_4-2-规则定义","children":[]},{"level":3,"title":"4.3. 覆盖配置属性","slug":"_4-3-覆盖配置属性","link":"#_4-3-覆盖配置属性","children":[]}]}],"git":{"createdTime":1719743702000,"updatedTime":1719743702000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.55,"words":2265},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Intro to Gradle Lint Plugin.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本文中，我们将探索 Gradle Lint 插件。\\n首先，我们将看到何时使用它。然后，我们将逐步了解插件的配置选项。接下来，我们将使用一些预定义的规则。最后，我们将生成 Lint 报告。</p>\\n<h2>2. Gradle Lint 插件是什么？</h2>\\n<p><strong>Gradle Lint 插件有助于对 Gradle 配置文件进行 Lint 检查。</strong> 它强制执行代码库中构建脚本的结构。该插件可以保持 Gradle Wrapper 版本的更新，防止构建文件中的不良实践，并<strong>移除未使用的依赖。</strong></p>\\n<p>实际上，我们使用预定义的规则或编写自定义规则。然后，我们配置插件将它们视为违规或忽略它们。Linter 在大多数 Gradle 任务的最后运行。</p>","autoDesc":true}');export{m as comp,p as data};
