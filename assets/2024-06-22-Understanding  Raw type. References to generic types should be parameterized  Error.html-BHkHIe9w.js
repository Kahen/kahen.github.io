import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-B6f8H54y.js";const r={},i=n('<h1 id="理解-原始类型-应参数化引用泛型类型-错误-baeldung" tabindex="-1"><a class="header-anchor" href="#理解-原始类型-应参数化引用泛型类型-错误-baeldung"><span>理解“原始类型：应参数化引用泛型类型”错误 | Baeldung</span></a></h1><p>原始类型是Java中的一个高级主题。它需要对参数化类有良好的理解，但可能仍然令人困惑。幸运的是，IDE可以在我们出错时帮助我们。特别是Eclipse IDE会在我们出错时发出警告。</p><p>在本教程中，我们将检查这个警告以及缓解问题的步骤。</p><p>考虑以下代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List strings = new ArrayList();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_List_和随后的_ArrayList_是参数化类型。我们可以在类声明中看到这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface List``&lt;E&gt;`` extends Collection``&lt;E&gt;`` {\n    // 类体\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**然而，当我们在没有参数化的情况下使用参数化类型时，它被称为原始类型。**这不仅减少了我们代码的灵活性，还可能引入微妙的错误。尽管在某些情况下，我们被迫使用原始类型，主要是为了向后兼容，但总的来说，这被认为是一种不良做法。</p><h2 id="_3-eclipse静态分析" tabindex="-1"><a class="header-anchor" href="#_3-eclipse静态分析"><span>3. Eclipse静态分析</span></a></h2><p>Eclipse IDE对原始类型发出抱怨，并突出显示代码中的问题部分：</p><p>如果我们将光标悬停在突出显示的代码上，我们将看到以下弹出窗口：</p><p>**这样，Eclipse帮助我们确保我们编写的代码不包含错误。**它在职业生涯的初期尤其有用。此外，它提供了一个快速修复菜单。这样，我们可以很容易地解决问题。</p><p>让我们参数化列表以避免警告：</p><p>从Java 5开始，我们不需要在两边添加参数化，我们可以使用菱形运算符。这对于长名称和使用多个类型参数化特别有用。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了Eclipse IDE发出“原始类型”弹出窗口的过程，以引起我们对参数化类使用不当的注意。这个弹出窗口提供了问题的快速修复方法，可以帮助我们更快地解决问题。</p><p>**IDE和静态分析工具帮助我们编写更干净的代码，避免明显的错误。**泛型是更高级的主题之一，IDE帮助我们识别微妙的问题。</p>',17),s=[i];function p(l,d){return a(),t("div",null,s)}const m=e(r,[["render",p],["__file","2024-06-22-Understanding  Raw type. References to generic types should be parameterized  Error.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Understanding%20%20Raw%20type.%20References%20to%20generic%20types%20should%20be%20parameterized%20%20Error.html","title":"理解“原始类型：应参数化引用泛型类型”错误 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","编程"],"tag":["Raw Type","Java Generics"],"head":[["meta",{"name":"keywords","content":"Java, Generics, Raw Type, IDE, Eclipse"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Understanding%20%20Raw%20type.%20References%20to%20generic%20types%20should%20be%20parameterized%20%20Error.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"理解“原始类型：应参数化引用泛型类型”错误 | Baeldung"}],["meta",{"property":"og:description","content":"理解“原始类型：应参数化引用泛型类型”错误 | Baeldung 原始类型是Java中的一个高级主题。它需要对参数化类有良好的理解，但可能仍然令人困惑。幸运的是，IDE可以在我们出错时帮助我们。特别是Eclipse IDE会在我们出错时发出警告。 在本教程中，我们将检查这个警告以及缓解问题的步骤。 考虑以下代码： _List_和随后的_ArrayLis..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T17:49:02.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Raw Type"}],["meta",{"property":"article:tag","content":"Java Generics"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T17:49:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"理解“原始类型：应参数化引用泛型类型”错误 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T17:49:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"理解“原始类型：应参数化引用泛型类型”错误 | Baeldung 原始类型是Java中的一个高级主题。它需要对参数化类有良好的理解，但可能仍然令人困惑。幸运的是，IDE可以在我们出错时帮助我们。特别是Eclipse IDE会在我们出错时发出警告。 在本教程中，我们将检查这个警告以及缓解问题的步骤。 考虑以下代码： _List_和随后的_ArrayLis..."},"headers":[{"level":2,"title":"3. Eclipse静态分析","slug":"_3-eclipse静态分析","link":"#_3-eclipse静态分析","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719078542000,"updatedTime":1719078542000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.96,"words":588},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Understanding  Raw type. References to generic types should be parameterized  Error.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>原始类型是Java中的一个高级主题。它需要对参数化类有良好的理解，但可能仍然令人困惑。幸运的是，IDE可以在我们出错时帮助我们。特别是Eclipse IDE会在我们出错时发出警告。</p>\\n<p>在本教程中，我们将检查这个警告以及缓解问题的步骤。</p>\\n<p>考虑以下代码：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>List strings = new ArrayList();\\n</code></pre></div><p>_List_和随后的_ArrayList_是参数化类型。我们可以在类声明中看到这一点：</p>","autoDesc":true}');export{m as comp,g as data};
