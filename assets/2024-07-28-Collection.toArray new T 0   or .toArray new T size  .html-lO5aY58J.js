import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as r}from"./app-BUAgDejY.js";const i={},t=r(`<hr><h1 id="java集合-toarray-方法的深入分析" tabindex="-1"><a class="header-anchor" href="#java集合-toarray-方法的深入分析"><span>Java集合.toArray()方法的深入分析</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java编程语言提供了数组和集合来组织对象。大多数情况下，集合由数组支持，并配有一组方法来处理它包含的元素。</p><p>在开发软件时，使用这两种数据结构是很常见的。因此，程序员需要一种机制将这些元素从一种形式转换为另一种形式。Arrays类的_asList_方法和Collection接口的_toArray_方法形成了这种桥梁。</p><p>在本教程中，我们将深入分析一个有趣的论点：<strong>应该使用哪种toArray方法以及为什么？</strong> 我们还将使用JMH辅助基准测试来支持这些论点。</p><h2 id="_2-toarray方法的深入探讨" tabindex="-1"><a class="header-anchor" href="#_2-toarray方法的深入探讨"><span>2. toArray方法的深入探讨</span></a></h2><p>在盲目调用_toArray_方法之前，让我们先了解其内部机制。Collection接口提供了两种方法将集合转换为数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Object[] toArray()
\`\`&lt;T&gt;\`\` T[] toArray(T[] a)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这两种方法都返回一个包含集合所有元素的数组。为了演示这一点，让我们创建一个自然数列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List\`&lt;Integer&gt;\` naturalNumbers = IntStream
    .range(1, 10000)
    .boxed()
    .collect(Collectors.toList());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-collection-toarray" tabindex="-1"><a class="header-anchor" href="#_2-1-collection-toarray"><span>2.1 Collection.toArray()</span></a></h3><p>_toArray()<em>方法会分配一个新的内存数组，其长度等于集合的大小。<strong>内部，</strong> **它会调用集合底层数组支持的_Arrays.copyOf</em>**。因此，返回的数组没有对其的引用，可以安全使用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Object[] naturalNumbersArray = naturalNumbers.toArray();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，我们不能简单地将结果转换为_Integer[]<em>。这样做将导致_ClassCastException</em>。</p><h3 id="_2-2-t-t-collection-toarray-t-a" tabindex="-1"><a class="header-anchor" href="#_2-2-t-t-collection-toarray-t-a"><span>2.2 <code>&lt;T&gt;</code> T[] Collection.toArray(T[] a)</span></a></h3><p>与非参数化方法不同，这个方法接受一个预先分配的数组作为参数。此外，方法定义中使用泛型要求输入和返回数组的类型相同。这也解决了之前观察到的遍历_Object[]_的问题。</p><p>这个变体根据输入数组的大小有不同的工作方式：</p><ul><li>如果预先分配的数组长度小于集合的大小，则会分配一个所需长度和相同类型的新数组：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Integer[] naturalNumbersArray = naturalNumbers.toArray(new Integer[0]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>如果输入数组足够大以包含集合的元素，则会返回带有这些元素的数组：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Integer[] naturalNumbersArray = naturalNumbers.toArray(new Integer[naturalNumbers.size]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们回到最初的问题，选择更快和更好表现的候选者。</p><h2 id="_3-性能测试" tabindex="-1"><a class="header-anchor" href="#_3-性能测试"><span>3. 性能测试</span></a></h2><p>让我们从一个简单的实验开始，比较**零尺寸（toArray(new T[0])<strong>和</strong>预尺寸（toArray(new T[size])**变体。我们将使用流行的_ArrayList_和_AbstractCollection_支持的_TreeSet_进行测试。此外，我们还将包括不同大小（小、中、大）的集合，以便拥有广泛的样本数据。</p><h3 id="_3-1-jmh基准测试" tabindex="-1"><a class="header-anchor" href="#_3-1-jmh基准测试"><span>3.1 JMH基准测试</span></a></h3><p>接下来，让我们为我们的测试组装一个JMH（Java Microbenchmark Harness）基准测试。我们将为基准测试配置集合的大小和类型参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Param({ &quot;10&quot;, &quot;10000&quot;, &quot;10000000&quot; })
private int size;

@Param({ &quot;array-list&quot;, &quot;tree-set&quot; })
private String type;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们将为零尺寸和预尺寸toArray变体定义基准测试方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Benchmark
public String[] zero_sized() {
    return collection.toArray(new String[0]);
}

@Benchmark
public String[] pre_sized() {
    return collection.toArray(new String[collection.size()]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-基准测试结果" tabindex="-1"><a class="header-anchor" href="#_3-2-基准测试结果"><span>3.2 基准测试结果</span></a></h3><p>在一台8 vCPU，32 GB RAM，Linux x86_64虚拟机上使用JMH（v1.28）和JDK（1.8.0_292）运行上述基准测试，提供了以下结果。得分显示了每个基准测试方法的平均执行时间，以每操作的纳秒为单位。</p><p>值越低，性能越好：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Benchmark                   (size)      (type)  Mode  Cnt          Score          Error  Units

TestBenchmark.zero_sized        10  array-list  avgt   15         24.939 ±        1.202  ns/op
TestBenchmark.pre_sized         10  array-list  avgt   15         38.196 ±        3.767  ns/op
----------------------------------------------------------------------------------------------

TestBenchmark.zero_sized     10000  array-list  avgt   15      15244.367 ±      238.676  ns/op
TestBenchmark.pre_sized      10000  array-list  avgt   15      21263.225 ±      802.684  ns/op
----------------------------------------------------------------------------------------------

TestBenchmark.zero_sized  10000000  array-list  avgt   15   82710389.163 ±  6616266.065  ns/op
TestBenchmark.pre_sized   10000000  array-list  avgt   15  100426920.878 ± 10381964.911  ns/op

TestBenchmark.zero_sized        10    tree-set  avgt   15         66.802 ±        5.667  ns/op
TestBenchmark.pre_sized         10    tree-set  avgt   15         66.009 ±        4.504  ns/op
----------------------------------------------------------------------------------------------

TestBenchmark.zero_sized     10000    tree-set  avgt   15      85141.622 ±     2323.420  ns/op
TestBenchmark.pre_sized      10000    tree-set  avgt   15      89090.155 ±     4895.966  ns/op
----------------------------------------------------------------------------------------------

TestBenchmark.zero_sized  10000000    tree-set  avgt   15  211896860.317 ± 21019102.769  ns/op
TestBenchmark.pre_sized   10000000    tree-set  avgt   15  212882486.630 ± 20921740.965  ns/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>仔细观察上述结果后，很明显<strong>零尺寸方法调用在所有大小和集合类型中都赢得了胜利</strong>。</p><p>目前，这些数字只是数据。为了详细了解，让我们深入分析它们。</p><h3 id="_3-3-分配率" tabindex="-1"><a class="header-anchor" href="#_3-3-分配率"><span>3.3 分配率</span></a></h3><p>假设<strong>零尺寸toArray方法调用的性能优于预尺寸的，原因是每次操作的内存分配优化</strong>。让我们通过执行另一个基准测试并量化基准测试方法的<strong>平均分配率——每次操作分配的字节数</strong>来澄清这一点。</p><p>JMH提供了一个GC分析器（-prof gc），它内部使用_ThreadMXBean#getThreadAllocatedBytes_来计算每个@_Benchmark_的分配率：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Benchmark                                                    (size)      (type)  Mode  Cnt          Score           Error   Units

TestBenchmark.zero_sized:·gc.alloc.rate.norm                     10  array-list  avgt   15         72.000 ±         0.001    B/op
TestBenchmark.pre_sized:·gc.alloc.rate.norm                      10  array-list  avgt   15         56.000 ±         0.001    B/op
---------------------------------------------------------------------------------------------------------------------------------

TestBenchmark.zero_sized:·gc.alloc.rate.norm                  10000  array-list  avgt   15      40032.007 ±         0.001    B/op
TestBenchmark.pre_sized:·gc.alloc.rate.norm                   10000  array-list  avgt   15      40016.010 ±         0.001    B/op
---------------------------------------------------------------------------------------------------------------------------------

TestBenchmark.zero_sized:·gc.alloc.rate.norm               10000000  array-list  avgt   15   40000075.796 ±         8.882    B/op
TestBenchmark.pre_sized:·gc.alloc.rate.norm                10000000  array-list  avgt   15   40000062.213 ±         4.739    B/op

TestBenchmark.zero_sized:·gc.alloc.rate.norm                     10    tree-set  avgt   15         56.000 ±         0.001    B/op
TestBenchmark.pre_sized:·gc.alloc.rate.norm                      10    tree-set  avgt   15         56.000 ±         0.001    B/op
---------------------------------------------------------------------------------------------------------------------------------

TestBenchmark.zero_sized:·gc.alloc.rate.norm                  10000    tree-set  avgt   15      40055.818 ±        16.723    B/op
TestBenchmark.pre_sized:·gc.alloc.rate.norm                   10000    tree-set  avgt   15      41069.423 ±      1644.717    B/op
---------------------------------------------------------------------------------------------------------------------------------

TestBenchmark.zero_sized:·gc.alloc.rate.norm               10000000    tree-set  avgt   15   40000155.947 ±         9.416    B/op
TestBenchmark.pre_sized:·gc.alloc.rate.norm                10000000    tree-set  avgt   15   40000138.987 ±         7.987    B/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显然，上述数字证明，对于相同大小，无论集合类型或toArray变体如何，分配率或多或少都是相同的。因此，<strong>它否定了任何推测性的假设，即预尺寸和零尺寸toArray变体由于它们在内存分配率方面的不规则性而表现不同</strong>。</p><h3 id="_3-4-toarray-t-a-的内部机制" tabindex="-1"><a class="header-anchor" href="#_3-4-toarray-t-a-的内部机制"><span>3.4 toArray(T[] a)的内部机制</span></a></h3><p>为了进一步找出问题的原因，让我们深入ArrayList的内部机制：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>if (a.length \`&lt; size)
    return (T[]) Arrays.copyOf(elementData, size, a.getClass());
System.arraycopy(elementData, 0, a, 0, size);
if (a.length &gt;\` size)
    a[size] = null;
return a;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本上，根据预先分配的数组的长度，它要么是一个_Arrays.copyOf_要么是本地_System.arraycopy_方法调用，将集合的底层元素复制到数组中。</p><p>进一步观察_copyOf_方法，很明显，首先创建一个长度等于集合大小的副本数组，然后调用_System.arraycopy_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>T[] copy = ((Object)newType == (Object)Object[].class)
    ? (T[]) new Object[newLength]
    : (T[]) Array.newInstance(newType.getComponentType(), newLength);
System.arraycopy(original, 0, copy, 0,
    Math.min(original.length, newLength));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当零尺寸和预尺寸方法最终都调用本地_System.arraycopy_方法时，零尺寸方法调用如何更快？</p><p><strong>谜团在于为外部预分配的数组执行零初始化的直接CPU时间成本，这使得toArray(new T[size])方法慢得多</strong>。</p><h2 id="_4-零初始化" tabindex="-1"><a class="header-anchor" href="#_4-零初始化"><span>4. 零初始化</span></a></h2><p>Java语言规范指示<strong>新实例化的数组和对象应具有默认字段值</strong>，而不是内存的不规则残留值。因此，运行时必须将预分配的存储空间清零。基准测试实验证明，零尺寸数组方法调用能够避免清零，但预尺寸情况无法避免。</p><p>让我们考虑几个基准测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Benchmark
public Foo[] arraycopy_srcLength() {
    Object[] src = this.src;
    Foo[] dst = new Foo[size];
    System.arraycopy(src, 0, dst, 0, src.length);
    return dst;
}

@Benchmark
public Foo[] arraycopy_dstLength() {
    Object[] src = this.src;
    Foo[] dst = new Foo[size];
    System.arraycopy(src, 0, dst, 0, dst.length);
    return dst;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实验观察表明，数组分配后立即执行的_System.arraycopy_在**_arraycopy_srcLength_基准测试中能够避免_dst_数组的预清零**。然而，<strong>_arraycopy_dstLength_执行无法避免预清零</strong>。</p><p>巧合的是，后者**<em>arraycopy_dstLength</em><strong>案例类似于预尺寸数组方法</strong><em>collection.toArray(new String[collection.size()])</em>**，其中清零无法消除，因此其速度较慢。</p><h2 id="_5-在较新jdk上的基准测试" tabindex="-1"><a class="header-anchor" href="#_5-在较新jdk上的基准测试"><span>5. 在较新JDK上的基准测试</span></a></h2><p>最后，让我们在最近发布的JDK上执行原始基准测试，并配置JVM使用较新且改进的G1垃圾收集器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># VM version: JDK 11.0.2, OpenJDK 64-Bit Server VM, 11.0.2+9
-----------------------------------------------------------------------------------
Benchmark                    (size)      (type)  Mode  Cnt    Score    Error  Units
-----------------------------------------------------------------------------------
ToArrayBenchmark.zero_sized     100  array-list  avgt   15  199.920 ± 11.309  ns/op
ToArrayBenchmark.pre_sized      100  array-list  avgt   15  237.342 ± 14.166  ns/op
-----------------------------------------------------------------------------------
ToArrayBenchmark.zero_sized     100    tree-set  avgt   15  819.306 ± 85.916  ns/op
ToArrayBenchmark.pre_sized      100    tree-set  avgt   15  972.771 ± 69.743  ns/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>###################################################################################
# VM version: JDK 14.0.2, OpenJDK 64-Bit Server VM, 14.0.2+12-46
------------------------------------------------------------------------------------ 
Benchmark                    (size)      (type)  Mode  Cnt    Score    Error   Units
------------------------------------------------------------------------------------ 
ToArrayBenchmark.zero_sized     100  array-list  avgt   15  158.344 ±   3.862  ns/op
ToArrayBenchmark.pre_sized      100  array-list  avgt   15  214.340 ±   5.877  ns/op
------------------------------------------------------------------------------------ 
ToArrayBenchmark.zero_sized     100    tree-set  avgt   15  877.289 ± 132.673  ns/op
ToArrayBenchmark.pre_sized      100    tree-set  avgt   15  934.550 ± 148.660  ns/op

###################################################################################
# VM version: JDK 15.0.2, OpenJDK 64-Bit Server VM, 15.0.2+7-27
------------------------------------------------------------------------------------ 
Benchmark                    (size)      (type)  Mode  Cnt    Score     Error  Units
------------------------------------------------------------------------------------ 
ToArrayBenchmark.zero_sized     100  array-list  avgt   15  147.925 ±   3.968  ns/op
ToArrayBenchmark.pre_sized      100  array-list  avgt   15  213.525 ±   6.378  ns/op
------------------------------------------------------------------------------------ 
ToArrayBenchmark.zero_sized     100    tree-set  avgt   15  820.853 ± 105.491  ns/op
ToArrayBenchmark.pre_sized      100    tree-set  avgt   15  947.433 ± 123.782  ns/op

###################################################################################
# VM version: JDK 16, OpenJDK 64-Bit Server VM, 16+36-2231
------------------------------------------------------------------------------------ 
Benchmark                    (size)      (type)  Mode  Cnt    Score     Error  Units
------------------------------------------------------------------------------------ 
ToArrayBenchmark.zero_sized     100  array-list  avgt   15  146.431 ±   2.639  ns/op
ToArrayBenchmark.pre_sized      100  array-list  avgt   15  214.117 ±   3.679  ns/op
------------------------------------------------------------------------------------ 
ToArrayBenchmark.zero_sized     100    tree-set  avgt   15  818.370 ± 104.643  ns/op
ToArrayBenchmark.pre_sized      100    tree-set  avgt   15  964.072 ± 142.008  ns/op

###################################################################################
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有趣的是，**toArray(new T[0])方法一直比toArray(new T[size])**更快。此外，它的性能随着每个新版本的JDK不断改进。</p><h3 id="_5-1-java-11-collection-toarray-intfunction-t" tabindex="-1"><a class="header-anchor" href="#_5-1-java-11-collection-toarray-intfunction-t"><span>5.1 Java 11 Collection.toArray(IntFunction<code>&lt;T[]&gt;</code>)</span></a></h3><p>在Java 11中，Collection接口引入了一个新的默认toArray方法，该方法接受一个_IntFunction<code>&lt;T[]&gt;</code>_生成器作为参数（一个将生成所需类型和提供长度的新数组的函数）。</p><p><strong>这种方法通过使用零值调用生成器函数来保证新T[0]数组的初始化</strong>，从而确保更快和更好表现的零尺寸toArray(T[])方法始终被执行。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了Collection接口的不同toArray重载方法。我们还利用JMH微基准测试工具在不同的JDK上进行了性能测试。</p><p>我们理解了零初始化的必要性和影响，并观察到内部分配的数组消除了零初始化，从而赢得了性能竞赛。最后，我们可以坚定地得出结论，toArray(new T[0])变体比toArray(new T[size])更快，因此，当我们需要将集合转换为数组时，应该始终选择这种方式。</p><p>如往常一样，本文中使用的代码可以在GitHub上找到。 OK</p>`,67),s=[t];function l(d,o){return a(),n("div",null,s)}const m=e(i,[["render",l],["__file","2024-07-28-Collection.toArray new T 0   or .toArray new T size  .html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-28/2024-07-28-Collection.toArray%20new%20T%200%20%20%20or%20.toArray%20new%20T%20size%20%20.html","title":"Java集合.toArray()方法的深入分析","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections"],"tag":["Java","Collection","toArray"],"head":[["meta",{"name":"keywords","content":"Java Collection toArray methods, performance benchmarking, Java 11 toArray(IntFunction```<T[]>```)"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-28/2024-07-28-Collection.toArray%20new%20T%200%20%20%20or%20.toArray%20new%20T%20size%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java集合.toArray()方法的深入分析"}],["meta",{"property":"og:description","content":"Java集合.toArray()方法的深入分析 1. 概述 Java编程语言提供了数组和集合来组织对象。大多数情况下，集合由数组支持，并配有一组方法来处理它包含的元素。 在开发软件时，使用这两种数据结构是很常见的。因此，程序员需要一种机制将这些元素从一种形式转换为另一种形式。Arrays类的_asList_方法和Collection接口的_toArra..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-28T11:04:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Collection"}],["meta",{"property":"article:tag","content":"toArray"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-28T11:04:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java集合.toArray()方法的深入分析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-28T11:04:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java集合.toArray()方法的深入分析 1. 概述 Java编程语言提供了数组和集合来组织对象。大多数情况下，集合由数组支持，并配有一组方法来处理它包含的元素。 在开发软件时，使用这两种数据结构是很常见的。因此，程序员需要一种机制将这些元素从一种形式转换为另一种形式。Arrays类的_asList_方法和Collection接口的_toArra..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. toArray方法的深入探讨","slug":"_2-toarray方法的深入探讨","link":"#_2-toarray方法的深入探讨","children":[{"level":3,"title":"2.1 Collection.toArray()","slug":"_2-1-collection-toarray","link":"#_2-1-collection-toarray","children":[]},{"level":3,"title":"2.2 <T> T[] Collection.toArray(T[] a)","slug":"_2-2-t-t-collection-toarray-t-a","link":"#_2-2-t-t-collection-toarray-t-a","children":[]}]},{"level":2,"title":"3. 性能测试","slug":"_3-性能测试","link":"#_3-性能测试","children":[{"level":3,"title":"3.1 JMH基准测试","slug":"_3-1-jmh基准测试","link":"#_3-1-jmh基准测试","children":[]},{"level":3,"title":"3.2 基准测试结果","slug":"_3-2-基准测试结果","link":"#_3-2-基准测试结果","children":[]},{"level":3,"title":"3.3 分配率","slug":"_3-3-分配率","link":"#_3-3-分配率","children":[]},{"level":3,"title":"3.4 toArray(T[] a)的内部机制","slug":"_3-4-toarray-t-a-的内部机制","link":"#_3-4-toarray-t-a-的内部机制","children":[]}]},{"level":2,"title":"4. 零初始化","slug":"_4-零初始化","link":"#_4-零初始化","children":[]},{"level":2,"title":"5. 在较新JDK上的基准测试","slug":"_5-在较新jdk上的基准测试","link":"#_5-在较新jdk上的基准测试","children":[{"level":3,"title":"5.1 Java 11 Collection.toArray(IntFunction<T[]>)","slug":"_5-1-java-11-collection-toarray-intfunction-t","link":"#_5-1-java-11-collection-toarray-intfunction-t","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1722164644000,"updatedTime":1722164644000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.11,"words":2433},"filePathRelative":"posts/baeldung/2024-07-28/2024-07-28-Collection.toArray new T 0   or .toArray new T size  .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java集合.toArray()方法的深入分析</h1>\\n<h2>1. 概述</h2>\\n<p>Java编程语言提供了数组和集合来组织对象。大多数情况下，集合由数组支持，并配有一组方法来处理它包含的元素。</p>\\n<p>在开发软件时，使用这两种数据结构是很常见的。因此，程序员需要一种机制将这些元素从一种形式转换为另一种形式。Arrays类的_asList_方法和Collection接口的_toArray_方法形成了这种桥梁。</p>\\n<p>在本教程中，我们将深入分析一个有趣的论点：<strong>应该使用哪种toArray方法以及为什么？</strong> 我们还将使用JMH辅助基准测试来支持这些论点。</p>","autoDesc":true}');export{m as comp,u as data};
