import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-D1jsmMBg.js";const e={},p=t(`<h1 id="java中的tlab或线程本地分配缓冲区是什么" tabindex="-1"><a class="header-anchor" href="#java中的tlab或线程本地分配缓冲区是什么"><span>Java中的TLAB或线程本地分配缓冲区是什么？</span></a></h1><p>在本教程中，我们将探讨线程本地分配缓冲区（TLABs）。我们将了解它们是什么，JVM如何使用它们，以及我们如何管理它们。</p><h2 id="java中的内存分配" tabindex="-1"><a class="header-anchor" href="#java中的内存分配"><span>Java中的内存分配</span></a></h2><p>Java中的某些命令将分配内存。最明显的是_new_关键字，但还有其他的——例如，使用反射。</p><p>每当我们这样做时，JVM必须在堆上为新对象留出一些内存。特别是，JVM内存分配以这种方式在Eden或Young空间中进行所有分配。</p><p>在单线程应用程序中，这很容易。由于一次只能发生一个内存分配请求，线程可以简单地获取下一个合适大小的块，我们完成了：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/single-threaded-heap-allocation-1024x307.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然而，在多线程应用程序中，我们不能这么简单地做事。如果我们这样做，那么两个线程将同时请求内存并都被赋予完全相同的块的风险：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/multithreaded-heap-allocation-1024x456.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>为了避免这种情况，我们同步内存分配，使得两个线程不能同时请求相同的内存块。然而，同步所有内存分配将使它们本质上变成单线程，这可能是我们应用程序中的一个巨大瓶颈。</p><h2 id="线程本地分配缓冲区" tabindex="-1"><a class="header-anchor" href="#线程本地分配缓冲区"><span>线程本地分配缓冲区</span></a></h2><p>JVM使用线程本地分配缓冲区，或TLABs，来解决这个问题。这些是为给定线程保留的堆内存区域，并且只由该线程用于分配内存：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/tlab-heap-allocation-1024x564.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>通过这种方式工作，不需要同步，因为只有一个线程可以从这个缓冲区中拉取。缓冲区本身是以同步方式分配的，但这是一个不那么频繁的操作。</p><p>由于为对象分配内存是一个相对常见的事件，这可能是一个巨大的性能提升。但究竟有多大的提升呢？我们可以通过一个简单的测试来容易地确定这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testAllocations</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> start <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\` objects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1_000_000</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        objects<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1_000_000</span><span class="token punctuation">,</span> objects<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">long</span> end <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">(</span>end <span class="token operator">-</span> start<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;ms&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个相对简单的测试，但它能完成工作。我们将为1,000,000个新的_Object_实例分配内存，并记录所需的时间。然后我们可以多次运行这个测试，同时开启和关闭TLAB，并看看平均时间是多少（我们将在第5节中看到如何关闭TLAB）：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/09/TLAB-Timings.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以清楚地看到差异。使用TLAB的平均时间是33毫秒，而不使用时上升到110毫秒。这只是通过改变这一个设置，就增加了230%。</p><h3 id="_3-1-tlab空间耗尽" tabindex="-1"><a class="header-anchor" href="#_3-1-tlab空间耗尽"><span>3.1. TLAB空间耗尽</span></a></h3><p>显然，我们的TLAB空间是有限的。那么，当我们用完TLAB空间时会发生什么呢？</p><p>如果我们的应用程序尝试为新对象分配空间，而TLAB没有足够的可用空间，JVM有四种可能的选择：</p><ol><li>它可以为这个线程分配新的TLAB空间量，有效地增加可用的数量。</li><li>它可以在TLAB空间之外为这个对象分配内存。</li><li>它可以试图使用垃圾收集器释放一些内存。</li><li>它可以无法分配内存，而是抛出一个错误。</li></ol><p><strong>选项#4是我们的灾难性情况，所以我们要尽可能避免</strong>，但如果其他情况不能发生，它是一个选项。</p><p>JVM使用一些复杂的启发式方法来决定使用哪种其他选项，这些启发式方法可能在不同的JVM和不同版本之间会有所变化。然而，<strong>最重要的细节包括</strong>：</p><ul><li>在一段时间内可能进行的分配数量。如果我们很可能分配很多对象，那么增加TLAB空间将是一个更有效的选择。如果我们很可能分配非常少的对象，那么增加TLAB空间实际上可能效率更低。</li><li>正在请求的内存量。请求的内存越多，在TLAB空间之外分配这个内存的成本就越高。</li><li>可用的内存量。如果JVM有很多可用的内存，那么增加TLAB空间比内存使用非常高时要容易得多。</li><li>内存争用量。如果JVM有很多线程，每个线程都需要内存，那么增加TLAB空间可能比只有很少线程时要贵得多。</li></ul><h3 id="_3-2-tlab容量" tabindex="-1"><a class="header-anchor" href="#_3-2-tlab容量"><span>3.2. TLAB容量</span></a></h3><p>**使用TLAB似乎是提高性能的绝佳方式，但总有成本。**防止多个线程分配相同内存区域所需的同步使得TLAB本身相对昂贵。如果JVM的内存使用特别高，我们可能还需要等待足够的内存可供分配。</p><p>然而，如果一个线程为其TLAB空间分配了比它需要的更多的内存，那么这个内存就会闲置在那里，基本上是浪费的。更糟糕的是，浪费这个空间使得其他线程更难获得TLAB空间的内存，可能会使整个应用程序变慢。</p><p>因此，关于要分配多少空间存在争议。分配太多，我们就是在浪费空间。但分配太少，我们将花费比理想中更多的时间来分配TLAB空间。</p><p>幸运的是，JVM会为我们处理所有这些，尽管我们将很快看到如何根据需要调整它。</p><h2 id="_4-查看tlab使用情况" tabindex="-1"><a class="header-anchor" href="#_4-查看tlab使用情况"><span>4. 查看TLAB使用情况</span></a></h2><p><strong>现在我们知道了TLAB是什么以及它对我们的应用程序可能产生的影响，我们如何在实际操作中看到它呢？</strong></p><p>不幸的是，_jconsole_工具并没有像它对标准内存池那样提供对它的可见性。</p><p>然而，JVM本身可以输出一些诊断信息。这使用了新的统一GC日志记录机制，所以我们必须<strong>使用-Xlog:gc+tlab=trace标志启动JVM</strong>以查看这些信息。然后，它将定期打印出有关JVM当前TLAB使用情况的信息。例如，在GC运行期间，我们可能会看到类似的东西：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">0</span>.343s<span class="token punctuation">]</span><span class="token punctuation">[</span>trace<span class="token punctuation">]</span><span class="token punctuation">[</span>gc,tlab<span class="token punctuation">]</span> GC<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> TLAB: gc thread: 0x000000014000a600 <span class="token punctuation">[</span>id: <span class="token number">10499</span><span class="token punctuation">]</span> desired_size: 450KB slow allocs: <span class="token number">4</span>  refill waste: 7208B alloc: <span class="token number">0.99999</span>    22528KB refills: <span class="token number">42</span> waste  <span class="token number">1.4</span>% gc: 161384B slow: 59152B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这告诉我们，对于这个特定的线程：</p><ul><li>当前的TLAB大小是450KB（<em>desired_size</em>）。</li><li>自上次GV以来，有四次在TLAB之外的分配（<em>slow allocs</em>）。</li></ul><p>请注意，确切的日志记录会在JVM和版本之间有所不同。</p><h2 id="_5-调整tlab设置" tabindex="-1"><a class="header-anchor" href="#_5-调整tlab设置"><span>5. 调整TLAB设置</span></a></h2><p><strong>我们已经看到了开启和关闭TLAB的影响，但我们还能做些什么呢？我们可以通过在启动应用程序时提供JVM参数来调整许多设置。</strong></p><p>首先，让我们看看如何关闭它。这是通过传递JVM参数-XX:-UseTLAB完成的。设置这个将停止JVM使用TLAB，并强制它在每次内存分配上使用同步。</p><p>我们也可以保留TLAB启用状态，但通过设置JVM参数-XX:-ResizeTLAB来阻止它调整大小。这样做意味着如果给定线程的TLAB填满了，所有未来的分配都将在TLAB之外进行，并需要同步。</p><p>我们还可以通过提供JVM参数-XX:TLABSize来配置TLAB的大小。这定义了JVM应该为每个TLAB使用的推荐初始大小，因此它是每个线程分配的大小。如果这被设置为0——这是默认值——那么JVM将根据JVM的当前状态动态决定每个线程分配多少。</p><p>我们还可以指定-XX:MinTLABSize，以给出每个线程的TLAB大小的下限，以防我们允许JVM动态确定大。我们还有-XX:MaxTLABSize作为每个线程的TLAB可以增长的上限。</p><p><strong>所有这些设置都有合理的默认值，通常最好只使用这些默认值，但如果我们发现有问题，我们确实有一定的控制水平。</strong></p><h2 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span>6. 总结</span></a></h2><p>**在本文中，我们已经看到了线程本地分配缓冲区是什么，它们是如何使用的，以及我们如何管理它们。**下次当你的应用程序遇到任何性能问题时，考虑这可能是值得调查的事情。</p>`,48),o=[p];function l(i,c){return s(),n("div",null,o)}const d=a(e,[["render",l],["__file","2024-06-30-What Is a TLAB or Thread Local Allocation Buffer in Java .html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-What%20Is%20a%20TLAB%20or%20Thread%20Local%20Allocation%20Buffer%20in%20Java%20.html","title":"Java中的TLAB或线程本地分配缓冲区是什么？","lang":"zh-CN","frontmatter":{"date":"2023-09-01T00:00:00.000Z","category":["Java","JVM"],"tag":["TLAB","内存分配"],"head":[["meta",{"name":"keywords","content":"Java, JVM, TLAB, 内存分配, 性能优化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-What%20Is%20a%20TLAB%20or%20Thread%20Local%20Allocation%20Buffer%20in%20Java%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的TLAB或线程本地分配缓冲区是什么？"}],["meta",{"property":"og:description","content":"Java中的TLAB或线程本地分配缓冲区是什么？ 在本教程中，我们将探讨线程本地分配缓冲区（TLABs）。我们将了解它们是什么，JVM如何使用它们，以及我们如何管理它们。 Java中的内存分配 Java中的某些命令将分配内存。最明显的是_new_关键字，但还有其他的——例如，使用反射。 每当我们这样做时，JVM必须在堆上为新对象留出一些内存。特别是，J..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/09/single-threaded-heap-allocation-1024x307.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T18:39:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"TLAB"}],["meta",{"property":"article:tag","content":"内存分配"}],["meta",{"property":"article:published_time","content":"2023-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T18:39:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的TLAB或线程本地分配缓冲区是什么？\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/09/single-threaded-heap-allocation-1024x307.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/09/multithreaded-heap-allocation-1024x456.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/09/tlab-heap-allocation-1024x564.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/09/TLAB-Timings.png\\"],\\"datePublished\\":\\"2023-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T18:39:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的TLAB或线程本地分配缓冲区是什么？ 在本教程中，我们将探讨线程本地分配缓冲区（TLABs）。我们将了解它们是什么，JVM如何使用它们，以及我们如何管理它们。 Java中的内存分配 Java中的某些命令将分配内存。最明显的是_new_关键字，但还有其他的——例如，使用反射。 每当我们这样做时，JVM必须在堆上为新对象留出一些内存。特别是，J..."},"headers":[{"level":2,"title":"Java中的内存分配","slug":"java中的内存分配","link":"#java中的内存分配","children":[]},{"level":2,"title":"线程本地分配缓冲区","slug":"线程本地分配缓冲区","link":"#线程本地分配缓冲区","children":[{"level":3,"title":"3.1. TLAB空间耗尽","slug":"_3-1-tlab空间耗尽","link":"#_3-1-tlab空间耗尽","children":[]},{"level":3,"title":"3.2. TLAB容量","slug":"_3-2-tlab容量","link":"#_3-2-tlab容量","children":[]}]},{"level":2,"title":"4. 查看TLAB使用情况","slug":"_4-查看tlab使用情况","link":"#_4-查看tlab使用情况","children":[]},{"level":2,"title":"5. 调整TLAB设置","slug":"_5-调整tlab设置","link":"#_5-调整tlab设置","children":[]},{"level":2,"title":"6. 总结","slug":"_6-总结","link":"#_6-总结","children":[]}],"git":{"createdTime":1719772760000,"updatedTime":1719772760000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.21,"words":2164},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-What Is a TLAB or Thread Local Allocation Buffer in Java .md","localizedDate":"2023年9月1日","excerpt":"\\n<p>在本教程中，我们将探讨线程本地分配缓冲区（TLABs）。我们将了解它们是什么，JVM如何使用它们，以及我们如何管理它们。</p>\\n<h2>Java中的内存分配</h2>\\n<p>Java中的某些命令将分配内存。最明显的是_new_关键字，但还有其他的——例如，使用反射。</p>\\n<p>每当我们这样做时，JVM必须在堆上为新对象留出一些内存。特别是，JVM内存分配以这种方式在Eden或Young空间中进行所有分配。</p>\\n<p>在单线程应用程序中，这很容易。由于一次只能发生一个内存分配请求，线程可以简单地获取下一个合适大小的块，我们完成了：</p>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2023/09/single-threaded-heap-allocation-1024x307.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{d as comp,g as data};
