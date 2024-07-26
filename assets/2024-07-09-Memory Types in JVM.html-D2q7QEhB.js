import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-DpYLEM_u.js";const s={},r=n(`<hr><h1 id="java虚拟机中的内存类型" tabindex="-1"><a class="header-anchor" href="#java虚拟机中的内存类型"><span>Java虚拟机中的内存类型</span></a></h1><p>在这篇简短的教程中，我们将快速了解Java虚拟机（JVM）中的内存类型。</p><p>JVM使用不同类型的内存来满足不同的目的，每种内存都有其自身的特点和行为。了解JVM中的不同内存类型对于设计高效稳定的应用程序至关重要。</p><h2 id="_2-堆内存" tabindex="-1"><a class="header-anchor" href="#_2-堆内存"><span>2. 堆内存</span></a></h2><p>当JVM启动时，它会创建堆内存。<strong>这种内存类型是JVM的一个关键组成部分，因为它存储了应用程序创建的所有对象。</strong></p><p>内存的大小在应用程序运行时可能会增加或减少。然而，我们可以使用<code>-Xms</code>参数指定堆内存的初始大小：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-Xms4096M</span> ClassName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，我们可以使用<code>-Xmx</code>参数定义堆的最大大小：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-Xms4096M</span> <span class="token parameter variable">-Xmx6144M</span> ClassName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果应用程序的堆使用量达到最大大小并且仍然需要更多内存，它将生成一个<code>OutOfMemoryError: Java heap space</code>错误。</p><h2 id="_3-栈内存" tabindex="-1"><a class="header-anchor" href="#_3-栈内存"><span>3. 栈内存</span></a></h2><p>在这种内存类型中，JVM存储局部变量和方法信息。</p><p>此外，Java使用栈内存进行线程执行。在一个应用程序中，每个线程都有自己的栈，存储它当前正在使用的方法和变量信息。</p><p>然而，它不是由垃圾收集管理，而是由JVM本身管理。</p><p>**栈内存的大小是固定的，由JVM在运行时确定。**如果栈内存耗尽，JVM将抛出<code>StackOverflowError</code>错误。</p><p>为了避免这种潜在问题，设计应用程序以有效使用栈内存至关重要。</p><h2 id="_4-原生内存" tabindex="-1"><a class="header-anchor" href="#_4-原生内存"><span>4. 原生内存</span></a></h2><p>在Java堆之外分配并由JVM使用的内存称为原生内存。它也被称为非堆内存。</p><p>由于原生内存中的数据位于JVM之外，我们需要执行序列化来读取和写入数据。性能取决于缓冲区、序列化过程和磁盘空间。</p><p>此外，由于其位于JVM之外，它不会被垃圾收集器释放。</p><p><strong>在原生内存中，JVM存储线程栈、内部数据结构和内存映射文件。</strong></p><p>JVM和原生库使用原生内存来执行不能完全用Java完成的操作，例如与操作系统交互或访问硬件资源。</p><h2 id="_5-直接内存" tabindex="-1"><a class="header-anchor" href="#_5-直接内存"><span>5. 直接内存</span></a></h2><p>直接缓冲区内存是在Java堆之外分配的。它代表了JVM进程使用的操作系统的原生内存。</p><p><strong>Java NIO使用这种内存类型以更有效的方式将数据写入网络或磁盘。</strong></p><p>因为直接缓冲区不会被垃圾收集器释放，它们对应用程序内存占用的影响可能不是很明显。因此，直接缓冲区应该主要分配给在I/O操作中使用的大缓冲区。</p><p>在Java中使用直接缓冲区，我们调用<code>ByteBuffer</code>上的<code>allocateDirect()</code>方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ByteBuffer</span> directBuf <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocateDirect</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当加载文件到内存时，Java使用直接内存分配一系列<code>DirectByteBuffer</code>s。这样，它减少了相同字节被复制的次数。缓冲区有一个类负责在文件不再需要时释放内存。</p><p>我们可以使用<code>-XX:MaxDirectMemorySize</code>参数限制直接缓冲区内存的大小：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token parameter variable">-XX:MaxDirectMemorySize</span><span class="token operator">=</span>1024M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果原生内存使用了所有为直接字节缓冲区分配的空间，将发生<code>OutOfMemoryError: Direct buffer memory</code>错误。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇短文中，我们了解了JVM中的不同内存类型。为了确保我们应用程序的性能和稳定性，了解JVM中的内存类型很有帮助。</p>`,35),p=[r];function o(c,i){return t(),a("div",null,p)}const h=e(s,[["render",o],["__file","2024-07-09-Memory Types in JVM.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Memory%20Types%20in%20JVM.html","title":"Java虚拟机中的内存类型","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["JVM内存类型"],"tag":["Java","JVM","内存管理"],"head":[["meta",{"name":"keywords","content":"Java虚拟机, JVM内存, 堆内存, 栈内存, 直接内存"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Memory%20Types%20in%20JVM.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java虚拟机中的内存类型"}],["meta",{"property":"og:description","content":"Java虚拟机中的内存类型 在这篇简短的教程中，我们将快速了解Java虚拟机（JVM）中的内存类型。 JVM使用不同类型的内存来满足不同的目的，每种内存都有其自身的特点和行为。了解JVM中的不同内存类型对于设计高效稳定的应用程序至关重要。 2. 堆内存 当JVM启动时，它会创建堆内存。这种内存类型是JVM的一个关键组成部分，因为它存储了应用程序创建的所..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T23:38:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:tag","content":"内存管理"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T23:38:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java虚拟机中的内存类型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T23:38:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java虚拟机中的内存类型 在这篇简短的教程中，我们将快速了解Java虚拟机（JVM）中的内存类型。 JVM使用不同类型的内存来满足不同的目的，每种内存都有其自身的特点和行为。了解JVM中的不同内存类型对于设计高效稳定的应用程序至关重要。 2. 堆内存 当JVM启动时，它会创建堆内存。这种内存类型是JVM的一个关键组成部分，因为它存储了应用程序创建的所..."},"headers":[{"level":2,"title":"2. 堆内存","slug":"_2-堆内存","link":"#_2-堆内存","children":[]},{"level":2,"title":"3. 栈内存","slug":"_3-栈内存","link":"#_3-栈内存","children":[]},{"level":2,"title":"4. 原生内存","slug":"_4-原生内存","link":"#_4-原生内存","children":[]},{"level":2,"title":"5. 直接内存","slug":"_5-直接内存","link":"#_5-直接内存","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720568311000,"updatedTime":1720568311000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.16,"words":949},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Memory Types in JVM.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java虚拟机中的内存类型</h1>\\n<p>在这篇简短的教程中，我们将快速了解Java虚拟机（JVM）中的内存类型。</p>\\n<p>JVM使用不同类型的内存来满足不同的目的，每种内存都有其自身的特点和行为。了解JVM中的不同内存类型对于设计高效稳定的应用程序至关重要。</p>\\n<h2>2. 堆内存</h2>\\n<p>当JVM启动时，它会创建堆内存。<strong>这种内存类型是JVM的一个关键组成部分，因为它存储了应用程序创建的所有对象。</strong></p>\\n<p>内存的大小在应用程序运行时可能会增加或减少。然而，我们可以使用<code>-Xms</code>参数指定堆内存的初始大小：</p>","autoDesc":true}');export{h as comp,m as data};
