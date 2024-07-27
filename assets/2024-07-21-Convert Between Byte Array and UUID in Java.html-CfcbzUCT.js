import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t(`<hr><h1 id="java中在字节数组和uuid之间转换" tabindex="-1"><a class="header-anchor" href="#java中在字节数组和uuid之间转换"><span>Java中在字节数组和UUID之间转换</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这篇简短的教程中，我们将看到如何在Java中<strong>在字节数组和_UUID_之间进行转换</strong>。</p><p>我们可以很容易地使用纯Java将_UUID_转换为字节数组：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">convertUUIDToBytes</span><span class="token punctuation">(</span><span class="token class-name">UUID</span> uuid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteBuffer</span> bb <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bb<span class="token punctuation">.</span><span class="token function">putLong</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span><span class="token function">getMostSignificantBits</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bb<span class="token punctuation">.</span><span class="token function">putLong</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span><span class="token function">getLeastSignificantBits</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> bb<span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-将字节数组转换为-uuid" tabindex="-1"><a class="header-anchor" href="#_3-将字节数组转换为-uuid"><span>3. 将字节数组转换为_UUID_</span></a></h2><p>将字节数组转换为_UUID_同样简单：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">UUID</span> <span class="token function">convertBytesToUUID</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ByteBuffer</span> byteBuffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> high <span class="token operator">=</span> byteBuffer<span class="token punctuation">.</span><span class="token function">getLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> low <span class="token operator">=</span> byteBuffer<span class="token punctuation">.</span><span class="token function">getLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UUID</span><span class="token punctuation">(</span>high<span class="token punctuation">,</span> low<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-测试我们的方法" tabindex="-1"><a class="header-anchor" href="#_4-测试我们的方法"><span>4. 测试我们的方法</span></a></h2><p>让我们测试我们的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">UUID</span> uuid <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Original UUID: &quot;</span> <span class="token operator">+</span> uuid<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token function">convertUUIDToBytes</span><span class="token punctuation">(</span>uuid<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Converted byte array: &quot;</span> <span class="token operator">+</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">UUID</span> uuidNew <span class="token operator">=</span> <span class="token function">convertBytesToUUID</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Converted UUID: &quot;</span> <span class="token operator">+</span> uuidNew<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果看起来可能是这样的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Original UUID: bd9c7f32-8010-4cfe-97c0-82371e3276fa
Converted byte array: [-67, -100, 127, 50, -128, 16, 76, -2, -105, -64, -126, 55, 30, 50, 118, -6]
Converted UUID: bd9c7f32-8010-4cfe-97c0-82371e3276fa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这个快速教程中，我们学习了如何在Java中<strong>在字节数组和_UUID_之间进行转换</strong>。</p><p>正如往常一样，本文的示例代码可以在GitHub上找到。</p>`,17),o=[p];function c(u,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-21-Convert Between Byte Array and UUID in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Convert%20Between%20Byte%20Array%20and%20UUID%20in%20Java.html","title":"Java中在字节数组和UUID之间转换","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","UUID"],"tag":["Java","UUID","Byte Array"],"head":[["meta",{"name":"keywords","content":"Java, UUID, Byte Array, Conversion"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Convert%20Between%20Byte%20Array%20and%20UUID%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中在字节数组和UUID之间转换"}],["meta",{"property":"og:description","content":"Java中在字节数组和UUID之间转换 1. 概述 在这篇简短的教程中，我们将看到如何在Java中在字节数组和_UUID_之间进行转换。 我们可以很容易地使用纯Java将_UUID_转换为字节数组： 3. 将字节数组转换为_UUID_ 将字节数组转换为_UUID_同样简单： 4. 测试我们的方法 让我们测试我们的方法： 结果看起来可能是这样的： 5. ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T14:42:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"UUID"}],["meta",{"property":"article:tag","content":"Byte Array"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T14:42:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中在字节数组和UUID之间转换\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T14:42:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中在字节数组和UUID之间转换 1. 概述 在这篇简短的教程中，我们将看到如何在Java中在字节数组和_UUID_之间进行转换。 我们可以很容易地使用纯Java将_UUID_转换为字节数组： 3. 将字节数组转换为_UUID_ 将字节数组转换为_UUID_同样简单： 4. 测试我们的方法 让我们测试我们的方法： 结果看起来可能是这样的： 5. ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 将字节数组转换为_UUID_","slug":"_3-将字节数组转换为-uuid","link":"#_3-将字节数组转换为-uuid","children":[]},{"level":2,"title":"4. 测试我们的方法","slug":"_4-测试我们的方法","link":"#_4-测试我们的方法","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721572923000,"updatedTime":1721572923000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":0.99,"words":297},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Convert Between Byte Array and UUID in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中在字节数组和UUID之间转换</h1>\\n<h2>1. 概述</h2>\\n<p>在这篇简短的教程中，我们将看到如何在Java中<strong>在字节数组和_UUID_之间进行转换</strong>。</p>\\n<p>我们可以很容易地使用纯Java将_UUID_转换为字节数组：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">byte</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token function\\">convertUUIDToBytes</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">UUID</span> uuid<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">ByteBuffer</span> bb <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">ByteBuffer</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">wrap</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token keyword\\">byte</span><span class=\\"token punctuation\\">[</span><span class=\\"token number\\">16</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    bb<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">putLong</span><span class=\\"token punctuation\\">(</span>uuid<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getMostSignificantBits</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    bb<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">putLong</span><span class=\\"token punctuation\\">(</span>uuid<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getLeastSignificantBits</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> bb<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">array</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
