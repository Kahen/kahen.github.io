import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as s}from"./app-BUAgDejY.js";const n={},i=s('<h1 id="java中生成文件的md5校验和" tabindex="-1"><a class="header-anchor" href="#java中生成文件的md5校验和"><span>Java中生成文件的MD5校验和</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>校验和是一串用于唯一标识文件的字符序列。它最常用于验证文件副本是否与原始文件完全相同。</p><p>在这个简短的教程中，我们将看到如何在Java中<strong>生成文件的MD5校验和</strong>。</p><h2 id="_2-使用messagedigest类" tabindex="-1"><a class="header-anchor" href="#_2-使用messagedigest类"><span>2. 使用MessageDigest类</span></a></h2><p>我们可以很容易地使用java.security包中的MessageDigest类来为文件生成MD5校验和：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>byte[] data = Files.readAllBytes(Paths.get(filePath));\nbyte[] hash = MessageDigest.getInstance(&quot;MD5&quot;).digest(data);\nString checksum = new BigInteger(1, hash).toString(16);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用apache-commons-codec" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-codec"><span>3. 使用Apache Commons Codec</span></a></h2><p>我们还可以使用Apache Commons Codec库中的DigestUtils类来实现相同的目标。</p><p>让我们在我们的pom.xml文件中添加一个依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`commons-codec`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`commons-codec`&lt;/artifactId&gt;`\n    `&lt;version&gt;`1.15`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们简单地使用md5Hex()方法来获取我们文件的MD5校验和：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (InputStream is = Files.newInputStream(Paths.get(filePath))) {\n    String checksum = DigestUtils.md5Hex(is);\n    // ....\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们不要忘记使用try-with-resources，这样我们就不必担心关闭流。</p><h2 id="_4-使用guava" tabindex="-1"><a class="header-anchor" href="#_4-使用guava"><span>4. 使用Guava</span></a></h2><p>最后，我们可以使用Guava的ByteSource对象的hash()方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>File file = new File(filePath);\nByteSource byteSource = com.google.common.io.Files.asByteSource(file);\nHashCode hc = byteSource.hash(Hashing.md5());\nString checksum = hc.toString();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在这个快速教程中，我们已经展示了在Java中<strong>生成文件的MD5校验和</strong>的不同方法。</p><p>正如往常一样，本文的示例代码可以在GitHub上找到。</p>',20),r=[i];function l(c,d){return t(),a("div",null,r)}const h=e(n,[["render",l],["__file","2024-07-14-Generate the MD5 Checksum for a File in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Generate%20the%20MD5%20Checksum%20for%20a%20File%20in%20Java.html","title":"Java中生成文件的MD5校验和","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","MD5"],"tag":["Java","MD5","Checksum"],"head":[["meta",{"name":"keywords","content":"Java, MD5, Checksum, 文件校验"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Generate%20the%20MD5%20Checksum%20for%20a%20File%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中生成文件的MD5校验和"}],["meta",{"property":"og:description","content":"Java中生成文件的MD5校验和 1. 概述 校验和是一串用于唯一标识文件的字符序列。它最常用于验证文件副本是否与原始文件完全相同。 在这个简短的教程中，我们将看到如何在Java中生成文件的MD5校验和。 2. 使用MessageDigest类 我们可以很容易地使用java.security包中的MessageDigest类来为文件生成MD5校验和： ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T22:05:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"MD5"}],["meta",{"property":"article:tag","content":"Checksum"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T22:05:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中生成文件的MD5校验和\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T22:05:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中生成文件的MD5校验和 1. 概述 校验和是一串用于唯一标识文件的字符序列。它最常用于验证文件副本是否与原始文件完全相同。 在这个简短的教程中，我们将看到如何在Java中生成文件的MD5校验和。 2. 使用MessageDigest类 我们可以很容易地使用java.security包中的MessageDigest类来为文件生成MD5校验和： ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用MessageDigest类","slug":"_2-使用messagedigest类","link":"#_2-使用messagedigest类","children":[]},{"level":2,"title":"3. 使用Apache Commons Codec","slug":"_3-使用apache-commons-codec","link":"#_3-使用apache-commons-codec","children":[]},{"level":2,"title":"4. 使用Guava","slug":"_4-使用guava","link":"#_4-使用guava","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720994739000,"updatedTime":1720994739000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.23,"words":368},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Generate the MD5 Checksum for a File in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>校验和是一串用于唯一标识文件的字符序列。它最常用于验证文件副本是否与原始文件完全相同。</p>\\n<p>在这个简短的教程中，我们将看到如何在Java中<strong>生成文件的MD5校验和</strong>。</p>\\n<h2>2. 使用MessageDigest类</h2>\\n<p>我们可以很容易地使用java.security包中的MessageDigest类来为文件生成MD5校验和：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>byte[] data = Files.readAllBytes(Paths.get(filePath));\\nbyte[] hash = MessageDigest.getInstance(\\"MD5\\").digest(data);\\nString checksum = new BigInteger(1, hash).toString(16);\\n</code></pre></div>","autoDesc":true}');export{h as comp,m as data};
