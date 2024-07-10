import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as r}from"./app-BmeLisJw.js";const o={},n=r('<h1 id="使用java正则表达式从html标签提取文本" tabindex="-1"><a class="header-anchor" href="#使用java正则表达式从html标签提取文本"><span>使用Java正则表达式从HTML标签提取文本</span></a></h1><p>当在Java中处理HTML内容时，从HTML标签中提取特定文本是常见的需求。尽管通常不推荐使用正则表达式来解析HTML，因为它的结构复杂，但在某些简单任务中，这有时是足够的。</p><p>在本教程中，我们将看到如何使用Java中的正则表达式从HTML标签中提取文本。</p><h2 id="_2-使用pattern和matcher类" tabindex="-1"><a class="header-anchor" href="#_2-使用pattern和matcher类"><span>2. 使用Pattern和Matcher类</span></a></h2><p>Java提供了来自java.util.regex的Pattern和Matcher类，允许我们定义并应用正则表达式来从字符串中提取文本。以下是一个使用正则表达式从指定HTML标签中提取文本的示例：</p><p>在这里，我们首先定义了HTML内容，表示为htmlContent，其中包含带有<code>&lt;b&gt;</code>标签的HTML。此外，我们指定了标签名tagName为“b”，以从<code>&lt;b&gt;</code>标签中提取文本。</p><p>然后，我们使用compile()方法编译正则表达式pattern，其中patternString是“<code>&lt;b&gt;</code>(.*?)<code>&lt;/b&gt;</code>”以匹配并提取<code>&lt;b&gt;</code>标签内的文本。之后，我们使用while循环和find()方法迭代所有匹配项，并将它们添加到名为extractedTexts的列表中。</p><p>最后，我们断言从<code>&lt;b&gt;</code>标签中提取了两个文本（“Baeldung”和“extracting text”）。</p><h2 id="_3-使用jsoup进行html解析和提取" tabindex="-1"><a class="header-anchor" href="#_3-使用jsoup进行html解析和提取"><span>3. 使用JSoup进行HTML解析和提取</span></a></h2><p>对于更复杂的HTML解析任务，特别是涉及嵌套标签的任务，推荐使用像JSoup这样的专用库。让我们演示如何使用JSoup从<code>&lt;p&gt;</code>标签中提取文本，包括处理嵌套标签：</p><p>在这里，我们使用parse()方法解析htmlContent字符串，将其转换为Document对象。接下来，我们在doc对象上使用select()方法来选择解析文档中的所有<code>&lt;p&gt;</code>元素。</p><p>随后，我们遍历所选的paragraphElements集合，使用paragraphElement.text()方法从每个<code>&lt;p&gt;</code>元素中提取文本内容。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总之，我们已经探索了在Java中从HTML标签提取文本的不同方法。首先，我们讨论了使用Pattern和Matcher类进行基于正则表达式的文本提取。此外，我们还研究了利用JSoup进行更复杂的HTML解析任务。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>',15),c=[n];function p(l,i){return a(),e("div",null,c)}const m=t(o,[["render",p],["__file","Extract Text From a HTML Tag with Regex.html.vue"]]),s=JSON.parse('{"path":"/posts/baeldung/Archive/Extract%20Text%20From%20a%20HTML%20Tag%20with%20Regex.html","title":"使用Java正则表达式从HTML标签提取文本","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java","HTML"],"tag":["正则表达式","文本提取"],"description":"使用Java正则表达式从HTML标签提取文本 当在Java中处理HTML内容时，从HTML标签中提取特定文本是常见的需求。尽管通常不推荐使用正则表达式来解析HTML，因为它的结构复杂，但在某些简单任务中，这有时是足够的。 在本教程中，我们将看到如何使用Java中的正则表达式从HTML标签中提取文本。 2. 使用Pattern和Matcher类 Java...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Extract%20Text%20From%20a%20HTML%20Tag%20with%20Regex.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java正则表达式从HTML标签提取文本"}],["meta",{"property":"og:description","content":"使用Java正则表达式从HTML标签提取文本 当在Java中处理HTML内容时，从HTML标签中提取特定文本是常见的需求。尽管通常不推荐使用正则表达式来解析HTML，因为它的结构复杂，但在某些简单任务中，这有时是足够的。 在本教程中，我们将看到如何使用Java中的正则表达式从HTML标签中提取文本。 2. 使用Pattern和Matcher类 Java..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"正则表达式"}],["meta",{"property":"article:tag","content":"文本提取"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java正则表达式从HTML标签提取文本\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 使用Pattern和Matcher类","slug":"_2-使用pattern和matcher类","link":"#_2-使用pattern和matcher类","children":[]},{"level":2,"title":"3. 使用JSoup进行HTML解析和提取","slug":"_3-使用jsoup进行html解析和提取","link":"#_3-使用jsoup进行html解析和提取","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":1.99,"words":596},"filePathRelative":"posts/baeldung/Archive/Extract Text From a HTML Tag with Regex.md","localizedDate":"2024年6月15日","excerpt":"\\n<p>当在Java中处理HTML内容时，从HTML标签中提取特定文本是常见的需求。尽管通常不推荐使用正则表达式来解析HTML，因为它的结构复杂，但在某些简单任务中，这有时是足够的。</p>\\n<p>在本教程中，我们将看到如何使用Java中的正则表达式从HTML标签中提取文本。</p>\\n<h2>2. 使用Pattern和Matcher类</h2>\\n<p>Java提供了来自java.util.regex的Pattern和Matcher类，允许我们定义并应用正则表达式来从字符串中提取文本。以下是一个使用正则表达式从指定HTML标签中提取文本的示例：</p>\\n<p>在这里，我们首先定义了HTML内容，表示为htmlContent，其中包含带有<code>&lt;b&gt;</code>标签的HTML。此外，我们指定了标签名tagName为“b”，以从<code>&lt;b&gt;</code>标签中提取文本。</p>","autoDesc":true}');export{m as comp,s as data};
