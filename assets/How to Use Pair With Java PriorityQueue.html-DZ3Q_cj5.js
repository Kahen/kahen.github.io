import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-D5kFWV-m.js";const p={},e=t('<h1 id="如何在java中使用pair与priorityqueue-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在java中使用pair与priorityqueue-baeldung"><span>如何在Java中使用Pair与PriorityQueue | Baeldung</span></a></h1><p>优先队列是最强大数据结构之一。它在企业应用中不常见，但我们经常在编码挑战和算法实现中使用它。</p><p>在本教程中，我们将学习如何使用比较器（Comparators）与优先队列（PriorityQueues）以及如何改变这些队列中的排序顺序。然后我们将检查一个更通用的例子，使用自定义类，并了解如何将类似的逻辑应用到Pair类。</p><p>对于Pair类，我们将使用Apache Commons的实现。然而，有多种选项可供选择，我们可以选择最适合我们需求的那个。</p><p>首先，让我们讨论数据结构本身。这个结构的主要超能力是在将元素推入队列时保持它们的顺序。</p><p>然而，像其他队列一样，它不提供访问队列内元素的API。我们只能访问队列前面的元素。</p><p>同时，我们有几种方法可以从队列中移除元素：removeAt()和removeEq()。我们还可以使用AbstractCollection中的几种方法。虽然有帮助，但它们不提供对元素的随机访问。</p><h3 id="_3-排序" tabindex="-1"><a class="header-anchor" href="#_3-排序"><span>3. 排序</span></a></h3><p>正如之前提到的，优先队列的主要特点是它保持元素的顺序。与后进先出/先进先出不同，顺序不取决于插入的顺序。</p><p>因此，我们应该对队列中元素的顺序有一个大致的了解。我们可以使用可比较（Comparable）的元素，或者在创建队列时提供一个自定义的比较器（Comparator）。</p><p>因为我们有两种选项，参数化不需要元素实现可比较接口。让我们检查以下类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> publicationYear<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数和getter方法</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用不可比较的对象参数化队列是不正确的，但不会抛出异常：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;bookProvider&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token function">givenBooks_whenUsePriorityQueueWithoutComparatorWithoutAddingElements_thenNoExcetption</span><span class="token punctuation">(</span><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>`````` books<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">PriorityQueue</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>`````` queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，如果我们尝试将这样的元素推入队列，它将无法识别它们的自然顺序并抛出ClassCastException：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;bookProvider&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token function">givenBooks_whenUsePriorityQueueWithoutComparator_thenThrowClassCastExcetption</span><span class="token punctuation">(</span><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>`````` books<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">PriorityQueue</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>`````` queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThatExceptionOfType</span><span class="token punctuation">(</span><span class="token class-name">ClassCastException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> queue<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>books<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是处理这种情况的常用方法。Collections.sort()在尝试排序不可比较的元素时的行为类似。<strong>我们应该考虑这一点，因为它不会发出任何编译时错误。</strong></p><h3 id="_4-比较器" tabindex="-1"><a class="header-anchor" href="#_4-比较器"><span>4. 比较器</span></a></h3><p>正如之前提到的，我们可以用两种不同的方式确定队列的顺序：实现可比较接口或在初始化队列时提供一个比较器。</p><h4 id="_4-1-可比较接口" tabindex="-1"><a class="header-anchor" href="#_4-1-可比较接口"><span>4.1. 可比较接口</span></a></h4><p>当元素具有自然排序的概念，并且我们不需要为队列显式提供它时，可比较接口非常有用。让我们以会议类（Meeting）为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Meeting</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">LocalDateTime</span> startTime<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">LocalDateTime</span> endTime<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n\n    <span class="token comment">// 构造函数，getter方法，equals和hashCode</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">Meeting</span> meeting<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>startTime<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>meeting<span class="token punctuation">.</span>startTime<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，一般顺序将是会议的开始时间。这不是一个严格的要求，不同的领域可以有不同的自然顺序概念，但对于我们的示例来说已经足够好了。</p><p>我们可以直接使用会议类，无需我们额外的工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenMeetings_whenUseWithPriorityQueue_thenSortByStartDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Meeting</span> projectDiscussion <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Meeting</span><span class="token punctuation">(</span>\n      <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2025-11-10T19:00:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2025-11-10T20:00:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;Project Discussion&quot;</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Meeting</span> businessMeeting <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Meeting</span><span class="token punctuation">(</span>\n      <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2025-11-15T14:00:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&quot;2025-11-15T16:00:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;Business Meeting&quot;</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">PriorityQueue</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Meeting</span><span class="token punctuation">&gt;</span></span>` meetings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    meetings<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>projectDiscussion<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    meetings<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>businessMeeting<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>meetings<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>projectDiscussion<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertThat</span><span class="token punctuation">(</span>meetings<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>businessMeeting<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果我们想要偏离默认排序，我们应该提供一个自定义的比较器。</p><h4 id="_4-2-比较器" tabindex="-1"><a class="header-anchor" href="#_4-2-比较器"><span>4.2. 比较器</span></a></h4><p>在创建一个新的优先队列时，我们可以将一个比较器传递给构造函数，并确定我们想要使用的顺序。以书籍类（Book）为例。它之前创建了问题，因为它没有实现可比较接口或提供自然排序。</p><p>假设我们想要按年份排序我们的书籍以创建一个阅读列表。我们想先读旧的，以更深入地了解科幻思想的发展，同时也理解之前出版的书籍的影响：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;bookProvider&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token function">givenBooks_whenUsePriorityQueue_thenSortThemBySecondElement</span><span class="token punctuation">(</span><span class="token class-name">List</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>`````` books<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">PriorityQueue</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">&gt;</span></span>`````` queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span><span class="token class-name">Book</span><span class="token operator">::</span><span class="token function">getPublicationYear</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    queue<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>books<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Book</span> previousBook <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Book</span> currentBook <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span>previousBook<span class="token punctuation">.</span><span class="token function">getPublicationYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">.</span><span class="token function">isLessThanOrEqualTo</span><span class="token punctuation">(</span>currentBook<span class="token punctuation">.</span><span class="token function">getPublicationYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        previousBook <span class="token operator">=</span> currentBook<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用方法引用来创建一个比较器，该比较器将书籍按年份排序。我们可以将书籍添加到我们的阅读队列中，并首先选择旧的书籍。</p><h3 id="_5-对" tabindex="-1"><a class="header-anchor" href="#_5-对"><span>5. 对</span></a></h3><p>在检查了自定义类的示例之后，使用对（Pairs）与优先队列是一个简单的任务。通常，使用上没有区别。<strong>让我们考虑我们的对包含标题和出版年份：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;pairProvider&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token function">givenPairs_whenUsePriorityQueue_thenSortThemBySecondElement</span><span class="token punctuation">(</span><span class="token class-name">List</span>``<span class="token operator">&lt;</span><span class="token class-name">Pair</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> pairs<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">PriorityQueue</span>``<span class="token operator">&lt;</span><span class="token class-name">Pair</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>``````<span class="token operator">&gt;</span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span><span class="token class-name">Pair</span><span class="token operator">::</span><span class="token function">getSecond</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    queue<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>pairs<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Pair</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` previousEntry <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Pair</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` currentEntry <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span>previousEntry<span class="token punctuation">.</span><span class="token function">getSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isLessThanOrEqualTo</span><span class="token punctuation">(</span>currentEntry<span class="token punctuation">.</span><span class="token function">getSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        previousEntry <span class="token operator">=</span> currentEntry<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**正如我们所看到的，最后两个例子几乎相同。**唯一的区别是我们的比较器使用了对类。在这个例子中，我们使用了Apache Commons的对实现。然而，还有很多其他选项。</p><p>此外，如果我们的代码库中没有其他选项，或者我们不想添加新的依赖项，我们可以使用Map.Entry：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ParameterizedTest</span>\n<span class="token annotation punctuation">@MethodSource</span><span class="token punctuation">(</span><span class="token string">&quot;mapEntryProvider&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">void</span> <span class="token function">givenMapEntries_whenUsePriorityQueue_thenSortThemBySecondElement</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> pairs<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">PriorityQueue</span><span class="token operator">&lt;</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>````<span class="token operator">&gt;</span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token operator">::</span><span class="token function">getValue</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    queue<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>pairs<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` previousEntry <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span>````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>```` currentEntry <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">assertThat</span><span class="token punctuation">(</span>previousEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isLessThanOrEqualTo</span><span class="token punctuation">(</span>currentEntry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        previousEntry <span class="token operator">=</span> currentEntry<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，我们可以轻松地创建一个新的类来表示一个对。<strong>可选地，我们可以使用数组或由Object参数化的List，但不建议这样做，因为这会破坏类型安全性。</strong></p><p>对和优先队列的组合对于图遍历算法来说非常常见，比如Dijkstra算法。其他语言，如JavaScript和Python，可以即时创建数据结构。相比之下，Java需要一些初始设置，使用额外的类或接口。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>优先队列是一个优秀的数据结构，用于实现更高效、更简单的算法。它允许使用比较器进行定制，以便我们可以提供基于我们领域需求的任何排序规则。</p><p>**将优先队列和对结合起来，可以帮助我们编写更健壮、更易于理解的代码。**然而，它通常被认为是一个更高级的数据结构，并非所有开发人员都熟悉其API。</p><p>如常，所有的代码都可以在GitHub上找到。</p><p>发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表格。</p><p>OK</p>',45),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","How to Use Pair With Java PriorityQueue.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/How%20to%20Use%20Pair%20With%20Java%20PriorityQueue.html","title":"如何在Java中使用Pair与PriorityQueue | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","PriorityQueue"],"tag":["Java","PriorityQueue","Pair","Comparator"],"description":"如何在Java中使用Pair与PriorityQueue | Baeldung 优先队列是最强大数据结构之一。它在企业应用中不常见，但我们经常在编码挑战和算法实现中使用它。 在本教程中，我们将学习如何使用比较器（Comparators）与优先队列（PriorityQueues）以及如何改变这些队列中的排序顺序。然后我们将检查一个更通用的例子，使用自定义...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/How%20to%20Use%20Pair%20With%20Java%20PriorityQueue.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Java中使用Pair与PriorityQueue | Baeldung"}],["meta",{"property":"og:description","content":"如何在Java中使用Pair与PriorityQueue | Baeldung 优先队列是最强大数据结构之一。它在企业应用中不常见，但我们经常在编码挑战和算法实现中使用它。 在本教程中，我们将学习如何使用比较器（Comparators）与优先队列（PriorityQueues）以及如何改变这些队列中的排序顺序。然后我们将检查一个更通用的例子，使用自定义..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"PriorityQueue"}],["meta",{"property":"article:tag","content":"Pair"}],["meta",{"property":"article:tag","content":"Comparator"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Java中使用Pair与PriorityQueue | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"3. 排序","slug":"_3-排序","link":"#_3-排序","children":[]},{"level":3,"title":"4. 比较器","slug":"_4-比较器","link":"#_4-比较器","children":[]},{"level":3,"title":"5. 对","slug":"_5-对","link":"#_5-对","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.72,"words":1715},"filePathRelative":"posts/baeldung/Archive/How to Use Pair With Java PriorityQueue.md","localizedDate":"2024年6月17日","excerpt":"\\n<p>优先队列是最强大数据结构之一。它在企业应用中不常见，但我们经常在编码挑战和算法实现中使用它。</p>\\n<p>在本教程中，我们将学习如何使用比较器（Comparators）与优先队列（PriorityQueues）以及如何改变这些队列中的排序顺序。然后我们将检查一个更通用的例子，使用自定义类，并了解如何将类似的逻辑应用到Pair类。</p>\\n<p>对于Pair类，我们将使用Apache Commons的实现。然而，有多种选项可供选择，我们可以选择最适合我们需求的那个。</p>\\n<p>首先，让我们讨论数据结构本身。这个结构的主要超能力是在将元素推入队列时保持它们的顺序。</p>\\n<p>然而，像其他队列一样，它不提供访问队列内元素的API。我们只能访问队列前面的元素。</p>","autoDesc":true}');export{k as comp,d as data};
