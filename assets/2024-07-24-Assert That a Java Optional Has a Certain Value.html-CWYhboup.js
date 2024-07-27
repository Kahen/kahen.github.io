import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-CBerKIce.js";const p={},e=t('<h1 id="断言java-optional具有特定值" tabindex="-1"><a class="header-anchor" href="#断言java-optional具有特定值"><span>断言Java Optional具有特定值</span></a></h1><ol><li><p><strong>概述</strong> 当我们测试返回_Optional_对象的方法时，我们可能需要编写断言来检查_Optional_是否具有值，或者检查其内部的值。</p><p>在这个简短的教程中，我们将看看如何使用来自JUnit和AssertJ的函数来编写这些断言。</p></li><li><p><strong>测试Optional是否为空或非空</strong> 如果我们只需要找出_Optional_是否有值，我们可以对_isPresent_或_isEmpty_进行断言。</p><h3 id="_2-1-测试-optional-具有值" tabindex="-1"><a class="header-anchor" href="#_2-1-测试-optional-具有值"><span>2.1 测试_Optional_具有值</span></a></h3><p>如果一个_Optional_有值，我们可以对_Optional.isPresent_进行断言：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，AssertJ库提供了一种更流畅的表达方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>optional<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-测试optional为空" tabindex="-1"><a class="header-anchor" href="#_2-2-测试optional为空"><span>2.2 测试Optional为空</span></a></h3><p>当使用JUnit时，我们可以反转逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，从Java 11开始，我们可以使用_Optional.isEmpty_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，AssertJ也为我们提供了一个整洁的替代方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>optional<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>测试_Optional_的值</strong> 通常我们想要测试_Optional_内部的值，而不仅仅是存在或不存在。</p><h3 id="_3-1-使用-junit-断言" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-junit-断言"><span>3.1 使用_JUnit_断言</span></a></h3><p>我们可以使用_Optional.get_来提供值，然后在该值上编写断言：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` optional <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">,</span> optional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，使用_get_可能会引发异常，这使得测试失败更难理解。因此，我们可能更倾向于首先断言值是否存在：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">,</span> optional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<strong>_Optional_支持equals方法</strong>，所以我们可以使用一个具有正确值的_Optional_作为一般等式断言的一部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` expected <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` actual <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用-assertj" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-assertj"><span>3.2 使用_AssertJ_</span></a></h3><p>使用AssertJ，<strong>我们可以使用_hasValue_流畅的断言</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasValue</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>结论</strong> 在这篇文章中，我们探讨了几种测试_Optional_的方法。</p><p>我们看到了如何使用内置的JUnit断言与_isPresent_和_get_。我们还看到了_Optional.equals_如何为我们的断言提供了一种比较_Optional_对象的方法。</p><p>最后，我们看到了AssertJ断言，它为我们提供了一种流畅的语言来检查我们的_Optional_值。</p><p>正如往常一样，本文中呈现的代码可以在GitHub上找到。--- date: 2022-04-01 category:</p></li></ol><ul><li>Java</li><li>Testing tag:</li><li>Java Optional</li><li>AssertJ</li><li>JUnit head:</li><li><ul><li>meta</li><li>name: keywords content: Java Optional, AssertJ, JUnit, Testing</li></ul></li></ul><hr><h1 id="断言java-optional具有特定值-1" tabindex="-1"><a class="header-anchor" href="#断言java-optional具有特定值-1"><span>断言Java Optional具有特定值</span></a></h1><ol><li><p><strong>概述</strong> 当我们测试返回_Optional_对象的方法时，我们可能需要编写断言来检查_Optional_是否具有值，或者检查其内部的值。</p><p>在这个简短的教程中，我们将看看如何使用来自JUnit和AssertJ的函数来编写这些断言。</p></li><li><p><strong>测试Optional是否为空或非空</strong> 如果我们只需要找出_Optional_是否有值，我们可以对_isPresent_或_isEmpty_进行断言。</p><h3 id="_2-1-测试-optional-具有值-1" tabindex="-1"><a class="header-anchor" href="#_2-1-测试-optional-具有值-1"><span>2.1 测试_Optional_具有值</span></a></h3><p>如果一个_Optional_有值，我们可以对_Optional.isPresent_进行断言：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，AssertJ库提供了一种更流畅的表达方式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>optional<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-测试optional为空-1" tabindex="-1"><a class="header-anchor" href="#_2-2-测试optional为空-1"><span>2.2 测试Optional为空</span></a></h3><p>当使用JUnit时，我们可以反转逻辑：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertFalse</span><span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，从Java 11开始，我们可以使用_Optional.isEmpty_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，AssertJ也为我们提供了一个整洁的替代方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span>optional<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>测试_Optional_的值</strong> 通常我们想要测试_Optional_内部的值，而不仅仅是存在或不存在。</p><h3 id="_3-1-使用-junit-断言-1" tabindex="-1"><a class="header-anchor" href="#_3-1-使用-junit-断言-1"><span>3.1 使用_JUnit_断言</span></a></h3><p>我们可以使用_Optional.get_来提供值，然后在该值上编写断言：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` optional <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">,</span> optional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，使用_get_可能会引发异常，这使得测试失败更难理解。因此，我们可能更倾向于首先断言值是否存在：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertTrue</span><span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">,</span> optional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<strong>_Optional_支持equals方法</strong>，所以我们可以使用一个具有正确值的_Optional_作为一般等式断言的一部分：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` expected <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Optional</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` actual <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span>expected<span class="token punctuation">,</span> actual<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用-assertj-1" tabindex="-1"><a class="header-anchor" href="#_3-2-使用-assertj-1"><span>3.2 使用_AssertJ_</span></a></h3><p>使用AssertJ，<strong>我们可以使用_hasValue_流畅的断言</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasValue</span><span class="token punctuation">(</span><span class="token string">&quot;SOMEVALUE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>结论</strong> 在这篇文章中，我们探讨了几种测试_Optional_的方法。</p><p>我们看到了如何使用内置的JUnit断言与_isPresent_和_get_。我们还看到了_Optional.equals_如何为我们的断言提供了一种比较_Optional_对象的方法。</p><p>最后，我们看到了AssertJ断言，它为我们提供了一种流畅的语言来检查我们的_Optional_值。</p><p>正如往常一样，本文中呈现的代码可以在GitHub上找到。</p></li></ol><p>OK</p>',7),o=[e];function c(i,l){return s(),n("div",null,o)}const k=a(p,[["render",c],["__file","2024-07-24-Assert That a Java Optional Has a Certain Value.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Assert%20That%20a%20Java%20Optional%20Has%20a%20Certain%20Value.html","title":"断言Java Optional具有特定值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Testing"],"tag":["Java Optional","AssertJ","JUnit"],"head":[["meta",{"name":"keywords","content":"Java Optional, AssertJ, JUnit, Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Assert%20That%20a%20Java%20Optional%20Has%20a%20Certain%20Value.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"断言Java Optional具有特定值"}],["meta",{"property":"og:description","content":"断言Java Optional具有特定值 概述 当我们测试返回_Optional_对象的方法时，我们可能需要编写断言来检查_Optional_是否具有值，或者检查其内部的值。 在这个简短的教程中，我们将看看如何使用来自JUnit和AssertJ的函数来编写这些断言。 测试Optional是否为空或非空 如果我们只需要找出_Optional_是否有值，我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T11:18:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Optional"}],["meta",{"property":"article:tag","content":"AssertJ"}],["meta",{"property":"article:tag","content":"JUnit"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T11:18:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"断言Java Optional具有特定值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T11:18:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"断言Java Optional具有特定值 概述 当我们测试返回_Optional_对象的方法时，我们可能需要编写断言来检查_Optional_是否具有值，或者检查其内部的值。 在这个简短的教程中，我们将看看如何使用来自JUnit和AssertJ的函数来编写这些断言。 测试Optional是否为空或非空 如果我们只需要找出_Optional_是否有值，我..."},"headers":[],"git":{"createdTime":1721819919000,"updatedTime":1721819919000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.79,"words":1137},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Assert That a Java Optional Has a Certain Value.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>\\n<p><strong>概述</strong>\\n当我们测试返回_Optional_对象的方法时，我们可能需要编写断言来检查_Optional_是否具有值，或者检查其内部的值。</p>\\n<p>在这个简短的教程中，我们将看看如何使用来自JUnit和AssertJ的函数来编写这些断言。</p>\\n</li>\\n<li>\\n<p><strong>测试Optional是否为空或非空</strong>\\n如果我们只需要找出_Optional_是否有值，我们可以对_isPresent_或_isEmpty_进行断言。</p>\\n<h3>2.1 测试_Optional_具有值</h3>\\n<p>如果一个_Optional_有值，我们可以对_Optional.isPresent_进行断言：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span>optional<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isPresent</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div><p>然而，AssertJ库提供了一种更流畅的表达方式：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token function\\">assertThat</span><span class=\\"token punctuation\\">(</span>optional<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isNotEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div><h3>2.2 测试Optional为空</h3>\\n<p>当使用JUnit时，我们可以反转逻辑：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token function\\">assertFalse</span><span class=\\"token punctuation\\">(</span>optional<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isPresent</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div><p>此外，从Java 11开始，我们可以使用_Optional.isEmpty_：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span>optional<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div><p>然而，AssertJ也为我们提供了一个整洁的替代方案：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token function\\">assertThat</span><span class=\\"token punctuation\\">(</span>optional<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div></li>\\n<li>\\n<p><strong>测试_Optional_的值</strong>\\n通常我们想要测试_Optional_内部的值，而不仅仅是存在或不存在。</p>\\n<h3>3.1 使用_JUnit_断言</h3>\\n<p>我们可以使用_Optional.get_来提供值，然后在该值上编写断言：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Optional</span>``````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`````` optional <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Optional</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"SOMEVALUE\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"SOMEVALUE\\"</span><span class=\\"token punctuation\\">,</span> optional<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div><p>然而，使用_get_可能会引发异常，这使得测试失败更难理解。因此，我们可能更倾向于首先断言值是否存在：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token function\\">assertTrue</span><span class=\\"token punctuation\\">(</span>optional<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isPresent</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"SOMEVALUE\\"</span><span class=\\"token punctuation\\">,</span> optional<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div><p>然而，<strong>_Optional_支持equals方法</strong>，所以我们可以使用一个具有正确值的_Optional_作为一般等式断言的一部分：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">Optional</span>``````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`````` expected <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Optional</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"SOMEVALUE\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\">Optional</span>``````<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`````` actual <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Optional</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"SOMEVALUE\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">assertEquals</span><span class=\\"token punctuation\\">(</span>expected<span class=\\"token punctuation\\">,</span> actual<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div><h3>3.2 使用_AssertJ_</h3>\\n<p>使用AssertJ，<strong>我们可以使用_hasValue_流畅的断言</strong>：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token function\\">assertThat</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Optional</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">of</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"SOMEVALUE\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">hasValue</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"SOMEVALUE\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div></li>\\n<li>\\n<p><strong>结论</strong>\\n在这篇文章中，我们探讨了几种测试_Optional_的方法。</p>\\n<p>我们看到了如何使用内置的JUnit断言与_isPresent_和_get_。我们还看到了_Optional.equals_如何为我们的断言提供了一种比较_Optional_对象的方法。</p>\\n<p>最后，我们看到了AssertJ断言，它为我们提供了一种流畅的语言来检查我们的_Optional_值。</p>\\n<p>正如往常一样，本文中呈现的代码可以在GitHub上找到。---\\ndate: 2022-04-01\\ncategory:</p>\\n</li>\\n</ol>","autoDesc":true}');export{k as comp,d as data};
