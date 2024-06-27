import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DRCKM-lz.js";const e={},p=t(`<h1 id="在java中将outputstream转换为字节数组" tabindex="-1"><a class="header-anchor" href="#在java中将outputstream转换为字节数组"><span>在Java中将OutputStream转换为字节数组</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p>处理流是常见的任务，尤其是在进行输入和输出操作时。偶尔，我们需要将<code>OutputStream</code>转换为字节数组。这在网络编程、文件处理或数据操作等多种场景中都非常有用。</p><p>在本教程中，我们将探讨两种实现这种转换的方法。</p><h2 id="_2-使用apache-commons-io库中的fileutils" tabindex="-1"><a class="header-anchor" href="#_2-使用apache-commons-io库中的fileutils"><span><strong>2. 使用Apache Commons IO库中的FileUtils</strong></span></a></h2><p>Apache Commons IO库提供了<code>FileUtils</code>类，其中包含了<code>readFileToByteArray()</code>方法，可以间接地将<code>FileOutputStream</code>转换为字节数组。这是通过首先写入文件，然后从文件系统中读取生成的字节来实现的。</p><p>要使用这个库，我们首先需要将以下Commons IO依赖项添加到我们的项目中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`commons-io\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`commons-io\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`2.11.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过一个简单的例子来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenFileOutputStream_whenUsingFileUtilsToReadTheFile_thenReturnByteArray</span><span class="token punctuation">(</span><span class="token annotation punctuation">@TempDir</span> <span class="token class-name">Path</span> tempDir<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;Welcome to Baeldung!&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token string">&quot;file.txt&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Path</span> filePath <span class="token operator">=</span> tempDir<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileOutputStream</span> outputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>filePath<span class="token punctuation">.</span><span class="token function">toFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> writtenData <span class="token operator">=</span> <span class="token class-name">FileUtils</span><span class="token punctuation">.</span><span class="token function">readFileToByteArray</span><span class="token punctuation">(</span>filePath<span class="token punctuation">.</span><span class="token function">toFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>writtenData<span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试方法中，我们初始化了一个字符串<code>data</code>和一个<code>filePath</code>。此外，我们使用<code>FileOutputStream</code>将字符串的字节表示写入文件。<strong>随后，我们使用<code>FileUtils.readFileToByteArray()</code>方法有效地将文件的内容转换为字节数组。</strong></p><p>最后，字节数组被转换回字符串，并通过断言确认原始<code>data</code>和<code>result</code>的相等性。</p><p>需要注意的是，<strong>这种方法仅适用于<code>FileOutputStream</code></strong>，因为我们可以在流关闭后检查写入的文件。对于适用于不同类型<code>OutputStream</code>的更通用解决方案，下一节将介绍另一种方法，提供更广泛的适用性。</p><h2 id="_3-使用自定义的drainableoutputstream" tabindex="-1"><a class="header-anchor" href="#_3-使用自定义的drainableoutputstream"><span><strong>3. 使用自定义的DrainableOutputStream</strong></span></a></h2><p>另一种方法涉及创建一个自定义的<code>DrainableOutputStream</code>类，该类扩展了<code>FilterOutputStream</code>。这个类<strong>拦截写入底层<code>OutputStream</code>的字节，并将副本保留在内存中，允许稍后转换为字节数组。</strong></p><p>首先，让我们创建一个扩展<code>FilterOutputStream</code>的自定义类<code>DrainableOutputStream</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DrainableOutputStream</span> <span class="token keyword">extends</span> <span class="token class-name">FilterOutputStream</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ByteArrayOutputStream</span> buffer<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">DrainableOutputStream</span><span class="token punctuation">(</span><span class="token class-name">OutputStream</span> out<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>out<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">byte</span> b<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        buffer<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> buffer<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们首先声明了一个将包装给定<code>OutputStream</code>的<code>DrainableOutputStream</code>类。我们包括了一个<code>ByteArrayOutputStream</code> <code>buffer</code>来累积写入的字节副本，以及一个重写的<code>write()</code>方法来捕获字节。我们还实现了<code>toByteArray()</code>方法来提供对捕获字节的访问。</p><p>现在，让我们使用<code>DrainableOutputStream</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenSystemOut_whenUsingDrainableOutputStream_thenReturnByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;Welcome to Baeldung!\\n&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">DrainableOutputStream</span> drainableOutputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DrainableOutputStream</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span>drainableOutputStream<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        drainableOutputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> writtenData <span class="token operator">=</span> drainableOutputStream<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>writtenData<span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试方法中，我们首先初始化了一串我们想要写入<code>OutputStream</code>的<code>data</code>字符串。**然后我们使用<code>DrainableOutputStream</code>来拦截这个过程，通过在实际写入<code>OutputStream</code>之前捕获字节。**累积的字节随后使用<code>toByteArray()</code>方法转换为字节数组。</p><p>随后，我们从<code>intercepted</code>字节数组创建了一个新的字符串<code>result</code>，并断言它与原始<code>data</code>的相等性。</p><p><strong>请注意，一个全面的<code>DrainableOutputStream</code>实现需要为示例中显示之外的其他写入方法提供类似的重写。</strong></p><h2 id="_4-考虑和限制" tabindex="-1"><a class="header-anchor" href="#_4-考虑和限制"><span><strong>4. 考虑和限制</strong></span></a></h2><p>虽然前几节中介绍的方法为将<code>OutputStream</code>转换为字节数组提供了实用的方法，但<strong>必须承认与此任务相关的某些考虑和限制。</strong></p><p>将任意<code>OutputStream</code>转换为字节数组通常不是直接的操作，因为在写入字节后可能无法或不实际检索字节。</p><p>某些子类，如<code>FileOutputStream</code>或<code>ByteArrayOutputStream</code>，具有内置机制，允许我们检索输出字节，例如内存缓冲区或已写入的文件。另一方面，如果没有这样的输出字节副本可用，我们可能需要考虑使用<code>DrainableOutputStream</code>这样的技术，在写入字节时复制它们。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span><strong>5. 结论</strong></span></a></h2><p>总之，在编程中，将<code>OutputStream</code>转换为Java中的字节数组可能是一个有用的操作。我们看到了如何使用Apache Commons IO库中的<code>FileUtils.readFileToByteArray()</code>读取<code>FileOutputStream</code>生成的文件，以及使用自定义的<code>DrainableOutputStream</code>来复制给定<code>OutputStream</code>的写入字节的更通用方法。</p><p>如常，相应的源代码可以在GitHub上找到。</p>`,30),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-25-Convert an OutputStream to a Byte Array in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-Convert%20an%20OutputStream%20to%20a%20Byte%20Array%20in%20Java.html","title":"在Java中将OutputStream转换为字节数组","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Java","IO"],"tag":["OutputStream","Byte Array"],"head":[["meta",{"name":"keywords","content":"Java, OutputStream, Byte Array, Conversion, Apache Commons IO, FileUtils, DrainableOutputStream"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-Convert%20an%20OutputStream%20to%20a%20Byte%20Array%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中将OutputStream转换为字节数组"}],["meta",{"property":"og:description","content":"在Java中将OutputStream转换为字节数组 1. 引言 处理流是常见的任务，尤其是在进行输入和输出操作时。偶尔，我们需要将OutputStream转换为字节数组。这在网络编程、文件处理或数据操作等多种场景中都非常有用。 在本教程中，我们将探讨两种实现这种转换的方法。 2. 使用Apache Commons IO库中的FileUtils Apa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T23:26:38.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OutputStream"}],["meta",{"property":"article:tag","content":"Byte Array"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T23:26:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中将OutputStream转换为字节数组\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T23:26:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中将OutputStream转换为字节数组 1. 引言 处理流是常见的任务，尤其是在进行输入和输出操作时。偶尔，我们需要将OutputStream转换为字节数组。这在网络编程、文件处理或数据操作等多种场景中都非常有用。 在本教程中，我们将探讨两种实现这种转换的方法。 2. 使用Apache Commons IO库中的FileUtils Apa..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用Apache Commons IO库中的FileUtils","slug":"_2-使用apache-commons-io库中的fileutils","link":"#_2-使用apache-commons-io库中的fileutils","children":[]},{"level":2,"title":"3. 使用自定义的DrainableOutputStream","slug":"_3-使用自定义的drainableoutputstream","link":"#_3-使用自定义的drainableoutputstream","children":[]},{"level":2,"title":"4. 考虑和限制","slug":"_4-考虑和限制","link":"#_4-考虑和限制","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719357998000,"updatedTime":1719357998000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.77,"words":1130},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-Convert an OutputStream to a Byte Array in Java.md","localizedDate":"2024年6月26日","excerpt":"\\n<h2><strong>1. 引言</strong></h2>\\n<p>处理流是常见的任务，尤其是在进行输入和输出操作时。偶尔，我们需要将<code>OutputStream</code>转换为字节数组。这在网络编程、文件处理或数据操作等多种场景中都非常有用。</p>\\n<p>在本教程中，我们将探讨两种实现这种转换的方法。</p>\\n<h2><strong>2. 使用Apache Commons IO库中的FileUtils</strong></h2>\\n<p>Apache Commons IO库提供了<code>FileUtils</code>类，其中包含了<code>readFileToByteArray()</code>方法，可以间接地将<code>FileOutputStream</code>转换为字节数组。这是通过首先写入文件，然后从文件系统中读取生成的字节来实现的。</p>","autoDesc":true}');export{d as comp,k as data};
