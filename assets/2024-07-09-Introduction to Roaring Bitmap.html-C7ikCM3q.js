import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as n}from"./app-DkA39C0B.js";const t={},r=n('<h1 id="roaring-bitmap-简介" tabindex="-1"><a class="header-anchor" href="#roaring-bitmap-简介"><span>Roaring Bitmap 简介</span></a></h1><p>在本教程中，我们将学习关于 roaring bitmap 的知识。我们将使用一些基本的集合操作作为 roaring bitmap 的示例，并在 Java 中执行 RoaringBitmap 和 BitSet 之间的性能测试。</p><p>roaring bitmap 数据结构通常用于分析、搜索和大数据项目，因为它具有高性能和压缩比。它的灵感来自于位图索引，这是一种有效表示数字数组的数据结构。它类似于 Java 的 BitSet，但是经过压缩。</p><p>在压缩大整数集合的同时保持对各个元素的快速访问是 roaring bitmap 的重要优势。Roaring bitmap 内部使用不同类型的容器来实现这一点。</p><h2 id="roaring-bitmap-的工作原理" tabindex="-1"><a class="header-anchor" href="#roaring-bitmap-的工作原理"><span>Roaring Bitmap 的工作原理</span></a></h2><p>roaring bitmap 是由不相交子集组成的无符号整数集合。每个子集都有一个 16 位的键索引，并且可以容纳大小为 2^16 的范围中的值。这允许将无符号 32 位整数存储为 Java 的 short 类型，因为在最坏的情况下，只需要 16 位来表示一个 32 位的值。容器大小的选择还确保了，在最坏的情况下，容器仍然适合现代 CPU 的 L1 缓存。</p><p>以下图像表示 roaring bitmap 结构的外观：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/RoaringBitMap-Representation.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们的整数的 16 位最高有效位是桶或块键。每个数据块表示值范围区间 (0 `&lt;= n &lt; 2^16) 的基础。此外，如果没有数据在值范围内，就不会创建块。</p><p>下一个图像是一个包含不同数据的 roaring bitmap 的示例：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/RoaringBitmap-representation-with-data.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在第一个块中，我们存储了前 10 个 2 的倍数。此外，在第二个块中，我们有从 65536 开始的 100 个连续整数。图像中的最后一个块在 131072 和 19660 之间有偶数。</p><h2 id="roaring-bitmap-内部的容器" tabindex="-1"><a class="header-anchor" href="#roaring-bitmap-内部的容器"><span>Roaring Bitmap 内部的容器</span></a></h2><p>在 roaring bitmap 中有三种主要类型的容器 - Array、Bitmap 和 Run 容器。根据分区集的特性，Run 容器、Bitmap 容器或 Array 容器是用于持有分区数据的容器的实现。</p><p>当我们向 roaring bitmap 添加数据时，它内部会根据值是否适合容器键覆盖的范围来决定是创建一个新容器还是更改现有容器。</p><h3 id="_4-1-roaring-bitmap-的-array-容器" tabindex="-1"><a class="header-anchor" href="#_4-1-roaring-bitmap-的-array-容器"><span>4.1. Roaring Bitmap 的 Array 容器</span></a></h3><p>Array 容器不压缩数据，并且只持有少量数据。它所占用的空间与它所持有的数据量成正比：每个都是两个字节。</p><p>Array 容器使用的数据类型是 short 数据类型。整数按排序顺序存储。</p><p>此外，数组的初始容量是四个，并且元素的最大数量是 4096。数组容量是动态变化的。然而，当元素数量超过 4096 时，roaring bitmap 内部会将 Array 容器转换为 Bitmap 容器。</p><p>让我们来看一个在 roaring bitmap 中插入数据到 Array 容器的示例。我们有数字 131090。16 位最高有效位是 0000 0000 0000 0010，这是我们的键。低位的 16 位是 0000 0000 0001 0010。当我们将其转换为十进制基数时，它的值是 18。现在，插入数据后，这是我们的 roaring bitmap 结构：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/ArrayContainer-Representation.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以注意到，在插入后，Array 容器的基数是五个，对于由 16 位最高有效位表示的键。</p><h3 id="_4-2-roaring-bitmap-的-bitmap-容器" tabindex="-1"><a class="header-anchor" href="#_4-2-roaring-bitmap-的-bitmap-容器"><span>4.2. Roaring Bitmap 的 Bitmap 容器</span></a></h3><p>Bitmap 容器是位集的经典实现。</p><p>roaring bitmap 使用 long 数组来存储位图数据。与 Array 容器不同，数组容量固定为 1024。Bitmap 容器不需要找到位置。相反，它直接访问索引。</p><p>为了观察它的工作原理，我们将使用一个简单的示例。我们将数字 32786 插入到 roaring bitmap 中。前 16 位是 0000 0000 0000 0000。其余的位是 1000 0000 0001 0010 或十进制表示的 32786。这个值表示要在位图容器中设置的索引。让我们看看我们的 roaring bitmap 带有新信息：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/Bitmap-Container.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_4-3-roaringbitmap-的-run-容器" tabindex="-1"><a class="header-anchor" href="#_4-3-roaringbitmap-的-run-容器"><span>4.3. RoaringBitmap 的 Run 容器</span></a></h3><p>当位图的某个区域有大量干净的单词时，Run-length 编码是最佳的容器选择。它使用 short 数据类型数组。</p><p>偶数索引处的值表示运行的开始，奇数索引处的值表示这些运行的长度。容器的基数是通过遍历完整的运行数组来计算的。</p><p>例如，以下图像向我们展示了一个具有连续整数序列的容器。然后，在 RLE 执行后，容器只剩下四个值：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/02/RLE-Container.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这些值表示为 11 后面跟着四个连续递增的值和 27 后面跟着两个连续递增的值。</p><p>这种压缩算法的工作方式取决于数据的紧凑性或连续性。如果我们有 100 个 short，它们都是一排的，它可以将它们从 200 字节压缩到四个字节，但如果它们都在不同的地方，编码后将从 200 字节变为 400 字节。</p><h2 id="roaringbitmap-中的并集" tabindex="-1"><a class="header-anchor" href="#roaringbitmap-中的并集"><span>RoaringBitmap 中的并集</span></a></h2><p>在对 roaring bitmap 进行了简要介绍之后，在我们进入代码示例之前，我们需要将 RoaringBitmap 依赖项添加到我们的 pom.xml 文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.roaringbitmap```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```RoaringBitmap```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```0.9.38```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>集合的并集是我们在 roaring bitmap 上测试的第一个操作。首先，让我们声明两个 RoaringBitmap 实例。第一个是 A，第二个是 B：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenTwoRoaringBitmap_whenUsingOr_thenWillGetSetsUnion() {\n    RoaringBitmap expected = RoaringBitmap.bitmapOf(1, 2, 3, 4, 5, 6, 7, 8);\n    RoaringBitmap A = RoaringBitmap.bitmapOf(1, 2, 3, 4, 5);\n    RoaringBitmap B = RoaringBitmap.bitmapOf(4, 5, 6, 7, 8);\n    RoaringBitmap union = RoaringBitmap.or(A, B);\n    assertEquals(expected, union);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们声明了我们的两个 RoaringBitmap 实例。我们使用 RoaringBitmap 提供的 bitmapOf() 静态工厂方法进行实例创建。然后，我们使用 or() 方法执行集合并集操作。在幕后，这个操作在集合位图之间完成了逻辑 <em>OR</em>。这是一个线程安全的操作。</p><h2 id="roaringbitmap-中的交集" tabindex="-1"><a class="header-anchor" href="#roaringbitmap-中的交集"><span>RoaringBitmap 中的交集</span></a></h2><p>我们可以在集合上执行的另一个有用操作是交集。</p><p>让我们为交集问题实现我们的测试用例。像并集一样，交集操作在 RoaringBitmap 中非常简单：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenTwoRoaringBitmap_whenUsingAnd_thenWillGetSetsIntersection() {\n    RoaringBitmap expected = RoaringBitmap.bitmapOf(4, 5);\n    RoaringBitmap A = RoaringBitmap.bitmapOfRange(1, 6);\n    RoaringBitmap B = RoaringBitmap.bitmapOf(4, 5, 6, 7, 8);\n    RoaringBitmap intersection = RoaringBitmap.and(A, B);\n    assertEquals(expected, intersection);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试用例中，我们使用 RoaringBitmap 类的另一个静态工厂方法声明 A 集合。bitmapOfRange() 静态方法创建一个新的 RoaringBitmap。在幕后，bitmapOfRange() 方法创建了一个新的实例，并使用 add() 方法将一系列数据添加到 roaring bitmap 中。在这种情况下，add() 方法接收两个 long 值作为参数，表示下限和上限。下限是包含的。与此相比，上限不包含在结果集的范围中。接收两个 int 值参数的 add() 方法在当前 API 版本中已弃用。</p><p>然后，我们使用 and() 方法执行我们的交集操作。正如其名称所建议的，and() 方法在两个集合之间执行逻辑 <em>AND</em> 操作。这个操作是线程安全的。</p><h2 id="roaringbitmap-中的差集" tabindex="-1"><a class="header-anchor" href="#roaringbitmap-中的差集"><span>RoaringBitmap 中的差集</span></a></h2><p>除了并集和交集，我们还有集合的相对补集操作。</p><p>接下来，让我们构建我们的 RoaringBitmap 集合差集的测试用例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenTwoRoaringBitmap_whenUsingAndNot_thenWillGetSetsDifference() {\n    RoaringBitmap expected = RoaringBitmap.bitmapOf(1, 2, 3);\n    RoaringBitmap A = new RoaringBitmap();\n    A.add(1L, 6L);\n    RoaringBitmap B = RoaringBitmap.bitmapOf(4, 5, 6, 7, 8);\n    RoaringBitmap difference = RoaringBitmap.andNot(A, B);\n    assertEquals(expected, difference);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>像我们之前的代码示例一样，我们声明了 A 和 B 两个集合。我们使用不同的方法来实例化这个案例中的 A 集合。我们首先创建一个空的 RoaringBitmap。然后，我们使用 add() 方法，与前面部分描述的 bitmapOfRange() 方法使用的方法相同。</p><p><em>andNot()</em> 方法执行 A 和 B 之间的集合差集。从逻辑角度来看，这个操作执行了一个位的 <em>ANDNOT</em>（差集）操作。只要给定的位图保持不变，这个操作就是线程安全的。</p><h2 id="roaringbitmap-中的-xor-操作" tabindex="-1"><a class="header-anchor" href="#roaringbitmap-中的-xor-操作"><span>RoaringBitmap 中的 XOR 操作</span></a></h2><p>除了并集、交集和差集，我们还有 roaring bitmap 中的 XOR（异或）操作。这个操作类似于集合的相对补集，但是两个集合之间的公共元素会从结果集中省略。</p><p>我们使用 <em>xor()</em> 方法来执行这个操作。让我们看看我们的测试代码示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid givenTwoRoaringBitmap_whenUsingXOR_thenWillGetSetsSymmetricDifference() {\n    RoaringBitmap expected = RoaringBitmap.bitmapOf(1, 2, 3, 6, 7, 8);\n    RoaringBitmap A = RoaringBitmap.bitmapOfRange(1, 6);\n    RoaringBitmap B = RoaringBitmap.bitmapOfRange(4, 9);\n    RoaringBitmap xor = RoaringBitmap.xor(A, B);\n    assertEquals(expected, xor);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，RoaringBitmap 类中的 <em>xor()</em> 方法执行位的 <em>XOR</em> 操作，并且是线程安全的。</p><h2 id="与-bitset-的性能比较" tabindex="-1"><a class="header-anchor" href="#与-bitset-的性能比较"><span>与 BitSet 的性能比较</span></a></h2><p>此外，让我们在 RoaringBitmap 和 Java BitSet 之间构建一个简单的性能测试。对于每种集合类，我们测试了前面描述的操作：并集、交集、差集和 XOR。</p><p>我们使用 Java Microbenchmark Harness (JMH) 来实现我们的性能测试。首先，我们需要将依赖项添加到我们的 pom.xml 文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ```&lt;groupId&gt;```org.openjdk.jmh```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```jmh-generator-annprocess```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```1.37```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n``&lt;dependency&gt;``\n    ```&lt;groupId&gt;```org.openjdk.jmh```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```jmh-core```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```1.37```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JMH Core 和 JMH Annotation Processor 依赖项的最新版本可以在 Maven Central 中找到</p><h3 id="_9-1-声明基准测试范围" tabindex="-1"><a class="header-anchor" href="#_9-1-声明基准测试范围"><span>9.1. 声明基准测试范围</span></a></h3><p>接下来，我们声明我们的类和集合，就像我们为测试设置初始条件一样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@State(Scope.Thread)\nclass BitSetsBenchmark {\n    private RoaringBitmap rb1;\n    private BitSet bs1;\n    private RoaringBitmap rb2;\n    private BitSet bs2;\n    private final static int SIZE = 10_000_000;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最初，我们声明了两种类型的两个集合，BitSet 和 RoaringBitmap。然后，我们设置了一个最大大小。SIZE 变量是我们将用作集合大小的上界。</p><p>我们将在这个类中执行所有的测试。<strong>此外，我们使用 State 的 Scope.Thread 和默认的 Throughput 基准测试模式。</strong></p><p>我们将在操作后生成一个新的集合，以避免改变我们的输入数据结构。避免变异对于并发上下文很重要。这就是为什么，对于 BitSet 案例，我们将克隆输入集合，以便结果数据不会改变输入集合。</p><h3 id="_9-2-基准测试数据设置" tabindex="-1"><a class="header-anchor" href="#_9-2-基准测试数据设置"><span>9.2. 基准测试数据设置</span></a></h3><p>接下来，让我们为测试设置数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Setup\npublic void setup() {\n    rb1 = new RoaringBitmap();\n    bs1 = new BitSet(SIZE);\n    rb2 = new RoaringBitmap();\n    bs2 = new BitSet(SIZE);\n    for (int i = 0; i &lt; SIZE / 2; i++) {\n        rb1.add(i);\n        bs1.set(i);\n    }\n    for (int i = SIZE / 2; i &lt; SIZE; i++) {\n        rb2.add(i);\n        bs2.set(i);\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的两个 BitSet 集合被初始化为 SIZE。然后，对于第一个 RoaringBitmap 和 BitSet，我们添加/设置值直到 SIZE / 2，不包括在内。对于另外两个集合，我们从 SIZE / 2 添加值到 SIZE。</p><h3 id="_9-3-基准测试" tabindex="-1"><a class="header-anchor" href="#_9-3-基准测试"><span>9.3. 基准测试</span></a></h3><p>最后，让我们编写我们的测试。让我们从并集操作开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Benchmark\npublic RoaringBitmap roaringBitmapUnion() {\n    return RoaringBitmap.or(rb1, rb2);\n}\n@Benchmark\npublic BitSet bitSetUnion() {\n    BitSet result = (BitSet) bs1.clone();\n    result.or(bs2);\n    return result;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个操作是交集：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Benchmark\npublic RoaringBitmap roaringBitmapIntersection() {\n    return RoaringBitmap.and(rb1, rb2);\n}\n@Benchmark\npublic BitSet bitSetIntersection() {\n    BitSet result = (BitSet) bs1.clone();\n    result.and(bs2);\n    return result;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三个是差集：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Benchmark\npublic RoaringBitmap roaringBitmapDifference() {\n    return RoaringBitmap.andNot(rb1, rb2);\n}\n@Benchmark\npublic BitSet bitSetDifference() {\n    BitSet result = (BitSet) bs1.clone();\n    result.andNot(bs2);\n    return result;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后一个是 XOR 操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Benchmark\npublic RoaringBitmap roaringBitmapXOR() {\n    return RoaringBitmap.xor(rb1, rb2);\n}\n@Benchmark\npublic BitSet bitSetXOR() {\n    BitSet result = (BitSet) bs1.clone();\n    result.xor(bs2);\n    return result;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-4-基准测试结果" tabindex="-1"><a class="header-anchor" href="#_9-4-基准测试结果"><span>9.4. 基准测试结果</span></a></h3><p>在执行我们的基准测试后，我们得到了以下结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Benchmark                                    Mode  Cnt       Score       Error  Units\nBitSetsBenchmark.bitSetDifference           thrpt   25    3890.694 ±   313.808  ops/s\nBitSetsBenchmark.bitSetIntersection         thrpt   25    3542.387 ±   296.007  ops/s\nBitSetsBenchmark.bitSetUnion                thrpt   25    3012.666 ±   503.821  ops/s\nBitSetsBenchmark.bitSetXOR                  thrpt   25    2872.402 ±   348.099  ops/s\nBitSetsBenchmark.roaringBitmapDifference    thrpt   25   12930.064 ±   527.289  ops/s\nBitSetsBenchmark.roaringBitmapIntersection  thrpt   25  824167.502 ± 30176.431  ops/s\nBitSetsBenchmark.roaringBitmapUnion         thrpt   25    6287.477 ±   250.657  ops/s\nBitSetsBenchmark.roaringBitmapXOR           thrpt   25    6060.993 ±   607.562  ops/s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所注意到的，RoaringBitmap 的性能优于 BitSet 操作。尽管有这些结果，我们需要考虑何时使用每种类型。</p><p><strong>在某些情况下，尝试使用压缩位图是浪费的</strong>。例如，这可能是当我们有一个小的数据宇宙时。如果我们可以在不增加内存使用的情况下解压缩 BitSet，那么压缩位图可能不适合我们。如果不需要压缩，BitSet 提供了卓越的速度。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们学习了 roaring bitmap 数据结构。我们讨论了 RoaringBitmap 的一些操作。此外，我们进行了 RoaringBitmap 和 BitSet 之间的一些性能测试。结果表明，前者的性能优于后者。</p><p>像往常一样，包含我们示例的源代码可以在 GitHub 上找到。</p><figure><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\nOK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>',91),s=[r];function l(d,p){return a(),e("div",null,s)}const c=i(t,[["render",l],["__file","2024-07-09-Introduction to Roaring Bitmap.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Introduction%20to%20Roaring%20Bitmap.html","title":"Roaring Bitmap 简介","lang":"zh-CN","frontmatter":{"date":"2023-02-01T00:00:00.000Z","category":["Java","Data Structures"],"tag":["Roaring Bitmap","BitSet","Performance"],"head":[["meta",{"name":"keywords","content":"Java, Roaring Bitmap, BitSet, Data Structures, Performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Introduction%20to%20Roaring%20Bitmap.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Roaring Bitmap 简介"}],["meta",{"property":"og:description","content":"Roaring Bitmap 简介 在本教程中，我们将学习关于 roaring bitmap 的知识。我们将使用一些基本的集合操作作为 roaring bitmap 的示例，并在 Java 中执行 RoaringBitmap 和 BitSet 之间的性能测试。 roaring bitmap 数据结构通常用于分析、搜索和大数据项目，因为它具有高性能和压缩..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/02/RoaringBitMap-Representation.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T02:59:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Roaring Bitmap"}],["meta",{"property":"article:tag","content":"BitSet"}],["meta",{"property":"article:tag","content":"Performance"}],["meta",{"property":"article:published_time","content":"2023-02-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T02:59:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Roaring Bitmap 简介\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/02/RoaringBitMap-Representation.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/RoaringBitmap-representation-with-data.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/ArrayContainer-Representation.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/Bitmap-Container.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/02/RLE-Container.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\"],\\"datePublished\\":\\"2023-02-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T02:59:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Roaring Bitmap 简介 在本教程中，我们将学习关于 roaring bitmap 的知识。我们将使用一些基本的集合操作作为 roaring bitmap 的示例，并在 Java 中执行 RoaringBitmap 和 BitSet 之间的性能测试。 roaring bitmap 数据结构通常用于分析、搜索和大数据项目，因为它具有高性能和压缩..."},"headers":[{"level":2,"title":"Roaring Bitmap 的工作原理","slug":"roaring-bitmap-的工作原理","link":"#roaring-bitmap-的工作原理","children":[]},{"level":2,"title":"Roaring Bitmap 内部的容器","slug":"roaring-bitmap-内部的容器","link":"#roaring-bitmap-内部的容器","children":[{"level":3,"title":"4.1. Roaring Bitmap 的 Array 容器","slug":"_4-1-roaring-bitmap-的-array-容器","link":"#_4-1-roaring-bitmap-的-array-容器","children":[]},{"level":3,"title":"4.2. Roaring Bitmap 的 Bitmap 容器","slug":"_4-2-roaring-bitmap-的-bitmap-容器","link":"#_4-2-roaring-bitmap-的-bitmap-容器","children":[]},{"level":3,"title":"4.3. RoaringBitmap 的 Run 容器","slug":"_4-3-roaringbitmap-的-run-容器","link":"#_4-3-roaringbitmap-的-run-容器","children":[]}]},{"level":2,"title":"RoaringBitmap 中的并集","slug":"roaringbitmap-中的并集","link":"#roaringbitmap-中的并集","children":[]},{"level":2,"title":"RoaringBitmap 中的交集","slug":"roaringbitmap-中的交集","link":"#roaringbitmap-中的交集","children":[]},{"level":2,"title":"RoaringBitmap 中的差集","slug":"roaringbitmap-中的差集","link":"#roaringbitmap-中的差集","children":[]},{"level":2,"title":"RoaringBitmap 中的 XOR 操作","slug":"roaringbitmap-中的-xor-操作","link":"#roaringbitmap-中的-xor-操作","children":[]},{"level":2,"title":"与 BitSet 的性能比较","slug":"与-bitset-的性能比较","link":"#与-bitset-的性能比较","children":[{"level":3,"title":"9.1. 声明基准测试范围","slug":"_9-1-声明基准测试范围","link":"#_9-1-声明基准测试范围","children":[]},{"level":3,"title":"9.2. 基准测试数据设置","slug":"_9-2-基准测试数据设置","link":"#_9-2-基准测试数据设置","children":[]},{"level":3,"title":"9.3. 基准测试","slug":"_9-3-基准测试","link":"#_9-3-基准测试","children":[]},{"level":3,"title":"9.4. 基准测试结果","slug":"_9-4-基准测试结果","link":"#_9-4-基准测试结果","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720493951000,"updatedTime":1720493951000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":10.28,"words":3084},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Introduction to Roaring Bitmap.md","localizedDate":"2023年2月1日","excerpt":"\\n<p>在本教程中，我们将学习关于 roaring bitmap 的知识。我们将使用一些基本的集合操作作为 roaring bitmap 的示例，并在 Java 中执行 RoaringBitmap 和 BitSet 之间的性能测试。</p>\\n<p>roaring bitmap 数据结构通常用于分析、搜索和大数据项目，因为它具有高性能和压缩比。它的灵感来自于位图索引，这是一种有效表示数字数组的数据结构。它类似于 Java 的 BitSet，但是经过压缩。</p>\\n<p>在压缩大整数集合的同时保持对各个元素的快速访问是 roaring bitmap 的重要优势。Roaring bitmap 内部使用不同类型的容器来实现这一点。</p>","autoDesc":true}');export{c as comp,g as data};
