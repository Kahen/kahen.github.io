import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as s}from"./app-uizvaz9h.js";const p={},r=s(`<h1 id="java中的元数据gc阈值概述" tabindex="-1"><a class="header-anchor" href="#java中的元数据gc阈值概述"><span>Java中的元数据GC阈值概述</span></a></h1><p>垃圾收集是Java运行时系统识别并移除内存中未引用对象的过程。它在管理内存方面发挥着关键作用，通过清除未引用的对象、临时对象、未使用的元数据等。</p><p>在本教程中，我们将探索元空间（Metaspace）和元数据GC阈值（Metadata GC Threshold），以及如何调整它们的参数。</p><p>元数据包含有关堆中对象的信息，包括它们的类定义、方法表和相关信息。根据Java的版本，JVM将这些数据存储在永久代（PermGen）或元空间（Metaspace）中。</p><p>JVM依赖这些信息来执行类加载、字节码验证和动态绑定等任务。</p><p>从Java 8开始，JVM用一个新的内存区域——元空间（Metaspace）取代了永久代（PermGen），用于存储元数据。</p><p>永久代（PermGen）是一个固定大小的内存区域，与主堆分开，用于存储JVM加载的类和方法的元数据。它有一个固定的最大量，一旦满了，JVM就会抛出OutOfMemoryError。</p><p>元空间的大小不固定，可以根据应用程序中的元数据量动态增长。元空间独立于主堆，存在于本地内存（进程内存）的一个段中。它的大小仅受宿主操作系统设置的限制。</p><p>在Java中，当我们创建具有元数据的对象时，它就像任何其他对象一样占用内存空间。JVM需要这些元数据来完成各种任务。与常规对象不同，元数据直到达到某个阈值才会进行垃圾收集。</p><p>随着Java程序执行过程中动态加载的类越来越多，元空间逐渐填满。</p><p>JVM维护着元空间内容大小的阈值，当特定的分配不适合这个阈值时，就会触发数据GC阈值垃圾收集周期。</p><p>我们可以使用JVM标志，如-XX:+PrintClassHistogram和-XX:+PrintMetaspaceStatistics，来收集使用大量元数据内存的类的相关信息，并打印有关元空间的统计信息，例如用于类元数据的空间量。</p><p>利用这些信息，我们可以优化代码，改善元空间的使用和垃圾收集周期。此外，我们还可以调整与元空间相关的JVM参数。</p><p>让我们来看看一些用于调整元数据和元空间的JVM参数。</p><h3 id="_5-1-xx-metaspacesize-size" tabindex="-1"><a class="header-anchor" href="#_5-1-xx-metaspacesize-size"><span>5.1 <em>.-XX:MetaspaceSize=<code>&lt;size&gt;</code></em></span></a></h3><p>此参数有助于设置为类元数据分配的初始空间量（初始高水位标记），以字节为单位，这可能会引发垃圾收集以卸载类。该数量是近似的，这意味着JVM可以决定增加或减少元空间的大小。</p><p>此参数的较大值确保垃圾收集发生的频率较低。该参数的默认值依赖于平台，范围从12MB到大约20MB。</p><p>例如，我们可以将其设置为128兆字节：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>-XX:MetaspaceSize=128m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-2-xx-maxmetaspacesize-size" tabindex="-1"><a class="header-anchor" href="#_5-2-xx-maxmetaspacesize-size"><span>5.2. <em>.-XX:MaxMetaspaceSize=<code>&lt;size&gt;</code></em></span></a></h3><p>此参数设置元空间的最大大小，超过此大小将抛出OutOfMemory错误。此标志限制为类元数据分配的空间量，分配给此参数的值是一个近似值。</p><p>默认情况下，没有设置限制，这意味着元空间可以增长到可用的本地内存大小。</p><p>例如，让我们将其设置为100兆字节：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>‑XX:MaxMetaSpaceSize=100m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-3-xx-usecompressedclasspointers" tabindex="-1"><a class="header-anchor" href="#_5-3-xx-usecompressedclasspointers"><span>5.3. <em>.-XX:+UseCompressedClassPointers</em></span></a></h3><p>此功能旨在通过压缩对象引用来减少64位Java应用程序的内存占用。当此参数设置为true时，JVM将使用类元数据的压缩指针，这允许JVM使用32位寻址而不是完整的64位指针。</p><p>这种优化在64位架构上特别有价值，因为它减少了类元数据的内存使用量，以及对象引用所需的内存，从而可能提高应用程序的整体性能。</p><p>压缩类指针将类空间分配与非类空间分配分开。因此，我们有两个全局元空间上下文：一个持有Klass结构的分配（压缩类空间），一个持有所有其他内容（非类元空间）。</p><p>需要注意的是，在JVM的最新版本中，当运行64位Java应用程序时，通常默认启用此标志，所以我们通常不需要显式设置此标志。</p><h3 id="_5-4-xx-usecompressedoops" tabindex="-1"><a class="header-anchor" href="#_5-4-xx-usecompressedoops"><span>5.4. <em>.-XX:+UseCompressedOops</em></span></a></h3><p>此JVM标志启用或禁用64位JVM中Java对象的压缩指针的使用。当参数设置为true时，JVM将使用压缩指针，这意味着对象引用将使用32位指针而不是完整的64位指针。</p><p>使用压缩指针，只能寻址较小的内存范围。这迫使JVM使用较小的指针并节省内存。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了元数据和元空间的概念。</p><p>我们探讨了触发元数据GC阈值的原因。我们还学习了元数据GC阈值以及可用于调整元空间和优化垃圾收集周期的不同JVM参数。</p>`,35),n=[r];function i(o,c){return t(),a("div",null,n)}const m=e(p,[["render",i],["__file","2024-07-02-Metadata GC Threshold in Java.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Metadata%20GC%20Threshold%20in%20Java.html","title":"Java中的元数据GC阈值概述","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JVM"],"tag":["Metaspace","Garbage Collection"],"head":[["meta",{"name":"keywords","content":"Java, JVM, Metaspace, Garbage Collection, Metadata GC Threshold"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Metadata%20GC%20Threshold%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的元数据GC阈值概述"}],["meta",{"property":"og:description","content":"Java中的元数据GC阈值概述 垃圾收集是Java运行时系统识别并移除内存中未引用对象的过程。它在管理内存方面发挥着关键作用，通过清除未引用的对象、临时对象、未使用的元数据等。 在本教程中，我们将探索元空间（Metaspace）和元数据GC阈值（Metadata GC Threshold），以及如何调整它们的参数。 元数据包含有关堆中对象的信息，包括它..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T15:54:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Metaspace"}],["meta",{"property":"article:tag","content":"Garbage Collection"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T15:54:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的元数据GC阈值概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T15:54:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的元数据GC阈值概述 垃圾收集是Java运行时系统识别并移除内存中未引用对象的过程。它在管理内存方面发挥着关键作用，通过清除未引用的对象、临时对象、未使用的元数据等。 在本教程中，我们将探索元空间（Metaspace）和元数据GC阈值（Metadata GC Threshold），以及如何调整它们的参数。 元数据包含有关堆中对象的信息，包括它..."},"headers":[{"level":3,"title":"5.1 .-XX:MetaspaceSize=<size>","slug":"_5-1-xx-metaspacesize-size","link":"#_5-1-xx-metaspacesize-size","children":[]},{"level":3,"title":"5.2. .-XX:MaxMetaspaceSize=<size>","slug":"_5-2-xx-maxmetaspacesize-size","link":"#_5-2-xx-maxmetaspacesize-size","children":[]},{"level":3,"title":"5.3. .-XX:+UseCompressedClassPointers","slug":"_5-3-xx-usecompressedclasspointers","link":"#_5-3-xx-usecompressedclasspointers","children":[]},{"level":3,"title":"5.4. .-XX:+UseCompressedOops","slug":"_5-4-xx-usecompressedoops","link":"#_5-4-xx-usecompressedoops","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719935663000,"updatedTime":1719935663000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.4,"words":1319},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Metadata GC Threshold in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>垃圾收集是Java运行时系统识别并移除内存中未引用对象的过程。它在管理内存方面发挥着关键作用，通过清除未引用的对象、临时对象、未使用的元数据等。</p>\\n<p>在本教程中，我们将探索元空间（Metaspace）和元数据GC阈值（Metadata GC Threshold），以及如何调整它们的参数。</p>\\n<p>元数据包含有关堆中对象的信息，包括它们的类定义、方法表和相关信息。根据Java的版本，JVM将这些数据存储在永久代（PermGen）或元空间（Metaspace）中。</p>\\n<p>JVM依赖这些信息来执行类加载、字节码验证和动态绑定等任务。</p>\\n<p>从Java 8开始，JVM用一个新的内存区域——元空间（Metaspace）取代了永久代（PermGen），用于存储元数据。</p>","autoDesc":true}');export{m as comp,h as data};
