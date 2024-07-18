import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-CE5go3V-.js";const i={},d=n('<h1 id="如何使用java-hashmap读写文件" tabindex="-1"><a class="header-anchor" href="#如何使用java-hashmap读写文件"><span>如何使用Java HashMap读写文件</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在开发软件时，经常需要将内存中的对象写入文件，并反之，将文件内容读入对象。对于基本类型和<code>String</code>值来说这很简单，但处理数据结构和对象时就变得复杂了。</p><p>Java中一个常见的数据结构是<code>HashMap</code>。在本教程中，我们将介绍三种使用<code>HashMap</code>数据读写文件的方法：<strong>Java <code>Properties</code>类，Java对象序列化，以及使用第三方库进行JSON序列化。</strong></p><h2 id="_2-使用java-properties类" tabindex="-1"><a class="header-anchor" href="#_2-使用java-properties类"><span>2. 使用Java <code>Properties</code>类</span></a></h2><p>一个常见的应用是属性文件，它包含代表应用程序配置的键值对<code>String</code>。Java <code>Properties</code>类非常适合处理基于<code>String</code>的<code>HashMap</code>。例如，让我们创建一个学生数据的映射：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map``&lt;String, String&gt;`` studentData = new HashMap&lt;&gt;();\nstudentData.put(&quot;student.firstName&quot;, &quot;Henry&quot;);\nstudentData.put(&quot;student.lastName&quot;, &quot;Winter&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Properties</code>类实现了<code>Map``&lt;Object, Object&gt;```，所以很容易从</code>HashMap`中读取所有值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Properties props = new Properties();\nprops.putAll(studentData);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以创建一个临时文件，并使用<code>store</code>方法将<code>Properties</code>对象写入文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>File file = File.createTempFile(&quot;student&quot;, &quot;.data&quot;);\ntry (OutputStream output = Files.newOutputStream(file.toPath())) {\n    props.store(output, null);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法需要一个<code>OutputStream</code>（或<code>Writer</code>）和一个可选的<code>String</code>来向文件添加注释。在这里，我们可以传入<code>null</code>。如果我们查看我们创建的文件，我们可以看到我们的学生数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>student.firstName: Henry\nstudent.lastName: Winter\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>要将文件内容读回一个<code>Properties</code>对象，我们可以使用<code>load</code>方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Properties propsFromFile = new Properties();\ntry (InputStream input = Files.newInputStream(file.toPath())) {\n    propsFromFile.load(input);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于<code>Properties</code>实现了<code>Map``&lt;Object, Object&gt;```（但只包含</code>String<code>键和值），我们可以通过流式</code>stringPropertyNames`并将结果收集回一个映射来获取我们原始的映射：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HashMap``&lt;String, String&gt;`` studentDataFromProps = propsFromFile.stringPropertyNames()\n  .stream()\n  .collect(Collectors.toMap(key -&gt; key, props::getProperty));\nassertThat(studentDataFromProps).isEqualTo(studentData);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>Properties</code>很简单，但前提是我们处理的是一个具有<code>String</code>键和值的<code>HashMap</code>。对于其他映射，我们需要使用另一种策略。</p><h2 id="_3-使用对象序列化" tabindex="-1"><a class="header-anchor" href="#_3-使用对象序列化"><span>3. 使用对象序列化</span></a></h2><p>Java提供了<code>Serializable</code>，这是一个接口，用于将对象转换为字节流并从字节流转换回对象。让我们定义一个包含学生数据的自定义类<code>Student</code>。我们将让它实现<code>Serializable</code>（并根据文档推荐设置一个<code>serialVersionUID</code>）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Student implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String firstName;\n    private String lastName;\n\n    // 标准的getter, setter, equals和hashCode方法\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将创建一个学生ID到<code>Student</code>实例的映射：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````&lt;Integer, Student&gt;``````` studentData = new HashMap&lt;&gt;();\nstudentData.put(1234, new Student(&quot;Henry&quot;, &quot;Winter&quot;));\nstudentData.put(5678, new Student(&quot;Richard&quot;, &quot;Papen&quot;));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以使用<code>ObjectOutputStream</code>将<code>HashMap</code>写入文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>File file = File.createTempFile(&quot;student&quot;, &quot;.data&quot;);\ntry (FileOutputStream fileOutput = new FileOutputStream(file);\n  ObjectOutputStream objectStream = new ObjectOutputStream(fileOutput)) {\n    objectStream.writeObject(studentData);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个文件将包含二进制数据，不是人类可读的。为了验证我们的文件是否正确，我们可以使用<code>ObjectInputStream</code>将其读回一个<code>HashMap</code>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````&lt;Integer, Student&gt;``````` studentsFromFile;\ntry (FileInputStream fileReader = new FileInputStream(file);\n  ObjectInputStream objectStream = new ObjectInputStream(fileReader)) {\n    studentsFromFile = (HashMap```````&lt;Integer, Student&gt;```````) objectStream.readObject();\n}\nassertThat(studentsFromFile).isEqualTo(studentData);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们需要将<code>readObject</code>的结果转换回<code>HashMap```````&lt;Integer, Student&gt;````````。我们在这里忽略了未经检查的转换警告，因为文件将只包含我们的</code>HashMap`，但类型安全性应该被考虑用于操作代码。</p><p><code>Serializable</code>提供了一种相对简单的方法来序列化和反序列化文件中的<code>HashMap</code>，但并不总是能够以这种方式序列化一个类——特别是如果我们处理的是一个我们无法修改的类。幸运的是，还有一个选择。</p><h2 id="_4-使用json库" tabindex="-1"><a class="header-anchor" href="#_4-使用json库"><span>4. 使用JSON库</span></a></h2><p>JSON是指定数据键值对的广泛使用的格式。Java有几个开源库可用于处理JSON。JSON的一个优点是它是人类可读的——我们上面学生数据的JSON表示看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{\n    1234: {\n        &quot;firstName&quot;: &quot;Henry&quot;,\n        &quot;lastName&quot;: &quot;Winter&quot;\n    },\n    5678: {\n        &quot;firstName&quot;: &quot;Richard&quot;,\n        &quot;lastName&quot;: &quot;Papen&quot;\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们将使用两个最著名的库，Jackson和Gson，将我们的<code>HashMap</code>转换为JSON文件。</p><h3 id="_4-1-jackson" tabindex="-1"><a class="header-anchor" href="#_4-1-jackson"><span>4.1. Jackson</span></a></h3><p>Jackson是Java中JSON序列化的常见选择。我们只覆盖序列化我们简单数据结构所必需的基础知识——更多信息，请参见我们的Jackson教程。</p><p>使用上面的相同映射的学生数据，我们可以创建一个Jackson<code>ObjectMapper</code>并使用它将我们的<code>HashMap</code>作为JSON写入文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ObjectMapper mapper = new ObjectMapper();\nFile file = File.createTempFile(&quot;student&quot;, &quot;.data&quot;);\ntry (FileOutputStream fileOutput = new FileOutputStream(file)) {\n    mapper.writeValue(fileOutput, studentData);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，我们可以使用<code>ObjectMapper</code>将文件读回一个新的<code>HashMap</code>实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````&lt;Integer, Student&gt;``````` mapFromFile;\ntry (FileInputStream fileInput = new FileInputStream(file)) {\n    TypeReference&lt;HashMap```````&lt;Integer, Student&gt;```````&gt; mapType\n      = new TypeReference&lt;HashMap```````&lt;Integer, Student&gt;```````&gt;() {};\n    mapFromFile = mapper.readValue(fileInput, mapType);\n}\nassertThat(mapFromFile).isEqualTo(studentData);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为<code>HashMap</code>是一个参数化类型，我们必须创建一个<code>TypeReference</code>，以便Jackson知道如何将JSON文件反序列化为`HashMap```````&lt;Integer, Student&gt;````````。</p><p>在序列化过程中，不需要对<code>Student</code>类进行特殊接口或类修改——我们甚至可以放弃使用<code>Serializable</code>接口。然而，同样重要的是要注意，在反序列化期间，Jackson要求类具有默认的无参数构造函数。尽管许多类提供了一个，但这个要求如果类不能更改可能是一个问题。</p><h3 id="_4-2-gson" tabindex="-1"><a class="header-anchor" href="#_4-2-gson"><span>4.2. Gson</span></a></h3><p>Gson是JSON序列化的另一个常见选择。</p><p>我们将再次使用我上面的映射，并定义一个<code>Gson</code>实例将其序列化为JSON文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Gson gson = new Gson();\nFile file = File.createTempFile(&quot;student&quot;, &quot;.data&quot;);\ntry (FileWriter writer = new FileWriter(file)) {\n    gson.toJson(studentData, writer);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将文件读回一个<code>HashMap</code>实例很简单：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map```````&lt;Integer, Student&gt;``````` studentsFromFile;\ntry (FileReader reader = new FileReader(file)) {\n    Type mapType = new TypeToken&lt;HashMap```````&lt;Integer, Student&gt;```````&gt;() {}.getType();\n    studentsFromFile = gson.fromJson(reader, mapType);\n}\nassertThat(studentsFromFile).isEqualTo(studentData);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与Jackson类似，Gson需要类型信息来反序列化参数化的<code>HashMap</code>——这是通过使用Gson的<code>TypeToken</code>提供的Java反射API<code>Type</code>。</p><p>Gson具有相同的默认构造函数要求，但提供了<code>InstanceCreator</code>接口来协助在未提供的情况下。</p><h2 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5. 总结</span></a></h2><p>在本教程中，我们讨论了三种使用<code>HashMap</code>数据读写文件的方法。</p><p>对于简单的<code>String</code>映射，Java <code>Properties</code>为我们提供了一个简单的解决方案。对象序列化是Java的另一个核心特性，它为我们提供了更多的灵活性，用于我们可以修改的类。对于我们无法编辑的类（或者如果我们需要一个人类可读的格式），像Jackson和Gson这样的开源库为JSON序列化提供了有用的工具。</p><p>如往常一样，所有代码都可以在GitHub上找到。</p><p>OK</p>',54),s=[d];function r(l,o){return a(),t("div",null,s)}const u=e(i,[["render",r],["__file","2024-06-27-How to Write and Read a File with a Java HashMap.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-How%20to%20Write%20and%20Read%20a%20File%20with%20a%20Java%20HashMap.html","title":"如何使用Java HashMap读写文件","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Java","编程"],"tag":["HashMap","文件读写"],"head":[["meta",{"name":"keywords","content":"Java, HashMap, 文件读写, 序列化, JSON, Properties"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-How%20to%20Write%20and%20Read%20a%20File%20with%20a%20Java%20HashMap.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Java HashMap读写文件"}],["meta",{"property":"og:description","content":"如何使用Java HashMap读写文件 1. 概述 在开发软件时，经常需要将内存中的对象写入文件，并反之，将文件内容读入对象。对于基本类型和String值来说这很简单，但处理数据结构和对象时就变得复杂了。 Java中一个常见的数据结构是HashMap。在本教程中，我们将介绍三种使用HashMap数据读写文件的方法：Java Properties类，J..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T23:30:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"文件读写"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T23:30:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Java HashMap读写文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T23:30:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Java HashMap读写文件 1. 概述 在开发软件时，经常需要将内存中的对象写入文件，并反之，将文件内容读入对象。对于基本类型和String值来说这很简单，但处理数据结构和对象时就变得复杂了。 Java中一个常见的数据结构是HashMap。在本教程中，我们将介绍三种使用HashMap数据读写文件的方法：Java Properties类，J..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用Java Properties类","slug":"_2-使用java-properties类","link":"#_2-使用java-properties类","children":[]},{"level":2,"title":"3. 使用对象序列化","slug":"_3-使用对象序列化","link":"#_3-使用对象序列化","children":[]},{"level":2,"title":"4. 使用JSON库","slug":"_4-使用json库","link":"#_4-使用json库","children":[{"level":3,"title":"4.1. Jackson","slug":"_4-1-jackson","link":"#_4-1-jackson","children":[]},{"level":3,"title":"4.2. Gson","slug":"_4-2-gson","link":"#_4-2-gson","children":[]}]},{"level":2,"title":"5. 总结","slug":"_5-总结","link":"#_5-总结","children":[]}],"git":{"createdTime":1719531012000,"updatedTime":1719531012000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.45,"words":1636},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-How to Write and Read a File with a Java HashMap.md","localizedDate":"2024年6月28日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在开发软件时，经常需要将内存中的对象写入文件，并反之，将文件内容读入对象。对于基本类型和<code>String</code>值来说这很简单，但处理数据结构和对象时就变得复杂了。</p>\\n<p>Java中一个常见的数据结构是<code>HashMap</code>。在本教程中，我们将介绍三种使用<code>HashMap</code>数据读写文件的方法：<strong>Java <code>Properties</code>类，Java对象序列化，以及使用第三方库进行JSON序列化。</strong></p>\\n<h2>2. 使用Java <code>Properties</code>类</h2>","autoDesc":true}');export{u as comp,v as data};
