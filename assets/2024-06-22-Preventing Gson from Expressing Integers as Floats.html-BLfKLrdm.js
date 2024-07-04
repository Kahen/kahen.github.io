import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o,a as n}from"./app-BOJj4F50.js";const s={},a=n('<h1 id="防止gson将整数表示为浮点数" tabindex="-1"><a class="header-anchor" href="#防止gson将整数表示为浮点数"><span>防止Gson将整数表示为浮点数</span></a></h1><p>Gson是由Google开发的库，非常适合将Java对象序列化和反序列化到JSON格式。除此之外，我们通常会碰到Gson在序列化对象时将整数显示为浮点数的问题。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p><strong>在本教程中，我们将了解为什么整数被视为浮点数。此外，我们将提供一个解决方案来防止Gson这样做。</strong></p><h2 id="_2-问题定义" tabindex="-1"><a class="header-anchor" href="#_2-问题定义"><span>2. 问题定义</span></a></h2><p>Gson将Java对象序列化为JSON。默认情况下，Gson将整数序列化为浮点数，以更准确地表示。这里有一个简单的例子：</p><p>现在，我们将使用Gson库将JSON字符串反序列化为<code>Hashtable</code>&lt;String, Object&gt;``对象列表。</p><p><strong>最后，我们使用<code>TypeToken</code>在反序列化期间获取泛型类型信息。</strong></p><p>响应将被格式化如下：</p><p>注意Gson将整数表示为浮点数。</p><h2 id="_3-gson中的默认数字策略" tabindex="-1"><a class="header-anchor" href="#_3-gson中的默认数字策略"><span>3. Gson中的默认数字策略</span></a></h2><p>Gson的默认数字策略旨在在表示数值时在准确性和灵活性之间取得平衡。<strong>使用浮点数表示整数的决定基于JSON缺乏明确支持区分整数和浮点类型的想法。</strong> 因此，Gson选择了一种默认策略，确保数值的精度得以保留。</p><p>然而，这种默认行为可能不符合特定要求或偏好，特别是当处理整数在JSON表示中应保持为整数的场景时。</p><h2 id="_4-使用setobjecttonumberstrategy-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用setobjecttonumberstrategy-方法"><span>4. 使用<code>setObjectToNumberStrategy()</code>方法</span></a></h2><p>使用Gson方法<code>setObjectToNumberStrategy()</code>，我们可以在反序列化过程中彻底控制对象到数字转换机制的功能。</p><p>让我们通过一个示例来探索这种能力：</p><p>在这里，使用<code>setObjectToNumberStrategy()</code>方法使我们能够为Gson设置策略，例如<code>ToNumberPolicy.LONG_OR_DOUBLE</code>，以指导其在数值方面的处理行为。最后，我们使用<code>assertEquals()</code>方法验证转换过程。</p><p><strong>此外，Gson中的<code>ToNumberPolicy</code>枚举支持处理数值的各种策略。除了我们在示例中使用的<code>ToNumberPolicy.LONG_OR_DOUBLE</code>外，其他策略包括：</strong></p><ul><li><strong><code>ToNumberPolicy.DOUBLE_ONLY</code>:</strong> 在反序列化期间将所有数值转换为double</li><li><strong><code>ToNumberPolicy.LONG_ONLY</code>:</strong> 在反序列化期间将所有数值转换为long</li><li><strong><code>ToNumberPolicy.DEFAULT</code>:</strong> 保留Gson的默认行为，将整数表示为浮点数</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了使用Gson时遇到的一个问题：在序列化过程中整数自动转换为浮点数。为了解决这个问题，我们使用了<code>setObjectToNumberStrategy()</code>方法。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>',22),r=[a];function i(c,l){return o(),t("div",null,r)}const g=e(s,[["render",i],["__file","2024-06-22-Preventing Gson from Expressing Integers as Floats.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Preventing%20Gson%20from%20Expressing%20Integers%20as%20Floats.html","title":"防止Gson将整数表示为浮点数","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","Gson"],"tag":["Serialization","Deserialization"],"head":[["meta",{"name":"keywords","content":"Gson, JSON, serialization, deserialization, integers, floating-point"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Preventing%20Gson%20from%20Expressing%20Integers%20as%20Floats.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"防止Gson将整数表示为浮点数"}],["meta",{"property":"og:description","content":"防止Gson将整数表示为浮点数 Gson是由Google开发的库，非常适合将Java对象序列化和反序列化到JSON格式。除此之外，我们通常会碰到Gson在序列化对象时将整数显示为浮点数的问题。 1. 引言 在本教程中，我们将了解为什么整数被视为浮点数。此外，我们将提供一个解决方案来防止Gson这样做。 2. 问题定义 Gson将Java对象序列化为JS..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T10:48:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Serialization"}],["meta",{"property":"article:tag","content":"Deserialization"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T10:48:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"防止Gson将整数表示为浮点数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T10:48:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"防止Gson将整数表示为浮点数 Gson是由Google开发的库，非常适合将Java对象序列化和反序列化到JSON格式。除此之外，我们通常会碰到Gson在序列化对象时将整数显示为浮点数的问题。 1. 引言 在本教程中，我们将了解为什么整数被视为浮点数。此外，我们将提供一个解决方案来防止Gson这样做。 2. 问题定义 Gson将Java对象序列化为JS..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 问题定义","slug":"_2-问题定义","link":"#_2-问题定义","children":[]},{"level":2,"title":"3. Gson中的默认数字策略","slug":"_3-gson中的默认数字策略","link":"#_3-gson中的默认数字策略","children":[]},{"level":2,"title":"4. 使用setObjectToNumberStrategy()方法","slug":"_4-使用setobjecttonumberstrategy-方法","link":"#_4-使用setobjecttonumberstrategy-方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719053332000,"updatedTime":1719053332000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.21,"words":664},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Preventing Gson from Expressing Integers as Floats.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>Gson是由Google开发的库，非常适合将Java对象序列化和反序列化到JSON格式。除此之外，我们通常会碰到Gson在序列化对象时将整数显示为浮点数的问题。</p>\\n<h2>1. 引言</h2>\\n<p><strong>在本教程中，我们将了解为什么整数被视为浮点数。此外，我们将提供一个解决方案来防止Gson这样做。</strong></p>\\n<h2>2. 问题定义</h2>\\n<p>Gson将Java对象序列化为JSON。默认情况下，Gson将整数序列化为浮点数，以更准确地表示。这里有一个简单的例子：</p>\\n<p>现在，我们将使用Gson库将JSON字符串反序列化为<code>Hashtable</code>&lt;String, Object&gt;``对象列表。</p>","autoDesc":true}');export{g as comp,h as data};
