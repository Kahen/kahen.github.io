import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DpYLEM_u.js";const p={},e=t(`<h1 id="java中将字节数组转换为multipartfile" tabindex="-1"><a class="header-anchor" href="#java中将字节数组转换为multipartfile"><span>Java中将字节数组转换为MultipartFile</span></a></h1><p>在本教程中，我们将探讨如何将字节数组转换为MultipartFile。</p><p>MultipartFile是Spring提供的接口，用于接收多个请求块中的文件，因此我们需要一些实现来实例化一个MultipartFile对象。Spring没有为代码提供任何默认实现，但它确实提供了一个用于测试目的的实现。</p><h3 id="_2-实现multipartfile接口" tabindex="-1"><a class="header-anchor" href="#_2-实现multipartfile接口"><span>2. 实现MultipartFile接口</span></a></h3><p>让我们为我们自己的MultipartFile接口创建实现，并包装输入的字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomMultipartFile</span> <span class="token keyword">implements</span> <span class="token class-name">MultipartFile</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> input<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getOriginalFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getContentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//我们在下一个代码片段中定义了其余的接口方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们在类中定义了一个字节数组属性，以便我们可以捕获输入的值。</strong> 此外，我们已经覆盖了上面的接口方法，这些方法取决于实现细节。因此，文件名或内容类型的详细信息可以作为自定义逻辑提供。结果，我们在这里返回了_null_。</p><p>我们还为我们类中所需的其他接口方法提供了自己的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomMultipartFile</span> <span class="token keyword">implements</span> <span class="token class-name">MultipartFile</span> <span class="token punctuation">{</span>

    <span class="token comment">//之前的方法</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> input <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> input<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> input<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> input<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">InputStream</span> <span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transferTo</span><span class="token punctuation">(</span><span class="token class-name">File</span> destination<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalStateException</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>destination<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些方法可能不需要任何自定义逻辑，因此我们已经在类中定义了它们。有几种不同的方法可以实现_transferTo(File destination)_方法。让我们在下面看看其中的一些：</p><p>我们可以使用Java NIO：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transferTo</span><span class="token punctuation">(</span><span class="token class-name">File</span> destination<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalStateException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Path</span> path <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>destination<span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个选择是添加Apache commons IO依赖到我们的POM并使用_FileUtils_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transferTo</span><span class="token punctuation">(</span><span class="token class-name">File</span> destination<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalStateException</span> <span class="token punctuation">{</span>
    <span class="token class-name">FileUtils</span><span class="token punctuation">.</span><span class="token function">writeByteArrayToFile</span><span class="token punctuation">(</span>destination<span class="token punctuation">,</span> input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_transferTo(File destination)_方法在_MultipartFile_只需要写入到_File_时非常有用</strong>，并且有几种方法可以将_MultipartFile_写入到_File_。</p><p>现在我们已经定义了我们的类，让我们用一个小型测试用例来测试这个实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenProvidingByteArray_thenMultipartFileCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> inputArray <span class="token operator">=</span> <span class="token string">&quot;Test String&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">CustomMultipartFile</span> customMultipartFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomMultipartFile</span><span class="token punctuation">(</span>inputArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertFalse</span><span class="token punctuation">(</span>customMultipartFile<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>inputArray<span class="token punctuation">,</span> customMultipartFile<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>inputArray<span class="token punctuation">.</span>length<span class="token punctuation">,</span>customMultipartFile<span class="token punctuation">.</span><span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们已经成功地将我们的字节数组转换为上面的测试用例中的MultipartFile实例。</strong></p><h3 id="_3-mockmultipartfile" tabindex="-1"><a class="header-anchor" href="#_3-mockmultipartfile"><span>3. MockMultipartFile</span></a></h3><p>Spring提供了MockMultipartFile用于测试目的，以访问Multipart请求。</p><p>让我们创建一个测试来看看它是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">whenProvidingByteArray_thenMockMultipartFileCreated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> inputArray <span class="token operator">=</span> <span class="token string">&quot;Test String&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MockMultipartFile</span> mockMultipartFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockMultipartFile</span><span class="token punctuation">(</span><span class="token string">&quot;tempFileName&quot;</span><span class="token punctuation">,</span>inputArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertFalse</span><span class="token punctuation">(</span>mockMultipartFile<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertArrayEquals</span><span class="token punctuation">(</span>inputArray<span class="token punctuation">,</span> mockMultipartFile<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>inputArray<span class="token punctuation">.</span>length<span class="token punctuation">,</span>mockMultipartFile<span class="token punctuation">.</span><span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经成功地使用了Spring提供的MockMultipartFile对象将字节数组转换为MultipartFile对象。</p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本教程中，我们涵盖了如何将字节数组转换为MultipartFile对象。</p><p>和往常一样，所有的代码示例都可以在GitHub上找到。</p>`,26),o=[e];function i(l,c){return s(),a("div",null,o)}const k=n(p,[["render",i],["__file","2024-07-10-Convert byte   to MultipartFile in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Convert%20byte%20%20%20to%20MultipartFile%20in%20Java.html","title":"Java中将字节数组转换为MultipartFile","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["MultipartFile","byte array"],"head":[["meta",{"name":"keywords","content":"Java, MultipartFile, byte array, Spring, 文件上传"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Convert%20byte%20%20%20to%20MultipartFile%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字节数组转换为MultipartFile"}],["meta",{"property":"og:description","content":"Java中将字节数组转换为MultipartFile 在本教程中，我们将探讨如何将字节数组转换为MultipartFile。 MultipartFile是Spring提供的接口，用于接收多个请求块中的文件，因此我们需要一些实现来实例化一个MultipartFile对象。Spring没有为代码提供任何默认实现，但它确实提供了一个用于测试目的的实现。 2...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T08:43:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MultipartFile"}],["meta",{"property":"article:tag","content":"byte array"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T08:43:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字节数组转换为MultipartFile\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T08:43:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字节数组转换为MultipartFile 在本教程中，我们将探讨如何将字节数组转换为MultipartFile。 MultipartFile是Spring提供的接口，用于接收多个请求块中的文件，因此我们需要一些实现来实例化一个MultipartFile对象。Spring没有为代码提供任何默认实现，但它确实提供了一个用于测试目的的实现。 2...."},"headers":[{"level":3,"title":"2. 实现MultipartFile接口","slug":"_2-实现multipartfile接口","link":"#_2-实现multipartfile接口","children":[]},{"level":3,"title":"3. MockMultipartFile","slug":"_3-mockmultipartfile","link":"#_3-mockmultipartfile","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720601003000,"updatedTime":1720601003000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.56,"words":768},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Convert byte   to MultipartFile in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨如何将字节数组转换为MultipartFile。</p>\\n<p>MultipartFile是Spring提供的接口，用于接收多个请求块中的文件，因此我们需要一些实现来实例化一个MultipartFile对象。Spring没有为代码提供任何默认实现，但它确实提供了一个用于测试目的的实现。</p>\\n<h3>2. 实现MultipartFile接口</h3>\\n<p>让我们为我们自己的MultipartFile接口创建实现，并包装输入的字节数组：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">CustomMultipartFile</span> <span class=\\"token keyword\\">implements</span> <span class=\\"token class-name\\">MultipartFile</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">byte</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> input<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Override</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">getName</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Override</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">getOriginalFilename</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token annotation punctuation\\">@Override</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">getContentType</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token comment\\">//我们在下一个代码片段中定义了其余的接口方法</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
