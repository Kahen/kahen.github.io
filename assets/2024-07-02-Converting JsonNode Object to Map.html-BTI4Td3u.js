import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as o}from"./app-C2EXT5sr.js";const n={},p=o('<h1 id="jsonnode-对象转换为-map-baeldung" tabindex="-1"><a class="header-anchor" href="#jsonnode-对象转换为-map-baeldung"><span>JSONNode 对象转换为 Map | Baeldung</span></a></h1><p>在现代软件开发中，不同系统之间的数据交换是一个常见需求。一种流行的数据交换格式是 JSON（JavaScript 对象表示法）。JSON 的主要用途是在网络连接上高效地在服务器和 Web 应用程序之间发送有组织的数据。它作为数据传输的便捷格式。</p><p>此外，JSON 经常用于 Web 服务和 API 中，以一致且标准化的方式提供公共数据。其灵活性使得它可以轻松地与各种编程语言、平台和技术集成。</p><p>处理 JSON 时，Java 编程中的一个常见任务是将 JSON 对象（由 JsonNode 表示）转换为 Map 结构，以便于操作和访问。</p><p>在本教程的后续部分中，我们将探索并演示使用 Jackson 和 Gson 库将 JsonNode 对象转换为 Map 的两种方法。</p><p>将 JsonNode 转换为 Map 是将 JSON 数据表示为具有键和值的结构的一种方式，类似于字典，其中键是字符串，值可以是其他 JSON 元素或简单数据类型。具体来说，这种转换对开发人员特别有用，因为它允许他们使用熟悉的 Java Map 和 List 接口来处理 JSON 数据，使数据操作更加直接和直观。</p><p>在我们的示例场景中，我们有一个名为 jsonString 的 Java 字符串，它保存了一个 JSON 格式的数据结构，创建了一个具有诸如 &quot;id&quot;、&quot;name&quot;、&quot;email&quot;、&quot;age&quot;、&quot;address&quot;、&quot;skills&quot; 和 &quot;isActive&quot; 等各种属性的 JSON 对象。</p><p>以下是 JSON 对象的分解：</p><p>要实现将此 jsonString 转换为 Java Map，我们将使用两个流行的 Java 库，Jackson 和 Gson。这些库提供了易于使用的处理 JSON 数据序列化和反序列化的方法。</p><h3 id="使用-jackson-库" tabindex="-1"><a class="header-anchor" href="#使用-jackson-库"><span>使用 Jackson 库</span></a></h3><p>Jackson 是一个广泛使用的 Java 库，它使处理 JSON 数据变得轻松。它为解析和序列化 JSON 提供了强大的支持。</p><p>要使用 Jackson，让我们首先将其依赖项添加到我们的 pom.xml 文件中：</p><p>然后，我们将使用 Jackson 的 ObjectMapper 类将 JsonNode 转换为 Java Map：</p><p>代码首先创建一个 ObjectMapper 实例，它负责读写 JSON 数据。然后，提供的 JSON 字符串使用 readTree() 方法转换为 JsonNode 对象。此外，convertValue() 方法将 JsonNode 转换为 Map<code>&lt;String, Object&gt;</code>，使用键值对轻松访问 JSON 数据。</p><p>代码然后执行一系列断言，以验证提取的值，检查预期值是否与转换后的 Map 中的值匹配。JSON 结构中的嵌套对象通过将相应值转换为 Map<code>&lt;String, Object&gt;</code> 来访问，而列表则通过将它们转换为 List<code>&lt;String&gt;</code> 来访问。最后的断言验证与 isActive 键相关联的值。</p><p>总的来说，代码说明了我们如何使用 Jackson 的 ObjectMapper 将 JSON 数据转换为 Map 并执行数据验证。</p><h3 id="使用-gson-库" tabindex="-1"><a class="header-anchor" href="#使用-gson-库"><span>使用 Gson 库</span></a></h3><p>Gson 是 Java 中另一个流行的 JSON 处理库。它提供了一个简单灵活的 API，用于将 JSON 转换为 Java 对象。</p><p>要使用 Gson 将 JsonNode 对象转换为 Map，首先，我们应该将 Gson 依赖项添加到 pom.xml 文件中：</p><p>接下来，我们将编写一个测试方法，该方法利用 Gson 库将 JsonNode 转换为 Java Map：</p><p>根据上述测试方法，Gson 的 JsonParser 类用于解析 JSON 字符串并将其转换为 JsonElement 对象。然后，创建一个 Gson 实例以将 JsonElement 转换为 Map<code>&lt;String, Object&gt;</code>。</p><p>代码包括几个断言，以验证转换后的 Map 是否包含预期值。例如，它检查与键 id 相关联的值是否等于 123456，以及与键 name 相关联的值是否等于 John Doe。</p><p>嵌套对象，如 address 对象，可以通过将 Map 中的相应值转换为 Map<code>&lt;String, Object&gt;</code> 来访问。同样，skills 数组可以通过将其值转换为 List<code>&lt;String&gt;</code> 来访问。与前一个示例一样，添加了一个新的断言，以确认与键 isActive 相关联的值是否等于 true。</p><p>此代码演示了 Gson 库将 JsonNode 转换为 Java Map 并对提取的值进行断言的能力。</p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>将 JsonNode 对象转换为 Map 是在 Java 中处理 JSON 数据时的一个常见需求。我们可以轻松地使用 Jackson 或 Gson 等库执行此转换。</p><p>在本教程中，我们提供了详细的示例以及测试用例，以演示使用 Jackson 和 Gson 库将 JsonNode 对象转换为 Map 的过程。通过应用这些示例，我们可以有效地处理 JSON 数据并进行操作。</p><p>如常，本文的完整代码示例可以在 GitHub 上找到。</p>',28),s=[p];function c(r,d){return t(),a("div",null,s)}const l=e(n,[["render",c],["__file","2024-07-02-Converting JsonNode Object to Map.html.vue"]]),N=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Converting%20JsonNode%20Object%20to%20Map.html","title":"JSONNode 对象转换为 Map | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JSON"],"tag":["Jackson","Gson"],"head":[["meta",{"name":"keywords","content":"JSONNode, Map, Jackson, Gson, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Converting%20JsonNode%20Object%20to%20Map.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JSONNode 对象转换为 Map | Baeldung"}],["meta",{"property":"og:description","content":"JSONNode 对象转换为 Map | Baeldung 在现代软件开发中，不同系统之间的数据交换是一个常见需求。一种流行的数据交换格式是 JSON（JavaScript 对象表示法）。JSON 的主要用途是在网络连接上高效地在服务器和 Web 应用程序之间发送有组织的数据。它作为数据传输的便捷格式。 此外，JSON 经常用于 Web 服务和 API..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T20:54:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Jackson"}],["meta",{"property":"article:tag","content":"Gson"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T20:54:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JSONNode 对象转换为 Map | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T20:54:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JSONNode 对象转换为 Map | Baeldung 在现代软件开发中，不同系统之间的数据交换是一个常见需求。一种流行的数据交换格式是 JSON（JavaScript 对象表示法）。JSON 的主要用途是在网络连接上高效地在服务器和 Web 应用程序之间发送有组织的数据。它作为数据传输的便捷格式。 此外，JSON 经常用于 Web 服务和 API..."},"headers":[{"level":3,"title":"使用 Jackson 库","slug":"使用-jackson-库","link":"#使用-jackson-库","children":[]},{"level":3,"title":"使用 Gson 库","slug":"使用-gson-库","link":"#使用-gson-库","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1719953660000,"updatedTime":1719953660000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.99,"words":1198},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Converting JsonNode Object to Map.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在现代软件开发中，不同系统之间的数据交换是一个常见需求。一种流行的数据交换格式是 JSON（JavaScript 对象表示法）。JSON 的主要用途是在网络连接上高效地在服务器和 Web 应用程序之间发送有组织的数据。它作为数据传输的便捷格式。</p>\\n<p>此外，JSON 经常用于 Web 服务和 API 中，以一致且标准化的方式提供公共数据。其灵活性使得它可以轻松地与各种编程语言、平台和技术集成。</p>\\n<p>处理 JSON 时，Java 编程中的一个常见任务是将 JSON 对象（由 JsonNode 表示）转换为 Map 结构，以便于操作和访问。</p>\\n<p>在本教程的后续部分中，我们将探索并演示使用 Jackson 和 Gson 库将 JsonNode 对象转换为 Map 的两种方法。</p>","autoDesc":true}');export{l as comp,N as data};
